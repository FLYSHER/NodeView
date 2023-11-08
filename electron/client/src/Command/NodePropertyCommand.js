Genie.Command.NodeProperty = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'NodeProperty', targetNode, args );

        this._strProp   = args.strProp;
        this._dest      = args.dest;
        this._src       = args.src;
    },

    initProperty : function() {
        this._super();
        this._strProp= null;
        this._dest   = null;
        this._src    = null;
    },

    execute : function( ) {

        switch ( this._strProp ) {
            case 'anchor':
                this._targetNode.setAnchorPoint( this._dest );
                break;
            case 'size':
                this._targetNode.setContentSize( this._dest );
                break;
            case 'zorder':
                this._targetNode.setLocalZOrder( this._dest );
                break;
            case 'visible':
                this._targetNode.setVisible( this._dest );
                break;
        }

        Genie.gizmoNode.followTarget( this._targetNode );
        this.setInspectorView( this._dest );
    },

    undo : function() {
        switch ( this._strProp ) {
            case 'anchor':
                this._targetNode.setAnchorPoint( this._src );
                break;
            case 'size':
                this._targetNode.setContentSize( this._src );
                break;
            case 'zorder':
                this._targetNode.setLocalZOrder( this._src );
                break;
            case 'visible':
                this._targetNode.setVisible( this._src );
                break;
        }


        Genie.gizmoNode.followTarget( this._targetNode );
        this.setInspectorView( this._src );
    },

    setInspectorView : function( dest ) {
        var comp = this._targetNode.getComponent( 'NodeProperty' );
        if( !comp ) {
            return;
        }

        comp.setInspectorValue( {
            strProp : this._strProp,
            value   : dest
        });
    },


});