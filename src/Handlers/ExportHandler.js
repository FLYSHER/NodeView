document.addEventListener("DOMContentLoaded", function(){
    window.exportHandler = new ExportHandler();
});

var ExportHandlerKey = {
    ButtonElement : {
        Scene : "btnExportScene",
        Resources : "btnExportResources"
    },
    ExportType : {
        Scene : 0,
        Resources : 1,
        TagName : "exportType",
    },
    NodeType : {
        Scene : 0,
        Node : 1,
        Armature : 2,
        UIWidget : 3,
    },
};

function ExportHandler() {
    this._init();
}

ExportHandler.prototype._init = function(){
    this._initButtons();
};
ExportHandler.prototype._initButtons = function(){
    var self = this;
    for(var key in ExportHandlerKey.ButtonElement){
        document.getElementById(ExportHandlerKey.ButtonElement[key]).addEventListener("click", (function(key){
            return function(evt){
                self.onClickButton(key);
            };
        })(key));
    }
};

ExportHandler.prototype.onClickButton = function(key){
    switch (ExportHandlerKey.ButtonElement[key]) {
        case ExportHandlerKey.ButtonElement.Scene:
            this._onClickExportScene();
            break;
        case ExportHandlerKey.ButtonElement.Resources:
            this._onClickExportResources();
            break;
    }
};

// Export Scene
ExportHandler.prototype._onClickExportScene = function(){
    var sceneGraph = hierarchyHandler.getSceneGraph();
    
    var jsonObject = null;
    try {
        jsonObject = this._createSceneGraphJSON(sceneGraph);
    } catch(e) {
        alert("Creating JSON File is failed.");
        return;
    }

    jsonObject["useInSlotEditor"] = true;
    jsonObject[ExportHandlerKey.ExportType.TagName] = ExportHandlerKey.ExportType.Scene;
    
    this.exportToJsonFile(jsonObject);
};
ExportHandler.prototype._createSceneGraphJSON = function(graph){
    var retVal = {
        
    }; 
    
    var self = this;
    function makeObjectRecursive(sceneObject, targetObject){
        var nodeInfo = self._makeNodeObject(sceneObject);
        for(var key in nodeInfo)
            targetObject[key] = nodeInfo[key];
        
        var childKeys = Object.keys(sceneObject.children);
        for(var i=0; i<childKeys.length; i++){
            var childKey = childKeys[i];
            targetObject.children[childKey] = {};
            makeObjectRecursive(sceneObject.children[childKey], targetObject.children[childKey]);
        }
    }
    
    makeObjectRecursive(graph, retVal);
    return retVal;
};
ExportHandler.prototype._makeNodeObject = function(sceneObject){
    var node = sceneObject.node;
    var retVal = {
        name : sceneObject.name,
        node : {
            posX : 0,
            posY : 0,
            scaleX : 0,
            scaleY : 0,
            anchorX : 0,
            anchorY : 0,
            contentSizeWidth : 0,
            contentSizeHeight : 0,
            visible : false,
            zOrder : 0,
        },
        nodeType : ExportHandlerKey.NodeType.Node,
        resourceName : sceneObject.resourceName,
        children : {}
    };
    
    retVal.name = node.getName();
    retVal.node.posX = node.getPositionX();
    retVal.node.posY = node.getPositionY();
    retVal.node.scaleX = node.getScaleX();
    retVal.node.scaleY = node.getScaleY();
    retVal.node.anchorX = node.getAnchorPoint().x;
    retVal.node.anchorY = node.getAnchorPoint().y;
    retVal.node.contentSizeWidth = node.getContentSize().width;
    retVal.node.contentSizeHeight = node.getContentSize().height;
    retVal.node.visible = node.visible;
    retVal.node.zOrder = node.getLocalZOrder();
    
    if(sceneObject.node instanceof cc.Scene)
        retVal.nodeType = ExportHandlerKey.NodeType.Scene;
    
    if(sceneObject.node instanceof ccs.Armature)
        retVal.nodeType = ExportHandlerKey.NodeType.Armature;
    
    if(sceneObject.node instanceof ccui.Widget)
        retVal.nodeType = ExportHandlerKey.NodeType.UIWidget;
    
    return retVal;
};

// Export Resources
ExportHandler.prototype._onClickExportResources = function(){
    var retVal = {
        resources : {},
    };
    for(var key in ResourceMap) {
        var fileName = ResourceMap[key].name;
        var extName = cc.path.extname(fileName); 
        if(extName !== ".ExportJson")
            fileName = "image/"+fileName;
        
        retVal.resources[key] = fileName;
    }
    
    retVal["useInSlotEditor"] = true;
    retVal[ExportHandlerKey.ExportType.TagName] = ExportHandlerKey.ExportType.Resources;
    
    this.exportToJsonFile(retVal);
};

// Export
ExportHandler.prototype.exportToJsonFile = function(object){
    // get File Name to make.
    var name = prompt("파일명을 입력하세요.", "download");
    if(name === null)
        return;

    name += ".json";
    
    // if object is not string, make it string.
    var obj = null;
    if(typeof object !== "string") {
        try {
            obj = JSON.stringify(object);
        } catch(e) {
            throw new Error("JSON stringify is not possible.\nPlease Validate the object.");
        }
    }
    
    // run download.
    const blob = new Blob([obj], { type: 'text/json' });
    const link = document.createElement('a');
    link.download = name;
    link.href = URL.createObjectURL(blob);

    const clickEvt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
    });
    link.dispatchEvent(clickEvt);
    link.remove();
};