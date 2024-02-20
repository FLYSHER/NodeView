// 기본 노드 프로퍼티
Genie.Component.NodeProperty = Genie.Component.InspectorBase.extend({
    ctor : function ( ) {
        this._super();
        this.setName( Genie.ComponentName.NODE_PROPERTY );
    },

    // override
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

        // z-order
        this.input_order = HtmlHelper.createOneLongTextInput( rootDiv, "z-order", owner.getLocalZOrder(), false, this.onchange.bind(this) );

        // cascade opacity
        this.cb_cascadeOpacity = HtmlHelper.createCheckboxAttrib( rootDiv, "cascadeOpacity", owner.isCascadeOpacityEnabled(), false, this.onchange.bind(this) );

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
            case this.input_name:
                checkValid = checkValid && ( strValue.length > 0 );
                checkValid || (this.input_name.value = owner.getName());

                if( checkValid ) {
                    Genie.ToolController.execute( new Genie.Command.NodeName( owner, {
                        src     : owner.getName(),
                        dest    : strValue
                    }) );
                }
                break;

            case this.input_anchor.x:
            case this.input_anchor.y:
                value       = parseFloat( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value >= 0 );

                if( checkValid ) {
                    loc_src     = owner.getAnchorPoint();
                    loc_dest    = event.target === this.input_anchor.x ?  cc.p( value, owner.anchorY ) : cc.p( owner.anchorX, value );

                    Genie.ToolController.execute( new Genie.Command.AnchorPoint( owner, {
                        src     : loc_src,
                        dest    : loc_dest
                    }) );
                }
                break;

            case this.input_size.width:
            case this.input_size.height:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value > 0 );

                if( checkValid ) {
                    loc_src     = cc.size( Math.round(owner.width), Math.round(owner.height) );
                    loc_dest    = event.target === this.input_size.width ?  cc.size( value, Math.round(owner.height) ) : cc.size( Math.round(owner.width), value );

                    Genie.ToolController.execute( new Genie.Command.ContentSize( owner, {
                        src     : loc_src,
                        dest    : loc_dest
                    }) );
                }
                break;

            case this.input_order:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                if( checkValid ) {
                    Genie.ToolController.execute( new Genie.Command.LocalZOrder( owner, {
                        src     : owner.getLocalZOrder(),
                        dest    : value
                    }) );
                }

                break;
            case this.cb_cascadeOpacity:
                Genie.ToolController.execute( new Genie.Command.CascadeOpacity( owner, {
                    src     : owner.isCascadeOpacityEnabled(),
                    dest    : event.target.checked
                }) );

                break;
            case this.input_opacity:
                value       = parseInt( strValue );
                checkValid  = checkValid && ( cc.isNumber( value ) );
                checkValid  = checkValid && ( value >= 0 );
                if( checkValid ) {
                    Genie.ToolController.execute( new Genie.Command.Opacity( owner, {
                        src     : owner.getOpacity(),
                        dest    : value
                    }) );
                }
                break;
            case this.cb_visible:
                Genie.ToolController.execute( new Genie.Command.NodeVisible( owner, {
                    src     : owner.isVisible(),
                    dest    : event.target.checked
                }) );
                break;
            default:
                break;
        }
    },

    refreshNodeName : function( value ) {
        this.input_name.value = value;
    },

    refreshAnchorValue : function( value ) {
        this.input_anchor.x.value = value.x;
        this.input_anchor.y.value = value.y;
    },

    refreshContentSize : function( value ) {
        this.input_size.width.value  = value.width;
        this.input_size.height.value = value.height;
    },

    refreshZOrderValue : function( value ) {
        this.input_order.value = value;
    },

    refreshVisibleValue : function( value ) {
        this.cb_visible.checked = value;
    },

    refreshOpacityValue : function( value ) {
        this.input_opacity.value = value;
    },

    refreshCascadeOpacityValue : function( value ) {
        this.cb_cascadeOpacity.value = value;
    },

    setInspectorValue : function( paramObj ) {
    },

});