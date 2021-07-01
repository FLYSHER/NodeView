/*

    리치 텍스트가 들어가야 되는 노드에 붙여서 사용한다.
    addString (사용할 때 마다 줄 바꿈을 한다)
    addStringWithoutLineFeed (줄바꿈x 이어쓰기)

    부모 노드에 RockNUI.RichText를 붙이고 나서 refreshParentSize를 호출해야 됌. (부모 사이즈를 알아야 정렬하므로)

    _render함수는 스트링 한 줄이 늘어날 때 마다 호출되어 기존의 텍스트들의 좌표를 갱신한다.

    setVerticalAlignment, setHorizonAlignment를 사용하여 수직 수평 정렬을 할 수 있다.
    수평 정렬은 cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_RIGHT
    수직 정렬은 cc.VERTICAL_TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP 등을 사용할 수 있다.




    UI Parser 에서 사용하기 위해 빼 놓은 파일입니다!!!

 */

RockNUI.statusFlag = {

    ITALICS_FLAG : 1 << 0,          /*!< italic text */
    BOLD_FLAG : 1 << 1,             /*!< bold text */
    UNDERLINE_FLAG : 1 << 2,        /*!< underline */
    STRIKETHROUGH_FLAG : 1 << 3,    /*!< strikethrough */
    URL_FLAG : 1 << 4,              /*!< url of anchor */
    OUTLINE_FLAG : 1 << 5,          /*!< outline effect */
    SHADOW_FLAG : 1 << 6,           /*!< shadow effect */
    GLOW_FLAG : 1 << 7              /*!< glow effect */

}


RockNUI.RichTextUI = cc.Node.extend({

    _arrElement : [],
    _richElement : [],

    ctor: function () {
        this._super();
        // this.clear();
        this._width = !!this.getParent() ? this.getParent().getCustomSize().width : 0;
        this._height = !!this.getParent() ? this.getParent().getCustomSize().height : 0;


        this._horizontalAlign = [];
        this._verticalAlign = cc.VERTICAL_TEXT_ALIGNMENT_TOP;

        this._wholeHAlign = cc.TEXT_ALIGNMENT_LEFT;

        this._xOffsetArr = [];
        this._yOffsetArr = [];

        this._arrElement = [];
        this._richElement = [];
        this._originText = '';

    },

    setOriginText : function(t){
        this._originText = t;
    },

    getOriginText : function(){
        return this._originText;
    },

    refreshParentSize : function(){
        this._width = this.getParent().getCustomSize().width;
        this._height = this.getParent().getCustomSize().height;

        this._render();
    },

    addString: function(text, color, size, fontName, halign,  outline, shadow, xOffset, yOffset)
    {
        //a\n
        var arr  = text.split('\n');
        for(var i=0; i < arr.length; i++)
        {
            // this._horizontalAlign.push(halign);
            this.addSingleLineString(arr[i], color, size, fontName, halign, outline, shadow, xOffset, yOffset);
        }
    },

    addLineFeed : function() {
        return this.addSingleLineString('\n', cc.color.BLACK,1 );
    },

    getElement : function(text, color, size, fontName, halign, outline, shadow, isBold, isItalic){

        var fontDef = null;
        var loc_fontName = fontName || "RobotoCondensed-bold";

        var element = null;

        if(!!outline || !!shadow || isBold || isItalic){

            fontDef = new cc.FontDefinition({
                fillStyle : !!color ? color : cc.color(255, 255, 255, 255),
                fontSize : !!size ? size : 12,
                fontName : !!fontName ? fontName : "RobotoCondensed-bold",
                strokeEnabled : !!outline,
                shadowEnabled : !!shadow,
                strokeStyle : !!outline && !!outline[0] ? outline[0] : cc.color(255,255,255,255),
                lineWidth : !!outline && !!outline[1] ? outline[1] : 1,
                shadowBlur : !!shadow && !!shadow[2] ? shadow[2] : 0,
                shadowStyle : !!shadow && !!shadow[0] ? shadow[0] : cc.color(255,255,255,255),
                shadowOffsetX : !!shadow && !!shadow[1] ? shadow[1].width : 0,
                shadowOffsetY : !!shadow && !!shadow[1] ? shadow[1].height : 0,
                fontStyle : !!isItalic ? "italic" : "normal",
                fontWeight : !!isBold ? "bold" : "normal",
            });

            if(!cc.sys.isMobile){
                element = new ccui.RichElementText( this._arrElement.length + 1 , fontDef, 255, text, loc_fontName, size );
            }
            else {
                //모바일일 경우 파라미터 13개 넘겨야됌 ...
                var flag = 0;

                if(!!isItalic)
                    flag |= RockNUI.statusFlag.ITALICS_FLAG;

                if(!!isBold)
                    flag |= RockNUI.statusFlag.BOLD_FLAG;

                if(!!outline)
                    flag |= RockNUI.statusFlag.OUTLINE_FLAG;

                if(!!shadow)
                    flag |= RockNUI.statusFlag.SHADOW_FLAG;

                element = new ccui.RichElementText( this._arrElement.length + 1,
                    !!color ? color : cc.color(255, 255, 255, 255),
                    255, text, loc_fontName,
                    !!size ? size : 12, flag, null,
                    !!outline && !!outline[0] ? outline[0] : cc.color(255,255,255,255),
                    !!outline && !!outline[1] ? outline[1] : 1,
                    !!shadow && !!shadow[0] ? shadow[0] : cc.color(255,255,255,255),
                    cc.size(!!shadow && !!shadow[1] ? shadow[1].width : 0, !!shadow && !!shadow[1] ? shadow[1].height : 0),
                    !!shadow && !!shadow[2] ? shadow[2] : 0, cc.color(255,255,255,255)
                );
            }

        }
        else {
            element = new ccui.RichElementText( this._arrElement.length + 1 , color, 255, text, loc_fontName, size );
        }

        return element;
    },

    addSingleLineString: function(text, color, size, fontName, halign, outline, shadow, isBold, isItalic, xOffset, yOffset )
    {
        var element = this.getElement(text, color, size, fontName, halign, outline, shadow, isBold, isItalic);

        var richText = new RockNUI.RichTextEx();
        richText.pushBackElement(element);

        richText.ignoreContentAdaptWithSize(true);

        richText.setContentSize(cc.size(720,0));
        richText.formatText();

        if(!!xOffset){
            this._xOffsetArr.push(xOffset);
        } else {
            this._xOffsetArr.push(0);
        }

        if(!!yOffset){
            this._yOffsetArr.push(yOffset);
        } else {
            this._yOffsetArr.push(0);
        }

        if(!!halign){
            this._horizontalAlign.push(halign);
        }
        else {
            this._horizontalAlign.push(cc.TEXT_ALIGNMENT_LEFT);
        }



        this._arrElement.push( richText );
        this._richElement.push([]);
        this._richElement[this._richElement.length-1].push(richText);
        this.addChild(richText);
        // this._render(); //꼭 매번 해줄 필요 없어서 주석처리 (2021.05.11 - MJ)

        return richText;

    },

    addStringWithoutLineFeed: function(text, color, size, fontName, outline, shadow, isBold, isItalic)
    {

        var element = this.getElement(text, color, size, fontName, null, outline, shadow, isBold, isItalic);

        this._arrElement[this._arrElement.length-1].pushBackElement( element );
        this._richElement[this._arrElement.length-1].push(element);
        this._arrElement[this._arrElement.length-1].formatText(); // 텍스트 크기 강제로 다시 계산!


        // this._render(); //꼭 매번 해줄 필요 없어서 주석처리 (2021.05.11 - MJ)

        return element;

    },

    clear : function () {
        for(var i=this._arrElement.length - 1; i >= 0; i--)
        {

            for(var j = this._richElement[i].length - 1; j>=0;j--){
                this._arrElement[i].removeElement(this._richElement[i][j]);
            }

            !!this._arrElement[i] && this._arrElement[i].removeFromParent();

        }
        this._arrElement = [];
        this._richElement = [];
    },

    setString: function(text)
    {
        this.clear();
        this.addString ( text, cc.color.BLACK, 20);
    },

    _render : function(){
        var ySum = 0;

        for(var i = 0; i<this._arrElement.length; i++){

            var size = this._arrElement[i].getVirtualRendererSize();
            var xOffset, yOffset;

            if(!!this._horizontalAlign && !!this._horizontalAlign[i]){
                if(this._horizontalAlign[i] === cc.TEXT_ALIGNMENT_CENTER){
                    xOffset = (this._width-size.width) /2;
                } else if(this._horizontalAlign[i] === cc.TEXT_ALIGNMENT_LEFT){
                    xOffset = 0;
                } else {
                    xOffset = this._width-size.width;
                }
            }
            else {
                if(this._wholeHAlign === cc.TEXT_ALIGNMENT_CENTER){
                    xOffset = (this._width-size.width) /2;
                } else if(this._wholeHAlign === cc.TEXT_ALIGNMENT_LEFT){
                    xOffset = 0;
                } else {
                    xOffset = this._width-size.width;
                }
            }

            xOffset += this._xOffsetArr[i];
            yOffset= ySum;
            ySum -= size.height;

            this._arrElement[i].setPosition(xOffset, yOffset);

        }

        if(this._verticalAlign === cc.VERTICAL_TEXT_ALIGNMENT_CENTER){
            for(var i=0; i<this._arrElement.length; i++){
                this._arrElement[i].setPosition(this._arrElement[i].getPosition().x, this._arrElement[i].getPosition().y +(this._height/2) -(ySum/2) - this._arrElement[i].getVirtualRendererSize().height);

                ccui.Widget.prototype.setAnchorPoint.call(this._arrElement[i], cc.p(0,0)); // mj - 엔진이 웹과 모바일이 달라서 직접 호출하게 했음.

            }
        } else if(this._verticalAlign === cc.VERTICAL_TEXT_ALIGNMENT_TOP){
            for(var i=0; i<this._arrElement.length; i++){
                this._arrElement[i].setPosition(this._arrElement[i].getPosition().x, this._arrElement[i].getPosition().y + this._height - this._arrElement[i].getVirtualRendererSize().height );

                ccui.Widget.prototype.setAnchorPoint.call(this._arrElement[i], cc.p(0,0)); // mj - 엔진이 웹과 모바일이 달라서 직접 호출하게 했음.

            }
        } else { // bottom 정렬일 경우
            for(var i=0; i<this._arrElement.length; i++){
                this._arrElement[i].setPosition(this._arrElement[i].getPosition().x, this._arrElement[i].getPosition().y - ySum - this._arrElement[i].getVirtualRendererSize().height);

                ccui.Widget.prototype.setAnchorPoint.call(this._arrElement[i], cc.p(0,0)); // mj - 엔진이 웹과 모바일이 달라서 직접 호출하게 했음.
            }
        }

        var accumYOffset = 0;
        for(var i =0;i<this._arrElement.length;i++){
            accumYOffset += this._yOffsetArr[i];
            this._arrElement[i].setPosition(this._arrElement[i].getPosition().x,this._arrElement[i].getPosition().y+accumYOffset);
        }

    },

    /**
     * Set the renderer vertical flow alignment for the Control
     * although it is named TextVerticalAlignment, it should work with all type of renderer too.
     *
     * @example
     * var richText = new ccui.RichText();
     * richText.setTextVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
     *
     * @param {Number} align - example cc.VERTICAL_TEXT_ALIGNMENT_CENTER
     */
    setVerticalAlignment: function(align){
        this._verticalAlign = align;
        this._render();
    },
    /**
     * Set the renderer horizontal flow alignment for the Control
     * although it is named TextHorizontalAlignment, it should work with all type of renderer too.
     * NOTE: we should rename this to setHorizontalAlignment directly
     *
     * @example
     * var richText = new ccui.RichText();
     * richText.setTextHorizontalAlignment(cc.Text_ALIGNMENT_RIGHT);
     *
     * @param {Number} align - example cc.TEXT_ALIGNMENT_RIGHT
     */
    setHorizontalAlignment : function(align){
        this._wholeHAlign = align;
        this._render();
    },




    //region [debug Function]
    /* 텍스트 위치가 어떻게 잡혔는지 보고 싶을 때 쓰는 test Function 3개 입니다. */

    showParentLayer : function(){
        this._wholeLayer = new cc.LayerColor(cc.color(5,0,100,60),this.getParent().getCustomSize().width,this.getParent().getCustomSize().height);
        this.addChild(this._wholeLayer);
    },

    showTextLayer : function(){
        this._textLayer = [];
        for(var i = 0;i<this._arrElement.length;i++){
            this._textLayer[i] = new cc.LayerColor(cc.color(i%2===0? 255: 30,100,100,80),this._arrElement[i].getContentSize().width,this._arrElement[i].getContentSize().height);
            this._textLayer[i].setPosition(this._arrElement[i].getPosition().x, this._arrElement[i].getPosition().y);
            this.addChild( this._textLayer[i] );
        }

    },

    hideParentLayer : function(){
        if(cc.sys.isMobile){
            if(isValidObject(this._wholeLayer)){
                this._wholeLayer.removeFromParent(true);
                this._wholeLayer = null;
            }
        }
        else {
            if(this._wholeLayer){
                this._wholeLayer.removeFromParent(true);
                this._wholeLayer = null;
            }
        }
    },

    hideTextLayer : function(){
        if(cc.sys.isMobile){

            if(!isValidObject(this._textLayer))
                return;

            for(var i = 0; i<this._arrElement.length;i++){
                if(isValidObject(this._textLayer[i])){
                    this._textLayer[i].removeFromParent(true);
                    this._textLayer[i] = null;
                }
            }

            this._textLayer = null;

        }
        else {

            if(!this._textLayer)
                return;

            for(var i = 0; i<this._arrElement.length;i++){
                if(!!this._textLayer[i]){
                    this._textLayer[i].removeFromParent(true);
                    this._textLayer[i] = null;
                }
            }

            this._textLayer = null;
        }
    },

    showLayer : function(){
        this.showParentLayer();
        this.showTextLayer();
    },

    hideLayer : function(){
        this.hideParentLayer();
        this.hideTextLayer();
    }

    //endregion

});
