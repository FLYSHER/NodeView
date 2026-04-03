import { _decorator, Component, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, executeInEditMode, requireComponent } = _decorator;

@ccclass('AnchorCompensation')
@executeInEditMode(true) // 🌟 에디터 화면에서도 실시간으로 동작하게 만듭니다.
@requireComponent(UITransform) // 🌟 이 컴포넌트는 무조건 UITransform과 짝꿍이어야 합니다.
export class AnchorCompensation extends Component {

    private _uiTransform: UITransform | null = null;
    private _lastAnchor: Vec2 = new Vec2();

    onLoad() {
        this._uiTransform = this.getComponent(UITransform);
        if (this._uiTransform) {
            // 최초 실행 시 현재 앵커 위치를 기억해 둡니다.
            this._lastAnchor.set(this._uiTransform.anchorPoint.x, this._uiTransform.anchorPoint.y);
            
            // 앵커가 변할 때마다 엔진이 발생시키는 이벤트를 듣습니다.
            this.node.on(Node.EventType.ANCHOR_CHANGED, this._onAnchorChanged, this);
        }
    }

    onDestroy() {
        // 컴포넌트가 파괴될 때 이벤트 리스너도 깔끔하게 지워줍니다. (메모리 누수 방지)
        this.node.off(Node.EventType.ANCHOR_CHANGED, this._onAnchorChanged, this);
    }

    private _onAnchorChanged() {
        if (!this._uiTransform) return;

        const currentAnchor = this._uiTransform.anchorPoint;
        const size = this._uiTransform.contentSize;

        // 1. 부모 앵커의 이동 오차(Delta) 계산
        const deltaX = (currentAnchor.x - this._lastAnchor.x) * size.width;
        const deltaY = (currentAnchor.y - this._lastAnchor.y) * size.height;

        // 2. 모든 자식 노드를 순회하며 위치 보정 (기존 위치 - 오차)
        const children = this.node.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const pos = child.position;
            
            // 자식의 원래 위치에서 부모가 이동한 만큼을 빼서 시각적 위치를 유지!
            child.setPosition(new Vec3(pos.x - deltaX, pos.y - deltaY, pos.z));
        }

        // 3. 현재 앵커를 다시 '마지막 앵커'로 갱신하여 다음 변화를 준비합니다.
        this._lastAnchor.set(currentAnchor.x, currentAnchor.y);
    }
}