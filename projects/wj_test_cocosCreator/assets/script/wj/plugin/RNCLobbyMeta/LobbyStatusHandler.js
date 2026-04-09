window.RNCLobby = window.RNCLobby || {};

RNCLobby.Tag = "[meta][RNCLobby] ";

/** ecma5 에서는 공식적으로 10진수와 16진수 지원 */
RNCLobby.LobbyMode = {
    LOBBY   : 0x10, // 16
    LOUNGE  : 0x20  // 32
};

RNCLobby.LobbyType = {
    NORMAL          : 0x01, // 1
    CLASSIC_VEGAS   : 0x02  // 2
};

RNCLobby.LobbyModeMASK = 0xF0;
RNCLobby.LobbyTypeMASK = 0x0F;

RNCLobby.StatusHandler = {
    /** 로비 모드 변경, 로비 타입 변경 시 변경, 처음 방문한 로비를 떠나기 전까지는 처음 방문한 상태 유지 */
    _hasVisitedLobbyScene   : false,    // 로비씬 방문한 적이 있는가( 모든 모드, 타입 의 로비 포함 )

    _hasVisitedNormLobby    : false,    // 일반 로비 방문
    _hasVisitedNormLounge   : false,    // 일반 라운지
    _hasVisitedCVLobby      : false,    // vc 로비
    _hasVisitedCVLounge     : false,    // vc 라운지

    currStatus : 0, // lobby mode, Type
    prevStatus : 0,

    _isTransitionLobbyType : false,     // 로비 타입 전환 중인 상태

    _needShowLoungeInto : true, // Legacy Canvas only

    reset : function() {
        cc.log( RNCLobby.Tag, "RNCLobby.StatusHandler.reset");

        this.currStatus = 0;
        this.prevStatus = 0;

        this._hasVisitedLobbyScene  = false;

        this._hasVisitedNormLobby   = false;
        this._hasVisitedNormLounge  = false;
        this._hasVisitedCVLobby     = false;
        this._hasVisitedCVLounge    = false;
    },

    setHasVisitedFlags : function() {
        this._hasVisitedLobbyScene = true;

        // 씬 이름이 구캔버스와 모바일 UI 다르고, 씬 구성이 다르다.
        // 모바일 UI : 로비, 라운지 씬 이렇게 두개가 있고, 타입을 바꾼다.
        // 구캔버스 : 로비, 라운지, CV_로비, CV_라운지 네개의 씬을 서로 바꾼다.
        if( RockN.Platform.isLegacyCanvas() ) {
            this._setLobbyModeAndTypeFlagForLegacyCanvas();
        }
        else {
            this._setLobbyModeAndTypeFlagForMobile();
        }

        // this._logHasVisitedFlags();
    },

    _setLobbyModeAndTypeFlagForMobile : function() {
        var currSceneName = SceneManager.getInstance().getCurrSceneName();
        switch ( currSceneName ) {
            case 'mobileLobby':         // 1 : Lobby, 501 : cv_lobby
            case 'classicVegasLobby' :
                switch ( this.getCurrLobbyMode() ) {
                    case RNCLobby.LobbyMode.LOBBY:
                        this.isCurrLobbyType( RNCLobby.LobbyType.NORMAL)        && (this._hasVisitedNormLobby = true);
                        this.isCurrLobbyType( RNCLobby.LobbyType.CLASSIC_VEGAS) && (this._hasVisitedCVLobby = true);
                        break;
                    case RNCLobby.LobbyMode.LOUNGE:
                        // 로비로 처음 진입한 유저가 라운지 진입시에는 SceneManager를 타지 않고 LobbyRootLayer 만 교체하는 상황.
                        // 따라서 로비유저가 라운지 진입하더라도 현재 씬 이름은 mobileLobby 다. 그래서 여기서 따로 처리
                        this.isCurrLobbyType( RNCLobby.LobbyType.NORMAL)        && ( this._hasVisitedNormLounge = true );
                        this.isCurrLobbyType( RNCLobby.LobbyType.CLASSIC_VEGAS) && ( this._hasVisitedCVLounge = true );
                        break;
                    default:
                        break;
                }
                break;
            case 'mobileVipLobby':          // 1001 : Lounge, 1501 : cv_lounge
            case 'classicVegasLobbyVip':
                if( this.isCurrLobbyType( RNCLobby.LobbyType.NORMAL) ) {
                    this._hasVisitedNormLounge = true;
                }
                else if( this.isCurrLobbyType( RNCLobby.LobbyType.CLASSIC_VEGAS ) ) {
                    this._hasVisitedCVLounge = true;
                }
                else {
                    cc.error("invalid LobbyType > " + this.getCurrLobbyType());
                }
                break;
            default:
                cc.error( RNCLobby.Tag + "invalid LobbyMode > sceneName : " + currSceneName );
                break;
        }
    },

    _setLobbyModeAndTypeFlagForLegacyCanvas : function() {
        var currSceneName = SceneManager.getInstance().getCurrSceneName();

        switch ( currSceneName ) {
            case 'lobby':     // 1: lobby
                this._hasVisitedNormLobby = true;
                break;
            case 'goToVipLounge':
            case 'vipLobby':        // 1001 : lounge
                this._hasVisitedNormLounge = true;
                break;
            case 'classicVegasLobby':   // 501 : cv lobby
                this._hasVisitedCVLobby = true;
                break;
            case 'classicVegasLobbyVip':  // 1501 : cv lounge
                this._hasVisitedCVLounge = true;
                break;
            default:
                cc.error( RNCLobby.Tag + "invalid LobbyMode,Type > sceneName : " + currSceneName );
                break;
        }
    },

    //region [ transition lobby type ]
    // 로비 타입 전환 시작
    onStartTransitionLobbyType : function() {
        this._isTransitionLobbyType = true;
        // cc.log( RNCLobby.Tag, "[check] ", "onStart Transition LobbyType" );
    },

    // 로비 타입 전환 끝
    onCompleteTransitionLobbyType : function() {
        this._isTransitionLobbyType = false;
        // cc.log( RNCLobby.Tag, "[check] ", "onComplete Transition LobbyType" );
    },

    // 로비 타입 전환 중인가
    isTransitionLobbyType : function() {
        return this._isTransitionLobbyType;
    },
    //endregion

    //region [ has visited lobby ]

    // 로비씬 자체를 방문한 적이 있는가?
    hasVisitedLobbyScene : function() {
        cc.log( RNCLobby.Tag, "[check] ", "hasVisitedLobbyScene : ", this._hasVisitedLobbyScene);
        return this._hasVisitedLobbyScene;
    },

    // 현재 모드 방문한 적이 있는가?
    // 예) 현재모드가 라운지모드 라면, normal-cv 타입 중 한곳이라도 방문한 적이 있는지 체크
    hasVisitedCurrLobbyMode : function() {
        return this.isCurrModeLounge() ? this.hasVisitedLoungeMode() : this.hasVisitedLobbyMode();
    },

    // 라운지모드 방문한 적이 있는가? ( 라운지 일반, 라운지 CV 중 한곳이라도 방문한 적이 있는지 )
    hasVisitedLobbyMode : function() {
        return this.hasVisitedNormLounge() || this.hasVisitedCVLobby();
    },

    // 로비 모드 방문한 적이 있는가? ( 로비 일반, 로비 CV 중 한곳이라도 방문한 적이 있는지  )
    hasVisitedLoungeMode : function() {
        return this.hasVisitedNormLounge() || this.hasVisitedCVLounge();
    },

    hasVisitedNormLobby : function() {  return this._hasVisitedNormLobby; },

    hasVisitedNormLounge : function() {  return this._hasVisitedNormLounge; },

    hasVisitedCVLobby : function() {  return this._hasVisitedCVLobby; },

    hasVisitedCVLounge : function() {  return this._hasVisitedCVLounge; },

    //endregion

    //region [ LobbyMode, LobbyType ]
    setCurrLobbyMode : function( targetMode /* RNCLobby.LobbyMode */ ) {
        // cc.log( RNCLobby.Tag, "** setCurrLobbyMode ** targetMode: ", targetMode );
        var currMode = this.getCurrLobbyMode();
        this.prevStatus = ( this.prevStatus & ~RNCLobby.LobbyModeMASK ) | currMode;
        this.currStatus = ( this.currStatus & ~RNCLobby.LobbyModeMASK ) | targetMode;
    },

    setCurrLobbyType : function( targetType /* RNCLobby.LobbyType */ ) {
        // cc.log( RNCLobby.Tag, "** setCurrLobbyType **: ", targetType );

        var currType = this.getCurrLobbyType();

        this.prevStatus = ( this.prevStatus & ~RNCLobby.LobbyTypeMASK ) | currType;
        this.currStatus = ( this.currStatus & ~RNCLobby.LobbyTypeMASK ) | targetType;
    },

    getCurrLobbyMode : function() {
        return this.currStatus & RNCLobby.LobbyModeMASK;
    },

    getCurrLobbyType : function() {
        return this.currStatus & RNCLobby.LobbyTypeMASK;
    },

    isCurrModeLobby : function() {
        return this.isCurrLobbyMode( RNCLobby.LobbyMode.LOBBY );
    },

    isCurrModeLounge : function() {
        return this.isCurrLobbyMode( RNCLobby.LobbyMode.LOUNGE );
    },

    isCurrTypeNormal : function() {
        return this.isCurrLobbyType( RNCLobby.LobbyType.NORMAL );
    },

    isCurrTypeClassicVegas : function() {
        return this.isCurrLobbyType( RNCLobby.LobbyType.CLASSIC_VEGAS );
    },

    isCurrLobbyMode : function( mode /* RNCLobby.LobbyMode */ ) {
        return ( this.currStatus & RNCLobby.LobbyModeMASK ) === mode;
    },

    isCurrLobbyType : function( type /* RNCLobby.LobbyType */ ) {
        return ( this.currStatus & RNCLobby.LobbyTypeMASK ) === type;
    },

    getPrevLobbyMode : function() {
        return this.prevStatus & RNCLobby.LobbyModeMASK;
    },

    getPrevLobbyType : function() {
        return this.prevStatus & RNCLobby.LobbyTypeMASK;
    },
    //endregion

    //region [Legacy Canvas only]
    setNeedShowLoungeIntro : function( flag ) {
        this._needShowLoungeInto = flag;
    },
    needShowLoungeIntro : function() {
        return this._needShowLoungeInto;
    },

    //endregion

    //region [ log for test ]
    _logHasVisitedFlags : function() {
        cc.log( RNCLobby.Tag, "[check] ", " hasVisited_Lobby    : ", this._hasVisitedNormLobby );
        cc.log( RNCLobby.Tag, "[check] ", " hasVisited_Lounge   : ", this._hasVisitedNormLounge );
        cc.log( RNCLobby.Tag, "[check] ", " hasVisited_CVLobby  : ", this._hasVisitedCVLobby );
        cc.log( RNCLobby.Tag, "[check] ", " hasVisited_CVLounge : ", this._hasVisitedCVLounge );
    },

    _logLobbyStatus : function () {
        // cc.log( RNCLobby.Tag, "[check] ", "LobbyMode ( Lobby: 16, Lounge: 32 )" );
        // cc.log( RNCLobby.Tag, "[check] ", "      > prev, curr : ", this.getPrevLobbyMode(), this.getCurrLobbyMode() );
        // cc.log( RNCLobby.Tag, "[check] ", "LobbyType ( Normal: 1, ClassicVegas: 2 )" );
        // cc.log( RNCLobby.Tag, "[check] ", "      > prev, curr : ", this.getPrevLobbyType(), this.getCurrLobbyType() );
    },
    //endregion
}