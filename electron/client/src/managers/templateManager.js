/**
 * 템플릿(.nvtemplate) 저장 · 불러오기
 *  - Game View 에 놓인 인스턴스 구성(사용 에셋 파일, 위치 · 스케일 · 회전 · 보이기 · 순서),
 *    해상도, 배경색, 시퀀스를 JSON 으로 저장하고 다시 그대로 배치한다.
 *  - 에셋 파일 경로는 템플릿 파일 기준 상대 경로로 저장해서, 폴더째 옮기거나 공유해도 열린다.
 *    (상대 경로로 못 찾으면 저장할 때의 절대 경로로 한 번 더 찾는다)
 *  - "리소스와 함께 저장" 은 사용 파일을 템플릿 폴더(res/)에 복사해, 폴더만 있으면 어디서든 열리게 한다.
 *  - 파일을 경로로 다시 읽어야 하므로 앱(Electron)에서만 동작한다.
 */
var TemplateManager = (function () {
    var VERSION = 1;
    var LOAD_TIMEOUT_MS = 30000;

    var _ipc = null, _fs = null, _path = null;
    try {
        if (typeof require === 'function') {
            _ipc = require('electron').ipcRenderer;
            _fs = require('fs');
            _path = require('path');
        }
    } catch (e) { _ipc = null; }

    var _currentPath = null;   // 마지막으로 열거나 저장한 템플릿
    var _currentPackaged = false;   // 그 템플릿이 리소스를 함께 저장한 패키지인지
    var _loading = false;

    function isAvailable() {
        return !!_ipc && typeof ElectronRenderer !== 'undefined';
    }

    function layer() {
        return window.MainLayerInstance || null;
    }

    function log(msg) {
        if (typeof printLog === 'function') printLog(msg);
        console.log('[Template] ' + msg);
    }

    function round(v) {
        return Math.round(v * 1000) / 1000;
    }

    // ---- 에셋 → 원본 파일 경로 ---------------------------------------------

    function findEntry(fileName) {
        if (!fileName || typeof ResourceMapData === 'undefined') return null;
        if (ResourceMapData[fileName]) return ResourceMapData[fileName];
        var lower = String(fileName).toLowerCase();
        for (var key in ResourceMapData) {
            if (key.toLowerCase() === lower) return ResourceMapData[key];
        }
        return null;
    }

    // 인스턴스를 만든 정의 파일(ExportJson · Spine json · png)의 전체 경로
    function sourcePathOf(node) {
        var src = typeof ResourceRegistry !== 'undefined' ? ResourceRegistry.getSource(node.assetKey) : null;
        if (!src) return null;
        var file = String(src.file || src.url || '');
        var candidates = [file];
        if (/ \(JSON\)\.ExportJson$/i.test(file)) candidates.push(file.replace(/ \(JSON\)\.ExportJson$/i, '.json'));
        if (!/\.[a-z]+$/i.test(file)) candidates.push(file + '.ExportJson', file + '.exportjson', file + '.json');
        for (var i = 0; i < candidates.length; i++) {
            var entry = findEntry(candidates[i]);
            if (entry && entry.fullPath) return entry.fullPath;
        }
        return null;
    }

    // ---- 저장 ---------------------------------------------------------------

    // Game View 최상위 인스턴스
    function instances() {
        var l = layer();
        if (!l) return [];
        return l.getChildren().filter(function (c) { return c instanceof DraggableNode; })
            .sort(function (a, b) { return a.getLocalZOrder() - b.getLocalZOrder(); });
    }

    function byZ(a, b) { return a.getLocalZOrder() - b.getLocalZOrder(); }

    // 하위(다른 인스턴스나 UI 노드 아래)에 넣은 인스턴스까지 모두. 부모가 항상 먼저 나온다
    function allInstances() {
        var out = [];
        var walk = function (node) {
            node.getChildren().slice().sort(byZ).forEach(function (c) {
                if (c instanceof DraggableNode) out.push(c);
                walk(c);
            });
        };
        var l = layer();
        if (l) walk(l);
        return out;
    }

    // 인스턴스를 담고 있는 가장 가까운 상위 인스턴스
    function ownerOf(node) {
        for (var p = node.getParent(); p; p = p.getParent()) {
            if (p instanceof DraggableNode) return p;
            if (p === layer()) return null;
        }
        return null;
    }

    // 인스턴스가 아닌 형제 중에서의 순서 (이름이 같은 노드가 여러 개일 때 구분용)
    function plainSiblings(node) {
        var parent = node.getParent();
        return parent ? parent.getChildren().filter(function (c) { return !(c instanceof DraggableNode); }) : [];
    }

    // owner 에서 target 까지 내려가는 경로: [{ name, index }]
    function pathFrom(owner, target) {
        var steps = [];
        for (var n = target; n && n !== owner; n = n.getParent()) {
            steps.unshift({ name: n.getName() || '', index: plainSiblings(n).indexOf(n) });
        }
        return steps;
    }

    function resolvePath(owner, steps) {
        var node = owner;
        for (var i = 0; i < steps.length && node; i++) {
            var step = steps[i];
            var kids = node.getChildren().filter(function (c) { return !(c instanceof DraggableNode); });
            var named = kids.filter(function (c) { return (c.getName() || '') === step.name; });
            if (named.length === 1) node = named[0];
            else if (kids[step.index] && (kids[step.index].getName() || '') === step.name) node = kids[step.index];
            else node = named[0] || null;
        }
        return node;
    }

    // 선택한 애니메이션: 미리보기로 고른 것, 없으면 Inspector 에서 재생 중인 것
    function selectedAnimOf(node) {
        if (node.armature) {
            var mv = node.armature.getAnimation().getCurrentMovementID();
            if (mv) return { name: mv, type: 'armature' };
        }
        if (node.spine) {
            var t = node.spine.getCurrent(0);
            if (t && t.animation) return { name: t.animation.name, type: 'spine', loop: !!t.loop };
        }
        return node._selectedAnim ? { name: node._selectedAnim.name, type: node._selectedAnim.type } : null;
    }

    function playAnim(node, anim) {
        if (!anim || !anim.name) return;
        try {
            if (anim.type === 'armature' && node.armature) node.armature.getAnimation().play(anim.name, -1);
            else if (anim.type === 'spine' && node.spine) node.spine.setAnimation(0, anim.name, anim.loop !== false);
            else if (anim.type === 'action') {
                if (node.cocosAction) node.cocosAction.play(anim.name, false);
                else if (node.ui && node.actionUrl) ccs.actionManager.playActionByName(node.actionUrl, anim.name);
            } else return;
            node._selectedAnim = { name: anim.name, type: anim.type };
        } catch (e) {
            log('애니메이션을 재생하지 못함: ' + node.getName() + ' · ' + anim.name);
        }
    }

    // 인스턴스 안에서 보이기를 바꾼 하위 노드: [{ path, visible }] (하위 인스턴스 안은 그 인스턴스가 따로 저장)
    function changedVisibilityOf(instance) {
        var out = [];
        var walk = function (node) {
            node.getChildren().forEach(function (c) {
                if (c instanceof DraggableNode) return;
                if (c._visibleChanged) out.push({ path: pathFrom(instance, c), visible: c.isVisible() });
                walk(c);
            });
        };
        walk(instance);
        return out;
    }

    function applyVisibility(instance, list) {
        (list || []).forEach(function (v) {
            var target = resolvePath(instance, v.path || []);
            if (!target || target === instance) {
                var names = (v.path || []).map(function (s) { return s.name; }).join('/');
                log('보이기를 적용할 노드를 찾지 못함: ' + instance.getName() + ' › ' + names);
                return;
            }
            target.setVisible(v.visible !== false);
            target._visibleChanged = true;
        });
    }

    // pathMap: 패키지로 저장할 때 원본 경로 → 패키지 안 복사본 경로
    function buildData(templatePath, pathMap) {
        var l = layer();
        var dir = _path.dirname(templatePath);
        var missing = [];
        var nodes = allInstances();
        var idToName = {};
        nodes.forEach(function (node) { idToName[node.__instanceId] = node.getName(); });

        var list = nodes.map(function (node) {
            var abs = sourcePathOf(node);
            if (abs && pathMap && pathMap[abs]) abs = pathMap[abs];
            if (!abs) missing.push(node.getName());
            var rel = abs ? _path.relative(dir, abs) : null;
            // 다른 드라이브면 상대 경로가 절대 경로로 나온다
            if (rel && _path.isAbsolute(rel)) rel = null;
            var asset = (l.assetLibrary[node.assetKey] || {}).name || node.getName();
            var owner = ownerOf(node);
            return {
                name: node.getName(),
                asset: asset,
                type: node.assetType,
                file: rel ? rel.split(_path.sep).join('/') : null,
                absFile: abs,
                // 최상위는 화면 중앙 기준, 하위는 부모 노드 안의 위치
                parent: owner ? { instance: idToName[owner.__instanceId], path: pathFrom(owner, node.getParent()) } : null,
                x: round(node.getPositionX() - (owner ? 0 : l.CX)),
                y: round(node.getPositionY() - (owner ? 0 : l.CY)),
                scaleX: round(node.getScaleX()),
                scaleY: round(node.getScaleY()),
                rotation: round(node.getRotation()),
                opacity: node.getOpacity(),
                visible: node.isVisible(),
                z: node.getLocalZOrder(),
                anim: selectedAnimOf(node),
                nodeVisible: changedVisibilityOf(node)
            };
        });

        var sequence = [];
        if (typeof Sequencer !== 'undefined' && Sequencer.exportTracks) {
            Sequencer.exportTracks().forEach(function (t) {
                var name = idToName[t.node.__instanceId];
                if (name) sequence.push({ instance: name, clips: t.clips });
            });
        }

        var bg = null;
        try { bg = localStorage.getItem('backgroundColor'); } catch (e) { }

        return {
            data: {
                nodeviewTemplate: VERSION,
                savedAt: new Date().toISOString(),
                resolution: typeof PanelManager !== 'undefined' ? PanelManager.getResolution() : null,
                backgroundColor: bg,
                instances: list,
                sequence: sequence
            },
            missing: missing
        };
    }

    // ---- 리소스 함께 저장 (패키지) ----------------------------------------------
    // 구조: <이름>/<이름>.nvtemplate, <이름>/res/(정의 파일), <이름>/res/image/(plist · png · fnt · atlas)
    //  - 불러올 때 정의 파일 옆 image 폴더를 자동으로 찾으므로 별도 경로 처리가 필요 없다.

    // 저장 위치: 고른 파일과 같은 이름의 폴더 안 (이미 그 폴더 안이면 그대로)
    function packagePathFor(filePath) {
        var dir = _path.dirname(filePath);
        var stem = _path.basename(filePath, _path.extname(filePath));
        if (_path.basename(dir) === stem) return filePath;
        return _path.join(dir, stem, stem + '.nvtemplate');
    }

    function samePath(a, b) {
        return _path.resolve(a).toLowerCase() === _path.resolve(b).toLowerCase();
    }

    // 인스턴스들이 쓰는 파일: { 정의 파일 전체 경로 → true }, { 의존 파일 이름 → 전체 경로 }
    function collectPackageFiles(nodes) {
        var defs = {}, deps = {}, missing = [];
        var seenKeys = {};
        nodes.forEach(function (node) {
            var def = sourcePathOf(node);
            if (def) defs[def] = true;
            if (seenKeys[node.assetKey]) return;
            seenKeys[node.assetKey] = true;
            if (node.assetType === 'image') return;   // png 자체가 정의 파일 (res/ 에 이미 복사)
            var info = ResourceRegistry.collect(node.assetKey);
            ((info && info.deps) || []).forEach(function (d) {
                var name = d.fileName;
                if (!d.fullPath) {
                    if (missing.indexOf(name) < 0) missing.push(name);
                    return;
                }
                if (deps[name] && !samePath(deps[name], d.fullPath)) {
                    log('이름이 같은 다른 파일이 있어 먼저 찾은 파일만 넣습니다: ' + name);
                    return;
                }
                deps[name] = d.fullPath;
            });
        });
        return { defs: Object.keys(defs), deps: deps, missing: missing };
    }

    function copyInto(src, destDir) {
        var dest = _path.join(destDir, _path.basename(src));
        if (samePath(src, dest)) return dest;   // 패키지를 다시 저장할 때는 이미 그 자리에 있다
        _fs.mkdirSync(destDir, { recursive: true });
        _fs.copyFileSync(src, dest);
        return dest;
    }

    // 파일을 패키지 폴더로 복사하고, 인스턴스의 원본 경로를 복사본으로 바꾼 맵을 돌려준다
    function writePackageFiles(templatePath, files) {
        var resDir = _path.join(_path.dirname(templatePath), 'res');
        var imageDir = _path.join(resDir, 'image');
        var defMap = {};
        var bytes = 0;
        files.defs.forEach(function (p) {
            defMap[p] = copyInto(p, resDir);
            bytes += _fs.statSync(defMap[p]).size;
        });
        Object.keys(files.deps).forEach(function (name) {
            bytes += _fs.statSync(copyInto(files.deps[name], imageDir)).size;
        });
        return { defMap: defMap, count: files.defs.length + Object.keys(files.deps).length, bytes: bytes };
    }

    function formatBytes(b) {
        return b >= 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB';
    }

    function save(saveAs, packaged) {
        if (!isAvailable()) return;
        if (instances().length === 0) {
            alert('Game View 에 저장할 인스턴스가 없습니다.');
            return;
        }
        // Ctrl+S 는 마지막으로 저장/연 방식 그대로 (패키지면 리소스도 다시 복사)
        if (packaged === undefined) packaged = !saveAs && _currentPackaged;
        var pick = (!saveAs && _currentPath) ? Promise.resolve(_currentPath)
            : _ipc.invoke('nv:saveTemplateDialog', _currentPath || undefined);
        pick.then(function (filePath) {
            if (!filePath) return;
            if (packaged) filePath = packagePathFor(filePath);
            var result;
            var pkg = null;
            try {
                if (packaged) {
                    var files = collectPackageFiles(allInstances());
                    pkg = writePackageFiles(filePath, files);
                    pkg.missing = files.missing;
                }
                result = buildData(filePath, pkg && pkg.defMap);
                result.data.packaged = !!packaged;
                _fs.mkdirSync(_path.dirname(filePath), { recursive: true });
                _fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2), 'utf8');
            } catch (e) {
                alert('템플릿을 저장하지 못했습니다.\n' + e.message);
                return;
            }
            _currentPath = filePath;
            _currentPackaged = !!packaged;
            log('템플릿 저장: ' + filePath + ' (인스턴스 ' + result.data.instances.length + '개' +
                (pkg ? ', 리소스 ' + pkg.count + '개 · ' + formatBytes(pkg.bytes) : '') + ')');
            if (pkg && pkg.missing.length) {
                log('찾지 못해 패키지에 넣지 못한 리소스: ' + pkg.missing.join(', '));
            }
            if (result.missing.length) {
                log('원본 파일 경로를 찾지 못한 인스턴스: ' + result.missing.join(', ') + ' — 불러올 때 이 인스턴스는 빠집니다');
            }
        });
    }

    // ---- 불러오기 -------------------------------------------------------------

    function resolveFile(dir, inst) {
        var tries = [];
        if (inst.file) tries.push(_path.resolve(dir, inst.file));
        if (inst.absFile) tries.push(inst.absFile);
        for (var i = 0; i < tries.length; i++) {
            try { if (_fs.existsSync(tries[i])) return tries[i]; } catch (e) { }
        }
        return null;
    }

    function waitForAssets(keys) {
        var l = layer();
        var started = Date.now();
        return new Promise(function (resolve) {
            (function check() {
                var pending = keys.filter(function (k) { return !l.assetLibrary[k]; });
                if (pending.length === 0 || Date.now() - started > LOAD_TIMEOUT_MS) {
                    resolve(pending);
                    return;
                }
                setTimeout(check, 100);
            })();
        });
    }

    function clearScene() {
        var l = layer();
        // 하위 인스턴스부터 지워야 이름 목록(sceneNodes)에 남지 않는다
        allInstances().reverse().forEach(function (node) { l.deleteItem(node.__instanceId); });
    }

    function applyBackground(color) {
        if (!color || !/^#[0-9a-f]{6}$/i.test(color)) return;
        try { localStorage.setItem('backgroundColor', color); } catch (e) { }
        $('#bg-color-picker').val(color);
        cc.eventManager.dispatchCustomEvent('background_color_changed', color);
    }

    // byName: 이미 배치한 인스턴스 (템플릿에 저장된 이름 → 노드)
    function placeInstance(inst, byName) {
        var l = layer();

        // 하위 인스턴스면 부모 노드를 먼저 찾는다 (못 찾으면 배치하지 않음)
        var parentNode = null;
        if (inst.parent) {
            var owner = byName[inst.parent.instance];
            parentNode = owner ? resolvePath(owner, inst.parent.path || []) : null;
            if (!parentNode) {
                log('부모 노드를 찾지 못해 배치하지 않음: ' + inst.name + ' (부모 ' + inst.parent.instance + ')');
                return null;
            }
        }

        var node = l.createInstanceFromLibrary(inst.asset, inst.type);
        if (!node) return null;
        if (parentNode) {
            node.retain();
            node.removeFromParent(false);
            parentNode.addChild(node);
            node.release();
        }

        // 저장한 이름 그대로 (겹치면 자동으로 붙은 이름 유지)
        var autoName = node.getName();
        if (inst.name && inst.name !== autoName && !l.sceneNodes[inst.name]) {
            delete l.sceneNodes[autoName];
            node.setName(inst.name);
            l.sceneNodes[inst.name] = node;
        }
        var base = parentNode ? cc.p(0, 0) : cc.p(l.CX, l.CY);
        node.setPosition(base.x + (inst.x || 0), base.y + (inst.y || 0));
        if (typeof inst.scaleX === 'number') node.setScaleX(inst.scaleX);
        if (typeof inst.scaleY === 'number') node.setScaleY(inst.scaleY);
        if (typeof inst.rotation === 'number') node.setRotation(inst.rotation);
        if (typeof inst.opacity === 'number') node.setOpacity(inst.opacity);
        node.setVisible(inst.visible !== false);
        if (typeof inst.z === 'number') node.setLocalZOrder(inst.z);
        applyVisibility(node, inst.nodeVisible);
        playAnim(node, inst.anim);
        return node;
    }

    function load(filePath) {
        if (!isAvailable() || _loading) return;
        var raw;
        try {
            raw = JSON.parse(_fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            alert('템플릿 파일을 읽지 못했습니다.\n' + e.message);
            return;
        }
        if (!raw || !raw.nodeviewTemplate || !Array.isArray(raw.instances)) {
            alert('NodeView 템플릿 파일이 아닙니다.');
            return;
        }
        if (instances().length > 0 && !confirm('지금 Game View 의 인스턴스를 모두 지우고 템플릿을 불러올까요?')) return;

        _loading = true;
        var dir = _path.dirname(filePath);
        clearScene();

        if (raw.resolution && raw.resolution.width > 0) PanelManager.setResolution(raw.resolution.width, raw.resolution.height);
        else PanelManager.setResolution(null, null);
        applyBackground(raw.backgroundColor);

        // 쓰는 파일을 한 번씩만 연다 (의존 리소스는 기존 열기와 같이 자동으로 찾는다)
        var paths = [];
        var missingFiles = [];
        raw.instances.forEach(function (inst) {
            var p = resolveFile(dir, inst);
            if (!p) { missingFiles.push(inst.file || inst.absFile || inst.name); return; }
            if (paths.indexOf(p) < 0) paths.push(p);
        });
        missingFiles.forEach(function (f) { log('템플릿 파일을 찾지 못함: ' + f); });
        if (paths.length) ElectronRenderer.handleDrop({ dataTransfer: { files: paths.map(function (p) { return { path: p }; }) } });

        var keys = [];
        raw.instances.forEach(function (inst) {
            var k = inst.asset + '_' + inst.type;
            if (keys.indexOf(k) < 0) keys.push(k);
        });

        log('템플릿 불러오는 중: ' + _path.basename(filePath));
        waitForAssets(keys).then(function (pending) {
            pending.forEach(function (k) { log('에셋을 불러오지 못함: ' + k); });

            var byName = {};
            // 저장 순서 = 부모가 먼저 (순서값은 배치하면서 그대로 다시 넣는다)
            raw.instances.forEach(function (inst) {
                var node = placeInstance(inst, byName);
                if (node) byName[inst.name] = node;
            });

            (raw.sequence || []).forEach(function (t) {
                var node = byName[t.instance];
                if (!node) return;
                (t.clips || []).forEach(function (clip) { Sequencer.restoreClip(node, clip); });
            });

            var l = layer();
            l.refreshHierarchyView();
            l.updateMenuWithNodeId(null);
            if (typeof GameViewTools !== 'undefined') GameViewTools.fitView();

            // 기본 템플릿은 앱 안의 파일이라 덮어쓰지 않는다 (Ctrl+S 는 저장 위치를 새로 묻는다)
            _currentPath = isBuiltin(filePath) ? null : filePath;
            _currentPackaged = !!raw.packaged;
            _loading = false;
            log('템플릿 불러오기 완료: 인스턴스 ' + Object.keys(byName).length + ' / ' + raw.instances.length + '개');
        });
    }

    function open() {
        if (!isAvailable()) return;
        _ipc.invoke('nv:openTemplateDialog').then(function (p) { if (p) load(p); });
    }

    // ---- 기본 템플릿 (앱에 내장) --------------------------------------------------
    // templates/<폴더>/<이름>.nvtemplate 를 찾는다. 폴더 경로는 시작할 때 메인 프로세스에서 받아 둔다.
    var _builtinDir = null;
    if (isAvailable()) {
        _ipc.invoke('nv:builtinTemplateDir').then(function (dir) { _builtinDir = dir; }, function () { });
    }

    function listBuiltin() {
        if (!_builtinDir || !_fs) return [];
        var out = [];
        try {
            _fs.readdirSync(_builtinDir, { withFileTypes: true }).forEach(function (d) {
                if (!d.isDirectory()) return;
                var folder = _path.join(_builtinDir, d.name);
                _fs.readdirSync(folder).filter(function (f) { return /\.nvtemplate$/i.test(f); }).forEach(function (f) {
                    out.push({ name: f.replace(/\.nvtemplate$/i, ''), path: _path.join(folder, f) });
                });
            });
        } catch (e) { return []; }
        return out.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }

    function isBuiltin(filePath) {
        if (!_builtinDir) return false;
        var rel = _path.relative(_builtinDir, filePath);
        return !!rel && rel.indexOf('..') !== 0 && !_path.isAbsolute(rel);
    }

    return {
        isAvailable: isAvailable,
        open: open,
        load: load,
        listBuiltin: listBuiltin,
        save: function () { save(false); },
        saveAs: function () { save(true, false); },
        savePackage: function () { save(true, true); },
        hasInstances: function () { return instances().length > 0; }
    };
})();
