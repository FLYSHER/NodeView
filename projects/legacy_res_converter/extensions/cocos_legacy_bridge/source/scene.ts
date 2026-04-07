// @ts-ignore
import {Node, Layers, director, Animation, UITransform} from 'cc';
declare const cce : any;

import { ResourceMap, cleanupTempNode } from './utils';
import { buildNodeTree } from './ui-builder';
import { buildUIAnimations } from './ui-action-builder';
import { buildArmatureTree, generateAllAnimationClip, buildAllSkinNode } from './armature-builder';


import { json } from 'stream/consumers';
import { createResourceMap, apply9ScaleToMeta } from './utils';

// 프리팹 생성 ( 실제 씬 Hierarchy 에 올린 후 생성 )
async function generatePrefabFromSceneNode( args: any ) {
    const { nodeUUID, targetUrl } = args;
    console.log( "generatePrefabFromSceneNode : ", nodeUUID, targetUrl );

    try {
        // @ts-ignore
        await Editor.Message.request('scene', 'create-prefab', nodeUUID, targetUrl);
        
        // 0.5초 정도 대기 후 UUID 확인
        await new Promise(resolve => setTimeout(resolve, 500));

        // @ts-ignore
        await Editor.Message.request('asset-db', 'refresh-asset', targetUrl );
    }
    catch( err ) {
        throw err; // 상위 try-catch에서 잡을 수 있게 다시 던짐
    }
}

// UI Root Node 생성 및 속성 ( contentSize, anchor, position )
function createUIRootNode(name: string, jsonData: any, parent: Node): Node {
    const rootNode = new Node(name);
    rootNode.layer = Layers.Enum.UI_2D;
    rootNode.parent = parent;

    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
    const rwOptions = rootWidget.options || {};

    const designW = rwOptions.width ?? jsonData.designWidth ?? 0;
    const designH = rwOptions.height ?? jsonData.designHeight ?? 0;
    const anchorX = rwOptions.anchorPointX ?? 0.5;
    const anchorY = rwOptions.anchorPointY ?? 0.5;

    const uiTransform = rootNode.getComponent(UITransform) || rootNode.addComponent(UITransform);
    uiTransform.setContentSize(designW, designH);
    uiTransform.setAnchorPoint(anchorX, anchorY);

    // 위치 보정
    rootNode.setPosition((anchorX - 0.5) * designW, (anchorY - 0.5) * designH);

    return rootNode;
}

// AR Root Node 생성 (Animation Component 추가)
function createARRootNode(name: string, parent: Node): Node {
    const rootNode = new Node(name);
    rootNode.layer = Layers.Enum.UI_2D;
    rootNode.parent = parent;

    const animComp = rootNode.addComponent(Animation);
    return rootNode;
}

// 에디터 asset-db 에 특정 폴더가 존재하는지 확인하고 없으면 생성
// baseDir : ex) db://assets/legacy/animation
// subDir : ex) pu_extraSaleAR.. exportJson 이름과 같은 폴더
async function ensureFolder(baseDir: string, subDir: string): Promise<string> {
    const fullPath = `${baseDir}/${subDir}`;

    // @ts-ignore
    const exists = await Editor.Message.request('asset-db', 'query-asset-info', fullPath);

    if (!exists) {
        // @ts-ignore
        await Editor.Message.request('asset-db', 'create-asset', fullPath, null);
    }

    return fullPath;
}

// 하위 노드들 모두 검사하여 사용되는 리소스의 매핑 정보 생성
// 노드 생성 때마다, editor 에 uuid 로 리소스를 얻어오면 성능에 안 좋음.
async function prepareResourceMap(jsonData: any, imageDestUrl: string): Promise<ResourceMap> {
    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;

    const fontPathSet = new Set<string>();
    collectAllBMFonts( rootWidget, fontPathSet );

    const atlasPaths = jsonData.textures || []; // ex) atlasPaths = ['image/a.plist', 'image/b.plist']
    const fontPaths  = Array.from(fontPathSet); // set 으로부터 중복 제거하여 배열로 뺀다. // ex) fontPaths = ['image/puCashFn.fnt', 'image/PU_buyFont01.fnt']

    // 위 배열을 기준으로 리소스맵 생성
    return await createResourceMap(atlasPaths, fontPaths, imageDestUrl);
}

// 하위 노드들 모두 검사하여 BMFont 파일 path 수집
function collectAllBMFonts(widget: any, fontSet: Set<string>): void {
    if(!widget) return;

    if (widget.classname === "LabelBMFont" && widget.options?.fileNameData?.path) {
        fontSet.add(widget.options.fileNameData.path);
    }

    if (widget.children && Array.isArray(widget.children)) {
        widget.children.forEach((child: any) => collectAllBMFonts(child, fontSet));
    }

}

// 자식들 배열 복사하여 zOrder 에 따라 정렬 후 리턴
function sortChildrenByZOrder(children: any[]): any[] {
    return [...children].sort((a: any, b: any) => {
        const zA = a.options?.ZOrder ?? 0;
        const zB = b.options?.ZOrder ?? 0;
        return zA - zB;
    });
}

// rootNode 부터 widget tree 돌면서 위젯에 따라 해당 UI 노드 빌드.
async function buildAllNodes(jsonData: any, rootNode: Node, spriteFrameMap: ResourceMap, uiActionNodeMap?: Map<number, string>) {
    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
    const sortedChildren = sortChildrenByZOrder(rootWidget.children || []);

    for (const child of sortedChildren) {
        await buildNodeTree(child, rootNode, spriteFrameMap, uiActionNodeMap, "");
    }
}

export const methods = {

    // UI 프리팹 생성
    async createCCStudioUIPrefab(args: any) {
        const { name, destUrl, jsonData, imageDestUrl, animDestUrl } = args;
        // console.log("[Scene] createPrefabFromExportJson : ", name, destUrl );

        let rootNode = null;

        try {
            const scene = director.getScene();
            const canvas = scene?.getChildByName('Canvas');

            if( !canvas ) {
                throw new Error("canvas 를 찾을 수 없음!");
            }

            // ui root node 생성
            rootNode = createUIRootNode(name, jsonData, canvas);

            // 리소스 매핑 테이블 생성 ( 폰트 포함 )
            const spriteFrameMap = await prepareResourceMap(jsonData, imageDestUrl);

            // 노드 생서 전 9-scale 정보 meta 파일에 저장
            await apply9ScaleToMeta(spriteFrameMap, jsonData);

            const hasAnimation = jsonData.animation && jsonData.animation.actionlist && jsonData.animation.actionlist.length > 0;
            const uiActionNodeMap = hasAnimation ? new Map<number, string>() : undefined;

            // 위젯들 정보 대로 노드 트리 빌드
            await buildAllNodes(jsonData, rootNode, spriteFrameMap, uiActionNodeMap);

            // UIAction 정보가 있다면 animation clip 생성
            if(hasAnimation && uiActionNodeMap) {
                // 타겟 폴더 없으면 생성
                const destDir = await ensureFolder(animDestUrl, name);

                // ui-action-builder.ts의 함수 호출
                await buildUIAnimations(rootNode, jsonData, uiActionNodeMap, destDir);
            }

            // 프리팹 생성
            await generatePrefabFromSceneNode({
                nodeUUID : rootNode.uuid,
                targetUrl: destUrl
            });

            // 0.5초 정도 대기 후 UUID 확인
            await new Promise(resolve => setTimeout(resolve, 500));

        }
        catch ( err ) {
            console.error("생성 실패 : ", err );
        }
        finally {
            rootNode && cleanupTempNode(rootNode); 
            rootNode = null;
        }
    },

    // AR 프리팹 생성
    async createArmaturePrefab(args: any ) {
        const { name, destUrl, jsonData, imageDestUrl, animDestUrl } = args;

        // console.log("[scene] createArmaturePrefab 시작 : ", name);

        let rootNode: Node | null = null;
        try {
            const scene = director.getScene();
            const canvas = scene?.getChildByName('Canvas');

            if (!canvas) {
                throw new Error("Canvas 를 찾을 수 없음!");
            }

            // step 1. AR RootNode 생성
            rootNode = createARRootNode(name, canvas);

            // step 2. resource map 생성 ( ar 에서 사용하는 모든 spriteFrame map)
            const atlasPaths = jsonData.config_file_path || [];
            const resourceMap = await createResourceMap( atlasPaths, [], imageDestUrl );

            // step 3. bone tree 구조 생성
            const armatureData = jsonData.armature_data && jsonData.armature_data[0];
            const { nodePathMap, nodeDict } = await buildArmatureTree(armatureData, rootNode);

            // step 4. skin node 생성 ( 본과 다른 root 에 같은 계층으로 생성 )
            const destDir = await ensureFolder(animDestUrl, name);
            await buildAllSkinNode(armatureData, nodeDict, destDir, jsonData, resourceMap );

            // step 5. 에니메이션 클립 생성
            const animationData = jsonData.animation_data && jsonData.animation_data[0];
            const animComp = rootNode.getComponent( Animation );
            await generateAllAnimationClip(armatureData,animationData, nodePathMap, animComp, name, destDir);

            // step 6. 프리팹 생성
            await generatePrefabFromSceneNode({
                nodeUUID : rootNode.uuid,
                targetUrl: destUrl
            });

        } catch (err) {
            console.error("Armature 생성 실패 : ", err);
        } finally {
            rootNode && cleanupTempNode(rootNode); 
            rootNode = null;
        }
    }
};