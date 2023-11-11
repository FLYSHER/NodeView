Genie.Command.UILabelBMFont = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UILabelBMFontView', targetNode, args );
    },

    setCommand : function( commandType /* Genie.CommandType */ ) {
        var componentName = 'UILabelBMFontView';

        var value = ( commandType === Genie.CommandType.EXECUTE ) ? this._args.dest : this._args.src;

        switch ( this._args.strProp ) {
            // case 'fntFileName':
            //     this._targetNode.setFntFile( value );
            //     this.setInspectorView( componentName, value );
            //     break;
            case 'text':
                this._targetNode.setString( value );
                this.setInspectorView( componentName, value );
                break;
        }
    },

    execute : function() {
        this.setCommand( Genie.CommandType.EXECUTE );
    },

    undo : function() {
        this.setCommand( Genie.CommandType.UNDO );
    },

});