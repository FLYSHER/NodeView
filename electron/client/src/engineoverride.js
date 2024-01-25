cc.LabelTTF.prototype.setFontName = function( fontName ) {
    if( fontName.indexOf( 'LotusEden-Bold' ) !== -1 ) {
        this._fontName = fontName;
    }
    else {
        this._fontName = 'RobotoCondensed-Bold';
    }
    this._renderCmd._setFontStyle( this._fontName, this._fontSize, this._fontStyle, this._fontWeight );
    // Force update
    this._setUpdateTextureDirty();
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