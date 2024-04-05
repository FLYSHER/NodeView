// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UILayoutClippingType = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UILayoutClippingType', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setClippingType( value );
        Genie.GizmoController.updateGizmoByTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_LAYOUT );
        component.refreshClippingAttribute();
    }
});

Genie.Command.UILayoutClippingEnabled = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UILayoutClippingEnabled', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setClippingEnabled( value );
        Genie.GizmoController.updateGizmoByTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_LAYOUT );
        component.refreshClippingAttribute();
    }
});

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