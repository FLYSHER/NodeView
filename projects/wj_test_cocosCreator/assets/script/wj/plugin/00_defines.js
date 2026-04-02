/**
 * Created by kks on 2016. 12. 22..
 */

window.SCENE_TYPE = {
	NONE    : -1,
	LOGIN   : 1,
	LOADING : 2,
	LOBBY   : 3,
	SLOT    : 4,
	SOCIAL_ROOM  : 5
};


window.STORAGE_KEY = {
	bINITIALIZED             : 'bInitialized',
	// account
	bIS_GUEST                : 'bIsGuest',
	bINTERLOCK_FACEBOOK      : 'bInterlockFacebook',
	bAPNS_GUIDE_OFF          : 'bAppleNotificationGuidanceOff',
	bALREADY_SHOW_APNS_ALLOW : 'bAppleNotificationPopUp',
	bCLICKED_FACEBOOK_BUTTON : 'bClickedFacebookButton',
	HELLO_EVENT_MISSION : 'bHelloEventMission',
	FIRE_FB_CONVERSION_EVENT : 'bConversionFBEvent',
	FIRE_LOGIN_EVENT : 'bFireLoginEvent',
	bEnableHigherBet : 'bEnableHigherBet',
	LAUNCH : 'bLaunch',

    bCLICKED_FB_UI          : 'bClickFBUI',
    bCLICKED_FB_UI_2        : 'bClickFBUI2',
    bCLICKED_GUEST_UI       : 'bClickGuestUI',
    bCLICKED_GUEST_UI_2     : 'bClickGuestUI2',
    bFB_LOGIN_COMPLETE      : 'bFBLoginComplete',
    bFB_LOGIN_COMPLETE_2    : 'bFBLoginComplete2',

    BEFORE_LOGIN : 'bBeforeLogin',
    SHOW_LOGINUI : 'bShowLoginUI',
    SHOW_LOGINUI_2 : 'bShowLoginUI_2',
	LOGIN_GUEST : 'bLoginGuest',
	LOGIN_FB : 'bLoginFB',
    bGUEST_NEW : 'bGuestNew',
    sUSER_TYPE : 'sUserType',
    FIRE_BEFORE_ENTRY_LOADING_G : 'bFireBeforeEntryLoadingG',
    FIRE_BEFORE_ENTRY_LOADING_F : 'bFireBeforeEntryLoadingF',
    FIRE_AFTER_ENTRY_LOADING_G  : 'bFireAfterEntryLoadingG',
    FIRE_AFTER_ENTRY_LOADING_F  : 'bFireAfterEntryLoadingF',
	FIRE_BEFORE_LOADING_G : 'bFireBeforeLoadingG',
	FIRE_BEFORE_LOADING_F : 'bFireBeforeLoadingF',
	FIRE_AFTER_LOADING_G : 'bFireAFTERLoadingG',
	FIRE_AFTER_LOADING_F : 'bFireAFTERLoadingF',
	GET_EXP : 'bGetExp',

    bFIRST_LOGIN : "bFirstLogin", //NEWLOBBY2-65 게임 재설치시 로그인창이 등장해야합니다.
	RECEIVE_DEEPLINK_REWARD : "bReceiveDeepLinkReward",
    DEEPLINK_PATH : "sDeepLinkPath",

    FIRE_EXP_ZERO_GOTO_LOBBY             : 'b_expZero_gotoLobby',
    FIRE_EXP_ZERO_GOTO_SLOT              : 'b_expZero_gotoSlot',
    FIRE_EXP_ZERO_COMPLETE_LOBBY_LOADING : 'b_expZero_completeLobbyLoading',
    FIRE_EXP_ZERO_BEGIN_LOGIN_SEQUENCE   : 'b_expZero_beginLoginSeq',
    FIRE_EXP_ZERO_FB_MERGE               : 'b_expZero_fbMerge',
    FIRE_EXP_ZERO_FB_MERGE_GUIDE         : 'b_expZero_fbMergeGuide',
    FIRE_EXP_ZERO_WELCOME_GIFT           : 'b_expZero_welcomeGift',
    FIRE_EXP_ZERO_ENCOURAGE_FB_CONNECT   : 'b_expZero_encourageFBConnect',
    FIRE_EXP_ZERO_DAILY_BONUS            : 'b_expZero_dailyBonus',
    FIRE_EXP_ZERO_DAILY_STAMP            : 'b_expZero_dailyStamp',
    FIRE_EXP_ZERO_END_LOGIN_SEQUENCE     : 'b_expZero_endLoginSeq',
    FIRE_EXP_ZERO_LIKE_US                : 'b_expZero_likeUs',
    FIRE_EXP_ZERO_BONUS_CENTER           : 'b_expZero_bonusCenter',

	COMMON_PREFIX_BOOL 					 : 'b_log_',

	LOG_LIMIT_COUNT_PREFIX : "nLogLimitCount_",
};

window.Defines = {
	BINARY_STATUS : {
		LOBBY_TUTORIAL         : 0,
		SLOT_TUTORIAL          : 1,
		ITEM_TUTORIAL          : 2,
		DEFAULT_CARD_TUTORIAL  : 3,
		JESSIE_CARD_TUTORIAL   : 4,
		MYCARD_GUIDE           : 5,
		CREATE_ACCOUNT         : 2,
		RECEIVE_JACKPOT        : 7,
		SHOW_WELCOME_POPUP     : 9,
		GUIDE_SPIN_CLICK       : 10,
		COMPLETE_GO_LOBBY      : 11,
		VIP_APOLOGY_GIFT       : 12,
		RECEIVE_ONE_DAY_REWARD : 13,
		RECEIVE_TWO_DAY_REWARD : 14,
		FIRST_ANNIVERSARY      : 15,
		CLASS_CONVERT          : 16,
		VIP_NEW_FEATURE_POPUP  : 18,
		VIP_WELCOME_POPUP      : 19,
		SHOW_LIKE              : 21,
		IOS_INTERLOCKED        : 4,
		AOS_INTERLOCKED        : 6,
		CLICK_BONUS_CENTER     : 24,
		BROADCAST_OPEN_POPUP   : 25,
		CASHRACE_OPEN_POPUP    : 26,
		RECORD_CLASS_POINT     : 27,
		FIRST_PURCHASE_OFFER   : 28,
        GRANTED_ALL_NEW_MOBILE_REWARD  : 48,
        SET_DEFERRED_DEEP_LINK         : 49,
        FIRST_MERGE_POLICY_GUEST : 53
    }
};

/**
 * getter / setter
 */
window.getStorageItem = function( key ) {
	var val = cc.sys.localStorage.getItem( key );
	if( null !== val ) {
		if( 'b' === key[ 0 ] ) {
			val = ( val === '1' ) || (val === 'true');
		}
		else if( 'n' === key[ 0 ] || 'i' === key[ 0 ] ) {
			val = Number( val );
		}
		else if( 's' === key[ 0 ] ) {
			val = String( val );
		}
	}
	return val;
}

window.setStorageItem = function( key, val ) {
	if( Object.prototype.toString.call( val ) !== '[object String]' ) {
		val = val.toString();
	}
	cc.sys.localStorage.setItem( key, val );
}

window.MAX_INTEGER = 2147483647;