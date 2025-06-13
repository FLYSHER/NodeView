var color = {
    backgroundColor : cc.color(245,255,245),
    textColor : cc.color(0, 128, 255),
    seletTextColor : cc.color(255, 0, 0)
};

var UIListViewTest = cc.Node.extend({
    ctor: function() {
        this._super(color.backgroundColor);
        this.itemArray = [];
        this.cb = null;

        $('#animationTree').addClass('custom-tree-container');

        return true;
    },

    init : function (itemArray, cb) {
        this.itemArray = itemArray;
        this.cb = cb;

        const $container = $('#animationTree');
        $container.empty();

        if (!itemArray || itemArray.length === 0) {
            return;
        }

        itemArray.forEach(animName => {
            const $item = $(`
                <div class="custom-tree-item" data-anim-name="${animName}">
                    ${animName}
                </div>
            `);

            $item.draggable({
                appendTo: 'body',
                helper: function() {
                    const $helper = $(`<div class="custom-drag-helper">${$(this).text()}</div>`);

                    // 정확한 중앙값으로 cursorAt 설정
                    $(this).draggable("option", "cursorAt", {
                        left: 1,
                        top: 1
                    });

                    return $helper;
                },
                revert: 'invalid',
                zIndex: 9999
            });

            $item.on('click', () => {
                $container.find('.custom-tree-item').removeClass('selected');
                $item.addClass('selected');
                if (this.cb) {
                    this.cb(animName);
                }
            });

            $container.append($item);
        });
    },

    getSelectedAnimationName: function() {
        const $selectedItem = $('#animationTree').find('.custom-tree-item.selected');
        if ($selectedItem.length > 0) {
            return $selectedItem.data('anim-name');
        }
        return null;
    }
});