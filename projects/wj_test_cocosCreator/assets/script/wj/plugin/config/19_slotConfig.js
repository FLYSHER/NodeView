/**
 * Created by Kilsoo on 2016-07-19.
 */

/**
 * Lobby & Lounge Slot Order Index
 * */

//윈패널 블랙리스트로 교채 더이상 추가하지 말것
var WINPANEL_BLACKLIST = [11, 28, 55, 58, 23, 17, 54, 41, 62, 45, 66, 47, 59, 15,  8, 34, 19, 25, 43, 21, 9, 39, 31, 30, 10, 20, 13, 4, 36, 22, 2, 29, 6, 5, 3, 7];

// 신규유저를 위한 슬롯 엔트리 세팅
var NEW_USER_ABTEST = {
    NONE: 0,
    FD: 1,
    MP: 3,
    GML: 21
};


var TOTALPAY_DEFAULT_HEIGHT = 69;

//모바일에서는 typifyName 사용하지 않음. 21.06.28
var NormalSlots = [
    {
        id              : 274,
        gameTitle       : 'Lamps Of Fortune',
        gameName        : 'lampsOfFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 88, 'y': 112, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 88, 'y': 86, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.75, x :  0, y :   7 }, // oldWeb
            { scale : 0.62, x :  0, y :  43 }, // newWeb
            { scale : 0.99, x :  0, y :  30 }, // mobile-phone
            { scale : 0.73, x :  0, y :  34 }, // mobile-pad
            { scale : 0.61, x :  0, y :  48 }, // lite-web-wide
            { scale : 0.64, x :  0, y :  52 }  // lite-web-pad
        ]
    },
    {
        id              : 275,
        gameTitle       : 'Kings Fury',
        gameName        : 'kingsFury',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 106, 'digit' : 10, 'color' : [ 255,255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.77, x :  0, y :  8 }, // oldWeb
            { scale : 0.63, x :  0, y : 43 }, // newWeb
            { scale : 1.00, x :  0, y : 32 }, // mobile-phone
            { scale : 0.76, x :  0, y : 31 }, // mobile-pad
            { scale : 0.62, x :  0, y : 50 }, // lite-web-wide
            { scale : 0.65, x :  0, y : 53 }  // lite-web-pad
        ]
    },
    {
        id              : 273,
        gameTitle       : 'Golden Egg Drop Deluxe',
        gameName: 'goldenEggDropDeluxe',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1.00, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 20}, // newWeb
            {scale: 1.03, x: 0, y: 18}, // mobile-phone
            {scale: 0.89, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id              : 271,
        gameTitle       : 'Little Wizard Jackpots',
        gameName        : 'littleWizardJackpots',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  10 }, // newWeb
            { scale : 1.00, x :  0, y :  10 }, // mobile-phone
            { scale : 0.9, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id: 272,
        gameTitle: 'Statues\' Secrets',
        gameName: 'statuesSecrets',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 85, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  16 }, // newWeb
            { scale : 1.05, x :  0, y :  20 }, // mobile-phone
            { scale : 0.92, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 270,
        gameTitle       : 'Golden Koi',
        gameName        : 'goldenKoi',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 85, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y :   7 }, // oldWeb
            { scale : 0.63, x :  0, y :  43 }, // newWeb
            { scale : 0.99, x :  0, y :  25 }, // mobile-phone
            { scale : 0.72, x :  0, y :  25 },  // mobile-pad
            { scale : 0.62, x :  0, y :  47 }, // lite-web-wide
            { scale : 0.64, x :  0, y :  52 }  // lite-web-pad
        ]
    },
    {
        id              : 269,
        gameTitle       : 'Super Bunny Bank',
        gameName        : 'superBunnyBank',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 88, 'y': 108, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 88, 'y': 82, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 88, 'y': 56, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 0.78, x: 0, y: 17}, // oldWeb
            {scale: 0.64, x: 0, y: 51}, // newWeb
            {scale: 1.00, x: 0, y: 37}, // mobile-phone
            {scale: 0.72, x: 0, y: 40},  // mobile-pad
            {scale: 0.63, x: 0, y: 56}, // lite-web-wide
            {scale: 0.66, x: 0, y: 59}  // lite-web-pad
        ]
    },
    {
        id              : 268,
        gameTitle       : 'Pirate Parade',
        gameName        : 'pirateParade',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1.00, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 13}, // newWeb
            {scale: 1.05, x: 0, y: 13}, // mobile-phone
            {scale: 0.95, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id: 267,
        gameTitle: 'Fortune Meow',
        gameName: 'fortuneMeow',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 117, 'digit': 9, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  22 }, // newWeb
            { scale : 1.00, x :  0, y :  20 }, // mobile-phone
            { scale : 0.93, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 266,
        gameTitle       : 'Legendary Vikings',
        gameName        : 'legendaryVikings',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 0.91, x :  0, y :  14 }, // newWeb
            { scale : 1.05, x :  0, y :  18 }, // mobile-phone
            { scale : 0.88, x :  0, y :   7 }  // mobile-pad
        ]
    },
    {
        id              : 265,
        gameTitle       : 'Wicked Cauldrons',
        gameName        : 'wickedCauldrons',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 88, 'y': 112, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 88, 'y': 86, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 88, 'y': 60, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 0.75, x: 0, y: 5},  // oldWeb
            {scale: 0.63, x: 0, y: 43}, // newWeb
            {scale: 0.98, x: 0, y: 22}, // mobile-phone
            {scale: 0.78, x: 0, y: 35}, // mobile-pad
            {scale: 0.61, x: 0, y: 49}, // lite-web-wide
            {scale: 0.64, x: 0, y: 53}  // lite-web-pad
        ]
    },
    {
        id              : 264,
        gameTitle       : 'Hoggyween',
        gameName: 'hoggyween',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 15 }, // newWeb
            { scale : 1.00, x : 0, y : 8 }, // mobile-phone
            { scale : 0.88, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 263,
        gameTitle       : 'Million Dollar Chickens',
        gameName        : 'millionDollarChickens',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 87, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.80, x :  0, y :  27 }, // oldWeb
            { scale : 0.646, x :  0, y : 58 }, // newWeb
            { scale : 1.00, x :  0, y :  38 }, // mobile-phone
            { scale : 0.79, x :  0, y :  49 },  // mobile-pad
            { scale : 0.64, x :  0, y :  65 },  // lite-web-wide
            { scale : 0.67, x :  0, y :  70 }  // lite-web-pad
        ]
    },
    {
        id              : 262,
        gameTitle       : 'Double Sunrise Lock',
        gameName        : 'doubleSunriseLock',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 74, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 50, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 0.93, x :  0, y :   7 }, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.90, x :  0, y : -10 }  // mobile-pad
        ]
    },
    {
        id              : 261,
        gameTitle       : 'Golden Case',
        gameName        : 'goldenCase',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y : -54 }, // oldWeb
            { scale : 0.65, x :  0, y :  -1 }, // newWeb
            { scale : 0.98, x :  0, y : -46 }, // mobile-phone
            { scale : 0.78, x :  0, y : -12 },  // mobile-pad
            { scale : 0.64, x :  0, y :   6 },  // lite-web-wide
            { scale : 0.67, x :  0, y :   7 }  // lite-web-pad
        ]
    },
    {
        id              :  260,
        gameTitle       : 'Hercules Saga',
        gameName        : 'herculesSaga',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 0.98, x :  0, y :  20 }, // mobile-phone
            { scale : 0.90, x :  0, y :  5 }  // mobile-pad
        ]
    },
    {
        id              : 259,
        gameTitle       : 'Gorgons Glare',
        gameName        : 'gorgonsGlare',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 30 }, // mobile-phone
            { scale : 0.88, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 258,
        gameTitle       : 'Zoom Zoom Double',
        gameName        : 'zoomZoomDouble',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 108, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y : -61 }, // oldWeb
            { scale : 0.67, x :  0, y :  -1 }, // newWeb
            { scale : 0.97, x :  0, y : -75 }, // mobile-phone
            { scale : 0.76, x :  0, y : -42 }, // mobile-pad
            { scale : 0.65, x :  0, y :   4 },  // lite-web-wide
            { scale : 0.68, x :  0, y :   6 }  // lite-web-pad
        ]
    },
    {
        id              : 257,
        gameTitle       : 'Shark Rush',
        gameName        : 'sharkRush',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.02, x :  0, y :  18 }, // newWeb
            { scale : 1.07, x :  0, y :  16 }, // mobile-phone
            { scale : 0.95, x :  0, y :  11 }  // mobile-pad
        ]
    },
    {
        id              : 256,
        gameTitle       : 'Rose In Gold',
        gameName        : 'roseInGold',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  20 }, // newWeb
            { scale : 1.08, x :  0, y :  20 }, // mobile-phone
            { scale : 0.94, x :  0, y :  0 }  // mobile-pad
        ]
    },
{
        id              : 255,
        gameTitle       : 'Boardwalk Bonanza',
        gameName        : 'boardwalkBonanza',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 22 }, // newWeb
            { scale : 1.00, x : 0, y : 26 }, // mobile-phone
            { scale : 0.91, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 254,
        gameTitle       : 'Hippo Bank Blast',
        gameName        : 'hippoBankBlast',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.93, x :  0, y :  2 }, // newWeb
            { scale : 0.96, x :  0, y :-11 }, // mobile-phone
            { scale : 0.93, x :  0, y :  1 }  // mobile-pad
        ]
    },
    {
        id              : 253,
        gameTitle       : 'Royal Dragons',
        gameName        : 'royalDragons',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  4 }, // newWeb
            { scale : 1.04, x :  0, y :  13 }, // mobile-phone
            { scale : 0.87, x :  0, y :  17 },  // mobile-pad
        ]
    },
    {
        id              : 252,
        gameTitle       : 'neko Fortune',
        gameName        : 'nekoFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 30 }, // newWeb
            { scale : 1.05, x : 0, y : 14 }, // mobile-phone
            { scale : 0.9, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 251,
        gameTitle       : 'Tiki Frenzy',
        gameName        : 'tikiFrenzy',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :125, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 99, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 73, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  18 }, // newWeb
            { scale : 0.98, x :  0, y :  13 }, // mobile-phone
            { scale : 0.88, x :  0, y :  13 }  // mobile-pad
        ]
    },
    {
        id              : 250,
        gameTitle       : 'Ancient Treasure',
        gameName        : 'ancientTreasures',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 0.96, x :  0, y :  -1 }, // mobile-phone
            { scale : 0.88, x :  0, y :  -13 }  // mobile-pad
        ]
    },
    {
        id              : 249,
        gameTitle       : 'Lock & Loot',
        gameName        : 'lockNLoot',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  22 }, // newWeb
            { scale : 1.03, x :  0, y :  12 }, // mobile-phone
            { scale : 0.88, x :  0, y :  8 }  // mobile-pad
        ]
    },
    {
        id              : 248,
        gameTitle       : 'Drake And Cake',
        gameName        : 'drakeAndCake',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  20 }, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.94, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 247,
        gameTitle       : 'GenieCatsWish',
        gameName        : 'genieCatsWish',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 11 }, // mobile-phone
            { scale : 0.94, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 244,
        gameTitle       : 'The Great Foxby',
        gameName        : 'theGreatFoxby',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 66, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 0.98, x :  0, y :  2 }, // mobile-phone
            { scale : 0.86, x :  0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 243,
        gameTitle       : 'Biggy Piggy Trio',
        gameName        : 'biggyPiggyTrio',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :107, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.63, x :  0, y :  0 }, // oldWeb
            { scale : 0.50, x :  0, y : 39 }, // newWeb
            { scale : 0.80, x :  0, y :  6 }, // mobile-phone
            { scale : 0.60, x :  0, y : 10 }, // mobile-pad
            { scale : 0.49, x :  0, y : 43 }, // lite-web-wide
            { scale : 0.52, x :  0, y : 50 } // lite-web-pad
        ]
    },
    {
        id              : 242,
        gameTitle       : 'RodeoRush',
        gameName        : 'rodeoRush',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 105, 'digit' : 9, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  14 }, // newWeb
            { scale : 1.00, x :  0, y :  14 }, // mobile-phone
            { scale : 0.82, x :  0, y :  11 }  // mobile-pad
        ]
    },
    {
        id              : 240,
        gameTitle       : 'Magical Coin',
        gameName        : 'magicalCoin',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.9, x :  0, y :  20 }, // newWeb
            { scale : 1.01, x :  0, y :  10 }, // mobile-phone
            { scale : 0.9, x :  0, y :  5 }  // mobile-pad
        ]
    },
    {
        id              : 241,
        gameTitle       : 'Mystical Blossoms',
        gameName        : 'mysticalBlossoms',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.98, x : 0, y : 5 }, // newWeb
            { scale : 1.08, x : 0, y : 22 }, // mobile-phone
            { scale : 0.89, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 239,
        gameTitle       : 'Catch And Win Bonanza',
        gameName        : 'catchAndWinBonanza',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 118, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 66, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 1.00, x :  0, y :  16 }, // newWeb
            { scale : 1.00, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 238,
        gameTitle       : 'Chicky Chicky Parade',
        gameName        : 'chickyChickyParade',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 105, 'digit' : 9, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  2 }, // newWeb
            { scale : 1.02, x :  0, y :  9 }, // mobile-phone
            { scale : 0.86, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 237,
        gameTitle       : 'Rabbits Trail',
        gameName        : 'rabbitsTrail',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 105, 'digit' : 9, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.90, x :  0, y : 25 }, // newWeb
            { scale : 0.95, x :  0, y : 15 }, // mobile-phone
            { scale : 0.85, x :  0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 236,
        gameTitle       : 'The Fairy Grove',
        gameName        : 'theFairyGrove',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 0.97, x : 0, y : 9 }, // mobile-phone
            { scale : 0.9, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 235,
        gameTitle       : 'Disco Night Party',
        gameName        : 'discoNightParty',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.02, x : 0, y : 21 }, // newWeb
            { scale : 1.04, x : 0, y : 19 }, // mobile-phone
            { scale : 0.97, x : 0, y : 24 },  // mobile-pad
        ],
    },
    {
        id              : 234,
        gameTitle       : 'Sweety Hammy',
        gameName        : 'sweetyHammy',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  25 }, // newWeb
            { scale : 1.07, x :  0, y :  20 }, // mobile-phone
            { scale : 0.92, x :  0, y :  25 }  // mobile-pad
        ]
    },
    {
        id              : 233,
        gameTitle       : 'Money Express',
        gameName        : 'moneyExpress',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 100,  'digit' : 9,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.97, x :  0, y : 19 }, // newWeb
            { scale : 0.97, x :  0, y : 14 }, // mobile-phone
            { scale : 0.89, x :  0, y :-11 }  // mobile-pad
        ]
    },
    {
        id              : 232,
        gameTitle       : 'Hustlin Hounds',
        gameName        : 'hustlinHounds',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 16 }, // newWeb
            { scale : 0.97, x : 0, y : -1 }, // mobile-phone
            { scale : 0.9, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 229,
        gameTitle       : 'Jurassic Trio',
        gameName        : 'jurassicTrio',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 81, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 57, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 20 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.92, x : 0, y : 25 },  // mobile-pad
        ],
    },
    {
        id              : 228,
        gameTitle       : 'Wizard\'s Potion Shop',
        gameName        : 'wizardsPotionShop',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 116, 'digit' : 10,'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 90,  'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 63,  'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  23 }, // newWeb
            { scale : 1.04, x :  0, y :  22 }, // mobile-phone
            { scale : 0.89, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 227,
        gameTitle       : 'Party Crashers',
        gameName        : 'partyCrashers',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 116, 'digit' : 10,'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 90,  'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 63,  'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 19 }, // newWeb
            { scale : 1.03, x :  0, y : 10 }, // mobile-phone
            { scale : 0.90, x :  0, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 225,
        gameTitle       : 'Lockin Piggy',
        gameName        : 'lockinPiggy',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 3 }, // mobile-phone
            { scale : 0.9, x : 0, y : 4 }  // mobile-pad
        ]
    },
    {
        id              : 226,
        gameTitle       : 'Monster Prison',
        gameName        : 'monsterPrison',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 91, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 10 }, // newWeb
            { scale : 1.01, x : 0, y : 4 }, // mobile-phone
            { scale : 0.92, x : 0, y : 10 },  // mobile-pad
        ],
    },
    {
        id              : 224,
        gameTitle       : 'Doomed To Riches',
        gameName        : 'doomedToRiches',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.89, x :  0, y :  9 }  // mobile-pad
        ]
    },
    {
        id              : 223,
        gameTitle       : 'Horns And Halos',
        gameName        : 'hornsAndHalos',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.91, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 222,
        gameTitle       : 'Flavorful Five',
        gameName        : 'flavorfulFive',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : -1 }, // newWeb
            { scale : 1.05, x : 0, y : 10 }, // mobile-phone
            { scale : 0.89, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 221,
        gameTitle       : 'More Barrels More Fruits',
        gameName: 'moreBarrelsMoreFruits',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 11 }, // newWeb
            { scale : 1.03, x : 0, y : 10 }, // mobile-phone
            { scale : 0.87, x : 0, y : -16 }  // mobile-pad
        ]
    },
    {
        id: 220,
        gameTitle: 'Sharks Bounty',
        gameName: 'sharksBounty',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 86, 'y': 93, 'digit': 10, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 83, 'y': 69, 'digit': 9, 'color': [255, 160, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 80, 'y': 48, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.97, x : 0, y : 25 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.95, x : 0, y : 20 },  // mobile-pad
        ],
    },
    {
        id              : 219,
        gameTitle       : 'Grand Harvest',
        gameName        : 'GrandHarvest',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 73, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  21 }, // newWeb
            { scale : 1.00, x :  0, y :  24 }, // mobile-phone
            { scale : 0.89, x :  0, y :  18 }  // mobile-pad
        ]
    },
    {
        id              : 218,
        gameTitle       : 'Goldies Kingdom',
        gameName        : 'goldiesKingdom',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 95, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 20 }, // mobile-phone
            { scale : 0.94, x : 0, y : 1 },  // mobile-pad
        ]
    },
    {
        id              : 216,
        gameTitle       : 'Stellar Scatters',
        gameName        : 'stellarScatters',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 95, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 18 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.90, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 217,
        gameTitle       : 'RichesToRiches',
        gameName        : 'richesToRiches',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  11 }, // newWeb
            { scale : 1.05, x :  0, y :  15 }, // mobile-phone
            { scale : 0.88, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 990,
        gameTitle       : 'X-Flight',
        gameName        : 'xFlight',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.00, x : 0, y : 45 }, // newWeb
            { scale : 0.99, x : 0, y : 46 }, // mobile-phone
            { scale : 0.80, x : 0, y : 26 }  // mobile-pad
        ]
    },
    {
        id              : 215,
        gameTitle       : 'Book Of Cleos Secrets',
        gameName        : 'bookOfCleosSecrets',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 1.00, x :  0, y :  6 }, // mobile-phone
            { scale : 0.92, x :  0, y :  -11 }  // mobile-pad
        ]
    },
    {
        id              : 214,
        gameTitle       : 'Sweet Smash',
        gameName        : 'sweetSmash',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 108, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : -4 }, // newWeb
            { scale : 1.02, x : 0, y : 12 }, // mobile-phone
            { scale : 0.93, x : 0, y : 8 }  // mobile-pad
        ],
    },
    {
        id              : 213,
        gameTitle       : 'Sizzling Baskets',
        gameName        : 'sizzlingBaskets',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 8 }, // newWeb
            { scale : 1.05, x : 0, y : 16 }, // mobile-phone
            { scale : 0.91, x : 0, y : -3 }  // mobile-pad
        ]
    },
    {
        id              : 211,
        gameTitle       : 'Gummy Yummy Fiesta',
        gameName        : 'gummyYummyFiesta',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : -8 }, // newWeb
            { scale : 1.095, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -11 }  // mobile-pad
        ]
    },
    {
        id              : 212,
        gameTitle       : 'Drs Secret Lab',
        gameName        : 'drsSecretLab',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.03, x : 0, y : 12 }, // mobile-phone
            { scale : 0.90, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 210,
        gameTitle       : 'Cookie Crumb Adventure',
        gameName        : 'cookieCrumbAdventure',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 84, 'y' :107, 'digit' : 10, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 81, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 30 }, // newWeb
            { scale : 1.03, x : 0, y : 13 }, // mobile-phone
            { scale : 0.95, x : 0, y : 6 },  // mobile-pad
        ],
    },
    {
        id              : 209,
        gameTitle       : 'Helloween Party',
        gameName        : 'helloweenParty',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 25 }, // newWeb
            { scale : 1.05, x : 0, y : 17 }, // mobile-phone
            { scale : 0.93, x : 0, y : 20 }  // mobile-pad
        ],
    },
    {
        id              : 208,
        gameTitle       : 'All That Jazz',
        gameName        : 'allThatJazz',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 102, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.04, x : 0, y : 5 }, // newWeb
            { scale : 1.1, x : 0, y : 19 }, // mobile-phone
            { scale : 0.93, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 207,
        gameTitle       : 'Lucky Neko Parade',
        gameName        : 'luckyNekoParade',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.9, x : 0, y : -7 }, // newWeb
            { scale : 1.03, x : 0, y : 13 }, // mobile-phone
            { scale : 0.9, x : 0, y : -10 }  // mobile-pad
        ]
    },
    {
        id              : 206,
        gameTitle       : 'Potato Kingdom',
        gameName        : 'potatoKingdom',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.95, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 205,
        gameTitle       : 'Buzz Bonanza',
        gameName        : 'buzzBonanza',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 93, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 21 }, // newWeb
            { scale : 1.07, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : 10 }  // mobile-pad
        ],
    },
    {
        id              : 203,
        gameTitle       : 'Crazy Rich Pandas',
        gameName        : 'crazyRichPandas',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :104, 'digit' : 10, 'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 82, 'digit' : 9,  'color' : [ 255, 160, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 19 }, // newWeb
            { scale : 1.07, x : 0, y : 22 }, // mobile-phone
            { scale : 0.92, x : 0, y : 3 }  // mobile-pad
        ]
    },
    {
        id              : 204,
        gameTitle       : 'Master Chef',
        gameName        : 'masterChef',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :104, 'digit' : 10, 'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 82, 'digit' : 9,  'color' : [ 255, 160, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 20 }, // newWeb
            { scale : 1.02, x :  0, y : 10 }, // mobile-phone
            { scale : 0.90, x :  0, y :  12 }  // mobile-pad`
        ]
    },
    {
        id              : 201,
        gameTitle       : 'Beanstalk Bonanza',
        gameName        : 'beanstalkBonanza',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 43, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 27 }, // newWeb
            { scale : 1.06, x : 0, y : 16 }, // mobile-phone
            { scale : 0.93, x : 0, y : 9 }  // mobile-pad
        ]
    },
    {
        id              : 200,
        gameTitle       : 'Blazing Phoenix',
        gameName        : 'blazingPhoenix',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 94, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 15 }, // newWeb
            { scale : 1.05, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : 10 }  // mobile-pad
        ],
    },
    {
        id              : 202,
        gameTitle       : 'Golden Raffle',
        gameName        : 'goldenRaffle',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :104, 'digit' : 10, 'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 82, 'digit' : 9,  'color' : [ 255, 160, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.91, x :  0, y : 15 }, // newWeb
            { scale : 1.03, x :  0, y : 11 }, // mobile-phone
            { scale : 0.90, x :  0, y :  8 }  // mobile-pad`
        ]
    },
    {
        id              : 199,
        gameTitle       : 'Eternal Love',
        gameName        : 'eternalLove',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 94, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.93, x :  0, y :  10 }, // newWeb
            { scale : 1.06, x :  0, y :  20 }, // mobile-phone
            { scale : 0.9, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 198,
        gameTitle       : 'Colossal Zodiac',
        gameName        : 'colossalZodiac',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 103, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 82, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 62, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 21 }, // newWeb
            { scale : 1.04, x : 0, y : 16 }, // mobile-phone
            { scale : 0.95, x : 0, y : 20 }  // mobile-pad
        ],
    },
    {
        id              : 197,
        gameTitle       : 'Striking Gold',
        gameName        : 'strikingGold',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 15 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.90, x : 0, y : 0 }  // mobile-pad
        ],
    },
    {
        id              : 196,
        gameTitle       : 'Eggcellent Atelier',
        gameName        : 'eggcellentAtelier',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 94, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  11}, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 195,
        gameTitle       : 'Blasting Bulls',
        gameName        : 'blastingBulls',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.99, x : 0, y : 20 }, // newWeb
            { scale : 1.06, x : 0, y : 13 }, // mobile-phone
            { scale : 0.92, x : 0, y : 3 }  // mobile-pad
        ],
    },
    {
        id              : 193,
        gameTitle       : 'Alchemy Trio',
        gameName        : 'alchemyTrio',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 25 }, // newWeb
            { scale : 1.07, x : 2, y : 17 }, // mobile-phone
            { scale : 0.92, x : 5, y : 12 }  // mobile-pad
        ],
    },
    {
        id              : 194,
        gameTitle       : 'ShamknockOnWood',
        gameName        : 'ShamknockOnWood',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 100, 'digit' : 10,  'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 1.02, x :  0, y :  3 }, // mobile-phone
            { scale : 0.90, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 192,
        gameTitle       : 'PlushCarnival',
        gameName        : 'plushCarnival',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 100, 'digit' : 10,  'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 1.02, x :  0, y :  3 }, // mobile-phone
            { scale : 0.99, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 192,
        gameTitle       : 'PlushCarnival',
        gameName        : 'plushCarnival',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 100, 'digit' : 10,  'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 1.02, x :  0, y :  3 }, // mobile-phone
            { scale : 0.99, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 190,
        gameTitle       : 'Lucky Ignite',
        gameName        : 'luckyIgnite',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 107, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 79, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 52, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 28 }, // newWeb
            { scale : 1.035, x : 2, y : 8 }, // mobile-phone
            { scale : 0.89, x : 5, y : 12 }  // mobile-pad
        ],
    },
    {
        id              : 186,
        gameTitle       : 'Flippin Rich',
        gameName        : 'flippinRich',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 12 }, // newWeb
            { scale : 1, x : 0, y : 7 }, // mobile-phone
            { scale : 0.9, x : 0, y : 8 }  // mobile-pad
        ],
    },
    {
        id              : 187,
        gameTitle       : 'WickedBoosFamily',
        gameName        : 'wickedBoosFamily',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 132, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 106, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 80, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 19 }, // newWeb
            { scale : 1.06, x : 0, y : 15 }, // mobile-phone
            { scale : 0.91, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 184,
        gameTitle       : 'Wicked Fortune',
        gameName        : 'WickedFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.91, x : 0, y : 21 }, // newWeb
            { scale : 1.06, x : 0, y : 14 }, // mobile-phone
            { scale : 0.92, x : 0, y :  4 }  // mobile-pad
        ]
    },
    {
        id              : 185,
        gameTitle       : 'Diggy Crush',
        gameName        : 'diggyCrush',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 76, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 20 }, // newWeb
            { scale : 1.09, x : 0, y : 13 }, // mobile-phone
            { scale : 0.93, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 180,
        gameTitle       : 'Captain Hook Returns',
        gameName        : 'captainHookReturns',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : -4 }, // oldWeb
            { scale : 0.89, x : 0, y : 21 }, // newWeb
            { scale : 0.96, x : 0, y : 12 }, // mobile-phone
            { scale : 0.84, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 182,
        gameTitle       : 'Mythic Apples',
        gameName        : 'mythicApples',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.98, x : 0, y : -1 }, // oldWeb
            { scale : 0.92, x : 0, y : 24 }, // newWeb
            { scale : 1.06, x : 0, y : 13 }, // mobile-phone
            { scale : 0.9, x : 0, y : 14 }  // mobile-pad
        ],
    },
    {
        id              : 183,
        gameTitle       : 'White Fortune',
        gameName        : 'whiteFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.91, x : 0, y : 21 }, // newWeb
            { scale : 1.06, x : 0, y : 14 }, // mobile-phone
            { scale : 0.92, x : 0, y :  4 }  // mobile-pad
        ]
    },
    {
        id              : 181,
        gameTitle       : 'Calavera Parade',
        gameName        : 'calaveraParade',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 102, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 53, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.86, x : 0, y : 26 }, // newWeb
            { scale : 0.99, x : 0, y : 31 }, // mobile-phone
            { scale : 0.85, x : 0, y : 22 }  // mobile-pad
        ]
    },
    {
        id              : 179,
        gameTitle       : 'Peter Pan Begins',
        gameName        : 'peterPanBegins',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        // frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : -4 }, // oldWeb
            { scale : 0.89, x : 0, y : 21 }, // newWeb
            { scale : 0.96, x : 0, y : 12 }, // mobile-phone
            { scale : 0.84, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 178,
        gameTitle       : 'Fervor Circus',
        gameName        : 'fervorCircus',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 102, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 76, 'digit' :  9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 50, 'digit' :  8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.86, x : 0, y : 41 }, // newWeb
            { scale : 1.01, x : 0, y : 34 }, // mobile-phone
            { scale : 0.85, x : 0, y : 35 }  // mobile-pad
        ]
    },
    {
        id              : 177,
        gameTitle       : 'More More Acorns',
        gameName        : 'moreMoreAcorns',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 15 }, // oldWeb
            { scale : 0.91, x : 0, y : 34 }, // newWeb
            { scale : 1.02, x : 0, y : 34 }, // mobile-phone
            { scale : 0.93, x : 0, y : 9 }  // mobile-pad
        ]
    },
    {
        id              : 176,
        gameTitle       : 'SpookyMansion',
        gameName        : 'spookyMansion',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 94, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.87, x : 0, y : 17 }, // newWeb
            { scale : 1, x : 0, y : 34 }, // mobile-phone
            { scale : 0.84, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 174,
        gameTitle       : 'Legend Of The Jungle',
        gameName        : 'legendOfTheJungle',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 78, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.90, x : 0, y : 45 }, // newWeb
            { scale : 0.99, x : 0, y : 30 }, // mobile-phone
            { scale : 0.83, x : 0, y : 40 }  // mobile-pad
        ]
    },
    {
        id              : 173,
        gameTitle       : 'Triple Fortune',
        gameName        : 'tripleFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' :  9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' :  8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 5 }, // newWeb
            { scale : 1.05, x : 0, y : 15 }, // mobile-phone
            { scale : 0.91, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 175,
        gameTitle       : 'Rolling In Money Blast',
        gameName        : 'rollingInMoneyBlast',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 106, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 85, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 64, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 13 }, // newWeb
            { scale : 1.06,  x : 0, y : 15 },  // phone
            { scale : 0.938, x : 0, y : -7 }  // mobile-pad
        ]
    },
    {
        id              : 172,
        gameTitle       : 'Wild West : Gold Card',
        gameName        : 'wildWestGoldCard',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 76, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 32 }, // newWeb
            { scale : 1.09, x : 0, y : 21 }, // mobile-phone
            { scale : 0.91, x : 0, y : 24 }  // mobile-pad
        ]
    },
    {
        id              : 170,
        gameTitle       : 'Goblins Treasures',
        gameName        : 'goblinsTreasures',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.9, x: 0, y: 5}, // newWeb
            {scale: 1.02, x: 0, y: 10}, // mobile-phone
            {scale: 0.93, x: 0, y: 7}  // mobile-pad
        ]
    },
    {
        id              : 169,
        gameTitle       : 'Mr.Luckys Bakery',
        gameName        : 'mrLuckysBakery',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 102, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' :  9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 56, 'digit' :  8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 14 }, // newWeb
            { scale : 1.07, x : 0, y : 17 }, // mobile-phone
            { scale : 0.92, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 168,
        gameTitle       : 'Excalibur Sword Of Magic',
        gameName        : 'excaliburSwordOfMagic',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 80, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 53, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 16}, // newWeb
            {scale: 1.08, x: 0, y: 21}, // mobile-phone
            {scale: 0.94, x: 0, y: 4}  // mobile-pad
        ]
    },
    {
        id              : 167,
        gameTitle       : 'Panther Gold',
        gameName        : 'pantherGold',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 27}, // newWeb
            {scale: 1.08, x: 0, y: 27}, // mobile-phone
            {scale: 0.914, x: 0, y: 22}  // mobile-pad
        ]
    },
    {
        id              : 166,
        gameTitle       : 'Sherlock Mystery Card',
        gameName        : 'sherlockMysteryCard',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 80, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 53, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 16 }, // phone
            { scale : 0.92, x : 0, y :  8 } // pad
        ]
    },
    {
        id              : 165,
        gameTitle       : 'Frog Prince Magic',
        gameName        : 'frogPrinceMagic',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.94, x: 0, y: 18}, // newWeb
            {scale: 1.09, x: 0, y: 20}, // mobile-phone
            {scale: 0.924, x: 0, y: 8}  // mobile-pad
        ]
    },
    {
        id              : 164,
        gameTitle       : 'The Tale Of Cinderella',
        gameName        : 'theTaleOfCinderella',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 102, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 80, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 22 }, // mobile-phone
            { scale : 0.920, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 163,
        gameTitle       : 'El Toro Parade',
        gameName        : 'elToroParade',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 90, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 4}, // newWeb
            {scale: 1.07, x: 0, y: 11}, // mobile-phone
            {scale: 0.93, x: 0, y: -1}  // mobile-pad
        ]
    },
    {
        id              : 171,
        gameTitle       : 'Honey Beengo Splash',
        gameName        : 'honeyBeengoSplash',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 112, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 86, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 23}, // newWeb
            {scale: 1.06, x: 0, y: 22}, // mobile-phone
            {scale: 0.9, x: 0, y: 12}  // mobile-pad
        ]
    },
    {
        id              : 162,
        gameTitle       : 'Golden Piggy',
        gameName        : 'goldenPiggy',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :106, 'digit' : 10, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 80, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 56, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 6 }, // newWeb
            { scale : 1.03, x : 0, y : 3 }, // mobile-phone
            { scale : 0.920, x : 0, y : 0 }  // mobile-pad
        ]
    },

    {
        id              : 161,
        gameTitle       : 'Zeus Link And Hades Link',
        gameName        : 'zeusLinkAndHadesLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 75, 'digit' : 9, 'color' : [ 255, 160, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 9 }, // newWeb
            { scale : 1.10, x : 0, y : 18 }, // mobile-phone
            { scale : 0.930, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 160,
        gameTitle       : 'Bananza Coins',
        gameName        : 'bananzaCoins',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 15}, // newWeb
            {scale: 1.1, x: 0, y: 18}, // mobile-phone
            {scale: 0.93, x: 0, y: 7}  // mobile-pad
        ]
    },
    {
        id              : 158,
        gameTitle       : 'Hua Mei Bao Shi',
        gameName        : 'huaMeiBaoShi',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 96, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 73, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 5 },// phone
            { scale : 0.899, x : 0, y : -8 } // pad
        ]
    },
    {
        id              : 157,
        gameTitle       : 'Triple Me Treasures',
        gameName        : 'tripleMeTreasures',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :122, 'digit' : 10, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 97, 'digit' : 9,  'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 73, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 10 }, // newWeb
            { scale : 1.07, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 159,
        gameTitle       : 'Golden Egg Drop Hammer Time',
        gameName        : 'goldenEggDropHammerTime',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.89, x: 0, y: 0}, // newWeb
            {scale: 1.04, x: 0, y: 11}, // mobile-phone
            {scale: 0.879, x: 0, y: -5}  // mobile-pad
        ]
    },
    {
        id              : 156,
        gameTitle       : 'Go Catch Fish',
        gameName        : 'goCatchFish',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 90, 'digit' : 9, 'color' : [ 255, 160, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 65, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 9}, // newWeb
            {scale: 1.04, x: 0, y: 11}, // mobile-phone
            {scale: 0.927, x: 0, y: 4}  // mobile-pad
        ]
    },
    {
        id              : 155,
        gameTitle       : 'Golden Honey Pot',
        gameName        : 'goldenHoneyPot',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 72, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 19 }, // newWeb
            { scale : 1.07, x : 0, y : 16 }, // mobile-phone
            { scale : 0.937, x : 0, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 154,
        gameTitle       : 'The Magical Lupin',
        gameName        : 'theMagicalLupin',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 71, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 16 },// phone
            { scale : 0.89, x : 0, y :  6 } // pad
        ]
    },
    {
        id              : 153,
        gameTitle       : 'The DogFather',
        gameName        : 'theDogFather',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 92, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 13 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.9, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 145,
        gameTitle       : 'Bingo Mine',
        gameName        : 'bingoMine',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -265 }, // -- Web
            { 'x' : 0, 'y' : -265 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 9}, // newWeb
            {scale: 1.08, x: 0, y: 24}, // mobile-phone
            {scale: 0.9, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id              : 148,
        gameTitle       : 'Monster Parade Boost',
        gameName        : 'monsterParadeBoost',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: -2}, // newWeb
            {scale: 1.101, x: 0, y: 14}, // mobile-phone
            {scale: 0.91, x: 0, y: -11}  // mobile-pad
        ]
    },
    {
        id              : 150,
        gameTitle       : 'Sands Of Fortune',
        gameName        : 'sandsOfFortune',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' :  75, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 91, 'y' :  49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 30 }, // newWeb
            { scale : 1.091, x : 0, y : 25 }, // mobile-phone
            { scale : 0.914, x : 0, y : 10 }  // mobile-pad
        ]
    },

    {
        id              : 149,
        gameTitle       : 'Dragon Heart',
        gameName        : 'dragonHeart',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' :  86,  'digit' : 9,  'color' : [ 255, 160, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' :  63,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 22}, // newWeb
            {scale: 1.07, x: 0, y: 20}, // mobile-phone
            {scale: 0.96, x: 0, y: 10}  // mobile-pad
        ]
    },
    {
        id              : 146,
        gameTitle       : 'Aegis of the Goddess',
        gameName        : 'aegisOfTheGoddess',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 116, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: 22}, // newWeb
            {scale: 1.07, x: 0, y: 23}, // mobile-phone
            {scale: 0.89, x: 0, y: 10}  // mobile-pad
        ]
    },
    {
        id              : 151,
        gameTitle       : 'Draculas Den',
        gameName        : 'draculasDen',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 127, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 101, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' :  75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 11}, // newWeb
            {scale: 1.08, x: 0, y: 18}, // mobile-phone
            {scale: 0.94, x: 0, y: 12}  // mobile-pad
        ]
    },

    {
        id              : 152,
        gameTitle       : 'Witchs Den',
        gameName        : 'witchsDen',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 127, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 101, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' :  75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 11}, // newWeb
            {scale: 1.08, x : 0, y : 18}, // mobile-phone
            {scale: 0.94, x: 0, y: 12}  // mobile-pad
        ]
    },

    {
        id              : 144,
        gameTitle       : 'Golden Egg Drop',
        gameName        : 'goldenEggDrop',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 0 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.88, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 143,
        gameTitle       : 'Mayan Double Jackpot',
        gameName        : 'mayanDoubleJackpot',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 51, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 47, 'y' : 74,  'digit' : 9,  'color' : [ 255, 160, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 43, 'y' : 50,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -256 }, // -- Web
            { 'x' : 1, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        mobileAttr       : [
            { scale : 1.064, x : 0, y : 14 }, // phone
            { scale : 0.94, x : 0, y : 11 }  // pad
        ]
    },

    {
        id              : 139,
        gameTitle       : 'Monkey\'s Might',
        gameName        : 'monkeysMight',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 91, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        mobileAttr       : [
            { scale : 1.036, x : 0, y : 14 }, // phone
            { scale : 0.897, x : 0, y : 27 }  // pad
        ]
    },
    {
        id              : 138,
        gameTitle       : 'Jackpot Hammer Link',
        gameName        : 'jackpotHammerLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 120, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            // { 'x' : 87, 'y' : 69, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            // { 'x' : 84, 'y' : 42, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.026, x : 0, y : 10 }, // newWeb
            { scale : 1.026, x : 0, y : 10 }, // phone
            { scale : 0.897, x : 0, y :  2 }  // mobile-pad
        ]
    },

    {
        id              : 137,
        gameTitle       : 'Jungle\'s Treasure',
        gameName        : 'junglesTreasure',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -263 }, // -- Web
            { 'x' : 1, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 21 }, // newWeb
            { scale : 1.061, x : 0, y : 21 }, // phone
            { scale : 0.928, x : 0, y : 9 }  // mobile-pad
        ]
    },

    {
        id              : 136,
        gameTitle       : 'Merlins Magic Box',
        gameName        : 'MerlinsMagicBox',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 112, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 24 }, // newWeb
            { scale : 1.07, x : 0, y : 24 }, // mobile-phone
            { scale : 0.915, x : 0, y : 21 }  // mobile-pad
        ]
    },
    {
        id              : 135,
        gameTitle       : 'Shoot The Riches',
        gameName        : 'shootTheRiches',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',      //b, r, y, g, p
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 97, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 42, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 29 }, // newWeb
            { scale : 1.11, x : 0, y : 25 }, // phone
            { scale : 0.949, x : 0, y : 7 }  // mobile-pad
        ]
    },

    {
        id              : 133,
        gameTitle       : 'Three Wishes',
        gameName        : 'threeWishes',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 97,  'digit' : 10,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 13 }, // phone
            { scale : 0.928, x : 0, y : 12 } // pad
        ]
    },
    {
        id              : 134,
        gameTitle       : 'Fa Cai Pot Link',
        gameName        : 'faCaiPotLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 95, 'digit' : 9, 'color' : [ 255, 160, 0], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.04, x : 0, y : 13 }, // mobile-phone
            { scale : 0.911, x : 0, y : -8 }  // mobile-pad
        ]
    },
    {
        id              : 131,
        gameTitle       : 'Purrfect Bingo',
        gameName        : 'purrfectBingo',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 45, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.1, x : 0, y : 20 }, // phone
            { scale : 0.905, x : 0, y : -8 } // pad
        ]
    },
    {
        id              : 129,
        gameTitle       : 'Chili Fiesta',
        gameName        : 'chiliFiesta',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 91, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' : 65, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 41, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 18 }  // mobile-pad
        ]
    },

    {
        id              : 130,
        gameTitle       : 'Inferno VS Storm',
        gameName        : 'infernoVSStorm',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        socialSlotID    : 1,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -280 }, // -- Web
            { 'x' : 0, 'y' : -280 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.01, x : 0, y : 10 }, // phone
            { scale : 0.96, x : 0, y : 0 } // pad
        ],
        mobileRoomAttr       : [
            { scale : 0.96, x : 0, y : 5 }, // phone
            { scale : 0.96, x : 0, y : -1 } // pad
        ]
    },
    {
        id              : 128,
        gameTitle       : 'FuFu Diamond',
        gameName        : 'fuFuDiamond',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 123, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 100, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 5 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.920, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 126,
        gameTitle       : 'Legacy Of The Gods',
        gameName        : 'legacyOfTheGods',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' : 91, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 70, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -262 }, // -- Web
            { 'x' : 0, 'y' : -262 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 16 }, // phone
            { scale : 0.93, x : 0, y :  9 } // pad
        ]
    },

    {
        id              : 127,
        gameTitle       : 'Little Piggy Trio',
        gameName        : 'littlePiggyTrio',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 10 }, // phone
            { scale : 0.93, x : 0, y : 11 } // pad
        ]
    },
    {
        id              : 125,
        gameTitle       : 'Royal Diamond',
        gameName        : 'royalDiamonds',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 77, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 48, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 30 }, // newWeb
            { scale : 1.118, x : 0, y : 17 }, // phone
            { scale : 0.94, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 123,
        gameTitle       : 'Devils Vault',
        gameName        : 'devilsVault',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 117, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 22 }, // newWeb
            { scale : 1.088, x : 0, y : 18 }, // mobile-phone
            { scale : 0.933, x : 0, y : 31 }  // mobile-pad
        ]
    },
    {
        id              : 121,
        gameTitle       : 'WOJ Cash Stash',
        gameName        : 'wheelOfJackpotCS',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : -3 }, // phone
            { scale : 0.93, x : 0, y : -9 } // pad
        ]
    },
    {
        id              : 119,
        gameTitle       : 'Spooky Pumpkin',
        gameName        : 'spookyPumpkin',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 130, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 104, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 78, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 11}, // newWeb
            {scale: 1.0729, x: 0, y: 13}, // mobile-phone
            {scale: 0.922, x: 0, y: 0}  // mobile-pad
        ]
    },
    {
        id              : 122,
        gameTitle       : 'Penguin Frenzy',
        gameName        : 'penguinFrenzy',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 80, 'y' : 106, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 82, 'digit' :  8, 'color' :  [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 57, 'digit' :  7, 'color' :  [ 255, 255,  0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -301 }, // -- Web
            { 'x' : 0, 'y' : -301 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 27 }, // phone
            { scale : 0.96, x : 3, y : 24 } // pad
        ]
    },
    {
        id              : 117,
        gameTitle       : 'Honey Bee-ngo',
        gameName        : 'honeyBeengo',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 130, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 104, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 78, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 22 }, // newWeb
            { scale : 1.06, x : 0, y : 22 }, // phone
            { scale : 0.90, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 118,
        gameTitle       : 'Golden Bier',
        gameName        : 'goldenBeer',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 22 }, // newWeb
            { scale : 1.09,  x : 0, y : 15 }, // mobile-phone
            { scale : 0.945, x : 0, y : 4 }  // mobile-pad
        ]
    },
    {
        id              : 116,
        gameTitle       : 'Lucky Coin',
        gameName        : 'luckyCoin',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: 11}, // newWeb
            {scale: 1.04, x: 0, y: 7}, // mobile-phone
            {scale: 0.89, x: 0, y: -7}  // mobile-pad
        ]
    },
    {
        id              : 115,
        gameTitle       : 'Golden Lantern Link',
        gameName        : 'goldenLanternLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 13 }, // newWeb
            { scale : 1.08,  x : 0, y : 15 }, // mobile-phone
            { scale : 0.920, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 114,
        gameTitle       : 'Sugar Factory',
        gameName        : 'sugarFactory',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'y',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 52, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 12 }, // phone
            { scale : 0.93, x : 0, y : -2 } // pad
        ]
    },
    {
        id              : 113,
        gameTitle       : 'Solar and Lunar Link',
        gameName        : 'sunMoonLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 106, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 10 }, // newWeb
            { scale : 1.113,  x : 0, y : 27 },   // phone
            { scale : 0.91,  x : 0, y : -8 }  // -- pad
        ]
    },
    {
        id              : 111,
        gameTitle       : 'RNC Legends',
        gameName        : 'rncLegends',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 90, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.068,  x : 3, y : 21 }, // newWeb
            { scale : 1.068,  x : 3, y : 21 }, // mobile-phone
            { scale : 0.925,  x : 1, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 110,
        gameTitle       : 'Magic In Wonderland',
        gameName        : 'magicInWonderland',
        // typifyName      : 'LB_fplSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.09,  x : 0, y : 16 },
            { scale : 0.95,  x : 0, y : 12 }
        ]
    },
    {
        id              : 112,
        gameTitle       : 'Moon Festival Link',
        gameName        : 'moonFestivalLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 6 }, // newWeb
            { scale : 1.07,  x : 0, y : 18 }, // mobile-phone
            { scale : 0.896, x : 0, y : 3 }  // mobile-pad
        ]
    },
    {
        id              : 109,
        gameTitle       : 'MadLab',
        gameName        : 'MadLab',
        typifyName      : 'LB_mlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 126, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : -272 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04,  x : 0, y : 25 },
            { scale : 0.95, x : 0, y : 23 }
        ]
    },
    {
        id              : 106,
        gameTitle       : 'Fortune Mine Link',
        gameName        : 'goldRushLink',
        typifyName      : 'LB_grSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 120, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 92, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 64, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.075, x : 0, y : 15 },  // phone
            { scale : 0.96,   x : 0, y : 21 }   // pad
        ]
    },
    {
        id              : 105,
        gameTitle       : 'Mega Cash',
        gameName        : 'megaCash',
        typifyName      : 'LB_mcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 95, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 68, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 40, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.084, x : -1, y : 14 },  // phone
            { scale : 0.97,   x : 0, y : 8 }   // pad
        ]
    },
    {
        id              : 104,
        gameTitle       : 'Fortune Pot Link',
        gameName        : 'fortunePotLink',
        typifyName      : 'LB_fplSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 126, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 21 }, // newWeb
            { scale : 1.114, x : -1, y : 18 },  // phone
            { scale : 0.93, x : 0, y : 8 }  // mobile-pad
        ]
    },
    {
        id              : 103,
        gameTitle       : 'More More Gold',
        gameName        : 'moreMoreGold',
        // typifyName      : 'LB_hoSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -265 }, // -- Web
            { 'x' : 0, 'y' : -265 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 },   // oldWeb
            { scale : 0.96,  x : 0, y : -3 }, // newWeb
            { scale : 0.96,  x : 0, y : -3 }, // phone
            { scale : 0.96,  x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 101,
        gameTitle       : 'RollingInMoney',
        gameName        : 'rollingInMoney',
        // typifyName      : 'LB_fbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' :  91, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' :  68, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        slotOffset      : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr    : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 13 }, // newWeb
            { scale : 1.1,  x : 0, y : 13 },  // phone
            { scale : 0.940, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 100,
        gameTitle       : 'BankOfJackpot',
        gameName        : 'bankOfJackpot',
        typifyName      : 'LB_bjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 120, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 100, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.079,  x : -2, y : 17 },  // phone
            { scale : 0.918,  x : 0, y : -2 }   // pad
        ]
    },
    {
        id              : 99,
        gameTitle       : 'Piggy King',
        gameName        : 'piggyking',
        typifyName      : 'LB_pgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 80, 'y' : 85, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 55, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 17 }, // newWeb
            { scale : 1.049, x : 0, y : 15 }, // mobile-phone
            { scale : 0.900, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 97,
        gameTitle       : 'Midas Gold',
        gameName        : 'midasGold',
        // typifyName      : 'LB_hoSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr: [
            { scale: 1.062, x: 0, y: 19 },
            { scale: 1.0, x: 0, y: 17 }
        ]
    },
    {
        id              : 96,
        gameTitle       : 'Dragons Diamond',
        gameName        : 'dragonsDiamond',
        typifyName      : 'LB_ddSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.099,  x : 0, y : 15 },  // phone
            { scale : 0.96,  x : 0, y : 26 }   // pad
        ]
    },
    {
        id              : 98,
        gameTitle       : 'Fortune Blast',
        gameName        : 'fortuneBlast',
        typifyName      : 'LB_fbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 142, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 55, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.081,  x : 0, y : 15 },  // phone
            { scale : 0.91,  x : 0, y : -10 }   // pad
        ]
    },
    {
        id              : 95,
        gameTitle       : 'Mermaid Magic',
        gameName        : 'mermaidMagic',
        typifyName      : 'LB_mmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 60, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 37, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -257 }, // -- Web
            { 'x' : 0, 'y' : -257 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.1,  x : 0, y : 15 },  // phone
            { scale : 0.987,  x : -2, y : 22 }   // pad
        ]
    },
    {
        id              : 93,
        gameTitle       : 'Candy Connect Link',
        gameName        : 'candyConnectLink',
        typifyName      : 'LB_ccSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 142, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 17 }, // newWeb
            { scale : 1.07, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 90,
        gameTitle       : 'Mammoth Stampede',
        gameName        : 'mammothStampede',
        typifyName      : 'LB_mamSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -257 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 92, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 92, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10,  x : 0, y : 20 },  // phone
            { scale : 0.96,  x : 0, y : 8 }   // pad
        ]
    },
    {
        id              : 91,
        gameTitle       : 'Magical Jackpot',
        gameName        : 'JackpotMagic',
        typifyName      : 'LB_jmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 55, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 25, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08,  x : 0, y : 17 },  // phone
            { scale : 0.95,  x : 0, y :  6 }   // pad
        ]
    },
    {
        id              : 94,
        gameTitle       : 'Monster Parade',
        gameName        : 'monsterParade',
        typifyName      : 'LB_mpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 95, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 68, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : -1 }, // newWeb
            { scale : 1.08, x : 0, y : 9 }, // mobile-phone
            { scale : 0.89, x : 0, y : -33 }  // mobile-pad
        ]
    },
    {
        id              : 88,
        gameTitle       : 'Jackpot Queens',
        gameName        : 'jackpotQueens',
        typifyName      : 'LB_jqSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 66, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 40, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.15, x : 0, y : 0 },
            { scale : 1.0, x : 0, y : 0 }
        ]
    },
    {
        id              : 87,
        gameTitle       : 'Gold Moon Link',
        gameName        : 'goldMoonLink',
        typifyName      : 'LB_gmlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 104, 'digit' : 10 }
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.87, x : -6, y : 21 }, // newWeb
            { scale : 1.066, x : -6, y : 16 }, // mobile-phone
            { scale : 0.904, x : 2, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 86,
        gameTitle       : 'Burning Sun',
        gameName        : 'burningSun',
        typifyName      : 'LB_bsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 77, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06,  x : 0, y : 17 },  // phone
            { scale : 0.94,  x : 17, y : 7 }   // pad
        ]
    },
    {
        id              : 85,
        gameTitle       : 'Lunar Fortune',
        gameName        : 'lunarFortune',
        typifyName      : 'LB_lfSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.05, x : 0, y : 20 }, // -- phone
            { scale : 0.906,  x : 0, y : 9 }  // -- pad
        ]
    },
    {
        id              : 84,
        slotType        : 'video',
        gameTitle       : 'Wild Wild Zeus',
        gameName        : 'wildWildZeus',
        typifyName      : 'LB_wzSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            // { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0,  x : 0, y : 0 },  // phone
            { scale : 0.988,  x : 0, y : -6 }   // pad
        ]
    },
    {
        id              : 83,
        gameTitle       : 'Vegas Diamond',
        gameName        : 'vegasDiamond',
        typifyName      : 'LB_vdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        // mobileAttr       : [
        //     { scale : 1.13, x : 0, y : 22 }, // -- phone
        //     { scale : 0.92, x : 0, y :  2 }  // -- pad
        // ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.13, x : 0, y : 22 }, // newWeb
            { scale : 1.13, x : 0, y : 22 }, // mobile-phone
            { scale : 0.92, x : 0, y : 2 }  // mobile-pad
        ]
    },
    {
        id              : 82,
        slotType        : 'video',
        gameTitle       : 'DiamondCats',
        gameName        : 'diamondCats',
        typifyName      : 'LB_wzSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 77, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10,  x : 0, y : 40 },  // phone
            { scale : 0.93,  x : 0, y : 29 }   // pad
        ]
    },

    {
        id              : 79,
        slotType        : 'video',
        gameTitle       : 'Treasure Of Oz',
        gameName        : 'TreasureOfOz',
        typifyName      : 'LB_toSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 2, y : 37 - 7 },
            { scale : 0.94, x : 0, y : -4 }
        ],
        totalPayHeight : 69,
    },
    {
        id              : 77,
        slotType        : 'video',
        gameTitle       : 'Indiana Coins',
        gameName        : 'indianaCoins',
        typifyName      : 'LB_icSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 135, 'digit' : 14, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.933, x : 0, y : 4 },
            { scale : 0.96, x : 0, y : -17 }
        ]
    },
    {
        id               : 75,
        slotType         : 'video',
        gameTitle        : 'Bison Gold',
        gameName         : 'BisonGold',
        typifyName       : 'LB_bgSlotEntryAR',
        normalAnimation  : 'normal',
        overAnimation    : 'Over',
        matchAnimation   : 'match',
        lockedAnimation  : 'lock',
        isOpen           : true,
        frameColor      : 'r',
        jackpotNotiAttr  : [
            // { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.09, x : 0, y : 14 },
            { scale : 0.95, x : 0, y : 0 }
        ]
    },

    {
        id              : 73,
        slotType        : 'classic',
        gameTitle       : 'Shark Parade',
        gameName        : 'sharkParade',
        typifyName      : 'LB_spSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 60, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 36, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 20 }, // phone
            { 'x' : 0, 'y' : 5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : 0 },
            { scale : 1.0, x : 0, y : 20 }
        ]
    },

    {
        id              : 72,
        gameTitle       : 'Pharaoh Wilds',
        gameName        : 'pharaohWilds',
        typifyName      : 'LB_pwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 105, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 20 },
            { scale : 0.961, x : 0, y : 18 }
        ],
        totalPayHeight : 75
    },
    {
        id              : 70,
        gameTitle       : 'Fortune Panda',
        gameName        : 'fortunePanda',
        typifyName      : 'LB_fpdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 12 }, // phone
            { 'x' : 0, 'y' : 0 - 12 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 30 },
            { scale : 0.97, x : 0, y : 45 }
        ],
        totalPayHeight : 69
    },
    {
        id              : 69,
        slotType        : 'classic',
        gameTitle       : 'F.D JackpotReel',
        gameName        : 'fortuneDiamondJackpotReel',
        typifyName      : 'LB_fjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166 - 57, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 20 }, // phone
            { 'x' : 0, 'y' : 0 - 12 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.01, x : 0, y : 32},
            { scale : 1.001, x : 0, y : 23 }
        ],
        totalPayHeight : 69
    },
    {
        id              : 68,
        gameTitle       : 'All Star',
        gameName        : 'AllStar',
        typifyName      : 'LB_asSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166 - 80, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 12, 'y' : 142 - 80, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 14, 'y' : 119 - 80, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 24 }, // phone
            { 'x' : 0, 'y' : 0 - 24 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 2, y : 37 },
            { scale : 1.0, x : 0, y : 45 }
        ],
        totalPayHeight : 69,
    },

    {
        id              : 67, // Santa's Gifts
        gameTitle       : 'Santas Gifts',
        gameName        : 'santasGifts',
        typifyName      : 'LB_sgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 74 + 14, 'y' : 102 - 7, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 12, 'y' : 78 - 7 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 12, 'y' : 55 - 7, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -280 }, // -- Web
            { 'x' : 2, 'y' : -280 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.97, x : 0, y : 40 }, // newWeb
            { scale : 1.04, x : 0, y : 32 }, // mobile-phone
            { scale : 0.91, x : 0, y : 16 }  // mobile-pad
        ]
    },

    {
        id              : 66,
        gameTitle       : 'Treasure Island',
        gameName        : 'TreasureIsland',
        typifyName      : 'LB_tiSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 8, 'y' : 142, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 8, 'y' : 119, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 10 }, // phone
            { 'x' : 0, 'y' : 0 - 22 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 31 },
            { scale : 0.96, x : 0, y : 40 }
        ],
        totalPayHeight : 75
    },
    {
        id              : 64,
        gameTitle       : 'Vampires Roses',
        gameName        : 'vampiresRoses',
        typifyName      : 'LB_vrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85 + 14, 'y' : 87 + 57, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82 + 8, 'y' : 65 + 52, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78 + 8, 'y' : 41 + 50, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 14 }, // phone
            { 'x' : 0, 'y' : 0 - 14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : 40 },
            { scale : 0.95, x : 0, y : 40 }
        ],
        totalPayHeight : 65
    },
    {
        id              : 59,
        gameTitle       : 'Jackpot Rush',
        gameName        : 'JackpotRush',
        typifyName      : 'LB_jrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 72 + 6, 'y' : 89, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 6, 'y' : 60, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 6, 'y' : 35, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : 0 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 37 },
            { scale: 1, x: 0, y: 50 }
        ]
    },
    {
        id              : 62,
        gameTitle       : 'Triple Wolf',
        gameName        : 'TripleWolf',
        typifyName      : 'LB_twSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 113, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 8, 'y' : 89, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 8, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 14 }, // phone
            { 'x' : 0, 'y' : 0 - 14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -252 }, // -- Web
            { 'x' : 2, 'y' : -252 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 47 },
            { scale : 0.93, x : 0, y : 43 }
        ]
    },
    {
        id              : 61,
        slotType        : 'video',
        gameTitle       : 'MrBillionaire',
        gameName        : 'mrBillionaire',
        typifyName      : 'LB_mrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 91, 'y' : 100 - 22 - 12 + 60, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 78 - 26 - 14 + 60, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 55 - 30 - 15 + 60, 'digit' : 7, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.02, x :  0, y :  44 }, // newWeb
            { scale : 1.02, x :  0, y :  44 }, // mobile-phone
            { scale : 0.92, x :  0, y :  29 }  // mobile-pad
        ]
    },
    {
        id              : 57,
        slotType        : 'classic',
        gameTitle       : 'Captain Shark',
        gameName        : 'CaptainShark',
        typifyName      : 'LB_csSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 91, 'y' : 100 - 22 - 15 + 10, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 78 - 26 - 14 + 10, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 55 - 30 - 11 + 10, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : - 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 37 },
            { scale : 0.91, x : 0, y : 2 }
        ]
    },
    {
        id              : 58,
        slotType        : 'video',
        gameTitle       : 'Fortune Tree',
        gameName        : 'fortuneTree',
        typifyName      : 'LB_ftSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 149 - 10, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 126 - 10, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 104 - 10, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 24 }, // phone
            { 'x' : 0, 'y' : 0 - 20}  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -276 }, // -- Web
            { 'x' : 0, 'y' : -276 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.95, x : 0, y : 40 },
            { scale : 0.95, x : 0, y : 40 }
        ]
    },
    {
        id              :  55,
        slotType        : 'video',
        gameTitle       : 'LuckyLamp',
        gameName        : 'LuckyLamp',
        typifyName      : 'LB_llSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 84, 'y' : 167, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 143, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 120, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 25 }, // phone
            { 'x' : 0, 'y' : 0 - 32 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -276 }, // -- Web
            { 'x' : 0, 'y' : -276 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 45 },
            { scale : 0.92, x : 0, y : 20 }
        ],
        totalPayHeight : 71
    },
    {
        id              : 56,
        slotType        : 'video',
        gameTitle       : 'Great Empire',
        gameName        : 'GreatEmpire',
        typifyName      : 'LB_gtSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 84, 'y' : 161, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 138, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 115, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0 - 3, 'y' : 0 - 7 }, // phone
            { 'x' : 0 - 3, 'y' : 0 - 5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 30 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 30 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -210 }, // -- Web
            { 'x' : 0, 'y' : -210 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 40 },
            { scale : 0.92, x : 0, y : 12 }
        ],
    },
    {
        id              : 54,
        slotType        : 'video',
        gameTitle       : 'Fishing Master2',
        gameName        : 'fishingMaster2',
        typifyName      : 'LB_fm2SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 74 + 6, 'y' : 102 + 70, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 6, 'y' : 78 + 70, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 6, 'y' : 55 + 71, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -16 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 5, 'width' : 150, 'height' : 96, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 5, 'width' : 150, 'height' : 96, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.99,     x : 0, y : 39 },
            { scale : 0.97,     x : 0, y : 44 }
        ],
    },
    {
        id              :  47,
        gameTitle       : 'GoldClovers',
        gameName        : 'goldenClovers',
        typifyName      : 'LB_gcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 87, 'digit' : 11, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 65, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 41, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -220 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 150, 'height' : 116, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 150, 'height' : 116, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y :42 },
            { scale : 0.98, x : 0, y : 40 }  // 640
        ],
    },
    {
        id              : 52,
        gameTitle       : 'Vegas Queens',
        gameName        : 'vegasQueens',
        typifyName      : 'LB_vqSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 87, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 65, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 41, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -240 }, // -- Web
            { 'x' : 2, 'y' : -240 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.94 ,    x : 0, y : 33 },
            { scale : 1,        x : 0, y : 30 }
        ],
        totalPayHeight : 67
    },
    {
        id              : 46,
        slotType        : 'classic',
        gameTitle       : 'Shining Link',
        gameName        : 'shiningDiamondLink',
        typifyName      : 'LB_dlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 131, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 108, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 85, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -40 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -280 }, // -- Web
            { 'x' : 0, 'y' : -280 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 142, 'height' : 116, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 142, 'height' : 116, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -170 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.11,     x : 0, y : 44 },
            { scale : 0.98,    x : 0, y : 16 }
        ],
    },
    {
        id              : 48,
        gameTitle       : 'Fairy Mischief',
        gameName        : 'fairyMischief',
        typifyName      : 'LB_fcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 58, 'y' : 129, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 2, 'y' : -240 }, // -- Web
            { 'x' : 2, 'y' : -240 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04,     x : 0, y : 55 },
            { scale : 1.03,     x : 0, y : 50 }
        ],
    },
    {
        id              :  45,
        gameTitle       : 'Fu Wa Fu bao',
        gameName        : 'FuWaFuBao',
        typifyName      : 'LB_ffSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 125,  'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 101 , 'digit' : 11, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 78,   'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05,     x : 0, y : 28 },
            { scale: 0.92, x: 0, y: 40 }
        ],
    },
    {
        id              : 43,
        slotType        : 'classic',
        gameTitle       : 'Ocean Link',
        gameName        : 'oceanLink',
        typifyName      : 'LB_olSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 69, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 41, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -40 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 141, 'height' : 120, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 141, 'height' : 120, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07,     x : 0, y : 43 },
            { scale : 1.01,     x : 0, y : 7 }
        ],
    },
    {
        id              : 42,
        slotType        : 'classic',
        gameTitle       : 'Big Money',
        gameName        : 'bigMoney',
        typifyName      : 'LB_bmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 71 + 6, 'y' : 100 - 43, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 63 + 6, 'y' : 78 - 43, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 56 + 6, 'y' : 54 - 43, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -35 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 9, 'y' : -232 }, // -- Web
            { 'x' : 9, 'y' : -232 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 3, 'row' : 3, 'width' : 224, 'height' : 98, 'xSpace' : 30 },
            { 'col' : 3, 'row' : 3, 'width' : 224, 'height' : 98, 'xSpace' : 30 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05,     x : 0, y : 37 },
            { scale : 0.95, x : 0, y : -22 }
        ],
    },
    {
        id              : 35,
        slotType        : 'classic',
        gameTitle       : 'Fortune Diamond',
        gameName        : 'fortuneDiamond',
        typifyName      : 'LB_fdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 149, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 126, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 104, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 0.9 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -50 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }, // -- Web
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -172 }, // -- Web
            { 'x' : 0, 'y' : -172 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12,     x : 0, y : 43 },
            { scale : 1.01,     x : 0, y : -4 }
        ],
    },
    {
        id              : 44,
        slotType        : 'video',
        gameTitle       : 'Wild Wild Buffalo',
        gameName        : 'wildWildBuffalo',
        typifyName      : 'LB_wbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 155, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 152, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 152, 'height' : 130, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.85, x : 0, y : 47 }, // newWeb
            { scale : 0.94, x : 0, y : 50 }, // -- phone
            { scale : 0.90,  x : 0, y : 35 }  // -- pad
        ]
    },
    {
        id              : 41,
        slotType        : 'classic',
        gameTitle       : 'Gold Bar',
        gameName        : 'goldBar',
        typifyName      : 'LB_gbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 149, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 126, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 104, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 0.9 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -50 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 200, 'y' : 120 }, // -- Web
            { 'x' : 200, 'y' : 120 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -160 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 52 }, // 610
            { scale : 1.04, x : 0, y : 25 }  // 640
        ],
    },
    {
        id              :  50,
        slotType        : 'classic',
        gameTitle       : 'GoldSpin',
        gameName        : 'goldSpin',
        typifyName      : 'LB_gosSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 22, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : -2 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : -25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileAttr       : [
            { scale : 1.07,     x : 0, y : 8 }, // 610
            { scale : 0.93, x : 0, y : 30 }  // 640
        ],
    },
    {
        id              : 40,
        slotType        : 'video',
        gameTitle       : 'Pumpkin Pot',
        gameName        : 'pumpkinPot',
        typifyName      : 'LB_pkSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 71, 'y' : 100, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 63, 'y' : 78, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 56, 'y' : 54, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -260 }, // -- Web
            { 'x' : 2, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 143, 'height' : 85, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 143, 'height' : 85, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.02,     x : 0, y : 34 }, // 610
            { scale : 0.938, x : 0, y : 26 }  // 640
        ],
    },
    {
        id              : 39,
        slotType        : 'video',
        gameTitle       : 'Aloha Wheel Fever',
        gameName        : 'alohaWheel',
        typifyName      : 'LB_awSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 161, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }  // -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : -4, 'y' : -264 }, // -- Web
            { 'x' : -4, 'y' : -264 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 110, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 110, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 } // -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -250 }, // -- Web
            { 'x' : 0, 'y' : -250 }    // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04,     x : 0, y : 35 }, // 610
            { scale : 0.99, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 23,
        slotType        : 'classic',
        gameTitle       : 'Jackpot X-Mas',
        gameName        : 'jackpotXmas',
        typifyName      : 'LB_jxSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 70, 'digit' : 11 },
            { 'x' : 82, 'y' : 44, 'digit' : 11 },
            { 'x' : 76, 'y' : 17, 'digit' : 11 }
        ],
        offset          : 0,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -32 }, // phone
            { 'x' : 0, 'y' : -17 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -68 }, // -- Web
            { 'x' : 0, 'y' : -68 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : -19, 'y' : -239, 'g_x' : -110, 'g_y' : 20 }, // -- Web
            { 'x' : -19, 'y' : -239, 'g_x' : -110, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // Mobile Only
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -160 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -148 }, // -- Web
            { 'x' : 3, 'y' : -185 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 47 }, // newWeb
            { scale : 1.05, x : 0, y : 54 }, // -- phone
            { scale : 0.90, x : 0, y : 25 }  // -- pad
        ]
    },
    {
        id              : 14,
        slotType        : 'classic',
        gameTitle       : 'Wheel Of Jackpot',
        gameName        : 'wheelOfJackpot',
        entryLevel      : 0,
        arrangeOrder    : 5,
        typifyName      : 'LB_wjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            { 'x' : 56, 'y' : -39, 'digit' : 11, 'color' : [ 255, 160, 0 ] }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -25 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -62 }, // -- Web
            { 'x' : 0, 'y' : -62 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 49, 'g_x' : -145, 'g_y' : -275 }, // -- Web
            { 'x' : 0, 'y' : 49, 'g_x' : -145, 'g_y' : -275 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 187, 'height' : 58, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 187, 'height' : 58, 'xSpace' : 0 }
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -192 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1,     x : 0, y : 43 }, // 610
            { scale : 1.13 * 1.09, x : 0, y : 7 }  // 640
        ],
    },
    {
        id              : 28,
        slotType        : 'video',
        gameTitle       : 'Vegas Link',
        gameName        : 'vegasLink',
        typifyName      : 'LB_vlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 148, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 123, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 101, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : -2, 'y' : -56 }, // -- Web
            { 'x' : -2, 'y' : -56 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 109, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 109, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 36 }, // 610
            { scale : 0.98, x : 3, y : 39 }  // 640
        ],
    },
    {
        id              : 34,
        slotType        : 'video',
        gameTitle       : 'Diamond Wheel',
        gameName        : 'diamondWheel',
        typifyName      : 'LB_dwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 10, 'digit' : 9, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont },
            { 'x' : 80, 'y' : -15, 'digit' : 8, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont },
            { 'x' : 78, 'y' : -38, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 30 }, // -- Web
            { 'x' : 0, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 95, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 95, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07,     x : 0, y : 44 }, // 610
            { scale : 1, x : 0, y : 35 }  // 640
        ],
    },
    {
        id              : 12,
        slotType        : 'video',
        gameTitle       : 'Fortune pot',
        gameName        : 'fortune',
        entryLevel      : 0,
        arrangeOrder    : 10,
        typifyName      : 'LB_fpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -17 }, // phone
            { 'x' : 0, 'y' : -10 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -41 }, // -- Web
            { 'x' : 0, 'y' : -41 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 124, 'height' : 110 },
            { 'col' : 5, 'row' : 3, 'width' : 124, 'height' : 110 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -130 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -151 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.11, x : -1, y : 36 }, // 610
            { scale : 1.06, x : 0, y : 5 }  // 640
        ],
    },
    {
        id              : 11,
        slotType        : 'classic',
        gameTitle       : 'Shining Diamond',
        gameName        : 'shining',
        entryLevel      : 0,
        arrangeOrder    : 15,
        typifyName      : 'LB_sdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -32 }, // phone
            { 'x' : 0, 'y' : -10 }  // pad
        ],
        slotOffset           : [
            { 'x' : 3, 'y' : -68 }, // -- Web
            { 'x' : 3, 'y' : -68 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -110, 'g_y' : -217 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -110, 'g_y' : -217 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // Mobile Only
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [

            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -148 }, // -- Web
            { 'x' : 3, 'y' : -188 } // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.19, x : 0, y : 18 }, // 610
            { scale : 1.025, x : 0, y : -16 }  // 640
        ],
    },
    {
        id              : 18,
        slotType        : 'classic',
        gameTitle       : 'Fishing Master',
        gameName        : 'fishingMaster',
        entryLevel      : 0,
        arrangeOrder    : 25,
        typifyName      : 'LB_fmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 74, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -2 }, // phone
            { 'x' : 0, 'y' : 2 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -116 }, // -- Web
            { 'x' : 0, 'y' : -116 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -269, 'g_x' : -135, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -269, 'g_x' : -135, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 188, 'height' : 55, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 188, 'height' : 55, 'xSpace' : 0 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -163 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -200 }, // -- Web
            { 'x' : 3, 'y' : -207 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.14, x : 0, y : 60 }, // 610
            { scale : 1.031, x : 0, y : 28 }  // 640
        ],
    },
    {
        id              : 36,
        slotType        : 'video',
        gameTitle       : 'Queen of Riches',
        gameName        : 'queenOfRiches',
        typifyName      : 'LB_qrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 108, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 148, 'height' : 110, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 148, 'height' : 110, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.02, x : 0, y : 33 }, // 610
            { scale : 1, x : 0, y : 25 }  // 640
        ],
    },
    {
        id              : 29,
        slotType        : 'classic',
        gameTitle       : 'Dragon Rising',
        gameName        : 'dragonRising',
        typifyName      : 'LB_drSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 64, 'digit' : 12, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 37, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 11, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -6 }  // pad
        ],
        slotOffset       : [
            { 'x' : 1, 'y' : -76 }, // -- Web
            { 'x' : 1, 'y' : -76 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 20 }, // -- Web
            { 'x' : 6, 'y' : -253, 'g_x' : -195, 'g_y' : 20 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03,     x : 0, y : 40 }, // 610
            { scale : 1, x : 0, y : 30 }  // 640
        ],
    },
    {
        id              : 31,
        slotType        : 'classic',
        gameTitle       : 'Golden Eagle',
        gameName        : 'goldenEagle',
        typifyName      : 'LB_geSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 64 + 20, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 37 + 17, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 11 + 13, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -26 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 4 }, // -- Web
            { 'x' : 0, 'y' : 4 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 26 }, // -- Web
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 26 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 135, 'height' : 82, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 135, 'height' : 82, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 44 }, // 610
            { scale : 0.98, x : 0, y : 42 }  // 640
        ],
        totalPayHeight : 60
    },
    {
        id              : 24,
        slotType        : 'classic',
        gameTitle       : 'Hot Cash',
        gameName        : 'hotCash',
        typifyName      : 'LB_hcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 71, 'digit' : 11 },
            { 'x' : 79, 'y' : 45, 'digit' : 11 },
            { 'x' : 72, 'y' : 21, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -10 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -92 }, // -- Web
            { 'x' : 0, 'y' : -92 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -265, 'g_x' : -170, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -265, 'g_x' : -170, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -265
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 210, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 210, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -163 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -200 }, // -- Web
            { 'x' : 3, 'y' : -207 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 42 }, // 610
            { scale : 0.89, x : 0, y : -40 }  // 640
        ],
    },
    {
        id              : 30,
        slotType        : 'video',
        gameTitle       : 'King Of Savanna',
        gameName        : 'kingOfSavanna',
        typifyName      : 'LB_ksSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 127, 'digit' : 11 }
        ]		,
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -33 }, // -- Web
            { 'x' : 0, 'y' : -33 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 148, 'height' : 122, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 148, 'height' : 122, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -145 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -145 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 41 }, // 610
            { scale : 0.98, x : 0, y : 43 }  // 640
        ],
    },
    {
        id              : 26,
        slotType        : 'video',
        gameTitle       : 'Billionaire Piggy',
        gameName        : 'billionairePiggy',
        typifyName      : 'LB_bpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 57, 'y' : 121, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : -72, 'y' : 30 }, // -- Web
            { 'x' : -72, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 123, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 123, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1, x : 0, y : 35 }, // 610
            { scale : 0.9, x : 0, y : 25 }  // 640
        ],
        totalPayHeight : 65
    },
    {
        id              : 16,
        slotType        : 'classic',
        gameTitle       : 'Golden Sheep',
        gameName        : 'goldenSheep',
        entryLevel      : 0,
        arrangeOrder    : 30,
        typifyName      : 'LB_gsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ] },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ] }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -7 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : -95, 'y' : -77 },	// -- Web
            { 'x' : -95, 'y' : -77 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -135, 'g_y' : -245 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -135, 'g_y' : -245 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -177 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -177 }, // -- Web
            { 'x' : 0, 'y' : -205 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 43 }, // 610
            { scale : 1.03, x : 0, y : 28 }  // 640
        ],
    },
    {
        id              : 15,
        slotType        : 'classic',
        gameTitle       : 'WOJ Double7',
        gameName        : 'wjDoubleSeven',
        entryLevel      : 0,
        arrangeOrder    : 40,
        typifyName      : 'LB_wj2SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 70 + 19, 'y' : -4 + 24, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            { 'x' : 60 + 27, 'y' : -31 + 23, 'digit' : 11, 'color' : [ 255, 160, 0 ] },
            { 'x' : 60 + 22, 'y' : -31 - 3, 'digit' : 11, 'color' : [ 255, 255, 0 ] }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -27 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -32 }, // -- Web
            { 'x' : 0, 'y' : -32 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -230, 'g_x' : -156, 'g_y' : 20 }, // -- Web
            { 'x' : 0, 'y' : -230, 'g_x' : -156, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -255
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 186, 'height' : 55, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 186, 'height' : 55, 'xSpace' : 0 }
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -135 }, // -- Web
            { 'x' : 0, 'y' : -185 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : -99, y : -48 }, // 610
            { scale : 1.14, x : -61, y : -64 }  // 640
        ],
    },
    {
        id              : 8,
        slotType        : 'video',
        gameTitle       : 'Jackpot City',
        gameName        : 'jackpotCity',
        entryLevel      : 0,
        arrangeOrder    : 60,
        typifyName      : 'LB_jcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -5 }, // phone
            { 'x' : 0, 'y' : -8 }  // pad
        ],
        slotOffset       : [
            { 'x' : -55, 'y' : 0 }, // -- Web
            { 'x' : -55, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 112, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 112, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -175 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.15, x : 0, y : 32 }, // 610
            { scale : 0.96, x : 0, y : 26 }  // 640
        ],
    },
    {
        id              : 17,
        slotType        : 'classic',
        gameTitle       : 'Easter Jackpot',
        gameName        : 'easterJackpot',
        entryLevel      : 0,
        arrangeOrder    : 50,
        typifyName      : 'LB_ejSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -43 }, // phone
            { 'x' : 0, 'y' : -12 }  // pad
        ],
        slotOffset           : [
            { 'x' : 3, 'y' : -71 }, // -- Web
            { 'x' : 3, 'y' : -71 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -43, 'g_x' : -140, 'g_y' : -186 }, // -- Web
            { 'x' : 0, 'y' : -43, 'g_x' : -140, 'g_y' : -186 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 84, 'height' : 74, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 84, 'height' : 74, 'xSpace' : 59 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -154 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -181 }, // -- Web
            { 'x' : 3, 'y' : -181 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 43 }, // 610
            { scale : 0.95, x : 0, y :  7 }  // 640
        ],
    },
    {
        id              : 19,
        slotType        : 'classic',
        gameTitle       : 'Fiery 7',
        gameName        : 'fiery7',
        entryLevel      : 0,
        arrangeOrder    : 35,
        typifyName      : 'LB_f7SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75, 'y' : 57, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 69, 'y' : 33, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 11, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -10 }, // phone
            { 'x' : 0, 'y' : 3 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -89 }, // -- Web
            { 'x' : 0, 'y' : -89 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -262, 'g_x' : -118, 'g_y' : 20 }, // -- Web
            { 'x' : 0, 'y' : -262, 'g_x' : -118, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 82, 'height' : 82, 'xSpace' : 64 },
            { 'col' : 5, 'row' : 3, 'width' : 82, 'height' : 82, 'xSpace' : 64 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -176 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -176 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 39 }, // 610
            { scale : 0.96, x : 0, y : 15 }  // 640
        ],
    },
    {
        id              : 13,
        slotType        : 'classic',
        gameTitle       : 'Western Wild',
        gameName        : 'westernWild',
        entryLevel      : 0,
        arrangeOrder    : 65,
        typifyName      : 'LB_wwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -60 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -72 }, // -- Web
            { 'x' : 0, 'y' : -72 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -128, 'g_y' : -220 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -188, 'g_y' : -220 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 62, 'xSpace' : 60 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 62, 'xSpace' : 60 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -130 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -159 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.21, x : 0, y : 65 }, // 610
            { scale : 1.18, x : 0, y :  2 }  // 640
        ],
    },
    {
        id              : 22,
        slotType        : 'video',
        gameTitle       : 'Cabaret Fever',
        gameName        : 'cabaretFever',
        typifyName      : 'LB_cfSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 78, 'y' : 79, 'digit' : 11 },
            { 'x' : 69, 'y' : 55, 'digit' : 11 },
            { 'x' : 63, 'y' : 33, 'digit' : 11 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -30 }, // phone
            { 'x' : 0, 'y' : -30 }  // pad
        ],
        slotOffset       : [
            { 'x' : 126, 'y' : -2 }, // -- Web
            { 'x' : 126, 'y' : -2 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 3, 'row' : 3, 'width' : 94, 'height' : 94, 'xSpace' : 28 },
            { 'col' : 3, 'row' : 3, 'width' : 94, 'height' : 94, 'xSpace' : 28 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -155 }, // -- Web
            { 'x' : 0, 'y' : -155 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 36 }, // 610
            { scale : 1.03, x : 0, y : 33 }  // 640
        ],
    },
    {
        id              : 4,
        slotType        : 'video',
        gameTitle       : 'Halloween Mansion',
        gameName        : 'halloween',
        entryLevel      : 0,
        arrangeOrder    : 55,
        typifyName      : 'LB_hmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -22 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -15 }, // -- Web
            { 'x' : 0, 'y' : -15 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -175 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 15 }, // 610
            { scale : 1.02, x : 0, y : 35 }  // 640
        ],
    },
    {
        id              : 25,
        slotType        : 'video',
        gameTitle       : 'Zeus Thunder',
        gameName        : 'zeusThunder',
        typifyName      : 'LB_ztSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 57, 'y' : 100, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -14 }, // phone
            { 'x' : 0, 'y' : -30 }  // pad
        ],
        slotOffset       : [
            { 'x' : -54, 'y' : 30 }, // -- Web
            { 'x' : -54, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -262 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 82, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 82, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -155 }, // -- Web
            { 'x' : 0, 'y' : -155 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 32 }, // 610
            { scale : 0.98, x : 0, y : 56 }  // 640
        ],
    },
    {
        id              : 20,
        slotType        : 'classic',
        gameTitle       : 'Flaming Star',
        gameName        : 'flamingStar',
        entryLevel      : 0,
        arrangeOrder    : 45,
        typifyName      : 'LB_fsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 68, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -30 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -44 }, // -- Web
            { 'x' : 0, 'y' : -44 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -250, 'g_x' : -170, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -250, 'g_x' : -170, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 105, 'height' : 105, 'xSpace' : 37 },
            { 'col' : 5, 'row' : 3, 'width' : 105, 'height' : 105, 'xSpace' : 37 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -179 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -184 }	// -- Mobile
        ],
        mobileAttr          : [
            { scale : 1.03, x : 0, y : 34 }, // 610
            { scale : 1, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 21,
        slotType        : 'video',
        gameTitle       : 'Gold Mine',
        gameName        : 'goldMine',
        entryLevel      : 0,
        arrangeOrder    : 20,
        typifyName      : 'LB_gmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 131, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -14 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : -54, 'y' : 30 }, // -- Web
            { 'x' : -54, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 94, 'height' : 94, 'xSpace' : 28 },
            { 'col' : 5, 'row' : 4, 'width' : 94, 'height' : 94, 'xSpace' : 28 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -195 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.92, x : 0, y : 2 }, // 610
            { scale : 0.92, x : 0, y : 20 }  // 640
        ],
    },
    {
        id              : 10,
        slotType        : 'video',
        gameTitle       : 'Eldorado',
        gameName        : 'eldorado',
        entryLevel      : 5,
        arrangeOrder    : 70,
        typifyName      : 'LB_elSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 132, 'height' : 128, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 132, 'height' : 128, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -168 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.11, x : 0, y : 34 }  // 640
        ],
    },
    {
        id              : 5,
        slotType        : 'video',
        gameTitle       : 'Shopaholic',
        gameName        : 'shopaholic',
        entryLevel      : 8,
        arrangeOrder    : 75,
        typifyName      : 'LB_shSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -21 }, // phone
            { 'x' : 0, 'y' : -25 }  // pad
        ],
        slotOffset       : [
            { 'x' : -17, 'y' : -7 }, // -- Web
            { 'x' : -17, 'y' : -7 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -266 }, // -- Web
            { 'x' : 0, 'y' : -266 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 113, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 113, 'height' : 112, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : -17, 'y' : -137 }, // -- Web
            { 'x' : -17, 'y' : -159 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12, x : 0, y : 36 }, // 610
            { scale : 1.07, x : 22, y : 33 }  // 640
        ],
    },
    {
        id              : 6,
        slotType        : 'video',
        gameTitle       : 'Back to 70',
        gameName        : 'back70s',
        entryLevel      : 11,
        arrangeOrder    : 80,
        typifyName      : 'LB_70SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -13 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 3 }, // -- Web
            { 'x' : 0, 'y' : 3 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 125, 'height' : 124 },
            { 'col' : 5, 'row' : 3, 'width' : 125, 'height' : 124 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -127 }, // -- Web
            { 'x' : 0, 'y' : -169 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.02, x : 0, y : 10 }  // 640
        ],
    },
    {
        id              : 2,
        slotType        : 'video',
        gameTitle       : 'Cleopatra',
        gameName        : 'cleopatra',
        entryLevel      : 14,
        arrangeOrder    : 85,
        typifyName      : 'LB_cpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        slotOffset       : [
            { 'x' : 0, 'y' : -30 }, // -- Web
            { 'x' : 0, 'y' : -30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 130, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 130, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 3, 'y' : -150 }, // -- Web
            { 'x' : 3, 'y' : -187 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.08, x : 0, y : 40 }  // 640
        ],
    },
    {
        id              : 7,
        slotType        : 'video',
        gameTitle       : 'Hansel and Gretel',
        gameName        : 'hansel',
        entryLevel      : 17,
        arrangeOrder    : 90,
        typifyName      : 'LB_hgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -6 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -24 }, // -- Web
            { 'x' : 0, 'y' : -24 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 128, 'height' : 118, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 128, 'height' : 118, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 3, 'y' : -154 }, // -- Web
            { 'x' : 3, 'y' : -186 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 30 }, // 610
            { scale : 1.02, x : 0, y : 38 }  // 640
        ],
    },
    {
        id              : 9,
        slotType        : 'video',
        gameTitle       : 'Queens Age',
        gameName        : 'queensAge',
        entryLevel      : 20,
        arrangeOrder    : 95,
        typifyName      : 'LB_qaSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -8 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.16, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 3,
        slotType        : 'video',
        gameTitle       : 'MadSpin',
        gameName        : 'madSpin',
        entryLevel      : 23,
        arrangeOrder    : 100,
        typifyName      : 'LB_msSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -17 }, // phone
            { 'x' : 0, 'y' : -14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 },	// -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -266 }, // -- Web
            { 'x' : 0, 'y' : -266 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 135, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 135, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : -17, 'y' : -130 }, // -- Web
            { 'x' : -5, 'y' : -177 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 15 }, // 610
            { scale : 1.07, x : 0, y : 7 }  // 640
        ],
    }
];
var VipSlots    = [
    {
        id              :  1274,
        gameTitle       : 'Lamps of Fortune VIP',
        gameName        : 'lampsOfFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 85, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.75, x :  0, y :   7 }, // oldWeb
            { scale : 0.62, x :  0, y :  43 }, // newWeb
            { scale : 0.99, x :  0, y :  30 }, // mobile-phone
            { scale : 0.73, x :  0, y :  34 }, // mobile-pad
            { scale : 0.61, x :  0, y :  48 }, // lite-web-wide
            { scale : 0.64, x :  0, y :  52 }  // lite-web-pad
        ]
    },
    {
        id              : 1275,
        gameTitle       : 'Kings Fury VIP',
        gameName        : 'kingsFury',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 106, 'digit' : 10, 'color' : [ 255,255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.77, x :  0, y :  8 }, // oldWeb
            { scale : 0.63, x :  0, y : 43 }, // newWeb
            { scale : 1.00, x :  0, y : 32 }, // mobile-phone
            { scale : 0.76, x :  0, y : 31 }, // mobile-pad
            { scale : 0.62, x :  0, y : 50 }, // lite-web-wide
            { scale : 0.65, x :  0, y : 53 }  // lite-web-pad
        ]
    },
    {
        id              : 1273,
        gameTitle       : 'Golden Egg Drop Deluxe VIP',
        gameName        : 'goldenEggDropDeluxeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 1.00, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 20}, // newWeb
            {scale: 1.03, x: 0, y: 18}, // mobile-phone
            {scale: 0.89, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id              : 1271,
        gameTitle       : 'Little Wizard Jackpots VIP',
        gameName        : 'littleWizardJackpotsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  10 }, // newWeb
            { scale : 1.00, x :  0, y :  10 }, // mobile-phone
            { scale : 0.9, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              :  1272,
        gameTitle       : 'Statues\' Secrets VIP',
        gameName        : 'statuesSecretsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 85, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  16 }, // newWeb
            { scale : 1.05, x :  0, y :  20 }, // mobile-phone
            { scale : 0.92, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1270,
        gameTitle       : 'Golden Koi VIP',
        gameName        : 'goldenKoiVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 85, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.77, x :  0, y :   7 }, // oldWeb
            { scale : 0.63, x :  0, y :  43 }, // newWeb
            { scale : 0.99, x :  0, y :  25 }, // mobile-phone
            { scale : 0.72, x :  0, y :  25 }, // mobile-pad
            { scale : 0.62, x :  0, y :  47 }, // lite-web-wide
            { scale : 0.64, x :  0, y :  52 }  // lite-web-pad
        ]
    },
    {
        id              : 1269,
        gameTitle       : 'Super Bunny Bank VIP',
        gameName        : 'superBunnyBankVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :108, 'digit' : 10, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 82, 'digit' : 9,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 56, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 0.78, x: 0, y: 17}, // oldWeb
            {scale: 0.64, x: 0, y: 51}, // newWeb
            {scale: 1.00, x: 0, y: 37}, // mobile-phone
            {scale: 0.72, x: 0, y: 40},  // mobile-pad
            {scale: 0.63, x: 0, y: 56}, // lite-web-wide
            {scale: 0.66, x: 0, y: 59}  // lite-web-pad
        ]
    },
    {
        id              : 1268,
        gameTitle       : 'Pirate Parade VIP',
        gameName        : 'pirateParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 1.00, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 13}, // newWeb
            {scale: 1.05, x: 0, y: 13}, // mobile-phone
            {scale: 0.95, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id              :  1267,
        gameTitle       : 'Fortune Meow VIP',
        gameName        : 'fortuneMeowVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  22 }, // newWeb
            { scale : 1.00, x :  0, y :  20 }, // mobile-phone
            { scale : 0.93, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1266,
        gameTitle       : 'Legendary Vikings VIP',
        gameName        : 'legendaryVikingsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 0.91, x :  0, y :  14 }, // newWeb
            { scale : 1.05, x :  0, y :  18 }, // mobile-phone
            { scale : 0.88, x :  0, y :   7 }  // mobile-pad
        ]
    },
    {
        id              : 1265,
        gameTitle       : 'Wicked Cauldrons VIP',
        gameName        : 'wickedCauldronsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :112, 'digit' : 10, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 86, 'digit' : 9,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 60, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            {scale: 0.75, x: 0, y: 5},  // oldWeb
            {scale: 0.63, x: 0, y: 43}, // newWeb
            {scale: 0.98, x: 0, y: 22}, // mobile-phone
            {scale: 0.78, x: 0, y: 35}, // mobile-pad
            {scale: 0.61, x: 0, y: 49}, // lite-web-wide
            {scale: 0.64, x: 0, y: 53}  // lite-web-pad
        ]
    },
    {
        id              : 1264,
        gameTitle       : 'Hoggyween VIP',
        gameName        : 'hoggyween',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 15 }, // newWeb
            { scale : 1.00, x : 0, y : 8 }, // mobile-phone
            { scale : 0.88, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1263,
        gameTitle       : 'Million Dollar Chickens VIP',
        gameName        : 'millionDollarChickensVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 87, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.80, x :  0, y :  27 }, // oldWeb
            { scale : 0.646, x :  0, y : 58 }, // newWeb
            { scale : 1.00, x :  0, y :  38 }, // mobile-phone
            { scale : 0.79, x :  0, y :  49 },  // mobile-pad
            { scale : 0.64, x :  0, y :  65 },  // lite-web-wide
            { scale : 0.67, x :  0, y :  70 }  // lite-web-pad
        ]
    },
    {
        id              : 1262,
        gameTitle       : 'Double Sunrise Lock VIP',
        gameName        : 'doubleSunriseLock',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 74, 'digit' : 9,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 50, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 0.93, x :  0, y :   7 }, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.90, x :  0, y : -10 }  // mobile-pad
        ]
    },
    {
        id              : 1261,
        gameTitle       : 'Golden Case VIP',
        gameName        : 'goldenCaseVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y : -54 }, // oldWeb
            { scale : 0.65, x :  0, y :  -1 }, // newWeb
            { scale : 0.98, x :  0, y : -46 }, // mobile-phone
            { scale : 0.78, x :  0, y : -12 },  // mobile-pad
            { scale : 0.64, x :  0, y :   6 },  // lite-web-wide
            { scale : 0.67, x :  0, y :   7 }  // lite-web-pad
        ]
    },
    {
        id              :  1260,
        gameTitle       : 'Hercules Saga VIP',
        gameName        : 'herculesSagaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 0.98, x :  0, y :  20 }, // mobile-phone
            { scale : 0.90, x :  0, y :  5 }  // mobile-pad
        ]
    },
    {
        id              : 1259,
        gameTitle       : 'Gorgons Glare VIP',
        gameName        : 'gorgonsGlareVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 30 }, // mobile-phone
            { scale : 0.88, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 1258,
        gameTitle       : 'Zoom Zoom Double VIP',
        gameName        : 'zoomZoomDouble',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 108, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y : -61 }, // oldWeb
            { scale : 0.67, x :  0, y :  -1 }, // newWeb
            { scale : 0.97, x :  0, y : -75 }, // mobile-phone
            { scale : 0.76, x :  0, y : -42 }, // mobile-pad
            { scale : 0.65, x :  0, y :   4 },  // lite-web-wide
            { scale : 0.68, x :  0, y :   6 }  // lite-web-pad
        ]
    },
    {
        id              : 1257,
        gameTitle       : 'Shark Rush VIP',
        gameName        : 'sharkRushVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.02, x :  0, y :  18 }, // newWeb
            { scale : 1.07, x :  0, y :  16 }, // mobile-phone
            { scale : 0.95, x :  0, y :  11 }  // mobile-pad
        ]
    },
    {
        id              : 1256,
        gameTitle       : 'Rose In Gold VIP',
        gameName        : 'roseInGoldVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  20 }, // newWeb
            { scale : 1.08, x :  0, y :  20 }, // mobile-phone
            { scale : 0.94, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1255,
        gameTitle       : 'Boardwalk Bonanza VIP',
        gameName        : 'boardwalkBonanza',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 22 }, // newWeb
            { scale : 1.00, x : 0, y : 26 }, // mobile-phone
            { scale : 0.91, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 1254,
        gameTitle       : 'Hippo Bank Blast VIP',
        gameName        : 'hippoBankBlastVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.93, x :  0, y :  2 }, // newWeb
            { scale : 0.96, x :  0, y :-11 }, // mobile-phone
            { scale : 0.93, x :  0, y :  1 }  // mobile-pad
        ]
    },
    {
        id              : 1253,
        gameTitle       : 'Royal Dragons VIP',
        gameName        : 'royalDragonsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  4 }, // newWeb
            { scale : 1.04, x :  0, y :  13 }, // mobile-phone
            { scale : 0.87, x :  0, y :  17 },  // mobile-pad
        ]
    },
    {
        id              : 1252,
        gameTitle       : 'neko Fortune VIP',
        gameName        : 'nekoFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 30 }, // newWeb
            { scale : 1.05, x : 0, y : 14 }, // mobile-phone
            { scale : 0.9, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 1251,
        gameTitle       : 'Tiki Frenzy VIP',
        gameName        : 'tikiFrenzyVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :125, 'digit' : 10, 'color' : [ 255,   0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 99, 'digit' : 9,  'color' : [ 255,   0, 0 ] , 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 73, 'digit' : 8,  'color' : [ 255, 255, 0 ] , 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  18 }, // newWeb
            { scale : 0.98, x :  0, y :  13 }, // mobile-phone
            { scale : 0.88, x :  0, y :  13 }  // mobile-pad
        ]
    },
    {
        id              : 1250,
        gameTitle       : 'Ancient Treasure VIP',
        gameName        : 'ancientTreasuresVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 0.96, x :  0, y :  -1 }, // mobile-phone
            { scale : 0.88, x :  0, y :  -13 }  // mobile-pad
        ]
    },
    {
        id              : 1249,
        gameTitle       : 'Lock & Loot VIP',
        gameName        : 'lockNLootVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  22 }, // newWeb
            { scale : 1.03, x :  0, y :  12 }, // mobile-phone
            { scale : 0.88, x :  0, y :  8 }  // mobile-pad
        ]
    },
    {
        id              : 1248,
        gameTitle       : 'Drake And Cake VIP',
        gameName        : 'drakeAndCakeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  20 }, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.94, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 1247,
        gameTitle       : 'GenieCatsWish VIP',
        gameName        : 'genieCatsWish',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 11 }, // mobile-phone
            { scale : 0.94, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 1244,
        gameTitle       : 'The Great Foxby VIP',
        gameName        : 'theGreatFoxbyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255,   0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' : 9,  'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 66, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 0.98, x :  0, y :  2 }, // mobile-phone
            { scale : 0.86, x :  0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1243,
        gameTitle       : 'Biggy Piggy Trio VIP',
        gameName        : 'biggyPiggyTrioVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :107, 'digit' : 10, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.63, x :  0, y :  0 }, // oldWeb
            { scale : 0.50, x :  0, y : 39 }, // newWeb
            { scale : 0.80, x :  0, y :  6 }, // mobile-phone
            { scale : 0.60, x :  0, y : 10 }, // mobile-pad
            { scale : 0.49, x :  0, y : 43 }, // lite-web-wide
            { scale : 0.52, x :  0, y : 50 } // lite-web-pad
        ]
    },
    {
        id              : 1242,
        gameTitle       : 'Rodeo Rush VIP',
        gameName        : 'rodeoRushVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :105, 'digit' : 9, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.00, x :  0, y :  14 }, // newWeb
            { scale : 1.00, x :  0, y :  14 }, // mobile-phone
            { scale : 0.82, x :  0, y :  11 }  // mobile-pad
        ]
    },
    {
        id              : 1240,
        gameTitle       : 'Magical Coin VIP',
        gameName        : 'magicalCoinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.9, x :  0, y :  20 }, // newWeb
            { scale : 1.01, x :  0, y :  10 }, // mobile-phone
            { scale : 0.9, x :  0, y :  5 }  // mobile-pad
        ]
    },
    {
        id              : 1241,
        gameTitle       : 'Mystical Blossoms VIP',
        gameName        : 'mysticalBlossomsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.98, x : 0, y : 5 }, // newWeb
            { scale : 1.08, x : 0, y : 22 }, // mobile-phone
            { scale : 0.89, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 1239,
        gameTitle       : 'Catch And Win Bonanza VIP',
        gameName        : 'catchAndWinBonanzaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 118, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' : 9,  'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 66, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 1.00, x :  0, y :  16 }, // newWeb
            { scale : 1.00, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 1238,
        gameTitle       : 'Chicky Chicky Parade VIP',
        gameName        : 'chickyChickyParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :105, 'digit' : 9, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  2 }, // newWeb
            { scale : 1.02, x :  0, y :  9 }, // mobile-phone
            { scale : 0.86, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1237,
        gameTitle       : 'Rabbits Trail VIP',
        gameName        : 'rabbitsTrailVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :105, 'digit' : 9, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.90, x :  0, y : 25 }, // newWeb
            { scale : 0.95, x :  0, y : 15 }, // mobile-phone
            { scale : 0.85, x :  0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 1236,
        gameTitle       : 'The Fairy Grove VIP',
        gameName        : 'theFairyGroveVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 0.97, x : 0, y : 9 }, // mobile-phone
            { scale : 0.9, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 1235,
        gameTitle       : 'Disco Night Party Vip',
        gameName        : 'discoNightPartyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.02, x : 0, y : 21 }, // newWeb
            { scale : 1.04, x : 0, y : 19 }, // mobile-phone
            { scale : 0.97, x : 0, y : 24 },  // mobile-pad
        ],
    },
    {
        id              : 1234,
        gameTitle       : 'Sweety Hammy VIP',
        gameName        : 'sweetyHammyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  25 }, // newWeb
            { scale : 1.07, x :  0, y :  20 }, // mobile-phone
            { scale : 0.92, x :  0, y :  25 }  // mobile-pad
        ]
    },
    {
        id              : 1233,
        gameTitle       : 'Money Express VIP',
        gameName        : 'moneyExpressVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 100,  'digit' : 9,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.97, x :  0, y : 19 }, // newWeb
            { scale : 0.97, x :  0, y : 14 }, // mobile-phone
            { scale : 0.89, x :  0, y :-11 }  // mobile-pad
        ]
    },
    {
        id              : 1232,
        gameTitle: 'Hustlin Hounds VIP',
        gameName: 'hustlinHounds',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 90, 'y': 111, 'digit': 10, 'color': [255, 0, 255], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 87, 'y': 87, 'digit': 9, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 84, 'y': 63, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        gameNodeViewAttr: [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 16 }, // newWeb
            { scale : 0.97, x : 0, y : -1 }, // mobile-phone
            { scale : 0.9, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id: 1229,
        gameTitle: 'Jurassic Trio Vip',
        gameName: 'jurassicTrioVip',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 88, 'y': 105, 'digit': 10, 'color': [255, 0, 255], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 85, 'y': 81, 'digit': 9, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 82, 'y': 57, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 20 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.92, x : 0, y : 25 },  // mobile-pad
        ],
    },
    {
        id              : 1228,
        gameTitle       : 'Wizard\'s Potion Shop VIP',
        gameName        : 'wizardsPotionShopVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  23 }, // newWeb
            { scale : 1.04, x :  0, y :  22 }, // mobile-phone
            { scale : 0.89, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 1227,
        gameTitle       : 'Party Crashers VIP',
        gameName        : 'partyCrashersVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 116, 'digit' : 10, 'color' : [ 255,   0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 90,  'digit' : 9,  'color' : [ 255,   0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 63,  'digit' : 8,  'color' : [ 255, 255,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 19 }, // newWeb
            { scale : 1.03, x :  0, y : 10 }, // mobile-phone
            { scale : 0.90, x :  0, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 1225,
        gameTitle       : 'LockinPiggy VIP',
        gameName        : 'lockinPiggyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 3 }, // mobile-phone
            { scale : 0.9, x : 0, y : 4 }  // mobile-pad
        ]
    },
    {
        id              : 1226,
        gameTitle       : 'Monster Prison Vip',
        gameName        : 'monsterPrisonVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 91, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 10 }, // newWeb
            { scale : 1.01, x : 0, y : 4 }, // mobile-phone
            { scale : 0.92, x : 0, y : 10 },  // mobile-pad
        ],
    },
    {
        id              : 1224,
        gameTitle       : 'Doomed To Riches VIP',
        gameName        : 'doomedToRichesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.89, x :  0, y :  9 }  // mobile-pad
        ]
    },
    {
        id              : 1223,
        gameTitle       : 'Horns And Halos VIP',
        gameName        : 'hornsAndHalosVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.91, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 1222,
        gameTitle       : 'Flavorful Five VIP',
        gameName        : 'flavorfulFiveVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : -1 }, // newWeb
            { scale : 1.05, x : 0, y : 10 }, // mobile-phone
            { scale : 0.89, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1221,
        gameTitle       : 'More Barrels More Fruits VIP',
        gameName        : 'moreBarrelsMoreFruitsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 11 }, // newWeb
            { scale : 1.03, x : 0, y : 10 }, // mobile-phone
            { scale : 0.87, x : 0, y : -16 }  // mobile-pad
        ]
    },
    {
        id              : 1220,
        gameTitle       : 'Sharks Bounty Vip',
        gameName        : 'sharksBountyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 69, 'digit' : 9,  'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 48, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.97, x : 0, y : 25 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.95, x : 0, y : 20 },  // mobile-pad
        ],
    },
    {
        id              : 1219,
        gameTitle       : 'Grand Harvest VIP',
        gameName        : 'GrandHarvestVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 73, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  21 }, // newWeb
            { scale : 1.00, x :  0, y :  24 }, // mobile-phone
            { scale : 0.89, x :  0, y :  18 }  // mobile-pad
        ]
    },
    {
        id              : 1218,
        gameTitle       : 'GoldiesKingdom VIP',
        gameName        : 'goldiesKingdomVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 95, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 20 }, // mobile-phone
            { scale : 0.94, x : 0, y : 1 },  // mobile-pad
        ]
    },
    {
        id              : 1216,
        gameTitle       : 'Stellar Scatters VIP',
        gameName        : 'stellarScattersVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 95, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 18 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.90, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1217,
        gameTitle       : 'RichesToRiches VIP',
        gameName        : 'richesToRichesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  11 }, // newWeb
            { scale : 1.05, x :  0, y :  15 }, // mobile-phone
            { scale : 0.88, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1990,
        gameTitle       : 'X-Flight VIP',
        gameName        : 'xFlightVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.00, x : 0, y : 45 }, // newWeb
            { scale : 0.99, x : 0, y : 46 }, // mobile-phone
            { scale : 0.80, x : 0, y : 26 }  // mobile-pad
        ]
    },
    {
        id              : 1215,
        gameTitle       : 'Book Of Cleos Secrets VIP',
        gameName        : 'bookOfCleosSecretsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 1.00, x :  0, y :  6 }, // mobile-phone
            { scale : 0.92, x :  0, y :  -11 }  // mobile-pad
        ]
    },
    {
        id              : 1214,
        gameTitle       : 'Sweet Smash VIP',
        gameName        : 'sweetSmashVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 108, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : -4 }, // newWeb
            { scale : 1.02, x : 0, y : 12 }, // mobile-phone
            { scale : 0.93, x : 0, y : 8 }  // mobile-pad
        ],
    },
    {
        id              : 1213,
        gameTitle       : 'Sizzling Baskets VIP',
        gameName        : 'sizzlingBasketsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 8 }, // newWeb
            { scale : 1.05, x : 0, y : 16 }, // mobile-phone
            { scale : 0.91, x : 0, y : -3 }  // mobile-pad
        ]
    },
    {
        id              : 1211,
        gameTitle       : 'Gummy Yummy Fiesta VIP',
        gameName        : 'gummyYummyFiestaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : -8 }, // newWeb
            { scale : 1.095, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -11 }  // mobile-pad
        ]
    },
    {
        id              : 1212,
        gameTitle       : 'Drs Secret Lab VIP',
        gameName        : 'drsSecretLab',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.03, x : 0, y : 12 }, // mobile-phone
            { scale : 0.90, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 1210,
        gameTitle       : 'Cookie Crumb Adventure Vip',
        gameName        : 'cookieCrumbAdventureVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 84, 'y' :107, 'digit' : 10, 'color' : [ 255, 0, 255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 81, 'digit' : 9,  'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 30 }, // newWeb
            { scale : 1.03, x : 0, y : 13 }, // mobile-phone
            { scale : 0.95, x : 0, y : 6 },  // mobile-pad
        ],
    },
    {
        id              : 1209,
        gameTitle       : 'Helloween Party VIP',
        gameName        : 'helloweenPartyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 25 }, // newWeb
            { scale : 1.05, x : 0, y : 17 }, // mobile-phone
            { scale : 0.93, x : 0, y : 20 }  // mobile-pad
        ],
    },
    {
        id              : 1208,
        gameTitle       : 'All That Jazz VIP',
        gameName        : 'allThatJazzVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 102, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.04, x : 0, y : 5 }, // newWeb
            { scale : 1.1, x : 0, y : 19 }, // mobile-phone
            { scale : 0.93, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 1207,
        gameTitle       : 'Lucky Neko Parade VIP',
        gameName        : 'luckyNekoParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.9, x : 0, y : -7 }, // newWeb
            { scale : 1.03, x : 0, y : 13 }, // mobile-phone
            { scale : 0.9, x : 0, y : -10 }  // mobile-pad
        ]
    },
    {
        id              : 1206,
        gameTitle       : 'Potato Kingdom VIP',
        gameName        : 'potatoKingdomVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.95, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 1205,
        gameTitle       : 'Buzz Bonanza VIP',
        gameName        : 'BuzzBonanzaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 93, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 21 }, // newWeb
            { scale : 1.07, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : 10 }  // mobile-pad
        ],
    },
    {
        id              : 1203,
        gameTitle       : 'Crazy Rich Pandas VIP',
        gameName        : 'crazyRichPandasVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 43, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 19 }, // newWeb
            { scale : 1.07, x : 0, y : 22 }, // mobile-phone
            { scale : 0.92, x : 0, y : 3 }  // mobile-pad
        ]
    },
    {
        id              : 1204,
        gameTitle       : 'Master Chef VIP',
        gameName        : 'masterChefVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 43, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 20 }, // newWeb
            { scale : 1.02, x :  0, y : 10 }, // mobile-phone
            { scale : 0.90, x :  0, y :  12 }  // mobile-pad`
        ]
    },
    {
        id              : 1201,
        gameTitle       : 'Beanstalk Bonanza VIP',
        gameName        : 'beanstalkBonanazaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 43, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 27 }, // newWeb
            { scale : 1.06, x : 0, y : 16 }, // mobile-phone
            { scale : 0.93, x : 0, y : 9 }  // mobile-pad
        ]
    },
    {
        id              : 1200,
        gameTitle       : 'Blazing Phoenix VIP',
        gameName        : 'BlazingPhoenixVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 94, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 15 }, // newWeb
            { scale : 1.05, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : 10 }  // mobile-pad
        ],
    },
    {
        id              : 1202,
        gameTitle       : 'Golden Raffle VIP',
        gameName        : 'goldenRaffleVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :104, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 82, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 59, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.91, x :  0, y : 15 }, // newWeb
            { scale : 1.03, x :  0, y : 11 }, // mobile-phone
            { scale : 0.90, x :  0, y :  8 }  // mobile-pad`
        ],
    },
    {
        id              : 1199,
        gameTitle       : 'Eternal Love VIP',
        gameName        : 'eternalLoveVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.93, x :  0, y :  10 }, // newWeb
            { scale : 1.06, x :  0, y :  20 }, // mobile-phone
            { scale : 0.9, x :  0, y :  0 }  // mobile-pad
        ],
    },
    {
        id              : 1198,
        gameTitle       : 'Colossal Zodiac VIP',
        gameName        : 'colossalZodiacVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 103, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 82, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 62, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 21 }, // newWeb
            { scale : 1.04, x : 0, y : 16 }, // mobile-phone
            { scale : 0.95, x : 0, y : 20 }  // mobile-pad
        ],
    },
    {
        id              : 1197,
        gameTitle       : 'Striking Gold VIP',
        gameName        : 'strikingGoldVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 15 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.90, x : 0, y : 0 }  // mobile-pad
        ],
    },
    {
        id              : 1196,
        gameTitle       : 'Eggcellent Atelier VIP',
        gameName        : 'eggcellentAtelierVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 94, 'digit' : 9,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  11}, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1195,
        gameTitle       : 'Blasting Bulls VIP',
        gameName        : 'blastingBullsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.99, x : 0, y : 20 }, // newWeb
            { scale : 1.06, x : 0, y : 13 }, // mobile-phone
            { scale : 0.92, x : 0, y : 3 }  // mobile-pad
        ],
    },
    {
        id              : 1193,
        gameTitle       : 'Alchemy Trio VIP',
        gameName        : 'alchemyTrioVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 25 }, // newWeb
            { scale : 1.07, x : 2, y : 17 }, // mobile-phone
            { scale : 0.92, x : 5, y : 12 }  // mobile-pad
        ],
    },
    {
        id              : 1194,
        gameTitle       : 'ShamknockOnWood VIP',
        gameName        : 'shamknockOnWoodVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 100, 'digit' : 10,  'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 1.02, x :  0, y :  3 }, // mobile-phone
            { scale : 0.90, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 1192,
        gameTitle       : 'PlushCarnival VIP',
        gameName        : 'plushCarnivalVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 100, 'digit' : 10,  'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y : 10 }, // newWeb
            { scale : 1.02, x :  0, y :  3 }, // mobile-phone
            { scale : 0.99, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 1190,
        gameTitle       : 'Lucky Ignite VIP',
        gameName        : 'luckyIgniteVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 107, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 79, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 52, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 28 }, // newWeb
            { scale : 1.035, x : 2, y : 8 }, // mobile-phone
            { scale : 0.89, x : 5, y : 12 }  // mobile-pad
        ],
    },
    {
        id              : 1186,
        gameTitle       : 'Flippin Rich VIP',
        gameName        : 'flippinRichVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 12 }, // newWeb
            { scale : 1, x : 0, y : 7 }, // mobile-phone
            { scale : 0.9, x : 0, y : 8 }  // mobile-pad
        ],
    },
    {
        id              : 1187,
        gameTitle       : 'WickedBoosFamily VIP',
        gameName        : 'wickedBoosFamilyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 132, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 106, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 80, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 19 }, // newWeb
            { scale : 1.06, x : 0, y : 15 }, // mobile-phone
            { scale : 0.91, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 1184,
        gameTitle       : 'Wicked Fortune VIP',
        gameName        : 'wickedFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.91, x : 0, y : 21 }, // newWeb
            { scale : 1.06, x : 0, y : 14 }, // mobile-phone
            { scale : 0.92, x : 0, y :  4 }  // mobile-pad
        ]
    },
    {
        id              : 1185,
        gameTitle       : 'Diggy Crush VIP',
        gameName        : 'diggyCrushVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 76, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 20 }, // newWeb
            { scale : 1.09, x : 0, y : 13 }, // mobile-phone
            { scale : 0.93, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 1183,
        gameTitle       : 'White Fortune VIP',
        gameName        : 'whiteFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.91, x : 0, y : 21 }, // newWeb
            { scale : 1.06, x : 0, y : 14 }, // mobile-phone
            { scale : 0.92, x : 0, y :  4 }  // mobile-pad
        ]
    },
    {
        id              : 1182,
        gameTitle       : 'Mythic Apples VIP',
        gameName        : 'mythicApplesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.98, x : 0, y : -1 }, // oldWeb
            { scale : 0.92, x : 0, y : 24 }, // newWeb
            { scale : 1.06, x : 0, y : 13 }, // mobile-phone
            { scale : 0.9, x : 0, y : 14 }  // mobile-pad
        ],
    },
    {
        id              : 1180,
        gameTitle       : 'Captain Hook Returns VIP',
        gameName        : 'captainHookReturnsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor: 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : -4 }, // oldWeb
            { scale : 0.89, x : 0, y : 21 }, // newWeb
            { scale : 0.96, x : 0, y : 12 }, // mobile-phone
            { scale : 0.84, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 1181,
        gameTitle       : 'Calavera Parade VIP',
        gameName        : 'calaveraParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        frameColor: 'g',        //b, r, y, g, p
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 88, 'y': 102, 'digit': 10, 'color': [255, 0, 255], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 85, 'y': 78, 'digit': 9, 'color': [255, 0, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1},
            {'x': 82, 'y': 53, 'digit': 8, 'color': [255, 255, 0], 'font': resNewLobby.MiniCountFont, 'scale': 1}
        ],
        mobileGameOffset: [ // Mobile Only
            {'x': 0, 'y': 0}, // phone
            {'x': 0, 'y': 0}  // pad
        ],
        slotOffset: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        coinEffectAttr: [
            {'x': 0, 'y': 0}, // -- Web
            {'x': 0, 'y': 0}	// -- Mobile
        ],
        totalPayNodeAttr: [
            {'x': 0, 'y': -190}, // -- Web
            {'x': 0, 'y': -190}	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.86, x : 0, y : 26 }, // newWeb
            { scale : 0.99, x : 0, y : 31 }, // mobile-phone
            { scale : 0.85, x : 0, y : 22 }  // mobile-pad
        ]
    },
    {
        id              : 1179,
        gameTitle       : 'Peter Pan Begins VIP',
        gameName        : 'peterPanBeginsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        // frameColor      : 'y',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 89, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : -4 }, // oldWeb
            { scale : 0.89, x : 0, y : 21 }, // newWeb
            { scale : 0.96, x : 0, y : 12 }, // mobile-phone
            { scale : 0.84, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 1178,
        gameTitle       : 'Fervor Circus VIP',
        gameName        : 'fervorCircusVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 102, 'digit' : 10, 'color' : [ 255,   0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 76, 'digit' :  9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 50, 'digit' :  8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.86, x : 0, y : 41 }, // newWeb
            { scale : 1.01, x : 0, y : 34 }, // mobile-phone
            { scale : 0.85, x : 0, y : 35 }  // mobile-pad
        ]
    },
    {
        id              : 1177,
        gameTitle       : 'More More Acorns VIP',
        gameName        : 'moreMoreAcornsVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 15 }, // oldWeb
            { scale : 0.91, x : 0, y : 34 }, // newWeb
            { scale : 1.02, x : 0, y : 34 }, // mobile-phone
            { scale : 0.93, x : 0, y : 9 }  // mobile-pad
        ]
    },
    {
        id              : 1176,
        gameTitle       : 'SpookyMansion VIP',
        gameName        : 'spookyMansionVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 94, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.87, x : 0, y : 17 }, // newWeb
            { scale : 1, x : 0, y : 34 }, // mobile-phone
            { scale : 0.84, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 1174,
        gameTitle       : 'Legend Of The Jungle VIP',
        gameName        : 'legendOfTheJungleVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 78, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.90, x : 0, y : 45 }, // newWeb
            { scale : 0.99, x : 0, y : 30 }, // mobile-phone
            { scale : 0.83, x : 0, y : 40 }  // mobile-pad
        ]
    },
    {
        id              : 1173,
        gameTitle       : 'Triple Fortune VIP',
        gameName        : 'tripleFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255,   0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' :  9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' :  8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 5 }, // newWeb
            { scale : 1.05, x : 0, y : 15 }, // mobile-phone
            { scale : 0.91, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 1175,
        gameTitle       : 'Rolling In Money Blast VIP',
        gameName        : 'rollingInMoneyBlastVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 106, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 85, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 64, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 13 }, // newWeb
            { scale : 1.1,  x : 0, y : 13 },  // phone  이거 왜 로비랑 라운지가 값이 다르지...?
            { scale : 0.938, x : 0, y : -7 }  // mobile-pad
        ]
    },
    {
        id              : 1172,
        gameTitle       : 'Wild West : Gold Card VIP',
        gameName        : 'wildWestGoldCardVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 76, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 32 }, // newWeb
            { scale : 1.09, x : 0, y : 21 }, // mobile-phone
            { scale : 0.91, x : 0, y : 24 }  // mobile-pad
        ]
    },
    {
        id              : 1170,
        gameTitle       : 'Goblins Treasures VIP',
        gameName        : 'goblinsTreasuresVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.9, x: 0, y: 5}, // newWeb
            {scale: 1.02, x: 0, y: 10}, // mobile-phone
            {scale: 0.93, x: 0, y: 7}  // mobile-pad
        ]
    },
    {
        id              : 1169,
        gameTitle       : 'Mr.Luckys Bakery VIP',
        gameName        : 'mrLuckysBakeryVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 102, 'digit' : 10, 'color' : [ 255,   0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' :  9, 'color' : [ 255,   0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 56, 'digit' :  8, 'color' : [ 255, 160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 14 }, // newWeb
            { scale : 1.07, x : 0, y : 17 }, // mobile-phone
            { scale : 0.92, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1168,
        gameTitle       : 'Excalibur Sword Of Magic VIP',
        gameName        : 'excaliburSwordOfMagicVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 80, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 53, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 16}, // newWeb
            {scale: 1.08, x: 0, y: 21}, // mobile-phone
            {scale: 0.94, x: 0, y: 4}  // mobile-pad
        ]
    },
    {
        id              : 1167,
        gameTitle       : 'Panther Gold VIP',
        gameName        : 'pantherGoldVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 27}, // newWeb
            {scale: 1.08, x: 0, y: 27}, // mobile-phone
            {scale: 0.914, x: 0, y: 22}  // mobile-pad
        ]
    },
    {
        id              : 1166,
        gameTitle       : 'Sherlock Mystery Card VIP',
        gameName        : 'sherlockMysteryCardVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 80, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 53, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 16 }, // phone
            { scale : 0.92, x : 0, y :  8 } // pad
        ]
    },
    {
        id              : 1165,
        gameTitle       : 'Frog Prince Magic VIP',
        gameName        : 'frogPrinceMagicVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.94, x: 0, y: 18}, // newWeb
            {scale: 1.09, x: 0, y: 20}, // mobile-phone
            {scale: 0.924, x: 0, y: 8}  // mobile-pad
        ]
    },
    {
        id              : 1164,
        gameTitle       : 'The Tale Of Cinderella VIP',
        gameName        : 'theTaleOfCinderellaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 102, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 80, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 22 }, // mobile-phone
            { scale : 0.920, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 1163,
        gameTitle       : 'El Toro Parade VIP',
        gameName        : 'elToroParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 88, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 4}, // newWeb
            {scale: 1.07, x: 0, y: 11}, // mobile-phone
            {scale: 0.93, x: 0, y: -1}  // mobile-pad
        ]
    },
    {
        id              : 1171,
        gameTitle       : 'Honey Beengo Splash VIP',
        gameName        : 'honeyBeengoSplashVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 112, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 86, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 23}, // newWeb
            {scale: 1.06, x: 0, y: 22}, // mobile-phone
            {scale: 0.9, x: 0, y: 12}  // mobile-pad
        ]
    },
    {
        id              : 1162,
        gameTitle       : 'Golden Piggy VIP',
        gameName        : 'goldenPiggyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :106, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 80, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 56, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 6 }, // newWeb
            { scale : 1.03, x : 0, y : 3 }, // mobile-phone
            { scale : 0.920, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 1161,
        gameTitle       : 'Zeus Link And Hades Link VIP',
        gameName        : 'zeusLinkAndHadesLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 75, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 9 }, // newWeb
            { scale : 1.10, x : 0, y : 18 }, // mobile-phone
            { scale : 0.930, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 1160,
        gameTitle       : 'Bananza Coins VIP',
        gameName        : 'bananzaCoinsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 15}, // newWeb
            {scale: 1.1, x: 0, y: 18}, // mobile-phone
            {scale: 0.93, x: 0, y: 7}  // mobile-pad
        ]
    },
    {
        id              : 1158,
        gameTitle       : 'Hua Mei Bao Shi VIP',
        gameName        : 'huaMeiBaoShi',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 96, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 73, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 5 },// phone
            { scale : 0.899, x : 0, y : -8 } // pad
        ]
    },
    {
        id              : 1157,
        gameTitle       : 'Triple Me Treasure VIP',
        gameName        : 'tripleMeTreasuresVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :122, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 97, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 73, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 10 }, // newWeb
            { scale : 1.07, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 1159,
        gameTitle       : 'Golden Egg Drop Hammer Time VIP',
        gameName        : 'goldenEggDropHammerTimeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.89, x: 0, y: 0}, // newWeb
            {scale: 1.04, x: 0, y: 11}, // mobile-phone
            {scale: 0.879, x: 0, y: -5}  // mobile-pad
        ]
    },
    {
        id              : 1156,
        gameTitle       : 'Go Catch Fish VIP',
        gameName        : 'goCatchFishVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 90, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 65, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 9}, // newWeb
            {scale: 1.04, x: 0, y: 11}, // mobile-phone
            {scale: 0.927, x: 0, y: 4}  // mobile-pad
        ]
    },
    {
        id              : 1155,
        gameTitle       : 'Golden Honey Pot VIP',
        gameName        : 'goldenHoneyPotVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 72, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 19 }, // newWeb
            { scale : 1.07, x : 0, y : 16 }, // mobile-phone
            { scale : 0.937, x : 0, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 1154,
        gameTitle       : 'The Magical Lupin VIP',
        gameName        : 'theMagicalLupinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 71, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 16 },// phone
            { scale : 0.89, x : 0, y :  6 } // pad
        ]
    },
    {
        id              : 1153,
        gameTitle       : 'The DogFather VIP',
        gameName        : 'theDogFatherVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 92, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 13 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.9, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 1145,
        gameTitle       : 'Bingo Mine  VIP',
        gameName        : 'bingoMineVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -265 }, // -- Web
            { 'x' : 0, 'y' : -265 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 9}, // newWeb
            {scale: 1.08, x: 0, y: 24}, // mobile-phone
            {scale: 0.9, x: 0, y: 5}  // mobile-pad
        ]
    },
    {
        id              : 1148,
        gameTitle       : 'Monster Parade Boost VIP',
        gameName        : 'monsterParadeBoostVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: -2}, // newWeb
            {scale: 1.101, x: 0, y: 14}, // mobile-phone
            {scale: 0.91, x: 0, y: -11}  // mobile-pad
        ]
    },
    {
        id              : 1150,
        gameTitle       : 'Sands Of Fortune VIP',
        gameName        : 'sandsOfFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' :  75, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 91, 'y' :  49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 30 }, // newWeb
            { scale : 1.091, x : 0, y : 25 }, // mobile-phone
            { scale : 0.914, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1149,
        gameTitle       : 'Dragon Heart VIP',
        gameName        : 'dragonHeartVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' :  86,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' :  63,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.95, x: 0, y: 22}, // newWeb
            {scale: 1.07, x: 0, y: 20}, // mobile-phone
            {scale: 0.96, x: 0, y: 10}  // mobile-pad
        ]
    },
    {
        id              : 1146,
        gameTitle       : 'Aegis of the Goddess VIP',
        gameName        : 'aegisOfTheGoddessVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 116, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: 22}, // newWeb
            {scale: 1.07, x: 0, y: 23}, // mobile-phone
            {scale: 0.89, x: 0, y: 10}  // mobile-pad
        ]
    },
    {
        id              : 1151,
        gameTitle       : 'Draculas Den VIP',
        gameName        : 'draculasDenVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 127, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 101,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' :  75,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 11}, // newWeb
            {scale: 1.08, x: 0, y: 18}, // mobile-phone
            {scale: 0.94, x: 0, y: 12}  // mobile-pad
        ]
    },

    {
        id              : 1152,
        gameTitle       : 'Witchs Den VIP',
        gameName        : 'witchsDenVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 127, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 101,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' :  75,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 11}, // newWeb
            {scale: 1.08, x : 0, y : 18}, // mobile-phone
            {scale: 0.94, x: 0, y: 12}  // mobile-pad
        ]
    },

    {
        id              : 1144,
        gameTitle       : 'Golden Egg Drop VIP',
        gameName        : 'goldenEggDropVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 0 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.88, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 1143,
        gameTitle       : 'Mayan Double Jackpot VIP',
        gameName        : 'mayanDoubleJackpotVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 51, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 47, 'y' : 74,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 43, 'y' : 50,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -256 }, // -- Web
            { 'x' : 1, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        mobileAttr       : [
            { scale : 1.064, x : 0, y : 14 }, // phone
            { scale : 0.94, x : 0, y : 11 }  // pad
        ]
    },

    {
        id              : 1139,
        gameTitle       : 'Monkey\'s Might VIP',
        gameName        : 'monkeysMightVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 91, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileRoomAttr       : [
            { scale : 1.0, x : 0, y : 0 }, // phone
            { scale : 1.0, x : 0, y : 0 } // pad
        ],
        mobileAttr       : [
            { scale : 1.036, x : 0, y : 14 }, // phone
            { scale : 0.897, x : 0, y : 27 }  // pad
        ]
    },
    {
        id              : 1144,
        gameTitle       : 'Golden Egg Drop VIP',
        gameName        : 'goldenEggDropVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 0 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.88, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 1138,
        gameTitle       : 'Jackpot Hammer Link VIP',
        gameName        : 'jackpotHammerLink',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 120, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            // { 'x' : 87, 'y' : 69, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            // { 'x' : 84, 'y' : 42, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.026, x : 0, y : 10 }, // newWeb
            { scale : 1.026, x : 0, y : 10 }, // phone
            { scale : 0.897, x : 0, y :  2 }  // mobile-pad
        ]
    },

    {
        id              : 1137,
        gameTitle       : 'Jungle\'s Treasure VIP',
        gameName        : 'junglesTreasureVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -263 }, // -- Web
            { 'x' : 1, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 21 }, // newWeb
            { scale : 1.061, x : 0, y : 21 }, // phone
            { scale : 0.928, x : 0, y : 9 }  // mobile-pad
        ]
    },

    {
        id              : 1136,
        gameTitle       : 'Merlins Magic Box VIP',
        gameName        : 'MerlinsMagicBoxVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 112, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 89,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 66,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 24 }, // newWeb
            { scale : 1.07, x : 0, y : 24 }, // mobile-phone
            { scale : 0.915, x : 0, y : 21 }  // mobile-pad
        ]
    },
    {
        id              : 1135,
        gameTitle       : 'Shoot The Riches VIP',
        gameName        : 'shootTheRiches',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',      //b, r, y, g, p
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 97, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 42, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 29 }, // newWeb
            { scale : 1.11, x : 0, y : 25 }, // phone
            { scale : 0.949, x : 0, y : 7 }  // mobile-pad
        ]
    },
    {
        id              : 1133,
        gameTitle       : 'Three Wishes VIP',
        gameName        : 'threeWishesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 97,  'digit' : 10,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 13 }, // phone
            { scale : 0.928, x : 0, y : 12 } // pad
        ]
    },
    {
        id              : 1134,
        gameTitle       : 'Fa Cai Pot Link VIP',
        gameName        : 'faCaiPotLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 95, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.04, x : 0, y : 13 }, // mobile-phone
            { scale : 0.911, x : 0, y : -8 }  // mobile-pad
        ]
    },
    {
        id              : 1131,
        gameTitle       : 'Purrfect Bingo VIP',
        gameName        : 'purrfectBingoVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 45,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10,  x : 0, y : 20 }, // phone
            { scale : 0.905, x : 0, y : -8 } // pad
        ]
    },
    {
        id              : 1129,
        gameTitle       : 'Chili Fiesta VIP',
        gameName        : 'chiliFiestaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 91, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' : 65,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 41,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 18 }  // mobile-pad
        ]
    },

    {
        id              : 1130,
        gameTitle       : 'Inferno VS Storm VIP',
        gameName        : 'infernoVSStormVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        socialSlotID    : 1,
        jackpotNotiAttr : [
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -280 }, // -- Web
            { 'x' : 0, 'y' : -280 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.01, x : 0, y : 10 }, // phone
            { scale : 0.96, x : 0, y : 0 } // pad
        ],
        mobileRoomAttr       : [
            { scale : 0.96, x : 0, y : 5 }, // phone
            { scale : 0.96, x : 0, y : -1 } // pad
        ]
    },
    {
        id              : 1128,
        gameTitle       : 'FuFu Diamond VIP',
        gameName        : 'fuFuDiamondVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 123, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 100, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 5 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.920, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 1126,
        gameTitle       : 'Legacy Of The Gods VIP',
        gameName        : 'legacyOfTheGodsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' : 91,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 70,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -262 }, // -- Web
            { 'x' : 0, 'y' : -262 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 16 }, // phone
            { scale : 0.93, x : 0, y :  9 } // pad
        ]
    },

    {
        id              : 1127,
        gameTitle       : 'Little Piggy Trio VIP',
        gameName        : 'littlePiggyTrioVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 10 }, // phone
            { scale : 0.93, x : 0, y : 11 } // pad
        ]
    },
    {
        id              : 1125,
        gameTitle       : 'Royal Diamond VIP',
        gameName        : 'royalDiamondsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 77, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 48, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 30 }, // newWeb
            { scale : 1.118, x : 0, y : 17 }, // phone
            { scale : 0.94, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 1123,
        gameTitle       : 'Devils Vault VIP',
        gameName        : 'devilsVaultVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 117, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 22 }, // newWeb
            { scale : 1.088, x : 0, y : 18 }, // mobile-phone
            { scale : 0.933, x : 0, y : 31 }  // mobile-pad
        ]
    },
    {
        id              : 1121,
        gameTitle       : 'WOJ Cash Stash Vip',
        gameName        : 'wheelOfJackpotCSVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 12, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258  }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : -3 }, // phone
            { scale : 0.93, x : 0, y : -9 } // pad
        ]
    },
    {

        id              : 1119,
        gameTitle       : 'Spooky Pumpkin VIP',
        gameName        : 'spookyPumpkinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr: [
            { 'x': 96, 'y': 130, 'digit': 10, 'color': [ 255, 0, 255 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 104, 'digit': 9, 'color': [ 255, 0, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 78, 'digit': 8, 'color': [ 255, 255, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 }
        ],
        mobileGameOffset: [ // Mobile Only
            { 'x': 0, 'y': 0 }, // phone
            { 'x': 0, 'y': 0 }  // pad
        ],
        slotOffset: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        slotMenuAttr: [
            { 'x': 0, 'y': -263 }, // -- Web
            { 'x': 0, 'y': -256 }  // -- Mobile
        ],
        coinEffectAttr: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        totalPayNodeAttr: [
            { 'x': 0, 'y': -190 }, // -- Web
            { 'x': 0, 'y': -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 11}, // newWeb
            {scale: 1.0729, x: 0, y: 13}, // mobile-phone
            {scale: 0.922, x: 0, y: 0}  // mobile-pad
        ]
    },
    {
        id              : 1122,
        gameTitle       : 'Penguin Frenzy VIP',
        gameName        : 'penguinFrenzyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 80, 'y' : 106, 'digit' : 9, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 82, 'digit' :  8, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 57, 'digit' :  7, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -301 }, // -- Web
            { 'x' : 0, 'y' : -301 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 27 }, // phone
            { scale : 0.96, x : 3, y : 24 } // pad
        ]
    },
    {
        id: 1117,
        gameTitle: 'Honey Bee-ngo VIP',
        gameName: 'HoneyBeengoVip',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        frameColor      : 'g',
        isOpen: true,
        jackpotNotiAttr: [
            { 'x': 96, 'y': 130, 'digit': 10, 'color': [ 255, 0, 255 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 104, 'digit': 9, 'color': [ 255, 0, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 78, 'digit': 8, 'color': [ 255, 255, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 }
        ],
        mobileGameOffset: [ // Mobile Only
            { 'x': 0, 'y': 0 }, // phone
            { 'x': 0, 'y': 0 }  // pad
        ],
        slotOffset: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        slotMenuAttr: [
            { 'x': 0, 'y': -263 }, // -- Web
            { 'x': 0, 'y': -256 }  // -- Mobile
        ],
        coinEffectAttr: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        totalPayNodeAttr: [
            { 'x': 0, 'y': -190 }, // -- Web
            { 'x': 0, 'y': -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 22 }, // newWeb
            { scale : 1.06, x : 0, y : 22 }, // phone
            { scale : 0.90, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 1116,
        gameTitle       : 'Lucky Coin VIP',
        gameName        : 'luckyCoinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: 11}, // newWeb
            {scale: 1.04, x: 0, y: 7}, // mobile-phone
            {scale: 0.89, x: 0, y: -7}  // mobile-pad
        ]
    },
    {
        id              : 1115,
        gameTitle       : 'Golden Lantern Link VIP',
        gameName        : 'goldenLanternLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 150, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 13 }, // newWeb
            { scale : 1.08,  x : 0, y : 15 }, // mobile-phone
            { scale : 0.920, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 1118,
        gameTitle       : 'Golden Bier VIP',
        gameName        : 'goldenBeerVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 22 }, // newWeb
            { scale : 1.09,  x : 0, y : 15 }, // mobile-phone
            { scale : 0.945, x : 0, y : 4 }  // mobile-pad
        ]
    },
    {
        id              : 1114,
        gameTitle       : 'Sugar Factory VIP',
        gameName        : 'SugarFactoryVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'y',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 52, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 12 }, // phone
            { scale : 0.93, x : 0, y : -2 } // pad
        ]
    },
    {
        id              : 1113,
        gameTitle       : 'Solar and Lunar Link VIP',
        gameName        : 'sunMoonLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 106, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 10 }, // newWeb
            { scale : 1.113,  x : 0, y : 27 },   // phone
            { scale : 0.91,  x : 0, y : -8 }  // -- pad
        ]
    },
    {
        id              : 1111,
        gameTitle       : 'RNC Legends VIP',
        gameName        : 'rncLegendsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 98, 'y' : 90, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.068,  x : 3, y : 21 }, // newWeb
            { scale : 1.068,  x : 3, y : 21 }, // mobile-phone
            { scale : 0.925,  x : 1, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 1110,
        gameTitle       : 'Magic In Wonderland VIP',
        gameName        : 'magicInWonderlandVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.09,  x : 0, y : 16 },
            { scale : 0.95,  x : 0, y : 12 }
        ]
    },
    {
        id              : 1112,
        gameTitle       : 'Moon Festival Link VIP',
        gameName        : 'moonFestivalLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 6 }, // newWeb
            { scale : 1.07,  x : 0, y : 18 }, // mobile-phone
            { scale : 0.896, x : 0, y : 3 }  // mobile-pad
        ]
    },
    {
        id              : 1106,
        gameTitle       : 'Fortune Mine Link VIP',
        gameName        : 'goldRushLinkVip',
        typifyName      : 'LB_grSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 120, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 92, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 64, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.075, x : 0, y : 15 },  // phone
            { scale : 0.96,   x : 0, y : 21 }   // pad
        ]
    },
    {
        id              : 1109,
        gameTitle       : 'MadLabVIP',
        gameName        : 'madLabVIP',
        typifyName      : 'vip_mlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 126, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : -272 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04,  x : 0, y : 25 },
            { scale : 0.95, x : 0, y : 23 }
        ]
    },
    {
        id              : 1105,
        gameTitle       : 'Mega Cash VIP',
        gameName        : 'megaCashVip',
        typifyName      : 'LB_mcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 95, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 68, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 40, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.084, x : -1, y : 14 },  // phone
            { scale : 0.97,   x : 0, y : 8 }   // pad
        ]
    },
    {
        id              : 1104,
        gameTitle       : 'Fortune Pot Link VIP',
        gameName        : 'fortunePotLinkVip',
        typifyName      : 'vip_fplSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 126, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 21 }, // newWeb
            { scale : 1.114, x : -1, y : 18 },  // phone
            { scale : 0.93, x : 0, y : 8 }  // mobile-pad
        ]
    },
    {
        id              : 1103,
        gameTitle       : 'More More Gold VIP',
        gameName        : 'moreMoreGoldVip',
        // typifyName      : 'LB_hoSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -265 }, // -- Web
            { 'x' : 0, 'y' : -265 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 },   // oldWeb
            { scale : 0.96,  x : 0, y : -3 }, // newWeb
            { scale : 0.96,  x : 0, y : -3 }, // phone
            { scale : 0.96,  x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 1101,
        gameTitle       : 'RollingInMoneyVIP',
        gameName        : 'rollingInMoneyVip',
        // typifyName      : 'LB_fbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' :  91, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' :  68, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        slotOffset      : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr    : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 13 }, // newWeb
            { scale : 1.1,  x : 0, y : 13 },  // phone
            { scale : 0.940, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 1100,
        gameTitle       : 'Bank Of Jackpot VIP',
        gameName        : 'bankOfJackpotVip',
        typifyName      : 'LB_bjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 120, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 100, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.079,  x : -2, y : 17 },  // phone
            { scale : 0.918,  x : 0, y : -2 }   // pad
        ]
    },
    {
        id              : 1099,
        gameTitle       : 'Piggy King VIP',
        gameName        : 'piggyKingVip',
        typifyName      : 'vip_pgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 80, 'y' : 85, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 55, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -296 }, // -- Web
            { 'x' : 0, 'y' : -296 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 17 }, // newWeb
            { scale : 1.049, x : 0, y : 15 }, // mobile-phone
            { scale : 0.900, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 1097,
        gameTitle       : 'Midas Gold VIP',
        gameName        : 'midasGoldVip',
        // typifyName      : 'vip_hoSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr: [
            { scale: 1.062, x: 0, y: 19 },
            { scale: 1.0, x: 0, y: 17 }
        ]
    },
    {
        id              : 1096,
        gameTitle       : 'Dragons Diamond VIP',
        gameName        : 'dragonsDiamondVip',
        typifyName      : 'vip_ddSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y': -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.099,  x : 0, y : 15 },  // phone
            { scale : 0.96,  x : 0, y : 26 }   // pad
        ]
    },
    {
        id              : 1098,
        gameTitle       : 'Fortune Blast VIP',
        gameName        : 'fortuneBlastVip',
        typifyName      : 'vip_fbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 102, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 55, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.081,  x : 0, y : 15 },  // phone
            { scale : 0.91,  x : 0, y : -10 }   // pad
        ]
    },
    {
        id              : 1095,
        gameTitle       : 'Mermaid Magic VIP',
        gameName        : 'mermaidMagicVip',
        typifyName      : 'vip_mmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 60, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 37, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -257 }, // -- Web
            { 'x' : 0, 'y' : -257 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.1,  x : 0, y : 15 },  // phone
            { scale : 0.987,  x : -2, y : 22 }   // pad
        ]
    },
    {
        id              : 1093,
        gameTitle       : 'Candy Connect Link',
        gameName        : 'candyConnectLink',
        typifyName      : 'LB_ccSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 142, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 17 }, // newWeb
            { scale : 1.07, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 12 }  // mobile-pad
        ]
    },

    {
        id              : 1090,
        gameTitle       : 'Mammoth Stampede VIP',
        gameName        : 'mammothStampedeVip',
        typifyName      : 'vip_mamSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 82, 'y' : 99, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -257 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 92, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 92, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10,  x : 0, y : 20 },  // phone
            { scale : 0.96,  x : 0, y : 8 }   // pad
        ]
    },

    {
        id              : 1091,
        gameTitle       : 'Magical Jackpot Vip',
        gameName        : 'JackpotMagicVIP',
        typifyName      : 'vip_jmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 55, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 25, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : 0 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08,  x : 0, y : 17 },  // phone
            { scale : 0.95,  x : 0, y :  6 }   // pad
        ]

    },
    {
        id              : 1094,
        gameTitle       : 'Monster Parade VIP',
        gameName        : 'monsterParadeVip',
        typifyName      : 'vip_mpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 95, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 68, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : -1 }, // newWeb
            { scale : 1.08, x : 0, y : 9 }, // mobile-phone
            { scale : 0.89, x : 0, y : -33 }  // mobile-pad
        ]
    },
    {
        id              : 1088,
        gameTitle       : 'Jackpot Queens VIP',
        gameName        : 'jackpotQueensVip',
        typifyName      : 'vip_jqSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 66, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 40, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.15, x : 0, y : 0 },
            { scale : 1.0, x : 0, y : 0 }
        ]
    },
    {
        id              :  1087,
        gameTitle       : 'Gold Moon Link VIP',
        gameName        : 'goldMoonLinkVip',
        typifyName      : 'vip_gmlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 104, 'digit' : 10 }
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.87, x : -6, y : 21 }, // newWeb
            { scale : 1.066, x : -6, y : 16 }, // mobile-phone
            { scale : 0.904, x : 2, y : 11 }  // mobile-pad
        ]
    },
    {
        id              : 1086,
        gameTitle       : 'Burning Sun VIP',
        gameName        : 'burningSunVip',
        typifyName      : 'vip_bsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 77, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06,  x : 0, y : 17 },  // phone
            { scale : 0.94,  x : 17, y : 7 }   // pad
        ]
    },
    {
        id              : 1085,
        gameTitle       : 'Lunar Fortune Vip',
        gameName        : 'lunarFortuneVip',
        typifyName      : 'vip_lfSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.05, x : 0, y : 20 }, // -- phone
            { scale : 0.906,  x : 0, y : 9 }  // -- pad
        ]
    },
    {
        id              : 1084,
        slotType        : 'video',
        gameTitle       : 'Wild Wild Zeus VIP',
        gameName        : 'wildWildZeusVip',
        typifyName      : 'vip_wzSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            // { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0,  x : 0, y : 0 },    // phone
            { scale : 0.988,  x : 0, y : -6 }   // pad
        ]
    },
    {
        id              : 1083,
        gameTitle       : 'Vegas Diamond VIP',
        gameName        : 'vegasDiamondVip',
        typifyName      : 'vip_vdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        // mobileAttr       : [
        //     { scale : 1.13, x : 0, y : 22 }, // -- phone
        //     { scale : 0.92, x : 0, y :  2 }  // -- pad
        // ]
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.13, x : 0, y : 22 }, // newWeb
            { scale : 1.13, x : 0, y : 22 }, // mobile-phone
            { scale : 0.92, x : 0, y : 2 }  // mobile-pad
        ]
    },
    {
        id              : 1082,
        slotType        : 'video',
        gameTitle       : 'DiamondCats Vip',
        gameName        : 'diamondCatsVip',
        typifyName      : 'vip_dcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 77, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10,  x : 0, y : 40 },  // phone
            { scale : 0.93,  x : 0, y : 29 }   // pad
        ]
    },
    {
        id              : 1079,
        slotType        : 'video',
        gameTitle       : 'Treasure Of Oz Vip',
        gameName        : 'TreasureOfOzVip',
        typifyName      : 'vip_toSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 2, y : 37 - 7 },
            { scale : 0.94, x : 0, y : -4 }
        ],
        totalPayHeight : 69,
    },
    {
        id              : 1077,
        slotType        : 'video',
        gameTitle       : 'Indiana Coins VIP',
        gameName        : 'indianaCoinsVip',
        typifyName      : 'vip_icSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 135, 'digit' : 14, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.933, x : 0, y : 4 },
            { scale : 0.96, x : 0, y : -17 }
        ]
    },
    {
        id               : 1075,
        slotType         : 'video',
        gameTitle        : 'Bison Gold VIP',
        gameName         : 'BisonGoldVip',
        typifyName       : 'vip_bgSlotEntryAR',
        normalAnimation  : 'normal',
        overAnimation    : 'Over',
        matchAnimation   : 'match',
        lockedAnimation  : 'lock',
        isOpen           : true,
        frameColor      : 'r',
        jackpotNotiAttr  : [
            // { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.09, x : 0, y : 14 },
            { scale : 0.95, x : 0, y : 0 }
        ]
    },

    {
        id              : 1073,
        slotType        : 'classic',
        gameTitle       : 'Shark Parade VIP',
        gameName        : 'sharkParadeVip',
        typifyName      : 'vip_spSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 60, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 36, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 20 }, // phone
            { 'x' : 0, 'y' : 5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : 0 },
            { scale : 1.0, x : 0, y : 20 }
        ]
    },

    {
        id              : 1072,
        gameTitle       : 'Pharaoh Wilds VIP',
        gameName        : 'pharaohWildsVip',
        typifyName      : 'vip_pwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 77, 'y' : 105, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 20 },
            { scale : 0.961, x : 0, y : 18 }
        ],
        totalPayHeight : 75
    },
    {
        id              : 1070,
        gameTitle       : 'Fortune Panda VIP',
        gameName        : 'fortunePandaVip',
        typifyName      : 'vip_fpdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 12 }, // phone
            { 'x' : 0, 'y' : 0 - 12 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 30 },
            { scale : 0.97, x : 0, y : 45 }
        ]
    },
    {
        id              : 1069,
        slotType        : 'classic',
        gameTitle       : 'F.D JackpotReel VIP',
        gameName        : 'fortuneDiamondJackpotReelVip',
        typifyName      : 'vip_fjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166 - 57, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 20 }, // phone
            { 'x' : 0, 'y' : 0 - 12 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.01, x : 0, y : 32},
            { scale : 1.001, x : 0, y : 23 }
        ]
    },
    {
        id              : 1068,
        gameTitle       : 'All Star VIP',
        gameName        : 'AllStar Vip',
        typifyName      : 'vip_asSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166 - 80, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 12, 'y' : 142 - 80, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 14, 'y' : 119 - 80, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 24 }, // phone
            { 'x' : 0, 'y' : 0 - 24 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 2, y : 37 },
            { scale : 1.0, x : 0, y : 45 }
        ]
    },

    {
        id              : 1067,
        gameTitle       : 'Santas Gifts VIP',
        gameName        : 'santasGiftsVip',
        typifyName      : 'vip_sgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 74 + 14, 'y' : 102 - 7, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 12, 'y' : 78 - 7 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 12, 'y' : 55 - 7, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -280 }, // -- Web
            { 'x' : 2, 'y' : -280 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y :  0 }, // oldWeb
            { scale : 0.97, x : 0, y : 40 }, // newWeb
            { scale : 1.04, x : 0, y : 32 }, // mobile-phone
            { scale : 0.91, x : 0, y : 16 }  // mobile-pad
        ]
    },

    {
        id              : 1066,
        gameTitle       : 'Treasure Island VIP',
        gameName        : 'Treasure Islnad Vip',
        typifyName      : 'vip_tiSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75 + 8, 'y' : 166, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 8, 'y' : 142, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 8, 'y' : 119, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 10 }, // phone
            { 'x' : 0, 'y' : 0 - 10 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 31 },
            { scale : 0.96, x : 0, y : 40 }
        ],
        totalPayHeight : 75
    },
    {
        id              : 1064,
        gameTitle       : 'Vampires Roses VIP',
        gameName        : 'vampiresRosesVIP',
        typifyName      : 'vip_vrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85 + 14, 'y' : 87 + 57, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82 + 10, 'y' : 65 + 52, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78 + 8, 'y' : 41 + 50, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 14 }, // phone
            { 'x' : 0, 'y' : 0 - 14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.0, x : 0, y : 40 },
            { scale : 0.95, x : 0, y : 40 }
        ],
        totalPayHeight : 65
    },
    {
        id              : 1062,
        gameTitle       : 'Triple Wolf VIP',
        gameName        : 'TripleWolfVip',
        typifyName      : 'vip_twSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 75 + 4, 'y' : 113, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 68 + 4, 'y' : 89, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62 + 4, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 14 }, // phone
            { 'x' : 0, 'y' : 0 - 14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 47 },
            { scale : 0.93, x : 0, y : 43 }
        ]
    },
    {
        id              : 1059,
        gameTitle       : 'Jackpot Rush VIP',
        gameName        : 'JackpotRushVip',
        typifyName      : 'vip_jrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 72 + 6, 'y' : 89, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 6, 'y' : 60, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 6, 'y' : 35, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : 0 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 37 },
            { scale: 1, x: 0, y: 50 }
        ]
    },
    {
        id              : 1061,
        slotType        : 'video',
        gameTitle       : 'MrBillionaire VIP',
        gameName        : 'mrBillionaireVip',
        typifyName      : 'vip_mrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 91, 'y' : 100 - 22 - 12 + 60, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 78 - 26 - 14 + 60, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 55 - 30 - 15 + 60, 'digit' : 7, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.02, x :  0, y :  44 }, // newWeb
            { scale : 1.02, x :  0, y :  44 }, // mobile-phone
            { scale : 0.92, x :  0, y :  29 }  // mobile-pad
        ]
    },
    {
        id              : 1057,
        slotType        : 'classic',
        gameTitle       : 'Captain Shark VIP',
        gameName        : 'CaptainSharkVIP',
        typifyName      : 'vip_csSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 91, 'y' : 100 - 22 - 15 + 10, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 78 - 26 - 14 + 10, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 55 - 30 - 11 + 10, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : - 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 37 },
            { scale : 0.91, x : 0, y : 2 }
        ]
    },
    {
        id              : 1058,
        slotType        : 'video',
        gameTitle       : 'Fortune Tree VIP',
        gameName        : 'fortuneTreeVip',
        typifyName      : 'vip_ftSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 87 - 2, 'y' : 150 - 10, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 81, 'y' : 126 - 10, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 74, 'y' : 103 - 10, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : - 30 }, // phone
            { 'x' : 0, 'y' : - 20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -276 }, // -- Web
            { 'x' : 0, 'y' : -276 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.95, x : 0, y : 40 },
            { scale : 0.95, x : 0, y : 40 }
        ],
    },
    {
        id              :  1055,
        slotType        : 'video',
        gameTitle       : 'LuckyLamp VIP',
        gameName        : 'LuckyLampVip',
        typifyName      : 'vip_llSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 84, 'y' : 167, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 143, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 76, 'y' : 120, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 25 }, // phone
            { 'x' : 0, 'y' : 0 - 32 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -276 }, // -- Web
            { 'x' : 0, 'y' : -276 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 45 }, // 610
            { scale : 0.92, x : 0, y : 20 }// 640
        ],
        totalPayHeight : 71
    },
    {
        id              : 1056,
        slotType        : 'video',
        gameTitle       : 'Great Empire VIP',
        gameName        : 'GreatEmpireVIP',
        typifyName      : 'vip_gtSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 84, 'y' : 161, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 138, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 115, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0 - 3, 'y' : -7 }, // phone
            { 'x' : 0 - 3, 'y' : -5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -272 }, // -- Web
            { 'x' : 0, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 30 },
            { 'col' : 4, 'row' : 5, 'width' : 146, 'height' : 84, 'xSpace' : 30 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -210 }, // -- Web
            { 'x' : 0, 'y' : -210 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 40 }, // 610
            { scale : 0.92, x : 0, y : 12 }
        ],
    },
    {
        id              : 1054,
        slotType        : 'video',
        gameTitle       : 'Fishing Master2 VIP',
        gameName        : 'fishingMaster2Vip',
        typifyName      : 'vip_fm2SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 74 + 11, 'y' : 102 + 70, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 11, 'y' : 78 + 70, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 11, 'y' : 55 + 71, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -16 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 5, 'width' : 150, 'height' : 96, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 5, 'width' : 150, 'height' : 96, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.99, x : 0, y : 39 }, // 610
            { scale : 0.97, x : 0, y : 44 }  // 640
        ],
    },
    {
        id              :  1047,
        gameTitle       : 'GoldClovers',
        gameName        : 'goldenCloversVip',
        typifyName      : 'vip_gcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 87, 'digit' : 11, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 65, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 41, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -220 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 150, 'height' : 116, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 150, 'height' : 116, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 42 }, // 610
            { scale : 0.98, x : 0, y : 40 }  // 640
        ],
    },
    {
        id              : 1052,
        gameTitle       : 'Vegas Queens VIP',
        gameName        : 'vegasQueensVip',
        typifyName      : 'vip_vqSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 87, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 65, 'digit' : 10, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 41, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -240 }, // -- Web
            { 'x' : 2, 'y' : -240 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.94, x : 0, y : 33 }, // 610
            { scale : 0.95, x : 0, y : 33 }  // 640
        ],
        totalPayHeight : 67
    },
    {
        id              : 1048,
        gameTitle       : 'Fairy Mischief VIP',
        gameName        : 'fairyMischiefVip',
        typifyName      : 'vip_fcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          :  true,
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 129, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -240 }, // -- Web
            { 'x' : 2, 'y' : -240 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 140, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04,     x : 0, y : 55 },
            { scale : 1.03,     x : 0, y : 50 }
        ],
    },
    {
        id              : 1045,
        gameTitle       : 'Fu Wa Fu Bao VIP',
        gameName        : 'FuWaFuBaoVip',
        typifyName      : 'vip_ffSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          :  true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 125,  'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 101 , 'digit' : 11, 'color' : [ 255, 0, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 78,   'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -270 }, // -- Web
            { 'x' : 2, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 112, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -215 }, // -- Web
            { 'x' : 0, 'y' : -215 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 28 }, // 610
            { scale: 0.92, x: 0, y: 40 }  // 640
        ],
    },
    {
        id              : 1046,
        slotType        : 'classic',
        gameTitle       : 'Shining Link VIP',
        gameName        : 'shiningDiamondLinkVip',
        typifyName      : 'vip_dlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 131, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 108, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 85, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -40 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -280 }, // -- Web
            { 'x' : 0, 'y' : -280 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 142, 'height' : 116, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 142, 'height' : 116, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -170 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.11, x : 0, y : 44 }, // 610
            { scale : 0.98,    x : 0, y : 16 }
        ],
    },
    {
        id              : 1043,
        slotType        : 'classic',
        gameTitle       : 'Ocean Link VIP',
        gameName        : 'oceanLinkVip',
        typifyName      : 'vip_olSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 99, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 69 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 72, 'y' : 42, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -40 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 141, 'height' : 120, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 141, 'height' : 120, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 43 }, // 610
            { scale: 1.01, x: 0, y: 7 }
        ],
    },
    {
        id              : 1042,
        slotType        : 'classic',
        gameTitle       : 'Big Money VIP',
        gameName        : 'bigMoneyVip',
        typifyName      : 'vip_bmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 74 + 6, 'y' : 102 - 44, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 67 + 6, 'y' : 78 - 44, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 61 + 6, 'y' : 55 - 44, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -35 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 9, 'y' : -232 }, // -- Web
            { 'x' : 9, 'y' : -232 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 3, 'row' : 3, 'width' : 224, 'height' : 98, 'xSpace' : 30 },
            { 'col' : 3, 'row' : 3, 'width' : 224, 'height' : 98, 'xSpace' : 30 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -200 }, // -- Web
            { 'x' : 0, 'y' : -200 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 37 }, // 610
            { scale : 0.95, x : 0, y : -22 }
        ],
    },
    {
        id              : 1035,
        slotType        : 'classic',
        gameTitle       : 'Fortune Diamond VIP',
        gameName        : 'fortuneDiamondVip',
        typifyName      : 'vip_fdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 87, 'y' : 150, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 81, 'y' : 126, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 74, 'y' : 103, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 0.9 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -50 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }, // -- Web
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -172 }, // -- Web
            { 'x' : 0, 'y' : -172 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12, x : 0, y : 43 }, // 610
            { scale : 1.01, x : 0, y : -4 }  // 640
        ],
    },
    {
        id              : 1044,
        slotType        : 'video',
        gameTitle       : 'Wild Wild Buffalo',
        gameName        : 'wildWildBuffaloVip',
        typifyName      : 'vip_wbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 155, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 152, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 152, 'height' : 130, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.85, x : 0, y : 47 }, // newWeb
            { scale : 0.94, x : 0, y : 50 }, // -- phone
            { scale : 0.90,  x : 0, y : 35 }  // -- pad
        ]
    },
    {
        id              : 1041,
        slotType        : 'classic',
        gameTitle       : 'Gold Bar VIP',
        gameName        : 'goldBarVIP',
        typifyName      : 'vip_gbSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 144, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 79, 'y' : 121, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 72, 'y' :  99, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 0.9 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -50 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }, // -- Web
            { 'x' : 6, 'y' : -268, 'g_x' : -195, 'g_y' : 26 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 90, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -160 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 52 }, // 610
            { scale : 1.04, x : 0, y : 25 }  // 640
        ],
    },
    {
        id              :  1050,
        slotType        : 'classic',
        gameTitle       : 'GoldSpin VIP',
        gameName        : 'goldSpinVip',
        typifyName      : 'vip_gosSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 22, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : -2 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : -25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 8 }, // 610
            { scale : 0.93, x : 0, y : 30 }  // 640
        ],
    },
    {
        id              : 1040,
        slotType        : 'video',
        gameTitle       : 'Pumpkin Pot VIP',
        gameName        : 'pumpkinPotVip',
        typifyName      : 'vip_pkSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 71, 'y' : 100, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 63, 'y' : 78, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 56, 'y' : 54, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -260 }, // -- Web
            { 'x' : 2, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 143, 'height' : 85, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 143, 'height' : 85, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.02, x : 0, y : 34 }, // 610
            { scale : 0.938, x : 0, y : 26 }  // 640
        ],
    },
    {
        id              : 1039,
        slotType        : 'video',
        gameTitle       : 'Aloha Wheel Fever VIP',
        gameName        : 'alohaWheelVIP',
        typifyName      : 'vip_awSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 161, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }  // -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : -4, 'y' : -264 }, // -- Web
            { 'x' : -4, 'y' : -264 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 110, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 110, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 } // -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -250 }, // -- Web
            { 'x' : 0, 'y' : -250 }    // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 35 }, // 610
            { scale : 0.99, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 1023,
        slotType        : 'classic',
        gameTitle       : 'Jackpot X-Mas VIP',
        gameName        : 'jackpotXmasVip',
        typifyName      : 'vip_jxSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89 + 7, 'y' : 70, 'digit' : 11 },
            { 'x' : 81 + 7, 'y' : 44, 'digit' : 11 },
            { 'x' : 73 + 7, 'y' : 17, 'digit' : 11 }
        ],
        offset          : 0,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -32 }, // phone
            { 'x' : 0, 'y' : -17 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -68 }, // -- Web
            { 'x' : 0, 'y' : -68 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : -19, 'y' : -239, 'g_x' : -110, 'g_y' : 20 }, // -- Web
            { 'x' : -19, 'y' : -239, 'g_x' : -110, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // Mobile Only
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -160 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -148 }, // -- Web
            { 'x' : 3, 'y' : -185 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 47 }, // newWeb
            { scale : 1.05, x : 0, y : 54 }, // -- phone
            { scale : 0.90, x : 0, y : 25 }  // -- pad
        ]
    },
    {
        id              : 1014,
        slotType        : 'classic',
        gameTitle       : 'Wheel Of Jackpot VIP',
        gameName        : 'wheelOfJackpotVip',
        entryLevel      : 0,
        arrangeOrder    : 5,
        typifyName      : 'vip_wjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : -11, 'digit' : 11 },
            { 'x' : 56, 'y' : -39, 'digit' : 11, 'color' : [ 255, 0, 0 ] }
        ],
        offset          : -2,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -25 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -62 }, // -- Web
            { 'x' : 0, 'y' : -62 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 49, 'g_x' : -145, 'g_y' : -275 }, // -- Web
            { 'x' : 0, 'y' : 49, 'g_x' : -145, 'g_y' : -275 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 187, 'height' : 58, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 187, 'height' : 58, 'xSpace' : 0 }
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -192 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 43 }, // 610
            { scale : 1.13 * 1.09, x : 0, y : 7 }  // 640
        ],
    },
    {
        id              : 1028,
        slotType        : 'video',
        gameTitle       : 'Vegas Link VIP',
        gameName        : 'vegasLinkVip',
        typifyName      : 'vip_vlSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 148, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 123, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 101, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : -2, 'y' : -56 }, // -- Web
            { 'x' : -2, 'y' : -56 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 109, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 109, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 36 }, // 610
            { scale : 0.98, x : 3, y : 39 }  // 640
        ],
    },
    {
        id              : 1034,
        slotType        : 'video',
        gameTitle       : 'Diamond Wheel VIP',
        gameName        : 'diamondWheelVip',
        typifyName      : 'vip_dwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 10, 'digit' : 9, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont },
            { 'x' : 80, 'y' : -15, 'digit' : 8, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont },
            { 'x' : 78, 'y' : -38, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 30 }, // -- Web
            { 'x' : 0, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 95, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 144, 'height' : 95, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 44 }, // 610
            { scale : 1, x : 0, y : 35 }  // 640
        ],
    },
    {
        id              : 1012,
        slotType        : 'video',
        gameTitle       : 'Fortune pot VIP',
        gameName        : 'fortuneVip',
        entryLevel      : 0,
        arrangeOrder    : 10,
        typifyName      : 'vip_fpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -1,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -17 }, // phone
            { 'x' : 0, 'y' : -10 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -41 }, // -- Web
            { 'x' : 0, 'y' : -41 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 124, 'height' : 110 },
            { 'col' : 5, 'row' : 3, 'width' : 124, 'height' : 110 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -130 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -151 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.11, x : -1, y : 36 }, // 610
            { scale : 1.06, x : 0, y : 5 }  // 640
        ],
    },
    {
        id              : 1011,
        slotType        : 'classic',
        gameTitle       : 'Shining Diamond VIP',
        gameName        : 'shiningVip',
        entryLevel      : 0,
        arrangeOrder    : 15,
        typifyName      : 'vip_sdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        offset          : 0,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -32 }, // phone
            { 'x' : 0, 'y' : -10 }  // pad
        ],
        slotOffset           : [
            { 'x' : 3, 'y' : -68 }, // -- Web
            { 'x' : 3, 'y' : -68 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -110, 'g_y' : -217 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -110, 'g_y' : -217 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // Mobile Only
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 60, 'xSpace' : 59 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -148 }, // -- Web
            { 'x' : 3, 'y' : -188 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.19, x : 0, y : 18 }, // 610
            { scale : 1.025, x : 0, y : -16 }  // 640
        ],
    },
    {
        id              : 1018,
        slotType        : 'classic',
        gameTitle       : 'Fishing Master VIP',
        gameName        : 'fishingMasterVip',
        entryLevel      : 0,
        arrangeOrder    : 25,
        typifyName      : 'vip_fmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 74, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],
        offset          : 2,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -2 }, // phone
            { 'x' : 0, 'y' : 2 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -116 }, // -- Web
            { 'x' : 0, 'y' : -116 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -269, 'g_x' : -135, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -269, 'g_x' : -135, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 188, 'height' : 55, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 188, 'height' : 55, 'xSpace' : 0 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -163 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -200 }, // -- Web
            { 'x' : 3, 'y' : -207 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.14, x : 0, y : 60 }, // 610
            { scale : 1.031, x : 0, y : 28 }  // 640
        ],
    },
    {
        id              : 1036,
        slotType        : 'video',
        gameTitle       : 'Queen of Riches VIP',
        gameName        : 'queenOfRichesVIP',
        typifyName      : 'vip_qrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 100, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 53 }, // -- Web
            { 'x' : 0, 'y' : 53 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -270 }, // -- Web
            { 'x' : 0, 'y' : -270 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 148, 'height' : 110, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 148, 'height' : 110, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -10 }, // -- Web
            { 'x' : 0, 'y' : -10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.02, x : 0, y : 33 }, // 610
            { scale : 1, x : 0, y : 25 }  // 640
        ],
    },
    {
        id              : 1029,
        slotType        : 'classic',
        gameTitle       : 'Dragon Rising VIP',
        gameName        : 'dragonRisingVip',
        typifyName      : 'vip_drSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 64, 'digit' : 12, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 37, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 78, 'y' : 11, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -6 }  // pad
        ],
        slotOffset       : [
            { 'x' : 1, 'y' : -76 }, // -- Web
            { 'x' : 1, 'y' : -76 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 20 }, // -- Web
            { 'x' : 6, 'y' : -253, 'g_x' : -195, 'g_y' : 20 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 144, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 40 }, // 610
            { scale : 1, x : 0, y : 30 }  // 640
        ],
    },
    {
        id              : 1031,
        slotType        : 'classic',
        gameTitle       : 'Golden Eagle VIP',
        gameName        : 'goldenEagleVip',
        typifyName      : 'vip_geSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 64 + 20, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 37 + 17, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 11 + 13, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -26 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 4 }, // -- Web
            { 'x' : 0, 'y' : 4 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 26 }, // -- Web
            { 'x' : 6, 'y' : -256, 'g_x' : -195, 'g_y' : 26 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 135, 'height' : 82, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 135, 'height' : 82, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 44 }, // 610
            { scale : 0.98, x : 0, y : 42 }  // 640
        ],
        totalPayHeight : 60
    },
    {
        id              : 1024,
        slotType        : 'classic',
        gameTitle       : 'Hot Cash VIP',
        gameName        : 'hotCashVip',
        typifyName      : 'vip_hcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 71, 'digit' : 11 },
            { 'x' : 79, 'y' : 45, 'digit' : 11 },
            { 'x' : 72, 'y' : 21, 'digit' : 11 }
        ],

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -10 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -92 }, // -- Web
            { 'x' : 0, 'y' : -92 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -265, 'g_x' : -170, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -265, 'g_x' : -170, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -265
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 210, 'height' : 84, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 210, 'height' : 84, 'xSpace' : 0 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -163 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -200 }, // -- Web
            { 'x' : 3, 'y' : -207 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 42 }, // 610
            { scale : 0.89, x : 0, y : -40 }  // 640
        ]
    },
    {
        id              : 1030,
        slotType        : 'video',
        gameTitle       : 'King Of Savanna VIP',
        gameName        : 'kingOfSavannaVip',
        typifyName      : 'vip_ksSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 127, 'digit' : 11 }
        ]		,
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -33 }, // -- Web
            { 'x' : 0, 'y' : -33 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 148, 'height' : 122, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 148, 'height' : 122, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -145 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -145 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 41 }, // 610
            { scale : 0.98, x : 0, y : 43 }  // 640
        ],
    },
    {
        id              : 1026,
        slotType        : 'video',
        gameTitle       : 'Billionaire Piggy VIP',
        gameName        : 'billionairePiggyVip',
        typifyName      : 'vip_bpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 57, 'y' : 121, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset       : [
            { 'x' : -72, 'y' : 30 }, // -- Web
            { 'x' : -72, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 123, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 123, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1, x : 0, y : 35 }, // 610
            { scale : 0.9, x : 0, y : 25 }  // 640
        ],
        totalPayHeight : 65
    },
    {
        id              : 1016,
        slotType        : 'classic',
        gameTitle       : 'Golden Sheep VIP',
        gameName        : 'goldenSheepVip',
        entryLevel      : 0,
        arrangeOrder    : 30,
        typifyName      : 'vip_gsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 160, 0 ] },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ] }
        ],
        offset          : 3,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -7 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset           : [
            { 'x' : -95, 'y' : -77 },	// -- Web
            { 'x' : -95, 'y' : -77 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -135, 'g_y' : -245 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -135, 'g_y' : -245 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -177 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -177 }, // -- Web
            { 'x' : 0, 'y' : -205 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 43 }, // 610
            { scale : 1.03, x : 0, y : 28 }  // 640
        ],
    },
    {
        id              : 1015,
        slotType        : 'classic',
        gameTitle       : 'WOJ Double7 VIP',
        gameName        : 'wjDoubleSevenVip',
        entryLevel      : 0,
        arrangeOrder    : 40,
        typifyName      : 'vip_wj2SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 70 + 19, 'y' : -4 + 24, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            { 'x' : 60 + 27, 'y' : -31 + 23, 'digit' : 11, 'color' : [ 255, 160, 0 ] },
            { 'x' : 60 + 22, 'y' : -31 - 3, 'digit' : 11, 'color' : [ 255, 255, 0 ] }
        ],
        offset          : 5,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -27 }, // phone
            { 'x' : 0, 'y' : -5 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -32 }, // -- Web
            { 'x' : 0, 'y' : -32 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -230, 'g_x' : -156, 'g_y' : 20 }, // -- Web
            { 'x' : 0, 'y' : -230, 'g_x' : -156, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -255
        },
        symbolAttr           : [
            { 'col' : 3, 'row' : 3, 'width' : 186, 'height' : 55, 'xSpace' : 0 },
            { 'col' : 3, 'row' : 3, 'width' : 186, 'height' : 55, 'xSpace' : 0 }
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -135 }, // -- Web
            { 'x' : 0, 'y' : -185 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : -99, y : -48 }, // 610
            { scale : 1.14, x : -61, y : -64 }  // 640
        ],
    },
    {
        id              : 1008,
        slotType        : 'video',
        gameTitle       : 'Jackpot City VIP',
        gameName        : 'jackpotCityVip',
        entryLevel      : 0,
        arrangeOrder    : 60,
        typifyName      : 'vip_jcSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],
        offset          : 9,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -5 }, // phone
            { 'x' : 0, 'y' : -8 }  // pad
        ],
        slotOffset       : [
            { 'x' : -55, 'y' : 0 }, // -- Web
            { 'x' : -55, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 112, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 112, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -175 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.15, x : 0, y : 32 }, // 610
            { scale : 0.96, x : 0, y : 26 }  // 640
        ],
    },
    {
        id              : 1017,
        slotType        : 'classic',
        gameTitle       : 'Easter Jackpot VIP',
        gameName        : 'easterJackpotVip',
        entryLevel      : 0,
        arrangeOrder    : 50,
        typifyName      : 'vip_ejSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 174, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 151, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 70, 'y' : 127, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        offset          : 7,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -43 }, // phone
            { 'x' : 0, 'y' : -12 }  // pad
        ],
        slotOffset           : [
            { 'x' : 3, 'y' : -71 }, // -- Web
            { 'x' : 3, 'y' : -71 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -43, 'g_x' : -140, 'g_y' : -186 }, // -- Web
            { 'x' : 0, 'y' : -43, 'g_x' : -140, 'g_y' : -186 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 84, 'height' : 74, 'xSpace' : 59 },
            { 'col' : 5, 'row' : 3, 'width' : 84, 'height' : 74, 'xSpace' : 59 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -154 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 3, 'y' : -181 }, // -- Web
            { 'x' : 3, 'y' : -181 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 43 }, // 610
            { scale : 0.95, x : 0, y :  7 }  // 640
        ],
    },
    {
        id              : 1019,
        slotType        : 'classic',
        gameTitle       : 'Fiery 7 VIP',
        gameName        : 'fiery7Vip',
        entryLevel      : 0,
        arrangeOrder    : 35,
        typifyName      : 'vip_f7SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75, 'y' : 57, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 69, 'y' : 33, 'digit' : 11, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 11, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],
        offset          : 4,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -10 }, // phone
            { 'x' : 0, 'y' : 3 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -89 }, // -- Web
            { 'x' : 0, 'y' : -89 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -262, 'g_x' : -118, 'g_y' : 20 }, // -- Web
            { 'x' : 0, 'y' : -262, 'g_x' : -118, 'g_y' : 20 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 82, 'height' : 82, 'xSpace' : 64 },
            { 'col' : 5, 'row' : 3, 'width' : 82, 'height' : 82, 'xSpace' : 64 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -176 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -176 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07 , x : 0, y : 39 }, // 610
            { scale : 0.96, x : 0, y : 15 }  // 640
        ],
    },
    {
        id              : 1013,
        slotType        : 'classic',
        gameTitle       : 'Western Wild VIP',
        gameName        : 'westernWildVip',
        entryLevel      : 0,
        arrangeOrder    : 65,
        typifyName      : 'vip_wwSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 152, 'digit' : 11 }
        ],
        offset          : 10,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -60 }, // phone
            { 'x' : 0, 'y' : -20 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -72 }, // -- Web
            { 'x' : 0, 'y' : -72 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : 0, 'g_x' : -128, 'g_y' : -220 }, // -- Web
            { 'x' : 0, 'y' : 0, 'g_x' : -188, 'g_y' : -220 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 62, 'xSpace' : 60 },
            { 'col' : 5, 'row' : 3, 'width' : 60, 'height' : 62, 'xSpace' : 60 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -130 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -159 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.21, x : 0, y : 65 }, // 610
            { scale : 1.18, x : 0, y :  2 }  // 640
        ],
        totalPayHeight : 85
    },
    {
        id              : 1022,
        slotType        : 'video',
        gameTitle       : 'Cabaret Fever VIP',
        gameName        : 'cabaretFeverVip',
        typifyName      : 'vip_cfSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 82, 'y' : 79, 'digit' : 11 },
            { 'x' : 82, 'y' : 55, 'digit' : 11 },
            { 'x' : 74, 'y' : 33, 'digit' : 11 }
            // { 'x' : 60, 'y' : -11, 'digit' : 11, 'color' : [ 255, 0, 0 ] },
            // { 'x' : 56, 'y' : -38, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -30 }, // phone
            { 'x' : 0, 'y' : -30 }  // pad
        ],
        slotOffset       : [
            { 'x' : 126, 'y' : -2 }, // -- Web
            { 'x' : 126, 'y' : -2 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 3, 'row' : 3, 'width' : 94, 'height' : 94, 'xSpace' : 28 },
            { 'col' : 3, 'row' : 3, 'width' : 94, 'height' : 94, 'xSpace' : 28 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -155 }, // -- Web
            { 'x' : 0, 'y' : -155 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 36 }, // 610
            { scale : 1.03, x : 0, y : 33 }  // 640
        ],
    },
    {
        id              : 1004,
        slotType        : 'video',
        gameTitle       : 'Halloween Mansion VIP',
        gameName        : 'halloweenVip',
        entryLevel      : 0,
        arrangeOrder    : 55,
        typifyName      : 'vip_hmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : 8,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -22 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -15 }, // -- Web
            { 'x' : 0, 'y' : -15 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -145 }, // -- Web
            { 'x' : 0, 'y' : -175 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 15 }, // 610
            { scale : 1.02, x : 0, y : 35 }  // 640
        ],
    },
    {
        id              : 1025,
        slotType        : 'video',
        gameTitle       : 'Zeus Thunder VIP',
        gameName        : 'zeusThunderVip',
        typifyName      : 'vip_ztSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 100, 'digit' : 11 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -14 }, // phone
            { 'x' : 0, 'y' : -30 }  // pad
        ],
        slotOffset       : [
            { 'x' : -54, 'y' : 30 }, // -- Web
            { 'x' : -54, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 82, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 147, 'height' : 82, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -180 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -155 }, // -- Web
            { 'x' : 0, 'y' : -155 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 32 }, // 610
            { scale : 0.98, x : 0, y : 56 }  // 640
        ],
    },
    {
        id              : 1020,
        slotType        : 'classic',
        gameTitle       : 'Flaming Star VIP',
        gameName        : 'flamingStarVip',
        entryLevel      : 0,
        arrangeOrder    : 45,
        typifyName      : 'vip_fsSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 68, 'digit' : 11 }
        ],
        offset          : 6,

        mobileGameOffset     : [ // Mobile Only
            { 'x' : 0, 'y' : -30 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset           : [
            { 'x' : 0, 'y' : -44 }, // -- Web
            { 'x' : 0, 'y' : -44 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -250, 'g_x' : -170, 'g_y' : 25 }, // -- Web
            { 'x' : 0, 'y' : -250, 'g_x' : -170, 'g_y' : 25 }  // -- Mobile
        ],
        mobileSlotButtonAttr : { // only for mobile
            'type' : 'default', 'x' : 0, 'y' : -278
        },
        symbolAttr           : [
            { 'col' : 5, 'row' : 3, 'width' : 105, 'height' : 105, 'xSpace' : 37 },
            { 'col' : 5, 'row' : 3, 'width' : 105, 'height' : 105, 'xSpace' : 37 }
        ],
        coinEffectAttr       : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -179 }	// -- Mobile
        ],
        totalPayNodeAttr     : [
            { 'x' : 0, 'y' : -159 }, // -- Web
            { 'x' : 0, 'y' : -184 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 34 }, // 610
            { scale : 1, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 1021,
        slotType        : 'video',
        gameTitle       : 'Gold Mine VIP',
        gameName        : 'goldMineVip',
        entryLevel      : 0,
        arrangeOrder    : 20,
        typifyName      : 'vip_gmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 131, 'digit' : 11 }
        ],
        offset          : 1,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -14 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : -54, 'y' : 30 }, // -- Web
            { 'x' : -54, 'y' : 30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 94, 'height' : 94, 'xSpace' : 28 },
            { 'col' : 5, 'row' : 4, 'width' : 94, 'height' : 94, 'xSpace' : 28 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -180 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -160 }, // -- Web
            { 'x' : 0, 'y' : -195 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 0.92, x : 0, y : 2 }, // 610
            { scale : 0.92, x : 0, y : 20 }  // 640
        ],
    },
    {
        id              : 1010,
        slotType        : 'video',
        gameTitle       : 'Eldorado VIP',
        gameName        : 'eldoradoVip',
        entryLevel      : 5,
        arrangeOrder    : 70,
        typifyName      : 'vip_elSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -9,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -20 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 132, 'height' : 128, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 132, 'height' : 128, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -130 }, // -- Web
            { 'x' : 0, 'y' : -168 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.11, x : 0, y : 34 }  // 640
        ],
    },
    {
        id              : 1005,
        slotType        : 'video',
        gameTitle       : 'Shopaholic VIP',
        gameName        : 'shopaholicVip',
        entryLevel      : 8,
        arrangeOrder    : 75,
        typifyName      : 'vip_shSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],
        offset          : -8,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -21 }, // phone
            { 'x' : 0, 'y' : -25 }  // pad
        ],
        slotOffset       : [
            { 'x' : -17, 'y' : -7 }, // -- Web
            { 'x' : -17, 'y' : -7 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -266 }, // -- Web
            { 'x' : 0, 'y' : -266 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 113, 'height' : 112, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 113, 'height' : 112, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : -17, 'y' : -137 }, // -- Web
            { 'x' : -17, 'y' : -159 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12, x : 0, y : 36 }, // 610
            { scale : 1.07, x : 22, y : 33 }  // 640
        ],
        totalPayHeight : 78
    },
    {
        id              : 1006,
        slotType        : 'video',
        gameTitle       : 'Back to 70 VIP',
        gameName        : 'back70sVip',
        entryLevel      : 11,
        arrangeOrder    : 80,
        typifyName      : 'vip_70SlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -7,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -13 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 3 }, // -- Web
            { 'x' : 0, 'y' : 3 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 125, 'height' : 124 },
            { 'col' : 5, 'row' : 3, 'width' : 125, 'height' : 124 }
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -127 }, // -- Web
            { 'x' : 0, 'y' : -169 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.02, x : 0, y : 10 }  // 640
        ],
    },
    {
        id              : 1002,
        slotType        : 'video',
        gameTitle       : 'Cleopatra VIP',
        gameName        : 'cleopatraVip',
        entryLevel      : 14,
        arrangeOrder    : 85,
        typifyName      : 'vip_cpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -6,

        slotOffset       : [
            { 'x' : 0, 'y' : -30 }, // -- Web
            { 'x' : 0, 'y' : -30 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 130, 'height' : 130, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 130, 'height' : 130, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : 3, 'y' : -150 }, // -- Web
            { 'x' : 3, 'y' : -187 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.08, x : 0, y : 40 }  // 640
        ],
    },
    {
        id              : 1007,
        slotType        : 'video',
        gameTitle       : 'Hansel and Gretel VIP',
        gameName        : 'hanselVip',
        entryLevel      : 17,
        arrangeOrder    : 90,
        typifyName      : 'vip_hgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 63, 'y' : 151, 'digit' : 11 }
        ],
        offset          : -5,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -6 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : -24 }, // -- Web
            { 'x' : 0, 'y' : -24 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 128, 'height' : 118, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 128, 'height' : 118, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -154 }, // -- Web
            { 'x' : 0, 'y' : -170 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 3, 'y' : -154 }, // -- Web
            { 'x' : 3, 'y' : -186 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08, x : 0, y : 30 }, // 610
            { scale : 1.02, x : 0, y : 38 }  // 640
        ],
    },
    {
        id              : 1009,
        slotType        : 'video',
        gameTitle       : 'Queens Age VIP',
        gameName        : 'queensAgeVip',
        entryLevel      : 20,
        arrangeOrder    : 95,
        typifyName      : 'vip_qaSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -4,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -8 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.10, x : 0, y : 30 }, // 610
            { scale : 1.16, x : 0, y : 22 }  // 640
        ],
    },
    {
        id              : 1003,
        slotType        : 'video',
        gameTitle       : 'MadSpin VIP',
        gameName        : 'madSpinVip',
        entryLevel      : 23,
        arrangeOrder    : 100,
        typifyName      : 'vip_msSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 152, 'digit' : 11 }
        ],
        offset          : -3,

        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -17 }, // phone
            { 'x' : 0, 'y' : -14 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 },	// -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr     : [
            { 'x' : 0, 'y' : -266 }, // -- Web
            { 'x' : 0, 'y' : -266 }	// -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 135, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 135, 'height' : 135, 'xSpace' : 0 }
        ],
        totalPayNodeAttr : [
            { 'x' : -17, 'y' : -130 }, // -- Web
            { 'x' : -5, 'y' : -177 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 0, y : 15 }, // 610
            { scale : 1.07, x : 0, y : 7 }  // 640
        ],
    }
];

var VegasNormalSlots = [
    {
        id              : 33,
        shareID			: 27,   //share jackpotInfoGameID
        slotType        : 'vegas',
        gameTitle       : 'Classic Wild3',
        gameName        : 'classicWild3',
        typifyName      : 'c_cw3SlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 194 , 'y' : 164 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'scale' : 1.5 },
            { 'x' : 194 , 'y' : 123 , 'digit' : 11, 'color' : [ 255, 160, 0 ], 'scale' : 1.2 },
            { 'x' : 194 , 'y' : 88  , 'digit' : 11, 'color' : [ 255, 255, 0 ], 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.18, x : 2, y : -29 }  // 640
        ],
    },
    {
        id              : 27,
        slotType        : 'vegas',
        gameTitle       : 'Vegas Classic',
        gameName        : 'vegasClassic',
        typifyName      : 'c_cwSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiObj  : {
            // 'cache' : resClassicSlotList.SlotEntryJackpotAR,
            'ar' : 'c_slotEntryJackpotAR',
            'x' : 0, 'y' : 210,
            'jackpotList' : [
                { 'index': 0, 'animation': 'grand' },
                { 'index': 2, 'animation': 'mini' },
                { 'index': 1, 'animation': 'mega' }
            ]
        },
        jackpotNotiAttr : [
            { 'x' : 72 , 'y' : 85 , 'digit' : 9, 'color' : [ 255, 0, 0 ], 'scale' : 0.8 },
            { 'x' : 72, 'y' : 61 , 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.18, x : 0, y : -29 }  // 640
        ],
    },
    {
        id              : 32,
        shareID			: 27,
        slotType        : 'vegas',
        gameTitle       : 'Classic Wild2',
        gameName        : 'classicWild2',
        typifyName      : 'c_cw2SlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 67 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.15, x : 1, y : -28 }  // 640
        ],
    },
    {
        id              : 37,
        slotType        : 'vegas',
        gameTitle       : 'classic Five',
        gameName        : 'classicFive',
        typifyName      : 'c_5xSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 1,
        jackpotNotiAttr : [
            // { 'x' : 68, 'y' : 80, 'digit' : 11 }
            { 'x' : 202 , 'y' : 166 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'scale' : 1.5 },
            { 'x' : 202 , 'y' : 124 , 'digit' : 11, 'color' : [ 255, 160, 0 ], 'scale' : 1.2 },
            { 'x' : 202 , 'y' : 86  , 'digit' : 11, 'color' : [ 255, 255, 0 ], 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -18 }, // 610
            { scale : 1.15, x : 0, y : -20 }  // 640
        ],
    },
    {
        id              : 38,
        slotType        : 'vegas',
        gameTitle       : 'triple Diamond',
        gameName        : 'tripleDiamond',
        typifyName      : 'c_tdSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 1,
        jackpotNotiAttr : [
            { 'x' : 161 , 'y' : 76, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -18 }, // 610
            { scale : 1.15, x : 0, y : -22 }  // 640
        ],
    },
    {
        id              : 49,
        slotType        : 'vegas',
        gameTitle       : 'Wild Respin',
        gameName        : 'wildRespin',
        typifyName      : 'c_wrSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 + 10, 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12, x : 0, y : 0 }, // 610
            { scale : 1.05, x : 3, y : -10 }  // 640
        ],
    },
    {
        id              : 51,
        slotType        : 'vegas',
        gameTitle       : 'Extra Reel',
        gameName        : 'extraReel',
        typifyName      : 'c_erSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 161 , 'y' : 84 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -3 }, // 610
            { scale : 1.04   , x : 2, y : -10 }  // 640
        ],
    },
    {
        id              : 53,
        slotType        : 'vegas',
        gameTitle       : 'Purple Diamond',
        gameName        : 'purpleDiamond',
        typifyName      : 'c_pdSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 66 , 'y' : 60, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -3 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },
    {
        id              : 60,
        slotType        : 'vegas',
        gameTitle       : 'Triple Seven',
        gameName        : 'tripleSeven',
        typifyName      : 'c_t7SlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -1 }, // 610
            { scale : 1.04, x : 0, y : -17 }  // 640
        ]
    },
    {
        id              : 63,
        slotType        : 'vegas',
        gameTitle       : 'Black Diamond',
        gameName        : 'blackDiamond',
        typifyName      : 'c_bdSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 0, 'y' : 93 + 10 - 4, 'digit' : 9, 'color' : [ 255, 0, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 0, 'y' : 75 + 10 - 2, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 0, 'y' : 56 + 10 + 1, 'digit' : 9, 'color' : [ 255, 255, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.2, x : 0, y : -1 }, // 610
            { scale : 1.02, x : 0, y : -7 }  // 640
        ]
    },
    {
        id              : 65,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin',
        gameName        : 'burningRespin',
        typifyName      : 'c_brSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 160, 'y' : 82, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -1 }, // 610
            { scale : 1.04, x : 0, y : -7 }  // 640
        ]
    },
    {
        id              : 71,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Quick Fire',
        gameName        : 'burningWildQuickFire',
        typifyName      : 'c_bwqSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.02, x : 0, y : -10 }  // 640
        ]
    },
    // BWN 추가
    {
        id              : 74,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Nudging Fire',
        gameName        : 'burningWildNudgingFire',
        typifyName      : 'c_bwnSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59, 'y' : 66, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.02, x : 0, y : -10 }  // 640
        ]
    },
    // BRC 추가
    {
        id              : 76,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin Chili',
        gameName        : 'burningRespinChili',
        typifyName      : 'c_brcSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 160, 'y' : 82, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.14, x : 0, y : -2 }, // 610
            { scale : 1.00, x : 0, y : -10 }  // 640
        ]
    },
    // BR5 추가
    {
        id              : 78,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin 5X',
        gameName        : 'burningRespin5X',
        typifyName      : 'c_br5SlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 70, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : 0 }  // 640
        ]
    },
    // WH 추가
    {
        id              : 80,
        slotType        : 'vegas',
        gameTitle       : 'Wild Hit',
        gameName        : 'Wild Hit',
        typifyName      : 'c_whSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75, 'y' : 84, 'digit' : 11, 'scale' : 0.95, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.16, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },
    // BWL 추가
    {
        id              : 81,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Locking Fire',
        gameName        : 'burningWildLockingFire',
        typifyName      : 'c_bwlSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 55, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },

    {
        id              : 92,
        slotType        : 'keno',
        gameTitle       : 'megaBall',
        gameName        : 'megaBall',
        typifyName      : 'k_sbSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 63, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.1, x : 0, y : 30 },
            { scale : 0.95,  x : 0, y : 26 }
        ],
    },
    {
        id              : 107,
        slotType        : 'keno',
        gameTitle       : 'scarab',
        gameName        : 'scarab',
        typifyName      : 'k_skSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 61, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08,  x : 0, y : 27 },
            { scale : 0.95, x : 0, y : 26 }
        ]
    },
    {
        id              : 102,
        slotType        : 'vegas',
        gameTitle       : 'Epic Respin',
        gameName        : 'EpicRespin',
        typifyName      : 'c_crSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 20, 'y' : 116, 'digit' : 9, 'color' : [ 255, 0, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 20, 'y' : 97, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 20, 'y' : 80, 'digit' : 9, 'color' : [ 255, 255, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.091,  x : 4, y : -25 },     // phone
            { scale : 0.939, x : 2, y : -24 }       // pad
        ]
    },
        {
        id: 120,
        slotType : 'keno',
        gameTitle: 'Dino Keno',
        gameName: 'DinoKeno',
        typifyName: 'k_dkSlotEntryAR_mb', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
            jackpotNotiAttr: [
                { 'x' : 63, 'y' : 65, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
            ],
            mobileGameOffset : [ // Mobile Only
                { 'x' : 0, 'y' : 0 },       // phone
                { 'x' : 0, 'y' : 0 }        // pad
            ],
            slotMenuAttr         : [
                { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 },           // -- Web
                { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }       // -- Mobile
            ],
            mobileAttr       : [
                { scale : 1.08,  x : 0, y : 15 },           // phone
                { scale : 0.95, x : 0, y : 11 }             // pad
            ]
    },
    {
        id              : 108,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker',
        gameName        : 'MoneyMaker',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 65, 'digit' : 11 }
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 0 },           // phone
            { scale : 1.00, x : 0, y : -1 }            // pad
        ]
    },
    {
        id              : 89,
        slotType        : 'vegas',
        gameTitle       : '77 Wild',
        gameName        : '77Wild',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 64, 'digit': 11}
        ],
        mobileAttr       : [
            { scale : 1.17, x : 0, y : -22 },           // phone
            { scale : 1.02, x : 0, y : -22 }            // pad
        ]
    },
    {
        id: 124,
        slotType        : 'keno',
        gameTitle       : 'Triple Power Keno',
        gameName        : 'TriplePowerKeno',
        typifyName      : 'k_dkSlotEntryAR', // 키노엔트리
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            {'x': 68, 'y': 65, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.10, x : 0, y : 15 },
            { scale : 0.95, x : 0, y : 11 }
        ]
    },

    {
        id              : 141,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker Grand',
        gameName        : 'moneyMakerGrand',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 65, 'digit' : 11 }
        ],
        mobileAttr      : [
            { scale : 1.07, x : 0, y : -9 },
            { scale : 0.94, x : 0, y : -10 }
        ]
    },

    {
        id: 132,
        slotType : 'keno',
        gameTitle: 'Diamond Keno',
        gameName: 'freeSpinKeno',
        typifyName: 'k_slotEntry_132AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 60, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.06, x : 0, y : 14 },
            { scale : 0.94, x : 0, y : 14 }
        ]
    },
    {
        id: 230,
        slotType: 'keno',
        gameTitle: 'Fortune Pot Keno',
        gameName: 'FortunePotKeno',
        typifyName: 'k_slotEntry_230AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.88, x : 0, y : -4 }  // mobile-pad
        ]
    },
    {
        id: 231,
        slotType: 'keno',
        gameTitle: 'Hot Chili Keno',
        gameName: 'HotChiliKeno',
        typifyName: 'k_slotEntry_231AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 10 }, // newWeb
            { scale : 1.05, x : 0, y : 10 }, // mobile-phone
            { scale : 0.95, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id: 245,
        slotType: 'keno',
        gameTitle: 'Mega X Ball Keno',
        gameName: 'MegaXBallKeno',
        typifyName: 'k_slotEntry_245AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 65, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.00, x : 0, y : 6 }, // mobile-phone
            { scale : 0.94, x : 0, y : 3 }  // mobile-pad
        ]
    },
    {
        id              : 142,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker Wheel',
        gameName        : 'moneyMakerWheel',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 161, 'y' : 84, 'digit' : 11, 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileAttr      : [
            { scale : 1.07, x : 0, y : -2 },
            { scale : 0.94, x : 0, y : -10 }
        ]
    },
    {
        id: 189,
        slotType : 'keno',
        gameTitle: 'Double Seven Keno',
        gameName: 'doubleSevenKeno',
        typifyName: 'k_slotEntry_189AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        frameColor      : 'g',
        jackpotNotiAttr: [
            {'x': 68, 'y': 60, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.06, x : 0, y : 9 },
            { scale : 0.92, x : 0, y : 13 }
        ]
    },
    {
        id: 246,
        slotType : 'keno',
        gameTitle: 'Sharkeno',
        gameName: 'sharkeno',
        typifyName: 'k_slotEntry_246AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        frameColor      : 'g',
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.99, x : 0, y : 0 }  // mobile-pad
        ]
    }
];
var VegasVipSlots    = [
    {
        id              : 1033,
        shareID			: 1027,
        slotType        : 'vegas',
        gameTitle       : 'Classic Wild3 VIP',
        gameName        : 'classicWild3Vip',
        typifyName      : 'c_cw3VipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 194 , 'y' : 164 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'scale' : 1.5 },
            { 'x' : 194 , 'y' : 123 , 'digit' : 11, 'color' : [ 255, 160, 0 ], 'scale' : 1.2 },
            { 'x' : 194 , 'y' : 88  , 'digit' : 11, 'color' : [ 255, 255, 0 ], 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.18, x : 2, y : -29 }  // 640
        ],
    },
    {
        id              : 1027,
        slotType        : 'vegas',
        gameTitle       : 'Vegas Classic VIP',
        gameName        : 'vegasClassicVip',
        typifyName      : 'c_cwVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiObj  : {
            // 'cache' : resClassicSlotList.SlotEntryJackpotAR,
            'ar' : 'c_slotEntryJackpotAR',
            'x' : 0, 'y' : 210,
            'jackpotList' : [
                { 'index': 0, 'animation': 'grand' },
                { 'index': 2, 'animation': 'mini' },
                { 'index': 1, 'animation': 'mega' }
            ]
        },
        jackpotNotiAttr : [
            { 'x' : 72 , 'y' : 85 , 'digit' : 9, 'color' : [ 255, 0, 0 ], 'scale' : 0.8 },
            { 'x' : 72 , 'y' : 61 , 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.18, x : 0, y : -29 }  // 640
        ],
    },
    {
        id              : 1032,
        shareID			: 1027,
        slotType        : 'vegas',
        gameTitle       : 'Classic Wild2 VIP',
        gameName        : 'classicWild2Vip',
        typifyName      : 'c_cw2VipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 67 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -20 }, // 610
            { scale : 1.15, x : 1, y : -28 }  // 640
        ],
    },
    {
        id              : 1037,
        slotType        : 'vegas',
        gameTitle       : 'classic Five VIP',
        gameName        : 'classicFiveVIP',
        typifyName      : 'c_5xVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 1,
        jackpotNotiAttr : [
            { 'x' : 202 , 'y' : 166 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'scale' : 1.5 },
            { 'x' : 202 , 'y' : 124 , 'digit' : 11, 'color' : [ 255, 160, 0 ], 'scale' : 1.2 },
            { 'x' : 202 , 'y' : 86  , 'digit' : 11, 'color' : [ 255, 255, 0 ], 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -18 }, // 610
            { scale : 1.15, x : 0, y : -20 }  // 640
        ],
    },
    {
        id              : 1038,
        slotType        : 'vegas',
        gameTitle       : 'triple Diamond VIP',
        gameName        : 'tripleDiamondVIP',
        typifyName      : 'c_tdVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 1,
        jackpotNotiAttr : [
            { 'x' : 161 , 'y' : 76 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.28, x : 0, y : -18 }, // 610
            { scale : 1.15, x : 0, y : -22 }  // 640
        ],
    },
    {
        id              : 1049,
        slotType        : 'vegas',
        gameTitle       : 'Wild Respin VIP',
        gameName        : 'wildRespinVip',
        typifyName      : 'c_wrVipSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 + 10, 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.12, x : 0, y : 0 }, // 610
            { scale : 1.05, x : 3, y : -10 }  // 640
        ],
    },
    {
        id              : 1051,
        slotType        : 'vegas',
        gameTitle       : 'Extra Reel VIP',
        gameName        : 'extraReelVip',
        typifyName      : 'c_erVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 161 , 'y' : 84, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -3 }, // 610
            { scale : 1.04   , x : 2, y : -10 }  // 640
        ]
    },
    {
        id              : 1053,
        slotType        : 'vegas',
        gameTitle       : 'Purple Diamond VIP',
        gameName        : 'purpleDiamondVip',
        typifyName      : 'c_pdVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 66 , 'y' : 60 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : -170, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 35, 'g_x' : -170, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -3 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },
    {
        id              : 1060,
        slotType        : 'vegas',
        gameTitle       : 'Triple Seven VIP',
        gameName        : 'tripleSevenVip',
        typifyName      : 'c_t7VipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -1 }, // 610
            { scale : 1.04, x : 0, y : -17 }  // 640
        ]
    },
    {
        id              : 1063,
        slotType        : 'vegas',
        gameTitle       : 'Black Diamond VIP',
        gameName        : 'blackDiamondVip',
        typifyName      : 'c_bdVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 0, 'y' : 93 + 10 - 4, 'digit' : 9, 'color' : [ 255, 0, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 0, 'y' : 75 + 10 - 2, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 0, 'y' : 56 + 10 + 1, 'digit' : 9, 'color' : [ 255, 255, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.2, x : 0, y : -1 }, // 610
            { scale : 1.02, x : 0, y : -7 }  // 640
        ]
    },
    {
        id              : 1065,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin VIP',
        gameName        : 'burningRespinVip',
        typifyName      : 'c_brVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 160, 'y' : 82, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.20, x : 0, y : -1 }, // 610
            { scale : 1.04, x : 0, y : -7 }  // 640
        ]
    },
    {
        id              : 1071,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Quick Fire Vip',
        gameName        : 'burningWildQuickFireVip',
        typifyName      : 'c_bwqVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 65 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.02, x : 0, y : -10 }  // 640
        ]
    },
    // BWN 추가
    {
        id              : 1074,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Nudging Fire VIP',
        gameName        : 'burningWildNudgingFireVIP',
        typifyName      : 'c_bwnVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 59 , 'y' : 66 , 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.02, x : 0, y : -10 }  // 640
        ]
    },
    // BRC 추가
    {
        id              : 1076,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin Chili VIP',
        gameName        : 'burningRespinChiliVIP',
        typifyName      : 'c_brcVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        floorLayer 		: 0,
        jackpotNotiAttr : [
            { 'x' : 160, 'y' : 82, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.14, x : 0, y : -2 }, // 610
            { scale : 1.00, x : 0, y : -10 }  // 640
        ]
    },
    // BR5 추가
    {
        id              : 1078,
        slotType        : 'vegas',
        gameTitle       : 'Burning Respin 5X VIP',
        gameName        : 'burningRespin5XVIP',
        typifyName      : 'c_br5VipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 69, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : 0 }  // 640
        ]
    },
    // WH 추가
    {
        id              : 1080,
        slotType        : 'vegas',
        gameTitle       : 'Wild Hit VIP',
        gameName        : 'Wild HitVIP',
        typifyName      : 'c_whVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 75, 'y' : 84, 'digit' : 11, 'scale' : 0.95, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.16, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },
    // BWL 추가
    {
        id              : 1081,
        slotType        : 'vegas',
        gameTitle       : 'Burning Wild Locking Fire VIP',
        gameName        : 'burningWildLockingFireVIP',
        typifyName      : 'c_bwlVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 55, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.18, x : 0, y : -2 }, // 610
            { scale : 1.04, x : 0, y : -10 }  // 640
        ]
    },

    {
        id              : 1092,
        slotType        : 'keno',
        gameTitle       : 'MegaBall Keno VIP',
        gameName        : 'megaBallVip',
        typifyName      : 'k_sbVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 63, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.1, x : 0, y : 30 },
            { scale : 0.95,  x : 0, y : 26 }
        ],
    },
    {
        id              : 1107,
        slotType        : 'keno',
        gameTitle       : 'Scarab Keno VIP',
        gameName        : 'sacrabVip',
        typifyName      : 'k_skVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 61, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : -15 }, // phone
            { 'x' : 0, 'y' : -15 }  // pad
        ],
        slotOffset       : [
            { 'x' : 141, 'y' : 193 }, // -- Web
            { 'x' : 141, 'y' : 193 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 3, 'width' : 133, 'height' : 91, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -134 }, // -- Web
            { 'x' : 0, 'y' : -134 - 10 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08,  x : 0, y : 27 },
            { scale : 0.95, x : 0, y : 26 }
        ]
    },
    {
        id              : 1102,
        slotType        : 'vegas',
        gameTitle       : 'Epic Respin VIP',
        gameName        : 'EpicRespinVip',
        typifyName      : 'c_crVipSlotEntryAR_mb',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 20, 'y' : 116, 'digit' : 9, 'color' : [ 255, 0, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 20, 'y' : 97, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER },
            { 'x' : 20, 'y' : 80, 'digit' : 9, 'color' : [ 255, 255, 0 ],  'scale' : 0.75, 'align' : cc.TEXT_ALIGNMENT_CENTER }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -205, 'g_x' : 284, 'g_y' : 55 }, // -- Web
            { 'x' : 0, 'y' : -215 - 37, 'g_x' : 138, 'g_y' : 55 }  // -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.091,  x : 4, y : -25 },     // phone
            { scale : 0.939, x : 2, y : -24 }       // pad
        ]
    },
    {
        id: 1120,
        slotType : 'keno',
        gameTitle: 'Dino Keno VIP',
        gameName: 'VipDinoKeno',
        typifyName: 'k_dkVipSlotEntryAR_mb', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            { 'x' : 63, 'y' : 65, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 },       // phone
            { 'x' : 0, 'y' : 0 }        // pad
        ],
        slotMenuAttr         : [
            {'x': 0, 'y': -205, 'g_x': 284, 'g_y': 55},           // -- Web
            {'x': 0, 'y': -215 - 37, 'g_x': 138, 'g_y': 55}       // -- Mobile
        ],
        mobileAttr: [
            {scale: 1.08, x: 0, y: 15},           // phone
            {scale: 0.95, x: 0, y: 11}             // pad
        ]
    },
    {
        id              : 1108,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker VIP',
        gameName        : 'MoneyMakerVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 65, 'digit' : 11 }
        ],
        mobileAttr       : [
            { scale : 1.00, x : 0, y : 0 },           // phone
            { scale : 1.00, x : 0, y : -1 }            // pad
        ]
    },
    {
        id              : 1089,
        slotType        : 'vegas',
        gameTitle       : '77 Wild Vip',
        gameName        : '77WildVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 64, 'digit': 11}
        ],
        mobileAttr       : [
            { scale : 1.17, x : 0, y : -22 },           // phone
            { scale : 1.02, x : 0, y : -22 }            // pad
        ]
    },
    {
        id: 1124,
        slotType        : 'keno',
        gameTitle       : 'Triple Power Keno VIP',
        gameName        : 'VipTriplePowerKeno',
        typifyName      : 'k_dkSlotEntryAR', // 키노엔트리
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,

        jackpotNotiAttr : [
            {'x': 68, 'y': 65, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.10, x : 0, y : 15 },
            { scale : 0.95, x : 0, y : 11 }
        ]
    },

    {
        id              : 1141,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker Grand VIP',
        gameName        : 'moneyMakerGrandVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 68, 'y' : 65, 'digit' : 11 }
        ],
        mobileAttr      : [
            { scale : 1.07, x : 0, y : -9 },
            { scale : 0.94, x : 0, y : -10 }
        ]
    },

    {
        id: 1132,
        slotType        : 'keno',
        gameTitle: 'Diamond Keno VIP',
        gameName: 'freeSpinKeno',
        typifyName: 'k_slotEntry_132AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 60, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.06, x : 0, y : 14 },
            { scale : 0.94, x : 0, y : 14 }
        ]
    },
    {
        id: 1230,
        slotType: 'keno',
        gameTitle: 'Fortune Pot Keno VIP',
        gameName: 'VipFortunePotKeno',
        typifyName: 'k_slotEntry_230AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.97, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id: 1231,
        slotType: 'keno',
        gameTitle: 'Hot Chili Keno VIP',
        gameName: 'VipHotChiliKeno',
        typifyName: 'k_slotEntry_231AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 10 }, // newWeb
            { scale : 1.05, x : 0, y : 10 }, // mobile-phone
            { scale : 0.95, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id: 1245,
        slotType: 'keno',
        gameTitle: 'Mega X Ball Keno VIP',
        gameName: 'VipMegaXBallKeno',
        typifyName: 'k_slotEntry_245AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 65, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.00, x : 0, y : 6 }, // mobile-phone
            { scale : 0.94, x : 0, y : 3 }  // mobile-pad
        ]
    },

    {
        id              : 1142,
        slotType        : 'vegas',
        gameTitle       : 'Money Maker Wheel VIP',
        gameName        : 'moneyMakerWheelVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 161, 'y' : 84, 'digit' : 11, 'font' : resNewLobby.MiniCountFont, 'scale' : 1.8 }
        ],
        mobileAttr      : [
            { scale : 1.07, x : 0, y : -2 },
            { scale : 0.94, x : 0, y : -10 }
        ]
    },
    {
        id: 1189,
        slotType : 'keno',
        gameTitle: 'Double Seven Keno VIP',
        gameName: 'doubleSevenKenoVip',
        typifyName: 'slotEntry_189AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        frameColor      : 'g',
        jackpotNotiAttr: [
            {'x': 68, 'y': 60, 'digit': 11}
        ],
        mobileAttr      : [
            { scale : 1.06, x : 0, y : 9 },
            { scale : 0.92, x : 0, y : 13 }
        ]
    },
    {
        id: 1246,
        slotType: 'keno',
        gameTitle: 'Sharkeno VIP',
        gameName: 'sharkenoVip',
        typifyName: 'k_slotEntry_246AR_web', // 키노엔트리
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        isOpen: true,
        jackpotNotiAttr: [
            {'x': 68, 'y': 63, 'digit': 11}
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.05, x : 0, y : 6 }, // newWeb
            { scale : 1.05, x : 0, y : 6 }, // mobile-phone
            { scale : 0.99, x : 0, y : 0 }  // mobile-pad
        ]
    },
];

// membership pass extreme slots
var MemberShipSlots = [
    {
        id              : 11070,
        gameTitle       : 'Fortune Panda VIP',
        gameName        : 'fortunePandaVip',
        typifyName      : 'vip_fpdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 62 + 25, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 - 12 }, // phone
            { 'x' : 0, 'y' : 0 - 12 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.03, x : 0, y : 30 },
            { scale : 0.97, x : 0, y : 45 }
        ]
    },
    {
        id              : 11079,
        slotType        : 'video',
        gameTitle       : 'Treasure Of Oz Vip',
        gameName        : 'TreasureOfOzVip',
        typifyName      : 'vip_toSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.05, x : 2, y : 37 - 7 },
            { scale : 0.94, x : 0, y : -4 }
        ],
        totalPayHeight : 69,
    },
    {
        id              : 11083,
        gameTitle       : 'Vegas Diamond VIP',
        gameName        : 'vegasDiamondVip',
        typifyName      : 'vip_vdSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'b',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        // mobileAttr       : [
        //     { scale : 1.13, x : 0, y : 22 }, // -- phone
        //     { scale : 0.92, x : 0, y :  2 }  // -- pad
        // ]
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 1.13, x : 0, y : 22 }, // newWeb
            { scale : 1.13, x : 0, y : 22 }, // mobile-phone
            { scale : 0.92, x : 0, y : 2 }  // mobile-pad
        ]
    },
    {
        id              : 11085,
        gameTitle       : 'Lunar Fortune Vip',
        gameName        : 'lunarFortuneVip',
        typifyName      : 'vip_lfSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 74, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : -272 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.05, x : 0, y : 20 }, // -- phone
            { scale : 0.906,  x : 0, y : 9 }  // -- pad
        ]
    },
    {
        id              : 11091,
        gameTitle       : 'Magical Jackpot Vip',
        gameName        : 'JackpotMagicVIP',
        typifyName      : 'vip_jmSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 85, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 55, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 95, 'y' : 25, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 2, 'y' : -272 }, // -- Web
            { 'x' : 2, 'y' : 0 }  // -- Mobile
        ],
        symbolAttr       : [
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 },
            { 'col' : 5, 'row' : 4, 'width' : 145, 'height' : 100, 'xSpace' : 0 }
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -220 }, // -- Web
            { 'x' : 0, 'y' : -220 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.08,  x : 0, y : 17 },  // phone
            { scale : 0.95,  x : 0, y :  6 }   // pad
        ]

    },
    {
        id              : 11093,
        gameTitle       : 'Candy Connect Link',
        gameName        : 'candyConnectLink',
        typifyName      : 'LB_ccSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 62, 'y' : 142, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 62, 'y' : 142, 'digit' : 9, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 17 }, // newWeb
            { scale : 1.07, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {
        id              : 11094,
        gameTitle       : 'Monster Parade VIP',
        gameName        : 'monsterParadeVip',
        typifyName      : 'vip_mpSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'p',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 95, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 68, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -260 }, // -- Web
            { 'x' : 0, 'y' : -260 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : -1 }, // newWeb
            { scale : 1.08, x : 0, y : 9 }, // mobile-phone
            { scale : 0.89, x : 0, y : -33 }  // mobile-pad
        ]
    },
    {
        id              : 11099,
        gameTitle       : 'Piggy King VIP',
        gameName        : 'piggyKingVip',
        typifyName      : 'vip_pgSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'r',
        jackpotNotiAttr : [
            { 'x' : 80, 'y' : 85, 'digit' : 11, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 55, 'digit' : 11, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 25, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -296 }, // -- Web
            { 'x' : 0, 'y' : -296 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 17 }, // newWeb
            { scale : 1.049, x : 0, y : 15 }, // mobile-phone
            { scale : 0.900, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 11100,
        gameTitle       : 'Bank Of Jackpot VIP',
        gameName        : 'bankOfJackpotVip',
        typifyName      : 'LB_bjSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'y',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 120, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 100, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -258 }, // -- Web
            { 'x' : 0, 'y' : -258 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.079,  x : -2, y : 17 },  // phone
            { scale : 0.918,  x : 0, y : -2 }   // pad
        ]
    },
    {
        id              : 11101,
        gameTitle       : 'RollingInMoneyVIP',
        gameName        : 'rollingInMoneyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' :  91, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' :  68, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        slotOffset      : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr    : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 13 }, // newWeb
            { scale : 1.1,  x : 0, y : 13 },  // phone
            { scale : 0.940, x : 0, y : 6 }  // mobile-pad
        ]
    },
    {
        id              : 11104,
        gameTitle       : 'Fortune Pot Link VIP',
        gameName        : 'fortunePotLinkVip',
        typifyName      : 'vip_fplSlotEntryAR',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',
        jackpotNotiAttr : [
            { 'x' : 60, 'y' : 126, 'digit' : 11, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -256 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 21 }, // newWeb
            { scale : 1.114, x : -1, y : 18 },  // phone
            { scale : 0.93, x : 0, y : 8 }  // mobile-pad
        ]
    },
    {
        id              : 11114,
        gameTitle       : 'Sugar Factory VIP',
        gameName        : 'SugarFactoryVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'y',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 52, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.06, x : 0, y : 12 }, // phone
            { scale : 0.93, x : 0, y : -2 } // pad
        ]
    },
    {
        id              : 11116,
        gameTitle       : 'Lucky Coin VIP',
        gameName        : 'luckyCoinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -263 }, // -- Web
            { 'x' : 0, 'y' : -256 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: 11}, // newWeb
            {scale: 1.04, x: 0, y: 7}, // mobile-phone
            {scale: 0.89, x: 0, y: -7}  // mobile-pad
        ]
    },
    {
        id: 11117,
        gameTitle: 'Honey Bee-ngo VIP',
        gameName: 'HoneyBeengoVip',
        normalAnimation: 'normal',
        overAnimation: 'Over',
        matchAnimation: 'match',
        lockedAnimation: 'lock',
        frameColor      : 'g',
        isOpen: true,
        jackpotNotiAttr: [
            { 'x': 96, 'y': 130, 'digit': 10, 'color': [ 255, 0, 255 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 104, 'digit': 9, 'color': [ 255, 0, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 78, 'digit': 8, 'color': [ 255, 255, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 }
        ],
        mobileGameOffset: [ // Mobile Only
            { 'x': 0, 'y': 0 }, // phone
            { 'x': 0, 'y': 0 }  // pad
        ],
        slotOffset: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        slotMenuAttr: [
            { 'x': 0, 'y': -263 }, // -- Web
            { 'x': 0, 'y': -256 }  // -- Mobile
        ],
        coinEffectAttr: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        totalPayNodeAttr: [
            { 'x': 0, 'y': -190 }, // -- Web
            { 'x': 0, 'y': -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 22 }, // newWeb
            { scale : 1.06, x : 0, y : 22 }, // phone
            { scale : 0.90, x : 0, y : 12 }  // mobile-pad
        ]
    },
    {

        id              : 11119,
        gameTitle       : 'Spooky Pumpkin VIP',
        gameName        : 'spookyPumpkinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr: [
            { 'x': 96, 'y': 130, 'digit': 10, 'color': [ 255, 0, 255 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 104, 'digit': 9, 'color': [ 255, 0, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 },
            { 'x': 96, 'y': 78, 'digit': 8, 'color': [ 255, 255, 0 ], 'font': resNewLobby.MiniCountFont, 'scale': 1 }
        ],
        mobileGameOffset: [ // Mobile Only
            { 'x': 0, 'y': 0 }, // phone
            { 'x': 0, 'y': 0 }  // pad
        ],
        slotOffset: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        slotMenuAttr: [
            { 'x': 0, 'y': -263 }, // -- Web
            { 'x': 0, 'y': -256 }  // -- Mobile
        ],
        coinEffectAttr: [
            { 'x': 0, 'y': 0 }, // -- Web
            { 'x': 0, 'y': 0 }	// -- Mobile
        ],
        totalPayNodeAttr: [
            { 'x': 0, 'y': -190 }, // -- Web
            { 'x': 0, 'y': -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 11}, // newWeb
            {scale: 1.0729, x: 0, y: 13}, // mobile-phone
            {scale: 0.922, x: 0, y: 0}  // mobile-pad
        ]
    },
    {
        id              : 11125,
        gameTitle       : 'Royal Diamond VIP',
        gameName        : 'royalDiamondsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 83, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 77, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 77, 'y' : 48, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 30 }, // newWeb
            { scale : 1.118, x : 0, y : 17 }, // phone
            { scale : 0.94, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 11127,
        gameTitle       : 'Little Piggy Trio VIP',
        gameName        : 'littlePiggyTrioVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 98, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -264 }, // -- Web
            { 'x' : 0, 'y' : -264 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.04, x : 0, y : 10 }, // phone
            { scale : 0.93, x : 0, y : 11 } // pad
        ]
    },
    {
        id              : 11128,
        gameTitle       : 'FuFu Diamond VIP',
        gameName        : 'fuFuDiamondVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 123, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 100, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 5 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.920, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 11129,
        gameTitle       : 'Chili Fiesta VIP',
        gameName        : 'chiliFiestaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 94, 'y' : 91, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' : 65,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 92, 'y' : 41,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.91, x : 0, y : 18 }  // mobile-pad
        ]
    },
    {
        id              : 11133,
        gameTitle       : 'Three Wishes VIP',
        gameName        : 'threeWishesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 97,  'digit' : 10,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -261 }, // -- Web
            { 'x' : 0, 'y' : -261 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 13 }, // phone
            { scale : 0.928, x : 0, y : 12 } // pad
        ]
    },
    {
        id              : 11134,
        gameTitle       : 'Fa Cai Pot Link VIP',
        gameName        : 'faCaiPotLinkVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 95, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : -1 }, // newWeb
            { scale : 1.04, x : 0, y : 13 }, // mobile-phone
            { scale : 0.911, x : 0, y : -8 }  // mobile-pad
        ]
    },
    {
        id              : 11135,
        gameTitle       : 'Shoot The Riches VIP',
        gameName        : 'shootTheRichesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        frameColor      : 'g',      //b, r, y, g, p
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 97, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 69, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 42, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.96, x : 0, y : 29 }, // newWeb
            { scale : 1.11, x : 0, y : 25 }, // phone
            { scale : 0.949, x : 0, y : 7 }  // mobile-pad
        ]
    },
    {
        id              : 11136,
        gameTitle       : 'Merlins Magic Box VIP',
        gameName        : 'MerlinsMagicBoxVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'r',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 89, 'y' : 112, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 89,  'digit' : 9,  'color' : [ 255, 0, 0  ],  'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 66,  'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        mobileAttr       : [
            { scale : 1.07, x : 0, y : 24 }, // phone
            { scale : 0.915, x : 0, y : 21 }  // pad
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 24 }, // newWeb
            { scale : 1.07, x : 0, y : 24 }, // mobile-phone
            { scale : 0.915, x : 0, y : 21 }  // mobile-pad
        ]
    },
    {
        id              : 11137,
        gameTitle       : 'Jungle\'s Treasure VIP',
        gameName        : 'junglesTreasureVIP',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 92, 'y' : 109, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -263 }, // -- Web
            { 'x' : 1, 'y' : -263 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 21 }, // newWeb
            { scale : 1.061, x : 0, y : 21 }, // phone
            { scale : 0.928, x : 0, y : 9 }  // mobile-pad
        ]
    },
    {
        id              : 11144,
        gameTitle       : 'Golden Egg Drop VIP',
        gameName        : 'goldenEggDropVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',      //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 96, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.89, x : 0, y : 0 }, // newWeb
            { scale : 1.06, x : 0, y : 20 }, // mobile-phone
            { scale : 0.88, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 11148,
        gameTitle       : 'Monster Parade Boost VIP',
        gameName        : 'monsterParadeBoostVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'p',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 105, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 78, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.91, x: 0, y: -2}, // newWeb
            {scale: 1.101, x: 0, y: 14}, // mobile-phone
            {scale: 0.91, x: 0, y: -11}  // mobile-pad
        ]
    },
    {
        id              : 11150,
        gameTitle       : 'Sands Of Fortune VIP',
        gameName        : 'sandsOfFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 93, 'y' :  75, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 91, 'y' :  49, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 30 }, // newWeb
            { scale : 1.091, x : 0, y : 25 }, // mobile-phone
            { scale : 0.914, x : 0, y : 10 }  // mobile-pad
        ]
    },
    {
        id              : 11153,
        gameTitle       : 'The DogFather VIP',
        gameName        : 'theDogFatherVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 122, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 92, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.91, x : 0, y : 13 }, // newWeb
            { scale : 1.04, x : 0, y : 11 }, // mobile-phone
            { scale : 0.9, x : 0, y : -2 }  // mobile-pad
        ]
    },
    {
        id              : 11155,
        gameTitle       : 'Golden Honey Pot VIP',
        gameName        : 'goldenHoneyPotVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 98, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 72, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 46, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 19 }, // newWeb
            { scale : 1.07, x : 0, y : 16 }, // mobile-phone
            { scale : 0.937, x : 0, y : 11 }  // mobile-pad
        ]
    },
    {
        id              :  11156,
        gameTitle       : 'Go Catch Fish VIP',
        gameName        : 'goCatchFishVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'b',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 90, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 65, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -255 }, // -- Web
            { 'x' : 0, 'y' : -255 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.92, x: 0, y: 9}, // newWeb
            {scale: 1.04, x: 0, y: 11}, // mobile-phone
            {scale: 0.927, x: 0, y: 4}  // mobile-pad
        ]
    },
    {
        id              : 11157,
        gameTitle       : 'Triple Me Treasure VIP',
        gameName        : 'tripleMeTreasuresVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :122, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 97, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 73, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 1, 'y' : -259 }, // -- Web
            { 'x' : 1, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.90, x : 0, y : 10 }, // newWeb
            { scale : 1.07, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 11160,
        gameTitle       : 'Bananza Coins VIP',
        gameName        : 'bananzaCoinsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 96, 'y' : 104, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 15}, // newWeb
            {scale: 1.1, x: 0, y: 18}, // mobile-phone
            {scale: 0.93, x: 0, y: 7}  // mobile-pad
        ]
    },
    {
        id              : 11163,
        gameTitle       : 'El Toro Parade VIP',
        gameName        : 'elToroParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        frameColor      : 'g',        //b, r, y, g, p
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 115, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 88, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 66, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.93, x: 0, y: 4}, // newWeb
            {scale: 1.07, x: 0, y: 11}, // mobile-phone
            {scale: 0.93, x: 0, y: -1}  // mobile-pad
        ]
    },
    {
        id              : 11164,
        gameTitle       : 'The Tale Of Cinderella VIP',
        gameName        : 'theTaleOfCinderellaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 95, 'y' : 102, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 80, 'digit' : 9, 'color' : [ 255, 0, 0  ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 22 }, // mobile-phone
            { scale : 0.920, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 11165,
        gameTitle       : 'Frog Prince Magic VIP',
        gameName        : 'frogPrinceMagicVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        slotMenuAttr         : [
            { 'x' : 0, 'y' : -259 }, // -- Web
            { 'x' : 0, 'y' : -259 }  // -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr: [
            {scale: 1, x: 0, y: 0}, // oldWeb
            {scale: 0.94, x: 0, y: 18}, // newWeb
            {scale: 1.09, x: 0, y: 20}, // mobile-phone
            {scale: 0.924, x: 0, y: 8}  // mobile-pad
        ]
    },
    {
        id              :  11176,
        gameTitle       : 'SpookyMansion VIP',
        gameName        : 'spookyMansionVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 94, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.94, x : 0, y : 14 }, // oldWeb
            { scale : 0.87, x : 0, y : 17 }, // newWeb
            { scale : 1, x : 0, y : 34 }, // mobile-phone
            { scale : 0.84, x : 0, y : -5 }  // mobile-pad
        ]
    },
    {
        id              : 11185,
        gameTitle       : 'Diggy Crush VIP',
        gameName        : 'diggyCrushVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 101, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 76, 'digit' : 9, 'color' : [ 255, 160, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 50, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 20 }, // newWeb
            { scale : 1.09, x : 0, y : 13 }, // mobile-phone
            { scale : 0.93, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 11187,
        gameTitle       : 'WickedBoosFamily VIP',
        gameName        : 'wickedBoosFamilyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 132, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 85, 'y' : 106, 'digit' : 9, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 82, 'y' : 80, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 19 }, // newWeb
            { scale : 1.06, x : 0, y : 15 }, // mobile-phone
            { scale : 0.91, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 11193,
        gameTitle       : 'Alchemy Trio VIP',
        gameName        : 'alchemyTrioVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.94, x : 0, y : 25 }, // newWeb
            { scale : 1.07, x : 2, y : 17 }, // mobile-phone
            { scale : 0.92, x : 5, y : 12 }  // mobile-pad
        ],
    },
    {
        id              : 11196,
        gameTitle       : 'Eggcellent Atelier VIP',
        gameName        : 'eggcellentAtelierVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' :118, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 94, 'digit' : 9,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 71, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  11}, // newWeb
            { scale : 1.06, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 11197,
        gameTitle       : 'Striking Gold VIP',
        gameName        : 'strikingGoldVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 15 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.90, x : 0, y : 0 }  // mobile-pad
        ],
    },
    {
        id              :  11199,
        gameTitle       : 'Eternal Love VIP',
        gameName        : 'eternalLoveVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 110, 'digit' : 10, 'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 83, 'digit' : 9, 'color' : [ 255,  160,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 58, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.93, x :  0, y :  10 }, // newWeb
            { scale : 1.06, x :  0, y :  20 }, // mobile-phone
            { scale : 0.9, x :  0, y :  0 }  // mobile-pad
        ],
    },
    {
        id              : 11206,
        gameTitle       : 'Potato Kingdom VIP',
        gameName        : 'potatoKingdomVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 5 }, // mobile-phone
            { scale : 0.95, x : 0, y : 5 }  // mobile-pad
        ]
    },
    {
        id              : 11207,
        gameTitle       : 'Lucky Neko Parade VIP',
        gameName        : 'luckyNekoParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.9, x : 0, y : -7 }, // newWeb
            { scale : 1.03, x : 0, y : 13 }, // mobile-phone
            { scale : 0.9, x : 0, y : -10 }  // mobile-pad
        ]
    },
    {
        id              : 11209,
        gameTitle       : 'Helloween Party VIP',
        gameName        : 'helloweenPartyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 111, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 25 }, // newWeb
            { scale : 1.05, x : 0, y : 17 }, // mobile-phone
            { scale : 0.93, x : 0, y : 20 }  // mobile-pad
        ],
    },
    {
        id              : 11211,
        gameTitle       : 'Gummy Yummy Fiesta VIP',
        gameName        : 'gummyYummyFiestaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : -8 }, // newWeb
            { scale : 1.095, x : 0, y : 18 }, // mobile-phone
            { scale : 0.91, x : 0, y : -11 }  // mobile-pad
        ]
    },
    {
        id              : 11212,
        gameTitle       : 'Drs Secret Lab VIP',
        gameName        : 'drsSecretLabVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.93, x : 0, y : 20 }, // newWeb
            { scale : 1.03, x : 0, y : 12 }, // mobile-phone
            { scale : 0.90, x : 0, y : 15 }  // mobile-pad
        ]
    },
    {
        id              : 11213,
        gameTitle       : 'Sizzling Baskets VIP',
        gameName        : 'sizzlingBasketsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 99, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 75, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 51, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 8 }, // newWeb
            { scale : 1.05, x : 0, y : 16 }, // mobile-phone
            { scale : 0.91, x : 0, y : -3 }  // mobile-pad
        ]
    },
    {
        id              : 11215,
        gameTitle       : 'Book Of Cleos Secrets VIP',
        gameName        : 'bookOfCleosSecretsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 1.00, x :  0, y :  6 }, // mobile-phone
            { scale : 0.92, x :  0, y :  -11 }  // mobile-pad
        ]
    },
    {
        id              : 11217,
        gameTitle       : 'RichesToRiches VIP',
        gameName        : 'richesToRichesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 85, 'y' : 97, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  11 }, // newWeb
            { scale : 1.05, x :  0, y :  15 }, // mobile-phone
            { scale : 0.88, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 11218,
        gameTitle       : 'GoldiesKingdom VIP',
        gameName        : 'goldiesKingdomVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 95, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 12 }, // newWeb
            { scale : 1.08, x : 0, y : 20 }, // mobile-phone
            { scale : 0.94, x : 0, y : 1 },  // mobile-pad
        ]
    },
    {
        id              : 11220,
        gameTitle       : 'Sharks Bounty Vip',
        gameName        : 'sharksBountyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 86, 'y' : 93, 'digit' : 10, 'color' : [ 255, 0, 255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 83, 'y' : 69, 'digit' : 9,  'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 80, 'y' : 48, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.97, x : 0, y : 25 }, // newWeb
            { scale : 1.08, x : 0, y : 17 }, // mobile-phone
            { scale : 0.95, x : 0, y : 20 },  // mobile-pad
        ],
    },
    {
        id              : 11223,
        gameTitle       : 'Horns And Halos VIP',
        gameName        : 'hornsAndHalosVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.91, x :  0, y :  15 }  // mobile-pad
        ]
    },
    {
        id              : 11224,
        gameTitle       : 'Doomed To Riches VIP',
        gameName        : 'doomedToRichesVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  20 }, // newWeb
            { scale : 1.04, x :  0, y :  12 }, // mobile-phone
            { scale : 0.89, x :  0, y :  9 }  // mobile-pad
        ]
    },
    {
        id              : 11225,
        gameTitle       : 'LockinPiggy VIP',
        gameName        : 'lockinPiggyVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 13 }, // newWeb
            { scale : 1.00, x : 0, y : 3 }, // mobile-phone
            { scale : 0.9, x : 0, y : 4 }  // mobile-pad
        ]
    },
    {
        id              : 11226,
        gameTitle       : 'Monster Prison Vip',
        gameName        : 'monsterPrisonVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 114, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 90, 'y' : 91, 'digit' : 9, 'color' : [ 255,  0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 67, 'digit' : 8, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.95, x : 0, y : 10 }, // newWeb
            { scale : 1.01, x : 0, y : 4 }, // mobile-phone
            { scale : 0.92, x : 0, y : 10 },  // mobile-pad
        ],
    },
    {
        id              : 11228,
        gameTitle       : 'Wizard\'s Potion Shop VIP',
        gameName        : 'wizardsPotionShopVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  23 }, // newWeb
            { scale : 1.04, x :  0, y :  22 }, // mobile-phone
            { scale : 0.89, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 11233,
        gameTitle       : 'Money Express VIP',
        gameName        : 'moneyExpressVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 100,  'digit' : 9,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.97, x :  0, y : 19 }, // newWeb
            { scale : 0.97, x :  0, y : 14 }, // mobile-phone
            { scale : 0.89, x :  0, y :-11 }  // mobile-pad
        ]
    },
    {
        id              : 11238,
        gameTitle       : 'Chicky Chicky Parade VIP',
        gameName        : 'chickyChickyParadeVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :105, 'digit' : 9, 'color' : [ 255, 0,   255 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 79, 'digit' : 8,  'color' : [ 255, 0,   0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 86, 'y' : 53, 'digit' : 7,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  2 }, // newWeb
            { scale : 1.02, x :  0, y :  9 }, // mobile-phone
            { scale : 0.86, x :  0, y :  0 }  // mobile-pad
        ]
    },
    {
        id              : 11239,
        gameTitle       : 'Catch And Win Bonanza VIP',
        gameName        : 'catchAndWinBonanzaVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 88, 'y' : 118, 'digit' : 10, 'color' : [ 255, 0, 255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 92, 'digit' : 9,  'color' : [ 255, 0, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 88, 'y' : 66, 'digit' : 8,  'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :   0 }, // oldWeb
            { scale : 1.00, x :  0, y :  16 }, // newWeb
            { scale : 1.00, x :  0, y :  16 }, // mobile-phone
            { scale : 0.92, x :  0, y :  10 }  // mobile-pad
        ]
    },
    {
        id              : 11240,
        gameTitle       : 'Magical Coin VIP',
        gameName        : 'magicalCoinVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.9, x :  0, y :  20 }, // newWeb
            { scale : 1.01, x :  0, y :  10 }, // mobile-phone
            { scale : 0.9, x :  0, y :  5 }  // mobile-pad
        ]
    },
    {
        id              : 11249,
        gameTitle       : 'Lock & Loot VIP',
        gameName        : 'lockNLootVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.96, x :  0, y :  22 }, // newWeb
            { scale : 1.03, x :  0, y :  12 }, // mobile-phone
            { scale : 0.88, x :  0, y :  8 }  // mobile-pad
        ]
    },
    {
        id              : 11250,
        gameTitle       : 'Ancient Treasure VIP',
        gameName        : 'ancientTreasuresVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.92, x :  0, y :  0 }, // newWeb
            { scale : 0.96, x :  0, y :  -1 }, // mobile-phone
            { scale : 0.88, x :  0, y :  -13 }  // mobile-pad
        ]
    },
    {
        id              : 11252,
        gameTitle       : 'neko Fortune VIP',
        gameName        : 'nekoFortuneVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' :111, 'digit' : 10, 'color' : [ 255, 0,   255 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 87, 'y' : 87, 'digit' : 9,  'color' : [ 255, 0,   0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
            { 'x' : 84, 'y' : 63, 'digit' : 8,  'color' : [ 255, 255, 0   ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x : 0, y : 0 }, // oldWeb
            { scale : 0.92, x : 0, y : 30 }, // newWeb
            { scale : 1.05, x : 0, y : 14 }, // mobile-phone
            { scale : 0.9, x : 0, y : 0 }  // mobile-pad
        ]
    },
    {
        id              : 11253,
        gameTitle       : 'Royal Dragons VIP',
        gameName        : 'royalDragonsVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 93, 'y' : 100, 'digit' : 10, 'color' : [ 255, 255, 0 ], 'font' : resNewLobby.MiniCountFont, 'scale' : 1 }
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 0.95, x :  0, y :  4 }, // newWeb
            { scale : 1.04, x :  0, y :  13 }, // mobile-phone
            { scale : 0.87, x :  0, y :  17 },  // mobile-pad
        ]
    },
    {
        id              : 11257,
        gameTitle       : 'Shark Rush VIP',
        gameName        : 'sharkRushVip',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 117, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : -190 }, // -- Web
            { 'x' : 0, 'y' : -190 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 1.00, x :  0, y :  0 }, // oldWeb
            { scale : 1.02, x :  0, y :  18 }, // newWeb
            { scale : 1.07, x :  0, y :  16 }, // mobile-phone
            { scale : 0.95, x :  0, y :  11 }  // mobile-pad
        ]
    },
    {
        id              : 11258,
        gameTitle       : 'Zoom Zoom Double VIP',
        gameName        : 'zoomZoomDouble',
        normalAnimation : 'normal',
        overAnimation   : 'Over',
        matchAnimation  : 'match',
        lockedAnimation : 'lock',
        isOpen          : true,
        jackpotNotiAttr : [
            { 'x' : 90, 'y' : 108, 'digit' : 9, 'color' : [ 255, 255, 0 ],   'font' : resNewLobby.MiniCountFont, 'scale' : 1 },
        ],
        mobileGameOffset : [ // Mobile Only
            { 'x' : 0, 'y' : 0 }, // phone
            { 'x' : 0, 'y' : 0 }  // pad
        ],
        slotOffset       : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        coinEffectAttr   : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        totalPayNodeAttr : [
            { 'x' : 0, 'y' : 0 }, // -- Web
            { 'x' : 0, 'y' : 0 }	// -- Mobile
        ],
        gameNodeViewAttr : [
            { scale : 0.78, x :  0, y : -61 }, // oldWeb
            { scale : 0.67, x :  0, y :  -1 }, // newWeb
            { scale : 0.97, x :  0, y : -75 }, // mobile-phone
            { scale : 0.76, x :  0, y : -42 }, // mobile-pad
            { scale : 0.65, x :  0, y :   4 },  // lite-web-wide
            { scale : 0.68, x :  0, y :   6 }  // lite-web-pad
        ]
    }
];

// Keno More Slot
// 키노 슬롯 추가 시에 해당 리스트에 슬롯 id를 추가해주세요.
var KENO_SLOT_INDEX = VegasNormalSlots.filter(function (t) {
    return t.slotType === 'keno'
}).map(function (t) {
    return t.id;
}); //[120, 107, 92]

var VIP_KENO_SLOT_INDEX = VegasVipSlots.filter(function (t) {
    return t.slotType === 'keno'
}).map(function (t) {
    return t.id;
});


//RNCSlotEntry.Model.init 에서 세팅.
var AllSlotConfig = [];//  NormalSlots.concat(VipSlots, VegasNormalSlots, VegasVipSlots);


var getSlotConfig = function (id) {
    for (var k in AllSlotConfig) {
        if (AllSlotConfig[k].id === id) {
            return AllSlotConfig[k];
        }
    }
    return null;
};

var getGameTitleByGameID = function( id ) {
    var config = getSlotConfig(id);
    if( !config ){
        return 'unknown';
    }
    return config.gameTitle;
};

var getIsOpenByGameID = function( id ) {
    var config = getSlotConfig(id);
    if( !config ){
        return false;
    }
    return config.isOpen;
};

var hasSlotBySlotId = function(id){
    var i = parseInt(id);
    return (getGameTitleByGameID(i) !== 'unknown');
};

var isClassicVegasSlot = function(config){
    return (config.slotType === 'vegas' || config.slotType === 'keno' );
};