var SlotLoader = SlotLoader || {};

var loader = document.getElementById('SlotLoader');
var preview = document.getElementById('file_list');

loader.addEventListener('change', SlotLoader.showTextFile);

var loaded = false;


SlotLoader.loadedFileNames = [];
SlotLoader.armatureIDs = {};
SlotLoader.armatureFrames = {};
SlotLoader.uiURL = {};
SlotLoader.uiTextures = {};
SlotLoader.armatureList = [];
SlotLoader.plistList = [];
SlotLoader.textureList = [];
SlotLoader.armatureData = {};
SlotLoader.textures = {};
SlotLoader.plistFiles = {};
SlotLoader.cocosStudioURL = {};
SlotLoader.currentSelectResourceName = "";
var slotResourceData = {};


SlotLoader.showTextFile = function () {
    if (loaded === true)
        return;

    const selectedFiles = loader.files;
    const list = document.createElement('ul');
    preview.appendChild(list);

    for (const file of selectedFiles) {
        //summary.textContent = file.webkitRelativePath;
        let str = file.name.split('.');
        if (str[1] === 'ExportJson') {
            Tool.setSlotResource(str[0]);
        }
        slotResourceData[file.name] = file;
    }

    loaded = true;


    var canvas = cc._canvas;

    this.onDropHandler = function (evt) {
        if (SlotLoader.currentSelectResourceName === "")
            return;

        SlotLoader.readFile(SlotLoader.currentSelectResourceName + ".ExportJson");
        SlotLoader.currentSelectResourceName = "";
    };
    canvas.addEventListener("drop", this.onDropHandler, false);
}

SlotLoader.readFile = function (fileName, cb) {
    let file = null;
    file = slotResourceData[fileName];

    var self = this;
    var i, reader, ext;

    if (!file) {
        cb && cb();
        return;
    }

    reader = new FileReader();
    ext = cc.path.extname(fileName).toLowerCase();
    if (ext === ".json" || ext === ".exportjson") {
        reader.readAsText(file);
    } else if (ext === ".plist") {
        reader.readAsText(file);
    } else if (ext === ".png") {
        reader.readAsDataURL(file);
    } else if (ext === ".fnt") {
        reader.readAsText(file);
    } else {
        cc.log("지원하지 않는 포멧: " + fileName);
        cb && cb();
        return;
    }

    reader.onload = (function (f) {
        return function (e) {
            var url = f.name;
            var fileContents = e.target.result;
            var ext = cc.path.extname(f.name).toLowerCase();
            if (ext === ".json") {
                self._processFileData(url, fileContents, ext, cb);
                toggleJSONUI(true);
            } else {
                self._processFileData(url, fileContents, ext, cb);
            }
            if (ext === ".exportjson") {
                toggleJSONUI(false);
            }
            if (ext === ".json" || ext === ".exportjson") {
                g_fileName = f.name;
                g_fileContext = e.target.result;
            }
        };
    })(file);
}
SlotLoader._processFileData = function( url, fileContents, ext, cb ) {
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
        case ".png":
            cc.loader.loadImg(
                fileContents,
                {isCrossOrigin: false},
                function (err, img) {
                    var tex2d = new cc.Texture2D();
                    tex2d.initWithElement(img);
                    tex2d.handleLoadedTexture();
                    self.textures[ fileName ] = tex2d;
                    if( self.textureList.indexOf( fileName ) < 0 )
                        self.textureList.push( fileName );

                    if (!cc.loader.cache['image/' + url]) {
                        cc.loader.cache['image/' + url] = tex2d;
                    }
                    self.checkFiles( fileName, 'png' );
                    cb && cb();
                }
            );
            return;
            break;
        case ".json":
            dic = JSON.parse(fileContents);
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
                    this.readResources(plistList, pngList );
                    this.uiTextures[ fileName ] = plistList;
                    this.checkFiles( fileName, 'cocosStudio' );
                }.bind(this))
            }

            break;
        case ".exportjson":
            dic = JSON.parse(fileContents);
            if( dic[ "widgetTree" ] ) {
                // UI
                cc.loader.cache[url] = dic;
                this.uiURL[ fileName ] = url;

                var loadFntFinishCallback = function(){
                    this.readResources(dic['textures'], dic['texturesPng'] );
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
                    var item =  slotResourceData[ fntFileName[ fntFileName.length - 1 ]];
                    SlotLoader.readFile( item.name , function(){
                        var newConf = cc.loader.getRes(fntFile);
                        var pngName = newConf.atlasName.split('/');
                        var pngItem = slotResourceData[ pngName[ pngName.length - 1 ]];
                        SlotLoader.readFile( pngItem.name , function(){
                            loadCount++;
                            if( loadCount < fntList.length)
                                loadFnt( fntList[loadCount]);
                            else
                                loadFntFinishCallback();
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
                this.readResources(dic['config_png_path'], dic['config_file_path'] );


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
SlotLoader.readResources = function (pngData, plistData) {
    var i, pngNameSplit, plistgNameSplit;
    var pngNames = [];
    var plistNames = [];

    for (i = 0; i < pngData.length; i++) {
        pngNameSplit = pngData[i].split('/');
        pngNames.push(pngNameSplit[pngNameSplit.length - 1]);
    }

    for (i = 0; i < plistData.length; i++) {
        plistgNameSplit = plistData[i].split('/');
        plistNames.push(plistgNameSplit[plistgNameSplit.length - 1]);
    }

    var item = null;
    for (i = 0; i < pngNames.length; i++) {
        item = slotResourceData[pngNames[i]];
        if (!!item === false) {
            printLog("No resource file : " + pngNames[i]);
            continue;
        }
        SlotLoader.readFile(item.name);
    }

    for (i = 0; i < plistNames.length; i++) {
        item = slotResourceData[plistNames[i]];
        if (!!item === false) {
            //console.log("There is no ", plistNames[i]);
            printLog("No resource file : " + plistNames[i]);
            continue;
        }
        SlotLoader.readFile(item.name);
    }
};

SlotLoader.loadFnt = function ( fntFileList , endCallback) {
    if(!fntFileList || fntFileList.length === 0){
        endCallback && endCallback();
        return;
    }

    var count = fntFileList.length;
    for(var n = 0; n < fntFileList.length; n++) {
        var fntFile = fntFileList[n];
        var fntFileName = fntFile.split('/');
        var item = slotResourceData[fntFileName[fntFileName.length - 1]];
        SlotLoader.readFile(item.name, function () {
            var newConf = cc.loader.getRes(fntFile);
            var pngName = newConf.atlasName.split('/');
            var pngItem = slotResourceData[pngName[pngName.length - 1]];
            SlotLoader.readFile(pngItem.name, function () {
                count--
                if (count <= 0)
                    endCallback && endCallback();
            });
        });
    }
}


SlotLoader.removeData = function ( fileName ){
    //console.log('SlotLoader.removeData', fileName );
    if( !!this.armatureFrames[fileName] === true)
        delete this.armatureFrames[fileName];

    if( !!this.uiTextures[fileName] === true)
        delete this.uiTextures[fileName];
};

SlotLoader.checkFiles = function ( fileName, type ) {
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
                if(fileNames.length > 0){
                    this.armatureIDs = {};
                    this.armatureFrames = {};
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
        case 'png':
            if( this.plistList.indexOf( fileName ) >= 0 ) {
                this._addSpriteFrames( fileName );
                fileNames = this._checkAllArmatureFrames();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileNames[ i ] ] ) );
                }
                if(fileNames.length > 0){
                    this.armatureIDs = {};
                    this.armatureFrames = {};
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

                this.armatureFrames = {};
                this.armatureIDs = {};
            }
            break;
        case 'ui':
            if( this._checkUIFile( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadUI', this.uiURL[ fileName ] );
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

SlotLoader._checkAllArmatureFrames = function() {
    var loadedFileNames = [];

    for( var fileName in this.armatureFrames ) {
        if( this._checkArmatureFrames( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

SlotLoader._checkArmatureFrames = function( fileName ) {
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

SlotLoader._checkAllUITextures = function() {
    var loadedFileNames = [];

    for( var fileName in this.uiTextures ) {
        if( this._checkUIFile( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

SlotLoader._checkUIFile = function( fileName ) {
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

SlotLoader._checkCocosStudioFile = function (fileName){
    return SlotLoader._checkUIFile(fileName);
}

SlotLoader._addSpriteFrames = function( fileName ) {
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