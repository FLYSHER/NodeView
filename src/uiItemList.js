var ItemListClickType = {
    SELECT : 0,
    DELETE : 1,
    UP : 2,
    DOWN : 3
};

var UIItemList = cc.LayerColor.extend({
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

        this.listView = new ccui.ListView();
        this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.listView.setTouchEnabled(true);
        this.listView.setBounceEnabled(true);
        //this.listView.setContentSize(cc.size(this.WIDTH, this.HEIGHT));//cc.winSize.width * 0.1, cc.winSize.height * 0.1 - 160));

        this.listView.x = 0;
        this.listView.y = 0;
        this.listView.addEventListener(this.selectedItemEvent.bind(this), this);
        this.listView.setGravity(ccui.ListView.GRAVITY_CENTER_VERTICAL);
        this.addChild(this.listView);

        this.listItemModel = new ccui.Layout();
        this.listItemModel.setTouchEnabled(true);
        this.listItemModel.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.listItemModel.setBackGroundColor(cc.color(200, 200, 200));

        this.listButton = new ccui.Button();
        this.listButton.setName("ButtonItem");
        this.listButton.titleFontSize = 64;
        this.listButton.setTouchEnabled(true);
        this.listButton.x = this.listItemModel.width / 2;
        this.listButton.y = this.listItemModel.height / 2;
        this.listItemModel.addChild( this.listButton);

        this.listView.setItemModel(this.listItemModel);

        this.listView.setItemsMargin(this.itemMargin);

        this.delBtn = new ccui.Button();
        this.delBtn.setName("delBtn");
        this.delBtn.titleFontSize = 32;
        this.delBtn.setTouchEnabled(true);
        this.delBtn.addTouchEventListener(this.onButtonClick.bind(this), this);
        this.delBtn.x = this.listItemModel.width / 2;
        this.delBtn.y = this.listItemModel.height / 2;
        this.delBtn.setTitleText("Delete");
        this.addChild(this.delBtn);
        this.delBtn.setVisible(false);

        this.upBtn = new ccui.Button();
        this.upBtn.setName("upBtn");
        this.upBtn.titleFontSize = 32;
        this.upBtn.setTouchEnabled(true);
        this.upBtn.addTouchEventListener(this.onButtonClick.bind(this), this);
        this.upBtn.x = this.listItemModel.width / 2;
        this.upBtn.y = this.listItemModel.height / 2;
        this.upBtn.setTitleText("BACK");
        this.addChild(this.upBtn);
        this.upBtn.setVisible(false);

        this.downBtn = new ccui.Button();
        this.downBtn.setName("downBtn");
        this.downBtn.titleFontSize = 32;
        this.downBtn.setTouchEnabled(true);
        this.downBtn.addTouchEventListener(this.onButtonClick.bind(this), this);
        this.downBtn.x = this.listItemModel.width / 2;
        this.downBtn.y = this.listItemModel.height / 2;
        this.downBtn.setTitleText("FRONT");
        this.addChild(this.downBtn);
        this.downBtn.setVisible(false);
        //this.init(["[TEST1]","[TEST2]","[TEST3]","[TEST4]","[TEST5]","[TEST6]","[TEST7]","[TEST8]","[TEST9]"]);
        return true;
    },


    setContentSize : function(size) {
        this.WIDTH =  size.width;
        this.HEIGHT = size.height;
        cc.Node.prototype.setContentSize.call(this, size);
        if( this.listView )
            this.listView.setContentSize(size);

        if( this.listItemModel ) {
            this.listItemModel.setContentSize(cc.size(this.WIDTH, this.listItemHeight));

            var but = this.listItemModel.getChildByName('ButtonItem');
            but.x = this.listItemModel.width * 0.5;
            but.y = this.listItemModel.height * 0.5;
        }
        if(this.delBtn) {
            this.delBtn.x =   this.WIDTH / 2;
            this.delBtn.y = -32;
        }

        if(this.upBtn) {
            this.upBtn.x =   this.WIDTH / 2;
            this.upBtn.y = -64;
        }

        if(this.downBtn) {
            this.downBtn.x =   this.WIDTH / 2;
            this.downBtn.y = -96;
        }
    },

    add : function (addItem, cb) {
        this.totalListItemCount = this.listView.getItems().length + 1;

        var item = this.listItemModel.clone();
        item.setTag(this.totalListItemCount - 1);
        var button = item.getChildByName('ButtonItem');
        button.setTitleText(addItem);
        button.setColor(color.textColor);
        this.listView.pushBackCustomItem(item);
        item.cb = cb;
        item.itemName = addItem;

        this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
        this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));
        this.listView.jumpToTop();

        this.setVisible(true);
    },

    changeItem : function (selectIndex, targetIndex){// target) {
        if(selectIndex < 0 || targetIndex < 0)
            return;

        var select = this.listView.getItem(selectIndex);
        var target = this.listView.getItem(targetIndex);

        var button = select.getChildByName('ButtonItem');
        var targetButton = target.getChildByName('ButtonItem');

        var tempCB = select.cb;
        var tempName = select.itemName;
        var tempColor = button.getColor();


        select.cb = target.cb;
        select.itemName = target.itemName;
        button.setTitleText( select.itemName);
        button.setColor(targetButton.getColor());

        target.cb = tempCB;
        target.itemName = tempName;
        targetButton.setTitleText( target.itemName);
        targetButton.setColor(tempColor);

        if(this.selectItem === target) {
            this.selectItem = select;
            this.selectIndex = selectIndex;
        }
        else if(this.selectItem === select) {
            this.selectItem = target;
            this.selectIndex = targetIndex;
        }

    },

    delBySelectItem : function () {
        if(!this.selectItem)
            return;

        cc.log("Item Delete: " + this.selectItem);

        this.listView.removeItem( this.selectIndex); //this.listView.getCurSelectedIndex());

        this.totalListItemCount = this.listView.getItems().length;
        this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
        this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));
        this.delBtn.setVisible(false);
        this.upBtn.setVisible(false);
        this.downBtn.setVisible(false);
        if(this.length() === 0)
            this.setVisible(false);

        if(this.selectItem.cb)
            this.selectItem.cb(this.selectItem.itemName,ItemListClickType.DELETE);

        this.selectItem = null;
        this.selectIndex = -1;
    },

    length : function () {
        return this.listView.getItems().length;
    },

    onEnter: function() {

        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setCascadeColorEnabled(true);
        this.setOpacity(128);

        cc.log("onEnter");
        cc.Node.prototype.onEnter.call(this);
        this.listView.forceDoLayout();
        this.totalListItemCount = this.listView.getItems().length;
        this.totalListViewHeight = this.listItemHeight * this.totalListItemCount + (this.totalListItemCount - 1) * this.itemMargin;
        this.listView.getInnerContainer().setContentSize(cc.size(this.listView.getInnerContainerSize().width, this.totalListViewHeight));

        this.listView.jumpToTop();
    },

    onButtonClick :function (sender, type) {
        cc.log("[CHECK] ",type);

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                var item = this.selectItem;
                if(!item)
                    return;

                if(sender === this.delBtn) {
                    this.delBySelectItem();
                }
                else if(sender === this.upBtn){
                    this.tagetIndex =  this.selectIndex - 1;
                    this.changeItem(this.selectIndex,  this.tagetIndex);
                    this.listView._curSelectedIndex =  this.tagetIndex;
                    if(item.cb)
                        item.cb(item.itemName,ItemListClickType.UP);
                }
                else if(sender === this.downBtn){
                    this.tagetIndex =  this.selectIndex + 1;
                    this.changeItem(this.selectIndex,  this.tagetIndex);
                    this.listView._curSelectedIndex =  this.tagetIndex;
                    if(item.cb)
                        item.cb(item.itemName,ItemListClickType.DOWN);
                }
                break;
        }
        this.refreshBtn();
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
    refreshBtn : function () {
        if(this.selectItem) {
            this.delBtn.setVisible(true);
            this.upBtn.setVisible(true);
            this.downBtn.setVisible(true);
            if (this.selectIndex === 0)
                this.upBtn.setVisible(false);

            if (this.selectIndex === this.listView.getItems().length - 1)
                this.downBtn.setVisible(false);
        }
        else {
            this.delBtn.setVisible(false);
            this.upBtn.setVisible(false);
            this.downBtn.setVisible(false);
        }
    }
});