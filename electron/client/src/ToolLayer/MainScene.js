var Genie = Genie || {};
Genie.LayerType = {
    MAIN    : 0,
    PREVIEW : 1
}

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