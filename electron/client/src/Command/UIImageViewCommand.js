Genie.Command.UIImageView = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIImageView', targetNode, args );
    },

    setCommand : function( commandType ) {
        var strText,
            checkValid = true,
            value = ( commandType === Genie.CommandType.UNDO ) ? this._args.src : this._args.dest;

        switch ( this._args.strProp ) {
            case 'ignoreSize':
                this._targetNode.ignoreContentAdaptWithSize( value );
                strText = cc.formatStr( "ignoreSize  > ", value );
                break;
            case 'texFileName':
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame( value );
                if( spriteFrame ) {
                    this._targetNode.loadTexture( value, ccui.Widget.PLIST_TEXTURE );
                    strText = cc.formatStr( "change sprite  > ", value );
                }
                else {
                    checkValid = false;
                }
                break;
            default:
                checkValid = false;
                break;
        }

        if( checkValid ) {
            cc.log("UIImageView command setInspectorValue : ", value );
            Genie.gizmoNode.followTarget( this._targetNode );
            this.setInspectorView( this.getCommandName(), value );
            this.setCommandLog( commandType, this._targetNode.getName(), strText );
        }

    },



});