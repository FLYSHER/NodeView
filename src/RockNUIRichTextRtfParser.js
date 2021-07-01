/*

RTF to Html Parser

 */
RockNUI.RichTextRtfParser = {
    regStart : {
        div : /<\s*div\s*\S*\s*>/,
        font : /<\s*font\s*=\s*\S*\s*>/,
        color : /<\s*color\s*=\s*\S*\s*>/,
        size : /<\s*size\s*=\s*\S*\s*>/,
        outline : /<\s*outline\s*=\s*\S*\s*>/,
        shadow : /<\s*shadow\s*=\s*\S*\s*>/,
        halign : /<\s*halign\s*=\s*\S*\s*>/,
        text_start : /<\s*!RICHTEXT.*>/,
        pos : /<\s*pos\s*=\s*(\s*,+\s*)\s*>/,
        isRichText : /<\s*!RICHTEXT.*>(\s*.*)*<\s*\/\s*!RICHTEXT\s*>/,
        bold : /<\s*b\s*>/,
        italic : /<\s*i\s*\S*>/,
        br : /<\s*br\s*>/,
        newline : /\\n/,
    },
    regEnd : {
        div : /<\s*\/\s*div\s*>/,
        font : /<\s*\/\s*font\s*>/,
        color : /<\s*\/\s*color\s*>/,
        size : /<\s*\/\s*size\s*>/,
        outline : /<\s*\/\s*outline\s*>/,
        shadow : /<\s*\/\s*shadow\s*>/,
        halign : /<\s*\/\s*halign\s*>/,

        bold : /<\s*\/\s*b\s*>/,
        italic : /<\s*\/\s*i\s*>/,

        br : /<\s*\/\s*br\s*>/,

        text_end : /<\s*\/\s*!RICHTEXT\s*>/,

    },

    _getLastItem : function(arr){
        if(Array.isArray(arr) && arr.length > 0){
            return arr[arr.length-1];
        }
        return null;
    },

    _clear : function(){
        this._fontStack         =   [];
        this._colorStack        =   [];
        this._sizeStack         =   [];
        this._outlineStack      =   [];
        this._shadowStack       =   [];
        this._halignStack       =   [];

        this._boldStack      = [];
        this._italicStack    = [];
        // this._underStack     = [];
        // this._glowStack      = [];

        this._position = [];
        this._horizontalAlign = [];
        this._vAlign = null;
        this._hAlign = null;

        this._lineStarted = true; //true일 경우 new line 처리
        this._isFirstText = true;
        this._text = "";
        this._parent = null;
    },

    _generateRTF : function(text){
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

        this._isFirstText = false;
        this._finalHTML += text;

    },

    ParseRTF : function(text){

        this._clear();

        this._finalHTML = '';
        this._parent    = parent;
        this._text      = text;

        this._renderer = null;
        this._isFirstText = true;

        var textStarted = false;

        var textPos = [0,0];
        var textVAlign = null;
        var textHAlign = null;

        var lastParsed = -1;

        for(var i = 0; i < this._text.length + 1; i++){
            var loc_text = this._text.substring(lastParsed < 0 ? 0 : lastParsed, i);
            var matched;

            matched = loc_text.match(this.regStart.color);
            if(!!matched){
                //컬러
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('color')!==-1){
                    var posText = loc_text.split('color')[1].split('>')[0];
                    posText = posText.split('=')[1];
                    posText = posText.trim();

                    this._colorStack.push( cc.hexToColor(posText) );
                    this._finalHTML += '<font color="'+posText+'">';
                }

                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regStart.size);
            if(!!matched){
                //사이즈
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('size')!==-1){
                    var posText = loc_text.split('size')[1].split('>')[0];
                    posText = posText.split('=')[1];
                    posText = posText.trim();

                    this._sizeStack.push(posText);
                    this._finalHTML += '<span style="font-size: '+posText+'px;">';
                }

                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regStart.outline);
            if(!!matched){
                //아웃라인
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('outline')!==-1){
                    var posText = loc_text.split('outline')[1].split(')')[0];
                    posText = posText.split('(')[1].split(',');

                    var outlineColor = cc.hexToColor(posText[0].trim());
                    var outlineSize = posText[1].trim();

                    this._outlineStack.push([outlineColor,outlineSize]);

                    var targetShadow = '';
                    targetShadow += "rgb("+outlineColor.r+', '+outlineColor.g+', ' +outlineColor.b+') '+-outlineSize+'px '+-outlineSize+'px '+'0px,';
                    targetShadow += "rgb("+outlineColor.r+', '+outlineColor.g+', ' +outlineColor.b+') '+outlineSize+'px '+-outlineSize+'px '+'0px,';
                    targetShadow += "rgb("+outlineColor.r+', '+outlineColor.g+', ' +outlineColor.b+') '+-outlineSize+'px '+outlineSize+'px '+'0px,';
                    targetShadow += "rgb("+outlineColor.r+', '+outlineColor.g+', ' +outlineColor.b+') '+outlineSize+'px '+outlineSize+'px '+'0px';

                    this._finalHTML += '<span style="text-shadow: '+targetShadow+';">';
                }

                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regStart.shadow);
            if(!!matched){
                //그림자
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('shadow')!==-1){
                    var posText = loc_text.split('shadow')[1].split(')')[0];
                    posText = posText.split('(')[1].split(',');

                    var outlineColor = cc.hexToColor(posText[0].trim());

                    if(posText[3]){
                        this._shadowStack.push([outlineColor,cc.size(posText[1].trim(), posText[2].trim()),posText[3].trim()]);
                    }
                    else {
                        this._shadowStack.push([outlineColor,cc.size(posText[1].trim(), posText[2].trim()),0]);
                    }

                    var targetShadow = "rgb("+outlineColor.r+', '+outlineColor.g+', ' +outlineColor.b+') '+posText[1].trim()+'px '+posText[2].trim()+'px '+1+'px';

                    this._finalHTML += '<span style="text-shadow: '+targetShadow+';">';
                }

                lastParsed = i;


                continue;
            }


            matched = loc_text.match(this.regStart.bold);
            if(!!matched){
                // bold 볼드
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                this._boldStack.push(true);
                this._finalHTML += '<b>';

                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regStart.italic);
            if(!!matched){
                // bold 볼드
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                this._italicStack.push(true);
                this._finalHTML += '<i>';


                lastParsed = i;


                continue;
            }


            matched = loc_text.match(this.regStart.div);
            if(!!matched){

                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }


                var loc_text = matched[0];
                if(loc_text.indexOf('align')!==-1){
                    var tempHAlign = null;
                    var posText = null;

                    posText = loc_text.split('align=')[1].split('>')[0];
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
                    this._horizontalAlign.push(tempHAlign);
                    this._finalHTML += '<div style="text-align: '+posText.toLowerCase()+';">';


                }
                else {
                    this._finalHTML += '<div>';
                }

                lastParsed = i;
                continue;
            }



            matched = loc_text.match(this.regStart.text_start);//do nothing
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작



                    textStarted = true;
                    lastParsed = i;

                    continue;
                }
                else {
                    //텍스트가 두번 중첩됌
                    return false;
                }





            }

            /* ================================================ */

            matched = loc_text.match(this.regEnd.font);
            if(!!matched){
                //폰트
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._fontStack.pop() === undefined)
                    return false;

                //폰트 변경은 미구현...
                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regEnd.color);
            if(!!matched){
                //컬러
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._colorStack.pop() === undefined)
                    return false;

                this._finalHTML += '</font>';
                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regEnd.size);
            if(!!matched){
                //사이즈
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._sizeStack.pop() === undefined)
                    return false;

                this._finalHTML += '</span>';
                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regEnd.outline);
            if(!!matched){
                //아웃라인
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._outlineStack.pop() === undefined)
                    return false;

                this._finalHTML += '</span>';
                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regEnd.shadow);
            if(!!matched){
                //그림자
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }


                if(this._shadowStack.pop() === undefined)
                    return false;

                this._finalHTML += '</span>';
                lastParsed = i;


                continue;
            }

            // matched = loc_text.match(this.regEnd.halign);
            // if(!!matched){
            //     // halign 수평정렬
            //     if(!textStarted)
            //         return false;
            //
            //     if(matched.index !== 0){
            //         var targetText = loc_text.substring(0,matched.index);
            //         this._generateText(targetText);
            //     }
            //
            //
            //     if(this._horizontalAlign.pop() === undefined)
            //         return false;
            //
            //
            //     lastParsed = i;
            //
            //
            //     continue;
            // }

            matched = loc_text.match(this.regStart.br);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                // this._renderer.addLineFeed();
                if(this._lineStarted){
                    this._generateRTF('');
                }
                this._lineStarted = true;

                lastParsed = i;
                continue;

            }

            // matched = loc_text.match(this.regEnd.br);
            // if(!!matched){
            //     //텍스트 시작
            //     if(!textStarted){
            //         //정상적으로 텍스트 시작
            //         return false;
            //     }
            //
            //     if(matched.index !== 0){
            //         var targetText = loc_text.substring(0,matched.index);
            //         this._generateText(targetText);
            //     }
            //
            //     // this._renderer.addLineFeed();
            //     if(this._lineStarted){
            //         this._generateText('');
            //     }
            //     this._lineStarted = true;
            //
            //
            //     lastParsed = i;
            //     continue;
            //
            // }


            matched = loc_text.match(this.regEnd.bold);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._boldStack.pop() === undefined)
                    return false;

                this._finalHTML += '</b>';
                lastParsed = i;
                continue;

            }

            matched = loc_text.match(this.regEnd.italic);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                if(this._italicStack.pop() === undefined)
                    return false;

                this._finalHTML += '</i>';

                lastParsed = i;
                continue;

            }



            matched = loc_text.match(this.regEnd.text_end);
            if(!!matched){
                //텍스트 시작
                if(!textStarted) {
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateRTF(targetText);
                }

                lastParsed = i;
            }


        }

        if(lastParsed < this._text.length){
            //파싱되지 않은 텍스트가 남은 경우
            var targetText = this._text.substring(lastParsed, this._text.length);
            this._generateRTF(targetText);
        }

        // this._renderer._render();

        return this._finalHTML;


    }
}