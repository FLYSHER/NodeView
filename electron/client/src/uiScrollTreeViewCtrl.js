var UIScrollTreeViewCtrl = cc.Node.extend({
    _scrolling:false,
    _lastPoint:null,
    TAG_CLIPPERNODE : 1,
    TAG_CONTENTNODE : 2,
    _selectNode : [],
    _masterNode : null,
    _treeWidgetObj : {},
    _treeString : "",
    _mainLayer: null,

    ctor : function (mainLayer) {
        this._super("");
        this._mainLayer = mainLayer;

        const self = this;

        cc.eventManager.addCustomListener('node_drag_started', function(event) {
            const eventData = event.getUserData();
            if (eventData && eventData.nodeId) {
                const tree = $('#widgetTree').jstree(true);
                const allNodes = tree.get_json('#', { flat: true });
                let targetNodeIdInTree = null;

                for (const node of allNodes) {
                    if (node.data && node.data.nodeId === eventData.nodeId) {
                        targetNodeIdInTree = node.id;
                        break;
                    }
                }

                if (targetNodeIdInTree) {
                    tree.deselect_all();
                    tree.select_node(targetNodeIdInTree);
                    const $selectedNodeLI = tree.get_node(targetNodeIdInTree, true);
                    if ($selectedNodeLI) {
                        $selectedNodeLI.find('> .jstree-anchor').addClass('jstree-clicked');
                    }
                }
            }
        });

        $('#widgetTree').jstree({
            'core' : {
                'data' : [],
                "check_callback" : function (operation, node, parent, position, more) {
                    const mainLayerInstance = self._mainLayer;

                    if (!node || !node.data || !node.data.nodeId) {
                        return false;
                    }

                    const movingCocosNode = mainLayerInstance.nodeMap[node.data.nodeId];
                    const isMovingDraggableNode = (movingCocosNode instanceof DraggableNode);

                    const targetParentId = (typeof parent === 'object' && parent !== null && parent.id) ? parent.id : parent;

                    if (operation === "move_node") {
                        if (isMovingDraggableNode) {
                            let targetParentCocosNode = null;
                            if (targetParentId === '#') {
                                targetParentCocosNode = mainLayerInstance;
                            } else {
                                const parentJstreeNode = this.get_node(targetParentId);
                                if (parentJstreeNode && parentJstreeNode.data && parentJstreeNode.data.nodeId) {
                                    targetParentCocosNode = mainLayerInstance.nodeMap[parentJstreeNode.data.nodeId];
                                }
                            }

                            // --- 새로운 규칙 추가 ---
                            // 1. 드롭 대상이 DraggableNode이거나, 씬의 루트일 경우 (기존 규칙)
                            if (targetParentCocosNode instanceof DraggableNode || targetParentCocosNode === mainLayerInstance) {
                                return true;
                            }

                            // 2. 드롭 대상이 다른 UI 에셋의 자식 노드일 경우 (새로운 예외 규칙)
                            if (targetParentCocosNode) {
                                let ancestor = targetParentCocosNode;
                                // 대상의 최상위 DraggableNode 조상을 찾음
                                while (ancestor.getParent() && !(ancestor instanceof DraggableNode)) {
                                    ancestor = ancestor.getParent();
                                    if (ancestor instanceof MainLayer) { // MainLayer에 도달하면 중지
                                        ancestor = null;
                                        break;
                                    }
                                }

                                // 조상이 UI 또는 CocosStudio 타입이면 드롭 허용
                                if (ancestor instanceof DraggableNode && (ancestor.assetType === 'ui' || ancestor.assetType === 'cocosstudio')) {
                                    return true;
                                }
                            }

                            // 모든 규칙에 해당하지 않으면 드롭 비허용
                            return false;

                        } else {
                            const oldParentJstreeNode = this.get_node(node.parent);
                            const oldParentCocosNodeId = oldParentJstreeNode && oldParentJstreeNode.data ? oldParentJstreeNode.data.nodeId : null;
                            const newParentCocosNodeId = targetParentId === '#' ? null : this.get_node(targetParentId).data.nodeId;

                            if (oldParentCocosNodeId === newParentCocosNodeId) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                    return true;
                },
            },
            "plugins": ["search", "dnd", "state"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            },
            "state": {
                "key": "widgetTreeOpenState",
                "events": "open_node.jstree close_node.jstree",
                "ttl": false
            }
        });

        $('#widgetTree').on('contextmenu.jstree', '.jstree-anchor', function(e) {
            e.preventDefault(); // 기본 컨텍스트 메뉴 방지
            e.stopPropagation(); // 이벤트 버블링 중단

            console.log(`[DEBUG - UI_TREE_CTRL] Hierarchy 컨텍스트 메뉴 이벤트 발생. Target (직전): ${self._mainLayer.Target ? self._mainLayer.Target.__instanceId : 'null'}`); // 추가

            const $anchor = $(this);
            const nodeId = $anchor.closest('.jstree-node').attr('id');
            const tree = $('#widgetTree').jstree(true);
            const selectedNode = tree.get_node(nodeId);

            let canDelete = false;
            if (selectedNode?.data?.nodeId) {
                const cocosNode = self._mainLayer.nodeMap[selectedNode.data.nodeId];
                canDelete = (cocosNode instanceof DraggableNode) ||
                    (cocosNode.getParent() instanceof DraggableNode);
            }

            console.log(`[DEBUG - UI_TREE_CTRL] showJsTreeContextMenu 호출 전. Target (현재): ${self._mainLayer.Target ? self._mainLayer.Target.__instanceId : 'null'}`); // 추가

            self._mainLayer._contextMenuManager.showJsTreeContextMenu(e, this, selectedNode, canDelete);
        });

        $('#widgetTree').droppable({
            accept: ".custom-tree-item",
            drop: function(event, ui) {
                $(this).removeClass('track-drop-hover');
                const assetName = ui.helper.data('assetName');
                const assetType = ui.helper.data('assetType');
                if (assetName && assetType && self._mainLayer) {
                    self._mainLayer.createInstanceFromLibrary(assetName, assetType);
                }
            },
            over: function(event, ui) {
                $(this).addClass('track-drop-hover');
            },
            out: function(event, ui) {
                $(this).removeClass('track-drop-hover');
            }
        });

        $('#widgetTree').on('ready.jstree', function() {
            var $anchors = $(this).find('.jstree-anchor');
            $anchors
                .on('mousedown', function(e) {
                    e.preventDefault();
                })
                .draggable({
                    appendTo: 'body',
                    helper: function() {
                        const $helper = $(`<div class="custom-drag-helper">${$(this).text()}</div>`);
                        $(this).draggable("option", "cursorAt", {
                            left: 1,
                            top: 1
                        });
                        return $helper;
                    },
                    revert: 'invalid',
                    revertDuration: 200,
                    zIndex: 9999
                });
        });

        $(document).ready(function () {
            $(".searchNode").keyup(function () {
                var searchString = $(this).val();
                $('#widgetTree').jstree('search', searchString);
            });
        });

        $('#widgetTree').on("changed.jstree", function (e, data) {
            if (data.node && data.node.data && data.node.data.nodeId && data.action === 'select_node') {
                const selectedNodeId = data.node.data.nodeId;
                self._mainLayer.updateMenuWithNodeId(selectedNodeId);
            }
        });

        $('#widgetTree').on('move_node.jstree', function (e, data) {
            const movedNodeId = data.node.data.nodeId;
            const oldParentNodeId = data.old_parent === '#' ? null : data.instance.get_node(data.old_parent).data.nodeId;
            const newParentNodeId = data.parent === '#' ? null : data.instance.get_node(data.parent).data.nodeId;

            const movedCocosNode = self._mainLayer.nodeMap[movedNodeId];

            if (!movedCocosNode) {
                return;
            }

            const currentWorldPos = movedCocosNode.getParent().convertToWorldSpace(movedCocosNode.getPosition());

            if (movedCocosNode.getParent()) {
                movedCocosNode.retain();
                movedCocosNode.removeFromParent(false);
                movedCocosNode.release();
            }

            let newParentCocosNodeInstance = null;
            if (newParentNodeId) {
                newParentCocosNodeInstance = self._mainLayer.nodeMap[newParentNodeId];
            } else {
                newParentCocosNodeInstance = self._mainLayer;
            }

            if (newParentCocosNodeInstance) {
                const newLocalPos = newParentCocosNodeInstance.convertToNodeSpace(cc.p(currentWorldPos.x, currentWorldPos.y)); // cc.p 생성자 인자 수정
                movedCocosNode.setPosition(newLocalPos);

                newParentCocosNodeInstance.addChild(movedCocosNode);

                const tree = $('#widgetTree').jstree(true);
                const childrenOfNewParent = tree.get_children_dom(data.parent);

                const zOrderMap = new Map();
                childrenOfNewParent.each((index, domElement) => {
                    const childJstreeId = $(domElement).attr('id');
                    const childJstreeNodeData = tree.get_node(childJstreeId).data;
                    if (childJstreeNodeData && childJstreeNodeData.nodeId) {
                        zOrderMap.set(childJstreeNodeData.nodeId, index);
                    }
                });

                newParentCocosNodeInstance.getChildren().forEach(childCocosNode => {
                    if (childCocosNode instanceof cc.DrawNode) return;
                    const childCocosNodeId = childCocosNode.__instanceId;
                    if (zOrderMap.has(childCocosNodeId)) {
                        const newChildZ = zOrderMap.get(childCocosNodeId);
                        if (childCocosNode.getLocalZOrder() !== newChildZ) {
                            childCocosNode.setLocalZOrder(newChildZ);
                        }
                    }
                });
            }
            self._mainLayer.refreshHierarchyView();
        });

        $('#actionTree').addClass('custom-tree-container');

        this._jsonName = null;
    },

    setup:function () {
        $('#toggleVisible').click( function(){
            this._selectNode.forEach( item => {
                item.setVisible( !item.isVisible());
            });
        }.bind(this));

        $('#openAll').click( function(){
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.open_all();
            }
        }.bind(this));

        $('#closeAll').click( function(){
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.close_all();
            }
        }.bind(this));

        $('#copyBtn').click( function(){
            if (Object.keys(this._treeWidgetObj).length > 0) {
                var obj = this.getTreeObjName();
                this._treeString = "this._uiWidgets = {\n";
                for( var key in obj ) {
                    this._treeString += obj[ key ].copyString;
                }
                this._treeString += "};";

                if (typeof copyStringToClipboard === 'function') {
                    copyStringToClipboard( this._treeString );
                } else {
                    console.warn("copyStringToClipboard 함수가 정의되지 않았습니다.");
                }
            } else {
                console.warn("복사할 트리 데이터가 없습니다. 먼저 트리를 로드하거나 선택해주세요.");
            }
        }.bind(this));

        $('#deleteNodeBtn').click(function() {
            const tree = $('#widgetTree').jstree(true);
            const selectedNodeJstreeId = tree.get_selected(true);

            if (selectedNodeJstreeId && selectedNodeJstreeId.length > 0) {
                const selectedNode = selectedNodeJstreeId[0];
                if (selectedNode.data && selectedNode.data.nodeId) {
                    const cocosNodeIdToDelete = selectedNode.data.nodeId;
                    // DeletionManager를 통해 삭제 요청
                    this._mainLayer._deletionManager.deleteSceneNode(cocosNodeIdToDelete);
                } else {
                    console.warn("삭제할 수 있는 노드가 선택되지 않았습니다.");
                }
            } else {
                console.warn("계층구조 패널에서 삭제할 노드를 선택해주세요.");
            }
        }.bind(this));

        // Armature 디버그 버튼 로직 수정
        $('#debugBone').click( function( sender ){
            this._selectNode.forEach( item => {
                const targetArmature = item.armature || (item instanceof ccs.Armature ? item : null);
                if( targetArmature ) {
                    const isDebugEnabled = targetArmature.getDebugBonesEnabled ? targetArmature.getDebugBonesEnabled() : false;
                    targetArmature.setDebugBone(!isDebugEnabled); // 토글
                    sender.target.innerText = !isDebugEnabled ? "Hide Bone" : "Show Bone"; // 텍스트 토글
                }
            });
        }.bind(this));

        // Spine 디버그 버튼 로직 수정
        $('#debugSlot').click( function( sender ){
            this._selectNode.forEach( item => {
                const targetSpine = item.spine || (item instanceof sp.SkeletonAnimation ? item : null);
                if( targetSpine ) {
                    const isDebugEnabled = targetSpine.getDebugSlotsEnabled ? targetSpine.getDebugSlotsEnabled() : false;
                    targetSpine.setDebugSlotsEnabled(!isDebugEnabled); // 토글
                    sender.target.innerText = !isDebugEnabled ? "Hide Slot" : "Show Slot"; // 텍스트 토글
                }
            });
        }.bind(this));


        // Position X Input
        document.getElementById('posX').addEventListener('input', function(e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setPositionX(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Position Y Input
        document.getElementById('posY').addEventListener('input', function(e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setPositionY(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Scale X Input
        document.getElementById('scaleX').addEventListener('input', function(e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setScaleX(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Scale Y Input
        document.getElementById('scaleY').addEventListener('input', function(e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setScaleY(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Rotation Input
        document.getElementById('rotation').addEventListener('input', function(e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setRotation(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Opacity Range Slider
        document.getElementById('opacity').addEventListener('input', function(e) {
            const val = parseInt(e.target.value, 10);
            document.getElementById('opacityValue').textContent = val;
            this._selectNode.forEach(item => {
                if (item) {
                    item.setOpacity(val);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Visible Checkbox
        document.getElementById('visible').addEventListener('change', function(e) {
            this._selectNode.forEach(item => {
                if (item) {
                    item.setVisible(e.target.checked);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        // Draggable Labels for Value Change
        let isDraggingLabel = false;
        let startMouseX = 0;
        let startValue = 0;
        let activeInputEl = null;
        let sensitivity = 0.1;

        const handleLabelMousedown = (e) => {
            if (!this._selectNode[0] || e.button !== 0) return;

            const targetLabel = e.currentTarget;
            const targetInputId = targetLabel.dataset.target;
            activeInputEl = document.getElementById(targetInputId);

            if (!activeInputEl || activeInputEl.disabled) {
                activeInputEl = null;
                return;
            }

            e.preventDefault();
            isDraggingLabel = true;
            startMouseX = e.clientX;

            startValue = parseFloat(activeInputEl.value);

            if (activeInputEl.id.includes('scale')) {
                sensitivity = 0.01;
            } else if (activeInputEl.id === 'rotation') {
                sensitivity = 0.2;
            } else {
                sensitivity = 0.5;
            }

            document.body.style.cursor = 'ew-resize';
            $('#resize-overlay').show(); // 드래그 시작 시 오버레이 활성화
        };

        const handleLabelMousemove = (e) => {
            if (!isDraggingLabel || !activeInputEl) return;

            e.preventDefault();

            const deltaX = e.clientX - startMouseX;
            let newValue;

            newValue = startValue + deltaX * sensitivity;
            const step = parseFloat(activeInputEl.step) || 1;
            newValue = Math.round(newValue / step) * step;
            activeInputEl.value = newValue.toFixed(activeInputEl.step ? activeInputEl.step.split('.')[1]?.length || 0 : 2);
            activeInputEl.dispatchEvent(new Event('input', { bubbles: true }));
        };

        const handleLabelMouseup = () => {
            if (isDraggingLabel) {
                isDraggingLabel = false;
                activeInputEl = null;
                document.body.style.cursor = 'default';
                $('#resize-overlay').hide(); // 드래그 종료 시 오버레이 비활성화
            }
        };

        document.addEventListener('mousemove', handleLabelMousemove);
        document.addEventListener('mouseup', handleLabelMouseup);
        document.addEventListener('touchmove', handleLabelMousemove);
        document.addEventListener('touchend', handleLabelMouseup);

        const draggableLabels = document.querySelectorAll('.draggable-label');
        draggableLabels.forEach(label => {
            // 이벤트 리스너가 중복해서 추가되지 않도록 기존 리스너 제거
            label.removeEventListener('mousedown', handleLabelMousedown);
            label.removeEventListener('touchstart', handleLabelMousedown);
            label.addEventListener('mousedown', handleLabelMousedown);
            label.addEventListener('touchstart', handleLabelMousedown);
        });
    },

    setNode: function(node) {
        if (!node) {
            this._selectNode = [];
            this._masterNode = null;

            $('#actionTree').empty();
            // Properties 패널의 필드들을 초기화하고 비활성화합니다.
            document.getElementById('nodeName').value = '';
            document.getElementById('nodeName').disabled = true;
            document.getElementById('zOrderValue').textContent = '0';
            document.getElementById('posX').value = '';
            document.getElementById('posX').disabled = true;
            document.getElementById('posY').value = '';
            document.getElementById('posY').disabled = true;
            document.getElementById('scaleX').value = '';
            document.getElementById('scaleX').disabled = true;
            document.getElementById('scaleY').value = '';
            document.getElementById('scaleY').disabled = true;
            document.getElementById('rotation').value = '';
            document.getElementById('rotation').disabled = true;
            document.getElementById('opacity').value = 255;
            document.getElementById('opacity').disabled = true;
            document.getElementById('opacityValue').textContent = '255';
            document.getElementById('visible').checked = false;
            document.getElementById('visible').disabled = true;

            var searchBox = document.getElementById("searchNode");
            var uiOption = document.getElementById("ui-option");
            var spineOption = document.getElementById("spine-option");
            if (searchBox) searchBox.style.visibility = 'hidden';
            if (uiOption) uiOption.style.display = 'none'; // 'visibility' 대신 'display'로 변경하여 공간 차지 방지
            if (spineOption) spineOption.style.display = 'none'; // 'visibility' 대신 'display'로 변경하여 공간 차지 방지

            if (typeof Gizmo_ClearDraw === 'function') {
                Gizmo_ClearDraw();
            }
            return;
        }

        // --- Properties 패널에 보낼 정보는 항상 DraggableNode 인스턴스에서 가져옵니다. ---
        const draggableNodeInstance = node; // `node`는 MainLayer에서 전달하는 DraggableNode 인스턴스입니다.
        this._selectNode = [draggableNodeInstance];

        document.getElementById('nodeName').value = draggableNodeInstance.getName() || "";
        document.getElementById('nodeName').disabled = true; // 읽기 전용 유지

        document.getElementById('zOrderValue').textContent = draggableNodeInstance.getLocalZOrder ? draggableNodeInstance.getLocalZOrder() : '0';

        document.getElementById('posX').value = draggableNodeInstance.getPosition().x.toFixed(2);
        document.getElementById('posY').value = draggableNodeInstance.getPosition().y.toFixed(2);
        document.getElementById('posX').disabled = false;
        document.getElementById('posY').disabled = false;

        document.getElementById('scaleX').value = draggableNodeInstance.getScaleX ? draggableNodeInstance.getScaleX().toFixed(2) : '1.00';
        document.getElementById('scaleY').value = draggableNodeInstance.getScaleY ? draggableNodeInstance.getScaleY().toFixed(2) : '1.00';
        document.getElementById('scaleX').disabled = false;
        document.getElementById('scaleY').disabled = false;

        document.getElementById('rotation').value = draggableNodeInstance.getRotation ? draggableNodeInstance.getRotation().toFixed(2) : '0.00';
        document.getElementById('rotation').disabled = false;

        const currentOpacity = draggableNodeInstance.getOpacity ? draggableNodeInstance.getOpacity() : 255;
        document.getElementById('opacity').value = currentOpacity;
        document.getElementById('opacityValue').textContent = currentOpacity;
        document.getElementById('opacity').disabled = false;

        const isVisible = draggableNodeInstance.isVisible ? draggableNodeInstance.isVisible() : true;
        document.getElementById('visible').checked = isVisible;
        document.getElementById('visible').disabled = false;

        const selectNodeBtn = document.getElementById('selectNodeBtn');
        if (selectNodeBtn) selectNodeBtn.disabled = false;

        if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
            var worldBoundingBox = draggableNodeInstance.getBoundingBoxToWorld();
            if(worldBoundingBox.width < 5) worldBoundingBox.width = 10;
            if (worldBoundingBox.height < 5 ) worldBoundingBox.height = 10;

            Gizmo_DrawTouchLayerByRect(worldBoundingBox);
        }

        // --- Animations 패널 (actionTree)에 보낼 정보는 DraggableNode의 자식 컨텐츠 노드에서 가져옵니다. ---
        let unifiedAnimationList = [];
        let contentNodeForAnimation = null;

        // 원본 로직과 동일하게 자식 노드를 contentNodeForAnimation으로 사용합니다.
        contentNodeForAnimation = draggableNodeInstance.ui || draggableNodeInstance.armature || draggableNodeInstance.spine || draggableNodeInstance.image;

        if (contentNodeForAnimation) {
            // `assetType`은 DraggableNode에 저장된 정보를 사용합니다.
            switch (draggableNodeInstance.assetType) {
                case 'armature':
                    if (contentNodeForAnimation.getAnimation && contentNodeForAnimation.getAnimation()._animationData && contentNodeForAnimation.getAnimation()._animationData.movementNames) {
                        contentNodeForAnimation.getAnimation()._animationData.movementNames.forEach(name => unifiedAnimationList.push({ name: name, type: 'armature' }));
                    }
                    break;
                case 'spine':
                    if (contentNodeForAnimation.getState && contentNodeForAnimation.getState().data && contentNodeForAnimation.getState().data.skeletonData && contentNodeForAnimation.getState().data.skeletonData.animations) {
                        contentNodeForAnimation.getState().data.skeletonData.animations.forEach(anim => unifiedAnimationList.push({ name: anim.name, type: 'spine' }));
                    }
                    break;
                // [핵심 수정]: 'action' 대신 'ui'와 'cocosstudio' 타입을 사용합니다.
                case 'ui':
                case 'cocosstudio':
                    if (draggableNodeInstance.cocosAction && draggableNodeInstance.cocosAction._animationInfos) {
                        for (let key in draggableNodeInstance.cocosAction._animationInfos) {
                            unifiedAnimationList.push({ name: key, type: 'action' }); // UI 액션은 여전히 'action' 타입으로 표시
                        }
                    } else if (draggableNodeInstance.actionUrl) {
                        // ccs.actionManager.getActionList는 URL 기반으로 액션 목록을 가져옵니다.
                        const rawActionList = ccs.actionManager.getActionList(draggableNodeInstance.actionUrl);
                        if (rawActionList) {
                            rawActionList.forEach(action => unifiedAnimationList.push({ name: action.getName(), type: 'action' }));
                        } else if (cc.loader.cache[draggableNodeInstance.actionUrl] && cc.loader.cache[draggableNodeInstance.actionUrl].animation && cc.loader.cache[draggableNodeInstance.actionUrl].animation.actionlist) {
                            // 캐시된 JSON 데이터에서 직접 액션 목록을 가져오는 대체 로직
                            cc.loader.cache[draggableNodeInstance.actionUrl].animation.actionlist.forEach(action => {
                                unifiedAnimationList.push({ name: action.name, type: 'action' });
                            });
                        }
                    }
                    break;
            }
        }

        const $actionContainer = $('#actionTree');
        $actionContainer.empty();

        unifiedAnimationList.forEach(item => {
            let iconText = '';
            let typeClass = `type-${item.type}`;
            if (item.type === 'armature') iconText = 'AR';
            if (item.type === 'spine') iconText = 'SP';
            // UI/CocosStudio 액션은 'action' 타입으로 표시되므로 'UI' 텍스트 사용
            if (item.type === 'action') iconText = 'UI';

            const $item = $(`
            <div class="custom-tree-item" data-anim-name="${item.name}" data-anim-type="${item.type}">
                <span class="track-type-icon ${typeClass}">${iconText}</span>
                ${item.name}
            </div>
        `);

            $item.draggable({
                appendTo: "body",
                helper: function() {
                    const assetName = $(this).data('anim-name');
                    const $helper = $(`<div class="custom-drag-helper">${assetName}</div>`);
                    $helper.data('animName', assetName);
                    $helper.data('animType', $(this).data('anim-type'));
                    $(this).draggable("option", "cursorAt", {
                        left: 1,
                        top: 1
                    });
                    return $helper;
                },
                revert: 'invalid',
                revertDuration: 200,
                zIndex: 9999,
                start: function(event, ui) {
                    $('#resize-overlay').show();
                },
                stop: function(event, ui) {
                    $('#resize-overlay').hide();
                }
            });

            $item.on('click', () => {
                $actionContainer.find('.custom-tree-item').removeClass('selected');
                $item.addClass('selected');
            });

            $actionContainer.append($item);
        });

        var searchBox = document.getElementById("searchNode");
        var uiOption = document.getElementById("ui-option");
        var spineOption = document.getElementById("spine-option");

        if (searchBox) searchBox.style.visibility = 'visible';
        // 'display' 속성을 'block'으로 설정하여 UI 옵션을 항상 표시합니다.
        if (uiOption) uiOption.style.display = 'block';

        // spine-option 가시성 제어 (DraggableNode의 assetType 사용)
        if (draggableNodeInstance && draggableNodeInstance.assetType === 'spine') {
            if (spineOption) spineOption.style.display = 'block'; // 'visibility' 대신 'display' 사용
        } else {
            if (spineOption) spineOption.style.display = 'none'; // 'visibility' 대신 'display' 사용
        }
    },

    selectNode :function (nodeObj) {
        this._selectNode.length = 0;
        this._selectNode = [nodeObj];

        if(nodeObj.isVisible() )
            $('#toggleVisible').html('Hide');
        else
            $('#toggleVisible').html('Show');

        $('#localPos').html("(" + nodeObj.getPosition().x.toFixed(2) + " , " +nodeObj.getPosition().y.toFixed(2) + ")");
        $("input[name=lPosX]").val(nodeObj.getPosition().x.toFixed(2));
        $("input[name=lPosY]").val(nodeObj.getPosition().y.toFixed(2));
        $('#LocalSize').html("(" + nodeObj.getContentSize().width.toFixed(2) + " , " +nodeObj.getContentSize().height.toFixed(2) + ")");

        $("input[name=opacity]").val( opa);
        $('#opacityValue').html( opa );

        $('#anchorValue').html("("+ ancX+" , "+ancY+")");

        $('#zOrderValue').html(zOrder);

        var rectNode = cc.director.getRunningScene().getChildByTag(gizmoNodTag);
        if(!rectNode) {
            rectNode = new cc.DrawNode();
            rectNode.setTag(gizmoNodTag);
            cc.director.getRunningScene().addChild(rectNode, 999999, gizmoNodTag);
        }
        else{
            rectNode.clear();
        }
    },

    selectNodeMulti :function (nodeArr) {
        this._selectNode.length = 0;
        this._selectNode = nodeArr;

        var posX = this._selectNode[0].getPosition().x.toFixed(2);
        var posY= this._selectNode[0].getPosition().y.toFixed(2);
        var sizeW= this._selectNode[0].getContentSize().width;
        var sizeH= this._selectNode[0].getContentSize().height;
        var opa= this._selectNode[0].getOpacity();
        var ancX= this._selectNode[0].getAnchorPoint().x;
        var ancY= this._selectNode[0].getAnchorPoint().Y;
        var zOrder= this._selectNode[0].getLocalZOrder();

        this._selectNode.forEach( item => {
            posX = posX === item.getPosition().x.toFixed(2) ? posX : "-";
            posY = posY === item.getPosition().y.toFixed(2) ? posY : "-";
            sizeW = sizeW === item.getContentSize().width ? sizeW : "-";
            sizeH = sizeH === item.getContentSize().height ? sizeH : "-";
            opa = opa === item.getOpacity() ? opa : "-";
            ancX = ancX === item.getAnchorPoint().x ? ancX : "-";
            ancY = ancY === item.getAnchorPoint().Y ? ancY : "-";
            zOrder = zOrder === item.getLocalZOrder() ? zOrder : "-";
        });

        if(this._selectNode[0].isVisible() )
            $('#toggleVisible').html('Hide');
        else
            $('#toggleVisible').html('Show');

        $('#localPos').html("(" + posX + " , " + posY + ")");
        $("input[name=lPosX]").val(posX);
        $("input[name=lPosY]").val(posY);
        $('#LocalSize').html("(" + sizeW + " , " + sizeH + ")");

        $("input[name=opacity]").val( opa);
        $('#opacityValue').html( opa );

        $('#anchorValue').html("("+ ancX+" , "+ancY+")");

        $('#zOrderValue').html(zOrder);

        var rectNode = cc.director.getRunningScene().getChildByTag(gizmoNodTag);
        if(!rectNode) {
            rectNode = new cc.DrawNode();
            rectNode.setTag(gizmoNodTag);
            cc.director.getRunningScene().addChild(rectNode, 999999, gizmoNodTag);
        }
        else{
            rectNode.clear();
        }
    },

    updateTreeView: function(treeData) {
        this._treeWidgetObj = {};
        const processNode = (nodeData) => {
            if (nodeData.data && nodeData.data.nodeId) {
                const cocosNode = this._mainLayer.nodeMap[nodeData.data.nodeId];
                if (cocosNode && cocosNode.getName()) {
                    this._treeWidgetObj[nodeData.data.nodeId] = {
                        name: cocosNode.getName(),
                    };
                }
            }
            if (nodeData.children && nodeData.children.length > 0) {
                nodeData.children.forEach(child => processNode(child));
            }
        };
        treeData.forEach(node => processNode(node));

        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
    },

    getTreeObjName: function() {
        var length = Object.keys( this._treeWidgetObj ).length;
        var treeArrName = {};
        var treeObjName = [];

        for( var key1 in this._treeWidgetObj ) {
            treeArrName [ key1 ] = {};
            treeArrName [ key1 ].name = this._treeWidgetObj[ key1 ].name;
            treeArrName [ key1 ].copyString = this._treeWidgetObj[ key1 ].name + " : null,\n";
            treeObjName[ treeObjName.length ] = treeArrName [ key1 ].name;
        }

        for( var loop1 = 0; loop1 < length; loop1++ ) {
            var name = treeObjName[ loop1 ];
            var firstSubString1 = name.substring( 0, name.length - 2 );
            var firstSubString2 = name.substring( name.length - 2, name.length );

            if( firstSubString2 === '01' ) {
                var find = false;
                var idx = 1;
                var addTreeNameArr = null;

                for( var loop2 = 0; loop2 < length; loop2++ ) {
                    name = treeObjName[ loop2 ];
                    var secondSubString1 = name.substring( 0, name.length - 2 );
                    var secondSubString2 = name.substring( name.length - 2, name.length );
                    secondSubString2 = name.substring( name.length - 2, name.length );

                    if( firstSubString1 === secondSubString1 && secondSubString2 === '02' ) {
                        find = true;
                    }
                }

                while( find ) {
                    for( var key2 in treeArrName ) {
                        var objName = firstSubString1 + ( idx < 10 ? '0' + idx : idx );
                        var objName2 = treeArrName[ key2 ].name;
                        find = false;

                        if( objName2 === objName ) {
                            addTreeNameArr = firstSubString1;
                            find = true;
                            idx++;

                            delete treeArrName[ key2 ];

                            break;
                        }
                    }
                }
            }

            if( addTreeNameArr ) {
                treeArrName [ addTreeNameArr ] = {};
                treeArrName [ addTreeNameArr ].name = addTreeNameArr;
                treeArrName [ addTreeNameArr ].copyString = addTreeNameArr + " : [],\n";
                addTreeNameArr = null;
            }
        }

        return treeArrName;
    }
});