Genie.Command.Transform = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'Transform', targetNode, args );
    },

    setCommand : function( commandType /* Genie.CommandType */ ) {

        var strText,
            value = ( commandType === Genie.CommandType.UNDO ) ? this._args.src : this._args.dest;

        switch ( this._args.strProp ) {
            case 'position':
                this._targetNode.setPosition( value );
                Genie.gizmoNode.followTarget( this._targetNode );
                this.setInspectorView( this.getCommandName(), value );

                strText = cc.formatStr( "move  > x: %d, y: %d ", value.x, value.y );
                this.setCommandLog( commandType, this._targetNode.getName(), strText );
                break;
            case 'scale':
                this._targetNode.setScale( value.x, value.y );
                Genie.gizmoNode.followTarget( this._targetNode );
                this.setInspectorView( this.getCommandName(), cc.p( value.x, value.y ) );

                strText = cc.formatStr( "scale  > x: %d, y: %d ", value.x, value.y )
                this.setCommandLog( commandType, this._targetNode.getName(), strText );
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