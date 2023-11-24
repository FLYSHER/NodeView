var eInspectorPanel = document.getElementById("Inspector");
var eInspectorBtnApply = document.getElementById("btnInspectorApply");
eInspectorBtnApply.addEventListener("click",function(){
    inspectorHandler.onClickApply();
})
var eInspectorBtnDelete = document.getElementById("btnInspectorDelete");
eInspectorBtnDelete.addEventListener("click", function(){
    inspectorHandler.onClickDelete();
})

function InspectorHandler() {
    /** @type {cc.Node} */
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
};

InspectorHandler.prototype.createNodeInspector = function () {
    this.createPosition();
    this.createAnchorPoint();
    this.createContentSize();
    this.createBtnApply();
};

InspectorHandler.prototype.createPosition = function () {
    var pos = this._currNode.getPosition();
    this._eHandler.createInputList("list_pos", ["posX", "posY"],["number", "number"]);
    
    var inputX = this._eHandler.getElement("input_posX");
    inputX.value = pos.x;
    var inputY = this._eHandler.getElement("input_posY");
    inputY.value = pos.y;
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

InspectorHandler.prototype.createBtnApply = function(){
    this._eHandler.createBtnApply();
};

InspectorHandler.prototype.onClickApply = function(){
    this.applyNodeAttribute();
};
InspectorHandler.prototype.onClickDelete = function(){
    this._currNode.removeFromParent(true);
    this.reset();
    this._eHandler.reset();
    hierarchyHandler.reload();
};

function ElementHandler() {
    this._pList = {};
}

ElementHandler.prototype.reset = function () {
    eInspectorPanel.innerHTML = "";
    document.getElementById("divApply").style.display = "none";
}

ElementHandler.prototype.createItemList = function (listName) {
    var elem = document.createElement("div");
    elem.className = "inspector-item-list";
    this._pList[listName] = elem;
    return elem;
};

ElementHandler.prototype.createItemContent = function (pName) {
    var elem = document.createElement("p");
    elem.className = "inspector-item-content";
    elem.innerHTML = pName + " :";
    this._pList[pName] = elem;
    return elem;
};

ElementHandler.prototype.createItemInput = function (pName, inputType) {
    var elem = document.createElement("input");
    elem.type = inputType;
    elem.className = "inspector-item-input";
    
    var name = "input_"+pName;
    this._pList[name] = elem;
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

ElementHandler.prototype.getElement = function(name){
    return this._pList[name];
};

ElementHandler.prototype.createBtnApply = function(){
    document.getElementById("divApply").style.display = "block";
};

window.inspectorHandler = new InspectorHandler();