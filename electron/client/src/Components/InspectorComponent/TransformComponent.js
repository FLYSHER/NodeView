// 기본 노드 프로퍼티
Genie.Component.Transform = Genie.Component.InspectorBase.extend({
    ctor : function ( name ) {
        this._super();
        var loc_name = name || "Transform";
        this.setName( loc_name );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv2();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar("Transform", iconObj);
        rootDiv.appendChild( titleBar );

        // position
        var div_pos = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_pos, "Position", "component_lineLabel");

        HtmlHelper.createLabel( div_pos, "X", "component_attribLabel");
        this.input_posX = HtmlHelper.createTextInput( div_pos, owner.x, "component_twoAttribInput", false, function(){ cc.log("x changed") });

        HtmlHelper.createLabel( div_pos, "Y", "component_attribLabel");
        this.input_posY = HtmlHelper.createTextInput( div_pos, owner.y, "component_twoAttribInput", false, function(){ cc.log("y changed") });

        // rotation
        var div_rot = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_rot, "Rotation", "component_lineLabel");

        HtmlHelper.createLabel( div_rot, "Z", "component_attribLabel");
        this.input_rot = HtmlHelper.createTextInput( div_rot, owner.getRotation(), "component_twoAttribInput", false, function(){ cc.log("rot changed") });

        // scale
        var div_scale = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_scale, "Scale", "component_lineLabel");

        HtmlHelper.createLabel( div_scale, "X", "component_attribLabel");
        this.input_scaleX = HtmlHelper.createTextInput( div_scale, owner.getScaleX(), "component_twoAttribInput", false, function(){ cc.log("sx changed") });

        HtmlHelper.createLabel( div_scale, "Y", "component_attribLabel");
        this.input_scaleY = HtmlHelper.createTextInput( div_scale, owner.getScaleY(), "component_twoAttribInput", false, function(){ cc.log("sy changed") });

    },

    setInspectorPosition : function( x, y ) {
        this.input_posX.value = x;
        this.input_posY.value = y;
    },

    setInspectorRotation : function( degree ) {
        this.input_rot.value = degree;
    },

    setInspectorScale   : function( sx, sy ) {
        this.input_scaleX.value = sx;
        this.input_scaleY.value = sy;
    },

});