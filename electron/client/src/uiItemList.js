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

        const $item = $(`
            <div class="custom-tree-item" data-asset-name="${assetInfo.name}" data-asset-type="${assetInfo.type}">
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