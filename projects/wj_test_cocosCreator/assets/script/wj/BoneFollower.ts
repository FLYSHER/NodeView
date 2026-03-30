import { _decorator, Component, Node,Mat4, UISkew } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('BoneFollower')
@executeInEditMode
export class BoneFollower extends Component {
    @property({ type: Node })
    public targetBone: Node | null = null;

    // private _mySkewComp: UISkew | null = null;
    
    // // 부모들의 UISkew 컴포넌트들을 미리 저장해둘 배열! (핵심)
    // private _targetSkewChain: UISkew[] = [];
    private _matInv = new Mat4();
    private _matLocal = new Mat4();

    start() {
        // 내 노드의 Skew 컴포넌트 캐싱
        // this._mySkewComp = this.node.getComponent(UISkew);

        // if (this.targetBone) {
        //     // 💡 초기화 시점에 딱 한 번만 부모를 타고 올라가며 Skew 컴포넌트를 배열에 수집합니다.
        //     let currentNode = this.targetBone;
        //     while (currentNode) {
        //         const skewComp = currentNode.getComponent(UISkew);
        //         if (skewComp) {
        //             this._targetSkewChain.push(skewComp);
        //         }
        //         currentNode = currentNode.parent;
        //     }
        // }
    }

    lateUpdate(dt: number) {
        if (!this.targetBone || !this.targetBone.isValid) return;

        // 1. 타겟 뼈대의 오리지널 '월드 행렬' 가져오기 (마이너스 부호가 고스란히 살아있음!)
        const boneWorldMat = this.targetBone.worldMatrix;

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