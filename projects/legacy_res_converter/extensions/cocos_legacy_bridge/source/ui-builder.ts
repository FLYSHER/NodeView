//@ts-ignore
import { Node, Layers, UITransform, Size, Vec2, Sprite, path, Button, Label, Color, UIOpacity, HorizontalTextAlignment, VerticalTextAlignment } from 'cc';
import { basename } from 'path';
import { ResourceMap, loadAssetByUUID } from './utils';
import { receiveMessageOnPort } from 'worker_threads';


/**
 *  className
 *  name
 *  animation
 *  designScale 
 *  designHeight
 *  designWidth
 *  textures
 *  texturesPng
 *  widgetTree
 *      classname
 *      name
 *      children
 *      options
 *          classname, name, ZOrder, anchorPointX/Y, colorR/G/B, width, height, rotation, scaleX/Y, visible ...
 *  
 */

// UI 노드트리 구성
// animation 정보가 있다면 노드맵 구성
export async function buildNodeTree(jsonData: any, parentNode: Node, resourceMap: ResourceMap,
                                     uiActionNodeMap?:Map<number, string>, currentPath: string="")
{
    if (!jsonData) return;

    const options = jsonData.options || {};
    const classname = jsonData.classname;
    const nodeName = options.name || jsonData.name || "UnnamedNode";
    const nodePath = currentPath ? `${currentPath}/${nodeName}` : nodeName;

    // ui action 에 쓰일 노드는 루트로부터의 경로를 uiActionNodeMap 에 넣는다.
    if( uiActionNodeMap && options.actiontag >= 0 ) {
        uiActionNodeMap.set( options.actiontag, nodePath );
    }

    // 루트 노드 생성
    const currentNode = new Node(nodeName);
    currentNode.layer = Layers.Enum.UI_2D;
    currentNode.parent = parentNode;

    // 공통 옵션 세팅
    setupCommonOptions(currentNode, options );

    // 위젯별 포팅
    switch(classname) {
        case "Panel":
            setupUIPanel( currentNode, options );
            break;
        case "ImageView":
            await setupImageView( currentNode, options, resourceMap );
            break;
        case "Button":
            await setupButton(currentNode, options, resourceMap );
            break;
        case "Text": // 시스템 폰트
        case "Label": // 🚨 신버전 Cocos Studio 대응 (여기로 걸려들어옵니다!)
            await setupLabel(currentNode, options, resourceMap, false);
            break;  
        case "LabelBMFont": // BM 폰트
            await setupLabel(currentNode, options, resourceMap, true);
            break;
    }


    // const children = jsonData.children || [];
    const children = [...(jsonData.children || [])]; // sort 위해 복사본

    // child 트리 순서 미리 변경
    children.sort((a:any, b:any)=>{
        const zA = a.options!.ZOrder ?? 0;
        const zB = b.options!.ZOrder ?? 0;
        return zA - zB;
    });

    for (const child of children) {
        await buildNodeTree(child, currentNode, resourceMap, uiActionNodeMap, nodePath);
    }
    return currentNode;
}


// 공통 옵션 세팅 ( UITransform )
function setupCommonOptions(node: Node, options: any) {
    // UITransform 추가
    const uiTransform = node.getComponent(UITransform) || node.addComponent(UITransform);
    
    // Size 설정
    uiTransform.setContentSize(new Size(options.width ?? 0, options.height ?? 0));

    // anchor 세팅
    uiTransform.setAnchorPoint(new Vec2(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5));
    
    // pos, rotation, scale
    node.setPosition(options.x ?? 0, options.y ?? 0);

    let scaleX = options.scaleX ?? 1;
    let scaleY = options.scaleY ?? 1;
    if (options.flipX) scaleX *= -1;
    if (options.flipY) scaleY *= -1;
    node.setScale(scaleX, scaleY);

    let rot = options.rotation ?? 0;
    if (options.rotationSkewX !== undefined) {
        rot = options.rotationSkewX;
    }
    node.setRotationFromEuler(0, 0, -rot);
    node.active = options.visible ?? true;  // visible 세팅

    if (options.opacity !== undefined && options.opacity < 255) {
        const uiOpacity = node.addComponent(UIOpacity);
        uiOpacity.opacity = options.opacity;
    }
}

// UIPanel
function setupUIPanel(node: Node, options: any) {
    // 클리핑 세팅
    if( options.clipAble ) {
        // node.addComponent(Mask);
    }

    // 배경색 및 배경 opacity 세팅은 필요하면 나중에..
    // Layout 정렬 기능 필요하면 나중에..
}

/**
 *  options 
 *      fileNameData 
 *          path : "A.png"
 *          plistFile : ""
 *          resourceType : number 
 */
async function setupImageView(node: Node, options: any, resourceMap: ResourceMap){
    // 스프라이트 컴포넌트 추가
    const sprite = node.addComponent(Sprite);

    // ignoreSize 값에 따라 sizeMode 세팅
    // Sprite.SizeMode
    //      RAW : 리소스 크기에 맞춰 세팅
    //      TRIMMED : 이미지 투명부분 제외
    //      CUSTOM  : 직접 설정
    if( options.ignoreSize === false ) {
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    }
    else {
        sprite.sizeMode = Sprite.SizeMode.RAW
    }

    // 9-scale
    if (options.scale9Enable) {
        sprite.type = Sprite.Type.SLICED; // 인셋 값이 있다면 설정 (상세 수치는 데이터 구조에 따라 보정 필요)
    } else {
        sprite.type = Sprite.Type.SIMPLE;
    }

   if (options.fileNameData?.path) {
        const resData = resourceMap.getResData( options.fileNameData.path );
        console.log( "resData : ", options.fileNameData.path, resData );

        // @ts-ignore
        const loc_spriteFrame = await loadAssetByUUID( resData?.frameUUID );
        sprite.spriteFrame = loc_spriteFrame;
        console.log( "loc_spriteFrame : ", loc_spriteFrame );

        if(loc_spriteFrame) {
            // 에디터에 아틀라스 명시적으로 세팅
            // @ts-ignore
            const loc_atlas = await loadAssetByUUID( resData?.atlasUUID );
            if(loc_atlas) {
                sprite.spriteAtlas = loc_atlas;
            }

            // @ts-ignore
            sprite._applySpriteFrame && sprite._applySpriteFrame(loc_spriteFrame); 

            // @ts-ignore
            sprite.markForUpdateRenderData();

            // 추가로, Sliced 모드일 때 크기가 0이면 안 보이므로 크기 체크
            // const uiTrans = node.getComponent(UITransform);
            // console.log(`Node Size: ${uiTrans?.width}, ${uiTrans?.height}`);

            // 씬 뷰에서 즉시 활성화 (가끔 발생하는 에디터 버그 방지)
            node.active = false;
            node.active = options.visible ?? true;
        }

    }
}

/**
 *  버튼 UI 세팅
 *      Sprite Component
 *      Button Component
 */
async function setupButton(node:Node, options: any, resourceMap: ResourceMap) {

    // 버튼은 기본적으로 이미지를 보여주기 위해 Sprite가 필요합니다.
    const sprite = node.addComponent(Sprite);
    const button = node.addComponent(Button);
    
    button.target = node;   // target 노드를 자기 자신으로 지정해야 SpriteFrame 교체가 정상적으로 일어납니다.

    // Button.Transition ( 버튼 클릭 시 효과 타입)
    //      NONE    : 버튼 이벤트만.. 시각적 변환 없음
    //      COLOR   : 상태에 따라 색상 설정 
    //      SPIRTE  : 상태에 따라 스프라이트 프레임 변경
    //      SCALE   : 상태에 따라 zoom scale 
    button.transition = Button.Transition.SPRITE;
    sprite.sizeMode = Sprite.SizeMode.CUSTOM;

    
    // Normal
    if(options.normalData?.path) {
        // Sprite 컴포넌트에 atlas 및 spriteFrame에 normal 을 세팅
        const resData = resourceMap.getResData(options.normalData.path);

        //@ts-ignore
        const atlas = await loadAssetByUUID(resData?.atlasUUID);
        
        //@ts-ignore
        const sf_normal = await loadAssetByUUID(resData?.frameUUID);

        sprite.spriteAtlas = atlas;
        sprite.spriteFrame = sf_normal;

        button.normalSprite = sf_normal;
    }

    // Pressed
    if (options.pressedData?.path) {
        const resData = resourceMap.getResData(options.pressedData.path);

        //@ts-ignore
        const sf_pressed = await loadAssetByUUID(resData?.frameUUID);
        if (sf_pressed) button.pressedSprite = sf_pressed;
    }


    // disabled
    if (options.disabledData?.path) {
        const resData = resourceMap.getResData(options.disabledData.path);

        //@ts-ignore
        const sf_disabled = await loadAssetByUUID(resData?.frameUUID);
        if (sf_disabled) button.pressedSprite = sf_disabled;
    }

    // 5. 버튼 활성화 여부 세팅
    // 버튼 사용 가능 여부 -> 이 플래그에 따라 disabledSprite 에 등록한 이미지 출력
    button.interactable = options.displaystate ?? true;
}

/**
 *  Label( SystemFont, BMFont )
 *     cocos creator에서는 label 컴포넌트로 통합함
 */
async function setupLabel(node:Node, options: any, resourceMap: ResourceMap, isBMFont: boolean) {
    const label = node.addComponent(Label);
    const uiTransform = node.getComponent(UITransform) || node.addComponent(UITransform);

    label.string = options.text || "";

    // BMFont or SystemFont ?
    if (isBMFont && options.fileNameData?.path) {
        const resData = resourceMap.getResData(options.fileNameData.path);
        if (resData?.fontUUID) {
            const fontAsset = await loadAssetByUUID(resData.fontUUID);
            if (fontAsset) {
                label.font = fontAsset;

                // BMFont일 때: 원본 사이즈를 유지하려면 fontSize를 설정하지 않거나 
                // 원본 .fnt 제작 사이즈와 Studio 설정 사이즈를 맞춰야 합니다.
                // 보통 BMFont는 FontSize를 설정하면 해당 크기로 '리샘플링' 됩니다.
                const size = options.fontSize || 32; 
                label.fontSize = size;
                label.lineHeight = size;
            }
        }
    } else {
        label.fontSize = options.fontSize || 20;    // 일반 Text(시스템 폰트)일 경우 fontSize 적용
        label.lineHeight = options.fontSize || 20;  // 라인 높이는 보통 폰트 크기와 맞추거나 약간 크게 설정
    }

    // Alignment
    //      Horizontal: 0(Left), 1(Center), 2(Right)
    //      Vertical: 0(Top), 1(Center), 2(Bottom)
    // label.horizontalAlign = options.hAlignment ?? HorizontalTextAlignment.CENTER;
    // label.verticalAlign = options.vAlignment ?? VerticalTextAlignment.CENTER;
    label.horizontalAlign = options.hAlignment; // ?? HorizontalTextAlignment.LEFT;
    label.verticalAlign = options.vAlignment; //?? VerticalTextAlignment.TOP;

    // Label.Overflow
    //      NONE : 텍스트 길이에 맞춰 content size 가 변경
    //      CLAMP : 영역 벗어나면 글자 자름
    //      SHRINK : 영역 벗어나면 폰트크기 자동으로 줄임
    //      RESIZE_HEIGHT : 영역 벗어나면 가로는 고정, 높이 자동으로 늘임
    
    label.enableWrapText = false;           // 자동 줄바꿈은 안되게 한다.
    label.overflow  = Label.Overflow.NONE;  // 영역을 벗어나면 contentSize 자동 조절

    // uiTransform && uiTransform.setAnchorPoint(0.5, 0.5);

    if(options.colorR !== undefined) {
        label.color = new Color(options.colorR ?? 255, options.colorG ?? 255, options.colorB ?? 255, 255);
    }

    // @ts-ignore
    label.markForUpdateRenderData();
}