var Genie = Genie || {};

Genie.GizmoNode = Genie.HierarchyProtectNode.extend({
    ctor : function() {
        this.initProperty();
        this._super();
        this.initGizmo();
    },

    initProperty : function() {

        this.axisOptions = {
            line_length : 100,
            axis_width  : 4,
            arrow_length: 30,
            color_axisX : cc.color( 255, 0, 0, 100 ),
            color_axisY : cc.color( 0, 255, 0, 100 )
        };

        this.rectOptions = {
            size        : cc.size( 40, 40 ),
            width       : 1,
            fillColor   : cc.color( 200, 200, 0, 100),
            lineColor   : cc.color( 200, 200, 0, 255)
        };

        this.bbOptions = {
            width       : 5,
            fillColor   : cc.color( 255,255,255, 0 ),
            lineColor   : cc.color( 200, 200, 0, 150 )
        }

        this.rootNode       = null;
        this.axisDrawNode   = null;
        this.rectDrawNode   = null;
        this.bbDrawNode     = null;

        this.targetNode     = null;
    },

    onEnter : function() {
        this._initTouchComponent();
        this._super();
    },

    onExit : function() {
        this.targetNode     = null;
        this._super();
    },

    initGizmo : function () {
        this.rootNode = new cc.Node();
        this.addChild( this.rootNode );

        this.axisDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.axisDrawNode );

        this.rectDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.rectDrawNode );

        this.bbDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.bbDrawNode );
    },

    drawGizmo : function() {
        this._drawAxis();
        this._drawControlRect();
        this._drawBoundingBox();
    },

    _drawAxis : function() {
        this.axisDrawNode.clear();

        var LINE_LENGTH     = this.axisOptions.line_length,
            ARROW_LENGTH    = this.axisOptions.arrow_length,
            AXIS_WIDTH      = this.axisOptions.axis_width;

        // axis-x
        var COLOR = this.axisOptions.color_axisX;
        this.axisDrawNode.drawSegment( cc.p( 0,0 ), cc.p( LINE_LENGTH, 0 ), AXIS_WIDTH, COLOR );

        // arrow-x
        var triangle = [
            cc.p( LINE_LENGTH, -ARROW_LENGTH/2),
            cc.p( LINE_LENGTH, ARROW_LENGTH/2),
            cc.p( LINE_LENGTH + ARROW_LENGTH, 0 )
        ]
        this.axisDrawNode.drawPoly( triangle, COLOR, 1, COLOR );


        // axis-y
        COLOR = this.axisOptions.color_axisY;
        this.axisDrawNode.drawSegment( cc.p( 0,0 ), cc.p( 0, LINE_LENGTH ), AXIS_WIDTH, COLOR );

        // arrow-y
        triangle = [
            cc.p( -ARROW_LENGTH/2, LINE_LENGTH ),
            cc.p( ARROW_LENGTH/2, LINE_LENGTH ),
            cc.p( 0, LINE_LENGTH + ARROW_LENGTH )
        ]
        this.axisDrawNode.drawPoly( triangle, COLOR, 1, COLOR );

        this.axisDrawNode.drawDot( cc.p( 0, 0), 2, cc.color( 200, 200, 200, 200) );
    },

    _drawControlRect : function() {
        this.rectDrawNode.clear();

        var RECT_SIZE = cc.p( this.rectOptions.size.width, this.rectOptions.size.height );
        this.rectDrawNode.drawRect( cc.p( 0, 0 ), RECT_SIZE, this.rectOptions.fillColor, this.rectOptions.width, this.rectOptions.lineColor );

    },

    _drawBoundingBox : function() {
        this.bbDrawNode.clear();

        var loc_node = this.targetNode;
        var bb       = loc_node.getBoundingBoxToWorld();

        var trans = this.getParentToNodeTransform();
        bb = cc.rectApplyAffineTransform(bb, trans);
        cc.log("[check] bb  > ", bb );

        var origin  = cc.p( bb.x, bb.y ),
            dest    = cc.p( bb.x + bb.width, bb.y + bb.height );

        this.bbDrawNode.drawRect( origin, dest, this.bbOptions.fillColor, this.bbOptions.width, this.bbOptions.lineColor );
    },

    _initTouchComponent : function() {
        this.rectDrawNode.setContentSize( this.rectOptions.size );
        var touchComp = new Genie.Component.Touch();
        touchComp.onTriggerEvent = this.onMouseEvent.bind( this );

        this.rectDrawNode.addComponent( touchComp );
    },

    onMouseEvent : function( eventName, pt ) {
        var delta, selectNode;
        switch ( eventName ) {
            case 'down':
                cc.log("gizmoNode.down");
                Genie.GizmoController.setDragStart( pt,  Genie.Utils.getNodeWorldPosition(this.targetNode));
                break;
            case 'move':
                if( Genie.GizmoController.isDragGizmoCtrlRect() === true ) {
                    cc.log("gizmoNode.move");
                    delta           = cc.pSub( pt, Genie.GizmoController.getDeltaInTargetPt() );
                    selectNode      = Genie.ToolController.getSelectNode();

                    var localPos    = selectNode.getParent().convertToNodeSpace( delta );

                    // 드레그로 인한 위치 변경은 커맨드 사용하지 않는다.
                    // mainView 값 변경
                    Genie.GizmoController.followTargetNode( selectNode );
                    selectNode.setPosition( localPos );

                    // insperctor 값 변경
                    var transComp = selectNode.getComponent( Genie.ComponentName.TRANSFORM );
                    transComp && transComp.refreshPositionValue( localPos );
                }
                break;
            case 'up':
                cc.log("gizmoNode.up");
                if( Genie.GizmoController.isDragGizmoCtrlRect() === true ) {
                    Genie.GizmoController.setDragEnd();

                    delta           = cc.pSub( pt, Genie.GizmoController.getDeltaInTargetPt() );
                    selectNode      = Genie.ToolController.getSelectNode();

                    var dragStartTargetPt = Genie.GizmoController.getDragStartTargetPt();
                    var srcLocalPos     = selectNode.getParent().convertToNodeSpace( dragStartTargetPt );
                    var destLocalPos    = selectNode.getParent().convertToNodeSpace( delta );

                    var src     = cc.p( Math.round( srcLocalPos.x ), Math.round( srcLocalPos.y ) );
                    var dest    = cc.p( Math.round( destLocalPos.x ), Math.round( destLocalPos.y ) );

                    var moveDelta = cc.pDistance( srcLocalPos, selectNode.getPosition() );
                    if( moveDelta > 1.0 ) {
                        Genie.CommandManager.execute( new Genie.Command.TransformPosition( selectNode, {
                            src     : src,
                            dest    : dest
                        } ) );
                    }
                }
                break;
        }
    },

    setTargetNode : function( node ) {
        if( !node ) {
            return;
        }

        this.targetNode = node;
        this.refreshPosition();
        this.drawGizmo();
    },

    getTargetNode : function() {
        return this.targetNode;
    },

    refreshPosition : function() {
        if( !this.targetNode ) {
            return;
        }

        var worldPos = Genie.Utils.getNodeWorldPosition( this.targetNode );
        var parent   = this.getParent() ? this.getParent() : this;
        var localPos = parent.convertToNodeSpace( worldPos );
        this.setPosition( localPos );
    },

    // initTouchListener : function() {
    //
    //     var self = this;
    //     cc.eventManager.addListener({
    //         event: cc.EventListener.MOUSE,
    //         onMouseDown : function( event ) {
    //             var pt      = event.getLocation();
    //             var target  = event.getCurrentTarget();
    //             var rect    = target.getBoundingBox();
    //             var worldTM = target.getNodeToWorldTransform();
    //             var worldRect = cc.rectApplyAffineTransform( rect, worldTM );
    //             var result  = cc.rectContainsPoint( worldRect, pt );
    //             result && self.setDrag( true );
    //             if( result ) {
    //                 self.setDrag( true );
    //                 self._dragBeginWorldPt = pt;
    //                 self.setDragBeginTargetWorldPos();
    //                 event.stopPropagation();
    //             }
    //             return result;
    //         },
    //         onMouseMove: function( event ) {
    //             if( self.isDrag() && self._currTargetNode ) {
    //                 var diffPos  = self.getDiffPt();
    //                 var pt2      = cc.pSub( event.getLocation(), diffPos );
    //                 var localPos = self._currTargetNode.getParent().convertToNodeSpace( pt2 );
    //
    //                 // mainView 값 변경
    //                 self._currTargetNode.setPosition( localPos );
    //                 self.followTarget( self._currTargetNode );
    //
    //                 // inspector 값 변경
    //                 var transComp = self._currTargetNode.getComponent( Genie.ComponentName.TRANSFORM );
    //                 transComp && transComp.refreshPositionValue( localPos );
    //             }
    //         },
    //         onMouseUp: function( event ) {
    //             if( self.isDrag() && self._currTargetNode ) {
    //                 self.setDrag( false );
    //
    //                 var pt          = event.getLocation();
    //                 var diffPos     = self.getDiffPt();
    //                 var pt2         = cc.pSub( pt, diffPos );
    //
    //                 var srcLocalPos     = self._currTargetNode.getParent().convertToNodeSpace( self.getDragBeginTargetWorldPos() );
    //                 var destLocalPos    = self._currTargetNode.getParent().convertToNodeSpace( pt2 );
    //
    //                 var src     = cc.p( Math.round( srcLocalPos.x ), Math.round( srcLocalPos.y ) );
    //                 var dest    = cc.p( Math.round( destLocalPos.x ), Math.round( destLocalPos.y ) );
    //
    //                 var moveDelta = cc.pDistance( srcLocalPos, self._currTargetNode.getPosition() );
    //                 if( moveDelta > 1.0 ) {
    //                     Genie.CommandManager.execute( new Genie.Command.TransformPosition( self._currTargetNode, {
    //                         src     : src,
    //                         dest    : dest
    //                     } ) );
    //                 }
    //             }
    //         },
    //
    //     }, this._drawNode );
    // },

    refreshContentSize : function( node ) {
        this._drawCSizeNode.clear();

        var c_size  = node.getContentSize();
        var apps    = node.getAnchorPointInPoints();

        var origin  = cc.p( 0, 0 );
        var dest    = cc.p( c_size.width, c_size.height );

        origin  = cc.pSub( origin, apps );
        dest    = cc.pSub( dest, apps );

        if( node.isIgnoreAnchorPointForPosition() ) {
            origin = cc.pAdd( origin, apps );
            dest = cc.pAdd( dest, apps );
        }

        this._drawCSizeNode.drawRect( origin, dest, cc.color( 0, 0, 0, 0), 2, cc.color( 200, 200,0, 200 ) );
    },

    // setTargetNode : function( node ) {
    //     if( this._currTargetNode === node ) {
    //         cc.log("GizmoNode.setTargetNode > same node!" );
    //         return;
    //     }
    //
    //     var worldPos;
    //     if( node instanceof ccui.Widget ) {
    //         worldPos = node.getWorldPosition();
    //     }
    //     else {
    //         var parent = node.getParent();
    //         parent = !!parent ? parent : node;
    //         worldPos = parent.convertToWorldSpace( node.getPosition() );
    //     }
    //
    //     this.setPosition( worldPos );
    //     this.refreshContentSize( node );
    //
    //     this._currTargetNode = node;
    // },

    // setDrag : function( drag ) {
    //     this._isDrag = drag;
    // },
    //
    // isDrag : function() {
    //     return this._isDrag;
    // },
    //
    // getDragBeginWorldPt : function() {
    //     return this._dragBeginWorldPt;
    // },
    //
    // setDragBeginTargetWorldPos : function() {
    //     var worldPos,
    //         targetNode = this._currTargetNode;
    //
    //     if( targetNode ) {
    //         if( targetNode instanceof ccui.Widget ) {
    //             worldPos = targetNode.getWorldPosition();
    //         }
    //         else {
    //             var parent = targetNode.getParent();
    //             parent = !!parent ? parent : targetNode;
    //             worldPos = parent.convertToWorldSpace( targetNode.getPosition() );
    //         }
    //
    //         this._dragBeginTargetWorldPos = worldPos;
    //     }
    // },
    //
    // getDragBeginTargetWorldPos : function() {
    //     return this._dragBeginTargetWorldPos;
    // },
    //
    // getDiffPt : function() {
    //     return cc.pSub( this._dragBeginWorldPt, this._dragBeginTargetWorldPos );
    // },
    //
    // followTarget : function( targetNode ) {
    //     var worldPos = Genie.Utils.getNodeWorldPosition( targetNode );
    //     this.setPosition( worldPos );
    // },

});