/** @type {EditorScene} */
window.GameScene = {};
window.ResourceMap = {};

var eResourceList = document.getElementById("resourceList");
var eBtnImageFolder = document.getElementById("btnImageFolder");
var eImageList = document.getElementById("imageList");
eBtnImageFolder.addEventListener('click', function(e){
    toggleImageList();
});

var isImageListShow = false;
function toggleImageList(){
    if(isImageListShow === true) {
        isImageListShow = false;
        eImageList.style.display = "none";
    } else {
        isImageListShow = true;
        eImageList.style.display = "flex";
    }
}

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
    var extName = cc.path.extname(file.name);
    this.appendItem(file.name, extName !== ".ExportJson");
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
        case ".exportjson":
            dic = JSON.parse(fileContents);
            cc.loader.cache[url] = dic;
            if(!!dic["armature_data"])
                ccs.armatureDataManager.addArmatureFileInfo(url);
            break;
    }
}

FileHandler.prototype.appendItem = function (name, isImage) {
    var item = document.createElement("p");
    item.textContent = name;
    item.style.borderBottom = "2px solid black";
    item.style.margin = "0px";
    
    if(isImage)
        eImageList.appendChild(item);
    else
        eResourceList.appendChild(item);
    
    modalHandler.addArmatureData(name);
}

window.fileHandler = new FileHandler();

document.getElementById("btnFileAdd").addEventListener('click',()=>{
    document.getElementById("inputFileAdd").click();
});

