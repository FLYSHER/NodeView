/** @type {EditorScene} */
window.GameScene = {};
window.ResourceMap = {};

var eResourceList = document.getElementById("resourceList");

function handleInputFileChange(files){
    fileHandler.onFileAdd(files);
}

function FileHandler(){
    
}

FileHandler.prototype.onFileAdd = function (files) {
    if (!(files instanceof FileList))
        return;

    console.log(files);
    for (var i = 0; i < files.length; i++) {
        this.addFile(files[i]);
    }
}

FileHandler.prototype.addFile = function (file) {
    if (!!ResourceMap[file.name]) {
        console.error("File " + file.name + " is already loaded.\nPlease restart the page if you want to reload.");
        return;
    }

    this.addFileToResourceList(file);
}

FileHandler.prototype.addFileToResourceList = function (file) {
    this.appendItem(file.name);
    var mainName = cc.path.mainFileName(file.name)
    ResourceMap[mainName] = file;
    this.readFile(file);
}

FileHandler.prototype.readFile = function (file) {
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

    var self = this;
    reader.onload = (function (file) {
        return function (e) {
            let url = file.name;
            let fileContents = e.target.result;
            let ext = cc.path.extname(file.name).toLowerCase();
            self.processFileData(url, fileContents, ext, null);
        };
    })(file);
}

FileHandler.prototype.processFileData = function (url, fileContents, ext, cb) {
    let armatureDataArr, i, dic;
    let fileName = cc.path.mainFileName(url);
    switch (ext) {
        case ".fnt":
            cc.loader.cache["image/" + url] = cc._fntLoader.parseFnt(fileContents, "image/" + url);
            break;
        case ".plist":
            var plistUrl = 'image/'+url;
            let plistData = cc.plistParser.parse(fileContents);
            if(!cc.loader.cache[plistUrl])
                cc.loader.cache[plistUrl] = plistData;
            break;
        case ".png":
            var imgUrl = 'image/' + url;
            if (!cc.loader.cache[imgUrl]) {
                cc.loader.cache[imgUrl] = cc.loader.loadImg(
                    fileContents,
                    {isCrossOrigin: false},
                    function (err, img) {
                        cc.textureCache.handleLoadedTexture(img);
                        cb && cb();
                    }
                );
            }
            break;
        case ".json":
            dic = JSON.parse(fileContents);
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
            cc.loader.cache[url] = dic;
            if(!!dic["armature_data"])
                ccs.armatureDataManager.addArmatureFileInfo(url);
            break;
    }
}

FileHandler.prototype.appendItem = function (name) {
    var item = document.createElement("p");
    item.textContent = name;
    item.style.borderBottom = "2px solid black";
    item.style.margin = "0px";
    eResourceList.appendChild(item);
}

window.fileHandler = new FileHandler();

document.getElementById("btnFileAdd").addEventListener('click',()=>{
    document.getElementById("inputFileAdd").click();
});

