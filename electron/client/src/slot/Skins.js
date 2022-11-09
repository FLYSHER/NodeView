var Skins = cc.Node.extend({
    selectIndex: -1,
    index: 0,
    dic: null,
    info: null,
    changed: false,
    ctor: function () {
        this._super(color.backgroundColor);
        this.initSkins();
        return true;
    },

    initSkins: function () {
        $("#idInput").keydown(function(key) {
            if(key.keyCode === 13){

            }
        });
        $("#valueInput").keydown(function(key) {
           if(key.keyCode === 13){

           }
        });
        let t = document.getElementById('idInput');
        t.onfocus = function(e){
        }
        t.onblur = function(e){
        }


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
        if(info){
            // if (this.selectIndex === info.index) {
            //     if(this.changed === true){
            //         $("#skinTree").jstree(true).settings.core.data = [];
            //         this.refresh();
            //     }else{
            //         return;
            //     }
            // }
        }
        this.selectIndex = info.index;
        this.dic = dic;
        this.info = info;

        let isSkins = false;
        for (let key in dic) {
            if (key[0] === '[') {
                this.addSkins(key);
                isSkins = true;
            }
        }

        if (isSkins === false) {
            $("#skinTree").jstree(true).settings.core.data = [];
            this.refresh();
        }

        $("#idInput").attr('value', info.id);
        $("#valueInput").attr('value', info.skinindex);
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

    initRefresh: function(){
        $("#skinTree").jstree(true).settings.core.data = [];
        this.refresh();
    },

    refresh: function () {
        $('#skinTree').jstree("refresh");
    },
});