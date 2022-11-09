var color = {
    backgroundColor: cc.color(245, 255, 245),
    textColor: cc.color(0, 128, 255),
    seletTextColor: cc.color(255, 0, 0)
};

var UIListViewTest = cc.Node.extend({
    totalListItemCount: 100,
    totalListViewHeight: 0,
    listItemHeight: 50,
    itemMargin: 8,
    bufferZone: 240,
    lastContentPosY: 0,
    listView: null,
    ctor: function () {
        this._super(color.backgroundColor);
        this.cb = null;
        $('#animationTree').jstree({
            'core': {
                'data': []
            }
        });
        var self = this;
        $('#animationTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;
            self.cb && self.cb(data.node.text);
        });
        return true;
    },
    setAnimations: function (itemArray, cb) {
        this.cb = cb;
        var treeObj = [];
        for (var i = 0; i < itemArray.length; ++i) {
            var obj = {
                'text': itemArray[i]
            }
            treeObj.push(obj);
        }
        $('#animationTree').jstree(true).settings.core.data = treeObj;
        $('#animationTree').jstree("refresh");
    },
    initRefresh: function(){
        $('#animationTree').jstree(true).settings.core.data = [];
        $('#animationTree').jstree("refresh");
    },
});