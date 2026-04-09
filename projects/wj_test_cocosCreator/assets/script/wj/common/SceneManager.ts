import { director, log, assert, warn } from 'cc';
import * as cc from 'cc';
const { sceneList, SCENE_TYPE } = window as any;

export class SceneManager{
// 1. 싱글턴 인스턴스 보관용 변수
    private static _instance: SceneManager | null = null;
    
    // 2. 다음 씬으로 넘길 데이터를 임시 보관할 변수
    private _transitionData: any = null;

    // 3. 외부에서 인스턴스에 접근할 때 쓰는 Getter
    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }
        return this._instance;
    }

    // 싱글턴이므로 외부에서 new로 생성하지 못하게 막음
    private constructor() {}

    /**
     * @param sceneName 이동할 씬의 이름
     * @param data 다음 씬으로 넘겨줄 데이터 (생략 가능)
     */
    public changeScene(sceneName: string, data?: any, cb? : any) {
        console.log(`[SceneManager] '${sceneName}' 씬으로 이동 준비...`);
        
        // 받은 데이터가 있다면 매니저 배에 안전하게 저장!
        if (data !== undefined) {
            this._transitionData = data;
        } else {
            this._transitionData = null; // 초기화
        }

        // 실제 씬 이동 처리
        director.loadScene(sceneName, (err, scene) => {
            cb && cb(err, scene);
            if (err) {
                console.error(`[SceneManager] 씬 이동 실패! (${sceneName})`, err);
            } else {
                console.log(`[SceneManager] '${sceneName}' 씬으로 이동 완료!`);
            }
        });
    }

    /**
     * @returns 전달받은 데이터 (꺼내고 나면 자동으로 비워짐)
     */
    public getTransitionData(): any {
        const data = this._transitionData;
        this._transitionData = null; // 한 번 꺼내면 메모리 정리를 위해 비워줍니다.
        return data;
    }
    
    private _loadingSceneIndex = -1;
    private _prevSceneName;
    private _prevSceneGameId;
    private _currSceneName;
    private _currSceneIndex;
    private _currSceneGameId;
    private _popupInfo;

    public changeSceneByName(sceneName: string, cb?: any,  param? : any) {
        log("[meta][SceneManager] ", "*** changeSceneByName *** " );
        // find sceneInfo by sceneName
        let i,
            currIdx = -1;

        for( i = 0; i < sceneList.length; ++i  ) {
            if( sceneList[ i ].name === sceneName ) {
                 currIdx = i;
                 break;
            }
        }

        assert( currIdx !== -1, "[meta][SceneManager] Could'n find Scene info by sceneName : " + sceneName  );

        // 현재 슬롯 다시 진입 방지
        // 2021. 02. 19 Boolean 소셜 룸과 소셜 슬롯은 game_id 가 같아서 isRoom 객채 여부 체크를 더한다.
        if( RockN.GameScene
            && (typeof RockN.GameScene.getTypeOfScene === 'function')
            && SCENE_TYPE.SLOT === RockN.GameScene.getTypeOfScene()
            && RockN.GameScene.GAME_ID ===  sceneList[ currIdx ].game_id
            && sceneList[ i ].hasOwnProperty( 'isRoom' ) === false ) {
            warn("[meta][SceneManager] You try entry current slot ");
            return;
        }

        // 로딩 중인 씬과 같다면 종료
        if(this._loadingSceneIndex === currIdx    &&
            sceneList[ currIdx ].game_id !== -1   && // 'iosLogin'
            sceneList[ currIdx ].game_id !== 1    && // 'mobileLobby'
            sceneList[ currIdx ].game_id !== 1001 && // 'mobileVipLobby'
            sceneList[ currIdx ].game_id !== 501  && // 'classicVegasLobby'
            sceneList[ currIdx ].game_id !== 1501)   // 'classicVegasLobbyVip'
            return;

        this._prevSceneName     = this._currSceneName;
        this._prevSceneGameId   = this._currSceneGameId;
        this._currSceneIndex    = currIdx;
        this._currSceneGameId   = sceneList[ currIdx ].game_id;
        this._loadingSceneIndex = currIdx;

        var currentSceneInfo    = sceneList[ currIdx ];
        var loaderBase          = sceneList[ currIdx ].loaderBase || null;
        var manifestPath        = sceneList[ currIdx ].manifestPath || null;     // ex) 'cleopatra.manifest'
        this._popupInfo         = sceneList[ currIdx ].popupInfo;                // todo cleopatra , zeus 에서 이거 사용하는 거 접고 지워야 함.

        let _param = param? param : {}; 
        _param.loadingSceneInfo = sceneList[ currIdx ];
        _param.completeCallback = (err, scene) => {
                           //1. 새로운 노드 생성
                const newNode = new cc.Node('LobbyComponet');

                // 2. 특정 컴포넌트 추가 (미리 임포트한 클래스 이름 사용)
                //const myComponent = newNode.addComponent();
                // 3. 로드된 현재 씬의 최상위에 노드 추가
                // loadScene의 두 번째 인자인 'scene' 객체를 사용하거나, director.getScene()을 사용합니다.
                const sceneNode = scene || director.getScene();    
                const canvasNode = scene.getComponentInChildren(cc.Canvas).node;
                canvasNode.addChild(newNode);


                let textNode = new cc.Node("HelloText");
                textNode.addComponent(cc.UITransform);
                let labelComp = textNode.addComponent(cc.Label);
                labelComp.string = "[AAAA]";
                labelComp.color = cc.Color.WHITE;
                textNode.parent = canvasNode;            
        };

        this.changeScene('02_loadingScene', _param);
        
        /**
         * release global nodes
         */
        //this._releaseGlobalNodes();

        // if( true === cc.game.config[ cc.game[ 'CONFIG_KEY' ][ 'useLocalAssets' ] ] ) {
        //     manifestPath = null;
        // }

        // var changeScene = function () {
        //     log("[meta][SceneManager] ", "       > changeScene ");
        //     var self = this;
        //     if( loaderBase ) {                                                                              // iosLogin , lobby, lounge, cvLobby, cvLounge
        //         if( sceneName === 'iosLogin' ) {
        //             cc.log("[meta][SceneManager] ", "           > iosLogin " );
        //             this.getCurrentSceneReadyToExitBeforeNextScene();   //다음 씬 생성 전 현재 씬 종료준비
        //             var pScene = new iosLogin();
        //             cc.director.runScene( pScene );
        //             this._currSceneIndex = 0;
        //             this._currSceneName = 'iosLogin';
        //             pScene.setSceneName( this._currSceneName );

        //             RockN.IS_SHOWING_CHECK_NETWORK = false;
        //         } else {
        //             cc.log("[meta][SceneManager] ", "           > LobbyLoader " );  // LoginScene , Slot -> lobby
        //             RockN.Util.isCurrSceneInLobby() && RNCLobby.StatusHandler.setHasVisitedFlags();

        //             RockN.GameScene.fadeOut( 0.2, function () {
        //                 self.getCurrentSceneReadyToExitBeforeNextScene();   //다음 씬 생성 전 현재 씬 종료준비
        //                 var lobbyLoader = new LobbyLoader( sceneName );
        //                 lobbyLoader.initWithResourcesWithSceneInfo(currentSceneInfo, function() {
        //                     // RNCBanner.Controller.getSingleBannerModel().resetActiveSeqKey(); // 퍼즐같은 경우 getallevent 에서 데이터 받기 때문에 로비 진입 직전 리프레시 필요
        //                     this._swapScene( cb , true);
        //                 }, self );
        //                 cc.director.runScene( lobbyLoader );


        //                 ccs.armatureDataManager.clear();
        //                 cc.spriteFrameCache.removeUnusedSpriteFrames();
        //                 cc.textureCache.removeUnusedTextures();
        //             } );
        //         }
        //     }  else {
        //         if( this.isSceneForNewUser() ) {    // newUser Slot ( FD )
        //             cc.log("[meta][SceneManager] ", "           > NewUserSlotLoader " );

        //             currentSceneInfo.subManifest = ["entry.manifest"];
        //             this.setSceneForNewUser( false );

        //             self.getCurrentSceneReadyToExitBeforeNextScene();   //다음 씬 생성 전 현재 씬 종료준비
        //             var newUserLoader = new NewUserSlotLoader();
        //             newUserLoader.initWithResourcesWithSceneInfo( currentSceneInfo, function() {
        //                 this._swapScene( cb , true);
        //             }, self );
        //             cc.director.runScene( newUserLoader );
        //         } else {                                                // All Slot
        //             cc.log("[meta][SceneManager] ", "           > SlotLoaderWithLoadingImg" );
        //             RockN.Util.isCurrSceneInLobby() && RNCLobby.StatusHandler.setHasVisitedFlags();

        //             //@DY touch prevent while fadein 0.2sec
        //             this._blockLayer = new cc.Node();
        //             RockN.GameScene.addChild(this._blockLayer, 999999 ); /*RockN.GLOBAL_ORDER.COINTRAIL*/
        //             RockN.Util.EnabledTouchEvent(true, this._blockLayer);

        //             // cc.log(" [BJ][SceneManager] SlotLoader : ", JSON.stringify(currentSceneInfo, null, -2));
        //             RockN.GameScene.fadeOut( 0.2, function() {
        //                 self.getCurrentSceneReadyToExitBeforeNextScene();   //다음 씬 생성 전 현재 씬 종료준비
        //                 var pCustomLoader = new SlotLoaderWithLoadingImg();
        //                 pCustomLoader.initWithResourcesWithSceneInfo(currentSceneInfo, function() {
        //                     this._swapScene( cb , true);
        //                 }, self );
        //                 cc.director.runScene( pCustomLoader );

        //                 ccs.armatureDataManager.clear();
        //                 cc.spriteFrameCache.removeUnusedSpriteFrames();
        //                 cc.textureCache.removeUnusedTextures();
        //             });
        //         }
        //     }
        // }.bind(this);

        log("[meta][SceneManager] ", "       > prev scene    : ", this._prevSceneName, this._prevSceneGameId );
        log("[meta][SceneManager] ", "       > target scene  : ", sceneName, this._currSceneGameId );

        //씬전환시 필요 데이터 요청
        // this._requestDataOnSceneChange(function(){

        //     if (RockN.Screen.getOrientation() === RockN.ORIENTATION.PORTRAIT)
        //         cc.director.getRunningScene().setVisible(false);
        //     RockN.Screen.clearOrientationStack(function() {
        //         changeScene();
        //     });
        // });
	}

    public changeToDynamicScene() {
        // 1. 순수 코드로 빈 씬(Scene) 객체 생성
        let myNewScene = new cc.Scene("MyCodeScene");

        // 2. UI를 그리기 위한 필수 뼈대: Canvas 노드 생성
        let canvasNode = new cc.Node("Canvas");
        let canvasComp = canvasNode.addComponent(cc.Canvas);
        
        // 3. 화면을 비출 필수 뼈대: Camera 노드 생성
        let cameraNode = new cc.Node("Camera");
        let cameraComp = cameraNode.addComponent(cc.Camera);
        // UI를 찍을 카메라 설정 (2D 환경 세팅)
        cameraComp.projection = cc.Camera.ProjectionType.ORTHO; 
        cameraNode.parent = canvasNode; // 카메라는 캔버스 자식으로

        // 4. 테스트용 글자(Label) 노드 하나 만들어보기
        let textNode = new cc.Node("HelloText");
        textNode.addComponent(cc.UITransform);
        let labelComp = textNode.addComponent(cc.Label);
        labelComp.string = "코드로 만든 씬입니다!";
        labelComp.color = cc.Color.WHITE;
        textNode.parent = canvasNode;

        // 5. 조립한 Canvas를 씬에 부착
        myNewScene.addChild(canvasNode);

        // 🌟 6. 대망의 씬 전환! (기존 씬은 메모리에서 내려가고 새 씬이 올라옵니다)
        director.runScene(myNewScene);
        
        console.log("코드로 생성한 씬으로 전환 완료!");
    }
}


