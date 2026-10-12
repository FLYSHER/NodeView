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
                "show_only_matches": true
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
                if (self._selectNode.length > 0 && self._selectNode[0].__instanceId === nodeId) {
                    $('#visible').prop('checked', newVisibility);
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

    _updateDebugButtons(node) {
        if (!(node instanceof DraggableNode)) return;
        let bonesOn = false;
        let slotsOn = false;
        if (node.spine) {
            bonesOn = node.spine.getDebugBonesEnabled();
            slotsOn = node.spine.getDebugSlotsEnabled();
        } else if (node.armature) {
            bonesOn = ArmatureDebugDraw.isEnabled(node.armature);
        }
        $('#debugBone').text(bonesOn ? 'Hide Bone' : 'Show Bone').toggleClass('active', bonesOn);
        $('#debugSlot').text(slotsOn ? 'Hide Slot' : 'Show Slot').toggleClass('active', slotsOn);
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

        $('#debugBone').click(function () {
            const node = this._selectNode[0];
            if (!(node instanceof DraggableNode)) return;
            if (node.spine) {
                node.spine.setDebugBonesEnabled(!node.spine.getDebugBonesEnabled());
            } else if (node.armature) {
                ArmatureDebugDraw.setEnabled(node.armature, !ArmatureDebugDraw.isEnabled(node.armature));
            }
            this._updateDebugButtons(node);
        }.bind(this));

        $('#debugSlot').click(function () {
            const node = this._selectNode[0];
            if (!(node instanceof DraggableNode) || !node.spine) return;
            node.spine.setDebugSlotsEnabled(!node.spine.getDebugSlotsEnabled());
            this._updateDebugButtons(node);
        }.bind(this));

        document.getElementById('labelText').addEventListener('input', function (e) {
            this._selectNode.forEach(item => {
                let target = item;
                if (item instanceof DraggableNode) {
                    target = item.ui || item.armature || item.spine || item.image || item;
                }

                if (target && typeof target.setString === 'function') {
                    target.setString(e.target.value);

                    if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
                        Gizmo_DrawTouchLayerByRect(item.getBoundingBoxToWorld());
                    }
                }
            });
        }.bind(this));

        document.getElementById('posX').addEventListener('input', function (e) {
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

        document.getElementById('posY').addEventListener('input', function (e) {
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

        document.getElementById('scaleX').addEventListener('input', function (e) {
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

        document.getElementById('scaleY').addEventListener('input', function (e) {
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

        document.getElementById('rotation').addEventListener('input', function (e) {
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

        document.getElementById('anchorX').addEventListener('input', function (e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setAnchorPoint(cc.p(val, item.getAnchorPoint().y));
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        document.getElementById('anchorY').addEventListener('input', function (e) {
            this._selectNode.forEach(item => {
                const val = parseFloat(e.target.value);
                if (!isNaN(val) && item) {
                    item.setAnchorPoint(cc.p(item.getAnchorPoint().x, val));
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        document.getElementById('opacity').addEventListener('input', function (e) {
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

        document.getElementById('visible').addEventListener('change', function (e) {
            const isChecked = e.target.checked;
            this._selectNode.forEach(item => {
                if (item) {
                    item.setVisible(isChecked);
                    const $jstreeNode = $('#' + item.__instanceId);
                    if ($jstreeNode.length) {
                        $jstreeNode.children('.jstree-anchor').find('.visibility-toggle').toggleClass('fa-eye', isChecked).toggleClass('fa-eye-slash', !isChecked);
                    }
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

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
            } else if (activeInputEl.id === 'rotation' || activeInputEl.id.includes('anchor')) {
                sensitivity = 0.1;
            } else {
                sensitivity = 0.2;
            }
            document.body.style.cursor = 'ew-resize';
            $('#resize-overlay').show();
        };
        const handleLabelMousemove = (e) => {
            if (!isDraggingLabel || !activeInputEl) return;
            e.preventDefault();
            const deltaX = e.clientX - startMouseX;
            let newValue = startValue + deltaX * sensitivity;
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
                $('#resize-overlay').hide();
            }
        };
        document.addEventListener('mousemove', handleLabelMousemove);
        document.addEventListener('mouseup', handleLabelMouseup);
        document.addEventListener('touchmove', handleLabelMousemove);
        document.addEventListener('touchend', handleLabelMouseup);
        const draggableLabels = document.querySelectorAll('.draggable-label');
        draggableLabels.forEach(label => {
            label.addEventListener('mousedown', handleLabelMousedown);
            label.addEventListener('touchstart', handleLabelMousedown);
        });
    }

    setNode(node) {
        // 1. 모든 필드 초기화 및 UI 숨김 처리 함수
        const resetAndDisableAllFields = () => {
            $('#actionTree').empty();
            $('#debug-option').css('display', 'none');

            // 라벨 관련 UI를 기본적으로 숨김
            $('#label-option, #label-content-group').css('display', 'none');

            document.getElementById('nodeName').value = '';
            document.getElementById('nodeName').disabled = true;

            // 라벨 텍스트 필드를 포함한 모든 필드 초기화
            const fields = ['posX', 'posY', 'scaleX', 'scaleY', 'rotation', 'opacity', 'anchorX', 'anchorY', 'labelText'];
            fields.forEach(id => {
                const el = document.getElementById(id);
                if (el) {
                    el.value = '';
                    el.disabled = true;
                }
            });

            document.getElementById('opacityValue').textContent = '0';
            document.getElementById('visible').checked = false;
            document.getElementById('visible').disabled = true;
            document.getElementById('zOrderValue').textContent = 'N/A';

            if (typeof Gizmo_ClearDraw === 'function') {
                Gizmo_ClearDraw();
            }
        };

        // 2. 노드 선택 여부와 상관없이 일단 UI 상태를 초기화
        resetAndDisableAllFields();

        // 3. 선택된 노드가 없으면 여기서 중단
        if (!node) {
            this._selectNode = [];
            this._masterNode = null;
            return;
        }

        // 4. 노드 정보 설정 시작
        this._selectNode = [node];
        document.getElementById('nodeName').value = node.getName() || "Unnamed Node";
        document.getElementById('nodeName').disabled = false;
        document.getElementById('zOrderValue').textContent = node.getLocalZOrder ? node.getLocalZOrder() : '0';

        const fieldsToEnable = ['posX', 'posY', 'scaleX', 'scaleY', 'rotation', 'opacity', 'visible', 'anchorX', 'anchorY'];
        fieldsToEnable.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.disabled = false;
        });

        document.getElementById('posX').value = node.getPosition().x.toFixed(2);
        document.getElementById('posY').value = node.getPosition().y.toFixed(2);
        document.getElementById('scaleX').value = node.getScaleX ? node.getScaleX().toFixed(2) : '1.00';
        document.getElementById('scaleY').value = node.getScaleY ? node.getScaleY().toFixed(2) : '1.00';
        document.getElementById('rotation').value = node.getRotation ? node.getRotation().toFixed(2) : '0.00';

        const currentAnchor = node.getAnchorPoint ? node.getAnchorPoint() : cc.p(0.5, 0.5);
        document.getElementById('anchorX').value = currentAnchor.x.toFixed(2);
        document.getElementById('anchorY').value = currentAnchor.y.toFixed(2);

        const currentOpacity = node.getOpacity ? node.getOpacity() : 255;
        document.getElementById('opacity').value = currentOpacity;
        document.getElementById('opacityValue').textContent = currentOpacity;
        document.getElementById('visible').checked = node.isVisible ? node.isVisible() : true;

        // 5. 텍스트 노드 여부 판단 및 UI 노출
        let textTarget = node;
        if (node instanceof DraggableNode) {
            textTarget = node.ui || node;
        }

        // setString/getString이 있는 노드일 때만 라벨 수정창을 보여줌
        if (textTarget && typeof textTarget.getString === 'function') {
            $('#label-option, #label-content-group').css('display', 'block');
            const textInput = document.getElementById('labelText');
            if (textInput) {
                textInput.disabled = false;
                textInput.value = textTarget.getString();
            }
        }

        // 6. 기즈모 및 애니메이션 리스트 업데이트
        if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
            var worldBoundingBox = node.getBoundingBoxToWorld();
            if (worldBoundingBox.width < 5) worldBoundingBox.width = 10;
            if (worldBoundingBox.height < 5) worldBoundingBox.height = 10;
            Gizmo_DrawTouchLayerByRect(worldBoundingBox);
        }

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

            if (draggableNodeInstance.assetType === 'spine' || draggableNodeInstance.assetType === 'armature') {
                $('#debug-option').css('display', 'flex');
                $('#debugSlot').toggle(draggableNodeInstance.assetType === 'spine');
                this._updateDebugButtons(draggableNodeInstance);
            }
        }
    }

    updateTreeView(treeData) {
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
    }
}
