var Genie = Genie || {};

Genie.GizmoLayer = cc.LayerColor.extend({
    ctor : function() {
        this.initProperty();
        this._super( cc.color( 150, 0, 0, 50 ));

        this.initPreviewArea();

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );
    },

    initProperty : function() {

    },

    onEnter : function() {
        this.initTouchListener();
        this._super();
    },

    onResize : function () {
        var size = cc.winSize;
        this.setContentSize( size.width, size.height );
    },

    initTouchListener : function() {
        var touchComp = new Genie.Component.Touch();
        touchComp.onTriggerEvent = this.onMouseEvent.bind(this);
        this.addComponent( touchComp );
    },

    initPreviewArea : function() {
        this.previewNode = new Genie.PreviewNode();
        this.addChild( this.previewNode, 10 );
    },

    onMouseEvent : function( eventName, pt ) {
        switch ( eventName ) {
            case 'click':
                var findNode = this.getFrontTouchedNode( pt );
                if( findNode ) {
                    cc.eventManager.dispatchCustomEvent( "onSelectNodeInMainView", { node : findNode });
                }
                break;
            case 'move':
                if( Genie.GizmoController.isDragGizmoCtrlRect() === true ) {
                    cc.log("gizmoLayer.move");
                    var delta           = cc.pSub( pt, Genie.GizmoController.getDeltaInTargetPt() );
                    var selectNode      = Genie.ToolController.getSelectNode();
                    var localPos        = selectNode.getParent().convertToNodeSpace( delta );

                    // 드레그로 인한 위치 변경은 커맨드 사용하지 않는다.

                    // mainView 값 변경
                    selectNode.setPosition( localPos );
                    Genie.GizmoController.updateGizmoByTarget( selectNode );

                    // insperctor 값 변경
                    var transComp = selectNode.getComponent( Genie.ComponentName.TRANSFORM );
                    transComp && transComp.refreshPositionValue( localPos );
                }
                break;
        }
    },

    getFrontTouchedNode : function( pt ) {
        var i, bb, localPt, child,
            sortedChildren = [],
            children = Genie.mainLayer.getChildren();

        children.sort( function( a,b ){
            var order_a = a.getLocalZOrder();
            var order_b = b.getLocalZOrder();

            return order_a - order_b;
        });

        for( i = children.length-1; i > -1; --i ) {
            child = children[i];
            bb = child.getBoundingBox();
            localPt = this.convertToNodeSpace( pt );
            if( cc.rectContainsPoint( bb, localPt ) ) {
                return child;
            }
        }

        return null;
    }

});