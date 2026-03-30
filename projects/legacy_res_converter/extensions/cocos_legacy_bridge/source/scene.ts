// @ts-ignore
import { Node, Layers, director, Animation } from 'cc';
declare const cce : any;

import { loadAssetByUUID, cleanupTempNode } from './utils';
import { buildNodeTree } from './ui-builder';
import { buildUIAnimations } from './ui-action-builder';
import { buildArmatureTree, generateAllAnimationClip, buildSkinRenderers } from './armature-builder';

import { json } from 'stream/consumers';
import { createResourceMap } from './utils';

// 프리팹 생성 - 실제 노드를 씬에 올린 뒤 에디터 명령으로 굽는 방식
async function _generatePrefabFromSceneNode( args: any ) {
    const { nodeUUID, targetUrl } = args;
    console.log( "_generatePrefabFromSceneNode : ", nodeUUID, targetUrl );

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

/**
 * Methods
 */
export const methods = {

    // UI 프리팹 생성
    async createCCStudioUIPrefab(args: any) {
        const { name, destUrl, jsonData } = args;
        let rootNode = null;

        console.log("createPrefabFromExportJson : ", name, destUrl );

        try {
            const scene = director.getScene();
            const canvas = scene?.getChildByName('Canvas');

            if( !canvas ) {
                throw new Error("canvas 를 찾을 수 없음!");
            }

            rootNode = new Node( name );
            rootNode.layer = Layers.Enum.UI_2D;
            rootNode.parent = canvas;

            function collectBMFontPaths(node: any, paths: Set<string>) {
                if (node.classname === "LabelBMFont" && node.options?.fileNameData?.path) {
                    paths.add(node.options.fileNameData.path);
                }
                if (node.children) {
                    node.children.forEach((child: any) => collectBMFontPaths(child, paths));
                }
            }

            const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
            // const children = rootWidget.children || [];
            const children = [...(rootWidget.children || [])]; // sort 를 위해 복사본 만든다.

            // 💡 리소스 맵 딱 한 번 생성
            const atlasPaths = jsonData.textures || [];
           // 💡 직접 트리에서 폰트 경로들을 수집합니다.
            const fontPathSet = new Set<string>();
            collectBMFontPaths(rootWidget, fontPathSet);
            const fontPaths = Array.from(fontPathSet);
            console.log("fontPaths > ", fontPaths );
            const spriteFrameMap = await createResourceMap(atlasPaths, fontPaths);

            // ui action
            // 💡 [추가] 애니메이션(액션 리스트)이 존재하는지 확인합니다.
            const hasAnimation = jsonData.animation && jsonData.animation.actionlist && jsonData.animation.actionlist.length > 0;

            // 💡 [추가] 애니메이션이 있을 때만 Map을 생성하고, 없으면 undefined!
            const uiActionNodeMap = hasAnimation ? new Map<number, string>() : undefined;

            // 루트 위젯 order
            children.sort((a: any, b: any) => {
                const zA = a.options?.ZOrder ?? 0;
                const zB = b.options?.ZOrder ?? 0;
                return zA - zB;
            });

            for (let i = 0; i < children.length; i++) {
                const child = children[i];
                await buildNodeTree(child, rootNode, spriteFrameMap, uiActionNodeMap,""); // _buildNodeTree -> buildNodeTree
            }

            if (hasAnimation) {
                // console.log("🎯 애니메이션 감지됨! ActionTag Map 구축 완료 (크기):", uiActionNodeMap?.size);
                await buildUIAnimations(rootNode, jsonData, uiActionNodeMap!);
            }

            const prefabUrl = `db://assets/${name}.prefab`;
        
            await _generatePrefabFromSceneNode({
                nodeUUID : rootNode.uuid,
                targetUrl: prefabUrl  
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

    // Animation 프리팹 생성  
    async createArmaturePrefab(args: any ) {
        const { name, destUrl, jsonData } = args;
        let rootNode: Node | null = null;

        console.log("[scene] createArmaturePrefab 시작 : ", name);

        try {
            const scene = director.getScene();
            const canvas = scene?.getChildByName('Canvas');

            if (!canvas) throw new Error("Canvas를 찾을 수 없음!");

            // step 1. 루트 노드 생성 및 Animation 컴포넌트 부착
            rootNode = new Node(name);
            rootNode.layer = Layers.Enum.UI_2D;
            rootNode.parent = canvas;

            const animComp = rootNode.addComponent( Animation ); // 에니메이션 컴포넌트 추가

            // exportJson 
            const destDir = destUrl.substring(0, destUrl.lastIndexOf('/'));
            const armatureData = jsonData.armature_data && jsonData.armature_data[0];
            const animationData = jsonData.animation_data && jsonData.animation_data[0];
            const atlasPaths = jsonData.config_file_path || [];
            
            const resourceMap = await createResourceMap( atlasPaths );
          
            // 노드 hierarchy 구성, 리소스경로 맵 구성
            const { nodePathMap, nodeDict } = await buildArmatureTree(armatureData, rootNode);
            console.log("🎯 Armature 뼈대 구축 완료!");
            
            // 각각의 노드 ( 기존 Bone 개념 ) 에 skin 데이터 세팅
            await buildSkinRenderers(armatureData, nodeDict, destDir, jsonData, resourceMap );
            console.log("👗 Armature 스킨 부착 완료!");

            //에니메이션 클립 포팅, 프리팹 생성 
            await generateAllAnimationClip(armatureData,animationData, nodePathMap, animComp, name, destDir);

            // 4. 프리팹 굽기
            const prefabUrl = `db://assets/${name}.prefab`;
            await _generatePrefabFromSceneNode({
                nodeUUID : rootNode.uuid,
                targetUrl: prefabUrl
            });
        } catch (err) {
            console.error("Armature 생성 실패 : ", err);
        } finally {
            rootNode && cleanupTempNode(rootNode); 
            rootNode = null;
        }
    }
};