// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UIButtonView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_BUTTON_VIEW );
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var normalTexSize = owner.getNormalTextureSize();
        HtmlHelper.createSizeAttrib( rootDiv, "_normalTexSize", [normalTexSize.width, normalTexSize.height], [true, true ] );
        HtmlHelper.createOneShortTextInput( rootDiv, "zoomScale", owner.getZoomScale(), false, this.onchange.bind(this));
        HtmlHelper.createCheckboxAttrib( rootDiv, "pressAction", owner.pressedActionEnabled, false, this.onchange.bind(this) );
        HtmlHelper.createCheckboxAttrib( rootDiv, "scale9Enabled", owner._scale9Enabled, false, this.onchange.bind(this) );

        HtmlHelper.createOneLongTextInput( rootDiv, "normalFileName", owner._normalFileName, false, this.onchange.bind(this));
        HtmlHelper.createOneLongTextInput( rootDiv, "clickedFileName", owner._clickedFileName, false, this.onchange.bind(this));
        HtmlHelper.createOneLongTextInput( rootDiv, "disabledFileName", owner._disabledFileName, false, this.onchange.bind(this));

        // sprite group
        var renderer = owner.getVirtualRenderer();
        HtmlHelper.createScale9RendererGroup( rootDiv, renderer, this.onchange_render.bind(this) );

    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

    },

    onchange_render : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;
    },



});
