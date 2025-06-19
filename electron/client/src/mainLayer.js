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

        // [추가] 노드 위치 변경 이벤트 리스너
        this._nodePositionChangedListener = cc.eventManager.addCustomListener('node_position_changed', function(event) {
            const eventData = event.getUserData();
            if (eventData && eventData.nodeId) {
                // UI 업데이트 및 기즈모 재그리기를 위해 다시 호출
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

    _buildChildrenRecursive: function(parentNode) {
        let childrenData = [];
        const children = parentNode.getChildren();
        // Z-order가 낮은 노드가 먼저 오도록 정렬합니다 (즉, 화면 뒤에 있는 노드가 먼저).
        const sortedChildren = children.slice().sort((a, b) => {
            return a.getLocalZOrder() - b.getLocalZOrder();
        });

        if (sortedChildren && sortedChildren.length > 0) {
            for (const child of sortedChildren) {
                // DraggableNode에 포함된 selectMark(DrawNode)는 하이어라키에 표시하지 않습니다.
                if (child instanceof cc.DrawNode) continue;

                let zOrderText = child.getLocalZOrder();
                let childNodeData = {
                    text: `<span class="z-order-label">[${zOrderText}]</span> ${child.getName() || "Unnamed Node"}`,
                    children: this._buildChildrenRecursive(child),
                    data: {
                        nodeId: child.__instanceId,
                        zOrder: child.getLocalZOrder() // Z-order 값도 데이터에 저장
                    },
                    a_attr: { "class": "type-child" } // 자식 노드임을 나타내는 'type-child' 클래스
                };
                childrenData.push(childNodeData);
            }
        }
        return childrenData;
    },

    refreshHierarchyView: function() {
        let unifiedTreeData = [];
        const treeNodes = {}; // nodeId를 키로 하여 jstree 노드 데이터를 저장

        // 모든 노드를 nodeId 기준으로 treeNodes 맵에 추가합니다.
        // 이는 DraggableNode이든 일반 Cocos Node이든 모든 노드를 포함합니다.
        for (const nodeId in this.nodeMap) {
            const node = this.nodeMap[nodeId];
            // selectMark (DrawNode)는 하이어라키에 표시하지 않습니다.
            if (node instanceof cc.DrawNode && node.getParent() instanceof DraggableNode) {
                continue;
            }

            // DraggableNode 내의 실제 콘텐츠 노드 (ui, armature, spine)는 별도로 처리되므로
            // 여기서는 DraggableNode와 그 외 일반 Cocos Node만 직접 추가합니다.
            // DraggableNode의 직접적인 자식인 ui, armature, spine은 나중에 DraggableNode 아래에 추가됩니다.
            if (node instanceof DraggableNode || !(node.getParent() instanceof DraggableNode && (node.getParent().ui === node || node.getParent().armature === node || node.getParent().spine === node))) {
                let zOrderText = node.getLocalZOrder();
                let nodeName = node.getName() || "Unnamed Node";
                let typeClass = "";

                if (node instanceof DraggableNode) {
                    typeClass = `type-${node.assetType}`;
                    nodeName = `<span class="z-order-label">[${zOrderText}]</span> ${nodeName}`;
                } else {
                    typeClass = "type-child"; // 일반 Cocos Node
                }

                treeNodes[nodeId] = {
                    id: nodeId, // jstree의 고유 ID로 Cocos2d-JS의 instanceId 사용
                    text: nodeName,
                    children: [], // 임시로 빈 배열로 설정, 나중에 채워짐
                    data: {
                        nodeId: node.__instanceId,
                        zOrder: node.getLocalZOrder()
                    },
                    state: { opened: false },
                    a_attr: { "class": typeClass }
                };
            }
        }

        // 부모-자식 관계를 설정합니다.
        for (const nodeId in this.nodeMap) {
            const node = this.nodeMap[nodeId];

            // selectMark는 건너_buildChildrenRecursive(child)고,
            // DraggableNode의 ui/armature/spine 같은 직접적인 콘텐츠 노드도 건너_buildChildrenRecursive(child)니다.
            // 이들은 DraggableNode가 자체적으로 하이어라키에 추가하는 방식에 따라 처리됩니다.
            if (node instanceof cc.DrawNode && node.getParent() instanceof DraggableNode) {
                continue;
            }
            if (node.getParent() instanceof DraggableNode && (node.getParent().ui === node || node.getParent().armature === node || node.getParent().spine === node)) {
                continue;
            }


            const parent = node.getParent();
            if (parent) {
                let parentJstreeNode = treeNodes[parent.__instanceId];
                if (parentJstreeNode && treeNodes[nodeId]) {
                    // 부모의 children 배열에 자식을 추가합니다.
                    // jstree의 children은 id 문자열을 사용하므로, id만 추가합니다.
                    parentJstreeNode.children.push(treeNodes[nodeId]);
                } else if (!parentJstreeNode && treeNodes[nodeId] && parent === this) { // MainLayer가 부모일 경우
                    unifiedTreeData.push(treeNodes[nodeId]);
                }
            } else if (treeNodes[nodeId]) { // 부모가 없으면 최상위 노드입니다.
                unifiedTreeData.push(treeNodes[nodeId]);
            }
        }

        // DraggableNode의 내부 콘텐츠 노드를 연결합니다.
        for (const nodeId in this.nodeMap) {
            const node = this.nodeMap[nodeId];
            if (node instanceof DraggableNode) {
                const draggableNodeJstreeData = treeNodes[node.__instanceId];
                if (draggableNodeJstreeData) {
                    const actualGameNode = node.ui || node.armature || node.spine;
                    if (actualGameNode && treeNodes[actualGameNode.__instanceId]) {
                        // 실제 게임 콘텐츠 노드를 DraggableNode의 자식으로 추가합니다.
                        draggableNodeJstreeData.children.push(treeNodes[actualGameNode.__instanceId]);
                    }
                }
            }
        }

        // Z-order에 따라 정렬 (jstree는 id를 받아 자동으로 정렬할 수도 있지만, 명시적으로 데이터 정렬)
        // 최상위 노드들을 Z-order 기준으로 정렬
        unifiedTreeData.sort((a, b) => {
            const nodeA = this.nodeMap[a.data.nodeId];
            const nodeB = this.nodeMap[b.data.nodeId];
            return (nodeA ? nodeA.getLocalZOrder() : 0) - (nodeB ? nodeB.getLocalZOrder() : 0);
        });

        // 각 노드의 자식들을 Z-order 기준으로 정렬
        function sortChildrenRecursive(nodes) {
            nodes.forEach(nodeData => {
                if (nodeData.children && nodeData.children.length > 0) {
                    nodeData.children.sort((a, b) => {
                        const nodeA = self.nodeMap[a.data.nodeId];
                        const nodeB = self.nodeMap[b.data.nodeId];
                        return (nodeA ? nodeA.getLocalZOrder() : 0) - (nodeB ? nodeB.getLocalZOrder() : 0);
                    });
                    sortChildrenRecursive(nodeData.children);
                }
            });
        }
        sortChildrenRecursive(unifiedTreeData);


        this._treeView.updateTreeView(unifiedTreeData);
    },

    // ID를 받아 노드를 찾아 처리하는 함수
    updateMenuWithNodeId: function(nodeId) {
        if (!nodeId) { // 게임 뷰 빈 곳 클릭 등으로 노드 선택이 해제될 때
            Target = null;
            this._treeView.setNode(null); // 속성 패널 비우고 기즈모 제거
            this.setDraggableItem(null); // 모든 드래그 가능 아이템 비활성화
            this.refreshHierarchyView(); // 추가: 노드 선택 해제 시에만 하이어라키 뷰를 새로고침하여 노드 목록이 유지되도록 합니다.
            return;
        }
        const node = this.nodeMap[nodeId];
        if (!node) {
            console.error("Node not found with ID:", nodeId);
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

        // Target은 항상 DraggableNode 인스턴스를 가리키도록 합니다.
        Target = selectedDraggableNode;

        // _treeView.setNode에는 실제 선택된 Cocos2d-JS 노드를 전달합니다.
        // 이렇게 해야 Properties 패널에 선택된 실제 노드의 정보가 표시됩니다.
        this._treeView.setNode(node);

        // DraggableNode가 선택된 경우에만 드래그 가능 상태로 설정
        if (selectedDraggableNode) {
            this.setDraggableItem(selectedDraggableNode.getName());
        } else {
            this.setDraggableItem(null); // DraggableNode가 아닌 다른 노드가 선택되면 드래그 비활성화
        }
        // 노드가 선택될 때는 refreshHierarchyView()를 호출하지 않습니다.
        // 이렇게 하면 JSTree의 선택 효과가 유지됩니다.
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
                node.setPosition(this.CX - armature.getContentSize().width * 0.5, this.CY - armature.getContentSize().height * 0.5);
                node.addChildToCenter(armature);
                node.armature = armature;
                node.assetType = 'armature';
                break;

            case 'spine':
                var spine = sp.SkeletonAnimation.createWithJsonFile(assetInfo.name + ".json", assetInfo.name +".atlas", 1.0);
                node = new DraggableNode(spine.getContentSize());
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);
                node.addChildToCenter(spine);
                node.spine = spine;
                node.assetType = 'spine';
                break;

            case 'ui':
            case 'cocosstudio':
                var json = ccs.load(assetInfo.url);
                var ui = json.node;
                var size = ui.getContentSize();
                if (size.width < 0.01 || size.height < 0.01) {
                    // UI 노드의 getContentSize가 0일 경우, getBoundingBoxToWorld를 사용하여 유효한 크기를 얻으려 시도합니다.
                    // 이 크기를 DraggableNode의 _staticSize로 설정합니다.
                    // 주의: getBoundingBoxToWorld는 렌더링 이후에 정확하므로, 초기 생성 시에는 0일 수 있습니다.
                    // 임시 크기를 설정하거나, 로드 완료 콜백에서 다시 설정하는 로직이 필요할 수 있습니다.
                    size = ui.getBoundingBoxToWorld();
                    // 만약 getBoundingBoxToWorld()도 유효하지 않으면 기본값 설정
                    if (size.width < 0.01 || size.height < 0.01) {
                        console.warn(`UI asset '${assetInfo.name}' has invalid content size. Using default DraggableNode size.`);
                        size = cc.size(100, 100); // 기본값
                    } else {
                        size = cc.size(size.width, size.height); // cc.Rect에서 cc.Size로 변환
                    }
                }
                node = new DraggableNode(size); // DraggableNode 생성 시 크기 전달
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
            let maxZOrder = -1;
            this.getChildren().forEach(child => {
                if (child instanceof DraggableNode) {
                    if (child.getLocalZOrder() > maxZOrder) {
                        maxZOrder = child.getLocalZOrder();
                    }
                }
            });
            const newZOrder = maxZOrder + 1;
            node.setLocalZOrder(newZOrder); // 새로 추가되는 DraggableNode에 Z-order를 설정합니다.

            this.addChild(node); // Z-order 설정 후 MainLayer에 추가합니다.
            this.sceneNodes[instanceName] = node;
            // ... (nodeMap 업데이트 로직 유지) ...
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
                this._treeView.setNode(null); // 선택 해제 시 기즈모 제거
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
        if( name && this.sceneNodes.hasOwnProperty( name ) ) {
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
        if (this._nodePositionChangedListener) { // [추가] 이벤트 리스너 제거
            cc.eventManager.removeListener(this._nodePositionChangedListener);
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
            accept: ".custom-tree-item", // 수정된 부분
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
                // 뒤에서부터 탐색하여 가장 앞에 있는 DraggableNode를 찾습니다.
                var children = mainLayer.getChildren().slice().reverse();
                for(const child of children){
                    if(child instanceof DraggableNode && child.isVisible()){
                        const worldBoundingBox = child.getStaticHitboxWorld(); // DraggableNode의 고정 크기 바운딩 박스
                        if(cc.rectContainsPoint(worldBoundingBox, event.getLocation())){
                            touchedDraggableNode = child;
                            break;
                        }
                    }
                }

                if (touchedDraggableNode) {
                    // MainLayer에서 해당 DraggableNode를 선택하도록 합니다.
                    mainLayer.updateMenuWithNodeId(touchedDraggableNode.__instanceId);
                } else {
                    // 어떤 DraggableNode도 선택되지 않은 경우, UI 및 기즈모를 초기화합니다.
                    mainLayer.updateMenuWithNodeId(null);
                }
            },
            swallowTouches: true // 다른 곳으로 이벤트가 전파되지 않도록 설정
        }, this );
    },

    getFrontTouchedNode: function( touchPos ) {
        // 이 함수는 현재 사용되지 않으며, onMouseDown 로직으로 대체됨
        console.warn("getFrontTouchedNode is deprecated and may not be used.");
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
        // 이 함수는 현재 사용되지 않음
        console.warn("recursiveCheckNode is deprecated and may not be used.");
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
        // 이 함수는 현재 사용되지 않음
        console.warn("getZOrderList is deprecated and may not be used.");
        var zOrderList = [];
        for( let p = node; !!p; p = p.getParent() ) { zOrderList.unshift( p.zIndex ); }
        return zOrderList;
    },

    onExit: function() {
        if (typeof ScreenUtil !== 'undefined') ScreenUtil.removeAllResizeListener();
        this._super();
    }
});