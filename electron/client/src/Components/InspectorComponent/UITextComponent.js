// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UITextView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "UITextView" );
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof  ccui.Widget;
        ok &&= cc.isString( this._jsonName );
        return ok;
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // base
        this.input_fontSize = HtmlHelper.createOnePropertyTextInput( rootDiv, 'font size', owner.getFontSize(), false, this.onchange.bind(this) );
        this.input_fontName = HtmlHelper.createOnePropertyTextInput( rootDiv, 'font name', owner.getFontName(), true, null );
        this.input_text     = HtmlHelper.createOnePropertyTextInput( rootDiv, 'text', owner.getString(), false, this.onchange.bind(this) );
        this.input_textColor=  HtmlHelper.createColorAttrib( rootDiv, "color", Genie.Utils.rgbToHex( owner.getTextColor() ),  this.onchange.bind(this) );
        this.input_fontSize.id  = "ttf_fontSize";
        this.input_text.id      = "ttf_text";
        this.input_textColor.id = "ttf_textColor";

        // shadow
        var div_shadow =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_shadow, "shadow", "component_groupTitleLabel" );

        this.cb_shadow      = HtmlHelper.createCheckboxAttrib( div_shadow, "enable", false, false, this.onchangeShadow.bind(this) );
        this.cb_shadow.id   = "ttf_shadowEnable";
        this.input_shadowOffset = HtmlHelper.createSizeAttrib( div_shadow, "offset",  [1,1], [false, false], this.onchangeShadow.bind(this) );
        this.input_shadowRadius = HtmlHelper.createOnePropertyTextInput( div_shadow, "blurRadius", 1.0, false, this.onchangeShadow.bind(this) )
        this.input_shadowColor  = HtmlHelper.createColorAttrib( div_shadow, "color", '#DEDEDEFF',  this.onchangeShadow.bind(this) );

        // outline
        var div_outline = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_outline, "outline", "component_groupTitleLabel" );

        this.cb_outline     = HtmlHelper.createCheckboxAttrib( div_outline, "enable", false, false, this.onchangeOutline.bind(this) );
        this.cb_outline.id  = "ttf_outlineEnable";
        this.input_outlineSize  = HtmlHelper.createOnePropertyTextInput( div_outline, "size", 1.0, false, this.onchangeOutline.bind(this) )
        this.input_outlineColor = HtmlHelper.createColorAttrib( div_outline, "color", '#DEDEDEFF',  this.onchangeOutline.bind(this) );

    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target.id ) {
            case 'ttf_fontSize':
                value = parseInt( strValue );
                if( cc.isNumber( value ) ) {
                    Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                        strProp : 'fontSize',
                        src     : owner.getFontSize(),
                        dest    : value
                    }));
                }
                break;
            case 'ttf_text':
                value = strValue;
                Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                    strProp : 'text',
                    src     : owner.getString(),
                    dest    : value
                } ) );
                break;
            case "ttf_textColor":
                var loc_src = owner.getTextColor();

                var temp = strValue.slice( 1 );
                value = cc.color( temp );

                Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                    strProp : 'textColor',
                    src     : cc.color( loc_src.r, loc_src.g, loc_src.b ),
                    dest    : value
                } ) );
                break;
        }
    },

    onchangeShadow : function( event ) {
        var value, src,
            strValue = event.target.value;

        var owner = this.getOwner();

        switch ( event.target.id ) {
            case 'ttf_shadowEnable':
                value = event.target.checked;
                var width  = parseInt( this.input_shadowOffset.width.value );
                var height = parseInt( this.input_shadowOffset.height.value );
                var offset = cc.size( width, height );
                var radius = this.input_shadowRadius.value;
                var strHex = this.input_shadowColor.value;
                var temp   = strHex.slice( 1 );
                var color  = cc.color( temp );

                Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                    strProp : 'shadowEnable',
                    src     : !value,
                    dest    : value,
                    offset  : offset,
                    radius  : radius,
                    color   : color
                }));
                break;
        }
    },

    //outlineColor, outlineSize
    onchangeOutline : function( event ) {
        var value, src,
            strValue = event.target.value;

        var owner = this.getOwner();

        switch ( event.target.id ) {
            case 'ttf_outlineEnable':
                value = event.target.checked;
                var size   = parseInt( this.input_outlineSize.value )
                var strHex = this.input_outlineColor.value;
                var temp   = strHex.slice( 1 );
                var color  = cc.color( temp );

                Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                    strProp : 'outlineEnable',
                    src     : !value,
                    dest    : value,
                    size    : size, // number
                    color   : color
                }));
                break;
        }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var value   = paramObj.value;

        switch ( strProp ) {
            case 'fontSize':
                this.input_fontSize.value = value;
                break;
            case 'text':
                this.input_text.value = value;
                break;
            case 'textColor':
                this.input_textColor.value = Genie.Utils.rgbToHex( value );
                break;
            case 'shadowEnable':
                this.cb_shadow.checked      = value;
                this.input_shadowRadius.value   = paramObj.args.radius;
                this.input_shadowOffset.width.value = paramObj.args.offset.width;
                this.input_shadowOffset.height.value = paramObj.args.offset.height;
                this.input_shadowColor.value    = Genie.Utils.rgbToHex( paramObj.args.color );
                break;
            case 'outlineEnable':
                this.cb_outline.checked         = value;
                this.input_outlineSize.value    = paramObj.args.size;
                this.input_outlineColor.value   = Genie.Utils.rgbToHex( paramObj.args.color );
                break;

        }

    },
});
