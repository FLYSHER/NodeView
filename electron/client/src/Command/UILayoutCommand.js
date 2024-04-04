// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UILayoutBGImage = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UILayoutBGImage', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        // this._targetNode.ignoreContentAdaptWithSize( value );
        // Genie.GizmoController.updateGizmoByTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        // var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        // component && component.refreshIgnoreSize( value );
    }
});