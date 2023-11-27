var eHierarchy = document.getElementById("hierarchy");
var HierarchyItemNodeName = "ccNodeName";

function HierarchyHandler(){
    /** @type {cc.Node & cc.Scene} */
    this._currScene = null;
    this._sceneGraph = {
        name : "Scene",
        node : null,
        children : {},
    };
    
    /** @type {HTMLParamElement} */
    this._selectedElem = null;
    /** @type {cc.Node} */
    this._selectedNode = null;
};

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
            self._createNodeElement(depth, object.name);
            for(var i=0; i<keys.length; i++){
                createElemRecursive(children[keys[i]]);
            }
        } else {
            self._createNodeElement(depth, object.name);
        }
        
        depth--;
    }
    
    createElemRecursive(this._sceneGraph);
};

HierarchyHandler.prototype._createNodeElement = function(depth, nodeName){
    var elem = document.createElement("p");
    elem.className = "hierarchy-item";
    
    // Add spaces in front of label by depth count
    var text = "";
    for(var i=0; i<depth; i++){
        text += "&emsp;";
    }
    
    elem.innerHTML = text+" "+nodeName;
    elem[HierarchyItemNodeName] = nodeName;
    var self = this;
    elem.addEventListener('click', function(event){
        self.onClickElement(event);
    });
    eHierarchy.appendChild(elem);
};

HierarchyHandler.prototype.onClickElement = function(event){
    this.resetElemStatus();
    
    this._selectedElem = event.target;
    this._selectedElem.style.color = "#435585";
    this._selectedElem.style.fontWeight = "bold";
    
    var nodeName = this._selectedElem[HierarchyItemNodeName];
    var obj = this.findObjectRecursive(nodeName);
    this._selectedNode = obj.node;
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

window.hierarchyHandler = new HierarchyHandler();