var UIScrollTreeViewCtrl = cc.Node.extend({
    _scrolling:false,
    _lastPoint:null,
    TAG_CLIPPERNODE  : 1,
    TAG_CONTENTNODE  : 2,
    _selectNode : [],
    _masterNode : null,
    _treeWidgetObj : {},
    _treeString : "",
    _mainLayer: null,
    ctor : function (mainLayer) {
        this._super("");
        this._mainLayer = mainLayer;

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
                "check_callback" : true
            },
            "plugins": ["search", "dnd"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });

        const self = this;

        $('#widgetTree').droppable({
            accept: ".custom-tree-item",
            drop: function(event, ui) {
                $(this).removeClass('track-drop-hover');

                const assetName = ui.helper.data('assetName');
                if (assetName && self._mainLayer) {
                    self._mainLayer.createInstanceFromLibrary(assetName);
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

        $('#actionTree').addClass('custom-tree-container');

        this._jsonName = null;

        $('#widgetTree').on('move_node.jstree', function (e, data) {
            const movedNodeId = data.node.data.nodeId;
            const oldParentNodeId = data.old_parent === '#' ? null : data.instance.get_node(data.old_parent).data.nodeId;
            const newParentNodeId = data.parent === '#' ? null : data.instance.get_node(data.parent).data.nodeId;

            const movedCocosNode = self._mainLayer.nodeMap[movedNodeId];

            if (!movedCocosNode) {
                console.error("Moved Cocos2d-JS node not found in nodeMap:", movedNodeId);
                return;
            }

            // 노드의 현재 월드 위치를 저장합니다.
            const currentWorldPos = movedCocosNode.getParent().convertToWorldSpace(movedCocosNode.getPosition());
            const currentAnchorPoint = movedCocosNode.getAnchorPoint(); // 앵커 포인트도 저장

            // 이전 부모에서 제거합니다.
            if (movedCocosNode.getParent()) {
                movedCocosNode.retain();
                movedCocosNode.removeFromParent(false);
                movedCocosNode.release();
            }

            let oldParentCocosNodeInstance = null;
            if (oldParentNodeId) {
                oldParentCocosNodeInstance = self._mainLayer.nodeMap[oldParentNodeId];
            }

            let newParentCocosNodeInstance = null;
            if (newParentNodeId) {
                newParentCocosNodeInstance = self._mainLayer.nodeMap[newParentNodeId];
            }

            // 새로운 부모에 추가합니다.
            if (newParentCocosNodeInstance) {
                const newLocalPos = newParentCocosNodeInstance.convertToNodeSpace(currentWorldPos);
                movedCocosNode.setPosition(newLocalPos);

                newParentCocosNodeInstance.addChild(movedCocosNode);
                console.log(`Moved Cocos2d-JS node ${movedCocosNode.getName()} from ${oldParentCocosNodeInstance ? oldParentCocosNodeInstance.getName() : 'root'} to ${newParentCocosNodeInstance.getName()} while maintaining world position.`);

                // 새로운 부모의 모든 자식 노드들의 Z-order를 jstree 순서에 맞춰 재정렬합니다.
                const tree = $('#widgetTree').jstree(true);
                const childrenOfNewParent = tree.get_children_dom(data.parent);
                childrenOfNewParent.each((index, domElement) => {
                    const childJstreeId = $(domElement).attr('id');
                    const childJstreeNodeData = tree.get_node(childJstreeId).data;
                    const childCocosNodeId = childJstreeNodeData.nodeId;
                    const childCocosNode = self._mainLayer.nodeMap[childCocosNodeId];
                    if (childCocosNode) {
                        const newChildZ = index;
                        if (childCocosNode.getLocalZOrder() !== newChildZ) {
                            childCocosNode.setLocalZOrder(newChildZ);
                            console.log(`Updated Z-order for child node ${childCocosNode.getName()} to ${newChildZ} within new parent`);
                        }
                    }
                });

            } else { // 새로운 부모가 루트인 '#'인 경우 (MainLayer의 직속 자식이 됨)
                // MainLayer의 로컬 좌표로 변환하여 위치를 설정합니다. MainLayer는 씬의 root이므로 worldPos 자체가 MainLayer의 로컬 좌표입니다.
                movedCocosNode.setPosition(currentWorldPos);

                self._mainLayer.addChild(movedCocosNode);
                console.log(`Moved Cocos2d-JS node ${movedCocosNode.getName()} to root (MainLayer) while maintaining world position.`);

                // MainLayer의 직속 자식들의 Z-order를 jstree 순서에 맞춰 재정렬합니다.
                const tree = $('#widgetTree').jstree(true);
                const topLevelJstreeNodes = tree.get_children_dom('#');
                const newZOrderMap = new Map();

                topLevelJstreeNodes.each((index, domElement) => {
                    const jstreeNodeId = $(domElement).attr('id');
                    const jstreeNodeData = tree.get_node(jstreeNodeId).data;
                    const cocosNodeId = jstreeNodeData.nodeId;
                    newZOrderMap.set(cocosNodeId, index);
                });

                for (const nodeKey in self._mainLayer.sceneNodes) {
                    if (self._mainLayer.sceneNodes.hasOwnProperty(nodeKey)) {
                        const sceneNode = self._mainLayer.sceneNodes[nodeKey]; // DraggableNode가 될 수 있음
                        const sceneNodeInstanceId = sceneNode.__instanceId;
                        if (newZOrderMap.has(sceneNodeInstanceId)) {
                            const newZ = newZOrderMap.get(sceneNodeInstanceId);
                            if (sceneNode.getLocalZOrder() !== newZ) {
                                sceneNode.setLocalZOrder(newZ);
                                console.log(`Updated Z-order for top-level node ${sceneNode.getName()} to ${newZ}`);
                            }
                        }
                    }
                }
            }
            // 모든 변경 사항을 반영하기 위해 전체 Hierarchy 뷰를 갱신합니다.
            self._mainLayer.refreshHierarchyView();
        });

        $('#actionTree').addClass('custom-tree-container');

        this._jsonName = null;
    },

    setup:function () {
        var self = this;
        $('#toggleVisible').click( function(){
            this._selectNode.forEach( item => {
                item.setVisible( !item.isVisible());
            });
        }.bind(this));

        $('#openAll').click( function(){
            if( this.treeInfo ){
                $('#widgetTree').jstree("open_all");
            }
        }.bind(this));

        $('#closeAll').click( function(){
            if( this.treeInfo ){
                $('#widgetTree').jstree("close_all");
            }
        }.bind(this));

        $('#copyBtn').click( function(){
            if( this.treeInfo ){
                var obj = this.getTreeObjName();
                this._treeString = "this._uiWidgets = {\n";
                for( var key in obj ) {
                    this._treeString += obj[ key ].copyString;
                }
                this._treeString += "};";
                copyStringToClipboard( this._treeString );
            }
        }.bind(this));

        $('#debugBone').click( function( sender ){
            this._selectNode.forEach( item => {
                if( item.getDebugBonesEnabled ) {
                    if (item.getDebugBonesEnabled()) {
                        sender.target.innerText = "Show Bone";
                    } else {
                        sender.target.innerText = "Hide Bone";
                    }
                    item.setDebugBone();
                }
            });
        }.bind(this));

        $('#debugSlot').click( function( sender ){
            this._selectNode.forEach( item => {
                if( item.getDebugSlotsEnabled ) {
                    if (item.getDebugSlotsEnabled()) {
                        sender.target.innerText = "Show Slot";
                    } else {
                        sender.target.innerText = "Hide Slot";
                    }
                    item.setDebugSlotsEnabled( !item.getDebugSlotsEnabled() );
                }
            });
        }.bind(this));

        $("input[name=opacity]").change(function(){
            this._selectNode.forEach( item => {
                item.setOpacity($("input[name=opacity]").val());
                $('#opacityValue').html(item.getOpacity());
            });
        }.bind(this));

        $("input[name=lPosX]").change(function(){
            this._selectNode.forEach( item => {
                item.setPositionX(parseFloat($("input[name=lPosX]").val()));
                var position = item.getPosition();
                if ( item.getParent() instanceof  ccui.Layout  === false ){
                    var anchorPP = item.getParent()._renderCmd._anchorPointInPoints;
                    console.log("lposx change" , anchorPP );
                    position.x -= anchorPP.x;
                    position.y -= anchorPP.y;
                }
                changePosition(g_currentObj, item.getName(), position );
            });
        }.bind(this));

        $("input[name=lPosY]").change(function(){
            this._selectNode.forEach( item => {
                item.setPositionY(parseFloat($("input[name=lPosY]").val()));
                var position = item.getPosition();
                if ( item.getParent() instanceof  ccui.Layout  === false ){
                    var anchorPP = item.getParent()._renderCmd._anchorPointInPoints;
                    console.log("lposx change" , anchorPP );
                    position.x -= anchorPP.x;
                    position.y -= anchorPP.y;
                }
                changePosition(g_currentObj, item.getName(), position );
            });
        }.bind(this));
    },

    setNode: function(node) {
        if (!node) {
            this._selectNode = [];
            this._masterNode = null;
            $('#widgetTree').jstree(true).settings.core.data = [];
            $('#widgetTree').jstree("refresh");
            $('#actionTree').empty();
            $('#localPos').html("( - , - )");
            $('#LocalSize').html("( - , - )");
            $('#opacityValue').html("255");
            $('#anchorValue').html("( - , - )");
            $('#zOrderValue').html("-");
            $("input[name=lPosX]").val("");
            $("input[name=lPosY]").val("");
            $("input[name=opacity]").val(255);

            var searchBox = document.getElementById("searchNode");
            var uiOption = document.getElementById("ui-option");
            var spineOption = document.getElementById("spine-option");
            if (searchBox) searchBox.style.visibility = 'hidden';
            if (uiOption) uiOption.style.visibility = 'hidden';
            if (spineOption) spineOption.style.visibility = 'hidden';

            if (typeof Gizmo_ClearDraw === 'function') {
                Gizmo_ClearDraw();
            }
            return;
        }

        const targetNode = node.ui || node.armature || node.spine || node;
        this._selectNode = [targetNode];

        $('#localPos').html("(" + targetNode.getPosition().x.toFixed(2) + " , " + targetNode.getPosition().y.toFixed(2) + ")");
        $("input[name=lPosX]").val(targetNode.getPosition().x.toFixed(2));
        $("input[name=lPosY]").val(targetNode.getPosition().y.toFixed(2));
        $('#LocalSize').html("(" + targetNode.getContentSize().width.toFixed(2) + " , " + targetNode.getContentSize().height.toFixed(2) + ")");
        $("input[name=opacity]").val(targetNode.getOpacity());
        $('#opacityValue').html(targetNode.getOpacity());
        $('#anchorValue').html("("+ targetNode.getAnchorPoint().x+" , "+targetNode.getAnchorPoint().y+")");
        $('#zOrderValue').html(targetNode.getLocalZOrder());

        if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
            var rect = targetNode.getBoundingBox();
            var po = targetNode.getParent().convertToWorldSpace(cc.p(rect.x, rect.y));
            if(rect.width < 5) rect.width = 10;
            if (rect.height < 5 ) rect.height = 10;
            Gizmo_DrawTouchLayerByRect(cc.rect(po.x, po.y, rect.width, rect.height));
        }

        var unifiedAnimationList = [];
        switch (node.assetType) {
            case 'armature':
                var animNameArr = node.armature.getAnimation()._animationData.movementNames;
                animNameArr.forEach(name => unifiedAnimationList.push({ name: name, type: 'armature' }));
                break;
            case 'spine':
                var animations = node.spine.getState().data.skeletonData.animations;
                animations.forEach(anim => unifiedAnimationList.push({ name: anim.name, type: 'spine' }));
                break;
            case 'action':
                if (node.cocosAction) {
                    for (var key in node.cocosAction._animationInfos) {
                        unifiedAnimationList.push({ name: key, type: 'action' });
                    }
                } else if (node.ui) {
                    const rawActionList = ccs.actionManager.getActionList(node.actionUrl);
                    if (rawActionList) {
                        rawActionList.forEach(action => unifiedAnimationList.push({ name: action.getName(), type: 'action' }));
                    }
                }
                break;
            default:
                break;
        }

        const $actionContainer = $('#actionTree');
        $actionContainer.empty();

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
        if (uiOption) uiOption.style.visibility = 'visible';

        if (node && node.spine) {
            if (spineOption) spineOption.style.visibility = 'visible';
        } else {
            if (spineOption) spineOption.style.visibility ='hidden';
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

        $("input[name=opacity]").val(nodeObj.getOpacity());
        $('#opacityValue').html(nodeObj.getOpacity());

        $('#anchorValue').html("("+ nodeObj.getAnchorPoint().x+" , "+nodeObj.getAnchorPoint().y+")");

        $('#zOrderValue').html(nodeObj.getLocalZOrder());

        var rect = nodeObj.getBoundingBox();
        var po =   nodeObj.getParent().convertToWorldSpace( cc.p(rect.x, rect.y));

        if(rect.width < 5)
            rect.width = 10;
        if (rect.height < 5 )
            rect.height = 10;

        Gizmo_DrawTouchLayerByRect(
            cc.rect(po.x, po.y, rect.width, rect.height)
        );
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
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
    },
});