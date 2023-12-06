// 기본 노드 프로퍼티
Genie.Component.NodeProperty = Genie.Component.InspectorBase.extend({
    ctor : function ( ) {
        this._super();
        this.setName( "NodeProperty" );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();
        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className   : "fa-brands fa-codepen",
            style       : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // name
        this.input_name = HtmlHelper.createOneLongTextInput( rootDiv, "name", owner.getName(), false, this.onchange.bind(this) );

        // class name
        HtmlHelper.createOneLongTextInput( rootDiv, "className", owner._className, true );

        // instance id
        HtmlHelper.createOneLongTextInput( rootDiv, "instanceId", owner.__instanceId, true );

        // anchor
        var loc_anchorX = owner._getAnchorX().toFixed(1);
        var loc_anchorY = owner._getAnchorY().toFixed(1);
        this.input_anchor = HtmlHelper.createPointAttrib( rootDiv, "anchor",  [loc_anchorX,loc_anchorY], [false, false], this.onchange.bind(this) );

        // contentSize
        var loc_size = owner.getContentSize();
        var loc_width = Math.round( loc_size.width );
        var loc_height = Math.round( loc_size.height );
        this.input_size = HtmlHelper.createSizeAttrib( rootDiv, "contentSize",  [loc_width,loc_height], [false, false], this.onchange.bind(this) );

        // zorder
        this.input_order = HtmlHelper.createOneLongTextInput( rootDiv, "z-order", owner.getLocalZOrder(), false, this.onchange.bind(this) );

        // opacity
        this.input_opacity = HtmlHelper.createOneLongTextInput( rootDiv, "opacity", owner.getOpacity(), false, this.onchange.bind(this) );
        // this.input_opacity = HtmlHelper.createSliderAttrib( rootDiv, "opacity", owner.getOpacity(), 0, 255, false, this.onchange.bind(this) );

        // visible
        this.cb_visible = HtmlHelper.createCheckboxAttrib( rootDiv, 'visible', owner.isVisible(), false, this.onchange.bind(this) );
    },

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, loc_src, loc_dest, loc_strProp,
            strValue    = event.target.value,
            checkValid  = true;

        switch ( event.target ) {
            case this.input_name:
                checkValid = checkValid && ( strValue.length > 0 );
                checkValid || (this.input_name.value = owner.getName());

                loc_strProp = "name";
                loc_src     = owner.getName();
                loc_dest    = strValue;
                break;
            case this.input_anchor.x:
            case this.input_anchor.y:
                value       = parseFloat( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value >= 0 );

                loc_strProp = "anchor";
                loc_src     = owner.getAnchorPoint();
                loc_dest    = event.target === this.input_anchor.x ?  cc.p( value, owner.anchorY ) : cc.p( owner.anchorX, value );
                break;

            case this.input_size.width:
            case this.input_size.height:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value > 0 );

                loc_strProp = "size";
                loc_src     = cc.size( Math.round(owner.width), Math.round(owner.height) );
                loc_dest    = event.target === this.input_size.width ?  cc.size( value, Math.round(owner.height) ) : cc.size( Math.round(owner.width), value );
                break;
            case this.input_order:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );

                loc_strProp = "zorder";
                loc_src     = owner.getLocalZOrder();
                loc_dest    = value;
                break;
            case this.input_opacity:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value >= 0 );

                loc_strProp = "opacity";
                loc_src     = owner.getOpacity();
                loc_dest    = value;
                break;
            case this.cb_visible:
                loc_strProp = "visible";
                loc_src     = owner.isVisible();
                loc_dest    = event.target.checked;
                break;
            default:
                checkValid = false;
                break;
        }

        if( checkValid ) {
            cc.log("NodeProperty Component onchange : ", loc_src, loc_dest );
            Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                strProp : loc_strProp,
                src     : loc_src,
                dest    : loc_dest
            } ) );
        }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var dest    = paramObj.value;

        cc.log("NodeProperty Component setInspectorValue : ", dest );
        switch ( strProp ) {
            case 'name':
                this.input_name.value = dest;
                break;
            case 'anchor':
                this.input_anchor.x.value = dest.x;
                this.input_anchor.y.value = dest.y;
                break;
            case 'size':
                this.input_size.width.value  = dest.width;
                this.input_size.height.value = dest.height;
                break;
            case 'zorder':
                this.input_order.value = dest;
                break;
            case 'visible':
                this.cb_visible.checked = dest;
                break;
            case 'opacity':
                this.input_opacity.value = dest;
                break;
        }
    },

});