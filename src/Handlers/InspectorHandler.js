var eInspectorPanel = document.getElementById("Inspector");
var eInspectorBtnApply = document.getElementById("btnInspectorApply");
eInspectorBtnApply.addEventListener("click",function(){
    inspectorHandler.onClickApply();
});
var eInspectorBtnDelete = document.getElementById("btnInspectorDelete");
eInspectorBtnDelete.addEventListener("click", function(){
    inspectorHandler.onClickDelete();
});

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
    this.createNodeInspector();
    if(this._currNode instanceof ccs.Armature)
        this.createArmatureInspector();
    this.createBtnApply();
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
};
InspectorHandler.prototype.createPosition = function () {
    var pos = this._currNode.getPosition();
    this._eHandler.createInputList("list_pos", ["posX", "posY"],["number", "number"]);
    
    var inputX = this._eHandler.getElement("input_posX");
    inputX.value = pos.x;
    var inputY = this._eHandler.getElement("input_posY");
    inputY.value = pos.y;
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

// Armature Inspector
InspectorHandler.prototype.createArmatureInspector = function(){
    this.createAnimation();
};
InspectorHandler.prototype.createAnimation = function(){
    var list = this._eHandler.createItemList("list_animation");
    this._eHandler.appendChild(list, eInspectorPanel);
    var content = this._eHandler.createItemContent("currMovementID");
    this._eHandler.appendChild(content, list);
    var input = this._eHandler.createItemInput("input_animation", "text");
    this._eHandler.appendChild(input, content);
    input.readOnly = true;
    
    var selectElem = document.createElement("select");
    selectElem.className = "form-select";
    var self = this;
    selectElem.addEventListener("change", function(e){
        input.value = e.target.options[e.target.options.selectedIndex].value;
        self._currNode.getAnimation().play(input.value, -1, 1);
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

    input.value = selectElem.options[selectElem.options.selectedIndex].value;
};

InspectorHandler.prototype.getElementValue = function(elementID){
    var key = ElementHandlerKey.Type.input + elementID;
    return this._eHandler.getElement(key).value;
};

// Apply
InspectorHandler.prototype.onClickApply = function(){
    this._applyNodeAttribute();
};

InspectorHandler.prototype._applyNodeAttribute = function(){
    var pos = cc.p(0,0);
    pos.x = this.getElementValue(ElementHandlerKey.NodeProperties.PosX);
    pos.y = this.getElementValue(ElementHandlerKey.NodeProperties.PosY);
    this._currNode.setPosition(pos);
    
    var anchor = cc.p(0,0);
    anchor.x = this.getElementValue(ElementHandlerKey.NodeProperties.AnchorX);
    anchor.y = this.getElementValue(ElementHandlerKey.NodeProperties.AnchorY);
    this._currNode.setAnchorPoint(anchor);
    
    var content = cc.size(0,0);
    content.width = this.getElementValue(ElementHandlerKey.NodeProperties.ContentSizeWidth);
    content.height = this.getElementValue(ElementHandlerKey.NodeProperties.ContentSizeHeight);
    this._currNode.setContentSize(content);
    
    var scale = 1;
    var scaleY = 1;
    scale = Number(this.getElementValue(ElementHandlerKey.NodeProperties.scaleX));
    scaleY = Number(this.getElementValue(ElementHandlerKey.NodeProperties.scaleY));
    this._currNode.setScale(scale,scaleY);
    
    var isVisible = this._eHandler.getElement("input_visible");
    this._currNode.setVisible(isVisible.checked);
};

InspectorHandler.prototype.onClickDelete = function(){
    this._currNode.removeFromParent(true);
    this.reset();
    this._eHandler.reset();
    hierarchyHandler.reload();
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

ElementHandler.prototype.createBtnApply = function(){
    document.getElementById("divApply").style.display = "block";
};

ElementHandler.prototype.addElement = function(name, elem){
    this._elementList[name] = elem;
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
    },
};

window.inspectorHandler = new InspectorHandler();