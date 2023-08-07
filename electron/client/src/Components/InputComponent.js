

GST.Component.Touch = GST.Component.Base.extend({
    SHOW_DEBUG_DRAW_HITRECT : false,

    ctor: function () {
        this._super();
        this.setName("GST.Component.Touch");
        this.initProperties();
    },


    initProperties : function (){
        this._touchEnabled = true;
        this._touchListener = null;
        this._mouseListener = null;
        this._owner = null;

        this._customHitRectSize =null;
        this._customHitRectCenterOffsetPt = cc.p(0,0);
        this._anyClippingLayerInAncestor = null;
    },

    onEnter : function() {
        this.onActivate();
    },

    onExit : function() {
        this.onDeactivate();
    },

    onActivate : function(){
        this._owner = this.getOwner();
        if (this._owner) {

            // cc.log("RockN.Component.Touch onActivate : " + this._owner.getName());
            this._createEvent();


            //디버깅용 HIT RECT 그리기
            if (this.SHOW_DEBUG_DRAW_HITRECT === true ) {
                this.drawDebugingHitRect();
            }
        }
    },

    //디버깅용 HIt Rect  그리기
    drawDebugingHitRect: function(){

        if (this._owner == null)
        {
            cc.error("this._owner가 null입니다. component를 owner에 addComponent후에 호출해주세요.");
            return;
        }

        if(this._owner instanceof ccs.Armature)
        {
            this.drawDebugingHitRectOnParent(); //아마추어는 부모에다 그린다.
        }
        else{
            this._drawHitRect(this._owner);
        }
    },
    //부모에다 그리기
    drawDebugingHitRectOnParent: function() {

        var self = this;
        var updateFunc = function (dt) {

            cc.log("SHOW_DEBUG_DRAW_HITRECT update");
            if (self._owner.getParent() != null) {
                self._drawHitRect(self._owner.getParent());
                self._owner.unschedule(updateFunc);
                return true;
            }
            return false;
        };

        //owner가 parent에 붙을때까지  schedule로 체크후 붙으면 draw한다.
        if (updateFunc(0) === false) {
            this._owner.schedule(updateFunc, 0, cc.REPEAT_FOREVER, 0.1);
        }
    },

    onDeactivate: function() {

        if (this._owner != null) {
            cc.log("RockN.Component.Touch onDeactivate : " + this._owner.getName());
            this._owner = null;
        }
        this.release();

    },


    //HitRect 중앙좌표 Offset 설정
    setCustomHitRectCenterOffsetPt : function(ptOffset){

        this._customHitRectCenterOffsetPt = ptOffset;
    },

    //커스텀한 HitRect 좌표 설정 (설정하지않을씨 owner의 width, height 기준)
    setCustomHitRectSize : function (width, height){

        this._customHitRectSize = cc.size(width, height);
    },


    setEnabled : function(bEnabled)
    {
        this._super(bEnabled);
        this._refreshListeners();
    },

    setTouchEnabled : function (touchEnabled){
        this._touchEnabled = touchEnabled;
        this._refreshListeners();
    },

    _refreshListeners : function(){

        var isTouchEnabled = this.isEnabled() && this._touchEnabled;
        this._touchListener && this._touchListener.setEnabled(isTouchEnabled);
        this._mouseListener && this._mouseListener.setEnabled(isTouchEnabled);
    },

    _drawHitRect : function (targetNodeToDraw)
    {
        if (targetNodeToDraw != null) {

            var rectInWorld = this.getHitRectInWorld();
            var w2nTr = targetNodeToDraw.getWorldToNodeTransform();
            var rectInNode = cc.rectApplyAffineTransform(rectInWorld, w2nTr);

            var shape = new cc.DrawNode();
            shape.drawRect( cc.p( rectInNode.x, rectInNode.y ), cc.p( cc.rectGetMaxX( rectInNode ), cc.rectGetMaxY( rectInNode ) ), cc.color( 0, 0, 0, 0 ), 2, cc.color( 255, 255, 0, 255 ) );
            targetNodeToDraw.addChild(shape, this._owner.getLocalZOrder() + 1);
        }

    },

    getHitRectCenterPt : function(){
        return cc.p(0,0);
    },

    getHitRectSize : function(){
        if (this._customHitRectSize != null)
        {
            return cc.size(this._customHitRectSize.width ,this._customHitRectSize.height );
        }
        else{
            return cc.size(this._owner.width ,this._owner.height );
        }
    },

    getHitRectInWorld:function(){

        var hitSize = this.getHitRectSize();

        //center 좌표 기본은 0,0 이나 Armature 의 경우 센터가 이상하게 잡혀서 보정해줘야함
        var centerPt = this.getHitRectCenterPt();
        var customizedCenterPt = cc.pAdd(centerPt, this._customHitRectCenterOffsetPt);

        var rect = cc.rect(customizedCenterPt.x, customizedCenterPt.y, hitSize.width, hitSize.height);
        var trans = this._owner.getNodeToWorldTransform();
        return cc.rectApplyAffineTransform(rect, trans);
    },

    //부모 클리핑 노드 검사
    onCheckHitClippingNode : function(ptWorld)
    {
        if (this._anyClippingLayerInAncestor) //보모노드에 클리핑 노드가 있다면 클리핑 노드 바깥의 터치는 skip한다.
        {
            var rect = cc.rect(0, 0, this._anyClippingLayerInAncestor.width, this._anyClippingLayerInAncestor.height);
            var rectWorld = cc.rectApplyAffineTransform(rect, this._anyClippingLayerInAncestor.getNodeToWorldTransform());
            if (!cc.rectContainsPoint(rectWorld, ptWorld))
            {
                return false;   //클리핑 노드 바깥으로 클릭시 false
            }
        }
        return true;
    },

    onCheckHit : function( ptWorld )
    {
        //부모 클리핑 노드 검사
        if (false === this.onCheckHitClippingNode(ptWorld))
        {
            return false;
        }

        return cc.rectContainsPoint(this.getHitRectInWorld(), ptWorld);
    },

    //이벤트 트리거
    onTriggerEvent : function (touchEventName, pt){


    },

    _isVisibleInHierarchy : function( target ) {
        if( target.isVisible && target.isVisible() ) {
            var parent = target.getParent();
            if( (!parent) || parent === cc.director.getRunningScene() ) {
                return true;
            }
            return this._isVisibleInHierarchy( parent );
        }
        return false;
    },

    //부모노드 조사 (visble인지 check하고 상위에 Clipping Node가 있는지 조사한다)
    _checkInHierarchyRecursively : function( target )
    {
        if( target.isVisible() === false ) {
            return false;
        }
        else{
            if (target instanceof ccui.Layout && target.isClippingEnabled())
            {
                this._anyClippingLayerInAncestor = target;
            }

            var parent = target.getParent();
            if( parent == null) {
                return false;
            }
            else if (parent === cc.director.getRunningScene() )
            {
                return true;
            }
            return this._checkInHierarchyRecursively( parent );
        }
    },
    _checkInHierarchy : function( target ) {
        this._anyClippingLayerInAncestor = null; //부모노드 중에  Clipping Layer가 있는지 조사
        if(!this._checkInHierarchyRecursively(target))
        {
            this._anyClippingLayerInAncestor = null;
            return false;
        }
        return true;
    },

    _checkOwnersEvent : function (touchEventName, pt){

        //if (this._touchEnabled ===true && this._owner.isVisible() && this.isEnabled())
        //if (this._owner.isVisible())
        if (this._checkInHierarchy(this._owner))
        {
            return (this.onCheckHit(pt))
        }

        return false;
    },

    getTouchPriority : function(){
        return this.getOwner();
    },

    stopPropagationEvent : function (eventName, event){

        if (eventName === "move" || eventName === "up")
        {
            event._stopTrigger = true;
        }
        else{
            event.stopPropagation();
        }

        return true;
    },

    //이벤트 리스너 생성
    _createEvent : function (){

        var self = this;


        var isTouchEnabled = this.isEnabled() && this._touchEnabled;
        if( 'mouse' in cc.sys.capabilities  && this._mouseListener == null ) {
            // var targetNode = this.getOwner();
            // cc.log("RockN.Component.Touch MouseEvent Listener Created : "+ targetNode.getName());
            this._mouseListener =   cc.EventListener.create({
                event: cc.EventListener.MOUSE,
                swallowTouches: true,
                // hitSuccess: false,
                // overState: false,
                lastMoveState : false,
                onMouseDown: function( event ) {

                    if (self._checkOwnersEvent("down", event.getLocation()))
                    {
                        self.onTriggerEvent("down", event.getLocation());
                        this._touchCaptured = true;
                        return self.stopPropagationEvent("down", event);
                    }
                    return true;
                },
                onMouseMove: function( event ) {

                    if ((event._stopTrigger !== true || this._touchCaptured) &&
                        self._checkOwnersEvent("move", event.getLocation())) {

                        self.onTriggerEvent("move", event.getLocation());

                        if (this.lastMoveState === false && event._stopOverTrigger !== true) {
                            self.onTriggerEvent("over", event.getLocation());
                            event._stopOverTrigger = true;     //버튼이 겹쳐있을경우 제일 위의 버튼만 MouseOver처리를 하고 아래쪽 버튼은 마우스위치가 hitRect에 있더라도 MouseOver처리를 하지않음
                        }

                        this.lastMoveState = true;
                        return self.stopPropagationEvent("move" , event);
                    }
                    else{
                        if (this.lastMoveState === true) {
                            self.onTriggerEvent("normal", event.getLocation());     //마오스 오버에서 -> 노말로
                        }
                        this.lastMoveState = false;
                    }
                    return true;
                },
                onMouseUp: function( event ) {
                    if ((event._stopTrigger !== true || this._touchCaptured) &&
                        self._checkOwnersEvent("up", event.getLocation()))
                    {
                        self.onTriggerEvent("up", event.getLocation());
                        if (this._touchCaptured)
                            self.onTriggerEvent("click", event.getLocation());

                        this._touchCaptured = false;
                        return self.stopPropagationEvent("up", event);
                    }
                    this._touchCaptured = false;
                    return true;
                },

            });
            cc.eventManager.addListener( this._mouseListener , this.getTouchPriority());
            this._mouseListener.setEnabled(isTouchEnabled);
        }
        // else  //else제거
        if( this._touchListener == null) {

            // cc.log("RockN.Component.Touch TouchEvent Listener Created : "+ targetNode.getName());
            var doNotTrigger = this._mouseListener != null;    //이미 마우스 이벤트 가 걸려있는경우 터치이벤트에서는 조건을 만족할때 stopPropgation만  시키고  trigger시키지않는다. (중복 triggering방지)
            this._touchListener = cc.EventListener.create({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                //swallowTouches: true,
                onTouchBegan: function (touch, event) {
                    //cc.log("[onTouchBegan] "+targetNode.getName() +" event._stopTrigger = "+ event._stopTrigger + " this._touchCaptured = " + this._touchCaptured);
                    if (self._checkOwnersEvent("down", touch.getLocation()))
                    {
                        if (!doNotTrigger) {
                            self.onTriggerEvent("down", touch.getLocation());
                        }
                        this._touchCaptured = true;
                        return self.stopPropagationEvent("down", event);
                    }
                    return true;
                },
                onTouchMoved: function (touch, event) {

                    if ((event._stopTrigger !== true || this._touchCaptured) &&
                        self._checkOwnersEvent("move", touch.getLocation())) {

                        if (!doNotTrigger) {
                            self.onTriggerEvent("move", touch.getLocation());
                        }

                        this.lastMoveState = true;
                        return self.stopPropagationEvent("move" , event);
                    }
                    else{
                        if (this.lastMoveState === true) {
                            self.onTriggerEvent("normal", touch.getLocation());     //영역을 벗어나면 마오스 오버에서 -> 노말로
                        }
                        this.lastMoveState = false;
                    }
                    return true;

                },
                onTouchEnded: function (touch, event) {

                    //cc.log("[onTouchEnded] onTouchEnded "+targetNode.getName() +" event._stopTrigger = "+ event._stopTrigger + " this._touchCaptured = " + this._touchCaptured);
                    if ((event._stopTrigger !== true || this._touchCaptured) &&
                        self._checkOwnersEvent("up", touch.getLocation()))
                    {
                        if (!doNotTrigger) {
                            self.onTriggerEvent("up", touch.getLocation());

                            if (this._touchCaptured)
                                self.onTriggerEvent("click", touch.getLocation());
                        }

                        this._touchCaptured = false;
                        return self.stopPropagationEvent("up", event);
                    }
                    else if (this._touchCaptured) {
                        if (!doNotTrigger) {
                            self.onTriggerEvent("up", touch.getLocation());
                        }
                        //event.stopPropagation();
                        this._touchCaptured = false;
                        return self.stopPropagationEvent("up", event);

                    }

                    this._touchCaptured = false;
                    return true;
                },
                onTouchCancelled : function(touch, event) {
                    return this.onTouchEnded(touch, event);
                },

            });


            cc.eventManager.addListener( this._touchListener, this.getTouchPriority());
            this._touchListener.setEnabled(isTouchEnabled);
        }

    },

    //이벤트 리스너 해제
    release: function (){

        this._touchListener && cc.eventManager.removeListener(this._touchListener);
        this._touchListener = null;

        this._mouseListener && cc.eventManager.removeListener(this._mouseListener);
        this._mouseListener = null;
    },

});

