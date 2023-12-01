var eModalContent = null;
var eModalDetail = null;

/** @type {ModalHandler} */
var modalNodeHandler = null;
document.addEventListener("DOMContentLoaded", function(){
    eModalContent = document.getElementById("modalContent");
    eModalDetail = document.getElementById("modalDetail");
    modalNodeHandler = new ModalHandler();
});
ModalHandlerKey = {
    Type : {
        EmptyNode : 0,
        Armature : 1,
        UIWidget : 2,
    },
    
    ButtonElement : {
        EmptyNode : "modalItemEmptyNode",
        Armature : "modalItemArmature",
        UIWidget : "modalItemUIWidget",
    },
    PanelElement : {
        EmptyNodeDetailPanel : "modalDetailEmptyNode",
        ArmatureDetailPanel : "modalDetailArmature",
        UIWidgetDetailPanel : "modalDetailUIWidget"
    },
    InputElement : {
        EmptyNodeName : "modalInputEmptyNodeName",
        ArmatureName : "modalInputArmatureName",
        UIWidgetName : "modalInputUIWidgetName",
        
        ARFileSelect : "modalARFileSelect",
        UIFileSelect : "modalUIWidgetFileSelect",
        BtnCreateNode : "btnCreateNode",
    },
};


function ModalHandler(){
    this._modal = null;
    this._modalList = {};
    this._currSelectedType = -1;
    this._init();
}

ModalHandler.prototype._init = function(){
    this._initModalElement();
    this._initButtonElement();
    this._initPanelElement();
    this._initInputElement();
    this._initCustom();
};
ModalHandler.prototype._initModalElement = function(){
    this._modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    var self = this;
    document.getElementById("btnModalOpenNode").addEventListener("click", function(){
        self._modal.show();
    })
};
ModalHandler.prototype._initButtonElement = function(){
    var self = this;
    var keys = Object.keys(ModalHandlerKey.ButtonElement);
    for(var i=0; i<keys.length; i++) {
        var elem = document.getElementById(ModalHandlerKey.ButtonElement[keys[i]]);
        elem.addEventListener(
            "click",
            (function (key) {
                return function (event) {
                    self._onClickItem(key);
                }
            })(ModalHandlerKey.ButtonElement[keys[i]])
        )

        this._modalList[ModalHandlerKey.ButtonElement[keys[i]]] = elem;
    }
};
ModalHandler.prototype._initPanelElement = function(){
    var keys = Object.keys(ModalHandlerKey.PanelElement);
    for(var i=0; i<keys.length; i++) {
        var elem = document.getElementById(ModalHandlerKey.PanelElement[keys[i]]);
        this._modalList[ModalHandlerKey.PanelElement[keys[i]]] = elem;
    }
};
ModalHandler.prototype._initInputElement = function(){
    var keys = Object.keys(ModalHandlerKey.InputElement);
    for(var i=0; i<keys.length; i++) {
        var elem = document.getElementById(ModalHandlerKey.InputElement[keys[i]]);
        this._modalList[ModalHandlerKey.InputElement[keys[i]]] = elem;
    }
};
ModalHandler.prototype._initCustom = function(){
    var self = this;
    this._modalList[ModalHandlerKey.InputElement.BtnCreateNode].addEventListener("click", function(e){
        self._onClickCreate();
    });
};

ModalHandler.prototype._onClickItem = function(key){
    this._resetOnClick();
    this._modalList[key].className = "modal-item modal-item-clicked noHover";
    
    var panelElem = null;
    switch (key) {
        case ModalHandlerKey.ButtonElement.EmptyNode :
            panelElem = this._modalList[ModalHandlerKey.PanelElement.EmptyNodeDetailPanel];
            this._currSelectedType = ModalHandlerKey.Type.EmptyNode;
            break;
        case ModalHandlerKey.ButtonElement.Armature :
            panelElem = this._modalList[ModalHandlerKey.PanelElement.ArmatureDetailPanel];
            this._currSelectedType = ModalHandlerKey.Type.Armature;
            break;
        case ModalHandlerKey.ButtonElement.UIWidget :
            panelElem = this._modalList[ModalHandlerKey.PanelElement.UIWidgetDetailPanel];
            this._currSelectedType = ModalHandlerKey.Type.UIWidget;
            break;
    }
    
    panelElem.className = "modal-item-detail-panel-activate";
};
ModalHandler.prototype._onClickCreate = function(){
    if(this._isCreateValid() === false)
        return;

    document.getElementById("modalWarning").className = "modal-warning";
    switch (this._currSelectedType) {
        case ModalHandlerKey.Type.EmptyNode:
            this._createEmptyNode();
            break;
        case ModalHandlerKey.Type.Armature:
            this._createArmature();
            break;
        case ModalHandlerKey.Type.UIWidget:
            this._createUIWidget();
            break;
    }
};
ModalHandler.prototype._isCreateValid = function(){
    var text = "";
    if(this._currSelectedType < 0)
        text = "Please Select Node Type.";
    
    if(hierarchyHandler.getSelectedNode() === null)
        text = "Please select parent node or scene.";
    
    this.createWarningMessage(text);
    return text.length === 0;
};

ModalHandler.prototype._resetOnClick = function(){
    this._resetButtonElement();
    this._resetPanelElement();
};
ModalHandler.prototype._resetButtonElement = function(){
    var keys = Object.keys(ModalHandlerKey.ButtonElement);
    for(var i=0; i<keys.length; i++){
        var key = ModalHandlerKey.ButtonElement[keys[i]];
        var elem = this._modalList[key];
        elem.className = "modal-item";
    }
};
ModalHandler.prototype._resetPanelElement = function(){
    var keys = Object.keys(ModalHandlerKey.PanelElement);
    for(var i=0; i<keys.length; i++){
        var key = ModalHandlerKey.PanelElement[keys[i]];
        var elem = this._modalList[key];
        elem.className = "modal-item-detail-panel";
    }
};

ModalHandler.prototype.addArmatureData = function(arName){
    var elem = this._modalList[ModalHandlerKey.InputElement.ARFileSelect];
    var option = document.createElement("option");
    option.value = arName;
    option.text = arName;
    elem.appendChild(option);
};
ModalHandler.prototype.addUIWidgetData = function(widgetName){
    var elem = this._modalList[ModalHandlerKey.InputElement.UIFileSelect];
    var option = document.createElement("option");
    option.value = widgetName;
    option.text = widgetName;
    elem.appendChild(option);
};


// Create Empty Node
ModalHandler.prototype._createEmptyNode = function(){
    if(this._isEmptyNodeDataValid() === false)
        return;
    
    var nodeName = this._modalList[ModalHandlerKey.InputElement.EmptyNodeName].value;
    this._modalList[ModalHandlerKey.InputElement.EmptyNodeName].value = "";
    var node = new cc.Node();
    node.setName(nodeName);
    
    hierarchyHandler.getSelectedNode().addChild(node);
    hierarchyHandler.reload();
    this.setModalVisible(false);
};
ModalHandler.prototype._isEmptyNodeDataValid = function(){
    var nodeElem = this._modalList[ModalHandlerKey.InputElement.EmptyNodeName];
    var text = "";
    if(cc.isString(nodeElem.value) === false || nodeElem.value.length < 1 || hierarchyHandler.getNodeNames().indexOf(nodeElem.value) !== -1) 
        text = "Invalid node name.";
    
    if(hierarchyHandler.getSelectedNode() instanceof ccs.Armature)
        text = "You can't add node to armature.";
    
    this.createWarningMessage(text);
    return text.length === 0;
};

// Create Armature
ModalHandler.prototype._createArmature = function(){
    if(this._isArmatureDataValid() === false)
        return;
    
    var nodeNameElem = this._modalList[ModalHandlerKey.InputElement.ArmatureName];
    var selectElem = document.getElementById("modalARFileSelect");
    var selectIndex = selectElem.options.selectedIndex;
    var ARName = cc.path.mainFileName(selectElem.options[selectIndex].value);
    
    var ar = new ccs.Armature(ARName);
    ar.setName(nodeNameElem.value);
    
    hierarchyHandler.getSelectedNode().addChild(ar);
    hierarchyHandler.reload();
    hierarchyHandler.setResourceName(nodeNameElem.value, ARName);
    
    nodeNameElem.value = "";
    selectElem.options.selectedIndex = 0;
    
    this._modal.hide();
};
ModalHandler.prototype._isArmatureDataValid = function(){
    var nodeNameElem = this._modalList[ModalHandlerKey.InputElement.ArmatureName];
    var selectElem = document.getElementById("modalARFileSelect");

    var warning = "";
    if(nodeNameElem.value.length === 0)
        warning = "Please input node name.";
    
    if(hierarchyHandler.getNodeNames().indexOf(nodeNameElem.value) !== -1)
        warning = "Current node name is already exist.";

    if(selectElem.options.selectedIndex === 0)
        warning = "Choose Armature file.";
    
    if(hierarchyHandler.getSelectedNode() instanceof ccs.Armature)
        warning = "You can't add node to armature.";
    
    this.createWarningMessage(warning);
    return warning.length === 0;
};

// Create UIWidget
ModalHandler.prototype._createUIWidget = function(){
    if(this._isUIWidgetValid() === false)
        return;
    
    var nodeName = this._modalList[ModalHandlerKey.InputElement.UIWidgetName];
    
    var selectElem = this._modalList[ModalHandlerKey.InputElement.UIFileSelect];
    var selectIndex = selectElem.options.selectedIndex;
    var uiName = selectElem.options[selectIndex].value;
    
    var uiWidget = ccs.uiReader.widgetFromJsonFile(uiName);
    uiWidget.setAnchorPoint(cc.p(0.5,0.5));
    uiWidget.setName(nodeName.value);
    
    hierarchyHandler.getSelectedNode().addChild(uiWidget);
    hierarchyHandler.reload();
    hierarchyHandler.setResourceName(nodeName.value, uiName);
    
    selectElem.options.selectedIndex = 0;
    nodeName.value = "";
    
    this._modal.hide();
};
ModalHandler.prototype._isUIWidgetValid = function(){
    var uiName = document.getElementById("modalInputUIWidgetName");
    var uiSelect = document.getElementById("modalUIWidgetFileSelect");
    
    var text = "";
    if(uiName.value.length < 1)
        text = "Please input node name";

    if(hierarchyHandler.getNodeNames().indexOf(uiName.value) !== -1)
        text = "Current node name is already exist.";
    
    if(uiSelect.options.selectedIndex === 0)
        text = "Please select ui file.";

    if(hierarchyHandler.getSelectedNode() instanceof ccs.Armature)
        text = "You can't add ui to armature.";
    
    this.createWarningMessage(text);
    return text.length === 0;
};

// Utils
ModalHandler.prototype.setModalVisible = function(visible){
    if(typeof visible !== "boolean")
        return;

    if(visible)
        this._modal.show();
    else
        this._modal.hide();
};
ModalHandler.prototype.createWarningMessage = function(msg){
    if(cc.isString(msg) === false)
        return;
    
    document.getElementById("modalWarning").innerHTML = msg;
};