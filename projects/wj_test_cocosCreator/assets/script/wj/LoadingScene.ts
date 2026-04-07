import { _decorator, Component, resources, JsonAsset, instantiate,Prefab, Node, Sprite, UITransform,  log, Primitive } from 'cc';
import { SceneManager, ResourceUtil } from './Includes';
import { NATIVE, PREVIEW } from 'cc/env'; // 환경 분기용

const { g_JSB, g_resNewUserSlotLoader_lite, g_resMobileLoginLoading, resMobileLoginLoading } = window as any;
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {

    @property({ type: Sprite, tooltip: "Test", visible : true })
    public _testSprite: Sprite = null; 

    
    async start() {
        
        // // 'Stage1'이라는 이름의 번들을 찾아서 그 안의 리소스를 모두 날리고 번들도 제거!
        // let bundle = assetManager.getBundle('Stage1');
        // if (bundle) {
        //     bundle.releaseAll(); // 번들 안의 에셋 해제
        //     assetManager.removeBundle(bundle); // 번들 자체를 메모리에서 제거
        // }
        ResourceUtil.releaseAll(); //이단 리소스쪽 나중에 번들단위로...

        // 씬이 시작될 때 매니저에게 데이터를 달라고 요청합니다.
        const settingData = SceneManager.getInstance().getTransitionData();
        log("[CHECK] LoaingScene ", JSON.stringify(settingData))
        await this.loadLoaderResource(settingData);
        await this.testSpriteLoad2();
        //await this.testSpriteLoad();
        //await this.changeEmptyScene();
    }

    //로딩씬의 리소스 로드
    async loadLoaderResource(param) {
        return await new Promise<void>(function (resolve, reject) {

            log(">>>>>>>>>>>>>>> NetConnector.loadLoaderResource");

            var resLoaderToLoad = null;
            if(param){
                var res = param.iamReadyResponse;
            }
            // if (res) // && SceneManager.getInstance().isSceneForNewUser() )
            // {
            //     resLoaderToLoad = g_resNewUserSlotLoader_lite;
            // }
            // else{
            //     resLoaderToLoad = g_resMobileLoginLoading;
            // }
            resLoaderToLoad = g_resMobileLoginLoading;
            ResourceUtil.loadResource(resLoaderToLoad,
                function(finished: number, total: number){
                     
                },
                function(err: Error, items){
                    resolve();
                }
            );
        });
    };

    async testSpriteLoad2() {
        let self : any = this;
        await new Promise<void>(function (resolve, reject) {
            RockN.Util.loadResource(resMobileLoginLoading.LoadingBackground,null,
                (err, item)=>{
                    if (!err && self._testSprite) {
                        self._testSprite.spriteFrame = item;
                    }
                    resolve();
                }
            );
        });

        // 1. 먼저 ResourceUtil에서 '설계도(Prefab)'를 가져옵니다. (as Node 절대 금지!)
        // 유틸 함수를 <Prefab> 제네릭으로 잘 만들어두셨으니 타입 추론이 깔끔하게 됩니다.
        let prefab = ResourceUtil.get("PU_ProgressBarUI_mb", Prefab);
        // 방어 코드: 캐시에 프리팹이 잘 있는지 확인
        if (prefab) {
            // 2. 🌟 설계도를 바탕으로 진짜 '노드(Node)'를 찍어냅니다!
            // instantiate의 결과물은 무조건 Node 타입입니다.
            let node: Node = instantiate(prefab);
            
            // 3. 이제 완벽한 물리적 노드니까 parent에 당당하게 붙일 수 있습니다.
            node.parent = this.node;
        } else {
            console.error("프리팹 캐시가 없습니다! load를 먼저 했는지 확인하세요.");
        }
    };

    async testSpriteLoad() {
        let self : any = this;
        await new Promise<void>(function (resolve, reject) {
            RockN.Util.loadResource(resMobileLoginLoading.LoadingBackground,null,
                (err, item)=>{
                    if (!err && self._testSprite) {
                        self._testSprite.spriteFrame = item;
                    }
                    resolve();
                }
            );
        });

        let node :Node  = await ResourceUtil.getPrefab("PU_ProgressBarUI_mb");
        node.parent = this.node;
        return;
    };

    async changeEmptyScene(){
        await new Promise(resolve => setTimeout(resolve, 500));
        SceneManager.getInstance().changeToDynamicScene();
    }
}


