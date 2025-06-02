cc.LabelTTF.prototype.setFontName = function( fontName ) {
    if( fontName.indexOf( 'LotusEden-Bold' ) !== -1 ) {
        this._fontName = fontName;
    }
    else if( fontName.indexOf( 'LotusEden-ExtraBold' ) !== -1 ) {
        this._fontName = fontName;
    }
    else if( fontName.indexOf( 'LotusEden-UltraBold' ) !== -1 ) {
        this._fontName = fontName;
    }
    else {
        this._fontName = 'RobotoCondensed-Bold';
    }
    this._renderCmd._setFontStyle( this._fontName, this._fontSize, this._fontStyle, this._fontWeight );
    // Force update
    this._setUpdateTextureDirty();
};

cc.LabelTTF.prototype.setString = function (text) {
    text = String(text);
    if (this._originalText !== text) {
        this._originalText = text + "";

        // 텍스트 갱신이 필요한 경우에만 로직 실행
        this._updateString();

        // 렌더링 상태 갱신을 위한 호출
        this._setUpdateTextureDirty();
        this._renderCmd.setDirtyFlag(cc.Node._dirtyFlags.transformDirty);

        setTimeout( function() {
            if( this._fontName.indexOf( "LotusEden-Bold" ) !== -1 ) {
                this.setFontName( "LotusEden-Bold" );
            }
            else if( this._fontName.indexOf( "LotusEden-ExtraBold" ) !== -1 ) {
                this.setFontName( "LotusEden-ExtraBold" );
            }
            else if( this._fontName.indexOf( "LotusEden-UltraBold" ) !== -1 ) {
                this.setFontName( "LotusEden-UltraBold" );
            }
        }.bind( this ), 1 );
    }
};

sp._atlasLoader = {
    spAtlasFile:null,
    setAtlasFile:function(spAtlasFile){
        this.spAtlasFile = spAtlasFile;
    },
    load:function(line){
        var texturePath = cc.path.join(cc.path.dirname(this.spAtlasFile), line);
        var texture = cc.loader.cache[texturePath];

        if( !( texture instanceof cc.Texture2D ) ) {
            texture = cc.textureCache.addImage(texturePath);
        }

        var tex = new sp.SkeletonTexture();
        tex._image = { width: texture.getPixelsWide(), height: texture.getPixelsHigh() };
        tex.setRealTexture(texture);
        return tex;
    },
    unload:function(obj){
    }
};