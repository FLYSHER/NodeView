var NodeList = null;
var Target = null;
var TempTargetPos = null;
var TempTargetScale = null;
var TempTargetRot = null;
var TargetRunActionData = null;

/*var RunAction = function (script) {
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
};*/

let activeContextMenu = null;
let contextMenuTargetElement = null; // 현재 우클릭된 DOM 요소
let contextMenuTargetNodeId = null;  // 현재 우클릭된 Cocos Node의 __instanceId (jstree/timeline 용)

// jsTree 전용 컨텍스트 메뉴 함수
function showJsTreeContextMenu(event, targetElement, selectedNode, canDelete) {
    event.preventDefault();

    // 이전에 열려있던 메뉴 닫기
    if (activeContextMenu) {
        activeContextMenu.hide();
    }

    const $menu = $('#custom-context-menu');
    activeContextMenu = $menu;
    contextMenuTargetElement = targetElement;
    contextMenuTargetNodeId = selectedNode?.data?.nodeId;

    // 삭제 메뉴 항목 활성화/비활성화
    const $deleteItem = $menu.find('li[data-action="delete"]');
    if (canDelete) {
        $deleteItem.removeClass('disabled').css('pointer-events', 'auto');
    } else {
        $deleteItem.addClass('disabled').css('pointer-events', 'none');
    }

    // 메뉴 위치 설정 (기존 로직과 동일)
    let x = event.pageX;
    let y = event.pageY;

    const menuWidth = $menu.outerWidth();
    const menuHeight = $menu.outerHeight();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10;
    }
    if (y + menuHeight > windowHeight) {
        y = windowHeight - menuHeight - 10;
    }

    $menu.css({ left: x, top: y }).show();

    // 메뉴 항목 클릭 이벤트 (jsTree 전용)
    $menu.off('click.jstree').on('click.jstree', 'li[data-action="delete"]:not(.disabled)', function() {
        if (contextMenuTargetNodeId && window.MainLayerInstance) {
            window.MainLayerInstance.deleteItem(contextMenuTargetNodeId);
        }
        hideContextMenu();
    });

    // 외부 클릭 시 메뉴 숨기기
    $(document).on('mousedown.contextMenu', function(e) {
        if (!$(e.target).closest('.context-menu').length && activeContextMenu) {
            hideContextMenu();
        }
    });
}

// 기존 showContextMenu 함수 수정 (jsTree 제외)
function showContextMenu(event, targetElement, nodeId) {
    // jsTree 노드인지 확인
    if ($(targetElement).closest('#widgetTree').length) {
        return; // jsTree 노드는 별도 처리
    }

    // 기존 로직 그대로...
    event.preventDefault();

    if (activeContextMenu) {
        activeContextMenu.hide();
    }

    const $menu = $('#custom-context-menu');
    activeContextMenu = $menu;
    contextMenuTargetElement = targetElement;
    contextMenuTargetNodeId = nodeId;

    // 메뉴 위치 설정
    let x = event.pageX;
    let y = event.pageY;

    const menuWidth = $menu.outerWidth();
    const menuHeight = $menu.outerHeight();
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();

    if (x + menuWidth > windowWidth) {
        x = windowWidth - menuWidth - 10;
    }
    if (y + menuHeight > windowHeight) {
        y = windowHeight - menuHeight - 10;
    }

    $menu.css({ left: x, top: y }).show();

    // Assets, Sequencer 등 다른 패널용 클릭 이벤트
    $menu.off('click.other').on('click.other', 'li', function() {
        const action = $(this).data('action');
        if (action === 'delete') {
            if (contextMenuTargetElement) {
                if ($(contextMenuTargetElement).hasClass('custom-tree-item')) {
                    // Assets 패널 아이템 삭제
                    const assetName = $(contextMenuTargetElement).data('asset-name');
                    const assetType = $(contextMenuTargetElement).data('asset-type');
                    if (assetName && assetType && window.MainLayerInstance?.deleteAsset) {
                        window.MainLayerInstance.deleteAsset(assetName, assetType);
                    }
                } else if ($(contextMenuTargetElement).hasClass('timeline-clip')) {
                    // Sequencer 클립 삭제
                    const clipId = $(contextMenuTargetElement).data('clip-id');
                    const trackNodeId = $(contextMenuTargetElement).closest('.timeline-track').data('node-id');
                    if (clipId && trackNodeId && Sequencer?._deleteClip) {
                        Sequencer._deleteClip(trackNodeId, clipId);
                    }
                }
            }
        }
        hideContextMenu();
    });

    $(document).on('mousedown.contextMenu', function(e) {
        if (!$(e.target).closest('.context-menu').length && activeContextMenu) {
            hideContextMenu();
        }
    });
}

function hideContextMenu() {
    if (activeContextMenu) {
        activeContextMenu.hide();
        activeContextMenu = null;
        contextMenuTargetElement = null;
        contextMenuTargetNodeId = null;
        $(document).off('mousedown.contextMenu'); // 이벤트 리스너 제거
    }
}

var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    _animationList : null,
    _canvasResizeListener: null,

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
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function(event) { self.onLoadArmature(JSON.parse(event.getUserData())); });
        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function(event) { self.onLoadUI(event.getUserData()); });
        this._loadCocosStudioListener = cc.eventManager.addCustomListener('loadCocosStudio', function (event){ self.onLoadCocosStuido(event.getUserData()); });
        this._loadSpineListener = cc.eventManager.addCustomListener('loadSpine', function(event) { self.onLoadSpine(event.getUserData()); });
        this._loadImageListener = cc.eventManager.addCustomListener('loadImage', function(event) { self.onLoadImage(event.getUserData()); });

        this._canvasResizeListener = cc.eventManager.addCustomListener('canvas-resize', this.updateLayout.bind(this));

        this._nodePositionChangedListener = cc.eventManager.addCustomListener('node_position_changed', function(event) {
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
        NodeList = this._nodeList;
        Sequencer.initialize(this);
        return true;
    },

    deleteAsset: function(assetName, assetType) {
        const assetKey = `${assetName}_${assetType}`;
        if (this.assetLibrary.hasOwnProperty(assetKey)) {
            delete this.assetLibrary[assetKey];
            console.log(`[Asset] 에셋 '${assetName}' (타입: ${assetType})가 라이브러리에서 삭제되었습니다.`);
            this.refreshAssetsPanel(); // Assets 패널 UI 갱신
        } else {
            console.warn(`[Asset] 에셋 '${assetName}' (타입: ${assetType})를 찾을 수 없어 삭제할 수 없습니다.`);
        }
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

    refreshAssetsPanel: function() {
        const $container = $('#fileNameTree');
        $container.empty();

        for (const key in this.assetLibrary) {
            if (this.assetLibrary.hasOwnProperty(key)) {
                this._itemList.addAsset(this.assetLibrary[key]);
            }
        }
    },

    onLoadArmature: function( ids )  {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        cc.each( ids, function( name, index ) {
            const assetKey = `${name}_armature`;
            if(this.assetLibrary[assetKey]) return;

            const assetInfo = {
                type: 'armature',
                name: name
            };
            this.assetLibrary[assetKey] = assetInfo;
            console.log(`[Asset] Armature 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
            this.refreshAssetsPanel();
        }, this );
    },

    onLoadUI: function( url ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        const assetKey = `${name}_ui`;
        if(this.assetLibrary[assetKey]) return;

        const assetInfo = {
            type: 'ui',
            name: name,
            url: url
        };
        this.assetLibrary[assetKey] = assetInfo;
        console.log(`[Asset] UI 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this.refreshAssetsPanel();
    },

    onLoadSpine: function( fileName ) {
        console.log(`[MainLayer] onLoadSpine called for: ${fileName}`);

        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( fileName );
        const assetKey = `${name}_spine`;

        if (this.assetLibrary[assetKey]) {
            console.log(`[MainLayer] Spine asset '${name}' already in library. Skipping.`);
            return;
        }

        const assetInfo = {
            type: 'spine',
            name: name
        };
        this.assetLibrary[assetKey] = assetInfo;
        console.log(`[Asset] Spine 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this.refreshAssetsPanel();
    },

    onLoadCocosStuido : function( url ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        const assetKey = `${name}_cocosstudio`;
        if(this.assetLibrary[assetKey]) return;

        const assetInfo = {
            type: 'cocosstudio',
            name: name,
            url: url
        };
        this.assetLibrary[assetKey] = assetInfo;
        console.log(`[Asset] CocosStudio 에셋 '${name}'이 라이브러리에 추가되었습니다.`);
        this.refreshAssetsPanel();
    },

    onLoadImage: function(fileName) {
        var children = this.getChildren();
        var self = this;
        children.forEach(function(c) { if (c.getTag() === self.DESC_TAG) { c.removeFromParent(); } });

        const assetKey = `${fileName}_image`;
        if (this.assetLibrary[assetKey]) return;

        const assetInfo = {
            type: 'image',
            name: fileName,
            url: fileName + '.png'
        };
        const textureCheck = cc.loader.getRes(assetInfo.url);
        if (!textureCheck) {
            console.warn(`[Asset] PNG 에셋 '${assetInfo.name}'의 텍스처를 캐시에서 찾을 수 없습니다: ${assetInfo.url}. Asset에 추가하지 않습니다.`);
            return;
        }

        this.assetLibrary[assetKey] = assetInfo;
        console.log(`[Asset] Image 에셋 '${fileName}'이 라이브러리에 추가되었습니다.`);
        this.refreshAssetsPanel();
    },

    createInstanceFromLibrary: function(assetName, assetType) {
        let assetInfo = null;
        const assetKey = `${assetName}_${assetType}`;
        assetInfo = this.assetLibrary[assetKey];

        if (!assetInfo) {
            console.error(`[Error] assetLibrary에 '${assetName}' (타입: ${assetType}) 에셋이 존재하지 않습니다.`);
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

                console.log(`[MainLayer] Attempting to create Spine from: JSON=${spineJsonUrl}, Atlas=${spineAtlasUrl}`);

                const jsonContent = cc.loader.getRes(spineJsonUrl);
                const atlasContent = cc.loader.getRes(spineAtlasUrl);

                if (!jsonContent) {
                    console.error(`[MainLayer] Spine JSON data not found in cache: ${spineJsonUrl}`);
                    return;
                }
                if (!atlasContent) {
                    console.error(`[MainLayer] Spine Atlas data not found in cache: ${spineAtlasUrl}`);
                    return;
                }

                try {
                    contentNode = sp.SkeletonAnimation.createWithJsonFile(spineJsonUrl, spineAtlasUrl, 1.0);
                } catch (e) {
                    console.error("[MainLayer] Error creating sp.SkeletonAnimation:", e);
                    return;
                }

                if (!contentNode) {
                    console.error("[MainLayer] sp.SkeletonAnimation creation failed (contentNode is null).");
                    return;
                }

                node = new DraggableNode(contentNode.getContentSize());
                node.setAnchorPoint(0.5, 0.5);
                node.setPosition(this.CX, this.CY);
                node.spine = contentNode;
                node.assetType = 'spine';
                console.log(`[MainLayer] Successfully created Spine node: ${assetInfo.name}`);
                break;

            case 'ui':
            case 'cocosstudio':
                var json = ccs.load(assetInfo.url);
                contentNode = json.node;
                var size = contentNode.getContentSize();
                if (size.width < 0.01 || size.height < 0.01) {
                    size = contentNode.getBoundingBoxToWorld();
                    if (size.width < 0.01 || size.height < 0.01) {
                        console.warn(`UI asset '${assetInfo.name}' has invalid content size. Using default DraggableNode size.`);
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
                node.assetType = 'action';
                node.actionUrl = assetInfo.url;
                break;

            case 'image':
                const texture = cc.loader.getRes(assetInfo.url);
                if (!texture) {
                    console.error(`[Error] Image asset '${assetInfo.name}' texture not found in cache: ${assetInfo.url}`);
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
                console.error(`[Error] 알 수 없는 에셋 타입입니다: ${assetInfo.type}`);
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
                if(children) {
                    children.forEach(child => addNodeToMap(child));
                }
            };
            addNodeToMap(node);

            this.refreshHierarchyView();
        }
    },

    _buildChildrenRecursive: function(parentNode) {
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

    refreshHierarchyView: function() {
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

    updateMenuWithNodeId: function(nodeId) {
        // 이 함수는 jstree 노드 또는 MainLayer의 onMouseDown 이벤트에서 호출됩니다.
        // 특정 노드를 선택하거나 (nodeId가 있을 때)
        // 선택을 취소할 때 (nodeId가 null일 때) 사용됩니다.

        if (!nodeId) {
            // 노드 선택 취소 로직
            Target = null;
            this._treeView.setNode(null); // 이 호출은 이제 jstree 데이터를 초기화하지 않습니다.
            this.setDraggableItem(null);

            // jstree의 선택도 명시적으로 해제합니다.
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.deselect_all(true); // true는 이벤트 발생을 억제합니다.
            }

            // 기즈모는 setNode(null) 내에서 이미 처리됩니다.
            return;
        }

        // 특정 노드 선택 로직
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

        Target = selectedDraggableNode;

        this._treeView.setNode(node); // 이 호출은 노드 속성 패널을 업데이트하고 기즈모를 그립니다.

        if (selectedDraggableNode) {
            this.setDraggableItem(selectedDraggableNode.getName());
        } else {
            this.setDraggableItem(null);
        }

        // jstree에서 해당 노드를 선택하고 부모 노드를 열어줍니다.
        const tree = $('#widgetTree').jstree(true);
        if (tree) {
            // 먼저 모든 선택을 해제하여 단일 선택을 보장합니다.
            // true는 changed.jstree 이벤트를 발생시키지 않아 무한 루프를 방지합니다.
            tree.deselect_all(true);
            const jstreeNode = tree.get_node(nodeId);
            if (jstreeNode) {
                // 선택된 노드를 선택합니다.
                tree.select_node(jstreeNode, true);
                // 선택된 노드의 부모 노드를 열어줍니다.
                // false는 모든 자식 노드까지 재귀적으로 여는 것을 방지합니다.
                tree.open_node(jstreeNode, null, false);
            }
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

    deleteItem : function (cocosNodeIdToDelete) {
        var selectNode = this.nodeMap[cocosNodeIdToDelete];

        if(selectNode) {
            if(Target === selectNode) {
                Target = null;
                this._treeView.setNode(null);
            }

            if (selectNode.getParent()) { // 부모가 있다면 부모로부터 제거
                selectNode.removeFromParent(true);
            }

            const removeNodeFromMapRecursive = (n) => {
                if (!n) return;
                delete this.nodeMap[n.__instanceId];
                if (n instanceof DraggableNode) {
                    if (n.ui && this.nodeMap[n.ui.__instanceId]) delete this.nodeMap[n.ui.__instanceId];
                    if (n.armature && this.nodeMap[n.armature.__instanceId]) delete this.nodeMap[n.armature.__instanceId];
                    if (n.spine && this.nodeMap[n.spine.__instanceId]) delete this.nodeMap[n.spine.__instanceId];
                    if (n.image && this.nodeMap[n.image.__instanceId]) delete this.nodeMap[n.image.__instanceId];
                }
                const children = n.getChildren();
                if(children) {
                    children.forEach(child => removeNodeFromMapRecursive(child));
                }
            };
            removeNodeFromMapRecursive(selectNode);

            // this.sceneNodes에서 해당 DraggableNode 인스턴스 이름 찾아서 삭제
            for (const name in this.sceneNodes) {
                if (this.sceneNodes.hasOwnProperty(name) && this.sceneNodes[name].__instanceId === cocosNodeIdToDelete) {
                    delete this.sceneNodes[name];
                    break;
                }
            }

            // 시퀀서에 노드 삭제를 알림 (추가된 부분)
            if (Sequencer && Sequencer._clearClipsForNode) { // Sequencer에 _clearClipsForNode 함수 추가 필요
                Sequencer._clearClipsForNode(cocosNodeIdToDelete);
            }

            // [수정]: jstree에서 직접 노드를 삭제하는 대신, refreshHierarchyView를 통해 전체 계층구조를 새로고침.
            this.refreshHierarchyView();

            console.log(`Node with ID ${cocosNodeIdToDelete} deleted.`);
        } else {
            console.warn(`Cocos2d-JS Node with ID ${cocosNodeIdToDelete} not found for deletion.`);
        }
    },

    setDraggableItem: function( name ) {
        for( var nodeName in this.sceneNodes ) {
            if( typeof this.sceneNodes[ nodeName ].setDraggable === 'function' ) {
                this.sceneNodes[ nodeName ].setDraggable( false );
            }
        }
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
            case 'image':
                durationInSeconds = 0;
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
        window.MainLayerInstance = layer; // MainLayer 인스턴스를 전역 변수에 저장

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
            accept: ".custom-tree-item",
            drop: function(event, ui) {
                const assetName = ui.helper.data('assetName');
                const assetType = ui.helper.data('assetType');
                if (assetName && assetType && layer) {
                    layer.createInstanceFromLibrary(assetName, assetType);
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
                        const worldBoundingBox = child.getStaticHitboxWorld();
                        if(cc.rectContainsPoint(worldBoundingBox, event.getLocation())){
                            touchedDraggableNode = child;
                            break;
                        }
                    }
                }

                if (touchedDraggableNode) {
                    // 노드를 클릭했을 때 해당 노드를 선택하고 메뉴를 업데이트
                    mainLayer.updateMenuWithNodeId(touchedDraggableNode.__instanceId);
                } else {
                    // 빈 곳을 클릭했을 때 현재 선택된 노드를 취소하고 기즈모 제거
                    mainLayer.updateMenuWithNodeId(null);
                    // jstree의 선택을 명시적으로 해제합니다.
                    // 이 부분은 updateMenuWithNodeId(null) 안에서 이미 처리되므로 여기서는 제거합니다.
                    // const tree = $('#widgetTree').jstree(true);
                    // if (tree) {
                    //     tree.deselect_all(true);
                    // }
                }
            },
            swallowTouches: true
        }, this );
    },

    getFrontTouchedNode: function( touchPos ) {
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