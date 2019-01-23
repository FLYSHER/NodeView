/**
 * Created by Podong on 2018. 1. 18..
 */

//region ARPool
var ARPool = {};

ARPool.pools= [];

ARPool.DEFAULT_INIT_COUNT = 15;

ARPool.findOrCreate = function(arName) {
    var pool = ARPool.find(arName);
    if(!pool) {
        pool = ARPool.Create(arName);
    }
    return pool;
};

ARPool.findIndex = function (arName) {
    for (var i = ARPool.pools.length - 1; i >= 0; i--) {
        if (ARPool.pools[i]._arName === arName) {
            return i;
        }
    }
    return -1;
};

ARPool.find = function(arName){
    var i = ARPool.findIndex(arName);
    if(i >= 0) {
        return ARPool.pools[i];
    }else {
        return null;
    }
};

ARPool.remove = function (arName) {
    var i = ARPool.findIndex(arName);
    if(i >= 0){
        ARPool.pools.splice(i, 1);
    }
};

ARPool.create = function(arName, initCount) {
    return new ARPool.ArObjectPool(arName, initCount);
};

ARPool.isHierarchyARVisible = function (target) {
    if(target.isVisible && target.isVisible()){
        var parent = target.getParent();

        if((!parent) || parent === cc.director.getRunningScene())
            return true;
        else
            return ARPool.isHierarchyARVisible(parent);
    }
    return false;
};

ARPool.ArObjectPool = cc.Node.extend({

    ctor: function(arName, initCount) {
        this._super();
        this._initVariable();

        this._arName = arName;
        //RockN.GameScene.addChild(this);
        cc.director.getRunningScene().addChild(this);
        ARPool.pools.push(this);

        cc.log("[CHECK] CreateARPool : ", this._arName);
        this._initCount = (initCount) || ARPool.DEFAULT_INIT_COUNT;
        this.createNewARs();
    },

    _initVariable: function () {
        this._arrARs = [];
        this._total	= 0;
        this._arName = null;
        this._initCount = ARPool.DEFAULT_INIT_COUNT;
    },

    onExit : function () {
        this._super();
    },

    cleanup : function () {
        cc.log("[CHECK] start g_ArrArSymbol : ", ARPool.pools.length, this._arName, " total :", this._total);

        var len = this._arrARs.length;
        for(var n = 0; n < len; n++) {
            this._arrARs[n].cleanup();
            this._arrARs[n].release();
            this._arrARs[n] = null;
        }
        this._arrARs = [];
        this._total = 0;
        ARPool.remove(this._arName);
        cc.log("[CHECK] g_ArrArSymbol : ", ARPool.pools.length);

        this._super();
    },

    obtainAR : function (parent) {
        if(this._arrARs.length <= 0){
            this.createNewARs();
        }
        var ar = this._arrARs.pop();
        if(parent) {
            parent.addChild(ar);
            ar.release();
        }
        ar.setVisible(true);
        return ar;
    },

    returnAR : function (ar) {
        ar.setVisible(false);
        if(this._arrARs) {
            ar.retain();
            ar.removeFromParent(false);
            this._arrARs.push(ar);
        }
        else {
            cc.log("[CHECK] returnAR : ????");
            ar.removeFromParent(true);
            ar = null;
        }
    },

    createNewARs : function () {
        for(var n = 0; n < this._initCount; n++) {
            var ar = ccs.Armature(this._arName);
            ar.retain();
            ar.setVisible(false);
            this._arrARs.push(ar);
            this._total++;
        }
        cc.log("[CHECK] Create newARs.. totals ?", this._arName,  this._total);
    }
});

//endregion pool

var TYPE_AR_STATE = { STOP : 0,  PAUSE : 1, PLAY : 2 };
//var TYPE_AR_STATE = { STOP : "STOP",  PAUSE : "PAUSE", PLAY : "PLAY"};

var ENUM_ANIPLAY_MODE = { STOP : 0, PLAY : 2 , PLAYWITHINDEX : 3 , PLAYWITHNAMES : 4 , PLAYWITHINDEXES : 5 };

var PROPS_ANIPLAY = {
    PLAYTYPE : 0, PLAYMODE :1, PLAYDATA : 2, DURATIONTO : 3, LOOP : 4, FRAMEINDEX : 5,
    SPEEDSCALE : 6, MOVEMENTCOUNT : 7 , USEROBJECT : 8
};

var ARAnimationBridge = cc.Class.extend({

    ctor : function (owner) {
        this._owner = null;
        this.setOwner(owner);
    },
    setOwner : function (owner) {
        this._owner = owner;
    },

    getCurrentFrameIndex: function () {
        return this._owner.getCurrentFrameIndex();
    },

    isComplete : function () {
        return this._owner.isComplete();
    },

    isPlaying : function () {
        return this._owner.isPlaying();
    },

    isIgnoreFrameEvent: function () {
        return this._owner.isIgnoreFrameEvent();
    },

    setSpeedScale : function (speedScale){
        this._owner.setSpeedScale(speedScale);
    },

    getSpeedScale : function () {
        return this._owner.getSpeedScale();
    },

    getCurrentPercent :function () {
        return this._owner.getCurrentPercent();
    },

    getRawDuration :function() {
        return this._owner.getRawDuration();
    },

    play : function(animationName, durationTo,  loop) {
        this._owner.play(animationName, durationTo, loop);
    },

    playWithIndex: function(animationIndex, durationTo, loop ) {
        this._owner.playWithIndex(animationIndex, durationTo, loop);
    },

    playWithNames : function(movementNames, durationTo,  loop) {
        this._owner.playWithNames(movementNames, durationTo, loop);
    },

    playWithIndexes : function(movementIndexes, durationTo,loop) {
        this._owner.playWithIndexes(movementIndexes, durationTo, loop);
    },

    gotoAndPlay: function(frameIndex) {
        this._owner.gotoAndPlay(frameIndex);
    },

    gotoAndPause : function(frameIndex) {
        this._owner.gotoAndPause(frameIndex);
    },

    pause :function() {
        this._owner.pause();
    },

    resume : function() {
        this._owner.resume();
    },

    stop : function() {
        this._owner.stop();
    },

    getMovementCount : function(){
        return this._owner.getMovementCount();
    },

    getCurrentMovementID: function () {
        return this._owner.getCurrentMovementID();
    },

    setUserObject : function(userObject){
        this._owner.setUserObject(userObject);
    },

    getUserObject : function() {
        return this._owner.getUserObject();
    },

    // update : function(dt){
    //     return this._owner.animationUpdate(dt);
    // },

    setFrameEventCallFunc: function (callFunc, target) {
        return this._owner.setFrameEventCallFunc(callFunc, target);
    },

    setMovementEventCallFunc: function (callFunc, target) {
        return this._owner.setMovementEventCallFunc(callFunc, target);
    },

    frameEvent : function(bone, frameEventName, originFrameIndex, currentFrameIndex) {
        return this._owner.animationFrameEvent(bone, frameEventName, originFrameIndex, currentFrameIndex);
    },

    movementEvent: function(armature, movementType, movementID) {
        return this._owner.animationMovementEvent(armature, movementType, movementID);
    }
});

var PoolArmature = cc.Node.extend({
    ctor: function (arName, parentBone, initCount) {
        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setCascadeColorEnabled(true);
        this._initVariable();

        this._arName = arName;
        this._arAnimation = new ARAnimationBridge(this);

        this._createPoolArmature(arName, parentBone, initCount);
    },

    _initVariable: function () {
        this._pool = null;
        this._armatureName = null;
        this._armature = null;
        this._parentBone = null;
        this._arAnimation = null;
        this._latestPlayStates = [];
        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.STOP;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.STOP;

        this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO] = -1;
        this._latestPlayStates[PROPS_ANIPLAY.LOOP] = -1;
        this._latestPlayStates[PROPS_ANIPLAY.FRAMEINDEX] = -1;
        this._latestPlayStates[PROPS_ANIPLAY.SPEEDSCALE] = 1;
        this._latestPlayStates[PROPS_ANIPLAY.MOVEMENTCOUNT] = 0;
        this._latestPlayStates[PROPS_ANIPLAY.USEROBJECT] = null;

    },

    init: function (arName, parentBone, initCount) {
        this._createPoolArmature(arName, parentBone, initCount);
    },

    onEnter: function () {
        this._super();
        this.setVisible(this.isVisible());
    },

    setVisible: function (visible) {
        //this._super(visible);
        cc.Node.prototype.setVisible.call(this, visible); //Web에서는  this._super 가 오류나기 때문에 protoType으로 이용해서 콜

        if (this._pool) {
            if (visible) {
                this._obtainArmature();
            } else {
                this._returnArmature();
            }
        }
        // if(this._armature)
        //    this._armature.updateDisplayedOpacity(this.getDisplayedOpacity());
    },

    cleanup: function () {
        this._returnArmature();
        this._initVariable();
        this._super();
    },

    //region Animation
    getAnimation: function () {
        return this._arAnimation;
    },

    //region [AnimationData receive Function]
    // animationUpdate : function(dt) {
    //     if( this._armature )
    //         this._armature.getAnimation().update(dt);
    // },

    animationFrameEvent: function (bone, frameEventName, originFrameIndex, currentFrameIndex) {
        if (this._armature)
            this._armature.getAnimation().frameEvent(bone, frameEventName, originFrameIndex, currentFrameIndex);
    },

    animationMovementEvent: function (armature, movementType, movementID) {
        if (this._armature)
            this._armature.getAnimation().movementEvent(armature, movementType, movementID);
    },

    getCurrentFrameIndex: function () {
        if (this._armature)
            return this._armature.getAnimation().getCurrentFrameIndex();

        return 0;
    },

    isComplete: function () {
        if (this._armature)
            return this._armature.getAnimation().isComplete();

        return true;
    },

    isPlaying: function () {
        if (this._armature)
            return this._armature.getAnimation().isPlaying();

        return false;
    },

    isIgnoreFrameEvent: function () {
        if (this._armature)
            return this._armature.getAnimation().isIgnoreFrameEvent();

        return false;
    },

    setSpeedScale: function (speedScale) {
        if (this._armature)
            this._armature.getAnimation().setSpeedScale(speedScale);

        this._latestPlayStates[PROPS_ANIPLAY.SPEEDSCALE] = speedScale;
    },

    getSpeedScale: function () {
        if (this._armature)
            return this._armature.getAnimation().getSpeedScale();
        else if (this._latestPlayStates.hasOwnProperty(PROPS_ANIPLAY.SPEEDSCALE))
            return this._latestPlayStates[PROPS_ANIPLAY.SPEEDSCALE];
        else
            return 1;
    },

    getCurrentPercent: function () {
        if (this._armature)
            return this._armature.getAnimation().getCurrentPercent();
        else
            return 1;
    },

    getRawDuration: function () {
        if (this._armature)
            return this._armature.getAnimation().getRawDuration();
        else
            return 0;
    },

    play: function (animationName, durationTo, loop) {
        if (!durationTo) durationTo = -1;
        if (!loop) loop = -1;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.PLAY;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA] = animationName;
        this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO] = durationTo;
        this._latestPlayStates[PROPS_ANIPLAY.LOOP] = loop;
        if (this._armature)
            this._armature.getAnimation().play(animationName, durationTo, loop);
    },

    playWithIndex: function (animationIndex, durationTo, loop) {
        if (!durationTo) durationTo = -1;
        if (!loop) loop = -1;

        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.PLAYWITHINDEX;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA] = animationIndex;
        this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO] = durationTo;
        this._latestPlayStates[PROPS_ANIPLAY.LOOP] = loop;

        if (this._armature)
            this._armature.getAnimation().playWithIndex(animationIndex, durationTo, loop);
    },

    playWithNames: function (movementNames, durationTo, loop) {
        if (!durationTo) durationTo = -1;
        if (!loop) loop = false;

        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.PLAYWITHNAMES;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA] = movementNames;
        this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO] = durationTo;
        this._latestPlayStates[PROPS_ANIPLAY.LOOP] = loop;


        if (this._armature)
            this._armature.getAnimation().playWithNames(movementNames, durationTo, loop);
    },

    playWithIndexes: function (movementIndexes, durationTo, loop) {
        if (!durationTo) durationTo = -1;
        if (!loop) loop = false;

        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.PLAYWITHINDEXES;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA] = movementIndexes;
        this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO] = durationTo;
        this._latestPlayStates[PROPS_ANIPLAY.LOOP] = loop;


        if (this._armature)
            this._armature.getAnimation().playWithIndexes(movementIndexes, durationTo, loop);
    },

    gotoAndPlay: function (frameIndex) {
        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        if (this._armature)
            this._armature.getAnimation().gotoAndPlay(frameIndex);
    },

    gotoAndPause: function (frameIndex) {

        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PAUSE;
        if (this._armature)
            this._armature.getAnimation().gotoAndPause(frameIndex);
    },

    pause: function () {
        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PAUSE;
        if (this._armature)
            this._armature.getAnimation().pause();
    },

    resume: function () {
        if (this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] !== ENUM_ANIPLAY_MODE.STOP)
            this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.PLAY;
        if (this._armature)
            this._armature.getAnimation().resume();
    },

    stop: function () {
        this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] = TYPE_AR_STATE.STOP;
        this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE] = ENUM_ANIPLAY_MODE.STOP;
        if (this._armature)
            this._armature.getAnimation().stop();
    },

    getMovementCount: function () {
        if (this._armature)
            return this._armature.getAnimation().getMovementCount();
        else
            return this._latestPlayStates[PROPS_ANIPLAY.MOVEMENTCOUNT];
    },

    getCurrentMovementID: function () {
        if (this._armature)
            return this._armature.getAnimation().getCurrentMovementID();

        return "";
    },

    setUserObject: function (userObject) {
        this._latestPlayStates[PROPS_ANIPLAY.USEROBJECT] = userObject;
    },

    getUserObject: function () {
        return this._latestPlayStates[PROPS_ANIPLAY.USEROBJECT];
    },

    //endregion [AnimationData receive Function]
    //endregion Animation

    _createPoolArmature: function (arName, parentBone, initCount) {

        if (this._pool === null || (arName && arName !== this._armatureName)) {
            this._returnArmature();

            this._parentBone = null;
            this._pool = ARPool.find(arName);
            if (!this._pool) {
                this._pool = ARPool.create(arName, initCount);
            }
            this._armatureName = arName;
            if (parentBone)
                this._parentBone = parentBone;
        }
    },

    _obtainArmature: function () {

        if (this._armature === null) {
            this._armature = this._pool.obtainAR(this);
            if (this._armature) {
                if (this._parentBone)
                    this._armature.setParentBone(this._parentBone);

                this._armature.setPosition(0, 0);
                this._latestPlayStates[PROPS_ANIPLAY.MOVEMENTCOUNT] = this._armature.getAnimation().getMovementCount();

                this.recoveryLatestPlayStates();
            }
        }
        return null;
    },

    _returnArmature: function () {
        if (this._armature !== null) {
            if (this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE] !== TYPE_AR_STATE.STOP) {
                this._latestPlayStates[PROPS_ANIPLAY.FRAMEINDEX] = cc.director.getTotalFrames() - this._armature.getAnimation().getCurrentFrameIndex();
            }
            else {
                this._latestPlayStates[PROPS_ANIPLAY.FRAMEINDEX] = -1;
            }

            this._pool.returnAR(this._armature);
            this._armature = null;
        }
    },

    recoveryLatestPlayStates: function () {
        if (!this._armature)
            return;


        var opacity = this.getDisplayedOpacity();
        if (this._armature.getDisplayedOpacity() !== opacity)
            this._armature.updateDisplayedOpacity(this.getDisplayedOpacity());

        var speedScale = this._latestPlayStates[PROPS_ANIPLAY.SPEEDSCALE];
        this._armature.getAnimation().setSpeedScale(speedScale);

        var playType = this._latestPlayStates[PROPS_ANIPLAY.PLAYTYPE];
        var frameIndex = cc.director.getTotalFrames() - this._latestPlayStates[PROPS_ANIPLAY.FRAMEINDEX];
        var playMode = this._latestPlayStates[PROPS_ANIPLAY.PLAYMODE];

        switch (playMode) {
            case ENUM_ANIPLAY_MODE.PLAY:
                this.play(this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA],
                    this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO],
                    this._latestPlayStates[PROPS_ANIPLAY.LOOP]);
                break;
            case ENUM_ANIPLAY_MODE.PLAYWITHINDEX:
                this.playWithIndex(this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA],
                    this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO],
                    this._latestPlayStates[PROPS_ANIPLAY.LOOP]);
                break;
            case ENUM_ANIPLAY_MODE.PLAYWITHNAMES:
                this.playWithNames(this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA],
                    this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO],
                    this._latestPlayStates[PROPS_ANIPLAY.LOOP]);
                break;
            case ENUM_ANIPLAY_MODE.PLAYWITHINDEXES:
                this.playWithIndexes(this._latestPlayStates[PROPS_ANIPLAY.PLAYDATA],
                    this._latestPlayStates[PROPS_ANIPLAY.DURATIONTO],
                    this._latestPlayStates[PROPS_ANIPLAY.LOOP]);
                break;
            case ENUM_ANIPLAY_MODE.STOP:
                this.playWithIndex(0);
                this.gotoAndPause(0);
                this.stop();
                return;
        }

        if (frameIndex > 0) {
            if (frameIndex >= this.getRawDuration())
                frameIndex = this.getRawDuration() - 1;

            this.gotoAndPlay(frameIndex);
        }

        if (playType === TYPE_AR_STATE.PAUSE) {
            this.pause();
        }
    }
});

