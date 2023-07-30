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
        this._spr.setPosition( 200, 200 );
        this.addChild( this._spr );
        // this._rtt_size = cc.size( 200, 200 );
        // this._rtt = new cc.RenderTexture( this._rtt_size.width, this._rtt_size.height );
        // this._rtt.setAnchorPoint( 0.5, 0.5 );
        // this._rtt.setPosition( this._layerSize.width/2, this._layerSize.height/2 );
        //
        // this._rtt.sprite.setAnchorPoint( 0.5, 0.5 );
        //
        // this.addChild( this._rtt, 100 );
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