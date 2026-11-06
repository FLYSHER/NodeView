/**
 * Dependencies 패널
 * Assets 에서 선택한 에셋이 사용하는 리소스 파일의 로드 상태, 크기, 사용 노드,
 * 누락 파일(찾아본 경로 포함)과 시트에 없는 프레임을 보여준다.
 */
var DependenciesPanel = (function () {
    var _assetKey = null;
    var _selectedFile = null;
    var _missingOnly = false;
    var _rootEl = null;     // mount 시 받은 패널 요소 (GoldenLayout 이 문서에 붙이기 전이라 ID 로는 찾을 수 없음)

    function $root() {
        return $(_rootEl || '#dependencies-panel');
    }

    function esc(text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    }

    function formatBytes(bytes) {
        if (bytes == null) return '—';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    function isElectron() {
        return typeof require === 'function' && typeof ElectronRenderer !== 'undefined';
    }

    function statusLabel(status) {
        return status === 'ok' ? 'OK' : status === 'missing' ? '누락' : '대기';
    }

    function typeBadge(type) {
        switch (type) {
            case 'armature': return 'AR';
            case 'ui':
            case 'cocosstudio': return 'UI';
            case 'spine': return 'SP';
            case 'image': return 'IMG';
        }
        return '?';
    }

    function render() {
        var $el = $root();
        if ($el.length === 0) return;

        var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
        if (!data) {
            $el.html('<div class="dep-empty">Assets 패널에서 에셋을 선택하면 사용하는 리소스 목록이 표시됩니다.</div>');
            return;
        }

        var src = data.source;
        var s = data.stats;
        var html = '';

        html += '<div class="dep-header">' +
            '<div class="dep-title"><span class="dep-type">' + typeBadge(src.type) + '</span>' + esc(src.name) +
            ' <span class="dep-subtle">(' + esc(src.type.toUpperCase()) + ')</span></div>' +
            (data.definitionPath ? '<div class="dep-path">' + esc(data.definitionPath) + '</div>' : '') +
            '</div>';

        html += '<div class="dep-stats">' +
            stat('전체 파일', s.total, '') +
            stat('로드됨', s.ok, 'ok') +
            stat('누락', s.missing + data.missingFrames.length, s.missing + data.missingFrames.length > 0 ? 'missing' : '') +
            stat('텍스처 메모리', formatBytes(s.textureBytes), '') +
            '</div>';

        html += '<div class="dep-toolbar"><label><input type="checkbox" class="dep-missing-only"' + (_missingOnly ? ' checked' : '') + '> 누락만 보기</label>' +
            (s.pending > 0 ? '<span class="dep-subtle">대기 ' + s.pending + ' — 경로는 찾았지만 아직 로드되지 않음</span>' : '') + '</div>';

        html += '<div class="dep-table">' +
            '<div class="dep-row dep-head"><span>파일</span><span>정보</span><span>파일 크기</span><span>사용</span><span>상태</span></div>';
        data.groups.forEach(function (group) {
            var items = group.items.filter(function (d) { return !_missingOnly || d.status !== 'ok'; });
            if (items.length === 0) return;
            html += '<div class="dep-group">' + esc(group.title) + '</div>';
            items.forEach(function (d) {
                var sel = d.fileName === _selectedFile ? ' selected' : '';
                html += '<div class="dep-row dep-item status-' + d.status + sel + '" data-file-name="' + esc(d.fileName) + '" title="' + esc(d.fullPath || d.ref) + '">' +
                    '<span class="dep-file"><span class="res-kind kind-' + esc(d.kind) + '">' + esc(d.kind.toUpperCase()) + '</span><span class="dep-file-name">' + esc(d.fileName) + '</span></span>' +
                    '<span>' + esc(d.info || (d.regions != null ? d.regions + ' regions' : '—')) + '</span>' +
                    '<span data-label="크기">' + formatBytes(d.bytes) + '</span>' +
                    '<span data-label="사용">' + (d.usage == null ? '—' : d.usage) + '</span>' +
                    '<span class="dep-status">' + statusLabel(d.status) + '</span>' +
                    '</div>';
            });
        });
        html += '</div>';

        // 누락 파일 상세
        data.deps.filter(function (d) { return d.status === 'missing'; }).forEach(function (d) {
            html += '<div class="dep-alert">' +
                '<div class="dep-alert-title">' + esc(d.fileName) + ' 를 찾지 못했습니다</div>';
            if (d.searched && d.searched.length > 0) {
                html += '<div class="dep-alert-label">탐색한 경로</div><div class="dep-alert-paths">' +
                    d.searched.map(esc).join('<br>') + '</div>';
            } else {
                html += '<div class="dep-alert-label">드롭한 파일/폴더 안에 없습니다. 리소스 폴더를 함께 드롭하거나 파일을 직접 지정해 주세요.</div>';
            }
            if (d.usedBy && d.usedBy.length > 0) {
                html += '<div class="dep-alert-label">영향 받는 노드 (' + d.usedBy.length + ')</div><div class="dep-alert-paths">' +
                    d.usedBy.slice(0, 8).map(esc).join('<br>') + (d.usedBy.length > 8 ? '<br>…' : '') + '</div>';
            }
            html += '<div class="dep-alert-actions"><button type="button" class="styleButton dep-pick-file" data-file-name="' + esc(d.fileName) + '">파일 직접 지정…</button></div>' +
                '</div>';
        });

        // 시트에 없는 프레임
        if (data.missingFrames.length > 0) {
            html += '<div class="dep-alert"><div class="dep-alert-title">시트(plist)에 없는 프레임 ' + data.missingFrames.length + '개</div>' +
                '<div class="dep-alert-paths">' + data.missingFrames.slice(0, 20).map(function (m) {
                    return esc(m.frame) + ' <span class="dep-subtle">← ' + esc(m.nodes.join(', ')) + '</span>';
                }).join('<br>') + (data.missingFrames.length > 20 ? '<br>…' : '') + '</div></div>';
        }

        // 선택한 파일의 사용 노드 (시트 png 는 짝인 plist 기준)
        var selected = data.deps.filter(function (d) { return d.fileName === _selectedFile; })[0];
        if (selected && selected.status !== 'missing') html += usageHtml(data, selected);

        html += '<div class="dep-footer">' +
            (isElectron() ? '<button type="button" class="styleButton dep-reveal">탐색기에서 열기</button>' : '') +
            '<button type="button" class="styleButton dep-copy-list">목록 복사</button>' +
            (selected && selected.status === 'ok' && ResourceView.canOpen(selected.kind)
                ? '<button type="button" class="styleButton dep-open-view">Resource View 로 열기</button>' : '') +
            '</div>';

        $el.html(html);
        if (_selectedFile) {
            var $sel = $el.find('.dep-item.selected');
            if ($sel.length) $sel[0].scrollIntoView({ block: 'nearest' });
        }
    }

    // ---- 사용처: 이 리소스를 쓰는 노드 --------------------------------------

    // 이 에셋으로 만든 Game View 인스턴스 (선택된 인스턴스를 우선)
    function instanceOfAsset() {
        var ml = window.MainLayerInstance;
        if (!ml) return null;
        var list = ml.getChildren().filter(function (c) { return c instanceof DraggableNode && c.assetKey === _assetKey; });
        var sel = ml._currentlySelectedNode;
        for (var p = sel; p; p = p.getParent()) { if (list.indexOf(p) >= 0) return p; }
        return list[0] || null;
    }

    // widgetTree 경로("Root/Panel/imgBg") → 인스턴스 안의 실제 노드
    function nodeByPath(inst, path) {
        var root = inst && inst.ui;
        if (!root) return null;
        var segs = String(path).split('/');
        if (root.getName() !== segs[0]) return null;
        var node = root;
        for (var i = 1; i < segs.length && node; i++) {
            var next = null;
            var kids = node.getChildren();
            for (var j = 0; j < kids.length; j++) { if (kids[j].getName() === segs[i]) { next = kids[j]; break; } }
            node = next;
        }
        return node;
    }

    function usageHtml(data, selected) {
        var dep = selected.usedBy.length === 0 && selected.pairOf ? selected.pairOf : selected;
        if (!dep.usedBy || dep.usedBy.length === 0) return '';
        var frameMap = dep.usedFrames || (selected.pairOf && selected.pairOf.usedFrames) || {};
        var isUI = data.source.type === 'ui';
        var inst = isUI ? instanceOfAsset() : null;
        var html = '<div class="dep-usage">' +
            '<div class="dep-usage-head"><span class="dep-alert-label">' + esc(selected.fileName) + ' 사용 노드 ' + dep.usedBy.length + '개</span>' +
            (inst ? '<button type="button" class="styleButton dep-usage-mark">Hierarchy에 표시</button>' : '') + '</div>';
        if (isUI && !inst) html += '<div class="dep-subtle">Game View 에 인스턴스를 만들면 노드를 눌러 바로 선택할 수 있습니다.</div>';
        html += '<div class="dep-usage-list">';
        dep.usedBy.slice(0, 300).forEach(function (path) {
            var segs = String(path).split('/');
            var name = segs.pop();
            var frames = frameMap[path] ? frameMap[path].join(', ') : '';
            html += '<button type="button" class="dep-usage-row"' + (inst ? '' : ' disabled') + ' data-path="' + esc(path) + '" title="' + esc(path) + '">' +
                '<span class="dep-usage-name">' + esc(name) + '</span>' +
                '<span class="dep-usage-path">' + esc(segs.join('/')) + '</span>' +
                (frames ? '<span class="dep-usage-frame">' + esc(frames) + '</span>' : '') +
                '</button>';
        });
        if (dep.usedBy.length > 300) html += '<div class="dep-subtle">… 외 ' + (dep.usedBy.length - 300) + '개</div>';
        return html + '</div></div>';
    }

    // 사용 노드 전체를 Hierarchy 에 강조
    function markUsage() {
        var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
        var selected = data && data.deps.filter(function (d) { return d.fileName === _selectedFile; })[0];
        if (!selected) return;
        var dep = selected.usedBy.length === 0 && selected.pairOf ? selected.pairOf : selected;
        var inst = instanceOfAsset();
        var nodes = dep.usedBy.map(function (p) { return nodeByPath(inst, p); }).filter(Boolean);
        if (window.MainLayerInstance && window.MainLayerInstance._treeView) {
            window.MainLayerInstance._treeView.setUsageHighlight(nodes.map(function (n) { return n.__instanceId; }), selected.fileName);
        }
        UIWidgetsCopyPopover.showToast('Hierarchy 에 ' + nodes.length + '개 노드 표시', selected.fileName + (nodes.length < dep.usedBy.length ? ' · 인스턴스에서 찾지 못한 노드 ' + (dep.usedBy.length - nodes.length) + '개' : ''));
    }

    function stat(label, value, cls) {
        return '<div class="dep-stat ' + cls + '"><div class="dep-stat-value">' + esc(value) + '</div><div class="dep-stat-label">' + esc(label) + '</div></div>';
    }

    function listText(data) {
        var lines = [data.source.name + ' (' + data.source.type + ')'];
        data.deps.forEach(function (d) {
            lines.push([statusLabel(d.status), d.fileName, d.info || '', d.fullPath || d.ref].join('\t'));
        });
        data.missingFrames.forEach(function (m) {
            lines.push(['프레임 없음', m.frame, m.nodes.join(', ')].join('\t'));
        });
        return lines.join('\n');
    }

    // 누락 파일을 사용자가 직접 지정 → 기대한 파일명으로 등록 후 로드
    function pickFile(fileName) {
        var $input = $('<input type="file" style="display: none;">').appendTo('body');
        $input.on('change', function () {
            var file = this.files && this.files[0];
            $input.remove();
            if (!file) return;

            var entry;
            if (isElectron() && file.path) {
                entry = new FileEntry({ filePath: file.path, content: null });
                entry.name = fileName;
            } else {
                var renamed = new File([file], fileName, { type: file.type });
                entry = { name: fileName, isFile: true, size: renamed.size, file: function (cb) { cb(renamed); } };
            }
            ResourceMapData[fileName] = entry;
            ResourceRegistry.clearMissing(fileName);
            entry.file(function (f) {
                Loader.readFile(f, function () {
                    UIWidgetsCopyPopover.showToast(fileName + ' 로드됨', file.name !== fileName ? '선택한 파일: ' + file.name : '');
                    ResourceRegistry.notifyChanged();
                }, false);
            });
        });
        $input.trigger('click');
    }

    function openSelected(fileName) {
        var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
        var dep = data && data.deps.filter(function (d) { return d.fileName === fileName; })[0];
        if (dep && dep.status === 'ok') PanelManager.openResource(dep.fileName, dep.kind);
    }

    function bindEvents(rootEl) {
        // 패널 요소에 직접(네이티브로) 위임 등록: 패널을 다른 위치로 옮겨도 유지된다
        var on = function (type, selector, handler) {
            rootEl.addEventListener(type, function (e) {
                var target = e.target.closest ? e.target.closest(selector) : null;
                if (target && rootEl.contains(target)) handler.call(target, e);
            });
        };

        // 좁은 패널(오른쪽 열 등)에서는 표를 2줄 카드 형태로 바꾼다
        if (window.ResizeObserver) {
            new ResizeObserver(function () {
                rootEl.classList.toggle('dep-narrow', rootEl.clientWidth < 520);
            }).observe(rootEl);
        }
        on('click', '.dep-item', function () {
            _selectedFile = $(this).data('file-name') + '';
            render();
        });
        on('dblclick', '.dep-item', function () {
            openSelected($(this).data('file-name') + '');
        });
        on('click', '.dep-usage-row', function () {
            var node = nodeByPath(instanceOfAsset(), this.getAttribute('data-path'));
            if (node && window.MainLayerInstance) window.MainLayerInstance.selectNodeInHierarchy(node);
            else UIWidgetsCopyPopover.showToast('노드를 찾지 못했습니다', this.getAttribute('data-path'), true);
        });
        on('click', '.dep-usage-mark', markUsage);
        on('click', '.dep-open-view', function () {
            openSelected(_selectedFile);
        });
        on('change', '.dep-missing-only', function () {
            _missingOnly = this.checked;
            render();
        });
        on('click', '.dep-pick-file', function () {
            pickFile($(this).data('file-name') + '');
        });
        on('click', '.dep-copy-list', function () {
            var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
            if (!data) return;
            copyStringToClipboard(listText(data));
            UIWidgetsCopyPopover.showToast('리소스 목록 복사됨', data.deps.length + '개 파일');
        });
        on('click', '.dep-reveal', function () {
            var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
            if (!data) return;
            var selected = data.deps.filter(function (d) { return d.fileName === _selectedFile && d.fullPath; })[0];
            var target = selected ? selected.fullPath : data.definitionPath;
            if (target) {
                require('electron').shell.showItemInFolder(target);
            } else {
                UIWidgetsCopyPopover.showToast('경로를 알 수 없습니다', '파일을 드롭해서 로드한 경우에만 열 수 있습니다.', true);
            }
        });
    }

    return {
        // GoldenLayout 컴포넌트가 만들어질 때 호출
        mount: function (rootEl) {
            _rootEl = rootEl;
            bindEvents(rootEl);
            render();
        },
        showAsset: function (assetKey, fileName) {
            _assetKey = assetKey;
            _selectedFile = fileName || null;
            render();
        },
        refresh: render
    };
})();
