/**
 * Created by neimd on 2014. 7. 28..
 */
var PLAYER_UPDATE = 'PlayerUpdate';
var CHECK_NETWORK = 'CheckNetWork';
var VIBRATE_TIMER = 'VibrateTimer';

var g_shareStateLevel = 20;

var SLOT_IDLE_CALLBACK_ORDER = {
	CLASS_UP            : 0,
	GET_CUBE_TUTORIAL   : 1,
}

RockN.BalanceTag = "[meta][Balance] \uD83D\uDCB0\uD83D\uDCB0\uD83D\uDCB0 ";

window.Player = legacy_cc.Class.extend( {
    _lastPlaySlotID : -1,
	ctor : function( conf, cb ) {
    	if( RockN.Player )
            RockN.Player.releaseNodes();
		RockN.Player = this;
		this.COIN_REWARD = {
			SHARE      : 0,
			SLOT       : 5,
			LOBBY_BTN  : 6,
			LOBBY      : 7,
			LOBBY_LAST : 8,
			BROAD_CAST : 9,
		};

		//! default data
		this.playerID       = -1;
		this.fbID           = -1;
		this.name           = "";
		this.level          = -1;
		this.grade          = -1;
		this._balance       = -1;
		this.totalExp       = -1;
		this.prevLevelExp   = -1;
		this.nextLevelExp   = -1;
		this.lastLoginTime  = -1;
		this.isNewUserForLoadingImage      = false;

        //this.newUserEntryIndex = NEW_USER_ABTEST.NONE;

		//! user class data
		this.classData         = null;

		//! social data
		this.dailyInvitedFriends     = [];
		this.dailyReceiveGiftFriends = [];
		this.tsRemainTime 			 = new RockN.TimeStamp();
		this.invite_reward_step      = 0;

		this.timeOffset = 0;// Time difference between server and client (seconds) -> 10초에 한 번 보정

		this.registeTimer();

		this.initialized = false;

		//! Purchase
		this.recentPurchase = 0;
		this.totalPurchase  = 0;

		this.enableSlotPlayReward = false;

        /** R Stone **/
        this._localRStone   = -1;
        this._serverRStone  = 0;

        this._isBroadCastEnable = false;
		this._isCashraceEnable  = false;

		this.vipWheelBoundaryBet = 10000000;
		this.serverBalance       = 0;

		/**
		 * Shop Bonus
		 */
		this.shopBonusReceiveCount 		= -1;
		this.shopBonusRemainTime        = 0;
		this.shopBonusNextStampTime     = 0;
		this.shopBonusCurrentClientTime = 0;

		// 2016-11-03 [whee] collectable reward - level up popup balance sync issue 해결을 위한 변수
		this.remainPopupRewards = {};
		this.blackList          = false;

		this.getExp = getStorageItem( STORAGE_KEY.GET_EXP );

        this._vibrateTime = 0;
		this._vibrateCount = 0;

        this.firstPurchaseMinLevel = -1;
        this.flashDealMinLevel = -1;

		this.setup( conf );

		if( !this.isCompleteClickSpin() && this.level >= 2 ) {
			this.setCompleteClickSpin();
		}

		/**
		 * Game Config
		 */
		new GameConfig( conf['config'], function () {
			// config init callback;
		});

		//! current location
		this.locationIndex = 0;
		this.broadCastRoomID = -1;

        if (!!cb) {
			cb( this );
		}

		this._elapsedNetWorkTime = 0;

		this._vibrateTime  = 0.0;
		this._vibrateCount = 0;

        // GDPR / CCPA check
        this.enableShowGDPRorCCPA = false;

		// for socialRoom
		this._isSocialRoom = false;
		this._richBetTableCount = 6;

        // onSlotIdle 관련
        this._queueCallback = [];
		this._featureQueueCallback = [];
        this._priorityFuncArray = [];

        // RockN.GlobalEvent.subscribe( EVT.SLOT_SCENE.CHANGE_YOUR_BET , RockN.onChangeYourBet, this );
	},

	/**
	 * game.handler.entryLobby 로 부터 받은 player getAllInfo 데이터로 부터 셋팅.
	 */
	setup : function( conf ) {
		/** ------------------------------
		 * ----- set default data
		 */
		this.playerID                = conf.playerID;
		this.fbID                    = conf.fbID;
		this.name                    = conf.name;
		this.grade                   = conf.grade;
		this.level                   = conf.level;
		this._balance                = conf.balance;
		this.totalExp                = conf.totalExp;
		this.prevLevelExp            = conf.prevLevelExp;
		this.nextLevelExp            = conf.nextLevelExp;


        this._isBroadCastEnable 	= conf.broadCastAvailable;
        this._isCashraceEnable 		= conf.cashRaceAvailable;

        this.firstPurchaseMinLevel 	= conf.firstPurchaseMinLevel;
        this.flashDealMinLevel 		= conf.flashDealMinLevel;

		this.lastLoginTime           = conf.lastLog;
		this.currLoginTime           = conf.currLog;
		this.lastFreeCashTime        = conf.lastFreeCashTime;
		this.classPoint              = conf.classPoint;

		this.invite_reward_step      = conf.invite_reward_step;
		this.dailyInvitedFriends     = conf.dailyInviteNames;
		this.dailyReceiveGiftFriends = conf.dailySendNames;
		this.binaryStatusBlob        = conf.binaryStatusBlob;
		this.coinRewardData          = conf.coinRewardData;
		this.classData               = conf.classData;

		this.vipFreePassStartMS      = conf[ 'vipFreePassStartMS' ];
		this.vipFreePassEndMS        = conf[ 'vipFreePassEndMS' ];
		this.fameCount               = conf[ 'fameCount' ];
		this.adID                    = conf[ 'adID' ];
		this.vipWheelBoundaryBet     = conf.vipWheelBoundaryBet;
		this.initialized             = true;
		this.serverBalance           = conf[ 'balance' ];
		this.firstName               = conf[ 'firstName' ];
		this.lastName                = conf[ 'lastName' ];
		this.pictureUrl              = conf[ 'pictureUrl' ];
		this.blackList               = conf[ 'blackList' ];
		this.createdFBAtMobile       = conf[ 'createdFBAtMobile' ];
		this.isSuperRichPlayer       = conf[ 'superRich' ];
		this.firstMobileLogin        = conf[ 'firstMobileLogin' ];

        this.fanPageLike 			= conf['fanPageLike'];
        this.unreceivedProfileList 	= conf['unreceivedProfileList'];
        this.unconfirmedProfileList = conf['unconfirmedProfileList'];
		this.oneViewNewUser 		=  conf['oneViewNewUser'];					//통합뷰 적용 이후 신규 유저 여부

        this.dailyBonusLevelFactorMax = conf['dailyBonusLevelFactorMax'];

        // r-stone
        this._localRStone   = conf.rStone;
        this._serverRStone  = conf.rStone;

		// RNCCoupon.Controller.setCouponData( conf['couponData'] );

		if( this.totalExp > 0 ) {
			this.getExp = true;
			setStorageItem( STORAGE_KEY.GET_EXP, true );
		}

		// conf[ 'vipMode' ] : vip 이상 유저 , vip 프리패스를 가진 유저면
        this.setInVipMode(conf[ 'vipMode' ]); //

		this.calibrateInstallTime();
		this.requestDailyReceiveFriends();
		this.setDailyInviteCondition();

        // g_JSB().crashlyticsSetUserID(this.playerID);
    },

	isEnableHigherBet : function() {
		return this.isSuperRichPlayer && this.inVipMode;
    },

	getRemainBonusShopTime: function() {
        var currentRemainTime = 0;

        if( this.shopBonusReceiveCount === 5 ) {
            var curRemainTimeTemp = this.shopBonusRemainTime - ( Date.now() - this.shopBonusCurrentClientTime );
            var stampRemainTime   = this.shopBonusNextStampTime - ( Date.now() - this.shopBonusCurrentClientTime );

            currentRemainTime = stampRemainTime > curRemainTimeTemp ? stampRemainTime : curRemainTimeTemp;
        }
        else {
            currentRemainTime = this.shopBonusRemainTime - ( Date.now() - this.shopBonusCurrentClientTime );
        }

        currentRemainTime = currentRemainTime < 0 ? 0 : currentRemainTime;

        return currentRemainTime;
	},

	setVipFreePass : function( startMS, endMS ) {
		this.vipFreePassStartMS = startMS;
		this.vipFreePassEndMS   = endMS;
	},

    //@BJ 현재까지 체크를 이렇게 하고 있었음.. 음...
    // 서버에서 준 끝 시간으로 vip free pass 받은건지 아닌지 체크 필요 (
    checkGetFreePass : function( endMS ) {
        return ( !!endMS && RockN.Player.vipFreePassEndMS !== endMS );
    },

	registeTimer : function() {
		RockNTimer().register( {
			target   : this,
			callback : this.update,
			name     : PLAYER_UPDATE
		} );

		/**
		 * KKS - network 체크를 이벤트 발생 시점에만 하도록 수정
		 */
		/*
		 RockNTimer().register( {
		 target   : this,
		 callback : this._checkNetwork,
		 name     : CHECK_NETWORK
		 } );
		 */

		if (cc.sys.isNative) {
			RockNTimer().register( {
				target   : this,
				callback : this._runVibrator,
				name     : VIBRATE_TIMER
			} );
		}
	},

	_runVibrator : function( dt ) {
		this._vibrateTime += dt;
        if( this._vibrateTime < 0.45 ) {
            return;
        }

        if( true === RockN.vibrateRunable ) {
            this._vibrateCount++;
            if( RockN.vibrateCount <= this._vibrateCount ) {
                RockN.vibrateRunable = false;
                RockN.vibrateCount   = 0;
                this._vibrateCount   = 0;
            }
            cc.Device.vibrate( 0.4 );
        }
        this._vibrateTime = 0;
	},

	unregisteTimer : function() {
		RockNTimer().cancelRegistration( PLAYER_UPDATE );
		/**
		 * KKS - network 체크를 이벤트 발생 시점에만 하도록 수정
		 */
		//RockNTimer().cancelRegistration( CHECK_NETWORK );
		RockNTimer().cancelRegistration( VIBRATE_TIMER );
	},

	update              : function( dt ) {

	},

	onSceneExit : function() {
		RockN.SLOT_OBJECT_HANDLER = null;
		RockN.SLOT_DATA_HANDLER   = null;

		//requestCoinReward 나왔는데 받지 않는 경우도 있기때문에 신변경시 flag값 초기화
        this.enableSlotPlayReward = false;
	},

    releaseNodes : function() {
		if( !RockN.GameScene )
			return;
	},

	onEnterTransitionStarted : function() {
		if( RNCInSlotMeta.USE_NEW_SLOT_IDLE === true ) {
			return;
		}

        g_JSB().crashlyticsLog(3,SceneManager.getInstance().getCurrSceneName(),"Player onEnterTransitionStarted  " + this._queueCallback.length);
		// remove callback functions which doesn't have argument
		for( var i = 0; i < this._queueCallback.length; i++ ) {
			var cb = this._queueCallback[ i ];

			if( cb.__name === "emblemFunc" ) {
				this._queueCallback.splice( i, 1 );
				i--;
			}
			else if( cb.length === 0 ) {
				this._queueCallback.splice( i, 1 );
				i--;
			}
		}
	},

	onSceneSpawnFinished : function() {},

	requestDailyReceiveFriends : function(callBack) {
		var self = this;

		RockN.NET.request( "connector.gameHandler.dailyRecipients", {
			playerID : self.playerID
		}, function( response ) {
			if( response[ "result" ] === 0 ) {
				self.dailyReceiveGiftFriends = response[ "recipients" ];
				self.tsRemainTime.setRemainTime(response["remainTime"]);
				self.setDailyGiftReceiveCondition();

                if( false === RockN.GuestPlayer ) {
                    g_getInGameFriends( function( succeed ) {
                    }, self );
                }
				if( !!callBack && typeof callBack  === 'function' ) {
					callBack();
				}
			}
			else {
				cc.error( response[ "message" ] );
			}
		} );
	},

	setAttendanceDeal : function( result2, callback ) {
		if( result2.code !== RockN.CODE.OK ) {
            if( callback && typeof callback === 'function' ) {
                callback( this.attendanceDealExistItems, this.attendanceDealNonExistItems );
            }
			return;
		}

        if( !this.attendanceDealExistItems )
			this.attendanceDealExistItems = [];
        this.attendanceDealExistItems.length = 0;

		if( result2.hasOwnProperty( 'existItems' ) ) {
			for( var i = 0; i < result2.existItems.length; i++ ) {
				this.attendanceDealExistItems.push( result2.existItems[ i ] );
			}
		}
		if( !this.attendanceDealNonExistItems )
			this.attendanceDealNonExistItems = [];
        this.attendanceDealNonExistItems.length = 0;

        if( result2.hasOwnProperty( 'notExistItems' ) ) {
			for( var j = 0; j < result2.notExistItems.length; j++ ) {
				this.attendanceDealNonExistItems.push( result2.notExistItems[ j ] );
			}
		}

		// if( !!RockN.NavigationMenu ) {
		// 	RockN.NavigationMenu.setAttendanceDealData( this.attendanceDealExistItems, this.attendanceDealNonExistItems );
		// }
		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_ATTENDANCE_DEAL );

		if( callback && typeof callback === 'function' ) {
			callback( this.attendanceDealExistItems, this.attendanceDealNonExistItems );
		}
	},

    setLabelCurrentBalance : function( label , maxDigit ){
	    if( label instanceof ccui.Text){
	        cc.log("label instanceof ccui.Text true");
            var strBalance = bigNumberToString( this._balance, maxDigit );
	        label.setString(strBalance)
        }

    },

    getScratchRemainTime: function () {
		if(!this.scratchInfo || !this.scratchInfo.time || !this.scratchInfo.time.remainTime){
			return -1;
		}
        return this.scratchInfo.time.remainTime - (Date.now() - this.scratchInfo.time.startTime);
    },

	isScratchAvailable: function () {
		if(!this.scratchInfo || !this.scratchInfo.time ){
			return false;
		}
		return this.scratchInfo.time.isAvailable && this.getScratchRemainTime() > 0;
	},

	setDailyGiftReceiveCondition : function() {
		if( RockN.ENABLE_FB ) {
			if( window.facebook.inGameFriends.length === 0 ) {
				return;
			}

			for( var i = 0; i < window.facebook.inGameFriends.length; i++ ) {
				window.facebook.inGameFriends[ i ].enableReceiveGift = (this.dailyReceiveGiftFriends.indexOf( window.facebook.inGameFriends[ i ].id ) === -1);
			}
		}
	},

	setDailyInviteCondition : function() {
		if( RockN.ENABLE_FB ) {
			for( var i in window.facebook.invitableFriends ) {
				window.facebook.invitableFriends[ i ].enableInvite = ( this.dailyInvitedFriends.indexOf( facebook.invitableFriends[ i ].name ) === -1 );
			}
		}
	},

	setLastFreeCashTime : function( time ) {
		this.lastFreeCashTime = time;
	},

	calibrateInstallTime : function() {
	},

	/**
	 *	서버 벨런스 세팅
	 *		1. leaveSlot 패킷 성공 후 씬 전환 전 세팅
	 *		2. 일반로비 -> 라운지 진입 시 entryVipLounge 패킷 성공 후 세팅
	 *		3. 라운지 -> 일반 로비 진입 시 leaveVipLounge 패킷 성공 후 세팅
	 *		4. 슬롯 진입 요청 성공( 소셜 슬롯, 크래시 게임 ) 후 해당 슬롯 씬 생성 후 runScene 되기 전 세팅
	 *		5. 클래식 슬롯 changeSlot 요청 성공 후 handle_signal 호출 전 세팅
	 *
	 *    ignorePruneRemainReward : 남은금액 중에 가지치기 하지 않는다. ( 씬 전환이 아닌 클래식베가스슬롯 change scene 같은 경우 )
	 */
	setServerBalance : function( serverBalance, ignorePruneRemainReward ) {
		cc.log( RockN.BalanceTag, " " );
		cc.log( RockN.BalanceTag, "### SET SERVER BALANCE ###" );

		RockN.log( 'setServerBalance : ', serverBalance );

		//step 1. 씬 전환시 필요없는 remain reward 는 삭제한다. ( change scene 은 제외 )
		//        ex) 씬 전환후에 꼭 보상을 보여줘야 하는것을 제외한.. levelUp, classUp, 5LvUp
		if( ignorePruneRemainReward !== true ) {
			this.pruneRemainReward(); // 필요 없는 remain_reward 는 처리
		}

		//step 2. 서버 밸런스 세팅
		// 		  클라 밸런스 세팅 ( 이때, 아직 보여줘야 할 remainReward 가 있다면 server 밸런스에서 차감해서 세팅 )
		this.serverBalance 	= serverBalance; 											// server balance
		this._balance 		= this.serverBalance - this.getCollectPopupRemainReward();	// client balance

		/// 밸런스 로그
		cc.log( RockN.BalanceTag, "		server_balance : ", this.serverBalance );
		cc.log( RockN.BalanceTag, "		client_balance : ", this._balance );
		cc.log( RockN.BalanceTag, "		remain_reward  : ", this.getCollectPopupRemainReward() );

		if( this.getCollectPopupRemainReward() > 0 ) {
			for( var type in this.remainPopupRewards ) {
				for( var key in this.remainPopupRewards[ type ] ) {
					cc.log( RockN.BalanceTag, "			>  type, key, remain : ", type, key, this.remainPopupRewards[ type ][ key ]  );
				}
			}
		}
		cc.log( RockN.BalanceTag, " " );
		///
	},

	//region [ remain reward ]

	// 씬 전환시 해당 타입의 remainReward 가 있다면 관련 금액들은 초기화
	pruneRemainReward : function() {
		cc.log( RockN.BalanceTag, "  # Player.pruneRemainReward #" );
		this.removeRemainRewardByType( 'remain_level_up_tooltip' );
		this.removeRemainRewardByType( 'packMaker_remain_reward' );
		this.removeRemainRewardByType( 'remain_coin_reward' );
		cc.log( RockN.BalanceTag, " " );
	},

	getCollectPopupRemainReward : function() {
		var remainReward = 0;
		// RockN.log( 'getCollectPopupRemainReward running' );
		for( var type in this.remainPopupRewards ) {
			for( var key in this.remainPopupRewards[ type ] ) {
				cc.assert( typeof this.remainPopupRewards[ type ][ key ] === "number", "save error" );
				remainReward += this.remainPopupRewards[ type ][ key ];
			}
		}

		if( typeof remainReward !== "number" || remainReward < 0 ) {
			return 0;
		}

		return remainReward;
	},

	addCollectRemainReward : function( type, key, value ) {
		cc.log( RockN.BalanceTag, "  # Player.addCollectRemainReward # : ", type, key, value );

		cc.assert( typeof type === "string", "addCollectRemainReward type must be string" );
		key = "" + key;

		if( false === this.remainPopupRewards.hasOwnProperty( type ) ) {
			this.remainPopupRewards[ type ] = {};
		}

		if( this.remainPopupRewards[ type ].hasOwnProperty( key ) ) {
			cc.assert( false, "duplicated key" );
		}
		else {
			this.remainPopupRewards[ type ][ key ] = value;
			return;
		}

		cc.error( "addCollectRemainReward type or key invalid" );
	},

	removeCollectRemainReward : function( type, key ) {
		cc.assert( typeof type === "string", "removeCollectRemainReward" );
		key = "" + key;

		var remainReward = 0;
        if( !!this.remainPopupRewards[ type ]  === false ) {
			cc.log( RockN.BalanceTag, "  # Player.removeCollectRemainReward # : ", type, key, remainReward  );
			return 0;
		}
		if( this.remainPopupRewards[ type ].hasOwnProperty( key ) ) {
			remainReward = this.remainPopupRewards[ type ][ key ];
			delete this.remainPopupRewards[ type ][ key ];
		}
		if( typeof remainReward !== "number" || remainReward < 0 ) {
			cc.log( RockN.BalanceTag, "  # Player.removeCollectRemainReward # : ", type, key, remainReward  );
			return 0;
		}

		cc.log( RockN.BalanceTag, "  # Player.removeCollectRemainReward # : ", type, key, remainReward  );
		return remainReward;
	},

	// 같은 타입의 remainReward 값을 모두 삭제한다.
	removeRemainRewardByType : function( type ) {
		cc.assert( typeof type === "string", "removeRemainRewardByType : " + type  );

		var totalReward = 0;
		var remainRewardObj = this.remainPopupRewards[ type ];
		for( var key in remainRewardObj ) {
			if( remainRewardObj.hasOwnProperty( key ) ) {
				var reward = remainRewardObj[ key ];
				totalReward += reward;
				delete this.remainPopupRewards[ type ][ key ];

				cc.log( RockN.BalanceTag, "			> key, reward : ", key, reward );
			}
		}

		if( totalReward > 0 ) {
			cc.log( RockN.BalanceTag, "		Player.removeRemainRewardByType : ", type, totalReward );
		}


	},
	//endregion

	/**
	 *	클라 밸런스 업데이트 후 밸런스 패널 보상 추가 연출
	 */
	_updatePlayerBalance : function( increaseBalance, hideAddCash ) {
		this._balance += increaseBalance;

		cc.log( RockN.BalanceTag, "  # Player._updatePlayerBalance # > client_balance : ", this._balance, "(", increaseBalance, ")" );

		RockN.NavigationMenu.updateFloatingBalance( this._balance, increaseBalance );
		RockN.NavigationMenu.updateStaticBalance( this._balance, increaseBalance, false, 0.2, hideAddCash );
	},

	/**
	 * 클라 밸런스 업데이트 외부 인터페이스
	 * 클라 밸런스 업데이트 후 밸런스 패널 보상 추가 연출 ( 보상 금액이 0 이면 해당 로직 실행하지 않고 리턴 )
	 */
	onRewardAccept : function( reward ) {
		cc.log( RockN.BalanceTag, " ");
		cc.log( RockN.BalanceTag, "### ON REWARD ACCEPT ###" );
		// RockN.log( '~~~>> accept reward : ' + toLocale( reward ) );

		if( reward <= 0 ) {
			return;
		}
		this._updatePlayerBalance( reward );
	},

	/**
	 * spin 후에, 자산을 갱신하기 위하여 불린다.
	 * 		1. spin 응답 후에 server, client 금액 업데이트 되기전 금액을 서로 비교
	 * 		2. 비교 후 클라 금액 업데이트 ( Player._balance )
	 * 		3. PostSpinEvent 처리 ( 이 때, remain reward 처리 )
	 */
	onPostSpin : function( betCash ) {
		cc.log( RockN.BalanceTag, " ");
		cc.log( RockN.BalanceTag, "### ON POST SPIN ( CHECK BALANCE  ) ### " );

		// step 1. 서버 - 클라 밸런스 업데이트
		//  		비교시, remainReward 금액이 있다면 그 금액을 차감하여 클라 밸런스와 비교
		// 			( 아직 리메인 보상은 클라 밸런스에 적용이 안되었기 때문 )
		var calcServerBalance = this.serverBalance - this.getCollectPopupRemainReward();

		/// step 2.로그 금액에 문제가 있다면 로그 띄워줌
		if( this._balance !== calcServerBalance ) {
			cc.log( RockN.BalanceTag, "### ON POST SPIN ( CHECK BALANCE  ) ### " );
			cc.log( RockN.BalanceTag, "		client , server balance	: ", this.serverBalance, this._balance );
			cc.log( RockN.BalanceTag, "		client - server balance	: ", this._balance - this.serverBalance );
			cc.log( RockN.BalanceTag, "		total remain reward 	: ", this.getCollectPopupRemainReward() );

			if( this.getCollectPopupRemainReward() > 0 ) {
				for( var type in this.remainPopupRewards ) {
					for( var key in this.remainPopupRewards[ type ] ) {
						cc.log( RockN.BalanceTag, " 		>  type, key, remain : ", type, key, this.remainPopupRewards[ type ][ key ]  );
					}
				}
			}
			cc.log( RockN.BalanceTag, " " );

			/// 기존 로그
			if( RockN.Platform.isNativeApp() ) {
				var msg = "CHECK Balance\n" +
					"client : " + this._balance.toLocaleString() + "\n" +
					"server : " + this.serverBalance.toLocaleString() + "\n" +
					"( client - server ) : " +  ( this._balance - this.serverBalance ).toLocaleString();

				RockN.Test.HideBalanceSync || RockN.Assert( msg );
			}
			else {
				RockN.Util.printDebugMessage( '***** balance not matched. client bal : ' + this._balance.toLocaleString() +
					' // server bal : ' + this.serverBalance.toLocaleString(), 5 );
				RockN.Util.printDebugMessage( '***** ( client - server ) balance: ' + ( this._balance - this.serverBalance ).toLocaleString(), 5 );

				cc.error( '***** balance not matched. client bal : ' + this._balance.toLocaleString() +
					' // server bal : ' + this.serverBalance.toLocaleString() );
				cc.error( '***** ( client - server ) balance: ' + ( this._balance - this.serverBalance ).toLocaleString() );
			}
		}
		else {
			cc.log( RockN.BalanceTag, "		check :	The amounts match" );
		}

		/// step 3. 클라 밸런스 업데이트 ( 베팅 금액 차감 )
		this._updatePlayerBalance( -betCash );

		/// step 4. 클라 밸런스 0 보다 작을 경우 처리
		if( this._balance < 0 ) {
			cc.error( "Balance is under zero." );
		}

		/// step 5. 메타 시스템 처리 및 이벤트
		SystemIcon.onSpin();
		MusicBox.Controller.onPostSpin(); //뮤직박스
		RockN.GlobalEvent.broadcast( EVT.SLOT_SCENE.POST_SPIN );
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_POST_SPIN, betCash );
	},

	// todo 이거 한번 분석해야 함.
	onPostOfferSpin : function() {
		SystemIcon.onSpin();
		MusicBox.Controller.onPostSpin(); //뮤직박스
		RockN.GlobalEvent.broadcast( EVT.SLOT_SCENE.POST_SPIN );

		// todo onPostOfferSpin 은 없애야 함.??? 이번에 추가됨.
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_POST_SPIN );
	},

	/**
	 * win 금액이 있을 경우 호출. win 금액 클라 밸런스 업데이트
	 */
	onPostTotalPay : function( win ) {
		cc.log( RockN.BalanceTag, " ");
		cc.log( RockN.BalanceTag, "### ON POST TOTAL PAY ### ", win );

		// step 1. win 금액 클라 밸런스 업데이트
        var totalPayShowed = BaseTotalPay.hideTime && Date.now() - BaseTotalPay.hideTime < 2 * 1000;
        this._updatePlayerBalance( win, totalPayShowed );

		// step 2. 메타 컨텐츠 처리 및 LifeCycle 이벤트 발생
		RNC3S.Controller.onPostTotalPay( win );
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_POST_TOTAL_PAY, win );
    },

	/**
	 * invite friend 후, 서버에서 결과로 받은값을 사용하여 갱신.
	 */
	onPostInviteFriend : function( data ) {
		/* data
		 reward : logInviteReward,
		 total_step : this.invite_reward_step,
		 totalCount: this.totalInviteFriendCount,
		 dailyInvitedFriends: this.dailyInviteFriendNames
		 */
		this.dailyInvitedFriends    = data[ "dailyInvitedFriends" ];
		this.invite_reward_step = data[ "total_step" ];

		//this._updatePlayerBalance( data[ 'reward' ] );

		//SoundControl.getInstance().playEffect( globalCommon.GetReward );
	},

	onPostSentGift : function( msg ) {
		if( msg.result !== 0 ) {
			cc.error( "SendGift Error code - 365" );
			return;
		}

		this.dailyReceiveGiftFriends = msg.dailySentList;
		this.tsRemainTime.setRemainTime(msg.remainTime);
	},

	//친구에게 샌드기프트를 현재 보낼수있는지? (FBID기준)
	isAbleToSendGiftTo : function (PlatformID){
		if (this.dailyReceiveGiftFriends==null)
			return  true;
		return (this.dailyReceiveGiftFriends.indexOf(PlatformID) === -1);
	},

	/**
	 * 서버로부터 'onSyncBalance' 이벤트 받으면 즉시 처리
	 * 서버 밸런스 업데이트
	 */
	onSyncBalance : function( data ) {
		cc.log( RockN.BalanceTag, " ");
		cc.log( RockN.BalanceTag, "### ON SYNC BALANCE ### : ", data[ "balance" ] );
		// cc.log( RockN.BalanceTag, "		msg : ", data );

		// step 1. 서버 밸런스 업데이트
		this.serverBalance = data[ "balance" ];

		// 로그 작업
		if( this.totalExp <= 0 &&
			( null === this.getExp || false === this.getExp ) &&
			data.totalExp > 0 ) {
			this.getExp = true;
			setStorageItem(STORAGE_KEY.GET_EXP, true);
			LogHandler.getInst().sendEvent(LogHandler.EVENT.GET_EXP, {
				First_slot_name : SceneManager.getInstance().getCurrSceneName()
			}, null);
		}

		// Level up 한 경우 onLevelUp이 먼저 실행되고 이것이 실행될 수 있음
		if( data.totalExp > this.totalExp ) {
			this.totalExp = data.totalExp;
		}

		// 네비게이션 메뉴 레벨 경험치 UI 리프레시
		if( !!RockN.NavigationMenu ) {
			RockN.GlobalEvent.broadcast( EVT.SLOT_SCENE.REFRESH_LEVEL_EXP );
		}
	},

	/**
	 * 서버에서 onLevelUp 이벤트가 왔을 경우, 플레이어의 level 관련 데이터 업데이트
	 *		data : array 단일레벨업에 대한 데이터 배열( 다중레벨업 시에는 배열의 크기가 2 이상 )
	 *		strip : 최종 플레이어 데이터
	 */
	handleImmediateOnLevelUp : function( res ) {
		var loc_data = res.strip;	// 최종데이터로 세팅

		this.level 			= loc_data.level;
		this.prevLevelExp 	= loc_data.prevLevelExp;
		this.nextLevelExp 	= loc_data.nextLevelExp;

		if( loc_data.totalExp > this.totalExp ) {	// onSyncBalance가 먼저 실행되고 이것이 실행될 수 있음
			this.totalExp = loc_data.totalExp
		}

		// navigation menu ui refresh
		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_PLAYER_INFO );

		// 레벨업 시 샵의 클래스 변경을 할 필요가 있는가?
		var shopNode = RockN.NavigationMenu.getShopLayer();
		!!shopNode && shopNode.setClass( true );

		var lvUpInfo = RNCInSlotMeta.PostSpinEventHandler.getLevelUpAccumInfo( res );
		if( !!res.data && cc.isArray( res.data ) ) {
			var loc_type = res.data.length === 1 ? 'remain_level_up_tooltip' : 'remain_level_up';
			RockN.Player.addCollectRemainReward( loc_type, lvUpInfo.level, lvUpInfo.coin );
		}

		//레벨업 로그
		LogHandler.getInst().sendEvent( LogHandler.EVENT.LEVEL_UP, { level : this.level }, null );

		// OneSignal 쪽에 Tags 갱신
		g_APNS().sendPlayerTags();
	},

	/**
	 * 서버에서 onClassUp 이벤트가 왔을 경우, 플레이어의 class 관련 데이터 업데이트
	 */
	handleImmediateOnClassUp : function( res ) {
		this.grade       = res[ 'userClass' ];
		this.classPoint  = res[ 'classPoint' ];
		this.classData   = res[ 'classData' ];

		// set remain reward
		var targetGrade 	= res[ 'userClass' ],
			classUpReward = res[ "up_reward" ] || 0,
			freePassReward     = res[ "freePassRemainReward" ] || 0;

		RockN.Player.addCollectRemainReward( 'remain_classUp', targetGrade, classUpReward );
		RockN.Player.addCollectRemainReward( 'freePass_reward', targetGrade, freePassReward );

		// update coupon data
		RNCCoupon.Controller.setCouponData( res['couponData'] );

		// update shop data todo : shop 리펙토링 시 이벤트 방식으로 변경하자
		if( !!RockN.NavigationMenu ) {
			var shopNode = RockN.NavigationMenu.getShopLayer();
			if( !!shopNode && shopNode.initialized ) {
				shopNode.refreshCash();
			}
		}

		// update attendance deal todo : shop 리펙토링 시 이벤트 방식으로 변경하자
		checkAttendanceDeal();

		// navigation menu ui refresh
		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_PLAYER_INFO );

		//클래스업 로그
		LogHandler.getInst().sendEvent( LogHandler.EVENT.CLASS_UP, { grade : this.grade }, null );

		/** OneSignal쪽에 Tags 갱신 */
		g_APNS().sendPlayerTags();
	},

	handleImmediateOn5LevelUp : function( res ) {
		if ( !!res.reward && !!res.reward.coin) {
			RockN.Player.addCollectRemainReward("remain_5Level", res.level, res.reward.coin);
		}

		MusicBox.Controller.reserveGetCardPackBy5LvlBonus(true);

		if( res.level === 5 || res.level === 10 ) {
			LogHandler.getInst().sendEvent( LogHandler.EVENT.FIVE_LEVEL_BONUS_POPUP );
		}

	},

	onLevelUp : function( data ) {
		this.level    = data.strip.level;

		// onSyncBalance가 먼저 실행되고 이것이 실행될 수 있음
		if( data.strip.totalExp > this.totalExp ) {
			this.totalExp = data.strip.totalExp;
		}

		this.prevLevelExp = data.strip.prevLevelExp;
		this.nextLevelExp = data.strip.nextLevelExp;

		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_PLAYER_INFO );

		this.receivePopUpEvent( "onLevelUp", data );

		//레벨업 로그
		LogHandler.getInst().sendEvent( LogHandler.EVENT.LEVEL_UP, { level : this.level }, null );

        /**
         * OneSignal쪽에 Tags 갱신
         */
		g_APNS().sendPlayerTags();
	},

	onClassUp : function( data ) {
		/**
		 userClass            : player.grade,
		 classPoint           : player.classPoint,
		 up_reward            : data.reward,
		 freePassRemainReward : data[ 'remainReward' ],
		 classData            : player.classObject,
		 couponCount          : data.couponCount
		 */
		this.grade       = data[ 'userClass' ];
		this.classPoint  = data[ 'classPoint' ];
		this.classData   = data[ 'classData' ];
		RNCCoupon.Controller.setCouponData( data['couponData'] )

		this.receivePopUpEvent( 'onClassUp', data );

		//클래스업 로그
		LogHandler.getInst().sendEvent( LogHandler.EVENT.CLASS_UP, { grade : this.grade }, null );

		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_PLAYER_INFO );

		if( !!RockN.NavigationMenu ) {
			var shopNode = RockN.NavigationMenu.getShopLayer();
			if( !!shopNode && shopNode.initialized ) {
				shopNode.refreshCash();
			}
		}

		checkAttendanceDeal();
        /**
         * OneSignal쪽에 Tags 갱신
         */
        g_APNS().sendPlayerTags();
	},

	onSyncClass : function( data ) {
		this.grade       = data.userClass;
		this.classPoint  = data.classPoint;
		this.classData   = data.classData;
		this.couponCount = data.couponCount;

		RockN.GlobalEvent.broadcast( EVT.NAVIGATION_MENU.REFRESH_PLAYER_INFO );

        /**
         * OneSignal쪽에 Tags 갱신
         */
        g_APNS().sendPlayerTags();
	},

	_getBinaryStatus : function( digit ) {
		if( digit < 0 ) {
			return false;
		}
		var nIndex = parseInt( digit / 8 );
		var nDigit = digit % 8;

		var value = this.binaryStatusBlob[ nIndex ] & ( 0x0001 << nDigit );

		return value > 0;
	},

	_setBinaryStatus : function( digit, value ) {
		if( digit < 0 ) {
			cc.error( '>>>>> set binary status. digit is invalid. digit : ', digit );
			return;
		}

		if( digit === Defines.BINARY_STATUS.GUIDE_SPIN_CLICK ) {
			LogHandler.getInst().sendEvent( LogHandler.EVENT.FIRST_SPIN, null, null );
		}

		var self = this;
		RockN.NET.request( 'connector.gameHandler.updatePlayerState', {
			digit    : digit,
			value    : value,
			playerID : self.playerID
		}, function( res ) {
			self.binaryStatusBlob = res[ 'binaryStatusBlob' ];
		} );
	},

	// 플레이어 바이너리스테터스 업데이트
	updateBinaryStatusBlob : function( cb ) {
		var route 	= 'connector.gameHandler.getBinaryStatusBlob';
		var params 	= {
			playerID : this.playerID
		};

		var self 	= this;
		RockN.NET.request( route, params, function( res ){
			if( res.code === RockN.CODE.OK ) {
				self.binaryStatusBlob = res[ 'binaryStatusBlob' ];
			}
			cb && cb();
		});
	},

    setShowFirstMergePolicyGuest : function(){
        this._setBinaryStatus( Defines.BINARY_STATUS.FIRST_MERGE_POLICY_GUEST, true );
    },

    getShowFirstMergePolicyGuest : function(){
        return this._getBinaryStatus( Defines.BINARY_STATUS.FIRST_MERGE_POLICY_GUEST );
    },

	setCompleteClickSpin : function() {
		this._setBinaryStatus( Defines.BINARY_STATUS.GUIDE_SPIN_CLICK, true );
	},

	setCompleteGoLobby : function() {
		this._setBinaryStatus( Defines.BINARY_STATUS.COMPLETE_GO_LOBBY, true );
	},

	setCoinRewardData : function( rewardData ) {
		this.coinRewardData = rewardData;
	},

	setSlotPlayRewardEnable : function() {
		if( this.enableSlotPlayReward ) {
			return;
		}
		this.enableSlotPlayReward = true;
		RockN.GameScene.setSlotPlayReward();
	},

	requestCoinReward : function( coinNode, action, callback, labelPos ,showPanel) {
		// 스핀 중 비동기 보상으로 인한 balance 싱크 이슈 대응
		var self = this;
		RockN.NET.request( 'connector.gameHandler.request', {
			protocol : SIG.SIG_COIN_REWARD,
			action   : action,
			playerID : self.playerID
		}, function( result ) {
			if( result.code === RockN.CODE.OK ) {
				if( action === SIG.COIN_REWARD_ACTION.GET_SLOT_PLAY_REWARD ) {
					self.enableSlotPlayReward = false;
				}
				self.coinRewardData = result.coinRewardData;
				if( null !== coinNode && coinNode instanceof CoinRewardEffect) {
					coinNode.playGetAnimation( result.reward, callback, labelPos , showPanel);
				} else {
                    if( !!callback ) {
                        callback();
                    }
                }
			}
			else {
                if( null !== coinNode && coinNode instanceof CoinRewardEffect ) {
					coinNode.playGetAnimation( 0, callback, labelPos,showPanel);
				}
				if( !!callback ) {
					callback();
				}
			}
		} );

		// google analytics
		if( !cc.sys.isMobile ) {
			switch( action ) {
				case SIG.COIN_REWARD_ACTION.GET_SLOT_REWARD:
					ga( 'send', 'event', 'Coin Reward', 'Slot Coin Reward', 'Slot Coin Reward - Level', RockN.Player.level );
					break;
				case SIG.COIN_REWARD_ACTION.GET_LOBBY_BTN_REWARD:
					ga( 'send', 'event', 'Coin Reward', 'Lobby Btn Coin Reward', 'Lobby Btn Coin Reward - Level', RockN.Player.level );
					break;
				case SIG.COIN_REWARD_ACTION.GET_LOBBY_REWARD:
					ga( 'send', 'event', 'Coin Reward', 'Lobby Coin Reward', 'Lobby Coin Reward - Level', RockN.Player.level );
					break;
				case SIG.COIN_REWARD_ACTION.GET_SHARE_REWARD:
					ga( 'send', 'event', 'Coin Reward', 'Share Coin Reward', 'Share Coin Reward - Level', RockN.Player.level );
					break;
				case SIG.COIN_REWARD_ACTION.GET_SLOT_PLAY_REWARD:
					ga( 'send', 'event', 'Coin Reward', 'Slot Play Coin Reward', 'Slot Play Coin Reward - Level', RockN.Player.level );
					break;
			}
		}
	},

	_getCoinRewardData : function( digit ) {
		if( digit < 0 ) {
			return null;
		}

		if( digit === 0 ) {
			return 31; // kks : 페이스북 검수를 통과하기 위해,,,,
			// return this.coinRewardData % 32;
		}
		else {
			var value = this.coinRewardData & (0x0001 << digit);
			return (value > 0);
		}
	},

	receivePopUpEvent : function( signal, event_data ) {
		if( !!RNCInSlotMeta.USE_NEW_SLOT_IDLE ) {
			return;
		}


		cc.log( "receivePopUpEvent >>> ", signal );
		var self = this;

		if( "onClassUp" === signal ) {
			/**
			 userClass            : player.grade,
			 classPoint           : player.classPoint,
			 up_reward            : data.reward,
			 freePassRemainReward : data[ 'remainReward' ],
			 classData            : player.classObject,
			 couponCount          : data.couponCount
			 */
			var locClassUpReward = event_data[ "up_reward" ],
			    locUserClass     = event_data[ "userClass" ],
			    remainReward     = event_data[ "freePassRemainReward" ],
				acquiredCardPack = event_data[ "acquiredCardPack" ],	//클래스업 보상으로 획득한 카드팩 (array)
				allCardPacks     	 = event_data[ "cardPack" ];			//보상으로 인해 변경된 전체 보유 카드팩 (array)

            var classUpFunc = function( callbacks ) {
                var pLayer = new NewClassUp( locUserClass, locClassUpReward, callbacks, null, null, null, null );
                RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP );
                RNCCoupon.Controller.setCouponData( event_data['couponData'] );
            };

			self._queueCallback.unshift( classUpFunc );
            self._priorityFuncArray.push({
                priority : SLOT_IDLE_CALLBACK_ORDER.CLASS_UP,
                func     : classUpFunc
            });


			//뮤직박스 카드팩 보상
			if (acquiredCardPack != null){
				self._queueCallback.push( function( nextQue ) {
					MusicBox.Controller.showClassUpRewardPopup(acquiredCardPack, allCardPacks, nextQue );
				} );
			}

			if( 0 < remainReward ) {
				self._queueCallback.push( function( nextQue ) {
					var pLayer = new FreePassRemainRewardPopUp( remainReward, nextQue );
					RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP3 );
				} );
			}

			if ( event_data['receivedCoupon']){
                self._queueCallback.push( function( nextQue ) {
                    var pLayer = new RNCCoupon.View.NormalCouponPopup( nextQue );
                    RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP );
                } );
            }

		}

		if( "onLevelUp" === signal ) {

		    //levelupData Setting
            var targetLevel, upReward, classPoint, maxBet, bc_open, cr_open, eventGame_open, dailyWheelFactor, fiveLvlBonusCount = 0;
            var levelstrip_startLevel = -1;
            var levelstrip = [];
            var rewardStrip = [];
            var classPointStrip = [];
            if (event_data.data.length === 1) {
                targetLevel = event_data.data[0]["level"];
                upReward = event_data.data[0]["reward"];
                classPoint = event_data.data[0]["classPoint"];
                maxBet = event_data.data[0]['maxBet'];
                bc_open = event_data.data[0]['bc_open'];
                cr_open = event_data.data[0]['cr_open'];
                eventGame_open = event_data.data[0]['eventGame_open'];
                dailyWheelFactor = event_data.data[0]['dailyWheelFactor'];
                if (event_data.data[0]['has5LevelBonus'] === true)
                    fiveLvlBonusCount++;
            } else if (event_data.data.length > 1) {
                upReward = 0;
                classPoint = 0;

                for (var i = 0; i < event_data.data.length; i++) {
                    upReward += event_data.data[i]["reward"];
                    classPoint += event_data.data[i]["classPoint"];
                    levelstrip.push(event_data.data[i]['level']);
                    rewardStrip.push(event_data.data[i]["reward"]);
                    classPointStrip.push(event_data.data[i]["classPoint"]);
                    if (event_data.data[i]['has5LevelBonus'] === true)
                        fiveLvlBonusCount++;
                    if(!!event_data.data[i]['maxBet'] === true )
                        maxBet = event_data.data[i]['maxBet'];
                    if(!!event_data.data[i]['bc_open'] === true )
                        bc_open = event_data.data[i]['bc_open'];
                    if(!!event_data.data[i]['cr_open'] === true )
                        cr_open = event_data.data[i]['cr_open'];

                }
                levelstrip_startLevel = event_data.data[0]['level'];
                targetLevel = event_data.data[event_data.data.length - 1]['level'];
                dailyWheelFactor = event_data.data[event_data.data.length - 1]['dailyWheelFactor'];
            }

            dailyWheelFactor = Math.floor(dailyWheelFactor * 100 ) / 100;

			// 단일 레벨업과 중복 레벨업을 다른 타입으로 remainReward 저장한다.
			var remainRewardType = ( event_data.data.length === 1 ) ? 'remain_level_up_tooltip' : 'remain_level_up';
			RockN.Player.addCollectRemainReward( remainRewardType, targetLevel, upReward );
			// RockN.Player.addCollectRemainReward( 'remain_level_up', targetLevel, upReward );


            var levelupdata = {
                level: targetLevel,
                coin: upReward,
                point: classPoint,
                maxBet: maxBet,
                daily: dailyWheelFactor,
                CR_open: cr_open,
                BC_open: bc_open,
                fivelvlCount: fiveLvlBonusCount,
                levelstrip: levelstrip,
                rewardStrip: rewardStrip,
                classPointStrip: classPointStrip
            };

            if ( levelupdata.levelstrip.length !== 0 ) { // 다중레벨업
                self._queueCallback.push( function( callbacks ) {
                    if( !!RockN.GameScene ) {
                        RockN.GameScene.onLevelUp( levelupdata, callbacks );
                    }
					else {
						runQueueCallback( callbacks );
					}
                } );
            } else {
				RockN.GlobalEvent.broadcast( EVT.SLOT_SCENE.SHOW_LEVEL_UP_TOOLTIP, levelupdata );
            }

			// RockN.NavigationMenu && RockN.NavigationMenu.notifyClassUpSequenceEnd();
			var shopNode = RockN.NavigationMenu.getShopLayer();
			if( !!shopNode ) {
				shopNode.setClass( true );
			}
		}

        //! go lobby guide
        if ("onGotoLobby" === signal && RockN.Player.grade < RockN.ClassType.VIP ) {
			if (self.inVipMode === false && self.isCompleteGoLobby() === false) {
				self._queueCallback.push( function( callbacks ) {
					var pGoLobby = new GoLobbyGuide( null, callbacks );
					RockN.GameScene.addChild( pGoLobby, RockN.GLOBAL_ORDER.POPUP );
				} );
			}
			else if (self.inVipMode === false && self.isCompleteGoLobby() === true ) {
				self._queueCallback.push( function( callbacks ) {
					RNCBonusHub.Controller.runWelcomeGiftSequence( callbacks );
				});
			}
        }

        if( "onNeedMoreCoins" === signal ) {
            self._queueCallback.push(function (callbacks) {
                var popup = new NeedMoreCoinsPopup( callbacks );
                RockN.GameScene.addChild( popup , RockN.GLOBAL_ORDER.POPUP);
            });
        }

        if( "onBroadCastOpen" === signal ) {
			self._queueCallback.push( function( callbacks ){
				self._isBroadCastEnable = true;

				if( true === RockN.Player._getBinaryStatus( Defines.BINARY_STATUS.BROADCAST_OPEN_POPUP ) ) {
					runQueueCallback( callbacks )
				}
				else {
					RNCBroadcast.Contoller.showBroadcastOpenPopup( callbacks );
				}
			});
        }

        if( "onCashRaceOpen" === signal ) {
			// 1. open guide popup
            self._queueCallback.push( function( callbacks ){
				SystemIcon.show( null, true );
				self._isCashraceEnable = true;

				if ( true === RockN.Player._getBinaryStatus(Defines.BINARY_STATUS.CASHRACE_OPEN_POPUP) ) {
					runQueueCallback( callbacks );
				}
				else {
					var pCashRaceGuide = new CashRaceOpenGuide( callbacks );
					RockN.GameScene.addChild( pCashRaceGuide, RockN.GLOBAL_ORDER.POPUP );
				}

            } );
        }

        if( "onBetUnlock" === signal ) {
            self._queueCallback.push( function( callbacks ) {
                var _scene = RockN.GameScene;
                if( _scene.hasOwnProperty( "slotMenu" ) && typeof _scene.slotMenu.playUnlockBetAnimation === "function" ) {

                    _scene.slotMenu.playUnlockBetAnimation();
                }


                if( !!callbacks && callbacks.length > 0 ) {
                    var callback = callbacks.splice( 0, 1 );
                    (callback[ 0 ])( callbacks );
                }
            } );
        }

		if( "onCheerUp" === signal ) {
            cc.log("[System] onCheerUp data >>  ", JSON.stringify( event_data, null, -2 ) );
			if( event_data.totalBonus > 0 ) {
				self._queueCallback.push( function( callbacks ) {
					newIAACtrl.requestInfo(function(){
						var pLayer = new CheerUpLayer( event_data, callbacks );
						RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP );
					});
				} );
			}

			// 스핀 시 빅 스페셜 오퍼 이벤트를 onCheerup 을 통해 받음.
			if( !!event_data.bigSpecialOffer  ) {
				RNCSale.Controller.getModel().setSaleData( RNCSale.SaleType.BIG_SPECIAL_OFFER, event_data.bigSpecialOffer );

				self._queueCallback.push( function( callbacks ) {

					// 스페셜 오퍼 데이터가 없을때만, 빅스페셜 오퍼 팝업 단독으로 노출
					function showBigSpecialOfferPopup( data, callbacks ) {
						if( !data.specialOffers ) {
							var popup = new RNCSale.View.SpecialOfferPopup( RNCSale.SpecialOfferType.BIG, null, callbacks );
							RockN.GameScene.addChild( popup, RockN.GLOBAL_ORDER.POPUP );
						}
						else {
							runQueueCallback( callbacks );
						}
					}

					var enableBSOffer 	= RNCSale.Controller.getModel().enableSaleOffer( RNCSale.SaleType.BIG_SPECIAL_OFFER ); 	// 빅스페셜 오퍼 가능한 상황인가
					var iconNode 		=  RNCSale.Controller.getIcon( RNCSale.SaleType.BIG_SPECIAL_OFFER );				// 빅스페셜 오퍼 아이콘 존재하는가

					if( enableBSOffer ) {
						if( !isValidObject( iconNode ) ) {
							RNCSale.Controller.createRNCSaleIcon( RNCSale.SaleType.BIG_SPECIAL_OFFER, function() {
								RNCSale.Controller.startShowProcess();
								showBigSpecialOfferPopup( event_data, callbacks );
							});
						}
						else {
							showBigSpecialOfferPopup( event_data, callbacks );
						}
					}
					else {
						runQueueCallback( callbacks );
					}

				} );
			}

			if( !!event_data.specialOffers ) {

				self._queueCallback.push( function( callbacks ) {
					var saleType = RNCSale.Controller.enableSaleTypeOnSpecialOffer();
					if( saleType < 0 ) {
						var popup = new RNCSale.View.SpecialOfferPopup( RNCSale.SpecialOfferType.NORMAL, event_data.specialOffers, callbacks );
						RockN.GameScene.addChild( popup, RockN.GLOBAL_ORDER.POPUP );
					}
					else {
						RNCSale.Controller.showSalePopupOnSpecialOffer( saleType, callbacks, function( callback ){
							cc.log("[System] onCheerUp >> SpecialOfferLayer " );
							var popup = new RNCSale.View.SpecialOfferPopup( RNCSale.SpecialOfferType.NORMAL, event_data.specialOffers, callback );
							RockN.GameScene.addChild( popup, RockN.GLOBAL_ORDER.POPUP );
						});
					}
				} );

				if( RockN.Capability.isInAppAdSupported() && 			// 캔버스에서는 광고 관련 컨텐츠 막음 ( 클라에서 처리함 )
					event_data.inAppAdsAvailable === true &&
					event_data.totalBonus <= 0 ) {

					cc.log("[System] onCheerUp >> AdsWatchPopup"  );
					self._queueCallback.push( function( callbacks ){
						var claimPopup = new AdsWatchPopup( newIAADefines.AD_TYPE.CHEER_UP, callbacks );
						RockN.GameScene.addChild( claimPopup, RockN.GLOBAL_ORDER.POPUP );
					});
				}
			}


			//[계정연동보상강화방안] CheerUp 신규 연동 보상 팝업 가이드 (Link Your Account! & Get Reward)
			var ACCOUNT_CONNECT_COOLTIME_CHEERUP = 120 * 60 * 60 * 1000;  //120시간
			var isAccountConnectCoolTimeExpired = (new Date()).getTime() - getLocalItem(LOCAL_ITEMS.SHOW_NEW_ACCOUNT_CONNECT_GUIDE_CHEERUP) > ACCOUNT_CONNECT_COOLTIME_CHEERUP;
			if (isAccountConnectCoolTimeExpired &&
				!MobileLoginCenter.isLinkedAccount() &&		//한번이라도 연동한적이 없어야한다.
				RockN.Player.grade >= RockN.ClassType.DIAMOND &&
				!FacebookDataManager.getInst().isInterlock() &&
				RockN.GuestPlayer &&
				!RockN.MergedGuest
				){
				self._queueCallback.push( function( callbacks ) {
					var popup = new encourageNewAccountConnectLogin(callbacks);
					RockN.GameScene.addChild(popup, RockN.GLOBAL_ORDER.POPUP);
					setLocalItem(LOCAL_ITEMS.SHOW_NEW_ACCOUNT_CONNECT_GUIDE_CHEERUP, (new Date()).getTime());
				} );
			}
			// 페이스북 접속 이력이 없고 게스트 유저일 경우 페이스북 유도
			// special offer 에서 구입을 안했을 경우 띄어준다.
			else if( !FacebookDataManager.getInst().isInterlock() && RockN.GuestPlayer && event_data.totalBonus > 0 ) {
				self._queueCallback.push( function( callbacks ) {
					if( RockN.SpecialOfferPurchase  ) {
						RockN.SpecialOfferPurchase = false;
						runQueueCallback( callbacks );
					} else {
						var fbType = RockN.FBConnect.FBPopupType.FREE_COINS;
						var pLayer = new EncourageFacebookLogin( callbacks, fbType );
						RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP );
					}
				} );
			}
		}

		/**
		 * 항상 가장 마지막에 위치하여하 한다.
		 * */
		if( "onSetFlashDeal" === signal ) {
            self._queueCallback.push(function (callbacks) {

                clog('****[onSetFlashDeal]**** signal Data ', JSON.stringify(event_data));
                if (checkRateUsView() === true && event_data.afterSuperWin === true && false === RockN.GameScene.isLobby) {
					cc.log(" check rate us ");
					if(RockN.Platform.isInstant() || RockN.Platform.isCanvas()){
						runQueueCallback(callbacks);
					}
                	else {
						var pLayer = new RateUsLayer(callbacks);
						RockN.GameScene.addChild(pLayer, RockN.GLOBAL_ORDER.POPUP);
					}

                } else if (self.checkShowLike() === true
					&& event_data.afterSuperWin === true
					&& false === RockN.GameScene.isLobby
					&& event_data.likeUsAvailable === true) {
                    cc.log(" checkShowLike ");
					if(RockN.Platform.isInstant()){
						//인스턴트의 경우 아무것도 하지 않고 콜백실행..
						runQueueCallback(callbacks);
					}
					else {
						setLocalItem(LOCAL_ITEMS.SHOW_LIKE_LOBBY_POPUP, String(Date.now()));
						setLocalItem(LOCAL_ITEMS.SHOW_LIKE_POPUP, String(Date.now()));

						var pLayer = new LikeUsPopup(callbacks);
						RockN.GameScene.addChild(pLayer, RockN.GLOBAL_ORDER.POPUP);
					}
                } else {
                    RNCSale.Controller.getModel().requestSetFlashDeal( function( res){
                        if( res['available'] === true ) {  // 응답이 true 일 때만 데이터 세팅
                            var loc_saleType = RNCSale.SaleType.FLASH_DEAL;
                            RNCSale.Controller.getModel().setSaleData( loc_saleType, res );
                            var loc_data = RNCSale.Controller.getModel().getSaleData( loc_saleType );

                            if ( RNCSale.Controller.getModel().enableSaleOffer( loc_saleType )) {

                                RNCSale.Controller.createRNCSaleIcon( loc_saleType, function(){
                                    RNCSale.Controller.startShowProcess();
                                } );

                                var flashDealType = loc_data.dealType;
                                var  popup;

                                if( flashDealType === RNCSale.FlashDealType.FIRST_PURCHASE_OFFER ) {
                                    popup = new RNCSale.View.FirstOfferPopup( callbacks );
                                    RockN.GameScene.addChild( popup, RockN.GLOBAL_ORDER.POPUP );
                                }
                                else if( flashDealType === RNCSale.FlashDealType.FLASH_SALE ) {
                                    popup = new RNCSale.View.FlashSalePopup( callbacks, false );
                                    RockN.GameScene.addChild( popup, RockN.GLOBAL_ORDER.POPUP );
                                }
                                else {
                                    RockN.Assert( "invalid flash deal type " + flashDealType );
                                    runQueueCallback( callbacks );
                                }

                            }
                            else {
                                runQueueCallback( callbacks );
                            }
                        }
                        else {
                            runQueueCallback( callbacks );
                        }
                    }, false );
                }
            });
		}

        if ("on5LevelUp" === signal) {
            if (!!event_data.reward.coin) {
                RockN.Player.addCollectRemainReward("remain_5Level", event_data.level, event_data.reward.coin);
            }

			MusicBox.Controller.reserveGetCardPackBy5LvlBonus(true);

            if( event_data.level === 5 || event_data.level === 10 ) {
                LogHandler.getInst().sendEvent( LogHandler.EVENT.FIVE_LEVEL_BONUS_POPUP );
            }

            self._queueCallback.push(function (callbacks) {
                var pLayer = new FiveLevelUpBonusPopup(event_data, callbacks);
                RockN.GameScene.addChild(pLayer, RockN.GLOBAL_ORDER.POPUP);
            });

        }

        if ("onSpecialBonus" === signal) {

            self._queueCallback.push(function (callbacks) {
                var pLayer = new SpecialBonusPopup(event_data, callbacks);
                RockN.GameScene.addChild(pLayer, RockN.GLOBAL_ORDER.POPUP);
            });

        }

        if( "onEventAvailable" === signal ) {
            //  Get all event
            self._queueCallback.push( function( callbacks ) {
                RockN.Player.getAllEventInfo( function() {
                    runQueueCallback( callbacks );
                } )
            });
		}

		//뮤직박스 7레벨때 오픈 처리
		if( "onMusicBoxOpen" === signal ) {
            // if(!!event_data.musicBoxInfo && !!event_data.musicBoxInfo.betRanges){
            //     MusicBox.Controller.getMusicBoxModel().betRanges = event_data.musicBoxInfo.betRanges;
            // }
			//Mbox 13 packMaker정보
			RockN.GlobalEvent.broadcast( EVT.SYSTEM_ICON.ON_RECEIVED_ICON_EVENT, SystemIcon.Order.MUSIC_BOX );

			if( !!event_data.musicBoxInfo ){
				MusicBox.Controller.getMusicBoxModel().setPackMakerInSlotInfo(event_data.musicBoxInfo);
			}
			MusicBox.Controller.onMusicBoxOpen( self._queueCallback);
		}

        if( "showSlotMergeGuide" === signal ){
            self._queueCallback.push( function(callbacks){
                var pLayer = new SlotMergeGuide( callbacks );
                RockN.GameScene.addChild( pLayer, RockN.GLOBAL_ORDER.POPUP);
            });
        }

        if( "onAddCashBack" === signal ) {
            self._queueCallback.push( function(callbacks){
                RockN.GlobalEvent.broadcast( EVT.M_PASS.PASS_CASHBACK_UPDATE, {
                    cashBackInfo : event_data.cashBackInfo
                });
                runQueueCallback( callbacks );
            });
        }

        if( "notEnoughMoney" === signal ) {
            self._queueCallback.push( function( callbacks ){
				RockN.onChangeYourBet( { sourceType : 'slot_idle' }, callbacks );
            });
        }

        if( "onGetCube" === signal ) {
            var getCubeFunc = function( callbacks ) {
				RockN.GlobalEvent.broadcast( EVT.SYSTEM_ICON.ON_RECEIVED_ICON_EVENT, SystemIcon.Order.CUBE );
                RNCCube.Controller.showSelectPopup( event_data, callbacks );
            }
			// onFeature idle 에 불릴 큐콜백에도 등록
			self._featureQueueCallback.push( getCubeFunc );
        }

		if( "onDailyRushProgress" === signal ) {
			if( event_data.tutorialAvailable === true  ) {
				RNCDailyRush.Controller.setFirstMissionComplete( true );
			}

			if( RNCDailyRush.Controller.isFirstMissionComplete() ) {
				self._queueCallback.push( function ( callbacks ) {
					RNCDailyRush.Controller.getModel().initAllMissionInfo( event_data );

					RockN.GlobalEvent.broadcast( EVT.DAILY_RUSH.UPDATE_ICON );
					RockN.GlobalEvent.broadcast( EVT.DAILY_RUSH.UPDATE_MAIN_UI );

					RockN.GlobalEvent.broadcast( EVT.SYSTEM_ICON.ON_RECEIVED_ICON_EVENT, SystemIcon.Order.DAILY_RUSH );
					RNCDailyRush.Controller.showIconPopup( callbacks );

				});
				self._queueCallback.push( function ( callbacks ) {

					RNCDailyRush.Controller.showMainUI( callbacks );
				});
			}
			else {
				self._queueCallback.push( function( callbacks ){
					RNCDailyRush.Controller.runDailyRushDataQueueCallback( event_data, callbacks );
				});
			}
		}

		if( "onReceivedPackMakerReward" === signal ){
			if(RockN.GameScene.getSceneType() === RockN.SceneType.SLOT) {
				MusicBox.Controller.setPackMakerRewardData(event_data);
				self._queueCallback.push(function ( callbacks ){
					MusicBox.Controller.playPackMaker(
						function(){
							runQueueCallback(callbacks);
						});
					});
			}
		}

		if( "onReceivedLeagueEmblem" === signal ) {
			self._queueCallback.push(function (callbacks) {
				// event_data = {
				// 		emblemType : number,
				// 		points     : number
				// }
				var loc_data = event_data;

				if (loc_data.slotID === RockN.GameScene.GAME_ID) {
					// 매 스핀 이후 레이스쪽 디비전 정보 갱신
					// 스테이지 포인트 업데이트
					RockN.GlobalEvent.broadcast(EVT.SLOT_SUPER_STAR.REFRESH_RACE_STAGE_UI, loc_data);

					// cc.log( RNC3S.Tag, " ### onReceivedLeagueEmblem : ", loc_data);
					if (loc_data.emblemType !== RNC3S.SymboleType.NONE) {
						var ptStartWorld = RockN.UIUtil.getScreenCenterPos();
						RNC3S.Controller.playGetEmblemAnimation(loc_data, ptStartWorld, function () {
							RockN.GlobalEvent.broadcast(EVT.SLOT_SUPER_STAR.ON_ARRIVED_EMBLEM);
						});
					}
				}

				runQueueCallback(callbacks);

			});

			// crash issue
			// https://www.notion.so/playlinks/A-B-1a5cfb05343680369a85f55586ad61ac?pvs=4
			var emblemFunc = self._queueCallback[self._queueCallback.length - 1];
			emblemFunc.__name = "emblemFunc";
		}

		if( "onLeagueOpen" === signal ) {
			cc.log( RNC3S.Tag, " ### player.onLeagueOpen : ", event_data );

			// todo event_data.level 리그 오픈된 레벨 ... 사용 용도
			RNC3S.Controller.getModel().setEmblemData( event_data.leagueInfo );

			self._queueCallback.push( function( callbacks ){
				RNC3S.Controller.getModel().requestMainData( function(){
					RNC3S.Controller.getModel().requestShopData( function () {
						RNCWeeklyClash.Controller.onConfigDataUpdate();
						RNC3S.Controller.showDivisionOpenUI( callbacks );
					}, false);
				});
			})
		}
	},

    sortCallbackArray : function() {
        // step1. priority 오름차순으로 배열 정렬
        this._priorityFuncArray.sort( function( a, b ){
            return a.priority - b.priority;
        });

        // step2. 콜백 큐에 있는 함수중에 priority 배열에 있는 함수는 삭제.
        // _queueCallback 원본 수정
        var i, key, findIdx, priorityArray = [];
        for( i = 0; i < this._priorityFuncArray.length; ++i ) {
            key = this._priorityFuncArray[i].func;
            findIdx = this._queueCallback.indexOf( key );
            if( findIdx > -1 ) {
                this._queueCallback.splice( findIdx, 1 );
                priorityArray.push( key );
            }
        }

        // step3. 수정된 _queueCallback 배열 첫번째에 sorting 된 우선순위 배열을 추가.
        // _queueCallback 원본을 수정하여 reference 유지하도록 한다.
        // https://stackoverflow.com/questions/1348178/a-better-way-to-splice-an-array-into-an-array-in-javascript
        Array.prototype.splice.apply( this._queueCallback, [0,0].concat( priorityArray ) );

        // step4. 우선순위 함수 큐 초기화
        this._priorityFuncArray.length = 0;
    },

	onFeatureIdle : function( callback ) {
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_FEATURE_IDLE, callback );

		if( !RNCInSlotMeta.USE_NEW_SLOT_IDLE ) {
			callback &&	this._featureQueueCallback.push(callback);
			runQueueCallback( this._featureQueueCallback );
		}
	},

	onSlotIdle : function( callback ) {
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_SLOT_IDLE, callback );

		if( !RNCInSlotMeta.USE_NEW_SLOT_IDLE ) {
			// 매 슬롯 아이들마다 캐시레이스 보상 및 승급 팝업 체크 후 등록
			RNC3S.Controller.onSlotIdle( this._queueCallback );

			// 호출시 마지막 콜백 등록
			!!callback && this._queueCallback.push( callback );

			// onFeature callback이 남아있으면 초기화
			var self = this;
			this.onFeatureIdle( function() {
				self.sortCallbackArray();
				RockN.DeepLink.checkReferrer( self, self._queueCallback, function() {
					runQueueCallback( self._queueCallback );
				});
			});

			//todo test PostSpinEventHandler 테스트를 위한 코드. slotIdleResolver 가 적용되고 나면 삭제해야 함.
			RNCInSlotMeta.PostSpinEventHandler.resetEventData();
		}
	},

	//베팅변경 알림 (Global)
	onSlotBetChanged: function(totalBet, betIdx, totBetIdx, byUser) {
		RockN.GlobalEvent.broadcast( EVT.SLOT_LIFECYCLE.ON_CHANGE_BET, totalBet );

		//뮤직박스
		MusicBox.Controller.onSlotBetChanged(totalBet, betIdx, totBetIdx, byUser);

		//Slot Super Star
		RNC3S.Controller.onSlotChangeBet( totalBet, betIdx, totBetIdx, byUser );
	},

	setInVipMode : function (vipMode) {
		this.inVipMode = vipMode;
    },

	getInVIPMode : function() {
		return this.inVipMode;
	},

    /**
     * Podong 신규추가
     */
    getBalance : function () {
    	return this._balance;
	},

    //region [ RStone ]
    getLocalRStone : function() {
        return this._localRStone;
    },

    getServerRStone : function() {
        return this._serverRStone;
    },

    updateLocalRStone : function( addedCount ) {
        this._localRStone += addedCount;
        cc.log("[R-Stone] *** updateLocalRStone *** : ", addedCount, this._localRStone );
    },

    updateServerRStone : function( rStoneCount ) {
        this._serverRStone = rStoneCount;
        cc.log("[R-Stone] *** updateServerRStone *** : ", this._serverRStone );
    },

    checkRStoneSync : function() {
        if( this._localRStone !== this._serverRStone ) {
            cc.log("%c %s %s %s", "color:#FFAAAA", "[R-Stone] ", "!! Check R-Stone(local , server) : " + this._localRStone + " , " + this._serverRStone );
            RockN.Assert("!! Check R-Stone(local , server) : " + this._localRStone + " , " + this._serverRStone );
        }
        else {
            cc.log("%c %s %s %s", "color:#00FFFF", "[R-Stone] ", " R-Stone Sync Success : " + this._localRStone + " , " + this._serverRStone );
        }
    },

    /** 서버로부터 RStone 변경되어 onSyncRStone 이벤트 왔을 경우*/
    onSyncRStone : function( data ) {
        cc.log(RNCCube.Tag, "[R-Stone] *** onSyncRStone *** : ", JSON.stringify( data ) );
        this.updateServerRStone( data.rStone );
    },

    //endregion

    getPlayerName : function( isShort ){
    	return this.name;
    },

	//region Fanpage( Like us )

    /**
	 * @BJ FanPage ( Like us )
	 * fanPage 유도 팝업 등장 조건
	 * [ In Game ]
	 * 	- SuperWin 이 발생했을 때, 해당 팝업 닫은 후에
	 * 		- 이전 펜페이지유도팝업 나오고 3시간 30분이 지났을 경우
	 * 		- 5 레벨 이상 Rate Us 가 나오는 조건이면 등장 안함.
	 *
	 * [ 초기 시퀀스 in Lobby ]
	 * 		- Daily Stamp 직후,
	 * 		- 딜레이 시간 : 48 시간
	 *
	 * [게스트 유저]
	 * 		- 게스트 유저에게도 해당 팝업 출력
	 * 		- 누를 경우 펜페이지 브라우저로 연결 ( webView 가 아닌 )
     */
	checkLikeusLobbyPopup : function (){
		var elapsedIntervalUtil = new RockN.Util.ElapsedIntervalUtil();
		return elapsedIntervalUtil.isPassTime( LOCAL_ITEMS.SHOW_LIKE_LOBBY_POPUP,
											   LOCAL_ITEMS.SHOW_LIKE_LOBBY_POPUP_INTERVAL );
	},

	checkShowLike : function () {
		if (RockN.Platform.isInstant())		//rnc instance (인스턴트는 라이크팝업 안띄우기)
			return false;

        // cc.log( " checkShowLike");
        if( (RockN.GameScene.getTypeOfScene() === SCENE_TYPE.SLOT) &&
            Date.now() - Number( getLocalItem( LOCAL_ITEMS.SHOW_LIKE_POPUP ) ) < RockN.LIKE_US_TIME_INTERVAL ) {
            // cc.log("팝업을 본 후 쿨타임 이상이 지났을 경우 (3 시간 30분(슬롯)" , (RockN.LIKE_US_TIME_INTERVAL- (Date.now() - Number( getLocalItem( LOCAL_ITEMS.SHOW_LIKE_POPUP ))))/1000 , "초 남음 " );

            return false;
        }
		else if(RockN.GameScene.getTypeOfScene() === SCENE_TYPE.LOBBY &&
				this.checkLikeusLobbyPopup() === false){
			return  false;
		}
        else if( getLocalItem( LOCAL_ITEMS.VISIT_FANPAGE_IN_MOBILE ) === 'false' ) {
            // cc.log("펜페이지를 방문한 적이 없는 경우");
            return true;
        }
        else if( RockN.Player._getBinaryStatus( Defines.BINARY_STATUS.SHOW_LIKE ) === false ) {
            // cc.log(" 서버에서 받은 Binaray Status 에서 SHOW_LIKE 가 false 인 경우 ");
            return true;
        }
        else if( getLocalItem( LOCAL_ITEMS.SHOW_LIKE_POPUP ) === "0" ) {
            // cc.log("로컬 데이터에 SHOW_LIKE_POPUP 가 초기값(0)인 경우 : SHOW_LIKE_POPUP ( 팝업이 본 시간이 저장)");
            return true;
        }
        else {
            return false;
        }
    },

	//endregion

	//region [ Utils ]
    isFirstSlotGame : function() {
        return !this._getBinaryStatus( Defines.BINARY_STATUS.SLOT_TUTORIAL );
    },

    haveSeenWelcomeLayer : function() {
		// cc.log("hasSeenWelcomeLayer : ", this._getBinaryStatus( Defines.BINARY_STATUS.SHOW_WELCOME_POPUP ) );
		return this._getBinaryStatus( Defines.BINARY_STATUS.SHOW_WELCOME_POPUP );
    },

    isVip : function() {
        return RockN.Player.grade >= RockN.ClassType.VIP;
    },

    isCompleteClickSpin : function() {
        return this._getBinaryStatus( Defines.BINARY_STATUS.GUIDE_SPIN_CLICK );
    },

    isCompleteGoLobby : function() {
        return this._getBinaryStatus( Defines.BINARY_STATUS.COMPLETE_GO_LOBBY );
    },

	isMaxClassUser : function() {
		return this.grade === ( RockN.ClassType.MAX -1 );
	},

	// 실제로는 골드 클래스이지만 1레벨은 welcome 클래스로 보여주기 위한 체크
    isNoneClassUser : function() {
        // 2레벨 골드 클래스 업 위함.
        return this.grade === RockN.ClassType.GOLD && this.level === 1;
    },

    hasVipFreePass : function() {
        if( this.vipFreePassEndMS <= 0 ) {
            return false;
        }

        var timeInMs = Date.now();
        return this.vipFreePassEndMS > timeInMs;
    },

    isAvailableShopBonus: function() {
        if( this.shopBonusReceiveCount === -1 || this.shopBonusReceiveCount > 5 ) {
            return false;
        }

        return this.getRemainBonusShopTime() === 0;
    },

	setUnifiedDeepLink : function (){
		if (this._unifiedDeeplinkAlreadySent === true)
			return;

		var unifiedDeepLink = RockN.Platform.getUnifiedDeepLink();

		if (unifiedDeepLink != null &&
			unifiedDeepLink != "{}" &&
			unifiedDeepLink != "" )
		{
			this._unifiedDeeplinkAlreadySent = true;
			RockN.NET.request("connector.entryHandler.updateUnifiedDeepLink", {
				playerID: this.playerID,
				unifiedRef: unifiedDeepLink,
			}, function (result) {

			});
		}

	},

	setDeferredDeepLink : function() {
        cc.log( '>>>>>>>>>>> deferred deep link' + g_JSB().getDeferredDeepLink() );

		//Unified Deeplink 보내기
		this.setUnifiedDeepLink();

		if( true === RockN.Player._getBinaryStatus( Defines.BINARY_STATUS.SET_DEFERRED_DEEP_LINK ) ) {
			return;
		}

        var link = g_JSB().getDeferredDeepLink();

        if( link !== '{}' ) {
        	try {
        		var linkObj = JSON.parse( link );

                var userInfo = RockN.getUserInfo();
                var mediaSource = linkObj.media_source || '';
                var campaign = linkObj.campaign || '';
                var advertisingAgency = linkObj.agency || 'organicInstall';
				cc.log(" [ Invite ] af_sub :  ", linkObj.af_sub1 );

                RockN.NET.request( "connector.entryHandler.updateMobileReferral", {
                    playerID : this.playerID,
                    userInfo : userInfo,
                    mediaSource : mediaSource,
					campaign : campaign,
                    advertisingAgency : advertisingAgency,
					af_sub1 : linkObj.af_sub1
                }, function( result ) {

                } );
			} catch( e ) {
				cc.error( '[Player] setDeferredDeepLink error!' );
			}
		}
    },

    isCashraceOpened: function () {
        return this._isCashraceEnable;
    },

    isBroadcastOpened: function () {
        return this._isBroadCastEnable;
    },

    /**
     * getall event data
     */
    getAllEventInfo : function(cb){
        var self = this;
        RockN.NET.request( 'connector.gameHandler.getAllEventInfo', {
            playerID: RockN.Player.playerID
        }, function( res ) {
            cc.log('getAllEventInfo',JSON.stringify(res));
            if (res.code === RockN.CODE.OK) {
                if ( !!self === true  ){
					self.scratchInfo = res['scratchInfo'];
					self.scratchInfo.time.startTime = Date.now();

                    newIAACtrl.setData( res.iaaInfo );//newIAA 작업

                    // 일회성 이벤트
                    RNCOneTimeEvent.Contoller.setData( res['oneTimeEvent'] );

					// 크리스마스 카드 이벤트
					ChristmasEvent.isSeasonInLocal = res['christmasCardEvent']['isAvailable'];

					//누적 결제 보상
					CumulatePurchase.Controller.setEventData(res['cumulativePurchase']);

					//맵버쉽 All Open 이벤트
					MembershipPass.Controller.getModel().setEventData(res['membership']);

					// res['crash']
					RNCCrashGameEvent.Contoller.setData(res['crash']);
                }

                !!cb && cb();
            }
        });
    },

    confirmProfileIcons : function(){
        if( this.unconfirmedProfileList.length <=0 )
            return;

        RockN.Player.unconfirmedProfileList = [];
    },

	// upgradeProfileImage : function( index , callback ){
	//
	// 	var targetUrl = RockN.Profile.upgradeProfileUrl(this.pictureUrl, index);
	// 	if (targetUrl){
	// 		RockN.NET.request('connector.gameHandler.request', {
	// 			protocol: SIG.SIG_UPDATE_GUEST_PICTURE_URL,
	// 			playerID: RockN.Player.playerID,
	// 			pictureUrl:targetUrl
	// 		}, function (result) {
	// 			if (result.code === RockN.CODE.OK) {
	// 				RockN.Player.pictureUrl = targetUrl;
	// 				if( Player.GuestPlayer === false )
	// 					window.facebook.me.pictureUrl = targetUrl;
	// 				RockN.NavigationMenu.refreshProfile();
	// 			}
	// 		});
	// 	}
	// 	else{
	// 		callback && callback();
	// 	}
	// },

	isSocialRoom:function(){
		return this._isSocialRoom;
	},
	onEnterSocialRoom:function(){
		this._isSocialRoom = true;
	},
	onExitSocialRoom:function(){
		this._isSocialRoom = false;
	},

	//region [ class( grade ) ]
	getCurrentClass : function() { return this.grade; },

	getCurrentClassPoint : function() { return this.classPoint; },

	getRemainPointToNextClass : function() { return this.classData['next_point']; },
	//endregion

	//region [ level ]
	getCurrentLevel : function() { return this.level; },

	getTotalLevelExp : function() { return this.totalExp; },

	getCurrentLevelStartExp : function() { return this.prevLevelExp; },

	getNextLevelStartExp 	: function() { return this.nextLevelExp; },
	//endregion

	getTotalLikeCount : function() { return this.fameCount; },

	getPictureURL : function() { return this.pictureUrl; },

	setPictureURL : function( url ) {
		this.pictureUrl = url;
	},

	//region [ bonus multiply ]
	getShopClassMultiply : function () {
		return !!this.classData ? this.classData.shopMultiply : RockN.Config.getShopMultiply( this.grade );
	},

	getBonusClassMultiply : function () {
		return !!this.classData ? this.classData.multiply : RockN.Config.getBonusMultiply( this.grade );
	},

	getBonusNextClassMultiply : function () {
		if(this.grade + 1 < RockN.ClassType.MAX) {
			return RockN.Config.getBonusMultiply(this.grade + 1);
		}
		else {
			return RockN.Config.getBonusMultiply(RockN.ClassType.MAX - 1);
		}
	},

	getBonusDivisionMultiply : function() {
		return RNC3S.Controller.getModel().getMyBonusMultiple();
	},

	getPurchaseBonusMultiple : function (){
		return RNC3S.Controller.getModel().getMyPurchaseBonusMultiple();
	},

	// division + class
	// 소수점 2자리 버림 처리
	getTotalBonusMultiply : function() {
		var classMulti    = this.getBonusClassMultiply();
		var divisionMulti = this.getBonusDivisionMultiply();

		var total = parseFloat( classMulti + divisionMulti );
		// 소수점 2자리 버림 처리
		total = Math.round(total * 100 ) / 100;
		total = total.toFixed(2);

		return total;
	},

	// 현재 클래스에 대한 전체 샵 배수
	getTotalShopBonusMultiply : function () {
		var shopMulti 	= this.getShopClassMultiply();
		var divisionMulti = this.getPurchaseBonusMultiple();

		var total = shopMulti + divisionMulti; //parseFloat( shopMulti + divisionMulti );
		return Math.round( total * 100 ) / 100;
	},

	// 특정 클래스에 대한 전체 샵 배수
	getTotalShopBonusMultiplyByClass : function( grade ) {
		var classMulti = RockN.Config.getShopMultiply( grade );
		var divisionMulti = this.getPurchaseBonusMultiple();

		var total = classMulti + divisionMulti; //parseFloat( classMulti + divisionMulti );
		return Math.round( total * 100 ) / 100;
	},

	//endregion

	/**
	 * add Callback Func at state SlotIdle
	 * @param func : callback
	 * @param priority : SLOT_IDLE_CALLBACK_ORDER
	 */
	addPriorityFuncArray :function (func,  priority  ) {
		this._queueCallback.unshift(func);
		if(!!priority) {
			this._priorityFuncArray.push({
				priority: priority,
				func: func
			});
		}
	}

} );