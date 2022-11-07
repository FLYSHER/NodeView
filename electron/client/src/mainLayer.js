//http://cocos.sonarlearning.co.uk/docs/action-animations-aka-easing
//http://cocos2d-x.org/js-tests/
//  Target.runAction(
//                cc.sequence(
//                    cc.delayTime(0.1),
//                    cc.moveTo(0.25, x, y).easing(cc.easeBackOut()),
//                    cc.callFunc(function () {  }
//                    ))
var NodeList = null;
var Target = null;
var TempTargetPos = null;
var TempTargetScale = null;
var TempTargetRot = null;
var TargetRunActionData = null;
var RunAction = function (script) {
    if(Target !== null) {
        if(TargetRunActionData !== null)
            Target.stopAction(TargetRunActionData);

        TempTargetPos = Target.getPosition();
        TempTargetScale = Target.getScale();
        TempTargetRot = Target.getRotation();
        TargetRunActionData = Target.runAction(script);
    }
};


var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    NODE_MENU_TAG: 100,
    JSON_LIST_MENU_TAG: 101,

    _animationList : null,
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener( 'loadArmature', function( event ) {
            // cc.log(new Error().stack);
            //cc.log( "JSON.parse( event.getUserData() ", JSON.parse( event.getUserData()));
            self.onLoadArmature( JSON.parse( event.getUserData() ) );
        } );

        this._loadUIListener = cc.eventManager.addCustomListener( 'loadUI', function( event ) {
            self.onLoadUI( event.getUserData() );
        } );

        this._loadCocosStudioListener = cc.eventManager.addCustomListener( 'loadCocosStudio', function (event){
            self.onLoadCocosStuido( event.getUserData() );
        });


        var label = new cc.LabelTTF( "파일을 이쪽으로 드래그해 주세요", "Arial", 30 );
        label.setPosition( this.CX, this.CY );
        this.addChild( label, 0, this.DESC_TAG );

        this._nodeList = {};
        this._nodeOrder = [];

        this._animationList = new UIListViewTest();
        this._animationList.setContentSize(cc.size(150, 200));
        this._animationList.setVisible(false);
        this.addChild(this._animationList,-128);
        this._animationList.setLocalZOrder(100000);

        this._movementCtrl = new UiPositionCtrl();
        this.addChild(this._movementCtrl,-128);
        this._movementCtrl.setLocalZOrder(100000);


        this._resourceList = new uiList();
        this.addChild(this._resourceList,-128);
        this._resourceList.setLocalZOrder(100000);
        this._resourceList.setContentSize(cc.size(150, 300));
        this._resourceList.setVisible(false);


        this._itemList = new UIItemList();
        this.addChild(this._itemList,-128);
        this._itemList.setLocalZOrder(100000);
        this._itemList.setContentSize(cc.size(150, 300));
        this._itemList.setVisible(false);

        this._treeView = new UIScrollTreeViewCtrl();
        this.addChild(this._treeView,-128);
        this._treeView.setLocalZOrder(100000);
        this._treeView.setContentSize(cc.size(300, 500));
        this._treeView.setVisible(false);
        this._treeView.setup();

        NodeList = this._nodeList;

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );

        return true;
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._animationList.setPosition(0, size.height - this._animationList.getContentSize().height);
        this._itemList.setPosition(size.width - this._itemList.getContentSize().width , size.height - (this._itemList.getContentSize().height + 60));
        this._movementCtrl.setPosition(100, 0);

        this._treeView.setPosition(0, size.height - this._treeView.getContentSize().height);

        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.setPosition( self.CX, self.CY );
            }
        } );
    },
    /*
    -리소스 컨트롤 방식 (기존거 잊어버리고)
     AR : anchor 는 만지지않는다. (Tool에서 컨트롤)
          position으로 배치를 한다.

     UI : anchor를  0.5 ,0.5 로 배치를 하고
          position 를 AR와 같이간다.

     */
    onLoadArmature: function( ids )  {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        cc.each( ids, function( name, index ) {
            if(this._nodeList[ name ])
                return;

            var armature = new ccs.Armature( name );

            var node = new DraggableNode( armature.getContentSize() );
            //node.setAnchorPoint( 0.5, 0.5 );
            node.setPosition( this.CX - armature.getContentSize().width * 0.5 , this.CY - armature.getContentSize().height * 0.5 );

            // addChild 순서 중요!
            // armature가 draggableNode에 addChild되면 contentSize가 바뀜
            this.addChild( node );
            node.addChildToCenter( armature );
            node.armature = armature;
            node.ui = null;
            node.order = this._nodeOrder.length;
            node.setLocalZOrder(10 + node.order);
            this._nodeOrder[node.order] = node;
            this._nodeList[ name ] = node;
            cc.log("[CHECK] zOrder :", node.getLocalZOrder());
            this._addToJsonListMenu( name , node );
            //this.updateMenu( name );
        }, this );
    },

    onLoadUI: function( url ) {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ])
            return;
        var json = ccs.load( url );
        var ui = json.node;

        var node = new DraggableNode( ui.getContentSize() );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );

        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );

        node.armature = null;
        node.ui = ui;

        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;

        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    onLoadCocosStuido : function( url ) {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ])
            return;
        var json = ccs.load( url );
        var ui = json.node;

        var size = ui.getContentSize();
        if(size.width < 0.01 || size.height < 0.01){
            size = ui.getBoundingBoxToWorld();
        }

        var node = new DraggableNode( size );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );

        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );

        node.armature = null;
        node.ui = ui;
        node.cocosAction = json.action;
        if(node.cocosAction){
            node.runAction(node.cocosAction); //타임라인 액션을 적용한 객체 붙임
        }

        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;

        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    reOrderup : function (nodeName, orderPlus) {
        nodeName = this._itemList.getSelectedName();

        var node = this._nodeList[ nodeName ];
        if(!node)
            return;

        var index = node.order;
        var changeIndex =index
        if(orderPlus)  {
            changeIndex =index + 1;
        }
        else {
            changeIndex =index - 1;
        }

        if(changeIndex >=0 && changeIndex  < this._nodeOrder.length) {
            var changeNode = this._nodeOrder[changeIndex];
            var temp =   changeNode.order;
            changeNode.order = node.order;
            node.order = temp;

            this._nodeOrder[changeNode.order] = changeNode;
            this._nodeOrder[node.order] = node;
            changeNode.setLocalZOrder(10 + changeNode.order);
            node.setLocalZOrder(10 + node.order);
        }
        cc.log("[REORDER] : ",index, " <=> ", changeIndex, " [ " +  node.order);
    },

    _addToJsonListMenu: function( name , node )  {
        this._itemList.add(name, node,
            function ( type ) {
                switch(type){
                    case ItemListClickType.SELECT:
                        this.updateMenu( name );
                        break;
                    case ItemListClickType.DELETE:
                        this.deleteItem( name);
                        break;
                    case ItemListClickType.UP:
                        this.reOrderup( name , true);
                        break;
                    case ItemListClickType.DOWN:
                        this.reOrderup( name , false);
                        break;

                }
            }.bind(this));
    },

    updateMenu: function( name, finalNode ) {
        var selectNode = this._nodeList[ name ];
        toggleJSONUI(name.indexOf('(JSON)') !== -1  );
        if( !selectNode ) return;

        selectNode.setName(name);
        if( selectNode.armature) {
            this._animationList.setVisible(true);
            var animations =  selectNode.armature.getAnimation();
            var animNameArr = animations._animationData.movementNames;

            var playCb = function ( animName) {
                animations.play(animName);
            };
            this._animationList.init(animNameArr,playCb);

            $('#LocalSize').html("(" + selectNode.armature.getContentSize().width.toFixed(2) + " , " +selectNode.armature.getContentSize().height.toFixed(2) + ")");
        }
        else{
            this._animationList.setVisible(false);
            this._animationList.init([],null);
        }

        this._movementCtrl.init(selectNode);
        this._treeView.setNode(selectNode, finalNode);

        this.setDraggableItem( name );
    },

    deleteItem : function ( name) {
        var selectNode = this._nodeList[ name ];
        if(selectNode) {
            if(Target === selectNode)
                Target = null;
            var order = selectNode.order;
            selectNode.removeFromParent();
            this._animationList.setVisible(false);
            this._animationList.init([],null);

            delete this._nodeList[ name ];
            this._movementCtrl.init(null);
            for(var n = order; n < this._nodeOrder.length - 1; n++) {
                this._nodeOrder[n + 1].order =n;
                this._nodeOrder[n] = this._nodeOrder[n + 1];
                this._nodeOrder[n].setLocalZOrder(1000 - this._nodeOrder[n].order);
            }
            this._nodeOrder.pop();
            this._treeView.setNode(null);
        }

    },

    setDraggableItem: function( name ) {
        for( var nodeName in this._nodeList ) {
            if( typeof this._nodeList[ nodeName ].setDraggable === 'function' ) {
                this._nodeList[ nodeName ].setDraggable( false );
                if(Target ===  this._nodeList[ nodeName ])
                    Target = null;
            }
        }
        if( this._nodeList.hasOwnProperty( name ) ) {
            this._nodeList[ name ].setDraggable( true );
            Target = this._nodeList[ name ];
        }
    },

    onExit: function() {
        cc.eventManager.removeListener( this._loadArmatureListener );
        cc.eventManager.removeListener( this._loadUIListener );
        cc.eventManager.removeListener( this._loadCocosStudioListener );
        this._super();
    },

    /////////////////////////

    setSlotResource: function( name )  {
        this._resourceList.add(name,
            function ( type ) {
                switch(type){
                    case ItemListClickType.SELECT:
                        this.updateMenu( name );
                        break;
                    case ItemListClickType.DELETE:
                        this.deleteItem( name);
                        break;
                    case ItemListClickType.UP:
                        this.reOrderup( name , true);
                        break;
                    case ItemListClickType.DOWN:
                        this.reOrderup( name , false);
                        break;

                }
            }.bind(this));

        // this.setDraggableItem( name );
    },
});



var MainLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        /**
         * Init loader
         */
        Loader.init();

        if (typeof ElectronRenderer != 'undefined')
            ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild( layer, 1, "MainLayer" );

        var self = this;
        cc.eventManager.addListener( {
            event: cc.EventListener.MOUSE,
            onMouseDown: function( event ) {
                var nodeObj = self.getFrontTouchedNode( event.getLocation() );
                if( nodeObj.node ) {
                    layer.updateMenu( nodeObj.nodeName, nodeObj.finalNode );
                    setTimeout(function(){
                        $('#fileNameTree').jstree("deselect_all");
                        $('#fileNameTree').jstree('select_node',nodeObj.node.__instanceId);
                    },100);
                }
            },
            swallowTouches: false
        }, this );
    },

    getFrontTouchedNode: function( touchPos ) {
        var maxZOrderList = [];
        var frontNode = null;
        var frontNodeName = '';
        var zOrderList = [];
        var node = null;

        var updateData = function( zOrderList, node, name ) {
            maxZOrderList = zOrderList;
            frontNode = node;
            frontNodeName = name;
        };

        for( var name in NodeList ) {
            if( NodeList.hasOwnProperty( name ) ) {
                node = NodeList[ name ];
                var isOver = cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPos);
                if( !isOver ) {
                    continue;
                }

                zOrderList = this.getZOrderList( node );
                if( maxZOrderList.length > 0 ) {
                    var determined = false;
                    for( var i = 0; i < zOrderList.length && i < maxZOrderList.length; i++ ) {
                        if( zOrderList[ i ] > maxZOrderList[ i ] ) {
                            updateData( zOrderList, node, name );

                            determined = true;
                            break;
                        } else if( zOrderList[ i ] < maxZOrderList[ i ] ) {
                            determined = true;
                            break;
                        }
                    }

                    if( !determined && zOrderList.length > maxZOrderList.length ) {
                        updateData( zOrderList, node, name );
                    }
                } else {
                    updateData( zOrderList, node, name );
                }
            }
        }
        var finalNode = this.recursiveCheckNode(frontNode, touchPos);
        return {
            node: frontNode,
            nodeName: frontNodeName,
            finalNode : finalNode
        };
    },

    recursiveCheckNode: function(node, touchpos){
        var flag = false;

        if(!node || !node.children) return node;

        for (var idx = 0; idx < node.children.length; idx++) {
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return this.recursiveCheckNode(node.children[idx], touchpos);
            }
        }

        if (flag === false) {
            return node;
        }

    },

    getZOrderList: function( node ) {
        var zOrderList = [];
        for( let p = node; !!p; p = p.getParent() ) {
            zOrderList.unshift( p.zIndex );
        }
        return zOrderList;
    },

    onExit: function() {
        ScreenUtil.removeAllResizeListener();

        this._super();
    }
});