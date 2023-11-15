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

        // texType
        // filename
        // imageTextureSize
        // ignoresize
        var imgType = {
            0 : 'LOCAL_TEXTURE',
            1 : 'PLIST_TEXTURE',
        }

        // sprite name
        this.input_texFileName = HtmlHelper.createOneLongTextInput( rootDiv, 'fileName', owner._textureFile, true, null );
        this.input_texFileName.onclick = function( event ) {
            var searchString = event.target.value;
            $('#assets').jstree('search', searchString);
        }

        // texture type
        HtmlHelper.createOneLongTextInput( rootDiv, 'texType', imgType[owner._imageTexType], true, null );

        // texture name
        var textureName = Genie.Utils.getSpriteFrameTextureName( owner._textureFile );
        HtmlHelper.createOneLongTextInput( rootDiv, 'texture', textureName, true );

        // texture preview
        var base64Image = cc.loader.getRes( textureName );
        HtmlHelper.createTexturePreviewAttrib( rootDiv, base64Image );
    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target.id ) {
            case 'ttf_text':
                value = strValue;
                Genie.ToolController.execute( new Genie.Command.UIText( owner, {
                    strProp : 'text',
                    src     : owner.getString(),
                    dest    : value
                } ) );
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

        }

    },
});
