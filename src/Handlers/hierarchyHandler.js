var eHierarchy = document.getElementById("hierarchy");
var HierarchyItemNodeName = "ccNodeName";

function HierarchyHandler(){
    /** @type {cc.Node & cc.Scene} */
    this._currScene = null;
    this._sceneGraph = {
        name : "Scene",
        node : null,
        htmlElement : null,
        children : {},
    };
    
    /** @type {HTMLParamElement} */
    this._selectedElem = null;
    /** @type {cc.Node} */
    this._selectedNode = null;
    
    /** @type {[string]} */
    this._nodeNames = [];
}

HierarchyHandler.prototype.reload = function(){
    this.drawHierarchy(GameScene);
};

HierarchyHandler.prototype.reset = function(){
    this._sceneGraph = {
        name : "Scene",
        node : null,
        children : {},
    };
    this._currScene = null;
    eHierarchy.innerHTML = "";
    this._nodeNames = [];
};

HierarchyHandler.prototype.drawHierarchy = function (scene) {
    this.reset();
    this._currScene = scene;
    this._sceneGraph.node = scene;
    this._createSceneGraph();
    this._createHierarchyElement();
};
HierarchyHandler.prototype._createSceneGraph = function(){
    var self = this;
    function setGraph(node){
        if(node instanceof ccs.Armature)
            return;
        
        var children = node.getChildren();
        
        for(var i=0; i<children.length; i++){
            var childName = children[i].getName();
            
            if(childName.length > 0) {
                var retVal = {
                    name : childName,
                    node : children[i],
                    children : {},
                };
                self.insertChild(node.getName(), retVal);
                self._nodeNames.push(childName);
                setGraph(children[i]);
            }
        }
    }
    
    setGraph(this._currScene);
};
HierarchyHandler.prototype.insertChild = function(ownerName, value) {
    function find(object){
        if(object.hasOwnProperty("children") === false)
            return;
        
        if(object.name === ownerName){
            object.children[value.name] = value;
            return;
        }
        
        var children = object.children;
        var keys = Object.keys(children);
        for(var i=0; i<keys.length; i++){
            if(keys[i] === ownerName) {
                var owner = children[keys[i]];
                if(owner.hasOwnProperty("children"))
                    owner.children[value.name] = value;
                else {
                    owner["children"] = {};
                    owner["name"] = ownerName;
                    owner.children[value.name] = value;
                }
                break;
            } else {
                find(children[keys[i]]);
            }
        }
    }
    
    find(this._sceneGraph);
};
HierarchyHandler.prototype._createHierarchyElement = function(){
    var self = this;
    var depth = 0;
    function createElemRecursive (object) {
        depth++;
        
        if(object.hasOwnProperty("children") === false) {
            depth--;
            return;
        }
        
        var children = object.children;
        var keys = Object.keys(children);
        if(keys.length > 0) {
            self._createNodeElement(depth, object.name, true);
            for(var i=0; i<keys.length; i++){
                createElemRecursive(children[keys[i]]);
            }
        } else {
            self._createNodeElement(depth, object.name, false);
        }
        
        depth--;
    }
    
    createElemRecursive(this._sceneGraph);
};
HierarchyHandler.prototype._createNodeElement = function(depth, nodeName, isFold){
    var self = this;
    var div = document.createElement("div");
    div.className = "hierarchy-folder";
    
    var elem = document.createElement("p");
    elem.className = "hierarchy-item";
    // Add spaces in front of label by depth count
    var text = "";
    for(var i=0; i<depth; i++){
        text += "&emsp;";
    }
    
    elem.innerHTML = text+" "+nodeName + "&emsp;";
    elem[HierarchyItemNodeName] = nodeName;
    elem.addEventListener('click', function(event){
        self.onClickElement(event);
    });
    div.appendChild(elem);

    if(isFold) {
        var btnElem = document.createElement("button");
        btnElem.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-file-arrow-down-fill\" viewBox=\"0 0 16 16\">\n" +
            "  <path d=\"M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M8 5a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 9.293V5.5A.5.5 0 0 1 8 5\"/>\n" +
            "</svg>";
        btnElem.addEventListener('click',(function(nodeName){
            return function(e){
                var obj = self.findObjectRecursive(nodeName);
                obj.htmlElement.isFold = !obj.htmlElement.isFold;
                self.foldElementRecursive(nodeName, obj.htmlElement.isFold);
            }
        })(nodeName));
        div.appendChild(btnElem);
    }
    
    eHierarchy.appendChild(div);
    
    this.findObjectRecursive(nodeName).htmlElement = elem;
};

HierarchyHandler.prototype.onClickElement = function(event){
    this.resetElemStatus();
    
    this._selectedElem = event.target;
    this._selectedElem.style.color = "#435585";
    this._selectedElem.style.fontWeight = "bold";
    
    var nodeName = this._selectedElem[HierarchyItemNodeName];
    var obj = this.findObjectRecursive(nodeName);
    this._selectedNode = obj.node;
    var originalScaleX = this._selectedNode.getScaleX();
    var originalScaleY = this._selectedNode.getScaleY();
    this._selectedNode.runAction(cc.sequence(cc.scaleTo(0.2,originalScaleX * 1.2, originalScaleY * 1.2),cc.scaleTo(0.2,originalScaleX,originalScaleY)));
    inspectorHandler.onClickNode(this._selectedNode);
};
HierarchyHandler.prototype.resetElemStatus = function(){
    var elems = document.getElementsByClassName("hierarchy-item");
    for(var i=0; i<elems.length; i++){
        elems[i].style.color = "black";
        elems[i].style.fontWeight = "normal";
    }
};


// Getter
HierarchyHandler.prototype.getSelectedNode = function(){
    return this._selectedNode;
};
HierarchyHandler.prototype.getSelectedElem = function(){
    return this._selectedElem;
};
HierarchyHandler.prototype.getNodeNames = function(){
    return this._nodeNames;
};

// Utils
HierarchyHandler.prototype.findObjectRecursive = function(nodeName){
    var retVal = null;
    
    function findRecursive(obj) {
        if(obj.name === nodeName) {
            retVal = obj;
            return;
        }
        
        if(obj.hasOwnProperty("children") === false)
            return;
        
        var children = obj.children;
        var keys = Object.keys(children);
        for(var i=0; i<keys.length; i++){
            findRecursive(children[keys[i]]);
        }
    }
    
    findRecursive(this._sceneGraph);
    
    return retVal;
};
HierarchyHandler.prototype.foldElementRecursive = function(nodeName, isfold){
    var currObj = this.findObjectRecursive(nodeName);
    var child = currObj.children;
    var keys = Object.keys(child);
    for(var i=0; i<keys.length; i++){
        // button toggle
        if(child[keys[i]].htmlElement.parentNode.children.length > 1)
            child[keys[i]].htmlElement.parentNode.children[1].style.display = isfold ? "none" : "block";
        
        // p tag toggle
        child[keys[i]].htmlElement.style.display = isfold ? "none" : "block";
        
        // recursive child toggle.
        this.foldElementRecursive(child[keys[i]].name, isfold);
    }
};

window.hierarchyHandler = new HierarchyHandler();