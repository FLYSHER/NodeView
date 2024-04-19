var Genie = Genie || {};
Genie.LayerType = {
    MAIN    : 0,
    PREVIEW : 1
}

Genie.gizmoLayer = null;
Genie.mainLayer  = null;

var MainScene = cc.Scene.extend({
    ctor : function() {
        this.initProperties();
        this._super();
    },

    initProperties : function() {
        this.mainViewLayer  = null;
        this.gizmoLayer     = null;
    },

    onEnter:function () {
        this._super();
        Genie.MainScene = this;

        Loader.init(); /** Init loader */

        this.initLayers();

        /** view init **/
        Renderer_main.init();
        Renderer_bottom.init();
        Renderer_log.init();
        Renderer_timeline.init();
        Renderer_assets.init();
        Renderer_inspector.init();
        Renderer_hierarchy.init( this.mainViewLayer );

    },

    onExit: function() {
        ScreenUtil.removeAllResizeListener();
        Genie.MainScene = null;
        this._super();
    },

    initLayers : function() {
        this.mainViewLayer = new MainViewLayer();
        this.addChild( this.mainViewLayer, 0 );

        this.gizmoLayer     = new Genie.GizmoLayer();
        this.addChild( this.gizmoLayer, 1 );

        this.mainViewLayer.setPosition( 0, 0 );

        Genie.mainLayer     = this.mainViewLayer;
        Genie.gizmoLayer    = this.gizmoLayer;
    },
});