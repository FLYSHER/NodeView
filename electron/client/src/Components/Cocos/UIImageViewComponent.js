// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UIImageView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_IMAGE_VIEW );
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
        this.rootDiv = rootDiv;

        var imgType = {
            0 : 'LOCAL_TEXTURE',
            1 : 'PLIST_TEXTURE',
        }

        // ignore size
        this.cb_ignoreSize = HtmlHelper.createCheckboxAttrib( rootDiv, "ignoreSize", owner.isIgnoreContentAdaptWithSize(), true, this.onchange.bind(this) );

        // custom size
        var customSize = owner.getCustomSize();
        this.input_customSize = HtmlHelper.createSizeAttrib( rootDiv, "customSize", [customSize.width, customSize.height], [true, true], null );

        // sprite name
        this.input_texFileName = HtmlHelper.createOneLongTextInput( rootDiv, 'textureFile', owner._textureFile, false );
        this.input_texFileName.ondrop = this.onDrop.bind(this);
        this.input_texFileName.onclick = function( event ) {
            // var searchString = event.target.value;
            // $('#assets').jstree('search', searchString);
            var searchString = event.target.value;
            Renderer_assets.findAssetFromOtherArea( searchString )
        }

        // texture type
        this.input_texType = HtmlHelper.createOneLongTextInput( rootDiv, 'imageTexType', imgType[owner._imageTexType], true, null );

        // imageTextureSize
        var imageTextureSize = owner.getVirtualRendererSize();
        this.input_imgTextureSize = HtmlHelper.createSizeAttrib( rootDiv, "imgTextureSize", [imageTextureSize.width, imageTextureSize.height], [true, true], null );

        // scale9sprite renderer group
        var div_renderer =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_renderer, "Renderer", "component_groupTitleLabel" );

        var strRenderingType = [
            "SIMPLE",
            "SLICED"
        ]

        this.input_renderingType = HtmlHelper.createOneLongTextInput( div_renderer, "renderingType", strRenderingType[owner.getVirtualRenderer().getRenderingType()], true );
        this.size_contentSize =  HtmlHelper.createSizeAttrib( div_renderer, "contentSize", [ owner.getVirtualRenderer().width,  owner.getVirtualRenderer().height], [true, true] );

        //
        this.div_spritePreview =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_spritePreview, "SpriteFrame", "component_groupTitleLabel" );

        var textureName = Genie.Utils.getSpriteFrameTextureName( owner._textureFile );
        HtmlHelper.createSpritePreviewAttrib( this.div_spritePreview, owner._textureFile, textureName );

    },

    refreshAllAttribute : function() {
        var owner = this.getOwner();
        var imgType = [
            'LOCAL_TEXTURE',
            'PLIST_TEXTURE'
        ];

        var strRenderingType = [
            "SIMPLE",
            "SLICED"
        ];

        this.cb_ignoreSize.checked              = owner.isIgnoreContentAdaptWithSize();
        this.input_customSize.width.value       = owner.getCustomSize().width;
        this.input_customSize.height.value      = owner.getCustomSize().height;
        this.input_texFileName.value            = owner._textureFile;
        this.input_texType.value                = imgType[owner._imageTexType];
        this.input_imgTextureSize.width.value   = owner.getVirtualRendererSize().width;
        this.input_imgTextureSize.height.value  = owner.getVirtualRendererSize().height;

        // renderer group
        this.input_renderingType.value      = strRenderingType[owner.getVirtualRenderer().getRenderingType()];
        this.size_contentSize.width.value   = owner.getVirtualRenderer().width;
        this.size_contentSize.height.value  = owner.getVirtualRenderer().height;

        // sprite view
        if( this.div_spritePreview ) {
            this.div_spritePreview.remove();
            this.div_spritePreview = null;
        }

        this.div_spritePreview =  HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_spritePreview, "SpriteFrame", "component_groupTitleLabel" );

        var textureName = Genie.Utils.getSpriteFrameTextureName( owner._textureFile );
        HtmlHelper.createSpritePreviewAttrib( this.div_spritePreview, owner._textureFile, textureName );
    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.cb_ignoreSize:
                Genie.CommandManager.execute( new Genie.Command.UIImageIgnoreSize( owner, {
                    src     : owner.isIgnoreContentAdaptWithSize(),
                    dest    : event.target.checked
                }));
                break;
            default:
                break;
        }
    },

    onDrop : function( event ) {
        var owner = this.getOwner();
        var sprName = event.dataTransfer.getData("assetName");

        var currSprName = this.input_texFileName.value;
        if( currSprName === sprName ) {
            return;
        }

        var loc_strProp = "texFileName",
            loc_src     = currSprName,
            loc_dest    = sprName;
        cc.log("UIImageView Component ondrop : ", loc_src, loc_dest );

        Genie.CommandManager.execute( new Genie.Command.UIImageTexName( owner, {
            strProp : loc_strProp,
            src     : loc_src,
            dest    : loc_dest
        } ) );
        event.preventDefault();
    },

    refreshIgnoreSize : function( value ) {
        this.cb_ignoreSize.checked = value;
        this.refreshAllAttribute();
    },

    refreshTextureFileName : function( value ) {
        this.input_texFileName.value = value;
        this.refreshAllAttribute();
    },
});
