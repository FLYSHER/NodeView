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
                this._targetNode.setScale( value );
                Genie.gizmoNode.followTarget( this._targetNode );
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

    // execute : function( ) {
    //     var trComp = this._targetNode.getComponent( 'Transform' );
    //
    //     switch ( this._strProp ) {
    //         case 'position':
    //             this._targetNode.setPosition( this._dest );
    //             Genie.gizmoNode.followTarget( this._targetNode );
    //
    //             trComp.setInspectorPosition( this._dest );
    //             break;
    //         case 'scale':
    //             this._targetNode.setScale( this._dest );
    //             Genie.gizmoNode.followTarget( this._targetNode );
    //             trComp.setInspectorScale( this._dest );
    //             break;
    //     }
    // },
    //
    // undo : function() {
    //     var trComp = this._targetNode.getComponent( 'Transform' );
    //
    //     switch ( this._strProp ) {
    //         case 'position':
    //             this._targetNode.setPosition( this._src );
    //             Genie.gizmoNode.followTarget( this._targetNode );
    //             trComp.setInspectorPosition( this._src );
    //             break;
    //         case 'scale':
    //             this._targetNode.setScale( this._src );
    //             Genie.gizmoNode.followTarget( this._targetNode );
    //             trComp.setInspectorScale( this._src );
    //             break;
    //     }
    //
    // },
});