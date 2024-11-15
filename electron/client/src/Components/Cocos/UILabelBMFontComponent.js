var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UILabelBMFontView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_BITMAP_FONT );
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

        this.input_fntFileName = HtmlHelper.createOneLongTextInput( rootDiv, 'fontUrl', owner._fntFileName, true, this.onchange.bind(this) );
        var textureUrl = owner._labelBMFontRenderer._config.atlasName;
        this.input_pngFileName = HtmlHelper.createOneLongTextInput( rootDiv, 'pngUrl', textureUrl, true, this.onchange.bind(this) );
        this.input_text     = HtmlHelper.createOneLongTextInput( rootDiv, 'text', owner.getString(), false, this.onchange.bind(this) );

        this.div_spritePreview = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_spritePreview, "SpriteFrame", "component_groupTitleLabel" );

        HtmlHelper.createPngFilePreviewAttrib( this.div_spritePreview, textureUrl );
    },

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target ) {
            case  this.input_text:
                Genie.CommandManager.execute( new Genie.Command.UILabelBMFontText( owner, {
                    src     : owner.getString(),
                    dest    : strValue
                } ) );
                break;
            default:
                break;
        }
    },

    refreshTextValue : function( value ) {
        this.input_text.value = value;
    },

});
