var ItemListClickType = {
    SELECT: 0,
    DELETE: 1,
};

var Hierarchy = cc.Node.extend({
    ctor: function () {
        this._super(color.backgroundColor);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Delete') {
                let cur = document.activeElement;
                let selector = Tool_Select_Type === type_tab.type_hierarchy ? ".hierarchyWidget" : ".symbolWidget";
                let parent = findParentBySelector(cur, selector);
                if (parent !== null && selectItem !== null && selectItem !== undefined) {
                    this.delBySelectItem();
                }
            }
        });

        $(document).ready(function () {
            $('ul.hierarchyTabs li').click(function () {
                let tab_id = $(this).attr('data-tab');

                $('ul.hierarchyTabs li').removeClass('current');
                $('.tab-hierarchyContent').removeClass('current');

                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
                if (tab_id === 'tab-symbols') {
                    Tool_Select_Type = type_tab.type_symbol;
                } else if (tab_id === 'tab-hierarchy') {
                    Tool_Select_Type = type_tab.type_hierarchy;
                }
                // 선택된 하이라키, 심볼 노드 인덱스 초기화
                selectIndex = -1;
                selectItem = null;

                Tool.initUI(false);
            })
        })

        this.itemCallbacks = {};
        this.symbolCallbacks = {};
        this.initHiearachy();
        this.initSymbols();
        return true;
    },

    initHiearachy: function () {
        let self = this;
        let data = {
            "tag": "",
            "posX": 0,
            "posY": 0,
            "scaleX": 1,
            "scaleY": 1,
            "anchorX": 0.5,
            "anchorY": 0.5,
            "offsetX": 0,
            "offsetY": 0,
            "skinindex": -1,
            "index": -1,
            "id": -1,
            "text": "root",
            "children": []
        }
        $("#hierarchTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                'data': data,
                "check_callback": true
            },
            "state": {"key": "demo2"},
            "plugins": ["dnd", "state"],
            "dnd": {
                "is_draggable": function (node) {
                    let id = parseInt(node[0].id);
                    if (id < 1000)          // UI의 하위 노드는 드래그 안되도록 처리
                        return true;

                    return false;
                }
            },
        });
        $("#hierarchTree").bind("model.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("load_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("load_all.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("redraw.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("active_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("refresh_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("refresh.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("create_node.jstree", function (e, data) {
            $("#hierarchTree").jstree("open_all");
        })
        $("#hierarchTree").bind("move_node.jstree", function (e, data) {
            $("#hierarchTree").jstree("open_all");

            let currentID = parseInt(data.node.id);

            if (currentID >= 1000) {
                return;
            }

            let parentID = parseInt(data.node.parent);
            if (parentID === -1) {
                // root
                let currentNode = getNode(currentID);
                let currentSkin = getSkin(currentID);
                currentNode.removeFromParent(false);
                let parent = Tool.getChildByTag(Tool_Select_Type);
                parent.addChild(currentNode);

                let pos = {
                    x: Tool.CX + currentSkin.posX,
                    y: Tool.CY + currentSkin.posY,
                }
                setOffsetData(0, 0);
                currentNode.setPosition(pos);
                Tool.refreshNodeSkin();
            } else {

                selectIndex = data.node.original.index;
                selectItem = self.itemCallbacks[data.node.original.index];
                setSelectItem();
                selectItem && selectItem.cb(ItemListClickType.SELECT, selectItem.index);

                let currentNode = getNode(currentID);
                let parentNode = getNode(parentID);
                let currentSkin = getSkin(currentID);
                let parentSkin = getSkin(parentID);

                currentNode.removeFromParent(false);
                parentNode.addChild(currentNode);
                let pos = {
                    x: parentNode.getContentSize().width / 2 + currentSkin.posX,
                    y: parentNode.getContentSize().height / 2 + currentSkin.posY,
                }

                setOffsetData(
                    parentNode.getContentSize().width / 2,//+ parentSkin.offsetX,
                    parentNode.getContentSize().height / 2 // + parentSkin.offsetY
                );
                currentNode.setPosition(pos);


                let selfNode = currentNode;
                let isOver = false;
                let touchStart = false;
                let centerPointDiff = cc.p(0, 0);

                cc.eventManager.addListener({
                    event: cc.EventListener.MOUSE,
                    onMouseUp: function (event) {
                        if (touchStart === true) {
                            Tool.Test(event.getCurrentTarget());
                        }
                    },
                    onMouseMove: function (event) {
                        if (!selfNode._draggable) {
                            return;
                        }

                        let pos = event.getLocation();
                        let centerPos = selfNode.convertToWorldSpace();
                        let anchor = selfNode.getAnchorPoint();
                        let prevOver = isOver;
                        selfNode._draggableRect.x = centerPos.x;
                        selfNode._draggableRect.y = centerPos.y;

                        if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) {
                            isOver = cc.rectContainsPoint(selfNode._draggableRect, pos);
                            touchStart = false;
                        } else if (event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver) {
                            if (!touchStart) {
                                touchStart = true;
                                centerPointDiff =
                                    cc.p(pos.x - (selfNode._draggableRect.x + selfNode._draggableRect.width * anchor.x),
                                        pos.y - (selfNode._draggableRect.y + selfNode._draggableRect.height * anchor.y));
                            }
                            let nodePoint = selfNode.getParent().convertToNodeSpace(cc.p(pos.x - centerPointDiff.x, pos.y - centerPointDiff.y));
                            event.getCurrentTarget().setPosition(nodePoint);
                        } else {
                            touchStart = false;
                        }

                        if (!prevOver && isOver) {
                            cc._canvas.style.cursor = "pointer"
                        } else if (prevOver && !isOver) {
                            cc._canvas.style.cursor = "default"
                        }
                    },
                    swallowTouches: false
                }, currentNode);
                Tool.refreshNodeSkin();
            }
        })
        $("#hierarchTree").bind("dnd_stop.vakata", function (e, data) {
        })
        $('#hierarchTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;

            if (selectItem === self.itemCallbacks[data.node.original.index])
                return;

            selectIndex = data.node.original.index;
            selectItem = self.itemCallbacks[data.node.original.index];
            setSelectItem();
            selectItem && selectItem.cb(ItemListClickType.SELECT, selectItem.index);
        });
    },

    initSymbols: function () {
        let self = this;
        let data = {
            "index": -1,
            "skinindex": 0,
            "id": -1,
            "name": 0,//id랑동일하게 사용
            "text": 'root',
            "type": 0,
            "typifyName": 'root',
            "effectName": [],
            "effectStartZOder": 1,
            "animationinfo": [],
        }
        $("#symbolTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                'data': data,
                "check_callback": true
            },
            "state": {"key": "demo2"},
            "plugins": ["state"]//, "types"]
        });
        $("#symbolTree").bind("refresh.jstree", function (e, data) {
        })
        $("#symbolTree").bind("load_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("load_all.jstree", function (e, data) {
        })
        $("#symbolTree").bind("redraw.jstree", function (e, data) {
        })
        $("#symbolTree").bind("active_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("refresh_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("create_node.jstree", function (e, data) {
            $("#symbolTree").jstree("open_all");
        })
        $("#symbolTree").bind("move_node.jstree", function (e, data) {
            $("#symbolTree").jstree("open_all");
        })
        $('#symbolTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;

            if (selectItem === self.symbolCallbacks[data.node.original.index])
                return;

            selectIndex = data.node.original.index;
            selectItem = self.symbolCallbacks[data.node.original.index];
            setSelectItem();
            selectItem && selectItem.cb(ItemListClickType.SELECT, selectItem.index);
        });
    },

    add: function (itemName, node, cb) {
        switch (Tool_Select_Type) {
            case type_tab.type_hierarchy: // ui set
                this.addHierarchy(itemName, node, cb);
                break;
            case type_tab.type_symbol: // symbol defines
                this.addSymbols(itemName, node, cb);
                break;
            default:
                break;
        }
    },

    addHierarchy: function (itemName, node, cb) {
        let treeNodeObj = {
            "id": Tool.SceneNodeIndex,
            "index": Tool.SceneNodeIndex,
            "text": itemName,
            "state": {
                "opened": true
            },
        };

        let skin = {
            "tag": "tag_" + Tool.SceneNodeIndex,
            "posX": 0,
            "posY": 0,
            "scaleX": 1,
            "scaleY": 1,
            "anchorX": 0.5,
            "anchorY": 0.5,
            "offsetX": 0,
            "offsetY": 0,
            "skinindex": 0,
            "index": Tool.SceneNodeIndex,
            "uiID": Tool.SceneNodeIndex,
            "text": itemName,
            "animationinfo": [],
        };


        if (sceneLoadData.UI != undefined && sceneLoadData.UI.length > 0) {
            let uiIndex = sceneLoadCurrentID;
            Tool.SceneNodeIndex = sceneLoadCurrentID;
            for (let key in sceneLoadData.UI) {
                let info = sceneLoadData.UI[key];
                if (info.uiID === uiIndex) {
                    skin = info;
                    skin.index = Tool.SceneNodeIndex;
                }
            }
        }

        let uiChilds = null;
        if (!!node.armature) {
            let skinindex = 0;
            let anims = node.armature.animation._animationData.movementNames;
            for (let i = 0; i < anims.length; ++i) {
                let animationInfo = {
                    "trackname": anims[i],
                    "skininfo": [],
                }
                for (let key in node.armature.armatureData.boneDataDic) {
                    if (key[0] === '[') {
                        let skinInfo = {
                            "bonename": key,
                            "skinindex": skinindex,
                        }
                        animationInfo.skininfo.push(skinInfo);
                    }
                }
                skin.animationinfo.push(animationInfo);
            }
        } else if (!!node.ui) {
            uiChilds = Tool.createUIChildList(node.ui);
        }


        node.setTag(skin.tag);
        SkinList[Tool_Select_Type].push(skin);
        $('#hierarchTree').jstree(true).create_node(
            -1,
            treeNodeObj,
            "last",
            function (id) {
            }.bind(this, Tool.SceneNodeIndex)
        );
        this.itemCallbacks[Tool.SceneNodeIndex] = {
            itemName: itemName,
            cb: cb,
            index: Tool.SceneNodeIndex
        };

        // 추가되는 노드 선택되도록 작업
        selectIndex = Tool.SceneNodeIndex;
        selectItem = this.itemCallbacks[Tool.SceneNodeIndex];
        setSelectItem();
        selectItem && selectItem.cb(ItemListClickType.SELECT, selectItem.index);


        // ui child 추가
        if (uiChilds !== null) {
            let parentID = Tool.SceneNodeIndex;//.toString();
            this.addUIChildList(node.ui, parentID, uiChilds);
            $("#hierarchTree").jstree(true).show_all();
        }

        Tool.SceneNodeIndex++;
    },

    addSymbols: function (itemName, node, cb) {
        let createName = itemName;
        let treeNodeObj = {
            "id": Tool.SceneNodeIndex,
            "index": Tool.SymbolNodeIndex,
            "text": createName,
            "state": {
                "opened": true
            },
        };


        let skin = {
            "posX": 0,
            "posY": 0,
            "scaleX": 1,
            "scaleY": 1,
            "anchorX": 0.5,
            "anchorY": 0.5,
            "offsetX": 0,
            "offsetY": 0,
            "skinindex": 0,
            "index": Tool.SymbolNodeIndex,
            "uiID": Tool.SymbolNodeIndex,
            "name": 0,
            "text": createName,
            "type": 0,
            "typifyName": itemName,
            "effectName": [],
            "effectStartZOder": 1,
            "animationinfo": [],
        }

        let skinindex = 0;
        let index = Tool.SymbolNodeIndex;
        let id = Tool.SymbolNodeIndex;
        if (symbolLoadData.length) {
            let index = symbolLoadIndex - 1;
            id = symbolLoadData[index].id;
            if (symbolLoadData[index].animationinfo.length > 0) {
                if (symbolLoadData[index].animationinfo[0].skininfo.length > 0) {
                    skinindex = symbolLoadData[index].animationinfo[0].skininfo[0].skinindex;
                }
            }
        }

        treeNodeObj.id = id;

        skin.uiID = id;
        skin.index = index;
        skin.skinindex = skinindex;

        let anims = node.armature.animation._animationData.movementNames;
        for (let i = 0; i < anims.length; ++i) {
            let animationInfo = {
                "trackname": anims[i],
                "skininfo": [],
            }
            for (let key in node.armature.armatureData.boneDataDic) {
                if (key[0] === '[') {
                    let skinInfo = {
                        "bonename": key,
                        "skinindex": skinindex,
                    }
                    animationInfo.skininfo.push(skinInfo);
                }
            }
            skin.animationinfo.push(animationInfo);
        }

        SkinList[Tool_Select_Type].push(skin);
        $('#symbolTree').jstree(true).create_node(
            '-1',
            treeNodeObj,
            "last",
            function () {
            }
        );

        this.symbolCallbacks[Tool.SymbolNodeIndex] = {
            itemName: createName,
            cb: cb,
            id: skin.uiID,
            index: Tool.SymbolNodeIndex
        };

        Tool.SymbolNodeIndex++;
    },

    deselectAll: function () {
        $('#hierarchTree').jstree("deselect_all");
        $('#symbolTree').jstree("deselect_all");
    },

    getCurTree: function () {
        if (Tool_Select_Type === type_tab.type_hierarchy) {
            return $("#hierarchTree");
        } else if (Tool_Select_Type === type_tab.type_symbol) {
            return $("#symbolTree");
        }
        return null;
    },

    delBySelectItem: function () {
        let tree = this.getCurTree();
        if (tree !== null) {
            let callback = null;

            let skinData = getSkinData();
            let uiID = skinData.uiID;

            if (Tool_Select_Type === type_tab.type_hierarchy) {
                callback = this.itemCallbacks;
            } else if (Tool_Select_Type === type_tab.type_symbol) {
                callback = this.symbolCallbacks;
            }

            removeSkin(uiID.toString());

            if (!!callback[selectIndex]) {
                callback[selectIndex] = null;
            }

            let id = tree.jstree(true).get_selected();
            tree.jstree(true).delete_node(id);

            selectItem && selectItem.cb(ItemListClickType.DELETE);
            selectItem = null;
        }
    },

    setHierarchy: function () {
        // $("#hierarchTree").jstree(true)._model.data = [];
        // $("#hierarchTree").jstree(true).settings.core.data = [];
        // $("#hierarchTree").jstree(true).refresh();

        $("#hierarchTree").jstree(true)._model.data = sceneLoadData.Hierarchy;
        $("#hierarchTree").jstree(true).show_all();
        // Tool.SceneNodeIndex = sceneLoadIndex;
        // Tool.SceneNodeIndex++;

        Tool.SceneNodeIndex = 1;
    },

    addUIChildList: function (ui, parentID, uiChilds) {
        for (let i = 0; i < uiChilds.length; ++i) {
            let child = uiChilds[i];
            let childID = parentID + i + 1000;
            let treeNodeObj = {
                "id": childID,
                "index": childID,
                "text": child.info.name,
                "state": {
                    "opened": true
                },
            };

            // let childNode = ccui.helper.seekWidgetByName(ui, child.info.name);
            // childNode.setTag("tag_" + childID);

            let childNode2 = new cc.Node();
            ui.parent.addChild(childNode2);
            childNode2.setTag("tag_" + childID);

            NodeList[Tool_Select_Type].push(childNode2);

            let skin = {
                "tag": "tag_" + childID,
                "posX": 0,
                "posY": 0,
                "scaleX": 1,
                "scaleY": 1,
                "anchorX": 0.5,
                "anchorY": 0.5,
                "offsetX": 0,
                "offsetY": 0,
                "skinindex": 0,
                "index": childID,
                "uiID": childID,
                "text": child.info.name,
                "animationinfo": [],
            };
            SkinList[Tool_Select_Type].push(skin);

            $('#hierarchTree').jstree(true).create_node(
                parentID,
                treeNodeObj,
                "last",
                function (id) {
                }.bind(this, Tool.SceneNodeIndex)
            );

            if (child.childList.length > 0) {
                this.addUIChildList(ui, childID, child.childList);
            }
        }
    },
});