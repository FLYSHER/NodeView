// loader.js
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
                // 폴더 내 파일은 Asset 패널에 추가하지 않음 (false)
                Loader.readFile( file ); // addToAssetPanel 인자를 생략하여 기본값 false 사용
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

        var items = event.dataTransfer.items;
        var handledByItems = false;

        if (items && items.length > 0) {
            for (var i=0; i<items.length; i++) {
                var item = items[i].webkitGetAsEntry();
                if (item) {
                    if (item.isFile) {
                        var fileNameExt = item.name.toLowerCase();
                        // [수정]: 직접 드롭된 파일이 PNG일 때만 addToAssetPanel을 true로 설정
                        var shouldAddToAssetPanel = fileNameExt.endsWith('.png');

                        item.file(function(file) {
                            Loader.readFile(file, null, shouldAddToAssetPanel);
                        });
                        handledByItems = true;
                    } else if (item.isDirectory) {
                        traverseFileTree(item);
                        handledByItems = true;
                    }
                }
            }
        }

        if (!handledByItems && event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            var files = event.dataTransfer.files;
            for (var i = 0; i < files.length; i++) {
                var fileNameExt = files[i].name.toLowerCase();
                // [수정]: 직접 드롭된 파일이 PNG일 때만 addToAssetPanel을 true로 설정
                var shouldAddToAssetPanel = fileNameExt.endsWith('.png');

                Loader.readFile(files[i], null, shouldAddToAssetPanel);
            }
        }
    };
    canvas.addEventListener("drop",this.onDropHandler, false);
};

Loader.reset = function() {
    this.armatureIDs = {};
    this.fileData = {
        frameConfig : null,
        texture     : null,
        armatureData: null
    };
};

Loader.readFile = function( file , cb, addToAssetPanel = false) {
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

            // [핵심 수정]: PNG 파일인 경우, addToAssetPanel을 항상 명시적으로 전달
            // 이렇게 함으로써, Loader.readSpineResoueces에서 Loader.readFile을 호출할 때
            // addToAssetPanel이 false로 전달되어 Spine PNG가 Image 에셋으로 등록되는 것을 방지합니다.
            if (ext === ".png") {
                self._processFileData(url, fileContents, ext, cb, addToAssetPanel);
            }
            else {
                // 다른 파일 타입은 기존 로직 유지 (addToAssetPanel은 드롭 이벤트를 통해 전달된 값 사용)
                self._processFileData(url, fileContents, ext, cb, addToAssetPanel);
            }

            if ( ext === ".json" ){
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

Loader._processFileData = function( url, fileContents, ext, cb, addToAssetPanel) {
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
            // [확인/수정]: cc.loader.cache[ url ] 에 파일 내용이 제대로 저장되는지 확인.
            // url은 파일의 원래 이름 (예: "mySpine.atlas")
            cc.loader.cache[ url ] = fileContents;
            this.atlasFiles[ fileName ] = fileContents;
            this.atlasList.push( fileName );
            console.log(`[Loader] Cached .atlas: ${url}`); // 디버그 로그 추가
            break;
        case ".png":
            cc.loader.loadImg(
                fileContents,
                {isCrossOrigin: false},
                function (err, img) {
                    var tex2d = new cc.Texture2D(); // [수정]: 오타 수정: cc.Texture2d -> cc.Texture2D
                    tex2d.initWithElement(img);
                    tex2d.handleLoadedTexture();
                    self.textures[ fileName ] = tex2d;
                    if( self.textureList.indexOf( fileName ) < 0 )
                        self.textureList.push( fileName );

                    // [수정]: PNG 캐싱 방식. 두 가지 키로 캐시 유지.
                    // Spine 런타임이 어떤 키를 사용할지 모르므로, 둘 다 제공하여 호환성 최대화.
                    cc.loader.cache[url] = tex2d; // filename.png 형태로 캐시
                    if (!cc.loader.cache['image/' + url]) { // image/filename.png 형태로도 캐시 (fnt/UI 호환성)
                        cc.loader.cache['image/' + url] = tex2d;
                    }

                    self.checkFiles( fileName, 'png' );
                    // [수정]: addToAssetPanel이 true일 때만 'loadImage' 이벤트를 디스패치합니다.
                    if (addToAssetPanel) {
                        console.log(`[Loader] Dispatched 'loadImage' for: ${fileName}`);
                        cc.eventManager.dispatchCustomEvent('loadImage', fileName);
                    } else {
                        // Spine의 PNG는 이 경로를 타서 Assets에 추가되지 않아야 합니다. (이전 구현과 동일)
                        console.log(`[Loader] Not adding ${fileName}.png to Assets (addToAssetPanel is false).`);
                    }
                    cb && cb();
                }
            );
            break;
        case ".json":
            dic = JSON.parse(fileContents);

            if(dic["skeleton"] && dic["skeleton"]["spine"]) {
                // [확인/수정]: cc.loader.cache[ url ] 에 JSON 내용이 제대로 저장되는지 확인.
                // url은 파일의 원래 이름 (예: "mySpine.json")
                cc.loader.cache[ url ] = fileContents;
                this.spineData[ fileName ] = fileContents;
                this.spineList.push( fileName );
                this.readSpineResoueces( fileName );
                this.uiTextures[ fileName ] = fileName + ".atlas"; // uiTextures는 Spine에서는 사용되지 않을 수 있음
                this.checkFiles( fileName, 'spine' );
                console.log(`[Loader] Cached .json (Spine): ${url}`); // 디버그 로그 추가
            }
            else {
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
                    this.loadFnt( fntList, function (){
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
                // UI
                cc.loader.cache[url] = dic;
                this.uiURL[ fileName ] = url;

                var loadFntFinishCallback = function(){
                    this.readResoueces(dic['textures'], dic['texturesPng'] );
                    this.uiTextures[ fileName ] = dic[ "textures" ];
                    this.checkFiles( fileName, 'ui' );
                }.bind(this);


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
                        Loader.readFile( file , function(){
                            var newConf = cc.loader.getRes(fntFile);
                            var pngName = newConf.atlasName.split('/');
                            var pngItem = ResourceMapData[ pngName[ pngName.length - 1 ]];
                            pngItem.file( function( pngfile ) {
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
                // Armature
                this.armatureData[ fileName ] = dic;
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
    cb && cb();
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
            // 여기서는 addToAssetPanel을 false로 전달하여, 폴더 안의 리소스는 Assets 패널에 추가되지 않음
            Loader.readFile( file );
        });
        //Loader.readFile(file);
    }

    for (i=0; i<plistNames.length; i++) {
        item = ResourceMapData[plistNames[i] ];
        if( !!item === false){
            //console.log("There is no ", plistNames[i]);
            printLog( "No resource file : "+ plistNames[i]);
            continue;
        }
        item.file(function( file ) {
            // 여기서는 addToAssetPanel을 false로 전달
            Loader.readFile( file );
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
                // [수정]: Spine의 연관 리소스는 Assets에 추가 안 함 (false 명시)
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
            // 여기서는 addToAssetPanel을 false로 전달
            Loader.readFile(file, function () {
                var newConf = cc.loader.getRes(fntFile);
                var pngName = newConf.atlasName.split('/');
                var pngItem = ResourceMapData[pngName[pngName.length - 1]];
                pngItem.file(function (pngfile) {
                    // 여기서는 addToAssetPanel을 false로 전달
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
        case 'png': // [수정] PNG 로드 시 loadImage 이벤트는 _processFileData에서 addToAssetPanel 조건부로 처리
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
    if( !this.uiTextures.hasOwnProperty( fileName ) ) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    var textures = this.uiTextures[ fileName ];
    var loaded = true;
    var path = cc.path.basename( textures, '.atlas' );
    if( this.atlasList.indexOf( fileName ) < 0 || this.textureList.indexOf( fileName ) < 0 ) {
        loaded = false;
    }

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