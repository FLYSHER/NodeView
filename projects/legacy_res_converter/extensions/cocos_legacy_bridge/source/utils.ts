// @ts-ignore
import { assetManager, SpriteFrame, path, gfx } from 'cc';
import { basename } from 'path';

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
        
        // C++의 basename 처럼 이름만 추출 // fnt. png 모두 대응하도록
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
export async function createResourceMap(atlasPathList: string[], fontPathList: string[] = []): Promise<ResourceMap> {
    const resourceMap = new ResourceMap();
    
   for (const atlasPath of atlasPathList) {
        const fileName = path.basename(atlasPath);
        const atlasUrl = `db://assets/${fileName}`;
        
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
        const fontUrl = `db://assets/${path.basename(fontPath)}`;
        
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

    const nodeUuid = node.uuid;
    // @ts-ignore
    Editor.Selection.unselect('node', nodeUuid);
    node._prefab = null;
    node.parent = null;
    node.destroy();
    // @ts-ignore
    Editor.Message.send('scene', 'node-destroyed', nodeUuid);
    // @ts-ignore
    Editor.Message.send('scene', 'change-node-hierarchy', nodeUuid);
}