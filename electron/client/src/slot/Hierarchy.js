var Hierarchy = cc.Node.extend({
    selectItem: null,
    selectIndex: -1,
    index: 0,
    ctor: function () {
        this._super(color.backgroundColor);

        $("#slotUiTree").jstree({
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
        return true;
    },

    add: function (itemName) {
        this.index++;
        let treeNodeObj = {
            "id": this.index,
            "text": itemName,
        }

        $("#slotUiTree").jstree(true).settings.core.data[0].children.push(treeNodeObj);
    },

    refresh: function () {
        $('#slotUiTree').jstree("refresh");
    }
});