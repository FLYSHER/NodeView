var DraggableNode = cc.Node.extend({

    ctor: function(contentSize) {
        this._super();

        this.setContentSize(contentSize);

        var self = this;
        var isOver = false;
        var touchStart = false;
        var centerPointDiff = cc.p(0, 0);

        this.setDraggable(false);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                if (!self._draggable) {
                    return;
                }

                var pos = event.getLocation();
                var prevOver = isOver;

                var worldRect = self.getBoundingBoxToWorld();

                if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) {
                    isOver = cc.rectContainsPoint(worldRect, pos);
                    touchStart = false;
                } else if (event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver) {
                    if (!touchStart) {
                        touchStart = true;
                        var centerPos = self.getPosition();
                        centerPointDiff = cc.p(pos.x - centerPos.x, pos.y - centerPos.y);

                        cc.eventManager.dispatchCustomEvent('node_drag_started', { nodeId: self.__instanceId });
                    }

                    var nodePoint = self.getParent().convertToNodeSpace(cc.p(pos.x - centerPointDiff.x, pos.y - centerPointDiff.y));
                    event.getCurrentTarget().setPosition(nodePoint);

                    cc.eventManager.dispatchCustomEvent('node_position_changed', { nodeId: self.__instanceId });

                } else {
                    touchStart = false;
                }

                if (!prevOver && isOver) {
                    cc._canvas.style.cursor = "pointer";
                } else if (prevOver && !isOver) {
                    cc._canvas.style.cursor = "default";
                }
            },
            swallowTouches: false
        }, this);
    },

    onEnter: function() {
        this._super();
    },

    setDraggable: function(enable) {
        this._draggable = enable;
    },

    isDraggable: function() {
        return this._draggable;
    },

    addChildToCenter: function(child, localZOrder, tag) {
        child.x = this.width / 2;
        child.y = this.height / 2;
        this.addChild(child, localZOrder, tag);
    },

    setScale: function(scale) {
        this._super(scale);
    },
    setScaleX: function(scaleX) {
        this._super(scaleX);
    },
    setScaleY: function(scaleY) {
        this._super(scaleY);
    },
    setRotation: function(rotation) {
        this._super(rotation);
    },

    setContentSize: function(contentSize) {
        this._super(contentSize);
    }
});