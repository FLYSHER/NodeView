/**
 * 상태바 (화면 맨 아래)
 * 에셋/노드 수, 로드된 텍스처 메모리, 누락 리소스, Console 경고·오류 수, FPS, 렌더러를 보여준다.
 */
var StatusBar = (function () {
    var _timer = null;
    var _lastFrames = 0;
    var _lastTime = 0;

    function formatBytes(bytes) {
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    // 누락 리소스가 있는 에셋 목록
    function missingAssets() {
        var list = [];
        ResourceRegistry.getSources().forEach(function (src) {
            var data = ResourceRegistry.collect(src.key);
            if (!data) return;
            var count = data.stats.missing + data.missingFrames.length;
            if (count > 0) list.push({ key: src.key, name: src.name, count: count });
        });
        return list;
    }

    function update() {
        var $bar = $('#status-bar');
        if ($bar.length === 0 || typeof Loader === 'undefined') return;
        var mainLayer = window.MainLayerInstance;

        var assetCount = mainLayer ? Object.keys(mainLayer.assetLibrary).length : 0;
        var nodeCount = mainLayer ? Object.keys(mainLayer.nodeMap).length : 0;

        var texBytes = 0;
        Loader.textureList.forEach(function (name) {
            var tex = Loader.textures[name];
            if (tex) texBytes += tex.getPixelsWide() * tex.getPixelsHigh() * 4;
        });

        var missing = missingAssets();
        var missingTotal = missing.reduce(function (sum, m) { return sum + m.count; }, 0);
        var c = ConsolePanel.counts();

        var fps = '';
        if (cc.director && cc.director.getTotalFrames) {
            var now = Date.now();
            var frames = cc.director.getTotalFrames();
            if (_lastTime) fps = Math.round((frames - _lastFrames) * 1000 / Math.max(1, now - _lastTime));
            _lastFrames = frames;
            _lastTime = now;
        }
        var renderer = cc._renderType === cc.game.RENDER_TYPE_WEBGL ? 'WebGL' : 'Canvas';

        $bar.find('.sb-assets').text('에셋 ' + assetCount + ' · 노드 ' + nodeCount);
        $bar.find('.sb-textures').text('텍스처 ' + Loader.textureList.length + '장 · ' + formatBytes(texBytes));

        var $missing = $bar.find('.sb-missing');
        if (missingTotal > 0) {
            $missing.show().attr('title', missing.map(function (m) { return m.name + ': ' + m.count; }).join('\n'))
                .find('.sb-missing-text').text('누락 리소스 ' + missingTotal + ' — ' + missing[0].name + (missing.length > 1 ? ' 외 ' + (missing.length - 1) : ''));
        } else {
            $missing.hide();
        }

        $bar.find('.sb-console').toggleClass('has-error', c.error > 0).toggleClass('has-warn', c.warn > 0)
            .html('<span class="sb-warn-count">경고 ' + c.warn + '</span> · <span class="sb-error-count">오류 ' + c.error + '</span>');
        $bar.find('.sb-fps').text((fps !== '' ? fps + ' FPS · ' : '') + renderer);
    }

    function init() {
        var $bar = $('#status-bar');
        $bar.on('click', '.sb-missing', function () {
            var first = missingAssets()[0];
            if (!first || !window.MainLayerInstance) return;
            var itemList = window.MainLayerInstance._itemList;
            itemList._expandedKeys[first.key] = true;
            window.MainLayerInstance.refreshAssetsPanel();
            itemList._select(first.key, null);
        });
        $bar.on('click', '.sb-console', function () {
            PanelManager.showComponent('console');
        });
        update();
        clearInterval(_timer);
        _timer = setInterval(update, 1000);
        if (cc.eventManager) {
            cc.eventManager.addCustomListener(ResourceRegistry.EVENT_CHANGED, update);
            cc.eventManager.addCustomListener(ConsolePanel.EVENT_CHANGED, update);
        }
    }

    return { init: init, update: update };
})();
