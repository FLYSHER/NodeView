
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0);

        return true;
    }
});

var EditorScene = cc.Scene.extend({
    ctor: function(){
        this._super();
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
        this.addChild(this._gameNode);
        
        this._inputLabel = new cc.LabelTTF("Please Add File.","Arial", 38);
        this._gameNode.addChild(this._inputLabel);
    },
});

