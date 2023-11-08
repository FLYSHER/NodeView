
Genie.Command.Rotation = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'rotation', targetNode, args );

        this._destRot = args.dest;
        this._srcRot  = args.src;
    },

    initProperty : function() {
        this._super();

        this._destRot   = null;
        this._srcRot    = null;
    },

    execute : function( ) {
        this._targetNode.setRotation( this._destRot );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorRotation( this._destRot );
    },

    undo : function() {
        this._targetNode.setRotation( this._srcRot );
        Genie.gizmoNode.followTarget( this._targetNode );

        var trComp = this._targetNode.getComponent( 'Transform' );
        trComp.setInspectorRotation( this._srcRot );
    },
});