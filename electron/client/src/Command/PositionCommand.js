
Genie.Command.Position = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'position', targetNode, args );

        this._destPos = args.destPos;
        this._srcPos  = args.srcPos;
    },

    initProperty : function() {
        this._super();

        this._destPos   = null;
        this._srcPos    = null;
    },

    execute : function( ) {
        this._targetNode.setPosition( this._destPos );
    },

    undo : function() {
        this._targetNode.setPosition( this._srcPos );
    },
});