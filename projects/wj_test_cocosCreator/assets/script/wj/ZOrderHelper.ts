import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ZOrderHelper')
export class ZOrderHelper extends Component {
    @property({ visible: false })
    private _zOrder: number = 0;
    // 타임라인 트랙이 이 속성(Property)을 찌르게 됩니다.
    @property
    get zOrder() { 
        return this._zOrder; 
    }

    set zOrder(val: number) {
        this._zOrder = val;
        // 값이 변할 때마다 부모 노드 내에서 자신의 배열 순서를 바꿉니다!
        // (값이 클수록 Hierarchy 맨 아래로 이동하여 화면 맨 앞으로 나옵니다)
        if (this.node.parent) {
            this.node.setSiblingIndex(val);
            let comp = this.node.parent.getComponent(ZOrderHelper)
            if(!comp){
                comp = this.node.parent.addComponent(ZOrderHelper);
            }
            comp.updateChildrenZOrder();
        }
    }
    
    // 이벤트 등록은 내 컴포넌트가 켜질 때(onLoad)
    onLoad() {
    }

    //모든 트리가 완성된 직후에 최초 정렬을 1회 실행
    start() {
        this.updateChildrenZOrder();
    }

    updateChildrenZOrder(){
        // let arrayA = [];
        // let arrayB = [];
        // for(let n = 0; n < this.node.children.length; n++){
        //     let comp = this.node.children[n].getComponent(ZOrderHelper);
        //     if(comp){
        //         arrayB.push(comp);
        //     }
        //     else{
        //         arrayA.push(this.node.children[n]);
        //     }
        // }

        // arrayA.sort((a,b) => {
        //     return a.getSiblingIndex() - b.getSiblingIndex();
        // });
        // arrayB.sort((a,b) =>{
        //     return a.zOrder - b.zOrder; 
        // })

        // let index = 0;
        // for(let n = 0; n < arrayA.length; n++){
        //     arrayA[n].setSiblingIndex(index);
        //     index++;
        // }
        // for(let n = 0; n < arrayB.length; n++){
        //     arrayB[n].node.setSiblingIndex(index);
        //     index++;
        // }
        // 1. slice() 문법으로 자식 배열 깔끔하게 복사
        const allChildren = Array.from(this.node.children);

        // 2. 전체 정렬
        allChildren.sort((a, b) => {
            let aComp = a.getComponent(ZOrderHelper);
            let bComp = b.getComponent(ZOrderHelper);

            if(aComp && bComp){
                if (aComp.zOrder === bComp.zOrder) {
                    return a.getSiblingIndex() - b.getSiblingIndex();
                }
                return aComp.zOrder - bComp.zOrder;
            }
            else if(!aComp && !bComp){
                return a.getSiblingIndex() - b.getSiblingIndex();
            }
            else if(aComp && !bComp){
                return 1;
            }
            else {
                return -1;
            }
        });

        // 3. 실제 순서 적용
        allChildren.forEach((child, index) => {
            child.setSiblingIndex(index);
        });

    }
}


