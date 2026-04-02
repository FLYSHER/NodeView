import { app } from 'electron';
import * as fs from 'fs';
import * as path from 'path'; // 파일 이름 추출용

declare const Editor: any; //

/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
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
            // result = [노드 uuid, 수정할 meta data]
            const result = await Editor.Message.request('scene', 'execute-scene-script', {
                name: 'sample_importer', // 패키지 이름
                method: 'createNodesFromData', // 실행할 함수
                args: [fileName, jsonData], // 전달할 데이터
            });

            if (result && result.uuid) {
                const nodeUuid = result.uuid;
                const metaUpdates = result.metaUpdates || [];

                console.log(`[Importer] 노드 UUID 수신: ${nodeUuid}`);
                //0.5초(500ms) 대기! (엔진이 노드를 인식할 시간 벌기)
                await new Promise(resolve => setTimeout(resolve, 500));
                // 선택(Selection) 요청으로 해당 Node 잘 선택했는데 확인
                await Editor.Selection.select('node', nodeUuid);
                console.log('[Main] 생성된 노드를 선택했습니다.');
                // 3. 저장할 경로 설정 (assets 폴더 바로 아래)
                const targetPath = `db://assets/prefabs/${fileName}.prefab`;

                try {
                    // 1. 프리팹을 가장 먼저 최우선으로 저장! (씬이 새로고침되기 전에 저장해야 안전함)
                    await Editor.Message.request('scene', 'create-prefab', nodeUuid, targetPath);
                    console.log(`[Importer] 프리팹 저장 성공: ${targetPath}`);
                }
                catch(error){
                    console.error('[Main] 프리팹 생성 실패 ㅠㅠ 원인:', error);
                }

                // Prefab 저장 이후, Meta 파일 수정
                if (metaUpdates.length > 0) {
                    console.log(`[Importer] 총 ${metaUpdates.length}건의 나인패치(Slice) 데이터를 수정합니다...`);
                    const processed = new Set<string>();

                    for (const update of metaUpdates) {
                        if (processed.has(update.uuid)) continue;
                        processed.add(update.uuid);

                        try {
                            const parentUuid = update.uuid.split('@')[0];
                            const parentAssetInfo = await Editor.Message.request('asset-db', 'query-asset-info', parentUuid);
                            if (!parentAssetInfo || !parentAssetInfo.file) continue;

                            const subAssetInfo = await Editor.Message.request('asset-db', 'query-asset-info', update.uuid);
                            const subAssetName = subAssetInfo ? subAssetInfo.name : null;
                            if (!subAssetName) continue;

                            const metaPath = parentAssetInfo.file + '.meta';
                            if (fs.existsSync(metaPath)) {
                                const metaStr = fs.readFileSync(metaPath, 'utf-8');
                                const metaObj = JSON.parse(metaStr);

                                let targetSubMeta = null;
                                if (metaObj.subMetas) {
                                    for (const key in metaObj.subMetas) {
                                        const subMeta = metaObj.subMetas[key];
                                        if (key === subAssetName || subMeta.name === subAssetName) {
                                            targetSubMeta = subMeta;
                                            break;
                                        }
                                    }
                                }

                                if (targetSubMeta && targetSubMeta.userData) {
                                    targetSubMeta.userData.borderTop = update.borderT;
                                    targetSubMeta.userData.borderBottom = update.borderB;
                                    targetSubMeta.userData.borderLeft = update.borderL;
                                    targetSubMeta.userData.borderRight = update.borderR;

                                    // 파일 덮어쓰기 (이 순간 에디터 백그라운드에서 파일 감지기가 돌기 시작합니다)
                                    fs.writeFileSync(metaPath, JSON.stringify(metaObj, null, 2));
                                }
                            }
                        } catch (err) {
                            console.warn(`[Importer] Meta 파일 수정 실패: ${update.uuid}`, err);
                        }
                    }
                    console.log(`[Importer] 모든 메타 파일 수정 완료!`);
                }
            }
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
