Genie.Command.NodeProperty = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'NodeProperty', targetNode, args );
    },

    setCommand : function( commandType ) {
        var strText,
            checkValid = true,
            value = ( commandType === Genie.CommandType.UNDO ) ? this._args.src : this._args.dest;

        switch ( this._args.strProp ) {
            case 'anchor':
                this._targetNode.setAnchorPoint( value );
                Genie.gizmoNode.followTarget( this._targetNode );
                strText = cc.formatStr( "anchor  > x: %d, y: %d ", value.x, value.y );
                break;
            case 'size':
                this._targetNode.setContentSize( value);
                Genie.gizmoNode.followTarget( this._targetNode );
                strText = cc.formatStr( "size  > x: %d, y: %d ", value.width, value.height );
                break;
            case 'zorder':
                this._targetNode.setLocalZOrder( value );
                strText = cc.formatStr( "z-order  >  %d ", value );
                break;
            case 'opacity':
                this._targetNode.setOpacity( value );
                strText = cc.formatStr( "opacity  >  %d ", value );
                break;
            case 'visible':
                this._targetNode.setVisible( value );
                strText = cc.formatStr( "visible  > ", value );
                break;
            default:
                checkValid = false;
                break;
        }

        if( checkValid ) {
            Genie.gizmoNode.followTarget( this._targetNode );
            this.setInspectorView( this.getCommandName(), value );
            this.setCommandLog( commandType, this._targetNode.getName(), strText );
        }

    },



});