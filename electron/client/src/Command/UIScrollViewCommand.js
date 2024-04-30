var Genie = Genie || {};
Genie.Command = Genie.Command || {};

Genie.Command.UIScrollViewSize = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIScrollViewCommand', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setContentSize( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_SCROLL_VIEW );
        component && component.refreshSizeValue( value );
    }
});

Genie.Command.UIScrollViewInnerSize = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIScrollViewCommand', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setInnerContainerSize( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_SCROLL_VIEW );
        component && component.refreshInnerSizeValue( value );
    }
});