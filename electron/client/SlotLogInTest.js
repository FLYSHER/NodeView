var SLOT_LOAD_NUMBER = 1190;
var SLOT_FILE_LOAD = -1;
if (SLOT_LOAD_NUMBER !== -1) {
    var SCENE = null;
    var CB = null;

    var startSubLoading = function () {
        SingleGrayLayer.getInst().attach(RockN.GameScene, 9999);
        SubLoading.getInst().startSubLoadingAsChild(RockN.GameScene);
        if (RockN.GameScene.gamePause !== undefined) {
            RockN.GameScene.gamePause(true);
        }
    };
    var stopSubLoading = function () {
        SingleGrayLayer.getInst().detach(RockN.GameScene);
        SubLoading.getInst().endSubLoading();
        if (RockN.GameScene.gamePause !== undefined) {
            RockN.GameScene.gameResume(true);
        }
    };
    SceneManager.getInstance().changeSceneByName = function (sceneName, cb) {
        this._fromScene = this._currSceneIndex;

        /**공을쳤ㄷ을
         * forced release sound
         */
        SoundControl.getInstance().exit();

        var changeScene = function () {
            var sceneIndex = -1;
            for (var i = 0; i < sceneList.length; ++i) {
                if (sceneList[i].name !== sceneName) {
                    continue;
                }
                sceneIndex = i;
            }

            var res = [];

            res = sceneList[sceneIndex].res || [];

            if (sceneList[sceneIndex].soundRes !== undefined &&
                sceneList[sceneIndex].soundRes instanceof Array) {

                if (cc.sys.browserType !== cc.sys.BROWSER_TYPE_IE) {
                    res = res.concat(sceneList[sceneIndex].soundRes);
                } else {
                    SoundControl.getInstance().createSounds(sceneList[sceneIndex].soundRes);
                }
            }


            for (var i = 0; i < sceneList.length; ++i) {
                if (sceneList[i].name !== sceneName) {
                    continue;
                }

                test_gRes(sceneList[i].res, sceneList[i].name);

                RockN.LOADING = true;
                this._currSceneIndex = i;

                var customLoadFn = sceneList[i].loaderFn || null;           // vipLobby
                var useRockNLoader = sceneList[i].baseLoader || null;       // login, lobby, cvLobby, cvLounge
                var customLoader = sceneList[i].loaderScene || null;


                /**
                 * game data load
                 */

                // system resource concat
                if (RockN.Player) {
                    res = NewUserQuest.concatRes(res);
                    res = PieceEvent.concatRes(res);
                    res = PickEvent.concatRes(res);
                }

                res = getUniqueValuesArray(res);


                var pLoader = null, self = this;

                if (null !== customLoader) {
                    pLoader = sceneList[i].loader;
                    if (null === pLoader) {
                        pLoader = sceneList[i].loader = sceneList[i].loaderScene();
                    }

                    pLoader.initWithResources(res, function () {
                        self._swapScene(cb);
                    }, this);

                    cc.director.runScene(pLoader);
                } else if (null !== customLoadFn) {                 // lounge
                    customLoadFn(res, function () {
                        self._swapScene(cb);
                    }, this);
                } else if (useRockNLoader) {                // lobby,  cvLobby, cvLounge
                    RockNLoader.preLoad(res, function () {
                        //self._swapScene(cb);
                        if (sceneName === "vipLobby") {
                            if (SLOT_LOAD_NUMBER !== undefined && SLOT_LOAD_NUMBER !== -1) {
                                var enterSlot = function () {
                                    RNCSlotEntry.enterSlot(SLOT_LOAD_NUMBER, "",
                                        function (msg) {
                                        },
                                        function (msg) {
                                            self['ownerNode']['slotTouchLock'] = false;
                                        }
                                    );
                                };
                                enterSlot();
                            } else {
                                self._swapScene(cb);
                            }
                        } else {
                            self._swapScene(cb);
                        }
                    }, self);
                } else {                                      // slot
                    var sceneData = sceneList[i];
                    pLoader = new SlotLoader(sceneData);
                    pLoader.initWithResources(res, function () {
                            self._swapScene(cb);
                        },
                        this);

                    var slotLoadingImg = 'image/sl_loadingImg_' + (sceneData.game_id % 1000) + '.png';
                    var resArr = convertObjToArr(SlotLoader.Res);
                    resArr.push(slotLoadingImg); //

                    startSubLoading();
                    cc.loader.load(resArr, function () {
                        stopSubLoading();
                        cc.director.runScene(pLoader);
                    });
                }
                break;
            }
        }.bind(this);

        if (RockN.Player) {
            //뮤직박스 (최초 정보 가져오기, 씬 이동시 처리)
            cc.log("[System] **** change Scene Process START **** ");

            cc.eventManager.pauseTarget(cc.director.getRunningScene(), true);
            async.parallel([
                function (cb) {
                    RNCSale.Controller.onSceneChange();
                    MusicBox.Controller.onSceneChange();
                    cc.log(" [System]           complete onSceneChange");
                    cb();
                },
                function (cb) {
                    //씬 전환시 뮤직박스 정보 받기
                    MusicBox.Controller.getMusicBoxModel().requestMBoxMainInfo(function () {
                        // cc.log("MusicBox.Controller.onSceneChange requestMBoxMainInfo");
                        cc.log("[System]        complete musicbox data");
                        cb();
                    });
                },
                function (cb) {
                    RNCSale.Controller.getModel().requestGetAllSaleInfo(function (res) {
                        cc.log("[System]        complete rncSale Data");
                        RNCSale.Controller.getModel().setAllData(res)
                        cb();
                    })
                },
                function (cb) {
                    RockN.Player.getAllEventInfo(function () {
                        cc.log("[System]        complete getAllInfo Data");
                        cb();
                    })
                }
            ], function (err) {
                if (err) {
                    console.log(err);
                }
                cc.eventManager.resumeTarget(cc.director.getRunningScene(), true);
                changeScene();
                cc.log("[System] **** change Scene Process END **** ");
            });

        } else {
            changeScene();
        }
    }

    _swapSceneEnd = function(){
        if( SCENE ) {
            this._currSceneName = sceneList[ SceneManager.getInstance()._currSceneIndex ].name;
            RockN.GameScene     = SCENE;

            if( !!this.CB ) {
                this.CB( SCENE );
            }

            var purgeTarget = sceneList[ SceneManager.getInstance()._fromScene ].purgeTarget;
            purgeTarget && RockN.Util.removeCashedResources( purgeTarget );

            cc.director.runScene( SCENE );

            if( !!RockN.Player ) {
                RockN.Player.locationIndex = sceneList[ SceneManager.getInstance()._currSceneIndex ].game_id;
            }

            RockN.LOADING    = false;
            RockN.initWidth  = cc.winSize.width;
            RockN.initHeight = cc.winSize.height;

            if(RockN.SEND_FIRST_LOADING === false && !!RockN.Player) {
                RockN.NET.request( 'connector.gameHandler.loginLoadingComplete', { playerID : RockN.Player.playerID }, function( res ) {
                    if (res.result !== 0) {
                        cc.error('loginLoadingComplete packet error : ' + res.result);
                        return;
                    }
                    RockN.SEND_FIRST_LOADING = true;
                });
            }
        }
        else {
            cc.error( 'Entry Scene Create fail' );
        }

    },
    SceneManager.getInstance()._swapScene = function( cb ) {
        this._releaseUI();

        var pScene = sceneList[ this._currSceneIndex ].scene();

        SCENE = pScene;
        CB = cb;

        if (SLOT_FILE_LOAD === 1) {
            if (this._currSceneIndex === 0) {
                _swapSceneEnd();
            }
        } else {
            _swapSceneEnd();
        }

        // if( pScene ) {
        //     this._currSceneName = sceneList[ this._currSceneIndex ].name;
        //     RockN.GameScene     = pScene;
        //
        //     if( !!cb ) {
        //         cb( pScene );
        //     }
        //
        //     var purgeTarget = sceneList[ this._fromScene ].purgeTarget;
        //     purgeTarget && RockN.Util.removeCashedResources( purgeTarget );
        //
        //     cc.director.runScene( pScene );
        //
        //     if( !!RockN.Player ) {
        //         RockN.Player.locationIndex = sceneList[ this._currSceneIndex ].game_id;
        //     }
        //
        //     RockN.LOADING    = false;
        //     RockN.initWidth  = cc.winSize.width;
        //     RockN.initHeight = cc.winSize.height;
        //
        //     if(RockN.SEND_FIRST_LOADING === false && !!RockN.Player) {
        //         RockN.NET.request( 'connector.gameHandler.loginLoadingComplete', { playerID : RockN.Player.playerID }, function( res ) {
        //             if (res.result !== 0) {
        //                 cc.error('loginLoadingComplete packet error : ' + res.result);
        //                 return;
        //             }
        //             RockN.SEND_FIRST_LOADING = true;
        //         });
        //     }
        // }
        // else {
        //     cc.error( 'Entry Scene Create fail' );
        // }
    },

    RNCSlotEntry.enterSlot = function (slotID, entryType, cbSuccess, cbFailed) {
        cc.log(RNCSlotEntry.Tag, " *** RNCSlotEntry.enterSlot **** entryType : ", entryType);
        /// 클라 체크 ( slotConfig 체크 )
        /// 1. slotConfig 가 존재
        /// 2. 뮤직박스 슬롯( SOF / ESOF )이 아니어야 함.
        /// 3.오픈슬롯이 아니면 요청 안함.
        var ok = RockN.SlotConfigUtil.getSlotConfig(slotID);
        ok = ok && !RockN.SlotConfigUtil.isMusicBoxSlot(slotID);
        ok = ok && RockN.SlotConfigUtil.isOpenedByID(slotID);
        ok = ok && (RockN.SlotConfigUtil.getGameTitleByID(slotID) !== 'unknown');

        if (!ok) {
            cc.log(RNCSlotEntry.Tag, " *** entry Failed **** : invalid check in Client");
            cbFailed && cbFailed(null);
            return false;
        }

        var route = 'connector.gameHandler.entrySlot';
        var params = {
            playerID: RockN.Player.playerID,
            slotID: slotID,
            category: entryType
        }

        startSubLoading();
        RockN.NET.request(route, params, function (res) {
            stopSubLoading();
            if (res.code === RockN.CODE.OK) {
                RockN.Player.setLastPlaySlotID(slotID);
                RockN.NET.emit('onEntrySlotSuccess2', res, cbSuccess);
            } else {
                RockN.NET.emit('onEntrySlotFailed', res, cbFailed);
            }

        });

        return true;
    };


    RockN.NET.on('onEntrySlotSuccess2', function (msg, callback) {
        cc.log(RNCSlotEntry.Tag, " *** netHandler.onEntrySlotSuccess2 **** ");
        // step1. 뮤직박스 관련 베팅 레인지 세팅
        if (msg.musicBoxInfo && msg.musicBoxInfo.betRanges) {
            MusicBox.Controller.onEnterSlot(msg.musicBoxInfo.betRanges);
        }

        // step2. 콜백
        callback && callback(msg);

        // step3. 씬 전환 ( 슬롯 씬 or 소셜룸 씬 )
        if (!msg.hasOwnProperty('roomInfo')) {  // 일반 슬롯이면
            SceneManager.getInstance().changeSceneByName(msg['gameName'], function () {
                // 2_1. 서버 벨런스
                RockN.Player && RockN.Player.setServerBalance(msg['playerBalance']);

                if (SLOT_LOAD_NUMBER === undefined || SLOT_LOAD_NUMBER === -1) {
                    // 2_2. 프로필 퀘스트 아이콘 생성
                    if (msg['profileQuestInfo']) {
                        RockN.NavigationMenu.createProfileMission(msg['profileQuestInfo']);
                    } else {
                        RockN.NavigationMenu.removeProfileMission();
                    }
                }

                // 2_3 슬롯 핸들 시그널 보냄.
                RockN.handle_signal({
                    protocol: SIG.SIG_SET_SLOT,
                    gameInfo: msg['gameInfo'],
                    syncParams: msg['syncParams'],
                    gameParams: msg['gameParams'],
                    rid: msg.rid
                });
            });
        } else {  // 소셜 슬롯
            var socialRoomSceneName = RockN.SlotConfigUtil.getSocialSlotGameName(msg);
            if (socialRoomSceneName) {
                SceneManager.getInstance().changeSceneByName(socialRoomSceneName, function () {
                    RockN.handle_signal({
                        isSocial: true,
                        protocol: SOCIAL_SIG.ENTRY_ROOM,
                        roomInfo: msg['roomInfo']
                    });
                });
            }

        }
    });

}