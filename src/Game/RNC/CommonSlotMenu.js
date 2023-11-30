var CommonVideoSlotMenuSpinMode = {
    Normal:0,
    FreespinCount:1,
    FreespinNoneCount:2,
    Respin:3,
    NumofSpinMode:4
};
var CommonVideoSlotMenuSpinUISet = {
    Normal:0,
    Count:1,
    NumofUISet:2
};
var CommonVideoSlotMenu = RockN.AutoPositionNode.extend({
    ctor:function(gameid){
        this._super();
        this.setName("SlotMenu");
        this._initConstValue();
        this._initVariable(gameid);
        this._init();
    },
    _initConstValue:function(){
        //this._AUTOSPIN_COUNT_ARR = [ 5, 10, 50, 100, 200, 500, 1000];
        this._AUTOSPIN_COUNT_ARR = [ [ 20, 50, 100, 300, 500, 1000, 'I' ], [ 50, 100, 300, 500, 1000, 'I', 'T' ] ];
        this._AUTOSPIN_INFINITY = 999999;
        this._CUBE_SUPERRICH_GRADE = 17;

        // 현제 test용 임시 turbo 확대적용시 삭제 or 일부 적용시에는 적용 슬롯 id 추가
        this._TURBO_MODE_SLOT_LIST = [213, 212, 211];

        // autospin check log용 auto type ( for server )
        this._AUTOSPIN_TYPE_ID = {
            NONE:0,
            AUTO:104,
            INFINITY:105,
            TURBO:106
        };
    },
    _initVariable:function(gameid){
        this._gameID = gameid;
        this._mainUI = null;
        this._autoSpinCountTable = null;
        this._betLockGuide = null;
        this._wheelChangeAR = null;
        this._spinTestPanel = null;


        this._win = 0;
        this._totalWin = 0;
        this._remainSpinCount = 0;
        this._autoSpinUI = false;
        this._remainAutoSpin = 0;
        this._currSelectedAutoSpin = 0;
        this._spins = 0;
        this._currBetPage = 0;
        this._lbBet = null;
        this._btnBet = null;
        this._keyboardListener = null;
        this._initialized      = false;
        this._prevBetIndex = -1;
        this._payTableOpened = false;
        this._receiveSceneSpawn = false;




        this._keyPressed = false;
        this._isSpinTouched = false;

        this._isSpinning = false;
        this._isUseBtnCancel = false;

        this._isForcedApply = false;



        this._btnAuto = null;
        this._btnFast = null;
        this._imgFastOn = null;
        this._btnPayTable = null;
        this._pnlSpin = [];



        this._isFastMode = false;

        this._onPayTableOpen = null;
        this._onChangeBetCallback = null;
        this._startAutoSpin = null;
        this._stopAutoSpin = null;

        this._spinCallback = [];
        this._updateJackpotInfo = null;
        this._isStateSpin = null;

        this._lbTotalBet = null;
        this._lbWin = null;
        this._lbLineCount = null;

        this._keyPressed = false;
        this._isSpinTouched = false;


        this._spinUISet = [];
        this._btnSpin = [];


        this._currSpinUISet = CommonVideoSlotMenuSpinUISet.NumofUISet;
        this._currSpinMode = CommonVideoSlotMenuSpinMode.Normal;

        this._bonusWinPanel = null;
        this._imgTotalWin = null;
        this._lbTotalWin = null;
        this._lbSpinCount = null;
        this._spinCountFx = null;

        this._betTable = [];
        this.betTable = [];         // 외부에서 직접참조하고있음

        // for cube
        this._cubeInfo = null;
        this._imgTotalBet = null;
        this._pnlCubeBet = null;
        this._imgBettingGrade = [];
        this._lbBettingGrade = [];

        this._extraBetPanel = null;
        this._extraBetCustomAssets = null;
        this._isTurboMode = false;
    },
    _init:function(){
        this._initMenuUI();
        this._initAutoSpinCountTable();
        this._initBetUnlockGuide();
        this._initVIPWheel();
        this._initListner();
        // this._initSpinTestPanel();
        this._initBonusWinPanel();
        this._initSpinCountFx();
        this._setBtnOverEnable();
    },
    _initMenuUI:function(){
        // mainui
        this._mainUI = ccs.uiReader.widgetFromJsonFile( resCommonSlotMenu.CommonSlotMenuUI );
        this._mainUI.attr({ x:0, y:0, anchorX:0.5, anchorY:0.5});
        this.addChild(this._mainUI);

        // auto btn
        this._btnAuto = ccui.helper.seekWidgetByName( this._mainUI, 'btnAuto' );
        this._btnAuto.addTouchEventListener( this.onAutoTouch, this );

        // Fast btn
        this._btnFast = ccui.helper.seekWidgetByName( this._mainUI, 'btnFast' );
        this._btnFast.addTouchEventListener( this.onFastTouch, this );
        this._imgFastOn  = ccui.helper.seekWidgetByName( this._mainUI, 'imgFastCheck' );
        this._imgFastOn.setVisible(false);
        this._isFastMode  = false;

        // paytable btn
        this._btnPayTable = ccui.helper.seekWidgetByName( this._mainUI, 'btnPaytable' );
        this._btnPayTable.addTouchEventListener( this.onPayTableTouch, this );

        // betchange btn
        this._btnBetIncre = ccui.helper.seekWidgetByName( this._mainUI, 'btnBetchangeR' );
        this._btnBetIncre.addTouchEventListener( this.onIncreaseBetTouch, this );
        this._btnBetDecre = ccui.helper.seekWidgetByName( this._mainUI, 'btnBetchangeL' );
        this._btnBetDecre.addTouchEventListener( this.onDecreaseBetTouch, this );

        // label
        this._lbTotalBet = ccui.helper.seekWidgetByName( this._mainUI, 'fonTotalbet' );
        this._lbWin = ccui.helper.seekWidgetByName( this._mainUI, 'fonWin' );
        this._lbLineCount = ccui.helper.seekWidgetByName( this._mainUI, 'fonLine' );

        // cube
        if( false && RNCSlotEntry.Util.isEnableGetCubeSlot(this._gameID) === true ){
            var imgTotalbet = ccui.helper.seekWidgetByName( this._mainUI, 'imgTotalbet' );
            imgTotalbet.setVisible(false);
            var pnlCubeBet = ccui.helper.seekWidgetByName( this._mainUI, 'pnlCubeBet' );
            pnlCubeBet.setVisible(true);
            for( var i=0; i<2; i++ ){
                this._imgBettingGrade[i] = ccui.helper.seekWidgetByName( this._mainUI, 'imgRating0'+(i+1) );
                this._lbBettingGrade[i] = ccui.helper.seekWidgetByName( this._mainUI, 'lbRating0'+(i+1) );
            }
        }

        // spin ui
        for( var i=0; i<CommonVideoSlotMenuSpinUISet.NumofUISet;i++){
            this._spinUISet[i] = ccui.helper.seekWidgetByName( this._mainUI, 'pnSpinUISet'+i );
            this._spinUISet[i].setVisible(false);
            this._spinUISet[i].setTouchEnabled(false);
        }

        this.setSpinUISet(CommonVideoSlotMenuSpinUISet.Normal);
    },
    _setSpinUISet:function(){
        this._spinUISet[this._currSpinUISet].setVisible(true);
        // auto
        this._btnAutoStop = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnStop' );
        this._btnAutoStop.addTouchEventListener( this.onAutoStopTouch, this );
        this._lbAutoCount = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'fonCount' );
        this._btnAutoQuickStop = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnQuickAuto' );
        this._btnAutoQuickStop.addTouchEventListener( this.onSpinTouch, this );
        // spin
        this._btnSpin[CommonVideoSlotMenuSpinMode.Normal] = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnSpin' );
        this._btnSpin[CommonVideoSlotMenuSpinMode.FreespinCount] = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnFreeSpinCount' );
        this._btnSpin[CommonVideoSlotMenuSpinMode.FreespinNoneCount] = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnFreeSpinNoneCount' );
        this._btnSpin[CommonVideoSlotMenuSpinMode.Respin] = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'btnReSpin' );
        for( var i=0; i<CommonVideoSlotMenuSpinMode.NumofSpinMode; i++ )
            this._btnSpin[i].addTouchEventListener( this.onSpinTouch, this );
        // ui
        this._imgTotalWin = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'imgTotalWin' );
        this._lbTotalWin = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'fonTotalWin' );
        this._lbSpinCount = ccui.helper.seekWidgetByName( this._spinUISet[this._currSpinUISet], 'fonSpinCount' );
    },
    _updateUI:function(usetotalwin){
        // btn
        for( var i=0; i<this._btnSpin.length; i++ ){
            this._btnSpin[i].setVisible(false);
            this._btnSpin[i].setEnabled(false);
        }
        this._btnSpin[this._currSpinMode].setVisible(true);
        if( this._currSpinMode !== CommonVideoSlotMenuSpinMode.Normal ){
            this._btnAuto.setEnabled( false );
            this._btnAuto.setBright( false );
        }
        // totalwin
        this._imgTotalWin.setVisible(usetotalwin);
        if( this._totalWin <= 0 )
            this._lbTotalWin.setString( '' );
        else
            this._lbTotalWin.setString( bigNumberToString( this._totalWin, 6 ) );
        // spincount
        if( this._currSpinMode === CommonVideoSlotMenuSpinMode.FreespinCount || this._currSpinMode === CommonVideoSlotMenuSpinMode.Respin ){
            this._lbSpinCount.setVisible(true);
            this._lbSpinCount.setString(this._remainSpinCount.toString());
        }
        else
            this._lbSpinCount.setVisible(false);
    },

    _initAutoSpinCountTable:function(){
        var autoui = ccs.uiReader.widgetFromJsonFile( resSlotMenu.SlotAutoBetUI );
        autoui.attr( { anchorX: 0.5, anchorY: 0.5, x: 184, y: 177, visible: true } );
        this.addChild( autoui, 10 );

        var autoTableIndex = 0;
        if( !!this._TURBO_MODE_SLOT_LIST && this._TURBO_MODE_SLOT_LIST.indexOf(this._gameID%1000) === -1 )
            this._autoSpinCountTable = ccui.helper.seekWidgetByName( autoui, 'pnlNormal' );
        else{
            this._autoSpinCountTable = ccui.helper.seekWidgetByName( autoui, 'pnlTurbo' );
            autoTableIndex = 1;
        }


        for( var i = 0; i < this._AUTOSPIN_COUNT_ARR[autoTableIndex].length; i++ ) {
            var item = ccui.helper.seekWidgetByName( this._autoSpinCountTable, 'btnAuto0' + (i + 1) );
            if( item !== null ){
                item.selectSpin = this._AUTOSPIN_COUNT_ARR[autoTableIndex][i];
                item.addTouchEventListener( this.onAutoListTouch, this );
            }
        }
    },
    _initBetUnlockGuide:function(){
        ccs.armatureDataManager.addArmatureFileInfo( resCommonEffect.BetLockGuide  );
        //this._betLockGuide = new ccs.Armature( 'PU_betLockAR' );
        this._betLockGuide = RockN.createArmature( RockN.Util.getARNameFromFileName( resCommonEffect.BetLockGuide ) );
        this._betLockGuide.getAnimation().setMovementEventCallFunc( this.onBetLockMovement, this );
        this._betLockGuide.attr( { x : -228, y : 48, anchorX : 0.5, anchorY : 0.5 } );
        this._betLockGuide.setVisible(false);
        this.addChild( this._betLockGuide, RockN.GLOBAL_ORDER.FRONT );

    },
    _initVIPWheel:function(){
        if( RockN.Player.inVipMode ) {
            ccs.armatureDataManager.addArmatureFileInfo( resVipLounge.VIPWheelChangeAR  );
            this._wheelChangeAR = RockN.createArmature( RockN.Util.getARNameFromFileName( resVipLounge.VIPWheelChangeAR ) );
            this._wheelChangeAR.getAnimation().setMovementEventCallFunc( this.onWheelChangeMovement, this );
            this._wheelChangeAR.attr( { x : -228, y : 48, anchorX : 0.5, anchorY : 0.5 } );
            this._wheelChangeAR.setVisible(false);
            this.addChild( this._wheelChangeAR, RockN.GLOBAL_ORDER.FRONT );
        }
    },
    _initListner:function(){
        // Keyboard event
        var self = this;
        if( 'keyboard' in cc.sys.capabilities ) {
            this._keyboardListener = cc.EventListener.create( {
                event         : cc.EventListener.KEYBOARD,
                onKeyPressed: function (key, event) {
                    if( key === 32 ) {
                        if( !self._keyPressed ) {
                            self._keyPressed = true;
                            self._isSpinTouched = true;
                            self.onSpinTouch(null, ccui.Widget.TOUCH_ENDED);
                        }
                    }
                },
                onKeyReleased : function( key, event ) {
                    if( key === 32 ) {
                        self._keyPressed = false;
                    }
                }
            } );
            cc.eventManager.addListener( this._keyboardListener, this );
        }
        else {
            cc.log( "KEYBOARD Not supported" );
        }
    },
    _initSpinTestPanel:function(){
        this._spinTestPanel = SlotUtils.testUtil.getSpinTestPanel();
        if( this._spinTestPanel !== null ){
            this._spinTestPanel.attr( { x : 0, y : -100 } );
            this.addChild(this._spinTestPanel);
        }
    },
    _initBonusWinPanel:function(){
        this._bonusWinPanel = new CommonSlotMenu_BonnuswinPanel();
        this._bonusWinPanel.attr({x:0,y:0});
        this.addChild(this._bonusWinPanel);
    },
    _initSpinCountFx:function(){
        ccs.armatureDataManager.addArmatureFileInfo( resCommonSlotMenu.PU_slotMenuFxAR  );
        this._spinCountFx = RockN.createArmature(RockN.Util.getARNameFromFileName(resCommonSlotMenu.PU_slotMenuFxAR));
        this._spinCountFx.setPosition(300, 0);          // ??
        this.addChild( this._spinCountFx );
    },

    initVipMiniWheel : function() {
        var loc_wheelType  = RNCInSlotMeta.MiniVIPWheelType.VIP;
        if( this.getTotalBet() >= RockN.Player.vipWheelBoundaryBet ) {
            loc_wheelType = RNCInSlotMeta.MiniVIPWheelType.MEGA;
        }
        else {
            loc_wheelType = RNCInSlotMeta.MiniVIPWheelType.VIP;
        }
        RockN.GlobalEvent.broadcast( EVT.IN_SLOT_RIGHT_ICON.CHANGE_VIP_WHEEL_TYPE, { wheelType : loc_wheelType } );
    },
    initTotalBet : function() {
        var minBetDiff  = Math.abs( RockN.Player._balance / 100 - this._betTable[ 0 ] * this._betLines );
        var betDiff     = 0;
        this._betPerLine = this._betTable[ 0 ];
        this._betIndex   = 0;
        this._prevBetIndex = this._betIndex;

        for( var i = 1; i < this._betTable.length; i++ ) {
            var bet = this._betTable[ i ] * this._betLines;
            if( !this.isBetEnable( bet, true ) ) {
                break;
            }
            betDiff = Math.abs( RockN.Player._balance / 100 - bet );
            if( minBetDiff > betDiff ) {
                minBetDiff      = betDiff;
                this._betPerLine = this._betTable[ i ];
                this._betIndex   = i;
            }
        }

        cc.warn(" CommonVideoSlotMenu : getTotalBet >> ", this.getTotalBet() );
    },
    init:function(){
        this._super();
        this._initialized = true;
        return true;
    },
    _setBtnOverEnable:function(){
        if( !cc.sys.isNative ) {
            this._btnFast.setOverEnabled( true );
            this._btnBetIncre.setOverEnabled( true );
            this._btnBetDecre.setOverEnabled( true );
            this._btnPayTable.setOverEnabled( true );
            this._btnAuto.setOverEnabled( true );
            this._btnAutoStop.setOverEnabled( true );
            this._btnAutoQuickStop.setOverEnabled( true );
            this._btnSpin[CommonVideoSlotMenuSpinMode.Normal].setOverEnabled( true );
            this._btnSpin[CommonVideoSlotMenuSpinMode.FreespinCount].setOverEnabled( true );
            this._btnSpin[CommonVideoSlotMenuSpinMode.FreespinNoneCount].setOverEnabled( true );
            this._btnSpin[CommonVideoSlotMenuSpinMode.Respin].setOverEnabled( true );
        }
    },
    _clearEventListner:function(){
        this._keyboardListener && cc.eventManager.removeListener( this._keyboardListener );
    },
    _onChangeBet: function() {
        if( this._onChangeBetCallback !== null )
            this._onChangeBetCallback();

        this.changeBetUI();
        this.onRefresh();
        this.updateJackpotInfo();
        this._updateBettingGradeUI();
    },
    _updateBettingGradeUI:function(){
        if( RNCSlotEntry.Util.isEnableGetCubeSlot(this._gameID) === true ) {
            var bettingGrade = this.getCubeGrade();
            if( bettingGrade >= this._CUBE_SUPERRICH_GRADE ){
                this._imgBettingGrade[0].setVisible(false);
                this._imgBettingGrade[1].setVisible(true);

                this._lbBettingGrade[1].setString(bettingGrade);
            }
            else{
                this._imgBettingGrade[0].setVisible(true);
                this._imgBettingGrade[1].setVisible(false);
                this._lbBettingGrade[0].setString(bettingGrade);
                if( bettingGrade <= 0 ){
                    this._lbBettingGrade[0].setOpacity(80);
                    this._imgBettingGrade[0].setOpacity(80);
                }
                else{
                    this._lbBettingGrade[0].setOpacity(255);
                    this._imgBettingGrade[0].setOpacity(255);
                }
            }
        }
    },

    // movement callback
    onBetLockMovement : function( armature, movementType, movementID ) {
        if( movementType === ccs.MovementEventType.complete ) {
            this._betLockGuide.setVisible(false);
        }
    },
    onWheelChangeMovement : function( armature, movementType, movementID ) {
        if (movementType === ccs.MovementEventType.complete) {
            if (movementID === 'change' || movementID === 'super')
                this._wheelChangeAR.setVisible(false);
        }
    },

    // btn Event listner
    onAutoTouch : function( sender, type ) {
        if( this._btnAuto.isEnabled() === false )
            return;

        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                SoundControl.getInstance().playEffect( slotCommon.ComboButtonClick );
                this._autoSpinCountTable.setVisible(!this._autoSpinCountTable.isVisible());
                break;
        }
    },
    onAutoStopTouch : function( sender, type ) {
        switch( type ) {
            case ccui.Widget.TOUCH_ENDED: {
                if( this._stopAutoSpin !== null )
                    this._stopAutoSpin();

                this.setAutoSpinCount( 0 );
            }
                break;
        }
    },
    onAutoListTouch : function( sender, type ) {
        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                if( this._autoSpinCountTable.isVisible() === false )
                    return;

                if( window.isNetworkOffLine ) {
                    if( RockN.IS_SHOWING_CHECK_NETWORK === false ) {
                        var pLayer = new CheckNetwork();
                        if( !!pLayer ) {
                            RockN.GameScene.addChild( pLayer, 9999 );
                        }
                    }
                    cc.warn( '***** CHECK YOUR NETWORK STATE. Maybe network was disconnected' );
                    return;
                }

                if( this._startAutoSpin !== null ){
                    this._btnSpin[this._currSpinMode].setEnabled( false );
                    this._btnAutoStop.setVisible( true );
                    this._btnAuto.setVisible( false );
                    this._isTurboMode = false;
                    this._currSelectedAutoSpin = sender.selectSpin;
                    if( this._currSelectedAutoSpin === 'I' )
                        this._remainAutoSpin = this._AUTOSPIN_INFINITY;
                    else if( this._currSelectedAutoSpin === 'T' ){
                        this._remainAutoSpin = this._AUTOSPIN_INFINITY;
                        this._isTurboMode = true;
                        this._btnFast.setEnabled(false);
                    }
                    else
                        this._remainAutoSpin = this._currSelectedAutoSpin;
                    this._startAutoSpin( this._remainAutoSpin );
                    this._spins += 1;

                    if( this._spinTestPanel !== null )
                        this._remainAutoSpin = this._spinTestPanel.startAutoSpin(this._remainAutoSpin);

                    //////////////////////////////////////////////////////////////////////////////
                    //auto spin count log
                    var spinLog = this._remainAutoSpin;
                    if( this._currSelectedAutoSpin === 'I' || this._currSelectedAutoSpin === 'T' )
                        spinLog = 0;

                    LogHandler.getInst().sendButtonEventLogToServer(LogHandler.BUTTON_EVENT.HOLD_FOR_AUTO_SPIN, spinLog);
                    //////////////////////////////////////////////////////////////////////////////
                }
                else
                    cc.assert( false, '_autoSpinStart function is null' );

                this._autoSpinCountTable.setVisible(false);
        }
    },
    onPayTableTouch : function( sender, type ) {
        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                if( this._onPayTableOpen !== null )
                    this._onPayTableOpen();
                break;
        }
    },
    onFastTouch : function( sender, type ) {
        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                SoundControl.getInstance().playEffect( globalCommon.Click );
                this._imgFastOn.setVisible(!this._imgFastOn.isVisible());
                this._isFastMode = !this._isFastMode;
                LogHandler.getInst().sendButtonEventLogToServer(LogHandler.BUTTON_EVENT.FAST, this._isFastMode?1:0);
                break;
        }
    },
    onIncreaseBetTouch:function(sender, type ){
        if( this._isUseBtnCancel === true && this._isSpinning === true )
            return;

        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                SoundControl.getInstance().playEffect( globalCommon.Click );
                if( this._betIndex < this._betTable.length - 1 ){
                    if( this.isBetEnable( this._betTable[ this._betIndex+1 ] * this._betLines ) === true ){
                        this._prevBetIndex = this._betIndex;
                        this._betIndex++;
                        this._betPerLine   = this._betTable[ this._betIndex ];
                        this._onChangeBet();
                        LogHandler.getInst().sendEvent( LogHandler.EVENT.CLICK_BET_PLUS, {
                            id       : RockN.Player.playerID,
                            grade    : RockN.Player.grade,
                            level    : RockN.Player.level,
                            platform : 'web',
                            slotMenu : 0
                        }, null );
                    }
                }
                break;
        }
    },
    onDecreaseBetTouch:function(sender, type){
        if( this._isUseBtnCancel === true && this._isSpinning === true )
            return;

        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
                SoundControl.getInstance().playEffect( globalCommon.Click );
                if( this._betIndex > 0 ){
                    var newBetIndex = this._betIndex - 1;
                    if( newBetIndex >= this.betTable.length ) {
                        newBetIndex = this.betTable.length - 1;
                    }
                    if( this.isBetEnable( this._betTable[ newBetIndex ] * this._betLines ) === true ){
                        this._prevBetIndex = this._betIndex;
                        this._betIndex = newBetIndex;
                        this._betPerLine   = this._betTable[ this._betIndex ];
                        this._onChangeBet();
                        LogHandler.getInst().sendEvent( LogHandler.EVENT.CLICK_BET_MINUS, {
                            id       : RockN.Player.playerID,
                            grade    : RockN.Player.grade,
                            level    : RockN.Player.level,
                            platform : 'web',
                            slotMenu : 0
                        }, null );
                    }
                }
                break;
        }
    },
    onSpinTouch:function( sender, type ) {
        if( this._remainAutoSpin > 0 && this._currSpinMode === CommonVideoSlotMenuSpinMode.Normal ){
            if( this._btnAutoQuickStop.isEnabled() === false )
                return;
        }
        else{
            if( this._btnSpin[this._currSpinMode].isEnabled() === false )
                return;
        }

        this._autoSpinCountTable.setVisible(false);

        switch( type ) {
            case ccui.Widget.TOUCH_BEGAN:
                this._isSpinTouched = true;
                break;
            case ccui.Widget.TOUCH_CANCELED:
                this._isSpinTouched = false;
                break;
            case ccui.Widget.TOUCH_ENDED:
                // check click
                if( !this._isSpinTouched )
                    return;

                this._isSpinTouched = false;
                // check network
                if( window.isNetworkOffLine ) {
                    if( RockN.IS_SHOWING_CHECK_NETWORK === false ) {
                        var pLayer = new CheckNetwork();
                        if( !!pLayer ) {
                            RockN.GameScene.addChild( pLayer, 9999 );
                        }
                    }
                    cc.warn( '***** CHECK YOUR NETWORK STATE. Maybe network was disconnected' );
                }
                // check spin
                else if( this._isStateSpin() === false ){
                    if( this._currSpinMode === CommonVideoSlotMenuSpinMode.Normal ){
                        if( RockN.Player._balance >= this.getExtraTotalBet() ) {
                            if( this._spinCallback[this._currSpinMode]() === true ) {
                                // the following code does not execute for wrong balance update timing
                                // all onSpin() functions have to return false
                                this.onSpinSucceed();
                            }
                        }
                        else
                            RockN.GlobalEvent.broadcast( EVT.SLOT_SCENE.CHANGE_YOUR_BET, { sourceType : 'slot_menu', betMultiple : this.getExtraBetMultiple() } );
                    }
                }
                else
                    this._spinCallback[this._currSpinMode]();           // quick stop
                break;
        }
    },

    // life cycle
    onEnter:function(){
        this._super();
        this._player = RockN.Player;                      // player class 접근 바꾸고싶다..
        this._scheduler = cc.director.getScheduler();
        RockN.scheduleUpdate( this );
    },
    spawn:function( duration ) {
        this.runAction( cc.fadeIn( duration || 1 ) );
    },
    sceneSpawnFinished:function() {
        this._receiveSceneSpawn = true;

        var prevString   = this._lbTotalBet.getString();
        var prevTotalBet = localeStringToNumber( prevString );
        var playWheel = this.updateVipMiniWheel( prevTotalBet, this.getTotalBet() );
        if( this.isSuperRichBet( prevTotalBet, this.getTotalBet() ) ) {
            this.playWheelChangeAnimation( true );
        } else if( playWheel && RockN.Player.inVipMode ) {
            this.playWheelChangeAnimation( false );
        } else {
            this.stopWheelChangeAnimation();
        }
    },
    onExit : function() {
        this._clearEventListner();
        this._super();
    },

    // receive from server
    setup : function( data ) {
        this._betTable         = data.gameInfo.betTable;
        this._betLimit         = data.gameInfo.betLimit;
        this._betIndex         = data.gameInfo.betIndex;
        this._betLines         = data.gameInfo.betLines;
        this._betPerLine       = data.gameInfo.betPerLine;
        this._maxLine          = data.gameInfo.maxLine;
        this._serverRoomID     = data.gameInfo.rid;
        //
        if( !!data.cubeInfo )
            this._cubeInfo     = data.cubeInfo;


        if( null !== RockN.Player && ( false === RockN.Player.isEnableHigherBet() )) {
            if( false === cc.isArray( this._betTable ) )
                cc.warn( '[CommonVideoSlotMenu] Bet table is not array' );
            else if( RockN.Player.inVipMode )
                this._betTable = this._betTable.slice( 0, -6 );
        }

        this.betTable = this._betTable;             // 외부에서 직접참조하고있음

        if( !data.syncParams || (this._betIndex === -1 && this._betPerLine === 0) )
            this.initTotalBet();


        this.changeBetUI();
        this.onRefresh();
        this.updateJackpotInfo();
        this.initVipMiniWheel();
        this._updateBettingGradeUI();
        this._initExtraBetPanel(data.gameInfo.extraBetMultiple,data.gameInfo.parSheet.extraBetLimit);

        this._initialized = true;
    },
    onSyncWin : function( data ) {
        if( data.hasOwnProperty( 'win' ) )
            this._win = data.win;
        else if( data.hasOwnProperty( 'totalWin' ) )
            this._win = data.totalWin;

        if( data.hasOwnProperty( 'totalWin' ) )
            this._totalWin = data.totalWin;

        if( data.hasOwnProperty( 'remainCount' ) ) {
            if( this._remainSpinCount - data.remainCount !== 1 ) {
                if( this._remainSpinCount - 1 >= 0 ) {
                    if( this._lbSpinCount.isVisible() ) {
                        this._lbSpinCount.setString( (this._remainSpinCount - 1).toString() );
                    }
                }
                this._remainSpinCount = data.remainCount;
            }
            else {
                this._remainSpinCount = data.remainCount;
                if( this._remainSpinCount >= 0 ) {
                    if( this._lbSpinCount.isVisible() ) {
                        this._lbSpinCount.setString( this._remainSpinCount.toString() );
                    }
                }
            }

        }
    },
    // send to server
    updateJackpotInfo : function() {
        var self     = this;
        RockN.NET.request( 'connector.gameHandler.request', {
            protocol : SIG.SIG_GET_SLOT_JACKPOT_INFO,
            playerID : RockN.Player.playerID,
            totalBet : self.getTotalBet()
        }, function( result ) {
            if( result.code === RockN.CODE.OK ) {
                var currTotalBet = result.betCash;

                var info = [];
                for( var i = 0; i < result.info.length; i++ )
                    info[ i ] = result.info[ i ] * self.getTotalBet() / currTotalBet;

                if( self._updateJackpotInfo !== null )
                    self._updateJackpotInfo( info );
            }
        } );
    },

    // state check
    isBetEnable : function( bet, disableNoti ) {
        if( RockN.Player.inVipMode )
            return true;

        for( var i = 0; i < this._betLimit.length; i++ ) {
            if( RockN.Player.level > this._betLimit[ i ].level )
                continue;

            //todo betlimit table index를 통해 막는걸로 변경하기 ask obg
            var enable = bet <= this._betLimit[ i ].bet;
            if( !enable && !disableNoti ) {
                this._betLockGuide.setVisible(true);

                var ibet = 0;
                for( var j = this._betLimit.length-1; j >= 0; j-- ) {
                    if( bet > this._betLimit[ j ].bet) {
                        ibet = j;
                        break;
                    }
                }
                var animName = 'lock' + (this._betLimit[ibet].level+1 );
                this._betLockGuide.getAnimation().play(animName);

            }
            return enable;
        }
        return true;
    },
    isFastMode : function() {
        return this._isFastMode;
    },

    // setter
    setGuideAttr : function( attr ) {
        return;             // 고정
        if( !!this._betLockGuide ) {
            this._betLockGuide.attr( attr );
        }
        if( !!this._wheelChangeAR ) {
            this._wheelChangeAR.attr( attr );
        }
    },
    setPayTableState : function( isOpen ) {
        this._payTableOpened = isOpen;
    },
    setAutoSpinCount : function( count ) {
        this._remainAutoSpin = count;
        if( this._currSelectedAutoSpin === 'T' )
            this._lbAutoCount.setString( '&' );
        else if( this._currSelectedAutoSpin === 'I' )
            this._lbAutoCount.setString( '^' );
        else
            this._lbAutoCount.setString( count.toLocaleString().split( '.' )[ 0 ] );

        if( count === 0 ) {
            this._btnAutoStop.setVisible( false );
            this._btnAuto.setVisible( true );

            if( this._spinTestPanel !== null )
                this._spinTestPanel.endAutoSpin();

            this._isTurboMode = false;
            this._currSelectedAutoSpin = 0;
            this._btnFast.setEnabled(true);
        }
        else {
            this._spins += 1;
            if( this._spinTestPanel !== null )
                this._spinTestPanel.updateSpinCount();
        }
    },
    setUseBtnCancel:function(){
        this._isUseBtnCancel = true;
    },
    setIsSpin:function(isspin){
        this._isSpinning = isspin;
        if( this._extraBetPanel !== null )
            this._extraBetPanel.onSpin(isspin);
    },
    // setCallback
    setPayTableOpenCallback:function(callback){
        this._onPayTableOpen = callback;
    },
    setChangeBetCallback:function(callback){
        this._onChangeBetCallback = callback;
    },
    setAutoSpinCallback:function(startcallback,stopcallback){
        this._startAutoSpin = startcallback;
        this._stopAutoSpin = stopcallback;
    },
    setSpinCallback:function(spin,freespin,respin){
        this._spinCallback[CommonVideoSlotMenuSpinMode.Normal] = spin;
        this._spinCallback[CommonVideoSlotMenuSpinMode.FreespinCount] = freespin;
        this._spinCallback[CommonVideoSlotMenuSpinMode.FreespinNoneCount] = freespin;
        this._spinCallback[CommonVideoSlotMenuSpinMode.Respin] = respin;
    },
    setJackpotInfoCallback:function(callback){
        this._updateJackpotInfo = callback;
    },
    setStateSpin:function(func){
        this._isStateSpin = func;
    },

    // getter
    getBetLockGuide : function() {
        return this._betLockGuide;
    },

    getBetTable : function() {
        return this._betTable;
    },
    getBetLines : function() {
        return this._betLines;
    },
    getBetPerLine : function() {
        return this._betPerLine;
    },
    getBetIndex : function() {
        return this._betIndex;
    },
    getTotalBet : function() {
        return this._betLines * this._betPerLine;
    },
    getExtraTotalBet:function(){
        return this._betLines * this._betPerLine * this.getExtraBetMultiple();
    },
    getSlotLineCount : function() {
        return this._maxLine;
    },
    /**
     * Win에 add해주는 function을 만들까 했는데 모바일에서 동작을 확인할 수 없어 일단 현재 금액 가져오게 만듬.
     * 추후 add하도록 수정
     **/
    getCurrentWin:function(){
        return this._win;
    },
    getCubeGrade:function(){
        if( this._cubeInfo !== null )
            return this._cubeInfo.bettingGrades[this._betIndex];
        else
            return 0;
    },

    // Must Implement ( 외부에서 무조건 호출 ), 사실상 기능 사용 안함
    pauseSpinOverListener : function() {
    },
    resumeSpinOverListener : function() {
    },
    setBetEnable : function() {
    },




    playUnlockBetAnimation : function() {
        if( !RockN.Player.inVipMode ) {
            this._betLockGuide.setVisible(true);
            if (RockN.Player.level >= this._betLimit[this._betLimit.length - 1].level)
                this._betLockGuide.getAnimation().play('unlock');
            else
                this._betLockGuide.getAnimation().play('max');
        }
    },
    onRefresh : function() {
        if( this._fonLine ) {
            this._fonLine.setString( this._betLines.toLocaleString().split( '.' )[ 0 ] );
        }

        if( this._lbTotalBet ) {
            var prevString   = this._lbTotalBet.getString();
            var prevTotalBet = localeStringToNumber( prevString );

            var playWheel = this.updateVipMiniWheel( prevTotalBet, this.getTotalBet() );

            if( this.isSuperRichBet( ) ) {
                this.playWheelChangeAnimation( true );
            } else if( playWheel && RockN.Player.inVipMode) {
                this.playWheelChangeAnimation( false );
            } else if( prevTotalBet !== this.getTotalBet()){
                this.stopWheelChangeAnimation();
            }

            if( prevTotalBet !== this.getTotalBet()) {
                RockN.Player.onSlotBetChanged(this.getTotalBet(), this._betIndex, this._betTable.length, true);
            }

            var jackpotEnableRes = this.checkJackpotTotalBetLimit( prevTotalBet, this.getTotalBet() );
            var jackpotEnableIndex = jackpotEnableRes.index;
            var jackpotEnable = jackpotEnableRes.enable;
            if( jackpotEnableIndex !== -1 ) {
                this.playJackpotEnableAnimation( jackpotEnableIndex, jackpotEnable );
            }

            this._lbTotalBet.setString( bigNumberToString( this.getTotalBet(), 6 ) );
        }

        if( this._win > 0 ){
            this._lbWin.setVisible(true);
            this._lbWin.setString( bigNumberToString( this._win, 6 ) );
        }
        else
            this._lbWin.setVisible(false);
    },
    updateVipMiniWheel : function( prevBet, currBet ) {
        var loc_wheelType, changed = false;

        if( prevBet < RockN.Player.vipWheelBoundaryBet && currBet >= RockN.Player.vipWheelBoundaryBet ) {
            loc_wheelType = RNCInSlotMeta.MiniVIPWheelType.MEGA;
            changed = true;

        }
        else if( prevBet >= RockN.Player.vipWheelBoundaryBet && currBet < RockN.Player.vipWheelBoundaryBet ) {
            loc_wheelType = RNCInSlotMeta.MiniVIPWheelType.VIP;
            changed = true;
        }
        RockN.GlobalEvent.broadcast( EVT.IN_SLOT_RIGHT_ICON.CHANGE_VIP_WHEEL_TYPE, { wheelType : loc_wheelType } );
        return changed;
    },
    isSuperRichBet : function() {
        if( false === this._receiveSceneSpawn || this._prevBetIndex === this._betIndex || RockN.Player.isEnableHigherBet() === false )
            return false;

        var bResult = this._prevBetIndex < (this.betTable.length - RockN.Player._richBetTableCount) && this._betIndex >= (this.betTable.length - RockN.Player._richBetTableCount);
        this._prevBetIndex = this._betIndex;
        return bResult;
    },
    playWheelChangeAnimation : function( isSuperRichBet ) {
        if( !this._initialized ) {
            if( isSuperRichBet ) {
                this._wheelChangeAR.setVisible(true);
                this._wheelChangeAR.getAnimation().play( 'super' );
                SoundControl.getInstance().playEffect( slotCommon.EnableSuperRichBet );
            }
            return;
        }

        if( !!this._wheelChangeAR && RockN.Player.inVipMode ) {
            this._wheelChangeAR.setVisible(true);
            if( isSuperRichBet ) {
                this._wheelChangeAR.getAnimation().play( 'super' );
                SoundControl.getInstance().playEffect( slotCommon.EnableSuperRichBet );
            } else {
                this._wheelChangeAR.getAnimation().play( 'change' );
                SoundControl.getInstance().playEffect( slotCommon.VipWheelChange );
            }
        }
    },
    stopWheelChangeAnimation : function(){
        !!this._wheelChangeAR && this._wheelChangeAR.setVisible(false);
    },
    checkJackpotTotalBetLimit : function( prevBet, currBet ) {
        if( !this._jackpotTotalBetLimit ) {
            return {
                index: -1,
                enable: false
            }
        }

        var enable = false;
        var index = -1;
        for( var i = 0; i < this._jackpotTotalBetLimit.length; i++ ) {
            var limit = this._jackpotTotalBetLimit[ i ];
            if( limit <= 0 ) {
                continue;
            }
            if( prevBet < limit && currBet >= limit ) {
                enable = true;
                index = i;
                break;
            }
            if( prevBet >= limit && currBet < limit ) {
                enable = false;
                index = i;
                break;
            }
        }
        return {
            index: index,
            enable: enable
        }
    },


    // TODO : 삭제
    playJackpotEnableAnimation : function( index, enable ) {
        /*
        if( this.parent_game_scene && 'playJackpotEnableAnimation' in this.parent_game_scene ) {
            this.parent_game_scene.playJackpotEnableAnimation( index, enable );
        }
         */
    },
    enableAutoSpin:function(enable){
        /*
        this._btnAuto.setVisible( enable );
        this._btnSpin.setEnabled( enable );
        this._autoSpinCountTable = enable;

         */
    },
    // TODO : 삭제 / 이동
    changeBetUI : function() {

    },


    setSpinUISet:function(set){
        if( set === this._currSpinUISet )
            return;

        this._currSpinUISet = set;
        this._setSpinUISet();
        this._updateUI(false);
    },
    changeSpinMode:function(mode,usetotalwin){
        if( mode === this._currSpinMode )
            return;

        this._currSpinMode = mode;
        this._updateUI(usetotalwin);
    },

    setButtonEnable : function( isEnable ) {
        if( this._payTableOpened && isEnable )
            return;
        // spin btn release
        this._btnSpin[this._currSpinMode].onTouchCancelled();

        //
        if( this._remainAutoSpin > 0 ) {
            // spin btn
            this._btnSpin[this._currSpinMode].setEnabled( false );
            this._btnSpin[this._currSpinMode].setBright( false );
            this._btnAutoQuickStop.setEnabled( isEnable );
            this._btnAutoQuickStop.setBright( isEnable );
            // betting
            this._btnBetIncre.setEnabled( false );
            this._btnBetIncre.setBright( false );
            this._btnBetDecre.setEnabled( false );
            this._btnBetDecre.setBright( false );
            // auto
            this._btnAuto.setEnabled( false );
            this._btnAuto.setBright( false );
            this._btnAutoStop.setEnabled( true );
            this._btnAutoStop.setBright( true );
            // pay table
            this._btnPayTable.setEnabled( false );
            this._btnPayTable.setBright( false );
        }
        else{
            // spin btn
            this._btnSpin[this._currSpinMode].setEnabled( isEnable );
            this._btnSpin[this._currSpinMode].setBright( isEnable );
            // betting
            this._btnBetIncre.setEnabled( isEnable );
            this._btnBetIncre.setBright( isEnable );
            this._btnBetDecre.setEnabled( isEnable );
            this._btnBetDecre.setBright( isEnable );
            // auto
            if( this._currSpinMode !== CommonVideoSlotMenuSpinMode.Normal ){
                this._btnAuto.setEnabled( false );
                this._btnAuto.setBright( false );
            }
            else{
                this._btnAuto.setEnabled( isEnable );
                this._btnAuto.setBright( isEnable );
            }
            // pay table
            this._btnPayTable.setEnabled( isEnable );
            this._btnPayTable.setBright( isEnable );
        }

        /*
                if( isEnable === false ) {
                    this._betUI.visible = false;
                    this._richBetAR.setVisible(false)
                    this._autoBetUI.visible = false;
                    this.setGuideAttr( { x: -214, y: 54 } );
                }
        
         */
    },

    getCurrSpinMode:function(){
        return this._currSpinMode;
    },
    onSpinSucceed : function( ) {
        RockN.Player.onPostSpin( this.getExtraTotalBet() );
        this._spins += 1;
        this._isForcedApply = false;
    },
    isSpinEnable:function(){
        if( this._remainAutoSpin > 0 && this._currSpinMode === CommonVideoSlotMenuSpinMode.Normal )
            return this._btnAutoQuickStop.isEnabled();
        else
            return this._btnSpin[this._currSpinMode].isEnabled();
    },
    setQuickStopEnable : function( isEnable ) {
        for( var i=0; i<this._btnSpin.length; i++){
            this._btnSpin[i].setEnabled( false );
            this._btnSpin[i].setBright( false );
        }

        if( this._remainAutoSpin > 0 && this._currSpinMode === CommonVideoSlotMenuSpinMode.Normal ){
            this._btnAutoQuickStop.setEnabled( isEnable );
            this._btnAutoQuickStop.setBright( isEnable );
        }
        else{
            this._btnSpin[this._currSpinMode].setEnabled( isEnable );
            this._btnSpin[this._currSpinMode].setBright( isEnable );
        }
    },

    // bonus Winpanel
    openBonuswinPanel:function(initwin){
        this._bonusWinPanel.open(initwin);
    },
    updateBonuswinPanel:function(win, duration,fxtrack){
        this._bonusWinPanel.updateWin(win, duration,fxtrack);
    },
    closeBonuswinPanel:function(callback){
        this._bonusWinPanel.close(callback);
    },
    getBonusWinPanelWorldPos:function(){
        return this._bonusWinPanel.getWorldPos();
    },
    getBonusWinNode:function(){
        return this._bonusWinPanel;
    },
    setRemainSpinCount:function(count,iseffect){
        if( count > this._remainSpinCount && iseffect === true )
            this._spinCountFx.getAnimation().play( 'spin', -1, 0 );
        this._remainSpinCount = count;
        this._lbSpinCount.setString(this._remainSpinCount.toString());
    },
    getRemainSpinCount:function(){
        return this._remainSpinCount;
    },
    forcedTotalWinCash : function( increaseCash, disableJackpotUpdate, disableUpdate ) {
        if( this._isForcedApply && true === cc.game.config[ cc.game.CONFIG_KEY.developmentMode ] ) {
            console.warn('[ CommonSlotMenu ] forcedTotalWinCash twice called' );
            console.trace();
        }
        this._isForcedApply = false;
        this.setTotalWinCash( increaseCash, disableJackpotUpdate, disableUpdate );
    },
    setTotalWinCash : function( val, disableJackpotUpdate, disableUpdate ) {
        if( false === cc.isNumber( val ) ) {
            cc.assert( true, '***[ CommonSlotMenu ] setTotalWinCash : ', val, '\n 밸런스를 똑바로 입력하시오!!' );
        }

        this._win = val;
        this.onRefresh();

        if( !disableJackpotUpdate ) {
            this.updateJackpotInfo();
        }

        if( true === this._isForcedApply ) {
            return;
        }

        // console.log( '### set win called : ', val.toLocaleString() );

        this._isForcedApply = true;

        if( val <= 0 ) {
            return;
        }

        cc.log( '### set win called : ', val.toLocaleString(), disableUpdate );

        if( !disableUpdate ) {
            RockN.Player.onPostTotalPay( val );
        }
    },
    setBonusGameResult : function( win, totalWin, isCountUp ) {
        var prevtotalwin = this._totalWin;
        this._win = win;
        this._lbWin.setVisible(this._win > 0);
        this._lbWin.setString( bigNumberToString( this._win, 6 ) );

        if( cc.isNumber(totalWin) === false )
            this._totalWin = 0;
        else
            this._totalWin = totalWin;

        if( this._totalWin <= 0 )
            this._lbTotalWin.setString( '' );
        else if( isCountUp === true )
            countLabelBase( this._lbTotalWin, prevtotalwin, this._totalWin, 0, 0.5, 6 );
        else
            this._lbTotalWin.setString( bigNumberToString( this._totalWin, 6 ) );
    },
    saveTotalWin:function(isshowwin){
        RockN.Player.onPostTotalPay( this._totalWin );
        this._isForcedApply = true;
        if( isshowwin === true )
            this._lbWin.setString( bigNumberToString( this._totalWin, 6 ) );
        this._win = this._totalWin;
    },
    setTotalWinDirect:function(totalwin){
        // mobile
    },
    setBonusWinPanel:function(pnl){

    },
    setBonusWinTrailFx:function(ar){
        this._bonusWinPanel.setBonusWinTrailFx(ar);
    },

    getFreespinCountWorldPos:function(){
        if( !!this._lbSpinCount )
            return this._lbSpinCount.convertToWorldSpace( cc.p( 0, 0 ) );
        else
            return cc.p( 0, 0 );
    },
    getFreespinCountNode:function(){
        if( !!this._lbSpinCount )
            return this._lbSpinCount;
        else
            return this._mainUI;
    },
    getFreespinTotalwinWorldPos:function(){
        if( !!this._lbTotalWin )
            return this._lbTotalWin.convertToWorldSpace( cc.p( 0, 0 ) );
        else
            return cc.p( 0, 0 );
    },

    setExtraBetCustomAssets:function(ar,ui){
        this._extraBetCustomAssets = {AR:ar,UI:ui};
    },
    _initExtraBetPanel:function(betMultiple,betLimit){
        if( !!betMultiple ){
            this._extraBetPanel = new CommonSlotMenu_ExtraBetPanel(this._gameID%1000,betMultiple,betLimit,this._extraBetCustomAssets);
            this._extraBetPanel.attr( { x : 22, y : 24, anchorX : 0.5, anchorY : 0.5 } );
            this._mainUI.addChild(this._extraBetPanel);
        }
        else
            this._extraBetPanel = null;
    },
    setExtraBetCallback:function(callback){
        if( this._extraBetPanel !== null )
            this._extraBetPanel.setExtraBetCallback(callback);
    },
    setExtraBetEffectAnimation:function(arnode,tracklist,snd){
        if( this._extraBetPanel !== null )
            this._extraBetPanel.setExtraBetEffectAnimation(arnode,tracklist,snd);
    },
    extraBetChangeBet:function(){
        if( this._extraBetPanel !== null )
            this._extraBetPanel.onChangeBet(this.getTotalBet());
    },
    isExtraBet:function(){
        if( this._extraBetPanel !== null && this._extraBetPanel.getExtraBetMultiple() > 1 )
            return true;
        else
            return false;
    },
    setExtraBetSync:function(ison){
        if( this._extraBetPanel !== null )
            this._extraBetPanel.setSyncState(ison);
    },
    getExtraBetMultiple:function(){
        if( this._extraBetPanel !== null )
            return this._extraBetPanel.getExtraBetMultiple();
        else
            return 1;
    },
    isTurboMode:function(){
        return this._isTurboMode;
    },
    getAutoType:function(){
        if( this._currSelectedAutoSpin === 'T' )
            return this._AUTOSPIN_TYPE_ID.TURBO;
        else if( this._currSelectedAutoSpin === 'I' )
            return this._AUTOSPIN_TYPE_ID.INFINITY;
        else if( this._currSelectedAutoSpin > 0 )
            return this._AUTOSPIN_TYPE_ID.AUTO;
        else
            return this._AUTOSPIN_TYPE_ID.NONE;
    }
});

var CommonSlotMenu_BonnuswinPanel = cc.Node.extend({
    ctor:function(){
        this._super();
        this._initVariable();
        this._init();
    },
    _initVariable:function(){
        this._bonusWinAR = null;
        this._bonusWinUI = null;
        this._lbWin = null;
        this._currWin = 0;
        this._currTotalWin = 0;
        this._windigit = 6;

        this._closeCallback = null;

        this._bonusWinTrailFxAR = null;
    },
    _init:function(){
        ccs.armatureDataManager.addArmatureFileInfo( resCommonSlotMenu.CommonSlotMenuBonusWinAR  );
        this._bonusWinAR = RockN.createArmature( RockN.Util.getARNameFromFileName(resCommonSlotMenu.CommonSlotMenuBonusWinAR) );
        this._bonusWinAR.getAnimation().setMovementEventCallFunc( this._onBonusWinMovementEventCallback, this );
        this.addChild(this._bonusWinAR);
        this._bonusWinAR.setVisible(true);
        this._bonusWinAR.getAnimation().stop();

        this._bonusWinUI = ccs.uiReader.widgetFromJsonFile( resCommonSlotMenu.CommonSlotMenuBonusWinUI );
        this.addChild(this._bonusWinUI);
        this._bonusWinUI.attr({x:0,y:0,anchorX:0.5,anchorY:0.5});
        this._bonusWinUI.setVisible(true);

        this._lbWin = ccui.helper.seekWidgetByName( this._bonusWinUI, 'lbWin' );
        this._lbWin.setVisible(false);

        this.setVisible(false);
    },
    _onBonusWinMovementEventCallback:function( armature, movementType, movementID ) {
        if( movementType === ccs.MovementEventType.complete ) {
            switch(movementID){
                case 'open':
                    this._onOpen();
                    break;
                case 'collect':
                    this._onCollect();
                    break;
                case 'preclose':
                    this._close();
                    break;
                case 'close':
                    this._onClose();
                    break;
            }
        }
    },
    _close:function(){
        this._currTotalWin = 0;
        this._currWin = 0;
        this._lbWin.setVisible(false);
        this._lbWin.setString('');
        this._bonusWinAR.getAnimation().play('close',-1,0);
    },
    _onClose:function(){
        this._bonusWinAR.getAnimation().stop();
        if( this._bonusWinTrailFxAR !== null )
            this._bonusWinTrailFxAR.getAnimation().stop();
        this.setVisible( false );
        if( this._closeCallback !== null ){
            this._closeCallback();
            this._closeCallback = null;
        }
    },
    _onCollect:function(){
        this._bonusWinAR.getAnimation().play( 'normal', -1, 1 );
        this._currTotalWin += this._currWin;
        this._currWin = 0;
    },
    _onOpen:function(){
        this._bonusWinAR.getAnimation().play( 'normal', -1, 1 );
        this._lbWin.setVisible(true);
        if( this._currTotalWin > 0 )
            this._lbWin.setString(bigNumberToString( this._currTotalWin, this._windigit ));
        else
            this._lbWin.setString('');
    },
    open:function(initwin){
        this._currTotalWin = initwin;
        this.setVisible( true );
        this._bonusWinAR.getAnimation().play('open',-1,0);
    },
    close:function(callback){
        this._closeCallback = callback;
        this._bonusWinAR.getAnimation().play('preclose',-1,0);
    },
    updateWin:function(win, duration,fxtrack){
        if(win === 0)
            return;

        var dur = duration === undefined ? 0.3 : duration;
        this._currWin += win;
        this._lbWin.setVisible(true);
        this._bonusWinAR.getAnimation().play('collect', -1, 0);
        this._lbWin.unscheduleAllCallbacks();
        var curr = this._lbWin.getString() === '' ? this._currTotalWin : localeStringToNumber(this._lbWin.getString());
        countLabelBase(this._lbWin, curr, this._currTotalWin + this._currWin, 0, dur, this._windigit);
        if( this._bonusWinTrailFxAR !== null && !!fxtrack ){
            this._bonusWinTrailFxAR.setVisible(true);
            this._bonusWinTrailFxAR.getAnimation().play(fxtrack,-1,0);
        }
    },
    getWorldPos: function() {
        return this.convertToWorldSpace( cc.p( 0, 0 ) );
    },
    getTotalWin:function(){
        return this._currTotalWin;
    },
    setBonusWinTrailFx:function(ar){
        this._bonusWinTrailFxAR = RockN.createArmature( RockN.Util.getARNameFromFileName(ar) );
        this.addChild(this._bonusWinTrailFxAR);
        this._bonusWinTrailFxAR.setVisible(false);
        this._bonusWinTrailFxAR.getAnimation().stop();
    }
});

var CommonSlotMenu_ExtraBetPanel = cc.Node.extend({
    STATE:{
        ON:0,
        OFF:1,
        OVERBET:2,
        UNDERBET:3
    },
    EFFECT:{
        ON:0,
        OFF:1,
        ON_LOOP:2,
        OFF_LOOP:3
    },
    INTRO_ACTION_TAG:12121,
    ctor:function(gameid,betmultiple,betlimit,customAssets){
        this._super();
        this._initVariable();
        this._init(gameid,betmultiple,betlimit,customAssets);
    },
    _initVariable:function(){
        this._gameID = -1;
        this._AR = null;
        this._UI = null;
        this._imgFx = null;
        this._imgBtnBig = null;
        this._imgBtnSmall = null;
        this._btnBig = null;
        this._btnSmall = [];
        this._imgTooltip = [];

        this._extraBetEffectAR = null;
        this._extraBetEffectTrack = [];
        this._extraBetEffectSnd = null;

        this._currState = this.STATE.OFF;
        this._extraBetMultiple = 0;
        this._extraBetLimit = 0;

        this._isInitComplete = false;
        this._isSpin = false;

        this._extraBetCallback = null;
    },
    _init:function(gameid,betmultiple,betlimit,customAssets){
        this._extraBetMultiple = betmultiple;
        this._extraBetLimit = !!betlimit?betlimit:0;

        if( customAssets !== null )
            this._UI = ccs.uiReader.widgetFromJsonFile(customAssets.UI);
        else
            this._UI = ccs.uiReader.widgetFromJsonFile(resSlotMenuExtraBet.ExtraBetUI);

        this.addChild(this._UI);

        this._imgFx = ccui.helper.seekWidgetByName(this._UI, 'imgFx');
        if( customAssets !== null )
            this._AR = RockN.createArmature(RockN.Util.getARNameFromFileName(customAssets.AR));
        else{
            ccs.armatureDataManager.addArmatureFileInfo( resSlotMenuExtraBet.ExtraBetAR );
            this._AR = RockN.createArmature(RockN.Util.getARNameFromFileName(resSlotMenuExtraBet.ExtraBetAR));
        }
        this._imgFx.addChild(this._AR);

        // tooltip
        this._imgTooltip[this.STATE.ON] = ccui.helper.seekWidgetByName(this._UI, 'imgInfo0');
        var tooltip0 = new cc.Sprite( '#sl_'+gameid+'ExBet_tooltip_0.png' );
        tooltip0.attr( { x : 0, y : 0, anchorX : 0, anchorY : 0 } );
        this._imgTooltip[this.STATE.ON].addChild(tooltip0);
        this._imgTooltip[this.STATE.OFF] = ccui.helper.seekWidgetByName(this._UI, 'imgInfo1');
        this._imgTooltip[this.STATE.OVERBET] = ccui.helper.seekWidgetByName(this._UI, 'imgInfo2');
        this._imgTooltip[this.STATE.UNDERBET] = ccui.helper.seekWidgetByName(this._UI, 'imgProgressFx');
        this._imgTooltip[this.STATE.UNDERBET].addChild(new cc.Sprite( '#sl_'+gameid+'ExBet_progress.png' ));
        this._showTooltip(false);

        // btn Big
        this._imgBtnBig = ccui.helper.seekWidgetByName(this._UI, 'imgExBet_B');
        this._imgBtnBig.setVisible(false);
        this._btnBig = ccui.helper.seekWidgetByName(this._UI, 'chExBet_B');
        //this._btnBig.addTouchEventListener( this._onBtnTouchBig, this );
        this._btnBig.addEventListener(this._onBtnTouchBig, this);
        this._btnBig.setVisible(true);
        this._btnBig.setSelected(false);

        // btn Small
        this._imgBtnSmall = ccui.helper.seekWidgetByName(this._UI, 'imgExBet_S');
        this._imgBtnSmall.setVisible(false);

        this._btnSmall[this.STATE.ON] = ccui.helper.seekWidgetByName(this._UI, 'btnS0');
        this._btnSmall[this.STATE.OFF] = ccui.helper.seekWidgetByName(this._UI, 'btnS1');
        this._btnSmall[this.STATE.OVERBET] = ccui.helper.seekWidgetByName(this._UI, 'btnS1');
        this._btnSmall[this.STATE.UNDERBET] = ccui.helper.seekWidgetByName(this._UI, 'btnS2');
        for( var i=0; i<this._btnSmall.length; i++ ){
            this._btnSmall[i].addTouchEventListener( this._onBtnTouchSmall, this );
            this._btnSmall[i].setVisible(false);
            this._btnSmall[i].setEnabled(false);
        }
    },
    _onBtnTouchBig:function( sender, type ){
        if( this._isSpin )
            return;

        SoundControl.getInstance().playEffect( globalCommon.Click );
        switch( type ){
            case ccui.CheckBox.EVENT_SELECTED:
                this._changeExtraBetState(this.STATE.ON);
                break;
            case ccui.CheckBox.EVENT_UNSELECTED:
                this._changeExtraBetState(this.STATE.OFF);
                break;
        }
    },
    _onBtnTouchSmall:function( sender, type ){
        if( this._isSpin )
            return;

        switch( type ){
            case ccui.Widget.TOUCH_ENDED:
                SoundControl.getInstance().playEffect( globalCommon.Click );
                if( this._currState === this.STATE.ON )
                    this._changeExtraBetState(this.STATE.OFF);
                else if( this._currState === this.STATE.OFF )
                    this._changeExtraBetState(this.STATE.ON);
                else
                    this._showBtn(true);
                break;
        }
    },
    _onExtraBetEffectMovementEffect:function( ar, type, id ) {
        if( type === ccs.MovementEventType.complete ) {
            switch(id){
                case this._extraBetEffectTrack[this.EFFECT.ON]:
                    this._playExtraBetEffect(this.EFFECT.ON_LOOP,1);
                    break;
                case this._extraBetEffectTrack[this.EFFECT.OFF]:
                    this._playExtraBetEffect(this.EFFECT.OFF_LOOP,1);
                    break;
            }
        }
    },

    _changeExtraBetState:function(state){
        if( this._currState === state )
            return;

        this._btnSmall[this._currState].setVisible(false);
        this._currState = state;
        this._btnSmall[this._currState].setVisible(true);
        this._showBtn(true);

        switch( state ){
            case this.STATE.ON:
                this._btnBig.setSelected(true);
                this._playExtraBetEffect(this.EFFECT.ON,0);
                if( this._extraBetCallback !== null )
                    this._extraBetCallback(true);
                break;
            case this.STATE.OFF:
                this._btnBig.setSelected(false);
                this._playExtraBetEffect(this.EFFECT.OFF,0);
                if( this._extraBetCallback !== null )
                    this._extraBetCallback(false);
                break;
            case this.STATE.OVERBET:
                this._btnBig.setSelected(false);
                break;
            case this.STATE.UNDERBET:
                this._btnBig.setEnabled(true);
                this._btnBig.setSelected(false);
                this._btnBig.setEnabled(false);
                this._playExtraBetEffect(this.EFFECT.OFF,0);
                SoundControl.getInstance().playEffect( globalCommon.couponOff );
                if( this._extraBetCallback !== null )
                    this._extraBetCallback(false);
                break;
        }
    },
    _showTooltip:function(isBig){
        for( var i=0; i<this._imgTooltip.length; i++ )
            this._imgTooltip[i].setVisible(false);
        if( isBig )
            this._imgTooltip[this._currState].setVisible(true);
    },
    _showBtn:function(isBig){
        this._showTooltip(isBig);
        this._imgBtnBig.setVisible(isBig);
        if( this._currState === this.STATE.UNDERBET ){
            this._btnBig.setEnabled(false);
            this._AR.setVisible(false);
            this._AR.getAnimation().stop();

        }
        else{
            this._btnBig.setEnabled(isBig);
            this._AR.setVisible(true);
            this._AR.getAnimation().play(isBig?'loop_B':'loop_S',-1,1);
        }

        this._imgBtnSmall.setVisible(!isBig);
        this._btnSmall[this._currState].setEnabled(!isBig);
    },
    _playExtraBetEffect:function(index,loop){
        if( this._extraBetEffectAR !== null ){
            if( !!this._extraBetEffectTrack[index] ){
                this._extraBetEffectAR.setVisible(true);
                this._extraBetEffectAR.getAnimation().play(this._extraBetEffectTrack[index],-1,loop);
                if( !!this._extraBetEffectSnd )
                    SoundControl.getInstance().playEffect( this._extraBetEffectSnd );
            }
            else{
                this._extraBetEffectAR.getAnimation().stop();
                this._extraBetEffectAR.setVisible(false);
            }
        }
    },

    onSpin:function(isSpin){
        this._isSpin = isSpin;
        if( this._isSpin )
            this._showBtn(false);

        this._btnSmall[this._currState].setEnabled(!this._isSpin);
        if( this._isInitComplete ){
            if( this._currState === this.STATE.ON )
                this._playExtraBetEffect(this.EFFECT.ON_LOOP,1);
            else
                this._playExtraBetEffect(this.EFFECT.OFF_LOOP,1);
        }
        else{
            if( this._currState !== this.STATE.UNDERBET ){
                this.stopActionByTag(this.INTRO_ACTION_TAG);
                this._changeExtraBetState(this.STATE.ON);
            }
            this._isInitComplete = true;
        }
    },
    onChangeBet:function(totalbet){
        if( totalbet < this._extraBetLimit )
            this._changeExtraBetState(this.STATE.UNDERBET);
        else if( this._isInitComplete === false )
            this.runAction(cc.sequence(cc.delayTime(0.5), cc.callFunc(this._changeExtraBetState.bind(this,this.STATE.ON),this))).setTag( this.INTRO_ACTION_TAG );
        else if( totalbet >= this._extraBetLimit && this._currState === this.STATE.UNDERBET )
            this._changeExtraBetState(this.STATE.OVERBET);
    },
    getExtraBetMultiple:function(){
        if( this._currState === this.STATE.ON )
            return 1+this._extraBetMultiple;
        else
            return 1;
    },
    setExtraBetEffectAnimation:function(arnode,tracklist,snd){
        this._extraBetEffectAR = arnode;
        this._extraBetEffectTrack = tracklist;
        this._extraBetEffectSnd = snd;
        if( this._extraBetEffectAR !== null )
            this._extraBetEffectAR.getAnimation().setMovementEventCallFunc( this._onExtraBetEffectMovementEffect, this );
    },
    setExtraBetCallback:function(callback){
        this._extraBetCallback = callback;
    },
    setSyncState:function(ison){
        if( ison )
            this._changeExtraBetState(this.STATE.ON);
        else
            this._changeExtraBetState(this.STATE.OFF);

        this.onSpin(true);
    }
});

CommonVideoSlotMenu.create = function( game_scene, gameid ) {
    var pLayer = new CommonVideoSlotMenu( gameid );
    if( pLayer && pLayer.init( game_scene ) ) {
        return pLayer;
    }
    return null;
};
