var PlatformBridge_canvas = window.PlatformBridgeBase.extend({

    ctor : function() {

    },

    getOS : function (){
        return "WEB";
    },

    getOSName : function (){

        var OSName = "Unknown";
        if (window.navigator.userAgent.indexOf("Windows NT 10.0")!= -1) OSName="Windows 10";
        if (window.navigator.userAgent.indexOf("Windows NT 6.3") != -1) OSName="Windows 8.1";
        if (window.navigator.userAgent.indexOf("Windows NT 6.2") != -1) OSName="Windows 8";
        if (window.navigator.userAgent.indexOf("Windows NT 6.1") != -1) OSName="Windows 7";
        if (window.navigator.userAgent.indexOf("Windows NT 6.0") != -1) OSName="Windows Vista";
        if (window.navigator.userAgent.indexOf("Windows NT 5.1") != -1) OSName="Windows XP";
        if (window.navigator.userAgent.indexOf("Windows NT 5.0") != -1) OSName="Windows 2000";
        if (window.navigator.userAgent.indexOf("Mac")            != -1) OSName="Mac/iOS";
        if (window.navigator.userAgent.indexOf("X11")            != -1) OSName="UNIX";
        if (window.navigator.userAgent.indexOf("Linux")          != -1) OSName="Linux";
        return OSName;
    },

    getMarketType : function (){
        return RockN.MARKET_TYPE.FBCANVAS;
    },

    ////"IOS" | "ANDROID" | "WEB" | "MOBILE_WEB" | "WIN" 중에 하나
    getPlatform : function (){
        return "WEB";
    },


    //서버에서 사용하는 플랫폼 스트링으로 변환
    getPlatFormStringForServer : function (){
        return "canvas";
    },

    //UserFriendly 한 플랫폼 스트링으로 변환
    getPlatFormStringForDisplay : function (){
        return "canvas";
    },

    getDeepLink : function(){
        return document.location.href;
    },

    isCanvas : function (){
        return true;
    },

    isInstant: function (){
        return false;
    },

    //모바일 브라우저인지? PC 브라우저인지?
    isMobileDevice : function (){
        return false;
        //return cc.sys.isMobileDevice;
    },

    //모바일UI 사용 (RNC 구 캔버스만 return false)
    isMobileUI : function (){
        return true;
    },

    //ios 디바이스인가?
    isIOSDevice : function (){
        return false;
    },

    //Android 디바이스 인가?
    isAndroidDevice : function(){
        return false;
    },

    //(테스트 용도로만 사용, 기본은 return false) 모바일 스타일의 뷰로 뷰여줘야하는가? (슬롯뷰, 엔트리 페이지네이션 등)
    isMobileStyleViewTest : function (){
        var valueRes = rnc.engine.getDeepLinkParam("res");
        return (valueRes != null && valueRes.length > 0);
        //return (valueRes === "mobile" || valueRes === "pad" || valueRes === "notch");
    },

    //세일상품을 숨겨야하는 플랫폼인가?
    isHidingSaleProduct : function () {
        return false;
    },

    //핀투탑 pinToTop (북마크) 를 타고 들어왔는가?
    isFromBookMark : function () {
        return ( RockN.ENTRYPOINT === RockN.ENTRYPOINT_TYPE.BOOKMARK );
    },

    //단축아이콘을 타고 들어왔는가?
    isFromShortcut : function () {
        return false;
    },

    //게임 종료 ( 종료가 될 수 없는 플랫폼은 재시작 처리)
    quitGame : function(){
        this.restartGame();
    },

    //게임 재시작 (플랫폼에 가능한 방법에 따라 처리)
    restartGame : function(){

        //SceneManager.getInstance().goToSplashScene();
        //top.location.href = "https://apps.facebook.com/rockncash";
        var serviceurl = "https://apps.facebook.com/rockncash";
        if (cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0) {
            serviceurl += "dev";
        }
        top.location.href = serviceurl;

    },

    //게임영역에 포커스를 둔다 (캔버스only)
    setFocusGame : function (){

        var gameCanvas = document.querySelector('#gameCanvas');
        if (gameCanvas != null)
        {
            gameCanvas.focus();
        }

        if (typeof FB != "undefined" )
            FB.Canvas.scrollTo( 0, FB_CANVAS_TOP_SCROLL_AMOUNT );
    },


    //구 캔버스로 이동 (구캔버스 서비스 종료 전까지만 사용)
    /*returnToOldLobby : function (){
        try {

            if (top.location.host.indexOf("facebook.com") < 0 )
            {
                var  baseUrl;
                var port = top.location.port;
                if (port.length > 0)
                {
                    baseUrl = top.location.protocol + "//" +top.location.host;
                }
                else{
                    baseUrl = top.location.protocol + "//" +top.location.host + ":" + port;
                }
                top.location.href = baseUrl + "/legacy";
                return;
            }
        }
        catch (e)
        {
            cc.log("exception at getting top.location");
        }

        var serviceurl = "https://apps.facebook.com/rockncash";
        if( cc.game.config[cc.game.CONFIG_KEY.debugMode] > 0 ) {
            serviceurl += "dev";
        }
        top.location.href = serviceurl;

    }*/

    //게스트 계정이 있는 플랫폼인가?
    isGuestBasedPlatform : function (){
        return false;
    }

});


RockN.Platform = new PlatformBridge_canvas();
