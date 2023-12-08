// Main
var RockN = RockN || {};
RockN.GameScene = GameScene || {};
RockN.Player = RockN.Player || {};
RockN.Player.inVipMode = false;
RockN.GLOBAL_ORDER = {
    BACK_GROUND    : 0,
    BACK_MIDDLE    : 5,
    BG_FX          : 7,
    MIDDLE         : 10,
    MIDDLE_FRONT   : 15,
    GAME_FX        : 18,
    FRONT          : 20,
    VIP_BROAD      : 50,
    GENIE_BROAD    : 80,
    TOTAL_PAY      : 100,
    JACKPOT_EFFECT : 200,
    COIN_REWARD    : 555,
    SYSTEM_ICON    : 945,
    NAVIGATION     : 950,
    RIGHT_MENU_LAYER : 39,
    FEED_NODE      : 960,
    MAJOR_WIN      : 970,
    TOP_MOST       : 999,
    POPUP          : 1111,
    POPUP2         : 2222,
    POPUP3         : 3333,
    COIN_TRAIL     : 5000
};
RockN.Framerate = cc.game.config[ cc.game.CONFIG_KEY.frameRate ];

window.isNetworkOffLine = false;

// For Resource Loading.
function convertObjToArr( obj ) {
    var tempArr = [];
    for( var item in obj ) {
        if( obj.hasOwnProperty( item ) ) {
            tempArr.push( obj[ item ] );
        }
    }
    return tempArr;
}
var ResPack = {
    create : function (name, assets){
        return convertObjToArr(assets);
    },
};

// For Nodes
RockN.scheduleUpdate = function(node){
    !!node && node.scheduleUpdate();
};

// Utilities
RockN.UIUtil = RockN.UIUtil || {};

RockN.Util = RockN.Util || {};
RockN.Util.getARNameFromFileName = function( ARfileName ) {
    return ARfileName.split('.').slice(0, -1).join('.');
};
RockN.Util.isVisibleInScene = function(){
    return true;
}
RockN.createArmature = function( name, parentBone, priority, swallowTouches ) {
    return new ccs.Armature(name);
};
RockN.AutoPositionNode = cc.Node.extend( {
    ctor : function( isPosRelativeToInitSize ) {
        this._super();

        var winSize = cc.director.getWinSize();
        this.CX     = winSize.width / 2;
        this.CY     = winSize.height / 2;

        if( !!isPosRelativeToInitSize ) {
            this.x = -(RockN.initWidth - RockN.GameScene.width) / 2;
            this.y = -(RockN.initHeight - RockN.GameScene.height) / 2;
        }
        else {
            this.x = -(cc.winSize.width - RockN.GameScene.width) / 2;
            this.y = -(cc.winSize.height - RockN.GameScene.height) / 2;
        }
    }
} );

var SlotUtils = SlotUtils || {};
SlotUtils.testUtil = SlotUtils.testUtil || {};
SlotUtils.testUtil.getSpinTestPanel = function(){
    return null;
};

function bigNumberToString( num, maxDigit, pointNum, hasT, noComma, roundingRules ) {
    var digit = 1;
    var roundingFunc = roundingRules || Math.round;

    maxDigit = maxDigit || 3;
    pointNum = pointNum || 0;
    noComma = noComma || false;
    hasT = hasT || true;

    num = roundingFunc( num );
    var temp = num;
    while( temp >= 10 ) {
        temp = temp / 10;
        digit += 1;
    }

    var postfix = '';

    if( pointNum === 1 || pointNum === 2 ) {
        var divisor = 1;   // 나누는 수
        for( var i = 0; i < pointNum; i++ ) {
            divisor *= 10;
        }

        if( digit > maxDigit ) {
            num = roundingFunc( num / 1000 * divisor ) / divisor;
            digit -= 3;
            postfix = 'K';
            if( digit > maxDigit ) {
                num = roundingFunc(num / 1000 * divisor ) / divisor;
                digit -= 3;
                postfix = 'M';
                if( digit > maxDigit ) {
                    num = roundingFunc(num / 1000 * divisor ) / divisor;
                    digit -= 3;
                    postfix = 'B';
                    if( digit > maxDigit && !!hasT ) {
                        num = roundingFunc(num / 1000 * divisor ) / divisor;
                        digit -= 3;
                        postfix = 'T';
                    }
                }
            }
        }

        if( noComma ) {
            return num + postfix;
        } else {
            return toLocale( num, true ) + postfix;
        }

    } else {
        if( digit > maxDigit ) {
            num = roundingFunc(num / 1000);
            digit -= 3;
            postfix = 'K';
            if( digit > maxDigit ) {
                num = roundingFunc(num / 1000);
                digit -= 3;
                postfix = 'M';
                if( digit > maxDigit ) {
                    num = roundingFunc(num / 1000);
                    digit -= 3;
                    postfix = 'B';
                    if( digit > maxDigit && !!hasT ) {
                        num = roundingFunc(num / 1000);
                        digit -= 3;
                        postfix = 'T';
                    }
                }
            }
        }
    }

    if( noComma ) {
        return num + postfix;
    } else {
        return toLocale( num ) + postfix;
    }
}
function toLocale( num, isFloat ) {
    if( !num ) {
        return '0';
    }

    if( !isFloat || cc.sys.isMobile ) {
        num = String( parseInt( num ) );
        return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');//parseInt( Number( num ) ).toLocaleString('en_US');//.replace( '.', ',' );
    } else {
        var sx = ( '' + num ).split( '.' ), s = '', i, j;
        var sep = ','; // separator
        var grp = 3; // grouping
        i = sx[ 0 ].length;
        while( i > grp ) {
            j = i - grp;
            s = sep + sx[ 0 ].slice( j, i ) + s;
            i = j;
        }
        s = sx[ 0 ].slice( 0, i ) + s;
        sx[ 0 ] = s;
        return sx.join( '.' );
    }
}
function localeStringToNumber( string ) {
    if( 0 === string ) {
        return 0;
    }

    var res = string.replace(/,/g, "");
    if( string[ string.length -1 ] === 'K' ) {
        return parseInt( res, 10 ) * 1000;
    } else if ( string[ string.length -1 ] === 'M' ) {
        return parseInt( res, 10 ) * 1000000;
    } else if ( string[ string.length -1 ] === 'B' ) {
        return parseInt( res, 10 ) * 1000000000;
    } else {
        return parseInt( res, 10 );
    }
}
function getDivided( num, max ) {
    var digit = 1;
    var maxDigit = max;
    if( max === 0 ) {
        return 0;
    }

    num = Math.round( num );
    var temp = num;
    while( temp >= 10 ) {
        temp = temp / 10;
        digit += 1;
    }

    var divided = 0;

    if( digit > maxDigit ) {
        digit -= 3;
        divided = 1;
        if( digit > maxDigit ) {
            digit -= 3;
            divided = 2;
            if( digit > maxDigit ) {
                divided = 3;
            }
        }
    }

    return divided;
}
var isValidObject = function( obj ) {
    return cc.isUndefined( obj ) === false && obj !== null;
};
var countLabelBase = function( label, initValue, toValue, delay, duration, maxDigit, callback, prefix, postfix, pointNum ) {
    prefix = prefix || '';
    postfix = postfix || '';
    pointNum = pointNum || 0;

    if( !!maxDigit ) {
        label.setString( prefix + bigNumberToString( initValue, maxDigit, pointNum ) + postfix );
    }
    else {
        label.setString( prefix + toLocale( initValue ) + postfix );
    }

    var currentValue = initValue;
    var tick = (toValue - initValue) / RockN.Framerate / duration;
    var frameCount = 0;
    RockN.schedule( label, function( dt ) {
        if( dt ) {
            frameCount++;
            if( frameCount === 1 ) {
                // skip first frame when delay is larger than 0
                return;
            }

            var finish = false;
            currentValue += tick * RockN.Framerate * dt;
            if( (currentValue >= toValue && (toValue >= initValue)) ||
                (currentValue <= toValue && (toValue <= initValue)) ) {
                currentValue = toValue;
                finish = true;
            }

            if( !!maxDigit ) {
                label.setString( prefix + bigNumberToString( currentValue, maxDigit, pointNum ) + postfix );
            }
            else {
                label.setString( prefix + toLocale( currentValue ) + postfix );
            }

            if( finish ) {
                label.unscheduleAllCallbacks();
                if( typeof callback === 'function' ) {
                    callback();
                }
            }
        }
    }, 0, cc.REPEAT_FOREVER, delay );
};
RockN.UIUtil.addSliderToScrollView = function(slider, scrollView){

    var direction = scrollView.getDirection();
    slider.addEventListener(function(sender,type){
        if (type === ccui.Slider.EVENT_PERCENT_CHANGED)	{
            var percent = sender.getPercent();

            if (ccui.ScrollView.DIR_VERTICAL === direction)	{
                scrollView.jumpToPercentVertical(percent);
            }
            else if (ccui.ScrollView.DIR_HORIZONTAL === direction)	{
                scrollView.jumpToPercentHorizontal(100-percent);
            }
        }
    }, this);

    scrollView.addEventListener(function (sender, event) {

        if (event === ccui.ScrollView.EVENT_SCROLLING||
            event === ccui.ScrollView.EVENT_AUTOSCROLL_ENDED||
            event === ccui.ScrollView.EVENT_CONTAINER_MOVED ){

            var posScrInnerCon = scrollView.getInnerContainerPosition();
            var sizeScrInnerCon =scrollView.getInnerContainerSize();
            var sizeScrView = scrollView.getContentSize();
            var temp, percent;
            if (ccui.ScrollView.DIR_VERTICAL === direction)	{
                temp     = sizeScrView.height - sizeScrInnerCon.height;
                if( temp === 0 )
                    return;
                percent = ( 100 ) / ( -temp) * ( posScrInnerCon.y - temp );
                slider.setPercent(cc.clampf(percent, 0, 100));
            }
            else if (ccui.ScrollView.DIR_HORIZONTAL === direction)	{
                temp     = sizeScrView.width - sizeScrInnerCon.width;
                if( temp === 0 )
                    return;
                percent = ( 100 ) / ( -temp) * ( posScrInnerCon.x - temp );
                slider.setPercent(cc.clampf(percent, 0, 100));
            }
        }

    });

};

// Sounds
var SoundControl = SoundControl || {};
SoundControl.getInstance = function(){
    return SoundControl;
};
SoundControl.playEffect = function(){
    return;
};
SoundControl.playMusic = function(){
    return;
};

