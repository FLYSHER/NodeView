import { _decorator, Component, Node } from 'cc';
import * as cc from 'cc';
import { ArmatureBone } from './ArmatureBone';

const { ccclass, property } = _decorator;

//Label_Parent
//      Label-001
//      Label-002

@ccclass('Test_AnimationClip')
export class Test_AnimationClip extends Component {
    start() {
        // 1. 애니메이션을 재생할 노드에 Animation 컴포넌트가 있는지 확인 (없으면 추가)
        let animComp = this.getComponent(cc.Animation);
        if (!animComp) {
            animComp = this.addComponent(cc.Animation);
        }

        // 2. 위에서 우리가 만든 clip 객체를 가져옵니다.
        const myClip = this.createDynamicClipStringProperty(); 
        // 3. 클립을 관리하기 위한 고유 이름(Key)을 정해서 등록합니다.
        const clipName = 'test';
        myClip.wrapMode = cc.AnimationClip.WrapMode.Loop; // 무한 반복

        animComp.addClip(myClip, clipName);
        // 4. 재생!
        animComp.play(clipName);
    }
   
    //https://docs.cocos.com/creator/3.8/manual/zh/animation/use-animation-curve.html
    createDynamicClipPos(): cc.AnimationClip {
        //https://www.swiftcafe.io/post/cocos-animation
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        const vec3Pos = [ new cc.Vec3(0 , 0 , 0) ,  new cc.Vec3(100 , -100 , 0) ,  new cc.Vec3(-100 , 100 , 0) ];

        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const posTrack = new cc.animation.VectorTrack(); // Vec3 데이터용 트랙
        posTrack.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toProperty('position'); // 속성 이름
    
        posTrack.componentsCount = 3; // 벡터 트랙의 첫 세 채널 사용
        const channels = posTrack.channels();

        for(let n = 0; n < keyTimes.length; n++){
            channels[0].curve.addKeyFrame( keyTimes[n], {value : vec3Pos[n].x}); 
            channels[1].curve.addKeyFrame( keyTimes[n], {value : vec3Pos[n].y}); 
            channels[2].curve.addKeyFrame( keyTimes[n], {value : vec3Pos[n].z}); 

        }
            
        clip.addTrack(posTrack);

        //////////////////////////
        //posTrack2 는 Easing설정 관련
                // 3. 애니메이션 커브 설정
        const posTrack2 = new cc.animation.VectorTrack(); // Vec3 데이터용 트랙
        posTrack2.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-002')   // 구 HierarchyPath
            .toProperty('position'); // 속성 이름
    
        posTrack2.componentsCount = 3; // 벡터 트랙의 첫 세 채널 사용
        const channels2 = posTrack2.channels();

        let vec3KeyFrames2  =[];
        for(let n = 0; n < keyTimes.length; n++){
            vec3KeyFrames2.push([keyTimes[n],vec3Pos[n]])
        }

        channels2[0].curve.assignSorted(vec3KeyFrames2.map((
            [time, vec3]) => [time, { 
                value: vec3.x, 
                easingMethod : 6, //CUBIC_IN 구버전 deprecated 라서 enum으로 가져오는쪽이 막혀있다. __private._cocos_core_curves_easing_method__EasingMethod
                //interpolationMode: cc.RealInterpolationMode.CUBIC // easingMethod
                //tangentWeightMode : cc.TangentWeightMode.BOTH, //베지어 곡선의 핸들 길이를 조절할 것인가?"
                //leftTangent: 0, ://들어오는쪽(왼쪽) 기울기 (0이면 기울기 없음)
                //leftTangentWeight: 1, //왼쪽 기울기의 가중치 (값이 크면 기울기 값 더 크게 영향 받음)
                //rightTangent: 0,     // 나가는(오른쪽) 방향의 기울기
                //rightWeight: 1       // 오른쪽 가중치
      
            }])); 
        channels2[1].curve.assignSorted(vec3KeyFrames2.map((
            [time, vec3]) => [time, {
                 value: vec3.y,
                 easingMethod : 6 //CUBIC_IN 
                //  interpolationMode: cc.RealInterpolationMode.CUBIC 
                }])); 
        channels2[2].curve.assignSorted(vec3KeyFrames2.map((
            [time, vec3]) => [time, { 
                value: vec3.z,
                easingMethod : 6 //CUBIC_IN 
                // interpolationMode: cc.RealInterpolationMode.CUBIC
            }])); 

        clip.addTrack(posTrack2);
            
        return clip;
    }

    createDynamicClipScale(): cc.AnimationClip {
        //https://www.swiftcafe.io/post/cocos-animation
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        const vec3Scale = [ new cc.Vec3(1 , 1 , 1) ,  new cc.Vec3(1.5 , 0.5 , 0) ,  new cc.Vec3(1 , 1 , 1) ];

        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const posTrack = new cc.animation.VectorTrack(); // Vec3 데이터용 트랙
        posTrack.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toProperty('scale');       // 속성 이름
    
        posTrack.componentsCount = 3; // 벡터 트랙의 첫 세 채널 사용
        const channels = posTrack.channels();

        let vec3KeyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            vec3KeyFrames.push([keyTimes[n],vec3Scale[n]])
        }

        channels[0].curve.assignSorted(vec3KeyFrames.map((
            [time, vec3]) => [time, { value: vec3.x }])); 
        channels[1].curve.assignSorted(vec3KeyFrames.map((
            [time, vec3]) => [time, { value: vec3.y }])); 
        channels[2].curve.assignSorted(vec3KeyFrames.map((
            [time, vec3]) => [time, { value: vec3.z }])); 

            
        clip.addTrack(posTrack);
        return clip;
    }
    
    createDynamicClipRot(): cc.AnimationClip {
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        const rot = [ 0, 180, 360 ];

        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.QuatTrack(); // QuatTrack 회전 전용 트랙
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toProperty('rotation');       // 속성 이름
        
        let vec3KeyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            let quatValue = new cc.Quat(); // 0도
            cc.Quat.fromEuler(quatValue, 0, 0, rot[n])
            vec3KeyFrames.push([keyTimes[n], quatValue])
        }

        track.channel.curve.assignSorted(vec3KeyFrames.map((
            [time, rotQuat]) => [time, { value: rotQuat }])); 
            
        clip.addTrack(track);
        return clip;
    }

    createDynamicClipColor(): cc.AnimationClip {
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        // 3. 데이터 주입 (흰색 -> 빨간색 -> 흰색)
        const colorValues = [
            new cc.Color(255, 255, 255, 255), // 기본 흰색
            new cc.Color(255, 0, 0, 255),     // 빨간색
            new cc.Color(255, 255, 255, 255)  // 다시 흰색
        ];
        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.ColorTrack(); // Color 데이터용 트랙
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toComponent('cc.Label')
            //.toComponent('cc.Sprite')
            .toProperty('color'); // 속성 이름
    
     
        let vec3KeyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            vec3KeyFrames.push([keyTimes[n], colorValues[n]])
        }

        const channels = track.channels();
        channels[0].curve.assignSorted(vec3KeyFrames.map((
            [time, colorValue]) => [time, { value: colorValue.r }])); 
        channels[1].curve.assignSorted(vec3KeyFrames.map((
            [time, colorValue]) => [time, { value: colorValue.g }])); 
        channels[2].curve.assignSorted(vec3KeyFrames.map((
            [time, colorValue]) => [time, { value: colorValue.b }])); 

        // clip.addTrack(posTrack);

            
        clip.addTrack(track);
        return clip;
    }

    createDynamicClipOpacity(): cc.AnimationClip {
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        // 3. 데이터 주입 (흰색 -> 빨간색 -> 흰색)
        const values = [
            255,
            0,
            255
        ];
        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.RealTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toComponent(cc.UIOpacity)
            .toProperty('opacity'); // 속성 이름
    
     
        let vec3KeyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            vec3KeyFrames.push([keyTimes[n], values[n]])
        }

        track.channel.curve.assignSorted(vec3KeyFrames.map((
            [time, v]) => [time, { value: v }]));

        clip.addTrack(track);
        return clip;
    }

    createDynamicClipStringProperty(): cc.AnimationClip {
        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        // 3. 데이터 주입 (흰색 -> 빨간색 -> 흰색)
        const values = [
            "안녕",
            "나",
            "너무 즐거워"
        ];
        clip.duration = 450 / fps;  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.ObjectTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy('Label-001')   // 구 HierarchyPath
            .toComponent(cc.Label)
            .toProperty('string'); // 속성 이름
    
        track.channel.curve.assignSorted(keyTimes, values);
        clip.addTrack(track);
        return clip;
    }

    createDynamicClipCustomComponetPreperty(): cc.AnimationClip {
        var childName = 'Label-001';
        let label001 = this.node.getChildByName('Label-001');
        let armatureBone = label001.getComponent(ArmatureBone);
        if(!armatureBone){
            armatureBone = label001.addComponent(ArmatureBone);
        }

        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        // 3. 데이터 주입 (흰색 -> 빨간색 -> 흰색)
        const values = [
            1,
            10,
            -1,
        ];
        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.RealTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy(childName)   // 구 HierarchyPath
            .toComponent('ArmatureBone')
            .toProperty('displayIndex'); // 속성 이름
    
     
        let vec3KeyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            vec3KeyFrames.push([keyTimes[n], values[n]])
        }

        track.channel.curve.assignSorted(vec3KeyFrames.map((
            [time, v]) => [time, { value: v, interpolationMode : cc.RealInterpolationMode.CONSTANT}]));

        clip.addTrack(track);
        return clip;
    }
    
    createDynamicClipCustomComponetPreperty2(): cc.AnimationClip {
        var childName = 'Label-001';
        let label001 = this.node.getChildByName('Label-001');
        let armatureBone = label001.getComponent(ArmatureBone);
        if(!armatureBone){
            armatureBone = label001.addComponent(ArmatureBone);
        }

        const clip = new cc.AnimationClip();
        // 2. 시간축(Keys) 설정 (초 단위: 0프레임, 10프레임, 30프레임)
        const fps = 60;
        const keyTimes = [0 / fps, 150 / fps, 300 / fps]; 
        // 3. 데이터 주입 (흰색 -> 빨간색 -> 흰색)
        const values = [
            new cc.Vec2(1,10),
            new cc.Vec2(10, -1),
            new cc.Vec2(-5, -1),
        ];
        clip.duration = keyTimes[keyTimes.length - 1];  // 전체 애니메이션 클립의 지속 시간

        // 3. 애니메이션 커브 설정
        const track = new cc.animation.VectorTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
        track.componentsCount = 2;
        track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
            .toHierarchy(childName)   // 구 HierarchyPath
            .toComponent('ArmatureBone')
            .toProperty('skew'); // 속성 이름
    
     
        let keyFrames  =[];
        for(let n = 0; n < keyTimes.length; n++){
            keyFrames.push([keyTimes[n], values[n]])
        }
    
        const channels = track.channels();
        channels[0].curve.assignSorted(keyFrames.map((
            [time, vec2]) => [time, { value: vec2.x, interpolationMode : cc.RealInterpolationMode.CONSTANT }])); 
        channels[1].curve.assignSorted(keyFrames.map((
            [time, vec2]) => [time, { value: vec2.y, interpolationMode : cc.RealInterpolationMode.CONSTANT }])); 
            
        clip.addTrack(track);
        return clip;
    }
}

// 트랙 클래스 명칭,   제어하는 데이터 타입,   주요 활용 사례
// RealTrack,          number (실수),      "투명도, 진행률, 단순 수치"
// VectorTrack,        "Vec2, Vec3",       "위치, 스크레일, 방향 벡터"
// ColorTrack,         Color (RGBA),       Sprite/Label 색상 변경
// QuatTrack,          Quat (Quaternion),  노드의 회전 (Rotation)
// ObjectTrack,        Object (Asset 등),  "SpriteFrame 교체, 소스 교체"
// SizeTrack,              Size,           "UI ContentSize (W, H)"
