// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 기본 노드 프로퍼티
Genie.Component.UIRoot = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( 'UIRoot' );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // using textures

        // ui action group
    },

    onchange : function( event ) {
        var value = parseFloat(event.target.value);
        switch ( event.target ) {

        }
    },

});