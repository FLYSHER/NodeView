var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

var UIItemList = cc.Node.extend({
    ctor: function(mainLayer) {
        this._super();
        this._mainLayer = mainLayer;

        $('#fileNameTree').addClass('custom-tree-container');

        this.itemCallbacks = {};

        return true;
    },

    addAsset: function (assetInfo) {
        const $container = $('#fileNameTree');

        // [수정]: assetInfo.name과 assetInfo.type을 모두 사용하여 unique ID를 생성.
        // 이 unique ID는 Assets 패널의 DOM 요소 ID로 사용될 수 있습니다.
        const itemDomId = `${assetInfo.name}-${assetInfo.type}`;

        // [수정]: 이미 해당 name과 type을 가진 아이템이 DOM에 있는지 확인.
        // refreshAssetsPanel에서 empty() 후 addAsset을 호출하므로, 이 중복 체크는 사실상 필요 없지만,
        // 만약 refreshAssetsPanel이 아닌 개별 addAsset 호출이 있다면 필요할 수 있습니다.
        if ($container.find(`[data-asset-name="${assetInfo.name}"][data-asset-type="${assetInfo.type}"]`).length > 0) {
            return;
        }

        let iconText = '';
        let typeClass = '';
        switch (assetInfo.type) {
            case 'armature':
                iconText = 'AR';
                typeClass = 'type-armature';
                break;
            case 'ui':
            case 'cocosstudio':
                iconText = 'UI';
                typeClass = 'type-action';
                break;
            case 'spine':
                iconText = 'SP';
                typeClass = 'type-spine';
                break;
            case 'image':
                iconText = 'IMG';
                typeClass = 'type-image';
                break;
        }

        // [수정]: data-asset-type 속성 추가
        const $item = $(`
        <div class="custom-tree-item" data-asset-name="${assetInfo.name}" data-asset-type="${assetInfo.type}" id="${itemDomId}">
            <span class="track-type-icon ${typeClass}">${iconText}</span>
            ${assetInfo.name} <span style="color:var(--font-secondary); font-size:0.8em;">(${assetInfo.type.toUpperCase()})</span>
        </div>
        `);

        // 우클릭 이벤트 추가
        $item.on('contextmenu', function(e) {
            // Assets 항목은 Cocos 노드 ID가 없으므로 null 전달
            showContextMenu(e, this, null);
        });

        $item.draggable({
            appendTo: "body",
            helper: function() {
                const dragAssetName = $(this).data('asset-name');
                const dragAssetType = $(this).data('asset-type'); // [수정]: assetType도 헬퍼에 추가
                const $helper = $(`<div class="custom-drag-helper">${dragAssetName} (${dragAssetType.toUpperCase()})</div>`);
                $helper.data('assetName', dragAssetName);
                $helper.data('assetType', dragAssetType); // [수정]: assetType 데이터 전달

                $(this).draggable("option", "cursorAt", {
                    left: 1,
                    top: 1
                });

                return $helper;
            },
            revert: 'invalid',
            revertDuration: 200,
            zIndex: 9999,
            start: function(event, ui) {
                $('#resize-overlay').show();
            },
            stop: function(event, ui) {
                $('#resize-overlay').hide();
            }
        });

        $container.append($item);
    }
});