
Genie.Command.Scale = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'scale', targetNode, args );

        this._dest = args.dest;
        this._src  = args.src;
    },

    initProperty : function() {
        this._super();

        this._dest   = null;
        this._src    = null;
    },

    execute : function( ) {
        this._targetNode.setScale( this._dest.x, this._dest.y );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorScale( this._dest.x, this._dest.y );
    },

    undo : function() {
        this._targetNode.setScale( this._src.x, this._src.y );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorScale( this._src.x, this._src.y );
    },
});