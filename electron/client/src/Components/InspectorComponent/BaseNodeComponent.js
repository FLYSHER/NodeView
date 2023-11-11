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

        // name
        HtmlHelper.createOnePropertyTextInput( rootDiv, "name", owner.getName(), true );

        // class name
        HtmlHelper.createOnePropertyTextInput( rootDiv, "className", owner._className, true );

        // instance id
        HtmlHelper.createOnePropertyTextInput( rootDiv, "instanceId", owner.__instanceId, true );

        // anchor
        var loc_anchor = owner.getAnchorPoint();
        this.input_anchor = HtmlHelper.createPointAttrib( rootDiv, "anchor",  [loc_anchor.x,loc_anchor.y], [false, false], this.onchange.bind(this) );
        this.input_anchor.x.id = 'anchorX';
        this.input_anchor.y.id = 'anchorY';

        // contentSize
        var loc_size = owner.getContentSize();
        this.input_size = HtmlHelper.createSizeAttrib( rootDiv, "size",  [loc_size.width,loc_size.height], [false, false], this.onchange.bind(this) );
        this.input_size.width.id    = "width";
        this.input_size.height.id   = "height";

        // zorder
        this.input_order = HtmlHelper.createOnePropertyTextInput( rootDiv, "z-order", owner.getLocalZOrder(), false, this.onchange.bind(this) );
        this.input_order.id = "zorder";

        // visible
        this.cb_visible = HtmlHelper.createCheckboxAttrib( rootDiv, 'visible', owner.isVisible(), false, this.onchange.bind(this) );
        this.cb_visible.id = "visible";
    },

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target.id ) {
            case 'anchorX':
                value = parseFloat( strValue );
                if( cc.isNumber( value ) ) {
                    Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                        strProp : 'anchor',
                        src     : owner.getAnchorPoint(),
                        dest    : cc.p( value,owner.anchorY )
                    } ) );
                }
                break;
            case 'anchorY':
                value = parseFloat( strValue );
                if( cc.isNumber( value ) ) {
                    Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                        strProp : 'anchor',
                        src     : owner.getAnchorPoint(),
                        dest    : cc.p( owner.anchorX, value )
                    } ) );
                }
                break;
            case 'width':
                value = parseInt( strValue );
                if( cc.isNumber( value ) && value > 0 ) {
                    Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                        strProp : 'size',
                        src     : cc.size( owner.width, owner.height ),
                        dest    : cc.size( value, owner.height )
                    } ) );
                }
                break;
            case 'height':
                value = parseInt( strValue );
                if( cc.isNumber( value ) && value > 0 ) {
                    Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                        strProp : 'size',
                        src     : cc.size( owner.width, owner.height ),
                        dest    : cc.size( owner.width, value )
                    } ) );
                }
                break;
            case 'zorder':
                value = parseInt( strValue );
                Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                    strProp : 'zorder',
                    src     : owner.getLocalZOrder(),
                    dest    : value
                } ) );
                break;
            case 'visible':
                value = event.target.checked;
                Genie.ToolController.execute( new Genie.Command.NodeProperty( owner, {
                    strProp : 'visible',
                    src     : owner.isVisible(),
                    dest    : value
                } ) );
                break;
            default:
                break;
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
        }
    },

});