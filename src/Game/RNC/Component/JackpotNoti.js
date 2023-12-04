/**
 * Created by Federrine on 2022. 04. 07..
 * Slot JackpotNoti Node
 * parent - ar [noti back ar]
 *        - ui [noti main ui] - lbJp [jackpot value label]
 *                            - fxJp [fx position node] - fxar [win/prewin]
 *                                                      - progressar [jackpot progressive on/off]
 *                            - fxProg [jackpot progressive betting img]
 * 2022. 08. 05. Multi Jackpot Win 추가
 * 2022. 08. 05. Jackpot Rolling 추가
 * TODO : jackpot boosting
 */
var JackpotNotiRollingType = {
    None:0,
    FadeInOut:1,
    OnOff:2
};
var SlotJackpotNotiNode = cc.Node.extend({
    ACTION_TAG:650000,
    ctor:function(ar,ui,fx,progress,jackpotcount,digitarr,useboost){
        this._super();
        this._initVariable();
        this._init(ar,ui,fx,progress,jackpotcount,digitarr,useboost);
    },
    _initVariable:function(){
        this._AR = null;
        this._UI = null;
        this._fxARArr = [];
        this._imgProgressArr = [];
        this._progressARArr = [];
        this._lbJackpotArr = [];
        this._imgJackpotArr = [];
        this._imgBase = [];
        this._jackpotController = null;

        this._jackpotCount = 0;
        this._currWinJackpotIndexArr = [];
        this._isProgressArr = [];

        this._enableJackpotSnd = null;
        this._disableJackpotSnd = null;

        this._fxARBones = null;
        this._rollingIndexArrList = [];
        this._rollingType = JackpotNotiRollingType.None;
        this._isRolling = false;

        this._idleList = [];

        this._useBoost = false;
        this._isBoostMode = false;
    },
    _init:function(ar,ui,fx,progress,jackpotcount,digitarr,useboost){
        this._jackpotCount = jackpotcount;
        this._useBoost = !!useboost?useboost:false;
        this._initJackpotNoti(ar,ui,digitarr);
        this._initJackpotFx(fx);
        this._initProgressFx(progress);
    },
    _initJackpotNoti:function(ar,ui,digitarr){
        if( ar !== null ){
            this._AR = RockN.createArmature(RockN.Util.getARNameFromFileName(ar));
            this._AR.getAnimation().setMovementEventCallFunc( this._onJackpotNotiMovementEventCallBack, this );
            this.addChild( this._AR );
            this._AR.setVisible(true);
        }

        this._UI = ccs.uiReader.widgetFromJsonFile(ui);
        this.addChild( this._UI );
        this._UI.attr({ x:0, y:0, anchorX:0.5, anchorY:0.5 });

        for( var i=0; i<this._jackpotCount; i++){
            this._lbJackpotArr[i] = ccui.helper.seekWidgetByName(this._UI, 'lbJp'+i);
            if( this._lbJackpotArr[i] !== null )
                this._lbJackpotArr[i].setVisible(true);

            this._imgJackpotArr[i] = ccui.helper.seekWidgetByName(this._UI, 'imgJPTx'+i);
            if( this._imgJackpotArr[i] !== null )
                this._imgJackpotArr[i].setVisible(true);
        }

        this._jackpotController = new JackpotNotiController(this._lbJackpotArr );
        this._jackpotController.setMaxDigit( digitarr );
        this._jackpotController.setMaxDigitStandardIndex( digitarr.length-1 );
        this._jackpotController.setProgress( true );


        this._imgBase[0] = ccui.helper.seekWidgetByName(this._UI, 'imgBase');
        this._imgBase[1] = ccui.helper.seekWidgetByName(this._UI, 'imgBase_boost');
    },
    _initJackpotFx:function(fx){
        if( fx !== null ){
            for( var i=0; i<this._jackpotCount; i++){
                var fxnode = ccui.helper.seekWidgetByName(this._UI, 'fxJp'+i);
                if( fxnode !== null ){
                    fxnode.setVisible(true);
                    this._fxARArr[i] = RockN.createArmature(RockN.Util.getARNameFromFileName(fx));
                    this._fxARArr[i].getAnimation().stop();
                    this._fxARArr[i].setVisible(false);
                    fxnode.addChild( this._fxARArr[i] );
                }
                else
                    this._fxARArr[i] = null;
            }
        }
    },
    _initProgressFx:function(progress){
        for( var i=0; i<this._jackpotCount; i++){
            var fxnode = ccui.helper.seekWidgetByName(this._UI, 'fxJp'+i);
            if( fxnode !== null && progress !== null ){
                this._progressARArr[i] = RockN.createArmature(RockN.Util.getARNameFromFileName(progress));
                this._progressARArr[i].getAnimation().stop();
                this._progressARArr[i].setVisible(false);
                fxnode.addChild( this._progressARArr[i] );

                var imgNode = ccui.helper.seekWidgetByName(this._UI, 'pnFxProg');
                this._imgProgressArr[i] = ccui.helper.seekWidgetByName(imgNode, 'fxProg'+i);
                this._imgProgressArr[i].setVisible(false);
                this._isProgressArr[i] = true;
            }
            else{
                this._progressARArr[i] = null;
                this._imgProgressArr[i] = null;
                this._isProgressArr[i] = true;
            }
        }
    },
    _onJackpotNotiMovementEventCallBack: function(armature, movementType, movementID){
        if( movementType === ccs.MovementEventType.complete ){
            switch(movementID){
            }
        }
    },
    _resetJackpotLabel:function(){
        if( this._useBoost ){
            for( var i=0; i<this._jackpotCount/2; i++){
                if( this._lbJackpotArr[i] !== null )
                    this._lbJackpotArr[i].setVisible(!this._isBoostMode);
                if( this._lbJackpotArr[i+this._jackpotCount/2] !== null )
                    this._lbJackpotArr[i+this._jackpotCount/2].setVisible(this._isBoostMode);

                if( this._imgJackpotArr[i] !== null )
                    this._imgJackpotArr[i].setVisible(!this._isBoostMode);
                if( this._imgJackpotArr[i+this._jackpotCount/2] !== null )
                    this._imgJackpotArr[i+this._jackpotCount/2].setVisible(this._isBoostMode);
            }
        }
        else{
            for( var i=0; i<this._lbJackpotArr.length; i++ ){
                if( this._lbJackpotArr[i] !== null )
                    this._lbJackpotArr[i].setVisible(this._isProgressArr[i]);

                if( this._progressARArr[i] !== null )
                    this._progressARArr[i].setVisible(!this._isProgressArr[i]);
            }
        }
    },
    _setwinJackpotLabel:function(){
        this._resetJackpotLabel();
        for( var i=0; i<this._currWinJackpotIndexArr.length; i++ ){
            if( this._lbJackpotArr[this._currWinJackpotIndexArr[i]] !== null )
                this._lbJackpotArr[this._currWinJackpotIndexArr[i]].setVisible(false);

            if( this._progressARArr[this._currWinJackpotIndexArr[i]] !== null )
                this._progressARArr[this._currWinJackpotIndexArr[i]].setVisible(false);
        }
    },
    updateJackpotInfo: function( info ) {
        this._jackpotController.updateJackpotInfo(info);
    },
    playJackpotWin:function(index){
        if( index >= 0 ){
            this._currWinJackpotIndexArr.push(index);
            if( this._rollingType !== JackpotNotiRollingType.None ){
                this.stopRolling();
                this._setRollingJackpot();
            }
            this._playJackpotWin();
            this._setwinJackpotLabel();

        }
    },
    _playJackpotWin:function(){
        for( var i=0; i<this._currWinJackpotIndexArr.length; i++ ){
            if( this._fxARArr[this._currWinJackpotIndexArr[i]] !== null ){
                this._fxARArr[this._currWinJackpotIndexArr[i]].setVisible(true);
                if( this._fxARBones !== null )
                    SlotUtils.arUtil.changeSkin(this._fxARArr[this._currWinJackpotIndexArr[i]],this._fxARBones,this._currWinJackpotIndexArr[i],true);
                this._fxARArr[this._currWinJackpotIndexArr[i]].getAnimation().play('pay',-1,1);
            }
        }
    },
    _setRollingJackpot:function(){
        for( var i=0; i<this._currWinJackpotIndexArr.length; i++ ) {
            for(var j = 0; j < this._rollingIndexArrList.length; j++) {
                if(this._rollingIndexArrList[j].indexList.indexOf(this._currWinJackpotIndexArr[i]) !== -1) {
                    for( var k=0; k<this._rollingIndexArrList[j].indexList.length; k++ ) {
                        if (this._rollingIndexArrList[j].indexList[k] === this._currWinJackpotIndexArr[i]) {
                            this._lbJackpotArr[this._rollingIndexArrList[j].indexList[k]].setOpacity(255);
                            this._imgJackpotArr[this._rollingIndexArrList[j].indexList[k]].setOpacity(255);
                        }
                        else {
                            this._lbJackpotArr[this._rollingIndexArrList[j].indexList[k]].setOpacity(0);
                            this._imgJackpotArr[this._rollingIndexArrList[j].indexList[k]].setOpacity(0);
                        }
                    }
                }
            }
        }
    },
    playPreJackpotWin:function(index){
        if( index >= 0 && this._fxARArr[index] !== null ){
            this._fxARArr[index].setVisible(true);
            if( this._fxARBones !== null )
                SlotUtils.arUtil.changeSkin(this._fxARArr[index],this._fxARBones,index,true);
            this._fxARArr[index].getAnimation().play('prepay',-1,1);
            this._setwinJackpotLabel();
        }
    },
    stopJackpotWin:function(){
        for( var i=0; i<this._currWinJackpotIndexArr.length; i++ ){
            if( this._fxARArr[this._currWinJackpotIndexArr[i]] !== null ){
                this._fxARArr[this._currWinJackpotIndexArr[i]].setVisible(false);
                this._fxARArr[this._currWinJackpotIndexArr[i]].getAnimation().stop();
            }
        }

        this._currWinJackpotIndexArr.length = 0;
        this._setwinJackpotLabel();
        if( this._rollingType !== JackpotNotiRollingType.None )
            this.startRolling();

        this._startIdle();
    },
    stopPreJackpotWin:function(){
        for( var i=0; i<this._fxARArr.length; i++ ){
            if( this._fxARArr[i] !== null ){
                this._fxARArr[i].setVisible(false);
                this._fxARArr[i].getAnimation().stop();
            }
        }

        this._startIdle();
    },
    enableProgressive:function(index,isenable,issync){
        if( isenable === true ){
            if( this._isProgressArr[index] === false && this._lbJackpotArr[index] !== null ){
                this._isProgressArr[index] = true;
                this._imgProgressArr[index].setVisible(false);
                this._imgProgressArr[index].stopAllActions();
                this._lbJackpotArr[index].setVisible(true);
                this._progressARArr[index].setVisible(true);
                SlotUtils.arUtil.changeSkin(this._progressARArr[index],'[s]imgTxt',-1,true);
                this._progressARArr[index].getAnimation().play('off',-1,0);
                if( this._enableJackpotSnd !== null && issync === false )
                    SoundControl.getInstance().playEffect(this._enableJackpotSnd);
            }
        }
        else{
            if( this._isProgressArr[index] === true && this._lbJackpotArr[index] !== null ){
                this._isProgressArr[index] = false;
                this._imgProgressArr[index].setVisible(true);
                this._imgProgressArr[index].runAction( cc.sequence( cc.delayTime( 5 ), cc.hide() ) );
                this._lbJackpotArr[index].setVisible(false);
                this._progressARArr[index].setVisible(true);
                var skinIndex = (this._jackpotCount-1-index)*2;
                if( RockN.Player.inVipMode === false )
                    skinIndex += 1;
                SlotUtils.arUtil.changeSkin(this._progressARArr[index],'[s]imgTxt',skinIndex,true);
                this._progressARArr[index].getAnimation().play('on',-1,0);
                if( this._disableJackpotSnd !== null && issync === false )
                    SoundControl.getInstance().playEffect(this._disableJackpotSnd);
            }
        }

        // 동기화시에는 progress tooltip 보여주지 않음
        if( issync === true && this._lbJackpotArr[index] !== null ){
            this._imgProgressArr[index].setVisible(false);
            this._imgProgressArr[index].stopAllActions();
        }
    },
    closeProgressiveTooltip:function(){
        for( var i=0; i<this._imgProgressArr.length; i++ ){
            if( this._imgProgressArr[i] !== null ){
                this._imgProgressArr[i].stopAllActions();
                this._imgProgressArr[i].setVisible(false);
            }
        }
    },
    setSound:function(enablesnd,disablesnd){
        this._enableJackpotSnd = enablesnd;
        this._disableJackpotSnd = disablesnd;
    },
    setFxARBones:function(bones){
        this._fxARBones = bones;
    },
    setRollingInfo:function(rollingtype,rollingindexarrlist){
        this._rollingType = rollingtype;
        if( !!rollingindexarrlist ){
            for( var i=0; i<rollingindexarrlist.length; i++ )
                this._rollingIndexArrList.push({currIndex:0,indexList:rollingindexarrlist[i]});
        }
    },
    startRolling:function(){
        if( this._isRolling === true )
            return;

        this._isRolling = true;
        for( var i=0; i<this._rollingIndexArrList.length; i++ ){
            this._rollingIndexArrList[i].currIndex = 0;
            for( var j=0; j<this._rollingIndexArrList[i].indexList.length; j++ ){
                this._lbJackpotArr[this._rollingIndexArrList[i].indexList[j]].setOpacity(0);
                this._imgJackpotArr[this._rollingIndexArrList[i].indexList[j]].setOpacity(0);
            }

            this._lbJackpotArr[this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex]].setOpacity(255);
            this._imgJackpotArr[this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex]].setOpacity(255);
        }

        switch( this._rollingType ){
            case JackpotNotiRollingType.None:
                break;
            case JackpotNotiRollingType.FadeInOut:
                this.schedule( this._playFadeInOutRolling, 5.0, cc.REPEAT_FOREVER );
                break;
            case JackpotNotiRollingType.OnOff:
                this.schedule( this._playOnOffRolling, 5.0, cc.REPEAT_FOREVER );
                break;
        }
    },
    stopRolling:function(){
        this._isRolling = false;
        this.unscheduleAllCallbacks();
        for(var i=0; i<this._rollingIndexArrList.length; i++ ) {
            for( var j=0; j<this._rollingIndexArrList[i].indexList.length; j++ ){
                this._lbJackpotArr[this._rollingIndexArrList[i].indexList[j]].stopAllActions();
                this._imgJackpotArr[this._rollingIndexArrList[i].indexList[j]].stopAllActions();
            }
            var previndex = (this._rollingIndexArrList[i].indexList.length+this._rollingIndexArrList[i].currIndex-1)%this._rollingIndexArrList[i].indexList.length;
            this._lbJackpotArr[previndex].setOpacity(0);
            this._imgJackpotArr[previndex].setOpacity(0);

            this._lbJackpotArr[this._rollingIndexArrList[i].currIndex].setOpacity(255);
            this._imgJackpotArr[this._rollingIndexArrList[i].currIndex].setOpacity(255);
        }
    },
    _playFadeInOutRolling:function(){
        if( this._isRolling === false )
            return;

        for(var i=0; i<this._rollingIndexArrList.length; i++ ){
            var currIndex = this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex];
            this._rollingIndexArrList[i].currIndex++;
            this._rollingIndexArrList[i].currIndex = this._rollingIndexArrList[i].currIndex%this._rollingIndexArrList[i].indexList.length;
            var nextIndex = this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex];

            this._lbJackpotArr[currIndex].runAction(cc.fadeOut(0.5)).setTag( this.ACTION_TAG );
            this._imgJackpotArr[currIndex].runAction(cc.fadeOut(0.5)).setTag( this.ACTION_TAG );

            this._lbJackpotArr[nextIndex].runAction(cc.fadeIn(0.5)).setTag( this.ACTION_TAG );
            this._imgJackpotArr[nextIndex].runAction(cc.fadeIn(0.5)).setTag( this.ACTION_TAG );
        }
    },
    _playOnOffRolling:function(){
        for(var i=0; i<this._rollingIndexArrList.length; i++ ){
            var currIndex = this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex];
            this._rollingIndexArrList[i].currIndex++;
            this._rollingIndexArrList[i].currIndex = this._rollingIndexArrList[i].currIndex%this._rollingIndexArrList[i].indexList.length;
            var nextIndex = this._rollingIndexArrList[i].indexList[this._rollingIndexArrList[i].currIndex];

            this._lbJackpotArr[currIndex].setOpacity(0);
            this._imgJackpotArr[currIndex].setOpacity(0);

            this._lbJackpotArr[nextIndex].setOpacity(255);
            this._imgJackpotArr[nextIndex].setOpacity(255);
        }
    },
    setVisibleIndex:function(index){
        for( var i=0; i<this._jackpotCount; i++){
            if(i === index){
                this._lbJackpotArr[i].setVisible(true);
                this._imgJackpotArr[i].setVisible(true);
                this._lbJackpotArr[i].setOpacity(255);
                this._imgJackpotArr[i].setOpacity(255);
            }
            else
            {
                this._lbJackpotArr[i].setVisible(false);
                this._imgJackpotArr[i].setVisible(false);
            }
        }
    },
    setIdleInfo:function(list){
        this._idleList = list;
    },
    _startIdle:function(){
        for( var i=0; i<this._idleList.length; i++ ){
            if( this._fxARArr[this._idleList[i].jackpotindex] !== null ){
                this._fxARArr[this._idleList[i].jackpotindex].setVisible(true);
                this._fxARArr[this._idleList[i].jackpotindex].getAnimation().play(this._idleList[i].trackname,-1,1);
            }
        }
    },
    changeBoostMode:function(isboost,isanim){
        this._isBoostMode = isboost;
        if( this._imgBase[0] !== null && this._imgBase[1] !== null ){
            this._imgBase[0].setVisible(!this._isBoostMode);
            this._imgBase[1].setVisible(this._isBoostMode);
        }
        this._resetJackpotLabel();
    }
});
