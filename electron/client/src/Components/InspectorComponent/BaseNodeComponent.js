// 기본 노드 프로퍼티
Genie.Component.NodeProperty = Genie.Component.InspectorBase.extend({
    ctor : function ( name ) {
        this._super();
        var loc_name = name || "NodeProperty";
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
            className : "fa-brands fa-codepen",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar("NodeProperty", iconObj);
        rootDiv.appendChild( titleBar );

        var div_name        = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_name, "name", "component_lineLabel");
        HtmlHelper.createTextInput( div_name, owner.getName(), "component_oneAttribInput", true )

        var div_className   = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_className, "className", "component_lineLabel");
        HtmlHelper.createTextInput( div_className, owner._className, "component_oneAttribInput", true );

        var div_instanceId   = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_instanceId, "instanceId", "component_lineLabel");
        HtmlHelper.createTextInput( div_instanceId, owner.__instanceId, "component_oneAttribInput", true );

        // anchor
        var div_anchor = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_anchor, "anchor", "component_lineLabel");

        HtmlHelper.createLabel( div_anchor, "x", "component_attribLabel");
        this.input_anchorX = HtmlHelper.createTextInput( div_anchor, owner.anchorX, "component_twoAttribInput", false, function(){ cc.log("anchorX changed") });

        HtmlHelper.createLabel( div_anchor, "y", "component_attribLabel");
        this.input_anchorY = HtmlHelper.createTextInput( div_anchor, owner.anchorY, "component_twoAttribInput", false, function(){ cc.log("anchorY changed") });

        // contentSize
        var div_size = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_size, "size", "component_lineLabel");

        HtmlHelper.createLabel( div_size, "w", "component_attribLabel");
        this.input_width = HtmlHelper.createTextInput( div_size, owner.width, "component_twoAttribInput", false, function(){ cc.log("anchorX changed") });

        HtmlHelper.createLabel( div_size, "h", "component_attribLabel");
        this.input_height = HtmlHelper.createTextInput( div_size, owner.height, "component_twoAttribInput", false, function(){ cc.log("anchorY changed") });

        // visible
        var div_visible = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_visible, "visible", "component_lineLabel");

        this.cb_visible = HtmlHelper.createCheckbox( div_visible, null, owner.isVisible(), function(){ cc.log("visible changed") } )

    },

});