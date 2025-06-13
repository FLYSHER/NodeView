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
    ctor: function(mainLayer) {
        this._super(); // this._super(color.backgroundColor); 에서 컬러 인자 제거
        this._mainLayer = mainLayer;

        $('#fileNameTree').jstree({
            'core' : {
                'data' : [],
                'check_callback': true, // 드래그 앤 드롭을 위해 필요할 수 있습니다.
                'themes' : {
                    "dots" : false,
                    "icons" : null,
                }
            }
        });

        // [수정] jstree가 준비되거나, 새로고침될 때마다 드래그 기능을 적용합니다.
        $('#fileNameTree').on('ready.jstree refresh.jstree', function() {
            $(this).find('.jstree-anchor').each(function() {
                const $anchor = $(this);
                // 이미 draggable이 적용되었다면 다시 적용하지 않습니다.
                if ($anchor.is('.ui-draggable')) {
                    return;
                }
                $anchor.draggable({
                    appendTo: "body",
                    helper: function() {
                        const assetName = $(this).text();
                        const $helper = $(`<div class="custom-drag-helper">${assetName}</div>`);
                        $helper.data('assetName', assetName);
                        return $helper;
                    },
                    revert: 'invalid',
                    zIndex: 9999,

                    // [추가] 드래그 시작/종료 이벤트 핸들러
                    start: function(event, ui) {
                        // 드래그를 시작하면 오버레이를 보여줍니다.
                        $('#resize-overlay').show();
                    },
                    stop: function(event, ui) {
                        // 드래그가 끝나면 오버레이를 다시 숨깁니다.
                        $('#resize-overlay').hide();
                    }
                });
            });
        });

        this.itemCallbacks = {};

        var self = this;
        /*$('#fileNameTree').on("changed.jstree", function (e, data) {
            if( !data.node || !data.node.text ) return;

            // [수정] mainLayer의 updateMenu를 호출하여 선택 이벤트를 전달합니다.
            self._mainLayer.updateMenu(data.node.text);
        });*/

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
        this.itemCallbacks[addItem ] = {
            itemName : addItem,
            cb : cb
        };

    },

    addAsset: function (assetInfo) {
        // [새로운 로직] 에셋 정보를 받아 jstree에 노드를 추가합니다.

        // jstree 노드 ID는 에셋 이름으로 하여 중복을 방지합니다.
        var treeNodeObj = {
            "id": assetInfo.name, // 인스턴스 ID 대신 에셋 이름으로 ID 설정
            "text": assetInfo.name,
            "state": {
                "opened": true
            },
            // [추가] 나중에 드래그할 때 타입을 알 수 있도록 데이터 저장
            "data": {
                "assetType": assetInfo.type
            }
        };

        // 이미 같은 이름의 에셋이 있는지 확인하고 추가합니다.
        var existingNode = $("#fileNameTree").jstree(true).get_node(assetInfo.name);
        if (!existingNode) {
            $("#fileNameTree").jstree(true).settings.core.data.push(treeNodeObj);
            $('#fileNameTree').jstree("refresh");

            // 콜백은 이제 선택 이벤트에서 주로 사용되므로, 여기서는 일단 비워둡니다.
            this.itemCallbacks[assetInfo.name] = {
                itemName: assetInfo.name,
                cb: function(type) { /* 필요시 선택 콜백 로직 구현 */ }
            };
        }
    },

    changeItem : function (selectIndex, targetIndex){
        if(!this.selectItem){
            return false;
        }


        if(selectIndex < 0 || targetIndex < 0)
            return false;

        // var select = this.listView.getItem(selectIndex);
        // var target = this.listView.getItem(targetIndex);
        //
        // var button = select.getChildByName('ButtonItem');
        // var targetButton = target.getChildByName('ButtonItem');
        //
        // var tempCB = select.cb;
        // var tempName = select.itemName;
        // var tempColor = button.getColor();
        //
        //
        // select.cb = target.cb;
        // select.itemName = target.itemName;
        // button.setTitleText( select.itemName);
        // button.setColor(targetButton.getColor());
        //
        // target.cb = tempCB;
        // target.itemName = tempName;
        // targetButton.setTitleText( target.itemName);
        // targetButton.setColor(tempColor);
        //
        // if(this.selectItem === target) {
        //     this.selectItem = select;
        //     this.selectIndex = selectIndex;
        // }
        // else if(this.selectItem === select) {
        //     this.selectItem = target;
        //     this.selectIndex = targetIndex;
        // }

        var testArr = $("#fileNameTree").jstree(true).settings.core.data;
        var tempObj = testArr[selectIndex];

        testArr[selectIndex] = testArr[targetIndex];
        testArr[targetIndex] = tempObj;

        // for( var i = 0; i < testArr.length ; i++){
        //     if( testArr[i].text === this.selectItem.itemName ){
        //         testArr.splice(i,1);
        //         break;
        //     }
        // }

        var nodeId = $('#fileNameTree').jstree('get_selected')[0];

        // var nodeId = node[0].id;
        // cc.log(selectIndex,targetIndex);
        // cc.log(nodeId);
        // var nodeName = 'j2_'+(targetIndex+1);

        $("#fileNameTree").jstree(true).settings.core.data = testArr;

        $('#fileNameTree').jstree("refresh");

        setTimeout(function(){
            $('#fileNameTree').jstree("deselect_all");

            $('#fileNameTree').jstree('select_node',nodeId);

            // $('#fileNameTree').jstree("refresh");
        },100);

        //
        //
        // var newNodeId = "j2_"+(targetIndex+1)+"_anchor";
        // //
        // $(newNodeId).addClass('jstree-clicked');
        // //
        //




        return true;
    },

    delBySelectItem : function () {
        if(!this.selectItem)
            return;

        // this.listView.removeItem( this.selectIndex); //this.listView.getCurSelectedIndex());

        // this.totalListItemCount = this.listView.getItems().length;
        // this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
        // this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));
        // this.delBtn.setVisible(false);
        // this.upBtn.setVisible(false);
        // this.downBtn.setVisible(false);
        // if(this.length() === 0)
        //     this.setVisible(false);







            
        var testArr = $("#fileNameTree").jstree(true).settings.core.data;
        for( var i = 0; i < testArr.length ; i++){
            if( testArr[i].text === this.selectItem.itemName ){
                testArr.splice(i,1);
                break;
            }
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