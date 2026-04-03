

/**
 * Vegas Classic Slots
 * */

window.resVegasSlotMenu_Mobile = {
    SlotMenuUI 				: 'PU_slotMenuVegasUI_mb.ExportJson',
    SlotMenuUI_plist 		: 'image/PU_slotMenuVegasAtlas_mb.plist',
    SlotMenuUI_png 			: 'image/PU_slotMenuVegasAtlas_mb.png',
    SlotMenuUI_pad 			: 'PU_slotMenuVegasUI_pad.ExportJson',
    SlotMenuUI_pad_plist 	: 'image/PU_slotMenuVegasAtlas_pad.plist',
    SlotMenuUI_pad_png 		: 'image/PU_slotMenuVegasAtlas_pad.png',
    SlotMenuUI_Kindle 		: 'PU_slotMenuVegasUI_k.ExportJson',
    SlotMenuUI_Kindle_plist : 'image/PU_slotMenuVegasAtlas_k.plist',
    SlotMenuUI_Kindle_png 	: 'image/PU_slotMenuVegasAtlas_k.png',

    SysNanumFon      		: 'image/sysNanumFon.fnt',
    SysNanumFon_png  		: 'image/sysNanumFon.png',
    SysNanumFonS     		: 'image/sysNanumFonS.fnt',
    SysNanumFonS_png 		: 'image/sysNanumFonS.png',
    TotalPayFont01         : 'image/c_puTotalPayFont01.fnt',
    TotalPayFont01_png     : 'image/c_puTotalPayFont01.png'
};
window.g_resVegasSlotMenu_Mobile = ResPack.create( 'resVegasSlotMenu_Mobile', resVegasSlotMenu_Mobile );

window.resVegasSlotDisplayUI = {
    SlotDisplayUI_27        : 'c_cwSlotDisplayUI.ExportJson',
    SlotDisplayUI_32        : 'c_cw2SlotDisplayUI.ExportJson',
    SlotDisplayUI_33        : 'c_cw3SlotDisplayUI.ExportJson',
    SlotDisplayUI_37        : 'c_5xSlotDisplayUI.ExportJson',
    SlotDisplayUI_38        : 'c_tdSlotDisplayUI.ExportJson',
    SlotDisplayUI_49        : 'c_wrSlotDisplayUI.ExportJson',
    SlotDisplayUI_51        : 'c_erSlotDisplayUI.ExportJson',
    SlotDisplayUI_53        : 'c_pdSlotDisplayUI.ExportJson',
    SlotDisplayUI_60        : 'c_t7SlotDisplayUI.ExportJson',
    SlotDisplayUI_63        : 'c_bdSlotDisplayUI.ExportJson',
    SlotDisplayUI_65        : 'c_brSlotDisplayUI.ExportJson',
    SlotDisplayUI_71        : 'c_bwqSlotDisplayUI.ExportJson',
    SlotDisplayUI_74        : 'c_bwnSlotDisplayUI.ExportJson', // BWN 추가
    SlotDisplayUI_76        : 'c_brcSlotDisplayUI.ExportJson', // BRC 추가
    SlotDisplayUI_78        : 'c_br5SlotDisplayUI.ExportJson',  // BR5 추가
    SlotDisplayUI_80        : 'c_whSlotDisplayUI.ExportJson',	// WH 추가
    SlotDisplayUI_81        : 'c_bwlSlotDisplayUI.ExportJson',	// BWL 추가
    SlotDisplayUI_102       : 'c_crSlotDisplayUI.ExportJson',
    SlotDisplayUI_89       	: 'c_77wSlotDisplayUI.ExportJson',
    SlotDisplayUI_108       : 'c_108SlotDisplayUI.ExportJson'
};
window.g_resVegasSlotDisplayUI = ResPack.create( 'resVegasSlotDisplayUI', resVegasSlotDisplayUI );

window.resVegasSlotFrame = {
    MainAtlas               : 'image/c_puFrameAtlas.plist',
    MainAtlas_png           : 'image/c_puFrameAtlas.png',
    StickFrameAR			: 'c_puMainFrameAR.ExportJson'
};
//window.g_resVegasSlotFrame = ResPack.create( 'resVegasSlotFrame', resVegasSlotFrame );//.concat( g_resCommonEffect, g_resNewCashRace, g_resVegasSlotDisplayUI, g_resVegasSlotMenu_Mobile);

//region [ Cash Race ]
// 모든 슬롯 진입 시 같이 포함됨.
window.resNewCashRace = {
    // icon
    PU_cashRaceIconUI   : 'PU_cashRaceIconUI.ExportJson',
    PU_cashRaceIconFxAR : 'PU_cashRaceIconFxAR.ExportJson',
    PP_cashRaceFxAR     : 'PP_cashRaceFxAR.ExportJson',

    PU_cashRaceIconAtlas_plist  : 'image/PU_cashRaceIconAtlas.plist',
    PU_cashRaceIconAtlas_png    : 'image/PU_cashRaceIconAtlas.png',

    puCashRaceRankIconFont_fnt  : 'image/puCashRaceRankIconFont.fnt',
    puCashRaceRankIconFont_png  : 'image/puCashRaceRankIconFont.png',

    // race main ui
    PP_cashRaceAR    : 'PP_cashRaceAR.ExportJson',
    PP_cashRaceUI    : 'PP_cashRaceUI.ExportJson',

    puCashTimeFont01_fnt    : 'image/puCashTimeFont01.fnt',
    puCashTimeFont01_png    : 'image/puCashTimeFont01.png',
    puCashTimeFont02_fnt    : 'image/puCashTimeFont02.fnt',
    puCashTimeFont02_png    : 'image/puCashTimeFont02.png',
    puCashRaceFont01_fnt    : 'image/puCashRaceFont01.fnt',
    puCashRaceFont01_png    : 'image/puCashRaceFont01.png',
    puCashRaceFont02_fnt    : 'image/puCashRaceFont02.fnt',
    puCashRaceFont02_png    : 'image/puCashRaceFont02.png',

    // common
    PP_cashRaceAtlas_plist      : 'image/PP_cashRaceAtlas.plist',
    PP_cashRaceAtlas_png        : 'image/PP_cashRaceAtlas.png'
};
window.g_resNewCashRace = ResPack.create('resNewCashRace', resNewCashRace);

window.resNewCashRaceNoti = {
    PP_cashRaceGuideAR    : "PP_cashRaceGuideAR.ExportJson",
    PP_GuideAtlas_plist   : 'image/PP_GuideAtlas.plist',
    PP_GuideAtlas_png     : 'image/PP_GuideAtlas.png'
};
window.g_resNewCashRaceNoti = ResPack.create('resNewCashRaceNoti', resNewCashRaceNoti);
//endregion

window.resNewBroadcastIcon = {
    PP_broadcastGuideAR   : 'PP_broadcastGuideAR.ExportJson',
    PP_GuideAtlas_plist   : 'image/PP_GuideAtlas.plist',
    PP_GuideAtlas_png     : 'image/PP_GuideAtlas.png'
};
window.g_resNewBroadcastIcon = ResPack.create('resNewBroadcastIcon', resNewBroadcastIcon);

window.resSlotCube = {
    CubeIconAtlas_plist     : 'image/PU_CubeIconAtlas.plist',
    CubeIconAtlas_png       : 'image/PU_CubeIconAtlas.png',
    PU_IconCube_Font01_fnt  : 'image/PU_IconCube_Font01.fnt',
    PU_IconCube_Font01_png  : 'image/PU_IconCube_Font01.png',
    PU_PopupCube_Font06_fnt : 'image/PU_PopupCube_Font06.fnt',
    PU_PopupCube_Font06_png : 'image/PU_PopupCube_Font06.png',
    PU_PopCubeGaugetUI      : "PU_PopCubeGaugetUI.ExportJson",
    PU_PopCubeGaugetAR      : "PU_PopCubeGaugetAR.ExportJson",
    PU_PopCubeWinIconAR     : "PU_PopCubeWinIconAR.ExportJson"
};
window.g_resSlotCube = ResPack.create('resSlotCube', resSlotCube);

// new Slot Offer
window.resOfferSpin = {
    // Font
    Font00	                : "image/PP_NewSlotOfferFreeSpinPop_Font01.fnt",
    Font00_png	            : "image/PP_NewSlotOfferFreeSpinPop_Font01.png",
    Font01	                : "image/PP_NewSlotOfferFreeSpinPop_Font02.fnt",
    Font01_png	            : "image/PP_NewSlotOfferFreeSpinPop_Font02.png",
    Font02	                : "image/PP_NewSlotOfferFont01.fnt",
    Font02_png	            : "image/PP_NewSlotOfferFont01.png",

    // Atlas
    MainAtlas_png	        : "image/PP_NewSlotOfferPopResultAtlas.png",
    MainAtlas	            : "image/PP_NewSlotOfferPopResultAtlas.plist",

    PopupAR                 : "PP_NewSlotOfferPopResultAR.ExportJson",
    PopupUI                 : "PP_NewSlotOfferPopResultUI.ExportJson"
};
window.g_resOfferSpin = convertObjToArr( resOfferSpin );
//

window.resSpinForNewUser = {
    StartSpinIndicatorAR    : 'NEW_startSpinAR.ExportJson',
    NEW_mainAtlas_mb_plist  : 'image/NEW_mainAtlas_mb.plist',
    NEW_mainAtlas_mb_png    : 'image/NEW_mainAtlas_mb.png'
};
window.g_resSpinForNewUser = ResPack.create( 'resSpinForNewUser', resSpinForNewUser );

window.g_resCommonSlot = g_resNewTopHud_Slot.concat(g_resSpinForNewUser, g_resProfileInSlot, g_resSystemIcon, g_fonts,g_resSlotCube, g_resOfferSpin );

window.g_resCommonSlot_normal = g_resCommonSlot.concat(g_resSlotMenuVideo, g_resVIPMiniWheel );
window.g_resCommonSlot_vip = g_resCommonSlot.concat(g_resSlotMenuVideo, g_resSlotMenuVIP, g_resVIPMiniWheel);

window.g_resVerticalSlot_normal = g_resCommonSlot.concat( g_resSlotMenuVertical, g_resVIPMiniWheel );
window.g_resVerticalSlot_vip    = g_resCommonSlot.concat( g_resSlotMenuVertical, g_resSlotMenuVIP, g_resVIPMiniWheel );

window.g_resCommonClassicSlot_normal = g_resCommonSlot.concat(g_resSlotMenuClassic, g_resVIPMiniWheel );
window.g_resCommonClassicSlot_vip = g_resCommonSlot.concat(g_resSlotMenuClassic, g_resSlotMenuVIP, g_resVIPMiniWheel);

window.g_resCommonClassicVegasSlot_normal = g_resCommonSlot.concat(g_resSlotMenuVegasClassic, g_resVIPMiniWheel);
window.g_resCommonClassicVegasSlot_vip = g_resCommonSlot.concat(g_resSlotMenuVegasClassic, g_resSlotMenuVIP, g_resVIPMiniWheel);

window.g_resCommonKeno_normal = g_resCommonSlot.concat(g_resKenoSlotMenu, g_resMoreKeno, g_resVIPMiniWheel);
window.g_resCommonKeno_vip = g_resCommonSlot.concat(g_resKenoSlotMenu, g_resMoreKeno, g_resSlotMenuVIP, g_resVIPMiniWheel);

window.g_resCommonCrash_normal = g_resCommonSlot.concat(g_resSlotMenuCrash, g_resVIPMiniWheel );
window.g_resCommonCrash_vip = g_resCommonSlot.concat(g_resSlotMenuCrash,g_resSlotMenuVIP, g_resVIPMiniWheel );

