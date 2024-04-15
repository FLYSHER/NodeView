// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UIScrollView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_SCROLL_VIEW );
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

        // inner container size
        var innerSize   = owner.getInnerContainerSize();
        var innerPos    = owner.getInnerContainerPosition();
        HtmlHelper.createSizeAttrib( rootDiv, "inner size", [innerSize.width, innerSize.height], [ false, false ] );
        HtmlHelper.createPointAttrib( rootDiv, 'inner position', [innerPos.x, innerPos.y], [true, true] );

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
