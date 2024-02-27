// var ToolBaseLayer = cc.Layer.extend({
//     ctor: function () {
//         this._super();
//
//         this.CX = cc.winSize.width / 2;
//         this.CY = cc.winSize.height / 2;
//
//         this.onResize();
//         ScreenUtil.addResizeListener( this.onResize, this );
//
//         return true;
//     },
//
//     onResize : function () {
//         var size = cc.winSize;
//         this.CX = size.width / 2;
//         this.CY = size.height / 2;
//
//         this._animationList.setPosition(0, size.height - this._animationList.getContentSize().height);
//         this._itemList.setPosition(size.width - this._itemList.getContentSize().width , size.height - (this._itemList.getContentSize().height + 60));
//         this._screenSize.setPosition(size.width - this._screenSize.getContentSize().width , size.height - this._screenSize.getContentSize().height);
//         this._movementCtrl.setPosition(100, 0);
//         // this._btnHideButtons.setPosition( cc.winSize.width - 100, 30 );
//
//         this._treeView.setPosition(0, size.height - this._treeView.getContentSize().height);
//
//         var children = this.getChildren();
//
//         var self = this;
//         children.forEach( function( c ) {
//             if( c.getTag() === self.DESC_TAG ) {
//                 c.setPosition( self.CX, self.CY );
//             }
//         } );
//     },
//     /*
//     -리소스 컨트롤 방식 (기존거 잊어버리고)
//      AR : anchor 는 만지지않는다. (Tool에서 컨트롤)
//           position으로 배치를 한다.
//
//      UI : anchor를  0.5 ,0.5 로 배치를 하고
//           position 를 AR와 같이간다.
//
//      */
//     onLoadArmature: function( ids )  {
//         var children = this.getChildren();
//
//         var self = this;
//         children.forEach( function( c ) {
//             if( c.getTag() === self.DESC_TAG ) {
//                 c.removeFromParent();
//             }
//         } );
//
//         cc.each( ids, function( name, index ) {
//             if(this._nodeList[ name ])
//                 return;
//
//             var armature = new ccs.Armature( name );
//
//             var node = new DraggableNode( armature.getContentSize() );
//             //node.setAnchorPoint( 0.5, 0.5 );
//             node.setPosition( this.CX - armature.getContentSize().width * 0.5 , this.CY - armature.getContentSize().height * 0.5 );
//
//             // addChild 순서 중요!
//             // armature가 draggableNode에 addChild되면 contentSize가 바뀜
//             this.addChild( node );
//             node.addChildToCenter( armature );
//             node.armature = armature;
//             node.ui = null;
//             node.order = this._nodeOrder.length;
//             node.setLocalZOrder(10 + node.order);
//             this._nodeOrder[node.order] = node;
//             this._nodeList[ name ] = node;
//             cc.log("[CHECK] zOrder :", node.getLocalZOrder());
//             this._addToJsonListMenu( name , node );
//             //this.updateMenu( name );
//         }, this );
//     },
//
//     onLoadUI: function( url ) {
//         var children = this.getChildren();
//
//         var self = this;
//         children.forEach( function( c ) {
//             if( c.getTag() === self.DESC_TAG ) {
//                 c.removeFromParent();
//             }
//         } );
//
//         var name = cc.path.mainFileName( url );
//         if(this._nodeList[ name ])
//             return;
//         var json = ccs.load( url );
//         var ui = json.node;
//
//         var node = new DraggableNode( ui.getContentSize() );
//         node.setAnchorPoint( 0.5, 0.5 );
//         node.setPosition( this.CX , this.CY );
//         this.addChild( node );
//
//         ui.setAnchorPoint( 0.5, 0.5 );
//         node.addChildToCenter( ui );
//
//         node.armature = null;
//         node.ui = ui;
//
//         node.order = this._nodeOrder.length;
//         node.setLocalZOrder(10 + node.order);
//         this._nodeOrder[node.order] = node;
//
//         this._nodeList[ name ] = node;
//         this._addToJsonListMenu( name ,node);
//     },
//
//     onLoadCocosStuido : function( url ) {
//         var children = this.getChildren();
//
//         var self = this;
//         children.forEach( function( c ) {
//             if( c.getTag() === self.DESC_TAG ) {
//                 c.removeFromParent();
//             }
//         } );
//
//         var name = cc.path.mainFileName( url );
//         if(this._nodeList[ name ])
//             return;
//         var json = ccs.load( url );
//         var ui = json.node;
//
//         var size = ui.getContentSize();
//         if(size.width < 0.01 || size.height < 0.01){
//             size = ui.getBoundingBoxToWorld();
//         }
//
//         var node = new DraggableNode( size );
//         node.setAnchorPoint( 0.5, 0.5 );
//         node.setPosition( this.CX , this.CY );
//         this.addChild( node );
//
//         ui.setAnchorPoint( 0.5, 0.5 );
//         node.addChildToCenter( ui );
//
//         node.armature = null;
//         node.ui = ui;
//         node.cocosAction = json.action;
//         if(node.cocosAction){
//             node.runAction(node.cocosAction); //타임라인 액션을 적용한 객체 붙임
//         }
//
//         node.order = this._nodeOrder.length;
//         node.setLocalZOrder(10 + node.order);
//         this._nodeOrder[node.order] = node;
//
//         this._nodeList[ name ] = node;
//         this._addToJsonListMenu( name ,node);
//     },
//
//     reOrderup : function (nodeName, orderPlus) {
//         nodeName = this._itemList.getSelectedName();
//
//         var node = this._nodeList[ nodeName ];
//         if(!node)
//             return;
//
//         var index = node.order;
//         var changeIndex =index
//         if(orderPlus)  {
//             changeIndex =index + 1;
//         }
//         else {
//             changeIndex =index - 1;
//         }
//
//         if(changeIndex >=0 && changeIndex  < this._nodeOrder.length) {
//             var changeNode = this._nodeOrder[changeIndex];
//             var temp =   changeNode.order;
//             changeNode.order = node.order;
//             node.order = temp;
//
//             this._nodeOrder[changeNode.order] = changeNode;
//             this._nodeOrder[node.order] = node;
//             changeNode.setLocalZOrder(10 + changeNode.order);
//             node.setLocalZOrder(10 + node.order);
//         }
//         cc.log("[REORDER] : ",index, " <=> ", changeIndex, " [ " +  node.order);
//     },
//
//     _addToJsonListMenu: function( name , node )  {
//         this._itemList.add(name, node,
//             function ( type ) {
//                 switch(type){
//                     case ItemListClickType.SELECT:
//                         this.updateMenu( name );
//                         break;
//                     case ItemListClickType.DELETE:
//                         this.deleteItem( name);
//                         break;
//                     case ItemListClickType.UP:
//                         this.reOrderup( name , true);
//                         break;
//                     case ItemListClickType.DOWN:
//                         this.reOrderup( name , false);
//                         break;
//
//                 }
//             }.bind(this));
//
//         // this.setDraggableItem( name );
//     },
//
//     updateMenu: function( name, finalNode ) {
//         var selectNode = this._nodeList[ name ];
//         toggleJSONUI(name.indexOf('(JSON)') !== -1  );
//         if( !selectNode ) return;
//
//         selectNode.setName(name);
//         if( selectNode.armature) {
//             this._animationList.setVisible(true);
//             var animations =  selectNode.armature.getAnimation();
//             var animNameArr = animations._animationData.movementNames;
//
//             var playCb = function ( animName) {
//                 animations.play(animName);
//             };
//             this._animationList.init(animNameArr,playCb);
//
//             $('#LocalSize').html("(" + selectNode.armature.getContentSize().width.toFixed(2) + " , " +selectNode.armature.getContentSize().height.toFixed(2) + ")");
//         }
//         else{
//             this._animationList.setVisible(false);
//             this._animationList.init([],null);
//         }
//
//         this._movementCtrl.init(selectNode);
//         this._treeView.setNode(selectNode, finalNode);
//
//         this.setDraggableItem( name );
//     },
//
//     deleteItem : function ( name) {
//         var selectNode = this._nodeList[ name ];
//         if(selectNode) {
//             if(Target === selectNode)
//                 Target = null;
//             var order = selectNode.order;
//             selectNode.removeFromParent();
//             this._animationList.setVisible(false);
//             this._animationList.init([],null);
//
//             delete this._nodeList[ name ];
//             this._movementCtrl.init(null);
//             for(var n = order; n < this._nodeOrder.length - 1; n++) {
//                 this._nodeOrder[n + 1].order =n;
//                 this._nodeOrder[n] = this._nodeOrder[n + 1];
//                 this._nodeOrder[n].setLocalZOrder(1000 - this._nodeOrder[n].order);
//             }
//             this._nodeOrder.pop();
//             this._treeView.setNode(null);
//         }
//
//     },
//
//     setDraggableItem: function( name ) {
//         for( var nodeName in this._nodeList ) {
//             if( typeof this._nodeList[ nodeName ].setDraggable === 'function' ) {
//                 this._nodeList[ nodeName ].setDraggable( false );
//                 if(Target ===  this._nodeList[ nodeName ])
//                     Target = null;
//             }
//         }
//         if( this._nodeList.hasOwnProperty( name ) ) {
//             this._nodeList[ name ].setDraggable( true );
//             Target = this._nodeList[ name ];
//         }
//     },
//
//     onHideButtonsTouch: function( sender, type ) {
//         switch( type ) {
//             case ccui.Widget.TOUCH_ENDED:
//             {
//                 if( this._screenSize.visible ) {
//                     this._screenSize.visible = false;
//                     this._prevAnimationListVisble = this._animationList.visible;
//                     this._prevItemListVisble = this._itemList.visible;
//                     this._prevMovementCtrlVisble = this._movementCtrl.visible;
//                     this._prevTreeViewVisible = this._treeView.visible;
//
//                     this._animationList.visible = false;
//                     this._itemList.visible = false;
//                     this._movementCtrl.visible = false;
//                     this._treeView.visible = false;
//                     //   this._btnHideButtons.setTitleText("SHOW ALL BUTTONS");
//                 } else {
//                     this._screenSize.visible = true;
//                     this._animationList.visible = this._prevAnimationListVisble;
//                     this._itemList.visible = this._prevItemListVisble;
//                     this._movementCtrl.visible = this._prevMovementCtrlVisble;
//                     this._treeView.visible = this._prevTreeViewVisible;
//                     //   this._btnHideButtons.setTitleText("HIDE ALL BUTTONS");
//                 }
//                 break;
//             }
//         }
//     },
//
//     onExit: function() {
//         cc.eventManager.removeListener( this._loadArmatureListener );
//         cc.eventManager.removeListener( this._loadUIListener );
//         cc.eventManager.removeListener( this._loadCocosStudioListener );
//         this._super();
//     },
//
// });
