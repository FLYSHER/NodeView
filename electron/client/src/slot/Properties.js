var Properties = cc.Node.extend({
    ctor: function () {
        this._super(color.backgroundColor);
        return true;
    },
    initRefresh: function () {
        this.init(
            {x: 0, y: 0},
            {x: 0, y: 0},
            {width: 0, height: 0},
            {x: 0, y: 0},
            {x: 0, y: 0},
            false
        );
    },
    init: function (localPosition, worldPosition, contentsSize, scale, anchor, disable) {
        // local Position
        $("input[name=lPosX]").val(localPosition.x.toFixed(2));
        $("input[name=lPosY]").val(localPosition.y.toFixed(2));

        // world Position
        $("input[name=wPosX]").val(worldPosition.x.toFixed(2));
        $("input[name=wPosY]").val(worldPosition.y.toFixed(2));

        $('#ContentsSize').html(
            "(" + contentsSize.width.toFixed(2) + " , " + contentsSize.height.toFixed(2) + ")"
        );

        // scale
        $("input[name=scaleX]").val(scale.x.toFixed(2));
        $("input[name=scaleY]").val(scale.y.toFixed(2));

        // anchore
        $("input[name=anchorX]").val(anchor.x.toFixed(2));
        $("input[name=anchorY]").val(anchor.y.toFixed(2));

        if (Tool_Select_Type === type_tab.type_symbol) {
            disable = true;
        }

        document.getElementById('lPosX').disabled = disable;
        document.getElementById('lPosY').disabled = disable;
        document.getElementById('wPosX').disabled = disable;
        document.getElementById('wPosY').disabled = disable;
        document.getElementById('scaleX').disabled = disable;
        document.getElementById('scaleY').disabled = disable;
        document.getElementById('anchorX').disabled = disable;
        document.getElementById('anchorY').disabled = disable;
    },
});