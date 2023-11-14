var PreviewLayer = cc.Layer.extend({
    ctor : function() {
        this._super();
        this.initPreview();

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );
    },

    onEnter : function() {
        this._super();

        cc.eventManager.addCustomListener( "setPreviewSprite", this.setRTSprite.bind(this) );
    },

    onResize : function() {
    },

    initPreview : function() {
        this._spr = new cc.Sprite();
        this._spr.setPosition( Genie.Utils.getScreenCenterPos() );
        this.addChild( this._spr );
    },

    setRTSprite : function( event ) {
        cc.log("*** onEvent **** setSprite ", event );
        var userData = event.getUserData();
        var sprName = userData.name;
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( sprName );
        if( spriteFrame ) {
            // var sprite = new cc.Sprite();
            // sprite.setSpriteFrame( spriteFrame );
            this._spr.setSpriteFrame(spriteFrame);
        }
        else {

        }
    },

});