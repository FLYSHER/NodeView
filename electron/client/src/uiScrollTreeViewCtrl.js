var UIScrollTreeViewCtrl = cc.Node.extend({
    _scrolling: false,
    _selectNode: [],
    _masterNode: null,
    _treeWidgetObj: {},
    _selectCallBack: null,
    ctor: function (callback) {
        this._super("");

        this._selectCallBack = callback;
        $('#animationTree').jstree({
            'core': {
                'data': []
            },
            "plugins": ["search"],
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });

        let self = this;
        $('#animationTree').on("changed.jstree", function (e, data) {
            if (!!data.node === false)
                return;
            if (data.selected.length < 2) {
                let selectedObj = self._treeWidgetObj[data.node.id];
                if (!!selectedObj === false)
                    return;
                if (selectedObj.obj.getNumberOfRunningActions() === 0) {
                    let actionBy = cc.scaleBy(0.15, 1.2).easing(cc.easeElasticOut(1.5));
                    $('#scaleValue').html("(" + selectedObj.initScaleX + " , " + selectedObj.initScaleY + ")");
                    selectedObj.obj.runAction(cc.sequence(actionBy, actionBy.reverse())).setTag(100);
                }
                self._selectCallBack(selectedObj.obj, true);
            }
        });
    },

    setNode: function (node) {
        delete this.treeInfo;
        this._selectNode.length = 0;
        this._selectNode = [];
        this._masterNode = node;
        this._treeWidgetObj = {};

        let treeObj = [];
        let actionObj = [];

        if (node && node.ui) {
            let childTree = this.createUIChildList(node.ui);

            this.treeInfo = [{
                info: {
                    id: node.ui.__instanceId,
                    obj: node.ui,
                    name: node.ui.getName(),
                    initScale: node.ui.getScale(),
                },
                childList: childTree
            }];

            //treeWidget
            this.drawTree(this.treeInfo, 0, 0, treeObj);
            if (node.cocosAction) {
                for (let key in node.cocosAction._animationInfos) {
                    let obj = {
                        'text': key
                    }
                    actionObj.push(obj);
                }
            } else {
                //UI Action 추가되는 부분
                let name = node.getName() + '.ExportJson';
                let actionList = ccs.actionManager.getActionList(name);
                for (let i = 0; i < actionList.length; i++) {
                    let obj = {
                        'text': actionList[i].getName()
                    }
                    actionObj.push(obj);
                }
            }
        }

        $('#animationTree').jstree(true).settings.core.data = treeObj;
        $('#animationTree').jstree("refresh");
    },

    createUIChildList: function (node) {
        if (!node)
            return null;
        let childList = [];
        let children = node.getChildren();
        for (let i = 0; i < children.length; i++) {
            childList[i] = {};
            childList[i].info = {};
            childList[i].info.obj = children[i];
            childList[i].info.name = children[i].getName();
            childList[i].info.initScale = children[i].getScale();
            childList[i].info.initScaleX = children[i].getScaleX();
            childList[i].info.initScaleY = children[i].getScaleY();
            childList[i].info.id = children[i].__instanceId;
            childList[i].childList = this.createUIChildList(children[i]);
        }
        return childList;
    },

    drawTree: function (treeInfo, depth, line, dataObj) {
        if (!treeInfo)
            return line;

        let len = treeInfo.length;
        for (let i = 0; i < len; i++) {
            line++;

            let info = treeInfo[i];
            let obj = {
                "id": info.info.id,
                "text": info.info.name,
                "state": {
                    "opened": true
                },
                "instanceID": 0
            };
            if (info.childList.length > 0) {
                obj.children = [];
            }
            this._treeWidgetObj[info.info.id] = {};
            this._treeWidgetObj[info.info.id].obj = info.info.obj;
            this._treeWidgetObj[info.info.id].id = info.info.id;
            this._treeWidgetObj[info.info.id].name = info.info.name;
            this._treeWidgetObj[info.info.id].initScale = info.info.obj.getScale();
            this._treeWidgetObj[info.info.id].initScaleX = info.info.obj.getScaleX();
            this._treeWidgetObj[info.info.id].initScaleY = info.info.obj.getScaleY();

            dataObj.push(obj);
            line = this.drawTree(info.childList, depth + 1, line, obj.children);
        }
        return line;
    },
});



