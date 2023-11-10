// 기본 노드 프로퍼티
Genie.Component.Transform = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( 'Transform' );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar("Transform", iconObj);
        rootDiv.appendChild( titleBar );

        // position
        var loc_pos = owner.getPosition();
        this.input_pos = HtmlHelper.createPointAttrib( rootDiv, "position",  [loc_pos.x,loc_pos.y], [false, false], this.onchange.bind(this) );
        this.input_pos.x.id = "posX";
        this.input_pos.y.id = "posY";

        // rotation
        HtmlHelper.createOnePropertyTextInput( rootDiv, "rotation", owner.getRotation(), true );

        // scale
        var loc_scale = cc.p( owner.getScaleX(), owner.getScaleY() );
        this.input_scale = HtmlHelper.createPointAttrib( rootDiv, "scale",  [loc_scale.x, loc_scale.y], [false, false], this.onchange.bind(this) );
        this.input_scale.x.id = "scaleX";
        this.input_scale.y.id = "scaleY";
    },

    onchange : function( event ) {
        var value = parseFloat(event.target.value);
        if( !cc.isNumber( value ) ) {
            return;
        }

        var loc_src, loc_dest;
        var owner = this.getOwner();

        switch ( event.target.id ) {
            case 'posX' : {
                loc_src = owner.getPosition();
                loc_dest = cc.p( value, loc_src.y );
                Genie.ToolController.execute( new Genie.Command.Transform( this.getOwner(), {
                        strProp : 'position',
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            } break;
            case 'posY' : {
                loc_src = owner.getPosition();
                loc_dest = cc.p( loc_src.x, value );
                Genie.ToolController.execute( new Genie.Command.Transform( this.getOwner(), {
                        strProp : 'position',
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            }break;
            case 'scaleX' : {
                loc_src     = cc.p( owner.getScaleX(), owner.getScaleY() );
                loc_dest = cc.p( value, loc_src.y );
                Genie.ToolController.execute( new Genie.Command.Transform( this.getOwner(), {
                        strProp : 'scale',
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            } break;
            case 'scaleY' : {
                loc_src     = cc.p( owner.getScaleX(), owner.getScaleY() );
                loc_dest    = cc.p( loc_src.x, value );
                Genie.ToolController.execute( new Genie.Command.Transform( this.getOwner(), {
                        strProp : 'scale',
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            }break;
            // 아마추어 객체의 경우 rotation undefined 되는 경우가 있다.
            // case 'rotationZ': {
            //     loc_src = this.getOwner().getRotation();
            //     loc_dest= value;
            //     Genie.ToolController.execute( new Genie.Command.Rotation( this.getOwner(), {
            //             src  : loc_src,
            //             dest : loc_dest
            //         }
            //     ) );
            // } break;

        }
    },

    setInspectorValue : function( paramObj ) {
         var strProp = paramObj.args.strProp;
         var value   = paramObj.value;

         switch ( strProp ) {
             case 'position':
                this.input_pos.x.value = value.x;
                this.input_pos.y.value = value.y;
                break;
             case 'scale':
                 this.input_scale.x.value = value.x;
                 this.input_scale.y.value = value.y;
                 break;
         }
    }


});