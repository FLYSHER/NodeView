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
                        if (targetParentId === '#') {
                            if (isMovingDraggableNode) {
                                return true;
                            }
                        }

                        let targetParentCocosNode = null;
                        if (targetParentId === '#') {
                            targetParentCocosNode = mainLayerInstance;
                        } else {
                            const parentJstreeNode = this.get_node(targetParentId);
                            if (parentJstreeNode && parentJstreeNode.data && parentJstreeNode.data.nodeId) {
                                targetParentCocosNode = mainLayerInstance.nodeMap[parentJstreeNode.data.nodeId];
                            } else {
                                return false;
                            }
                        }

                        if (!targetParentCocosNode) {
                            return false;
                        }

                        const isTargetParentMainLayer = (targetParentCocosNode === mainLayerInstance);
                        const isTargetParentDraggableNode = (targetParentCocosNode instanceof DraggableNode);

                        if (isMovingDraggableNode) {
                            if (isTargetParentDraggableNode || isTargetParentMainLayer) {
                                return true;
                            } else {
                                return false;
                            }
                        }

                        if (isTargetParentDraggableNode) {
                            const isChildOfDraggableNodeContent = (
                                targetParentCocosNode.ui === movingCocosNode ||
                                targetParentCocosNode.armature === movingCocosNode ||
                                targetParentCocosNode.spine === movingCocosNode ||
                                targetParentCocosNode.image === movingCocosNode // [수정]: 이미지 콘텐츠 노드 추가
                            );

                            if (isMovingDraggableNode || isChildOfDraggableNodeContent) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                        return true;
                    }
                    return true;
                },
            },
            "plugins": ["search", "dnd"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });

        $('#widgetTree').droppable({
            accept: ".custom-tree-item",
            drop: function(event, ui) {
                $(this).removeClass('track-drop-hover');
                const assetName = ui.helper.data('assetName');
                const assetType = ui.helper.data('assetType'); // [수정]: assetType도 드롭 이벤트에서 받음
                if (assetName && assetType && self._mainLayer) { // [수정]: assetType도 함께 전달
                    self._mainLayer.createInstanceFromLibrary(assetName, assetType); // [수정]: assetType도 함께 전달
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
                const newLocalPos = newParentCocosNodeInstance.convertToNodeSpace(currentWorldPos);
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
            // 원본 getTreeObjName이 _treeWidgetObj에 의존하므로, 먼저 _treeWidgetObj가 채워져 있는지 확인
            // 이 예시에서는 _treeWidgetObj가 updateTreeView에서 채워진다고 가정합니다.
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

        $('#debugBone').click( function( sender ){
            this._selectNode.forEach( item => {
                const targetArmature = item.armature || (item instanceof ccs.Armature ? item : null);
                if( targetArmature && targetArmature.getDebugBonesEnabled ) {
                    if (targetArmature.getDebugBonesEnabled()) {
                        sender.target.innerText = "Show Bone";
                    } else {
                        sender.target.innerText = "Hide Bone";
                    }
                    targetArmature.setDebugBone();
                }
            });
        }.bind(this));

        $('#debugSlot').click( function( sender ){
            this._selectNode.forEach( item => {
                const targetSpine = item.spine || (item instanceof sp.SkeletonAnimation ? item : null);
                if( targetSpine && targetSpine.getDebugSlotsEnabled ) {
                    if (targetSpine.getDebugSlotsEnabled()) {
                        sender.target.innerText = "Show Slot";
                    } else {
                        sender.target.innerText = "Hide Slot";
                    }
                    targetSpine.setDebugSlotsEnabled( !targetSpine.getDebugSlotsEnabled() );
                }
            });
        }.bind(this));

        $("input[name=opacity]").change(function(){
            this._selectNode.forEach( item => {
                item.setOpacity(parseInt($("input[name=opacity]").val(), 10));
                $('#opacityValue').html(item.getOpacity());
            });
        }.bind(this));

        $("input[name=lPosX]").change(function(){
            this._selectNode.forEach( item => {
                const newPosX = parseFloat($("input[name=lPosX]").val());
                if (!isNaN(newPosX)) {
                    item.setPositionX(newPosX);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
            });
        }.bind(this));

        $("input[name=lPosY]").change(function(){
            this._selectNode.forEach( item => {
                const newPosY = parseFloat(parseFloat($("input[name=lPosY]").val()));
                if (!isNaN(newPosY)) {
                    item.setPositionY(newPosY);
                    if (this._mainLayer && item.__instanceId) {
                        this._mainLayer.updateMenuWithNodeId(item.__instanceId);
                    }
                }
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

        const targetNode = node.ui || node.armature || node.spine || node.image || node; // [수정]: image 속성 추가
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
        // [수정]: node.assetType을 사용하여 애니메이션 목록 구성. 이미지 노드는 제외
        if (node.assetType === 'armature') {
            var animNameArr = node.armature.getAnimation()._animationData.movementNames;
            animNameArr.forEach(name => unifiedAnimationList.push({ name: name, type: 'armature' }));
        } else if (node.assetType === 'spine') {
            var animations = node.spine.getState().data.skeletonData.animations;
            animations.forEach(anim => unifiedAnimationList.push({ name: anim.name, type: 'spine' }));
        } else if (node.assetType === 'action') {
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

        // [수정]: node.assetType을 사용하여 spine-option 가시성 제어
        if (node && node.assetType === 'spine') {
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
        // jstree 데이터를 기반으로 _treeWidgetObj를 업데이트하는 로직 추가
        this._treeWidgetObj = {};
        const processNode = (nodeData) => {
            if (nodeData.data && nodeData.data.nodeId) {
                const cocosNode = this._mainLayer.nodeMap[nodeData.data.nodeId];
                if (cocosNode && cocosNode.getName()) {
                    this._treeWidgetObj[nodeData.data.nodeId] = {
                        name: cocosNode.getName(),
                        // copyString은 getTreeObjName에서 처리되므로 여기서는 name만 저장
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