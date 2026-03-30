/**
 * Created by James on 2017. 6. 20..
 */

/**
 * JSB_UTIL.cpp Wrapper..
 */
window.jsb_util = legacy_cc.Class.extend( {
    _jsbInstance : null,

    initJSB : function() {
    },

    message_box : function( arg0, arg1 ) {
        cc.warn("[MessageBox] : " + arg0 + " : " + arg1);
    },

    getOpenUDID : function() {
        if (RockN.DEVICE_INFO.udid != null)
            return RockN.DEVICE_INFO.udid;

        if (RockN.Platform.isInstant())
            return "instant_game_udid";

        return "";
    },

    getDeviceInfo : function() {
        return "";
    },

    getDeviceModel : function() {

        return "instant device model";
    },

    getNetworkStatus : function() {
        return window.navigator.onLine;
    },

    getNetworkType : function() {
        return "unknown";
    },

    getDeviceMemoryInfo : function() {
        return "";
    },

    FBGame_Response : function() {

    },

    isCheckInvalid : function( targetObject ) {
        return false;
    },

    // 바이너리 버전 1.40.1 이상부터 사용가능
    //마켓 가져오기 ( "playstore", "galaxystore", "appstore", "unknown" 중 하나 )
    getTargetMarket : function(){
        return RockN.MARKET_TYPE.FBINSTANT;
    },

    // 바이너리 버전 1.40.1 이상부터 사용가능
    //서비스 모드 가져오기 (테섭인지 라이브인지) "development" 또는 "production" 둘중 하나 스트링 반환
    getServiceMode : function (){
        if (cc.game.config[ "developmentMode" ] === false)
            return "production";
        else
            return "development";
    },

    //get FB GamingPayload payload
    getFBGamingPayload : function(){
        return "";
    },

    //get FB GamingPayload GamingRequestID
    getFBGamingRequestID : function (){
       return "";
    },
    /**
     * ----------------------------------------------------------------------------------------------------------------*/

    /**
     * Call Method..
     * */
    clipBoard_Copy : function( textToCopy , callback) {

        navigator.clipboard.writeText(textToCopy)
            .then(function(){
                callback(true);
            })
            .catch(function(err){
                callback(false);
            });
    },

    FBGameRequest_SendGift : function( msg, title, objID, ids, callback ) {
    },

    FBGameRequest_inviteFriendByDialog : function( msg, title, callback ) {
    },


    /**
     * AOS AermissionCheck;
     *
     *  var permission = "android.permission.WRITE_EXTERNAL_STORAGE";
     *	if(g_JSB().AOS_isPermission(permission)  === false)
     *	{
     * 		//result : -1 :PERMISSION_DENIED ,  0 : PERMISSION_GRANTED
     *		g_JSB().AOS_requestPermission(permission, function (requestCode, result) {
     *     		cc.log("[CHECK]", permission," requestCode : ",requestCode," result : ",result)
     *		});
     *	}
     * */
    AOS_isPermission : function (strPermission) {
        return true;
    },

    AOS_requestPermission : function (strPermission,callback) {
        if(callback)	callback(0,0);
    },

    /**
     * ----------------------------------------------------------------------------------------------------------------*/

    /**
     * iOS Only..
     * */
    updateAppStore : function( ) {
    },
    /**
     * ----------------------------------------------------------------------------------------------------------------*/

    /**
     * Android Only..
     * */
    callGameExit : function( ) {
    },

    callRateUsView : function( ) {
    },

    getGameFocus : function() {
    },

    resetGameFocus : function() {
    },
    /**
     * ----------------------------------------------------------------------------------------------------------------*/

    /**
     * AppsFlyer..
     * */

    getAppsFlyerUID : function() {
        //MS STORE에서 사용
        if (RockN.DEVICE_INFO.appsflyerUID != null)
            return RockN.DEVICE_INFO.appsflyerUID;
        return "";
    },

    setCustomerUserId : function(eventValue) {

        //MS STORE에서 사용
        RockN.Platform.sendCommandToNative("appsflyer.setCustomerUserId", {
            customerUserId: eventValue
        });
    },

    sendTrackEvent : function(eventName, eventValue) {

        //MS STORE에서 사용
        RockN.Platform.sendCommandToNative("appsflyer.logevent", {
            eventName: eventName,
            eventValues: eventValue!=null?JSON.stringify(eventValue):null,
            customEventValues: null
        });
    },

    sendFirebaseEvent : function(eventName, eventValue) {
    },

    getDeepLink : function() {
        return "";
    },

    getDeferredDeepLink : function() {
        return "{}";
    },

    // KKS - todo : 바이너리 배포 시 같이 배포
    getIDFATrackingEnable : function() {
        return false;
    },

    getIDFA : function() {
        return "";
    },

    /**
     * ----------------------------------------------------------------------------------------------------------------*/
    iapSetListener: function(listener){
    },

    iapRemoveListener: function(){
    },

    iapInit: function(items,key, productsStringDef){
    },

    iapPurchase : function(productId){
    },

    iapRestore : function(){
    },

    iapRefresh : function(){
    },

    /**
     * ----------------------------------------------------------------------------------------------------------------*/
    iapGetUntreatedTransactionCount: function(){
    },

    iapGetUntreatedTransactionInfo: function(index){
    },

    iapGetUntreatedTransactionInfoByID :function(ID){
    },

    iapFinishTransaction: function(transactionID){
    },

    iapFinishTransactionByProductName: function(productName){
    },

    iapAllFinishTransaction: function(){
    },

    iapSetAutoFinishTransaction : function(enable){
    },

    iapIsAutoFinishTransaction : function(){
    },

    iapEnableUserSideVerification : function(enable){
    },

    iapIsUserSideVerificationEnabled : function(){
    },

    iapEnableDebugLogging : function(enable) {
    },

    //region [ SKAdNetwork ]
    registerAdNetworkAttribution : function() {
    },

    updateAdNetworkConversionValue : function( conversionValue ) {
    },

    //endregion

    //region [ Braze( Appboy ) ]

    enableBrazeSDK : function () {
    },

    disableBrazeSDK : function () {
    },

    /**
     * Braze set external_user_id
     * @param external_user_id ( string )
     */
    changeUser : function ( external_user_id ) {
    },

    requestIOSPushNotificationGrant : function ( ) {
    },

    /**
     *
     * @param alias
     * @param alias_label
     */
    addAlias : function ( alias, alias_label )  {
    },

    /**
     * @param eventName
     * @param properties JSON Format String
     */
    logCustomEvent : function ( eventName, properties ) {
    },

    logCustomAttributeWithBoolean : function ( attributeName, value) {
    },

    logCustomAttributeWithInteger : function ( attributeName, value) {
    },

    logCustomAttributeWithDouble : function ( attributeName, value) {
    },

    logCustomAttributeWithString : function ( attributeName, value) {
    },

    logCustomAttributeWithDate : function ( attributeName, value) {
    },

    /**
     *
     * @param productID string  ex)
     * @param currency  string  ex) "USD"
     * @param price     string  ex) "0.99"
     */
    logPurchase : function ( productID, currency, price, properties ) {
    },

    // @BJ 20190905 로컬 노티피케이션을 통한 스케쥴링은 ios 는 되고 aos 는 아직 구현을 못함.
    // aos 같은 경우 즉시 로컬 노티는 가능한데, 스케쥴링 하려면 alarm manager 를 통해 앱을 깨우고
    // 거기서 받아야 하는 상황인데 추후 버전별 os 별 대응 이슈로 일단 보류
    // fireLocalPush : function ( title, body, fireTime ) {
    //     cc.log("병주 >> 로컬 푸시");
    //     this._jsbInstance.fireLocalPush( title, body, fireTime );
    // },

    /**
     *
     * @param listener
     */
    registerBrazePushListener : function( listener ) {
    },

    // onReceivePushNotification

    //endregion

    /**
     * [AppLovin]---------------------------------------------------------------------------------------------------------------*/
    //region [AppLovin Method]
    appLovinIsGDPRUser : function (){
        return false;
    },
    appLovinSetListener : function(listener){
    },
    appLovinRemoveListener : function(){
    },
    appLovinShowRewardVideo : function(placementId){
    },

    appLovinIsRewardVideoReady : function(){
        return false;
    },

    appLovinLoadRewardVideo : function(){
    },

    setHasUserConsent : function(flag){
    },

    setIsAgeRestrictedUser : function(flag){
    },

    setDoNotSell : function(flag){
    },

    showMediationDebugger : function(){
    },
    //endregion



    /**  Android Only
     * [GalaxyStore IAP]   ---------------------------------------------------------------------------------------------------------------*/
    //region [GalaxyStore IAP Method]
    galaxyIAPSetOperationMode : function(operationMode){
    },
    galaxyIAPPurchase : function(itemId, passThroughParam, bShowSuccessDialog ){
    },
    //purchaseIds : one or more unique identifier values (comma delimited) of the purchase and payment transactions of consumable in-app items that are to be reported as consumed
    galaxyIAPConsume : function(purchaseIds){
    },
    galaxyIAPRestore : function(productType){
    },
    galaxyIAPSetListener : function(listener){
    },
    galaxyIAPRemoveListener : function(){
    },
    //endregion


    //region [OneSignal Method]
    /**
     * [OneSignal]---------------------------------------------------------------------------------------------------------------*/
    //region [OneSignal Method]
    oneSignalSetListener : function(listener){
    },

    oneSignalRemoveListener: function(){
    },
    //onesignal초기화 2번째인자는 AOS 구글앱 Number, IOS는 초기 알림 확인 창 Auto출력
    //AppID는 google쪽만 사용능함
    oneSignalInit : function(arg, privacy, appID){
    },

    oneSignalIdsAvailable : function(){
    },

    oneSignalSetSubscription : function(enable){
    },

    oneSignalEnableVibrate : function(enable){
    },

    oneSignalEnableSound : function(enable){
    },

    oneSignalEnableInAppAlertNotification : function(enable){
    },
    oneSignalEnableInAppNotification: function(enable){
    },
    oneSignalSendTag: function(key, tag){
    },

    oneSignalSendTags: function(jsonString){
    },

    oneSignalGetTags: function(){
    },
    oneSignalDeleteTag: function(key){
    },

    oneSignalDeleteTags : function(jsonStr){
    },

    oneSignalPostNotification: function(jsonString){
    },
    oneSignalSetLogLevel: function(level){
    },

    oneSignalPromptForPushNotifications: function(){
    },

    oneSignalProvideConsent :function(enable){
    },

    //endregion////////////

    /**
     * [Crashlytics]---------------------------------------------------------------------------------------------------------------
     * */
    //region [Crashlytics Method]
    crashlyticsSetUserID : function( id ){
    },

    crashlyticsSetUserName : function( userName ){
    },

    crashlyticsSetUserEmail : function( email ) {
    },

    /**
     * proiority : AOS      VERBOSE = 2; , DEBUG = 3;, INFO = 4; ,WARN = 5; , ERROR = 6; ,ASSERT = 7;
     *           : IOS      X
     */

    crashlyticsLog : function( priorityOrMsg, tag, msg){
    },

    crashlyticsSetBool : function( key, value ){
    },

    crashlyticsSetFloat : function( key, value ){
    },

    crashlyticsSetInt : function( key, value ){
    },

    crashlyticsSetString : function( key, value ){
    },

    crashlyticsTestCrash : function(){
    },
    //endregion

    isNotification : function(){
        return true;
    },

    isNotchType : function(){
        return rnc.engine.getDeepLinkParam("res") === "notch";
    },

    getNotchSize : function ()   {
        if(this.isNotchType()) {
            return 47;
        }
        return 0;
    },

    getOrientation : function(){
        return false;
    },

    appRestart : function(){
        window.location.reload();
    },

    //JSON.parse( g_JSB().getDiskMemorySize );
    getDiskMemorySize : function(){
        return "{}";
    },

    getAOSCutoutRects : function(){
        return "{}";
    },

    //UserDefault::getInstance()->getStringForKey
    getUserDefaultStringForKey : function(_key){
        return "";
    },

    //serDefault::getInstance()->setStringForKey
    setUserDefaultStringForKey : function(_key, _value){
    },

    /**
     * app share view
     */
    showShareView : function( title, text ) {
    },

    /**
     * AOS 패턴 진동  (AOS Only) (대기시간,진동시간,대기시간,진동시간,.... 의 수치(밀리세컨드)로 설정)
     */
    vibratePattern : function (pattern){
    },

    /**
     * AOS 패턴 진동  (AOS Oreo+ Only)
     * pattern   : 진동시간1,진동시간2,진동시간3,진동시간4,.... 의 수치(밀리세컨드)로 설정
     * amplitude : 진동시간1의 강도,진동시간2의 강도,진동시간3의 강도,진동시간4의 강도,.... 의 수치(0~255의 값)로 설정
     * fallbackPattern : (optional) 안드로이드 오레오 보다 하위 OS인경우 fallbackPattern으로 패턴 진동 동작한다. (대기시간,진동시간,대기시간,진동시간,.... 의 수치(밀리세컨드)로 설정)
     */
    vibrateAmplitude : function (pattern, amplitude, fallbackPattern){
    },

    /**
     * Release JSB JSBinding..
     */
    releaseJSB : function() {
        //MobileLoginCenter.getInst().release();
    },



    setupDefaultTextureFormat : function() {
    },

    isMethod :function (strName) {
        return false;
    },


    //인스턴트 안드로이드 전용
    createInstantShortCut : function (){
        if( RockN.Platform.isInstant() ) {
            //유저가 숏컷으로 마지막으로 진입한 시점부터 7일이 지났을 경우
            //로그인 시점에 동의 팝업 등장
            //총 5회까지 등장 하며, 횟수는 누적하여 카운트 됨
            //유저가 숏컷을 통하여 진입하였을 경우 카운트 초기화

            var SHOW_CREATE_SHORTCUT_DATE_INT = 1000 * 60 * 60 * 24 * 7;
            var SHOW_CREATE_SHORTCUT_LOGIN_COUNT_INT = 5;

            var dateNow = Date.now();
            var loginCount = Number(getLocalItem(LOCAL_ITEMS.SHORTCUT_LOGIN_COUNT)) + 1;
            var prevDate = Number(getLocalItem(LOCAL_ITEMS.SHOW_CREATE_SHORTCUT));

            if (RockN.ENTRYPOINT === RockN.ENTRYPOINT_TYPE.SHORTCUT) {
                setLocalItem(LOCAL_ITEMS.SHOW_CREATE_SHORTCUT, String(dateNow));
                loginCount = 0;
            } else {
                if (dateNow - prevDate > SHOW_CREATE_SHORTCUT_DATE_INT) {
                    if (loginCount >= SHOW_CREATE_SHORTCUT_LOGIN_COUNT_INT) {
                        loginCount = 0;

                        //실제 숏컷생성 API 호출
                        FBInstant.canCreateShortcutAsync().then(function(canCreateShortcut) {
                            if (canCreateShortcut) {
                                // var dateNow = Date.now();
                                // setLocalItem( LOCAL_ITEMS.SHOW_CREATE_SHORTCUT, String( dateNow ) );
                                setLocalItem(LOCAL_ITEMS.SHOW_CREATE_SHORTCUT, String(dateNow));
                                FBInstant.createShortcutAsync().then(function() {
                                    // Shortcut created
                                    RockN.Util.printDebugMessage( "바로가기를 생성했습니다.", 5 );
                                })
                                .catch(function() {
                                    // Shortcut not created
                                    RockN.Util.printDebugMessage( "바로가기 생성에 실패했습니다.", 5 );
                                });
                            }
                            else {
                                RockN.Util.printDebugMessage( "바로가기를 생성할 수 없습니다.", 5 );
                            }
                        });
                    }
                }
            }
            setLocalItem(LOCAL_ITEMS.SHORTCUT_LOGIN_COUNT, String(loginCount));
        }
    }
} );

jsb_util._inst = null;

window.g_JSB = function() {
    if( null === jsb_util._inst ) {
        jsb_util._inst = new jsb_util();
        jsb_util._inst.initJSB();
    }
    return jsb_util._inst;
};