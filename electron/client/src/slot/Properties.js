var Properties = cc.Node.extend({
    ctor: function () {
        this._super(color.backgroundColor);
        return true;
    },

    init: function (localPosition, worldPosition, contentsSize, scale, anchor) {
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
    },
});