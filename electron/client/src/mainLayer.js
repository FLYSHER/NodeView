//http://cocos.sonarlearning.co.uk/docs/action-animations-aka-easing
//http://cocos2d-x.org/js-tests/
//  Target.runAction(
//                cc.sequence(
//                    cc.delayTime(0.1),
//                    cc.moveTo(0.25, x, y).easing(cc.easeBackOut()),
//                    cc.callFunc(function () {  }
//                    ))
var NodeList = null;
var Target = null;
var TempTargetPos = null;
var TempTargetScale = null;
var TempTargetRot = null;
var TargetRunActionData = null;
var animationSequence = []; // 시퀀서에 등록된 애니메이션을 저장할 배열

var RunAction = function (script) {
    if(Target !== null) {
        if(TargetRunActionData !== null)
            Target.stopAction(TargetRunActionData);

        TempTargetPos = Target.getPosition();
        TempTargetScale = Target.getScale();
        TempTargetRot = Target.getRotation();
        TargetRunActionData = Target.runAction(script);
    }
};

var ResetAction = function () {
    if(Target !== null) {
        if(TargetRunActionData !== null)
            Target.stopAction(TargetRunActionData);

        if(TempTargetPos !== null)
            Target.setPosition(TempTargetPos);

        if(TempTargetScale !== null)
            Target.setScale(TempTargetScale);

        if(TempTargetRot !== null)
            Target.setRotation(TempTargetRot);

        TargetRunActionData = null;
        TempTargetPos = null;
        TempTargetScale = null;
        TempTargetRot = null;
    }
};


var MainLayer = cc.Layer.extend({
    DESC_TAG: 99,
    NODE_MENU_TAG: 100,
    JSON_LIST_MENU_TAG: 101,

    _animationList : null,
    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener( 'loadArmature', function( event ) {
            // cc.log(new Error().stack);
            //cc.log( "JSON.parse( event.getUserData() ", JSON.parse( event.getUserData()));
            self.onLoadArmature( JSON.parse( event.getUserData() ) );
        } );

        this._loadUIListener = cc.eventManager.addCustomListener( 'loadUI', function( event ) {
            self.onLoadUI( event.getUserData() );
        } );

        this._loadCocosStudioListener = cc.eventManager.addCustomListener( 'loadCocosStudio', function (event){
            self.onLoadCocosStuido( event.getUserData() );
        });


        var label = new cc.LabelTTF( "파일을 이쪽으로 드래그해 주세요", "Arial", 30 );
        label.setPosition( this.CX, this.CY );
        this.addChild( label, 0, this.DESC_TAG );

        this._nodeList = {};
        this._nodeOrder = [];

        this._animationList = new UIListViewTest();
        this._animationList.setContentSize(cc.size(150, 200));
        this._animationList.setVisible(false);
        this.addChild(this._animationList,-128);
        this._animationList.setLocalZOrder(100000);


        this._screenSize = new UIScreenCtrl(this.onResize.bind(this));
        this.addChild(this._screenSize,-128);
        this._screenSize.setLocalZOrder(100000);

        this._movementCtrl = new UiPositionCtrl();
        this.addChild(this._movementCtrl,-128);
        this._movementCtrl.setLocalZOrder(100000);

        this._itemList = new UIItemList();
        this.addChild(this._itemList,-128);
        this._itemList.setLocalZOrder(100000);
        this._itemList.setContentSize(cc.size(150, 300));
        this._itemList.setVisible(false);

        this._treeView = new UIScrollTreeViewCtrl();
        this.addChild(this._treeView,-128);
        this._treeView.setLocalZOrder(100000);
        this._treeView.setContentSize(cc.size(300, 500));
        this._treeView.setVisible(false);
        this._treeView.setup();

        // this._btnHideButtons = new ccui.Button();
        // this._btnHideButtons.setName("btnHideButtons");
        // this._btnHideButtons.titleFontSize = 16;
        // this._btnHideButtons.setTouchEnabled(true);
        // this._btnHideButtons.addTouchEventListener(this.onHideButtonsTouch.bind(this), this);
        // this._btnHideButtons.setTitleText("HIDE ALL BUTTONS");
        // this.addChild(this._btnHideButtons,200000);

        NodeList = this._nodeList;

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );

        // --- [추가된 코드] 시퀀서 버튼 이벤트 리스너 초기화 ---
        this.initSequencerButtons();
        // 탭 리사이저 추가
        this.initTabResizers();

        return true;
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this._animationList.setPosition(0, size.height - this._animationList.getContentSize().height);
        this._itemList.setPosition(size.width - this._itemList.getContentSize().width , size.height - (this._itemList.getContentSize().height + 60));
        this._screenSize.setPosition(size.width - this._screenSize.getContentSize().width , size.height - this._screenSize.getContentSize().height);
        this._movementCtrl.setPosition(100, 0);
        // this._btnHideButtons.setPosition( cc.winSize.width - 100, 30 );

        this._treeView.setPosition(0, size.height - this._treeView.getContentSize().height);

        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.setPosition( self.CX, self.CY );
            }
        } );
    },
    /*
    -리소스 컨트롤 방식 (기존거 잊어버리고)
     AR : anchor 는 만지지않는다. (Tool에서 컨트롤)
          position으로 배치를 한다.

     UI : anchor를  0.5 ,0.5 로 배치를 하고
          position 를 AR와 같이간다.

     */
    onLoadArmature: function( ids )  {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        cc.each( ids, function( name, index ) {
            if(this._nodeList[ name ])
                return;

            var armature = new ccs.Armature( name );

            var node = new DraggableNode( armature.getContentSize() );
            //node.setAnchorPoint( 0.5, 0.5 );
            node.setPosition( this.CX - armature.getContentSize().width * 0.5 , this.CY - armature.getContentSize().height * 0.5 );

            // addChild 순서 중요!
            // armature가 draggableNode에 addChild되면 contentSize가 바뀜
            this.addChild( node );
            node.addChildToCenter( armature );
            node.armature = armature;
            node.ui = null;
            node.order = this._nodeOrder.length;
            node.setLocalZOrder(10 + node.order);
            this._nodeOrder[node.order] = node;
            this._nodeList[ name ] = node;
            cc.log("[CHECK] zOrder :", node.getLocalZOrder());
            this._addToJsonListMenu( name , node );
            //this.updateMenu( name );
        }, this );
    },

    onLoadUI: function( url ) {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ])
            return;
        var json = ccs.load( url );
        var ui = json.node;

        var node = new DraggableNode( ui.getContentSize() );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );

        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );

        node.armature = null;
        node.ui = ui;

        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;

        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    onLoadCocosStuido : function( url ) {
        var children = this.getChildren();

        var self = this;
        children.forEach( function( c ) {
            if( c.getTag() === self.DESC_TAG ) {
                c.removeFromParent();
            }
        } );

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ])
            return;
        var json = ccs.load( url );
        var ui = json.node;

        var size = ui.getContentSize();
        if(size.width < 0.01 || size.height < 0.01){
            size = ui.getBoundingBoxToWorld();
        }

        var node = new DraggableNode( size );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );

        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );

        node.armature = null;
        node.ui = ui;
        node.cocosAction = json.action;
        if(node.cocosAction){
            node.runAction(node.cocosAction); //타임라인 액션을 적용한 객체 붙임
        }

        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;

        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    reOrderup : function (nodeName, orderPlus) {
        nodeName = this._itemList.getSelectedName();

        var node = this._nodeList[ nodeName ];
        if(!node)
            return;

        var index = node.order;
        var changeIndex =index
        if(orderPlus)  {
            changeIndex =index + 1;
        }
        else {
            changeIndex =index - 1;
        }

        if(changeIndex >=0 && changeIndex  < this._nodeOrder.length) {
            var changeNode = this._nodeOrder[changeIndex];
            var temp =   changeNode.order;
            changeNode.order = node.order;
            node.order = temp;

            this._nodeOrder[changeNode.order] = changeNode;
            this._nodeOrder[node.order] = node;
            changeNode.setLocalZOrder(10 + changeNode.order);
            node.setLocalZOrder(10 + node.order);
        }
        cc.log("[REORDER] : ",index, " <=> ", changeIndex, " [ " +  node.order);
    },

    _addToJsonListMenu: function( name , node )  {
        this._itemList.add(name, node,
            function ( type ) {
                switch(type){
                    case ItemListClickType.SELECT:
                        this.updateMenu( name );
                        break;
                    case ItemListClickType.DELETE:
                        this.deleteItem( name);
                        break;
                    case ItemListClickType.UP:
                        this.reOrderup( name , true);
                        break;
                    case ItemListClickType.DOWN:
                        this.reOrderup( name , false);
                        break;

                }
            }.bind(this));

        // this.setDraggableItem( name );
    },

    updateMenu: function( name, finalNode ) {
        var selectNode = this._nodeList[ name ];
        toggleJSONUI(name.indexOf('(JSON)') !== -1  );
        if( !selectNode ) return;

        selectNode.setName(name);
        if( selectNode.armature) {
            this._animationList.setVisible(true);
            var animations =  selectNode.armature.getAnimation();
            var animNameArr = animations._animationData.movementNames;

            var playCb = function ( animName) {
                animations.play(animName);
            };
            this._animationList.init(animNameArr,playCb);

            $('#LocalSize').html("(" + selectNode.armature.getContentSize().width.toFixed(2) + " , " +selectNode.armature.getContentSize().height.toFixed(2) + ")");
        }
        else{
            this._animationList.setVisible(false);
            this._animationList.init([],null);
        }

        this._movementCtrl.init(selectNode);
        this._treeView.setNode(selectNode, finalNode);

        this.setDraggableItem( name );
    },

    deleteItem : function ( name) {
        var selectNode = this._nodeList[ name ];
        if(selectNode) {
            if(Target === selectNode)
                Target = null;
            var order = selectNode.order;
            selectNode.removeFromParent();
            this._animationList.setVisible(false);
            this._animationList.init([],null);

            delete this._nodeList[ name ];
            this._movementCtrl.init(null);
            for(var n = order; n < this._nodeOrder.length - 1; n++) {
                this._nodeOrder[n + 1].order =n;
                this._nodeOrder[n] = this._nodeOrder[n + 1];
                this._nodeOrder[n].setLocalZOrder(1000 - this._nodeOrder[n].order);
            }
            this._nodeOrder.pop();
            this._treeView.setNode(null);
        }

    },

    setDraggableItem: function( name ) {
        for( var nodeName in this._nodeList ) {
            if( typeof this._nodeList[ nodeName ].setDraggable === 'function' ) {
                this._nodeList[ nodeName ].setDraggable( false );
                if(Target ===  this._nodeList[ nodeName ])
                    Target = null;
            }
        }
        if( this._nodeList.hasOwnProperty( name ) ) {
            this._nodeList[ name ].setDraggable( true );
            Target = this._nodeList[ name ];
        }
    },

    onHideButtonsTouch: function( sender, type ) {
        switch( type ) {
            case ccui.Widget.TOUCH_ENDED:
            {
                if( this._screenSize.visible ) {
                    this._screenSize.visible = false;
                    this._prevAnimationListVisble = this._animationList.visible;
                    this._prevItemListVisble = this._itemList.visible;
                    this._prevMovementCtrlVisble = this._movementCtrl.visible;
                    this._prevTreeViewVisible = this._treeView.visible;

                    this._animationList.visible = false;
                    this._itemList.visible = false;
                    this._movementCtrl.visible = false;
                    this._treeView.visible = false;
                    //   this._btnHideButtons.setTitleText("SHOW ALL BUTTONS");
                } else {
                    this._screenSize.visible = true;
                    this._animationList.visible = this._prevAnimationListVisble;
                    this._itemList.visible = this._prevItemListVisble;
                    this._movementCtrl.visible = this._prevMovementCtrlVisble;
                    this._treeView.visible = this._prevTreeViewVisible;
                    //   this._btnHideButtons.setTitleText("HIDE ALL BUTTONS");
                }
                break;
            }
        }
    },

    // --- [추가된 코드] 시퀀서 관련 메서드들 ---

    initTabResizers : function (){
        const resizers = document.querySelectorAll('.horizontal-resizer');

        resizers.forEach(resizer => {
            resizer.addEventListener('mousedown', function (e) {
                // Get the previous sibling element (the container to resize)
                const prevSibling = resizer.previousElementSibling;
                if (!prevSibling) return;

                // Find the content area within the container that should be resized.
                const contentElement = prevSibling.querySelector('.smallWidget, .treeWidget, .actionWidget, .tab-propertiesContent');
                if(!contentElement) return;

                // Get the initial mouse position and the element's height
                let y = e.clientY;
                let h = contentElement.offsetHeight;

                // Define the mouse move handler
                const mouseMoveHandler = function (e) {
                    // How far the mouse has been moved
                    const dy = e.clientY - y;

                    // Adjust the dimension of the content element
                    contentElement.style.height = `${h + dy}px`;
                };

                // Define the mouse up handler
                const mouseUpHandler = function () {
                    // Remove the handlers
                    document.removeEventListener('mousemove', mouseMoveHandler);
                    document.removeEventListener('mouseup', mouseUpHandler);
                };

                // Attach the handlers
                document.addEventListener('mousemove', mouseMoveHandler);
                document.addEventListener('mouseup', mouseUpHandler);
            });
        });
    },

    /**
     * 노드와 애니메이션 이름을 받아 해당 애니메이션의 길이를 초(second) 단위로 반환합니다.
     * Armature와 UI Action(Cocos Timeline)을 모두 지원합니다.
     * @param {cc.Node} node - 길이를 확인할 애니메이션을 포함하고 있는 노드.
     * @param {string} animName - 길이를 확인할 애니메이션의 이름.
     * @returns {number} - 애니메이션의 길이 (초 단위). 애니메이션을 찾지 못하면 0을 반환합니다.
     */
    getAnimationLength: function(node, animName) {
        if (!node || !animName) {
            return 0;
        }

        var durationInSeconds = 0;

        // Case 1: Armature 애니메이션 (기존 유지)
        if (node.armature) {
            try {
                var animation = node.armature.getAnimation();
                var movementData = animation._animationData.movementDataDic[animName];
                if (movementData && movementData.duration) {
                    var durationInFrames = movementData.duration;
                    var speedScale = movementData.scale || 1;
                    var actualFrames = durationInFrames / speedScale;
                    durationInSeconds = actualFrames / 60.0;
                }
            } catch (e) {
                console.error("Armature 길이를 가져오는 중 오류:", e);
            }
        }
        // Case 2: UI Action (상세 디버깅 로그 추가)
        else {
            console.log("[UIAction DURATION] ----------- START DEBUG for Node: '" + node.getName() + "', Anim: '" + animName + "' -----------");
            durationInSeconds = 0; // 기본값을 0으로 명확히 설정
            try {
                var rawJsonData = null;
                var fileName = node.getName();
                console.log("[UIAction DURATION] 1. Extracted fileName: '" + fileName + "'");

                var url = Loader.cocosStudioURL[fileName] || Loader.uiURL[fileName];
                console.log("[UIAction DURATION] 2. URL from Loader.cocosStudioURL or Loader.uiURL: '" + url + "'");

                if (url && cc.loader.cache[url]) {
                    console.log("[UIAction DURATION] 3. Found URL in cc.loader.cache. Data type: " + typeof cc.loader.cache[url]);
                    if (typeof cc.loader.cache[url] === 'string') {
                        try {
                            rawJsonData = JSON.parse(cc.loader.cache[url]);
                            console.log("[UIAction DURATION] 4a. Successfully parsed JSON string from cache.");
                        } catch (parseError) {
                            console.error("[UIAction DURATION] 4b. Error parsing JSON string from cache:", parseError, "Raw string:", cc.loader.cache[url].substring(0, 200) + "..."); // 문자열 일부만 출력
                        }
                    } else {
                        rawJsonData = cc.loader.cache[url];
                        console.log("[UIAction DURATION] 4a. Used object directly from cache.");
                    }
                } else {
                    console.log("[UIAction DURATION] 3. URL not found in Loader caches OR URL not present in cc.loader.cache.");
                }

                if (!rawJsonData && node.cocosAction) {
                    console.log("[UIAction DURATION] 5. rawJsonData not found from cache, attempting to use node.cocosAction as rawJsonData.");
                    // node.cocosAction이 실제 JSON 구조를 가지고 있는지 확인 (구버전 엔진의 특정 상황)
                    if (node.cocosAction.animation && node.cocosAction.animation.actionlist){
                        rawJsonData = node.cocosAction;
                        console.log("[UIAction DURATION] 5a. Used node.cocosAction as rawJsonData.");
                    } else {
                        console.log("[UIAction DURATION] 5b. node.cocosAction does not have the expected .animation.actionlist structure. node.cocosAction:", node.cocosAction);
                    }
                }

                if (rawJsonData) {
                    console.log("[UIAction DURATION] 6. Processing rawJsonData. Checking for .animation.actionlist property.");
                    if (rawJsonData.animation && rawJsonData.animation.actionlist) {
                        console.log("[UIAction DURATION] 7. rawJsonData.animation.actionlist found. Length: " + rawJsonData.animation.actionlist.length);
                        var actionClipData = null;
                        for (var i = 0; i < rawJsonData.animation.actionlist.length; i++) {
                            if (rawJsonData.animation.actionlist[i].name === animName) {
                                actionClipData = rawJsonData.animation.actionlist[i];
                                console.log("[UIAction DURATION] 8. Found actionClipData for '" + animName + "':", actionClipData);
                                break;
                            }
                        }

                        if (actionClipData) {
                            var unitTime = actionClipData.unittime;
                            console.log("[UIAction DURATION] 9. unitTime from actionClipData: " + unitTime);

                            if (typeof unitTime !== 'number' || unitTime <= 0) {
                                console.log("[UIAction DURATION] 10. unitTime is invalid or missing ('" + unitTime + "'). Defaulting to 1/60.");
                                unitTime = 1 / 60;
                            }

                            var maxFrameId = 0;
                            if (actionClipData.actionnodelist) {
                                console.log("[UIAction DURATION] 11. Processing actionClipData.actionnodelist. Length: " + actionClipData.actionnodelist.length);
                                actionClipData.actionnodelist.forEach(function(actionNodeInClip) {
                                    if (actionNodeInClip.actionframelist) {
                                        actionNodeInClip.actionframelist.forEach(function(frame) {
                                            if (frame.frameid > maxFrameId) {
                                                maxFrameId = frame.frameid;
                                            }
                                        });
                                    }
                                });
                                console.log("[UIAction DURATION] 12. Calculated maxFrameId: " + maxFrameId);
                            } else {
                                console.log("[UIAction DURATION] 11. actionClipData.actionnodelist is missing or empty.");
                            }
                            durationInSeconds = maxFrameId * unitTime;
                            console.log("[UIAction DURATION] 13. Calculated durationInSeconds: " + durationInSeconds);
                        } else {
                            console.log("[UIAction DURATION] 8. UIAction('" + animName + "') 클립 데이터를 JSON 구조에서 찾지 못했습니다.");
                        }
                    } else {
                        console.log("[UIAction DURATION] 7. rawJsonData.animation.actionlist 구조를 찾을 수 없습니다. rawJsonData:", rawJsonData);
                    }
                } else {
                    console.log("[UIAction DURATION] 6. UIAction('" + animName + "')을 위한 rawJsonData를 최종적으로 찾을 수 없습니다. Node:", node.getName());
                }
            } catch (e) {
                console.error("[UIAction DURATION] 길이를 가져오는 중 최상위 오류 발생:", e);
                durationInSeconds = 0; // 오류 발생 시 0으로 확실히 설정
            }
            console.log("[UIAction DURATION] ----------- END DEBUG for Node: '" + node.getName() + "', Anim: '" + animName + "'. Final Duration: " + durationInSeconds + " -----------");
        }

        return Math.max(0, durationInSeconds);
    },

    initSequencerButtons: function() {
        // 시퀀서의 기본 버튼들에 대한 클릭 이벤트 리스너를 설정합니다.
        // .bind(this)를 사용하여 콜백 함수 내의 'this'가 MainLayer 인스턴스를 가리키도록 합니다.
        $('#addSequenceBtn').on('click', this.onAddToSequence.bind(this));
        $('#playSequenceBtn').on('click', this.onPlaySequence.bind(this));
        $('#clearSequenceBtn').on('click', this.onClearSequence.bind(this));

        // 더미 딜레이 아이템 추가 버튼에 대한 클릭 이벤트 리스너를 설정합니다.
        $('#addDummyBtn').on('click', this.onAddDummyDelay.bind(this));

        // '#sequencerTree' 컨테이너에 이벤트 위임을 사용하여, 동적으로 생성되는
        // '.delay-input' 요소들의 'change' 또는 'keyup' 이벤트를 처리합니다.
        // 사용자가 직접 타이핑하여 딜레이 값을 수정하면 이 리스너가 동작합니다.
        $('#sequencerTree').on('change keyup', '.delay-input', function(event) {
            // 이벤트가 발생한 요소에서 'data-index' 속성 값을 가져와 시퀀스 배열의 인덱스로 사용합니다.
            var index = $(event.currentTarget).data('index');
            // 입력된 값을 부동소수점 숫자로 변환합니다.
            var newDuration = parseFloat($(event.currentTarget).val());

            // animationSequence 배열과 해당 인덱스의 아이템이 유효한지,
            // 그리고 변환된 newDuration 값이 유효한 숫자인지 확인합니다.
            if (animationSequence && animationSequence[index] && !isNaN(newDuration) && newDuration >= 0) {
                // 유효한 경우, 해당 시퀀스 아이템의 duration 값을 업데이트합니다.
                animationSequence[index].duration = newDuration;
            }
        });

        // '#sequencerTree' 컨테이너에 이벤트 위임을 사용하여, 동적으로 생성되는
        // '.playback-mode-select' 요소들의 'change' 이벤트를 처리합니다.
        $('#sequencerTree').on('change', '.playback-mode-select', function(event) {
            // 이벤트가 발생한 요소에서 'data-index' 속성 값을 가져옵니다.
            var index = $(event.currentTarget).data('index');

            // animationSequence 배열과 해당 인덱스의 아이템이 유효한지 확인합니다.
            if (animationSequence && animationSequence[index]) {
                // 해당 시퀀스 아이템의 playbackMode 값을 선택된 값으로 업데이트합니다.
                animationSequence[index].playbackMode = $(event.currentTarget).val();
            }
        });
    },

    onAddDummyDelay: function() {
        animationSequence.push({
            targetNode: null,
            animName: 'Dummy Delay',
            type: 'dummy',
            duration: 1.0, // 기본 1초
            playbackMode: 'sequence'
        });
        this.updateSequencerUI();
    },

    onAddToSequence: function() {
        if (!Target) {
            alert("먼저 캔버스에서 노드를 선택하세요.");
            return;
        }

        var selectedAnimName = null;
        var animType = null;

        if (this._animationList.isVisible() && typeof this._animationList.getSelectedAnimationName === 'function') {
            selectedAnimName = this._animationList.getSelectedAnimationName();
            if (selectedAnimName) {
                animType = 'armature';
            }
        }

        if (!selectedAnimName) {
            var actionTreeInstance = $('#actionTree').jstree(true);
            var selectedActionIds = actionTreeInstance.get_selected();
            if (selectedActionIds && selectedActionIds.length > 0) {
                var selectedNode = actionTreeInstance.get_node(selectedActionIds[0]);
                selectedAnimName = selectedNode.text;
                animType = 'action';
            }
        }

        if (selectedAnimName && animType) {
            // [수정] getAnimationLength가 숫자(길이)만 반환합니다.
            var duration = this.getAnimationLength(Target, selectedAnimName);

            animationSequence.push({
                targetNode: Target,
                animName: selectedAnimName,
                type: animType,
                duration: duration, // isLoopAnimation 속성 제거
                playbackMode: 'sequence'
            });

            this.updateSequencerUI();
            console.log("'" + selectedAnimName + "' (길이: " + duration.toFixed(2) + "초)가 시퀀스에 추가되었습니다.");
        } else {
            alert("추가할 애니메이션이 선택되지 않았습니다.");
        }
    },

    onPlaySequence: function() {
        if (animationSequence.length === 0) {
            alert("시퀀스가 비어있습니다.");
            return;
        }

        var groups = [];
        if (animationSequence.length > 0) {
            var currentGroup = [];
            animationSequence.forEach(function(item) {
                if (item.playbackMode === 'sequence' && currentGroup.length > 0) {
                    groups.push(currentGroup);
                    currentGroup = [];
                }
                currentGroup.push(item);
            });
            groups.push(currentGroup);
        }

        var finalActionSequence = [];

        groups.forEach(function(group) {
            var spawnActions = [];
            var maxDurationInGroup = 0;
            var loopingItemsInThisGroup = []; // 이름으로 루프 판단하여 추가

            group.forEach(function(item) {
                if (item.type !== 'dummy') {
                    // [수정] 이름으로 루프 여부 판단
                    var isActuallyLoop = item.animName && item.animName.toLowerCase().endsWith("loop");

                    var playAction = cc.callFunc(function() {
                        var target = item.targetNode;
                        var animName = item.animName;

                        if (!target) {
                            console.error("재생 대상 노드가 없습니다:", item);
                            return;
                        }

                        if (item.type === 'armature' && target.armature) {
                            var animation = target.armature.getAnimation();
                            if (isActuallyLoop) { // 이름으로 판단한 결과 사용
                                animation.play(animName, -1, -1);
                            } else {
                                animation.play(animName, -1, 0);
                            }
                        } else if (item.type === 'action') {
                            if (target.cocosAction) {
                                target.cocosAction.play(animName, isActuallyLoop); // 이름으로 판단한 결과 사용
                            } else {
                                var jsonName = target.getName() + '.ExportJson';
                                // actionManager는 isActuallyLoop로 직접 제어 불가, JSON 내부 loop 속성 따름
                                ccs.actionManager.playActionByName(jsonName, animName);
                            }
                        }
                    });
                    spawnActions.push(playAction);

                    if (isActuallyLoop) { // 이름으로 루프 판단하여 추가
                        loopingItemsInThisGroup.push(item);
                    }
                }

                if (item.duration > maxDurationInGroup) {
                    maxDurationInGroup = item.duration;
                }
            });

            if (spawnActions.length > 0) {
                var spawn = cc.spawn(spawnActions);
                finalActionSequence.push(spawn);
            }

            var delay = cc.delayTime(Math.max(0, maxDurationInGroup));
            finalActionSequence.push(delay);

            if (loopingItemsInThisGroup.length > 0) {
                var stopLoopingItemsAction = cc.callFunc(function() {
                    loopingItemsInThisGroup.forEach(function(loopItem) {
                        var target = loopItem.targetNode;
                        if (!target) return;

                        if (loopItem.type === 'armature' && target.armature) {
                            var animation = target.armature.getAnimation();
                            if (animation.getCurrentMovementID() === loopItem.animName && animation.isPlaying()) {
                                animation.stop(); // 단순 stop으로 변경
                            }
                        } else if (loopItem.type === 'action') {
                            if (target.cocosAction) {
                                var actionTimelineToStop = target.cocosAction;
                                if (!actionTimelineToStop) {
                                    var fileName = target.getName();
                                    var url = Loader.cocosStudioURL[fileName] || Loader.uiURL[fileName];
                                    if (url) {
                                        actionTimelineToStop = ccs.load(url).action;
                                    }
                                }
                                // 이름으로 루프 판단했으므로, 정지 시에도 이름으로 처리된 루프를 정지
                                if (actionTimelineToStop && actionTimelineToStop.getAnimationInfo && actionTimelineToStop.getAnimationInfo(loopItem.animName)) {
                                    actionTimelineToStop.play(loopItem.animName, false); // loop 없이 재생하여 정지 효과
                                }
                            }
                        }
                    });
                });
                finalActionSequence.push(stopLoopingItemsAction);
            }
        });

        if (finalActionSequence.length > 0) {
            var runnerNode = this.getChildByTag(999);
            if (!runnerNode) {
                runnerNode = new cc.Node();
                runnerNode.setTag(999);
                this.addChild(runnerNode);
            }
            runnerNode.stopAllActions();

            var finalSequence = cc.sequence(finalActionSequence);
            runnerNode.runAction(finalSequence);
        }
    },

    onClearSequence: function() {
        animationSequence = [];
        this.updateSequencerUI();
        console.log("시퀀스가 초기화되었습니다.");
    },

    updateSequencerUI: function() {
        var sequencerTreeDiv = $('#sequencerTree');
        sequencerTreeDiv.empty();

        animationSequence.forEach(function(item, index) {
            var typeText, typeClass, displayText;
            var loopPrefix = ""; // 루프 접두사 초기화

            // [수정] 이름으로 루프 여부 판단하여 루프 접두사 설정
            if (item.type !== 'dummy' && item.animName && item.animName.toLowerCase().endsWith("loop")) {
                loopPrefix = "🔄 "; // 반복 애니메이션일 경우 접두사 추가
            }

            if (item.type === 'dummy') {
                typeText = 'DLY';
                typeClass = 'type-dummy';
                displayText = item.animName; // 더미는 루프 접두사 없음
            } else {
                typeText = item.type === 'armature' ? 'AR' : 'UI';
                typeClass = item.type === 'armature' ? 'type-armature' : 'type-action';
                // displayText에 루프 접두사 추가
                displayText = loopPrefix + (item.targetNode ? item.targetNode.getName() : "[알수없는 노드]") + " - " + item.animName;
            }

            var currentDuration = typeof item.duration === 'number' ? item.duration : 0;
            var durationValue = currentDuration.toFixed(2);

            var itemHtml = `
            <div class="sequencer-item">
                <span class="anim-type-tag ${typeClass}">${typeText}</span>
                <span class="sequencer-text" title="${displayText}">${displayText}</span>
                <input type="number" class="delay-input" value="${durationValue}" step="0.1" data-index="${index}">
                <select class="playback-mode-select" data-index="${index}">
                    <option value="sequence" ${item.playbackMode === 'sequence' ? 'selected' : ''}>순차</option>
                    <option value="simultaneous" ${item.playbackMode === 'simultaneous' ? 'selected' : ''}>동시</option>
                </select>
            </div>
        `;
            sequencerTreeDiv.append(itemHtml);
        });
    },

    // --- [여기까지 추가된 코드] ---

    onExit: function() {
        // jQuery 이벤트 정리
        $(document).off('.sequencer'); // 네임스페이스 사용했다면
        $('#sequencerTree').off();
        $('#addSequenceBtn, #playSequenceBtn, #clearSequenceBtn, #addDummyBtn').off();

        // 전역 변수 정리
        Target = null;
        NodeList = null;
        TempTargetPos = null;
        TempTargetScale = null;
        TempTargetRot = null;
        animationSequence.length = 0;

        // 기존 코드
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        cc.eventManager.removeListener(this._loadCocosStudioListener);
        this._super();
    }
});



var ManiLayerScene = cc.Scene.extend({
    onEnter:function () {
        this._super();

        /**
         * Init loader
         */
        Loader.init();

        if (typeof ElectronRenderer != 'undefined')
            ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild( layer, 1, "MainLayer" );

        var self = this;
        cc.eventManager.addListener( {
            event: cc.EventListener.MOUSE,
            onMouseDown: function( event ) {
                var nodeObj = self.getFrontTouchedNode( event.getLocation() );
                if( nodeObj.node ) {
                    layer.updateMenu( nodeObj.nodeName, nodeObj.finalNode );
                    setTimeout(function(){
                        $('#fileNameTree').jstree("deselect_all");
                        $('#fileNameTree').jstree('select_node',nodeObj.node.__instanceId);
                    },100);
                }
            },
            swallowTouches: false
        }, this );
    },

    getFrontTouchedNode: function( touchPos ) {
        var maxZOrderList = [];
        var frontNode = null;
        var frontNodeName = '';
        var zOrderList = [];
        var node = null;

        var updateData = function( zOrderList, node, name ) {
            maxZOrderList = zOrderList;
            frontNode = node;
            frontNodeName = name;
        };

        for( var name in NodeList ) {
            if( NodeList.hasOwnProperty( name ) ) {
                node = NodeList[ name ];
                var isOver = cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPos);
                if( !isOver ) {
                    continue;
                }

                zOrderList = this.getZOrderList( node );
                if( maxZOrderList.length > 0 ) {
                    var determined = false;
                    for( var i = 0; i < zOrderList.length && i < maxZOrderList.length; i++ ) {
                        if( zOrderList[ i ] > maxZOrderList[ i ] ) {
                            updateData( zOrderList, node, name );

                            determined = true;
                            break;
                        } else if( zOrderList[ i ] < maxZOrderList[ i ] ) {
                            determined = true;
                            break;
                        }
                    }

                    if( !determined && zOrderList.length > maxZOrderList.length ) {
                        updateData( zOrderList, node, name );
                    }
                } else {
                    updateData( zOrderList, node, name );
                }
            }
        }
        var finalNode = this.recursiveCheckNode(frontNode, touchPos);
        return {
            node: frontNode,
            nodeName: frontNodeName,
            finalNode : finalNode
        };
    },

    recursiveCheckNode: function(node, touchpos){
        var flag = false;

        if(!node || !node.children) return node;

        for (var idx = 0; idx < node.children.length; idx++) {
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return this.recursiveCheckNode(node.children[idx], touchpos);
            }
        }

        if (flag === false) {
            return node;
        }

    },

    getZOrderList: function( node ) {
        var zOrderList = [];
        for( let p = node; !!p; p = p.getParent() ) {
            zOrderList.unshift( p.zIndex );
        }
        return zOrderList;
    },

    onExit: function() {
        ScreenUtil.removeAllResizeListener();

        this._super();
    }
});