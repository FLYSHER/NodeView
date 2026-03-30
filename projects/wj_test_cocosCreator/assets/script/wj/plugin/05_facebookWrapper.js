/**
 * Created by kks on 2016. 10. 31..
 */
window.FacebookWrapper = legacy_cc.Class.extend( {
	ctor : function() {
		this._loginSelector = null;
		this._loginTarget   = null;

		this._onAPICallbacks = {};
		this._onAPIReqID = 0;
		this.REQ_MAX_ID  = 10000;

		this._shareSelector       = null;
		this._shareSelectorTarget = null;

		this._initialized = false;

		this._loginTimeOutCallback = null;
	},

	initFacebookPlugin : function() {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]initFacebookPlugin");
		//sdkbox.PluginFacebook.init();

        this._initialized = true;
	},

	isInitialized : function() {
		return this._initialized;
	},

	_shareSuccess : function( message ) {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]_shareSuccess");

		var depth = RockN.Util.getChildrenTopZOrder( RockN.GameScene ) + 1;
		RockN.GameScene.receiveActionFeedback( 0 , depth );

		/* 2021-07-27 RNC 인스턴트 쉐어시 보상 지급 안함
        var prent = RockN.GameScene.getFeedbackAnimation();
        var coinRewardNode = CoinRewardFactory.createEffect( COIN_TYPE.GOLD, prent.getParent(), prent, true );
        coinRewardNode.setVisible( false );
        RockN.Player.requestCoinReward( coinRewardNode, SIG.COIN_REWARD_ACTION.GET_SHARE_REWARD );
   		*/

        RockN.IsShowingShare = false;
        if( null === this._shareSelector ) {
            return;
        }

        if( null !== this._shareSelectorTarget ) {
            this._shareSelector.call( this._shareSelectorTarget, {
                result   : 0,
                response : message
            } );
        }
        else {
            this._shareSelector( {
                result   : 0,
                response : message
            } );
        }

        this._shareSelector       = null;
        this._shareSelectorTarget = null;
    },

    _shareFailed : function( message ) {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]_shareFailed");

        RockN.IsShowingShare = false;
        if( null === this._shareSelector ) {
            return;
        }

        if( null !== this._shareSelectorTarget ) {
            this._shareSelector.call( this._shareSelectorTarget, {
                result   : 1,
                response : message
            } );
        }
        else {
            this._shareSelector( {
                result   : 1,
                response : message
            } );
        }

        this._shareSelector       = null;
        this._shareSelectorTarget = null;
    },

    _shareCancel : function() {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]_shareCancel");

        RockN.IsShowingShare = false;
        if( null === this._shareSelector ) {
            return;
        }

        if( null !== this._shareSelectorTarget ) {
            this._shareSelector.call( this._shareSelectorTarget, {
                result : -1
            } );
        }
        else {
            this._shareSelector( {
                result : -1
            } );
        }

        this._shareSelector       = null;
        this._shareSelectorTarget = null;
    },

    /**
     *
     * @param listener must object format
     */
	setListener : function( listener ) {
		//sdkbox.PluginFacebook.setListener( listener );
	},

	facebookLoginResponse : function( isLogin, msg ) {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]facebookLoginResponse : " + isLogin);
		RockN.ProcessFacebookLogin = false;
		if( !!this._loginSelector && !!this._loginTarget ) {
			this._loginSelector.call( this._loginTarget, isLogin );
		}
	},

	//내 정보 가져오기(캔버스 플랫폼에서만 사용)
	requestMe : function ( selector, target ){
		//페북 오류발생으로 인해 캔버스에서 email 요청 제거함
		g_api('/me', HTTP_METHOD.GET, {fields: 'id,name,first_name,last_name,picture.width(128).height(128)'}, function (type, response) {
			if (type === IS_SUCCEED) {
				window.facebook.me = response;
				if(!window.facebook.me.pictureUrl && window.facebook.me.picture.data)
					window.facebook.me.pictureUrl = window.facebook.me.picture.data.url;
				if( !!selector && !!target ) {
					selector.call( target, true );
				}
			} else {
				//console.log( 'Get me have error : ', response.error_message );
				cc.error('Get /me error : ' + response!=null?response.error_message:"");
				if( !!selector && !!target ) {
					selector.call( target, false );
				}
			}
		});
	},

	loginOneTime : function ( selector, target ){

		cc.log("[net] try to login to facebook");
		var self = this;
		FB.login(function (response) {

			cc.log("[net] login response: " + JSON.stringify(response));

			if (response.status === 'connected') {
				//console.log( '## Login to app' );
				//console.log( response );
				window.facebook.status = response.status;
				window.facebook.authResponse = response.authResponse;
				//resolve(param);
				if( !!selector && !!target ) {
					selector.call( target, true );
				}
			}
			else {
				if( !!selector && !!target ) {
					selector.call( target, false );
				}

			}
		}, {scope: 'public_profile,email', return_scopes: true});

	},

	loginUntilSuccess : function ( selector, target ){

		this._loginTimeOutCallback && clearTimeout(this._loginTimeOutCallback),this._loginTimeOutCallback =null;
		cc.log("[net] try to login to facebook");
		var self = this;

		FB.login(function (response) {

			cc.log("[net] login response: " + JSON.stringify(response));

			if (response.status === 'connected') {
				//console.log( '## Login to app' );
				//console.log( response );
				window.facebook.status = response.status;
				window.facebook.authResponse = response.authResponse;
				//resolve(param);
				if( !!selector && !!target ) {
					selector.call( target, true );
				}
			} else if (response.status === 'not_authorized') {

				self._loginTimeOutCallback = setTimeout(function () {
					self.loginOneTime(selector, target);
				}, 500);

			} else {
				timeoutCallback = setTimeout(function () {
					self.loginOneTime(selector, target);
				}, 500);
			}
		}, {scope: 'public_profile,email', return_scopes: true});
	},


	login : function( selector, target ) {

		startSubLoading();
		this.loginOneTime( function(result){

			stopSubLoading();
			if (result) {

				this.requestMe(selector, target);
			}
			else{
				if( !!selector && !!target ) {
					selector.call( target, false );
				}
			}

		}, this);

	},


	logout : function() {

		FB.logout(function(response) {

			RockN.Platform.sendCommandToNative("facebook_logout", null);
			SceneManager.getInstance().goToSplashScene();

		})

	},

	isLoggedIn : function() {
		return !!window.facebook && window.facebook.status === 'connected';
		//return true;
	},

	getUserID : function() {

		return window.facebook.me.id;
	},

	getUserName : function (){
		return window.facebook.me.name;
	},

	getPhoto : function (){
		if (window.facebook.me == null || window.facebook.me.picture == null)
			return RockN.Profile.getDefaultProfileUrl();

		var url = window.facebook.me.picture.data.url;
		if (url==null || url.length == 0)		//인스턴트 플랫폼 에서
			return RockN.Profile.getDefaultProfileUrl();
		return url;
	},

	/**
	 *
	 * @param permissions : [ "public_profile", "email" ]
	 * @param cb
	 */
	requestReadPermissions : function( permissions, cb ) {
        cb();
	},

	/**
	 *
	 * @param permission : [ "publish_actions" ]
	 * @param cb
	 */
	requestPublishPermissions : function( permission, cb ) {
		cb();
	},

	requestInvitableFriends : function( map, cb ) {

	},

	getAccessToken : function() {
		return FB.getAccessToken();
	},

	getLimitedLoginToken : function() {
		return "";
	},

	/**
	 * return the version of Facebook SDK
	 * @returns {*|String}
	 */
	getSDKVersion : function() {
		return '';
	},

	/**
	 * check whether can present Facebook App
	 * @param info
	 * @returns {*}
	 */
	canPresentWithFBApp : function( info ) {
        return false;
	},

	/**
	 * Set the Facebook App ID to be used by the FB SDK.
	 * @param appID
	 * @returns {*}
	 */
	setAppId : function( appID ) {
	},

	/**
	 * Set the app url scheme suffix used by the FB SDK.
	 * @param appURLSchemeSuffix
	 * @returns {*}
	 */
	setAppURLSchemeSuffix : function( appURLSchemeSuffix ) {
	},

	/**
	 * share
	 * @param info
	 */
	socialShare : function( info ) {

		var self = this;
		g_api( "/me/feed", HTTP_METHOD.POST, info, function( result, msg ) {
			if( result === IS_SUCCEED ) {
				cc.log( 'Sharing via Graph Api is Success : ', JSON.stringify( msg ) );

				self._shareSuccess.call( self );
			}
			else {
				if (msg.error_message==="User canceled the Dialog flow")
				{
					self._shareCancel.call( self );
				}
				else{
					cc.error( 'Sharing via Graph Api is fail : ', msg.error_message );
					self._shareFailed.call( self );
				}
			}
		} );

    },

	bindingCallBack : function ( callBack, target) {
		this._shareSelector = callBack;
		this._shareSelectorTarget = target;
	},
	
	removeBinding : function () {
		this._shareSelector       = null;
		this._shareSelectorTarget = null;	
	},

	graphAPI : function( endPoint, params, callback, tag, method ) {

	},



	share : function( info, selector, selectorTarget ) {
		// this._shareSelector       = selector;
		// this._shareSelectorTarget = selectorTarget;
		//
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]share");
		// sdkbox.PluginFacebook.setListener( {
        //     onSharedSuccess : this._shareSuccess.bind( this ),
        //     onSharedFailed  : this._shareFailed.bind( this ),
        //     onSharedCancel  : this._shareCancel.bind( this )
		// } );
		// sdkbox.PluginFacebook.share( info );
	},

	/**
	 * open a dialog of Facebook app or WebDialog (dialog with photo only avaible with native Facebook app)
	 * @param info
	 */
	example_dialog : function( info ) {

	},




	/**
	 * Use the default FB dialog to invite friends.
	 * @param app_link_url
	 * @param preview_image_url
	 */
	inviteFriend : function( shareText, imgUrl, fiveClickerSerial , callback) {


	},

	/**
	 * Use the default FB.ui to invitable friends.
	 * @param info
	 * @param callback
	 */
	inviteFriendsWithInviteIds : function( ids, title, message , callback ) {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]inviteFriendsWithInviteIds : ");
		// this.setListener( {
		// 	onInviteFriendsWithInviteIdsResult : callback
		// } );
		// sdkbox.PluginFacebook.inviteFriendsWithInviteIds(
        //     ids,
        //     title,
        //     message );

	},

	/**
	 * fetch friends data from Facebook
	 */
	fetchFriends : function() {
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]fetchFriends");
		// sdkbox.PluginFacebook.fetchFriends();
	},

    /**
	 * requestGift
     */
	requestGift : function(ids, title, msg, objID, callback )
	{
        // g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]requestGift");
        // this.setListener({
        //     onAskGiftResult : callback
        // });
		//
        // sdkbox.PluginFacebook.requestGift(
        // 	ids,
        //     objID,
        //     msg,
        //     title); //additional_data);
	},

    sendGift : function(playerId, shareText, imgUrl, callback ) {


    },

	logEvent : function( eventName, valueToSum ) {
        //g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"[FBWrapper]logEvent");
		//
        // if( cc.isUndefined( valueToSum ) ) {
        //     sdkbox.PluginFacebook.logEvent( eventName );
		// } else {
        // 	// sdkbox 의 페이스북 플러그인에 logEvent 버그 존재 (params 보낼 수 없어서 페이스북 이벤트 적용되지 않음)
        //     sdkbox.PluginFacebook.logEvent( eventName, valueToSum );
		// }
	},

	logPurchase : function( amount ) {

	},


} );

FacebookWrapper._instance = null;

//instance of SoundControl.
FacebookWrapper.getInst = function() {
	if( this._instance === null ) {
		this._instance = new FacebookWrapper();
	}
	return this._instance;
};