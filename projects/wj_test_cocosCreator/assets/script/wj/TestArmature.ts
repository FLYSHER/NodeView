import { _decorator, Component, Node } from 'cc';
import { Armature, ArmatureBone ,ArmatureDisplay   } from './Includes';

const { ccclass, property } = _decorator;




@ccclass('TestArmature')
export class TestArmature extends Component {
    private armature : Armature = null;
    start() {

    }

    update(deltaTime: number) {
        
    }
}


