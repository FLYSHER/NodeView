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
    _canvasResizeListener: null,

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
        this._loadSpineListener = cc.eventManager.addCustomListener('loadSpine', function(event) { self.onLoadSpine(event.getUserData()); });

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

    updateLayout: function() {
        const oldCX = this.CX;
        const oldCY = this.CY;

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        var label = this.getChildByTag(this.DESC_TAG);
        if (label) {
            label.setPosition(this.CX, this.CY);
        }

        if (oldCX && oldCY && this._nodeList) {
            for (const name in this._nodeList) {
                if (this._nodeList.hasOwnProperty(name)) {
                    const node = this._nodeList[name];
                    const currentPos = node.getPosition();
                    const relativeX = currentPos.x - oldCX;
                    const relativeY = currentPos.y - oldCY;
                    const newX = this.CX + relativeX;
                    const newY = this.CY + relativeY;
                    node.setPosition(newX, newY);
                }
            }
        }
    },

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
            node.spine = null;
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
        node.spine = null;
        node.order = this._nodeOrder.length;
        node.setLocalZOrder(10 + node.order);
        this._nodeOrder[node.order] = node;
        this._nodeList[ name ] = node;
        this._addToJsonListMenu( name ,node);
    },

    onLoadSpine: function( fileName ) {
        var children = this.getChildren();
        var self = this;
        children.forEach( function( c ) { if( c.getTag() === self.DESC_TAG ) { c.removeFromParent(); } });

        var name = cc.path.mainFileName( fileName );
        if(this._nodeList[ name ]) return;

        var spine = sp.SkeletonAnimation.createWithJsonFile( fileName + ".json", fileName +".atlas", 1.0 );
        spine.setPosition( cc.p( cc.winSize.width / 2, cc.winSize.height / 2 ) );
        var node = new DraggableNode( spine.getContentSize() );
        node.setAnchorPoint( 0.5, 0.5 );
        node.setPosition( this.CX , this.CY );
        this.addChild( node );
        node.addChildToCenter( spine );

        var arrBone = [];
        var setBoneLabel = function( lbBone, bone ) {
            lbBone.setPosition( cc.p( bone.ax, bone.ay ) );
            lbBone.setScaleX( bone.ascaleX );
            lbBone.setScaleY( bone.ascaleY );
            lbBone.setRotation( -bone.arotation );
        };

        var setBone = function ( bone ) {
            var lbBone = new ccui.Text( bone.data.name, "Arial", 20 );
            lbBone.enableOutline(cc.color(41, 0, 0, 127), 1 );
            lbBone.enableShadow(cc.color(41, 0, 0, 127), cc.size(0, -1) );
            lbBone.setVisible( false );
            arrBone.push( { "bone": bone, "lbBone": lbBone } );
            if( bone.children.length > 0 ) {
                bone.children.forEach( function( _bone ) { setBone( _bone ); } );
                setBoneLabel( lbBone, bone );
            } else {
                setBoneLabel( lbBone, bone );
            }
            spine.addChild( lbBone, 1 );
        };
        setBone( spine._rootBone );

        node.armature = null;
        node.ui = null;
        node.spine = spine;
        node.spine.arrBone = arrBone;
        node.spine.setDebugBone = function() {
            node.spine.setDebugBonesEnabled( !node.spine.getDebugBonesEnabled() );
            node.spine.updateFunc = function( dt ) {
                arrBone.forEach( function( boneData ) {
                    var lbBone = boneData.lbBone;
                    var bone = boneData.bone;
                    setBoneLabel( lbBone, bone );
                } );
            };
            if( node.spine.getDebugBonesEnabled() ) {
                node.spine.schedule( node.spine.updateFunc );
            }
            else {
                node.spine.unschedule( node.spine.updateFunc );
            }
            arrBone.forEach( function( boneData ) {
                boneData.lbBone.visible = node.spine.getDebugBonesEnabled();
            } );
        }.bind( node.spine );

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
        node.spine = null;
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
        } else if ( selectNode.spine ) {
            var animations = selectNode.spine.getState().data.skeletonData.animations;
            var animNameArr = [];
            for( var idx = 0; idx < animations.length; idx++ ) {
                animNameArr.push( animations[ idx ].name );
            }
            var playCb = function ( animName) {
                selectNode.spine.setAnimation( 0, animName, false );
            };
            this._animationList.init(animNameArr,playCb);
            $('#LocalSize').html("(" + selectNode.spine.getContentSize().width.toFixed(2) + " , " +selectNode.spine.getContentSize().height.toFixed(2) + ")");
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
        }
        else if (node.spine) {
            try {
                // [수정] 스파인 애니메이션 길이를 가져오는 API를 정확하게 수정합니다.
                const animation = node.spine.getState().data.skeletonData.findAnimation(animName);
                if (animation) {
                    durationInSeconds = animation.duration;
                }
            } catch (e) { console.error("Spine 길이를 가져오는 중 오류:", e); }
        }
        else {
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
        cc.eventManager.removeListener(this._loadSpineListener);
        this._super();
    }
});


var ManiLayerScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        const savedLayout = LayoutManager.load();
        if (savedLayout) {
            for (const panelId in savedLayout) {
                if (PanelManager.config[panelId]) {
                    Object.assign(PanelManager.config[panelId], savedLayout[panelId]);
                }
            }
        }

        Loader.init();
        if (typeof ElectronRenderer != 'undefined') ElectronRenderer.init();

        var layer = new MainLayer();
        this.addChild(layer, 1, "MainLayer");

        PanelManager.initialize();

        const gameViewConfig = PanelManager.config.gameView;
        $('#res-width-input').val(gameViewConfig.width);
        $('#res-height-input').val(gameViewConfig.height);

        $('#res-apply-btn').on('click', function() {
            const w = parseInt($('#res-width-input').val(), 10);
            const h = parseInt($('#res-height-input').val(), 10);
            GameViewManager.setResolution(w, h);
        });

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