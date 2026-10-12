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
        this._filter = 'all';      // all | ui | spine | armature | image | missing
        this._query = '';

        $('#fileNameTree').addClass('custom-tree-container');

        // 검색 / 종류 필터 (요소는 아직 템플릿 안에 있지만 패널로 옮겨져도 그대로 유지된다)
        const searchEl = document.getElementById('assetSearch');
        if (searchEl) {
            searchEl.addEventListener('input', () => {
                this._query = searchEl.value.trim().toLowerCase();
                this._mainLayer.refreshAssetsPanel();
            });
        }
        const filtersEl = document.getElementById('assetFilters');
        if (filtersEl) {
            filtersEl.addEventListener('click', (e) => {
                const chip = e.target.closest('[data-filter]');
                if (!chip) return;
                this._filter = chip.getAttribute('data-filter');
                this._mainLayer.refreshAssetsPanel();
            });
        }

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

        entries.forEach(entry => {
            entry.data = ResourceRegistry.collect(entry.key);
            entry.missingCount = entry.data ? entry.data.stats.missing + entry.data.missingFrames.length : 0;
        });
        this._renderFilters(entries);

        // 종류 필터
        const typeOf = (t) => (t === 'cocosstudio' ? 'ui' : t);
        let visible = entries.filter(entry => {
            if (this._filter === 'all') return true;
            if (this._filter === 'missing') return entry.missingCount > 0 || !entry.loaded;
            return typeOf(entry.info.type) === this._filter;
        });

        // 검색: 에셋 이름이 맞으면 그대로, 리소스 파일명만 맞으면 펼쳐서 맞는 리소스만 보여준다
        const q = this._query;
        if (q) {
            visible = visible.filter(entry => {
                if (String(entry.info.name).toLowerCase().indexOf(q) >= 0) return true;
                const matched = entry.data ? entry.data.deps.some(d => d.fileName.toLowerCase().indexOf(q) >= 0) : false;
                if (matched) entry.depQuery = q;
                return matched;
            });
        }

        if (entries.length === 0) {
            $container.append('<div class="assets-empty">ExportJson · Spine json · png 파일이나 리소스 폴더를<br>이 패널로 끌어다 놓으세요.</div>');
        } else if (visible.length === 0) {
            $container.append('<div class="assets-empty">조건에 맞는 에셋이 없습니다.</div>');
        }
        visible.forEach(entry => $container.append(this._buildAssetRow(entry)));
        $container.scrollTop(scrollTop);

        // 패널 탭의 개수 표시와 하단 사용법 안내
        const resources = new Set();
        entries.forEach(entry => { if (entry.data) entry.data.deps.forEach(d => resources.add(d.fileName)); });
        $('.assets-tab-count').text(entries.length ? entries.length + ' 에셋 · ' + resources.size + ' 리소스' : '');
        $('#assetsHint').prop('hidden', entries.length === 0);
    },

    _renderFilters: function (entries) {
        const el = document.getElementById('assetFilters');
        if (!el) return;
        const count = { all: entries.length, ui: 0, spine: 0, armature: 0, image: 0, missing: 0 };
        entries.forEach(e => {
            const t = e.info.type === 'cocosstudio' ? 'ui' : e.info.type;
            if (count.hasOwnProperty(t)) count[t]++;
            if (e.missingCount > 0 || !e.loaded) count.missing++;
        });
        // 누락이 하나도 없으면 '누락' 칩은 숨긴다 (선택돼 있었다면 전체로)
        if (count.missing === 0 && this._filter === 'missing') this._filter = 'all';
        const chips = [['all', '전체'], ['ui', 'UI'], ['spine', 'Spine'], ['armature', 'Armature'], ['image', 'Image']];
        if (count.missing > 0) chips.push(['missing', '누락 ' + count.missing]);
        el.innerHTML = chips.map(([key, label]) =>
            `<button type="button" class="filter-chip${this._filter === key ? ' active' : ''}${key === 'missing' ? ' chip-missing' : ''}" data-filter="${key}" aria-pressed="${this._filter === key}">${label}</button>`
        ).join('');
    },

    // 에셋 행 오른쪽에 회색으로 보여줄 정보
    _assetMeta: function (info) {
        switch (info.type) {
            case 'ui': return 'ExportJson';
            case 'cocosstudio': return 'CocosStudio';
            case 'armature': return 'Armature';
            case 'spine':
                try {
                    const version = JSON.parse(Loader.spineData[info.name]).skeleton.spine;
                    return 'Spine ' + String(version).split('.').slice(0, 2).join('.');
                } catch (e) { return 'Spine'; }
            case 'image':
                const tex = Loader.textures[info.name];
                return tex ? tex.getPixelsWide() + '×' + tex.getPixelsHigh() : 'PNG';
        }
        return '';
    },

    _buildAssetRow: function (entry) {
        const self = this;
        const assetInfo = entry.info;
        const badge = this._typeBadge(assetInfo.type);
        const data = entry.data;
        const missingCount = entry.missingCount;
        const expandable = !!(data && data.deps.length > 0);
        const expanded = expandable && (!!this._expandedKeys[entry.key] || !!entry.depQuery);

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
    <span class="asset-row-end">
        <span class="asset-meta">${this._escape(this._assetMeta(assetInfo))}</span>
        ${statusHtml}
        <button type="button" class="asset-delete-btn" title="에셋 삭제" aria-label="${this._escape(assetInfo.name)} 삭제"><i class="fa fa-times" aria-hidden="true"></i></button>
    </span>
</div>`);
        $item.attr('data-asset-name', assetInfo.name).attr('data-asset-type', assetInfo.type);
        $wrap.append($item);

        // X 버튼: Hierarchy 와 같은 방식으로 바로 삭제 (씬에 배치된 인스턴스도 함께 삭제됨)
        $item.find('.asset-delete-btn').on('mousedown dblclick', (e) => e.stopPropagation());
        $item.find('.asset-delete-btn').on('click', (e) => {
            e.stopPropagation();
            this._mainLayer.deleteAsset(assetInfo.name, assetInfo.type);
        });

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
            $wrap.append(this._buildDepRows(entry.key, data, entry.depQuery));
        }
        return $wrap;
    },

    _buildDepRows: function (assetKey, data, depQuery) {
        const $deps = $('<div class="asset-deps"></div>');
        data.groups.forEach(group => {
            const items = depQuery ? group.items.filter(d => d.fileName.toLowerCase().indexOf(depQuery) >= 0) : group.items;
            if (items.length === 0) return;
            $deps.append(`<div class="asset-dep-group">${this._escape(group.title)}</div>`);
            items.forEach(dep => {
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
