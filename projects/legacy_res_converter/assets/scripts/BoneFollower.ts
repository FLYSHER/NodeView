import { _decorator, Component, Node, Vec3, Mat4 } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

// 매 프레임 객체 생성을 막기 위한 재사용 변수
const _mat4_temp = new Mat4();
const _mat4_inv = new Mat4();

@ccclass('BoneFollower')
@executeInEditMode(true)
export class BoneFollower extends Component {
    @property({ type: Node })
    public targetBone: Node | null = null;

    lateUpdate() {
        if (this.targetBone && this.targetBone.isValid && this.node.parent) {

            // 1. 타겟의 월드 매트릭스 획득
            const targetWorldMat = this.targetBone.worldMatrix;

            // 2. 내 부모(RenderRoot)의 월드 매트릭스의 역행렬 구하기
            const parentWorldMat = this.node.parent.worldMatrix;
            Mat4.invert(_mat4_inv, parentWorldMat);

            // 3. 내 로컬 매트릭스 계산 (Local = ParentInverse * TargetWorld)
            Mat4.multiply(_mat4_temp, _mat4_inv, targetWorldMat);

            const m = _mat4_temp;
            const m00 = m.m00, m01 = m.m01;
            const m04 = m.m04, m05 = m.m05;
            const tx  = m.m12, ty  = m.m13;

            // 4. 로컬 스케일 계산
            let scaleX = Math.sqrt(m00 * m00 + m01 * m01);
            let scaleY = Math.sqrt(m04 * m04 + m05 * m05);

            // 💡 외적(Cross Product)을 통한 진짜 부호 판별!
            // 2D 공간 행렬식이 음수면 X축이 거울처럼 뒤집힌 것(음수 스케일)입니다.
            const cross = m00 * m05 - m04 * m01;
            if (cross < 0) {
                scaleX = -scaleX; // 마이너스 부호 사수!
            }

            // 5. 로컬 회전 각도 계산
            let rotRad = 0;
            const absScaleX = Math.abs(scaleX);
            const absScaleY = Math.abs(scaleY);

            if (absScaleX > 0.0001) {
                rotRad = Math.atan2(m01 / scaleX, m00 / scaleX);
            } else if (absScaleY > 0.0001) {
                rotRad = Math.atan2(-m04 / scaleY, m05 / scaleY);
            }
            const rotDeg = rotRad * 180 / Math.PI;

            // 6. 🚨 엔진의 setWorld... API를 피해서 로컬 속성에 직접 꽂아 넣습니다!
            // 이렇게 하면 Cocos가 마이너스 스케일을 절대 건드리지 못합니다.
            this.node.setPosition(tx, ty, 0);
            this.node.setScale(new Vec3(scaleX, scaleY, 1));
            this.node.setRotationFromEuler(0, 0, rotDeg);
        }
    }
}