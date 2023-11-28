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
        this._isDrag                    = false;
        this._dragBeginWorldPt          = cc.p( 0, 0);
        this._dragBeginTargetWorldPos   = cc.p( 0, 0);
        this._currTargetNode            = null;
    },

    initGizmo : function () {
        this.rootNode = new cc.Node();
        this.addChild( this.rootNode );

        this._drawNode = new cc.DrawNode();
        this.rootNode.addChild( this._drawNode );

        this._drawCSizeNode = new cc.DrawNode();
        this.rootNode.addChild( this._drawCSizeNode );

        var LINE_LENGTH = 50;
        var LINE_WIDTH  = 2;
        var LINE_OPACITY = 100;
        var ARROW_LENGTH = 5;
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
        var RECT_SIZE = cc.p( 20, 20 );
        this._drawNode.drawRect( cc.p( 0, 0 ), RECT_SIZE, cc.color( 200, 200, 0, 100), 1, cc.color( 200, 200, 0, 255) );
        this._drawNode.setContentSize( cc.size( RECT_SIZE.x, RECT_SIZE.y ) );

        this.initTouchListener();
    },

    initTouchListener : function() {

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown : function( event ) {
                var pt      = event.getLocation();
                var target  = event.getCurrentTarget();
                var rect    = target.getBoundingBox();
                var worldTM = target.getNodeToWorldTransform();
                var worldRect = cc.rectApplyAffineTransform( rect, worldTM );
                var result  = cc.rectContainsPoint( worldRect, pt );
                result && self.setDrag( true );
                if( result ) {
                    self.setDrag( true );
                    self._dragBeginWorldPt = pt;
                    self.setDragBeginTargetWorldPos();
                }
                return result;
            },
            onMouseMove: function( event ) {
                if( self.isDrag() && self._currTargetNode ) {
                    var diffPos  = self.getDiffPt();
                    var pt2      = cc.pSub( event.getLocation(), diffPos );
                    var localPos = self._currTargetNode.getParent().convertToNodeSpace( pt2 );

                    Genie.ToolController.moveNode( self._currTargetNode, localPos );
                    self.followTarget( self._currTargetNode );
                }
            },
            onMouseUp: function( event ) {
                if( self.isDrag() && self._currTargetNode ) {
                    self.setDrag( false );

                    var pt          = event.getLocation();
                    var diffPos     = self.getDiffPt();
                    var pt2         = cc.pSub( pt, diffPos );

                    var srcLocalPos     = self._currTargetNode.getParent().convertToNodeSpace( self.getDragBeginTargetWorldPos() );
                    var destLocalPos    = self._currTargetNode.getParent().convertToNodeSpace( pt2 );

                    Genie.ToolController.execute( new Genie.Command.Transform( self._currTargetNode, {
                        strProp : 'position',
                        src : srcLocalPos,
                        dest: destLocalPos
                    } ) );
                }
            },

        }, this._drawNode );
    },

    refreshContentSize : function( node ) {
        this._drawCSizeNode.clear();

        var c_size  = node.getContentSize();
        var apps    = node.getAnchorPointInPoints();
        var origin  = cc.p( 0, 0 );
        var dest    = cc.p( c_size.width, c_size.height );

        origin  = cc.pSub( origin, apps );
        dest    = cc.pSub( dest, apps );
        this._drawCSizeNode.drawRect( origin, dest, cc.color( 0, 0, 0, 0), 2, cc.color( 200, 200,0, 200 ) );
    },

    setTargetNode : function( node ) {
        if( this._currTargetNode === node ) {
            cc.log("GizmoNode.setTargetNode > same node!" );
            return;
        }

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

        this._currTargetNode = node;
    },

    setDrag : function( drag ) {
        this._isDrag = drag;
    },

    isDrag : function() {
        return this._isDrag;
    },

    getDragBeginWorldPt : function() {
        return this._dragBeginWorldPt;
    },

    setDragBeginTargetWorldPos : function() {
        var worldPos,
            targetNode = this._currTargetNode;

        if( targetNode ) {
            if( targetNode instanceof ccui.Widget ) {
                worldPos = targetNode.getWorldPosition();
            }
            else {
                var parent = targetNode.getParent();
                parent = !!parent ? parent : targetNode;
                worldPos = parent.convertToWorldSpace( targetNode.getPosition() );
            }

            this._dragBeginTargetWorldPos = worldPos;
        }
    },

    getDragBeginTargetWorldPos : function() {
        return this._dragBeginTargetWorldPos;
    },

    getDiffPt : function() {
        return cc.pSub( this._dragBeginWorldPt, this._dragBeginTargetWorldPos );
    },

    followTarget : function( targetNode ) {
        var worldPos = Genie.Utils.getNodeWorldPosition( targetNode );
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
        Genie.gizmoNode = this._gizmoNode;
    },

    initProperty : function() {
        this._targetNode = null;
    },

    onEnter : function() {
        this._super();
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

        var originScale = this._targetNode.getScale();
        var targetScale = originScale * 1.2;
        this._targetNode.runAction( cc.sequence(
            cc.scaleTo( 0.1, targetScale ),
            cc.scaleTo( 0.1, originScale )
        ));
    },


});