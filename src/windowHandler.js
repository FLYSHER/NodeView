/** @type {EditorScene} */
window.GameScene = {};
window.ResourceMap = {};

var inputFiles = document.getElementById("btnFileAdd");
inputFiles.addEventListener("change", onFileAdd, false);

var eResourceList = document.getElementById("resourceList");

window.SlotLoader = {
    plistFiles : {},
    plistList : [],
};

function onFileAdd(files) {
    if (!(files instanceof FileList))
        return;

    console.log(files);
    for (var i = 0; i < files.length; i++) {
        addFile(files[i]);
    }
}

function addFile(file) {
    if (!!ResourceMap[file.name]) {
        console.error("File " + file.name + " is already loaded.\nPlease restart the page if you want to reload.");
        return;
    }
    
    addFileToResourceList(file);
}

function addFileToResourceList(file) {
    appendItem(file.name);
    var mainName = cc.path.mainFileName(file.name)
    ResourceMap[mainName] = file;
    readFile(file);
}

function readFile(file){
    var reader = new FileReader();
    var ext = cc.path.extname(file.name).toLowerCase();
    if (ext === ".json" || ext === ".exportjson") {
        reader.readAsText(file);
    } else if (ext === ".plist") {
        reader.readAsText(file);
    } else if (ext === ".png") {
        reader.readAsDataURL(file);
    } else if (ext === ".fnt") {
        reader.readAsText(file);
    } else {
        cc.log("지원하지 않는 포멧: " + file.name);
    }

    reader.onload = (function (file) {
        return function (e) {
            let url = file.name;
            let fileContents = e.target.result;
            let ext = cc.path.extname(file.name).toLowerCase();
            processFileData(url, fileContents, ext, null);
        };
    })(file);
}

function processFileData(url, fileContents, ext, cb){
    let armatureDataArr, i, dic;
    let fileName = cc.path.mainFileName(url);
    switch (ext) {
        case ".fnt":
            cc.loader.cache["image/" + url] = _fntLoader.parseFnt(fileContents, "image/" + url);
            break;
        case ".plist":
            let plistData = cc.plistParser.parse(fileContents);
            SlotLoader.plistFiles[fileName] = cc.spriteFrameCache._parseFrameConfig(plistData);
            SlotLoader.plistList.push(fileName);

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
}

function appendItem(name) {
    var item = document.createElement("p");
    item.textContent = name;
    item.style = {margin: "5px"}
    eResourceList.appendChild(item);
}

function loadFile(file) {
    cc.loader.load(cc.path.join("assets", file.name), function () {
        if (file.name.search(/ExportJson/) !== -1) {
            if (file.name.search(/AR/) !== -1) {
                ccs.armatureDataManager.addArmatureFileInfo(file.name);
            }
        }
        if (file.name.search(/plist/) !== -1) {
            cc.spriteFrameCache.addSpriteFrames(file.name);
        }
    });
}