var UIScrollTreeViewCtrl = cc.LayerColor.extend({
    _scrolling:false,
    _lastPoint:null,
    TAG_CLIPPERNODE  : 1,
    TAG_CONTENTNODE  : 2,

    _selectNode : null,
    ctor : function () {
        this._super("");
        this.setColor(color.backgroundColor);
    },

    onEnter: function() {

        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setCascadeColorEnabled(true);
        this.setOpacity(128);
    },

    setContentSize :function(x, y) {
        this._super(x,y);
        this.resize();
    },

    resize : function () {
        if(this.clipper) {
            this.clipper.setContentSize(this.getContentSize());
            this.clipper.anchorX = 0.5;
            this.clipper.anchorY = 0.5;
            this.clipper.x = this.width / 2;
            this.clipper.y = this.height / 2;

            var rectangle = [cc.p(0, 0),cc.p(this.clipper.width, 0),
                cc.p(this.clipper.width, this.clipper.height),
                cc.p(0, this.clipper.height)];

            var white = cc.color(255, 255, 255, 255);
            this.clipper.stencil.cleanup();
            this.clipper.stencil.drawPoly(rectangle, white, 1, white);

            this.content.setAnchorPoint(0, 1);
            this.content.x = 0;
            this.content.y = this.clipper.height;

            this.viewBtn.x =  this.width / 2;
            this.viewBtn.y =  -this.FONTSIZE;


            this.localPos.x =  0;
            this.localPos.y = -this.FONTSIZE *2;
        }
    },

    setup:function () {
        this.clipper = new cc.ClippingNode();
        this.clipper.tag = this.TAG_CLIPPERNODE;
        this.addChild(this.clipper);

        this.stencil = new cc.DrawNode();
        this.clipper.stencil = this.stencil;

        this.content = new cc.Node();//cc.Sprite(res.HelloWorld_png);
        this.content.setName("content");
        this.content.tag = this.TAG_CONTENTNODE;
        this.content.setAnchorPoint(0, 1);
        this.content.x = 0;
        this.content.y = this.clipper.height;
        this.clipper.addChild(this.content);


        this._scrolling = false;
        var self = this;
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var target = event.getCurrentTarget();

                var touch = event;
                var clipper = target.getChildByTag(self.TAG_CLIPPERNODE);
                var point = clipper.convertToNodeSpace(touch.getLocation());
                var rect = cc.rect(0, 0, clipper.width, clipper.height);
                self._scrolling = cc.rectContainsPoint(rect, point);
                self._lastPoint = point;
            },

            onMouseMove: function (event) {
                if (!self._scrolling)
                    return;
                var target = event.getCurrentTarget();

                var touch = event;
                var clipper = target.getChildByTag(self.TAG_CLIPPERNODE);
                var point = clipper.convertToNodeSpace(touch.getLocation());
                var diff = cc.pSub(point, self._lastPoint);
                var content = clipper.getChildByTag(self.TAG_CONTENTNODE);
                content.setPosition(cc.pAdd(content.getPosition(), diff));
                self._lastPoint = point;
            },

            onMouseUp: function (event) {
                if (!self._scrolling) return;
                self._scrolling = false;
            }
        }), this);

        this.FONTSIZE = 18;
        this.viewBtn = new ccui.Button();
        this.viewBtn.setName("viewBtn");
        this.viewBtn.titleFontSize = 24;
        this.viewBtn.setTouchEnabled(true);
        this.viewBtn.addTouchEventListener(this.onButtonClick.bind(this), this);
        this.viewBtn.setTitleText("BACK");
        this.addChild(this.viewBtn);
        this.viewBtn.setVisible(false);


        this.localPos = new cc.LabelTTF("Local", "Arial", this.FONTSIZE);
        this.localPos.setContentSize(cc.size(this.FONTSIZE , this.FONTSIZE));
        this.localPos.setHorizontalAlignment(cc.TEXT_ALIGNMENT_LEFT);
        this.localPos.setAnchorPoint(0,1);
        this.addChild(this.localPos);
        this.localPos.setVisible(false);

        this.resize();
    },

    onButtonClick :function (sender, type) {
        cc.log("[CHECK] ",type);

        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                break;
            case ccui.Widget.TOUCH_ENDED:
                if(sender === this.viewBtn) {
                    if(this._selectNode){
                        this._selectNode.setVisible(!this._selectNode.isVisible());

                        this.selectNode(this._selectNode);

                    }
                }
                break;
        }
    },

    setNode :function (node) {
        delete this.treeInfo;

        this._selectNode = null;
        if(node && node.ui) {
            this.treeInfo = this.createUIChildList(node.ui);
            this.content.removeAllChildrenWithCleanup(true);

            this.content.x = 0;
            this.content.y = this.clipper.height;

            this.drawTree(this.treeInfo, 0, 0);
            this.content.setVisible(true);
            this.setVisible(true);
        }
        else {
            this.setVisible(false);
        }
    },

    createUIChildList :function (node) {
        if(!node)
            return null;

        var childList = [];

        var children = node.getChildren();
        for(var  i=0; i< children.length; i++)  {
            childList[i] = {};
            childList[i].info ={};
            childList[i].info.obj = children[i];
            childList[i].info.name = children[i].getName();
            childList[i].info.initScale = children[i].getScale();
            childList[i].childList = this.createUIChildList(children[i]);
        }
        return childList;
    },

    createArChildList :function (node) {
        if(!node)
            return null;

        var childList = [];

        var boneDic = node.armatureData.getBoneDataDic();
        var i = 0;
        for (var b in boneDic){

            childList[i] = {};
            childList[i].info ={};
            childList[i].info.obj = boneDic[b];
            childList[i].info.name =  boneDic[b].name;
            //childList[i].childList = this.createArChildList( boneDic[b]);
            i++;
        }
        return childList;
    },

    drawTree :function (treeInfo, depth, line) {
        if(!treeInfo)
            return line;

        var len = treeInfo.length;
        for(var i = 0; i < len; i++) {
            line++;

            var info = treeInfo[i];
            var btn = new ccui.Button();
            btn.setName(info.info.name);
            btn.titleFontSize = 24;
            btn.setTouchEnabled(true);
            btn.setAnchorPoint(0,0);
            btn.setTitleText(info.info.name);
            btn.info = info.info;
            btn.addTouchEventListener(
                function (sender, type) {
                    //his, ccui.Widget.TOUCH_BEGAN
                    switch (type){
                        case ccui.Widget.TOUCH_ENDED:
                            var actionBy = cc.scaleBy(0.15, 1.2).easing( cc.easeElasticOut( 1.5 ));
                            sender.info.obj.setScale(sender.info.initScale);
                            sender.info.obj.stopActionByTag(100);
                            sender.info.obj.runAction(cc.sequence(actionBy, actionBy.reverse())).setTag(100);

                            this.selectNode(sender.info.obj);
                            break;
                    }
                },
                this);
            btn.x = btn.titleFontSize * depth;
            btn.y = (btn.titleFontSize * line * -1);
            this.content.addChild(btn);
            line = this.drawTree(info.childList, depth+1, line);
        }
        return line;
    },

    selectNode :function (nodeObj)
    {
        this._selectNode = nodeObj;
        this.viewBtn.setVisible(true);
        this.viewBtn.setTitleText("Visible : " + this._selectNode.isVisible());
        this.localPos.setVisible(true);
        this.localPos.setString("localPos : " + this._selectNode.getPosition().x.toFixed(2) + " X " +this._selectNode.getPosition().y.toFixed(2));

    }
});