var ItemListClickType = {
    SELECT: 0,
    DELETE: 1,
};

var Hierarchy = cc.Node.extend({
    index: 1,
    symbolIndex: 1,
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
            "addPosX": 0,
            "addPosY": 0,
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
            "plugins": ["dnd", "state"]
        });
        $("#hierarchTree").bind("refresh.jstree", function (e, data) {
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
            selectItem && selectItem.cb(ItemListClickType.SELECT, selectItem.index);
        });
    },

    initSymbols: function () {
        let self = this;
        let data = {
            "addPosX": 0,
            "addPosY": 0,
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
            "id": this.index,
            "index": this.index,
            "text": itemName,
            "state": {
                "opened": true
            },
        };

        let skin = {
            "addPosX": 0,
            "addPosY": 0,
            "skinindex": 0,
            "index": this.index,
            "uiID": this.index,
            "text": itemName,
        };

        SkinList[Tool_Select_Type].push(skin);
        $('#hierarchTree').jstree(true).create_node(
            -1,
            treeNodeObj,
            "last",
            function (id) {
                $('#hierarchTree').jstree("toggle_node", id);
            }.bind(this, this.index)
        );
        this.itemCallbacks[this.index] = {
            itemName: itemName,
            cb: cb,
            index: this.index
        };

        this.index++;
    },

    addSymbols: function (itemName, node, cb) {
        let createName = itemName;
        let treeNodeObj = {
            "id": this.index,
            "index": this.symbolIndex,
            "text": createName,
            "state": {
                "opened": true
            },
        };

        let symbolObj = {
            "addPosX": 0,
            "addPosY": 0,
            "skinindex": 0,
            "index": this.symbolIndex,
            "uiID": this.symbolIndex,
            "name": 0,
            "text": createName,
            "type": 0,
            "typifyName": itemName,
            "effectName": [],
            "effectStartZOder": 1,
            "animationinfo": [],
        }

        let skinindex = 0;
        let index = this.symbolIndex;
        let id = this.symbolIndex;
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

        symbolObj.uiID = id;
        symbolObj.index = index;
        symbolObj.skinindex = skinindex;

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
            symbolObj.animationinfo.push(animationInfo);
        }

        SkinList[Tool_Select_Type].push(symbolObj);
        $('#symbolTree').jstree(true).create_node(
            '-1',
            treeNodeObj,
            "last",
            function () {
                //$('#symbolTree').jstree("open_node", $('#symbolTree').jstree("get_selected"));
            }
        );

        this.symbolCallbacks[this.symbolIndex] = {
            itemName: createName,
            cb: cb,
            id: symbolObj.uiID,
            index: this.symbolIndex
        };

        this.symbolIndex++;
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

            let id = tree.jstree(true).get_selected();
            tree.jstree(true).delete_node(id);

            if (Tool_Select_Type === type_tab.type_hierarchy) {
                callback = this.itemCallbacks;
            } else if (Tool_Select_Type === type_tab.type_symbol) {
                callback = this.symbolCallbacks;
            }
            removeSkin();

            if (!!callback[selectIndex]) {
                callback[selectIndex] = null;
            }
            selectItem && selectItem.cb(ItemListClickType.DELETE);
            selectItem = null;
        }
    },
});