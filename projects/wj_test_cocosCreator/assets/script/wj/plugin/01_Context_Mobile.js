/**
 * Created by neimd on 2014. 7. 16..
 * Edit by James on 2016. 09. 01..
 */

var RockN = RockN || {};

if (typeof window !== 'undefined') {
    window.RockN = RockN;
}

RockN.JSB_UTIL          = null;
RockN.TARGET_OS         = cc.sys.os;
RockN.SCREEN_WIDTH      = cc.winSize.width;
RockN.SCREEN_HEIGHT     = cc.winSize.height;
RockN.CENTER_X          = cc.winSize.width / 2;
RockN.CENTER_Y          = cc.winSize.height / 2;
RockN.GUEST_ID          = "";
RockN.TEST_MODE         = false; // test ? true : false
RockN.SOURCE_VERSION    = "[dev Mode]";
RockN.RESOURCE_VERSION  = "[Local Resource]";
RockN.DEVICE_INFO       = null;
RockN.RATIO_TYPE 		= null;
RockN.GuestPlayer       = false; // default : false
RockN.CheckMerge        = false;
RockN.interlockFacebook = false; // 페이스북 로그인 한적 있는가? ( 바이너리 재설치면 리셋)
RockN.UseDefaultLoading = true;
RockN.FacebookLogout    = false;
RockN.ProcessFacebookLogin = false;
RockN.IsShowingShare = false;
RockN.ProfaneFilter =  null; //new RNCFilter();
RockN.IAPSTATE = {
    NOT_INITIALIZED 	: 0,
    SUCCESS 			: 1,
    FAILURE 			: 2,
	UNLOCK  			: 3,
	LOCK				: 4,
    STORE_PURCHASING 	: 5, //스토어 결제 진행
	SERVER_PURCHASING	: 6  //서버 결제 진행(스토어 결제 이후);

};
RockN.FirstFacebookLogin = false;
RockN.MergedGuest = false;
RockN.AppleLoginID = "";
RockN.GoogleLoginID = "";

RockN.IAPLoadedState    = RockN.IAPSTATE.NOT_INITIALIZED;
RockN.IAPState 			= RockN.IAPSTATE.LOCK;
RockN.LoginButtonClicked = false;
RockN.PurchaseResult     = -10;
RockN.ReceiveMaintenanceEvent = false;
RockN.ReceiveKickEvent = false;
RockN.ReceiveFocusEvent = false;
// -- keyboard
RockN.KEYBOARD_STATUS = {
	LOCK     : false,
	PRIORITY : 10,
	CLICKED  : false
};

RockN.STORAGE                  = RockN.STORAGE || cc.sys.localStorage;
RockN.ENABLE_FB                = true;
RockN.LOADING                  = false;
RockN.IS_SHOWING_CHECK_NETWORK = false;
RockN.IS_CHECKING_NETWORK      = false;
RockN.HOLD_SHOW_CHECK_NETWORK  = false;		//네트웍이 끊겨도 Unstable Network 팝업을 뜨지않게 함
RockN.IS_HIDDEN                = false;
RockN.INITIAL_NETWORK          = ""; // "none", "wifi", "mobile"
RockN.IS_NETWORK_OFF_LINE      = false;
RockN.IS_RATEUS                = true;
RockN.IS_SOURCE_CODE_UPDATE    = false;

RockN.BonusRemainTime          = "";
RockN.StampRemainTime          = "";
RockN.LotteryRemainTime        = "";
RockN.MiniSlotRemainTime       = "";
RockN.RollingTheLuckRemainTime = "";

RockN.POPUP_DELAYTIME  = 10;
RockN.POPUP_ACTION_TAG = 987654;

RockN.Framerate = 60; //cc.game.config[ cc.game.CONFIG_KEY.frameRate ];
RockN.ShowFPS = true; //CONFIG.DEBUG_SLOT;
RockN.PayBack = RockN.PayBack || 'no data..';

RockN.ZORDER                 = {
	BACK         : 0,
	BACK_FRONT   : 3,
	MIDDLE       : 6,
	MIDDLE_FRONT : 9,
	FRONT        : 12,
	NAVI         : 950
};

RockN.GLOBAL_ORDER = {
	BACK_GROUND      : 0,
	BACK_MIDDLE      : 5,
	BG_FX            : 7,
	MIDDLE           : 10,
	MIDDLE_FRONT     : 15,
	GAME_FX          : 18,
	FRONT            : 20,

    VIP_BROAD        : 55,
    GENIE_BROAD      : 56,
    FEED_NODE        : 57,
    RIGHT_MENU_LAYER : 49,



	MOBILE_SLOT_MENU : 60,
	TOTAL_PAY        : 100,
    PUZZLE_EVENT     : 19,

    SLOT_MENU		 : 50,
    VIDEO_SLOT_MENU  : 106,


	JACKPOT_EFFECT   : 200,
	COIN_REWARD      : 555,
    SYSTEM_ICON      : 945,
	NAVIGATION       : 950,
	MAJOR_WIN        : 970,
	TOP_MOST         : 999,

	SUB_MENU         : 1050,
	GAME_MENU		 : 1051,

	POPUP            : 1111,
	POPUP2           : 2222,
	POPUP3           : 3333,


    BALANCE_PANEL    : 10001,
    COINTRAIL        : 10002,
	COIN_TRAIL		 : 10002,
    COIN_ARRIVE      : 10003,

	SYSTEM_MESSAGE	 : 11000
};

RockN.LAYER_TAG = {
	NAVI       : 100,
	GAME       : 101,
	GAME_MENU  : 102,  // todo : slot_menu
	GAME_POPUP : 104,
	GAME_BONUS : 105,
	CASHRACE   : 106,

	SIDE_BAR  : 110,  // side_menu
	SIDE_MENU : 111,  // todo : gameMenu
};

/**
 * SceneType : 로비냐 슬롯이냐
 * @type {{LOBBY: number, SLOT: number}}
 */
RockN.SceneType = {
	NONE :   -1,
	LOADING: 10,
	LOBBY : 100,
	SLOT  : 105
};

/**
 * Orientation : Screen Orientation
 * @type {{LANDSCAPE: landscape, PORTRAIT: portrait}}
 */
RockN.ORIENTATION = {
	LANDSCAPE : "landscape",
	PORTRAIT : "portrait",
	DEFAULT : "landscape"
};

/**
 * Like us ( 펜페이지 관련 )
 */
RockN.SHOW_BOOKMARK_GUIDE_INT = 1000 * 60 * 60 * 24 * 3;
RockN.SHOW_SHORTCUT_GUIDE_INT = 1000 * 60 * 60 * 24 * 3;

RockN.LIKE_US_TIME_INTERVAL = 12600000;			 // 3시간 30분
RockN.LIKE_US_LOBBY_TIME_INTERVAL = 172800000;   // 48 시간

RockN.RATE_US_INITIAL_DAY = 7;		// rate us 쿨타임 초기화 day ( 쿨타임이 7일 이상이 되면 다시 초기화된다. )

// 모바일 뷰 최초 본 이후 시간 관련
RockN.SHOW_MOBILE_VIEW_INT  =  1000 * 60 * 60 * 24 * 7; // 7일

RockN.GameScene              = null;
RockN.Player                 = null;
RockN.NavigationMenu         = null;
RockN.Lobby                  = null;
RockN.VipLounge              = null;
RockN.EncourageFacebookLogin = null;
RockN.ArrayPopupLayer        = [];
RockN.WebView                = null;

RockN.NET = window.pomelo;

RockN.GameData = {};

RockN.GAME_ERROR_CODE = {
    ERR_NONE: 0,
    ERR_NOT_EXIST : -1,
    ERR_INVALID_PARAM: -2,
    ERR_DB_ERROR: -4

};

RockN.CODE = {
	OK    : 200,
	ERROR : 500,
	FAIL  : 600,

	ENTRY : {
		FA_TOKEN_INVALID  : 1001,
		FA_TOKEN_EXPIRE   : 1002,
		FA_USER_NOT_EXIST : 1003
	},

	CHAT : {
		FA_CHANNEL_CREATE    : 3001,
		FA_CHANNEL_NOT_EXIST : 3002,
		FA_UNKNOWN_CONNECTOR : 3003,
		FA_USER_NOT_ONLINE   : 3004
	},

	GATE : {
		FA_NO_SERVER_AVAILABLE : 2001
	},

	SLOT : {
		NOT_ENOUGH_BALANCE : 4001,
		NOT_EXIST_PLAYER   : 4002,
		INVALID_GAME_ID    : 4003,
		LEVEL_LIMIT        : 4004,
		EMPTY_GAME         : 4005,
		DISABLE_SPIN       : 4006,
		YOU_ARE_NOT_VIP	   : 4007,
        YOU_ARE_NOT_MPASS  : 4009, 			// 멤버쉽 패스 유저가 아니다.
		MEMBERSHIP_IN_LEGACY_CANVAS : 4010, 	// 멤버쉽 유저가 레거시 캔버스에서는 진입 불가. ( legacy canvas 에서만 오는 error code )
		UNDER_CONSTRUCTION : 4011,
		CRASH_EVENT_ENDED  : 4013,  //크래시 이벤트 종료
		CRASH_IS_AVAILABLE_IN_NEWLOBBY : 4014, // 크래시 입장 불가 (구로비)
		ALREADY_HAS_OFFER  : 4015,  // 이미 new slot offer 데이터 갖고 있음
		REWORK_MAINTENANCE : 4016,  // 리워크(리뉴얼) 슬롯 점검 중
	},

	START_USER : {
		OK   : 0,
		FAIL : -2
	},

	SHOP: {
		OK: 200,
		ALREADY_DONE: 301,
		ERR_VERIFY_NOT_RESPONSE: 501,
		ERR_VERIFY_RESPONSE_ERROR: 502,
		ERR_VERIFY_FAILED : 503
	}
};

RockN.GiftType = {
	FreeCoin  : 0,
	CardPiece : 5
};

RockN.UnderMaintenanceTime = null;
RockN.UnderMaintenancePeriod = null;    //점검에 걸리는 예상시간 (ms)
RockN.UnderMaintenanceType = null;    //점검 타입 (0: 점검, 1: 무중단배포로인한 구서버 종료)

RockN.BFSLOT             = {};
RockN.BFSLOT.MODE        = {
	DEFAULT : 0,
	MINI    : 1,
	FREE    : 2
};
RockN.BFSLOT.BONUS       = {};
RockN.BFSLOT.BONUS.STATE = {
	IDLE         : 0,
	ENTRY        : 1,
	RENDER_FRAME : 2,
	SPIN         : 3,
	SHOOT        : 4,
	OUTCOME      : 5
};
RockN.SLOT               = {};
RockN.SLOT.STATE         = {
	IDLE             : 0,
	SPIN             : 1,
	SPIN_FINISH      : 2,
	MAJOR_WIN        : 4,
	TOTAL_PAY        : 5,
	TOTAL_PAY_FINISH : 6,
	LINE_PAY         : 10
};
RockN.ITEM               = {};
RockN.ITEM.TYPE          = {
	X4 : 0,
	X3 : 1,
	X2 : 2
};

//브로드캐스트 타입 정의
RockN.BROADCAST_TYPE = {
	MAJOR_WIN: 0,
	ENABLE_BROADCAST: 1,
	JACKPOT: 2,
	CLASS_UP: 3,
	// SOF_JACKPOT: 4,
	// EPIC_SOF_JACKPOT : 5,
    SCRATCH_TRIPLE   : 6
};

// global effect container
RockN.EffectContainer = {
	GRADIENT : []
};

RockN.sceneLoader = null;
/**
 * is property exist
 */
RockN.hasProperty = function( name ) {
	if( RockN.GameScene === null ) {
		return false;
	}

	if( name in RockN.GameScene ) {
		return true;
	}

	return false;
};

RockN.handle_signal = function( sig ) {
	if( !RockN.GameScene ) {
		return;
	}

	if( !RockN.hasProperty( 'handle_signal' ) ) {
        cc.warn( '>> handle signal. GameScene has no handle_signal func. sig is : ', JSON.stringify(sig));
		return;
	}

	/**
	 * todo : server 에서 disconnect 를 받았는데, 다시 연결을 시도하는 경우는 없을 듯...
	 */
    if( sig.protocol === SIG.SIG_DISCONNECT ) {
        // var pLayer = new ReconnectLayer();
        // RockN.GameScene.addChild( pLayer, 9998 );

		if( !g_bHide ) {
            // ShowReconnectLayer();
		}

		// 기존 방식대로 packet 보낸 후 체크하도록 함
		// 그렇지 않으면 net handler 의 io-error 와 로직 겹침
        // reConnect( function( isSucceed ) {
        //     if( true === isSucceed ) {
        //
        //     } else {
        //         ShowReconnectLayer();
        //     }
        // } );
        return;
    }

	if( sig['protocol'] === SIG.SIG_LEAGUE ) {
		if( sig['action'] === SIG.SLOT_SUPER_STAR_ACTION.STATE_UPDATE ) {
			RNC3S.Controller.onUpdateDivisionState();
		}
	}

    if( sig['protocol'] === SIG.SIG_CASHRACE ) {
		// cc.log( RNC3S.Tag, " ### requestMainData ### ( from onCashRace event )");
		RNC3S.Controller.getModel().requestMainData( function(){
			RockN.GlobalEvent.broadcast( EVT.SLOT_SUPER_STAR.UPDATE_RACE_STATE, sig );
		});
    }
    else {
        if( sig['isSocial'] === true ){
            if( RockN.hasProperty( 'isSocialSlot' ) && RockN.GameScene.isSocialSlot() === true )
                RockN.GameScene.handle_signal( sig );
            else
                return;
        }
        else if( !!sig['protocol'] )
			RockN.GameScene.handle_signal( sig );
		else if( RockN.GameScene !== null && cc.isFunction(RockN.GameScene.updateCrashGame) )
			RockN.GameScene.updateCrashGame( sig );
    }


};


// picture list for cash race
RockN.PictureList_40px = {};

// picture list for friend me
RockN.PictureList_50px = {};

RockN.PictureList_55px = {};

RockN.scheduleUpdate = function( target ) {
    if( isValidObject( target ) ) {
		target.scheduleUpdate();
	}
	else {
		cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.scheduleUpdate ] has must target.' );
	}
};

RockN.unscheduleUpdate = function( target ) {
	if( isValidObject( target ) ) {
		target.unscheduleUpdate();
	}
	else {
		cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.unscheduleUpdate ] has must target.' );
	}
};

RockN.schedule = function( target, cb, interval, repeat, delay ) {
    if( isValidObject( target ) ) {
		var len = arguments.length;
		if( 2 === len ) {
			interval = 0;
			repeat   = cc.REPEAT_FOREVER;
			delay    = 0;

			// cc.warn( "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.schedule ] Interval is zero. 0 means tick every frame. If interval = 0, it's recommended to use scheduleUpdate() instead." );
			// cc.warn( "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.schedule ] function : " + cb );
		}
		else if( 3 === len ) {
			repeat = cc.REPEAT_FOREVER;
			delay  = 0;
		}
		else if( 4 === len ) {
			if( "function" === typeof repeat ) {
				// cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.schedule ] repeat is function.' );
				repeat = cc.REPEAT_FOREVER;
			}
			delay = 0;
		}

		if(target.schedule) {
            target.schedule(cb, interval, repeat, delay);//, target.__instanceId );
        }
        else {
            RockNLog("[CHECK] ERROR !!! schedule 없는 target을 등록해 RockN.schedule 사용했다.");
        }
	}
	else {
		cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.schedule ] has must target.' );
	}
};

RockN.unschedule = function( target, cb ) {
    if( isValidObject( target ) ) {
		target.unschedule( cb );
	}
	else {
		cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.unschedule ] has must target.' );
	}
};

RockN.scheduleOnce = function( target, cb, delay ) {
    if( isValidObject( target ) ) {
		RockN.schedule( target, cb, 0, 0, delay );
	}
	else {
		cc.warn( '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ [ RockN.schedule ] has must target.' );
	}
};

RockN.asyncSeries = function ( target, functions, callback ) {
    if( false === Array.isArray( functions ) ) {
        cc.warn( 'functions is not array..');
        return;
    }

    if( typeof target !== 'object' ) {
        cc.warn( 'Please check target type..');
        return;
    }

    cc.async.series(
        functions,
        !!callback && callback,
        target
    );
};

/**
 * 유저 생성 또는 기록 남기기 위해 유저의 user info 가져옴
 */
RockN.getUserInfo = function() {
	if( !window.facebook.me ) {
		return {
            "uid"            : g_JSB().getOpenUDID(),
            "device"         : RockN.DEVICE_INFO.device,
            "device_name"    : RockN.DEVICE_INFO.name,
            "platform"       : RockN.DEVICE_INFO.platform,
            "os_version"     : RockN.DEVICE_INFO.os_version,
            "version"        : RockN.DEVICE_INFO.version,
            "language"       : RockN.DEVICE_INFO.language.split( '_' )[ 0 ],
            "browser"        : 'APP',
            "browserVersion" : '0',

            "birthday"       : null,
            "gender"         : null,
            "name"           : null,
            "firstName"      : null,
            "lastName"       : null,
            "pictureUrl"     : 'toHaveNone',
            "country"        : RockN.DEVICE_INFO.language.split( '_' )[ 1 ]
        };
	} else {
		return {
            "uid"            : g_JSB().getOpenUDID(),
            "device"         : RockN.DEVICE_INFO.device,
            "device_name"    : RockN.DEVICE_INFO.name,
            "platform"       : RockN.DEVICE_INFO.platform,
            "os_version"     : RockN.DEVICE_INFO.os_version,
            "version"        : RockN.DEVICE_INFO.version,
            "language"       : RockN.DEVICE_INFO.language.split( '_' )[ 0 ],
            "browser"        : 'APP',
            "browserVersion" : '0',

            "birthday"       : window.facebook.me.birthday,
            "gender"         : window.facebook.me.gender,
            "name"           : window.facebook.me.name,
            "firstName"      : window.facebook.me.first_name,
            "lastName"       : window.facebook.me.last_name,
            "pictureUrl"     : window.facebook.me.pictureUrl,
            "country"        : RockN.DEVICE_INFO.language.split( '_' )[ 1 ]
        };
	}
};

// rnc.engine.pause = function( target, recursive ) {
// 	target.scheduler.pauseTarget( target );
// 	target.actionManager && target.actionManager.pauseTarget( target );
// 	cc.eventManager.pauseTarget( target, recursive );
// };

// rnc.engine.resume = function( target, recursive ) {
// 	target.scheduler.resumeTarget( target );
// 	target.actionManager && target.actionManager.resumeTarget( target );
// 	cc.eventManager.resumeTarget( target, recursive );
// };

var _update_timer = legacy_cc.Class.extend( {
	ctor : function() {
		this._cb = [];
		this._deleteWaitList = [];
		this._scheduler      = cc.director.getScheduler();
	},

	start : function() {
		// this._scheduler.scheduleUpdateForTarget( this, 0, false );
        this._scheduler.scheduleUpdate(this, 0, false, this.update);
	},

	stop : function() {
		this._scheduler.unscheduleUpdate(this);
	},

	register : function( obj ) {
		this._removeCB(obj.name);
		this._cb.push(obj);
	},

	cancelRegistration : function( name ) {
		this._deleteWaitList.push( name );
	},

	_removeCB : function( name ) {
        for( var i = this._cb.length - 1 ; i >= 0; i-- ) {
			if( this._cb[i].name === name) {
                this._cb.splice(i ,1);
				break;
			}
        }
	},

    update : function( dt ) {
		var delLen =  this._deleteWaitList.length ,i;
		if( delLen ) {
			for (i = delLen - 1; i >= 0; i--) {
				this._removeCB(this._deleteWaitList[i]);
				this._deleteWaitList.pop();
			}
		}
		var len = this._cb.length;
		if(len > 0) {
			for (i = 0; i < len; i++) {
				var locObj = this._cb[i];
				locObj.callback.call(locObj.target, dt);
			}
		}
    }
} );

_update_timer._inst = null;

window.RockNTimer = function() {
	if( null === _update_timer._inst ) {
		_update_timer._inst = new _update_timer();
		_update_timer._inst.start();
	}

	return _update_timer._inst;
};

/**
 * Super Rich Slot Menu Enable..
 * */
RockN.IS_SUPER_RICH_VIEW = true;

RockN.DEFAULT_RESOLUTION = {
	MOBILE_16_10 : cc.size(1084, 610),
	PAD_4_3	   	 : cc.size(960, 640)
};

RockN.RATIO_TYPE = {
	RATIO_4_3 	: 0,	// 1.33
	RATIO_3_2 	: 1,	// 1.5
	RATIO_16_10 : 2,	// 1.6
	RATIO_16_9 	: 3,	// 1.77
	RATIO_18_9 	: 4,	// 2,
//	RATIO_IPHONE_X : 5  // 아이폰 x 는 다르게 처리
};

RockN.RESOLUTION_RATIO = null;

RockN.IS_HIGH_GRAPHICS = true;

RockN.DEVICE_MODEL = null;

//@HyunMyung
//FBInstant Entry Point 종류
RockN.ENTRYPOINT_TYPE = {
	SHORTCUT	: "home_screen_shortcut", // Android Home Screen Shortcut
	FEED		: "feed",                 // Facebook Timeline Feed
	SHARE_LINK	: "shareable_link",       // Share Link ( Chatbot, Fanpage )
	MESSAGE		: "admin_message",        // Friend Message
	WEB_GAMING	: "web_games_hub",        // Web Gaming
	APP_GAMING	: "facebook_gaming_tab",  // Facebook App Gaming Tab
	SEARCH		: "game_search",			  // Search
	BOOKMARK	: "bookmark"              // Bookmark
};
RockN.ENTRYPOINT = null;


RockN.DEVIDE_TYPE = {
    IOS : "iOS",
    AOS : "AOS",
	WIN : "WIN"
};

//앱의 마켓 타입
RockN.MARKET_TYPE = {
	PLAYSTORE : "playstore",			//Google PlayStore
	GALAXYSTORE : "galaxystore",		//Samsung GalaxyStore
	APPSTORE : "appstore",				//Apple AppStore
	AMAZONSTORE : "amazonstore",		//Amazon AppStore (아직은 사용하지않음)
	FBINSTANT : "fbinstant", 			//Facebook Instant
	FBCANVAS : "fbcanvas", 				//Facebook Canvas
	MICROSOFTSTORE : "msstore", 				//Microsoft Store
	UNKNOWN : "unknown"
};
RockN.TARGET_MARKET = RockN.MARKET_TYPE.UNKNOWN;

//마켓 주소
RockN.MARKET_URL = {
	APPSTORE : "http://itunes.apple.com/us/app/rockncashcasinoslotsfreevegasslotmachine/id1143409775",
	PLAYSTORE : "http://play.google.com/store/apps/details?id=net.flysher.rockncash",
	GALAXYSTORE : "http://apps.samsung.com/appquery/appDetail.as?appId=net.flysher.rockncash.galaxy",
	MICROSOFTSTORE : "ms-windows-store://pdp/?productid=9PJC9LWSG9D8", //https://apps.microsoft.com/detail/9PJC9LWSG9D8", //
	MICROSOFTSTORE_MARKETING : "https://engagements.appsflyer.com/v1.0/c2s/click/app/nativepc/9pjc9lwsg9d8?af_media_source=cvs_banner&af_lookback_window=7d&af_campaign=cvs_banner_251218&af_campaign_id=cvs_banner_251218&af_r=https%3A%2F%2Fwww.rockncash.com%2Fmsstore_redirect", //(캔버스) 마케팅 트래킹용
}

//스토어 (마켓)로 이동
RockN.gotoStore = function(){

	if( RockN.TARGET_MARKET === RockN.MARKET_TYPE.APPSTORE ) {
		cc.sys.openURL(RockN.MARKET_URL.APPSTORE);
	}
	else if( RockN.TARGET_MARKET === RockN.MARKET_TYPE.GALAXYSTORE ) {
		cc.sys.openURL(RockN.MARKET_URL.GALAXYSTORE);
	}
	else if( RockN.TARGET_MARKET === RockN.MARKET_TYPE.PLAYSTORE ) {
		cc.sys.openURL(RockN.MARKET_URL.PLAYSTORE);
	}
	else if( RockN.TARGET_MARKET === RockN.MARKET_TYPE.MICROSOFTSTORE ) {
		//cc.sys.openURL(RockN.MARKET_URL.MICROSOFTSTORE);
		RockN.Platform.sendCommandToNative("openurl", {url:RockN.MARKET_URL.MICROSOFTSTORE}, null);
	}
	else {
		cc.log("failed to gotoStore. RockN.TARGET_MARKET is" + RockN.TARGET_MARKET );
	}
}



//앱의 서비스 모드 (테섭인지 라이브인지) "development" 또는 "production" 둘중 하나
RockN.SERVICE_MODE = {
	DEVELOPMENT : "development",	//테섭용
	PRODUCTION : "production",		//라이브용
};

//플랫폼/마켓 구분자 (iOS, AOS, GAOS, AAOS) 서버로그인시 알려줌
RockN.getIDForPlatformAndMarket = function (){
	var platform =  RockN.DEVIDE_TYPE.AOS;
	if (RockN.TARGET_OS === cc.sys.OS_IOS)
	{
		return RockN.DEVIDE_TYPE.IOS;
	}
	else if (RockN.TARGET_OS === cc.sys.OS_ANDROID)
	{
		 if (RockN.TARGET_MARKET === RockN.MARKET_TYPE.GALAXYSTORE)
		{
			return "GAOS";
		}
		else if (RockN.TARGET_MARKET === RockN.MARKET_TYPE.AMAZONSTORE)
		{
			return "AAOS";
		}
		else
		{
			return RockN.DEVIDE_TYPE.AOS;	//"AOS"
		}
	}
	else {
		return RockN.DEVIDE_TYPE.AOS;
	}
};


//[BJ] 성능 테스트
RockN.DebugTimeTest = {
    toFD      : 0,
    toLobby   : 1,
	newUserLoadingTime : 0,
};


RockN.setResolutionRatioByRatio = function(ratio) {
    // var strDeviceInfo = g_JSB().getDeviceInfo().split(',');
	// var strDevice 	  = strDeviceInfo[6];
	// cc.log( "strDevice >>> " , strDevice );
	//strDevice === 'iPhone10_3' || strDevice === 'iPhone10_6' ) {
	// if( g_JSB().isNotchType() ){
	// 	RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_IPHONE_X;
	// 	return;
	// }

	if( ratio >=  2 ) {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_18_9;
	}
	else if( ratio < 2 && ratio >= 1.77 ) {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_16_9;
	}
	else if( ratio < 1.77 && ratio >= 1.6 ) {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_16_10;
	}
	else if( ratio < 1.6 && ratio >= 1.5 ) {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_3_2;
	}
	else if( ratio < 1.5 && ratio >= 1.33 ) {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_4_3;
	}
	else {
		RockN.RESOLUTION_RATIO = RockN.RATIO_TYPE.RATIO_4_3;
	}

	cc.log( " Resolution Aspect Ratio :  ", cc.game.ratio , RockN.RESOLUTION_RATIO );

};

// ( function(){

// 	var frameSize =  cc.director.getOpenGLView().getFrameSize();
// 	var ratio	  =  (frameSize.width / frameSize.height);
// 	var realRatio = (frameSize.width / frameSize.height);
// 	// 1.597 같은 해상도가 aos 에서 나와 그냥 소수점 3째 자리에서 반올림
// 	ratio = Math.round( ratio * 100 ) / 100;
// 	cc.game.ratio = ratio;

// 	RockN.setResolutionRatioByRatio(ratio);
// 	// if( realRatio < 1.75 ) {
// 	// 	cc.view.setDesignResolutionSize(    854,    640,    cc.ResolutionPolicy.FIXED_HEIGHT ); // ResolutionPolicy::FIXED_HEIGHT  );
// 	// }
// 	// else{
// 	// 	cc.view.setDesignResolutionSize(    1136,    610,    cc.ResolutionPolicy.FIXED_HEIGHT  );
// 	// }



// })();
// //해상도 조절
// RockN.AspectRatio = RockN.AspectRatio || {};
//
// RockN.AspectRatio.fixDeviceModel = function () {
//     //아이폰 노치타입 체크
//     if( cc.sys.os === cc.sys.OS_IOS ) {
//         var strDeviceInfo = g_JSB().getDeviceInfo().split(',');
//         var strDevice = strDeviceInfo[6];
//         cc.log("strDevice >>> ", strDevice);
//         if (strDevice === 'iPhone10_3' || strDevice === 'iPhone10_6' ||  //iPhoneX
//             strDevice === 'iPhone11_2' || 								 //iPhone XS
//             strDevice === 'iPhone11_4' || strDevice === 'iPhone11_6' ||  //iPhone XS Max
//             strDevice === 'iPhone11_8' 									 //iPhone XR
//         ) {
//             cc.log("[CHECK] 아이폰노치타입들!");
//             cc.view.setDesignResolutionSize((610 * 1700 / 860), 610, cc.ResolutionPolicy.SHOW_ALL);
//             RockN.SCREEN_WIDTH = cc.winSize.width;
//             RockN.SCREEN_HEIGHT = cc.winSize.height;
//             RockN.CENTER_X = cc.winSize.width / 2;
//             RockN.CENTER_Y = cc.winSize.height / 2;
//         }
//     }
// };
//
// //해상도 변경이 최대한 티나지 않게 하기위해 iosLogin의 ctor의 처음에 실행 하도록 하는게 좋다. (아이폰 노치체크에서는 해상도가 변하는게 아니기때문에 튀는 느낌 없다).
// RockN.AspectRatio.fixDeviceModel();