var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

var uiList = cc.Node.extend({
    selectItem : null,
    selectIndex : -1,
    ctor: function() {
        this._super(color.backgroundColor);

        $('#slotUiTree').jstree({
            'core' : {
                'data' : [
                ],
                'themes' : {
                    "dots" : false,
                    "icons" : null,
                },
                'check_callback': (operation, node, node_parent, node_position, more) => {
                    /*
                    * operation : 동작 상태('create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit')
                    * node : 선택된 노드 정
                    * node_parent : Drop 된 트리의 부모 노드 정보
                    * node_position : Drop 된 위치
                    * more : 기타 정보
                    */

                    // 트리에서 특정 노드를 Drag 하여 Drop 하는 시점
                    if (operation === "move_node" && more.ref === undefined) {
                        return false;
                    }
                    return true;
                },
            },
            'plugins': ['dnd']
        });
        $('#slotUiTree').jstree("refresh");
        this.itemCallbacks = {};

        var self = this;
        $('#slotUiTree').on("changed.jstree", function (e, data) {
            if( !!data.node === false)
                return;
            self.selectItem =  self.itemCallbacks[ data.node.text ];
            self.selectItem && self.selectItem.cb( ItemListClickType.SELECT );

        });

        $("#deleteBtn").click( function(e){
            self.delBySelectItem();
            Gizmo_ClearDraw();
        });

        $("#frontBtn").click( function(e){
            self.onButtonClick(true);
        });

        $("#backBtn").click(function (e) {
            self.onButtonClick(false);
        });

        return true;
    },

    add: function (itemName, cb) {
        var treeNodeObj = {
            "id": 0,
            "text": itemName,
            "state": {
                "opened": true
            },
        }

        $("#slotUiTree").jstree(true).settings.core.data.push(treeNodeObj);
        $('#slotUiTree').jstree("refresh");
        this.itemCallbacks[itemName] = {
            itemName: itemName,
            cb: cb
        };
    },

    changeItem : function (selectIndex, targetIndex){
        if(!this.selectItem){
            return false;
        }

        if(selectIndex < 0 || targetIndex < 0)
            return false;

        var testArr = $("#slotUiTree").jstree(true).settings.core.data;
        var tempObj = testArr[selectIndex];

        testArr[selectIndex] = testArr[targetIndex];
        testArr[targetIndex] = tempObj;

        var nodeId = $('#slotUiTree').jstree('get_selected')[0];
        $("#slotUiTree").jstree(true).settings.core.data = testArr;
        $('#slotUiTree').jstree("refresh");
        setTimeout(function(){
            $('#slotUiTree').jstree("deselect_all");
            $('#slotUiTree').jstree('select_node',nodeId);
        },100);
        return true;
    },

    delBySelectItem : function () {
        if(!this.selectItem)
            return;

        var testArr = $("#slotUiTree").jstree(true).settings.core.data;
        for( let i = 0; i < testArr.length ; i++){
            if( testArr[i].text === this.selectItem.itemName ){
                testArr.splice(i,1);
                break;
            }
        }

        if(this.itemCallbacks[this.selectItem.itemName] !== undefined){
            this.itemCallbacks = null;
        }

        $("#slotUiTree").jstree(true).settings.core.data = testArr;
        $('#slotUiTree').jstree("refresh");

        if(this.selectItem.cb)
            this.selectItem.cb(ItemListClickType.DELETE);

        Loader.removeData(this.selectItem.itemName);
        this.selectItem = null;
    },

    onButtonClick :function (isFront) {
        cc.log("[CHECK] ",isFront);

        if(this.isEnableToMove(isFront) === false){
            return;
        }

        var item = this.selectItem;
        if(!item)
            return;

        if(isFront){
            this.tagetIndex = this.getSelectedIndex() + 1;
            cc.log("try to change ",this.getSelectedIndex(),this.tagetIndex);

            if(this.changeItem(this.getSelectedIndex(),  this.tagetIndex) === false){
                return;
            }
            if(item.cb)
                item.cb(ItemListClickType.UP);
        }
        else {
            this.tagetIndex = this.getSelectedIndex() - 1;
            cc.log("try to change ", this.getSelectedIndex(), this.tagetIndex);

            if (this.changeItem(this.getSelectedIndex(), this.tagetIndex) === false) {
                return;
            }
            if (item.cb)
                item.cb(ItemListClickType.DOWN);
        }
    },

    getSelectedIndex : function(){
        var testArr = $("#slotUiTree").jstree(true).settings.core.data;

        for( var i = 0; i < testArr.length ; i++){
            if( testArr[i].text === this.selectItem.itemName ){
                return i;
            }
        }
        return -1;
    },

    isEnableToMove : function( isFront ){
        var testArr = $("#slotUiTree").jstree(true).settings.core.data;


        if(isFront){
            return this.getSelectedIndex() !== testArr.length - 1;
        } else {
            return this.getSelectedIndex() !== 0;
        }
    }
});