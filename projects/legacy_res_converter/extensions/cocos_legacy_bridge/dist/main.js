"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methods = void 0;
exports.load = load;
exports.unload = unload;
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
// @ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
// ----------------------------------------------------------------
// [공통 헬퍼 함수] JSON 데이터를 분석하여 의존성(plist, png)을 복사하고 DB를 갱신
// ----------------------------------------------------------------
async function copyDependencies(assetInfo, jsonData, legacyRootDir) {
    // UI 파일이면 textures, Armature 파일이면 config_file_path를 가져온다.
    // 둘 다 없으면 빈 배열([])을 반환합니다.
    const textures = jsonData.textures || jsonData.config_file_path || [];
    // font set 복사
    const fontSet = new Set();
    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
    collectBMFonts(rootWidget, fontSet);
    const fontPaths = Array.from(fontSet);
    jsonData.fonts = fontPaths; // 나중에 jsonData 에서 쓸수 있게 하자.
    if (textures.length === 0 && fontPaths.length === 0) {
        console.log("복사할 리소스가 없음");
        return;
    }
    const dest_dir_url = (0, path_1.dirname)(assetInfo.url); // 에셋 DB 경로 (예: db://assets/...)
    const dest_dir_path = (0, path_1.dirname)(assetInfo.file); // 실제 파일 시스템 경로 (복사용) 
    let needRefresh = false;
    const originResSearchPath = [
        legacyRootDir,
        (0, path_1.join)(legacyRootDir, 'binary')
    ];
    const findValidPath = (relPath) => {
        for (const dir of originResSearchPath) {
            const fullPath = (0, path_1.join)(dir, relPath);
            if ((0, fs_extra_1.existsSync)(fullPath)) {
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
        const origin_plist_path = (0, path_1.join)(legacyRootDir, originName);
        const origin_png_path = origin_plist_path.replace('.plist', '.png');
        if (validPlist) {
            (0, fs_extra_1.copySync)(validPlist, (0, path_1.join)(dest_dir_path, (0, path_1.basename)(validPlist)));
            needRefresh = true;
        }
        if (validPng) {
            (0, fs_extra_1.copySync)(validPng, (0, path_1.join)(dest_dir_path, (0, path_1.basename)(validPng)));
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
            const destFnt = (0, path_1.join)(dest_dir_path, (0, path_1.basename)(validFnt));
            let fntContent = (0, fs_extra_1.readFileSync)(validFnt, 'utf-8');
            if (fntContent.includes('size=-')) {
                fntContent = fntContent.replace(/size=-(\d+)/g, 'size=$1'); // size 가 음수면 양수로 변경
            }
            (0, fs_extra_1.writeFileSync)(destFnt, fntContent, 'utf-8');
            needRefresh = true;
            console.log(`[Main] 폰트 파일 복사 완료: ${(0, path_1.basename)(validFnt)}`);
        }
        else {
            console.warn(`[Main] ⚠️ 원본 폰트 파일을 찾을 수 없음: ${fontPath}`);
        }
        if (validPng) {
            (0, fs_extra_1.copySync)(validPng, (0, path_1.join)(dest_dir_path, (0, path_1.basename)(validPng)));
            needRefresh = true;
        }
    }
    // 파일 복사가 일어났다면 Asset DB 리프레시
    if (needRefresh) {
        console.log("[Main]에셋 DB 텍스처 리프레시 요청 중...");
        await Editor.Message.request('asset-db', 'refresh-asset', dest_dir_url);
        // 리프레시 후 안전하게 파일이 인식될 때까지 잠시 대기
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("[Main]텍스처 동기화 완료!");
    }
}
// ----------------------------------------------------------------
// [내부 헬퍼 함수] 🦾 Armature (애니메이션) 전용 처리 로직
// ----------------------------------------------------------------
async function processArmature(assetInfo, jsonData, assetRootDir) {
    console.log("=> processArmature 로직 시작...");
    // 1. 공통 텍스처 의존성 복사
    await copyDependencies(assetInfo, jsonData, assetRootDir);
    // 2. 프리팹 생성 명령 씬으로 전달    
    const dest_url = assetInfo.url;
    const prefab_url = `${(0, path_1.dirname)(dest_url)}/${(0, path_1.basename)(assetInfo.file).replace('.ExportJson', '.prefab')}`;
    // scene.ts의 createArmaturePrefab 호출
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: 'cocos_legacy_bridge', // package.json에 등록된 extension 이름으로 맞춰주세요
        method: 'createArmaturePrefab',
        args: [{
                name: (0, path_1.basename)(assetInfo.file, '.ExportJson'),
                destUrl: prefab_url,
                jsonData: jsonData
            }]
    });
}
// ----------------------------------------------------------------
// [내부 헬퍼 함수] 기존 cocos studio UI 전용 처리 로직
// ----------------------------------------------------------------
async function processUI(assetInfo, jsonData, assetRootDir) {
    console.log("[Main] => processUI 로직 시작...");
    // 1. 공통 텍스처 의존성 복사
    await copyDependencies(assetInfo, jsonData, assetRootDir);
    // 2. 프리팹 생성 명령 씬으로 전달
    // assets-db 리프레시 ( dependancy 파일 찾고 asset 패널에서 사용할 수 있도록 ) 
    const dest_url = assetInfo.url; // 'db://assets/a.ExportJson',
    const prefab_url = `${(0, path_1.dirname)(dest_url)}/${(0, path_1.basename)(assetInfo.file).replace('.ExportJson', '.prefab')}`;
    // scene.ts의 createPrefabFromExportJson 호출
    await Editor.Message.request('scene', 'execute-scene-script', {
        name: 'cocos_legacy_bridge', // extension 이름. package.json의 name 과 맞아야 함.
        method: 'createCCStudioUIPrefab',
        args: [{
                name: (0, path_1.basename)(assetInfo.file, '.ExportJson'),
                destUrl: prefab_url,
                jsonData: jsonData
            }]
    });
}
function collectBMFonts(node, fontSet) {
    var _a, _b;
    if (!node)
        return;
    // LabelBMFont 타입이고 폰트 경로 정보가 있는 경우
    if (node.classname === "LabelBMFont" && ((_b = (_a = node.options) === null || _a === void 0 ? void 0 : _a.fileNameData) === null || _b === void 0 ? void 0 : _b.path)) {
        fontSet.add(node.options.fileNameData.path);
    }
    if (node.children) {
        node.children.forEach((child) => collectBMFonts(child, fontSet));
    }
}
// 에셋 패널에 파일이 추가되었을 때 호출.
const onAssetAdd = (uuid, info) => {
    if (info.name.endsWith('.ExportJson')) {
        console.log("[Main][Event] ### asset-db:asset-add ###");
        console.log("   >>> uuid, name : ", uuid, info.name);
        exports.methods.handleExportJson(uuid);
    }
};
exports.methods = {
    // Lagacy 에셋 루트 폴더 설정 
    openPanel() {
        console.log('[cocos_legacy_bridge] openPanelMethod 가 실행되었습니다.', package_json_1.default.name);
        Editor.Panel.open('cocos_legacy_bridge.bridge-panel');
        //  Editor.Panel.open(packageJSON.name);
    },
    // Legacy UI파일이 asset 패널에 drag-drop 된 후 호출
    // exportJson 파일 분석 후 scene 으로 넘김
    async handleExportJson(uuid) {
        let legacyAssetRootDir = await Editor.Profile.getProject('cocos_legacy_bridge', 'legacyAssetRoot');
        const isPathInvalid = !legacyAssetRootDir || !(0, fs_extra_1.existsSync)(legacyAssetRootDir);
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
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', uuid);
        if (!assetInfo || !assetInfo.file.toLowerCase().endsWith('.exportjson')) {
            console.warn("해당 uuid 로 assetInfo 를 가져올 수 없음 : ", uuid);
            return;
        }
        try {
            const jsonData = (0, fs_extra_1.readJsonSync)(assetInfo.file);
            const isArmature = !!(jsonData.armature_data || jsonData.animation_data);
            if (isArmature) {
                console.log(`[Main] 🦾 Armature 파일 감지 : ${assetInfo.name}`);
                await processArmature(assetInfo, jsonData, legacyAssetRootDir); // 외부 함수 직접 호출
            }
            else {
                console.log(`[Main] 🖼️ UI 파일 감지 : ${assetInfo.name}`);
                await processUI(assetInfo, jsonData, legacyAssetRootDir); // 외부 함수 직접 호출
            }
        }
        catch (err) {
            console.error("error : ", err);
        }
    },
    showLog() {
        console.log('Hello World');
    },
    async onCreateMenu(assetInfo) {
        console.log("click onCreateMenu ");
    }
};
function load() {
    // 에셋패널에 파일 drag-drop 후 에셋에 등록이 잘 되면 호출
    // @ts-ignore
    // @ts-ignore
    Editor.Message.addBroadcastListener('asset-db:asset-add', onAssetAdd);
    console.log("extension Load! ver_5 ");
}
function unload() {
    // @ts-ignore
    Editor.Message.removeBroadcastListener('asset-db:asset-add', onAssetAdd);
    console.log("extension Unload! ver_5 ");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQWtRQSxvQkFRQztBQUVELHdCQUtDO0FBalJELHVDQUEyRjtBQUMzRiwrQkFBK0M7QUFDL0MsYUFBYTtBQUNiLG1FQUEwQztBQUUxQyxtRUFBbUU7QUFDbkUseURBQXlEO0FBQ3pELG1FQUFtRTtBQUNuRSxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsU0FBYyxFQUFFLFFBQWEsRUFBRSxhQUFxQjtJQUVoRiwwREFBMEQ7SUFDMUQsMkJBQTJCO0lBQzNCLE1BQU0sUUFBUSxHQUFhLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUVoRixjQUFjO0lBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQVUsQ0FBQztJQUNsQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO0lBQ3hFLGNBQWMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0QyxRQUFRLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxDQUFDLDRCQUE0QjtJQUV4RCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQixPQUFPO0lBQ1gsQ0FBQztJQUVELE1BQU0sWUFBWSxHQUFHLElBQUEsY0FBTyxFQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFJLGdDQUFnQztJQUNoRixNQUFNLGFBQWEsR0FBRyxJQUFBLGNBQU8sRUFBQyxTQUFTLENBQUMsSUFBSSxD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QUNMLENBQUM7UUFDRCxPQUFPLEdBQUcsRUFBRyxDQUFDO1lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBRSxVQUFVLEVBQUUsR0FBRyxDQUFFLENBQUM7UUFDckMsQ0FBQztJQUVMLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLFlBQVksQ0FBRSxTQUFlO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUN2QyxDQUFDO0NBQ0osQ0FBQztBQUVGLFNBQWdCLElBQUk7SUFDaEIsdUNBQXVDO0lBQ3ZDLGFBQWE7SUFFWixhQUFhO0lBQ2QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxvQkFBb0IsRUFBRSxVQUFVLENBQUUsQ0FBQztJQUV2RSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELFNBQWdCLE1BQU07SUFDbEIsYUFBYTtJQUNiLE1BQU0sQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsb0JBQW9CLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFFekUsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQzVDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWFkSnNvblN5bmMsIGNvcHlTeW5jLCBleGlzdHNTeW5jLCByZWFkRmlsZVN5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgeyBqb2luLCBkaXJuYW1lLCBiYXNlbmFtZSB9IGZyb20gJ3BhdGgnO1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0IHBhY2thZ2VKU09OIGZyb20gJy4uL3BhY2thZ2UuanNvbic7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFvqs7XthrUg7Zes7Y28IO2VqOyImF0gSlNPTiDrjbDsnbTthLDrpbwg67aE7ISd7ZWY7JesIOydmOyhtOyEsShwbGlzdCwgcG5nKeydhCDrs7XsgqztlZjqs6AgRELrpbwg6rCx7IugXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5hc3luYyBmdW5jdGlvbiBjb3B5RGVwZW5kZW5jaWVzKGFzc2V0SW5mbzogYW55LCBqc29uRGF0YTogYW55LCBsZWdhY3lSb290RGlyOiBzdHJpbmcgKSB7XG5cbiAgICAvLyBVSSDtjIzsnbzsnbTrqbQgdGV4dHVyZXMsIEFybWF0dXJlIO2MjOydvOydtOuptCBjb25maWdfZmlsZV9wYXRo66W8IOqwgOyguOyYqOuLpC5cbiAgICAvLyDrkZgg64ukIOyXhuycvOuptCDruYgg67Cw7Je0KFtdKeydhCDrsJjtmZjtlanri4jri6QuXG4gICAgY29uc3QgdGV4dHVyZXM6IHN0cmluZ1tdID0ganNvbkRhdGEudGV4dHVyZXMgfHwganNvbkRhdGEuY29uZmlnX2ZpbGVfcGF0aCB8fCBbXTtcblxuICAgIC8vIGZvbnQgc2V0IOuzteyCrFxuICAgIGNvbnN0IGZvbnRTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgICBjb25zdCByb290V2lkZ2V0ID0ganNvbkRhdGEud2lkZ2V0VHJlZSB8fCBqc29uRGF0YS5ub2RlVHJlZSB8fCBqc29uRGF0YTtcbiAgICBjb2xsZWN0Qk1Gb250cyhyb290V2lkZ2V0LCBmb250U2V0KTtcbiAgICBjb25zdCBmb250UGF0aHMgPSBBcnJheS5mcm9tKGZvbnRTZXQpO1xuXG4gICAganNvbkRhdGEuZm9udHMgPSBmb250UGF0aHM7IC8vIOuCmOykkeyXkCBqc29uRGF0YSDsl5DshJwg7JO47IiYIOyeiOqyjCDtlZjsnpAuXG5cbiAgICBpZiAodGV4dHVyZXMubGVuZ3RoID09PSAwICYmIGZvbnRQYXRocy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCLrs7XsgqztlaAg66as7IaM7Iqk6rCAIOyXhuydjFwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRlc3RfZGlyX3VybCA9IGRpcm5hbWUoYXNzZXRJbmZvLnVybCk7ICAgIC8vIOyXkOyFiyBEQiDqsr3roZwgKOyYiDogZGI6Ly9hc3NldHMvLi4uKVxuICAgIGNvbnN0IGRlc3RfZGlyX3BhdGggPSBkaXJuYW1lKGFzc2V0SW5mby5maWxlKTsgIC8vIOyLpOygnCDtjIzsnbwg7Iuc7Iqk7YWcIOqyveuhnCAo67O17IKs7JqpKSBcblxuICAgIGxldCBuZWVkUmVmcmVzaCA9IGZhbHNlO1xuXG4gICAgY29uc3Qgb3JpZ2luUmVzU2VhcmNoUGF0aCA9IFtcbiAgICAgICAgbGVnYWN5Um9vdERpcixcbiAgICAgICAgam9pbihsZWdhY3lSb290RGlyLCdiaW5hcnknKVxuICAgIF07XG5cbiAgICBjb25zdCBmaW5kVmFsaWRQYXRoID0gKHJlbFBhdGg6IHN0cmluZyk6IHN0cmluZyB8IG51bGwgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGRpciBvZiBvcmlnaW5SZXNTZWFyY2hQYXRoKSB7XG4gICAgICAgICAgICBjb25zdCBmdWxsUGF0aCA9IGpvaW4oZGlyLCByZWxQYXRoKTtcbiAgICAgICAgICAgIGlmIChleGlzdHNTeW5jKGZ1bGxQYXRoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmdWxsUGF0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiB0ZXh0dXJlcykge1xuICAgICAgICAvLyDtmLnsi5wg7ZmV7J6l7J6Q6rCAIOuqheyLnCDslYgg65CcIOqyveyasOulvCDrjIDruYTtlZwg67Cp7Ja0IOy9lOuTnFxuICAgICAgICBjb25zdCBpc1BsaXN0ID0gZmlsZU5hbWUudG9Mb3dlckNhc2UoKS5lbmRzV2l0aCgnLnBsaXN0Jyk7XG4gICAgICAgIGNvbnN0IG9yaWdpbk5hbWUgPSBpc1BsaXN0ID8gZmlsZU5hbWUgOiBgJHtmaWxlTmFtZX0ucGxpc3RgO1xuICAgICAgICBjb25zdCBvcmlnaW5QbmdOYW1lID0gb3JpZ2luTmFtZS5yZXBsYWNlKCcucGxpc3QnLCAnLnBuZycpO1xuXG4gICAgICAgIGNvbnN0IHZhbGlkUGxpc3QgPSBmaW5kVmFsaWRQYXRoKG9yaWdpbk5hbWUpO1xuICAgICAgICBjb25zdCB2YWxpZFBuZyA9IGZpbmRWYWxpZFBhdGgob3JpZ2luUG5nTmFtZSk7XG5cbiAgICAgICAgY29uc3Qgb3JpZ2luX3BsaXN0X3BhdGggPSBqb2luKGxlZ2FjeVJvb3REaXIsIG9yaWdpbk5hbWUpO1xuICAgICAgICBjb25zdCBvcmlnaW5fcG5nX3BhdGggPSBvcmlnaW5fcGxpc3RfcGF0aC5yZXBsYWNlKCcucGxpc3QnLCAnLnBuZycpO1xuXG4gICAgICAgIGlmICh2YWxpZFBsaXN0KSB7XG4gICAgICAgICAgICBjb3B5U3luYyh2YWxpZFBsaXN0LCBqb2luKGRlc3RfZGlyX3BhdGgsIGJhc2VuYW1lKHZhbGlkUGxpc3QpKSk7XG4gICAgICAgICAgICBuZWVkUmVmcmVzaCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbGlkUG5nKSB7XG4gICAgICAgICAgICBjb3B5U3luYyh2YWxpZFBuZywgam9pbihkZXN0X2Rpcl9wYXRoLCBiYXNlbmFtZSh2YWxpZFBuZykpKTtcbiAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGZvbnQg66as7IaM7IqkIOuzteyCrFxuICAgIGZvciAoY29uc3QgZm9udFBhdGggb2YgZm9udFBhdGhzKSB7XG4gICAgICAgIGNvbnN0IG9yaWdpblBuZ05hbWUgPSBmb250UGF0aC5yZXBsYWNlKCcuZm50JywgJy5wbmcnKTtcbiAgICAgICAgY29uc3QgdmFsaWRGbnQgPSBmaW5kVmFsaWRQYXRoKGZvbnRQYXRoKTtcbiAgICAgICAgY29uc3QgdmFsaWRQbmcgPSBmaW5kVmFsaWRQYXRoKG9yaWdpblBuZ05hbWUpO1xuXG4gICAgICAgIGlmICh2YWxpZEZudCkge1xuICAgICAgICAgICAgLy8gc2l6ZSDqsIAg7J2M7IiY66GcIOuCmOyYrCDqsr3smrAsIOyWkeyImOuhnCDrsJTqv5TspJjshJwg7IOd7ISx7ZWc64ukLijsm5Drs7gg7IiY7KCVIClcbiAgICAgICAgICAgIGNvbnN0IGRlc3RGbnQgPSBqb2luKGRlc3RfZGlyX3BhdGgsIGJhc2VuYW1lKHZhbGlkRm50KSk7XG4gICAgICAgICAgICBsZXQgZm50Q29udGVudCA9IHJlYWRGaWxlU3luYyh2YWxpZEZudCwgJ3V0Zi04Jyk7XG5cbiAgICAgICAgICAgIGlmIChmbnRDb250ZW50LmluY2x1ZGVzKCdzaXplPS0nKSkge1xuICAgICAgICAgICAgICAgIGZudENvbnRlbnQgPSBmbnRDb250ZW50LnJlcGxhY2UoL3NpemU9LShcXGQrKS9nLCAnc2l6ZT0kMScpOyAvLyBzaXplIOqwgCDsnYzsiJjrqbQg7JaR7IiY66GcIOuzgOqyvVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB3cml0ZUZpbGVTeW5jKGRlc3RGbnQsIGZudENvbnRlbnQsICd1dGYtOCcpO1xuICAgICAgICAgICAgbmVlZFJlZnJlc2ggPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFtNYWluXSDtj7Dtirgg7YyM7J28IOuzteyCrCDsmYTro4w6ICR7YmFzZW5hbWUodmFsaWRGbnQpfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBbTWFpbl0g4pqg77iPIOybkOuzuCDtj7Dtirgg7YyM7J287J2EIOywvuydhCDsiJgg7JeG7J2MOiAke2ZvbnRQYXRofWApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkUG5nKSB7XG4gICAgICAgICAgICBjb3B5U3luYyh2YWxpZFBuZywgam9pbihkZXN0X2Rpcl9wYXRoLCBiYXNlbmFtZSh2YWxpZFBuZykpKTtcbiAgICAgICAgICAgIG5lZWRSZWZyZXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIO2MjOydvCDrs7XsgqzqsIAg7J287Ja064Ks64uk66m0IEFzc2V0IERCIOumrO2UhOugiOyLnFxuICAgIGlmIChuZWVkUmVmcmVzaCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltNYWluXeyXkOyFiyBEQiDthY3siqTsspgg66as7ZSE66CI7IucIOyalOyyrSDspJEuLi5cIik7XG4gICAgICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3JlZnJlc2gtYXNzZXQnLCBkZXN0X2Rpcl91cmwpO1xuICAgICAgICAvLyDrpqztlITroIjsi5wg7ZuEIOyViOyghO2VmOqyjCDtjIzsnbzsnbQg7J247Iud65CgIOuVjOq5jOyngCDsnqDsi5wg64yA6riwXG4gICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCA1MDApKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJbTWFpbl3thY3siqTsspgg64+Z6riw7ZmUIOyZhOujjCFcIik7XG4gICAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBb64K067aAIO2XrO2NvCDtlajsiJhdIPCfpr4gQXJtYXR1cmUgKOyVoOuLiOuplOydtOyFmCkg7KCE7JqpIOyymOumrCDroZzsp4Fcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NBcm1hdHVyZShhc3NldEluZm86IGFueSwganNvbkRhdGE6IGFueSwgYXNzZXRSb290RGlyOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhcIj0+IHByb2Nlc3NBcm1hdHVyZSDroZzsp4Eg7Iuc7J6RLi4uXCIpO1xuICAgIFxuICAgIC8vIDEuIOqzte2GtSDthY3siqTsspgg7J2Y7KG07ISxIOuzteyCrFxuICAgIGF3YWl0IGNvcHlEZXBlbmRlbmNpZXMoYXNzZXRJbmZvLCBqc29uRGF0YSwgYXNzZXRSb290RGlyICk7XG5cbiAgICAvLyAyLiDtlITrpqztjLkg7IOd7ISxIOuqheuguSDslKzsnLzroZwg7KCE64usICAgIFxuICAgIGNvbnN0IGRlc3RfdXJsID0gYXNzZXRJbmZvLnVybDtcbiAgICBjb25zdCBwcmVmYWJfdXJsID0gYCR7ZGlybmFtZShkZXN0X3VybCl9LyR7YmFzZW5hbWUoYXNzZXRJbmZvLmZpbGUpLnJlcGxhY2UoJy5FeHBvcnRKc29uJywgJy5wcmVmYWInKX1gO1xuICAgIFxuICAgIC8vIHNjZW5lLnRz7J2YIGNyZWF0ZUFybWF0dXJlUHJlZmFiIO2YuOy2nFxuICAgIGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ3NjZW5lJywgJ2V4ZWN1dGUtc2NlbmUtc2NyaXB0Jywge1xuICAgICAgICBuYW1lOiAnY29jb3NfbGVnYWN5X2JyaWRnZScsIC8vIHBhY2thZ2UuanNvbuyXkCDrk7HroZ3rkJwgZXh0ZW5zaW9uIOydtOumhOycvOuhnCDrp57strDso7zshLjsmpRcbiAgICAgICAgbWV0aG9kOiAnY3JlYXRlQXJtYXR1cmVQcmVmYWInLFxuICAgICAgICBhcmdzOiBbe1xuICAgICAgICAgICAgbmFtZTogYmFzZW5hbWUoYXNzZXRJbmZvLmZpbGUsICcuRXhwb3J0SnNvbicpLFxuICAgICAgICAgICAgZGVzdFVybDogcHJlZmFiX3VybCxcbiAgICAgICAgICAgIGpzb25EYXRhOiBqc29uRGF0YVxuICAgICAgICB9XVxuICAgIH0pO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBb64K067aAIO2XrO2NvCDtlajsiJhdIOq4sOyhtCBjb2NvcyBzdHVkaW8gVUkg7KCE7JqpIOyymOumrCDroZzsp4Fcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmFzeW5jIGZ1bmN0aW9uIHByb2Nlc3NVSShhc3NldEluZm86IGFueSwganNvbkRhdGE6IGFueSwgYXNzZXRSb290RGlyOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhcIltNYWluXSA9PiBwcm9jZXNzVUkg66Gc7KeBIOyLnOyekS4uLlwiKTtcblxuICAgIC8vIDEuIOqzte2GtSDthY3siqTsspgg7J2Y7KG07ISxIOuzteyCrFxuICAgIGF3YWl0IGNvcHlEZXBlbmRlbmNpZXMoYXNzZXRJbmZvLCBqc29uRGF0YSwgYXNzZXRSb290RGlyKTtcbiAgICBcbiAgICAvLyAyLiDtlITrpqztjLkg7IOd7ISxIOuqheuguSDslKzsnLzroZwg7KCE64usXG4gICAgLy8gYXNzZXRzLWRiIOumrO2UhOugiOyLnCAoIGRlcGVuZGFuY3kg7YyM7J28IOywvuqzoCBhc3NldCDtjKjrhJDsl5DshJwg7IKs7Jqp7ZWgIOyImCDsnojrj4TroZ0gKSBcbiAgICBjb25zdCBkZXN0X3VybCA9IGFzc2V0SW5mby51cmw7IC8vICdkYjovL2Fzc2V0cy9hLkV4cG9ydEpzb24nLFxuICAgIGNvbnN0IHByZWZhYl91cmwgPSBgJHtkaXJuYW1lKGRlc3RfdXJsKX0vJHtiYXNlbmFtZShhc3NldEluZm8uZmlsZSkucmVwbGFjZSgnLkV4cG9ydEpzb24nLCAnLnByZWZhYicpfWA7XG4gICAgXG4gICAgLy8gc2NlbmUudHPsnZggY3JlYXRlUHJlZmFiRnJvbUV4cG9ydEpzb24g7Zi47LacXG4gICAgYXdhaXQgRWRpdG9yLk1lc3NhZ2UucmVxdWVzdCgnc2NlbmUnLCAnZXhlY3V0ZS1zY2VuZS1zY3JpcHQnLCB7XG4gICAgICAgIG5hbWU6ICdjb2Nvc19sZWdhY3lfYnJpZGdlJywgLy8gZXh0ZW5zaW9uIOydtOumhC4gcGFja2FnZS5qc29u7J2YIG5hbWUg6rO8IOunnuyVhOyVvCDtlaguXG4gICAgICAgIG1ldGhvZDogJ2NyZWF0ZUNDU3R1ZGlvVUlQcmVmYWInLFxuICAgICAgICBhcmdzOiBbe1xuICAgICAgICAgICAgbmFtZTogYmFzZW5hbWUoYXNzZXRJbmZvLmZpbGUsICcuRXhwb3J0SnNvbicpLFxuICAgICAgICAgICAgZGVzdFVybDogcHJlZmFiX3VybCxcbiAgICAgICAgICAgIGpzb25EYXRhOiBqc29uRGF0YVxuICAgICAgICB9XVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0Qk1Gb250cyhub2RlOiBhbnksIGZvbnRTZXQ6IFNldDxzdHJpbmc+KXtcbiAgICBpZiAoIW5vZGUpIHJldHVybjtcbiAgICBcbiAgICAvLyBMYWJlbEJNRm9udCDtg4DsnoXsnbTqs6Ag7Y+w7Yq4IOqyveuhnCDsoJXrs7TqsIAg7J6I64qUIOqyveyasFxuICAgIGlmIChub2RlLmNsYXNzbmFtZSA9PT0gXCJMYWJlbEJNRm9udFwiICYmIG5vZGUub3B0aW9ucz8uZmlsZU5hbWVEYXRhPy5wYXRoKSB7XG4gICAgICAgIGZvbnRTZXQuYWRkKG5vZGUub3B0aW9ucy5maWxlTmFtZURhdGEucGF0aCk7XG4gICAgfVxuXG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZDogYW55KSA9PiBjb2xsZWN0Qk1Gb250cyhjaGlsZCwgZm9udFNldCkpO1xuICAgIH1cbn1cblxuLy8g7JeQ7IWLIO2MqOuEkOyXkCDtjIzsnbzsnbQg7LaU6rCA65CY7JeI7J2EIOuVjCDtmLjstpwuXG5jb25zdCBvbkFzc2V0QWRkID0gKCB1dWlkOiBzdHJpbmcsIGluZm86IGFueSApPT57XG4gICAgaWYgKGluZm8ubmFtZS5lbmRzV2l0aCgnLkV4cG9ydEpzb24nKSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIltNYWluXVtFdmVudF0gIyMjIGFzc2V0LWRiOmFzc2V0LWFkZCAjIyNcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiICAgPj4+IHV1aWQsIG5hbWUgOiBcIiwgdXVpZCwgaW5mby5uYW1lICk7XG4gICAgICAgIFxuICAgICAgICBtZXRob2RzLmhhbmRsZUV4cG9ydEpzb24oIHV1aWQgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBtZXRob2RzOiB7IFtrZXk6IHN0cmluZ106ICguLi5hbnk6IGFueSkgPT4gYW55IH0gPSB7XG4gICAgLy8gTGFnYWN5IOyXkOyFiyDro6jtirgg7Y+0642UIOyEpOyglSBcbiAgICBvcGVuUGFuZWwoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdbY29jb3NfbGVnYWN5X2JyaWRnZV0gb3BlblBhbmVsTWV0aG9kIOqwgCDsi6TtlonrkJjsl4jsirXri4jri6QuJywgcGFja2FnZUpTT04ubmFtZSk7XG4gICAgICAgIEVkaXRvci5QYW5lbC5vcGVuKCdjb2Nvc19sZWdhY3lfYnJpZGdlLmJyaWRnZS1wYW5lbCcpO1xuICAgICAgICAvLyAgRWRpdG9yLlBhbmVsLm9wZW4ocGFja2FnZUpTT04ubmFtZSk7XG4gICAgfSxcblxuICAgIC8vIExlZ2FjeSBVSe2MjOydvOydtCBhc3NldCDtjKjrhJDsl5AgZHJhZy1kcm9wIOuQnCDtm4Qg7Zi47LacXG4gICAgLy8gZXhwb3J0SnNvbiDtjIzsnbwg67aE7ISdIO2bhCBzY2VuZSDsnLzroZwg64SY6rmAXG4gICAgYXN5bmMgaGFuZGxlRXhwb3J0SnNvbiggdXVpZDogc3RyaW5nICkge1xuICAgICAgICBsZXQgbGVnYWN5QXNzZXRSb290RGlyID0gYXdhaXQgRWRpdG9yLlByb2ZpbGUuZ2V0UHJvamVjdCgnY29jb3NfbGVnYWN5X2JyaWRnZScsICdsZWdhY3lBc3NldFJvb3QnKTtcblxuICAgICAgICBjb25zdCBpc1BhdGhJbnZhbGlkID0gIWxlZ2FjeUFzc2V0Um9vdERpciB8fCAhZXhpc3RzU3luYyhsZWdhY3lBc3NldFJvb3REaXIpO1xuXG4gICAgICAgIGlmIChpc1BhdGhJbnZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCByZWFzb24gPSAhbGVnYWN5QXNzZXRSb290RGlyID8gXCLshKTsoJXrkJwg6rK966Gc6rCAIOyXhuyKteuLiOuLpC5cIiA6IFwi7ISk7KCV65CcIOqyveuhnOqwgCDsmKzrsJTrpbTsp4Ag7JWK7Iq164uI64ukLlwiO1xuXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBhd2FpdCBFZGl0b3IuRGlhbG9nLndhcm4oYCR7cmVhc29ufVxcbu2MqOuEkOyXkOyEnCBMZWdhY3kgUm9vdCDqsr3roZzrpbwg64uk7IucIOyEpOygle2VtOyjvOyEuOyalCFgLCB7XG4gICAgICAgICAgICAgICAgYnV0dG9uczogWyfshKTsoJUg7Yyo64SQIOyXtOq4sCddLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICAgICAgICAgICAgY2FuY2VsOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8g7Yyo64SQ7J2EIOyXtOyWtCDsgqzsmqnsnpDqsIAg7IiY7KCV7ZWY6rKMIOycoOuPhFxuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgRWRpdG9yLlBhbmVsLm9wZW4oJ2NvY29zX2xlZ2FjeV9icmlkZ2UuYnJpZGdlLXBhbmVsJyk7XG5cbiAgICAgICAgICAgIC8vIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIC8vIEVkaXRvci5EaWFsb2cud2Fybign7Yyo64SQ7JeQ7IScIExlZ2FjeSBSb290IOqyveuhnOulvCDrqLzsoIAg7ISk7KCV7ZW07KO87IS47JqUIScsIHtcbiAgICAgICAgICAgIC8vICAgICBidXR0b25zOiBbJ+2ZleyduCddLCAvLyDrsoTtirwg67Cw7Je07J2EIOyngeygkSDsp4DsoJXtlZjsl6wg7ZWY64KY66eMIOuCmOyYpOqyjCDtlahcbiAgICAgICAgICAgIC8vICAgICBkZWZhdWx0OiAwLCAgICAgICAvLyDsl5TthLAg7YKkIOyeheugpSDsi5wg7Iuk7ZaJ65CgIOuyhO2KvCDsnbjrjbHsiqRcbiAgICAgICAgICAgIC8vICAgICBjYW5jZWw6IDAgICAgICAgICAvLyBFU0Mg7YKkIOyeheugpSDsi5wg7Iuk7ZaJ65CgIOuyhO2KvCDsnbjrjbHsiqRcbiAgICAgICAgICAgIC8vIH0pO1xuICAgICAgICAgICAgLy8gLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgLy8gRWRpdG9yLlBhbmVsLm9wZW4oJ2NvY29zX2xlZ2FjeV9icmlkZ2UuYnJpZGdlLXBhbmVsJyk7IC8vIO2MqOuEkCDsnpDrj5kg7Je06riwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnW01haW5dIOyCrOyaqSDspJHsnbgg7JuQ67O4IOqyveuhnDonLCBsZWdhY3lBc3NldFJvb3REaXIpO1xuXG4gICAgICAgIC8vIHN0ZXAgMS4gdXVpZCDroZwg7JeQ7IWL65SU67mE7JeQ7IScIGV4cG9ydEpzb24g7JeQ7IWLIOygleuztCDsmpTssq0gXG4gICAgICAgIGNvbnN0IGFzc2V0SW5mbyA9IGF3YWl0IEVkaXRvci5NZXNzYWdlLnJlcXVlc3QoJ2Fzc2V0LWRiJywgJ3F1ZXJ5LWFzc2V0LWluZm8nLCB1dWlkICk7IFxuXG4gICAgICAgIGlmICghYXNzZXRJbmZvIHx8ICFhc3NldEluZm8uZmlsZS50b0xvd2VyQ2FzZSgpLmVuZHNXaXRoKCcuZXhwb3J0anNvbicpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCLtlbTri7kgdXVpZCDroZwgYXNzZXRJbmZvIOulvCDqsIDsoLjsmKwg7IiYIOyXhuydjCA6IFwiLCB1dWlkICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QganNvbkRhdGEgPSByZWFkSnNvblN5bmMoIGFzc2V0SW5mby5maWxlICk7IFxuICAgICAgICAgICAgY29uc3QgaXNBcm1hdHVyZSA9ICEhKGpzb25EYXRhLmFybWF0dXJlX2RhdGEgfHwganNvbkRhdGEuYW5pbWF0aW9uX2RhdGEpO1xuXG4gICAgICAgICAgICBpZiAoaXNBcm1hdHVyZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTWFpbl0g8J+mviBBcm1hdHVyZSDtjIzsnbwg6rCQ7KeAIDogJHthc3NldEluZm8ubmFtZX1gKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBwcm9jZXNzQXJtYXR1cmUoYXNzZXRJbmZvLCBqc29uRGF0YSwgbGVnYWN5QXNzZXRSb290RGlyKTsgLy8g7Jm467aAIO2VqOyImCDsp4HsoJEg7Zi47LacXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBbTWFpbl0g8J+WvO+4jyBVSSDtjIzsnbwg6rCQ7KeAIDogJHthc3NldEluZm8ubmFtZX1gKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBwcm9jZXNzVUkoYXNzZXRJbmZvLCBqc29uRGF0YSwgbGVnYWN5QXNzZXRSb290RGlyKTsgLy8g7Jm467aAIO2VqOyImCDsp4HsoJEg7Zi47LacXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goIGVyciApIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoIFwiZXJyb3IgOiBcIiwgZXJyICk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcblxuICAgIHNob3dMb2coKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdIZWxsbyBXb3JsZCcpO1xuICAgIH0sXG5cbiAgICBhc3luYyBvbkNyZWF0ZU1lbnUoIGFzc2V0SW5mbz86IGFueSApIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjbGljayBvbkNyZWF0ZU1lbnUgXCIpO1xuICAgIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkKCkge1xuICAgIC8vIOyXkOyFi+2MqOuEkOyXkCDtjIzsnbwgZHJhZy1kcm9wIO2bhCDsl5DshYvsl5Ag65Ox66Gd7J20IOyemCDrkJjrqbQg7Zi47LacXG4gICAgLy8gQHRzLWlnbm9yZVxuXG4gICAgIC8vIEB0cy1pZ25vcmVcbiAgICBFZGl0b3IuTWVzc2FnZS5hZGRCcm9hZGNhc3RMaXN0ZW5lcignYXNzZXQtZGI6YXNzZXQtYWRkJywgb25Bc3NldEFkZCApO1xuXG4gICAgY29uc29sZS5sb2coXCJleHRlbnNpb24gTG9hZCEgdmVyXzUgXCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5sb2FkKCkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBFZGl0b3IuTWVzc2FnZS5yZW1vdmVCcm9hZGNhc3RMaXN0ZW5lcignYXNzZXQtZGI6YXNzZXQtYWRkJywgb25Bc3NldEFkZCk7XG4gICAgXG4gICAgY29uc29sZS5sb2coXCJleHRlbnNpb24gVW5sb2FkISB2ZXJfNSBcIik7XG59XG4iXX0=