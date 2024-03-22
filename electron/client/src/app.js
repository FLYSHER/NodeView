// const { sentryRendererInit } = require('../../sentryRenderer');
// sentryRendererInit();

var HelloWorldLayer = cc.LayerColor.extend({
    _sprite:null,
    _isMp3 : 0,
    _helloLabel : null,
    _soundName : null,

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
        this._helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this._helloLabel.x = size.width / 2;
        this._helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(this._helloLabel, 5);

        // add "HelloWorld" splash screen"
        this._sprite = new cc.Sprite(res.HelloWorld_png);
        this._sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.createTouchListener(this);
        this.addChild(this._sprite, 0);


        this.setContentSize(size);
        this.setColor(cc.color(255, 100, 100));


        return true;
    },
    onExit: function () {
        this._super();

        cc.audioEngine.end();
    },

    _indexCount : 0,
    _time : 0,
    update :function (dt) {
        if (!this._soundName || this._soundName.length === 0)
            return;

        this._time +=dt;
        if(this._time > 0.25 * (this._indexCount +1)) {
            cc.audioEngine.playEffect(this._soundName[this._indexCount], false);
            this._indexCount++;
        }

        if(this._indexCount >= this._soundName.length) {
            this._indexCount = 0;
            this._time = 0;
        }
    },

    changeSound : function () {
        this._isMp3  += 1;
        if( this._isMp3 > 5)
            this._isMp3 = 0;


        this._indexCount = 0;
        this.unscheduleUpdate();
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
        cc.audioEngine.end();
        if(this._isMp3 === 0 || this._isMp3 === 2 || this._isMp3 === 4) {
            this._helloLabel.setString("stop");
            this._soundName = [];
        }
        else if(this._isMp3 === 1) {
            cc.audioEngine.playMusic(res.Sound_BGM,true);
            this._helloLabel.setString("Mp3 play");
            this._soundName = [];
            this._soundName[0] = res.Sound_MP3;
            this._soundName[1] = res.Sound1_MP3;
            this._soundName[2] = res.Sound2_MP3;
            this._soundName[3] = res.Sound3_MP3;
            this._soundName[4] = res.Sound4_MP3;
            this._soundName[5] = res.Sound5_MP3;
            this._soundName[6] = res.Sound6_MP3;
            this.scheduleUpdate();
        }
        else if(this._isMp3 ===3){
            cc.audioEngine.playMusic(res.Sound_BGM,true);
            this._helloLabel.setString("wav play");
            this._soundName = [];
            this._soundName[0] = res.Sound_WAV;
            // this._soundName[1] = res.Sound1_WAV;
            // this._soundName[2] = res.Sound2_WAV;
            // this._soundName[3] = res.Sound3_WAV;
            // this._soundName[4] = res.Sound4_WAV;
            // this._soundName[5] = res.Sound5_WAV;
            // this._soundName[6] = res.Sound6_WAV;
            this.scheduleUpdate();
        }
        else if(this._isMp3 ===5){
            cc.audioEngine.playMusic(res.Sound_BGM,true);
            this._helloLabel.setString("only BGM");
            this._soundName = [];
        }
    },

    checkHit :function(position) {
        var locationInNode = this._sprite.convertToNodeSpace(position);
        var s = this._sprite.getContentSize();
        var rect = cc.rect(0, 0, s.width, s.height);
        if (cc.rectContainsPoint(rect, locationInNode)) {
            cc.log("[CHECK] Click");
            return true;
        }
        return false;

    },

    createTouchListener : function(self) {
        if( 'touches' in cc.sys.capabilities )
        {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                // hitSuccess: false,
                onTouchBegan: function (touch, event) {
                    cc.log("onTouchBegan:");
                    return self.checkHit(touch.getLocation());
                },
                onTouchEnded: function (touch, event) {
                    cc.log("onTouchEnded:");
                    self.changeSound();
                }
            });
            cc.eventManager.addListener(self._listener, self);
            cc.log("Touches");
        }
        else  if( 'mouse' in cc.sys.capabilities )
        {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                down : false,
                onMouseDown: function(event){
                    this.down = self.checkHit(event.getLocation());
                },
                onMouseUp: function(event){
                    if( this.down !== true || self.checkHit(event.getLocation())===false)
                        return;

                    self.changeSound();
                    this.down = false;
                }
            }, this);
            cc.eventManager.addListener(self._listener, self);
            cc.log("mouse");
        }
        else
        {
            cc.log("Noting EventListener");
        }
    },

});

var ExtendArmature = ccs.Armature.extend({

    setVisible : function (visible) {
        this._super(visible);
    },

    update: function(dt) {
        this._super(dt);
        //cc.log("[CHECK] ExtendArmature update dt ", this.isVisible(), cc.director.getTotalFrames());
    }
});


var HelloWorldLayer2 = cc.LayerColor.extend({
    _sprite     : null,
    _armature   : null,
    ctor:function () {
        this._array = [];
        this._bUpdate = false;
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
        this._helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this._helloLabel.x = size.width / 2;
        this._helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(this._helloLabel, 5);

        // add "HelloWorld" splash screen"
        this._sprite = new cc.Sprite(res.HelloWorld_png);
        this._sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this._sprite, 0);


        this.setContentSize(size);
        this.setColor(cc.color(255, 100, 100));

        ccs.armatureDataManager.addArmatureFileInfo( res.PU_lobbyAdAR_mb);


        for(var n = 0; n < 500; n++) {
            this._armature = new PoolArmature('PU_lobbyAdAR_mb');
            this.addChild(this._armature);
            this._armature.attr({
                x: size.width / 2,
                y: size.height / 2
            });
            this._armature.getAnimation().playWithIndex(0, -1, true);
            this._armature.setVisible(false);
        }

        //this.createTouchListener(this);

        return true;
    },

    onEnter : function () {
        this._super();

        // for(var n = 0; n < 6000; n ++)
        // {
        //     this._array[n] = new cc.Node();
        //     this.addChild(this._array[n]);
        // }

    },

    checkHit :function(position) {
        // var locationInNode = this._sprite.convertToNodeSpace(position);
        // var s = this._sprite.getContentSize();
        // var rect = cc.rect(0, 0, s.width, s.height);
        // if (cc.rectContainsPoint(rect, locationInNode)) {
        //     cc.log("[CHECK] Click");
        //     return true;
        // }
        //return false;
        return true;
    },

    createTouchListener : function(self) {
        if( 'touches' in cc.sys.capabilities ) {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                // hitSuccess: false,
                onTouchBegan: function (touch, event) {
                    cc.log("onTouchBegan:");
                    return self.checkHit(touch.getLocation());
                },
                onTouchEnded: function (touch, event) {
                    cc.log("onTouchEnded:");
                    //self._armature.setVisible(!self._armature.isVisible());

                    for(var n = 0; n < self._array.length; n ++)
                    {
                        if(self._bUpdate) {
                            self._array[n].unscheduleUpdate();
                            self._helloLabel = "unscheduleUpdate";
                        }else {
                            self._array[n].scheduleUpdate();
                            self._helloLabel = "scheduleUpdate";
                        }

                    }
                    self._bUpdate = !self._bUpdate;
                    self._sprite.setVisible(!self._bUpdate);

                }
            });
            cc.eventManager.addListener(self._listener, self);
            cc.log("Touches");
        }
        else  if( 'mouse' in cc.sys.capabilities ) {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                down : false,
                onMouseDown: function(event){
                    this.down = self.checkHit(event.getLocation());
                },
                onMouseUp: function(event){
                    if( this.down !== true || self.checkHit(event.getLocation())===false)
                        return;

                    //self._armature.setVisible(!self._armature.isVisible());
                    this.down = false;

                    for(var n = 0; n < self._array.length; n ++)
                    {
                        if(self._bUpdate) {
                            self._array[n].unscheduleUpdate();
                            self._helloLabel = "unscheduleUpdate";
                        }
                        else {
                            self._array[n].scheduleUpdate();
                            self._helloLabel = "scheduleUpdate";
                        }

                    }
                    self._sprite.setVisible(!self._bUpdate);
                    self._bUpdate = !self._bUpdate;

                }
            }, this);
            cc.eventManager.addListener(self._listener, self);
            cc.log("mouse");
        }
        else {
            cc.log("Noting EventListener");
        }
    }
});

//생성자
var Gadget = function () {};

//스택틱 메서드
Gadget.isShiny = function () {
    return "you bet";
};

//region 만약 이 메소드를 스택틱 처럼 쓰고 또는 객체 메소드처럼 같이 쓰고 싶다면 [this instanceof Gadget]로 판단해서 분기를 나누자
Gadget.isShiny2 = function() {
    var msg = "you bet";
    if(this instanceof Gadget){
        //다음은 스태틱하지 않은 방식으로 호출되었을때만 동작
        msg += ", it costs $" + this.price + '!';
    }
    return msg;
};
Gadget.prototype.isShiny2 = function() {
    return Gadget.isShiny2.call(this);
};
//endregion

//프로토타입에 일반적인 함수를 추가
Gadget.prototype.setPrice = function (price) {
    this.price = price;
    cc.log("[CHECK] this.price :", this.price);
};

Gadget.prototype.p1 = 500;


function test(initCount){

    //스택틱 메서드를 호출
    Gadget.isShiny(); // "you bet"

    //Gadget.setPrice(100); //오류다. 프로토타입에 정의가 되어있기때문에 typeof Gadget.Price는 사용할수 없다. new Gadget로 객체 선언시 사용가능 ;

    //인스턴스를 생성한 후 메서드를 호출한다
    var iphone = new Gadget();
    iphone.setPrice(500);
    //iphone.isShiny(); //오류다. 프로토타입에 정의가 안되어있으면 할당시(new Gadget()) function 사용할수 없다 typeof iphone.isShiny; // "undefined";

    var iphone2 = new Gadget();
    iphone2.setPrice(10000);

    cc.log("[CHECK]", Gadget.isShiny2());  //[CHECK] you bet
    cc.log("[CHECK]", iphone.isShiny2());  //[CHECK] you bet, it costs $500!
    cc.log("[CHECK]", iphone2.isShiny2()); //[CHECK] you bet, it costs $10000!
    cc.log("[CHECK]", iphone.p1);   //500; //객체의 프로토타입 값을 가져와 출력 p1안에 또 생성되지는 않는다
    cc.log("[CHECK]", iphone2.p1);  //500; //객체의 프로토타입 값을 가져와 출력 p1안에 또 생성되지는 않는다

    iphone.p1 = 100;  //__proto__ (prototype에 있는걸 객체화 한)에 p1는 500이고 iphone객체에 p1이 생성되고 100이 입력된다.
    iphone2.p1 = 200; //__proto__(prototype에 있는걸 객체화 한)에 p1는 500이고 iphone2객체에 p1이 생성되고 200이 입력된다.
    //cc.log("[CHECK]", Gadget.p1);   //undefined;
    cc.log("[CHECK]", iphone.p1);   //100;
    cc.log("[CHECK]", iphone2.p1);  //200;


    //iphone.prototype.p1 = 300; // Uncaught TypeError: Cannot set property 'p1' of undefined 오류
    //iphone2.prototype.p1 = 400; // Uncaught TypeError: Cannot set property 'p1' of undefined 오류
    cc.log("[CHECK]", Gadget.prototype.p1);  //500 출력
    //cc.log("[CHECK]", iphone.prototype.p1);  // Uncaught TypeError: Cannot read property 'p1' of undefined
    //cc.log("[CHECK]", iphone2.prototype.p1); // Uncaught TypeError: Cannot read property 'p1' of undefined

    iphone.__proto__.p1 = 100;
    iphone2.__proto__.p1 = 200;
    cc.log("[CHECK]", iphone.__proto__.p1);  //200 __proto__ 안의 p1는 공유가되기때문에 가장 마지막에 접근해서 값이 바뀐 iphone2.__proto__.p1 값이 iphone.__proto__.p1에도 적용된다
    cc.log("[CHECK]", iphone2.__proto__.p1);  //200


    var _initCount = (initCount) || 15;
    cc.log("[CHECK]", _initCount);
}

///////////////

var HelloWorldLayer3 = cc.LayerColor.extend({
    _sprite     : null,
    _armature   : null,
    ctor:function () {
        this._array = [];
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
        this._helloLabel = new cc.LabelTTF("Hello World", "Arial", 38);
        // position the label on the center of the screen
        this._helloLabel.x = size.width / 2;
        this._helloLabel.y = size.height / 2 + 200;
        // add the label as a child to this layer
        this.addChild(this._helloLabel, 5);

        // add "HelloWorld" splash screen"
        this._sprite = new cc.Sprite(res.HelloWorld_png);
        this._sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this._sprite, 0);


        this.setContentSize(size);
        this.setColor(cc.color(255, 100, 100));

        ccs.armatureDataManager.addArmatureFileInfo( res.PU_lobbyAdAR_mb);


        // for(var n = 0; n < 500; n++) {
        //     this._armature = new ccs.Armature('PU_lobbyAdAR_mb');
        //     this.addChild(this._armature);
        //     this._armature.attr({
        //         x: size.width / 2,
        //         y: size.height / 2
        //     });
        //     this._armature.getAnimation().playWithIndex(0);
        //     this._armature.setVisible(false);
        // }

        //this.createTouchListener(this);

        return true;
    },

    onEnter : function () {
        this._super();
    },

    checkHit :function(position) {
        // var locationInNode = this._sprite.convertToNodeSpace(position);
        // var s = this._sprite.getContentSize();
        // var rect = cc.rect(0, 0, s.width, s.height);
        // if (cc.rectContainsPoint(rect, locationInNode)) {
        //     cc.log("[CHECK] Click");
        //     return true;
        // }
        //return false;
        return true;
    },

    createTouchListener : function(self) {
        if( 'touches' in cc.sys.capabilities ) {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches: true,
                // hitSuccess: false,
                onTouchBegan: function (touch, event) {
                    cc.log("onTouchBegan:");
                    return self.checkHit(touch.getLocation());
                },
                onTouchEnded: function (touch, event) {
                    cc.log("onTouchEnded:");
                    self._sprite.setVisible(!self._bUpdate);

                }
            });
            cc.eventManager.addListener(self._listener, self);
            cc.log("Touches");
        }
        else  if( 'mouse' in cc.sys.capabilities ) {
            self._listener = cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                down : false,
                onMouseDown: function(event){
                    this.down = self.checkHit(event.getLocation());
                },
                onMouseUp: function(event){
                    if( this.down !== true || self.checkHit(event.getLocation())===false)
                        return;
                    this.down = false;
                }
            }, this);
            cc.eventManager.addListener(self._listener, self);
            cc.log("mouse");
        }
        else {
            cc.log("Noting EventListener");
        }
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer3();
        this.addChild(layer);

    }
});



