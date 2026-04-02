import { _decorator, Component, resources, JsonAsset, Sprite, log } from 'cc';
import { ResourceUtil } from './common/ResourceUtil';
import * as cc from 'cc';
import { NATIVE, PREVIEW } from 'cc/env'; // 환경 분기용

const { g_JSB, g_resNewUserSlotLoader_lite, g_resMobileLoginLoading, resMobileLoginLoading } = window as any;
const { ccclass, property } = _decorator;

let NetConnectorParam = {

    clear : function()  {
        this.host = "";
        this.port = 0;
        this.token = "";
        this.gameVersion = "";
        this.playerID = -1;
        this.FBsignedRequest = "";
        this.FBplayerID = "";
    },

    host : "",
    port : 0,
    token : "",
    gameVersion : "",

    playerID : -1,
    FBsignedRequest : "",
    FBplayerID : "",

    iamReadyResponse : null,

    deleteScheduleHour : null,       //계정삭제 대기 남은시간  (계정삭제 대기 중인지 여부 체크)
};


// // 1. 브라우저의 원래 통신 기능(open, send)을 변수에 백업해 둡니다.
// const originalOpen = XMLHttpRequest.prototype.open;
// const originalSend = XMLHttpRequest.prototype.send;

// // 2. 통신 준비(open) 단계를 가로챕니다.
// XMLHttpRequest.prototype.open = function(method: string, url: string) {
//     // 우리가 낚아챌 주소인지 확인해서 XHR 객체에 몰래 표시(flag)해 둡니다.
//     this._isMock = url.includes('gate.gateHandler.checkVersion');
//     //나중에 send에서 꺼내 쓰기 위해 XHR 객체 안에 URL을 임시 저장
//     this._mockUrl = url;
    
//     // 원래 open 함수는 그대로 실행해 줍니다.
//     originalOpen.apply(this, arguments as any);
// };

// // 3. 통신 전송(send) 단계를 가로챕니다! (여기가 핵심)
// XMLHttpRequest.prototype.send = async function(body) {
//     if (this._isMock) {
//         //[1] req 처리 (express.json() 역할)
//         let req : any = {};
//         if (body) {
//             try {
//                 const parsedUrl = new URL(this._mockUrl, 'http://dummy.com');
//                 const reqQueryId = parsedUrl.searchParams.get('id');
//                 req.query = {};
//                 req.query.id = reqQueryId;
//                 req.body = JSON.parse(body as string); 
//             } catch (e) {
//                 console.warn("데이터 파싱 실패");
//             }
//         }

//         let isLocalMode =true;
// 	    let reqid = (req.query!=null && req.query.id != null)?parseInt(req.query.id):1;
//     	let passport = (req.query!=null && req.query.passport!=null && (typeof req.body.passport === 'string'))?req.query.passport:"rockncash";
// 	    let gateHost = req.body && req.body.gatehost!= null && (typeof req.body.gatehost === 'string') ? req.body.gatehost : "";
// 	    let gatePort = req.body?parseInt(req.body.gateport) : 0;
	    
//         const match = gateHost.match(/^.*$/);
// 	    let gateUrl = "https://" + (match&&match[0]?match[0]:"gate.rockncash.com") + ":" + gatePort + "/gate.gateHandler.checkVersion?id="+ reqid+ "&passport=" + passport;


//         const controller = new AbortController();
//         const timeoutId = setTimeout(() => controller.abort(), 6000);
//         try {
//                 const response = await fetch(gateUrl, {
//                     method: 'POST', // .post(gateUrl) 역할
//                     headers: { 'Content-Type': 'application/json' }, // .set(...) 역할
//                     body: req.body, // .send(...) 역할
//                     signal: controller.signal // 타임아웃 연결
//                 });

//                 // 타이머 해제 및 결과 받기 (.end 역할)
//                 clearTimeout(timeoutId);
//                 const resData = await response.json(); 
//                 console.log("서버 응답 완료:", resData);
//                 Object.defineProperty(this, 'readyState', { value: 4, writable: false });
//                 Object.defineProperty(this, 'status', { value: 200, writable: false });
//                 Object.defineProperty(this, 'responseText', { value: JSON.stringify(resData), writable: false });

//                 if (typeof this.onreadystatechange === 'function') {
//                     this.onreadystatechange(new Event('readystatechange'));
//                 }

//             } catch (error) {
//                 console.error(error);
//             }
//     } else {
//         // 낚아챌 주소가 아니면(예: 진짜 이미지 다운로드 등), 원래대로 진짜 통신을 보냅니다.
//         originalSend.apply(this, arguments as any);
//     }
// };

@ccclass('TestWebSocket')
export class TestWebSocket extends Component {

    @property({ type: Sprite, tooltip: "Test", visible : true })
    public _testSprite: Sprite = null; 


    async start() {
        NetConnectorParam.clear();
        NetConnectorParam.gameVersion = CONFIG.VERSION;
        await this.loadProjectJson();
        await this.FBInt();
        await this.FBGetLoginStatus();
        // await this.doNormalConnectProcess();
        await this.initDeviceInfo();

        await this.getMeFromFB_canvas();
        await this.getMyPermissionsFromFB_canvas();
        
        //await this.checkVersion_GateServer();
        
        await this.queryEntry_GateServer(NetConnectorParam);
        await this.initWebSocket(NetConnectorParam);
        await this.entry_GameServer(NetConnectorParam);
        await this.entryLobby_GameServer(NetConnectorParam);
        await this.iAmReady_GameServer(NetConnectorParam);

        await this.loadLoaderResource(NetConnectorParam);
        await this.testSpriteLoad();
    }
    
    async loadProjectJson() {

        try {
            // 1. 환경에 따라 읽어올 JSON 파일 이름 결정 (기존의 if-else 역할)
            let configName = 'project_webbase';
        
            if (NATIVE) {
                configName = 'mobileConfig'; // 앱 환경일 때
            } else if (PREVIEW) {
                log("로컬 테스트 모드입니다.");
            }

            const loadJson = await new Promise((resolve, reject) => {
                // 2. resources 폴더에서 JSON 파일 읽어오기
                resources.load(configName, JsonAsset, (err, jsonAsset) => {
                    if (err) {
                        console.error("설정 파일 로드 실패:", err);
                        reject(err); // 에러 발생 시 catch로 보냄
                        return;
                    }
            
                    // 3. json 내용 파싱 완료! 변수처럼 사용 가능
                    let configData = jsonAsset.json;
                    SERVER_CONFIG = configData;

                    console.log("로드된 설정:", rnc.SERVER_CONFIG);
                    resolve(configData);
                });
            });
        }
        catch (error) {
            console.error("로딩 실패:", error);
        }
    };
    
    async initDeviceInfo(){
        return await new Promise<void>(function (resolve, reject) {
            cc.log(">>>>>>>>>>>>>>> PostInitProcess.initDeviceInfo");

            // resetAllLocalItems();

            // mobile 과의 호환성을 위해
            RockN.DEVICE_INFO = {
                name       : RockN.Platform.getOSName(),
                platform   : RockN.Platform.getPlatform(),	//"IOS" | "ANDROID" | "WEB" | "MOBILE_WEB" 중에 하나
                os_version : "",
                device     : RockN.Platform.getMarketType() === RockN.MARKET_TYPE.MICROSOFTSTORE?"msstore" : browser.name,
                language   : navigator.language,
                version    : browser.version,
                pushChannelUri: null,		//MS STORE 앱에서사용하는 push notification token
            };


            if (RockN.Platform.getMarketType() === RockN.MARKET_TYPE.MICROSOFTSTORE)
            {

                RockN.Platform.sendCommandToNative("app_info", null, function (args){
                    RockN.DEVICE_INFO.version = args.appVersion; //ms store binary version
                    RockN.DEVICE_INFO.udid = args.udid;
                    RockN.DEVICE_INFO.pushChannelUri = args.pushChannelUri;
                    rnc.engine._strBinaryVersion = args.appVersion;
                    rnc.engine._strDeepLink = args.launchUri;
                    RockN.DEVICE_INFO.appsflyerUID = args.appsflyerUID;

                    resolve();
                });
            }
            else{
                resolve();
            }
        });
    };

    async FBInt() {
       return await new Promise<void>((resolve, reject) => {
                try {
                    cc.log(`[CHECK] ID : ${SERVER_CONFIG.FB_ID} VER : ${SERVER_CONFIG.FB_GRAPH_API_VER}`);
                    FB.init({
                        appId                : SERVER_CONFIG.FB_ID,
                        version              : SERVER_CONFIG.FB_GRAPH_API_VER,
                        cookie               : true,
                        // status               : true,
                        xfbml                : true,
                        frictionlessRequests : true
                    });
                }
                catch (error) {
                    console.error("로딩 실패:", error);
                    reject(new Error("Failed to initialize FB SDK."))
                }

               resolve();
        });
    };

    async FBGetLoginStatus() {
       window.facebook =  window.facebook || {
            inGameFriends       : [],
            invitableFriends    : [],
            receiveInGameFriend : false,
            receiveInviteFriend : false,
            me                  : null,
            AppRequest          : {}
        };

        return await new Promise<void>(function (resolve, reject) {
            cc.log(">>>>>>>>>>>>>>> InitProcess.FBGetLoginStatus");
            //타임아웃
            var fbLoginTimer = setTimeout( function(){
                resolve();
            }, 10000 );

            FB.getLoginStatus( function( response ) {
                if( null !== fbLoginTimer ) {
                    clearTimeout( fbLoginTimer );
                    fbLoginTimer = null;
                }

                /**
                 * connected. : The person is logged into Facebook, and has logged into your app.
                 * not_authorized. : The person is logged into Facebook, but has not logged into your app.
                 * unknown. : The person is not logged into Facebook, so you don't know if they've logged into your app. Or FB.logout() was called before and therefore, it cannot connect to Facebook.
                 * authResponse is included if the status is connected and is made up of the following:
                 * accessToken. : Contains an access token for the person using the app.
                 * expiresIn. : Indicates the UNIX time when the token expires and needs to be renewed.
                 * signedRequest. : A signed parameter that contains information about the person using the app.
                 * userID : is the ID of the person using the app.
                 */

                cc.log( '[main] statusChangeCallback: ' + JSON.stringify( response ) );
                window.facebook.status = response.status;
                window.facebook.authResponse = response.authResponse;

        
                resolve();
            } );
       });
    };

    async getMeFromFB_canvas() {

        return await  new Promise<void>(function (resolve, reject) {
            cc.log(">>>>>>>>>>>>>>> NetConnector.getMeFromFB_canvas");
            if (!FacebookWrapper.getInst().isLoggedIn()) {
                return resolve();
            }

            try {
                g_api('/me', HTTP_METHOD.GET, {fields: 'id,name,email,first_name,last_name,picture.width(128).height(128)'}, function (type, response) {
                    if (type === IS_SUCCEED) {
                        window.facebook.me = response;
                        if(!window.facebook.me.pictureUrl && window.facebook.me.picture.data)
                            window.facebook.me.pictureUrl = window.facebook.me.picture.data.url;
                        resolve();
                    } else {
                        //console.log( 'Get me have error : ', response.error_message );
                        cc.error('Get /me error : ' + response!=null?response.error_message:"");
                        resolve();
                    }
                });
            }
            catch(e){

                //[페북장애] 페북 오류로인해 페북에서 내정보를 가져오지 못했을경우 (20211209)
                //실패시 그냥 통과
                resolve();
            }
        }); 
    };

    async getMyPermissionsFromFB_canvas() {

        return await new Promise<void>(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.getMyPermissionsFromFB_canvas");
            if (!FacebookWrapper.getInst().isLoggedIn()) {
                return resolve();
            }

            try {
                g_api('/me/permissions', HTTP_METHOD.GET, function (code, permission_res) {
                    if (code === IS_SUCCEED) {
                        window.facebook.permissions = permission_res;
                        resolve();
                    } else {
                        //console.log( 'Get permissions have error : ', permission_res.error_message );
                        cc.error('Get permissions have error : ' + permission_res!=null?permission_res.error_message:"");
                        resolve();
                    }
                });
            }
            catch(e){

                //[페북장애] 페북 오류로인해 페북에서 내정보를 가져오지 못했을경우 (20211209)
                //실패시 그냥 통과
                resolve();
            }
        });
    };
    
    //지금 cocos3.15쪽 코드 보니 app.post('gate.gateHandler.checkVersion' ..) 으로 연결됨 즉 일단 주석 
    async checkVersion_GateServer() {

        //"gate.gateHandler.checkVersion?id=1&passport=rockncash"
        cc.log(">>>>>>>>>>>>>>> NetConnector.checkVersion_GateServer");
        return new Promise<void>(function (resolve, reject) {

            var checkVersionData = {
                version: CONFIG.VERSION,
                sessionID: RockN.Platform.getSessionID(),
                osName: RockN.Platform.getOSName(),
                platform: RockN.Platform.getPlatform(),
                browserName: browser.name,
                browserVersion: browser.version,
                language: navigator.language,
                assetVersion: RockN.Platform.getAssetVersion(),
                stage: SERVER_CONFIG.STAGE,
                groupID: RockN.Platform.getServerGroupID(),
                gatehost: SERVER_CONFIG.GATE_HOST,
                gateport: SERVER_CONFIG.GATE_PORT,
            };

            var checkVersionRequest = function() {
                cc.log('[net] connecting to gate - checkVersion');
                RockN.NET.webRequest(null, 'gate.gateHandler.checkVersion', checkVersionData, function (msg) {
                    if (msg.code === RockN.CODE.ERROR) {
                        cc.log('[net] failed to connect to the gate - checkVersion code='+msg.code + ' errCode=' + msg.errCode);
                        //네트워크 언스테이블 팝업
                        //createCheckNetwork(checkVersionRequest, CHECK_NET_TYPE.HTTP);
                        reject(new Error("SERVER_ERROR"));    
                    }
                    else if (0 !== msg['result']) {
                        reject(new Error("SERVER_DOWN"));    //=> 서버 점검 팝업이 뜸
                    } else {
                        resolve();
                    }
                });
            };
            checkVersionRequest();

        });
    };


    async queryEntry_GateServer(param) {
        return await new Promise<void>(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.queryEntry_GateServer");
            var locUserInfo = {
                signedRequest : window.facebook.authResponse.signedRequest,
                userID        : window.facebook.authResponse.userID,
            };

            RockN.NET.gateRequest('gate.gateHandler.queryEntry', {
                userInfo: locUserInfo,
                version: CONFIG.VERSION,
                sessionID: RockN.Platform.getSessionID(),
                assetVersion : RockN.Platform.getAssetVersion(),
                stage : SERVER_CONFIG.STAGE,
                groupID : RockN.Platform.getServerGroupID(),
                viewType : "mobile"
                //platform : RockN.Platform.getPlatFormStringForServer(),       //캔버스는 platform울 보내지않는다.
            }, function (msg) {
                cc.log('[net] connected to gate - queryEntry');
                // RockN.NET.disconnect();

                if (msg.code !== 200 /* OK */) {
                    // reason code
                    // 0: 에러 없음
                    // 1: 서버 점검 중
                    // 2: version (= GAME_VERSION) 이 맞지 않음
                    // 3: 사용 가능한 connector 서버가 없음 (점검 팝업)
                    // 4: signedRequest 파싱 에러
                    // 5: signedRequest 데이터 없음
                    // 7: signedRequest 데이터가 유효하지 않거나 userID 가 일치하지 않음
                    cc.log('~~ queryEntry fail reason : ', msg.reason);
                    if (msg.reason === 3)
                    {
                        reject(new Error("SERVER_DOWN"));  //서버 점검 팝업
                    }
                    else{
                        reject(new Error("FAILED GATE LOGIN"));
                    }
                }
                else
                {
                    param.host = msg['host'];
                    param.port = msg['port'];
                    param.token = msg['token'];

                    //FBLogHandler.logSplashLoading("SplashLoading_Gate_Server");
                    resolve();
                }

            });

    });
    };

    async initWebSocket(param) {
        return await new Promise(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.initWebSocket");
            if( param.host === '127.0.0.1' ) {
                param.host = 'localhost';
            }

            // //FUNNEL v3_rnc_before_login
            // if( null === getStorageItem( STORAGE_KEY.BEFORE_LOGIN ) ) {
            //     LogHandler.getInst().sendEvent(LogHandler.EVENT.BEFORE_LOGIN, null, null);
            //     setStorageItem( STORAGE_KEY.BEFORE_LOGIN, true );
            // }

            //NET_SW.resetWithLog("NetConnector.initWebSocket response");
            RockN.NET.init( {
                host : param.host,
                port : param.port,
                log  : true
            }, function( error ) {
                // requestPlayerLog( 'ConnConnect' );
                //NET_SW.resetWithLog("NetConnector.initWebSocket RockN.NET.init response");
                if (error)
                {
                    reject(new Error("RockN.NET.init error"));
                }
                else
                {
                    resolve(param);
                }


            } );
    });
    };

    async entry_GameServer(param){
        return await new Promise(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.entry_GameServer");
            //NET_SW.resetWithLog("NetConnector.entry_GameServer");

            RockN.AdvertisingID = "";
            RockN.AdvertisingAgency = "";
            var entryPointData = "";//RockN.Platform.getDeepLink();

            var name = FacebookWrapper.getInst().getUserName();
            var userInfo = {
                fbplatform     : RockN.Platform.getPlatFormStringForServer(),
                platform       : RockN.Platform.getOSName(),
                language       : navigator.language,
                browser        : browser.name,
                browserVersion : browser.version,
                firstName      : name,
                lastName       : name,
                pictureUrl     : FacebookWrapper.getInst().getPhoto(),
                gender         : "unknown",
            };

            var referral =  document.location.search;

            RockN.NET.request( 'connector.entryHandler.entry', {
                token             : param.token,
                name              : name,//fbinst 수정
                userInfo          : userInfo,
                referral          : referral,
                advertisingID     : RockN.AdvertisingID,
                advertisingAgency : RockN.AdvertisingAgency,
                sessionID         : RockN.Platform.getSessionID(),
                entryPointData    : entryPointData
            }, function( msg ) {
                /*  @terry 인스턴트 삭제
            if( true === msg[ 'isNewUser' ] ) {
                // RockN.Marketing.fireInstallSignal( msg[ 'id' ] );     //fbinst 삭제
            } else if( true === msg['reInstallUser'] && false === RockN.RetargetingAd ) {
                // 임시로 삭제, 2018.06.07
                // 다시 복구, 2018.07.25
                RockN.Marketing.reattributionPixel( msg[ 'id' ], RockN.AdvertisingID );
            }
            */
                if (msg.code === RockN.CODE.OK)
                {
                    param.playerID = msg[ 'id' ];
                    param.deleteScheduleHour = msg['deleteScheduleHour'];
                    //TimeManager.setServerTimeStamp(msg.serverTime);

                    //FUNNEL v3_rnc_login 신규 페북유저
                    // if (msg.isNewUser)
                    // {
                    //     if( null === getStorageItem( STORAGE_KEY.LOGIN_FB ) ) {
                    //         LogHandler.getInst().sendEvent(LogHandler.EVENT.REGISTRATION, null, null);
                    //         setStorageItem( STORAGE_KEY.LOGIN_FB, true );
                    //     }
                    // }

                    // //로그인 로그
                    // var abSegment= param.playerID % 2 === 0 ? 0 : 1;
                    // LogHandler.getInst().sendEvent( LogHandler.EVENT.LOGIN, {
                    //     auth_type:"facebook",
                    //     ab_segment:abSegment
                    // }, null );

                    resolve(param);
                }
                else
                {
                    cc.log( "Connector server Error!!\n" + msg.reason );
                    RockN.NET.disconnect();
                    reject(new Error("error connector.entryHandler.entry resCode="+ msg.code));
                }

            } );
        });
    };

    async entryLobby_GameServer(param)
    {
        const  device_id = g_JSB().getOpenUDID();
        return await new Promise(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.entryLobby_GameServer");

        
            //NET_SW.resetWithLog("NetConnector.entryLobby_GameServer");
            // 사운드 업로드 또는 테스트를 위한 리소스 갱신
            // var versionID = NetConnector._checkParam( 'versionID' );
            // if( versionID ) {
            //     cc.game.config[ 'versionID' ] = versionID;
            // }
            // cc.log( '>>>>>>>>>>>>> versionID ' + cc.game.config[ 'versionID' ] );


            RockN.NET.request( 'connector.gameHandler.entryLobby', {
                    playerID        : param.playerID,
                    pictureUrl      : FacebookWrapper.getInst().getPhoto(),       //fbinst 수정
                    asFacebookUser  : !RockN.GuestPlayer,
                    os             : RockN.Platform.getOS(),
                    //testSlotID    : Number( NetConnector._checkParam( 'testSlotID' ) ),
                    //parsheet      : NetConnector._checkParam( 'parsheet' ),
                    fbplatform      : RockN.Platform.getPlatFormStringForServer(),
                    viewType        : "mobile",      //캔버스 뷰타입 (구캔버스:"web" 신캔버스:"mobile")
                    stage           : SERVER_CONFIG.STAGE,
                    deviceid	    : device_id,

                },
                function( res ) {
                    // requestPlayerLog( 'RequestLobby' );
                    // ga( 'set', '&uid', ( param.playerID + 10000000 ).toString() );
                    // ga( 'set', 'dimension4', ( param.playerID + 10000000 ).toString() );
                    //RockN.NET.emit( 'onEntryLobby', res );

                    //NET_SW.resetWithLog("NetConnector.entryLobby_GameServer Response");

                    if( res.result !== 0 ) {
                        cc.log( 'Entry lobby Error Code : ' + res.result + ' // message : ', res.message );
                        RockN.NET.disconnect();
                        reject( new Error("error connector.gameHandler.entryLobby res.result="+ res.result));
                    }
                    else
                    {
                        //RockN.NET.emit( 'onEntryLobby', res );

                        new Player( res[ 'player' ]);

                        //NET_SW.resetWithLog("NetConnector.entryLobby_GameServer before Resolove");
                        // if(res['loungeBanProducts'] && VipSlotLockLayer) {
                        //     VipSlotLockLayer.LoungeBanProducts = res['loungeBanProducts'];
                        // }

                        resolve(param);
                    }

                } );

        });
    };

    async iAmReady_GameServer(param) {
        return await new Promise(function (resolve, reject) {
            cc.log(">>>>>>>>>>>>>>> NetConnector.iAmReady_GameServer");
            /*
                INSTANT_MOBILE_WEB : 'InstantMobile_CVS',
                INSTANT_WEB : 'InstantCVS',
                INSTANT_GOOGLE : 'InstantAOS',
                INSTANT_APPLE : 'InstantiOS'
            */
            var locPlatform = 'web';

            RockN.NET.request( 'connector.gameHandler.iAmReady', {
                playerID     : param.playerID,
                isMobileUser : cc.sys.isMobile,		//fbinst cc.sys.isMobile -> cc.sys.isNative 수정
                platform     : locPlatform,
                ref : RockN.Platform.getDeepLink()
            }, function( res ) {

                //cc.log("netHandler res : " + JSON.stringify( res ));
                if( res.result !== 0 ) {
                    cc.log( 'iAmReady packet error : ' + res.result );
                    RockN.NET.disconnect();
                    reject(new Error('error connector.gameHandler.iAmReady res.result=' + res.result));
                }
                else
                {
                //     RNCInSlotMeta.SlotLifecycleHandler.init();

                //     // only mobile native app
                    RockN.Player.isNewUserFromBanner = res['newUserEntry'];

                //     RNCBanner.Controller.setBannerData(res['bannerInfo'] );
                //     RNCSlotEntry.Model.init( res );
                //     setShareState();

                    RockN.Player.isNewUserForLoadingImage = (0 !== res[ 'isNewUser' ] )
                    RockN.UseDefaultLoading = !RockN.Player.inVipMode;

                    //New User Exp
                    param.isNewUserExp              = ( res[ 'newUserExp' ]===true);
                    param.sceneDestination          = res[ 'destination' ];
                    param.iamReadyResponse          = res;

                //     //신규유저가 처음 로비 진입했는지 확인하기 위한 처리
                //     if( res['newUserExp'] === true ) {
                //         var hasSeenState = Number( getLocalItem( LOCAL_ITEMS.HAS_SEEN_LOBBY_FOR_NEW_USER) );
                //         if( hasSeenState !== RockN.HasSeenLobbyStateForNewUser.HAS_SEEN_LOBBY ) {
                //             setLocalItem( LOCAL_ITEMS.HAS_SEEN_LOBBY_FOR_NEW_USER, RockN.HasSeenLobbyStateForNewUser.HAS_NOT_SEEN_LOBBY );
                //         }
                //     }

                //     // 신규유저가 슬롯으로 진입하는지 체크
                //     if( res['newUserExp'] === true && !SceneManager.getInstance().isLobbyScene( res[ 'destination' ] ) ) {
                //         SceneManager.getInstance().setSceneForNewUser( true );
                //     }

                //     //BGM 사운드
                //     //게임 처음 진입 시 BGM 볼륨이 큰 문제 수정
                //     SoundControl.getInstance().setMusicVolume( 100 );
                //     if(res[ 'destination' ] === 'mobileLobby' || res[ 'destination' ] === 'lobby'){
                //         SoundControl.getInstance().playMusic(lounge.BGM);
                //     }
                //     else if ( res[ 'destination' ] === 'mobileVipLobby' || res[ 'destination' ] === 'vipLobby'){
                //         SoundControl.getInstance().playMusic(vipLounge.BGM);
                //     }
                //     else if (res[ 'destination' ] === 'forNewUser' )  {
                //         SoundControl.getInstance().playMusic(globalCommon.newUserBGM);
                //     }


                    //FBLogHandler.logSplashLoading("SplashLoading_Game_Server");
                    resolve(param);
                }
            } );

        });
    };
    
    //로딩씬의 리소스 로드
    async loadLoaderResource(param) {
        return await new Promise(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.loadLoaderResource");

            var resLoaderToLoad = null;
            var res = param.iamReadyResponse;
            // if (res) // && SceneManager.getInstance().isSceneForNewUser() )
            // {
            //     resLoaderToLoad = g_resNewUserSlotLoader_lite;
            // }
            // else{
            //     resLoaderToLoad = g_resMobileLoginLoading;
            // }
           
            resLoaderToLoad = g_resMobileLoginLoading;
            
            ResourceUtil.loadResource(resLoaderToLoad,
                function(finished: number, total: number){
                     
                },
                function(err: Error, items){
                    resolve(param);
                }
            );
        });
    };

    async testSpriteLoad() {
        let self : any = this;
        return await new Promise<void>(function (resolve, reject) {
            RockN.Util.loadResource(resMobileLoginLoading.LoadingBackground,null,
                (err, item)=>{
                    if (!err && self._testSprite) {
                        self._testSprite.spriteFrame = item;
                    }
                    resolve();
                }
            );
        });

    }

    //todo //SceneManager 구성 sceneList;
    //res[ 'destination' ] 에 의해 씬이동 가능. sceneList구조 가져와야 함
    //RockN.Player

}

 