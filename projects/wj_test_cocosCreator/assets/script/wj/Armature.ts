import { _decorator, Component, Node, UITransform, Sprite, math, Size, Animation} from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

export enum MovementEventType{
    start = 0,
    complete = 1,
    loopComplete = 2
};

@ccclass('Armature')
export class Armature extends Component {

    private _animation: Animation | null = null;

    // 외부(게임 로직)에서 이벤트를 받아갈 콜백 함수들
    public movementEventCallback: ((targetNode: any, eventType: MovementEventType, movementId: string) => void) | null = null;
    public frameEventCallback: ((targetNode: any, eventId: string, originFrameIndex: number) => void) | null = null;

    @property(Node)
    public displayParent : Node = null;  

    onLoad() {
        this._animation = this.getComponent(Animation);

        // 🌟 MovementEvent (기본 내장 이벤트) 연결!
        if (this._animation) {
            this._animation.on(Animation.EventType.PLAY, this.onMovementStart, this);
            this._animation.on(Animation.EventType.FINISHED, this.onMovementComplete, this);
            this._animation.on(Animation.EventType.LASTFRAME, this.onMovementLoop, this);
        }

        this.movementEventCallback = (targetNode, eventType, movementId)=>{
            cc.log("movementEventCallback : ", targetNode.name, eventType, movementId);
        }
    }


    public addDisplayData(displayNode : Node){
        if(!this.displayParent){
            this.displayParent = new Node("[displayNode]");
            this.node.addChild(this.displayParent);
        }
        this.displayParent.addChild(displayNode);
    }

    public updateDisplayZOrder(){
        if(this.displayParent){
            const comp : any = this.displayParent.getComponent("ZOrderHelper") ||this.displayParent.addComponent("ZOrderHelper");
            comp.updateChildrenZOrder();
        }
    }

    // 🌟 파서가 심어놓은 FrameEvent가 실행될 함수! (함수명이 clip.events의 func와 같아야 합니다)
    public onFrameEvent(eventId: string) {
            cc.log("onFrameEvent : ", this.node.name,eventId);
        // 게임 로직으로 이벤트 문자열 전달!
        if (this.frameEventCallback) {
            this.frameEventCallback(this.node, eventId, -1);
        }
    }

    // --- Movement Event 내부 처리 ---
    private onMovementStart(type: string, state: cc.AnimationState) {
        if (this.movementEventCallback) {
            this.movementEventCallback(this.node, MovementEventType.start, state.name);
        }
    }

    private onMovementComplete(type: string, state: cc.AnimationState) {
        if (this.movementEventCallback) {
            this.movementEventCallback(this.node, MovementEventType.complete, state.name);
        }
    }

    private onMovementLoop(type: string, state: cc.AnimationState) {
        if (this.movementEventCallback) {
            this.movementEventCallback(this.node, MovementEventType.loopComplete, state.name);
        }
    }

    public updateContentSize(){
        const rootNode = this.node;            
        rootNode.updateWorldTransform();

        let minX = Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;
        let maxX = -Number.MAX_VALUE;
        let maxY = -Number.MAX_VALUE;

        const sprites = rootNode.getComponentsInChildren(Sprite);
        const rootUI = rootNode.getComponent(UITransform) || rootNode.addComponent(UITransform);
        if (sprites.length > 0){
            sprites.forEach(sprite => {
                const uiTrans = sprite.getComponent(UITransform);
                if (!uiTrans) return;

                const worldBox = uiTrans.getBoundingBoxToWorld();
                if (worldBox.xMin < minX) minX = worldBox.xMin;
                if (worldBox.yMin < minY) minY = worldBox.yMin;
                if (worldBox.xMax > maxX) maxX = worldBox.xMax;
                if (worldBox.yMax > maxY) maxY = worldBox.yMax;
            });

            const totalWidth : number = maxX - minX;
            const totalHeight : number = maxY - minY;

            console.log(`뼈대 전체 크기 Width: ${totalWidth}, Height: ${totalHeight}`);

            rootUI.setContentSize(new Size(totalWidth, totalHeight));
        }
        else {
            rootUI.setContentSize(Size.ZERO);
        }
    }

    protected lateUpdate(dt: number): void {
        this.node.updateWorldTransform    
    }
}


