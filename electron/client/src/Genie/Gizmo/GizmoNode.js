const { sentryRendererInit } = require('../../../../sentryRenderer');
sentryRendererInit();

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
        this.contentSizeDrawNode = null;

        this.targetNode     = null;
    },

    onEnter : function() {
        this._initTouchComponent();
        this._super();
    },

    onExit : function() {
        this.targetNode = null;
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

        this.contentSizeDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.contentSizeDrawNode );
    },

    drawGizmo : function() {
        this._drawAxis();
        this._drawControlRect();
        this._drawBoundingBox();
        this._drawContentSize(); // todo 컨텐트 사이즈와 바운딩 박스 차이를 보기 위해 그림. 나중에 별 이슈 없으면 둘중 하나를 삭제
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
        var bb, tm;

        if( this.targetNode instanceof ccs.Armature ) {
            var c_size = this.targetNode.getContentSize();
            var apps   = this.targetNode.getAnchorPoint();

            bb = cc.rect( -c_size.width * apps.x, -c_size.height * apps.y, c_size.width, c_size.height );
            tm = this.targetNode.getNodeToWorldTransform();
            bb = cc.rectApplyAffineTransform( bb, tm );
        }
        else {
            bb      = loc_node.getBoundingBoxToWorld();
        }

        tm = this.getParentToNodeTransform();
        bb = cc.rectApplyAffineTransform(bb, tm);

        var origin  = cc.p( bb.x, bb.y ),
            dest    = cc.p( bb.x + bb.width, bb.y + bb.height );

        this.bbDrawNode.drawRect( origin, dest, this.bbOptions.fillColor, this.bbOptions.width, this.bbOptions.lineColor );
    },

    _drawContentSize : function() {
        this.contentSizeDrawNode.clear();

        var node    = this.targetNode;
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
        this.contentSizeDrawNode.drawRect( origin, dest, cc.color( 0, 0, 0, 0), 2, cc.color( 0, 200,200, 200 ) );
    },

    _initTouchComponent : function() {
        this.rectDrawNode.setContentSize( this.rectOptions.size );
        var touchComp = new Genie.Component.Touch();
        touchComp.onTriggerEvent = this.onMouseEvent.bind( this );
        this.rectDrawNode.addComponent( touchComp );

        this.touchComp = touchComp;
    },

    onMouseEvent : function( eventName, pt ) {
        var delta, selectNode;
        switch ( eventName ) {
            case 'down':
                cc.log("gizmoNode.down");
                Genie.GizmoController.setDragStart( pt, Genie.Utils.getNodeWorldPosition(this.targetNode) );
                break;
            case 'move':
                if( Genie.GizmoController.isDragGizmoCtrlRect() === true ) {
                    cc.log("gizmoNode.move");
                    delta           = cc.pSub( pt, Genie.GizmoController.getDeltaInTargetPt() );
                    selectNode      = Genie.ToolController.getSelectNode();

                    var localPos    = selectNode.getParent().convertToNodeSpace( delta );

                    // 드레그로 인한 위치 변경은 커맨드 사용하지 않는다.
                    // mainView 값 변경
                    Genie.GizmoController.updateGizmoByTarget( selectNode );
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
        this.refreshGizmo();
    },

    getTargetNode : function() {
        return this.targetNode;
    },

    refreshGizmo : function() {
        var visible = this.targetNode.isVisible();
        visible = visible && Genie.Utils.isAncestorVisible( this.targetNode );
        this.setVisible( visible );

        this.refreshPosition();
        this.drawGizmo();
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

});