window.PlatformBridgeBase = legacy_cc.Class.extend({

    getOSName: function (){
        return "unknown";
    },

    getAssetVersion : function (){
        return SERVER_CONFIG.ASSET_VERSION;
    },

    getServerGroupID : function (){
        return rnc.engine.getDeepLinkParam("GROUP_ID");
    },

    getAppVersion : function (){
        return this.getAssetVersion();
    },

    getMarketType : function (){

        return RockN.TARGET_MARKET;
    },

    //"IOS" | "ANDROID" | "WEB" | "MOBILE_WEB"
    getPlatform : function (){
        return "unknown";
    },
    getPlatFormStringForServer : function (){
        return "unknown";
    },
    getPlatFormStringForDisplay : function (){
        return "unknown";
    },

    //서버에 os값을 넘길때 사용하는 값
    // 모바일 안드로이드 : AOS
    // 모바일 iOS : iOS
    // FB캔버스 : WEB
    // MS스토어 : WIN
    // INSTANT_MOBILE_WEB : InstantMobile_CVS
    // INSTANT_WEB : InstantCVS
    // INSTANT_GOOGLE : InstantAOS
    // INSTANT_APPLE : InstantiOS
    getOS : function (){
        return "unknown";
    },

    //세션 유니크 아이디 (GUID)
    getSessionID: function (){
        if (this._sessionId == null)
        {
            var guid = function(){var x=(new Date).getTime(),r=performance&&performance.now&&1e3*performance.now()||0;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=16*Math.random();return x>0?(n=(x+n)%16|0,x=Math.floor(x/16)):(n=(r+n)%16|0,r=Math.floor(r/16)),("x"===e?n:3&n|8).toString(16)})}
            this._sessionId = guid();
        }
        return this._sessionId;
    },

    //세션종료
    resetSession : function (){
        this._sessionId = null;
    },

    getDeepLink : function(){
        return "";
    },

    getUnifiedDeepLink : function(){
        return null;
    },

    /** @deprecated Use isLegacyCanvas() instead */
    isCanvas: function (){
        return false;
    },

    //페이스북 캔버스 플랫폼 앱인 경우 return true;
    isLegacyCanvas: function (){
        return false;
    },

    //인스턴트 플랫폼인 경우 return true;
    isInstant: function (){
        return false;
    },

    isWebEngine : function (){
        return !cc.sys.isNative;
    },

    //iOS, Android 플랫폼인 경우 return true;
    isNativeApp : function () {
        return cc.sys.isNative;
    },

    //브라우저라면.. 모바일 브라우저인지? PC 브라우저인지?
    //ios, android app은 return true, 인스턴트인경우는 모바일/PC 구분, 캔버스는 return false;
    isMobileDevice : function (){
        return cc.sys.isMobile;
    },

    //모바일 UI인가? (캔버스를 제외하고 return true)
    isMobileUI : function (){
        return cc.sys.isMobile;
    },

    //ios 디바이스인가?
    isIOSDevice : function (){
        return false;
    },

    //Android 디바이스 인가?
    isAndroidDevice : function(){
        return false;
    },

    //(테스트 용도로만 사용, 기본은 return false) 모바일 스타일의 뷰로 뷰여줘야하는가? (슬롯뷰AttrType, 엔트리 페이지네이션 등)
    isMobileStyleViewTest : function (){
        return false;
    },

    //세일상품을 숨겨야하는 플랫폼인가?
    isHidingSaleProduct : function () {
        return false;
    },

    //핀투탑 pinToTop (북마크) 를 타고 들어왔는가?
    isFromBookMark : function () {
        return false;
    },

    //단축아이콘을 타고 들어왔는가?
    isFromShortcut : function () {
        return false;
    },

    //게임 종료 ( 종료가 될 수 없는 플랫폼은 재시작 처리)
    quitGame : function(){

    },

    //게임 재시작 (플랫폼에 가능한 방법에 따라 처리)
    restartGame : function(){

    },

    //게임영역에 포커스를 둔다 (캔버스only)
    setFocusGame : function (){

    },

    //팬페이지 이동
    openFanPage : function(){
        if (SERVER_CONFIG.FB_FANPAGE_URL != null)
        {
            cc.sys.openURL( SERVER_CONFIG.FB_FANPAGE_URL );
        }
        else{
            cc.sys.openURL( 'https://www.facebook.com/rockncashcasino/');
        }
    },


    sendCommandToNative : function (command, param) {
    },

    //게스트 계정이 있는 플랫폼인가?
    isGuestBasedPlatform : function (){
        return false;
    }
});
