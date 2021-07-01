var RockNUI = RockNUI || {};

/*

    리치 텍스트가 들어가야 되는 노드에 붙여서 사용한다.
    addString (사용할 때 마다 줄 바꿈을 한다)
    addStringWithoutLineFeed (줄바꿈x 이어쓰기)

    부모 노드에 RockNUI.RichText를 붙이고 나서 refreshParentSize를 호출해야 됌. (부모 사이즈를 알아야 정렬하므로)

    _render함수는 스트링 한 줄이 늘어날 때 마다 호출되어 기존의 텍스트들의 좌표를 갱신한다.

    setVerticalAlignment, setHorizonAlignment를 사용하여 수직 수평 정렬을 할 수 있다.
    수평 정렬은 cc.TEXT_ALIGNMENT_CENTER, cc.TEXT_ALIGNMENT_LEFT, cc.TEXT_ALIGNMENT_RIGHT
    수직 정렬은 cc.VERTICAL_TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP 등을 사용할 수 있다.


 */

RockNUI.RichTextEx = ccui.RichText.extend({
    formatText: function () {
        if (this._formatTextDirty) {
            this._elementRenderersContainer.removeAllChildren();
            this._elementRenders.length = 0;
            var i, element, locRichElements = this._richElements;
            if (this._ignoreSize) {
                this._addNewLine();
                for (i = 0; i < locRichElements.length; i++) {
                    element = locRichElements[i];
                    var elementRenderer = null;
                    switch (element._type) {
                        case ccui.RichElement.TEXT:
                            if (element._fontDefinition)
                                elementRenderer = new cc.LabelTTF(element._text, element._fontDefinition);
                            else //todo: There may be ambiguous
                                elementRenderer = new cc.LabelTTF(element._text, element._fontName, element._fontSize);
                            break;
                        case ccui.RichElement.IMAGE:
                            elementRenderer = new cc.Sprite(element._filePath);
                            break;
                        case ccui.RichElement.CUSTOM:
                            elementRenderer = element._customNode;
                            break;
                        default:
                            break;
                    }
                    elementRenderer.setColor(element._color);
                    elementRenderer.setOpacity(element._color.a);

                    // elementRenderer.setVerticalAlignment(cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM);

                    this._pushToContainer(elementRenderer);
                }
            } else {
                this._addNewLine();
                for (i = 0; i < locRichElements.length; i++) {
                    element = locRichElements[i];
                    switch (element._type) {
                        case ccui.RichElement.TEXT:
                            if (element._fontDefinition)
                                this._handleTextRenderer(element._text, element._fontDefinition, element._fontDefinition.fontSize, element._fontDefinition.fillStyle);
                            else
                                this._handleTextRenderer(element._text, element._fontName, element._fontSize, element._color);
                            break;
                        case ccui.RichElement.IMAGE:
                            this._handleImageRenderer(element._filePath, element._color, element._color.a);
                            break;
                        case ccui.RichElement.CUSTOM:
                            this._handleCustomRenderer(element._customNode);
                            break;
                        default:
                            break;
                    }
                }
            }
            this.formatRenderers();
            this._formatTextDirty = false;
        }
    },

    formatRenderers: function () {
        var newContentSizeHeight = 0, locRenderersContainer = this._elementRenderersContainer;
        var locElementRenders = this._elementRenders;
        var i, j, row, nextPosX, l;
        var lineHeight, offsetX;
        if (this._ignoreSize) {
            var newContentSizeWidth = 0;
            row = locElementRenders[0];
            nextPosX = 0;

            var maxHeight = -1;

            for (j = 0; j < row.length; j++) {
                l = row[j];

                var tempHeight = l.getLineHeight ? l.getLineHeight() : newContentSizeHeight;

                var iSize = l.getContentSize();

                maxHeight = Math.max(Math.max(maxHeight, tempHeight), iSize.height);
            }

            for (j = 0; j < row.length; j++) {
                l = row[j];
                l.setAnchorPoint(cc.p(0, 0));
                locRenderersContainer.addChild(l, 1, j);

                lineHeight = l.getLineHeight ? l.getLineHeight() : newContentSizeHeight;
                var iSize = l.getContentSize();

                l.setPosition(nextPosX, (maxHeight-l.getContentSize().height)/4);

                newContentSizeWidth += iSize.width;
                newContentSizeHeight = Math.max(Math.max(newContentSizeHeight, lineHeight), iSize.height);
                nextPosX += iSize.width;
            }

            //Text flow horizontal alignment:
            if (this._textHorizontalAlignment !== cc.TEXT_ALIGNMENT_LEFT) {
                offsetX = 0;
                if (this._textHorizontalAlignment === cc.TEXT_ALIGNMENT_RIGHT)
                    offsetX = this._contentSize.width - nextPosX;
                else if (this._textHorizontalAlignment === cc.TEXT_ALIGNMENT_CENTER)
                    offsetX = (this._contentSize.width - nextPosX) / 2;

                for (j = 0; j < row.length; j++)
                    row[j].x += offsetX;
            }

            locRenderersContainer.setContentSize(newContentSizeWidth, newContentSizeHeight);
        } else {
            var maxHeights = [];
            for (i = 0; i < locElementRenders.length; i++) {
                row = locElementRenders[i];
                var maxHeight = 0;
                for (j = 0; j < row.length; j++) {
                    l = row[j];
                    lineHeight = l.getLineHeight ? l.getLineHeight() : l.getContentSize().height;
                    maxHeight = Math.max(Math.min(l.getContentSize().height, lineHeight), maxHeight);
                }
                maxHeights[i] = maxHeight;
                newContentSizeHeight += maxHeights[i];
            }

            var nextPosY = this._customSize.height;

            for (i = 0; i < locElementRenders.length; i++) {
                row = locElementRenders[i];
                nextPosX = 0;
                nextPosY -= (maxHeights[i] + this._verticalSpace);

                for (j = 0; j < row.length; j++) {
                    l = row[j];
                    l.setAnchorPoint(cc.p(0, 0));
                    l.setPosition(cc.p(nextPosX, nextPosY));
                    locRenderersContainer.addChild(l, 1);
                    nextPosX += l.getContentSize().width;
                }
                //Text flow alignment(s)
                if (this._textHorizontalAlignment !== cc.TEXT_ALIGNMENT_LEFT || this._textVerticalAlignment !== cc.VERTICAL_TEXT_ALIGNMENT_TOP) {
                    offsetX = 0;
                    if (this._textHorizontalAlignment === cc.TEXT_ALIGNMENT_RIGHT)
                        offsetX = this._contentSize.width - nextPosX;
                    else if (this._textHorizontalAlignment === cc.TEXT_ALIGNMENT_CENTER)
                        offsetX = (this._contentSize.width - nextPosX) / 2;

                    var offsetY = 0;
                    if (this._textVerticalAlignment === cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM)
                        offsetY = this._customSize.height - newContentSizeHeight;
                    else if (this._textVerticalAlignment === cc.VERTICAL_TEXT_ALIGNMENT_CENTER)
                        offsetY = (this._customSize.height - newContentSizeHeight) / 2;

                    for (j = 0; j < row.length; j++) {
                        l = row[j];
                        l.x += offsetX;
                        l.y -= offsetY;
                    }
                }
            }

            locRenderersContainer.setContentSize(this._contentSize);
        }

        var length = locElementRenders.length;
        for (i = 0; i < length; i++) {
            locElementRenders[i].length = 0;
        }
        this._elementRenders.length = 0;

        this.setContentSize(this._ignoreSize ? this.getVirtualRendererSize() : this._customSize);
        this._updateContentSizeWithTextureSize(this._contentSize);

        locRenderersContainer.setPosition(this._contentSize.width * 0.5, this._contentSize.height * 0.5);
    },
})



RockNUI.RichText = cc.Node.extend({

    _arrElement : [],
    _richElement : [],

    ctor: function () {
        this._super();
        // this.clear();
        this._width = !!this.getParent() ? this.getParent().getContentSize().width : 0;
        this._height = !!this.getParent() ? this.getParent().getContentSize().height : 0;

        this._horizontalAlign = cc.TEXT_ALIGNMENT_CENTER;
        this._verticalAlign = cc.VERTICAL_TEXT_ALIGNMENT_CENTER;

        this._xOffsetArr = [];
        this._yOffsetArr = [];

        this._arrElement = [];
        this._richElement = [];

    },

    refreshParentSize : function(){
        this._width = this.getParent().getContentSize().width;
        this._height = this.getParent().getContentSize().height;

        this._render();
    },

    addString: function(text, color, size, fontName, xOffset, yOffset)
    {
        var arr  = text.split('\n');
        for(var i=0; i < arr.length; i++)
        {
            this.addSingleLineString(arr[i], color, size, fontName, xOffset, yOffset);

            if (i != arr.length -1)
            {
                if(cc.sys.isMobile === false){
                    // this.addLineFeed();
                }
            }
        }
    },

    addLineFeed : function() {
        return this.addSingleLineString('\n', cc.color.BLACK,1 );
    },

    addSingleLineString: function(text, color, size, fontName, xOffset, yOffset )
    {
        var loc_fontName = fontName || "RobotoCondensed-bold";
        var element = new ccui.RichElementText( this._arrElement.length + 1 , color, 255, text, loc_fontName, size );

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



        this._arrElement.push( richText );
        this._richElement.push([]);
        this._richElement[this._richElement.length-1].push(richText);
        this.addChild(richText);
        this._render();

        return richText;

    },

    addStringWithoutLineFeed: function(text, color, size, fontName )
    {
        var loc_fontName = fontName || "RobotoCondensed-bold";
        var element = new ccui.RichElementText( this._arrElement.length + 1 , color, 255, text, loc_fontName, size );
        this._arrElement[this._arrElement.length-1].pushBackElement( element );
        this._richElement[this._arrElement.length-1].push(element);
        this._arrElement[this._arrElement.length-1].formatText(); // 텍스트 크기 강제로 다시 계산!


        this._render();

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

            if(this._horizontalAlign === cc.TEXT_ALIGNMENT_CENTER){
                xOffset = (this._width-size.width) /2;
            } else if(this._horizontalAlign === cc.TEXT_ALIGNMENT_LEFT){
                xOffset = 0;
            } else {
                xOffset = this._width-size.width;
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
        this._horizontalAlign = align;
        this._render();
    },





    /* 텍스트 위치가 어떻게 잡혔는지 보고 싶을 때 쓰는 test Function 3개 입니다. */

    showParentLayer : function(){
        var layer = new cc.LayerColor(cc.color(5,0,100,60),this.getParent().getContentSize().width,this.getParent().getContentSize().height);
        this.addChild(layer);
    },

    showTextLayer : function(){
        for(var i = 0;i<this._arrElement.length;i++){
            var layer = new cc.LayerColor(cc.color(i%2===0? 255: 30,100,100,80),this._arrElement[i].getContentSize().width,this._arrElement[i].getContentSize().height);
            layer.setPosition(this._arrElement[i].getPosition().x, this._arrElement[i].getPosition().y);
            this.addChild(layer);
        }

    },

    showLayer : function(){
        this.showParentLayer();
        this.showTextLayer();
    }

});

