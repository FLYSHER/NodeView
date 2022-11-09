//http://cocos.sonarlearning.co.uk/docs/action-animations-aka-easing
//http://cocos2d-x.org/js-tests/
//  Target.runAction(
//                cc.sequence(
//                    cc.delayTime(0.1),
//                    cc.moveTo(0.25, x, y).easing(cc.easeBackOut()),
//                    cc.callFunc(function () {  }
//                    ))

var Target = null;

var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    NODE_MENU_TAG: 100,
    JSON_LIST_MENU_TAG: 101,

    _animationList: null,
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function (event) {
            self.onLoadArmature(JSON.parse(event.getUserData()));
        });

        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function (event) {
            self.onLoadUI(event.getUserData());
        });

        //this._nodeList = {};
        this._nodeList = [];
        this._nodeOrder = [];

        this._animationList = new UIListViewTest();
        this._animationList.setContentSize(cc.size(150, 200));
        this._animationList.setVisible(false);
        this.addChild(this._animationList, -128);
        this._animationList.setLocalZOrder(100000);

        this._movementCtrl = new UiPositionCtrl();
        this.addChild(this._movementCtrl, -128);
        this._movementCtrl.setLocalZOrder(100000);


        this._resourceList = new uiList();
        this.addChild(this._resourceList, -128);
        this._resourceList.setLocalZOrder(100000);
        this._resourceList.setContentSize(cc.size(150, 300));
        this._resourceList.setVisible(false);

        this._hierarchy = new Hierarchy();
        this.addChild(this._hierarchy, -128);
        this._hierarchy.setLocalZOrder(100000);
        this._hierarchy.setContentSize(cc.size(150, 300));
        this._hierarchy.setVisible(false);

        this._skins = new Skins();
        this.addChild(this._skins, -128);
        this._skins.setLocalZOrder(100000);
        this._skins.setContentSize(cc.size(150, 300));
        this._skins.setVisible(false);

        let canvasNode1 = new cc.Node();
        this.addChild(canvasNode1, 0, type_tab.type_hierarchy);

        let canvasNode2 = new cc.Node();
        this.addChild(canvasNode2, 0,type_tab.type_symbol);

        return true;
    },
    /*
    -리소스 컨트롤 방식 (기존거 잊어버리고)
     AR : anchor 는 만지지않는다. (Tool에서 컨트롤)
          position으로 배치를 한다.

     UI : anchor를  0.5 ,0.5 로 배치를 하고
          position 를 AR와 같이간다.
     */
    onLoadArmature: function (ids) {
        var children = this.getChildren();

        var self = this;
        children.forEach(function (c) {
            if (c.getTag() === self.DESC_TAG) {
                c.removeFromParent();
            }
        });

        cc.each(ids, function (name, index) {
            var armature = new ccs.Armature(name);

            var node = new DraggableNode(armature.getContentSize());
            //node.setAnchorPoint( 0.5, 0.5 );
            node.setPosition(this.CX - armature.getContentSize().width * 0.5, this.CY - armature.getContentSize().height * 0.5);

            // addChild 순서 중요!
            // armature가 draggableNode에 addChild되면 contentSize가 바뀜
            //this.addChild(node);

            let parent = this.getChildByTag(Tool_Select_Type);
            parent.addChild(node);

            node.addChildToCenter(armature);
            node.armature = armature;
            node.ui = null;
            node.order = this._nodeOrder.length;
            node.setLocalZOrder(10 + node.order);
            this._nodeOrder[node.order] = node;

            NodeList[Tool_Select_Type].push(node);

            this._addToJsonListMenu(name, node);
        }, this);
    },

    refreshCanvasNode: function(){
        if(Tool_Select_Type === type_tab.type_hierarchy){
            let parent1 = this.getChildByTag(type_tab.type_hierarchy);
            parent1.setVisible(true);
            let parent2 = this.getChildByTag(type_tab.type_symbol);
            parent2.setVisible(false);
        }else {
            let parent1 = this.getChildByTag(type_tab.type_hierarchy);
            parent1.setVisible(false);
            let parent2 = this.getChildByTag(type_tab.type_symbol);
            parent2.setVisible(true);
        }
    },

    onLoadUI: function (url) {
        var children = this.getChildren();

        var self = this;
        children.forEach(function (c) {
            if (c.getTag() === self.DESC_TAG) {
                c.removeFromParent();
            }
        });

        var name = cc.path.mainFileName(url);

        var json = ccs.load(url);
        var ui = json.node;

        var node = new DraggableNode(ui.getContentSize());
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(this.CX, this.CY);
        this.addChild(node);

        ui.setAnchorPoint(0.5, 0.5);
        node.addChildToCenter(ui);

        node.armature = null;
        node.ui = ui;

        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;

        NodeList[Tool_Select_Type].push(node);
        this._addToJsonListMenu(name, node);
    },

    reOrderup: function (nodeName, orderPlus) {
        nodeName = this._hierarchy.getSelectedName();

        var node = this._nodeList[nodeName];
        if (!node)
            return;

        var index = node.order;
        var changeIndex = index
        if (orderPlus) {
            changeIndex = index + 1;
        } else {
            changeIndex = index - 1;
        }

        if (changeIndex >= 0 && changeIndex < this._nodeOrder.length) {
            var changeNode = this._nodeOrder[changeIndex];
            var temp = changeNode.order;
            changeNode.order = node.order;
            node.order = temp;

            this._nodeOrder[changeNode.order] = changeNode;
            this._nodeOrder[node.order] = node;
            changeNode.setLocalZOrder(10 + changeNode.order);
            node.setLocalZOrder(10 + node.order);
        }
        cc.log("[REORDER] : ", index, " <=> ", changeIndex, " [ " + node.order);
    },

    _addToJsonListMenu: function (name, node) {
        this._hierarchy.add(name, node,
            function (type, index) {
                switch (type) {
                    case ItemListClickType.SELECT:
                        this.updateMenu(name, index);
                        break;
                    case ItemListClickType.DELETE:
                        this.deleteItem(name);
                        break;
                    case ItemListClickType.UP:
                        this.reOrderup(name, true);
                        break;
                    case ItemListClickType.DOWN:
                        this.reOrderup(name, false);
                        break;

                }
            }.bind(this));
    },

    updateMenu: function (name, index) {
        let selectNode = null;
        let skinNode = null;

        for (let key in SkinList[Tool_Select_Type]) {
            let info = SkinList[Tool_Select_Type][key];
            if (info.index === index) {
                skinNode = info;
            }
        }

        if (skinNode === null) {
            return;
        }
        selectNode = NodeList[Tool_Select_Type][skinNode.index];

        toggleJSONUI(name.indexOf('(JSON)') !== -1);
        if (!selectNode) return;

        selectNode.setName(name);
        if (selectNode.armature) {
            this._animationList.setVisible(true);
            var animations = selectNode.armature.getAnimation();
            var animNameArr = animations._animationData.movementNames;

            var playCb = function (animName) {
                animations.play(animName);
            };
            this._animationList.setAnimations(animNameArr, playCb);
            this._skins.show(selectNode.armature.armatureData.boneDataDic, skinNode);
            $('#LocalSize').html("(" + selectNode.armature.getContentSize().width.toFixed(2) + " , " + selectNode.armature.getContentSize().height.toFixed(2) + ")");
        } else {
            this._animationList.setVisible(false);
            this._animationList.setAnimations([], null);
        }

        this._movementCtrl.init(selectNode);
        this.setDraggableItem(name);
    },

    deleteItem: function (name) {
        var selectNode = this._nodeList[name];
        if (selectNode) {
            if (Target === selectNode)
                Target = null;
            var order = selectNode.order;
            selectNode.removeFromParent();
            this._animationList.setVisible(false);
            this._animationList.init([], null);

            delete this._nodeList[name];
            this._movementCtrl.init(null);
            for (var n = order; n < this._nodeOrder.length - 1; n++) {
                this._nodeOrder[n + 1].order = n;
                this._nodeOrder[n] = this._nodeOrder[n + 1];
                this._nodeOrder[n].setLocalZOrder(1000 - this._nodeOrder[n].order);
            }
            this._nodeOrder.pop();
        }
    },

    setDraggableItem: function (name) {
        for (var nodeName in NodeList[Tool_Select_Type]) {
            if (typeof NodeList[Tool_Select_Type][nodeName].setDraggable === 'function') {
                NodeList[Tool_Select_Type][nodeName].setDraggable(false);
                if (Target === NodeList[Tool_Select_Type][nodeName])
                    Target = null;
            }
        }
        if (NodeList[Tool_Select_Type].hasOwnProperty(name)) {
            NodeList[Tool_Select_Type][name].setDraggable(true);
            Target = NodeList[Tool_Select_Type][name];
        }
    },

    onExit: function () {
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        this._super();
    },

    /////////////////////////

    setSlotResource: function (name) {
        this._resourceList.add(name,
            function (type) {
                switch (type) {
                    case ItemListClickType.SELECT:
                        this.updateMenu(name);
                        break;
                    case ItemListClickType.DELETE:
                        //this.deleteItem(name);
                        break;
                    case ItemListClickType.UP:
                        //this.reOrderup(name, true);
                        break;
                    case ItemListClickType.DOWN:
                        //this.reOrderup(name, false);
                        break;

                }
            }.bind(this));

        // this.setDraggableItem( name );
    },
});



var MainLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        /**
         * Init loader
         */
        Loader.init();

        if (typeof ElectronRenderer != 'undefined')
            ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");

        Tool = layer;
    },


    recursiveCheckNode: function (node, touchpos) {
        var flag = false;

        if (!node || !node.children) return node;

        for (var idx = 0; idx < node.children.length; idx++) {
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return this.recursiveCheckNode(node.children[idx], touchpos);
            }
        }

        if (flag === false) {
            return node;
        }

    },

    onExit: function () {
        ScreenUtil.removeAllResizeListener();

        this._super();
    }
});