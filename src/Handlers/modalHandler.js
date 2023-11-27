var eModalContent = null;
var eModalDetail = null;

/** @type {ModalHandler} */
var modalHandler = null;
document.addEventListener("DOMContentLoaded", function(){
    eModalContent = document.getElementById("modalContent");
    eModalDetail = document.getElementById("modalDetail");
    modalHandler = new ModalHandler();
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
    document.getElementById("btnModalOpen").addEventListener("click", function(){
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
    if(this._showWarningMessage())
        return;

    document.getElementById("modalWarning").className = "modal-warning";
    switch (this._currSelectedType) {
        case ModalHandlerKey.Type.EmptyNode:
            this._createEmptyNode();
            break;
        case ModalHandlerKey.Type.Armature:
            break;
        case ModalHandlerKey.Type.UIWidget:
            break;
    }
};
ModalHandler.prototype._showWarningMessage = function(){
    var elem = document.getElementById("modalWarning");
    var text = "";
    
    if(this._currSelectedType < 0)
        text = "Please Select Node Type.";
    
    if(hierarchyHandler.getSelectedNode() === null)
        text = "Please select parent node or scene.";
    
    elem.innerHTML = text;
    
    return text.length > 0;
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


// Create Empty Node
ModalHandler.prototype._createEmptyNode = function(){
    var nodeName = this._modalList[ModalHandlerKey.InputElement.EmptyNodeName].value;
    
    if(cc.isString(nodeName) === false || nodeName.length < 1) {
        document.getElementById("modalWarning").innerHTML = "Invalid node name.";
        return;
    }

    this._modalList[ModalHandlerKey.InputElement.EmptyNodeName].value = "";
    var node = new cc.Node();
    node.setName(nodeName);
    
    hierarchyHandler.getSelectedNode().addChild(node);
    hierarchyHandler.reload();
    this.setModalVisible(false);
};
ModalHandler.prototype.setModalVisible = function(visible){
    if(typeof visible !== "boolean")
        return;
    
    if(visible)
        this._modal.show();
    else
        this._modal.hide();
};