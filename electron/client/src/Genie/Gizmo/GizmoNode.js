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
            color_axisY : cc.color( 0, 255, 0, 100 ),
            touchSizeX  : cc.size( 110, 40 ),
            touchSizeY  : cc.size( 40, 110 ),
            touchOffsetX: cc.p( 25, -20 ),
            touchOffsetY: cc.p( -20, 25 ),
        };

        this.rectOptions = {
            size        : cc.size( 40, 40 ),
            offset      : cc.p( 0, 0 ),
            width       : 1,
            fillColor   : cc.color( 200, 200, 0, 100),
            lineColor   : cc.color( 200, 200, 0, 255)
        };

        this.bbOptions = {
            width       : 5,
            fillColor   : cc.color( 255,255,255, 0 ),
            lineColor   : cc.color( 200, 200, 0, 150 )
        }

        this.rootNode            = null;
        this.axisCenterDrawNode  = null;
        this.axisXDrawNode       = null;
        this.axisYDrawNode       = null;
        this.rectDrawNode        = null;
        this.bbDrawNode          = null;
        this.contentSizeDrawNode = null;

        this.touchCompRect  = null;
        this.touchCompX     = null;
        this.touchCompY     = null;

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

        this.axisCenterDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.axisCenterDrawNode );

        this.axisXDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.axisXDrawNode );

        this.axisYDrawNode = new cc.DrawNode();
        this.rootNode.addChild( this.axisYDrawNode );

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
        this.axisCenterDrawNode.clear();
        this.axisXDrawNode.clear();
        this.axisYDrawNode.clear();

        var LINE_LENGTH     = this.axisOptions.line_length,
            ARROW_LENGTH    = this.axisOptions.arrow_length,
            AXIS_WIDTH      = this.axisOptions.axis_width;

        // axis-x
        var COLOR = this.axisOptions.color_axisX;
        // arrow-x
        var points = [
            cc.p( LINE_LENGTH + ARROW_LENGTH, 0 ),
            cc.p( LINE_LENGTH - 5, ARROW_LENGTH / 2 ),

            cc.p( LINE_LENGTH, AXIS_WIDTH / 2 ),
            cc.p( 0, AXIS_WIDTH / 2 ),
            cc.p( 0, -AXIS_WIDTH / 2 ),
            cc.p( LINE_LENGTH, -AXIS_WIDTH / 2 ),

            cc.p( LINE_LENGTH - 5, -ARROW_LENGTH / 2 ),
        ]
        this.axisXDrawNode.drawPoly( points, COLOR, 1, COLOR );

        // axis-y
        COLOR = this.axisOptions.color_axisY;
        // arrow-y
        points = [
            cc.p( 0, LINE_LENGTH + ARROW_LENGTH ),
            cc.p( -ARROW_LENGTH / 2, LINE_LENGTH - 5 ),

            cc.p(-AXIS_WIDTH / 2, LINE_LENGTH ),
            cc.p(-AXIS_WIDTH / 2, 0 ),
            cc.p(AXIS_WIDTH / 2, 0 ),
            cc.p(AXIS_WIDTH / 2, LINE_LENGTH ),

            cc.p( ARROW_LENGTH / 2, LINE_LENGTH - 5),
        ]
        this.axisYDrawNode.drawPoly( points, COLOR, 1, COLOR );

        this.axisCenterDrawNode.drawDot( cc.p( 0, 0), 2, cc.color( 200, 200, 200, 200) );
    },

    _drawControlRect : function() {
        this.rectDrawNode.clear();

        var RECT_SIZE = cc.p( this.rectOptions.size.width, this.rectOptions.size.height );
        this.rectDrawNode.drawRect( cc.p( 0, 0 ), RECT_SIZE, this.rectOptions.fillColor, this.rectOptions.width, this.rectOptions.lineColor );
        this.rectDrawNode.setPosition( cc.p( -20, -20 ) );
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
        var touchCompRect = new Genie.Component.Touch();
        var touchCompX = new Genie.Component.Touch();
        var touchCompY = new Genie.Component.Touch();

        this.touchCompRect = this._insertTouchComp(this.rectDrawNode, touchCompRect, this.onMouseEventRect, this.rectOptions.size, this.rectOptions.offset);
        this.touchCompX    = this._insertTouchComp(this.axisXDrawNode, touchCompX, this.onMouseEventX, this.axisOptions.touchSizeX, this.axisOptions.touchOffsetX);
        this.touchCompY    = this._insertTouchComp(this.axisYDrawNode, touchCompY, this.onMouseEventY, this.axisOptions.touchSizeY, this.axisOptions.touchOffsetY);;
    },

    _insertTouchComp : function (target, comp, handler, size, offset) {
        target.setContentSize( size );
        offset && comp.setCustomHitRectCenterOffsetPt( offset );
        comp.onTriggerEvent = handler.bind( this );
        target.addComponent( comp );
        // comp.drawDebugingHitRectOnParent();
        return comp;
    },

    onMouseEventRect : function( eventName, pt ) {
        this._onMouseEvent.call(this, 'rect', eventName, pt);
    },

    onMouseEventX: function(eventName, pt) {
        this._onMouseEvent.call(this, 'x', eventName, pt);
    },

    onMouseEventY: function(eventName, pt) {
        this._onMouseEvent.call(this, 'y', eventName, pt);
    },

    _onMouseEvent(type, eventName, pt) {
        var delta, selectNode, touchComp, size, offset, isValid;
        switch (type) {
            case 'rect':
                touchComp          = this.touchCompRect;
                size               = this.rectOptions.size;
                offset             = this.rectOptions.offset;
                break;
            case 'x':
                touchComp          = this.touchCompX;
                size               = this.axisOptions.touchSizeX;
                offset             = this.axisOptions.touchOffsetX;
                break;
            case 'y':
                touchComp          = this.touchCompY;
                size               = this.axisOptions.touchSizeY;
                offset             = this.axisOptions.touchOffsetY;
                break;
            default:
                return;
        }

        switch (eventName) {
            case 'down':
                cc.game.canvas.style.cursor = 'pointer';
                if (type === 'x')
                    Genie.GizmoController.setDragXStart( pt, Genie.Utils.getNodeWorldPosition( this.targetNode ) );
                else if (type === 'y')
                    Genie.GizmoController.setDragYStart( pt, Genie.Utils.getNodeWorldPosition( this.targetNode ) );
                else
                    Genie.GizmoController.setDragRectStart( pt, Genie.Utils.getNodeWorldPosition( this.targetNode ) );
                touchComp.setCustomHitRectSize( cc.game.canvas.width * 4, cc.game.canvas.height * 4 );
                touchComp.setCustomHitRectCenterOffsetPt( cc.p( -cc.game.canvas.width * 2, -cc.game.canvas.height * 2 ) );
                break;
            case 'move':
                if (type === 'x')
                    isValid = Genie.GizmoController.isDragGizmoCtrlX();
                else if (type === 'y')
                    isValid = Genie.GizmoController.isDragGizmoCtrlY();
                else
                    isValid = Genie.GizmoController.isDragGizmoCtrlRect();

                if ( isValid ) {
                    delta = cc.pSub(pt, Genie.GizmoController.getDeltaInTargetPt());
                    selectNode = Genie.ToolController.getSelectNode();

                    if (type === 'x')
                        delta.y = selectNode.getPosition().y;
                    if (type === 'y')
                        delta.x = selectNode.getPosition().x;

                    var localPos = selectNode.getParent().convertToNodeSpace( delta );

                    Genie.GizmoController.updateGizmoByTarget( selectNode );
                    selectNode.setPosition( localPos );

                    var transComp = selectNode.getComponent( Genie.ComponentName.TRANSFORM );
                    if (type === 'x')
                        transComp && transComp.refreshPositionValue( cc.p( localPos.x, selectNode.getPosition().y ) );
                    else if (type === 'y')
                        transComp && transComp.refreshPositionValue( cc.p( selectNode.getPosition().x, localPos.y ) );
                    else
                        transComp && transComp.refreshPositionValue( localPos );
                }
                break;
            case 'up':
                if (type === 'x')
                    isValid = Genie.GizmoController.isDragGizmoCtrlX();
                else if (type === 'y')
                    isValid = Genie.GizmoController.isDragGizmoCtrlY();
                else
                    isValid = Genie.GizmoController.isDragGizmoCtrlRect();
                if ( isValid ) {
                    Genie.GizmoController.setDragEnd();

                    delta = cc.pSub(pt, Genie.GizmoController.getDeltaInTargetPt());
                    selectNode = Genie.ToolController.getSelectNode();

                    if (type === 'x')
                        delta.y = selectNode.getPosition().y;
                    if (type === 'y')
                        delta.x = selectNode.getPosition().x;

                    var dragStartTargetPt = Genie.GizmoController.getDragStartTargetPt();
                    var srcLocalPos = selectNode.getParent().convertToNodeSpace(dragStartTargetPt);
                    var destLocalPos = selectNode.getParent().convertToNodeSpace(delta);

                    var src = cc.p(Math.round(srcLocalPos.x), Math.round(srcLocalPos.y));
                    var dest;
                    if (type === 'x')
                        dest = cc.p(Math.round(destLocalPos.x), Math.round(srcLocalPos.y));
                    else if (type === 'y')
                        dest = cc.p(Math.round(srcLocalPos.x), Math.round(destLocalPos.y));
                    else
                        dest = cc.p(Math.round(destLocalPos.x), Math.round(destLocalPos.y));

                    var moveDelta = cc.pDistance(srcLocalPos, selectNode.getPosition());
                    if (moveDelta > 1.0) {
                        Genie.CommandManager.execute(new Genie.Command.TransformPosition(selectNode, {
                            src: src,
                            dest: dest
                        }));
                    }
                    cc.game.canvas.style.cursor = 'auto';
                    touchComp.setCustomHitRectSize( size );
                    touchComp.setCustomHitRectCenterOffsetPt( offset );
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