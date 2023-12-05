var eModalModuleContent = null;
var eModalModuleDetail = null;
document.addEventListener("DOMContentLoaded", function(){
    eModalModuleContent = document.getElementById("modalModuleContent");
    eModalModuleDetail = document.getElementById("modalModuleDetail");
    window.modalModuleHandler = new ModalModuleHandler();
});

var ModalModuleHandlerKey = {
    ButtonElement : {
        SlotMenu : "modalModuleItemSlotMenu",
        JackpotNoti : "modalModuleItemJackpotNoti",
    },
    PanelElement: {
        SlotMenuPanel : "modalModuleDetailSlotMenu",
        JackpotNotiPanel : "modalModuleDetailJackpotNoti",
    },
    InputElement : {
        JackpotNotiUISelect : "modalJackpotNotiUISelect",
        JackpotNotiWinSelect : "modalJackpotNotiFxSelect",
        JackpotNotiProgressSelect : "modalJackpotNotiProgressSelect",
        JackpotNotiCount : "modalJackpotNotiCount",
        JackpotNotiMaxDigit : "modalJackpotNotiDigit",
    },
};

function ModalModuleHandler() {
    this._modal = null;
    this._modalList = {};
    this._currSelectBtn = null;
    this._init();
}

ModalModuleHandler.prototype.reset = function(){
    this._resetJackpotNoti();
};
ModalModuleHandler.prototype._resetJackpotNoti = function(){
    var selectUI = document.getElementById("modalJackpotNotiUISelect");
    for(var key in window.UIWidgetFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.UIWidgetFiles[key];
        selectUI.appendChild(option);
    }

    var selectProgress = document.getElementById("modalJackpotNotiProgressSelect");
    for(var key in window.ArmatureFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.ArmatureFiles[key];
        selectProgress.appendChild(option);
    }

    var selectFx = document.getElementById("modalJackpotNotiFxSelect");
    for(var key in window.ArmatureFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.ArmatureFiles[key];
        selectFx.appendChild(option);
    }
};

ModalModuleHandler.prototype._init = function(){
    this._initModalElement();
    this._initButtonElement();
    this._initPanelElement();
    this._initInputElement();
    this._initCustom();
};
ModalModuleHandler.prototype._initModalElement = function(){
    this._modal = new bootstrap.Modal(document.getElementById("moduleModal"));
    var self = this;
    document.getElementById("btnModalOpenModule").addEventListener("click",function(){
        self._modal.show();
        self.reset();
    });
};
ModalModuleHandler.prototype._initButtonElement = function(){
    var self = this;
    for(var key in ModalModuleHandlerKey.ButtonElement){
        var keyName = ModalModuleHandlerKey.ButtonElement[key];
        this._modalList[keyName] = document.getElementById(ModalModuleHandlerKey.ButtonElement[key]);
        this._modalList[keyName].addEventListener("click", (function(key){
            return function(evt) {
                self._onClickButton(key);
            }
        })(keyName));
    }
};
ModalModuleHandler.prototype._initPanelElement = function(){
    for(var key in ModalModuleHandlerKey.PanelElement){
        var keyName = ModalModuleHandlerKey.PanelElement[key];
        this._modalList[keyName] = document.getElementById(keyName);
    }
};
ModalModuleHandler.prototype._initInputElement = function(){
    for(var key in ModalModuleHandlerKey.InputElement){
        var keyName = ModalModuleHandlerKey.InputElement[key];
        this._modalList[keyName] = document.getElementById(keyName);
    }
};
ModalModuleHandler.prototype._initCustom = function(){
    var self = this;
    document.getElementById("btnCreateModule").addEventListener("click", function(e){
        self._onClickCreate();
    });
    
    this._initJackpotNoti();
};
ModalModuleHandler.prototype._initJackpotNoti = function(){
    var selectUI = document.getElementById("modalJackpotNotiUISelect");
    for(var key in window.UIWidgetFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.UIWidgetFiles[key];
        selectUI.appendChild(option);
    }
    
    var selectProgress = document.getElementById("modalJackpotNotiProgressSelect");
    for(var key in window.ArmatureFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.ArmatureFiles[key];
        selectProgress.appendChild(option);
    }

    var selectFx = document.getElementById("modalJackpotNotiFxSelect");
    for(var key in window.ArmatureFiles) {
        var option = document.createElement("option");
        option.innerHTML = window.ArmatureFiles[key];
        selectFx.appendChild(option);
    }
};

ModalModuleHandler.prototype._onClickButton = function(key){
    this._resetOnClick();
    this._modalList[key].className = "modal-item modal-item-clicked noHover";
    this._currSelectBtn = key;
    
    switch (key) {
        case ModalModuleHandlerKey.ButtonElement.SlotMenu:
            
            break;
        case ModalModuleHandlerKey.ButtonElement.JackpotNoti:
            this._onClickJackpotNoti(key);
            break;
    }
};
ModalModuleHandler.prototype._resetOnClick = function(){
    this._resetButtonElement();
    this._resetPanelElement();
};
ModalModuleHandler.prototype._resetButtonElement = function(){
    for(var key in ModalModuleHandlerKey.ButtonElement) {
        var keyName = ModalModuleHandlerKey.ButtonElement[key];
        this._modalList[keyName].className = "modal-item";
    }
};
ModalModuleHandler.prototype._resetPanelElement = function(){
    for(var key in ModalModuleHandlerKey.PanelElement) {
        var keyName = ModalModuleHandlerKey.PanelElement[key];
        this._modalList[keyName].className = "modal-item-detail-panel";
    }
};

// Create Module
ModalModuleHandler.prototype._onClickCreate = function(){
    if(this._isCreateValid() === false)
        return;
    
    switch (this._currSelectBtn) {
        case ModalModuleHandlerKey.ButtonElement.SlotMenu:
            this._onCreateSlotMenu();
            break;
        case ModalModuleHandlerKey.ButtonElement.JackpotNoti:
            this._onCreateJackpotNoti();
            break;
    }
};
ModalModuleHandler.prototype._isCreateValid = function(){
    var msg = "";

    if(!this._currSelectBtn)
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

// Create Jackpot Noti
ModalModuleHandler.prototype._onClickJackpotNoti = function(){
    this._modalList[ModalModuleHandlerKey.PanelElement.JackpotNotiPanel].className = "modal-item-detail-panel-activate";
};
ModalModuleHandler.prototype._onCreateJackpotNoti = function(){
    var uiFile = this._getSelectElemValue(this._modalList[ModalModuleHandlerKey.InputElement.JackpotNotiUISelect]);
    var winAR = this._getSelectElemValue(this._modalList[ModalModuleHandlerKey.InputElement.JackpotNotiWinSelect]);
    var progressAR = this._getSelectElemValue(this._modalList[ModalModuleHandlerKey.InputElement.JackpotNotiProgressSelect]);
    var jackpotCount = this._modalList[ModalModuleHandlerKey.InputElement.JackpotNotiCount].value;
    var maxDigit = this._modalList[ModalModuleHandlerKey.InputElement.JackpotNotiMaxDigit].value;
    
    var digitarr = [];
    digitarr.length = jackpotCount;
    digitarr.fill(0);
    digitarr[jackpotCount - 1] = maxDigit;
    
    var jackpotNotiNode = new SlotJackpotNotiNode(null,uiFile,winAR,progressAR,jackpotCount,digitarr,false);
    jackpotNotiNode.setName("JackpotNoti");
    
    hierarchyHandler.getSelectedNode().addChild(jackpotNotiNode);
    hierarchyHandler.reload();
    
    this._modal.hide();
};

// Utils
/** @param {HTMLSelectElement} htmlElem */
ModalModuleHandler.prototype._getSelectElemValue = function(htmlElem){
    var selectIndex = htmlElem.options.selectedIndex;
    return htmlElem.options[selectIndex].value;
};
ModalModuleHandler.prototype.createWarningMessage = function(msg){
    document.getElementById("modalModuleWarning").innerHTML = msg;
};