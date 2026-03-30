import { app } from 'electron';
import * as fs from 'fs'; 
import * as path from 'path'; // 파일 이름 추출용

// import { Editor } from 'cc';  <-- 이거 지우세요! (런타임 에러 원인)
// "TypeScript야, Editor라는 변수가 이미 메모리에 있으니까 빨간 줄 긋지 마" 라는 뜻입니다.
declare const Editor: any;
declare const cce : any;
// declare const EditorExtends : any;
/**
 * @en Registration method for the main process of Extension
 */
export const methods: { [key: string]: (...any: any) => any } = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    async showLog() {
        // 이제 사용 가능합니다!
        const result = await Editor.Dialog.select({
            title: 'Select ExportJson File',
            filters: [{ name: 'JSON', extensions: ['json', 'ExportJson'] }],
            multiSelections: false,
        });

        if (!result.filePaths || result.filePaths.length === 0) {
            return;
        }

        const filePath = result.filePaths[0];
        const fileName = path.basename(filePath, path.extname(filePath));
        console.log(`파일 선택됨: ${filePath}`);
        console.log(`파일 이름 : ${fileName}`);


        // 2. 파일 내용 읽기 (Node.js fs 모듈 사용)
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            // 3. 씬(Scene) 스크립트로 데이터 전송 (여기가 중요!)
            // main.ts는 씬(노드)에 직접 접근 못하므로 scene script에 부탁해야 함
           const result = await Editor.Message.request('scene', 'execute-scene-script', {
                name: 'sample_extension', // 패키지 이름
                method: 'createNodesFromUIData', // 실행할 함수
                args: [fileName, jsonData], // 전달할 데이터
            });
            const nodeUuid = result.uuid;
            const anims = result.animations;

            if (nodeUuid) {
                // --- 애니메이션 파일 저장 ---
                if (anims && anims.length > 0) {
                    let clipUUIDs = [];
                    for (const anim of anims) {
                        // 저장 경로: assets/Animation/ClipName.anim (폴더 미리 만들어두거나 생성 로직 필요)
                        const animPath = `db://assets/${fileName}_${anim.name}.anim`; 
                
                        // 3. ★ 객체를 JSON 문자열로 변환 (들여쓰기 포함)
                        //const fileContent = JSON.stringify( anim.content, null, 4);
                        // const fileContent = cce.Utils.serialize(anim.content);                    
                        const fileContent = anim.content;
                        // 파일 생성 (create-asset 사용)
                        await Editor.Message.request('asset-db', 'create-asset', animPath, fileContent);
                        await new Promise(resolve => setTimeout(resolve, 500));
                        // [Step 3] 방금 저장한 .anim 파일의 UUID를 가져옴 (Scene에서 노드에 붙일 때 필요)
                        const uuid = await Editor.Message.request('asset-db', 'query-uuid', animPath);
                        clipUUIDs.push(uuid);
                        console.log(`[Main] 애니메이션 저장 완료: ${animPath} : ${uuid}`);
                    }

                    const nodeUuid2 = await Editor.Message.request('scene', 'execute-scene-script', {
                        name: 'sample_extension',
                        method: 'addAnimationComponent',
                        args: [nodeUuid, clipUUIDs]
                    });
                }

                console.log(`[Importer] 노드 UUID 수신: ${nodeUuid}`);
                //0.5초(500ms) 대기! (엔진이 노드를 인식할 시간 벌기)
                await new Promise(resolve => setTimeout(resolve, 500));
                // 선택(Selection) 요청으로 해당 Node 잘 선택했는데 확인
                await Editor.Selection.select('node', nodeUuid);
                console.log('[Main] 생성된 노드를 선택했습니다.');
                // 3. 저장할 경로 설정 (assets 폴더 바로 아래)
                // 원하는 폴더가 있다면 "db://assets/Prefabs/${fileName}.prefab" 처럼 변경 가능
                const targetPath = `db://assets/${fileName}.prefab`;

                try {
                    // 4. 프리팹 생성 요청 (이게 핵심!)
                    await Editor.Message.request('scene', 'create-prefab', nodeUuid, targetPath );

                    console.log(`[Importer] 프리팹 저장 성공: ${targetPath}`);
                }
                catch(error){
                    console.error('[Main] 프리팹 생성 실패 ㅠㅠ 원인:', error);
                }
            }

        } catch (err) {
            console.error(err);
        }
    },

    async arToPrefab() {
        // 이제 사용 가능합니다!
        const result = await Editor.Dialog.select({
            title: 'Select ExportJson File',
            filters: [{ name: 'JSON', extensions: ['json', 'ExportJson'] }],
            multiSelections: false,
        });

        if (!result.filePaths || result.filePaths.length === 0) {
            return;
        }

        const filePath = result.filePaths[0];
        const fileName = path.basename(filePath, path.extname(filePath));
        console.log(`파일 선택됨: ${filePath}`);
        console.log(`파일 이름 : ${fileName}`);


        // 2. 파일 내용 읽기 (Node.js fs 모듈 사용)
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const jsonData = JSON.parse(fileContent);

            // 3. 씬(Scene) 스크립트로 데이터 전송 (여기가 중요!)
            // main.ts는 씬(노드)에 직접 접근 못하므로 scene script에 부탁해야 함
           const result = await Editor.Message.request('scene', 'execute-scene-script', {
                name: 'sample_extension', // 패키지 이름
                method: 'createNodesFromARData', // 실행할 함수
                args: [fileName, jsonData], // 전달할 데이터
            });
            const nodeUuid = result.uuid;
            const anims = result.animations;
            console.log("[CHECK] arToPrefab : ");
            if (nodeUuid) {
                // --- 애니메이션 파일 저장 ---
                if (anims && anims.length > 0) {
                    let clipUUIDs = [];
                    for (const anim of anims) {
                        // 저장 경로: assets/Animation/ClipName.anim (폴더 미리 만들어두거나 생성 로직 필요)
                        const animPath = `db://assets/${fileName}_${anim.name}.anim`; 
                
                        // 3. ★ 객체를 JSON 문자열로 변환 (들여쓰기 포함)
                        //const fileContent = JSON.stringify( anim.content, null, 4);
                        // const fileContent = cce.Utils.serialize(anim.content);                    
                        const fileContent = anim.content;
                        // 파일 생성 (create-asset 사용)
                        await Editor.Message.request('asset-db', 'create-asset', animPath, fileContent);
                        await new Promise(resolve => setTimeout(resolve, 500));

                        const uuid = await Editor.Message.request('asset-db', 'query-uuid', animPath);
                        clipUUIDs.push(uuid);
                        console.log(`[Main] 애니메이션 저장 완료: ${animPath}`);
                    }
                    const nodeUuid2 = await Editor.Message.request('scene', 'execute-scene-script', {
                        name: 'sample_extension',
                        method: 'addAnimationComponent',
                        args: [nodeUuid, clipUUIDs]
                    });
                }
                console.log(`[Importer] 노드 UUID 수신: ${nodeUuid}`);
                //0.5초(500ms) 대기! (엔진이 노드를 인식할 시간 벌기)
                await new Promise(resolve => setTimeout(resolve, 500));
                // 선택(Selection) 요청으로 해당 Node 잘 선택했는데 확인
                await Editor.Selection.select('node', nodeUuid);
                console.log('[Main] 생성된 노드를 선택했습니다.');
                // 3. 저장할 경로 설정 (assets 폴더 바로 아래)
                // 원하는 폴더가 있다면 "db://assets/Prefabs/${fileName}.prefab" 처럼 변경 가능
                const targetPath = `db://assets/${fileName}.prefab`;

                try {
                    // 4. 프리팹 생성 요청 (이게 핵심!)
                    await Editor.Message.request('scene', 'create-prefab', nodeUuid, targetPath );

                    console.log(`[Importer] 프리팹 저장 성공: ${targetPath}`);
                }
                catch(error){
                    console.error('[Main] 프리팹 생성 실패 ㅠㅠ 원인:', error);
                }
            }
    
            console.log(`[animtion] AR 애니메이션: ${anims.length}`);
    

        } catch (err) {
            console.error(err);
        }
    },
};

/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
export function load() {}

/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
export function unload() {}
