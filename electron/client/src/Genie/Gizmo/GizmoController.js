var Genie = Genie || {};

Genie.GizmoController = {
    POOL_RESERVE_SIZE   : 10,
    arrActiveGizmoNode  : [],

    dragStartTargetPt   : cc.p( 0, 0 ),
    dragStartPt         : cc.p( 0, 0 ),
    dragStartScaleX     : 1.0,
    dragStartScaleY     : 1.0,
    dragStartRotation   : 0,
    dragGizmoCtrlRect   : false,
    dragGizmoCtrlX      : false,
    dragGizmoCtrlY      : false,
    dragGizmoCtrlRotate : false,

    //region [ 타겟노드에 기즈모 세팅 관련 ]
    getGizmoByTargetNode : function( node ) {
        var i, gizmo, targetNode;
        for( i = 0; i < this.arrActiveGizmoNode.length; ++i ) {
            gizmo       = this.arrActiveGizmoNode[i];
            targetNode  = gizmo.getTargetNode();
            if( node.__instanceId === targetNode.__instanceId ) {
                return gizmo;
            }
        }
        return null;
    },

    updateGizmoByTarget : function( node ) {
        var gizmo = this.getGizmoByTargetNode( node );
        if( gizmo ) {
            gizmo.refreshGizmo();
        }
    },

    attachGizmo : function( node ) {
        if( cc.pool.hasObject( Genie.GizmoNode ) === false ) {
            cc.pool.putInPool( new Genie.GizmoNode() ) ;
        }

        var gizmo = cc.pool.getFromPool( Genie.GizmoNode );
        if( gizmo && node ) {
            Genie.gizmoLayer.addChild( gizmo, Genie.GIZMO_ORDER, Genie.NodeTag.GIZMO );
            this.arrActiveGizmoNode.push( gizmo );
            gizmo.setTargetNode( node );
        }
    },

    detachGizmoByTargetNode : function( node ) {
        var i, gizmo, targetNode;
        for( i = 0; i < this.arrActiveGizmoNode.length; ++i ) {
            gizmo       = this.arrActiveGizmoNode[i];
            targetNode  = gizmo.getTargetNode();

            cc.log("node name : ", node.getName() );
            cc.log("targetNode name : ", targetNode.getName() );

            if( node.__instanceId === targetNode.__instanceId ) {
                this.detachGizmo( gizmo );
            }
        }
    },

    detachGizmo : function( gizmo ) {
        if( gizmo && gizmo.getParent() ) {
            var gizmoTargetNode = gizmo.getTargetNode();
            var findIdx = this.arrActiveGizmoNode.findIndex( function( item ) {
                var targetNode = item.getTargetNode();
                return ( targetNode.__instanceId === gizmoTargetNode.__instanceId );
            });

            ( findIdx >= 0 ) && this.arrActiveGizmoNode.splice( findIdx, 1);

            cc.pool.putInPool( gizmo );
            gizmo.removeFromParent();
        }
    },

    detachAllGizmo : function() {
        var i, gizmo;
        for( i = 0; i < this.arrActiveGizmoNode.length; ++i ) {
            gizmo = this.arrActiveGizmoNode[i];
            this.detachGizmo( gizmo );
        }
    },
    //endregion

    showMoveGizmo : function () {
        this._setGizmoMode(0);
    },

    showRotateGizmo : function () {
        this._setGizmoMode(1);
    },

    showScaleGizmo : function () {
        this._setGizmoMode(2);
    },

    _setGizmoMode : function (mode) {
        const target = Renderer_hierarchy.getTargetNode();
        if (!target)
            return;
        const gizmo = this.getGizmoByTargetNode(target);
        gizmo.setMode(mode);
    },

    //region [ 기즈모 타겟 노드 드레그 ]

    // 기즈모 컨트롤 RECT 드래그 컨트롤 시작 시
    setDragRectStart : function( args ) {
        this.dragGizmoCtrlRect   = true;
        this.dragGizmoCtrlX      = false;
        this.dragGizmoCtrlY      = false;
        this.dragGizmoCtrlRotate = false;
        this._setDragStart( args );
    },

    setDragXStart : function( args ) {
        this.dragGizmoCtrlRect   = false;
        this.dragGizmoCtrlX      = true;
        this.dragGizmoCtrlY      = false;
        this.dragGizmoCtrlRotate = false;
        this._setDragStart( args );
    },

    setDragYStart : function( args ) {
        this.dragGizmoCtrlRect   = false;
        this.dragGizmoCtrlX      = false;
        this.dragGizmoCtrlY      = true;
        this.dragGizmoCtrlRotate = false;
        this._setDragStart( args );
    },

    setDragRotateStart : function( args ) {
        this.dragGizmoCtrlRect   = false;
        this.dragGizmoCtrlX      = false;
        this.dragGizmoCtrlY      = false;
        this.dragGizmoCtrlRotate = true;
        this._setDragStart( args );
    },

    _setDragStart : function( args ) {
        var { dragStartPt, dragStartTargetPt, dragStartScaleX, dragStartScaleY, dragStartRotation } = args;
        this.dragStartPt        = dragStartPt;
        this.dragStartTargetPt  = dragStartTargetPt;
        this.dragStartScaleX    = dragStartScaleX;
        this.dragStartScaleY    = dragStartScaleY;
        this.dragStartRotation  = dragStartRotation;
        this.deltaInTargetPt    = cc.pSub( this.dragStartPt, this.dragStartTargetPt );
    },

    setDragEnd  : function () {
        this.dragGizmoCtrlRect = false;
        this.dragGizmoCtrlX = false;
        this.dragGizmoCtrlY = false;
        this.dragGizmoCtrlRotate = false;
    },

    getDeltaInTargetPt : function() {
        return this.deltaInTargetPt;
    },

    getDragStartTargetPt : function() {
        return this.dragStartTargetPt;
    },

    getDragStartPt : function () {
        return this.dragStartPt;
    },

    getDragStartScaleX : function () {
        return this.dragStartScaleX;
    },

    getDragStartScaleY : function () {
        return this.dragStartScaleY;
    },

    getDragStartRotation : function () {
        return this.dragStartRotation;
    },

    isDragGizmoCtrlRect : function() {
        return this.dragGizmoCtrlRect;
    },

    isDragGizmoCtrlX : function() {
        return this.dragGizmoCtrlX;
    },

    isDragGizmoCtrlY : function() {
        return this.dragGizmoCtrlY;
    },

    isDragGizmoCtrlRotate : function() {
        return this.dragGizmoCtrlRotate;
    },
    //endregion


}