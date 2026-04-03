import { Node, UITransform, Size, Vec2, Vec3, Sprite, Label, Director, director, SpriteAtlas, assetManager, AnimationClip } from 'cc';
import * as cc from 'cc';
import { isArray } from 'util';

declare const cce: any;
// declare const ArmatureBone : any;

// main.ts에서 호출할 함수들
export const methods = {
    async createNodesFromUIData(fileName : string, json: any) {
 
        // 현재 열려있는 씬의 Canvas 찾기
        const scene = director.getScene();
        const canvas = scene?.getChildByName('Canvas');
        
        if (!canvas) {
            console.error("Canvas를 찾을 수 없습니다.");
            return;
        }
        console.log(`파일 이름 : ${fileName}`);

        // 루트 노드 생성
        const rootNode = new Node(fileName);
        rootNode.layer = canvas.layer; // UI 레이어 설정
        rootNode.parent = canvas;

        let animData =  null;
        // 1.x 데이터 파싱 시작 (widgetTree가 있다면)
        if (json["widgetTree"]) {
            console.log("[Importer] 노드 생성 시작...", JSON.stringify(json));
            var atlasArray : any = null;
            atlasArray = await loadPlist(json["textures"]);
            console.log("Test LoadPlist: ", atlasArray.length ); // 여기서 바로 데이터 사용 가능
            // 전역 변수로 태그 맵 저장 (parseWidget 실행 시 채워짐)
            let actionTagMap: Map<number, Node> = new Map();

            await parseWidget(json['widgetTree'], rootNode , atlasArray, actionTagMap, true);
            // 애니메이션 데이터 생성
            animData = await generateAnimations(json['animation'], rootNode, actionTagMap);
         }
        
     
        // 프리팹 생성을 위해 생성된 루트 노드의 UUID를 반환합니다.
        console.log("[Importer] 노드 uuid ", rootNode.uuid);
        
        return {
            uuid: rootNode.uuid,
            animations: animData // 메인 프로세스로 데이터 전달
        };
    },

    async createNodesFromARData(fileName : string, json: any) {
 
        // 현재 열려있는 씬의 Canvas 찾기
        const scene = director.getScene();
        const canvas = scene?.getChildByName('Canvas');
        
        if (!canvas) {
            console.error("Canvas를 찾을 수 없습니다.");
            return;
        }
        console.log(`파일 이름 : ${fileName}`);

        // 루트 노드 생성
        const rootNode = new Node(fileName);
        rootNode.layer = canvas.layer; // UI 레이어 설정
        rootNode.parent = canvas;

        let animData =  null;
        
        // 1.x 데이터 파싱 시작 (armature_data가 있다면)
        if (json["armature_data"]) {
            console.log("[Importer] 노드 생성 시작...", JSON.stringify(json));
            var atlasArray : any = null;
            atlasArray = await loadPlist(json["config_file_path"]);
            console.log("Test LoadPlist: ", atlasArray.length ); // 여기서 바로 데이터 사용 가능
            let boneNodesMap: Map<string, any> = new Map();
            await parseARBoneNode(json, rootNode , atlasArray, boneNodesMap);
        //      // 애니메이션 데이터 생성
            console.log(`[Importer] generateARAnimations... ${JSON.stringify(json['animation_data'])}`);
            animData = await generateARAnimations(json['animation_data'], rootNode, boneNodesMap);
         }
        
     
        // 프리팹 생성을 위해 생성된 루트 노드의 UUID를 반환합니다.
        console.log("[Importer] 노드 uuid ", rootNode.uuid);
        
        return {
            uuid: rootNode.uuid,
            animations: animData // 메인 프로세스로 데이터 전달
        };
    },
    
    //노드에 Animation componet 생성해서 clipUUId로 애니메이션 클립을 연결하는 코드 
    async addAnimationComponent (nodeUUID : string, clipUUIDs :string[]): Promise<string> {
        // 현재 열려있는 씬의 Canvas 찾기
        const scene = director.getScene();
        const canvas = scene?.getChildByName('Canvas');
        const targetNode = canvas?.getChildByUuid(nodeUUID);
        if(!targetNode){
            console.error(`Canvas에서 nodeUUID : ${nodeUUID} 의 노드가 없습니다.`);
            return nodeUUID;
        }
        let animComp = targetNode.getComponent(cc.Animation);
        if (!animComp) {
            animComp = targetNode.addComponent(cc.Animation);
        }
        
        // 🌟 핵심: cce.Asset.loadAsset(콜백 방식)을 Promise 방식으로 변환해주는 헬퍼 함수
        const loadClipAsync = (uuid: string): Promise<AnimationClip> => {
            return new Promise((resolve, reject) => {
                assetManager.loadAny(uuid, (err: any, loadedClip: AnimationClip) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(loadedClip);
                    }
                });
            });
        };

        try {
            // 2. 전달받은 모든 UUID를 비동기 로드 작업(Promise) 배열로 만듭니다.
            // const loadPromises = clipUUIDs.map(uuid => loadClipAsync(uuid));
            const loadPromises = [];
            for (const uuid of clipUUIDs) {
                const promiseJob = loadClipAsync(uuid); 
                loadPromises.push(promiseJob); 
            }

            // 3. Promise.all을 통해 모든 클립이 완전히 로드될 때까지 기다립니다. (병렬 처리라 속도도 빠릅니다!)
            const loadedClips: AnimationClip[] = await Promise.all(loadPromises);

            // 4. 로드된 클립 배열을 그대로 Animation 컴포넌트에 할당합니다.
            animComp.clips = loadedClips;
            
            // (선택) 배열에 클립이 있다면 첫 번째 클립을 기본(Default) 클립으로 지정합니다.
            if (loadedClips.length > 0) {
                animComp.defaultClip = loadedClips[0]; 
            }

            // TODO: 필요한 경우 ArmatureBone 같은 커스텀 자식 노드들도 여기서 생성
            // 5. 조립 완료된 노드의 UUID 반환
            return targetNode.uuid;

        } catch (error) {
            // 클립 중 하나라도 로드에 실패하면 여기로 빠집니다.
            console.error("클립 로드 중 치명적 에러 발생:", error);
            throw error; // 에러를 던져서 Main.ts의 try-catch가 잡을 수 있게 합니다.
        }
    },
};

async function loadPlist(textures : string[]) {
    if(!textures || textures.length === 0){
        return;
    }
   
    var size = textures.length;
    var atlasArray: SpriteAtlas[] = [];
    for(var n = 0; n < size; n++){
        const plistFile = textures[n];
         // 경로 생성 (슬래시 중복 방지 로직 포함 가능)
        const dbPath = `db://assets/resources/${plistFile}`;
        console.log("plist 로드 시작", n, plistFile); 
        
        try{
            // 2. AssetDB에 요청하여 해당 경로의 UUID를 받아옵
            // (주의: 이 기능은 Editor 프로세스와 통신해야 하므로 await이 필요)
            const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbPath);
            console.log("plist 로드", dbPath, uuid);
            if (!uuid) {
               console.log(`UUID를 찾을 수 없습니다. 경로를 확인하세요: ${dbPath}`); // 에러 발생 시 catch로 보냄
               continue;
            }
            else{
                const data = await new Promise((resolve, reject) => {
                        // 3. UUID를 사용하여 로드 (resources.load 대신 assetManager.loadAny 사용)
                        assetManager.loadAny(uuid, (err: any, atlas :SpriteAtlas ) => {
                            if (err) {
                                console.log("SpriteAtlas 로드 애러", err);
                                reject(err); // 에러 발생 시 catch로 보냄
                                return;
                            }

                            // 4. 타입 확인 및 사용
                            if (atlas instanceof SpriteAtlas) {
                                atlasArray.push(atlas);
                                console.log("확장 프로그램에서 아틀라스 로드 성공!", atlas);
                                // 예: 로드한 아틀라스의 이름 출력
                                const frames = atlas.getSpriteFrames();
                                console.log(`포함된 프레임 수: ${frames.length}`);
                                resolve(atlas); // 성공 시 data 변수에 결과 담김
                            } else {
                                console.warn("로드된 에셋이 SpriteAtlas가 아닙니다.", atlas);
                                reject(err); // 에러 발생 시 catch로 보냄
                            }        
                        });
                    });
                console.log("plist 로드 완료: ", n , atlasArray.length, data); // 여기서 바로 데이터 사용 가능
            }
        } catch(error){
            console.error("로딩 실패:", error);
        }
    }
    return atlasArray;
}

async function loadBMFont(fileName:string) {

    let bmFontResouce : cc.BitmapFont | null = null;
    console.log("BMFont 로드 시작", fileName); 
    // 경로 생성 (슬래시 중복 방지 로직 포함 가능)
    const dbPath = `db://assets/resources/${fileName}`;
        
    try{
        // 2. AssetDB에 요청하여 해당 경로의 UUID를 받아옵니다.
        // (주의: 이 기능은 Editor 프로세스와 통신해야 하므로 await이 필요합니다)
        const uuid = await Editor.Message.request('asset-db', 'query-uuid', dbPath);
        console.log("BMFont 로드", dbPath, uuid);
        if (!uuid) {
            console.log(`UUID를 찾을 수 없습니다. 경로를 확인하세요: ${dbPath}`); // 에러 발생 시 catch로 보냄
            return null;
        }
        else{
            const data = await new Promise((resolve , reject)=>{
                    // 3. UUID를 사용하여 로드 (resources.load 대신 assetManager.loadAny 사용)
                    assetManager.loadAny(uuid, (err: any, bmFont : cc.BitmapFont ) => {
                        if (err) {
                            reject(err); // 에러 발생 시 catch로 보냄
                            return;
                        }

                        // 4. 타입 확인 및 사용
                        if (bmFont instanceof cc.BitmapFont) {
                            bmFontResouce = bmFont;
                            console.log("확장 프로그램에서 아틀라스 로드 성공!", bmFont);
                            // 예: 로드한 아틀라스의 이름 출력
                            resolve(bmFont); // 성공 시 data 변수에 결과 담김
                        } else {
                            console.warn("로드된 에셋이 BMFont가 아닙니다.", bmFont);
                            reject(err); // 에러 발생 시 catch로 보냄
                        }        
                    });
                });
            console.log("BMFont 로드 완료: "); // 여기서 바로 데이터 사용 가능
        }
    } catch(error){
        console.error("로딩 실패:", error);
    }
    return bmFontResouce;
}

/**
 * 위젯 데이터를 분석하여 노드를 생성하고 속성을 적용하는 메인 재귀 함수
 */
async function parseWidget(widgetData: any, parent: Node, atlasArray: any, actionTagMap: Map<number, Node>, isRoot : boolean ) {
    const classname = widgetData["classname"];
    const options = widgetData["options"];

    // 1. 노드 생성 (이름이 없으면 클래스명 사용)
    const newNode = new Node(options["name"] || classname);
    newNode.layer = parent.layer; // 부모와 같은 레이어 사용 (UI)
    parent.addChild(newNode);

    // 2. 크기 및 앵커 포인트 설정 (UITransform)
    const trans = newNode.addComponent(UITransform);
    const width = options["width"] || 0;
    const height = options["height"] || 0;

    if (options["anchorPointX"] !== undefined && options["anchorPointY"] !== undefined) {
        trans.setAnchorPoint(options["anchorPointX"], options["anchorPointY"]);
    }

    // 3. 좌표 설정 (x, y)
    const x = options['x'] || 0;
    const y = options['y'] || 0;
    newNode.setPosition(new Vec3(x, y, 0));

    // 4. 회전 및 스케일 (필요한 경우)
    if (options['rotation']) {
        // Cocos Studio는 2D 회전(Z축)만 씀
        newNode.angle = -options['rotation']; // 방향이 반대일 수 있으므로 체크 필요
    }
    if (options['scaleX'] !== undefined || options['scaleY'] !== undefined) {
        const sx = options['scaleX'] ?? 1;
        const sy = options['scaleY'] ?? 1;
        newNode.setScale(new Vec3(sx, sy, 1));
    }

    // 5. 투명도 (Opacity) - 255 기준
    if (options['opacity'] !== undefined && options['opacity'] < 255) {
        // Creator 3.x에서는 UIOpacity 컴포넌트를 써야 하지만, 
        // 간단하게는 Sprite나 Label의 Color Alpha를 조절하기도 함.
        // 여기서는 일단 생략 (필요 시 UIOpacity 추가)
    }
    // 6. visible
    if (typeof options['visible'] === 'boolean'){
        newNode.active = options['visible'];
    }

    // 6. 컴포넌트별 매핑 로직
    switch (classname) {
        case 'Panel':
            //setupSprite(newNode, options);
            // 패널은 보통 터치를 막는 배경 역할을 함
            newNode.addComponent(cc.BlockInputEvents);
            break;
        case 'Button':
            // setupSprite(newNode, options, atlasArray); // 일반 상태 이미지
            const btn = newNode.addComponent(cc.Button);
            btn.target = newNode;
            if (options["normalData"] && options["normalData"]["path"]) {
                btn.transition = cc.Button.Transition.SPRITE; // 눌렀을 때 이미지 교체
                let spriteName = options["normalData"]["path"];
                const sprite = newNode.addComponent(Sprite);
                sprite.spriteFrame = findSprite(atlasArray, spriteName);
                btn.normalSprite = sprite.spriteFrame ;
                if (options["pressedData"] && options["pressedData"]["path"]) {
                    spriteName = options["pressedData"]["path"];
                    btn.pressedSprite = findSprite(atlasArray, spriteName);
                }
                if (options["disabledData"] && options["disabledData"]["path"]) {
                    spriteName = options["disabledData"]["path"];
                    btn.disabledSprite = findSprite(atlasArray, spriteName);
                }
            }
            else {
                btn.transition = cc.Button.Transition.SCALE; // 눌렀을 때 살짝 작아지는 효과
            }
            break;
    
        case 'CheckBox':
            // 배경(Back)과 체크(Active) 이미지가 보통 따로 있음
            // 여기서는 기본 배경만 처리하고, 체크 이미지는 자식 노드로 붙을 가능성이 높음
            //setupSprite(newNode, options);
            const toggle = newNode.addComponent(cc.Toggle);
            toggle.target = newNode;
            break;

        case 'ImageView':
            setupSprite(newNode, options, atlasArray);
            break;

        case 'LabelAtlas':
            break;
        case 'LabelBMFont':
        case 'Label':
                const label = newNode.addComponent(cc.Label);
                if(options['fileNameData'] && options['fileNameData']['path']){
                    const bmFontStr = options['fileNameData']['path'];
                    let bmFont = await loadBMFont(bmFontStr);
                    label.useSystemFont = false;
                    label.font = bmFont;
                }
                else {
                    label.useSystemFont = true;
                    // --- 일반 Label 로직 ---
                    label.fontSize = options.fontSize || 20;
                    // Line Height
                    if (options.lineHeight !== undefined) {
                        label.lineHeight = options.lineHeight;
                    } else {
                        label.lineHeight = label.fontSize;
                    }
                }
                label.string = options['text'];
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
                    label.color = new cc.Color(options.colorR, options.colorG, options.colorB, options.opacity ?? 255);
                }
            break;
        case 'ListView':
            break;
        case 'LoadingBar':
            //setupSprite(newNode, options);
            const progressBar = newNode.addComponent(cc.ProgressBar);
            progressBar.totalLength = width;
            progressBar.progress = (options['percent'] || 0) / 100;
            progressBar.mode = cc.ProgressBar.Mode.FILLED; // filled로 세팅

            // 2. 게이지 역할을 할 자식 노드(Bar) 생성
            const barNode = new Node("Bar");
            barNode.layer = newNode.layer;
            barNode.parent = newNode;

            const barUI = barNode.addComponent(UITransform);
            let barSprite : Sprite | null = setupSprite(barNode, options, atlasArray); // 4. 텍스처(이미지) 로드 및 나인패치(9-Slice) 지원
            if(!barSprite) barSprite = barNode.addComponent(Sprite); 
            barSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            const barPos :Vec3= barNode.getPosition();

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


            // 5. ProgressBar 컴포넌트에 방금 만든 자식(Bar) 연결 및 수치 세팅
            progressBar.barSprite = barSprite;
            progressBar.totalLength = 1;
            // 스튜디오의 percent는 0~100 이고, Creator의 progress는 0~1.0
            progressBar.progress = (options.percent ?? 0) / 100;

            // 6. Bar Node 포지션 수정
            // 처음 sprite 세팅할 때 기본 Horizontal로 세팅되면서 x: width / 2 값 들어갈 수 있음.
            barNode.setPosition(barPos);
            
            break;
        case 'PageView':
            break;
        case 'ScrollView':
        // case 'ListView':
            // 스크롤뷰는 구조가 복잡(View -> Content)해서 껍데기만 생성
            //setupSprite(newNode, options); // 배경색
            newNode.addComponent(cc.ScrollView);
            break;
        case 'Slider':
            break;    
        case 'TextField':
            //setupSprite(newNode, options);
            const edit = newNode.addComponent(cc.EditBox);
            // EditBox 세부 설정은 복잡하므로 기본만 추가
            break;
    }

    // 숫자가 클수록 나중에 그려짐 (화면 맨 위)
    trans.priority = options["ZOrder"] || 0;
    
    // (주의: 이 방법은 부모에 이미 자식이 다 붙어있을 때 가능하다  priority 는 deprecated)
    //newNode.setSiblingIndex(options["ZOrder"]);

    //위에서 먼저 하게 되면 spriteFrame 등록할때 그 SpriteFrame에 맞춰서 contentSize가 변경되기때문에 마지막에 해야한다.
    trans.setContentSize(new Size(width, height));

    const tag = options['actiontag'];
    if(tag){
        actionTagMap.set(tag, newNode);
    }
    
    // 7. 자식 노드 재귀 호출 (Children)
    const children = widgetData['children'];
    if (children && children.length > 0) {
        for( var n = 0; n < children.length; n++){
          await parseWidget(children[n], newNode, atlasArray, actionTagMap, false);
        }
    }

    if(isRoot){
        let contentSize : Size = trans.contentSize;
        let pos : Vec3 = newNode.position;
        pos.x -= contentSize.width * 0.5;
        pos.y -= contentSize.height * 0.5;
        newNode.setPosition(pos);
    }
}

function findSprite(atlasArray: any, spriteFrameName: string) {
    // --- 이미지 로드 로직 ---
    let path = spriteFrameName;           // 예: “button.png”
    path = path.replace(".png", "");
    var frame = null;
    for (var n = 0; n < atlasArray.length; n++) {
        frame = atlasArray[n].getSpriteFrame(path);
        if (frame) {
            return frame;
        }
    }
    return null;
}

// /**
//  * 스프라이트 및 이미지 로드 처리 (Plist 지원 포함)
//  */
function setupSprite(node: Node, options: any, atlasArray: any) {
    // 9-slice 설정 확인
    const isScale9 = options['scale9Enable'];

    // 이미지가 필요한 경우 Sprite 컴포넌트 추가
    // (Panel은 배경색만 있거나 투명할 수도 있어서 체크)
    let fileData = options['fileNameData'] || options['textureData'];

    if (fileData || options['colorType'] === 1 || isScale9) {
        const sprite = node.getComponent(Sprite)||node.addComponent(Sprite);
        if (isScale9) {
            sprite.type = Sprite.Type.SLICED;
        }

        // 색상 적용 (RGB)
        if (options['colorR'] !== undefined) {
            sprite.color = new cc.Color(options['colorR'], options['colorG'], options['colorB']);
        }

        // --- 이미지 로드 로직 ---
        if (fileData) {
            let path = fileData['path'];           // 예: “button.png”
            path = path.replace('.png', '');
            var frame = null;
            for(var n = 0 ; n < atlasArray.length; n++){
                frame = atlasArray[n].getSpriteFrame(path);
                if(frame){
                    sprite.spriteFrame = frame;
                    const offsetX = frame.offset.x; // -88
                    const offsetY = frame.offset.y; // 37
                    let pos = node.getPosition();
                    pos.x += offsetX;
                    pos.y += offsetY;
                    node.setPosition(pos);
                    return sprite;
                }
            }
        }
    }
    return null;
}
//#region AnimationTrack
/**
 * 3. 애니메이션 변환 메인 함수
 */

/**
 * 객체 배열에서 원하는 속성(Keys)들만 추출하여 개별 배열로 묶어주는 제네릭 함수
 * @param items 원본 데이터 배열 (예: cc.Vec3[], cc.Color[])
 * @param keys 추출할 속성 이름들의 배열 (예: ["x", "y", "z"], ["r", "g", "b", "a"])
 * @returns 각 속성 이름을 키로 하고, 해당 속성값들의 배열을 값으로 가지는 객체
 *  const separatedPos = extractProperties(posValues, ["x", "y", "z"]);
    console.log(separatedPos[0]); // number[] : X축 값들만 쫙!
    console.log(separatedPos[1]); // number[] : Y축 값들만 쫙!
    console.log(separatedPos[2]); // number[] : Z축 값들만 쫙!
 */
function extractProperties<T, K extends keyof T>(
    items: T[], 
    keys: K[]
): T[K][][] {
    
    const result :T[K][][] = [];
    for (let i = 0; i < keys.length; i++) {
        result.push([]);
    }

    // 3. 단일 루프로 데이터를 돌면서 각각의 배열에 값 분배 (성능 최적화)
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        for (let j = 0; j < keys.length; j++) {
            const key = keys[j];
            result[j].push(item[key]);
        }
    }

    return result;
}

function addCurveKeyFrame(curve: cc.RealCurve | cc.QuatCurve | cc.ObjectCurve<unknown>, keyTime: number[], values : number[], easingMethods : number[] | null = null){
    let preTagnentDatas: any = null;
    for(let n = 0; n < keyTime.length; n++){
        let tweenFrameMode = cc.RealInterpolationMode.LINEAR;
        if (easingMethods != null && easingMethods.length > n ) {
            if(easingMethods[n] < 0 ) 
                tweenFrameMode = cc.RealInterpolationMode.CONSTANT;
            else if(easingMethods[n] > 0) //easingMethods[n] 값이 0 이면 LINEAR
                tweenFrameMode = cc.RealInterpolationMode.CUBIC;
            else 
                tweenFrameMode = cc.RealInterpolationMode.LINEAR;
        }

        const data: any = { value: values[n], interpolationMode: tweenFrameMode };
        let tagnentData = null;
        if (easingMethods != null && tweenFrameMode === cc.RealInterpolationMode.CUBIC) {
            if (keyTime.length - 1 > n) { 
                const dataValue = data.value;
                const nextDataValue = values[n + 1] as number;;
                if (Math.abs(dataValue - nextDataValue) > Number.EPSILON) {
                    tagnentData = getHermiteTangetByEasingType(easingMethods[n], keyTime[n], keyTime[n + 1], dataValue, nextDataValue);
                    if (tagnentData) {
                        data.tangentWeightMode = cc.TangentWeightMode.RIGHT;
                        data.rightTangent = tagnentData.rightTangent; //나가는(오른쪽) 방향의 기울기
                        data.rightTangentWeight = tagnentData.rightTangentWeight;  //오른쪽 가중치
                    }
                }
            }
        }
        if (preTagnentDatas) {
            data.interpolationMode = cc.RealInterpolationMode.CUBIC;
            if(data.tangentWeightMode === cc.TangentWeightMode.RIGHT)
                data.tangentWeightMode = cc.TangentWeightMode.BOTH;
            else 
                data.tangentWeightMode = cc.TangentWeightMode.LEFT;

            data.leftTangent = preTagnentDatas.leftTangent; //들어오는쪽(왼쪽) 기울기 (0이면 기울기 없음)
            data.leftTangentWeight = preTagnentDatas.leftTangentWeight;  //왼쪽 기울기의 가중치 (값이 크면 기울기 값 더 크게 영향 받음)
        }
        preTagnentDatas = tagnentData;
        curve.addKeyFrame(keyTime[n], data); 
    }
}

function createPositionTrack(nodeName : string, targetNode : cc.Node, keyTime: number[], values : cc.Vec3[], easingMethods : number[] | null = null ) {
    if(!values || values.length === 0){
        return null
    }

    const posTrack = new cc.animation.VectorTrack(); // Vec3 데이터용 트랙
    posTrack.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toProperty('position'); // 속성 이름

    posTrack.componentsCount = 3; // 벡터 트랙의 첫 세 채널 사용
    const channels = posTrack.channels();
    
    // for(let n = 0; n < keyTime.length; n++){
    //     channels[0].curve.addKeyFrame( keyTime[n], {value : posValues[n].x, easingMethod: easingMethods[n]}); 
    //     channels[1].curve.addKeyFrame( keyTime[n], {value : posValues[n].y, easingMethod: easingMethods[n]}); 
    //     channels[2].curve.addKeyFrame( keyTime[n], {value : posValues[n].z, easingMethod: easingMethods[n]}); 
    // }
    const valuesList = extractProperties(values, ["x", "y", "z"]);
    for(let n =0; n < valuesList.length; n++){
       addCurveKeyFrame( channels[n].curve, keyTime, valuesList[n], easingMethods);
    }
    return posTrack;
}

function createZOrderTrack(nodeName : string, targetNode : cc.Node, keyTime: number[], zOrderValues : number[]){
    if(!zOrderValues || zOrderValues.length === 0){
        return null
    }
    
    if(!targetNode.getComponent("ZOrderHelper")){
        targetNode.addComponent("ZOrderHelper");
    }
     
    const track = new cc.animation.RealTrack(); // RealTrack 생성 
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent("ZOrderHelper")
        .toProperty('zOrder'); // 속성 이름 (주의: 이 방법은 부모에 이미 자식이 다 붙어있을 때 가능하다  priority 는 deprecated)     //newNode.setSiblingIndex(options["ZOrder"]);

    for(let n = 0; n < keyTime.length; n++){
          track.channel.curve.addKeyFrame(keyTime[n], {value : zOrderValues[n]});
    }


    // 3.8에서 추가된 cc.Sorting2D는 문제가 있다..
    //sprite가 있는 노드에 붙여야 하고 계층구조를 무시하고 sorting2D가 붙여 있는 노드를 가져와 정렬하기때문에 우리가 사용하려는 의도와 맞지 않다
    // if(!targetNode.getComponent(cc.Sorting2D)){
    //     targetNode.addComponent(cc.Sorting2D);
    // }
     
    // const track = new cc.animation.RealTrack(); // RealTrack 생성 
    // track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
    //     .toHierarchy(nodeName)   // 구 HierarchyPath
    //     .toComponent(cc.Sorting2D)
    //     .toProperty('sortingOrder'); // 속성 이름 (주의: 이 방법은 부모에 이미 자식이 다 붙어있을 때 가능하다  priority 는 deprecated)     //newNode.setSiblingIndex(options["ZOrder"]);

    // for(let n = 0; n < keyTime.length; n++){
    //       track.channel.curve.addKeyFrame(keyTime[n], {value : zOrderValues[n]});
    // }

    return track;
}

function createScaleTrack( nodeName : string, targetNode : cc.Node, keyTime: number[], values : cc.Vec3[], easingMethods : number[] = []) {
    if(!values || values.length === 0){
        return null
    }    
  
    const track = new cc.animation.VectorTrack(); // Vec3 데이터용 트랙
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toProperty('scale');       // 속성 이름

    track.componentsCount = 3; // 벡터 트랙의 첫 세 채널 사용
    const channels = track.channels();

    const valuesList = extractProperties(values, ["x", "y", "z"]);
    for(let n =0; n < valuesList.length; n++){
       addCurveKeyFrame( channels[n].curve, keyTime, valuesList[n], easingMethods);
    }
    return track;
}

function createRotTrack( nodeName : string ,targetNode : cc.Node, keyTime: number[], values : number[], easingMethods : number[] = []) {
    if(!values || values.length === 0){
        return null
    }
    
    const track = new cc.animation.QuatTrack(); // QuatTrack 회전 전용 트랙
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toProperty('rotation');       // 속성 이름
    
    addCurveKeyFrame( track.channel.curve, keyTime, values, easingMethods);
    return track;
}

function createColorTrack( nodeName : string, targetNode : cc.Node, keyTime: number[], values : cc.Color[], easingMethods : number[] = []) {
    if(!values || values.length === 0){
        return null
    }    

    let componetName : any = null;
    if(targetNode.getComponent(cc.Label))
       componetName = "cc.Label"; 
    else if(targetNode.getComponent(cc.Sprite))
       componetName = "cc.Sprite"; 
    else if(targetNode.getComponent("ArmatureBone"))
       componetName = "ArmatureBone";
    else 
        return;

    const track = new cc.animation.ColorTrack(); // Color 데이터용 트랙
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent(componetName)
        .toProperty('color'); // 속성 이름

    const channels = track.channels();
    const valuesList = extractProperties(values, ["r", "g", "b"]);
    for(let n =0; n < valuesList.length; n++){
       addCurveKeyFrame( channels[n].curve, keyTime, valuesList[n], easingMethods);
    }
    return track;
}

function createOpacityTrack(nodeName : string, targetNode : cc.Node, keyTime: number[], values : number[], easingMethods : number[] = []){
    if(!values || values.length === 0){
        return null
    }
    
    let componetName = null;
    if(targetNode.getComponent("ArmatureBone")){
       componetName = "ArmatureBone";
    }else{ 
        if(!targetNode.getComponent(cc.UIOpacity)){
            targetNode.addComponent(cc.UIOpacity);
        }
        componetName = "cc.UIOpacity";
    }

    const track = new cc.animation.RealTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent(componetName)
        .toProperty('opacity'); // 속성 이름

            
    addCurveKeyFrame( track.channel.curve, keyTime, values, easingMethods);
    return track;
}

function createArmatureDisplayIndexTrack(nodeName : string , targetNode : cc.Node, keyTime: number[], displayIndexValues : number[]){
    if(!displayIndexValues || displayIndexValues.length === 0){
        return null
    }
    
    if(!targetNode.getComponent("ArmatureBone")){
        targetNode.addComponent("ArmatureBone");
    }

    const track = new cc.animation.RealTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent("ArmatureBone")
        .toProperty('displayIndex'); // 속성 이름

    for(let n = 0; n < keyTime.length; n++){
          track.channel.curve.addKeyFrame(keyTime[n], {value : displayIndexValues[n], interpolationMode : cc.RealInterpolationMode.CONSTANT});
    }

    return track;
}

//회전이지만 회전아닌 그대
function createArmatureSkewTrack(nodeName : string , targetNode : cc.Node, keyTime: number[], values : Vec2[], easingMethods : number[] = []){
    if(!values || values.length === 0){
        return null
    }
    
    if(!targetNode.getComponent("ArmatureBone")){
        targetNode.addComponent("ArmatureBone");
    }

    const track = new cc.animation.VectorTrack(); // RealTrack 생성 (0 ~ 255 숫자 제어)
    track.componentsCount = 2;
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent("ArmatureBone")
        .toProperty('skew'); // 속성 이름

    const channels = track.channels();
    const valuesList = extractProperties(values, ["x", "y"]);
    for(let n =0; n < valuesList.length; n++){
       addCurveKeyFrame( channels[n].curve, keyTime, valuesList[n], easingMethods);
    }
    return track;
}

//Blanding
function createArmatureBlendingTrack(nodeName : string , targetNode : cc.Node, keyTime: number[], values : any[]){
    if(!values || values.length === 0){
        return null
    }
    
    if(!targetNode.getComponent("ArmatureBone")){
        targetNode.addComponent("ArmatureBone");
    }

    const track = new cc.animation.VectorTrack(); // 
    track.componentsCount = 2;
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent("ArmatureBone")
        .toProperty('blendMode'); // 속성 이름

    const channels = track.channels();
   for(let n = 0; n < keyTime.length; n++){
          channels[0].curve.addKeyFrame(keyTime[n], {value : values[n].x, interpolationMode : cc.RealInterpolationMode.CONSTANT});
          channels[1].curve.addKeyFrame(keyTime[n], {value : values[n].y, interpolationMode : cc.RealInterpolationMode.CONSTANT});
    }

    return track;
}

function createArmatureZOrderTrack(nodeName : string, targetNode : cc.Node, keyTime: number[], zOrderValues : number[]){
    if(!zOrderValues || zOrderValues.length === 0){
        return null
    }
     
    const track = new cc.animation.RealTrack(); // RealTrack 생성 
    track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
        .toHierarchy(nodeName)   // 구 HierarchyPath
        .toComponent("ArmatureBone")
        .toProperty('zOrder'); // 속성 이름 (주의: 이 방법은 부모에 이미 자식이 다 붙어있을 때 가능하다  priority 는 deprecated)     //newNode.setSiblingIndex(options["ZOrder"]);

    for(let n = 0; n < keyTime.length; n++){
          track.channel.curve.addKeyFrame(keyTime[n], {value : zOrderValues[n]});
    }


    // 3.8에서 추가된 cc.Sorting2D는 문제가 있다..
    //sprite가 있는 노드에 붙여야 하고 계층구조를 무시하고 sorting2D가 붙여 있는 노드를 가져와 정렬하기때문에 우리가 사용하려는 의도와 맞지 않다
    // if(!targetNode.getComponent(cc.Sorting2D)){
    //     targetNode.addComponent(cc.Sorting2D);
    // }
     
    // const track = new cc.animation.RealTrack(); // RealTrack 생성 
    // track.path = new cc.animation.TrackPath()  // 트랙 경로 지정, 즉 대상 객체 "Label_Parent"의 자식 노드의 "position" 속성 지정 
    //     .toHierarchy(nodeName)   // 구 HierarchyPath
    //     .toComponent(cc.Sorting2D)
    //     .toProperty('sortingOrder'); // 속성 이름 (주의: 이 방법은 부모에 이미 자식이 다 붙어있을 때 가능하다  priority 는 deprecated)     //newNode.setSiblingIndex(options["ZOrder"]);

    // for(let n = 0; n < keyTime.length; n++){
    //       track.channel.curve.addKeyFrame(keyTime[n], {value : zOrderValues[n]});
    // }

    return track;
}
//#endregion AnimationTrack

/**
 * 특정 노드까지의 경로(Path)를 구하는 함수
 */
function getNodePath(root: Node, target: Node): string {
    let path = target.name;
    let parent = target.parent;
    while (parent && parent !== root && parent !== null) {
        path = parent.name + "/" + path;
        parent = parent.parent;
    }
    return path;
}

async function generateAnimations(json: any, rootNode: Node, actionTagMap: Map<number, Node>) {
    const fps = 60;
    // 1. 구조에 맞게 'actionlist'를 가져옵니다.
    const actionList = json['actionlist']; 
    if (!actionList || actionList.length === 0) return null;

    const clipsData: any[] = [];

    for (const actionData of actionList) {
        const clipName = actionData['name'];
        console.log(`[Importer] 애니메이션 변환: ${clipName}`);
        const clip = new cc.AnimationClip();
        clip.name = clipName;
        clip.wrapMode = actionData['loop'] ? cc.AnimationClip.WrapMode.Loop : cc.AnimationClip.WrapMode.Normal;
        let unittime =  actionData['unittime'] ? actionData['unittime']  : (1/60);//UIACtion 한프레임당 시간
        let maxTime : number = 0; // 클립의 전체 길이를 계산하기 위한 변수

        const actionNodeList = actionData['actionnodelist'];
        if (actionNodeList) {
            for (const actionNode of actionNodeList) {
                const actionTag = actionNode['ActionTag']; // 대소문자 주의 (ActionTag)
                const targetNode = actionTagMap.get(actionTag);

                if (!targetNode) continue;

                const frameList = actionNode['actionframelist'];
                if (!frameList || frameList.length === 0) continue;


                //TypeScript는 "변수명" : "타입" = "값"
                // https://docs.cocos.com/creator/3.8/manual/en/animation/use-animation-curve.html
                // --- 프레임 순회하며 데이터 추출 ---
                let keyTime : number[] = [];       //필수

                let prevPos : any = null;
                let posValues       : { keyTime: number[]; value: Vec3[], easingMethod : number[] } = { //cc.Vec3[] = [];          //필수
                    keyTime      : [],
                    value        : [],   
                    easingMethod : []
                }
                
                let prevScale : any = null;
                let scaleValues     : { keyTime: number[]; value: Vec3[], easingMethod : number[]} = { // cc.Vec3[] = [];          // {1,1}
                    keyTime      : [],
                    value        : [],   
                    easingMethod : []
                }
                     
                let prevRot : number | null = null;  //0 ~ 360  // 0
                let rotValues     : { keyTime: number[]; value: number[], easingMethod : number[]} = { // cc.Vec3[] = [];          // {1,1}
                    keyTime      : [],
                    value        : [],   
                    easingMethod : []
                }

                let prevColor : any = null; //new cc.Color(255,255,255,255);
                let colorValues     :{ keyTime: number[]; value: cc.Color[], easingMethod : number[]} = {//cc.Color[] = [];         // {255,255,255}
                    keyTime      : [],
                    value        : [],   
                    easingMethod : []
                }

                let prevOpacity : any = null; //255
                let opacityValues   :{ keyTime: number[]; value: number[], easingMethod : number[]} = {//umber[] = [];           // 255
                    keyTime      : [],
                    value        : [],   
                    easingMethod : []
                }
                
                // 1.UIAction 값 파싱
                for (const frame of frameList) {
                    const time : number = frame['frameid'] * unittime; // unittime 으로 시간 계산
                    if (time > maxTime) maxTime = time;
                    
                    // //legacy-clip-data.ts
                    // keyTime.push(time);
                    let tweenType :number = 0;
                    if (frame['tweenType'] !== undefined) tweenType = frame['tweenType'];
          
                    // 1. Position
                    let pos = new Vec3(0,0,0);
                    if (frame['positionx'] !== undefined) pos.x = frame['positionx'];
                    if (frame['positiony'] !== undefined) pos.y = frame['positiony'];
                    if(!prevPos || Math.abs(prevPos.x - pos.x) > Number.EPSILON || Math.abs(prevPos.y - pos.y) > Number.EPSILON) {
                        posValues.keyTime.push(time);
                        posValues.value.push(pos);
                        posValues.easingMethod.push(tweenType);
                    }

                    // 2. Scale
                    let scale = new Vec3(0,0,1);
                    if (frame['scalex'] !== undefined) scale.x = frame['scalex'];
                    if (frame['scaley'] !== undefined) scale.y = frame['scaley'];
                    if(!prevScale || Math.abs(prevScale.x - scale.x) > Number.EPSILON || Math.abs(prevScale.y - scale.y) > Number.EPSILON){
                        scaleValues.keyTime.push(time);
                        scaleValues.value.push(scale); 
                        scaleValues.easingMethod.push(tweenType);
                    }

                    // 3. Rot
                    let rot = 0;
                    if (frame['rotation'] !== undefined) rot = frame['rotation'];
                    if(!prevRot || Math.abs(prevRot - rot) > Number.EPSILON){
                        rotValues.keyTime.push(time);
                        rotValues.value.push(rot); 
                        rotValues.easingMethod.push(tweenType);
                    }


                    // 4.color
                    let color = new cc.Color(255,255,255);
                    if (frame['colorr'] !== undefined) color.x = frame['colorr'];
                    if (frame['colorg'] !== undefined) color.y = frame['colorg'];
                    if (frame['colorb'] !== undefined) color.z = frame['colorb'];
                    if(!prevColor || prevColor.r !== color.r || prevColor.g !== color.g || prevColor.b !== color.b){
                        colorValues.keyTime.push(time);
                        colorValues.value.push(color); 
                        colorValues.easingMethod.push(tweenType);
                    }

                    // 5.opacity
                    let opacity = 255;
                    if (frame['opacity'] !== undefined) opacity = frame['opacity'];
                    if(!prevOpacity || prevOpacity !== opacity){
                        opacityValues.keyTime.push(time);
                        opacityValues.value.push(opacity); 
                        opacityValues.easingMethod.push(tweenType);
                    }

                    prevPos = pos;
                    prevScale = scale;
                    prevRot = rot;
                    prevColor = color;
                    prevOpacity = opacity;
                }
                // 2.파싱된 값 검증 해서 실제 애니메이션되는건지 판단


                // --- 트랙 생성 및 추가 ---
                const pathString = getNodePath(rootNode, targetNode);
                //[Position Track]
                let posTrack = createPositionTrack(pathString,targetNode, posValues.keyTime, posValues.value, posValues.easingMethod);
                if(posTrack) clip.addTrack(posTrack);

                //[Scale Track]
                let scaleTrack = createScaleTrack(pathString,targetNode, scaleValues.keyTime, scaleValues.value, scaleValues.easingMethod);
                if(scaleTrack) clip.addTrack(scaleTrack);

                //[Rot Track]
                let rotTrack = createRotTrack(pathString,targetNode, rotValues.keyTime, rotValues.value, rotValues.easingMethod);
                if(rotTrack) clip.addTrack(rotTrack);

                //[Color Track]
                let colorTrack = createColorTrack(pathString, targetNode, colorValues.keyTime, colorValues.value, colorValues.easingMethod);
                if(colorTrack) clip.addTrack(colorTrack);

                let opacityTrack = createOpacityTrack(pathString, targetNode, opacityValues.keyTime, opacityValues.value, opacityValues.easingMethod);
                if(opacityTrack) clip.addTrack(opacityTrack);
            }
        
        }
        clip.duration = maxTime; // 전체 시간 설정

        // EditorExtends.serialize(clip);
        // Editor.Utils.serialize(clip);
        // cc.js.serialize(clip);    
        clipsData.push({
            name: clipName,
            content : cce.Utils.serialize(clip)
        });
    }

    return clipsData;
}

async function generateARAnimations(json: any, rootNode: Node,  boneNodesMap: Map<string, any>) {

    let mov_dataList = json[0]["mov_data"];
    if (!mov_dataList || mov_dataList.length === 0) return null;


    const baseFps = 60;
    const clipsData: any[] = [];
    for (const mov_data of mov_dataList) {
        const events:  AnimationClip.IEvent[] = [];
        const clipName = mov_data['name'];
        console.log(`[Importer] 애니메이션 변환: ${clipName}`);

        const timeScale = (mov_data['sc'] !== undefined) ? mov_data['sc'] : 1;
        const actualFps = baseFps * timeScale; // 60 * 0.333... = 20 //초당 20프레임
        const clip = new cc.AnimationClip();
        clip.name = clipName;
        clip.wrapMode = mov_data['lp'] ? cc.AnimationClip.WrapMode.Loop : cc.AnimationClip.WrapMode.Normal;
        let maxTime : number =  mov_data['dr'] / actualFps; // 클립의 전체 길이를 계산하기 위한 변수
        let unittime : number =  1/actualFps;  //한프레임당 시간

        let mov_bone_dataList = mov_data['mov_bone_data'];
        for(const mov_bone_data of mov_bone_dataList ){
            const boneName = mov_bone_data['name'];
            const boneNodeData = boneNodesMap.get(boneName);
            const targetBoneNode :Node = boneNodeData? boneNodeData.node : null;
            if (!targetBoneNode) continue;

            const targetBoneData = boneNodeData.parserdata;
            const targetArmatureBone : any = targetBoneNode.getComponent("ArmatureBone");
            let frame_DataList : any = Array.from(mov_bone_data['frame_data']);
            if (!frame_DataList || frame_DataList.length === 0) continue;
           
            // --- 프레임 순회하며 데이터 추출 ---
            let prevDisplayIndex : any = null; //targetBoneData.dI;
            let displayIndexs   : { keyTime: number[]; value: number[] } = {   //(!)디스플레이 인덱스 //RealTrack 로 처리해야할듯 
                keyTime : [],
                value   : []         
            }
 
            let prevPosValues : any = null;
            let posValues       : { keyTime: number[]; value: Vec3[], easingMethod : number[] } = { //cc.Vec3[] = [];          //필수
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }

            let prevZOrder : any = null; //targetBoneData.z;
            let zOrderValues    : { keyTime: number[]; value:number[]}= {//number[] = [];           //(!)Z-order
                keyTime      : [],
                value        : [],   
            }
            
            let prevScale : any = null;
            let scaleValues     : { keyTime: number[]; value: Vec3[], easingMethod : number[]} = { // cc.Vec3[] = [];          // {1,1}
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }

            //let rotValues       : number[] = [];         //0 ~ 360  // 0
            let prevSkew : any = null;
            let skewValuse      :{ keyTime: number[]; value: Vec2[], easingMethod : number[]} = {//cc.Vec2[] = [];          //(!)skew
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }

            let prevColor : any = null; //new cc.Color(255,255,255,255);
            let colorValues     :{ keyTime: number[]; value: cc.Color[], easingMethod : number[]} = {//cc.Color[] = [];         // {255,255,255}
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }
            let opacityValues   :{ keyTime: number[]; value: number[], easingMethod : number[]} = {//umber[] = [];           // 255
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }
            
            let prev_bd_src = -1; //GL_ONE
            let prev_bd_dst = -1; //GL_ONE_MINUS_SRC_ALPHA
            let blendFuncValues :{ keyTime: number[]; value: cc.Vec2[], easingMethod : number[]} = { // cc.Vec2[] =[];           //x : bd_src , y:bd_dst
                keyTime      : [],
                value        : [],   
                easingMethod : []
            }
            //프레임이벤트

            //let tweenTypeValues : number[] = [];            // 0

            if(frame_DataList[0]['fi'] !==0){
                let frameData = JSON.parse(JSON.stringify(frame_DataList[0]));
                frameData.fi = 0;
                frame_DataList.unshift(frameData);
            }

            for(let n = 0; n < frame_DataList.length; n++){
                const frame_data : any = frame_DataList[n];
                const time : number = frame_data['fi'] * unittime; // unittime 으로 시간 계산
                if (time > maxTime) maxTime = time;
                
                //keyTime.push(time);               
                // 0.tweenType (easingMethodValues) :
                const tweenFrame : boolean = (frame_data['tweenFrame'] !==undefined)? frame_data['tweenFrame'] : true; //true면 부드럽게, false면 순간이동처림
                //tweenFrames.push(tweenFrame);
                let tweenType = 0;
                if( tweenFrame ){
                    if (frame_data['twE'] !== undefined) tweenType = frame_data['twE'];
                }
                else {
                    tweenType = -1;
                }
                //easingMethodValues.push(tweenType);

                //첫프레임이면 무조건 추가하고 다음부터 prev데이타하고 비교해서 다르면 처리
                //1.displayIndexs (!)
                const displayIndex : number = (frame_data['dI'] !== undefined)? frame_data['dI'] : boneNodeData.dI;
                if(!displayIndex || displayIndex !== prevDisplayIndex){
            
                    displayIndexs.keyTime.push(time);
                    displayIndexs.value.push(displayIndex);
                }

                //2.Position
                let pos = new Vec3(0,0,0);
                if (frame_data['x'] !== undefined) pos.x = frame_data['x'];
                if (frame_data['y'] !== undefined) pos.y = frame_data['y'];
                pos.x = targetBoneData.x + pos.x;
                pos.y = targetBoneData.y + pos.y;
                if(!prevPosValues || Math.abs(prevPosValues.x - pos.x) > Number.EPSILON || Math.abs(prevPosValues.y - pos.y) > Number.EPSILON) {
                    posValues.keyTime.push(time);
                    posValues.value.push(pos);
                    posValues.easingMethod.push(tweenType);
                }

                //3.ZOrder (!)
                let zOrder = (frame_data['z'] !== undefined)? frame_data['z'] : 0;
                zOrder = zOrder + targetBoneData.z;
                if(!prevZOrder || prevZOrder !== zOrder){
                    zOrderValues.keyTime.push(time); 
                    zOrderValues.value.push(zOrder); 
                }

                //4.scale 
                let scale = new Vec3(1,1,1);
                if (frame_data['cX'] !== undefined) scale.x = frame_data['cX'];
                if (frame_data['cY'] !== undefined) scale.y = frame_data['cY'];
                scale.x = targetBoneData.cX * scale.x;
                scale.y = targetBoneData.cY * scale.y;
                if(!prevScale || Math.abs(prevScale.x - scale.x) > Number.EPSILON || Math.abs(prevScale.y - scale.y) > Number.EPSILON){
                    scaleValues.keyTime.push(time);
                    scaleValues.value.push(scale); 
                    scaleValues.easingMethod.push(tweenType);
                }

                //5. skew(Rot) 만약 skew.x === -skew.y 라면 회전으로 처리하면됨 아니라면.. 고민, 라디안값이기때문에 참고
                let skew = new Vec2(0,0); 
                if (frame_data['kX'] !== undefined) skew.x = frame_data['kX'];
                if (frame_data['kY'] !== undefined) skew.y = frame_data['kY'];
                skew.x = targetBoneData.kX + skew.x;
                skew.y = targetBoneData.kY + skew.y;
                if(!prevSkew || Math.abs(prevSkew.x - skew.x) > Number.EPSILON || Math.abs(prevSkew.y - skew.y) > Number.EPSILON){
                    skewValuse.keyTime.push(time);
                    skewValuse.value.push(skew);
                    skewValuse.easingMethod.push(tweenType);
                }

                // 6.color & opacity
                //prev가 없다면 칼라값 넣지 않는다.
                //isUseColorInfo 로 체크하는데 칼라값 필드가 있다 true가 되고 다음 프레임까지 진행
                //prev가 있다면 
                let color : any = null; //new cc.Color(255,255,255);
                let opacity = 255;
                if(displayIndex > -1 ){
                    if(frame_data['color']){
                        color = new cc.Color(255,255,255);
                        var colorData = frame_data['color'];
                        if (colorData['r'] !== undefined) color.r = colorData['r'];
                        if (colorData['g'] !== undefined) color.g = colorData['g'];
                        if (colorData['b'] !== undefined) color.b = colorData['b'];
                        if (colorData['a'] !== undefined){
                            color.a = colorData['a'];
                            opacity = color.a;
                        }
                        if(!prevColor || prevColor.r !== color.r || prevColor.g !== color.g || prevColor.b !== color.b ){
                            colorValues.keyTime.push(time);
                            colorValues.value.push(color);
                            colorValues.easingMethod.push(tweenType);
                        }
                        if(!prevColor || prevColor.a !== opacity){
                            opacityValues.keyTime.push(time);
                            opacityValues.value.push(opacity);
                            opacityValues.easingMethod.push(tweenType);
                        }
                    }
                    else {
                        if(prevDisplayIndex === displayIndex){
                            color = new cc.Color(255,255,255);
                            colorValues.keyTime.push(time);
                            colorValues.value.push(color);
                            colorValues.easingMethod.push(tweenType);
                            opacityValues.keyTime.push(time);
                            opacityValues.value.push(opacity);
                            opacityValues.easingMethod.push(tweenType);
                        }
                    }
                }
         
                // 7.블랜딩옵션
                let bd_src = 1; //GL_ONE
                let bd_dst = 771; //GL_ONE_MINUS_SRC_ALPHA
                if (frame_data['bd_src'] !== undefined) bd_src = frame_data['bd_src'];
                if (frame_data['bd_dst'] !== undefined) bd_dst = frame_data['bd_dst'];
                if(prev_bd_src !== bd_src || prev_bd_dst !== bd_dst){
    
                    blendFuncValues.keyTime.push(time);
                    blendFuncValues.value.push(new cc.Vec2( bd_src, bd_dst));
                    blendFuncValues.easingMethod.push(tweenType);
                    
                    if(targetArmatureBone && !targetArmatureBone.getBlendMat(bd_src, bd_dst)){
                        const bdMat = await getOrCreateBlendMaterial(bd_src,bd_dst);
                        if(bdMat){
                            targetArmatureBone.addBlendMat(bd_src, bd_dst,bdMat);
                        }
                    }
                }
                if( frame_data["evt"] !== undefined){
                    const evt : string = frame_data["evt"];
                    events.push({
                        frame : time,
                        func: 'onFrameEvent',
                        params: [evt]
                    })
                }

                prevPosValues = pos;
                prevZOrder = zOrder;
                prevScale = scale;
                prevSkew = pos;
                prevDisplayIndex = displayIndex;
                prev_bd_src = bd_src;
                prev_bd_dst = bd_dst;
                prevColor = color;
            }
            // 2.파싱된 값 검증 해서 실제 애니메이션되는건지 판단


            // 3.--- 트랙 생성 및 추가 ---
            // --- 트랙 생성 및 추가 ---
            const pathString = getNodePath(rootNode, targetBoneNode);

            // const displayNode = targetArmatureBone.display;
            // let displayPathString = null;
            // if(displayNode){
            //     displayPathString = getNodePath(rootNode, displayNode);
            // } 

            //[DisplayIndex Track]
            if(displayIndexs.keyTime.length > 0){
                let dITrack = createArmatureDisplayIndexTrack(pathString, targetBoneNode, displayIndexs.keyTime, displayIndexs.value);
                if(dITrack) clip.addTrack(dITrack);
            }
            
            //[Position Track]
            if(posValues.keyTime.length > 0){
                let posTrack = createPositionTrack(pathString,targetBoneNode, posValues.keyTime, posValues.value, posValues.easingMethod);
                if(posTrack) clip.addTrack(posTrack);
            }

            //[ZOrder Track]
            if(zOrderValues.keyTime.length > 0){
                let zOrderTrack = createArmatureZOrderTrack(pathString,targetBoneNode,  zOrderValues.keyTime, zOrderValues.value);
                if(zOrderTrack) clip.addTrack(zOrderTrack);
            }

            //[Scale Track]
            if(scaleValues.keyTime.length > 0){
                let scaleTrack = createScaleTrack(pathString,targetBoneNode, scaleValues.keyTime, scaleValues.value, scaleValues.easingMethod);
                if(scaleTrack) clip.addTrack(scaleTrack);
            }
        
            //[skew Track]
            if(skewValuse.keyTime.length > 0){
                let rotTrack = createArmatureSkewTrack(pathString, targetBoneNode, skewValuse.keyTime, skewValuse.value, skewValuse.easingMethod);
                if(rotTrack) clip.addTrack(rotTrack);
            }
        
            //[Color Track]
            if(colorValues.keyTime.length > 0){
                let colorTrack = createColorTrack(pathString,targetBoneNode, colorValues.keyTime, colorValues.value, colorValues.easingMethod);
                if(colorTrack) clip.addTrack(colorTrack);
            }
        
            //[opacity Track] //Display쪽으로 직접..
            if(opacityValues.keyTime.length > 0){
                let opacityTrack = createOpacityTrack(pathString, targetBoneNode, opacityValues.keyTime, opacityValues.value, opacityValues.easingMethod);
                if(opacityTrack) clip.addTrack(opacityTrack);
            }

            //[blendFuncValues Track]
            if(blendFuncValues.keyTime.length > 0){
                let blendingTrack = createArmatureBlendingTrack(pathString, targetBoneNode, blendFuncValues.keyTime, blendFuncValues.value);
                if(blendingTrack) clip.addTrack(blendingTrack);
            }

        }
        clip.duration = maxTime; // 전체 시간 설정
    
        if(events.length > 0)
            clip.events = events;
        // EditorExtends.serialize(clip);
        // Editor.Utils.serialize(clip);
        // cc.js.serialize(clip);    
        clipsData.push({
            name: clipName,
            content : cce.Utils.serialize(clip)
        });
    }
    return clipsData;
}

async function parseARBoneNode(arJsonData : any,  topParent: Node, atlasArray: any, boneNodesMap: Map<string, any>) {
    
    //texture_data
    const texture_data = arJsonData['texture_data'];
    let textureData : Map<string, any> = new Map();
    for(let n = 0; n < texture_data.length; n++){
        const data =texture_data[n];
        textureData.set(data.name, data);
    }

    const armature : any = topParent.getComponent("Armature") || topParent.addComponent("Armature");

    const bone_data = arJsonData['armature_data'][0]['bone_data'];
    for(var n = 0; n < bone_data.length; n++){
        const data = bone_data[n];
        const nodeName = data["name"];
        const newNode = new Node(nodeName);
        newNode.layer = topParent.layer; // 부모와 같은 레이어 사용

        // 2. 크기 및 앵커 포인트 설정 (UITransform)
        const trans = newNode.addComponent(UITransform);
        const armatureBone : any = newNode.addComponent("ArmatureBone");
        armatureBone.setArmature(armature);
        trans.contentSize = cc.Size.ZERO;
        trans.anchorPoint = cc.Vec2.ZERO;

        // 3. 좌표 설정 (x, y)
        const dI = data['dI'] || 0;
        const x = data['x'] || 0;
        const y = data['y'] || 0;
        const z = data['z'] || 0;
        const sx = data['cX'] ?? 1;
        const sy = data['cY'] ?? 1;
        newNode.setPosition(new Vec3(x, y, 0));
        newNode.setScale(new Vec3(sx, sy, 1));
        
        const kX = data['kX'] || 0;
        const kY = data['kY'] || 0;
        armatureBone.updateSkew(new cc.Vec2(kX, kY));

        // trans.priority = z;
        // if(z > 0){
        //    let sortComp = newNode.addComponent(cc.Sorting2D);
        //    sortComp.sortingOrder = z;
        // }
        armatureBone.zOrder = z;

        boneNodesMap.set(nodeName, {node: newNode, parserdata : data});
        if(data['display_data']){
            let display_data = JSON.parse(JSON.stringify(data['display_data']));
            // const spriteNode = new Node(nodeName);
            // newNode.addChild(spriteNode);
            // spriteNode.layer = newNode.layer; 
            // const spriteTrans = spriteNode.addComponent(UITransform);
            // const sprite = spriteNode.addComponent(Sprite);
            // armatureBone.sprite = sprite;
            // --- 이미지 로드 로직 ---
            // if( dI > -1 && display_data.length > dI){
            //     let fileName = display_data[dI]['name'];
            //     if (fileName) {
            //         fileName = fileName.replace('.png', '');
            //         let frame = null;
            //         for(let n2 = 0 ; n2 < atlasArray.length; n2++){
            //             frame = atlasArray[n2].getSpriteFrame(fileName);
            //             if(frame){
            //                 sprite.spriteFrame = frame;
            //                 const texData = textureData.get(fileName);
            //                 spriteTrans.contentSize = new cc.Size(texData.width, texData.height);
            //                 spriteTrans.anchorPoint = new cc.Vec2(texData.pX, texData.pY);
            //                 break;
            //             }
            //         }
            //     }
            // }
            for(let n3 = 0; n3 < display_data.length; n3++){
                let displayData : any = {}
                let fileName = display_data[n3].name;
                displayData.name = fileName;
                displayData.displayType = display_data[n3].displayType;
                displayData.x = display_data[n3].skin_data[0].x;
                displayData.y = display_data[n3].skin_data[0].y;
                displayData.cX = display_data[n3].skin_data[0].cX;
                displayData.cY = display_data[n3].skin_data[0].cY;
                displayData.kX = display_data[n3].skin_data[0].kX;
                displayData.kY = display_data[n3].skin_data[0].kY;
                if (fileName) {
                    fileName = fileName.replace('.png', '');
                    const textData = textureData.get(fileName);
                    if(textData){
                        displayData.width = textData.width;
                        displayData.height = textData.height;
                        displayData.pX = textData.pX;
                        displayData.pY = textData.pY;
                        for(let n2 = 0 ; n2 < atlasArray.length; n2++){
                            let frame = atlasArray[n2].getSpriteFrame(fileName);
                            if(frame){
                                displayData.spriteFrame = frame;
                                break;
                            }
                        }
                    }
                }
                armatureBone.pushDisplayData(displayData);
            }

            if( dI > -1 && display_data.length > dI){
                armatureBone.displayIndex = dI;
            }
        }
    }

    // for (const [key, value] of boneNodesMap) {
    //     //console.log(`Key: ${key}, Value: ${value}`);
    // }
    //본구성
    for (const value of boneNodesMap.values()){
        const childNode = value.node;
        const childData = value.parserdata;
        let parentName = childData['parent'];
        const parentData = boneNodesMap.get(parentName);
        const parentNode = parentData? parentData.node : topParent;
        parentNode.addChild(childNode);
    }
    armature.updateDisplayZOrder();
    const totalSize = calculateArmatureTotalSize(topParent);
    const rootUI = topParent.getComponent(UITransform) || topParent.addComponent(UITransform);
    rootUI.setContentSize(totalSize);

    //애니메이션 정보 
    //dr : 총 프레임수 ex) 0 ~ 10프레임 
    //lp : 반복여부 loop ex) 
    //to : (tween to - 전환 프레임) 사용안함(X)
    //drTW : 키프레임과 키프레임 사이를 보간 할때 기준을 삼은 기본 트윈 프레임수??
    //     0이면 각 본(Bone)의 키프레임 간격(fi)에 맞춰서 자연스럽게 보간
}

function calculateArmatureTotalSize(rootNode: Node): cc.math.Size {
    rootNode.updateWorldTransform();

    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = -Number.MAX_VALUE;
    let maxY = -Number.MAX_VALUE;

    const sprites = rootNode.getComponentsInChildren(Sprite);

    if (sprites.length === 0) return new cc.math.Size(0, 0);
    sprites.forEach(sprite => {
        const uiTrans = sprite.getComponent(UITransform);
        if (!uiTrans) return;

        const worldBox = uiTrans.getBoundingBoxToWorld();
        if (worldBox.xMin < minX) minX = worldBox.xMin;
        if (worldBox.yMin < minY) minY = worldBox.yMin;
        if (worldBox.xMax > maxX) maxX = worldBox.xMax;
        if (worldBox.yMax > maxY) maxY = worldBox.yMax;
    });

    const totalWidth = maxX - minX;
    const totalHeight = maxY - minY;

    console.log(`뼈대 전체 크기 Width: ${totalWidth}, Height: ${totalHeight}`);

    return new cc.math.Size(totalWidth, totalHeight);
}

function mapGLBlendToGfx(glEnum: number): cc.gfx.BlendFactor {
/*
cc.ZERO	                0x0000	0	ZERO
cc.ONE	                0x0001	1	ONE
cc.SRC_COLOR	        0x0300	768	SRC_COLOR
cc.ONE_MINUS_SRC_COLOR	0x0301	769	ONE_MINUS_SRC_COLOR
cc.SRC_ALPHA	        0x0302	770	SRC_ALPHA
cc.ONE_MINUS_SRC_ALPHA	0x0303	771	ONE_MINUS_SRC_ALPHA
cc.DST_ALPHA	        0x0304	772	DST_ALPHA
cc.ONE_MINUS_DST_ALPHA	0x0305	773	ONE_MINUS_DST_ALPHA
cc.DST_COLOR        	0x0306	774	DST_COLOR
cc.ONE_MINUS_DST_COLOR	0x0307	775	ONE_MINUS_DST_COLOR
cc.SRC_ALPHA_SATURATE	0x0308	776	SRC_ALPHA_SATURATE
*/
    switch (glEnum) {
        case 0:   // 0x0000 (cc.ZERO)
            return cc.gfx.BlendFactor.ZERO;
        case 1:   // 0x0001 (cc.ONE)
            return cc.gfx.BlendFactor.ONE;
        case 768: // 0x0300 (cc.SRC_COLOR)
            return cc.gfx.BlendFactor.SRC_COLOR;
        case 769: // 0x0301 (cc.ONE_MINUS_SRC_COLOR)
            return cc.gfx.BlendFactor.ONE_MINUS_SRC_COLOR;
        case 770: // 0x0302 (cc.SRC_ALPHA)
            return cc.gfx.BlendFactor.SRC_ALPHA;
        case 771: // 0x0303 (cc.ONE_MINUS_SRC_ALPHA)
            return cc.gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
        case 772: // 0x0304 (cc.DST_ALPHA)
            return cc.gfx.BlendFactor.DST_ALPHA;
        case 773: // 0x0305 (cc.ONE_MINUS_DST_ALPHA)
            return cc.gfx.BlendFactor.ONE_MINUS_DST_ALPHA;
        case 774: // 0x0306 (cc.DST_COLOR)
            return cc.gfx.BlendFactor.DST_COLOR;
        case 775: // 0x0307 (cc.ONE_MINUS_DST_COLOR)
            return cc.gfx.BlendFactor.ONE_MINUS_DST_COLOR;
        case 776: // 0x0308 (cc.SRC_ALPHA_SATURATE)
            return cc.gfx.BlendFactor.SRC_ALPHA_SATURATE;
        default:
            // 알 수 없는 값이 들어오면 가장 기본적이고 안전한 일반 알파 블렌딩으로 처리
            console.warn(`[Blend] 알 수 없는 블렌드 값 ${glEnum} 발견. 기본값으로 덮어씁니다.`);
            return cc.gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
    }
}

async function getOrCreateBlendMaterial(srcGL: number, dstGL: number): Promise<cc.Material | null> {
    
    const matName = `BlendMat_${srcGL}_${dstGL}.mtl`;
    const dbUrl = `db://assets/resources/blendMode/${matName}`;

    // 1. 매트리얼 있는지 파악
    let uuid  = await Editor.Message.request('asset-db', 'query-uuid', dbUrl);

    // 2. 만약 에셋이 없다면? -> 새롭게 생성!
    if (!uuid) {
        console.log(`[Material 생성] ${matName} 이 없어서 새로 만듭니다.`);
        
        let rgbSrc, rgbDst, alphaSrc, alphaDst;
        // 케이스 1: 일반 블렌딩 (Normal) - 과거의 1/771 또는 770/771
        if ((srcGL === 1 || srcGL === 770) && dstGL === 771) {
            rgbSrc = cc.gfx.BlendFactor.SRC_ALPHA;           // 1(ONE)이 들어왔어도 강제로 SRC_ALPHA로 처리
            rgbDst = cc.gfx.BlendFactor.ONE_MINUS_SRC_ALPHA; 
            alphaSrc = cc.gfx.BlendFactor.ONE;               // 알파는 스크린샷의 기본값으로 고정
            alphaDst = cc.gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
        }
        // 케이스 2: 발광/더하기 (Additive) - 과거의 770/1 또는 1/1
        else if ((srcGL === 770 || srcGL === 1) && dstGL === 1) {
            rgbSrc = cc.gfx.BlendFactor.SRC_ALPHA;           // 여기도 SRC_ALPHA로 보정
            rgbDst = cc.gfx.BlendFactor.ONE;
            alphaSrc = cc.gfx.BlendFactor.ONE;               // 발광할 때는 알파가 더해져도 뚫리지 않게 1/1 세팅
            alphaDst = cc.gfx.BlendFactor.ONE;
        }
        // 케이스 3: 그 외의 특이한 블렌딩 (Multiply 등)
        else {
            rgbSrc = mapGLBlendToGfx(srcGL);
            rgbDst = mapGLBlendToGfx(dstGL);
            alphaSrc = cc.gfx.BlendFactor.ONE;               // 특이한 블렌딩도 색상만 섞고, 알파는 안전하게 고정!
            alphaDst = cc.gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
        }
        
        // Creator 3.x의 builtin-2d-sprite 기반 머티리얼 JSON 구조
        // (uuid "60f7195c..." 는 엔진 내장 2d-sprite effect의 고정값)
        const mtlJson = `{
          "__type__": "cc.Material",
          "_name": "",
          "_objFlags": 0,
          "__editorExtras__": {},
          "_native": "",
          "_effectAsset": {
            "__uuid__": "60f7195c-ec2a-45eb-ba94-8955f60e81d0",
            "__expectedType__": "cc.EffectAsset"
          },
          "_techIdx": 0,
          "_defines": [
            { "USE_TEXTURE": true }
          ],
          "_states": [
            {
              "rasterizerState": {},
              "depthStencilState": {},
              "blendState": {
                "targets": [
                  {
                    "blend": true,
                    "blendSrc": ${rgbSrc},
                    "blendDst": ${rgbDst},
                    "blendSrcAlpha": ${alphaSrc},
                    "blendDstAlpha": ${alphaDst}
                  }
                ]
              }
            }
          ],
          "_props": [ {} ]
        }`;

        // 3. 매트리얼 저장
        await Editor.Message.request('asset-db', 'create-asset', dbUrl, mtlJson);
        
        // 4. 생성후 UUID를 파악
        uuid = await Editor.Message.request('asset-db', 'query-uuid', dbUrl);
    }

    // 5. 구해낸 UUID를 통해 cc.Material 객체로 로드
    
    try{
        const bdMat : cc.Material | null = 
            await new Promise((resolve, reject) => {
                if (!uuid) {
                    reject(null); 
                    return;
                }
                assetManager.loadAny(uuid, (err : any, mat: cc.Material) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(mat);
                    }
                });
            });
        return bdMat;
    }catch(error){
        console.error("로딩 실패:", error);
    }

    return null;
}

//SINE_EASEIN는 역추적으로 엔진에서 쓰는 값 구했음 나머지는 웹에서 평균으로 쓰는 값임
function getBezierValue(easeType: number) {
      let bezierValue: any = null; 
      switch (easeType) {
        // 0: 선형 (등속도)
        case 0:
            bezierValue = [0.3, 0.3, 0.7, 0.7];
            break;
        // 1~3: Sine (아주 부드럽고 완만한 가감속)
        case 1:
            bezierValue = [0.48, 0, 0.73, 0.71];     // SINE_EASEIN (cocosCreator)
            break;
            
        case 2:
            bezierValue = [0.39, 0.59, 0.56, 1];      // SINE_EASEOUT
            break;
        case 3:
            bezierValue = [0.46, 0.05, 0.54, 0.95];   // SINE_EASEINOUT
            break;
        // 4~6: Quad (가벼운 가감속)
        case 4:
            bezierValue = [0.55, 0.08, 0.68, 0.53];   // QUAD_EASEIN
            break;
        case 5:
            bezierValue = [0.25, 0.46, 0.45, 0.95];    // QUAD_EASEOUT
            break;
        case 6:
            bezierValue = [0.48, 0.04, 0.52, 0.96]; // QUAD_EASEINOUT
            break;

        // 7~9: Cubic (표준적인 가감속)
        case 7:
            bezierValue = [0.4, 0, 0.5, 0.5];  // CUBIC_EASEIN
            break;
        case 8:
            bezierValue = [0.06, 0.12, 0.58, 1];    // CUBIC_EASEOUT
            break;
        case 9:
            bezierValue = [0.42, 0, 0.58, 1];    // CUBIC_EASEINOUT
            break;

        // 10~12: Quart (조금 강한 가감속)
        case 10:
            bezierValue = [0.89, 0.03, 0.68, 0.21];  // QUART_EASEIN
            break;
        case 11:
            bezierValue = [0.16, 0.84, 0.43, 1];      // QUART_EASEOUT
            break;
        case 12:
            bezierValue = [0.83, 0, 0.17, 1];         // QUART_EASEINOUT
            break;

        // 13~15: Quint (아주 강한 가감속)
        case 13:
            bezierValue = [0.75, 0.05, 0.85, 0.06];  // QUINT_EASEIN
            break;
        case 14: 
            bezierValue = [0.22, 1, 0.31, 1];          // QUINT_EASEOUT
            break;
        case 15: 
            bezierValue = [0.94, 0, 0.06, 1];          // QUINT_EASEINOUT
            break;

        // 16~18: Expo (극단적인 가감속, 처음엔 아주 느리다가 팍! 튀어나감)
        case 16: 
            bezierValue = [0.95, 0.04, 0.79, 0.03];  // EXPO_EASEIN
            break;
        case 17: 
            bezierValue = [0.18, 1, 0.22, 1];        // EXPO_EASEOUT
            break;
        case 18:// EXPO_EASEINOUT
            bezierValue =  [1 , 0, 0, 1]; //[0.84, 0, 0.16, 1];    
            break;

        // 19~21: Circ (원을 그리는 듯한 묵직한 가감속)
        case 19: 
            bezierValue = [0.6, 0.04, 0.98, 0.33];    // CIRC_EASEIN
            break;
        case 20: 
            bezierValue = [0.08, 0.82, 0.01, 1];     // CIRC_EASEOUT
            break;
        case 21: 
            bezierValue = [0.86, 0.14, 0.14, 0.86];  // CIRC_EASEINOUT
            break;

        // 25~27: Back (목표점을 살짝 지나쳤다가 돌아옴, 고무줄 느낌)
        case 25: 
            bezierValue = [0.6, -0.28, 0.735, 0.045];  // BACK_EASEIN
            break;
        case 26: 
            bezierValue = [0.175, 0.885, 0.32, 1.275]; // BACK_EASEOUT
            break;
        case 27: 
            bezierValue = [0.68, -0.55, 0.265, 1.55];  // BACK_EASEINOUT
            break;
   
        // ------------------------------------------------------------
        // 🚨 주의 요망: Elastic과 Bounce는 수학적으로 완벽한 Bezier 표현이 불가능
        // ------------------------------------------------------------
        
        // 22~24: Elastic (스프링처럼 여러 번 튕김) -> 강한 Back 느낌으로 근사치 폴백
        case 22: 
            bezierValue = [0.6, -0.28, 0.735, 0.045];  // ELASTIC_EASEIN (Fallback: BACK_IN)
            break;
        case 23: 
            bezierValue = [0.175, 0.885, 0.32, 1.275]; // ELASTIC_EASEOUT (Fallback: BACK_OUT)
            break;
        case 24: 
            bezierValue = [0.68, -0.55, 0.265, 1.55];  // ELASTIC_EASEINOUT (Fallback: BACK_IN_OUT)
            break;

        // 28~30: Bounce (공이 통통 튀김) -> 강한 Expo/Quint 느낌으로 근사치 폴백
        case 28: 
            bezierValue = [0.755, 0.05, 0.855, 0.06];  // BOUNCE_EASEIN (Fallback: QUINT_IN)
            break;
        case 29: 
            bezierValue = [0.23, 1, 0.32, 1];          // BOUNCE_EASEOUT (Fallback: QUINT_OUT)
            break;
        case 30: 
            bezierValue = [0.86, 0, 0.07, 1];          // BOUNCE_EASEINOUT (Fallback: QUINT_IN_OUT)
            break;
    }  
    return bezierValue;
}

function getHermiteTangetByEasingType(easeType : number, time : number , nextTime : number,  curData : number, nextData : number){

    let tangetValue = {
            interpolationMode: cc.RealInterpolationMode.LINEAR, //asingMethod;
            tangentWeightMode: cc.TangentWeightMode.NONE, ///베지어 곡선의 핸들 길이를 조절할 것인가?
            rightTangent: 0, //나가는(오른쪽) 방향의 기울기
            rightTangentWeight: 0,  //오른쪽 가중치
            leftTangent: 0, //들어오는쪽(왼쪽) 기울기 (0이면 기울기 없음)
            leftTangentWeight: 0  //왼쪽 기울기의 가중치 (값이 크면 기울기 값 더 크게 영향 받음)
       };

    const bezierValue = getBezierValue(easeType);
    if (!bezierValue) {
        return tangetValue;
    }

    tangetValue.interpolationMode = cc.RealInterpolationMode.CUBIC;
    tangetValue.tangentWeightMode = cc.TangentWeightMode.BOTH;

    // 🌟 분모가 0이 되어 Infinity가 뜨는 것을 방지하기 위한 안전장치
    const cx1 = bezierValue[0];
    const cy1 = bezierValue[1];
    const cx2 = bezierValue[2];
    const cy2 = bezierValue[3];
    
    if (nextData) {
        const dt = (nextTime - time);
        const dv = (nextData - curData); // (예시: X 좌표 트랙)
        const fx = 3 * dt;
        const fy = 3 * dv;
        const t1x = cx1 * fx;
        const t1y = cy1 * fy;
        const t2x = (1.0 - cx2) * fx;
        const t2y = (1.0 - cy2) * fy;
        const ONE_THIRD = 1.0 / 3.0;

        let previousTangent = 0;
        let previousTangentWeight = Number.EPSILON; 
        let nextTangent = 0;
        let nextTangentWeight = Number.EPSILON;
        if(t1y!== 0 && t1x !== 0){
            previousTangent = t1y / t1x;
            previousTangentWeight = Math.sqrt(t1x * t1x + t1y * t1y) * ONE_THIRD;
        }
         if(t2y !== 0 && t2x !== 0){      
            nextTangent = t2y / t2x;
            nextTangentWeight = Math.sqrt(t2x * t2x + t2y * t2y) * ONE_THIRD;
        }

        tangetValue.rightTangent = previousTangent;         //0
        tangetValue.rightTangentWeight = previousTangentWeight;    //0.48
        tangetValue.leftTangent = nextTangent;              //1.074
        tangetValue.leftTangentWeight = nextTangentWeight;         //0.396
    }
    return tangetValue;
}

/*
ccs.FrameEaseType = {
    CUSTOM : -1,
                           //enum _cocos_core_curves_easing_method__EasingMethod
    LINEAR : 0,            //LINEAR = 0

    SINE_EASEIN : 1,       //SINE_IN = 18
    SINE_EASEOUT : 2,      //SINE_OUT = 19
    SINE_EASEINOUT : 3,    //SINE_IN_OUT = 20

    QUAD_EASEIN : 4,       //QUAD_IN = 2
    QUAD_EASEOUT : 5,      //QUAD_OUT = 3
    QUAD_EASEINOUT : 6,    //QUAD_IN_OUT = 4

    CUBIC_EASEIN : 7,      //CUBIC_IN = 6   
    CUBIC_EASEOUT : 8,     //CUBIC_OUT = 7
    CUBIC_EASEINOUT : 9,   //CUBIC_IN_OUT = 8

    QUART_EASEIN : 10,     //QUART_IN = 10
    QUART_EASEOUT : 11,    //QUART_OUT = 11
    QUART_EASEINOUT : 12,  //QUART_IN_OUT = 12

    QUINT_EASEIN : 13,     //QUINT_IN = 14
    QUINT_EASEOUT : 14,    //QUINT_OUT = 15
    QUINT_EASEINOUT : 15,  //QUINT_IN_OUT =16

    EXPO_EASEIN : 16,       //EXPO_IN = 22
    EXPO_EASEOUT : 17,      //EXPO_OUT = 23
    EXPO_EASEINOUT : 18,    //EXPO_IN_OUT =24,

    CIRC_EASEIN : 19,       //CIRC_IN = 26
    CIRC_EASEOUT : 20,      //CIRC_OUT = 27
    CIRC_EASEINOUT : 21,    //CIRC_IN_OUT = 28

    ELASTIC_EASEIN : 22,    //ELASTIC_IN =30
    ELASTIC_EASEOUT : 23,   //ELASTIC_OUT =31 
    ELASTIC_EASEINOUT : 24, //ELASTIC_IN_OUT = 32

    BACK_EASEIN : 25,       //BACK_IN = 34
    BACK_EASEOUT : 26,      //BACK_OUT = 35 
    BACK_EASEINOUT : 27,    //BACK_IN_OUT = 36,

    BOUNCE_EASEIN : 28,     //BOUNCE_IN = 38,
    BOUNCE_EASEOUT : 29,    //BOUNCE_OUT = 39,
    BOUNCE_EASEINOUT : 30,  //BOUNCE_IN_OUT = 40

    TWEEN_EASING_MAX: 1000
};
*/        
