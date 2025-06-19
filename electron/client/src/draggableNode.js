var DraggableNode = cc.Node.extend({
    selectMark: null,
    _staticSize: null, // 노드의 고정 크기를 저장할 변수
    _staticHitboxRect: null, // 고정 크기를 사용하는 사각 영역 정보

    ctor: function(contentSize) {
        this._super();

        this._staticSize = cc.size(contentSize.width, contentSize.height);
        this._staticHitboxRect = cc.rect(0, 0, this._staticSize.width, this._staticSize.height);
        this.setContentSize(this._staticSize);

        var self = this;
        var isOver = false;
        var touchStart = false;
        var centerPointDiff = cc.p(0, 0);

        this.selectMark = new cc.DrawNode();
        this.addChild(this.selectMark);

        var origin = cc.p(0, 0);
        var destination = cc.p(this._staticSize.width, this._staticSize.height);
        this.selectMark.drawRect(origin, destination, cc.color(0, 0, 0, 0), 2, cc.color(255, 255, 255, 255));

        this.setDraggable(false);

        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseMove: function(event) {
                if (!self._draggable) {
                    return;
                }

                var pos = event.getLocation();
                var prevOver = isOver;

                var worldRect = self.getStaticHitboxWorld();

                if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) {
                    isOver = cc.rectContainsPoint(worldRect, pos);
                    touchStart = false;
                } else if (event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver) {
                    if (!touchStart) {
                        touchStart = true;
                        var centerPos = self.getPosition();
                        centerPointDiff = cc.p(pos.x - centerPos.x, pos.y - centerPos.y);

                        // 드래그 시작 시 이벤트 알림 (기존 로직 유지)
                        cc.eventManager.dispatchCustomEvent('node_drag_started', { nodeId: self.__instanceId });
                    }

                    var nodePoint = self.getParent().convertToNodeSpace(cc.p(pos.x - centerPointDiff.x, pos.y - centerPointDiff.y));
                    event.getCurrentTarget().setPosition(nodePoint);

                    // [수정]: 드래그 중에도 'node_position_changed' 이벤트를 지속적으로 디스패치
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

    getStaticHitboxWorld: function() {
        var worldPos = this.getParent().convertToWorldSpace(this.getPosition());
        var anchor = this.getAnchorPoint();
        this._staticHitboxRect.x = worldPos.x - (this._staticSize.width * anchor.x);
        this._staticHitboxRect.y = worldPos.y - (this._staticSize.height * anchor.y);
        return this._staticHitboxRect;
    },

    onEnter: function() {
        this._super();
    },

    setDraggable: function(enable) {
        this._draggable = enable;
        this.selectMark.setVisible(this._draggable);
        // 드래그 불가능 상태가 될 때 기즈모를 여기서 직접 제거하지 않음.
        // UIScrollTreeViewCtrl의 setNode(null) 호출을 통해 제거
    },

    isDraggable: function() {
        return this._draggable;
    },

    addChildToCenter: function(child, localZOrder, tag) {
        child.x = this.width / 2;
        child.y = this.height / 2;
        this.addChild(child, localZOrder, tag);
    }
});