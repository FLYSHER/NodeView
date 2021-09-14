/*

RTF to Object Parser

To do list

1. 그림자 외곽선 폰트사이즈 조정시에도 자동 갱신되게 수정 => 완료
2. Object to HTML  줄바꿈 문제 수정
3. 텍스트 추출 기능(RTF)

4. ContentEditable 필드 사이즈 가변 수정
5. ContentEditable 배경 컬러 변경


 */
RockNUI.RichTextParser = {
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
        string : /\${[^\${}]+}/
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
        this._divStack          =   [];

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

    isRichText : function(text){
        return !!text.match(this.regStart.isRichText);
    },

    _generateText : function(text, mapElementStr){
        if(!this._renderer)
            return;

        if(this._lineStarted){
            this._renderer.addString(text, this._getLastItem(this._colorStack), this._getLastItem(this._sizeStack),
                this._getLastItem(this._fontStack), this._getLastItem(this._divStack) ? this._getLastItem(this._divStack)._align : null, this._getLastItem(this._outlineStack),
                this._getLastItem(this._shadowStack), this._getLastItem(this._boldStack), this._getLastItem(this._italicStack), 0, 0, mapElementStr);

            this._lineStarted = false;
        }
        else {
            this._renderer.addStringWithoutLineFeed(text, this._getLastItem(this._colorStack), this._getLastItem(this._sizeStack),
                this._getLastItem(this._fontStack), this._getLastItem(this._outlineStack),
                this._getLastItem(this._shadowStack), this._getLastItem(this._boldStack), this._getLastItem(this._italicStack), mapElementStr);
        }

        this._isFirstText = false;


    },

    Parse : function(parent, text){

        this._clear();

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


            matched = loc_text.match(this.regStart.div);
            if(!!matched){
                //폰트
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }
                if(!this._isFirstText){
                    // this._renderer.addLineFeed();

                    if(this._lineStarted){
                        this._generateText('');
                    }
                    this._lineStarted = true;
                }

                var tempDivObj = new divObject();

                if(loc_text.indexOf('align')!==-1){
                    var tempHAlign = null;
                    var posText = null;
                    if(loc_text.indexOf('(')!==-1){
                        posText = loc_text.split('align')[1].split(')')[0];
                        posText = posText.split('(')[0];
                    }
                    else {//<halign=LEFT> 혹은 <halign=(left)>
                        posText = loc_text.split('align')[1].split('>')[0];
                        posText = posText.split('=')[1];
                    }
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
                    tempDivObj._align = tempHAlign;


                }

                this._divStack.push(tempDivObj);
                this._isFirstText = false;
                lastParsed = i;

                continue;

            }

            matched = loc_text.match(this.regEnd.div);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }

                // this._renderer.addLineFeed();
                // if(this._lineStarted){
                //     this._generateText('');
                // }
                // this._lineStarted = true;

                var popItem = this._divStack.pop();

                if(popItem === undefined)
                    return false;


                lastParsed = i;
                continue;

            }


            matched = loc_text.match(this.regStart.font);
            if(!!matched){
                //폰트
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('font')!==-1){
                    var posText = loc_text.split('font')[1].split('>')[0];
                    posText = posText.split('=')[1];
                    posText = posText.trim();

                    this._fontStack.push( posText );
                }

                lastParsed = i;

                continue;

            }

            matched = loc_text.match(this.regStart.color);
            if(!!matched){
                //컬러
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('color')!==-1){
                    var posText = loc_text.split('color')[1].split('>')[0];
                    posText = posText.split('=')[1];
                    posText = posText.trim();

                    this._colorStack.push( cc.hexToColor(posText) );
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
                    this._generateText(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('size')!==-1){
                    var posText = loc_text.split('size')[1].split('>')[0];
                    posText = posText.split('=')[1];
                    posText = posText.trim();

                    this._sizeStack.push(posText);
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
                    this._generateText(targetText);
                }

                var loc_text = matched[0];
                if(loc_text.indexOf('outline')!==-1){
                    var posText = loc_text.split('outline')[1].split(')')[0];
                    posText = posText.split('(')[1].split(',');

                    var outlineColor = cc.hexToColor(posText[0].trim());
                    var outlineSize = posText[1].trim();

                    this._outlineStack.push([outlineColor,outlineSize]);
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
                    this._generateText(targetText);
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
                    this._generateText(targetText);
                }

                this._boldStack.push(true);

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
                    this._generateText(targetText);
                }

                this._italicStack.push(true);

                lastParsed = i;


                continue;
            }


            matched = loc_text.match(this.regStart.halign);
            if(!!matched){

                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }


                var loc_text = matched[0];
                if(loc_text.indexOf('halign')!==-1){
                    var tempHAlign = null;
                    var posText = null;
                    if(loc_text.indexOf('(')!==-1){
                        posText = loc_text.split('halign')[1].split(')')[0];
                        posText = posText.split('(')[0];
                    }
                    else {//<halign=LEFT> 혹은 <halign=(left)>
                        posText = loc_text.split('halign')[1].split('>')[0];
                        posText = posText.split('=')[1];
                    }
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
                    this._horizontalAlign.push(tempHAlign);
                    lastParsed = i;
                    continue;
                }
            }
            // matched = loc_text.match(this.regStart.newline);
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
            //     this._lineStarted = true;
            //
            //     lastParsed = i;
            //     continue;
            //
            // }


            matched = loc_text.match(this.regStart.string);
            if(!!matched){

                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }


                var loc_text = matched[0];

                var textStr = loc_text.substring(2,loc_text.length - 1);



                this._generateText(matched[0], textStr);


                lastParsed = i;
                continue;

            }



            matched = loc_text.match(this.regStart.text_start);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작


                    this._renderer = new RockNUI.RichTextUI();
                    var loc_text = matched[0];

                    if(loc_text.indexOf('pos')!==-1){
                        var posText = loc_text.split('pos')[1].split(')')[0];
                        posText = posText.split('(')[1];
                        posText = posText.split(',');
                        textPos[0] = posText[0].trim();
                        textPos[1] = posText[1].trim();
                    }
                    else {
                        textPos = [0,0];
                    }

                    if(loc_text.indexOf('size')!==-1){
                        var posText = loc_text.split('size')[1].split(')')[0];
                        posText = posText.split('(')[1];
                        posText = posText.split(',');
                        textSize[0] = posText[0].trim();
                        textSize[1] = posText[1].trim();
                    }
                    else {
                        textSize = null;
                    }

                    if(loc_text.indexOf('valign')!==-1){
                        var posText = loc_text.split('valign')[1].split(')')[0];
                        posText = posText.split('(')[0];
                        posText = posText.trim();
                        posText = posText.toUpperCase();

                        switch(posText){
                            case 'CENTER':
                                textVAlign = cc.VERTICAL_TEXT_ALIGNMENT_CENTER;
                                break;
                            case 'TOP':
                                textVAlign = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
                                break;
                            case 'BOTTOM':
                                textVAlign = cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM;
                                break;
                        }
                    }
                    else {
                        textVAlign = cc.VERTICAL_TEXT_ALIGNMENT_TOP;
                    }

                    if(loc_text.indexOf('halign')!==-1){
                        var posText = loc_text.split('halign')[1].split(')')[0];
                        posText = posText.split('(')[0];
                        posText = posText.trim();
                        posText = posText.toUpperCase();

                        switch(posText){
                            case 'LEFT':
                                textHAlign = cc.TEXT_ALIGNMENT_LEFT;
                                break;
                            case 'CENTER':
                                textHAlign = cc.TEXT_ALIGNMENT_CENTER;
                                break;
                            case 'RIGHT':
                                textHAlign = cc.TEXT_ALIGNMENT_RIGHT;
                                break;
                        }
                    }
                    else {
                        textHAlign = cc.TEXT_ALIGNMENT_LEFT;
                    }

                    this._position = textPos;
                    this._vAlign = textVAlign;
                    this._hAlign = textHAlign;

                    this._renderer.setVerticalAlignment(this._vAlign);
                    this._renderer.setHorizontalAlignment(this._hAlign);

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
                    this._generateText(targetText);
                }

                if(this._fontStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }

                if(this._colorStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }

                if(this._sizeStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }

                if(this._outlineStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }


                if(this._shadowStack.pop() === undefined)
                    return false;


                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regEnd.halign);
            if(!!matched){
                // halign 수평정렬
                if(!textStarted)
                    return false;

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }


                if(this._horizontalAlign.pop() === undefined)
                    return false;


                lastParsed = i;


                continue;
            }

            matched = loc_text.match(this.regStart.br);
            if(!!matched){
                //텍스트 시작
                if(!textStarted){
                    //정상적으로 텍스트 시작
                    return false;
                }

                if(matched.index !== 0){
                    var targetText = loc_text.substring(0,matched.index);
                    this._generateText(targetText);
                }

                // this._renderer.addLineFeed();
                // if(this._lineStarted){
                //     this._generateText('');
                // }
                // this._lineStarted = true;

                lastParsed = i;
                continue;

            }
            //
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
                    this._generateText(targetText);
                }

                if(this._boldStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }

                if(this._italicStack.pop() === undefined)
                    return false;

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
                    this._generateText(targetText);
                }

                lastParsed = i;
            }


        }

        if(lastParsed < this._text.length){
            //파싱되지 않은 텍스트가 남은 경우
            var targetText = this._text.substring(lastParsed, this._text.length);
            this._generateText(targetText);
        }

        this._renderer._render();
        this._renderer.setOriginText(text);

        return this._renderer;


    }
}