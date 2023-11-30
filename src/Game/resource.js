var res = {
    
};

//region [ CommonSlotMenu ]
var resCommonSlotMenu   = {
    CommonSlotMenuUI_plist          : 'image/PU_slotMenuUIAtlas_web.plist',
    CommonSlotMenuUI_png            : 'image/PU_slotMenuUIAtlas_web.png',
    CommonSlotMenuSpinCounter_plist : 'image/PU_smSpinCountAtlas.plist',
    CommonSlotMenuSpinCounter_png   : 'image/PU_smSpinCountAtlas.png',

    CommonSlotMenuUI                : 'PU_slotMenuUI_web.ExportJson',
    CommonSlotMenuBonusWinAR        : 'PU_smBonusWinAR.ExportJson',
    CommonSlotMenuBonusWinUI        : 'PU_smBonusWinUI.ExportJson',
    CommonSlotMenuSpinCounterAR     : 'PU_smSpinCountAR.ExportJson',
    CommonSlotMenuSpinCounterUI     : 'PU_smSpinCountUI.ExportJson',

    Font01    				    :	'image/PU_smFont01.fnt',
    Font01_png				    :	'image/PU_smFont01.png',
    Font02    				    :	'image/PU_smFont02.fnt',
    Font02_png				    :	'image/PU_smFont02.png',
    Font03    				    :	'image/PU_smBonusWinFont.fnt',
    Font03_png				    :	'image/PU_smBonusWinFont.png',
    Font04    				    :	'image/PU_smSpinCountFont.fnt',
    Font04_png				    :	'image/PU_smSpinCountFont.png',

    //SlotMenuFX
    PU_slotMenuFxAR             :   'PU_slotMenuFxAR.ExportJson',
    PU_slotMenuFxAtlas_png      :   'image/PU_slotMenuFxAtlas.png',
    PU_slotMenuFxAtlas          :   'image/PU_slotMenuFxAtlas.plist',
};
var g_resCommonSlotMenu = convertObjToArr( resCommonSlotMenu );
var resSlotMenu   = {
    SlotMenuUI       : 'PU_slotMenuUI.ExportJson',
    SlotMenuUI_plist : 'image/PU_smMainAtlas.plist',
    SlotMenuUI_png   : 'image/PU_smMainAtlas.png',
    SlotRichBetUI    : 'PU_slotRichBetUI.ExportJson',
    SlotNormalBetUI  : 'PU_slotNormalBetUI.ExportJson',
    SlotCashBetUI    : 'PU_slotCashBetUI.ExportJson',
    SlotAutoBetUI    : 'PU_slotAutoBetUI.ExportJson',
    SlotMenuFon      : 'image/puSlotMenuFn.fnt',
    SlotMenuFon_png  : 'image/puSlotMenuFn.png',
    SlotRichBetAR    : 'PU_slotRichBetAR.ExportJson',
    SysNanumFon      : 'image/sysNanumFon.fnt',
    SysNanumFon_png  : 'image/sysNanumFon.png',
    //SlotMenuFX
    PU_slotMenuFxAR             :   'PU_slotMenuFxAR.ExportJson',
    PU_slotMenuFxAtlas_png      :   'image/PU_slotMenuFxAtlas.png',
    PU_slotMenuFxAtlas          :   'image/PU_slotMenuFxAtlas.plist',
};
var g_resSlotMenu = convertObjToArr( resSlotMenu );

var resGlobalCommon = {
    PU_RstoneGlobalAtlas_plist  : 'image/PU_RstoneGlobalAtlas.plist',
    PU_RstoneGlobalAtlas_png    : 'image/PU_RstoneGlobalAtlas.png',
    PU_eventShopRstoneFxAR      : 'PU_eventShopRstoneFxAR.ExportJson',
    PU_ShopRston_Font_fnt       : 'image/PU_ShopRston_Font.fnt',
    PU_ShopRston_Font_png       : 'image/PU_ShopRston_Font.png',
    PU_PopCubeRstoneUI          : 'PU_PopCubeRstoneUI.ExportJson'
}
var g_resGlobalCommon = ResPack.create( 'resGlobalCommon', resGlobalCommon );
var resCommonEffect   = {
    //! armature
    BonusWin                : 'PU_bonusWinAR.ExportJson',
    MajorWinUI              : 'PU_majorWinUI.ExportJson',
    MajorWinUI_plist        : 'image/PU_slUiAtlas.plist',
    MajorWinUI_png          : 'image/PU_slUiAtlas.png',
    MajorWinFont            : 'image/majorWinFon.fnt',
    MajorWinFont_png        : 'image/majorWinFon.png',
    MajorWinTitle           : 'PU_majorWinAR.ExportJson',
    MajorWinBack            : 'PU_vMajorWinAR.ExportJson',
    MajorWinDrop            : 'PU_majorWinDrAR.ExportJson',
    MajorWinAtlas_plist     : 'image/PU_majorWinAtlas.plist',
    MajorWinAtlas_png       : 'image/PU_majorWinAtlas.png',
    GlobalLogoAtlas         : 'image/PU_globalLogoAtlas.plist',
    GlobalLogoAtlas_png     : 'image/PU_globalLogoAtlas.png',
    GlobalMajorWinAtlas     : 'image/PU_globalMajorwinAtlas.plist',
    GlobalMajorWinAtlas_png : 'image/PU_globalMajorwinAtlas.png',
    NewMajorWinUI           : 'PU_newMajorWinUI.ExportJson',
    NewMajorWinAR           : 'PU_newMajorWinAR.ExportJson',
    NewMajorWinUI_plist     : 'image/PU_newMajorWinAtlas.plist',
    NewMajorWinUI_png       : 'image/PU_newMajorWinAtlas.png',
    NewMajorWinCoinAR       : 'PU_newMajorWinCoinAR.ExportJson',
    GameJackpotAR           : 'PU_gameJackpotAR.ExportJson',
    GameJackpotFont         : 'image/PU_jackpotGameFont01.fnt',
    GameJackpotFont_png     : 'image/PU_jackpotGameFont01.png',
    JackpotResultAR         : 'PU_JackpotResultAR.ExportJson',
    JackpotResultUI         : 'PU_jackpotResultUI.ExportJson',
    JackpotFn01             : 'image/PU_jackpotFn01.fnt',
    JackpotFn01_png         : 'image/PU_jackpotFn01.png',
    JackpotFn02             : 'image/sl_wjFont03.fnt',
    JackpotFn02_png         : 'image/sl_wjFont03.png',
    TotalPay                : 'PU_totalPayAR.ExportJson',
    NewJackpotResultAR      : 'PU_newJackpotAR.ExportJson',
    NewJackpotResultUI      : 'PU_newJackpotUI.ExportJson',
    NewJackpotFn01          : 'image/PU_jackpotFont02.fnt',
    NewJackpotFn01_png      : 'image/PU_jackpotFont02.png',
    BetLockGuide            : 'PU_betLockAR.ExportJson',
    ActionFeedBack          : 'PU_FeedBackAR.ExportJson',
    ActionFeedBack_plist    : 'image/PU_notiAtlas.plist',
    ActionFeedBack_png      : 'image/PU_notiAtlas.png',

    MissionButtonAnimation : 'PU_missionSmallAR.ExportJson',
    MissionAtlas_plist : 'image/PU_missionSmallAtlas.plist',
    MissionAtlas_png : 'image/PU_missionSmallAtlas.png',
    MissionButtonUI : 'PU_missionSmallUI.ExportJson',

    VIPBroadAtlasAR_plist : 'image/PU_broadAtlas.plist',
    VIPBroadAtlasAR_png   : 'image/PU_broadAtlas.png',

    NewCoinAtlas         : 'image/PU_newCoinAtlas.plist',
    NewCoinAtlas_png     : 'image/PU_newCoinAtlas.png',

    VIPWheelChangeAR        : 'vip_wheelChangeAR.ExportJson',
    GlobalSlotAtlas         : 'image/vip_globalSlotAtlas.plist',
    GlobalSlotAtlas_png     : 'image/vip_globalSlotAtlas.png',

    VipBroadCastAtlas_plist : 'image/vip_globalAtlas.plist',
    VipBroadCastAtlas_png   : 'image/vip_globalAtlas.png',
    VipGenieLikeAnimation   : 'vip_genieLikeAR.ExportJson',
    VipGenieLikeAtlas_plist : 'image/vip_genieAtlas.plist',
    VipGenieLikeAtlas_png   : 'image/vip_genieAtlas.png',

    VIPMiniWheelUI          : 'vip_slMiniWheelUI.ExportJson',
    VIPMiniWheelAR          : 'vip_slMiniWheelAR.ExportJson',
    VIPFont01               : 'image/vip_font01.fnt',
    VIPFont01_png           : 'image/vip_font01.png',
    VIPFont02               : 'image/vip_font02.fnt',
    VIPFont02_png           : 'image/vip_font02.png',

    VIPMiniWheelUI_mb : 'vip_slMiniWheelUI_mb.ExportJson',
    VIPMiniWheelAR_mb : 'vip_slMiniWheelAR_mb.ExportJson',
    VIPMiniWheelBtnAR_mb : 'vip_slMiniWheelBtnAR_mb.ExportJson',
    vip_slMiniWheelAtlas_plist : 'image/vip_slMiniWheelAtlas.plist',
    vip_slMiniWheelAtlas_png : 'image/vip_slMiniWheelAtlas.png'
};
var g_resCommonEffect = convertObjToArr( resCommonEffect ).concat(g_resGlobalCommon);

var resVipLounge = {
    VipLobbyAtlas: 'image/LB_newLobbyAtlas.plist',
    VipLobbyAtlas_png: 'image/LB_newLobbyAtlas.png',
    VIPLobbyIconAtlas       : 'image/LB_newLobbyIconAtlas.plist',
    VIPLobbyIconAtlas_png   : 'image/LB_newLobbyIconAtlas.png',
    LobbyIconCommonUI    : 'LB_commonIconUI.ExportJson',
    GiftArmature: 'LB_giftAR.ExportJson',
    LB_giftIconUI : 'LB_giftIconUI.ExportJson',

    PU_CubeIconAtlas_plist  : 'image/PU_CubeIconAtlas.plist',
    PU_CubeIconAtlas_png    : 'image/PU_CubeIconAtlas.png',
    PU_IconCubeFxAR         : 'PU_IconCubeFxAR.ExportJson',

    BonusArmature: 'PU_bonusAR.ExportJson',
    BonusUI: 'PU_bonusUI.ExportJson',
    Background: 'image/vip_mainLobby.jpg',
    VipWheel: 'vip_jackpotWheelAR.ExportJson',
    VipGlobalAtlas_plist : 'image/vip_globalAtlas.plist',
    VipGlobalAtlas_png   : 'image/vip_globalAtlas.png',
    VipAtlas_plist: 'image/vip_loadAtlas.plist',
    VipAtlas_png: 'image/vip_loadAtlas.png',
    VipJackpotNotiAR: 'vip_JackpotNotiAR.ExportJson',
    VipJackpotNotiUI: 'vip_jackpotNotiUI.ExportJson',
    VIPFont01: 'image/vip_font01.fnt',
    VIPFont01_png: 'image/vip_font01.png',
    VIPFont02: 'image/vip_font02.fnt',
    VIPFont02_png: 'image/vip_font02.png',
    LeaderBoardIconAR: 'LB_leaderBoardAR.ExportJson',
    VIPMiniWheelUI: 'vip_slMiniWheelUI.ExportJson',
    VIPMiniWheelAR: 'vip_slMiniWheelAR.ExportJson',
    VIPWheelChangeAR: 'vip_wheelChangeAR.ExportJson',
    GlobalSlotAtlas: 'image/vip_globalSlotAtlas.plist',
    GlobalSlotAtlas_png: 'image/vip_globalSlotAtlas.png',

    MobileAR: 'web_AdEventMobileAR.ExportJson',
    MobileAtlas_plist: 'image/web_AdEventMobileAtlas.plist',
    MobileAtlas_png: 'image/web_AdEventMobileAtlas.png',

    AdSlot00AR: 'web_AdSlot00AR.ExportJson',
    AdSlot00Atlas_plist: 'image/web_AdSlot00Atlas.plist',
    AdSlot00Atlas_png: 'image/web_AdSlot00Atlas.png',

    AdSlot01AR: 'web_AdSlot01AR.ExportJson',
    AdSlot01Atlas_plist: 'image/web_AdSlot01Atlas.plist',
    AdSlot01Atlas_png: 'image/web_AdSlot01Atlas.png',

    AdSlot02AR: 'web_AdSlot02AR.ExportJson',
    AdSlot02Atlas_plist: 'image/web_AdSlot02Atlas.plist',
    AdSlot02Atlas_png: 'image/web_AdSlot02Atlas.png',

    AdSlot03AR: 'web_AdSlot03AR.ExportJson',
    AdSlot03Atlas_plist: 'image/web_AdSlot03Atlas.plist',
    AdSlot03Atlas_png: 'image/web_AdSlot03Atlas.png',

    AdSlotPublicAtlas_plist : 'image/web_AdSlotPublicAtlas.plist',
    AdSlotPublicAtlas_png : 'image/web_AdSlotPublicAtlas.png',


    JackpotNoticeAR: 'LB_jackpotNotiAR.ExportJson',

    //! Classic Slot Icon
    // ClassicSlotIconAR      : 'c_lbEntryAR.ExportJson',
    // ClassicSlotIconAR_plist: 'image/c_lbMainAtlas.plist',
    // ClassicSlotIconAR_png  : 'image/c_lbMainAtlas.png',
    VegasEntryAR: 'c_lbNewEntryAR.ExportJson',
    VegasBannerBackAR: 'c_lbBannerBackAR.ExportJson',
    VegasLobbyMenu_plist: 'image/c_lbNewMainAtlas.plist',
    VegasLobbyMenu_png: 'image/c_lbNewMainAtlas.png',
    VegasLobbyBase_plist: 'image/c_lbNewBase02.plist',
    VegasLobbyBase_png: 'image/c_lbNewBase02.png',
    // VegasLobbyBG_jpg   		: 'image/c_lbNewBase.jpg',

    SlotMachineAtlas: 'image/LB_slotEntryAtlas.plist',
    SlotMachineAtlas_png: 'image/LB_slotEntryAtlas.png',
    KsSlotEntryAtlas: 'image/LB_ksSlotEntryAtlas.plist',
    KsSlotEntryAtlas_png: 'image/LB_ksSlotEntryAtlas.png',
    SlotIndicatorAR: 'LB_IndicatorAR.ExportJson',


    NanumFont: 'image/sysNanumFonS.fnt',
    NanumFont_png: 'image/sysNanumFonS.png',
    MiniCountFont: 'image/vip_miniCountFont01.fnt',
    MiniCountFont_png: 'image/vip_miniCountFont01.png',

    //! 2016-11-08 [ whee ] event noti box deprecated
    // VipEventUI           : 'vip_eventUI.ExportJson',
    // VipEventAR           : 'vip_eventAR.ExportJson',
    // VipEvent_plist       : 'image/vip_eventAtlas.plist',
    // VipEvent_png         : 'image/vip_eventAtlas.png',

    VipBroadNotiUI: 'vip_BroadNotiUI.ExportJson',
    VipBroadNotiAR: 'vip_BroadNotiAR.ExportJson',
    VipBroadNotiFont: 'image/PU_jackpotGameFont01.fnt',
    VipBroadNotiFont_png: 'image/PU_jackpotGameFont01.png',
    EventBanner_plist: 'image/LB_eventBannerAtlas.plist',
    EventBanner_png: 'image/LB_eventBannerAtlas.png',



    YearEndCardEntry : 'LB_crismasEntryAR.ExportJson',
    YearEndCardEntryAtlas_png : 'image/LB_cardEntryAtlas.png',
    YearEndCardEntryAtlas_plist: 'image/LB_cardEntryAtlas.plist',

    //! event
    // MainEventAtlas     : 'image/vip_mainEventAtlas.plist',
    // MainEventAtlas_png : 'image/vip_mainEventAtlas.png'

    //! 2017-06-15 [whee] 이벤트 게임 주석
    // EasterEggEntry       : 'LB_easter17EntryAR.ExportJson',
    // EasterEggEntry_plist : 'image/LB_easter17Atlas02.plist',
    // EasterEggEntry_png   : 'image/LB_easter17Atlas02.png'

    slotEntryBase_plist: 'image/LB_slotEntryAtlas.plist',
    slotEntryBase_png: 'image/LB_slotEntryAtlas.png',

    dummySlotEntryAtlas: "image/LB_slotEntryAtlas.plist",
    dummySlotEntryAtlas_png: "image/LB_slotEntryAtlas.png",
    dummySlotEntry: "slotEntry_Loading_web.ExportJson",

    PU_LobbyGotMailTooltipAtlas_plist : 'image/PU_LobbyGotMailTooltipAtlas.plist',
    PU_LobbyGotMailTooltipAtlas_png   : 'image/PU_LobbyGotMailTooltipAtlas.png',
    PU_LobbyGotMailTooltipAR      : 'PU_LobbyGotMailTooltipAR.ExportJson',

    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
};
var g_resVipLounge = convertObjToArr( resVipLounge );

var SlotEditorSlotMenu = {};
var g_SlotEditorSlotMenu = convertObjToArr(SlotEditorSlotMenu).concat(g_resCommonSlotMenu, g_resSlotMenu, g_resCommonEffect, g_resVipLounge);
//endregion

var g_resources = [];

g_resources.concat(g_resCommonSlotMenu);
g_resources.concat(g_resSlotMenu);
g_resources.concat(g_resCommonEffect);
g_resources.concat(g_resVipLounge);

for (var i in res) {
    g_resources.push(res[i]);
}