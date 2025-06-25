var GameViewManager = (function() {

    // private: 실제 로직을 담고 있는 함수들
    function _setResolution(designWidth, designHeight) {
        if (typeof cc === 'undefined' || !cc.view || !designWidth || !designHeight) return;

        const $container = $('#panel-game-view .panel-content');
        const containerWidth = $container.width();
        const containerHeight = $container.height();

        const widthRatio = containerWidth / designWidth;
        const heightRatio = containerHeight / designHeight;
        const scale = Math.min(widthRatio, heightRatio);

        const newCanvasWidth = designWidth * scale;
        const newCanvasHeight = designHeight * scale;

        $('#gameCanvas').attr('width', newCanvasWidth).attr('height', newCanvasHeight);
        cc.view.setFrameSize(newCanvasWidth, newCanvasHeight);
        cc.view.setDesignResolutionSize(designWidth, designHeight, cc.ResolutionPolicy.SHOW_ALL);
        cc.eventManager.dispatchCustomEvent("canvas-resize");
    }

    function _syncSize() {
        if (typeof cc === 'undefined' || !cc.view) return;
        const $panelContent = $('#panel-game-view').find('.panel-content').first();
        if ($panelContent.length === 0) return; // 패널이 아직 없으면 중단

        const newWidth = $panelContent.width();
        const newHeight = $panelContent.height();

        if (newWidth <= 0 || newHeight <= 0) return; // 유효하지 않은 크기면 중단

        $('#gameCanvas').attr('width', newWidth).attr('height', newHeight);
        cc.view.setFrameSize(newWidth, newHeight);
        cc.view.setDesignResolutionSize(newWidth, newHeight, cc.ResolutionPolicy.NO_BORDER);
        cc.eventManager.dispatchCustomEvent("canvas-resize");
    }

    // public: 외부에 노출할 메서드들
    return {
        setResolution: _setResolution,
        sync: _syncSize
    };
})();