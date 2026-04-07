//@ts-ignore
import { Node, Layers, UITransform, Size, Vec2, Sprite, path, Button, Label, Color, UIOpacity, ProgressBar, ScrollView, PageView, Mask, Layout, EditBox, Widget, HorizontalTextAlignment, VerticalTextAlignment, Toggle, Slider } from 'cc';
import { basename } from 'path';
import { ResourceMap, loadAssetByUUID, applyScale9Insets } from './utils';
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

    let targetContainer = currentNode;
    let childPathPrefix = nodePath;

    // 위젯별 포팅
    switch(classname) {
        case "Panel":
            await setupUIPanel( currentNode, options, resourceMap );
            break;
        case "ScrollView":
            targetContainer = setupScrollView(currentNode, options);
            childPathPrefix = `${nodePath}/view/content`;
            break;
        case "PageView":
            targetContainer = setupPageView(currentNode, options);
            childPathPrefix = `${nodePath}/view/content`;
            break;
        case "ListView":
            targetContainer = setupListView(currentNode, options);
            childPathPrefix = `${nodePath}/view/content`;
            break;
        case "ImageView": // className === "Sprite" 문의 필요.
            await setupImageView( currentNode, options, resourceMap );
            break;
        case "Button":
            await setupButton(currentNode, options, resourceMap );
            break;
        case "Text":
        case "Label": // 3.8.x 버전부터는 같은 위젯에 속성으로 BMFont / system font 나눈다.
            await setupLabel(currentNode, options, resourceMap, false);
            break;  
        case "LabelBMFont": // BM 폰트
            await setupLabel(currentNode, options, resourceMap, true);
            break;
        case "LoadingBar":
            await setupLoadingBar(currentNode, options, resourceMap);
            break;
        case "TextField":
            setupTextField(currentNode, options);
            break;
        case "CheckBox":
            await setupCheckBox(currentNode, options, resourceMap);
            break;
        case "Slider":
            await setupSlider(currentNode, options, resourceMap);
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
        await buildNodeTree(child, targetContainer, resourceMap, uiActionNodeMap, childPathPrefix);
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
async function setupUIPanel(node: Node, options: any, resourceMap: ResourceMap) {
    // 클리핑 세팅
    if( options.clipAble ) {
        const mask = node.getComponent(Mask) || node.addComponent(Mask);
        mask.type = Mask.Type.GRAPHICS_RECT;
    }

    const nodeTrComp = node.getComponent(UITransform);
    const w = nodeTrComp?.width || 0;
    const h = nodeTrComp?.height || 0;
    const anchorX = nodeTrComp?.anchorPoint.x || 0;
    const anchorY = nodeTrComp?.anchorPoint.y || 0;

    const centerX = (0.5 - anchorX) * w;
    const centerY = (0.5 - anchorY) * h;

    // 패널에 백그라운드 이미지 세팅 시 대응
    if(options.backGroundImageData && options.backGroundImageData.path ) {
        // 배경 전용 노드 생성
        const bgNode = new Node("backgroundImage");
        bgNode.layer = Layers.Enum.UI_2D;
        bgNode.parent = node;
        bgNode.setSiblingIndex(0); // 가장 밑에 그려지게..
        bgNode.setPosition(centerX, centerY);

        const bgSprite = bgNode.addComponent(Sprite);

        const resData = resourceMap.getResData(options.backGroundImageData.path);
        if( resData?.frameUUID ) {
            const sf = await loadAssetByUUID( resData.frameUUID );
            if(sf) {
                bgSprite.spriteFrame = sf;

                if(options.backGroundScale9Enable){
                    //9-sliced 일 경우에는 패널 크기만큼 늘린다.
                    bgSprite.type = Sprite.Type.SLICED;
                    bgSprite.sizeMode = Sprite.SizeMode.CUSTOM;
                    const bgTrComp = bgNode.getComponent(UITransform) || bgNode.addComponent(UITransform);
                    bgTrComp.setContentSize(w, h);

                    applyScale9Insets(sf, options);
                }
                else{
                    // 일반 이미지는 원본사이즈로
                    bgSprite.type = Sprite.Type.SIMPLE;
                    bgSprite.sizeMode = Sprite.SizeMode.RAW;
                    // 🚨 [수정] 잘려 나간 투명 여백을 복구하여 중심점이 위로 쏠리는 것을 막습니다!
                    bgSprite.trim = false;

                    // // 패널 사이즈보다 스프라이트 크기가 크다면
                    // // 원본비율 유지하면서 패널안에 들어가도록 처리(Aspect Fit)
                    // bgSprite.type = Sprite.Type.SIMPLE;
                    // bgSprite.sizeMode = Sprite.SizeMode.CUSTOM;
                    //
                    // // 원본 텍스처 사이즈
                    // const texW = sf.originalSize.width;
                    // const texH = sf.originalSize.height;
                    //
                    // // 패널(w, h)에 맞추기 위한 축소 비율 계산
                    // let scale = 1;
                    // if (texW > 0 && texH > 0) {
                    //     // 가로/세로 중 더 많이 튀어나온 쪽에 맞춰서 축소 비율을 정합니다.
                    //     scale = Math.min(w / texW, h / texH);
                    // }
                    //
                    // // 계산된 최종 사이즈 적용!
                    // // const bgTrComp = bgNode.getComponent(UITransform) || bgNode.addComponent(UITransform);
                    // // bgTrComp.setContentSize(texW * scale, texH * scale);
                    //
                    // const bgTrComp = bgNode.getComponent(UITransform) || bgNode.addComponent(UITransform);
                    // bgTrComp.setContentSize(texW, texH);
                }

                // 🚨 방어 코드 추가: 에디터에서 배경 이미지가 즉시 보이도록 강제 업데이트!
                // @ts-ignore
                bgSprite._applySpriteFrame && bgSprite._applySpriteFrame(sf);
                // @ts-ignore
                bgSprite.markForUpdateRenderData();
            }
        }
    }
    else if( options.colorType === 1 ) { // solid 세팅 시
        const bgNode = new Node("BackgroundColor");
        bgNode.layer = Layers.Enum.UI_2D;
        bgNode.parent = node;
        bgNode.setSiblingIndex(0);

        const sprite = bgNode.addComponent(Sprite);
        sprite.color = new Color(
            options.bgColorR ?? 255,
            options.bgColorG ?? 200,
            options.bgColorB ?? 150,
            options.bgColorOpacity ?? 255
        );
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const bgTrans = bgNode.addComponent(UITransform);
        bgTrans.setContentSize(w, h);
        bgNode.setPosition(centerX, centerY);
    }

    // 배경색 및 배경 opacity 세팅은 필요하면 나중에..
    // Layout 정렬 기능 필요하면 나중에..
}

function setupScrollView(node: Node, options: any){
    const scrollViewComp = node.addComponent(ScrollView);

    // 바운스(끝에서 튕기는 효과) 설정
    scrollViewComp.bounceDuration = 0.5;
    scrollViewComp.elastic = options.bounceEnable ?? true;

    // 스크롤 방향 설정 (Cocos Studio 방향 -> 1: Vertical, 2: Horizontal, 3: Both)
    const dir = options.direction ?? 1;
    scrollViewComp.vertical = (dir === 1 || dir === 3);
    scrollViewComp.horizontal = (dir === 2 || dir === 3);

    const nodeTrComp = node.getComponent(UITransform);
    const w = nodeTrComp?.width || 200;
    const h = nodeTrComp?.height || 200;
    const anchorX = nodeTrComp?.anchorPoint.x ?? 0.5;
    const anchorY = nodeTrComp?.anchorPoint.y ?? 0.5;

    // 내부 스크롤 영역(Content)의 실제 크기
    const innerWidth = options.innerWidth ?? w;
    const innerHeight = options.innerHeight ?? h;

    // --- View 노드 세팅 (마스크 영역) ---
    const viewNode = new Node("view");
    viewNode.layer = Layers.Enum.UI_2D;
    viewNode.parent = node;

    if (options.clipAble !== false) {
        const mask = viewNode.addComponent(Mask);
        mask.type = Mask.Type.GRAPHICS_RECT;
    }

    const viewTrComp = viewNode.getComponent(UITransform) || viewNode.addComponent(UITransform);
    viewTrComp.setContentSize(w, h);
    viewTrComp.setAnchorPoint(0, 0);
    // 부모(ScrollView) 앵커를 역산해서 100% 겹치게 배치
    viewNode.setPosition(-w * anchorX, -h * anchorY);

    // --- Content 노드 세팅 (실제 자식들이 붙을 도화지) ---
    const contentNode = new Node("content");
    contentNode.layer = Layers.Enum.UI_2D;
    contentNode.parent = viewNode;

    const contentTrComp = contentNode.getComponent(UITransform) || contentNode.addComponent(UITransform);
    contentTrComp.setContentSize(innerWidth, innerHeight);
    contentTrComp.setAnchorPoint(0, 0);

    // 💡 [핵심] 세로 스크롤일 경우 Content가 위(Top)에 정렬되도록 Y축 초기 위치를 보정합니다.
    if (scrollViewComp.vertical) {
        contentNode.setPosition(0, h - innerHeight);
    } else {
        contentNode.setPosition(0, 0);
    }

    // ScrollView 컴포넌트에 Content 연결
    scrollViewComp.content = contentNode;

    // 자식 위젯들은 이 contentNode 아래에 생성되어야 하므로 반환합니다.
    return contentNode;
}

function setupPageView(node: Node, options: any){
    // node 에 PageView 컴포넌트 추가
    const pageViewComp = node.addComponent(PageView);
    pageViewComp.bounceDuration = 0.5;
    pageViewComp.direction = PageView.Direction.HORIZONTAL;
    pageViewComp.sizeMode = PageView.SizeMode.UNIFIED;
    const nodeTrComp = node.getComponent(UITransform);
    const w = nodeTrComp?.width || 200;
    const h = nodeTrComp?.height || 200;
    const anchorX = nodeTrComp?.anchorPoint.x ?? 0.5;
    const anchorY = nodeTrComp?.anchorPoint.y ?? 0.5;

    // node 자식으로 실제 보이는 view 노드 생성
    const viewNode = new Node("view");
    viewNode.layer = Layers.Enum.UI_2D;
    viewNode.parent = node;
    viewNode.addComponent(Mask);
    viewNode.setPosition(-w * anchorX, -h * anchorY);

    const viewTrComp = viewNode.getComponent(UITransform) || viewNode.addComponent(UITransform);
    viewTrComp.setContentSize(w, h);
    viewTrComp.setAnchorPoint(0, 0);

    // view node 의 자식으로 page 담을 container node 생성
    // pageView 의 content 라는 개념으로 되어있어 이름을 content 로..
    const containerNode = new Node("content");
    containerNode.layer = Layers.Enum.UI_2D;
    containerNode.parent = viewNode;
    containerNode.setPosition(0, 0);

    const containerTrComp = containerNode.getComponent(UITransform) || containerNode.addComponent(UITransform);
    containerTrComp.setContentSize(w,h);
    containerTrComp.setAnchorPoint(0,0);

    const layoutComp = containerNode.addComponent(Layout);
    layoutComp.type = Layout.Type.HORIZONTAL;
    layoutComp.resizeMode = Layout.ResizeMode.CONTAINER;

    // content 연결
    pageViewComp.content = containerNode;

    return containerNode;
}

function setupListView(node: Node, options: any){
    // 1. ScrollView 기본 세팅 (앞서 만든 setupScrollView와 유사)
    const scrollViewComp = node.addComponent(ScrollView);

    scrollViewComp.bounceDuration = 0.5;
    scrollViewComp.elastic = options.bounceEnable ?? true;

    // 방향 (1: Vertical, 2: Horizontal)
    const dir = options.direction ?? 1;
    const isVertical = (dir === 1 || dir === 3);
    scrollViewComp.vertical = isVertical;
    scrollViewComp.horizontal = !isVertical;

    const nodeTrComp = node.getComponent(UITransform);
    const w = nodeTrComp?.width || 200;
    const h = nodeTrComp?.height || 200;
    const anchorX = nodeTrComp?.anchorPoint.x ?? 0.5;
    const anchorY = nodeTrComp?.anchorPoint.y ?? 0.5;

    // 2. View 노드 세팅 (마스크 영역)
    const viewNode = new Node("view");
    viewNode.layer = Layers.Enum.UI_2D;
    viewNode.parent = node;

    if (options.clipAble !== false) {
        const mask = viewNode.addComponent(Mask);
        mask.type = Mask.Type.GRAPHICS_RECT; // 최신 엔진 권장 속성
    }

    const viewTrComp = viewNode.getComponent(UITransform) || viewNode.addComponent(UITransform);
    viewTrComp.setContentSize(w, h);
    viewTrComp.setAnchorPoint(0, 0);
    viewNode.setPosition(-w * anchorX, -h * anchorY);

    // 3. Content 노드 세팅 (자식들이 쌓일 도화지)
    const contentNode = new Node("content");
    contentNode.layer = Layers.Enum.UI_2D;
    contentNode.parent = viewNode;

    const contentTrComp = contentNode.getComponent(UITransform) || contentNode.addComponent(UITransform);

    // 💡 [핵심] Layout 컴포넌트가 자식들을 추가할 때 도화지 크기를 알아서 늘리도록 설정
    const layoutComp = contentNode.addComponent(Layout);
    layoutComp.resizeMode = Layout.ResizeMode.CONTAINER;

    // 방향에 따른 정렬 및 간격(itemMargin) 세팅
    if (isVertical) {
        layoutComp.type = Layout.Type.VERTICAL;
        layoutComp.spacingY = options.itemMargin ?? 0; // 아이템 간 간격

        // 세로 리스트는 위에서 아래로 쌓이므로, Content의 기준점을 좌상단(0, 1)으로 잡고 맨 위(h)로 올립니다.
        contentTrComp.setAnchorPoint(0, 1);
        contentNode.setPosition(0, h);
    } else {
        layoutComp.type = Layout.Type.HORIZONTAL;
        layoutComp.spacingX = options.itemMargin ?? 0; // 아이템 간 간격

        // 가로 리스트는 좌에서 우로 쌓이므로, Content의 기준점을 좌상단(0, 1)으로 잡습니다.
        contentTrComp.setAnchorPoint(0, 1);
        contentNode.setPosition(0, h);
    }

    // ScrollView에 Content 연결
    scrollViewComp.content = contentNode;

    // 자식 위젯들은 이 contentNode 아래에 생성되어야 하므로 반환
    return contentNode;
}

/**
 * 전략 : 단순히 Node 에 Sprite 컴포넌트 추가
 *
 */
async function setupImageView(node: Node, options: any, resourceMap: ResourceMap){

    const sprite = node.getComponent(Sprite) || node.addComponent(Sprite); // 스프라이트 컴포넌트 추가

    // Sprite Component
    //      sizeMode : Node 의 contentSize 를 어떻게 할 것인가?
    //          ㄴ RAW :
    //          ㄴ CUSTOM :
    //          ㄴ TRIMMED :
    //      type     : 어떻게 보여줄 것인가?
    //          ㄴ SIMPLE :
    //          ㄴ SLICED :
    //          ㄴ TILED  :
    //          ㄴ FILLED :

    if( options.ignoreSize === false ) {
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    }
    else {
        sprite.sizeMode = Sprite.SizeMode.RAW
        sprite.trim = false; // 투명여백까지 포함한 사이즈를 기준으로 중심점을 잡아서, 포팅 시 같은 의도대로 진행
    }

    // 9-scale
    if (options.scale9Enable) {
        sprite.type = Sprite.Type.SLICED; // 인셋 값이 있다면 설정 (상세 수치는 데이터 구조에 따라 보정 필요)
    } else {
        sprite.type = Sprite.Type.SIMPLE;
    }

    // fileNameData {
    //      path : "PU_AAA_01.png"
    //      plistFile : "",
    //      resourceType : 1
    // }
    if (options.fileNameData?.path) {
        const resData = resourceMap.getResData( options.fileNameData.path );

        // 스프라이트 프레임 세팅
        // @ts-ignore
        const loc_spriteFrame = await loadAssetByUUID( resData?.frameUUID );
        sprite.spriteFrame = loc_spriteFrame;

        if(loc_spriteFrame) {
            // 스프라이트 아틀라스 세팅
            // @ts-ignore
            const loc_atlas = await loadAssetByUUID( resData?.atlasUUID );
            if(loc_atlas) {
                sprite.spriteAtlas = loc_atlas;
            }

            //
            if(options.scale9Enable) {
                applyScale9Insets(loc_spriteFrame, options);
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
    const sprite = node.getComponent(Sprite) || node.addComponent(Sprite);
    const button = node.getComponent(Button) || node.addComponent(Button);
    
    button.target = node;   // target 노드를 자기 자신으로 지정해야 SpriteFrame 교체가 정상적으로 일어납니다.

    // Button.Transition ( 버튼 클릭 시 효과 타입)
    //      NONE    : 버튼 이벤트만.. 시각적 변환 없음
    //      COLOR   : 상태에 따라 색상 설정 
    //      SPRITE  : 상태에 따라 스프라이트 프레임 변경
    //      SCALE   : 상태에 따라 zoom scale 
    button.transition = Button.Transition.SPRITE;

    // ignoreSize가 true면, 억지로 늘리지 말고 잘려나간 픽셀 그대로(RAW) 작게 렌더링합니다!
    if (options.ignoreSize) {
        sprite.sizeMode = Sprite.SizeMode.RAW;
        sprite.trim = false; // 투명 여백을 살려 원본 크기를 유지!
    } else {
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
    }

    
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

async function setupLoadingBar(node:Node, options: any, resourceMap: ResourceMap ){

    const progressBar = node.addComponent(ProgressBar); // node 에 ProgressBar 컴포넌트 추가
    const barSprite = node.addComponent(Sprite);        // node 에 진행도 보여줄 sprite 컴포넌트 추가

    if (options.textureData?.path) {
        const resData = resourceMap.getResData(options.textureData.path);
        if (resData?.frameUUID) {
            const sf = await loadAssetByUUID(resData.frameUUID);
            barSprite.spriteFrame = sf;
        }
    }

    // 스프라이트 컴포넌트 세팅
    // FillType
    //   HORIZONTAL = 0,
    //   VERTICAL = 1,
    //   RADIAL = 2
    barSprite.type = Sprite.Type.FILLED; // 진행바 형태를 위해 FILLED 타입 설정
    barSprite.fillType = Sprite.FillType.HORIZONTAL;
    barSprite.fillStart = options.direction === 1 ? 1 : 0; // 시작점 설정
    barSprite.fillRange = (options.percent ?? 0) / 100;    // cocos 3.x 부터는 0~1 사이 값으로 사용.

    // 프로그래스바 컴포넌트 세팅
    // ProgressBarMode
    //      HORIZONTAL = 0,
    //      VERTICAL = 1,
    //      FILLED = 2
    progressBar.mode = ProgressBar.Mode.FILLED;
    progressBar.totalLength = 1;
    progressBar.progress = (options.percent ?? 0) / 100;

    progressBar.barSprite = barSprite;
}

function setupTextField(node: Node, options: any) {
    const editBox = node.addComponent(EditBox);

    const bgSprite = node.getComponent(Sprite) || node.addComponent(Sprite) ; // 터치용 ( 투명 스프라이트 )
    bgSprite.sizeMode = Sprite.SizeMode.CUSTOM;

    //
    const textNode = new Node("TEXT_LABEL");
    textNode.layer = Layers.Enum.UI_2D;
    textNode.parent = node;

    const txtLabelComp = textNode.addComponent(Label);
    txtLabelComp.horizontalAlign = HorizontalTextAlignment.LEFT;
    txtLabelComp.verticalAlign = VerticalTextAlignment.CENTER;
    txtLabelComp.fontSize = options.fontSize || 20;
    txtLabelComp.color = new Color( options.colorR ?? 255, options.colorG ?? 255, options.colorB ?? 255);

    // placeholder
    const phNode = new Node("PLACEHOLDER_LABEL");
    phNode.layer = Layers.Enum.UI_2D;
    phNode.parent = node;

    const phLabelComp = phNode.addComponent(Label);
    phLabelComp.horizontalAlign = HorizontalTextAlignment.LEFT;
    phLabelComp.verticalAlign = VerticalTextAlignment.CENTER;
    phLabelComp.fontSize = options.fontSize || 20;
    phLabelComp.color = Color.GRAY; // gray 로...

    // 부모 크기에 꽉 차도록 설정
    [textNode, phNode].forEach( _node =>{
        const widgetComp = _node.addComponent(Widget);
        widgetComp.isAlignTop = widgetComp.isAbsoluteBottom = widgetComp.isAlignLeft = widgetComp.isAlignRight = true;
        widgetComp.top = widgetComp.bottom = widgetComp.left = widgetComp.right = 0;
    });


    editBox.textLabel = txtLabelComp;
    editBox.placeholderLabel = phLabelComp;
    editBox.placeholder = options.placeHolder || "";
    editBox.string = options.text || "";

    // 비밀번호 모드 처리
    if (options.passwordEnable) {
        editBox.inputFlag = EditBox.InputFlag.PASSWORD;
    }

    // 글자 수 제한 처리
    if (options.maxLengthEnable && options.maxLength) {
        editBox.maxLength = options.maxLength;
    }
}

async function setupCheckBox(node: Node, options: any, resourceMap: ResourceMap) {
    const toggle = node.addComponent(Toggle);
    const bgSprite = node.addComponent(Sprite);
    bgSprite.sizeMode = Sprite.SizeMode.RAW;
    bgSprite.trim = false;

    // 배경 이미지 (체크 안 되었을 때)
    if (options.backGroundBoxData?.path) {
        const resData = resourceMap.getResData(options.backGroundBoxData.path);
        // @ts-ignore
        const sf = await loadAssetByUUID(resData?.frameUUID);
        bgSprite.spriteFrame = sf;
    }

    // V표시 (체크 마크) 노드 생성
    const checkNode = new Node("checkmark");
    checkNode.layer = Layers.Enum.UI_2D;
    checkNode.parent = node;
    const checkSprite = checkNode.addComponent(Sprite);
    checkSprite.sizeMode = Sprite.SizeMode.RAW;
    checkSprite.trim = false;

    // V표시 이미지 세팅
    if (options.frontCrossData?.path) {
        const resData = resourceMap.getResData(options.frontCrossData.path);
        // @ts-ignore
        const sf = await loadAssetByUUID(resData?.frameUUID);
        checkSprite.spriteFrame = sf;
    }

    // Toggle 컴포넌트에 연결
    toggle.checkMark = checkSprite;
    toggle.isChecked = options.selectedState ?? true; // 초기 체크 상태
    toggle.interactable = options.displaystate ?? true;
}

async function setupSlider(node: Node, options: any, resourceMap: ResourceMap) {
    const slider = node.addComponent(Slider);
    const bgSprite = node.addComponent(Sprite);
    bgSprite.sizeMode = Sprite.SizeMode.RAW;
    bgSprite.trim = false;

    // 슬라이더 배경 바 이미지
    if (options.barFileNameData?.path) {
        const resData = resourceMap.getResData(options.barFileNameData.path);
        // @ts-ignore
        const sf = await loadAssetByUUID(resData?.frameUUID);
        bgSprite.spriteFrame = sf;
    }

    // 슬라이더 손잡이(Ball) 노드 생성
    const handleNode = new Node("Handle");
    handleNode.layer = Layers.Enum.UI_2D;
    handleNode.parent = node;
    const handleSprite = handleNode.addComponent(Sprite);
    handleSprite.sizeMode = Sprite.SizeMode.RAW;
    handleSprite.trim = false;

    // 슬라이더 손잡이 이미지 세팅
    if (options.ballNormalData?.path) {
        const resData = resourceMap.getResData(options.ballNormalData.path);
        // @ts-ignore
        const sf = await loadAssetByUUID(resData?.frameUUID);
        handleSprite.spriteFrame = sf;
    }

    // Slider 컴포넌트에 연결
    slider.handle = handleSprite;
    slider.progress = (options.percent ?? 0) / 100; // Cocos Studio는 0~100, Creator는 0~1
    slider.direction = Slider.Direction.Horizontal; // 대부분 가로형으로 사용됨
}