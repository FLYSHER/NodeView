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
        Renderer_top.init();
        Renderer_timeline.init();
        Renderer_assets.init();
        Renderer_inspector.init();
        Renderer_hierarchy.init( this.mainViewLayer );

        // 마우스 휠 이벤트 추가
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseScroll: this.onMouseWheel.bind(this)
        }, this.mainViewLayer);
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

    onMouseWheel: function(event) {
        var delta = event.getScrollY(); // 휠 이벤트에서 delta 값 가져오기
        var currentScale = this.mainViewLayer.scale; // 현재 레이어의 스케일 가져오기
        var newScale = currentScale + delta * 0.001; // 확대/축소 속도 및 방향 조절

        newScale = parseFloat(newScale.toFixed(3));
        // 최소 및 최대 확대/축소 범위 조절
        this.setScaleMainViewLayer(newScale);
    },

    zoomIn: function () {
        var currentScale = this.mainViewLayer.scale;
        var newScale = currentScale + 0.06;
        newScale = parseFloat(newScale.toFixed(3));

        this.setScaleMainViewLayer(newScale);
    },

    zoomOut: function () {
        var currentScale = this.mainViewLayer.scale;
        var newScale = currentScale - 0.06;
        newScale = parseFloat(newScale.toFixed(3));

        this.setScaleMainViewLayer(newScale);
    },

    setScaleMainViewLayer : function (scale) {
        if (scale >= 0.4 && scale <= 2.2) {
            this.mainViewLayer.scale = scale; // 레이어의 스케일 변경
            var selectNode = Genie.ToolController.getSelectNode();
            Genie.GizmoController.updateGizmoByTarget( selectNode );

            document.getElementById('zoom_label').innerHTML = 'screen size : ' + parseInt((scale * 100).toString()) + '%';
            Genie.ToolController.setScreenScale(scale);
        }
    },

});