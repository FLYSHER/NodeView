var DraggableNode = cc.Node.extend({
    selectMark: null,
    ctor: function (contentSize) {
        this._super();
        this.setContentSize(contentSize);
        let self = this;
        let isOver = false;
        let touchStart = false;
        let centerPointDiff = cc.p(0, 0);
        this.selectMark = null;
        this.setDraggable(false);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseUp: function (event) {
                if (touchStart === true) {
                    Tool.Test(event.getCurrentTarget());
                }
            },
            onMouseMove: function (event) {
                if (!self._draggable) {
                    return;
                }

                let pos = event.getLocation();
                let centerPos = self.convertToWorldSpace();
                let anchor = self.getAnchorPoint();
                let prevOver = isOver;
                self._draggableRect.x = centerPos.x;
                self._draggableRect.y = centerPos.y;

                if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) {
                    isOver = cc.rectContainsPoint(self._draggableRect, pos);
                    touchStart = false;
                } else if (event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver) {
                    if (!touchStart) {
                        touchStart = true;
                        centerPointDiff =
                            cc.p(pos.x - (self._draggableRect.x + self._draggableRect.width * anchor.x),
                                pos.y - (self._draggableRect.y + self._draggableRect.height * anchor.y));
                    }
                    let nodePoint = self.getParent().convertToNodeSpace(cc.p(pos.x - centerPointDiff.x, pos.y - centerPointDiff.y));
                    event.getCurrentTarget().setPosition(nodePoint);
                } else {
                    touchStart = false;
                }

                if (!prevOver && isOver) {
                    cc._canvas.style.cursor = "pointer"
                } else if (prevOver && !isOver) {
                    cc._canvas.style.cursor = "default"
                }
            },
            swallowTouches: false
        }, this);
    },

    onEnter: function () {
        this._super();

        //this._draggableRect = this.getBoundingBoxToWorld();
        this._draggableRect = this.getBoundingBox();


        this.selectMark = new cc.DrawNode();
        this.selectMark.setAnchorPoint(0.5, 0.5);
        this.addChild(this.selectMark, -1);
        let origin = cc.p(0, 0);//cc.p(this._draggableRect.x, this._draggableRect.y);
        let destination = cc.p(this._draggableRect.width, this._draggableRect.height);
        this.selectMark.drawRect(origin, destination, cc.color(128, 0, 255, 100), 1, cc.color(255, 255, 255, 255));
    },

    setDraggable: function (enable) {
        this._draggable = enable;
        this.selectMark && this.selectMark.setVisible(this._draggable);
    },

    isDraggable: function () {
        return this._draggable;
    },

    addChildToCenter: function (child, localZOrder, tag) {
        child.x = this.width / 2;
        child.y = this.height / 2;
        this.addChild(child, localZOrder, tag);
    }
});