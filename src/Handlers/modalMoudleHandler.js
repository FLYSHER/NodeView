var eModalModuleContent = null;
var eModalModuleDetail = null;
document.addEventListener("DOMContentLoaded", function(){
    eModalModuleContent = document.getElementById("modalModuleContent");
    eModalModuleDetail = document.getElementById("modalModuleDetail");
    window.modalModuleHandler = new ModalModuleHandler();
});

var ModalModuleHandlerKey = {
    ButtonElement : {
        SlotMenu : "modalModuleItemSlotMenu"
    },
    PanelElement: {
        SlotMenuPanel : "modalModuleDetailSlotMenu",
    },
};

function ModalModuleHandler() {
    this._modal = null;
    this._modalList = {};
    this._currSelectBtn = null;
    this._init();
}

ModalModuleHandler.prototype._init = function(){
    this._initModalElement();
    this._initButtonElement();
    this._initPanelElement();
    this._initCustom();
};
ModalModuleHandler.prototype._initModalElement = function(){
    this._modal = new bootstrap.Modal(document.getElementById("moduleModal"));
    var self = this;
    document.getElementById("btnModalOpenModule").addEventListener("click",function(){
        self._modal.show();
    });
};
ModalModuleHandler.prototype._initButtonElement = function(){
    var self = this;
    for(var key in ModalModuleHandlerKey.ButtonElement){
        this._modalList[key] = document.getElementById(ModalModuleHandlerKey.ButtonElement[key]);
        this._modalList[key].addEventListener("click", (function(key){
            return function(evt) {
                self._onClickButton(key);
            }
        })(key));
    }
};
ModalModuleHandler.prototype._initPanelElement = function(){
    for(var key in ModalModuleHandlerKey.PanelElement){
        this._modalList[key] = document.getElementById(ModalModuleHandlerKey.PanelElement[key]);
    }
};
ModalModuleHandler.prototype._initCustom = function(){
    var self = this;
    document.getElementById("btnCreateModule").addEventListener("click", function(e){
        self._onClickCreate();
    });
};

ModalModuleHandler.prototype._onClickButton = function(key){
    this._resetOnClick();
    this._modalList[key].className = "modal-item modal-item-clicked noHover";
    this._currSelectBtn = key;
    
    switch (ModalModuleHandlerKey.ButtonElement[key]) {
        case ModalModuleHandlerKey.ButtonElement.SlotMenu:
            
            break;
    }
};
ModalModuleHandler.prototype._resetOnClick = function(){
    this._resetButtonElement();
    this._resetPanelElement();
};
ModalModuleHandler.prototype._resetButtonElement = function(){
    for(var key in ModalModuleHandlerKey.ButtonElement) {
        this._modalList[key].className = "modal-item";
    }
};
ModalModuleHandler.prototype._resetPanelElement = function(){
    for(var key in ModalModuleHandlerKey.PanelElement) {
        this._modalList[key].className = "modal-item-detail-panel";
    }
};

// Create Module
ModalModuleHandler.prototype._onClickCreate = function(){
    if(this._isCreateValid() === false)
        return;
    
    switch (ModalModuleHandlerKey.ButtonElement[this._currSelectBtn]) {
        case ModalModuleHandlerKey.ButtonElement.SlotMenu:
            this._onCreateSlotMenu();
            break;
    }
};
ModalModuleHandler.prototype._isCreateValid = function(){
    var msg = "";

    if(this._currSelectBtn < 0)
        msg = "Please Select Node Type.";

    if(!hierarchyHandler.getSelectedNode())
        msg = "Please select parent node or scene.";
    
    if(hierarchyHandler.getSelectedNode() instanceof ccs.Armature)
        msg = "You can't create node in armature.";

    this.createWarningMessage(msg);
    return msg.length === 0;
};

// Create Slot Menu
ModalModuleHandler.prototype._onCreateSlotMenu = function(){
    if(this._isCreateSlotMenuValid() === false)
        return;
    
    var slotMenu = new CommonVideoSlotMenu();
    slotMenu.setButtonEnable(true);
    slotMenu.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2 - 260));
    
    hierarchyHandler.getSelectedNode().addChild(slotMenu);
    hierarchyHandler.reload();
    this._modal.hide();
};
ModalModuleHandler.prototype._isCreateSlotMenuValid = function(){
    var msg = "";
    if(hierarchyHandler.getNodeNames().indexOf("SlotMenu") !== -1)
        msg = "Slot Menu is already exist. You can't create another.";
    
    this.createWarningMessage(msg);
    return msg.length === 0;
};

// Utils
ModalModuleHandler.prototype.createWarningMessage = function(msg){
    document.getElementById("modalModuleWarning").innerHTML = msg;
};