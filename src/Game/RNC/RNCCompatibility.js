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

