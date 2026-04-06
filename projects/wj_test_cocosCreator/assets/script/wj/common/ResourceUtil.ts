import { resources, assetManager, Asset, Prefab, SpriteAtlas, SpriteFrame, BitmapFont,  Node, instantiate } from 'cc';
const { ResPack } = window as any;

export var ResourceUtil = {

    cacheItems : {},
    // getCleanResourceName(path: string) {
    //         // 정규식을 사용해 마지막 '.' 이후의 문자열(확장자)을 날려버립니다.
    //         // 예: "ui/panel.prefab" -> "ui/panel"
    //         let cleanPath = path.replace(/\.[^/.]+$/, "");

    //         // [보너스 꿀팁] 아까 언급했던 이미지 처리 로직 자동화!
    //         // 이미지를 가져올때 spriteFrame타입(2d UI용)으로 가져오라는 의미
    //         if (path.endsWith('.jpg')) {
    //             cleanPath += '/spriteFrame';
    //         }

    //         return cleanPath;
    // },

    // getCleanResourceList(oldPaths: string[]): string[] {
 
    //     const cleanedPaths : string[] = oldPaths.map(this.getCleanResourceName.bind(this));

    //     // 2. 중복 제거 (Set에 넣었다가 다시 배열로 빼면 중복이 마법처럼 사라집니다)
    //     const uniquePaths = [...new Set(cleanedPaths)];

    //     return uniquePaths;
    // },

    // //preload
    // loadResource(resList, onProgress: ((result: any, count: number, loadedCount: number) => void), onComplete : ((err: Error, item : any ) => void)){

    //     let arrAssetsToLoad = [];
    //     let arrAssetsToIncRef = [];
    //     let isSingleItem = false;
    //     if (resList instanceof ResPack)        {
    //         arrAssetsToLoad = resList.arrayToLoad();      //로드할 리소스 (tfp, bfp포함)
    //         arrAssetsToIncRef = resList.arrayToLoadWithoutPackFile(); //레퍼런스카우트가 증가될 리소스  (tfp,bfp를 제외한 파일들만.. tfp, bfp 파일내에 포함된 어셋 파일은 tfp를 로드 할때 레퍼런스 카운트가 증가된다)
    //     }
    //     else if (Array.isArray(resList)){
    //         resList.forEach(function (e) {
    //             if (e instanceof ResPack)
    //             {
    //                 arrAssetsToLoad = arrAssetsToLoad.concat(e.arrayToLoad());      //로드할 리소스 (tfp, bfp포함)
    //                 arrAssetsToIncRef = arrAssetsToIncRef.concat(e.arrayToLoadWithoutPackFile()); //레퍼런스카우트가 증가될 리소스  (tfp,bfp를 제외한 파일들만.. tfp, bfp 파일내에 포함된 어셋 파일은 tfp를 로드 할때 레퍼런스 카운트가 증가된다)
    //             }
    //             else{
    //                 arrAssetsToLoad.push(e);
    //                 arrAssetsToIncRef.push(e);
    //             }
    //         });
    //     }
    //     else{
    //         isSingleItem = true;
    //         arrAssetsToLoad.push(resList);
    //         arrAssetsToIncRef.push(resList);
    //     }

    //     //확장자는 없애야 한다.
    //     let newArrAssetsToLoad : [] = this.getCleanResourceList(arrAssetsToLoad); //
    //     resources.load( //resources.preload(
    //         newArrAssetsToLoad, 
    //         // 1. 진행도 콜백 (로딩바용)
    //         (finished, total, item) => {
    //             let percent = Math.floor((finished / total) * 100);
    //             console.log(`전체 로딩 중... ${percent}%`);
    //             //this._loadItem(item);
    //             onProgress && onProgress(item, total, finished);
    //         }, 
    //         // 2. 완료 콜백
    //         (err, items) => {
    //             for (let i = 0; i < items.length; i++) {
    //                 this._loadItem(arrAssetsToLoad[i], items[i]);
    //             }
    //             if(isSingleItem){
    //                 onComplete && onComplete(err, items[0]);
    //             }
    //             else{
    //                 onComplete && onComplete(err, items);
    //             }
    //         }
    //     );
    // },

    _loadItem : function(path, loadResItem){
        if(loadResItem.isValid) {
            loadResItem.addRef();
            this.cacheItems[path] = loadResItem;
        }
    },

    async loadAssetsGroup<T extends Asset>(paths: string[], type: any, onProgress: (finished: number, total: number, item: any) => void): Promise<T[]> {
        return new Promise((resolve, reject) => {
            if (paths.length === 0) {
                resolve([]); // 부를 게 없으면 빈 배열 리턴
                return;
            }

            resources.load(
                paths, 
                type, 
                (finished, total, item) => {
                    onProgress(finished, total, item);
                },
                (err, items) => {
                    if (err) {
                        console.error(`${type.name} 로드 중 에러:`, err);
                        reject(err);
                        return;
                    }
                    for (let i = 0; i < items.length; i++) {
                        // items[i].addRef(); 
                        this._loadItem(paths[i], items[i]);
                    }
                    resolve(items as T[]);
                }
            );
        });
    },

    async loadResource( resList, onProgress?: (result: any, count: number, loadedCount: number) => void,  onComplete?: (err: Error | null, items: any) => void) {
        let arrAssetsToLoad = [];
        let arrAssetsToIncRef = [];
        let isSingleItem = false;
        if (resList instanceof ResPack)        {
            arrAssetsToLoad = resList.arrayToLoad();      //로드할 리소스 (tfp, bfp포함)
            arrAssetsToIncRef = resList.arrayToLoadWithoutPackFile(); //레퍼런스카우트가 증가될 리소스  (tfp,bfp를 제외한 파일들만.. tfp, bfp 파일내에 포함된 어셋 파일은 tfp를 로드 할때 레퍼런스 카운트가 증가된다)
        }
        else if (Array.isArray(resList)){
            resList.forEach(function (e) {
                if (e instanceof ResPack)
                {
                    arrAssetsToLoad = arrAssetsToLoad.concat(e.arrayToLoad());      //로드할 리소스 (tfp, bfp포함)
                    arrAssetsToIncRef = arrAssetsToIncRef.concat(e.arrayToLoadWithoutPackFile()); //레퍼런스카우트가 증가될 리소스  (tfp,bfp를 제외한 파일들만.. tfp, bfp 파일내에 포함된 어셋 파일은 tfp를 로드 할때 레퍼런스 카운트가 증가된다)
                }
                else{
                    arrAssetsToLoad.push(e);
                    arrAssetsToIncRef.push(e);
                }
            });
        }
        else{
            isSingleItem = true;
            arrAssetsToLoad.push(resList);
            arrAssetsToIncRef.push(resList);
        }

        if (arrAssetsToLoad.length === 0) {
            onComplete && onComplete(null, []);
            return;
        }
        
        const prefabs: string[] = [];
        const plists: string[] = [];
        const pngs: string[] = [];
        const fonts: string[] = [];

        // Set을 사용하면 나중에 중복 검사할 때 속도가 엄청 빠릅니다.
        const plistBasePaths = new Set<string>();
        for (let path of arrAssetsToLoad) {
            if (path.endsWith('.plist')) {
                plistBasePaths.add(path.replace('.plist', ''));
            }
        }

        // 2단계: 본격적인 분류 작업 시작
        for (let i = 0; i < arrAssetsToLoad.length; i++) {
            let path = arrAssetsToLoad[i];

            if (path.endsWith('.ExportJson')) {
                prefabs.push(path.replace('.ExportJson', ''));

            } else if (path.endsWith('.plist')) {
                plists.push(path.replace('.plist', ''));

            } else if (path.endsWith('.png')) {
                // 확장자를 뗀 기본 경로 추출
                let basePath = path.replace('.png', '');
                
                if (plistBasePaths.has(basePath)) {
                    console.log(`[중복 필터링] ${path} 는 plist 세트이므로 단독 로드에서 제외.`);
                } else {
                    pngs.push(basePath + '/spriteFrame');
                }

            } else if (path.endsWith('.fnt')) {
                fonts.push(path.replace('.fnt', ''));
            }
        }

        console.log(`[분류 완료] Prefab: ${prefabs.length}개, Atlas: ${plists.length}개, PNG(단독): ${pngs.length}개, Font: ${fonts.length}개`);

        // 🌟 [핵심] 4개 그룹의 전체 진행률을 합산하기 위한 상태 추적기
        let progressData = {
            finished: { prefabs: 0, plists: 0, pngs: 0, fonts: 0 },
            total: { 
                prefabs: prefabs.length, 
                plists: plists.length, 
                pngs: pngs.length, 
                fonts: fonts.length 
            }
        };

        // 개별 그룹에서 진행률이 업데이트될 때마다 전체 글로벌 수치를 재계산하는 헬퍼 함수
        const handleProgress = (groupKey: keyof typeof progressData.finished, finished: number, total: number, item: any) => {
            progressData.finished[groupKey] = finished;
            // 엔진이 의존성(의존하는 다른 파일) 때문에 total 값을 늘릴 수 있으므로 지속 갱신
            progressData.total[groupKey] = total; 

            // 4개 그룹의 수치를 하나로 합산
            let globalLoaded = progressData.finished.prefabs + progressData.finished.plists + progressData.finished.pngs + progressData.finished.fonts;
            let globalTotal = progressData.total.prefabs + progressData.total.plists + progressData.total.pngs + progressData.total.fonts;

            if (onProgress) {
                // 요청하신 규격: (result, count, loadedCount)
                onProgress(item, globalTotal, globalLoaded);
            }
        };

        // --- 3단계: 병렬 로드 및 진행률 병합 ---
        try {
            // Promise.all로 4개가 동시에 달리게 만들고, 결과물 배열들을 받아옵니다.
            const [loadedPrefabs, loadedPlists, loadedPngs, loadedFonts] = await Promise.all([
                this.loadAssetsGroup(prefabs, Prefab, (f, t, item) => handleProgress('prefabs', f, t, item)),
                this.loadAssetsGroup(plists, SpriteAtlas, (f, t, item) => handleProgress('plists', f, t, item)),
                this.loadAssetsGroup(pngs, SpriteFrame, (f, t, item) => handleProgress('pngs', f, t, item)),
                this.loadAssetsGroup(fonts, BitmapFont, (f, t, item) => handleProgress('fonts', f, t, item))
            ]);

            // 🌟 성공: 받아온 4개의 결과물 배열을 하나로 합칩니다.
            let allItems = [...loadedPrefabs, ...loadedPlists, ...loadedPngs, ...loadedFonts];

            if (onComplete) {
                onComplete(null, allItems);
            }

        } catch (error) {
            // 실패: 에러를 담아서 보냅니다.
            if (onComplete) {
                onComplete(error as Error, []);
            }
        }
    },

    releaseAll(){
        //assets/resources/에 있는것들중 로드된것들을 releaseAll 한다., 
        //resources 는  AssetsManager의 하나의 번들이다.
        //resources.releaseAll();
        for(let key in this.cacheItems){
            let item = this.cacheItems[key];
 
            // decRef를 부르기 전에, 이 에셋이 엔진에 의해 
            // 이미 파괴되지 않고 살아있는지(isValid) 확인
            if (item && item.isValid) {
                item.decRef();
            }
        }
        this.cacheItems = {};

        // for(let n = 0; n < this.cacheItems.length; n++){
        //     let item = this.cacheItems[n];
           
        // }
        // this.cacheItems.length = 0;

    },
    
    // releaseUnusedAssets(){
    //     assetManager.releaseUnusedAssets();
    // },
    // get<T extends Asset>(resString: string, type: any = null): T | null {
    //     resString = this.getCleanResourceName(resString);
    //     return resources.get<T>(resString, type);
    // }
    // new * 핵심입니다! 여기서의 new는 "객체를 만들어라!"가 아니라, "여기에 들어올 녀석은 new를 붙여서 생성할 수 있는 녀석(즉, 클래스나 생성자 함수)이어야만 해!" 라는 뜻입니다.
    // 만약 new가 없었다면 타입스크립트는 이걸 그냥 '일반 함수'라고 착각합니다.
    // (...args: any[]) * "그 클래스의 생성자(constructor)에 파라미터가 몇 개가 들어가든, 무슨 타입이 들어가든 난 신경 안 쓸게(any)!" 라는 뜻입니다.
    // => T * "그래서 그 클래스를 new로 찍어내면, 최종적으로 T 라는 타입의 객체가 튀어나올 거야!"
    get<T extends Asset>(resString: string, type: new (...args: any[]) => T): T | null {
        // resString = this.getCleanResourceName(resString);
        
        // 엔진 내부 함수에 전달할 때는 any로 우회하고, 최종 반환값만 T로 맞춰줍니다.
        let assetItem =  this.cacheItems[resString]; //resources.get(resString, type as any);

        return assetItem as T;
    },

    // async 함수 내부라고 가정
    async getPrefab(resString: string) {
        // get이 아니라 비동기로 직접 load를 시도합니다.
        return new Promise<Node>((resolve, reject) => {
            resString = this.getCleanResourceName(resString);
            resources.load(resString, Prefab, (err, loadedPrefab) => {
                if (err) {
                    console.error("프리팹 로드 실패! 경로를 확인하세요:", err);
                    reject(err);
                    return;
                }
                // 이제 완벽하게 로드되었으니 안심하고 복제합니다!
                let instanceNode : Node = instantiate(loadedPrefab);
                resolve(instanceNode);
            });
        });
    }
};

RockN.Util = RockN.Util || {};
RockN.Util.loadResource = ResourceUtil.loadResource.bind(ResourceUtil);
