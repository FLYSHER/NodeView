var Genie = Genie || {};
Genie.LayerType = {
    MAIN    : 0,
    PREVIEW : 1
}

Genie.gizmoLayer = null;
Genie.mainLayer  = null;

var MainScene = cc.Scene.extend({
    ctor : function() {
        this._super();
    },

    onEnter:function () {
        this._super();
        Genie.MainScene = this;

        Loader.init(); /** Init loader */

        this.initLayers();

        /** view init **/
        Renderer_main.init();
        Renderer_bottom.init();
        Renderer_assets.init();
        Renderer_inspector.init();
        Renderer_hierarchy.init( this._mainViewLayer );

        // $("#mainLayer").click( function() {
        //     this.setCurrentLayer( Genie.LayerType.MAIN );
        // }.bind(this) );
        //
        // $("#previewLayer").click( function() {
        //     this.setCurrentLayer( Genie.LayerType.PREVIEW );
        // }.bind(this) );
    },

    onExit: function() {
        ScreenUtil.removeAllResizeListener();
        Genie.MainScene = null;
        this._super();
    },

    initLayers : function() {
        this._mainViewLayer = new MainViewLayer();
        this.addChild( this._mainViewLayer, 0 );

        this._gizmoLayer   = new GizmoLayer();
        this.addChild( this._gizmoLayer, 1 );

        this._mainViewLayer.setPosition( 0, 0 );
        this._gizmoLayer.setPosition( 0, 0 );

        this._currLayerType = -1;
        this.setCurrentLayer( Genie.LayerType.MAIN );

        Genie.gizmoLayer = this._gizmoLayer;
        Genie.mainLayer = this._mainViewLayer;
    },

    setCurrentLayer : function( layerType ) {
        if( this._currLayerType === layerType ) {
            return;
        }

        this._currLayerType = layerType;

        switch ( layerType ) {
            case Genie.LayerType.MAIN:
                this._mainViewLayer.setVisible( true );

                break;
            case Genie.LayerType.PREVIEW:
                this._mainViewLayer.setVisible( false );
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