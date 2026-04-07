// @ts-ignore
import { assetManager, SpriteFrame, path, gfx } from 'cc';
import { basename } from 'path';
import { readFileSync, writeFileSync } from "fs-extra";

/**
 * 여러 모듈에서 공통으로 사용하는 함수들.
 */

/**  선형 보간 */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * OpenGL 블렌딩 상수를 Cocos 3.x의 gfx.BlendFactor 상수로 변환합니다.
 * (Cocos Studio 및 각종 UI 블렌딩 옵션 호환용)
 */
export function mapGLBlendFactor(glFactor: number): number {
    switch(glFactor) {
        case 0: return gfx.BlendFactor.ZERO;
        case 1: return gfx.BlendFactor.ONE;
        case 768: return gfx.BlendFactor.SRC_COLOR;
        case 769: return gfx.BlendFactor.ONE_MINUS_SRC_COLOR;
        case 770: return gfx.BlendFactor.SRC_ALPHA;
        case 771: return gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
        case 772: return gfx.BlendFactor.DST_ALPHA;
        case 773: return gfx.BlendFactor.ONE_MINUS_DST_ALPHA;
        case 774: return gfx.BlendFactor.DST_COLOR;
        case 775: return gfx.BlendFactor.ONE_MINUS_DST_COLOR;
        case 776: return gfx.BlendFactor.SRC_ALPHA_SATURATE;
        default: return gfx.BlendFactor.SRC_ALPHA; // 기본값
    }
}

export class ResourceMap extends Map<string, {frameUUID?: string, atlasUUID?: string, fontUUID?: string}> {
    
    /** * 파일 경로에서 이름만 추출하여 리소스를 찾는 커스텀 함수
     * 예: "res/image.png" -> "image" 키로 검색
     */
    getResData(rawPath: string ) {
        if (!rawPath) return null;
        

        const name = path.basename(rawPath).replace(/\.(png|fnt)$/, '');
        const data = this.get(name);
        
        if (!data) {
            console.warn(`[ResourceMap] 리소스를 찾을 수 없음: ${name} (Path: ${rawPath})`);
            return null;
        }
        
        return data;
    }

    getFontData(rawPath: string) {
        if (!rawPath) return null;
        
        const name = path.basename(rawPath).replace('fnt', '');
        const data = this.get(name);

        if (!data) {
            console.warn(`[ResourceMap] 리소스를 찾을 수 없음: ${name} (Path: ${rawPath})`);
            return null;
        }

        return  data || null;
    }

}

// plist 배열을 넘기면 base 이름으로 관련 spriteFrame name - uuid 맵 생성
// atlas 도 에디터에 세팅하기 위해 uuid 넣자..
export async function createResourceMap(atlasPathList: string[], fontPathList: string[] = [], imageDestUrl: string): Promise<ResourceMap> {
    const resourceMap = new ResourceMap();
    
   for (const atlasPath of atlasPathList) {
        const fileName = path.basename(atlasPath);
        const atlasUrl = `${imageDestUrl}/${fileName}`;
        // const atlasUrl = `db://assets/${fileName}`;
        
        // @ts-ignore
        // atlas uuid 도 넘긴다.
        const atlasInfo: any = await Editor.Message.request('asset-db', 'query-asset-info', atlasUrl );
        const atlasUUID = atlasInfo ? atlasInfo.uuid : null;

        // asset-db 에서 아틀라스 내의 스프라이트프레임 요청시에 url : 'db://assets/A.plist/B01.png' 형태로 요청해야 함.
        // @ts-ignore
        const subAssets: any = await Editor.Message.request('asset-db', 'query-assets', {
            pattern: `${atlasUrl}/*`,
            ccType: 'cc.SpriteFrame'
        });

        if (subAssets) {
            subAssets.forEach((asset: any) => {
                const existing = resourceMap.get(asset.name) || {};

                resourceMap.set(asset.name, {
                    ...existing,
                    frameUUID: asset.uuid,
                    atlasUUID: atlasUUID,
                });
            });
        }
    }

    // 
    for(const fontPath of fontPathList){
        // const fontUrl = `db://assets/${path.basename(fontPath)}`;
        const fontUrl = `${imageDestUrl}/${basename(fontPath)}`;
        
        // @ts-ignore
        const fontInfo: any = await Editor.Message.request('asset-db', 'query-asset-info', fontUrl);

        if (fontInfo) {
            const name = path.basename(fontPath).replace('.fnt', '');
            const existing = resourceMap.get(name) || {};

            // 💡 폰트 이름으로 UUID 저장
            resourceMap.set(name, { 
                ...existing,    // 기존 데이터 유지 (ex: frameUUID가 이미 있었다면 유지됨)
                fontUUID: fontInfo.uuid 
            });
        }
    }
    
    return resourceMap;
}

/** asset-db 에서 에셋 로드 */
export async function loadAssetByUUID(uuid: string): Promise<any> {
    return new Promise((resolve, reject) => {
        assetManager.loadAny(uuid, (err: any, asset: any) => {
            if (err) {
                console.error(`[Utils] 에셋 로드 실패 (UUID: ${uuid}):`, err);
                reject(err);
            } else {
                resolve(asset);
            }
        });
    });
}

/** 씬에서 임시 노드 청소 (유령 노드 방지) */
export function cleanupTempNode(node: any) {
    if (!node) return;

    const nodeUUID = node.uuid;

    // @ts-ignore
    Editor.Selection.unselect('node', nodeUUID);
    node._prefab = null;
    node.parent = null;
    node.destroy();
    // @ts-ignore
    Editor.Message.send('scene', 'node-destroyed', nodeUUID);
    // @ts-ignore
    Editor.Message.send('scene', 'change-node-hierarchy', nodeUUID);
}

// 9-sliced capInsets 를 새 엔진 버전의 속성으로 세팅
// legacy : 늘어나는 영역 세팅 ( x,y,w,h 로 rect 세팅 )
// 3.8.x : 늘어나지 않아야 할 영역 ( top, bottom, left, right )
export function applyScale9Insets(spriteFrame: any, options: any) {
    if (!spriteFrame) return;

    const texW = spriteFrame.originalSize.width;
    const texH = spriteFrame.originalSize.height;

    // legacy : 기존  늘어나는 rect 속성
    const capX = options.capInsetsX ?? 0;
    const capY = options.capInsetsY ?? 0;
    const capW = options.capInsetsWidth ?? texW;
    const capH = options.capInsetsHeight ?? texH;

    // 자를 영역(Width/Height)이 없으면 9-Slice 의 의미가 없으므로 스킵
    if (capW === 0 && capH === 0) return;

    // CC 3.x의 SpriteFrame 속성에 직접 마진(Margin) 값을 주입합니다.
    spriteFrame.insetLeft = capX;
    spriteFrame.insetTop = capY;
    spriteFrame.insetRight = Math.max(0, texW - capX - capW);
    spriteFrame.insetBottom = Math.max(0, texH - capY - capH);
}

export async function apply9ScaleToMeta(resourceMap: ResourceMap, jsonData: any) {
    // 🚨 [수정] opt만 저장하지 않고, 파일을 찾을 때 쓸 fileUUID(부모 UUID)도 함께 저장합니다.
    const patchMap = new Map<string, {opt: any, fileUUID: string}>();

    function traverse(node: any) {
        const opt = node.options;
        if (opt) {
            // 1. 일반 ImageView의 9-Slice
            if (opt.scale9Enable && opt.fileNameData?.path) {
                const res = resourceMap.getResData(opt.fileNameData.path);
                if (res?.frameUUID) {
                    // 아틀라스에 속해있다면 atlasUUID를, 아니면 본인 UUID를 사용
                    patchMap.set(res.frameUUID, { opt, fileUUID: res.atlasUUID || res.frameUUID });
                }
            }
            // 2. Panel의 배경 이미지 9-Slice
            if (opt.backGroundScale9Enable && opt.backGroundImageData?.path) {
                const res = resourceMap.getResData(opt.backGroundImageData.path);
                if (res?.frameUUID) {
                    patchMap.set(res.frameUUID, { opt, fileUUID: res.atlasUUID || res.frameUUID });
                }
            }
        }
        if (node.children) node.children.forEach(traverse);
    }

    const rootWidget = jsonData.widgetTree || jsonData.nodeTree || jsonData;
    traverse(rootWidget);

    for (const [frameUUID, data] of patchMap.entries()) {
        const { opt, fileUUID } = data;

        // 🚨 [핵심 해결] 가상 에셋(frameUUID)이 아닌, 실제 존재하는 물리적 파일(fileUUID)로 경로를 찾습니다!
        // @ts-ignore
        const assetInfo = await Editor.Message.request('asset-db', 'query-asset-info', fileUUID);

        if (!assetInfo || !assetInfo.file) continue;

        const metaPath = assetInfo.file + '.meta';
        try {
            const metaStr = readFileSync(metaPath, 'utf8');
            const metaObj = JSON.parse(metaStr);
            let subMeta = null;

            if (metaObj.subMetas) {
                for (const key in metaObj.subMetas) {
                    if (metaObj.subMetas[key].uuid === frameUUID) {
                        subMeta = metaObj.subMetas[key];
                        break;
                    }
                }
            }

            if (subMeta && subMeta.userData) {
                const userData = subMeta.userData;

                const texW = userData.rawWidth || userData.width || 100;
                const texH = userData.rawHeight || userData.height || 100;

                const capX = opt.capInsetsX ?? 0;
                const capY = opt.capInsetsY ?? 0;
                const capW = opt.capInsetsWidth ?? texW;
                const capH = opt.capInsetsHeight ?? texH;

                if (capW === 0 && capH === 0) continue;

                const bL = capX;
                const bT = capY;
                const bR = Math.max(0, texW - capX - capW);
                const bB = Math.max(0, texH - capY - capH);

                if (userData.borderLeft !== bL || userData.borderTop !== bT ||
                    userData.borderRight !== bR || userData.borderBottom !== bB) {

                    userData.borderLeft = bL;
                    userData.borderTop = bT;
                    userData.borderRight = bR;
                    userData.borderBottom = bB;

                    writeFileSync(metaPath, JSON.stringify(metaObj, null, 2));
                    console.log(`[Meta Patch] 9-Slice 기록 완료: ${subMeta.name} (L:${bL}, T:${bT}, R:${bR}, B:${bB})`);
                }
            }
        } catch (e) {
            console.error("[apply9ScaleToMeta] Meta patch error:", e);
        }
    }
}