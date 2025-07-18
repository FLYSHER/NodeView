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

        console.log("[DEBUG - UIItemList Ctor] UIItemList 초기화 완료."); // 추가
        return true;
    },

    addAsset: function (assetInfo) {
        const $container = $('#fileNameTree');

        const itemDomId = `${assetInfo.name}-${assetInfo.type}`;

        const selector = '[data-asset-name="' + assetInfo.name + '"][data-asset-type="' + assetInfo.type + '"]';
        if ($container.find(selector).length > 0) {
            console.log(`[DEBUG - UIItemList] 에셋 '${assetInfo.name}' (타입: ${assetInfo.type})는 이미 Assets 패널에 존재합니다. 건너뜀.`);
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

        const $item = $(`
    <div class="custom-tree-item" data-asset-name="${assetInfo.name}" data-asset-type="${assetInfo.type}" id="${itemDomId}">
        <span class="track-type-icon ${typeClass}">${iconText}</span>
        ${assetInfo.name} <span style="color:var(--font-secondary); font-size:0.8em;">(${assetInfo.type.toUpperCase()})</span>
    </div>
    `);

        $item.on('contextmenu', (e) => {
            if (this._mainLayer && this._mainLayer._contextMenuManager) {
                this._mainLayer._contextMenuManager.showOtherContextMenu(e, e.currentTarget, null);
            } else {
                console.error("[ERROR - UIItemList - ContextMenu] _mainLayer 또는 _mainLayer._contextMenuManager가 유효하지 않습니다!");
            }
        });


        $item.draggable({
            appendTo: "body",
            // *** 핵심 수정: distance 옵션 추가 ***
            // 마우스를 10픽셀 이상 움직여야 드래그가 시작됩니다.
            distance: 10,
            // **********************************
            helper: function() {
                const dragAssetName = $(this).data('asset-name');
                const dragAssetType = $(this).data('asset-type');
                const $helper = $(`<div class="custom-drag-helper">${dragAssetName} (${dragAssetType.toUpperCase()})</div>`);
                $helper.data('assetName', dragAssetName);
                $helper.data('assetType', dragAssetType);

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
        console.log(`[DEBUG - UIItemList] 에셋 '${assetInfo.name}' (타입: ${assetInfo.type}) Assets 패널에 추가 완료.`);
    }
});