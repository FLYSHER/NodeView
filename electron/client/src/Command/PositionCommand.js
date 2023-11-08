
Genie.Command.Position = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'position', targetNode, args );

        this._dest = args.dest;
        this._src  = args.src;
    },

    initProperty : function() {
        this._super();

        this._dest   = null;
        this._src    = null;
    },

    execute : function( ) {
        this._targetNode.setPosition( this._dest );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorPosition( this._dest );
    },

    undo : function() {
        this._targetNode.setPosition( this._src );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorPosition( this._src );
    },
});