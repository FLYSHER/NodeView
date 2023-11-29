/**
 *
 */
var GizmoLayer = cc.LayerColor.extend({
    ctor : function() {
        this.initProperty();
        this._super( cc.color( 255, 0, 0, 50 ));

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;


        this._gizmoNode = new Gizmo();
        this._gizmoNode.setPosition( 0, 0 );
        this.addChild( this._gizmoNode);
        this._gizmoNode.setVisible( false );
        Genie.gizmoNode = this._gizmoNode;

        this.initPreviewArea();

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );
    },

    initProperty : function() {
        this._targetNode = null;
        this._rtSize     = cc.size( 300, 200 );
    },

    onEnter : function() {
        this._super();
        cc.eventManager.addCustomListener("onChangeNodeInHierarchy", this.setTargetNode.bind(this));
        cc.eventManager.addCustomListener( "onSetPreviewSprite", this.setPreviewSprite.bind(this) );
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this.setContentSize( size.width, size.height );
        this.repositionPreview();
    },

    initPreviewArea : function() {
        this._rt = new cc.RenderTexture( this._rtSize.width, this._rtSize.height, cc.Texture2D.PIXEL_FORMAT_RGBA8888, gl.DEPTH_STENCIL );
        this._rt.setAnchorPoint( 1.0, 0.0 );
        this.addChild( this._rt );

        this._spr = new cc.Sprite();
        this._spr.setPosition( Genie.Utils.getScreenCenterPos() );
    },

    repositionPreview : function() {
        var preview_margin = cc.p( 10, 10 );

        this._rt.x = cc.winSize.width - this._rtSize.width/2 - preview_margin.x;
        this._rt.y = this._rtSize.height/2 +  preview_margin.y;
    },

    setPreviewSprite : function( event ) {
        cc.log("*** onEvent **** setSprite ", event );
        var userData = event.getUserData();
        var sprName = userData.name;
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( sprName );
        if( spriteFrame ) {
            this._rt.beginWithClear( 80, 80, 80 );
            this._spr.setSpriteFrame(spriteFrame);
            this._adjustSpriteSize();
            this._spr.visit();
            this._rt.end();
        }
        else {

        }
    },

    _adjustSpriteSize : function() {
        var w = this._spr.getContentSize().width,
            h = this._spr.getContentSize().height;

        var rate_w = parseFloat(cc.winSize.width / w).toFixed(1),
            rate_h = parseFloat(cc.winSize.height / h).toFixed(1);

        var loc_scale = Math.min( rate_w, rate_h );
        this._spr.setScale( loc_scale );
    },

    setTargetNode : function( event ) {
        var userData  = event.getUserData();
        this._gizmoNode.setVisible( false );
        if( !userData || !userData.node ) {
            cc.error( "invalid userData : ", userData );
            return;
        }
        var targetNode = userData.node;
        if( this._targetNode === targetNode ) {
            cc.warn( "same node" );
            return;
        }

        this._gizmoNode.setVisible( true );
        this._targetNode = targetNode;
        this._gizmoNode.setTargetNode( targetNode );

        var originScale = this._targetNode.getScale();
        var targetScale = originScale * 1.2;
        this._targetNode.runAction( cc.sequence(
            cc.scaleTo( 0.1, targetScale ),
            cc.scaleTo( 0.1, originScale )
        ));
    },
});