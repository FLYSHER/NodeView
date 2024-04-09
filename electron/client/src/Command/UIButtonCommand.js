var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UIButtonPressAction = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIButtonPressAction', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value /* args.src or args.dest */ ) {
        this._targetNode.setPressedActionEnabled( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_BUTTON );
        component.refreshButtonAttrib();
    }
});

Genie.Command.UIButtonZoomScale = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIButtonZoomScale', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value /* args.src or args.dest */ ) {
        this._targetNode.setZoomScale( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_BUTTON );
        component.refreshButtonAttrib();
    }
});

Genie.Command.UIButtonTextures = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIButtonTextures', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value /* args.src or args.dest */ ) {
        var args = this.getArgsObj();
        switch ( args.strState ) {
            case Genie.UIButtonState.NORMAL:
                this._targetNode.loadTextureNormal( value, ccui.Widget.PLIST_TEXTURE )
                break;
            case Genie.UIButtonState.CLICKED:
                if( cc.isString( value ) && value.length === 0 ) {
                    this._targetNode._pressedTextureLoaded = false;
                    this._targetNode._buttonClickedSpriteFrame = null;
                    this._targetNode._clickedFileName = "";
                }
                else {
                    this._targetNode.loadTexturePressed( value, ccui.Widget.PLIST_TEXTURE )
                }
                break;
            case Genie.UIButtonState.DISABLED:
                this._targetNode.loadTextureDisabled( value, ccui.Widget.PLIST_TEXTURE )
                break;
        }

        // Genie.GizmoController.updateGizmoByTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_BUTTON );
        component.refreshStateTextures();
    }
});