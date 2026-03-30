import { resources, Asset } from 'cc';
const { ResPack } = window as any;

export var ResourceUtil = {

    getCleanResourceName(path: string) {
            // 정규식을 사용해 마지막 '.' 이후의 문자열(확장자)을 날려버립니다.
            // 예: "ui/panel.prefab" -> "ui/panel"
            let cleanPath = path.replace(/\.[^/.]+$/, "");

            // 💡 [보너스 꿀팁] 아까 언급했던 이미지 처리 로직 자동화!
            // 이미지를 가져올때 spriteFrame타입(2d UI용)으로 가져오라는 의미
            if (path.endsWith('.jpg')) {
                cleanPath += '/spriteFrame';
            }

            return cleanPath;
    },

    getCleanResourceList(oldPaths: string[]): string[] {
 
        const cleanedPaths : string[] = oldPaths.map(this.getCleanResourceName.bind(this));

        // 2. 중복 제거 (Set에 넣었다가 다시 배열로 빼면 중복이 마법처럼 사라집니다)
        const uniquePaths = [...new Set(cleanedPaths)];

        return uniquePaths;
    },

    //preload
    loadResource(resList, onProgress: ((result: any, count: number, loadedCount: number) => void), onComplete : ((err: Error, item : any ) => void)){

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

        //확장자는 없애야 한다.
        arrAssetsToLoad = this.getCleanResourceList(arrAssetsToLoad);
        resources.load( //resources.preload(
            arrAssetsToLoad, 
            // 1. 진행도 콜백 (로딩바용)
            (finished, total, item) => {
                let percent = Math.floor((finished / total) * 100);
                console.log(`전체 로딩 중... ${percent}%`);
                onProgress && onProgress(item, total, finished);
            }, 
            // 2. 완료 콜백
            (err, items) => {
                if(isSingleItem){
                    onComplete && onComplete(err, items[0]);
                }
                else{
                    onComplete && onComplete(err, items);
                }
            }
        );
    },

    get: function (resString: string, type: any = null) {
       resString = this.getCleanResourceName(resString);
       return  resources.get(resString, type);
    }

};

RockN.Util = RockN.Util || {};
RockN.Util.loadResource = ResourceUtil.loadResource.bind(ResourceUtil);
