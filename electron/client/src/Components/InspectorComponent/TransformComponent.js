// 기본 노드 프로퍼티
Genie.Component.Transform = Genie.Component.InspectorBase.extend({
    ctor : function ( name ) {
        this._super();
        var loc_name = name || "Transform";
        this.setName( loc_name );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv2();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar("Transform", iconObj);
        rootDiv.appendChild( titleBar );

        // position
        var div_pos = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_pos, "Position", "component_lineLabel");

        HtmlHelper.createLabel( div_pos, "X", "component_attribLabel");
        this.input_posX = HtmlHelper.createTextInput( div_pos, owner.x, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_posX.id = 'positionX';

        HtmlHelper.createLabel( div_pos, "Y", "component_attribLabel");
        this.input_posY = HtmlHelper.createTextInput( div_pos, owner.y, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_posY.id = 'positionY';

        // rotation
        var div_rot = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_rot, "Rotation", "component_lineLabel");

        HtmlHelper.createLabel( div_rot, "Z", "component_attribLabel");
        this.input_rot = HtmlHelper.createTextInput( div_rot, owner.getRotation(), "component_twoAttribInput", true, this.onchange.bind(this) );
        this.input_rot.id = "rotationZ";

        // scale
        var div_scale = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_scale, "Scale", "component_lineLabel");

        HtmlHelper.createLabel( div_scale, "X", "component_attribLabel");
        this.input_scaleX = HtmlHelper.createTextInput( div_scale, owner.getScaleX(), "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_scaleX.id = 'scaleX';

        HtmlHelper.createLabel( div_scale, "Y", "component_attribLabel");
        this.input_scaleY = HtmlHelper.createTextInput( div_scale, owner.getScaleY(), "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_scaleY.id = 'scaleY';

    },

    onchange : function( event ) {
        var value = parseFloat(event.target.value);
        if( !cc.isNumber( value ) ) {
            return;
        }

        var loc_src, loc_dest;

        switch ( event.target.id ) {
            case 'positionX' : {
                loc_src = this.getOwner().getPosition();
                loc_dest = cc.p( value, loc_src.y );
                Genie.ToolController.execute( new Genie.Command.Position( this.getOwner(), {
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            } break;
            case 'positionY' : {
                loc_src = this.getOwner().getPosition();
                loc_dest = cc.p( loc_src.x, value );
                Genie.ToolController.execute( new Genie.Command.Position( this.getOwner(), {
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            }break;
            case 'scaleX' : {
                loc_src = cc.p( this.getOwner().getScaleX(), this.getOwner().getScaleY() );
                loc_dest = cc.p( value, loc_src.y );
                Genie.ToolController.execute( new Genie.Command.Scale( this.getOwner(), {
                        src  : loc_src,
                        dest : loc_dest
                    }
                ) );
            } break;
            case 'scaleY' : {
                loc_src = cc.p( this.getOwner().getScaleX(), this.getOwner().getScaleY() );
                loc_dest = cc.p( loc_src.x, value );
                Genie.ToolController.execute( new Genie.Command.Scale( this.getOwner(), {
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

    setInspectorPosition : function( newPosOrxValue, yValue ) {
        if( yValue === undefined ) {
            this.input_posX.value = newPosOrxValue.x;
            this.input_posY.value = newPosOrxValue.y;
        }
        else {
            this.input_posX.value = newPosOrxValue;
            this.input_posY.value = yValue;
        }
    },

    setInspectorRotation : function( degree ) {
        this.input_rot.value = degree;
    },

    setInspectorScale   : function( x, y ) {
        this.input_scaleX.value = x;
        this.input_scaleY.value = y;
    },

});