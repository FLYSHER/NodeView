// 기본 노드 프로퍼티
Genie.Component.Transform = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( Genie.ComponentName.TRANSFORM );
    },

    // override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // position
        var loc_pos = owner.getPosition();
        this.input_pos = HtmlHelper.createPointAttrib( rootDiv, "position",  [ parseFloat( loc_pos.x ).toFixed(0), parseFloat(loc_pos.y).toFixed(0)], [false, false], this.onchange.bind(this) );
        this.input_pos.x.id = "posX";
        this.input_pos.y.id = "posY";

        // rotation
        HtmlHelper.createOneShortTextInput( rootDiv, "rotation", owner.getRotation(), true );

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
                loc_src     = cc.p( Math.round( owner.x ) , Math.round( owner.y ) )
                loc_dest    = cc.p( Math.round( value ), loc_src.y );
                this.onchange_positionValue( loc_src, loc_dest );
            } break;
            case 'posY' : {
                loc_src = owner.getPosition();
                loc_dest = cc.p( loc_src.x, value.toFixed(0) );
                this.onchange_positionValue( loc_src, loc_dest );
            }break;
            case 'scaleX' : {
                loc_src  = cc.p( owner.getScaleX(), owner.getScaleY() );
                loc_dest = cc.p( value, loc_src.y );
                this.onchange_scaleValue( loc_src, loc_dest );
            } break;
            case 'scaleY' : {
                loc_src     = cc.p( owner.getScaleX(), owner.getScaleY() );
                loc_dest    = cc.p( loc_src.x, value );
                this.onchange_scaleValue( loc_src, loc_dest );
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

    onchange_positionValue : function( src, dest ) {
        var command = new Genie.Command.TransformPosition( this.getOwner(), {
                src  : src,
                dest : dest
            }
        );

        Genie.ToolController.execute( command );
    },

    onchange_scaleValue : function( src, dest ) {
        var command = new Genie.Command.TransformScale( this.getOwner(), {
                src  : src,
                dest : dest
            }
        );

        Genie.ToolController.execute( command );
    },

    refreshPositionValue : function( value ) {
        this.input_pos.x.value = parseInt(value.x);
        this.input_pos.y.value = parseInt(value.y);
    },

    refreshScaleValue : function( value ) {
        this.input_scale.x.value = parseFloat(value.x).toFixed(2);
        this.input_scale.y.value = parseFloat(value.y).toFixed(2);
    },

    setInspectorValue : function( paramObj ) {

    }


});