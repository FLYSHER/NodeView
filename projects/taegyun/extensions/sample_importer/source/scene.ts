import { Node, assetManager, easing, Animation, AnimationClip, animation, UIOpacity, SpriteAtlas, EditBox, UITransform, Toggle, Slider, ProgressBar, PageViewComponent, ScrollViewComponent, Color, Button, Vec2, Layout, Size, Vec3, Sprite, SpriteFrame, Label, Layers, MaskComponent, Director, director } from 'cc';
import cc from "cc";
import * as fs from 'fs';
import * as path from 'path';

// main.ts에서 호출할 함수들
export const methods = {
    // 현재 임포트 중인 JSON의 아틀라스 목록과 로드된 아틀라스를 캐싱
    activePlists: [] as string[],
    atlasCache: {} as Record<string, SpriteAtlas>,

    // 메타 파일을 수정할 "할 일 목록(To-Do List)" 변수
    sliceMetaUpdates: [] as any[],

    async createNodesFromData(fileName: string, json: any) {
        // 현재 열려있는 씬의 Canvas 찾기
        const scene = director.getScene();
        const canvas = scene?.getChildByName('Canvas');

        if (!canvas) {
            console.error("Canvas를 찾을 수 없습니다.");
            return;
        }

        console.log("[Importer] 노드 생성 시작...");
        // 캐시 및 아틀라스 목록 초기화 (새 파일 임포트 시 꼬임 방지)
        methods.activePlists = [];
        methods.atlasCache = {};

        methods.sliceMetaUpdates = []; // 매번 초기화

        // JSON 루트의 textures 배열에서 파일명만 추출 (예: "image/PU_mBoxInfoAtlas.plist" -> "PU_mBoxInfoAtlas.plist")
        if (json['textures'] && Array.isArray(json['textures'])) {
            methods.activePlists = json['textures'].map((t: string) => {
                const parts = t.split(/[\/\\]/); // 슬래시(/)나 역슬래시(\) 기준으로 분리
                return parts[parts.length - 1];  // 맨 마지막 요소(파일명)만 가져옴
            });
            console.log("[Importer] 아틀라스 목록 파싱 완료:", methods.activePlists);
        }

        // 1. 루트 노드 생성
        const rootNode = new Node(fileName);
        rootNode.layer = canvas.layer;

        // 2. 루트 노드에 UITransform 세팅 (여기가 핵심!)
        const rootTransform = rootNode.addComponent(UITransform);
        // JSON에 명시된 디자인 해상도 적용, 없으면 0
        rootTransform.setContentSize(json.designWidth ?? 0, json.designHeight ?? 0);
        // 앵커 포인트를 좌측 하단(0, 0)으로 강제 고정!
        rootTransform.setAnchorPoint(0, 0);

        // 2-1 루트 노드 위치 조정
        rootNode.setPosition(-rootTransform.contentSize.width / 2, -rootTransform.contentSize.height / 2);
        // 3. Canvas에 부착
        rootNode.parent = canvas;

        // 데이터 파싱 시작 (widgetTree가 있다면 UI 처리)
        if (json['widgetTree']) {
            console.log("[Importer] 노드 생성 시작...", JSON.stringify(json));
            await methods.parseWidget(json['widgetTree'], rootNode);
        }
        // AR 파일로 처리
        else if (json['armature_data'] && json['animation_data']) {
            // 텍스처 맵핑
            const textureMap: Record<string, string> = {};
            if (json.texture_data) {
                for (const tex of json.texture_data) {
                    textureMap[tex.name] = tex.plistFile;
                    textureMap[`${tex.name}.png`] = tex.plistFile;
                }
            }

            // 아마추어 데이터
            for (let i = 0; i <json['armature_data'].length; i++) {
                await setArmatureData(rootNode, json['armature_data'][i], textureMap);
            }
            // 애니메이션 클립 세팅
            const animManager = rootNode.addComponent(Animation);
            for (let i = 0; i <json['animation_data'].length; i++) {
                await setAnimationData(rootNode, json['animation_data'][i], json['armature_data'][i], animManager, fileName, textureMap);
            }
        }

        // UI Action
        if (json["animation"] && json["animation"]["actionlist"] && json["animation"]["actionlist"].length > 0) {
            // 1. 루트 노드에 Animation 컴포넌트 부착
            const animManager = rootNode.addComponent(Animation);
            for (const action of json.animation.actionlist) {
                // 2. 새로운 애니메이션 클립 생성
                const clip = new AnimationClip();
                clip.name = action.name; // ex "open"
                clip.sample = 60; // 60 FPS 기준
                clip.duration = 0;

                if (action.loop) {
                    clip.wrapMode = AnimationClip.WrapMode.Loop;
                }

                // 3. 애니메이션 대상 노드들 순회
                for (const actionNode of action.actionnodelist) {
                    const targetName = actionNode.name;
                    const targetInfo = getTargetInfo(rootNode, targetName);

                    // 타겟을 못 찾았으면 스킵
                    if (!targetInfo) continue;

                    const targetPath = targetInfo.path;
                    const targetNode = targetInfo.node;

                    // 투명도 애니메이션을 위해 UIOpacity 강제 주입
                    if (!targetNode.getComponent(UIOpacity)) {
                        targetNode.addComponent(UIOpacity);
                    }

                    // ... (시간 및 값 배열 수집 로직 px, py, sx, sy, opacities 등은 기존과 동일) ...
                    // --- 데이터 수집 배열 ---
                    const times: number[] = [];
                    const px: number[] = [], py: number[] = [];
                    const sx: number[] = [], sy: number[] = [];
                    const opacities: number[] = [];
                    const cr: number[] = [], cg: number[] = [], cb: number[] = [];
                    const rots: number[] = [];
                    const tweens: number[] = []; // 트윈 데이터 배열!

                    let maxTime = 0;
                    const unitTime = action.unittime || 0.1;

                    const sortedFrames = actionNode.actionframelist.sort((a: { frameid: number; }, b: { frameid: number; }) => a.frameid - b.frameid);
                    for (const frame of sortedFrames) {
                        const time = frame.frameid * unitTime;
                        times.push(time);

                        if (time > maxTime) maxTime = time;

                        px.push(frame.positionx ?? 0);
                        py.push(frame.positiony ?? 0);
                        sx.push(frame.scalex ?? 1);
                        sy.push(frame.scaley ?? 1);
                        opacities.push(frame.opacity ?? 255);
                        cr.push(frame.colorr ?? 255);
                        cg.push(frame.colorg ?? 255);
                        cb.push(frame.colorb ?? 255);
                        rots.push(-(frame.rotation ?? 0));

                        // 트윈 타입 수집
                        tweens.push(frame.tweenType ?? 0);
                    }

                    if (maxTime > clip.duration) {
                        clip.duration = maxTime;
                    }

                    const basePath = new animation.TrackPath().toHierarchy(targetPath);

                    // [1. 위치 트랙]
                    const posTrack = new animation.VectorTrack();
                    posTrack.componentsCount = 3;
                    posTrack.path = new animation.TrackPath().append(basePath).toProperty('position');
                    posTrack.channels()[0].curve.assignSorted(times, px);
                    posTrack.channels()[1].curve.assignSorted(times, py);
                    posTrack.channels()[2].curve.assignSorted(times, new Array(times.length).fill(0));
                    applyCurveEasings(posTrack.channels()[0].curve, tweens);
                    applyCurveEasings(posTrack.channels()[1].curve, tweens);
                    clip.addTrack(posTrack);

                    // [2. 크기 트랙]
                    const scaleTrack = new animation.VectorTrack();
                    scaleTrack.componentsCount = 3;
                    scaleTrack.path = new animation.TrackPath().append(basePath).toProperty('scale');
                    scaleTrack.channels()[0].curve.assignSorted(times, sx);
                    scaleTrack.channels()[1].curve.assignSorted(times, sy);
                    scaleTrack.channels()[2].curve.assignSorted(times, new Array(times.length).fill(1));
                    applyCurveEasings(scaleTrack.channels()[0].curve, tweens);
                    applyCurveEasings(scaleTrack.channels()[1].curve, tweens);
                    clip.addTrack(scaleTrack);

                    // [3. 회전 트랙 (Z축 각도)]
                    const rotTrack = new animation.VectorTrack();
                    rotTrack.componentsCount = 3;
                    rotTrack.path = new animation.TrackPath().append(basePath).toProperty('eulerAngles');
                    rotTrack.channels()[0].curve.assignSorted(times, new Array(times.length).fill(0));
                    rotTrack.channels()[1].curve.assignSorted(times, new Array(times.length).fill(0));
                    rotTrack.channels()[2].curve.assignSorted(times, rots); // Z축에 회전값 주입
                    applyCurveEasings(rotTrack.channels()[0].curve, tweens);
                    applyCurveEasings(rotTrack.channels()[1].curve, tweens);
                    clip.addTrack(rotTrack);

                    // [4. 투명도 트랙]
                    const opacityTrack = new animation.RealTrack();
                    opacityTrack.path = new animation.TrackPath().append(basePath).toComponent('cc.UIOpacity').toProperty('opacity');
                    opacityTrack.channel.curve.assignSorted(times, opacities);
                    applyCurveEasings(opacityTrack.channel.curve, tweens);
                    clip.addTrack(opacityTrack);

                    // [5. 색상 트랙 방어 로직]
                    // 해당 노드가 Sprite인지 Label인지 확인하고 색상 트랙 on
                    let colorCompName = '';
                    if (targetNode.getComponent('cc.Sprite')) colorCompName = 'cc.Sprite';
                    else if (targetNode.getComponent('cc.Label')) colorCompName = 'cc.Label';

                    if (colorCompName !== '') {
                        const colorTrack = new animation.ColorTrack();
                        colorTrack.path = new animation.TrackPath().append(basePath).toComponent(colorCompName).toProperty('color');
                        colorTrack.channels()[0].curve.assignSorted(times, cr); // Red
                        colorTrack.channels()[1].curve.assignSorted(times, cg); // Green
                        colorTrack.channels()[2].curve.assignSorted(times, cb); // Blue
                        applyCurveEasings(colorTrack.channels()[0].curve, tweens);
                        applyCurveEasings(colorTrack.channels()[1].curve, tweens);
                        applyCurveEasings(colorTrack.channels()[2].curve, tweens);
                        // 알파(투명도)는 UIOpacity가 담당하므로 255로 꽉 채워줍니다.
                        colorTrack.channels()[3].curve.assignSorted(times, new Array(times.length).fill(255));
                        clip.addTrack(colorTrack);
                    }
                }

                // 5. 클립 저장
                let serializeFunc: any = GetSerializeFunc();
                if (!serializeFunc) {
                    console.error("엔진에서 serialize 함수를 찾지 못했습니다! 현재 코드가 실행되는 곳이 어디인지 확인이 필요합니다.");
                    return;
                }

                // 클립 직렬화!
                // (엔진의 serialize 함수는 문자열(String)이 아니라 객체(Object/Array)를 반환하므로 stringify를 해줘야 합니다)
                const serializedObj = serializeFunc(clip);
                const serializedStr = typeof serializedObj === 'string' ? serializedObj : JSON.stringify(serializedObj, null, 2);
                // 2. 물리 파일 저장 경로 세팅
                const animFileName = `${clip.name || 'action'}.anim`;
                const absoluteSaveDir = path.join(Editor.Project.path, 'assets', 'animations', fileName);
                const absoluteSavePath = path.join(absoluteSaveDir, animFileName);
                const dbUrl = `db://assets/animations/${fileName}/${animFileName}`;

                if (!fs.existsSync(absoluteSaveDir)) {
                    fs.mkdirSync(absoluteSaveDir, { recursive: true });
                }

                // 3. 하드디스크에 파일 쓰기 (.anim 파일 생성)
                fs.writeFileSync(absoluteSavePath, serializedStr, 'utf-8');

                // 4. 에디터 데이터베이스에 갱신을 요청하고(UUID 발급 대기)
                await Editor.Message.request('asset-db', 'refresh-asset', dbUrl);
                const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbUrl);

                if (uuid) {
                    // 5. 발급된 UUID를 통해 진짜 에셋 객체(Asset)를 로드
                    // @ts-ignore
                    const realClipAsset = await new Promise((resolve) => {
                        // 에디터 환경에서는 cce.AssetManager를 써야 가장 안전하게 불러와집니다.
                        // @ts-ignore
                        if (typeof cce !== 'undefined' && cce.AssetManager) {
                            // @ts-ignore
                            cce.AssetManager.loadAsset(uuid, (err: any, asset: any) => resolve(asset));
                        } else {
                            cc.assetManager.loadAny(uuid, (err: any, asset: any) => resolve(asset));
                        }
                    });

                    if (realClipAsset) {
                        // @ts-ignore
                        animManager.clips.push(realClipAsset);

                        if (!animManager.defaultClip) {
                            // @ts-ignore
                            animManager.defaultClip = realClipAsset;
                        }
                    }
                } else {
                    console.warn(`UUID 발급 실패: ${animFileName}`);
                }
            }
        }
        // 프리팹 생성을 위해 생성된 루트 노드의 UUID를 반환합니다.
        // + 객체에 메타 수정 목록을 담아서 넘김
        console.log("[Importer] 노드 uuid ", rootNode.uuid);
        return {
            uuid: rootNode.uuid,
            metaUpdates: methods.sliceMetaUpdates
        };
    },

    async parseWidget(widgetData: any, parentNode: Node) {
        const options = widgetData['options'];
        if (!options) return;

        // 1. 노드 생성 및 기본 설정
        const newNode = new Node(options.name || "New_Node");
        newNode.layer = Layers.Enum.UI_2D;

        // 2. UI 구성 요소 추가 (Size, Anchor 등)
        // 2-1 부모 노드 정보 받아오기
        const parentTransform = parentNode.getComponent(UITransform);
        const pWidth = parentTransform ? parentTransform.width : 0;
        const pHeight = parentTransform ? parentTransform.height : 0;
        const pAnchorX = parentTransform ? parentTransform.anchorPoint.x : 0;
        const pAnchorY = parentTransform ? parentTransform.anchorPoint.y : 0;

        const uiTransform = newNode.addComponent(UITransform);
        uiTransform.setAnchorPoint(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5);
        // --- 수정된 크기 할당 로직 (sizeType 반영) ---
        let targetWidth = options.width ?? 0;
        let targetHeight = options.height ?? 0;

        // sizeType이 1 (Percent)인 경우, 부모 크기에 비율을 곱해서 내 크기를 구합니다.
        if (options.sizeType === 1) {
            const parentTransform = parentNode.getComponent(UITransform);
            if (parentTransform) {
                targetWidth = parentTransform.width * (options.sizePercentX ?? 0);
                targetHeight = parentTransform.height * (options.sizePercentY ?? 0);
            }
        }
        uiTransform.setContentSize(targetWidth, targetHeight);

        // 3. 위치 설정 (Cocos Studio와 Creator의 좌표계 차이 주의)
        let studioX = options.x ?? 0;
        let studioY = options.y ?? 0;
        let targetX, targetY;

        if (options.positionType === 1) {
            // 퍼센트 기반 위치
            studioX = pWidth * (options.positionPercentX ?? 0);
            studioY = pHeight * (options.positionPercentY ?? 0);

            // todo 추후 검증 필요
            targetX = studioX - (pWidth * pAnchorX);
            targetY = studioY - (pHeight * pAnchorY);
        } else {
            targetX = studioX;
            targetY = studioY;
        }
        newNode.setPosition(targetX, targetY, 0);

        // 4. 스케일 및 회전
        let finalScaleX = options.scaleX ?? 1;
        let finalScaleY = options.scaleY ?? 1;

        // Cocos Studio의 flipX, flipY가 true면 Creator에서는 스케일에 -1을 곱해서 뒤집습니다.
        if (options.flipX) {
            finalScaleX *= -1;
        }
        if (options.flipY) {
            finalScaleY *= -1;
        }

        newNode.setScale(finalScaleX, finalScaleY, 1);
        newNode.angle = -(options.rotation || 0);

        // 5. 컴포넌트 처리 (예: Sprite, Label) (스크롤뷰의 경우 content 노드 수령)
        const contentParent = (await this.applyComponents(newNode, options)) || newNode;

        // 6. 부모에 추가
        newNode.parent = parentNode;

        // 7. 노드 활성화 상태 처리
        if (options.visible === false) {
            newNode.active = false;
        }

        //(applyComponents 방어 코드용) ---applyComponents 안에서 targetWidth/targetHeight를 똑같이 쓸 수 있도록
        options._calcWidth = targetWidth;
        options._calcHeight = targetHeight;

        // 8. 자식 노드 순회 및 생성 (ZOrder 기반 정렬 추가)
        // zIndex가 deprecated 됨에 따라 사전 인덱싱으로 sorting 해서 처리
        const children = widgetData['children'];
        if (children && Array.isArray(children)) {

            // 핵심: 부모에 자식을 붙이기 전에 ZOrder를 기준으로 오름차순 정렬
            // ZOrder가 낮을수록(보통 0) 배열 앞에 배치되어 먼저 생성됨 -> 에디터 트리 상단에 위치 -> 뒤에 그려짐
            // ZOrder가 높을수록 배열 뒤에 배치되어 늦게 생성됨 -> 에디터 트리 하단에 위치 -> 앞에 그려짐
            children.sort((a: any, b: any) => {
                const zOrderA = a.options?.ZOrder ?? 0;
                const zOrderB = b.options?.ZOrder ?? 0;
                return zOrderA - zOrderB; // 오름차순
            });

            // 비동기로 정렬된 자식들을 순서대로 생성
            for (const childData of children) {
                // newNode가 아닌 contentParent에 자식을 붙입니다!
                await methods.parseWidget(childData, contentParent);
            }
        }

        const layout = contentParent.getComponent(Layout);
        if (layout) {
            layout.resizeMode = Layout.ResizeMode.NONE;
            layout.resizeMode = Layout.ResizeMode.CONTAINER;
        }
    },

    async applyComponents(node: Node, options: any): Promise<Node | void> {
        // 타입에 따른 컴포넌트 분기 처리 (Cocos Studio의 classname 기준)
        const className = options.classname;
        // 스크롤 뷰 반환값 처리
        let customParentNode: Node | undefined = undefined;
        const isScrollable = className === "ScrollView" || className === "ListView" || className === "PageView";

        // 스크롤뷰는 자체적으로 View(Mask)를 생성하므로 여기서 중복 마스크를 씌우지 않습니다.
        // --- 마스크(클리핑) 컴포넌트 공통 처리 ---
        // Panel, PageView, ScrollView 등 clipAble 속성이 true인 모든 노드에 적용됩니다.
        if (options.clipAble === true && !isScrollable) {
            const mask = node.addComponent(MaskComponent);
            mask.type = MaskComponent.Type.GRAPHICS_RECT;
        }

        if (className === "Panel") {
            if (options.touchAble)
                node.addComponent(cc.BlockInputEvents);
        } else if (className === "ImageView" || className === "Sprite") {
            const sprite = node.addComponent(Sprite);

            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            if (options.scale9Enable) {
                sprite.type = Sprite.Type.SLICED;
            } else if (options.ignoreSize === true) {
                sprite.trim = false; // 투명한 영역을 자르지 않고 원본 위치를 유지합니다.
            }

            if (options.fileNameData) {
                const assetResult = await methods.loadStudioAsset(options.fileNameData);
                if (assetResult) {
                    const [spriteFrame, spriteAtlas] = assetResult;
                    if (spriteFrame) {
                        sprite.spriteFrame = spriteFrame;
                    }
                    if (spriteAtlas) {
                        sprite.spriteAtlas = spriteAtlas;
                    }

                    // Scale9(나인패치) 처리
                    await methods.applyScale9(sprite, spriteFrame, options);
                }
                // 핵심 방어: 이미지가 로드된 후에도 캔버스 크기가 변하지 못하도록
                // 예외 없이 무조건 JSON에서 파싱한 타겟 크기로 쾅 박아버립니다!
                const uiTransform = node.getComponent(UITransform);
                uiTransform?.setContentSize(
                    options._calcWidth ?? options.width ?? 0,
                    options._calcHeight ?? options.height ?? 0
                );
            }
            sprite.color = new Color(options.colorR, options.colorG, options.colorB, options.opacity);
        } else if (className === "Label" || className === "Text" || className === "LabelBMFont") {
            const label = node.addComponent(Label);

            let rawString = options.text || "";
            const isBMFont = (className === "LabelBMFont");
            label.string = methods.applyTextEffects(rawString, label);

            if (isBMFont && options.fileNameData && options.fileNameData.path) {
                // --- BMFont 로직 ---
                const pathStr = options.fileNameData.path;
                const baseName = pathStr.split(/[\/\\]/).pop() || pathStr;
                const fontDbPath = `db://assets/import_assets/image/${baseName}`;

                const fontAsset = await methods.loadAssetByPath(fontDbPath);
                if (fontAsset) {
                    label.font = fontAsset;

                    // @ts-ignore
                    const fntConfig = fontAsset.fntConfig || fontAsset._fntConfig;
                    // 폰트 사이즈 가져오기 (기본값 40)
                    // @ts-ignore
                    const nativeSize = fontAsset.fontSize || (fntConfig ? fntConfig.fontSize : 40);
                    label.fontSize = nativeSize;

                    // 실제 층고(Common Height) 가져오기
                    let realLineHeight = nativeSize;
                    if (fntConfig && fntConfig.commonHeight) {
                        realLineHeight = fntConfig.commonHeight;
                    }

                    if (options.lineHeight !== undefined) {
                        label.lineHeight = options.lineHeight;
                    } else {
                        label.lineHeight = realLineHeight;
                    }
                }
            } else {
                // --- 일반 Label 로직 ---
                label.fontSize = options.fontSize || 20;

                // Line Height
                if (options.lineHeight !== undefined) {
                    label.lineHeight = options.lineHeight;
                } else {
                    label.lineHeight = label.fontSize;
                }
            }

            label.enableWrapText = false;

            // Overflow
            if (options.ignoreSize === false) {
                label.overflow = Label.Overflow.SHRINK;
            } else {
                label.overflow = Label.Overflow.NONE;
            }

            // --- 정렬(Alignment) 설정 로직 ---
            // 수평 정렬
            if (options.hAlignment !== undefined) {
                label.horizontalAlign = options.hAlignment;
            } else {
                label.horizontalAlign = Label.HorizontalAlign.CENTER;
            }

            // 수직 정렬
            if (options.vAlignment !== undefined) {
                label.verticalAlign = options.vAlignment;
            } else {
                label.verticalAlign = Label.VerticalAlign.TOP;
            }

            // 색상
            if (options.colorR !== undefined) {
                label.color = new Color(options.colorR, options.colorG, options.colorB, options.opacity ?? 255);
            }

        } else if (className === "Button") {
            // 1. 렌더링을 위한 Sprite 컴포넌트 필수 추가
            const sprite = node.addComponent(Sprite);

            // 2. Button 컴포넌트 추가 및 기본 설정
            const button = node.addComponent(Button);
            button.target = node;
            button.transition = Button.Transition.SPRITE; // 이미지 전환 방식 사용

            // 3. Scale9(나인패치) 설정
            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            if (options.scale9Enable) {
                sprite.type = Sprite.Type.SLICED;
            } else if (options.ignoreSize === true) {
                sprite.trim = false; // 투명한 영역을 자르지 않고 원본 위치를 유지합니다.
            }

            // 3.1 sprite color 처리
            sprite.color = new Color(options.colorR, options.colorG, options.colorB, options.opacity);
            // 4. 상태별 이미지 로드 (Normal, Pressed, Disabled)
            if (options.normalData && options.normalData.path) {
                const normalFrameData = await methods.loadStudioAsset(options.normalData);
                if (normalFrameData) {
                    const [normalFrame, normalAtlas] = normalFrameData;
                    sprite.spriteFrame = normalFrame; // 기본(평상시) 이미지 세팅
                    sprite.spriteAtlas = normalAtlas;
                    button.normalSprite = normalFrame;

                    await methods.applyScale9(sprite, normalFrame, options);
                }
            }

            if (options.pressedData && options.pressedData.path) {
                const pressedFrameData = await methods.loadStudioAsset(options.pressedData);
                if (pressedFrameData) {
                    button.pressedSprite = pressedFrameData[0];
                }
            }

            if (options.disabledData && options.disabledData.path) {
                const disabledFrameData = await methods.loadStudioAsset(options.disabledData);
                if (disabledFrameData) {
                    button.disabledSprite = disabledFrameData[0];
                }
            }

            // 5. 버튼 텍스트가 존재할 경우 자식 노드로 분리하여 Label 생성
            if (options.text) {
                const labelNode = new Node("Button_Label");
                labelNode.layer = node.layer;
                labelNode.parent = node; // 버튼 노드의 자식으로 들어감

                const label = labelNode.addComponent(Label);
                label.string = methods.applyTextEffects(options.text, label);
                label.fontSize = options.fontSize || 20;

                // textColor가 있으면 적용, 없으면 기본 흰색
                if (options.textColorR !== undefined) {
                    label.color = new Color(options.textColorR, options.textColorG, options.textColorB, 255);
                }
            }
            // 사이즈 방어 코드
            const uiTransform = node.getComponent(UITransform);
            uiTransform?.setContentSize(
                options._calcWidth ?? options.width ?? 0,
                options._calcHeight ?? options.height ?? 0
            );
        } else if (className === "CheckBox") {
            // 1. 본체(배경 빈 박스) Sprite 추가
            const bgSprite = node.addComponent(Sprite);
            bgSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            // Cocos Studio에서 빈 박스 이미지
            const bgData = options.backGroundBoxData;
            if (bgData) {
                const assetResult = await methods.loadStudioAsset(bgData);
                if (assetResult) {
                    bgSprite.spriteFrame = assetResult[0];
                }
            }

            // 2. Toggle 컴포넌트 부착 및 기본 세팅
            const toggle = node.addComponent(Toggle);

            // 터치 가능 여부 (touchAble)
            toggle.interactable = options.touchAble !== false;

            // 기본 체크 상태 (selectedState)
            toggle.isChecked = options.selectedState === true;

            // 3. 자식 노드: 체크 마크(V 표시) 생성
            const checkMarkNode = new Node("CheckMark");
            checkMarkNode.layer = node.layer;
            checkMarkNode.parent = node;

            const checkMarkUI = checkMarkNode.addComponent(UITransform);
            const checkMarkSprite = checkMarkNode.addComponent(Sprite);
            checkMarkSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            // 임시 크기 (부모의 크기에 맞춤)
            let checkWidth = options._calcWidth ?? options.width ?? 0;
            let checkHeight = options._calcHeight ?? options.height ?? 0;

            // Cocos Studio에서 체크 V 이미지
            let checkMarkOffsetX = 0, checkMarkOffsetY = 0;
            const checkData = options.frontCrossData;
            if (checkData) {
                const assetResult = await methods.loadStudioAsset(checkData);
                if (assetResult) {
                    const checkSpriteFrame = assetResult[0];
                    checkMarkSprite.spriteFrame = checkSpriteFrame;

                    // 체크 박스 텍스처 사이즈 가져옴
                    // todo ignoreSize t/f 차이 있는지 확인 필요
                    if (checkSpriteFrame.rect) {
                        checkWidth = checkSpriteFrame.rect.width;
                        checkHeight = checkSpriteFrame.rect.height;
                    } else if (checkSpriteFrame.originalSize) {
                        // 여백 포함된 크기라 예비용
                        checkWidth = checkSpriteFrame.originalSize.width;
                        checkHeight = checkSpriteFrame.originalSize.height;
                    }

                    if (checkSpriteFrame.offset) {
                        checkMarkOffsetX = checkSpriteFrame.offset.x;
                        checkMarkOffsetY = checkSpriteFrame.offset.y;
                    }
                }
            }
            checkMarkUI.setContentSize(checkWidth, checkHeight);

            // 오프셋 조정
            checkMarkNode.setPosition(checkMarkOffsetX, checkMarkOffsetY);
            // 4. Toggle 컴포넌트에 방금 만든 자식 노드(체크 마크)를 연결!
            toggle.checkMark = checkMarkSprite;
        } else if (className === "LoadingBar") {
            // 1. 본체 노드에 ProgressBar 컴포넌트 부착
            const progressBar = node.addComponent(ProgressBar);
            progressBar.mode = ProgressBar.Mode.FILLED; // filled로 세팅

            // 2. 게이지 역할을 할 자식 노드(Bar) 생성
            const barNode = new Node("Bar");
            barNode.layer = node.layer;
            barNode.parent = node;

            const barUI = barNode.addComponent(UITransform);
            const barSprite = barNode.addComponent(Sprite);
            barSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            // 크기 가져오기
            const w = options._calcWidth ?? options.width ?? 0;
            const h = options._calcHeight ?? options.height ?? 0;

            barUI.setContentSize(w, h);
            const pAnchorX = options.anchorPointX ?? 0.5;
            const pAnchorY = options.anchorPointY ?? 0.5;
            barUI.setAnchorPoint(pAnchorX, pAnchorY);

            // Filled 로 구성.
            barSprite.type = Sprite.Type.FILLED;

            // todo 일단 임시 처리 방식
            // 채우기 방식이 Radial 인지 Horizontal 인지 판별하기 위해서 비율이 정사각형에 가까우면 일단 radial로 처리
            const aspectRatio = w > 0 && h > 0 ? w / h : 5;
            const isRadial = aspectRatio >= 0.85 && aspectRatio <= 1.15;

            if (isRadial) {
                // --- 원형(Radial) 로직 ---
                barSprite.fillType = Sprite.FillType.RADIAL;
                barSprite.fillCenter = new Vec2(0.5, 0.5); // 정중앙을 기준으로 채움

                // 12시 방향에서 시작. 그러나 기존 파일에서는 보통 rotation -90을 주고 있기 때문에
                // 따로 처리할 필요가 없다.
                //barSprite.fillStart = 0.25;
                progressBar.reverse = false;
            } else {
                // --- 가로형(Horizontal) 로직 ---
                barSprite.fillType = Sprite.FillType.HORIZONTAL;
            }

            // 4. 텍스처(이미지) 로드 및 나인패치(9-Slice) 지원
            if (options.textureData) {
                const assetResult = await methods.loadStudioAsset(options.textureData);
                if (assetResult) {
                    const [spriteFrame] = assetResult;
                    barSprite.spriteFrame = spriteFrame;

                    // LoadingBar도 나인패치가 적용되어 있을 수 있으므로 함수 호출
                    await methods.applyScale9(barSprite, spriteFrame, options);
                }
            }

            // 5. ProgressBar 컴포넌트에 방금 만든 자식(Bar) 연결 및 수치 세팅
            progressBar.barSprite = barSprite;
            progressBar.totalLength = 1;
            // 스튜디오의 percent는 0~100 이고, Creator의 progress는 0~1.0
            progressBar.progress = (options.percent ?? 0) / 100;

            // 6. Bar Node 포지션 수정
            // 처음 sprite 세팅할 때 기본 Horizontal로 세팅되면서 x: width / 2 값 들어갈 수 있음.
            barNode.setPosition(0, 0, 0);
        } else if (className === "Slider") {
            const w = options._calcWidth ?? options.width ?? 0;
            const h = options._calcHeight ?? options.height ?? 0;

            // 1. 본체 노드: Slider 컴포넌트와 배경(Background) Sprite 추가
            const slider = node.addComponent(Slider);
            const bgSprite = node.addComponent(Sprite);
            bgSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            // 슬라이더 bar 배경 이미지
            if (options.barFileNameData) {
                const assetResult = await methods.loadStudioAsset(options.barFileNameData);
                if (assetResult) bgSprite.spriteFrame = assetResult[0];
            }

            // ----------------------------------------------------
            // 2. 게이지 바 (Progress Bar) 부분 구축
            // 스튜디오의 채워지는 파란 줄(progressBarData)을 구현하기 위해 ProgressBar도 추가!
            const progressBar = node.addComponent(ProgressBar);
            progressBar.mode = ProgressBar.Mode.FILLED;
            progressBar.totalLength = 1;

            if (options.progressBarVisible !== false) {
                const barNode = new Node("Bar");
                barNode.layer = node.layer;
                barNode.parent = node;

                const barUI = barNode.addComponent(UITransform);
                const barSprite = barNode.addComponent(Sprite);
                barSprite.sizeMode = Sprite.SizeMode.CUSTOM;
                barSprite.type = Sprite.Type.FILLED;
                // 가로가 기본 (세로 모양도 가로로 세팅해야 잘 나옴)
                barSprite.fillType = Sprite.FillType.HORIZONTAL;

                barUI.setContentSize(w, h);
                barNode.setPosition(0, 0, 0);

                if (options.progressBarData && options.progressBarData.path) {
                    const assetResult = await methods.loadStudioAsset(options.progressBarData);
                    if (assetResult) barSprite.spriteFrame = assetResult[0];
                }

                progressBar.barSprite = barSprite;
            }

            // ----------------------------------------------------
            // 3. 핸들 (Ball) 부분 구축
            const handleNode = new Node("Handle");
            handleNode.layer = node.layer;
            handleNode.parent = node;

            const handleUI = handleNode.addComponent(UITransform);
            const handleSprite = handleNode.addComponent(Sprite);
            handleSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            // 버튼 달기
            const handleButton = handleNode.addComponent(Button);
            handleButton.transition = Button.Transition.SPRITE;

            // 3-1. Normal 상태 로드
            let ballOffsetX = 0, ballOffsetY = 0;
            if (options.ballNormalData && options.ballNormalData.path) {
                const assetResult = await methods.loadStudioAsset(options.ballNormalData);
                if (assetResult) {
                    const handleFrame = assetResult[0];
                    handleSprite.spriteFrame = handleFrame;
                    handleButton.normalSprite = handleFrame; // 버튼 노멀 이미지 할당

                    // 알맹이 크기(rect)로 세팅
                    let ballW = w;
                    let ballH = h;
                    if (handleFrame.rect) {
                        ballW = handleFrame.rect.width;
                        ballH = handleFrame.rect.height;
                    } else if (handleFrame.originalSize) {
                        ballW = handleFrame.originalSize.width;
                        ballH = handleFrame.originalSize.height;
                    }
                    if (handleFrame.offset) {
                        ballOffsetX = handleFrame.offset.x;
                        ballOffsetY = handleFrame.offset.y;
                    }
                    if (handleFrame.pivot) {
                        handleUI.setAnchorPoint(handleFrame.pivot.x, handleFrame.pivot.y);
                    }
                    handleUI.setContentSize(ballW, ballH);
                }
            }

            // 3-2. Pressed 상태 로드
            if (options.ballPressedData && options.ballPressedData.path) {
                const assetResult = await methods.loadStudioAsset(options.ballPressedData);
                if (assetResult) handleButton.pressedSprite = assetResult[0];
            }

            // 3-3. Disabled 상태 로드
            if (options.ballDisabledData && options.ballDisabledData.path) {
                const assetResult = await methods.loadStudioAsset(options.ballDisabledData);
                if (assetResult) handleButton.disabledSprite = assetResult[0];
            }

            slider.handle = handleSprite; // Slider와 핸들 연결 완료!
            slider.direction = Slider.Direction.Horizontal;
            handleNode.setPosition(ballOffsetX, ballOffsetY);

            // ----------------------------------------------------
            // 4. 초기 퍼센트(Percent) 적용
            // 스튜디오의 percent는 0~100, Creator는 0~1.0
            const initialProgress = (options.percent ?? 0) / 100;
            slider.progress = initialProgress;
            progressBar.progress = initialProgress;
        } else if (className === "TextField") {
            const w = options._calcWidth ?? options.width ?? 0;
            const h = options._calcHeight ?? options.height ?? 0;

            // 1. 본체 노드: EditBox 컴포넌트 추가
            const editBox = node.addComponent(EditBox);

            // ----------------------------------------------------
            // 2. 입력된 텍스트를 보여줄 자식 노드 (TEXT_LABEL)
            const textNode = new Node("TEXT_LABEL");
            textNode.layer = node.layer;
            textNode.parent = node;

            let fontFamilyStr = options.fontName || "Arial";
            const fontFamilyStrParts = fontFamilyStr.split(/[\/\\]/); // image/ 붙어있는 경우 제거
            fontFamilyStr = fontFamilyStrParts[fontFamilyStrParts.length - 1];
            if (fontFamilyStr.toLowerCase().endsWith(".ttf")) {
                // 뒤에서 4글자(.ttf)를 잘라냄
                fontFamilyStr = fontFamilyStr.substring(0, fontFamilyStr.length - 4);
            }

            const textUI = textNode.addComponent(UITransform);
            // 라벨 크기는 부모와 동일하게, 정중앙에 배치합니다.
            textUI.setContentSize(w, h);
            textUI.setAnchorPoint(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5);
            textNode.setPosition(0, 0, 0);

            const textLabel = textNode.addComponent(Label);
            textLabel.horizontalAlign = Label.HorizontalAlign.LEFT; // 보통 입력칸은 왼쪽 정렬
            textLabel.verticalAlign = Label.VerticalAlign.CENTER;
            textLabel.fontSize = options.fontSize || 20;
            textLabel.lineHeight = textLabel.fontSize;
            textLabel.fontFamily = fontFamilyStr;

            // 입력된 텍스트의 색상
            if (options.colorR !== undefined) {
                textLabel.color = new Color(options.colorR, options.colorG, options.colorB, options.opacity);
            }

            // ----------------------------------------------------
            // 3. 안내 문구(Placeholder)를 보여줄 자식 노드 (PLACEHOLDER_LABEL)
            const placeholderNode = new Node("PLACEHOLDER_LABEL");
            placeholderNode.layer = node.layer;
            placeholderNode.parent = node;

            const placeholderUI = placeholderNode.addComponent(UITransform);
            placeholderUI.setContentSize(w, h);
            placeholderUI.setAnchorPoint(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5);
            placeholderNode.setPosition(0, 0, 0);

            const placeholderLabel = placeholderNode.addComponent(Label);
            placeholderLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
            placeholderLabel.verticalAlign = Label.VerticalAlign.CENTER;
            placeholderLabel.fontSize = options.fontSize || 20;
            placeholderLabel.lineHeight = placeholderLabel.fontSize;
            placeholderLabel.fontFamily = fontFamilyStr;

            if (options.colorR !== undefined) {
                placeholderLabel.color = new Color(options.colorR, options.colorG, options.colorB, options.opacity);
            }

            // ----------------------------------------------------
            // 4. EditBox 컴포넌트에 자식 노드들 연결 및 속성 세팅
            editBox.textLabel = textLabel;
            editBox.placeholderLabel = placeholderLabel;

            // 스튜디오의 속성 매핑
            editBox.string = options.text || ""; // 초기 입력된 텍스트
            editBox.placeholder = options.placeHolder || ""; // 안내 문구

            // 비밀번호 모드 (passwordEnable)
            if (options.passwordEnable) {
                editBox.inputFlag = EditBox.InputFlag.PASSWORD;
            } else {
                editBox.inputFlag = EditBox.InputFlag.DEFAULT;
            }

            // 최대 글자 수 제한 (maxLengthEnable)
            if (options.maxLengthEnable && options.maxLength !== undefined) {
                editBox.maxLength = options.maxLength;
            }
        } else if (isScrollable) {
            // --- ScrollView / PageView 3단 계층 구조 동적 생성 ---
            const isPageView = className === "PageView";

            // 1. 최상단 스크롤/페이지뷰 컴포넌트 부착
            const scrollComp = isPageView ? node.addComponent(PageViewComponent) : node.addComponent(ScrollViewComponent);

            // 2. View 노드 생성 (마스크 영역)
            const viewNode = new Node("view");
            viewNode.parent = node;
            const viewTransform = viewNode.addComponent(UITransform);
            viewTransform.setContentSize(options.width ?? 0, options.height ?? 0);
            viewTransform.setAnchorPoint(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5);
            viewNode.setPosition(0, 0, 0); // 부모와 동일 앵커이므로 0, 0

            const mask = viewNode.addComponent(MaskComponent);
            mask.type = MaskComponent.Type.GRAPHICS_RECT;

            // 3. Content 노드 생성 (실제 아이템들이 담길 도화지)
            const contentNode = new Node("content");
            contentNode.parent = viewNode;
            const contentTransform = contentNode.addComponent(UITransform);

            // 스튜디오 데이터에 innerWidth/Height가 있으면 그걸 쓰고, 없으면 뷰 사이즈와 동일하게 맞춤
            const innerWidth = options.innerWidth ?? options.width ?? 0;
            const innerHeight = options.innerHeight ?? options.height ?? 0;
            contentTransform.setContentSize(innerWidth, innerHeight);

            // 앵커 위치 세팅
            contentTransform.setAnchorPoint(options.anchorPointX ?? 0.5, options.anchorPointY ?? 0.5);


            // 4. 컴포넌트에 Content 노드 연결
            scrollComp.content = contentNode;
            scrollComp.horizontal = true; // 가로 스크롤 허용
            scrollComp.vertical = true;   // 세로 스크롤 허용

            // 레이아웃
            const layout = contentNode.addComponent(Layout);
            layout.resizeMode = Layout.ResizeMode.CONTAINER;

            // 포지션 연결 후 처리
            contentNode.setPosition(0, 0, 0);

            const scrollDir = options.direction ?? options.scrollDirection ?? 1;

            if (scrollDir === 1) {
                // --- 세로 ---
                scrollComp.horizontal = false;
                scrollComp.vertical = true;
            } else if (scrollDir === 2) {
                // --- 가로 ---
                scrollComp.horizontal = true;
                scrollComp.vertical = false;
            } else if (scrollDir === 3) {
                // --- 양뱡향 ---
                scrollComp.horizontal = true;
                scrollComp.vertical = true;
            } else {
                scrollComp.horizontal = false;
                scrollComp.vertical = false;
            }

            if (isPageView) {
                const pageComp = scrollComp as PageViewComponent;
                pageComp.sizeMode = PageViewComponent.SizeMode.Free;

                // PageView도 방향 설정
                if (scrollDir === 0) {
                    pageComp.direction = PageViewComponent.Direction.VERTICAL;
                    layout.type = Layout.Type.VERTICAL; // 세로 정렬
                } else {
                    pageComp.direction = PageViewComponent.Direction.HORIZONTAL;
                    layout.type = Layout.Type.HORIZONTAL; // 가로 정렬
                }
            }

            // 5. 이 노드 하위에 있던 자식들은 모두 contentNode의 자식으로 들어가야 하므로 반환!
            customParentNode = contentNode;
        }

        return customParentNode;
    },

    async loadAssetByPath(dbPath: string): Promise<any> {
        return new Promise(async (resolve) => {
            // @ts-ignore - 익스텐션 환경이므로 Editor 객체 사용
            const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbPath);

            if (!uuid) {
                console.warn(`[Importer] AssetDB에서 경로를 찾을 수 없습니다: ${dbPath}`);
                return resolve(null);
            }

            assetManager.loadAny(uuid, (err: any, asset: any) => {
                if (err) {
                    console.error(`[Importer] 로드 실패 (${dbPath}):`, err);
                    resolve(null);
                } else {
                    resolve(asset);
                }
            });
        });
    },

    async loadStudioAsset(fileNameData: any): Promise<[SpriteFrame, SpriteAtlas | null] | null> {
        const path = fileNameData.path;
        if (!path) return null;

        // resourceType: 1 은 보통 Plist(Atlas)를 의미, 0 은 개별 이미지를 의미합니다.
        const resourceType = fileNameData.resourceType;

        if (resourceType === 1) {
            // plistFile이 명시되어 있으면 그것만 찾고, 비어있으면 전체 activePlists를 순회합니다.
            const targetPlists = (fileNameData.plistFile && fileNameData.plistFile !== "") ? [fileNameData.plistFile] : methods.activePlists;
            for (const plistName of targetPlists) {
                // import_assets 경로로 맞춤
                const plistDbPath = `db://assets/import_assets/image/${plistName}`;

                // 1. 캐시에 아틀라스가 있는지 확인 (통신 최소화)
                let atlas = methods.atlasCache[plistDbPath];

                // 2. 캐시에 없으면 AssetDB에 요청해서 로드 후 캐시에 저장
                if (!atlas) {
                    atlas = await methods.loadAssetByPath(plistDbPath) as SpriteAtlas;
                    if (atlas) {
                        methods.atlasCache[plistDbPath] = atlas;
                    }
                }

                // 3. 아틀라스 안에서 해당 이미지 프레임 찾기
                if (atlas) {
                    let frame = atlas.getSpriteFrame(path);
                    if (!frame) {
                        const baseName = path.split('/').pop()?.split('.')[0] || path;
                        frame = atlas.getSpriteFrame(baseName);
                    }

                    // 프레임을 찾았다면 루프를 멈추고 바로 반환!
                    if (frame) {
                        return [frame as SpriteFrame, atlas as SpriteAtlas];
                    }
                }
            }
        } else if (resourceType === 0) {
            // --- 개별 이미지(Texture) 가져오기 ---
            // Cocos Creator 3.x 에서는 이미지의 SpriteFrame을 가져오려면 경로 뒤에 '/spriteFrame'을 붙여야 합니다.
            const imageDbPath = `db://assets/import_assets/image/${path}/spriteFrame`;
            const frame = await methods.loadAssetByPath(imageDbPath);
            return [frame as SpriteFrame, null];
        }

        return null;
    },

    async loadSpriteFrameFromImgName(imageName: string, textureMap: Record<string, string>): Promise<SpriteFrame | null> {
        const plistFile = textureMap[imageName];
        if (plistFile) {
            // textureMap에 `image/` 경로가 포함되어 있다.
            const plistDbPath = `db://assets/import_assets/${plistFile}`;

            let atlas = methods.atlasCache[plistDbPath];

            // 2. 캐시에 없으면 AssetDB에 요청해서 로드 후 캐시에 저장
            if (!atlas) {
                atlas = await methods.loadAssetByPath(plistDbPath) as SpriteAtlas;
                if (atlas) {
                    methods.atlasCache[plistDbPath] = atlas;
                }
            }
            // 3. 아틀라스 안에서 해당 이미지 프레임 찾기
            if (atlas) {
                let frame = atlas.getSpriteFrame(imageName);
                if (!frame) {
                    const baseName = imageName.split('/').pop()?.split('.')[0] || imageName;
                    frame = atlas.getSpriteFrame(baseName);
                }

                // 프레임을 찾았다면 루프를 멈추고 바로 반환!
                if (frame) {
                    return frame as SpriteFrame;
                }
            }
        }
        return null;
    },

    // Cocos Studio의 Slice 데이터를 Creator의 SpriteFrame 여백(Inset) 데이터로 변환하여 주입합니다.
    async applyScale9(sprite: Sprite, spriteFrame: SpriteFrame, options: any) {
        if (!options.scale9Enable) return;

        // 1. 컴포넌트 설정
        sprite.type = Sprite.Type.SLICED;
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;

        // 2. 이미 Creator 에디터 상에서 Slice 세팅을 해둔 에셋이라면 덮어쓰지 않음
        if (spriteFrame.insetLeft !== 0 || spriteFrame.insetRight !== 0 || spriteFrame.insetTop !== 0) {
            return;
        }

        const rect = spriteFrame.rect;
        const insetLeft = options.capInsetsX ?? 0;
        const insetBottom = options.capInsetsY ?? 0;
        const insetRight = rect.width - insetLeft - (options.capInsetsWidth ?? rect.width);
        const insetTop = rect.height - insetBottom - (options.capInsetsHeight ?? rect.height);

        const borderL = Math.max(0, insetLeft);
        const borderR = Math.max(0, insetRight);
        const borderB = Math.max(0, insetBottom);
        const borderT = Math.max(0, insetTop);

        // 1. 메모리상의 SpriteFrame에 즉시 적용 (현재 씬 반영)
        spriteFrame.insetLeft = borderL;
        spriteFrame.insetRight = borderR;
        spriteFrame.insetBottom = borderB;
        spriteFrame.insetTop = borderT;

        // 2. main.ts가 대신 수정해 주도록 리스트에 담아둡니다.
        methods.sliceMetaUpdates.push({
            uuid: spriteFrame.uuid,
            borderL, borderR, borderT, borderB
        });
    },

    applyTextEffects(rawText: string, label: Label): string {
        if (!rawText) return "";
        let cleanText = rawText;

        // 1. 그림자(Shadow) 태그 매칭: {shadow(#RRGGBB, offsetX, offsetY)}
        // \s* 를 추가하여 값 사이의 띄어쓰기를 유연하게 허용합니다.
        const shadowRegex = /\{shadow\(\s*(#[0-9a-fA-F]+)\s*,\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*\)\}/i;
        const shadowMatch = cleanText.match(shadowRegex);

        if (shadowMatch) {
            const hexColor = shadowMatch[1];
            const offsetX = parseFloat(shadowMatch[2]);
            const offsetY = parseFloat(shadowMatch[3]);

            const r = parseInt(hexColor.substring(1, 3), 16);
            const g = parseInt(hexColor.substring(3, 5), 16);
            const b = parseInt(hexColor.substring(5, 7), 16);
            const a = hexColor.length === 9 ? parseInt(hexColor.substring(7, 9), 16) : 255;

            label.enableShadow = true;
            label.shadowColor = new Color(r, g, b, a);
            label.shadowOffset = new Vec2(offsetX, offsetY);

            cleanText = cleanText.replace(shadowRegex, '');
        }

        // 2. 외곽선(Outline) 태그 매칭: {outline(#RRGGBB, width)}
        const outlineRegex = /\{outline\(\s*(#[0-9a-fA-F]+)\s*,\s*(\d+(?:\.\d+)?)\s*\)\}/i;
        const outlineMatch = cleanText.match(outlineRegex);

        if (outlineMatch) {
            const hexColor = outlineMatch[1];
            const width = parseFloat(outlineMatch[2]); // 두께 값

            // Hex 색상 변환
            const r = parseInt(hexColor.substring(1, 3), 16);
            const g = parseInt(hexColor.substring(3, 5), 16);
            const b = parseInt(hexColor.substring(5, 7), 16);
            const a = hexColor.length === 9 ? parseInt(hexColor.substring(7, 9), 16) : 255;

            // Cocos Creator 3.8+ Label 내부 속성 켜기
            label.enableOutline = true;
            label.outlineColor = new Color(r, g, b, a);
            label.outlineWidth = width;

            // 화면에 보이는 글자에서 태그 부분 삭제
            cleanText = cleanText.replace(outlineRegex, '');
        }

        return cleanText;
    },

    async loadAtlasInEditor() {
        // 1. 에디터 상의 절대 경로 (db://로 시작해야 함)
        // assets 폴더가 루트입니다. resources 폴더 안에 있다면 아래와 같습니다.
        const dbPath = 'db://assets/resources/PU_mBoxOrgelS19A05Atlas.plist';

        // 2. AssetDB에 요청하여 해당 경로의 UUID를 받아옵니다.
        // (주의: 이 기능은 Editor 프로세스와 통신해야 하므로 await이 필요합니다)
        const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbPath);

        if (!uuid) {
            console.error(`UUID를 찾을 수 없습니다. 경로를 확인하세요: ${dbPath}`);
            return;
        }

        console.log(`UUID 확인됨: ${uuid}`);

        // 3. UUID를 사용하여 로드 (resources.load 대신 assetManager.loadAny 사용)
        assetManager.loadAny(uuid, (err, asset) => {
            if (err) {
                console.error("로드 실패:", err);
                return;
            }

            // 4. 타입 확인 및 사용
            if (asset instanceof SpriteAtlas) {
                console.log("확장 프로그램에서 아틀라스 로드 성공!", asset);

                // 예: 로드한 아틀라스의 이름 출력
                const frames = asset.getSpriteFrames();
                console.log(`포함된 프레임 수: ${frames.length}`);
            } else {
                console.warn("로드된 에셋이 SpriteAtlas가 아닙니다.", asset);
            }
        });
    },
};

// 경로와 타겟 노드를 한 번에 찾아주는 헬퍼
function getTargetInfo(root: Node, targetName: string): { path: string, node: Node } | null {
    if (root.name === targetName) return { path: "", node: root };

    for (const child of root.children) {
        if (child.name === targetName) return { path: child.name, node: child };

        const sub = getTargetInfo(child, targetName);
        if (sub) {
            return { path: `${child.name}/${sub.path}`, node: sub.node };
        }
    }
    return null;
}

// 스튜디오 easing : creator 맵핑
const TweenToEasingMap: Record<number, number> = {
    0: 0, 1: 18, 2: 19, 3: 20, 4: 2, 5: 3, 6: 4, 7: 6, 8: 7, 9: 8,
    10: 10, 11: 11, 12: 12, 13: 14, 14: 15, 15: 16, 16: 22, 17: 23,
    18: 24, 19: 26, 20: 27, 21: 28, 22: 30, 23: 31, 24: 32, 25: 34,
    26: 35, 27: 36, 28: 38, 29: 39, 30: 40
};

// 이징 적용 함수
function applyCurveEasings(curve: any, tweens: number[]) {
    const values = curve._values || curve.values;

    if (values && values.length > 0) {
        // 마지막 키프레임은 다음 프레임이 없으므로 length - 1 까지만 순회
        for (let i = 0; i < values.length - 1; i++) {
            const targetTween = tweens[i + 1];

            if (targetTween !== undefined && targetTween !== 0) {
                const ccEasing = TweenToEasingMap[targetTween] || 0;
                if (ccEasing !== 0) {
                    values[i].easingMethod = ccEasing;
                }
            }
        }
    }
}
// serializeFunc 가져오기
function GetSerializeFunc() {
    let serializeFunc: any = null;
    // @ts-ignore
    if (typeof cce !== 'undefined') {
        // @ts-ignore
        if (cce.serialize) serializeFunc = cce.serialize;
        // @ts-ignore
        else if (cce.utils && cce.utils.serialize) serializeFunc = cce.utils.serialize;
    }
    // @ts-ignore
    if (!serializeFunc && typeof EditorExtends !== 'undefined' && EditorExtends.serialize) {
        // @ts-ignore
        serializeFunc = EditorExtends.serialize;
    }
    if (!serializeFunc) {
        // @ts-ignore
        const ccAny = typeof cc !== 'undefined' ? cc : null;
        if (ccAny) {
            // @ts-ignore
            if (ccAny.serialize) {
                // @ts-ignore
                serializeFunc = ccAny.serialize;
            } else {
                for (const key in ccAny) {
                    // @ts-ignore
                    if (typeof ccAny[key] === 'function' && ccAny[key].name === 'serialize') {
                        // @ts-ignore
                        serializeFunc = ccAny[key];
                        break;
                    }
                }
            }
        }
    }

    return serializeFunc;
}


// AR armature
async function setArmatureData(rootNode: Node, armatureData: any, textureMap: Record<string, string>) {
    const boneNodes: Record<string, Node> = {};
    for (const bone of armatureData.bone_data) {
        const boneNode = new Node(bone.name);
        const boneTransform = boneNode.addComponent(UITransform);
        boneTransform.setContentSize(0, 0);

        // 기본 Transform 세팅
        boneNode.setPosition(bone.x ?? 0, bone.y ?? 0);
        boneNode.setScale(bone.cX ?? 1, bone.cY ?? 1);

        // 각도(Degree)로 변환하고 부호(-) 반전
        const rotZ = -(bone.kX ?? 0) * (180 / Math.PI);
        boneNode.setRotationFromEuler(0, 0, rotZ);

        // 뼈대에 스킨(이미지) 데이터가 있다면 자식으로 Sprite를 달아줍니다.
        if (bone.display_data && bone.display_data.length > 0) {
            const skinNode = new Node(`skin`);
            const skinTransform = skinNode.addComponent(UITransform);
            const sprite = skinNode.addComponent(Sprite);
            skinNode.setParent(boneNode);
            skinNode.addComponent(UIOpacity);

            const dI = bone.dI ?? 0;
            if (dI >= 0 && dI < bone.display_data.length) {
                const displayObj = bone.display_data[dI];

                // 1) 비동기로 SpriteFrame 할당
                const sf = await methods.loadSpriteFrameFromImgName(displayObj.name, textureMap);
                if (sf) {
                    sprite.spriteFrame = sf;
                    skinTransform.setContentSize(sf.rect.width, sf.rect.height);
                    skinNode.setPosition(sf.offset.x, sf.offset.y);
                }

                // 2) 스킨 오프셋(skin_data) 적용!
                if (displayObj.skin_data && displayObj.skin_data.length > 0) {
                    const skin = displayObj.skin_data[0];
                    skinNode.setScale(skin.cX ?? 1, skin.cY ?? 1);

                    if (skin.kX) {
                        skinNode.setRotationFromEuler(0, 0, -skin.kX * (180 / Math.PI));
                    }
                }
            }

        }

        // 나중에 부모를 찾아주기 위해 딕셔너리에 저장, zIndex도 임시 저장
        boneNodes[bone.name] = boneNode;
        // @ts-ignore
        boneNode['_tempZ'] = bone.z ?? 0;
        console.log("[tg] _tempZ : ", bone.z);
    }

    const boneList: Node[] = [];
    for (const bone of armatureData.bone_data) {
        const node = boneNodes[bone.name];
        if (bone.parent && boneNodes[bone.parent]) {
            // 부모가 있으면 부모 뼈대 밑으로!
            node.setParent(boneNodes[bone.parent]);
        } else {
            // 없으면 최상위 루트 노드로!
            node.setParent(rootNode);
        }
        boneList.push(node);
    }

    // @ts-ignore
    boneList.sort((a, b) => a['_tempZ'] - b['_tempZ']);
    for (let i = 0; i < boneList.length; i++) {
        boneList[i].setSiblingIndex(i);
    }
}

// AR animation
async function setAnimationData(rootNode: Node, animData: any, armatureData: { bone_data: any[]; }, animManager: Animation, fileName: string, textureMap: Record<string, string>) {
    // sample rate
    const AR_FPS = 60;
    for (const mov of animData.mov_data) {
        const clip = new AnimationClip();
        clip.name = mov.name; // 예: "openBig"
        clip.sample = Math.round(AR_FPS * mov.sc);
        clip.duration = mov.dr / Math.round(AR_FPS * mov.sc); // 전체 프레임(dr) / sample rate

        if (mov.lp) { // lp가 true면 무한 반복
            clip.wrapMode = AnimationClip.WrapMode.Loop;
        }

        for (const movBone of mov.mov_bone_data) {
            const targetName = movBone.name;
            // 이전에 만들어둔 UI 경로 탐색 헬퍼(getTargetInfo)를 사용해 경로 획득
            const targetInfo = getTargetInfo(rootNode, targetName);
            if (!targetInfo) continue;

            const basePath = new animation.TrackPath().toHierarchy(targetInfo.path);

            const times: number[] = [];
            const px: number[] = [], py: number[] = [];
            const sx: number[] = [], sy: number[] = [];
            const rots: number[] = [];
            const opacities: number[] = [];
            const tweens: number[] = [];
            // 스프라이트 프레임 교체 데이터를 담을 배열
            const sfTimes: number[] = [];
            const sfValues: any[] = [];
            const sfOffsetX: number[] = [], sfOffsetY: number[] = [];
            const sfWidths: number[] = [];
            const sfHeights: number[] = [];
            let hasSpriteSwap = false;

            // 프레임 아이디(fi) 순으로 정렬
            const sortedFrames = movBone.frame_data.sort((a: { fi: number; }, b: { fi: number; }) => a.fi - b.fi);

            // 기본 포즈 값을 저장
            const originalBone = armatureData.bone_data.find((b: any) => b.name === targetName);


            const boneX = originalBone?.x ?? 0;
            const boneY = originalBone?.y ?? 0;
            const boneSx = originalBone?.cX ?? 1;
            const boneSy = originalBone?.cY ?? 1;
            const boneRot = originalBone?.kX ? -(originalBone.kX * (180 / Math.PI)) : 0;

            for (const frame of sortedFrames) {
                const time = frame.fi / Math.round(AR_FPS * mov.sc);
                times.push(time);

                px.push(boneX + (frame.x ?? 0));
                py.push(boneY + (frame.y ?? 0));
                // console.log("[tg] 이름", targetName, "bone cx ", boneSx, "frame cx: ", frame.cX, "result :", boneSx * (frame.cX ?? 1));
                sx.push(boneSx * (frame.cX ?? 1));
                sy.push(boneSy * (frame.cY ?? 1));

                //  라디안(kX) -> 각도(Degree) 변환 및 방향 반전
                const frameRot = frame.kX ? -(frame.kX * (180 / Math.PI)) : 0;
                rots.push(boneRot + frameRot);

                //  dI가 음수면 노드를 화면에서 안 보이게
                const displayIndex = frame.dI ?? 0;
                const originalAlpha = frame.color ? (frame.color.a ?? 255) : 255;

                if (displayIndex < 0) {
                    opacities.push(0); // dI가 -값이면 투명도 0으로 숨김
                } else {
                    opacities.push(originalAlpha); // 정상이면 원래 투명도
                }
                tweens.push(frame.twE ?? 0);

                // dI 속성이 있고, 뼈대 원본의 display_data에 해당하는 이미지가 있다면?
                if (frame.dI !== undefined && frame.dI >= 0) {
                    // 원본 뼈대 데이터(bone_data)를 찾아서 display_data를 가져온다.
                    if (originalBone && originalBone.display_data && originalBone.display_data[frame.dI]) {
                        const imageName = originalBone.display_data[frame.dI].name;
                        const sf = await methods.loadSpriteFrameFromImgName(imageName, textureMap); // 에셋 로드

                        if (sf) {
                            sfTimes.push(time);
                            sfValues.push(sf);
                            sfOffsetX.push(sf.offset.x ?? 0);
                            sfOffsetY.push(sf.offset.y ?? 0);
                            sfWidths.push(sf.rect.width ?? sf.originalSize.width ?? 0);
                            sfHeights.push(sf.rect.height ?? sf.originalSize.height ?? 0);
                            hasSpriteSwap = true;
                        }
                    }
                }
            }

            // 1. 위치
            const posTrack = new animation.VectorTrack();
            posTrack.componentsCount = 3;
            posTrack.path = new animation.TrackPath().append(basePath).toProperty('position');
            posTrack.channels()[0].curve.assignSorted(times, px);
            posTrack.channels()[1].curve.assignSorted(times, py);
            posTrack.channels()[2].curve.assignSorted(times, new Array(times.length).fill(0));
            applyCurveEasings(posTrack.channels()[0].curve, tweens);
            applyCurveEasings(posTrack.channels()[1].curve, tweens);
            clip.addTrack(posTrack);

            // 2. 크기
            const scaleTrack = new animation.VectorTrack();
            scaleTrack.componentsCount = 3;
            scaleTrack.path = new animation.TrackPath().append(basePath).toProperty('scale');
            scaleTrack.channels()[0].curve.assignSorted(times, sx);
            scaleTrack.channels()[1].curve.assignSorted(times, sy);
            scaleTrack.channels()[2].curve.assignSorted(times, new Array(times.length).fill(1));
            applyCurveEasings(scaleTrack.channels()[0].curve, tweens);
            applyCurveEasings(scaleTrack.channels()[1].curve, tweens);
            clip.addTrack(scaleTrack);

            // 3. 회전
            const rotTrack = new animation.VectorTrack();
            rotTrack.componentsCount = 3;
            rotTrack.path = new animation.TrackPath().append(basePath).toProperty('eulerAngles');
            rotTrack.channels()[0].curve.assignSorted(times, new Array(times.length).fill(0));
            rotTrack.channels()[1].curve.assignSorted(times, new Array(times.length).fill(0));
            rotTrack.channels()[2].curve.assignSorted(times, rots);
            applyCurveEasings(rotTrack.channels()[0].curve, tweens);
            applyCurveEasings(rotTrack.channels()[1].curve, tweens);
            clip.addTrack(rotTrack);

            // 뼈대에 display_data가 있는 경우(즉, skin 노드가 생성된 경우)에만 투명도 트랙 추가!
            if (originalBone && originalBone.display_data && originalBone.display_data.length > 0) {
                const skinNodePath = targetInfo.path ? `${targetInfo.path}/skin` : "skin";
                const opacityTrack = new animation.RealTrack();
                opacityTrack.path = new animation.TrackPath()
                    .toHierarchy(skinNodePath)
                    .toComponent('cc.UIOpacity')
                    .toProperty('opacity');

                opacityTrack.channel.curve.assignSorted(times, opacities);
                clip.addTrack(opacityTrack);
            }

            // 5. 스프라이트 교체 트랙 (ObjectTrack)
            if (hasSpriteSwap) {
                const spriteTrack = new animation.ObjectTrack();
                const skinNodePath = targetInfo.path ? `${targetInfo.path}/skin` : "skin";
                // 우리가 자식으로 만든 '_skin' 노드의 Sprite 컴포넌트를 타겟팅
                spriteTrack.path = new animation.TrackPath()
                    .toHierarchy(skinNodePath)
                    .toComponent('cc.Sprite')
                    .toProperty('spriteFrame');

                spriteTrack.channel.curve.assignSorted(sfTimes, sfValues);
                makeCurveConstant(spriteTrack.channel.curve);
                clip.addTrack(spriteTrack);

                // 스킨 offset
                const spritePosition = new animation.VectorTrack();
                spritePosition.componentsCount = 3;
                spritePosition.path = new animation.TrackPath().toHierarchy(skinNodePath).toProperty('position');

                spritePosition.channels()[0].curve.assignSorted(sfTimes, sfOffsetX);
                spritePosition.channels()[1].curve.assignSorted(sfTimes, sfOffsetY);
                spritePosition.channels()[2].curve.assignSorted(sfTimes, new Array(sfTimes.length).fill(0));
                makeCurveConstant(spritePosition.channels()[0].curve);
                makeCurveConstant(spritePosition.channels()[1].curve);
                clip.addTrack(spritePosition);
            }
        }

        // 5. 클립 저장
        let serializeFunc: any = GetSerializeFunc();
        if (!serializeFunc) {
            console.error("엔진에서 serialize 함수를 찾지 못했습니다! 현재 코드가 실행되는 곳이 어디인지 확인이 필요합니다.");
            return;
        }

        // 클립 직렬화!
        // (엔진의 serialize 함수는 문자열(String)이 아니라 객체(Object/Array)를 반환하므로 stringify를 해줘야 합니다)
        const serializedObj = serializeFunc(clip);
        const serializedStr = typeof serializedObj === 'string' ? serializedObj : JSON.stringify(serializedObj, null, 2);
        // 2. 물리 파일 저장 경로 세팅
        const animFileName = `${clip.name || 'action'}.anim`;
        const absoluteSaveDir = path.join(Editor.Project.path, 'assets', 'animations', fileName);
        const absoluteSavePath = path.join(absoluteSaveDir, animFileName);
        const dbUrl = `db://assets/animations/${fileName}/${animFileName}`;

        if (!fs.existsSync(absoluteSaveDir)) {
            fs.mkdirSync(absoluteSaveDir, { recursive: true });
        }

        // 3. 하드디스크에 파일 쓰기 (.anim 파일 생성)
        fs.writeFileSync(absoluteSavePath, serializedStr, 'utf-8');

        // 4. 에디터 데이터베이스에 갱신을 요청하고(UUID 발급 대기)
        await Editor.Message.request('asset-db', 'refresh-asset', dbUrl);
        const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbUrl);

        if (uuid) {
            // 5. 발급된 UUID를 통해 진짜 에셋 객체(Asset)를 로드
            // @ts-ignore
            const realClipAsset = await new Promise((resolve) => {
                // 에디터 환경에서는 cce.AssetManager를 써야 가장 안전하게 불러와집니다.
                // @ts-ignore
                if (typeof cce !== 'undefined' && cce.AssetManager) {
                    // @ts-ignore
                    cce.AssetManager.loadAsset(uuid, (err: any, asset: any) => resolve(asset));
                } else {
                    cc.assetManager.loadAny(uuid, (err: any, asset: any) => resolve(asset));
                }
            });

            if (realClipAsset) {
                // @ts-ignore
                animManager.clips.push(realClipAsset);

                if (!animManager.defaultClip) {
                    // @ts-ignore
                    animManager.defaultClip = realClipAsset;
                }
            }
        } else {
            console.warn(`UUID 발급 실패: ${animFileName}`);
        }
    }
}

// 곡선의 보간 방식을 Constant로 강제 고정
function makeCurveConstant(curve: any) {
    const values = curve._values || curve.values;
    if (values && values.length > 0) {
        for (let i = 0; i < values.length; i++) {
            // 0: LINEAR (부드럽게), 1: CONSTANT (뚝 끊어지게), 2: CUBIC
            values[i].interpolationMode = 1;
        }
    }
}