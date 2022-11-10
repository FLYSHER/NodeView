var SlotLoader = SlotLoader || {};

var loader = null;//= document.getElementById('SlotLoader');
var preview = null;///= document.getElementById('file_list');
//loader.addEventListener('change', SlotLoader.showTextFile);

var symbolLoader = null;//= document.getElementById('DefinesLoad');
//symbolLoader.addEventListener('change', SlotLoader.showSymbolFile);
var symbolLoadData = "";
var symbolLoadIndex = 0;

var loaded = false;
var symbolLoaded = false;


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

SlotLoader.init = function () {
    loader = document.getElementById('SlotLoader');
    preview = document.getElementById('file_list');
    loader.addEventListener('change', SlotLoader.showTextFile);

    symbolLoader = document.getElementById('DefinesLoad');
    symbolLoader.addEventListener('change', SlotLoader.showSymbolFile);
}

SlotLoader.showSymbolFile = function () {
    if (symbolLoaded === true)
        return;

    symbolLoaded = true;

    const selectedFiles = symbolLoader.files;
    let reader = new FileReader();
    reader.readAsText(selectedFiles[0]);
    reader.onload = (function (f) {
        return function (e) {
            let fileContents = e.target.result;
            symbolLoadData = JSON.parse(fileContents).SymbolInfo.SymbolProperty;
            SlotLoader.loadSymbol();
        };
    })(selectedFiles[0]);
}

SlotLoader.loadSymbol = function () {
    if (symbolLoadIndex < symbolLoadData.length) {

        if (symbolLoadIndex === 0) {
            var tab_id = "tab-symbols";
            $('ul.hierarchyTabs li').removeClass('current');
            $('.tab-hierarchyContent').removeClass('current');

            $("#" + tab_id).addClass('current');
            if (tab_id === 'tab-symbols') {
                Tool_Select_Type = type_tab.type_symbol;
            } else if (tab_id === 'tab-hierarchy') {
                Tool_Select_Type = type_tab.type_hierarchy;
            }
            // 선택된 하이라키, 심볼 노드 인덱스 초기화
            selectIndex = -1;
            selectItem = null;
            Tool.initUI(false);
        }

        let info = symbolLoadData[symbolLoadIndex]
        let ar = info.text;
        SlotLoader.readFile(ar + ".ExportJson");
        symbolLoadIndex++;
    }
}

SlotLoader.showTextFile = function () {
    if (loaded === true)
        return;

    loaded = true;

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


    let canvas = cc._canvas;
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

    let self = this;
    let i, reader, ext;

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
            let url = f.name;
            let fileContents = e.target.result;
            let ext = cc.path.extname(f.name).toLowerCase();
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

SlotLoader._processFileData = function (url, fileContents, ext, cb) {
    let self = this,
        armatureDataArr, i, dic;

    let fileName = cc.path.mainFileName(url);
    switch (ext) {
        case ".fnt":
            cc.loader.cache["image/" + url] = _fntLoader.parseFnt(fileContents, "image/" + url);
            break;
        case ".plist":
            let plistData = cc.plistParser.parse(fileContents);
            this.plistFiles[fileName] = cc.spriteFrameCache._parseFrameConfig(plistData);
            this.plistList.push(fileName);

            this.checkFiles(fileName, 'plist');
            break;
        case ".png":
            cc.loader.loadImg(
                fileContents,
                {isCrossOrigin: false},
                function (err, img) {
                    let tex2d = new cc.Texture2D();
                    tex2d.initWithElement(img);
                    tex2d.handleLoadedTexture();
                    self.textures[fileName] = tex2d;
                    if (self.textureList.indexOf(fileName) < 0)
                        self.textureList.push(fileName);

                    if (!cc.loader.cache['image/' + url]) {
                        cc.loader.cache['image/' + url] = tex2d;
                    }
                    self.checkFiles(fileName, 'png');
                    cb && cb();
                }
            );
            return;
            break;
        case ".json":
            dic = JSON.parse(fileContents);
            this.cocosStudioURL [fileName] = url;
            cc.loader.cache[url] = dic;
            if (dic["Content"] && dic["Content"]["Content"] && dic["Content"]["Content"]["UsedResources"]) {
                let fntList = [];
                let plistList = [];
                let pngList = []
                let resArray = dic["Content"]["Content"]["UsedResources"];
                for (let n = 0; n < resArray.length; n++) {
                    let ext = cc.path.extname(resArray[n]).toLowerCase();
                    if (ext === '.fnt') {
                        fntList.push(resArray[n]);
                    } else if (ext === '.plist') {
                        plistList.push(resArray[n]);
                    } else if (ext === '.png') {
                        pngList.push(resArray[n]);
                    }
                }
                this.loadFnt(fntList, function () {
                    this.readResources(plistList, pngList);
                    this.uiTextures[fileName] = plistList;
                    this.checkFiles(fileName, 'cocosStudio');
                }.bind(this))
            }

            break;
        case ".exportjson":
            dic = JSON.parse(fileContents);
            if (dic["widgetTree"]) {
                // UI
                cc.loader.cache[url] = dic;
                this.uiURL[fileName] = url;

                let loadFntFinishCallback = function () {
                    this.readResources(dic['textures'], dic['texturesPng']);
                    this.uiTextures[fileName] = dic["textures"];
                    this.checkFiles(fileName, 'ui');
                }.bind(this);


                let fntList = [];

                function findChild(obj) {
                    let children = obj['children'];
                    for (let i = 0; i < children.length; i++) {
                        if (children[i]["classname"] === "LabelBMFont") {
                            fntList.push(children[i]['options']['fileNameData']['path']);
                        }
                        if (children[i]["children"].length > 0) {
                            findChild(children[i]);
                        }
                    }
                }

                findChild(dic['widgetTree']);

                let loadCount = 0;

                function loadFnt(fntFile) {
                    let fntFileName = fntFile.split('/');
                    let item = slotResourceData[fntFileName[fntFileName.length - 1]];
                    SlotLoader.readFile(item.name, function () {
                        let newConf = cc.loader.getRes(fntFile);
                        let pngName = newConf.atlasName.split('/');
                        let pngItem = slotResourceData[pngName[pngName.length - 1]];
                        SlotLoader.readFile(pngItem.name, function () {
                            loadCount++;
                            if (loadCount < fntList.length)
                                loadFnt(fntList[loadCount]);
                            else
                                loadFntFinishCallback();
                        });
                    });
                }


                if (loadCount < fntList.length)
                    loadFnt(fntList[loadCount]);
                else
                    loadFntFinishCallback();


            } else if (dic[ccs.CONST_ARMATURE_DATA]) {
                // Armature
                this.armatureData[fileName] = dic;
                this.readResources(dic['config_png_path'], dic['config_file_path']);


                armatureDataArr = dic[ccs.CONST_ARMATURE_DATA] || [];
                if (!self.armatureIDs.hasOwnProperty(fileName)) {
                    self.armatureIDs[fileName] = [];
                }
                for (i = 0; i < armatureDataArr.length; ++i) {
                    self.armatureIDs[fileName].push(armatureDataArr[i][ccs.CONST_A_NAME]);
                }

                let dataInfo = new ccs.DataInfo();
                ccs.dataReaderHelper.addDataFromJsonCache(dic, dataInfo);

                this.armatureFrames[fileName] = dic[ccs.CONST_CONFIG_FILE_PATH];
                this.armatureList.push(fileName);
                this.checkFiles(fileName, 'armature');
            }
            break;
    }
    cb && cb();
};
SlotLoader.readResources = function (pngData, plistData) {
    let i, pngNameSplit, plistgNameSplit;
    let pngNames = [];
    let plistNames = [];

    for (i = 0; i < pngData.length; i++) {
        pngNameSplit = pngData[i].split('/');
        pngNames.push(pngNameSplit[pngNameSplit.length - 1]);
    }

    for (i = 0; i < plistData.length; i++) {
        plistgNameSplit = plistData[i].split('/');
        plistNames.push(plistgNameSplit[plistgNameSplit.length - 1]);
    }

    let item = null;
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

SlotLoader.loadFnt = function (fntFileList, endCallback) {
    if (!fntFileList || fntFileList.length === 0) {
        endCallback && endCallback();
        return;
    }

    let count = fntFileList.length;
    for (let n = 0; n < fntFileList.length; n++) {
        let fntFile = fntFileList[n];
        let fntFileName = fntFile.split('/');
        let item = slotResourceData[fntFileName[fntFileName.length - 1]];
        SlotLoader.readFile(item.name, function () {
            let newConf = cc.loader.getRes(fntFile);
            let pngName = newConf.atlasName.split('/');
            let pngItem = slotResourceData[pngName[pngName.length - 1]];
            SlotLoader.readFile(pngItem.name, function () {
                count--
                if (count <= 0)
                    endCallback && endCallback();
            });
        });
    }
}


SlotLoader.removeData = function (fileName) {
    if (!!this.armatureFrames[fileName] === true)
        delete this.armatureFrames[fileName];

    if (!!this.uiTextures[fileName] === true)
        delete this.uiTextures[fileName];
};

SlotLoader.checkFiles = function (fileName, type) {
    let i;
    let fileNames = [];

    switch (type) {
        case 'plist':
            if (this.textureList.indexOf(fileName) >= 0) {
                this._addSpriteFrames(fileName);
                fileNames = this._checkAllArmatureFrames();
                for (i = 0; i < fileNames.length; i++) {
                    this.loadedFileNames.push(fileNames[i]);
                    cc.eventManager.dispatchCustomEvent('loadArmature', JSON.stringify(this.armatureIDs[fileNames[i]]));
                }
                if (fileNames.length > 0) {
                    this.armatureIDs = {};
                    this.armatureFrames = {};
                }

                fileNames = this._checkAllUITextures();
                for (i = 0; i < fileNames.length; i++) {
                    this.loadedFileNames.push(fileNames[i]);
                    if (this.uiURL[fileNames[i]]) {
                        cc.eventManager.dispatchCustomEvent('loadUI', this.uiURL[fileNames[i]]);
                    } else if (this.cocosStudioURL[fileNames[i]]) {
                        cc.eventManager.dispatchCustomEvent('loadCocosStudio', this.cocosStudioURL[fileNames[i]]);
                    }
                }
                if (fileNames.length > 0) {
                    this.uiURL = {};
                    this.cocosStudioURL = {};
                    this.uiTextures = {};
                }
            }
            break;
        case 'png':
            if (this.plistList.indexOf(fileName) >= 0) {
                this._addSpriteFrames(fileName);
                fileNames = this._checkAllArmatureFrames();
                for (i = 0; i < fileNames.length; i++) {
                    this.loadedFileNames.push(fileNames[i]);
                    cc.eventManager.dispatchCustomEvent('loadArmature', JSON.stringify(this.armatureIDs[fileNames[i]]));
                }
                if (fileNames.length > 0) {
                    this.armatureIDs = {};
                    this.armatureFrames = {};
                }

                fileNames = this._checkAllUITextures();
                for (i = 0; i < fileNames.length; i++) {
                    this.loadedFileNames.push(fileNames[i]);
                    if (this.uiURL[fileNames[i]]) {
                        cc.eventManager.dispatchCustomEvent('loadUI', this.uiURL[fileNames[i]]);
                    } else if (this.cocosStudioURL[fileNames[i]]) {
                        cc.eventManager.dispatchCustomEvent('loadCocosStudio', this.cocosStudioURL[fileNames[i]]);
                    }
                }
                if (fileNames.length > 0) {
                    this.uiURL = {};
                    this.cocosStudioURL = {};
                    this.uiTextures = {};
                }
            }
            break;
        case 'armature':
            if (this._checkArmatureFrames(fileName)) {
                this.loadedFileNames.push(fileName);
                cc.eventManager.dispatchCustomEvent('loadArmature', JSON.stringify(this.armatureIDs[fileName]));

                this.armatureFrames = {};
                this.armatureIDs = {};
            }
            break;
        case 'ui':
            if (this._checkUIFile(fileName)) {
                this.loadedFileNames.push(fileName);
                cc.eventManager.dispatchCustomEvent('loadUI', this.uiURL[fileName]);

                this.uiURL = {};
                this.uiTextures = {};
            }
            break;
        case 'cocosStudio':
            if (this._checkCocosStudioFile(fileName)) {
                this.loadedFileNames.push(fileName);
                cc.eventManager.dispatchCustomEvent('loadCocosStudio', this.cocosStudioURL[fileName]);

                this.cocosStudioURL = {};
                this.uiTextures = {};
            }
            break;
    }
};

SlotLoader._checkAllArmatureFrames = function () {
    let loadedFileNames = [];

    for (let fileName in this.armatureFrames) {
        if (this._checkArmatureFrames(fileName)) {
            loadedFileNames.push(fileName);
        }
    }

    return loadedFileNames;
};

SlotLoader._checkArmatureFrames = function (fileName) {
    if (!this.armatureFrames.hasOwnProperty(fileName)) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    let config = this.armatureFrames[fileName];
    let loaded = true;
    for (let i = 0; i < config.length; i++) {
        let path = cc.path.basename(config[i], '.plist');
        if (this.plistList.indexOf(path) < 0 || this.textureList.indexOf(path) < 0) {
            loaded = false;
            break;
        }
    }

    return loaded;
};

SlotLoader._checkAllUITextures = function () {
    let loadedFileNames = [];

    for (let fileName in this.uiTextures) {
        if (this._checkUIFile(fileName)) {
            loadedFileNames.push(fileName);
        }
    }

    return loadedFileNames;
};

SlotLoader._checkUIFile = function (fileName) {
    if (!this.uiTextures.hasOwnProperty(fileName)) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    let textures = this.uiTextures[fileName];
    let loaded = true;
    for (let i = 0; i < textures.length; i++) {
        let path = cc.path.basename(textures[i], '.plist');
        if (this.plistList.indexOf(path) < 0 || this.textureList.indexOf(path) < 0) {
            loaded = false;
            break;
        }
    }
    return loaded;
};

SlotLoader._checkCocosStudioFile = function (fileName) {
    return SlotLoader._checkUIFile(fileName);
}

SlotLoader._addSpriteFrames = function (fileName) {
    let frameConfig = this.plistFiles[fileName];
    let tex = this.textures[fileName];
    let frames = frameConfig.frames;

    let spriteFrames = cc.spriteFrameCache._spriteFrames;
    let spAliases = cc.spriteFrameCache._spriteFramesAliases;

    for (let key in frames) {
        let frame = frames[key];
        let spriteFrame = new cc.SpriteFrame(tex, cc.rect(frame.rect), frame.rotated, frame.offset, frame.size);
        let aliases = frame.aliases;
        if (aliases) {//set aliases
            for (let i = 0, li = aliases.length; i < li; i++) {
                let alias = aliases[i];
                spAliases[alias] = key;
            }
        }
        spriteFrames[key] = spriteFrame;
    }
};