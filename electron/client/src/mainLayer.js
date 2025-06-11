var NodeList = null;
var Target = null;
var TempTargetPos = null;
var TempTargetScale = null;
var TempTargetRot = null;
var TargetRunActionData = null;

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
    _animationList : null,
    _canvasResizeListener: null, // 리스너 참조를 저장할 변수

    ctor: function () {
        this._super();

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;
        this._nodeProperties = {};

        var self = this;
        this._loadArmatureListener = cc.eventManager.addCustomListener('loadArmature', function(event) { self.onLoadArmature(JSON.parse(event.getUserData())); });
        this._loadUIListener = cc.eventManager.addCustomListener('loadUI', function(event) { self.onLoadUI(event.getUserData()); });
        this._loadCocosStudioListener = cc.eventManager.addCustomListener('loadCocosStudio', function (event){ self.onLoadCocosStuido(event.getUserData()); });

        this._canvasResizeListener = cc.eventManager.addCustomListener('canvas-resize', this.updateLayout.bind(this));

        var label = new cc.LabelTTF("파일을 이쪽으로 드래그해 주세요", "Arial", 30);
        label.setPosition(this.CX, this.CY);
        this.addChild(label, 0, this.DESC_TAG);

        this._nodeList = {};
        this._nodeOrder = [];
        this._animationList = new UIListViewTest();
        this._movementCtrl = new UiPositionCtrl();
        this._itemList = new UIItemList();
        this._treeView = new UIScrollTreeViewCtrl();
        this._treeView.setup();
        NodeList = this._nodeList;
        Sequencer.initialize(this);
        return true;
    },

    // 캔버스 크기가 변경될 때 호출될 레이아웃 업데이트 메서드
    updateLayout: function() {
        // 변경 전의 중심 좌표를 기록합니다.
        const oldCX = this.CX;
        const oldCY = this.CY;

        // 캔버스 크기 변경에 따라 새로운 중심 좌표를 계산합니다.
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        // "파일을 드래그 해주세요" 라벨 위치를 업데이트합니다.
        var label = this.getChildByTag(this.DESC_TAG);
        if (label) {
            label.setPosition(this.CX, this.CY);
        }

        // 기존에 있던 모든 노드들의 위치를 새로운 중심점에 맞춰 보정합니다.
        if (oldCX && oldCY && this._nodeList) { // oldCX, oldCY가 유효한 경우에만 실행
            for (const name in this._nodeList) {
                if (this._nodeList.hasOwnProperty(name)) {
                    const node = this._nodeList[name];
                    const currentPos = node.getPosition();

                    // 이전 중심점으로부터의 상대적 위치를 계산합니다.
                    const relativeX = currentPos.x - oldCX;
                    const relativeY = currentPos.y - oldCY;

                    // 새로운 중심점에 상대적 위치를 더해 최종 위치를 계산합니다.
                    const newX = this.CX + relativeX;
                    const newY = this.CY + relativeY;

                    node.setPosition(newX, newY);
                }
            }
        }
    },

    // ... (onLoadArmature, onLoadUI 등 나머지 메서드는 그대로 유지) ...
    onLoadArmature: function( ids )  {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        cc.each( ids, function( name, index ) {
            if(this._nodeList[ name ]) return;
            var armature = new ccs.Armature( name );
            var node = new DraggableNode( armature.getContentSize() );
            node.setPosition( this.CX - armature.getContentSize().width * 0.5 , this.CY - armature.getContentSize().height * 0.5 );
            this.addChild( node );
            node.addChildToCenter( armature );
            node.armature = armature;
            node.ui = null;
            node.order = this._nodeOrder.length;
            node.setLocalZOrder(10 + node.order);
            this._nodeOrder[node.order] = node;
            this._nodeList[ name ] = node;
            this._addToJsonListMenu( name , node );
        }, this );
    },

    onLoadUI: function( url ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ]) return;
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
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( url );
        if(this._nodeList[ name ]) return;
        var json = ccs.load( url );
        var ui = json.node;
        var size = ui.getContentSize();
        if(size.width < 0.01 || size.height < 0.01){ size = ui.getBoundingBoxToWorld(); }
        var node = new DraggableNode( size );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );
        ui.setAnchorPoint( 0.5, 0.5 );
        node.addChildToCenter( ui );
        node.armature = null;
        node.ui = ui;
        node.cocosAction = json.action;
        if(node.cocosAction){ node.runAction(node.cocosAction); }
        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;
        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    reOrderup : function (nodeName, orderPlus) {
        nodeName = this._itemList.getSelectedName();
        var node = this._nodeList[ nodeName ];
        if(!node) return;
        var index = node.order;
        var changeIndex = orderPlus ? index + 1 : index - 1;
        if(changeIndex >=0 && changeIndex  < this._nodeOrder.length) {
            var changeNode = this._nodeOrder[changeIndex];
            var temp = changeNode.order;
            changeNode.order = node.order;
            node.order = temp;
            this._nodeOrder[changeNode.order] = changeNode;
            this._nodeOrder[node.order] = node;
            changeNode.setLocalZOrder(10 + changeNode.order);
            node.setLocalZOrder(10 + node.order);
        }
    },

    _addToJsonListMenu: function( name , node )  {
        this._itemList.add(name, node,
            function ( type ) {
                switch(type){
                    case ItemListClickType.SELECT: this.updateMenu( name ); break;
                    case ItemListClickType.DELETE: this.deleteItem( name); break;
                    case ItemListClickType.UP: this.reOrderup( name , true); break;
                    case ItemListClickType.DOWN: this.reOrderup( name , false); break;
                }
            }.bind(this));
    },

    updateMenu: function( name, finalNode ) {
        var selectNode = this._nodeList[ name ];
        toggleJSONUI(name.indexOf('(JSON)') !== -1);
        if( !selectNode ) return;

        selectNode.setName(name);
        if( selectNode.armature) {
            var animations =  selectNode.armature.getAnimation();
            var animNameArr = animations._animationData.movementNames;
            var playCb = function (animName) { animations.play(animName); };
            this._animationList.init(animNameArr,playCb);
            $('#LocalSize').html("(" + selectNode.armature.getContentSize().width.toFixed(2) + " , " +selectNode.armature.getContentSize().height.toFixed(2) + ")");
        } else{
            this._animationList.init([],null);
        }
        this._movementCtrl.init(selectNode);
        this._treeView.setNode(selectNode, finalNode);
        this.setDraggableItem( name );
    },

    deleteItem : function ( name) {
        var selectNode = this._nodeList[ name ];
        if(selectNode) {
            if(Target === selectNode) Target = null;
            var order = selectNode.order;
            selectNode.removeFromParent();
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
                if(Target ===  this._nodeList[ nodeName ]) Target = null;
            }
        }
        if( this._nodeList.hasOwnProperty( name ) ) {
            this._nodeList[ name ].setDraggable( true );
            Target = this._nodeList[ name ];
        }
    },

    getAnimationLength: function(node, animName) {
        if (!node || !animName) return 0;
        var durationInSeconds = 0;
        if (node.armature) {
            try {
                var animation = node.armature.getAnimation();
                var movementData = animation._animationData.movementDataDic[animName];
                if (movementData && movementData.duration) {
                    var durationInFrames = movementData.duration;
                    var speedScale = movementData.scale || 1;
                    durationInSeconds = (durationInFrames / speedScale) / 60.0;
                }
            } catch (e) { console.error("Armature 길이를 가져오는 중 오류:", e); }
        } else {
            try {
                var rawJsonData = null;
                var fileName = node.getName();
                var url = Loader.cocosStudioURL[fileName] || Loader.uiURL[fileName];
                if (url && cc.loader.cache[url]) {
                    rawJsonData = (typeof cc.loader.cache[url] === 'string') ? JSON.parse(cc.loader.cache[url]) : cc.loader.cache[url];
                }
                if (!rawJsonData && node.cocosAction && node.cocosAction.animation && node.cocosAction.animation.actionlist){
                    rawJsonData = node.cocosAction;
                }
                if (rawJsonData && rawJsonData.animation && rawJsonData.animation.actionlist) {
                    var actionClipData = rawJsonData.animation.actionlist.find(clip => clip.name === animName);
                    if (actionClipData) {
                        var unitTime = (typeof actionClipData.unittime === 'number' && actionClipData.unittime > 0) ? actionClipData.unittime : (1 / 60);
                        var maxFrameId = 0;
                        if (actionClipData.actionnodelist) {
                            actionClipData.actionnodelist.forEach(function(actionNodeInClip) {
                                if (actionNodeInClip.actionframelist) {
                                    actionNodeInClip.actionframelist.forEach(function(frame) {
                                        if (frame.frameid > maxFrameId) maxFrameId = frame.frameid;
                                    });
                                }
                            });
                        }
                        durationInSeconds = maxFrameId * unitTime;
                    }
                }
            } catch (e) { console.error("UIAction 길이를 가져오는 중 오류:", e); durationInSeconds = 0; }
        }
        return Math.max(0, durationInSeconds);
    },

    onExit: function() {
        Target = null; NodeList = null; TempTargetPos = null; TempTargetScale = null; TempTargetRot = null;
        Sequencer.cleanup();

        if (this._canvasResizeListener) {
            cc.eventManager.removeListener(this._canvasResizeListener);
        }
        cc.eventManager.removeListener(this._loadArmatureListener);
        cc.eventManager.removeListener(this._loadUIListener);
        cc.eventManager.removeListener(this._loadCocosStudioListener);
        this._super();
    }
});


var ManiLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        // 1. 저장된 레이아웃 불러오기
        const savedLayout = LayoutManager.load();

        // 2. 불러온 데이터가 있으면 PanelManager의 기본 설정을 덮어씁니다.
        if (savedLayout) {
            for (const panelId in savedLayout) {
                // PanelManager가 노출한 config 객체에 접근하여 수정합니다.
                if (PanelManager.config[panelId]) {
                    Object.assign(PanelManager.config[panelId], savedLayout[panelId]);
                }
            }
        }

        // Loader, ElectronRenderer 등 1회성 초기화
        Loader.init();
        if (typeof ElectronRenderer != 'undefined') ElectronRenderer.init();

        // Cocos2d 레이어 생성
        var layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");

        // 3. PanelManager 초기화 함수를 호출합니다.
        PanelManager.initialize();

        // 해상도 조절 UI 초기화
        const gameViewConfig = PanelManager.config.gameView;
        $('#res-width-input').val(gameViewConfig.width);
        $('#res-height-input').val(gameViewConfig.height);

        $('#res-apply-btn').on('click', function() {
            const w = parseInt($('#res-width-input').val(), 10);
            const h = parseInt($('#res-height-input').val(), 10);
            GameViewManager.setResolution(w, h);
        });

        // 최초 캔버스 크기 동기화
        GameViewManager.sync();

        var self = this;
        cc.eventManager.addListener( {
            event: cc.EventListener.MOUSE,
            onMouseDown: function( event ) {
                var nodeObj = self.getFrontTouchedNode( event.getLocation() );
                var mainLayer = self.getChildByName("MainLayer");
                if( nodeObj.node && mainLayer) {
                    mainLayer.updateMenu( nodeObj.nodeName, nodeObj.finalNode );
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
        var maxZOrderList = [], frontNode = null, frontNodeName = '', zOrderList = [], node = null;
        var updateData = function( z, n, name ) { maxZOrderList = z; frontNode = n; frontNodeName = name; };
        for( var name in NodeList ) {
            if( NodeList.hasOwnProperty( name ) ) {
                node = NodeList[ name ];
                if( !cc.rectContainsPoint(node.getBoundingBoxToWorld(), touchPos) ) continue;
                zOrderList = this.getZOrderList( node );
                if( maxZOrderList.length > 0 ) {
                    var determined = false;
                    for( var i = 0; i < zOrderList.length && i < maxZOrderList.length; i++ ) {
                        if( zOrderList[ i ] > maxZOrderList[ i ] ) { updateData( zOrderList, node, name ); determined = true; break; }
                        else if( zOrderList[ i ] < maxZOrderList[ i ] ) { determined = true; break; }
                    }
                    if( !determined && zOrderList.length > maxZOrderList.length ) updateData( zOrderList, node, name );
                } else {
                    updateData( zOrderList, node, name );
                }
            }
        }
        var finalNode = this.recursiveCheckNode(frontNode, touchPos);
        return { node: frontNode, nodeName: frontNodeName, finalNode : finalNode };
    },

    recursiveCheckNode: function(node, touchpos){
        if(!node || !node.children) return node;
        for (var idx = 0; idx < node.children.length; idx++) {
            var found = this.recursiveCheckNode(node.children[idx], touchpos);
            if(found !== node.children[idx]) return found;
            if (cc.rectContainsPoint(node.children[idx].getBoundingBoxToWorld(), touchpos)) {
                return node.children[idx];
            }
        }
        return node;
    },

    getZOrderList: function( node ) {
        var zOrderList = [];
        for( let p = node; !!p; p = p.getParent() ) { zOrderList.unshift( p.zIndex ); }
        return zOrderList;
    },

    onExit: function() {
        if (typeof ScreenUtil !== 'undefined') ScreenUtil.removeAllResizeListener();
        this._super();
    }
});