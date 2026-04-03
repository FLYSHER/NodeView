import { _decorator, Component, resources, JsonAsset, Sprite, log } from 'cc';
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
        await this.testSpriteLoad();
    }

    //로딩씬의 리소스 로드
    async loadLoaderResource(param) {
        return await new Promise<void>(function (resolve, reject) {

            log(">>>>>>>>>>>>>>> NetConnector.loadLoaderResource");

            var resLoaderToLoad = null;
            var res = param.iamReadyResponse;
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
    
    async testSpriteLoad() {
        let self : any = this;
        return await new Promise<void>(function (resolve, reject) {
            RockN.Util.loadResource(resMobileLoginLoading.LoadingBackground,null,
                (err, item)=>{
                    if (!err && self._testSprite) {
                        self._testSprite.spriteFrame = item;
                    }
                    resolve();
                }
            );
        });

    }
}


