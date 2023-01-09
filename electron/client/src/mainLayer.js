var Target = null;
var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    NODE_MENU_TAG: 100,
    JSON_LIST_MENU_TAG: 101,
    ctor: function () {
        this._super();

        this.CX = DEFAULT_SCREEN_SIZE.x / 2;
        this.CY = DEFAULT_SCREEN_SIZE.y / 2;
        // let size = cc.winSize;
        // this.CX = size.width / 2;
        // this.CY = size.height / 2;
        this.ViewScale = {x: 1, y: 1};


        let self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function (event) {
            self.onLoadArmature(JSON.parse(event.getUserData()));
        });

        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function (event) {
            self.onLoadUI(event.getUserData());
        });

        this._animationList = new uiAnimationTreeView();
        this._animationList.setContentSize(cc.size(150, 200));
        this._animationList.setVisible(false);
        this.addChild(this._animationList, -128);
        this._animationList.setLocalZOrder(100000);

        this._uiList = new uiTreeView(this.refreshProperties.bind(this));
        this._uiList.setContentSize(cc.size(150, 200));
        this._uiList.setVisible(false);
        this.addChild(this._uiList, -128);
        this._uiList.setLocalZOrder(100000);

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

        this._properties = new Properties();
        this.addChild(this._properties, -128);
        this._properties.setLocalZOrder(100000);
        this._properties.setContentSize(cc.size(150, 300));
        this._properties.setVisible(false);

        let canvasNode1 = new cc.Node();
        this.addChild(canvasNode1, 0, type_tab.type_hierarchy);
        canvasNode1.setPosition(this.CX, this.CY);

        let canvasNode2 = new cc.Node();
        this.addChild(canvasNode2, 0, type_tab.type_symbol);
        canvasNode2.setPosition(this.CX, this.CY);


        this.onResize();
        ScreenUtil.addResizeListener(this.onResize, this);

        let lineH = new cc.DrawNode();
        lineH.drawSegment(
            cc.p(-DEFAULT_SCREEN_SIZE.x, DEFAULT_SCREEN_SIZE.y / 2),
            cc.p(DEFAULT_SCREEN_SIZE.x, DEFAULT_SCREEN_SIZE.y / 2),
            0.5,
            cc.Color(255, 0, 0, 255)
        );
        this.addChild(lineH);
        lineH.setLocalZOrder(-1);

        let lineV = new cc.DrawNode();
        lineV.drawSegment(
            cc.p(DEFAULT_SCREEN_SIZE.x / 2, -DEFAULT_SCREEN_SIZE.y),
            cc.p(DEFAULT_SCREEN_SIZE.x / 2, DEFAULT_SCREEN_SIZE.y),
            0.5,
            cc.Color(255, 0, 0, 255)
        );
        this.addChild(lineV);
        lineV.setLocalZOrder(-1);
        this.scheduleUpdate();

        this.SceneNodeIndex = 1;
        this.SymbolNodeIndex = 1;
        return true;
    },
    update: function (dt) {
    },
    onResize: function () {
        let sx = cc.winSize.width / DEFAULT_SCREEN_SIZE.x;
        let sy = cc.winSize.height / DEFAULT_SCREEN_SIZE.y;
        this.ViewScale = {x: sx, y: sy};
        this.CX = DEFAULT_SCREEN_SIZE.x / 2;
        this.CY = DEFAULT_SCREEN_SIZE.y / 2;
        //this.getChildByTag(Tool_Select_Type).setScale(sx, sx);

        // this._animationList.setScale(sx, sy);
        // this._resourceList.setScale(sx, sy);
        // this._hierarchy.setScale(sx, sy);
        // this._skins.setScale(sx, sy);
    },
    initUI: function (checkDelete) {
        Tool.refreshCanvasNode()
        Tool._skins.initRefresh(checkDelete);
        Tool._hierarchy.deselectAll();
        Tool._animationList.initRefresh();
        Tool._properties.initRefresh();
    },

    onLoadArmature: function (ids) {
        let children = this.getChildren();

        let self = this;
        children.forEach(function (c) {
            if (c.getTag() === self.DESC_TAG) {
                c.removeFromParent();
            }
        });

        cc.each(ids, function (name, index) {
            let armature = new ccs.Armature(name);

            let node = new DraggableNode(armature.getContentSize());
            node.setAnchorPoint(0.5, 0.5);
            node.setPosition(0, 0);

            let parent = this.getChildByTag(Tool_Select_Type);
            parent.addChild(node);

            let skinList = getSkinList(armature.armatureData.boneDataDic);
            if (skinList.length > 0) {
                this.changeNodeSkin(armature, skinList, 0, true);
            }

            node.addChildToCenter(armature);
            node.armature = armature;
            node.ui = null;
            node.setLocalZOrder(0);
            NodeList[Tool_Select_Type].push(node);
            this._addToJsonListMenu(name, node);

            SlotLoader.armatureIDs = {};
            SlotLoader.armatureFrames = {};
            SlotLoader.uiURL = {};
            SlotLoader.cocosStudioURL = {};
            SlotLoader.uiTextures = {};
            SlotLoader.loadSymbol();
            SlotLoader.loadScene();
        }, this);
    },

    refreshCanvasNode: function () {
        if (Tool_Select_Type === type_tab.type_hierarchy) {
            let parent1 = this.getChildByTag(type_tab.type_hierarchy);
            parent1.setVisible(true);
            let parent2 = this.getChildByTag(type_tab.type_symbol);
            parent2.setVisible(false);
        } else {
            let parent1 = this.getChildByTag(type_tab.type_hierarchy);
            parent1.setVisible(false);
            let parent2 = this.getChildByTag(type_tab.type_symbol);
            parent2.setVisible(true);
        }
    },

    onLoadUI: function (url) {
        if (Tool_Select_Type === type_tab.type_symbol) {
            cc.log('Hiearchy addSymbols - AR files only')
            return;
        }

        let children = this.getChildren();

        let self = this;
        children.forEach(function (c) {
            if (c.getTag() === self.DESC_TAG) {
                c.removeFromParent();
            }
        });

        let name = cc.path.mainFileName(url);


        let json = ccs.load(url);
        let ui = ccs.uiReader.widgetFromJsonFile(url);
        let node = new DraggableNode(ui.getContentSize());
        node.setAnchorPoint(0.5, 0.5);
        node.setPosition(0, 0);

        let parent = this.getChildByTag(Tool_Select_Type);
        parent.addChild(node);

        node.addChildToCenter(ui);
        node.armature = null;
        node.ui = ui;
        node.setLocalZOrder(0);
        NodeList[Tool_Select_Type].push(node);
        this._addToJsonListMenu(name, node);

        SlotLoader.armatureIDs = {};
        SlotLoader.armatureFrames = {};
        SlotLoader.uiURL = {};
        SlotLoader.cocosStudioURL = {};
        SlotLoader.uiTextures = {};
        SlotLoader.loadScene();
    },

    _addToJsonListMenu: function (name, node) {
        this._hierarchy.add(name, node,
            function (type, index) {
                switch (type) {
                    case ItemListClickType.SELECT:
                        this.updateMenu(name, index);
                        break;
                    case ItemListClickType.DELETE:
                        this.deleteItem();
                        break;
                    default:
                        break;

                }
            }.bind(this));
    },

    refreshNodeSkin: function () {
        let skinInfo = getSkinData();
        if (skinInfo === null) return;

        let selectNode = getSelectNode();
        if (!selectNode) return;
        //
        // let pos = selectNode.getParent().convertToNodeSpace({x: skinInfo.posX, y: skinInfo.posY});
        // pos.x += this.CX
        // pos.y += this.CY

        let pos = {x: skinInfo.posX + skinInfo.offsetX, y: skinInfo.posY + skinInfo.offsetY};

        selectNode.setPosition(pos);
        selectNode.setScale(skinInfo.scaleX, skinInfo.scaleY);
        //selectNode.setAnchorPoint(skinInfo.anchorX, skinInfo.anchorY);

        if (!!selectNode.armature) {
            let skinList = getSkinList(selectNode.armature.armatureData.boneDataDic);
            if (skinList.length > 0) {
                this.changeNodeSkin(selectNode.armature, skinList, skinInfo.skinindex, true);
            }
            this.refreshProperties(selectNode.armature);
        } else if (!!selectNode.ui) {
            this.refreshProperties(selectNode.ui);
        }
    },

    changeNodeSkin: function (node, skinList, skinIndex) {
        SlotUtils.arUtil.changeSkin(node, skinList, skinIndex, true);
    },

    updateMenu: function (name, index) {
        selectIndex = index;
        let selectNode = null;
        let skinNode = getSkinData();
        if (skinNode === null) return;

        selectNode = getSelectNode();
        if (!selectNode) return;

        toggleJSONUI(name.indexOf('(JSON)') !== -1);

        selectNode.setName(name);
        if (selectNode.armature) {
            this._uiList.setVisible(false);

            this._animationList.setVisible(true);
            let animations = selectNode.armature.getAnimation();
            let animNameArr = animations._animationData.movementNames;

            let skinList = getSkinList(selectNode.armature.armatureData.boneDataDic);
            if (skinList.length > 0) {
                this.changeNodeSkin(selectNode.armature, skinList, skinNode.skinindex, true);
            }

            let playCb = function (animName) {
                animations.play(animName);
            };
            this._animationList.setAnimations(animNameArr, playCb);
            this._skins.show(selectNode.armature.armatureData.boneDataDic, skinNode);
            this.refreshProperties(selectNode.armature);
        } else {
            this._animationList.setVisible(false);
            this._animationList.setAnimations([], null);
            //this._uiList.setNode(selectNode);
            this.refreshProperties(selectNode.ui);
        }
        this.setDraggableItem();
    },
    Test: function (node) {
        let addX = node.getPosition().x;
        setMoveXData(addX);
        let addY = node.getPosition().y;
        setMoveYData(addY);

        if (!!node.armature) {
            this.refreshProperties(node.armature);
        } else if (!!node.ui) {
            this.refreshProperties(node.ui);
        }
    },
    refreshProperties: function (node) {
        let skinInfo = getSkinData();

        let localPosition = {x: skinInfo.posX, y: skinInfo.posY};
        let pos = {
            x: node.getParent().getPosition().x,// + skinInfo.offsetX,
            y: node.getParent().getPosition().y// + skinInfo.offsetY
        };
        let worldPosition = this.getChildByTag(type_tab.type_hierarchy).convertToWorldSpace(pos);
        let contentSize = node.getContentSize();
        let scale = {x: node.getScaleX(), y: node.getScaleY()};
        let anchor = node.getParent().getAnchorPoint();
        this._properties.init(skinInfo, localPosition, worldPosition, contentSize, scale, anchor);
    },

    deleteItem: function () {
        this.initUI(true);
    },

    setDraggableItem: function () {
        for (let index in NodeList[Tool_Select_Type]) {
            if (typeof NodeList[Tool_Select_Type][index].setDraggable === 'function') {
                NodeList[Tool_Select_Type][index].setDraggable(false);
                if (Target === NodeList[Tool_Select_Type][index])
                    Target = null;
            }
        }

        let realIndex = getRealIndex();
        if (NodeList[Tool_Select_Type].hasOwnProperty(realIndex)) {
            NodeList[Tool_Select_Type][realIndex].setDraggable(true);
            Target = NodeList[Tool_Select_Type][realIndex];
        }
    },

    onExit: function () {
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        this._super();
    },

    /////////////////////////

    setSlotResource: function (name) {
        this._resourceList.add(name);
    },

    setSceneLoaded: function () {
        // this.SceneNodeIndex = 1;
        // this.SymbolNodeIndex = 1;

        for (let key in SkinList[Tool_Select_Type]) {
            let currentSkin = SkinList[Tool_Select_Type][key];
            let currentNode = NodeList[Tool_Select_Type][key];
            let uiID = currentSkin.uiID;

            let info = sceneLoadData.Hierarchy[uiID.toString()];
            if (info != undefined && currentSkin.uiID < 1000) {
                let parentID = parseInt(info.parent);
                if (parentID != -1) {
                    let parentNode = getNode(parentID);
                    currentNode.removeFromParent(false);
                    parentNode.addChild(currentNode);

                    let pos = {
                        x: parentNode.getContentSize().width / 2 + currentSkin.posX,
                        y: parentNode.getContentSize().height / 2 + currentSkin.posY,
                    }
                    currentNode.setPosition(pos);
                } else {

                    let pos = {
                        x: currentSkin.posX,
                        y: currentSkin.posY,
                    }
                    currentNode.setPosition(pos);
                }
            }
            !!currentNode.setDraggable && currentNode.setDraggable(false);
        }
    },

    createUIChildList: function (node) {
        if (!node)
            return null;
        let childList = [];
        let children = node.getChildren();
        for (let i = 0; i < children.length; i++) {
            childList[i] = {};
            childList[i].info = {};
            childList[i].info.obj = children[i];
            childList[i].info.name = children[i].getName();
            childList[i].info.initScale = children[i].getScale();
            childList[i].info.initScaleX = children[i].getScaleX();
            childList[i].info.initScaleY = children[i].getScaleY();
            childList[i].info.id = children[i].__instanceId;
            childList[i].childList = this.createUIChildList(children[i]);
        }
        return childList;
    },

    clear: function () {
        SkinList[type_tab.type_hierarchy] = [];
        SkinList[type_tab.type_symbol] = [];

        for (let i = 0; i < NodeList[type_tab.type_hierarchy].length; ++i) {
            NodeList[type_tab.type_hierarchy][i].removeFromParent(true);
        }
        for (let i = 0; i < NodeList[type_tab.type_symbol].length; ++i) {
            NodeList[type_tab.type_symbol][i].removeFromParent(true);
        }
        NodeList[type_tab.type_hierarchy] = [];
        NodeList[type_tab.type_symbol] = [];
    }
});


let MainLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        /**
         * Init loader
         */
        Loader.init();
        SlotLoader.init();

        if (typeof ElectronRenderer != 'undefined')
            ElectronRenderer.init();

        let layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");

        Tool = layer;
        Tool.initUI(false);
    },


    recursiveCheckNode: function (node, touchpos) {
        let flag = false;

        if (!node || !node.children) return node;

        for (let idx = 0; idx < node.children.length; idx++) {
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