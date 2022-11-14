var SYMBOL_OBJECT_TYPE = {
    NORMAL:0,
    LABEL:1,
    OVERLAY:2,
    SPRITE:3
};


var Skins = cc.Node.extend({
    index: 0,
    dic: null,
    info: null,
    ctor: function () {
        this._super(color.backgroundColor);
        this.initSkins();
        return true;
    },

    initSkins: function () {
        $("#idInput").keydown(function (key) {
            if (key.keyCode === 13) {
                let id = parseInt(this.value)
                if (id > -1) {
                    setSymbolId(parseInt(id));
                    Tool.refreshNodeSkin();
                }
            }
        });
        $("#valueInput").keydown(function (key) {
            if (key.keyCode === 13) {
                let id = parseInt(this.value)
                if (id > -1) {
                    setSkinData(id);
                    Tool.refreshNodeSkin();
                }
            }
        });
        // let t = document.getElementById('idInput');
        // t.onfocus = function (e) {
        // }
        // t.onblur = function (e) {
        // }


        $("#skinTree").jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                'data': [],
                "check_callback": true
            },
            "state": {"key": "demo2"},
            "plugins": ["dnd", "state"]
        });

        $("#skinTree").bind("refresh.jstree", function (e, data) {
            $("#skinTree").jstree("open_all");
        })
        $("#skinTree").bind("load_node.jstree", function (e, data) {
        })
        $("#skinTree").bind("load_all.jstree", function (e, data) {
        })
        $("#skinTree").bind("redraw.jstree", function (e, data) {
            $("#skinTree").jstree("open_all");
        })
        $("#skinTree").bind("active_node.jstree", function (e, data) {
        })
        $("#skinTree").bind("refresh_node.jstree", function (e, data) {
        })
        $("#skinTree").bind("create_node.jstree", function (e, data) {
        })
        $("#skinTree").bind("move_node.jstree", function (e, data) {
        })
        $("#skinTree").bind("dnd_stop.vakata", function (e, data) {
        })
        this.refresh();
        $('#skinTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;
        });
    },

    show: function (dic, info) {
        this.initRefresh();

        this.dic = dic;
        this.info = info;

        let skinList = getSkinList(dic);
        let isSkins = false;
        for (let key in skinList) {
            this.addSkins(skinList[key]);
            isSkins = true;
        }

        let objInput = document.getElementById('valueInput');
        objInput.disabled = !isSkins;

        if (isSkins === false) {
            $("#skinTree").jstree(true).settings.core.data = [];
            this.refresh();
        }

        document.getElementById("idInput").value = info.id;
        document.getElementById("valueInput").value = info.skinindex;
    },

    addSkins: function (itemName) {
        this.index++;
        let treeNodeObj = {
            "id": this.index,
            "text": itemName,
        }

        $("#skinTree").jstree(true).settings.core.data.push(treeNodeObj);
        this.refresh();
    },

    initRefresh: function (checkDelete) {
        $("#skinTree").jstree(true).settings.core.data = [];

        let objInput = document.getElementById('idInput');
        let valueInput = document.getElementById("valueInput");
        let disable = Tool_Select_Type === type_tab.type_hierarchy ? true : false;
        objInput.disabled = disable;
        valueInput.disabled = checkDelete;

        objInput.value = 0;
        valueInput.value = 0;

        this.refresh();
    },

    refresh: function () {
        $('#skinTree').jstree("refresh");
    },
});