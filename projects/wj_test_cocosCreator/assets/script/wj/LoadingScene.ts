import { _decorator, Component, resources, JsonAsset, Sprite, log } from 'cc';
import { ResourceUtil } from './common/ResourceUtil';
import * as cc from 'cc';
import { NATIVE, PREVIEW } from 'cc/env'; // 환경 분기용

const { g_JSB, g_resNewUserSlotLoader_lite, g_resMobileLoginLoading, resMobileLoginLoading } = window as any;
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {

    @property({ type: Sprite, tooltip: "Test", visible : true })
    public _testSprite: Sprite = null; 

    private _initData : any = null;
    
    async start() {
        await this.loadLoaderResource(this._initData);
        await this.testSpriteLoad();
    }

    async initStart(data : any){
        this._initData = data;
        // await this.loadLoaderResource(this._initData);
        // await this.testSpriteLoad();
    }

    //로딩씬의 리소스 로드
    async loadLoaderResource(param) {
        return await new Promise<void>(function (resolve, reject) {

            cc.log(">>>>>>>>>>>>>>> NetConnector.loadLoaderResource");

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


