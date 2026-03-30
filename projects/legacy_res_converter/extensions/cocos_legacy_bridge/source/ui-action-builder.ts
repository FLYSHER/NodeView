// @ts-ignore
import { Node, Animation, AnimationClip, animation, UIOpacity } from 'cc';
import {loadAssetByUUID} from "./utils";

function extractUITrackChannels(frames: any[], action: any) {
    const data = {
        times: [] as number[],
        x: [] as number[],  y: [] as number[],
        sx: [] as number[], sy: [] as number[],
        rotV: [] as number[],
        opacities: [] as number[]
    };

    const unitTime = action.unittime || 0.0166; // unittime 을 곱해야 함.

    // 💡 [수정] 생략된 데이터를 방어하기 위해 이전 프레임 값을 기억합니다.
    let lastX = 0, lastY = 0;
    let lastSX = 1, lastSY = 1;
    let lastRot = 0, lastOp = 255;

    // 첫 프레임 기준값을 세팅하기 위해 초기값 안전장치
    if (frames.length > 0) {
        lastX = frames[0].positionx ?? 0;
        lastY = frames[0].positiony ?? 0;
        lastSX = frames[0].scalex ?? 1;
        lastSY = frames[0].scaley ?? 1;
        lastRot = frames[0].rotation ?? 0;
        lastOp = frames[0].opacity ?? 255;
    }

    frames.forEach(frame => {
        const t = frame.frameid * unitTime;
        data.times.push(t);

        // 현재 프레임에 값이 있으면 갱신, 없으면 이전 값(last) 재사용!
        lastX = frame.positionx ?? lastX;
        lastY = frame.positiony ?? lastY;
        lastRot = frame.rotation ?? lastRot;
        lastSX = frame.scalex ?? lastSX;
        lastSY = frame.scaley ?? lastSY;
        lastOp = frame.opacity ?? lastOp;

        data.x.push(lastX);
        data.y.push(lastY);
        data.rotV.push(lastRot);
        data.sx.push(lastSX);
        data.sy.push(lastSY);
        data.opacities.push(lastOp);
    });

    return data;
}

function addTransformUITracks(animClip: any, nodePath: string, channels: any) {
    // pos
    const posTrack = new animation.VectorTrack();
    posTrack.componentsCount = 3; // 🚨 [필수] 이거 없으면 값이 증발합니다!
    posTrack.path = new animation.TrackPath().toHierarchy(nodePath).toProperty('position');
    const [pX, pY, pZ] = posTrack.channels();
    pX.curve.assignSorted(channels.times, channels.x);
    pY.curve.assignSorted(channels.times, channels.y);
    pZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    animClip.addTrack(posTrack);

    // rotation
    const rotTrack = new animation.VectorTrack();
    rotTrack.componentsCount = 3; // 🚨 [필수]
    rotTrack.path = new animation.TrackPath().toHierarchy(nodePath).toProperty('eulerAngles');
    const [rX, rY, rZ] = rotTrack.channels();
    rX.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rY.curve.assignSorted(channels.times, Array(channels.times.length).fill(0));
    rZ.curve.assignSorted(channels.times, channels.rotV);
    animClip.addTrack(rotTrack);

    // scale
    const scaleTrack = new animation.VectorTrack();
    scaleTrack.componentsCount = 3; // 🚨 [필수]
    scaleTrack.path = new animation.TrackPath().toHierarchy(nodePath).toProperty('scale');
    const [sX, sY, sZ] = scaleTrack.channels();
    sX.curve.assignSorted(channels.times, channels.sx);
    sY.curve.assignSorted(channels.times, channels.sy);
    sZ.curve.assignSorted(channels.times, Array(channels.times.length).fill(1));
    animClip.addTrack(scaleTrack);
}

function addOpacityUITracks(animClip: any, nodePath: string, channels: any) {
    const opacityTrack = new animation.RealTrack();
    opacityTrack.path = new animation.TrackPath()
        .toHierarchy(nodePath)
        .toComponent('cc.UIOpacity')
        .toProperty('opacity');

    opacityTrack.channel.curve.assignSorted(channels.times, channels.opacities );
    animClip.addTrack(opacityTrack);
}

async function generateUIActionClip( rootNode: Node, action:any, uiActionNodeMap: Map<number, string> ) {
    const clip = new AnimationClip();
    clip.name = action.name || "UnnamedAction";
    clip.sample = Math.round(1.0 / (action.unittime || 0.0166)); // 보통 60fps

    let maxDuration = 0; // 클립의 최대 길이를 추적할 변수
    const actionnodelist = action.actionnodelist || [];
    for (const actionNode of actionnodelist) {
        const tag = actionNode.ActionTag;

        const nodePath = uiActionNodeMap.get(tag); // uiActionMap 에서 경로 가져오기
        if (!nodePath) continue;

        const frames = actionNode.actionframelist || [];
        if (frames.length === 0) continue;

        var channels = extractUITrackChannels( frames, action );
        addTransformUITracks( clip, nodePath, channels );

        if(channels.times.length > 0 ) {
            const localMax = Math.max(...channels.times);
            if(localMax > maxDuration) {
                maxDuration = localMax;
            }
        }

        // 트랙 채널 중에 opacity가 변경되는 노드가 있다면 Opacity 채널 만든다
        if( channels.opacities.some( opacity => opacity !== 255) ) {
            const targetNode = rootNode.getChildByPath(nodePath); // 실제 노드 가져와서

            // 초기값이 255였던 노드들은 UIOpacity 가 없다. 그런 애들은 다시 달아준다.
            if (targetNode) {
                targetNode.getComponent(UIOpacity) || targetNode.addComponent(UIOpacity);
            }

            addOpacityUITracks( clip, nodePath, channels );
        }
    }

    clip.duration = maxDuration;

    return clip;
}

export async function buildUIAnimations(rootNode: Node, jsonData: any, uiActionNodeMap: Map<number, string>) {
    const animData = jsonData.animation;
    if (!animData || !animData.actionlist || animData.actionlist.length === 0) return;

    // animation component 생성
    const animComp = rootNode.addComponent(Animation);

    // 클립 개수대로 animation clip 생성
    for (const action of animData.actionlist) {
        const clip = await generateUIActionClip( rootNode, action, uiActionNodeMap );

        // asset 에 저장
        // @ts-ignore
        const serialized = cce.Utils.serialize(clip);
        // @ts-ignore
        const clipUrl = `db://assets/${rootNode.name}_${clip.name}.anim`;

        const dataStr = typeof serialized === 'string' ? serialized : JSON.stringify(serialized, null, 2);
        //@ts-ignore
        await Editor.Message.request('asset-db', 'create-asset', clipUrl, dataStr, { overwrite: true });
        await new Promise(r => setTimeout(r, 500));

        // @ts-ignore
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', clipUrl);
        if (assetInfo?.uuid) {
            //@ts-ignore
            const loaded = await loadAssetByUUID(assetInfo.uuid);
            animComp.clips.push(loaded);
        }
    }


    // default로 생성시 진행해주고 싶다면..
    // if (clips.length > 0) animComp.defaultClip = animComp.clips[0];
}