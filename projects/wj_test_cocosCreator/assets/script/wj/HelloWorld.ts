import { _decorator, Component, Node, director, Sprite } from 'cc';
const { ccclass, property } = _decorator;
import * as foo from 'foo';

@ccclass('HelloWorld')
export class HelloWorld extends Component {
    
    @property(Sprite)
    targetSprite: Sprite = null!; // 이미지를 바꿀 스프라이트

    start() {
        console.info('Hello world');
        // foo 안에 있는 util 함수 실행
        foo.util();
        foo.AssetUtils.loadAndSetFrame("PU_mBoxOrgelS19A05Atlas", "PU_mb18_Scene5_01", this.targetSprite, (isSuccess) => {
            if (isSuccess) {
                console.log("아이템 이미지 세팅 완료!");
            }
        });
    }

    update(deltaTime: number) {
        
    }
}


