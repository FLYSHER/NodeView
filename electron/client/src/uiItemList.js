var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

/**
 * Assets 패널
 * - 로드된 에셋: 드래그해서 Game View 에 인스턴스 생성 (.custom-tree-item)
 * - 로드 대기/누락 에셋: 정의 파일은 읽었지만 텍스처 등이 없어 아직 쓸 수 없는 에셋
 * - 각 에셋을 펼치면 사용하는 리소스(plist, png, fnt, atlas)와 상태를 보여준다
 */
var UIItemList = cc.Node.extend({
    ctor: function(mainLayer) {
        this._super();
        this._mainLayer = mainLayer;
        this._expandedKeys = {};
        this._selectedKey = null;

        $('#fileNameTree').addClass('custom-tree-container');

        this.itemCallbacks = {};
        return true;
    },

    _typeBadge: function (type) {
        switch (type) {
            case 'armature': return { text: 'AR', cls: 'type-armature' };
            case 'ui':
            case 'cocosstudio': return { text: 'UI', cls: 'type-action' };
            case 'spine': return { text: 'SP', cls: 'type-spine' };
            case 'image': return { text: 'IMG', cls: 'type-image' };
        }
        return { text: '?', cls: '' };
    },

    _escape: function (text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    },

    /**
     * Assets 패널 전체를 다시 그린다.
     * @param {Object} assetLibrary MainLayer.assetLibrary (로드 완료된 에셋)
     */
    render: function (assetLibrary) {
        const $container = $('#fileNameTree');
        const scrollTop = $container.scrollTop();
        $container.empty();

        const entries = [];
        for (const key in assetLibrary) {
            if (assetLibrary.hasOwnProperty(key)) {
                entries.push({ key: key, info: assetLibrary[key], loaded: true });
            }
        }
        // 정의 파일은 읽었지만 아직 로드가 끝나지 않은 에셋
        ResourceRegistry.getSources().forEach(src => {
            if (!assetLibrary[src.key]) {
                entries.push({ key: src.key, info: { name: src.name, type: src.type }, loaded: false });
            }
        });

        entries.forEach(entry => $container.append(this._buildAssetRow(entry)));
        $container.scrollTop(scrollTop);
    },

    _buildAssetRow: function (entry) {
        const self = this;
        const assetInfo = entry.info;
        const badge = this._typeBadge(assetInfo.type);
        const data = ResourceRegistry.collect(entry.key);
        const missingCount = data ? data.stats.missing + data.missingFrames.length : 0;
        const expandable = !!(data && data.deps.length > 0);
        const expanded = expandable && !!this._expandedKeys[entry.key];

        const $wrap = $('<div class="asset-entry"></div>');

        let statusHtml = '';
        if (missingCount > 0) {
            statusHtml = `<span class="asset-badge missing">누락 ${missingCount}</span>`;
        } else if (!entry.loaded) {
            statusHtml = `<span class="asset-badge pending">로드 대기</span>`;
        }

        const rowClass = entry.loaded ? 'custom-tree-item' : 'asset-row-pending';
        const $item = $(`
<div class="${rowClass} asset-row${this._selectedKey === entry.key ? ' selected' : ''}" data-asset-key="${this._escape(entry.key)}">
    <span class="asset-caret${expandable ? '' : ' empty'}" aria-hidden="true">${expandable ? (expanded ? '▾' : '▸') : ''}</span>
    <span class="track-type-icon ${badge.cls}">${badge.text}</span>
    <span class="asset-name">${this._escape(assetInfo.name)}</span>
    <span class="asset-type">(${assetInfo.type.toUpperCase()})</span>
    ${statusHtml}
</div>`);
        $item.attr('data-asset-name', assetInfo.name).attr('data-asset-type', assetInfo.type);
        $wrap.append($item);

        $item.find('.asset-caret').on('click', (e) => {
            e.stopPropagation();
            if (!expandable) return;
            this._expandedKeys[entry.key] = !this._expandedKeys[entry.key];
            this._mainLayer.refreshAssetsPanel();
        });

        $item.on('dblclick', (e) => {
            if (!expandable || $(e.target).hasClass('asset-caret')) return;
            this._expandedKeys[entry.key] = !this._expandedKeys[entry.key];
            this._mainLayer.refreshAssetsPanel();
        });

        $item.on('click', (e) => {
            // 로드되지 않은 에셋은 원인(누락 파일)을 바로 볼 수 있게 Dependencies 패널을 앞으로
            this._select(entry.key, entry.loaded ? undefined : null);
            if (entry.loaded) {
                this._mainLayer.setLastSelectedItem({
                    type: 'asset',
                    data: { name: assetInfo.name, type: assetInfo.type }
                });
            }
        });

        if (entry.loaded) {
            $item.on('contextmenu', (e) => {
                this._select(entry.key);
                this._mainLayer.setLastSelectedItem({
                    type: 'asset',
                    data: { name: assetInfo.name, type: assetInfo.type }
                });
                if (this._mainLayer && this._mainLayer._contextMenuManager) {
                    this._mainLayer._contextMenuManager.showOtherContextMenu(e, e.currentTarget, null);
                }
            });

            $item.draggable({
                appendTo: "body",
                distance: 10,
                helper: function() {
                    const dragAssetName = $(this).data('asset-name');
                    const dragAssetType = $(this).data('asset-type');
                    const $helper = $(`<div class="custom-drag-helper">${self._escape(dragAssetName)} (${String(dragAssetType).toUpperCase()})</div>`);
                    $helper.data('assetName', dragAssetName);
                    $helper.data('assetType', dragAssetType);
                    $(this).draggable("option", "cursorAt", { left: 1, top: 1 });
                    return $helper;
                },
                revert: 'invalid',
                revertDuration: 200,
                zIndex: 9999,
                start: function(event, ui) { $('#resize-overlay').show(); },
                stop: function(event, ui) { $('#resize-overlay').hide(); }
            });
        }

        if (expanded) {
            $wrap.append(this._buildDepRows(entry.key, data));
        }
        return $wrap;
    },

    _buildDepRows: function (assetKey, data) {
        const $deps = $('<div class="asset-deps"></div>');
        data.groups.forEach(group => {
            $deps.append(`<div class="asset-dep-group">${this._escape(group.title)}</div>`);
            group.items.forEach(dep => {
                const meta = dep.status === 'missing' ? '누락'
                    : dep.status === 'pending' ? '대기'
                    : (dep.info || '');
                const $row = $(`
<div class="asset-dep-row status-${dep.status}" data-file-name="${this._escape(dep.fileName)}" title="${this._escape((dep.fullPath || dep.ref) + (dep.status === 'ok' ? ' — 더블클릭: Resource View 로 열기' : ''))}">
    <span class="res-kind kind-${dep.kind}">${this._escape(dep.kind.toUpperCase())}</span>
    <span class="asset-dep-name">${this._escape(dep.fileName)}</span>
    <span class="asset-dep-meta">${this._escape(meta)}</span>
</div>`);
                $row.on('click', (e) => {
                    e.stopPropagation();
                    this._select(assetKey, dep.fileName);
                });
                // 더블클릭 → Resource View 탭으로 열기
                $row.on('dblclick', (e) => {
                    e.stopPropagation();
                    if (dep.status === 'ok') PanelManager.openResource(dep.fileName, dep.kind);
                });
                $deps.append($row);
            });
        });
        if (data.missingFrames.length > 0) {
            const $row = $(`<div class="asset-dep-row status-missing"><span class="res-kind kind-frame">FRAME</span><span class="asset-dep-name">시트에 없는 프레임 ${data.missingFrames.length}개</span></div>`);
            $row.on('click', (e) => {
                e.stopPropagation();
                this._select(assetKey, null);
            });
            $deps.append($row);
        }
        return $deps;
    },

    _select: function (assetKey, fileName) {
        this._selectedKey = assetKey;
        const $container = $('#fileNameTree');
        $container.find('.asset-row').removeClass('selected');
        $container.find('.asset-row').filter(function () { return $(this).data('asset-key') === assetKey; }).addClass('selected');
        $container.find('.asset-dep-row').removeClass('selected');

        if (typeof DependenciesPanel !== 'undefined') {
            DependenciesPanel.showAsset(assetKey, fileName || null);
            if (fileName !== undefined) {
                // 리소스 행을 누르면 Dependencies 패널을 앞으로 가져온다
                PanelManager.showComponent('dependencies');
            }
        }
    },

    getSelectedKey: function () {
        return this._selectedKey;
    }
});
