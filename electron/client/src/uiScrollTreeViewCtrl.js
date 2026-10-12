class UIScrollTreeViewCtrl {
    constructor(mainLayer) {
        this._scrolling = false;
        this._lastPoint = null;
        this.TAG_CLIPPERNODE = 1;
        this.TAG_CONTENTNODE = 2;
        this._selectNode = [];
        this._masterNode = null;
        this._mainLayer = mainLayer;

        const self = this;

        cc.eventManager.addCustomListener('node_drag_started', function (event) {
            const eventData = event.getUserData();
            if (eventData && eventData.nodeId) {
                const tree = $('#widgetTree').jstree(true);
                const allNodes = tree.get_json('#', {
                    flat: true
                });
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

        $(document).on('click', '#widgetContainer .simplebar-content', function (e) {
            if (e.target === this) {
                $('#widgetTree').jstree(true).deselect_all();
                self._mainLayer.updateMenuWithNodeId(null);
                self._mainLayer.setLastSelectedItem(null);
            }
        });

        $('#widgetTree').jstree({
            'core': {
                'data': [],
                'multiple': false,
                "check_callback": function (operation, node, parent, position, more) {
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
                            if (targetParentCocosNode instanceof DraggableNode || targetParentCocosNode === mainLayerInstance) {
                                return true;
                            }
                            if (targetParentCocosNode) {
                                let ancestor = targetParentCocosNode;
                                while (ancestor.getParent() && !(ancestor instanceof DraggableNode)) {
                                    ancestor = ancestor.getParent();
                                    if (ancestor instanceof MainLayer) {
                                        ancestor = null;
                                        break;
                                    }
                                }
                                if (ancestor instanceof DraggableNode && (ancestor.assetType === 'ui' || ancestor.assetType === 'cocosstudio')) {
                                    return true;
                                }
                            }
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
                "show_only_matches": true,
                // 이름으로 검색, "t:Text" 처럼 쓰면 노드 종류로 필터
                "search_callback": function (str, node) {
                    const q = String(str).trim().toLowerCase();
                    if (!q) return false;
                    if (q.indexOf('t:') === 0) {
                        const type = q.slice(2).trim();
                        return !!type && !!(node.data && node.data.cls) && node.data.cls.toLowerCase().indexOf(type) >= 0;
                    }
                    const name = $('<div>').html(node.text).find('.node-name').text().toLowerCase();
                    return name.indexOf(q) >= 0;
                }
            },
            "state": {
                "key": "widgetTreeOpenState",
                "events": "open_node.jstree close_node.jstree",
                "ttl": false
            }
        });

        $('#widgetTree').on('contextmenu.jstree', '.jstree-anchor', function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`[DEBUG - UI_TREE_CTRL] Hierarchy 컨텍스트 메뉴 이벤트 발생. Target (직전): ${self._mainLayer.Target ? self._mainLayer.Target.__instanceId : 'null'}`);
            const $anchor = $(this);
            const nodeId = $anchor.closest('.jstree-node').attr('id');
            const tree = $('#widgetTree').jstree(true);
            const selectedNode = tree.get_node(nodeId);
            let canDelete = false;
            if (selectedNode?.data?.nodeId) {
                const cocosNode = self._mainLayer.nodeMap[selectedNode.data.nodeId];
                canDelete = (cocosNode instanceof DraggableNode) || (cocosNode.getParent() instanceof DraggableNode);
            }
            console.log(`[DEBUG - UI_TREE_CTRL] showJsTreeContextMenu 호출 전. Target (현재): ${self._mainLayer.Target ? self._mainLayer.Target.__instanceId : 'null'}`);
            const cocosNode = selectedNode?.data?.nodeId ? self._mainLayer.nodeMap[selectedNode.data.nodeId] : null;
            self._mainLayer._contextMenuManager.showJsTreeContextMenu(e, this, selectedNode, canDelete, cocosNode);
        });

        $('#widgetTree').droppable({
            accept: ".custom-tree-item",
            drop: function (event, ui) {
                $(this).removeClass('track-drop-hover');
                const assetName = ui.helper.data('assetName');
                const assetType = ui.helper.data('assetType');
                if (assetName && assetType && self._mainLayer) {
                    self._mainLayer.createInstanceFromLibrary(assetName, assetType);
                }
            },
            over: function (event, ui) {
                $(this).addClass('track-drop-hover');
            },
            out: function (event, ui) {
                $(this).removeClass('track-drop-hover');
            }
        });

        $('#widgetTree').on('ready.jstree', function () {
            var $anchors = $(this).find('.jstree-anchor');
            $anchors.on('mousedown', function (e) {
                e.preventDefault();
            }).draggable({
                appendTo: 'body',
                helper: function () {
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

        $(document).on('input', '#searchNode', function () {
            const tree = $('#widgetTree').jstree(true);
            if (!tree) return;
            const q = this.value.trim();
            if (q) tree.search(q);
            else tree.clear_search();
        });

        $('#widgetTree').on("changed.jstree", function (e, data) {
            if (data.node && data.node.data && data.node.data.nodeId && data.action === 'select_node') {
                const selectedNodeId = data.node.data.nodeId;
                self._mainLayer.updateMenuWithNodeId(selectedNodeId);
                self._mainLayer.setLastSelectedItem({
                    type: 'hierarchy',
                    data: {
                        nodeId: selectedNodeId
                    }
                });
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
                const newLocalPos = newParentCocosNodeInstance.convertToNodeSpace(cc.p(currentWorldPos.x, currentWorldPos.y));
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

        $('#widgetTree').on('click', '.visibility-toggle', function (e) {
            e.stopPropagation();
            const $icon = $(this);
            const nodeId = $icon.data('node-id');
            const cocosNode = self._mainLayer.nodeMap[nodeId];
            if (cocosNode) {
                const newVisibility = !cocosNode.isVisible();
                cocosNode.setVisible(newVisibility);
                $icon.toggleClass('fa-eye', newVisibility).toggleClass('fa-eye-slash', !newVisibility);
                $icon.closest('.jstree-anchor').toggleClass('node-hidden', !newVisibility);
                if (self._selectNode.length > 0 && self._selectNode[0].__instanceId === nodeId) {
                    Inspector.refresh();
                }
            }
        });

        $('#widgetTree').on('click', '.delete-node-icon', function(e) {
            e.stopPropagation(); // 이벤트 전파를 막아 다른 동작(노드 선택 등)을 방지
            const nodeId = $(this).data('node-id');
            if (nodeId && self._mainLayer && self._mainLayer._deletionManager) {
                self._mainLayer._deletionManager.deleteSceneNode(nodeId);
            }
        });

        $('#actionTree').addClass('custom-tree-container');
    }

    /**
     * uiWidgets 복사 대상 결정
     * @param {{scope: string, includeRoot: boolean}} opts
     * @param {cc.Node} [targetNode] 우클릭 메뉴로 지정한 노드 (없으면 현재 선택 노드)
     * @returns {{entries: Array, sourceLabel: string}|null}
     */
    resolveUIWidgetsSource(opts, targetNode) {
        const mainLayer = this._mainLayer;
        const selected = targetNode || this._selectNode[0] || null;
        const includeRoot = opts.includeRoot !== false;
        const isUI = (n) => n instanceof DraggableNode && (n.assetType === 'ui' || n.assetType === 'cocosstudio');

        let owner = null;
        for (let p = selected; p; p = p.getParent()) {
            if (p instanceof DraggableNode) { owner = p; break; }
        }
        if (!owner) {
            // 선택이 없어도 씬에 UI가 하나뿐이면 그 UI를 대상으로 한다
            const uiNodes = mainLayer.getChildren().filter(isUI);
            if (uiNodes.length === 1) owner = uiNodes[0];
        }

        const widgetTree = isUI(owner) && owner.actionUrl && cc.loader.cache[owner.actionUrl]
            ? cc.loader.cache[owner.actionUrl].widgetTree : null;

        if (opts.scope === 'subtree') {
            if (!selected) return null;
            if (isUI(owner) && (selected === owner || selected === owner.ui)) {
                return {
                    entries: widgetTree ? UIWidgetsCopy.collectFromWidgetTree(widgetTree, includeRoot)
                                        : UIWidgetsCopy.collectFromNode(owner.ui, includeRoot),
                    sourceLabel: `${owner.getName()} 전체`
                };
            }
            const subTree = widgetTree ? UIWidgetsCopy.findWidgetTreeNode(widgetTree, owner.ui, selected) : null;
            return {
                entries: subTree ? UIWidgetsCopy.collectFromWidgetTree(subTree, includeRoot)
                                 : UIWidgetsCopy.collectFromNode(selected, includeRoot),
                sourceLabel: `${selected.getName() || 'Unnamed'} 하위`
            };
        }

        if (isUI(owner)) {
            return {
                entries: widgetTree ? UIWidgetsCopy.collectFromWidgetTree(widgetTree, includeRoot)
                                    : UIWidgetsCopy.collectFromNode(owner.ui, includeRoot),
                sourceLabel: `${owner.getName()} 전체`
            };
        }

        // UI가 아닌 경우: Hierarchy 에 있는 모든 노드 이름
        const topNodes = mainLayer.getChildren().filter(n => n instanceof DraggableNode);
        if (topNodes.length === 0) return null;
        let entries = [];
        topNodes.forEach(n => { entries = entries.concat(UIWidgetsCopy.collectFromNode(n, true)); });
        return { entries: entries, sourceLabel: 'Hierarchy 전체' };
    }

    setup() {
        $('#toggleVisible').click(function () {
            this._selectNode.forEach(item => {
                item.setVisible(!item.isVisible());
            });
        }.bind(this));

        $('#openAll').click(function () {
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.open_all();
            }
        }.bind(this));

        $('#closeAll').click(function () {
            const tree = $('#widgetTree').jstree(true);
            if (tree) {
                tree.close_all();
            }
        }.bind(this));

        UIWidgetsCopyPopover.init((opts, targetNode) => this.resolveUIWidgetsSource(opts, targetNode));

        $('#copyBtn').click(function () {
            UIWidgetsCopyPopover.copyNow();
        });

        $('#copyOptionsBtn').click(function () {
            UIWidgetsCopyPopover.toggle(document.getElementById('copyBtn'));
        });

        $('#deleteNodeBtn').click(function () {
            const tree = $('#widgetTree').jstree(true);
            const selectedNodeJstreeId = tree.get_selected(true);
            if (selectedNodeJstreeId && selectedNodeJstreeId.length > 0) {
                const selectedNode = selectedNodeJstreeId[0];
                if (selectedNode.data && selectedNode.data.nodeId) {
                    const cocosNodeIdToDelete = selectedNode.data.nodeId;
                    this._mainLayer._deletionManager.deleteSceneNode(cocosNodeIdToDelete);
                }
            }
        }.bind(this));

        Inspector.init();
    }

    setNode(node) {
        // 같은 노드면(드래그로 위치가 바뀐 경우 등) 값만 갱신
        if (node && this._selectNode[0] === node) {
            Inspector.setNode(node);
            this._drawGizmo(node);
            return;
        }

        $('#actionTree').empty();
        Inspector.setNode(node);

        if (!node) {
            this._selectNode = [];
            this._masterNode = null;
            if (typeof Gizmo_ClearDraw === 'function') {
                Gizmo_ClearDraw();
            }
            return;
        }

        this._selectNode = [node];
        this._drawGizmo(node);

        if (node instanceof DraggableNode) {
            const draggableNodeInstance = node;
            let unifiedAnimationList = [];
            let contentNodeForAnimation = draggableNodeInstance.ui || draggableNodeInstance.armature || draggableNodeInstance.spine || draggableNodeInstance.image;

            if (contentNodeForAnimation) {
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
                    case 'ui':
                    case 'cocosstudio':
                        if (draggableNodeInstance.cocosAction && draggableNodeInstance.cocosAction._animationInfos) {
                            for (let key in draggableNodeInstance.cocosAction._animationInfos) {
                                unifiedAnimationList.push({ name: key, type: 'action' });
                            }
                        } else if (draggableNodeInstance.actionUrl) {
                            const rawActionList = ccs.actionManager.getActionList(draggableNodeInstance.actionUrl);
                            if (rawActionList) {
                                rawActionList.forEach(action => unifiedAnimationList.push({ name: action.getName(), type: 'action' }));
                            }
                        }
                        break;
                }
            }

            const $actionContainer = $('#actionTree');
            const self = this;
            unifiedAnimationList.forEach(item => {
                let iconText = '';
                let typeClass = `type-${item.type}`;
                if (item.type === 'armature') iconText = 'AR';
                if (item.type === 'spine') iconText = 'SP';
                if (item.type === 'action') iconText = 'UI';
                const $item = $(`
                <div class="custom-tree-item" data-anim-name="${item.name}" data-anim-type="${item.type}">
                    <span class="track-type-icon ${typeClass}">${iconText}</span>
                    ${item.name}
                </div>
            `);

                $item.draggable({
                    appendTo: "body",
                    distance: 10,
                    helper: function () {
                        const assetName = $(this).data('anim-name');
                        const $helper = $(`<div class="custom-drag-helper">${assetName}</div>`);
                        $helper.data('animName', assetName);
                        $helper.data('animType', $(this).data('anim-type'));
                        $(this).draggable("option", "cursorAt", { left: 1, top: 1 });
                        return $helper;
                    },
                    revert: 'invalid',
                    revertDuration: 200,
                    zIndex: 9999,
                    start: function (event, ui) { $('#resize-overlay').show(); },
                    stop: function (event, ui) { $('#resize-overlay').hide(); }
                });

                $item.on('click', function () {
                    $actionContainer.find('.custom-tree-item').removeClass('selected');
                    $(this).addClass('selected');
                    const animName = $(this).data('anim-name');
                    const animType = $(this).data('anim-type');
                    const draggableNode = self._selectNode[0];
                    if (!draggableNode) return;
                    if (draggableNode.spine) draggableNode.spine.clearTrack(0);
                    if (draggableNode.armature) draggableNode.armature.getAnimation().stop();
                    if (draggableNode.ui) {
                        draggableNode.ui.getChildren().forEach(child => child.stopAllActions());
                        draggableNode.ui.stopAllActions();
                    }
                    if (animType === 'spine' && draggableNode.spine) {
                        draggableNode.spine.setAnimation(0, animName);
                    } else if (animType === 'armature' && draggableNode.armature) {
                        draggableNode.armature.getAnimation().play(animName, -1);
                    } else if (animType === 'action') {
                        if (draggableNode.cocosAction) {
                            draggableNode.cocosAction.play(animName, false);
                        } else if (draggableNode.ui && draggableNode.actionUrl) {
                            ccs.actionManager.playActionByName(draggableNode.actionUrl, animName);
                        }
                    }
                });
                $actionContainer.append($item);
            });

        }
    }

    _drawGizmo(node) {
        if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
            var worldBoundingBox = node.getBoundingBoxToWorld();
            if (worldBoundingBox.width < 5) worldBoundingBox.width = 10;
            if (worldBoundingBox.height < 5) worldBoundingBox.height = 10;
            Gizmo_DrawTouchLayerByRect(worldBoundingBox);
        }
    }

    updateTreeView(treeData) {
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
    }
}
