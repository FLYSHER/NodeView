/**
 * Dependencies 패널
 * Assets 에서 선택한 에셋이 사용하는 리소스 파일의 로드 상태, 크기, 사용 노드,
 * 누락 파일(찾아본 경로 포함)과 시트에 없는 프레임을 보여준다.
 */
var DependenciesPanel = (function () {
    var _assetKey = null;
    var _selectedFile = null;
    var _missingOnly = false;

    function $root() {
        return $('#dependencies-panel');
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
                    '<span>' + formatBytes(d.bytes) + '</span>' +
                    '<span>' + (d.usage == null ? '—' : d.usage) + '</span>' +
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

        // 선택한 파일의 사용 노드
        var selected = data.deps.filter(function (d) { return d.fileName === _selectedFile; })[0];
        if (selected && selected.status !== 'missing' && selected.usedBy.length > 0) {
            html += '<div class="dep-usage"><div class="dep-alert-label">' + esc(selected.fileName) + ' 사용 노드 (' + selected.usedBy.length + ')</div>' +
                '<div class="dep-alert-paths">' + selected.usedBy.slice(0, 30).map(esc).join('<br>') + (selected.usedBy.length > 30 ? '<br>…' : '') + '</div></div>';
        }

        html += '<div class="dep-footer">' +
            (isElectron() ? '<button type="button" class="styleButton dep-reveal">탐색기에서 열기</button>' : '') +
            '<button type="button" class="styleButton dep-copy-list">목록 복사</button>' +
            '</div>';

        $el.html(html);
        if (_selectedFile) {
            var $sel = $el.find('.dep-item.selected');
            if ($sel.length) $sel[0].scrollIntoView({ block: 'nearest' });
        }
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

    function bindEvents() {
        var $el = $root();
        $el.on('click', '.dep-item', function () {
            _selectedFile = $(this).data('file-name') + '';
            render();
        });
        $el.on('change', '.dep-missing-only', function () {
            _missingOnly = this.checked;
            render();
        });
        $el.on('click', '.dep-pick-file', function () {
            pickFile($(this).data('file-name') + '');
        });
        $el.on('click', '.dep-copy-list', function () {
            var data = _assetKey ? ResourceRegistry.collect(_assetKey) : null;
            if (!data) return;
            copyStringToClipboard(listText(data));
            UIWidgetsCopyPopover.showToast('리소스 목록 복사됨', data.deps.length + '개 파일');
        });
        $el.on('click', '.dep-reveal', function () {
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
        mount: function () {
            bindEvents();
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
