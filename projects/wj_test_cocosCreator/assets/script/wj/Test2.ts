import { _decorator, AnimationClip, Component, Node, js } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('Test2')
export class Test2 extends Component {
    @property(AnimationClip)
    animClip: AnimationClip = null!; // 
    
    onLoad(){
        console.log("[CHECK] Test2 ");
    }

    start() {
        // let test = this.animClip.serialize();
        // console.log("[CHECK]1 : ", test);
        // let test2 = this.animClip.toString();
        // console.log("[CHECK]2 : ", test2);
        // let test3 = JSON.stringify( this.animClip);
        // console.log("[CHECK]3 : ", test3);
        // let test4 = (js as any).serialize(AnimationClip);
        // console.log("[CHECK]3 : ", test4);

        let aaa = [3,24,4,7,5,9,8,6,5,4];
        aaa.sort((a,b)=>{
            return a - b;
        })
        aaa.forEach((child, index) => {
            console.log("[CHECK] forEach ",child ," : ", index);
        });
        console.log("[CHECK] aaa ", aaa);
    }

    update(deltaTime: number) {
        
    }
}


