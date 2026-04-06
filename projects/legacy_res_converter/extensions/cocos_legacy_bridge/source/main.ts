import {readJsonSync, copySync, existsSync, readFileSync, writeFileSync, ensureDir, ensureDirSync} from 'fs-extra';
import { join, dirname, basename } from 'path';
// @ts-ignore
import packageJSON from '../package.json';


const PROJECT_PATH = Editor.Project.path;
const TARGET_ROOT_PATH = join(PROJECT_PATH, 'assets', 'legacy');

const TARGET_IMAGE_PATH = join(TARGET_ROOT_PATH, 'images');
const TARGET_PREFAB_PATH = join(TARGET_ROOT_PATH, 'prefabs');
const TARGET_JSON_PATH = join(TARGET_ROOT_PATH, 'export_jsons');
const TARGET_ANIM_PATH = join(TARGET_ROOT_PATH, 'animations');

const TARGET_IMAGE_URL = 'db://assets/legacy/images';
const TARGET_PREFAB_URL = 'db://assets/legacy/prefabs';
const TARGET_JSON_URL = 'db://assets/legacy/export_jsons';
const TARGET_ANIM_URL = 'db://assets/legacy/animations';

// ----------------------------------------------------------------
// [공통 헬퍼 함수] JSON 데이터를 분석하여 의존성(plist, png)을 복사하고 DB를 갱신
// ----------------------------------------------------------------
//
async function copyDependencies(assetInfo: any, jsonData: any, legacyRootDir: string ) {

    // exportJson 에서 사용하는 spriteAtlas 파일명 배열
    // UI 파일이면 textures, Armature 파일이면 config_file_path 를 가져온다.
    const textures: string[] = jsonData.textures || jsonData.config_file_path || [];

    // exportJson 에서 사용하는 font 는 위젯을 하나씩 전수조사 해서 사용하는 font 배열 세팅
    const fontSet = new Set<string>();
    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
    collectBMFonts(rootWidget, fontSet);
    const fontPaths = Array.from(fontSet);

    jsonData.fonts = fontPaths; // 나중에 jsonData 에서 쓸수 있게 하자.

    if (textures.length === 0 && fontPaths.length === 0) {
        console.log("exportJson 에서 사용하는 아틀라스나 font 가 없음.");
        return;
    }

    // PU_extraSaleUI.ExportJson 를 asset 에 등록 후  assetInfo 예제
    // assetInfo
    //     name: 'PU_extraSaleUI.ExportJson',
    //     source: 'db://assets/PU_extraSaleUI.ExportJson',
    //     path: 'db://assets/PU_extraSaleUI',
    //     url: 'db://assets/PU_extraSaleUI.ExportJson',
    //     file: '/Users/myID/myCompany/cocos_res_converter/projects/legacy_res_converter/assets/PU_extraSaleUI.ExportJson',
    //     uuid: 'f2ae49f7-662b-4818-a947-xxxxxxxx6853cb',

    let needRefresh = false;

    ensureDirSync(TARGET_IMAGE_PATH); // target path 가 없으면 생성

    const originResSearchPath = [
        legacyRootDir,
        join(legacyRootDir,'binary')
    ];

    const findValidPath = (relPath: string): string | null => {
        for (const dir of originResSearchPath) {
            const fullPath = join(dir, relPath);
            if (existsSync(fullPath)) {
                return fullPath;
            }
        }
        return null;
    };

    for (const fileName of textures) {
        // 혹시 확장자가 명시 안 된 경우를 대비한 방어 코드
        const isPlist = fileName.toLowerCase().endsWith('.plist');
        const originName = isPlist ? fileName : `${fileName}.plist`;
        const originPngName = originName.replace('.plist', '.png');

        const validPlist = findValidPath(originName);
        const validPng = findValidPath(originPngName);

        const origin_plist_path = join(legacyRootDir, originName);
        const origin_png_path = origin_plist_path.replace('.plist', '.png');

        if (validPlist) {
            copySync(validPlist, join(TARGET_IMAGE_PATH, basename(validPlist)));
            needRefresh = true;
        }
        if (validPng) {
            copySync(validPng, join(TARGET_IMAGE_PATH, basename(validPng)));
            needRefresh = true;
        }
    }

    // font 리소스 복사
    for (const fontPath of fontPaths) {
        const originPngName = fontPath.replace('.fnt', '.png');
        const validFnt = findValidPath(fontPath);
        const validPng = findValidPath(originPngName);

        if (validFnt) {
            // size 가 음수로 나올 경우, 양수로 바꿔줘서 생성한다.(원본 수정 )
            const destFnt = join(TARGET_IMAGE_PATH, basename(validFnt));
            let fntContent = readFileSync(validFnt, 'utf-8');

            if (fntContent.includes('size=-')) {
                fntContent = fntContent.replace(/size=-(\d+)/g, 'size=$1'); // size 가 음수면 양수로 변경
            }

            writeFileSync(destFnt, fntContent, 'utf-8');
            needRefresh = true;
            console.log(`[Main] 폰트 파일 복사 완료: ${basename(validFnt)}`);
        } else {
            console.warn(`[Main] ⚠️ 원본 폰트 파일을 찾을 수 없음: ${fontPath}`);
        }

        if (validPng) {
            copySync(validPng, join(TARGET_IMAGE_PATH, basename(validPng)));
            needRefresh = true;
        }
    }

    // 파일 복사가 일어났다면 Asset DB 리프레시
    if (needRefresh) {
        console.log("[Main]에셋 DB 텍스처 리프레시 요청 중...");
        await Editor.Message.request('asset-db', 'refresh-asset', TARGET_IMAGE_URL);
        // 리프레시 후 안전하게 파일이 인식될 때까지 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("[Main]텍스처 동기화 완료!");
    }
}

// ----------------------------------------------------------------
// [내부 헬퍼 함수] 🦾 Armature (애니메이션) 전용 처리 로직
// ----------------------------------------------------------------
async function processArmature(assetInfo: any, jsonData: any, assetRootDir: string) {
    console.log("=> processArmature 로직 시작...");
    
    // 1. 공통 텍스처 의존성 복사
    await copyDependencies(assetInfo, jsonData, assetRootDir );

    ensureDirSync(TARGET_PREFAB_PATH);
    ensureDirSync(TARGET_ANIM_PATH);

    // 2. 프리팹 생성 명령 씬으로 전달    
    // const dest_url = assetInfo.url;
    // const prefab_url = `${dirname(dest_url)}/${basename(assetInfo.file).replace('.ExportJson', '.prefab')}`;
    const prefab_url = `${TARGET_PREFAB_URL}/${basename(assetInfo.file).replace('.ExportJson', '.prefab')}`;

    // scene.ts의 createArmaturePrefab 호출
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: 'cocos_legacy_bridge', // package.json에 등록된 extension 이름으로 맞춰주세요
        method: 'createArmaturePrefab',
        args: [{
            name: basename(assetInfo.file, '.ExportJson'),
            destUrl: prefab_url,
            jsonData: jsonData,
            imageDestUrl: TARGET_IMAGE_URL,
            animDestUrl: TARGET_ANIM_URL,
        }]
    });
}

// ----------------------------------------------------------------
// [내부 헬퍼 함수] 기존 cocos studio UI 전용 처리 로직
// ----------------------------------------------------------------
async function processUI(assetInfo: any, jsonData: any, assetRootDir: string) {
    // 1. 공통 텍스처 의존성 복사
    await copyDependencies(assetInfo, jsonData, assetRootDir);

    // 2. 프리팹 생성 명령 씬으로 전달
    ensureDirSync(TARGET_PREFAB_PATH);
    const prefab_url = `${TARGET_PREFAB_URL}/${basename(assetInfo.file).replace('.ExportJson', '.prefab')}`;
    
    // scene.ts의 createPrefabFromExportJson 호출
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: packageJSON.name, // 'cocos_legacy_bridge', // extension 이름. package.json의 name 과 맞아야 함.
        method: 'createCCStudioUIPrefab',
        args: [{
            name: basename(assetInfo.file, '.ExportJson'),
            destUrl: prefab_url,
            jsonData: jsonData,
            imageDestUrl: TARGET_IMAGE_URL,
            animDestUrl: TARGET_ANIM_URL,
        }]
    });
}

function collectBMFonts(node: any, fontSet: Set<string>){
    if (!node) return;
    
    // LabelBMFont 타입이고 폰트 경로 정보가 있는 경우
    if (node.classname === "LabelBMFont" && node.options?.fileNameData?.path) {
        fontSet.add(node.options.fileNameData.path);
    }

    if (node.children) {
        node.children.forEach((child: any) => collectBMFonts(child, fontSet));
    }
}

// 에셋 패널에 파일이 추가되었을 때 호출.
const onAssetAdd = ( uuid: string, info: any )=>{
    if (info.name.endsWith('.ExportJson')) {
        console.log("[Main][Event] ### asset-db:asset-add ###");
        console.log("   >>> uuid, name : ", uuid, info.name );
        
        methods.handleExportJson( uuid );
    }
}

export const methods: { [key: string]: (...any: any) => any } = {
    // Lagacy 에셋 루트 폴더 설정 
    openPanel() {
        console.log('[cocos_legacy_bridge] openPanelMethod 가 실행되었습니다.', packageJSON.name);
        Editor.Panel.open('cocos_legacy_bridge.bridge-panel');
        //  Editor.Panel.open(packageJSON.name);
    },

    // Legacy UI,AR 파일이 asset 패널에 drag-drop 된 후 호출.
    // asset 에 로드된 exportJson 파일이 로드 된 후 uuid 받음.
    // exportJson 파일 분석 후 scene 으로 넘김
    async handleExportJson( uuid: string ) {
        let legacyAssetRootDir = await Editor.Profile.getProject(packageJSON.name, 'legacyAssetRoot');

        const isPathInvalid = !legacyAssetRootDir || !existsSync(legacyAssetRootDir);

        if (isPathInvalid) {
            const reason = !legacyAssetRootDir ? "설정된 경로가 없습니다." : "설정된 경로가 올바르지 않습니다.";

            // @ts-ignore
            await Editor.Dialog.warn(`${reason}\n패널에서 Legacy Root 경로를 다시 설정해주세요!`, {
                buttons: ['설정 패널 열기'],
                default: 0,
                cancel: 0
            });

            // 패널을 열어 사용자가 수정하게 유도
            // @ts-ignore
            Editor.Panel.open('cocos_legacy_bridge.bridge-panel');

            // // @ts-ignore
            // Editor.Dialog.warn('패널에서 Legacy Root 경로를 먼저 설정해주세요!', {
            //     buttons: ['확인'], // 버튼 배열을 직접 지정하여 하나만 나오게 함
            //     default: 0,       // 엔터 키 입력 시 실행될 버튼 인덱스
            //     cancel: 0         // ESC 키 입력 시 실행될 버튼 인덱스
            // });
            // // @ts-ignore
            // Editor.Panel.open('cocos_legacy_bridge.bridge-panel'); // 패널 자동 열기
            return;
        }

        console.log('[Main] 사용 중인 원본 경로:', legacyAssetRootDir);

        // step 1. uuid 로 에셋디비에서 exportJson 에셋 정보 요청 
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', uuid ); 

        if (!assetInfo || !assetInfo.file.toLowerCase().endsWith('.exportjson')) {
            console.warn("해당 uuid 로 assetInfo 를 가져올 수 없음 : ", uuid );
            return;
        }

        try {
            const jsonData = readJsonSync( assetInfo.file ); 
            const isArmature = !!(jsonData.armature_data || jsonData.animation_data);

            if (isArmature) {
                console.log(`[Main] 🦾 Armature 파일 감지 : ${assetInfo.name}`);
                await processArmature(assetInfo, jsonData, legacyAssetRootDir); // 외부 함수 직접 호출
            } else {
                console.log(`[Main] 🖼️ UI 파일 감지 : ${assetInfo.name}`);
                await processUI(assetInfo, jsonData, legacyAssetRootDir); // 외부 함수 직접 호출
            }

            // 마지막으로 exportJson 파일을 옮긴다.
            ensureDirSync(TARGET_JSON_PATH);
            const export_json_src_url = assetInfo.url;
            const destUrl = `${TARGET_JSON_URL}/${basename(assetInfo.file)}`;

            // 만약 이미 올바른 폴더(export_jsons)에 떨군 게 아니라면 이동시킵니다.
            if (export_json_src_url !== destUrl) {
                console.log(`[Main] 🚚 작업 완료! 원본 ExportJson 파일을 아카이브로 이동: ${destUrl}`);
                // @ts-ignore
                await Editor.Message.request('asset-db', 'move-asset', export_json_src_url, destUrl);
            }
        }
        catch( err ) {
            console.error( "error : ", err );
        }
        
    },

    showLog() {
        console.log('Hello World');
    },

    async onCreateMenu( assetInfo?: any ) {
        console.log("click onCreateMenu ");
    }
};

export function load() {
    // 에셋패널에 파일 drag-drop 후 에셋에 등록이 잘 되면 호출
    // @ts-ignore

     // @ts-ignore
    Editor.Message.addBroadcastListener('asset-db:asset-add', onAssetAdd );

    console.log("extension Load! ver_5 ");
}

export function unload() {
    // @ts-ignore
    Editor.Message.removeBroadcastListener('asset-db:asset-add', onAssetAdd);
    
    console.log("extension Unload! ver_5 ");
}
