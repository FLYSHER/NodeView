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
        var titleBar = HtmlHelper.createComponentBar("NodeProperty", iconObj);
        rootDiv.appendChild( titleBar );

        var div_name        = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_name, "name", "component_lineLabel");
        HtmlHelper.createTextInput( div_name, owner.getName(), "component_oneAttribInput", true )

        var div_className   = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_className, "className", "component_lineLabel");
        HtmlHelper.createTextInput( div_className, owner._className, "component_oneAttribInput", true );

        var div_instanceId   = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_instanceId, "instanceId", "component_lineLabel");
        HtmlHelper.createTextInput( div_instanceId, owner.__instanceId, "component_oneAttribInput", true );

        // anchor
        var div_anchor = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_anchor, "anchor", "component_lineLabel");

        HtmlHelper.createLabel( div_anchor, "x", "component_attribLabel");
        this.input_anchorX = HtmlHelper.createTextInput( div_anchor, owner.anchorX, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_anchorX.id = "anchorX";

        HtmlHelper.createLabel( div_anchor, "y", "component_attribLabel");
        this.input_anchorY = HtmlHelper.createTextInput( div_anchor, owner.anchorY, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_anchorY.id = "anchorY";

        // contentSize
        var div_size = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_size, "size", "component_lineLabel");

        HtmlHelper.createLabel( div_size, "w", "component_attribLabel");
        this.input_width = HtmlHelper.createTextInput( div_size, owner.width, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_width.id = "width";

        HtmlHelper.createLabel( div_size, "h", "component_attribLabel");
        this.input_height = HtmlHelper.createTextInput( div_size, owner.height, "component_twoAttribInput", false, this.onchange.bind(this) );
        this.input_height.id = "height";

        // zorder
        var div_zorder   = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_zorder, "zorder", "component_lineLabel");
        this.input_zorder = HtmlHelper.createTextInput( div_zorder, owner.getLocalZOrder(), "component_oneAttribInput", true, this.onchange.bind(this) );
        this.input_zorder.id = "zorder";

        // visible
        var div_visible = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_visible, "visible", "component_lineLabel");
        this.cb_visible = HtmlHelper.createCheckbox( div_visible, null, owner.isVisible(), false, this.onchange.bind(this)  );
        this.cb_visible.id = "visible";
    },

    onchange : function( event ) {
        var value,
            owner = this.getOwner();

        if( event.target.id === 'visible' ) {
            value = event.target.checked;
        }
        else {
            value = parseFloat(event.target.value);
            if( !cc.isNumber( value ) || !owner ) {
                return;
            }
        }


        var strProp, loc_src, loc_dest;
        var validId = true;
        switch ( event.target.id ) {
            case 'anchorX':
                strProp     = 'anchor';
                loc_src     = owner.getAnchorPoint();
                loc_dest    = cc.p( value, loc_src.y );
                break;
            case 'anchorY':
                strProp     = 'anchor';
                loc_src     = owner.getAnchorPoint();
                loc_dest    = cc.p( loc_src.x, value );
                break;
            case 'width':
                if( value <= 0 ) {
                    return;
                }
                strProp     = 'size';
                loc_src     = owner.getContentSize();
                loc_dest    = cc.size( value, loc_src.height );
                break;
            case 'height':
                if( value <= 0 ) {
                    return;
                }
                strProp     = 'size';
                loc_src     = owner.getContentSize();
                loc_dest    = cc.size( loc_src.width, value );
                break;
            case 'zorder':
                strProp     = 'zorder';
                loc_src = owner.getLocalZOrder();
                loc_dest = value;
                break;
            case 'visible':
                strProp     = 'visible';
                loc_src     = owner.isVisible();
                loc_dest    = value;
                break;
            default:
                validId = false;
                break;
        }

        if( validId ) {
            Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                strProp : strProp,
                src     : loc_src,
                dest    : loc_dest
            }) );
        }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var dest    = paramObj.value;

        switch ( strProp ) {
            case 'anchor':
                this.input_anchorX.value = dest.x;
                this.input_anchorY.value = dest.y;
                break;
            case 'size':
                this.input_width.value = dest.width;
                this.input_height.value = dest.height;
                break;
            case 'zorder':
                this.input_zorder.value = dest;
                break;
            case 'visible':
                this.cb_visible.checked = dest;
                break;
        }
    },

});