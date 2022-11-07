var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

var Hierarchy = cc.Node.extend({
    selectItem: null,
    selectIndex: -1,
    index: 0,
    ctor: function () {
        this._super(color.backgroundColor);

        $("#hierarchTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "check_callback": true,
                'data': [{
                    "id": 0,
                    "text": "root",
                    "state": {
                        "opened": true
                    },
                    "children": []
                }]
            },
            "types": {
                "default": {
                    "icon": "fa fa-folder text-success"
                },
                "file": {
                    "icon": "fa fa-file  text-success"
                }
            },
            "state": {"key": "demo2"},
            "plugins": ["dnd", "state", "types"]
        });

        this.refresh();

        this.itemCallbacks = {};
        var self = this;
        $('#hierarchTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;
            self.selectItem = self.itemCallbacks[data.node.text];
            self.selectItem && self.selectItem.cb(ItemListClickType.SELECT);
        });
        return true;
    },

    add: function (itemName, node, cb) {
        this.index++;
        let treeNodeObj = {
            "id": this.index,
            "text": itemName,
        }

        $("#hierarchTree").jstree(true).settings.core.data[0].children.push(treeNodeObj);
        this.refresh();
        this.itemCallbacks[itemName] = {
            itemName: itemName,
            cb: cb
        };
    },

    refresh: function () {
        $('#hierarchTree').jstree("refresh");
    },

    getSelectedName : function(){
        return this.selectItem.itemName;
    },
});