var EditorScene = cc.Scene.extend({
    ctor: function(){
        this._super();
        this.setName("Scene");
        this._initVars();
        this._init();
    },
    _initVars: function(){
        /** @type {cc.LabelTTF} */
        this._inputLabel = null;
        
        /** @type {cc.Point} */
        this.CENTER_POINT = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);
        
        /** @type {cc.Node} */
        this._gameNode = null;
    },
    _init: function(){
        this._gameNode = new cc.Node();
        this._gameNode.setPosition(this.CENTER_POINT);
        this._gameNode.setName("GameNode");
        this.addChild(this._gameNode);
        
        this._inputLabel = new cc.LabelTTF("Please Add File.","Arial", 38);
        this._inputLabel.setName("InputLabel");
        this._gameNode.addChild(this._inputLabel);
        
        this._testNode = new cc.Node();
        this.addChild(this._testNode);
        this._testNode.setName("TestNode");
    },
    
    onEnterTransitionDidFinish: function(){
        window.hierarchyHandler.drawHierarchy(this);
    },
});

