
Genie.Command.UILabelBMFontText = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UILabelBMFontText', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setString( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.UI_BITMAP_FONT );
        component && component.refreshTextValue( value );
    }

});