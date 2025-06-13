exportManager = {
    exportNodeToJson : function( node, filePath ) {
        const configData = Renderer_layout.loadConfig();
        if (!configData) {
            return null;
        }
        const isAR = node.hasOwnProperty('armatureData');
        const isUI = !isAR;
        const fileName = filePath ? filePath.split('\\').at(-1).replace('.ExportJson', '') : null;

        let exportJson = {
            genie_tool_version : configData ? configData.version : '0.0.1',
        };
        console.log("[export] " + (isAR ? "AR data : " : "UI data : "));
        switch (configData.version) {
            case '0.0.1':
            case '1.0.6':
            default:
                if (isAR) {
                    exportJson = this.exportAR_v1_0_6(node, filePath, fileName, exportJson);
                } else if (isUI) {
                    exportJson = this.exportUI_v1_0_6(node, filePath, fileName, exportJson);
                } else {
                    return null;
                }
                return JSON.stringify(exportJson, null, 4);
        }
    },

    exportAR_v1_0_6 : function (node, filePath, fileName, exportJson) {
        /**
         * AR 파일 형태
         * content_scale
         * armature_data
         * animation_data
         * texture_data
         * config_file_path
         * config_png_path
         */

        // content_scale
        exportJson['content_scale'] = node.getScale();
        // armature_data
        const armatureData = node.getArmatureData();
        const boneDic = node.getBoneDic();
        if (armatureData) {
            const boneDataDic = armatureData.getBoneDataDic();
            exportJson['armature_data'] = [{
                strVersion : "1.6.0.0",
                version : armatureData['dataVersion'],
                name : fileName ? fileName : armatureData['name'],
                bone_data : this.getBoneDataDicArrayForExport(boneDataDic, boneDic),
            }];
        }

        // animation_data
        const animationData = node.getAnimation().getAnimationData();
        if (animationData) {
            const movDataDic = animationData['movementDataDic'];
            const movDataArr = [];
            Object.entries(movDataDic).forEach(([trackName, mov_data]) => {
                const movBoneDataDic = mov_data['movBoneDataDic'];
                const movBoneDataArr = [];
                Object.entries(movBoneDataDic).forEach(([boneName, bone_data]) => {
                    const frameList = bone_data['frameList'];
                    const frameDataArr = [];
                    frameList.forEach((frame_data) => {
                        frameDataArr.push({
                            dI : frame_data['displayIndex'],
                            x : frame_data['x'],
                            y : frame_data['y'],
                            z : frame_data['zOrder'],
                            cX : frame_data['scaleX'],
                            cY : frame_data['scaleY'],
                            kX : frame_data['skewX'],
                            kY : frame_data['skewY'],
                            fi : frame_data['frameID'],
                            twE : frame_data['tweenEasing'],
                            tweenFrame : frame_data['isTween'],
                            bd_src : frame_data['blendFunc']['src'],
                            bd_dst : frame_data['blendFunc']['dst']
                        });
                    });
                    movBoneDataArr.push({
                        name : boneName,
                        dl : bone_data['delay'],
                        frame_data : frameDataArr,
                    });
                });

                movDataArr.push({
                    name : trackName,
                    dr : mov_data['duration'],
                    lp : mov_data['loop'],
                    to : mov_data['durationTo'],
                    drTW : mov_data['durationTween'],
                    twE : mov_data['tweenEasing'],
                    sc : mov_data['scale'],
                    mov_bone_data : movBoneDataArr,
                });
            });

            exportJson['animation_data'] = [{
                name : fileName ? fileName : animationData['name'],
                mov_data : movDataArr,
            }];
        }

        // texture_data
        const configFilePath = node.getName() + ".ExportJson";
        const relativeData = ccs.armatureDataManager.getRelativeData(configFilePath);
        const texturesNameArr = relativeData['textures'];
        const textureDataArr = [];
        texturesNameArr.forEach((tex_name) => {
            const texData = ccs.armatureDataManager.getTextureData(tex_name);
            textureDataArr.push({
                name : tex_name,
                width : texData['width'],
                height : texData['height'],
                pX : texData['pivotX'],
                pY : texData['pivotY'],
                plistFile : cc.spriteFrameCache.getPlistFileNameByTextureName(tex_name + '.png', relativeData.plistFiles),
            });
        });

        exportJson['texture_data'] = textureDataArr;

        // config_file_path
        exportJson['config_file_path'] = relativeData.plistFiles;

        // config_png_path
        exportJson['config_png_path'] = [];
        relativeData.plistFiles.forEach((plist_name) => {
            exportJson['config_png_path'].push(cc.spriteFrameCache._frameConfigCache[plist_name].meta.image);
        });

        return exportJson;
    },

    exportUI_v1_0_6 : function (node, filePath, fileName, exportJson) {
        /**
         * UI 파일 형태
         * classname
         * name
         * animation
         * dataScale
         * designHeight
         * designWidth
         * textures
         * texturesPng
         * version
         * widgetTree
         */

        // classname
        exportJson['classname'] = null;

        // name
        exportJson['name'] = null;

        // animation
        const actionList = ccs.actionManager.getActionList(node.getName() + '.ExportJson');
        const actionListArr = [];
        if (actionList) {

            actionList.forEach((action) => {
                const actionNodeList = action._actionNodeList;
                const actionNodeListArr = [];
                actionNodeList.forEach((actionNode) => {
                    const frameArray = actionNode._frameArray;
                    const actionFrameListArr = [];

                    if (frameArray && frameArray[0] && frameArray[0] instanceof Array) {
                        for (let i = 0; i < frameArray[0].length; i++) {
                            let frameData = {
                                classname : null,
                                name : null,
                            };

                            for (let frameIdx = 0; frameIdx < frameArray.length; frameIdx++) {
                                const frame = frameArray[frameIdx][i];
                                frameData['frameid'] = frame['frameIndex'];
                                frameData['starttime'] = frame['time'];
                                switch (frame['frameType']) {
                                    // position
                                    case ccs.FRAME_TYPE_MOVE:
                                        frameData['positionx'] = frame.getPosition().x;
                                        frameData['positiony'] = frame.getPosition().y;
                                        break;
                                    // scale
                                    case ccs.FRAME_TYPE_SCALE:
                                        frameData['scalex'] = frame.getScaleX();
                                        frameData['scaley'] = frame.getScaleY();
                                        break;
                                    // rotation
                                    case ccs.FRAME_TYPE_ROTATE:
                                        frameData['rotation'] = frame.getRotation();
                                        break;
                                    // color
                                    case ccs.FRAME_TYPE_TINT:
                                        frameData['colorr'] = frame.getColor().r;
                                        frameData['colorg'] = frame.getColor().g;
                                        frameData['colorb'] = frame.getColor().b;
                                        break;
                                    // opacity
                                    case ccs.FRAME_TYPE_FADE:
                                        frameData['opacity'] = frame.getOpacity();
                                        break;
                                    // texture
                                    case ccs.FRAME_TYPE_MAX:
                                        break;
                                }
                            }

                            actionFrameListArr.push(frameData);
                        }
                    }

                    actionNodeListArr.push({
                        classname : null,
                        name : actionNode._object.getName(),
                        ActionTag : actionNode._object._actionTag,
                        actionframelist : actionFrameListArr,
                    });
                });

                actionListArr.push({
                    classname : null,
                    name : action.getName(),
                    actionnodelist : actionNodeListArr,
                    loop : action.getLoop(),
                    unittime : action.getUnitTime()
                });
            });
        }
        exportJson['animation'] = {
            classname : null,
            name : "AnimationManager",
            actionlist : actionListArr,
        };

        // dataScale
        exportJson['dataScale'] = node.getScale();

        // designHeight
        exportJson['designHeight'] = node.getContentSize().height;

        // designWidth
        exportJson['designWidth'] = node.getContentSize().width;

        // textures
        const cachedData = cc.loader.cache[node.getName() + '.ExportJson'];
        exportJson['textures'] = (cachedData && cachedData.textures) ? cachedData.textures : [];

        // texturesPng
        exportJson['texturesPng'] = (cachedData && cachedData.texturesPng) ? cachedData.texturesPng : [];

        // version
        exportJson['version'] = "1.6.0.0";

        // position Percent 계산을 위해서 변경
        node.setAnchorPoint(cc.p(0, 0));
        // 위젯 트리 만들기
        const widgetTree = {};
        this.makeWidgetTree(node, widgetTree);

        node.setAnchorPoint(cc.p(0.5, 0.5));
        exportJson['widgetTree'] = widgetTree;

        return exportJson;
    },

    makeWidgetTree : function (widget, result) {
        let _classname = "";
        let _extra = {};
        if (widget instanceof ccui.Text) {
            _classname = "Label";
            _extra = {
                areaHeight : widget.getTextAreaSize().height,
                areaWidth : widget.getTextAreaSize().width,
                fontFile : null,
                fontName : widget.getFontName(),
                fontSize : widget.getFontSize(),
                hAlignment : widget.getTextHorizontalAlignment(),
                text : widget.getString(),
                touchScaleEnable : widget.isTouchEnabled(),
                vAlignment : widget.getTextVerticalAlignment()
            };
        } else if (widget instanceof ccui.LabelBMFont) {
            _classname = "LabelBMFont";
            _extra = {
                fileNameData : widget.getFntFileData(),
                text : widget.getString()
            };
        } else if (widget instanceof ccui.Button) {
            _classname = "Button";
            _extra = {
                // capInsets 를 1, 1 으로 고정하는 것 같다.
                capInsetsHeight : 1,    // widget.getCapInsetsNormalRenderer().height,
                capInsetsWidth : 1,     // widget.getCapInsetsNormalRenderer().width,
                capInsetsX : widget.getCapInsetsNormalRenderer().x,
                capInsetsY : widget.getCapInsetsNormalRenderer().y,
                disabled : null,
                disabledData : {
                    path : widget._disabledFileName,
                    plistFile : widget._disabledFileName ? "" : null,
                    resourceType : widget._disabledTexType
                },
                fontName : widget.getTitleFontName(),
                fontSize : widget.getTitleFontSize(),
                fontType : 0,
                normal : null,
                normalData : {
                    path : widget._normalFileName,
                    plistFile : widget._normalFileName ? "" : null,
                    resourceType : widget._normalTexType
                },
                pressed : null,
                pressedData : {
                    path : widget._clickedFileName,
                    plistFile : widget._clickedFileName ? "" : null,
                    resourceType : widget._pressedTexType
                },
                scale9Enable : widget.isScale9Enabled(),
                scale9Height : widget.getContentSize().height,
                scale9Width : widget.getContentSize().width,
                text : widget.getTitleText(),
                textColorB : widget.getTitleColor().b,
                textColorG : widget.getTitleColor().g,
                textColorR : widget.getTitleColor().r
            };
        } else if (widget instanceof ccui.PageView) {
            _classname = "PageView";
            _extra = {
                backGroundImage : null,
                backGroundImageData : widget.getBackGroundImageData(),
                backGroundScale9Enable : widget.isBackGroundImageScale9Enabled(),
                bgColorB : widget.getBackGroundColor().b,
                bgColorG : widget.getBackGroundColor().g,
                bgColorOpacity : widget.getBackGroundColor().a,
                bgColorR : widget.getBackGroundColor().r,
                bgEndColorB : widget.getBackGroundEndColor().b,
                bgEndColorG : widget.getBackGroundEndColor().g,
                bgEndColorR : widget.getBackGroundEndColor().r,
                bgStartColorB : widget.getBackGroundStartColor().b,
                bgStartColorG : widget.getBackGroundStartColor().g,
                bgStartColorR : widget.getBackGroundStartColor().r,
                bounceEnable : widget.isBounceEnabled(),
                capInsetHeight : widget.getBackGroundImageCapInsets().height,
                capInsetsWidth : widget.getBackGroundImageCapInsets().width,
                capInsetsX : widget.getBackGroundImageCapInsets().x,
                capInsetsY : widget.getBackGroundImageCapInsets().y,
                clipAble : widget.isClippingEnabled(),
                colorType : widget.getBackGroundColorType(),
                editorClipAble : widget.isClippingEnabled(),
                vectorX : widget.getBackGroundColorVector().x,
                vectorY : widget.getBackGroundColorVector().y
            };
        } else if (widget instanceof ccui.ListView) {
            _classname = "ListView";
            _extra = {
                backGroundImage : null,
                backGroundImageData : widget.getBackGroundImageData(),
                backGroundScale9Enable : widget.isBackGroundImageScale9Enabled(),
                bgColorB : widget.getBackGroundColor().b,
                bgColorG : widget.getBackGroundColor().g,
                bgColorOpacity : widget.getBackGroundColor().a,
                bgColorR : widget.getBackGroundColor().r,
                bgEndColorB : widget.getBackGroundEndColor().b,
                bgEndColorG : widget.getBackGroundEndColor().g,
                bgEndColorR : widget.getBackGroundEndColor().r,
                bgStartColorB : widget.getBackGroundStartColor().b,
                bgStartColorG : widget.getBackGroundStartColor().g,
                bgStartColorR : widget.getBackGroundStartColor().r,
                bounceEnable : widget.isBounceEnabled(),
                capInsetHeight : widget.getBackGroundImageCapInsets().height,
                capInsetsWidth : widget.getBackGroundImageCapInsets().width,
                capInsetsX : widget.getBackGroundImageCapInsets().x,
                capInsetsY : widget.getBackGroundImageCapInsets().y,
                clipAble : widget.isClippingEnabled(),
                colorType : widget.getBackGroundColorType(),
                direction : widget.getDirection(),
                editorClipAble : widget.isClippingEnabled(),
                gravity : widget._gravity,
                innerHeight : widget.getInnerContainerSize().height,
                innerWidth : widget.getInnerContainerSize().width,
                itemMargin : widget.getItemsMargin(),
                vectorX : widget.getBackGroundColorVector().x,
                vectorY : widget.getBackGroundColorVector().y
            };
        } else if (widget instanceof ccui.ScrollView) {
            _classname = "ScrollView";
            _extra = {
                backGroundImage : null,
                backGroundImageData : widget.getBackGroundImageData(),
                backGroundScale9Enable : widget.isBackGroundImageScale9Enabled(),
                bgColorB : widget.getBackGroundColor().b,
                bgColorG : widget.getBackGroundColor().g,
                bgColorOpacity : widget.getBackGroundColor().a,
                bgColorR : widget.getBackGroundColor().r,
                bgEndColorB : widget.getBackGroundEndColor().b,
                bgEndColorG : widget.getBackGroundEndColor().g,
                bgEndColorR : widget.getBackGroundEndColor().r,
                bgStartColorB : widget.getBackGroundStartColor().b,
                bgStartColorG : widget.getBackGroundStartColor().g,
                bgStartColorR : widget.getBackGroundStartColor().r,
                bounceEnable : widget.isBounceEnabled(),
                capInsetHeight : widget.getBackGroundImageCapInsets().height,
                capInsetsWidth : widget.getBackGroundImageCapInsets().width,
                capInsetsX : widget.getBackGroundImageCapInsets().x,
                capInsetsY : widget.getBackGroundImageCapInsets().y,
                clipAble : widget.isClippingEnabled(),
                colorType : widget.getBackGroundColorType(),
                direction : widget.getDirection(),
                editorClipAble : widget.isClippingEnabled(),
                innerHeight : widget.getInnerContainerSize().height,
                innerWidth : widget.getInnerContainerSize().width,
                layoutType : widget.getLayoutType(),
                vectorX : widget.getBackGroundColorVector().x,
                vectorY : widget.getBackGroundColorVector().y
            };
        } else if (widget instanceof ccui.Layout) {
            _classname = "Panel";
            _extra = {
                adaptScreen : false,
                backGroundImage : null,
                backGroundImageData : widget.getBackGroundImageData(),
                backGroundScale9Enable : widget.isBackGroundImageScale9Enabled(),
                bgColorB : widget.getBackGroundColor().b,
                bgColorG : widget.getBackGroundColor().g,
                bgColorOpacity : widget.getBackGroundColor().a,
                bgColorR : widget.getBackGroundColor().r,
                bgEndColorB : widget.getBackGroundEndColor().b,
                bgEndColorG : widget.getBackGroundEndColor().g,
                bgEndColorR : widget.getBackGroundEndColor().r,
                bgStartColorB : widget.getBackGroundStartColor().b,
                bgStartColorG : widget.getBackGroundStartColor().g,
                bgStartColorR : widget.getBackGroundStartColor().r,
                // capInsets 를 1, 1 으로 고정하는 것 같다.
                capInsetsHeight : 1,    // widget.getBackGroundImageCapInsets().height,
                capInsetsWidth : 1,     // widget.getBackGroundImageCapInsets().width,
                capInsetsX : widget.getBackGroundImageCapInsets().x,
                capInsetsY : widget.getBackGroundImageCapInsets().y,
                clipAble : widget.isClippingEnabled(),
                colorType : widget.getBackGroundColorType(),
                layoutType : widget.getLayoutType(),
                vectorX : widget.getBackGroundColorVector().x,
                vectorY : widget.getBackGroundColorVector().y
            };
        } else if (widget instanceof ccui.CheckBox) {
            _classname = "CheckBox";
            _extra = {
                backGroundBox : null,
                backGroundBoxData : {
                    path : widget._backGroundFileName,
                    plistFile : widget._backGroundFileName && widget._backGroundFileName !== "" ? "" : null,
                    resourceType : widget._backGroundTexType
                },
                backGroundBoxDisabled : null,
                backGroundBoxDisabledData : {
                    path : widget._backGroundDisabledFileName,
                    plistFile : widget._backGroundDisabledFileName && widget._backGroundDisabledFileName !== "" ? "" : null,
                    resourceType : widget._backGroundDisabledTexType
                },
                backGroundBoxSelected : null,
                backGroundBoxSelectedData : {
                    path : widget._backGroundSelectedFileName,
                    plistFile : widget._backGroundSelectedFileName && widget._backGroundSelectedFileName !== "" ? "" : null,
                    resourceType : widget._backGroundSelectedTexType
                },
                frontCross : null,
                frontCrossData : {
                    path : widget._frontCrossFileName,
                    plistFile : widget._frontCrossFileName && widget._frontCrossFileName !== "" ? "" : null,
                    resourceType : widget._frontCrossTexType
                },
                frontCrossDisabled : null,
                frontCrossDisabledData : {
                    path : widget._frontCrossDisabledFileName,
                    plistFile : widget._frontCrossDisabledFileName && widget._frontCrossDisabledFileName !== "" ? "" : null,
                    resourceType : widget._frontCrossDisabledTexType
                },
                selectedState : widget.isSelected()
            };
        } else if (widget instanceof ccui.ImageView) {
            _classname = "ImageView";
            _extra = {
                // capInsets 를 1, 1 으로 고정하는 것 같다.
                capInsetsHeight : 1,    // widget.getCapInsets().height,
                capInsetsWidth : 1,     // widget.getCapInsets().width,
                capInsetsX : widget.getCapInsets().x,
                capInsetsY : widget.getCapInsets().y,
                fileName : null,
                fileNameData : {
                    path : widget._textureFile,
                    plistFile : widget._textureFile && widget._textureFile !== "" ? "" : null,
                    resourceType : widget._imageTexType
                },
                scale9Enable : widget.isScale9Enabled(),
                scale9Height : widget.getContentSize().height,
                scale9Width : widget.getContentSize().width
            };
        } else if (widget instanceof ccui.LoadingBar) {
            _classname = "LoadingBar";
        } else if (widget instanceof ccui.Slider) {
            _classname = "Slider";
        } else if (widget instanceof ccui.TextField) {
            _classname = "TextField";
        }

        const parent = widget.getParent();

        // 기본 옵션
        let _option = {
            __type : _classname + "Surrogate:#EditorCommon.JsonModel.Component.GUI",
            classname : _classname,
            name : widget.getName(),
            ZOrder : widget.getLocalZOrder(),
            actiontag : widget.getActionTag(),
            anchorPointX : widget.getAnchorPoint().x,
            anchorPointY : widget.getAnchorPoint().y,
            classType : "CocoStudio.EngineAdapterWrap.CS" + _classname,
            colorB : widget.getColor().b,
            colorG : widget.getColor().g,
            colorR : widget.getColor().r,
            customProperty : "", // ?
            flipX : widget.isFlippedX(),
            flipY : widget.isFlippedY(),
            height : widget.getContentSize().height,
            ignoreSize : widget.isIgnoreContentAdaptWithSize(),
            layoutParameter : widget.getLayoutParameter() || null,
            opacity : widget.getOpacity(),
            positionPercentX : widget.getPositionPercent().x - (parent ? parent.getAnchorPoint().x : 0),
            positionPercentY : widget.getPositionPercent().y - (parent ? parent.getAnchorPoint().y : 0),
            positionType : widget.getPositionType(),
            rotation : widget.getRotation(),
            scaleX : widget.getScaleX(),
            scaleY : widget.getScaleY(),
            sizePercentX : widget.getSizePercent().x,
            sizePercentY : widget.getSizePercent().y,
            sizeType : widget.getSizeType(),
            tag : widget.getTag(),
            touchAble : widget.isTouchEnabled(),
            useMergedTexture : true,
            visible : widget.isVisible(),
            width : widget.getContentSize().width,
            // x, y 좌표는 노드가 그 부모의 앵커 포인트 및 사이즈에 영향을 받기 때문에 역산해서 넣는다.
            x : parent ? widget.getPositionX() - (parent.getContentSize().width * parent.getAnchorPoint().x) : widget.getPositionX(),
            y : parent ? widget.getPositionY() - (parent.getContentSize().height * parent.getAnchorPoint().y) : widget.getPositionY(),
        }

        console.log("[export] widgetTree processing...", result);
        const nextChildren = [];
        if (result instanceof Array) {
            result.push({
                classname : _classname,
                name : null,
                children : nextChildren,
                options : {
                    ..._option,
                    ..._extra
                }
            });
        } else {
            result['classname'] = _classname;
            result['name'] = null;
            result['children'] = nextChildren;
            result['options'] = {
                ..._option,
                ..._extra
            }
        }

        // node 에서는 자식 순서가 랜덤이므로 생성 순으로 정렬해서 넣는다.
        widget.children.sort((a, b) => a.__instanceId <= b.__instanceId ? -1 : 1);
        for (let i = 0; i < widget.children.length; i++) {
            this.makeWidgetTree(widget.children[i], nextChildren);
        }
    },

    getBoneDataDicArrayForExport : function (boneDataDic, boneDic) {
        const result = [];
        Object.entries(boneDataDic).forEach(([boneName, data]) => {
            const displayManager = boneDic[boneName].getDisplayManager();
            const displayList = [];
            data['displayDataList'].forEach((displayData) => {
                displayList.push({
                    name : displayData['displayName'],
                    displayType: displayData['displayType'],
                    skin_data : [
                        {
                            x : displayData['skinData']['x'],
                            y : displayData['skinData']['y'],
                            cX : displayData['skinData']['scaleX'],
                            CY : displayData['skinData']['scaleY'],
                            kX : displayData['skinData']['skewX'],
                            kY : displayData['skinData']['skewY'],
                        }
                    ]
                });
            });
            const _bone_data = {
                name : data['name'],
                parent : data['parentName'],
                // todo.. 아직 파악 필요
                dI : displayManager.getCurrentDisplayIndex(), // displayIndex??
                x : data['x'],
                y : data['y'],
                z : data['zOrder'],
                cX : data['scaleX'],
                cY : data['scaleY'],
                kX : data['skewX'],
                kY : data['skewY'],
                arrow_x : 0.0, // ?
                arrow_y : 0.0, // ?
                effectbyskeleton : true, // cocosStudio 에서 bone 추가 시 자식을 붙일 수 있나 없나 유무라고 함.
                bl : 0, // blendFunc ?
                display_data : displayList,
            };
            result.push(_bone_data);
        });
        return result;
    },
};