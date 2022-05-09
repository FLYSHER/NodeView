var color = {
    backgroundColor : cc.color(245,255,245),
    textColor : cc.color(0, 128, 255),
    seletTextColor : cc.color(255, 0, 0)
};

var UIListViewTest = cc.Node.extend({
    totalListItemCount: 100,
    totalListViewHeight: 0,
    listItemHeight: 50,
    itemMargin: 8,
    bufferZone: 240,
    lastContentPosY: 0,
    listView: null,
    ctor: function() {
        this._super(color.backgroundColor);
        this.itemArray = [];

        // this.listView = new ccui.ListView();
        // this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        // this.listView.setTouchEnabled(true);
        // this.listView.setBounceEnabled(true);
        // //this.listView.setContentSize(cc.size(this.WIDTH, this.HEIGHT));//cc.winSize.width * 0.1, cc.winSize.height * 0.1 - 160));

        // this.listView.x = 0;
        // this.listView.y = 0;
        // this.listView.addEventListener(this.selectedItemEvent.bind(this), this);
        // this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
        // this.addChild(this.listView);

        // this.listItemModel = new ccui.Layout();
        // this.listItemModel.setTouchEnabled(false);
        // this.listItemModel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        // this.listItemModel.setBackGroundColor(cc.color(200, 200, 200));

        // var listButton = new ccui.Button();
        // listButton.setName("ButtonItem");
        // listButton.titleFontSize = 64;
        // listButton.setTouchEnabled(true);
        // listButton.x = this.listItemModel.width / 2;
        // listButton.y = this.listItemModel.height / 2;

        // this.listItemModel.addChild(listButton);
        // this.listView.setItemModel(this.listItemModel);

        // this.listView.setItemsMargin(this.itemMargin);

        this.cb = null;



        $('#animationTree').jstree({
            'core' : {
                'data' : [
                ]
            }
        });
        var self = this;
        $('#animationTree').on("changed.jstree", function (e, data) {
            if( !!data.node === false)
                return;
            self.cb && self.cb(data.node.text);
        });
        return true;
    },

    // setContentSize : function(size) {
    //     this.WIDTH =  size.width;
    //     this.HEIGHT = size.height;
    //     cc.Node.prototype.setContentSize.call(this, size);
    //     if( this.listView )
    //         this.listView.setContentSize(size);
    // },

    init : function (itemArray, cb) {
        this.itemArray = itemArray;

        this.cb = cb;
    //    this.totalListItemCount = this.itemArray.length;
    //     this.listView.removeAllItems();
    //     this.listItemModel.setContentSize(cc.size(this.WIDTH, this.listItemHeight));

    //     var but = this.listItemModel.getChildren()[0];
    //     but.x = this.listItemModel.width * 0.5;
    //     but.y = this.listItemModel.height * 0.5;

    //     for (var i = 0; i < this.totalListItemCount; ++i) {
    //         var item = this.listItemModel.clone();
    //         item.setTag(i);
    //         var button = item.getChildByName('ButtonItem');
    //         button.setTitleText(this.itemArray[i]);
    //         button.setTitleColor(color.textColor);
    //         this.listView.pushBackCustomItem(item);
    //     }

    //     this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
    //     this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));
    //     this.listView.jumpToTop();



        var treeObj = [];

        for (var i = 0; i < itemArray.length; ++i) {
            var obj = {
                'text' : itemArray[i]
            }
            treeObj.push(obj);
        }   
        $('#animationTree').jstree(true).settings.core.data = treeObj;
        $('#animationTree').jstree("refresh");


    },


    // onEnter: function() {

    //     this._super();
    //     this.setCascadeOpacityEnabled(true);
    //     this.setCascadeColorEnabled(true);
    //     this.setOpacity(128);

    //     cc.log("onEnter");
    //     // cc.Node の onEnter をこのオブジェクトを this として呼び出す
    //     cc.Node.prototype.onEnter.call(this);

    //     // onEnter で forceDoLayout を呼び出す必要あり
    //     this.listView.forceDoLayout();

    //     this.totalListItemCount = this.itemArray.length;
    //     this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
    //     this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));

    //     // ListViewの大きさ設定
    //     this.listView.jumpToTop();
    // },

    // getItemPositionYInView: function(item) {
    //     var worldPos = item.getParent().convertToWorldSpaceAR(item.getPosition());
    //     var viewPos = this.listView.convertToNodeSpaceAR(worldPos);
    //     return viewPos.y;
    // },


    // selectedItemEvent: function(sender, type) {
    //     // リスト項目をタップした時の処理
    //     switch (type) {
    //         case ccui.ListView.EVENT_SELECTED_ITEM:

    //             break;

    //         case ccui.ListView.ON_SELECTED_ITEM_END:
    //             var targetListView = sender;
    //             var item = targetListView.getItem(targetListView.getCurSelectedIndex());
    //             cc.log("Item: " + item.getTag());
    //             if(this.cb)
    //                 this.cb(item.getTag());
    //             break;
    //         default:
    //             break;
    //     }
    // }
});