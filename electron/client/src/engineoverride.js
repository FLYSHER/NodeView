cc.LabelTTF.prototype.setFontName = function( fontName ) {
    //@HyunMyung
    //변PD님 요청 사항
    //모든 Label 폰트를 'Roboto-Bold'로 설정
    // if( fontName.indexOf( 'Roboto-Regular') !== -1 ) {
    //     this._fontName = fontName;
    // }
    // else {
    //     this._fontName = 'RobotoCondensed-Bold';
    // }
    // else {
    //     this._fontName = 'Roboto-Bold';
    // }
    this._fontName = 'RobotoCondensed-Bold';
    this._renderCmd._setFontStyle( this._fontName, this._fontSize, this._fontStyle, this._fontWeight );
    // Force update
    this._setUpdateTextureDirty();
};