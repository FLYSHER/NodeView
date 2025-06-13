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
        this._mainLayer = mainLayer; // 참조 저장

        $('#widgetTree').jstree({
            'core' : {
                'data' : [
                ]
            },
            "plugins": ["search"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });

        const self = this;
        $('#widgetTree').droppable({
            accept: ".jstree-anchor",
            // 드롭을 감지했을 때 실행될 함수
            drop: function(event, ui) {
                const assetName = ui.helper.data('assetName');
                if (assetName && self._mainLayer) {
                    // 저장해둔 MainLayer 참조를 통해 인스턴스 생성 함수를 호출합니다.
                    self._mainLayer.createInstanceFromLibrary(assetName);
                }
            },
            // 드롭 가능한 영역 위에 올라왔을 때 시각적 효과
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

                        // 정확한 중앙값으로 cursorAt 설정
                        $(this).draggable("option", "cursorAt", {
                            left: 1,
                            top: 1
                        });

                        return $helper;
                    },
                    revert: 'invalid',
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

                const selectedNodeId = data.node.data.nodeId; // ✅ 저장된 ID를 가져옵니다.

                // ✅ ID를 MainLayer의 새 함수로 전달합니다.
                self._mainLayer.updateMenuWithNodeId(selectedNodeId);
            }
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
                if( item.getDebugBonesEnabled() ) {
                    sender.target.innerText = "Show Bone";
                }
                else {
                    sender.target.innerText = "Hide Bone";
                }
                item.setDebugBone();
            });
        }.bind(this));

        $('#debugSlot').click( function( sender ){
            this._selectNode.forEach( item => {
                if( item.getDebugSlotsEnabled() ) {
                    sender.target.innerText = "Show Slot";
                }
                else {
                    sender.target.innerText = "Hide Slot";
                }

                item.setDebugSlotsEnabled( !item.getDebugSlotsEnabled() );
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

    setNode: function(node, finalNode) {
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
                console.log("[Type Check] Detected as 'action' via assetType tag.");
                if (node.cocosAction) {
                    for (var key in node.cocosAction._animationInfos) {
                        unifiedAnimationList.push({ name: key, type: 'action' });
                    }
                } else if (node.ui) {
                    // ✅ [수정] 꼬리표로 달아둔 actionUrl을 직접 키로 사용 (100% 정확)
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
                    return $helper;
                },
                revert: 'invalid',
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

    updateHierarchy: function(sceneNodes) {
        // [새로운 함수] 씬 노드 목록을 받아 jstree 데이터를 생성하고 업데이트합니다.
        var treeData = [];
        for (const nodeName in sceneNodes) {
            if (sceneNodes.hasOwnProperty(nodeName)) {
                const node = sceneNodes[nodeName];
                treeData.push({
                    "id": node.__instanceId, // 고유 ID로 식별
                    "text": node.getName(),   // 화면에 표시될 이름
                    "parent": "#", // 지금은 모두 최상위 노드
                    "data": {
                        "instanceId": node.__instanceId
                    }
                });
            }
        }

        // '#widgetTree'를 사용하는 jstree를 새로운 데이터로 업데이트합니다.
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree("refresh");
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
        var ancY= this._selectNode[0].getAnchorPoint().y;
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

    // 데이터를 받아 jstree를 그리는 함수
    updateTreeView: function(treeData) {
        $('#widgetTree').jstree(true).settings.core.data = treeData;
        $('#widgetTree').jstree(true).refresh();
    },
});