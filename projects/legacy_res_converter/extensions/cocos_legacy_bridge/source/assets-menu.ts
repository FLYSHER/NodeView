import { join, extname } from 'path';
// import * as path from 'path'; // 전체를 가져와서 path.join() 식으로 써도 됩니다.

/** [ assetInfo ] 
    displayName: '',
    extends: [],
    importer: '*',
    isDirectory: false,
    instantiation: undefined,
    imported: true,
    invalid: false,
    name: 'PU_PopCubeRstoneUI.ExportJson',
    file: '/Users/cswq327/cocos_project/test_project_01/assets/legacy_json/PU_PopCubeRstoneUI.ExportJson',
    redirect: undefined,
    readonly: false,
    type: 'cc.Asset',
    url: 'db://assets/legacy_json/PU_PopCubeRstoneUI.ExportJson',
    uuid: '75c9eeca-f144-4bd8-ac84-a450e3ee4a55'
*/

export function onCreateMenu(assetInfo: any) {
    return [
        {
            label: "import-legacy-to-prefab",
            click() {
                if (!assetInfo) {
                    console.log('헤더 메뉴에서 생성 명령을 받았습니다.');
                } else {
                    console.log('디렉토리 자산 상세 정보:', assetInfo);
                }
            },
        },
    ];
}

// 나머지 메뉴 함수들도 필요하다면 정의
export function onAssetMenu(assetInfo: any) { 
    // 1. 방어 코드: assetInfo가 제대로 넘어오는지 확인
    if (!assetInfo || !assetInfo.file) {
        return [];
    }

    // 2. name 속성이나 file 경로에서 확장자 추출
    const ext = extname(assetInfo.name || assetInfo.file).toLowerCase();

    // 3. .ExportJson 파일인 경우에만 메뉴 노출
    if (ext === '.exportjson') {
        return [
            {
                label: "Legacy -> Prefab 변환",
                click() {
                    // 메인 프로세스(main.ts)로 assetInfo 전달
                    // main.ts에서도 이제 assetInfo.file을 통해 경로를 읽게 됩니다.
                    console.log("[MAIN] file onclick");
                    Editor.Message.send('asset-test', 'execute-import', assetInfo);
                }
            }
        ];
    }

    return [];

    // // ExportJson 일때만 메뉴 호출
    // if( assetInfo && assetInfo.path.endsWith('.ExportJson') ) {
    //       console.log( assetInfo );
    
        
    //     return [
    //         {
    //             label: "[custom] legacy to prefab",
    //             click() {
    //                 // 메인 프로세스에 정의된 'execute-import' 메시지 호출
    //                 console.log("onclick OnAssetMenu");
    //                 Editor.Message.send('asset-test', 'execute-import', assetInfo);
    //             },
    //         },
    //     ];
    // }
    // return [];

    // return [
    //     {
    //         // label : "test-asset-menu",
    //         // click() {
    //         //     console.log("클릭 test-asset-menu ");
    //         // }
    //         label: "legacy to prefab",
    //         click() {
    //             // 메인 프로세스에 정의된 'execute-import' 메시지 호출
    //             console.log("onclick OnAssetMenu");
    //             Editor.Message.send('asset-test', 'execute-import', assetInfo);
    //         },
    //     }
        
    // ]; 
}
export function onDBMenu(assetInfo: any) { 
    return [
        {
            label : "test-db-menu",
            click() {
                console.log("클릭 test-db-menu ");
            }
        }
    ]; 
}
export function onPanelMenu(assetInfo: any) { 
    return [
         {
            label : "test-panel-menu",
            click() {
                console.log("클릭 test-panel-menu ");
            }
        }
    ]; 
}