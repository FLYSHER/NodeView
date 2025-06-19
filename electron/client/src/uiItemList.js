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

        if ($container.find(`[data-asset-name="${assetInfo.name}"]`).length > 0) {
            return;
        }

        // 아이콘 타입과 텍스트를 결정하는 로직 추가
        let iconText = '';
        let typeClass = '';
        switch (assetInfo.type) {
            case 'armature':
                iconText = 'AR';
                typeClass = 'type-armature';
                break;
            case 'ui':
            case 'cocosstudio': // cocosstudio도 UI로 취급
                iconText = 'UI';
                typeClass = 'type-action';
                break;
            case 'spine':
                iconText = 'SP';
                typeClass = 'type-spine';
                break;
        }

        // 아이콘을 포함하도록 HTML 구조 변경
        const $item = $(`
        <div class="custom-tree-item" data-asset-name="${assetInfo.name}" data-asset-type="${assetInfo.type}">
            <span class="track-type-icon ${typeClass}">${iconText}</span>
            ${assetInfo.name}
        </div>
    `);

        $item.draggable({
            appendTo: "body",
            helper: function() {
                const assetName = $(this).data('asset-name');
                const $helper = $(`<div class="custom-drag-helper">${assetName}</div>`);
                $helper.data('assetName', assetName);

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
    },
});