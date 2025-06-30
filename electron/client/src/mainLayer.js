var NodeList = null;
var Target = null;
var TempTargetPos = null;
var TempTargetScale = null;
var TempTargetRot = null;
var TargetRunActionData = null;

var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    _animationList: null,
    _canvasResizeListener: null,
    _currentlySelectedNode: null,

    ctor: function () {
        this._super();

        this.assetLibrary = {};
        this.sceneNodes = {};
        this.nodeMap = {};

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;
        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function (event) { self.onLoadArmature(JSON.parse(event.getUserData())); });
        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function (event) { self.onLoadUI(event.getUserData()); });
        this._loadCocosStudioListener = cc.eventManager.addCustomListener('loadCocosStudio', function (event) { self.onLoadCocosStuido(event.getUserData()); });
        this._loadSpineListener = cc.eventManager.addCustomListener('loadSpine', function (event) { self.onLoadSpine(event.getUserData()); });
        this._loadImageListener = cc.eventManager.addCustomListener('loadImage', function (event) { self.onLoadImage(event.getUserData()); });

        this._canvasResizeListener = cc.eventManager.addCustomListener('canvas-resize', this.updateLayout.bind(this));

        this._nodePositionChangedListener = cc.eventManager.addCustomListener('node_position_changed', function (event) {
            const eventData = event.getUserData();
            if (eventData && eventData.nodeId) {
                self.updateMenuWithNodeId(eventData.nodeId);
            }
        });

        var label = new cc.LabelTTF("파일을 이쪽으로 드래그해 주세요", "Arial", 30);
        label.setPosition(this.CX, this.CY);
        this.addChild(label, 0, this.DESC_TAG);

        this._nodeList = {};
        this._nodeOrder = [];
        this._movementCtrl = new UiPositionCtrl();
        this._itemList = new UIItemList(this);
        this._treeView = new UIScrollTreeViewCtrl(this);
        this._treeView.setup();

        this._contextMenuManager = new ContextMenuManager(this);
        this._deletionManager = new DeletionManager(this);
        Sequencer.initialize(this);
        return true;
    },

    updateLayout: function () {
        const oldCX = this.CX;
        const oldCY = this.CY;

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        var label = this.getChildByTag(this.DESC_TAG);
        if (label) {
            label.setPosition(this.CX, this.CY);
        }

        if (oldCX && oldCY && this._nodeList) {
            for (const name in this._nodeList) {
                if (this._nodeList.hasOwnProperty(name)) {
                    const node = this._nodeList[name];
                    const currentPos = node.getPosition();
                    const relativeX = currentPos.x - oldCX;
                    const relativeY = currentPos.y - oldCY;
                    const newX = this.CX + relativeX;
                    const newY = this.CY + relativeY;
                    node.setPosition(newX, newY);
                }
            }
        }

        if (oldCX && oldCY && this.sceneNodes) {
            for (const name in this.sceneNodes) {
                if (this.sceneNodes.hasOwnProperty(name)) {
                    const node = this.sceneNodes[name];
                    const currentPos = node.getPosition();
                    const relativeX = currentPos.x - oldCX;
                    const relativeY = currentPos.y - oldCY;
                    const newX = this.CX + relativeX;
                    const newY = this.CY + relativeY;
                    node.setPosition(newX, newY);
                }
            }
        }
    },

    deleteAsset: function (assetName, assetType) {
        this._deletionManager.deleteAssetDefinition(assetName, assetType);
    },

    // *** 핵심 수정: MainLayer에 deleteItem 메서드를 다시 추가하고 DeletionManager에 위임 ***
    deleteItem: function (cocosNodeIdToDelete) {
        this._deletionManager.deleteSceneNode(cocosNodeIdToDelete);
    },
    // *** 수정 끝 ***

    refreshAssetsPanel: function () {
        const $container = $('#fileNameTree');
        $container.empty();

        for (const key in this.assetLibrary) {
            if (this.assetLibrary.hasOwnProperty(key)) {
                this._itemList.addAsset(this.assetLibrary[key]);
            }
        }
    },

    onLoadArmature: function (ids) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function (c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        cc.each(ids, function (name, index) {
            const assetKey = `${name}_armature`;
            if (this.assetLibrary[assetKey]) {
                return;
            }

            const assetInfo = {
                type: 'armature',
                name: name
            };
            this.assetLibrary[assetKey] = assetInfo;
        }, this);
        this.refreshAssetsPanel();
    },

    onLoadUI: function (url) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function (c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        var name = cc.path.mainFileName(url);
        const assetKey = `${name}_ui`;
        if (this.assetLibrary[assetKey]) {
            return;
        }

        const assetInfo = {
            type: 'ui',
            name: name,
            url: url
        };
        this.assetLibrary[assetKey] = assetInfo;
        this.refreshAssetsPanel();
    },

    onLoadSpine: function (fileName) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function (c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        var name = cc.path.mainFileName(fileName);
        const assetKey = `${name}_spine`;

        if (this.assetLibrary[assetKey]) {
            return;
        }

        const assetInfo = {
            type: 'spine',
            name: name
        };
        this.assetLibrary[assetKey] = assetInfo;
        this.refreshAssetsPanel();
    },

    onLoadCocosStuido: function (url) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function (c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        var name = cc.path.mainFileName(url);
        const assetKey = `${name}_cocosstudio`;
        if (this.assetLibrary[assetKey]) {
            return;
        }

        const assetInfo = {
            type: 'cocosstudio',
            name: name,
            url: url
        };
        this.assetLibrary[assetKey] = assetInfo;
        this.refreshAssetsPanel();
    },

    onLoadImage: function (fileName) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function (c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        const assetKey = `${fileName}_image`;
        if (this.assetLibrary[assetKey]) {
            return;
        }

        const assetInfo = {
            type: 'image',
            name: fileName,
            url: fileName + '.png'
        };
        const textureCheck = cc.loader.getRes(assetInfo.url);
        if (!textureCheck) {
            return;
        }

        this.assetLibrary[assetKey] = assetInfo;
        this.refreshAssetsPanel();
    },

    createInstanceFromLibrary: function (assetName, assetType) {
        let assetInfo = null;
        const assetKey = `${assetName}_${assetType}`;
        assetInfo = this.assetLibrary[assetKey];

        if (!assetInfo) {
            return;
        }

        let instanceName = assetInfo.name;
        let count = 1;
        while (this.sceneNodes[instanceName]) {
            instanceName = `${assetInfo.name} (${count})`;
            count++;
        }

        let node = null;
        let contentNode = null;

        switch (assetInfo.type) {
            case 'armature':
                contentNode = new ccs.Armature(assetInfo.name);
                node = new DraggableNode(contentNode.getContentSize());
                node.setPosition(this.CX - contentNode.getContentSize().width * 0.5, this.CY - contentNode.getContentSize().height * 0.5);
                node.armature = contentNode;
                node.assetType = 'armature';
                break;

            case 'spine':
                const spineJsonUrl = assetInfo.name + ".json";
                const spineAtlasUrl = assetInfo.name + ".atlas";

                const jsonContent = cc.loader.getRes(spineJsonUrl);
                const atlasContent = cc.loader.getRes(spineAtlasUrl);

                if (!jsonContent) {
                    return;
                }
                if (!atlasContent) {
                    return;
                }

                try {
                    contentNode = sp.SkeletonAnimation.createWithJsonFile(spineJsonUrl, spineAtlasUrl, 1.0);
                } catch (e) {
                    return;
                }

                if (!contentNode) {
                    return;
                }

                node = new DraggableNode(contentNode.getContentSize());
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);
                node.spine = contentNode;
                node.assetType = 'spine';
                break;

            case 'ui':
            case 'cocosstudio':
                var json = ccs.load(assetInfo.url);
                contentNode = json.node;
                var size = contentNode.getContentSize();
                if (size.width < 0.01 || size.height < 0.01) {
                    size = contentNode.getBoundingBoxToWorld();
                    if (size.width < 0.01 || size.height < 0.01) {
                        size = cc.size(100, 100);
                    } else {
                        size = cc.size(size.width, size.height);
                    }
                }
                node = new DraggableNode(size);
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);

                contentNode.setAnchorPoint(0.5, 0.5);

                node.ui = contentNode;
                if (json.action) {
                    node.cocosAction = json.action;
                    node.runAction(node.cocosAction);
                }
                node.assetType = assetInfo.type;
                node.actionUrl = assetInfo.url;
                break;

            case 'image':
                const texture = cc.loader.getRes(assetInfo.url);
                if (!texture) {
                    return;
                }
                contentNode = new cc.Sprite(texture);
                node = new DraggableNode(contentNode.getContentSize());
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);
                node.image = contentNode;
                node.assetType = 'image';
                break;

            default:
                return;
        }

        if (node && contentNode) {
            node.setName(instanceName);
            let maxZOrder = -1;
            this.getChildren().forEach(child => {
                if (child instanceof DraggableNode) {
                    if (child.getLocalZOrder() > maxZOrder) {
                        maxZOrder = child.getLocalZOrder();
                    }
                }
            });
            const newZOrder = maxZOrder + 1;
            node.setLocalZOrder(newZOrder);

            node.addChildToCenter(contentNode);
            this.addChild(node);
            this.sceneNodes[instanceName] = node;

            const addNodeToMap = (n) => {
                if (!n) return;
                this.nodeMap[n.__instanceId] = n;
                const children = n.getChildren();
                if (children) {
                    children.forEach(child => addNodeToMap(child));
                }
            };
            addNodeToMap(node);

            this.refreshHierarchyView();
        }
    },

    _buildChildrenRecursive: function (parentNode) {
        let childrenData = [];
        const children = parentNode.getChildren();
        const sortedChildren = children.slice().sort((a, b) => {
            return a.getLocalZOrder() - b.getLocalZOrder();
        });

        if (sortedChildren && sortedChildren.length > 0) {
            for (const child of sortedChildren) {
                if (child instanceof cc.DrawNode && child.getParent() instanceof DraggableNode) {
                    continue;
                }

                let textContent = child.getName() || "Unnamed Node";
                let typeClass = "type-child";
                let includeGrandchildren = true;

                if (parentNode instanceof DraggableNode) {
                    if (parentNode.ui === child) {
                        typeClass = "type-action-content";
                        textContent = `UI: ${textContent}`;
                    } else if (parentNode.armature === child) {
                        typeClass = "type-armature-content";
                        textContent = `AR: ${textContent}`;
                        includeGrandchildren = false;
                    } else if (parentNode.spine === child) {
                        typeClass = "type-spine-content";
                        textContent = `SP: ${textContent}`;
                        includeGrandchildren = false;
                    } else if (parentNode.image === child) {
                        typeClass = "type-image-content";
                        textContent = `IMG: ${textContent}`;
                        includeGrandchildren = false;
                    }
                }

                if (child instanceof DraggableNode) {
                    typeClass = `type-${child.assetType}`;
                    textContent = child.getName() || "Unnamed DraggableNode";
                    if (child.assetType === 'armature' || child.assetType === 'spine' || child.assetType === 'image') {
                        includeGrandchildren = false;
                    } else {
                        includeGrandchildren = true;
                    }
                }

                let zOrderText = child.getLocalZOrder();
                let childNodeData = {
                    id: child.__instanceId,
                    text: `<span class="z-order-label">[${zOrderText}]</span> ${textContent}`,
                    children: includeGrandchildren ? this._buildChildrenRecursive(child) : [],
                    data: {
                        nodeId: child.__instanceId,
                        zOrder: child.getLocalZOrder()
                    },
                    state: { opened: false },
                    a_attr: { "class": typeClass }
                };
                childrenData.push(childNodeData);
            }
        }
        return childrenData;
    },

    refreshHierarchyView: function () {
        let unifiedTreeData = [];
        const self = this;

        const topLevelNodes = this.getChildren().filter(node => node instanceof DraggableNode);

        topLevelNodes.sort((a, b) => {
            return a.getLocalZOrder() - b.getLocalZOrder();
        });

        topLevelNodes.forEach(draggableNode => {
            let zOrderText = draggableNode.getLocalZOrder();
            let nodeName = draggableNode.getName() || "Unnamed DraggableNode";
            let typeClass = `type-${draggableNode.assetType}`;

            let draggableNodeData = {
                id: draggableNode.__instanceId,
                text: `<span class="z-order-label">[${zOrderText}]</span> ${nodeName}`,
                children: this._buildChildrenRecursive(draggableNode),
                data: {
                    nodeId: draggableNode.__instanceId,
                    zOrder: draggableNode.getLocalZOrder()
                },
                state: { opened: false },
                a_attr: { "class": typeClass }
            };
            unifiedTreeData.push(draggableNodeData);
        });

        this._treeView.updateTreeView(unifiedTreeData);
    },

    updateMenuWithNodeId: function (nodeId) {
        if (!nodeId) {
            if (this._currentlySelectedNode !== null) {
                this._currentlySelectedNode = null;
            }
            this._treeView.setNode(null);
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.deselect_all(true);
            }
            return;
        }

        const node = this.nodeMap[nodeId];
        if (!node) {
            this.updateMenuWithNodeId(null);
            return;
        }

        let selectedDraggableNode = null;
        if (node instanceof DraggableNode) {
            selectedDraggableNode = node;
        } else {
            let parent = node.getParent();
            while (parent) {
                if (parent instanceof DraggableNode) {
                    selectedDraggableNode = parent;
                    break;
                }
                parent = parent.getParent();
            }
        }

        if (!selectedDraggableNode) {
            this.updateMenuWithNodeId(null);
            return;
        }

        if (this._currentlySelectedNode !== selectedDraggableNode) {
            this._currentlySelectedNode = selectedDraggableNode;
        }

        this._treeView.setNode(selectedDraggableNode);
        this.setDraggableItem(selectedDraggableNode.getName());
    },

    setDraggableItem: function (name) {
        for (var nodeName in this.sceneNodes) {
            if (typeof this.sceneNodes[nodeName].setDraggable === 'function') {
                this.sceneNodes[nodeName].setDraggable(false);
            }
        }
        if (name && this.sceneNodes.hasOwnProperty(name)) {
            this.sceneNodes[name].setDraggable(true);
            this._currentlySelectedNode = this.sceneNodes[name];
        }
    },

    getAnimationLength: function (node, animName) {
        if (!node || !animName) return 0;

        let contentNode = node.ui || node.armature || node.spine;

        var durationInSeconds = 0;

        switch (node.assetType) {
            case 'armature':
                try {
                    const animation = contentNode.getAnimation();
                    const movementData = animation._animationData.movementDataDic[animName];
                    if (movementData && movementData.duration) {
                        const durationInFrames = movementData.duration;
                        const speedScale = movementData.scale || 1;
                        durationInSeconds = (durationInFrames / speedScale) / 60.0;
                    }
                } catch (e) { durationInSeconds = 0; }
                break;

            case 'spine':
                try {
                    const animation = contentNode.getState().data.skeletonData.findAnimation(animName);
                    if (animation) {
                        durationInSeconds = animation.duration;
                    }
                } catch (e) { durationInSeconds = 0; }
                break;

            case 'ui':
            case 'cocosstudio':
                try {
                    let rawJsonData = null;
                    if (node.cocosAction && node.cocosAction.animation && node.cocosAction.animation.actionlist) {
                        rawJsonData = node.cocosAction;
                    }
                    else {
                        const url = node.actionUrl;
                        if (url && cc.loader.cache[url]) {
                            rawJsonData = cc.loader.cache[url];
                        }
                    }

                    if (rawJsonData && rawJsonData.animation && rawJsonData.animation.actionlist) {
                        const actionClipData = rawJsonData.animation.actionlist.find(clip => clip.name === animName);
                        if (actionClipData) {
                            const unitTime = (typeof actionClipData.unittime === 'number' && actionClipData.unittime > 0) ? actionClipData.unittime : (1 / 60);
                            let maxFrameId = 0;
                            if (actionClipData.actionnodelist) {
                                actionClipData.actionnodelist.forEach(function (actionNodeInClip) {
                                    if (actionNodeInClip.actionframelist) {
                                        actionNodeInClip.actionframelist.forEach(function (frame) {
                                            if (frame.frameid > maxFrameId) maxFrameId = frame.frameid;
                                        });
                                    }
                                });
                            }
                            durationInSeconds = maxFrameId * unitTime;
                        }
                    }
                } catch (e) { durationInSeconds = 0; }
                break;
            case 'image':
                durationInSeconds = 0;
                break;
            default:
                durationInSeconds = 0;
                break;
        }
        return Math.max(0, durationInSeconds);
    },

    onExit: function () {
        this._currentlySelectedNode = null;
        Sequencer.cleanup();

        if (this._canvasResizeListener) {
            cc.eventManager.removeListener(this._canvasResizeListener);
        }
        if (this._nodePositionChangedListener) {
            cc.eventManager.removeListener(this._nodePositionChangedListener);
        }
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        cc.eventManager.removeListener(this._loadCocosStudioListener);
        cc.eventManager.removeListener(this._loadSpineListener);
        cc.eventManager.removeListener(this._loadImageListener);
        this._super();
    }
});


var MainLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        Loader.init();
        if (typeof ElectronRenderer != 'undefined') ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");
        window.MainLayerInstance = layer;

        // 이 함수 안에서 이미 LayoutManager.load()를 호출하여 처리하고 있습니다.
        PanelManager.initialize();

        $(cc.game.canvas).droppable({
            accept: ".custom-tree-item",
            drop: function (event, ui) {
                const assetName = ui.helper.data('assetName');
                const assetType = ui.helper.data('assetType');
                if (assetName && assetType && layer) {
                    layer.createInstanceFromLibrary(assetName, assetType);
                }
            }
        });

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var mainLayer = self.getChildByName("MainLayer");
                if (!mainLayer) return;

                if (event.getButton() === cc.EventMouse.BUTTON_LEFT) {
                    var touchedDraggableNode = null;
                    var children = mainLayer.getChildren().slice().reverse();
                    for (const child of children) {
                        if (child instanceof DraggableNode && child.isVisible()) {
                            const worldBoundingBox = child.getBoundingBoxToWorld();
                            if (cc.rectContainsPoint(worldBoundingBox, event.getLocation())) {
                                touchedDraggableNode = child;
                                break;
                            }
                        }
                    }

                    if (touchedDraggableNode) {
                        mainLayer.updateMenuWithNodeId(touchedDraggableNode.__instanceId);
                    } else {
                        mainLayer.updateMenuWithNodeId(null);
                    }
                } else if (event.getButton() === cc.EventMouse.BUTTON_RIGHT) {
                }
            },
            swallowTouches: true
        }, this);
    },

    getFrontTouchedNode: function (touchPos) {
        var maxZOrderList = [], frontNode = null, frontNodeName = '', zOrderList = [], node = null;
        var updateData = function (z, n, name) { maxZOrderList = z; frontNode = n; frontNodeName = name; };
        for (var name in NodeList) {
            if (NodeList.hasOwnProperty(name)) {
                node = NodeList[name];
                if (!cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPos)) continue;
                zOrderList = this.getZOrderList(node);
                if (maxZOrderList.length > 0) {
                    var determined = false;
                    for (var i = 0; i < zOrderList.length && i < maxZOrderList.length; i++) {
                        if (zOrderList[i] > maxZOrderList[i]) { updateData(zOrderList, node, name); determined = true; break; }
                        else if (zOrderList[i] < maxZOrderList[i]) { determined = true; break; }
                    }
                    if (!determined && zOrderList.length > maxZOrderList.length) updateData(zOrderList, node, name);
                } else {
                    updateData(zOrderList, node, name);
                }
            }
        }
        var finalNode = this.recursiveCheckNode(frontNode, touchPos);
        return { node: frontNode, nodeName: frontNodeName, finalNode: finalNode };
    },

    recursiveCheckNode: function (node, touchpos) {
        if (!node || !node.children) return node;
        for (var idx = 0; idx < node.children.length; idx++) {
            var found = this.recursiveCheckNode(node.children[idx], touchpos);
            if (found !== node.children[idx]) return found;
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return node.children[idx];
            }
        }
        return node;
    },

    getZOrderList: function (node) {
        var zOrderList = [];
        for (let p = node; !!p; p = p.getParent()) { zOrderList.unshift(p.zIndex); }
        return zOrderList;
    },

    onExit: function () {
        if (typeof ScreenUtil !== 'undefined') ScreenUtil.removeAllResizeListener();
        this._super();
    }
});