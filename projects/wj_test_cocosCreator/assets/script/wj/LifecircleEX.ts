import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LifecircleEX')
export class LifecircleEX extends Component {
// 1. 초기화 (최초 1회)
    onLoad() {
        console.log(`[${this.node.name}] 1. onLoad: 컴포넌트 초기화 완료. 노드 조작 가능!`);
        
        // 💡 아까 말씀하신 'addChild' 타이밍을 잡기 위한 노드 이벤트 등록
        this.node.on(Node.EventType.PARENT_CHANGED, this.onParentChanged, this);
    }

    // 2. 활성화 (노드가 켜질 때마다 반복 호출)
    onEnable() {
        console.log(`[${this.node.name}] 2. onEnable: 노드가 활성화되어 씬에 나설 준비 완료!`);
        // 물리 충돌체 켜기, 각종 전역 이벤트 구독 등을 여기서 합니다.
    }

    // 3. 시작 (첫 update가 돌기 직전 1회)
    start() {
        console.log(`[${this.node.name}] 3. start: 모든 컴포넌트의 onLoad가 끝난 후 본격적인 시작!`);
        // 다른 노드의 onLoad에서 세팅된 변수를 안전하게 가져올 때 씁니다.
    }

    // 4. 매 프레임 업데이트 (초당 60회)
    update(dt: number) {
        // console.log(`[${this.node.name}] 4. update: 핵심 게임 로직 실행 중... dt: ${dt}`);
        // (로그가 너무 많이 찍혀서 렉이 걸리니 평소엔 주석 처리해 둡니다 ㅎㅎ)
    }

    // 5. 후처리 업데이트 (모든 노드의 update가 끝난 직후)
    lateUpdate(dt: number) {
        // console.log(`[${this.node.name}] 5. lateUpdate: 다른 뼈대들의 위치 이동이 끝난 후, 스킨 동기화 중!`);
        // BoneFollower가 활약하는 바로 그 무대입니다.
    }

    // 6. 비활성화 (노드가 꺼질 때마다 반복 호출)
    onDisable() {
        console.log(`[${this.node.name}] 6. onDisable: 노드가 비활성화됨. 휴식 상태.`);
    }

    // 7. 파괴 (메모리에서 지워지기 직전 1회)
    onDestroy() {
        console.log(`[${this.node.name}] 7. onDestroy: 컴포넌트 파괴됨. 이벤트 해제 중...`);
        
        // 🚨 메모리 누수(좀비 노드) 방지: onLoad에서 등록한 이벤트는 여기서 반드시 해제해야 합니다!
        this.node.off(Node.EventType.PARENT_CHANGED, this.onParentChanged, this);
    }


    // ==========================================
    // 커스텀 이벤트 콜백 함수 (addChild 감지용) onLoad 에서 등록됨 NodeEventType 참고
    // ==========================================
    private onParentChanged() {
        if (this.node.parent) {
            console.log(`[${this.node.name}] 🌟 알림: 내 부모가 '${this.node.parent.name}'(으)로 변경(addChild) 되었습니다!`);
            // 여기서 부모의 스케일을 읽어와서 내 로컬 스케일을 역산하는 로직을 넣으면 완벽합니다!
        } else {
            console.log(`[${this.node.name}] 🌟 알림: 부모로부터 떨어져 나왔습니다(removeFromParent)!`);
        }
    }
}