Genie.Command.Transform = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'Transform', targetNode, args );

    },
    setCommand : function( commandType /* Genie.CommandType */ ) {
        var componentName = 'Transform';

        var value = ( commandType === Genie.CommandType.EXECUTE ) ? this._args.dest : this._args.src;

        switch ( this._args.strProp ) {
            case 'position':
                this._targetNode.setPosition( value );
                Genie.gizmoNode.followTarget( this._targetNode );
                this.setInspectorView( componentName, value );
                break;
            case 'scale':
                this._targetNode.setScale( value.x, value.y );
                Genie.gizmoNode.followTarget( this._targetNode );
                this.setInspectorView( componentName, cc.p( value.x, value.y ) );
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