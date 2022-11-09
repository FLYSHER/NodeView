/**
 * Created by Federrine on 2020. 02. 21..
 * slot에서 사용하는 Util들을 정리하기 위해 제작
 * SlotUtil - nodeUtil
 */
var IslotUtils = (function () {
    var module;
    return {
        getInstance: function () {
            if (module === undefined) {
                module = new slotUtils();
            }

            return module;
        }
    };
})();

var slotUtils = function () {
    var nodeUtil = {
        removeFromParent: function (child, cleanup) {
            child.retain();
            child.removeFromParent(cleanup);
        },
        addChild: function (parent, child, zorder) {
            if (zorder === undefined) {
                parent.addChild(child);
            } else {
                parent.addChild(child, zorder);
            }
            child.release();
        },
        createTooltipNode: function (owner, nodearr, normalcallback, overcallback) {
            var retnode = new cc.Node();
            var resleft, resright, resbottom, restop = 0;
            for (var i = 0; i < nodearr.length; i++) {
                var left = nodearr[i].getPosition().x - nodearr[i].width * nodearr[i].getAnchorPoint().x;
                var right = nodearr[i].getPosition().x + nodearr[i].width * nodearr[i].getAnchorPoint().x;
                var bottom = nodearr[i].getPosition().y - nodearr[i].height * nodearr[i].getAnchorPoint().y;
                var top = nodearr[i].getPosition().y + nodearr[i].height * nodearr[i].getAnchorPoint().y;
                if (i === 0 || left < resleft)
                    resleft = left;
                if (i === 0 || right > resright)
                    resright = right;
                if (i === 0 || bottom < resbottom)
                    resbottom = bottom;
                if (i === 0 || top > restop)
                    restop = top;
            }

            retnode.setAnchorPoint(0.5, 0.5);
            retnode.setContentSize(resright - resleft, restop - resbottom);
            retnode.setPosition(resleft + retnode.width * retnode.getAnchorPoint().x, resbottom + retnode.height * retnode.getAnchorPoint().y);

            owner.addChild(retnode);
            RockN.Util.create_ToucheObj(retnode, function (pSender, type) {
                switch (type) {
                    case ccui.Widget.TOUCH_BEGAN :
                    case 'over' :
                        overcallback && overcallback();
                        break;

                    case ccui.Widget.TOUCH_ENDED :
                    case ccui.Widget.TOUCH_CANCELED :
                    case 'normal' :
                        normalcallback && normalcallback();
                        break;
                }
            }, retnode);

            return retnode;
        },
        createNodePool: function (poolingnode, initpoolsize) {
            return new slotNodePool(poolingnode, initpoolsize);
        },
    };

    var arUtil = {
        changeSkin: function (armature, bonename, skinindex, isforce) {
            var bonelist = null;
            if (bonename instanceof Array)
                bonelist = bonename;
            else
                bonelist = [bonename];

            for (var i = 0; i < bonelist.length; i++) {
                var bone = armature.getBone(bonelist[i]);
                if (!!bone) {
                    if (bone.getDisplayManager().getDecorativeDisplayList().length > skinindex)
                        bone.changeDisplayWithIndex(skinindex, isforce);
                    else {
                        bone.changeDisplayWithIndex(-1, isforce);
                        RockN.Assert('[SLOT UTIL]', armature._name, bonelist[i], skinindex, 'is out of range ', bone.getDisplayManager().getDecorativeDisplayList().length);
                    }
                } else
                    RockN.Assert('[SLOT UTIL]', armature._name, bonelist[i], 'is no exist');
            }
        }
    };

    var socialUtil = {
        getUserPhotoURL: function (url, isbot) {
            if (isbot === true) {
                if (CONFIG.DEBUG_SLOT === true)
                    return "https://rockncash2.akamaized.net/dev-assets/Bot/" + url;
                else
                    return "https://rockncash2.akamaized.net/assets/Bot/" + url;
            } else if (url === 'toHaveNone') {
                if (CONFIG.DEBUG_SLOT === true)
                    return "https://rockncash2.akamaized.net/dev-assets/Bot/Etc/300.png";
                else
                    return "https://rockncash2.akamaized.net/assets/Bot/Etc/300.png";
            } else
                return url;
        },

        createBotProfilePopup: function (_playerID, _name, _photoURL, _createDate, _grade, _closeCallFunc) {
            var popup = null;
            if (cc.sys.isMobile === false)
                popup = new ProfileLayerForSocialBot(_playerID, _name, _photoURL, _createDate, _grade, _closeCallFunc);
            else
                popup = new PROFILE.ProfileLayerForSocialBot(_playerID, _name, _photoURL, _createDate, _grade, _closeCallFunc);

            return popup;
        }
    };

    var slotTestUtil = {
        getSpinTestPanel: function () {
            if (CONFIG.DEBUG_SLOT === true)
                return new slotSpinTestPanel();
            else
                return null;
        }
    };

    var sceneUtil = {
        goLobby: function () {
            if (cc.sys.isMobile === false) {
                // 웹
                var destination = 'lobby';
                if (RockN.Player && RockN.Player.inVipMode)
                    destination = 'vipLobby';
            } else {
                // 2018.11.13 @OBG
                // 슬롯 -> 로비 전환 시 패킷 초기화
                RockN.NET.resetAllPackets();

                // 슬롯-> 로비 전환시 사운드 초기화
                SoundControl.getInstance().exit();

                if (RockN.Player.level < 3)
                    RockN.Player.isNewUserForLoadingImage = true;

                var destination = 'mobileLobby';
                if (RockN.Player && RockN.Player.inVipMode)
                    destination = 'mobileVipLobby';

                var toLobbyStart = Date.now();
                cc.log("[LoadingTest] toLobby Start ", destination);
            }

            SceneManager.getInstance().changeSceneByName(destination, function (pScene) {
                if (cc.sys.isMobile === true) {
                    RockN.DebugTimeTest.toLobby = (Date.now() - toLobbyStart) / 1000;
                    cc.log("[LoadingTest] toLobby Complete >> ", RockN.DebugTimeTest.toLobby);
                }

                if ('vipLobby' === destination && 'hideWheelAnimation' in pScene)
                    pScene.hideWheelAnimation();
            });
        }
    };

    var util = {
        // 값 변경 로그 ( ex : gameState IDLE -> SPIN )
        changeObjectLog: function (_obj, _prev, _next) {
            var info = {next: '', prev: ''};
            for (var name in _obj) {
                if (_obj.hasOwnProperty(name)) {
                    if (_next === _obj[name])
                        info.next = name;
                    else if (_prev === _obj[name])
                        info.prev = name;
                }
            }
            return info;
        },

        // 좌 - 우, 위 -> 아래 포지션 정렬
        getClientPosSort: function (_arr, _propA, _propB) {
            if (_arr.length <= 0)
                return _arr;

            // _arr.sort( function( a, b ) {
            //     if( a[ _propA ] !== b[ _propB ] )
            //         return a[ _propA ] - b[ _propA ];
            //     else
            //         return a[ _propB ] - b[ _propB ];
            // } );

            _arr.sort(function (a, b) {
                return a[_propA] < b[_propA] ? -1 : 1;
            });

            return _arr;
        },

        getMakeGrid: function (_arrStrip, _arrRand, _row, _mysteryID, _changeMysteryID) {
            var arrGrid = [];
            for (var col = 0; col < _arrRand.length; col++) {
                var stopIndex = -1;
                var stripLength = _arrStrip[col].length;
                arrGrid[col] = [];
                var rand = _arrRand[col];
                if (rand < 0)
                    rand += stripLength;

                stopIndex = rand % stripLength;
                for (var row = 0; row < _row; row++) {
                    var curr = stopIndex + (row - 1);
                    if (_row < 3)
                        curr = stopIndex + row;

                    if (curr < 0)
                        curr += stripLength;

                    curr %= stripLength;
                    arrGrid[col][row] = _arrStrip[col][curr];
                }
            }

            if (!!_mysteryID) {
                for (var col = 0; col < arrGrid.length; col++) {
                    for (var row = 0; row < arrGrid[col].length; row++) {
                        var id = arrGrid[col][row];
                        if (id !== _mysteryID)
                            continue;

                        arrGrid[col][row] = _changeMysteryID;
                    }
                }
            }
            return arrGrid;
        },

        syncLabelSymbolValue: function (_parSheetSymbols, _defSymbols) {
            for (var index = 0; index < _parSheetSymbols.length; index++) {
                var info = _parSheetSymbols[index];
                if (info.hasOwnProperty('value') === true) {
                    for (var index2 = 0; index2 < _defSymbols.length; index2++) {
                        if (_defSymbols[index2].id === info.id) {
                            _defSymbols[index2].valueRatio = info.value;
                            break;
                        }
                    }
                }
            }
        },

        getChangeColumnToRow: function (_arrGrid, _col) {
            var arrGrid = [];
            for (var col = 0; col < _col; col++)
                arrGrid[col] = [];

            for (var row = 0; row < _arrGrid.length; row++) {
                for (var col = 0; col < _arrGrid[row].length; col++) {
                    var id = _arrGrid[row][col];
                    arrGrid[col][row] = id;
                }
            }
            return arrGrid;
        },

        isEmpty: function (_val) {
            var isEmpty = false;
            if (_val === "" || _val === null || _val === undefined || (_val !== null && typeof _val === "object" && !Object.keys(_val).length))
                isEmpty = true;

            return isEmpty;
        }
    };

    var macroFuncion = {
        _getGameNodeViewAttr: function (gameid) {
            var retVal = {
                scale: 1,
                offset: RockN.SLOT_OBJECT_HANDLER.getCenterPoint()
            };

            var config = getSlotConfig(gameid);
            if (RockN.Platform.isMobileUI() === true) {
                retVal.scale = config.mobileAttr[RockN.Util.isWideAspectRatio() === true ? 0 : 1].scale;
                retVal.offset.x += config.mobileAttr[RockN.Util.isWideAspectRatio() === true ? 0 : 1].x;
                retVal.offset.y += config.mobileAttr[RockN.Util.isWideAspectRatio() === true ? 0 : 1].y;
            } else if (!!config.oldWebAttr) {
                retVal.scale = config.oldWebAttr.scale;
                retVal.offset.x += config.oldWebAttr.x;
                retVal.offset.y += config.oldWebAttr.y;
            }

            return retVal;
        },
        getGameNodeViewAttr: function (gameid) {
            var config = getSlotConfig(gameid);
            // new version
            if (!!config.gameNodeViewAttr) {
                var viewType = this.getViewAttrType();
                var retVal = {
                    scale: 1,
                    offset: RockN.SLOT_OBJECT_HANDLER.getCenterPoint()
                };

                retVal.scale = config.gameNodeViewAttr[viewType].scale;
                retVal.offset.x += config.gameNodeViewAttr[viewType].x;
                retVal.offset.y += config.gameNodeViewAttr[viewType].y;

                return retVal;
            }
            // old version - 모든 슬롯 뷰작업 완료되면 삭제, 구버전 호환용으로 놔둠
            else
                return this._getGameNodeViewAttr(gameid);
        },
        getViewAttrType: function () {
            if (RockN.Platform.isMobileUI()) {
                if (RockN.Platform.isMobileDevice()) {
                    if (RockN.Util.isWideAspectRatio())
                        return SlotViewAttrType.mobileWide; // mobile, lite mobile
                    else
                        return SlotViewAttrType.mobilePad;  // mobile-pad, lite mobile-pad
                } else
                    return SlotViewAttrType.newWeb;         // 뉴캔버스, lite web
            } else
                return SlotViewAttrType.oldWeb;             // 구캔버스
        },
        getStateName: function (stateObj, state) {
            for (var name in stateObj) {
                if (stateObj.hasOwnProperty(name) && state === stateObj[name])
                    return name;
            }
            return null;
        },
        isExistID: function (list, id) {
            if (cc.isNumber(list))
                return list === id;

            for (var i = 0; i < list.length; i++)
                if (list[i] === id)
                    return true;

            return false;
        }
    };

    return {
        nodeUtil: nodeUtil,
        arUtil: arUtil,
        socialUtil: socialUtil,
        sceneUtil: sceneUtil,
        macroFuncion: macroFuncion,
        testUtil: slotTestUtil,
        util: util
    };
};

var SlotViewAttrType = {
    oldWeb: 0,
    newWeb: 1,
    mobileWide: 2,
    mobilePad: 3
};

var SlotViewAttrTypeString = [
    'Old Canvas',
    'New Canvas / Lite Web',
    'Mobile Wide / Lite Mobile',
    'Mobile Pad / Lite Pad'
];

var SlotUtils = IslotUtils.getInstance();

var slotNodePool = cc.Class.extend({
    ctor: function (node, initpoolsize) {
        this._initVariable();
        this._initPool(node, initpoolsize);
    },
    _initVariable: function () {
        this._initPoolSize = 0;
        this._poolArr = [];
        this._usedPoolArr = [];
    },
    _initPool: function (node, initpoolsize) {
        this._initPoolSize = initpoolsize;
        node.retain();
        this._poolArr.push(node);
        this._expandPool()
    },
    _expandPool: function () {
        for (var i = 0; i < this._initPoolSize; i++) {
            var node = this._poolArr[0].clone();
            node.retain();
            this._poolArr.push(node);
        }
    },
    releasePool: function () {
        this.returnAllNode();
        for (var i = 0; i < this._poolArr.length; i++) {
            this._poolArr[i].release();
            this._poolArr[i] = null;
        }

        for (var i = 0; i < this._usedPoolArr.length; i++) {
            this._usedPoolArr[i].release();
            this._usedPoolArr[i] = null;
        }

        this._poolArr.length = 0;
        this._usedPoolArr.length = 0;
    },

    getNode: function () {
        if (this._poolArr.length <= 1) {
            this._expandPool();
        }

        var node = this._poolArr.shift();
        this._usedPoolArr.push(node);

        if (cc.isFunction(node.reset))
            node.reset();

        return node;
    },
    returnNode: function (node) {
        node.removeFromParent(false);
        var index = this._usedPoolArr.indexOf(node);
        if (index === -1) {
            return;
        }
        this._usedPoolArr.splice(index, 1);
        this._poolArr.push(node);
    },
    returnAllNode: function () {
        for (var i = 0; i < this._usedPoolArr.length; i++) {
            this._usedPoolArr[i].removeFromParent(false);
            this._poolArr.push(this._usedPoolArr[i]);
        }

        this._usedPoolArr.length = 0;
    }
});

var slotSpinTestPanel = cc.Node.extend({
    TEST_SPIN_COUNT: 5000,
    ctor: function () {
        this._super();
        this._init();
    },
    _init: function () {
        this._initVariable();
        this._lbDisplay = new cc.LabelTTF('', "Arial", 20);
        this._lbDisplay.attr({x: 0, y: 0, anchorX: 0.5, anchorY: 0.5});
        this.addChild(this._lbDisplay);
        this._lbDisplay.setVisible(false);
    },
    _initVariable: function () {
        this._totalSpinCount = 0;
        this._currSpinCount = 0;

        this._startTime = 0;
        this._prevSpinTime = 0;

        this._lbDisplay = null;
    },
    startAutoSpin: function (totalspincount) {
        this._totalSpinCount = totalspincount;
        if (this._totalSpinCount >= 1000)
            this._totalSpinCount = this.TEST_SPIN_COUNT;

        this._currSpinCount = 0;
        this._startTime = (new Date()).getTime();
        this._prevSpinTime = this._startTime;
        this._updateLabel();
        this._lbDisplay.setVisible(true);

        return this._totalSpinCount;
    },
    updateSpinCount: function () {
        this._currSpinCount++;
        this._updateLabel();
    },
    endAutoSpin: function () {
        this._currSpinCount++;
        this._updateLabel();
    },
    _updateLabel: function () {
        var currTime = (new Date()).getTime();

        this._lbDisplay.setString(
            '[COUNT] ' + this._currSpinCount + '/' + this._totalSpinCount +
            ' [LAST] ' + Number((currTime - this._prevSpinTime) / 1000).toFixed(2) +
            ' [AVR] ' + Number((currTime - this._startTime) / 1000 / this._currSpinCount).toFixed(2) +
            ' [TOTAL] ' + Number((currTime - this._startTime) / 1000).toFixed(2));

        this._prevSpinTime = currTime;
    }
});
