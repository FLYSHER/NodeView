/**
 * 스크린과 관련된 함수 모음
 * @namespace
 */
var ScreenUtil = {};
ScreenUtil.contentScale = 1;
ScreenUtil.minWHRatio = 0.75;
ScreenUtil.resizeListeners = [];

// 따로 관리하고 싶은 resizeListener는 직접 addCustomListener를 호출하여 등록한다.
/**
 * Canvas Resize 이벤트 때 실행할 리스너 등록
 * @param callback
 * @param target
 */
ScreenUtil.addResizeListener = function( callback, target ) {
    EventDispatcher.getInstance().addCustomListener( "canvas-resize", callback, target );
    ScreenUtil.resizeListeners.push( {callback: callback, target: target} );
};

/**
 * 등록된 모든 resize 리스너 삭제
 */
ScreenUtil.removeAllResizeListener = function() {
    ScreenUtil.resizeListeners.forEach( function( listener ) {
        EventDispatcher.getInstance().removeCustomListener( "canvas-resize", listener.callback, listener.target );
    } );
    ScreenUtil.resizeListeners = [];
};

/**
 * 센터 위치 값 리턴
 * @return {cc.Point|{x, y}}
 */
ScreenUtil.getCenterPos = function() {
    return cc.p( cc.winSize.width / 2, cc.winSize.height / 2 );
};

if( !cc.sys.isNative ) {
    // JSB 에는 cc.ContainerStrategy 와 cc.ContentStrategy 가 정의되어 있지 않음

    var CustomContainerStrategy = cc.ContainerStrategy.extend({
        apply: function (view, designedResolution) {

            // var sidebarWidth = document.getElementsByClassName('sidenav')[0].clientWidth + 5;//	$('.sidenav').css("width");
            // var w = window.innerWidth - sidebarWidth;
            // var h = window.innerHeight;

            // var w = cc.container.clientWidth,
            //     h = cc.container.clientHeight;

            var cocosView = document.getElementById("cocosView_gridItem");
            var w = cocosView.clientWidth,
                h = cocosView.clientHeight;

            if( h > ScreenUtil.minWHRatio * w) {
                h = Math.round( ScreenUtil.minWHRatio * w );
            }
            cc.log("CustomContainerStrategy > w, h : ", w, h );
            return this._setupContainer(view, w, h);
        }
    });

    var CustomContentStrategy = cc.ContentStrategy.extend({
        apply: function (view, designedResolution) {

            // var sidebarWidth = document.getElementsByClassName('sidenav')[0].clientWidth + 5;
            // var w = window.innerWidth-sidebarWidth;
            // var h = window.innerHeight;

            var w = cc.container.clientWidth,
                h = cc.container.clientHeight;

            if( h > ScreenUtil.minWHRatio * w) {
                h = Math.round( ScreenUtil.minWHRatio * w );
            }

            var contentW = w;//e
            var contentH = h;//f
            var scale = 1;//g

            // if(contentH < 670) {
            //     if( contentH < 400 ) {
            //         scale = 400 / 670;
            //     } else {
            //         scale = contentH / 670;
            //     }
            //     contentH = 670;
            //     contentW /= scale;
            // } else if(contentH > 1000) {
            //     scale = contentH / 1000;
            //     contentH = 1000;
            //     contentW /= scale;
            // }
            //
            // if(contentW < 1080) {
            //     scale = scale * contentW / 1080;
            //     contentW = 1080;
            //     contentH = h / scale;
            // } else if(contentW > 2700) {
            //     contentW = 2700;
            // }


            ScreenUtil.contentScale = scale;

            designedResolution.width = contentW;
            designedResolution.height = contentH;
            cc.log("CustomContentStrategy > w, h : ", w, h, scale );
            return this._buildResult(w, h, w, h, scale, scale);
        }
    });
}