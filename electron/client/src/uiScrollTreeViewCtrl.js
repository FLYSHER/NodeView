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
        this._bindOrderControls();

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
        this._renderAnimationList(null, null);
    }

    setNode(node) {
        // 같은 노드면(드래그로 위치가 바뀐 경우 등) 값만 갱신
        if (node && this._selectNode[0] === node) {
            Inspector.setNode(node);
            this._drawGizmo(node);
            return;
        }

        Inspector.setNode(node);
        UIWidgetsCopyPopover.updateCount();
        this.updateOrderBar(node);

        if (!node) {
            this._selectNode = [];
            this._masterNode = null;
            this._renderAnimationList(null, null);
            if (typeof Gizmo_ClearDraw === 'function') {
                Gizmo_ClearDraw();
            }
            return;
        }

        this._selectNode = [node];
        this._drawGizmo(node);

        // 하위 노드를 골라도 그 노드가 속한 인스턴스(DraggableNode)의 애니메이션을 보여준다
        let owner = node;
        while (owner && !(owner instanceof DraggableNode)) owner = owner.getParent();
        this._renderAnimationList(owner, node);
    }

    // 인스턴스가 가진 애니메이션 이름 목록
    _collectAnimations(owner) {
        const list = [];
        if (!owner) return list;
        try {
            switch (owner.assetType) {
                case 'armature': {
                    const data = owner.armature && owner.armature.getAnimation()._animationData;
                    (data && data.movementNames || []).forEach(name => list.push({ name: name, type: 'armature' }));
                    break;
                }
                case 'spine': {
                    const state = owner.spine && owner.spine.getState();
                    (state && state.data && state.data.skeletonData && state.data.skeletonData.animations || [])
                        .forEach(anim => list.push({ name: anim.name, type: 'spine' }));
                    break;
                }
                case 'ui':
                case 'cocosstudio':
                    if (owner.cocosAction && owner.cocosAction._animationInfos) {
                        for (let key in owner.cocosAction._animationInfos) list.push({ name: key, type: 'action' });
                    } else if (owner.actionUrl) {
                        (ccs.actionManager.getActionList(owner.actionUrl) || []).forEach(action => list.push({ name: action.getName(), type: 'action' }));
                    }
                    break;
            }
        } catch (e) {
            console.warn('[Animation] 목록을 읽지 못했습니다:', e);
        }
        return list;
    }

    // Sequencer 왼쪽 애니메이션 목록 (클릭: 미리보기, 드래그: 트랙에 추가)
    _renderAnimationList(owner, selectedNode) {
        const $list = $('#actionTree');
        const esc = (t) => $('<div>').text(t == null ? '' : String(t)).html();
        $list.empty();
        // 다른 인스턴스를 고르면 키프레임 보기를 비운다
        if (this._animOwner !== (owner || null) && typeof KeyframeView !== 'undefined') KeyframeView.clear();
        this._animOwner = owner || null;

        const source = !owner ? '' : (selectedNode && selectedNode !== owner ? selectedNode.getName() + ' 상위 · ' : '') + owner.getName();
        $('#seqAnimSource').text(source).attr('title', source);

        const items = this._collectAnimations(owner);
        if (!owner) {
            $list.append('<div class="anim-empty">Hierarchy 나 Game View 에서 인스턴스를 선택하세요.</div>');
            return;
        }
        if (items.length === 0) {
            $list.append('<div class="anim-empty">이 인스턴스에는 애니메이션이 없습니다.</div>');
            return;
        }

        const badge = { armature: 'AR', spine: 'SP', action: 'UI' };
        const self = this;
        items.forEach(item => {
            const seconds = this._mainLayer.getAnimationLength(owner, item.name);
            // 키프레임 이벤트가 있으면 개수 표시 (마우스를 올리면 목록)
            const events = typeof AnimationEvents !== 'undefined' ? AnimationEvents.list(owner, item.name) : [];
            const evtTitle = events.map(ev => AnimationEvents.formatAt(ev) + '  ' + ev.name).join('\n');
            const $item = $(`<div class="custom-tree-item anim-item" title="클릭: 미리보기 · 드래그: Sequencer 트랙에 추가">
                <span class="track-type-icon type-${item.type}">${badge[item.type]}</span>
                <span class="anim-name">${esc(item.name)}</span>
                ${events.length ? `<span class="anim-evt" data-tip="${esc('키프레임 이벤트 ' + events.length + '개\n' + evtTitle)}">◆ ${events.length}</span>` : ''}
                <span class="anim-dur">${seconds > 0 ? seconds.toFixed(2) + 's' : ''}</span>
            </div>`);
            $item.attr('data-anim-name', item.name).attr('data-anim-type', item.type);

            $item.draggable({
                appendTo: "body",
                distance: 10,
                helper: function () {
                    const animName = $(this).data('anim-name');
                    const $helper = $(`<div class="custom-drag-helper">${esc(animName)}</div>`);
                    $helper.data('animName', animName);
                    $helper.data('animType', $(this).data('anim-type'));
                    $(this).draggable("option", "cursorAt", { left: 1, top: 1 });
                    return $helper;
                },
                revert: 'invalid',
                revertDuration: 200,
                zIndex: 9999,
                start: function () { $('#resize-overlay').show(); },
                stop: function () { $('#resize-overlay').hide(); }
            });

            $item.on('click', function () {
                $list.find('.custom-tree-item').removeClass('selected');
                $(this).addClass('selected');
                self._previewAnimation(owner, $(this).data('anim-name'), $(this).data('anim-type'));
            });
            $list.append($item);
        });
    }

    _previewAnimation(owner, animName, animType) {
        if (!owner) return;
        if (typeof KeyframeView !== 'undefined') KeyframeView.setAnimation(owner, animName, animType);
        if (owner.spine) owner.spine.clearTrack(0);
        if (owner.armature) owner.armature.getAnimation().stop();
        if (owner.ui) {
            owner.ui.getChildren().forEach(child => child.stopAllActions());
            owner.ui.stopAllActions();
        }
        if (animType === 'spine' && owner.spine) {
            owner.spine.setAnimation(0, animName);
        } else if (animType === 'armature' && owner.armature) {
            owner.armature.getAnimation().play(animName, -1);
        } else if (animType === 'action') {
            if (owner.cocosAction) {
                owner.cocosAction.play(animName, false);
            } else if (owner.ui && owner.actionUrl) {
                ccs.actionManager.playActionByName(owner.actionUrl, animName);
            }
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

    // ---- 순서 바꾸기 (맨 위 / 위로 / 아래로 / 맨 아래) ----------------------------
    // 같은 부모 아래 형제 순서 = localZOrder (드래그로 옮길 때와 같은 규칙: 목록 순서대로 0, 1, 2 …)

    getOrderInfo(node) {
        const tree = $('#widgetTree').jstree(true);
        if (!node || !tree || !tree.get_node(node.__instanceId)) return null;
        const parentId = tree.get_parent(node.__instanceId);
        const siblings = tree.get_node(parentId).children.slice();
        // jstree 의 id 는 문자열, __instanceId 는 숫자라 문자열로 맞춰 찾는다
        return { siblings: siblings, index: siblings.indexOf(String(node.__instanceId)) };
    }

    moveOrder(node, where) {
        const info = this.getOrderInfo(node);
        if (!info || info.index < 0) return;
        const ids = info.siblings;
        const from = info.index;
        const to = where === 'top' ? 0 : where === 'bottom' ? ids.length - 1 : where === 'up' ? from - 1 : from + 1;
        if (to < 0 || to >= ids.length || to === from) return;
        ids.splice(from, 1);
        ids.splice(to, 0, String(node.__instanceId));
        ids.forEach((id, i) => {
            const n = this._mainLayer.nodeMap[id];
            if (n && n.getLocalZOrder() !== i) n.setLocalZOrder(i);
        });
        // 트리를 다시 그린 뒤 선택과 순서 바를 되살린다
        $('#widgetTree').one('refresh.jstree', () => {
            const tree = $('#widgetTree').jstree(true);
            if (tree && !tree.is_selected(node.__instanceId)) {
                tree.deselect_all(true);
                tree.select_node(node.__instanceId, true);
            }
            const li = tree && tree.get_node(node.__instanceId, true);
            if (li && li[0]) li[0].scrollIntoView({ block: 'nearest' });
            this.updateOrderBar(node);
        });
        this._mainLayer.refreshHierarchyView();
        Inspector.refresh();
    }

    // 하단 순서 바: 선택한 노드가 있을 때만 보인다
    updateOrderBar(node) {
        const $bar = $('#hierOrderBar');
        const info = node ? this.getOrderInfo(node) : null;
        if (!info || info.index < 0) { $bar.prop('hidden', true); return; }
        const last = info.siblings.length - 1;
        $bar.prop('hidden', false);
        $('#hierOrderPos').text((info.index + 1) + ' / ' + info.siblings.length);
        $bar.find('[data-order="top"], [data-order="up"]').prop('disabled', info.index === 0);
        $bar.find('[data-order="down"], [data-order="bottom"]').prop('disabled', info.index === last);
    }

    _bindOrderControls() {
        $('#hierOrderBar').on('click', '[data-order]', (e) => {
            const node = this._selectNode[0];
            if (node) this.moveOrder(node, $(e.currentTarget).data('order'));
        });
        // Ctrl+↑/↓ : 한 칸, Ctrl+Shift+↑/↓ : 맨 위/맨 아래 (입력 중에는 무시)
        document.addEventListener('keydown', (e) => {
            if (!e.ctrlKey || e.altKey || e.metaKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
            const t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
            const node = this._selectNode[0];
            if (!node) return;
            e.preventDefault();
            e.stopPropagation();
            const up = e.key === 'ArrowUp';
            this.moveOrder(node, e.shiftKey ? (up ? 'top' : 'bottom') : (up ? 'up' : 'down'));
        }, true);
    }

    // 리소스 사용처 강조 (Dependencies → "Hierarchy에 표시"). ids 가 비면 지운다
    setUsageHighlight(ids, label) {
        this._usageIds = new Set(ids || []);
        const tree = $('#widgetTree').jstree(true);
        if (tree) this._usageIds.forEach(id => { if (tree.get_node(id)) tree._open_to(id); });
        this._applyUsageHighlight();
        const on = this._usageIds.size > 0;
        $('#hierUsageBar').prop('hidden', !on).find('.hier-usage-text').text(on ? label + ' 사용 노드 ' + this._usageIds.size + '개' : '');
        if (!this._usageBound) {
            this._usageBound = true;
            // 트리를 다시 그리거나 펼치면 강조가 지워지므로 다시 입힌다
            $('#widgetTree').on('redraw.jstree after_open.jstree refresh.jstree', () => this._applyUsageHighlight());
            $('#hierUsageClear').on('click', () => this.setUsageHighlight([]));
        }
        const first = tree && Array.from(this._usageIds)[0];
        const li = first && tree.get_node(first, true);
        if (li && li[0]) li[0].scrollIntoView({ block: 'nearest' });
    }

    _applyUsageHighlight() {
        const ids = this._usageIds || new Set();
        $('#widgetTree .jstree-anchor.usage-hit').removeClass('usage-hit');
        ids.forEach(id => $(document.getElementById(id)).children('.jstree-anchor').addClass('usage-hit'));
    }

    updateTreeView(treeData) {
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
        UIWidgetsCopyPopover.updateCount();
        // 노드가 추가·삭제되면 순서(n / 전체)도 바뀐다
        $('#widgetTree').one('refresh.jstree', () => this.updateOrderBar(this._selectNode[0]));
    }
}
