var Genie = Genie || {};

Genie.PreviewNode = cc.Node.extend({
    ctor : function() {
        this.initProperties();
        this._super();
        this.setName("PreviewNode");

        this.initRenderTexture();
    },

    initProperties : function () {
        this._root    = null;
        this._spriteNode    = null;
        this._rtSize        = cc.size( 400, 300 );
        this._lockRTScale   = false;
        this._frameNode     = null;
    },

    onEnter : function() {
        this._super();
        cc.eventManager.addCustomListener( "onSetPreviewSprite", this.renderToRenderTexture.bind(this) );
    },

    initRenderTexture : function() {
        this._root = new cc.Node();
        this.addChild( this._root );
        this._root.setContentSize(this._rtSize);

        this._spriteNode = new cc.Sprite();
        this._root.addChild( this._spriteNode );

        // 렌더텍스쳐 프레임
        var origin  = cc.p( -this._rtSize.width/2, -this._rtSize.height/2 ),
            dest    = cc.p( this._rtSize.width/2, this._rtSize.height/2 );
        this._frameNode = new cc.DrawNode();
        this._frameNode.drawRect( origin, dest, cc.color( 0, 0, 0, 0 ), 2, cc.color( 255, 100, 0 ) );
        this._root.addChild( this._frameNode );

        this._initTouchComponent();

        this.reposition( 1.0 );
    },

    _initTouchComponent : function() {
        // 렌더텍스쳐 컨텐트 사이즈는 생성시 파라미터에 의해 세팅되지 않음.
        var touchComp = new Genie.Component.Touch();
        touchComp.setCustomHitRectCenterOffsetPt( cc.p( -this._rtSize.width/2,-this._rtSize.height/2 ) );
        touchComp.setCustomHitRectSize( this._rtSize.width, this._rtSize.height );
        this._root.addComponent( touchComp );

        touchComp.onTriggerEvent = function( touchEventName, pt ) {
            switch ( touchEventName ) {
                case "click":
                    this.playPreviewSize();
                    break;
            }
        }.bind(this);
    },

    _adjustSpriteSize   : function( resType ) {
        if( resType === Genie.ResType.SPRITE
            || resType === Genie.ResType.TEXTURE) {
            var rate_w = this._rtSize.width/ this._spriteNode.getContentSize().width;
            var rate_h = this._rtSize.height/ this._spriteNode.getContentSize().height;
            var loc_scale = Math.min( rate_w, rate_h );
            this._spriteNode.setScale(loc_scale);
        }
    },

    playPreviewSize : function() {
        if( this._lockRTScale === true ) {
            return;
        }

        var currScale = this._root.getScale();
        var targetScale;
        if( currScale > 1.0 ) {
            targetScale = 1.0;
        }
        else {
            targetScale = 3.0;
        }

        var targetPos = cc.p( 0, 0 );
        var preview_margin = cc.p( 10, 10 );
        targetPos.x = cc.winSize.width - (this._rtSize.width * targetScale)/2  - preview_margin.x;
        targetPos.y = (this._rtSize.height * targetScale )/2 +  preview_margin.y;

        var self = this,
            dl = 0.2;

        this._root.runAction( cc.sequence(
            cc.callFunc( function () { self._lockRTScale = true; }, this ),
            cc.spawn(
                cc.scaleTo( dl, targetScale ).easing( cc.easeSineInOut() ),
                cc.moveTo( dl, targetPos ).easing( cc.easeSineInOut() )
            ),
            cc.callFunc( function () { self._lockRTScale = false; }, this )
        ));
    },

    renderToRenderTexture : function( event ) {
        var userData = event.getUserData();
        var resName  = userData.name;
        var resType  = userData.resType;

        var validCheck;
        switch ( resType ) {
            case Genie.ResType.SPRITE:
                var spriteFrame = cc.spriteFrameCache.getSpriteFrame( resName );
                spriteFrame && this._spriteNode.setSpriteFrame( spriteFrame );
                validCheck = !!spriteFrame;
                break;
            case Genie.ResType.TEXTURE:
                var tex = cc.textureCache.getTextureForKey( 'image/' + resName);
                tex && this._spriteNode.initWithTexture( tex )
                validCheck = !!tex;
                break;
            default:
                validCheck = false;
                break;
        }

        if( validCheck ) {
            this._adjustSpriteSize( resType );
        }

    },

    reposition : function( scale ) {
        var targetScale = scale || 1.0;
        var preview_margin = cc.p( 10, 10 );
        var loc_x = cc.winSize.width - (this._rtSize.width * targetScale)/2  - preview_margin.x;
        var loc_y = (this._rtSize.height * targetScale )/2 +  preview_margin.y;
        this._root.setPosition(cc.p( loc_x, loc_y ) );
        this._spriteNode.setPosition(cc.p(0,0));
    },

    onResize : function() {
        var loc_scale = this._root.getScale();
        this.reposition( loc_scale );
    },


});