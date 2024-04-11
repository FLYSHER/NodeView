// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UIImageIgnoreSize = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIImageIgnoreSize', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.ignoreContentAdaptWithSize( value );
        Genie.GizmoController.updateGizmoByTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        component && component.refreshIgnoreSize( value );
    }
});

Genie.Command.UIImageTexName = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIImageTexName', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( value );
        if( spriteFrame ) {
            this._targetNode.loadTexture( value, ccui.Widget.PLIST_TEXTURE );
        }
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        component && component.refreshTextureFileName( value );
    }
});