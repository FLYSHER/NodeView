/**
 * A brief explanation for "project.json":
 * Here is the content of project.json file, this is the global configuration for your game, you can modify it to customize some behavior.
 * The detail of each field is under it.
 {
    "project_type": "javascript",
    // "project_type" indicate the program language of your project, you can ignore this field

    "debugMode"     : 1,
    // "debugMode" possible values :
    //      0 - No message will be printed.
    //      1 - cc.error, cc.assert, cc.warn, cc.log will print in console.
    //      2 - cc.error, cc.assert, cc.warn will print in console.
    //      3 - cc.error, cc.assert will print in console.
    //      4 - cc.error, cc.assert, cc.warn, cc.log will print on canvas, available only on web.
    //      5 - cc.error, cc.assert, cc.warn will print on canvas, available only on web.
    //      6 - cc.error, cc.assert will print on canvas, available only on web.

    "showFPS"       : true,
    // Left bottom corner fps information will show when "showFPS" equals true, otherwise it will be hide.

    "frameRate"     : 60,
    // "frameRate" set the wanted frame rate for your game, but the real fps depends on your game implementation and the running environment.

    "noCache"       : false,
    // "noCache" set whether your resources will be loaded with a timestamp suffix in the url.
    // In this way, your resources will be force updated even if the browser holds a cache of it.
    // It's very useful for mobile browser debugging.

    "id"            : "gameCanvas",
    // "gameCanvas" sets the id of your canvas element on the web page, it's useful only on web.

    "renderMode"    : 0,
    // "renderMode" sets the renderer type, only useful on web :
    //      0 - Automatically chosen by engine
    //      1 - Forced to use canvas renderer
    //      2 - Forced to use WebGL renderer, but this will be ignored on mobile browsers

    "engineDir"     : "frameworks/cocos2d-html5/",
    // In debug mode, if you use the whole engine to develop your game, you should specify its relative path with "engineDir",
    // but if you are using a single engine file, you can ignore it.

    "modules"       : ["cocos2d"],
    // "modules" defines which modules you will need in your game, it's useful only on web,
    // using this can greatly reduce your game's resource size, and the cocos console tool can package your game with only the modules you set.
    // For details about modules definitions, you can refer to "../../frameworks/cocos2d-html5/modulesConfig.json".

    "jsList"        : [
    ]
    // "jsList" sets the list of js files in your game.
 }
 *
 */

var startpos, diffpos=0, range=50;
var isEnable = false;


// 사이드 메뉴 크기 조절 바를 클릭할 경우
function onSideHrMouseDown( e ) {
    startpos = event.clientX + diffpos;
    isEnable = true;

    createOverDiv();

    return false;

}

// 사이드 메뉴 크기 조절 바 클릭을 뗄 경우
function onSideHrMouseUp( e ) {
    isEnable = false;

    removeOverDiv();

    return false;
}

// 사이드 메뉴 크기 조절 바 클릭 후 이동 시 사이드 메뉴와 캔버스 사이즈 조절
function onSideHrMouseMove( e ) {

    if (isEnable) {
        var pos = event.clientX;
        diffpos = startpos-pos;

        var sideNav_width = ( startpos - diffpos );

        if ( sideNav_width > 210 ) {
            document.getElementById("sidenav").style.width = sideNav_width + "px";
            document.getElementById("side_hr").style.marginLeft = sideNav_width + "px";
            document.getElementById("Cocos2dGameContainer").style.marginLeft = ( sideNav_width + 5 ) + "px";
            document.getElementById("Cocos2dGameContainer").style.width = window.innerWidth - sideNav_width + "px";

            cc.view.setFrameSize( document.getElementById("Cocos2dGameContainer").clientWidth, document.getElementById("Cocos2dGameContainer").clientHeight );
        }
    }
}

// 사이드 메뉴와 캔버스 사이에 사이즈 조절을 위한 바 생성
function initSideHrMouseEvent() {
    var container = document.getElementById("Cocos2dGameContainer");
    container.setAttribute('class', 'Cocos2dGameContainer');

    document.getElementById("side_hr").onmousedown = onSideHrMouseDown;
    document.onmouseup = onSideHrMouseUp;
    document.onmousemove = onSideHrMouseMove;
}

// 사이즈 조절 바 클릭 후 드래그 시 캔버스 위에는 드래그 인식이 안되기 때문에 캔버스 위에 div 하나 생성
function createOverDiv() {
    var container = document.getElementById("Cocos2dGameContainer");
    var overDiv = document.createElement('over_div');
    overDiv.id = 'over_div';
    overDiv.style.position = 'absolute';
    overDiv.style.padding = '3px';
    overDiv.style.backgroundColor = 'rgb(0, 0, 34)';
    overDiv.style.bottom = cc.DIRECTOR_STATS_POSITION.y + '0px';
    overDiv.style.left = cc.DIRECTOR_STATS_POSITION.x + 'px';
    overDiv.style.opacity = '0';
    overDiv.style.width = window.innerWidth + 'px';
    overDiv.style.height = window.innerHeight  + 'px';
    container.appendChild( overDiv );
}

// 캔버스 위에 생성한 div 를 제거
// 캔버스 위에 div 가 존재하면 파일 드래그 앤 드롭이 동작하지 않는다.
function removeOverDiv() {
    var container = document.getElementById("Cocos2dGameContainer");
    var overDiv = document.getElementById('over_div')

    if( overDiv )
        container.removeChild( overDiv );
}

function copyObject( obj ) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const copiedObject = obj.constructor();

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copiedObject[key] = copyObject(obj[key]);
        }
    }

    return copiedObject;
}

function copyStringToClipboard( string ) {
    var clipboardElement = document.createElement("textarea");
    document.body.appendChild(clipboardElement);
    clipboardElement.value = string;
    clipboardElement.select();
    document.execCommand('copy');
    document.body.removeChild(clipboardElement);
}

cc.game.onStart = function(){
    initSideHrMouseEvent();

    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile &&
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    // cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    cc.log("[CHECK] " , cc.winSize.width, cc.winSize.height );
    // Setup the resolution policy and design resolution size
    //cc.view.setDesignResolutionSize(cc.winSize.width, cc.winSize.height, cc.ResolutionPolicy.EXACT_FIT);
    // cc.view.setDesignResolutionSize(1700, 860, cc.ResolutionPolicy.FIXED_HEIGHT);

    // set _orientationChanging to false for resize
    cc.view._orientationChanging = false;

    var newPolicy = new cc.ResolutionPolicy(new CustomContainerStrategy, new CustomContentStrategy);
    cc.view.setDesignResolutionSize(1700, 860, newPolicy);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new ManiLayerScene());
    }, this);
};
cc.game.run();