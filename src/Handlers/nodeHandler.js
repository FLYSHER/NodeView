/**
 * @param node {cc.Node}
 * @constructor
 */
function NodeHandler(node){
    this._node = node;
}

// Getter
NodeHandler.prototype.getNode = function(){
    return this._node;
};

// Setter
/**
 * @param pos {cc.Point}
 */
NodeHandler.prototype.setPosition = function(pos){
    this._node.setPosition(pos);
};

/**
 * @param point {cc.Point}
 */
NodeHandler.prototype.setAnchorPoint = function(point){
    this._node.setAnchorPoint(point);
};
