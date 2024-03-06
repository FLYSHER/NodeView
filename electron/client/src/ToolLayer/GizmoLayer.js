/**
 *
 */
// var GizmoLayer = cc.LayerColor.extend({
//     ctor : function() {
//         this.initProperty();
//         this._super( cc.color( 255, 0, 0, 50 ));
//
//         this._gizmoNode = new Gizmo();
//         this._gizmoNode.setPosition( 0, 0 );
//         this.addChild( this._gizmoNode);
//         this._gizmoNode.setVisible( false );
//         Genie.gizmoNode = this._gizmoNode;
//
//         this.initPreviewArea();
//
//         this.onResize();
//         ScreenUtil.addResizeListener( this.onResize, this );
//     },
//
//     initProperty : function() {
//         this._targetNode = null;
//         this._rtSize     = cc.size( 400, 300 );
//     },
//
//     onEnter : function() {
//         this._super();
//         this.initTouchListener();
//         cc.eventManager.addCustomListener("onChangeNodeInHierarchy", this.setTargetNode.bind(this));
//     },
//
//     onResize : function () {
//         var size = cc.winSize;
//         this.setContentSize( size.width, size.height );
//         this.previewNode.onResize();
//     },
//
//     initTouchListener : function() {
//         var self = this;
//         cc.eventManager.addListener({
//             event :  cc.EventListener.MOUSE,
//             onMouseDown : function( event ) {
//                 var findNode = self.getFrontTouchedNode( event.getLocation() );
//                 if( findNode ) {
//                     cc.eventManager.dispatchCustomEvent( "onSelectNodeInMainView", { node : findNode });
//                 }
//             }
//         }, this );
//     },
//
//     initPreviewArea : function() {
//         this.previewNode = new Genie.PreviewNode();
//         this.addChild( this.previewNode );
//     },
//
//     setTargetNode : function( event ) {
//         var userData  = event.getUserData();
//         this._gizmoNode.setVisible( !!userData.node );
//
//         if( !userData || !userData.node ) {
//             cc.error( "invalid userData : ", userData );
//             return;
//         }
//
//         var targetNode = userData.node;
//         if( this._targetNode === targetNode ) {
//             cc.warn( "same node" );
//             return;
//         }
//
//         this._targetNode = targetNode;
//         this._gizmoNode.setTargetNode( targetNode );
//
//         var originScale = this._targetNode.getScale();
//         var targetScale = originScale * 1.2;
//         this._targetNode.runAction( cc.sequence(
//             cc.scaleTo( 0.1, targetScale ),
//             cc.scaleTo( 0.1, originScale )
//         ));
//     },
//
//     getTargetNode : function() {
//         return this._targetNode;
//     },
//
//     getFrontTouchedNode : function( pt ) {
//         var i, bb, localPt, child,
//             sortedChildren = [],
//             children = Genie.mainLayer.getChildren();
//
//         children.sort( function( a,b ){
//             var order_a = a.getLocalZOrder();
//             var order_b = b.getLocalZOrder();
//
//             return order_a - order_b;
//         });
//
//         for( i = children.length-1; i > -1; --i ) {
//             child   = children[i];
//             bb      = child.getBoundingBox();
//             localPt = this.convertToNodeSpace( pt );
//             if( cc.rectContainsPoint( bb, localPt ) ) {
//                 return child;
//             }
//         }
//
//         return null;
//     }
// });