var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UITextFontSize = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UITextFontSize', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setFontSize( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        component && component.refreshFontSize( value );
    }
});

Genie.Command.UITextFontString = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UITextFontString', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setString( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        component && component.refreshTextValue( value );
    }
});

Genie.Command.UITextFontColor = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UITextFontString', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setTextColor( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_IMAGE_VIEW );
        component && component.refreshFontColor( value );
    }
});

Genie.Command.UITextShadow = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UITextShadow', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        var enabled = value.enabled,
            offset  = value.offset,
            radius  = value.radius,
            color   = value.color;

        if( enabled ) {
            this._targetNode.enableShadow( color, offset, radius );
        }
        else {
            this._targetNode._labelRenderer.disableShadow();
        }
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_TEXT_VIEW );
        component && component.refreshTextShadow( value );
    },

    setCommandOnLogView : function( commandType, value ) {
        var enabled = value.enabled,
            offset  = value.offset,
            radius  = value.radius,
            color   = value.color;

        var strText = cc.formatStr( this.getCommandName() + " > ", enabled +","+ JSON.stringify(offset)+","+ radius +","+JSON.stringify(color));
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },
});

Genie.Command.UITextOutline = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UITextOutline', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        var enabled = value.enabled,
            size    = value.size,
            color   = value.color;

        if( enabled ) {
            this._targetNode.enableOutline( color, size );
        }
        else {
            this._targetNode._labelRenderer.disableStroke();
        }
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_TEXT_VIEW );
        component && component.refreshTextOutline( value );
    },

    setCommandOnLogView : function( commandType, value ) {
        var enabled = value.enabled,
            size    = value.size,
            color   = value.color;

        var strText = cc.formatStr( this.getCommandName() + " > ", enabled +","+ JSON.stringify(size)+","+JSON.stringify(color));
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },
});