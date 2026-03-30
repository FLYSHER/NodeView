/**
 * Created by soo on 2017. 2. 27..
 */

var rnc = rnc || {};
var SERVER_CONFIG = SERVER_CONFIG || {};
if (typeof window !== 'undefined') {
    window.rnc = rnc; // 웹 환경용
    window.SERVER_CONFIG = SERVER_CONFIG;
}

function get_browser_info() {
    var trident = navigator.userAgent.match( /Trident\/(\d)/i );
    if( trident !== null ) {
        return { name : 'IE ', version : (trident[ 1 ] || '0') };
    }

    var ua = navigator.userAgent, tem,
        M  = ua.match( /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i ) || [];
    if( /trident/i.test( M[ 1 ] ) ) {
        tem = /\brv[ :]+(\d+)/g.exec( ua ) || [];
        return { name : 'IE ', version : (tem[ 1 ] || '0') };
    }
    if( M[ 1 ] === 'Chrome' ) {
        tem = ua.match( /\bOPR\/(\d+)/ )
        if( tem != null ) {
            return { name : 'Opera', version : tem[ 1 ] };
        }
        tem = ua.match( /\bEdge\/(\d+)/ );
        if( tem != null ) {
            return { name : 'Edge', version : tem[ 1 ] };
        }
    }
    M = M[ 2 ] ? [ M[ 1 ], M[ 2 ] ] : [ navigator.appName, navigator.appVersion, '-?' ];
    if( (tem = ua.match( /version\/(\d+)/i )) != null ) {
        M.splice( 1, 1, tem[ 1 ] );
    }
    return {
        name    : M[ 0 ],
        version : M[ 1 ]
    };
}
window.browser = get_browser_info();

rnc.engine = {
    openGet : function(url, callback, noCache){
        var xhr = new window.XMLHttpRequest(), errInfo = "load " + url + " failed!";
        xhr.open( "GET", url, true );
        if (noCache=== true) {
            xhr.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate");
            xhr.setRequestHeader("Pragma", "no-cache");
        }
        //if (xhr.overrideMimeType) xhr.overrideMimeType("text\/plain; charset=utf-8");
        var loadCallback = function () {
            xhr.removeEventListener('load', loadCallback);
            xhr.removeEventListener('error', errorCallback);
            if (xhr._timeoutId >= 0) {
                clearTimeout(xhr._timeoutId);
            }
            else {
                xhr.removeEventListener('timeout', timeoutCallback);
            }
            if (xhr.readyState === 4) {
                (xhr.status === 200||xhr.status === 0) ? callback(null, xhr.responseText) : callback(new Error(errInfo), null);
            }
        };
        var errorCallback = function () {
            xhr.removeEventListener('load', loadCallback);
            xhr.removeEventListener('error', errorCallback);
            if (xhr._timeoutId >= 0) {
                clearTimeout(xhr._timeoutId);
            }
            else {
                xhr.removeEventListener('timeout', timeoutCallback);
            }
            callback(new Error(errInfo), null);
        };
        var timeoutCallback = function () {
            xhr.removeEventListener('load', loadCallback);
            xhr.removeEventListener('error', errorCallback);
            if (xhr._timeoutId >= 0) {
                clearTimeout(xhr._timeoutId);
            }
            else {
                xhr.removeEventListener('timeout', timeoutCallback);
            }
            callback(new Error(errInfo), null);
        };
        xhr.addEventListener('load', loadCallback);
        xhr.addEventListener('error', errorCallback);
        if (xhr.ontimeout === undefined) {
            xhr._timeoutId = setTimeout(function () {
                timeoutCallback();
            }, xhr.timeout);
        }
        else {
            xhr.addEventListener('timeout', timeoutCallback);
        }
        xhr.send(null);
    },
    
    getQueryString: function () {
        var deepLink = document.location.href;
        var arrSplit = deepLink.split('?');
        if (arrSplit.length <= 1)
            return null;
        return arrSplit[1];
    },

    getDeepLinkParam : function(key){
        var queryString = this.getQueryString();
        if (queryString != null)
        {
            var a = queryString.split('&');
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=', 2);
                if (p.length === 2 && p[0]===key)
                    return decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }
        return null;
    },

    getQueryString : function (){
        var deepLink = document.location.href;
        var arrSplit = deepLink.split('?');
        if (arrSplit.length <= 1)
            return null;
        return arrSplit[1];
    }
}

