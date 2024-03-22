// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};

Genie.ARUtil= {

    getARNameFromFileName : function(ARfileName){
        return ARfileName.split('.').slice(0, -1).join('.');
    },
    hasARTrack : function (ar, aniTrackName){
        if(ar && ar.getAnimation() &&
            ar.getAnimation().getAnimationData().getMovement(aniTrackName)){
            return true;
        }
        return false;
    },
    _removeExtension : function(fileName)
    {
        var f = fileName.indexOf('.');
        return (f>=0)?fileName.substr(0, f):fileName;
    },

    /**
     * AR생성한다.
     * @param arFileName
     * @param reload
     * @returns {ccs.Armature}  생성된 AR
     */
    createAR : function(arFileName, reload)
    {
        if (reload === true)
        {
            ccs.armatureDataManager.removeArmatureFileInfo( arFileName );
        }
        ccs.armatureDataManager.addArmatureFileInfo( arFileName );
        var arName = Genie.ARUtil.getARNameFromFileName( arFileName );
        var ar = new ccs.Armature( arName );
        ar.setName(this._removeExtension(arFileName));
        return ar;
    },


    //(AR Util) ar의 트랙을 재생시킨다. 종료시 callback 호출한다
    playAR : function(ar, track, callbackComplete, durationTo) {
        if (ar!=null) {
            ar.getAnimation().play(track, durationTo  || -1, false);
            if (callbackComplete) {
                ar.getAnimation().setMovementEventCallFunc(function (armature, movementType, movementID) {
                    if (movementType === ccs.MovementEventType.complete && track === movementID) {
                        ar.getAnimation().setMovementEventCallFunc(null);
                        callbackComplete(ar);
                    }
                });
            }
        }
    },

    //(AR Util) ar의 트랙을 루프로 재생시킨다.
    playLoopAR : function(ar, track) {
        if(ar != null) {
            ar.getAnimation().play(track, -1, true);
        }
    },
    //(AR Util) ar의 트랙1(trackToPlayOnce)을 한번 재생시키고 이어서 트랙2(trackToPlayLoop)을 loop시킨다.
    playOnceAndLoop : function(ar, trackToPlayOnce, trackToPlayLoop, callbackBeforeLoop){
        Genie.ARUtil.playAR(ar, trackToPlayOnce, function(){
            ar.getAnimation().play(trackToPlayLoop, -1, true);
            if (callbackBeforeLoop)
            {
                callbackBeforeLoop();
            }
        });
    },

    stopAR : function( ar ) {
        if( ar !== null) {
            ar.getAnimation().stop();
        }
    },

    setBoneSkinIndex : function (ar, bondName, index, isForce) {
        var bone = ar.getBone(bondName);
        if( !!bone && bone.getDisplayManager().getDecorativeDisplayList().length > index)
        {
            var dispManager = bone.getDisplayManager();
            if (dispManager != null)
            {
                dispManager.changeDisplayWithIndex(index, isForce);
            }
        }
    },

    setFrameEvent : function( ar,  frameEventName, callback ) {
        ar.getAnimation().setFrameEventCallFunc( function( bone, eventName ) {
            if( eventName === frameEventName ) {
                callback && callback();
            }
        });
    },

    // 에니메이션 중이 아닌 피벗상태에서의 본 위치 구해온다.
    getBoneWorldPos : function( ar, boneName ) {
        if( !isValidObject( ar ) ) {
            cc.assert("Genie.ARUtil.getBoneWorldPos > invalid AR" );
            return cc.p( 0 ,0 );
        }

        var bone = ar.getBone( boneName );
        if( !bone ) {
            cc.assert( "RNCBanner.View.NodeBase.setRemainTime > bone couldn't find : " + boneName );
            return cc.p( 0 ,0 );
        }

        var baseDataPos,
            arTM = bone.getNodeToArmatureTransform();

        baseDataPos = cc.p( arTM.tx, arTM.ty );

        return bone.getParent().convertToWorldSpace( baseDataPos );
    },

    // 에니메이션 중이 아닌 피벗상태에서의 본 위치 구해온다.
    getBoneLocalPos : function( ar, boneName, targetNode ) {
        var worldPos = Genie.ARUtil.getBoneWorldPos( ar, boneName );
        return targetNode.convertToNodeSpace( worldPos );
    },

    enableARGrayscale : function( ar, isGray ) {
        if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
            cc.log("[CHECK] EnableARGray  WEBGL " , isGray);
            var shader = cc.shaderCache.getProgram(isGray? cc.SHADER_SPRITE_POSITION_TEXTURECOLOR_GRAY : cc.SHADER_SPRITE_POSITION_TEXTURECOLOR); //SHADER_SPRITE_POSITION_TEXTURECOLOR
            ar.setShaderProgram(shader);
        }
        else {
            cc.log("[CHECK] EnableARGray  CanvasRender " , isGray);
            var boneDic = ar.getBoneDic();
            for(var keyBone in boneDic){
                var selBone = boneDic[keyBone];
                if (selBone && selBone.getDisplayManager().getDecorativeDisplayList) {
                    //var selNode = selBone.getDisplayRenderNode();
                    var displayList = selBone.getDisplayManager().getDecorativeDisplayList();
                    for (var n = 0; n < displayList.length; n++) {
                        var selNode = displayList[n].getDisplay();
                        if (selNode && selNode.getTexture) {
                            var tex = selNode.getTexture();
                            if (tex && tex._generateGrayTexture) {
                                if(isGray) {
                                    if (!selNode._oritex) {
                                        selNode._oritex = tex;
                                    }
                                    if(!tex._graytex)
                                        tex._graytex = tex._generateGrayTexture();

                                    selNode._texture = tex._graytex; //selNode.setTexture(selNode.oriTex);
                                }
                                else{
                                    if (selNode._oritex)
                                        selNode._texture = selNode._oritex; //selNode.setTexture(selNode.oriTex);
                                }
                                // tex._switchToGray(isGray); //현재 텍스쳐를 그레이스케일로 만들어버리면 같은 텍스쳐를 쓰는 다른곳도 그레이로 되어 버린다.
                            }
                        }
                    }
                }
            }
        }
    },

    //region [ToFollowBoneUpdate]

    //endregion [ToFollowBoneUpdate]
};