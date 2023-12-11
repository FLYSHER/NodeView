var XFLIGHT_BETTING_LIST_NODE_DEFINES = {
    Tab: {
        Type: {
            AllBet: 0,
            Top: 1,
        },
        Buttons: ["btnAllBet", "btnTop"],
        Text: ["imgTapTextBet", "imgTapTextTop"],
        Count: 2,
        Default: 0,
    },
    Size: {
        Type: {
            Extend: 0,
            Reduce: 1,
        },
        Count: 2,
        Buttons: ["btnReduce", "btnExtend"],
        BaseImg: ["imgBaseExtend", "imgBaseReduce"],
        Default: 0,
    },
    Ping: {
        Type: ["DEFAULT", "GOOD", "WARNING"],
        Status: {
            DEFAULT: 0,
            GOOD: 1,
            WARNING: 2,
        },
    },
};
var XFlightBettingListNotiNode = cc.Node.extend({
    /** @constructs */
    ctor: function (ui, defines) {
        this._super();
        this._initVars(defines);
        this._init(ui);
    },
    _initVars: function (defines) {
        this._defines = defines;

        /** @type {cc.Node & ccui.Widget} */
        this._ui = null;

        // Root Widget
        /** @type {[cc.Node & ccui.ImageView]} */
        this._imgPingArr = [];
        /** @type {cc.Node & cc.LabelTTF} */
        this._lbPlayerCount = null,
            this._lbPing = null;

        // Scrolls
        /** @type {[cc.Node & ccui.Widget & ccui.ListView]} */
        this._scrollViewArr = [];
        /** @type {cc.Node & ccui.Slider} */
        this._slScroll = null;
        this._imgScroll = null;
        this._imgBaseArr = [];

        // Mini Noti
        /** @type {[XFlightBettingListNotiMini]} */
        this._miniNotiArr = [];

        // Buttons
        /** @type {[cc.Node & ccui.Button]} */
        this._btnTabArr = [],
            this._btnSizeArr = [];

        // Tabs
        this._tabNodeArr = [];
        this._tabTextArr = [];

        // Data
        this._currSize = -1;
        this._currTab = -1;

        // Pool
        /** @type {XFlightBettingListPoolNode} */
        this._listPool = null;
    },
    _init: function (ui) {
        this._ui = ccs.uiReader.widgetFromJsonFile(ui);
        this.addChild(this._ui);
        this._ui.setAnchorPoint(cc.p(0.5, 0.5));

        this._initListPool();
        this._initTopUI();
        this._initContents();
        this._initAfter();
    },
    _initListPool: function () {
        this._listPool = new XFlightBettingListPoolNode(XFlightBettingListPoolDefines);
        this.addChild(this._listPool);
    },

    _initTopUI: function () {
        this._initPing();
        this._initPlayerCount();
    },
    _initPing: function () {
        this._lbPing = ccui.helper.seekWidgetByName(this._ui, "lbPing");
        this._lbPing.setString("");

        for (var i = 0; i < this._defines.Ping.Type.length; i++) {
            this._imgPingArr[i] = ccui.helper.seekWidgetByName(this._ui, "imgPing" + i);
        }
    },
    _initPlayerCount: function () {
        this._lbPlayerCount = ccui.helper.seekWidgetByName(this._ui, "lbUserNum");
    },

    _initContents: function () {
        this._initTabs();
        this._initScrolls();
        this._initMiniNoti();
    },

    _initTabs: function () {
        this._initTabText();
        this._initTapButtons();
        this._initTabNode();
    },
    _initTabText: function () {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            var imgText = ccui.helper.seekWidgetByName(this._ui, this._defines.Tab.Text[i]);
            imgText.setVisible(false);
            this._tabTextArr[i] = imgText;
        }
    },
    _initTapButtons: function () {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            var btn = ccui.helper.seekWidgetByName(this._ui, this._defines.Tab.Buttons[i]);
            btn.addTouchEventListener(this._onTouchBtnTab.bind(this, i), this);
            this._btnTabArr[i] = btn;
        }
    },
    _initTabNode: function () {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            var tabNode = new cc.Node();
            this._ui.addChild(tabNode);
            tabNode.setPosition(cc.p(0, 0));
            tabNode.setAnchorPoint(cc.p(0.5, 0.5));
            this._tabNodeArr[i] = tabNode;
            this._tabNodeArr[i].setLocalZOrder(100);
        }
    },

    _initScrolls: function () {
        this._initSlider();
        this._initScrollViews();
        this._initBaseImg();
        this._initSizeButtons();
    },
    _initSlider: function () {
        this._imgScroll = ccui.helper.seekWidgetByName(this._ui, "imgScroll");
        this._imgScroll.setVisible(false);

        this._slScroll = ccui.helper.seekWidgetByName(this._ui, "slScroll");
        this._slScroll.addEventListener(this._onTouchScrollBar, this);
    },
    _initScrollViews: function () {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            var sv = new ccui.ListView();
            sv.setContentSize(cc.size(300, 242));
            sv.setScrollBarEnabled(false);
            sv.setDirection(ccui.ScrollView.DIR_VERTICAL);
            sv.setPosition(cc.p(0, 37));
            sv.setTouchEnabled(false);
            sv.addEventListenerScrollView(this._onTouchScrollView, this);

            this._tabNodeArr[i].addChild(sv);
            this._scrollViewArr[i] = sv;
        }
    },
    _initBaseImg: function () {
        for (var i = 0; i < this._defines.Size.Count; i++) {
            this._imgBaseArr[i] = ccui.helper.seekWidgetByName(this._ui, this._defines.Size.BaseImg[i]);
            this._imgBaseArr[i].setVisible(false);
        }
    },
    _initSizeButtons: function () {
        for (var i = 0; i < this._defines.Size.Count; i++) {
            var btnName = this._defines.Size.Buttons[i];
            var btn = ccui.helper.seekWidgetByName(this._ui, btnName);
            btn.addTouchEventListener(this._onTouchBtnSize.bind(this, i), this);
            this._btnSizeArr[i] = btn;
        }
    },

    _initMiniNoti: function () {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            this._miniNotiArr[i] = new XFlightBettingListNotiMini(i, this._listPool, 3, cc.size(300, 22));
            this._tabNodeArr[i].addChild(this._miniNotiArr[i]);
            this._miniNotiArr[i].setPosition(cc.p(0, 257));
        }
    },
    _initAfter: function () {
        this._currSize = this._defines.Size.Default;
        this._currTab = this._defines.Tab.Default;
        this._setAllContentsVisible(false);
        this._showCurrContent();
    },

    // Interfaces
    setPing: function (status, val) {
        this._lbPing.setVisible(true);
        this._lbPing.setString(val);
        this._imgPingArr[status].setVisible(true);
    },
    _resetImgPing: function () {
        for (var i = 0; i < this._imgPingArr.length; i++) {
            this._imgPingArr[i].setVisible(false);
        }
    },
    setUserCount: function (count) {
        this._lbPlayerCount.setVisible(true);
        this._lbPlayerCount.setString(count);
    },
    addListFront: function (tabType, userData) {
        this._addToScrollView(tabType, 0, userData);
        this._updateMiniViewFromScrollView(tabType);
    },
    addListBack: function (tabType, userData) {
        var index = this._scrollViewArr[tabType].getItems().length;
        this._addToScrollView(tabType, index, userData);
        this._updateMiniViewFromScrollView(tabType);
    },
    addListByIndex: function(tabType,index,userData){
        this._addToScrollView(tabType, index, userData);
        this._updateMiniViewFromScrollView(tabType);
    },
    resetAllList: function (tabType) {
        while(this._scrollViewArr[tabType].getItems().length > 0)
            this._removeScrollViewList(tabType, 0);

        for (var j = 0; j < this._miniNotiArr[tabType].getMaxListCount(); j++) {
            this._removeMiniViewList(tabType, j);
        }
    },

    // Interface - UserData
    _addToScrollView: function (tabType, index, userData) {
        var node = this._listPool.getList(tabType, userData);
        this._scrollViewArr[tabType].insertCustomItem(node, index);
        this._updateScrollViewSize(tabType);
    },
    _updateScrollViewSize: function (tabType) {
        var children = this._scrollViewArr[tabType].getItems();
        if (children.length === 0)
            return;

        var csize = children[0].getContentSize();
        this._scrollViewArr[tabType].setInnerContainerSize(cc.size(csize.width, csize.height * children.length));
    },
    _removeScrollViewList: function (tabType, index) {
        var item = this._scrollViewArr[tabType].getItem(index);
        if (!item)
            return;

        this._listPool.returnList(tabType, item);
        this._scrollViewArr[tabType].removeItem(index);
    },

    _updateMiniViewFromScrollView: function (tabType) {
        for (var i = 0; i < this._miniNotiArr[tabType].getMaxListCount(); i++) {
            var item = this._scrollViewArr[tabType].getItem(i);
            if(!!item)
                this._addToMiniView(tabType, i, this._listPool.getUserDataFromList(tabType, item));
        }
    },
    _addToMiniView: function (tabType, index, userData) {
        if (this._miniNotiArr[tabType].getMaxListCount() <= index)
            return;

        var node = this._listPool.getList(tabType, userData);
        this._miniNotiArr[tabType].addList(index, node);
    },
    _removeMiniViewList: function (tabType, index) {
        var node = this._miniNotiArr[tabType].removeAndReturnList(index);
        this._listPool.returnList(tabType, node);
    },

    // Utils
    _setAllContentsVisible: function (visible) {
        for (var i = 0; i < this._defines.Tab.Count; i++) {
            this._tabTextArr[i].setVisible(visible);
            this._tabNodeArr[i].setVisible(visible);
            this._miniNotiArr[i].setVisible(false);
            this._scrollViewArr[i].setVisible(visible);
            this._btnTabArr[i].setHighlighted(visible);
        }

        for (var i = 0; i < this._defines.Size.Count; i++) {
            this._btnSizeArr[i].setVisible(visible);
            this._imgBaseArr[i].setVisible(visible);
        }

        this._imgScroll.setVisible(visible);
    },
    _showCurrContent: function () {
        this._tabNodeArr[this._currTab].setVisible(true);
        this._tabTextArr[this._currTab].setVisible(true);
        this._btnTabArr[this._currTab].setHighlighted(true);

        if (this._currSize === this._defines.Size.Type.Extend) {
            this._scrollViewArr[this._currTab].setVisible(true);
            this._scrollViewArr[this._currTab].setTouchEnabled(true);
        } else {
            this._miniNotiArr[this._currTab].setVisible(true);
        }

        this._btnSizeArr[this._currSize].setVisible(true);
        this._imgBaseArr[this._currSize].setVisible(true);
        this._imgScroll.setVisible(this._currSize === this._defines.Size.Type.Extend);
    },

    // Abstract Events (Maybe should override someday...)
    _onTouchScrollView: function (sender, type) {
        if (type === ccui.ScrollView.EVENT_CONTAINER_MOVED) {
            var posScrInnerCon = this._scrollViewArr[this._currTab].getInnerContainerPosition();
            var sizeScrInnerCon = this._scrollViewArr[this._currTab].getInnerContainerSize();
            var sizeScrView = this._scrollViewArr[this._currTab].getContentSize();
            var temp, percent;
            temp = sizeScrView.height - sizeScrInnerCon.height;
            percent = (100) / (-temp) * (posScrInnerCon.y - temp);
            this._slScroll.setPercent(percent);
        }
    },
    _onTouchScrollBar: function (sender, type) {
        if (type === ccui.Slider.EVENT_PERCENT_CHANGED) {
            var percent = sender.getPercent();
            this._scrollViewArr[this._currTab].jumpToPercentVertical(percent);

        }
    },

    _onTouchBtnTab: function (index, sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this._currTab = index;
            this._setAllContentsVisible(false);
            this._showCurrContent(type);
        }
    },
    _onTouchBtnSize: function (index, sender, type) {
        if (type === ccui.Widget.TOUCH_ENDED) {
            this._currSize = index === this._defines.Size.Type.Extend ? this._defines.Size.Type.Reduce : this._defines.Size.Type.Extend;
            this._setAllContentsVisible(false);
            this._showCurrContent(type);
        }
    },
});

var XFlightBettingListPoolDefines = {
    defaultPoolSize: 10,
    Type: {
        AllBet: 0,
        Top: 1,
    },
    UI: {
        AllBet: resSlot213.XFlightNotiUserInfoSectionUI,
        Top: resSlot213.XFlightNotiUserInfoSectionUI
    },
};
var XFlightBettingListPoolNode = cc.Node.extend({
    /** @constructs */
    ctor: function (defines) {
        this._super();
        this._initVars(defines);
        this._init();
    },
    _initVars: function (defines) {
        this._defines = defines;
        /** @type {{[p:string] : slotNodePool}} */
        this._poolList = {};
        this._usedPoolArr = [];
    },
    _init: function () {
        var keys = Object.keys(this._defines.Type);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var ui = ccs.uiReader.widgetFromJsonFile(this._defines.UI[key]);
            this._poolList[this._defines.Type[key]] = SlotUtils.nodeUtil.createNodePool(ui, this._defines.defaultPoolSize);
            this._usedPoolArr[i] = [];
        }
    },

    returnList: function (tabType, node) {
        if (!!node) {
            var idx = this._usedPoolArr[tabType].indexOf(node);
            if (idx > -1) {
                this._poolList[tabType].returnNode(node);
                this._usedPoolArr[tabType][idx] = null;
            }
        }
    },

    getList: function (type, data) {
        var node = this._poolList[type].getNode();
        this._applyDataToList(type, node, data);
        this._usedPoolArr[type].push(node);
        return node;
    },
    _applyDataToList: function (type, node, data) {
        var top = ccui.helper.seekWidgetByName(node, "pnTopSection");
        var allBet = ccui.helper.seekWidgetByName(node, "pnBetSection");
        top.setVisible(false);
        allBet.setVisible(false);

        var root = type === this._defines.Type.AllBet ? allBet : top;
        root.setVisible(true);
        this._updateVisibleByType(root, data);

        var lbUserName = ccui.helper.seekWidgetByName(root, "lbUserName");
        !!lbUserName && lbUserName.setString(data.userName);
        var lbBetNum = ccui.helper.seekWidgetByName(root, "lbBetNum");
        !!lbBetNum && lbBetNum.setString(data.bet);
        var lbWinNum = ccui.helper.seekWidgetByName(root, "lbWinNum");
        !!lbWinNum && lbWinNum.setString(data.win);
        var lbMultiNum = ccui.helper.seekWidgetByName(root, "lbMultiNum");
        !!lbMultiNum && lbMultiNum.setString(data.multi);
        var lbRank = ccui.helper.seekWidgetByName(root, "lbRank");
        !!lbRank && lbRank.setString(data.rank);
    },
    _updateVisibleByType: function (node, data) {
        this._findWidgetAndSetVisible(node, "lbUserName", true);
        this._findWidgetAndSetVisible(node, "lbBetNum", true);
        this._findWidgetAndSetVisible(node, "lbWinNum", true);
        this._findWidgetAndSetVisible(node, "lbMultiNum", true);
        for (var i = 0; i < 7; i++) {
            this._findWidgetAndSetVisible(node, "imgMultiBase" + i, false);
        }
        this._findWidgetAndSetVisible(node, "imgMultiBase" + this.getLevel(data.multi), true);
        this._findWidgetAndSetVisible(node, "lbRank", true);
        for (var i = 0; i < 3; i++) {
            this._findWidgetAndSetVisible(node, "imgRank" + i, false);
        }
        this._findWidgetAndSetVisible(node, "imgRank" + (data.rank-1), true);

    },
    _findWidgetAndSetVisible: function (node, name, visible) {
        var widget = ccui.helper.seekWidgetByName(node, name);
        !!widget && widget.setVisible(visible);
    },

    getUserDataFromList: function (tabType, list) {
        var retVal = {
            userName: null,
            bet: null,
            win: null,
            multi: null,
            rank: null,
            level: null,
        };
        var top = ccui.helper.seekWidgetByName(list, "pnTopSection");
        var allBet = ccui.helper.seekWidgetByName(list, "pnBetSection");
        var root = tabType === this._defines.Type.AllBet ? allBet : top;

        retVal.userName = this._findWidgetAndGetString(root, "lbUserName");
        retVal.bet = this._findWidgetAndGetString(root, "lbBetNum");
        retVal.win = this._findWidgetAndGetString(root, "lbWinNum");
        retVal.multi = this._findWidgetAndGetString(root, "lbMultiNum");
        retVal.rank = this._findWidgetAndGetString(root, "lbRank");
        retVal.level = this.getLevel(Number(retVal.multi));

        return retVal;
    },
    _findWidgetAndGetString: function (node, name) {
        var widget = ccui.helper.seekWidgetByName(node, name);
        if (!!widget)
            return widget.getString();
    },

    getLevel: function (multi) {
        var level = 0;

        if(multi > 1)
            level = 1;
        if(multi > 10)
            level = 2;
        if (multi > 20)
            level = 3;
        if (multi > 50)
            level = 4;
        if (multi > 100)
            level = 5;
        if (multi > 500)
            level = 6;
        if (multi > 1000)
            level = 7;

        return level;
    },
});

var XFlightBettingListNotiMini = cc.Node.extend({
    /** @constructs */
    ctor: function (tabType, poolNode, maxListCount, listSize) {
        this._super();
        this._initVars(tabType, poolNode, maxListCount, listSize);
        this._init();
    },
    _initVars: function (tabType, poolNode, maxListCount, listSize) {
        this._tabType = tabType;
        this._poolNode = poolNode;
        this._maxListCount = maxListCount;
        this._listSize = listSize;

        /** @type {[cc.Node & ccui.Widget]} */
        this._listArr = [];
        /** @type {[cc.Point]} */
        this._listPosArr = [];
    },
    _init: function () {
        for (var i = 0; i < this._maxListCount; i++) {
            this._listPosArr[i] = cc.p(0, -(this._listSize.height * i));
        }
    },

    addList: function (index, node) {
        // If node is already exist, return it to pool.
        if (!!this._listArr[index])
            this._returnList(index);

        this._listArr[index] = node;
        this.addChild(this._listArr[index]);
        this._listArr[index].setPosition(this._listPosArr[index]);
    },
    _returnList: function (index) {
        this._poolNode.returnList(this._tabType, this._listArr[index]);
        this._listArr[index] = null;
    },
    reset: function () {
        this._listArr = [];
    },
    removeAndReturnList: function (index) {
        var retVal = null;
        if (!!this._listArr[index]) {
            this._listArr[index].removeFromParent();
            retVal = this._listArr[index];
            this._listArr[index] = null;
        }
        return retVal;
    },

    // Getter
    getMaxListCount: function () {
        return this._maxListCount;
    },
});