/**
 * ResourceRegistry
 * 에셋(UI / Armature / Spine / CocosStudio / Image)이 사용하는 리소스 파일 목록과
 * 각 파일의 로드 상태를 계산한다.
 *
 * - 에셋 정의 파일이 파싱되는 시점에 registerSource 로 등록된다. (텍스처가 누락돼
 *   에셋 로드가 끝나지 않아도 목록에 나타나야 누락 원인을 보여줄 수 있기 때문)
 * - 의존 파일 목록과 상태는 저장하지 않고 collect() 호출 때마다 Loader 캐시에서 계산한다.
 */
var ResourceRegistry = (function () {
    var EVENT_CHANGED = 'resource_registry_changed';

    var _sources = {};      // assetKey -> { key, name, type, file, url }
    var _missingInfo = {};  // 파일명(소문자) -> { searched: [], requestedBy }
    var _sizeCache = {};    // fullPath -> bytes
    var _notifyTimer = null;

    var GROUPS = [
        { id: 'sheets', title: 'Sprite Sheets' },
        { id: 'fonts', title: 'Bitmap Fonts' },
        { id: 'atlas', title: 'Spine Atlas' },
        { id: 'images', title: '개별 이미지' },
        { id: 'others', title: '기타' }
    ];

    // ---- 유틸 ------------------------------------------------------------

    function baseName(p) {
        return String(p).split(/[\\\/]/).pop();
    }

    function stem(p) {
        return cc.path.mainFileName(baseName(p));
    }

    function extOf(p) {
        return cc.path.extname(String(p)).toLowerCase();
    }

    function findEntry(fileName) {
        if (typeof ResourceMapData === 'undefined') return null;
        if (ResourceMapData[fileName]) return ResourceMapData[fileName];
        var lower = fileName.toLowerCase();
        for (var key in ResourceMapData) {
            if (key.toLowerCase() === lower) return ResourceMapData[key];
        }
        return null;
    }

    function fileSize(entry) {
        if (!entry) return null;
        if (typeof entry.size === 'number') return entry.size;          // 웹: File 객체
        if (!entry.fullPath || typeof require !== 'function') return null;
        if (_sizeCache.hasOwnProperty(entry.fullPath)) return _sizeCache[entry.fullPath];
        try {
            _sizeCache[entry.fullPath] = require('fs').statSync(entry.fullPath).size;   // Electron
        } catch (e) {
            _sizeCache[entry.fullPath] = null;
        }
        return _sizeCache[entry.fullPath];
    }

    // Spine .atlas 텍스트에서 페이지(png) 이름과 페이지별 리전 수를 읽는다
    function parseAtlasPages(atlasText) {
        var pages = [];
        var current = null;
        var expectPage = true;
        String(atlasText).split(/\r?\n/).forEach(function (line) {
            if (line.trim() === '') {
                expectPage = true;
                return;
            }
            if (expectPage) {
                current = { name: line.trim(), regions: 0 };
                pages.push(current);
                expectPage = false;
                return;
            }
            // 들여쓰기 없고 ':' 가 없는 줄 = 리전 이름
            if (current && !/^\s/.test(line) && line.indexOf(':') < 0) {
                current.regions++;
            }
        });
        return pages;
    }

    // ---- 등록 / 알림 -----------------------------------------------------

    function notifyChanged() {
        clearTimeout(_notifyTimer);
        _notifyTimer = setTimeout(function () {
            if (cc.eventManager) cc.eventManager.dispatchCustomEvent(EVENT_CHANGED);
        }, 100);
    }

    function registerSource(src) {
        _sources[src.key] = src;
        notifyChanged();
    }

    function removeSource(key) {
        delete _sources[key];
        notifyChanged();
    }

    function getSource(key) {
        return _sources[key] || null;
    }

    function getSources() {
        return Object.keys(_sources).map(function (k) { return _sources[k]; });
    }

    function setMissingInfo(list) {
        (list || []).forEach(function (m) {
            _missingInfo[baseName(m.file).toLowerCase()] = { searched: m.searched || [], requestedBy: m.requestedBy };
        });
        notifyChanged();
    }

    function clearMissing(fileName) {
        delete _missingInfo[baseName(fileName).toLowerCase()];
        notifyChanged();
    }

    // ---- 상태 계산 -------------------------------------------------------

    function fileStatus(fileName, kind) {
        var s = stem(fileName);
        var result = { status: 'ok', info: '' };
        var loaded = false;

        switch (kind) {
            case 'png':
                loaded = Loader.textureList.indexOf(s) >= 0 && !!Loader.textures[s];
                if (loaded) {
                    var tex = Loader.textures[s];
                    result.width = tex.getPixelsWide();
                    result.height = tex.getPixelsHigh();
                    result.info = result.width + '×' + result.height;
                }
                break;
            case 'plist':
                loaded = !!Loader.plistFiles[s];
                if (loaded) result.info = Object.keys(Loader.plistFiles[s].frames || {}).length + ' frames';
                break;
            case 'fnt':
                var conf = cc.loader.getRes('image/' + baseName(fileName));
                loaded = !!conf;
                if (loaded && conf.fontDefDictionary) result.info = Object.keys(conf.fontDefDictionary).length + ' chars';
                break;
            case 'atlas':
                loaded = Loader.atlasList.indexOf(s) >= 0;
                if (loaded) result.info = parseAtlasPages(Loader.atlasFiles[s]).length + ' pages';
                break;
            default:
                loaded = !!findEntry(baseName(fileName));
        }

        if (!loaded) {
            var missing = _missingInfo[baseName(fileName).toLowerCase()];
            if (missing) {
                result.status = 'missing';
                result.searched = missing.searched;
            } else if (findEntry(baseName(fileName))) {
                result.status = 'pending';      // 경로는 알고 있지만 아직(또는 끝내) 로드되지 않음
            } else {
                result.status = 'missing';
            }
        }
        return result;
    }

    function makeDep(group, ref, kind) {
        var fileName = baseName(ref);
        var entry = findEntry(fileName);
        var st = fileStatus(fileName, kind);
        return {
            group: group,
            kind: kind,
            ref: ref,
            fileName: fileName,
            status: st.status,
            info: st.info,
            width: st.width,
            height: st.height,
            searched: st.searched || null,
            fullPath: entry && entry.fullPath ? entry.fullPath : null,
            bytes: fileSize(entry),
            usage: null,       // 이 파일을 쓰는 노드 수 (계산 불가하면 null)
            usedBy: []
        };
    }

    // widgetTree 를 돌며 리소스 참조를 수집: { path, resourceType, node(경로) }
    function collectWidgetRefs(widgetTree) {
        var refs = [];
        var walk = function (node, parentPath) {
            if (!node) return;
            var name = node.options && node.options.name ? node.options.name : (node.classname || 'Node');
            var nodePath = parentPath ? parentPath + '/' + name : name;
            var options = node.options || {};
            for (var key in options) {
                var v = options[key];
                if (v && typeof v === 'object' && !Array.isArray(v) && v.hasOwnProperty('resourceType') && v.path) {
                    refs.push({ path: v.path, resourceType: v.resourceType, node: nodePath });
                }
            }
            (node.children || []).forEach(function (c) { walk(c, nodePath); });
        };
        walk(widgetTree, '');
        return refs;
    }

    // 프레임 참조를 시트(plist)에 연결하고, 어느 시트에도 없는 프레임은 missingFrames 로 반환
    function resolveFrames(frameRefs, sheetDeps) {
        var missingFrames = {};
        frameRefs.forEach(function (ref) {
            var frame = ref.frame;
            var owner = null;
            for (var i = 0; i < sheetDeps.length; i++) {
                var conf = Loader.plistFiles[stem(sheetDeps[i].fileName)];
                if (conf && conf.frames && conf.frames[frame]) { owner = sheetDeps[i]; break; }
            }
            if (owner) {
                owner.usage = (owner.usage || 0) + 1;
                if (owner.usedBy.indexOf(ref.node) < 0) owner.usedBy.push(ref.node);
                return;
            }
            // 시트가 아직 로드되지 않았으면 판단 보류, 다른 에셋 시트에 있으면 정상
            var allSheetsLoaded = sheetDeps.every(function (d) { return !!Loader.plistFiles[stem(d.fileName)]; });
            if (!allSheetsLoaded || cc.spriteFrameCache.getSpriteFrame(frame)) return;
            (missingFrames[frame] = missingFrames[frame] || []).push(ref.node);
        });
        return Object.keys(missingFrames).map(function (f) { return { frame: f, nodes: missingFrames[f] }; });
    }

    function addSheetPair(deps, plistRef, pngRef) {
        var plist = makeDep('sheets', plistRef, 'plist');
        plist.usage = 0;   // 사용 노드를 세는 대상 (0 이면 이 시트를 쓰는 노드가 없음)
        var png = makeDep('sheets', pngRef || baseName(plistRef).replace(/\.plist$/i, '.png'), 'png');
        png.pairOf = plist;
        deps.push(plist, png);
        return plist;
    }

    function collectUI(src, deps) {
        var dic = cc.loader.cache[src.url];
        if (!dic || !dic.widgetTree) return [];

        var sheets = [];
        (dic.textures || []).forEach(function (plistRef, i) {
            sheets.push(addSheetPair(deps, plistRef, dic.texturesPng && dic.texturesPng[i]));
        });

        var frameRefs = [];
        var fileDeps = {};
        collectWidgetRefs(dic.widgetTree).forEach(function (ref) {
            if (ref.resourceType === 1) {
                frameRefs.push({ frame: ref.path, node: ref.node });
                return;
            }
            var name = baseName(ref.path);
            var dep = fileDeps[name];
            if (!dep) {
                var ext = extOf(name);
                if (ext === '.fnt') {
                    dep = makeDep('fonts', ref.path, 'fnt');
                    var conf = cc.loader.getRes('image/' + name);
                    var pngRef = conf && conf.atlasName ? conf.atlasName : name.replace(/\.fnt$/i, '.png');
                    var fontPng = makeDep('fonts', pngRef, 'png');
                    fontPng.pairOf = dep;
                    deps.push(dep, fontPng);
                } else {
                    dep = makeDep(ext === '.png' || ext === '.jpg' ? 'images' : 'others', ref.path, ext === '.png' || ext === '.jpg' ? 'png' : ext.slice(1));
                    deps.push(dep);
                }
                fileDeps[name] = dep;
            }
            dep.usage = (dep.usage || 0) + 1;
            if (dep.usedBy.indexOf(ref.node) < 0) dep.usedBy.push(ref.node);
        });

        return resolveFrames(frameRefs, sheets);
    }

    function collectCocosStudio(src, deps) {
        var dic = cc.loader.cache[src.url];
        var used = dic && dic.Content && dic.Content.Content && dic.Content.Content.UsedResources;
        (used || []).forEach(function (ref) {
            var ext = extOf(ref);
            if (ext === '.plist') deps.push(makeDep('sheets', ref, 'plist'));
            else if (ext === '.fnt') deps.push(makeDep('fonts', ref, 'fnt'));
            else if (ext === '.png') deps.push(makeDep('images', ref, 'png'));
            else deps.push(makeDep('others', ref, ext.slice(1)));
        });
        return [];
    }

    function collectArmature(src, deps) {
        var dic = Loader.armatureData[src.file];
        if (!dic) return [];
        var sheets = [];
        (dic.config_file_path || []).forEach(function (plistRef, i) {
            sheets.push(addSheetPair(deps, plistRef, dic.config_png_path && dic.config_png_path[i]));
        });
        // 디스플레이 이미지 → 시트 연결 (texture_data 의 name 은 확장자 없는 프레임 이름)
        (dic.texture_data || []).forEach(function (t) {
            sheets.forEach(function (sheet) {
                var conf = Loader.plistFiles[stem(sheet.fileName)];
                if (conf && conf.frames && (conf.frames[t.name + '.png'] || conf.frames[t.name])) {
                    sheet.usage = (sheet.usage || 0) + 1;
                    sheet.usedBy.push(t.name);
                }
            });
        });
        return [];
    }

    function collectSpine(src, deps) {
        var atlas = makeDep('atlas', src.name + '.atlas', 'atlas');
        deps.push(atlas);
        var atlasText = Loader.atlasFiles[src.name];
        var pages = atlasText ? parseAtlasPages(atlasText) : [{ name: src.name + '.png', regions: null }];
        pages.forEach(function (page) {
            var png = makeDep('atlas', page.name, 'png');
            png.pairOf = atlas;
            if (page.regions !== null) png.regions = page.regions;
            deps.push(png);
        });
        return [];
    }

    /**
     * 에셋의 의존 리소스 정보를 계산한다.
     * @returns {{source, groups: Array, deps: Array, missingFrames: Array, stats: Object}|null}
     */
    function collect(key) {
        var src = _sources[key];
        if (!src) return null;

        var deps = [];
        var missingFrames = [];
        switch (src.type) {
            case 'ui': missingFrames = collectUI(src, deps); break;
            case 'cocosstudio': missingFrames = collectCocosStudio(src, deps); break;
            case 'armature': missingFrames = collectArmature(src, deps); break;
            case 'spine': missingFrames = collectSpine(src, deps); break;
            case 'image': deps.push(makeDep('images', src.name + '.png', 'png')); break;
        }

        // 시트/폰트의 png 는 짝 파일의 사용처를 그대로 보여준다
        deps.forEach(function (d) {
            if (d.pairOf && d.kind === 'png') {
                d.usedBy = d.pairOf.usedBy;
            }
        });
        // 사용 수 = 참조 횟수가 아니라 사용하는 노드 수 (Button 하나가 normal/pressed/disabled 를 모두 참조할 수 있음)
        deps.forEach(function (d) {
            var countable = d.usage != null || (d.pairOf && d.pairOf.usage != null);
            d.usage = countable ? d.usedBy.length : null;
        });

        var stats = { total: deps.length, ok: 0, missing: 0, pending: 0, textureBytes: 0 };
        deps.forEach(function (d) {
            stats[d.status]++;
            if (d.kind === 'png' && d.width) stats.textureBytes += d.width * d.height * 4;
        });

        var groups = GROUPS.map(function (g) {
            return { id: g.id, title: g.title, items: deps.filter(function (d) { return d.group === g.id; }) };
        }).filter(function (g) { return g.items.length > 0; });

        var definitionEntry = findEntry(baseName(src.url || src.file || ''));
        return {
            source: src,
            definitionPath: definitionEntry && definitionEntry.fullPath ? definitionEntry.fullPath : null,
            groups: groups,
            deps: deps,
            missingFrames: missingFrames,
            stats: stats
        };
    }

    return {
        EVENT_CHANGED: EVENT_CHANGED,
        registerSource: registerSource,
        removeSource: removeSource,
        getSource: getSource,
        getSources: getSources,
        setMissingInfo: setMissingInfo,
        clearMissing: clearMissing,
        notifyChanged: notifyChanged,
        collect: collect,
        parseAtlasPages: parseAtlasPages
    };
})();
