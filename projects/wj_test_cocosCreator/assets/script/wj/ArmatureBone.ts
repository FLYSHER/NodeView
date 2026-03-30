import { _decorator,Node, Component, CCString, CCInteger, CCFloat, CCBoolean, Size, Vec2, Quat, Sprite, SpriteFrame, UITransform ,Color, Material} from 'cc';
import * as cc from 'cc'; // cc 모듈 전체를 가져옵니다.
import {Armature} from './Armature'
import {ArmatureDisplay} from './ArmatureDisplay'

// 🌟 환경 변수 모듈에서 EDITOR 상수를 가져옵니다.
import { EDITOR, PREVIEW, BUILD } from 'cc/env';
        //if (PREVIEW) // '플레이 버튼'을 눌러서 게임이 돌아가고 있을 때   
        //if (EDITOR) { //플레이 버튼은 안 누르고, 그냥 씬(Scene) 화면에서 노드를 만지작거리고 있을 때
        //if (BUILD) {  빌드(Build)를 뽑아서 실제 폰이나 PC에서 진짜 게임이 실행되고 있을 때
const { ccclass, property, executeInEditMode} = _decorator;


@ccclass('ArmatureBone')
@executeInEditMode
export class ArmatureBone extends Component {
    
    @property(Armature)
    public armature : Armature = null;

    //#region DisplayIndex
    //@property(Number)
    get displayIndex(): number {
        if(this.display)
            return this.display.displayIndex;
        return -1;
    }
    set displayIndex(value: number) {
        if(this.display)
            this.display.displayIndex = value;
    }
    //#endregion

    //#region Color
    get color(): Color {
        if(this.display)
            return this.display.color;
        return Color.WHITE;
    }
    set color(value: Color) {
        if(this.display)
            this.display.color = value;
    }
    //#endregion

    //#region opacity
    get opacity(): number {
        if(this.display)
            return this.display.opacity;
        return 0;
    }
    set opacity(value: number) {
        if(this.display)
            this.display.opacity = value;
    }
    //#endregion

    //#region BlendFunc
    get blendMode(): Vec2 {
        if(this.display)
            return this.display.blendMode;
        return new Vec2(1, 771);
    }

    set blendMode(value: Vec2) {
        if(this.display)
            this.display.blendMode = value;
    }
    //#endregion

    //#region Skew
    @property({ visible: false})
    private _localSkew : Vec2 = new Vec2(0,0);
    @property({ visible: false})
    private _parentSkew : Vec2 = new Vec2(0,0);

    @property({ type: Vec2, tooltip: "기울기(Skew) 값입니다." })
    get skew(): Vec2 {
       return this._localSkew;
    }
    set skew(value: Vec2) {
        // console.log("[CHECK] skew ", this._skew);
        // 값 변경과 동시에 원하는 추가 로직 실행
        this.updateSkew(value , this._parentSkew);
    }

    @property({type : Vec2})
    get parentSkew(): Vec2 {
       return this._parentSkew;
    }
    set parentSkew(value: Vec2) {
        this.updateSkew(this._localSkew , value);
    }
    //#endregion
    
    //#region ZOrder : 정보만 가지고 있고
    @property({ visible: false })
    private _zOrder: number = 0;
    // 타임라인 트랙이 이 속성(Property)을 찌르게 됩니다.
    @property ({tooltip: "zOrder값 정보만가지고있고 Display있다면 그쪽으로 정보를 보낸다."})
    get zOrder() { 
        return this._zOrder; 
    }

    set zOrder(val: number) {
        this._zOrder = val;
        if(this.display){
            this.display.zOrder = val;
        }
    }

    @property(ArmatureDisplay)
    public display : ArmatureDisplay = null;

    start() {
    }
    
    setArmature(armature :Armature){
        this.armature = armature;
    }

    getArmature(){
        return this.armature;
    }

    pushDisplayData(displayData : 
        { name : string, displayType : number, 
            x : number, y : number, cX : number, cY: number, kX : number, kY : number,
            width : number, height : number, pX : number, pY : number, spriteFrame : SpriteFrame }){
        
        if(!this.display){
            const displayNode = new Node(this.node.name + "_skin");
            displayNode.layer = this.node.layer; 
            const display = displayNode.addComponent(ArmatureDisplay);
            display.setTargetBoneNode(this.node);
            display.zOrder = this.zOrder;
            this.display = display;
            this.getArmature().addDisplayData(displayNode);
            //this.node.addChild(displayNode);
        }
        this.display.pushDisplayData(displayData);
    }
    
    addBlendMat(bd_src : number, bd_dst : number, mat : Material){
        if(this.display)
            this.display.addBlendMat(bd_src, bd_dst, mat);
    }
    
    getBlendMat(bd_src : number, bd_dst : number) : Material | null {
        if(this.display)
            return this.display.getBlendMat(bd_src, bd_dst);
        return null;
    }

    updateSkew(localSkew:Vec2, parentSkew : Vec2 | null = null){
        this._localSkew = localSkew;
        let worldSkew = this._localSkew;
        if(parentSkew){
            this._parentSkew = parentSkew;
            worldSkew = new Vec2((this._parentSkew.x + this._localSkew.x), (this._parentSkew.y + this._localSkew.y))
        }
        if(this.display){
            this.display.updateSkew(worldSkew);
        }

        if(this.node.children){
            for(let n =0 ; n < this.node.children.length; n++){
                let comp = this.node.children[n].getComponent(ArmatureBone);
                if(comp){
                    comp.parentSkew = worldSkew;
                }
            }
        }
  

        // const rotationZ = -skew.x; 
        // let quatValue = new Quat(); // 0도
        //   if (cc.UISkew){
        //     let skewComp = this.getComponent(cc.UISkew);
        //     if(!skewComp){
        //         skewComp = this.addComponent(cc.UISkew);
        //     }
        //     skewComp.setSkew(skew.x, skew.y);
        // }
        // else {
        //     // 방법 A (단순화): rotation = -kX (가장 많이 쓰임)
        //     // 방법 B (평균): rotation = -(kX + kY) / 2 (기울기가 심할 때 평균값 사용)
        //     // 2. 3.x 노드에 적용 (Z축 회전)
        //     //직접 매트릭스 수정 할수는 있지만 어짜픽 업데이트 마다 TRS구조로 바꾼다.
        //     //Custom Shader만들어서 Uniform으로 이 Skew 값을 쏴주거나, Vertex 정점 좌표로 직접 하는 방법도 있을듯
        //     Quat.fromEuler(quatValue, 0, 0, rotationZ);
        //     this.node.rotation = quatValue;
        // }

        // const rotationZ = -skew.x; 
        // let quatValue = new Quat(); // 0도
        // if(Math.abs(skew.x + skew.y) < Number.EPSILON ){ //만약 kx와 ky가 다르다면 회전이 아니고 찌그러짐 이다. 이땐 어떻게 해야 할지 논의 필요
        //    // 2. 엔진에 UISkew 컴포넌트가 존재하는지 검사합니다!
        //    if (cc.UISkew && this.getComponent(cc.UISkew)) {        // [Cocos Creator 3.8.6 이상] 공식 UISkew가 존재함!
        //        const skewComp = this.getComponent(cc.UISkew);
        //        this.node.setRotationFromEuler(cc.Vec3.ZERO);
        //        skewComp.setSkew(skew.x, skew.y);
        //    }
        //    else {
        //     //    Quat.fromEuler(quatValue, 0, 0, rotationZ);
        //     //    this.node.rotation = quatValue;
        //         this.node.setRotationFromEuler(new cc.Vec3(0, 0, rotationZ));
        //    }
        // }
        // else { //기울기
        //     if (cc.UISkew){
        //         let skewComp = this.getComponent(cc.UISkew);
        //         if(skewComp){
        //             skewComp = this.addComponent(cc.UISkew);
        //         }
        //        skewComp.setSkew(skew.x, skew.y);
        //     }
        //     else {
        //         // 방법 A (단순화): rotation = -kX (가장 많이 쓰임)
        //         // 방법 B (평균): rotation = -(kX + kY) / 2 (기울기가 심할 때 평균값 사용)
        //         // 2. 3.x 노드에 적용 (Z축 회전)
        //         //직접 매트릭스 수정 할수는 있지만 어짜픽 업데이트 마다 TRS구조로 바꾼다.
        //         //Custom Shader만들어서 Uniform으로 이 Skew 값을 쏴주거나, Vertex 정점 좌표로 직접 하는 방법도 있을듯
        //         Quat.fromEuler(quatValue, 0, 0, rotationZ);
        //         this.node.rotation = quatValue;
        //     }
        // }
    }


    calculateBoneTotalSize(): cc.math.Size {
        const rootNode = this.node;            
        rootNode.updateWorldTransform();

        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        const sprites = rootNode.getComponentsInChildren(Sprite);

        if (sprites.length === 0) return new cc.math.Size(0, 0);
        sprites.forEach(sprite => {
            const uiTrans = sprite.getComponent(UITransform);
            if (!uiTrans) return;

            const worldBox = uiTrans.getBoundingBoxToWorld();
            if (worldBox.xMin < minX) minX = worldBox.xMin;
            if (worldBox.yMin < minY) minY = worldBox.yMin;
            if (worldBox.xMax > maxX) maxX = worldBox.xMax;
            if (worldBox.yMax > maxY) maxY = worldBox.yMax;
        });

        const totalWidth = maxX - minX;
        const totalHeight = maxY - minY;

        console.log(`뼈대 전체 크기 Width: ${totalWidth}, Height: ${totalHeight}`);

        return new cc.math.Size(totalWidth, totalHeight);
    }
}


