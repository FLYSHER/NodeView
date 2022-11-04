var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

var UIItemList = cc.Node.extend({
    totalListItemCount: 100,
    totalListViewHeight: 0,
    listItemHeight: 50,
    itemMargin: 8,
    bufferZone: 240,
    lastContentPosY: 0,
    listView: null,

    selectItem : null,
    selectIndex : -1,
    ctor: function() {
         this._super(color.backgroundColor);
        
        $('#fileNameTree').jstree({
            'core' : {
                'data' : [
                ],
                'themes' : {
                    "dots" : false,
                    "icons" : null,
                }
            }
        });
        $('#fileNameTree').jstree("refresh");
        this.itemCallbacks = {};

        var self = this;
        $('#fileNameTree').on("changed.jstree", function (e, data) {
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

        $("#backBtn").click( function(e){
            self.onButtonClick(false);
        });

        return true;
    },

    add : function (addItem, node, cb) {

        var treeNodeObj = {
            "id" : node.__instanceId,
            "text" : addItem,
            "state": {
                "opened": true
            },
        }

        $("#fileNameTree").jstree(true).settings.core.data.push(treeNodeObj);
        $('#fileNameTree').jstree("refresh");
        this.itemCallbacks[addItem] = {
            itemName : addItem,
            cb : cb
        };
    },

    changeItem : function (selectIndex, targetIndex){
        if(!this.selectItem){
            return false;
        }

        if(selectIndex < 0 || targetIndex < 0)
            return false;

        var testArr = $("#fileNameTree").jstree(true).settings.core.data;
        var tempObj = testArr[selectIndex];

        testArr[selectIndex] = testArr[targetIndex];
        testArr[targetIndex] = tempObj;

        var nodeId = $('#fileNameTree').jstree('get_selected')[0];
        $("#fileNameTree").jstree(true).settings.core.data = testArr;
        $('#fileNameTree').jstree("refresh");
        setTimeout(function(){
            $('#fileNameTree').jstree("deselect_all");
            $('#fileNameTree').jstree('select_node',nodeId);
        },100);
        return true;
    },

    delBySelectItem : function () {
        if(!this.selectItem)
            return;
            
        var testArr = $("#fileNameTree").jstree(true).settings.core.data;
        for( let i = 0; i < testArr.length ; i++){
            if( testArr[i].text === this.selectItem.itemName ){
                testArr.splice(i,1);
                break;
            }
        }

        if(this.itemCallbacks[this.selectItem.itemName] !== undefined){
            this.itemCallbacks = null;
        }

        $("#fileNameTree").jstree(true).settings.core.data = testArr;
        $('#fileNameTree').jstree("refresh");

        if(this.selectItem.cb)
            this.selectItem.cb(ItemListClickType.DELETE);

        Loader.removeData(this.selectItem.itemName);
        this.selectItem = null;
    },

    length : function () {
        return this.listView.getItems().length;
    },

    // onEnter: function() {

    //     this._super();
    //     this.setCascadeOpacityEnabled(true);
    //     this.setCascadeColorEnabled(true);
    //     this.setOpacity(128);

    //     cc.log("onEnter");
    //     cc.Node.prototype.onEnter.call(this);
    //     this.listView.forceDoLayout();
    //     this.totalListItemCount = this.listView.getItems().length;
    //     this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
    //     this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));

    //     this.listView.jumpToTop();
    // },

    // onButtonClick :function (sender, type) {
    //     cc.log("[CHECK] ",type);
    //
    //     switch (type) {
    //         case ccui.Widget.TOUCH_BEGAN:
    //             break;
    //         case ccui.Widget.TOUCH_ENDED:
    //             var item = this.selectItem;
    //             if(!item)
    //                 return;
    //
    //             if(sender === this.delBtn) {
    //                 this.delBySelectItem();
    //             }
    //             else if(sender === this.upBtn){
    //                 this.tagetIndex =  this.selectIndex - 1;
    //                 this.changeItem(this.selectIndex,  this.tagetIndex);
    //                 this.listView._curSelectedIndex =  this.tagetIndex;
    //                 if(item.cb)
    //                     item.cb(item.itemName,ItemListClickType.UP);
    //             }
    //             else if(sender === this.downBtn){
    //                 this.tagetIndex =  this.selectIndex + 1;
    //                 this.changeItem(this.selectIndex,  this.tagetIndex);
    //                 this.listView._curSelectedIndex =  this.tagetIndex;
    //                 if(item.cb)
    //                     item.cb(item.itemName,ItemListClickType.DOWN);
    //             }
    //             break;
    //     }
    //     this.refreshBtn();
    // },

    onButtonClick :function (isFront) {
        cc.log("[CHECK] ",isFront);

        if(this.isEnableToMove(isFront) === false){
            return;
        }

        var item = this.selectItem;
        if(!item)
            return;

        if(isFront){
            // this.tagetIndex =  this.selectIndex - 1;
            this.tagetIndex = this.getSelectedIndex() + 1;
            cc.log("try to change ",this.getSelectedIndex(),this.tagetIndex);

            if(this.changeItem(this.getSelectedIndex(),  this.tagetIndex) === false){
                return;
            }
            // this.listView._curSelectedIndex =  this.tagetIndex;
            if(item.cb)
                item.cb(ItemListClickType.UP);
        }
        else {
            this.tagetIndex = this.getSelectedIndex() - 1;
            cc.log("try to change ",this.getSelectedIndex(),this.tagetIndex);

            if(this.changeItem(this.getSelectedIndex(),  this.tagetIndex) === false){
                return;
            }
            // this.listView._curSelectedIndex =  this.tagetIndex;
            if(item.cb)
                item.cb(ItemListClickType.DOWN);
        }

        // this.refreshBtn();
    },

    getSelectedIndex : function(){
        var testArr = $("#fileNameTree").jstree(true).settings.core.data;

        for( var i = 0; i < testArr.length ; i++){
            if( testArr[i].text === this.selectItem.itemName ){
                return i;
            }
        }
        return -1;
    },

    getSelectedName : function(){
        return this.selectItem.itemName;
    },

    selectedItemEvent: function(sender, type) {
        var targetListView = sender;
        var button = null;
        switch (type) {
            case ccui.ListView.ON_SELECTED_ITEM_END:
                var item = targetListView.getItem(this.listView.getCurSelectedIndex());
                if(this.selectItem) {
                    button = this.selectItem.getChildByName('ButtonItem');
                    button.setColor(color.textColor);
                }
                button = item.getChildByName('ButtonItem');
                button.setColor(color.seletTextColor);
                this.selectItem = item;
                this.selectIndex = targetListView.getCurSelectedIndex();
                this.refreshBtn();

                if(item.cb)
                    item.cb(item.itemName,ItemListClickType.SELECT);

                break;
            default:
                break;
        }
    },
    // refreshBtn : function () {
    //     if(this.selectItem) {
    //         this.delBtn.setVisible(true);
    //         this.upBtn.setVisible(true);
    //         this.downBtn.setVisible(true);
    //         if (this.selectIndex === 0)
    //             this.upBtn.setVisible(false);
    //
    //         if (this.selectIndex === this.listView.getItems().length - 1)
    //             this.downBtn.setVisible(false);
    //     }
    //     else {
    //         this.delBtn.setVisible(false);
    //         this.upBtn.setVisible(false);
    //         this.downBtn.setVisible(false);
    //     }
    // }
    isEnableToMove : function( isFront ){
        var testArr = $("#fileNameTree").jstree(true).settings.core.data;


        if(isFront){
            return this.getSelectedIndex() !== testArr.length - 1;
        } else {
            return this.getSelectedIndex() !== 0;
        }
    }
});