var Properties = cc.Node.extend({
    ctor: function () {
        this._super(color.backgroundColor);

        // Tag
        $("#lTag").keydown(function (key) {
            if (key.keyCode === 13) {
                let tag = this.value;
                setTagData(tag);
                Tool.refreshNodeSkin();
                $("input[name=lTag]").val(tag);
            }
        });

        // position
        $("#lPosX").keydown(function (key) {
            if (key.keyCode === 13) {
                let pos = parseFloat(this.value)
                setMoveXData(pos);
                Tool.refreshNodeSkin();
                $("input[name=lPosX]").val(pos.toFixed(2));
            }
        });
        $("#lPosY").keydown(function (key) {
            if (key.keyCode === 13) {
                let pos = parseFloat(this.value)
                setMoveYData(pos);
                Tool.refreshNodeSkin();
                $("input[name=lPosY]").val(pos.toFixed(2));
            }
        });

        // scale
        $("#scaleX").keydown(function (key) {
            if (key.keyCode === 13) {
                let scale = parseFloat(this.value)
                setScaleXData(scale);
                Tool.refreshNodeSkin();
                $("input[name=scaleX]").val(scale.toFixed(2));
            }
        });
        $("#scaleY").keydown(function (key) {
            if (key.keyCode === 13) {
                let scale = parseFloat(this.value)
                setScaleYData(scale);
                Tool.refreshNodeSkin();
                $("input[name=scaleY]").val(scale.toFixed(2));
            }
        });

        // anchor
        $("#anchorX").keydown(function (key) {
            if (key.keyCode === 13) {
                let anchor = parseFloat(this.value)
                setAnchorXData(anchor);
                Tool.refreshNodeSkin();
                $("input[name=anchorX]").val(anchor.toFixed(2));
            }
        });
        $("#anchorY").keydown(function (key) {
            if (key.keyCode === 13) {
                let anchor = parseFloat(this.value)
                setAnchorYData(anchor);
                Tool.refreshNodeSkin();
                $("input[name=anchorY]").val(anchor.toFixed(2));
            }
        });

        this.lTag = document.getElementById('lTag');
        this.lPosX = document.getElementById('lPosX');
        this.lPosY = document.getElementById('lPosY');
        this.wPosX = document.getElementById('wPosX');
        this.wPosY = document.getElementById('wPosY');
        this.scaleX = document.getElementById('scaleX');
        this.scaleY = document.getElementById('scaleY');
        this.anchorX = document.getElementById('anchorX');
        this.anchorY = document.getElementById('anchorY');

        this.wPosX.disabled = true;
        this.wPosY.disabled = true;
        this.anchorX.disabled = true;
        this.anchorY.disabled = true;
        return true;
    },
    initRefresh: function () {
        this.init(
            {posX: 0, posY: 0},
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
        this.lTag.disabled = disable;
        this.lPosX.disabled = disable;
        this.lPosY.disabled = disable;
        this.scaleX.disabled = disable;
        this.scaleY.disabled = disable;

        this.wPosX.disabled = true;
        this.wPosY.disabled = true;
        this.anchorX.disabled = true;
        this.anchorY.disabled = true;
    },
    init: function (skin, localPosition, worldPosition, contentsSize, scale, anchor) {
        // Tag
        $("input[name=lTag]").val(skin.tag);

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