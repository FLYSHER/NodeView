/*

Html To RTF Parser

 */
var colorObject = cc.Class.extend({

    ctor : function(jsonObj){
        this.r = 255;
        this.g = 0;
        this.b = 0;

        if(!!jsonObj && jsonObj instanceof Object){
            this.r = jsonObj.r;
            this.g = jsonObj.g;
            this.b = jsonObj.b;
        }

    }

});

var shadowObject = cc.Class.extend({

    ctor : function(){
        this._color = new colorObject();
        this._blur = 1;
        this._offsetX = 0;
        this._offsetY = 2;
    }

});

var outlineObject = cc.Class.extend({

    ctor : function(){
        this._color = new colorObject();
        this._width = 1;
    }

});

var spanObject = cc.Class.extend({

    ctor : function(){
        this._shadow = null;
        this._outline = null;
        this._fontSize = null;
        this._fontColor = null;
    }

});

var fontObject = cc.Class.extend({

    ctor : function(){
        this._fontColor = null;
    }

});

var divObject = cc.Class.extend({

    ctor : function(){
        this._align = null;
    }

});

RockNUI.RichTextHtmlParser = {
    regStart : {
        font : /<\s*font.*>/,
        // color : /<\s*color\s*=\s*\S*\s*>/,
        span : /<\s*span.*>/,

        div : /<\s*div.*>/,

        bold : /<\s*b\s*>/,
        italic : /<\s*i\s*\S*>/,

        br : /<br>/,

    },
    regEnd : {
        font : /<\s*\/\s*font\s*>/,
        span : /<\s*\/\s*span\s*>/,
        div : /<\s*\/\s*div\s*>/,


        bold : /<\s*\/\s*b\s*>/,
        italic : /<\s*\/\s*i\s*>/,

    },

    _getLastItem : function(arr){
        if(Array.isArray(arr) && arr.length > 0){
            return arr[arr.length-1];
        }
        return null;
    },


    _clear : function(){
        this._fontStack         =   [];
        this._spanStack         =   [];

        this._boldStack      = [];
        this._italicStack    = [];

        this._position = [];

        this._divStack = [];


        this._vAlign = null;
        this._hAlign = null;

        this._lineStarted = true; //true일 경우 new line 처리

        this._text = "";
        this._parent = null;

        this._finalRTF = "";
    },

    _generateHTML : function(text){
        // if(!this._renderer)
        //     return;
        //
        // if(this._lineStarted){
        //     this._renderer.addString(text, this._getLastItem(this._colorStack), this._getLastItem(this._sizeStack),
        //         this._getLastItem(this._fontStack), this._getLastItem(this._horizontalAlign), this._getLastItem(this._outlineStack),
        //         this._getLastItem(this._shadowStack), this._getLastItem(this._boldStack), this._getLastItem(this._italicStack), 0, 0);
        //
        //     this._lineStarted = false;
        // }
        // else {
        //     this._renderer.addStringWithoutLineFeed(text, this._getLastItem(this._colorStack), this._getLastItem(this._sizeStack),
        //         this._getLastItem(this._fontStack), this._getLastItem(this._outlineStack),
        //         this._getLastItem(this._shadowStack), this._getLastItem(this._boldStack), this._getLastItem(this._italicStack));
        // }

        // cc.log("try to add ",text);
        this._finalRTF += text;


    },

    ParseHTML : function(html){

        this._clear();

        // this._parent    = parent;
        this._text      = html;

        this._renderer = null;

        // var textStarted = false;

        var textPos = [0,0];
        var textVAlign = null;
        var textHAlign = null;

        var lastParsed = -1;

        this._finalRTF = '<!RICHTEXT>';

        for(var p = 0; p < this._text.length + 1; p++){
            var loc_text = this._text.substring(lastParsed < 0 ? 0 : lastParsed, p);
            var matched;

            matched = loc_text.match(this.regStart.font); //color만 올 수 있을 것 같은데?
            if(!!matched){
                //폰트

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('font')!==-1){
                    var obj = new fontObject();

                    if(loc_text.indexOf('color')!==-1){ // color라는 글자가 있을 경우

                        var posText = loc_text.split('font color')[1].split('>')[0];
                        posText = posText.split('="')[1].split('"')[0];
                        posText = posText.trim();

                        var color = hexToRgb(posText);

                        obj._fontColor = new colorObject();
                        obj._fontColor.r = color.r;
                        obj._fontColor.g = color.g;
                        obj._fontColor.b = color.b;

                        this._fontStack.push(obj);
                        this._finalRTF += '<color='+posText+'>';
                    }
                }

                lastParsed = p;

                continue;

            }

            matched = loc_text.match(this.regStart.span);
            if(!!matched){
                // span 일 경우,
                //1. shadow
                //2. outline
                //3. font size

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                var tempSpanObj = new spanObject();

                var loc_text = matched[0];
                if(loc_text.indexOf('span style')!==-1){
                    if(loc_text.indexOf('font-size')!==-1){
                        //폰트사이즈
                        var size = parseInt( loc_text.split('font-size: ')[1].split('px')[0] );

                        tempSpanObj._fontSize = size;
                        this._finalRTF += '<size='+size+'>';
                    }

                    if(loc_text.indexOf('text-shadow') !== -1){
                        if((loc_text.match(/rgb/g) || []).length === 1){
                            // 단순 shadow 인 경우
                            var temp = loc_text.split('style="')[1].split('">')[0];

                            var shadowArr = temp.split('rgb');

                            var colorArr = shadowArr[1].split(')')[0].split('(')[1].split(',');
                            for(var i = 0; i<colorArr.length;i++){
                                colorArr[i] = colorArr[i].trim();
                            }

                            tempSpanObj._shadow = new shadowObject();
                            tempSpanObj._shadow._color.r = parseInt(colorArr[0]);
                            tempSpanObj._shadow._color.g = parseInt(colorArr[1]);
                            tempSpanObj._shadow._color.b = parseInt(colorArr[2]);

                            var pxArr = shadowArr[1].split(') ')[1].split('px');
                            var pxArr2 = [];

                            for(var i = 0; i<pxArr.length-1;i++){
                                pxArr2.push(parseInt(pxArr[i].trim()));
                            }

                            tempSpanObj._shadow._offsetX = parseInt(pxArr2[0]);
                            tempSpanObj._shadow._offsetY = parseInt(pxArr2[1])*-1;
                            tempSpanObj._shadow._blur    = parseInt(pxArr2[2]);

                            var colorTemp = cc.colorToHex(tempSpanObj._shadow._color);
                            this._finalRTF += '<shadow=('+colorTemp+','+tempSpanObj._shadow._offsetX+','+tempSpanObj._shadow._offsetY+')>';


                        } else if((loc_text.match(/rgb/g) || []).length === 4){
                            // 단순 outline 인 경우


                            // 단순 shadow 인 경우
                            var temp = loc_text.split('style="')[1].split('">')[0];

                            var shadowArr = temp.split('rgb');

                            var colorArr = shadowArr[1].split(')')[0].split('(')[1].split(',');
                            for(var i = 0; i<colorArr.length;i++){
                                colorArr[i] = colorArr[i].trim();
                            }

                            tempSpanObj._outline = new outlineObject();
                            tempSpanObj._outline._color.r = parseInt(colorArr[0]);
                            tempSpanObj._outline._color.g = parseInt(colorArr[1]);
                            tempSpanObj._outline._color.b = parseInt(colorArr[2]);

                            var pxArr = shadowArr[1].split(') ')[1].split('px');
                            var pxArr2 = [];

                            for(var i = 0; i<pxArr.length-1;i++){
                                pxArr2.push(parseInt(pxArr[i].trim()));
                            }

                            tempSpanObj._outline._width    = pxArr2[0] < 0 ? (pxArr2[0]*-1) : pxArr2[0];

                            var colorTemp = cc.colorToHex(tempSpanObj._outline._color);
                            this._finalRTF += '<outline=('+colorTemp+','+tempSpanObj._outline._width+')>';

                        } else if((loc_text.match(/rgb/g) || []).length === 5){
                            // outline+shadow 인 경우

                            // 단순 shadow 인 경우
                            var temp = loc_text.split('style="')[1].split('">')[0];

                            var shadowArr = temp.split('rgb');
                            var shadowObjArr = [];
                            for(var i = 1; i<shadowArr.length; i++){
                                tempSpanObj._shadow = new shadowObject();

                                var tempColor = shadowArr[i].split('(')[1].split(')')[0].split(',');
                                for(var j = 0;j<tempColor.length;j++){
                                    tempColor[j] = parseInt(tempColor[j].trim());
                                }

                                tempSpanObj._shadow._color.r = parseInt(tempColor[0]);
                                tempSpanObj._shadow._color.g = parseInt(tempColor[1]);
                                tempSpanObj._shadow._color.b = parseInt(tempColor[2]);

                                var pxArr = shadowArr[i].split(') ')[1].split('px');
                                var pxArr2 = [];

                                for(var i = 0; i<pxArr.length-1;i++){
                                    pxArr2.push(parseInt(pxArr[i].trim()));
                                }

                                tempSpanObj._shadow._offsetX = pxArr2[0];
                                tempSpanObj._shadow._offsetY = pxArr2[1]*-1;
                                tempSpanObj._shadow._blur    = pxArr2[2];

                                shadowObjArr.push(tempSpanObj._shadow);
                            }

                            var shadowIdx = -1;

                            for(var i = 0; i<shadowObjArr.length;i++){
                                var anchor = shadowObjArr[i];

                                var coef1 = [1,1,-1,-1];
                                var coef2 = [1,-1,1,-1];
                                var coefChk = [false,false,false,false];

                                var curr = 0;
                                for(var j = 0; j<shadowObjArr.length;j++){
                                    if(i===j) continue;

                                    // if(!equals(anchor._color, shadowObjArr[j]._color)){
                                    //     //색상 다를 경우 무조건 다른놈임
                                    //     flag[i] = false;
                                    //     break;
                                    // }
                                    //

                                    for(var k = 0; k<coefChk.length;k++){
                                        if(coefChk[k]){
                                            continue;
                                        }

                                        if(anchor._offsetX*coef1[k] === shadowObjArr[j]._offsetX){
                                            if(anchor._offsetY*coef2[k] === shadowObjArr[j]._offsetY){
                                                if(anchor._blur === shadowObjArr[j]._blur){
                                                    if(equals(anchor._color, shadowObjArr[j]._color)){
                                                        coefChk[k] = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }


                                    }
                                }

                                if(coefChk.filter(t=>t===true).length !== 4){
                                    // 혼자 shadow인 놈을 잡은 것!!
                                    shadowIdx = i;
                                    break;
                                }
                            }

                            if(shadowIdx === -1){
                                //못찾았음..... shadow 가  outline 사이에 숨어있다.
                                // 이럴땐 같은 거 하나만 찾아서 shadow 취급해 주면 된다.

                                for(var i = 0; i<shadowObjArr.length-1;i++){
                                    for(var j = i+1; j<shadowObjArr.length;j++){
                                        if(equals(shadowObjArr[i], shadowObjArr[j])){
                                            shadowIdx = i;
                                            break;
                                        }
                                    }
                                    if(shadowIdx !== -1){
                                        break;
                                    }
                                }

                            }

                            tempSpanObj._shadow = shadowObjArr[shadowIdx];
                            tempSpanObj._outline = new outlineObject();

                            if(shadowIdx === 0){
                                tempSpanObj._outline._width = shadowObjArr[1]._offsetX < 0 ? shadowObjArr[1]._offsetX*-1 : shadowObjArr[1]._offsetX;
                                tempSpanObj._outline._color = shadowObjArr[1]._color;

                            } else {
                                tempSpanObj._outline._width = shadowObjArr[0]._offsetX < 0 ? shadowObjArr[0]._offsetX*-1 : shadowObjArr[0]._offsetX;
                                tempSpanObj._outline._color = shadowObjArr[0]._color;

                            }

                            var colorTemp = cc.colorToHex(tempSpanObj._shadow._color);
                            this._finalRTF += '<shadow=('+colorTemp+','+tempSpanObj._shadow._offsetX+','+tempSpanObj._shadow._offsetY+')>';
                            colorTemp = cc.colorToHex(tempSpanObj._outline._color);
                            this._finalRTF += '<outline=('+colorTemp+','+tempSpanObj._outline._width+')>';



                        }

                    }

                    if(loc_text.indexOf('color:')!==-1){
                        var targetColor = loc_text.split('color: rgb(')[1].split(')')[0].split(',');
                        for(var i = 0; i<targetColor.length; i++){
                            targetColor[i] = parseInt(targetColor[i].trim());
                        }

                        var color = {
                            r : targetColor[0],
                            g : targetColor[1],
                            b : targetColor[2]
                        }

                        this._finalRTF += '<color='+cc.colorToHex(color)+'>';
                        tempSpanObj._fontColor = color;
                    }

                    this._spanStack.push(tempSpanObj);

                }


                //outline 판단



                //font size 판단

                lastParsed = p;


                continue;
            }




            matched = loc_text.match(this.regStart.bold);
            if(!!matched){
                // bold 볼드

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                this._boldStack.push(true);
                this._finalRTF += '<b>';

                lastParsed = p;


                continue;
            }

            matched = loc_text.match(this.regStart.italic);
            if(!!matched){
                // bold 볼드

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                this._italicStack.push(true);
                this._finalRTF += '<i>';


                lastParsed = p;


                continue;
            }


            matched = loc_text.match(this.regStart.div);
            if(!!matched){

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }


                var loc_text = matched[0];
                if(loc_text.indexOf('div')!==-1){
                    var tempHAlign = null;
                    var posText = null;
                    if(loc_text.indexOf('style="text-align')!==-1){
                        posText = loc_text.split('text-align: ')[1].split(';')[0];
                        posText = posText.trim();
                        posText = posText.toUpperCase();

                        switch(posText){
                            case 'LEFT':
                                tempHAlign = cc.TEXT_ALIGNMENT_LEFT;
                                break;
                            case 'CENTER':
                                tempHAlign = cc.TEXT_ALIGNMENT_CENTER;
                                break;
                            case 'RIGHT':
                                tempHAlign = cc.TEXT_ALIGNMENT_RIGHT;
                                break;
                        }
                        // cc.log("HALIGN push ",tempHAlign);

                        this._finalRTF += '<div align='+posText+'>';
                    }
                    else {
                        this._finalRTF += '<div>';
                    }

                    var div = new divObject();
                    div._align = tempHAlign;

                    this._divStack.push(div);


                    lastParsed = p;
                    continue;
                }
            }

            /* ================================================ */

            matched = loc_text.match(this.regEnd.font);
            if(!!matched){
                //폰트

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                if(this._fontStack.pop() === undefined){

                    // cc.log("font end RETURN");
                    return false;

                }

                this._generateHTML('</color>');
                lastParsed = p;


                continue;
            }

            matched = loc_text.match(this.regEnd.span);
            if(!!matched){
                //컬러

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                var tempSpanObj = this._spanStack.pop();
                // this._shadow = null;
                // this._outline = null;
                // this._fontSize = null
                if(tempSpanObj === undefined){
                    // cc.log("span end RETURN");

                    return false;
                }

                if(!!tempSpanObj._outline){
                    this._finalRTF += '</outline>';
                }

                if(!!tempSpanObj._shadow){
                    this._finalRTF += '</shadow>';
                }

                if(!!tempSpanObj._fontSize){
                    this._finalRTF += '</size>';
                }

                if(!!tempSpanObj._fontColor){
                    this._finalRTF += '</color>';
                }

                lastParsed = p;


                continue;
            }

            matched = loc_text.match(this.regEnd.div);
            if(!!matched){

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                this._generateHTML('</div>');

                var tempDiv = this._divStack.pop();
                if(tempDiv === undefined){
                    // cc.log("return div");
                    return false;

                }

                // if(!!tempDiv._align){
                //     this._finalRTF += '</halign>';
                // }

                lastParsed = p;


                continue;
            }

            matched = loc_text.match(this.regStart.br);
            if(!!matched){
                //텍스트 시작

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                // this._renderer.addLineFeed();
                if(this._lineStarted){
                    this._generateHTML('<br>');
                }
                this._lineStarted = true;

                lastParsed = p;
                continue;

            }


            matched = loc_text.match(this.regEnd.bold);
            if(!!matched){

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                if(this._boldStack.pop() === undefined){
                    cc.log("bold end RETURN");

                    return false;
                }

                this._finalRTF += '</b>';

                lastParsed = p;
                continue;

            }

            matched = loc_text.match(this.regEnd.italic);
            if(!!matched){
                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateHTML(targetText);
                }

                if(this._italicStack.pop() === undefined){
                    // cc.log("italic end RETURN");

                    return false;
                }

                this._finalRTF += '</i>';


                lastParsed = p;
                continue;

            }


        }

        if(lastParsed < this._text.length){
            //파싱되지 않은 텍스트가 남은 경우
            var targetText = this._text.substring(lastParsed, this._text.length);
            this._generateHTML(targetText);
        }

        this._finalRTF += '</!RICHTEXT>';
        return this._finalRTF;

    },

    ParseRTF : function(rtf){

    }
}