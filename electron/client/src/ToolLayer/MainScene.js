var Genie = Genie || {};
Genie.LayerType = {
    MAIN    : 0,
    PREVIEW : 1
}

var Gizmo = cc.Node.extend({
    ctor : function() {
        this._super();
        this.initGizmo();
    },

    initGizmo : function () {
        this._drawNode = new cc.DrawNode();
        this.addChild( this._drawNode );

        // 기즈모
        // this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( 30, 0 ), 1, cc.color( 255, 0,0,255) );
        // this._drawNode.drawSegment( cc.p( 30,0 ), cc.p( 25, 5 ), 1, cc.color( 255, 0,0,255) );
        // this._drawNode.drawSegment( cc.p( 30,0 ), cc.p( 25, -5 ), 1, cc.color( 255, 0,0,255) );
        //
        // this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( 0, 30 ), 1, cc.color( 0, 255,0,255) );
        // this._drawNode.drawSegment( cc.p( 0,30 ), cc.p( 5, 25 ), 1, cc.color( 0, 255,0,255) );
        // this._drawNode.drawSegment( cc.p( 0,30 ), cc.p( -5, 25 ), 1, cc.color( 0, 255,0,255) );
        //
        // this._drawNode.drawDot( cc.p( 0, 0), 3, cc.color( 255, 255, 255, 180) );

        // content size rect
        // origin, destination, fillColor, lineWidth, lineColor

    },

    setTargetNode : function( node ) {
        var nodePos     = node.getPosition();
        var worldPos    = node.convertToWorldSpace( nodePos );
        var localPos    = node.getParent().convertToNodeSpace( worldPos );

        this._drawNode.drawSegment( localPos, cc.pAdd( localPos, cc.p( 30,0 )), 1, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 30,0 )), cc.pAdd( localPos, cc.p( 25,5 )), 1, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 30,0 )), cc.pAdd( localPos, cc.p( 25,-5 )), 1, cc.color( 255, 0,0,255) );

        this._drawNode.drawSegment( localPos, cc.pAdd( localPos, cc.p( 0,30 )), 1, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 0,30 )), cc.pAdd( localPos, cc.p( -5,25 )), 1, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 0,30 )), cc.pAdd( localPos, cc.p( 5,25 )), 1, cc.color( 0, 255,0,255) );

        this._drawNode.drawDot( localPos, 3, cc.color( 255, 255, 255, 180) );

        // contentSize
        var origin  = cc.p( 0, 0 ),
            dest    = cc.p( node.width, node.height );

        origin  = cc.pAdd( origin, localPos );
        dest    = cc.pAdd( dest, localPos );
        this._drawNode.drawRect( origin, dest, cc.color( 0 , 0, 0, 0 ), 1, cc.color(  0, 255, 255, 255 ) );
    },


});

var MainScene = cc.Scene.extend({
    ctor : function() {
        this._super();

    },

    onEnter:function () {
        this._super();
        Genie.MainScene = this;

        /**
         * Init loader
         */
        Loader.init();

        this.initLayers();

        if (typeof CocosRenderer != 'undefined')
            CocosRenderer.init();

        if (typeof AssetRenderer != 'undefined')
            AssetRenderer.init();

        if (typeof InspectorRenderer != 'undefined')
            InspectorRenderer.init();

        if (typeof HierarchyRenderer != 'undefined')
            HierarchyRenderer.init(this._mainViewLayer );


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

        $("#mainLayer").click( function() {
            this.setCurrentLayer( Genie.LayerType.MAIN );
        }.bind(this) );

        $("#previewLayer").click( function() {
            this.setCurrentLayer( Genie.LayerType.PREVIEW );
        }.bind(this) );
    },

    onExit: function() {
        ScreenUtil.removeAllResizeListener();
        Genie.MainScene = null;
        this._super();
    },

    initLayers : function() {
        this._mainViewLayer = new MainViewLayer();
        this.addChild( this._mainViewLayer, 0 );

        this._previewLayer = new PreviewLayer();
        this.addChild( this._previewLayer, 0 );

        this._mainViewLayer.setPosition( 0, 0 );
        this._previewLayer.setPosition( 0, 0 );

        this._currLayerType = -1;
        this.setCurrentLayer( Genie.LayerType.MAIN );

        var gizmo = new Gizmo();
        gizmo.setPosition( 100, 100 )
        this.addChild( gizmo, 100 );

    },

    setCurrentLayer : function( layerType ) {
        if( this._currLayerType === layerType ) {
            return;
        }

        this._currLayerType = layerType;

        switch ( layerType ) {
            case Genie.LayerType.MAIN:
                this._mainViewLayer.setVisible( true );
                this._previewLayer.setVisible( false );

                break;
            case Genie.LayerType.PREVIEW:
                this._mainViewLayer.setVisible( false );
                this._previewLayer.setVisible( true );
                break;
        }
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


});