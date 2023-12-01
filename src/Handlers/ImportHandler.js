document.addEventListener("DOMContentLoaded", function () {
    window.importHandler = new ImportHandler();
});

ImportHandlerKeys = {
    ButtonElement: {
        Scene: "btnImportScene",
        Resources: "btnImportResources"
    },
};

function ImportHandler() {
    this._currFile = null;
    this._isImportEnable = true;
    this._init();
}

ImportHandler.prototype._init = function () {
    this._initButtons();
};
ImportHandler.prototype._initButtons = function () {
    var self = this;
    for (var key in ImportHandlerKeys.ButtonElement) {
        document.getElementById(ImportHandlerKeys.ButtonElement[key]).addEventListener("click", (function (key) {
            return function (evt) {
                self._onClickButton(key);
            }
        })(key));
    }
};
ImportHandler.prototype._onClickButton = function (key) {
    if(this._isImportEnable === false){
        alert("Resource is loading now... please wait.");
        return;
    }
    
    document.getElementById("inputFileAdd").click();
};

// Event when json load finish
ImportHandler.prototype.readFile = function (url) {
    // deep copy json data.
    this._currFile = JSON.parse(JSON.stringify(cc.loader.cache[url]));

    if (this._currFile[ExportHandlerKey.ExportType.TagName] === undefined)
        return;

    switch (this._currFile[ExportHandlerKey.ExportType.TagName]) {
        case ExportHandlerKey.ExportType.Scene:
            this._onClickScene();
            break;
        case ExportHandlerKey.ExportType.Resources:
            this._onClickResources();
            break;
    }
};

// Import Scene
ImportHandler.prototype._onClickScene = function () {
    var nextScene = this._createScene();

    cc.director.runScene(nextScene);
    window.GameScene = nextScene;
    RockN.GameScene = nextScene;
    hierarchyHandler.reload();
};
ImportHandler.prototype._createScene = function () {
    if (this._currFile.name !== "Scene") {
        alert("File content is not valid.\nPlease Check json file.");
        return;
    }

    var scene = new EditorScene();

    var self = this;

    function createSceneRecursive(nodeData, parent) {
        if (!nodeData && !parent) {
            createSceneRecursive(self._currFile);
            return;
        }

        if (nodeData["nodeType"] === undefined)
            return;

        var node = null;
        switch (nodeData["nodeType"]) {
            case ExportHandlerKey.NodeType.Scene:
                for(var key in nodeData.children){
                    createSceneRecursive(nodeData.children[key], scene);
                }
                break;
            case ExportHandlerKey.NodeType.Node:
                node = new cc.Node();
                break;
            case ExportHandlerKey.NodeType.Armature:
                node = new ccs.Armature(cc.path.mainFileName(nodeData.resourceName));
                break;
            case ExportHandlerKey.NodeType.UIWidget:
                if (!!nodeData.resourceName)
                    node = ccs.uiReader.widgetFromJsonFile(nodeData.resourceName);
                break;
        }
        
        if(!!node) {
            self._applyNodeAttr(nodeData, node);
            parent.addChild(node);
            var childrenkeys = Object.keys(nodeData.children);
            for(var i=0; i<childrenkeys.length; i++){
                var childkey = childrenkeys[i];
                createSceneRecursive(nodeData.children[childkey], node);
            }
        }
    }

    createSceneRecursive(this._currFile, scene);
    return scene;
};
/** @param {cc.Node} node */
ImportHandler.prototype._applyNodeAttr = function (data, node) {
    node.setName(data.name);
    node.setPositionX(data.node.posX);
    node.setPositionY(data.node.posY);
    node.setScaleX(data.node.scaleX);
    node.setScaleY(data.node.scaleY);
    node.setAnchorPoint(cc.p(data.node.anchorX,data.node.anchorY));
    node.setContentSize(cc.size(data.node.contentSizeWidth, data.node.contentSizeHeight));
    node.setVisible(data.node.visible);
    node.setLocalZOrder(data.node.zOrder);
};


// Import Resources
ImportHandler.prototype._onClickResources = function () {
    this._isImportEnable = false;
    document.getElementById("spinner").style.visibility = "visible";
    
    
    for(var key in this._currFile.resources) {
        var resPath = this._currFile.resources[key];
        cc.loader.load(resPath);
    }
    
    var self = this;
    setTimeout(function(){
        self._isImportEnable = true;
        document.getElementById("spinner").style.visibility = "hidden";
        for(var key in self._currFile.resources) {
            var resPath = self._currFile.resources[key];
            var dic = cc.loader.cache[resPath];
            if(!!dic["armature_data"]) {
                ccs.armatureDataManager.addArmatureFileInfo(resPath);
                modalNodeHandler.addArmatureData(resPath);
            } else {
                modalNodeHandler.addUIWidgetData(resPath);
            }

            fileHandler.appendItem(resPath, cc.path.extname(resPath) !== ".ExportJson");
        }
    }, 10000);
};