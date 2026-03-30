import { _decorator, Component, Node, UITransform, Color, CCString, CCInteger, CCFloat, CCBoolean, Size, Vec2,Vec3, Quat, Sprite, SpriteFrame, Material, Mat4, UIOpacity, UISkew } from 'cc';

const { ccclass, property, executeInEditMode } = _decorator;

// 🌟 환경 변수 모듈에서 EDITOR 상수를 가져옵니다.
import { EDITOR, PREVIEW, BUILD } from 'cc/env';

// 1. 가장 안쪽 구조체: SkinData
@ccclass('SkinData') // 이름 필수!
export class SkinData {
    @property(CCFloat) 
    public x: number = 0.0;
    @property(CCFloat) 
    public y: number = 0.0;
    @property(CCFloat) 
    public cX: number = 1.0;
    @property(CCFloat) 
    public cY: number = 1.0;
    @property(CCFloat) 
    public kX: number = 0.0;
    @property(CCFloat) 
    public kY: number = 0.0;
    //TextureData width ,height,  pX, pY;(앵커)
    @property(CCFloat) 
    public width: number = 1.0;
    @property(CCFloat) 
    public height: number = 1.0;
    @property(CCFloat) 
    public pX: number = 0.0;
    @property(CCFloat) 
    public pY: number = 0.0;
    @property(SpriteFrame)
    public spriteFrame : SpriteFrame = null;
}

// 2. 중간 구조체: DisplayData
@ccclass('DisplayData') // 이름 필수!
export class DisplayData {
    @property(CCString) 
    public name: string = "";
    @property(CCInteger) 
    public displayType: number = 0;
    
    // SkinData의 '배열'이므로 괄호 안에 타입을 명시합니다.
    @property(SkinData) 
    public skin_data: SkinData = null;
}

@ccclass('ArmatureDisplay')
@executeInEditMode
export class ArmatureDisplay extends Component {

    //DisplayData
    @property([DisplayData])
    public display_data: DisplayData[] = [];

    //#region DisplayIndex
    //@property(Number)
    @property({ visible: false })
    private _displayIndex : number = -1;
    @property({ type: CCInteger, tooltip: "DisplayIndex" })
    get displayIndex(): number {
       return this._displayIndex;
    }
    set displayIndex(value: number) {
        // 값 변경과 동시에 원하는 추가 로직 실행
        this.updateDisplay(value);
    }
    //#endregion

    //#region Color
    @property({ visible: false})
    private _color : Color = new Color(255,255,255,255);

    @property({ type: Color, tooltip: "Color 값입니다." })
    get color(): Color {
       return this._color;
    }
    set color(value: Color) {
        this.updateColor(value);
    }
    //#endregion

    //#region opacity
    private _uiopacity : UIOpacity = null;
    get opacity(): number {
        if(this.sprite && this._uiopacity)
            return this._uiopacity.opacity;
        return 0;
    }
    set opacity(value: number) {
        if(this.sprite){
            if(!this._uiopacity)
                this._uiopacity = this.sprite.getComponent(UIOpacity) || this.sprite.addComponent(UIOpacity);
            this._uiopacity.opacity = value;
        }
    }

    //#endregion

    //#region BlendFuncByString
    @property({visible: false })
    private _blendMode: Vec2 = new Vec2(1, 771);

    @property({ tooltip: "x: bd_src, y: bd_dst" })
    get blendMode(): Vec2 {
        return this._blendMode;
    }

    set blendMode(value: Vec2) {
        this.updateBlendFunc(value.x, value.y);        
    }
    @property([Material])
    public blendMat : Material[] = [];
    //#endregion

    @property(Sprite)
    public sprite : Sprite = null;

    @property(Node)
    public targetBoneNode : Node = null;

    @property(Component)
    public zOrderHelper : Component | any = null;    

    @property(UISkew)
    public uiSkew :UISkew = null;

    get zOrder() { 
        if(this.zOrderHelper)
            return this.zOrderHelper.zOrder; 
        return 0;
    }

    set zOrder(val: number) {
        if(this.targetBoneNode){
            if(!this.zOrderHelper ){
                this.zOrderHelper = this.getComponent("ZOrderHelper")|| this.addComponent("ZOrderHelper");
            }
            this.zOrderHelper.zOrder = val;
        }
    }

    createDislpay(){
        if(!this.sprite && this.display_data.length > 0){
            const spriteNode = new Node(this.node.name + "_skin");
            this.node.addChild(spriteNode);
            spriteNode.layer = this.node.layer; 
            const spriteTrans = spriteNode.addComponent(UITransform);
            const sprite = spriteNode.addComponent(Sprite);
            this.sprite = sprite;

            this.uiSkew = this.sprite.getComponent(UISkew) || this.sprite.addComponent(UISkew);
            this._uiopacity = this.sprite.getComponent(UIOpacity) || this.sprite.addComponent(UIOpacity);
     
        }
        return this.sprite;
    }

    setTargetBoneNode(targetBoneNode : Node){
        this.targetBoneNode = targetBoneNode;
        this.getComponent(UITransform)|| this.addComponent(UITransform);
        this.zOrderHelper = this.getComponent("ZOrderHelper")|| this.addComponent("ZOrderHelper");
       
    }

    pushDisplayData(displayData : 
        { name : string, displayType : number, 
            x : number, y : number, cX : number, cY: number, kX : number, kY : number,
            width : number, height : number, pX : number, pY : number, spriteFrame : SpriteFrame }){

        let data :DisplayData = new DisplayData();
        data.name = displayData.name;
        data.displayType = displayData.displayType;
        let skinData = new SkinData();
        skinData.x = displayData.x;
        skinData.y = displayData.y;
        skinData.cX = displayData.cX;
        skinData.cY = displayData.cY;
        skinData.kX = displayData.kX;
        skinData.kY = displayData.kY;
        if(!isNaN(displayData.width)){
            skinData.width =displayData.width;
            skinData.height= displayData.height;
            skinData.pX = displayData.pX;
            skinData.pY = displayData.pY;
        }
        skinData.spriteFrame = displayData.spriteFrame;
        data.skin_data = skinData;
        this.display_data.push(data);        
        if(!this.sprite)
            this.createDislpay();
    }

    updateDisplay(index : number){
        if(!this.sprite)
            return;

        this._displayIndex = index;
        if(index > -1 && this.display_data.length > index){        
            const displayData = this.display_data[index];
            this.sprite.spriteFrame = displayData.skin_data.spriteFrame;
            let trans = this.sprite.node.getComponent(UITransform);
            // trans.contentSize = new Size(displayData.skin_data.width, displayData.skin_data.height);
            trans.anchorPoint = new Vec2(displayData.skin_data.pX, displayData.skin_data.pY);
            const offsetX = this.sprite.spriteFrame.offset.x; // -88
            const offsetY = this.sprite.spriteFrame.offset.y; // 37
            this.sprite.node.x = offsetX;
            this.sprite.node.y = offsetY;                
            this.sprite.node.active = true;
            this.node.active = true;
        }
        else {
            if(this.sprite){
                this.sprite.spriteFrame = null;
                this.sprite.node.active = false;
                this.node.active = false;
            }
        }
    }
    
    updateColor(value : Color){
        this._color = value;
        if(this.sprite){
            this.sprite.color = value;
        }
    }

    updateSkew(skew : Vec2){
        if(this.sprite){
            if(!this.uiSkew){
                this.uiSkew = this.sprite.getComponent(UISkew) || this.sprite.addComponent(UISkew);
            }
            this.uiSkew.setSkew(skew.x ,skew.y);
        }
    }

    addBlendMat(bd_src : number, bd_dst : number, mat : Material){
        if(!this.getBlendMat(bd_src, bd_dst)){
            this.blendMat.push(mat);
        }
    }
    
    getBlendMat(bd_src : number, bd_dst : number) : Material | null {
        const matName = `BlendMat_${bd_src}_${bd_dst}`;
        for(let n = 0; n < this.blendMat.length; n++){
            if(this.blendMat[n].name === matName)
                return this.blendMat[n];
        }
        return null;
    }

    /*
    cc.ZERO	                0x0000	0	ZERO
    cc.ONE	                0x0001	1	ONE
    cc.SRC_COLOR	        0x0300	768	SRC_COLOR
    cc.ONE_MINUS_SRC_COLOR	0x0301	769	ONE_MINUS_SRC_COLOR
    cc.SRC_ALPHA	        0x0302	770	SRC_ALPHA
    cc.ONE_MINUS_SRC_ALPHA	0x0303	771	ONE_MINUS_SRC_ALPHA
    cc.DST_ALPHA	        0x0304	772	DST_ALPHA
    cc.ONE_MINUS_DST_ALPHA	0x0305	773	ONE_MINUS_DST_ALPHA
    cc.DST_COLOR        	0x0306	774	DST_COLOR
    cc.ONE_MINUS_DST_COLOR	0x0307	775	ONE_MINUS_DST_COLOR
    cc.SRC_ALPHA_SATURATE	0x0308	776	SRC_ALPHA_SATURATE
    */
    updateBlendFunc(bd_src : number, bd_dst: number){
        bd_src = Math.round(bd_src);
        bd_dst = Math.round(bd_dst);
        this._blendMode.x = bd_src;
        this._blendMode.y = bd_dst;
        // x에는 bd_src, y에는 bd_dst 값이 들어옵니다!
        // 여기서 Material을 교체하거나 블렌딩 옵션을 변경하는 로직을 실행합니다.
        if (PREVIEW) {
            console.log(`블렌딩 변경됨 -> src: ${bd_src}, dst: ${bd_dst}`);
        }
        if(this.sprite){
            const bdMat = this.getBlendMat(bd_src, bd_dst);
            if(bdMat) this.sprite.customMaterial = bdMat;
        }

    }

    // 매 프레임 객체가 생성(new)되어 렉 걸리는 걸 막기 위한 전역 바구니
    private _matInv = new Mat4();
    private _matLocal = new Mat4();
    lateUpdate(dt: number) {
        if (!this.targetBoneNode || !this.targetBoneNode.isValid) return;

        // this.node.setWorldPosition(this.targetBoneNode.getWorldPosition());
        // this.node.setWorldRotation(this.targetBoneNode.getWorldRotation());
        // this.node.setWorldScale(this.targetBoneNode.getWorldScale());
        // let scale = new Vec2(1,1);
        // let curr = this.targetBoneNode;
        // while (curr && curr !== this.node.parent) {
        //     scale.x = scale.x * curr.scale.x;
        //     scale.y = scale.y * curr.scale.y;
        //     curr = curr.parent;
        // }

        // this.node.setScale(scale.x, scale.y, 1);

        // 1. 타겟 뼈대의 오리지널 '월드 행렬' 가져오기 (마이너스 부호가 고스란히 살아있음!)
        const boneWorldMat = this.targetBoneNode.worldMatrix;

        // 2. 내 부모의 월드 행렬을 역행렬(Inverse)로 변환
        const parentWorldMat = this.node.parent ? this.node.parent.worldMatrix : Mat4.IDENTITY;
        Mat4.invert(this._matInv, parentWorldMat);

        // 3. 내 스킨 노드가 실제로 가져야 할 '로컬 행렬' 계산 (Local = Parent_Inv * Target_World)
        Mat4.multiply(this._matLocal, this._matInv, boneWorldMat);

        const m = this._matLocal;

        // 🌟 4. 엔진의 3D 개입을 차단하고, 순수 2D 수학으로 직접 TRS 추출 🌟
        
        // [위치] 행렬의 12, 13번 데이터가 2D X, Y 좌표입니다.
        this.node.setPosition(m.m12, m.m13, 0);

        // [스케일] X축, Y축 벡터의 길이를 구합니다.
        let scaleX = Math.sqrt(m.m00 * m.m00 + m.m01 * m.m01);
        let scaleY = Math.sqrt(m.m04 * m.m04 + m.m05 * m.m05);
        
        // [부호 복원] 2D 행렬식(Determinant)이 음수면 '거울 반전' 상태라는 뜻입니다!
        const det = m.m00 * m.m05 - m.m01 * m.m04;
        if (det < 0) {
            scaleX = -scaleX; // 증발했던 X축 마이너스 부호를 강제로 살려냅니다.
        }
        
        this.node.setScale(scaleX, scaleY, 1);

        // [회전] 복원된 스케일 부호를 바탕으로 순수 2D 회전각도(Euler)를 구합니다.
        const rad = Math.atan2(m.m01, m.m00 * Math.sign(scaleX || 1));
        this.node.setRotationFromEuler(0, 0, rad * (180 / Math.PI));
    }
}


// export function util() {
//     console.log(" [Foo] util 함수가 정상적으로 실행되었습니다! ");
// }