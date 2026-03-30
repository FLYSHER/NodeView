"use strict";
// armature-builder.ts
//todo : 블랜드 옵션 적용부터 해야 함. 3/7
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildArmatureTree = buildArmatureTree;
exports.buildSkinRenderers = buildSkinRenderers;
exports.generateAllAnimationClip = generateAllAnimationClip;
/**
 *  기존 cocos stuio Armature 파일 포멧
 *
 *  armature_data  : [] 본 트리 정보 및 스킨 데이터
 *      ㄴ bone_data : [
 *          {
 *              ....
 *              display_data : [
 *                  {
 *                      ....
 *                      skin_data : {
 *                          name : 'b_b1.png'
 *                      }
 *                  }
 *              ]
 *          }
 *        ]
 *  animation_data : [] 에니메이션 트랙 데이터
 *      ㄴ mov_data : [
 *          {
 *              name : 'loop' // 트랙 이름
 *              ....
 *              mov_bone_data : [
 *                  {
 *                      name : 'spine2' // 본 이름
 *                      ...
 *                      frame_data : {}  // 해당 본에 찍힌 프레임 정보
 *                  }
 *              ]
 *          }
 *        ]
 *  texture_data : [  // 이 아마추에서 사용하는 모든 스프라이트프레임 정보
 *      { name : 'a_a', plistFile: 'image/a.plist', ... }, {} ..
 *  ]
 *  config_file_path : []   ex. [ 'image/a.plist', 'image/b.plist' ]
 *  config_png_path : []    ex. [ 'a.png', 'b.png' ] // png_path 는 baseName 만 표시함.
 */
//@ts-ignore
const cc_1 = require("cc");
const utils_1 = require("./utils");
const RAD_TO_DEG = 180 / Math.PI;
async function loadAllMaterials() {
    const rawPaths = {
        Normal: "db://assets/materials/Normal.mtl",
        Additive: 'db://assets/materials/Additive.mtl',
        LinearAdd: 'db://assets/materials/LinearAdd.mtl',
        Multiply: 'db://assets/materials/Multiply.mtl'
    };
    const loadedMats = {};
    const keys = Object.keys(rawPaths);
    const loadPromises = keys.map(async (key) => {
        const path = rawPaths[key];
        try {
            console.log(`[Builder] 🔍 [${key}] DB 조회 중... (${path})`);
            // 1. 에셋 DB에 UUID 정보 요청
            const info = await Editor.Message.request('asset-db', 'query-asset-info', path);
            console.log(info);
            // 🚨 만약 여기서 경고 로그가 뜬다면, 100% 경로(이름/대소문자)가 틀린 것입니다.
            if (!info || !info.uuid) {
                console.warn(`[Builder] ⚠️ [${key}] 에셋을 찾을 수 없음! 경로를 다시 확인하세요: ${path}`);
                return;
            }
            console.log(`[Builder] 🔄 [${key}] UUID 획득(${info.uuid}), 로드 시도 중...`);
            // 2. 유저님이 이미 가지고 계신 'loadAssetByUUID' 유틸리티를 사용하여 로드!
            const asset = await (0, utils_1.loadAssetByUUID)(info.uuid);
            if (asset) {
                loadedMats[key] = asset;
                console.log(`[Builder] ✅ [${key}] 로드 완벽 성공!`);
            }
            else {
                console.error(`[Builder] ❌ [${key}] UUID는 맞지만 로드에 실패했습니다.`);
            }
        }
        catch (err) {
            console.error(`[Builder] ❌ [${key}] 에러 발생:`, err);
        }
    });
    // 4개가 다 끝날 때까지 대기
    await Promise.all(loadPromises);
    console.log("[Builder] 🎯 최종 로드된 메터리얼 목록:", Object.keys(loadedMats));
    return loadedMats;
}
function getBlendModeIndex(src, dst) {
    if (src === 1 && dst === 1)
        return 2; // LinearAdd (1, 1)
    if (dst === 1)
        return 1; // Additive (*, 1)
    if (src === 774)
        return 3; // Multiply (774, *)
    return 0; // Normal (770, 771)
}
///////////////////////////////////////////////////////
//region [ 보간 관련 ]
// cocos studio 의 twE 프리셋 인덱스 매핑 테이블
const TWEEN_BEZIER_MAP = {
    1: [0.47, 0.0, 0.745, 0.715], // Sine In
    2: [0.39, 0.575, 0.565, 1.0], // Sine Out
    3: [0.445, 0.05, 0.55, 0.95], // Sine InOut
    4: [0.55, 0.085, 0.68, 0.53], // Quad In
    5: [0.25, 0.46, 0.45, 0.94], // Quad Out
    6: [0.455, 0.03, 0.515, 0.955], // Quad InOut
    7: [0.55, 0.055, 0.675, 0.19], // Cubic In
    8: [0.215, 0.61, 0.355, 1.0], // Cubic Out
    9: [0.645, 0.045, 0.355, 1.0], // Cubic InOut
    10: [0.895, 0.03, 0.685, 0.22], // Quart In
    11: [0.165, 0.84, 0.44, 1.0], // Quart Out
    12: [0.77, 0.0, 0.175, 1.0], // Quart InOut
    13: [0.755, 0.05, 0.855, 0.06], // Quint In
    14: [0.23, 1.0, 0.32, 1.0], // Quint Out
    15: [0.86, 0.0, 0.07, 1.0], // Quint InOut
    16: [0.95, 0.05, 0.795, 0.035], // Expo In
    17: [0.19, 1.0, 0.22, 1.0], // Expo Out
    18: [1.0, 0.0, 0.0, 1.0], // Expo InOut
    19: [0.6, 0.04, 0.98, 0.335], // Circ In
    20: [0.075, 0.82, 0.165, 1.0], // Circ Out
    21: [0.785, 0.135, 0.15, 0.86], // Circ InOut
    25: [0.6, -0.28, 0.735, 0.045], // Back In (밖으로 밀려나는 S자 곡선)
    26: [0.175, 0.885, 0.32, 1.275], // Back Out (원하는 곳 넘어갔다 돌아오는 곡선)
    27: [0.68, -0.55, 0.265, 1.55], // Back InOut
};
// bezier 보간을 hermit 보간으로 변환
// Cocos Studio 에는 튕기는 효과인 Elastic(22~24)과 공이 튀는 Bounce(28~30) 가 있습니다.
// 이 녀석들은 곡선이 중간에 지그재그로 여러 번 꺾여야 해서, 수학적으로 단일(1개)의 에르미트/베지에 곡선 블록으로는 절대 표현할 수 없습니다. (CSS Animation에서도 이 둘은 기본 preset으로 제공하지 않습니다.)
// 만약 JSON 데이터에 Bounce나 Elastic 값이 들어온다면, 위 테이블 매핑이 없어서 기본적으로 선형(Linear) 처리되거나, 아니면 가장 비슷한 BackOut(26) 정도로 우회(Fallback) 처리하시는 것을 추천합니다.
function applyEasingToCurves(curves, twEVals) {
    curves.forEach(curve => {
        // CC 3.x RealCurve 내부 키프레임 배열에 접근 (버전에 따라 다를 수 있음)
        const kfs = curve._keyframes || curve.keyframes || [];
        if (!kfs || kfs.length === 0)
            return;
        for (let i = 0; i < kfs.length - 1; i++) {
            const easeType = twEVals[i];
            const cur = kfs[i];
            const nxt = kfs[i + 1];
            // twE가 없거나 0이면 선형 보간(Linear) 처리
            if (easeType === undefined || easeType === 0) {
                cur.interpolationMode = 1; // Linear
                continue;
            }
            // twE가 -1이면 프레임 끊기 (Constant / Step)
            if (easeType === -1) {
                cur.interpolationMode = 0; // Constant
                continue;
            }
            // 테이블에 정의된 Bezier 값이 있는지 확인
            const bezier = TWEEN_BEZIER_MAP[easeType];
            if (!bezier) {
                cur.interpolationMode = 1; // 정의되지 않은 경우 Linear Fallback
                continue;
            }
            // 💡 에르미트(Hermite) 텐션 주입 시작!
            const [x1, y1, x2, y2] = bezier;
            cur.interpolationMode = 2; // Cubic (에르미트 모드 활성화)
            cur.tangentWeightMode = 3; // Both (양쪽 탄젠트 웨이트 사용)
            nxt.tangentWeightMode = (nxt.tangentWeightMode === 1 || nxt.tangentWeightMode === 3) ? 3 : 2;
            // 1. 시작점 (현재 키프레임의 오른쪽으로 뻗는 힘)
            // Zero-division 방어
            cur.rightTangent = x1 === 0 ? (y1 > 0 ? 10000 : 0) : y1 / x1;
            cur.rightTangentWeight = x1;
            // 2. 도착점 (다음 키프레임으로 들어오는 힘)
            // Zero-division 방어
            nxt.leftTangent = x2 === 1 ? (y2 < 1 ? 10000 : 0) : (1 - y2) / (1 - x2);
            nxt.leftTangentWeight = 1 - x2;
        }
    });
}
//endregion
///////////////////////////////////////////////////////
// Trimmed 된 Sprite 앵커 재계산
function calculateTrimmedAnchor(sf, baseAx, baseAy) {
    if (!sf) {
        return { anchorX: baseAx, anchorY: baseAy };
    }
    const pivotOrigX = sf.originalSize.width * baseAx;
    const pivotOrigY = sf.originalSize.height * baseAy;
    const rectLeft = (sf.originalSize.width / 2) + sf.offset.x - (sf.rect.width / 2);
    const rectBottom = (sf.originalSize.height / 2) + sf.offset.y - (sf.rect.height / 2);
    let calcX = sf.rect.width > 0 ? (pivotOrigX - rectLeft) / sf.rect.width : 0.5;
    let calcY = sf.rect.height > 0 ? (pivotOrigY - rectBottom) / sf.rect.height : 0.5;
    return {
        anchorX: Math.max(0.0, Math.min(1.0, calcX)),
        anchorY: Math.max(0.0, Math.min(1.0, calcY))
    };
}
// 0프레임에 키가 없다면 찍어준다.
function normalizeKeyFrames(rawFrames) {
    let frames = [...rawFrames].sort((a, b) => (a.fi || 0) - (b.fi || 0));
    // 0 프레임에 기본 속성인 키 프레임 찍어준다.
    //      ㄴ 키프레임이 하나도 없으면,
    //      ㄴ 키프레임이 있어도 0프레임에 키가 없다면,
    if (frames.length === 0) {
        frames.push({
            fi: 0,
            x: 0, y: 0,
            cX: 1, cY: 1,
            kX: 0, kY: 0,
            color: { a: 0 },
            displayIndex: -1
        });
    }
    else if (frames[0].fi > 0) {
        frames.unshift(Object.assign(Object.assign({}, frames[0]), { fi: 0 }));
    }
    return frames;
}
// 셋업포즈와 프레임 데이터로 각각의 채널들 추출
function extractTrackChannels(frames, setupPose) {
    const data = { times: [], x: [], y: [], sx: [], sy: [], rotV: [], cR: [], cG: [], cB: [], cA: [] };
    frames.forEach(f => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const t = (f.fi || 0) / 60;
        if (!data.times.includes(t)) {
            data.times.push(t);
            data.x.push(((_a = f.x) !== null && _a !== void 0 ? _a : 0) + ((_b = setupPose.x) !== null && _b !== void 0 ? _b : 0));
            data.y.push(((_c = f.y) !== null && _c !== void 0 ? _c : 0) + ((_d = setupPose.y) !== null && _d !== void 0 ? _d : 0));
            data.sx.push(((_e = f.cX) !== null && _e !== void 0 ? _e : 1) * ((_f = setupPose.cX) !== null && _f !== void 0 ? _f : 1));
            data.sy.push(((_g = f.cY) !== null && _g !== void 0 ? _g : 1) * ((_h = setupPose.cY) !== null && _h !== void 0 ? _h : 1));
            data.rotV.push(-(((_j = f.kX) !== null && _j !== void 0 ? _j : 0) + ((_k = setupPose.kX) !== null && _k !== void 0 ? _k : 0)));
            const color = f.color || {};
            data.cR.push((_l = color.r) !== null && _l !== void 0 ? _l : 255);
            data.cG.push((_m = color.g) !== null && _m !== void 0 ? _m : 255);
            data.cB.push((_o = color.b) !== null && _o !== void 0 ? _o : 255);
            data.cA.push((_p = color.a) !== null && _p !== void 0 ? _p : 255);
        }
    });
    return data;
}
// transform( pos, rot, scale ) track 추가 ( 키프레임 데이터들로 쭉 키프레임 잡아줌 )
function addTransformTracks(animClip, targetPath, channels) {
    // @ts-ignore
    const posTrack = new cc_1.animation.VectorTrack();
    posTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toProperty('position');
    const [pX, pY, pZ] = posTrack.channels();
    pX.curve.assignSorted(channels.times, channels.x);
    pY.curve.assignSorted(channels.times, channels.y);
    pZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    applyEasingToCurves([pX.curve, pY.curve, pZ.curve], channels.twE);
    animClip.addTrack(posTrack);
    // @ts-ignore
    const rotTrack = new cc_1.animation.VectorTrack();
    rotTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toProperty('eulerAngles');
    const [rX, rY, rZ] = rotTrack.channels();
    rX.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rY.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rZ.curve.assignSorted(channels.times, channels.rotV);
    applyEasingToCurves([rZ.curve], channels.twE);
    animClip.addTrack(rotTrack);
    // @ts-ignore
    const scaleTrack = new cc_1.animation.VectorTrack();
    scaleTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toProperty('scale');
    const [sX, sY, sZ] = scaleTrack.channels();
    sX.curve.assignSorted(channels.times, channels.sx);
    sY.curve.assignSorted(channels.times, channels.sy);
    sZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(1));
    applyEasingToCurves([sX.curve, sY.curve, sZ.curve], channels.twE);
    animClip.addTrack(scaleTrack);
}
function addColorTrack(animClip, targetPath, channels) {
    // @ts-ignore
    const colorTrack = new cc_1.animation.ColorTrack();
    colorTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toComponent('cc.Sprite').toProperty('color');
    const [cR, cG, cB, cA] = colorTrack.channels();
    cR.curve.assignSorted(channels.times, channels.cR);
    cG.curve.assignSorted(channels.times, channels.cG);
    cB.curve.assignSorted(channels.times, channels.cB);
    cA.curve.assignSorted(channels.times, channels.cA);
    animClip.addTrack(colorTrack);
}
function addSkinIndexTrack(animClip, targetPath, boneData, setupPoseData) {
    const skinKeyframes = getSkinTrackData(boneData, setupPoseData);
    if (!skinKeyframes || skinKeyframes.length === 0)
        return;
    try {
        // @ts-ignore
        const indexTrack = new cc_1.animation.RealTrack();
        indexTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toComponent('SkinController').toProperty('currentSkinIndex');
        const curve = indexTrack.channel.curve;
        if (curve) {
            // @ts-ignore
            curve.assignSorted(skinKeyframes.map(kf => kf.time), skinKeyframes.map(kf => kf.value));
            const kfs = curve._keyframes || curve.keyframes || [];
            for (let i = 0; i < kfs.length; i++) {
                if (kfs[i])
                    kfs[i].interpolationMode = 0;
            }
        }
        animClip.addTrack(indexTrack);
    }
    catch (e) { }
}
function addBlendModeTrack(animClip, targetPath, frames) {
    const blendKeyframes = [];
    let lastMode = -1;
    frames.forEach((f) => {
        var _a, _b, _c;
        if (f.bd_src !== undefined || f.bf_dst !== undefined || f.bd_dst !== undefined) {
            const mode = getBlendModeIndex((_a = f.bd_src) !== null && _a !== void 0 ? _a : 770, (_c = (_b = f.bf_dst) !== null && _b !== void 0 ? _b : f.bd_dst) !== null && _c !== void 0 ? _c : 771);
            if (mode !== lastMode) {
                blendKeyframes.push({ time: (f.fi || 0) / 60, value: mode });
                lastMode = mode;
            }
        }
    });
    if (blendKeyframes.length === 0)
        return;
    // @ts-ignore
    const blendTrack = new cc_1.animation.RealTrack();
    blendTrack.path = new cc_1.animation.TrackPath().toHierarchy(targetPath).toComponent('SkinController').toProperty('blendMode');
    // @ts-ignore
    blendTrack.channel.curve.assignSorted(blendKeyframes.map(k => k.time), blendKeyframes.map(k => k.value));
    const kfs = blendTrack.channel.curve._keyframes || [];
    for (let i = 0; i < kfs.length; i++) {
        if (kfs[i])
            kfs[i].interpolationMode = 0;
    }
    animClip.addTrack(blendTrack);
}
function createSkinBone(bone, boneNode) {
    var _a, _b, _c, _d, _e;
    // skin bone 생성
    const skinBone = new cc_1.Node(`${bone.name}_skinBone`);
    skinBone.addComponent(cc_1.UITransform).setContentSize(0, 0);
    skinBone.setParent(boneNode);
    // 첫번재 display data 가져와 해당 transform 을 skinBone 에 세팅
    const firstDisplay = bone.display_data[0];
    if (firstDisplay.skin_data && firstDisplay.skin_data.length > 0) {
        const skinData = firstDisplay.skin_data[0];
        skinBone.setPosition((_a = skinData.x) !== null && _a !== void 0 ? _a : 0, (_b = skinData.y) !== null && _b !== void 0 ? _b : 0, 0);
        skinBone.setScale((_c = skinData.cX) !== null && _c !== void 0 ? _c : 1, (_d = skinData.cY) !== null && _d !== void 0 ? _d : 1, 1);
        skinBone.setRotationFromEuler(0, 0, -((_e = skinData.kX) !== null && _e !== void 0 ? _e : 0) * RAD_TO_DEG);
    }
    return skinBone;
}
function createSkinNode(bone, renderRoot, skinBone, frames, anchorX_JSON, anchorY_JSON) {
    var _a, _b, _c;
    const skinNode = new cc_1.Node(`${bone.name}_skinNode`);
    skinNode.layer = cc_1.Layers.Enum.UI_2D;
    skinNode.setParent(renderRoot);
    // skinNode 에 관련 컴포넌트들 추가
    //      Sprite, UITransform( Sprite 컴포넌트 추가하면 자동으로 추가됨 )
    //      BoneFollower, SkinController
    let sprite = skinNode.addComponent(cc_1.Sprite);
    const uiTrans = skinNode.getComponent(cc_1.UITransform);
    const follower = skinNode.addComponent('BoneFollower');
    let skinCtrl = skinNode.addComponent('SkinController');
    // sprite 컴포넌트 속성 세팅
    sprite.sizeMode = cc_1.Sprite.SizeMode.TRIMMED;
    sprite.spriteFrame = frames[0];
    const { anchorX, anchorY } = calculateTrimmedAnchor(frames[0], anchorX_JSON, anchorY_JSON);
    uiTrans.setAnchorPoint(anchorX, anchorY);
    // BoneFollower 컴포넌트 속성 세팅
    follower.targetBone = skinBone;
    // SkinController 컴포넌트 속성 세팅
    skinCtrl.frames = frames;
    skinCtrl.baseAnchorX = anchorX_JSON;
    skinCtrl.baseAnchorY = anchorY_JSON;
    const firstDisplay = bone.display_data[0];
    let bdSrcGL = (_a = firstDisplay === null || firstDisplay === void 0 ? void 0 : firstDisplay.bd_src) !== null && _a !== void 0 ? _a : 770;
    let bdDstGL = (_c = (_b = firstDisplay === null || firstDisplay === void 0 ? void 0 : firstDisplay.bf_dst) !== null && _b !== void 0 ? _b : firstDisplay === null || firstDisplay === void 0 ? void 0 : firstDisplay.bd_dst) !== null && _c !== void 0 ? _c : 771;
    skinCtrl.blendMode = getBlendModeIndex(bdSrcGL, bdDstGL);
    skinCtrl.currentSkinIndex = 0;
    sprite.markForUpdateRenderData();
    return skinNode;
}
// 해당 본이 스킨 변경이 있는 트랙인지 확인 후 데이터 반환
function getSkinTrackData(boneData, setupPoseData) {
    const frameDataList = boneData.frame_data || [];
    if (frameDataList.length === 0)
        return null;
    const result = [];
    // 2. 전체 프레임을 순회하며 dI 데이터 추출
    frameDataList.forEach((f) => {
        if (f.dI !== undefined) {
            const currentDI = f.dI < 0 ? -1 : f.dI; // 모든 음수(-1000 등)는 -1로 통일
            result.push({
                time: (f.fi || 0) / 60,
                value: currentDI
            });
        }
    });
    if (result.length === 0)
        return null;
    // 0프레임에 키가 없다면, 첫번째 프레임의 DI 가져온다.
    if (result[0].time > 0) {
        result.unshift({
            time: 0,
            value: result[0].value
        });
    }
    // 변화가 있는지 검사하여 트랙 생성 여부 결정
    const setupDI = setupPoseData.dI < 0 ? -1 : setupPoseData.dI;
    const hasChange = result.some(kf => kf.value !== setupDI); // setupPose 의 dI 와 다른가?
    const isDynamic = result.some(kf => kf.value !== result[0].value); // 키프레임 중에 dI 변경이 있는가?
    if (hasChange || isDynamic) {
        return result;
    }
    return null;
}
function setBoneKeyFrameData(animClip, boneData, setupPoseData, nodePathMap) {
    const boneName = boneData.name;
    const bonePath = nodePathMap[boneName]; // ex) pelvis/spine/boneName
    if (!bonePath) {
        console.error("bonePath not exist : " + bonePath);
        return;
    }
    // 키프레임 정규화 ( 0 프레임에 키가 안 잡혀 있다면 생성 )
    const keyFrameDataList = normalizeKeyFrames(boneData.frame_data || []);
    // 키프레임 데이터로 에니메이션 클립 채널 추출
    const channels = extractTrackChannels(keyFrameDataList, setupPoseData);
    // transform track 세팅
    addTransformTracks(animClip, bonePath, channels);
    // skin 정보가 있는 본이면 관련 track 세팅
    const hasSkin = setupPoseData.display_data && setupPoseData.display_data.length > 0;
    if (hasSkin) {
        const targetSkinNodePath = `RenderRoot/${boneName}_skinNode`;
        addColorTrack(animClip, targetSkinNodePath, channels);
        addSkinIndexTrack(animClip, targetSkinNodePath, boneData, setupPoseData);
        addBlendModeTrack(animClip, targetSkinNodePath, keyFrameDataList);
    }
}
// armature 정보로 기존 bone-tree 구조를 node-tree 구조로 변경
// rootNode 에 자식본노드들 붙혀 node-tree 만들고
// 본노드 패스맵과, 본노드맵 정보 리턴
async function buildArmatureTree(armatureData, rootNode) {
    var _a, _b, _c, _d;
    const nodePathMap = {}; // 본 노드들 패스 맵 
    const nodeDict = {}; // 본 노드 맵
    if (!armatureData || !armatureData.bone_data)
        return { nodePathMap, nodeDict };
    // 스킨 담아둘 노드 Root 생성
    const renderRoot = new cc_1.Node('RenderRoot');
    renderRoot.layer = cc_1.Layers.Enum.UI_2D;
    renderRoot.parent = rootNode;
    nodeDict['__RenderRoot__'] = renderRoot;
    // 본 루트 노드
    const boneRoot = new cc_1.Node('BoneRoot');
    boneRoot.layer = cc_1.Layers.Enum.UI_2D;
    boneRoot.parent = rootNode;
    nodeDict['__BoneRoot__'] = boneRoot; // 딕셔너리에도 등록
    const boneDataList = armatureData.bone_data;
    // 1. bone hierarch 정보 기반으로 노드 생성 후 dic 에 넣음.
    for (const bone of boneDataList) {
        const boneNode = new cc_1.Node(bone.name);
        boneNode.layer = cc_1.Layers.Enum.UI_2D;
        const uiTrans = boneNode.addComponent(cc_1.UITransform);
        uiTrans.contentSize = (0, cc_1.size)(0, 0);
        uiTrans.setAnchorPoint(0, 0);
        nodeDict[bone.name] = boneNode;
    }
    // 2. 계층구조 생성 후 기본 transform 설정
    for (const bone of boneDataList) {
        const boneNode = nodeDict[bone.name];
        const targetParent = (bone.parent && nodeDict[bone.parent]) ? nodeDict[bone.parent] : boneRoot;
        boneNode.setParent(targetParent);
        boneNode.setPosition((_a = bone.x) !== null && _a !== void 0 ? _a : 0, (_b = bone.y) !== null && _b !== void 0 ? _b : 0, 0);
        boneNode.setScale((_c = bone.cX) !== null && _c !== void 0 ? _c : 1, (_d = bone.cY) !== null && _d !== void 0 ? _d : 1, 1);
        const setupRotRad = bone.kX ? -bone.kX : 0;
        boneNode.setRotationFromEuler(0, 0, setupRotRad * RAD_TO_DEG);
    }
    // 3. 본노드 패스 저장 ( ex.. root/hand/finger )
    // clip 재사용과 layered animation 등이 가능. 
    function _recordPaths(node, currentPath) {
        for (const child of node.children) {
            const childPath = currentPath ? `${currentPath}/${child.name}` : child.name;
            nodePathMap[child.name] = childPath;
            _recordPaths(child, childPath);
        }
    }
    _recordPaths(rootNode, "");
    return { nodePathMap, nodeDict };
}
// skin 세팅이 되어있는 본 처리
// 기존 스킨 데이터 있는 본 자식으로 각각 transform 만 관리, renderer 만 관리하는 노드 2개 생성
// skinBone, skinNode ( skinNode 는 renderer root node 에 붙힘. order 관리를 위해 )
async function buildSkinRenderers(armatureData, nodeDict, destDir, jsonData, resourceMap) {
    if (!armatureData || !armatureData.bone_data)
        return;
    // 스킨에서 사용할 공유(shared) 메터리얼 skinController static 변수 에 세팅
    const allMats = await loadAllMaterials();
    const skinController = cc_1.js.getClassByName('SkinController');
    skinController.setSharedMaterials(allMats);
    // [ sort 하지 않고 setSiblingIndex 하지 않는 이유. ]
    // 원본 order 값이 50, 100 처럼 듬성듬성인 상태, 음수도 있음.
    // setSiblingIndex 는 배열 인덱스.. 50, 100 을 그대로 둘 수 없으니 인덱스 변경함. 그러다 보면 꼬임
    // 따라서 미리 정렬이 답.
    const boneDataList = armatureData.bone_data;
    const sortedBoneData = [...boneDataList].sort((a, b) => { var _a, _b; return ((_a = a.z) !== null && _a !== void 0 ? _a : 0) - ((_b = b.z) !== null && _b !== void 0 ? _b : 0); });
    // render root 노드 생성
    const renderRoot = nodeDict['__RenderRoot__'];
    for (const bone of sortedBoneData) {
        const boneNode = nodeDict[bone.name];
        if (!boneNode)
            continue;
        const displayDataList = bone.display_data || []; // 본에 할당된 display_data. 없으면 해당 key 가 없다.
        if (displayDataList.length === 0)
            continue; // 스킨 데이터가 없으면 다음으로..
        const frames = []; // 본에 할당된 스프라이트 프레임들
        const displays = []; // name, displayType, skinData 배열 : [{ x, y, cx, cy, kx, ky}]
        let firstResData = null; // 앵커 포인트를 빼오기 위해 첫 번째 리소스 데이터를 저장
        //
        for (const display of displayDataList) {
            const rawName = display.name.replace('.png', '');
            const resData = resourceMap.getResData(rawName);
            if (!firstResData && resData)
                firstResData = resData; // 첫 번째 스킨의 원본 텍스처 데이터를 저장
            if (resData === null || resData === void 0 ? void 0 : resData.frameUUID) {
                const _spriteFrame = await (0, utils_1.loadAssetByUUID)(resData.frameUUID).catch(() => null);
                if (_spriteFrame) {
                    frames.push(_spriteFrame);
                    displays.push(display);
                }
            }
        }
        if (frames.length === 0)
            continue; // sprite frame 없는 bone 은 넘어간다.
        // 스킨 본 생성
        const skinBone = createSkinBone(bone, boneNode);
        // 스킨 노드 생성
        const anchorX_JSON = (firstResData && firstResData.pX !== undefined) ? firstResData.pX : 0.5;
        const anchorY_JSON = (firstResData && firstResData.pY !== undefined) ? firstResData.pY : 0.5;
        createSkinNode(bone, renderRoot, skinBone, frames, anchorX_JSON, anchorY_JSON);
    }
}
// 모든 animation 클립 생성
async function generateAllAnimationClip(armatureData, animationData, nodePathMap, animComp, prefabName, destDir) {
    if (!animationData || !animationData.mov_data)
        return;
    for (const animData of animationData.mov_data) {
        const clip = await generateAnimClip(armatureData, animData, nodePathMap);
        // 에셋에 저장
        // @ts-ignore
        const serialized = cce.Utils.serialize(clip);
        const clipUrl = `${destDir}/${prefabName}_${animData.name}.anim`;
        // @ts-ignore
        await Editor.Message.request('asset-db', 'create-asset', clipUrl, JSON.stringify(serialized), { overwrite: true });
        await new Promise(r => setTimeout(r, 500));
        // @ts-ignore
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', clipUrl);
        if (assetInfo === null || assetInfo === void 0 ? void 0 : assetInfo.uuid) {
            const loaded = await (0, utils_1.loadAssetByUUID)(assetInfo.uuid);
            animComp.clips.push(loaded);
        }
    }
    // default 클립 세팅.
    if (animComp.clips.length > 0) {
        animComp.defaultClip = animComp.clips[0];
    }
}
// 에니메이션 클립 생성
// A.ExportJson
//      ㄴ animationData.mov_data[0] = {
//          name : clip 이름 ex) open, loop ..
//          dr   : 총 frame 길이 ex) 121
//          lp   : loop 여부 ex) true
//          twE  : 키프레임들 사이에 전역적 보간, 개발보간이 우선순위 높다 ex) 0(선형보간)
//          sc   : speed scale 원본속도 대비 배율 ex) 0.333( 원복 속도보다 약 3배 느리게 )
//          mov_bone_data : [
//              {
//                  name : 본 이름
//                  dI   : 스킨 인덱스
//                  frame_data : [ // 키프레임 데이터들
//                      {
//                          dl: -1, // 다음 키프레임이 나타나기 전까지 유지되는 시간(프레임단위) -1 이면, 다음 프레임까지 유지
//                          x: 0,
//                          y: 0,
//                          z: 0,
//                          cX: 1,
//                          cY: 1,
//                          kX: 0,
//                          kY: 0,
//                          fi: 프레임 인덱스 ex) 0,
//                          twE: 0,
//                          tweenFrame: true, // 다음 키프레임 넘어갈 때 보간 할지, 아니면 유지하다가 다음프레임에 확 바뀔지
//                          bd_src: 1,
//                          bf_dst: 771,
//                      }
//                      {
//                          ...
//                      }
//                      ....
//                  ]
//
//              },
//              {
//                  ....
//              },
//              ,,,,,
//          ]
//      }
//
async function generateAnimClip(armatureData, movData, nodePathMap) {
    var _a, _b;
    if (!movData) {
        console.error("generateAniClip movData invalid : " + movData);
        return;
    }
    // step 1. animation clip 생성 및 기본 정보 세팅
    const clip = new cc_1.AnimationClip();
    clip.name = movData.name;
    clip.duration = (movData.dr || 0) / 60; // 초단위 clip 길이
    clip.sample = 60; // 샘플링 속도(frame rate) 1초에 몇개의 프레임 보여줄 것인가
    clip.speed = (_a = movData.sc) !== null && _a !== void 0 ? _a : 1;
    clip.wrapMode = movData.lp ? cc_1.AnimationClip.WrapMode.Loop : cc_1.AnimationClip.WrapMode.Normal;
    // 각 bone 별로 track data 세팅. ( 키프레임 추가 )
    for (const boneData of movData.mov_bone_data || []) {
        const boneName = boneData.name;
        const setupPoseData = ((_b = armatureData === null || armatureData === void 0 ? void 0 : armatureData.bone_data) === null || _b === void 0 ? void 0 : _b.find((bone) => bone.name === boneName)) || {};
        setBoneKeyFrameData(clip, boneData, setupPoseData, nodePathMap);
    }
    return clip;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJtYXR1cmUtYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9hcm1hdHVyZS1idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBc0I7QUFDdEIsOEJBQThCOztBQTJlOUIsOENBMERDO0FBS0QsZ0RBdURDO0FBR0QsNERBMkJDO0FBN25CRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBR0gsWUFBWTtBQUNaLDJCQUE0SztBQUU1SyxtQ0FBeUU7QUFFekUsTUFBTSxVQUFVLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7QUFFakMsS0FBSyxVQUFVLGdCQUFnQjtJQUMzQixNQUFNLFFBQVEsR0FBMkI7UUFDckMsTUFBTSxFQUFFLGtDQUFrQztRQUMxQyxRQUFRLEVBQUUsb0NBQW9DO1FBQzlDLFNBQVMsRUFBRSxxQ0FBcUM7UUFDaEQsUUFBUSxFQUFFLG9DQUFvQztLQUNqRCxDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQTZCLEVBQUUsQ0FBQztJQUNoRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBRTFELHVCQUF1QjtZQUN2QixNQUFNLElBQUksR0FBUSxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyRixPQUFPLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBRSxDQUFDO1lBRXBCLG1EQUFtRDtZQUNuRCxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGdDQUFnQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUN6RSxPQUFPO1lBQ1gsQ0FBQztZQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsYUFBYSxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsQ0FBQztZQUV2RSxxREFBcUQ7WUFDckQsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFBLHVCQUFlLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBYSxDQUFDO1lBRTNELElBQUksS0FBSyxFQUFFLENBQUM7Z0JBQ1IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDeEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxhQUFhLENBQUMsQ0FBQztZQUNsRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hFLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILGtCQUFrQjtJQUNsQixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7SUFFaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDckUsT0FBTyxVQUFVLENBQUM7QUFDdEIsQ0FBQztBQUVELFNBQVMsaUJBQWlCLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDL0MsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxtQkFBbUI7SUFDekQsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUFFLE9BQU8sQ0FBQyxDQUFDLENBQWUsa0JBQWtCO0lBQ3pELElBQUksR0FBRyxLQUFLLEdBQUc7UUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFZLG9CQUFvQjtJQUMxRCxPQUFPLENBQUMsQ0FBQyxDQUE2QixvQkFBb0I7QUFDOUQsQ0FBQztBQUVELHVEQUF1RDtBQUN2RCxrQkFBa0I7QUFFbEIsb0NBQW9DO0FBQ3BDLE1BQU0sZ0JBQWdCLEdBQXFEO0lBQ3ZFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFJLFVBQVU7SUFDMUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUksV0FBVztJQUMzQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBSSxhQUFhO0lBQzdDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFJLFVBQVU7SUFDMUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUssV0FBVztJQUMzQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxhQUFhO0lBQzdDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFHLFdBQVc7SUFDM0MsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUksWUFBWTtJQUM1QyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBRyxjQUFjO0lBQzlDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLFdBQVc7SUFDM0MsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUksWUFBWTtJQUM1QyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsRUFBSyxjQUFjO0lBQzlDLEVBQUUsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFLFdBQVc7SUFDM0MsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQU0sWUFBWTtJQUM1QyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsRUFBTSxjQUFjO0lBQzlDLEVBQUUsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLFVBQVU7SUFDMUMsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQU0sV0FBVztJQUMzQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBUSxhQUFhO0lBQzdDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFJLFVBQVU7SUFDMUMsRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUcsV0FBVztJQUMzQyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhO0lBQzdDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FB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QUMsYUFBYSxJQUFJLEVBQUUsRUFBRyxDQUFDO1FBQ2pELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDL0IsTUFBTSxhQUFhLEdBQUcsQ0FBQSxNQUFBLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRSxTQUFTLDBDQUFFLElBQUksQ0FBQyxDQUFDLElBQVEsRUFBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxRQUFRLENBQUUsS0FBSSxFQUFFLENBQUM7UUFDaEcsbUJBQW1CLENBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsV0FBVyxDQUFFLENBQUM7SUFDdEUsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBhcm1hdHVyZS1idWlsZGVyLnRzXG4vL3RvZG8gOiDruJTrnpzrk5wg7Ji17IWYIOyggeyaqeu2gO2EsCDtlbTslbwg7ZWoLiAzLzdcblxuLyoqIFxuICogIOq4sOyhtCBjb2NvcyBzdHVpbyBBcm1hdHVyZSDtjIzsnbwg7Y+s66mnXG4gKiAgXG4gKiAgYXJtYXR1cmVfZGF0YSAgOiBbXSDrs7gg7Yq466asIOygleuztCDrsI8g7Iqk7YKoIOuNsOydtO2EsFxuICogICAgICDjhLQgYm9uZV9kYXRhIDogW1xuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIC4uLi5cbiAqICAgICAgICAgICAgICBkaXNwbGF5X2RhdGEgOiBbXG4gKiAgICAgICAgICAgICAgICAgIHtcbiAqICAgICAgICAgICAgICAgICAgICAgIC4uLi5cbiAqICAgICAgICAgICAgICAgICAgICAgIHNraW5fZGF0YSA6IHtcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lIDogJ2JfYjEucG5nJ1xuICogICAgICAgICAgICAgICAgICAgICAgfVxuICogICAgICAgICAgICAgICAgICB9XG4gKiAgICAgICAgICAgICAgXVxuICogICAgICAgICAgfSAgICAgXG4gKiAgICAgICAgXVxuICogIGFuaW1hdGlvbl9kYXRhIDogW10g7JeQ64uI66mU7J207IWYIO2KuOuemSDrjbDsnbTthLBcbiAqICAgICAg44S0IG1vdl9kYXRhIDogW1xuICogICAgICAgICAge1xuICogICAgICAgICAgICAgIG5hbWUgOiAnbG9vcCcgLy8g7Yq4656ZIOydtOumhFxuICogICAgICAgICAgICAgIC4uLi5cbiAqICAgICAgICAgICAgICBtb3ZfYm9uZV9kYXRhIDogW1xuICogICAgICAgICAgICAgICAgICB7XG4gKiAgICAgICAgICAgICAgICAgICAgICBuYW1lIDogJ3NwaW5lMicgLy8g67O4IOydtOumhFxuICogICAgICAgICAgICAgICAgICAgICAgLi4uXG4gKiAgICAgICAgICAgICAgICAgICAgICBmcmFtZV9kYXRhIDoge30gIC8vIO2VtOuLuSDrs7jsl5Ag7LCN7Z6MIO2UhOugiOyehCDsoJXrs7QgXG4gKiAgICAgICAgICAgICAgICAgIH1cbiAqICAgICAgICAgICAgICBdXG4gKiAgICAgICAgICB9XG4gKiAgICAgICAgXVxuICogIHRleHR1cmVfZGF0YSA6IFsgIC8vIOydtCDslYTrp4jstpTsl5DshJwg7IKs7Jqp7ZWY64qUIOuqqOuToCDsiqTtlITrnbzsnbTtirjtlITroIjsnoQg7KCV67O0XG4gKiAgICAgIHsgbmFtZSA6ICdhX2EnLCBwbGlzdEZpbGU6ICdpbWFnZS9hLnBsaXN0JywgLi4uIH0sIHt9IC4uICBcbiAqICBdXG4gKiAgY29uZmlnX2ZpbGVfcGF0aCA6IFtdICAgZXguIFsgJ2ltYWdlL2EucGxpc3QnLCAnaW1hZ2UvYi5wbGlzdCcgXVxuICogIGNvbmZpZ19wbmdfcGF0aCA6IFtdICAgIGV4LiBbICdhLnBuZycsICdiLnBuZycgXSAvLyBwbmdfcGF0aCDripQgYmFzZU5hbWUg66eMIO2RnOyLnO2VqC5cbiAqL1xuXG5cbi8vQHRzLWlnbm9yZVxuaW1wb3J0IHsgTm9kZSwgTGF5ZXJzLCBVSVRyYW5zZm9ybSwgU3ByaXRlLCBTcHJpdGVGcmFtZSwgQW5pbWF0aW9uQ2xpcCwgYW5pbWF0aW9uLCBBbmltYXRpb24sIGFzc2V0TWFuYWdlciwgc2l6ZSwgTWF0ZXJpYWwsIGpzLCBTa2luQ29udHJvbGxlciwgUmVhbEN1cnZlLCBnZnggIH0gZnJvbSAnY2MnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IFJlc291cmNlTWFwLCBsb2FkQXNzZXRCeVVVSUQsIG1hcEdMQmxlbmRGYWN0b3IgfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgUkFEX1RPX0RFRyA9IDE4MCAvIE1hdGguUEk7XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWRBbGxNYXRlcmlhbHMoKSB7XG4gICAgY29uc3QgcmF3UGF0aHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgICAgIE5vcm1hbDogXCJkYjovL2Fzc2V0cy9tYXRlcmlhbHMvTm9ybWFsLm10bFwiLFxuICAgICAgICBBZGRpdGl2ZTogJ2RiOi8vYXNzZXRzL21hdGVyaWFscy9BZGRpdGl2ZS5tdGwnLFxuICAgICAgICBMaW5lYXJBZGQ6ICdkYjovL2Fzc2V0cy9tYXRlcmlhbHMvTGluZWFyQWRkLm10bCcsXG4gICAgICAgIE11bHRpcGx5OiAnZGI6Ly9hc3NldHMvbWF0ZXJpYWxzL011bHRpcGx5Lm10bCdcbiAgICB9O1xuXG4gICAgY29uc3QgbG9hZGVkTWF0czogUmVjb3JkPHN0cmluZywgTWF0ZXJpYWw+ID0ge307XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHJhd1BhdGhzKTtcblxuICAgIGNvbnN0IGxvYWRQcm9taXNlcyA9IGtleXMubWFwKGFzeW5jIChrZXkpID0+IHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHJhd1BhdGhzW2tleV07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgW0J1aWxkZXJdIPCflI0gWyR7a2V5fV0gREIg7KGw7ZqMIOykkS4uLiAoJHtwYXRofSlgKTtcblxuICAgICAgICAgICAgLy8gMS4g7JeQ7IWLIERC7JeQIFVVSUQg7KCV67O0IOyalOyyrVxuICAgICAgICAgICAgY29uc3QgaW5mbzogYW55ID0gYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnYXNzZXQtZGInLCAncXVlcnktYXNzZXQtaW5mbycsIHBhdGgpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coIGluZm8gKTtcblxuICAgICAgICAgICAgLy8g8J+aqCDrp4zslb0g7Jes6riw7IScIOqyveqzoCDroZzqt7jqsIAg65ys64uk66m0LCAxMDAlIOqyveuhnCjsnbTrpoQv64yA7IaM66y47J6QKeqwgCDti4DrprAg6rKD7J6F64uI64ukLlxuICAgICAgICAgICAgaWYgKCFpbmZvIHx8ICFpbmZvLnV1aWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYFtCdWlsZGVyXSDimqDvuI8gWyR7a2V5fV0g7JeQ7IWL7J2EIOywvuydhCDsiJgg7JeG7J2MISDqsr3roZzrpbwg64uk7IucIO2ZleyduO2VmOyEuOyalDogJHtwYXRofWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc29sZS5sb2coYFtCdWlsZGVyXSDwn5SEIFske2tleX1dIFVVSUQg7ZqN65OdKCR7aW5mby51dWlkfSksIOuhnOuTnCDsi5zrj4Qg7KSRLi4uYCk7XG5cbiAgICAgICAgICAgIC8vIDIuIOycoOyggOuLmOydtCDsnbTrr7gg6rCA7KeA6rOgIOqzhOyLoCAnbG9hZEFzc2V0QnlVVUlEJyDsnKDti7jrpqzti7Drpbwg7IKs7Jqp7ZWY7JesIOuhnOuTnCFcbiAgICAgICAgICAgIGNvbnN0IGFzc2V0ID0gYXdhaXQgbG9hZEFzc2V0QnlVVUlEKGluZm8udXVpZCkgYXMgTWF0ZXJpYWw7XG5cbiAgICAgICAgICAgIGlmIChhc3NldCkge1xuICAgICAgICAgICAgICAgIGxvYWRlZE1hdHNba2V5XSA9IGFzc2V0O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbQnVpbGRlcl0g4pyFIFske2tleX1dIOuhnOuTnCDsmYTrsr0g7ISx6rO1IWApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBbQnVpbGRlcl0g4p2MIFske2tleX1dIFVVSUTripQg66ee7KeA66eMIOuhnOuTnOyXkCDsi6TtjKjtlojsirXri4jri6QuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihgW0J1aWxkZXJdIOKdjCBbJHtrZXl9XSDsl5Drn6wg67Cc7IOdOmAsIGVycik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIDTqsJzqsIAg64ukIOuBneuCoCDrlYzquYzsp4Ag64yA6riwXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwobG9hZFByb21pc2VzKTtcblxuICAgIGNvbnNvbGUubG9nKFwiW0J1aWxkZXJdIPCfjq8g7LWc7KKFIOuhnOuTnOuQnCDrqZTthLDrpqzslrwg66qp66GdOlwiLCBPYmplY3Qua2V5cyhsb2FkZWRNYXRzKSk7XG4gICAgcmV0dXJuIGxvYWRlZE1hdHM7XG59XG5cbmZ1bmN0aW9uIGdldEJsZW5kTW9kZUluZGV4KHNyYzogbnVtYmVyLCBkc3Q6IG51bWJlcik6IG51bWJlciB7XG4gICAgaWYgKHNyYyA9PT0gMSAmJiBkc3QgPT09IDEpIHJldHVybiAyOyAvLyBMaW5lYXJBZGQgKDEsIDEpXG4gICAgaWYgKGRzdCA9PT0gMSkgcmV0dXJuIDE7ICAgICAgICAgICAgICAgLy8gQWRkaXRpdmUgKCosIDEpXG4gICAgaWYgKHNyYyA9PT0gNzc0KSByZXR1cm4gMzsgICAgICAgICAgICAvLyBNdWx0aXBseSAoNzc0LCAqKVxuICAgIHJldHVybiAwOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTm9ybWFsICg3NzAsIDc3MSlcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy9yZWdpb24gWyDrs7TqsIQg6rSA66CoIF1cblxuLy8gY29jb3Mgc3R1ZGlvIOydmCB0d0Ug7ZSE66as7IWLIOyduOuNseyKpCDrp6TtlZEg7YWM7J2067iUXG5jb25zdCBUV0VFTl9CRVpJRVJfTUFQOiBSZWNvcmQ8bnVtYmVyLCBbbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXT4gPSB7XG4gICAgMTogWzAuNDcsIDAuMCwgMC43NDUsIDAuNzE1XSwgICAvLyBTaW5lIEluXG4gICAgMjogWzAuMzksIDAuNTc1LCAwLjU2NSwgMS4wXSwgICAvLyBTaW5lIE91dFxuICAgIDM6IFswLjQ0NSwgMC4wNSwgMC41NSwgMC45NV0sICAgLy8gU2luZSBJbk91dFxuICAgIDQ6IFswLjU1LCAwLjA4NSwgMC42OCwgMC41M10sICAgLy8gUXVhZCBJblxuICAgIDU6IFswLjI1LCAwLjQ2LCAwLjQ1LCAwLjk0XSwgICAgLy8gUXVhZCBPdXRcbiAgICA2OiBbMC40NTUsIDAuMDMsIDAuNTE1LCAwLjk1NV0sIC8vIFF1YWQgSW5PdXRcbiAgICA3OiBbMC41NSwgMC4wNTUsIDAuNjc1LCAwLjE5XSwgIC8vIEN1YmljIEluXG4gICAgODogWzAuMjE1LCAwLjYxLCAwLjM1NSwgMS4wXSwgICAvLyBDdWJpYyBPdXRcbiAgICA5OiBbMC42NDUsIDAuMDQ1LCAwLjM1NSwgMS4wXSwgIC8vIEN1YmljIEluT3V0XG4gICAgMTA6IFswLjg5NSwgMC4wMywgMC42ODUsIDAuMjJdLCAvLyBRdWFydCBJblxuICAgIDExOiBbMC4xNjUsIDAuODQsIDAuNDQsIDEuMF0sICAgLy8gUXVhcnQgT3V0XG4gICAgMTI6IFswLjc3LCAwLjAsIDAuMTc1LCAxLjBdLCAgICAvLyBRdWFydCBJbk91dFxuICAgIDEzOiBbMC43NTUsIDAuMDUsIDAuODU1LCAwLjA2XSwgLy8gUXVpbnQgSW5cbiAgICAxNDogWzAuMjMsIDEuMCwgMC4zMiwgMS4wXSwgICAgIC8vIFF1aW50IE91dFxuICAgIDE1OiBbMC44NiwgMC4wLCAwLjA3LCAxLjBdLCAgICAgLy8gUXVpbnQgSW5PdXRcbiAgICAxNjogWzAuOTUsIDAuMDUsIDAuNzk1LCAwLjAzNV0sIC8vIEV4cG8gSW5cbiAgICAxNzogWzAuMTksIDEuMCwgMC4yMiwgMS4wXSwgICAgIC8vIEV4cG8gT3V0XG4gICAgMTg6IFsxLjAsIDAuMCwgMC4wLCAxLjBdLCAgICAgICAvLyBFeHBvIEluT3V0XG4gICAgMTk6IFswLjYsIDAuMDQsIDAuOTgsIDAuMzM1XSwgICAvLyBDaXJjIEluXG4gICAgMjA6IFswLjA3NSwgMC44MiwgMC4xNjUsIDEuMF0sICAvLyBDaXJjIE91dFxuICAgIDIxOiBbMC43ODUsIDAuMTM1LCAwLjE1LCAwLjg2XSwgLy8gQ2lyYyBJbk91dFxuICAgIDI1OiBbMC42LCAtMC4yOCwgMC43MzUsIDAuMDQ1XSwgLy8gQmFjayBJbiAo67CW7Jy866GcIOuwgOugpOuCmOuKlCBT7J6QIOqzoeyEoClcbiAgICAyNjogWzAuMTc1LCAwLjg4NSwgMC4zMiwgMS4yNzVdLC8vIEJhY2sgT3V0ICjsm5DtlZjripQg6rOzIOuEmOyWtOqwlOuLpCDrj4zslYTsmKTripQg6rOh7ISgKVxuICAgIDI3OiBbMC42OCwgLTAuNTUsIDAuMjY1LCAxLjU1XSwgLy8gQmFjayBJbk91dFxufTtcblxuLy8gYmV6aWVyIOuztOqwhOydhCBoZXJtaXQg67O06rCE7Jy866GcIOuzgO2ZmFxuLy8gQ29jb3MgU3R1ZGlvIOyXkOuKlCDtipXquLDripQg7Zqo6rO87J24IEVsYXN0aWMoMjJ+MjQp6rO8IOqzteydtCDtioDripQgQm91bmNlKDI4fjMwKSDqsIAg7J6I7Iq164uI64ukLlxuLy8g7J20IOuFgOyEneuTpOydgCDqs6HshKDsnbQg7KSR6rCE7JeQIOyngOq3uOyerOq3uOuhnCDsl6zrn6wg67KIIOq6vuyXrOyVvCDtlbTshJwsIOyImO2VmeyggeycvOuhnCDri6jsnbwoMeqwnCnsnZgg7JeQ66W066+47Yq4L+uyoOyngOyXkCDqs6HshKAg67iU66Gd7Jy866Gc64qUIOygiOuMgCDtkZztmITtlaAg7IiYIOyXhuyKteuLiOuLpC4gKENTUyBBbmltYXRpb27sl5DshJzrj4Qg7J20IOuRmOydgCDquLDrs7ggcHJlc2V07Jy866GcIOygnOqzte2VmOyngCDslYrsirXri4jri6QuKVxuLy8g66eM7JW9IEpTT04g642w7J207YSw7JeQIEJvdW5jZeuCmCBFbGFzdGljIOqwkuydtCDrk6TslrTsmKjri6TrqbQsIOychCDthYzsnbTruJQg66ek7ZWR7J20IOyXhuyWtOyEnCDquLDrs7jsoIHsnLzroZwg7ISg7ZiVKExpbmVhcikg7LKY66as65CY6rGw64KYLCDslYTri4jrqbQg6rCA7J6lIOu5hOyKt+2VnCBCYWNrT3V0KDI2KSDsoJXrj4TroZwg7Jqw7ZqMKEZhbGxiYWNrKSDsspjrpqztlZjsi5zripQg6rKD7J2EIOy2lOyynO2VqeuLiOuLpC5cbmZ1bmN0aW9uIGFwcGx5RWFzaW5nVG9DdXJ2ZXMoY3VydmVzOiBhbnlbXSwgdHdFVmFsczogbnVtYmVyW10pIHtcbiAgICBjdXJ2ZXMuZm9yRWFjaChjdXJ2ZSA9PiB7XG4gICAgICAgIC8vIENDIDMueCBSZWFsQ3VydmUg64K067aAIO2CpO2UhOugiOyehCDrsLDsl7Tsl5Ag7KCR6re8ICjrsoTsoITsl5Ag65Sw6528IOuLpOulvCDsiJgg7J6I7J2MKVxuICAgICAgICBjb25zdCBrZnMgPSBjdXJ2ZS5fa2V5ZnJhbWVzIHx8IGN1cnZlLmtleWZyYW1lcyB8fCBbXTtcbiAgICAgICAgaWYgKCFrZnMgfHwga2ZzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2ZzLmxlbmd0aCAtIDE7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZWFzZVR5cGUgPSB0d0VWYWxzW2ldO1xuXG4gICAgICAgICAgICBjb25zdCBjdXIgPSBrZnNbaV07XG4gICAgICAgICAgICBjb25zdCBueHQgPSBrZnNbaSArIDFdO1xuXG4gICAgICAgICAgICAvLyB0d0XqsIAg7JeG6rGw64KYIDDsnbTrqbQg7ISg7ZiVIOuztOqwhChMaW5lYXIpIOyymOumrFxuICAgICAgICAgICAgaWYgKGVhc2VUeXBlID09PSB1bmRlZmluZWQgfHwgZWFzZVR5cGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjdXIuaW50ZXJwb2xhdGlvbk1vZGUgPSAxOyAvLyBMaW5lYXJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdHdF6rCAIC0x7J2066m0IO2UhOugiOyehCDrgYrquLAgKENvbnN0YW50IC8gU3RlcClcbiAgICAgICAgICAgIGlmIChlYXNlVHlwZSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjdXIuaW50ZXJwb2xhdGlvbk1vZGUgPSAwOyAvLyBDb25zdGFudFxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDthYzsnbTruJTsl5Ag7KCV7J2Y65CcIEJlemllciDqsJLsnbQg7J6I64qU7KeAIO2ZleyduFxuICAgICAgICAgICAgY29uc3QgYmV6aWVyID0gVFdFRU5fQkVaSUVSX01BUFtlYXNlVHlwZV07XG4gICAgICAgICAgICBpZiAoIWJlemllcikge1xuICAgICAgICAgICAgICAgIGN1ci5pbnRlcnBvbGF0aW9uTW9kZSA9IDE7IC8vIOygleydmOuQmOyngCDslYrsnYAg6rK97JqwIExpbmVhciBGYWxsYmFja1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyDwn5KhIOyXkOultOuvuO2KuChIZXJtaXRlKSDthZDshZgg7KO87J6FIOyLnOyekSFcbiAgICAgICAgICAgIGNvbnN0IFt4MSwgeTEsIHgyLCB5Ml0gPSBiZXppZXI7XG5cbiAgICAgICAgICAgIGN1ci5pbnRlcnBvbGF0aW9uTW9kZSA9IDI7IC8vIEN1YmljICjsl5DrpbTrr7jtirgg66qo65OcIO2ZnOyEse2ZlClcbiAgICAgICAgICAgIGN1ci50YW5nZW50V2VpZ2h0TW9kZSA9IDM7IC8vIEJvdGggKOyWkeyqvSDtg4TsoKDtirgg7Juo7J207Yq4IOyCrOyaqSlcbiAgICAgICAgICAgIG54dC50YW5nZW50V2VpZ2h0TW9kZSA9IChueHQudGFuZ2VudFdlaWdodE1vZGUgPT09IDEgfHwgbnh0LnRhbmdlbnRXZWlnaHRNb2RlID09PSAzKSA/IDMgOiAyO1xuXG4gICAgICAgICAgICAvLyAxLiDsi5zsnpHsoJAgKO2YhOyerCDtgqTtlITroIjsnoTsnZgg7Jik66W47Kq97Jy866GcIOu7l+uKlCDtnpgpXG4gICAgICAgICAgICAvLyBaZXJvLWRpdmlzaW9uIOuwqeyWtFxuICAgICAgICAgICAgY3VyLnJpZ2h0VGFuZ2VudCA9IHgxID09PSAwID8gKHkxID4gMCA/IDEwMDAwIDogMCkgOiB5MSAvIHgxO1xuICAgICAgICAgICAgY3VyLnJpZ2h0VGFuZ2VudFdlaWdodCA9IHgxO1xuXG4gICAgICAgICAgICAvLyAyLiDrj4TssKnsoJAgKOuLpOydjCDtgqTtlITroIjsnoTsnLzroZwg65Ok7Ja07Jik64qUIO2emClcbiAgICAgICAgICAgIC8vIFplcm8tZGl2aXNpb24g67Cp7Ja0XG4gICAgICAgICAgICBueHQubGVmdFRhbmdlbnQgPSB4MiA9PT0gMSA/ICh5MiA8IDEgPyAxMDAwMCA6IDApIDogKDEgLSB5MikgLyAoMSAtIHgyKTtcbiAgICAgICAgICAgIG54dC5sZWZ0VGFuZ2VudFdlaWdodCA9IDEgLSB4MjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL2VuZHJlZ2lvblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vIFRyaW1tZWQg65CcIFNwcml0ZSDslbXsu6Qg7J6s6rOE7IKwXG5mdW5jdGlvbiBjYWxjdWxhdGVUcmltbWVkQW5jaG9yKHNmOiBTcHJpdGVGcmFtZSB8IG51bGwsIGJhc2VBeDogbnVtYmVyLCBiYXNlQXk6IG51bWJlcikge1xuICAgIGlmICghc2YpIHtcbiAgICAgICAgcmV0dXJuIHsgYW5jaG9yWDogYmFzZUF4LCBhbmNob3JZOiBiYXNlQXkgfTtcbiAgICB9XG5cbiAgICBjb25zdCBwaXZvdE9yaWdYID0gc2Yub3JpZ2luYWxTaXplLndpZHRoICogYmFzZUF4O1xuICAgIGNvbnN0IHBpdm90T3JpZ1kgPSBzZi5vcmlnaW5hbFNpemUuaGVpZ2h0ICogYmFzZUF5O1xuICAgIGNvbnN0IHJlY3RMZWZ0ID0gKHNmLm9yaWdpbmFsU2l6ZS53aWR0aCAvIDIpICsgc2Yub2Zmc2V0LnggLSAoc2YucmVjdC53aWR0aCAvIDIpO1xuICAgIGNvbnN0IHJlY3RCb3R0b20gPSAoc2Yub3JpZ2luYWxTaXplLmhlaWdodCAvIDIpICsgc2Yub2Zmc2V0LnkgLSAoc2YucmVjdC5oZWlnaHQgLyAyKTtcblxuICAgIGxldCBjYWxjWCA9IHNmLnJlY3Qud2lkdGggPiAwID8gKHBpdm90T3JpZ1ggLSByZWN0TGVmdCkgLyBzZi5yZWN0LndpZHRoIDogMC41O1xuICAgIGxldCBjYWxjWSA9IHNmLnJlY3QuaGVpZ2h0ID4gMCA/IChwaXZvdE9yaWdZIC0gcmVjdEJvdHRvbSkgLyBzZi5yZWN0LmhlaWdodCA6IDAuNTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFuY2hvclg6IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCBjYWxjWCkpLFxuICAgICAgICBhbmNob3JZOiBNYXRoLm1heCgwLjAsIE1hdGgubWluKDEuMCwgY2FsY1kpKVxuICAgIH07XG59XG5cbi8vIDDtlITroIjsnoTsl5Ag7YKk6rCAIOyXhuuLpOuptCDssI3slrTspIDri6QuXG5mdW5jdGlvbiBub3JtYWxpemVLZXlGcmFtZXMocmF3RnJhbWVzOiBhbnlbXSkge1xuICAgIGxldCBmcmFtZXMgPSBbLi4ucmF3RnJhbWVzXS5zb3J0KChhLCBiKSA9PiAoYS5maSB8fCAwKSAtIChiLmZpIHx8IDApKTtcblxuICAgIC8vIDAg7ZSE66CI7J6E7JeQIOq4sOuzuCDsho3shLHsnbgg7YKkIO2UhOugiOyehCDssI3slrTspIDri6QuXG4gICAgLy8gICAgICDjhLQg7YKk7ZSE66CI7J6E7J20IO2VmOuCmOuPhCDsl4bsnLzrqbQsXG4gICAgLy8gICAgICDjhLQg7YKk7ZSE66CI7J6E7J20IOyeiOyWtOuPhCAw7ZSE66CI7J6E7JeQIO2CpOqwgCDsl4bri6TrqbQsXG4gICAgaWYgKGZyYW1lcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZnJhbWVzLnB1c2goe1xuICAgICAgICAgICAgZmk6IDAsXG4gICAgICAgICAgICB4OiAwLCB5OiAwLFxuICAgICAgICAgICAgY1g6IDEsIGNZOiAxLFxuICAgICAgICAgICAga1g6IDAsIGtZOiAwLFxuICAgICAgICAgICAgY29sb3I6IHsgYTogMCB9LFxuICAgICAgICAgICAgZGlzcGxheUluZGV4OiAtMVxuICAgICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGZyYW1lc1swXS5maSA+IDApIHtcbiAgICAgICAgZnJhbWVzLnVuc2hpZnQoeyAuLi5mcmFtZXNbMF0sIGZpOiAwIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZnJhbWVzO1xufVxuXG4vLyDshYvsl4Xtj6zspojsmYAg7ZSE66CI7J6EIOuNsOydtO2EsOuhnCDqsIHqsIHsnZgg7LGE64SQ65OkIOy2lOy2nFxuZnVuY3Rpb24gZXh0cmFjdFRyYWNrQ2hhbm5lbHMoZnJhbWVzOiBhbnlbXSwgc2V0dXBQb3NlOiBhbnkpIHtcbiAgICBjb25zdCBkYXRhID0geyB0aW1lczogW10gYXMgbnVtYmVyW10sIHg6IFtdIGFzIG51bWJlcltdLCB5OiBbXSBhcyBudW1iZXJbXSwgc3g6IFtdIGFzIG51bWJlcltdLCBzeTogW10gYXMgbnVtYmVyW10sIHJvdFY6IFtdIGFzIG51bWJlcltdLCBjUjogW10gYXMgbnVtYmVyW10sIGNHOiBbXSBhcyBudW1iZXJbXSwgY0I6IFtdIGFzIG51bWJlcltdLCBjQTogW10gYXMgbnVtYmVyW10gfTtcblxuICAgIGZyYW1lcy5mb3JFYWNoKGYgPT4ge1xuICAgICAgICBjb25zdCB0ID0gKGYuZmkgfHwgMCkgLyA2MDtcbiAgICAgICAgaWYgKCFkYXRhLnRpbWVzLmluY2x1ZGVzKHQpKSB7XG4gICAgICAgICAgICBkYXRhLnRpbWVzLnB1c2godCk7XG4gICAgICAgICAgICBkYXRhLngucHVzaCgoZi54ID8/IDApICsgKHNldHVwUG9zZS54ID8/IDApKTtcbiAgICAgICAgICAgIGRhdGEueS5wdXNoKChmLnkgPz8gMCkgKyAoc2V0dXBQb3NlLnkgPz8gMCkpO1xuICAgICAgICAgICAgZGF0YS5zeC5wdXNoKChmLmNYID8/IDEpICogKHNldHVwUG9zZS5jWCA/PyAxKSk7XG4gICAgICAgICAgICBkYXRhLnN5LnB1c2goKGYuY1kgPz8gMSkgKiAoc2V0dXBQb3NlLmNZID8/IDEpKTtcbiAgICAgICAgICAgIGRhdGEucm90Vi5wdXNoKC0oKGYua1ggPz8gMCkgKyAoc2V0dXBQb3NlLmtYID8/IDApKSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gZi5jb2xvciB8fCB7fTtcbiAgICAgICAgICAgIGRhdGEuY1IucHVzaChjb2xvci5yID8/IDI1NSk7XG4gICAgICAgICAgICBkYXRhLmNHLnB1c2goY29sb3IuZyA/PyAyNTUpO1xuICAgICAgICAgICAgZGF0YS5jQi5wdXNoKGNvbG9yLmIgPz8gMjU1KTtcbiAgICAgICAgICAgIGRhdGEuY0EucHVzaChjb2xvci5hID8/IDI1NSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cblxuLy8gdHJhbnNmb3JtKCBwb3MsIHJvdCwgc2NhbGUgKSB0cmFjayDstpTqsIAgKCDtgqTtlITroIjsnoQg642w7J207YSw65Ok66GcIOytiSDtgqTtlITroIjsnoQg7J6h7JWE7KSMIClcbmZ1bmN0aW9uIGFkZFRyYW5zZm9ybVRyYWNrcyhhbmltQ2xpcDogYW55LCB0YXJnZXRQYXRoOiBzdHJpbmcsIGNoYW5uZWxzOiBhbnkpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcG9zVHJhY2sgPSBuZXcgYW5pbWF0aW9uLlZlY3RvclRyYWNrKCk7XG4gICAgcG9zVHJhY2sucGF0aCA9IG5ldyBhbmltYXRpb24uVHJhY2tQYXRoKCkudG9IaWVyYXJjaHkodGFyZ2V0UGF0aCkudG9Qcm9wZXJ0eSgncG9zaXRpb24nKTtcblxuICAgIGNvbnN0IFtwWCwgcFksIHBaXSA9IHBvc1RyYWNrLmNoYW5uZWxzKCk7XG4gICAgcFguY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy54KTtcbiAgICBwWS5jdXJ2ZS5hc3NpZ25Tb3J0ZWQoY2hhbm5lbHMudGltZXMsIGNoYW5uZWxzLnkpO1xuICAgIHBaLmN1cnZlLmFzc2lnblNvcnRlZChjaGFubmVscy50aW1lcywgQXJyYXkoY2hhbm5lbHMudGltZXMubGVuZ3RoKS5maWxsKDApKTtcbiAgICBhcHBseUVhc2luZ1RvQ3VydmVzKFtwWC5jdXJ2ZSwgcFkuY3VydmUsIHBaLmN1cnZlXSwgY2hhbm5lbHMudHdFKTtcbiAgICBhbmltQ2xpcC5hZGRUcmFjayhwb3NUcmFjayk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgcm90VHJhY2sgPSBuZXcgYW5pbWF0aW9uLlZlY3RvclRyYWNrKCk7XG4gICAgcm90VHJhY2sucGF0aCA9IG5ldyBhbmltYXRpb24uVHJhY2tQYXRoKCkudG9IaWVyYXJjaHkodGFyZ2V0UGF0aCkudG9Qcm9wZXJ0eSgnZXVsZXJBbmdsZXMnKTtcblxuICAgIGNvbnN0IFtyWCwgclksIHJaXSA9IHJvdFRyYWNrLmNoYW5uZWxzKCk7XG4gICAgclguY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBBcnJheShjaGFubmVscy50aW1lcy5sZW5ndGgpLmZpbGwoMCkpO1xuICAgIHJZLmN1cnZlLmFzc2lnblNvcnRlZChjaGFubmVscy50aW1lcywgQXJyYXkoY2hhbm5lbHMudGltZXMubGVuZ3RoKS5maWxsKDApKTtcbiAgICByWi5jdXJ2ZS5hc3NpZ25Tb3J0ZWQoY2hhbm5lbHMudGltZXMsIGNoYW5uZWxzLnJvdFYpO1xuICAgIGFwcGx5RWFzaW5nVG9DdXJ2ZXMoW3JaLmN1cnZlXSwgY2hhbm5lbHMudHdFKTtcbiAgICBhbmltQ2xpcC5hZGRUcmFjayhyb3RUcmFjayk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgc2NhbGVUcmFjayA9IG5ldyBhbmltYXRpb24uVmVjdG9yVHJhY2soKTtcbiAgICBzY2FsZVRyYWNrLnBhdGggPSBuZXcgYW5pbWF0aW9uLlRyYWNrUGF0aCgpLnRvSGllcmFyY2h5KHRhcmdldFBhdGgpLnRvUHJvcGVydHkoJ3NjYWxlJyk7XG5cbiAgICBjb25zdCBbc1gsIHNZLCBzWl0gPSBzY2FsZVRyYWNrLmNoYW5uZWxzKCk7XG4gICAgc1guY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5zeCk7XG4gICAgc1kuY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5zeSk7XG4gICAgc1ouY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBBcnJheShjaGFubmVscy50aW1lcy5sZW5ndGgpLmZpbGwoMSkpO1xuICAgIGFwcGx5RWFzaW5nVG9DdXJ2ZXMoW3NYLmN1cnZlLCBzWS5jdXJ2ZSwgc1ouY3VydmVdLCBjaGFubmVscy50d0UpO1xuICAgIGFuaW1DbGlwLmFkZFRyYWNrKHNjYWxlVHJhY2spO1xufVxuXG5mdW5jdGlvbiBhZGRDb2xvclRyYWNrKGFuaW1DbGlwOiBhbnksIHRhcmdldFBhdGg6IHN0cmluZywgY2hhbm5lbHM6IGFueSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBjb2xvclRyYWNrID0gbmV3IGFuaW1hdGlvbi5Db2xvclRyYWNrKCk7XG4gICAgY29sb3JUcmFjay5wYXRoID0gbmV3IGFuaW1hdGlvbi5UcmFja1BhdGgoKS50b0hpZXJhcmNoeSh0YXJnZXRQYXRoKS50b0NvbXBvbmVudCgnY2MuU3ByaXRlJykudG9Qcm9wZXJ0eSgnY29sb3InKTtcblxuICAgIGNvbnN0IFtjUiwgY0csIGNCLCBjQV0gPSBjb2xvclRyYWNrLmNoYW5uZWxzKCk7XG4gICAgY1IuY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5jUik7XG4gICAgY0cuY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5jRyk7XG4gICAgY0IuY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5jQik7XG4gICAgY0EuY3VydmUuYXNzaWduU29ydGVkKGNoYW5uZWxzLnRpbWVzLCBjaGFubmVscy5jQSk7XG5cbiAgICBhbmltQ2xpcC5hZGRUcmFjayhjb2xvclRyYWNrKTtcbn1cblxuZnVuY3Rpb24gYWRkU2tpbkluZGV4VHJhY2soYW5pbUNsaXA6IGFueSwgdGFyZ2V0UGF0aDogc3RyaW5nLCBib25lRGF0YTogYW55LCBzZXR1cFBvc2VEYXRhOiBhbnkpIHtcbiAgICBjb25zdCBza2luS2V5ZnJhbWVzID0gZ2V0U2tpblRyYWNrRGF0YShib25lRGF0YSwgc2V0dXBQb3NlRGF0YSk7XG4gICAgaWYgKCFza2luS2V5ZnJhbWVzIHx8IHNraW5LZXlmcmFtZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgICB0cnkge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IGluZGV4VHJhY2sgPSBuZXcgYW5pbWF0aW9uLlJlYWxUcmFjaygpO1xuICAgICAgICBpbmRleFRyYWNrLnBhdGggPSBuZXcgYW5pbWF0aW9uLlRyYWNrUGF0aCgpLnRvSGllcmFyY2h5KHRhcmdldFBhdGgpLnRvQ29tcG9uZW50KCdTa2luQ29udHJvbGxlcicpLnRvUHJvcGVydHkoJ2N1cnJlbnRTa2luSW5kZXgnKTtcblxuICAgICAgICBjb25zdCBjdXJ2ZSA9IGluZGV4VHJhY2suY2hhbm5lbC5jdXJ2ZTtcbiAgICAgICAgaWYgKGN1cnZlKSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjdXJ2ZS5hc3NpZ25Tb3J0ZWQoc2tpbktleWZyYW1lcy5tYXAoa2YgPT4ga2YudGltZSksIHNraW5LZXlmcmFtZXMubWFwKGtmID0+IGtmLnZhbHVlKSk7XG4gICAgICAgICAgICBjb25zdCBrZnMgPSAoY3VydmUgYXMgYW55KS5fa2V5ZnJhbWVzIHx8IChjdXJ2ZSBhcyBhbnkpLmtleWZyYW1lcyB8fCBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwga2ZzLmxlbmd0aDsgaSsrKSB7IGlmIChrZnNbaV0pIGtmc1tpXS5pbnRlcnBvbGF0aW9uTW9kZSA9IDA7IH1cbiAgICAgICAgfVxuICAgICAgICBhbmltQ2xpcC5hZGRUcmFjayhpbmRleFRyYWNrKTtcbiAgICB9IGNhdGNoIChlKSB7fVxufVxuXG5mdW5jdGlvbiBhZGRCbGVuZE1vZGVUcmFjayhhbmltQ2xpcDogYW55LCB0YXJnZXRQYXRoOiBzdHJpbmcsIGZyYW1lczogYW55W10pIHtcbiAgICBjb25zdCBibGVuZEtleWZyYW1lczogeyB0aW1lOiBudW1iZXIsIHZhbHVlOiBudW1iZXIgfVtdID0gW107XG4gICAgbGV0IGxhc3RNb2RlID0gLTE7XG5cbiAgICBmcmFtZXMuZm9yRWFjaCgoZjogYW55KSA9PiB7XG4gICAgICAgIGlmIChmLmJkX3NyYyAhPT0gdW5kZWZpbmVkIHx8IGYuYmZfZHN0ICE9PSB1bmRlZmluZWQgfHwgZi5iZF9kc3QgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgbW9kZSA9IGdldEJsZW5kTW9kZUluZGV4KGYuYmRfc3JjID8/IDc3MCwgZi5iZl9kc3QgPz8gZi5iZF9kc3QgPz8gNzcxKTtcbiAgICAgICAgICAgIGlmIChtb2RlICE9PSBsYXN0TW9kZSkge1xuICAgICAgICAgICAgICAgIGJsZW5kS2V5ZnJhbWVzLnB1c2goeyB0aW1lOiAoZi5maSB8fCAwKSAvIDYwLCB2YWx1ZTogbW9kZSB9KTtcbiAgICAgICAgICAgICAgICBsYXN0TW9kZSA9IG1vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChibGVuZEtleWZyYW1lcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBibGVuZFRyYWNrID0gbmV3IGFuaW1hdGlvbi5SZWFsVHJhY2soKTtcbiAgICBibGVuZFRyYWNrLnBhdGggPSBuZXcgYW5pbWF0aW9uLlRyYWNrUGF0aCgpLnRvSGllcmFyY2h5KHRhcmdldFBhdGgpLnRvQ29tcG9uZW50KCdTa2luQ29udHJvbGxlcicpLnRvUHJvcGVydHkoJ2JsZW5kTW9kZScpO1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGJsZW5kVHJhY2suY2hhbm5lbC5jdXJ2ZS5hc3NpZ25Tb3J0ZWQoYmxlbmRLZXlmcmFtZXMubWFwKGsgPT4gay50aW1lKSwgYmxlbmRLZXlmcmFtZXMubWFwKGsgPT4gay52YWx1ZSkpO1xuICAgIGNvbnN0IGtmcyA9IChibGVuZFRyYWNrLmNoYW5uZWwuY3VydmUgYXMgYW55KS5fa2V5ZnJhbWVzIHx8IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBrZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGtmc1tpXSkga2ZzW2ldLmludGVycG9sYXRpb25Nb2RlID0gMDtcbiAgICB9XG5cbiAgICBhbmltQ2xpcC5hZGRUcmFjayhibGVuZFRyYWNrKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2tpbkJvbmUoYm9uZTogYW55LCBib25lTm9kZTogTm9kZSkge1xuICAgIC8vIHNraW4gYm9uZSDsg53shLFcbiAgICBjb25zdCBza2luQm9uZSA9IG5ldyBOb2RlKGAke2JvbmUubmFtZX1fc2tpbkJvbmVgKTtcbiAgICBza2luQm9uZS5hZGRDb21wb25lbnQoVUlUcmFuc2Zvcm0pLnNldENvbnRlbnRTaXplKDAsMCk7XG4gICAgc2tpbkJvbmUuc2V0UGFyZW50KGJvbmVOb2RlKTtcblxuICAgIC8vIOyyq+uyiOyerCBkaXNwbGF5IGRhdGEg6rCA7KC47JmAIO2VtOuLuSB0cmFuc2Zvcm0g7J2EIHNraW5Cb25lIOyXkCDshLjtjIVcbiAgICBjb25zdCBmaXJzdERpc3BsYXkgPSBib25lLmRpc3BsYXlfZGF0YVswXTtcbiAgICBpZiAoZmlyc3REaXNwbGF5LnNraW5fZGF0YSAmJiBmaXJzdERpc3BsYXkuc2tpbl9kYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3Qgc2tpbkRhdGEgPSBmaXJzdERpc3BsYXkuc2tpbl9kYXRhWzBdO1xuICAgICAgICBza2luQm9uZS5zZXRQb3NpdGlvbihza2luRGF0YS54ID8/IDAsIHNraW5EYXRhLnkgPz8gMCwgMCk7XG4gICAgICAgIHNraW5Cb25lLnNldFNjYWxlKHNraW5EYXRhLmNYID8/IDEsIHNraW5EYXRhLmNZID8/IDEsIDEpO1xuICAgICAgICBza2luQm9uZS5zZXRSb3RhdGlvbkZyb21FdWxlcigwLCAwLCAtKHNraW5EYXRhLmtYID8/IDApICogUkFEX1RPX0RFRyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNraW5Cb25lO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTa2luTm9kZShib25lOiBhbnksIHJlbmRlclJvb3Q6IE5vZGUsIHNraW5Cb25lOiBOb2RlLCBmcmFtZXM6IFNwcml0ZUZyYW1lW10sIGFuY2hvclhfSlNPTjogbnVtYmVyLCBhbmNob3JZX0pTT046IG51bWJlcikge1xuICAgIGNvbnN0IHNraW5Ob2RlID0gbmV3IE5vZGUoYCR7Ym9uZS5uYW1lfV9za2luTm9kZWApO1xuICAgIHNraW5Ob2RlLmxheWVyID0gTGF5ZXJzLkVudW0uVUlfMkQ7XG4gICAgc2tpbk5vZGUuc2V0UGFyZW50KHJlbmRlclJvb3QpO1xuXG4gICAgLy8gc2tpbk5vZGUg7JeQIOq0gOugqCDsu7Ttj6zrhIztirjrk6Qg7LaU6rCAXG4gICAgLy8gICAgICBTcHJpdGUsIFVJVHJhbnNmb3JtKCBTcHJpdGUg7Lu07Y+s64SM7Yq4IOy2lOqwgO2VmOuptCDsnpDrj5nsnLzroZwg7LaU6rCA65CoIClcbiAgICAvLyAgICAgIEJvbmVGb2xsb3dlciwgU2tpbkNvbnRyb2xsZXJcbiAgICBsZXQgc3ByaXRlID0gc2tpbk5vZGUuYWRkQ29tcG9uZW50KFNwcml0ZSk7XG4gICAgY29uc3QgdWlUcmFucyA9IHNraW5Ob2RlLmdldENvbXBvbmVudChVSVRyYW5zZm9ybSk7XG4gICAgY29uc3QgZm9sbG93ZXIgPSBza2luTm9kZS5hZGRDb21wb25lbnQoJ0JvbmVGb2xsb3dlcicpIGFzIGFueTtcbiAgICBsZXQgc2tpbkN0cmwgPSBza2luTm9kZS5hZGRDb21wb25lbnQoJ1NraW5Db250cm9sbGVyJykgYXMgYW55O1xuXG4gICAgLy8gc3ByaXRlIOy7tO2PrOuEjO2KuCDsho3shLEg7IS47YyFXG4gICAgc3ByaXRlLnNpemVNb2RlID0gU3ByaXRlLlNpemVNb2RlLlRSSU1NRUQ7XG4gICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWVzWzBdO1xuXG4gICAgY29uc3QgeyBhbmNob3JYLCBhbmNob3JZIH0gPSBjYWxjdWxhdGVUcmltbWVkQW5jaG9yKGZyYW1lc1swXSwgYW5jaG9yWF9KU09OLCBhbmNob3JZX0pTT04pO1xuICAgIHVpVHJhbnMuc2V0QW5jaG9yUG9pbnQoYW5jaG9yWCwgYW5jaG9yWSk7XG5cbiAgICAvLyBCb25lRm9sbG93ZXIg7Lu07Y+s64SM7Yq4IOyGjeyEsSDshLjtjIVcbiAgICBmb2xsb3dlci50YXJnZXRCb25lID0gc2tpbkJvbmU7XG5cbiAgICAvLyBTa2luQ29udHJvbGxlciDsu7Ttj6zrhIztirgg7IaN7ISxIOyEuO2MhVxuICAgIHNraW5DdHJsLmZyYW1lcyA9IGZyYW1lcztcbiAgICBza2luQ3RybC5iYXNlQW5jaG9yWCA9IGFuY2hvclhfSlNPTjtcbiAgICBza2luQ3RybC5iYXNlQW5jaG9yWSA9IGFuY2hvcllfSlNPTjtcblxuICAgIGNvbnN0IGZpcnN0RGlzcGxheSA9IGJvbmUuZGlzcGxheV9kYXRhWzBdO1xuICAgIGxldCBiZFNyY0dMID0gZmlyc3REaXNwbGF5Py5iZF9zcmMgPz8gNzcwO1xuICAgIGxldCBiZERzdEdMID0gZmlyc3REaXNwbGF5Py5iZl9kc3QgPz8gZmlyc3REaXNwbGF5Py5iZF9kc3QgPz8gNzcxO1xuICAgIHNraW5DdHJsLmJsZW5kTW9kZSA9IGdldEJsZW5kTW9kZUluZGV4KGJkU3JjR0wsIGJkRHN0R0wpO1xuICAgIHNraW5DdHJsLmN1cnJlbnRTa2luSW5kZXggPSAwO1xuXG4gICAgc3ByaXRlLm1hcmtGb3JVcGRhdGVSZW5kZXJEYXRhKCk7XG5cbiAgICByZXR1cm4gc2tpbk5vZGU7XG59XG5cbi8vIO2VtOuLuSDrs7jsnbQg7Iqk7YKoIOuzgOqyveydtCDsnojripQg7Yq4656Z7J247KeAIO2ZleyduCDtm4Qg642w7J207YSwIOuwmO2ZmFxuZnVuY3Rpb24gZ2V0U2tpblRyYWNrRGF0YSggYm9uZURhdGE6IGFueSwgc2V0dXBQb3NlRGF0YTogYW55KSB7XG4gICAgY29uc3QgZnJhbWVEYXRhTGlzdCA9IGJvbmVEYXRhLmZyYW1lX2RhdGEgfHwgW107XG4gICAgaWYgKGZyYW1lRGF0YUxpc3QubGVuZ3RoID09PSAwKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHJlc3VsdDogeyB0aW1lOiBudW1iZXIsIHZhbHVlOiBudW1iZXIgfVtdID0gW107XG5cbiAgICAvLyAyLiDsoITssrQg7ZSE66CI7J6E7J2EIOyInO2ajO2VmOupsCBkSSDrjbDsnbTthLAg7LaU7LacXG4gICAgZnJhbWVEYXRhTGlzdC5mb3JFYWNoKChmOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGYuZEkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudERJID0gZi5kSSA8IDAgPyAtMSA6IGYuZEk7IC8vIOuqqOuToCDsnYzsiJgoLTEwMDAg65OxKeuKlCAtMeuhnCDthrXsnbxcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICB0aW1lOiAoZi5maSB8fCAwKSAvIDYwLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBjdXJyZW50RElcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA9PT0gMClcbiAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAvLyAw7ZSE66CI7J6E7JeQIO2CpOqwgCDsl4bri6TrqbQsIOyyq+uyiOynuCDtlITroIjsnoTsnZggREkg6rCA7KC47Jio64ukLlxuICAgIGlmIChyZXN1bHRbMF0udGltZSA+IDApIHtcbiAgICAgICAgcmVzdWx0LnVuc2hpZnQoe1xuICAgICAgICAgICAgdGltZTogMCxcbiAgICAgICAgICAgIHZhbHVlOiByZXN1bHRbMF0udmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8g67OA7ZmU6rCAIOyeiOuKlOyngCDqsoDsgqztlZjsl6wg7Yq4656ZIOyDneyEsSDsl6zrtoAg6rKw7KCVXG4gICAgY29uc3Qgc2V0dXBESSA9IHNldHVwUG9zZURhdGEuZEkgPCAwID8gLTEgOiBzZXR1cFBvc2VEYXRhLmRJO1xuICAgIGNvbnN0IGhhc0NoYW5nZSA9IHJlc3VsdC5zb21lKGtmID0+IGtmLnZhbHVlICE9PSBzZXR1cERJKTsgICAgICAgICAgLy8gc2V0dXBQb3NlIOydmCBkSSDsmYAg64uk66W46rCAP1xuICAgIGNvbnN0IGlzRHluYW1pYyA9IHJlc3VsdC5zb21lKGtmID0+IGtmLnZhbHVlICE9PSByZXN1bHRbMF0udmFsdWUpOyAgLy8g7YKk7ZSE66CI7J6EIOykkeyXkCBkSSDrs4Dqsr3snbQg7J6I64qU6rCAP1xuXG4gICAgaWYgKGhhc0NoYW5nZSB8fCBpc0R5bmFtaWMpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2V0Qm9uZUtleUZyYW1lRGF0YSggYW5pbUNsaXA6IGFueSwgYm9uZURhdGE6IGFueSwgc2V0dXBQb3NlRGF0YTogYW55LCBub2RlUGF0aE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiApIHtcbiAgICBjb25zdCBib25lTmFtZSA9IGJvbmVEYXRhLm5hbWU7XG4gICAgY29uc3QgYm9uZVBhdGggPSBub2RlUGF0aE1hcFtib25lTmFtZV07IC8vIGV4KSBwZWx2aXMvc3BpbmUvYm9uZU5hbWVcbiAgICBpZiggIWJvbmVQYXRoICkge1xuICAgICAgICBjb25zb2xlLmVycm9yKFwiYm9uZVBhdGggbm90IGV4aXN0IDogXCIgKyBib25lUGF0aCApO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8g7YKk7ZSE66CI7J6EIOygleq3nO2ZlCAoIDAg7ZSE66CI7J6E7JeQIO2CpOqwgCDslYgg7J6h7ZiAIOyeiOuLpOuptCDsg53shLEgKVxuICAgIGNvbnN0IGtleUZyYW1lRGF0YUxpc3QgPSBub3JtYWxpemVLZXlGcmFtZXMoYm9uZURhdGEuZnJhbWVfZGF0YSB8fCBbXSk7XG5cbiAgICAvLyDtgqTtlITroIjsnoQg642w7J207YSw66GcIOyXkOuLiOuplOydtOyFmCDtgbTrpr0g7LGE64SQIOy2lOy2nFxuICAgIGNvbnN0IGNoYW5uZWxzID0gZXh0cmFjdFRyYWNrQ2hhbm5lbHMoa2V5RnJhbWVEYXRhTGlzdCwgc2V0dXBQb3NlRGF0YSk7XG5cbiAgICAvLyB0cmFuc2Zvcm0gdHJhY2sg7IS47YyFXG4gICAgYWRkVHJhbnNmb3JtVHJhY2tzKGFuaW1DbGlwLCBib25lUGF0aCwgY2hhbm5lbHMpO1xuXG4gICAgLy8gc2tpbiDsoJXrs7TqsIAg7J6I64qUIOuzuOydtOuptCDqtIDroKggdHJhY2sg7IS47YyFXG4gICAgY29uc3QgaGFzU2tpbiA9IHNldHVwUG9zZURhdGEuZGlzcGxheV9kYXRhICYmIHNldHVwUG9zZURhdGEuZGlzcGxheV9kYXRhLmxlbmd0aCA+IDA7XG4gICAgaWYgKGhhc1NraW4pIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0U2tpbk5vZGVQYXRoID0gYFJlbmRlclJvb3QvJHtib25lTmFtZX1fc2tpbk5vZGVgO1xuXG4gICAgICAgIGFkZENvbG9yVHJhY2soYW5pbUNsaXAsIHRhcmdldFNraW5Ob2RlUGF0aCwgY2hhbm5lbHMpO1xuICAgICAgICBhZGRTa2luSW5kZXhUcmFjayhhbmltQ2xpcCwgdGFyZ2V0U2tpbk5vZGVQYXRoLCBib25lRGF0YSwgc2V0dXBQb3NlRGF0YSk7XG4gICAgICAgIGFkZEJsZW5kTW9kZVRyYWNrKGFuaW1DbGlwLCB0YXJnZXRTa2luTm9kZVBhdGgsIGtleUZyYW1lRGF0YUxpc3QpO1xuICAgIH1cbn1cblxuLy8gYXJtYXR1cmUg7KCV67O066GcIOq4sOyhtCBib25lLXRyZWUg6rWs7KGw66W8IG5vZGUtdHJlZSDqtazsobDroZwg67OA6rK9XG4vLyByb290Tm9kZSDsl5Ag7J6Q7Iud67O464W465Oc65OkIOu2me2YgCBub2RlLXRyZWUg66eM65Ok6rOgXG4vLyDrs7jrhbjrk5wg7Yyo7Iqk66e16rO8LCDrs7jrhbjrk5zrp7Ug7KCV67O0IOumrO2EtFxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQXJtYXR1cmVUcmVlKGFybWF0dXJlRGF0YTogYW55LCByb290Tm9kZTogTm9kZSk6IFByb21pc2U8eyBub2RlUGF0aE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwgbm9kZURpY3Q6IFJlY29yZDxzdHJpbmcsIE5vZGU+IH0+IHtcbiAgICBjb25zdCBub2RlUGF0aE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9OyAvLyDrs7gg64W465Oc65OkIO2MqOyKpCDrp7UgXG4gICAgY29uc3Qgbm9kZURpY3Q6IFJlY29yZDxzdHJpbmcsIE5vZGU+ID0ge307ICAgICAgLy8g67O4IOuFuOuTnCDrp7VcblxuICAgIGlmICghYXJtYXR1cmVEYXRhIHx8ICFhcm1hdHVyZURhdGEuYm9uZV9kYXRhICkgcmV0dXJuIHsgbm9kZVBhdGhNYXAsIG5vZGVEaWN0IH07XG5cbiAgICAvLyDsiqTtgqgg64u07JWE65GYIOuFuOuTnCBSb290IOyDneyEsVxuICAgIGNvbnN0IHJlbmRlclJvb3QgPSBuZXcgTm9kZSgnUmVuZGVyUm9vdCcpO1xuICAgIHJlbmRlclJvb3QubGF5ZXIgPSBMYXllcnMuRW51bS5VSV8yRDtcbiAgICByZW5kZXJSb290LnBhcmVudCA9IHJvb3ROb2RlO1xuICAgIG5vZGVEaWN0WydfX1JlbmRlclJvb3RfXyddID0gcmVuZGVyUm9vdDtcblxuICAgIC8vIOuzuCDro6jtirgg64W465OcXG4gICAgY29uc3QgYm9uZVJvb3QgPSBuZXcgTm9kZSgnQm9uZVJvb3QnKTtcbiAgICBib25lUm9vdC5sYXllciA9IExheWVycy5FbnVtLlVJXzJEO1xuICAgIGJvbmVSb290LnBhcmVudCA9IHJvb3ROb2RlO1xuICAgIG5vZGVEaWN0WydfX0JvbmVSb290X18nXSA9IGJvbmVSb290OyAvLyDrlJXshZTrhIjrpqzsl5Drj4Qg65Ox66GdXG5cbiAgICBjb25zdCBib25lRGF0YUxpc3Q6IGFueVtdID0gYXJtYXR1cmVEYXRhLmJvbmVfZGF0YTtcblxuICAgIC8vIDEuIGJvbmUgaGllcmFyY2gg7KCV67O0IOq4sOuwmOycvOuhnCDrhbjrk5wg7IOd7ISxIO2bhCBkaWMg7JeQIOuEo+ydjC5cbiAgICBmb3IgKGNvbnN0IGJvbmUgb2YgYm9uZURhdGFMaXN0KSB7XG4gICAgICAgIGNvbnN0IGJvbmVOb2RlID0gbmV3IE5vZGUoYm9uZS5uYW1lKTtcbiAgICAgICAgYm9uZU5vZGUubGF5ZXIgPSBMYXllcnMuRW51bS5VSV8yRDtcblxuICAgICAgICBjb25zdCB1aVRyYW5zID0gYm9uZU5vZGUuYWRkQ29tcG9uZW50KFVJVHJhbnNmb3JtKTtcbiAgICAgICAgdWlUcmFucy5jb250ZW50U2l6ZSA9IHNpemUoMCwgMCk7XG4gICAgICAgIHVpVHJhbnMuc2V0QW5jaG9yUG9pbnQoMCwgMCk7XG5cbiAgICAgICAgbm9kZURpY3RbYm9uZS5uYW1lXSA9IGJvbmVOb2RlO1xuICAgIH1cblxuICAgIC8vIDIuIOqzhOy4teq1rOyhsCDsg53shLEg7ZuEIOq4sOuzuCB0cmFuc2Zvcm0g7ISk7KCVXG4gICAgZm9yIChjb25zdCBib25lIG9mIGJvbmVEYXRhTGlzdCkge1xuICAgICAgICBjb25zdCBib25lTm9kZSA9IG5vZGVEaWN0W2JvbmUubmFtZV07XG4gICAgICAgIGNvbnN0IHRhcmdldFBhcmVudCA9IChib25lLnBhcmVudCAmJiBub2RlRGljdFtib25lLnBhcmVudF0pID8gbm9kZURpY3RbYm9uZS5wYXJlbnRdIDogYm9uZVJvb3Q7XG5cbiAgICAgICAgYm9uZU5vZGUuc2V0UGFyZW50KHRhcmdldFBhcmVudCk7XG5cbiAgICAgICAgYm9uZU5vZGUuc2V0UG9zaXRpb24oYm9uZS54ID8/IDAgLCBib25lLnkgPz8gMCwgMCk7XG4gICAgICAgIGJvbmVOb2RlLnNldFNjYWxlKGJvbmUuY1ggPz8gMSwgYm9uZS5jWSA/PyAxLCAxKTtcblxuICAgICAgICBjb25zdCBzZXR1cFJvdFJhZCA9IGJvbmUua1ggPyAtYm9uZS5rWCA6IDA7XG4gICAgICAgIGJvbmVOb2RlLnNldFJvdGF0aW9uRnJvbUV1bGVyKDAsIDAsIHNldHVwUm90UmFkICogUkFEX1RPX0RFRyk7XG4gICAgfVxuXG4gICAgLy8gMy4g67O464W465OcIO2MqOyKpCDsoIDsnqUgKCBleC4uIHJvb3QvaGFuZC9maW5nZXIgKVxuICAgIC8vIGNsaXAg7J6s7IKs7Jqp6rO8IGxheWVyZWQgYW5pbWF0aW9uIOuTseydtCDqsIDriqUuIFxuICAgIGZ1bmN0aW9uIF9yZWNvcmRQYXRocyhub2RlOiBOb2RlLCBjdXJyZW50UGF0aDogc3RyaW5nKSB7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2Ygbm9kZS5jaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRQYXRoID0gY3VycmVudFBhdGggPyBgJHtjdXJyZW50UGF0aH0vJHtjaGlsZC5uYW1lfWAgOiBjaGlsZC5uYW1lO1xuICAgICAgICAgICAgbm9kZVBhdGhNYXBbY2hpbGQubmFtZV0gPSBjaGlsZFBhdGg7IFxuICAgICAgICAgICAgX3JlY29yZFBhdGhzKGNoaWxkLCBjaGlsZFBhdGgpOyAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIF9yZWNvcmRQYXRocyhyb290Tm9kZSwgXCJcIik7XG5cbiAgICByZXR1cm4geyBub2RlUGF0aE1hcCwgbm9kZURpY3QgfTtcbn1cblxuLy8gc2tpbiDshLjtjIXsnbQg65CY7Ja07J6I64qUIOuzuCDsspjrpqxcbi8vIOq4sOyhtCDsiqTtgqgg642w7J207YSwIOyeiOuKlCDrs7gg7J6Q7Iud7Jy866GcIOqwgeqwgSB0cmFuc2Zvcm0g66eMIOq0gOumrCwgcmVuZGVyZXIg66eMIOq0gOumrO2VmOuKlCDrhbjrk5wgMuqwnCDsg53shLFcbi8vIHNraW5Cb25lLCBza2luTm9kZSAoIHNraW5Ob2RlIOuKlCByZW5kZXJlciByb290IG5vZGUg7JeQIOu2me2emC4gb3JkZXIg6rSA66as66W8IOychO2VtCApXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGRTa2luUmVuZGVyZXJzKGFybWF0dXJlRGF0YTogYW55LCBub2RlRGljdDogUmVjb3JkPHN0cmluZywgTm9kZT4sIGRlc3REaXI6IHN0cmluZywganNvbkRhdGE6IGFueSwgcmVzb3VyY2VNYXA6IFJlc291cmNlTWFwICkge1xuICAgIGlmICghYXJtYXR1cmVEYXRhIHx8ICFhcm1hdHVyZURhdGEuYm9uZV9kYXRhKSByZXR1cm47XG5cbiAgICAvLyDsiqTtgqjsl5DshJwg7IKs7Jqp7ZWgIOqzteycoChzaGFyZWQpIOuplO2EsOumrOyWvCBza2luQ29udHJvbGxlciBzdGF0aWMg67OA7IiYIOyXkCDshLjtjIVcbiAgICBjb25zdCBhbGxNYXRzID0gYXdhaXQgbG9hZEFsbE1hdGVyaWFscygpO1xuICAgIGNvbnN0IHNraW5Db250cm9sbGVyID0ganMuZ2V0Q2xhc3NCeU5hbWUoJ1NraW5Db250cm9sbGVyJykgYXMgYW55O1xuICAgIHNraW5Db250cm9sbGVyLnNldFNoYXJlZE1hdGVyaWFscyhhbGxNYXRzKTtcblxuICAgIC8vIFsgc29ydCDtlZjsp4Ag7JWK6rOgIHNldFNpYmxpbmdJbmRleCDtlZjsp4Ag7JWK64qUIOydtOycoC4gXVxuICAgIC8vIOybkOuzuCBvcmRlciDqsJLsnbQgNTAsIDEwMCDsspjrn7wg65Os7ISx65Os7ISx7J24IOyDge2DnCwg7J2M7IiY64+EIOyeiOydjC5cbiAgICAvLyBzZXRTaWJsaW5nSW5kZXgg64qUIOuwsOyXtCDsnbjrjbHsiqQuLiA1MCwgMTAwIOydhCDqt7jrjIDroZwg65GYIOyImCDsl4bsnLzri4gg7J24642x7IqkIOuzgOqyve2VqC4g6re465+s64ukIOuztOuptCDqvKzsnoRcbiAgICAvLyDrlLDrnbzshJwg66+466asIOygleugrOydtCDri7UuXG4gICAgY29uc3QgYm9uZURhdGFMaXN0OiBhbnlbXSA9IGFybWF0dXJlRGF0YS5ib25lX2RhdGE7XG4gICAgY29uc3Qgc29ydGVkQm9uZURhdGEgPSBbLi4uYm9uZURhdGFMaXN0XS5zb3J0KChhLCBiKSA9PiAoYS56ID8/IDApIC0gKGIueiA/PyAwKSk7XG5cbiAgICAvLyByZW5kZXIgcm9vdCDrhbjrk5wg7IOd7ISxXG4gICAgY29uc3QgcmVuZGVyUm9vdCA9IG5vZGVEaWN0WydfX1JlbmRlclJvb3RfXyddO1xuXG4gICAgZm9yIChjb25zdCBib25lIG9mIHNvcnRlZEJvbmVEYXRhKSB7XG4gICAgICAgIGNvbnN0IGJvbmVOb2RlID0gbm9kZURpY3RbYm9uZS5uYW1lXTtcbiAgICAgICAgaWYgKCFib25lTm9kZSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgZGlzcGxheURhdGFMaXN0ID0gYm9uZS5kaXNwbGF5X2RhdGEgfHwgW107IC8vIOuzuOyXkCDtlaDri7nrkJwgZGlzcGxheV9kYXRhLiDsl4bsnLzrqbQg7ZW064u5IGtleSDqsIAg7JeG64ukLlxuICAgICAgICBpZiAoZGlzcGxheURhdGFMaXN0Lmxlbmd0aCA9PT0gMCkgY29udGludWU7IC8vIOyKpO2CqCDrjbDsnbTthLDqsIAg7JeG7Jy866m0IOuLpOydjOycvOuhnC4uXG5cbiAgICAgICAgY29uc3QgZnJhbWVzOiBTcHJpdGVGcmFtZVtdID0gW107ICAgLy8g67O47JeQIO2VoOuLueuQnCDsiqTtlITrnbzsnbTtirgg7ZSE66CI7J6E65OkXG4gICAgICAgIGNvbnN0IGRpc3BsYXlzOiBhbnlbXSA9IFtdOyAgICAgICAgIC8vIG5hbWUsIGRpc3BsYXlUeXBlLCBza2luRGF0YSDrsLDsl7QgOiBbeyB4LCB5LCBjeCwgY3ksIGt4LCBreX1dXG4gICAgICAgIGxldCBmaXJzdFJlc0RhdGE6IGFueSA9IG51bGw7ICAgICAgIC8vIOyVtey7pCDtj6zsnbjtirjrpbwg67m87Jik6riwIOychO2VtCDssqsg67KI7Ke4IOumrOyGjOyKpCDrjbDsnbTthLDrpbwg7KCA7J6lXG5cbiAgICAgICAgLy9cbiAgICAgICAgZm9yIChjb25zdCBkaXNwbGF5IG9mIGRpc3BsYXlEYXRhTGlzdCkge1xuICAgICAgICAgICAgY29uc3QgcmF3TmFtZSA9IGRpc3BsYXkubmFtZS5yZXBsYWNlKCcucG5nJywgJycpO1xuICAgICAgICAgICAgY29uc3QgcmVzRGF0YSA9IHJlc291cmNlTWFwLmdldFJlc0RhdGEocmF3TmFtZSk7XG5cbiAgICAgICAgICAgIGlmICghZmlyc3RSZXNEYXRhICYmIHJlc0RhdGEpIGZpcnN0UmVzRGF0YSA9IHJlc0RhdGE7ICAvLyDssqsg67KI7Ke4IOyKpO2CqOydmCDsm5Drs7gg7YWN7Iqk7LKYIOuNsOydtO2EsOulvCDsoIDsnqVcblxuICAgICAgICAgICAgaWYgKHJlc0RhdGE/LmZyYW1lVVVJRCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IF9zcHJpdGVGcmFtZSA9IGF3YWl0IGxvYWRBc3NldEJ5VVVJRChyZXNEYXRhLmZyYW1lVVVJRCEpLmNhdGNoKCgpID0+IG51bGwpIGFzIFNwcml0ZUZyYW1lO1xuICAgICAgICAgICAgICAgIGlmIChfc3ByaXRlRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVzLnB1c2goX3Nwcml0ZUZyYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheXMucHVzaChkaXNwbGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJhbWVzLmxlbmd0aCA9PT0gMCkgY29udGludWU7IC8vIHNwcml0ZSBmcmFtZSDsl4bripQgYm9uZSDsnYAg64SY7Ja06rCE64ukLlxuXG4gICAgICAgIC8vIOyKpO2CqCDrs7gg7IOd7ISxXG4gICAgICAgIGNvbnN0IHNraW5Cb25lID0gY3JlYXRlU2tpbkJvbmUoYm9uZSwgYm9uZU5vZGUpO1xuXG4gICAgICAgIC8vIOyKpO2CqCDrhbjrk5wg7IOd7ISxXG4gICAgICAgIGNvbnN0IGFuY2hvclhfSlNPTiA9IChmaXJzdFJlc0RhdGEgJiYgZmlyc3RSZXNEYXRhLnBYICE9PSB1bmRlZmluZWQpID8gZmlyc3RSZXNEYXRhLnBYIDogMC41O1xuICAgICAgICBjb25zdCBhbmNob3JZX0pTT04gPSAoZmlyc3RSZXNEYXRhICYmIGZpcnN0UmVzRGF0YS5wWSAhPT0gdW5kZWZpbmVkKSA/IGZpcnN0UmVzRGF0YS5wWSA6IDAuNTtcbiAgICAgICAgY3JlYXRlU2tpbk5vZGUoYm9uZSwgcmVuZGVyUm9vdCwgc2tpbkJvbmUsIGZyYW1lcywgYW5jaG9yWF9KU09OLCBhbmNob3JZX0pTT04pO1xuICAgIH1cbn1cblxuLy8g66qo65OgIGFuaW1hdGlvbiDtgbTrpr0g7IOd7ISxXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVBbGxBbmltYXRpb25DbGlwKGFybWF0dXJlRGF0YTogYW55LCBhbmltYXRpb25EYXRhOiBhbnksIG5vZGVQYXRoTWFwOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+LCBhbmltQ29tcDogQW5pbWF0aW9uLCBwcmVmYWJOYW1lOiBzdHJpbmcsIGRlc3REaXI6IHN0cmluZykge1xuICAgIGlmICghYW5pbWF0aW9uRGF0YSB8fCAhYW5pbWF0aW9uRGF0YS5tb3ZfZGF0YSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgZm9yIChjb25zdCBhbmltRGF0YSBvZiBhbmltYXRpb25EYXRhLm1vdl9kYXRhKSB7XG4gICAgICAgIGNvbnN0IGNsaXAgPSBhd2FpdCBnZW5lcmF0ZUFuaW1DbGlwKCBhcm1hdHVyZURhdGEsIGFuaW1EYXRhLCBub2RlUGF0aE1hcCApO1xuXG4gICAgICAgIC8vIOyXkOyFi+yXkCDsoIDsnqVcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBzZXJpYWxpemVkID0gY2NlLlV0aWxzLnNlcmlhbGl6ZShjbGlwKTtcbiAgICAgICAgY29uc3QgY2xpcFVybCA9IGAke2Rlc3REaXJ9LyR7cHJlZmFiTmFtZX1fJHthbmltRGF0YS5uYW1lfS5hbmltYDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhd2FpdCBFZGl0b3IuTWVzc2FnZS5yZXF1ZXN0KCdhc3NldC1kYicsICdjcmVhdGUtYXNzZXQnLCBjbGlwVXJsLCBKU09OLnN0cmluZ2lmeShzZXJpYWxpemVkKSwgeyBvdmVyd3JpdGU6IHRydWUgfSk7XG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCA1MDApKTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IGFzc2V0SW5mbyA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LWluZm8nLCBjbGlwVXJsKTtcbiAgICAgICAgaWYgKGFzc2V0SW5mbz8udXVpZCkge1xuICAgICAgICAgICAgY29uc3QgbG9hZGVkID0gYXdhaXQgbG9hZEFzc2V0QnlVVUlEKGFzc2V0SW5mby51dWlkKTtcbiAgICAgICAgICAgIGFuaW1Db21wLmNsaXBzLnB1c2gobG9hZGVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGRlZmF1bHQg7YG066a9IOyEuO2MhS5cbiAgICBpZiAoYW5pbUNvbXAuY2xpcHMubGVuZ3RoID4gMCkge1xuICAgICAgICBhbmltQ29tcC5kZWZhdWx0Q2xpcCA9IGFuaW1Db21wLmNsaXBzWzBdO1xuICAgIH1cbn1cblxuLy8g7JeQ64uI66mU7J207IWYIO2BtOumvSDsg53shLFcbi8vIEEuRXhwb3J0SnNvblxuLy8gICAgICDjhLQgYW5pbWF0aW9uRGF0YS5tb3ZfZGF0YVswXSA9IHtcbi8vICAgICAgICAgIG5hbWUgOiBjbGlwIOydtOumhCBleCkgb3BlbiwgbG9vcCAuLlxuLy8gICAgICAgICAgZHIgICA6IOy0nSBmcmFtZSDquLjsnbQgZXgpIDEyMVxuLy8gICAgICAgICAgbHAgICA6IGxvb3Ag7Jes67aAIGV4KSB0cnVlXG4vLyAgICAgICAgICB0d0UgIDog7YKk7ZSE66CI7J6E65OkIOyCrOydtOyXkCDsoITsl63soIEg67O06rCELCDqsJzrsJzrs7TqsITsnbQg7Jqw7ISg7Iic7JyEIOuGkuuLpCBleCkgMCjshKDtmJXrs7TqsIQpXG4vLyAgICAgICAgICBzYyAgIDogc3BlZWQgc2NhbGUg7JuQ67O47IaN64+EIOuMgOu5hCDrsLDsnKggZXgpIDAuMzMzKCDsm5Drs7Ug7IaN64+E67O064ukIOyVvSAz67CwIOuKkOumrOqyjCApXG4vLyAgICAgICAgICBtb3ZfYm9uZV9kYXRhIDogW1xuLy8gICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgbmFtZSA6IOuzuCDsnbTrpoRcbi8vICAgICAgICAgICAgICAgICAgZEkgICA6IOyKpO2CqCDsnbjrjbHsiqRcbi8vICAgICAgICAgICAgICAgICAgZnJhbWVfZGF0YSA6IFsgLy8g7YKk7ZSE66CI7J6EIOuNsOydtO2EsOuTpFxuLy8gICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIGRsOiAtMSwgLy8g64uk7J2MIO2CpO2UhOugiOyehOydtCDrgpjtg4DrgpjquLAg7KCE6rmM7KeAIOycoOyngOuQmOuKlCDsi5zqsIQo7ZSE66CI7J6E64uo7JyEKSAtMSDsnbTrqbQsIOuLpOydjCDtlITroIjsnoTquYzsp4Ag7Jyg7KeAXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHo6IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgY1g6IDEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgY1k6IDEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAga1g6IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAga1k6IDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgZmk6IO2UhOugiOyehCDsnbjrjbHsiqQgZXgpIDAsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgdHdFOiAwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIHR3ZWVuRnJhbWU6IHRydWUsIC8vIOuLpOydjCDtgqTtlITroIjsnoQg64SY7Ja06rCIIOuVjCDrs7TqsIQg7ZWg7KeALCDslYTri4jrqbQg7Jyg7KeA7ZWY64uk6rCAIOuLpOydjO2UhOugiOyehOyXkCDtmZUg67CU64CU7KeAXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgYmRfc3JjOiAxLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIGJmX2RzdDogNzcxLFxuLy8gICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgIC4uLlxuLy8gICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICAgLi4uLlxuLy8gICAgICAgICAgICAgICAgICBdXG4vL1xuLy8gICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAuLi4uXG4vLyAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAsLCwsLFxuLy8gICAgICAgICAgXVxuLy8gICAgICB9XG4vL1xuYXN5bmMgZnVuY3Rpb24gZ2VuZXJhdGVBbmltQ2xpcCggYXJtYXR1cmVEYXRhOiBhbnksIG1vdkRhdGE6IGFueSwgbm9kZVBhdGhNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gKSB7XG4gICAgaWYoICFtb3ZEYXRhKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJnZW5lcmF0ZUFuaUNsaXAgbW92RGF0YSBpbnZhbGlkIDogXCIgKyBtb3ZEYXRhICk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBzdGVwIDEuIGFuaW1hdGlvbiBjbGlwIOyDneyEsSDrsI8g6riw67O4IOygleuztCDshLjtjIVcbiAgICBjb25zdCBjbGlwID0gbmV3IEFuaW1hdGlvbkNsaXAoKTtcbiAgICBjbGlwLm5hbWUgPSBtb3ZEYXRhLm5hbWU7XG4gICAgY2xpcC5kdXJhdGlvbiA9IChtb3ZEYXRhLmRyIHx8IDApIC8gNjA7IC8vIOy0iOuLqOychCBjbGlwIOq4uOydtFxuICAgIGNsaXAuc2FtcGxlID0gNjA7IC8vIOyDmO2UjOungSDsho3rj4QoZnJhbWUgcmF0ZSkgMey0iOyXkCDrqofqsJzsnZgg7ZSE66CI7J6EIOuztOyXrOykhCDqsoPsnbjqsIBcbiAgICBjbGlwLnNwZWVkID0gbW92RGF0YS5zYyA/PyAxO1xuICAgIGNsaXAud3JhcE1vZGUgPSBtb3ZEYXRhLmxwID8gQW5pbWF0aW9uQ2xpcC5XcmFwTW9kZS5Mb29wIDogQW5pbWF0aW9uQ2xpcC5XcmFwTW9kZS5Ob3JtYWw7XG5cbiAgICAvLyDqsIEgYm9uZSDrs4TroZwgdHJhY2sgZGF0YSDshLjtjIUuICgg7YKk7ZSE66CI7J6EIOy2lOqwgCApXG4gICAgZm9yKGNvbnN0IGJvbmVEYXRhIG9mIG1vdkRhdGEubW92X2JvbmVfZGF0YSB8fCBbXSApIHtcbiAgICAgICAgY29uc3QgYm9uZU5hbWUgPSBib25lRGF0YS5uYW1lO1xuICAgICAgICBjb25zdCBzZXR1cFBvc2VEYXRhID0gYXJtYXR1cmVEYXRhPy5ib25lX2RhdGE/LmZpbmQoKGJvbmU6YW55KT0+IGJvbmUubmFtZSA9PT0gYm9uZU5hbWUgKSB8fCB7fTtcbiAgICAgICAgc2V0Qm9uZUtleUZyYW1lRGF0YSggY2xpcCwgYm9uZURhdGEsIHNldHVwUG9zZURhdGEsIG5vZGVQYXRoTWFwICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsaXA7XG59XG5cbiJdfQ==