/**
 * Created by flysherdev11 on 2017. 6. 20..
 * Modified by OBG on 2017.11.19
 */

var Loader = Loader || {};

Loader.loadedFileNames = [];
Loader.armatureIDs = {};
Loader.armatureFrames = {};
Loader.uiURL = {};
Loader.uiTextures = {};
Loader.armatureList = [];
Loader.spineList = [];
Loader.plistList = [];
Loader.atlasList = [];
Loader.textureList = [];

Loader.armatureData = {};
Loader.spineData = {};
Loader.textures = {};
Loader.plistFiles = {};
Loader.atlasFiles = {};

Loader.cocosStudioURL = {};

var ResourceMapData = {};

Loader.init = function() {
    var canvas = cc._canvas;

    function traverseFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            item.file(function( file ) {
                // 폴더 내 파일은 Asset 패널에 추가하지 않음 (addToAssetPanel 기본값 false 사용)
                Loader.readFile( file );
            });
        }
        else if (item.isDirectory) {
            var dirReader = item.createReader();
            var read = dirReader.readEntries.bind( dirReader, function( entries ) {
                if( entries.length === 0 ) {
                    return;
                }
                for (var i=0; i<entries.length; i++) {
                    ResourceMapData[entries[i].name] = entries[i];
                }
                read();
            } );
            read();
        }
    }

    canvas.addEventListener(
        'dragover',
        function handleDragOver( evt ) {
            evt.stopPropagation();
            evt.preventDefault();
        }, false );

    this.onDropHandler = function( evt ){
        evt.stopPropagation();
        evt.preventDefault();

        const droppedFiles = []; // 드롭된 파일들을 임시로 저장할 리스트
        const items = evt.dataTransfer.items;
        let pendingFileReads = 0; // 비동기 파일 읽기 작업 수 추적 (웹킷 파일 시스템 엔트리용)

        // Webkit-specific DataTransferItem.webkitGetAsEntry() for folder drag
        if (items && items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i].webkitGetAsEntry();
                if (item) {
                    if (item.isFile) {
                        pendingFileReads++; // 파일 읽기 시작 카운트
                        item.file(function(file) {
                            droppedFiles.push(file);
                            pendingFileReads--; // 파일 읽기 완료 카운트
                            if (pendingFileReads === 0) {
                                processDroppedFiles(droppedFiles); // 모든 파일 읽기가 완료되면 처리 시작
                            }
                        });
                    } else if (item.isDirectory) {
                        // 폴더는 기존 로직대로 즉시 처리 (여기서 파일 순서 제어는 어렵고 복잡합니다)
                        traverseFileTree(item);
                    }
                }
            }
        }
            // Fallback for non-webkit browsers or when items are not handled
        // This path directly gets File objects, no need for pendingFileReads
        else if (evt.dataTransfer.files && evt.dataTransfer.files.length > 0) {
            const files = evt.dataTransfer.files;
            for (let i = 0; i < files.length; i++) {
                droppedFiles.push(files[i]);
            }
            // File 객체는 즉시 사용 가능하므로, 바로 처리 함수 호출
            processDroppedFiles(droppedFiles);
        }
    };
    canvas.addEventListener("drop",this.onDropHandler, false);
};

// 드롭된 파일들을 우선순위에 따라 처리하는 새 함수 (주요 수정)
function processDroppedFiles(files) {
    // 1. 파일들을 우선순위에 따라 정렬합니다.
    const sortedFiles = files.sort((a, b) => {
        const extA = cc.path.extname(a.name).toLowerCase();
        const extB = cc.path.extname(b.name).toLowerCase();

        // **수정된 우선순위 정의 (숫자가 낮을수록 우선순위 높음)**
        // 이미지/아틀라스 파일이 먼저 로드되고, 그 다음 정의 파일이 로드됩니다.
        const getPriority = (ext) => {
            if (ext === ".png") return 1; // 이미지 파일 최우선
            if (ext === ".atlas" || ext === ".plist" || ext === ".fnt") return 2; // 데이터/맵 파일 다음
            if (ext === ".json" || ext === ".exportjson") return 3; // 정의 파일 마지막
            return 99; // 기타 파일
        };

        return getPriority(extA) - getPriority(extB);
    });

    // 2. 정렬된 파일을 순차적으로 로드합니다.
    // 각 파일 로딩이 완료된 후 다음 파일을 로드하도록 Promise를 사용하면 안정적입니다.
    let promiseChain = Promise.resolve();
    sortedFiles.forEach(file => {
        promiseChain = promiseChain.then(() => {
            return new Promise(resolve => {
                const fileNameExt = file.name.toLowerCase();

                // PNG 파일인 경우에만 Assets 패널에 추가할지 여부를 결정합니다.
                // Spine의 PNG (예: xxx.atlas.png)는 일반적으로 Assets 패널에 직접 추가하지 않습니다.
                const shouldAddToAssetPanel = fileNameExt.endsWith('.png') && !fileNameExt.includes('.atlas.png') && !fileNameExt.includes('.plist.png'); // 예를 들어, spine.atlas.png, ui.plist.png 같은 이름은 제외

                Loader.readFile(file, () => {
                    resolve(); // readFile 내부의 cb가 호출되면 Promise를 resolve
                }, shouldAddToAssetPanel);
            });
        });
    });

    promiseChain.then(() => {
        console.log("[DEBUG - Loader] 모든 드롭된 파일 로딩 및 처리 완료.");
        // 모든 파일이 로드된 후 필요한 추가 작업 (예: 씬 새로고침 등)은 이곳에서 호출할 수 있습니다.
        // 현재 MainLayer 인스턴스는 외부에서 접근 가능하다고 가정합니다.
        // if (window.MainLayerInstance) {
        //     window.MainLayerInstance.refreshAssetsPanel(); // 모든 파일 로드 후 Assets 패널 전체 새로고침 (필요 시)
        // }
    }).catch(error => {
        console.error("[DEBUG - Loader] 파일 로딩 중 오류 발생:", error);
    });
}


Loader.reset = function() {
    this.armatureIDs = {};
    this.fileData = {
        frameConfig : null,
        texture     : null,
        armatureData: null
    };
};

Loader.readFile = function( file , cb, addToAssetPanel = false) { // addToAssetPanel 기본값 유지
    var self = this;
    var i, reader, ext;

    if( !file ) {
        cb && cb();
        return;
    }

    reader = new FileReader();
    ext = cc.path.extname(file.name).toLowerCase();
    if (ext === ".json" || ext === ".exportjson") {
        reader.readAsText(file);
    } else if (ext === ".plist" || ext === ".atlas") {
        reader.readAsText(file);
    } else if (ext === ".png") {
        reader.readAsDataURL(file);
    } else if (ext === ".fnt") {
        reader.readAsText(file);
    } else {
        cc.log("지원하지 않는 포멧: " + file.name );
        cb && cb();
        return;
    }

    reader.onload = ( function( f ) {
        return function( e ) {
            var url = f.name;
            var fileContents = e.target.result;
            var ext = cc.path.extname(f.name).toLowerCase();

            // _processFileData 호출 시 addToAssetPanel 인자를 명시적으로 전달
            // 이를 통해 _processFileData 내부에서 PNG가 Assets 패널에 추가될지 여부를 정확히 제어할 수 있습니다.
            self._processFileData(url, fileContents, ext, cb, addToAssetPanel);

            if ( ext === ".json" ){
                // g_fileName과 g_fileContext는 DownloadCurrent.js에서 사용될 수 있습니다.
                // toggleJSONUI는 DownloadCurrent.js에 정의되어 있으므로 그대로 둡니다.
                toggleJSONUI( true );
            } else if ( ext === ".exportjson" ){
                toggleJSONUI( false );
            }

            if (ext === ".json" || ext === ".exportjson") {
                g_fileName = f.name;
                g_fileContext = e.target.result;
            }
        };
    } )( file );
};

Loader._processFileData = function( url, fileContents, ext, cb, addToAssetPanel) { // addToAssetPanel 인자 추가
    var self = this,
        armatureDataArr, i,dic;

    var fileName = cc.path.mainFileName( url );

    switch (ext) {
        case ".fnt":
            cc.loader.cache[ "image/" + url ] = _fntLoader.parseFnt( fileContents, "image/" + url );
            break;
        case ".plist":
            var plistData = cc.plistParser.parse(fileContents);
            this.plistFiles[ fileName ] = cc.spriteFrameCache._parseFrameConfig( plistData );
            this.plistList.push( fileName );

            this.checkFiles( fileName, 'plist' );
            break;
        case ".atlas":
            cc.loader.cache[ url ] = fileContents; // .atlas 파일 내용 캐시
            this.atlasFiles[ fileName ] = fileContents;
            this.atlasList.push( fileName );
            console.log(`[Loader] Cached .atlas: ${url}`); // 디버그 로그 추가
            break;
        case ".png":
            cc.loader.loadImg(
                fileContents,
                {isCrossOrigin: false},
                function (err, img) {
                    var tex2d = new cc.Texture2D(); // cc.Texture2d -> cc.Texture2D 오타 수정
                    tex2d.initWithElement(img);
                    tex2d.handleLoadedTexture();
                    self.textures[ fileName ] = tex2d;
                    if( self.textureList.indexOf( fileName ) < 0 )
                        self.textureList.push( fileName );

                    // PNG 캐싱 방식. 두 가지 키로 캐시 유지.
                    // Spine 런타임이 어떤 키를 사용할지 모르므로, 둘 다 제공하여 호환성 최대화.
                    cc.loader.cache[url] = tex2d; // filename.png 형태로 캐시
                    if (!cc.loader.cache['image/' + url]) { // image/filename.png 형태로도 캐시 (fnt/UI 호환성)
                        cc.loader.cache['image/' + url] = tex2d;
                    }

                    self.checkFiles( fileName, 'png' );
                    // addToAssetPanel이 true일 때만 'loadImage' 이벤트를 디스패치합니다.
                    if (addToAssetPanel) {
                        console.log(`[Loader] Dispatched 'loadImage' for: ${fileName}`);
                        cc.eventManager.dispatchCustomEvent('loadImage', fileName);
                    } else {
                        // Spine/UI/Armature의 연관 PNG는 이 경로를 타서 Assets에 추가되지 않아야 합니다.
                        console.log(`[Loader] Not adding ${fileName}.png to Assets (addToAssetPanel is false).`);
                    }
                    cb && cb(); // 콜백 호출
                }
            );
            return; // PNG는 비동기 로딩이므로 여기서 함수 종료를 위해 return
        case ".json":
            dic = JSON.parse(fileContents);

            if(dic["skeleton"] && dic["skeleton"]["spine"]) {
                // Spine JSON
                cc.loader.cache[ url ] = fileContents; // JSON 내용 캐시
                this.spineData[ fileName ] = fileContents;
                this.spineList.push( fileName );
                this.readSpineResoueces( fileName ); // Spine 관련 리소스 읽기
                // this.uiTextures[ fileName ] = fileName + ".atlas"; // uiTextures는 Spine에서 사용되지 않으므로 삭제 또는 주석 처리
                this.checkFiles( fileName, 'spine' );
                console.log(`[Loader] Cached .json (Spine): ${url}`); // 디버그 로그 추가
            }
            else {
                // CocosStudio JSON (프로젝트 파일)
                this.cocosStudioURL [ fileName ] = url;
                cc.loader.cache[url] = dic;
                if(dic["Content"] && dic["Content"]["Content"] && dic["Content"]["Content"]["UsedResources"]){
                    var fntList = [];
                    var plistList = [];
                    var pngList = []
                    var resArray = dic["Content"]["Content"]["UsedResources"];
                    for(var n = 0; n <resArray.length; n++){
                        var ext = cc.path.extname(resArray[n]).toLowerCase();
                        if(ext === '.fnt'){
                            fntList.push(resArray[n]);
                        }
                        else if(ext === '.plist'){
                            plistList.push(resArray[n]);
                        }
                        else if(ext === '.png'){
                            pngList.push(resArray[n]);
                        }
                    }
                    // CocosStudio 리소스 로딩은 loadFnt를 통해 순차적으로 진행됩니다.
                    this.loadFnt( fntList, function (){
                        // readResoueces는 다시 addToAssetPanel=false로 호출되므로 문제가 없습니다.
                        this.readResoueces(plistList, pngList );
                        this.uiTextures[ fileName ] = plistList;
                        this.checkFiles( fileName, 'cocosStudio' );
                    }.bind(this))
                }
            }

            break;
        case ".exportjson":
            dic = JSON.parse(fileContents);
            if( dic[ "widgetTree" ] ) {
                // UI Project File
                cc.loader.cache[url] = dic;
                this.uiURL[ fileName ] = url;

                var loadFntFinishCallback = function(){
                    // readResoueces는 다시 addToAssetPanel=false로 호출되므로 문제가 없습니다.
                    this.readResoueces(dic['textures'], dic['texturesPng'] );
                    this.uiTextures[ fileName ] = dic[ "textures" ];
                    this.checkFiles( fileName, 'ui' );
                }.bind(this);

                // FNT 리소스 로딩 (UI 프로젝트 내 BMFont)
                var fntList = [];
                function findChild( obj ){
                    var children = obj['children'];
                    for( var i = 0; i< children.length ; i++ ){
                        if(children[i]["classname"] ===  "LabelBMFont"){
                            fntList.push( children[i]['options']['fileNameData']['path'] );
                        }
                        if( children[i]["children"].length > 0 ){
                            findChild( children[i] );
                        }
                    }
                }
                findChild(dic['widgetTree'] );

                var loadCount = 0;
                function loadFnt( fntFile ){
                    var fntFileName = fntFile.split('/');
                    var item =  ResourceMapData[ fntFileName[ fntFileName.length - 1 ]];
                    item.file(function( file ) {
                        // readFile 호출 시 addToAssetPanel=false로 전달 (FNT 파일의 경우)
                        Loader.readFile( file , function(){
                            var newConf = cc.loader.getRes(fntFile);
                            var pngName = newConf.atlasName.split('/');
                            var pngItem = ResourceMapData[ pngName[ pngName.length - 1 ]];
                            pngItem.file( function( pngfile ) {
                                // readFile 호출 시 addToAssetPanel=false로 전달 (FNT에 연결된 PNG)
                                Loader.readFile( pngfile , function(){
                                    loadCount++;
                                    if( loadCount < fntList.length)
                                        loadFnt( fntList[loadCount]);
                                    else
                                        loadFntFinishCallback();
                                });
                            });
                        });
                    });
                }

                if( loadCount < fntList.length)
                    loadFnt( fntList[loadCount]);
                else
                    loadFntFinishCallback();

            } else if( dic[ ccs.CONST_ARMATURE_DATA ] ) {
                // Armature Project File
                this.armatureData[ fileName ] = dic;
                // readResoueces는 다시 addToAssetPanel=false로 호출되므로 문제가 없습니다.
                this.readResoueces(dic['config_png_path'], dic['config_file_path'] );


                armatureDataArr = dic[ccs.CONST_ARMATURE_DATA] || [];
                if( !self.armatureIDs.hasOwnProperty( fileName ) ) {
                    self.armatureIDs[ fileName ] = [];
                }
                for(i = 0; i < armatureDataArr.length; ++i ) {
                    self.armatureIDs[ fileName ].push( armatureDataArr[ i ][ ccs.CONST_A_NAME ] );
                }

                var dataInfo = new ccs.DataInfo();
                ccs.dataReaderHelper.addDataFromJsonCache( dic, dataInfo );

                this.armatureFrames[ fileName ] = dic[ ccs.CONST_CONFIG_FILE_PATH ];
                this.armatureList.push( fileName );
                this.checkFiles( fileName, 'armature' );
            }
            break;
    }
    // PNG는 비동기이므로 이미 위에서 return 되었고, 다른 타입은 cb를 여기서 호출합니다.
    if (ext !== ".png") {
        cb && cb();
    }
};

Loader.readResoueces = function ( pngData, plistData ) {
    var i, pngNameSplit, plistgNameSplit;
    var pngNames = [];
    var plistNames = [];

    for( i = 0;i < pngData.length;i++){
        pngNameSplit =  pngData[i].split('/');
        pngNames.push(pngNameSplit[pngNameSplit.length - 1 ]);
    }

    for( i = 0;i < plistData.length;i++) {
        plistgNameSplit = plistData[i].split('/');
        plistNames.push(plistgNameSplit[plistgNameSplit.length - 1]);
    }

    var item = null;
    for (i=0; i<pngNames.length; i++) {
        item = ResourceMapData[pngNames[i] ];
        if( !!item === false){
            printLog( "No resource file : "+ pngNames[i]);
            continue;
        }
        item.file(function( file ) {
            // 폴더 안의 리소스는 Assets 패널에 추가되지 않음 (false 명시)
            Loader.readFile( file, null, false );
        });
    }

    for (i=0; i<plistNames.length; i++) {
        item = ResourceMapData[plistNames[i] ];
        if( !!item === false){
            printLog( "No resource file : "+ plistNames[i]);
            continue;
        }
        item.file(function( file ) {
            // 폴더 안의 리소스는 Assets 패널에 추가되지 않음 (false 명시)
            Loader.readFile( file, null, false );
        });
    }
};

Loader.readSpineResoueces = function ( fileName ) {
    var resourceUrls = [ fileName + ".atlas", fileName + ".png" ];

    for (var i = 0; i < resourceUrls.length; i++) {
        var url = resourceUrls[i];
        var cachedResource = cc.loader.cache[url];

        if (!cachedResource) {
            var itemFileName = cc.path.basename(url);
            var item = ResourceMapData[itemFileName];

            if (!!item === false) {
                console.warn(`[Loader] Missing Spine resource file: ${url} for ${fileName}`);
                printLog( "No resource file : "+ url);
                continue;
            }

            item.file(function( file ) {
                // Spine의 연관 리소스는 Assets에 추가 안 함 (false 명시)
                Loader.readFile( file, null, false );
            });
        } else {
            console.log(`[Loader] Spine resource already in cache: ${url}`);
        }
    }
};

Loader.loadFnt = function ( fntFileList , endCallback) {
    if(!fntFileList || fntFileList.length === 0){
        endCallback && endCallback();
        return;
    }

    var count = fntFileList.length;
    for(var n = 0; n < fntFileList.length; n++) {
        var fntFile = fntFileList[n];
        var fntFileName = fntFile.split('/');
        var item = ResourceMapData[fntFileName[fntFileName.length - 1]];
        item.file(function (file) {
            // FNT 파일 로드 시 addToAssetPanel=false
            Loader.readFile(file, function () {
                var newConf = cc.loader.getRes(fntFile);
                var pngName = newConf.atlasName.split('/');
                var pngItem = ResourceMapData[pngName[pngName.length - 1]];
                pngItem.file(function (pngfile) {
                    // FNT에 연결된 PNG 로드 시 addToAssetPanel=false
                    Loader.readFile(pngfile, function () {
                        count--
                        if (count <= 0)
                            endCallback && endCallback();
                    });
                });
            });
        });
    }
}

Loader.removeData = function ( fileName ){
    //console.log('Loader.removeData', fileName );
    if( !!this.armatureFrames[fileName] === true)
        delete this.armatureFrames[fileName];

    if( !!this.uiTextures[fileName] === true)
        delete this.uiTextures[fileName];
};

Loader.checkFiles = function ( fileName, type ) {
    var i;
    var fileNames = [];

    switch( type ) {
        case 'plist':
            if( this.textureList.indexOf( fileName ) >= 0 ) {
                this._addSpriteFrames( fileName );
                fileNames = this._checkAllArmatureFrames();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileNames[ i ] ] ) );
                }
                fileNames = this._checkAllUITextures();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    if(this.uiURL[ fileNames[ i ] ] ) {
                        cc.eventManager.dispatchCustomEvent('loadUI', this.uiURL[fileNames[i]]);
                    }
                    else if(this.cocosStudioURL[ fileNames[ i ] ] ){
                        cc.eventManager.dispatchCustomEvent( 'loadCocosStudio', this.cocosStudioURL[ fileNames[ i ]  ] );
                    }
                }
            }
            break;
        case 'png': // PNG 로드 시 loadImage 이벤트는 _processFileData에서 addToAssetPanel 조건부로 처리
            // 기존 PNG 로딩 후 armature, UI 체크 로직은 그대로 유지
            if( this.plistList.indexOf( fileName ) >= 0 ) {
                this._addSpriteFrames( fileName );
                fileNames = this._checkAllArmatureFrames();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileNames[ i ] ] ) );
                }
                fileNames = this._checkAllUITextures();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    if(this.uiURL[ fileNames[ i ] ] ) {
                        cc.eventManager.dispatchCustomEvent('loadUI', this.uiURL[fileNames[i]]);
                    }
                    else if(this.cocosStudioURL[ fileNames[ i ] ] ){
                        cc.eventManager.dispatchCustomEvent( 'loadCocosStudio', this.cocosStudioURL[ fileNames[ i ]  ] );
                    }
                }
            }
            break;
        case 'armature':
            if( this._checkArmatureFrames( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileName ] ) );
            }
            break;
        case 'ui':
            if( this._checkUIFile( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadUI', this.uiURL[ fileName ] );
            }
            break;
        case 'spine':
            if( this._checkSpineFile( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadSpine', fileName );
            }
            break;
        case 'cocosStudio':
            if( this._checkCocosStudioFile(fileName)){
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadCocosStudio', this.cocosStudioURL[ fileName ] );
            }
            break;
    }
};

Loader._checkAllArmatureFrames = function() {
    var loadedFileNames = [];

    for( var fileName in this.armatureFrames ) {
        if( this._checkArmatureFrames( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

Loader._checkArmatureFrames = function( fileName ) {
    if( !this.armatureFrames.hasOwnProperty( fileName ) ) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    var config = this.armatureFrames[ fileName ];
    var loaded = true;
    for( var i = 0; i < config.length; i++ ) {
        var path = cc.path.basename( config[ i ], '.plist' );
        if( this.plistList.indexOf( path ) < 0 || this.textureList.indexOf( path ) < 0 ) {
            loaded = false;
            break;
        }
    }
    return loaded;
};

Loader._checkAllUITextures = function() {
    var loadedFileNames = [];

    for( var fileName in this.uiTextures ) {
        if( this._checkUIFile( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

Loader._checkUIFile = function( fileName ) {
    if( !this.uiTextures.hasOwnProperty( fileName ) ) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    var textures = this.uiTextures[ fileName ];
    var loaded = true;
    for( var i = 0; i < textures.length; i++ ) {
        var path = cc.path.basename( textures[ i ], '.plist' );
        if( this.plistList.indexOf( path ) < 0 || this.textureList.indexOf( path ) < 0 ) {
            loaded = false;
            break;
        }
    }
    return loaded;
};

Loader._checkSpineFile = function( fileName ) {
    const isJsonDataLoaded = this.spineData.hasOwnProperty(fileName);
    const isAtlasFileLoaded = this.atlasList.indexOf(fileName) >= 0;
    const isTextureFileLoaded = this.textureList.indexOf(fileName) >= 0;

    const loaded = isJsonDataLoaded && isAtlasFileLoaded && isTextureFileLoaded;

    // *** 이 로그를 반드시 추가합니다. (이전 답변에서 추가하라고 했으나 로그에 없었음) ***
    console.log(`[DEBUG - Loader] _checkSpineFile for '${fileName}': JSON Data=${isJsonDataLoaded}, ATLAS File=${isAtlasFileLoaded}, PNG Texture=${isTextureFileLoaded}. Result=${loaded}`);

    return loaded;
};

Loader._checkCocosStudioFile = function (fileName){
    return Loader._checkUIFile(fileName);
}

Loader._addSpriteFrames = function( fileName ) {
    var frameConfig = this.plistFiles[ fileName ];
    var tex = this.textures[ fileName ];
    var frames = frameConfig.frames;

    var spriteFrames = cc.spriteFrameCache._spriteFrames;
    var spAliases =  cc.spriteFrameCache._spriteFramesAliases;

    for( var key in frames ){
        var frame = frames[ key ];
        var spriteFrame = new cc.SpriteFrame(tex, cc.rect(frame.rect), frame.rotated, frame.offset, frame.size);
        var aliases = frame.aliases;
        if (aliases) {//set aliases
            for (var i = 0, li = aliases.length; i < li; i++) {
                var alias = aliases[i];
                spAliases[alias] = key;
            }
        }
        spriteFrames[key] = spriteFrame;
    }
};
Loader.clearAssetCache = function(fileName, type) {
    console.log(`[Loader] 캐시 삭제 시작: '${fileName}' (타입: ${type})`);

    // 1. loadedFileNames 배열에서 제거
    const loadedIndex = this.loadedFileNames.indexOf(fileName);
    if (loadedIndex > -1) {
        this.loadedFileNames.splice(loadedIndex, 1);
    }

    // 2. 타입에 따라 각 리스트 및 데이터 객체에서 제거
    switch(type) {
        case 'armature':
            delete this.armatureData[fileName];
            delete this.armatureFrames[fileName];
            const armIndex = this.armatureList.indexOf(fileName);
            if (armIndex > -1) this.armatureList.splice(armIndex, 1);
            break;
        case 'spine':
            delete this.spineData[fileName];
            const spIndex = this.spineList.indexOf(fileName);
            if (spIndex > -1) this.spineList.splice(spIndex, 1);
            // Spine은 .atlas, .png 파일도 함께 사용하므로 관련 캐시도 지울 수 있습니다.
            delete this.atlasFiles[fileName];
            const atlasIndex = this.atlasList.indexOf(fileName);
            if (atlasIndex > -1) this.atlasList.splice(atlasIndex, 1);
            break;
        case 'ui':
            delete this.uiURL[fileName];
            delete this.uiTextures[fileName];
            break;
        case 'cocosstudio':
            delete this.cocosStudioURL[fileName];
            delete this.uiTextures[fileName]; // UI와 동일한 텍스처 리스트 사용
            break;
        case 'image':
            // 독립적인 이미지는 별도의 리스트가 없으므로 loadedFileNames 제거로 충분할 수 있음
            break;
    }

    // 참고: 여러 에셋이 공유하는 .plist, .png 텍스처는 복잡성 때문에 이 예시에서는 생략했습니다.
    // 완벽한 구현을 위해서는 해당 리소스들의 참조 카운팅이 필요할 수 있습니다.

    console.log(`[Loader] 캐시 삭제 완료: '${fileName}'`);
};