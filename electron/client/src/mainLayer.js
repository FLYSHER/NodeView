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

var ResetAction = function () {
    if(Target !== null) {
        if(TargetRunActionData !== null)
            Target.stopAction(TargetRunActionData);
        if(TempTargetPos !== null)
            Target.setPosition(TempTargetPos);
        if(TempTargetScale !== null)
            Target.setScale(TempTargetScale);
        if(TempTargetRot !== null)
            Target.setRotation(TempTargetRot);
        TargetRunActionData = null;
        TempTargetPos = null;
        TempTargetScale = null;
        TempTargetRot = null;
    }
};

var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    _animationList : null,
    _canvasResizeListener: null,

    ctor: function () {
        this._super();

        this.assetLibrary = {}; // 로드된 모든 에셋의 정보 저장소
        this.sceneNodes = {};   // 씬에 실제 배치된 노드들의 정보 저장소
        this.nodeMap = {};      // 모든 노드를 ID 기반으로 저장할 지도

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;
        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function(event) { self.onLoadArmature(JSON.parse(event.getUserData())); });
        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function(event) { self.onLoadUI(event.getUserData()); });
        this._loadCocosStudioListener = cc.eventManager.addCustomListener('loadCocosStudio', function (event){ self.onLoadCocosStuido(event.getUserData()); });
        this._loadSpineListener = cc.eventManager.addCustomListener('loadSpine', function(event) { self.onLoadSpine(event.getUserData()); });

        this._canvasResizeListener = cc.eventManager.addCustomListener('canvas-resize', this.updateLayout.bind(this));

        var label = new cc.LabelTTF("파일을 이쪽으로 드래그해 주세요", "Arial", 30);
        label.setPosition(this.CX, this.CY);
        this.addChild(label, 0, this.DESC_TAG);

        this._nodeList = {};
        this._nodeOrder = [];
        this._movementCtrl = new UiPositionCtrl();
        this._itemList = new UIItemList(this);
        this._treeView = new UIScrollTreeViewCtrl(this);
        this._treeView.setup();
        NodeList = this._nodeList;
        Sequencer.initialize(this);
        return true;
    },

    updateLayout: function() {
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
    },

    onLoadArmature: function( ids )  {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        cc.each( ids, function( name, index ) {
            if(this.assetLibrary[name]) return;

            const assetInfo = {
                type: 'armature',
                name: name
            };
            this.assetLibrary[name] = assetInfo;
            console.log(`[Asset] Armature 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
            this._itemList.addAsset(assetInfo);

        }, this );
    },


    onLoadUI: function( url ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        if(this.assetLibrary[name]) return;
        const assetInfo = {
            type: 'ui',
            name: name,
            url: url
        };
        this.assetLibrary[name] = assetInfo;
        console.log(`[Asset] UI 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this._itemList.addAsset(assetInfo);
    },

    onLoadSpine: function( fileName ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( fileName );
        if(this.assetLibrary[name]) return;
        const assetInfo = {
            type: 'spine',
            name: name
        };
        this.assetLibrary[name] = assetInfo;
        console.log(`[Asset] Spine 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this._itemList.addAsset(assetInfo);
    },

    onLoadCocosStuido : function( url ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        if(this.assetLibrary[name]) return;
        const assetInfo = {
            type: 'cocosstudio',
            name: name,
            url: url
        };
        this.assetLibrary[name] = assetInfo;
        console.log(`[Asset] CocosStudio 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this._itemList.addAsset(assetInfo);
    },

    // 자식 노드 데이터를 재귀적으로 생성하는 헬퍼 함수
    _buildChildrenRecursive: function(parentNode) {
        let childrenData = [];
        const children = parentNode.getChildren();
        if (children && children.length > 0) {
            for (const child of children) {
                // DraggableNode에 포함된 selectMark(DrawNode)는 하이어라키에 표시하지 않습니다.
                if (child instanceof cc.DrawNode) continue;

                let childNodeData = {
                    text: child.getName() || "Unnamed Node",
                    children: this._buildChildrenRecursive(child),
                    data: { nodeId: child.__instanceId }
                };
                childrenData.push(childNodeData);
            }
        }
        return childrenData;
    },

    // 하이어라키 전체를 다시 그리는 메인 함수
    refreshHierarchyView: function() {
        let unifiedTreeData = [];
        for (const instanceName in this.sceneNodes) {
            if (this.sceneNodes.hasOwnProperty(instanceName)) {
                const draggableNode = this.sceneNodes[instanceName];
                // [수정!] getChildren()[0] 대신, 저장된 속성으로 실제 컨텐츠를 찾습니다.
                const contentNode = draggableNode.ui || draggableNode.armature || draggableNode.spine;

                let topLevelNodeData = {
                    text: draggableNode.getName(),
                    children: contentNode ? this._buildChildrenRecursive(contentNode) : [],
                    data: { nodeId: draggableNode.__instanceId },
                    state: { opened: false }
                };
                unifiedTreeData.push(topLevelNodeData);
            }
        }
        this._treeView.updateTreeView(unifiedTreeData);
    },

    // ID를 받아 노드를 찾아 처리하는 함수
    updateMenuWithNodeId: function(nodeId) {
        if (!nodeId) return;
        const node = this.nodeMap[nodeId];
        if (!node) {
            console.error("Node not found with ID:", nodeId);
            return;
        }

        Target = node;
        this._treeView.setNode(node);
        // 하이어라키에서 노드를 클릭했을 때도 드래그 가능 상태가 되도록 설정
        this.setDraggableItem(node.getName());
    },

    createInstanceFromLibrary: function(assetName) {
        const assetInfo = this.assetLibrary[assetName];
        if (!assetInfo) {
            console.error(`[Error] assetLibrary에 '${assetName}' 에셋이 존재하지 않습니다.`);
            return;
        }

        let instanceName = assetInfo.name;
        let count = 1;
        while (this.sceneNodes[instanceName]) {
            instanceName = `${assetInfo.name} (${count})`;
            count++;
        }

        console.log(`[Instance] '${instanceName}' 인스턴스를 생성합니다. (타입: ${assetInfo.type})`);

        let node = null;

        switch (assetInfo.type) {
            case 'armature':
                var armature = new ccs.Armature(assetInfo.name);
                node = new DraggableNode(armature.getContentSize());
                // Armature는 기준점이 (0,0)에 가까우므로, 중앙에 배치하기 위해 위치를 보정합니다.
                node.setPosition(this.CX - armature.getContentSize().width * 0.5, this.CY - armature.getContentSize().height * 0.5);
                node.addChildToCenter(armature);
                node.armature = armature;
                node.assetType = 'armature'; // ✅ Armature 타입 꼬리표
                break;

            case 'spine':
                var spine = sp.SkeletonAnimation.createWithJsonFile(assetInfo.name + ".json", assetInfo.name +".atlas", 1.0);
                node = new DraggableNode(spine.getContentSize());
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);
                node.addChildToCenter(spine);
                node.spine = spine;
                node.assetType = 'spine'; // ✅ Spine 타입 꼬리표
                break;

            case 'ui':
            case 'cocosstudio':
                var json = ccs.load(assetInfo.url);
                var ui = json.node;
                var size = ui.getContentSize();
                if (size.width < 0.01 || size.height < 0.01) {
                    size = ui.getBoundingBoxToWorld();
                }
                node = new DraggableNode(size);
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);

                // ✅ UI Action의 정확한 배치를 위한 핵심 코드
                ui.setAnchorPoint(0.5, 0.5);

                node.addChildToCenter(ui);
                node.ui = ui;
                if (json.action) {
                    node.cocosAction = json.action;
                    node.runAction(node.cocosAction);
                }
                node.assetType = 'action';   // ✅ UI/Action 타입 꼬리표
                node.actionUrl = assetInfo.url; // ✅ UI/Action URL 꼬리표
                break;

            default:
                console.error(`[Error] 알 수 없는 에셋 타입입니다: ${assetInfo.type}`);
                return;
        }

        if (node) {
            node.setName(instanceName);
            this.addChild(node);
            this.sceneNodes[instanceName] = node;

            const addNodeToMap = (n) => {
                if (!n) return;
                this.nodeMap[n.__instanceId] = n;
                const children = n.getChildren();
                if(children) {
                    children.forEach(child => addNodeToMap(child));
                }
            };
            addNodeToMap(node);

            this.refreshHierarchyView();
        }
    },

    reOrderup : function (nodeName, orderPlus) {
        nodeName = this._itemList.getSelectedName();
        var node = this._nodeList[ nodeName ];
        if(!node) return;
        var index = node.order;
        var changeIndex = orderPlus ? index + 1 : index - 1;
        if(changeIndex >=0 && changeIndex  < this._nodeOrder.length) {
            var changeNode = this._nodeOrder[changeIndex];
            var temp = changeNode.order;
            changeNode.order = node.order;
            node.order = temp;
            this._nodeOrder[changeNode.order] = changeNode;
            this._nodeOrder[node.order] = node;
            changeNode.setLocalZOrder(10 + changeNode.order);
            node.setLocalZOrder(10 + node.order);
        }
    },

    _addToJsonListMenu: function( name , node )  {
        this._itemList.add(name, node,
            function ( type ) {
                switch(type){
                    case ItemListClickType.SELECT: this.updateMenu( name ); break;
                    case ItemListClickType.DELETE: this.deleteItem( name); break;
                    case ItemListClickType.UP: this.reOrderup( name , true); break;
                    case ItemListClickType.DOWN: this.reOrderup( name , false); break;
                }
            }.bind(this));
    },

    deleteItem : function (name) {
        var selectNode = this.sceneNodes[name];
        if(selectNode) {
            if(Target === selectNode) {
                Target = null;
                this._treeView.setNode(null);
            }

            const removeNodeFromMap = (n) => {
                if (!n) return;
                delete this.nodeMap[n.__instanceId];
                const children = n.getChildren();
                if(children) {
                    children.forEach(child => removeNodeFromMap(child));
                }
            };
            removeNodeFromMap(selectNode);

            delete this.sceneNodes[name];
            selectNode.removeFromParent();
            this.refreshHierarchyView();
        }
    },

    setDraggableItem: function( name ) {
        // 모든 노드의 드래그 상태를 우선 비활성화
        for( var nodeName in this.sceneNodes ) {
            if( typeof this.sceneNodes[ nodeName ].setDraggable === 'function' ) {
                this.sceneNodes[ nodeName ].setDraggable( false );
            }
        }
        // 선택된 노드만 드래그 활성화
        if( this.sceneNodes.hasOwnProperty( name ) ) {
            this.sceneNodes[ name ].setDraggable( true );
            Target = this.sceneNodes[ name ];
        }
    },

    getAnimationLength: function(node, animName) {
        if (!node || !animName) return 0;

        let contentNode = node.ui || node.armature || node.spine;
        if (!contentNode) contentNode = node;

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
                } catch (e) { console.error("Armature 길이를 가져오는 중 오류:", e); }
                break;

            case 'spine':
                try {
                    const animation = contentNode.getState().data.skeletonData.findAnimation(animName);
                    if (animation) {
                        durationInSeconds = animation.duration;
                    }
                } catch (e) { console.error("Spine 길이를 가져오는 중 오류:", e); }
                break;

            case 'action':
                try {
                    let rawJsonData = null;
                    // ✅ [핵심 수정] 1. 원본 코드처럼, 노드에 직접 첨부된 cocosAction이 있는지 먼저 확인합니다.
                    if (node.cocosAction && node.cocosAction.animation && node.cocosAction.animation.actionlist) {
                        rawJsonData = node.cocosAction;
                    }
                    // 2. 없다면, actionUrl을 이용해 캐시에서 찾습니다. (Fallback)
                    else {
                        const url = node.actionUrl;
                        if (url && cc.loader.cache[url]) {
                            rawJsonData = (typeof cc.loader.cache[url] === 'string') ? JSON.parse(cc.loader.cache[url]) : cc.loader.cache[url];
                        }
                    }

                    // 3. 찾은 데이터를 기반으로 길이를 계산하는 로직은 동일합니다.
                    if (rawJsonData && rawJsonData.animation && rawJsonData.animation.actionlist) {
                        const actionClipData = rawJsonData.animation.actionlist.find(clip => clip.name === animName);
                        if (actionClipData) {
                            const unitTime = (typeof actionClipData.unittime === 'number' && actionClipData.unittime > 0) ? actionClipData.unittime : (1 / 60);
                            let maxFrameId = 0;
                            if (actionClipData.actionnodelist) {
                                actionClipData.actionnodelist.forEach(function(actionNodeInClip) {
                                    if (actionNodeInClip.actionframelist) {
                                        actionNodeInClip.actionframelist.forEach(function(frame) {
                                            if (frame.frameid > maxFrameId) maxFrameId = frame.frameid;
                                        });
                                    }
                                });
                            }
                            durationInSeconds = maxFrameId * unitTime;
                        }
                    }
                } catch (e) { console.error("UIAction 길이를 가져오는 중 오류:", e); durationInSeconds = 0; }
                break;
        }
        return Math.max(0, durationInSeconds);
    },

    onExit: function() {
        Target = null; NodeList = null; TempTargetPos = null; TempTargetScale = null; TempTargetRot = null;
        Sequencer.cleanup();

        if (this._canvasResizeListener) {
            cc.eventManager.removeListener(this._canvasResizeListener);
        }
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        cc.eventManager.removeListener(this._loadCocosStudioListener);
        cc.eventManager.removeListener(this._loadSpineListener);
        this._super();
    }
});


var ManiLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        const savedLayout = LayoutManager.load();
        if (savedLayout) {
            for (const panelId in savedLayout) {
                if (PanelManager.config[panelId]) {
                    Object.assign(PanelManager.config[panelId], savedLayout[panelId]);
                }
            }
        }

        Loader.init();
        if (typeof ElectronRenderer != 'undefined') ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");

        PanelManager.initialize();

        const gameViewConfig = PanelManager.config.gameView;
        $('#res-width-input').val(gameViewConfig.width);
        $('#res-height-input').val(gameViewConfig.height);

        $('#res-apply-btn').on('click', function() {
            const w = parseInt($('#res-width-input').val(), 10);
            const h = parseInt($('#res-height-input').val(), 10);
            GameViewManager.setResolution(w, h);
        });

        GameViewManager.sync();

        $(cc.game.canvas).droppable({
            accept: ".jstree-anchor",
            drop: function(event, ui) {
                const assetName = ui.helper.data('assetName');
                if (assetName) {
                    layer.createInstanceFromLibrary(assetName);
                }
            }
        });

        var self = this;
        cc.eventManager.addListener( {
            event: cc.EventListener.MOUSE,
            onMouseDown: function( event ) {
                var mainLayer = self.getChildByName("MainLayer");
                if (!mainLayer) return;

                var touchedDraggableNode = null;
                var children = mainLayer.getChildren().slice().reverse();
                for(const child of children){
                    if(child instanceof DraggableNode && child.isVisible()){
                        const worldBoundingBox = child.getBoundingBoxToWorld();
                        if(cc.rectContainsPoint(worldBoundingBox, event.getLocation())){
                            touchedDraggableNode = child;
                            break;
                        }
                    }
                }

                if (touchedDraggableNode) {
                    // ✅ [수정!] 옛날 함수 대신 새 ID 기반 함수를 호출합니다.
                    mainLayer.updateMenuWithNodeId(touchedDraggableNode.__instanceId);
                } else {
                    // 캔버스 빈 공간 클릭 시 모든 선택 해제
                    mainLayer.setDraggableItem(null);
                    mainLayer.updateMenuWithNodeId(null);
                }
            },
            swallowTouches: true // 다른 곳으로 이벤트가 전파되지 않도록 설정
        }, this );
    },

    getFrontTouchedNode: function( touchPos ) {
        var maxZOrderList = [], frontNode = null, frontNodeName = '', zOrderList = [], node = null;
        var updateData = function( z, n, name ) { maxZOrderList = z; frontNode = n; frontNodeName = name; };
        for( var name in NodeList ) {
            if( NodeList.hasOwnProperty( name ) ) {
                node = NodeList[ name ];
                if( !cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPos) ) continue;
                zOrderList = this.getZOrderList( node );
                if( maxZOrderList.length > 0 ) {
                    var determined = false;
                    for( var i = 0; i < zOrderList.length && i < maxZOrderList.length; i++ ) {
                        if( zOrderList[ i ] > maxZOrderList[ i ] ) { updateData( zOrderList, node, name ); determined = true; break; }
                        else if( zOrderList[ i ] < maxZOrderList[ i ] ) { determined = true; break; }
                    }
                    if( !determined && zOrderList.length > maxZOrderList.length ) updateData( zOrderList, node, name );
                } else {
                    updateData( zOrderList, node, name );
                }
            }
        }
        var finalNode = this.recursiveCheckNode(frontNode, touchPos);
        return { node: frontNode, nodeName: frontNodeName, finalNode : finalNode };
    },

    recursiveCheckNode: function(node, touchpos){
        if(!node || !node.children) return node;
        for (var idx = 0; idx < node.children.length; idx++) {
            var found = this.recursiveCheckNode(node.children[idx], touchpos);
            if(found !== node.children[idx]) return found;
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return node.children[idx];
            }
        }
        return node;
    },

    getZOrderList: function( node ) {
        var zOrderList = [];
        for( let p = node; !!p; p = p.getParent() ) { zOrderList.unshift( p.zIndex ); }
        return zOrderList;
    },

    onExit: function() {
        if (typeof ScreenUtil !== 'undefined') ScreenUtil.removeAllResizeListener();
        this._super();
    }
});