import { resources, SpriteAtlas, Sprite, Node, isValid, error, log } from 'cc';

// assets/lib/foo.ts
export function util() {
    console.log(" [Foo] util 함수가 정상적으로 실행되었습니다! ");
}

export class AssetUtils {

    /**
     * resources 폴더에 있는 .plist(Atlas)를 로드하고, 특정 프레임을 노드의 Sprite에 적용합니다.
     * @param atlasPath resources 폴더 기준 경로 (확장자 제외 권장, 예: "UI/MainAtlas")
     * @param frameName 아틀라스 내부의 이미지 이름 (예: "btn_ok" 또는 "btn_ok.png")
     * @param target 적용할 대상 (Node 또는 Sprite 컴포넌트)
     * @param onComplete (선택) 로드 완료 후 실행할 콜백
     */
    public static loadAndSetFrame(
        atlasPath: string, 
        frameName: string, 
        target: Node | Sprite, 
        onComplete?: (success: boolean) => void
    ) {
        // 1. 대상이 유효한지 체크
        if (!target || !isValid(target)) {
            console.warn('[AssetUtils] Target is invalid.');
            return;
        }

        // 2. Sprite 컴포넌트 확보
        let spriteComp: Sprite | null = null;
        if (target instanceof Node) {
            spriteComp = target.getComponent(Sprite);
            // 스프라이트가 없으면 새로 붙여줌 (옵션)
            if (!spriteComp) spriteComp = target.addComponent(Sprite);
        } else {
            spriteComp = target;
        }

        // 3. 경로 보정 (혹시 .plist가 붙어있다면 제거)
        const cleanPath = atlasPath.replace('.plist', '');

        // 4. 리소스 로드
        resources.load(cleanPath, SpriteAtlas, (err, atlas) => {
            // 로딩 도중 노드가 파괴되었으면 중단
            if (!isValid(spriteComp?.node)) return;

            if (err) {
                error(`[AssetUtils] Failed to load atlas: ${cleanPath}`, err);
                if (onComplete) onComplete(false);
                return;
            }

            // 5. 프레임 찾기 (이름 그대로 찾거나, 없으면 .png 붙여서 시도)
            let frame = atlas.getSpriteFrame(frameName);
            
            // Cocos Studio 등에서 온 데이터는 확장자가 생략된 경우가 있어 예외 처리
            if (!frame && !frameName.endsWith('.png')) {
                frame = atlas.getSpriteFrame(frameName + ".png");
            }

            if (frame) {
                spriteComp!.spriteFrame = frame;
                if (onComplete) onComplete(true);
            } else {
                log(`[AssetUtils] Frame not found: ${frameName} inside ${cleanPath}`);
                if (onComplete) onComplete(false);
            }
        });
    }
}