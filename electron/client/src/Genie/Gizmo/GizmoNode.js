var Genie = Genie || {};

Genie.GizmoNode = Genie.HierarchyProtectNode.extend({
    ctor : function() {
        this.initProperty();
        this._super();
        this.initGizmo();
        this.setMode( this.mode.MOVE );
    },

    initProperty : function() {
        this.mode = {
            HIDE   : -1,
            MOVE   : 0,
            ROTATE : 1,
            SCALE  : 2,
        };

        this.currMode = this.mode.MOVE;
        this._isHide  = false;

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

        this.rotateOptions = {
            radius : 50,
            touchSize : cc.size( 120, 120 ),
            touchOffset : cc.p( -60, -60 ),
            line_width : 4,
            color : cc.color( 0, 0, 255, 100 ),
            center : cc.p( 0, 0 ),
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
        this.rotateDrawNode      = null;
        this.scaleXDrawNode      = null;
        this.scaleYDrawNode      = null;
        this.rectDrawNode        = null;
        this.bbDrawNode          = null;
        this.contentSizeDrawNode = null;

        this.touchCompRect   = null;
        this.touchCompX      = null;
        this.touchCompY      = null;
        this.touchCompRotate = null;
        this.touchCompSX     = null;
        this.touchCompSY     = null;

        this.targetNode      = null;
    },

    setMode : function (mode) {
        const isHide = mode === this.mode.HIDE;

        if (isHide) {
            this._isHide = !this._isHide;
            const button = document.getElementById('gizmo_hide');

            button.setAttribute('title', this._isHide ? '기즈모 보임(q)' : '기즈모 숨김(q)');
            button.querySelector('i').setAttribute('class', this._isHide ? 'fa-solid fa-eye': 'fa-solid fa-eye-slash');
        }
        else
            this.currMode = mode;

        const isMove = this.currMode === this.mode.MOVE,
              isRotate = this.currMode === this.mode.ROTATE,
              isScale = this.currMode === this.mode.SCALE;

        this.axisXDrawNode.setVisible(!this._isHide && isMove);
        this.axisYDrawNode.setVisible(!this._isHide && isMove);

        this.rotateDrawNode.setVisible(!this._isHide && isRotate);

        this.scaleXDrawNode.setVisible(!this._isHide && isScale);
        this.scaleYDrawNode.setVisible(!this._isHide && isScale);

        this.rectDrawNode.setVisible(!this._isHide);
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

        this.axisCenterDrawNode = this._addDrawNodeOnRootNode();
        this.axisXDrawNode = this._addDrawNodeOnRootNode();
        this.axisYDrawNode = this._addDrawNodeOnRootNode();
        this.rectDrawNode = this._addDrawNodeOnRootNode();
        this.rotateDrawNode = this._addDrawNodeOnRootNode();
        this.scaleXDrawNode = this._addDrawNodeOnRootNode();
        this.scaleYDrawNode = this._addDrawNodeOnRootNode();
        this.bbDrawNode = this._addDrawNodeOnRootNode();
        this.contentSizeDrawNode = this._addDrawNodeOnRootNode();
    },

    _addDrawNodeOnRootNode : function () {
        const drawNode = new cc.DrawNode();
        this.rootNode.addChild( drawNode );
        return drawNode;
    },

    drawGizmo : function() {
        this._drawAxis();
        this._drawControlRect();
        this._drawRotate();
        this._drawScale();
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

    _drawRotate : function () {
        this.rotateDrawNode.clear();

        var RADIUS      = this.rotateOptions.radius,
            CENTER      = this.rotateOptions.center,
            LINE_WIDTH  = this.rotateOptions.line_width,
            COLOR       = this.rotateOptions.color;

        this.rotateDrawNode.drawCircle( CENTER, RADIUS, 0, 360, false, LINE_WIDTH, COLOR );
    },

    _drawScale : function () {
        this.scaleXDrawNode.clear();
        this.scaleYDrawNode.clear();

        var LINE_LENGTH     = this.axisOptions.line_length,
            ARROW_LENGTH    = this.axisOptions.arrow_length,
            AXIS_WIDTH      = this.axisOptions.axis_width;

        var COLOR = this.axisOptions.color_axisX;

        var points = [
            cc.p( LINE_LENGTH + ARROW_LENGTH, 0 ),
            cc.p( LINE_LENGTH + ARROW_LENGTH, ARROW_LENGTH / 2 ),
            cc.p( LINE_LENGTH, ARROW_LENGTH / 2 ),

            cc.p( LINE_LENGTH, AXIS_WIDTH / 2 ),
            cc.p( 0, AXIS_WIDTH / 2 ),
            cc.p( 0, -AXIS_WIDTH / 2 ),
            cc.p( LINE_LENGTH, -AXIS_WIDTH / 2 ),

            cc.p( LINE_LENGTH, -ARROW_LENGTH / 2 ),
            cc.p( LINE_LENGTH + ARROW_LENGTH, -ARROW_LENGTH / 2 ),

        ]
        this.scaleXDrawNode.drawPoly( points, COLOR, 1, COLOR );

        COLOR = this.axisOptions.color_axisY;
        points = [
            cc.p( 0, LINE_LENGTH + ARROW_LENGTH ),
            cc.p( -ARROW_LENGTH / 2, LINE_LENGTH + ARROW_LENGTH ),
            cc.p( -ARROW_LENGTH / 2, LINE_LENGTH ),

            cc.p(-AXIS_WIDTH / 2, LINE_LENGTH ),
            cc.p(-AXIS_WIDTH / 2, 0 ),
            cc.p(AXIS_WIDTH / 2, 0 ),
            cc.p(AXIS_WIDTH / 2, LINE_LENGTH ),

            cc.p( ARROW_LENGTH / 2, LINE_LENGTH ),
            cc.p( ARROW_LENGTH / 2, LINE_LENGTH + ARROW_LENGTH ),
        ]
        this.scaleYDrawNode.drawPoly( points, COLOR, 1, COLOR );
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
        var touchCompRect = new Genie.Component.Touch(),
            touchCompX = new Genie.Component.Touch(),
            touchCompY = new Genie.Component.Touch(),
            touchRotate = new Genie.Component.Touch(),
            touchScaleX = new Genie.Component.Touch(),
            touchScaleY = new Genie.Component.Touch();

        this.touchCompRect   = this._insertTouchComp(this.rectDrawNode, touchCompRect, this.onMouseEventRect, this.rectOptions.size, this.rectOptions.offset);
        this.touchCompX      = this._insertTouchComp(this.axisXDrawNode, touchCompX, this.onMouseEventX, this.axisOptions.touchSizeX, this.axisOptions.touchOffsetX);
        this.touchCompY      = this._insertTouchComp(this.axisYDrawNode, touchCompY, this.onMouseEventY, this.axisOptions.touchSizeY, this.axisOptions.touchOffsetY);
        this.touchCompRotate = this._insertTouchComp(this.rotateDrawNode, touchRotate, this.onMouseEventRotate, this.rotateOptions.touchSize, this.rotateOptions.touchOffset);
        this.touchCompSX     = this._insertTouchComp(this.scaleXDrawNode, touchScaleX, this.onMouseEventX, this.axisOptions.touchSizeX, this.axisOptions.touchOffsetX );
        this.touchCompSY      = this._insertTouchComp(this.scaleYDrawNode, touchScaleY, this.onMouseEventY, this.axisOptions.touchSizeY, this.axisOptions.touchOffsetY);

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

    onMouseEventX: function( eventName, pt ) {
        this._onMouseEvent.call(this, 'x', eventName, pt);
    },

    onMouseEventY: function( eventName, pt ) {
        this._onMouseEvent.call(this, 'y', eventName, pt);
    },

    onMouseEventRotate : function ( eventName, pt ) {
        this._onMouseEvent.call(this, 'rotate', eventName, pt);
    },

    _onMouseEvent(type, eventName, pt) {
        var delta, selectNode, touchComp, size, offset, isValid;
        var isMove   = this.currMode === this.mode.MOVE,
            isRotate = this.currMode === this.mode.ROTATE,
            isScale  = this.currMode === this.mode.SCALE;

        switch (type) {
            case 'rect':
                touchComp          = this.touchCompRect;
                size               = this.rectOptions.size;
                offset             = this.rectOptions.offset;
                break;
            case 'x':
                touchComp          = isMove ? this.touchCompX : this.touchCompSX;
                size               = this.axisOptions.touchSizeX;
                offset             = this.axisOptions.touchOffsetX;
                break;
            case 'y':
                touchComp          = isMove ? this.touchCompY : this.touchCompSY;
                size               = this.axisOptions.touchSizeY;
                offset             = this.axisOptions.touchOffsetY;
                break;
            case 'rotate':
                touchComp          = this.touchCompRotate;
                size               = this.rotateOptions.touchSize;
                offset             = this.rotateOptions.touchOffset;
                break;
            default:
                return;
        }

        switch (eventName) {
            case 'down':
                cc.game.canvas.style.cursor = 'pointer';
                selectNode = Genie.ToolController.getSelectNode();
                var args = {
                    dragStartPt: pt,
                    dragStartTargetPt: Genie.Utils.getNodeWorldPosition( selectNode ),
                    dragStartScaleX: selectNode.getScaleX(),
                    dragStartScaleY: selectNode.getScaleY(),
                    dragStartRotation: selectNode.getRotation(),
                };
                if (type === 'x')
                    Genie.GizmoController.setDragXStart( args );
                else if (type === 'y')
                    Genie.GizmoController.setDragYStart( args );
                else if (type === 'rect')
                    Genie.GizmoController.setDragRectStart( args );
                else if (type === 'rotate')
                    Genie.GizmoController.setDragRotateStart( args );
                touchComp.setCustomHitRectSize( cc.game.canvas.width * 4, cc.game.canvas.height * 4 );
                touchComp.setCustomHitRectCenterOffsetPt( cc.p( -cc.game.canvas.width * 2, -cc.game.canvas.height * 2 ) );
                break;
            case 'move':
                if (type === 'x')
                    isValid = Genie.GizmoController.isDragGizmoCtrlX();
                else if (type === 'y')
                    isValid = Genie.GizmoController.isDragGizmoCtrlY();
                else if (type === 'rect')
                    isValid = Genie.GizmoController.isDragGizmoCtrlRect();
                else if (type === 'rotate')
                    isValid = Genie.GizmoController.isDragGizmoCtrlRotate();

                if ( isValid ) {
                    delta = cc.pSub(pt, Genie.GizmoController.getDeltaInTargetPt());
                    selectNode = Genie.ToolController.getSelectNode();

                    if (type === 'x')
                        delta.y = selectNode.getPosition().y;
                    if (type === 'y')
                        delta.x = selectNode.getPosition().x;

                    Genie.GizmoController.updateGizmoByTarget( selectNode );

                    var transComp = selectNode.getComponent( Genie.ComponentName.TRANSFORM );
                    if (isMove) {
                        var localPos = delta;
                        var transPos = localPos;

                        if (type === 'x')
                            transPos = cc.p( localPos.x, parseFloat(Genie.GizmoController.getDragStartTargetPt().y.toFixed(2)) );
                        else if (type === 'y')
                            transPos = cc.p( parseFloat(Genie.GizmoController.getDragStartTargetPt().x.toFixed(2)), localPos.y );

                        transComp && transComp.refreshPositionValue( Genie.MainScene.mainViewLayer.convertToNodeSpace(transPos) );
                        selectNode.setPosition( Genie.MainScene.mainViewLayer.convertToNodeSpace(transPos) );

                    } else if (isScale) {
                        var diff = cc.pSub(delta, selectNode.getPosition());
                        var currScaleX = Genie.GizmoController.getDragStartScaleX(),
                            currScaleY = Genie.GizmoController.getDragStartScaleY();

                        if (diff.x < 0)
                            diff.x = Genie.Utils.minMaxScaling(diff.x, -1700, 0, 0, currScaleX);
                        else
                            diff.x = Genie.Utils.minMaxScaling(diff.x, 0, 1700, currScaleX, currScaleX * 5);

                        if (diff.y < 0)
                            diff.y = Genie.Utils.minMaxScaling(diff.y, -1000, 0, 0, currScaleY);
                        else
                            diff.y = Genie.Utils.minMaxScaling(diff.y, 0, 1000, currScaleY, currScaleY * 5);

                        if (type === 'x') {
                            transComp && transComp.refreshScaleValue(cc.p(diff.x, selectNode.getScaleY()));
                            selectNode.setScaleX(diff.x);
                        } else if (type === 'y') {
                            transComp && transComp.refreshScaleValue(cc.p(selectNode.getScaleX(), diff.y));
                            selectNode.setScaleY(diff.y);
                        } else {
                            transComp && transComp.refreshScaleValue(diff);
                            selectNode.setScaleX(diff.x);
                            selectNode.setScaleY(diff.y);
                        }
                    } else if (isRotate) {
                        var deltaVector = cc.p(delta.x - Genie.GizmoController.getDragStartTargetPt().x, delta.y - Genie.GizmoController.getDragStartTargetPt().y);
                        var extendedVector = Genie.Utils.extendVectorToMinimumLength(deltaVector, 1000);

                        var originAngle = Genie.GizmoController.getDragStartRotation();
                        var deltaAngle = Genie.Utils.calculateAngleOfTwoSegments(
                            Genie.GizmoController.getDragStartTargetPt(),
                            cc.pAdd(delta, extendedVector),
                            Genie.GizmoController.getDragStartTargetPt(),
                            Genie.GizmoController.getDragStartPt()
                        );
                        var newAngle = (originAngle + deltaAngle) % 360;
                        if (!isNaN(newAngle)) {
                            selectNode.setRotation(newAngle);
                            transComp && transComp.refreshRotationValue(newAngle);
                        }
                    }
                }
                break;
            case 'up':
                if (type === 'x')
                    isValid = Genie.GizmoController.isDragGizmoCtrlX();
                else if (type === 'y')
                    isValid = Genie.GizmoController.isDragGizmoCtrlY();
                else if (type === 'rect')
                    isValid = Genie.GizmoController.isDragGizmoCtrlRect();
                else if (type === 'rotate')
                    isValid = Genie.GizmoController.isDragGizmoCtrlRotate();

                if ( isValid ) {
                    Genie.GizmoController.setDragEnd();

                    delta = cc.pSub(pt, Genie.GizmoController.getDeltaInTargetPt());
                    selectNode = Genie.ToolController.getSelectNode();

                    if (type === 'x')
                        delta.y = selectNode.getPosition().y;
                    if (type === 'y')
                        delta.x = selectNode.getPosition().x;

                    var src, dest;
                    if (isMove) {
                        var dragStartTargetPt = Genie.GizmoController.getDragStartTargetPt();
                        var srcLocalPos = selectNode.getParent().convertToNodeSpace(dragStartTargetPt);
                        var destLocalPos = selectNode.getParent().convertToNodeSpace(delta);

                        src = cc.p(Math.round(srcLocalPos.x), Math.round(srcLocalPos.y));
                        if (type === 'x')
                            dest = cc.p(Math.round(destLocalPos.x), Math.round(srcLocalPos.y));
                        else if (type === 'y')
                            dest = cc.p(Math.round(srcLocalPos.x), Math.round(destLocalPos.y));
                        else if (type === 'rect')
                            dest = cc.p(Math.round(destLocalPos.x), Math.round(destLocalPos.y));

                        var moveDelta = cc.pDistance(srcLocalPos, selectNode.getPosition());
                        if (moveDelta > 1.0) {
                            Genie.CommandManager.execute(new Genie.Command.TransformPosition(selectNode, {
                                src: src,
                                dest: dest
                            }));
                        }
                    } else if (isScale) {
                        var dragStartScaleX = Genie.GizmoController.getDragStartScaleX(),
                            dragStartScaleY = Genie.GizmoController.getDragStartScaleY(),
                            destScaleX      = selectNode.getScaleX(),
                            destScaleY      = selectNode.getScaleY();

                        if (type === 'x')
                            destScaleY = dragStartScaleY;
                        else if (type === 'y')
                            destScaleX = dragStartScaleX;

                        var scaleDelta = cc.pDistance(cc.p(dragStartScaleX, dragStartScaleY), cc.p(destScaleX, destScaleY));
                        if (scaleDelta >= 0.01) {
                            src = cc.p(Math.round(dragStartScaleX * 100) / 100, Math.round(dragStartScaleY * 100) / 100);
                            dest = cc.p(Math.round(destScaleX * 100) / 100, Math.round(destScaleY * 100) / 100);
                            Genie.CommandManager.execute(new Genie.Command.TransformScale(selectNode, {
                                src: src,
                                dest: dest
                            }));
                        }
                    } else if (isRotate) {
                        var rotateDelta = Math.abs(selectNode.getRotation() - Genie.GizmoController.getDragStartRotation());
                        if (rotateDelta >= 1) {
                            src = Genie.GizmoController.getDragStartRotation();
                            dest = parseInt(selectNode.getRotation());
                            Genie.CommandManager.execute(new Genie.Command.TransformRotation(selectNode, {
                                src: src,
                                dest: dest
                            }));
                        }
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