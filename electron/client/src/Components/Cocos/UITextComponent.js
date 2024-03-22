const { sentryRendererInit } = require('../../../../sentryRenderer');
sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UITextView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_TEXT_VIEW );
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
        this.input_fontSize = HtmlHelper.createOneLongTextInput( rootDiv, 'font size', owner.getFontSize(), false, this.onchange.bind(this) );
        this.input_fontName = HtmlHelper.createOneLongTextInput( rootDiv, 'font name', owner.getFontName(), true, null );
        this.input_text     = HtmlHelper.createOneLongTextInput( rootDiv, 'text', owner.getString(), false, this.onchange.bind(this) );
        this.input_textColor=  HtmlHelper.createColorAttrib( rootDiv, "color", Genie.Utils.rgbToHex( owner.getTextColor() ),  this.onchange.bind(this) );

        // shadow
        var div_shadow =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_shadow, "shadow", "component_groupTitleLabel" );

        this.cb_shadow      = HtmlHelper.createCheckboxAttrib( div_shadow, "enable", false, false, this.onchangeShadow.bind(this) );
        this.input_shadowOffset = HtmlHelper.createSizeAttrib( div_shadow, "offset",  [1,1], [false, false], this.onchangeShadow.bind(this) );
        this.input_shadowRadius = HtmlHelper.createOneLongTextInput( div_shadow, "blurRadius", 1.0, false, this.onchangeShadow.bind(this) )
        this.input_shadowColor  = HtmlHelper.createColorAttrib( div_shadow, "color", '#DEDEDEFF',  this.onchangeShadow.bind(this) );

        this.prevShadowParams = {
            offset  : cc.size( 1, 1),
            radius  : 1,
            color   : cc.color( "#DEDEDEFF".slice( 1 ) )
        }

        // outline
        var div_outline = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_outline, "outline", "component_groupTitleLabel" );

        this.cb_outline     = HtmlHelper.createCheckboxAttrib( div_outline, "enable", false, false, this.onchangeOutline.bind(this) );
        this.input_outlineSize  = HtmlHelper.createOneLongTextInput( div_outline, "size", 1.0, false, this.onchangeOutline.bind(this) )
        this.input_outlineColor = HtmlHelper.createColorAttrib( div_outline, "color", '#DEDEDEFF',  this.onchangeOutline.bind(this) );

        this.prevOutlineParams = {
            size    : 1,
            color   : cc.color( "#DEDEDEFF".slice( 1 ) )
        }

    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target ) {
            case this.input_fontSize:
                value = parseInt( strValue );
                if( cc.isNumber( value ) ) {
                    Genie.CommandManager.execute( new Genie.Command.UITextFontSize( owner, {
                        src     : owner.getFontSize(),
                        dest    : value
                    }));
                }
                break;

            case this.input_text:
                Genie.CommandManager.execute( new Genie.Command.UITextFontString( owner, {
                    src     : owner.getString(),
                    dest    : strValue
                } ) );
                break;

            case this.input_textColor:
                var loc_src = owner.getTextColor();
                var color   = cc.color( loc_src.r, loc_src.g, loc_src.b );

                var temp = strValue.slice( 1 );
                value = cc.color( temp );

                Genie.CommandManager.execute( new Genie.Command.UITextFontColor( owner, {
                    src     : color,
                    dest    : value
                } ) );
                break;
        }
    },

    onchangeShadow : function( event ) {
        var value, src,
            strValue = event.target.value;

        var owner = this.getOwner();

        switch ( event.target ) {
            case this.cb_shadow:
                value = event.target.checked;
                var width  = parseInt( this.input_shadowOffset.width.value );
                var height = parseInt( this.input_shadowOffset.height.value );
                var offset = cc.size( width, height );
                var radius = this.input_shadowRadius.value;
                var strHex = this.input_shadowColor.value;
                var color  = cc.color( strHex.slice( 1 ) );

                Genie.CommandManager.execute( new Genie.Command.UITextShadow( owner, {
                    src     : {
                        enabled : !value,
                        offset  : this.prevShadowParams.offset,
                        radius  : this.prevShadowParams.radius,
                        color   : this.prevShadowParams.color
                    },
                    dest    : {
                        enabled : value,
                        offset  : offset,
                        radius  : radius,
                        color   : color
                    }
                }));

                this.prevShadowParams = {
                    offset  : offset,
                    radius  : radius,
                    color   : color
                }

                break;
        }
    },

    //outlineColor, outlineSize
    onchangeOutline : function( event ) {
        var value, src,
            strValue = event.target.value;

        var owner = this.getOwner();

        switch ( event.target ) {
            case this.cb_outline:
                value = event.target.checked;
                var size   = parseInt( this.input_outlineSize.value )
                var strHex = this.input_outlineColor.value;
                var color  = cc.color( strHex.slice( 1 ) );

                Genie.CommandManager.execute( new Genie.Command.UITextOutline( owner, {
                    src     : {
                        enabled : !value,
                        size    : this.prevOutlineParams.size, // number
                        color   : this.prevOutlineParams.color
                    },
                    dest    : {
                        enabled : value,
                        size    : size, // number
                        color   : color
                    }
                }));

                this.prevOutlineParams = {
                    size    : size, // number
                    color   : color
                };

                break;
        }
    },

    refreshFontSize : function( value ) {
        this.input_fontSize.value = value;
    },

    refreshTextValue : function( value ) {
        this.input_text.value = value;
    },

    refreshFontColor : function( value ) {
        this.input_textColor.value = Genie.Utils.rgbToHex( value );
    },

    refreshTextShadow : function( value ) {
        var enabled = value.enabled,
            offset  = value.offset,
            radius  = value.radius,
            color   = value.color;

        this.cb_shadow.checked              = enabled;
        this.input_shadowRadius.value       = radius;
        this.input_shadowOffset.width.value = offset.width;
        this.input_shadowOffset.height.value= offset.height;
        this.input_shadowColor.value        = Genie.Utils.rgbToHex( color );
    },

    refreshTextOutline : function( value ) {
        var enabled = value.enabled,
            size    = value.size,
            color   = value.color;

        this.cb_outline.checked         = enabled;
        this.input_outlineSize.value    = size;
        this.input_outlineColor.value   = Genie.Utils.rgbToHex( color );
    },

});
