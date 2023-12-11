var eInspectorPanel = document.getElementById("Inspector");
var eInspectorBtnApply = document.getElementById("btnInspectorApply");
eInspectorBtnApply.addEventListener("click",function(){
    try {
        inspectorHandler.onClickApply();
    } catch(e) {
        toastHandler.showMessage("Error : Applying node attribute failed.", ToastHandlerKey.Status.Code.Fail);
        return;
    }
    
    toastHandler.showMessage("Sucess : Applying node attribute succeed.", ToastHandlerKey.Status.Code.Success);
});
var eInspectorBtnDelete = document.getElementById("btnInspectorDelete");
eInspectorBtnDelete.addEventListener("click", function(){
    inspectorHandler.onClickDelete();
});

InspectorHandlerKey = {
    NodeType : {
        EmptyNode : 0,
        Armature : 1,
        UIWidget : 2,
        SlotMenu : 3,
        JackpotNoti : 4,
        Label : 5,
    },
};
function InspectorHandler() {
    /** @type {cc.Node | ccs.Armature | ccui.Widget} */
    this._currNode = null;
    this._eHandler = new ElementHandler();
}

InspectorHandler.prototype.reset = function () {
    this._currNode = null;
    this._eHandler.reset();
};

InspectorHandler.prototype.onClickNode = function (node) {
    this.reset();
    this._currNode = node;
    this.createInspectorByNodeType(this.getNodeType(node));
    this.createBtnApply();
};
InspectorHandler.prototype.createInspectorByNodeType = function(nodeType){
    if(cc.isArray(nodeType) === false)
        return;
    
    while(nodeType.length > 0) {
        var type = nodeType.shift();
        switch (type) {
            case InspectorHandlerKey.NodeType.EmptyNode:
                this.createNodeInspector();
                break;
            case InspectorHandlerKey.NodeType.Armature:
                this.createArmatureInspector();
                break;
            case InspectorHandlerKey.NodeType.Label:
                this.createLabelInspector();
                break;
        }
    }
    
};
InspectorHandler.prototype.createBtnApply = function(){
    this._eHandler.createBtnApply();
};

// Node Inspector
InspectorHandler.prototype.createNodeInspector = function () {
    this.createPosition();
    this.createScale();
    this.createAnchorPoint();
    this.createContentSize();
    this.createVisible();
    this.createZOrder();
};
InspectorHandler.prototype.createPosition = function () {
    var pos = this._currNode.getPosition();
    this._eHandler.createInputList("list_pos", ["posX", "posY"],["number", "number"]);
    
    var inputX = this._eHandler.getElement("input_posX");
    inputX.value = pos.x;
    var inputY = this._eHandler.getElement("input_posY");
    inputY.value = pos.y;
    
    // make center positioning button
    var parentNode = this._currNode.getParent();
    if(!!parentNode && parentNode.getName() === "Scene")
        this._createBtnCenterPos();
};
InspectorHandler.prototype._createBtnCenterPos = function(){
    var span = document.createElement("span");
    this._eHandler.appendChild(span, this._eHandler.getElement("list_pos"));
    
    var btn = document.createElement("button");
    btn.innerHTML = "Place Center";
    btn.className = "btn btn-info";
    var self = this;
    btn.addEventListener("click", function(evt){
        var parent = hierarchyHandler.getSelectedNode().getParent(); 
        if(!!parent && parent.getName() !== "Scene")
            return;
        
        var elemPosX = self._eHandler.getElement("input_posX");
        var elemPosY = self._eHandler.getElement("input_posY");
        
        var contentSize = parent.getContentSize();
        hierarchyHandler.getSelectedNode().setPosition(cc.p(contentSize.width / 2, contentSize.height / 2));
        elemPosX.value = contentSize.width / 2;
        elemPosY.value = contentSize.height / 2;
    })
    this._eHandler.appendChild(btn, span);
};
InspectorHandler.prototype.createScale = function(){
    this._eHandler.createInputList("list_scale", ["scaleX","scaleY"], ["number","number"]);
    
    var scaleX = this._eHandler.getElement("input_scaleX");
    scaleX.value = Number(this._currNode.getScaleX());
    var scaleY = this._eHandler.getElement("input_scaleY");
    scaleY.value = Number(this._currNode.getScaleY());
};
InspectorHandler.prototype.createAnchorPoint = function () {
    var anchor = this._currNode.getAnchorPoint();
    this._eHandler.createInputList("list_anchor",["anchorX","anchorY"], ["number", "number"]);
    var inputAnchorX = this._eHandler.getElement("input_anchorX");
    inputAnchorX.value = anchor.x;
    var inputAnchorY = this._eHandler.getElement('input_anchorY');
    inputAnchorY.value = anchor.y;
};
InspectorHandler.prototype.createContentSize = function(){
    var contentSize = this._currNode.getContentSize();
    this._eHandler.createInputList("list_content", ["contentSizeWidth","contentSizeHeight"], ["number","number"]);
    var inputContentSizeX = this._eHandler.getElement("input_contentSizeWidth");
    inputContentSizeX.value = contentSize.width;
    var inputContentSizeY = this._eHandler.getElement("input_contentSizeHeight");
    inputContentSizeY.value = contentSize.height;
};
InspectorHandler.prototype.createVisible = function(){
    this._eHandler.createInputList("list_visible", ["visible"], ["checkbox"]);

    var isVisible = this._eHandler.getElement("input_visible");
    isVisible.checked = this._currNode.isVisible();
    var self = this;
    isVisible.addEventListener('change',function(e){
        self._currNode.setVisible(e.target.checked); 
    });
};
InspectorHandler.prototype.createZOrder = function(){
    this._eHandler.createInputList("list_ZOrder",["zOrder"],["number"]);
    var input = this._eHandler.getElement("input_zOrder");
    input.value = this._currNode.getLocalZOrder();
};

// Armature Inspector
InspectorHandler.prototype.createArmatureInspector = function(){
    this.createAnimation();
};
InspectorHandler.prototype.createAnimation = function(){
    var list = this._eHandler.createItemList("list_animation");
    this._eHandler.appendChild(list, eInspectorPanel);
    var content = this._eHandler.createItemContent("Animation");
    this._eHandler.appendChild(content, list);
    var input = this._eHandler.createItemInput("animation", "text");
    this._eHandler.appendChild(input, content);
    this._eHandler.addElement("input_animation", input);
    input.readOnly = true;
    
    var selectElem = document.createElement("select");
    selectElem.className = "form-select";
    var self = this;
    selectElem.addEventListener("change", function(e){
        input.value = e.target.options[e.target.options.selectedIndex].value;
        var loop = Boolean(self._eHandler.getElement("input_animation_loop").checked);
        self._currNode.getAnimation().play(input.value, -1, loop);
    });
    this._eHandler.appendChild(selectElem, content);
    
    var movements =  this._currNode.getAnimation().getAnimationData().movementNames;
    for(var i=0; i<movements.length; i++){
        var option = document.createElement("option");
        option.value = movements[i];
        option.innerHTML = movements[i];
        selectElem.appendChild(option);
        this._eHandler.addElement(movements[i], option);
    }
    
    var currMovement = this._currNode.getAnimation().getCurrentMovementID(); 
    if(currMovement.length > 0) {
        input.value = currMovement;
        selectElem.selectedIndex = movements.indexOf(currMovement);
    } else {
        input.value = selectElem.options[selectElem.options.selectedIndex].value;
    }
    
    // Loop Checkbox
    var pCheckBox = document.createElement("p");
    this._eHandler.appendChild(pCheckBox, content);
    
    var spanCheckBox = document.createElement("span");
    spanCheckBox.textContent= "isLoop : ";
    this._eHandler.appendChild(spanCheckBox, pCheckBox);
    
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = this._currNode.getAnimation().loop === 0;
    checkbox.addEventListener("change",function(e){
        self._currNode.getAnimation().stop();
        self._currNode.getAnimation().play(input.value, -1, Boolean(e.target.checked) ? 1 : 0);
    });
    this._eHandler.appendChild(checkbox, pCheckBox);
    this._eHandler.addElement("input_animation_loop",checkbox);
};

// Label Inspector
InspectorHandler.prototype.createLabelInspector = function(){
    this.createString();
};
InspectorHandler.prototype.createString = function(){
    this._eHandler.createInputList("list_String",["string"],["text"]);
    var input = this._eHandler.getElement("input_string");
    input.value = this._currNode.getString();
};

InspectorHandler.prototype.getElementValue = function(elementID){
    var key = ElementHandlerKey.Type.input + elementID;
    return this._eHandler.getElement(key).value;
};

// Apply & Delete
InspectorHandler.prototype.onClickApply = function(){
    var nodeTypes = this.getNodeType(this._currNode);
    while(nodeTypes.length > 0) {
        var type = nodeTypes.shift();
        switch (type) {
            case InspectorHandlerKey.NodeType.Label:
                this._applyLabelAttribute();
                break;
            case InspectorHandlerKey.NodeType.EmptyNode:
                this._applyNodeAttribute();
                break;
            case InspectorHandlerKey.NodeType.Armature:
                this._applyArmatureAttribute();
                break;
        }
    }
};
InspectorHandler.prototype._applyNodeAttribute = function(){
    var pos = cc.p(0,0);
    pos.x = Number(this.getElementValue(ElementHandlerKey.NodeProperties.PosX));
    pos.y = Number(this.getElementValue(ElementHandlerKey.NodeProperties.PosY));
    this._currNode.setPosition(pos);
    
    var anchor = cc.p(0,0);
    anchor.x = Number(this.getElementValue(ElementHandlerKey.NodeProperties.AnchorX));
    anchor.y = Number(this.getElementValue(ElementHandlerKey.NodeProperties.AnchorY));
    this._currNode.setAnchorPoint(anchor);
    
    var content = cc.size(0,0);
    content.width = Number(this.getElementValue(ElementHandlerKey.NodeProperties.ContentSizeWidth));
    content.height = Number(this.getElementValue(ElementHandlerKey.NodeProperties.ContentSizeHeight));
    this._currNode.setContentSize(content);
    
    var scale = 1;
    var scaleY = 1;
    scale = Number(this.getElementValue(ElementHandlerKey.NodeProperties.scaleX));
    scaleY = Number(this.getElementValue(ElementHandlerKey.NodeProperties.scaleY));
    this._currNode.setScale(scale,scaleY);
    
    var isVisible = this._eHandler.getElement("input_visible");
    this._currNode.setVisible(isVisible.checked);
    
    var zOrder = this.getElementValue(ElementHandlerKey.NodeProperties.zOrder);
    this._currNode.setLocalZOrder(parseInt(zOrder));
};
InspectorHandler.prototype._applyArmatureAttribute = function(){
    var trackName = this.getElementValue(ElementHandlerKey.ArmatureProperties.movementName);
    var loop = this.getElementValue(ElementHandlerKey.ArmatureProperties.isLoop);
    this._currNode.getAnimation().play(trackName, -1, loop);
};
InspectorHandler.prototype._applyLabelAttribute = function(){
    var stringVal = this.getElementValue(ElementHandlerKey.LabelProperties.string);
    this._currNode.setString(stringVal);
};
InspectorHandler.prototype.onClickDelete = function(){
    this._currNode.removeFromParent(true);
    this.reset();
    this._eHandler.reset();
    hierarchyHandler.reload();
};

// Utils
/** @param {cc.Node | ccs.Armature | ccui.Widget} node */
InspectorHandler.prototype.getNodeType = function(node){
    var retVal = [InspectorHandlerKey.NodeType.EmptyNode];
    
    if(node instanceof ccs.Armature)
        retVal.push(InspectorHandlerKey.NodeType.Armature);
    
    if(node instanceof ccui.Widget)
        retVal.push(InspectorHandlerKey.NodeType.UIWidget);
    
    if(node instanceof SlotJackpotNotiNode)
        retVal.push(InspectorHandlerKey.NodeType.JackpotNoti);
    
    if(node instanceof CommonVideoSlotMenu)
        retVal.push(InspectorHandlerKey.NodeType.SlotMenu);
    
    if(node instanceof cc.LabelTTF || node instanceof cc.LabelBMFont || node instanceof ccui.Text || node instanceof ccui.TextBMFont)
        retVal.push(InspectorHandlerKey.NodeType.Label)
    
    // Return specific Type & If it has no type, return empty node.
    return retVal;
};

function ElementHandler() {
    this._elementList = {};
}

ElementHandler.prototype.reset = function () {
    eInspectorPanel.innerHTML = "";
    document.getElementById("divApply").style.display = "none";
}

ElementHandler.prototype.createItemList = function (listName) {
    var elem = document.createElement("div");
    elem.className = "inspector-item-list";
    this._elementList[listName] = elem;
    return elem;
};
ElementHandler.prototype.createItemContent = function (pName) {
    var elem = document.createElement("p");
    elem.className = "inspector-item-content";
    elem.innerHTML = pName + " :";
    this._elementList[pName] = elem;
    return elem;
};
ElementHandler.prototype.createItemInput = function (pName, inputType) {
    var elem = document.createElement("input");
    elem.type = inputType;
    elem.className = "inspector-item-input";
    
    var name = "input_"+pName;
    this._elementList[name] = elem;
    return elem;
};
ElementHandler.prototype.createInputList = function (listName, pName, inputType) {
    var pNameArr = [];
    if (Array.isArray(pName) === false)
        pNameArr = [pName];
    else
        pNameArr = pName;

    var list = this.createItemList(listName);
    this.appendChild(list, eInspectorPanel);

    for (var i = 0; i < pNameArr.length; i++) {
        var content = this.createItemContent(pNameArr[i]);
        var input = this.createItemInput(pNameArr[i], inputType[i]);
        this.appendChild(content, list);
        this.appendChild(input, content);
    }
}

ElementHandler.prototype.appendChild = function (node, target) {
    target.appendChild(node);
}

/** @return {HTMLElement | any} */
ElementHandler.prototype.getElement = function(name){
    return this._elementList[name];
};
ElementHandler.prototype.addElement = function(name, elem){
    this._elementList[name] = elem;
};
ElementHandler.prototype.createBtnApply = function(){
    document.getElementById("divApply").style.display = "block";
};

ElementHandlerKey = {
    Type : {
        input : "input_",
        list : "list_"
    },
    NodeProperties : {
        AnchorX : "anchorX",
        AnchorY : "anchorY",
        ContentSizeHeight : "contentSizeHeight",
        ContentSizeWidth : "contentSizeWidth",
        PosX : "posX",
        PosY : "posY",
        scaleX : "scaleX",
        scaleY : "scaleY",
        visible : "visible",
        zOrder : "zOrder"
    },
    ArmatureProperties : {
        isLoop : "animation_loop",
        movementName : "animation"
    },
    LabelProperties : {
        string : "string",
    },
};

window.inspectorHandler = new InspectorHandler();