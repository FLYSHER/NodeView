// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UIImageView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "UIImageView" );
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

        var imgType = {
            0 : 'LOCAL_TEXTURE',
            1 : 'PLIST_TEXTURE',
        }

        // ignore size
        HtmlHelper.createOneShortTextInput( rootDiv, "ignoreSize", owner.isIgnoreContentAdaptWithSize(), true );
        // custom size
        var customSize = owner.getCustomSize();
        HtmlHelper.createSizeAttrib( rootDiv, "customSize", [customSize.width, customSize.height], [true, true], null );

        // sprite name
        this.input_texFileName = HtmlHelper.createOneLongTextInput( rootDiv, 'textureFile', owner._textureFile, false );
        this.input_texFileName.onclick = function( event ) {
            var searchString = event.target.value;
            $('#assets').jstree('search', searchString);
        }

        this.input_texFileName.ondragover = function(e) {
            e.preventDefault();
        }

        this.input_texFileName.ondrop = function( event ) {
            // event.preventDefault();
            var sprName = event.dataTransfer.getData("spriteName");
            cc.log("drop" );
            cc.log("sprName : ", sprName );
            cc.log("event.target.value : ", event.target.value );
            event.target.value = sprName;
        }

        // texture type
        HtmlHelper.createOneLongTextInput( rootDiv, 'imageTexType', imgType[owner._imageTexType], true, null );

        // imageTextureSize
        var imageTextureSize = owner.getVirtualRendererSize();
        HtmlHelper.createSizeAttrib( rootDiv, "imgTextureSize", [imageTextureSize.width, imageTextureSize.height], [true, true], null );

        // scale9sprite renderer group
        var div_renderer =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_renderer, "Renderer", "component_groupTitleLabel" );

        var strRenderingType = [
            "SIMPLE",
            "SLICED"
        ]

        HtmlHelper.createOneLongTextInput( div_renderer, "renderingType", strRenderingType[owner.getVirtualRenderer().getRenderingType()], true );
        HtmlHelper.createSizeAttrib( div_renderer, "contentSize", [ owner.getVirtualRenderer().width,  owner.getVirtualRenderer().height], [true, true] );

        // texture name
        var div_sprite =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_sprite, "SpriteFrame", "component_groupTitleLabel" );

        var textureName = Genie.Utils.getSpriteFrameTextureName( owner._textureFile );
        HtmlHelper.createSpritePreviewAttrib( div_sprite, owner._textureFile, textureName );

    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        // switch ( event.target.id ) {
        //     case 'ttf_text':
        //         value = strValue;
        //         Genie.ToolController.execute( new Genie.Command.UIText( owner, {
        //             strProp : 'text',
        //             src     : owner.getString(),
        //             dest    : value
        //         } ) );
        //         break;
        // }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var value   = paramObj.value;

        switch ( strProp ) {
            case 'fontSize':
                this.input_fontSize.value = value;
                break;

        }

    },
});
