var ItemListClickType = {
    SELECT: 0,
    DELETE: 1,
    UP: 2,
    DOWN: 3
};

var Hierarchy = cc.Node.extend({
    selectItem: null,
    selectIndex: -1,
    defaultId: -999,
    index: 0,
    symbolIndex: 0,
    ctor: function () {
        this._super(color.backgroundColor);

        $(document).ready(function () {
            $('ul.hierarchyTabs li').click(function () {
                var tab_id = $(this).attr('data-tab');

                $('ul.hierarchyTabs li').removeClass('current');
                $('.tab-hierarchyContent').removeClass('current');

                $(this).addClass('current');
                $("#" + tab_id).addClass('current');
                if (tab_id === 'tab-symbols') {
                    Tool_Select_Type = type_tab.type_symbol;
                } else if (tab_id === 'tab-hierarchy') {
                    Tool_Select_Type = type_tab.type_hierarchy;
                }
                Tool.refreshCanvasNode();
                Tool._skins.initRefresh();
                Tool._hierarchy.refresh();
                Tool._hierarchy.deselectAll();
                Tool._animationList.initRefresh();
            })
        })

        this.itemCallbacks = {};
        this.symbolCallbacks = {};
        this.initHiearachy();
        this.initSymbols();
        return true;
    },

    initHiearachy: function () {
        $("#hierarchTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                'data': [{
                    "id": 0,
                    "text": "root",
                    "state": {
                        "opened": true
                    },
                    "children": []
                }],
                "check_callback": true
            },
            "state": {"key": "demo2"},
            "plugins": ["dnd", "state"]
        });
        $("#hierarchTree").bind("refresh.jstree", function (e, data) {
            $("#hierarchTree").jstree("open_all");
        })
        $("#hierarchTree").bind("load_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("load_all.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("redraw.jstree", function (e, data) {
            $("#hierarchTree").jstree("open_all");
        })
        $("#hierarchTree").bind("active_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("refresh_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("create_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("move_node.jstree", function (e, data) {
        })
        $("#hierarchTree").bind("dnd_stop.vakata", function (e, data) {
        })
        var self = this;
        $('#hierarchTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;

            if(self.selectItem === self.itemCallbacks[data.node.original.index])
                return;

            self.selectItem = self.itemCallbacks[data.node.original.index];
            self.selectItem && self.selectItem.cb(ItemListClickType.SELECT, self.selectItem.index);
        });
    },

    initSymbols: function () {
        $("#symbolTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                'data': [],
                "check_callback": true
            },
            // "types": {
            //     "default": {
            //         "icon": "fa fa-folder text-success"
            //     },
            //     "file": {
            //         "icon": "fa fa-file  text-success"
            //     }
            // },
            "state": {"key": "demo2"},
            "plugins": ["dnd", "state"]//, "types"]
        });
        $("#symbolTree").bind("refresh.jstree", function (e, data) {
            $("#symbolTree").jstree("open_all");
        })
        $("#symbolTree").bind("load_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("load_all.jstree", function (e, data) {
        })
        $("#symbolTree").bind("redraw.jstree", function (e, data) {
            $("#symbolTree").jstree("open_all");
        })
        $("#symbolTree").bind("active_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("refresh_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("create_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("move_node.jstree", function (e, data) {
        })
        $("#symbolTree").bind("dnd_stop.vakata", function (e, data) {
        })
        var self = this;
        $('#symbolTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;

            if(self.selectItem === self.symbolCallbacks[data.node.original.index])
                return;

            self.selectItem = self.symbolCallbacks[data.node.original.index];
            self.selectItem && self.selectItem.cb(ItemListClickType.SELECT, self.selectItem.index);
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
            "skinindex": 0,
            "index": this.index,
            "id": this.index,
            "text": itemName,
            "state": {
                "opened": true
            },
            "children": []
        }

        SkinList[Tool_Select_Type].push(treeNodeObj);

        $("#hierarchTree").jstree(true).settings.core.data[0].children.push(treeNodeObj);
        this.refresh();

        this.itemCallbacks[this.index] = {
            itemName: itemName,
            cb: cb,
            index: this.index
        };
        this.index++;
    },

    addSymbols: function (itemName, node, cb) {
        var createName = itemName;
        let symbolObj = {
            "index": this.symbolIndex,
            "skinindex": 0,
            "id": 0,
            "name": 0,//id랑동일하게 사용
            "text": createName,
            "type": 0,
            "typifyName": itemName,
            "effectName": [],
            "effectStartZOder": 1,
            "animationinfo": [],
        }

        let anims = node.armature.animation._animationData.movementNames;
        for (let i = 0; i < anims.length; ++i) {
            let animationInfo = {
                "trackname": anims[i],
                "skininfo": [],
            }
            for (let key in node.armature.armatureData.boneDataDic) {
                // skin
                if (key[0] === '[') {
                    let skinInfo = {
                        "bonename": key,
                        "skinindex": 0,
                    }
                    animationInfo.skininfo.push(skinInfo);
                }
            }
            symbolObj.animationinfo.push(animationInfo);
        }

        SkinList[Tool_Select_Type].push(symbolObj);


        $("#symbolTree").jstree(true).settings.core.data.push(symbolObj);
        this.refresh();

        this.symbolCallbacks[this.symbolIndex] = {
            itemName: createName,
            cb: cb,
            id: symbolObj.id,
            index: this.symbolIndex
        };

        this.symbolIndex++;
    },

    deselectAll: function(){
        $('#hierarchTree').jstree("deselect_all");
        $('#symbolTree').jstree("deselect_all");
    },

    refresh: function () {
        if (Tool_Select_Type === type_tab.type_hierarchy) {
            $('#hierarchTree').jstree("refresh");
        } else if (Tool_Select_Type === type_tab.type_symbol) {
            $('#symbolTree').jstree("refresh");
        }
    },

    getSelectedName: function () {
        return this.selectItem.itemName;
    },


    insertValue: function( id, name ){

    }
});