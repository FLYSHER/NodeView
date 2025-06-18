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
                    // 드래그 불가능할 때는 기즈모를 여기서 직접 그리지 않음
                    return;
                }

                var pos = event.getLocation();
                var prevOver = isOver;

                var worldRect = self.getStaticHitboxWorld();

                if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) {
                    isOver = cc.rectContainsPoint(worldRect, pos);
                    touchStart = false;

                    // 마우스 오버 상태만으로 기즈모를 그리지 않음. MainLayer의 mousedown에서 선택 시 그림
                } else if (event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver) {
                    if (!touchStart) {
                        touchStart = true;
                        var centerPos = self.getPosition();
                        centerPointDiff = cc.p(pos.x - centerPos.x, pos.y - centerPos.y);

                        // 드래그 시작 시 MainLayer에 이벤트 알림. MainLayer가 선택된 노드를 업데이트하고 기즈모를 그림
                        cc.eventManager.dispatchCustomEvent('node_drag_started', { nodeId: self.__instanceId });
                    }

                    var nodePoint = self.getParent().convertToNodeSpace(cc.p(pos.x - centerPointDiff.x, pos.y - centerPointDiff.y));
                    event.getCurrentTarget().setPosition(nodePoint);

                    // [핵심 수정]: 드래그 중에는 MainLayer에 'node_position_changed' 이벤트를 디스패치하여
                    // MainLayer가 다시 _treeView.setNode()를 호출하고 그 안에서 기즈모를 그리도록 합니다.
                    cc.eventManager.dispatchCustomEvent('node_position_changed', { nodeId: self.__instanceId });

                } else {
                    touchStart = false;
                    // 드래그 종료 시 기즈모를 여기서 직접 지우지 않음. MainLayer의 mousedown에서 처리
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