/**
 * default loading
 */
window.resMobileInnate = {
    DownloadUI        : "PU_ProgressBarUI_mb.ExportJson",
    AppUpdate         : "PU_upAvailableUI_mb.ExportJson"
};

//신규유저 로딩씬 리소스 (캔버스용)
window.resNewUserSlotLoader   = {
    SplashBack_png   : 'image/LO_splashBack_mb.png',
    DownloadUI : 'PU_ProgressBarUI_mb.ExportJson',
    ProgressBarAR : 'PU_ProgressBarAR.ExportJson',
    PU_ProgressBarAtlas_plist  : "image/PU_ProgressBarAtlas.plist",
    PU_ProgressBarAtlas_png    : "image/PU_ProgressBarAtlas.png",
    SplashLoadingAR : 'LO_splashLoadingAR_mb.ExportJson',
    LO_splashAtlas_plist : 'image/LO_splashAtlas.plist',
    LO_splashAtlas_png : 'image/LO_splashAtlas.png'
};
window.g_resNewUserSlotLoader = ResPack.create( 'resNewUserSlotLoader', resNewUserSlotLoader );

//신규유저 로딩씬 리소스 (인스턴트용)
window.resNewUserSlotLoader_lite   = {
    SplashBack_png   : 'image/LO_splashBack_lite.png',
    DownloadUI : 'PU_ProgressBarUI_mb.ExportJson',
    ProgressBarAR : 'PU_ProgressBarAR.ExportJson',
    PU_ProgressBarAtlas_plist  : "image/PU_ProgressBarAtlas.plist",
    PU_ProgressBarAtlas_png    : "image/PU_ProgressBarAtlas.png",
};
window.g_resNewUserSlotLoader_lite = ResPack.create( 'resNewUserSlotLoader_lite', resNewUserSlotLoader_lite );

//로비 로딩씬 리소스
window.resMobileLoginLoading = {
    DownloadUI        : "PU_ProgressBarUI_mb.ExportJson",
    ProgressBarAR     : 'PU_ProgressBarAR.ExportJson',
    VipLoading           : 'vip_mainLoadingUI_mb.ExportJson',
    LoadingBackground    : 'image/LB_mainLoading_mb.jpg',         //로비로딩 배경이미지
    PU_ProgressBarAtlas_plist : 'image/PU_ProgressBarAtlas.plist',
    PU_ProgressBarAtlas_png : 'image/PU_ProgressBarAtlas.png',
};
window.g_resMobileLoginLoading = ResPack.create('resMobileLoginLoading', resMobileLoginLoading);

/**
 * Android Quit
 */
window.resAndroid   = {
    QuitUI       : 'PP_QuitUI_mb.ExportJson',
    QuitUI_plist : 'image/PU_updateAtlas_mb.plist',
    QuitUI_png   : 'image/PU_updateAtlas_mb.png'
};


window.resNotification   = {
    Loading_plist       : 'image/LO_LoadingUI.plist',
    Loading_png         : 'image/LO_LoadingUI.png',
    PU_commonPopup_font_Title01_fnt : 'image/PU_commonPopup_font_Title01.fnt',
    PU_commonPopup_font_Title01_png : 'image/PU_commonPopup_font_Title01.png',
    PU_commonPopup_Btn_font01_fnt   : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png   : 'image/PU_commonPopup_Btn_font01.png',
    GameServerDownLayer : 'PP_underConUI.ExportJson'
};
window.g_resNotification = ResPack.create( 'resNotification', resNotification );

window.resRestartAndUpdate   = {
    RestartAR             : 'PP_restartAR_mb.ExportJson',
    RestartUI             : 'PP_restartUI_mb.ExportJson',
    RestartAtlas          : 'image/PP_restartAtlas_mb.plist',
    RestartAtlas_png      : 'image/PP_restartAtlas_mb.png'
};
window.g_resRestartAndUpdate = ResPack.create( 'resRestartAndUpdate', resRestartAndUpdate );


/** 로비 - 슬롯 모두에서 사용하는 리소스 */
window.resGlobalCommon = {
    PU_RstoneGlobalAtlas_plist  : 'image/PU_RstoneGlobalAtlas.plist',
    PU_RstoneGlobalAtlas_png    : 'image/PU_RstoneGlobalAtlas.png',
    PU_DR_MissionRpointGlobalAtlas_plist : 'image/PU_DR_MissionRpointGlobalAtlas.plist',
    PU_DR_MissionRpointGlobalAtlas_png : 'image/PU_DR_MissionRpointGlobalAtlas.png',
    PU_eventShopRstoneFxAR      : 'PU_eventShopRstoneFxAR.ExportJson',
    PU_ShopRston_Font_fnt       : 'image/PU_ShopRston_Font.fnt',
    PU_ShopRston_Font_png       : 'image/PU_ShopRston_Font.png',
    PU_PopCubeRstoneUI          : 'PU_PopCubeRstoneUI.ExportJson',

    PU_PlinkoBallPanelUI        : 'PU_PlinkoBallPanelUI.ExportJson',
    PU_PlinkoGlobalAtlas_plist  : 'image/PU_PlinkoGlobalAtlas.plist',
    PU_PlinkoGlobalAtlas_png    : 'image/PU_PlinkoGlobalAtlas.png',
    PU_BHub_Font01_fnt          : "image/PU_BHub_Font01.fnt",
    PU_BHub_Font01_png          : "image/PU_BHub_Font01.png",
    PU_BHub_Font03_fnt          : "image/PU_BHub_Font03.fnt",
    PU_BHub_Font03_png          : "image/PU_BHub_Font03.png",

    PU_FreeSpinTraillAtlas_plist : 'image/PU_FreeSpinTraillAtlas.plist',
    PU_FreeSpinTraillAtlas_png   : 'image/PU_FreeSpinTraillAtlas.png',
    PU_NewSlotOfferGetFreeSpinAR : 'PU_NewSlotOfferGetFreeSpinAR.ExportJson',

    PU_MsStoreTrailAtlas_plist   : 'image/PU_MsStoreTrailAtlas.plist',
    PU_MsStoreTrailAtlas_png     : 'image/PU_MsStoreTrailAtlas.png',
    PP_MsStoreGetBonusAR         : 'PP_MsStoreGetBonusAR.ExportJson'
}
window.g_resGlobalCommon = ResPack.create( 'resGlobalCommon', resGlobalCommon );

//
window.resCommonEffect   = {
    //! armature
    BonusWin             : 'PU_bonusWinAR.ExportJson',
    MajorWinUI           : 'PU_majorWinUI.ExportJson',
    MajorWinUI_plist     : 'image/PU_slUiAtlas.plist',
    MajorWinUI_png       : 'image/PU_slUiAtlas.png',
    MajorWinFont         : 'image/majorWinFon.fnt',
    MajorWinFont_png     : 'image/majorWinFon.png',
    MajorWinTitle        : 'PU_majorWinAR.ExportJson',
    MajorWinBack         : 'PU_vMajorWinAR.ExportJson',
    MajorWinDrop         : 'PU_majorWinDrAR.ExportJson',
    MajorWinAtlas_plist  : 'image/PU_majorWinAtlas.plist',
    MajorWinAtlas_png    : 'image/PU_majorWinAtlas.png',
    GameJackpotAR        : 'PU_gameJackpotAR.ExportJson',
    GameJackpotFont      : 'image/PU_jackpotGameFont01.fnt',
    GameJackpotFont_png  : 'image/PU_jackpotGameFont01.png',
    JackpotResultAR      : 'PU_JackpotResultAR.ExportJson',
    JackpotResultUI      : 'PU_jackpotResultUI.ExportJson',
    JackpotFn01          : 'image/PU_jackpotFn01.fnt',
    JackpotFn01_png      : 'image/PU_jackpotFn01.png',
    JackpotFn02          : 'image/sl_wjFont03.fnt',
    JackpotFn02_png      : 'image/sl_wjFont03.png',
    TotalPay             : 'PU_totalPayAR.ExportJson',

    TotalPayFx           : 'PU_totalPayFxAR.ExportJson',
    TotalPayFxAtlas      : 'image/PU_totalPayFxAtlas.plist',
    TotalPayFxAtlas_png  : 'image/PU_totalPayFxAtlas.png',

    GlobalLogoAtlas         : 'image/PU_globalLogoAtlas.plist',
    GlobalLogoAtlas_png     : 'image/PU_globalLogoAtlas.png',
    GlobalMajorWinAtlas     : 'image/PU_globalMajorwinAtlas.plist',
    GlobalMajorWinAtlas_png : 'image/PU_globalMajorwinAtlas.png',

    NewMajorWinUI        : 'PU_newMajorWinUI.ExportJson',
    NewMajorWinAR        : 'PU_newMajorWinAR.ExportJson',
    NewMajorWinUI_plist  : 'image/PU_newMajorWinAtlas.plist',
    NewMajorWinUI_png    : 'image/PU_newMajorWinAtlas.png',
    NewJackpotResultAR   : 'PU_newJackpotAR.ExportJson',
    NewJackpotResultUI   : 'PU_newJackpotUI.ExportJson',
    NewJackpotFn01       : 'image/PU_jackpotFont02.fnt',
    NewJackpotFn01_png   : 'image/PU_jackpotFont02.png',
    NewMajorWinCoinAR    : 'PU_newMajorWinCoinAR.ExportJson',
    BetLockGuide         : 'PU_betLockAR_mb.ExportJson',
    ActionFeedBack       : 'PU_FeedBackAR.ExportJson',
    ActionFeedBack_plist : 'image/PU_notiAtlas.plist',
    ActionFeedBack_png   : 'image/PU_notiAtlas.png',

    NewCoinAtlas         : 'image/PU_newCoinAtlas.plist',
    NewCoinAtlas_png     : 'image/PU_newCoinAtlas.png',


    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
};
window.g_resCommonEffect = ResPack.create( 'resCommonEffect', resCommonEffect ).concat(g_resGlobalCommon);

window.resFirstOffer = {
    FirstPurchaseUI : 'PP_firstPurchaseUI.ExportJson',
    FirstPurchaseAR : 'PP_firstPurchaseAR.ExportJson',
    PP_firstPurchaseV2Atlas_plist : 'image/PP_firstPurchaseAtlas.plist',
    PP_firstPurchaseV2Atlas_png : 'image/PP_firstPurchaseAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
};
window.g_resFirstOffer = ResPack.create('resFirstOffer', resFirstOffer);

window.resFlashSale = {
    FlashSaleUI            : 'PP_flashSaleUI.ExportJson',
    FlashSaleAR            : 'PP_flashSaleAR.ExportJson', //베네핏 ui 추가하면서 우회 추가
    RemindFlashSaleUI	   : 'PP_flashSale02UI.ExportJson',

    PP_flashSaleAtlas_plist : 'image/PP_flashSaleAtlas.plist',
    PP_flashSaleAtlas_png : 'image/PP_flashSaleAtlas.png',
    PU_bonusGiftIconAtlas_plist : 'image/PU_bonusGiftIconAtlas.plist',
    PU_bonusGiftIconAtlas_png : 'image/PU_bonusGiftIconAtlas.png',
    PU_buyFont01_fnt : 'image/PU_buyFont01.fnt',
    PU_buyFont01_png : 'image/PU_buyFont01.png',
    PU_globalImgAtlas_plist : 'image/PU_globalImgAtlas.plist',
    PU_globalImgAtlas_png : 'image/PU_globalImgAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
};
window.g_resFlashSale = ResPack.create( 'resFlashSale', resFlashSale );

//!
window.resCheerUp   = {
    CheerUpUI        : 'PP_newCheerUpUI.ExportJson',
    CheerUpAR        : 'PP_newCheerUpAR.ExportJson',
    CheerUpAtlas     : 'image/PP_newCheerUpAtlas.plist',
    CheerUpAtlas_png : 'image/PP_newCheerUpAtlas.png',

    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    PU_jackpotGameFont01_fnt : 'image/PU_jackpotGameFont01.fnt',
    PU_jackpotGameFont01_png : 'image/PU_jackpotGameFont01.png',


    PP_CheerUp_Font01_fnt : 'image/PP_CheerUp_Font01.fnt',
    PP_CheerUp_Font01_png : 'image/PP_CheerUp_Font01.png',

    CheerUpPop       : 'sfx/slot_Common/CheerupPopup.mp3',
    CheerUpSpin      : 'sfx/slot_Common/CheerupSpin.mp3',
    CheerUpShake     : 'sfx/slot_Common/CheerupShake.mp3'
};
window.g_resCheerUp = ResPack.create( 'resCheerUp', resCheerUp );

window.resClassInformation   = {
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    pp_classPointFont_fnt   : 'image/pp_classPointFont.fnt',
    pp_classPointFont_png   : 'image/pp_classPointFont.png',

    PP_ClassNotiUI : 'PP_ClassNotiUI.ExportJson',
    PP_classPopAtlas_png : 'image/PP_classPopAtlas.png',
    PP_classPopAtlas_plist : 'image/PP_classPopAtlas.plist',
    PP_classBenefitFont01_fnt : 'image/PP_classBenefitFont01.fnt',
    PP_classBenefitFont01_png : 'image/PP_classBenefitFont01.png',
};
window.g_resClassInformation = ResPack.create( 'resClassInformation', resClassInformation );

window.resClassBenefit   = {
    PU_NewClassAtlas_instant_plist  : 'image/PU_NewClassAtlas_instant.plist',
    PU_NewClassAtlas_instant_png    : 'image/PU_NewClassAtlas_instant.png',
    ClassEffect			            : 'sfx/global_Common/classEffect.mp3',

    UI : "PP_ClassNotiBenefitUI.ExportJson",
    PP_classPopAtlas_png : 'image/PP_classPopAtlas.png',
    PP_classPopAtlas_plist : 'image/PP_classPopAtlas.plist',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PP_classBenefitFont01_fnt : 'image/PP_classBenefitFont01.fnt',
    PP_classBenefitFont01_png : 'image/PP_classBenefitFont01.png',
    PP_classBenefitFont02_fnt : 'image/PP_classBenefitFont02.fnt',
    PP_classBenefitFont02_png : 'image/PP_classBenefitFont02.png',
};
window.g_resClassBenefit = ResPack.create( 'resClassBenefit', resClassBenefit );

window.resNewClassUp   = {
    PrimaryUI             : 'PP_newClassUpUI.ExportJson',
    SecondaryUI           : 'PP_newClassUpBackUI.ExportJson',
    MainAnimation         : 'PP_newClassUpAR.ExportJson',
    Atlas_plist           : 'image/PP_newClassUpAtlas.plist',
    Atlas_png             : 'image/PP_newClassUpAtlas.png',
    ClassImageAtlas_plist : 'image/PU_classImgAtlas.plist',
    ClassImageAtlas_png   : 'image/PU_classImgAtlas.png',

    Font_fnt              : 'image/puCashFn.fnt',
    Font_png              : 'image/puCashFn.png',

    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',

    CouponFreePassGet    : 'sfx/global_Common/CTGet.mp3',
    ClassUpPop           : 'sfx/global_Common/ClassUp.mp3',
};

window.g_resNewClassUp = ResPack.create( 'resNewClassUp', resNewClassUp );

window.resDailyStamp = {
    BonusStampUI          : 'PU_BonusStampUI.ExportJson',
    BonusStampAR          : 'PU_BonusStampAR.ExportJson',
    ClassGuideAnimation   : 'PU_bonusStampClassAR.ExportJson',
    popBaseFx_plist : 'image/popBaseFx.plist',
    popBaseFx_png : 'image/popBaseFx.png',
    PU_bonusDailyAtlas_plist : 'image/PU_bonusDailyAtlas.plist',
    PU_bonusDailyAtlas_png : 'image/PU_bonusDailyAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_dailyStampGem_Font_fnt : "image/PU_dailyStampGem_Font.fnt",
    PU_dailyStampGem_Font_png : "image/PU_dailyStampGem_Font.png",
    PU_classBonusShopMulti_01_fnt : "image/PU_classBonusShopMulti_01.fnt",
    PU_classBonusShopMulti_01_png : "image/PU_classBonusShopMulti_01.png"
};

window.g_resDailyStamp = ResPack.create( 'resDailyStamp', resDailyStamp );

window.resWeeklyLikeBonus = {
    LikeBonusUI      : 'PU_bonusLikeUI.ExportJson',
    LikeBonusAR      : 'PU_bonusLikeAR.ExportJson',
    LikeBonusBallAR  : 'PU_bonusLikeBallAR.ExportJson',
    BonusShareAR     : 'PU_bonusShareAR.ExportJson',
    pu_bnNum01_fnt : 'image/pu_bnNum01.fnt',
    pu_bnNum01_png : 'image/pu_bnNum01.png',
    BonusAtlas : 'image/PU_bonusAtlas.plist',
    BonusAtlas_png : 'image/PU_bonusAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_bonusPublicAtlas_plist : 'image/PU_bonusPublicAtlas.plist',
    PU_bonusPublicAtlas_png : 'image/PU_bonusPublicAtlas.png',

    WLPlay                 : 'sfx/lounge_Common/wlPlay.mp3',
    WLNormalBall           : 'sfx/lounge_Common/wlResultN.mp3',
    WLGoldBall             : 'sfx/lounge_Common/wlResultG.mp3',
};

window.g_resWeeklyLikeBonus = ResPack.create( 'resWeeklyLikeBonus', resWeeklyLikeBonus );

window.resLikeUsPopup = {
    PU_likeUsPopAR_mb : 'PU_likeUsPopAR_mb.ExportJson',
    PU_likeUsPopUI_mb : 'PU_likeUsPopUI_mb.ExportJson',
    PU_likeUsPopAtlas_mb_plist : 'image/PU_likeUsPopAtlas_mb.plist',
    PU_likeUsPopAtlas_mb_png : 'image/PU_likeUsPopAtlas_mb.png',
};
window.g_resLikeUsPopup = ResPack.create( 'resLikeUsPopup', resLikeUsPopup );


//!
window.resVIPWheel = {
    WheelPopUI          : 'vip_jackpotWheelPopUI.ExportJson', //  V2 vip_jackpotWheelPopUI
    WheelPop2UI         : 'vip_jackpotWheelPop02UI.ExportJson',
    WheelPopAR          : 'vip_jackpotWheelPopAR.ExportJson',
    WheelPop2AR         : 'vip_jackpotWheelPop02AR.ExportJson',
    popBaseFx_plist : 'image/popBaseFx.plist',
    popBaseFx_png : 'image/popBaseFx.png',
    vip_font01_fnt : 'image/vip_font01.fnt',
    vip_font01_png : 'image/vip_font01.png',
    vip_font02_fnt : 'image/vip_font02.fnt',
    vip_font02_png : 'image/vip_font02.png',
    vip_globalAtlas_plist : 'image/vip_globalAtlas.plist',
    vip_globalAtlas_png : 'image/vip_globalAtlas.png',
    vip_megaWheelAtlas_plist : 'image/vip_megaWheelAtlas.plist',
    vip_megaWheelAtlas_png : 'image/vip_megaWheelAtlas.png',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',

    VipWheelRotation     : 'sfx/global_Common/vipwheel.mp3',
    VipNormalWheelMatch  : 'sfx/global_Common/vipwheelNMatch.mp3',
    VipJackpotWheelMatch : 'sfx/global_Common/vipwheelJMatch.mp3',
    VipWheelMultiResult  : 'sfx/global_Common/vipwheelMulti.mp3',
    VipWheelWinCount     : 'sfx/global_Common/vipwheelNormalCount.mp3',
    VipWheelJackpotPop   : 'sfx/global_Common/vipwheelJackpotPopup.mp3',
    VipWheelJackpotCount : 'sfx/global_Common/vipwheelJackpotCount.mp3',

};
window.g_resVIPWheel = ResPack.create( 'resVIPWheel', resVIPWheel ).concat( g_resCommonEffect );


window.resVIPWheelJackpot = {
    JackpotResultUI     : 'vip_JackpotResultUI.ExportJson',
    JackpotResultAR     : 'vip_JackpotResultAR.ExportJson',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    PU_jackpotFont02_fnt : 'image/PU_jackpotFont02.fnt',
    PU_jackpotFont02_png : 'image/PU_jackpotFont02.png',
    vip_font02_fnt : 'image/vip_font02.fnt',
    vip_font02_png : 'image/vip_font02.png',
    vip_font04_fnt : 'image/vip_font04.fnt',
    vip_font04_png : 'image/vip_font04.png',
    PU_newMajorWinAtlas_plist : 'image/PU_newMajorWinAtlas.plist',
    PU_newMajorWinAtlas_png : 'image/PU_newMajorWinAtlas.png',
    vip_globalAtlas_plist : 'image/vip_globalAtlas.plist',
    vip_globalAtlas_png : 'image/vip_globalAtlas.png',
    vip_megaWheelAtlas_plist : 'image/vip_megaWheelAtlas.plist',
    vip_megaWheelAtlas_png : 'image/vip_megaWheelAtlas.png',
    VipWheelJackpotPop   : 'sfx/global_Common/vipwheelJackpotPopup.mp3',
};

window.g_resVIPWheelJackpot = ResPack.create( 'resVIPWheelJackpot', resVIPWheelJackpot );


window.resVIPMiniWheel = {
    VIPMiniWheelUI : 'vip_slMiniWheelUI_mb.ExportJson',
    VIPMiniWheelAR : 'vip_slMiniWheelAR_mb.ExportJson',
    VIPMiniWheelBtnAR : 'vip_slMiniWheelBtnAR_mb.ExportJson',
    vip_font01_fnt : 'image/vip_font01.fnt',
    vip_font01_png : 'image/vip_font01.png',
    vip_font02_fnt : 'image/vip_font02.fnt',
    vip_font02_png : 'image/vip_font02.png',
    vip_slMiniWheelAtlas_plist : 'image/vip_slMiniWheelAtlas.plist',
    vip_slMiniWheelAtlas_png : 'image/vip_slMiniWheelAtlas.png',
};
window.g_resVIPMiniWheel = ResPack.create( 'resVIPMiniWheel', resVIPMiniWheel );

// window.resCheckNetwork   = {
//     MainUI : 'PP_UnstableUI.ExportJson',
//     MainAR : 'PP_UnstableAR.ExportJson',
//     PurchaseUI : 'PP_buyUnstableUI_mb.ExportJson',
//     MainAtlas : 'image/LO_LoadingUI.plist',
//     MainAtlas_png : 'image/LO_LoadingUI.png'
// };
//
// window.g_resCheckNetwork = ResPack.create( 'resCheckNetwork', resCheckNetwork );

window.resBirthDayBenefit   = {
    MainUI : 'PU_birthPermissionUI.ExportJson',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    PU_birthPermissionAtlas_plist : 'image/PU_birthPermissionAtlas.plist',
    PU_birthPermissionAtlas_png : 'image/PU_birthPermissionAtlas.png',
};
window.g_resBirthDayBenefit = ResPack.create( 'resBirthDayBenefit', resBirthDayBenefit );

window.resFriendBenefit   = {
    MainUI : 'PU_FriendPermissionUI.ExportJson',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    popBaseFx_plist : 'image/popBaseFx.plist',
    popBaseFx_png : 'image/popBaseFx.png'
};
window.g_resFriendBenefit = ResPack.create( 'resFriendBenefit', resFriendBenefit );

window.resEncourageFacebookLoginBase   = {
    EncourageUI  : 'GU_facebookUI_mb.ExportJson',
    FacebookAR   : 'GU_facebookAR_mb.ExportJson',

    // GU_facebookGuide00AR_mb : 'GU_facebookGuide00AR_mb.ExportJson',
    // GU_facebookGuide00UI_mb : 'GU_facebookGuide00UI_mb.ExportJson',
    // GU_facebookGuide01AR_mb : 'GU_facebookGuide01AR_mb.ExportJson',
    // GU_facebookGuide01UI_mb : 'GU_facebookGuide01UI_mb.ExportJson',
    // GU_facebookGuide02AR_mb : 'GU_facebookGuide02AR_mb.ExportJson',
    // GU_facebookGuide02UI_mb : 'GU_facebookGuide02UI_mb.ExportJson',
    // GU_facebookGuide03AR_mb : 'GU_facebookGuide03AR_mb.ExportJson',
    // GU_facebookGuide03UI_mb : 'GU_facebookGuide03UI_mb.ExportJson',

    PU_updateAtlas_mb_plist : 'image/PU_updateAtlas_mb.plist',
    PU_updateAtlas_mb_png :'image/PU_updateAtlas_mb.png',

    GU_publicAtlas_mb_plist : 'image/GU_publicAtlas_mb.plist',
    GU_publicAtlas_mb_png : 'image/GU_publicAtlas_mb.png',

    GU_PublicBtnAtlas_mb_plist: 'image/GU_PublicBtnAtlas_mb.plist',
    GU_PublicBtnAtlas_mb_png: 'image/GU_PublicBtnAtlas_mb.png',

    PU_iosConnect_Font01_fnt : 'image/PU_iosConnect_Font01.fnt',
    PU_iosConnect_Font01_png : 'image/PU_iosConnect_Font01.png'
};
window.g_resEncourageFacebookLoginBase = ResPack.create('resEncourageFacebookLoginBase', resEncourageFacebookLoginBase)

window.resEncourageFacebookLoginType   = [
    {
        GU_facebookGuide00AR_mb: 'GU_facebookGuide00AR_mb.ExportJson',
        GU_facebookGuide00UI_mb: 'GU_facebookGuide00UI_mb.ExportJson',
    },
    {
        GU_facebookGuide01AR_mb : 'GU_facebookGuide01AR_mb.ExportJson',
        GU_facebookGuide01UI_mb : 'GU_facebookGuide01UI_mb.ExportJson',
    },
    {
        GU_facebookGuide02AR_mb : 'GU_facebookGuide02AR_mb.ExportJson',
        GU_facebookGuide02UI_mb : 'GU_facebookGuide02UI_mb.ExportJson',
    },
    {
        GU_facebookGuide03AR_mb : 'GU_facebookGuide03AR_mb.ExportJson',
        GU_facebookGuide03UI_mb : 'GU_facebookGuide03UI_mb.ExportJson',
    }
];
window.g_resEncourageFacebookLogin = [
    ResPack.create('resEncourageFacebookLoginType0', resEncourageFacebookLoginType[0]).concat(g_resEncourageFacebookLoginBase),
    ResPack.create('resEncourageFacebookLoginType1', resEncourageFacebookLoginType[1]).concat(g_resEncourageFacebookLoginBase),
    ResPack.create('resEncourageFacebookLoginType2', resEncourageFacebookLoginType[2]).concat(g_resEncourageFacebookLoginBase),
    ResPack.create('resEncourageFacebookLoginType3', resEncourageFacebookLoginType[3]).concat(g_resEncourageFacebookLoginBase),
];

window.resEncourageAppleLogin = {
    GU_AppleLoginGuideUI_mb  : "GU_AppleLoginGuideUI_mb.ExportJson",
    GU_AppleLoginGuideAR_mb  : "GU_AppleLoginGuideAR_mb.ExportJson",

    PU_updateAtlas_mb_plist : 'image/PU_updateAtlas_mb.plist',
    PU_updateAtlas_mb_png :'image/PU_updateAtlas_mb.png',

    GU_publicAtlas_mb_plist : 'image/GU_publicAtlas_mb.plist',
    GU_publicAtlas_mb_png : 'image/GU_publicAtlas_mb.png',

    GU_PublicBtnAtlas_mb_plist: 'image/GU_PublicBtnAtlas_mb.plist',
    GU_PublicBtnAtlas_mb_png: 'image/GU_PublicBtnAtlas_mb.png',

    PU_iosConnect_Font01_fnt : 'image/PU_iosConnect_Font01.fnt',
    PU_iosConnect_Font01_png : 'image/PU_iosConnect_Font01.png'
};
window.g_resEncourageAppleLogin = ResPack.create('resEncourageAppleLogin', resEncourageAppleLogin)


window.resRateUs   = {
    RateUsUI    : 'PP_rateUsUI_mb.ExportJson',
    RateUsUI_AR : 'PP_rateUsAR_mb.ExportJson',
    RateUsUIAtlas : 'image/pp_rateUsAtlas_mb.plist',
    RateUsUIAtlas_png : 'image/pp_rateUsAtlas_mb.png',
    PU_updateAtlas_mb_plist : 'image/PU_updateAtlas_mb.plist',
    PU_updateAtlas_mb_png : 'image/PU_updateAtlas_mb.png',
};
window.g_resRateUs = ResPack.create( 'resRateUs', resRateUs );

window.resApologyGift   = {
    ApologyGiftAR    : 'PP_apologyGiftAR.ExportJson',
    ApologyGiftUI    : 'PP_apologyGiftUI.ExportJson',
    ApologyAtlas     : 'image/PP_apologyAtlas.plist',
    ApologyAtlas_png : 'image/PP_apologyAtlas.png',

    PopBase        : 'image/popBaseFx.plist',
    PopBase_png    : 'image/popBaseFx.png',

    PU_hotDealFont_fnt  : 'image/PU_hotDealFont.fnt',
    PU_hotDealFont_png  : 'image/PU_hotDealFont.png',

    // From CommonEffect
    MajorWinAtlas_plist : 'image/PU_majorWinAtlas.plist',
    MajorWinAtlas_png   : 'image/PU_majorWinAtlas.png'
};
window.g_resApologyGift = ResPack.create( 'resApologyGift', resApologyGift );

window.resBirthDayGift   = {
    IntroAR      : 'LB_BirthIntroAR.ExportJson',
    IntroUI      : 'LB_BirthIntroUI.ExportJson',
    RewardAR     : 'LB_BirthRewardAR.ExportJson',
    RewardUI     : 'LB_BirthRewardUI.ExportJson',
    Atlas01      : 'image/LB_BirthRewardAtlas.plist',
    Atlas01_png  : 'image/LB_BirthRewardAtlas.png'
};
window.g_resBirthDayGift = ResPack.create( 'resBirthDayGift', resBirthDayGift );


window.resLeaveSlot   = {
    leaveUI : 'PP_leaveUI.ExportJson',
    Atlas_plist : 'image/LO_LoadingUI.plist',
    Atlas_png   : 'image/LO_LoadingUI.png',
    PU_commonPopup_font_Title01_fnt : 'image/PU_commonPopup_font_Title01.fnt',
    PU_commonPopup_font_Title01_png : 'image/PU_commonPopup_font_Title01.png',
    PU_commonPopup_Btn_font01_fnt   : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png   : 'image/PU_commonPopup_Btn_font01.png',

    // popGlobalPop_plist : 'image/popGlobalPop.plist',
    // popGlobalPop_png : 'image/popGlobalPop.png',
    // PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    // PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
};
window.g_resLeaveSlot = ResPack.create( 'resLeaveSlot', resLeaveSlot );

window.resSaveBonus   = {
    saveUI : 'PP_saveUI.ExportJson',
    Atlas_plist : 'image/LO_LoadingUI.plist',
    Atlas_png   : 'image/LO_LoadingUI.png',
    PU_commonPopup_font_Title01_fnt : 'image/PU_commonPopup_font_Title01.fnt',
    PU_commonPopup_font_Title01_png : 'image/PU_commonPopup_font_Title01.png',
    PU_commonPopup_Btn_font01_fnt   : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png   : 'image/PU_commonPopup_Btn_font01.png'
    // popGlobalPop_plist : 'image/popGlobalPop.plist',
    // popGlobalPop_png : 'image/popGlobalPop.png',
    // PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    // PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
};
window.g_resSaveBonus = ResPack.create( 'resSaveBonus', resSaveBonus );


//!
window.resReferralConnect   = {
    MainUI : 'PP_referralUI.ExportJson',
    PP_referralUI : 'PP_referralUI.ExportJson',
    popGlobalPop_plist : 'image/popGlobalPop.plist',
    popGlobalPop_png : 'image/popGlobalPop.png',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
};
window.g_resReferralConnect = ResPack.create( 'resReferralConnect', resReferralConnect );


window.resNewWelcome   = {
    NewWelcomeUI       : 'NEW_welcomeUI.ExportJson', // @BJ 20200715 v2 버전 교체
    NewWelcomeAR       : 'NEW_welcomeAR.ExportJson',
    BaseTexture        : 'image/NEW_giftAtlas.plist',
    BaseTexture_png    : 'image/NEW_giftAtlas.png',
    NewWelcomeFont     : 'image/PU_jackpotFont02.fnt',
    NewWelcomeFont_png : 'image/PU_jackpotFont02.png',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas.png',
    WelcomeSound         : 'sfx/slot_Common/welcome.mp3',
};
window.g_resNewWelcome = ResPack.create( 'resNewWelcome', resNewWelcome );

window.resVipWelcome   = {
    VipWelcomeUI       : 'vip_welcomeUI.ExportJson',
    VipWelcomeUI_plist : 'image/PU_globalImgAtlas.plist',
    VipWelcomeUI_png   : 'image/PU_globalImgAtlas.png',
    VipWelcomeAR       : 'vip_welcomeAR.ExportJson',
    VipWelcomeAR_plist : 'image/vip_welcomeAtlas.plist',
    VipWelcomeAR_png   : 'image/vip_welcomeAtlas.png'
};
window.g_resVipWelcome = ResPack.create( 'resVipWelcome', resVipWelcome );

window.resVipSlotLock   = {
    MainUI        : 'PP_LoungeUI.ExportJson',
    LockAnimation : 'PP_loungeAR.ExportJson',
    Atlas_plist   : 'image/PP_VipLoungeAtlas.plist',
    Atlas_png     : 'image/PP_VipLoungeAtlas.png',
    popBaseFx_plist : 'image/popBaseFx.plist',
    popBaseFx_png : 'image/popBaseFx.png',
};
window.g_resVipSlotLock = ResPack.create( 'resVipSlotLock', resVipSlotLock );

window.resGoToMenu = {
    PU_newGotoUI_mb : 'PU_newGotoUI_mb.ExportJson',
    PU_newGotoTagNew01_mb : 'PU_newGotoTagNew01_mb.ExportJson',
    PU_newGotoTagNew02_mb : 'PU_newGotoTagNew02_mb.ExportJson',
    PU_newGotoTagFeatured01_mb : 'PU_newGotoTagFeatured01_mb.ExportJson',
    PU_newGotoTagFeatured02_mb : 'PU_newGotoTagFeatured02_mb.ExportJson',
    PU_newGotoTagBest04_mb : 'PU_newGotoTagBest04_mb.ExportJson',
    PU_newGotoClassicNew_mb : 'PU_newGotoClassicNew_mb.ExportJson',
    PU_newGotoClassicHot_mb : 'PU_newGotoClassicHot_mb.ExportJson',
    PU_newGotoClassicBest_mb : 'PU_newGotoClassicBest_mb.ExportJson',
    PU_mobileGlobalAtlas_plist : 'image/PU_mobileGlobalAtlas.plist',
    PU_mobileGlobalAtlas_png : 'image/PU_mobileGlobalAtlas.png',
    PU_newGotoAtlas_mb_plist : 'image/PU_newGotoAtlas_mb.plist',
    PU_newGotoAtlas_mb_png : 'image/PU_newGotoAtlas_mb.png',
    pu_lobbyBlurBase : 'image/pu_lobbyBlurBase.png',

    // 고투메뉴 태그 추가
    PU_TagGlobalAtlas_plist     : "image/PU_TagGlobalAtlas.plist",
    PU_TagGlobalAtlas_png       : "image/PU_TagGlobalAtlas.png",
};
window.g_resGoToMenu = ResPack.create('resGoToMenu', resGoToMenu);

window.resConcierge = {
    ConciergeUI : 'PU_ConciergeUI.ExportJson',
    ConciergeAtlas : 'image/PU_ConciergeAtlas.plist',
    ConciergeAtlas_png : 'image/PU_ConciergeAtlas.png'
};
window.g_resConcierge = ResPack.create('resConcierge', resConcierge);

window.resSettingUI = {
    PP_newSettingAtlas_plist  : 'image/PP_newSettingAtlas.plist',
    PP_newSettingAtlas_png    : 'image/PP_newSettingAtlas.png',

    PAD_UI                      : "PP_newSettingUI.ExportJson",
    MOBILE_UI                   : "PP_newSettingUI_pad.ExportJson",

    PU_mobileGlobalAtlas_plist  : 'image/PU_mobileGlobalAtlas.plist',
    PU_mobileGlobalAtlas_png    : 'image/PU_mobileGlobalAtlas.png',
    PU_classImgAtlas_plist      : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png        : 'image/PU_classImgAtlas.png',

    PU_chatBotTooltipAtlas_plist : 'image/PU_chatBotTooltipAtlas.plist',
    PU_chatBotTooltipAtlas_png : 'image/PU_chatBotTooltipAtlas.png',
    PU_chatBotTooltipUI : 'PU_chatBotTooltipUI.ExportJson',
};
window.g_resSettingUI = ResPack.create('resSettingUI', resSettingUI);


window.resAppleNotificationSetUpGuide = {
    IosUI    : "PP_notificationHowUIIos_mb.ExportJson",
    AosUI    : "PP_notificationHowUIAos_mb.ExportJson",
    UI_png   : "image/PP_notificationAtlas_mb.png",
    UI_plist : "image/PP_notificationAtlas_mb.plist"
};


window.resPurchaseLayer = {
    PurchaseAR     : 'PP_purchaseAR.ExportJson',
    PurchaseAR02   : 'PP_purchase02AR.ExportJson',
    PurchaseUI     : 'PP_purchaseUI_mb.ExportJson',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    PP_buyAtlas_mb_plist : 'image/PP_buyAtlas_mb.plist',
    PP_buyAtlas_mb_png : 'image/PP_buyAtlas_mb.png',
    PP_purchaseAtlas_mb_plist : 'image/PP_purchaseAtlas_mb.plist',
    PP_purchaseAtlas_mb_png : 'image/PP_purchaseAtlas_mb.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    Particle_plist : 'image/PU_lineSpreadFx01.plist',
    Particle_png   : 'image/PU_lineSpreadFx01.png',
    PurchaseComplete     : 'sfx/global_Common/cashPurchaseComplete.mp3',
    PP_Purchase_Rstone_font01_fnt   :   "image/PP_Purchase_Rstone_font01.fnt",
    PP_Purchase_Rstone_font01_png   :   "image/PP_Purchase_Rstone_font01.png",
    PU_BHub_Font03_fnt  : "image/PU_BHub_Font03.fnt",
    PU_BHub_Font03_png  : "image/PU_BHub_Font03.png",
};
window.g_resPurchaseLayer = ResPack.create('resPurchaseLayer', resPurchaseLayer);


window.resCouponFreePass   = {
    MainUI            : 'PU_couponTicketUI_mb.ExportJson',
    MainAnimation     : 'PU_couponTicketAR_mb.ExportJson',
    PU_couponTicketAtlas_mb_plist : 'image/PU_couponTicketAtlas_mb.plist',
    PU_couponTicketAtlas_mb_png : 'image/PU_couponTicketAtlas_mb.png',
    CouponFreePassPop    : 'sfx/global_Common/CTPopup.mp3',
    CouponFreePassGet    : 'sfx/global_Common/CTGet.mp3',
};
window.g_resCouponFreePass = ResPack.create( 'resCouponFreePass', resCouponFreePass );

//! pay initated popup
window.resPayInitiated   = {
    MainUI         : 'PP_InitiatedUI.ExportJson',
    MainUI01_plist : 'image/LO_LoadingUI.plist',
    MainUI01_png   : 'image/LO_LoadingUI.png',
    Title01_fnt    : 'image/PU_commonPopup_font_Title01.fnt',
    Title01_png    : 'image/PU_commonPopup_font_Title01.png',
    Font01_fnt     : 'image/PU_commonPopup_Btn_font01.fnt',
    Font01_png     : 'image/PU_commonPopup_Btn_font01.png',
};
window.g_resPayInitiated = ResPack.create( 'resPayInitiated', resPayInitiated );

//! pay fail popup
window.resPayFail   = {
    MainUI         : 'PP_payFailUI.ExportJson',
    MainUI01_plist : 'image/LO_LoadingUI.plist',
    MainUI01_png   : 'image/LO_LoadingUI.png',
    Title01_fnt    : 'image/PU_commonPopup_font_Title01.fnt',
    Title01_png    : 'image/PU_commonPopup_font_Title01.png',
    Font01_fnt     : 'image/PU_commonPopup_Btn_font01.fnt',
    Font01_png     : 'image/PU_commonPopup_Btn_font01.png',
};
window.g_resPayFail = ResPack.create( 'resPayFail', resPayFail );

//! pay reloading popup
window.resPayReLoading   = {
    MainUI         : 'PP_PayReloadUI.ExportJson',
    MainUI01_plist : 'image/LO_LoadingUI.plist',
    MainUI01_png   : 'image/LO_LoadingUI.png',
    Title01_fnt    : 'image/PU_commonPopup_font_Title01.fnt',
    Title01_png    : 'image/PU_commonPopup_font_Title01.png',
    Font01_fnt     : 'image/PU_commonPopup_Btn_font01.fnt',
    Font01_png     : 'image/PU_commonPopup_Btn_font01.png',
};
window.g_resPayReLoading = ResPack.create( 'resPayReLoading', resPayReLoading );

//! pay loading animation
window.resPayAnimationLoading   = {
    LoadingAR  : 'PU_shopLoadingAR.ExportJson',
    Main_plist : 'image/PP_shopAtlas.plist',
    Main_png   : 'image/PP_shopAtlas.png'
};
window.g_resPayAnimationLoading = ResPack.create( 'resPayAnimationLoading', resPayAnimationLoading );

window.g_fonts = [
    //@face-font for WebFonts
    {
        type : "font",
        name : "RobotoCondensed-Bold",
        srcs : [ "fonts/RobotoCondensed-Bold.ttf" ]
    }
];

window.resInnate = {
    SubLoadingAR       : 'PU_subLoadingAR.ExportJson',
    SubLoadingAR_plist : 'image/PU_subLoadingAtlas.plist',
    SubLoadingAR_png   : 'image/PU_subLoadingAtlas.png',
    //NewSubLoadingAR    : 'PU_subLoading03AR.ExportJson',
    //LoginSubLoadingAR  : 'PU_subLoading02AR.ExportJson',

    RotCoinAR   : 'PU_vRotCoinAR.ExportJson',
    // RotCoinSAR  : 'PU_vRotCoinSAR.ExportJson',
    RotCoin     : 'image/vRotCoin.plist',
    RotCoin_png : 'image/vRotCoin.png',

    BigCoin     : 'image/PU_bigCoinAtlas.plist',
    BigCoin_png : 'image/PU_bigCoinAtlas.png',

    Font         : 'image/puCashFn.fnt',
    Font_png     : 'image/puCashFn.png',

    SlotIcon_plist          : "image/PU_slotIconAtlas.plist",
    SlotIcon_png            : "image/PU_slotIconAtlas.png",

    GuestImageAtlas         : 'image/PU_guestImgAtlas.plist',
    GuestImageAtlas_png     : 'image/PU_guestImgAtlas.png',

    //reconnect popup
    PU_commonPopup_Btn_font01_fnt : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png : 'image/PU_commonPopup_Btn_font01.png',

    PU_commonPopup_font_Title01_fnt : 'image/PU_commonPopup_font_Title01.fnt',
    PU_commonPopup_font_Title01_png : 'image/PU_commonPopup_font_Title01.png',

    ReconnectUI     : 'PP_reconnectUI.ExportJson',
    //unstable popup
    UnstableUI : 'PP_UnstableUI.ExportJson',
    UnstableAR : 'PP_UnstableAR.ExportJson',
    //reconnect Popup & unstable Popup atalas
    Loading_plist : 'image/LO_LoadingUI.plist',
    Loading_png   : 'image/LO_LoadingUI.png',
    //PurchaseUI : 'PP_buyUnstableUI_mb.ExportJson',

    PU_commonRedDotFxAR : 'PU_commonRedDotFxAR.ExportJson',
    PU_GameBaseAtlas_plist : 'image/PU_GameBaseAtlas.plist',
    PU_GameBaseAtlas_png : 'image/PU_GameBaseAtlas.png'
};
window.g_resInnate = ResPack.create( 'resInnate', resInnate ).concat(g_fonts);

/**
 * profile layer
 */
window.resProfile   = {

    NewProfileUI     : 'PU_newProfileUI_mb.ExportJson',
    ProfileTabUI     : 'PU_newProfilePhotoUI_mb.ExportJson',
    ProfileClassTipAR     : 'PU_newProfileClassTipAR_mb.ExportJson',
    ProfileLikeTipUI     : 'PU_newProfileLikeTipUI_mb.ExportJson',
    ProfileLikeTipAR     : 'PU_newProfileLikeTipAR_mb.ExportJson',
    ProfileBalanceTipAR     : 'PU_newProfileBalanceTipAR_mb.ExportJson',
    ProfilePrivateTipAR     : 'PU_newProfilePrivateTipAR_mb.ExportJson',
    freePassAtlas_mb_plist : 'image/freePassAtlas_mb.plist',
    freePassAtlas_mb_png : 'image/freePassAtlas_mb.png',
    PU_cashFont01_mb_fnt : 'image/PU_cashFont01_mb.fnt',
    PU_cashFont01_mb_png : 'image/PU_cashFont01_mb.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_mobileGlobalAtlas_plist : 'image/PU_mobileGlobalAtlas.plist',
    PU_mobileGlobalAtlas_png : 'image/PU_mobileGlobalAtlas.png',
    PU_newProfile01Atlas_mb_plist : 'image/PU_newProfile01Atlas_mb.plist',
    PU_newProfile01Atlas_mb_png : 'image/PU_newProfile01Atlas_mb.png',
    PU_newProfileAtlas_mb_plist : 'image/PU_newProfileAtlas_mb.plist',
    PU_newProfileAtlas_mb_png : 'image/PU_newProfileAtlas_mb.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',

};

window.g_resProfile = ResPack.create( 'resProfile', resProfile );


window.resProfileChangePopup = {
    EditCommentUI : 'PU_newProfileEditCommentUI_mb.ExportJson',
    PU_newProfile01Atlas_mb_plist : 'image/PU_newProfile01Atlas_mb.plist',
    PU_newProfile01Atlas_mb_png : 'image/PU_newProfile01Atlas_mb.png',
    SubLoadingAR       : 'PU_subLoadingAR.ExportJson',
    SubLoadingAR_plist : 'image/PU_subLoadingAtlas.plist',
    SubLoadingAR_png   : 'image/PU_subLoadingAtlas.png',
};
window.g_resProfileChangePopup = ResPack.create( 'resProfileChangePopup', resProfileChangePopup );

/**
 * profile comment Layer
 */
window.resProfileComment   = {

    //ProfileCommentUI : 'PU_profileCommentUI.ExportJson',
    //ProfileAtlas     : 'image/PU_profileAtlas.plist',
    //ProfileAtlas_png : //'image/PU_profileAtlas.png'//
    ProfileCommentUI : 'PU_newProfileCommentUI_mb.ExportJson',//'PU_profileCommentUI.ExportJson',
    ProfileAtlas     : 'image/PU_newProfileAtlas_mb.plist',//'image/PU_profileAtlas.plist',
    ProfileAtlas_png : 'image/PU_newProfileAtlas_mb.png'//'image/PU_profileAtlas.png'
};

window.g_resProfileComment = ResPack.create( 'resProfileComment', resProfileComment );

window.resSlotEntries = {
    LB_lobbyDividerAR       : 'LB_lobbyDividerAR.ExportJson',

    PU_vcDirectEntryFrameAR_mb          : 'PU_vcDirectEntryFrameAR_mb.ExportJson',
    PU_vcDirectEntryFrameAtlas_mb_plist : 'image/PU_vcDirectEntryFrameAtlas_mb.plist',
    PU_vcDirectEntryFrameAtlas_mb_png   : 'image/PU_vcDirectEntryFrameAtlas_mb.png',

    slotEntryFont_fnt:	"image/slotEntryFont.fnt",
    slotEntryFont_png:	"image/slotEntryFont.png",
    MiniCountFont        : 'image/vip_miniCountFont01.fnt',
    MiniCountFont_png    : 'image/vip_miniCountFont01.png',

    lobbyEntryDefaultAtlas_plist : 'image/PU_lobbyEntryDefaultAtlas.plist',
    lobbyEntryDefaultAtlas_png  : 'image/PU_lobbyEntryDefaultAtlas.png',

    LB_slotEntrtAtlas_plist : 'image/LB_slotEntrtAtlas.plist',
    LB_slotEntrtAtlas_png   : 'image/LB_slotEntrtAtlas.png',

    slotEntry_991Atlas_png  :	"image/slotEntry_991Atlas.png",
    slotEntry_992Atlas_png  :	"image/slotEntry_992Atlas.png",

    slotEntry_999AR         :	"slotEntry_999AR.ExportJson",
    slotEntry_999Atlas_plist:	"image/slotEntry_999Atlas.plist",
    slotEntry_999Atlas_png  :	"image/slotEntry_999Atlas.png",

    // 싱글 ad, 뉴 슬롯 배너 ( 처음에는 new slot frame 을 위했으나 공용으로 사용. hottest 등 )
    PU_newLobbyAdAtlas_mb_plist : "image/PU_newLobbyAdAtlas_mb.plist",
    PU_newLobbyAdAtlas_mb_png   : "image/PU_newLobbyAdAtlas_mb.png",
    LB_newSlotBanner_frameAR    : "LB_newSlotBanner_frameAR.ExportJson",
    LB_newSlotBanner_frameUI    : "LB_newSlotBanner_frameUI.ExportJson",


    // genie pick
    LB_EntryPickAtlas_plist     : 'image/LB_EntryPickAtlas.plist',
    LB_EntryPickAtlas_png       : 'image/LB_EntryPickAtlas.png',
    LB_EntryPickBgAR            : 'LB_EntryPickBgAR.ExportJson',
    LB_EntryPickEntry0ARAtlas_plist : 'image/LB_EntryPickEntry0ARAtlas.plist',
    LB_EntryPickEntry0ARAtlas_png   : 'image/LB_EntryPickEntry0ARAtlas.png',
    LB_EntryPickEntry0AR            : 'LB_EntryPickEntry0AR.ExportJson',
    LB_EntryPickEntry1ARAtlas_plist : 'image/LB_EntryPickEntry1ARAtlas.plist',
    LB_EntryPickEntry1ARAtlas_png   : 'image/LB_EntryPickEntry1ARAtlas.png',
    LB_EntryPickEntry1AR            : 'LB_EntryPickEntry1AR.ExportJson',

    // hottest 슬롯 배너
    LB_hottestAtlas_plist       : "image/LB_hottestAtlas.plist",
    LB_hottestAtlas_png         : "image/LB_hottestAtlas.png",
    LB_hottestBgAR              : "LB_hottestBgAR.ExportJson",
    LB_hottestFxAR              : "LB_hottestFxAR.ExportJson",

    // tag (웹 . 모바이 공통으로 사용중 ) 엔트리 테그 관련 파일은 여기 추가하자 @BJ 20221122
    PU_TagGlobalAtlas_plist     : "image/PU_TagGlobalAtlas.plist",
    PU_TagGlobalAtlas_png       : "image/PU_TagGlobalAtlas.png",


    // 카테고리
    LB_categoryAtlas_plist      : "image/LB_categoryAtlas.plist",
    LB_categoryAtlas_png        : "image/LB_categoryAtlas.png",
    LB_categoryAR               : "LB_categoryAR.ExportJson",
    LB_categoryUI               : "LB_categoryUI.ExportJson",

    // 카테고리 팝업 사운드
    CateOpen_mp3                : 'sfx/global_Common/CateOpen.mp3',
    CateClose_mp3               : 'sfx/global_Common/CateClose.mp3'
};


window.g_resSlotEntries = ResPack.create('resSlotEntries', resSlotEntries);

window.resNewLobbyPurge = {
    // GiftArmature         : 'LB_giftAR.ExportJson',
    SlotMachineArmature  : 'LB_sdSlotEntryAR.ExportJson',
    // BonusArmature        : 'PU_bonusAR.ExportJson',
    // BonusUI              : 'PU_bonusUI.ExportJson',
    LobbyAtlas           : 'image/LB_newLobbyAtlas.plist',
    LobbyAtlas_png       : 'image/LB_newLobbyAtlas.png',
    CashFont             : 'image/puCashFn.fnt',
    CashFont_png         : 'image/puCashFn.png',
    NanumFont            : 'image/sysNanumFonS.fnt',
    NanumFont_png        : 'image/sysNanumFonS.png',
    MiniCountFont        : 'image/vip_miniCountFont01.fnt',
    MiniCountFont_png    : 'image/vip_miniCountFont01.png',
    // JackpotNoticeAR      : 'LB_jackpotNotiAR.ExportJson',
    // JackpotNoticeUI      : 'LB_jackpotNotiUI.ExportJson',
    GameJackpotFont      : 'image/PU_jackpotGameFont01.fnt',
    GameJackpotFont_png  : 'image/PU_jackpotGameFont01.png',
    SlotMachineAtlas     : 'image/LB_slotEntrtAtlas.plist',
    SlotMachineAtlas_png : 'image/LB_slotEntrtAtlas.png',
    // SlotIndicatorAR      : 'LB_IndicatorAR.ExportJson',
    SlotEntryAR_70       : 'LB_70SlotEntryAR.ExportJson',
    SLotEntryAR_CP       : 'LB_cpSlotEntryAR.ExportJson',
    SLotEntryAR_EL       : 'LB_elSlotEntryAR.ExportJson',
    SLotEntryAR_FP       : 'LB_fpSlotEntryAR.ExportJson',
    SLotEntryAR_HG       : 'LB_hgSlotEntryAR.ExportJson',
    SLotEntryAR_HM       : 'LB_hmSlotEntryAR.ExportJson',
    SLotEntryAR_JC       : 'LB_jcSlotEntryAR.ExportJson',
    SLotEntryAR_MS       : 'LB_msSlotEntryAR.ExportJson',
    SLotEntryAR_QA       : 'LB_qaSlotEntryAR.ExportJson',
    SLotEntryAR_SD       : 'LB_sdSlotEntryAR.ExportJson',
    SLotEntryAR_SH       : 'LB_shSlotEntryAR.ExportJson',
    SLotEntryAR_WJ       : 'LB_wjSlotEntryAR.ExportJson',
    SLotEntryAR_WW       : 'LB_wwSlotEntryAR.ExportJson',
    SLotEntryAR_DS       : 'LB_wj2SlotEntryAR.ExportJson',
    SLotEntryAR_GS       : 'LB_gsSlotEntryAR.ExportJson',
    SLotEntryAR_EJ       : 'LB_ejSlotEntryAR.ExportJson',
    SLotEntryAR_FM       : 'LB_fmSlotEntryAR.ExportJson',
    SlotEntryAR_F7       : 'LB_f7SlotEntryAR.ExportJson',
    SlotEntryAR_FS       : 'LB_fsSlotEntryAR.ExportJson',
    SlotEntryAR_GM       : 'LB_gmSlotEntryAR.ExportJson',
    SlotEntryAR_CF       : 'LB_cfSlotEntryAR.ExportJson',
    SlotEntryAR_JX       : 'LB_jxSlotEntryAR.ExportJson',
    SlotEntryAR_HC       : 'LB_hcSlotEntryAR.ExportJson',
    SlotEntryAR_ZT       : 'LB_ztSlotEntryAR.ExportJson',
    SlotEntryAR_BP       : 'LB_bpSlotEntryAR.ExportJson',
    SlotEntryAR_VL       : 'LB_vlSlotEntryAR.ExportJson',
    SlotEntryAR_GE		 : 'LB_geSlotEntryAR.ExportJson',
    SlotEntryAR_DR       : 'LB_drSlotEntryAR.ExportJson',
    SlotEntryAR_KR       : 'LB_ksSlotEntryAR.ExportJson',
    SlotEntryAR_DW       : 'LB_dwSlotEntryAR.ExportJson',
    SlotEntryAR_FD       : 'LB_fdSlotEntryAR.ExportJson',
    SlotEntryAR_QR       : 'LB_qrSlotEntryAR.ExportJson',
    SlotEntryAR_AW       : 'LB_awSlotEntryAR.ExportJson',
    SlotEntryAR_PK       : 'LB_pkSlotEntryAR.ExportJson',
    SlotEntryAR_GB       : 'LB_gbSlotEntryAR.ExportJson',
    SlotEntryAR_BM       : 'LB_bmSlotEntryAR.ExportJson',
    SlotEntryAR_OL       : 'LB_olSlotEntryAR.ExportJson',
    SlotEntryAR_GOS      : 'LB_gosSlotEntryAR.ExportJson',
    SlotEntryAR_FC       : 'LB_fcSlotEntryAR.ExportJson',
    SlotEntryAR_SL       : 'LB_dlSlotEntryAR.ExportJson',
    SlotEntryAR_VQ       : 'LB_vqSlotEntryAR.ExportJson',
    SlotEntryAR_FM2      : 'LB_fm2SlotEntryAR.ExportJson',
    SlotEntryAR_LL       : 'LB_llSlotEntryAR.ExportJson',
    SlotEntryAR_GT       : 'LB_gtSlotEntryAR.ExportJson',
    SlotEntryAR_CS       : 'LB_csSlotEntryAR.ExportJson',
    SlotEntryAR_FT       : 'LB_ftSlotEntryAR.ExportJson',
    SlotEntryAR_JR       : 'LB_jrSlotEntryAR.ExportJson',
    SlotEntryAR_MR       : 'LB_mrSlotEntryAR.ExportJson',
    SlotEntryAR_TW       : 'LB_twSlotEntryAR.ExportJson',
    SlotEntryAR_VR       : 'LB_vrSlotEntryAR.ExportJson',
    SlotEntryAR_TI       : 'LB_tiSlotEntryAR.ExportJson',
    SlotEntryAR_AS       : 'LB_asSlotEntryAR.ExportJson',
    SlotEntryAR_FJ       : 'LB_fjSlotEntryAR.ExportJson',
    SlotEntryAR_FPD      : 'LB_fpdSlotEntryAR.ExportJson',
    SlotEntryAR_SP       : 'LB_spSlotEntryAR.ExportJson',

    // LeaderBoardIconAR : 'LB_leaderBoardAR.ExportJson',

    //! for cabaret slot entry ar
    CabaretSlotEntry_plist          : 'image/LB_cfSlotEntryAtlas.plist',
    CabaretSlotEntry_png            : 'image/LB_cfSlotEntryAtlas.png',
    JackpotXmasSlotEntry_plist      : 'image/LB_jxSlotEntryAtlas.plist',
    JackpotXmasSlotEntry_png        : 'image/LB_jxSlotEntryAtlas.png',
    HotCashSlotEntry_plist          : 'image/LB_hcSlotEntryAtlas.plist',
    HotCashSlotEntry_png            : 'image/LB_hcSlotEntryAtlas.png',
    ZeusThunderSlotEntry_plist      : 'image/LB_ztSlotEntryAtlas.plist',
    ZeusThunderSlotEntry_png        : 'image/LB_ztSlotEntryAtlas.png',
    BillionairePiggySlotEntry_plist : 'image/LB_bpSlotEntryAtlas.plist',
    BillionairePiggySlotEntry_png   : 'image/LB_bpSlotEntryAtlas.png',

    VegasLinkSlotEntry_plist        : 'image/LB_vlSlotEntryAtlas.plist',
    VegasLinkSlotEntry_png          : 'image/LB_vlSlotEntryAtlas.png',
    GoldenEagleSlotEntry_plist      : 'image/LB_geSlotEntryAtlas.plist',
    GoldenEagleSlotEntry_png        : 'image/LB_geSlotEntryAtlas.png',
    DragonRisingSlotEntry_plist     : 'image/LB_drSlotEntryAtlas.plist',
    DragonRisingSlotEntry_png       : 'image/LB_drSlotEntryAtlas.png',
    KsSlotEntryAtlas                : 'image/LB_ksSlotEntryAtlas.plist',
    KsSlotEntryAtlas_png            : 'image/LB_ksSlotEntryAtlas.png',
    DiamondWheelSlotEntry_plist     : 'image/LB_dwSlotEntryAtlas.plist',
    DiamondWheelSlotEntry_png       : 'image/LB_dwSlotEntryAtlas.png',
    FortuneDiamondSlotEntry_plist   : 'image/LB_fdSlotEntryAtlas.plist',
    FortuneDiamondSlotEntry_png     : 'image/LB_fdSlotEntryAtlas.png',
    QueenOfRichesSlotEntry_plist    : 'image/LB_qrSlotEntryAtlas.plist',
    QueenOfRichesSlotEntry_png      : 'image/LB_qrSlotEntryAtlas.png',
    AlohaWheelSlotEntry_plist 	    : 'image/LB_awSlotEntryAtlas.plist',
    AlohaWheelSlotEntry_png     	: 'image/LB_awSlotEntryAtlas.png',
    PumpkinPotSlotEntry_plist       : 'image/LB_pkSlotEntryAtlas.plist',
    PumpkinPotSlotEntry_png         : 'image/LB_pkSlotEntryAtlas.png',
    GoldBarSlotEntry_plist     		: 'image/LB_gbSlotEntryAtlas.plist',
    GoldBarSlotEntry_png        	: 'image/LB_gbSlotEntryAtlas.png',
    BigMoneySlotEntry_plist    		: 'image/LB_bmSlotEntryAtlas.plist',
    BigMoneySlotEntry_png        	: 'image/LB_bmSlotEntryAtlas.png',
    GoldSpinSlotEntry_plist		    : 'image/LB_gosSlotEntryAtlas.plist',
    GoldSpinSlotEntry_png		    : 'image/LB_gosSlotEntryAtlas.png',
    FairyMischiefSlotEntry_plist    : 'image/LB_fcSlotEntryAtlas.plist',
    FairyMischiefSlotEntry_png      : 'image/LB_fcSlotEntryAtlas.png',
    ShiningLinkSlotEntry_plist     : 'image/LB_dlSlotEntryAtlas.plist',
    ShiningLinkSlotEntry_png       : 'image/LB_dlSlotEntryAtlas.png',
    GoldenCloversSlotEntry_plist    : 'image/LB_gcSlotEntryAtlas.plist',
    GoldenCloversSlotEntry_png      : 'image/LB_gcSlotEntryAtlas.png',
    FishingMaster2SlotEntry_plist  : 'image/LB_fm2SlotEntryAtlas.plist',
    FishingMaster2SlotEntry_png    : 'image/LB_fm2SlotEntryAtlas.png',
    LuckyLampSlotEntry_plist       : 'image/LB_llSlotEntryAtlas.plist',
    LuckyLampSlotEntry_png         : 'image/LB_llSlotEntryAtlas.png',
    GreatEmpireSlotEntry_plist     : 'image/LB_gtSlotEntryAtlas.plist',
    GreatEmpireSlotEntry_png       : 'image/LB_gtSlotEntryAtlas.png',
    CaptainSharkSlotEntry_plist    : 'image/LB_csSlotEntryAtlas.plist',
    CaptainSharkSlotEntry_png      : 'image/LB_csSlotEntryAtlas.png',
    FortuneTreeSlotEntry_plist	   : 'image/LB_ftSlotEntryAtlas.plist',
    FortuneTreeSlotEntry_png	   : 'image/LB_ftSlotEntryAtlas.png',
    JackpotRushSlotEntry_plist	   : 'image/LB_jrSlotEntryAtlas.plist',
    JackpotRushSlotEntry_png	   : 'image/LB_jrSlotEntryAtlas.png',
    MrBillionaireSlotEntry_plist   : 'image/LB_mrSlotEntryAtlas.plist',
    MrBillionaireSlotEntry_png     : 'image/LB_mrSlotEntryAtlas.png',
    TripleWolfSlotEntry_plist	   : 'image/LB_twSlotEntryAtlas.plist',
    TripleWolfSlotEntry_png	   	   : 'image/LB_twSlotEntryAtlas.png',
    VampiresRosesSlotEntry_plist   : 'image/LB_vrSlotEntryAtlas.plist',
    VampiresRosesSlotEntry_png     : 'image/LB_vrSlotEntryAtlas.png',
    TreasureIslandSlotEntry_plist  : 'image/LB_tiSlotEntryAtlas.plist',
    TreasureIslandSlotEntry_png    : 'image/LB_tiSlotEntryAtlas.png',
    AllStarSlotEntry_plist		   : 'image/LB_asSlotEntryAtlas.plist',
    AllStarSlotEntry_png 		   : 'image/LB_asSlotEntryAtlas.png',
    FortuneDJREntry_plist		   : 'image/LB_fjSlotEntryAtlas.plist',
    FortuneDJREntry_png 		   : 'image/LB_fjSlotEntryAtlas.png',
    FortunePandaEntry_plist		   : 'image/LB_fpdSlotEntryAtlas.plist',
    FortunePandaEntry_png		   : 'image/LB_fpdSlotEntryAtlas.png',
    PharaohWildEntry_plist         : 'image/LB_pwSlotEntryAtlas.plist',
    PharaohWildEntry_png           : 'image/LB_pwSlotEntryAtlas.png',
    SharkParadeEntry_plist         : 'image/LB_spSlotEntryAtlas.plist',
    SharkParadeEntry_png           : 'image/LB_spSlotEntryAtlas.png',

    // EasterEggEntry       : 'LB_easter17EntryAR.ExportJson',
    // EasterEggEntry_plist : 'image/LB_easter17Atlas02.plist',
    // EasterEggEntry_png   : 'image/LB_easter17Atlas02.png'

    CWSlotEntryAR		 : 'c_cwSlotEntryAR_mb.ExportJson',
    CW2SlotEntryAR		 : 'c_cw2SlotEntryAR_mb.ExportJson',
    CW3SlotEntryAR		 : 'c_cw3SlotEntryAR_mb.ExportJson',
    TDSlotEntryAR		 : 'c_tdSlotEntryAR_mb.ExportJson',
    FXSlotEntryAR		 : 'c_5xSlotEntryAR_mb.ExportJson',
    WRSlotEntryAR		 : 'c_wrSlotEntryAR.ExportJson',
    ERSlotEntryAR		 : 'c_erSlotEntryAR_mb.ExportJson',
    PDSlotEntryAR		 : 'c_pdSlotEntryAR_mb.ExportJson',
    T7SlotEntryAR		 : 'c_t7SlotEntryAR_mb.ExportJson',
    BDSlotEntryAR		 : 'c_bdSlotEntryAR_mb.ExportJson',
    BRSlotEntryAR		 : 'c_brSlotEntryAR_mb.ExportJson',
    BWQSlotEntryAR		 : 'c_bwqSlotEntryAR.ExportJson',
    BWNSlotEntryAR		 : 'c_bwnSlotEntryAR_mb.ExportJson', // BWN 추가
    BRCSlotEntryAR		 : 'c_brcSlotEntryAR_mb.ExportJson', // BRC 추가
    BR5XSlotEntryAR		 : 'c_br5SlotEntryAR_mb.ExportJson', // BR5 추가
    BWLSlotEntryAR		 : 'c_bwlSlotEntryAR_mb.ExportJson', // BWL 추가
    WHSlotEntryAR 		 : 'c_whSlotEntryAR_mb.ExportJson',	 // WH 추가

    superBallKenoARAtlas : 'k_sbSlotEntryAtlas_mb.plist',
    superBallKenoAR_png : 'k_sbSlotEntryAtlas_mb.png',
    superBallKenoAR : 'k_sbSlotEntryAR_mb.ExportJson',
    superBallKenoARVIP : 'k_sbVipSlotEntryAR_mb.ExportJson',
    scarabKenoARAtlas : 'k_skSlotEntryAtlas_mb.plist',
    scarabKenoAR_png : 'k_skSlotEntryAtlas_mb.png',
    scarabKenoAR : 'k_skSlotEntryAR_mb.ExportJson',
    scarabKenoARVIP : 'k_skVipSlotEntryAR_mb.ExportJson',

    VipCWSlotEntryAR	 : 'c_cwVipSlotEntryAR_mb.ExportJson',
    VipCW2SlotEntryAR	 : 'c_cw2VipSlotEntryAR_mb.ExportJson',
    VipCW3SlotEntryAR	 : 'c_cw3VipSlotEntryAR_mb.ExportJson',
    VipTDSlotEntryAR	 : 'c_tdVipSlotEntryAR_mb.ExportJson',
    VipFXSlotEntryAR	 : 'c_5xVipSlotEntryAR_mb.ExportJson',
    VipWRSlotEntryAR	 : 'c_wrVipSlotEntryAR.ExportJson',
    VipERSlotEntryAR	 : 'c_erVipSlotEntryAR_mb.ExportJson',
    VipPDSlotEntryAR	 : 'c_pdVipSlotEntryAR_mb.ExportJson',
    VipT7SlotEntryAR	 : 'c_t7VipSlotEntryAR_mb.ExportJson',
    VipBDSlotEntryAR	 : 'c_bdVipSlotEntryAR_mb.ExportJson',
    VipBRSlotEntryAR	 : 'c_brVipSlotEntryAR_mb.ExportJson',
    VipBWQSlotEntryAR	 : 'c_bwqVipSlotEntryAR.ExportJson',
    VipBWNSlotEntryAR	 : 'c_bwnVipSlotEntryAR_mb.ExportJson', // BWN 추가
    VipBRCSlotEntryAR	 : 'c_brcVipSlotEntryAR_mb.ExportJson', // BRC 추가
    VipBR5XSlotEntryAR	 : 'c_br5VipSlotEntryAR_mb.ExportJson', // BR5 추가
    VipBWLSlotEntryAR	 : 'c_bwlVipSlotEntryAR_mb.ExportJson', // BWL 추가
    VipWHSlotEntryAR 	 : 'c_whVipSlotEntryAR_mb.ExportJson',	// WH 추가

    CWSlotEntry_plist	 : 'image/c_cwSlotEntryAR_mb.plist',
    CWSlotEntry_png		 : 'image/c_cwSlotEntryAR_mb.png',
    CW2SlotEntry_plist	 : 'image/c_cw2SlotEntryAR_mb.plist',
    CW2SlotEntry_png	 : 'image/c_cw2SlotEntryAR_mb.png',
    CW3SlotEntry_plist	 : 'image/c_cw3SlotEntryAR_mb.plist',
    CW3SlotEntry_png	 : 'image/c_cw3SlotEntryAR_mb.png',
    TDSlotEntry_plist	 : 'image/c_tdSlotEntryAR_mb.plist',
    TDSlotEntry_png		 : 'image/c_tdSlotEntryAR_mb.png',
    FXSlotEntry_plist	 : 'image/c_5xSlotEntryAR_mb.plist',
    FXSlotEntry_png		 : 'image/c_5xSlotEntryAR_mb.png',
    WRSlotEntry_plist	 : 'image/c_wrSlotEntryAtlas.plist',
    WRSlotEntry_png		 : 'image/c_wrSlotEntryAtlas.png',
    ERSlotEntry_plist	 : 'image/c_erSlotEntryAR_mb.plist',
    ERSlotEntry_png		 : 'image/c_erSlotEntryAR_mb.png',
    PDSlotEntry_plist	 : 'image/c_pdSlotEntryAR_mb.plist',
    PDSlotEntry_png		 : 'image/c_pdSlotEntryAR_mb.png',
    T7SlotEntry_plist	 : 'image/c_t7SlotEntryAR_mb.plist',
    T7SlotEntry_png		 : 'image/c_t7SlotEntryAR_mb.png',
    BDSlotEntry_plist	 : 'image/c_bdSlotEntryAR_mb.plist',
    BDSlotEntry_png		 : 'image/c_bdSlotEntryAR_mb.png',
    BRSlotEntry_plist	 : 'image/c_brSlotEntryAR_mb.plist',
    BRSlotEntry_png		 : 'image/c_brSlotEntryAR_mb.png',
    BWQSlotEntry_plist	 : 'image/c_bwqSlotEntryAR.plist',
    BWQlotEntry_png		 : 'image/c_bwqSlotEntryAR.png',
    BWNSlotEntry_plist	 : 'image/c_bwqSlotEntryAR.plist', // BWN 추가
    BWNSlotEntry_png	 : 'image/c_bwqSlotEntryAR.png', // BWN 추가
    BRCSlotEntry_plist	 : 'image/c_brcSlotEntryAtlas_mb.plist', // BRC 추가
    BRCSlotEntry_png	 : 'image/c_brcSlotEntryAtlas_mb.png', // BRC 추가
    BR5XSlotEntry_plist  : 'image/c_br5SlotEntryAtlas_mb.plist', // BR5 추가
    BR5XSlotEntry_png    : 'image/c_br5SlotEntryAtlas_mb.png', // BR5 추가
    BWLSlotEntry_plist   : 'image/c_bwlSlotEntryAtlas_mb.plist', // BWL 추가
    BWLSlotEntry_png     : 'image/c_bwlSlotEntryAtlas_mb.png', // BWL 추가
    WHSlotEntry_plist    : 'image/c_whSlotEntryAtlas_mb.plist',	// WH 추가
    WHSlotEntry_png  	 : 'image/c_whSlotEntryAtlas_mb.png',		// WH 추가
};

window.resCheckInbox = {
    UI                   : 'PP_checkInboxUI.ExportJson',
    Atlas_plist : 'image/LO_LoadingUI.plist',
    Atlas_png   : 'image/LO_LoadingUI.png',
    PU_commonPopup_font_Title01_fnt : 'image/PU_commonPopup_font_Title01.fnt',
    PU_commonPopup_font_Title01_png : 'image/PU_commonPopup_font_Title01.png',
    PU_commonPopup_Btn_font01_fnt   : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png   : 'image/PU_commonPopup_Btn_font01.png'
    // Atlas                : 'image/popGlobalPop.plist',
    // Atlas_png            : 'image/popGlobalPop.png',
    // BaseFxAtlas          : 'image/PP_newBaseFxAtlas.plist',
    // BaseFxAtlas_png      : 'image/PP_newBaseFxAtlas.png'
};

window.g_resCheckInbox = ResPack.create( 'resCheckInbox', resCheckInbox );

window.resApologyGiftInBox = {
    AR                   : 'PP_rewardAR.ExportJson',
    UI                   : 'PP_rewardUI.ExportJson',
    UI_PRE               : 'PP_Pre_rewardUI.ExportJson',
    Atlas                : 'image/PP_rewardAtlas.plist',
    Atlas_png            : 'image/PP_rewardAtlas.png',
    BaseFxAtlas          : 'image/PP_newBaseFxAtlas.plist',
    BaseFxAtlas_png      : 'image/PP_newBaseFxAtlas.png'
};

window.g_resApologyGiftInBox = ResPack.create( 'resApologyGiftInBox', resApologyGiftInBox );





//////////////////////////////////////////////////////////
//모바일V2우회작업 (바이너리 업데이트 후 아래 블럭 삭제)
window.resSocialBoardV2 = {
    UI: 'PP_newSocialUI_mb.ExportJson',
    SendGiftTabUI    : 'PP_newSocialBtnAR_mb.ExportJson',
    GiftFacebookUI   : 'GU_giftFacebookUI_mb.ExportJson',
    SocialAdUI       : 'PP_newSocialAdUI_mb.ExportJson',
    PP_newSocialTipAR_mb : 'PP_newSocialTipAR_mb.ExportJson',
    PP_newSocialInviteUI_mb : 'PP_newSocialInviteUI_mb.ExportJson',
    PP_newSocialInviteAR_mb : 'PP_newSocialInviteAR_mb.ExportJson',
    PP_newSocialInviteProFxAR : 'PP_newSocialInviteProFxAR.ExportJson',
    PP_newSocialInviteTagFxAR : 'PP_newSocialInviteTagFxAR.ExportJson',
    PU_FeedBackShadowAR : 'PU_FeedBackShadowAR.ExportJson',
    ActionFeedBack       : 'PU_FeedBackAR.ExportJson',
    ActionFeedBack_plist : 'image/PU_notiAtlas.plist',
    ActionFeedBack_png   : 'image/PU_notiAtlas.png',
    GU_PublicBtnAtlas_mb_plist: 'image/GU_PublicBtnAtlas_mb.plist',
    GU_PublicBtnAtlas_mb_png: 'image/GU_PublicBtnAtlas_mb.png',


    PP_newSocialAtlas_mb_plist : 'image/PP_newSocialAtlas_mb.plist',
    PP_newSocialAtlas_mb_png : 'image/PP_newSocialAtlas_mb.png',
    PU_mobileGlobalAtlas_plist : 'image/PU_mobileGlobalAtlas.plist',
    PU_mobileGlobalAtlas_png : 'image/PU_mobileGlobalAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_couponNum_fnt : 'image/PU_couponNum.fnt',
    PU_couponNum_png : 'image/PU_couponNum.png',
    PP_newSocialInviteAtlas_mb_plist : 'image/PP_newSocialInviteAtlas_mb.plist',
    PP_newSocialInviteAtlas_mb_png : 'image/PP_newSocialInviteAtlas_mb.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_EventPass_coinGoldNum_fnt : 'image/PU_EventPass_coinGoldNum.fnt',
    PU_EventPass_coinGoldNum_png : 'image/PU_EventPass_coinGoldNum.png',
    PU_FeedBackShadowAtlas_plist : 'image/PU_FeedBackShadowAtlas.plist',
    PU_FeedBackShadowAtlas_png : 'image/PU_FeedBackShadowAtlas.png',

    InvitePopupIntro    : 'sfx/lounge_Common/Invitepop.mp3',
    CollectInboxGift       : 'sfx/lounge_Common/collectGift.mp3',

    // 페북리워드 폰트 MS STORE에서 사용
    PU_iosConnect_Font01_fnt : 'image/PU_iosConnect_Font01.fnt',
    PU_iosConnect_Font01_png : 'image/PU_iosConnect_Font01.png',

    //special gift
    PP_newSocialSpecialAtlas_plist  : 'image/PP_newSocialSpecialAtlas.plist',
    PP_newSocialSpecialAtlas_png    : 'image/PP_newSocialSpecialAtlas.png',
    PU_commonPopup_Btn_font01_fnt   : 'image/PU_commonPopup_Btn_font01.fnt',
    PU_commonPopup_Btn_font01_png   : 'image/PU_commonPopup_Btn_font01.png',

    PP_newSocial_SpecialBoxAR_mb    : 'PP_newSocial_SpecialBoxAR_mb.ExportJson',
    PP_newSocial_SpecialIcon01AR_mb : 'PP_newSocial_SpecialIcon01AR_mb.ExportJson',
    PP_newSocial_SpecialIcon02AR_mb : 'PP_newSocial_SpecialIcon02AR_mb.ExportJson',
    PP_newSocial_SpecialIcon03AR_mb : 'PP_newSocial_SpecialIcon03AR_mb.ExportJson',
    PP_newSocial_SpecialIconFxAR_mb : 'PP_newSocial_SpecialIconFxAR_mb.ExportJson',
    PP_newSocial_SpecialUI_mb       : 'PP_newSocial_SpecialUI_mb.ExportJson',
};

window.g_resSocialBoardV2 = ResPack.create('resSocialBoardV2', resSocialBoardV2);
////////////////////////////////////////////////////////////////////


window.resVipLoungePurge = {};


window.resCashRaceEnd   = {
    MainUI : 'PP_cashRaceEndUI.ExportJson',
    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',
    PU_globalImgAtlas_plist : 'image/PU_globalImgAtlas.plist',
    PU_globalImgAtlas_png : 'image/PU_globalImgAtlas.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
};
window.g_resCashRaceEnd = ResPack.create( 'resCashRaceEnd', resCashRaceEnd );



window.resBalancePanel = {
    PU_balancePnlUI_mb : 'PU_balancePnlUI_mb.ExportJson',
    PU_balancePnlAtlas_mb_plist : 'image/PU_balancePnlAtlas_mb.plist',
    PU_balancePnlAtlas_mb_png : 'image/PU_balancePnlAtlas_mb.png',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
};
window.g_resBalancePanel = ResPack.create('resBalancePanel', resBalancePanel);



window.resSlotMenuBase = {
    PU_betLockAR_mb : 'PU_betLockAR_mb.ExportJson',
    PU_linkPnlAR_mb : 'PU_linkPnlAR_mb.ExportJson',
    PU_linkPnlUI_mb : 'PU_linkPnlUI_mb.ExportJson',
    PU_WinPnlAR_mb : 'PU_WinPnlAR_mb.ExportJson',
    PU_WinPnlUI_mb : 'PU_WinPnlUI_mb.ExportJson',
    PU_notiAtlas_plist : 'image/PU_notiAtlas.plist',
    PU_notiAtlas_png : 'image/PU_notiAtlas.png',
    PU_linkPnlAtlas_mb_plist : 'image/PU_linkPnlAtlas_mb.plist',
    PU_linkPnlAtlas_mb_png : 'image/PU_linkPnlAtlas_mb.png',
    PU_cashFont01_mb_fnt : 'image/PU_cashFont01_mb.fnt',
    PU_cashFont01_mb_png : 'image/PU_cashFont01_mb.png',

    PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',
    SpinFx              : 'PU_newSlotMenuSpinHoldFxAR_mb.ExportJson',
};
window.g_resSlotMenuBase = ResPack.create( 'resSlotMenuBase', resSlotMenuBase ).concat(g_resBalancePanel);

window.resSlotMenuVIP = {
    VIPWheelChangeAR : 'vip_wheelChangeAR.ExportJson',
    PU_notiAtlas_plist : 'image/PU_notiAtlas.plist',
    PU_notiAtlas_png : 'image/PU_notiAtlas.png',
    vip_globalSlotAtlas_plist : 'image/vip_globalSlotAtlas.plist',
    vip_globalSlotAtlas_png : 'image/vip_globalSlotAtlas.png',
};
window.g_resSlotMenuVIP = ResPack.create( 'resSlotMenuVIP', resSlotMenuVIP );



window.resSlotMenuVegasClassic = {
    PU_newSlotMenuVegasUI_mb : 'PU_newSlotMenuVegasUI_mb.ExportJson',
    PU_newSlotMenuVegasUI_pad : 'PU_newSlotMenuVegasUI_pad.ExportJson',
    PU_newSlotMenuCVFreeSpinTotalAR_mb : 'PU_newSlotMenuCVFreeSpinTotalAR_mb.ExportJson',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    PU_newSlotMenuClassicAtlas_mb_plist : 'image/PU_newSlotMenuClassicAtlas_mb.plist',
    PU_newSlotMenuClassicAtlas_mb_png : 'image/PU_newSlotMenuClassicAtlas_mb.png',
    pu_smClassicFont01_fnt : 'image/pu_smClassicFont01.fnt',
    pu_smClassicFont01_png : 'image/pu_smClassicFont01.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
    PU_newSlotMenuClassicFxAtlas_mb_plist : 'image/PU_newSlotMenuClassicFxAtlas_mb.plist',
    PU_newSlotMenuClassicFxAtlas_mb_png : 'image/PU_newSlotMenuClassicFxAtlas_mb.png',
};
window.g_resSlotMenuVegasClassic = ResPack.create('resSlotMenuVegasClassic', resSlotMenuVegasClassic).concat(g_resSlotMenuBase);


window.resSlotMenuClassic = {
    PU_newSlotMenuClassicUI_mb : 'PU_newSlotMenuClassicUI_mb.ExportJson',
    PU_newSlotMenuClassicUI_pad : 'PU_newSlotMenuClassicUI_pad.ExportJson',
    PU_newSlotMenuCVFreeSpinTotalAR_mb : 'PU_newSlotMenuCVFreeSpinTotalAR_mb.ExportJson',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    PU_newSlotMenuClassicAtlas_mb_plist : 'image/PU_newSlotMenuClassicAtlas_mb.plist',
    PU_newSlotMenuClassicAtlas_mb_png : 'image/PU_newSlotMenuClassicAtlas_mb.png',
    pu_smClassicFont01_fnt : 'image/pu_smClassicFont01.fnt',
    pu_smClassicFont01_png : 'image/pu_smClassicFont01.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
    PU_newSlotMenuClassicFxAtlas_mb_plist : 'image/PU_newSlotMenuClassicFxAtlas_mb.plist',
    PU_newSlotMenuClassicFxAtlas_mb_png : 'image/PU_newSlotMenuClassicFxAtlas_mb.png',
};
window.g_resSlotMenuClassic = ResPack.create( 'resSlotMenuClassic', resSlotMenuClassic ).concat(g_resSlotMenuBase);


window.resSlotMenuVideo = {
    vip_newSlotMenuUI_mb : 'vip_newSlotMenuUI_mb.ExportJson',
    vip_newSlotMenuUI_pad : 'vip_newSlotMenuUI_pad.ExportJson',
    PU_newSlotMenuUI_mb : 'PU_newSlotMenuUI_mb.ExportJson',
    PU_newSlotMenuUI_pad : 'PU_newSlotMenuUI_pad.ExportJson',
    PU_newSlotMenuFreeSpinTotalAR_mb : 'PU_newSlotMenuFreeSpinTotalAR_mb.ExportJson',
    PU_newSlotMenuFreeSpinAddAR_mb : 'PU_newSlotMenuFreeSpinAddAR_mb.ExportJson',
    PU_newSlotMenuTotalFxAR : "PU_newSlotMenuTotalFxAR.ExportJson",
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    // PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    // PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',

    puCashFn_fnt                : 'image/puCashFn.fnt',
    puCashFn_png                : 'image/puCashFn.png',
    PU_common_redDot_font_fnt   : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png   : 'image/PU_common_redDot_font.png',
    vip_newSlotMenuAtlas_mb_plist : 'image/vip_newSlotMenuAtlas_mb.plist',
    vip_newSlotMenuAtlas_mb_png : 'image/vip_newSlotMenuAtlas_mb.png',
    PU_newSlotMenuAtlas_mb_plist : 'image/PU_newSlotMenuAtlas_mb.plist',
    PU_newSlotMenuAtlas_mb_png : 'image/PU_newSlotMenuAtlas_mb.png',

    SysNanumFon      		: 'image/sysNanumFon.fnt',
    SysNanumFon_png  		: 'image/sysNanumFon.png',
    PU_bonusWinPanelUI : 'PU_smBonusWinUI.ExportJson',
    PU_bonusWinPanelAR : 'PU_smBonusWinAR.ExportJson'
};
window.g_resSlotMenuVideo = ResPack.create( 'resSlotMenuVideo', resSlotMenuVideo ).concat(g_resSlotMenuBase);

window.resSlotMenuVertical = {
    PU_newSlotMenu_VerticalUI_mb        : 'PU_newSlotMenu_VerticalUI_mb.ExportJson',
    PU_newSlotMenu_VerticalAtlas_plist  : 'image/PU_newSlotMenu_VerticalAtlas.plist',
    PU_newSlotMenu_VerticalAtlas_png    : 'image/PU_newSlotMenu_VerticalAtlas.png',

    vip_newSlotMenu_VerticalUI_mb       : 'vip_newSlotMenu_VerticalUI_mb.ExportJson',
    vip_newSlotMenu_VerticalAtlas_plist : 'image/vip_newSlotMenu_VerticalAtlas.plist',
    vip_newSlotMenu_VerticalAtlas_png   : 'image/vip_newSlotMenu_VerticalAtlas.png',

    PU_newSlotMenuVerticalFxAtlas_mb_plist  : 'image/PU_newSlotMenuVerticalFxAtlas_mb.plist',
    PU_newSlotMenuVerticalFxAtlas_mb_png    : 'image/PU_newSlotMenuVerticalFxAtlas_mb.png',

    PU_VerticalSlotMenuFreeSpinTotalAR_mb    : 'PU_VerticalSlotMenuFreeSpinTotalAR_mb.ExportJson',
    PU_VerticalSlotMenuFreeSpinAddAR_mb      : 'PU_VerticalSlotMenuFreeSpinAddAR_mb.ExportJson',

    puCashFn_fnt                : 'image/puCashFn.fnt',
    puCashFn_png                : 'image/puCashFn.png',
    PU_common_redDot_font_fnt   : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png   : 'image/PU_common_redDot_font.png',

    // todo 삭제하는 방향으로 가이드 필요
    // PU_newSlotMenuFxAtlas_mb_plist  : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    // PU_newSlotMenuFxAtlas_mb_png    : 'image/PU_newSlotMenuFxAtlas_mb.png',
    PU_CubeIconAtlas_plist          : 'image/PU_CubeIconAtlas.plist',
    PU_CubeIconAtlas_png            : 'image/PU_CubeIconAtlas.png',

    PU_IconCube_Font01_fnt    : 'image/PU_IconCube_Font01.fnt',
    PU_IconCube_Font01_png    : 'image/PU_IconCube_Font01.png',
    PU_PopupCube_Font06_fnt   : 'image/PU_PopupCube_Font06.fnt',
    PU_PopupCube_Font06_png   : 'image/PU_PopupCube_Font06.png',

    // 확인 필요.
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png   : 'image/PU_newCoinAtlas_mb.png',
    SysNanumFon      		 : 'image/sysNanumFon.fnt',
    SysNanumFon_png  		 : 'image/sysNanumFon.png',

    PU_VerticalBonusWinUI : 'PU_VerticalBonusWinUI.ExportJson',
    PU_VerticalBonusWinAR : 'PU_VerticalBonusWinAR.ExportJson',
}

window.g_resSlotMenuVertical = ResPack.create( 'resSlotMenuVertical', resSlotMenuVertical ).concat(g_resSlotMenuBase);

window.resMoreKeno = {
    MoreKenoUI: 'k_puMoreKenoUI.ExportJson',
    MoreKenoBtnUI: 'k_puMoreKenoBtnUI.ExportJson',

    PU_newGotoAtlas_mb_plist : 'image/PU_newGotoAtlas_mb.plist',
    PU_newGotoAtlas_mb_png : 'image/PU_newGotoAtlas_mb.png'
};
window.g_resMoreKeno = ResPack.create('resMoreKeno', resMoreKeno);

window.resKenoSlotMenu = {
    newSlotMenuKenoUI_mb : "PU_newSlotMenuKenoUI_mb.ExportJson",
    newSlotMenuKenoUI_pad : "PU_newSlotMenuKenoUI_pad.ExportJson",
    FreeSpinTotalAR : "PU_newSlotMenuCVFreeSpinTotalAR_mb.ExportJson",

    PU_newSlotMenuClassicAtlas_mb_plist : 'image/PU_newSlotMenuClassicAtlas_mb.plist',
    PU_newSlotMenuClassicAtlas_mb_png : 'image/PU_newSlotMenuClassicAtlas_mb.png',
    PU_newSlotMenuKenoAtlas_mb_plist : "image/PU_newSlotMenuKenoAtlas_mb.plist",
    PU_newSlotMenuKenoAtlas_mb_png : "image/PU_newSlotMenuKenoAtlas_mb.png",
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    pu_smClassicFont01_fnt : 'image/pu_smClassicFont01.fnt',
    pu_smClassicFont01_png : 'image/pu_smClassicFont01.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',

    // SlotMenuUI: 'k_puSlotMenuUI.ExportJson',
    // slotMenuAtlas: 'image/k_puFrameAtlas.plist',
    // slotMenuAtlas_png: 'image/k_puFrameAtlas.png',
    slotMenuFont00: 'image/k_slotMenuFont01.fnt',
    slotMenuFont00_png: 'image/k_slotMenuFont01.png',
    // SysNanumFon      		: 'image/sysNanumFon.fnt',
    // SysNanumFon_png  		: 'image/sysNanumFon.png',
    // SysNanumFonS     		: 'image/sysNanumFonS.fnt',
    // SysNanumFonS_png 		: 'image/sysNanumFonS.png',

    TotalPayFont01         : 'image/k_puTotalPayFont01.fnt',
    TotalPayFont01_png     : 'image/k_puTotalPayFont01.png',

    TotalPayFont_cube     : 'image/c_puTotalPayFont02_KenoCube.fnt',       // for cube totalpay
    TotalPayFont_cube_png : 'image/c_puTotalPayFont02_KenoCube.png',
};
window.g_resKenoSlotMenu = ResPack.create( 'resKenoSlotMenu', resKenoSlotMenu ).concat(g_resSlotMenuBase);


window.resSlotMenuCrash = {
    vip_newSlotMenuUI_mb : 'vip_newSlotMenuCrashUI_mb.ExportJson',
    vip_newSlotMenuUI_pad : 'vip_newSlotMenuCrashUI_pad.ExportJson',
    PU_newSlotMenuUI_mb : 'PU_newSlotMenuCrashUI_mb.ExportJson',
    PU_newSlotMenuUI_pad : 'PU_newSlotMenuCrashUI_pad.ExportJson',
    PU_newSlotMenuFreeSpinTotalAR_mb : 'PU_newSlotMenuFreeSpinTotalAR_mb.ExportJson',
    PU_newSlotMenuFreeSpinAddAR_mb : 'PU_newSlotMenuFreeSpinAddAR_mb.ExportJson',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    // PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    // PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',

    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    puCrashMenuFn0_fnt : 'image/PU_newSlotMenuCrashFont1.fnt',
    puCrashMenuFn0_png : 'image/PU_newSlotMenuCrashFont1.png',
    puCrashMenuFn1_fnt : 'image/PU_newSlotMenuCrashFont2.fnt',
    puCrashMenuFn1_png : 'image/PU_newSlotMenuCrashFont2.png',
    puCrashMenuFn2_fnt : 'image/PU_newSlotMenuCrashFont3.fnt',
    puCrashMenuFn2_png : 'image/PU_newSlotMenuCrashFont3.png',


    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
    vip_newSlotMenuAtlas_mb_plist : 'image/vip_newSlotMenuAtlas_mb.plist',
    vip_newSlotMenuAtlas_mb_png : 'image/vip_newSlotMenuAtlas_mb.png',
    PU_newSlotMenuAtlas_mb_plist : 'image/PU_newSlotMenuAtlas_mb.plist',
    PU_newSlotMenuAtlas_mb_png : 'image/PU_newSlotMenuAtlas_mb.png',
    PU_newSlotMenuCrashAtlas_mb_plist : 'image/PU_newSlotMenuCrashAtlas_mb.plist',
    PU_newSlotMenuCrashAtlas_mb_png : 'image/PU_newSlotMenuCrashAtlas_mb.png'
};
window.g_resSlotMenuCrash = ResPack.create( 'resSlotMenuCrash', resSlotMenuCrash ).concat(g_resSlotMenuBase);



window.g_resSlotMenu = [];

window.resProfileInSlot = {
    PU_tutorialProfileUI_mb : 'PU_tutorialProfileUI_mb.ExportJson',
    PU_profileUI_InSlot_mb : 'PU_profileUI_InSlot_mb.ExportJson',
    PU_profileClassUpAR_mb : 'PU_profileClassUpAR_mb.ExportJson',
    PU_cashFont01_mb_fnt : 'image/PU_cashFont01_mb.fnt',
    PU_cashFont01_mb_png : 'image/PU_cashFont01_mb.png',

    PP_ToolTip_mb_plist     : "image/PP_ToolTip_mb.plist",
    PP_ToolTip_mb_png       : "image/PP_ToolTip_mb.png",
    LvlUpTooltipBGAR        : "PP_newToolTipAR01_mb.ExportJson",

};
window.g_resProfileInSlot = ResPack.create( 'resProfileInSlot', resProfileInSlot )

window.resCommonNavi = {
    GetCashAR : 'PU_getcashAR.ExportJson',
    ArriveCashAR : 'PU_newArrivecashAR_mb.ExportJson',

    PU_underCountUI_mb : 'PU_underCountUI_mb.ExportJson',
    PU_newSlotMenuClassicFxAtlas_mb_plist : 'image/PU_newSlotMenuClassicFxAtlas_mb.plist',
    PU_newSlotMenuClassicFxAtlas_mb_png : 'image/PU_newSlotMenuClassicFxAtlas_mb.png',

    LB_vipWheelEnterAR_mb : 'LB_vipWheelEnterAR_mb.ExportJson',

    PU_bigShopEnterAR_mb        : 'PU_bigShopEnterAR_mb.ExportJson',
    PU_bigShopCouponAR_mb       : 'PU_bigShopCouponAR_mb.ExportJson',
    PU_cvBigShopEnterAR_mb      : 'PU_cvBigShopEnterAR_mb.ExportJson',
    PU_VerticalShopEnterAR_mb   : 'PU_VerticalShopEnterAR_mb.ExportJson',

    vRotExtremePoint_plist   : 'image/vRotExtremePoint.plist',
    vRotExtremePoint_png     : 'image/vRotExtremePoint.png',

    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',

    PU_newSlotMenuCouponAtlas_mb_plist  : 'image/PU_newSlotMenuCouponAtlas_mb.plist',
    PU_newSlotMenuCouponAtlas_mb_png    : 'image/PU_newSlotMenuCouponAtlas_mb.png',

    PU_bigShopEnterFxAR_mb : 'PU_bigShopEnterFxAR_mb.ExportJson', //25.02.04 안쓰는것 같음

    PU_commonTimer_font01_fnt : "image/PU_commonTimer_font01.fnt",
    PU_commonTimer_font01_png : "image/PU_commonTimer_font01.png"
};

window.g_resCommonNavi = ResPack.create( 'resCommonNavi', resCommonNavi );

//로비용 (NavigationMenuLobby에서 사용하는 리소스)
window.resNewTopHud_Mobile  = {

    turboAtlas_plist : 'image/LB_turboItemAtlas_mb.plist',
    turboAtlas_png : 'image/LB_turboItemAtlas_mb.png',

    LB_vipFreePassAR_mb : 'LB_vipFreePassAR_mb.ExportJson',
    PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',

    PU_newSlotMenuAtlas_mb_plist        : 'image/PU_newSlotMenuAtlas_mb.plist',
    PU_newSlotMenuAtlas_mb_png          : 'image/PU_newSlotMenuAtlas_mb.png',
    LB_mainAtlas_mb_plist               : 'image/LB_mainAtlas_mb.plist',
    LB_mainAtlas_mb_png                 : 'image/LB_mainAtlas_mb.png',
    LB_vipFreePassAtlas_mb_plist        : 'image/LB_vipFreePassAtlas_mb.plist',
    LB_vipFreePassAtlas_mb_png          : 'image/LB_vipFreePassAtlas_mb.png',
    LobbyADAtlas			            : 'image/PU_newLobbyAdAtlas_mb.plist',
    LobbyADAtlas_png			        : 'image/PU_newLobbyAdAtlas_mb.png',
    LB_Icon_BHubAR_mb                   : 'LB_Icon_BHubAR_mb.ExportJson',
    PU_BHubTooltipAtlas_plist           : "image/PU_BHubTooltipAtlas.plist",
    PU_BHubTooltipAtlas_png             : "image/PU_BHubTooltipAtlas.png",
    LB_Icon_BHubTooltipAR               : "LB_Icon_BHubTooltipAR.ExportJson"
};

window.g_resNewTopHud_Mobile = ResPack.create( 'resNewTopHud_Mobile', resNewTopHud_Mobile ).concat(g_resCommonNavi);

//슬롯용 (NavigationMenuSlot에서 사용하는 리소스)
window.resNewTopHud_Slot  = {
    PU_newSlotMenuVerticalFxAtlas_mb_plist  : 'image/PU_newSlotMenuVerticalFxAtlas_mb.plist',
    PU_newSlotMenuVerticalFxAtlas_mb_png    : 'image/PU_newSlotMenuVerticalFxAtlas_mb.png',

    PU_backBtnUI_mb : 'PU_backBtnUI_mb.ExportJson',

    PU_cvBigShopEnterFxAR_mb : 'PU_cvBigShopEnterFxAR_mb.ExportJson',

    PU_stateAtlas_mb_plist : 'image/PU_stateAtlas_mb.plist',
    PU_stateAtlas_mb_png : 'image/PU_stateAtlas_mb.png',
};
window.g_resNewTopHud_Slot = ResPack.create( 'resNewTopHud_Slot', resNewTopHud_Slot ).concat(g_resCommonNavi);;


window.resSystemIcon = {
    PU_inGameIconListUI : 'PU_inGameIconListUI.ExportJson',
    PU_lobbyIconListUI : 'PU_lobbyIconListUI.ExportJson',
    PU_inGameIconList_backUI : 'PU_inGameIconList_backUI.ExportJson',
    PU_inGameIconList_plist : 'image/PU_inGameIconList.plist',
    PU_inGameIconList_png : 'image/PU_inGameIconList.png'
};
window.g_resSystemIcon = ResPack.create('resSystemIcon', resSystemIcon);



/**
 * new lobby
 */
//라운지이동시 엘레베이터 연출 리소스
window.resLoungeElevator = {
    LB_vipElevatorAR_mb : 'LB_vipElevatorAR_mb.ExportJson',
    LB_vipElevatorLoadingAR_mb : 'LB_vipElevatorLoadingAR_mb.ExportJson',
    LB_vipElevatorAtlas_mb_plist : 'image/LB_vipElevatorAtlas_mb.plist',
    LB_vipElevatorAtlas_mb_png : 'image/LB_vipElevatorAtlas_mb.png',
    vipElevatorClose	: 'sfx/lounge_Common/vipElevatorClose.mp3',
    vipElevatorUp		: 'sfx/lounge_Common/vipElevatorUp.mp3',
};
window.g_resLoungeElevator = ResPack.create('resLoungeElevator', resLoungeElevator);

//로비 사이드 메뉴
window.resSideMenuLobby = {
    MenuUI : 'PU_newMenuUI_mb.ExportJson',

    PU_chatBotTooltipAtlas_plist : 'image/PU_chatBotTooltipAtlas.plist',
    PU_chatBotTooltipAtlas_png : 'image/PU_chatBotTooltipAtlas.png',
    PU_chatBotTooltipUI : 'PU_chatBotTooltipUI.ExportJson',

    PU_newMenuAtlas_mb_plist : 'image/PU_newMenuAtlas_mb.plist',
    PU_newMenuAtlas_mb_png : 'image/PU_newMenuAtlas_mb.png',
    pu_lobbyBlurBase : 'image/pu_lobbyBlurBase.png',

    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
};
window.g_resSideMenuLobby = ResPack.create('resSideMenuLobby', resSideMenuLobby);

//라운지 사이드 메뉴
window.resSideMenuLounge = {

    PU_chatBotTooltipAtlas_plist : 'image/PU_chatBotTooltipAtlas.plist',
    PU_chatBotTooltipAtlas_png : 'image/PU_chatBotTooltipAtlas.png',
    PU_chatBotTooltipUI : 'PU_chatBotTooltipUI.ExportJson',

    MenuUI : 'vip_newMenuUI_mb.ExportJson',
    vip_newMenuAskTipAR_mb : 'vip_newMenuAskTipAR_mb.ExportJson',
    vip_newMenuAskTipUI_mb : 'vip_newMenuAskTipUI_mb.ExportJson',
    vip_newMenuAtlas_mb_plist : 'image/vip_newMenuAtlas_mb.plist',
    vip_newMenuAtlas_mb_png : 'image/vip_newMenuAtlas_mb.png',
    pu_lobbyBlurBase : 'image/pu_lobbyBlurBase.png',

    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',

};
window.g_resSideMenuLounge = ResPack.create('resSideMenuLounge', resSideMenuLounge);

window.resLobbyTopMenu = {
    LB_topMenuUI_mb : 'LB_topMenuUI_mb.ExportJson',
    LB_topMenuLoungeAR_mb : 'LB_topMenuLoungeAR_mb.ExportJson',
    vip_topMenuLobbyUI_mb : 'vip_topMenuLobbyUI_mb.ExportJson',
    LB_mainAtlas_mb_plist : 'image/LB_mainAtlas_mb.plist',
    LB_mainAtlas_mb_png : 'image/LB_mainAtlas_mb.png',
    vip_mainAtlas_mb_plist : 'image/vip_mainAtlas_mb.plist',
    vip_mainAtlas_mb_png : 'image/vip_mainAtlas_mb.png',

    PU_LobbyGotMailTooltipAtlas_plist : 'image/PU_LobbyGotMailTooltipAtlas.plist',
    PU_LobbyGotMailTooltipAtlas_png   : 'image/PU_LobbyGotMailTooltipAtlas.png',
    PU_LobbyGotMailTooltipAR_mb      : 'PU_LobbyGotMailTooltipAR_mb.ExportJson',

    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
};
window.g_resLobbyTopMenu = ResPack.create('resLobbyTopMenu', resLobbyTopMenu);


//로비 메뉴
window.resMenuLayerLobby = {
    LB_navigationMenuUI_mb : 'LB_navigationMenuUI_mb.ExportJson',
    LB_navigationMenuUI_pad : 'LB_navigationMenuUI_pad.ExportJson',
    LB_mainMenuAR_mb : 'LB_mainMenuAR_mb.ExportJson',
    LB_mainAtlas_mb_plist : 'image/LB_mainAtlas_mb.plist',
    LB_mainAtlas_mb_png : 'image/LB_mainAtlas_mb.png',
    PP_vipExclusiveEnterAtlas_plist : 'image/PP_vipExclusiveEnterAtlas.plist',
    PP_vipExclusiveEnterAtlas_png   : 'image/PP_vipExclusiveEnterAtlas.png',
    PU_cashFont01_mb_fnt : 'image/PU_cashFont01_mb.fnt',
    PU_cashFont01_mb_png : 'image/PU_cashFont01_mb.png',
    PU_freePassAtlas_mb_plist : 'image/PU_freePassAtlas_mb.plist',
    PU_freePassAtlas_mb_png : 'image/PU_freePassAtlas_mb.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    PU_newSlotMenuAtlas_mb_plist : 'image/PU_newSlotMenuAtlas_mb.plist',
    PU_newSlotMenuAtlas_mb_png : 'image/PU_newSlotMenuAtlas_mb.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
    PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',

    // left menu
    LB_sideTabAtlas_plist   : "image/LB_sideTabAtlas.plist",
    LB_sideTabAtlas_png     : "image/LB_sideTabAtlas.png",
    LB_favorites_iconUI     : "LB_favorites_iconUI.ExportJson",
    LB_favorites_iconAR     : "LB_favorites_iconAR.ExportJson",
    LB_sideTabUI            : "LB_sideTabUI.ExportJson",
    LB_sideTabAR            : "LB_sideTabBtnAR.ExportJson",

    // favorite 사운드
    openfav_mp3             : 'sfx/global_Common/openfav.mp3',
    addfav_mp3              : 'sfx/global_Common/addfav.mp3',
    unaddfav_mp3            : 'sfx/global_Common/unaddfav.mp3'

};
window.g_resMenuLayerLobby = ResPack.create('resMenuLayerLobby', resMenuLayerLobby).concat( g_resLobbyTopMenu, g_resBalancePanel,  g_resNewTopHud_Mobile, g_resSystemIcon);

//라운지 메뉴
window.resMenuLayerLounge = {
    vip_navigationMenuUI_mb : 'vip_navigationMenuUI_mb.ExportJson',
    vip_navigationMenuUI_pad : 'vip_navigationMenuUI_pad.ExportJson',
    LB_mainMenuAR_mb : 'LB_mainMenuAR_mb.ExportJson',
    LB_mainAtlas_mb_plist : 'image/LB_mainAtlas_mb.plist',
    LB_mainAtlas_mb_png : 'image/LB_mainAtlas_mb.png',
    PP_vipExclusiveEnterAtlas_plist : 'image/PP_vipExclusiveEnterAtlas.plist',
    PP_vipExclusiveEnterAtlas_png   : 'image/PP_vipExclusiveEnterAtlas.png',
    PU_cashFont01_mb_fnt : 'image/PU_cashFont01_mb.fnt',
    PU_cashFont01_mb_png : 'image/PU_cashFont01_mb.png',
    PU_freePassAtlas_mb_plist : 'image/PU_freePassAtlas_mb.plist',
    PU_freePassAtlas_mb_png : 'image/PU_freePassAtlas_mb.png',
    PU_classImgAtlas_plist : 'image/PU_classImgAtlas.plist',
    PU_classImgAtlas_png : 'image/PU_classImgAtlas.png',
    PU_newCoinAtlas_mb_plist : 'image/PU_newCoinAtlas_mb.plist',
    PU_newCoinAtlas_mb_png : 'image/PU_newCoinAtlas_mb.png',
    puCashFn_fnt : 'image/puCashFn.fnt',
    puCashFn_png : 'image/puCashFn.png',
    PU_common_redDot_font_fnt : 'image/PU_common_redDot_font.fnt',
    PU_common_redDot_font_png : 'image/PU_common_redDot_font.png',
    vip_newSlotMenuAtlas_mb_plist : 'image/vip_newSlotMenuAtlas_mb.plist',
    vip_newSlotMenuAtlas_mb_png : 'image/vip_newSlotMenuAtlas_mb.png',
    PU_newSlotMenuFxAtlas_mb_plist : 'image/PU_newSlotMenuFxAtlas_mb.plist',
    PU_newSlotMenuFxAtlas_mb_png : 'image/PU_newSlotMenuFxAtlas_mb.png',


    // left menu
    LB_sideTabAtlas_plist   : "image/LB_sideTabAtlas.plist",
    LB_sideTabAtlas_png     : "image/LB_sideTabAtlas.png",
    LB_favorites_iconUI     : "LB_favorites_iconUI.ExportJson",
    LB_favorites_iconAR     : "LB_favorites_iconAR.ExportJson",
    LB_sideTabUI            : "LB_sideTabUI.ExportJson",
    LB_sideTabAR            : "LB_sideTabBtnAR.ExportJson"
};
window.g_resMenuLayerLounge = ResPack.create('resMenuLayerLounge', resMenuLayerLounge).concat( g_resLobbyTopMenu, g_resBalancePanel, g_resNewTopHud_Mobile, g_resSystemIcon);


window.resBackgroundLobby = {
    LB_lobbyBgAR_mb : 'LB_lobbyBgAR_mb.ExportJson',
    LB_newMainLobbyAtlas_mb_plist : 'image/LB_newMainLobbyAtlas_mb.plist',
    LB_newMainLobbyAtlas_mb_png : 'image/LB_newMainLobbyAtlas_mb.png',
    LB_newMainLobbyBgAtlas_mb_plist : 'image/LB_newMainLobbyBgAtlas_mb.plist',
    LB_newMainLobbyBgAtlas_mb_png : 'image/LB_newMainLobbyBgAtlas_mb.png',
    LB_BGSkinLeft : 'image/LB_mbBG_01.png',
    LB_BGSkinRight : 'image/LB_mbBG_02.png',
    LB_BGSkinTopLeft : 'image/LB_mbBG_03.png',
    LB_BGSkinTopRight : 'image/LB_mbBG_04.png'
};
window.g_resBackgroundLobby = ResPack.create('resBackgroundLobby', resBackgroundLobby);

window.resBackgroundLounge = {
    vip_loungeBgAR_mb : 'vip_loungeBgAR_mb.ExportJson',
    vip_jackpotWheelAR_mb : 'vip_jackpotWheelAR_mb.ExportJson',
    LB_newMainLobbyAtlas_mb_plist : 'image/LB_newMainLobbyAtlas_mb.plist',
    LB_newMainLobbyAtlas_mb_png : 'image/LB_newMainLobbyAtlas_mb.png',
    vip_globalAtlas_plist : 'image/vip_globalAtlas.plist',
    vip_globalAtlas_png : 'image/vip_globalAtlas.png',
    vip_newMainLoungeBgAtlas_mb_plist : 'image/vip_newMainLoungeBgAtlas_mb.plist',
    vip_newMainLoungeBgAtlas_mb_png : 'image/vip_newMainLoungeBgAtlas_mb.png',
    LB_BGSkinLeft : 'image/LB_mbBG_01.png',
    LB_BGSkinRight : 'image/LB_mbBG_02.png',
    LB_BGSkinTopLeft : 'image/LB_mbBG_03.png',
    LB_BGSkinTopRight : 'image/LB_mbBG_04.png'
};
window.g_resBackgroundLounge = ResPack.create('resBackgroundLounge', resBackgroundLounge);

window.resLobbySlotEntryList = {
    PU_scrollButtonUI_mb : 'PU_scrollButtonUI_mb.ExportJson',
    PU_pageFont01_mb_fnt : 'image/PU_pageFont01_mb.fnt',
    PU_pageFont01_mb_png : 'image/PU_pageFont01_mb.png',
    PU_scrollButtonAtlas_mb_plist : 'image/PU_scrollButtonAtlas_mb.plist',
    PU_scrollButtonAtlas_mb_png : 'image/PU_scrollButtonAtlas_mb.png',
    PU_BannerRemainingTimeFont_fnt : 'image/PU_BannerRemainingTimeFont.fnt',
    PU_BannerRemainingTimeFont_png : 'image/PU_BannerRemainingTimeFont.png'
};

window.g_resLobbySlotEntryList = ResPack.create('resLobbySlotEntryList', resLobbySlotEntryList);


window.resLoungeSlotEntryList = {
    PU_scrollButtonUI_mb : 'PU_scrollButtonUI_mb.ExportJson',
    PU_pageFont01_mb_fnt : 'image/PU_pageFont01_mb.fnt',
    PU_pageFont01_mb_png : 'image/PU_pageFont01_mb.png',
    PU_scrollButtonAtlas_mb_plist : 'image/PU_scrollButtonAtlas_mb.plist',
    PU_scrollButtonAtlas_mb_png : 'image/PU_scrollButtonAtlas_mb.png',
    PU_BannerRemainingTimeFont_fnt : 'image/PU_BannerRemainingTimeFont.fnt',
    PU_BannerRemainingTimeFont_png : 'image/PU_BannerRemainingTimeFont.png'
};
window.g_resLoungeSlotEntryList = ResPack.create('resLoungeSlotEntryList', resLoungeSlotEntryList);

window.resADBanner = {
    PU_newLobbyAdFxAR_mb : 'PU_newLobbyAdFxAR_mb.ExportJson',
    PU_newLobbyAdAtlas_mb_plist : 'image/PU_newLobbyAdAtlas_mb.plist',
    PU_newLobbyAdAtlas_mb_png : 'image/PU_newLobbyAdAtlas_mb.png',
};
window.g_resADBanner = ResPack.create('resADBanner', resADBanner);

window.resBroadCastLobby = {
    LB_broadBoardAR_mb : 'LB_broadBoardAR_mb.ExportJson',
    LB_broadBoardUI_mb : 'LB_broadBoardUI_mb.ExportJson',
    LB_broadBoardFxAR_mb : 'LB_broadBoardFxAR_mb.ExportJson',
    LB_broadBoardFx02AR_mb : 'LB_broadBoardFx02AR_mb.ExportJson',
    LB_broadBoardAtlas_mb_plist : 'image/LB_broadBoardAtlas_mb.plist',
    LB_broadBoardAtlas_mb_png : 'image/LB_broadBoardAtlas_mb.png',
    LB_broadBoardFont01_fnt : 'image/LB_broadBoardFont01.fnt',
    LB_broadBoardFont01_png : 'image/LB_broadBoardFont01.png',
    vRotCoin_plist : 'image/vRotCoin.plist',
    vRotCoin_png : 'image/vRotCoin.png',
};
window.g_resBroadCastLobby = ResPack.create('resBroadCastLobby', resBroadCastLobby);

window.resClassicVegasLobby = {
    c_lobbyBgAR_mb : 'c_lobbyBgAR_mb.ExportJson',
    c_lobbyAtlas_mb_plist : 'image/c_lobbyAtlas_mb.plist',
    c_lobbyAtlas_mb_png : 'image/c_lobbyAtlas_mb.png',
    LB_newMainLobbyAtlas_mb_plist : 'image/LB_newMainLobbyAtlas_mb.plist',
    LB_newMainLobbyAtlas_mb_png : 'image/LB_newMainLobbyAtlas_mb.png',
    VegasLobbyMenu_plist	: 'image/c_lbNewMainAtlas_mb.plist',
    VegasLobbyMenu_png		: 'image/c_lbNewMainAtlas_mb.png',
};
window.g_resClassicVegasLobby = ResPack.create('resClassicVegasLobby', resClassicVegasLobby);
window.resClassicVegasLounge = {
    c_loungeBgAR_mb : 'c_loungeBgAR_mb.ExportJson',
    c_LoungeAtlas_mb_plist : 'image/c_LoungeAtlas_mb.plist',
    c_LoungeAtlas_mb_png : 'image/c_LoungeAtlas_mb.png',
    LB_newMainLobbyAtlas_mb_plist : 'image/LB_newMainLobbyAtlas_mb.plist',
    LB_newMainLobbyAtlas_mb_png : 'image/LB_newMainLobbyAtlas_mb.png',
    VegasLobbyMenu_plist	: 'image/c_lbNewMainAtlas_mb.plist',
    VegasLobbyMenu_png		: 'image/c_lbNewMainAtlas_mb.png',
};
window.g_resClassicVegasLounge = ResPack.create('resClassicVegasLounge', resClassicVegasLounge);



window.resNewLobby = {
    c_lbNewEntryAR_mb : 'c_lbNewEntryAR_mb.ExportJson',
    vip_newJackpotNotiAR_mb : 'vip_newJackpotNotiAR_mb.ExportJson',
    vip_newJackpotNotiUI_mb : 'vip_newJackpotNotiUI_mb.ExportJson',
    c_lbNewEntryAtlas_mb_plist : 'image/c_lbNewEntryAtlas_mb.plist',
    c_lbNewEntryAtlas_mb_png : 'image/c_lbNewEntryAtlas_mb.png',
    vip_newJackpotNotiAtlas_mb_plist : 'image/vip_newJackpotNotiAtlas_mb.plist',
    vip_newJackpotNotiAtlas_mb_png : 'image/vip_newJackpotNotiAtlas_mb.png',
    vip_font01_mb_fnt : 'image/vip_font01_mb.fnt',
    vip_font01_mb_png : 'image/vip_font01_mb.png',
    NEW_genieGuideAtlas_mb_plist : 'image/NEW_genieGuideAtlas_mb.plist',
    NEW_genieGuideAtlas_mb_png : 'image/NEW_genieGuideAtlas_mb.png',

    PU_FeedBackAR : 'PU_FeedBackAR.ExportJson',
    PU_notiAtlas_plist : 'image/PU_notiAtlas.plist',
    PU_notiAtlas_png : 'image/PU_notiAtlas.png',

    MiniCountFont        : 'image/vip_miniCountFont01.fnt',
    MiniCountFont_png    : 'image/vip_miniCountFont01.png',
};

window.g_resNewLobby_Mobile = ResPack.create( 'resNewLobby', resNewLobby ).concat( g_resGlobalCommon, g_resClassicVegasLobby, g_resBroadCastLobby, g_resADBanner, g_resLobbySlotEntryList, g_resBackgroundLobby, g_resMenuLayerLobby, g_resSlotEntries, g_resNewTopHud_Mobile );

window.g_resNewLobby_Lounge = ResPack.create( 'resNewLobby', resNewLobby ).concat( g_resGlobalCommon, g_resMenuLayerLounge,g_resClassicVegasLounge, g_resBroadCastLobby, g_resADBanner, g_resLoungeSlotEntryList, g_resBackgroundLounge, g_resSlotEntries,  g_resNewTopHud_Mobile );

window.resChatbotGuidePopup = {

    PP_chatBotGuideAtlas_plist : 'image/PP_chatBotGuideAtlas.plist',
    PP_chatBotGuideAtlas_png : 'image/PP_chatBotGuideAtlas.png',
    PP_chatBotGuideUI : 'PP_chatBotGuideUI.ExportJson',

    PP_newBaseFxAtlas_plist : 'image/PP_newBaseFxAtlas.plist',
    PP_newBaseFxAtlas_png : 'image/PP_newBaseFxAtlas.png',

}

window.g_resChatbotGuidePopup = ResPack.create('resChatbotGuidePopup', resChatbotGuidePopup);