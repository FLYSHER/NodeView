/**
 * Created by Soo on 2016. 3. 21..
 * Edit by James on 2016. 09. 01..
 */

window.HTTP_METHOD = {
	'GET'    : 'get',
	'POST'   : 'post',
	'DELETE' : 'delete'
};

window.PERMISSION_PROFILE  = 'public_profile',
window.PERMISSION_FRIENDS  = 'user_friends',
window.PERMISSION_EMAIL    = 'email',
window.PERMISSION_BIRTHDAY = 'user_birthday',
window.PERMISSION_PUBLISH  = null;// 'publish_actions';

window.IS_SUCCEED = 0;

window.PUBLISH_ACTION_REQUEST_COUNT = 0;

window.g_appRequest = function( info, callback ) {
	if( !info ) {
		typeof callback === 'function' && callback( 1, {
			error_message : "No info parameter provided"
		} );
		return;
	}

	var locRequestType = info['type'] || 'invite';
	delete info['type'];

	info[ 'method' ] = "apprequests";

	FB.ui( info, function( response ) {
			if( response ) {
				// 취소 하고 다시 선물 보낸 경우 창이 한 번 더 뜨는 버그 때문에 취소하더라도 선물 보낸 것으로 처리
				// 2019.07.19 @OBG

				if( response[ 'error_code' ] && info['action_type'] !== 'send' ) {
					typeof callback === 'function' && callback( response[ 'error_code' ], {
						error_message : response[ 'error_message' ] || 'Unknown error'
					} );
				}
				else {
					typeof callback === 'function' && callback( 0, response );
					if( locRequestType === 'invite' ) {
						RockN.GameScene.receiveActionFeedback( 2 );
					}
					else if( locRequestType === 'sendGift' ) {
						RockN.GameScene.receiveActionFeedback( 1 );
					}
				}
			}
			else {
				typeof callback === 'function' && callback( 1, {
					error_message : "Unknown error"
				} );
			}
		}
	);
}

window.g_sendGift = function(map, cb, target, doFeedbackAction ) {
	g_appRequest(map, function(result, msg){
		if (target != null){
			cb.call(target, result===0, msg.request);
		}
		else {
			cb.call(null, result===0, msg.request);
		}

		if( true === doFeedbackAction ) {
			RockN.GameScene.receiveActionFeedback( 1 );
		}
	});
}



window.g_deleteAppRequest = function( id, cb, target ) {
	g_api( id, HTTP_METHOD.DELETE,function( type, msg ) {
		if (target == null){
			target = null;
		}
		if (type === IS_SUCCEED)
		{
			cb.call(target, null, true);
		}
		else {
			cb.call(target, msg.message, false);
		}
	} );
}



window.g_api = function( path, method, params, callback ) {
	if( typeof params === 'function' ) {
		callback = params;
		params   = {};
	}

	/**
	 * 페이스북 정책 대응으로 dialog 를 사용하던 부분을 원래로
	 */
	if( "/me/feed" === path ) {
		if( cc.screen.fullScreen() ) {
			cc.screen.exitFullScreen();
		}

		// if( RockN.GameScene ) {
		//     SingleGrayLayer.getInst().detach( RockN.GameScene );
		//     RockN.GameScene.gameResume();
		// }

		FB.ui( {
			method: 'feed',
			link: params[ 'link' ]
		}, function( response ) {
			if( response && !response.error_message ) {
				typeof callback === 'function' && callback( 0, response );
				RockN.GameScene.receiveActionFeedback( 0 );
			} else {
				typeof callback === 'function' && callback( response[ 'error_code' ], {
					error_message: response[ 'error_message' ] || 'Unknown error'
				} );
			}
		} );

		return;
	}

	var locPath = path;

	if( window.facebook.accessToken ) {
		var strParams = '';
		for( var key in params ) {
			if (params[ key ] != null)
				strParams += key + '=' + params[ key ] + '&';
		}
		strParams += 'access_token=' + window.facebook.accessToken;

		var host  = 'https://graph.facebook.com';
		var query = '/' + SERVER_CONFIG.FB_GRAPH_API_VER + path +
			'?' + strParams;

		cc.log( '[g_api] query: ' + query );
		$.get( host + query, function( response ) {
			if( response.error ) {
				typeof callback === 'function' && callback( response[ 'error' ][ 'code' ], {
					error_message : response[ 'error' ][ 'message' ] || 'Unknown error'
				} )
			}
			else {
				typeof callback === 'function' && callback( 0, response );

				if( locPath === '/me/feed' ) {
					RockN.GameScene.receiveActionFeedback( 0 );
				}
			}
		} );
	} else {
		if( window.facebook.authResponse.accessToken ) {
			params.access_token = window.facebook.authResponse.accessToken;
		}

		FB.api( path, method, params, function( response ) {
			if( response.error ) {
				typeof callback === 'function' && callback( response[ 'error' ][ 'code' ], {
					error_message : response[ 'error' ][ 'message' ] || 'Unknown error'
				} )
			}
			else {
				typeof callback === 'function' && callback( 0, response );

				if( locPath === '/me/feed' ) {
					RockN.GameScene.receiveActionFeedback( 0 );
				}
			}
		} );
	}
}


window.g_pay = function( info, callback ) {
	/*
     * Reference document
     * https://developers.facebook.com/docs/payments/reference/paydialog
     */
	info[ 'method' ] = 'pay';
	info[ 'action' ] = 'purchaseitem';

	FB.ui( info, function( response ) {
		if( response ) {
			if( response[ 'error_code' ] ) {
				callback( response[ 'error_code' ] || 1, {
					error_message : response[ 'error_message' ] || response[ 'error_msg' ] || 'Unknown error'
				} );
			}
			else {
				callback( 0, response );
			}
		} else {
			callback( 1, { error_message : 'Cancel a purchase' } );
		}
	} )
}

window.g_hasPermission = function( permission ) {
	if( cc.isUndefined( window.facebook.permissions ) ) {
		return false;
	}

	for( var i = 0; i < window.facebook.permissions.data.length; i++ ) {
		var locPermission = window.facebook.permissions.data[ i ];
		if( locPermission.permission === permission &&
			locPermission.status === 'granted' ) {
			return true;
		}
	}

	if( permission === PERMISSION_PUBLISH ) {
		PUBLISH_ACTION_REQUEST_COUNT = PUBLISH_ACTION_REQUEST_COUNT + 1;
		PUBLISH_ACTION_REQUEST_COUNT = PUBLISH_ACTION_REQUEST_COUNT % 3;
	}

	return false;
}


window.g_isDeclinedPermission = function( permission ) {
	if( cc.isUndefined( window.facebook.permissions ) ) {
		return false;
	}

	for( var i = 0; i < window.facebook.permissions.data.length; i++ ) {
		var locPermission = window.facebook.permissions.data[ i ];
		if( locPermission.permission === permission &&
			locPermission.status === 'declined' ) {
			return true;
		}
	}

	return false;
}


window.g_requestPermission = function( permission, cb, target ) {
	if( permission === PERMISSION_PUBLISH ) {
		if( target ) {
			cb.call( target, true );
		}
		else {
			cb( true );
		}
		return;
	}

	try {
		if (g_isDeclinedPermission(permission)) {
			FB.login(function (response) {
				//console.log( '## g_requestPermission : ', response );
				if (response.status === 'connected' &&
					response.authResponse.grantedScopes &&
					response.authResponse.grantedScopes.indexOf(permission) !== -1) {
					g_refreshPermission(cb, target);
				} else {
					if (target) {
						cb.call(target, false);
					} else {
						cb(false);
					}
				}
			}, {scope: permission, auth_type: 'rerequest', return_scopes: true});
		} else {
			FB.login(function (response) {
				//console.log( '## g_requestPermission : ', response );
				if (response.status === 'connected' &&
					response.authResponse.grantedScopes.indexOf(permission) !== -1) {
					g_refreshPermission(cb, target);
				} else {
					if (target) {
						cb.call(target, false);
					} else {
						cb(false);
					}
				}
			}, {scope: permission, return_scopes: true});
		}
	}
	catch(e){}
}



window.g_refreshPermission = function( cb, target ) {
	g_api( '/me/permissions', HTTP_METHOD.GET, function( code, permission_res ) {
		if( code === IS_SUCCEED ) {
			window.facebook.permissions = permission_res;

			if( target ) {
				cb.call( target, true );
			}
			else {
				cb( true );
			}
		}
		else {
			//console.log( 'Get permissions have error : ', permission_res.error_message );

			if( target ) {
				cb.call( target, false );
			}
			else {
				cb( false );
			}
		}
	} );
}

//게임서버에 정의된 친구이름을 가져온다.
window.g_fetchFriendsPlayerName = function(cb, target){

	var requestPlayerName = function(friendsFBIDs, cbReqPlayerName, targetReqPlayerName){
		if (friendsFBIDs.length > 0) {

			var LIMIT_FETCH_PLAYER_NAMES = 25;
			var fbids = friendsFBIDs.splice(0, LIMIT_FETCH_PLAYER_NAMES);
			RockN.NET.request('connector.gameHandler.requestPlayerNamesByFBIDs', {
				playerID: RockN.Player.playerID,
				fbids: fbids
			}, function (msg) {
				if (msg.code === RockN.CODE.OK) {
					msg.names.forEach(function (item) {
						for (var i = 0; i < window.facebook.inGameFriends.length; i++) {
							if (window.facebook.inGameFriends[i].id === item.fb_id) {
								window.facebook.inGameFriends[i].playerName = item.name;		//샌드기프트 친구리스트에서 보여줄 친구의 플레이어이름
							}
						}
					});
				}

				if (friendsFBIDs.length > 0)
				{
					requestPlayerName(friendsFBIDs, cbReqPlayerName, targetReqPlayerName);
				}
				else {
					//callback
					if (targetReqPlayerName){
						cbReqPlayerName.call( targetReqPlayerName );
					}
					else{
						cbReqPlayerName && cbReqPlayerName();
					}
				}
			});
		}
		else{
			//callback
			if (targetReqPlayerName){
				cbReqPlayerName.call( targetReqPlayerName );
			}
			else{
				cbReqPlayerName && cbReqPlayerName();
			}
		}
	};

	if( window.facebook.receiveFriendsPlayerName || window.facebook.inGameFriends==null)
	{
		//callback
		if( target ) {
			cb.call( target );
		}
		else {
			cb && cb();
		}
	}
	else
	{

		var allFriendsFBIDs = [];
		for(var i=0; i < window.facebook.inGameFriends.length; i++)
		{
			allFriendsFBIDs.push(window.facebook.inGameFriends[i].id);
		}

		requestPlayerName(allFriendsFBIDs, cb, target);
	}

}

/**
 * g_getInGameFriends - 인게임 친구 목록 로더
 * @param {Function} cb - Callback
 * @param {Object} target - Callback target
 * @param {bool} okWithPartialData - true인 경우 모든 친구들이 로드되지 않아도 현재까지 로드된 친구들만 바로 가져오기
 */
window.g_getInGameFriends = function( cb, target, okWithPartialData ) {

	if( g_hasPermission( PERMISSION_FRIENDS ) ) {
		if( (okWithPartialData && window.facebook.inGameFriends != null && window.facebook.inGameFriends.length > 0)
			|| window.facebook.receiveInGameFriend ) {
			if( target ) {
				cb.call( target, true );
			}
			else {
				cb( true );
			}
		}
		else {

			var locDailyGiftList = RockN.Player.dailyReceiveGiftFriends;
			window.facebook.inGameFriends = [];
			var getFacebookFriends = function(afterToken, callbackComplete) {
				g_api('/me/friends', HTTP_METHOD.GET, {
					limit: 25,
					fields: 'id, name, first_name, last_name, picture.width(56).height(56)',
					after : afterToken
				}, function (type, res) {
					if (type === IS_SUCCEED) {
						if (!!res.data) {

							for (var i = 0; i < res.data.length; i++) {
								var friendObj = res.data[i];
								friendObj.enableReceiveGift= (locDailyGiftList.indexOf(res.data[i].id) === -1);
								window.facebook.inGameFriends.push(friendObj);
							}
						}

						if (!!res.paging && !!res.paging.next && !!res.paging.cursors && !!res.paging.cursors.after)
						{
							getFacebookFriends(res.paging.cursors.after, callbackComplete);		//친구를 paging으로 받아오기
						}
						else{
							callbackComplete(true);
						}

					} else {
						cc.error('[FB] /me/friends fail. ', res.error_message);
						callbackComplete && callbackComplete(false);
					}

				});
			};


			try {

				getFacebookFriends(null, function(result){

					if (result){
						//성공처리
						window.facebook.receiveInGameFriend = true;	//앱친구 받기 성공 Flag set

						//앱친구 수 서버 업데이트. 데일리보너스 추가 친구 보너스에 사용
						RockN.NET.notify('connector.gameHandler.updateInGameFriendCount', {
							playerID: RockN.Player.playerID,
							inGameFriendCount: window.facebook.inGameFriends.length
						});

						//2021-11-11 페북 친구리스트 서버에 업데이트
						var arrFriendsIds = []; //(서버 부하때문에 최대 50명만 보냄)
						for (var i = 0; i < Math.min(window.facebook.inGameFriends.length, 50); i++) {
							arrFriendsIds.push(window.facebook.inGameFriends[i].id);
						}
						if (arrFriendsIds.length > 0) {
							RockN.NET.notify('connector.gameHandler.insertFriendsList', {
								playerID: RockN.Player.playerID,
								ids: arrFriendsIds
							});
						}

						//성공처리
						if (target) {
							cb.call(target, true);
						} else {
							cb(true);
						}

					}
					else{
						//실패처리
						if (target) {
							cb.call(target, false);
						} else {
							cb(false);
						}
					}
				})

			}
			catch(e)
			{
				//[페북장애] 페북 오류로인해 페북에서 내정보를 가져오지 못했을경우 (20211209)
				if( target ) {
					cb.call( target, false );
				}
				else {
					cb( false );
				}
			}

		}
	}
	else {
		if( target ) {
			cb.call( target, false );
		}
		else {
			cb( false );
		}
	}
}


window.g_inviteFriendByDialog = function( cb ) {
	if( cc.screen.fullScreen() ) {
		cc.screen.exitFullScreen();
	}

	FB.ui({
		"method": "apprequests",
		"title": 'INVITE A FRIEND',
		"filters": ['app_non_users'],
		"app_id": SERVER_CONFIG.FB_ID,
		"type": 'invite',
		"message": "I am playing ROCK N' CASH CASINO and Loving it! Come join me!!",
		//"exclude_ids" :RockN.Player.dailyInvitedFriends
	}, function (fbResponse) {
		if (fbResponse && !!fbResponse['to']) {
			RockN.NET.request('connector.gameHandler.inviteFriend', {
				inviteCount: fbResponse['to'].length,
				// inviteNames: fbResponse['to'],
				inviteIDs  : fbResponse['to'],
				playerID   : RockN.Player.playerID
			}, function( msg ) {
				cc.log( '----- invite friend res :', msg);
				if( msg.result !== 0 ) {
					cc.error( 'Invite error - code=' + msg.result );
				}
				else {
					cb && cb();
					RockN.Player.onPostInviteFriend( msg );
					// self.updateEventUI();
					// playGetRewardAnimation( self.lbReward, cc.p( self.lbReward.width / 2 - 5, self.lbReward.height / 2 - 3 ), msg[ 'reward' ]);
				}
			});
		}
		else{
			cb && cb();
		}
	});
}

window.g_logEvent = function(eventName, valueToSum, parameters) {
	if( cc.isUndefined( FB ) || FB === null ) {
		return;
	}

	if (eventName == undefined) return;
	if (valueToSum === undefined && parameters === undefined) {
		FB.AppEvents.logEvent(eventName, null, null);
	} else if (typeof valueToSum === "number" && parameters === undefined) {
		FB.AppEvents.logEvent(eventName, valueToSum);
	} else if (typeof valueToSum === "object" && parameters === undefined) {
		FB.AppEvents.logEvent(eventName, null, valueToSum);
	} else {
		FB.AppEvents.logEvent(eventName, valueToSum, parameters);
	}
}


//친구에게 샌드기프트를 보낼수있는지 없는지 세팅
window.g_setFriendEnableReceiveGift = function(id, enable){
	if (window.facebook.inGameFriends)
	{
		for(var i=0; i < window.facebook.inGameFriends.length; i++){
			if (window.facebook.inGameFriends[i].id == id)
			{
				window.facebook.inGameFriends[i].enableReceiveGift = enable;
			}
		}
	}
}


