// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};

Genie.GizmoController = {
    POOL_RESERVE_SIZE   : 10,
    arrActiveGizmoNode  : [],

    dragStartTargetPt   : cc.p( 0, 0 ),
    dragStartPt         : cc.p( 0, 0 ),
    dragGizmoCtrlRect   : false,

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

    //region [ 기즈모 타겟 노드 드레그 ]

    // 기즈모 컨트롤 RECT 드래그 컨트롤 시작 시
    setDragStart : function( dragStartPt, dragStartTargetPt ) {
        this.dragGizmoCtrlRect  = true;
        this.dragStartPt        = dragStartPt;
        this.dragStartTargetPt  = dragStartTargetPt;
        this.deltaInTargetPt    = cc.pSub( this.dragStartPt, this.dragStartTargetPt );
    },

    setDragEnd  : function () {
        this.dragGizmoCtrlRect = false;
    },

    getDeltaInTargetPt : function() {
        return this.deltaInTargetPt;
    },

    getDragStartTargetPt : function() {
        return this.dragStartTargetPt;
    },

    isDragGizmoCtrlRect : function() {
        return this.dragGizmoCtrlRect;
    },
    //endregion


}