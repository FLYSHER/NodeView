var Properties = cc.Node.extend({
    ctor: function () {
        this._super(color.backgroundColor);

        $("#lPosX").keydown(function (key) {
            if (key.keyCode === 13) {
                let pos = parseInt(this.value)
                setMoveXData(parseInt(pos));
                Tool.refreshNodeSkin();
            }
        });
        $("#lPosY").keydown(function (key) {
            if (key.keyCode === 13) {
                let pos = parseInt(this.value)
                setMoveYData(parseInt(pos));
                Tool.refreshNodeSkin();
            }
        });


        this.lPsX = document.getElementById('lPosX');
        this.lPosY = document.getElementById('lPosY');
        this.wPosX = document.getElementById('wPosX');
        this.wPosY = document.getElementById('wPosY');
        this.scaleX = document.getElementById('scaleX');
        this.scaleY = document.getElementById('scaleY');
        this.anchorX = document.getElementById('anchorX');
        this.anchorY = document.getElementById('anchorY');
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
        this.setDisable();
    },
    setDisable: function () {
        let disable = false;
        if (Tool_Select_Type === type_tab.type_symbol) {
            disable = true;
        }
        this.lPsX = disable;
        this.lPosY = disable;
        this.wPosX = disable;
        this.wPosY = disable;
        this.scaleX = disable;
        this.scaleY = disable;
        this.anchorX = disable;
        this.anchorY = disable;
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
    },
});