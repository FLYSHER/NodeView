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
            className : "fa-brands fa-codepen",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // name
        HtmlHelper.createOneLongTextInput( rootDiv, "name", owner.getName(), true );

        // class name
        HtmlHelper.createOneLongTextInput( rootDiv, "className", owner._className, true );

        // instance id
        HtmlHelper.createOneLongTextInput( rootDiv, "instanceId", owner.__instanceId, true );

        // anchor
        var loc_anchor = owner.getAnchorPoint();
        this.input_anchor = HtmlHelper.createPointAttrib( rootDiv, "anchor",  [loc_anchor.x,loc_anchor.y], [false, false], this.onchange.bind(this) );

        // contentSize
        var loc_size = owner.getContentSize();
        this.input_size = HtmlHelper.createSizeAttrib( rootDiv, "contentSize",  [loc_size.width,loc_size.height], [false, false], this.onchange.bind(this) );

        // zorder
        this.input_order = HtmlHelper.createOneLongTextInput( rootDiv, "z-order", owner.getLocalZOrder(), false, this.onchange.bind(this) );

        // opacity
        this.input_opacity = HtmlHelper.createOneLongTextInput( rootDiv, "opacity", owner.getOpacity(), false, this.onchange.bind(this) );

        // visible
        this.cb_visible = HtmlHelper.createCheckboxAttrib( rootDiv, 'visible', owner.isVisible(), false, this.onchange.bind(this) );
    },

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, loc_src, loc_dest, loc_strProp,
            strValue    = event.target.value,
            checkValid  = true;

        switch ( event.target ) {
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
                loc_src     = cc.size( owner.width, owner.height );
                loc_dest    = event.target === this.input_size.width ?  cc.size( value, owner.height ) : cc.size( owner.width, value );
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

        switch ( strProp ) {
            case 'anchor':
                this.input_anchor.x.value = dest.x;
                this.input_anchor.y.value = dest.y;
                break;
            case 'size':
                this.input_size.width.value     = dest.width;
                this.input_size.height.value    = dest.height;
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