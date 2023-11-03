/**
 *
 */
var Gizmo = cc.Node.extend({
    ctor : function() {
        this.initProperty();
        this._super();
        this.initGizmo();
    },

    initProperty : function() {
        this._isDrag        = false;
        this._dragStartPt   = cc.p( 0, 0 );
        this._targetNodePtAtDragStart = cc.p( 0, 0 );
        this._touchComp     = null;
    },

    initGizmo : function () {
        this.rootNode = new cc.Node();
        this.addChild( this.rootNode );

        this._drawNode = new cc.DrawNode();
        this.rootNode.addChild( this._drawNode );

        this._drawCSizeNode = new cc.DrawNode();
        this.rootNode.addChild( this._drawCSizeNode );

        var LINE_LENGTH = 80;
        var LINE_WIDTH  = 2;
        var LINE_OPACITY = 100;
        var ARROW_LENGTH = 10;
        var ARROW_COLOR_X = cc.color( 255, 0, 0, LINE_OPACITY );
        var ARROW_COLOR_Y = cc.color( 0, 255, 0, LINE_OPACITY );


        // 기즈모
        this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( LINE_LENGTH, 0 ), LINE_WIDTH, ARROW_COLOR_X );
        this._drawNode.drawSegment( cc.p( LINE_LENGTH,0 ), cc.p( LINE_LENGTH - ARROW_LENGTH, ARROW_LENGTH ), LINE_WIDTH, ARROW_COLOR_X );
        this._drawNode.drawSegment( cc.p( LINE_LENGTH,0 ), cc.p( LINE_LENGTH - ARROW_LENGTH, -ARROW_LENGTH ), LINE_WIDTH, ARROW_COLOR_X );

        this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( 0, LINE_LENGTH ), LINE_WIDTH, cc.color( 0, 255,0,LINE_OPACITY) );
        this._drawNode.drawSegment( cc.p( 0,LINE_LENGTH ), cc.p( ARROW_LENGTH, LINE_LENGTH - ARROW_LENGTH ), LINE_WIDTH, ARROW_COLOR_Y );
        this._drawNode.drawSegment( cc.p( 0,LINE_LENGTH ), cc.p( -ARROW_LENGTH, LINE_LENGTH - ARROW_LENGTH ), LINE_WIDTH, ARROW_COLOR_Y );

        this._drawNode.drawDot( cc.p( 0, 0), 2, cc.color( 200, 200, 200, 200) );

        // 터치 영역
        var RECT_SIZE = cc.p( 30, 30 );
        this._drawNode.drawRect( cc.p( 0, 0 ), RECT_SIZE, cc.color( 200, 200, 0, 100), 1, cc.color( 200, 200, 0, 255) );

        this._drawNode.setContentSize( cc.size( RECT_SIZE.x, RECT_SIZE.y ) );


        var touchComp = new GST.Component.Touch();
        this._drawNode.addComponent( touchComp );

        var self = this;
        touchComp.onTriggerEvent = function(touchEventName , pt) {
            if (touchEventName !== "move" && touchComp._owner)
                cc.log("RockN.Component.SpriteButton event triggered :" + touchEventName + " by " + this._owner.getName());

            switch (touchEventName)
            {
                case "normal": {

                }break;
                case "over": {

                }break;
                case "up": {
                    cc.log("up");
                }break;
                case "down": {
                    self.setDrag(true);
                    self.setActiveTouchComp( false );
                    self._dragStartPt = pt;
                    self._targetNodePtAtDragStart = self.getPosition();
                }break;
                case "click": {
                    cc.log("click");
                }break;
                case "move": {
                    cc.log("move");
                }break;``
            }
        }

        this._touchComp = touchComp;
    },

    refreshContentSize : function( node ) {
        this._drawCSizeNode.clear();

        var c_size  = node.getContentSize();
        var apps    = node.getAnchorPointInPoints();
        var origin  = cc.p( 0, 0 );
        var dest    = cc.p( c_size.width, c_size.height );

        origin  = cc.pSub( origin, apps );
        dest    = cc.pSub( dest, apps );
        this._drawCSizeNode.drawRect( origin, dest, cc.color( 0, 0, 0, 0), 2, cc.color( 0, 100,100, 200 ) );
    },

    setTargetNode : function( node ) {
        var worldPos;
        if( node instanceof ccui.Widget ) {
            worldPos = node.getWorldPosition();
        }
        else {
            var parent = node.getParent();
            parent = !!parent ? parent : node;
            worldPos = parent.convertToWorldSpace( node.getPosition() );
        }

        this.setPosition( worldPos );
        this.refreshContentSize( node );

        this._targetNodePtAtDragStart = worldPos;
    },

    setDrag : function( drag ) {
        this._isDrag = drag;
    },

    isDrag : function() {
        return this._isDrag;
    },

    getDragStartPt : function() {
        return this._dragStartPt;
    },

    getDiffPt : function() {
        return cc.pSub( this._dragStartPt, this._targetNodePtAtDragStart );
    },

    setActiveTouchComp : function( active ) {
        this._touchComp && this._touchComp.setEnabled( active );
    },

    followTarget : function( targetNode ) {
        var worldPos = GST.Utils.getNodeWorldPosition( targetNode );
        this.setPosition( worldPos );
    },

});

var GizmoLayer = cc.LayerColor.extend({
    ctor : function() {
        this.initProperty();
        this._super( cc.color( 255, 0, 0, 50 ));

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );

        this._gizmoNode = new Gizmo();
        this._gizmoNode.setPosition( 0, 0 );
        this.addChild( this._gizmoNode);
        this._gizmoNode.setVisible( false );
    },

    initProperty : function() {
        this._targetNode = null;
    },

    initTouchComponent : function() {
        var touchComp = new GST.Component.Touch();
        this.addComponent( touchComp );

        var self = this;
        touchComp.onTriggerEvent = function(touchEventName , pt) {
            if (touchEventName !== "move" && touchComp._owner)
                cc.log("RockN.Component.SpriteButton event triggered :" + touchEventName + " by " + this._owner.getName());

            switch (touchEventName)
            {
                case "normal": {
                    self._targetNode && self._gizmoNode.setDrag( false );
                    self._gizmoNode.setActiveTouchComp( true );
                }break;
                case "over": {

                }break;
                case "up": {
                    self._targetNode && self._gizmoNode.setDrag( false );
                    self._gizmoNode.setActiveTouchComp( true );
                    cc.log("up");
                }break;
                case "down": {
                    cc.log("down");
                }break;
                case "click": {
                    cc.log("click");
                }break;
                case "move": {
                    if( self._targetNode && self._gizmoNode.isDrag() ) {
                        // var targetWorldPos  = self._targetNode.getWorldPosition();
                        // var dragStartPt     = self._gizmoNode.getDragStartPt();
                        // var diffPos         = cc.pSub( dragStartPt, targetWorldPos );
                        var diffPos = self._gizmoNode.getDiffPt();
                        var pt2 = cc.pSub( pt, diffPos );
                        var localPos = self._targetNode.getParent().convertToNodeSpace( pt2 );

                        cc.log(" pt , diffPos, pt2 ", pt, diffPos, pt2 );

                        self._targetNode.setPosition( localPos );
                        self._gizmoNode.followTarget( self._targetNode );
                    }
                }break;
            }
        }
    },

    onEnter : function() {
        this._super();
        this.initTouchComponent();
        cc.eventManager.addCustomListener("onChangeNodeInHierarchy", this.setTargetNode.bind(this));
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this.setContentSize( size.width, size.height );
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
    },
});