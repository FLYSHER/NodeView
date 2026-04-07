// armature-builder.ts
//todo : 블랜드 옵션 적용부터 해야 함. 3/7

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
import { Node, Layers, UITransform, Sprite, SpriteFrame, AnimationClip, animation, Animation, assetManager, size, Material, js, SkinController, RealCurve, gfx  } from 'cc';
import * as path from 'path';
import { ResourceMap, loadAssetByUUID, mapGLBlendFactor } from './utils';

const RAD_TO_DEG = 180 / Math.PI;

async function loadAllMaterials() {
    const rawPaths: Record<string, string> = {
        Normal: "db://assets/materials/Normal.mtl",
        Additive: 'db://assets/materials/Additive.mtl',
        LinearAdd: 'db://assets/materials/LinearAdd.mtl',
        Multiply: 'db://assets/materials/Multiply.mtl'
    };

    const loadedMats: Record<string, Material> = {};
    const keys = Object.keys(rawPaths);

    const loadPromises = keys.map(async (key) => {
        const path = rawPaths[key];
        try {
            console.log(`[Builder] 🔍 [${key}] DB 조회 중... (${path})`);

            // 1. 에셋 DB에 UUID 정보 요청
            const info: any = await Editor.Message.request('asset-db', 'query-asset-info', path);
            console.log( info );

            // 🚨 만약 여기서 경고 로그가 뜬다면, 100% 경로(이름/대소문자)가 틀린 것입니다.
            if (!info || !info.uuid) {
                console.warn(`[Builder] ⚠️ [${key}] 에셋을 찾을 수 없음! 경로를 다시 확인하세요: ${path}`);
                return;
            }

            console.log(`[Builder] 🔄 [${key}] UUID 획득(${info.uuid}), 로드 시도 중...`);

            // 2. 유저님이 이미 가지고 계신 'loadAssetByUUID' 유틸리티를 사용하여 로드!
            const asset = await loadAssetByUUID(info.uuid) as Material;

            if (asset) {
                loadedMats[key] = asset;
                console.log(`[Builder] ✅ [${key}] 로드 완벽 성공!`);
            } else {
                console.error(`[Builder] ❌ [${key}] UUID는 맞지만 로드에 실패했습니다.`);
            }
        } catch (err) {
            console.error(`[Builder] ❌ [${key}] 에러 발생:`, err);
        }
    });

    // 4개가 다 끝날 때까지 대기
    await Promise.all(loadPromises);

    console.log("[Builder] 🎯 최종 로드된 메터리얼 목록:", Object.keys(loadedMats));
    return loadedMats;
}

function getBlendModeIndex(src: number, dst: number): number {
    if (src === 1 && dst === 1) return 2; // LinearAdd (1, 1)
    if (dst === 1) return 1;               // Additive (*, 1)
    if (src === 774) return 3;            // Multiply (774, *)
    return 0;                             // Normal (770, 771)
}

///////////////////////////////////////////////////////
//region [ 보간 관련 ]

// cocos studio 의 twE 프리셋 인덱스 매핑 테이블
const TWEEN_BEZIER_MAP: Record<number, [number, number, number, number]> = {
    1: [0.47, 0.0, 0.745, 0.715],   // Sine In
    2: [0.39, 0.575, 0.565, 1.0],   // Sine Out
    3: [0.445, 0.05, 0.55, 0.95],   // Sine InOut
    4: [0.55, 0.085, 0.68, 0.53],   // Quad In
    5: [0.25, 0.46, 0.45, 0.94],    // Quad Out
    6: [0.455, 0.03, 0.515, 0.955], // Quad InOut
    7: [0.55, 0.055, 0.675, 0.19],  // Cubic In
    8: [0.215, 0.61, 0.355, 1.0],   // Cubic Out
    9: [0.645, 0.045, 0.355, 1.0],  // Cubic InOut
    10: [0.895, 0.03, 0.685, 0.22], // Quart In
    11: [0.165, 0.84, 0.44, 1.0],   // Quart Out
    12: [0.77, 0.0, 0.175, 1.0],    // Quart InOut
    13: [0.755, 0.05, 0.855, 0.06], // Quint In
    14: [0.23, 1.0, 0.32, 1.0],     // Quint Out
    15: [0.86, 0.0, 0.07, 1.0],     // Quint InOut
    16: [0.95, 0.05, 0.795, 0.035], // Expo In
    17: [0.19, 1.0, 0.22, 1.0],     // Expo Out
    18: [1.0, 0.0, 0.0, 1.0],       // Expo InOut
    19: [0.6, 0.04, 0.98, 0.335],   // Circ In
    20: [0.075, 0.82, 0.165, 1.0],  // Circ Out
    21: [0.785, 0.135, 0.15, 0.86], // Circ InOut
    25: [0.6, -0.28, 0.735, 0.045], // Back In (밖으로 밀려나는 S자 곡선)
    26: [0.175, 0.885, 0.32, 1.275],// Back Out (원하는 곳 넘어갔다 돌아오는 곡선)
    27: [0.68, -0.55, 0.265, 1.55], // Back InOut
};

// bezier 보간을 hermit 보간으로 변환
// Cocos Studio 에는 튕기는 효과인 Elastic(22~24)과 공이 튀는 Bounce(28~30) 가 있습니다.
// 이 녀석들은 곡선이 중간에 지그재그로 여러 번 꺾여야 해서, 수학적으로 단일(1개)의 에르미트/베지에 곡선 블록으로는 절대 표현할 수 없습니다. (CSS Animation에서도 이 둘은 기본 preset으로 제공하지 않습니다.)
// 만약 JSON 데이터에 Bounce나 Elastic 값이 들어온다면, 위 테이블 매핑이 없어서 기본적으로 선형(Linear) 처리되거나, 아니면 가장 비슷한 BackOut(26) 정도로 우회(Fallback) 처리하시는 것을 추천합니다.
function applyEasingToCurves(curves: any[], twEVals: number[]) {
    curves.forEach(curve => {
        // CC 3.x RealCurve 내부 키프레임 배열에 접근 (버전에 따라 다를 수 있음)
        const kfs = curve._keyframes || curve.keyframes || [];
        if (!kfs || kfs.length === 0) return;

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
function calculateTrimmedAnchor(sf: SpriteFrame | null, baseAx: number, baseAy: number) {
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
function normalizeKeyFrames(rawFrames: any[]) {
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
    } else if (frames[0].fi > 0) {
        frames.unshift({ ...frames[0], fi: 0 });
    }
    return frames;
}

// 셋업포즈와 프레임 데이터로 각각의 채널들 추출
function extractTrackChannels(frames: any[], setupPose: any) {
    const data = { times: [] as number[], x: [] as number[], y: [] as number[], sx: [] as number[], sy: [] as number[], rotV: [] as number[], cR: [] as number[], cG: [] as number[], cB: [] as number[], cA: [] as number[] };

    frames.forEach(f => {
        const t = (f.fi || 0) / 60;
        if (!data.times.includes(t)) {
            data.times.push(t);
            data.x.push((f.x ?? 0) + (setupPose.x ?? 0));
            data.y.push((f.y ?? 0) + (setupPose.y ?? 0));
            data.sx.push((f.cX ?? 1) * (setupPose.cX ?? 1));
            data.sy.push((f.cY ?? 1) * (setupPose.cY ?? 1));
            data.rotV.push(-((f.kX ?? 0) + (setupPose.kX ?? 0)));

            const color = f.color || {};
            data.cR.push(color.r ?? 255);
            data.cG.push(color.g ?? 255);
            data.cB.push(color.b ?? 255);
            data.cA.push(color.a ?? 255);
        }
    });
    return data;
}

// transform( pos, rot, scale ) track 추가 ( 키프레임 데이터들로 쭉 키프레임 잡아줌 )
function addTransformTracks(animClip: any, targetPath: string, channels: any) {
    // @ts-ignore
    const posTrack = new animation.VectorTrack();
    posTrack.path = new animation.TrackPath().toHierarchy(targetPath).toProperty('position');

    const [pX, pY, pZ] = posTrack.channels();
    pX.curve.assignSorted(channels.times, channels.x);
    pY.curve.assignSorted(channels.times, channels.y);
    pZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    applyEasingToCurves([pX.curve, pY.curve, pZ.curve], channels.twE);
    animClip.addTrack(posTrack);

    // @ts-ignore
    const rotTrack = new animation.VectorTrack();
    rotTrack.path = new animation.TrackPath().toHierarchy(targetPath).toProperty('eulerAngles');

    const [rX, rY, rZ] = rotTrack.channels();
    rX.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rY.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rZ.curve.assignSorted(channels.times, channels.rotV);
    applyEasingToCurves([rZ.curve], channels.twE);
    animClip.addTrack(rotTrack);

    // @ts-ignore
    const scaleTrack = new animation.VectorTrack();
    scaleTrack.path = new animation.TrackPath().toHierarchy(targetPath).toProperty('scale');

    const [sX, sY, sZ] = scaleTrack.channels();
    sX.curve.assignSorted(channels.times, channels.sx);
    sY.curve.assignSorted(channels.times, channels.sy);
    sZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(1));
    applyEasingToCurves([sX.curve, sY.curve, sZ.curve], channels.twE);
    animClip.addTrack(scaleTrack);
}

function addColorTrack(animClip: any, targetPath: string, channels: any) {
    // @ts-ignore
    const colorTrack = new animation.ColorTrack();
    colorTrack.path = new animation.TrackPath().toHierarchy(targetPath).toComponent('cc.Sprite').toProperty('color');

    const [cR, cG, cB, cA] = colorTrack.channels();
    cR.curve.assignSorted(channels.times, channels.cR);
    cG.curve.assignSorted(channels.times, channels.cG);
    cB.curve.assignSorted(channels.times, channels.cB);
    cA.curve.assignSorted(channels.times, channels.cA);

    animClip.addTrack(colorTrack);
}

function addSkinIndexTrack(animClip: any, targetPath: string, boneData: any, setupPoseData: any) {
    const skinKeyframes = getSkinTrackData(boneData, setupPoseData);
    if (!skinKeyframes || skinKeyframes.length === 0) return;

    try {
        // @ts-ignore
        const indexTrack = new animation.RealTrack();
        indexTrack.path = new animation.TrackPath().toHierarchy(targetPath).toComponent('SkinController').toProperty('currentSkinIndex');

        const curve = indexTrack.channel.curve;
        if (curve) {
            // @ts-ignore
            curve.assignSorted(skinKeyframes.map(kf => kf.time), skinKeyframes.map(kf => kf.value));
            const kfs = (curve as any)._keyframes || (curve as any).keyframes || [];
            for (let i = 0; i < kfs.length; i++) { if (kfs[i]) kfs[i].interpolationMode = 0; }
        }
        animClip.addTrack(indexTrack);
    } catch (e) {}
}

function addBlendModeTrack(animClip: any, targetPath: string, frames: any[]) {
    const blendKeyframes: { time: number, value: number }[] = [];
    let lastMode = -1;

    frames.forEach((f: any) => {
        if (f.bd_src !== undefined || f.bf_dst !== undefined || f.bd_dst !== undefined) {
            const mode = getBlendModeIndex(f.bd_src ?? 770, f.bf_dst ?? f.bd_dst ?? 771);
            if (mode !== lastMode) {
                blendKeyframes.push({ time: (f.fi || 0) / 60, value: mode });
                lastMode = mode;
            }
        }
    });

    if (blendKeyframes.length === 0) return;

    // @ts-ignore
    const blendTrack = new animation.RealTrack();
    blendTrack.path = new animation.TrackPath().toHierarchy(targetPath).toComponent('SkinController').toProperty('blendMode');

    // @ts-ignore
    blendTrack.channel.curve.assignSorted(blendKeyframes.map(k => k.time), blendKeyframes.map(k => k.value));
    const kfs = (blendTrack.channel.curve as any)._keyframes || [];

    for (let i = 0; i < kfs.length; i++) {
        if (kfs[i]) kfs[i].interpolationMode = 0;
    }

    animClip.addTrack(blendTrack);
}

function createSkinBone(bone: any, boneNode: Node) {
    // skin bone 생성
    const skinBone = new Node(`${bone.name}_skinBone`);
    skinBone.addComponent(UITransform).setContentSize(0,0);
    skinBone.setParent(boneNode);

    // 첫번재 display data 가져와 해당 transform 을 skinBone 에 세팅
    const firstDisplay = bone.display_data[0];
    if (firstDisplay.skin_data && firstDisplay.skin_data.length > 0) {
        const skinData = firstDisplay.skin_data[0];
        skinBone.setPosition(skinData.x ?? 0, skinData.y ?? 0, 0);
        skinBone.setScale(skinData.cX ?? 1, skinData.cY ?? 1, 1);
        skinBone.setRotationFromEuler(0, 0, -(skinData.kX ?? 0) * RAD_TO_DEG);
    }

    return skinBone;
}

function createSkinNode(bone: any, renderRoot: Node, skinBone: Node, frames: SpriteFrame[], anchorX_JSON: number, anchorY_JSON: number) {
    const skinNode = new Node(`${bone.name}_skinNode`);
    skinNode.layer = Layers.Enum.UI_2D;
    skinNode.setParent(renderRoot);

    // skinNode 에 관련 컴포넌트들 추가
    //      Sprite, UITransform( Sprite 컴포넌트 추가하면 자동으로 추가됨 )
    //      BoneFollower, SkinController
    let sprite = skinNode.addComponent(Sprite);
    const uiTrans = skinNode.getComponent(UITransform);
    const follower = skinNode.addComponent('BoneFollower') as any;
    let skinCtrl = skinNode.addComponent('SkinController') as any;

    // sprite 컴포넌트 속성 세팅
    sprite.sizeMode = Sprite.SizeMode.TRIMMED;
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
    let bdSrcGL = firstDisplay?.bd_src ?? 770;
    let bdDstGL = firstDisplay?.bf_dst ?? firstDisplay?.bd_dst ?? 771;
    skinCtrl.blendMode = getBlendModeIndex(bdSrcGL, bdDstGL);
    skinCtrl.currentSkinIndex = 0;

    sprite.markForUpdateRenderData();

    return skinNode;
}

// 해당 본이 스킨 변경이 있는 트랙인지 확인 후 데이터 반환
function getSkinTrackData( boneData: any, setupPoseData: any) {
    const frameDataList = boneData.frame_data || [];
    if (frameDataList.length === 0)
        return null;

    const result: { time: number, value: number }[] = [];

    // 2. 전체 프레임을 순회하며 dI 데이터 추출
    frameDataList.forEach((f: any) => {
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
    const hasChange = result.some(kf => kf.value !== setupDI);          // setupPose 의 dI 와 다른가?
    const isDynamic = result.some(kf => kf.value !== result[0].value);  // 키프레임 중에 dI 변경이 있는가?

    if (hasChange || isDynamic) {
        return result;
    }

    return null;
}

function setBoneKeyFrameData( animClip: any, boneData: any, setupPoseData: any, nodePathMap: Record<string, string> ) {
    const boneName = boneData.name;
    const bonePath = nodePathMap[boneName]; // ex) pelvis/spine/boneName
    if( !bonePath ) {
        console.error("bonePath not exist : " + bonePath );
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

function createBoneNode(name: string): Node {
    const boneNode = new Node(name);
    boneNode.layer = Layers.Enum.UI_2D;

    // 본 크기는 0,0 으로 ..
    const uiTrans = boneNode.addComponent(UITransform);
    uiTrans.setContentSize(0, 0);
    uiTrans.setAnchorPoint(0, 0);

    return boneNode;
}

function setupBoneTransform(boneNode: Node, boneData: any, nodeDict: Record<string, Node>, defaultParent: Node ) {
    // 부모 본 세팅 ( 데이터에 없으면 boneRoot 에 붙힘 )
    const parent = (boneData.parent && nodeDict[boneData.parent]) ? nodeDict[boneData.parent] : defaultParent;
    boneNode.setParent( parent );

    // pos
    boneNode.setPosition(boneData.x ?? 0, boneData.y ?? 0, 0);

    // scale
    boneNode.setScale(boneData.cX ?? 1, boneData.cY ?? 1, 1);

    // rotation
    // legacy 의 radian 을 degree 로 변환
    // kx 값으로 회전하며 -로 보정.
    const setupRotRad = boneData.kX ? -boneData.kX : 0;
    boneNode.setRotationFromEuler(0, 0, setupRotRad * RAD_TO_DEG);

}

// armature 정보로 기존 bone-tree 구조를 node-tree 구조로 변경
// rootNode 에 자식본노드들 붙혀 node-tree 만들고
// 본-계층구조경로 맵과, 본-노드 맵 정보 리턴
export async function buildArmatureTree(armatureData: any, rootNode: Node): Promise<{ nodePathMap: Record<string, string>, nodeDict: Record<string, Node> }> {
    const nodePathMap: Record<string, string> = {}; // 본 노드들 패스 맵 
    const nodeDict: Record<string, Node> = {};      // 본 노드 맵

    // nodePathMap : 노드 부모 경로 맵
    // ex )
    //      '30': 'BoneRoot/ctrl_main/main/ctrl_30/30',
    //      '50': 'BoneRoot/ctrl_main/main/ctrl_50/50',
    //      RenderRoot: 'RenderRoot',

    // nodeDict : 본 이름과 실제 본 노드 레퍼런스 맵
    //      '30' : 본 노드 ref

    if (!armatureData || !armatureData.bone_data ) {
        return { nodePathMap, nodeDict };
    }

    // AR Root Node
    //  ㄴ BoneRoot
    //      ㄴ ... 본 계층 구조
    //  ㄴ RenderRoot
    //      ㄴ skinNode .. 계층구조 아닌 RenderRoot를 부모로 든 자식들 모음

    // 본 루트 노드 생성
    const boneRoot = new Node('BoneRoot');
    boneRoot.layer = Layers.Enum.UI_2D;
    boneRoot.parent = rootNode;
    nodeDict['__BoneRoot__'] = boneRoot; // 딕셔너리에도 등록

    // 스킨 루트 노드 생성
    const renderRoot = new Node('RenderRoot');
    renderRoot.layer = Layers.Enum.UI_2D;
    renderRoot.parent = rootNode;
    nodeDict['__RenderRoot__'] = renderRoot;

    const boneDataList: any[] = armatureData.bone_data;

    // 본 노드 생성 & 본 이름 - 노드 맵에 세팅
    for (const boneData of boneDataList) {
        const boneNode = createBoneNode(boneData.name);
        nodeDict[boneData.name] = boneNode;
    }

    // Bone 트리구조 빌드 및 본 RTS(위치-크기-회전) 속성 세팅
    for (const boneData of boneDataList) {
        const boneNode = nodeDict[boneData.name];
        setupBoneTransform(boneNode, boneData, nodeDict, boneRoot);
    }

    // 3. 본 - 계층구조 경로 맵 저장 ( ex.. root/hand/finger )
    // clip 재사용과 layered animation 등이 가능. 
    function _recordPaths(node: Node, currentPath: string) {
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
export async function buildAllSkinNode(armatureData: any, nodeDict: Record<string, Node>, destDir: string, jsonData: any, resourceMap: ResourceMap ) {
    if (!armatureData || !armatureData.bone_data) return;

    // 스킨에서 사용할 공유(shared) 메터리얼 skinController static 변수 에 세팅
    const allMats = await loadAllMaterials();
    const skinController = js.getClassByName('SkinController') as any;
    skinController.setSharedMaterials(allMats); // SkinController 클래스에 setSharedMaterials Static 함수 있음.

    // [ sort 하지 않고 setSiblingIndex 하지 않는 이유. ]
    // 원본 order 값이 50, 100 처럼 듬성듬성인 상태, 음수도 있음.
    // setSiblingIndex 는 배열 인덱스.. 50, 100 을 그대로 둘 수 없으니 인덱스 변경함. 그러다 보면 꼬임
    // 따라서 미리 정렬이 답.
    const boneDataList: any[] = armatureData.bone_data;
    const sortedBoneData = [...boneDataList].sort((a, b) => (a.z ?? 0) - (b.z ?? 0));

    // render root 노드 생성
    const renderRoot = nodeDict['__RenderRoot__'];

    for (const bone of sortedBoneData) {
        const boneNode = nodeDict[bone.name];
        if (!boneNode) continue;

        const displayDataList = bone.display_data || []; // 본에 할당된 display_data. 없으면 해당 key 가 없다.
        if (displayDataList.length === 0) continue; // 스킨 데이터가 없으면 다음으로..

        const frames: SpriteFrame[] = [];   // 본에 할당된 스프라이트 프레임들
        const displays: any[] = [];         // name, displayType, skinData 배열 : [{ x, y, cx, cy, kx, ky}]
        let firstResData: any = null;       // 앵커 포인트를 빼오기 위해 첫 번째 리소스 데이터를 저장

        //
        for (const display of displayDataList) {
            const rawName = display.name.replace('.png', '');
            const resData = resourceMap.getResData(rawName);

            if (!firstResData && resData) firstResData = resData;  // 첫 번째 스킨의 원본 텍스처 데이터를 저장

            if (resData?.frameUUID) {
                const _spriteFrame = await loadAssetByUUID(resData.frameUUID!).catch(() => null) as SpriteFrame;
                if (_spriteFrame) {
                    frames.push(_spriteFrame);
                    displays.push(display);
                }
            }
        }

        if (frames.length === 0) continue; // sprite frame 없는 bone 은 넘어간다.

        // 스킨 본 생성
        const skinBone = createSkinBone(bone, boneNode);

        // 스킨 노드 생성
        const anchorX_JSON = (firstResData && firstResData.pX !== undefined) ? firstResData.pX : 0.5;
        const anchorY_JSON = (firstResData && firstResData.pY !== undefined) ? firstResData.pY : 0.5;
        createSkinNode(bone, renderRoot, skinBone, frames, anchorX_JSON, anchorY_JSON);
    }
}

// 모든 animation 클립 생성
export async function generateAllAnimationClip(armatureData: any, animationData: any, nodePathMap: Record<string, string>, animComp: Animation, prefabName: string, destDir: string) {
    if (!animationData || !animationData.mov_data)
        return;

    for (const animData of animationData.mov_data) {
        const clip = await generateAnimClip( armatureData, animData, nodePathMap );

        // 에셋에 저장
        // @ts-ignore
        const serialized = cce.Utils.serialize(clip);
        const clipUrl = `${destDir}/${prefabName}_${animData.name}.anim`;
        // @ts-ignore
        await Editor.Message.request('asset-db', 'create-asset', clipUrl, JSON.stringify(serialized), { overwrite: true });
        await new Promise(r => setTimeout(r, 500));

        // @ts-ignore
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', clipUrl);
        if (assetInfo?.uuid) {
            const loaded = await loadAssetByUUID(assetInfo.uuid);
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
async function generateAnimClip( armatureData: any, movData: any, nodePathMap: Record<string, string> ) {
    if( !movData) {
        console.error("generateAniClip movData invalid : " + movData );
        return;
    }

    // step 1. animation clip 생성 및 기본 정보 세팅
    const clip = new AnimationClip();
    clip.name = movData.name;
    clip.duration = (movData.dr || 0) / 60; // 초단위 clip 길이
    clip.sample = 60; // 샘플링 속도(frame rate) 1초에 몇개의 프레임 보여줄 것인가
    clip.speed = movData.sc ?? 1;
    clip.wrapMode = movData.lp ? AnimationClip.WrapMode.Loop : AnimationClip.WrapMode.Normal;

    // 각 bone 별로 track data 세팅. ( 키프레임 추가 )
    for(const boneData of movData.mov_bone_data || [] ) {
        const boneName = boneData.name;
        const setupPoseData = armatureData?.bone_data?.find((bone:any)=> bone.name === boneName ) || {};
        setBoneKeyFrameData( clip, boneData, setupPoseData, nodePathMap );
    }

    return clip;
}

