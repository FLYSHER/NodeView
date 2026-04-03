//######################################################################################################################
/**
 * global common
 */
window.globalCommon      = {
    Click                : 'sfx/global_Common/btnClick.mp3',
    Close                : 'sfx/global_Common/btnClickClose.mp3',
    CashCount            : 'sfx/global_Common/cashCount.mp3',
    GetReward            : 'sfx/global_Common/getBonus.mp3',
    MouseOverShop        : 'sfx/global_Common/mouseOverShop.mp3',
    MouseOverBonus       : 'sfx/global_Common/mouseOverBonus.mp3',
    MouseOverEtc         : 'sfx/global_Common/mouseOverEtc.mp3',
    MouseOver            : 'sfx/global_Common/mouseOver.mp3',

    CashRaceRewardPop    : 'sfx/global_Common/CashRaceReward.mp3',

    OpenPopup            : 'sfx/global_Common/OpenPopup.mp3',
    VipGiftPopup         : 'sfx/global_Common/vipGiftPopup.mp3',


    // new Lobby 신규
    PageScroll		     : 'sfx/global_Common/pageScroll.mp3',
    UIAppear 			 : 'sfx/global_Common/uiAppear.mp3',

    newUserBGM           : 'sfx/global_Common/newUserLoading.mp3',

    CountingFlash           : 'sfx/global_Common/countingflash.mp3',

    LevelupPopup:  "sfx/global_Common/NewLevelup.mp3",

    pickSlide : 'sfx/global_Common/pickslide.mp3',

    temporaryPopup  : 'sfx/global_Common/TemporaryPopup.mp3',
    temporaryPopup2 : 'sfx/global_Common/TemporaryPopup02.mp3',
    temporarySfx    : 'sfx/global_Common/TemporarySfx.mp3',

    newVipGift           :  "sfx/global_Common/newVipGift.mp3",
    newGiftChoice        : "sfx/global_Common/newGiftChoice.mp3",

    GingerMail           : "sfx/global_Common/GingerMail.mp3",

    couponOff            : 'sfx/global_Common/CouponOff.mp3',

    // Cube
    CubePopup : 'sfx/global_Common/CubePopup.mp3', // 큐브 팝업 등장 시
    CubeTrail01 : 'sfx/global_Common/CubeTrail01.mp3', // 팝업 하단으로 트레일 (deprecated)
    CubeTrail02 : 'sfx/global_Common/CubeTrail02.mp3', // 아이콘으로 트레일
    CubeDecline : 'sfx/global_Common/CubeDecline.mp3', // 미수령해서 사라질 때
    GetCrystal : 'sfx/global_Common/GetCrystal.mp3', // 크리스탈 획득 트레일 시
    CrystalShop : 'sfx/global_Common/CrystalShop.mp3', // 큐브 팝업에서 > 크리스탈 샾 진입 시
    CubeOpen : 'sfx/global_Common/CubeOpen.mp3', // 큐브 오픈 연출 시( 결과 팝업 )
    GetAward02 : 'sfx/global_Common/GetAward02.mp3', // 결과 팝업에서 코인 카운팅
    GetAward01 : 'sfx/global_Common/GetAward01.mp3', // 코인 이외의 보상 연출
    CubeTuto01 : 'sfx/global_Common/CubeTuto01.mp3', // 튜토리얼 BGM
    CubeTuto02 : 'sfx/global_Common/CubeTuto02.mp3', // 튜토 중 손가락 움직이는 연출 시
    CubeClick : 'sfx/global_Common/CubeClick.mp3', // 큐브 아이콘 및 큐브 상자 클릭 시

    // VIP Special
    VipSpecial : 'sfx/global_Common/VipSpecial.mp3',

    RushTrail : 'sfx/global_Common/RushTrail.mp3',

    // weeklyClash
    ClashNoti : 'sfx/global_Common/ClashNoti.mp3',
    ClashPodium : 'sfx/global_Common/ClashPodium.mp3',
    ClashPodiumStrap : 'sfx/global_Common/ClashPodiumStrap.mp3',
    ClashReport : 'sfx/global_Common/ClashReport.mp3',
};
window.g_sfxGlobalCommon = ResPack.create( 'globalCommon', globalCommon );

//######################################################################################################################
window.loungeCommon      = {
    ClassBenefitApplyMulti : 'sfx/lounge_Common/cgBenefitMulti.mp3',
    ClassBenefitChip       : 'sfx/lounge_Common/cgBenefitChip.mp3',

    VCLobby                 : 'sfx/lounge_Common/vcLobby01.mp3', // 'sfx/lounge_Common/vcLobby01.mp3',  @BJ 할로윈 배경으로 우회 파일 추가 하나로 로비 라운지 같이 사용
    VCLounge                : 'sfx/lounge_Common/vcLobby01.mp3', // 'sfx/lounge_Common/vcLobby01.mp3',

    ThreeDaysBonus : 'sfx/lounge_Common/EasterEvent3DaysBonus.mp3',

    EventCouponGet : 'sfx/lounge_Common/BlackCouponTrail.mp3',

    LobbyJackpot		: 'sfx/lounge_Common/lobbyJackpot.mp3',

    CommonPopup : 'sfx/lounge_Common/CommonPopup.mp3'

};
window.g_sfxLoungeCommon = ResPack.create( 'loungeCommon', loungeCommon );

window.lounge      = {
    BGM: 'sfx/lounge/lobbyBGM.mp3', // 'sfx/lounge/lobbyBGM.mp3',
    VipLoungeOver : 'sfx/lounge/LoungeOver.mp3'
};
window.g_sfxLounge = ResPack.create( 'lounge', lounge ).concat( g_sfxLoungeCommon ).concat( g_sfxGlobalCommon );

window.vipLounge      = {
    BGM: 'sfx/vipLounge/LoungeBgm.mp3', // 'sfx/vipLounge/LoungeBgm.mp3',
    WelcomeVipBGM : 'sfx/vipLounge/WelcomeVipBgm.mp3'
};
window.g_sfxVipLounge = ResPack.create( 'vipLounge', vipLounge ).concat( g_sfxLoungeCommon ).concat( g_sfxGlobalCommon );

//######################################################################################################################
/**
 * slot common sound
 */
//@BJ 20180212
    // sdButton.mp3 지운 json 파일
    // classicSlots.json, esterJackpot.json, shining.json
window.slotCommon      = {
        BroadWin         : 'sfx/slot_Common/broadWin.mp3',
        FeedLike         : 'sfx/slot_Common/broadLike.mp3',
        WinMultiply      : 'sfx/slot_Common/multiply.mp3',
        payTableClick    : 'sfx/slot_Common/payTableClick.mp3',
        JackpotCount     : 'sfx/slot_Common/jackpotCount.mp3',
        JackpotPop       : 'sfx/slot_Common/jackpot.mp3',
        BigWin           : 'sfx/slot_Common/bigWin.mp3',
        SuperWin         : 'sfx/slot_Common/superWin.mp3',
        MegaWin          : 'sfx/slot_Common/megaWin.mp3',
        EpicWin          : 'sfx/slot_Common/epicWin.mp3',
        MajorWin         : 'sfx/slot_Common/majorWin.mp3',
        MajorWinEnd      : 'sfx/slot_Common/majorWinEnd.mp3',
        VipWheelChange   : 'sfx/slot_Common/vipwheelChange.mp3',
        ComboButtonClick : 'sfx/slot_Common/comboButtonClick.mp3',
        SlotButton       : 'sfx/slot_Common/slotMenuBtn.mp3', //'sfx/slot/sd/sdButton.mp3', @BJ 20180212
        ChangeBetHigh    : 'sfx/slot_Common/IntroBet01.mp3',
        ChangeBetLow     : 'sfx/slot_Common/IntroBet02.mp3',
        EventMissionUIClear : 'sfx/slot_Common/MissionGauge.mp3',
        EnableSuperRichBet : 'sfx/slot_Common/superRichActivated.mp3',
        // OpenSuperRichBetUI : 'sfx/slot_Common/superRichBetIntro.mp3', //21.07.14 배팅테이블 삭제로 사운드 주석처리

        LevelupStart: 'sfx/slot_Common/MultiLevelUpStart.mp3',
        LevelupLoop: 'sfx/slot_Common/MultiLevelUpLoop.mp3',
        LevelupEnd: 'sfx/slot_Common/MultiLevelUpEnd.mp3',

        FiveBonusOpen: 'sfx/slot_Common/5lvbonus.mp3',

        offerSpinIntroPopup : 'sfx/slot_Common/SlotOfferIntro.mp3',
        SpinHold : 'sfx/slot_Common/SpinHold.mp3',


    };
window.g_sfxSlotCommon = ResPack.create( 'slotCommon', slotCommon ).concat( g_sfxGlobalCommon );

/**
 * BACK TO SEVENTY
 */
window.sound70s   = {
    Spin              : 'sfx/slot/70S/70S_spin.mp3',
    BGM               : 'sfx/slot/70S/70S_city.mp3',
    Intro             : 'sfx/slot/70S/70S_intro.mp3',
    Reel              : 'sfx/slot/70S/70S_reel.mp3',
    ReelStop          : 'sfx/slot/70S/70S_reelstop.mp3',
    Wild              : 'sfx/slot/70S/70S_wild.mp3',
    ScatterLock01     : 'sfx/slot/70S/70s_scatter_01.mp3',
    ScatterLock02     : 'sfx/slot/70S/70s_scatter_02.mp3',
    ScatterLock03     : 'sfx/slot/70S/70s_scatter_03.mp3',
    BonusLock01       : 'sfx/slot/70S/70S_bonus_locking1.mp3',
    BonusLock02       : 'sfx/slot/70S/70S_bonus_locking2.mp3',
    BonusLock03       : 'sfx/slot/70S/70S_bonus_locking3.mp3',
    LongSpin          : 'sfx/slot/70S/70S_bonus_long_spin_edit.mp3',
    Major_astro       : 'sfx/slot/70S/70S_mj_astro.mp3',
    Major_james_dean  : 'sfx/slot/70S/70S_mj_men.mp3',
    Major_afro        : 'sfx/slot/70S/70S_mj_afro.mp3',
    Major_peace       : 'sfx/slot/70S/70S_mj_nowar.mp3',
    Major_roller_girl : 'sfx/slot/70S/70S_mj_roller.mp3',
    TotalPay01        : 'sfx/slot/70S/70S_totalpay_1.mp3',
    TotalPay02        : 'sfx/slot/70S/70S_totalpay_2.mp3',
    TotalPay03        : 'sfx/slot/70S/70S_totalpay_3.mp3',
    FreeSpinBGM       : 'sfx/slot/70S/70S_freespin.mp3',
    FreeSpinResult    : 'sfx/slot/70S/70S_freespinresult.mp3',
    BonusSpawn        : 'sfx/slot/70S/70S_BonusIntro.mp3',
    BonusResult       : 'sfx/slot/70S/70S_BonusResult.mp3',
    AnnounceMent      : 'sfx/slot/70S/70S_ment.mp3',
    BonusPick01       : 'sfx/slot/70S/70S_ding_f.mp3',
    BonusPick02       : 'sfx/slot/70S/70S_ding_flute.mp3',
    BonusPick03       : 'sfx/slot/70S/70S_ding-dong_flute.mp3',
    BonusInside       : 'sfx/slot/70S/70S_bonus_inside.mp3'
};
window.g_sound70s = ResPack.create( 'sound70s', sound70s ).concat( g_sfxSlotCommon );

/**
 * SHOPAHOLIC
 */
window.soundSH   = {
    StartSpin      : 'sfx/slot/SH/sh_spin.mp3',
    BGM            : 'sfx/slot/SH/sh_In_the_Groove.mp3',
    Women_Walking  : 'sfx/slot/SH/sh_high_heel_shoes_new.mp3',
    Dog_Walking    : 'sfx/slot/SH/sh_dog_shake_barking.mp3',
    Reel           : 'sfx/slot/SH/sh_reel.mp3',
    ReelStop       : 'sfx/slot/SH/sh_reelstop.mp3',
    Bonus_Locking1 : 'sfx/slot/SH/sh_Bonus_Locking1.mp3',
    Bonus_Locking2 : 'sfx/slot/SH/sh_Bonus_Locking2.mp3',
    Bonus_Locking3 : 'sfx/slot/SH/sh_Bonus_Locking3.mp3',
    TotalPay01     : 'sfx/slot/SH/sh_TotalPay1.mp3',
    TotalPay02     : 'sfx/slot/SH/sh_TotalPay2.mp3',
    TotalPay03     : 'sfx/slot/SH/sh_TotalPay3.mp3',
    WildFlip       : 'sfx/slot/SH/sh_wild.mp3',
    WildSticky     : 'sfx/slot/SH/sh_kiss.mp3',
    WildMultiple   : 'sfx/slot/SH/sh_small_dogs_x2_barking_001.mp3',
    LongSpin       : 'sfx/slot/SH/sh_longspin.mp3',
    BonusBGM       : 'sfx/slot/SH/sh_Groove.mp3',
    BonusResultBGM : 'sfx/slot/SH/sh_BonusResult.mp3',
    MatchSuit      : 'sfx/slot/SH/sh_BonusSuit.mp3'
};
window.g_soundSH = ResPack.create( 'soundSH', soundSH ).concat( g_sfxSlotCommon );

/**
 * CLEOPATRA
 */
window.soundCP   = {
    Spin           : 'sfx/slot/CP/cp_Spin.mp3',
    Bgm            : 'sfx/slot/CP/cp_Bgm.mp3',
    Intro          : 'sfx/slot/CP/cp_Intro.mp3',
    Reel           : 'sfx/slot/CP/cp_Reel.mp3',
    ReelStop       : 'sfx/slot/CP/cp_ReelStop.mp3',
    LongSpin       : 'sfx/slot/CP/cp_LongSpin.mp3',
    BonusSymbol    : 'sfx/slot/CP/cp_BonusSymbol.mp3',
    TotalPay1      : 'sfx/slot/CP/cp_TotalPay1.mp3',
    TotalPay2      : 'sfx/slot/CP/cp_TotalPay2.mp3',
    TotalPay3      : 'sfx/slot/CP/cp_TotalPay3.mp3',
    PayCp          : 'sfx/slot/CP/cp_PayCp.mp3',
    PayCs          : 'sfx/slot/CP/cp_PayCs.mp3',
    PaySp          : 'sfx/slot/CP/cp_PaySp.mp3',
    PaySc          : 'sfx/slot/CP/cp_PaySc.mp3',
    PayWild        : 'sfx/slot/CP/cp_PayWild.mp3',
    BonusBgm       : 'sfx/slot/CP/cp_BonusBgm.mp3',
    BonusIntro     : 'sfx/slot/CP/cp_BonusIntro.mp3',
    BonusExtend    : 'sfx/slot/CP/cp_BonusExtend.mp3',
    BonusPick      : 'sfx/slot/CP/cp_BonusPick.mp3',
    BonusResult    : 'sfx/slot/CP/cp_BonusResult.mp3',
    FreespinReel   : 'sfx/slot/CP/cp_FreespinReel.mp3',
    FreespinNoti   : 'sfx/slot/CP/cp_FreespinNoti.mp3',
    FreespinGlow   : 'sfx/slot/CP/cp_FreespinGlow.mp3',
    FreespinResult : 'sfx/slot/CP/cp_FreespinResult.mp3'
};
window.g_soundCP = ResPack.create( 'soundCP', soundCP ).concat( g_sfxSlotCommon );

/**
 * HALLOWEEN MANSION
 */
window.soundHM   = {
    Spin         : 'sfx/slot/HM/hm_Spin.mp3',
    Bgm          : 'sfx/slot/HM/hm_Bgm.mp3',
    Intro        : 'sfx/slot/HM/hm_Intro.mp3',
    Reel         : 'sfx/slot/HM/hm_Reel.mp3',
    ReelStop     : 'sfx/slot/HM/hm_ReelStop.mp3',
    Wild         : 'sfx/slot/HM/hm_Wild.mp3',
    WildExpand   : 'sfx/slot/HM/hm_WildExpand.mp3',
    LongSpin     : 'sfx/slot/HM/hm_LongSpin.mp3',
    Bonus        : 'sfx/slot/HM/hm_bonus.mp3',
    BonusMatch   : 'sfx/slot/HM/hm_BonusMatch.mp3',
    Totalpay1    : 'sfx/slot/HM/hm_Totalpay1.mp3',
    Totalpay2    : 'sfx/slot/HM/hm_TotalPay2.mp3',
    Totalpay3    : 'sfx/slot/HM/hm_TotalPay3.mp3',
    PayPumpkin   : 'sfx/slot/HM/hm_Pumpkin.mp3',
    PayDracula   : 'sfx/slot/HM/hm_dracula.mp3',
    PayMummy     : 'sfx/slot/HM/hm_mummy.mp3',
    PayWolf      : 'sfx/slot/HM/hm_wolf.mp3',
    BonusIntro   : 'sfx/slot/HM/hm_BonusIntro.mp3',
    BonusReel    : 'sfx/slot/HM/hm_BonusReel.mp3',
    BonusResult  : 'sfx/slot/HM/hm_BonusResult.mp3',
    BonusSkel    : 'sfx/slot/HM/hm_BonusSkel.mp3',
    BonusPumpkin : 'sfx/slot/HM/hm_BonusPumpkin.mp3',
    BonusPlus    : 'sfx/slot/HM/hm_Bonusplus.mp3',
    BonusSkelIn1 : 'sfx/slot/HM/hm_BonusSkelIn1.mp3'
};
window.g_soundHM = ResPack.create( 'soundHM', soundHM ).concat( g_sfxSlotCommon );

/**
 * MAD SPIN
 */
window.soundMS   = {
    SpinClick            : 'sfx/slot/MS/ms_Toaster_Push_Mechanism.mp3',
    BGM                  : 'sfx/slot/MS/ms_mainbgm.mp3',
    ReelStart            : 'sfx/slot/MS/ms_reel.mp3',
    ReelStop             : 'sfx/slot/MS/ms_reel_stop.mp3',
    Wild                 : 'sfx/slot/MS/ms_Wild.mp3',
    ScatterLock01        : 'sfx/slot/MS/ms_scat_lock01.mp3',
    ScatterLock02        : 'sfx/slot/MS/ms_scat_lock02.mp3',
    ScatterLock03        : 'sfx/slot/MS/ms_scat_lock03.mp3',
    BonusLock01          : 'sfx/slot/MS/ms_bonuslock_01.mp3',
    BonusLock02          : 'sfx/slot/MS/ms_bonuslock_02.mp3',
    BonusLock03          : 'sfx/slot/MS/ms_bonuslock_03.mp3',
    LongSpin             : 'sfx/slot/MS/ms_long_spin.mp3',
    HatSymbolMatch       : 'sfx/slot/MS/ms_majorhat_money.mp3',
    TurntableSymbolMatch : 'sfx/slot/MS/ms_major_turntable.mp3',
    SpraySymbolMatch     : 'sfx/slot/MS/ms_major_spray.mp3',
    HandsSymbolMatch     : 'sfx/slot/MS/ms_major_hands.mp3',
    SpeakerSymbolMatch   : 'sfx/slot/MS/ms_majorsymbol_audio_cut.mp3',
    TotalPay01           : 'sfx/slot/MS/ms_TotalPay1.mp3',
    TotalPay02           : 'sfx/slot/MS/ms_TotalPay2.mp3',
    TotalPay03           : 'sfx/slot/MS/ms_TotalPay3.mp3',
    FreeSpinning         : 'sfx/slot/MS/ms_bonusreel.mp3',
    FreeSpinConfirm      : 'sfx/slot/MS/ms_FreespinConfirm.mp3',
    SkateBoardPick       : 'sfx/slot/MS/ms_skate_pick.mp3',
    FreeSpinResult       : 'sfx/slot/MS/ms_FreeSpinResults.mp3',
    BonusResult          : 'sfx/slot/MS/ms_BonusResult.mp3',
    SelectBall           : 'sfx/slot/MS/ms_choose_ball.mp3',
    IntoBasket           : 'sfx/slot/MS/ms_drawlingball_goalin.mp3',
    DrawBall             : 'sfx/slot/MS/ms_drawingball.mp3',
    GoalIn               : 'sfx/slot/MS/ms_drawlingball_goalin_cheer.mp3',
    NoGoal               : 'sfx/slot/MS/ms_drawlingball_nogoalin_disa.mp3'
};
window.g_soundMS = ResPack.create( 'soundMS', soundMS ).concat( g_sfxSlotCommon );

/**
 * BATTLE FRONT
 */
window.soundBF   = {
    Spin             : 'sfx/slot/BF/bf_Spin.mp3',
    Bgm              : 'sfx/slot/BF/bf_BGM.mp3',
    Intro            : 'sfx/slot/BF/bf_intro.mp3',
    Reel             : 'sfx/slot/BF/bf_Reel.mp3',
    ReelStop         : 'sfx/slot/BF/bf_ReelStop.mp3',
    WildMatch        : 'sfx/slot/BF/bf_Wild.mp3',
    KingFull         : 'sfx/slot/BF/bf_KingFull.mp3',
    LongSpin         : 'sfx/slot/BF/bf_LongSpin.mp3',
    PayBrownshY      : 'sfx/slot/BF/bf_PayBrownshY.mp3',
    PayArmyshY       : 'sfx/slot/BF/bf_PayArmyshY.mp3',
    PayRobotY        : 'sfx/slot/BF/bf_PayRobotY.mp3',
    PayGreyshB       : 'sfx/slot/BF/bf_PayGreyshB.mp3',
    PayBlueshB       : 'sfx/slot/BF/bf_PayBlueshB.mp3',
    PayTankB         : 'sfx/slot/BF/bf_PayTankB.mp3',
    TotalPay1        : 'sfx/slot/BF/bf_TotalPay1.mp3',
    TotalPay2        : 'sfx/slot/BF/bf_TotalPay2.mp3',
    TotalPay3        : 'sfx/slot/BF/bf_TotalPay3.mp3',
    LockingBarMoving : 'sfx/slot/BF/bf_LockingBarMoving.mp3',
    BonusReel        : 'sfx/slot/BF/bf_BonusReel.mp3',
    Explosion        : 'sfx/slot/BF/bf_Explosion.mp3',
    FrameLocking     : 'sfx/slot/BF/bf_FrameLocking.mp3',
    FrameMovingOut   : 'sfx/slot/BF/bf_FrameMovingOut.mp3',
    BonusKingGun     : 'sfx/slot/BF/bf_BonusKingGun.mp3',
    KingLaser        : 'sfx/slot/BF/bf_KingLaser.mp3',
    KingYDie         : 'sfx/slot/BF/bf_KingYDie.mp3',
    KingBDie         : 'sfx/slot/BF/bf_KingBDie.mp3',
    Nuclear          : 'sfx/slot/BF/bf_Nuclear.mp3',
    PickLayerOpen    : 'sfx/slot/BF/bf_PickLayerOpen.mp3',
    PickLayerText    : 'sfx/slot/BF/bf_PickLayerText.mp3',
    PlaneComing      : 'sfx/slot/BF/bf_PlaneComing.mp3',
    War              : 'sfx/slot/BF/bf_War.mp3',
    WinningResult    : 'sfx/slot/BF/bf_WinningResult.mp3'
};
window.g_soundBF = ResPack.create( 'soundBF', soundBF ).concat( g_sfxSlotCommon );

/**
 * Hansel and Gretel
 */
window.soundHG   = {
    Spin           : 'sfx/slot/HG/hgSpin.mp3',
    Bgm            : 'sfx/slot/HG/hgBgm.mp3',
    Reel           : 'sfx/slot/HG/hgReel.mp3',
    ReelStop       : 'sfx/slot/HG/hgReelStop.mp3',
    WildMatch      : 'sfx/slot/HG/hgWild.mp3',
    PayHansel      : 'sfx/slot/HG/hgMjHs.mp3',
    PayGretel      : 'sfx/slot/HG/hgMjGt.mp3',
    PayWitch       : 'sfx/slot/HG/hgMjWc.mp3',
    PayGingerBread : 'sfx/slot/HG/hgMjGb.mp3',
    ScatterLock01  : 'sfx/slot/HG/hgScatterLocking1.mp3',
    ScatterLock02  : 'sfx/slot/HG/hgScatterLocking2.mp3',
    ScatterLock03  : 'sfx/slot/HG/hgScatterLocking3.mp3',
    BonusLock01    : 'sfx/slot/HG/hgBonusLocking.mp3',
    TotalPay1      : 'sfx/slot/HG/hgTotalPay1.mp3',
    TotalPay2      : 'sfx/slot/HG/hgTotalPay2.mp3',
    TotalPay3      : 'sfx/slot/HG/hgTotalPay3.mp3',
    LongSpin       : 'sfx/slot/HG/hgLongspin.mp3',
    FSBgm          : 'sfx/slot/HG/hgFsBgm.mp3',
    FSIntro        : 'sfx/slot/HG/hgFsIntro.mp3',
    FSTrigger      : 'sfx/slot/HG/hgFsTrigger.mp3',
    FSChange       : 'sfx/slot/HG/hgFsChange.mp3',
    FSResult       : 'sfx/slot/HG/hgFsResult.mp3',
    BoIntro1       : 'sfx/slot/HG/hgBoIntro1.mp3',
    BoIntro2       : 'sfx/slot/HG/hgBoIntro2.mp3',
    BoHsGrSymbol   : 'sfx/slot/HG/hgBoHsGrSymbol.mp3',
    BoHsGrMove     : 'sfx/slot/HG/hgBoHsGrMove.mp3',
    BoWcSymbol     : 'sfx/slot/HG/hgBoWcSymbol.mp3',
    BoWcMove       : 'sfx/slot/HG/hgBoWcMove.mp3',
    BoFail         : 'sfx/slot/HG/hgBoFail.mp3',
    BoResult       : 'sfx/slot/HG/hgBoResult.mp3',
    BoBgm          : 'sfx/slot/HG/hgBoBgm.mp3',
    BoPoint        : 'sfx/slot/HG/hgBoPoint.mp3',
    BoCount        : 'sfx/slot/HG/hgBoCount.mp3',
    BoArrival      : 'sfx/slot/HG/hgBoArrival.mp3',
    BoHome         : 'sfx/slot/HG/hgBoHome.mp3'
};
window.g_soundHG = ResPack.create( 'soundHG', soundHG ).concat( g_sfxSlotCommon );

/**
 * Jackpot City
 */
window.soundJackpotCity   = {
    Spin             : 'sfx/slot/jc/jcSpin.mp3',
    Bgm              : 'sfx/slot/jc/jcBgm.mp3',
    ReelStop         : 'sfx/slot/jc/jcReelStop.mp3',
    ScatterLocking01 : 'sfx/slot/jc/jcScatterLocking1.mp3',
    ScatterLocking02 : 'sfx/slot/jc/jcScatterLocking2.mp3',
    ScatterLocking03 : 'sfx/slot/jc/jcScatterLocking3.mp3',
    ScatterMatching  : 'sfx/slot/jc/jcScatterMatch.mp3',
    LongSpin         : 'sfx/slot/jc/jcLongspin.mp3',

    LinePay       : 'sfx/slot/jc/jcLinePay.mp3',
    Line          : 'sfx/slot/jc/jcLine.mp3',
    MajorWinEnter : 'sfx/slot/jc/jcExplode.mp3',
    TotalPay01    : 'sfx/slot/jc/jcTotalPay1.mp3',
    TotalPay02    : 'sfx/slot/jc/jcTotalPay2.mp3',
    TotalPay03    : 'sfx/slot/jc/jcTotalPay3.mp3',

    FreeSpinBGM    : 'sfx/slot/jc/jcFsBgm.mp3',
    FreeSpinResult : 'sfx/slot/jc/jcFsResult.mp3'
};
window.g_soundJackpotCity = ResPack.create( 'soundJackpotCity', soundJackpotCity ).concat( g_sfxSlotCommon );

/**
 * Queens Age
 */
window.sndQueensAge = {
    Spin           : 'sfx/slot/QA/qaSpin.mp3',
    BGM            : 'sfx/slot/QA/qaBgm.mp3',
    ReelStop       : 'sfx/slot/QA/qaReelStop.mp3',
    ScatterLock01  : 'sfx/slot/QA/qaScatterLocking1.mp3',
    ScatterLock02  : 'sfx/slot/QA/qaScatterLocking2.mp3',
    ScatterLock03  : 'sfx/slot/QA/qaScatterLocking3.mp3',
    ScatterPay     : 'sfx/slot/QA/qaScatterMatch.mp3',
    LongSpin       : 'sfx/slot/QA/qaLongspin.mp3',
    LinePay        : 'sfx/slot/QA/qaLinepay.mp3',
    WildLock       : 'sfx/slot/QA/qaWildLock.mp3',
    TotalPay1      : 'sfx/slot/QA/qaTotalPay1.mp3',
    TotalPay2      : 'sfx/slot/QA/qaTotalPay2.mp3',
    TotalPay3      : 'sfx/slot/QA/qaTotalPay3.mp3',
    FreespinWin    : 'sfx/slot/QA/qaFswon.mp3',
    FreeSpinBGM    : 'sfx/slot/QA/qaFsBgm.mp3',
    FreeSpinEntry  : 'sfx/slot/QA/qaFsIntro.mp3',
    DoubleOrNotBGM : 'sfx/slot/QA/qaDnBgm.mp3',
    CardOver       : 'sfx/slot/QA/qaDnCardOver.mp3',
    CardClick      : 'sfx/slot/QA/qaDnCardClick.mp3',
    WinDouble      : 'sfx/slot/QA/qaDnDouble.mp3',
    DefeatDouble   : 'sfx/slot/QA/qaDnNothing.mp3',
    ResultBGM      : 'sfx/slot/QA/qaFsResult.mp3'
};
window.g_sndQueensAge = ResPack.create( 'sndQueensAge', sndQueensAge ).concat( g_sfxSlotCommon );

/**
 * El Dorado
 */
window.sndEldorado = {
    Spin          : 'sfx/slot/el/elSpin.mp3',
    Reel1         : 'sfx/slot/el/elReel1.mp3',
    Reel2         : 'sfx/slot/el/elReel2.mp3',
    Reel3         : 'sfx/slot/el/elReel3.mp3',
    ReelStop      : 'sfx/slot/el/elReelStop.mp3',
    ScatterLock01 : 'sfx/slot/el/elScatterLocking1.mp3',
    ScatterLock02 : 'sfx/slot/el/elScatterLocking2.mp3',
    ScatterLock03 : 'sfx/slot/el/elScatterLocking3.mp3',
    ScatterWild   : 'sfx/slot/el/elScatterWild.mp3',
    ScatterMatch  : 'sfx/slot/el/elScatterMatch.mp3',
    LongSpin      : 'sfx/slot/el/elLongspin.mp3',
    LinePay       : 'sfx/slot/el/elLinepay.mp3',
    TotalPay1     : 'sfx/slot/el/elTotalPay1.mp3',
    TotalPay2     : 'sfx/slot/el/elTotalPay2.mp3',
    TotalPay3     : 'sfx/slot/el/elTotalPay3.mp3',
    FreeSpinBGM   : 'sfx/slot/el/elFsBgm.mp3',
    WildLock      : 'sfx/slot/el/elFsfWildLock.mp3',
    ResultBGM     : 'sfx/slot/el/elFsResult.mp3'
};
window.g_sndEldorado = ResPack.create( 'sndEldorado', sndEldorado ).concat( g_sfxSlotCommon );

/**
 * Shining Diamonds
 */
window.sndShining = {
    Spin          : 'sfx/slot/sd/sdSpin.mp3',
    BGM           : 'sfx/slot/sd/sdBgm.mp3',
    //Button        : 'sfx/slot/sd/sdButton.mp3', @BJ 20180212
    Reel1         : 'sfx/slot/sd/sdReel.mp3',
    Reel2         : 'sfx/slot/sd/sdReel2.mp3',
    Reel3         : 'sfx/slot/sd/sdReel3.mp3',
    ReelStop      : 'sfx/slot/sd/sdReelStop.mp3',
    ScatterLock01 : 'sfx/slot/sd/sdScatterLocking1.mp3',
    ScatterLock02 : 'sfx/slot/sd/sdScatterLocking2.mp3',
    ScatterLock03 : 'sfx/slot/sd/sdScatterLocking3.mp3',
    ScatterMatch  : 'sfx/slot/sd/sdScatterMatch.mp3',
    LongSpin      : 'sfx/slot/sd/sdLongspin.mp3',
    DiaLock       : 'sfx/slot/sd/sdDia.mp3',
    TotalPay      : 'sfx/slot/sd/sdTotalpay.mp3',
    Jackpot       : 'sfx/slot/sd/sdJackpot.mp3',
    JackpotCount  : 'sfx/slot/sd/sdJackpotCount.mp3',
    FreeSpinBGM   : 'sfx/slot/sd/sdFsBgm.mp3',
    ResultBGM     : 'sfx/slot/sd/sdFsResult.mp3'
    //Welcome       : 'sfx/slot_Common/welcome.mp3' //'sfx/slot/sd/welcome.mp3'

};
window.g_sndShining = ResPack.create( 'sndShining', sndShining ).concat( g_sfxSlotCommon );

/**
 * Western Wilds
 */
window.sndWesternWild = {
    Button       : 'sfx/slot/ww/wwButton.mp3',
    FsBgm        : 'sfx/slot/ww/wwFsBgm.mp3',
    FsReel       : 'sfx/slot/ww/wwFsReel.mp3',
    FsResult     : 'sfx/slot/ww/wwFsResult.mp3',
    FsTrain      : 'sfx/slot/ww/wwFsTrain.mp3',
    Intro        : 'sfx/slot/ww/wwIntro.mp3',
    Jackpot      : 'sfx/slot/ww/wwJackpot.mp3',
    Longspin     : 'sfx/slot/ww/wwLonspin.mp3',
    Multiply     : 'sfx/slot/ww/wwMultiply.mp3',
    Reel         : 'sfx/slot/ww/wwReel.mp3',
    ReelStop     : 'sfx/slot/ww/wwReelStop.mp3',
    ScatterLock1 : 'sfx/slot/ww/wwScatterLocking1.mp3',
    ScatterLock2 : 'sfx/slot/ww/wwScatterLocking2.mp3',
    ScatterLock3 : 'sfx/slot/ww/wwScatterLocking3.mp3',
    ScatterMatch : 'sfx/slot/ww/wwScatterMatch.mp3',
    Spin         : 'sfx/slot/ww/wwSpin.mp3',
    TotalPay     : 'sfx/slot/ww/wwTotalPay.mp3',
    JackpotCount : 'sfx/slot/ww/wwJackpotCount.mp3',
    MultiPly1    : 'sfx/slot/ww/wwMultiply.mp3',
    MultiPly2    : 'sfx/slot/ww/wwMultiply2.mp3',
    MultiPly3    : 'sfx/slot/ww/wwMultiply3.mp3'

};
window.g_sndWesternWild = ResPack.create( 'sndWesternWild', sndWesternWild ).concat( g_sfxSlotCommon );

/**
 * Fortune pot
 */
window.sndFortune = {
    Spin              : 'sfx/slot/fp/fpSpin.mp3',
    Intro             : 'sfx/slot/fp/fpIntro.mp3',
    ReelStop          : 'sfx/slot/fp/fpReelStop.mp3',
    ScatterLocking1   : 'sfx/slot/fp/fpScatterLocking1.mp3',
    ScatterLocking2   : 'sfx/slot/fp/fpScatterLocking2.mp3',
    ScatterLocking3   : 'sfx/slot/fp/fpScatterLocking3.mp3',
    ScatterMatch      : 'sfx/slot/fp/fpScatterMatch.mp3',
    Longspin          : 'sfx/slot/fp/fpLongspin.mp3',
    TotalPay1         : 'sfx/slot/fp/fpTotalPay.mp3',
    TotalPay2         : 'sfx/slot/fp/fpTotalPay2.mp3',
    TotalPay3         : 'sfx/slot/fp/fpTotalPay3.mp3',
    Wild              : 'sfx/slot/fp/fpWild.mp3',
    BonusIntro        : 'sfx/slot/fp/fpBoIntro.mp3',
    BonusPick         : 'sfx/slot/fp/fpBoPick.mp3',
    BonusMatch        : 'sfx/slot/fp/fpBoMatch.mp3',
    BonusJackpotCount : 'sfx/slot/fp/fpBoJackpotCount.mp3',
    BonusJackpot      : 'sfx/slot/fp/fpBoJackpot.mp3',
    FreeSpinBgm       : 'sfx/slot/fp/fpFsBgm.mp3',
    FreeSpinsResult   : 'sfx/slot/fp/fpFsResult.mp3',
    MajorWinPay	      : 'sfx/slot/fp/fpMPayCount.mp3'
};
window.g_sndFortune = ResPack.create( 'sndFortune', sndFortune ).concat( g_sfxSlotCommon );

/**
 * Wheel Of Jackpot
 */
window.sndWheelOfJackpot = {
    Bgm             : 'sfx/slot/wj/wjBgm.mp3',
    BonusIntro      : 'sfx/slot/wj/wjBoIntro.mp3',
    JackpotResult   : 'sfx/slot/wj/wjBoJackpotResult.mp3',
    BonusReady      : 'sfx/slot/wj/wjBoReady.mp3',
    BonusResult     : 'sfx/slot/wj/wjBoResult.mp3',
    LongSpin        : 'sfx/slot/wj/wjLongspin.mp3',
    Reel            : 'sfx/slot/wj/wjReel.mp3',
    ReelStop        : 'sfx/slot/wj/wjReelStop.mp3',
    ScatterLocking1 : 'sfx/slot/wj/wjScatterLocking1.mp3',
    ScatterLocking2 : 'sfx/slot/wj/wjScatterLocking2.mp3',
    ScatterLocking3 : 'sfx/slot/wj/wjScatterLocking3.mp3',
    ScatterMatch    : 'sfx/slot/wj/wjScatterMatch.mp3',
    Spin            : 'sfx/slot/wj/wjSpin.mp3',
    TotalPay        : 'sfx/slot/wj/wjTotalPay.mp3'
};
window.g_sndWheelOfJackpot = ResPack.create( 'sndWheelOfJackpot', sndWheelOfJackpot ).concat( g_sfxSlotCommon );

/**
 * Wheel Of Jackpot2 - Double Seven
 */
window.sndWj2DoubleSeven = {
    Bgm           : 'sfx/slot/wj2/wj2Bgm.mp3',
    BonusIntro    : 'sfx/slot/wj2/wj2BoIntro.mp3',
    BonusSpinning : 'sfx/slot/wj2/wj2BoWheel.mp3',
    BonusReady    : 'sfx/slot/wj2/wj2BoReady.mp3',
    BonusStop     : 'sfx/slot/wj2/wj2BoStop.mp3',
    BonusResult   : 'sfx/slot/wj2/wj2BoResult.mp3',
    JackpotResult : 'sfx/slot/wj2/wj2BoJackpotResult.mp3',
    Reel          : 'sfx/slot/wj2/wj2Reel.mp3',
    ReelStop      : 'sfx/slot/wj2/wj2ReelStop.mp3',
    WildLocking   : 'sfx/slot/wj2/wj2WildLocking.mp3',
    SpinLocking   : 'sfx/slot/wj2/wj2BonusLocking.mp3',
    SpinMatch     : 'sfx/slot/wj2/wj2BonusMatch.mp3',      // ScatterMatch
    Spin          : 'sfx/slot/wj2/wj2Spin.mp3',
    TotalPay      : 'sfx/slot/wj2/wj2TotalPay.mp3'
};
window.g_sndWj2DoubleSeven = ResPack.create( 'sndWj2DoubleSeven', sndWj2DoubleSeven ).concat( g_sfxSlotCommon );

/**
 * Golden Sheep
 */
window.sndGoldenSheep = {
    FsBgm         : 'sfx/slot/gs/gsFsBgm.mp3',
    FsJackpotLock : 'sfx/slot/gs/gsFsJackpotLocking.mp3',
    FsResult      : 'sfx/slot/gs/gsFsResult.mp3',
    Spin          : 'sfx/slot/gs/gsSpin.mp3',
    Reel          : 'sfx/slot/gs/gsNReel.mp3',
    ReelStop      : 'sfx/slot/gs/gsNReelStop.mp3',
    ExReel        : 'sfx/slot/gs/gsEReel.mp3',
    ExReelHit     : 'sfx/slot/gs/gsEReelHit.mp3',
    ExReelLock    : 'sfx/slot/gs/gsEReelLocking.mp3',
    JackpotLock   : 'sfx/slot/gs/gsJackpotLocking.mp3',
    JackpotResult : 'sfx/slot/gs/gsJackpotResult.mp3',
    ScatterChange : 'sfx/slot/gs/gsScatterChange.mp3',
    MajorWin      : 'sfx/slot/gs/gsMajorWin.mp3',
    MTotalPay     : 'sfx/slot/gs/gsMTotalPay.mp3',
    TotalPay      : 'sfx/slot/gs/gsTotalPay.mp3'
};
window.g_sndGoldenSheep = ResPack.create( 'sndGoldenSheep', sndGoldenSheep ).concat( g_sfxSlotCommon );

/**
 * Easter Jackpot
 */
window.sndEasterJackpot = {
    Spin          : 'sfx/slot/ej/ejSpin.mp3',
    BGM           : 'sfx/slot/ej/ejBgm.mp3',
    //Button        : 'sfx/slot/sd/sdButton.mp3', @BJ 20180212
    Reel1         : 'sfx/slot/ej/ejReel.mp3',
    ReelStop      : 'sfx/slot/ej/ejReelStop.mp3',
    ScatterLock01 : 'sfx/slot/ej/ejScatterLocking01.mp3',
    ScatterLock02 : 'sfx/slot/ej/ejScatterLocking02.mp3',
    ScatterLock03 : 'sfx/slot/ej/ejScatterLocking03.mp3',
    ScatterMatch  : 'sfx/slot/ej/ejScatterMatch.mp3',
    LongSpin      : 'sfx/slot/ej/ejLongspin.mp3',
    DiaLock       : 'sfx/slot/ej/ejEggLocking.mp3',
    TotalPay      : 'sfx/slot/ej/ejTotalPay.mp3',
    Jackpot       : 'sfx/slot/ej/ejJackpotResult.mp3',
    JackpotCount  : 'sfx/slot/ej/ejJackpotPayCount.mp3',
    FreeSpinBGM   : 'sfx/slot/ej/ejFsBgm.mp3',
    ResultBGM     : 'sfx/slot/ej/ejFsResult.mp3',
    FSChoose      : 'sfx/slot/ej/ejFsChoose.mp3',
    FSPick        : 'sfx/slot/ej/ejFsPick.mp3',
    FSOver        : 'sfx/slot/ej/ejFsOver.mp3',
    Multi         : 'sfx/slot/ej/ejMulti.mp3'
};
window.g_sndEasterJackpot = ResPack.create( 'sndEasterJackpot', sndEasterJackpot ).concat( g_sfxSlotCommon );

/**
 * Fishing Master
 */
window.sndFishingMaster = {
    Spin                       : 'sfx/slot/fm/fmSpin.mp3',
    Reel01                     : 'sfx/slot/fm/fmReel.mp3',
    Reel02                     : 'sfx/slot/fm/fmReel2.mp3',
    Reel03                     : 'sfx/slot/fm/fmReel3.mp3',
    ReelStop                   : 'sfx/slot/fm/fmReelStop.mp3',
    ScatterLock01              : 'sfx/slot/fm/fmScatterLocking1.mp3',
    ScatterLock02              : 'sfx/slot/fm/fmScatterLocking2.mp3',
    ScatterLock03              : 'sfx/slot/fm/fmScatterLocking3.mp3',
    LongSpin                   : 'sfx/slot/fm/fmLongspin.mp3',
    BonusSymbolMatch           : 'sfx/slot/fm/fmScatterMatch.mp3',
    OverLayCollect             : 'sfx/slot/fm/fmOverlayCollect.mp3',
    TotalPay                   : 'sfx/slot/fm/fmTotalpay.mp3',
    FreeSpinBgm01              : 'sfx/slot/fm/fmFsBgm01.mp3',
    FreeSpinBgm02              : 'sfx/slot/fm/fmFsBgm02.mp3',
    FreeSpinResult             : 'sfx/slot/fm/fmFsResult.mp3',
    FreeSpinStart              : 'sfx/slot/fm/fmFsPopupAppear.mp3',
    FreeSpinRemainLabelCount01 : 'sfx/slot/fm/fmFsCountReset01.mp3',
    FreeSpinRemainLabelCount02 : 'sfx/slot/fm/fmFsCountReset02.mp3',
    NormalBonusGameBgm         : 'sfx/slot/fm/fmBoBgm.mp3',
    FishFight                  : 'sfx/slot/fm/fmBoFishing.mp3',
    BonusResult                : 'sfx/slot/fm/fmBoResult.mp3',
    BonusPopup                 : 'sfx/slot/fm/fmJackpotResult.mp3'
};
window.g_sndFishingMaster = ResPack.create( 'sndFishingMaster', sndFishingMaster ).concat( g_sfxSlotCommon );

/**
 * Fiery 7
 */
window.sndFiery7 = {
    Spin           : 'sfx/slot/f7/f7Btn.mp3',
    Reel1          : 'sfx/slot/f7/f7Reel01.mp3',
    Reel2          : 'sfx/slot/f7/f7Reel02.mp3',
    Reel3          : 'sfx/slot/f7/f7Reel03.mp3',
    ReelStop       : 'sfx/slot/f7/f7ReelStop.mp3',
    ScatterLock01  : 'sfx/slot/sd/sdScatterLocking1.mp3',
    ScatterLock02  : 'sfx/slot/sd/sdScatterLocking2.mp3',
    ScatterLock03  : 'sfx/slot/sd/sdScatterLocking3.mp3',
    NudgeLight     : 'sfx/slot/f7/f7NudgeLight.mp3',
    NudgeLocking   : 'sfx/slot/f7/f7NudgeLocking.mp3',
    NudgeSpin      : 'sfx/slot/f7/f7NudgeSpin.mp3',
    NormalLongSpin : 'sfx/slot/f7/f7NLongspin.mp3',
    // LongSpinLeft               : 'sfx/slot/f7/f7LongspinLeft.mp3',
    // LongSpinRight              : 'sfx/slot/f7/f7LongspinRight.mp3',
    FieryLongSpin  : 'sfx/slot/f7/f7FLongspin.mp3',
    SevenLocking   : 'sfx/slot/f7/f7SevenLocking.mp3',
    TotalPay       : 'sfx/slot/f7/f7Totalpay.mp3',
    Bgm            : 'sfx/slot/f7/f7Bgm.mp3',
    JackpotResult  : 'sfx/slot/f7/f7JackpotResult.mp3',
    ScatterBgm     : 'sfx/slot/f7/f7ScatterBgm.mp3',
    Intro          : 'sfx/slot/f7/f7Intro.mp3',
    JackpotPay     : 'sfx/slot/f7/f7Jackpotpay.mp3',
    MajorWinPay    : 'sfx/slot/f7/f7MajorWin.mp3'
};
window.g_sndFiery7 = ResPack.create( 'sndFiery7', sndFiery7 ).concat( g_sfxSlotCommon );

/**
 * Flaming Star
 */
window.sndFlamingStar = {
    Reel1          : 'sfx/slot/fs/fsReel01.mp3',
    Reel2          : 'sfx/slot/fs/fsReel02.mp3',
    Reel3          : 'sfx/slot/fs/fsReel03.mp3',
    ReelStop       : 'sfx/slot/fs/fsReelStop.mp3',
    ScatterLock01  : 'sfx/slot/fs/fsScatterLocking01.mp3',
    ScatterLock02  : 'sfx/slot/fs/fsScatterLocking02.mp3',
    ScatterLock03  : 'sfx/slot/fs/fsScatterLocking03.mp3',
    ScatterLock04  : 'sfx/slot/fs/fsScatterLocking04.mp3',
    ScatterLock05  : 'sfx/slot/fs/fsScatterLocking05.mp3',
    LongSpin       : 'sfx/slot/fs/fsScatterLongspin.mp3',
    ScatterMatch   : 'sfx/slot/fs/fsScatterMatch.mp3',
    PayCount       : 'sfx/slot/fs/fsNPaycount.mp3',
    PayCountEnd    : 'sfx/slot/fs/fsNPaycountEnd.mp3',
    MPayCount      : 'sfx/slot/fs/fsMPaycount.mp3',
    BonusJCount    : 'sfx/slot/fs/fsBonusJackpotCount.mp3',
    BonusBgm       : 'sfx/slot/fs/fsBonusBgm.mp3',
    BonusSelect    : 'sfx/slot/fs/fsBonusSelectGame.mp3',
    BonusLever     : 'sfx/slot/fs/fsBonusGameLever.mp3',
    BonusLocking01 : 'sfx/slot/fs/fsBonusScatterLocking01.mp3',
    BonusLocking02 : 'sfx/slot/fs/fsBonusScatterLocking02.mp3',
    BonusLocking03 : 'sfx/slot/fs/fsBonusScatterLocking03.mp3',
    BonusResult    : 'sfx/slot/fs/fsBonusResult.mp3',
    BonusJackpot   : 'sfx/slot/fs/fsBonusJackpot.mp3'
};
window.g_sndFlamingStar = ResPack.create( 'sndFlamingStar', sndFlamingStar ).concat( g_sfxSlotCommon );

/**
 * Gold Mine
 */
window.sndGoldMine = {
    Bgm             : 'sfx/slot/gm/gmBgm.mp3',
    FsBgm           : 'sfx/slot/gm/gmFsBgm.mp3',
    Spin            : 'sfx/slot/gm/gmSpin.mp3',
    ReelStop        : 'sfx/slot/gm/gmReelStop.mp3',
    MachineLaunch   : 'sfx/slot/gm/gmMachineLaunch.mp3',
    WildMatch       : 'sfx/slot/gm/gmWildMatch.mp3',
    WildOut         : 'sfx/slot/gm/gmWildOut.mp3',
    FreeSpinScatter : 'sfx/slot/gm/gmFreespinScatter.mp3',
    GoldScatter     : 'sfx/slot/gm/gmGoldScatter.mp3',
    SilverScatter   : 'sfx/slot/gm/gmSilverScatter.mp3',
    CartMove        : 'sfx/slot/gm/gmCartMove.mp3',
    WildLocking     : 'sfx/slot/gm/gmWildLocking.mp3',
    PayCount        : 'sfx/slot/gm/gmNPaycount.mp3',
    MajorCount      : 'sfx/slot/gm/gmMPayCount.mp3',
    MajorWin        : 'sfx/slot/gm/gmMajorWin.mp3',
    FsResult        : 'sfx/slot/gm/gmFsResult.mp3',
    FsGain          : 'sfx/slot/gm/gmFsGain.mp3'
};
window.g_sndGoldMine = ResPack.create( 'sndGoldMine', sndGoldMine ).concat( g_sfxSlotCommon );

/**
 * Cabaret Fever
 */
window.sndCabaretFever = {

    //! loop sound
    Bgm                     : 'sfx/slot/cf/cfBgm.mp3',				//O 노말 비지
    FsBgm                   : 'sfx/slot/cf/cfFsBgm.mp3',			//O (사운드 시작 시점은 Pick Match 후 바로 시작) -> 선택된 아이콘이 등장했을 때
    NormalPayCount          : 'sfx/slot/cf/cfNPayCount.mp3',		// 노말 페이 카운트
    MajorAndJackpotPayCount : 'sfx/slot/cf/cfMPayCount.mp3',		// 메이저 윈 혹은 잭팟 페이 카운팅 사운드
    PickIntroBgm            : 'sfx/slot/cf/cfPickIntro.mp3',		//O pick Game Intro

    //! not loop sound
    Spin           : 'sfx/slot/cf/cfSpin.mp3',
    ReSpin         : 'sfx/slot/cf/cfRespin.mp3',			//O 리스핀 시
    BonusLocking01 : 'sfx/slot/cf/cfBonusLocking01.mp3',	//O 3개의 보너스 심볼 매치 가능성이 있을 때 2번째 부터.
    BonusLocking02 : 'sfx/slot/cf/cfBonusLocking02.mp3',
    BonusLocking03 : 'sfx/slot/cf/cfBonusLocking03.mp3',
    ReelStop       : 'sfx/slot/cf/cfReelStop.mp3',			//O 릴 멈출 때
    BonusMatch     : 'sfx/slot/cf/cfBonusMatch.mp3',		//O 보너스 매치 애니메이션 재생 시
    Jackpot        : 'sfx/slot/cf/cfJackpot.mp3',			//O 잭팟 팝업 출력 시
    LongSpin       : 'sfx/slot/cf/cfLongspin.mp3',			//O 롱 스핀 시

    JackpotLocking : 'sfx/slot/cf/cfJackpotLocking.mp3',	//O 피버 심볼이 멈췄을 때
    MultiAniSound  : 'sfx/slot/cf/cfMultiCount.mp3',		//O 2x, 3x 연출 애니메이션 할 때

    //! pick Game
    PickIntro      : 'sfx/slot/cf/cfPickIntroVoice.mp3',
    PickMatch      : 'sfx/slot/cf/cfPickMatch.mp3',		//O 픽한 박스 3매치 후 매치 사운드
    BoxPick        : 'sfx/slot/cf/cfPickBoxClick.mp3',		//O 픽한 박스 클릭 후 오픈 사운드
    BoxTwo         : 'sfx/slot/cf/cfBoxTwo.mp3',			//O 픽한 박스가 2개 이상 모인 경우 재생.
    FsResult       : 'sfx/slot/cf/cfFsResult.mp3',			//O Free Game 종료 팝업창 사운드.
    FsFeverJackpot : 'sfx/slot/cf/cfFsFeverJackpot.mp3',	//O 1초 PickGame 후 Fever 시
    FsLockJackpot  : 'sfx/slot/cf/cfFsLockJackpot.mp3',	//O 1초 Lock 시
    FsLogo         : 'sfx/slot/cf/cfFsLogo.mp3'

    // majorWin 팝업 등장 사운드는 공통으로 적용 -> 자동으로 되어 있음.
    //
};
window.g_sndCabaretFever = ResPack.create( 'sndCabaretFever', sndCabaretFever ).concat( g_sfxSlotCommon );

/**
 * Jackpot X-mas
 */
window.sndJackpotXmas = {
    //! loop sound
    Bgm                     : 'sfx/slot/jx/jxBgm.mp3',				//O 노말 비지
    FsBgm                   : 'sfx/slot/jx/jxFsBgm.mp3',			//O (사운드 시작 시점은 Pick Match 후 바로 시작) -> 선택된 아이콘이 등장했을 때
    NormalPayCount          : 'sfx/slot/jx/jxNPaycount.mp3',		// 노말 페이 카운트
    MajorAndJackpotPayCount : 'sfx/slot/jx/jxMPaycount.mp3',		// 메이저 윈 혹은 잭팟 페이 카운팅 사운드

    //! not loop sound
    Spin					: 'sfx/slot/jx/jxSpin.mp3',
    JackpotTwin				: 'sfx/slot/jx/jxJackpotTwin.mp3',
    ScatterLocking01        : 'sfx/slot/jx/jxScatterLocking01.mp3',	//O 3개의 보너스 심볼 매치 가능성이 있을 때 2번째 부터.
    ScatterLocking02        : 'sfx/slot/jx/jxScatterLocking02.mp3',
    ScatterLocking03        : 'sfx/slot/jx/jxScatterLocking03.mp3',
    ScatterMatch			: 'sfx/slot/jx/jxScatterMatch.mp3',
    ReelStop                : 'sfx/slot/jx/jxReelStop.mp3',			//
    JackpotPopUp			: 'sfx/slot/jx/jxJackpotPopup.mp3',		//
    JackptSym				: 'sfx/slot/jx/jxJackpotSym.mp3',		//
    LongSpin                : 'sfx/slot/jx/jxLongspin.mp3',			//

    FsIntro					: 'sfx/slot/jx/jxFsIntro.mp3',
    FsResult				: 'sfx/slot/jx/jxFsResult.mp3',
    FsTwinAdd				: 'sfx/slot/jx/jxFsTwinAdd.mp3'
};
window.g_sndJackpotXmas = ResPack.create( 'sndJackpotXmas', sndJackpotXmas ).concat( g_sfxSlotCommon );

/**
 * Hot Cash
 */
window.sndHotCash = {
    //! loop sound
    Bgm                     : 'sfx/slot/hc/hcBgm.mp3',
    WheelBgm                : 'sfx/slot/hc/hcWheelBgm.mp3',
    // FsBgm                   : 'sfx/slot/hc/hcFsBgm.mp3',

    //! Normal
    Spin					: 'sfx/slot/hc/hcSpin.mp3',
    Reel					: 'sfx/slot/hc/hcReel.mp3',
    ReelStop                : 'sfx/slot/hc/hcReelStop.mp3',
    NPayCount				: 'sfx/slot/hc/hcNPaycount.mp3',
    MPayCount				: 'sfx/slot/hc/hcMPaycount.mp3',
    LongSpin                : 'sfx/slot/hc/hcLongspin.mp3',
    ScatterLocking01        : 'sfx/slot/hc/hcScatterLocking01.mp3',
    ScatterLocking02        : 'sfx/slot/hc/hcScatterLocking02.mp3',
    ScatterLocking03        : 'sfx/slot/hc/hcScatterLocking03.mp3',
    JackpotLocking			: 'sfx/slot/hc/hcJackpotLocking.mp3',
    ScatterMatch			: 'sfx/slot/hc/hcScatterMatch.mp3',
    JackpotPopUp			: 'sfx/slot/hc/hcJackpotPopup.mp3',

    //! Wheel
    WheelOpen				: 'sfx/slot/hc/hcWheelOpen.mp3',
    WheelSpin				: 'sfx/slot/hc/hcWheelSpin.mp3',
    WheelMatch				: 'sfx/slot/hc/hcWheelMatch.mp3',
    WheelNext				: 'sfx/slot/hc/hcWheelNext.mp3',
    WheelFsNext				: 'sfx/slot/hc/hcWheelFsNext.mp3',

    //! Free Spin
    FsResult				: 'sfx/slot/hc/hcFsResult.mp3',
    FsDirectLocking			: 'sfx/slot/hc/hcFsDirectLocking.mp3',
    FsAddCount				: 'sfx/slot/hc/hcFsAddCount.mp3'
};
window.g_sndHotCash = ResPack.create( 'sndHotCash', sndHotCash ).concat( g_sfxSlotCommon );

/**
 * Zeus Thunder
 */
window.sndZeusThunder = {
    ReelStop                   : 'sfx/slot/zt/ztReelStop.mp3',
    Bgm                        : 'sfx/slot/zt/ztBgm.mp3',
    ScatterLocking01           : 'sfx/slot/zt/ztScatterLocking01.mp3',
    ScatterLocking02           : 'sfx/slot/zt/ztScatterLocking02.mp3',
    ScatterLocking03           : 'sfx/slot/zt/ztScatterLocking03.mp3',
    ScatterMatch               : 'sfx/slot/zt/ztScatterMatch.mp3',
    LongSpin                   : 'sfx/slot/zt/ztLongSpin.mp3',
    JackpotPopup               : 'sfx/slot/zt/ztJackpotPopup.mp3',
    BeadSpawn                  : 'sfx/slot/zt/ztJewelrySpawn.mp3',
    BeadDrop                   : 'sfx/slot/zt/ztJewelryDrop.mp3',
    NormalPayCounting          : 'sfx/slot/zt/ztNPayCount.mp3',
    MajorAndJackpotPayCounting : 'sfx/slot/zt/ztMPayCount.mp3',
    WildChange01               : 'sfx/slot/zt/ztWildChange01.mp3',
    // WildChange02               : 'sfx/slot/zt/ztWildChange02.mp3', 제외됨.
    MysteryShakeBg             : 'sfx/slot/zt/ztMysteryShakeBg.mp3',
    MysteryWildSpawn           : 'sfx/slot/zt/ztMysteryWildSpawn.mp3',
    FreeSpinIntro              : 'sfx/slot/zt/ztFsIntro.mp3',
    FreeSpinBgm                : 'sfx/slot/zt/ztFsBgm.mp3',
    FreeSpinWildAdd            : 'sfx/slot/zt/ztFsWildAdd.mp3',
    FreeSpinResult             : 'sfx/slot/zt/ztFsResult.mp3'
    // WildJackpotProgressive: '', 일단 제외.
};
window.g_sndZeusThunder = ResPack.create( 'sndZeusThunder', sndZeusThunder ).concat( g_sfxSlotCommon );

/**
 * Billionaire Piggy
 */
window.sndBillionairePiggy = {
    // Reel                      : 'sfx/slot/bp/ .mp3',  // 아직 안나옴.
    ReelStop                  : 'sfx/slot/bp/bpReelStop.mp3',
    Bgm                       : 'sfx/slot/bp/bpBgm.mp3',
    NormalPayCounting         : 'sfx/slot/bp/bpNPayCount.mp3',
    MajorAndJackpotPayCounting: 'sfx/slot/bp/bpMPayCount.mp3',
    JackpotPopup              : 'sfx/slot/bp/bpJackpotPopup.mp3',
    TriggerLocking            : 'sfx/slot/bp/bpTSymLocking.mp3',
    TriggerGather             : 'sfx/slot/bp/bpTSymTrail.mp3',
    TriggerMatch			  : 'sfx/slot/bp/bpTSymMatch.mp3',
    ExtraSpin                 : 'sfx/slot/bp/bpExtraReelSpin.mp3',
    SpreadExtraSymbol         : 'sfx/slot/bp/bpTSymCTrail.mp3',
    ChangeType                : 'sfx/slot/bp/bpTSymChange.mp3',
    WildLocking               : 'sfx/slot/bp/bpWildLocking.mp3',
    WildTrail                 : 'sfx/slot/bp/bpWildTrail.mp3',
    FreeSpinOpen01            : 'sfx/slot/bp/bpFsBankOpen.mp3',
    FreeSpinOpen02            : 'sfx/slot/bp/bpFsBankOpen02.mp3',
    FreeSpinOpenPopup         : 'sfx/slot/bp/bpFsBankOpenPopup.mp3',
    FreeSpinBgm               : 'sfx/slot/bp/bpFsBgm.mp3',
    FreeSpinResult            : 'sfx/slot/bp/bpFsResult.mp3',
    MisterySpawn              : 'sfx/slot/bp/bpFsMystery.mp3',
    PiggyGrownUp	          : 'sfx/slot/bp/bpPigChange.mp3',
    ReSpin					  : 'sfx/slot/bp/bpRespin.mp3',
    Spin					  : 'sfx/slot/bp/bpSpin.mp3',
    ExtraPick				  : 'sfx/slot/bp/bpExtraReelWin.mp3',
    MajorWinPopup			  : 'sfx/slot/bp/bpMajorPopup.mp3'
};
window.g_sndBillionairePiggy = ResPack.create( 'sndBillionairePiggy', sndBillionairePiggy ).concat( g_sfxSlotCommon );

/**
 * Vegas Classic
 */
window.sndVegasClassic = {
    Spin                       : 'sfx/slot/vc/vcSpin.mp3',
    SpinBtn                    : 'sfx/slot/vc/vcSpinBtn.mp3',
    ReelStop                   : 'sfx/slot/vc/vcReelStop.mp3',
    Bgm                        : 'sfx/slot/vc/vcBgm.mp3',
    JackpotPopup               : 'sfx/slot/vc/vcJackpotPopup.mp3',
    MajorPopup                 : 'sfx/slot/vc/vcMajorPopup.mp3',
    Reel1                      : 'sfx/slot/vc/vcReel01.mp3',
    Reel2                      : 'sfx/slot/vc/vcReel02.mp3',
    Reel3                      : 'sfx/slot/vc/vcReel03.mp3',
    Reel4                      : 'sfx/slot/vc/vcReel04.mp3',
    NormalPayCounting1         : 'sfx/slot/vc/vcNPayCount01.mp3',
    NormalPayCounting2         : 'sfx/slot/vc/vcNPayCount02.mp3',
    NormalPayCounting3         : 'sfx/slot/vc/vcNPayCount03.mp3',
    PayCountEnd                : 'sfx/slot/vc/vcPayCountEnd.mp3',
    MajorPayCounting           : 'sfx/slot/vc/vcMPayCount.mp3',
    JackpotMatch               : 'sfx/slot/vc/vcJSymMatch.mp3',
    JackpotReel                : 'sfx/slot/vc/vcJackpotReel.mp3',
    JackpotReelEnd             : 'sfx/slot/vc/vcJackpotReelEnd.mp3',
    JackpotLocking01           : 'sfx/slot/vc/vcJSymLocking01.mp3',
    JackpotLocking02           : 'sfx/slot/vc/vcJSymLocking02.mp3',
    JackpotLocking03           : 'sfx/slot/vc/vcJSymLocking03.mp3',
    JackpotBgm                 : 'sfx/slot/vc/vcJackpotReelBgm.mp3',
    BetMinus                   : 'sfx/slot/vc/vcBetMinus.mp3',
    BetPlus                    : 'sfx/slot/vc/vcBetPlus.mp3',
    LongSpin                   : 'sfx/slot/vc/vcLongspin.mp3',
    NudgeSpin				   : 'sfx/slot/vc/vc03NudgeSpin.mp3',
    NudgeLocking			   : 'sfx/slot/vc/vc03WildLocking.mp3',
    NudgeLEnd				   : 'sfx/slot/vc/vc03NudgeComplete.mp3',
    WildRespin				   : 'sfx/slot/vc/vc06WildRespin.mp3',
    WildRespinSpin			   : 'sfx/slot/vc/vc06WildRespinSpin.mp3',
    ExtraLongSpin			   : 'sfx/slot/vc/vc07ExtraLongspin.mp3',
    ExtraLongSpinShort         : 'sfx/slot/vc/vc07ExtraLongspinShort.mp3',
    ExtraMultiWin01            : 'sfx/slot/vc/vc07MultiWin01.mp3',
    ExtraMultiWin02            : 'sfx/slot/vc/vc07MultiWin02.mp3',
    ExtraMultiWin03            : 'sfx/slot/vc/vc07MultiWin03.mp3',
    PurpleDiamondNudge		   : 'sfx/slot/vc/vc08Nudge.mp3',
    PurpleDiamondTrail		   : 'sfx/slot/vc/vc08Trail.mp3',
    PurpleDiamondBonusPot	   : 'sfx/slot/vc/vc08BonusPot.mp3',
    PurpleDiamondBonusIntro	   : 'sfx/slot/vc/vc08BonusIntro.mp3',
    PurpleDiamondBonusStart	   : 'sfx/slot/vc/vc08BonusStart.mp3',
    PurpleDiamondBonusPickOver : 'sfx/slot/vc/vc08BonusPickOver.mp3',
    PurpleDiamondBonusPick	   : 'sfx/slot/vc/vc08BonusPick.mp3',
    PurpleDiamondBonusMatch	   : 'sfx/slot/vc/vc08BonusMatch.mp3',
    PurpleDiamondBonusJackpot  : 'sfx/slot/vc/vc08BonusJackpot.mp3',
    BlackDiamondFreeSpin	   : 'sfx/slot/vc/vcFsBgm.mp3',
    BlackDiamondJackpotLocking : 'sfx/slot/vc/vc03WildLocking.mp3',
    FreeSpinResultPopup  	   : 'sfx/slot/vc/vcFsResult.mp3',
    //MenuButton                 : 'sfx/slot/sd/sdButton.mp3',
    BurningRespinLocking	   : 'sfx/slot/vc/vcJSymLocking01.mp3', //NEWLOBBY-1106 [Burnung Respin] 락킹 사운드가 나오지 않음
    BurningWildNudging         : 'sfx/slot/vc/vc13PreNudgeNudge.mp3', // BWN 추가
    BurningWildChainLocking    : 'sfx/slot/vc/vc17Chainlock.mp3',	// BWL 추
    //MenuButton                 : 'sfx/slot/sd/sdButton.mp3' //@BJ  20180212 To del

    vcRewind                   : 'sfx/slot/vc/vcRewind.mp3',
    vcRespinPopup              : 'sfx/slot/vc/vcRespinPopup.mp3',
    vcReelmove                 : 'sfx/slot/vc/vcReelmove.mp3',
    vcEpicmatch                : 'sfx/slot/vc/vcepicmatch.mp3',
    vcEpicLongSpin             : 'sfx/slot/vc/vcEpicLongspin.mp3',

    vcJPick                    : 'sfx/slot/vc/vcJPick.mp3',
    vcMLocking                 : 'sfx/slot/vc/vcMLocking.mp3',
    vcMLongspin                : 'sfx/slot/vc/vcMLongspin.mp3',
    vcMReel01                  : 'sfx/slot/vc/vcMReel01.mp3',
    vcMReel02                  : 'sfx/slot/vc/vcMReel02.mp3',
    vcMReel03                  : 'sfx/slot/vc/vcMReel03.mp3',
    vcPick01                   : 'sfx/slot/vc/vcPick01.mp3',
    vcPick02                   : 'sfx/slot/vc/vcPick02.mp3',
    vcPick03                   : 'sfx/slot/vc/vcPick03.mp3',
    vcPickMatch02              : 'sfx/slot/vc/vcPickMatch02.mp3',
    vcPickMatch                : 'sfx/slot/vc/vcPickMatch.mp3',
    vcRespin01                 : 'sfx/slot/vc/vcRespin01.mp3',
    vcRespin02                 : 'sfx/slot/vc/vcRespin02.mp3',
    vcRespin03                 : 'sfx/slot/vc/vcRespin03.mp3',
    vcRespin04                 : 'sfx/slot/vc/vcRespin04.mp3',
    vcRespin04_2               : 'sfx/slot/vc/vcRespin04_2.mp3',
    vcMCount01                 : 'sfx/slot/vc/vcMCount01.mp3',
    vcMCount02                 : 'sfx/slot/vc/vcMCount02.mp3',
    vcBtn                      : 'sfx/slot/vc/vcBtn.mp3',
    vcMIntro                   : 'sfx/slot/vc/vcMIntro.mp3',

    vcWheelPopup               : 'sfx/slot/vc/vcWheelPopup.mp3',
    vcWheelSpin                : 'sfx/slot/vc/vcWheelSpin.mp3',
    vcWheelMatch01             : 'sfx/slot/vc/vcWheelMatch01.mp3',
    vcWheelMatch02             : 'sfx/slot/vc/vcWheelMatch02.mp3',
    vcWheelMatch03             : 'sfx/slot/vc/vcWheelMatch03.mp3',
    vcWheelBosst               : 'sfx/slot/vc/vcWheelBosst.mp3',
    // vcWMatch                   : 'sfx/slot/vc/vcWMatch.mp3'

    // slot totalpay snd
    NPayCount01         : 'sfx/slot/vc/vcNPayCount01.mp3',
    NPayCount02         : 'sfx/slot/vc/vcNPayCount02.mp3',
    NPayCount03         : 'sfx/slot/vc/vcNPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    NPayCount02End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    NPayCount03End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    MPayCount           : 'sfx/slot/vc/vcMPayCount.mp3'
};
window.g_sndVegasClassic = ResPack.create( 'sndVegasClassic', sndVegasClassic ).concat( g_sfxSlotCommon );


/**
 * SuperBallKEno 키노 공통
 */

window.sndKeno = {
    kenoBall: "sfx/slot/keno/kenoBall.mp3",
    kenoNumClick: "sfx/slot/keno/kenoNumClick.mp3",
    kenoNumDraw: "sfx/slot/keno/kenoNumDraw.mp3",
    kenoNumWin: "sfx/slot/keno/kenoNumWin.mp3",
    kenoLastWin: "sfx/slot/keno/kenoLastWin.mp3",
    kenoLastWin2: "sfx/slot/keno/kenoLastWin2.mp3",
    kenoIntro: "sfx/slot/keno/kenoIntro.mp3",

    kenoBtnClick: "sfx/slot/keno/kenoBtnClick.mp3",
    kenoPopup4x: "sfx/slot/keno/kenoPopup4x.mp3",
    kenoPopupCount: "sfx/slot/keno/kenoPopupCount.mp3",

    MajorPayCounting: 'sfx/slot/keno/kenoMPayCount.mp3',
    MajorPopup: 'sfx/slot/keno/kenoMajorPopup.mp3',
    JackpotPopup: 'sfx/slot/keno/kenoJackpotPopup.mp3',

    NormalPayCounting1: 'sfx/slot/keno/kenoNPayCount01.mp3',
    NormalPayCounting2: 'sfx/slot/keno/kenoNPayCount02.mp3',
    NormalPayCounting3: 'sfx/slot/keno/kenoNPayCount03.mp3',

    BGM: 'sfx/slot/keno/kenoBgm.mp3',

    FreeSpinIntro: 'sfx/slot/keno/kenoFsIntro.mp3',
    kenoFsNumDraw: 'sfx/slot/keno/kenoFsNumDraw.mp3',
    kenoFsNumWin: "sfx/slot/keno/kenoFsNumWin.mp3",
    kenoFsResult: 'sfx/slot/keno/kenoFsResult.mp3',
    kenoMatch: 'sfx/slot/keno/kenoSmatch.mp3',

    // Dino Keno
    kenoEgg     : 'sfx/slot/keno/kenoEgg.mp3',
    kenoBreak   : 'sfx/slot/keno/kenoBreak.mp3',
    kenoMulti   : 'sfx/slot/keno/kenoMulti.mp3',

    // Triple Power Keno
    trailStart  : 'sfx/slot/keno/kenoTripleWin.mp3',

    // Dia Keno
    dia              : 'sfx/slot/keno/kenoDia.mp3',
    diaHit           : 'sfx/slot/keno/kenoDiaLocking.mp3',
    diaMatch         : 'sfx/slot/keno/kenoSmatch02.mp3',
    diaFreeSpinIntro : 'sfx/slot/keno/kenoFsIntro02.mp3',
    diaFreeSpinResult: 'sfx/slot/keno/kenoFsResult02.mp3'
};
window.g_sndKeno = ResPack.create('sndKeno', sndKeno).concat(g_sndVegasClassic);

window.sndKenoCommon = {
    // keno menu
    BtnPlay             : 'sfx/slot/vc/vcSpinBtn.mp3',
    BtnKenoCommon       : "sfx/slot/keno/kenoBtnClick.mp3",
    BetPlus             : 'sfx/slot/vc/vcBetPlus.mp3',
    BetMinus            : 'sfx/slot/vc/vcBetMinus.mp3',
    // intro
    Intro               : "sfx/slot/keno/kenoIntro.mp3",
    // bgm
    BGM                 : 'sfx/slot/keno/kenoBgm.mp3',
    // pay
    MPayCount           : 'sfx/slot/keno/kenoMPayCount.mp3',
    NPayCount01         : 'sfx/slot/keno/kenoNPayCount01.mp3',
    NPayCount02         : 'sfx/slot/keno/kenoNPayCount02.mp3',
    NPayCount03         : 'sfx/slot/keno/kenoNPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    NPayCount02End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    NPayCount03End      : 'sfx/slot/vc/vcPayCountEnd.mp3',
    // popup
    MajorWinPopup       : 'sfx/slot/keno/kenoMajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/keno/kenoJackpotPopup.mp3',
    //
    BtnNumberClick      : 'sfx/slot/keno/kenoNumClick.mp3',
    BtnNumberClickErr   : 'sfx/slot/keno/kenoNotPick.mp3',
    BtnNumberNoHit      : 'sfx/slot/keno/kenoNumDraw.mp3',
    BtnNumberHit        : 'sfx/slot/keno/kenoNumWin.mp3',
    BtnNumberFreeNoHit  : 'sfx/slot/keno/kenoFsNumDraw.mp3',
    BtnNumberFreeHit    : 'sfx/slot/keno/kenoFsNumWin.mp3',
    BtnNumberHidden     : 'sfx/slot/keno/kenoSKBonus01.mp3',
    //
    SpecialBallMove     : 'sfx/slot/keno/KenoBounceBall.mp3'
};
window.g_sndKenoCommon = convertObjToArr(sndKenoCommon).concat( g_sfxSlotCommon );

/**
 * Vegas Link
 */
window.sndVegasLink = {
    Spin                       : 'sfx/slot/vl/vlSpin.mp3',
    ReelStop                   : 'sfx/slot/vl/vlReelStop.mp3',
    Bgm                        : 'sfx/slot/vl/vlBgm.mp3',
    JackpotPopup               : 'sfx/slot/vl/vlJackpotPopup.mp3',
    MajorPopup                 : 'sfx/slot/vl/vlMajorPopup.mp3',
    NPayCount                  : 'sfx/slot/vl/vlNPayCount.mp3',
    MPayCount                  : 'sfx/slot/vl/vlMPayCount.mp3',
    ScatterLocking01           : 'sfx/slot/vl/vlScatterLocking01.mp3',
    ScatterLocking02           : 'sfx/slot/vl/vlScatterLocking02.mp3',
    ScatterLocking03           : 'sfx/slot/vl/vlScatterLocking03.mp3',
    ScatterMatch               : 'sfx/slot/vl/vlScatterMatch.mp3',
    ChipLocking                : 'sfx/slot/vl/vlChipLocking.mp3',
    ChipMatch                  : 'sfx/slot/vl/vlChipMatch.mp3',
    LongSpin                   : 'sfx/slot/vl/vlLongspin.mp3',
    LinkChipSymMulti           : 'sfx/slot/vl/vlBChipSymMulti.mp3',
    LinkLine                   : 'sfx/slot/vl/vlBSymLink.mp3',
    LinkLock                   : 'sfx/slot/vl/vlBLinkLock.mp3',
    LinkIntroChip01            : 'sfx/slot/vl/vlBIntroChip01.mp3',
    LinkIntroChip02            : 'sfx/slot/vl/vlBIntroChip02.mp3',
    LinkIntroChip03            : 'sfx/slot/vl/vlBIntroChip03.mp3',
    LinkMultiAdd               : 'sfx/slot/vl/vlBMultiAdd.mp3',
    LinkRsReset                : 'sfx/slot/vl/vlBRsReset.mp3',
    LinkChipSpin               : 'sfx/slot/vl/vlBChipSpin.mp3',
    LinkResult                 : 'sfx/slot/vl/vlBResultBgm.mp3',
    FsBgm                      : 'sfx/slot/vl/vlFsBgm.mp3',
    FsResult                   : 'sfx/slot/vl/vlFsResult.mp3',
    FsIntroChip                : 'sfx/slot/vl/vlFsIntroChip.mp3',
    Wheel                      : 'sfx/slot/vl/vlWheel.mp3',
    WheelMatch                 : 'sfx/slot/vl/vlWheelMatch.mp3',
    WheelStart                 : 'sfx/slot/vl/vlWheelStart.mp3'
};
window.g_sndVegasLink = ResPack.create( 'sndVegasLink', sndVegasLink ).concat( g_sfxSlotCommon );

/**
 * Golden Eagle
 */
window.sndGoldenEagle = {
    Bgm                     : 'sfx/slot/ge/geBgm.mp3',
    Spin                    : 'sfx/slot/ge/geSpin.mp3',
    ReelStop                : 'sfx/slot/ge/geReelStop.mp3',
    MPayCount               : 'sfx/slot/ge/geMPayCount.mp3',
    NPayCount               : 'sfx/slot/ge/geNPayCount.mp3',
    MajorPopup              : 'sfx/slot/ge/geMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/ge/geJackpotPopup.mp3',
    JackpotLocking          : 'sfx/slot/ge/geJSymLocking.mp3',
    ScatterLocking01        : 'sfx/slot/ge/geSLocking01.mp3',
    ScatterLocking02        : 'sfx/slot/ge/geSLocking02.mp3',
    ScatterLocking03        : 'sfx/slot/ge/geSLocking03.mp3',
    ScatterMatch            : 'sfx/slot/ge/geSMatch.mp3',
    LongSpin                : 'sfx/slot/ge/geSLongspin.mp3',
    // Reel01                  : 'sfx/slot/ge/geReel01.mp3',
    // Reel02                  : 'sfx/slot/ge/geReel02.mp3',
    // Reel03                  : 'sfx/slot/ge/geReel03.mp3',
    ReSpinMatch             : 'sfx/slot/ge/geRJSymMatch.mp3',
    ReSpinNotMainSymbolSpawn: 'sfx/slot/ge/geRJSymChange.mp3',
    ReSpinFrameUp           : 'sfx/slot/ge/geRUpReel.mp3',
    ReSpinBgm               : 'sfx/slot/ge/geRBgm.mp3',
    ReSpinText              : 'sfx/slot/ge/geRRespin.mp3',
    // ReSpinReelLoop          : 'sfx/slot/ge/geRReelFx.mp3',
    FreeSpinBgm             : 'sfx/slot/ge/geFsBgm.mp3',
    FreeSpinFrameUp         : 'sfx/slot/ge/geFsUpReel.mp3',
    FreeSpinResult          : 'sfx/slot/ge/geFsResult.mp3',
    FreeSpinIntro           : 'sfx/slot/ge/geFsIntro.mp3',
    FreeSpinStickySpawn     : 'sfx/slot/ge/geFsJSymSticky.mp3'

};
window.g_sndGoldenEagle = ResPack.create( 'sndGoldenEagle', sndGoldenEagle ).concat( g_sfxSlotCommon );

/**
 * Dragon Rising
 */
window.sndDragonRising = {
    Intro					  : 'sfx/slot/dr/drIntro.mp3',
    Spin                      : 'sfx/slot/dr/drSpin.mp3',
    ReelStop                  : 'sfx/slot/dr/drReelStop.mp3',
    Bgm                       : 'sfx/slot/dr/drBgm.mp3',
    NormalPayCounting1         : 'sfx/slot/dr/drNPayCount01.mp3',
    NormalPayCounting2         : 'sfx/slot/dr/drNPayCount02.mp3',
    NormalPayCounting3         : 'sfx/slot/dr/drNPayCount03.mp3',
    MajorAndJackpotPayCounting: 'sfx/slot/dr/drMPayCount.mp3',
    MajorWinPopup             : 'sfx/slot/dr/drMajorPopup.mp3',
    LongSpin                  : 'sfx/slot/dr/drLongspin.mp3',
    ScatterLocking01          : 'sfx/slot/dr/drScatterLocking01.mp3',
    Mystery					  : 'sfx/slot/dr/drMystery.mp3',
    ScatterMatch              : 'sfx/slot/dr/drScatterMatch.mp3',
    JackpotMatch              : 'sfx/slot/dr/drJSymMatch.mp3',
    JackpotSymLocking         : 'sfx/slot/dr/drJSymLocking.mp3',
    BonusGamePick             : 'sfx/slot/dr/drRisingPick.mp3',
    BonusGamePickJackpot      : 'sfx/slot/dr/drRisingPickJsym.mp3',
    BonusGamePickBonus		  : 'sfx/slot/dr/drRisingPickBonus.mp3',
    BonusGameIntro			  : 'sfx/slot/dr/drRisingBIntro.mp3',
    BonusGameCount			  : 'sfx/slot/dr/drJackpotBCount.mp3',
    BonusGameAddPick		  : 'sfx/slot/dr/drRisingPickAdd.mp3',
    JackpotPopup              : 'sfx/slot/dr/drJackpotRes.mp3',
    JackpotPopupResBonus      : 'sfx/slot/dr/drJackpotResBonus.mp3',
    FreeSpinBgm               : 'sfx/slot/dr/drFsBgm.mp3',
    FreeSpinResultPopup       : 'sfx/slot/dr/drFsResult.mp3',
    FreeSpinIntro	          : 'sfx/slot/dr/drFsIntro.mp3',
    FreeSpinAddedIntro		  : 'sfx/slot/dr/drFsAdd.mp3'
};
window.g_sndDragonRising = ResPack.create( 'sndDragonRising', sndDragonRising ).concat( g_sfxSlotCommon );

/**
 * King of Savanna
 */
window.sndKingOfSavanna = {
    Bgm                        : 'sfx/slot/ks/ksBgm.mp3',
    Spin                       : 'sfx/slot/ks/ksSpin.mp3',
    Reel1                      : 'sfx/slot/ks/ksReel01.mp3',
    Reel2                      : 'sfx/slot/ks/ksReel02.mp3',
    Reel3                      : 'sfx/slot/ks/ksReel03.mp3',
    ReelStop                   : 'sfx/slot/ks/ksReelStop.mp3',
    MPayCount                  : 'sfx/slot/ks/ksMPayCount.mp3',
    NPayCount                  : 'sfx/slot/ks/ksNPayCount.mp3',
    LionPay                    : 'sfx/slot/ks/ksLionPay.mp3',
    MajorPopup                 : 'sfx/slot/ks/ksMajorPopup.mp3',
    JackpotPopup               : 'sfx/slot/ks/ksJackpotPopup.mp3',
    TriggerLocking             : 'sfx/slot/ks/ksTLocking.mp3',
    TriggerMatch               : 'sfx/slot/ks/ksTMatch.mp3',
    ScatterLocking01           : 'sfx/slot/ks/ksSLocking01.mp3',
    ScatterLocking02           : 'sfx/slot/ks/ksSLocking02.mp3',
    ScatterLocking03           : 'sfx/slot/ks/ksSLocking03.mp3',
    ScatterMatch               : 'sfx/slot/ks/ksSMatch.mp3',
    LongSpin                   : 'sfx/slot/ks/ksSLongspin.mp3',
    SyncReel                   : 'sfx/slot/ks/ksSyncReel.mp3',
    SyncBgm                    : 'sfx/slot/ks/ksSyncBgm.mp3',
    SyncBgm02                  : 'sfx/slot/ks/ksSyncBgm02.mp3',
    SyncMulti                  : 'sfx/slot/ks/ksSyncMultiPay.mp3',
    // SyncRespin                 : 'sfx/slot/ks/ksSyncRespin.mp3',
    FsBgm                      : 'sfx/slot/ks/ksFsBgm.mp3',
    FsResult                   : 'sfx/slot/ks/ksFsResult.mp3'
};
window.g_sndKingOfSavanna = ResPack.create( 'sndKingOfSavanna', sndKingOfSavanna ).concat( g_sfxSlotCommon );

/**
 * Diamond Wheel
 */
window.sndDiamondWheel = {
    Bgm                     : 'sfx/slot/dw/dwBgm.mp3',
    Spin                    : 'sfx/slot/dw/dwSpin.mp3',
    Button                  : 'sfx/slot/dw/dwButton.mp3',
    ReelStop                : 'sfx/slot/dw/dwReelStop.mp3',
    MPayCount               : 'sfx/slot/dw/dwMPayCount.mp3',
    NPayCount               : 'sfx/slot/dw/dwNPayCount.mp3',
    MajorPopup              : 'sfx/slot/dw/dwMajorPopup.mp3',
    LongSpin                : 'sfx/slot/dw/dwLongspin.mp3',
    ScatterLocking01        : 'sfx/slot/dw/dwSLocking01.mp3',
    ScatterLocking02        : 'sfx/slot/dw/dwSLocking02.mp3',
    ScatterLocking03        : 'sfx/slot/dw/dwSLocking03.mp3',
    ScatterLocking04        : 'sfx/slot/dw/dwSLocking04.mp3',
    ScatterLocking05        : 'sfx/slot/dw/dwSLocking05.mp3',
    ScatterMatch            : 'sfx/slot/dw/dwScatterMatch.mp3',
    DiamondLocking          : 'sfx/slot/dw/dwDsymLocking.mp3',
    DiamondMatch            : 'sfx/slot/dw/dwDsymMatch.mp3',

    WheelBgm                : 'sfx/slot/dw/dwWgBgm.mp3',
    DiamondTrail            : 'sfx/slot/dw/dwWgDUp.mp3',
    DiamondStick            : 'sfx/slot/dw/dwWgDChange.mp3',
    WheelSpin               : 'sfx/slot/dw/dwWgWheelTurn.mp3',
    WheelWin                : 'sfx/slot/dw/dwWgWheelWin.mp3',
    // WheelUpgrade            : 'sfx/slot/dw/dwWgWheelUpgrade.mp3',
    // WheelResult             : 'sfx/slot/dw/dwWgResult.mp3',
    JackpotResult           : 'sfx/slot/dw/dwJackpotPopup.mp3',
    // JackpotMulti            : 'sfx/slot/dw/dwWgJackpotMulti.mp3',
    JackpotBonus            : 'sfx/slot/dw/dwWgJackpotBonus.mp3',

    FreeSpinBgm             : 'sfx/slot/dw/dwFsBgm.mp3',
    FreeSpinResult          : 'sfx/slot/dw/dwFsResult.mp3'
};
window.g_sndDiamondWheel = ResPack.create( 'sndDiamondWheel', sndDiamondWheel ).concat( g_sfxSlotCommon );

/**
 * Fortune Diamond
 * */
window.sndFortuneDiamond = {
    Spin               : 'sfx/slot/fd/fdSpin.mp3',
    ReelStop           : 'sfx/slot/fd/fdReelStop.mp3',
    Bgm                : 'sfx/slot/fd/fdBgm.mp3',
    Reel01             : 'sfx/slot/fd/fdReel01.mp3',
    Reel02             : 'sfx/slot/fd/fdReel02.mp3',
    Reel03             : 'sfx/slot/fd/fdReel03.mp3',
    MajorPayCount      : 'sfx/slot/fd/fdMPayCount.mp3',
    NormalPayCount     : 'sfx/slot/fd/fdNPayCount.mp3',
    MajorWinPopup      : 'sfx/slot/fd/fdMajorPopup.mp3',
    LongSpin           : 'sfx/slot/fd/fdLongspin.mp3',
    ScatterLocking01   : 'sfx/slot/fd/fdSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/fd/fdSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/fd/fdSLocking03.mp3',
    DiamondSymbolLock  : 'sfx/slot/fd/fdDiaLocking.mp3',
    WiltTrail          : 'sfx/slot/fd/fdWildTrail.mp3',
    ScatterMatch       : 'sfx/slot/fd/fdSMatch.mp3',
    FDJackpotPopup     : 'sfx/slot/fd/fdJackpotPopup.mp3',
    PickGameIntro      : 'sfx/slot/fd/fdBoIntro.mp3',
    PickGameCoinOver   : 'sfx/slot/fd/fdBoPickOver.mp3',
    PickGamePick       : 'sfx/slot/fd/fdBoPick.mp3',
    PickGameThreeMatch : 'sfx/slot/fd/fdBoMatch.mp3',
    PickJackpotDouble  : 'sfx/slot/fd/fdBoJackpotPopupMulti.mp3',
    PickJackpotPopup   : 'sfx/slot/fd/fdBoJackpotPopup.mp3',
    PickDouble 		   : 'sfx/slot/fd/fdBoMulti.mp3',
    FreeSpinBgm        : 'sfx/slot/fd/fdFsBgm.mp3',
    FreeSpinResult     : 'sfx/slot/fd/fdFsResult.mp3'
};
window.g_sndFortuneDiamond = ResPack.create( 'sndFortuneDiamond', sndFortuneDiamond ).concat( g_sfxSlotCommon );

/**
 * Queen Of Riches
 * */
window.sndQueenOfRiches = {
    Spin               : 'sfx/slot/qr/qrSpin.mp3',
    ReelStop           : 'sfx/slot/qr/qrReelStop.mp3',
    Bgm                : 'sfx/slot/qr/qrBgm.mp3',
    MPayCount          : 'sfx/slot/qr/qrMPayCount.mp3',
    NPayCount          : 'sfx/slot/qr/qrNPayCount.mp3',
    MajorPopup         : 'sfx/slot/qr/qrMajorPopup.mp3',
    LongSpin           : 'sfx/slot/qr/qrLongspin.mp3',
    ScatterLocking01   : 'sfx/slot/qr/qrSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/qr/qrSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/qr/qrSLocking03.mp3',
    ScatterLocking04   : 'sfx/slot/qr/qrSLocking04.mp3',
    ScatterLocking05   : 'sfx/slot/qr/qrSLocking05.mp3',
    ScatterMatch       : 'sfx/slot/qr/qrSMatch.mp3',
    JackpotPopup       : 'sfx/slot/qr/qrJackpotPopup.mp3',
    BonusIntro         : 'sfx/slot/qr/qrBoIntro.mp3',
    BonusSymLocking    : 'sfx/slot/qr/qrBoSymLocking.mp3',
    // BonusBgm           : 'sfx/slot/qr/qrBoBgm.mp3',
    BonusReSpin        : 'sfx/slot/qr/qrBoRespin.mp3',
    BonusSpin          : 'sfx/slot/qr/qrBoSpin.mp3',
    BonusNudge         : 'sfx/slot/qr/qrBoNudge.mp3',
    // BonusNudgeEnd      : 'sfx/slot/qr/qrBoNudgeEnd.mp3',
    FreeSpinIntro      : 'sfx/slot/qr/qrFsintro.mp3',
    FreeSpinBgm        : 'sfx/slot/qr/qrFsBgm.mp3',
    FreeSpinResult     : 'sfx/slot/qr/qrFsResult.mp3'
};
window.g_sndQueenOfRiches = ResPack.create( 'sndQueenOfRiches', sndQueenOfRiches ).concat( g_sfxSlotCommon );

/**
 * Aloha Wheel Fever
 * */
window.sndAlohaWheel = {
    Bgm                : 'sfx/slot/aw/awBgm.mp3',
    Spin               : 'sfx/slot/aw/awSpin.mp3',
    Reel01             : 'sfx/slot/aw/awReel01.mp3',
    Reel02             : 'sfx/slot/aw/awReel02.mp3',
    Reel03             : 'sfx/slot/aw/awReel03.mp3',
    ReelStop           : 'sfx/slot/aw/awReelStop.mp3',
    WildAddedSym       : 'sfx/slot/aw/awAddedSym.mp3',
    JackpotPopup       : 'sfx/slot/aw/awJackpotPopup.mp3',
    MPayCount          : 'sfx/slot/aw/awMPayCount.mp3',
    NPayCount          : 'sfx/slot/aw/awNPayCount.mp3',
    ScatterLocking01   : 'sfx/slot/aw/awSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/aw/awSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/aw/awSLocking03.mp3',
    LongSpin           : 'sfx/slot/aw/awSLongspin.mp3',
    ScatterMatch       : 'sfx/slot/aw/awSMatch.mp3',
    WheelBgm           : 'sfx/slot/aw/awWhBgm.mp3',
    WheelBoom          : 'sfx/slot/aw/awWhBoom.mp3',
    WheelSpin          : 'sfx/slot/aw/awWhSpin.mp3',
    WheelWinIn         : 'sfx/slot/aw/awWhWinIn.mp3',
    WheelWinOut        : 'sfx/slot/aw/awWhWinOut.mp3',
    WheelXResult       : 'sfx/slot/aw/awWhXResult.mp3',
    FreeSpinBgm        : 'sfx/slot/aw/awFsBgm.mp3',
    FreeSpinResult     : 'sfx/slot/aw/awFsResult.mp3',
    FreeSpinSticky     : 'sfx/slot/aw/awFsSticky.mp3'
};
window.g_sndAlohaWheel = ResPack.create( 'sndAlohaWheel', sndAlohaWheel ).concat( g_sfxSlotCommon );

/**
 * Pumpkin Pot
 * */
window.sndPumpkinPot = {
    Spin               : 'sfx/slot/pk/pkSpin.mp3',
    ReelStop           : 'sfx/slot/pk/pkReelStop.mp3',
    MajorPayCount      : 'sfx/slot/pk/pkMPayCount.mp3',
    NormalPayCount     : 'sfx/slot/pk/pkNPayCount.mp3',
    LongSpin           : 'sfx/slot/pk/pkSLongspin.mp3',
    ScatterLocking01   : 'sfx/slot/pk/pkSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/pk/pkSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/pk/pkSLocking03.mp3',
    ScatterMatch       : 'sfx/slot/pk/pkSMatch.mp3',
    JackpotMatch	   : 'sfx/slot/pk/pkJackpotMatch.mp3',
    JackpotPopup	   : 'sfx/slot/pk/pkJackpotPopup.mp3',
    WiltTrail          : 'sfx/slot/pk/pkWildTrail.mp3',
    MajorWinPopup	   : 'sfx/slot/pk/pkMajorPopup.mp3',

    // bgm
    Bgm                : 'sfx/slot/pk/pkBgm.mp3',
    LinkBgm            : 'sfx/slot/pk/pkLinkBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/pk/pkFsBgm.mp3',

    // link game
    LinkDirectLocking  : 'sfx/slot/pk/pkLinkDsymLocking.mp3',
    LinkJackpotLocking : 'sfx/slot/pk/pkLinkJsymLocking.mp3',
    LinkUpgrade        : 'sfx/slot/pk/pkLinkUpgrade.mp3',
    LinkResultPopup    : 'sfx/slot/pk/pkLinkResult.mp3',
    LinkSpin           : 'sfx/slot/pk/pkSpin.mp3',
    LinkLastSpin	   : 'sfx/slot/pk/pkLinkLastspin.mp3',
    LinkIntro          : 'sfx/slot/pk/pkLinkIntro.mp3',
    LinkSum            : 'sfx/slot/pk/pkLinkWinSum.mp3',
    LinkCountReset     : 'sfx/slot/pk/pkLinkReset.mp3',
    LinkGrandSymbol	   : 'sfx/slot/pk/pkLinkSymMatch.mp3',

    // freespin
    FreeSpinResultPopup : 'sfx/slot/pk/pkFsResult.mp3',
    FreeSpinIntro       : 'sfx/slot/pk/pkFsIntro.mp3'
};
window.g_sndPumpkinPot = ResPack.create( 'sndPumpkinPot', sndPumpkinPot ).concat( g_sfxSlotCommon );

/**
 * gold Bar
 * */
window.sndGoldBar = {
    Spin               : 'sfx/slot/gb/gbSpin.mp3',
    Reel1              : 'sfx/slot/gb/gbReel01.mp3',
    Reel2              : 'sfx/slot/gb/gbReel02.mp3',
    Reel3              : 'sfx/slot/gb/gbReel03.mp3',
    ReelStop           : 'sfx/slot/gb/gbReelStop.mp3',
    MajorPayCount      : 'sfx/slot/gb/gbMPayCount.mp3',
    NormalPayCount     : 'sfx/slot/gb/gbNPayCount.mp3',
    NormalPayCountEnd  : 'sfx/slot/gb/gbNPayCountEnd.mp3',

    LongSpin           : 'sfx/slot/gb/gbSLongspin.mp3',
    LongSpin01         : 'sfx/slot/gb/gbSLongspin01.mp3',
    ScatterLocking01   : 'sfx/slot/gb/gbSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/gb/gbSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/gb/gbSLocking03.mp3',
    ScatterLocking04   : 'sfx/slot/gb/gbSLocking04.mp3',
    ScatterLocking05   : 'sfx/slot/gb/gbSLocking05.mp3',
    ScatterMatch       : 'sfx/slot/gb/gbSMatch.mp3',
    JackpotPopup	   : 'sfx/slot/gb/gbJackpotPopup.mp3',
    BonusTrail         : 'sfx/slot/gb/gbBSymTrail.mp3',

    MajorWinPopup	   : 'sfx/slot/gb/gbMajorPopup.mp3',

    // bgm
    Bgm                : 'sfx/slot/gb/gbBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/gb/gbFsBgm.mp3',
    BonusGameBgm       : 'sfx/slot/gb/gbWheelBgm.mp3',

    // bonus game
    BonusGameIntro	   : 'sfx/slot/gb/gbWheelIntro.mp3',
    BonusGameResult	   : 'sfx/slot/gb/gbWheelResult.mp3',
    BonusGameStart	   : 'sfx/slot/gb/gbWheelStart.mp3',
    BonusGameSpin	   : 'sfx/slot/gb/gbWheelSpin.mp3',
    BonusGameSpin01	   : 'sfx/slot/gb/gbWheelPiece01.mp3',
    BonusGameSpin02	   : 'sfx/slot/gb/gbWheelPiece02.mp3',
    BonusGameSpin03	   : 'sfx/slot/gb/gbWheelPiece03.mp3',
    BonusGameSpin04	   : 'sfx/slot/gb/gbWheelPiece04.mp3',
    BonusGameWin	   : 'sfx/slot/gb/gbWheelWin.mp3',
    BonusGameSum       : 'sfx/slot/gb/gbWheelSum.mp3',

    // freespin
    FreeSpinResultPopup : 'sfx/slot/gb/gbFsResult.mp3',
    FreeSpinIntro       : 'sfx/slot/gb/gbFsIntro.mp3',
    FreeSpinIntro01     : 'sfx/slot/gb/gbFsIntro01.mp3'
};
window.g_sndGoldBar = ResPack.create( 'sndGoldBar', sndGoldBar ).concat( g_sfxSlotCommon );

/**
 * Big Money
 * */
window.sndBigMoney = {
    // slot
    Spin           		    : 'sfx/slot/bm/bmSpin.mp3',
    LongSpin           		: 'sfx/slot/bm/bmSLongspin.mp3',
    JackpotLock      		: 'sfx/slot/bm/bmJLocking.mp3',
    ScatterLock01			: 'sfx/slot/bm/bmSLocking01.mp3',
    ScatterLock02			: 'sfx/slot/bm/bmSLocking02.mp3',
    ScatterLock03			: 'sfx/slot/bm/bmSLocking03.mp3',
    ReelPlay01     		    : 'sfx/slot/bm/bmReel01.mp3',
    ReelPlay02     		    : 'sfx/slot/bm/bmReel02.mp3',
    ReelPlay03     		    : 'sfx/slot/bm/bmReel03.mp3',
    ReelStop      		    : 'sfx/slot/bm/bmReelStop.mp3',
    ScatterMatch      		: 'sfx/slot/bm/bmSMatch.mp3',

    // wheel
    WheelIntro     		    : 'sfx/slot/bm/bmWheelIntro.mp3',
    WheelSpin      		    : 'sfx/slot/bm/bmWheelSpin.mp3',
    WheelWin      		    : 'sfx/slot/bm/bmWheelWin.mp3',
    WheelReSpin    		    : 'sfx/slot/bm/bmWheelRespin.mp3',
    // bgm
    Bgm         		    : 'sfx/slot/bm/bmBgm.mp3',
    WheelBgm 	  		    : 'sfx/slot/bm/bmWheelBgm.mp3',
    ReSpinBgm 	  		    : 'sfx/slot/bm/bmRespinBgm.mp3',

    // pay counting
    MajorNJackpotCount		: 'sfx/slot/bm/bmMPayCount.mp3',
    MajorNJackpotCountEnd	: 'sfx/slot/bm/bmMPayCount.mp3',
    NormalCount		        : 'sfx/slot/bm/bmNPayCount.mp3',
    NormalCountEnd		    : 'sfx/slot/bm/bmNPayCountEnd.mp3',

    // PopUp
    PopUpJackpot		    : 'sfx/slot/bm/bmJackpotPopup.mp3',
    PpoUpMajorWin		    : 'sfx/slot/bm/bmMajorPopup.mp3',

    // ReSpin
    ReSpinIntro			    : 'sfx/slot/bm/bmRespinIntro.mp3',
    ReSpinPreview		    : 'sfx/slot/bm/bmRespinPreview.mp3',
    ReSpinPreviewPiece	    : 'sfx/slot/bm/bmRespinPreviewPiece.mp3',
    ReSpinResult		    : 'sfx/slot/bm/bmRespinResult.mp3'
};
window.g_sndBigMoney = ResPack.create( 'sndBigMoney', sndBigMoney ).concat( g_sfxSlotCommon );

/**
 * Ocean Link
 */
window.sndOceanLink = {
    Spin             : 'sfx/slot/ol/olSpin.mp3',
    ReelStop         : 'sfx/slot/ol/olReelStop.mp3',
    MajorPayCount    : 'sfx/slot/ol/olMPayCount.mp3',
    NormalPayCount   : 'sfx/slot/ol/olNPayCount.mp3',
    NormalPayCountEnd: 'sfx/slot/ol/olNPayCountEnd.mp3',
    LongSpin         : 'sfx/slot/ol/olSLongspin.mp3',
    ScatterLocking01 : 'sfx/slot/ol/olSLocking01.mp3',
    ScatterLocking02 : 'sfx/slot/ol/olSLocking02.mp3',
    ScatterLocking03 : 'sfx/slot/ol/olSLocking03.mp3',
    LinkLocking      : 'sfx/slot/ol/olLLocking.mp3',
    ScatterMatch     : 'sfx/slot/ol/olSMatch.mp3',
    JackpotPopup     : 'sfx/slot/ol/olJackpotPopup.mp3',
    MajorWinPopup    : 'sfx/slot/ol/olMajorPopup.mp3',
    Reel01           : 'sfx/slot/ol/olReel01.mp3',
    Reel02           : 'sfx/slot/ol/olReel02.mp3',
    Reel03           : 'sfx/slot/ol/olReel03.mp3',
    LinkMatch        : 'sfx/slot/ol/olLMatch.mp3',

    // bgm
    Bgm        : 'sfx/slot/ol/olBgm.mp3',
    LinkBgm    : 'sfx/slot/ol/olLinkBgm.mp3',
    FreeSpinBgm: 'sfx/slot/ol/olFsBgm.mp3',

    // link game
    LinkFirstSpin          : 'sfx/slot/ol/olLinkFirstspin.mp3',
    LinkDirectLocking      : 'sfx/slot/ol/olLinkDSymLocking.mp3',
    LinkJackpotLocking     : 'sfx/slot/ol/olLinkJSymLocking.mp3',
    LinkResult             : 'sfx/slot/ol/olLinkResult.mp3',
    LinkLastSpin           : 'sfx/slot/ol/olLinkLastspin.mp3',
    LinkIntro              : 'sfx/slot/ol/olLinkIntro.mp3',
    LinkSum                : 'sfx/slot/ol/olLinkWinSum.mp3',
    LinkCountReset         : 'sfx/slot/ol/olLinkReset.mp3',
    LinkPickPopup          : 'sfx/slot/ol/olLinkPickPopup.mp3',
    LinkPickBox            : 'sfx/slot/ol/olLinkPickBox.mp3',
    LinkPickBoxOpen        : 'sfx/slot/ol/olLinkPickBoxOpen.mp3',
    LinkPickTitleOpen      : 'sfx/slot/ol/olLinkPearlMove.mp3',
    LinkRollOverJackpot    : 'sfx/slot/ol/olLinkJackpotOpen.mp3',

    LinkReelStart            : 'sfx/slot/ol/olLinkReelStart.mp3',
    LinkReelStop             : 'sfx/slot/ol/olLinkReelStop.mp3',
    LinkWhiteSymbolOpen      : 'sfx/slot/ol/olLinkDSymOpen.mp3',
    LinkGoldDirectSymbolOpen : 'sfx/slot/ol/olLinkJSymOpen.mp3',
    LinkGoldJackpotSymbolOpen: 'sfx/slot/ol/olLinkJSymOpenJackpot.mp3',

    // freespin
    FreeSpinResultPopup    : 'sfx/slot/ol/olFsResult.mp3',
    FreeSpinIntro          : 'sfx/slot/ol/olFsIntro.mp3',
    FreeSpinIntroDropSymbol: 'sfx/slot/ol/olFsIntroAddSym.mp3'
};
window.g_sndOceanLink = ResPack.create( 'sndOceanLink', sndOceanLink ).concat( g_sfxSlotCommon );

window.sndWildBuffalo = {
    Spin               : 'sfx/slot/wb/wbSpin.mp3',
    // Reel1              : 'sfx/slot/wb/wbReel01.mp3',
    // Reel2              : 'sfx/slot/wb/wbReel02.mp3',
    // Reel3              : 'sfx/slot/wb/wbReel03.mp3',
    ReelStop           : 'sfx/slot/wb/wbReelStop.mp3',
    MajorPayCount      : 'sfx/slot/wb/wbMPayCount.mp3',
    NormalPayCount     : 'sfx/slot/wb/wbNPayCount.mp3',
    NormalPayCountEnd  : 'sfx/slot/wb/wbNPayCountEnd.mp3',
    NormalPayCount02   : 'sfx/slot/wb/wbNPayCount02.mp3',
    NormalPayCount02End: 'sfx/slot/wb/wbNPayCount02End.mp3',
    NormalPayCount03   : 'sfx/slot/wb/wbNPayCount03.mp3',
    NormalPayCount03End: 'sfx/slot/wb/wbNPayCount03End.mp3',
    MultiPayCount      : 'sfx/slot/wb/wbMultiCount.mp3',
    MultiPayCountEnd   : 'sfx/slot/wb/wbMultiCountEnd.mp3',

    LongSpin           : 'sfx/slot/wb/wbSLongspin.mp3',
    //LongSpin01         : 'sfx/slot/wb/wbSLongspin01.mp3',
    ScatterLocking01   : 'sfx/slot/wb/wbSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/wb/wbSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/wb/wbSLocking03.mp3',
    ScatterMatch       : 'sfx/slot/wb/wbSMatch.mp3',
    WildSticky         : 'sfx/slot/wb/wbWildLocking.mp3',
    BuffaloPay         : 'sfx/slot/wb/wbBuffaloPay.mp3',
    WildSymbolPay      : 'sfx/slot/wb/wbWildMulti.mp3',
    ReSpin             : 'sfx/slot/wb/wbRespin.mp3',
    JackpotPopup	   : 'sfx/slot/wb/wbJackpotPopup.mp3',
    MajorWinPopup	   : 'sfx/slot/wb/wbMajorPopup.mp3',

    // bgm
    Bgm                : 'sfx/slot/wb/wbBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/wb/wbFsBgm.mp3',

    // freespin
    FreeSpinResultPopup : 'sfx/slot/wb/wbFsResult.mp3',
    FreeSpinIntro       : 'sfx/slot/wb/wbFsIntro.mp3',
    FreeSpinSticky      : 'sfx/slot/wb/wbFsWildSticky.mp3'
};
window.g_sndWildBuffalo = ResPack.create( 'sndWildBuffalo', sndWildBuffalo ).concat( g_sfxSlotCommon );

/**
 * FuWaFuBao
 * */
window.sndFuWaFuBao = {

    Spin:         'sfx/slot/ff/ffSpin.mp3',
    ReelStop:     'sfx/slot/ff/ffReelStop.mp3',
    //Bgm:          'sfx/slot/ff/ffBgm.mp3',
    MPayCount:    'sfx/slot/ff/ffMPayCount.mp3',
    NPayCount01:    'sfx/slot/ff/ffNPayCount01.mp3',
    NPayCount01End: 'sfx/slot/ff/ffNPayCount01End.mp3',
    NPayCount02:	'sfx/slot/ff/ffNPayCount02.mp3',
    //NPayCount02End: 'sfx/slot/ff/ffNPayCount02End.mp3',
    NPayCount03:	'sfx/slot/ff/ffNPayCount03.mp3',
    //NPayCount03End: 'sfx/slot/ff/ffNPayCount03End.mp3',
    Reel01:         'sfx/slot/ff/ffReel01.mp3',
    Reel02:         'sfx/slot/ff/ffReel02.mp3',
    Reel03:         'sfx/slot/ff/ffReel03.mp3',
    MajorPopup:     'sfx/slot/ff/ffMajorPopup.mp3',
    Longspin:      'sfx/slot/ff/ffSLongspin.mp3',
    Locking01:     'sfx/slot/ff/ffSLocking01.mp3',
    Locking02:     'sfx/slot/ff/ffSLocking02.mp3',
    Locking03:     'sfx/slot/ff/ffSLocking03.mp3',
    Locking04:     'sfx/slot/ff/ffSLocking04.mp3',
    Locking05:     'sfx/slot/ff/ffSLocking05.mp3',
    Match:		   'sfx/slot/ff/ffSMatch.mp3',
    JackpotPopup:  'sfx/slot/ff/ffJackpotPopup.mp3',
    WildTrail:	   'sfx/slot/ff/ffWildTrail.mp3',
    Firework:      'sfx/slot/ff/ffFirework.mp3',
    FreespinIntro: 'sfx/slot/ff/ffFsIntro.mp3',
    FreespinOver:  'sfx/slot/ff/ffFsOver.mp3',
    FreespinPick:  'sfx/slot/ff/ffFsPick.mp3',
    //FreespinPuIntro: 'sfx/slot/ff/ffFsPuIntro.mp3',
    //FreespinPuBgm:   'sfx/slot/ff/ffFsPuBgm.mp3',
    //FreespinPuResult:'sfx/slot/ff/ffFsPuResult.mp3',
    WildSticky:      'sfx/slot/ff/ffFsWildSticky.mp3',
    FubaoIntro01:    'sfx/slot/ff/ffFsIntro01.mp3',
    FubaoFreespinBgm:'sfx/slot/ff/ffFsBgm01.mp3',
    FubaoFreespinResult: 'sfx/slot/ff/ffFsResult01.mp3',
    FuwaIntro01:         'sfx/slot/ff/ffFsIntro02.mp3',
    FuwaFreespinBgm:     'sfx/slot/ff/ffFsBgm02.mp3',
    FuwaFreespinResult:  'sfx/slot/ff/ffFsResult02.mp3',
    BonusIntro:		     'sfx/slot/ff/ffBoIntro.mp3',
    BonusPick:           'sfx/slot/ff/ffBoPick.mp3',
    BounsPickOver:       'sfx/slot/ff/ffBoPickOver.mp3',
    BounsMatch:          'sfx/slot/ff/ffBoMatch.mp3',
    ChangeBetHigh    : 'sfx/slot_Common/IntroBet01.mp3',
    ChangeBetLow     : 'sfx/slot_Common/IntroBet02.mp3',
};
window.g_sndFuWaFuBao = ResPack.create( 'sndFuWaFuBao', sndFuWaFuBao ).concat( g_sfxSlotCommon );

//-- ↓↓↓ FairyMischief ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFairyMischief    = {
    Spin                 : 'sfx/slot/fc/fcSpin.mp3',
    ReelStop             : 'sfx/slot/fc/fcReelStop.mp3',
    MPayCount        : 'sfx/slot/fc/fcMPayCount.mp3',
    NPayCount01   : 'sfx/slot/fc/fcNPayCount01.mp3',
    NPayCount01End	 : 'sfx/slot/fc/fcNPayCount01End.mp3',
    NPayCount02   : 'sfx/slot/fc/fcNPayCount02.mp3',
    NPayCount02End	 : 'sfx/slot/fc/fcNPayCount02End.mp3',
    NPayCount03   : 'sfx/slot/fc/fcNPayCount03.mp3',
    NPayCount03End	 : 'sfx/slot/fc/fcNPayCount03End.mp3',
    LongSpin             : 'sfx/slot/fc/fcLongspin.mp3',
    ScatterLocking01     : 'sfx/slot/fc/fcSLocking01.mp3',
    ScatterLocking02     : 'sfx/slot/fc/fcSLocking02.mp3',
    ScatterLocking03     : 'sfx/slot/fc/fcSLocking03.mp3',
    JackpotPopup         : 'sfx/slot/fc/fcJackpotPopup.mp3',
    MajorWinPopup        : 'sfx/slot/fc/fcMajorPopup.mp3',
    ScatterMatch         : 'sfx/slot/fc/fcSMatch.mp3',

    // bgm
    Bgm              : 'sfx/slot/fc/fcBgm.mp3',
    FreeSpinBgm      : 'sfx/slot/fc/fcFsBgm.mp3',

    FreeSpinStart    : 'sfx/slot/fc/fcFsStart.mp3',
    FreeSpinIntro	 : 'sfx/slot/fc/fcFsIntro.mp3',
    FreeSpinResult   : 'sfx/slot/fc/fcFsResult.mp3',

    // big Symbol
    BigSymbolEffect	 : 'sfx/slot/fc/fcSymExtend.mp3',
    Pick			 : 'sfx/slot/fc/fcFsPick.mp3',
    PickIntro		 : 'sfx/slot/fc/fcFsPickIntro.mp3',
    PickOver		 : 'sfx/slot/fc/fcFsPickOver.mp3',
    PickNormal		 : 'sfx/slot/fc/fcFsPick02.mp3',
    PickMystery		 : 'sfx/slot/fc/fcFsMystery.mp3'
};
window.g_sndFairyMischief  = ResPack.create( 'sndFairyMischief', sndFairyMischief ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FairyMischief_END ↑↑↑ -------------------------------------------------------------------------------------//

window.sndShiningLink = {
    Spin	             : 'sfx/slot/dl/dlSpin.mp3',
    ReelStop	         : 'sfx/slot/dl/dlReelStop.mp3',
    MajorPayCount	     : 'sfx/slot/dl/dlMPayCount.mp3',
    NormalPayCounting1   : 'sfx/slot/dl/dlNPayCount01.mp3',
    NormalPayCountEnd1	 : 'sfx/slot/dl/dlNPayCount01End.mp3',
    NormalPayCounting2   : 'sfx/slot/dl/dlNPayCount02.mp3',
    NormalPayCountEnd2	 : 'sfx/slot/dl/dlNPayCount02End.mp3',
    NormalPayCounting3   : 'sfx/slot/dl/dlNPayCount03.mp3',
    NormalPayCountEnd3	 : 'sfx/slot/dl/dlNPayCount03End.mp3',
    LongSpin	         : 'sfx/slot/dl/dlSLongspin.mp3',
    ScatterLocking01	 : 'sfx/slot/dl/dlSLocking01.mp3',
    ScatterLocking02	 : 'sfx/slot/dl/dlSLocking02.mp3',
    ScatterLocking03	 : 'sfx/slot/dl/dlSLocking03.mp3',
    DiamondLocking		 : 'sfx/slot/dl/dlJLWinLocking.mp3',
    JackpotPopup	     : 'sfx/slot/dl/dlJackpotPopup.mp3',
    MajorWinPopup        : 'sfx/slot/dl/dlMajorPopup.mp3',
    Reel01		         : 'sfx/slot/dl/dlReel01.mp3',
    Reel02	             : 'sfx/slot/dl/dlReel02.mp3',
    Reel03	             : 'sfx/slot/dl/dlReel03.mp3',
    ScatterMatch	     : 'sfx/slot/dl/dlSMatch.mp3',
    LinkMatch            : 'sfx/slot/dl/dlLMatch.mp3',

    // bgm
    Bgm        : 'sfx/slot/dl/dlBgm.mp3',
    LinkBgm    : 'sfx/slot/dl/dlLinkBgm.mp3',
    FreeSpinBgm: 'sfx/slot/dl/dlFsBgm.mp3',

    LinkGameIntro : 'sfx/slot/dl/dlLinkIntro.mp3',

    FreeSpinResult : 'sfx/slot/dl/dlFsResult.mp3',
    LinkGameResult : 'sfx/slot/dl/dlLinkResult.mp3',

    // link game
    LinkDiamondLocking	 : 'sfx/slot/dl/dlLinkSymLocking.mp3',
    DirectLocking		 : 'sfx/slot/dl/dlLinkDSymLocking.mp3',
    PaySum				 : 'sfx/slot/dl/dlLinkWinSum.mp3',
    JackpotSum			 : 'sfx/slot/dl/dlLinkJSymWinSum.mp3',
    LinkGameCountReset	 : 'sfx/slot/dl/dlLinkReset.mp3',
    LinkReelStop		 : 'sfx/slot/dl/dlLinkReelStop.mp3',
    LinkGameIntroLocking : 'sfx/slot/dl/dlLinkIntroLock.mp3',
    SpinStart			 : 'sfx/slot/dl/dlLinkReelStart.mp3',
    FirstSpin			 : 'sfx/slot/dl/dlLinkFirstspin.mp3',
    LastSpin			 : 'sfx/slot/dl/dlLinkLastspin.mp3'
};
window.g_sndShiningLink = ResPack.create( 'sndShiningLink', sndShiningLink ).concat( g_sfxSlotCommon );

/////////////////////////////////////////////////////////////////////////////////////////
///GoldSpin
window.sndGoldSpin = {
    //bgm
    Bgm      :  'sfx/slot/gos/gosBgm.mp3',
    WheelBgm :  'sfx/slot/gos/gosWheelBgm.mp3',

    //normal game
    Spin      : 'sfx/slot/gos/gosSpin.mp3',
    ReelStop  : 'sfx/slot/gos/gosReelStop.mp3',
    MajorPayCount : 'sfx/slot/gos/gosMPayCount.mp3',
    NormalPayCount01: 'sfx/slot/gos/gosNPayCount01.mp3',
    NormalPayCount02: 'sfx/slot/gos/gosNPayCount02.mp3',
    NormalPayCount03: 'sfx/slot/gos/gosNPayCount03.mp3',
    NormalPayCountEnd01: 'sfx/slot/gos/gosNPayCount01End.mp3',
    NormalPayCountEnd02: 'sfx/slot/gos/gosNPayCount02End.mp3',
    NormalPayCountEnd03: 'sfx/slot/gos/gosNPayCount03End.mp3',

    Reel01 : 'sfx/slot/gos/gosReel01.mp3',
    Reel02 : 'sfx/slot/gos/gosReel02.mp3',
    Reel03 : 'sfx/slot/gos/gosReel03.mp3',

    //wheel game
    MajorPopUp: 'sfx/slot/gos/gosMajorPopup.mp3',
    JackpotPopUp: 'sfx/slot/gos/gosJackpotPopup.mp3',
    WheelSpin   : 'sfx/slot/gos/gosWheelSpin.mp3',
    WheelWin    : 'sfx/slot/gos/gosWheelWin.mp3',
    WheelResultPopup : 'sfx/slot/gos/gosWheelResult.mp3',
    WheelMulti : 'sfx/slot/gos/gosWheelResultMulti.mp3',
    WheelRespin: 'sfx/slot/gos/gosWheelRespin.mp3',

    //longspin
    LongSpin : 'sfx/slot/gos/gosLongspin.mp3',
    Locking01: 'sfx/slot/gos/gosSLocking01.mp3',
    Locking02: 'sfx/slot/gos/gosSLocking02.mp3',
    Locking03: 'sfx/slot/gos/gosSLocking03.mp3',

    //scatter
    SpinMatch : 'sfx/slot/gos/gosSMatch.mp3',
    SpinTrail : 'sfx/slot/gos/gosSsymTrail.mp3',

    //pot
    PotToThePick : 'sfx/slot/gos/gosBoIntro.mp3',

    //pick
    PickBoardPopup :'sfx/slot/gos/gosBoPickPopup.mp3',
    CoinPick : 'sfx/slot/gos/gosBoPick.mp3',
    CoinOver : 'sfx/slot/gos/gosBoPickOver.mp3',
    CoinMatch: 'sfx/slot/gos/gosBoMatch.mp3',

    //Counting
    ResultCount: 'sfx/slot/gos/gosMultiPayCount.mp3'

};
window.g_sndGoldSpin = ResPack.create( 'sndGoldSpin', sndGoldSpin ).concat( g_sfxSlotCommon );

window.sndGoldenClovers = {
    Spin             : 'sfx/slot/gc/gcSpin.mp3',
    ReelStop         : 'sfx/slot/gc/gcReelStop.mp3',
    MajorPayCount    : 'sfx/slot/gc/gcMPayCount.mp3',
    NormalPayCounting1   : 'sfx/slot/gc/gcNPayCount01.mp3',
    NormalPayCountEnd1	 : 'sfx/slot/gc/gcNPayCount01End.mp3',
    NormalPayCounting2   : 'sfx/slot/gc/gcNPayCount02.mp3',
    NormalPayCountEnd2	 : 'sfx/slot/gc/gcNPayCount02End.mp3',
    NormalPayCounting3   : 'sfx/slot/gc/gcNPayCount03.mp3',
    NormalPayCountEnd3	 : 'sfx/slot/gc/gcNPayCount03End.mp3',
    LongSpin         : 'sfx/slot/gc/gcSLongspin.mp3',
    ScatterLocking01 : 'sfx/slot/gc/gcSLocking01.mp3',
    ScatterLocking02 : 'sfx/slot/gc/gcSLocking02.mp3',
    ScatterLocking03 : 'sfx/slot/gc/gcSLocking03.mp3',
    JackpotPopup     : 'sfx/slot/gc/gcJackpotPopup.mp3',
    MajorWinPopup    : 'sfx/slot/gc/gcMajorPopup.mp3',
    ScatterMatch     : 'sfx/slot/gc/gcSMatch.mp3',
    GoldReelMatch01   : 'sfx/slot/gc/gcGoldReelMatch01.mp3',
    GoldReelMatch02   : 'sfx/slot/gc/gcGoldReelMatch02.mp3',
    GoldReelMatch03   : 'sfx/slot/gc/gcGoldReelMatch03.mp3',
    RainbowSpinStart  : 'sfx/slot/gc/gcRainbowSpinStart.mp3',
    GoldReelChange    : 'sfx/slot/gc/gcGoldReelChange.mp3',

    // bgm
    Bgm        : 'sfx/slot/gc/gcBgm.mp3',

    // pickGame
    PickGameIntro	 : 'sfx/slot/gc/gcBoIntro.mp3',
    PickGameBgm		 : 'sfx/slot/gc/gcBoBgm.mp3',
    PickGamePick	 : 'sfx/slot/gc/gcBoPick.mp3',
    PickGrand 		 : 'sfx/slot/gc/gcBoGrandPick.mp3',
    PickOver 		 : 'sfx/slot/gc/gcBoPickOver.mp3',
    PickMatch		 : 'sfx/slot/gc/gcBoMatch.mp3',

    //freeSpin
    FreeSpinIntro	 : 'sfx/slot/gc/gcFsIntro.mp3',
    FreeSpinBgm 	 : 'sfx/slot/gc/gcFsBgm.mp3',
    FreeSpinRainbow  : 'sfx/slot/gc/gcFsRainbow.mp3',
    PickAddCount	 : 'sfx/slot/gc/gcFsJPCount.mp3',
    FreeSpinResult 	 : 'sfx/slot/gc/gcFsResult.mp3',

    // rainbow
    RainbowON 		: 'sfx/slot_Common/IntroBet01.mp3',
    RainbowOff		:  'sfx/slot_Common/IntroBet02.mp3'
};
window.g_sndGoldenClovers = ResPack.create( 'sndGoldenClovers', sndGoldenClovers ).concat( g_sfxSlotCommon );

//-- ↓↓↓ VegasQueens ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndVegasQueens    = {
    Spin                 : 'sfx/slot/vq/vqSpin.mp3',
    ReelStop             : 'sfx/slot/vq/vqReelStop.mp3',
    MPayCount        : 'sfx/slot/vq/vqMPayCount.mp3',
    NPayCount01   : 'sfx/slot/vq/vqNPayCount01.mp3',
    NPayCount01End	 : 'sfx/slot/vq/vqNPayCount01End.mp3',
    NPayCount02   : 'sfx/slot/vq/vqNPayCount02.mp3',
    NPayCount02End	 : 'sfx/slot/vq/vqNPayCount02End.mp3',
    NPayCount03   : 'sfx/slot/vq/vqNPayCount03.mp3',
    NPayCount03End	 : 'sfx/slot/vq/vqNPayCount03End.mp3',
    LongSpin             : 'sfx/slot/vq/vqLongspin.mp3',
    ScatterLocking01     : 'sfx/slot/vq/vqSLocking01.mp3',
    ScatterLocking02     : 'sfx/slot/vq/vqSLocking02.mp3',
    ScatterLocking03     : 'sfx/slot/vq/vqSLocking03.mp3',
    ScatterLocking04     : 'sfx/slot/vq/vqSLocking04.mp3',
    ScatterLocking05     : 'sfx/slot/vq/vqSLocking05.mp3',
    ScatterLocking06     : 'sfx/slot/vq/vqSLocking06.mp3',
    JackpotPopup         : 'sfx/slot/vq/vqJackpotPopup.mp3',
    MajorWinPopup        : 'sfx/slot/vq/vqMajorPopup.mp3',
    ScatterMatch         : 'sfx/slot/vq/vqSMatch.mp3',

    // bgm
    Bgm             	 : 'sfx/slot/vq/vqBgm.mp3',
    FreeSpinBgm     	 : 'sfx/slot/vq/vqFsBgm.mp3',

    //FreeSpinIntro  		 : 'sfx/slot/vq/vqFsIntro.mp3',
    FreeSpinResult   	 : 'sfx/slot/vq/vqFsResult.mp3',
    FreeSpinOpen	   	 : 'sfx/slot/vq/vqSsymReveal.mp3',
    FreeSpinCount01	   	 : 'sfx/slot/vq/vqFsCount01.mp3',
    //FreeSpinCount02	   	 : 'sfx/slot/vq/vqFsCount02.mp3',
    //FreeSpinCount03	   	 : 'sfx/slot/vq/vqFsCount03.mp3',
    FreeSpinCount04	   	 : 'sfx/slot/vq/vqFsCount04.mp3',
    FreeSpinSticky	   	 : 'sfx/slot/vq/vqFsWSticky.mp3',

    // big Symbol
    BigSymbolEffect		 : 'sfx/slot/vq/vqSymExtend.mp3',
    Pick				 : 'sfx/slot/vq/vqBoPick.mp3',
    PickIntro			 : 'sfx/slot/vq/vqBoIntro.mp3',
    PickOver			 : 'sfx/slot/vq/vqBoPickOver.mp3',
    PickMatch 			 : 'sfx/slot/vq/vqBoMatch.mp3',
    PickMove 			 : 'sfx/slot/vq/vqBoMulti.mp3',
    PickResultCount		 : 'sfx/slot/vq/vqBoCount.mp3',
    //PickResult 			 : 'sfx/slot/vq/vqBoPickPopup.mp3',
    Trail				 : 'sfx/slot/vq/vqSymTrail.mp3'
};
window.g_sndVegasQueens  = ResPack.create( 'sndVegasQueens', sndVegasQueens ).concat( g_sfxSlotCommon );

//-- ↓↓↓ FishingMaster2 ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFishingMaster2    = {
    // intro
    Intro	                 : 'sfx/slot/fm2/fm2Intro.mp3',

    // spin
    Spin	                 : 'sfx/slot/fm2/fm2Spin.mp3',
    LongSpin	             : 'sfx/slot/fm2/fm2Longspin.mp3',

    // free spin
    FreeSpinResult			 : 'sfx/slot/fm2/fm2FsResult.mp3',

    // pay count
    MajorPayCount		     : 'sfx/slot/fm2/fm2MPayCount.mp3',
    NormalPayCounting1		 : 'sfx/slot/fm2/fm2NPayCount01.mp3',
    NormalPayCountEnd1		 : 'sfx/slot/fm2/fm2NPayCount01End.mp3',
    NormalPayCounting2		 : 'sfx/slot/fm2/fm2NPayCount02.mp3',
    NormalPayCountEnd2		 : 'sfx/slot/fm2/fm2NPayCount02End.mp3',
    NormalPayCounting3		 : 'sfx/slot/fm2/fm2NPayCount03.mp3',
    NormalPayCountEnd3		 : 'sfx/slot/fm2/fm2NPayCount03End.mp3',

    // overlay
    OverlayMatch			 : 'sfx/slot/fm2/fm2BoMatch.mp3',
    OverlayLocking01		 : 'sfx/slot/fm2/fm2BoLocking01.mp3',
    OverlayLocking02		 : 'sfx/slot/fm2/fm2BoLocking02.mp3',
    OverlayLocking03		 : 'sfx/slot/fm2/fm2BoLocking03.mp3',

    // popup
    MajorWinPopup			 : 'sfx/slot/fm2/fm2MPopup.mp3',
    JackpotPopup	         : 'sfx/slot/fm2/fm2JackpotPopup.mp3',

    // reel
    ReelStop	             : 'sfx/slot/fm2/fm2ReelStop.mp3',
    Reel01		             : 'sfx/slot/fm2/fm2Reel.mp3',
    Reel02		             : 'sfx/slot/fm2/fm2Reel2.mp3',
    Reel03		             : 'sfx/slot/fm2/fm2Reel3.mp3',

    // bgm
    // Bgm			             : 'sfx/slot/fm2/fm2Bgm.mp3',
    FreeSpinBgm			     : 'sfx/slot/fm2/fm2FsBgm.mp3',
    BonusGameBgm			 : 'sfx/slot/fm2/fm2BoBgm.mp3',

    // big Symbol
    BigSymbolEffect			 : 'sfx/slot/fm2/fm2SymExtend.mp3',

    // pick mode
    BonusPickIntro			 : 'sfx/slot/fm2/fm2BoIntro.mp3',
    BonusPick				 : 'sfx/slot/fm2/fm2Pick.mp3',
    BonusPickOver			 : 'sfx/slot/fm2/fm2PickOver.mp3',

    BobberPickIntro			 : 'sfx/slot/fm2/fm2Bo2Intro.mp3',
    BobberPick				 : 'sfx/slot/fm2/fm2Pick.mp3',
    BobberPickOver			 : 'sfx/slot/fm2/fm2PickOver.mp3',

    // fishing game
    FishingCatchStart01		 : 'sfx/slot/fm2/fm2BoFish.mp3',
    FishingCatchStart02		 : 'sfx/slot/fm2/fm2BoFish2.mp3',
    FishingCatchStart03		 : 'sfx/slot/fm2/fm2BoFish3.mp3',
    FishingCatchEnd01		 : 'sfx/slot/fm2/fm2BoFishEnd01.mp3',
    FishingCatchEnd02		 : 'sfx/slot/fm2/fm2BoFishEnd02.mp3',
    FishingCatchEnd03		 : 'sfx/slot/fm2/fm2BoFishEnd03.mp3',
    FishingCatchEnd04		 : 'sfx/slot/fm2/fm2BoFishEnd04.mp3',
    FishingGetCash			 : 'sfx/slot/fm2/fm2BoFishCount.mp3',
    FishingLodCount			 : 'sfx/slot/fm2/fm2BoRodMinus.mp3',
    FishingGameResult		 : 'sfx/slot/fm2/fm2BoResult.mp3',

    // item
    ItemMultiple			 : 'sfx/slot/fm2/fm2FsMulti.mp3',
    ItemMultipleApply		 : 'sfx/slot/fm2/fm2FsMulti02.mp3',
    ItemWildReel			 : 'sfx/slot/fm2/fm2FsWildReel.mp3',
    ItemFreeSpin			 : 'sfx/slot/fm2/fm2FsCountUp.mp3'
};
window.g_sndFishingMaster2  = ResPack.create( 'sndFishingMaster2', sndFishingMaster2 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FishingMaster2_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ LuckyLamp ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndLuckyLamp    = {

    NormalBgm           :'sfx/slot/ll/llBgm.mp3',
    FreeSpinBgm         :'sfx/slot/ll/llFsBgm.mp3',
    PickGameBgm         :'sfx/slot/ll/llBoBgm.mp3',

    Spin                :'sfx/slot/ll/llSpin.mp3',
    ReelStop            :'sfx/slot/ll/llReelStop.mp3',
    PayCount01          :'sfx/slot/ll/llNPayCount01.mp3',
    PayCount02          :'sfx/slot/ll/llNPayCount02.mp3',
    PayCount03          :'sfx/slot/ll/llNPayCount03.mp3',
    PayCountEnd01       :'sfx/slot/ll/llNPayCount01End.mp3',
    PayCountEnd02       :'sfx/slot/ll/llNPayCount02End.mp3',
    PayCountEnd03       :'sfx/slot/ll/llNPayCount03End.mp3',

    MPayCount           :'sfx/slot/ll/llMPayCount.mp3',
    MPopUp              :'sfx/slot/ll/llMPopup.mp3',
    JackpotPopUp        :'sfx/slot/ll/llJackpotPopup.mp3',

    Extend              :'sfx/slot/ll/llSymExtend.mp3',
    Trail               :'sfx/slot/ll/llSymTrail.mp3',
    Trail2              :'sfx/slot/ll/llSymTrail2.mp3',
    LongSpin            :'sfx/slot/ll/llLongspin.mp3',

    PickIntro           :'sfx/slot/ll/llBoIntro.mp3',
    PickOver            :'sfx/slot/ll/llBoPickOver.mp3',
    Pick                :'sfx/slot/ll/llBoPick.mp3',
    Pickx2              :'sfx/slot/ll/llBoMultiplier.mp3',
    PickDoubleMatch     :'sfx/slot/ll/llBoMatch01.mp3',
    PickThreeMatch      :'sfx/slot/ll/llBoMatch02.mp3',

    Flip01              :'sfx/slot/ll/llSymFilp01.mp3',
    Flip02              :'sfx/slot/ll/llSymFilp02.mp3',

    FreeSpinMatch       :'sfx/slot/ll/llFsMatch.mp3',
    FreeSpinIntro       :'sfx/slot/ll/llFsIntro.mp3',
    FreeSpinResult      :'sfx/slot/ll/llFsResult.mp3',

    ScatterIntro        :'sfx/slot/ll/llSIntro.mp3',
    ScatterLocking01    :'sfx/slot/ll/llSLocking01.mp3',
    ScatterLocking02    :'sfx/slot/ll/llSLocking02.mp3',
    ScatterLocking03    :'sfx/slot/ll/llSLocking03.mp3',

    Lucky01             :'sfx/slot/ll/llFsLucky01.mp3',
    Lucky02             :'sfx/slot/ll/llFsLucky02.mp3'

};
window.g_sndLuckyLamp  = ResPack.create( 'sndLuckyLamp', sndLuckyLamp ).concat( g_sfxSlotCommon );
//-- ↑↑↑ LuckyLamp_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ GreatEmpire ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndGreatEmpire    = {

    // spingt
    Spin	                 : 'sfx/slot/gt/gtSpin.mp3',
    LongSpin	             : 'sfx/slot/gt/gtLongspin.mp3',

    // free spin
    FreeSpinResult			 : 'sfx/slot/gt/gtFsResult.mp3',
    FreeSpinMatch			 : 'sfx/slot/gt/gtFsMatch.mp3',

    // pay count
    MajorPayCount		     : 'sfx/slot/gt/gtMPayCount.mp3',
    NormalPayCounting1		 : 'sfx/slot/gt/gtNPayCount01.mp3',
    NormalPayCountEnd1		 : 'sfx/slot/gt/gtNPayCount01End.mp3',
    NormalPayCounting2		 : 'sfx/slot/gt/gtNPayCount02.mp3',
    NormalPayCountEnd2		 : 'sfx/slot/gt/gtNPayCount02End.mp3',
    NormalPayCounting3		 : 'sfx/slot/gt/gtNPayCount03.mp3',
    NormalPayCountEnd3		 : 'sfx/slot/gt/gtNPayCount03End.mp3',

    // popup
    MajorWinPopup			 : 'sfx/slot/gt/gtMajorPopup.mp3',
    JackpotPopup	         : 'sfx/slot/gt/gtJackpotPopup.mp3',

    // reel
    ReelStop	             : 'sfx/slot/gt/gtReelStop.mp3',
    Mystery		             : 'sfx/slot/gt/gtMystery.mp3',
    Trail		             : 'sfx/slot/gt/gtTrail.mp3',

    ScatterLocking01  	     : 'sfx/slot/gt/gtFsLocking01.mp3',
    ScatterLocking02   	     : 'sfx/slot/gt/gtFsLocking02.mp3',
    ScatterLocking03  	     : 'sfx/slot/gt/gtFsLocking03.mp3',

    // bgm
    Bgm			   			 : 'sfx/slot/gt/gtBgm.mp3',
    FreeSpinBgm				 : 'sfx/slot/gt/gtFsBgm.mp3',
    LinkGameBgm				 : 'sfx/slot/gt/gtLinkBgm.mp3',

    //linkGame
    // LinkGameIntro   	     : 'sfx/slot/gt/gtLinkPopup.mp3',
    LinkGameResult   	     : 'sfx/slot/gt/gtLinkResult.mp3',
    LinkGameDirectLocking    : 'sfx/slot/gt/gtLinkDSymLocking.mp3',
    LinkGameMatch   	     : 'sfx/slot/gt/gtLinkMatch.mp3',
    LinkGameReset   	     : 'sfx/slot/gt/gtLinkReset.mp3',
    LinkGameCollect   	     : 'sfx/slot/gt/gtLinkCollect.mp3',
    LinkGameLastSpin         : 'sfx/slot/gt/gtLinkLastspin.mp3',
    LinkGameChange           : 'sfx/slot/gt/gtLinkChange.mp3',

    // big Symbol
    BigSymbolEffect			 : 'sfx/slot/gt/gtSymExtend.mp3',

    // pick mode
    PickGameIntro			 : 'sfx/slot/gt/gtBonusIntro.mp3',
    Pick					 : 'sfx/slot/gt/gtBonusPick.mp3',
    BonusPickOver			 : 'sfx/slot/gt/gtBonusOver.mp3',
    PickCollect			 	 : 'sfx/slot/gt/gtBonusCollect.mp3',
    PickUp					 : 'sfx/slot/gt/gtBonusUp.mp3',
    PickUpToJackpot			 : 'sfx/slot/gt/gtBonusUpJackpot.mp3',
    PickUpgrade              : 'sfx/slot/gt/gtBonusUpgrade.mp3'
};
window.g_sndGreatEmpire  = ResPack.create( 'sndGreatEmpire', sndGreatEmpire ).concat( g_sfxSlotCommon );
//-- ↑↑↑ GreatEmpire_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ CaptainShark ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndCaptainShark    = {

    // spingt
    Spin	                 : 'sfx/slot/cs/csSpin.mp3',
    LongSpin	             : 'sfx/slot/cs/csLongspin.mp3',

    // pay count
    MajorPayCount		     : 'sfx/slot/cs/csMPayCount.mp3',
    NormalPayCounting1		 : 'sfx/slot/cs/csNPayCount01.mp3',
    NormalPayCountEnd1		 : 'sfx/slot/cs/csNPayCount01End.mp3',
    NormalPayCounting2		 : 'sfx/slot/cs/csNPayCount02.mp3',
    NormalPayCountEnd2		 : 'sfx/slot/cs/csNPayCount02End.mp3',
    NormalPayCounting3		 : 'sfx/slot/cs/csNPayCount03.mp3',
    NormalPayCountEnd3		 : 'sfx/slot/cs/csNPayCount03End.mp3',

    // popup
    MajorWinPopup			 : 'sfx/slot/cs/csMajorPopup.mp3',
    JackpotPopup	         : 'sfx/slot/cs/csJackpotPopup.mp3',
    RespinIntro				 : 'sfx/slot/cs/csRespinPopup.mp3',
    BetChangePopup			 : 'sfx/slot/cs/csBetPopup.mp3',
    FreeSpinIntro			 : 'sfx/slot/cs/csFsPopup.mp3',
    FreeSpinResultPopup		 : 'sfx/slot/cs/csFsResult.mp3',

    SharkLocking			 : 'sfx/slot/cs/csJSymLocking.mp3',
    SharkLink				 : 'sfx/slot/cs/csLink.mp3',
    SharkSticky				 : 'sfx/slot/cs/csFsSticky.mp3',

    ReelStop	             : 'sfx/slot/cs/csReelStop.mp3',
    Trail01		             : 'sfx/slot/cs/csTrail01.mp3',
    Trail02		             : 'sfx/slot/cs/csTrail02.mp3',
    Pot		             	 : 'sfx/slot/cs/csPot.mp3',

    // bgm
    Bgm			   			 : 'sfx/slot/cs/csBgm.mp3',
    FreeSpinBgm				 : 'sfx/slot/cs/csFsBgm.mp3',
    RespinBgm				 : 'sfx/slot/cs/csRespinBgm.mp3'
};
window.g_sndCaptainShark  = ResPack.create( 'sndCaptainShark', sndCaptainShark ).concat( g_sfxSlotCommon );
//-- ↑↑↑ CaptainShark_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ FortuneTree ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFortuneTree = {
    // -- BGM
    Bgm                : 'sfx/slot/ft/ftBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/ft/ftFsBgm.mp3',
    PickGameBgm        : 'sfx/slot/ft/ftBonusBgm.mp3',

    // -- Spin
    Spin               : 'sfx/slot/ft/ftSpin.mp3',
    ReelStop           : 'sfx/slot/ft/ftReelStop.mp3',
    ScatterLocking01   : 'sfx/slot/ft/ftFsLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/ft/ftFsLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/ft/ftFsLocking03.mp3',
    ScatterMatch       : 'sfx/slot/ft/ftFsMatch.mp3',
    QuickHitLocking    : 'sfx/slot/ft/ftBonusLocking.mp3',
    LongSpin           : 'sfx/slot/ft/ftLongSpin.mp3',

    // -- Counting
    MajorPayCount      : 'sfx/slot/ft/ftMPayCount.mp3',
    NormalPayCounting1 : 'sfx/slot/ft/ftNPayCount01.mp3',
    NormalPayCountEnd1 : 'sfx/slot/ft/ftNPayCount01End.mp3',
    NormalPayCounting2 : 'sfx/slot/ft/ftNPayCount02.mp3',
    NormalPayCountEnd2 : 'sfx/slot/ft/ftNPayCount02End.mp3',
    NormalPayCounting3 : 'sfx/slot/ft/ftNPayCount03.mp3',
    NormalPayCountEnd3 : 'sfx/slot/ft/ftNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup      : 'sfx/slot/ft/ftMajorPopup.mp3',
    JackpotPopup 	   : 'sfx/slot/ft/ftJackpotPopup.mp3',
    FreeSpinIntroPopup : 'sfx/slot/ft/ftFsIntro.mp3',
    FreeSpinResultPopup: 'sfx/slot/ft/ftFsIntro.mp3',
    PickGameIntroPopup : 'sfx/slot/ft/ftBonusIntro.mp3',

    // -- Pot
    PotTrail           : 'sfx/slot/ft/ftBonusTrail.mp3',

    // -- Tree
    TreeSymbolDrop01     : 'sfx/slot/ft/ftTreeSymDrop01.mp3',
    TreeSymbolDrop02     : 'sfx/slot/ft/ftTreeSymDrop02.mp3',

    // -- FreeSpin
    FreeSpinCountAdd01   : 'sfx/slot/ft/ftFsCountAdd01.mp3',
    FreeSpinCountAdd02   : 'sfx/slot/ft/ftFsCountAdd02.mp3',

    // -- PickGame
    PickGameCoinPick   : 'sfx/slot/ft/ftBonusPick.mp3',
    PickGameCoinOver   : 'sfx/slot/ft/ftBonusOver.mp3',
    PickGameCoinDouble : 'sfx/slot/ft/ftBonusMatch01.mp3',
    PickGameCoinMatch  : 'sfx/slot/ft/ftBonusMatch02.mp3'
};
window.g_sndFortuneTree = ResPack.create( 'sndFortuneTree', sndFortuneTree ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FortuneTree_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ JackpotRush ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndJackpotRush = {
    // -- BGM
    Bgm                : 'sfx/slot/jr/jrBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/jr/jrFsBgm.mp3',

    // -- Spin
    Spin               : 'sfx/slot/jr/jrSpin.mp3',
    Reel01             : 'sfx/slot/jr/jrReel01.mp3',
    Reel02             : 'sfx/slot/jr/jrReel02.mp3',
    Reel03             : 'sfx/slot/jr/jrReel03.mp3',
    ReelStop           : 'sfx/slot/jr/jrReelStop.mp3',
    ScatterLocking01   : 'sfx/slot/jr/jrScatterLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/jr/jrScatterLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/jr/jrScatterLocking03.mp3',
    ScatterMatch       : 'sfx/slot/jr/jrScatterMatch.mp3',
    JackpotLocking     : 'sfx/slot/jr/jrJackpotLocking.mp3',
    LongSpin           : 'sfx/slot/jr/jrLongSpin.mp3',

    // -- Counting
    MajorPayCount      : 'sfx/slot/jr/jrMPayCount.mp3',
    NormalPayCounting1 : 'sfx/slot/jr/jrNPayCount01.mp3',
    NormalPayCountEnd1 : 'sfx/slot/jr/jrNPayCount01End.mp3',
    NormalPayCounting2 : 'sfx/slot/jr/jrNPayCount02.mp3',
    NormalPayCountEnd2 : 'sfx/slot/jr/jrNPayCount02End.mp3',
    NormalPayCounting3 : 'sfx/slot/jr/jrNPayCount03.mp3',
    NormalPayCountEnd3 : 'sfx/slot/jr/jrNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup      : 'sfx/slot/jr/jrMajorPopup.mp3',
    JackpotPopup 	   : 'sfx/slot/jr/jrJackpotPopup.mp3',

    // -- Extra Reel
    ExtraReelActive    : 'sfx/slot/jr/jrExtraReelActive.mp3',
    // ExtraReelMove      : 'sfx/slot/jr/jrExtraReelMove.mp3',
    Rush               : 'sfx/slot/jr/jrRush.mp3',
    ExtraReelLock      : 'sfx/slot/jr/jrExtraReelLock.mp3',

    // -- FreeSpin
    FreeSpinIntro      : 'sfx/slot/jr/jrFsIntro.mp3',
    FreeSpinReelOpen   : 'sfx/slot/jr/jrFsReelOpen.mp3',
    FreeSpinResult     : 'sfx/slot/jr/jrFsResult.mp3'
};
window.g_sndJackpotRush = ResPack.create( 'sndJackpotRush', sndJackpotRush ).concat( g_sfxSlotCommon );
//-- ↑↑↑ JackpotRush_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ MrBillionaire ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndMrBillionaire = {
    // -- BGM
    Bgm                : 'sfx/slot/mr/mrBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/mr/mrFsBgm.mp3',
    Intro			   : 'sfx/slot/mr/mrIntro.mp3',

    // -- Spin
    Spin               : 'sfx/slot/mr/mrSpin.mp3',
    ReelStop           : 'sfx/slot/mr/mrReelStop.mp3',
    ScatterLocking01   : 'sfx/slot/mr/mrSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/mr/mrSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/mr/mrSLocking03.mp3',
    ScatterMatch       : 'sfx/slot/mr/mrSMatch.mp3',
    DirectLocking     : 'sfx/slot/mr/mrMWildLocking.mp3',
    JackpotLocking     : 'sfx/slot/mr/mrJWildLocking.mp3',
    LongSpin           : 'sfx/slot/mr/mrLongSpin.mp3',

    // -- Counting
    MPayCount      : 'sfx/slot/mr/mrMPayCount.mp3',
    NPayCount01 : 'sfx/slot/mr/mrNPayCount01.mp3',
    NPayCount01End : 'sfx/slot/mr/mrNPayCount01End.mp3',
    NPayCount02 : 'sfx/slot/mr/mrNPayCount02.mp3',
    NPayCount02End : 'sfx/slot/mr/mrNPayCount02End.mp3',
    NPayCount03 : 'sfx/slot/mr/mrNPayCount03.mp3',
    NPayCount03End : 'sfx/slot/mr/mrNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup      : 'sfx/slot/mr/mrMajorPopup.mp3',
    JackpotPopup 	   : 'sfx/slot/mr/mrJackpotPopup.mp3',

    // -- FreeSpin
    Trail			   : 'sfx/slot/mr/mrSuperTrail.mp3',
    CashVault		   : 'sfx/slot/mr/mrCashVaultReel.mp3',
    FreeSpinIntro      : 'sfx/slot/mr/mrFsIntro.mp3',
    FreeSpinSuperIntro : 'sfx/slot/mr/mrSuperFsIntro.mp3',
    FreeSpinResult     : 'sfx/slot/mr/mrFsResult.mp3',
    FreeSpinAdd        : 'sfx/slot/mr/mrFsRetrigger.mp3'
};
window.g_sndMrBillionaire = ResPack.create( 'sndMrBillionaire', sndMrBillionaire ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MrBillionaire_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ Triple Wolf ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTripleWolf = {
    // -- BGM
    Bgm                : 'sfx/slot/tw/twBgm.mp3',
    FreeSpinBgm        : 'sfx/slot/tw/twFsBgm.mp3',

    // -- Spin
    Spin               : 'sfx/slot/tw/twSpin.mp3',
    ReelStop           : 'sfx/slot/tw/twReelStop.mp3',
    // Reel1              : 'sfx/slot/tw/twReel01.mp3',
    // Reel2              : 'sfx/slot/tw/twReel02.mp3',
    // Reel3              : 'sfx/slot/tw/twReel03.mp3',
    ScatterLocking01   : 'sfx/slot/tw/twSLocking01.mp3',
    ScatterLocking02   : 'sfx/slot/tw/twSLocking02.mp3',
    ScatterLocking03   : 'sfx/slot/tw/twSLocking03.mp3',
    ScatterMatch       : 'sfx/slot/tw/twSMatch.mp3',
    BigSymbol          : 'sfx/slot/tw/twSymExtend.mp3',
    LongSpin           : 'sfx/slot/tw/twLongspin.mp3',

    // -- Counting
    MajorPayCount      : 'sfx/slot/tw/twMPayCount.mp3',
    NormalPayCounting1 : 'sfx/slot/tw/twNPayCount01.mp3',
    NormalPayCountEnd1 : 'sfx/slot/tw/twNPayCount01End.mp3',
    NormalPayCounting2 : 'sfx/slot/tw/twNPayCount02.mp3',
    NormalPayCountEnd2 : 'sfx/slot/tw/twNPayCount02End.mp3',
    NormalPayCounting3 : 'sfx/slot/tw/twNPayCount03.mp3',
    NormalPayCountEnd3 : 'sfx/slot/tw/twNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup      : 'sfx/slot/tw/twMajorPopup.mp3',
    JackpotPopup 	   : 'sfx/slot/tw/twJackpotPopup.mp3',
    FreeSpinIntroPopup : 'sfx/slot/tw/twFsIntro.mp3',
    FreeSpinResultPopup: 'sfx/slot/tw/twFsResult.mp3',
    PickGameResultPopup: 'sfx/slot/tw/twBoResult.mp3',

    // -- Pot
    PotTrail           : 'sfx/slot/tw/twSymTrail.mp3',

    // -- WheelGame
    WheelUp         : 'sfx/slot/tw/twWheelUp.mp3',
    WheelTurn       : 'sfx/slot/tw/twWheelTurn.mp3',
    WheelMatch      : 'sfx/slot/tw/twWheelMatch.mp3',
    WheelDown       : 'sfx/slot/tw/twWheelDown.mp3',

    // -- FreeSpin
    FreeSpinWild         : 'sfx/slot/tw/twFsWild.mp3',

    // -- PickGame
    PickGameIntro       : 'sfx/slot/tw/twBoIntro.mp3',
    PickGamePick        : 'sfx/slot/tw/twBoPick.mp3',
    PickGamePickOver    : 'sfx/slot/tw/twBoPickOver.mp3',
    PickGameCoinMatch   : 'sfx/slot/tw/twBoMatch.mp3'
};
window.g_sndTripleWolf = ResPack.create( 'sndTripleWolf', sndTripleWolf ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FortuneTree_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ VampiresRoses ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndVampiresRoses    = {
    Spin                 : 'sfx/slot/vr/vrSpin.mp3',
    ReelStop             : 'sfx/slot/vr/vrReelStop.mp3',
    MajorPayCount        : 'sfx/slot/vr/vrMPayCount.mp3',
    NormalPayCounting1   : 'sfx/slot/vr/vrNPayCount01.mp3',
    NormalPayCountEnd1	 : 'sfx/slot/vr/vrNPayCount01End.mp3',
    NormalPayCounting2   : 'sfx/slot/vr/vrNPayCount02.mp3',
    NormalPayCountEnd2	 : 'sfx/slot/vr/vrNPayCount02End.mp3',
    NormalPayCounting3   : 'sfx/slot/vr/vrNPayCount03.mp3',
    NormalPayCountEnd3	 : 'sfx/slot/vr/vrNPayCount03End.mp3',
    LongSpin             : 'sfx/slot/vr/vrLongspin.mp3',
    ScatterLocking01     : 'sfx/slot/vr/vrSLocking01.mp3',
    ScatterLocking02     : 'sfx/slot/vr/vrSLocking02.mp3',
    ScatterLocking03     : 'sfx/slot/vr/vrSLocking03.mp3',
    ScatterLocking04     : 'sfx/slot/vr/vrSLocking04.mp3',
    ScatterLocking05     : 'sfx/slot/vr/vrSLocking05.mp3',
    ScatterLocking06     : 'sfx/slot/vr/vrSLocking06.mp3',
    JackpotPopup         : 'sfx/slot/vr/vrJackpotPopup.mp3',
    MajorWinPopup        : 'sfx/slot/vr/vrMajorPopup.mp3',
    ScatterMatch         : 'sfx/slot/vr/vrSMatch.mp3',

    //Reel01 				 : 'sfx/slot/vq/vqReel01.mp3',
    //Reel02 				 : 'sfx/slot/vq/vqReel02.mp3',
    //Reel03 				 : 'sfx/slot/vq/vqReel03.mp3',

    // bgm
    Bgm             	 : 'sfx/slot/vr/vrBgm.mp3',
    FreeSpinBgm     	 : 'sfx/slot/vr/vrFsBgm.mp3',

    // FreeSpinIntro  		 : 'sfx/slot/vr/vrFsIntro.mp3',
    FreeSpinResult   	 : 'sfx/slot/vr/vrFsResult.mp3',
    FreeSpinOpen	   	 : 'sfx/slot/vr/vrSsymReveal.mp3',
    FreeSpinCount01	   	 : 'sfx/slot/vr/vrFsCount01.mp3',
    //FreeSpinCount02	   	 : 'sfx/slot/vq/vqFsCount02.mp3',
    //FreeSpinCount03	   	 : 'sfx/slot/vq/vqFsCount03.mp3',
    FreeSpinCount04	   	 : 'sfx/slot/vr/vrFsCount04.mp3',
    FreeSpinSticky	   	 : 'sfx/slot/vr/vrFsWSticky.mp3',

    // big Symbol
    BigSymbolEffect		 : 'sfx/slot/vr/vrSymExtend.mp3',
    Pick				 : 'sfx/slot/vr/vrBoPick.mp3',
    PickIntro			 : 'sfx/slot/vr/vrBoIntro.mp3',
    PickOver			 : 'sfx/slot/vr/vrBoPickOver.mp3',
    PickMatch 			 : 'sfx/slot/vr/vrBoMatch.mp3',
    PickMove 			 : 'sfx/slot/vr/vrBoMulti.mp3',
    PickResultCount		 : 'sfx/slot/vr/vrBoCount.mp3',
    //PickResult 			 : 'sfx/slot/vq/vqBoPickPopup.mp3',
    Trail				 : 'sfx/slot/vr/vrSymTrail.mp3',
    Spread			 	 : 'sfx/slot/vr/vrSymSpread.mp3'
};
window.g_sndVampiresRoses  = ResPack.create( 'sndVampiresRoses', sndVampiresRoses ).concat( g_sfxSlotCommon );
//-- ↑↑↑ VampiresRoses_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ Treasure Island BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTreasureIsland = {
    // -- BGM
    Bgm                     : 'sfx/slot/ti/tiBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/ti/tiFsBgm.mp3',
    CollectPotBgm           : 'sfx/slot/ti/tiCollectPotBgm.mp3',
    MeterPotBgm             : 'sfx/slot/ti/tiMeterPotBgm.mp3',
    PartySaverBgm           : 'sfx/slot/ti/tiPartySaverBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/ti/tiSpin.mp3',
    ReelStop                : 'sfx/slot/ti/tiReelStop.mp3',
    ScatterLocking01        : 'sfx/slot/ti/tiSLocking01.mp3',
    ScatterLocking02        : 'sfx/slot/ti/tiSLocking02.mp3',
    ScatterLocking03        : 'sfx/slot/ti/tiSLocking03.mp3',
    ScatterMatch            : 'sfx/slot/ti/tiFsMatch.mp3',
    BigSymbol               : 'sfx/slot/ti/tiSymExtend.mp3',
    LongSpin                : 'sfx/slot/ti/tiLongspin.mp3',
    SymFilp01               : 'sfx/slot/ti/tiSymFlip01.mp3',
    SymFilp02               : 'sfx/slot/ti/tiSymFlip02.mp3',
    SymTrail01              : 'sfx/slot/ti/tiSymTrail01.mp3',
    SymTrail02              : 'sfx/slot/ti/tiSymTrail02.mp3',
    CollectPotTriger01      : 'sfx/slot/ti/tiCollectPotTriger01.mp3',
    CollectPotTriger02      : 'sfx/slot/ti/tiCollectPotTriger02.mp3',
    SymLock                 : 'sfx/slot/ti/tiSymLock.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/ti/tiMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/ti/tiNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/ti/tiNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/ti/tiNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/ti/tiNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/ti/tiNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/ti/tiNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/ti/tiMPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/ti/tiJackpotPopup.mp3',

    // -- FreeSpin
    FreeSpinIntroPopup      : 'sfx/slot/ti/tiFsIntro.mp3',
    FreeSpinResultPopup     : 'sfx/slot/ti/tiFsResult.mp3',

    // -- CollectPot
    CollectPotIntro 	    : 'sfx/slot/ti/tiCollectPotIntro.mp3',
    CollectPotPickOver 	    : 'sfx/slot/ti/tiCollectPotPickOver.mp3',
    CollectPotPick 	        : 'sfx/slot/ti/tiCollectPotPick.mp3',
    CollectPotPickMatch00   : 'sfx/slot/ti/tiCollectPotPickMatch00.mp3',
    CollectPotPickMatch01 	: 'sfx/slot/ti/tiCollectPotPickMatch01.mp3',
    CollectPotPickMatch02   : 'sfx/slot/ti/tiCollectPotPickMatch02.mp3',
    CollectPotResult        : 'sfx/slot/ti/tiCollectPotResult.mp3',

    CollectPotPayTrail      : 'sfx/slot/ti/tiCollectPotPayTrail.mp3',
    CollectPotPickPARLEY    : 'sfx/slot/ti/tiCollectPotPickPARLEY.mp3',
    PartySaverFail          : 'sfx/slot/ti/tiPartySaverFail.mp3',
    PartySaverSuccess       : 'sfx/slot/ti/tiPartySaverSuccess.mp3',
    CollectOpen             : 'sfx/slot/ti/tiCollectOpen.mp3',

    // -- HonestPot
    MeterPotIntro 	        : 'sfx/slot/ti/tiMeterPotIntro.mp3',
    MeterPotCardShuffle  	: 'sfx/slot/ti/tiMeterPotCardShuffle.mp3',
    MeterPotPickOver  	    : 'sfx/slot/ti/tiMeterPotPickOver.mp3',
    MeterPotPick  	        : 'sfx/slot/ti/tiMeterPotPick.mp3',
    MeterPotResult  	    : 'sfx/slot/ti/tiMeterPotResult.mp3',
    MeterPotmatch  	        : 'sfx/slot/ti/tiMeterPotmatch.mp3'
};
window.g_sndTreasureIsland = ResPack.create( 'sndTreasureIsland', sndTreasureIsland ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FortuneTree_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ SantasGifts ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSantasGifts    = {
    ChangeBetHigh        : 'sfx/slot_Common/IntroBet01.mp3',
    ChangeBetLow         : 'sfx/slot_Common/IntroBet02.mp3',

    // bgm
    Bgm             	 : 'sfx/slot/sg/sgBgm.mp3',
    FreeSpinBgm     	 : 'sfx/slot/sg/sgFsBgm.mp3',
    PickGameBgm     	 : 'sfx/slot/sg/sgBoBgm.mp3',

    Spin                 : 'sfx/slot/sg/sgSpin.mp3',
    ReelStop             : 'sfx/slot/sg/sgReelStop.mp3',
    MajorPayCount        : 'sfx/slot/sg/sgMPayCount.mp3',

    NormalPay1Count     : 'sfx/slot/sg/sgStep01NPay.mp3',
    NormalPay1CountEnd  : 'sfx/slot/sg/sgStep01NPayEnd.mp3',
    NormalPay2Count01   : 'sfx/slot/sg/sgStep02NPay01.mp3',
    NormalPay2CountEnd01: 'sfx/slot/sg/sgStep02NPay01End.mp3',
    NormalPay2Count02   : 'sfx/slot/sg/sgStep02NPay02.mp3',
    NormalPay2CountEnd02: 'sfx/slot/sg/sgStep02NPay02End.mp3',
    NormalPay2Count03   : 'sfx/slot/sg/sgStep02NPay03.mp3',
    NormalPay2CountEnd03: 'sfx/slot/sg/sgStep02NPay03End.mp3',

    MajorWinPopup        : 'sfx/slot/sg/sgMajorPopup.mp3',
    JackpotPopup         : 'sfx/slot/sg/sgJackpotPopup.mp3',
    LongSpin             : 'sfx/slot/sg/sgLongspin.mp3',
    LongSpinExtra        : 'sfx/slot/sg/sgLongspinExtra.mp3',

    ScatterLocking01     : 'sfx/slot/sg/sgSLocking01.mp3',
    ScatterLocking02     : 'sfx/slot/sg/sgSLocking02.mp3',
    ScatterLocking03     : 'sfx/slot/sg/sgSLocking03.mp3',
    ScatterLocking04     : 'sfx/slot/sg/sgSLocking04.mp3',
    ScatterLocking05     : 'sfx/slot/sg/sgSLocking05.mp3',
    ScatterMatch         : 'sfx/slot/sg/sgSMatch.mp3',
    JackpotLock          : 'sfx/slot/sg/sgJLocking.mp3',

    Trail				 : 'sfx/slot/sg/sgSymTrail.mp3',
    JackpotPopupMulti    : 'sfx/slot/sg/sgJackpotPopupMulti.mp3',

    BoIntro               : 'sfx/slot/sg/sgBoIntro.mp3',
    BoPick                : 'sfx/slot/sg/sgBoPick.mp3',
    BoPickOver            : 'sfx/slot/sg/sgBoPickOver.mp3',
    BoMatch               : 'sfx/slot/sg/sgBoMatch.mp3',
    BoTrail               : 'sfx/slot/sg/sgBoTrail.mp3',

    BoGaugeUp             : 'sfx/slot/sg/sgBoGaugeUp.mp3',
    BoGuageMulti          : 'sfx/slot/sg/sgBoGuageMulti.mp3',
    BoUpgrade             : 'sfx/slot/sg/sgBoUpgrade.mp3',
    FsResult              : 'sfx/slot/sg/sgFsResult.mp3',
    FsIntro               : 'sfx/slot/sg/sgFsIntro.mp3'
};
window.g_sndSantasGifts  = ResPack.create( 'sndSantasGifts', sndSantasGifts ).concat( g_sfxSlotCommon );
//-- ↑↑↑ SantasGifts End ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ AllStar ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndAllStar = {
    // -- BGM
    Bgm                     : 'sfx/slot/as/asBgm.mp3',
    LinkGameBgm             : 'sfx/slot/as/asLgBgm.mp3',
    MiniGame01Bgm           : 'sfx/slot/as/asMinigame01Bgm.mp3',
    MiniGame02Bgm           : 'sfx/slot/as/asMinigame02Bgm.mp3',
    MiniGame03Bgm           : 'sfx/slot/as/asMinigame03Bgm.mp3',
    MiniGame04Bgm           : 'sfx/slot/as/asMinigame04Bgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/as/asSpin.mp3',
    ReelStop                : 'sfx/slot/as/asReelStop.mp3',
    Locking01               : 'sfx/slot/as/asSLocking01.mp3',
    Locking02               : 'sfx/slot/as/asSLocking02.mp3',
    Locking03               : 'sfx/slot/as/asSLocking03.mp3',
    LinkMatch               : 'sfx/slot/as/asSMatch.mp3',
    JLocking                : 'sfx/slot/as/asJLocking.mp3',
    DLocking                : 'sfx/slot/as/asDLocking.mp3',
    Mini01Locking           : 'sfx/slot/as/asMLocking01.mp3',
    Mini02Locking           : 'sfx/slot/as/asMLocking01.mp3',
    Mini03Locking           : 'sfx/slot/as/asMLocking01.mp3',
    Mini04Locking           : 'sfx/slot/as/asMLocking01.mp3',
    LongSpin                : 'sfx/slot/as/asLongspin.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/as/asMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/as/asNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/as/asNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/as/asNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/as/asNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/as/asNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/as/asNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/as/asMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/as/asJackpotPopup.mp3',
    LinkGameIntro           : 'sfx/slot/as/asLgIntro.mp3',
    LinkGameResult          : 'sfx/slot/as/asLgResult.mp3',

    LinkGameCount           : 'sfx/slot/as/asLgCount.mp3',
    GrandMatch              : 'sfx/slot/as/asGMatch.mp3',
    JackpotMatch            : 'sfx/slot/as/asJmatch.mp3',
    DirectMatch             : 'sfx/slot/as/asMmatch.mp3',
    Mini01Match             : 'sfx/slot/as/asDmatch01.mp3',
    Mini02Match             : 'sfx/slot/as/asDmatch02.mp3',
    Mini03Match             : 'sfx/slot/as/asDmatch03.mp3',
    Mini04Match             : 'sfx/slot/as/asDmatch04.mp3',

    DirectPayTrail          : 'sfx/slot/as/asLinkTrailNew.mp3',

    Mini04Intro             : 'sfx/slot/as/asDmatch04Intro.mp3',
    Mini01WildLocking       : 'sfx/slot/as/asMWildLocking.mp3',
    MiniLongWildLocking     : 'sfx/slot/as/asMLongWildLocking.mp3'
};
window.g_sndAllStar = ResPack.create( 'sndAllStar', sndAllStar ).concat( g_sfxSlotCommon );
//-- ↑↑↑ AllStar_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ FortuneDiamondJackpotReel ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFortuneDiamondJackpotReel = {
    // -- BGM
    Bgm                     : 'sfx/slot/fj/fjBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/fj/fjFsBgm.mp3',
    BonusGameBgm           : 'sfx/slot/fj/fjBoBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/fj/fjSpin.mp3',
    ReelStop                : 'sfx/slot/fj/fjReelStop.mp3',
    Locking01               : 'sfx/slot/fj/fjSLocking01.mp3',
    Locking02               : 'sfx/slot/fj/fjSLocking02.mp3',
    Locking03               : 'sfx/slot/fj/fjSLocking03.mp3',
    ScatterMatch            : 'sfx/slot/fj/fjSMatch.mp3',
    ExtraReelLocking        : 'sfx/slot/fj/fjExtraReelJLocking.mp3',
    LongSpin                : 'sfx/slot/fj/fjLongspin.mp3',
    ExtraLongSpin           : 'sfx/slot/fj/fjExtraSpin.mp3',

    ReelSound01             : 'sfx/slot/fj/fjReel01.mp3',
    ReelSound02             : 'sfx/slot/fj/fjReel02.mp3',
    ReelSound03             : 'sfx/slot/fj/fjReel03.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/fj/fjMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/fj/fjNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/fj/fjNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/fj/fjNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/fj/fjNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/fj/fjNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/fj/fjNPayCount03End.mp3',

    // -- BonusGame
    BonusGameIntro          : 'sfx/slot/fj/fjBoIntro.mp3',
    BonusGamePick           : 'sfx/slot/fj/fjBoPick.mp3',
    BonusGamePickOver       : 'sfx/slot/fj/fjBoPickOver.mp3',
    BonusMatch              : 'sfx/slot/fj/fjBoMatch.mp3',
    BonusMultiMatch         : 'sfx/slot/fj/fjBoMulti.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/fj/fjMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/fj/fjJackpotPopup.mp3',
    JackpotPopupMulti 	    : 'sfx/slot/fj/fjJackpotPopupMulti.mp3',

    FreeSpinIntro           : 'sfx/slot/fj/fjFsIntro.mp3',
    FreeSpinResult          : 'sfx/slot/fj/fjFsResult.mp3',

    WildSymTrail            : 'sfx/slot/fj/fjWildSymTrail.mp3'
};
window.g_sndFortuneDiamondJackpotReel = ResPack.create( 'sndFortuneDiamondJackpotReel', sndFortuneDiamondJackpotReel ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FortuneDiamondJackpotReel ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ FortunePanda ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFortunePanda = {
    // -- BGM
    Bgm                     : 'sfx/slot/fpd/fpdBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/fpd/fpdFsBgm.mp3',
    LinkBgm                 : 'sfx/slot/fpd/fpdLinkBgm.mp3',

    // -- Effect
    Spin                    : 'sfx/slot/fpd/fpdSpin.mp3',
    ReelStop                : 'sfx/slot/fpd/fpdReelStop.mp3',
    NPayCount01             : 'sfx/slot/fpd/fpdNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/fpd/fpdNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/fpd/fpdNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/fpd/fpdNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/fpd/fpdNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/fpd/fpdNPayCount03End.mp3',
    MPayCount               : 'sfx/slot/fpd/fpdMPayCount.mp3',
    MPopUp                  : 'sfx/slot/fpd/fpdMPopUp.mp3',
    JackpotPopup 	        : 'sfx/slot/fpd/fpdJackpotPopup.mp3',

    // -- Normal
    Intro                   : 'sfx/slot/fpd/fpdIntro.mp3',
    Longspin01              : 'sfx/slot/fpd/fpdLongspin01.mp3',
    WildSymExtend           : 'sfx/slot/fpd/fpdWildSymExtend.mp3',
    WildSymTrail            : 'sfx/slot/fpd/fpdWildSymTrail.mp3',
    PotVari                 : 'sfx/slot/fpd/fpdPotVari.mp3',
    LinkIntro               : 'sfx/slot/fpd/fpdLinkPotStream.mp3',
    Longspin02              : 'sfx/slot/fpd/fpdLongspin02.mp3',
    PandaExtend             : 'sfx/slot/fpd/fpdPandaExtend.mp3',
    LinkSymLocking01        : 'sfx/slot/fpd/fpdFsLocking01.mp3',
    LinkSymLocking02        : 'sfx/slot/fpd/fpdFsLocking02.mp3',
    LinkSymLocking03        : 'sfx/slot/fpd/fpdFsLocking03.mp3',
    LinkSymLocking04        : 'sfx/slot/fpd/fpdFsLocking04.mp3',
    LinkSymLocking05        : 'sfx/slot/fpd/fpdFsLocking05.mp3',
    LuckySymLocking         : 'sfx/slot/fpd/fpdFsLocking06.mp3',
    FSMatch                 : 'sfx/slot/fpd/fpdFSMatch.mp3',
    Match                   : 'sfx/slot/fpd/fpdMstack.mp3',

    // -- FreeSpin
    FsIntro                 : 'sfx/slot/fpd/fpdFsIntro.mp3',
    LinkSymTrail01          : 'sfx/slot/fpd/fpdLinkSymTrail01.mp3',
    LinkSymTrail02          : 'sfx/slot/fpd/fpdLinkSymTrail02.mp3',
    FsResult                : 'sfx/slot/fpd/fpdFsResult.mp3',

    // -- LinkSpin
    SymFlip 	            : 'sfx/slot/fpd/fpdSymFlip.mp3',
    LinkJpMatch 	        : 'sfx/slot/fpd/fpdLinkJpMatch.mp3',
    LinkSum                 : 'sfx/slot/fpd/fpdLinkSum.mp3',
    LinkResult              : 'sfx/slot/fpd/fpdLinkResult.mp3',
    AddLinkCount            : 'sfx/slot/fpd/fpdLinkReset.mp3',
    LinkPotStack            : 'sfx/slot/fpd/fpdLinkPotStack.mp3'
};
window.g_sndFortunePanda = ResPack.create( 'sndFortunePanda', sndFortunePanda ).concat( g_sfxSlotCommon );
//-- ↑↑↑ AllStar_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ PharaohWild ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndPharaohWild = {
    // -- BGM
    Bgm                     : 'sfx/slot/pw/pwBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/pw/pwFsBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/pw/pwSpin.mp3',
    ReelStop                : 'sfx/slot/pw/pwReelStop.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/pw/pwMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/pw/pwJackpotPopup.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/pw/pwMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/pw/pwNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/pw/pwNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/pw/pwNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/pw/pwNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/pw/pwNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/pw/pwNPayCount03End.mp3',

    JewelLocking            : 'sfx/slot/pw/pwJewelSymLocking.mp3',
    JewelToOverlay          : 'sfx/slot/pw/pwFrameSymChange.mp3',

    LongSpin                : 'sfx/slot/pw/pwLongspin.mp3',

    ScatterLock01           : 'sfx/slot/pw/pwSLocking01.mp3',
    ScatterLock02           : 'sfx/slot/pw/pwSLocking02.mp3',
    ScatterLock03           : 'sfx/slot/pw/pwSLocking03.mp3',
    ScatterLock04           : 'sfx/slot/pw/pwSLocking04.mp3',
    ScatterLock05           : 'sfx/slot/pw/pwSLocking05.mp3',

    ScatterMatch            : 'sfx/slot/pw/pwSMatch.mp3',

    // -- FreeSpin
    FreeSpinIntroPopup      : 'sfx/slot/pw/pwFsIntro.mp3',
    FreeSpinIntroWildSFX    : 'sfx/slot/pw/pwFsFrameIntro.mp3',
    FreeSpinWildMoving      : 'sfx/slot/pw/pwFsMoveWild.mp3',
    FreeSpinWildDrop        : 'sfx/slot/pw/pwFsWildLocking.mp3',
    FreeSpinResultPopup     : 'sfx/slot/pw/pwFsResult.mp3',
    FreeSpinOverlayToWild   : 'sfx/slot/pw/pwFsWildChange.mp3',

    WildSpin                : 'sfx/slot/pw/pwLastSpinVoice.mp3',

    CameraShake01           : 'sfx/slot/pw/pwMajorMatch01.mp3',
    CameraShake02           : 'sfx/slot/pw/pwMajorMatch02.mp3',
    CameraShake03           : 'sfx/slot/pw/pwMajorMatch03.mp3',
    CameraShake04           : 'sfx/slot/pw/pwMajorMatch04.mp3',

    // -- WildChange
    ChangeToWild01          : 'sfx/slot/pw/pwWildSymChange01.mp3',
    ChangeToWild02          : 'sfx/slot/pw/pwWildSymChange02.mp3',
    ChangeToWild03          : 'sfx/slot/pw/pwWildSymChange03.mp3',
    ChangeToWild04          : 'sfx/slot/pw/pwWildSymChange04.mp3',
    ChangeToWild05          : 'sfx/slot/pw/pwWildSymChange05.mp3',
    ChangeToWild06          : 'sfx/slot/pw/pwWildSymChange06.mp3',
    ChangeToWild07          : 'sfx/slot/pw/pwWildSymChange07.mp3',
    ChangeToWild08          : 'sfx/slot/pw/pwWildSymChange08.mp3',
    ChangeToWild09          : 'sfx/slot/pw/pwWildSymChange09.mp3',
    ChangeToWild10          : 'sfx/slot/pw/pwWildSymChange10.mp3',
    ChangeToWild11          : 'sfx/slot/pw/pwWildSymChange11.mp3',
    ChangeToWild12          : 'sfx/slot/pw/pwWildSymChange12.mp3',
    ChangeToWild13          : 'sfx/slot/pw/pwWildSymChange13.mp3',
    ChangeToWild14          : 'sfx/slot/pw/pwWildSymChange14.mp3',
    ChangeToWild15          : 'sfx/slot/pw/pwWildSymChange15.mp3',
    ChangeToWild16          : 'sfx/slot/pw/pwWildSymChange16.mp3',
    ChangeToWild17          : 'sfx/slot/pw/pwWildSymChange17.mp3',
    ChangeToWild18          : 'sfx/slot/pw/pwWildSymChange18.mp3',
    ChangeToWild19          : 'sfx/slot/pw/pwWildSymChange19.mp3',
    ChangeToWild20          : 'sfx/slot/pw/pwWildSymChange20.mp3'
};
window.g_sndPharaohWild = ResPack.create( 'sndPharaohWild', sndPharaohWild ).concat( g_sfxSlotCommon );
//-- ↑↑↑ PharaohWild_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ SharkParade ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSharkParade = {
    // -- BGM
    NormalBGM               : 'sfx/slot/sp/spBgm.mp3',
    BonusRespinBGM          : 'sfx/slot/sp/spFsBgm.mp3',
    SharkRespinBGM          : 'sfx/slot/sp/spReBgm.mp3',

    Intro                   : 'sfx/slot/sp/spIntro.mp3',

    Spin                    : 'sfx/slot/sp/spSpin.mp3',
    SharkSpin               : 'sfx/slot/sp/spRespinSpin.mp3',
    ReelStop                : 'sfx/slot/sp/spReelStop.mp3',
    ReelShake               : 'sfx/slot/sp/spReelShake.mp3',
    LongSpin                : 'sfx/slot/sp/spLongspin.mp3',

    Wave                    : 'sfx/slot/sp/spBetWave.mp3',

    NPayCount01             : 'sfx/slot/sp/spNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/sp/spNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/sp/spNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/sp/spNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/sp/spNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/sp/spNPayCount03End.mp3',
    MPayCount               : 'sfx/slot/sp/spMPayCount.mp3',

    MPopUp                  : 'sfx/slot/sp/spMPopUp.mp3',
    JackpotPopup            : 'sfx/slot/sp/spJackpotPopup.mp3',
    BonusResultPopup        : 'sfx/slot/sp/spFsResult.mp3',

    RespinWinPanelOpen      : 'sfx/slot/sp/spRespinIntro.mp3',
    RespinWinPanelClose     : 'sfx/slot/sp/spRespinOutro.mp3',

    AddStep                 : 'sfx/slot/sp/spFsRetrigger.mp3',

    SharkDirectCoin         : 'sfx/slot/sp/spExtraDirect.mp3',
    SharkJakcpotCoin        : 'sfx/slot/sp/spExtraJackpot.mp3',
    SharkRespinCoin         : 'sfx/slot/sp/spExtraRespin.mp3',
    SharkRespinPay          : 'sfx/slot/sp/spExtraRespinMatch.mp3',
    SharkMatch              : 'sfx/slot/sp/spExtraSharkMatch.mp3',

    BonusPayAdd             : 'sfx/slot/sp/spBonusWinAdd.mp3'
};
window.g_sndSharkParade = ResPack.create( 'sndSharkParade', sndSharkParade ).concat( g_sfxSlotCommon );
//-- ↑↑↑ SharkParade_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ BisonGold ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndBisonGold = {
    // -- BGM
    Bgm                     : 'sfx/slot/bg/bgBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/bg/bgFsBgm.mp3',
    BookBgm                 : 'sfx/slot/bg/bgBookBgm.mp3',

    // -- Effect
    Spin                    : 'sfx/slot/bg/bgSpin.mp3',
    ReelStop                : 'sfx/slot/bg/bgReelStop.mp3',
    NPayCount01             : 'sfx/slot/bg/bgNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/bg/bgNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/bg/bgNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/bg/bgNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/bg/bgNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/bg/bgNPayCount03End.mp3',
    MPayCount               : 'sfx/slot/bg/bgMPayCount.mp3',
    MPopUp                  : 'sfx/slot/bg/bgMajorPopup.mp3',

    // -- Normal
    SymWildChange06         : 'sfx/slot/bg/bgSymWildChange06.mp3',
    SymWildChange01         : 'sfx/slot/bg/bgSymWildChange01.mp3',
    Longspin                : 'sfx/slot/bg/bgLongspin.mp3',
    FsLongspin              : 'sfx/slot/bg/bgFsLongspin.mp3',
    SLocking01              : 'sfx/slot/bg/bgSLocking01.mp3',
    SLocking02              : 'sfx/slot/bg/bgSLocking02.mp3',
    SLocking03              : 'sfx/slot/bg/bgSLocking03.mp3',
    // SLocking04              : 'sfx/slot/bg/bgSLocking04.mp3',
    // SLocking05              : 'sfx/slot/bg/bgSLocking05.mp3',
    SMatch                  : 'sfx/slot/bg/bgSMatch.mp3',
    SymTrail                : 'sfx/slot/bg/bgSymTrail.mp3',
    Match                   : 'sfx/slot/bg/bgMatch.mp3',
    FsPickOpen              : 'sfx/slot/bg/bgFsPickOpen.mp3',

    // -- FreeSpin
    FsIntro                 : 'sfx/slot/bg/bgFsIntro.mp3',
    FsPick                  : 'sfx/slot/bg/bgFsPick.mp3',
    FsPickOver              : 'sfx/slot/bg/bgFsPickOver.mp3',
    FsRetriger 	            : 'sfx/slot/bg/bgFsRetriger.mp3',
    FsCollectionAdd 	    : 'sfx/slot/bg/bgFsCollectionAdd.mp3',
    FsCollectJump 	        : 'sfx/slot/bg/bgFsCollectJump.mp3',
    FsResult 	            : 'sfx/slot/bg/bgFsResult.mp3',
    FsGoldLock 	            : 'sfx/slot/bg/bgFsGoldLock.mp3',
    FsCollectionTrail 	    : 'sfx/slot/bg/bgFsCollectionTrail.mp3',


    // -- Collection Book
    CollectionBookIconOver 	    : 'sfx/slot/bg/bgCollectionBookIconOver.mp3',
    CollectionBookIconPick 	    : 'sfx/slot/bg/bgCollectionBookIconPick.mp3',
    CollectionBookPageMove 	    : 'sfx/slot/bg/bgCollectionBookPageMove.mp3',
    CollectionBookDirectpay 	: 'sfx/slot/bg/bgCollectionBookDirectpay.mp3',
    CollectionBook2xPick 	    : 'sfx/slot/bg/bgCollectionBook2xPick.mp3',
    CollectionBookMiddleBonus 	: 'sfx/slot/bg/bgCollectionBookMiddleBonus.mp3',
    // CollectionBookUnlock 	    : 'sfx/slot/bg/bgCollectionBookUnlock.mp3',
    CollectionBookClear 	    : 'sfx/slot/bg/bgCollectionBookClear.mp3',
    CollectionResultPick 	    : 'sfx/slot/bg/bgCollectionResultPick.mp3',
    CollectionBookInfo 	        : 'sfx/slot/bg/bgCollectionBookInfo.mp3',
    CollectionBook6thOpen 	    : 'sfx/slot/bg/bgCollectionBook6thOpen.mp3',
    FsCollectionLockedBox 	    : 'sfx/slot/bg/bgFsCollectionLockedBox.mp3',
    FsCollectionCollectMore 	: 'sfx/slot/bg/bgFsCollectionCollectMore.mp3'

};
window.g_sndBisonGold = ResPack.create( 'sndBisonGold', sndBisonGold ).concat( g_sfxSlotCommon );
//-- ↑↑↑ BisonGold_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ IndianaCoins ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndIndianaCoins = {
    // -- BGM
    Bgm                     : 'sfx/slot/ic/icBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/ic/icFsBgm.mp3',
    RespinBgm               : 'sfx/slot/ic/icCoinBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/ic/icSpin.mp3',
    ReelStop                : 'sfx/slot/ic/icReelStop.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/ic/icMajorPopup.mp3',
    //JackpotPopup 	        : 'sfx/slot/ic/icJackpotPopup.mp3',
    FreeSpinResultPopup     : 'sfx/slot/ic/icFsResult.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/ic/icMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/ic/icNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/ic/icNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/ic/icNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/ic/icNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/ic/icNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/ic/icNPayCount03End.mp3',

    //IntroBet                : 'sfx/slot/ic/icIntroBet01.mp3',
    JackpotOnOff            : 'sfx/slot/ic/icJackpotOnOff.mp3',

    LongSpin                : 'sfx/slot/ic/icJackpotLongspin.mp3',
    JackpotMatch            : 'sfx/slot/ic/icJackpotMatch.mp3',

    ScatterLock             : 'sfx/slot/ic/icSLocking.mp3',

    RespinIntro             : 'sfx/slot/ic/icRespinText.mp3',
    RespinWin               : 'sfx/slot/ic/icRespinWin.mp3',
    RespinClose             : 'sfx/slot/ic/icRespinBonuswinpannelClose.mp3',

    MapOpen                 : 'sfx/slot/ic/icMapOpenClick.mp3',
    MapClose                : 'sfx/slot/ic/icMapCloseClick.mp3',
    MapInfo                 : 'sfx/slot/ic/icMapInfoClick.mp3',
    MapNormalGage           : 'sfx/slot/ic/icMapNormalGage.mp3',
    //MapSuperbonusGage       : 'sfx/slot/ic/icMapSuperbonusGage.mp3',
    //MapLastSuperbonusGage   : 'sfx/slot/ic/icMapLastSuperbonusGage.mp3',

    PotBonus                : 'sfx/slot/ic/icPotExplosion.mp3',

    FreeSpinMapOpen         : 'sfx/slot/ic/icMapOpen.mp3',
    FreeSpinIntro           : 'sfx/slot/ic/icFsIntro.mp3',

    ScatterAdd            : 'sfx/slot/ic/icFsScatterAdd.mp3',

    CoinDrop                : 'sfx/slot/ic/icNormalCoinDrop.mp3',
    CoinDropMultiply        : 'sfx/slot/ic/icNormalCoinDrop02.mp3',
    ScatterCoinDrop         : 'sfx/slot/ic/icScatterCoinDrop.mp3',
    ToWild                  : 'sfx/slot/ic/icNormalWildUp.mp3',
    ToWildMultiply          : 'sfx/slot/ic/icNormalWildUp02.mp3',

    PotChangeToGold         : 'sfx/slot/ic/icPotChageToGold.mp3',
    PotChangeToNormal       : 'sfx/slot/ic/icPotChangeToNormal.mp3',
    MapLastSuperBonusGauge  : 'sfx/slot/ic/icMapLastSuperbonusGage.mp3',
    MapSuperBonusIdle       : 'sfx/slot/ic/icMapSuperbonusIdle.mp3',
    MapLastSuperBonusIdle   : 'sfx/slot/ic/icMapLastSuperbonusIdle.mp3',
    MapIdle                 : 'sfx/slot/ic/icMapIdle.mp3',

    CoinTrail               : 'sfx/slot/ic/icPotTrail.mp3',

    BetOn                   : 'sfx/slot/ic/icBetOn.mp3',
    BetOff                  : 'sfx/slot/ic/icBetOff.mp3'
};
window.g_sndIndianaCoins = ResPack.create( 'sndIndianaCoins', sndIndianaCoins ).concat( g_sfxSlotCommon );
//-- ↑↑↑ IndianaCoins_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ TreasureOfOz ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTreasureOfOz = {
    // -- BGM
    Bgm                     : 'sfx/slot/to/ozBgm.mp3',
    //MapBgm                     : 'sfx/slot/to/ozMapBgm.mp3',
    LinkGameBgm             : 'sfx/slot/to/oz3x3LinkBgm.mp3',
    SuperLinkGameBgm             : 'sfx/slot/to/oz3x5LinkBgm.mp3',
    MiniGame01Bgm           : 'sfx/slot/to/ozMinigameBgm01.mp3',
    MiniGame02Bgm           : 'sfx/slot/to/ozMinigameBgm02.mp3',
    MiniGame03Bgm           : 'sfx/slot/to/ozMinigameBgm03.mp3',
    MiniGame04Bgm           : 'sfx/slot/to/ozMinigameBgm04.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/to/ozSpin.mp3',
    ReelStop                : 'sfx/slot/to/ozReelStop.mp3',
    Locking01               : 'sfx/slot/to/ozLinkLocking01.mp3',
    Locking02               : 'sfx/slot/to/ozLinkLocking02.mp3',
    Locking03               : 'sfx/slot/to/ozLinkLocking03.mp3',
    LinkMatch               : 'sfx/slot/to/ozLinkMatch.mp3',
    JLocking                : 'sfx/slot/to/ozJackpotLocking.mp3',
    DLocking                : 'sfx/slot/to/ozDirectLocking.mp3',
    Mini01Locking           : 'sfx/slot/to/ozMini04Locking.mp3',
    Mini02Locking           : 'sfx/slot/to/ozMini01Locking.mp3',
    Mini03Locking           : 'sfx/slot/to/ozMini02Locking.mp3',
    Mini04Locking           : 'sfx/slot/to/ozMini03Locking.mp3',
    LongSpin                : 'sfx/slot/to/ozLongspin.mp3',

    // -- Counting
    MPayCount           : 'sfx/slot/to/ozMPayCount.mp3',
    NPayCount01      : 'sfx/slot/to/ozNPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/to/ozNPayCount01End.mp3',
    NPayCount02      : 'sfx/slot/to/ozNPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/to/ozNPayCount02End.mp3',
    NPayCount03      : 'sfx/slot/to/ozNPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/to/ozNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/to/ozMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/to/ozJackpotPopup.mp3',
    LinkGameIntro           : 'sfx/slot/to/ozLinkIntro.mp3',
    LinkGameResult          : 'sfx/slot/to/ozLinkResult.mp3',

    LinkGameCount           : 'sfx/slot/to/ozLinkRespinCount.mp3',
    JackpotMatch            : 'sfx/slot/to/ozJackpotMatch.mp3',
    DirectMatch             : 'sfx/slot/to/ozDirectMatch.mp3',
    Mini01Match             : 'sfx/slot/to/ozMIni04Match.mp3',
    Mini02Match             : 'sfx/slot/to/ozMIni01Match.mp3',
    Mini03Match             : 'sfx/slot/to/ozMIni02Match.mp3',
    Mini04Match             : 'sfx/slot/to/ozMIni03Match.mp3',

    MiniWinPanelOpen        : 'sfx/slot/to/ozMiniWinpanelOpen.mp3',
    MiniWinPanelChange      : 'sfx/slot/to/ozMiniWinpanelChange.mp3',
    MiniWinPanelUpCounting  : 'sfx/slot/to/ozMiniWinpanelUpCounting.mp3',
    MiniWinPanelEnd         : 'sfx/slot/to/ozMiniWinpanelEnd.mp3',

    MysteryLockingChange    : 'sfx/slot/to/ozMysteryLockingChange.mp3',
    LessLockReelCount       : 'sfx/slot/to/ozLockingreelCount.mp3',
    UnLockReel              : 'sfx/slot/to/ozLockingreelUnlock.mp3',

    PotBonus                : 'sfx/slot/to/ozPotOpen.mp3',
    CoinTrail               : 'sfx/slot/to/ozNormalTrail.mp3',
    DirectPayTrail          : 'sfx/slot/to/ozLinkTrail.mp3',

    Mini04Intro             : 'sfx/slot/to/ozMini03Intro.mp3',
    Mini01WildLocking       : 'sfx/slot/to/ozMini02WildSet.mp3',
    //MiniLongWildLocking     : 'sfx/slot/to/toMLongWildLocking.mp3'

    MapOver                 : 'sfx/slot/to/ozMapOver.mp3',
    MapClick                : 'sfx/slot/to/ozMapClick.mp3',
    MapOpen                 : 'sfx/slot/to/ozMapOpen.mp3',
    MapShowLink             : 'sfx/slot/to/ozMapNormalGage.mp3',
    MapShowSuperLink        : 'sfx/slot/to/ozMapSuperbonusGage.mp3',
    MapShowLastSuperLink    : 'sfx/slot/to/ozMapLastSuperbonusGage.mp3'
};
window.g_sndTreasureOfOz = ResPack.create( 'sndTreasureOfOz', sndTreasureOfOz ).concat( g_sfxSlotCommon );
//-- ↑↑↑ TreasureOfOz ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ WildWildZeus ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndWildWildZeus = {
    // -- BGM
    Bgm                     : 'sfx/slot/wz/wzBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/wz/wzFsBgm.mp3',
    BookBgm                 : 'sfx/slot/wz/wzBookBgm.mp3',

    // -- Effect
    Spin                    : 'sfx/slot/wz/wzSpin.mp3',
    ReelStop                : 'sfx/slot/wz/wzReelStop.mp3',
    MPayCount               : 'sfx/slot/wz/wzMPayCount.mp3',
    NPayCount01             : 'sfx/slot/wz/wzNPayCount01.mp3',
    NPayCount02             : 'sfx/slot/wz/wzNPayCount02.mp3',
    NPayCount03             : 'sfx/slot/wz/wzNPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/wz/wzNPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/wz/wzNPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/wz/wzNPayCount03End.mp3',
    MPopUp                  : 'sfx/slot/wz/wzMajorPopup.mp3',

    // -- Normal
    SymWildChange06         : 'sfx/slot/wz/wzSymWildChange06.mp3',
    SymWildChange01         : 'sfx/slot/wz/wzSymWildChange01.mp3',
    Longspin                : 'sfx/slot/wz/wzLongspin.mp3',
    SLocking01              : 'sfx/slot/wz/wzSLocking01.mp3',
    SLocking02              : 'sfx/slot/wz/wzSLocking02.mp3',
    SLocking03              : 'sfx/slot/wz/wzSLocking03.mp3',
    SMatch                  : 'sfx/slot/wz/wzSMatch.mp3',
    NSymTrail               : 'sfx/slot/wz/wzNSymTrail.mp3',
    Thunder                 : 'sfx/slot/wz/wzThunder.mp3',
    Expand                  : 'sfx/slot/wz/wzExpand.mp3',
    ZeusLocking             : 'sfx/slot/wz/wzZeusLocking.mp3',
    Match                   : 'sfx/slot/wz/wzMatch.mp3',

    // -- FreeSpin
    FsSymTrail              : 'sfx/slot/wz/wzFsSymTrail.mp3',
    FsIntro                 : 'sfx/slot/wz/wzFsIntro.mp3',
    FsLongspin              : 'sfx/slot/wz/wzFsLongspin.mp3',
    FsRetriger 	            : 'sfx/slot/wz/wzFsRetriger.mp3',
    FsResult 	            : 'sfx/slot/wz/wzFsResult.mp3',

    // -- Collection Book
    CollectionBookCardOver 	    : 'sfx/slot/wz/wzCollectionBookCardOver.mp3',
    FsCollectionLockedCard 	    : 'sfx/slot/wz/wzFsCollectionLockedCard.mp3',
    FsCollectionCollectMore 	: 'sfx/slot/wz/wzFsCollectionCollectMore.mp3',
    CollectionBookIconOver 	    : 'sfx/slot/wz/wzCollectionBookIconOver.mp3',
    CollectionBookIconPick 	    : 'sfx/slot/wz/wzCollectionBookIconPick.mp3',
    CollectionBookInfo 	        : 'sfx/slot/wz/wzCollectionBookInfo.mp3',
    CollectionBookPageMove 	    : 'sfx/slot/wz/wzCollectionBookPageMove.mp3',
    CollectionBookDirectpay 	: 'sfx/slot/wz/wzCollectionBookDirectpay.mp3',
    CollectionBook2xPick 	    : 'sfx/slot/wz/wzCollectionBook2xPick.mp3',
    CollectionBookMiddleBonus 	: 'sfx/slot/wz/wzCollectionBookMiddleBonus.mp3',
    CollectionBookClear 	    : 'sfx/slot/wz/wzCollectionBookClear.mp3',
    CollectionResultPick 	    : 'sfx/slot/wz/wzCollectionResultPick.mp3',
    CollectionBook4thOpen 	    : 'sfx/slot/wz/wzCollectionBook4thOpen.mp3'
};
window.g_sndWildWildZeus = ResPack.create( 'sndWildWildZeus', sndWildWildZeus ).concat( g_sfxSlotCommon );
//-- ↑↑↑ WildWIldZeus_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ DiamondCats ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndDiamondCats = {
    // -- BGM
    Bgm                     : 'sfx/slot/dc/dcBgm.mp3',
    WheelBgm                : 'sfx/slot/dc/dcWheelBgm.mp3',
    FsBgm                   : 'sfx/slot/dc/dcFsBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/dc/dcSpin.mp3',
    ReelStop                : 'sfx/slot/dc/dcReelStop.mp3',
    LongSpin                : 'sfx/slot/dc/dcLongspin.mp3',
    SLocking01              : 'sfx/slot/dc/dcSLocking01.mp3',
    SLocking02              : 'sfx/slot/dc/dcSLocking02.mp3',
    SLocking03              : 'sfx/slot/dc/dcSLocking03.mp3',
    SMatch                  : 'sfx/slot/dc/dcSMatch.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/dc/dcMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/dc/dcNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/dc/dcNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/dc/dcNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/dc/dcNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/dc/dcNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/dc/dcNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/dc/dcMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/dc/dcJackpotPopup.mp3',

    // -- Pot
    PotTrail                : 'sfx/slot/dc/dcPotTrail.mp3',
    PotOpen                 : 'sfx/slot/dc/dcPotOpen.mp3',

    // -- Pot
    GaugeOver               : 'sfx/slot/dc/dcGaugeOver.mp3',
    NormalGaugeCount        : 'sfx/slot/dc/dcNormalGageCount.mp3',
    SuperBonusGaugeCount    : 'sfx/slot/dc/dcSuperbonusGageCount.mp3',

    // -- Wheel Common
    PotWheelChange          : 'sfx/slot/dc/dcDiamondWheelChange.mp3',
    SuperWheelChange        : 'sfx/slot/dc/dcSuperDiamondWheelChange.mp3',
    WheelMatch              : 'sfx/slot/dc/dcWheelMatch.mp3',
    WheelSpinClick          : 'sfx/slot/dc/dcWheelSpinClick.mp3',
    WheelSpinOver           : 'sfx/slot/dc/dcWheelSpinOver.mp3',
    WheelInMatch            : 'sfx/slot/dc/dcDiamondWheelInnerMatch.mp3',

    WheelSpin01             : 'sfx/slot/dc/dcWheelSpinType01.mp3',
    WheelSpin02             : 'sfx/slot/dc/dcWheelSpinType02.mp3',
    // WheelSpin03             : 'sfx/slot/dc/dcWheelSpinType03.mp3',
    // WheelSpin04             : 'sfx/slot/dc/dcWheelSpinType04.mp3',

    // -- Free Spin Wheel
    CatWheelIntro            : 'sfx/slot/dc/dcDiamondWheelIntro.mp3',
    PotWheelIntro            : 'sfx/slot/dc/dcDiamondWheelIntro.mp3',
    // FsWheelSpin             : 'sfx/slot/dc/dcFsWheelSpin.mp3',
    // FsWheelExtraAddSpin     : 'sfx/slot/dc/dcFWheelExtraAddSpin.mp3',
    FsWheelExtraAdd         : 'sfx/slot/dc/dcSuperDiamondWheelExtraAdd.mp3',

    // -- Array Wheel
    // WheelIntro              : 'sfx/slot/dc/dcArrayWheelIntro.mp3',
    // WheelSpin               : 'sfx/slot/dc/dcWheelSpin.mp3',

    // -- Free Spin
    FreeSpinIntro           : 'sfx/slot/dc/dcFsIntro.mp3',
    FreeSpinResult          : 'sfx/slot/dc/dcFsResult.mp3'
};
window.g_sndDiamondCats = ResPack.create( 'sndDiamondCats', sndDiamondCats ).concat( g_sfxSlotCommon );
//-- ↑↑↑ DiamondCats ↑↑↑ -------------------------------------------------------------------------------------//


//-- ↓↓↓ LunarFortune ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndLunarFortune = {
    GameIntro               :'sfx/slot/lf/lfIntro.mp3',
    // -- BGM
    Bgm                     : 'sfx/slot/lf/lfBgm.mp3',
    RedLinkGameBgm          : 'sfx/slot/lf/lfFsRedBgm.mp3',
    BlueLinkGameBgm         : 'sfx/slot/lf/lfFsBlueBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/lf/lfSpin.mp3',
    ReelStop                : 'sfx/slot/lf/lfReelStop.mp3',
    Locking01               : 'sfx/slot/lf/lfSLocking01.mp3',
    Locking02               : 'sfx/slot/lf/lfSLocking02.mp3',
    Locking03               : 'sfx/slot/lf/lfSLocking03.mp3',
    ScatterLocking          : 'sfx/slot/lf/lfSLocking05.mp3',
    LunarLocking            : 'sfx/slot/lf/lfSLocking04.mp3',
    LinkMatch               : 'sfx/slot/lf/lfSMatch.mp3',
    LongSpin                : 'sfx/slot/lf/lfLongspin.mp3',
    LinkReelStop            : 'sfx/slot/lf/lfLinkSpin.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/lf/lfMPayCount.mp3',
    NPayCount01             : 'sfx/slot/lf/lfNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/lf/lfNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/lf/lfNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/lf/lfNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/lf/lfNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/lf/lfNPayCount03End.mp3',

    // -- PopUp
    MajorWinPopup           : 'sfx/slot/lf/lfMajorPopup.mp3',
    JackpotPopup 	        : 'sfx/slot/lf/lfJackpotPopup.mp3',
    LinkGameResult          : 'sfx/slot/lf/lfLinkResult.mp3',
    PhasePopup              : 'sfx/slot/lf/lfPhaseNotiFreespins.mp3',

    // -- PickGame
    LinkGameIntroPick       : 'sfx/slot/lf/lfLinkIntro.mp3',
    PickOver                : 'sfx/slot/lf/lfLinkIntroOver.mp3',
    Pick                    : 'sfx/slot/lf/lfLinkIntroPick.mp3',

    // -- Trail
    RedOverlayTrail         : 'sfx/slot/lf/lfPotTrail01.mp3',
    BlueOverlayTrail        : 'sfx/slot/lf/lfPotTrail02.mp3',
    ScatterWinTrail         : 'sfx/slot/lf/lfLinkSymTrail01.mp3',
    LunarWinTrail           : 'sfx/slot/lf/lfLinkSymTrail02.mp3',

    // OverlayUnTrail          : 'sfx/slot/lf/lfPotUntrail.mp3',
    AddWin                  : 'sfx/slot/lf/lfLinkSum.mp3',
    ValueUp                 : 'sfx/slot/lf/lfPhaseValueup.mp3',
    ToolTip                 : 'sfx/slot/lf/lfPotOver.mp3',
    LinkEnd                 : 'sfx/slot/lf/lfFreespinEnd.mp3',
    AllFilled               : 'sfx/slot/lf/lfLinkFullcharge.mp3'
};
window.g_sndLunarFortune = ResPack.create( 'sndLunarFortune', sndLunarFortune ).concat( g_sfxSlotCommon );
//-- ↑↑↑ LunarFortune ↑↑↑ -------------------------------------------------------------------------------------//
//-- ↓↓↓ BurningSun ↓↓↓ ----------------------`-------------------------------------------------------------------//
window.sndBurningSun = {

    // -- BGM
    Bgm	                        : 'sfx/slot/bs/bsBgm.mp3',
    BonusBgm              	    : 'sfx/slot/bs/bsBonusBgm.mp3',
    FsBgm                    	: 'sfx/slot/bs/bsFsBgm.mp3',

    // // -- PAY
    Intro                 	    : 'sfx/slot/bs/bsIntro.mp3',
    Spin	                    : 'sfx/slot/bs/bsSpin.mp3',
    ReelStop	                : 'sfx/slot/bs/bsReelStop.mp3',

    MPayCount	                : 'sfx/slot/bs/bsMPayCount.mp3',
    NPayCount01	                : 'sfx/slot/bs/bsNPayCount01.mp3',
    NPayCount01End	            : 'sfx/slot/bs/bsNPayCount01End.mp3',
    NPayCount02	                : 'sfx/slot/bs/bsNPayCount02.mp3',
    NPayCount02End	            : 'sfx/slot/bs/bsNPayCount02End.mp3',
    NPayCount03	                : 'sfx/slot/bs/bsNPayCount03.mp3',
    NPayCount03End	            : 'sfx/slot/bs/bsNPayCount03End.mp3',
    MajorPopup	                : 'sfx/slot/bs/bsMajorPopup.mp3',
    JackpotPopup	            : 'sfx/slot/bs/bsJackpotPopup.mp3',
    Longspin	                : 'sfx/slot/bs/bsSLongspin.mp3',

    // -- NORMAL
    SLocking01	                : 'sfx/slot/bs/bsSLocking01.mp3',
    SLocking02	                : 'sfx/slot/bs/bsSLocking02.mp3',
    SLocking03	                : 'sfx/slot/bs/bsSLocking03.mp3',
    SMatch	                    : 'sfx/slot/bs/bsSMatch.mp3',
    BonusLocking01	            : 'sfx/slot/bs/bsBonusLocking01.mp3',
    BonusLocking02	            : 'sfx/slot/bs/bsBonusLocking02.mp3',
    BonusLocking03	            : 'sfx/slot/bs/bsBonusLocking03.mp3',
    BonusLocking04	            : 'sfx/slot/bs/bsBonusLocking04.mp3',
    BonusLocking05	            : 'sfx/slot/bs/bsBonusLocking05.mp3',
    JackpotLongSpin             : 'sfx/slot/bs/bsJackpotLongspin.mp3',

    // -- BONUS
    BonusMatch                  : 'sfx/slot/bs/bsBonusMatch.mp3',
    bsBonusOpen01               : 'sfx/slot/bs/bsBonusOpen01.mp3',
    bsBonusOpen02               : 'sfx/slot/bs/bsBonusOpen02.mp3',
    BonusTrail01	            : 'sfx/slot/bs/bsBonusTrail01.mp3',
    BonusTrail02	            : 'sfx/slot/bs/bsBonusTrail02.mp3',
    BonusSum	                : 'sfx/slot/bs/bsBonusSum.mp3',

    // -- FREESPINS
    FsIntro	                    : 'sfx/slot/bs/bsFsIntro.mp3',
    FsResult	                : 'sfx/slot/bs/bsFsResult.mp3',
};
window.g_sndBurningSun = ResPack.create( 'sndBurningSun', sndBurningSun ).concat( g_sfxSlotCommon );
//-- ↑↑↑ BurningSun END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ VegasDiamonds ↓↓↓ -------------------------------------------------------------------------------------////-- ↓↓↓ WildWildZeus ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndVegasDiamond = {
    // -- BGM
    BGM                     : 'sfx/slot/vd/vdBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/vd/vdFsBgm.mp3',
    HotshotGameBgm          : 'sfx/slot/vd/vdHBgm.mp3',
    HotshotIntro            : 'sfx/slot/vd/vdHIntro.mp3',
    FreeSpinIntro           : 'sfx/slot/vd/vdFsIntro.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/vd/vdSpin.mp3',
    ReelStop                : 'sfx/slot/vd/vdReelStop.mp3',
    LongSpin                : 'sfx/slot/vd/vdLongspin.mp3',
    QuickHitLocking         : 'sfx/slot/vd/vdQLocking.mp3',
    ScatterLocking1         : 'sfx/slot/vd/vdSLocking01.mp3',
    ScatterLocking2         : 'sfx/slot/vd/vdSLocking02.mp3',
    ScatterLocking3         : 'sfx/slot/vd/vdSLocking03.mp3',
    ScatterLocking4         : 'sfx/slot/vd/vdSLocking04.mp3',
    ScatterLocking5         : 'sfx/slot/vd/vdSLocking05.mp3',
    ScatterMatch            : 'sfx/slot/vd/vdSMatch.mp3',
    HotshotReelSpin         : 'sfx/slot/vd/vdHSpin.mp3',
    HotshotReelStop         : 'sfx/slot/vd/vdHReelStop.mp3',
    HotshotLongSpin         : 'sfx/slot/vd/vdHLongspin.mp3',
    HotshotLocking          : 'sfx/slot/vd/vdHLocking.mp3',

    // -- Counting
    MajorPayCount           : 'sfx/slot/vd/vdMPayCount.mp3',
    NormalPayCounting1      : 'sfx/slot/vd/vdNPayCount01.mp3',
    NormalPayCountEnd1      : 'sfx/slot/vd/vdNPayCount01End.mp3',
    NormalPayCounting2      : 'sfx/slot/vd/vdNPayCount02.mp3',
    NormalPayCountEnd2      : 'sfx/slot/vd/vdNPayCount02End.mp3',
    NormalPayCounting3      : 'sfx/slot/vd/vdNPayCount03.mp3',
    NormalPayCountEnd3      : 'sfx/slot/vd/vdNPayCount03End.mp3',
    HotshotNormalPayCounting: 'sfx/slot/vd/vdNPayCount01.mp3',
    HotshotNormalPayCountEnd: 'sfx/slot/vd/vdNPayCount01End.mp3',
    HotshotMajorPayCounting : 'sfx/slot/vd/vdMPayCount.mp3',


    // -- PopUp
    MajorWinPopup           : 'sfx/slot/vd/vdMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/vd/vdJackpotPopup.mp3',
    HotshotResultPopup      : 'sfx/slot/vd/vdHResult.mp3',
    FreeSpinResultPopup     : 'sfx/slot/vd/vdFsResult.mp3',

    // -- Pot
    PotTrail                : 'sfx/slot/vd/vdPotTrail.mp3',
    PotOpen                 : 'sfx/slot/vd/vdPotOpen.mp3',
    PotClose                : 'sfx/slot/vd/vdPotClose.mp3',

    // -- trail
    ScatterTrail            : 'sfx/slot/vd/vdSTrail02.mp3',
    ScatterCollect          : 'sfx/slot/vd/vdSTrail01.mp3',

    HotshotMove             : 'sfx/slot/vd/vdHMove.mp3',

    SuperPotGaugeOn         : 'sfx/slot/vd/vdLightOn.mp3'

};
window.g_sndVegasDiamond = ResPack.create( 'sndVegasDiamond', sndVegasDiamond ).concat( g_sfxSlotCommon );
//-- ↑↑↑ VegasDiamonds_END ↑↑↑ -------------------------------------------------------------------------------------//
//-- ↓↓↓ GoldMoonLink ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndGoldMoonLink = {
    // -- BGM
    Bgm                     : 'sfx/slot/gml/gmlBgm.mp3',
    LinkBgm                 : 'sfx/slot/gml/gmlLinkBgm.mp3',

    // -- Effect
    Spin                    : 'sfx/slot/gml/gmlSpin.mp3',
    ReelStop                : 'sfx/slot/gml/gmlReelStop.mp3',
    NPayCount01             : 'sfx/slot/gml/gmlNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/gml/gmlNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/gml/gmlNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/gml/gmlNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/gml/gmlNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/gml/gmlNPayCount03End.mp3',
    MPayCount               : 'sfx/slot/gml/gmlMPayCount.mp3',
    JPayCount               : 'sfx/slot/gml/gmlJackpotPaycount.mp3',
    MPopUp                  : 'sfx/slot/gml/gmlMPopUp.mp3',
    JackpotPopup 	        : 'sfx/slot/gml/gmlJackpotPopup.mp3',

    // -- Normal
    // Intro                   : 'sfx/slot/gml/gmlIntro.mp3',
    SLocking01              : 'sfx/slot/gml/gmlSLocking01.mp3',
    SLocking02              : 'sfx/slot/gml/gmlSLocking02.mp3',
    SLocking03              : 'sfx/slot/gml/gmlSLocking03.mp3',
    SLocking04              : 'sfx/slot/gml/gmlSLocking04.mp3',
    SLocking05              : 'sfx/slot/gml/gmlSLocking05.mp3',
    SLongspin               : 'sfx/slot/gml/gmlSLongspin.mp3',
    SMatch                  : 'sfx/slot/gml/gmlSMatch.mp3',
    JackpotLongspin         : 'sfx/slot/gml/gmlJackpotLongspin.mp3',
    // JackpotMatch            : 'sfx/slot/gml/gmlJackpotMatch.mp3',


    // -- Collect
    CollectLocking          : 'sfx/slot/gml/gmlCollectLocking.mp3',
    CollectMatch            : 'sfx/slot/gml/gmlCollectMatch.mp3',
    CollectPay              : 'sfx/slot/gml/gmlCollectPay.mp3',

    // -- Link
    LinkIntro               : 'sfx/slot/gml/gmlLinkIntro.mp3',
    LinkSpin                : 'sfx/slot/gml/gmlLinkSpin.mp3',
    LinkSymTrail01       : 'sfx/slot/gml/gmlLinkSymTrail01.mp3',
    LinkSymTrail02       : 'sfx/slot/gml/gmlLinkSymTrail02.mp3',

    SLocking06           : 'sfx/slot/gml/gmlSLocking06.mp3',

    LinkReelStop          : 'sfx/slot/gml/gmlLinkSpinstop.mp3',
    LinkReset            : 'sfx/slot/gml/gmlLinkReset.mp3',

    LinkSum              : 'sfx/slot/gml/gmlLinkSum.mp3',

    LinkResult              : 'sfx/slot/gml/gmlLinkResult.mp3'
};
window.g_sndGoldMoonLink = ResPack.create( 'sndGoldMoonLink', sndGoldMoonLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ GoldMoonLink_END ↑↑↑ -----------

//-- ↓↓↓ JackpotQueens BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndJackpotQueens = {
    // -- 육성사운드
    Intro                       : 'sfx/slot/jq/jqIntro.mp3',
    VoiceGrandJackpot           : 'sfx/slot/jq/jqVoiceGrandJackpot.mp3',
    VoiceMegaJackpot            : 'sfx/slot/jq/jqVoiceMegaJackpot.mp3',
    VoiceMajorJackpot           : 'sfx/slot/jq/jqVoiceMajorJackpot.mp3',
    VoiceMinorJackpot           : 'sfx/slot/jq/jqVoiceMinorJackpot.mp3',
    VoiceMiniJackpot            : 'sfx/slot/jq/jqVoiceMiniJackpot.mp3',

    // -- BGM
    Bgm                         : 'sfx/slot/jq/jqBgm.mp3',
    FsBgm                       : 'sfx/slot/jq/jqFsBgm.mp3',
    JackpotWheelBgm             : 'sfx/slot/jq/jqJackpotWheelBgm.mp3',

    // -- PAY
    Spin                        : 'sfx/slot/jq/jqSpin.mp3',
    ReelStop                    : 'sfx/slot/jq/jqReelStop.mp3',
    MPayCount                   : 'sfx/slot/jq/jqMPayCount.mp3',
    NPayCount01                 : 'sfx/slot/jq/jqNPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/jq/jqNPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/jq/jqNPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/jq/jqNPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/jq/jqNPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/jq/jqNPayCount03End.mp3',
    MajorPopup                  : 'sfx/slot/jq/jqMajorPopup.mp3',
    JackpotPopup                : 'sfx/slot/jq/jqJackpotPopup.mp3',

    // -- NORMAL
    SLongspin                   : 'sfx/slot/jq/jqSLongspin.mp3',
    SLocking01                  : 'sfx/slot/jq/jqSLocking01.mp3',
    SLocking02                  : 'sfx/slot/jq/jqSLocking02.mp3',
    SLocking03                  : 'sfx/slot/jq/jqSLocking03.mp3',
    SLocking04                  : 'sfx/slot/jq/jqSLocking04.mp3',
    OverlayTrail01              : 'sfx/slot/jq/jqOverlayTrail01.mp3',
    // OverlayTrail02              : 'sfx/slot/jq/jqOverlayTrail02.mp3',
    // OverlayTrail03              : 'sfx/slot/jq/jqOverlayTrail03.mp3',
    SMatch                      : 'sfx/slot/jq/jqSMatch.mp3',

    // -- PICK
    PickIntro                   : 'sfx/slot/jq/jqPickIntro.mp3',
    PickSymbolOver              : 'sfx/slot/jq/jqPickSymbolOver.mp3',
    PickSymbolOpen              : 'sfx/slot/jq/jqPickSymbolOpen.mp3',
    // PickFreespinuiOpen          : 'sfx/slot/jq/jqPickFreespinuiOpen.mp3',

    // -- WHEEL
    WheelIntro                  : 'sfx/slot/jq/jqWheelIntro.mp3',
    WheelSpin                   : 'sfx/slot/jq/jqWheelSpin.mp3',
    WheelIndicatorHighlight     : 'sfx/slot/jq/jqWheelIndicatorHighlight.mp3',
    WheelJackpotUiOpen 	        : 'sfx/slot/jq/jqWheelJackpotUiOpen.mp3',
    // WheelJackpotUiUpCounting    : 'sfx/slot/jq/jqWheelJackpotUiUpCounting.mp3',
    WheelBonusPrizeMatch 	    : 'sfx/slot/jq/jqWheelBonusPrizeMatch.mp3',
    WheelOutro 	                : 'sfx/slot/jq/jqWheelOutro.mp3',
    JackpotUiClose 	            : 'sfx/slot/jq/jqJackpotUiClose.mp3',
    BonusPrizeTrail 	        : 'sfx/slot/jq/jqBonusPrizeTrail.mp3',

    // -- FREE SPIN
    BonusSymTrail 	            : 'sfx/slot/jq/jqBonusSymTrail.mp3',
    // FreespinRetriggerPopupOpen 	: 'sfx/slot/jq/jqFreespinRetriggerPopupOpen.mp3',
    // FreespinRetriggerPopupOpen02: 'sfx/slot/jq/jqFreespinRetriggerPopupOpen02.mp3',
    FreespinRetriggerCountUp 	: 'sfx/slot/jq/jqFreespinRetriggerCountUp.mp3',
    FreespinResult 	            : 'sfx/slot/jq/jqFreespinResult.mp3',
};
window.g_sndJackpotQueens = ResPack.create( 'sndJackpotQueens', sndJackpotQueens ).concat( g_sfxSlotCommon );
//-- ↑↑↑ JackpotQueens END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ MonsterParade ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMonsterParade = {
    // BGM
    Intro                   : 'sfx/slot/mp/mpIntro.mp3',
    Bgm                     : 'sfx/slot/mp/mpBgm.mp3',
    FreeSpin                : 'sfx/slot/mp/mpFsBgm.mp3',
    ReSpin                  : 'sfx/slot/mp/mpReBgm.mp3',

    MiniGame                : 'sfx/slot/mp/mpMinigameBgm.mp3',
    Spin                    : 'sfx/slot/mp/mpSpin.mp3',
    ReelStop                : 'sfx/slot/mp/mpReelStop.mp3',
    ChangeBet               : 'sfx/slot/mp/mpBetChange.mp3',

    // Pay
    MPayCount               : 'sfx/slot/mp/mpMPayCount.mp3',
    NPayCount01             : 'sfx/slot/mp/mpNPayCount01.mp3',
    NPayCount02             : 'sfx/slot/mp/mpNPayCount02.mp3',
    NPayCount03             : 'sfx/slot/mp/mpNPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/mp/mpNPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/mp/mpNPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/mp/mpNPayCount03End.mp3',

    MajorPopup              : 'sfx/slot/mp/mpMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/mp/mpJackpotPopup.mp3',

    MiniMapOverFx           : 'sfx/slot/mp/mpMapOver.mp3',
    MiniMapClick            : 'sfx/slot/mp/mpMapClick.mp3',
    MapOpen                 : 'sfx/slot/mp/mpMapOpen.mp3',
    MapGauge                : 'sfx/slot/mp/mpMapNormalGauge.mp3',
    SuperBonusGauge         : 'sfx/slot/mp/mpMapSuperbonusGauge.mp3',
    LastSuperBonusGauge     : 'sfx/slot/mp/mpMapLastSuperbonusGauge.mp3',
    ClearHouse              : 'sfx/slot/mp/mpMapSuperbonusCleared.mp3',
    MapLastSuperSet         : 'sfx/slot/mp/mpMapLastSuperbonusSet.mp3',

    ShortSymbolTrail        : 'sfx/slot/mp/mpPotTrail01.mp3',
    LongSymbolTrail         : 'sfx/slot/mp/mpPotTrail02.mp3',
    Pot                     : 'sfx/slot/mp/mpPotOpen.mp3',

    RespinIntro	            : 'sfx/slot/mp/mpRespinIntro.mp3',
    RespinShake	            : 'sfx/slot/mp/mpRespinShake.mp3',
    Respin  	            : 'sfx/slot/mp/mpRespinSpin.mp3',

    JackpotLock  	        : 'sfx/slot/mp/mpExtraJackpotLock.mp3',
    ExtraSymbolLock         : 'sfx/slot/mp/mpExtraDirectpayLock.mp3',
    MiniGameLock            : 'sfx/slot/mp/mpExtraMinigameLock.mp3',

    MiniGameIntro           : 'sfx/slot/mp/mpExtraMinigameIntro.mp3',
    ExtraSymPay             : 'sfx/slot/mp/mpExtraSymPay.mp3',

    WinPanelUpCounting      : 'sfx/slot/mp/mpBonuswinAdd.mp3',

    LongSpin                : 'sfx/slot/mp/mpLongspin.mp3',

    FreespinIntro           : 'sfx/slot/mp/mpFsIntro.mp3',
    SuperFreespinIntro      : 'sfx/slot/mp/mpFsIntroSuper.mp3',
    RespinResult            : 'sfx/slot/mp/mpFsResult.mp3',

    MiniGameWinRespin       : 'sfx/slot/mp/mpMinigameIntro01.mp3',
    MiniGameRespin          : 'sfx/slot/mp/mpMinigameIntro02.mp3',
    MiniGameMultiPlier      : 'sfx/slot/mp/mpMinigameIntro03.mp3',
    MiniGameWilds           : 'sfx/slot/mp/mpMinigameIntro04.mp3',

    WildStack               : 'sfx/slot/mp/mpMinigameWildSet.mp3',

    MiniGameNotiSet         : 'sfx/slot/mp/mpMinigameNotiSet.mp3',
    MiniGameToolTipChange   : 'sfx/slot/mp/mpMinigameNotiChange.mp3',
    MiniGameToolTipClose    : 'sfx/slot/mp/mpMinigameNotiClose.mp3',

    MultiplyerSetCount      : 'sfx/slot/mp/mpMinigameMultiplierSet.mp3',
    MultiplyerUpCount       : 'sfx/slot/mp/mpMinigameMultiplierCount.mp3',

    JackpotPopUpGrand       : 'sfx/slot/mp/mpVoiceGrandJackpot.mp3',
    JackpotPopUpMega        : 'sfx/slot/mp/mpVoiceMegaJackpot.mp3',
    JackpotPopUpMajor       : 'sfx/slot/mp/mpVoiceMajorJackpot.mp3',
    JackpotPopUpMinor       : 'sfx/slot/mp/mpVoiceMinorJackpot.mp3',
    JackpotPopUpMini        : 'sfx/slot/mp/mpVoiceMiniJackpot.mp3'
};
window.g_sndMonsterParade = ResPack.create( 'sndMonsterParade', sndMonsterParade ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MonsterParade_END ↑↑↑ -----------

//-- ↓↓↓ JackpotMagic ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndJackpotMagic = {
    Intro                   : 'sfx/slot/jm/jmIntro.mp3',
    // -- BGM
    Bgm                     : 'sfx/slot/jm/jmBgm.mp3',
    FsBgm                   : 'sfx/slot/jm/jmFsBgm.mp3',

    // -- Spin
    Spin                    : 'sfx/slot/jm/jmSpin.mp3',
    ReelStop                : 'sfx/slot/jm/jmReelStop.mp3',
    LongSpin                : 'sfx/slot/jm/jmSLongspin.mp3',
    MaxSpin                 : 'sfx/slot/jm/jm10thEffect.mp3',
    MaxSpin2                 : 'sfx/slot/jm/jm10thEffect2.mp3',

    // -- Free Spin
    AddedWild               : 'sfx/slot/jm/jmJackpotEffect.mp3',
    Retrigger               : 'sfx/slot/jm/jmFsRetrigger.mp3',

    // -- Symbol Effect
    ScatterLock01           : 'sfx/slot/jm/jmSLocking01.mp3',
    ScatterLock02           : 'sfx/slot/jm/jmSLocking02.mp3',
    ScatterLock03           : 'sfx/slot/jm/jmSLocking03.mp3',
    ScatterLock04           : 'sfx/slot/jm/jmSLocking04.mp3',
    ScatterLock05           : 'sfx/slot/jm/jmSLocking05.mp3',
    TriggerLock             : 'sfx/slot/jm/jmTriggerLocking.mp3',
    ScatterMatch            : 'sfx/slot/jm/jmSMatch.mp3',
    LockJackpot             : 'sfx/slot/jm/jmJackpotLocking.mp3',
    // LockJackpotWild         : 'sfx/slot/jm/jmJackpotLocking.mp3',

    // -- Bonus pot
    Pot         : 'sfx/slot/jm/jmGauge.mp3',

    // -- Frame Effect
    Frame01                 : 'sfx/slot/jm/jmFrame01On.mp3',
    Frame02                 : 'sfx/slot/jm/jmFrame02On.mp3',
    FrameDown               : 'sfx/slot/jm/jmFrame03on.mp3',

    // -- Chagne Jackpot
    ChangeJackpot00         : 'sfx/slot/jm/jmJackpotChange00.mp3',
    ChangeJackpot01         : 'sfx/slot/jm/jmJackpotChange01.mp3',
    ChangeJackpot02         : 'sfx/slot/jm/jmJackpotChange02.mp3',
    ChangeJackpot03         : 'sfx/slot/jm/jmJackpotChange03.mp3',
    ChangeJackpot04         : 'sfx/slot/jm/jmJackpotChange04.mp3',
    ChangeJackpot05         : 'sfx/slot/jm/jmJackpotChange05.mp3',
    ChangeJackpot06         : 'sfx/slot/jm/jmJackpotChange06.mp3',
    ChangeJackpot07         : 'sfx/slot/jm/jmJackpotChange07.mp3',
    ChangeJackpot08         : 'sfx/slot/jm/jmJackpotChange08.mp3',
    ChangeJackpot09         : 'sfx/slot/jm/jmJackpotChange09.mp3',
    ChangeJackpot10         : 'sfx/slot/jm/jmJackpotChange10.mp3',
    ChangeJackpot11         : 'sfx/slot/jm/jmJackpotChange11.mp3',
    ChangeJackpot12         : 'sfx/slot/jm/jmJackpotChange12.mp3',
    ChangeJackpot13         : 'sfx/slot/jm/jmJackpotChange13.mp3',
    ChangeJackpot14         : 'sfx/slot/jm/jmJackpotChange14.mp3',
    ChangeJackpot15         : 'sfx/slot/jm/jmJackpotChange15.mp3',
    // ChangeJackpotEnd        : 'sfx/slot/jm/jmJackpotChangeEnd.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/jm/jmMPayCount.mp3',
    NPayCount01             : 'sfx/slot/jm/jmNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/jm/jmNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/jm/jmNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/jm/jmNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/jm/jmNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/jm/jmNPayCount03End.mp3',

    // -- PopUp
    MajorPopUp              : 'sfx/slot/jm/jmMajorPopup.mp3',
    JackpotPopUp            : 'sfx/slot/jm/jmJackpotPopup.mp3',
    FsResult                : 'sfx/slot/jm/jmFsResult.mp3',
    FsIntro                 : 'sfx/slot/jm/jmFsIntro.mp3',
    SuperFsIntro            : 'sfx/slot/jm/jmSuperFsIntro.mp3'

};
window.g_sndJackpotMagic = ResPack.create( 'sndJackpotMagic', sndJackpotMagic ).concat( g_sfxSlotCommon );
//-- ↑↑↑ LunarFortune ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ Mamoth Stampede_END ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMammothStampede = {
    // -- INTRO
    Intro                   : 'sfx/slot/mam/mamIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/mam/mamBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/mam/mamFsBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/mam/mamSpin.mp3',
    ReelStop                : 'sfx/slot/mam/mamReelStop.mp3',
    MPayCount	            : 'sfx/slot/mam/mamMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/mam/mamNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/mam/mamNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/mam/mamNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/mam/mamNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/mam/mamNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/mam/mamNPayCount03End.mp3',

    // -- NORMAL
    WildLocking01 	        : 'sfx/slot/mam/mamWildLocking01.mp3',
    WildLocking02 	        : 'sfx/slot/mam/mamWildLocking02.mp3',
    WildMatch               : 'sfx/slot/mam/mamWildMatch.mp3',
    ScatterLocking1         : 'sfx/slot/mam/mamSLocking01.mp3',
    ScatterLocking2         : 'sfx/slot/mam/mamSLocking02.mp3',
    ScatterLocking3         : 'sfx/slot/mam/mamSLocking03.mp3',
    ScatterLocking4         : 'sfx/slot/mam/mamSLocking04.mp3',
    ScatterLocking5         : 'sfx/slot/mam/mamSLocking05.mp3',
    ScatterLocking6         : 'sfx/slot/mam/mamSLocking06.mp3',
    LongSpin                : 'sfx/slot/mam/mamLongSpin.mp3',
    SMatch                  : 'sfx/slot/mam/mamSMatch.mp3',

    // -- SUPER BONUS
    GaugeOver               : 'sfx/slot/mam/mamGaugeOver.mp3',
    NormalGaugeCount        : 'sfx/slot/mam/mamNormalGaugeCount.mp3',
    SuperGaugeCount         : 'sfx/slot/mam/mamSuperbonusGaugeCount.mp3',

    // -- FREE SPIN
    FsIntro                 : 'sfx/slot/mam/mamFsIntro.mp3',
    FsIntroSuper            : 'sfx/slot/mam/mamFsIntroSuper.mp3',
    FsResult                : 'sfx/slot/mam/mamFsResult.mp3',
    FsWildAdd               : 'sfx/slot/mam/mamFsWildAdd.mp3',
    Premonition             : 'sfx/slot/mam/mamPremonition.mp3',
    BeforePremonition       : 'sfx/slot/mam/mamBeforePremonition.mp3',
    PremonitionLongSpin     : 'sfx/slot/mam/mamPremonitionLongspin.mp3',

    VoiceFsIntro            : 'sfx/slot/mam/mamVoiceFsIntro.mp3',
    VoiceFsIntroSuper       : 'sfx/slot/mam/mamVoiceFsIntroSuper.mp3',
};
window.g_sndMammothStampede = ResPack.create( 'sndMammothStampede', sndMammothStampede ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Mamoth Stampede END ↑↑↑ -------------------------------------------------------------------------------------//


//-- ↓↓↓ CandyConnectLink ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndCandyConnectLink = {

    Intro               : 'sfx/slot/cc/ccVoiceIntro.mp3',
    // -- BGM
    Bgm                 : 'sfx/slot/cc/ccBgm.mp3',
    LinkBgm             : 'sfx/slot/cc/ccLinkBgm.mp3',
    PotLinkBgm          : 'sfx/slot/cc/ccPotLinkBgm.mp3',

    // -- Spin
    Spin                : 'sfx/slot/cc/ccSpin.mp3',
    ReelStop            : 'sfx/slot/cc/ccReelStop.mp3',
    LongSpin            : 'sfx/slot/cc/ccLongspin.mp3',

    // -- Symbol Effect
    LinkLock01          : 'sfx/slot/cc/ccLinkLocking01.mp3',
    LinkLock02          : 'sfx/slot/cc/ccLinkLocking02.mp3',
    LinkLock03          : 'sfx/slot/cc/ccLinkLocking03.mp3',
    LinkLock04          : 'sfx/slot/cc/ccLinkLocking04.mp3',
    LinkLock05          : 'sfx/slot/cc/ccLinkLocking05.mp3',
    LinkMatch           : 'sfx/slot/cc/ccLinkMatch.mp3',

    // -- Link
    RemainSpinCountUp   : 'sfx/slot/cc/ccLinkRespinCount.mp3',
    // LinkLock            : 'sfx/slot/cc/ccLock.mp3',
    MoveDown            : 'sfx/slot/cc/ccDrop.mp3',
    ValueUp             : 'sfx/slot/cc/ccUpgrade.mp3',
    LinkTrail           : 'sfx/slot/cc/ccLinkTrail.mp3',
    LinkBlockBreak     : 'sfx/slot/cc/ccVoiceOpen.mp3',
    ValueUp01           : 'sfx/slot/cc/ccVoiceClear01.mp3',// 'sfx/slot/cc/ccClearTotal.mp3',
    ValueUp02           : 'sfx/slot/cc/ccVoiceClear02.mp3',
    ValueUp03           : 'sfx/slot/cc/ccVoiceClear03.mp3',
    ValueUp04           : 'sfx/slot/cc/ccVoiceClear04.mp3',
    ClearSymbol         : 'sfx/slot/cc/ccLinkClear.mp3',

    // -- Counting
    MPayCount           : 'sfx/slot/cc/ccMPayCount.mp3',
    NPayCount01         : 'sfx/slot/cc/ccNPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/cc/ccNPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/cc/ccNPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/cc/ccNPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/cc/ccNPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/cc/ccNPayCount03End.mp3',

    // -- PopUp
    MajorPopUp          : 'sfx/slot/cc/ccMajorPopup.mp3',
    JackpotPopUp        : 'sfx/slot/cc/ccJackpotPopup.mp3',
    LinkResult          : 'sfx/slot/cc/ccLinkResult.mp3',
    LinkIntroBase       : 'sfx/slot/cc/ccLinkIntro.mp3',
    LinkIntro           : 'sfx/slot/cc/ccVoiceLinkIntro.mp3',
    PotLinkIntro        : 'sfx/slot/cc/ccVoiceSuperLinkIntro.mp3',
    SuperPotLinkIntro   : 'sfx/slot/cc/ccVoiceMegaLinkIntro.mp3',

    GrandJackpot        : 'sfx/slot/cc/ccVoiceGrand.mp3',
    MegaJackpot         : 'sfx/slot/cc/ccVoiceMega.mp3',
    MajorJackpot        : 'sfx/slot/cc/ccVoiceMajor.mp3',
    MinorJackpot        : 'sfx/slot/cc/ccVoiceMinor.mp3',

    LinkResultRandom01  : 'sfx/slot/cc/ccVoiceCongrat01.mp3',
    LinkResultRandom02  : 'sfx/slot/cc/ccVoiceCongrat02.mp3',
    LinkResultRandom03  : 'sfx/slot/cc/ccVoiceCongrat03.mp3',

    // -- Pot
    PotTrail            : 'sfx/slot/cc/ccNormalTrail.mp3',
    PotOpen            : 'sfx/slot/cc/ccPotOpen.mp3',

    // -- Map
    MiniMapOverFx       : 'sfx/slot/cc/ccMapOver.mp3',
    MiniMapClick        : 'sfx/slot/cc/ccMapClick.mp3',
    MapOpen             : 'sfx/slot/cc/ccMapOpen.mp3',
    MapClose            : 'sfx/slot/cc/ccMapClose.mp3',
    MapGauge            : 'sfx/slot/cc/ccMapNormalGage.mp3',
    SuperBonusGauge     : 'sfx/slot/cc/ccMapSuperbonusGage.mp3',
    LastSuperBonusGauge : 'sfx/slot/cc/ccMapLastSuperbonusGage.mp3',
    ClearHouse          : 'sfx/slot/cc/ccMapSuperbonusCleared.mp3',
    MapLastSuperSet     : 'sfx/slot/cc/ccMapLastSuperbonusSet.mp3',

};
window.g_sndCandyConnectLink = ResPack.create( 'sndCandyConnectLink', sndCandyConnectLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ CandyConnectLink ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ MermaidMagic BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMermaidMagic = {
    // BGM
    Bgm                     : 'sfx/slot/mm/mmBgm.mp3',
    FsBgm                   : 'sfx/slot/mm/mmFsBgm.mp3',

    Intro                   : 'sfx/slot/mm/mmIntro.mp3',

    Spin                    : 'sfx/slot/mm/mmSpin.mp3',
    ReelStop                : 'sfx/slot/mm/mmReelStop.mp3',

    // Pay
    MPayCount               : 'sfx/slot/mm/mmMPayCount.mp3',
    NPayCount01             : 'sfx/slot/mm/mmNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/mm/mmNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/mm/mmNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/mm/mmNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/mm/mmNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/mm/mmNPayCount03End.mp3',

    MajorPopup              : 'sfx/slot/mm/mmMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/mm/mmJackpotPopup.mp3',

    BTrail01                : 'sfx/slot/mm/mmBTrail01.mp3',
    BTrail02                : 'sfx/slot/mm/mmBTrail02.mp3',
    BTrail03                : 'sfx/slot/mm/mmBTrail03.mp3',
    BMatch                  : 'sfx/slot/mm/mmBMatch.mp3',
    Longspin                : 'sfx/slot/mm/mmLongspin.mp3',
    SLocking01              : 'sfx/slot/mm/mmSLocking01.mp3',
    SLocking02              : 'sfx/slot/mm/mmSLocking02.mp3',
    SLocking03              : 'sfx/slot/mm/mmSLocking03.mp3',
    BMaking01               : 'sfx/slot/mm/mmBMaking01.mp3',
    BMaking02               : 'sfx/slot/mm/mmBMaking02.mp3',
    SMatch                  : 'sfx/slot/mm/mmSMatch.mp3',

    FsOver                  : 'sfx/slot/mm/mmFsOver.mp3',
    FsClick                 : 'sfx/slot/mm/mmFsClick.mp3',
    FsClickPopup            : 'sfx/slot/mm/mmFsClickPopup.mp3',

    FsIntro	                : 'sfx/slot/mm/mmFsIntro.mp3',
    FsResult  	            : 'sfx/slot/mm/mmFsResult.mp3',

    VMiniJackpot  	        : 'sfx/slot/mm/mmVMiniJackpot.mp3',
    VMinorJackpot  	        : 'sfx/slot/mm/mmVMinorJackpot.mp3',
    VMajorJackpot  	        : 'sfx/slot/mm/mmVMajorJackpot.mp3',
    VMegaJackpot  	        : 'sfx/slot/mm/mmVMegaJackpot.mp3',
    VGrandJackpot  	        : 'sfx/slot/mm/mmVGrandJackpot.mp3',
    VPinkIntro  	        : 'sfx/slot/mm/mmVPinkIntro.mp3',
    VGreenIntro  	        : 'sfx/slot/mm/mmVGreenIntro.mp3',
    VBMaking01  	        : 'sfx/slot/mm/mmVBMaking01.mp3',
    VBMaking02  	        : 'sfx/slot/mm/mmVBMaking02.mp3',
    VBMaking03  	        : 'sfx/slot/mm/mmVBMaking03.mp3'
};
window.g_sndMermaidMagic = ResPack.create( 'sndMermaidMagic', sndMermaidMagic ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MermaidMagic END ↑↑↑ -----------

// -- ↑↑↑ DragonsDiamond ↑↑↑ -------------------------------------------------------------------------------------//
window.sndDragonsDiamond = {
    // Intro
    Intro                    : 'sfx/slot/dd/ddIntro.mp3',

    //BGM
    Bgm                      : 'sfx/slot/dd/ddBgm.mp3',
    FreeSpinBgm              : 'sfx/slot/dd/ddFsBgm.mp3',
    WheelBgm                 : 'sfx/slot/dd/ddWheelBgm.mp3',

    //Pay
    Spin                     : 'sfx/slot/dd/ddSpin.mp3',
    ReelStop                 : 'sfx/slot/dd/ddReelStop.mp3',
    MPayCount                : 'sfx/slot/dd/ddMPayCount.mp3',
    NPayCount01              : 'sfx/slot/dd/ddNPayCount01.mp3',
    NPayCount02              : 'sfx/slot/dd/ddNPayCount02.mp3',
    NPayCount03              : 'sfx/slot/dd/ddNPayCount03.mp3',
    NPayCount01End           : 'sfx/slot/dd/ddNPayCount01End.mp3',
    NPayCount02End           : 'sfx/slot/dd/ddNPayCount02End.mp3',
    NPayCount03End           : 'sfx/slot/dd/ddNPayCount03End.mp3',
    MajorPopup               : 'sfx/slot/dd/ddMajorPopup.mp3',
    JackpotPopup             : 'sfx/slot/dd/ddJackpotPopup.mp3',

    //Normal
    MultiplierOpen           : 'sfx/slot/dd/ddMultiplierOpen.mp3',
    MultiplierOpen2          : 'sfx/slot/dd/ddMultiplierOpen02.mp3',
    WildChange               : 'sfx/slot/dd/ddWildChange.mp3',
    SLocking01               : 'sfx/slot/dd/ddSLocking01.mp3',
    SLocking02               : 'sfx/slot/dd/ddSLocking02.mp3',
    SLocking03               : 'sfx/slot/dd/ddSLocking03.mp3',
    SLocking04               : 'sfx/slot/dd/ddSLocking04.mp3',
    SLocking05               : 'sfx/slot/dd/ddSLocking05.mp3',
    WLocking                 : 'sfx/slot/dd/ddWildLocking.mp3',
    LongSpin                 : 'sfx/slot/dd/ddSLongspin.mp3',
    SMatch                   : 'sfx/slot/dd/ddSMatch.mp3',
    OverlayTrail             : 'sfx/slot/dd/ddOverlayTrail01.mp3',
    OverlayTrail2            : 'sfx/slot/dd/ddOverlayTrail02.mp3',
    DLocking                 : 'sfx/slot/dd/ddDLocking.mp3',
    ToolTip                  : 'sfx/slot/dd/ddMouseOver.mp3',


    //Wheel

    WheelIntro               : 'sfx/slot/dd/ddWheelIntro.mp3',
    WheelOutro               : 'sfx/slot/dd/ddWheelOutro.mp3',
    WheelSpin                : 'sfx/slot/dd/ddWheelSpin.mp3',
    WheelIndiHighlight       : 'sfx/slot/dd/ddWheelIndicatorHighlight.mp3',

    WheelMultiFreeSpinMatch  : 'sfx/slot/dd/ddWheelMultiplierFreespinMatch.mp3',
    WheelNormalFreespinMatch : 'sfx/slot/dd/ddWheelNormalFreespinMatch.mp3',
    WheelTrail               : 'sfx/slot/dd/ddWheelFreespinWedgeTrail.mp3',

    FreeSpinRet              : 'sfx/slot/dd/ddFreespinRetriggerPopUp.mp3',
    FreeSpinResult           : 'sfx/slot/dd/ddFreespinResult.mp3'
};
window.g_sndDragonsDiamond = ResPack.create( 'sndDragonsDiamond', sndDragonsDiamond ).concat( g_sfxSlotCommon );
//-- ↑↑↑ DragonsDiamond_END ↑↑↑ -----------

//-- ↑↑↑ Piggy King BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndPiggyKing = {
    // -- INTRO
    Intro                   : 'sfx/slot/pg/pgIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/pg/pgBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/pg/pgFsBgm.mp3',
    ReSpinBgm               : 'sfx/slot/pg/pgReBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/pg/pgSpin.mp3',
    ReelStop                : 'sfx/slot/pg/pgReelStop.mp3',
    MPayCount	            : 'sfx/slot/pg/pgMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/pg/pgNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/pg/pgNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/pg/pgNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/pg/pgNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/pg/pgNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/pg/pgNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/pg/pgMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/pg/pgJackpotPopup.mp3',

    // -- NORMAL
    LongSpin                : 'sfx/slot/pg/pgLongspin.mp3',
    NormalSymbolLocking 	: 'sfx/slot/pg/pgNormalJSymLocking.mp3',
    Trail                   : 'sfx/slot/pg/pgTrail01.mp3',
    PotOpen                 : 'sfx/slot/pg/pgPotOpen.mp3',
    PotPre                  : 'sfx/slot/pg/pgPotPre.mp3',

    // -- RESPIN
    RespinIntro             : 'sfx/slot/pg/pgRespinPopup.mp3',
    RespinResult            : 'sfx/slot/pg/pgRspinResult.mp3',
    BonusWinPanelOpen       : 'sfx/slot/pg/pgBonusWinPannelOpen.mp3',
    BonusWinPanelAdd        : 'sfx/slot/pg/pgBonusWinAdd.mp3',
    BonusWinPanelResult     : 'sfx/slot/pg/pgBonusWinResult.mp3',
    BonusWinPanelClose      : 'sfx/slot/pg/pgBonusWinPannelClose.mp3',

    // -- FREE SPIN
    FsIntro                 : 'sfx/slot/pg/pgFsIntro.mp3',
    FsResult                : 'sfx/slot/pg/pgFsResult.mp3',

    // -- SUPER BONUS
    StickyJSymLocking       : 'sfx/slot/pg/pgOverlayLocking.mp3',
    StickyJSymbolLocking    : 'sfx/slot/pg/pgStickyJSymLocking.mp3',
    RespinSymbolRetrigger   : 'sfx/slot/pg/pgRespinRetrigger.mp3',
    Trail01                 : 'sfx/slot/pg/pgTrail02.mp3',


    // -- MAP
    MiniMapOverFx           : 'sfx/slot/pg/pgMapOver.mp3',
    MiniMapClick            : 'sfx/slot/pg/pgMapClick.mp3',
    MapOpen                 : 'sfx/slot/pg/pgMapOpen.mp3',
    MapGauge                : 'sfx/slot/pg/pgMapNormalGauge.mp3',
    SuperBonusGauge         : 'sfx/slot/pg/pgMapSuperbonusGauge.mp3',
    LastSuperBonusGauge     : 'sfx/slot/pg/pgMapLastSuperbonusGauge.mp3',
    ClearHouse              : 'sfx/slot/pg/pgMapSuperbonusCleared.mp3',
    MapLastSuperSet         : 'sfx/slot/pg/pgMapLastSuperbonusSet.mp3',
};
window.g_sndPiggyKing = ResPack.create( 'sndPiggyKing', sndPiggyKing ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Piggy King END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ FortuneBlast ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFortuneBlast = {

    Intro               : 'sfx/slot/fb/fbIntro.mp3',        //V
    // -- BGM
    Bgm                 : 'sfx/slot/fb/fbBgm.mp3',          //V
    FreeSpinBgm         : 'sfx/slot/fb/fbFsBgm.mp3',
    LinkBgm             : 'sfx/slot/fb/fbLinkBgm.mp3',      //V

    // -- Spin
    Spin                : 'sfx/slot/fb/fbSpin.mp3',         //V

    ReelStop            : 'sfx/slot/fb/fbReelStop.mp3',     //V

    // -- Counting
    MPayCount           : 'sfx/slot/fb/fbMPayCount.mp3',        //V
    NPayCount01         : 'sfx/slot/fb/fbNPayCount01.mp3',      //V
    NPayCount01End      : 'sfx/slot/fb/fbNPayCount01End.mp3',   //V
    NPayCount02         : 'sfx/slot/fb/fbNPayCount02.mp3',      //V
    NPayCount02End      : 'sfx/slot/fb/fbNPayCount02End.mp3',   //V
    NPayCount03         : 'sfx/slot/fb/fbNPayCount03.mp3',      //V
    NPayCount03End      : 'sfx/slot/fb/fbNPayCount03End.mp3',   //V

    // -- PopUp
    MajorPopup          : 'sfx/slot/fb/fbMajorPopup.mp3',       //V
    JackpotPopup        : 'sfx/slot/fb/fbJackpotPopup.mp3',     //V
    //
    // JackpotPopUpMini    :
    // JackpotPopUpMinor   :
    // JackpotPopUpMajor   :
    //
    // JackpotPopUpMega    :
    // JackpotPopUpGrand   :
    //WLocking             : 'sfx/slot/fb/fbWLocking.mp3',    //V
    Locking01            : 'sfx/slot/fb/fbSLocking01.mp3',  //V
    Locking02            : 'sfx/slot/fb/fbSLocking02.mp3',  //V
    Locking03            : 'sfx/slot/fb/fbSLocking03.mp3',  //V
    Locking04            : 'sfx/slot/fb/fbSLocking04.mp3',  //V
    Locking05            : 'sfx/slot/fb/fbSLocking05.mp3',  //V

    LongSpin            : 'sfx/slot/fb/fbSLongspin.mp3',    //V
    Match               : 'sfx/slot/fb/fbSMatch.mp3',

    // -- pot
    PotOpen             : 'sfx/slot/fb/fbPotOpen.mp3',      //V
    SuperBonusGaugeOn   : 'sfx/slot/fb/fbGuage.mp3',        //V

    //--- Nudge
    WildNudge           : 'sfx/slot/fb/fbWildNudge.mp3',

    // -- potTrail
    Trail               : 'sfx/slot/fb/fbTrail.mp3',        //V
    Trail02             : 'sfx/slot/fb/fbTrail02.mp3',      //v

    // -- Link
    LinkIntro           : 'sfx/slot/fb/fbLinkIntro.mp3',        //V
    //SuperLinkIntro      : 'sfx/slot/fb/fbSuperLinkIntro.mp3',   //V
    LinkReelStart       : 'sfx/slot/fb/fbLinkReelstart.mp3',    //V

    LinkReelstop        : 'sfx/slot/fb/fbLinkReelstop.mp3',     //V
    SymTransform        : 'sfx/slot/fb/fbSymTransform.mp3',

    LinkSymLocking      : 'sfx/slot/fb/fbSymLocking.mp3',       //v

    SymFire             : 'sfx/slot/fb/fbSymFire.mp3',

    // -- TapToSpin
    SymClick            : 'sfx/slot/fb/fbSymClick.mp3',         //V
    SymSpin             : 'sfx/slot/fb/fbSymSpin.mp3',          //V
    SymDirectPay        : 'sfx/slot/fb/fbSymDirectPay.mp3',     //V
    SymJackpot          : 'sfx/slot/fb/fbSymJackpot.mp3',       //V
    SymTapDirectPay     : 'sfx/slot/fb/fbTapDirectPay.mp3',     //V

    // -- link Popup
    LinkResult           : 'sfx/slot/fb/fbLinkResult.mp3',      //V

    // -- freeSpin
    FreespinIntro         : 'sfx/slot/fb/fbFsIntro.mp3',        //V
    FreespinResult        : 'sfx/slot/fb/fbFreespinResult.mp3', //V

    TipOver               : 'sfx/slot/fb/fbtipOver.mp3',
    PotPre                : 'sfx/slot/fb/fbPotPre.mp3',

    LinkCount           : 'sfx/slot/fb/fbLinkCount.mp3',
};
window.g_sndFortuneBlast = ResPack.create( 'sndFortuneBlast', sndFortuneBlast ).concat( g_sfxSlotCommon );
//-- ↑↑↑ FortuneBlast ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ Bank of Jackpot BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndBankOfJackpot = {
    // INTRO
    Intro                   : 'sfx/slot/bj/bjIntro.mp3',

    // BGM
    Bgm                     : 'sfx/slot/bj/bjBgm.mp3',
    FsBgm                   : 'sfx/slot/bj/bjFsBgm.mp3',

    // PAY
    Spin                    : 'sfx/slot/bj/bjSpin.mp3',
    ReelStop                : 'sfx/slot/bj/bjReelStop.mp3',
    MPayCount               : 'sfx/slot/bj/bjMPayCount.mp3',
    NPayCount01             : 'sfx/slot/bj/bjNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/bj/bjNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/bj/bjNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/bj/bjNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/bj/bjNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/bj/bjNPayCount03End.mp3',
    MajorPopup              : 'sfx/slot/bj/bjMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/bj/bjJackpotPopup.mp3',

    // NORMAL
    SLocking01              : 'sfx/slot/bj/bjSLocking01.mp3',
    SLocking02              : 'sfx/slot/bj/bjSLocking02.mp3',
    SLocking03              : 'sfx/slot/bj/bjSLocking03.mp3',
    TipOver                 : 'sfx/slot/bj/bjTipOver.mp3',
    JLocking                : 'sfx/slot/bj/bjJlocking.mp3',
    JCount01                : 'sfx/slot/bj/bjJCount01.mp3',
    JCount02                : 'sfx/slot/bj/bjJCount02.mp3',
    JCount03                : 'sfx/slot/bj/bjJCount03.mp3',
    JCount04                : 'sfx/slot/bj/bjJCount04.mp3',
    JCount05                : 'sfx/slot/bj/bjJCount05.mp3',
    JCount06                : 'sfx/slot/bj/bjJCount06.mp3',
    JCount07                : 'sfx/slot/bj/bjJCount07.mp3',
    JCount08                : 'sfx/slot/bj/bjJCount08.mp3',
    JCount09                : 'sfx/slot/bj/bjJCount09.mp3',
    Longspin                : 'sfx/slot/bj/bjLongspin.mp3',
    SMatch                  : 'sfx/slot/bj/bjSMatch.mp3',
    PotPre                  : 'sfx/slot/bj/bjPotPre.mp3',
    PotIntro                : 'sfx/slot/bj/bjPotIntro.mp3',
    PotOpen                 : 'sfx/slot/bj/bjPotOpen.mp3',
    Guage                   : 'sfx/slot/bj/bjGuage.mp3',
    Trail01                 : 'sfx/slot/bj/bjTrail01.mp3',

    // WHEEL
    WheelPopup01              : 'sfx/slot/bj/bjWheelPopup01.mp3',
    WheelPopup02              : 'sfx/slot/bj/bjWheelPopup02.mp3',
    WheelPopup03              : 'sfx/slot/bj/bjWheelPopup03.mp3',
    WheelIntro                : 'sfx/slot/bj/bjWheelIntro.mp3',
    WheelSpinType01           : 'sfx/slot/bj/bjWheelSpinType01.mp3',
    WheelMatch	              : 'sfx/slot/bj/bjWheelMatch.mp3',
    WheelMatch02	          : 'sfx/slot/bj/bjWheelMatch02.mp3',
    WheelReslut  	          : 'sfx/slot/bj/bjWheelReslut.mp3',

    FsResult  	            : 'sfx/slot/bj/bjFsResult.mp3'
};
window.g_sndBankOfJackpot = ResPack.create( 'sndBankOfJackpot', sndBankOfJackpot ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Bank of Jackpot END ↑↑↑ -----------


// -- ↑↑↑ HandOfGold ↑↑↑ -------------------------------------------------------------------------------------//
window.sndHandOfGold = {
    Intro                    : 'sfx/slot/ho/hoIntro.mp3',

    Bgm                      : 'sfx/slot/ho/hoBgm.mp3',
    FsBgm                    : 'sfx/slot/ho/hoFsBgm.mp3',

    //Pay
    Spin                     : 'sfx/slot/ho/hoSpin.mp3',
    ReelStop                 : 'sfx/slot/ho/hoReelStop.mp3',
    MPayCount                : 'sfx/slot/ho/hoMPayCount.mp3',
    NPayCount01              : 'sfx/slot/ho/hoNPayCount01.mp3',
    NPayCount02              : 'sfx/slot/ho/hoNPayCount02.mp3',
    NPayCount03              : 'sfx/slot/ho/hoNPayCount03.mp3',
    NPayCount01End           : 'sfx/slot/ho/hoNPayCount01End.mp3',
    NPayCount02End           : 'sfx/slot/ho/hoNPayCount02End.mp3',
    NPayCount03End           : 'sfx/slot/ho/hoNPayCount03End.mp3',

    MajorPopup               : 'sfx/slot/ho/hoMajorPopup.mp3',
    JackpotPopup             : 'sfx/slot/ho/hoJackpotPopup.mp3',

    LongSpin                 : 'sfx/slot/ho/hoLongspin.mp3',
    SLocking01               : 'sfx/slot/ho/hoSLocking01.mp3',
    SLocking02               : 'sfx/slot/ho/hoSLocking02.mp3',
    SLocking03               : 'sfx/slot/ho/hoSLocking03.mp3',

    CSymLocking              : 'sfx/slot/ho/hoCSymLocking.mp3',
    CSymMoving               : 'sfx/slot/ho/hoCsymMoving.mp3',
    CSymBoom                 : 'sfx/slot/ho/hoCsymBoom.mp3',

    SMatch                   : 'sfx/slot/ho/hoSMatch.mp3',

    FsIntro                  : 'sfx/slot/ho/hoFsIntro.mp3',
    FSResult                 : 'sfx/slot/ho/hoFsResult.mp3',
    FsHand                   : 'sfx/slot/ho/hoFshand.mp3',
    FsReset                  : 'sfx/slot/ho/hoFsReset.mp3',

    SuperFsIntro             : 'sfx/slot/ho/hoSuperFsIntro.mp3',

    hoMapOver                : 'sfx/slot/ho/hoMapOver.mp3',
    hoMapClick               : 'sfx/slot/ho/hoMapClick.mp3',
    hoMapOpen                : 'sfx/slot/ho/hoMapOpen.mp3',
    hoMapNormalGauge         : 'sfx/slot/ho/hoMapNormalGauge.mp3',
    hoMapSuperbonusGauge     : 'sfx/slot/ho/hoMapSuperbonusGauge.mp3',
    hoMapLastSuperbonusSet   : 'sfx/slot/ho/hoMapLastSuperbonusGauge.mp3',
    hoMapUnlock              : 'sfx/slot/ho/hoMapUnlock.mp3',

    ToolTipOver              : 'sfx/slot/ho/hoTipOver.mp3',

    Voice01                  : 'sfx/slot/ho/hoVoice01.mp3',
    Voice02                  : 'sfx/slot/ho/hoVoice02.mp3',
    Voice03                  : 'sfx/slot/ho/hoVoice03.mp3',
    Voice04                  : 'sfx/slot/ho/hoVoice04.mp3',
    Voice05                  : 'sfx/slot/ho/hoVoice05.mp3',
};
window.g_sndHandOfGold = ResPack.create( 'sndHandOfGold', sndHandOfGold ).concat( g_sfxSlotCommon );
//-- ↑↑↑ HandOfGold_END ↑↑↑ -----------

//-- ↑↑↑ Fortune Pot Link ↑↑↑ ----------------------------------------------------------------------------------------//
window.sndFortunePotLink = {
    // -- INTRO
    Intro                   : 'sfx/slot/fpl/fplIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/fpl/fplBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/fpl/fplFsBgm.mp3',
    LinkGameBgm             : 'sfx/slot/fpl/fplLinkBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/fpl/fplSpin.mp3',
    ReelStop                : 'sfx/slot/fpl/fplReelStop.mp3',
    MPayCount	            : 'sfx/slot/fpl/fplMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/fpl/fplNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/fpl/fplNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/fpl/fplNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/fpl/fplNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/fpl/fplNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/fpl/fplNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/fpl/fplMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/fpl/fplJackpotPopup.mp3',

    // -- NORMAL
    ScatterLocking1         : 'sfx/slot/fpl/fplSLocking01.mp3',
    ScatterLocking2         : 'sfx/slot/fpl/fplSLocking02.mp3',
    ScatterLocking3         : 'sfx/slot/fpl/fplSLocking03.mp3',
    ScatterLocking4         : 'sfx/slot/fpl/fplSLocking04.mp3',
    ScatterLocking5         : 'sfx/slot/fpl/fplSLocking05.mp3',

    ToolTip                 : 'sfx/slot/fpl/fplTipOver.mp3',
    Gauge                   : 'sfx/slot/fpl/fplGuage.mp3',
    LongSpin                : 'sfx/slot/fpl/fplLongspin.mp3',
    SMatch                  : 'sfx/slot/fpl/fplSMatch.mp3',
    ToolTipHigh             : 'sfx/slot/fpl/fplUnlock.mp3',

    // -- SUPER BONUS
    PotPre                  : 'sfx/slot/fpl/fplPotPre.mp3',
    PotIntro                : 'sfx/slot/fpl/fplPotIntro.mp3',
    PotOpen                 : 'sfx/slot/fpl/fplPotOpen.mp3',
    WildTrail    	        : 'sfx/slot/fpl/fplTrail01.mp3',
    Transition    	        : 'sfx/slot/fpl/fplTransition.mp3',

    // -- FREE SPIN
    FsIntro                 : 'sfx/slot/fpl/fplFsIntro.mp3',
    FsRetrigger             : 'sfx/slot/fpl/fpFsRetrigger.mp3',
    FsResult                : 'sfx/slot/fpl/fplFsResult.mp3',

    // -- LINK
    DirectWinLocking        : 'sfx/slot/fpl/fplLLocking.mp3',
    NextWintLocking         : 'sfx/slot/fpl/fplNLocking.mp3',
    AllWinLocking           : 'sfx/slot/fpl/fplALocking.mp3',
    LinkIntro               : 'sfx/slot/fpl/fplLinkIntro.mp3',
    SuperLinkIntro          : 'sfx/slot/fpl/fplSuperLinkIntro.mp3',
    LinkReelSpin            : 'sfx/slot/fpl/fplLinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/fpl/fplLinkReelstop.mp3',
    NextWinTrail            : 'sfx/slot/fpl/fplLinkSymTrail01.mp3',

    LinkTrailEnd01           : 'sfx/slot/fpl/fplLinkSymEnd01.mp3',
    LinkTrailEnd02           : 'sfx/slot/fpl/fplLinkSymEnd02.mp3',
    LinkTrailEnd03           : 'sfx/slot/fpl/fplLinkSymEnd03.mp3',
    LinkTrailEnd04           : 'sfx/slot/fpl/fplLinkSymEnd04.mp3',
    LinkTrailEnd05           : 'sfx/slot/fpl/fplLinkSymEnd05.mp3',
    LinkTrailEnd06           : 'sfx/slot/fpl/fplLinkSymEnd06.mp3',
    LinkTrailEnd07           : 'sfx/slot/fpl/fplLinkSymEnd07.mp3',

    JackpotMatch            : 'sfx/slot/fpl/fplJLocking.mp3',
    LinkCountUp             : 'sfx/slot/fpl/fplLinkReset.mp3',
    TotalWinTrail           : 'sfx/slot/fpl/fplLinkSum.mp3',
    LinkSymSpin             : 'sfx/slot/fpl/fplLinkSymSpin.mp3',
    LinkResult              : 'sfx/slot/fpl/fplLinkResult.mp3',
};
window.g_sndFortunePotLink = ResPack.create( 'sndFortunePotLink', sndFortunePotLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Fortune Pot Link END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ RollingInMoney ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndRollingInMoney = {

    Intro               : 'sfx/slot/rm/rmIntro.mp3',    //v
    // -- BGM
    Bgm                 : 'sfx/slot/rm/rmBgm.mp3',      //v
    LinkBgm             : 'sfx/slot/rm/rmLinkBgm.mp3',  //v

    // -- Spin
    Spin                : 'sfx/slot/rm/rmSpin.mp3',     //v

    ReelStop            : 'sfx/slot/rm/rmReelStop.mp3',  //v

    // -- Counting
    MPayCount           : 'sfx/slot/rm/rmMPayCount.mp3',        //v
    NPayCount01         : 'sfx/slot/rm/rmNPayCount01.mp3',      //v
    NPayCount01End      : 'sfx/slot/rm/rmNPayCount01End.mp3',   //v
    NPayCount02         : 'sfx/slot/rm/rmNPayCount02.mp3',      //v
    NPayCount02End      : 'sfx/slot/rm/rmNPayCount02End.mp3',   //v
    NPayCount03         : 'sfx/slot/rm/rmNPayCount03.mp3',      //v
    NPayCount03End      : 'sfx/slot/rm/rmNPayCount03End.mp3',   //v

    // -- PopUp
    MajorPopup          : 'sfx/slot/rm/rmMajorPopup.mp3',     //v
    JackpotPopup        : 'sfx/slot/rm/rmJackpotPopup.mp3',   //v
    //

    Locking01           : 'sfx/slot/rm/rmSLocking01.mp3',     //v
    Locking02           : 'sfx/slot/rm/rmSLocking02.mp3',    //v
    Locking03           : 'sfx/slot/rm/rmSLocking03.mp3',    //v
    Locking04           : 'sfx/slot/rm/rmSLocking04.mp3',    //v
    Locking05           : 'sfx/slot/rm/rmSLocking05.mp3',    //v

    JsymLocking01       : 'sfx/slot/rm/rmJsymLocking.mp3',   //v
    JsymLocking02       : "sfx/slot/rm/rmJsymLocking02.mp3", //v
    JsymLocking03       : "sfx/slot/rm/rmJsymLocking03.mp3", //v
    JsymLocking04       : "sfx/slot/rm/rmJsymLocking04.mp3", //v
    JsymLocking05       : "sfx/slot/rm/rmJsymLocking05.mp3", //v

    LongSpin            : 'sfx/slot/rm/rmLongspin.mp3',       //V

    Match               : 'sfx/slot/rm/rmSMatch.mp3',         //?
    TipOver             : 'sfx/slot/rm/rmTipOver.mp3',        //?

    // -- Link
    LinkIntro           : 'sfx/slot/rm/rmLinkIntro.mp3',        //v
    SuperLinkIntro      : 'sfx/slot/rm/rmSuperLinkIntro.mp3',
    LinkReelstop        : 'sfx/slot/rm/rmLinkReelstop.mp3',     //v
    LinkSymTrail01      : 'sfx/slot/rm/rmLinkSymTrail01.mp3',   //v
    LinkSymTrail02      : 'sfx/slot/rm/rmLinkSymTrail02.mp3',   //v

    NLocking            : 'sfx/slot/rm/rmNLocking.mp3',         //?
    TsymLocking         : 'sfx/slot/rm/rmTsymLocking.mp3',      //?
    LLocking            : "sfx/slot/rm/rmLLocking.mp3",

    LinkReset           : 'sfx/slot/rm/rmLinkReset.mp3',         //V
    LinkSum             : 'sfx/slot/rm/rmLinkSum.mp3',          //v
    Unlock              : 'sfx/slot/rm/rmUnlock.mp3',          //v
    Unlock02            : 'sfx/slot/rm/rmUnlock02.mp3',          //v
    Unlock03            : 'sfx/slot/rm/rmUnlock03.mp3',

    LinkResult          : 'sfx/slot/rm/rmLinkResult.mp3',     //v

    LinkSpin             : 'sfx/slot/rm/rmLinkSpin.mp3',     //v
    LinkCount            : 'sfx/slot/rm/rmLinkCount.mp3',     //v

    // -- map
    MapOver                   : 'sfx/slot/rm/rmMapOver.mp3',                //x
    MapClick                  : 'sfx/slot/rm/rmMapClick.mp3',               //x
    MapActive                 : 'sfx/slot/rm/rmMapUnlock.mp3',
    MapOpen                   : 'sfx/slot/rm/rmMapOpen.mp3',                //x
    MapNormalGauge            : 'sfx/slot/rm/rmMapNormalGauge.mp3',         //x
    MapSuperbonusGauge        : 'sfx/slot/rm/rmMapSuperbonusGauge.mp3',     //x
    MapLastSuperbonusGauge    : 'sfx/slot/rm/rmMapLastSuperbonusGauge.mp3',   //x

    JsymLockingMatch          :'sfx/slot/rm/rmJsymLockingMatch.mp3',     //x
    SLockingMatch             :'sfx/slot/rm/rmSLockingMatch.mp3'           //x
};
window.g_sndRollingInMoney = ResPack.create( 'sndRollingInMoney', sndRollingInMoney ).concat( g_sfxSlotCommon );
//-- ↑↑↑ RollingInMoney ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ MegaCash BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMegaCash = {
    // INTRO
    Intro                   : 'sfx/slot/mc/mclntro.mp3',

    // BGM
    Bgm                     : 'sfx/slot/mc/mcBgm.mp3',
    FsBgm                   : 'sfx/slot/mc/mcFsBgm.mp3',

    // PAY
    Spin                    : 'sfx/slot/mc/mcSpin.mp3',
    ReelStop                : 'sfx/slot/mc/mcReelStop.mp3',
    MPayCount               : 'sfx/slot/mc/mcMPayCount.mp3',
    NPayCount01             : 'sfx/slot/mc/mcNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/mc/mcNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/mc/mcNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/mc/mcNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/mc/mcNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/mc/mcNPayCount03End.mp3',
    MajorPopup              : 'sfx/slot/mc/mcMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/mc/mcJackpotPopup.mp3',

    // NORMAL
    DLocking                : 'sfx/slot/mc/mcDLocking.mp3',
    JLocking                : 'sfx/slot/mc/mcJLocking.mp3',
    Longspin                : 'sfx/slot/mc/mcLongspin.mp3',
    Unlocked                : 'sfx/slot/mc/mcUnlocked.mp3',
    PotPre                  : 'sfx/slot/mc/mcPotPre.mp3',
    TipOver                 : 'sfx/slot/mc/mcTipOver.mp3',
    PotOpen                 : 'sfx/slot/mc/mcPotOpen.mp3',
    Outline                 : 'sfx/slot/mc/mcOutline.mp3',
    CashFull                : 'sfx/slot/mc/mcCashFull.mp3',
    Trail01                 : 'sfx/slot/mc/mcTrail01.mp3',

    // FREE GAME
    Trail02                 : 'sfx/slot/mc/mcTrail02.mp3',
    FsIntro                 : 'sfx/slot/mc/mcFsIntro.mp3',
    FsSpin                  : 'sfx/slot/mc/mcFsSpin.mp3',
    FsRetrigger             : 'sfx/slot/mc/mcFsRetrigger.mp3',
    NLocking                : 'sfx/slot/mc/mcNLocking.mp3',
    TLocking                : 'sfx/slot/mc/mcTLocking.mp3',
    Trail03                 : 'sfx/slot/mc/mcTrail03.mp3',
    Trail04                 : 'sfx/slot/mc/mcTrail04.mp3',
    FsNoti                  : 'sfx/slot/mc/mcFsNoti.mp3',
    FsSum                   : 'sfx/slot/mc/mcFsSum.mp3',
    FsReset                 : 'sfx/slot/mc/mcFsReset.mp3',
    FsResult	            : 'sfx/slot/mc/mcFsResult.mp3',
};
window.g_sndMegaCash = ResPack.create( 'sndMegaCash', sndMegaCash ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Bank of Jackpot END ↑↑↑ -----------


// -- ↑↑↑ MoreMoreGold ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMoreMoreGold = {
    Intro                    : 'sfx/slot/mg/mgIntro.mp3',
    FsIntro                  : 'sfx/slot/mg/mgFsIntro.mp3',
    FSSuperIntro             : 'sfx/slot/mg/mgSuperFsIntro.mp3',
    MgIntro                  : 'sfx/slot/mg/mgMinigameIntro01.mp3',

    Bgm                      : 'sfx/slot/mg/mgBgm.mp3',
    FsBgm                    : 'sfx/slot/mg/mgFsBgm.mp3',
    MgBgm                    : 'sfx/slot/mg/mgMgBgm.mp3',
    MgBgm02                  : 'sfx/slot/mg/mgMgBgm02.mp3',
    MgBgm03                  : 'sfx/slot/mg/mgMgBgm03.mp3',
    MgBgm04                  : 'sfx/slot/mg/mgMgBgm04.mp3',

    MgIntervalBgm            : 'sfx/slot/mg/mgIntervalBgm.mp3',

    //Pay
    Spin                     : 'sfx/slot/mg/mgSpin.mp3',
    ReelStop                 : 'sfx/slot/mg/mgReelStop.mp3',
    MPayCount                : 'sfx/slot/mg/mgMPayCount.mp3',
    NPayCount01              : 'sfx/slot/mg/mgNPayCount01.mp3',
    NPayCount01End           : 'sfx/slot/mg/mgNPayCount01End.mp3',

    MajorPopup               : 'sfx/slot/mg/mgMajorPopup.mp3',
    JackpotPopup             : 'sfx/slot/mg/mgJackpotPopup.mp3',

    MLocking01               : 'sfx/slot/mg/mgMLocking01.mp3',
    MLocking02               : 'sfx/slot/mg/mgMLocking02.mp3',
    MLocking03               : 'sfx/slot/mg/mgMLocking03.mp3',
    WLocking                 : 'sfx/slot/mg/mgWLocking.mp3',

    TipOver                  : 'sfx/slot/mg/mgTipOver.mp3',

    mgLongSpin               : 'sfx/slot/mg/mgLongspin.mp3',
    mgSMatch                 : 'sfx/slot/mg/mgSMatch.mp3',
    mgTrail01                : 'sfx/slot/mg/mgTrail01.mp3',
    mgPotPre                 : 'sfx/slot/mg/mgPotPre.mp3',
    mgPotOpen                : 'sfx/slot/mg/mgPotOpen.mp3',

    mgFsRetrigger            : 'sfx/slot/mg/mgFsRetrigger.mp3',
    mgFsResult               : 'sfx/slot/mg/mgFsResult.mp3',

    mgMiniTransition         : 'sfx/slot/mg/mgMiniTransition.mp3',

    mgMinigameBonusWin       : 'sfx/slot/mg/mgMinigamePanel.mp3',
    mgMinigameSum            : 'sfx/slot/mg/mgMinigameSum.mp3',
    mgMinigameNotiSet        : 'sfx/slot/mg/mgMinigameNotiSet.mp3',

    mgMinigameWildStick      : 'sfx/slot/mg/mgMinigameWildStick.mp3',

    mgMinigameMultiply00     : 'sfx/slot/mg/mgMiniMultiply00.mp3',
    mgMinigameMultiply01     : 'sfx/slot/mg/mgMiniMultiply01.mp3',
    mgMinigameMultiply02     : 'sfx/slot/mg/mgMiniMultiply02.mp3',

    mgMapUnlock              : 'sfx/slot/mg/mgMapUnlock.mp3',
    mgMapOver                : 'sfx/slot/mg/mgMapOver.mp3',
    mgMapClick               : 'sfx/slot/mg/mgMapClick.mp3',
    mgMapOpen                : 'sfx/slot/mg/mgMapOpen.mp3',
    mgMapNormalGauge         : 'sfx/slot/mg/mgMapNormalGauge.mp3',
    mgMapSuperbonusGauge     : 'sfx/slot/mg/mgMapSuperbonusGauge.mp3',
    mgMapLastSuperbonusGuage : 'sfx/slot/mg/mgMapLastSuperbonusGauge.mp3',

    mgMgResult               : 'sfx/slot/mg/mgMgResult.mp3',

    mgVoice01                : 'sfx/slot/mg/mgVoice01.mp3',
    mgVoice02                : 'sfx/slot/mg/mgVoice02.mp3',
    mgVoice03                : 'sfx/slot/mg/mgVoice03.mp3',
    mgVoice04                : 'sfx/slot/mg/mgVoice04.mp3',

    mgFsReset                : 'sfx/slot/mg/mgFsReset.mp3',
    mgFsNoti                 : 'sfx/slot/mg/mgFsNoti.mp3'
};
window.g_sndMoreMoreGold = ResPack.create( 'sndMoreMoreGold', sndMoreMoreGold ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MoreMoreGold_END ↑↑↑ -----------

//-- ↑↑↑ Gold Rush Link ↑↑↑ ----------------------------------------------------------------------------------------//
window.sndGoldRushLink = {
    // -- INTRO
    Intro                   : 'sfx/slot/gr/grIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/gr/grBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/gr/grFsBgm.mp3',
    LinkGameBgm             : 'sfx/slot/gr/grLinkBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/gr/grSpin.mp3',
    ReelStop                : 'sfx/slot/gr/grReelStop.mp3',
    MPayCount	            : 'sfx/slot/gr/grMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/gr/grNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/gr/grNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/gr/grNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/gr/grNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/gr/grNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/gr/grNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/gr/grMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/gr/grJackpotPopup.mp3',

    // -- NORMAL
    ScatterLocking1         : 'sfx/slot/gr/grSLocking01.mp3',
    ScatterLocking2         : 'sfx/slot/gr/grSLocking02.mp3',
    ScatterLocking3         : 'sfx/slot/gr/grSLocking03.mp3',
    ScatterLocking4         : 'sfx/slot/gr/grSLocking04.mp3',
    ScatterLocking5         : 'sfx/slot/gr/grSLocking05.mp3',
    //
    LinkLocking1            : 'sfx/slot/gr/grLLocking01.mp3',
    LinkLocking2            : 'sfx/slot/gr/grLLocking02.mp3',
    LinkLocking3            : 'sfx/slot/gr/grLLocking03.mp3',
    LinkLocking4            : 'sfx/slot/gr/grLLocking04.mp3',
    LinkLocking5            : 'sfx/slot/gr/grLLocking05.mp3',

    ToolTipOn               : 'sfx/slot/gr/grUnlock.mp3',
    ToolTipOver             : 'sfx/slot/gr/grTipOver.mp3',
    LongSpin                : 'sfx/slot/gr/grLongspin.mp3',
    SMatch                  : 'sfx/slot/gr/grSMatch.mp3',
    DMatch                  : 'sfx/slot/gr/grDMatch.mp3',

    // -- FREE SPIN
    FsIntro                 : 'sfx/slot/gr/grFsIntro.mp3',
    FsNudge                 : 'sfx/slot/gr/grWildNudge.mp3',
    FsShake                 : 'sfx/slot/gr/grWildShake.mp3',
    Retrigger               : 'sfx/slot/gr/grFsRetrigger.mp3',
    FsResult                : 'sfx/slot/gr/grFsResult.mp3',

    // -- LINK
    LinkIntro               : 'sfx/slot/gr/grLinkIntro.mp3',
    DirectLocking           : 'sfx/slot/gr/grDLocking.mp3',
    WheelLocking            : 'sfx/slot/gr/grWLocking.mp3',
    WheelSpin               : 'sfx/slot/gr/grWSpin.mp3',
    WheelMatch              : 'sfx/slot/gr/grWSpinMatch.mp3',
    TriggerLocking          : 'sfx/slot/gr/grTLocking.mp3',
    Trail                   : 'sfx/slot/gr/grTrail.mp3',
    TrailJackpot            : 'sfx/slot/gr/grTrailJackpot.mp3',
    LinkReelSpin            : 'sfx/slot/gr/grLinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/gr/grLinkReelStop.mp3',
    ExtraReelSpin           : 'sfx/slot/gr/grExtra.mp3',
    LinkCountUp             : 'sfx/slot/gr/grLinkReset.mp3',
    TotalWinTrail           : 'sfx/slot/gr/grLinkSum.mp3',
    LinkResult              : 'sfx/slot/gr/grLinkResult.mp3',
};
window.g_sndGoldRushLink = ResPack.create( 'sndGoldRushLink', sndGoldRushLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Gold Rush Link END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↓↓↓ MadLab ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndMadLab = {

    Intro               : 'sfx/slot/ml/mlIntro.mp3',
    // -- BGM
    Bgm                 : 'sfx/slot/ml/mlBgm.mp3',
    LinkBgm             : 'sfx/slot/ml/mlLinkBgm.mp3',

    // -- Spin
    Spin                : 'sfx/slot/ml/mlSpin.mp3',

    ReelStop            : 'sfx/slot/ml/mlReelStop.mp3',

    // -- Counting
    MPayCount           : 'sfx/slot/ml/mlMPayCount.mp3',
    NPayCount01         : 'sfx/slot/ml/mlNPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/ml/mlNPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/ml/mlNPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/ml/mlNPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/ml/mlNPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/ml/mlNPayCount03End.mp3',

    // -- PopUp
    MajorPopup          : 'sfx/slot/ml/mlMajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/ml/mlJackpotPopup.mp3',
    //

    Locking01           : 'sfx/slot/ml/mlDLocking01.mp3',
    Locking02           : 'sfx/slot/ml/mlDLocking02.mp3',
    Locking03           : 'sfx/slot/ml/mlDLocking03.mp3',
    GLocking            : 'sfx/slot/ml/mlGLocking.mp3',

    CLocking            : 'sfx/slot/ml/mlCLocking.mp3',

    WLocking            : 'sfx/slot/ml/mlWLocking.mp3',

    Trail01             : 'sfx/slot/ml/mlTrail01.mp3',
    Trail02             : 'sfx/slot/ml/mlTrail02.mp3',
    Unlock              : 'sfx/slot/ml/mlUnlock.mp3',  //상위베팅시 잭팟 해금 연출
    TipOver             : 'sfx/slot/ml/mlTipOver.mp3',
    LongSpin            : 'sfx/slot/ml/mlLongspin.mp3',
    LinkLongspin        : 'sfx/slot/ml/mlLinkLongspin.mp3',

    Match               : 'sfx/slot/ml/mlSMatch.mp3',


    // -- Link
    LinkIntro           : 'sfx/slot/ml/mlLinkIntro.mp3',

    LinkSpin             : 'sfx/slot/ml/mlLinkSpin.mp3',
    LinkReelstop        : 'sfx/slot/ml/mlLinkReelstop.mp3',

    DLocking            : 'sfx/slot/ml/mlDLocking.mp3',
    NLocking            : 'sfx/slot/ml/mlNLocking.mp3',

    LinkSymTrail01      : 'sfx/slot/ml/mlLinkSymTrail01.mp3',
    LinkSymTrail02      : 'sfx/slot/ml/mlLinkSymTrail02.mp3',

    LinkReset           : 'sfx/slot/ml/mlLinkReset.mp3',
    LinkSum             : 'sfx/slot/ml/mlLinkSum.mp3',

    LinkResult          : 'sfx/slot/ml/mlLinkResult.mp3',
};
window.g_sndMadLab= ResPack.create( 'sndMadLab', sndMadLab ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MadLab ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ MoonFestivalLink BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndMoonFestivalLink = {
    Intro                   : 'sfx/slot/mfl/mflIntro.mp3',
    // BGM
    Bgm                     : 'sfx/slot/mfl/mflBgm.mp3',
    LinkBgm                 : 'sfx/slot/mfl/mflLinkBgm.mp3',

    ChangeBetHigh           : 'sfx/slot/mfl/mflUnlock.mp3',
    // ChangeBetLow            : 'sfx/slot/mfl/mflUnlock.mp3',
    ToolTipOver             : 'sfx/slot/mfl/mflTipOver.mp3',

    // normal reel
    Spin                    : 'sfx/slot/mfl/mflSpin.mp3',
    ReelStop                : 'sfx/slot/mfl/mflReelStop.mp3',
    Longspin                : 'sfx/slot/mfl/mflLongspin.mp3',

    DLockingReel01          : 'sfx/slot/mfl/mflDLocking01.mp3',
    DLockingReel02          : 'sfx/slot/mfl/mflDLocking02.mp3',
    DLockingReel03          : 'sfx/slot/mfl/mflDLocking03.mp3',
    CLocking                : 'sfx/slot/mfl/mflCLocking.mp3',
    CLockingMulti           : 'sfx/slot/mfl/mflMCLocking.mp3',
    Collect                : 'sfx/slot/mfl/mflCMatch.mp3',
    SMatch                  : 'sfx/slot/mfl/mflSMatch.mp3',

    // link reel
    LinkSpin                : 'sfx/slot/mfl/mflLinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/mfl/mflLinkReelstop.mp3',
    LinkLongspin            : 'sfx/slot/mfl/mflLinkLongSpin.mp3',

    LinkDLocking            : 'sfx/slot/mfl/mflDSymLocking.mp3',
    LinkCLocking            : 'sfx/slot/mfl/mflCsymLocking.mp3',
    LinkCLockingMulti       : 'sfx/slot/mfl/mflMCsymLocking.mp3',

    LinkSpinCountUp         : 'sfx/slot/mfl/mflLinkReset.mp3',
    LinkTrailEToC           : 'sfx/slot/mfl/mflLinkSymTrail01.mp3',
    LinkTrailNToC           : 'sfx/slot/mfl/mflLinkSymTrail02.mp3',
    LinkTrailDToN           : 'sfx/slot/mfl/mflLinkSymTrail03.mp3',
    LinkTrailCToT           : 'sfx/slot/mfl/mflLinkSum.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/mfl/mflMPayCount.mp3',
    NPayCount01             : 'sfx/slot/mfl/mflNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/mfl/mflNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/mfl/mflNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/mfl/mflNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/mfl/mflNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/mfl/mflNPayCount03End.mp3',

    //-- popup
    MajorPopup              : 'sfx/slot/mfl/mflMajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/mfl/mflJackpotPopup.mp3',
    LinkIntroPopup          : 'sfx/slot/mfl/mflLinkIntro.mp3',
    LinkResultPopup         : 'sfx/slot/mfl/mflLinkResult.mp3',

};
window.g_sndMoonFestivalLink = ResPack.create( 'sndMoonFestivalLink', sndMoonFestivalLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MoonFestivalLink END ↑↑↑ -----------

// -- Magic In Wonderland ----------------------------------------------------------------------------------------//
window.sndMagicInWonderland = {
    Bgm                      :   'sfx/slot/miw/miwBgm.mp3',
    // DSymLocking              :   'sfx/slot/miw/miwDSymLocking.mp3',
    FsBgm                    :   'sfx/slot/miw/miwFsBgm.mp3',
    FsIntro                  :   'sfx/slot/miw/miwFsIntro.mp3',
    FsResult                 :   'sfx/slot/miw/miwFsResult.mp3',
    FsRetrigger              :   'sfx/slot/miw/miwFsRetrigger.mp3',
    FsReveal                 :   'sfx/slot/miw/miwFsReveal.mp3',
    Intro                    :   'sfx/slot/miw/miwIntro.mp3',
    JackpotPopup             :   'sfx/slot/miw/miwJackpotPopup.mp3',
    LinkBgm                  :   'sfx/slot/miw/miwLinkBgm.mp3',
    LinkIntro                :   'sfx/slot/miw/miwLinkIntro.mp3',
    LinkReelstop             :   'sfx/slot/miw/miwLinkReelstop.mp3',
    LinkReset                :   'sfx/slot/miw/miwLinkReset.mp3',
    LinkSpin                 :   'sfx/slot/miw/miwLinkSpin.mp3',
    LinkSum                  :   'sfx/slot/miw/miwLinkSum.mp3',
    LinkUpgrade              :   'sfx/slot/miw/miwLinkUpgrade.mp3',
    Lmatch                   :   'sfx/slot/miw/miwLmatch.mp3',
    Longspin                 :   'sfx/slot/miw/miwLongspin.mp3',
    LsymLocking              :   'sfx/slot/miw/miwLsymLocking.mp3',
    MajorPopup               :   'sfx/slot/miw/miwMajorPopup.mp3',
    MapClick                 :   'sfx/slot/miw/miwMapClick.mp3',
    MapLastSuperbonusGauge   :   'sfx/slot/miw/miwMapLastSuperbonusGauge.mp3',
    MapNormalGauge           :   'sfx/slot/miw/miwMapNormalGauge.mp3',
    MapOpen                  :   'sfx/slot/miw/miwMapOpen.mp3',
    MapOver                  :   'sfx/slot/miw/miwMapOver.mp3',
    MapSuperbonusGauge       :   'sfx/slot/miw/miwMapSuperbonusGauge.mp3',
    MPayCount                :   'sfx/slot/miw/miwMPayCount.mp3',
    NPayCount01              :   'sfx/slot/miw/miwNPayCount01.mp3',
    NPayCount01End           :   'sfx/slot/miw/miwNPayCount01End.mp3',
    NPayCount02              :   'sfx/slot/miw/miwNPayCount02.mp3',
    NPayCount02End           :   'sfx/slot/miw/miwNPayCount02End.mp3',
    NPayCount03              :   'sfx/slot/miw/miwNPayCount03.mp3',
    NPayCount03End           :   'sfx/slot/miw/miwNPayCount03End.mp3',
    // ReelStop                 :   'sfx/slot/miw/miwReelStop.mp3',
    SFsIntro                 :   'sfx/slot/miw/miwSFsIntro.mp3',
    SLocking                 :   'sfx/slot/miw/miwSLocking.mp3',
    SMatch                   :   'sfx/slot/miw/miwSMatch.mp3',
    Spin                     :   'sfx/slot/miw/miwSpin.mp3',
    TipOver                  :   'sfx/slot/miw/miwTipOver.mp3',
    TsymLocking              :   'sfx/slot/miw/miwTsymLocking.mp3',
    Unlock                   :   'sfx/slot/miw/miwUnlock.mp3',


    FsArray                  :   'sfx/slot/miw/miwFsArray.mp3',
    FsReelStop               :   'sfx/slot/miw/miwFsReelStop.mp3',
    FsRow                    :   'sfx/slot/miw/miwFsRow.mp3',
    FsWild                   :   'sfx/slot/miw/miwFsWild.mp3',
    JLocking                 :   'sfx/slot/miw/miwJLocking.mp3',
    Trail                    :   'sfx/slot/miw/miwTrail.mp3',

    LinkCount                :   'sfx/slot/miw/miwLinkCount.mp3',
    LinkResult               :   'sfx/slot/miw/miwLinkResult.mp3',

    OMatch                   :   'sfx/slot/miw/miwOMatch.mp3',
    LinkUpgrade02            :   'sfx/slot/miw/miwLinkUpgrade02.mp3',

    FsSticky                 :   'sfx/slot/miw/miwFsSticky.mp3'

    // WLocking                 :   'sfx/slot/miw/miwWLocking.mp3'
};
window.g_sndMagicInWonderland = ResPack.create( 'sndMagicInWonderland', sndMagicInWonderland ).concat( g_sfxGlobalCommon );
// -- End Magic In Wonderland ------------------------------------------------------------------------------------//

//-- ↑↑↑ RNC Legends ↑↑↑ ----------------------------------------------------------------------------------------//
window.sndRNCLegends = {
    // -- INTRO
    Intro                   : 'sfx/slot/rl/rlIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/rl/rlBgm.mp3',
    LinkBgm                 : 'sfx/slot/rl/rlLinkBgm.mp3',
    MiniBgm01               : 'sfx/slot/rl/rlMiniBgm01.mp3',
    MiniBgm02               : 'sfx/slot/rl/rlMiniBgm02.mp3',
    MiniBgm03               : 'sfx/slot/rl/rlMiniBgm03.mp3',
    MiniBgm04               : 'sfx/slot/rl/rlMiniBgm04.mp3',
    ReBgm                   : 'sfx/slot/rl/rlReBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/rl/rlSpin.mp3',
    ReelStop                : 'sfx/slot/rl/rlReelStop.mp3',
    MPayCount	            : 'sfx/slot/rl/rlMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/rl/rlNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/rl/rlNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/rl/rlNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/rl/rlNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/rl/rlNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/rl/rlNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/rl/rlMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/rl/rlJackpotPopup.mp3',

    // -- NORMAL
    CLocking                : 'sfx/slot/rl/rlCLocking.mp3',
    LminiLocking            : 'sfx/slot/rl/rlLminiLocking.mp3',
    WminiLocking            : 'sfx/slot/rl/rlWminiLocking.mp3',
    RminiLocking            : 'sfx/slot/rl/rlRminiLocking.mp3',
    RminiLocking02          : 'sfx/slot/rl/rlRminiLocking02.mp3',
    TipOver                 : 'sfx/slot/rl/rlTipOver.mp3',
    Longspin                : 'sfx/slot/rl/rlLongspin.mp3',
    DSymLocking             : 'sfx/slot/rl/rlDSymLocking.mp3',
    ReelShake               : 'sfx/slot/rl/rlReelShake.mp3',
    MMatch01                : 'sfx/slot/rl/rlMMatch01.mp3',
    MMatch02                : 'sfx/slot/rl/rlMMatch02.mp3',
    MMatch03                : 'sfx/slot/rl/rlMMatch03.mp3',
    MMatch04                : 'sfx/slot/rl/rlMMatch04.mp3',
    CMatch                  : 'sfx/slot/rl/rlCMatch.mp3',
    SMatch                  : 'sfx/slot/rl/rlSMatch.mp3',
    Transition              : 'sfx/slot/rl/rlTransition.mp3',
    Unlock                  : 'sfx/slot/rl/rlUnlock.mp3',

    // -- LINK GAME
    LinkIntro               : 'sfx/slot/rl/rlLinkIntro.mp3',
    LinkSpin                : 'sfx/slot/rl/rlLinkSpin.mp3',
    LinkReelstop            : 'sfx/slot/rl/rlLinkReelstop.mp3',
    // CSymLocking             : 'sfx/slot/rl/rlCSymLocking.mp3',
    BSymLocking             : 'sfx/slot/rl/rlBSymLocking.mp3',
    LinkUpgrade01           : 'sfx/slot/rl/rlLinkUpgrade01.mp3',
    LinkUpgrade02           : 'sfx/slot/rl/rlLinkUpgrade02.mp3',
    LinkReset               : 'sfx/slot/rl/rlLinkReset.mp3',
    LinkSum                 : 'sfx/slot/rl/rlLinkSum.mp3',
    LinkResult              : 'sfx/slot/rl/rlLinkResult.mp3',

    // -- MINI GAME
    MinigameIntro           : 'sfx/slot/rl/rlMinigameIntro.mp3',
    MinigamePanel01         : 'sfx/slot/rl/rlMinigamePanel01.mp3',
    MinigameWild            : 'sfx/slot/rl/rlMinigameWild.mp3',
    MiniMultiply            : 'sfx/slot/rl/rlMiniMultiply.mp3',
    MiniMultiply02          : 'sfx/slot/rl/rlMiniMultiply02.mp3',
    MinigameSum             : 'sfx/slot/rl/rlMinigameSum.mp3',
    MinigamePanel02         : 'sfx/slot/rl/rlMinigamePanel02.mp3',

    // -- VOICE
    MinigameVoice01         : 'sfx/slot/rl/rlMinigameVoice01.mp3',
    MinigameVoice02         : 'sfx/slot/rl/rlMinigameVoice02.mp3',
    MinigameVoice03         : 'sfx/slot/rl/rlMinigameVoice03.mp3',
    MinigameVoice04         : 'sfx/slot/rl/rlMinigameVoice04.mp3',
    Voice01                 : 'sfx/slot/rl/rlVoice01.mp3',
    Voice02                 : 'sfx/slot/rl/rlVoice02.mp3',
    Voice03                 : 'sfx/slot/rl/rlVoice03.mp3',
    Voice04                 : 'sfx/slot/rl/rlVoice04.mp3',
    Voice05                 : 'sfx/slot/rl/rlVoice05.mp3'

};
window.g_sndRNCLegends = ResPack.create( 'sndRNCLegends', sndRNCLegends ).concat( g_sfxSlotCommon );
//-- ↑↑↑ RNC Legends END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ Sun And Moon Link ↑↑↑ ---------------------------------------------------------------------------------------//
window.sndSunAndMoonLink = {
    // -- INTRO
    Intro                   : 'sfx/slot/sml/smlIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/sml/smlBgm.mp3',
    SunLinkSpinBgm          : 'sfx/slot/sml/smlSLinkBgm.mp3',
    MoonLinkGameBgm         : 'sfx/slot/sml/smlMLinkBgm.mp3',
    SunAndMoonLinkGameBgm   : 'sfx/slot/sml/smlSMLinkBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/sml/smlSpin.mp3',
    ReelStop                : 'sfx/slot/sml/smlReelStop.mp3',
    MPayCount	            : 'sfx/slot/sml/smlMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/sml/smlNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/sml/smlNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/sml/smlNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/sml/smlNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/sml/smlNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/sml/smlNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/sml/smlMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/sml/smlJackpotPopup.mp3',

    // -- NORMAL
    DirectLocking           : 'sfx/slot/sml/smlSLocking.mp3',
    LastDirectLocking       : 'sfx/slot/sml/smlMLocking.mp3',
    SunGaugeLevelUp         : 'sfx/slot/sml/smlSGuage.mp3',
    MoonGaugeLevelUp        : 'sfx/slot/sml/smlMGuage.mp3',
    SuperGaugeUp            : 'sfx/slot/sml/smlSMGuage.mp3',
    SMatch                  : 'sfx/slot/sml/smlSMatch.mp3',
    GaugeOn                 : 'sfx/slot/sml/smlUnlock.mp3',
    LongSpin                : 'sfx/slot/sml/smlLongspin.mp3',
    LinkLongSpin            : 'sfx/slot/sml/smlLinkLongspin.mp3',
    ToolTipOver             : 'sfx/slot/sml/smlTipOver.mp3',

    // -- LINK
    SunLinkIntro            : 'sfx/slot/sml/smlSLinkIntro.mp3',
    MoonLinkIntro           : 'sfx/slot/sml/smlMLinkIntro.mp3',
    SunAndMoonLinkIntro     : 'sfx/slot/sml/smlSMLinkIntro.mp3',
    // SuperLinkIntro          : 'sfx/slot/sml/smlSuperLinkIntro.mp3',
    LinkEffect              : 'sfx/slot/sml/smlLinkMove.mp3',
    SMLinkEffect            : 'sfx/slot/sml/smlSMLinkMove.mp3',
    MoonLocking             : 'sfx/slot/sml/smlEsymLocking.mp3',
    MoonTrail               : 'sfx/slot/sml/smlLinkSymtrail.mp3',
    CannonLocking           : 'sfx/slot/sml/smlCsymLocking.mp3',
    CannonShot              : 'sfx/slot/sml/smlCsymShot.mp3',
    SunLocking              : 'sfx/slot/sml/smlTsymLocking.mp3',
    SunExplode              : 'sfx/slot/sml/smlLinkUpgrade.mp3',
    LabelUpgrade            : 'sfx/slot/sml/smlLinkUpgrade02.mp3',
    LinkReelSpin            : 'sfx/slot/sml/smlLinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/sml/smlLinkReelstop.mp3',
    LinkCountUp             : 'sfx/slot/sml/smlLinkReset.mp3',
    TotalWinTrail           : 'sfx/slot/sml/smlLinkSum.mp3',
    LinkResult              : 'sfx/slot/sml/smlLinkResult.mp3',

    // -- VOICE
    SunMatchVoice           : 'sfx/slot/sml/smlVoiceSmatch.mp3',
    MoonMatchVoice          : 'sfx/slot/sml/smlVoiceMmatch.mp3',
    SunMoonMatchVoice       : 'sfx/slot/sml/smlVoiceSMmatch.mp3',
    SunLinkResult           : 'sfx/slot/sml/smlVoiceSLinkResult.mp3',
    MoonLinkResult          : 'sfx/slot/sml/smlVoiceMLinkResult.mp3',
    SunMoonLinkResult       : 'sfx/slot/sml/smlVoiceSMLinkResult.mp3'

};
window.g_sndSunAndMoonLink = ResPack.create( 'sndSunAndMoonLink', sndSunAndMoonLink ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Sun And Moon Link END ↑↑↑ -----------------------------------------------------------------------------------//


//-- ↑↑↑ SugarFactory BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSugarFactory = {
    Intro           : 'sfx/slot/sf/sfIntro.mp3',

    BGM             : 'sfx/slot/sf/sfBgm.mp3',
    BGM_respin      : 'sfx/slot/sf/sfReBgm.mp3',
    BGM_link        : 'sfx/slot/sf/sfLinkBgm.mp3',
    // BGM_mini1       : 'sfx/slot/sf/sfMiniBgm01.mp3',
    // BGM_mini2       : 'sfx/slot/sf/sfMiniBgm02.mp3',
    // BGM_mini3       : 'sfx/slot/sf/sfMiniBgm03.mp3',
    // BGM_mini4       : 'sfx/slot/sf/sfMiniBgm04.mp3',
    BGM_mini       : 'sfx/slot/sf/sfMiniBgm.mp3',

    ChangeBet           : 'sfx/slot/sf/sfBetChange.mp3',

    ToolTip         : 'sfx/slot/sf/sfTipOver.mp3',

    Spin                : 'sfx/slot/sf/sfSpin.mp3',
    // SpinRandom01                : 'sfx/slot/sf/sfVoice01.mp3',
    // SpinRandom02                : 'sfx/slot/sf/sfVoice02.mp3',
    // SpinRandom03                : 'sfx/slot/sf/sfVoice03.mp3',
    // SpinRandom04                : 'sfx/slot/sf/sfVoice04.mp3',
    ReelStop            : 'sfx/slot/sf/sfReelStop.mp3',
    LongSpin            : 'sfx/slot/sf/sfLongspin.mp3',
    ExLockingJackpot    : 'sfx/slot/sf/sfExtraJackpotLock.mp3',
    ExLockingMini       : 'sfx/slot/sf/sfExtraMinigameLock.mp3',
    ExLockingDirect     : 'sfx/slot/sf/sfExtraDirectpayLock.mp3',

    ReelShake           : 'sfx/slot/sf/sfRespinShake.mp3',
    RespinFihish        : 'sfx/slot/sf/sfExtraSymPay.mp3',
    ShowBonusWinPanel   : 'sfx/slot/sf/sfRespinIntro.mp3',
    HideBonusWinPanel   : 'sfx/slot/sf/sfRespinOutro.mp3',
    UpdateBonusWin      : 'sfx/slot/sf/sfBonuswinAdd.mp3',
    MiniGameIntro                : 'sfx/slot/sf/sfExtraMinigameIntro.mp3',
    MiniEachWinLock  : 'sfx/slot/sf/sfMiniLocking.mp3',
    MiniRandomWild  : 'sfx/slot/sf/sfMinigameWild.mp3',
    MinixSpinMultiply  : 'sfx/slot/sf/sfMiniMultiply01.mp3',
    MiniStartWheel  : 'sfx/slot/sf/sfMiniWheel.mp3',
    // MinixwinMultiply  : 'sfx/slot/sf/sfMiniMultiply02.mp3',
    MiniWinNoti  : 'sfx/slot/sf/sfMiniNoti.mp3',
    MiniWinNotiNoWin  : 'sfx/slot/sf/sfMiniNoti02.mp3',
    MiniWinTrail  : 'sfx/slot/sf/sfMinitrail.mp3',
    MiniGameShow  : 'sfx/slot/sf/sfMiniIntro.mp3',
    MiniGameShow01  : 'sfx/slot/sf/sfMiniVoice01.mp3',
    MiniGameShow02  : 'sfx/slot/sf/sfMiniVoice02.mp3',
    MiniGameShow03  : 'sfx/slot/sf/sfMiniVoice03.mp3',
    MiniGameShow04  : 'sfx/slot/sf/sfMiniVoice04.mp3',
    MiniGameSpinCount  : 'sfx/slot/sf/sfMiniSpin.mp3',
    MiniGameSpinRandom01  : 'sfx/slot/sf/sfMiniSpinVoice01.mp3',
    MiniGameSpinRandom02  : 'sfx/slot/sf/sfMiniSpinVoice02.mp3',
    MiniGameSpinRandom03  : 'sfx/slot/sf/sfMiniSpinVoice03.mp3',
    MiniGameSpinRandom04  : 'sfx/slot/sf/sfMiniSpinVoice04.mp3',
    MiniGameSpinRandom05  : 'sfx/slot/sf/sfMiniSpinVoice05.mp3',

    LinkSpin            : 'sfx/slot/sf/sfLinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/sf/sfLinkReelstop.mp3',
    MysterySymbolOpen            : 'sfx/slot/sf/sfLinkReveal.mp3',
    LinkLockingJackpot            : 'sfx/slot/sf/sfJsymLocking.mp3',
    LinkLockingMini            : 'sfx/slot/sf/sfMsymLocking.mp3',
    LinkLockingMiniRandom01            : 'sfx/slot/sf/sfMiniSpinVoice01.mp3',
    LinkLockingMiniRandom02            : 'sfx/slot/sf/sfMiniSpinVoice02.mp3',
    LinkLockingMiniRandom03            : 'sfx/slot/sf/sfMiniSpinVoice03.mp3',
    LinkLockingMiniRandom04            : 'sfx/slot/sf/sfMiniSpinVoice04.mp3',
    LinkLockingMiniRandom05            : 'sfx/slot/sf/sfMiniSpinVoice05.mp3',
    // LinkLocking   : 'sfx/slot/sf/sfLsymLocking.mp3',

    SuperLinkIntro       : 'sfx/slot/sf/sfSuperLinkIntro.mp3',
    LinkIntro       : 'sfx/slot/sf/sfLinkIntro.mp3',
    LinkAddRespinCount       : 'sfx/slot/sf/sfLinkReset.mp3',
    LinkLockBlockCount       : 'sfx/slot/sf/sfUpgrade.mp3',
    LinkLockBlockOpen      : 'sfx/slot/sf/sfLinkUnlock.mp3',

    TrailTotalWin  : 'sfx/slot/sf/sfLinkSum.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/sf/sfMapOver.mp3',
    MiniMapClick            : 'sfx/slot/sf/sfMapClick.mp3',
    MiniMapUnlock           : 'sfx/slot/sf/sfUnlock.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/sf/sfMapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/sf/sfMapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/sf/sfMapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/sf/sfMapLastSuperbonusGauge.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/sf/sfMPayCount.mp3',
    NPayCount01             : 'sfx/slot/sf/sfNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/sf/sfNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/sf/sfNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/sf/sfNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/sf/sfNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/sf/sfNPayCount03End.mp3',

    //popup
    MajorPopup              : 'sfx/slot/sf/sfMajorPopup.mp3',
    LinkResultPopup        : 'sfx/slot/sf/sfLinkResult.mp3',
    JackpotPopup            : 'sfx/slot/sf/sfJackpotPopup.mp3',
    JackpotMini            : 'sfx/slot/sf/sfJVoice01.mp3',
    JackpotMinor            : 'sfx/slot/sf/sfJVoice02.mp3',
    JackpotMajor            : 'sfx/slot/sf/sfJVoice03.mp3',
    JackpotMega            : 'sfx/slot/sf/sfJVoice04.mp3',
    JackpotGrand            : 'sfx/slot/sf/sfJVoice05.mp3',

    //pot
    PotBonus            : 'sfx/slot/sf/sfPotOpen.mp3',
    // PotTrail1            : 'sfx/slot/sf/sfPotTrail01.mp3', // wild
    PotTrail2            : 'sfx/slot/sf/sfPotTrail02.mp3', // long wild
    PotUp            : 'sfx/slot/sf/sfPotPre.mp3'



};
window.g_sndSugarFactory = ResPack.create( 'sndSugarFactory', sndSugarFactory ).concat( g_sfxSlotCommon );
//-- ↑↑↑ SugarFactory END ↑↑↑ -----------


// -- Golden Lantern Link ----------------------------------------------------------------------------------------//
window.sndGoldenLanternLink = {
    Intro                       : 'sfx/slot/gll/gllIntro.mp3',
    Bgm                         : 'sfx/slot/gll/gllBgm.mp3',
    FsBgm                       : 'sfx/slot/gll/gllFsBgm.mp3',
    LinkBgm                     : 'sfx/slot/gll/gllLinkBgm.mp3',

    FsIntro                     : 'sfx/slot/gll/gllFsIntro.mp3',
    // SuperLinkIntro              : 'sfx/slot/gll/gllSuperLinkIntro.mp3',
    FsResult                    : 'sfx/slot/gll/gllFsResult.mp3',
    FsRetrigger                 : 'sfx/slot/gll/gllFsRetrigger.mp3',
    JackpotPopup                : 'sfx/slot/gll/gllJackpotPopup.mp3',
    LinkIntro                   : 'sfx/slot/gll/gllLinkIntro.mp3',
    MajorPopup                  : 'sfx/slot/gll/gllMajorPopup.mp3',
    LinkResult                  : 'sfx/slot/gll/gllLinkResult.mp3',

    // LinkCount                   : 'sfx/slot/gll/gllLinkCount.mp3',
    LinkReset                   : 'sfx/slot/gll/gllLinkReset.mp3',
    LinkSpin                    : 'sfx/slot/gll/gllLinkSpin.mp3',
    LinkSum                     : 'sfx/slot/gll/gllLinkSum.mp3',
    Longspin                    : 'sfx/slot/gll/gllLongspin.mp3',
    FsLongspin                  : 'sfx/slot/gll/gllLongspin02.mp3',

    MapClick                    : 'sfx/slot/gll/gllMapClick.mp3',
    MapLastSuperbonusGauge      : 'sfx/slot/gll/gllMapLastSuperbonusGauge.mp3',
    MapNormalGauge              : 'sfx/slot/gll/gllMapNormalGauge.mp3',
    MapOpen                     : 'sfx/slot/gll/gllMapOpen.mp3',
    MapOver                     : 'sfx/slot/gll/gllMapOver.mp3',
    MapSuperbonusGauge          : 'sfx/slot/gll/gllMapSuperbonusGauge.mp3',

    MPayCount                   : 'sfx/slot/gll/gllMPayCount.mp3',
    NPayCount01                 : 'sfx/slot/gll/gllNPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/gll/gllNPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/gll/gllNPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/gll/gllNPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/gll/gllNPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/gll/gllNPayCount03End.mp3',

    ReelStop                    : 'sfx/slot/gll/gllReelStop.mp3',
    LinkReelstop                : 'sfx/slot/gll/gllLinkReelstop.mp3',

    // JLocking                    : 'sfx/slot/gll/gllJLocking.mp3',

    SLocking01                  : 'sfx/slot/gll/gllSLocking01.mp3',
    SLocking02                  : 'sfx/slot/gll/gllSLocking02.mp3',
    SLocking03                  : 'sfx/slot/gll/gllSLocking03.mp3',
    SLocking04                  : 'sfx/slot/gll/gllSLocking04.mp3',
    SLocking05                  : 'sfx/slot/gll/gllSLocking05.mp3',

    LLocking01                  : 'sfx/slot/gll/gllLLocking01.mp3',
    LLocking02                  : 'sfx/slot/gll/gllLLocking02.mp3',
    LLocking03                  : 'sfx/slot/gll/gllLLocking03.mp3',
    LLocking04                  : 'sfx/slot/gll/gllLLocking04.mp3',
    LLocking05                  : 'sfx/slot/gll/gllLLocking05.mp3',

    Spin                        : 'sfx/slot/gll/gllSpin.mp3',
    TipOver                     : 'sfx/slot/gll/gllTipOver.mp3',
    Unlock                      : 'sfx/slot/gll/gllUnlock.mp3',
    wild                        : 'sfx/slot/gll/gllwild.mp3',

    LinkLongSpin                : 'sfx/slot/gll/gllLinkLongSpin.mp3',
    SMatch                      : 'sfx/slot/gll/gllSMatch.mp3',

    LinkJLocking                : 'sfx/slot/gll/gllLinkJLocking.mp3',
    SuperFsIntro                : 'sfx/slot/gll/gllSuperFsIntro.mp3'
};
window.g_sndGoldenLanternLink = ResPack.create( 'sndGoldenLanternLink', sndGoldenLanternLink ).concat( g_sfxGlobalCommon );
// -- End Golden Lantern Link ------------------------------------------------------------------------------------//

//-- ↓↓↓ LuckyCoin ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndLuckyCoin = {

    Intro               : 'sfx/slot/lc/lcIntro.mp3',    //V
    FreespinIntro       : 'sfx/slot/lc/lcFsIntro.mp3',  //V
    MiniIntro         : 'sfx/slot/lc/lcMiniIntro.mp3', //V
    // -- BGM
    Bgm                 : 'sfx/slot/lc/lcBgm.mp3',      //V
    FreeSpinBgm         : 'sfx/slot/lc/lcFsBgm.mp3',    //V
    MiniBgm           : 'sfx/slot/lc/lcMiniBgm.mp3',

    // -- Spin
    Spin                : 'sfx/slot/lc/lcSpin.mp3',     //V

    ReelStop            : 'sfx/slot/lc/lcReelStop.mp3', //V

    // -- Counting
    MPayCount           : 'sfx/slot/lc/lcMPayCount.mp3',        //V
    NPayCount01         : 'sfx/slot/lc/lcNPayCount01.mp3',      //V
    NPayCount01End      : 'sfx/slot/lc/lcNPayCount01End.mp3',   //V
    NPayCount02         : 'sfx/slot/lc/lcNPayCount02.mp3',      //V
    NPayCount02End      : 'sfx/slot/lc/lcNPayCount02End.mp3',   //V
    NPayCount03         : 'sfx/slot/lc/lcNPayCount03.mp3',      //V
    NPayCount03End      : 'sfx/slot/lc/lcNPayCount03End.mp3',   //V

    // -- PopUp
    FreespinResult      : 'sfx/slot/lc/lcFsResult.mp3',         //V
    MajorPopup          : 'sfx/slot/lc/lcMajorPopup.mp3',       //V
    JackpotPopup        : 'sfx/slot/lc/lcJackpotPopup.mp3',     //V
    //


    Unlock              : 'sfx/slot/lc/lcUnlock.mp3',           //V//상위베팅시 잭팟 해금 연출
    TipOver             : 'sfx/slot/lc/lcTipOver.mp3',          //V
    LongSpin            : 'sfx/slot/lc/lcLongspin.mp3',         //V

    Match               : 'sfx/slot/lc/lcSMatch.mp3',           //V

    wildTrail           : 'sfx/slot/lc/lcwild.mp3',             //V

    lcCoin01            : 'sfx/slot/lc/lcCoin01.mp3',             //V
    lcCoin02            : 'sfx/slot/lc/lcCoin02.mp3',             //V
    lcCoin03            : 'sfx/slot/lc/lcCoin03.mp3',             //V
    lcCoinShake         : 'sfx/slot/lc/lcCoinShake.mp3',          //V
    lcCoinShake02       : 'sfx/slot/lc/lcCoinShake02.mp3',

    lcMiniFrame         : 'sfx/slot/lc/lcMiniFrame.mp3',            //V
    lcMinigameWild      : 'sfx/slot/lc/lcMinigameWild.mp3',         //V

    lcMiniMatch         : 'sfx/slot/lc/lcMiniMatch.mp3',            //V
    lcMiniRemove01      : 'sfx/slot/lc/lcMiniRemove01.mp3',         //V
    lcMiniRemove02      : 'sfx/slot/lc/lcMiniRemove02.mp3',         //V
    lcMinitrail         : 'sfx/slot/lc/lcMinitrail.mp3',            //V

    lcPot               : 'sfx/slot/lc/lcPot.mp3',

    lcSLocking01        : 'sfx/slot/lc/lcSLocking01.mp3',   //V
    lcSLocking02        : 'sfx/slot/lc/lcSLocking02.mp3',   //V
    lcSLocking03        : 'sfx/slot/lc/lcSLocking03.mp3',   //V
    lcSLocking04        : 'sfx/slot/lc/lcSLocking04.mp3',   //V
    lcSLocking05        : 'sfx/slot/lc/lcSLocking05.mp3',   //V
    lcCLocking          : 'sfx/slot/lc/lcCLocking.mp3',     //V
    lcCLocking02        : 'sfx/slot/lc/lcCLocking02.mp3',
    lcCLocking03        : 'sfx/slot/lc/lcCLocking03.mp3',
    lcCLocking04        : 'sfx/slot/lc/lcCLocking04.mp3',
    lcCLocking05        : 'sfx/slot/lc/lcCLocking05.mp3',

    lcJLocking          : 'sfx/slot/lc/lcJLocking.mp3',     //V


    lcMiniVoice01       : 'sfx/slot/lc/lcMiniVoice01.mp3',
    lcMiniVoice02       : 'sfx/slot/lc/lcMiniVoice02.mp3',
    lcMiniVoice03       : 'sfx/slot/lc/lcMiniVoice03.mp3',
    lcMiniVoice04       : 'sfx/slot/lc/lcMiniVoice04.mp3',

    lcMiniIntroVoice01  : 'sfx/slot/lc/lcMiniIntroVoice01.mp3',
    lcMiniIntroVoice02  : 'sfx/slot/lc/lcMiniIntroVoice02.mp3',
    lcMiniIntroVoice03  : 'sfx/slot/lc/lcMiniIntroVoice03.mp3',
    lcMiniIntroVoice04  : 'sfx/slot/lc/lcMiniIntroVoice04.mp3',

    lcJVoice01          : 'sfx/slot/lc/lcJVoice01.mp3',
    lcJVoice02          : 'sfx/slot/lc/lcJVoice02.mp3',
    lcJVoice03          : 'sfx/slot/lc/lcJVoice03.mp3',
    lcJVoice04          : 'sfx/slot/lc/lcJVoice04.mp3',
    //lcJVoice05          : 'sfx/slot/lc/lcJVoice05.mp3' : mini

    lcJSymbolVoice      : 'sfx/slot/lc/lcJSymbolVoice.mp3',
    // lcJSymbolVoice01    : 'sfx/slot/lc/lcJSymbolVoice01.mp3',
    // lcJSymbolVoice02    : 'sfx/slot/lc/lcJSymbolVoice02.mp3',
    // lcJSymbolVoice03    : 'sfx/slot/lc/lcJSymbolVoice03.mp3',
    // lcJSymbolVoice04    : 'sfx/slot/lc/lcJSymbolVoice04.mp3',
    // lcJSymbolVoice05    : 'sfx/slot/lc/lcJSymbolVoice05.mp3',
    // lcJSymbolVoice06    : 'sfx/slot/lc/lcJSymbolVoice06.mp3',

    lcMiniAction        : 'sfx/slot/lc/lcMiniAction.mp3',
    lcMiniActionVoice01 : 'sfx/slot/lc/lcMiniActionVoice01.mp3',
    lcMiniActionVoice02 : 'sfx/slot/lc/lcMiniActionVoice02.mp3',
    lcMiniActionVoice03 : 'sfx/slot/lc/lcMiniActionVoice03.mp3',

    lcJMatch            : 'sfx/slot/lc/lcJMatch.mp3',

    lcMiniCount01       : 'sfx/slot/lc/lcMiniCount01.mp3',
    lcMiniCount02       : 'sfx/slot/lc/lcMiniCount02.mp3',
    lcMinigWildPre      : 'sfx/slot/lc/lcMinigWildPre.mp3'
};
window.g_sndLuckyCoin= ResPack.create( 'sndLuckyCoin', sndLuckyCoin ).concat( g_sfxSlotCommon );
//-- ↑↑↑ LuckyCoin ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ Golden Bier ↑↑↑ ---------------------------------------------------------------------------------------//
window.sndGoldenBier = {
    // -- INTRO
    Intro                   : 'sfx/slot/gdb/gdbIntro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/gdb/gdbBgm.mp3',
    FreeSpinBgm             : 'sfx/slot/gdb/gdbFsBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/gdb/gdbSpin.mp3',
    ReelStop                : 'sfx/slot/gdb/gdbReelStop.mp3',
    MPayCount	            : 'sfx/slot/gdb/gdbMPayCount.mp3',
    NPayCount01	            : 'sfx/slot/gdb/gdbNPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/gdb/gdbNPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/gdb/gdbNPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/gdb/gdbNPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/gdb/gdbNPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/gdb/gdbNPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/gdb/gdbMajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/gdb/gdbJackpotPopup.mp3',

    // -- NORMAL
    ScatterLock01           : 'sfx/slot/gdb/gdbSLocking01.mp3',
    ScatterLock02           : 'sfx/slot/gdb/gdbSLocking02.mp3',
    ScatterLock03           : 'sfx/slot/gdb/gdbSLocking03.mp3',
    ScatterLock04           : 'sfx/slot/gdb/gdbSLocking04.mp3',
    ScatterLock05           : 'sfx/slot/gdb/gdbSLocking05.mp3',
    BonusLock               : 'sfx/slot/gdb/gdbBLocking.mp3',
    JackpotLock             : 'sfx/slot/gdb/gdbJLocking.mp3',
    WildLock01              : 'sfx/slot/gdb/gdbWild01.mp3',
    WildLock02              : 'sfx/slot/gdb/gdbWild02.mp3',
    LongSpin                : 'sfx/slot/gdb/gdbLongspin.mp3',
    ScatterLongSpin         : 'sfx/slot/gdb/gdbLongspin02.mp3',
    SMatch                  : 'sfx/slot/gdb/gdbSMatch.mp3',
    ToolTipOver             : 'sfx/slot/gdb/gdbTipOver.mp3',
    GaugeOn                 : 'sfx/slot/gdb/gdbUnlock.mp3',

    // -- FREESPIN
    FSIntro                 : 'sfx/slot/gdb/gdbFsIntro.mp3',
    FSCountUp               : 'sfx/slot/gdb/gdbFsCount.mp3',
    SuperFSIntro            : 'sfx/slot/gdb/gdbSuperFsIntro.mp3',
    Retrigger               : 'sfx/slot/gdb/gdbFsRetrigger.mp3',
    TriggerLocking          : 'sfx/slot/gdb/gdbTsymLocking.mp3',
    TriggerMatch            : 'sfx/slot/gdb/gdbTsymLocking02.mp3',
    OpenReelIntro           : 'sfx/slot/gdb/gdbFsUnlock.mp3',
    OpenReel                : 'sfx/slot/gdb/gdbFsUnlock02.mp3',
    FsResult                : 'sfx/slot/gdb/gdbFsResult.mp3',

    // -- MAP
    MapOver                 : 'sfx/slot/gdb/gdbMapOver.mp3',
    MapClick                : 'sfx/slot/gdb/gdbMapClick.mp3',
    MapOpen                 : 'sfx/slot/gdb/gdbMapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/gdb/gdbMapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/gdb/gdbMapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/gdb/gdbMapLastSuperbonusGauge.mp3',

    // -- VOICE
    WildVoid01              : 'sfx/slot/gdb/gdbWildVoice01.mp3',
    WildVoid02              : 'sfx/slot/gdb/gdbWildVoice02.mp3',
    WildVoid03              : 'sfx/slot/gdb/gdbWildVoice03.mp3',
    WildVoid04              : 'sfx/slot/gdb/gdbWildVoice04.mp3',
    JakcpotVoice01          : 'sfx/slot/gdb/gdbJackpotvoice01.mp3',
    JakcpotVoice02          : 'sfx/slot/gdb/gdbJackpotvoice02.mp3',
    JakcpotVoice03          : 'sfx/slot/gdb/gdbJackpotvoice03.mp3',
};
window.g_sndGoldenBier = ResPack.create( 'sndGoldenBier', sndGoldenBier ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Golden Bier END ↑↑↑ -----------------------------------------------------------------------------------//

//-- ↑↑↑ HoneyBeengo BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndHoneyBeengo = {
    Intro           : 'sfx/slot/hb/hbIntro.mp3',

    BGM             : 'sfx/slot/hb/hbBgm.mp3',
    BGM_free      : 'sfx/slot/hb/hbFsBgm.mp3',
    BGM_mini       : 'sfx/slot/hb/hbMiniBgm.mp3',
    BGM_bingo       : 'sfx/slot/hb/hbBingoBgm.mp3',

    Spin                : 'sfx/slot/hb/hbSpin.mp3',
    ReelStop            : 'sfx/slot/hb/hbReelStop.mp3',
    LongSpin            : 'sfx/slot/hb/hbLongspin.mp3',
    FreeGameSpinCount            : 'sfx/slot/hb/hbCount.mp3',
    FreeGameRetriggerTrail           : 'sfx/slot/hb/hbTrailRetrigger.mp3',

    DirectSymbolLock           : 'sfx/slot/hb/hbSLocking.mp3',
    MultiDirectSymbolLock           : 'sfx/slot/hb/hbMiniLocking01.mp3',
    MultiDirectSymbolLock2           : 'sfx/slot/hb/hbMiniLocking02.mp3',
    TriggerSymbolLock           : 'sfx/slot/hb/hbFstrigger.mp3',
    // pot
    PotBonus            : 'sfx/slot/hb/hbPotOpen.mp3',
    PotUp            : 'sfx/slot/hb/hbPotPre.mp3',
    // trail
    PotTrail            : 'sfx/slot/hb/hbPotTrail01.mp3',
    DPTrailDP            : 'sfx/slot/hb/hbPotTrail02.mp3',
    DPTrailMini            : 'sfx/slot/hb/hbPotTrail03.mp3',
    DPTrailJackpot            : 'sfx/slot/hb/hbPotTrail04.mp3',

    MiniGame02FrameOpen : 'sfx/slot/hb/hbMiniFrame.mp3',
    MiniGame02FullReel : 'sfx/slot/hb/hbMiniPopup.mp3',
    // Minigame02Trail            : 'sfx/slot/hb/hbMiniTrail01.mp3',
    Minigame03Wheel           : 'sfx/slot/hb/hbMiniWheel.mp3',
    Minigame03WheelStop           : 'sfx/slot/hb/hbMiniWheelEnd.mp3',
    Minigame03Win           : 'sfx/slot/hb/hbMiniNoti.mp3',
    Minigame04LockUp           : 'sfx/slot/hb/hbMiniLocking01.mp3',
    Minigame04LockBunos           : 'sfx/slot/hb/hbMiniLocking02.mp3',
    Minigame04Up           : 'sfx/slot/hb/hbMiniUpgrade.mp3',
    Minigame04SpinAdd           : 'sfx/slot/hb/hbMiniRetrigger.mp3',
    MinigameWinTrail           : 'sfx/slot/hb/hbMinitrail.mp3',
    MinigameWin           : 'sfx/slot/hb/hbMiniResult.mp3',

    BingoIntro : 'sfx/slot/hb/hbBingoCheck.mp3',
    BingoMatch  : 'sfx/slot/hb/hbBingoMatch.mp3',
    BingoWin  : 'sfx/slot/hb/hbMiniEnd.mp3',
    BingoChange  : 'sfx/slot/hb/hbBingoReset.mp3',
    BingoChangeFreeGame  : 'sfx/slot/hb/hbFsReveal.mp3',
    BingoJackpotGet  : 'sfx/slot/hb/hbJackpotSym.mp3',
    BingoLine  : 'sfx/slot/hb/hbBingoFrame.mp3',

    TooltipOver  : 'sfx/slot/hb/hbTipOver.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/hb/hbMapOver.mp3',
    MiniMapClick            : 'sfx/slot/hb/hbMapClick.mp3',
    MiniMapUnlock           : 'sfx/slot/hb/hbUnlock.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/hb/hbMapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/hb/hbMapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/hb/hbMapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/hb/hbMapLastSuperbonusGauge.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/hb/hbMPayCount.mp3',
    NPayCount01             : 'sfx/slot/hb/hbNPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/hb/hbNPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/hb/hbNPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/hb/hbNPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/hb/hbNPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/hb/hbNPayCount03End.mp3',


    //popup
    JackpotPopup            : 'sfx/slot/hb/hbJackpotPopup.mp3',
    GrandJackpotPopup            : 'sfx/slot/hb/hbJVoice05.mp3',
    MegaJackpotPopup            : 'sfx/slot/hb/hbJVoice04.mp3',
    MajorJackpotPopup            : 'sfx/slot/hb/hbJVoice03.mp3',
    MinorJackpotPopup            : 'sfx/slot/hb/hbJVoice02.mp3',
    MajorPopup            : 'sfx/slot/hb/hbMajorPopup.mp3',
    BingoPopup            : 'sfx/slot/hb/hbBingoIntro.mp3',
    MiniGamePopup            : 'sfx/slot/hb/hbMiniIntro.mp3',
    MiniGame01Popup      : 'sfx/slot/hb/hbMiniVoice01.mp3',
    MiniGame02Popup      : 'sfx/slot/hb/hbMiniVoice02.mp3',
    MiniGame03Popup      : 'sfx/slot/hb/hbMiniVoice03.mp3',
    MiniGame04Popup      : 'sfx/slot/hb/hbMiniVoice04.mp3',
    FreeGamePopup            : 'sfx/slot/hb/hbFsIntro.mp3',
    SuperFreeGamePopup            : 'sfx/slot/hb/hbSuperFsIntro.mp3',
    // FreeRetriggerGamePopup            : 'sfx/slot/hb/hbFsRetrigger.mp3',
    FreeGameResultPopup            : 'sfx/slot/hb/hbFsResult.mp3',



};
window.g_sndHoneyBeengo = ResPack.create( 'sndHoneyBeengo', sndHoneyBeengo ).concat( g_sfxSlotCommon );
//-- ↑↑↑ HoneyBeengo END ↑↑↑ -----------

// ========== Spooky Pumpkin Begin ==========
window.sndSpookyPumpkin = {
    // === Intro ===
    Intro                       : 'sfx/slot/119/119Intro.mp3',

    // === BGM ===
    Bgm                         : 'sfx/slot/119/119Bgm.mp3',
    FsBgm                       : 'sfx/slot/119/119FsBgm.mp3',
    LinkBgm                     : 'sfx/slot/119/119LinkBgm.mp3',

    // === Pay ===
    Spin                        : 'sfx/slot/119/119Spin.mp3',
    ReelStop                    : 'sfx/slot/119/119ReelStop.mp3',
    MPayCount                   : 'sfx/slot/119/119MPayCount.mp3',
    NPayCount01                 : 'sfx/slot/119/119NPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/119/119NPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/119/119NPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/119/119NPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/119/119NPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/119/119NPayCount03End.mp3',
    MajorPopup                  : 'sfx/slot/119/119MajorPopup.mp3',
    JackpotPopup                : 'sfx/slot/119/119JackpotPopup.mp3',

    // === Normal ===
    SLocking01                  : 'sfx/slot/119/119SLocking01.mp3',
    SLocking03                  : 'sfx/slot/119/119SLocking03.mp3',
    SLocking05                  : 'sfx/slot/119/119SLocking05.mp3',
    Wild                        : 'sfx/slot/119/119Wild.mp3',
    Longspin                    : 'sfx/slot/119/119Longspin.mp3',
    Longspin02                  : 'sfx/slot/119/119Longspin02.mp3',
    PotPre                      : 'sfx/slot/119/119PotPre.mp3',
    PotOpen                     : 'sfx/slot/119/119PotOpen.mp3',
    Extend                      : 'sfx/slot/119/119Extend.mp3',
    SMatch                      : 'sfx/slot/119/119SMatch.mp3',
    TipOver                     : 'sfx/slot/119/119TipOver.mp3',
    Unlock                      : 'sfx/slot/119/119Unlock.mp3',

    // === Free Spin ===
    FsIntro                     : 'sfx/slot/119/119FsIntro.mp3',
    SuperFsIntro                : 'sfx/slot/119/119SuperFsIntro.mp3',
    Retrigger                   : 'sfx/slot/119/119Retrigger.mp3',
    TsymLocking                 : 'sfx/slot/119/119TsymLocking.mp3',
    TsymLocking02               : 'sfx/slot/119/119TsymLocking02.mp3',
    FsUnlock                    : 'sfx/slot/119/119FsUnlock.mp3',
    FsUnlock02                  : 'sfx/slot/119/119FsUnlock02.mp3',
    FsResult                    : 'sfx/slot/119/119FsResult.mp3',

    // === Link Spin ===
    LinkIntro                   : 'sfx/slot/119/119LinkIntro.mp3',
    SuperLinkIntro              : 'sfx/slot/119/119SuperLinkIntro.mp3',
    DsymLocking                 : 'sfx/slot/119/119DsymLocking.mp3',
    JsymLocking                 : 'sfx/slot/119/119JsymLocking.mp3',
    LinkReset                   : 'sfx/slot/119/119LinkReset.mp3',
    LinkUpgrade01               : 'sfx/slot/119/119LinkUpgrade01.mp3',
    LinkUpgrade02               : 'sfx/slot/119/119LinkUpgrade02.mp3',
    LinkUpgrade03               : 'sfx/slot/119/119LinkUpgrade03.mp3',
    LinkSpin                    : 'sfx/slot/119/119LinkSpin.mp3',
    LinkSum                     : 'sfx/slot/119/119LinkSum.mp3',
    LinkResult                  : 'sfx/slot/119/119LinkResult.mp3',

    // === Map ===
    MapOver                     : 'sfx/slot/119/119MapOver.mp3',
    MapClick                    : 'sfx/slot/119/119MapClick.mp3',
    MapOpen                     : 'sfx/slot/119/119MapOpen.mp3',
    MapNormalGauge01            : 'sfx/slot/119/119MapNormalGauge01.mp3',
    MapNormalGauge02            : 'sfx/slot/119/119MapNormalGauge02.mp3',
    MapSuperbonusGauge01        : 'sfx/slot/119/119MapSuperbonusGauge01.mp3',
    MapSuperbonusGauge02        : 'sfx/slot/119/119MapSuperbonusGauge02.mp3',
    MapLastSuperbonusGauge01    : 'sfx/slot/119/119MapLastSuperbonusGauge01.mp3',
    MapLastSuperbonusGauge02    : 'sfx/slot/119/119MapLastSuperbonusGauge02.mp3',

    // === Voice ===
    ExtendVoice01               : 'sfx/slot/119/119ExtendVoice01.mp3',
    ExtendVoice02               : 'sfx/slot/119/119ExtendVoice02.mp3',
    ExtendVoice03               : 'sfx/slot/119/119ExtendVoice03.mp3',
    ExtendVoice04               : 'sfx/slot/119/119ExtendVoice04.mp3',
    ExtendVoice05               : 'sfx/slot/119/119ExtendVoice05.mp3',
    ExtendVoice06               : 'sfx/slot/119/119ExtendVoice06.mp3',
    JVoice01                    : 'sfx/slot/119/119JVoice01.mp3',
    JVoice02                    : 'sfx/slot/119/119JVoice02.mp3',
    JVoice03                    : 'sfx/slot/119/119JVoice03.mp3',
    JVoice04                    : 'sfx/slot/119/119JVoice04.mp3',
    JVoice05                    : 'sfx/slot/119/119JVoice05.mp3',
    JVoice06                    : 'sfx/slot/119/119JVoice06.mp3'
};
window.g_sndSpookyPumpkin = ResPack.create( 'sndSpookyPumpkin', sndSpookyPumpkin ).concat( g_sfxGlobalCommon );
// ========== Spooky Pumpkin End ==========


//-- ↓↓↓ PenguinFrenzy ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndPenguinFrenzy = {

    Intro               : 'sfx/slot/122/122Intro.mp3',        //V
    FreespinIntro       : 'sfx/slot/122/122FsIntro.mp3',      //V
    SuperFsIntro        : 'sfx/slot/122/122SuperFsIntro.mp3', //V
    FsRetrigger         : 'sfx/slot/122/122Retrigger.mp3',    //V
    RespinPopup         : 'sfx/slot/122/122RespinPopup.mp3',    //V

    FsTransition        : 'sfx/slot/122/122FsTransition.mp3',    //V
    MiniJackpot         : 'sfx/slot/122/122FsArrayPopup.mp3',

    // -- BGM
    Bgm                 : 'sfx/slot/122/122Bgm.mp3',  //V
    FreeSpinBgm         : 'sfx/slot/122/122FsBgm.mp3', //V

    ReBgm               : 'sfx/slot/122/122ReBgm.mp3',  //v

    // -- Spin
    Spin                : 'sfx/slot/122/122Spin.mp3',  //v

    ReelStop            : 'sfx/slot/122/122ReelStop.mp3', //v

    // -- Counting
    MPayCount           : 'sfx/slot/122/122MPayCount.mp3',        //V
    NPayCount01         : 'sfx/slot/122/122NPayCount01.mp3',      //V
    NPayCount01End      : 'sfx/slot/122/122NPayCount01End.mp3',   //V
    NPayCount02         : 'sfx/slot/122/122NPayCount02.mp3',      //V
    NPayCount02End      : 'sfx/slot/122/122NPayCount02End.mp3',   //V
    NPayCount03         : 'sfx/slot/122/122NPayCount03.mp3',      //V
    NPayCount03End      : 'sfx/slot/122/122NPayCount03End.mp3',   //V

    RetriggerCount      : 'sfx/slot/122/122RetriggerCount.mp3',

    // -- PopUp
    MajorPopup          : 'sfx/slot/122/122MajorPopup.mp3',       //V
    JackpotPopup        : 'sfx/slot/122/122JackpotPopup.mp3',     //V
    FreespinResult      : 'sfx/slot/122/122FsResult.mp3',         //v
    //

    LongSpin            : 'sfx/slot/122/122Longspin.mp3',         //V
    LongSpin02          : 'sfx/slot/122/122Longspin02.mp3',
    Locking             : 'sfx/slot/122/122Locking.mp3',

    Match               : 'sfx/slot/122/122FsMatch.mp3',
    FsFrame             : 'sfx/slot/122/122FsFrame.mp3',

    // RSymTransition      : 'sfx/slot/122/122RSymTransition.mp3',
    // NSymTransition      : 'sfx/slot/122/122NSymTransition.mp3',
    // FSymTransition      : 'sfx/slot/122/122FSymTransition.mp3',
    // SymTransition       : 'sfx/slot/122/122SymTransition.mp3',

    SymTransition       : 'sfx/slot/122/122Locking.mp3',

    RLock               : 'sfx/slot/122/122RSymTransition.mp3',     //리스핀 잭팟
    SLock               : 'sfx/slot/122/122FSymTransition.mp3',     //스케터 잭팟
    NLock               : 'sfx/slot/122/122NSymTransition.mp3',     //노멀잭팟
    CLock               : 'sfx/slot/122/122SymTransition.mp3',      //프리스핀에서 센터

    // -- map
    MapOver                   : 'sfx/slot/122/122MapOver.mp3',                //x
    MapClick                  : 'sfx/slot/122/122MapClick.mp3',               //x
    MapActive                 : 'sfx/slot/122/122Unlock.mp3',
    MapOpen                   : 'sfx/slot/122/122MapOpen.mp3',                //x
    MapNormalGauge            : 'sfx/slot/122/122MapNormalGauge.mp3',         //x
    MapSuperbonusGauge        : 'sfx/slot/122/122MapSuperbonusGauge.mp3',     //x
    MapLastSuperbonusGauge    : 'sfx/slot/122/122MapLastSuperbonusGauge.mp3',   //x


};
window.g_sndPenguinFrenzy= ResPack.create( 'sndPenguinFrenzy', sndPenguinFrenzy ).concat( g_sfxSlotCommon );
//-- ↑↑↑ PenguinFrenzy ↑↑↑ -------------------------------------------------------------------------------------//

//region -- ↓↓↓ LegacyOfTheGods_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndLegacyOfTheGods = {
    //BGM
    Intro               : 'sfx/slot/126/126Intro.mp3',          //V
    Bgm                 : 'sfx/slot/126/126Bgm.mp3',            //V
    MiniBgm             : 'sfx/slot/126/126MiniBgm.mp3',        //V
    PickBgm             : 'sfx/slot/126/126PickBgm.mp3',        //V

    // -- Spin
    Spin                : 'sfx/slot/126/126Spin.mp3',           //V
    ReelStop            : 'sfx/slot/126/126ReelStop.mp3',       //V

    // -- Counting
    MPayCount           : 'sfx/slot/126/126MPayCount.mp3',      //V
    NPayCount01         : 'sfx/slot/126/126NPayCount01.mp3',    //V
    NPayCount01End      : 'sfx/slot/126/126NPayCount01End.mp3', //V
    NPayCount02         : 'sfx/slot/126/126NPayCount02.mp3',    //V
    NPayCount02End      : 'sfx/slot/126/126NPayCount02End.mp3', //V
    NPayCount03         : 'sfx/slot/126/126NPayCount03.mp3',    //V
    NPayCount03End      : 'sfx/slot/126/126NPayCount03End.mp3', //V

    // -- PopUp
    MajorPopup          : 'sfx/slot/126/126MajorPopup.mp3',     //v
    JackpotPopup        : 'sfx/slot/126/126JackpotPopup.mp3',   //v

    //

    //다이아 락킹
    DLocking01          : 'sfx/slot/126/126DLocking01.mp3',     //v
    DLocking02          : 'sfx/slot/126/126DLocking02.mp3',     //v
    DLocking03          : 'sfx/slot/126/126DLocking03.mp3',     //v
    DLocking04          : 'sfx/slot/126/126DLocking04.mp3',     //v
    DLocking05          : 'sfx/slot/126/126DLocking05.mp3',     //v

    CLocking01          : 'sfx/slot/126/126CLocking01.mp3',     //v
    CLocking02          : 'sfx/slot/126/126CLocking02.mp3',     //v
    CLocking03          : 'sfx/slot/126/126CLocking03.mp3',     //v
    CLocking04          : 'sfx/slot/126/126CLocking04.mp3',     //v
    CLocking05          : 'sfx/slot/126/126CLocking05.mp3',     //v

    DTrail              : 'sfx/slot/126/126Trail.mp3',          //v //다이아 심볼 트레일 될 시
    DTrail02            : 'sfx/slot/126/126Trail02.mp3',          //v //다이아 심볼 트레일 될 시
    wildTrail           : 'sfx/slot/126/126wild.mp3',           //v //와일드 심볼 락킹후 트레일 될 시

    Unlock              : 'sfx/slot/126/126Unlock.mp3',         //v
    LongSpin            : 'sfx/slot/126/126Longspin.mp3',       //v
    SMatch              : 'sfx/slot/126/126SMatch.mp3',         //v
    CMatch              : 'sfx/slot/126/126Cmatch.mp3',         //v

    Pot                 : 'sfx/slot/126/126Pot.mp3',            //v
    PgameIntro          : 'sfx/slot/126/126PgameIntro.mp3',

    //Pick
    //PickIntro           : 'sfx/slot/126/126PickIntro.mp3',  //v
    PickOver            : 'sfx/slot/126/126PickOver.mp3',   //v
    PickClick           : 'sfx/slot/126/126PickClick.mp3',  //v
    PickMatch           : 'sfx/slot/126/126PickMatch.mp3',  //v


    //BonusGame
    MiniIntro           : 'sfx/slot/126/126MiniIntro.mp3',  //v
    SuperMiniIntro      : 'sfx/slot/126/126SuperMiniIntro.mp3', //v
    MiniCount           : 'sfx/slot/126/126MiniCount.mp3',  //v
    MiniCountEnd        : 'sfx/slot/126/126MiniCountEnd.mp3',  //v
    MiniLocking         : 'sfx/slot/126/126MiniLocking.mp3',//v
    MiniWild01          : 'sfx/slot/126/126MiniWild01.mp3', //v
    MiniWild02          : 'sfx/slot/126/126MiniWild02.mp3', //v
    MiniFrame           : 'sfx/slot/126/126MiniFrame.mp3',  //v
    MiniNoti            : 'sfx/slot/126/126MiniNoti.mp3',   //v
    MiniResult          : 'sfx/slot/126/126MiniResult.mp3', //v

    MiniMulti01		    : 'sfx/slot/126/126MiniMulti01.mp3',  //v
    MiniMulti02		    : 'sfx/slot/126/126MiniMulti02.mp3',  //v


    //Voice
    MiniVoice01         : 'sfx/slot/126/126MiniVoice01.mp3',  //v
    MiniVoice03         : 'sfx/slot/126/126MiniVoice03.mp3',  //v
    MiniVoice05         : 'sfx/slot/126/126MiniVoice05.mp3',  //v
    MiniVoice07         : 'sfx/slot/126/126MiniVoice07.mp3',  //v
    MiniVoice09         : 'sfx/slot/126/126MiniVoice09.mp3',  //v

    Qvoice01            : 'sfx/slot/126/126Qvoice01.mp3',  //v
    Qvoice02            : 'sfx/slot/126/126Qvoice02.mp3',  //v

    Zvoice01            : 'sfx/slot/126/126Zvoice01.mp3',  //v
    Zvoice02            : 'sfx/slot/126/126Zvoice02.mp3',  //v

    Pvoice01            : 'sfx/slot/126/126Pvoice01.mp3',  //v
    Pvoice02            : 'sfx/slot/126/126Pvoice02.mp3',  //v

    Avoice01            : 'sfx/slot/126/126Avoice01.mp3',  //v
    Avoice02            : 'sfx/slot/126/126Avoice02.mp3',  //v

    //JVoice01            : 'sfx/slot/126/126JVoice01.mp3',  //v
    JVoice02            : 'sfx/slot/126/126JVoice02.mp3',  //v
    JVoice03            : 'sfx/slot/126/126JVoice03.mp3',  //v
    JVoice04            : 'sfx/slot/126/126JVoice04.mp3',  //v
    JVoice05            : 'sfx/slot/126/126JVoice05.mp3',  //v

    //SoundControl.getInstance().playEffect(sndLegacyOfTheGods.DTrail);
};
window.g_sndLegacyOfTheGods= ResPack.create( 'sndLegacyOfTheGods', sndLegacyOfTheGods ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ LegacyOfTheGods_END ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ Wheel Of Jackpot Cash Stach↑↑↑ ----------------------------------------------------------------------------------------//
window.sndWheelOfJackpotCS = {
    // -- INTRO
    Intro                   : 'sfx/slot/121/121Intro.mp3',

    // -- BGM
    Bgm                     : 'sfx/slot/121/121Bgm.mp3',
    FreeSpinBgm             : 'sfx/slot/121/121FsBgm.mp3',
    WheelBgm                : 'sfx/slot/121/121WheelBgm.mp3',

    // -- PAY
    Spin                    : 'sfx/slot/121/121Spin.mp3',
    ReelStop                : 'sfx/slot/121/121ReelStop.mp3',
    MPayCount	            : 'sfx/slot/121/121MPayCount.mp3',
    NPayCount01	            : 'sfx/slot/121/121NPayCount01.mp3',
    NPayCount01End	        : 'sfx/slot/121/121NPayCount01End.mp3',
    NPayCount02	            : 'sfx/slot/121/121NPayCount02.mp3',
    NPayCount02End	        : 'sfx/slot/121/121NPayCount02End.mp3',
    NPayCount03	            : 'sfx/slot/121/121NPayCount03.mp3',
    NPayCount03End	        : 'sfx/slot/121/121NPayCount03End.mp3',
    MajorPopUp	            : 'sfx/slot/121/121MajorPopup.mp3',
    JackpotPopUp	        : 'sfx/slot/121/121JackpotPopup.mp3',

    // -- NORMAL
    ScatterLock01           : 'sfx/slot/121/121SLocking01.mp3',
    ScatterLock02           : 'sfx/slot/121/121SLocking02.mp3',
    ScatterLock03           : 'sfx/slot/121/121SLocking03.mp3',
    DirectLock              : 'sfx/slot/121/121DLocking.mp3',
    WheelLock01             : 'sfx/slot/121/121WLocking01.mp3',
    WheelLock02             : 'sfx/slot/121/121WLocking02.mp3',
    WheelLock03             : 'sfx/slot/121/121WLocking03.mp3',
    WheelLock04             : 'sfx/slot/121/121WLocking04.mp3',
    CollectLock             : 'sfx/slot/121/121CollecLocking.mp3',
    ToolTipOver             : 'sfx/slot/121/121TipOver.mp3',
    GrandOn                 : 'sfx/slot/121/121Unlock.mp3',
    LongSpin1               : 'sfx/slot/121/121Longspin.mp3',
    LongSpin2               : 'sfx/slot/121/121Longspin02.mp3',
    SMatch                  : 'sfx/slot/121/121SMatch.mp3',
    CollectPay              : 'sfx/slot/121/121WMatch.mp3',
    WheelMatch              : 'sfx/slot/121/121Match.mp3',
    CollectMatch            : 'sfx/slot/121/121CMatch.mp3',
    TitleChangeOpen         : 'sfx/slot/121/121winpanelOpen.mp3',
    TitleChangeClose        : 'sfx/slot/121/121winpanelClose.mp3',
    TitleWinCount           : 'sfx/slot/121/121winpanelsum.mp3',
    Trail                   : 'sfx/slot/121/121Trail.mp3',
    Trail02                 : 'sfx/slot/121/121Trail02.mp3',
    TrailEnd                : 'sfx/slot/121/121TrailEnd.mp3',


    // -- WHEEL
    WheelNotiNodeOpen       : 'sfx/slot/121/121JackpotNoti.mp3',
    WheelButton             : 'sfx/slot/121/121WButton.mp3',
    WheelButtonClick        : 'sfx/slot/121/121WClick.mp3',
    WheelIntro              : 'sfx/slot/121/121WheelIntro.mp3',
    WheelSpin               : 'sfx/slot/121/121WheelSpin.mp3',
    WheelSpin02             : 'sfx/slot/121/121WheelSpin02.mp3',
    WheelIndiCatorLastOn    : 'sfx/slot/121/121TrailEnd.mp3',
    WheelSpinEnd            : 'sfx/slot/121/121WheelSpinEnd.mp3',
    WheelDP                 : 'sfx/slot/121/121WheelMatch.mp3',
    WheelCashStash          : 'sfx/slot/121/121WheelMatch02.mp3',
    WheelJackpot            : 'sfx/slot/121/121WheelMatch03.mp3',
    WheelCount              : 'sfx/slot/121/121WheelSum.mp3',
    WheelCount02            : 'sfx/slot/121/121WheelSum02.mp3',
    WheelTrail              : 'sfx/slot/121/121Wheeltrail.mp3',
    WheelResult             : 'sfx/slot/121/121WheelReslut.mp3',

    // -- FREE SPIN
    FreeSpinIntro           : 'sfx/slot/121/121FsIntro.mp3',
    FreeSpinResult          : 'sfx/slot/121/121FsResult.mp3',

    // -- VOICE
    JackcpotVoice01         : 'sfx/slot/121/121JVoice01.mp3',
    JackcpotVoice02         : 'sfx/slot/121/121JVoice02.mp3',
    JackcpotVoice03         : 'sfx/slot/121/121JVoice03.mp3',
    JackcpotVoice04         : 'sfx/slot/121/121JVoice04.mp3',
    WheelPointOn01          : 'sfx/slot/121/121WCount01.mp3',
    WheelPointOn02          : 'sfx/slot/121/121WCount02.mp3',
    WheelPointOn03          : 'sfx/slot/121/121WCount03.mp3',
    WheelPointOn04          : 'sfx/slot/121/121WCount04.mp3',
    WheelPointMult          : 'sfx/slot/121/121WCountEnd.mp3',
};
window.g_sndWheelOfJackpotCS = ResPack.create( 'sndWheelOfJackpotCS', sndWheelOfJackpotCS ).concat( g_sfxSlotCommon );
//-- ↑↑↑ Wheel Of Jackpot Cash Stash END ↑↑↑ ---------------------------------------------------------------------------------//

// ========== DevilsVault 123 Begin ==========
window.sndDevilsVault = {
    // === Intro ===
    Intro                       : 'sfx/slot/123/123Intro.mp3',

    // === BGM ===
    Bgm                         : 'sfx/slot/123/123Bgm.mp3',
    FsBgm                       : 'sfx/slot/123/123FsBgm.mp3',

    // === Pay ===
    MPayCount                   : 'sfx/slot/123/123MPayCount.mp3',
    NPayCount01                 : 'sfx/slot/123/123NPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/123/123NPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/123/123NPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/123/123NPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/123/123NPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/123/123NPayCount03End.mp3',

    Spin                        : 'sfx/slot/123/123Spin.mp3',
    ReelStop                    : 'sfx/slot/123/123ReelStop.mp3',

    LockingScatter01            : 'sfx/slot/123/123SLocking01.mp3',
    LockingScatter02            : 'sfx/slot/123/123SLocking02.mp3',
    LockingScatter03            : 'sfx/slot/123/123SLocking03.mp3',
    LockingScatter04            : 'sfx/slot/123/123SLocking04.mp3',
    LockingScatter05            : 'sfx/slot/123/123SLocking05.mp3',
    LockingJackpot              : 'sfx/slot/123/123JLocking.mp3',
    LockingDirect               : 'sfx/slot/123/123DLocking01.mp3',
    LockingBigDirect            : 'sfx/slot/123/123DLocking04.mp3',
    LockDirectRandom01          : 'sfx/slot/123/123DVoice01.mp3',
    LockDirectRandom02          : 'sfx/slot/123/123DVoice02.mp3',
    LockDirectRandom03          : 'sfx/slot/123/123DVoice03.mp3',
    LockDirectRandom04          : 'sfx/slot/123/123DVoice04.mp3',
    LockingCollect              : 'sfx/slot/123/123CLocking.mp3',
    LockingBigCollect           : 'sfx/slot/123/123CLocking02.mp3',
    CollectReady                : 'sfx/slot/123/123Csym01.mp3',
    // BigCollectReady             : 'sfx/slot/123/123Csym02.mp3',

    ScatterMatch                : 'sfx/slot/123/123SMatch.mp3',
    JackpotMatch                : 'sfx/slot/123/123JMatch.mp3',

    LongspinScatter             : 'sfx/slot/123/123Longspin.mp3',
    LongspinJackpot             : 'sfx/slot/123/123Longspin02.mp3',

    PotGaugeAdd                 : 'sfx/slot/123/123PotGuage.mp3',
    PotGaugeMouseOver           : 'sfx/slot/123/123TipOver.mp3',
    PotGaugeUnlock              : 'sfx/slot/123/123Unlock.mp3',
    PotOpen                     : 'sfx/slot/123/123PotOpen.mp3',

    GaugeFull                   : 'sfx/slot/123/123FsIntro.mp3',

    // popup
    FreeGamePopup               : 'sfx/slot/123/123FsIntroPopup.mp3',
    SuperFreeGamePopup          : 'sfx/slot/123/123SuperFsIntroPopup.mp3',
    RetriggerPopup              : 'sfx/slot/123/123FsRetrigger.mp3',
    FreeGameResultPopup         : 'sfx/slot/123/123FsResult.mp3',
    MajorPopup                  : 'sfx/slot/123/123MajorPopup.mp3',
    JackpotPopup                : 'sfx/slot/123/123JackpotPopup.mp3',

    TrailDirect                 : 'sfx/slot/123/123Trail01.mp3',
    TrailBigDirect              : 'sfx/slot/123/123Trail01.mp3',
    TrailCollect                : 'sfx/slot/123/123Trail02.mp3',
    // TrailBigCollect             : 'sfx/slot/123/123Trail03.mp3',
    TrailCollectRandom01        : 'sfx/slot/123/123CVoice01.mp3',
    TrailCollectRandom02        : 'sfx/slot/123/123CVoice02.mp3',
    TrailCollectRandom03        : 'sfx/slot/123/123CVoice03.mp3',

};
window.g_sndDevilsVault = ResPack.create( 'sndDevilsVault', sndDevilsVault ).concat( g_sfxGlobalCommon );
// ========== DevilsVault 123 End ==========

// ========== Royal Diamonds Begin ==========
window.sndRoyalDiamonds = {
    // === Intro ===
    Intro                       : 'sfx/slot/125/125Intro.mp3',

    // === BGM ===
    Bgm                         : 'sfx/slot/125/125Bgm.mp3',
    LinkBgm                     : 'sfx/slot/125/125LinkBgm.mp3',

    // === Pay ===
    Spin                        : 'sfx/slot/125/125Spin.mp3',
    ReelStop                    : 'sfx/slot/125/125ReelStop.mp3',
    MPayCount                   : 'sfx/slot/125/125MPayCount.mp3',
    NPayCount01                 : 'sfx/slot/125/125NPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/125/125NPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/125/125NPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/125/125NPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/125/125NPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/125/125NPayCount03End.mp3',
    MajorPopup                  : 'sfx/slot/125/125MajorPopup.mp3',
    JackpotPopup                : 'sfx/slot/125/125JackpotPopup.mp3',

    // === Normal ===
    Longspin                    : 'sfx/slot/125/125Longspin.mp3',
    DLocking                    : 'sfx/slot/125/125DLocking.mp3',
    DLocking02                  : 'sfx/slot/125/125DLocking02.mp3',
    JLocking                    : 'sfx/slot/125/125JLocking.mp3',
    TipOver                     : 'sfx/slot/125/125TipOver.mp3',
    SMatch                      : 'sfx/slot/125/125SMatch.mp3',
    MapUnlock                   : 'sfx/slot/125/125MapUnlock.mp3',

    // === Link Spin ===
    LinkIntro                   : 'sfx/slot/125/125LinkIntro.mp3',
    SuperLinkIntro              : 'sfx/slot/125/125SuperLinkIntro.mp3',
    LinkArray                   : 'sfx/slot/125/125LinkArray.mp3',
    LinkSpin                    : 'sfx/slot/125/125LinkSpin.mp3',
    LinkCount                   : 'sfx/slot/125/125LinkCount.mp3',
    LinkReelstop                : 'sfx/slot/125/125LinkReelstop.mp3',
    LinkReset                   : 'sfx/slot/125/125LinkReset.mp3',
    LinkSum                     : 'sfx/slot/125/125LinkSum.mp3',
    TsymLocking                 : 'sfx/slot/125/125TsymLocking.mp3',
    TsymLocking02               : 'sfx/slot/125/125TsymLocking02.mp3',
    TsymLocking03               : 'sfx/slot/125/125TsymLocking03.mp3',
    Unlock                      : 'sfx/slot/125/125Unlock.mp3',
    Unlock02                    : 'sfx/slot/125/125Unlock02.mp3',
    Count01                     : 'sfx/slot/125/125Count01.mp3',
    Count02                     : 'sfx/slot/125/125Count02.mp3',
    Count03                     : 'sfx/slot/125/125Count03.mp3',
    Upgrade                     : 'sfx/slot/125/125Upgrade.mp3',
    LinkResult                  : 'sfx/slot/125/125LinkResult.mp3',

    // === Map ===
    MapOver                     : 'sfx/slot/125/125MapOver.mp3',
    MapClick                    : 'sfx/slot/125/125MapClick.mp3',
    MapOpen                     : 'sfx/slot/125/125MapOpen.mp3',
    MapNormalGauge              : 'sfx/slot/125/125MapNormalGauge.mp3',
    MapSuperbonusGauge          : 'sfx/slot/125/125MapSuperbonusGauge.mp3',
    MapLastSuperbonusGauge      : 'sfx/slot/125/125MapLastSuperbonusGauge.mp3',

    // === Voice ===
    Voice01                     : 'sfx/slot/125/125JVoice01.mp3',
    Voice02                     : 'sfx/slot/125/125JVoice02.mp3',
    Voice03                     : 'sfx/slot/125/125JVoice03.mp3',
    Voice04                     : 'sfx/slot/125/125JVoice04.mp3',
    Voice05                     : 'sfx/slot/125/125JVoice05.mp3'
};
window.g_sndRoyalDiamonds = ResPack.create( 'sndRoyalDiamonds', sndRoyalDiamonds ).concat( g_sfxGlobalCommon );
// ========== Royal Diamonds End ==========

// -- Little Piggy Trio ----------------------------------------------------------------------------------------//
window.sndLittlePiggyTrio = {
    Intro                   :   'sfx/slot/127/127Intro.mp3',
    Bgm                     :   'sfx/slot/127/127Bgm.mp3',
    FsBgm                   :   'sfx/slot/127/127FsBgm.mp3',

    Spin                    :   'sfx/slot/127/127Spin.mp3',
    ReelStop                :   'sfx/slot/127/127ReelStop.mp3',

    MPayCount               :   'sfx/slot/127/127MPayCount.mp3',
    NPayCount01             :   'sfx/slot/127/127NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/127/127NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/127/127NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/127/127NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/127/127NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/127/127NPayCount03End.mp3',

    MajorPopup              :   'sfx/slot/127/127MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/127/127JackpotPopup.mp3',

    SLocking01              :   'sfx/slot/127/127SLocking01.mp3',
    SLocking02              :   'sfx/slot/127/127SLocking02.mp3',
    SLocking03              :   'sfx/slot/127/127SLocking03.mp3',
    SLocking04              :   'sfx/slot/127/127SLocking04.mp3',
    SLocking05              :   'sfx/slot/127/127SLocking05.mp3',

    WLocking01              :   'sfx/slot/127/127WLocking01.mp3',
    WLocking02              :   'sfx/slot/127/127WLocking02.mp3',
    WLocking03              :   'sfx/slot/127/127WLocking03.mp3',
    WLocking04              :   'sfx/slot/127/127WLocking04.mp3',
    WLocking05              :   'sfx/slot/127/127WLocking05.mp3',

    SMatch                  :   'sfx/slot/127/127SMatch.mp3',
    RMatch                  :   'sfx/slot/127/127RMatch.mp3',
    WMatch                  :   'sfx/slot/127/127WMatch.mp3',

    Longspin                :   'sfx/slot/127/127Longspin.mp3',
    TipOver                 :   'sfx/slot/127/127TipOver.mp3',

    PFsIntro                :   'sfx/slot/127/127PFsIntro.mp3',
    SuperPFsIntro           :   'sfx/slot/127/127SuperPFsIntro.mp3',
    SFsIntro                :   'sfx/slot/127/127SFsIntro.mp3',
    Retrigger               :   'sfx/slot/127/127Retrigger.mp3',

    Count                   :   'sfx/slot/127/127Count.mp3',
    CountEnd                :   'sfx/slot/127/127CountEnd.mp3',

    Sticky                  :   'sfx/slot/127/127Sticky.mp3',
    Frame01                 :   'sfx/slot/127/127Frame01.mp3',
    Frame02                 :   'sfx/slot/127/127Frame02.mp3',
    Frame03                 :   'sfx/slot/127/127Frame03.mp3',
    SuperFrame              :   'sfx/slot/127/127SuperFrame.mp3',
    Transform01             :   'sfx/slot/127/127Transform01.mp3',
    Transform02             :   'sfx/slot/127/127Transform02.mp3',

    Wolf                    :   'sfx/slot/127/127Wolf.mp3',
    Wolf02                  :   'sfx/slot/127/127Wolf02.mp3',
    Dp                      :   'sfx/slot/127/127Dp.mp3',
    Dp02                    :   'sfx/slot/127/127Dp02.mp3',
    Jackpot                 :   'sfx/slot/127/127Jackpot.mp3',

    Trail                   :   'sfx/slot/127/127Trail.mp3',

    PFsResult               :   'sfx/slot/127/127PFsResult.mp3',
    SFsResult               :   'sfx/slot/127/127SFsResult.mp3',

    MapClick                :   'sfx/slot/127/127MapClick.mp3',
    MapLastGauge            :   'sfx/slot/127/127MapLastGauge.mp3',
    MapNormalGauge          :   'sfx/slot/127/127MapNormalGauge.mp3',
    MapOpen                 :   'sfx/slot/127/127MapOpen.mp3',
    MapOver                 :   'sfx/slot/127/127MapOver.mp3',
    Unlock                  :   'sfx/slot/127/127Unlock.mp3',
    MapMove                 :   'sfx/slot/127/127MapMove.mp3',
    MapClear                :   'sfx/slot/127/127MapNoti.mp3',

    JVoice01                :   'sfx/slot/127/127JVoice01.mp3',
    JVoice02                :   'sfx/slot/127/127JVoice02.mp3',
    JVoice03                :   'sfx/slot/127/127JVoice03.mp3',
    JVoice04                :   'sfx/slot/127/127JVoice04.mp3'
};
window.g_sndLittlePiggyTrio = ResPack.create( 'sndLittlePiggyTrio', sndLittlePiggyTrio ).concat( g_sfxSlotCommon );
// -- End Little Piggy Trio ------------------------------------------------------------------------------------//

// -- FuFu Diamond ----------------------------------------------------------------------------------------//
window.sndFuFuDiamond = {
    //INTRO
    Intro                   :   'sfx/slot/128/128Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/128/128Bgm.mp3',
    FsBgm                   :   'sfx/slot/128/128FsBgm.mp3',
    RespinBgm               :   'sfx/slot/128/128ReBgm.mp3',
    PickGameBgm             :   'sfx/slot/128/128PickBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/128/128Spin.mp3',
    ReelStop                :   'sfx/slot/128/128ReelStop.mp3',
    MPayCount               :   'sfx/slot/128/128MPayCount.mp3',
    NPayCount01             :   'sfx/slot/128/128NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/128/128NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/128/128NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/128/128NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/128/128NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/128/128NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/128/128MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/128/128JackpotPopup.mp3',

    //NORMAL
    SLocking01              :   'sfx/slot/128/128SLocking01.mp3',
    SLocking02              :   'sfx/slot/128/128SLocking02.mp3',
    SLocking03              :   'sfx/slot/128/128SLocking03.mp3',
    SLocking04              :   'sfx/slot/128/128SLocking04.mp3',
    SLocking05              :   'sfx/slot/128/128SLocking05.mp3',

    DLocking01              :   'sfx/slot/128/128DLocking01.mp3',
    DLocking02              :   'sfx/slot/128/128DLocking02.mp3',
    DLocking03              :   'sfx/slot/128/128DLocking03.mp3',
    DLocking04              :   'sfx/slot/128/128DLocking04.mp3',
    DLocking05              :   'sfx/slot/128/128DLocking05.mp3',
    DLocking06              :   'sfx/slot/128/128DLocking06.mp3',

    CLocking01              :   'sfx/slot/128/128CLocking01.mp3',
    CLocking02              :   'sfx/slot/128/128CLocking02.mp3',
    CLocking03              :   'sfx/slot/128/128CLocking03.mp3',
    CLocking04              :   'sfx/slot/128/128CLocking04.mp3',
    CLocking05              :   'sfx/slot/128/128CLocking05.mp3',

    Trail                   :   'sfx/slot/128/128Wild.mp3',

    CoinFlip01              :   'sfx/slot/128/128CoinFlip01.mp3',
    CoinFlip02              :   'sfx/slot/128/128CoinFlip02.mp3',
    CoinFlip03              :   'sfx/slot/128/128CoinFlip03.mp3',

    SMatch                  :   'sfx/slot/128/128SMatch.mp3',
    CMatch                  :   'sfx/slot/128/128CMatch.mp3',

    PotOpen                 :   'sfx/slot/128/128Pot01.mp3',
    CoinMove                :   'sfx/slot/128/128Pot02.mp3',
    PotUp                   :   'sfx/slot/128/128PotPre.mp3',

    PickGameClick           :   'sfx/slot/128/128Pick.mp3',
    Longspin                :   'sfx/slot/128/128Longspin.mp3',
    BoosterIntro01          :   'sfx/slot/128/128Boost01.mp3',
    BoosterIntro02          :   'sfx/slot/128/128Boost02.mp3',
    BoosterMatch            :   'sfx/slot/128/128Boost03.mp3',
    BoosterChange           :   'sfx/slot/128/128Transition.mp3',

    BetUnLock               :   'sfx/slot/128/128Unlock.mp3',
    ToolTipOver             :   'sfx/slot/128/128TipOver.mp3',

    //FREESPIN
    FsIntro                 :   'sfx/slot/128/128FsIntro.mp3',
    Retrigger               :   'sfx/slot/128/128Retrigger.mp3',
    FsResult                :   'sfx/slot/128/128FsResult.mp3',

    //PICK
    PickGameIntro           :   'sfx/slot/128/128PickIntro.mp3',
    // PickGameOver            :   'sfx/slot/128/128PickOver.mp3',
    // PickGameReset           :   'sfx/slot/128/128PickReset.mp3',
    PickGameBoost           :   'sfx/slot/128/128PickBoost.mp3',
    // PickGameBoostClick      :   'sfx/slot/128/128PickClick01.mp3',
    // PickGameJPClick         :   'sfx/slot/128/128PickClick02.mp3',

    //WHEEL
    WheelBoostMatch         :   'sfx/slot/128/128WheelMatch01.mp3',
    WheelJackpotMatch       :   'sfx/slot/128/128WheelMatch02.mp3',
    WheelSpin               :   'sfx/slot/128/128Wheel01.mp3',
    WheelBoostSpin          :   'sfx/slot/128/128Wheel02.mp3',
    WheelReset              :   'sfx/slot/128/128WheelReset01.mp3',
    WheelIndicator          :   'sfx/slot/128/128WheelReset02.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/128/128Jvoice01.mp3',
    Jackpot1                :   'sfx/slot/128/128Jvoice02.mp3',
    Jackpot2                :   'sfx/slot/128/128Jvoice03.mp3',
    Jackpot3                :   'sfx/slot/128/128Jvoice04.mp3',
    Jackpot4                :   'sfx/slot/128/128Jvoice05.mp3',
    Jackpot5                :   'sfx/slot/128/128Jvoice06.mp3',
    Jackpot6                :   'sfx/slot/128/128Jvoice07.mp3',
    Jackpot7                :   'sfx/slot/128/128Jvoice08.mp3',
    Jackpot8                :   'sfx/slot/128/128Jvoice09.mp3',
    Jackpot9                :   'sfx/slot/128/128Jvoice10.mp3'
};
window.g_sndFuFuDiamond = ResPack.create( 'sndFuFuDiamond', sndFuFuDiamond ).concat( g_sfxSlotCommon );
// -- End FuFu Diamond ------------------------------------------------------------------------------------//

// -- Inferno VS Storm ----------------------------------------------------------------------------------------//
window.sndInfernoVsStormPublic = {
    // BGM
    BattleBgm                       :   'sfx/slot/130/130BattleBgm.mp3',

    // NORMAL
    Btn                             :   'sfx/slot/130/130Btn.mp3',

    // SOCIAL
    SocialIntro                     :   'sfx/slot/130/130SocialIntro.mp3',
    SocialIntro2                     :   'sfx/slot/130/130SocialIntro02.mp3',
    SocialSpin                      :   'sfx/slot/130/130SocialSpin.mp3',
    SocialReelstop                  :   'sfx/slot/130/130SocialReelstop.mp3',
    SocialRedAttack02               :   'sfx/slot/130/130SocialRedAttack02.mp3',
    SocialRedAttack03               :   'sfx/slot/130/130SocialRedAttack03.mp3',
    SocialRedAttack03End            :   'sfx/slot/130/130SocialRedAttack03End.mp3',
    SocialBlueAttack02              :   'sfx/slot/130/130SocialBlueAttack02.mp3',
    SocialBlueAttack03              :   'sfx/slot/130/130SocialBlueAttack03.mp3',
    SocialLokcing01                 :   'sfx/slot/130/130SocialLokcing01.mp3',
    SocialLokcing02                 :   'sfx/slot/130/130SocialLokcing02.mp3',
    SocialLokcing03                 :   'sfx/slot/130/130SocialLokcing03.mp3',
    SocialUpgrade01                 :   'sfx/slot/130/130SocialUpgrade01.mp3',
    SocialUpgrade02                 :   'sfx/slot/130/130SocialUpgrade02.mp3',
    SocialUpgrade03                 :   'sfx/slot/130/130SocialUpgrade03.mp3',
    SocialSum                       :   'sfx/slot/130/130SocialSum.mp3',
    SocialExtra                     :   'sfx/slot/130/130SocialExtra.mp3',
    SocialFinal                     :   'sfx/slot/130/130SocialFinal.mp3',
    SocialBonus                     :   'sfx/slot/130/130SocialBonus.mp3',

    // VOICE
    FightVoice01                    :   'sfx/slot/130/130FightVoice01.mp3',
    FightVoice02                    :   'sfx/slot/130/130FightVoice02.mp3',
    FightVoice03                    :   'sfx/slot/130/130FightVoice03.mp3',
    FightVoice04                    :   'sfx/slot/130/130FightVoice04.mp3',
    UpgradeVoice01                  :   'sfx/slot/130/130UpgradeVoice01.mp3',
    UpgradeVoice02                  :   'sfx/slot/130/130UpgradeVoice02.mp3',
    WinVoice01                      :   'sfx/slot/130/130WinVoice01.mp3',
    WinVoice02                      :   'sfx/slot/130/130WinVoice02.mp3'
};
window.g_sndInfernoVsStormPublic = ResPack.create( 'sndInfernoVsStormPublic', sndInfernoVsStormPublic );

window.sndInfernoVsStormRoom = {
    // Intro
    Intro01                     :   'sfx/slot/130/130Intro01.mp3',

    // BGM
    RoomBgm                     :   'sfx/slot/130/130RoomBgm.mp3',

    // NORMAL
    Footsteps01                 :   'sfx/slot/130/130Footsteps01.mp3',
    Footsteps02                 :   'sfx/slot/130/130Footsteps02.mp3',
    Footsteps03                 :   'sfx/slot/130/130Footsteps03.mp3',
    SocialPick                  :   'sfx/slot/130/130SocialPick.mp3'
};
window.g_sndInfernoVsStormRoom = ResPack.create( 'sndInfernoVsStormRoom', sndInfernoVsStormRoom ).concat( g_sndInfernoVsStormPublic );

window.sndInfernoVsStorm = {
    // Intro
    Intro02                     :   'sfx/slot/130/130Intro02.mp3',

    // BGM
    Bgm                         :   'sfx/slot/130/130Bgm.mp3',
    LinkBgm                     :   'sfx/slot/130/130LinkBgm.mp3',

    // PAY
    Spin                        :   'sfx/slot/130/130Spin.mp3',
    ReelStop                    :   'sfx/slot/130/130ReelStop.mp3',
    MPayCount                   :   'sfx/slot/130/130MPayCount.mp3',
    NPayCount01                 :   'sfx/slot/130/130NPayCount01.mp3',
    NPayCount02                 :   'sfx/slot/130/130NPayCount02.mp3',
    NPayCount03                 :   'sfx/slot/130/130NPayCount03.mp3',
    NPayCount01End              :   'sfx/slot/130/130NPayCount01End.mp3',
    NPayCount02End              :   'sfx/slot/130/130NPayCount02End.mp3',
    NPayCount03End              :   'sfx/slot/130/130NPayCount03End.mp3',
    MajorPopup                  :   'sfx/slot/130/130MajorPopup.mp3',

    // NORMAL
    BLocking01                  :   'sfx/slot/130/130BLocking01.mp3',
    BLocking02                  :   'sfx/slot/130/130BLocking02.mp3',
    BLocking03                  :   'sfx/slot/130/130BLocking03.mp3',
    LLocking01                  :   'sfx/slot/130/130LLocking01.mp3',
    LLocking02                  :   'sfx/slot/130/130LLocking02.mp3',
    LLocking03                  :   'sfx/slot/130/130LLocking03.mp3',
    Longspin                    :   'sfx/slot/130/130Longspin.mp3',
    Count                       :   'sfx/slot/130/130Count.mp3',
    BMatch                      :   'sfx/slot/130/130BMatch.mp3',
    LMatch                      :   'sfx/slot/130/130LMatch.mp3',

    // LINK SPIN
    LinkIntro                   :   'sfx/slot/130/130LinkIntro.mp3',
    DsymLocking                 :   'sfx/slot/130/130DsymLocking.mp3',
    LinkReset                   :   'sfx/slot/130/130LinkReset.mp3',
    LinkReelStop                :   'sfx/slot/130/130LinkReelstop.mp3',
    LinkUpgrade                 :   'sfx/slot/130/130LinkUpgrade.mp3',
    LinkUpgrade02               :   'sfx/slot/130/130LinkUpgrade02.mp3',
    LinkSpin                    :   'sfx/slot/130/130LinkSpin.mp3',
    LinkSum                     :   'sfx/slot/130/130LinkSum.mp3',
    LinkResult                  :   'sfx/slot/130/130LinkResult.mp3',

    SocialTrail                  :   'sfx/slot/130/130SocialTrail.mp3',

    // POPUP
    PopupOpenSummary            :   'sfx/slot/130/130SocialResult.mp3',
};
window.g_sndInfernoVsStorm = ResPack.create( 'sndInfernoVsStorm', sndInfernoVsStorm ).concat( g_sfxSlotCommon, g_sndInfernoVsStormPublic );
// -- End Inferno VS Storm ------------------------------------------------------------------------------------//

//region -- ↓↓↓ ChiliFiesta_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndChiliFiesta = {
    //BGM
    Intro               : 'sfx/slot/129/129Intro.mp3',
    Bgm                 : 'sfx/slot/129/129Bgm.mp3',
    MiniBgm             : 'sfx/slot/129/129MiniBgm.mp3',
    FsBgm               : 'sfx/slot/129/129FsBgm.mp3',
    ReBgm               : 'sfx/slot/129/129ReBgm.mp3',

    // -- Spin
    Spin                : 'sfx/slot/129/129Spin.mp3',
    ReelStop            : 'sfx/slot/129/129ReelStop.mp3',

    // -- Counting
    MPayCount           : 'sfx/slot/129/129MPayCount.mp3',
    NPayCount01         : 'sfx/slot/129/129NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/129/129NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/129/129NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/129/129NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/129/129NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/129/129NPayCount03End.mp3',

    // -- PopUp
    MajorPopup          : 'sfx/slot/129/129MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/129/129JackpotPopup.mp3',

    ChangeBet           : 'sfx/slot/129/129BetChange.mp3',

    //pot
    wildTrail           : 'sfx/slot/129/129PotTrail.mp3',
    PotPre              : 'sfx/slot/129/129PotPre.mp3',
    PotOpen             : 'sfx/slot/129/129PotOpen.mp3',

    //Respin :
    RespinShake         : 'sfx/slot/129/129RespinShake.mp3',
    ExtraJackpotLock    : 'sfx/slot/129/129ExtraJackpotLock.mp3',
    ExtraDirectpayLock  : 'sfx/slot/129/129ExtraDirectpayLock.mp3',
    ExtraMinigameLock   : 'sfx/slot/129/129ExtraMinigameLock.mp3',
    ExtraSymPay         : 'sfx/slot/129/129ExtraSymPay.mp3',


    LongSpin            : 'sfx/slot/129/129Longspin.mp3',
    TipOver             : 'sfx/slot/129/129TipOver.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/129/129MapOver.mp3',
    MiniMapClick            : 'sfx/slot/129/129MapClick.mp3',

    MiniMapUnlock           : 'sfx/slot/129/129Unlock.mp3',
    MapOpen                 : 'sfx/slot/129/129MapOpen.mp3',

    MapNormalGauge          : 'sfx/slot/129/129MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/129/129MapSuperbonusGauge.mp3',
    MapLastSuperbonusGauge  : 'sfx/slot/129/129MapLastSuperbonusGauge.mp3',


    MinigameWild            : 'sfx/slot/129/129MinigameWild.mp3',
    MiniBooster01           : 'sfx/slot/129/129MiniBooster01.mp3',
    MiniBooster02           : 'sfx/slot/129/129MiniBooster02.mp3',
    MiniBooster03		    : 'sfx/slot/129/129MiniBooster03.mp3',
    MiniBooster04		    : 'sfx/slot/129/129MiniBooster04.mp3',

    MiniIntro               : 'sfx/slot/129/129MiniIntro.mp3',

    MiniLocking01        : 'sfx/slot/129/129MiniLocking01.mp3',
    MiniLocking02        : 'sfx/slot/129/129MiniLocking02.mp3',


    MiniTrail            : 'sfx/slot/129/129Minitrail.mp3',  //업그레이드 미니게임에서 트레일 될 시 출력
    MiniNoti            : 'sfx/slot/129/129MiniNoti.mp3',    //업그레이드 미니게임에서 스핀 횟수 추가될 시 출력
    //MiniNoti02          : 'sfx/slot/129/129MiniNoti02.mp3',  //업그레이드 미니게임에서 트레일 되어 패널에 점등 시 출력
    MiniSpin            : 'sfx/slot/129/129MiniSpin.mp3',    //미니게임 스핀 시작시 스핀횟수 강조해주는 연출에 출력
    MiniMatch           : 'sfx/slot/129/129MiniMatch.mp3',

    //링크게임
    DsymLocking01     : 'sfx/slot/129/129DsymLocking01.mp3',  //링크씬 에서 DP 심볼 락킹 시 출력
    DsymLocking02     : 'sfx/slot/129/129DsymLocking02.mp3',  //링크씬 에서 돈다발 심볼 락킹 시 출력
    LinkReset         : 'sfx/slot/129/129LinkReset.mp3',      //링크게임 리스핀 카운트 3회로 초기화시 출력
    LinkReelStop      : 'sfx/slot/129/129LinkReelstop.mp3',   //링크게임 릴스탑 사운드
    LinkUpgrade       : 'sfx/slot/129/129LinkUpgrade.mp3',    //풀스택후 DP 업그레이드 될 시 출력

    LinkSpin          : 'sfx/slot/129/129LinkSpin.mp3',  //링크 씬의 스핀 시작 사운드
    LinkSum           : 'sfx/slot/129/129LinkSum.mp3',       // 토탈윈으로 산입 시 출력

    FsIntro          : 'sfx/slot/129/129FsIntro.mp3',   //프리스핀 진입 팝업 시 출력
    SuperFsIntro     : 'sfx/slot/129/129SuperFsIntro.mp3',   //프리스핀 진입 팝업 시 출력
    FsResult         : 'sfx/slot/129/129FsResult.mp3',  //프리스핀 결과 팝업 시 출력

    JVoice01      : 'sfx/slot/129/129JVoice01.mp3',
    JVoice02      : 'sfx/slot/129/129JVoice02.mp3',
    JVoice03      : 'sfx/slot/129/129JVoice03.mp3',
    JVoice04      : 'sfx/slot/129/129JVoice04.mp3',
    JVoice05      : 'sfx/slot/129/129JVoice05.mp3',
    JVoice06      : 'sfx/slot/129/129JVoice06.mp3',
    JVoice07      : 'sfx/slot/129/129JVoice07.mp3',
    JVoice08      : 'sfx/slot/129/129JVoice08.mp3',
    JVoice09      : 'sfx/slot/129/129JVoice09.mp3',

    MiniVoice01   : 'sfx/slot/129/129MiniVoice01.mp3',
    MiniVoice02   : 'sfx/slot/129/129MiniVoice02.mp3',
    MiniVoice03   : 'sfx/slot/129/129MiniVoice03.mp3',
    MiniVoice04   : 'sfx/slot/129/129MiniVoice04.mp3',

    SymVoice01   : 'sfx/slot/129/129SymVoice01.mp3',
    SymVoice02   : 'sfx/slot/129/129SymVoice02.mp3',
    SymVoice03   : 'sfx/slot/129/129SymVoice03.mp3',

    BonusCount   : 'sfx/slot/129/129Count.mp3'
};
window.g_sndChiliFiesta= ResPack.create( 'sndChiliFiesta', sndChiliFiesta ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ ChiliFiesta_END ↑↑↑ -------------------------------------------------------------------------------------//

// -- PurrfectBingo ----------------------------------------------------------------------------------------//
window.sndPurrfectBingo = {
    Intro                   :   'sfx/slot/131/131Intro.mp3',
    Bgm                     :   'sfx/slot/131/131Bgm.mp3',
    LinkBgm                 :   'sfx/slot/131/131LinkBgm.mp3',

    TipOver                 :   'sfx/slot/131/131TipOver.mp3',

    Spin                    :   'sfx/slot/131/131Spin.mp3',
    ReelStop                :   'sfx/slot/131/131ReelStop.mp3',

    MPayCount               :   'sfx/slot/131/131MPayCount.mp3',
    NPayCount01             :   'sfx/slot/131/131NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/131/131NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/131/131NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/131/131NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/131/131NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/131/131NPayCount03End.mp3',

    MajorPopup              :   'sfx/slot/131/131MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/131/131JackpotPopup.mp3',
    LinkPopup               :   'sfx/slot/131/131LinkIntro.mp3',
    BingoPopup              :   'sfx/slot/131/131BingoPopup.mp3',
    ResultPopup             :   'sfx/slot/131/131LinkResult.mp3',

    Jvoice01             :   'sfx/slot/131/131JVoice01.mp3',
    Jvoice02             :   'sfx/slot/131/131JVoice02.mp3',
    Jvoice03             :   'sfx/slot/131/131JVoice03.mp3',
    Jvoice04             :   'sfx/slot/131/131JVoice04.mp3',
    Jvoice05             :   'sfx/slot/131/131JVoice05.mp3',

    // Wheel
    WheelSpin               :   'sfx/slot/131/131WheelSpin.mp3',
    WheelSpinEnd            :   'sfx/slot/131/131WheelSpinEnd.mp3',

    TrailBingo              :   'sfx/slot/131/131trail.mp3',
    TrailWin                :   'sfx/slot/131/131BingoSum.mp3',
    TrailRetrigger          :   'sfx/slot/131/131trail02.mp3',

    WinpannelOpen          :   'sfx/slot/131/131Winpannel.mp3',
    WinpannelClose         :   'sfx/slot/131/131WinpannelClose.mp3',

    BingoMatch          :   'sfx/slot/131/131BingoMatch.mp3',
    BingoFrame01          :   'sfx/slot/131/131BingoFrame01.mp3',
    BingoFrame02          :   'sfx/slot/131/131BingoFrame02.mp3',
    BingoReset01          :   'sfx/slot/131/131BingoReset01.mp3',
    BingoReset02          :   'sfx/slot/131/131BingoReset02.mp3',

    Canon          :   'sfx/slot/131/131LinkUpgrade01.mp3',
    Bomb          :   'sfx/slot/131/131LinkUpgrade02.mp3',
    ValueUp          :   'sfx/slot/131/131LinkUpgrade03.mp3',

    SLocking01          :   'sfx/slot/131/131SLocking01.mp3',
    SLocking02          :   'sfx/slot/131/131SLocking02.mp3',
    SLocking03          :   'sfx/slot/131/131SLocking03.mp3',
    SLocking04          :   'sfx/slot/131/131SLocking04.mp3',
    SLocking05          :   'sfx/slot/131/131SLocking05.mp3',
    JLocking01          :   'sfx/slot/131/131JLocking01.mp3',
    JLocking02          :   'sfx/slot/131/131JLocking02.mp3',
    JLocking03          :   'sfx/slot/131/131JLocking03.mp3',
    JLocking04          :   'sfx/slot/131/131JLocking04.mp3',
    JLocking05          :   'sfx/slot/131/131JLocking05.mp3',
    TsymLocking          :   'sfx/slot/131/131TsymLocking.mp3',
    LsymLocking          :   'sfx/slot/131/131LsymLocking.mp3',
};
window.g_sndPurrfectBingo = ResPack.create( 'sndPurrfectBingo', sndPurrfectBingo ).concat( g_sfxSlotCommon );
// -- PurrfectBingo ------------------------------------------------------------------------------------//

// -- Fa Cai Pot Link ------------------------------------------------------------------------------------------------//
window.sndFaCaiPotLink = {
    //INTRO
    Intro                   :   'sfx/slot/134/134Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/134/134Bgm.mp3',
    FsBgm                   :   'sfx/slot/134/134FsBgm.mp3',
    LinkBgm                 :   'sfx/slot/134/134LinkBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/134/134Spin.mp3',
    ReelStop                :   'sfx/slot/134/134ReelStop.mp3',
    MPayCount               :   'sfx/slot/134/134MPayCount.mp3',
    NPayCount01             :   'sfx/slot/134/134NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/134/134NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/134/134NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/134/134NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/134/134NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/134/134NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/134/134MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/134/134JackpotPopup.mp3',

    //NORMAL
    SLocking01              :   'sfx/slot/134/134SLocking01.mp3',
    SLocking02              :   'sfx/slot/134/134SLocking02.mp3',
    SLocking03              :   'sfx/slot/134/134SLocking03.mp3',
    SLocking04              :   'sfx/slot/134/134SLocking04.mp3',
    SLocking05              :   'sfx/slot/134/134SLocking05.mp3',
    WildNudge               :   'sfx/slot/134/134Wnudge.mp3',
    Trail                   :   'sfx/slot/134/134Trail.mp3',
    PotUp                   :   'sfx/slot/134/134PotPre.mp3',
    PotOpen                 :   'sfx/slot/134/134PotOpen.mp3',
    PotGauge                :   'sfx/slot/134/134PotGuage.mp3',
    PotChange                :   'sfx/slot/134/134PotChange.mp3',
    ToolTipOver             :   'sfx/slot/134/134TipOver.mp3',
    BetUnLock               :   'sfx/slot/134/134Unlock.mp3',
    Longspin                :   'sfx/slot/134/134Longspin.mp3',
    SMatch                  :   'sfx/slot/134/134SMatch.mp3',

    //LINK
    LinkIntro               :   'sfx/slot/134/134LinkIntro.mp3',
    SuperLinkIntro          :   'sfx/slot/134/134SuperLinkIntro.mp3',
    LinkLocking01           :   'sfx/slot/134/134LsymLocking01.mp3',
    LinkLocking02           :   'sfx/slot/134/134LsymLocking02.mp3',
    LinkLocking03           :   'sfx/slot/134/134LsymLocking03.mp3',
    LinkGoldReel            :   'sfx/slot/134/134LinkGold.mp3',
    LinkSetLabel01          :   'sfx/slot/134/134Upgrade01.mp3',
    LinkSetLabel02          :   'sfx/slot/134/134Upgrade02.mp3',
    LinkSetLabel03          :   'sfx/slot/134/134Upgrade03.mp3',
    LinkGroup               :   'sfx/slot/134/134Frame.mp3',
    LinkGroupLock           :   'sfx/slot/134/134FrameEnd.mp3',
    LinkSpin                :   'sfx/slot/134/134LinkSpin.mp3',
    LinkStop                :   'sfx/slot/134/134LinkReelstop.mp3',
    LinkResetCount          :   'sfx/slot/134/134LinkReset.mp3',
    LinkResultTrail         :   'sfx/slot/134/134LinkSum.mp3',
    LinkResultTrail01       :   'sfx/slot/134/134LinkSum02.mp3',
    LinkResult              :   'sfx/slot/134/134LinkResult.mp3',

    //FREESPIN
    FreeSpinIntro           :   'sfx/slot/134/134FsIntro.mp3',
    FreeSpinRetrigger       :   'sfx/slot/134/134Retrigger.mp3',
    CollectLocking          :   'sfx/slot/134/134FsymLocking.mp3',
    DirectTrail             :   'sfx/slot/134/134Trail02.mp3',
    CollectTrail            :   'sfx/slot/134/134Trail03.mp3',
    FreeSpinResult          :   'sfx/slot/134/134FsResult.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/134/134Jvoice05.mp3',
    Jackpot1                :   'sfx/slot/134/134Jvoice04.mp3',
    Jackpot2                :   'sfx/slot/134/134Jvoice03.mp3',
    Jackpot3                :   'sfx/slot/134/134Jvoice02.mp3',
    Jackpot4                :   'sfx/slot/134/134Jvoice01.mp3',

    //MAP
    MapOver                 :   'sfx/slot/134/134MapOver.mp3',
    MapIntro                :   'sfx/slot/134/134MapIntro.mp3',
    MapMatch                :   'sfx/slot/134/134MapMatch.mp3',
};
window.g_sndFaCaiPotLink = ResPack.create( 'sndFaCaiPotLink', sndFaCaiPotLink ).concat( g_sfxSlotCommon );
// -- End Fa Cai Pot Link ---------------------------------------------------------------------------------------------//

//region -- ↓↓↓ GeniesWishes_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndGeniesWishes = {
    // INTRO
    Intro                       : 'sfx/slot/133/133Intro.mp3',

    // BGM
    Bgm                         : 'sfx/slot/133/133Bgm.mp3',
    FsBgm                       : 'sfx/slot/133/133FsBgm.mp3',

    // PAY
    Spin                        : 'sfx/slot/133/133Spin.mp3',
    ReelStop                    : 'sfx/slot/133/133ReelStop.mp3',
    MPayCount                   : 'sfx/slot/133/133MPayCount.mp3',
    NPayCount01                 : 'sfx/slot/133/133NPayCount01.mp3',
    NPayCount01End              : 'sfx/slot/133/133NPayCount01End.mp3',
    NPayCount02                 : 'sfx/slot/133/133NPayCount02.mp3',
    NPayCount02End              : 'sfx/slot/133/133NPayCount02End.mp3',
    NPayCount03                 : 'sfx/slot/133/133NPayCount03.mp3',
    NPayCount03End              : 'sfx/slot/133/133NPayCount03End.mp3',
    MajorPopup                  : 'sfx/slot/133/133MajorPopup.mp3',
    JackpotPopup                : 'sfx/slot/133/133JackpotPopup.mp3',

    // NORMAL
    ChangeBet                   : 'sfx/slot/133/133BetChange.mp3',
    PotPre                      : 'sfx/slot/133/133PotPre.mp3',
    PotOpen                     : 'sfx/slot/133/133PotOpen.mp3',
    Trail01                     : 'sfx/slot/133/133Trail01.mp3',
    Trail02                     : 'sfx/slot/133/133Trail02.mp3',
    Slocking01                  : 'sfx/slot/133/133Slocking01.mp3',
    Slocking02                  : 'sfx/slot/133/133Slocking02.mp3',
    Slocking03                  : 'sfx/slot/133/133Slocking03.mp3',
    Slocking04                  : 'sfx/slot/133/133Slocking04.mp3',
    Slocking05                  : 'sfx/slot/133/133Slocking05.mp3',

    Slocking01v2                : 'sfx/slot/133/133Slocking01v2.mp3',
    Slocking02v2                : 'sfx/slot/133/133Slocking02v2.mp3',
    Slocking03v2                : 'sfx/slot/133/133Slocking03v2.mp3',
    Slocking04v2                : 'sfx/slot/133/133Slocking04v2.mp3',
    Slocking05v2                : 'sfx/slot/133/133Slocking05v2.mp3',

    JLocking                    : 'sfx/slot/133/133JLocking.mp3',
    JLocking02                  : 'sfx/slot/133/133JLocking02.mp3',

    DLocking                    : 'sfx/slot/133/133DLocking.mp3',
    DLocking02                  : 'sfx/slot/133/133DLocking02.mp3',

    Dmatch                      : 'sfx/slot/133/133Dmatch.mp3',
    DFeatuer01                  : 'sfx/slot/133/133DFeatuer01.mp3',
    DFeatuer02                  : 'sfx/slot/133/133DFeatuer02.mp3',
    DFeatuer03                  : 'sfx/slot/133/133DFeatuer03.mp3',
    Frame                       : 'sfx/slot/133/133Frame.mp3',
    Frame02                     : 'sfx/slot/133/133Frame02.mp3',
    JMatch                      : 'sfx/slot/133/133JMatch.mp3',
    Longspin                    : 'sfx/slot/133/133Longspin.mp3',
    TipOver                     : 'sfx/slot/133/133TipOver.mp3',

    // MAP
    MapOver                     : 'sfx/slot/133/133MapOver.mp3',
    MapClick                    : 'sfx/slot/133/133MapClick.mp3',
    MapOpen                     : 'sfx/slot/133/133MapOpen.mp3',
    MapNormalGauge		        : 'sfx/slot/133/133MapNormalGauge.mp3',
    MapSuperbonusGauge	        : 'sfx/slot/133/133MapSuperbonusGauge.mp3',
    MapLastSuperbonusGauge      : 'sfx/slot/133/133MapLastSuperbonusGauge.mp3',

    // FREE SPIN
    FsIntro                     : 'sfx/slot/133/133FsIntro.mp3',
    SuperFsIntro                : 'sfx/slot/133/133SuperFsIntro.mp3',
    FsIntro02                   : 'sfx/slot/133/133FsIntro02.mp3',
    TsymLocking                 : 'sfx/slot/133/133TsymLocking.mp3',
    FsTrail                     : 'sfx/slot/133/133FsTrail.mp3',
    FsUnlock                    : 'sfx/slot/133/133FsUnlock.mp3',
    FsResult                    : 'sfx/slot/133/133FsResult.mp3',

    // VOICE
    Voice01                     : 'sfx/slot/133/133Voice01.mp3',
    Voice02                     : 'sfx/slot/133/133Voice02.mp3',
    Voice03                     : 'sfx/slot/133/133Voice03.mp3',
    Voice04                     : 'sfx/slot/133/133Voice04.mp3'
};
window.g_sndGeniesWishes= ResPack.create( 'sndGeniesWishes', sndGeniesWishes ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ GeniesWishes_END ↑↑↑ -------------------------------------------------------------------------------------//

//region -- ↓↓↓ ShootTheRiches_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndShootTheRiches = {

    //BGM
    Intro               : 'sfx/slot/135/135Intro.mp3',
    Bgm                 : 'sfx/slot/135/135Bgm.mp3',

    LinkIntro           : 'sfx/slot/135/135LinkIntro.mp3',
    SuperLinkIntro      : 'sfx/slot/135/135SuperLinkIntro.mp3',
    LinkBgm             : 'sfx/slot/135/135LinkBgm.mp3',

    // -- Spin
    Spin                : 'sfx/slot/135/135Spin.mp3',
    ReelStop            : 'sfx/slot/135/135ReelStop.mp3',

    // -- linkSpin
    LinkSpin            : 'sfx/slot/135/135LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/135/135LinkReelstop.mp3',


    // -- Counting
    MPayCount           : 'sfx/slot/135/135MPayCount.mp3',
    NPayCount01         : 'sfx/slot/135/135NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/135/135NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/135/135NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/135/135NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/135/135NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/135/135NPayCount03End.mp3',

    // -- PopUp
    MajorPopup          : 'sfx/slot/135/135MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/135/135JackpotPopup.mp3',

    LinkResultPopup     : 'sfx/slot/135/135LinkResult.mp3',
    //ChangeBet           : 'sfx/slot/129/129BetChange.mp3',  //D

    //pot
    PotPre              : 'sfx/slot/135/135PotPre.mp3',
    PotOpen             : 'sfx/slot/135/135PotOpen.mp3',

    PotTrail            : 'sfx/slot/135/135Trail.mp3',

    //Locking
    Slocking01          : 'sfx/slot/135/135SLocking01.mp3',
    Slocking02          : 'sfx/slot/135/135SLocking02.mp3',
    Slocking03          : 'sfx/slot/135/135SLocking03.mp3',
    Slocking04          : 'sfx/slot/135/135SLocking04.mp3',
    Slocking05          : 'sfx/slot/135/135SLocking05.mp3',

    JLocking            : 'sfx/slot/135/135JLocking.mp3',
    CLocking            : 'sfx/slot/135/135CLocking.mp3',

    LongSpin            : 'sfx/slot/135/135Longspin.mp3',
    LinkLongSpin        : 'sfx/slot/135/135LinkLongSpin.mp3',

    TipOver             : 'sfx/slot/135/135TipOver.mp3',

    MiniMapOver             : 'sfx/slot/135/135MapOver.mp3',
    MiniMapClick            : 'sfx/slot/135/135MapClick.mp3',
    MapOpen                 : 'sfx/slot/135/135MapOpen.mp3',

    MiniMapUnlock           : 'sfx/slot/135/135Unlock.mp3',                      //D
    MapNormalGauge          : 'sfx/slot/135/135MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/135/135MapSuperbonusGauge.mp3',
    // MapLastSuperbonusGauge  : 'sfx/slot/135/135MapLastSuperbonusGauge.mp3',  //D
    MapMove                 : 'sfx/slot/135/135MapMove.mp3',                    //D
    MapClear                : 'sfx/slot/135/135MapNoti.mp3',                    //D  sndLittlePiggyTrio

    DLocking                : 'sfx/slot/135/135DLocking.mp3',
    ULocking                : 'sfx/slot/135/135ULocking.mp3',
    BLocking                : 'sfx/slot/135/135BLocking.mp3',
    TLocking                : 'sfx/slot/135/135TLocking.mp3',
    ELocking                : 'sfx/slot/135/135ELocking.mp3',

    //Link Trail
    LinkTrail              : 'sfx/slot/135/135LinkTrail.mp3',
    LinkTrail02            : 'sfx/slot/135/135LinkTrail02.mp3',
    LinkSum                : 'sfx/slot/135/135LinkSum.mp3',
    LinkUpgrade01          : 'sfx/slot/135/135LinkUpgrade01.mp3',  //화살 쏘는 연출 시 출력
    LinkUpgrade02          : 'sfx/slot/135/135LinkUpgrade02.mp3',  //화살이 박혀 업그레이드 되는 연출 시 출력
    LinkUpgrade03          : 'sfx/slot/135/135LinkUpgrade03.mp3',  //폭탄 심볼 터지는 연출 시 출력
    LinkUpgrade04          : 'sfx/slot/135/135LinkUpgrade04.mp3',  //(잠금 릴에 화살이 박혀 언락 되는 연출 시 출력)

    CMatch                 : 'sfx/slot/135/135CMatch.mp3',

    JVoice01               : 'sfx/slot/135/135JVoice01.mp3',
    JVoice02               : 'sfx/slot/135/135JVoice02.mp3',
    JVoice03               : 'sfx/slot/135/135JVoice03.mp3',
    JVoice04               : 'sfx/slot/135/135JVoice04.mp3',
};
window.g_sndShootTheRiches= ResPack.create( 'sndShootTheRiches', sndShootTheRiches ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ ShootTheRiches_END ↑↑↑ -------------------------------------------------------------------------------------//

// -- MerlinsMagicBox ----------------------------------------------------------------------------------------//
window.sndMerlinsMagicBox = {
    Intro                   :   'sfx/slot/136/136Intro.mp3',
    Bgm                     :   'sfx/slot/136/136Bgm.mp3',
    FsBgm                   :   'sfx/slot/136/136FsBgm.mp3',
    PickBgm                 :   'sfx/slot/136/136PickBgm.mp3',

    Spin                    :   'sfx/slot/136/136Spin.mp3',
    ReelStop                :   'sfx/slot/136/136ReelStop.mp3',

    BoxLockingReel01                :   'sfx/slot/136/136BLocking01.mp3',
    BoxLockingReel02                :   'sfx/slot/136/136BLocking02.mp3',
    BoxLockingReel03                :   'sfx/slot/136/136BLocking03.mp3',
    BoxLockingReel04                :   'sfx/slot/136/136BLocking04.mp3',
    BoxLockingReel05                :   'sfx/slot/136/136BLocking05.mp3',

    BoxOpen                :   'sfx/slot/136/136BoxOpen.mp3',
    BoxTrailDP                :   'sfx/slot/136/136FsTrail01.mp3',
    BoxTrailJP                :   'sfx/slot/136/136FsTrail02.mp3',
    BoxTrailRetrigger                :   'sfx/slot/136/136FsTrail03.mp3',

    WildExpand                :   'sfx/slot/136/136FsNudge.mp3',

    Multiply                :   'sfx/slot/136/136Multiply.mp3',

    MPayCount               :   'sfx/slot/136/136MPayCount.mp3',
    NPayCount01             :   'sfx/slot/136/136NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/136/136NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/136/136NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/136/136NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/136/136NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/136/136NPayCount03End.mp3',

    MajorPopup              :   'sfx/slot/136/136MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/136/136JackpotPopup.mp3',
    FreeGameResultPopup     :   'sfx/slot/136/136FsResult.mp3',
    MapResultPopup          :   'sfx/slot/136/136PickResult.mp3',
    MapResultEnd          :   'sfx/slot/136/136PickResultEnd.mp3',
    FsIntroPopup          :   'sfx/slot/136/136FsIntro.mp3',
    // FsIntroBox01Popup          :   'sfx/slot/136/136FsTransition01.mp3',
    // FsIntroBox02Popup          :   'sfx/slot/136/136FsTransition02.mp3',
    // FsIntroBox03Popup          :   'sfx/slot/136/136FsTransition03.mp3',
    PickGameIntro          :   'sfx/slot/136/136PickIntro.mp3',

    PickOver          :   'sfx/slot/136/136PickOver.mp3',
    Pick01          :   'sfx/slot/136/136Pick01.mp3',
    Pick04          :   'sfx/slot/136/136Pick04.mp3',
    PickSum          :   'sfx/slot/136/136PickSum02.mp3',
    PickTrail          :   'sfx/slot/136/136Picktrail.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/136/136MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/136/136MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/136/136MapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/136/136MapSuperbonusGauge.mp3', // 안씀


    MapOver  : 'sfx/slot/136/136MapOver.mp3',
    MapClick  : 'sfx/slot/136/136MapClick.mp3',

    PotOpen01  : 'sfx/slot/136/136PotOpen01.mp3',
    PotOpen02  : 'sfx/slot/136/136PotOpen02.mp3',

    PotUp  : 'sfx/slot/136/136PotPre.mp3',

    Unlock  : 'sfx/slot/136/136Unlock.mp3',
    Unlock02  : 'sfx/slot/136/136Unlock02.mp3',
    TipOver  : 'sfx/slot/136/136TipOver.mp3',

    PotTrail  : 'sfx/slot/136/136Trail01.mp3',
    MelinsTrail  : 'sfx/slot/136/136Trail02.mp3',

    JVoice01  : 'sfx/slot/136/136JVoice01.mp3',
    JVoice02  : 'sfx/slot/136/136JVoice02.mp3',
    JVoice03  : 'sfx/slot/136/136JVoice03.mp3',
    JVoice05  : 'sfx/slot/136/136JVoice05.mp3',

    FreeSpinIntroVocie01  : 'sfx/slot/136/136BVocie02.mp3',
    FreeSpinIntroVocie02  : 'sfx/slot/136/136BVocie01.mp3',
    FreeSpinIntroVocie03  : 'sfx/slot/136/136BVocie03.mp3',
    FreeSpinIntroVocie04  : 'sfx/slot/136/136BVocie04.mp3',
    FreeSpinIntroVocie05  : 'sfx/slot/136/136BVocie06.mp3',
    FreeSpinIntroVocie06  : 'sfx/slot/136/136BVocie05.mp3',
    FreeSpinIntroVocie07  : 'sfx/slot/136/136BVocie07.mp3',

    PVoice01  : 'sfx/slot/136/136PVoice01.mp3',
    PVoice02  : 'sfx/slot/136/136PVoice02.mp3',
    PVoice03  : 'sfx/slot/136/136PVoice03.mp3',

    Retirg  : 'sfx/slot/136/136Retirg.mp3',
    Retirg02  : 'sfx/slot/136/136Retirg02.mp3'

};
window.g_sndMerlinsMagicBox = ResPack.create( 'sndMerlinsMagicBox', sndMerlinsMagicBox ).concat( g_sfxSlotCommon );
// -- MerlinsMagicBox ------------------------------------------------------------------------------------//



// -- Jungles Treasure ------------------------------------------------------------------------------------------------//
window.sndJunglesTreasure = {
    //INTRO
    Intro                   :   'sfx/slot/137/137Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/137/137Bgm.mp3',
    FsBgm                   :   'sfx/slot/137/137FsBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/137/137Spin.mp3',
    ReelStop                :   'sfx/slot/137/137ReelStop.mp3',
    MPayCount               :   'sfx/slot/137/137MPayCount.mp3',
    NPayCount01             :   'sfx/slot/137/137NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/137/137NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/137/137NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/137/137NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/137/137NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/137/137NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/137/137MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/137/137JackpotPopup.mp3',

    //NORMAL
    SLocking01              :   'sfx/slot/137/137SLocking01.mp3',
    SLocking02              :   'sfx/slot/137/137SLocking02.mp3',
    SLocking03              :   'sfx/slot/137/137SLocking03.mp3',
    SLocking04              :   'sfx/slot/137/137SLocking04.mp3',
    SLocking05              :   'sfx/slot/137/137SLocking05.mp3',

    JLocking                :   'sfx/slot/137/137JLocking.mp3',

    WLocking01              :   'sfx/slot/137/137Wlocking01.mp3',
    WLocking02              :   'sfx/slot/137/137Wlocking02.mp3',
    WLocking03              :   'sfx/slot/137/137Wlocking03.mp3',
    WLocking04              :   'sfx/slot/137/137Wlocking04.mp3',
    WLocking05              :   'sfx/slot/137/137Wlocking05.mp3',

    SMatch                  :   'sfx/slot/137/137Smatch.mp3',
    JMatch                  :   'sfx/slot/137/137JMatch.mp3',
    JMatch02                :   'sfx/slot/137/137JMatch02.mp3',

    Longspin                :   'sfx/slot/137/137Longspin.mp3',

    TLocking01              :   'sfx/slot/137/137TLocking01.mp3',
    TLocking02              :   'sfx/slot/137/137TLocking02.mp3',
    TLocking03              :   'sfx/slot/137/137TLocking03.mp3',
    TLocking04              :   'sfx/slot/137/137TLocking04.mp3',
    TLocking05              :   'sfx/slot/137/137TLocking05.mp3',

    TriggerOpenDP           :   'sfx/slot/137/137BoxOpen01.mp3',
    TriggerOpenJP           :   'sfx/slot/137/137BoxOpen02.mp3',

    TMatch                  :   'sfx/slot/137/137Bmatch.mp3',
    ToolTipOver             :   'sfx/slot/137/137TipOver.mp3',

    BetUnLock               :   'sfx/slot/137/137Unlock.mp3',

    //FREESPIN
    FreeSpinIntro           :   'sfx/slot/137/137FsIntro.mp3',
    FreeSpinRetrigger       :   'sfx/slot/137/137FsRetrigger.mp3',
    FreeSpinResult          :   'sfx/slot/137/137FsResult.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/137/137JVoice01.mp3',
    Jackpot1                :   'sfx/slot/137/137JVoice02.mp3',
    Jackpot2                :   'sfx/slot/137/137JVoice03.mp3',
    Jackpot3                :   'sfx/slot/137/137JVoice04.mp3',
    Jackpot4                :   'sfx/slot/137/137JVoice05.mp3',
    Jackpot5                :   'sfx/slot/137/137JVoice06.mp3'
};
window.g_sndJunglesTreasure = ResPack.create( 'sndJunglesTreasure', sndJunglesTreasure ).concat( g_sfxSlotCommon );
// -- End Jungles Treasure ---------------------------------------------------------------------------------------------//

//region -- ↓↓↓ JackpotHammerLink_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndJackpotHammerLink = {

    //BGM
    Intro               : 'sfx/slot/138/138Intro.mp3',                  //v
    Bgm                 : 'sfx/slot/138/138Bgm.mp3',                    //v

    LinkIntro           : 'sfx/slot/138/138LinkIntro.mp3',              //V
    LinkBgm             : 'sfx/slot/138/138LinkBgm.mp3',                //v
    WheelBgm            : 'sfx/slot/138/138WheelBgm.mp3',               //v

    FreeSpinBgm         : 'sfx/slot/138/138FsBgm.mp3',                //v

    // -- Spin
    Spin                : 'sfx/slot/138/138Spin.mp3',                   //v
    LastSpin            : 'sfx/slot/138/138LastSpin.mp3',
    ReelStop            : 'sfx/slot/138/138ReelStop.mp3',               //v

    // -- Counting
    MPayCount           : 'sfx/slot/138/138MPayCount.mp3',              //v
    NPayCount01         : 'sfx/slot/138/138NPayCount01.mp3',            //v
    NPayCount01End      : 'sfx/slot/138/138NPayCount01End.mp3',         //v
    NPayCount02         : 'sfx/slot/138/138NPayCount02.mp3',            //v
    NPayCount02End      : 'sfx/slot/138/138NPayCount02End.mp3',         //v
    NPayCount03         : 'sfx/slot/138/138NPayCount03.mp3',            //v
    NPayCount03End      : 'sfx/slot/138/138NPayCount03End.mp3',         //v

    // -- PopUp
    MajorPopup          : 'sfx/slot/138/138MajorPopup.mp3',             //v
    JackpotPopup        : 'sfx/slot/138/138JackpotPopup.mp3',           //v


    HLocking01          : 'sfx/slot/138/138HLocking01.mp3',             //V

    //Locking
    Slocking01          : 'sfx/slot/138/138Slocking01.mp3',             //v
    Slocking02          : 'sfx/slot/138/138Slocking02.mp3',             //v
    Slocking03          : 'sfx/slot/138/138Slocking03.mp3',             //v
    Slocking04          : 'sfx/slot/138/138Slocking04.mp3',             //v
    Slocking05          : 'sfx/slot/138/138Slocking05.mp3',             //v

    Hammer01            : 'sfx/slot/138/138Hammer01.mp3',
    Hammer02            : 'sfx/slot/138/138Hammer02.mp3',
    Hammer03            : 'sfx/slot/138/138Hammer03.mp3',
    Hammer04            : 'sfx/slot/138/138Hammer04.mp3',
    Hammer05            : 'sfx/slot/138/138Hammer05.mp3',

    SMatch              : 'sfx/slot/138/138SMatch.mp3',                 //v
    LMatch              : 'sfx/slot/138/138LMatch.mp3',                 //v
    Surprise            : 'sfx/slot/138/138Surprise.mp3',

    FrameSpin           : 'sfx/slot/138/138FrameSpin.mp3',              //v
    FrameReelStop       : 'sfx/slot/138/138FrameReelStop.mp3',          //v
    LongSpin            : 'sfx/slot/138/138Longspin.mp3',               //v
    Unlock              : 'sfx/slot/138/138Unlock.mp3',                 //v
    TipOver             : 'sfx/slot/138/138TipOver.mp3',                //v

    WheelOpen           : 'sfx/slot/138/138WheelOpen.mp3',              //v
    WheelIntro01        : 'sfx/slot/138/138WheelIntro01.mp3',           //v

    WheelSpin01         : 'sfx/slot/138/138WheelSpin01.mp3',            //v
    WheelSpin02         : 'sfx/slot/138/138WheelSpin02.mp3',            //v

    WheelReelStop       : 'sfx/slot/138/138WheelReelStop.mp3',          //v

    WheelMatch01        : 'sfx/slot/138/138WheelMatch01.mp3',           //v
    WheelMatch02        : 'sfx/slot/138/138WheelMatch02.mp3',           //v

    LsymLocking01      : 'sfx/slot/138/138LsymLocking01.mp3',           //v
    LsymLocking02      : 'sfx/slot/138/138LsymLocking02.mp3',           //v

    // -- linkSpin
    LinkSpin            : 'sfx/slot/138/138LinkSpin.mp3',               //v
    LinkReelStop        : 'sfx/slot/138/138LinkReelstop.mp3',           //v
    LinkCount           : 'sfx/slot/138/138LinkCount.mp3',               //v
    LinkReset           : 'sfx/slot/138/138LinkReset.mp3',               //v
    LinkLongSpin        : 'sfx/slot/138/138LinkLongSpin.mp3',            //v
    LinkSum             : 'sfx/slot/138/138LinkSum.mp3',                 //v
    LinkResultPopup     : 'sfx/slot/138/138LinkResult.mp3',              //v

    FsResultPopup       : 'sfx/slot/138/138FsResult.mp3',

    Fvoice01            : 'sfx/slot/138/138Fvoice01.mp3',              //v
    Fvoice02            : 'sfx/slot/138/138Fvoice02.mp3',              //v
    Fvoice03            : 'sfx/slot/138/138Fvoice03.mp3',              //v
    Fvoice04            : 'sfx/slot/138/138Fvoice04.mp3',              //v

    JVoice01           : 'sfx/slot/138/138JVoice01.mp3',              //v
    JVoice02           : 'sfx/slot/138/138JVoice02.mp3',              //v
    JVoice03           : 'sfx/slot/138/138JVoice03.mp3',              //v
    JVoice04           : 'sfx/slot/138/138JVoice04.mp3',              //v

    FsVoice01           : 'sfx/slot/138/138FsVoice01.mp3',               //노멀
    FsVoice02           : 'sfx/slot/138/138FsVoice02.mp3',               //슈퍼
    FsVoice03           : 'sfx/slot/138/138FsVoice03.mp3',               // 에픽

    Svoice              : 'sfx/slot/138/138Svoice.mp3',
    WheelClose          : 'sfx/slot/138/138WheelClose.mp3'
};
window.g_sndJackpotHammerLink = ResPack.create( 'sndJackpotHammerLink', sndJackpotHammerLink ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ JackpotHammerLink_END ↑↑↑ -------------------------------------------------------------------------------------//

// region -- Monkey's Might------------------------------------------------------------------------------------------------//
window.sndMonkeysMight = {
    //INTRO
    Intro                   :   'sfx/slot/139/139Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/139/139Bgm.mp3',
    WheelBgm                :   'sfx/slot/139/139WheelBgm.mp3',
    FsBgm                   :   'sfx/slot/139/139FsBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/139/139Spin.mp3',
    ReelStop                :   'sfx/slot/139/139ReelStop.mp3',
    MPayCount               :   'sfx/slot/139/139MPayCount.mp3',
    NPayCount01             :   'sfx/slot/139/139NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/139/139NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/139/139NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/139/139NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/139/139NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/139/139NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/139/139MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/139/139JackpotPopup.mp3',

    //NORMAL
    BetChange               :   'sfx/slot/139/139BetChange.mp3',
    Slocking01              :   'sfx/slot/139/139Slocking01.mp3',
    Slocking02              :   'sfx/slot/139/139Slocking02.mp3',
    Slocking03              :   'sfx/slot/139/139Slocking03.mp3',
    Slocking04              :   'sfx/slot/139/139Slocking04.mp3',
    Slocking05              :   'sfx/slot/139/139Slocking05.mp3',
    BLocking                :   'sfx/slot/139/139BLocking.mp3',

    Olocking01              :   'sfx/slot/139/139Olocking01.mp3',
    Olocking02              :   'sfx/slot/139/139Olocking02.mp3',
    Olocking03              :   'sfx/slot/139/139Olocking03.mp3',
    Olocking04              :   'sfx/slot/139/139Olocking04.mp3',
    Olocking05              :   'sfx/slot/139/139Olocking05.mp3',
    BMatch                  :   'sfx/slot/139/139BMatch.mp3',
    BMatch02                :   'sfx/slot/139/139BMatch02.mp3',
    Wmatch                  :   'sfx/slot/139/139Wmatch.mp3',
    Fallout                  :   'sfx/slot/139/139Fallout.mp3',
    Trail                   :   'sfx/slot/139/139Trail.mp3',
    Wloicking               :   'sfx/slot/139/139Wloicking.mp3',
    Longspin                :   'sfx/slot/139/139Longspin.mp3',
    Smatch                  :   'sfx/slot/139/139Smatch.mp3',
    TipOver                 :   'sfx/slot/139/139TipOver.mp3',
    WinPannel               :   'sfx/slot/139/139WinPannel.mp3',
    Unlock                  :   'sfx/slot/139/139Unlock.mp3',

    //FREESPIN
    FsIntro                 :   'sfx/slot/139/139FsIntro.mp3',
    FsRetrigger             :   'sfx/slot/139/139FsRetrigger.mp3',
    Bonus01                 :   'sfx/slot/139/139Bonus01.mp3',
    Bonus02                 :   'sfx/slot/139/139Bonus02.mp3',
    FsResult                :   'sfx/slot/139/139FsResult.mp3',

    // HWEEL
    WheelOpen               :   'sfx/slot/139/139WheelOpen.mp3',
    WheelSpin               :   'sfx/slot/139/139WheelSpin.mp3',
    WheelMatch01            :   'sfx/slot/139/139WheelMatch01.mp3',
    WheelMatch02            :   'sfx/slot/139/139WheelMatch02.mp3',
    WheelCount01            :   'sfx/slot/139/139WheelCount01.mp3',
    WheelCount02            :   'sfx/slot/139/139WheelCount02.mp3',
    WheelCount03            :   'sfx/slot/139/139WheelCount03.mp3',
    WheelCount04            :   'sfx/slot/139/139WheelCount04.mp3',
    WheelSum                :   'sfx/slot/139/139WheelSum.mp3',
    WheelCountEnd           :   'sfx/slot/139/139WheelCountEnd.mp3',

    //VOICE
    Bvoice01                :   'sfx/slot/139/139Bvoice01.mp3',
    Bvoice02                :   'sfx/slot/139/139Bvoice02.mp3',
    Bvoice03                :   'sfx/slot/139/139Bvoice03.mp3',
    Bvoice04                :   'sfx/slot/139/139Bvoice04.mp3',
    JVoice01                :   'sfx/slot/139/139JVoice01.mp3',
    JVoice02                :   'sfx/slot/139/139JVoice02.mp3',
    JVoice03                :   'sfx/slot/139/139JVoice03.mp3',
    JVoice04                :   'sfx/slot/139/139JVoice04.mp3'
};
window.g_sndMonkeysMight = ResPack.create( 'sndMonkeysMight', sndMonkeysMight ).concat( g_sfxSlotCommon );
// endregion

// -- Mayan Double Jackpot -------------------------------------------------------------------------------------------//
window.sndMayanDoubleJackpot = {
    //INTRO
    Intro                   :   'sfx/slot/143/143Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/143/143Bgm.mp3',
    WheelBgm                :   'sfx/slot/143/143WheelBgm.mp3',
    FsBgm                   :   'sfx/slot/143/143FsBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/143/143Spin.mp3',
    ReelStop                :   'sfx/slot/143/143ReelStop.mp3',
    MPayCount               :   'sfx/slot/143/143MPayCount.mp3',
    NPayCount01             :   'sfx/slot/143/143NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/143/143NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/143/143NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/143/143NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/143/143NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/143/143NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/143/143MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/143/143JackpotPopup.mp3',

    //NORMAL
    SLocking01              :   'sfx/slot/143/143SLocking01.mp3',
    SLocking02              :   'sfx/slot/143/143SLocking02.mp3',
    SLocking03              :   'sfx/slot/143/143SLocking03.mp3',
    SLocking04              :   'sfx/slot/143/143SLocking04.mp3',
    SLocking05              :   'sfx/slot/143/143SLocking05.mp3',
    SLocking06              :   'sfx/slot/143/143SLocking06.mp3',

    HLocking01              :   'sfx/slot/143/143Hlocking01.mp3',
    HLocking02              :   'sfx/slot/143/143Hlocking02.mp3',
    HLocking03              :   'sfx/slot/143/143Hlocking03.mp3',

    ILocking01              :   'sfx/slot/143/143Ilocking01.mp3',
    ILocking02              :   'sfx/slot/143/143Ilocking02.mp3',
    ILocking03              :   'sfx/slot/143/143Ilocking03.mp3',

    BLocking01              :   'sfx/slot/143/143Blocking01.mp3',
    BLocking02              :   'sfx/slot/143/143Blocking02.mp3',
    BLocking03              :   'sfx/slot/143/143Blocking03.mp3',
    BLocking04              :   'sfx/slot/143/143Blocking04.mp3',
    BLocking05              :   'sfx/slot/143/143Blocking05.mp3',
    BLocking06              :   'sfx/slot/143/143Blocking06.mp3',

    TrailLeft               :   'sfx/slot/143/143Trail01.mp3',
    TrailRight              :   'sfx/slot/143/143Trail02.mp3',
    TrailDouble             :   'sfx/slot/143/143Trail03.mp3',
    PotUp                   :   'sfx/slot/143/143PotPre.mp3',

    BoostChange             : 'sfx/slot/143/143Boost02.mp3',

    PotOpenLeft             :   'sfx/slot/143/143Pot01.mp3',
    PotOpenRight            :   'sfx/slot/143/143Pot02.mp3',

    Longspin                :   'sfx/slot/143/143Longspin.mp3',

    SMatch                  :   'sfx/slot/143/143Smatch.mp3',
    HMatch                  :   'sfx/slot/143/143Hmatch.mp3',
    IMatch                  :   'sfx/slot/143/143Imatch.mp3',
    WinPannel               :   'sfx/slot/143/143Winpannel.mp3',
    WinPannelUpdate         :   'sfx/slot/143/143Winpannel02.mp3',
    WinPannelClose          :   'sfx/slot/143/143Winpannel03.mp3',
    Boost                   :   'sfx/slot/143/143Boost.mp3',
    ToolTipOver             :   'sfx/slot/143/143TipOver.mp3',
    BetUnLock               :   'sfx/slot/143/143Unlock.mp3',

    //FREESPIN
    FreeSpinIntro           :   'sfx/slot/143/143FsIntro.mp3',
    FreeSpinRetrigger       :   'sfx/slot/143/143FsRetrigger.mp3',
    FreeSpinResult          :   'sfx/slot/143/143FsResult.mp3',

    WheelOpen               :   'sfx/slot/143/143WheelOpen.mp3',
    WheelSpin               :   'sfx/slot/143/143WheelSpin.mp3',
    WheelJackpot            :   'sfx/slot/143/143WheelMatch01.mp3',
    WheelBoostMatch         :   'sfx/slot/143/143WheelMatch02.mp3',
    WheelBoostChange        :   'sfx/slot/143/143WheelBoost.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/143/143JVoice01.mp3',
    Jackpot1                :   'sfx/slot/143/143JVoice02.mp3',
    Jackpot2                :   'sfx/slot/143/143JVoice03.mp3',
    Jackpot3                :   'sfx/slot/143/143JVoice04.mp3',
    Jackpot4                :   'sfx/slot/143/143JVoice05.mp3',
    Jackpot5                :   'sfx/slot/143/143JVoice06.mp3'
};
window.g_sndMayanDoubleJackpot = ResPack.create( 'sndMayanDoubleJackpot', sndMayanDoubleJackpot ).concat( g_sfxSlotCommon );
// -- End Mayan Double Jackpot ---------------------------------------------------------------------------------------//


//-- ↑↑↑ GoldenEggDrop BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndGoldenEggDrop = {
    Intro                   : 'sfx/slot/144/144Intro.mp3',

    BGM                     : 'sfx/slot/144/144Bgm.mp3',
    BGM_FreeSpin            : 'sfx/slot/144/144FsBgm.mp3',
    BGM_LinkGame            : 'sfx/slot/144/144LinkBgm.mp3',

    Spin                    : 'sfx/slot/144/144Spin.mp3',
    ReelStop                : 'sfx/slot/144/144ReelStop.mp3',
    LongSpin                : 'sfx/slot/144/144Longspin.mp3',
    LinkSpin                : 'sfx/slot/144/144LinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/144/144LinkReelstop.mp3',

    SLock01                 : 'sfx/slot/144/144SLocking01.mp3',
    SLock02                 : 'sfx/slot/144/144SLocking02.mp3',
    SLock03                 : 'sfx/slot/144/144SLocking03.mp3',
    SLock04                 : 'sfx/slot/144/144SLocking04.mp3',
    SLock05                 : 'sfx/slot/144/144SLocking05.mp3',

    LockGoldJ               : 'sfx/slot/144/144LsymLocking03.mp3',
    LockGoldD               : 'sfx/slot/144/144LsymLocking02.mp3',
    LockWhite               : 'sfx/slot/144/144LsymLocking01.mp3',

    // pot
    PotBonus                : 'sfx/slot/144/144PotOpen.mp3',
    PotUp                   : 'sfx/slot/144/144PotPre.mp3',
    PotTrail                : 'sfx/slot/144/144Trail.mp3',

    ScatterMatch            : 'sfx/slot/144/144Smatch.mp3',

    LinkGameBlock           : 'sfx/slot/144/144Block.mp3',
    LinkGameBreak           : 'sfx/slot/144/144LinkUnlock.mp3',
    LinkGameDrop            : 'sfx/slot/144/144LinkDrop.mp3',
    // LinkGameUpgrade         : 'sfx/slot/144/ccUpgrade.mp3',
    LinkGameTrailAdd        : 'sfx/slot/144/144LinkReset.mp3',
    LinkGameTrailWin        : 'sfx/slot/144/144LinkSum.mp3',
    LinkGameClear           : 'sfx/slot/144/144LinkCrack.mp3',
    LinkGameLineFrame       : 'sfx/slot/144/144LinkFrame.mp3',
    // LinkGameClear01         : 'sfx/slot/144/ccVoiceClear01.mp3',
    // LinkGameClear02         : 'sfx/slot/144/ccVoiceClear02.mp3',
    // LinkGameClear03         : 'sfx/slot/144/ccVoiceClear03.mp3',
    // LinkGameClear04         : 'sfx/slot/144/ccVoiceClear04.mp3',
    LinkGameWAxe            : 'sfx/slot/144/144LinkUtil01.mp3',
    LinkGameWUpgrade        : 'sfx/slot/144/144LinkUtil02.mp3',
    LinkGameWAddSpin        : 'sfx/slot/144/144LinkUtil03.mp3',

    // winpannel
    WinpannelOpen           :   'sfx/slot/144/144WinpannelOpen.mp3',
    WinpannelClose          :   'sfx/slot/144/144WinpannelClose.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/144/144MapOver.mp3',
    MiniMapClick            : 'sfx/slot/144/144MapClick.mp3',
    MiniMapUnlock           : 'sfx/slot/144/144Unlock.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/144/144MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/144/144MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/144/144MapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/144/144MapSuperbonusGauge.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/144/144MPayCount.mp3',
    NPayCount01             : 'sfx/slot/144/144NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/144/144NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/144/144NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/144/144NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/144/144NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/144/144NPayCount03End.mp3',

    //popup
    JackpotPopup            : 'sfx/slot/144/144JackpotPopup.mp3',
    GrandJackpot            : 'sfx/slot/144/144JVoice04.mp3',
    MegaJackpot             : 'sfx/slot/144/144JVoice03.mp3',
    MajorJackpot            : 'sfx/slot/144/144JVoice02.mp3',
    MinorJackpot            : 'sfx/slot/144/144JVoice01.mp3',
    MajorPopup              : 'sfx/slot/144/144MajorPopup.mp3',
    FreeSpinIntroPopup      : 'sfx/slot/144/144FsIntro.mp3',
    LinkGameIntroPopup      : 'sfx/slot/144/144LinkIntro.mp3',
    SuperLinkGameIntroPopup : 'sfx/slot/144/144SuperLinkIntro.mp3',
    FreeSpinResultPopup     : 'sfx/slot/144/144FsResult.mp3',
    LinkGameResultPopup     : 'sfx/slot/144/144LinkResult.mp3'

};
window.g_sndGoldenEggDrop = ResPack.create( 'sndGoldenEggDrop', sndGoldenEggDrop ).concat( g_sfxSlotCommon );
//-- ↑↑↑ GoldenEggDrop END ↑↑↑ -----------

//region -- ↓↓↓ 151_DraculasDen_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndDraculasDen = {

    //BGM
    Intro           : 'sfx/slot/151/151Intro.mp3',          //V
    Bgm             : 'sfx/slot/151/151Bgm.mp3',            //V

    LinkBgm         : 'sfx/slot/151/151LinkBgm.mp3',        //V
    LinkIntro       : 'sfx/slot/151/151LinkIntro.mp3',      //V

    // -- Spin
    Spin            : 'sfx/slot/151/151Spin.mp3',
    ReelStop        : 'sfx/slot/151/151ReelStop.mp3',      //V

    // -- Counting
    MPayCount       : 'sfx/slot/151/151MPayCount.mp3',      //V
    NPayCount01     : 'sfx/slot/151/151NPayCount01.mp3',    //V
    NPayCount01End  : 'sfx/slot/151/151NPayCount01End.mp3', //V
    NPayCount02     : 'sfx/slot/151/151NPayCount02.mp3',    //V
    NPayCount02End  : 'sfx/slot/151/151NPayCount02End.mp3', //V
    NPayCount03     : 'sfx/slot/151/151NPayCount03.mp3',    //V
    NPayCount03End  : 'sfx/slot/151/151NPayCount03End.mp3', //V

    // -- PopUp
    MajorPopup      : 'sfx/slot/151/151MajorPopup.mp3',     //V
    JackpotPopup    : 'sfx/slot/151/151JackpotPopup.mp3',   //V
    JVoice01        : 'sfx/slot/151/151JVoice01.mp3',       //V
    JVoice02        : 'sfx/slot/151/151JVoice02.mp3',       //V
    JVoice03        : 'sfx/slot/151/151JVoice03.mp3',       //V
    JVoice04        : 'sfx/slot/151/151JVoice04.mp3',       //V

    //IntroSpin
    LinkIntroWheel  : 'sfx/slot/151/151WheelIntro.mp3',
    LinkIntroSpin   : 'sfx/slot/151/151LinkIntroSpin.mp3',      //V
    LinkIntroSpinEnd: 'sfx/slot/151/151LinkIntroSpinEnd.mp3',   //V

    // -- linkSpin
    LinkSpin        : 'sfx/slot/151/151LinkSpin.mp3',           //V
    LinkReelStop    : 'sfx/slot/151/151LinkReelstop.mp3',       //V
    LinkCount       : 'sfx/slot/151/151LinkCount.mp3',          //V
    LinkReset       : 'sfx/slot/151/151LinkReset.mp3',          //V
    LinkResultPopup : 'sfx/slot/151/151LinkResult.mp3',         //V
    LinkSum         : 'sfx/slot/151/151LinkSum.mp3',            //V
    LinkSum02       : 'sfx/slot/151/151LinkSum02.mp3',

    LinkUnlock      : 'sfx/slot/151/151LinkUnlock.mp3',

    LinkWheelSpin   : 'sfx/slot/151/151LinkWheelSpin.mp3',          //V
    LinkWheelSpinEnd: 'sfx/slot/151/151LinkWheelSpinEnd.mp3',       //V

    LsymLocking     : 'sfx/slot/151/151LsymLocking.mp3',   //v

    PotOpen         : 'sfx/slot/151/151PotOpen.mp3',   //V

    SLocking01      : 'sfx/slot/151/151SLocking01.mp3', //V
    SLocking02      : 'sfx/slot/151/151SLocking02.mp3', //V
    SLocking03      : 'sfx/slot/151/151SLocking03.mp3', //V
    SLocking04      : 'sfx/slot/151/151SLocking04.mp3', //V
    SLocking05      : 'sfx/slot/151/151SLocking05.mp3', //V
    SMatch          : 'sfx/slot/151/151SMatch.mp3',     //V

    TipOver         : 'sfx/slot/151/151TipOver.mp3',    //V
    Unlock          : 'sfx/slot/151/151Unlock.mp3',     //V

    BetChange       : 'sfx/slot/151/151BetChange.mp3',
    Dlocking        : 'sfx/slot/151/151Dlocking.mp3',

    PVoice01        : 'sfx/slot/151/151PVoice01.mp3',
    PVoice02        : 'sfx/slot/151/151PVoice02.mp3',
    PVoice03        : 'sfx/slot/151/151PVoice03.mp3',
    PVoice04        : 'sfx/slot/151/151PVoice04.mp3',

    Linktrail       : 'sfx/slot/151/151Linktrail.mp3',
    Count           : 'sfx/slot/151/151Count.mp3',
    PotCount        : 'sfx/slot/151/151PotCount.mp3'

};
window.g_sndDraculasDen = ResPack.create( 'sndDraculasDen', sndDraculasDen ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ 151_DraculasDen_END ↑↑↑ -------------------------------------------------------------------------------------//

//region -- ↓↓↓ 152_WitchsDen_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndWitchsDen = {
    //BGM

    Intro           :'sfx/slot/152/152Intro.mp3',      //v
    Bgm             :'sfx/slot/152/152Bgm.mp3',        //v
    FsBgm           :'sfx/slot/152/152FsBgm.mp3',      //v
    FsIntro         :'sfx/slot/152/152FsIntro.mp3',    //v

    // -- Spin
    Spin            :'sfx/slot/152/152Spin.mp3',            //v
    ReelStop        :'sfx/slot/152/152ReelStop.mp3',        //v

    // -- Counting
    MPayCount       :'sfx/slot/152/152MPayCount.mp3',       //v
    NPayCount01     :'sfx/slot/152/152NPayCount01.mp3',     //v
    NPayCount01End  :'sfx/slot/152/152NPayCount01End.mp3',  //v
    NPayCount02     :'sfx/slot/152/152NPayCount02.mp3',     //v
    NPayCount02End  :'sfx/slot/152/152NPayCount02End.mp3',  //v
    NPayCount03     :'sfx/slot/152/152NPayCount03.mp3',     //v
    NPayCount03End  :'sfx/slot/152/152NPayCount03End.mp3',  //v

    // -- PopUp
    JackpotPopup    :'sfx/slot/152/152JackpotPopup.mp3',    //v
    JVoice01        :'sfx/slot/152/152JVoice01.mp3',        //v
    JVoice02        :'sfx/slot/152/152JVoice02.mp3',        //v
    JVoice03        :'sfx/slot/152/152JVoice03.mp3',        //v
    JVoice04        :'sfx/slot/152/152JVoice04.mp3',        //v
    MajorPopup      :'sfx/slot/152/152MajorPopup.mp3',      //v

    FsIntroWheel    :'sfx/slot/152/152WheelIntro.mp3',
    FsIntroSpin     :'sfx/slot/152/152FsIntroSpin.mp3',     //v
    FsIntroSpinEnd  :'sfx/slot/152/152FsIntroSpinEnd.mp3',  //v

    FsJLocking01    :'sfx/slot/152/152FsJLocking01.mp3',
    FsJLocking02    :'sfx/slot/152/152FsJLocking02.mp3',

    FsLongspin      :'sfx/slot/152/152FsLongspin.mp3',      //v
    FsResultPopup   :'sfx/slot/152/152FsResult.mp3',        //V
    FsRetrigger     :'sfx/slot/152/152FsRetrigger.mp3',     //v
    FsTrail         :'sfx/slot/152/152FsTrail.mp3',         //v


    PotOpen         :'sfx/slot/152/152PotOpen.mp3',         //v
    SLocking01      :'sfx/slot/152/152SLocking01.mp3',
    SLocking02      :'sfx/slot/152/152SLocking02.mp3',
    SLocking03      :'sfx/slot/152/152SLocking03.mp3',
    SLocking04      :'sfx/slot/152/152SLocking04.mp3',
    SLocking05      :'sfx/slot/152/152SLocking05.mp3',
    SMatch          :'sfx/slot/152/152SMatch.mp3',          //v
    TipOver         :'sfx/slot/152/152TipOver.mp3',         //v
    Unlock          :'sfx/slot/152/152Unlock.mp3',          //v

    BetChange       : 'sfx/slot/152/152BetChange.mp3',
    Dlocking        : 'sfx/slot/152/152Dlocking.mp3',

    PVoice01        : 'sfx/slot/152/152PVoice01.mp3',
    PVoice02        : 'sfx/slot/152/152PVoice02.mp3',
    PVoice03        : 'sfx/slot/152/152PVoice03.mp3',
    PVoice04        : 'sfx/slot/152/152PVoice04.mp3',

    Count           : 'sfx/slot/152/152Count.mp3',
    PotCount        : 'sfx/slot/152/152PotCount.mp3'
};
window.g_sndWitchsDen = ResPack.create( 'sndWitchsDen', sndWitchsDen ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ 152_WitchsDen_END ↑↑↑ -------------------------------------------------------------------------------------//

// region -- Aegis Of The Goddess ------------------------------------------------------------------------------------------------//
window.sndAegisOfTheGoddess = {
    //INTRO
    Intro                   :   'sfx/slot/146/146Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/146/146Bgm.mp3',
    LinkBgm                 :   'sfx/slot/146/146LinkBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/146/146Spin.mp3',
    ReelStop                :   'sfx/slot/146/146ReelStop.mp3',
    MPayCount               :   'sfx/slot/146/146MPayCount.mp3',
    NPayCount01             :   'sfx/slot/146/146NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/146/146NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/146/146NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/146/146NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/146/146NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/146/146NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/146/146MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/146/146JackpotPopup.mp3',

    //NORMAL
    BLocking01              :   'sfx/slot/146/146BLocking01.mp3',
    BLocking02              :   'sfx/slot/146/146BLocking02.mp3',
    BLocking03              :   'sfx/slot/146/146BLocking03.mp3',
    BLocking04              :   'sfx/slot/146/146BLocking04.mp3',
    BLocking05              :   'sfx/slot/146/146BLocking05.mp3',

    RLocking01              :   'sfx/slot/146/146RLocking01.mp3',
    RLocking02              :   'sfx/slot/146/146RLocking02.mp3',
    RLocking03              :   'sfx/slot/146/146RLocking03.mp3',
    RLocking04              :   'sfx/slot/146/146RLocking04.mp3',
    RLocking05              :   'sfx/slot/146/146RLocking05.mp3',

    CLocking                :   'sfx/slot/146/146CLocking.mp3',
    SMatch                  :   'sfx/slot/146/146SMatch.mp3',
    CMatch                  :   'sfx/slot/146/146CMatch.mp3',
    Open                    :   'sfx/slot/146/146Open.mp3',
    Close                   :   'sfx/slot/146/146Close.mp3',
    Move                    :   'sfx/slot/146/146Move.mp3',
    RMatch                  :   'sfx/slot/146/146RMatch.mp3',
    Count                   :   'sfx/slot/146/146Count.mp3',
    LongSpin                :   'sfx/slot/146/146LongSpin.mp3',
    Unlock                  :   'sfx/slot/146/146Unlock.mp3',
    TipOver                 :   'sfx/slot/146/146TipOver.mp3',

    // LINK
    LinkIntro               :   'sfx/slot/146/146LinkIntro.mp3',
    SuperLinkIntro          :   'sfx/slot/146/146SuperLinkIntro.mp3',

    LsymLocking01           :   'sfx/slot/146/146LsymLocking01.mp3',
    LsymLocking02           :   'sfx/slot/146/146LsymLocking02.mp3',
    LsymLocking03           :   'sfx/slot/146/146LsymLocking03.mp3',
    LsymLocking04           :   'sfx/slot/146/146LsymLocking04.mp3',

    LinkSpin                :   'sfx/slot/146/146LinkSpin.mp3',
    LinkReset               :   'sfx/slot/146/146LinkReset.mp3',
    LinkReelstop            :   'sfx/slot/146/146LinkReelstop.mp3',

    LinkTrail01             :   'sfx/slot/146/146LinkTrail01.mp3',
    LinkTrail02             :   'sfx/slot/146/146LinkTrail02.mp3',

    LinkUnlock              :   'sfx/slot/146/146LinkUnlock.mp3',
    LinkUnlock02            :   'sfx/slot/146/146LinkUnlock02.mp3',
    LinkUp                  :   'sfx/slot/146/146LinkUp.mp3',
    LinkShield              :   'sfx/slot/146/146LinkShield.mp3',
    LinkKey                 :   'sfx/slot/146/146LinkKey.mp3',
    LinkLongSpin            :   'sfx/slot/146/146LinkLongSpin.mp3',
    LinkSum                 :   'sfx/slot/146/146LinkSum.mp3',
    Linksum02               :   'sfx/slot/146/146Linksum02.mp3',
    LinkResult              :   'sfx/slot/146/146LinkResult.mp3',

    // MAP
    MapOver                   : 'sfx/slot/146/146MapOver.mp3',
    MapClick                  : 'sfx/slot/146/146MapClick.mp3',
    MapOpen                   : 'sfx/slot/146/146MapOpen.mp3',
    MapNormalGauge            : 'sfx/slot/146/146MapNormalGauge.mp3',
    MapSuperbonusGauge        : 'sfx/slot/146/146MapSuperbonusGauge.mp3'

    //VOICE
    // JVoice01                :   'sfx/slot/146/146JVoice01.mp3'
};
window.g_sndAegisOfTheGoddess = ResPack.create( 'sndAegisOfTheGoddess', sndAegisOfTheGoddess ).concat( g_sfxSlotCommon );
// endregion

// -- Dragon Heart -------------------------------------------------------------------------------------------//
window.sndDragonHeart = {
    //INTRO
    Intro                   :   'sfx/slot/149/149Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/149/149Bgm.mp3',
    FsBgm                   :   'sfx/slot/149/149LinkBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/149/149Spin.mp3',
    ReelStop                :   'sfx/slot/149/149ReelStop.mp3',
    MPayCount               :   'sfx/slot/149/149MPayCount.mp3',
    NPayCount01             :   'sfx/slot/149/149NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/149/149NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/149/149NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/149/149NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/149/149NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/149/149NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/149/149MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/149/149JackpotPopup.mp3',

    //NORMAL
    DLocking01              :   'sfx/slot/149/149DLocking01.mp3',
    DLocking02              :   'sfx/slot/149/149DLocking02.mp3',
    DLocking03              :   'sfx/slot/149/149DLocking03.mp3',
    DLocking04              :   'sfx/slot/149/149DLocking04.mp3',
    DLocking05              :   'sfx/slot/149/149DLocking05.mp3',

    HLocking01              :   'sfx/slot/149/149HLocking01.mp3',
    HLocking02              :   'sfx/slot/149/149HLocking02.mp3',
    HLocking03              :   'sfx/slot/149/149HLocking03.mp3',
    HLocking04              :   'sfx/slot/149/149HLocking04.mp3',
    HLocking05              :   'sfx/slot/149/149HLocking05.mp3',

    SMatch                  :   'sfx/slot/149/149SMatch.mp3',
    Longspin                :   'sfx/slot/149/149LongSpin.mp3',
    Mystery                 :   'sfx/slot/149/149Mystery.mp3',
    Trail                   :   'sfx/slot/149/149Trail.mp3',
    BetUnLock               :   'sfx/slot/149/149Unlock.mp3',

    //FREE SPIN
    FSIntro                 :   'sfx/slot/149/149LinkIntro.mp3',
    SuperFSIntro            :   'sfx/slot/149/149SuperLinkIntro.mp3',
    Retrigger               :   'sfx/slot/149/149Retrigger.mp3',
    CLocking                :   'sfx/slot/149/149LsymLocking01.mp3',
    TLocking                :   'sfx/slot/149/149LsymLocking02.mp3',
    FSSpin                  :   'sfx/slot/149/149LinkSpin.mp3',
    CollectTrail            :   'sfx/slot/149/149LinkTrail.mp3',
    OpenReelIntro           :   'sfx/slot/149/149LinkUnlock.mp3',
    OpenReel                :   'sfx/slot/149/149LinkUnlock02.mp3',
    TMatch                  :   'sfx/slot/149/149LinkKey.mp3',
    LinkSum                 :   'sfx/slot/149/149LinkSum.mp3', //용도 불명
    FreeSpinResult          :   'sfx/slot/149/149LinkResult.mp3',

    //MINI MAP
    MapOver                 :   'sfx/slot/149/149MapOver.mp3',
    MapClick                :   'sfx/slot/149/149MapClick.mp3',
    MapOpen                 :   'sfx/slot/149/149MapOpen.mp3',
    MapNormalGauge          :   'sfx/slot/149/149MapNormalGauge.mp3',
    MapSuperbonusGauge      :   'sfx/slot/149/149MapSuperbonusGauge.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/149/149JVoice01.mp3',
    Jackpot1                :   'sfx/slot/149/149JVoice02.mp3',
    Jackpot2                :   'sfx/slot/149/149JVoice03.mp3',
    Jackpot3                :   'sfx/slot/149/149JVoice04.mp3',
    Jackpot4                :   'sfx/slot/149/149JVoice05.mp3',

    ReelOpenVoice           :   'sfx/slot/149/149Voice01.mp3'
};
window.g_sndDragonHeart = ResPack.create( 'sndDragonHeart', sndDragonHeart ).concat( g_sfxSlotCommon );
// -- End Dragon Heart ---------------------------------------------------------------------------------------//

//region -- ↓↓↓ 150_SandsOfFortune_BEGIN ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSandsOfFortune = {
    //BGM

    Intro               : 'sfx/slot/150/150Intro.mp3',
    Bgm                 : 'sfx/slot/150/150Bgm.mp3',
    FsBgm               : 'sfx/slot/150/150FsBgm.mp3',
    FsIntro             : 'sfx/slot/150/150FsIntro.mp3',
    FsRetrigger          : 'sfx/slot/150/150FsRetrigger.mp3',

    LinkIntro           : 'sfx/slot/150/150LinkIntro.mp3',
    SuperLinkIntro      : 'sfx/slot/150/150SuperLinkIntro.mp3',
    LinkBgm             : 'sfx/slot/150/150LinkBgm.mp3',

    // -- Spin
    Spin                :'sfx/slot/150/150Spin.mp3',
    ReelStop            :'sfx/slot/150/150ReelStop.mp3',

    // -- linkSpin
    LinkSpin            : 'sfx/slot/150/150LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/150/150LinkReelstop.mp3',


    // -- Counting
    MPayCount           : 'sfx/slot/150/150MPayCount.mp3',
    NPayCount01         : 'sfx/slot/150/150NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/150/150NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/150/150NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/150/150NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/150/150NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/150/150NPayCount03End.mp3',

    // -- PopUp
    JackpotPopup        : 'sfx/slot/150/150JackpotPopup.mp3',
    JVoice01            : 'sfx/slot/150/150Voice01.mp3',
    JVoice02            : 'sfx/slot/150/150Voice02.mp3',
    JVoice03            : 'sfx/slot/150/150Voice03.mp3',
    JVoice04            : 'sfx/slot/150/150Voice04.mp3',
    JVoice05            : 'sfx/slot/150/150Voice05.mp3',
    //JVoice06            : 'sfx/slot/150/150JVoice06.mp3',

    // JVoice07            : 'sfx/slot/150/150Voice07.mp3',
    // JVoice08            : 'sfx/slot/150/150Voice08.mp3',
    // JVoice09            : 'sfx/slot/150/150Voice09.mp3',
    // JVoice10            : 'sfx/slot/150/150Voice10.mp3',
    // JVoice11            : 'sfx/slot/150/150Voice11.mp3',

    BonusVoice           : 'sfx/slot/150/150BonusVoice.mp3',

    MajorPopup          : 'sfx/slot/150/150MajorPopup.mp3',
    LinkResult          : 'sfx/slot/150/150LinkResult.mp3',
    FsResult            : 'sfx/slot/150/150FsResult.mp3',


    // -- Locking
    SLocking01          : 'sfx/slot/150/150SLocking01.mp3',
    SLocking02          : 'sfx/slot/150/150SLocking02.mp3',
    SLocking03          : 'sfx/slot/150/150SLocking03.mp3',
    SLocking04          : 'sfx/slot/150/150SLocking04.mp3',
    SLocking05          : 'sfx/slot/150/150SLocking05.mp3',

    QLocking01          : 'sfx/slot/150/150QLocking01.mp3',
    QLocking02          : 'sfx/slot/150/150QLocking02.mp3',
    QLocking03          : 'sfx/slot/150/150QLocking03.mp3',
    QLocking04          : 'sfx/slot/150/150QLocking04.mp3',
    QLocking05          : 'sfx/slot/150/150QLocking05.mp3',

    // -- match
    SMatch              : 'sfx/slot/150/150SMatch.mp3',

    // -- Pot
    Trail               : 'sfx/slot/150/150Trail.mp3',
    PotPre              : 'sfx/slot/150/150PotPre.mp3',
    PotOpen             : 'sfx/slot/150/150PotOpen.mp3',
    PotClear            : 'sfx/slot/150/150PotClear.mp3',

    // -- longSpin
    LongSpin            : 'sfx/slot/150/150Longspin.mp3',
    LinkLongSpin        : 'sfx/slot/150/150LinkLongSpin.mp3',

    // -- Tooltip
    Unlock          :'sfx/slot/150/150Unlock.mp3',
    TipOver         :'sfx/slot/150/150TipOver.mp3',

    // -- link lock
    DLocking            : 'sfx/slot/150/150DLocking.mp3',
    ULocking            : 'sfx/slot/150/150ULocking.mp3',
    BLocking            : 'sfx/slot/150/150BLocking.mp3',
    TLocking            : 'sfx/slot/150/150TLocking.mp3',
    NLocking            : 'sfx/slot/150/150NLocking.mp3',
    SunLocking          : 'sfx/slot/150/150SunLocking.mp3',

    LinkMatch01         : 'sfx/slot/150/150LinkMatch01.mp3', //(눈 심볼 락킹 후 매치(강조) 되는 연출 시 )
    LinkMatch02         : 'sfx/slot/150/150LinkMatch02.mp3', //(태양 심볼 락킹 후 매치(강조) 되는 연출 시 )

    // -- link Effet
    Sun                 : 'sfx/slot/150/150Sun.mp3', //태양 심볼 터지는 연출 시 출력
    Sun02               : 'sfx/slot/150/150Sun02.mp3', //(태양 연출 이후 릴에 심볼들이 터지는 연출 시)

    // -- link Trail
    LinkTrail01         :'sfx/slot/150/150LinkTrail01.mp3', //넥스트 윈 패널로 트레일 시 출력
    LinkTrail02         :'sfx/slot/150/150LinkTrail02.mp3', //넥스트 윈 패널에서 넥스트윈 심볼로 트레일 시 출력
    LinkTrail03         :'sfx/slot/150/150LinkTrail03.mp3',

    //LinkUpgrade01       :'sfx/slot/150/150LinkUpgrade01.mp3',
    LinkUpgrade02       : 'sfx/slot/150/150LinkUpgrade02.mp3',   //DP 심볼에만 적용 합니다
    LinkUpgrade03       : 'sfx/slot/150/150LinkUpgrade03.mp3',   //Dp 심볼 이외 모든 심볼에 적용합니다
    LinkUpgrade04       : 'sfx/slot/150/150LinkUpgrade04.mp3',

    // --winPanel
    Winpan              :'sfx/slot/150/150Winpan.mp3',

    // --Fs
    Wlocking            :'sfx/slot/150/150Wlocking.mp3',
    Nudge               :'sfx/slot/150/150Nudge.mp3',

    //-- miniMap
    MapOver          :'sfx/slot/150/150MapOver.mp3',
    MapOpen          :'sfx/slot/150/150MapOpen.mp3',
    MapNormalGauge   :'sfx/slot/150/150MapNormalGauge.mp3',
    MapClear         :'sfx/slot/150/150MapClear.mp3',

    //--Sum
    WinSum           :'sfx/slot/150/150WinSum.mp3',
};
window.g_sndSandsOfFortune = ResPack.create( 'sndSandsOfFortune', sndSandsOfFortune ).concat( g_sfxSlotCommon );
//endregion-- ↑↑↑ 150_SandsOfFortune_END ↑↑↑ -------------------------------------------------------------------------------------//

//region -- ↓↓↓ MonsterParadeBoost ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndMonsterParadeBoost = {
    // INTRO
    Intro               :'sfx/slot/148/148Intro.mp3',

    // BGM
    BGM                 : 'sfx/slot/148/148Bgm.mp3',
    MiniBgm             : 'sfx/slot/148/148MiniBgm.mp3',
    RsBgm               : 'sfx/slot/148/148RsBgm.mp3',
    ReBgm               : 'sfx/slot/148/148ReBgm.mp3',

    // PAY
    Spin                : 'sfx/slot/148/148Spin.mp3',
    ReelStop            : 'sfx/slot/148/148ReelStop.mp3',
    MPayCount           : 'sfx/slot/148/148MPayCount.mp3',
    NPayCount01         : 'sfx/slot/148/148NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/148/148NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/148/148NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/148/148NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/148/148NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/148/148NPayCount03End.mp3',
    MajorPopup          : 'sfx/slot/148/148MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/148/148JackpotPopup.mp3',
    JackpotBoost        : 'sfx/slot/148/148JackpotBoost.mp3',

    // NORMAL
    BetChange           : 'sfx/slot/148/148BetChange.mp3',
    PotTrail            : 'sfx/slot/148/148PotTrail.mp3',
    PotPre              : 'sfx/slot/148/148PotPre.mp3',
    PotOpen             : 'sfx/slot/148/148PotOpen.mp3',
    RespinShake         : 'sfx/slot/148/148RespinShake.mp3',
    ExtraJackpotLock    : 'sfx/slot/148/148ExtraJackpotLock.mp3',
    ExtraDirectpayLock  : 'sfx/slot/148/148ExtraDirectpayLock.mp3',
    ExtraMinigameLock   : 'sfx/slot/148/148ExtraMinigameLock.mp3',
    BoostLock           : 'sfx/slot/148/148BoostLock.mp3',
    Boost               : 'sfx/slot/148/148Boost.mp3',
    MiniMatch01         : 'sfx/slot/148/148MiniMatch01.mp3',
    MiniMatch02         : 'sfx/slot/148/148MiniMatch02.mp3',
    MiniMatch04         : 'sfx/slot/148/148MiniMatch04.mp3',
    LongSpin            : 'sfx/slot/148/148LongSpin.mp3',
    Count               : 'sfx/slot/148/148Count.mp3',
    Unlock              : 'sfx/slot/148/148Unlock.mp3',
    PannelClose         : 'sfx/slot/148/148PannelClose.mp3',
    TipOver             : 'sfx/slot/148/148TipOver.mp3',

    // MAP
    MapOver             : 'sfx/slot/148/148MapOver.mp3',
    MapClick            : 'sfx/slot/148/148MapClick.mp3',
    MapOpen             : 'sfx/slot/148/148MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/148/148MapNormalGauge.mp3',
    MapMove             : 'sfx/slot/148/148MapMove.mp3',
    MapNoti             : 'sfx/slot/148/148MapNoti.mp3',
    MapSuperbonusGauge  : 'sfx/slot/148/148MapSuperbonusGauge.mp3',

    // MINI GAME
    MiniWildExtend      : 'sfx/slot/148/148MiniWildExtend.mp3',
    MiniWild01          : 'sfx/slot/148/148MiniWild01.mp3',
    MiniWild02          : 'sfx/slot/148/148MiniWild02.mp3',
    MiniWild03          : 'sfx/slot/148/148MiniWild03.mp3',
    MiniWild04          : 'sfx/slot/148/148MiniWild04.mp3',
    MiniZone01          : 'sfx/slot/148/148MiniZone01.mp3',
    MiniZone02          : 'sfx/slot/148/148MiniZone02.mp3',
    Miniframe           : 'sfx/slot/148/148Miniframe.mp3',
    SyncSpin            : 'sfx/slot/148/148SyncSpin.mp3',
    MiniIntro           : 'sfx/slot/148/148MiniIntro.mp3',
    MiniBoost           : 'sfx/slot/148/148MiniBoost.mp3',

    // RESPIN
    RsIntro             : 'sfx/slot/148/148RsIntro.mp3',
    SuperRsIntro        : 'sfx/slot/148/148SuperRsIntro.mp3',
    RsResult            : 'sfx/slot/148/148RsResult.mp3',

    // VOICE
    JVoice01            : 'sfx/slot/148/148JVoice01.mp3',
    JVoice02            : 'sfx/slot/148/148JVoice02.mp3',
    JVoice03            : 'sfx/slot/148/148JVoice03.mp3',
    JVoice04            : 'sfx/slot/148/148JVoice04.mp3',
    JVoice05            : 'sfx/slot/148/148JVoice05.mp3',
    MiniVoice01         : 'sfx/slot/148/148MiniVoice01.mp3',
    MiniVoice02         : 'sfx/slot/148/148MiniVoice02.mp3',
    MiniVoice03         : 'sfx/slot/148/148MiniVoice03.mp3',
    MiniVoice04         : 'sfx/slot/148/148MiniVoice04.mp3',
    SymVoice01          : 'sfx/slot/148/148SymVoice01.mp3',
    SymVoice02          : 'sfx/slot/148/148SymVoice02.mp3',
    SymVoice03          : 'sfx/slot/148/148SymVoice03.mp3'
};
window.g_sndMonsterParadeBoost = ResPack.create( 'sndMonsterParadeBoost', sndMonsterParadeBoost ).concat( g_sfxSlotCommon );
//endregion


//region -- BingoMine
window.sndBingoMine = {
    Intro               : 'sfx/slot/145/145Intro.mp3',

    BGM                 : 'sfx/slot/145/145Bgm.mp3',
    BGM_MINI            : 'sfx/slot/145/145MiniBgm.mp3',
    BGM_LINK            : 'sfx/slot/145/145LinkBgm.mp3',
    BGM_BINGO           : 'sfx/slot/145/145BingoBgm.mp3',

    Spin                :'sfx/slot/145/145Spin.mp3',
    ReelStop            :'sfx/slot/145/145ReelStop.mp3',
    LinkSpin            :'sfx/slot/145/145LinkSpin.mp3',
    LinkReelStop        :'sfx/slot/145/145LinkReelStop.mp3',

    WildSticky          : 'sfx/slot/145/145WinRespin.mp3',
    WildRandom          : 'sfx/slot/145/145MiniWild.mp3',
    BingoFrame          : 'sfx/slot/145/145BingFrame.mp3',
    // LockingWild         : 'sfx/slot/150/150SLocking01.mp3',
    LockingMergeLink    : 'sfx/slot/145/145Merge03.mp3',
    LockingBingo        : 'sfx/slot/145/145HLocking.mp3',
    ChangeMergeLink     : 'sfx/slot/145/145Merge01.mp3',
    TrailMergeLink      : 'sfx/slot/145/145Merge02.mp3',
    MiniGameSymbolWin   : 'sfx/slot/145/145MiniOutro.mp3',
    MiniGameSymboIntro  : 'sfx/slot/145/145BingoMatch05.mp3',
    MiniGameSymbolOpen  : 'sfx/slot/145/145MiniSymbol.mp3',
    JackpotSymbolOpen   : 'sfx/slot/145/145SymbolChange.mp3',
    JakcpotSymbolWin    : 'sfx/slot/145/145BingoMatch04.mp3',
    TrailBingoWin       : 'sfx/slot/145/145Trail.mp3',
    AddSpinCount        : 'sfx/slot/145/145LinkReset.mp3',

    ChangeLevel         : 'sfx/slot/145/145HFrame.mp3',
    ChangeBoom          : 'sfx/slot/145/145BingoMatch02.mp3',
    BoomBoom            : 'sfx/slot/145/145BingoMatch03.mp3',
    Boom                : 'sfx/slot/145/145BingoBomb.mp3',
    RandomBingoMode01   : 'sfx/slot/145/145BVoice01.mp3',
    RandomBingoMode02   : 'sfx/slot/145/145BVoice02.mp3',
    RandomBingoMode03   : 'sfx/slot/145/145BVoice03.mp3',

    WinpannelOpen       : 'sfx/slot/145/145WInpannel01.mp3',
    WinpannelClose      : 'sfx/slot/145/145WInpannel02.mp3',
    WinpannelAdd        : 'sfx/slot/145/145WinSum.mp3',
    PotOpen             : 'sfx/slot/145/145PotOpen.mp3',
    PotPre              : 'sfx/slot/145/145PotPre.mp3',
    PotTrail            : 'sfx/slot/145/145PotTrail.mp3',
    // MAP
    MapOver             : 'sfx/slot/145/145MapOver.mp3',
    MapClick            : 'sfx/slot/145/145MapClick.mp3',
    Unlock              : 'sfx/slot/145/145Unlock.mp3',
    MapOpen             : 'sfx/slot/145/145MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/145/145MapNormalGauge.mp3',
    MapMove             : 'sfx/slot/145/145MapMove.mp3',
    MapNoti             : 'sfx/slot/148/148MapNoti.mp3',  // ?
    MapSuperbonusGauge  : 'sfx/slot/145/145MapSuperbonusGauge.mp3',

    MPayCount           : 'sfx/slot/145/145MPayCount.mp3',
    NPayCount01         : 'sfx/slot/145/145NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/145/145NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/145/145NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/145/145NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/145/145NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/145/145NPayCount03End.mp3',

    MajorPopup          : 'sfx/slot/145/145MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/145/145JackpotPopup.mp3',
    JackpotMinor        : 'sfx/slot/145/145JVoice01.mp3',
    JackpotMajor        : 'sfx/slot/145/145JVoice02.mp3',
    JackpotMega         : 'sfx/slot/145/145JVoice03.mp3',
    JackpotGrand        : 'sfx/slot/145/145JVoice04.mp3',
    LinkPopup           : 'sfx/slot/145/145LinkIntro.mp3',
    SuperLinkPopup      : 'sfx/slot/145/145SuperLinkIntro.mp3',
    ResultPopup         : 'sfx/slot/145/145LinkResult.mp3',
    BombBonusPopup      : 'sfx/slot/145/145BombBonus.mp3',

    BingoPopup          : 'sfx/slot/145/145BingoMatch01.mp3',
    RespinPopup         : 'sfx/slot/145/145Respin.mp3',
    BingoReset          : 'sfx/slot/145/145BingoReset.mp3',
    MiniGamePopup       : 'sfx/slot/145/145MiniIntro.mp3',
    MiniGame01Popup     : 'sfx/slot/145/145MiniVoice01.mp3',
    MiniGame02Popup     : 'sfx/slot/145/145MiniVoice02.mp3',
    MiniGame03Popup     : 'sfx/slot/145/145MiniVoice03.mp3',
    MiniGame04Popup     : 'sfx/slot/145/145MiniVoice04.mp3',
};
window.g_sndBingoMine = ResPack.create( 'sndBingoMine', sndBingoMine ).concat( g_sfxSlotCommon );
//endregion



//region -- ↓↓↓ TheDogFather ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTheDogFather = {
    Intro                   : 'sfx/slot/153/153Intro.mp3',

    BGM_Normal              : 'sfx/slot/153/153Bgm.mp3',
    BGM_Free                : 'sfx/slot/153/153FsBgm.mp3',
    BGM_MiniGame            : 'sfx/slot/153/153MiniBgm.mp3',
    BGM_respin              : 'sfx/slot/153/153ReBgm.mp3',

    // UI
    ChangeBoost             : 'sfx/slot/153/153RespinBoost.mp3',

    // reel
    Spin                    : 'sfx/slot/153/153Spin.mp3',
    ReelStop                : 'sfx/slot/153/153ReelStop.mp3',
    ReelStop_MG             : 'sfx/slot/153/153MiniReelStop.mp3',
    LongSpin                : 'sfx/slot/153/153Longspin.mp3',

    // wheel
    SpinWheel               : 'sfx/slot/153/153MiniReelStop.mp3',
    StopWheel               : 'sfx/slot/153/153MergeSpinEnd.mp3',

    // symbol
    SymbolQHLocking         : 'sfx/slot/153/153Locking.mp3',
    SymbolQHRLocking        : 'sfx/slot/153/153RLocking.mp3',
    SymbolQHMLocking        : 'sfx/slot/153/153MLocking.mp3',
    SymbolQHMMatch          : 'sfx/slot/153/153MiniMatch.mp3',
    SymbolQHMRMatch         : 'sfx/slot/153/153RMatch.mp3',
    SymbolWildLocking       : 'sfx/slot/153/153MiniWild.mp3',
    SymbolMajorLocking      : 'sfx/slot/153/153MiniLocking.mp3',
    SymbolBombLocking       : 'sfx/slot/153/153Merge01.mp3',
    SymbolMerge             : 'sfx/slot/153/153Merge02.mp3',
    SymbolOpen              : 'sfx/slot/153/153Merge04.mp3',


    // fx
    PotTrail                : 'sfx/slot/153/153PotTrail.mp3',
    MergeTrail              : 'sfx/slot/153/153Merge03.mp3',
    LensMove                : 'sfx/slot/153/153MniMove01.mp3',
    LensLastMove            : 'sfx/slot/153/153MniMove02.mp3',
    LensTrans               : 'sfx/slot/153/153MniMove03.mp3',
    BonusWinFx              : 'sfx/slot/153/153WinSum.mp3',

    // totalpay
    MPayCount               : 'sfx/slot/153/153MPayCount.mp3',
    NPayCount01             : 'sfx/slot/153/153NPayCount01.mp3',
    NPayCount02             : 'sfx/slot/153/153NPayCount02.mp3',
    NPayCount03             : 'sfx/slot/153/153NPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/153/153NPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/153/153NPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/153/153NPayCount03End.mp3',

    // pot
    PotOpen                 : 'sfx/slot/153/153PotOpen.mp3',

    PotStepUp               : 'sfx/slot/153/153PotPre.mp3',

    // map
    MapOver                 : 'sfx/slot/153/153MapOver.mp3',
    MapClick                : 'sfx/slot/153/153MapClick.mp3',
    BetUnLock               : 'sfx/slot/153/153Unlock.mp3',
    MapOpen                 : 'sfx/slot/153/153MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/153/153MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/153/153MapSuperbonusGauge.mp3',

    // popup
    MajorPopup              : 'sfx/slot/153/153MajorPopup.mp3',
    FreespinIntro           : 'sfx/slot/153/153FsIntro.mp3',
    SuperFreespinIntro      : 'sfx/slot/153/153SuperFsIntro.mp3',
    FreespinRetriggerIntro  : 'sfx/slot/153/153Retrigger.mp3',
    FreespinResult          : 'sfx/slot/153/153FsResult.mp3',
    RespinPopup             : 'sfx/slot/153/153Respin.mp3',
    JackpotPopup            : 'sfx/slot/153/153JackpotPopup.mp3',
    JackpotVoice_0          : 'sfx/slot/153/153JVoice01.mp3',
    JackpotVoice_1          : 'sfx/slot/153/153JVoice02.mp3',
    JackpotVoice_2          : 'sfx/slot/153/153JVoice03.mp3',
    JackpotVoice_3          : 'sfx/slot/153/153JVoice04.mp3',
    JackpotVoice_4          : 'sfx/slot/153/153JVoice05.mp3',
    BoostJackpotVoice_0     : 'sfx/slot/153/153JVoice06.mp3',
    BoostJackpotVoice_1     : 'sfx/slot/153/153JVoice07.mp3',
    BoostJackpotVoice_2     : 'sfx/slot/153/153JVoice08.mp3',
    BoostJackpotVoice_3     : 'sfx/slot/153/153JVoice09.mp3',
    BoostJackpotVoice_4     : 'sfx/slot/153/153JVoice10.mp3',

    // minigame
    MinigameIntro           : 'sfx/slot/153/153MiniIntro.mp3',
    MinigameVoice0          : 'sfx/slot/153/153MiniVoice01.mp3',
    MinigameVoice1          : 'sfx/slot/153/153MiniVoice02.mp3',
    MinigameVoice2          : 'sfx/slot/153/153MiniVoice03.mp3',
    MinigameVoice3          : 'sfx/slot/153/153MiniVoice04.mp3'
};
window.g_sndTheDogFather = ResPack.create( 'sndTheDogFather', sndTheDogFather ).concat( g_sfxSlotCommon );
//endregion

// -- The Magical Lupin -------------------------------------------------------------------------------------------//
window.sndTheMagicalLupin = {
    //INTRO
    Intro                   :   'sfx/slot/154/154Intro.mp3',

    //BGM
    Bgm                     :   'sfx/slot/154/154Bgm.mp3',
    FsBgm                   :   'sfx/slot/154/154FsBgm.mp3',
    LinkBgm                 :   'sfx/slot/154/154LinkBgm.mp3',
    WheelBgm                :   'sfx/slot/154/154WheelBgm.mp3',
    PickBgm                 :   'sfx/slot/154/154PickBgm.mp3',

    //PAY
    Spin                    :   'sfx/slot/154/154Spin.mp3',
    ReelStop                :   'sfx/slot/154/154ReelStop.mp3',
    MPayCount               :   'sfx/slot/154/154MPayCount.mp3',
    NPayCount01             :   'sfx/slot/154/154NPayCount01.mp3',
    NPayCount01End          :   'sfx/slot/154/154NPayCount01End.mp3',
    NPayCount02             :   'sfx/slot/154/154NPayCount02.mp3',
    NPayCount02End          :   'sfx/slot/154/154NPayCount02End.mp3',
    NPayCount03             :   'sfx/slot/154/154NPayCount03.mp3',
    NPayCount03End          :   'sfx/slot/154/154NPayCount03End.mp3',
    MajorPopup              :   'sfx/slot/154/154MajorPopup.mp3',
    JackpotPopup            :   'sfx/slot/154/154JackpotPopup.mp3',

    //NORMAL
    SLocking01              :   'sfx/slot/154/154SLocking01.mp3',
    SLocking02              :   'sfx/slot/154/154SLocking02.mp3',
    SLocking03              :   'sfx/slot/154/154SLocking03.mp3',
    GaugeOpen               :   'sfx/slot/154/154PotOpen01.mp3',
    PotOpen                 :   'sfx/slot/154/154PotOpen02.mp3',
    GaugeTrail              :   'sfx/slot/154/154Pottrail01.mp3',
    PotTrail                :   'sfx/slot/154/154Pottrail02.mp3',
    Longspin                :   'sfx/slot/154/154Longspin.mp3',
    SMatch                  :   'sfx/slot/154/154SMatch.mp3',
    BetUnLock               :   'sfx/slot/154/154Unlock.mp3',
    WinSum                  :   'sfx/slot/154/154WinSum.mp3',

    //WHEEL
    WheelIntro              :   'sfx/slot/154/154WheelPopup.mp3',
    WheelSpin               :   'sfx/slot/154/154WheelSpin.mp3',
    WheelJackpotMatch       :   'sfx/slot/154/154WheelMatch01.mp3',
    WheelFreeSpinMatch      :   'sfx/slot/154/154WheelMatch02.mp3',
    WheelRespin             :   'sfx/slot/154/154WheelRespin.mp3',
    WheelCount              :   'sfx/slot/154/154WheelSum.mp3',

    //LINK
    LinkIntro               :   'sfx/slot/154/154LinkIntro.mp3',
    LinkDiaLocking          :   'sfx/slot/154/154LsymLocking01.mp3',
    LinkBronzeKeyLocking    :   'sfx/slot/154/154LsymLocking02.mp3',
    LinkGoldKeyLocking      :   'sfx/slot/154/154LsymLocking03.mp3',
    LinkCoinLocking         :   'sfx/slot/154/154LsymLocking04.mp3',
    LinkWildDiaLocking      :   'sfx/slot/154/154LsymLocking05.mp3',
    LinkSpin                :   'sfx/slot/154/154LinkSpin.mp3',
    LinkSpinStop            :   'sfx/slot/154/154LinkReelStop.mp3',
    LinkOpenCountPanel      :   'sfx/slot/154/154LinkCount.mp3',
    LinkCountReset          :   'sfx/slot/154/154LinkReset.mp3',
    LinkDiaTrail            :   'sfx/slot/154/154LinkTrail01.mp3',
    LinkKeyTrail            :   'sfx/slot/154/154LinkTrail02.mp3',
    LinkKeyMatch            :   'sfx/slot/154/154LinkKey.mp3',
    LinkArrayOpen           :   'sfx/slot/154/154LinkUnlock.mp3',

    BlueKeyOpen             :   'sfx/slot/154/154LinkUnlock02.mp3',
    LastPangIntro           :   'sfx/slot/154/154LinkTrainsition01.mp3',
    // LastPangCoinFlip        :   'sfx/slot/154/154LinkTrainsition02.mp3',
    LastPangDPTrail         :   'sfx/slot/154/154LinkTrainsition03.mp3',
    LastPangDiaFlip         :   'sfx/slot/154/154LinkTrainsition04.mp3',
    LastPangDiaTrail        :   'sfx/slot/154/154LinkTrainsition05.mp3',
    LastPangCoin            :   'sfx/slot/154/154LinkCoin.mp3',
    LastPangSum             :   'sfx/slot/154/154LinkSum.mp3',
    LastPangResult          :   'sfx/slot/154/154LinkResult.mp3',

    //MINI MAP
    MapOver                 :   'sfx/slot/154/154MapOver.mp3',
    MapClick                :   'sfx/slot/154/154MapClick.mp3',
    MapOpen                 :   'sfx/slot/154/154MapOpen.mp3',
    MapNormalGauge          :   'sfx/slot/154/154MapNormalGauge.mp3',
    MapSuperbonusGauge      :   'sfx/slot/154/154MapSuperbonusGauge.mp3',
    MapLastSuperbonusGauge  :   'sfx/slot/154/154MapSuperbonusGauge.mp3', // 안씀

    //PICK
    PickGameOver            :   'sfx/slot/154/154PickOver.mp3',
    PickGamePick            :   'sfx/slot/154/154Pick01.mp3',
    PickGameEnd             :   'sfx/slot/154/154Pick02.mp3',
    PickGameDPTrail         :   'sfx/slot/154/154Picktrail.mp3',
    PickGameMultTrail       :   'sfx/slot/154/154PickSum.mp3',
    PickGameEndTrail        :   'sfx/slot/154/154PickSum02.mp3',
    PickGameAllWin          :   'sfx/slot/154/154PickReveal.mp3',
    PickGameIntro           :   'sfx/slot/154/154PickIntro.mp3',
    PickGameResult          :   'sfx/slot/154/154PickResult.mp3',

    //FREESPIN
    FreeSpinIntro           :   'sfx/slot/154/154FsIntro.mp3',
    FreeSpinNudge           :   'sfx/slot/154/154FsNudge.mp3',
    FreeSpinResult          :   'sfx/slot/154/154FsResult.mp3',

    //VOICE
    Jackpot0                :   'sfx/slot/154/154JVoice01.mp3',
    Jackpot1                :   'sfx/slot/154/154JVoice02.mp3',
    Jackpot2                :   'sfx/slot/154/154JVoice03.mp3',
    Jackpot3                :   'sfx/slot/154/154JVoice04.mp3',
    Jackpot4                :   'sfx/slot/154/154JVoice05.mp3'
};
window.g_sndTheMagicalLupin = ResPack.create( 'sndTheMagicalLupin', sndTheMagicalLupin ).concat( g_sfxSlotCommon );
// -- End The Magical Lupin ---------------------------------------------------------------------------------------//


//region -- ↓↓↓ GoldenHoneyPot ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndGoldenHoneyPot = {
    // INTRO
    Intro               :'sfx/slot/155/155Intro.mp3',

    // BGM
    BGM                 : 'sfx/slot/155/155Bgm.mp3',
    BGM_Link            : 'sfx/slot/155/155LinkBgm.mp3',

    // PAY
    Spin                : 'sfx/slot/155/155Spin.mp3',
    ReelStop            : 'sfx/slot/155/155ReelStop.mp3',

    LinkSpin            : 'sfx/slot/155/155LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/155/155LinkReelstop.mp3',

    MPayCount           : 'sfx/slot/155/155MPayCount.mp3',
    NPayCount01         : 'sfx/slot/155/155NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/155/155NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/155/155NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/155/155NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/155/155NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/155/155NPayCount03End.mp3',
    MajorPopup          : 'sfx/slot/155/155MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/155/155JackpotPopup.mp3',

    // NORMAL
    LockCollect         : 'sfx/slot/155/155CLocking.mp3',
    LockDP10            : 'sfx/slot/155/155DLocking02.mp3',
    LockDP              : 'sfx/slot/155/155DLocking01.mp3',
    ScatterMatch        : 'sfx/slot/155/155Smatch.mp3',
    ScatterLock01       : 'sfx/slot/155/155SLocking01.mp3',
    ScatterLock03       : 'sfx/slot/155/155SLocking03.mp3',
    ScatterLock05       : 'sfx/slot/155/155SLocking05.mp3',
    LongSpin            : 'sfx/slot/155/155Longspin.mp3',
    TrailCollect        : 'sfx/slot/155/155Trail.mp3',

    Unlock              : 'sfx/slot/155/155Unlock.mp3',
    // MAP
    MapOver             : 'sfx/slot/155/155MapOver.mp3',
    MapClick            : 'sfx/slot/155/155MapClick.mp3',
    MapOpen             : 'sfx/slot/155/155MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/155/155MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/155/155MapSuperbonusGauge.mp3',

    // Link
    IntroLink           : 'sfx/slot/155/155LinkIntro01.mp3',
    IntroLinkSuper      : 'sfx/slot/155/155SuperLinkIntro.mp3',
    LinkResult          : 'sfx/slot/155/155LinkResult.mp3',

    LinkGameBreakBlock  : 'sfx/slot/155/155LinkUnlock.mp3',
    LinkGameOpenBlock   : 'sfx/slot/155/155LinkIntro02.mp3',
    LinkGameIntroCollect : 'sfx/slot/155/155LinkIntro03.mp3',
    LinkGameLockDP      : 'sfx/slot/155/155LsymLocking01.mp3',
    LinkGameLockAddSpin : 'sfx/slot/155/155LsymLocking02.mp3',
    LinkGameLockOpen    : 'sfx/slot/155/155LsymLocking03.mp3',
    LinkGameLockCollect : 'sfx/slot/155/155LsymLocking04.mp3',
    LinkGameTrailAddSpin: 'sfx/slot/155/155LinkTrail02.mp3',
    LinkGameTrailOverlay: 'sfx/slot/155/155LinkTrail03.mp3',
    LinkGameEndCollect  : 'sfx/slot/155/155LinkCollect.mp3',
    LinkGameTrailCollect: 'sfx/slot/155/155LinkTrail01.mp3',
    LinkGameTrailWin    : 'sfx/slot/155/155LinkSum.mp3',


    // VOICE
    JVoice01            : 'sfx/slot/155/155JVoice01.mp3',
    JVoice02            : 'sfx/slot/155/155JVoice02.mp3',
    JVoice03            : 'sfx/slot/155/155JVoice03.mp3',
    JVoice04            : 'sfx/slot/155/155JVoice04.mp3',
};
window.g_sndGoldenHoneyPot = ResPack.create( 'sndGoldenHoneyPot', sndGoldenHoneyPot ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ GoCatchFish ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndGoCatchFish = {
    // INTRO
    Intro               : 'sfx/slot/156/156Intro.mp3',

    // BGM
    Bgm                 : 'sfx/slot/156/156Bgm.mp3',
    FsBgm               : 'sfx/slot/156/156FsBgm.mp3',
    PBgm                : 'sfx/slot/156/156PBgm.mp3',

    // PAY
    Spin                : 'sfx/slot/156/156Spin.mp3',
    ReelStop            : 'sfx/slot/156/156ReelStop.mp3',
    MPayCount           : 'sfx/slot/156/156MPayCount.mp3',
    NPayCount01         : 'sfx/slot/156/156NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/156/156NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/156/156NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/156/156NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/156/156NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/156/156NPayCount03End.mp3',
    MajorPopup          : 'sfx/slot/156/156MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/156/156JackpotPopup.mp3',

    // NORMAL
    SLocking01          : 'sfx/slot/156/156SLocking01.mp3',
    SLocking02          : 'sfx/slot/156/156SLocking02.mp3',
    SLocking03          : 'sfx/slot/156/156SLocking03.mp3',
    SLocking04          : 'sfx/slot/156/156SLocking04.mp3',
    SLocking05          : 'sfx/slot/156/156SLocking05.mp3',
    Trail               : 'sfx/slot/156/156Trail.mp3',
    PotPre              : 'sfx/slot/156/156PotPre.mp3',
    PotOpen             : 'sfx/slot/156/156PotOpen.mp3',
    SMatch              : 'sfx/slot/156/156SMatch.mp3',
    Longspin            : 'sfx/slot/156/156Longspin.mp3',
    Unlock              : 'sfx/slot/156/156Unlock.mp3',

    // FREE SPIN
    FsIntro             : 'sfx/slot/156/156FsIntro.mp3',
    FsResult            : 'sfx/slot/156/156FsResult.mp3',

    // PARADE SPIN
    PIntro              : 'sfx/slot/156/156PIntro.mp3',
    SuperPIntro         : 'sfx/slot/156/156SuperPIntro.mp3',
    LsymLocking01       : 'sfx/slot/156/156LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/156/156LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/156/156LsymLocking03.mp3',
    ParadeMatch         : 'sfx/slot/156/156ParadeMatch.mp3',
    PPannel             : 'sfx/slot/156/156PPannel.mp3',
    PFrame              : 'sfx/slot/156/156PFrame.mp3',
    ParadeUp            : 'sfx/slot/156/156ParadeUp.mp3',
    Transition01        : 'sfx/slot/156/156Transition01.mp3',
    Transition02        : 'sfx/slot/156/156Transition02.mp3',
    Transition03        : 'sfx/slot/156/156Transition03.mp3',
    ParadeMatch         : 'sfx/slot/156/156ParadeMatch.mp3',
    UtilOpen            : 'sfx/slot/156/156UtilOpen.mp3',
    ParadeSpin          : 'sfx/slot/156/156ParadeSpin.mp3',
    ParadeReelstop      : 'sfx/slot/156/156ParadeReelstop.mp3',
    ParadeSum           : 'sfx/slot/156/156ParadeSum.mp3',
    ParadeSum02         : 'sfx/slot/156/156ParadeSum02.mp3',
    ParadeResult        : 'sfx/slot/156/156ParadeResult.mp3',

    // MINI MAP
    MapOver             : 'sfx/slot/156/156MapOver.mp3',
    MapClick            : 'sfx/slot/156/156MapClick.mp3',
    MapOpen             : 'sfx/slot/156/156MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/156/156MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/156/156MapSuperbonusGauge.mp3',

    // VOICE
    JVoice01            : 'sfx/slot/156/156JVoice01.mp3',
    JVoice02            : 'sfx/slot/156/156JVoice02.mp3',
    JVoice03            : 'sfx/slot/156/156JVoice03.mp3',
    JVoice04            : 'sfx/slot/156/156JVoice04.mp3',
    JVoice05            : 'sfx/slot/156/156JVoice05.mp3'
};
window.g_sndGoCatchFish = ResPack.create( 'sndGoCatchFish', sndGoCatchFish ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ GoldenEggDropHammerTime BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndGoldenEggDropHammerTime = {
    Intro                   : 'sfx/slot/159/159Intro.mp3',

    BGM                     : 'sfx/slot/159/159Bgm.mp3',
    BGM_FreeSpin            : 'sfx/slot/159/159FsBgm.mp3',
    BGM_LinkGame            : 'sfx/slot/159/159LinkBgm.mp3',

    Spin                    : 'sfx/slot/159/159Spin.mp3',
    ReelStop                : 'sfx/slot/159/159ReelStop.mp3',
    LongSpin                : 'sfx/slot/159/159Longspin.mp3',
    LinkSpin                : 'sfx/slot/159/159LinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/159/159LinkReelstop.mp3',

    SLock01                 : 'sfx/slot/159/159SLocking01.mp3',
    SLock02                 : 'sfx/slot/159/159SLocking02.mp3',
    SLock03                 : 'sfx/slot/159/159SLocking03.mp3',
    SLock04                 : 'sfx/slot/159/159SLocking04.mp3',
    SLock05                 : 'sfx/slot/159/159SLocking05.mp3',

    HLock                 : 'sfx/slot/159/159HLocking.mp3',
    Match                 : 'sfx/slot/159/159HMatch.mp3' ,
    Hammer                 : 'sfx/slot/159/159Hammer.mp3' ,

    LinkHammer               : 'sfx/slot/159/159LinkHammer.mp3',

    LockHammer               : 'sfx/slot/159/159LsymLocking04.mp3',
    LockGoldJ               : 'sfx/slot/159/159LsymLocking03.mp3',
    LockGoldD               : 'sfx/slot/159/159LsymLocking02.mp3',
    LockWhite               : 'sfx/slot/159/159LsymLocking01.mp3',

    // pot
    PotBonus                : 'sfx/slot/159/159PotOpen.mp3',
    PotUp                   : 'sfx/slot/159/159PotPre.mp3',
    PotTrail                : 'sfx/slot/159/159Trail.mp3',

    ScatterMatch            : 'sfx/slot/159/159Smatch.mp3',

    LinkGameBlock           : 'sfx/slot/159/159Block.mp3',
    LinkGameBreak           : 'sfx/slot/159/159LinkUnlock.mp3',
    LinkGameDrop            : 'sfx/slot/159/159LinkDrop.mp3',
    // LinkGameUpgrade         : 'sfx/slot/159/ccUpgrade.mp3',
    LinkGameTrailAdd        : 'sfx/slot/159/159LinkReset.mp3',
    LinkGameTrailWin        : 'sfx/slot/159/159LinkSum.mp3',
    LinkGameClear           : 'sfx/slot/159/159LinkCrack.mp3',
    LinkGameLineFrame       : 'sfx/slot/159/159LinkFrame.mp3',
    // LinkGameClear01         : 'sfx/slot/159/ccVoiceClear01.mp3',
    // LinkGameClear02         : 'sfx/slot/159/ccVoiceClear02.mp3',
    // LinkGameClear03         : 'sfx/slot/159/ccVoiceClear03.mp3',
    // LinkGameClear04         : 'sfx/slot/159/ccVoiceClear04.mp3',
    LinkGameWAxe            : 'sfx/slot/159/159LinkUtil01.mp3',
    LinkGameWUpgrade        : 'sfx/slot/159/159LinkUtil02.mp3',
    LinkGameWAddSpin        : 'sfx/slot/159/159LinkUtil03.mp3',

    // winpannel
    WinpannelOpen           :   'sfx/slot/159/159WinpannelOpen.mp3',
    WinpannelClose          :   'sfx/slot/159/159WinpannelClose.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/159/159MapOver.mp3',
    MiniMapClick            : 'sfx/slot/159/159MapClick.mp3',
    MiniMapUnlock           : 'sfx/slot/159/159Unlock.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/159/159MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/159/159MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/159/159MapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/159/159MapSuperbonusGauge.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/159/159MPayCount.mp3',
    NPayCount01             : 'sfx/slot/159/159NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/159/159NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/159/159NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/159/159NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/159/159NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/159/159NPayCount03End.mp3',

    //popup
    JackpotPopup            : 'sfx/slot/159/159JackpotPopup.mp3',
    GrandJackpot            : 'sfx/slot/159/159JVoice04.mp3',
    MegaJackpot             : 'sfx/slot/159/159JVoice03.mp3',
    MajorJackpot            : 'sfx/slot/159/159JVoice02.mp3',
    MinorJackpot            : 'sfx/slot/159/159JVoice01.mp3',
    MajorPopup              : 'sfx/slot/159/159MajorPopup.mp3',
    FreeSpinIntroPopup      : 'sfx/slot/159/159FsIntro.mp3',
    LinkGameIntroPopup      : 'sfx/slot/159/159LinkIntro.mp3',
    SuperLinkGameIntroPopup : 'sfx/slot/159/159SuperLinkIntro.mp3',
    FreeSpinResultPopup     : 'sfx/slot/159/159FsResult.mp3',
    LinkGameResultPopup     : 'sfx/slot/159/159LinkResult.mp3'

};
window.g_sndGoldenEggDropHammerTime = ResPack.create( 'sndGoldenEggDropHammerTime', sndGoldenEggDropHammerTime ).concat( g_sfxSlotCommon );
//-- ↑↑↑ GoldenEggDropHammerTime END ↑↑↑ -----------

// -- Triple Me Treasures ---------------------------------------------------------------------------------------------//
window.sndTripleMeTreasures = {
    //INTRO
    Intro                   : 'sfx/slot/157/157Intro.mp3',

    //BGM
    Bgm                     : 'sfx/slot/157/157Bgm.mp3',
    FsBgm                   : 'sfx/slot/157/157FsBgm.mp3',
    LinkBgm                 : 'sfx/slot/157/157LinkBgm.mp3',
    WheelBgm                : 'sfx/slot/157/157WheelBgm.mp3',

    //PAY
    Spin                    : 'sfx/slot/157/157Spin.mp3',
    ReelStop                : 'sfx/slot/157/157ReelStop.mp3',
    MPayCount               : 'sfx/slot/157/157MPayCount.mp3',
    NPayCount01             : 'sfx/slot/157/157NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/157/157NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/157/157NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/157/157NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/157/157NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/157/157NPayCount03End.mp3',
    MajorPopup              : 'sfx/slot/157/157MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/157/157JackpotPopup.mp3',
    JackpotPopup_B          : 'sfx/slot/157/157JackpotBoost.mp3',

    //NORMAL
    PotTrail                : 'sfx/slot/157/157Trail.mp3',
    PotPre                  : 'sfx/slot/157/157PotPre.mp3',
    PotOpen                 : 'sfx/slot/157/157PotOpen.mp3',
    PotGauge                : 'sfx/slot/157/157Guage01.mp3',
    PotGauge_Super          : 'sfx/slot/157/157Guage02.mp3',
    PotClick                : 'sfx/slot/157/157WheelOpen.mp3',
    PotGaugeUnLock          : 'sfx/slot/157/157Unlock.mp3',
    ToolTipClick            : 'sfx/slot/157/157TipOver.mp3',

    //WHEEL
    WheelIntro              : 'sfx/slot/157/157WheelPopup.mp3',
    WheelIntro_Super        : 'sfx/slot/157/157SuperWheelPopup.mp3',
    WheelSpin               : 'sfx/slot/157/157WheelSpin.mp3',
    WheelJackpotMatch       : 'sfx/slot/157/157WheelMatch01.mp3',
    WheelBoostMatch         : 'sfx/slot/157/157WheelMatch02.mp3',
    WheelRemoveEdge         : 'sfx/slot/157/157WheelRemove.mp3',
    WheelBoostIntro         : 'sfx/slot/157/157WheelBoost.mp3',

    //LINK
    LinkIntro               : 'sfx/slot/157/157LinkIntro.mp3',
    LinkIntro_Super         : 'sfx/slot/157/157SuperLinkIntro.mp3',
    LinkGoldReel            : 'sfx/slot/157/157LinkFrame.mp3',
    LinkLocking01           : 'sfx/slot/157/157LsymLocking01.mp3',
    LinkLocking02           : 'sfx/slot/157/157LsymLocking02.mp3',
    LinkLocking03           : 'sfx/slot/157/157LsymLocking03.mp3',
    LinkUpgrade             : 'sfx/slot/157/157Upgrade.mp3',
    LinkGroup               : 'sfx/slot/157/157Frame.mp3',
    LinkGroupLock           : 'sfx/slot/157/157FrameEnd.mp3',
    LinkSpin                : 'sfx/slot/157/157LinkSpin.mp3',
    LinkStop                : 'sfx/slot/157/157LinkReelStop.mp3',
    LinkResetCount          : 'sfx/slot/157/157LinkReset.mp3',
    LinkResultTrail         : 'sfx/slot/157/157LinkSum.mp3',
    LinkPanelOpen           : 'sfx/slot/157/157JackpotPannel.mp3',
    LinkPanelIn             : 'sfx/slot/157/157JackpotTrail01.mp3',
    LinkPanelOut            : 'sfx/slot/157/157JackpotTrail02.mp3',
    LinkJackpotPanel        : 'sfx/slot/157/157LinkPannel.mp3',
    LinkBoostGrand          : 'sfx/slot/157/157BoostGrand.mp3',
    LinkResult              : 'sfx/slot/157/157LinkResult.mp3',
    LinkLongSpin            : 'sfx/slot/157/157LinkLongSpin.mp3',

    //FREESPIN
    FreeSpinIntro           : 'sfx/slot/157/157FsIntro.mp3',
    FreeSpinIntro_Super     : 'sfx/slot/157/157SuperFsIntro.mp3',
    FreeSpinPlus            : 'sfx/slot/157/157FsPlus.mp3',
    FreeSpinWildExpand      : 'sfx/slot/157/157FsNudge.mp3',
    FreeSpinResult          : 'sfx/slot/157/157FsResult.mp3',

    //VOICE
    Jackpot0                : 'sfx/slot/157/157JVoice01.mp3',
    Jackpot1                : 'sfx/slot/157/157JVoice02.mp3',
    Jackpot2                : 'sfx/slot/157/157JVoice03.mp3',
    Jackpot3                : 'sfx/slot/157/157JVoice04.mp3',
    Jackpot4                : 'sfx/slot/157/157JVoice05.mp3'
};
window.g_sndTripleMeTreasures = ResPack.create( 'sndTripleMeTreasures', sndTripleMeTreasures ).concat( g_sfxSlotCommon );
// -- End Triple Me Treasures -----------------------------------------------------------------------------------------//


//region -- ↓↓↓ HuaMeiBaoShi ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndHuaMeiBaoShi = {
    // INTRO
    Intro               :'sfx/slot/158/158Intro.mp3',

    // BGM
    BGM                 : 'sfx/slot/158/158Bgm.mp3',
    BGM_Free            : 'sfx/slot/158/158FsBgm.mp3',
    BGM_Link            : 'sfx/slot/158/158LinkBgm.mp3',

    ActiveBet           : 'sfx/slot/158/158Unlock.mp3',
    OpenTooltip         : 'sfx/slot/158/158TipOver.mp3',

    // PAY
    Spin                : 'sfx/slot/158/158Spin.mp3',
    ReelStop            : 'sfx/slot/158/158ReelStop.mp3',
    LongSpin            : 'sfx/slot/158/158LongSpin.mp3',

    SLocking01          : 'sfx/slot/158/158SLocking01.mp3',
    SLocking02          : 'sfx/slot/158/158SLocking02.mp3',
    SLocking03          : 'sfx/slot/158/158SLocking03.mp3',
    SLocking04          : 'sfx/slot/158/158SLocking04.mp3',
    SLocking05          : 'sfx/slot/158/158SLocking05.mp3',

    PotUp               : 'sfx/slot/158/158PotPre.mp3',
    PotOpen             : 'sfx/slot/158/158PotOpen.mp3',

    FreeSpinCountShow   : 'sfx/slot/158/158Reveal.mp3',
    FreeSpinScatterMatch: 'sfx/slot/158/158SMatch.mp3',

    LinkSpin            : 'sfx/slot/158/158LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/158/158LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/158/158LinkLongSpin.mp3',
    LinkCountUp         : 'sfx/slot/158/158LinkReset.mp3',
    LinkEachWinReady    : 'sfx/slot/158/158EachWin.mp3',
    LinkEachWinUp       : 'sfx/slot/158/158Upgrade02.mp3',
    LinkEachWinUpStage1 : 'sfx/slot/158/158UVoice01.mp3',
    LinkEachWinUpStage2 : 'sfx/slot/158/158UVoice02.mp3',
    LinkEachWinUpStage3 : 'sfx/slot/158/158UVoice03.mp3',
    LLockingDP          : 'sfx/slot/158/158LsymLocking01.mp3',
    LLockingEachwin     : 'sfx/slot/158/158LsymLocking02.mp3',
    LLockingJ           : 'sfx/slot/158/158LsymLocking03.mp3',

    TrailPot            : 'sfx/slot/158/158Trail.mp3',
    TrailEachWin        : 'sfx/slot/158/158Upgrade01.mp3',
    TrailWin            : 'sfx/slot/158/158LinkSum.mp3',
    TrailWinJ           : 'sfx/slot/158/158LinkSum02.mp3',

    MPayCount           : 'sfx/slot/158/158MPayCount.mp3',
    NPayCount01         : 'sfx/slot/158/158NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/158/158NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/158/158NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/158/158NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/158/158NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/158/158NPayCount03End.mp3',

    MajorPopup          : 'sfx/slot/158/158MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/158/158JackpotPopup.mp3',
    JVoice01            : 'sfx/slot/158/158JVoice01.mp3',
    JVoice02            : 'sfx/slot/158/158JVoice02.mp3',
    JVoice03            : 'sfx/slot/158/158JVoice03.mp3',
    JVoice04            : 'sfx/slot/158/158JVoice04.mp3',
    JVoice05            : 'sfx/slot/158/158JVoice05.mp3',
    LinkGamePopup       : 'sfx/slot/158/158LinkIntro.mp3',
    FreeSpinResultPopup : 'sfx/slot/158/158FsResult.mp3',
    LinkGameResultPopup : 'sfx/slot/158/158LinkResult.mp3',
    FreeSpinPopup       : 'sfx/slot/158/158FsIntro.mp3',
    RetriggerPopup      : 'sfx/slot/158/158Retrigger.mp3',
    FreeSpinCount       : 'sfx/slot/158/158FsCount.mp3',
    FreeSpinCountEnd    : 'sfx/slot/158/158FsCountEnd.mp3',
};
window.g_sndHuaMeiBaoShi = ResPack.create( 'sndHuaMeiBaoShi', sndHuaMeiBaoShi ).concat( g_sfxSlotCommon );
//endregion

// -- Golden Piggy ---------------------------------------------------------------------------------------------//
window.sndGoldenPiggy = {
    //INTRO
    Intro                   : 'sfx/slot/162/162Intro.mp3',

    //BGM
    Bgm                     : 'sfx/slot/162/162Bgm.mp3',
    FsBgm                   : 'sfx/slot/162/162FsBgm.mp3',
    BonusBgm                : 'sfx/slot/162/162BonusBgm.mp3',

    //PAY
    Spin                    : 'sfx/slot/162/162Spin.mp3',
    ReelStop                : 'sfx/slot/162/162ReelStop.mp3',
    MPayCount               : 'sfx/slot/162/162MPayCount.mp3',
    NPayCount01             : 'sfx/slot/162/162NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/162/162NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/162/162NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/162/162NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/162/162NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/162/162NPayCount03End.mp3',
    MajorPopup              : 'sfx/slot/162/162MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/162/162JackpotPopup.mp3',

    //LOCK
    SLocking01              : 'sfx/slot/162/162SLocking01.mp3',
    SLocking02              : 'sfx/slot/162/162SLocking01.mp3',
    SLocking03              : 'sfx/slot/162/162SLocking01.mp3',
    SLocking04              : 'sfx/slot/162/162SLocking01.mp3',
    SLocking05              : 'sfx/slot/162/162SLocking01.mp3',
    CLocking                : 'sfx/slot/162/162CLocking.mp3',

    //POT
    PotOpen                 : 'sfx/slot/162/162PotOpen01.mp3',
    GaugeOpen               : 'sfx/slot/162/162PotOpen02.mp3',

    //TRAIL
    PotTrail                : 'sfx/slot/162/162Pottrail01.mp3',
    GaugeTrail              : 'sfx/slot/162/162Pottrail02.mp3',

    LongSpin                : 'sfx/slot/162/162LongSpin.mp3',

    SMatch                  : 'sfx/slot/162/162SMatch.mp3',

    //COIN
    CoinFlip                : 'sfx/slot/162/162CoinFlip01.mp3',
    CoinJackpot             : 'sfx/slot/162/162CoinFlip02.mp3',
    CoinShake               : 'sfx/slot/162/162CoinShake.mp3',

    PotGaugeUnLock          : 'sfx/slot/162/162Unlock.mp3',

    //MAP
    MapOver                 : 'sfx/slot/162/162MapOver.mp3',
    MapClick                : 'sfx/slot/162/162MapClick.mp3',
    MapOpen                 : 'sfx/slot/162/162MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/162/162MapNormalGauge.mp3',
    MapSuperBonusGauge      : 'sfx/slot/162/162MapSuperbonusGauge.mp3',
    MapClear                : 'sfx/slot/162/162MapClear.mp3',

    //BONUS GAME
    BonusGameIntro          : 'sfx/slot/162/162BonusIntro.mp3',
    BonusGameSpin           : 'sfx/slot/162/162BonusSpin.mp3',
    BonusGameSpinStart      : 'sfx/slot/162/162BonusSpinStart.mp3',
    BonusGameReelStop       : 'sfx/slot/162/162BonusReelStop.mp3',
    BNLock                  : 'sfx/slot/162/162BonusLocking01.mp3',
    BGLock                  : 'sfx/slot/162/162BonusLocking02.mp3',
    BonusGameUpgrade        : 'sfx/slot/162/162BonusUpgrade.mp3',
    BonusGameMatch          : 'sfx/slot/162/162BonusMatch.mp3',
    BonusGameMulti          : 'sfx/slot/162/162BonusMulti.mp3',
    BonusGameSum            : 'sfx/slot/162/162BonusSum.mp3',
    BonusGameResult         : 'sfx/slot/162/162BonusResult.mp3',

    //FREE GAME
    FreeSpinIntro           : 'sfx/slot/162/162FsIntro.mp3',
    FreeSpinLocking         : 'sfx/slot/162/162FsLocking.mp3',
    FreeSpinPigMove         : 'sfx/slot/162/162FsMove01.mp3',
    FreeSpinPigArrived      : 'sfx/slot/162/162FsMove02.mp3',
    FreeSpinPigSizeUp       : 'sfx/slot/162/162FsSizeup.mp3',
    FreeSpinPigMultiple     : 'sfx/slot/162/162FsMulti.mp3',
    FreeSpinPigTransform    : 'sfx/slot/162/162FsTransform.mp3',
    FreeSpinGauge           : 'sfx/slot/162/162FsGuage.mp3',
    FreeSpinPlusPopUp       : 'sfx/slot/162/162FsMatch.mp3',
    FreeSpinResult          : 'sfx/slot/162/162FsResult.mp3',
    FreeSpinWheelSpin       : 'sfx/slot/162/162FsWheelSpin.mp3',
    FreeSpinWheeSpinEnd     : 'sfx/slot/162/162FsWheelSpinEnd.mp3',

    //VOICE
    Jackpot0                : 'sfx/slot/162/162JVoice01.mp3',
    Jackpot1                : 'sfx/slot/162/162JVoice02.mp3',
    Jackpot2                : 'sfx/slot/162/162JVoice03.mp3',
    Jackpot3                : 'sfx/slot/162/162JVoice04.mp3',

    BonusGame0                : 'sfx/slot/162/162Mvoice01.mp3',
    BonusGame1                : 'sfx/slot/162/162Mvoice02.mp3',
    BonusGame2                : 'sfx/slot/162/162Mvoice03.mp3'
};
window.g_sndGoldenPiggy = ResPack.create( 'sndGoldenPiggy', sndGoldenPiggy ).concat( g_sfxSlotCommon );
// -- End Golden Piggy -----------------------------------------------------------------------------------------------//

//-- ↑↑↑ BananzaCoins BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndBananzaCoins = {
    Intro                   : 'sfx/slot/160/160Intro.mp3',

    // BGM
    Bgm                     : 'sfx/slot/160/160Bgm.mp3',
    LinkBgm                 : 'sfx/slot/160/160LinkBgm.mp3',
    FsBgm                   : 'sfx/slot/160/160FsBgm.mp3',
    MBgm                    : 'sfx/slot/160/160MBgm.mp3',


    // PLAY
    Spin                    : 'sfx/slot/160/160Spin.mp3',
    ReelStop                : 'sfx/slot/160/160ReelStop.mp3',
    MPayCount               : 'sfx/slot/160/160MPayCount.mp3',
    NPayCount01             : 'sfx/slot/160/160NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/160/160NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/160/160NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/160/160NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/160/160NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/160/160NPayCount03End.mp3',
    MajorPopup              : 'sfx/slot/160/160MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/160/160JackpotPopup.mp3',

    // Normal
    SLocking01              : 'sfx/slot/160/160SLocking01.mp3',
    SLocking02              : 'sfx/slot/160/160SLocking02.mp3',
    SLocking03              : 'sfx/slot/160/160SLocking03.mp3',
    SLocking04              : 'sfx/slot/160/160SLocking04.mp3',
    SLocking05              : 'sfx/slot/160/160SLocking05.mp3',
    JLocking                : 'sfx/slot/160/160JLocking.mp3',
    SMatch                  : 'sfx/slot/160/160SMatch.mp3',
    Trail                   : 'sfx/slot/160/160Trail.mp3',
    Longspin                : 'sfx/slot/160/160Longspin.mp3',
    PotPre                  : 'sfx/slot/160/160PotPre.mp3',
    PotOpen                 : 'sfx/slot/160/160PotOpen.mp3',
    MysteryIntro            : 'sfx/slot/160/160MysteryIntro.mp3',
    MysteryOutrto           : 'sfx/slot/160/160MysteryOutrto.mp3',
    MysteryWild             : 'sfx/slot/160/160MysteryWild.mp3',
    Unlock                  : 'sfx/slot/160/160Unlock.mp3',

    // LinkSpin
    LinkIntro               : 'sfx/slot/160/160LinkIntro.mp3',
    LsymLocking01           : 'sfx/slot/160/160LsymLocking01.mp3',
    LsymLocking02           : 'sfx/slot/160/160LsymLocking02.mp3',
    LinkSpin                : 'sfx/slot/160/160LinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/160/160LinkReelStop.mp3',
    LinkReset               : 'sfx/slot/160/160LinkReset.mp3',
    //LinkSum                 : 'sfx/slot/160/160LinkSum.mp3',
    //LinkSum02               : 'sfx/slot/160/160LinkSum02.mp3',
    LinkResult              : 'sfx/slot/160/160LinkResult.mp3',

    // FreeSpin
    FsIntro                 : 'sfx/slot/160/160FsIntro.mp3',
    Retrigger               : 'sfx/slot/160/160Retrigger.mp3',
    FsResult                : 'sfx/slot/160/160FsResult.mp3',

    // Voice
    JVoice01                 : 'sfx/slot/160/160JVoice01.mp3',
    JVoice02                 : 'sfx/slot/160/160JVoice02.mp3',
    JVoice03                 : 'sfx/slot/160/160JVoice03.mp3',
    JVoice04                 : 'sfx/slot/160/160JVoice04.mp3',
    JVoice05                 : 'sfx/slot/160/160JVoice05.mp3',
    JVoice06                 : 'sfx/slot/160/160JVoice06.mp3',

    MVoice01                 : 'sfx/slot/160/160MVoice01.mp3',
    MVoice02                 : 'sfx/slot/160/160MVoice02.mp3',
};
window.g_sndBananzaCoins = ResPack.create( 'sndBananzaCoins', sndBananzaCoins ).concat( g_sfxSlotCommon );
//-- ↑↑↑ BananzaCoins END ↑↑↑ -----------

//region -- ↓↓↓ ZeusLinkAndHadesLink ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndZeusLinkAndHadesLink = {
    // INTRO
    Intro               :   "sfx/slot/161/161Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/161/161Bgm.mp3",
    ZLinkBgm            :   "sfx/slot/161/161ZLinkBgm.mp3",
    HLinkBgm            :   "sfx/slot/161/161HLinkBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/161/161Spin.mp3",
    ReelStop            :   "sfx/slot/161/161ReelStop.mp3",
    MPayCount           :   "sfx/slot/161/161MPayCount.mp3",
    NPayCount01         :   "sfx/slot/161/161NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/161/161NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/161/161NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/161/161NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/161/161NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/161/161NPayCount03End.mp3",
    MajorPopup          :   "sfx/slot/161/161MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/161/161JackpotPopup.mp3",

    // NORMAL
    SLocking01          :   "sfx/slot/161/161SLocking01.mp3",
    SLocking02          :   "sfx/slot/161/161SLocking02.mp3",
    SLocking03          :   "sfx/slot/161/161SLocking03.mp3",
    SLocking04          :   "sfx/slot/161/161SLocking04.mp3",
    SLocking05          :   "sfx/slot/161/161SLocking05.mp3",
    DLocking            :   "sfx/slot/161/161DLocking.mp3",
    Trail               :   "sfx/slot/161/161Trail.mp3",
    PotPre              :   "sfx/slot/161/161PotPre.mp3",
    PotOpen             :   "sfx/slot/161/161PotOpen.mp3",
    LongSpin            :   "sfx/slot/161/161LongSpin.mp3",
    SMatch              :   "sfx/slot/161/161SMatch.mp3",
    Nudge               :   "sfx/slot/161/161Nudge.mp3",
    TipOver             :   "sfx/slot/161/161TipOver.mp3",
    Unlock              :   "sfx/slot/161/161Unlock.mp3",

    // LINK SPIN
    LinkIntro01         :   "sfx/slot/161/161LinkIntro01.mp3",
    LinkIntro02         :   "sfx/slot/161/161LinkIntro02.mp3",
    LsymLocking01       :   "sfx/slot/161/161LsymLocking01.mp3",
    LsymLocking02       :   "sfx/slot/161/161LsymLocking02.mp3",
    LsymLocking03       :   "sfx/slot/161/161LsymLocking03.mp3",
    LsymLocking04       :   "sfx/slot/161/161LsymLocking04.mp3",
    LJLocking           :   "sfx/slot/161/161LJLocking.mp3",
    LinkPoint           :   "sfx/slot/161/161LinkPoint.mp3",
    Frame               :   "sfx/slot/161/161Frame.mp3",
    Linktrail           :   "sfx/slot/161/161Linktrail.mp3",
    Linktrail02         :   "sfx/slot/161/161Linktrail02.mp3",
    LinkUnlock          :   "sfx/slot/161/161LinkUnlock.mp3",
    LinkUnlock02        :   "sfx/slot/161/161LinkUnlock02.mp3",
    LinkUnlock03        :   "sfx/slot/161/161LinkUnlock03.mp3",
    UnlockMach          :   "sfx/slot/161/161UnlockMach.mp3",
    LinkMerge           :   "sfx/slot/161/161LinkMerge.mp3",
    LinkSpin            :   "sfx/slot/161/161LinkSpin.mp3",
    LinkReelStop        :   "sfx/slot/161/161LinkReelStop.mp3",
    LinkReset           :   "sfx/slot/161/161LinkReset.mp3",
    LinkSum01           :   "sfx/slot/161/161LinkSum01.mp3",
    LinkSum02           :   "sfx/slot/161/161LinkSum02.mp3",
    LinkResult01        :   "sfx/slot/161/161LinkResult01.mp3",
    LinkResult02        :   "sfx/slot/161/161LinkResult02.mp3",

    // HOT SHOT
    HIntro              :   "sfx/slot/161/161HIntro.mp3",
    HSpin               :   "sfx/slot/161/161HSpin.mp3",
    HReelstop           :   "sfx/slot/161/161HReelstop.mp3",
    HReel               :   "sfx/slot/161/161HReel.mp3",
    JLocking            :   "sfx/slot/161/161JLocking.mp3",
    HLongSpin           :   "sfx/slot/161/161HLongSpin.mp3",

    // VOICE
    JVoice01            :   "sfx/slot/161/161JVoice01.mp3",
    JVoice02            :   "sfx/slot/161/161JVoice02.mp3",
    JVoice03            :   "sfx/slot/161/161JVoice03.mp3",
    JVoice04            :   "sfx/slot/161/161JVoice04.mp3",
    JVoice05            :   "sfx/slot/161/161JVoice05.mp3",
    JVoice06            :   "sfx/slot/161/161JVoice06.mp3",
    JVoice07            :   "sfx/slot/161/161JVoice07.mp3",
    JVoice08            :   "sfx/slot/161/161JVoice08.mp3"
};
window.g_sndZeusLinkAndHadesLink = ResPack.create( 'sndZeusLinkAndHadesLink', sndZeusLinkAndHadesLink ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ HoneyBeengoSplash BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndHoneyBeengoSplash = {
    Intro           : 'sfx/slot/171/171Intro.mp3',

    BGM             : 'sfx/slot/171/171Bgm.mp3',
    BGM_free      : 'sfx/slot/171/171FsBgm.mp3',
    BGM_mini       : 'sfx/slot/171/171MiniBgm.mp3',
    BGM_bingo       : 'sfx/slot/171/171BingoBgm.mp3',

    Spin                : 'sfx/slot/171/171Spin.mp3',
    ReelStop            : 'sfx/slot/171/171ReelStop.mp3',
    LongSpin            : 'sfx/slot/171/171Longspin.mp3',
    FreeGameSpinCount            : 'sfx/slot/171/171Count.mp3',
    FreeGameRetriggerTrail           : 'sfx/slot/171/171TrailRetrigger.mp3',

    DirectSymbolLock           : 'sfx/slot/171/171SLocking.mp3',
    MultiDirectSymbolLock           : 'sfx/slot/171/171MiniLocking01.mp3',
    MultiDirectSymbolLock2           : 'sfx/slot/171/171MiniLocking02.mp3',
    TriggerSymbolLock           : 'sfx/slot/171/171Fstrigger.mp3',
    // pot
    PotBonus            : 'sfx/slot/171/171PotOpen.mp3',
    PotUp            : 'sfx/slot/171/171PotPre.mp3',
    // trail
    PotTrail            : 'sfx/slot/171/171PotTrail01.mp3',
    DPTrailDP            : 'sfx/slot/171/171PotTrail02.mp3',
    DPTrailMini            : 'sfx/slot/171/171PotTrail03.mp3',
    DPTrailJackpot            : 'sfx/slot/171/171PotTrail04.mp3',

    MiniGame02FrameOpen : 'sfx/slot/171/171MiniFrame.mp3',
    MiniGame02FullReel : 'sfx/slot/171/171MiniPopup.mp3',
    // Minigame02Trail            : 'sfx/slot/171/171MiniTrail01.mp3',
    Minigame03Wheel           : 'sfx/slot/171/171MiniWheel.mp3',
    Minigame03WheelStop           : 'sfx/slot/171/171MiniWheelEnd.mp3',
    Minigame03Win           : 'sfx/slot/171/171MiniNoti.mp3',
    Minigame04LockUp           : 'sfx/slot/171/171MiniLocking01.mp3',
    Minigame04LockBunos           : 'sfx/slot/171/171MiniLocking02.mp3',
    Minigame04Up           : 'sfx/slot/171/171MiniUpgrade.mp3',
    Minigame04SpinAdd           : 'sfx/slot/171/171MiniRetrigger.mp3',
    MinigameWinTrail           : 'sfx/slot/171/171Minitrail.mp3',
    MinigameWin           : 'sfx/slot/171/171MiniResult.mp3',

    BingoIntro : 'sfx/slot/171/171BingoCheck.mp3',
    BingoMatch  : 'sfx/slot/171/171BingoMatch.mp3',
    BingoWin  : 'sfx/slot/171/171MiniEnd.mp3',
    BingoChange  : 'sfx/slot/171/171BingoReset.mp3',
    BingoChangeFreeGame  : 'sfx/slot/171/171FsReveal.mp3',
    BingoJackpotGet  : 'sfx/slot/171/171JackpotSym.mp3',
    BingoLine  : 'sfx/slot/171/171BingoFrame.mp3',

    TooltipOver  : 'sfx/slot/171/171TipOver.mp3',

    //minimap
    MiniMapOver             : 'sfx/slot/171/171MapOver.mp3',
    MiniMapClick            : 'sfx/slot/171/171MapClick.mp3',
    MiniMapUnlock           : 'sfx/slot/171/171Unlock.mp3',

    //map popup
    MapOpen                 : 'sfx/slot/171/171MapOpen.mp3',
    MapNormalGauge          : 'sfx/slot/171/171MapNormalGauge.mp3',
    MapSuperbonusGauge      : 'sfx/slot/171/171MapSuperbonusGauge.mp3',
    MapLastSuperbonusGuage  : 'sfx/slot/171/171MapLastSuperbonusGauge.mp3',

    // -- Counting
    MPayCount               : 'sfx/slot/171/171MPayCount.mp3',
    NPayCount01             : 'sfx/slot/171/171NPayCount01.mp3',
    NPayCount01End          : 'sfx/slot/171/171NPayCount01End.mp3',
    NPayCount02             : 'sfx/slot/171/171NPayCount02.mp3',
    NPayCount02End          : 'sfx/slot/171/171NPayCount02End.mp3',
    NPayCount03             : 'sfx/slot/171/171NPayCount03.mp3',
    NPayCount03End          : 'sfx/slot/171/171NPayCount03End.mp3',


    //popup
    JackpotPopup            : 'sfx/slot/171/171JackpotPopup.mp3',
    GrandJackpotPopup            : 'sfx/slot/171/171JVoice05.mp3',
    MegaJackpotPopup            : 'sfx/slot/171/171JVoice04.mp3',
    MajorJackpotPopup            : 'sfx/slot/171/171JVoice03.mp3',
    MinorJackpotPopup            : 'sfx/slot/171/171JVoice02.mp3',
    MajorPopup            : 'sfx/slot/171/171MajorPopup.mp3',
    BingoPopup            : 'sfx/slot/171/171BingoIntro.mp3',
    MiniGamePopup            : 'sfx/slot/171/171MiniIntro.mp3',
    MiniGame01Popup      : 'sfx/slot/171/171MiniVoice01.mp3',
    MiniGame02Popup      : 'sfx/slot/171/171MiniVoice02.mp3',
    MiniGame03Popup      : 'sfx/slot/171/171MiniVoice03.mp3',
    MiniGame04Popup      : 'sfx/slot/171/171MiniVoice04.mp3',
    FreeGamePopup            : 'sfx/slot/171/171FsIntro.mp3',
    SuperFreeGamePopup            : 'sfx/slot/171/171SuperFsIntro.mp3',
    // FreeRetriggerGamePopup            : 'sfx/slot/171/171FsRetrigger.mp3',
    FreeGameResultPopup            : 'sfx/slot/171/171FsResult.mp3',

    SplashSymbolLocking            : 'sfx/slot/171/171SpLocking.mp3',
    SplashSymbolTrail            : 'sfx/slot/171/171SpTrail.mp3',
    SplashSymbolChange            : 'sfx/slot/171/171Splash.mp3'
};
window.g_sndHoneyBeengoSplash = ResPack.create( 'sndHoneyBeengoSplash', sndHoneyBeengoSplash ).concat( g_sfxSlotCommon );
//-- ↑↑↑ HoneyBeengoSplash END ↑↑↑ -----------

//-- ↑↑↑ elToroParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndelToroParade = {
    Intro                 : 'sfx/slot/163/163Intro.mp3',
    Bgm                   : 'sfx/slot/163/163Bgm.mp3',
    MiniBgm               : 'sfx/slot/163/163MiniBgm.mp3',
    FsBgm                 : 'sfx/slot/163/163FsBgm.mp3',
    ReBgm                 : 'sfx/slot/163/163ReBgm.mp3',
    Spin                  : 'sfx/slot/163/163Spin.mp3',
    ReelStop              : 'sfx/slot/163/163ReelStop.mp3',
    MPayCount             : 'sfx/slot/163/163MPayCount.mp3',
    NPayCount01           : 'sfx/slot/163/163NPayCount01.mp3',
    NPayCount01End        : 'sfx/slot/163/163NPayCount01End.mp3',
    NPayCount02           : 'sfx/slot/163/163NPayCount02.mp3',
    NPayCount02End        : 'sfx/slot/163/163NPayCount02End.mp3',
    NPayCount03           : 'sfx/slot/163/163NPayCount03.mp3',
    NPayCount03End        : 'sfx/slot/163/163NPayCount03End.mp3',
    MajorPopup            : 'sfx/slot/163/163MajorPopup.mp3',
    JackpotPopup          : 'sfx/slot/163/163JackpotPopup.mp3',
    JackpotBoost          : 'sfx/slot/163/163JackpotBoost.mp3',
    BetChange             : 'sfx/slot/163/163BetChange.mp3',
    PotTrail              : 'sfx/slot/163/163PotTrail.mp3',
    PotPre                : 'sfx/slot/163/163PotPre.mp3',
    PotOpen               : 'sfx/slot/163/163PotOpen.mp3',
    RespinShake           : 'sfx/slot/163/163RespinShake.mp3',
    DoubleRespinShake     : 'sfx/slot/163/163DoubleRespinShake.mp3',
    ExtraJackpotLock      : 'sfx/slot/163/163ExtraJackpotLock.mp3',
    ExtraDirectpayLock    : 'sfx/slot/163/163ExtraDirectpayLock.mp3',
    ExtraMinigameLock     : 'sfx/slot/163/163ExtraMinigameLock.mp3',
    UpgradeLock           : 'sfx/slot/163/163UpgradeLock.mp3',
    ExtraSymPay           : 'sfx/slot/163/163ExtraSymPay.mp3',
    MiniMatch             : 'sfx/slot/163/163MiniMatch.mp3',
    Unlock                : 'sfx/slot/163/163Unlock.mp3',
    Longspin              : 'sfx/slot/163/163Longspin.mp3',
    PannelSum             : 'sfx/slot/163/163PannelSum.mp3',
    TipOver               : 'sfx/slot/163/163TipOver.mp3',
    MapOver               : 'sfx/slot/163/163MapOver.mp3',
    MapClick              : 'sfx/slot/163/163MapClick.mp3',
    MapOpen               : 'sfx/slot/163/163MapOpen.mp3',
    MapNormalGauge        : 'sfx/slot/163/163MapNormalGauge.mp3',
    MapSuperbonusGauge    : 'sfx/slot/163/163MapSuperbonusGauge.mp3',
    MapLastSuperbonusGauge: 'sfx/slot/163/163MapLastSuperbonusGauge.mp3',
    MinigameWild          : 'sfx/slot/163/163MinigameWild.mp3',
    MiniWildRush          : 'sfx/slot/163/163MiniWildRush.mp3',
    MiniRemove            : 'sfx/slot/163/163MiniRemove.mp3',
    MiniIntro             : 'sfx/slot/163/163MiniIntro.mp3',
    FsIntro               : 'sfx/slot/163/163FsIntro.mp3',
    SuperFsIntro          : 'sfx/slot/163/163SuperFsIntro.mp3',
    FsResult              : 'sfx/slot/163/163FsResult.mp3',
    JVoice01              : 'sfx/slot/163/163JVoice01.mp3',
    JVoice02              : 'sfx/slot/163/163JVoice02.mp3',
    JVoice03              : 'sfx/slot/163/163JVoice03.mp3',
    JVoice04              : 'sfx/slot/163/163JVoice04.mp3',
    JVoice05              : 'sfx/slot/163/163JVoice05.mp3',
    JVoice06              : 'sfx/slot/163/163JVoice06.mp3',
    JVoice07              : 'sfx/slot/163/163JVoice07.mp3',
    JVoice08              : 'sfx/slot/163/163JVoice08.mp3',
    JVoice09              : 'sfx/slot/163/163JVoice09.mp3',
    MiniVoice01           : 'sfx/slot/163/163MiniVoice01.mp3',
    MiniVoice02           : 'sfx/slot/163/163MiniVoice02.mp3',
    MiniVoice03           : 'sfx/slot/163/163MiniVoice03.mp3',
    MiniVoice04           : 'sfx/slot/163/163MiniVoice04.mp3',
    MiniVoice05           : 'sfx/slot/163/163MiniVoice05.mp3',
    MiniVoice06           : 'sfx/slot/163/163MiniVoice06.mp3',
    MiniVoice07           : 'sfx/slot/163/163MiniVoice07.mp3',
    SymVoice01            : 'sfx/slot/163/163SymVoice01.mp3',
    SymVoice02            : 'sfx/slot/163/163SymVoice02.mp3',
    SymVoice03            : 'sfx/slot/163/163SymVoice03.mp3',
    MiniLocking           : 'sfx/slot/163/163MiniLocking.mp3',
    PannelOff             : 'sfx/slot/163/163PannelOff.mp3',
    MiniNoti              : 'sfx/slot/163/163MiniNoti.mp3',
};
window.g_sndelToroParade = ResPack.create( 'sndelToroParade', sndelToroParade ).concat( g_sfxSlotCommon );
//-- ↑↑↑ elToroParade END ↑↑↑ -----------

//region -- ↓↓↓ TheTaleOfCinderella ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTheTaleOfCinderella = {
    // INTRO
    Intro               :'sfx/slot/164/164Intro.mp3',
    // BGM
    BGM                 : 'sfx/slot/164/164Bgm.mp3',
    BGM_Free            : 'sfx/slot/164/164FsBgm.mp3',

    ChangeBetHigh       : 'sfx/slot_Common/IntroBet01.mp3',
    ChangeBetLow        : 'sfx/slot_Common/IntroBet02.mp3',

    AddPotGauge         : 'sfx/slot/164/164Guage.mp3',
    OpenSuperReel       : 'sfx/slot/164/164Transform.mp3',
    UpgradeDP           : 'sfx/slot/164/164FsCount.mp3',
    TrailDp             : 'sfx/slot/164/164FsTrail.mp3',
    ChangeMakeOver      : 'sfx/slot/164/164FsTransform.mp3',
    PlayMajorParty      : 'sfx/slot/164/164FsSymbol.mp3',
    OpenFrame           : 'sfx/slot/164/164Frame01.mp3',
    OpenFrame3          : 'sfx/slot/164/164Frame02.mp3',
    WildExpand          : 'sfx/slot/164/164FsSpread.mp3',
    MajorLocking        : 'sfx/slot/164/164FLocking.mp3',

    Spin                : 'sfx/slot/164/164Spin.mp3',
    ReelStop            : 'sfx/slot/164/164ReelStop.mp3',
    LongSpin            : 'sfx/slot/164/164LongSpin.mp3',

    BigSymbol1          : 'sfx/slot/164/164Extend01.mp3',
    BigSymbol2          : 'sfx/slot/164/164Extend02.mp3',
    BigSymbol3          : 'sfx/slot/164/164Extend03.mp3',
    BigSymbol4          : 'sfx/slot/164/164Extend04.mp3',
    BigSymbol5          : 'sfx/slot/164/164Extend05.mp3',

    SLocking01          : 'sfx/slot/164/164SLocking01.mp3',
    SLocking03          : 'sfx/slot/164/164SLocking02.mp3',
    SLocking05          : 'sfx/slot/164/164SLocking03.mp3',
    SLockingF1          : 'sfx/slot/164/164SLocking03_1.mp3',
    SLockingF2          : 'sfx/slot/164/164SLocking03_2.mp3',
    SLockingF3          : 'sfx/slot/164/164SLocking03_3.mp3',
    SLockingF4          : 'sfx/slot/164/164SLocking03_4.mp3',
    SMatch              : 'sfx/slot/164/164SMatch.mp3',

    MPayCount           : 'sfx/slot/164/164MPayCount.mp3',
    NPayCount01         : 'sfx/slot/164/164NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/164/164NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/164/164NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/164/164NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/164/164NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/164/164NPayCount03End.mp3',

    MajorPopup          : 'sfx/slot/164/164MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/164/164JackpotPopup.mp3',
    JVoice01            : 'sfx/slot/164/164JVoice01.mp3',
    JVoice02            : 'sfx/slot/164/164JVoice02.mp3',
    JVoice03            : 'sfx/slot/164/164JVoice03.mp3',
    JVoice04            : 'sfx/slot/164/164JVoice04.mp3',
    JVoice05            : 'sfx/slot/164/164JVoice05.mp3',
    FreeSpinResultPopup : 'sfx/slot/164/164FsResult.mp3',
    FreeSpinPopup       : 'sfx/slot/164/164FsIntro.mp3',
    SuperFreeSpinPopup  : 'sfx/slot/164/164SuperFsIntro.mp3',
    FsVoice01          : 'sfx/slot/164/164FsVoice01.mp3',
    FsVoice02          : 'sfx/slot/164/164FsVoice02.mp3',
    FsVoice03          : 'sfx/slot/164/164FsVoice03.mp3',
    FsVoice04          : 'sfx/slot/164/164FsVoice04.mp3',
    RetriggerPopup      : 'sfx/slot/164/164Retrigger.mp3',
};
window.g_sndTheTaleOfCinderella = ResPack.create( 'sndTheTaleOfCinderella', sndTheTaleOfCinderella ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ FrogPrinceMagic ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFrogPrinceMagic = {
    // INTRO
    Intro               :   "sfx/slot/165/165Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/165/165Bgm.mp3",
    FGBgm               :   "sfx/slot/165/165FsBgm.mp3",
    LINKBgm             :   "sfx/slot/165/165LinkBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/165/165Spin.mp3",
    ReelStop            :   "sfx/slot/165/165ReelStop.mp3",
    MPayCount           :   "sfx/slot/165/165MPayCount.mp3",
    NPayCount01         :   "sfx/slot/165/165NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/165/165NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/165/165NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/165/165NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/165/165NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/165/165NPayCount03End.mp3",
    MajorPopup          :   "sfx/slot/165/165MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/165/165JackpotPopup.mp3",

    // NORMAL
    SLocking01          :   "sfx/slot/165/165SLocking01.mp3",
    SLocking02          :   "sfx/slot/165/165SLocking02.mp3",
    SLocking03          :   "sfx/slot/165/165SLocking03.mp3",
    SLocking04          :   "sfx/slot/165/165SLocking04.mp3",
    SLocking05          :   "sfx/slot/165/165SLocking05.mp3",
    WildExpand          :   "sfx/slot/165/165WTransform.mp3",
    Trail               :   "sfx/slot/165/165Trail.mp3",
    PotPre              :   "sfx/slot/165/165PotPre.mp3",
    PotOpen             :   "sfx/slot/165/165PotOpen.mp3",
    TipOver             :   "sfx/slot/165/165TipOver.mp3",
    Unlock              :   "sfx/slot/165/165Unlock.mp3",
    LongSpin            :   "sfx/slot/165/165Longspin.mp3",
    SMatch              :   "sfx/slot/165/165SMatch.mp3",

    // LINK SPIN
    LinkIntro           :   "sfx/slot/165/165LinkIntro.mp3",
    LsymLocking01       :   "sfx/slot/165/165LsymLocking01.mp3",
    LsymLocking02       :   "sfx/slot/165/165LsymLocking02.mp3",
    LinkTrail01         :   "sfx/slot/165/165Trail01.mp3",
    LinkTrail02         :   "sfx/slot/165/165Trail02.mp3",
    LinkLongSpin        :   "sfx/slot/165/165LinkLongSpin.mp3",
    LinkUpgradeLine     :   "sfx/slot/165/165LinkFrame.mp3",
    LinkUpgradeFX       :   "sfx/slot/165/165LinkUpgrade.mp3",
    LinkUpgrade2FX      :   "sfx/slot/165/165LinkUpgrade02.mp3",
    LinkUpgrade3FX      :   "sfx/slot/165/165LinkUpgrade03.mp3",
    LinkSpin            :   "sfx/slot/165/165LinkSpin.mp3",
    LinkReelStop        :   "sfx/slot/165/165LinkReelStop.mp3",
    LinkReset           :   "sfx/slot/165/165LinkReset.mp3",
    LinkBonusWin        :   "sfx/slot/165/165LinkPannel.mp3",
    LinkPannnelOff      :   "sfx/slot/165/165LinkPannelOff.mp3",
    LinkSum             :   "sfx/slot/165/165LinkSum.mp3",
    LinkResult          :   "sfx/slot/165/165LinkResult.mp3",

    // Free Game
    FGIntro             :   "sfx/slot/165/165FsIntro.mp3",
    FGRetrigger         :   "sfx/slot/165/165Retrigger.mp3",
    FGChange            :   "sfx/slot/165/165FsTransform.mp3",
    FGResult            :   "sfx/slot/165/165FsResult.mp3",

    // VOICE
    JVoice              :   "sfx/slot/165/165JVoice01.mp3",
};
window.g_sndFrogPrinceMagic = ResPack.create( 'sndFrogPrinceMagic', sndFrogPrinceMagic ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ FrogPrinceMagic ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndMrLuckysBakery = {
    // INTRO
    Intro               :   "sfx/slot/169/169Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/169/169Bgm.mp3",
    FGBgm               :   "sfx/slot/169/169FsBgm.mp3",
    MGBgm               :   "sfx/slot/169/169MiniBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/169/169Spin.mp3",
    ReelStop            :   "sfx/slot/169/169ReelStop.mp3",
    MPayCount           :   "sfx/slot/169/169MPayCount.mp3",
    NPayCount01         :   "sfx/slot/169/169NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/169/169NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/169/169NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/169/169NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/169/169NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/169/169NPayCount03End.mp3",
    MajorPopup          :   "sfx/slot/169/169MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/169/169JackpotPopup.mp3",

    // NORMAL
    JackpotMultiple     :   "sfx/slot/169/169JackpotBoost.mp3",
    SLocking1           :   "sfx/slot/169/169SLocking01.mp3",
    SLocking2           :   "sfx/slot/169/169SLocking02.mp3",
    SLocking3           :   "sfx/slot/169/169SLocking03.mp3",
    SLocking4           :   "sfx/slot/169/169SLocking04.mp3",
    SLocking5           :   "sfx/slot/169/169SLocking05.mp3",
    DLocking            :   "sfx/slot/169/169DLocking.mp3",
    DLocking1           :   "sfx/slot/169/169DLocking01.mp3",
    DLocking2           :   "sfx/slot/169/169DLocking02.mp3",
    DLocking3           :   "sfx/slot/169/169DLocking03.mp3",
    DLocking4           :   "sfx/slot/169/169DLocking04.mp3",
    DLocking5           :   "sfx/slot/169/169DLocking05.mp3",
    JLocking            :   "sfx/slot/169/169JLocking.mp3",
    MLocking            :   "sfx/slot/169/169MLocking.mp3",
    TLocking            :   "sfx/slot/169/169TitleJackpot.mp3",
    SMatch              :   "sfx/slot/169/169SMatch.mp3",
    WMatch              :   "sfx/slot/169/169WMatch.mp3",
    WMatch02            :   "sfx/slot/169/169WMatch02.mp3",
    WMatch03            :   "sfx/slot/169/169WMatch03.mp3",
    JMatch              :   "sfx/slot/169/169JMatch.mp3",
    MMatch              :   "sfx/slot/169/169MMatch.mp3",
    LongSpin            :   "sfx/slot/169/169Longspin.mp3",
    Unlock              :   "sfx/slot/169/169Unlock.mp3",
    TipOver             :   "sfx/slot/169/169TipOver.mp3",
    BonusWinPanelOpen   :   "sfx/slot/169/169PannelOn.mp3",
    BonusWinPanelClose  :   "sfx/slot/169/169PannelOff.mp3",

    MG_WildSticky       :   "sfx/slot/169/169MiniWild.mp3",
    MG_MultipleCount    :   "sfx/slot/169/169MiniMulti01.mp3",
    MG_DoubleSync       :   "sfx/slot/169/169MiniFrame.mp3",
    MG_MiniSum          :   "sfx/slot/169/169MiniSum.mp3",

    // Free Game
    FGIntro             :   "sfx/slot/169/169FsIntro.mp3",
    WLocking            :   "sfx/slot/169/169WLocking.mp3",
    FGRetrigger         :   "sfx/slot/169/169Retrigger.mp3",
    FGResult            :   "sfx/slot/169/169FsResult.mp3",

    // VOICE
    JVoice01            :   "sfx/slot/169/169JVoice01.mp3",
    JVoice02            :   "sfx/slot/169/169JVoice02.mp3",
    JVoice03            :   "sfx/slot/169/169JVoice03.mp3",
    JVoice04            :   "sfx/slot/169/169JVoice04.mp3",
    JVoice05            :   "sfx/slot/169/169JVoice05.mp3",
    JVoice06            :   "sfx/slot/169/169JVoice06.mp3",

    MG_Voice01          :   "sfx/slot/169/169MiniVoice01.mp3",
    MG_Voice02          :   "sfx/slot/169/169MiniVoice02.mp3",
    MG_Voice03          :   "sfx/slot/169/169MiniVoice03.mp3",
    MG_Voice04          :   "sfx/slot/169/169MiniVoice04.mp3"
};
window.g_sndMrLuckysBakery = ResPack.create( 'sndMrLuckysBakery', sndMrLuckysBakery ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ SherlockMysteryCard BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot166 = {
    // intro
    Intro               : 'sfx/slot/166/166Intro.mp3',
    FreeIntro           : 'sfx/slot/166/166FsIntro02.mp3',
    // bgm
    NormalBgm           : 'sfx/slot/166/166Bgm.mp3',
    FreeBgm             : 'sfx/slot/166/166FsBgm.mp3',
    // spin
    Spin                : 'sfx/slot/166/166Spin.mp3',
    ExtraSpin           : 'sfx/slot/166/166ExtraWheel.mp3',
    LongSpinFx          : 'sfx/slot/166/166Longspin.mp3',
    ReelStop            : 'sfx/slot/166/166ReelStop.mp3',
    // symbol
    ScatterLocking1     : 'sfx/slot/166/166SLocking01.mp3',
    ScatterLocking2     : 'sfx/slot/166/166SLocking02.mp3',
    ScatterLocking3     : 'sfx/slot/166/166SLocking03.mp3',
    ScatterLocking4     : 'sfx/slot/166/166SLocking04.mp3',
    ScatterLocking5     : 'sfx/slot/166/166SLocking05.mp3',
    MysteryLocking      : 'sfx/slot/166/166CLocking.mp3',
    CoinLocking         : 'sfx/slot/166/166CoinLocking.mp3',
    ScatterMatch        : 'sfx/slot/166/166SMatch.mp3',
    MysteryMatch        : 'sfx/slot/166/166ExtraMatch02.mp3',
    CoinMatch           : 'sfx/slot/166/166CoinMatch.mp3',
    CoinFlipDP          : 'sfx/slot/166/166CoinFlip01.mp3',
    CoinFlipFreespin    : 'sfx/slot/166/166CoinFlip02.mp3',
    CoinFlipJackpot     : 'sfx/slot/166/166CoinFlip03.mp3',
    CoinFlipReady       : 'sfx/slot/166/166CoinShake.mp3',
    // pot
    //PotCollect          : 'sfx/slot/166/166PotTrail.mp3',
    PotstepUp           : 'sfx/slot/166/166Potpre.mp3',
    PotOpen             : 'sfx/slot/166/166PotOpen.mp3',
    // trail
    TrailtoPot          : 'sfx/slot/166/166PotTrail.mp3',
    TrailtoMystery      : 'sfx/slot/166/166ExtraTrail02.mp3',
    // pay
    MPayCount           : 'sfx/slot/166/166MPayCount.mp3',
    NPayCount01         : 'sfx/slot/166/166NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/166/166NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/166/166NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/166/166NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/166/166NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/166/166NPayCount03End.mp3',
    // popup
    RespinIntro         : 'sfx/slot/166/166ExtraMatch.mp3',
    FreeSpinIntro       : 'sfx/slot/166/166FsIntro.mp3',
    FreeSpinRetrigger   : 'sfx/slot/166/166Retrigger.mp3',
    FreeSpinResult      : 'sfx/slot/166/166FsResult.mp3',
    JackpotPopup        : 'sfx/slot/166/166JackpotPopup.mp3',
    JackpotVoice0       : 'sfx/slot/166/166JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/166/166JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/166/166JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/166/166JVoice04.mp3',
    MajorwinPopup       : 'sfx/slot/166/166MajorPopup.mp3',
    // betting
    BetLimitOver        : 'sfx/slot/166/166Unlock.mp3',
    BetLimitUnder       : 'sfx/slot/166/166TipOver.mp3'
};
window.g_sndSlot166 = ResPack.create( 'sndSlot166', sndSlot166 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ SherlockMysteryCard END ↑↑↑ -----------

//-- ↑↑↑ PantherGold BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndPantherGold = {
    Intro            :   "sfx/slot/167/167Intro.mp3",
    Bgm              :   "sfx/slot/167/167Bgm.mp3",
    FsBgm            :   "sfx/slot/167/167FsBgm.mp3",
    Spin             :   "sfx/slot/167/167Spin.mp3",
    ReelStop         :   "sfx/slot/167/167ReelStop.mp3",
    MPayCount        :   "sfx/slot/167/167MPayCount.mp3",
    NPayCount01      :   "sfx/slot/167/167NPayCount01.mp3",
    NPayCount01End   :   "sfx/slot/167/167NPayCount01End.mp3",
    NPayCount02      :   "sfx/slot/167/167NPayCount02.mp3",
    NPayCount02End   :   "sfx/slot/167/167NPayCount02End.mp3",
    NPayCount03      :   "sfx/slot/167/167NPayCount03.mp3",
    NPayCount03End   :   "sfx/slot/167/167NPayCount03End.mp3",
    MajorPopup       :   "sfx/slot/167/167MajorPopup.mp3",
    PantherPay       :   "sfx/slot/167/167PantherPay.mp3",
    SLocking01       :   "sfx/slot/167/167SLocking01.mp3",
    SLocking02       :   "sfx/slot/167/167SLocking02.mp3",
    SLocking03       :   "sfx/slot/167/167SLocking03.mp3",
    SLocking04       :   "sfx/slot/167/167SLocking04.mp3",
    SLocking05       :   "sfx/slot/167/167SLocking05.mp3",
    MultiPay         :   "sfx/slot/167/167MultiPay.mp3",
    SMatch           :   "sfx/slot/167/167SMatch.mp3",
    LongSpin         :   "sfx/slot/167/167LongSpin.mp3",
    FSIntro          :   "sfx/slot/167/167FSIntro.mp3",
    Retrigger        :   "sfx/slot/167/167Retrigger.mp3",
    PantherTransform :   "sfx/slot/167/167PantherTransform.mp3",
    WildTransform    :   "sfx/slot/167/167WildTransform.mp3",
    SymbolTransform  :   "sfx/slot/167/167SymbolTransform.mp3",
    TransformNoti    :   "sfx/slot/167/167TransformNoti.mp3",
    TransformNoti02  :   "sfx/slot/167/167TransformNoti02.mp3",
    FsResult         :   "sfx/slot/167/167FsResult.mp3",
    TVoice01         :   "sfx/slot/167/167TVoice01.mp3",
    TVoice02         :   "sfx/slot/167/167TVoice02.mp3",
};
window.g_sndPantherGold = ResPack.create( 'sndPantherGold', sndPantherGold ).concat( g_sfxSlotCommon );
//-- ↑↑↑ PantherGold END ↑↑↑ -----------

//region -- ↓↓↓ ExcaliburSwordOfMagic ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndExcaliburSwordOfMagic = {
    // INTRO
    Intro               :'sfx/slot/168/168Intro.mp3',
    // BGM
    BGM                 : 'sfx/slot/168/168Bgm.mp3',
    BGM_FreeA           : 'sfx/slot/168/168CollectBgm.mp3',
    BGM_FreeB           : 'sfx/slot/168/168FsBgm.mp3',
    BGM_Link            : 'sfx/slot/168/168LinkBgm.mp3',

    TooltipOpen         : 'sfx/slot/168/168TipOver.mp3',
    TooltipClose        : 'sfx/slot/168/168Unlock.mp3',

    Spin                : 'sfx/slot/168/168Spin.mp3',
    ReelStop            : 'sfx/slot/168/168ReelStop.mp3',
    LongSpin            : 'sfx/slot/168/168Longspin.mp3',
    SLock1              : 'sfx/slot/168/168SLocking01.mp3',
    SLock2              : 'sfx/slot/168/168SLocking02.mp3',
    SLock3              : 'sfx/slot/168/168SLocking03.mp3',
    SLock4              : 'sfx/slot/168/168SLocking04.mp3',
    SLock5              : 'sfx/slot/168/168SLocking05.mp3',
    SMatch              : 'sfx/slot/168/168SMatch.mp3',
    CMatch              : 'sfx/slot/168/168CLocking.mp3',
    CIntro              : 'sfx/slot/168/168CIntro02.mp3',
    CRandom             : 'sfx/slot/168/168CMagic.mp3',
    DLock               : 'sfx/slot/168/168DLocking.mp3',
    DLock2              : 'sfx/slot/168/168DLocking02.mp3',
    COut                : 'sfx/slot/168/168COutro.mp3',
    WOpen               : 'sfx/slot/168/168WildTranstion01.mp3',
    WChange             : 'sfx/slot/168/168WildTranstion02.mp3',

    LinkSpin            : 'sfx/slot/168/168LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/168/168LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/168/168LinkLongSpin.mp3',
    LinkCountUp         : 'sfx/slot/168/168LinkReset.mp3',
    LinkTrailDP         : 'sfx/slot/168/168LinkTrail03.mp3',
    LinkTrailEachWin    : 'sfx/slot/168/168LinkTrail01.mp3',
    LinkTrailAllWin     : 'sfx/slot/168/168LinkTrail02.mp3',
    LinkTrailWin        : 'sfx/slot/168/168LinkSum.mp3',
    LinkDLock           : 'sfx/slot/168/168LsymLocking01.mp3',
    LinkELock           : 'sfx/slot/168/168LsymLocking02.mp3',
    LinkALock           : 'sfx/slot/168/168LsymLocking03.mp3',

    WheelIntro          : 'sfx/slot/168/168WheelIntro.mp3',
    WheelSpin           : 'sfx/slot/168/168WheelSpin.mp3',
    WheelIndiHighlight  : 'sfx/slot/168/168WheelNoti.mp3',
    WheelJackpot        : 'sfx/slot/168/168WheelMatch02.mp3',
    WheelBonusGame      : 'sfx/slot/168/168WheelMatch01.mp3',

    MPayCount           : 'sfx/slot/168/168MPayCount.mp3',
    NPayCount01         : 'sfx/slot/168/168NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/168/168NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/168/168NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/168/168NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/168/168NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/168/168NPayCount03End.mp3',

    MajorPopup              : 'sfx/slot/168/168MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/168/168JackpotPopup.mp3',
    // JVoice01            : 'sfx/slot/164/168JVoice01.mp3',
    JVoice02                : 'sfx/slot/168/168JVoice01.mp3',
    JVoice03                : 'sfx/slot/168/168JVoice02.mp3',
    JVoice04                : 'sfx/slot/168/168JVoice03.mp3',
    JVoice05                : 'sfx/slot/168/168JVoice04.mp3',
    FreeSpinIntroPopupA     : 'sfx/slot/168/168CIntro01.mp3',
    FreeSpinResultPopupA    : 'sfx/slot/168/168CResult.mp3',
    FreeSpinIntroPopupB     : 'sfx/slot/168/168FsIntro.mp3',
    FreeSpinResultPopupB    : 'sfx/slot/168/168FsResult.mp3',
    LinkGameIntroPopup      : 'sfx/slot/168/168LinkIntro.mp3',
    LinkGameResultPopup     : 'sfx/slot/168/168LinkResult.mp3'
};
window.g_sndExcaliburSwordOfMagic = ResPack.create( 'sndExcaliburSwordOfMagic', sndExcaliburSwordOfMagic ).concat( g_sfxSlotCommon );
//endregion

//-- ↓↓↓ GoblinsTreasures BEGIN ↓↓↓ -------------------------------------------------------------------------------------//
window.sndGoblinsTreasures = {
    Intro                : "sfx/slot/170/170Intro.mp3",
    Bgm                  : "sfx/slot/170/170Bgm.mp3",
    FsBgm                : "sfx/slot/170/170FsBgm.mp3",
    Spin                 : "sfx/slot/170/170Spin.mp3",
    ReelStop             : "sfx/slot/170/170ReelStop.mp3",
    MPayCount            : "sfx/slot/170/170MPayCount.mp3",
    NPayCount01          : "sfx/slot/170/170NPayCount01.mp3",
    NPayCount01End       : "sfx/slot/170/170NPayCount01End.mp3",
    NPayCount02          : "sfx/slot/170/170NPayCount02.mp3",
    NPayCount02End       : "sfx/slot/170/170NPayCount02End.mp3",
    NPayCount03          : "sfx/slot/170/170NPayCount03.mp3",
    NPayCount03End       : "sfx/slot/170/170NPayCount03End.mp3",
    MajorPopup           : "sfx/slot/170/170MajorPopup.mp3",
    JackpotPopup         : "sfx/slot/170/170JackpotPopup.mp3",
    SLocking01           : "sfx/slot/170/170SLocking01.mp3",
    SLocking02           : "sfx/slot/170/170SLocking02.mp3",
    SLocking03           : "sfx/slot/170/170SLocking03.mp3",
    SLocking04           : "sfx/slot/170/170SLocking04.mp3",
    SLocking05           : "sfx/slot/170/170SLocking05.mp3",
    PotTrail             : "sfx/slot/170/170PotTrail.mp3",
    PotPre               : "sfx/slot/170/170PotPre.mp3",
    PotOpen              : "sfx/slot/170/170PotOpen.mp3",
    PotChange            : "sfx/slot/170/170PotChange.mp3",
    SMatch               : "sfx/slot/170/170SMatch.mp3",
    Count                : "sfx/slot/170/170Count.mp3",
    Longspin             : "sfx/slot/170/170Longspin.mp3",
    TipOver              : "sfx/slot/170/170TipOver.mp3",
    JLocking             : "sfx/slot/170/170JLocking.mp3",
    FsIntro              : "sfx/slot/170/170FsIntro.mp3",
    SuperFsIntro         : "sfx/slot/170/170SuperFsIntro.mp3",
    FsTrail              : "sfx/slot/170/170FsTrail.mp3",
    FsUnlock             : "sfx/slot/170/170FsUnlock.mp3",
    FsPlus               : "sfx/slot/170/170FsPlus.mp3",
    FsResult             : "sfx/slot/170/170FsResult.mp3",
    JVoice01             : "sfx/slot/170/170JVoice01.mp3",
    FsPre01             : "sfx/slot/170/170FsPre01.mp3",
    FsPre02             : "sfx/slot/170/170FsPre02.mp3",
    FsUnlock02          : "sfx/slot/170/170FsUnlock02.mp3"
};
window.g_sndGoblinsTreasures = ResPack.create( 'sndGoblinsTreasures', sndGoblinsTreasures ).concat( g_sfxSlotCommon );
//-- ↑↑↑ GoblinsTreasures END ↑↑↑ -----------

//-- ↑↑↑ WildWestGoldCard BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot172 = {
    // intro
    Intro               : 'sfx/slot/172/172Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/172/172Bgm.mp3',
    PickBgm             : 'sfx/slot/172/172PickBgm.mp3',
    FreeBgm             : 'sfx/slot/172/172FsBgm.mp3',

    // spin
    Spin                : 'sfx/slot/172/172Spin.mp3',
    ReelStop            : 'sfx/slot/172/172ReelStop.mp3',
    LongSpinFx          : 'sfx/slot/172/172Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/172/172MPayCount.mp3',
    NPayCount01         : 'sfx/slot/172/172NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/172/172NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/172/172NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/172/172NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/172/172NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/172/172NPayCount03End.mp3',

    // symbol
    ScatterLocking0     : 'sfx/slot/172/172SLocking01.mp3',
    ScatterLocking1     : 'sfx/slot/172/172SLocking02.mp3',
    ScatterLocking2     : 'sfx/slot/172/172SLocking03.mp3',
    ScatterLocking3     : 'sfx/slot/172/172SLocking04.mp3',
    ScatterLocking4     : 'sfx/slot/172/172SLocking05.mp3',
    JackpotLocking      : 'sfx/slot/172/172FsJLocking.mp3',
    ScatterMatch        : 'sfx/slot/172/172SMatch.mp3',
    RandomWildLocking   : 'sfx/slot/172/172FsWild01.mp3',
    MovingWildMoving    : 'sfx/slot/172/172FsWild02.mp3',
    WildReelIntro       : 'sfx/slot/172/172FsWild03.mp3',
    MovingWildLocking   : 'sfx/slot/172/172FsWild04.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/172/172MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/172/172JackpotPopup.mp3',
    FreespinIntroPopup0 : 'sfx/slot/172/172PickIntro.mp3',
    FreespinIntroPopup1 : 'sfx/slot/172/172Retrigger.mp3',
    FreespinResultPopup : 'sfx/slot/172/172FsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/172/172JVoice05.mp3',
    JackpotVoice1       : 'sfx/slot/172/172JVoice01.mp3',
    JackpotVoice2       : 'sfx/slot/172/172JVoice02.mp3',
    JackpotVoice3       : 'sfx/slot/172/172JVoice03.mp3',
    JackpotVoice4       : 'sfx/slot/172/172JVoice04.mp3',

    // pickgame
    PickClick           : 'sfx/slot/172/172Pick01.mp3',
    PickFlip            : 'sfx/slot/172/172PickResult.mp3',
    PickOpenFree        : 'sfx/slot/172/172Pick02.mp3',
    PickOpenWild        : 'sfx/slot/172/172Pick03.mp3',
    PickOpenJackpot     : 'sfx/slot/172/172Pick04.mp3',
    PickOpenGold        : 'sfx/slot/172/172Pick05.mp3',
    PickGoldType6       : 'sfx/slot/172/172MiniVoice03.mp3',
    PickGoldType7       : 'sfx/slot/172/172MiniVoice02.mp3',
    PickGoldType8       : 'sfx/slot/172/172MiniVoice01.mp3',
    PickCount1          : 'sfx/slot/172/172FsVoice01.mp3',
    PickCount2          : 'sfx/slot/172/172FsVoice02.mp3',
    PickCount3          : 'sfx/slot/172/172FsVoice03.mp3',
    PickCount4          : 'sfx/slot/172/172FsVoice04.mp3',
    PickCount5          : 'sfx/slot/172/172FsVoice05.mp3',

    //
    DoorOpen            : 'sfx/slot/172/172SMatch02.mp3',
    JackpotBonusPoint   : 'sfx/slot/172/172JackpotCount.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/172/172Unlock.mp3',
    BetLimitUnder       : 'sfx/slot/172/172TipOver.mp3',

    // buy bonus
    BuyBonusIntro       : 'sfx/slot/172/172BonusIntro.mp3',
    BuyBonusBtnClick    : 'sfx/slot/172/172BonusBtn.mp3',
    BuyBonusWheelSpin   : 'sfx/slot/172/172BonusWheel.mp3',
    BuyBonusWheelMatch  : 'sfx/slot/172/172BonusMatch.mp3'
};
window.g_sndSlot172 = ResPack.create( 'sndSlot172', sndSlot172 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ WildWestGoldCard END ↑↑↑ -----------

//-- ↓↓↓ RollingInMoneyBlast ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot175 = {

    Intro               : 'sfx/slot/175/175Intro.mp3',    //v

    // -- BGM
    Bgm                 : 'sfx/slot/175/175Bgm.mp3',      //v
    LinkBgm             : 'sfx/slot/175/175LinkBgm.mp3',  //v

    // -- Spin
    Spin                : 'sfx/slot/175/175Spin.mp3',     //v
    ReelStop            : 'sfx/slot/175/175ReelStop.mp3',  //v
    LinkSpin            : 'sfx/slot/175/175LinkSpin.mp3',     //v
    LinkReelstop        : 'sfx/slot/175/175LinkReelstop.mp3',     //v

    // -- Counting
    MPayCount           : 'sfx/slot/175/175MPayCount.mp3',        //v
    NPayCount01         : 'sfx/slot/175/175NPayCount01.mp3',      //v
    NPayCount01End      : 'sfx/slot/175/175NPayCount01End.mp3',   //v
    NPayCount02         : 'sfx/slot/175/175NPayCount02.mp3',      //v
    NPayCount02End      : 'sfx/slot/175/175NPayCount02End.mp3',   //v
    NPayCount03         : 'sfx/slot/175/175NPayCount03.mp3',      //v
    NPayCount03End      : 'sfx/slot/175/175NPayCount03End.mp3',   //v

    // -- PopUp
    MajorPopup          : 'sfx/slot/175/175MajorPopup.mp3',     //v
    JackpotPopup        : 'sfx/slot/175/175JackpotPopup.mp3',   //v
    LinkResult          : 'sfx/slot/175/175LinkResult.mp3',     //v
    LinkIntro0         : 'sfx/slot/175/175LinkIntro.mp3',      //A
    LinkIntro1         : 'sfx/slot/175/175BLinkIntro.mp3',     //A

    JackpotVoice0       : 'sfx/slot/175/175JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/175/175JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/175/175JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/175/175JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/175/175JVoice05.mp3',       //A


    // -- Symbol
    Locking01           : 'sfx/slot/175/175SLocking01.mp3',     //v
    Locking02           : 'sfx/slot/175/175SLocking02.mp3',    //v
    Locking03           : 'sfx/slot/175/175SLocking03.mp3',    //v
    Locking04           : 'sfx/slot/175/175SLocking04.mp3',    //v
    Locking05           : 'sfx/slot/175/175SLocking05.mp3',    //v

    JsymLocking01       : 'sfx/slot/175/175JsymLocking01.mp3',   //v
    JsymLocking02       : "sfx/slot/175/175JsymLocking02.mp3", //v
    JsymLocking03       : "sfx/slot/175/175JsymLocking03.mp3", //v
    JsymLocking04       : "sfx/slot/175/175JsymLocking04.mp3", //v
    JsymLocking05       : "sfx/slot/175/175JsymLocking05.mp3", //v

    BLocking            : 'sfx/slot/175/175BLocking.mp3',       //A
    BUpgrade            : 'sfx/slot/175/175LinkUpgrade.mp3',    //A

    LLocking            : "sfx/slot/175/175LLocking.mp3",
    NLocking            : 'sfx/slot/175/175NLocking.mp3',         //?
    TsymLocking         : 'sfx/slot/175/175TsymLocking.mp3',      //?
    LBLocking           : 'sfx/slot/175/175LBLocking.mp3',       //A

    Match               : 'sfx/slot/175/175SLockingMatch.mp3',         //?

    // -- Fx
    LongSpin            : 'sfx/slot/175/175Longspin.mp3',       //V
    LinkCount            : 'sfx/slot/175/175LinkCount.mp3',     //v
    LinkReset           : 'sfx/slot/175/175LinkReset.mp3',         //V
    Unlock              : 'sfx/slot/175/175Unlock.mp3',          //v
    Unlock02            : 'sfx/slot/175/175Unlock02.mp3',          //v
    PotCountUp          : 'sfx/slot/175/175Count.mp3',          //A
    PotOpen             : 'sfx/slot/175/175BPotOpen.mp3',               //A

    // -- Trail
    LinkSum             : 'sfx/slot/175/175LinkSum.mp3',          //v
    LinkSymTrail01      : 'sfx/slot/175/175LinkSymTrail01.mp3',   //v
    LinkSymTrail02      : 'sfx/slot/175/175LinkSymTrail02.mp3'   //v
};
window.g_sndSlot175 = ResPack.create( 'sndSlot175', sndSlot175 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ RollingInMoneyBlast ↑↑↑ -------------------------------------------------------------------------------------//

//region -- ↓↓↓ TripleFortune ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndTripleFortune = {
    // INTRO
    Intro               :   "sfx/slot/173/173Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/173/173Bgm.mp3",
    FGBgm               :   "sfx/slot/173/173FsBgm.mp3",
    LBgm                :   "sfx/slot/173/173LinkBgm.mp3",
    CBgm                :   "sfx/slot/173/173CollectBgm.mp3",

    // PAY
    Spin                : "sfx/slot/173/173Spin.mp3",
    ReelStop            : "sfx/slot/173/173ReelStop.mp3",
    MPayCount           : "sfx/slot/173/173MPayCount.mp3",
    NPayCount01         : "sfx/slot/173/173NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/173/173NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/173/173NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/173/173NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/173/173NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/173/173NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/173/173MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/173/173JackpotPopup.mp3",

    // NORMAL
    SLocking1           : "sfx/slot/173/173SLocking01.mp3",
    SLocking2           : "sfx/slot/173/173SLocking02.mp3",
    SLocking3           : "sfx/slot/173/173SLocking03.mp3",
    SLocking4           : "sfx/slot/173/173SLocking04.mp3",
    SLocking5           : "sfx/slot/173/173SLocking05.mp3",
    SMatch              : "sfx/slot/173/173SMatch.mp3",
    Trail               : "sfx/slot/173/173Trail.mp3",
    PotPre              : "sfx/slot/173/173PotPre.mp3",
    PotOpen             : "sfx/slot/173/173PotOpen01.mp3",
    PotSuperOpen        : "sfx/slot/173/173PotOpen02.mp3",
    LongSpin            : "sfx/slot/173/173Longspin.mp3",
    Unlock              : "sfx/slot/173/173Unlock.mp3",
    TipOver             : "sfx/slot/173/173TipOver.mp3",

    //LINK GAME
    LG_Intro            : "sfx/slot/173/173LinkIntro.mp3",
    LG_Ice              : "sfx/slot/173/173Block.mp3",
    LG_SuperIntro       : "sfx/slot/173/173SuperLinkIntro.mp3",
    LG_Lock01           : "sfx/slot/173/173LsymLocking01.mp3",
    LG_Lock02           : "sfx/slot/173/173LsymLocking02.mp3",
    LG_Lock03           : "sfx/slot/173/173LsymLocking03.mp3",
    LG_Spin             : "sfx/slot/173/173LinkSpin.mp3",
    LG_AddCount         : "sfx/slot/173/173LinkReset.mp3",
    LG_ReelStop         : "sfx/slot/173/173LinkReelstop.mp3",
    LG_Frame            : "sfx/slot/173/173LinkFrame.mp3",
    LG_Drop             : "sfx/slot/173/173LinkDrop.mp3",
    LG_Crack             : "sfx/slot/173/173LinkCrack.mp3",
    LG_Utile1           : "sfx/slot/173/173LinkUtil01.mp3",
    LG_Utile2           : "sfx/slot/173/173LinkUtil02.mp3",
    LG_Utile3           : "sfx/slot/173/173LinkUtil03.mp3",
    LG_Utile4           : "sfx/slot/173/173LinkUtil04.mp3",
    LG_UnLock           : "sfx/slot/173/173LinkUnlock.mp3",
    LG_Sum              : "sfx/slot/173/173LinkSum.mp3",
    LG_Result           : "sfx/slot/173/173LinkResult.mp3",

    //FREE GAME
    FG_Intro             : "sfx/slot/173/173FsIntro.mp3",
    FG_SuperIntro        : "sfx/slot/173/173SuperFsIntro.mp3",
    FG_Retrigger         : "sfx/slot/173/173Retrigger.mp3",
    FG_OpenBonusWin      : "sfx/slot/173/173WinpannelOpen.mp3",
    FG_CLosenBonusWin    : "sfx/slot/173/173WinpannelClose.mp3",
    FG_RemoveIntro       : "sfx/slot/173/173FsNoti.mp3",
    FG_Result            : "sfx/slot/173/173FsResult.mp3",

    //COLLECT GAME
    CG_Intro            :   "sfx/slot/173/173BonusIntro.mp3",
    CG_SuperIntro       :   "sfx/slot/173/173SuperBonusIntro.mp3",
    CG_Spin             :   "sfx/slot/173/173BonusSpinStart.mp3",
    CG_ReelStop         :   "sfx/slot/173/173BonusReelStop.mp3",
    CG_Locking1         :   "sfx/slot/173/173BonusLocking01.mp3",
    CG_Locking2         :   "sfx/slot/173/173BonusLocking02.mp3",
    CG_Upgrade          :   "sfx/slot/173/173BonusUpgrade.mp3",
    CG_Match1           :   "sfx/slot/173/173BonusMatch01.mp3",
    CG_Match2           :   "sfx/slot/173/173BonusMatch02.mp3",
    CG_BonusSum         :   "sfx/slot/173/173BonusSum.mp3",
    CG_BonusResult      :   "sfx/slot/173/173BonusResult.mp3",

    // VOICE
    JVoice01            :   "sfx/slot/173/173JVoice01.mp3",
    JVoice02            :   "sfx/slot/173/173JVoice02.mp3",
    JVoice03            :   "sfx/slot/173/173JVoice03.mp3",
    JVoice04            :   "sfx/slot/173/173JVoice04.mp3",
    JVoice05            :   "sfx/slot/173/173JVoice05.mp3"
};
window.g_sndTripleFortune = ResPack.create( "sndTripleFortune", sndTripleFortune ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ LegendOfTheJungle ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndLegendOfTheJungle = {
    // INTRO
    Intro               :   "sfx/slot/174/174Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/174/174Bgm.mp3",
    FGBgm               :   "sfx/slot/174/174FsBgm.mp3",
    LinkBgm             :   "sfx/slot/174/174LinkBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/174/174Spin.mp3",
    ReelStop            :   "sfx/slot/174/174ReelStop.mp3",
    MPayCount           :   "sfx/slot/174/174MPayCount.mp3",
    NPayCount01         :   "sfx/slot/174/174NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/174/174NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/174/174NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/174/174NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/174/174NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/174/174NPayCount03End.mp3",
    MajorPopup          :   "sfx/slot/174/174MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/174/174JackpotPopup.mp3",

    // NORMAL
    SLocking1           :   "sfx/slot/174/174SLocking01.mp3",
    SLocking2           :   "sfx/slot/174/174SLocking02.mp3",
    SLocking3           :   "sfx/slot/174/174SLocking03.mp3",
    SLocking4           :   "sfx/slot/174/174SLocking04.mp3",
    SLocking5           :   "sfx/slot/174/174SLocking05.mp3",

    Trail               :   "sfx/slot/174/174Trail.mp3",
    PotPre              :   "sfx/slot/174/174PotPre.mp3",
    PotOpen             :   "sfx/slot/174/174PotOpen.mp3",
    SMatch              :   "sfx/slot/174/174SMatch.mp3",
    Unlock              :   "sfx/slot/174/174Unlock.mp3",
    TipOver             :   "sfx/slot/174/174TipOver.mp3",
    Longspin            :   "sfx/slot/174/174Longspin.mp3",

    // Link Game
    LinkIntro           :   "sfx/slot/174/174LinkIntro.mp3",
    LinkSpin            :   "sfx/slot/174/174LinkSpin.mp3",
    LinkCount           :   "sfx/slot/174/174LinkCount.mp3",
    LinkReelstop        :   "sfx/slot/174/174LinkReelstop.mp3",
    LLocking01          :   "sfx/slot/174/174LLocking01.mp3",
    LLocking02          :   "sfx/slot/174/174LLocking02.mp3",
    LLocking03          :   "sfx/slot/174/174LLocking03.mp3",
    LLocking04          :   "sfx/slot/174/174LLocking04.mp3",
    LinkFrameUp         :   "sfx/slot/174/174LinkFrameUp.mp3",
    LinkSymTrail01      :   "sfx/slot/174/174LinkSymTrail01.mp3",
    LinkSymTrail02      :   "sfx/slot/174/174LinkSymTrail02.mp3",
    Frame01             :   "sfx/slot/174/174Frame01.mp3",
    Frame02             :   "sfx/slot/174/174Frame02.mp3",
    Frame03             :   "sfx/slot/174/174Frame03.mp3",
    LinkReset           :   "sfx/slot/174/174LinkReset.mp3",
    LinkSum             :   "sfx/slot/174/174LinkSum.mp3",
    LinkResult          :   "sfx/slot/174/174LinkResult.mp3",
    LinkLongSpin        :   "sfx/slot/174/174LinkLongspin.mp3",

    // Free Game
    FsIntro             :   "sfx/slot/174/174FsIntro.mp3",
    Retrigger           :   "sfx/slot/174/174Retrigger.mp3",
    FsResult            :   "sfx/slot/174/174FsResult.mp3",
    Sum                 :   "sfx/slot/174/174Sum.mp3",

    // VOICE
    JVoice            :   "sfx/slot/174/174JVoice.mp3",
};
window.g_sndLegendOfTheJungle = ResPack.create( 'sndLegendOfTheJungle', sndLegendOfTheJungle ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ SpookyMansion BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSpookyMansion = {
    Intro                : "sfx/slot/176/176Intro.mp3",
    Bgm                  : "sfx/slot/176/176Bgm.mp3",
    LinkBgm              : "sfx/slot/176/176LinkBgm.mp3",
    Spin                 : "sfx/slot/176/176Spin.mp3",
    ReelStop             : "sfx/slot/176/176ReelStop.mp3",
    MPayCount            : "sfx/slot/176/176MPayCount.mp3",
    NPayCount01          : "sfx/slot/176/176NPayCount01.mp3",
    NPayCount01End       : "sfx/slot/176/176NPayCount01End.mp3",
    NPayCount02          : "sfx/slot/176/176NPayCount02.mp3",
    NPayCount02End       : "sfx/slot/176/176NPayCount02End.mp3",
    NPayCount03          : "sfx/slot/176/176NPayCount03.mp3",
    NPayCount03End       : "sfx/slot/176/176NPayCount03End.mp3",
    MajorPopup           : "sfx/slot/176/176MajorPopup.mp3",
    JackpotPopup         : "sfx/slot/176/176JackpotPopup.mp3",
    SLocking01           : "sfx/slot/176/176SLocking01.mp3",
    SLocking02           : "sfx/slot/176/176SLocking02.mp3",
    SLocking03           : "sfx/slot/176/176SLocking03.mp3",
    SLocking04           : "sfx/slot/176/176SLocking04.mp3",
    SLocking05           : "sfx/slot/176/176SLocking05.mp3",
    ELocking01           : "sfx/slot/176/176ELocking01.mp3",
    ELocking02           : "sfx/slot/176/176ELocking02.mp3",
    ELocking03           : "sfx/slot/176/176ELocking03.mp3",
    ELocking04           : "sfx/slot/176/176ELocking04.mp3",
    ELocking05           : "sfx/slot/176/176ELocking05.mp3",
    JLocking             : "sfx/slot/176/176JLocking.mp3",
    Trail                : "sfx/slot/176/176Trail.mp3",
    PotPre               : "sfx/slot/176/176PotPre.mp3",
    PotOpen              : "sfx/slot/176/176PotOpen.mp3",
    SMatch               : "sfx/slot/176/176SMatch.mp3",
    Unlock               : "sfx/slot/176/176Unlock.mp3",

    TipOver              : "sfx/slot/176/176TipOver.mp3",

    Longspin             : "sfx/slot/176/176Longspin.mp3",
    LinkIntro            : "sfx/slot/176/176LinkIntro.mp3",
    SuperLinkIntro       : "sfx/slot/176/176SuperLinkIntro.mp3",
    LsymLocking01        : "sfx/slot/176/176LsymLocking01.mp3",
    LsymLocking02        : "sfx/slot/176/176LsymLocking02.mp3",
    LsymLocking03        : "sfx/slot/176/176LsymLocking03.mp3",
    LsymLocking04        : "sfx/slot/176/176LsymLocking04.mp3",
    LinkSpin             : "sfx/slot/176/176LinkSpin.mp3",
    LinkReset            : "sfx/slot/176/176LinkReset.mp3",
    LinkReelstop         : "sfx/slot/176/176LinkReelstop.mp3",
    LinkLantern          : "sfx/slot/176/176LinkLantern.mp3",
    LinkTrail            : "sfx/slot/176/176LinkTrail.mp3",
    LinkUnlock01         : "sfx/slot/176/176LinkUnlock01.mp3",
    LinkUnlock02         : "sfx/slot/176/176LinkUnlock02.mp3",
    WinpannelOpen        : "sfx/slot/176/176WinpannelOpen.mp3",
    WinpannelClose       : "sfx/slot/176/176WinpannelClose.mp3",
    LinkSum              : "sfx/slot/176/176LinkSum.mp3",
    LinkResult           : "sfx/slot/176/176LinkResult.mp3",
    MapOver              : "sfx/slot/176/176MapOver.mp3",
    MapClick             : "sfx/slot/176/176MapClick.mp3",
    MapOpen              : "sfx/slot/176/176MapOpen.mp3",
    MapNormalGauge       : "sfx/slot/176/176MapNormalGauge.mp3",
    MapSuperbonusGauge   : "sfx/slot/176/176MapSuperbonusGauge.mp3",
    JVoice               : "sfx/slot/176/176JVoice.mp3",

    LinkLantern02        : "sfx/slot/176/176LinkLantern02.mp3",
    LinkUpgrade          : "sfx/slot/176/176LinkUpgrade.mp3",
    EachUpgrade          : "sfx/slot/176/176EachUpgrade.mp3",

    LinkUpgrade02          : "sfx/slot/176/176LinkUpgrade02.mp3",
    LinkLongspin         : "sfx/slot/176/176LinkLongspin.mp3"

};
window.g_sndSpookyMansion = ResPack.create( 'sndSpookyMansion', sndSpookyMansion ).concat( g_sfxSlotCommon );
//-- ↑↑↑ SpookyMansion ↑↑↑ -------------------------------------------------------------------------------------//

//-- ↑↑↑ MoreMoreAcorns BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot177 = {
    // intro
    Intro               : 'sfx/slot/177/177Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/177/177Bgm.mp3',
    FreeBgm             : 'sfx/slot/177/177FsBgm.mp3',
    WheelBgm            : 'sfx/slot/177/177WheelBgm.mp3',
    LinkBgm             : 'sfx/slot/177/177LinkBgm.mp3',

    // UI
    RestoreLinkSpinCount: 'sfx/slot/177/177LinkReset.mp3',
    ResultUINodeOpen    : 'sfx/slot/177/177LinkPannel.mp3',

    PrevAcornTrail      : 'sfx/slot/177/177AMatch.mp3',


    // normal spin
    Spin                : 'sfx/slot/177/177Spin.mp3',
    ReelStop            : 'sfx/slot/177/177ReelStop.mp3',
    LongSpinFx          : 'sfx/slot/177/177Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/177/177LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/177/177LinkReelStop.mp3',
    LinkLongSpinFx      : 'sfx/slot/177/177LinkLongspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/177/177MPayCount.mp3',
    NPayCount01         : 'sfx/slot/177/177NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/177/177NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/177/177NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/177/177NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/177/177NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/177/177NPayCount03End.mp3',

    // symbol
    ScatterLocking0     : 'sfx/slot/177/177SLocking01.mp3',
    ScatterLocking1     : 'sfx/slot/177/177SLocking02.mp3',
    ScatterLocking2     : 'sfx/slot/177/177SLocking03.mp3',
    ScatterLocking3     : 'sfx/slot/177/177SLocking04.mp3',
    ScatterLocking4     : 'sfx/slot/177/177SLocking05.mp3',
    DPLocking0          : 'sfx/slot/177/177DLocking01.mp3',
    DPLocking1          : 'sfx/slot/177/177DLocking02.mp3',
    DPLocking2          : 'sfx/slot/177/177DLocking03.mp3',
    DPLocking3          : 'sfx/slot/177/177DLocking04.mp3',
    DPLocking4          : 'sfx/slot/177/177DLocking05.mp3',
    MultiLocking0       : 'sfx/slot/177/177ELocking01.mp3',
    MultiLocking1       : 'sfx/slot/177/177ELocking02.mp3',
    MultiLocking2       : 'sfx/slot/177/177ELocking03.mp3',
    MultiLocking3       : 'sfx/slot/177/177ELocking04.mp3',
    MultiLocking4       : 'sfx/slot/177/177ELocking05.mp3',
    LinkDPLocking       : 'sfx/slot/177/177LsymLocking01.mp3',
    LinkMultiLocking    : 'sfx/slot/177/177LsymLocking02.mp3',

    ScatterMatch        : 'sfx/slot/177/177SMatch.mp3',
    LinkMatch           : 'sfx/slot/177/177LMatch.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/177/177MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/177/177JackpotPopup.mp3',
    BoostJackpotPopup   : 'sfx/slot/177/177JackpotBoost.mp3',
    FreespinIntroPopup  : 'sfx/slot/177/177FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/177/177FsResult.mp3',
    LinkspinIntroPopup  : 'sfx/slot/177/177LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/177/177LinkResult.mp3',
    LinkFullPopup       : 'sfx/slot/177/177LMultiPopup.mp3',

    // wheel
    WheelPopup          : 'sfx/slot/177/177WheelPopup.mp3',
    WheelSpin           : 'sfx/slot/177/177WheelSpin.mp3',
    WheelStop           : 'sfx/slot/177/177WheelMatch01.mp3',
    WheelBoostStop      : 'sfx/slot/177/177WheelMatch02.mp3',
    WheelRemoveEdge     : 'sfx/slot/177/177WheelRemove.mp3',
    WheelChangeBoost    : 'sfx/slot/177/177WheelBoost.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/177/177JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/177/177JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/177/177JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/177/177JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/177/177JVoice05.mp3',
    BoostJackpotVoice0  : 'sfx/slot/177/177JVoice06.mp3',
    BoostJackpotVoice1  : 'sfx/slot/177/177JVoice07.mp3',
    BoostJackpotVoice2  : 'sfx/slot/177/177JVoice08.mp3',
    BoostJackpotVoice3  : 'sfx/slot/177/177JVoice09.mp3',
    BoostJackpotVoice4  : 'sfx/slot/177/177JVoice10.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/177/177Unlock.mp3',

    // pot
    PotOpen             : 'sfx/slot/177/177PotOpen.mp3',
    PotStepUp           : 'sfx/slot/177/177PotPre.mp3',

    // Trail
    TrailWild           : 'sfx/slot/177/177Trail.mp3',
    TrailDpToUI         : 'sfx/slot/177/177LinkTrail01.mp3',
    TrailMultiToUI      : 'sfx/slot/177/177LinkTrail02.mp3',
    TrailToWinDP        : 'sfx/slot/177/177LinkSum.mp3',
    TrailToWinMulti     : 'sfx/slot/177/177LinkSum02.mp3'
};
window.g_sndSlot177 = ResPack.create( 'sndSlot177', sndSlot177 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MoreMoreAcorns END ↑↑↑ -----------

//region -- ↓↓↓ FervorCircus ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndFervorCircus = {
    // INTRO
    Intro               :   "sfx/slot/178/178Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/178/178Bgm.mp3",
    FGBgm               :   "sfx/slot/178/178FsBgm.mp3",
    FBgm                :   "sfx/slot/178/178FvBgm.mp3",
    Link                :   "sfx/slot/178/178LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/178/178Spin.mp3",
    ReelStop            : "sfx/slot/178/178ReelStop.mp3",
    MPayCount           : "sfx/slot/178/178MPayCount.mp3",
    NPayCount01         : "sfx/slot/178/178NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/178/178NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/178/178NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/178/178NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/178/178NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/178/178NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/178/178MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/178/178JackpotPopup.mp3",

    // NORMAL
    SLocking1           : "sfx/slot/178/178SLocking01.mp3",
    SLocking2           : "sfx/slot/178/178SLocking02.mp3",
    SLocking3           : "sfx/slot/178/178SLocking03.mp3",
    DLocking1           : "sfx/slot/178/178DLocking01.mp3",
    DLocking2           : "sfx/slot/178/178DLocking02.mp3",
    DLocking3           : "sfx/slot/178/178DLocking03.mp3",
    DLocking4           : "sfx/slot/178/178DLocking04.mp3",
    DLocking5           : "sfx/slot/178/178DLocking05.mp3",
    Trail               : "sfx/slot/178/178Trail.mp3",
    PotOpen             : "sfx/slot/178/178PotOpen.mp3",
    SMatch              : "sfx/slot/178/178SMatch.mp3",
    DMatch              : "sfx/slot/178/178LMatch.mp3",
    Unlock              : "sfx/slot/178/178Unlock.mp3",
    TipOver             : "sfx/slot/178/178TipOver.mp3",
    LongSpin            : "sfx/slot/178/178Longspin.mp3",

    //LINK GAME
    LG_Intro            : "sfx/slot/178/178LinkIntro.mp3",
    LG_Intro1           : "sfx/slot/178/178LinkIntro02.mp3",
    LG_Spin             : "sfx/slot/178/178LinkSpin.mp3",
    LG_ReelStop         : "sfx/slot/178/178LinkReelstop.mp3",
    LG_Lock01           : "sfx/slot/178/178LLocking01.mp3",
    LG_Lock02           : "sfx/slot/178/178LLocking02.mp3",
    LG_Lock03           : "sfx/slot/178/178LLocking03.mp3",
    LG_Lock04           : "sfx/slot/178/178LLocking04.mp3",
    LG_Lock05           : "sfx/slot/178/178LLocking05.mp3",
    LG_Lock06           : "sfx/slot/178/178LLocking06.mp3",
    LG_Expand           : "sfx/slot/178/178LinkFrameUp.mp3",
    LG_Upgrade01        : "sfx/slot/178/178LinkUpgrade01.mp3",
    LG_Upgrade02        : "sfx/slot/178/178LinkUpgrade02.mp3",
    LG_EachWin01        : "sfx/slot/178/178LinkSymTrail01.mp3",
    LG_EachWin02        : "sfx/slot/178/178LinkSymTrail02.mp3",
    LG_MoreSpin         : "sfx/slot/178/178LinkSymTrail03.mp3",
    LG_WinPanelOpen     : "sfx/slot/178/178WinpannelOpen.mp3",
    LG_WinPanelClose    : "sfx/slot/178/178WinpannelClose.mp3",
    LG_JackPotOpen      : "sfx/slot/178/178LinkJackpot.mp3",
    LG_Reset            : "sfx/slot/178/178LinkReset.mp3",
    LG_Sum              : "sfx/slot/178/178LinkSum.mp3",
    LG_Result           : "sfx/slot/178/178LinkResult.mp3",

    //FREE GAME
    FG_Intro             : "sfx/slot/178/178FsIntro.mp3",
    FG_Retrigger         : "sfx/slot/178/178Retrigger.mp3",
    FG_Result            : "sfx/slot/178/178FsResult.mp3",

    //FERVOR
    F_Intro              : "sfx/slot/178/178FIntro.mp3",
    F_Count01            : "sfx/slot/178/178FCount01.mp3",
    F_Count02            : "sfx/slot/178/178FCount02.mp3",
    F_Voice              : "sfx/slot/178/178LVoice.mp3",

    // VOICE
    JVoice00            :   "sfx/slot/178/178JVoice01.mp3",
    JVoice01            :   "sfx/slot/178/178JVoice02.mp3",
    JVoice02            :   "sfx/slot/178/178JVoice03.mp3",
    JVoice03            :   "sfx/slot/178/178JVoice04.mp3",
    JVoice04            :   "sfx/slot/178/178JVoice05.mp3"
};
window.g_sndFervorCircus = ResPack.create( "sndFervorCircus", sndFervorCircus ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ Peter Pan Begins ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndPeterPanBegins = {
    // INTRO
    Intro               :   "sfx/slot/179/179Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/179/179Bgm.mp3",
    FGBgm               :   "sfx/slot/179/179FsBgm.mp3",
    RBgm                :   "sfx/slot/179/179RBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/179/179Spin.mp3",
    ReelStop            :   "sfx/slot/179/179ReelStop.mp3",
    MPayCount           :   "sfx/slot/179/179MPayCount.mp3",
    NPayCount01         :   "sfx/slot/179/179NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/179/179NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/179/179NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/179/179NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/179/179NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/179/179NPayCount03End.mp3",
    MajorPopup          :   "sfx/slot/179/179MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/179/179JackpotPopup.mp3",

    // NORMAL
    SLocking1           :   "sfx/slot/179/179SLocking01.mp3",
    SLocking2           :   "sfx/slot/179/179SLocking02.mp3",
    SLocking3           :   "sfx/slot/179/179SLocking03.mp3",
    SLocking4           :   "sfx/slot/179/179SLocking04.mp3",
    SLocking5           :   "sfx/slot/179/179SLocking05.mp3",

    SMatch              :   "sfx/slot/179/179SMatch.mp3",
    JMatch              :   "sfx/slot/179/179JMatch.mp3",
    Longspin            :   "sfx/slot/179/179Longspin.mp3",


    // 잭팟은 락킹이 없어요...
    // JLocking1           :   "sfx/slot/179/179JLocking1.mp3",

    Trail               :   "sfx/slot/179/179Trail.mp3",

    // Respin
    RespinPopup         :   "sfx/slot/179/179Respin.mp3",
    RespinFrame         :   "sfx/slot/179/179RespinFrame.mp3",

    // Free Game
    FsIntro             :   "sfx/slot/179/179FsIntro.mp3",
    FsTransform         :   "sfx/slot/179/179FsTransform.mp3",
    Count               :   "sfx/slot/179/179Count.mp3",
    FsSum               :   "sfx/slot/179/179FsSum.mp3",
    FsResult            :   "sfx/slot/179/179FsResult.mp3",
    // 리트리거 팝업이 제거됐어요...
    // Retrigger           :   "sfx/slot/179/179Retrigger.mp3",

    // VOICE
    JVoiceMajor         :   "sfx/slot/179/179JVoice01.mp3",
    JVoiceMega          :   "sfx/slot/179/179JVoice02.mp3",
    JVoiceGrand         :   "sfx/slot/179/179JVoice03.mp3",
};
window.g_sndPeterPanBegins = ResPack.create( 'sndPeterPanBegins', sndPeterPanBegins ).concat( g_sfxSlotCommon );
//endregion

//region 181
window.sndCalaveraParade = {
    Intro : 'sfx/slot/181/181Intro.mp3',
    Bgm : 'sfx/slot/181/181Bgm.mp3',
    MiniBgm : 'sfx/slot/181/181MiniBgm.mp3',
    FsBgm : 'sfx/slot/181/181FsBgm.mp3',
    ReBgm : 'sfx/slot/181/181ReBgm.mp3',
    Spin : 'sfx/slot/181/181Spin.mp3',
    ReelStop : 'sfx/slot/181/181ReelStop.mp3',
    MPayCount : 'sfx/slot/181/181MPayCount.mp3',
    NPayCount01 : 'sfx/slot/181/181NPayCount01.mp3',
    NPayCount01End : 'sfx/slot/181/181NPayCount01End.mp3',
    NPayCount02 : 'sfx/slot/181/181NPayCount02.mp3',
    NPayCount02End : 'sfx/slot/181/181NPayCount02End.mp3',
    NPayCount03 : 'sfx/slot/181/181NPayCount03.mp3',
    NPayCount03End : 'sfx/slot/181/181NPayCount03End.mp3',
    MajorPopup : 'sfx/slot/181/181MajorPopup.mp3',
    JackpotPopup : 'sfx/slot/181/181JackpotPopup.mp3',
    BetChange : 'sfx/slot/181/181BetChange.mp3',
    PotTrail : 'sfx/slot/181/181PotTrail.mp3',
    PotPre : 'sfx/slot/181/181PotPre.mp3',
    PotOpen : 'sfx/slot/181/181PotOpen.mp3',
    RespinShake : 'sfx/slot/181/181RespinShake.mp3',
    ExtraJackpotLock : 'sfx/slot/181/181ExtraJackpotLock.mp3',
    ExtraDirectpayLock : 'sfx/slot/181/181ExtraDirectpayLock.mp3',
    ExtraMinigameLock : 'sfx/slot/181/181ExtraMinigameLock.mp3',
    ExtraSymPay : 'sfx/slot/181/181ExtraSymPay.mp3',
    CMatch : 'sfx/slot/181/181CMatch.mp3',
    PannelOn : 'sfx/slot/181/181PannelOn.mp3',
    PannelSum : 'sfx/slot/181/181PannelSum.mp3',
    PannelOff : 'sfx/slot/181/181PannelOff.mp3',
    TipOver : 'sfx/slot/181/181TipOver.mp3',
    MLocking01 : 'sfx/slot/181/181MLocking01.mp3',
    MTransform01 : 'sfx/slot/181/181MTransform01.mp3',
    MTransform02 : 'sfx/slot/181/181MTransform02.mp3',
    MTransform03 : 'sfx/slot/181/181MTransform03.mp3',
    MSpary : 'sfx/slot/181/181MSpary.mp3',
    MFrame01 : 'sfx/slot/181/181MFrame01.mp3',
    MFrame02 : 'sfx/slot/181/181MFrame02.mp3',
    MWild : 'sfx/slot/181/181MWild.mp3',
    MiniIntro : 'sfx/slot/181/181MiniIntro.mp3',
    FsIntro: 'sfx/slot/181/181FsIntro.mp3',
    FSLocking02: 'sfx/slot/181/181FSLocking02.mp3',
    FSLocking03: 'sfx/slot/181/181FSLocking03.mp3',
    FSLocking04: 'sfx/slot/181/181FSLocking04.mp3',
    Blitz01: 'sfx/slot/181/181Blitz01.mp3',
    Blitz02: 'sfx/slot/181/181Blitz02.mp3',
    FsResult: 'sfx/slot/181/181FsResult.mp3',
    JVoice01: 'sfx/slot/181/181JVoice01.mp3',
    JVoice02: 'sfx/slot/181/181JVoice02.mp3',
    JVoice03: 'sfx/slot/181/181JVoice03.mp3',
    JVoice04: 'sfx/slot/181/181JVoice04.mp3',
    JVoice05: 'sfx/slot/181/181JVoice05.mp3',
    MiniVoice01: 'sfx/slot/181/181MiniVoice01.mp3',
    MiniVoice02: 'sfx/slot/181/181MiniVoice02.mp3',
    MiniVoice03: 'sfx/slot/181/181MiniVoice03.mp3',
    MiniVoice04: 'sfx/slot/181/181MiniVoice04.mp3',
    SymVoice01: 'sfx/slot/181/181SymVoice01.mp3',
    SymVoice02: 'sfx/slot/181/181SymVoice02.mp3',
    SymVoice03: 'sfx/slot/181/181SymVoice03.mp3',
    PreMiniGame: 'sfx/slot/181/181PreMiniGame.mp3',
    Longspin: 'sfx/slot/181/181Longspin.mp3',
    MLocking02: 'sfx/slot/181/181MLocking02.mp3',
    MLocking03: 'sfx/slot/181/181MLocking03.mp3',
    MiniSum: 'sfx/slot/181/181MiniSum.mp3',
    MPlus: 'sfx/slot/181/181MPlus.mp3',
    JVoice06: 'sfx/slot/181/181JVoice06.mp3',
    JackpotNoti: 'sfx/slot/181/181JackpotNoti.mp3',
    MLocking04: 'sfx/slot/181/181MLocking04.mp3',
    RespinLongspin: 'sfx/slot/181/181RespinLongspin.mp3',
    BlitzCount: 'sfx/slot/181/181BlitzCount.mp3',
};
window.g_sndCalaveraParade = ResPack.create('sndCalaveraParade', sndCalaveraParade).concat(g_sfxSlotCommon);
//endregion181

//region -- ↓↓↓ Captain Hook Returns ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndCaptainHookReturns = {
    // INTRO
    Intro               :   "sfx/slot/180/180Intro.mp3",

    // BGM
    Bgm                 :   "sfx/slot/180/180Bgm.mp3",
    FGBgm               :   "sfx/slot/180/180FsBgm.mp3",
    RBgm                :   "sfx/slot/180/180RBgm.mp3",

    // PAY
    Spin                :   "sfx/slot/180/180Spin.mp3",
    ReelStop            :   "sfx/slot/180/180ReelStop.mp3",
    MPayCount           :   "sfx/slot/180/180MPayCount.mp3",
    NPayCount01         :   "sfx/slot/180/180NPayCount01.mp3",
    NPayCount01End      :   "sfx/slot/180/180NPayCount01End.mp3",
    NPayCount02         :   "sfx/slot/180/180NPayCount02.mp3",
    NPayCount02End      :   "sfx/slot/180/180NPayCount02End.mp3",
    NPayCount03         :   "sfx/slot/180/180NPayCount03.mp3",
    NPayCount03End      :   "sfx/slot/180/180NPayCount03End.mp3",

    MultiPayCount01         :   "sfx/slot/180/180MultiPayCount01.mp3",
    MultiPayCount01End      :   "sfx/slot/180/180MultiPayCount01End.mp3",
    MultiPayCount02         :   "sfx/slot/180/180MultiPayCount02.mp3",
    MultiPayCount02End      :   "sfx/slot/180/180MultiPayCount02End.mp3",
    MultiPayCount03         :   "sfx/slot/180/180MultiPayCount03.mp3",
    MultiPayCount03End      :   "sfx/slot/180/180MultiPayCount03End.mp3",

    MajorPopup          :   "sfx/slot/180/180MajorPopup.mp3",
    JackpotPopup        :   "sfx/slot/180/180JackpotPopup.mp3",

    // NORMAL
    SLocking1           :   "sfx/slot/180/180SLocking01.mp3",
    SLocking2           :   "sfx/slot/180/180SLocking02.mp3",
    SLocking3           :   "sfx/slot/180/180SLocking03.mp3",
    SLocking4           :   "sfx/slot/180/180SLocking04.mp3",
    SLocking5           :   "sfx/slot/180/180SLocking05.mp3",

    SMatch              :   "sfx/slot/180/180SMatch.mp3",
    JMatch              :   "sfx/slot/180/180JMatch.mp3",
    Longspin            :   "sfx/slot/180/180Longspin.mp3",


    // 잭팟은 락킹이 없어요...
    // JLocking1           :   "sfx/slot/179/179JLocking1.mp3",

    Trail               :   "sfx/slot/180/180Trail.mp3",
    PotPre              :   "sfx/slot/180/180PotPre.mp3",
    PotOpen             :   "sfx/slot/180/180PotOpen.mp3",

    // Respin
    RespinPopup         :   "sfx/slot/180/180Respin.mp3",
    RespinMulti         :   "sfx/slot/180/180RespinMulti.mp3",

    // Free Game
    FsIntro             :   "sfx/slot/180/180FsIntro.mp3",
    FsTransform         :   "sfx/slot/180/180FsTransform.mp3",
    FsMulti             :   "sfx/slot/180/180FsMulti.mp3",
    Count               :   "sfx/slot/180/180Count.mp3",
    FsSum               :   "sfx/slot/180/180FsSum.mp3",
    FsResult            :   "sfx/slot/180/180FsResult.mp3",
    // 리트리거 팝업이 제거됐어요...
    // Retrigger           :   "sfx/slot/180/180Retrigger.mp3",

    // VOICE
    JVoiceMajor         :   "sfx/slot/180/180JVoice01.mp3",
    JVoiceMega          :   "sfx/slot/180/180JVoice02.mp3",
    JVoiceGrand         :   "sfx/slot/180/180JVoice03.mp3",
    PVoice01            :   "sfx/slot/180/180PVoice01.mp3",
    PVoice02            :   "sfx/slot/180/180PVoice02.mp3",
    PVoice03            :   "sfx/slot/180/180PVoice03.mp3",
};
window.g_sndCaptainHookReturns = ResPack.create( 'sndCaptainHookReturns', sndCaptainHookReturns ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ MythicApples BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot182 = {
    // intro
    Intro               : 'sfx/slot/182/182Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/182/182Bgm.mp3',
    FreeBgm             : 'sfx/slot/182/182FsBgm.mp3',
    LinkBgm             : 'sfx/slot/182/182LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/182/182Spin.mp3',
    ReelStop            : 'sfx/slot/182/182ReelStop.mp3',
    LongSpinFx          : 'sfx/slot/182/182Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/182/182LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/182/182LinkReelStop.mp3',
    LinkLongSpinFx      : 'sfx/slot/182/182LinkLongspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/182/182MPayCount.mp3',
    NPayCount01         : 'sfx/slot/182/182NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/182/182NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/182/182NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/182/182NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/182/182NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/182/182NPayCount03End.mp3',

    // symbol
    ScatterLocking0     : 'sfx/slot/182/182SLocking01.mp3',
    ScatterLocking1     : 'sfx/slot/182/182SLocking02.mp3',
    ScatterLocking2     : 'sfx/slot/182/182SLocking03.mp3',
    ScatterLocking3     : 'sfx/slot/182/182SLocking04.mp3',
    ScatterLocking4     : 'sfx/slot/182/182SLocking05.mp3',
    DPLocking0          : 'sfx/slot/182/182DLocking01.mp3',
    DPLocking1          : 'sfx/slot/182/182DLocking02.mp3',
    DPLocking2          : 'sfx/slot/182/182DLocking03.mp3',
    DPLocking3          : 'sfx/slot/182/182DLocking04.mp3',
    DPLocking4          : 'sfx/slot/182/182DLocking05.mp3',
    WildNudge           : 'sfx/slot/182/182Nudge.mp3',

    LinkAdd             : 'sfx/slot/182/182LLocking02.mp3',
    LinkEachLocking     : 'sfx/slot/182/182LLocking03.mp3',
    LinkAllwinLocking   : 'sfx/slot/182/182LLocking04.mp3',

    ScatterMatch        : 'sfx/slot/182/182SMatch.mp3',
    LinkMatch           : 'sfx/slot/182/182LMatch.mp3',
    LinkPlus            : 'sfx/slot/182/182LinkPlus.mp3',
    LinkCount           : 'sfx/slot/182/182LinkCount.mp3',

    LinkSymTrail1       : 'sfx/slot/182/182LinkSymTrail01.mp3',
    LinkSymTrail2       : 'sfx/slot/182/182LinkSymTrail02.mp3',
    LinkEnd          : 'sfx/slot/182/182LinkEnd.mp3',

    // winpannel
    WinpannelOpen       :   'sfx/slot/182/182WinpannelOpen.mp3',
    WinpannelClose      :   'sfx/slot/182/182WinpannelClose.mp3',
    LinkSum             :   'sfx/slot/182/182LinkSum.mp3',
    FsCount             :   'sfx/slot/182/182FsCount.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/182/182MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/182/182JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/182/182FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/182/182FsResult.mp3',
    LinkspinIntroPopup  : 'sfx/slot/182/182LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/182/182LinkResult.mp3',


    // jackpot Voice
    JackpotVoice        : 'sfx/slot/182/182JVoice01.mp3',
    // PVoice0            : 'sfx/slot/182/182PVoice01.mp3',
    // PVoice1            : 'sfx/slot/182/182PVoice02.mp3',
    // PVoice2            : 'sfx/slot/182/182PVoice03.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/182/182Unlock.mp3',

    // Trail
    TrailDpToUI1         : 'sfx/slot/182/182LinkSymTrail01.mp3',
    TrailDpToUI2         : 'sfx/slot/182/182LinkSymTrail02.mp3',

    //tooltip
    TipOver              : "sfx/slot/182/182TipOver.mp3",
    //
    AppleMatch01        : "sfx/slot/182/182AppleMatch01.mp3",
    AppleMatch02        : "sfx/slot/182/182AppleMatch02.mp3",
    AppleMatch03        : "sfx/slot/182/182AppleMatch03.mp3",
};
window.g_sndSlot182 = ResPack.create( 'sndSlot182', sndSlot182 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ MythicApples END ↑↑↑ -----------

//region -- ↓↓↓ WhiteFortune ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot183 = {
    // INTRO
    Intro               : "sfx/slot/183/183Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/183/183Bgm.mp3",
    FGBgm               : "sfx/slot/183/183FsBgm.mp3",

    // PAY
    Spin                : "sfx/slot/183/183Spin.mp3",
    ReelStop            : "sfx/slot/183/183ReelStop.mp3",
    MPayCount           : "sfx/slot/183/183MPayCount.mp3",
    NPayCount01         : "sfx/slot/183/183NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/183/183NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/183/183NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/183/183NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/183/183NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/183/183NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/183/183MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/183/183JackpotPopup.mp3",

    // NORMAL
    SLocking1           : "sfx/slot/183/183SLocking01.mp3",
    SLocking2           : "sfx/slot/183/183SLocking02.mp3",
    SLocking3           : "sfx/slot/183/183SLocking03.mp3",
    SLocking4           : "sfx/slot/183/183SLocking04.mp3",
    SLocking5           : "sfx/slot/183/183SLocking05.mp3",
    WLocking1           : "sfx/slot/183/183WLocking01.mp3",
    WLocking2           : "sfx/slot/183/183WLocking02.mp3",
    WLocking3           : "sfx/slot/183/183WLocking03.mp3",
    WLocking4           : "sfx/slot/183/183WLocking04.mp3",
    WLocking5           : "sfx/slot/183/183WLocking05.mp3",
    SMatch              : "sfx/slot/183/183SMatch.mp3",
    MondeOn             : "sfx/slot/183/183MagicOn.mp3",
    MondeOff            : "sfx/slot/183/183MagicOFF.mp3",
    LongSpin            : "sfx/slot/183/183Longspin.mp3",
    TipOver             : "sfx/slot/183/183TipOver.mp3",
    Unlock              : "sfx/slot/183/183Unlock.mp3",
    JLocking            : "sfx/slot/183/183JLocking.mp3",
    ScatterMatch        : "sfx/slot/183/183Line.mp3",

    //FREE SPIN
    FG_RewardPopup      : "sfx/slot/183/183Reward.mp3",
    FG_Click            : "sfx/slot/183/183RewardClick.mp3",
    FG_Intro            : "sfx/slot/183/183FsIntro.mp3",
    FG_SuperIntro       : "sfx/slot/183/183SuperFsIntro.mp3",
    FG_Retrigger        : "sfx/slot/183/183Retrigger.mp3",
    FG_PrizeCount       : "sfx/slot/183/183QuickCount.mp3",
    FG_PrizeCountEnd    : "sfx/slot/183/183QuickCountEnd.mp3",
    FG_PrizeCountSlotMenu  : "sfx/slot/183/183FsCount.mp3",//미사용
    FG_Result           : "sfx/slot/183/183FsResult.mp3",

    //ADD
    FG_Featured         : "sfx/slot/183/183Featured.mp3",

    // VOICE
    JVoice00            : "sfx/slot/183/183JVoice01.mp3"
};
window.g_sndSlot183 = ResPack.create( "sndSlot183", sndSlot183 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ DiggyCrush BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot185 = {
    // intro
    Intro               : 'sfx/slot/185/185Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/185/185Bgm.mp3',
    FreeBgm             : 'sfx/slot/185/185FsBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/185/185Spin.mp3',
    ReelStop            : 'sfx/slot/185/185ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/185/185MPayCount.mp3',
    NPayCount01         : 'sfx/slot/185/185NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/185/185NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/185/185NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/185/185NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/185/185NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/185/185NPayCount03End.mp3',

    // symbol
    ChangeSymbol0       : 'sfx/slot/185/185Transform02.mp3',
    ChangeSymbol1       : 'sfx/slot/185/185Transform.mp3',
    ChangeSymbol2       : 'sfx/slot/185/185Match.mp3',

    // Minigame
    MinigameStart       : 'sfx/slot/185/185Mmatch01.mp3',

    // ui
    RightUIAddCombo     : 'sfx/slot/185/185TPannel01.mp3',
    RightUIAddFree      : 'sfx/slot/185/185TPannel02.mp3',
    RightUIFreeIntro    : 'sfx/slot/185/185FsMatch.mp3',
    BonusWinCounting    : 'sfx/slot/185/185Count.mp3',
    TotalWinCounting    : 'sfx/slot/185/185FsCount.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/185/185MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/185/185JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/185/185FsIntro.mp3',
    FreespinRetriggerPopup  : 'sfx/slot/185/185Retrigger.mp3',
    FreespinResultPopup : 'sfx/slot/185/185FsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/185/185JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/185/185JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/185/185JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/185/185JVoice04.mp3',

    // minigame Voice
    MinigameVoice0      : 'sfx/slot/185/185PVoice01.mp3',
    MinigameVoice1      : 'sfx/slot/185/185PVoice02.mp3',
    MinigameVoice2      : 'sfx/slot/185/185PVoice03.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/185/185Unlock.mp3',

    // Trail
    TrailWild           : 'sfx/slot/185/185Trail.mp3'
};
window.g_sndSlot185 = ResPack.create( 'sndSlot185', sndSlot185 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ DiggyCrush END ↑↑↑ -----------

//region -- ↓↓↓ WickedFortune ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot184 = {
    // INTRO
    Intro               : "sfx/slot/184/184Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/184/184Bgm.mp3",
    FGBgm               : "sfx/slot/184/184FsBgm.mp3",

    // PAY
    Spin                : "sfx/slot/184/184Spin.mp3",
    ReelStop            : "sfx/slot/184/184ReelStop.mp3",
    MPayCount           : "sfx/slot/184/184MPayCount.mp3",
    NPayCount01         : "sfx/slot/184/184NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/184/184NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/184/184NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/184/184NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/184/184NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/184/184NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/184/184MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/184/184JackpotPopup.mp3",

    // NORMAL
    SLocking1           : "sfx/slot/184/184SLocking01.mp3",
    SLocking2           : "sfx/slot/184/184SLocking02.mp3",
    SLocking3           : "sfx/slot/184/184SLocking03.mp3",
    SLocking4           : "sfx/slot/184/184SLocking04.mp3",
    SLocking5           : "sfx/slot/184/184SLocking05.mp3",

    SMatch              : "sfx/slot/184/184SMatch.mp3",
    MondeOn             : "sfx/slot/184/184MagicOn.mp3",
    MondeOff            : "sfx/slot/184/184MagicOFF.mp3",
    LongSpin            : "sfx/slot/184/184Longspin.mp3",
    TipOver             : "sfx/slot/184/184TipOver.mp3",
    Unlock              : "sfx/slot/184/184Unlock.mp3",
    JLocking            : "sfx/slot/184/184JLocking.mp3",
    ScatterMatch        : "sfx/slot/184/184Line.mp3",

    //FREE SPIN
    FG_RewardPopup      : "sfx/slot/184/184Reward.mp3",
    FG_Click            : "sfx/slot/184/184RewardClick.mp3",
    FG_Intro            : "sfx/slot/184/184FsIntro.mp3",
    FG_SuperIntro       : "sfx/slot/184/184SuperFsIntro.mp3",
    FG_Retrigger        : "sfx/slot/184/184Retrigger.mp3",
    FG_PrizeCount       : "sfx/slot/184/184QuickCount.mp3",
    FG_Result           : "sfx/slot/184/184FsResult.mp3",

    //ADD
    FG_Featured         : "sfx/slot/184/184Featured.mp3",

    // VOICE
    JVoice00            : "sfx/slot/184/184JVoice01.mp3"
};
window.g_sndSlot184 = ResPack.create( "sndSlot184", sndSlot184 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ WickedBooshFamily BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot187 = {
    Intro: 'sfx/slot/187/187Intro.mp3',
    Bgm: 'sfx/slot/187/187Bgm.mp3',
    LinkBgm: 'sfx/slot/187/187LinkBgm.mp3',
    Spin: 'sfx/slot/187/187Spin.mp3',
    ReelStop: 'sfx/slot/187/187ReelStop.mp3',
    MPayCount: 'sfx/slot/187/187MPayCount.mp3',
    NPayCount01: 'sfx/slot/187/187NPayCount01.mp3',
    NPayCount01End: 'sfx/slot/187/187NPayCount01End.mp3',
    NPayCount02: 'sfx/slot/187/187NPayCount02.mp3',
    NPayCount02End: 'sfx/slot/187/187NPayCount02End.mp3',
    NPayCount03: 'sfx/slot/187/187NPayCount03.mp3',
    NPayCount03End: 'sfx/slot/187/187NPayCount03End.mp3',
    MajorPopup: 'sfx/slot/187/187MajorPopup.mp3',
    JackpotPopup: 'sfx/slot/187/187JackpotPopup.mp3',
    SLocking01: 'sfx/slot/187/187SLocking01.mp3',
    SLocking02: 'sfx/slot/187/187SLocking02.mp3',
    SLocking03: 'sfx/slot/187/187SLocking03.mp3',
    SLocking04: 'sfx/slot/187/187SLocking04.mp3',
    SLocking05: 'sfx/slot/187/187SLocking05.mp3',
    JLocking: 'sfx/slot/187/187JLocking.mp3',
    ULocking: 'sfx/slot/187/187ULocking.mp3',
    PLocking: 'sfx/slot/187/187PLocking.mp3',
    Trail: 'sfx/slot/187/187Trail.mp3',
    PUpgrade: 'sfx/slot/187/187PUpgrade.mp3',
    SMatch: 'sfx/slot/187/187SMatch.mp3',
    Unlock: 'sfx/slot/187/187Unlock.mp3',
    LinkIntro: 'sfx/slot/187/187LinkIntro.mp3',
    LinkSpin: 'sfx/slot/187/187LinkSpin.mp3',
    LinkReelstop: 'sfx/slot/187/187LinkReelstop.mp3',
    LLocking01: 'sfx/slot/187/187LLocking01.mp3',
    LLocking02: 'sfx/slot/187/187LLocking02.mp3',
    LLocking03: 'sfx/slot/187/187LLocking03.mp3',
    LinkSymTrail01: 'sfx/slot/187/187LinkSymTrail01.mp3',
    LinkSymTrail02: 'sfx/slot/187/187LinkSymTrail02.mp3',
    LinkPlus: 'sfx/slot/187/187LinkPlus.mp3',
    LinkMatch: 'sfx/slot/187/187LinkMatch.mp3',
    LinkSum: 'sfx/slot/187/187LinkSum.mp3',
    LinkLongspin: 'sfx/slot/187/187LinkLongspin.mp3',
    Longspin: 'sfx/slot/187/187Longspin.mp3',
    LinkResult: 'sfx/slot/187/187LinkResult.mp3',
    JVoice01: 'sfx/slot/187/187JVoice01.mp3',
    JVoice02: 'sfx/slot/187/187JVoice02.mp3',
    JVoice03: 'sfx/slot/187/187JVoice03.mp3',
    JVoice04: 'sfx/slot/187/187JVoice04.mp3',
    LinkReset: 'sfx/slot/187/187LinkReset.mp3',
    LinkReset02: 'sfx/slot/187/187LinkReset02.mp3',
};
window.g_sndSlot187 = ResPack.create('sndSlot187', sndSlot187).concat(g_sfxSlotCommon);

//-- ↑↑↑ flippinRich BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot_flippinRich = {
    // intro
    Intro               : 'sfx/slot/186/186Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/186/186Bgm.mp3',
    FreeBgm             : 'sfx/slot/186/186FsBgm.mp3',
    LinkBgm             : 'sfx/slot/186/186LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/186/186Spin.mp3',
    ReelStop            : 'sfx/slot/186/186ReelStop.mp3',
    LongSpinFx          : 'sfx/slot/186/186Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/186/186LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/186/186LinkReelstop.mp3',
    LinkReset           : 'sfx/slot/186/186LinkReset.mp3',
    LinkSpin            : 'sfx/slot/186/186LinkSpin.mp3',
    LinkCount           : 'sfx/slot/186/186LinkCount.mp3',
    Quickhit            : 'sfx/slot/186/186Quickhit.mp3',
    QuickCount0         : 'sfx/slot/186/186QuickCount01.mp3',
    QuickCount1         : 'sfx/slot/186/186QuickCount02.mp3',

    AMatch            	: 'sfx/slot/186/186AMatch.mp3',
    AMatch1            	: 'sfx/slot/186/186AMatch02.mp3',
    AFlip0            	: 'sfx/slot/186/186AFlip01.mp3',
    AFlip1            	: 'sfx/slot/186/186AFlip02.mp3',
    AFlip2            	: 'sfx/slot/186/186AFlip03.mp3',
    QuickCount1         : 'sfx/slot/186/186QuickCount02.mp3',
    QuickCount1         : 'sfx/slot/186/186QuickCount02.mp3',
    QuickCount1         : 'sfx/slot/186/186QuickCount02.mp3',


    // pay
    MPayCount           : 'sfx/slot/186/186MPayCount.mp3',
    NPayCount01         : 'sfx/slot/186/186NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/186/186NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/186/186NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/186/186NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/186/186NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/186/186NPayCount03End.mp3',

    // symbol
    ScatterLocking0     : 'sfx/slot/186/186SLocking01.mp3',
    ScatterLocking1     : 'sfx/slot/186/186SLocking02.mp3',
    ScatterLocking2     : 'sfx/slot/186/186SLocking03.mp3',
    ScatterLocking3     : 'sfx/slot/186/186SLocking04.mp3',
    ScatterLocking4     : 'sfx/slot/186/186SLocking05.mp3',

    LinkSymLocking0     : 'sfx/slot/186/186LinkSymLocking01.mp3',
    LinkSymLocking1     : 'sfx/slot/186/186LinkSymLocking02.mp3',
    LinkSymLocking2     : 'sfx/slot/186/186LinkSymLocking03.mp3',
    LinkSymLocking3     : 'sfx/slot/186/186LinkSymLocking04.mp3',

    ScatterMatch        : 'sfx/slot/186/186SMatch.mp3',

    LinkSymTrail1       : 'sfx/slot/186/186LinkSymTrail01.mp3',
    LinkSymTrail2       : 'sfx/slot/186/186LinkSymTrail02.mp3',
    LinkSum0            :   'sfx/slot/186/186LinkSum.mp3',
    LinkSum1            :   'sfx/slot/186/186LinkSum02.mp3',
    LinkGrandCount      :   'sfx/slot/186/186LinkGrandCount.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/186/186MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/186/186JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/186/186FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/186/186FsResult.mp3',
    FsWild              : 'sfx/slot/186/186FsWild.mp3',
    LinkspinIntroPopup  : 'sfx/slot/186/186LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/186/186LinkResult.mp3',


    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/186/186JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/186/186JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/186/186JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/186/186JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/186/186JVoice05.mp3',       //A
    JackpotVoice5       : 'sfx/slot/186/186JVoice06.mp3',       //A

    // betting
    BetLimitOver        : 'sfx/slot/186/186Unlock.mp3',

    //POT
    PotBonus            : 'sfx/slot/186/186PotOpen.mp3',
    PotPre              : 'sfx/slot/186/186PotPre.mp3',
    PotTrail            : 'sfx/slot/186/186PotTrail.mp3',

    FsCount             :   'sfx/slot/186/186FsCount.mp3',
};
window.g_sndSlot_flippinRich = ResPack.create( 'sndSlot_flippinRich', sndSlot_flippinRich ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ Lucky Ignite ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot190 = {
    // INTRO
    Intro               : "sfx/slot/190/190Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/190/190Bgm.mp3",
    LinkBgm             : "sfx/slot/190/190LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/190/190Spin.mp3",
    ReelStop            : "sfx/slot/190/190ReelStop.mp3",
    MPayCount           : "sfx/slot/190/190MPayCount.mp3",
    NPayCount01         : "sfx/slot/190/190NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/190/190NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/190/190NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/190/190NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/190/190NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/190/190NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/190/190MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/190/190JackpotPopup.mp3",

    // NORMAL
    DLocking01           : "sfx/slot/190/190DLocking01.mp3",
    DLocking02           : "sfx/slot/190/190DLocking02.mp3",
    DLocking03           : "sfx/slot/190/190DLocking03.mp3",
    DLocking04           : "sfx/slot/190/190DLocking04.mp3",
    DLocking05           : "sfx/slot/190/190DLocking05.mp3",
    QLocking01           : "sfx/slot/190/190QLocking01.mp3",
    QLocking02           : "sfx/slot/190/190QLocking02.mp3",
    QLocking03           : "sfx/slot/190/190QLocking03.mp3",
    QLocking04           : "sfx/slot/190/190QLocking04.mp3",
    QLocking05           : "sfx/slot/190/190QLocking05.mp3",
    MLocking            : "sfx/slot/190/190MLocking.mp3",
    JLocking            : "sfx/slot/190/190JLocking.mp3",
    SMatch              : "sfx/slot/190/190SMatch.mp3",
    QMatch              : "sfx/slot/190/190QMatch.mp3",
    QMatch02            : "sfx/slot/190/190QMatch02.mp3",
    LongSpin            : "sfx/slot/190/190Longspin.mp3",
    TipOver             : "sfx/slot/190/190TipOver.mp3",
    Unlock              : "sfx/slot/190/190Unlock.mp3",

    //Link Game
    LinkIntro           : "sfx/slot/190/190LinkIntro.mp3",
    LinkSpin            : "sfx/slot/190/190LinkSpin.mp3",
    LinkReelStop        : "sfx/slot/190/190LinkReelStop.mp3",
    LinkCount           : "sfx/slot/190/190LinkCount.mp3",
    LinkReset           : "sfx/slot/190/190LinkReset.mp3",
    LLocking01          : "sfx/slot/190/190LLocking01.mp3",
    LLocking02          : "sfx/slot/190/190LLocking02.mp3",
    LLocking03          : "sfx/slot/190/190LLocking03.mp3",
    LLocking04          : "sfx/slot/190/190LLocking04.mp3",
    LinkLongSpin        : "sfx/slot/190/190LinkLongspin.mp3",
    LMatch              : "sfx/slot/190/190LMatch.mp3",
    LinkSum             : "sfx/slot/190/190LinkSum.mp3",
    LinkSum02           : "sfx/slot/190/190LinkSum02.mp3",
    LinkResult          : "sfx/slot/190/190LinkResult.mp3",

    //Mini Game
    MiniBgm             : "sfx/slot/190/190MiniBgm.mp3",
    MiniIntro           : "sfx/slot/190/190MiniIntro.mp3",
    MiniInfo            : "sfx/slot/190/190MiniInfo.mp3",
    MiniCount           : "sfx/slot/190/190MiniCount.mp3",
    Mystery01           : "sfx/slot/190/190Mystery01.mp3",
    Mystery02           : "sfx/slot/190/190Mystery02.mp3",
    Mystery03           : "sfx/slot/190/190Mystery03.mp3",
    MiniWild            : "sfx/slot/190/190MiniWild.mp3",
    RandomS01           : "sfx/slot/190/190RandomS01.mp3",
    RandomS02           : "sfx/slot/190/190RandomS02.mp3",
    Zone                : "sfx/slot/190/190Zone.mp3",
    Zone02              : "sfx/slot/190/190Zone02.mp3",

    // VOICE
    JVoice01            : "sfx/slot/190/190JVoice01.mp3",
    JVoice02            : "sfx/slot/190/190JVoice02.mp3",
    JVoice03            : "sfx/slot/190/190JVoice03.mp3",
    JVoice04            : "sfx/slot/190/190JVoice04.mp3",
    JVoice05            : "sfx/slot/190/190JVoice05.mp3",
    JVoice06            : "sfx/slot/190/190JVoice06.mp3",
    MiniVoice01         : "sfx/slot/190/190MiniVoice01.mp3",
    MiniVoice02         : "sfx/slot/190/190MiniVoice02.mp3",
    MiniVoice03         : "sfx/slot/190/190MiniVoice03.mp3",
    MiniVoice04         : "sfx/slot/190/190MiniVoice04.mp3",

};
window.g_sndSlot190 = ResPack.create( "sndSlot190", sndSlot190 ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ PlushCarnival ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot192 = {
    // INTRO
    Intro               : "sfx/slot/192/192Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/192/192Bgm.mp3",
    SG_Bgm              : "sfx/slot/192/192LinkBgm.mp3",
    SG_DP_Bgm           : "sfx/slot/192/192BBgm.mp3",
    PG_Bgm              : "sfx/slot/192/192FsBgm.mp3",

    // PAY
    Spin                : "sfx/slot/192/192Spin.mp3",
    ReelStop            : "sfx/slot/192/192ReelStop.mp3",
    MPayCount           : "sfx/slot/192/192MPayCount.mp3",
    NPayCount01         : "sfx/slot/192/192NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/192/192NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/192/192NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/192/192NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/192/192NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/192/192NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/192/192MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/192/192JackpotPopup.mp3",

    // NORMAL
    SLocking1           : "sfx/slot/192/192SLocking01.mp3",
    SLocking2           : "sfx/slot/192/192SLocking02.mp3",
    SLocking3           : "sfx/slot/192/192SLocking03.mp3",
    SLocking4           : "sfx/slot/192/192SLocking04.mp3",
    SLocking5           : "sfx/slot/192/192SLocking05.mp3",
    WildTrail           : "sfx/slot/192/192PotTrail.mp3",
    PotPre              : "sfx/slot/192/192PotPre.mp3",
    PotOpen             : "sfx/slot/192/192PotOpen.mp3",
    SMatch              : "sfx/slot/192/192SMatch.mp3",
    Unlock              : "sfx/slot/192/192Unlock.mp3",
    TipOver             : "sfx/slot/192/192TipOver.mp3",
    LongSpin            : "sfx/slot/192/192Longspin.mp3",

    // LINK
    PG_Intro            : "sfx/slot/192/192LinkIntro.mp3",
    PG_Spin             : "sfx/slot/192/192LinkSpin.mp3",
    PG_ReelStop         : "sfx/slot/192/192LinkReelstop.mp3",
    PG_CountOpen        : "sfx/slot/192/192LinkCount.mp3",
    PG_CountReset       : "sfx/slot/192/192LinkReset.mp3",
    PG_Locking1         : "sfx/slot/192/192LLocking01.mp3",
    PG_Locking2         : "sfx/slot/192/192LLocking02.mp3",
    PG_Trail1           : "sfx/slot/192/192LTrail01.mp3",
    PG_Trail2           : "sfx/slot/192/192LTrail02.mp3",
    PG_Trail3           : "sfx/slot/192/192LTrail03.mp3",
    PG_Trail4           : "sfx/slot/192/192LTrail04.mp3",
    PG_Trail5           : "sfx/slot/192/192LTrail05.mp3",
    PG_WinPanelOpen     : "sfx/slot/192/192LinkPannel.mp3",
    PG_Result           : "sfx/slot/192/192LinkResult.mp3",
    PG_TrailCount1      : "sfx/slot/192/192LTrailCount01.mp3",
    PG_TrailCount2      : "sfx/slot/192/192LTrailCount02.mp3",

    //FREE SPIN
    SG_Intro            : "sfx/slot/192/192FsIntro.mp3",
    SG_Locking          : "sfx/slot/192/192FsLocking.mp3",
    SG_FrameOpen        : "sfx/slot/192/192Frame01.mp3",
    SG_FrameUpgrade     : "sfx/slot/192/192Frame02.mp3",
    SG_FrameOff         : "sfx/slot/192/192Frame03.mp3",
    SG_DP_Intro         : "sfx/slot/192/192BIntro.mp3",
    SG_Reel             : "sfx/slot/192/192BReel.mp3",
    SG_Multiple         : "sfx/slot/192/192BMulti.mp3",
    SG_Trail            : "sfx/slot/192/192BTrail.mp3",
    SG_Result           : "sfx/slot/192/192FsResult.mp3",
    SG_ReelStop         : "sfx/slot/192/192BReelStop.mp3",

    // VOICE
    JVoice00            : "sfx/slot/192/192JVoice01.mp3"
};
window.g_sndSlot192 = ResPack.create( "sndSlot192", sndSlot192 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ AlchemyTrio BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot193 = {
    // intro
    Intro               : 'sfx/slot/193/193Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/193/193Bgm.mp3',
    LinkBgm             : 'sfx/slot/193/193LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/193/193Spin.mp3',
    ReelStop            : 'sfx/slot/193/193ReelStop.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/193/193LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/193/193LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/193/193LinkLongspin.mp3',

    // ui
    SpinCountUIOpen     : 'sfx/slot/193/193LinkCount.mp3',
    SpinCountUIReset    : 'sfx/slot/193/193LinkReset.mp3',
    BonusGame       : 'sfx/slot/193/193Upgrade.mp3',

    // Pot
    PotChange           : 'sfx/slot/193/193BetChange.mp3',
    PotCollect          : 'sfx/slot/193/193Trail.mp3',
    PotStepUp           : 'sfx/slot/193/193PotPre.mp3',
    PotOpen             : 'sfx/slot/193/193PotOpen.mp3',
    PotSave             : 'sfx/slot/193/193PotSave03.mp3',
    PotChoice           : 'sfx/slot/193/193BuyPotOpen.mp3',

    // pay
    MPayCount           : 'sfx/slot/193/193MPayCount.mp3',
    NPayCount01         : 'sfx/slot/193/193NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/193/193NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/193/193NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/193/193NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/193/193NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/193/193NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/193/193JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/193/193JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/193/193JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/193/193JVoice04.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/193/193MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/193/193JackpotPopup.mp3',
    BuyBonusPopup       : 'sfx/slot/193/193Buypopup.mp3',
    SaveSelectPopup     : 'sfx/slot/193/193PotSave01.mp3',
    BtnSaveSelect       : 'sfx/slot/193/193PotSave02.mp3',
    LinkIntroPopup      : 'sfx/slot/193/193LinkIntro.mp3',
    ResultPopup         : 'sfx/slot/193/193LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/193/193Unlock.mp3',

    // Trail
    TrailToBlue         : 'sfx/slot/193/193SymTrail01.mp3',
    TrailRedToDP        : 'sfx/slot/193/193SymTrail02.mp3',
    TrailDPToGreen      : 'sfx/slot/193/193SymTrail03.mp3',
    TrailDPToWin        : 'sfx/slot/193/193LinkSum.mp3',
    TrailCoinToWin      : 'sfx/slot/193/193LinkSum02.mp3',

    // symbol
    SymbolOpenDP        : 'sfx/slot/193/193LinkReveal.mp3',
    SymbolOpenJackpot   : 'sfx/slot/193/193LinkReveal02.mp3',
    SymbolLocking0      : 'sfx/slot/193/193LsymLocking01.mp3',
    SymbolLocking1      : 'sfx/slot/193/193LsymLocking05.mp3',
    SymbolLocking2      : 'sfx/slot/193/193LsymLocking03.mp3',
    SymbolLocking3      : 'sfx/slot/193/193LsymLocking02.mp3',
    SymbolLocking4      : 'sfx/slot/193/193LsymLocking04.mp3',
    SymbolBlueBonus     : 'sfx/slot/193/193Upgrade02.mp3',
    SymbolBonusStart    : 'sfx/slot/193/193Upgrade03.mp3'

};
window.g_sndSlot193 = ResPack.create( 'sndSlot193', sndSlot193 ).concat( g_sfxSlotCommon );
//-- ↑↑↑ AlchemyTrio END ↑↑↑ -----------//endregion

//-- ↑↑↑ WickedBooshFamily BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot194 = {
    //기본로직 정의
    Intro:                  'sfx/slot/194/194Intro.mp3',
    NormalBgm:              'sfx/slot/194/194Bgm.mp3',
    LinkBgm:                'sfx/slot/194/194LinkBgm.mp3',
    FreeBgm:                'sfx/slot/194/194FsBgm.mp3',
    Spin:                   'sfx/slot/194/194Spin.mp3',
    ReelStop:               'sfx/slot/194/194ReelStop.mp3',
    MPayCount:              'sfx/slot/194/194MPayCount.mp3',
    NPayCount01:            'sfx/slot/194/194NPayCount01.mp3',
    NPayCount01End:         'sfx/slot/194/194NPayCount01End.mp3',
    NPayCount02:            'sfx/slot/194/194NPayCount02.mp3',
    NPayCount02End:         'sfx/slot/194/194NPayCount02End.mp3',
    NPayCount03:            'sfx/slot/194/194NPayCount03.mp3',
    NPayCount03End:         'sfx/slot/194/194NPayCount03End.mp3',

    Longspin:               'sfx/slot/194/194Longspin.mp3',
    BetLimitOver:           'sfx/slot/194/194Unlock.mp3',
    MajorPopup:             'sfx/slot/194/194MajorPopup.mp3',
    JackpotPopup:           'sfx/slot/194/194JackpotPopup.mp3',

    FsIntro:                'sfx/slot/194/194FsIntro.mp3',
    FsResult:               'sfx/slot/194/194FsResult.mp3',

    LinkIntro:              'sfx/slot/194/194LinkIntro.mp3',
    LinkSpin:               'sfx/slot/194/194LinkSpin.mp3',
    LinkReelstop:           'sfx/slot/194/194LinkReelstop.mp3',
    LinkLongspin:           'sfx/slot/194/194LinkLongspin.mp3',
    LinkResult:             'sfx/slot/194/194LinkResult.mp3',

    JackpotVoice0:               'sfx/slot/194/194JVoice01.mp3',
    JackpotVoice1:               'sfx/slot/194/194JVoice02.mp3',
    JackpotVoice2:               'sfx/slot/194/194JVoice03.mp3',
    JackpotVoice3:               'sfx/slot/194/194JVoice04.mp3',
    JackpotVoice4:               'sfx/slot/194/194JVoice05.mp3',

    //Trail:                'sfx/slot/194/194Trail.mp3',
    //MajorwinPopup       : 'sfx/slot/186/186MajorPopup.mp3',
    //기본로직 정의

    //추가로직
    QLocking:               'sfx/slot/194/194QLocking.mp3',

    SLocking00:             'sfx/slot/194/194SLocking01.mp3',
    SLocking01:             'sfx/slot/194/194SLocking02.mp3',
    SLocking02:             'sfx/slot/194/194SLocking03.mp3',
    SLocking03:             'sfx/slot/194/194SLocking04.mp3',
    SLocking04:             'sfx/slot/194/194SLocking05.mp3',

    HLocking00:             'sfx/slot/194/194HLocking01.mp3',
    HLocking01:             'sfx/slot/194/194HLocking02.mp3',
    HLocking02:             'sfx/slot/194/194HLocking03.mp3',
    HLocking03:             'sfx/slot/194/194HLocking04.mp3',
    HLocking04:             'sfx/slot/194/194HLocking05.mp3',

    QMatch:                 'sfx/slot/194/194QMatch.mp3',
    ScatterMatch:           'sfx/slot/194/194SMatch.mp3',
    LinkMatch:              'sfx/slot/194/194HMatch.mp3',
    LinkCount:              'sfx/slot/194/194LinkCount.mp3',
    LinkReset:              'sfx/slot/194/194LinkReset.mp3',
    LHLocking:              'sfx/slot/194/194LHLocking.mp3',

    LHSpin:                 'sfx/slot/194/194LHSpin.mp3',
    LHReelStop01:           'sfx/slot/194/194LHReelStop01.mp3',
    LHReelStop02:           'sfx/slot/194/194LHReelStop02.mp3',
    LinkSum:                'sfx/slot/194/194LinkSum.mp3',
    LinkSum02:              'sfx/slot/194/194LinkSum02.mp3',

    FsFrame:                'sfx/slot/194/194FsFrame.mp3',
    FsExpand:               'sfx/slot/194/194FsExpand.mp3',

    LHSpin:                 'sfx/slot/194/194LHSpin.mp3',
    HReel:                  'sfx/slot/194/194HReel.mp3',
    FsCount:                'sfx/slot/194/194FsCount.mp3',
};
window.g_sndSlot194 = ResPack.create('sndSlot194', sndSlot194).concat(g_sfxSlotCommon);

//region -- ↓↓↓ Blasting Bulls ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot195 = {
    // INTRO
    Intro               : "sfx/slot/195/195Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/195/195Bgm.mp3",
    LinkBgm             : "sfx/slot/195/195LinkBgm.mp3",
    FsBgm               : "sfx/slot/195/195FsBgm.mp3",
    PotBgm               : "sfx/slot/195/195PotBgm.mp3",

    // PAY
    Spin                : "sfx/slot/195/195Spin.mp3",
    ReelStop            : "sfx/slot/195/195ReelStop.mp3",
    MPayCount           : "sfx/slot/195/195MPayCount.mp3",
    NPayCount01         : "sfx/slot/195/195NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/195/195NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/195/195NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/195/195NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/195/195NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/195/195NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/195/195MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/195/195JackpotPopup.mp3",

    // NORMAL
    SLocking01           : "sfx/slot/195/195SLocking01.mp3",
    SLocking02           : "sfx/slot/195/195SLocking02.mp3",
    SLocking03           : "sfx/slot/195/195SLocking03.mp3",
    SLocking04           : "sfx/slot/195/195SLocking04.mp3",
    SLocking05           : "sfx/slot/195/195SLocking05.mp3",
    SLocking06           : "sfx/slot/195/195SLocking06.mp3",
    GLocking01           : "sfx/slot/195/195GLocking01.mp3",
    GLocking02           : "sfx/slot/195/195GLocking02.mp3",
    GLocking03           : "sfx/slot/195/195GLocking03.mp3",
    GLocking04           : "sfx/slot/195/195GLocking04.mp3",
    GLocking05           : "sfx/slot/195/195GLocking05.mp3",
    GLocking06           : "sfx/slot/195/195GLocking06.mp3",

    SMatch              : "sfx/slot/195/195SMatch.mp3",
    PotCount            : "sfx/slot/195/195PotCount.mp3",
    PotOpen             : "sfx/slot/195/195PotOpen.mp3",
    PotTrail            : "sfx/slot/195/195PotTrail.mp3",
    Unlock              : "sfx/slot/195/195Unlock.mp3",
    Feature01           : "sfx/slot/195/195Feature01.mp3",
    Feature02           : "sfx/slot/195/195Feature02.mp3",
    Reveal              : "sfx/slot/195/195Reveal.mp3",
    Reveal02            : "sfx/slot/195/195Reveal02.mp3",
    Longspin            : "sfx/slot/195/195Longspin.mp3",

    //Link Game
    Count               : "sfx/slot/195/195Count.mp3",
    LinkIntro           : "sfx/slot/195/195LinkIntro.mp3",
    LinkSpin            : "sfx/slot/195/195LinkSpin.mp3",
    LinkReelStop        : "sfx/slot/195/195LinkReelstop.mp3",
    LinkReset           : "sfx/slot/195/195LinkReset.mp3",
    LinkFrame01         : "sfx/slot/195/195LinkFrame01.mp3",
    LinkFrame02         : "sfx/slot/195/195LinkFrame02.mp3",
    LsymLocking         : "sfx/slot/195/195LsymLocking.mp3",
    LinkUnlock          : "sfx/slot/195/195LinkUnlock.mp3",

    LinkWheelSpin       : "sfx/slot/195/195LinkWheelSpin.mp3",
    LinkWheelSpinEnd    : "sfx/slot/195/195LinkWheelSpinEnd.mp3",
    LinkWheelSpinMatch  : "sfx/slot/195/195LinkWheelSpinMatch.mp3",

    LinkSum             : "sfx/slot/195/195LinkSum.mp3",
    LinkSum02           : "sfx/slot/195/195LinkSum02.mp3",
    LinkResult          : "sfx/slot/195/195LinkResult.mp3",

    //Free Spin
    FsIntro             : "sfx/slot/195/195FsIntro.mp3",
    FsRetrigger         : "sfx/slot/195/195Retrigger.mp3",
    FsIntroCount        : "sfx/slot/195/195FsIntroCount.mp3",
    FsIntroCountEnd     : "sfx/slot/195/195FsIntroCountEnd.mp3",
    FsSticky            : "sfx/slot/195/195FsSticky.mp3",
    FsCount             : "sfx/slot/195/195FsCount.mp3",
    FsJLocking          : "sfx/slot/195/195FsJLocking.mp3",
    FsJMatch            : "sfx/slot/195/195FsJMatch.mp3",
    FsResult            : "sfx/slot/195/195FsResult.mp3",

    // VOICE
    JVoice01            : "sfx/slot/195/195JVoice01.mp3",
    JVoice02            : "sfx/slot/195/195JVoice02.mp3",
    JVoice03            : "sfx/slot/195/195JVoice03.mp3",
    JVoice04            : "sfx/slot/195/195JVoice04.mp3",

};
window.g_sndSlot195 = ResPack.create( "sndSlot195", sndSlot195 ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ Eggcellent Atelier ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot196 = {
    // INTRO
    Intro               : "sfx/slot/196/196Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/196/196Bgm.mp3",
    FG_Bgm              : "sfx/slot/196/196FsBgm.mp3",
    LG_Bgm              : "sfx/slot/196/196LinkBgm.mp3",
    WG_Bgm              : "sfx/slot/196/196WheelBgm.mp3",

    // PAY
    Spin                : "sfx/slot/196/196Spin.mp3",
    ReelStop            : "sfx/slot/196/196ReelStop.mp3",
    MPayCount           : "sfx/slot/196/196MPayCount.mp3",
    NPayCount01         : "sfx/slot/196/196NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/196/196NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/196/196NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/196/196NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/196/196NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/196/196NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/196/196MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/196/196JackpotPopup.mp3",
    JackpotPopup_Boost  : "sfx/slot/196/196JackpotBoost.mp3",

    // NORMAL
    DLocking0           : "sfx/slot/196/196DLocking01.mp3",
    DLocking1           : "sfx/slot/196/196DLocking02.mp3",
    DLocking2           : "sfx/slot/196/196DLocking03.mp3",
    DLocking3           : "sfx/slot/196/196DLocking04.mp3",
    DLocking4           : "sfx/slot/196/196DLocking05.mp3",
    PLocking0           : "sfx/slot/196/196PLocking01.mp3",
    PLocking1           : "sfx/slot/196/196PLocking02.mp3",
    PLocking2           : "sfx/slot/196/196PLocking03.mp3",
    PLocking3           : "sfx/slot/196/196PLocking04.mp3",
    PLocking4           : "sfx/slot/196/196PLocking05.mp3",
    JLocking            : "sfx/slot/196/196JLocking.mp3",
    Trail               : "sfx/slot/196/196Trail.mp3",
    PotPre              : "sfx/slot/196/196PotPre.mp3",
    PotOpen             : "sfx/slot/196/196PotOpen.mp3",
    PotGauge            : "sfx/slot/196/196Guage01.mp3",
    PotLastGauge        : "sfx/slot/196/196Guage02.mp3",
    WheelOpen           : "sfx/slot/196/1965WheelOpen.mp3",
    Unlock              : "sfx/slot/196/196Unlock.mp3",
    TipOver             : "sfx/slot/196/196TipOver.mp3",

    //WHEEL
    WheelIntro          : 'sfx/slot/196/196WheelPopup.mp3',
    WheelIntro_Super    : 'sfx/slot/196/196SuperWheelPopup.mp3',
    WheelSpin           : 'sfx/slot/196/196WheelSpin.mp3',
    WheelJackpotMatch   : 'sfx/slot/196/196WheelMatch01.mp3',
    WheelBoostMatch     : 'sfx/slot/196/196WheelMatch02.mp3',
    WheelRemoveEdge     : 'sfx/slot/196/196WheelRemove.mp3',
    WheelBoostIntro     : 'sfx/slot/196/196WheelBoost.mp3',

    // LINK
    LG_Intro            : "sfx/slot/196/196LinkIntro.mp3",
    LG_Super_Intro      : "sfx/slot/196/196SuperLinkIntro.mp3",
    LG_SuperFrame       : "sfx/slot/196/196LinkFrame.mp3",
    LG_Locking1         : "sfx/slot/196/196LsymLocking01.mp3",
    LG_Locking2         : "sfx/slot/196/196LsymLocking02.mp3",
    LG_FrameUpgrade     : "sfx/slot/196/196Upgrade.mp3",
    LG_LongSpin         : "sfx/slot/196/196LinkLongspin.mp3",
    LG_Spin             : "sfx/slot/196/196LinkSpin.mp3",
    LG_SpinStop         : "sfx/slot/196/196LinkReelStop.mp3",
    LG_Reset            : "sfx/slot/196/196LinkReset.mp3",
    LG_Trail1           : "sfx/slot/196/196LinkSum.mp3",
    LG_Trail2           : "sfx/slot/196/196LinkSum02.mp3",
    LG_Result           : "sfx/slot/196/196LinkResult.mp3",

    //FREE SPIN
    FG_Intro            : "sfx/slot/196/196FsIntro.mp3",
    FG_SuperIntro       : "sfx/slot/196/196SuperFsIntro.mp3",
    FG_IntroCount       : "sfx/slot/196/196FsIntroCount.mp3",
    FG_IntroCountEnd    : "sfx/slot/196/196FsIntroCountEnd.mp3",
    FG_Frame            : "sfx/slot/196/196FsFrame.mp3",
    FG_PLock            : "sfx/slot/196/196FsPlusLocking.mp3",
    FG_Plus             : "sfx/slot/196/196FsPlusMatch.mp3",
    FG_Result           : "sfx/slot/196/196FsResult.mp3",

    // VOICE
    JVoice00            : "sfx/slot/196/196JVoice01.mp3",
    JVoice01            : "sfx/slot/196/196JVoice02.mp3",
    JVoice02            : "sfx/slot/196/196JVoice03.mp3",
    JVoice03            : "sfx/slot/196/196JVoice04.mp3",
    JVoice04            : "sfx/slot/196/196JVoice05.mp3"
};
window.g_sndSlot196 = ResPack.create( "sndSlot196", sndSlot196 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot197 = {
    // intro
    Intro               : 'sfx/slot/197/197Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/197/197Bgm.mp3',
    FreeBgm             : 'sfx/slot/197/197FsBgm.mp3',
    LinkBgm             : 'sfx/slot/197/197LinkBgm.mp3',
    BonusBgm            : 'sfx/slot/197/197BonusBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/197/197Spin.mp3',
    ReelStop            : 'sfx/slot/197/197ReelStop.mp3',
    LongSpin            : 'sfx/slot/197/197Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/197/197LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/197/197LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/197/197LinkLongspin.mp3',

    // ui
    SpinCountUIReset    : 'sfx/slot/197/197LinkReset.mp3',
    BonusGameWinFx      : 'sfx/slot/197/197BonusNoti.mp3',
    FreespinTotalWin    : 'sfx/slot/197/197FsCount.mp3',

    // Pot
    PotStepUp           : 'sfx/slot/197/197PotPre.mp3',
    PotLevelUp          : 'sfx/slot/197/197PotLevelup.mp3',
    PotOpen             : 'sfx/slot/197/197PotOpen.mp3',

    // pay
    MPayCount           : 'sfx/slot/197/197MPayCount.mp3',
    NPayCount01         : 'sfx/slot/197/197NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/197/197NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/197/197NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/197/197NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/197/197NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/197/197NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/197/197JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/197/197JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/197/197JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/197/197JVoice04.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/197/197MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/197/197JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/197/197FsIntro.mp3',
    LinkIntroPopup      : 'sfx/slot/197/197LinkIntro.mp3',
    BonusIntroPopup     : 'sfx/slot/197/197BonusIntro.mp3',
    FreeResultPopup     : 'sfx/slot/197/197FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/197/197LinkResult.mp3',
    BonusResultPopup    : 'sfx/slot/197/197BonusResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/197/197Unlock.mp3',

    // tooltip
    TooltipOpen         : 'sfx/slot/197/197TipOver.mp3',

    // Trail
    TrailDPToBWin       : 'sfx/slot/197/197BonusSum01.mp3',
    TrailJPToBWin       : 'sfx/slot/197/197BonusSum02.mp3',
    TrailSymbolToWin    : 'sfx/slot/197/197LinkSum.mp3',

    // symbol
    SymbolOpenMystery   : 'sfx/slot/197/197Open.mp3',
    SymbolOpenMysteryFs : 'sfx/slot/197/197FsOpen.mp3',
    SymbolCloseMystery  : 'sfx/slot/197/197FsClose.mp3',

    SymbolWildTrail     : 'sfx/slot/197/197Trail.mp3',

    SymbolSLocking0     : 'sfx/slot/197/197SLocking01.mp3',
    SymbolSLocking1     : 'sfx/slot/197/197SLocking02.mp3',
    SymbolSLocking2     : 'sfx/slot/197/197SLocking03.mp3',
    SymbolSLocking3     : 'sfx/slot/197/197SLocking04.mp3',
    SymbolSLocking4     : 'sfx/slot/197/197SLocking05.mp3',

    SymbolLLocking0     : 'sfx/slot/197/197LLocking01.mp3',
    SymbolLLocking1     : 'sfx/slot/197/197LLocking02.mp3',
    SymbolLLocking2     : 'sfx/slot/197/197LLocking03.mp3',
    SymbolLLocking3     : 'sfx/slot/197/197LLocking04.mp3',
    SymbolLLocking4     : 'sfx/slot/197/197LLocking05.mp3',

    SymbolMLocking      : 'sfx/slot/197/197MLocking.mp3',

    SymbolLinkLocking   : 'sfx/slot/197/197SymLocking.mp3',
    SymbolMergeDP       : 'sfx/slot/197/197SymTransform01.mp3',
    SymbolMergeTrain    : 'sfx/slot/197/197SymTransform02.mp3',
    SymbolBonusGame     : 'sfx/slot/197/197Tmatch02.mp3',

    SymbolMatchScatter  : 'sfx/slot/197/197SMatch.mp3',
    SymbolMatchLink     : 'sfx/slot/197/197LMatch.mp3'
};
window.g_sndSlot197 = ResPack.create( 'sndSlot197', sndSlot197 ).concat( g_sfxSlotCommon );

//region [ Colossal Zodiac ]
window.sndSlot198 = {
    // INTRO
    Intro               : "sfx/slot/198/198Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/198/198Bgm.mp3",
    FsBgm               : "sfx/slot/198/198FsBgm.mp3",
    WheelBgm            : "sfx/slot/198/198WheelBgm.mp3",
    RespinBgm           : "sfx/slot/198/198RespinBgm.mp3",

    // PAY
    Spin                : "sfx/slot/198/198Spin.mp3",
    ReelStop            : "sfx/slot/198/198ReelStop.mp3",
    MPayCount           : "sfx/slot/198/198MPayCount.mp3",
    NPayCount01         : "sfx/slot/198/198NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/198/198NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/198/198NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/198/198NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/198/198NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/198/198NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/198/198MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/198/198JackpotPopup.mp3",
    JackpotBoost        : "sfx/slot/198/198JackpotBoost.mp3",

    // NORMAL
    SLocking01          : "sfx/slot/198/198SLocking01.mp3",
    SLocking02          : "sfx/slot/198/198SLocking02.mp3",
    WLocking01          : "sfx/slot/198/198WLocking01.mp3",
    WLocking02          : "sfx/slot/198/198WLocking02.mp3",
    Respin              : "sfx/slot/198/198Respin.mp3",
    SMatch              : "sfx/slot/198/198SMatch.mp3",
    WMatch              : "sfx/slot/198/198WMatch.mp3",
    Longspin            : "sfx/slot/198/198Longspin.mp3",
    Unlock              : "sfx/slot/198/198Unlock.mp3",
    ExtraFrame          : "sfx/slot/198/198ExtraFrame.mp3",

    //Wheel Game
    WheelPopup          : "sfx/slot/198/198WheelPopup.mp3",
    WheelSpin0          : "sfx/slot/198/198WheelSpin.mp3",
    WheelSpin1          : "sfx/slot/198/198WheelSpin02.mp3",
    WheelMatch01        : "sfx/slot/198/198WheelMatch01.mp3",
    WheelMatch02        : "sfx/slot/198/198WheelMatch02.mp3",
    WheelMatch03        : "sfx/slot/198/198WheelMatch03.mp3",
    WheelBoost          : "sfx/slot/198/198WheelBoost.mp3",
    WheelResult         : "sfx/slot/198/198WheelResult.mp3",

    //Free Spin
    FsIntro             : "sfx/slot/198/198FsIntro.mp3",
    FsRemove            : "sfx/slot/198/198FsRemove.mp3",
    FsCount             : "sfx/slot/198/198FsCount.mp3",
    FsResult            : "sfx/slot/198/198FsResult.mp3",
    FsPlus              : "sfx/slot/198/198FsPlus.mp3",

    // VOICE
    JVoice01            : "sfx/slot/198/198JVoice01.mp3",
    JVoice02            : "sfx/slot/198/198JVoice02.mp3",
    JVoice03            : "sfx/slot/198/198JVoice03.mp3",
    JVoice04            : "sfx/slot/198/198JVoice04.mp3",
    JVoice05            : "sfx/slot/198/198JVoice05.mp3",
    JVoice06            : "sfx/slot/198/198JVoice06.mp3",
    JVoice07            : "sfx/slot/198/198JVoice07.mp3",
    JVoice08            : "sfx/slot/198/198JVoice08.mp3",
    JVoice09            : "sfx/slot/198/198JVoice09.mp3",
    JVoice10            : "sfx/slot/198/198JVoice10.mp3",

};
window.g_sndSlot198 = ResPack.create( "sndSlot198", sndSlot198 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ Slot199 BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot199 = {
    // intro
    Intro               : 'sfx/slot/199/199Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/199/199Bgm.mp3',
    LinkBgm             : 'sfx/slot/199/199LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/199/199Spin.mp3',
    ReelStop            : 'sfx/slot/199/199ReelStop.mp3',
    LongSpinFx          : 'sfx/slot/199/199Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/199/199MPayCount.mp3',
    NPayCount01         : 'sfx/slot/199/199NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/199/199NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/199/199NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/199/199NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/199/199NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/199/199NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/199/199Unlock.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/199/199LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/199/199LinkReelstop.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/199/199MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/199/199JackpotPopup.mp3',
    LinkspinIntroPopup  : 'sfx/slot/199/199LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/199/199LinkResult.mp3',

    //락킹사운드
    SLocking00:             'sfx/slot/199/199DLocking01.mp3',
    SLocking01:             'sfx/slot/199/199DLocking02.mp3',
    SLocking02:             'sfx/slot/199/199DLocking03.mp3',
    SLocking03:             'sfx/slot/199/199DLocking04.mp3',
    SLocking04:             'sfx/slot/199/199DLocking05.mp3',

    HLocking00:             'sfx/slot/199/199LLocking01.mp3',
    HLocking01:             'sfx/slot/199/199LLocking02.mp3',
    HLocking02:             'sfx/slot/199/199LLocking03.mp3',
    HLocking03:             'sfx/slot/199/199LLocking04.mp3',
    HLocking04:             'sfx/slot/199/199LLocking05.mp3',

    // symbol
    ScatterMatch        : 'sfx/slot/199/199SMatch.mp3',
    LinkMatch           : 'sfx/slot/199/199LMatch.mp3',

    LsymLocking00           : 'sfx/slot/199/199LsymLocking01.mp3',
    LsymLocking01           : 'sfx/slot/199/199LsymLocking02.mp3',
    LsymLocking02           : 'sfx/slot/199/199LsymLocking03.mp3',
    LsymLocking03           : 'sfx/slot/199/199LsymLocking04.mp3',
    LsymLocking04           : 'sfx/slot/199/199LsymLocking05.mp3',

    LinkDrop           : 'sfx/slot/199/199LinkDrop.mp3',
    LinkUnlock           : 'sfx/slot/199/199LinkUnlock.mp3',

    //QuickHit
    LinkAward01           : 'sfx/slot/199/199LinkAward01.mp3',
    QuickCount           : 'sfx/slot/199/199LinkAward02.mp3',
    LinkAward03           : 'sfx/slot/199/199LinkAward03.mp3',

    //TRAIL
    LinkTrail00           : 'sfx/slot/199/199LinkTrail01.mp3',
    LinkTrail01           : 'sfx/slot/199/199LinkTrail02.mp3',
    LinkTrail02           : 'sfx/slot/199/199LinkTrail03.mp3',
    LinkTrail03           : 'sfx/slot/199/199LinkTrail04.mp3',

    LinkSum01           : 'sfx/slot/199/199LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/199/199LinkSum02.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/199/199JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/199/199JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/199/199JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/199/199JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/199/199JVoice05.mp3',       //A
    JackpotVoice5       : 'sfx/slot/199/199JVoice06.mp3',       //A


    // == Map MiniMap===
    MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    MapClick                    : 'sfx/slot/199/199MapClick.mp3',
    MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    MapOpen                   : 'sfx/slot/199/199MapOpen.mp3',
    MapNormalGauge            : 'sfx/slot/199/199MapNormalGauge.mp3',
    MapSuperbonusGauge        : 'sfx/slot/199/199MapSuperbonusGauge.mp3',

    ////POT
    // PotBonus                : 'sfx/slot/199/199PotOpen.mp3',
    // PotPre                : 'sfx/slot/199/199PotPre.mp3',
    // PotTrail                : 'sfx/slot/199/199PotTrail.mp3',

    ////FreeSpinCount
    // FsCount             :   'sfx/slot/199/199FsCount.mp3',
};
window.g_sndSlot199 = ResPack.create( 'sndSlot199', sndSlot199 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ Golden Raffle ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot202 = {
    // INTRO
    Intro               : "sfx/slot/202/202ntro.mp3",

    // BGM
    Bgm                 : "sfx/slot/202/202Bgm.mp3",
    FG_Bgm              : "sfx/slot/202/202FsBgm.mp3",

    // PAY
    Spin                : "sfx/slot/202/202Spin.mp3",
    ReelStop            : "sfx/slot/202/202ReelStop.mp3",
    MPayCount           : "sfx/slot/202/202MPayCount.mp3",
    NPayCount01         : "sfx/slot/202/202NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/202/202NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/202/202NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/202/202NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/202/202NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/202/202NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/202/202MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/202/202JackpotPopup.mp3",

    // NORMAL
    SLocking0           : "sfx/slot/202/202SLocking01.mp3",
    SLocking1           : "sfx/slot/202/202SLocking02.mp3",
    SLocking2           : "sfx/slot/202/202SLocking03.mp3",
    SLocking3           : "sfx/slot/202/202SLocking04.mp3",
    SLocking4           : "sfx/slot/202/202SLocking05.mp3",
    TLocking0           : "sfx/slot/202/202TLocking01.mp3",
    TLocking1           : "sfx/slot/202/202TLocking02.mp3",
    TLocking2           : "sfx/slot/202/202TLocking03.mp3",
    TLocking3           : "sfx/slot/202/202TLocking04.mp3",
    TLocking4           : "sfx/slot/202/202TLocking05.mp3",
    SMatch              : "sfx/slot/202/202SMatch.mp3",
    JLocking            : "sfx/slot/202/202JLocking.mp3",
    Trail               : "sfx/slot/202/202Trail.mp3",
    PotPre              : "sfx/slot/202/202PotPre.mp3",
    PotOpen             : "sfx/slot/202/202PotOpen.mp3",
    Unlock              : "sfx/slot/202/202Unlock.mp3",
    LongSpin            : "sfx/slot/202/202Longspin.mp3",
    Flipe01             : "sfx/slot/202/202Reveal01.mp3",
    Flipe02             : "sfx/slot/202/202Reveal02.mp3",
    Flipe03             : "sfx/slot/202/202Reveal03.mp3",
    Match01             : "sfx/slot/202/202TMatch01.mp3",
    Match02             : "sfx/slot/202/202TMatch02.mp3",
    Match03             : "sfx/slot/202/202TMatch03.mp3",
    FLipIdle            : "sfx/slot/202/202TPre.mp3",
    ResetIntro          : "sfx/slot/202/202TRed.mp3",
    CoinMatch           : "sfx/slot/202/202TResult.mp3",
    NotiReset           : "sfx/slot/202/202TReset.mp3",

    //FREE SPIN
    FG_Intro            : "sfx/slot/202/202FsIntro.mp3",
    FG_Retrigger        : "sfx/slot/202/202Retrigger.mp3",
    FG_Result           : "sfx/slot/202/202FsResult.mp3",

    // VOICE
    JVoice00            : "sfx/slot/202/202JVoice01.mp3",
    JVoice01            : "sfx/slot/202/202JVoice02.mp3",
    JVoice02            : "sfx/slot/202/202JVoice03.mp3",
    JVoice03            : "sfx/slot/202/202JVoice04.mp3",
    JVoice04            : "sfx/slot/202/202JVoice05.mp3",
    JVoice05            : "sfx/slot/202/202JVoice06.mp3"
};
window.g_sndSlot202 = ResPack.create( "sndSlot202", sndSlot202).concat( g_sfxSlotCommon );
//endregion

window.sndSlot200 = {
    // intro
    Intro               : 'sfx/slot/200/200Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/200/200Bgm.mp3',
    LinkBgm             : 'sfx/slot/200/200LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/200/200Spin.mp3',
    ReelStop            : 'sfx/slot/200/200ReelStop.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/200/200LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/200/200LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/200/200LinkLongspin.mp3',

    // ui
    //SpinCountUIOpen     : 'sfx/slot/200/200LinkCount.mp3',
    SpinCountUIReset    : 'sfx/slot/200/200LinkReset.mp3',
    //BonusGame       : 'sfx/slot/200/200Upgrade.mp3',

    // pay
    MPayCount           : 'sfx/slot/200/200MPayCount.mp3', //10
    NPayCount01         : 'sfx/slot/200/200NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/200/200NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/200/200NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/200/200NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/200/200NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/200/200NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/200/200JVoice01.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/200/200MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/200/200JackpotPopup.mp3',
    LinkIntroPopup      : 'sfx/slot/200/200LinkIntro.mp3', //20
    ResultPopup         : 'sfx/slot/200/200LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/200/200Unlock.mp3',

    // Trail
    TrailDPToEWPanel      : 'sfx/slot/200/200LinkTrail01.mp3',
    TrailEWPanelToEWSym   : 'sfx/slot/200/200LinkTrail02.mp3',
    TrailEWPanelToREWSym  : 'sfx/slot/200/200LinkTrail03.mp3',
    TrailDPToWin          : 'sfx/slot/200/200LinkSum01.mp3',
    TrailEWSymToWin       : 'sfx/slot/200/200LinkSum02.mp3',

    // symbol
    SymbolLockingLinkDp    : 'sfx/slot/200/200LsymLocking01.mp3',
    SymbolLockingLinkEW    : 'sfx/slot/200/200LsymLocking02.mp3',
    SymbolLockingLinkREW   : 'sfx/slot/200/200LsymLocking03.mp3',
    SymbolLockingDp0       : 'sfx/slot/200/200DLocking01.mp3',
    SymbolLockingDp1       : 'sfx/slot/200/200DLocking02.mp3', //30
    SymbolLockingDp2       : 'sfx/slot/200/200DLocking03.mp3',
    SymbolLockingDp3       : 'sfx/slot/200/200DLocking04.mp3',
    SymbolLockingDp4       : 'sfx/slot/200/200DLocking05.mp3',
    SymbolLockingCollect   : 'sfx/slot/200/200CLocking.mp3',
    SymbolLockingRpCollect : 'sfx/slot/200/200RLocking.mp3',

    //match
    CollectMatch           : 'sfx/slot/200/200Collect.mp3',
    RpCollectMatch         : 'sfx/slot/200/200RCollect.mp3',
    RpCollectClose         : 'sfx/slot/200/200RClose.mp3',
    RpEachWinClose         : 'sfx/slot/200/200LRClose.mp3',
    Dp6Match               : 'sfx/slot/200/200LMatch.mp3',
    RpEachWinMatch         : 'sfx/slot/200/200LRMatch.mp3',



    //tooltip
    TooltipOpen         : "sfx/slot/200/200TipOver.mp3",

};
window.g_sndSlot200 = ResPack.create( 'sndSlot200', sndSlot200 ).concat( g_sfxSlotCommon );

window.sndSlot201 = {
    // intro
    Intro               : 'sfx/slot/201/201Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/201/201Bgm.mp3',
    FreeBgm             : 'sfx/slot/201/201FsBgm.mp3',
    LinkBgm             : 'sfx/slot/201/201LinkBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/201/201Spin.mp3',
    ReelStop            : 'sfx/slot/201/201ReelStop.mp3',
    LongSpin            : 'sfx/slot/201/201Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/201/201LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/201/201LinkReelStop.mp3',

    // ui
    SpinCountUIReset    : 'sfx/slot/201/201LinkReset.mp3',
    //BonusGameWinFx      : 'sfx/slot/201/201BonusNoti.mp3',
    FreespinTotalWin    : 'sfx/slot/201/201FsCount.mp3',
    MysteryFx           : 'sfx/slot/201/201Mystery.mp3',
    MysterySpinFx       : 'sfx/slot/201/201MysterySpin.mp3',
    SelectBeanFx        : 'sfx/slot/201/201LinkFrame01.mp3',

    // pay
    MPayCount           : 'sfx/slot/201/201MPayCount.mp3',
    NPayCount01         : 'sfx/slot/201/201NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/201/201NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/201/201NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/201/201NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/201/201NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/201/201NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/201/201JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/201/201JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/201/201JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/201/201JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/201/201JVoice05.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/201/201MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/201/201JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/201/201FsIntro.mp3',
    LinkIntroPopup      : 'sfx/slot/201/201LinkIntro.mp3',
    FreeResultPopup     : 'sfx/slot/201/201FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/201/201LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/201/201Unlock.mp3',

    // symbol
    SymbolSLocking0     : 'sfx/slot/201/201SLocking01.mp3',
    SymbolSLocking1     : 'sfx/slot/201/201SLocking02.mp3',
    SymbolSLocking2     : 'sfx/slot/201/201SLocking03.mp3',
    SymbolSLocking3     : 'sfx/slot/201/201SLocking04.mp3',
    SymbolSLocking4     : 'sfx/slot/201/201SLocking05.mp3',
    SymbolSLocking5     : 'sfx/slot/201/201SLocking06.mp3',

    SymbolLLocking0     : 'sfx/slot/201/201LLocking01.mp3',
    SymbolLLocking1     : 'sfx/slot/201/201LLocking02.mp3',
    SymbolLLocking2     : 'sfx/slot/201/201LLocking03.mp3',
    SymbolLLocking3     : 'sfx/slot/201/201LLocking04.mp3',
    SymbolLLocking4     : 'sfx/slot/201/201LLocking05.mp3',
    SymbolLLocking5     : 'sfx/slot/201/201LLocking06.mp3',

    SymbolMatchScatter  : 'sfx/slot/201/201SMatch.mp3',
    SymbolMatchLink     : 'sfx/slot/201/201LMatch.mp3',

    SymbolCoinLocking : 'sfx/slot/201/201SymLocking01.mp3',
    SymbolCollectorLocking  : 'sfx/slot/201/201SymLocking02.mp3',
    SymbolCoinToDP      : 'sfx/slot/201/201LinkFrame02.mp3',
    SymbolCoinToJP      : 'sfx/slot/201/201LinkFrame03.mp3',
    SymbolCollectStart  : 'sfx/slot/201/201LinkCollect.mp3',
    SymbolCoinToCollector : 'sfx/slot/201/201LinkCollect02.mp3',
    SymbolCollectorSum  : 'sfx/slot/201/201LinkCollect03.mp3',

    // Trail
    TrailDPToBWin       : 'sfx/slot/201/201LinkSum01.mp3',
    TrailJPToBWin       : 'sfx/slot/201/201LinkSum02.mp3'
};
window.g_sndSlot201 = ResPack.create( 'sndSlot201', sndSlot201 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Slot199 BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot204 = {
    // intro
    Intro               : 'sfx/slot/204/204Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/204/204Bgm.mp3',
    FreeBgm             : 'sfx/slot/204/204FsBgm.mp3',
    LinkBgm             : 'sfx/slot/204/204MiniBgm.mp3',
    //MiniBgm          : 'sfx/slot/204/204MiniBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/204/204Spin.mp3',
    ReelStop            : 'sfx/slot/204/204ReelStop.mp3',
    LongSpin          : 'sfx/slot/204/204Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/204/204MPayCount.mp3',
    NPayCount01         : 'sfx/slot/204/204NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/204/204NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/204/204NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/204/204NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/204/204NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/204/204NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/204/204Unlock.mp3',

    // link spin
    // LinkSpin            : 'sfx/slot/204/204LinkSpin.mp3',
    // LinkReelStop        : 'sfx/slot/204/204LinkReelstop.mp3',
    //Freespin
    FreespinIntroPopup  : 'sfx/slot/204/204FsIntro.mp3',
    FreespinResultPopup       : 'sfx/slot/204/204FsResult.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/204/204MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/204/204JackpotPopup.mp3',
    // LinkspinIntroPopup  : 'sfx/slot/204/204LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/204/204MiniResult.mp3',

    // symbol
    ScatterMatch        : 'sfx/slot/204/204SMatch.mp3',
    // LinkMatch           : 'sfx/slot/204/204LMatch.mp3',
    SLocking0     : 'sfx/slot/204/204SLocking01.mp3',
    SLocking1     : 'sfx/slot/204/204SLocking02.mp3',
    SLocking2     : 'sfx/slot/204/204SLocking03.mp3',
    SLocking3     : 'sfx/slot/204/204SLocking04.mp3',
    SLocking4     : 'sfx/slot/204/204SLocking05.mp3',
    //TRAIL


    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/204/204JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/204/204JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/204/204JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/204/204JVoice04.mp3',       //A

    //추가구현
    PotOpen01       : 'sfx/slot/204/204PotOpen01.mp3',
    PotOpen02       : 'sfx/slot/204/204PotOpen02.mp3',
    PotTrail       : 'sfx/slot/204/204PotTrail.mp3',
    Mission01       : 'sfx/slot/204/204Mission01.mp3',
    Mission02       : 'sfx/slot/204/204Mission02.mp3',
    MiniIntro       : 'sfx/slot/204/204MiniIntro.mp3',
    WildMini01       : 'sfx/slot/204/204WildMini01.mp3',
    WildMini02       : 'sfx/slot/204/204WildMini02.mp3',
    MysteryMini01       : 'sfx/slot/204/204MysteryMini01.mp3',
    MysteryMini02       : 'sfx/slot/204/204MysteryMini02.mp3',
    MysteryMini03       : 'sfx/slot/204/204MysteryMini03.mp3',
    MovingMini01       : 'sfx/slot/204/204MovingMini01.mp3',
    MovingMini02       : 'sfx/slot/204/204MovingMini02.mp3',
    MovingMini03       : 'sfx/slot/204/204MovingMini03.mp3',
    MovingMini04       : 'sfx/slot/204/204MovingMini04.mp3',

    DoubleMini       : 'sfx/slot/204/204DoubleMini.mp3',
    JackpotMini01       : 'sfx/slot/204/204JackpotMini01.mp3',
    JackpotMini02       : 'sfx/slot/204/204JackpotMini02.mp3',

    MiniCount       : 'sfx/slot/204/204MiniCount.mp3',

    FsRemove       : 'sfx/slot/204/204FsRemove.mp3',
    FsRow01       : 'sfx/slot/204/204FsRow01.mp3',
    FsRow02       : 'sfx/slot/204/204FsRow02.mp3',
    FsSpin       : 'sfx/slot/204/204FsSpin.mp3',
    FsCount       : 'sfx/slot/204/204FsCount.mp3',

    MiniVoice01       : 'sfx/slot/204/204MiniVoice01.mp3',
    MiniVoice02       : 'sfx/slot/204/204MiniVoice02.mp3',
    MiniVoice03       : 'sfx/slot/204/204MiniVoice03.mp3',
    MiniVoice04       : 'sfx/slot/204/204MiniVoice04.mp3',

    ChangeBet          : 'sfx/slot/204/204BetChange.mp3',

};
window.g_sndSlot204 = ResPack.create( 'sndSlot204', sndSlot204 ).concat( g_sfxSlotCommon );

//region [ Crazy Rich Pandas ]
window.sndSlot203 = {
    // INTRO
    Intro               : "sfx/slot/203/203Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/203/203Bgm.mp3",
    FsBgm               : "sfx/slot/203/203FsBgm.mp3",
    LinkBgm             : "sfx/slot/203/203LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/203/203Spin.mp3",
    ReelStop            : "sfx/slot/203/203ReelStop.mp3",
    MPayCount           : "sfx/slot/203/203MPayCount.mp3",
    NPayCount01         : "sfx/slot/203/203NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/203/203NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/203/203NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/203/203NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/203/203NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/203/203NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/203/203MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/203/203JackpotPopup.mp3",

    // NORMAL
    SLocking01          : "sfx/slot/203/203SLocking01.mp3",
    SLocking02          : "sfx/slot/203/203SLocking02.mp3",
    SLocking03          : "sfx/slot/203/203SLocking03.mp3",
    LLocking01          : "sfx/slot/203/203LLocking01.mp3",
    LLocking02          : "sfx/slot/203/203LLocking02.mp3",
    LLocking03          : "sfx/slot/203/203LLocking03.mp3",
    RLocking            : "sfx/slot/203/203RLocking.mp3",
    BLocking01          : "sfx/slot/203/203BLocking01.mp3",
    BLocking02          : "sfx/slot/203/203BLocking02.mp3",
    BLocking03          : "sfx/slot/203/203BLocking03.mp3",
    SMatch              : "sfx/slot/203/203SMatch.mp3",
    LMatch              : "sfx/slot/203/203LMatch.mp3",
    TipOver             : "sfx/slot/203/203TipOver.mp3",
    Unlock              : "sfx/slot/203/203Unlock.mp3",
    Longspin            : "sfx/slot/203/203Longspin.mp3",

    // Link Game
    LinkIntro           : "sfx/slot/203/203LinkIntro.mp3",
    LinkSpin            : "sfx/slot/203/203LinkSpin.mp3",
    LinkReelStop        : "sfx/slot/203/203LinkReelStop.mp3",
    LinkReset           : "sfx/slot/203/203LinkReset.mp3",
    LinkLongspin        : "sfx/slot/203/203LinkLongspin.mp3",
    LsymLocking         : "sfx/slot/203/203LsymLocking.mp3",
    JLocking            : "sfx/slot/203/203JLocking.mp3",
    JOpen               : "sfx/slot/203/203JOpen.mp3",
    BoostFrame          : "sfx/slot/203/203BoostFrame.mp3",
    LinkRaw             : "sfx/slot/203/203LinkRaw.mp3",
    LinkRandom01        : "sfx/slot/203/203LinkRandom01.mp3",
    LinkRandom02        : "sfx/slot/203/203LinkRandom02.mp3",
    LinkUpgrade01       : "sfx/slot/203/203LinkUpgrade01.mp3",
    LinkUpgrade02       : "sfx/slot/203/203LinkUpgrade02.mp3",
    LinkCollect01       : "sfx/slot/203/203LinkCollect01.mp3",
    LinkCollect02       : "sfx/slot/203/203LinkCollect02.mp3",
    LinkCollect03       : "sfx/slot/203/203LinkCollect03.mp3",
    LinkAfterDP         : "sfx/slot/203/203LinkAfter.mp3",
    LinkSum01           : "sfx/slot/203/203LinkSum01.mp3",
    LinkSum02           : "sfx/slot/203/203LinkSum02.mp3",
    LinkResult          : "sfx/slot/203/203LinkResult.mp3",

    //Free Spin
    FsIntro             : "sfx/slot/203/203FsIntro.mp3",
    Retrigger           : "sfx/slot/203/203Retrigger.mp3",
    FsCount             : "sfx/slot/203/203FsCount.mp3",
    FsResult            : "sfx/slot/203/203FsResult.mp3",

    // VOICE
    JVoice01            : "sfx/slot/203/203JVoice01.mp3",
    JVoice02            : "sfx/slot/203/203JVoice02.mp3",
    JVoice03            : "sfx/slot/203/203JVoice03.mp3",
    JVoice04            : "sfx/slot/203/203JVoice04.mp3",
    JVoice05            : "sfx/slot/203/203JVoice05.mp3",

};
window.g_sndSlot203 = ResPack.create( "sndSlot203", sndSlot203 ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ Buzz Bonanza ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot205 = {
    // intro
    Intro               : 'sfx/slot/205/205Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/205/205Bgm.mp3',
    FreeBgm             : 'sfx/slot/205/205FsBgm.mp3',
    LinkBgm             : 'sfx/slot/205/205LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/205/205Spin.mp3',
    ReelStop            : 'sfx/slot/205/205ReelStop.mp3',
    LongSpin            : 'sfx/slot/205/205Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/205/205LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/205/205LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/205/205LinkLongspin.mp3',

    // ui
    BuzzBonusOn         : 'sfx/slot/205/205Guage.mp3',
    BuzzBonusFull       : 'sfx/slot/205/205FullGuage01.mp3',
    SpinCountUIReset    : 'sfx/slot/205/205LinkReset.mp3',
    FreespinTotalWin    : 'sfx/slot/205/205FsCount.mp3',
    SpinCountMax        : 'sfx/slot/205/205FullNoti.mp3',


    // pay
    MPayCount           : 'sfx/slot/205/205MPayCount.mp3',
    NPayCount01         : 'sfx/slot/205/205NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/205/205NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/205/205NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/205/205NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/205/205NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/205/205NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/205/205JVoice01.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/205/205MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/205/205JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/205/205FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/205/205FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/205/205LinkIntro.mp3',
    ResultPopup         : 'sfx/slot/205/205LinkResult.mp3',
    RewardPopup         : 'sfx/slot/205/205Reward.mp3',//?
    RewardPopupClick    : 'sfx/slot/205/205RewardClick.mp3',//?

    // betting
    BetLimitOver        : 'sfx/slot/205/205Unlock.mp3',

    // Trail
    TrailDPToEW           : 'sfx/slot/205/205LinkTrail.mp3',
    TrailDPToWin          : 'sfx/slot/205/205LinkSum01.mp3',
    TrailEWToWin          : 'sfx/slot/205/205LinkSum02.mp3',

    // symbol
    SymbolLockingScatter1  : 'sfx/slot/205/205SLocking01.mp3',
    SymbolLockingScatter2  : 'sfx/slot/205/205SLocking02.mp3',
    SymbolLockingScatter3  : 'sfx/slot/205/205SLocking03.mp3',
    SymbolLockingWild      : 'sfx/slot/205/205Wild01.mp3',
    SymbolChangeWild       : 'sfx/slot/205/205Wild02.mp3',
    SymbolChangeWildVoice  : 'sfx/slot/205/205FullVoice.mp3',
    SymbolLockingDp        : 'sfx/slot/205/205LsymLocking01.mp3',
    SymbolLockingEW        : 'sfx/slot/205/205LsymLocking02.mp3',
    SymbolUpgradeDp1       : 'sfx/slot/205/205LinkUpgrade01.mp3',
    SymbolUpgradeDp2       : 'sfx/slot/205/205LinkUpgrade02.mp3',
    SymbolUpgradeEW1       : 'sfx/slot/205/205LinkUpgrade03.mp3',
    SymbolUpgradeEW2       : 'sfx/slot/205/205LinkUpgrade04.mp3',

    //match
    ScatterMatch           : 'sfx/slot/205/205SMatch01.mp3',
    ZoneCountMatch         : 'sfx/slot/205/205SMatch02.mp3',
    ZoneFullMatch          : 'sfx/slot/205/205FMatch.mp3', //x

    //tooltip
    TooltipOpen            : "sfx/slot/205/205TipOver.mp3",

    //Zone
    ZoneLink               : "sfx/slot/205/205LinkFrame.mp3",
    ZoneFree               : "sfx/slot/205/205FsFrame.mp3",
    ZoneBonus             : "sfx/slot/205/205FullGuage02.mp3",
};
window.g_sndSlot205 = ResPack.create( 'sndSlot205', sndSlot205 ).concat( g_sfxSlotCommon );
//endregion

//region -- ↓↓↓ Potato Kingdom ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot206 = {
    // INTRO
    Intro               : "sfx/slot/206/206Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/206/206Bgm.mp3",
    BG_Bgm              : "sfx/slot/206/206BoardBgm.mp3",
    LG_Bgm              : "sfx/slot/206/206LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/206/206Spin.mp3",
    ReelStop            : "sfx/slot/206/206ReelStop.mp3",
    MPayCount           : "sfx/slot/206/206MPayCount.mp3",
    NPayCount01         : "sfx/slot/206/206NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/206/206NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/206/206NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/206/206NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/206/206NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/206/206NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/206/206MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/206/206JackpotPopup.mp3",

    // NORMAL
    SLocking0           : "sfx/slot/206/206SLocking01.mp3",
    SLocking1           : "sfx/slot/206/206SLocking02.mp3",
    Trail               : "sfx/slot/206/206PotTrail.mp3",
    PotOpen             : "sfx/slot/206/206PotOpen.mp3",
    PotPre              : "sfx/slot/206/206PotPre.mp3",
    LG_Match1           : "sfx/slot/206/206LMatch.mp3",
    LG_Match2           : "sfx/slot/206/206LMatch02.mp3",
    ToolTip             : "sfx/slot/206/206TipOver.mp3",
    Unlock              : "sfx/slot/206/206Unlock.mp3",

    // LINK SPIN
    LG_Intro            : "sfx/slot/206/206LinkIntro.mp3",
    LG_Spin             : "sfx/slot/206/206LinkSpin.mp3",
    LG_ReelStop         : "sfx/slot/206/206LinkReelStop.mp3",
    LG_Reset            : "sfx/slot/206/206LinkReset.mp3",
    LG_Locking1         : "sfx/slot/206/206LsymLocking01.mp3",
    LG_Locking2         : "sfx/slot/206/206LsymLocking02.mp3",
    LG_Locking3         : "sfx/slot/206/206LsymLocking03.mp3",
    LG_Open             : "sfx/slot/206/206LinkRaw.mp3",
    LG_Upgrade1         : "sfx/slot/206/206LinkUpgrade01.mp3",
    LG_Upgrade2         : "sfx/slot/206/206LinkUpgrade02.mp3",
    LG_Upgrade3         : "sfx/slot/206/206LinkUpgrade03.mp3",
    LG_Result1          : "sfx/slot/206/206LinkEnd01.mp3",
    LG_Result2          : "sfx/slot/206/206LinkEnd02.mp3",
    LG_Result3          : "sfx/slot/206/206LinkEnd03.mp3",
    LG_ResTrail1        : "sfx/slot/206/206LinkSum01.mp3",
    LG_ResTrail2        : "sfx/slot/206/206LinkSum02.mp3",
    LG_Result           : "sfx/slot/206/206LinkResult.mp3",

    // BOARD GAME
    BG_Open             : "sfx/slot/206/206BOpen.mp3",
    BG_Trail            : "sfx/slot/206/206Btrail.mp3",

    BG_MoveIcon         : "sfx/slot/206/206BMove.mp3",
    BG_ArriveStart      : "sfx/slot/206/206Reset01.mp3",
    BG_ArriveDP         : "sfx/slot/206/206BMatch01.mp3",
    BG_ArriveJP         : "sfx/slot/206/206BMatch02.mp3",
    BG_ArriveSP         : "sfx/slot/206/206BMatch03.mp3",
    BG_ResetBoard       : "sfx/slot/206/206Reset02.mp3",
    BG_PotClear         : "sfx/slot/206/206Portbreak.mp3",

    BG_ResetBonus       : "sfx/slot/206/206Portbreak02.mp3",
    BG_TrailPotToWin    : "sfx/slot/206/206BonusSum01.mp3",
    BG_BonusJackpot     : "sfx/slot/206/206BonusSum02.mp3",
    BG_HurryUp          : "sfx/slot/206/206BonusHurry.mp3",
    BG_PannelCounting   : "sfx/slot/206/206BonusCount.mp3",

    BG_WaitRoll         : "sfx/slot/206/206BInfo.mp3",
    BG_RollClick        : "sfx/slot/206/206Roll01.mp3",
    BG_RollTheDice      : "sfx/slot/206/206Roll04.mp3",
    BG_RollResult       : "sfx/slot/206/206Roll02.mp3",
    BG_RollDouble       : "sfx/slot/206/206Roll03.mp3",

    // result popup
    BG_Result           : "sfx/slot/206/206Bresult.mp3",



    // VOICE
    JVoice00            : "sfx/slot/206/206JVoice01.mp3",
    JVoice01            : "sfx/slot/206/206JVoice02.mp3",
    JVoice02            : "sfx/slot/206/206JVoice03.mp3",
    JVoice03            : "sfx/slot/206/206JVoice04.mp3",
    JVoice04            : "sfx/slot/206/206JVoice05.mp3"
};
window.g_sndSlot206 = ResPack.create( "sndSlot206", sndSlot206).concat( g_sfxSlotCommon );
//endregion

//region [ All That Jazz ]
window.sndSlot208 = {
    // INTRO
    Intro               : "sfx/slot/208/208Intro.mp3",

    // BGM
    Bgm01               : "sfx/slot/208/208Bgm01.mp3",
    Bgm02               : "sfx/slot/208/208Bgm02.mp3",
    Bgm03               : "sfx/slot/208/208Bgm03.mp3",
    LinkBgm             : "sfx/slot/208/208LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/208/208Spin.mp3",
    ReelStop            : "sfx/slot/208/208ReelStop.mp3",
    MPayCount           : "sfx/slot/208/208MPayCount.mp3",
    NPayCount01         : "sfx/slot/208/208NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/208/208NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/208/208NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/208/208NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/208/208NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/208/208NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/208/208MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/208/208JackpotPopup.mp3",

    // NORMAL
    SLocking01          : "sfx/slot/208/208SLocking01.mp3",
    SLocking02          : "sfx/slot/208/208SLocking02.mp3",
    QLocking01          : "sfx/slot/208/208QLocking01.mp3",
    QLocking02          : "sfx/slot/208/208QLocking02.mp3",
    QLocking03          : "sfx/slot/208/208QLocking03.mp3",
    JLocking            : "sfx/slot/208/208JLocking.mp3",
    QMatch              : "sfx/slot/208/208QMatch.mp3",
    CMatch              : "sfx/slot/208/208CMatch.mp3",
    LMatch              : "sfx/slot/208/208LMatch.mp3",
    QCount              : "sfx/slot/208/208QCount.mp3",
    QCount02            : "sfx/slot/208/208QCount02.mp3",
    QCount03            : "sfx/slot/208/208QCount03.mp3",
    JPannel01           : "sfx/slot/208/208JPannel01.mp3",
    JPannel02           : "sfx/slot/208/208JPannel02.mp3",
    JPannel03           : "sfx/slot/208/208JPannel03.mp3",
    Longspin            : "sfx/slot/208/208Longspin.mp3",
    Unlock              : "sfx/slot/208/208Unlock.mp3",

    // Link Game
    LinkIntro           : "sfx/slot/208/208LinkIntro.mp3",
    LinkFrame           : "sfx/slot/208/208LinkFrame.mp3",
    LinkSpin            : "sfx/slot/208/208LinkSpin.mp3",
    LinkReelStop        : "sfx/slot/208/208LinkReelStop.mp3",
    LinkReset           : "sfx/slot/208/208LinkReset.mp3",
    LsymLocking01       : "sfx/slot/208/208LsymLocking01.mp3",
    LsymLocking02       : "sfx/slot/208/208LsymLocking02.mp3",
    LsymLocking03       : "sfx/slot/208/208LsymLocking03.mp3",
    LCollect            : "sfx/slot/208/208LCollect.mp3",
    LinkLongspin        : "sfx/slot/208/208LinkLongspin.mp3",
    LinkSum01           : "sfx/slot/208/208LinkSum01.mp3",
    LinkSum02           : "sfx/slot/208/208LinkSum02.mp3",
    LinkResult          : "sfx/slot/208/208LinkResult.mp3",

    // VOICE
    JVoice01            : "sfx/slot/208/208JVoice01.mp3",
    JVoice02            : "sfx/slot/208/208JVoice02.mp3",
    JVoice03            : "sfx/slot/208/208JVoice03.mp3",
    JVoice04            : "sfx/slot/208/208JVoice04.mp3",
    JVoice05            : "sfx/slot/208/208JVoice05.mp3",
    JVoice06            : "sfx/slot/208/208JVoice06.mp3",

};
window.g_sndSlot208 = ResPack.create( "sndSlot208", sndSlot208 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ luckyNekoParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot207 = {
    // intro
    Intro               : 'sfx/slot/207/207Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/207/207Bgm.mp3',
    FreeBgm             : 'sfx/slot/207/207FsBgm.mp3',
    LinkBgm             : 'sfx/slot/207/207MiniBgm.mp3',

    ReBgm               : 'sfx/slot/207/207ReBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/207/207Spin.mp3',
    ReelStop            : 'sfx/slot/207/207ReelStop.mp3',
    LongSpin          : 'sfx/slot/207/207Longspin.mp3',     //작업안됨

    // pay
    MPayCount           : 'sfx/slot/207/207MPayCount.mp3',
    NPayCount01         : 'sfx/slot/207/207NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/207/207NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/207/207NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/207/207NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/207/207NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/207/207NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/182/182Unlock.mp3',//작업안됨
    ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/207/207LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/207/207LinkReelstop.mp3',
    LinkLongSpin       : 'sfx/slot/207/207LinkLongspin.mp3',       //A

    // popup
    MajorPopup       : 'sfx/slot/207/207MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/207/207JackpotPopup.mp3',
    FreespinIntroPopup   : "sfx/slot/207/207FsIntro.mp3",
    FreespinResultPopup : 'sfx/slot/207/207FsResult.mp3',
    // LinkspinIntroPopup  : 'sfx/slot/182/182LinkIntro.mp3',
    // LinkspinResultPopup : 'sfx/slot/182/182LinkResult.mp3',

    // symbol
    // SLocking0     : 'sfx/slot/204/204SLocking01.mp3',//작업안됨
    // SLocking1     : 'sfx/slot/204/204SLocking02.mp3',
    // SLocking2     : 'sfx/slot/204/204SLocking03.mp3',
    // SLocking3     : 'sfx/slot/204/204SLocking04.mp3',
    // SLocking4     : 'sfx/slot/204/204SLocking05.mp3',

    // ScatterMatch        : 'sfx/slot/182/182SMatch.mp3',
    LinkMatch           : 'sfx/slot/207/207MiniIntro.mp3',

    //TRAIL
    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    MapClick                    : 'sfx/slot/207/207MapClick.mp3',
    MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    MapOpen                   : 'sfx/slot/207/207MapOpen.mp3',
    MapNormalGauge            : 'sfx/slot/207/207MapNormalGauge.mp3',
    MapSuperbonusGauge        : 'sfx/slot/207/207MapSuperbonusGauge.mp3',

    //POT
    PotTrail            : 'sfx/slot/207/207PotTrail.mp3',
    PotBonus            : 'sfx/slot/207/207PotOpen.mp3',
    PotPre              : 'sfx/slot/207/207PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/207/207JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/207/207JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/207/207JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/207/207JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/207/207JVoice05.mp3',       //A
    JackpotVoice5       : 'sfx/slot/207/207JVoice06.mp3',       //A
    JackpotVoice6       : 'sfx/slot/207/207JVoice07.mp3',       //A
    JackpotVoice7       : 'sfx/slot/207/207JVoice08.mp3',       //A

    //보너스윈 기능
    PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    //Respin
    RespinShake         : 'sfx/slot/207/207RespinShake.mp3',
    TipOver             : "sfx/slot/207/207TipOver.mp3",
    ExtraJackpotLock : 'sfx/slot/207/207ExtraJackpotLock.mp3',
    ExtraDirectpayLock : 'sfx/slot/207/207ExtraDirectpayLock.mp3',
    ExtraMinigameLock : 'sfx/slot/207/207ExtraMinigameLock.mp3',
    MMatch           : 'sfx/slot/207/207MMatch.mp3',
    // MiniCount       : 'sfx/slot/204/204MiniCount.mp3',

    //보이스
    MiniVoice01       : 'sfx/slot/207/207MiniVoice01.mp3',
    MiniVoice02       : 'sfx/slot/207/207MiniVoice02.mp3',
    MiniVoice03       : 'sfx/slot/207/207MiniVoice03.mp3',
    MiniVoice04       : 'sfx/slot/207/207MiniVoice04.mp3',

    SymVoice01       : 'sfx/slot/207/207SymVoice01.mp3',       //A
    SymVoice02       : 'sfx/slot/207/207SymVoice02.mp3',       //A
    SymVoice03       : 'sfx/slot/207/207SymVoice03.mp3',       //A

    JPannel       : 'sfx/slot/207/207JPannel.mp3',       //A

    //링크 구현
    LinkReset       : 'sfx/slot/207/207LinkReset.mp3',       //A
    LsymLocking01       : 'sfx/slot/207/207LsymLocking01.mp3',       //A
    LsymLocking02       : 'sfx/slot/207/207LsymLocking02.mp3',       //A
    LsymLocking03       : 'sfx/slot/207/207LsymLocking03.mp3',       //A

    Upgrade01       : 'sfx/slot/207/207Upgrade01.mp3',       //A
    Upgrade02       : 'sfx/slot/207/207Upgrade02.mp3',       //A

    LinkSum01       : 'sfx/slot/207/207LinkSum01.mp3',       //A
    LinkSum02       : 'sfx/slot/207/207LinkSum02.mp3',       //A
    MMoving01       : 'sfx/slot/207/207MMoving01.mp3',       //A
    MMoving02       : 'sfx/slot/207/207MMoving02.mp3',       //A
    MMoving03       : 'sfx/slot/207/207MMoving02.mp3',       //A

    //미니게임 구현
    MExp01       : 'sfx/slot/207/207MExp01.mp3',       //A
    MExp02       : 'sfx/slot/207/207MExp02.mp3',       //A
    MExp03       : 'sfx/slot/207/207MExp03.mp3',       //A
    MWild01       : 'sfx/slot/207/207MWild01.mp3',       //A
    MWild02       : 'sfx/slot/207/207MWild02.mp3',       //A
};
window.g_sndSlot207 = ResPack.create( 'sndSlot207', sndSlot207 ).concat( g_sfxSlotCommon );

window.sndSlot209 = {
    // intro
    Intro               : 'sfx/slot/209/209Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/209/209Bgm.mp3',
    FreeBgm             : 'sfx/slot/209/209FsBgm.mp3',
    LinkBgm             : 'sfx/slot/209/209LinkBgm.mp3',
    BonusBgm            : 'sfx/slot/209/209BoBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/209/209Spin.mp3',
    ReelStop            : 'sfx/slot/209/209ReelStop.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/209/209LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/209/209LinkReelStop.mp3',

    // ui
    TooltipOpen         : 'sfx/slot/209/209TipOver.mp3',
    FreespinTotalWin    : 'sfx/slot/209/209FsCount.mp3',
    RightUIOpen         : 'sfx/slot/209/209BoNoti.mp3',
    SpinCountUIReset    : 'sfx/slot/209/209LinkReset.mp3',

    // pot
    PotStepUp           : 'sfx/slot/209/209PotPre.mp3',
    PotLevelUp          : 'sfx/slot/209/209PotUp.mp3',
    PotOpen             : 'sfx/slot/209/209PotOpen.mp3',

    // fx
    LinkLongSpin        : 'sfx/slot/209/209LinkLongspin.mp3',
    BalloonMove         : 'sfx/slot/209/209FsWild01.mp3',
    BalloonChangeWild   : 'sfx/slot/209/209FsWild02.mp3',
    BalloonChangeJPWild : 'sfx/slot/209/209FsWild03.mp3',
    CreateGoldReel      : 'sfx/slot/209/209Frame01.mp3',
    DrawLockItLink      : 'sfx/slot/209/209Frame02.mp3',

    // pay
    MPayCount           : 'sfx/slot/209/209MPayCount.mp3',
    NPayCount01         : 'sfx/slot/209/209NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/209/209NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/209/209NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/209/209NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/209/209NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/209/209NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/209/209JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/209/209JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/209/209JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/209/209JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/209/209JVoice05.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/209/209MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/209/209JackpotPopup.mp3',
    BonusIntroPopup     : 'sfx/slot/209/209BoIntro.mp3',
    FreeIntroPopup      : 'sfx/slot/209/209FsIntro.mp3',
    LinkIntroPopup      : 'sfx/slot/209/209LinkIntro.mp3',
    BonusResultPopup    : 'sfx/slot/209/209BoResult.mp3',
    FreeResultPopup     : 'sfx/slot/209/209FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/209/209LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/209/209Unlock.mp3',

    // symbol
    SymbolLLockingGreen : 'sfx/slot/209/209LLocking01.mp3',
    SymbolLLockingRed   : 'sfx/slot/209/209LLocking02.mp3',
    SymbolLLockingJP    : 'sfx/slot/209/209LLocking03.mp3',
    SymbolUpgradeGreen  : 'sfx/slot/209/209Upgrade01.mp3',
    SymbolUpgradeRed    : 'sfx/slot/209/209Upgrade02.mp3',

    // Trail
    BonusTrailDPToWin       : 'sfx/slot/209/209BonusSum01.mp3',
    BonusTrailJPToWin       : 'sfx/slot/209/209BonusSum02.mp3',
    LinkTrailGreenToWin       : 'sfx/slot/209/209LinkSum01.mp3',
    LinkTrailRedToWin       : 'sfx/slot/209/209LinkSum02.mp3',
    TrailCoinToPot       : 'sfx/slot/209/209PotTrail01.mp3',
    TrailUCoinToPot       : 'sfx/slot/209/209PotTrail02.mp3'
};
window.g_sndSlot209 = ResPack.create( 'sndSlot209', sndSlot209 ).concat( g_sfxSlotCommon );

window.sndSlot210 = {
    // intro
    Intro               : 'sfx/slot/210/210Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/210/210Bgm.mp3',
    FreeBgm             : 'sfx/slot/210/210FsBgm.mp3',
    LinkBgm             : 'sfx/slot/210/210LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/210/210Spin.mp3',
    ReelStop            : 'sfx/slot/210/210ReelStop.mp3',
    LongSpin            : 'sfx/slot/210/210Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/210/210LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/210/210LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/210/210LinkLongspin.mp3',

    // ui
    //SpinCountUIReset    : 'sfx/slot/210/210LinkReset.mp3',
    FreespinTotalWin    : 'sfx/slot/210/210FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/210/210MPayCount.mp3',
    NPayCount01         : 'sfx/slot/210/210NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/210/210NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/210/210NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/210/210NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/210/210NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/210/210NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/210/210JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/210/210JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/210/210JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/210/210JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/210/210JVoice05.mp3',
    JackpotVoice5       : 'sfx/slot/210/210JVoice06.mp3',
    JackpotVoiceQH      : 'sfx/slot/210/210JVoice07.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/210/210MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/210/210JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/210/210FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/210/210FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/210/210LinkIntro.mp3',
    ResultPopup         : 'sfx/slot/210/210LinkResult.mp3',
    FreeRetrigger       : 'sfx/slot/210/210Retrigger.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/210/210Unlock.mp3',

    // Trail
    Trail1              : 'sfx/slot/210/210LinkTrail01.mp3',
    Trail2              : 'sfx/slot/210/210LinkTrail02.mp3',
    Trail3              : 'sfx/slot/210/210LinkTrail03.mp3',
    Trail4              : 'sfx/slot/210/210LinkTrail04.mp3',
    Trail5              : 'sfx/slot/210/210LinkTrail05.mp3',
    Trail6              : 'sfx/slot/210/210LinkTrail06.mp3',

    TrailDPToWin         : 'sfx/slot/210/210LinkSum01.mp3',
    TrailJPToWin         : 'sfx/slot/210/210LinkSum02.mp3',

    // pot
    PotTrail           : 'sfx/slot/210/210PotTrail.mp3',
    PotPre             : 'sfx/slot/210/210PotPre.mp3',
    PotOpen            : 'sfx/slot/210/210PotOpen.mp3',

    // normal
    Expand             : 'sfx/slot/210/210Expand.mp3',

    // free
    WildExpand         : 'sfx/slot/210/210FsExpand.mp3',

    // link
    OpenDp             : 'sfx/slot/210/210LIntroSymbol01.mp3',
    OpenJackpot        : 'sfx/slot/210/210LIntroSymbol02.mp3',
    OpenQuickHit       : 'sfx/slot/210/210LIntroSymbol03.mp3',
    //WildExpand         : 'sfx/slot/210/210LIntroSymbol04.mp3',
    FlipReelOn         : 'sfx/slot/210/210LinkFrame01.mp3',

    FlipSymbol0        : 'sfx/slot/210/210LinkFrame03.mp3',
    FlipSymbol1        : 'sfx/slot/210/210LinkFrame02.mp3',
    FlipSymbol2        : 'sfx/slot/210/210LinkFrame04.mp3',
    FlipSymbol3        : 'sfx/slot/210/210LinkFrame05.mp3',

    QuickHit1          : 'sfx/slot/210/210QuickHit01.mp3',
    QuickHit2          : 'sfx/slot/210/210QuickHit02.mp3',
    QuickHit3          : 'sfx/slot/210/210QuickHit03.mp3',


    // symbol
    SymbolLockingScatter0  : 'sfx/slot/210/210SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/210/210SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/210/210SLocking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/210/210SLocking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/210/210SLocking05.mp3',

    SymbolLockingDp        : 'sfx/slot/210/210LsymLocking01.mp3',
    SymbolLockingJackpot   : 'sfx/slot/210/210LsymLocking02.mp3',
    SymbolLockingQuickHit  : 'sfx/slot/210/210LsymLocking03.mp3',
    SymbolLockingAddSpin   : 'sfx/slot/210/210LsymLocking04.mp3',

    // SymbolLockingAddSpin   : 'sfx/slot/210/210QuickHit01.mp3',
    // SymbolLockingAddSpin   : 'sfx/slot/210/210QuickHit02.mp3',
    // SymbolLockingAddSpin   : 'sfx/slot/210/210QuickHit03.mp3',

    //match
    ScatterMatch           : 'sfx/slot/210/210SMatch.mp3',

    //tooltip
    TooltipOpen            : "sfx/slot/210/210TipOver.mp3",
};
window.g_sndSlot210 = ResPack.create( 'sndSlot210', sndSlot210 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ drsSecretLab BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot212 = {
    // intro
    Intro               : 'sfx/slot/212/212Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/212/212Bgm.mp3',
    FreeBgm             : 'sfx/slot/212/212FsBgm.mp3',
    LinkBgm             : 'sfx/slot/212/212LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/212/212Spin.mp3',
    ReelStop            : 'sfx/slot/212/212ReelStop.mp3',
    LongSpin          : 'sfx/slot/212/212Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/212/212MPayCount.mp3',
    NPayCount01         : 'sfx/slot/212/212NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/212/212NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/212/212NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/212/212NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/212/212NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/212/212NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/212/212Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/212/212LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/212/212LinkReelStop.mp3',
    LinkLongSpinFx      : 'sfx/slot/212/212LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/212/212MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/212/212JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/212/212FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/212/212FsResult.mp3',
    // LinkspinIntroPopup  : 'sfx/slot/212/212LinkIntro.mp3',
    LinkspinIntro1Popup  : 'sfx/slot/212/212LinkIntro01.mp3',
    LinkspinIntro2Popup  : 'sfx/slot/212/212LinkIntro02.mp3',
    LinkspinIntro3Popup  : 'sfx/slot/212/212LinkIntro03.mp3',
    LinkspinResultPopup : 'sfx/slot/212/212LinkResult.mp3',

    // symbol
    // SLocking0     : 'sfx/slot/182/182SLocking01.mp3',//작업안됨
    // SLocking1     : 'sfx/slot/182/182SLocking02.mp3',
    // SLocking2     : 'sfx/slot/182/182SLocking03.mp3',
    // SLocking3     : 'sfx/slot/182/182SLocking04.mp3',
    // SLocking4     : 'sfx/slot/182/182SLocking05.mp3',
    YLocking0     : 'sfx/slot/212/212YLocking01.mp3',//작업안됨
    YLocking1     : 'sfx/slot/212/212YLocking02.mp3',
    YLocking2     : 'sfx/slot/212/212YLocking03.mp3',
    YLocking3     : 'sfx/slot/212/212YLocking04.mp3',
    YLocking4     : 'sfx/slot/212/212YLocking05.mp3',
    BLocking0     : 'sfx/slot/212/212BLocking01.mp3',//작업안됨
    BLocking1     : 'sfx/slot/212/212BLocking02.mp3',
    BLocking2     : 'sfx/slot/212/212BLocking03.mp3',
    BLocking3     : 'sfx/slot/212/212BLocking04.mp3',
    BLocking4     : 'sfx/slot/212/212BLocking05.mp3',
    PLocking0     : 'sfx/slot/212/212PLocking01.mp3',//작업안됨
    PLocking1     : 'sfx/slot/212/212PLocking02.mp3',
    PLocking2     : 'sfx/slot/212/212PLocking03.mp3',
    PLocking3     : 'sfx/slot/212/212PLocking04.mp3',
    PLocking4     : 'sfx/slot/212/212PLocking05.mp3',
    ScatterMatch        : 'sfx/slot/212/212SMatch.mp3',
    LinkMatch           : 'sfx/slot/212/212SMatch.mp3',

    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    // MapClick                    : 'sfx/slot/207/207MapClick.mp3',
    // MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    // MapOpen                   : 'sfx/slot/207/207MapOpen.mp3',
    // MapNormalGauge            : 'sfx/slot/207/207MapNormalGauge.mp3',
    // MapSuperbonusGauge        : 'sfx/slot/207/207MapSuperbonusGauge.mp3',

    //POT
    // PotTrail            : 'sfx/slot/212/212PotTrail.mp3',
    PotBonus            : 'sfx/slot/212/212PotOpen.mp3',
    PotPre              : 'sfx/slot/212/212PotPre.mp3',
    PotUpgrade              : 'sfx/slot/212/212PotUpgrade.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/212/212JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/212/212JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/212/212JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/212/212JVoice04.mp3',       //A
    // JackpotVoice4       : 'sfx/slot/212/212JVoice05.mp3',       //A
    // JackpotVoice5       : 'sfx/slot/212/212JVoice06.mp3',       //A
    // JackpotVoice6       : 'sfx/slot/212/212JVoice07.mp3',       //A
    // JackpotVoice7       : 'sfx/slot/212/212JVoice08.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/212/212PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/212/212PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/212/212PannelSum.mp3',       //A

    TipOver             : "sfx/slot/212/212TipOver.mp3",
    LinkReset             : "sfx/slot/212/212LinkReset.mp3",
    FsCount             :   'sfx/slot/212/212FsCount.mp3',

    //추가 구현
    //프리구현
    FsSymbol             : "sfx/slot/212/212FsSymbol.mp3",
    FsWild01             : "sfx/slot/212/212FsWild01.mp3",
    FsWild02             : "sfx/slot/212/212FsWild02.mp3",
    FsWild03             : "sfx/slot/212/212FsWild03.mp3",
    //링크 구현
    LinkSymbol             : "sfx/slot/212/212LinkSymbol.mp3",
    LsymLocking01             : "sfx/slot/212/212LsymLocking01.mp3",
    LsymLocking02             : "sfx/slot/212/212LsymLocking02.mp3",
    LCollect01             : "sfx/slot/212/212LCollect01.mp3",
    LCollect02             : "sfx/slot/212/212LCollect02.mp3",
    LCollect03             : "sfx/slot/212/212LCollect03.mp3",
    LCollect04             : "sfx/slot/212/212LCollect04.mp3",
    LinkSum01             : "sfx/slot/212/212LinkSum01.mp3",
    LinkSum02             : "sfx/slot/212/212LinkSum02.mp3",
    PotOpen02             : "sfx/slot/212/212PotOpen02.mp3",
    BetChange             : "sfx/slot/212/212BetChange.mp3",
};
window.g_sndSlot212 = ResPack.create( 'sndSlot212', sndSlot212 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Gummy Yummy Fiesta BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot211 = {
    // intro
    Intro               : 'sfx/slot/211/211Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/211/211Bgm.mp3',
    FreeBgm             : 'sfx/slot/211/211FsBgm.mp3',
    MiniBgm             : 'sfx/slot/211/211MiniBgm.mp3',
    RespinBgm           : 'sfx/slot/211/211ReBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/211/211Spin.mp3',
    ReelStop            : 'sfx/slot/211/211ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/211/211MPayCount.mp3',
    NPayCount01         : 'sfx/slot/211/211NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/211/211NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/211/211NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/211/211NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/211/211NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/211/211NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/211/211MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/211/211JackpotPopup.mp3',

    // NORMAL
    BetChange           : 'sfx/slot/211/211BetChange.mp3',
    PotTrail            : 'sfx/slot/211/211PotTrail.mp3',
    PotPre              : 'sfx/slot/211/211PotPre.mp3',
    PotOpen             : 'sfx/slot/211/211PotOpen.mp3',
    RS_Shake            : 'sfx/slot/211/211RespinShake.mp3',
    QHLock              : 'sfx/slot/211/211ExtraJackpotLock.mp3',
    DPLock              : 'sfx/slot/211/211ExtraDirectpayLock.mp3',
    MGLock              : 'sfx/slot/211/211ExtraMinigameLock.mp3',
    ExtraPay            : 'sfx/slot/211/211ExtraSymPay.mp3',
    LongSpin            : 'sfx/slot/211/211Longspin.mp3',
    MG_Match            : 'sfx/slot/211/211MMatch.mp3',
    WinPanelOpen        : 'sfx/slot/211/211PannelOn.mp3',
    WinPanelUpdate      : 'sfx/slot/211/211PannelSum.mp3',
    ToolTip             : 'sfx/slot/211/211TipOver.mp3',
    WinPanelClose       : 'sfx/slot/211/211PannelOff.mp3',
    Unlock              : 'sfx/slot/211/211Unlock.mp3',

    // MINIGAME
    MG_Intro            : 'sfx/slot/211/211MiniIntro.mp3',
    MG_Locking1         : 'sfx/slot/211/211MLocking01.mp3',
    MG_Locking2         : 'sfx/slot/211/211MLocking02.mp3',
    MG_Zone_Trail       : 'sfx/slot/211/211MTrail.mp3',
    MG_Cascad_Drop      : 'sfx/slot/211/211MReelStop.mp3',
    MG_Zone_FrameOpen   : 'sfx/slot/211/211Mzone01.mp3',
    MG_Zone_Locking1    : 'sfx/slot/211/211Mzone02.mp3',
    MG_Zone_Locking2    : 'sfx/slot/211/211Mzone03.mp3',
    MG_Cascad_Off       : 'sfx/slot/211/211Cascade.mp3',
    MG_Frenzy_Locking1  : 'sfx/slot/211/211Frenzy.mp3',

    // FreeSpin
    FG_Intro            : 'sfx/slot/211/211FsIntro.mp3',
    FG_Intro_Super      : 'sfx/slot/211/211SuperFsIntro.mp3',
    FG_Locking1         : 'sfx/slot/211/211FsPlus01.mp3',
    FG_Trail            : 'sfx/slot/211/211FsPlus02.mp3',
    FG_Result           : 'sfx/slot/211/211FsResult.mp3',

    // Map
    Map_Click           : 'sfx/slot/211/211MapClick.mp3',
    Map_Open            : 'sfx/slot/211/211MapOpen.mp3',
    Map_Gauge           : 'sfx/slot/211/211MapNormalGauge.mp3',
    Map_Gauge_Super     : 'sfx/slot/211/211MapSuperbonusGauge.mp3',

    // Voice
    JackpotVoice1       : 'sfx/slot/211/211JVoice01.mp3',
    JackpotVoice2       : 'sfx/slot/211/211JVoice02.mp3',
    JackpotVoice3       : 'sfx/slot/211/211JVoice03.mp3',
    JackpotVoice4       : 'sfx/slot/211/211JVoice04.mp3',
    JackpotVoice5       : 'sfx/slot/211/211JVoice05.mp3',
    JackpotVoice6       : 'sfx/slot/211/211JVoice06.mp3',
    JackpotVoice7       : 'sfx/slot/211/211JVoice07.mp3',
    JackpotVoice8       : 'sfx/slot/211/211JVoice08.mp3',
    JackpotVoice9       : 'sfx/slot/211/211JVoice09.mp3',
    MG_Rush             : 'sfx/slot/211/211MiniVoice01.mp3',
    MG_Cascad           : 'sfx/slot/211/211MiniVoice02.mp3',
    MG_Zone             : 'sfx/slot/211/211MiniVoice03.mp3',
    MG_Frenzy           : 'sfx/slot/211/211MiniVoice04.mp3',
    Extra_JackpotVoice1 : 'sfx/slot/211/211SymVoice01.mp3',
    Extra_JackpotVoice2 : 'sfx/slot/211/211SymVoice02.mp3',
    Extra_JackpotVoice3 : 'sfx/slot/211/211SymVoice03.mp3'
};
window.g_sndSlot211 = ResPack.create( 'sndSlot211', sndSlot211 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot213 = {
    // INTRO
    Intro               : "sfx/slot/213/213Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/213/213Bgm.mp3",
    FsBgm               : "sfx/slot/213/213FsBgm.mp3",

    // PAY
    Spin                : "sfx/slot/213/213Spin.mp3",
    ReelStop            : "sfx/slot/213/213ReelStop.mp3",
    MPayCount           : "sfx/slot/213/213MPayCount.mp3",
    NPayCount01         : "sfx/slot/213/213NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/213/213NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/213/213NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/213/213NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/213/213NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/213/213NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/213/213MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/213/213JackpotPopup.mp3",

    // NORMAL
    Mystery             : "sfx/slot/213/213Mystery.mp3",
    BetChange           : "sfx/slot/213/213BetChange.mp3",
    Trail               : "sfx/slot/213/213Trail.mp3",
    PreFlip             : "sfx/slot/213/213PreFlip.mp3",
    PotPre              : "sfx/slot/213/213PotPre.mp3",
    PotOpen             : "sfx/slot/213/213PotOpen.mp3",
    BuyPotOpen          : "sfx/slot/213/213BuyPotOpen.mp3",
    Buypopup            : "sfx/slot/213/213Buypopup.mp3",
    PotSave01           : "sfx/slot/213/213PotSave01.mp3",
    PotSave02           : "sfx/slot/213/213PotSave02.mp3",
    PotSave03           : "sfx/slot/213/213PotSave03.mp3",
    Unlock              : "sfx/slot/213/213Unlock.mp3",

    // FREE GAME
    FsIntro01           : "sfx/slot/213/213FsIntro01.mp3",
    FsIntro02           : "sfx/slot/213/213FsIntro02.mp3",
    FsLocking           : "sfx/slot/213/213FsLocking.mp3",
    FsFlip01            : "sfx/slot/213/213FsFlip01.mp3",
    FsFlip02            : "sfx/slot/213/213FsFlip02.mp3",
    FsFlip03            : "sfx/slot/213/213FsFlip03.mp3",
    FsFlip04            : "sfx/slot/213/213FsFlip04.mp3",
    FsMatch             : "sfx/slot/213/213FsMatch.mp3",
    FsPlus              : "sfx/slot/213/213FsPlus.mp3",
    FsPlus02            : "sfx/slot/213/213FsPlus02.mp3",
    FsCount             : "sfx/slot/213/213FsCount.mp3",
    FsResult            : "sfx/slot/213/213FsResult.mp3",

    // VOICE
    JVoice01            : "sfx/slot/213/213JVoice01.mp3",
    JVoice02            : "sfx/slot/213/213JVoice02.mp3",
    JVoice03            : "sfx/slot/213/213JVoice03.mp3",
    JVoice04            : "sfx/slot/213/213JVoice04.mp3",
    JVoice05            : "sfx/slot/213/213JVoice05.mp3",

    FsVoice01           : "sfx/slot/213/213FsVoice01.mp3",
    FsVoice02           : "sfx/slot/213/213FsVoice02.mp3",
    FsVoice03           : "sfx/slot/213/213FsVoice03.mp3",

    MultiVoice01        : "sfx/slot/213/213MultiVoice01.mp3",
    MultiVoice02        : "sfx/slot/213/213MultiVoice02.mp3",
    MultiVoice03        : "sfx/slot/213/213MultiVoice03.mp3",

};
window.g_sndSlot213 = ResPack.create( "sndSlot213", sndSlot213 ).concat( g_sfxSlotCommon );

window.sndSlot214 = {
    // intro
    Intro               : 'sfx/slot/214/214Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/214/214Bgm.mp3',
    FreeBgm             : 'sfx/slot/214/214FsBgm.mp3',
    BonusBgm            : 'sfx/slot/214/214BoBgm.mp3',

    // normal spin / free spin
    Spin_Ready          : 'sfx/slot/214/214Spin.mp3',
    Spin_Down           : 'sfx/slot/214/214Spin02.mp3',
    Crack1              : 'sfx/slot/214/214Spin_01.mp3',
    Crack2              : 'sfx/slot/214/214Spin_02.mp3',
    Crack3              : 'sfx/slot/214/214Spin_03.mp3',
    Crush               : 'sfx/slot/214/214Spin_04.mp3',
    Rolling             : 'sfx/slot/214/214Candy.mp3',

    //
    FreespinIntroFx     : 'sfx/slot/214/214Fsintro02.mp3',

    //
    CrushResultDP       : 'sfx/slot/214/214Crash01.mp3',
    CrushResultTrail    : 'sfx/slot/214/214Crash02.mp3',
    CrushResultJPRolling: 'sfx/slot/214/214Crash03.mp3',
    CrushResultJP       : 'sfx/slot/214/214Crash03_01.mp3',
    CrushResultDP2      : 'sfx/slot/214/214Crash04.mp3',

    // pot
    PotStepUp           : 'sfx/slot/214/214PotPre.mp3',
    PotOpen             : 'sfx/slot/214/214PotOpen.mp3',

    // RushGame
    RushGame_BalloonUp  : 'sfx/slot/214/214Balloon01.mp3',
    RushGame_BalloonPop : 'sfx/slot/214/214Balloon02.mp3',

    // PickGame
    PickGame_PickDP     : 'sfx/slot/214/214Pick01.mp3',
    PickGame_PickJP     : 'sfx/slot/214/214Pick02.mp3',
    PickGame_Trail      : 'sfx/slot/214/214PickTrail.mp3',
    PickGame_WinJP      : 'sfx/slot/214/214PickJackpot.mp3',
    PickGame_NotiOn     : 'sfx/slot/214/214PickNoti.mp3',

    // pay
    MPayCount           : 'sfx/slot/214/214MPayCount.mp3',
    NPayCount01         : 'sfx/slot/214/214NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/214/214NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/214/214NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/214/214NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/214/214NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/214/214NPayCount03End.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/214/214MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/214/214JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/214/214FsIntro.mp3',
    PickIntroPopup      : 'sfx/slot/214/214PickIntro.mp3',
    RushIntroPopup      : 'sfx/slot/214/214BoIntro.mp3',
    FreeResultPopup     : 'sfx/slot/214/214FsResult.mp3',
    BonusResultPopup    : 'sfx/slot/214/214PickResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/214/214JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/214/214JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/214/214JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/214/214JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/214/214JVoice05.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/214/214Unlock.mp3',

    //
    BonusWinCountUp     : 'sfx/slot/214/214Count.mp3',
};
window.g_sndSlot214 = ResPack.create( 'sndSlot214', sndSlot214 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ Book Of Cleos Secrets ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot215 = {
    // intro
    Intro               : 'sfx/slot/215/215Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/215/215Bgm.mp3',
    FreeBgm             : 'sfx/slot/215/215FsBgm.mp3',
    PickBgm             : 'sfx/slot/215/215PBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/215/215Spin.mp3',
    ReelStop            : 'sfx/slot/215/215ReelStop.mp3',
    LongSpin            : 'sfx/slot/215/215Longspin.mp3',

    // ui
    //SpinCountUIReset    : 'sfx/slot/215/215LinkReset.mp3',
    FreespinTotalWin    : 'sfx/slot/215/215FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/215/215MPayCount.mp3',
    NPayCount01         : 'sfx/slot/215/215NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/215/215NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/215/215NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/215/215NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/215/215NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/215/215NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/215/215JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/215/215JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/215/215JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/215/215JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/215/215JVoice05.mp3',
    JackpotVoice5       : 'sfx/slot/215/215JVoice06.mp3',
    JackpotVoice6       : 'sfx/slot/215/215JVoice07.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/215/215MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/215/215JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/215/215FsIntro01.mp3',
    FreeIntroPopupFix   : 'sfx/slot/215/215FsIntro02.mp3',
    FreeResultPopup     : 'sfx/slot/215/215FsResult.mp3',
    FreeRetrigger       : 'sfx/slot/215/215Retrigger.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/215/215Unlock.mp3',

    // Trail

    // pot
    PotTrail           : 'sfx/slot/215/215Trail.mp3',
    PotPre             : 'sfx/slot/215/215PotPre.mp3',
    PotOpen            : 'sfx/slot/215/215PotOpen.mp3',

    // normal

    // free
    PickIntro         : 'sfx/slot/215/215PickWindow.mp3',
    PickSymbol         : 'sfx/slot/215/215Pick01.mp3',
    PickRemove         : 'sfx/slot/215/215Pick02.mp3',
    PickMatch          : 'sfx/slot/215/215PickJackpot.mp3',

    // pick
    Special1           : 'sfx/slot/215/215FsSymobl01.mp3',
    Special2           : 'sfx/slot/215/215FsSymobl02.mp3',
    Special3           : 'sfx/slot/215/215FsSymobl03.mp3',
    Special4           : 'sfx/slot/215/215FsSymobl04.mp3',


    // symbol
    SymbolLockingScatter0  : 'sfx/slot/215/215SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/215/215SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/215/215SLocking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/215/215SLocking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/215/215SLocking05.mp3',

    //match
    ScatterMatch           : 'sfx/slot/215/215SMatch.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/215/215TipOver.mp3",
};
window.g_sndSlot215 = ResPack.create( 'sndSlot215', sndSlot215 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot990 = {
    // INTRO
    Intro               : "sfx/slot/990/990Intro.mp3",
    // BGM
    Bgm                 : "sfx/slot/990/990Bgm.mp3",
    // UI
    UIBtnClick          : "sfx/slot/990/990Click.mp3",
    MultipleAction      : "sfx/slot/990/990Multi.mp3",
    // Game
    PlaceBet            : "sfx/slot/990/990Bet.mp3",
    Ready               : "sfx/slot/990/990BetNoti.mp3",
    CountDown           : "sfx/slot/990/990CountDown.mp3",
    Start               : "sfx/slot/990/990CountDown02.mp3",
    Playing             : "sfx/slot/990/990Rising.mp3",
    Crash               : "sfx/slot/990/990Crash.mp3",
    Finish              : "sfx/slot/990/990Jackpot.mp3",
    // popup
    CashOut             : "sfx/slot/990/990Win.mp3"
};
window.g_sndSlot990 = ResPack.create( "sndSlot990", sndSlot990 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ luckyNekoParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot217 = {
    // intro
    Intro               : 'sfx/slot/217/217Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/217/217Bgm.mp3',
    FreeBgm             : 'sfx/slot/217/217ReBgm.mp3',
    LinkBgm             : 'sfx/slot/217/217LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/217/217Spin.mp3',
    ReelStop            : 'sfx/slot/217/217ReelStop.mp3',
    LongSpin          : 'sfx/slot/217/217Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/217/217MPayCount.mp3',
    NPayCount01         : 'sfx/slot/217/217NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/217/217NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/217/217NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/217/217NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/217/217NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/217/217NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/217/217Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/217/217LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/217/217LinkReelstop.mp3',
    //LinkLongSpinFx      : 'sfx/slot/217/217LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/217/217MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/217/217JackpotPopup.mp3',
    // FreespinIntroPopup  : 'sfx/slot/217/217FsIntro.mp3',
    // FreespinResultPopup : 'sfx/slot/217/217FsResult.mp3',
    LinkspinIntroPopup  : 'sfx/slot/217/217LinkIntro01.mp3',
    LinkspinIntroPopup2  : 'sfx/slot/217/217LinkIntro02.mp3',
    LinkspinIntroPopup3  : 'sfx/slot/217/217LinkIntro03.mp3',
    LinkspinResultPopup : 'sfx/slot/217/217LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/217/217JLocking.mp3',//작업안됨
    SLocking1     : 'sfx/slot/217/217JLocking.mp3',
    SLocking2     : 'sfx/slot/217/217JLocking.mp3',
    SLocking3     : 'sfx/slot/217/217JLocking.mp3',
    SLocking4     : 'sfx/slot/217/217JLocking.mp3',
    // ScatterMatch        : 'sfx/slot/217/217SMatch.mp3',
    // LinkMatch           : 'sfx/slot/217/217LMatch.mp3',

    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    // MapClick                    : 'sfx/slot/207/207MapClick.mp3',
    // MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    // MapOpen                   : 'sfx/slot/207/207MapOpen.mp3',
    // MapNormalGauge            : 'sfx/slot/207/207MapNormalGauge.mp3',
    // MapSuperbonusGauge        : 'sfx/slot/207/207MapSuperbonusGauge.mp3',

    //POT
    PotTrail1            : 'sfx/slot/217/217Trail01.mp3',
    PotTrail2            : 'sfx/slot/217/217Trail02.mp3',
    PotBonus1            : 'sfx/slot/217/217PotOpen01.mp3',
    PotBonus2            : 'sfx/slot/217/217PotOpen02.mp3',
    PotPre              : 'sfx/slot/217/217PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/217/217JVoice.mp3',       //A
    // JackpotVoice1       : 'sfx/slot/217/217JVoice02.mp3',       //A
    // JackpotVoice2       : 'sfx/slot/217/217JVoice03.mp3',       //A
    // JackpotVoice3       : 'sfx/slot/217/217JVoice04.mp3',       //A
    // JackpotVoice4       : 'sfx/slot/217/217JVoice05.mp3',       //A
    // JackpotVoice5       : 'sfx/slot/217/217JVoice06.mp3',       //A
    // JackpotVoice6       : 'sfx/slot/217/217JVoice07.mp3',       //A
    // JackpotVoice7       : 'sfx/slot/217/217JVoice08.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    Combine01       : 'sfx/slot/217/217Combine01.mp3',       //A
    Combine02       : 'sfx/slot/217/217Combine02.mp3',       //A
    Upgrade01       : 'sfx/slot/217/217Upgrade01.mp3',       //A
    Upgrade02       : 'sfx/slot/217/217Upgrade02.mp3',       //A
    Upgrade03       : 'sfx/slot/217/217Upgrade03.mp3',       //A
    Upgrade04       : 'sfx/slot/217/217Upgrade04.mp3',       //A
    UVoice       : 'sfx/slot/217/217UVoice.mp3',       //A
    LsymLocking       : 'sfx/slot/217/217LsymLocking.mp3',       //A
    LinkSum       : 'sfx/slot/217/217LinkSum.mp3',       //A
    LsymLocking       : 'sfx/slot/217/217LsymLocking.mp3',       //A
    LVoice01       : 'sfx/slot/217/217LVoice01.mp3',       //A
    LVoice02       : 'sfx/slot/217/217LVoice02.mp3',       //A

    LinkReset           : "sfx/slot/217/217LinkReset.mp3",
    LinkCount           : "sfx/slot/217/217LinkCount.mp3",

    // JackpotSymbol     : 'sfx/slot/217/217JLocking.mp3'
};
window.g_sndSlot217 = ResPack.create( 'sndSlot217', sndSlot217 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Stellar Scatters BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot216 = {
    // intro
    Intro               : 'sfx/slot/216/216Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/216/216Bgm.mp3',
    FreeBgm             : 'sfx/slot/216/216FsBgm.mp3',
    ReBgm               : 'sfx/slot/216/216ReBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/216/216Spin.mp3',
    ReelStop            : 'sfx/slot/216/216ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/216/216MPayCount.mp3',
    NPayCount01         : 'sfx/slot/216/216NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/216/216NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/216/216NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/216/216NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/216/216NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/216/216NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/216/216MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/216/216JackpotPopup.mp3',

    // NORMAL
    Respin0             : 'sfx/slot/216/216RLocking01.mp3',
    Respin1             : 'sfx/slot/216/216RLocking02.mp3',
    Respin2             : 'sfx/slot/216/216RLocking03.mp3',
    LongSpin            : 'sfx/slot/216/216Longspin.mp3',

    FullGauge           : 'sfx/slot/216/216Noti.mp3',
    HighGauge           : 'sfx/slot/216/216Noti02.mp3',
    ExtraChange         : 'sfx/slot/216/216Extra.mp3',
    SMatch              : 'sfx/slot/216/216SMatch.mp3',
    JLocking            : 'sfx/slot/216/216JLocking.mp3',
    Unlock              : 'sfx/slot/216/216Unlock.mp3',
    R1_Popup            : 'sfx/slot/216/216ReIntro01.mp3',
    R2_Popup            : 'sfx/slot/216/216ReIntro02.mp3',
    R3_Popup            : 'sfx/slot/216/216ReIntro03.mp3',
    R1_MiniReelOpen     : 'sfx/slot/216/216ReNoti01.mp3',
    R3_Sticky           : 'sfx/slot/216/216ReNoti02.mp3',

    // FreeSpin
    FG_Intro1           : 'sfx/slot/216/216FsIntro01.mp3',
    FG_Intro2           : 'sfx/slot/216/216FsIntro02.mp3',
    FG_Hold             : 'sfx/slot/216/216FsFrame01.mp3',
    FG_Remove           : 'sfx/slot/216/216FsFrame02.mp3',
    FG_AddLock          : 'sfx/slot/216/216FsPlus01.mp3',
    FG_Trail            : 'sfx/slot/216/216FsPlus02.mp3',
    FG_Trail_SymCount   : 'sfx/slot/216/216FsTrail.mp3',
    FG_Mult             : 'sfx/slot/216/216FsMulti.mp3',
    FG_Result           : 'sfx/slot/216/216FsResult.mp3',

    // Voice
    JackpotVoice1       : 'sfx/slot/216/216JVoice01.mp3',
    JackpotVoice2       : 'sfx/slot/216/216JVoice02.mp3',
    JackpotVoice3       : 'sfx/slot/216/216JVoice03.mp3',
    JackpotVoice4       : 'sfx/slot/216/216JVoice04.mp3'
};
window.g_sndSlot216 = ResPack.create( 'sndSlot216', sndSlot216 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot218 = {
    // INTRO
    Intro               : "sfx/slot/218/218Intro.mp3",

    // BGM
    Bgm                 : "sfx/slot/218/218Bgm.mp3",
    LinkBgm             : "sfx/slot/218/218LinkBgm.mp3",

    // PAY
    Spin                : "sfx/slot/218/218Spin.mp3",
    ReelStop            : "sfx/slot/218/218ReelStop.mp3",
    MPayCount           : "sfx/slot/218/218MPayCount.mp3",
    NPayCount01         : "sfx/slot/218/218NPayCount01.mp3",
    NPayCount01End      : "sfx/slot/218/218NPayCount01End.mp3",
    NPayCount02         : "sfx/slot/218/218NPayCount02.mp3",
    NPayCount02End      : "sfx/slot/218/218NPayCount02End.mp3",
    NPayCount03         : "sfx/slot/218/218NPayCount03.mp3",
    NPayCount03End      : "sfx/slot/218/218NPayCount03End.mp3",
    MajorPopup          : "sfx/slot/218/218MajorPopup.mp3",
    JackpotPopup        : "sfx/slot/218/218JackpotPopup.mp3",

    // NORMAL
    DLocking            : "sfx/slot/218/218DLocking.mp3",
    PotTrail            : "sfx/slot/218/218PotTrail.mp3",
    PotOpen             : "sfx/slot/218/218PotOpen.mp3",
    PotPre              : "sfx/slot/218/218PotPre.mp3",
    JLocking            : "sfx/slot/218/218JLocking.mp3",
    JMatch              : "sfx/slot/218/218JMatch.mp3",
    Unlock              : "sfx/slot/218/218Unlock.mp3",

    // LINK GAME
    LinkIntro01         : "sfx/slot/218/218LinkIntro01.mp3",
    LinkIntro02         : "sfx/slot/218/218LinkIntro02.mp3",
    LinkSpin            : "sfx/slot/218/218LinkSpin.mp3",
    LinkReelStop        : "sfx/slot/218/218LinkReelStop.mp3",
    LinkReset           : "sfx/slot/218/218LinkReset.mp3",
    LsymLocking01       : "sfx/slot/218/218LsymLocking01.mp3",
    LsymLocking02       : "sfx/slot/218/218LsymLocking02.mp3",
    LsymLocking03       : "sfx/slot/218/218LsymLocking03.mp3",
    LsymLocking04       : "sfx/slot/218/218LsymLocking04.mp3",
    LsymLocking05       : "sfx/slot/218/218LsymLocking05.mp3",
    LinkRaw             : "sfx/slot/218/218LinkRaw.mp3",
    LinkUpgrade         : "sfx/slot/218/218LinkUpgrade.mp3",
    LinkUpgrade02       : "sfx/slot/218/218LinkUpgrade02.mp3",
    LinkActive          : "sfx/slot/218/218LinkActivate.mp3",
    BMatch              : "sfx/slot/218/218BMatch.mp3",
    BMatch02            : "sfx/slot/218/218BMatch02.mp3",
    LinkEnd01           : "sfx/slot/218/218LinkEnd01.mp3",
    LinkEnd02           : "sfx/slot/218/218LinkEnd02.mp3",
    LinkEnd03           : "sfx/slot/218/218LinkEnd03.mp3",
    LCount              : "sfx/slot/218/218LCount.mp3",
    LinkResult          : "sfx/slot/218/218LinkResult.mp3",

    // VOICE
    LVoice01            : "sfx/slot/218/218LVoice01.mp3",
    LVoice02            : "sfx/slot/218/218LVoice02.mp3",
    LVoice03            : "sfx/slot/218/218LVoice03.mp3",

    PVoice01            : "sfx/slot/218/218PVoice01.mp3",
    PVoice02            : "sfx/slot/218/218PVoice02.mp3",
    PVoice03            : "sfx/slot/218/218PVoice03.mp3",
    PVoice04            : "sfx/slot/218/218PVoice04.mp3",
    PVoice05            : "sfx/slot/218/218PVoice05.mp3",

    JVoice01            : "sfx/slot/218/218JVoice01.mp3",
    JVoice02            : "sfx/slot/218/218JVoice02.mp3",
    JVoice03            : "sfx/slot/218/218JVoice03.mp3",
    JVoice04            : "sfx/slot/218/218JVoice04.mp3",
    JVoice05            : "sfx/slot/218/218JVoice05.mp3",
};
window.g_sndSlot218 = ResPack.create( "sndSlot218", sndSlot218 ).concat( g_sfxSlotCommon );

window.sndSlot219 = {
    // intro
    Intro               : 'sfx/slot/219/219Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/219/219Bgm.mp3',
    FreeBgm             : 'sfx/slot/219/219FsBgm.mp3',
    LinkBgm             : 'sfx/slot/219/219LinkBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/219/219Spin.mp3',
    ReelStop            : 'sfx/slot/219/219ReelStop.mp3',
    // link spin
    LinkSpin            : 'sfx/slot/219/219LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/219/219LinkReelStop.mp3',

    // symbol
    SymbolWildTrail     : 'sfx/slot/219/219PotTrail.mp3',
    SymbolScatterL0     : 'sfx/slot/219/219SLocking01.mp3',
    SymbolScatterL1     : 'sfx/slot/219/219SLocking02.mp3',
    SymbolScatterL2     : 'sfx/slot/219/219SLocking03.mp3',
    SymbolScatterL3     : 'sfx/slot/219/219SLocking04.mp3',
    SymbolScatterL4     : 'sfx/slot/219/219SLocking05.mp3',
    SymbolScatterM      : 'sfx/slot/219/219SMatch.mp3',

    SymbolLinkGL        : 'sfx/slot/219/219LsymLocking01.mp3',
    SymbolLinkDPL       : 'sfx/slot/219/219LsymLocking02.mp3',
    SymbolLinkJPL       : 'sfx/slot/219/219LsymLocking03.mp3',
    SymbolLinkQHL       : 'sfx/slot/219/219LsymLocking04.mp3',

    // pot
    PotStepUp           : 'sfx/slot/219/219PotPre.mp3',
    PotOpen             : 'sfx/slot/219/219PotOpen.mp3',

    // fx
    FreespinTotalWin    : 'sfx/slot/219/219FsCount.mp3',
    LongSpin            : 'sfx/slot/219/219Longspin.mp3',
    LinkFullColumnFx    : 'sfx/slot/219/219Upgrade01.mp3',
    LinkSymbolRemove    : 'sfx/slot/219/219Upgrade02.mp3',
    LinkSymbolUpgrade   : 'sfx/slot/219/219Upgrade04.mp3',
    LinkQHIndexChangeFx : 'sfx/slot/219/219Quickhit.mp3',
    LinkFullCloseFx1    :  'sfx/slot/219/219LinkTrail01.mp3',
    LinkFullCloseFx2    : 'sfx/slot/219/219Upgrade03.mp3',
    LinkWinPanelOpen    : 'sfx/slot/219/219Upgrade05.mp3',

    // Trail
    TrailSymToWin       : 'sfx/slot/219/219LinkTrail02.mp3',
    TrailToQHNoti       : 'sfx/slot/219/219LinkTrail03.mp3',
    TrailWinToWin       : 'sfx/slot/219/219LinkSum01.mp3',
    TrailQHToWin        : 'sfx/slot/219/219LinkSum02.mp3',


    // pay
    MPayCount           : 'sfx/slot/219/219MPayCount.mp3',
    NPayCount01         : 'sfx/slot/219/219NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/219/219NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/219/219NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/219/219NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/219/219NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/219/219NPayCount03End.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/219/219MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/219/219JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/219/219FsIntro.mp3',
    FreeIntroRPopup     : 'sfx/slot/219/219Retrigger.mp3',
    LinkIntroPopup      : 'sfx/slot/219/219LinkIntro.mp3',
    FreeResultPopup     : 'sfx/slot/219/219FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/219/219LinkResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/219/219JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/219/219JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/219/219JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/219/219JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/219/219JVoice05.mp3',
    QHJackpotVoice      : 'sfx/slot/219/219JVoice06.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/219/219Unlock.mp3'
};
window.g_sndSlot219 = ResPack.create( 'sndSlot219', sndSlot219 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ SharksBounty ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot220 = {
    // intro
    Intro               : 'sfx/slot/220/220Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/220/220Bgm.mp3',
    FreeBgm             : 'sfx/slot/220/220FsBgm.mp3',
    BG_Bgm              : "sfx/slot/220/220BBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/220/220Spin.mp3',
    ReelStop            : 'sfx/slot/220/220ReelStop.mp3',
    LongSpin            : 'sfx/slot/220/220Longspin.mp3',

    // ui
    FreespinTotalWin    : 'sfx/slot/220/220FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/220/220MPayCount.mp3',
    NPayCount01         : 'sfx/slot/220/220NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/220/220NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/220/220NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/220/220NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/220/220NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/220/220NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/220/220JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/220/220JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/220/220JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/220/220JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/220/220JVoice05.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/220/220MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/220/220JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/220/220FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/220/220FsResult.mp3',
    FreeRetrigger       : 'sfx/slot/220/220Retrigger.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/220/220Unlock.mp3',

    // Trail
    // pot
    // normal

    // free
    GSNotiTopChange        : 'sfx/slot/220/220FsPannel.mp3',
    GSNotiBottomChange        : 'sfx/slot/220/220FsPannel02.mp3',
    GSNotiUp            : 'sfx/slot/220/220FsSpinCount.mp3',
    GoldSharkToDP         : 'sfx/slot/220/220FsTransform01.mp3',//
    GoldSharkToJP         : 'sfx/slot/220/220FsTransform02.mp3',//
    MajorToGoldShark      : 'sfx/slot/220/220FsTransform03.mp3',//


    // symbol
    SymbolLockingScatter0  : 'sfx/slot/220/220SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/220/220SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/220/220SLocking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/220/220SLocking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/220/220SLocking05.mp3',
    SymbolLockingGoldShark : 'sfx/slot/220/220FsSymbol.mp3', //
    SymbolLockingShark     : 'sfx/slot/220/220JLocking.mp3', //

    //match
    ScatterMatch           : 'sfx/slot/220/220SMatch.mp3',
    SharkMatch             : 'sfx/slot/220/220JMatch.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/220/220TipOver.mp3",

    // BOARD GAME
    BG_Open             : "sfx/slot/220/220BOpen.mp3",
    //BG_Trail            : "sfx/slot/220/220Btrail.mp3",

    BG_MoveIcon         : "sfx/slot/220/220BMove.mp3",
    BG_ArriveStart      : "sfx/slot/220/220Reset01.mp3",
    BG_ArriveDP         : "sfx/slot/220/220BMatch01.mp3",
    BG_ArriveShark      : "sfx/slot/220/220BMatch02.mp3", //
    BG_ArriveJP         : "sfx/slot/220/220BMatch03.mp3",
    BG_ArriveSP         : "sfx/slot/220/220BMatch04.mp3",
    BG_ResetBoard       : "sfx/slot/220/220Reset02.mp3",
    BG_PotClear         : "sfx/slot/220/220Portbreak01.mp3",

    BG_ResetBonus       : "sfx/slot/220/220Portbreak02.mp3",
    BG_TrailPotToWin    : "sfx/slot/220/220BonusSum01.mp3",
    BG_BonusJackpot     : "sfx/slot/220/220BonusSum02.mp3",
    BG_HurryUp          : "sfx/slot/220/220BonusHurry.mp3",
    BG_PannelCounting   : "sfx/slot/220/220BonusCount.mp3",

    //BG_WaitRoll         : "sfx/slot/220/220BInfo.mp3",
    BG_RollClick        : "sfx/slot/220/220Roll01.mp3",
    BG_RollTheDice      : "sfx/slot/220/220Roll04.mp3",
    BG_RollResult       : "sfx/slot/220/220Roll02.mp3",
    BG_RollDouble       : "sfx/slot/220/220Roll03.mp3",

    // result popup
    BG_Result           : "sfx/slot/220/220Bresult.mp3",
};
window.g_sndSlot220 = ResPack.create( 'sndSlot220', sndSlot220 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑  BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot221 = {
    // intro
    Intro               : 'sfx/slot/221/221Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/221/221Bgm.mp3',
    FreeBgm             : 'sfx/slot/221/221BoBgm.mp3',
    LinkBgm             : 'sfx/slot/221/221LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/221/221Spin.mp3',
    ReelStop            : 'sfx/slot/221/221ReelStop.mp3',
    LongSpin          : 'sfx/slot/221/221Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/221/221MPayCount.mp3',
    NPayCount01         : 'sfx/slot/221/221NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/221/221NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/221/221NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/221/221NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/221/221NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/221/221NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/221/221Unlock.mp3',
    // ChangeBet          : 'sfx/slot/221/221BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/221/221LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/221/221LinkReelstop.mp3',
    //LinkLongSpinFx      : 'sfx/slot/221/221LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/221/221MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/221/221JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/221/221BoIntro.mp3',
    FreespinResultPopup : 'sfx/slot/221/221BoResult.mp3',
    LinkspinIntroPopup  : 'sfx/slot/221/221LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/221/221LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/221/221SLocking01.mp3',//작업안됨
    SLocking1     : 'sfx/slot/221/221SLocking01.mp3',
    SLocking2     : 'sfx/slot/221/221SLocking02.mp3',
    SLocking3     : 'sfx/slot/221/221JLocking.mp3',
    //SLocking4     : 'sfx/slot/221/221SLocking05.mp3',
    //ScatterMatch        : 'sfx/slot/221/221SMatch.mp3',
    LinkMatch           : 'sfx/slot/221/221SMatch01.mp3',
    LinkMatch2           : 'sfx/slot/221/221SMatch02.mp3',

    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    // MapClick                    : 'sfx/slot/221/221MapClick.mp3',
    // MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    // MapOpen                   : 'sfx/slot/221/221MapOpen.mp3',
    // MapNormalGauge            : 'sfx/slot/221/221MapNormalGauge.mp3',
    // MapSuperbonusGauge        : 'sfx/slot/221/221MapSuperbonusGauge.mp3',

    //POT
    PotTrail            : 'sfx/slot/221/221Trail.mp3',
    PotBonus            : 'sfx/slot/221/221PotOpen.mp3',
    PotPre              : 'sfx/slot/221/221PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/221/221JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/221/221JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/221/221JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/221/221JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/221/221JVoice05.mp3',       //A
    JackpotVoice5       : 'sfx/slot/221/221JVoice06.mp3',       //A
    //JackpotVoice6       : 'sfx/slot/221/221JVoice07.mp3',       //A
    //JackpotVoice7       : 'sfx/slot/221/221JVoice08.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    LsymLocking01       : 'sfx/slot/221/221LsymLocking01.mp3',       //A
    LsymLocking02       : 'sfx/slot/221/221LsymLocking02.mp3',       //A
    LsymLocking03       : 'sfx/slot/221/221LsymLocking03.mp3',       //A
    LinkDrop       : 'sfx/slot/221/221LinkDrop.mp3',       //A
    LinkCrack       : 'sfx/slot/221/221LinkCrack.mp3',       //A
    LinkUtil01       : 'sfx/slot/221/221LinkUtil01.mp3',       //A
    LinkUtil02       : 'sfx/slot/221/221LinkUtil02.mp3',       //A
    LinkUtil03       : 'sfx/slot/221/221LinkUtil03.mp3',       //A
    LinkUnlock       : 'sfx/slot/221/221LinkUnlock.mp3',       //A
    LinkSum       : 'sfx/slot/221/221LinkSum.mp3',       //A
    BonusSum01       : 'sfx/slot/221/221BonusSum01.mp3',       //A
    BonusSum02       : 'sfx/slot/221/221BonusSum02.mp3',       //A
    BonusJackpot       : 'sfx/slot/221/221BonusJackpot.mp3',       //A
    BonusPannel       : 'sfx/slot/221/221BonusPannel.mp3',       //A
    LinkFrame       : 'sfx/slot/221/221LinkFrame.mp3',       //A
    SLocking       : 'sfx/slot/221/221JLocking.mp3',       //A
};
window.g_sndSlot221 = ResPack.create( 'sndSlot221', sndSlot221 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Stellar Scatters BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot222 = {
    // intro
    Intro               : 'sfx/slot/222/222Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/222/222Bgm.mp3',
    LinkBgm             : 'sfx/slot/222/222LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/222/222Spin.mp3',
    ReelStop            : 'sfx/slot/222/222ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/222/222MPayCount.mp3',
    NPayCount01         : 'sfx/slot/222/222NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/222/222NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/222/222NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/222/222NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/222/222NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/222/222NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/222/222MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/222/222JackpotPopup.mp3',

    // NORMAL
    LockFruit           : 'sfx/slot/222/222Fruit01.mp3',
    TransCoin           : 'sfx/slot/222/222Fruit02.mp3',
    LockCoin            : 'sfx/slot/222/222Coin.mp3',
    LockJackpot         : 'sfx/slot/222/222JLocking.mp3',
    Trail               : 'sfx/slot/222/222Trail.mp3',
    PotCollect1         : 'sfx/slot/222/222PotOpen01.mp3',
    PotCollect2         : 'sfx/slot/222/222PotOpen02.mp3',
    PotCollect3         : 'sfx/slot/222/222PotOpen03.mp3',
    PotCollect4         : 'sfx/slot/222/222PotOpen04.mp3',
    PotCollect5         : 'sfx/slot/222/222PotOpen05.mp3',
    PotMatch            : 'sfx/slot/222/222PMatch.mp3',
    Unlock              : 'sfx/slot/222/222Unlock.mp3',

    // Link Spin
    LG_Intro            : 'sfx/slot/222/222LinkIntro.mp3',
    LG_LockFruit        : 'sfx/slot/222/222LsymLocking01.mp3',
    LG_LockDP           : 'sfx/slot/222/222LsymLocking02.mp3',
    LG_LockJP           : 'sfx/slot/222/222LsymLocking03.mp3',
    LG_LockTrail        : 'sfx/slot/222/222LsymLocking04.mp3',
    LG_PotChange        : 'sfx/slot/222/222PotTansform.mp3',
    LG_Spin             : 'sfx/slot/222/222LinkSpin.mp3',
    LG_ReelStop         : 'sfx/slot/222/222LinkReelstop.mp3',
    LG_SpinReset        : 'sfx/slot/222/222LinkReset.mp3',
    LG_LockIntro        : 'sfx/slot/222/222LinkFrame01.mp3',
    LG_LockOpen         : 'sfx/slot/222/222LinkFrame02.mp3',
    LG_TransSP          : 'sfx/slot/222/222LinkTransition.mp3',
    LG_Match_AllWin     : 'sfx/slot/222/222LinkUtil01.mp3',
    LG_Match_ExtraSpin  : 'sfx/slot/222/222LinkUtil02.mp3',
    LG_Match_JumpUp     : 'sfx/slot/222/222LinkUtil03.mp3',
    LG_Match_AddSpin    : 'sfx/slot/222/222LinkUtil04.mp3',
    LG_Match_DoubleUp   : 'sfx/slot/222/222LinkUtil05.mp3',
    LG_Monkey_Target    : 'sfx/slot/222/222LinkTarget.mp3',
    LG_Trail_AllWin     : 'sfx/slot/222/222LinkTrail01.mp3',
    LG_Trail_ExtraSpin  : 'sfx/slot/222/222LinkTrail02.mp3',
    LG_Trail_AddSpin    : 'sfx/slot/222/222LinkTrail03.mp3',
    LG_Trail_DoubleUp   : 'sfx/slot/222/222LinkTrail04.mp3',
    LG_Change_JumpUp    : 'sfx/slot/222/222LinkUpgrade.mp3',
    LG_Add_Upgrade      : 'sfx/slot/222/222LinkUpgrade02.mp3',
    LG_Trans            : 'sfx/slot/222/222LinkFEnd.mp3',
    LG_TrailResult      : 'sfx/slot/222/222LinkSum01.mp3',
    LG_Result           : 'sfx/slot/222/222LinkResult.mp3',

    // Voice
    JackpotVoice1       : 'sfx/slot/222/222JVoice01.mp3',
    JackpotVoice2       : 'sfx/slot/222/222JVoice02.mp3',
    JackpotVoice3       : 'sfx/slot/222/222JVoice03.mp3',
    JackpotVoice4       : 'sfx/slot/222/222JVoice04.mp3',
    JackpotVoice5       : 'sfx/slot/222/222JVoice05.mp3'
};
window.g_sndSlot222 = ResPack.create( 'sndSlot222', sndSlot222 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot223 = {
    // intro
    Intro               : 'sfx/slot/223/223Intro.mp3',

    // bgm
    Bgm                 : 'sfx/slot/223/223Bgm.mp3',
    LinkBgm             : 'sfx/slot/223/223LinkBgm.mp3',
    FreeBgm             : 'sfx/slot/223/223FsBgm.mp3',

    // normal spin / free spin
    Spin                : 'sfx/slot/223/223Spin.mp3',
    ReelStop            : 'sfx/slot/223/223ReelStop.mp3',
    // link spin
    LinkSpin            : 'sfx/slot/223/223LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/223/223LinkReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/223/223MPayCount.mp3',
    NPayCount01         : 'sfx/slot/223/223NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/223/223NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/223/223NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/223/223NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/223/223NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/223/223NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/223/223MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/223/223JackpotPopup.mp3',

    SLocking01          : 'sfx/slot/223/223SLocking01.mp3',
    SLocking02          : 'sfx/slot/223/223SLocking02.mp3',
    SLocking03          : 'sfx/slot/223/223SLocking03.mp3',
    SLocking04          : 'sfx/slot/223/223SLocking04.mp3',
    SLocking05          : 'sfx/slot/223/223SLocking05.mp3',

    SMatch              : 'sfx/slot/223/223SMatch.mp3',

    PotTrail            : 'sfx/slot/223/223PotTrail.mp3',
    PotPre              : 'sfx/slot/223/223PotPre.mp3',
    PotOpen             : 'sfx/slot/223/223PotOpen.mp3',

    Longspin            : 'sfx/slot/223/223Longspin.mp3',
    Unlock              : 'sfx/slot/223/223Unlock.mp3',

    // Link
    LinkIntro           : 'sfx/slot/223/223LinkIntro.mp3',
    LinkSuperIntro      : 'sfx/slot/223/223SuperLinkIntro.mp3',
    LinkFrame01         : 'sfx/slot/223/223LinkFrame01.mp3',
    LinkFrame02         : 'sfx/slot/223/223LinkFrame02.mp3',
    LinkFrame03         : 'sfx/slot/223/223LinkFrame03.mp3',
    LsymLocking01       : 'sfx/slot/223/223LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/223/223LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/223/223LsymLocking03.mp3',
    LinkTrail01         : 'sfx/slot/223/223LinkTrail01.mp3',
    LinkTrail02         : 'sfx/slot/223/223LinkTrail02.mp3',
    LinkTrail03         : 'sfx/slot/223/223LinkTrail03.mp3',
    Upgrade             : 'sfx/slot/223/223Upgrade.mp3',
    LinkJmatch          : 'sfx/slot/223/223LinkJmatch.mp3',
    LinkSum01           : 'sfx/slot/223/223LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/223/223LinkSum02.mp3',
    LinkResult          : 'sfx/slot/223/223LinkResult.mp3',

    // Free
    FsIntro             : 'sfx/slot/223/223FsIntro.mp3',
    SuperFsIntro        : 'sfx/slot/223/223SuperFsIntro.mp3',
    FsWild01            : 'sfx/slot/223/223FsWild01.mp3',
    FsWild02            : 'sfx/slot/223/223FsWild02.mp3',
    FsWild03            : 'sfx/slot/223/223FsWild03.mp3',
    FsWild04            : 'sfx/slot/223/223FsWild04.mp3',
    FsWild05            : 'sfx/slot/223/223FsWild05.mp3',
    FsCount             : 'sfx/slot/223/223FsCount.mp3',
    FsResult            : 'sfx/slot/223/223FsResult.mp3',

    // Map
    MapOver             : 'sfx/slot/223/223MapOver.mp3',
    MapOpen             : 'sfx/slot/223/223MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/223/223MapNormalGauge.mp3',
    MapDevilGuage       : 'sfx/slot/223/223MapDevilGuage.mp3',
    MapAngelGuage       : 'sfx/slot/223/223MapAngelGuage.mp3',

    // jackpot Voice
    JVoice01            : 'sfx/slot/223/223JVoice01.mp3',
    JVoice02            : 'sfx/slot/223/223JVoice02.mp3',
    JVoice03            : 'sfx/slot/223/223JVoice03.mp3',
    JVoice04            : 'sfx/slot/223/223JVoice04.mp3',
    JVoice05            : 'sfx/slot/223/223JVoice05.mp3',
};
window.g_sndSlot223 = ResPack.create( 'sndSlot223', sndSlot223 ).concat( g_sfxSlotCommon );

window.sndSlot224 = {
    // intro
    Intro               : 'sfx/slot/224/224Intro.mp3',
    // bgm
    NormalBgm           : 'sfx/slot/224/224Bgm.mp3',
    FreeBgm             : 'sfx/slot/224/224FsBgm.mp3',
    LinkBgm             : 'sfx/slot/224/224LinkBgm.mp3',
    // pay
    MPayCount           : 'sfx/slot/224/224MPayCount.mp3',
    NPayCount01         : 'sfx/slot/224/224NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/224/224NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/224/224NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/224/224NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/224/224NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/224/224NPayCount03End.mp3',
    // normal
    Spin                : 'sfx/slot/224/224Spin.mp3',
    ReelStop            : 'sfx/slot/224/224ReelStop.mp3',
    LongSpin            : 'sfx/slot/224/224Longspin.mp3',
    // pot
    PotStepUp           : 'sfx/slot/224/224PotPre.mp3',
    PotOpen             : 'sfx/slot/224/224PotOpen.mp3',
    // free
    ChangeStickyWild    : 'sfx/slot/224/224FsWild.mp3',
    FreespinTotalWin    : 'sfx/slot/224/224FsCount.mp3',
    // link
    LinkSpin            : 'sfx/slot/224/224LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/224/224LinkReelStop.mp3',
    SpinCountUIReset    : 'sfx/slot/224/224LinkReset.mp3',
    LinkCharacterOpen   : 'sfx/slot/224/224LinkFrame01.mp3',
    MoveRight           : 'sfx/slot/224/224LinkFrame02.mp3',
    SymbolAdder         : 'sfx/slot/224/224LinkFrame03.mp3',
    // symbol
    SymbolWildTrail     : 'sfx/slot/224/224PotTrail.mp3',
    SymbolScatterL0     : 'sfx/slot/224/224SLocking01.mp3',
    SymbolScatterL1     : 'sfx/slot/224/224SLocking02.mp3',
    SymbolScatterL2     : 'sfx/slot/224/224SLocking03.mp3',
    SymbolScatterL3     : 'sfx/slot/224/224SLocking04.mp3',
    SymbolScatterL4     : 'sfx/slot/224/224SLocking05.mp3',
    SymbolScatterM      : 'sfx/slot/224/224SMatch.mp3',

    SymbolLinkDPL       : 'sfx/slot/224/224LsymLocking01.mp3',
    SymbolLinkAddL      : 'sfx/slot/224/224LsymLocking02.mp3',
    SymbolLinkUpL       : 'sfx/slot/224/224LsymLocking03.mp3',
    SymbolLinkJPL       : 'sfx/slot/224/224LsymLocking04.mp3',
    SymbolLinkEndMatch  : 'sfx/slot/224/224LinkEnd01.mp3',
    // Trail
    TrailMoving         : 'sfx/slot/224/224LinkTrail01.mp3',
    TrailAddWin         : 'sfx/slot/224/224LinkTrail02.mp3',
    TrailToAdder        : 'sfx/slot/224/224LinkTrail03.mp3',
    TrailToWin          : 'sfx/slot/224/224LinkSum.mp3',
    // popup
    MajorwinPopup       : 'sfx/slot/224/224MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/224/224JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/224/224FsIntro.mp3',
    LinkIntroPopup      : 'sfx/slot/224/224LinkIntro.mp3',
    FreeResultPopup     : 'sfx/slot/224/224FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/224/224LinkResult.mp3',
    //
    LinkCountUp         : 'sfx/slot/224/224LinkEnd02.mp3',
    LinkCountEnd        : 'sfx/slot/224/224LinkEnd03.mp3',

    // map
    MapOpen             : 'sfx/slot/224/224MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/224/224MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/224/224MapSuperGuage.mp3',

    // minimap
    MapOver             : 'sfx/slot/224/224MapOver.mp3',
    BetUnLock           : 'sfx/slot/224/224Unlock.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/224/224JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/224/224JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/224/224JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/224/224JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/224/224JVoice05.mp3'
};
window.g_sndSlot224 = ResPack.create( 'sndSlot224', sndSlot224 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ MonsterPrison ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot226 = {
    // intro
    Intro               : 'sfx/slot/226/226Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/226/226Bgm.mp3',
    FreeBgm             : 'sfx/slot/226/226FsBgm.mp3',
    BonusBgm            : "sfx/slot/226/226BoBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/226/226Spin.mp3',
    ReelStop            : 'sfx/slot/226/226ReelStop.mp3',
    //LongSpin            : 'sfx/slot/226/226Longspin.mp3',

    // ui
    FreespinTotalWin    : 'sfx/slot/226/226FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/226/226MPayCount.mp3',
    NPayCount01         : 'sfx/slot/226/226NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/226/226NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/226/226NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/226/226NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/226/226NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/226/226NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/226/226JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/226/226JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/226/226JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/226/226JVoice04.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/226/226MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/226/226JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/226/226FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/226/226FsResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/226/226Unlock.mp3',

    // Trail
    PlusSpinTrail           : 'sfx/slot/226/226FsTrail.mp3',

    // pot
    PotTrail           : 'sfx/slot/226/226Trail.mp3',
    PotPre             : 'sfx/slot/226/226PotPre.mp3',
    PotOpen            : 'sfx/slot/226/226PotOpen.mp3',
    // normal

    // free

    // symbol
    SymbolLockingDP0  : 'sfx/slot/226/226SLocking01.mp3',
    SymbolLockingDP4  : 'sfx/slot/226/226SLocking02.mp3',
    SymbolLockingStickyWild1  : 'sfx/slot/226/226SLocking03.mp3',
    SymbolLockingStickyWild2  : 'sfx/slot/226/226SLocking04.mp3',
    SymbolLockingStickyWild3  : 'sfx/slot/226/226SLocking05.mp3',
    SymbolLockingUpgrade     : 'sfx/slot/226/226ULocking.mp3', //
    SymbolLockingFreeDP0  : 'sfx/slot/226/226FsLock01.mp3',
    SymbolLockingFreeDP1  : 'sfx/slot/226/226FsLock02.mp3',
    SymbolLockingFreeDP2  : 'sfx/slot/226/226FsLock03.mp3',
    SymbolLockingFreeDP3  : 'sfx/slot/226/226FsLock04.mp3',
    SymbolLockingFreeDP4  : 'sfx/slot/226/226FsLock05.mp3',
    SymbolLockingPlusSpin  : 'sfx/slot/226/226FsPlus.mp3',

    //match
    ScatterMatch           : 'sfx/slot/226/226SMatch01.mp3',
    Upgrade             : 'sfx/slot/226/226UMatch.mp3',
    DPMatch             : 'sfx/slot/226/226FMatch.mp3',
    //WildMatch             : 'sfx/slot/226/226SMatch01.mp3',
    //WildChange             : 'sfx/slot/226/226SMatch02.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/226/226TipOver.mp3",

    //bonus
    BonusIntro             : 'sfx/slot/226/226BoIntro.mp3',
    BonusDP0             : 'sfx/slot/226/226BoSymbol01.mp3',
    BonusDP1             : 'sfx/slot/226/226BoSymbol02.mp3',
    BonusDP2             : 'sfx/slot/226/226BoSymbol03.mp3',
    BonusDP3             : 'sfx/slot/226/226BoSymbol04.mp3',
    BonusDP4             : 'sfx/slot/226/226BoSymbol05.mp3',
    BonusJackpot          : 'sfx/slot/226/226BoJackpot.mp3',
    BonusUpgrade          : 'sfx/slot/226/226BoUpgrade.mp3',
    BonusCount          : 'sfx/slot/226/226BoCount.mp3',
    BonusResult          : 'sfx/slot/226/226BoResult.mp3',
    BonusComplete          : 'sfx/slot/226/226BoComplete.mp3',

    // Map
    MapOver                   : 'sfx/slot/226/226MapOver.mp3',
    //MapClick                  : 'sfx/slot/226/226MapClick.mp3',
    //MapUnlock                 : 'sfx/slot/226/226Unlock.mp3',
    MapOpen                   : 'sfx/slot/226/226MapOpen.mp3',
    MapNormalGauge            : 'sfx/slot/226/226MapNormalGauge.mp3',
    MapSuperbonusGauge        : 'sfx/slot/226/226MapSuperGuage.mp3',//Gauge..
};
window.g_sndSlot226 = ResPack.create( 'sndSlot226', sndSlot226 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ luckyNekoParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot225 = {
    // intro
    Intro               : 'sfx/slot/225/225Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/225/225Bgm.mp3',
    FreeBgm             : 'sfx/slot/225/225FsBgm.mp3',
    LinkBgm             : 'sfx/slot/225/225LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/225/225Spin.mp3',
    ReelStop            : 'sfx/slot/225/225ReelStop.mp3',
    LongSpin          : 'sfx/slot/225/225Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/225/225MPayCount.mp3',
    NPayCount01         : 'sfx/slot/225/225NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/225/225NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/225/225NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/225/225NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/225/225NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/225/225NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/225/225Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/225/225Spin.mp3',
    LinkReelStop        : 'sfx/slot/225/225ReelStop.mp3',
    LinkLongSpinFx      : 'sfx/slot/225/225Longspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/225/225MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/225/225JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/225/225FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/225/225FsResult.mp3',
    //LinkspinIntroPopup  : 'sfx/slot/225/225LinkIntro.mp3',
    //LinkspinResultPopup : 'sfx/slot/225/225LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/225/225DLocking.mp3',//작업안됨
    SLocking1     : 'sfx/slot/225/225JLocking.mp3',
    SLocking2     : 'sfx/slot/225/225CLocking.mp3',
    //SLocking3     : 'sfx/slot/225/225SLocking04.mp3',
    //SLocking4     : 'sfx/slot/225/225SLocking05.mp3',
    //ScatterMatch        : 'sfx/slot/225/225SMatch.mp3',
    //LinkMatch           : 'sfx/slot/225/225LMatch.mp3',

    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    // MapClick                    : 'sfx/slot/207/207MapClick.mp3',
    // MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    // MapOpen                   : 'sfx/slot/207/207MapOpen.mp3',
    // MapNormalGauge            : 'sfx/slot/207/207MapNormalGauge.mp3',
    // MapSuperbonusGauge        : 'sfx/slot/207/207MapSuperbonusGauge.mp3',

    //POT
    PotTrail            : 'sfx/slot/225/225PotTrail.mp3',
    PotBonus            : 'sfx/slot/225/225PotOpen.mp3',
    PotPre              : 'sfx/slot/225/225PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/225/225JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/225/225JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/225/225JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/225/225JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/225/225JVoice05.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    CMatch01       : 'sfx/slot/225/225CMatch01.mp3',       //A
    CMatch02       : 'sfx/slot/225/225CMatch02.mp3',       //A
    CMatch03       : 'sfx/slot/225/225CMatch03.mp3',       //A

    Rewind       : 'sfx/slot/225/225Rewind.mp3',       //A
    Rewind2       : 'sfx/slot/225/225Rewind02.mp3',       //A
    PotTrail       : 'sfx/slot/225/225PotTrail.mp3',       //A
    Retrigger       : 'sfx/slot/225/225Retrigger.mp3',       //A
    Mystery       : 'sfx/slot/225/225Mystery.mp3',       //A

    FsReset       : 'sfx/slot/225/225FsReset.mp3',       //A
    FsCount       : 'sfx/slot/225/225FsCount.mp3',       //A
    CTrail       : 'sfx/slot/225/225CTrail.mp3',       //A
};
window.g_sndSlot225 = ResPack.create( 'sndSlot225', sndSlot225 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Party Crashers BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot227 = {
    // intro
    Intro               : 'sfx/slot/227/227Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/227/227Bgm.mp3',
    RespinBgm           : 'sfx/slot/227/227ReBgm.mp3',
    FreespinBgm         : 'sfx/slot/227/227FsBgm.mp3',
    LinkBgm             : 'sfx/slot/227/227LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/227/227Spin.mp3',
    ReelStop            : 'sfx/slot/227/227ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/227/227MPayCount.mp3',
    NPayCount01         : 'sfx/slot/227/227NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/227/227NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/227/227NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/227/227NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/227/227NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/227/227NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/227/227MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/227/227JackpotPopup.mp3',

    // NORMAL
    ScatterLock1        : 'sfx/slot/227/227SLocking01.mp3',
    ScatterLock2        : 'sfx/slot/227/227SLocking02.mp3',
    ScatterLock3        : 'sfx/slot/227/227SLocking03.mp3',
    MonsterLock         : 'sfx/slot/227/227DLocking.mp3',
    JackpotLock         : 'sfx/slot/227/227JLocking.mp3',
    WildLock            : 'sfx/slot/227/227WLocking.mp3',
    WildChangeLock      : 'sfx/slot/227/227ReWild.mp3',
    RespinIntro         : 'sfx/slot/227/227RePopup.mp3',
    PotTrail            : 'sfx/slot/227/227PotTrail.mp3',
    PotCount            : 'sfx/slot/227/227PotCount.mp3',
    PotOpen             : 'sfx/slot/227/227PotOpen.mp3',
    ScatterMatch        : 'sfx/slot/227/227SMatch.mp3',
    ClseWinPanel        : 'sfx/slot/227/227PannelClose.mp3',
    Unlock              : 'sfx/slot/227/227Unlock.mp3',

    // Link Spin
    LG_Intro            : 'sfx/slot/227/227LinkIntro.mp3',
    LG_Spin             : 'sfx/slot/227/227LinkSpin.mp3',
    LG_ReelStop         : 'sfx/slot/227/227LinkReelStop.mp3',
    LG_SpinReset        : 'sfx/slot/227/227LinkReset.mp3',
    LG_MonsterSymLock   : 'sfx/slot/227/227LsymLocking01.mp3',
    LG_BombSymLock      : 'sfx/slot/227/227LsymLocking02.mp3',
    LG_OpenSymLock      : 'sfx/slot/227/227LsymLocking03.mp3',
    LG_MachineGunSymLock: 'sfx/slot/227/227LsymLocking04.mp3',
    LG_JackpotSymLock   : 'sfx/slot/227/227LsymLocking05.mp3',
    LG_LockOpen         : 'sfx/slot/227/227LinkRaw.mp3',
    LG_Upgrade1         : 'sfx/slot/227/227LinkUpgrade01.mp3',
    LG_Upgrade2         : 'sfx/slot/227/227LinkUpgrade02.mp3',
    LG_GunTarget        : 'sfx/slot/227/227LinkUpgrade03.mp3',
    LG_GunLoop          : 'sfx/slot/227/227LinkUpgrade03_1.mp3',
    LG_GunUpgrade1      : 'sfx/slot/227/227LinkUpgrade04.mp3',
    LG_GunUpgrade2      : 'sfx/slot/227/227LinkUpgrade05.mp3',
    LG_CountToBomb      : 'sfx/slot/227/227BMatch01.mp3',
    LG_CountToGun       : 'sfx/slot/227/227BMatch02.mp3',
    LG_ResultCount      : 'sfx/slot/227/227LinkEnd01.mp3',
    LG_ResultCountStart : 'sfx/slot/227/227LinkEnd02.mp3',
    LG_ResultCountEnd   : 'sfx/slot/227/227LinkEnd03.mp3',
    LG_ResultWinpanel   : 'sfx/slot/227/227LCount.mp3',
    LG_Result           : 'sfx/slot/227/227LinkResult.mp3',

    // Link Spin
    FG_Intro            : 'sfx/slot/227/227FsIntro.mp3',
    FG_Retrigger        : 'sfx/slot/227/227Retrigger.mp3', //리트리거 없음
    FG_WinpanelCount    : 'sfx/slot/227/227FsCount.mp3',
    FG_Result           : 'sfx/slot/227/227FsResult.mp3',

    // Voice
    JackpotVoice1       : 'sfx/slot/227/227JVoice01.mp3',
    JackpotVoice2       : 'sfx/slot/227/227JVoice02.mp3',
    JackpotVoice3       : 'sfx/slot/227/227JVoice03.mp3',
    JackpotVoice4       : 'sfx/slot/227/227JVoice04.mp3',
    JackpotVoice5       : 'sfx/slot/227/227JVoice05.mp3',
    JackpotVoice6       : 'sfx/slot/227/227JVoice06.mp3'
};
window.g_sndSlot227 = ResPack.create( 'sndSlot227', sndSlot227 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot228 = {
    // intro
    Intro               : 'sfx/slot/228/228Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/228/228Bgm.mp3',
    FreeBgm             : 'sfx/slot/228/228FsBgm.mp3',
    LinkBgm             : 'sfx/slot/228/228LinkBgm.mp3',
    CashBgm             : 'sfx/slot/228/228CsBgm.mp3',

    // pay
    MPayCount           : 'sfx/slot/228/228MPayCount.mp3',
    NPayCount01         : 'sfx/slot/228/228NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/228/228NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/228/228NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/228/228NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/228/228NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/228/228NPayCount03End.mp3',

    // normal
    Spin                : 'sfx/slot/228/228Spin.mp3',
    ReelStop            : 'sfx/slot/228/228ReelStop.mp3',

    // pot
    PotTrail            : 'sfx/slot/228/228PotTrail.mp3',
    PotStepUp           : 'sfx/slot/228/228PotPre.mp3',
    PotOpen             : 'sfx/slot/228/228PotOpen.mp3',

    // common
    Unlock              : 'sfx/slot/228/228Unlock.mp3',
    ArrayOpen           : 'sfx/slot/228/228Open.mp3',
    SuperNoti           : 'sfx/slot/228/228Noti.mp3',

    // free
    FreespinTotalWin    : 'sfx/slot/228/228FsCount.mp3',
    FsReelStop          : 'sfx/slot/228/228FsReelStop.mp3',
    Fstrans             : 'sfx/slot/228/228Fstrans.mp3',

    // cash
    CashReelStop        : 'sfx/slot/228/228CsReelStop.mp3',
    CashLongspin        : 'sfx/slot/228/228CsLongSpin.mp3',

    // link
    LinkSpin            : 'sfx/slot/228/228LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/228/228LinkReelStop.mp3',
    SpinCountUIReset    : 'sfx/slot/228/228LinkReset.mp3',
    LinkQHElevate       : 'sfx/slot/228/228QuickSum.mp3',

    // symbol
    SymbolLinkDPL       : 'sfx/slot/228/228LsymLocking01.mp3',
    SymbolLinkJpL       : 'sfx/slot/228/228LsymLocking02.mp3',
    SymbolLinkAwardL    : 'sfx/slot/228/228LsymLocking03.mp3',
    SymbolLinkQHL       : 'sfx/slot/228/228LsymLocking04.mp3',
    SymbolLinkArrayOpenL: 'sfx/slot/228/228LsymLocking05.mp3',

    SymbolLinkAwardM    : 'sfx/slot/228/228LinkMatch01.mp3',
    SymbolLinkQHM       : 'sfx/slot/228/228LinkMatch02.mp3',
    SymbolLinkJpM       : 'sfx/slot/228/228LinkMatch03.mp3',
    SymbolLinkArrayOpenM: 'sfx/slot/228/228LinkMatch04.mp3',

    SymbolLinkDpF       : 'sfx/slot/228/228LinkFlip01.mp3',
    SymbolLinkQHF       : 'sfx/slot/228/228LinkFlip02.mp3',
    SymbolLinkAwardF    : 'sfx/slot/228/228LinkFlip03.mp3',
    SymbolLinkJpF       : 'sfx/slot/228/228LinkFlip04.mp3',

    SymbolCsTrailJp     : 'sfx/slot/228/228CsTrail01.mp3',
    SymbolCsAddSpin     : 'sfx/slot/228/228CsTrail02.mp3',
    SymbolCsLockJp      : 'sfx/slot/228/228CsLocking01.mp3',
    SymbolCsLockArray   : 'sfx/slot/228/228CsLocking02.mp3',
    SymbolCsMatchArray  : 'sfx/slot/228/228CsMatch01.mp3',

    // Trail
    SymbolLinkDpT       : 'sfx/slot/228/228LinkTrail01.mp3',
    SymbolLinkQHT       : 'sfx/slot/228/228LinkTrail02.mp3',
    AwardWinToWin       : 'sfx/slot/228/228LinkSum01.mp3',
    SymbolLinkDpToWin   : 'sfx/slot/228/228LinkSum02.mp3',
    QHNotiToWin         : 'sfx/slot/228/228LinkSum03.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/228/228MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/228/228JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/228/228FsIntro.mp3',
    FreeIntroPopSym     : 'sfx/slot/228/228FsSymbol.mp3',
    LinkIntroPopup      : 'sfx/slot/228/228LinkIntro.mp3',
    FreeResultPopup     : 'sfx/slot/228/228FsResult.mp3',
    LinkResultPopup     : 'sfx/slot/228/228LinkResult.mp3',
    CashIntroPopup      : 'sfx/slot/228/228CsIntro.mp3',
    CashResultPopup     : 'sfx/slot/228/228CsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/228/228JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/228/228JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/228/228JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/228/228JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/228/228JVoice05.mp3',
    QHJackpotVoice      : 'sfx/slot/228/228JVoice06.mp3'
};
window.g_sndSlot228 = ResPack.create( 'sndSlot228', sndSlot228 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ JurassicTrio ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot229 = {
    // intro
    Intro               : 'sfx/slot/229/229Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/229/229Bgm.mp3',
    FreeBgm             : 'sfx/slot/229/229FsBgm.mp3',
    LinkBgm            : "sfx/slot/229/229LinkBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/229/229Spin.mp3',
    ReelStop            : 'sfx/slot/229/229ReelStop.mp3',
    //LongSpin            : 'sfx/slot/229/229Longspin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/229/229LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/229/229LinkReelStop.mp3',
    LinkLongSpin        : 'sfx/slot/229/229LinkLongspin.mp3',
    SpinCountUIReset    : 'sfx/slot/229/229LinkReset.mp3',

    // ui
    FreespinTotalWin    : 'sfx/slot/229/229FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/229/229MPayCount.mp3',
    NPayCount01         : 'sfx/slot/229/229NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/229/229NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/229/229NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/229/229NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/229/229NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/229/229NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/229/229JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/229/229JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/229/229JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/229/229JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/229/229JVoice05.mp3',
    JackpotVoice5       : 'sfx/slot/229/229JVoice06.mp3', //grand
    //JackpotVoice6       : 'sfx/slot/229/229JVoice07.mp3', //qh
    QHJackpotVoice0       : 'sfx/slot/229/229JVoice08.mp3',
    QHJackpotVoice1       : 'sfx/slot/229/229JVoice09.mp3',
    QHJackpotVoice2       : 'sfx/slot/229/229JVoice10.mp3',
    QHJackpotVoice3       : 'sfx/slot/229/229JVoice11.mp3',
    QHJackpotVoice4       : 'sfx/slot/229/229JVoice12.mp3',
    QHJackpotVoice5       : 'sfx/slot/229/229JVoice13.mp3',
    QHJackpotVoice6       : 'sfx/slot/229/229JVoice14.mp3',
    QHJackpotVoice7       : 'sfx/slot/229/229JVoice15.mp3',
    QHJackpotVoice8       : 'sfx/slot/229/229JVoice16.mp3',

    FreeIntroVoice0       : 'sfx/slot/229/229FsVoice01.mp3',
    FreeIntroVoice1       : 'sfx/slot/229/229FsVoice02.mp3',

    MajorwinPopup       : 'sfx/slot/229/229MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/229/229JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/229/229FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/229/229FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/229/229LinkIntro.mp3',
    LinkResultPopup     : 'sfx/slot/229/229LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/229/229Unlock.mp3',

    // Trail
    AddSpinTrail           : 'sfx/slot/229/229FsTrail01.mp3',
    UpgradeTrail           : 'sfx/slot/229/229FsTrail02.mp3',
    DpTrail                 : 'sfx/slot/229/229LinkSum01.mp3',
    JackpotTrail           : 'sfx/slot/229/229LinkSum02.mp3',

    // pot
    PotTrail           : 'sfx/slot/229/229Trail.mp3',
    //PotPre             : 'sfx/slot/229/229PotPre.mp3',
    PotOpen            : 'sfx/slot/229/229PotOpen.mp3',
    PotRandom            : 'sfx/slot/229/229PotCount01.mp3',
    PotFix            : 'sfx/slot/229/229PotCount02.mp3',
    PotTrailToDia            : 'sfx/slot/229/229PotCountTrail.mp3',

    //fx
    FreeZoneOpenFx           : 'sfx/slot/229/229FsFrame.mp3',
    LinkDoubleFx           : 'sfx/slot/229/229LinkNoti.mp3',

    // symbol
    SymbolFreeConfirm           : 'sfx/slot/229/229FsWmatch01.mp3',
    SymbolFreeExpand           : 'sfx/slot/229/229FsWmatch02.mp3',
    SymbolLinkUpgrade  : 'sfx/slot/229/229LinkMatch.mp3',
    SymbolLinkDPUpgrade  : 'sfx/slot/229/229LinkUpgrade01.mp3',
    SymbolLinkJackpotUpgrade  : 'sfx/slot/229/229LinkUpgrade02.mp3',


    // symbol locking
    SymbolLockingScatter0  : 'sfx/slot/229/229SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/229/229SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/229/229SLocking03.mp3',
    SymbolLockingQuickHit  : 'sfx/slot/229/229QLocking.mp3',
    SymbolLockingStickyWild1  : 'sfx/slot/229/229WLocking01.mp3',
    SymbolLockingStickyWild2  : 'sfx/slot/229/229WLocking02.mp3',
    SymbolLockingStickyWild3  : 'sfx/slot/229/229WLocking03.mp3',

    SymbolLockingFreeUpgrade  : 'sfx/slot/229/229FsLocking01.mp3',
    SymbolLockingFreeAddSpin  : 'sfx/slot/229/229FsLocking02.mp3',

    SymbolLockingLinkDP  : 'sfx/slot/229/229LsymLocking01.mp3',
    SymbolLockingLinkJackpot  : 'sfx/slot/229/229LsymLocking02.mp3',
    SymbolLockingLinkUpgrade  : 'sfx/slot/229/229LsymLocking03.mp3',

    //match
    ScatterMatch         : 'sfx/slot/229/229SMatch.mp3',
    QuickHitMatch        : 'sfx/slot/229/229QMatch.mp3',
    //tooltip
    //TooltipOpen            : "sfx/slot/229/229TipOver.mp3",

    //noti
    QHNotiChange             : 'sfx/slot/229/229Pannel.mp3',
    QHNotiIndicatorUp        : 'sfx/slot/229/229QuickSum.mp3',

};
window.g_sndSlot229 = ResPack.create( 'sndSlot229', sndSlot229 ).concat( g_sfxSlotCommon );
//endregion


//-- ↑↑↑ luckyNekoParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot232 = {
    // intro
    Intro               : 'sfx/slot/232/232Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/232/232Bgm.mp3',
    FreeBgm             : 'sfx/slot/232/232FsBgm.mp3',
    LinkBgm             : 'sfx/slot/232/232ReBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/232/232Spin.mp3',
    ReelStop            : 'sfx/slot/232/232ReelStop.mp3',
    LongSpin          : 'sfx/slot/232/232LongSpin.mp3',

    // pay
    MPayCount           : 'sfx/slot/232/232MPayCount.mp3',
    NPayCount01         : 'sfx/slot/232/232NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/232/232NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/232/232NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/232/232NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/232/232NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/232/232NPayCount03End.mp3',
    FsCount             : 'sfx/slot/232/232FsCount.mp3',       //A

    // betting
    BetLimitOver        : 'sfx/slot/232/232Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    // LinkSpin            : 'sfx/slot/232/232LinkSpin.mp3',
    // LinkReelStop        : 'sfx/slot/232/232LinkReelstop.mp3',
    // LinkLongSpinFx      : 'sfx/slot/232/232LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/232/232MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/232/232JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/232/232FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/232/232FsResult.mp3',
    // LinkspinIntroPopup  : 'sfx/slot/232/232LinkIntro.mp3',
    // LinkspinResultPopup : 'sfx/slot/232/232LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/232/232SLocking01.mp3',//작업안됨
    SLocking1     : 'sfx/slot/232/232SLocking02.mp3',
    SLocking2     : 'sfx/slot/232/232SLocking03.mp3',
    // SLocking3     : 'sfx/slot/232/232SLocking04.mp3',
    // SLocking4     : 'sfx/slot/232/232SLocking05.mp3',
    ScatterMatch        : 'sfx/slot/232/232SMatch.mp3',
    // LinkMatch           : 'sfx/slot/232/232LMatch.mp3',
    QLocking0      : 'sfx/slot/232/232QLocking01.mp3',
    QLocking1      : 'sfx/slot/232/232QLocking02.mp3',
    QLocking2      : 'sfx/slot/232/232QLocking03.mp3',
    WLocking      : 'sfx/slot/232/232WLocking.mp3',

    ReSymbol0      : 'sfx/slot/232/232ReSymbol01.mp3',
    ReSymbol1      : 'sfx/slot/232/232ReSymbol02.mp3',
    ReSymbol2      : 'sfx/slot/232/232ReSymbol03.mp3',

    QMatch0        : 'sfx/slot/232/232QMatch01.mp3',
    QMatch1        : 'sfx/slot/232/232QMatch02.mp3',
    JMatch        : 'sfx/slot/232/232JMatch.mp3',

    // == Map MiniMap===
    //MapOver                     : 'sfx/slot/199/199MapOver.mp3',
    // MapClick                    : 'sfx/slot/207/207MapClick.mp3',
    // MapUnlock                   : 'sfx/slot/199/199Unlock.mp3',
    // == Map POPUP===
    // MapOpen                   : 'sfx/slot/207/207MapOpen.mp3',
    // MapNormalGauge            : 'sfx/slot/207/207MapNormalGauge.mp3',
    // MapSuperbonusGauge        : 'sfx/slot/207/207MapSuperbonusGauge.mp3',

    //POT
    PotTrail            : 'sfx/slot/232/232PotTrail.mp3',
    PotBonus            : 'sfx/slot/232/232PotOpen.mp3',
    //PotPre              : 'sfx/slot/232/232PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/232/232JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/232/232JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/232/232JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/232/232JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/232/232JVoice05.mp3',       //A
    JackpotVoice5       : 'sfx/slot/232/232JVoice06.mp3',       //A
    JackpotVoice6       : 'sfx/slot/232/232JVoice07.mp3',       //A
    JackpotVoice7       : 'sfx/slot/232/232JVoice08.mp3',       //A
    JackpotVoice8       : 'sfx/slot/232/232JVoice09.mp3',       //A
    JackpotVoice9       : 'sfx/slot/232/232JVoice10.mp3',       //A
    JackpotVoice10       : 'sfx/slot/232/232JVoice11.mp3',       //A
    JackpotVoice11       : 'sfx/slot/232/232JVoice12.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    FsSpray : 'sfx/slot/232/232FsSpray.mp3',
};
window.g_sndSlot232 = ResPack.create( 'sndSlot232', sndSlot232 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Money Express BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot233 = {
    // INTRO
    Intro               : 'sfx/slot/233/233Intro.mp3',

    // BGM
    NormalBgm           : 'sfx/slot/233/233Bgm.mp3',
    FreespinBgm         : 'sfx/slot/233/233FsBgm.mp3',
    BonusGameBgm        : 'sfx/slot/233/233BoBgm.mp3',
    PotGameBgm          : 'sfx/slot/233/233PickBgm.mp3',

    // PAY
    Spin                : 'sfx/slot/233/233Spin.mp3',
    ReelStop            : 'sfx/slot/233/233ReelStop.mp3',
    MPayCount           : 'sfx/slot/233/233MPayCount.mp3',
    NPayCount01         : 'sfx/slot/233/233NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/233/233NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/233/233NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/233/233NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/233/233NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/233/233NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/233/233MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/233/233JackpotPopup.mp3',

    // Normal
    ScatterLock1        : 'sfx/slot/233/233SLocking01.mp3',
    ScatterLock2        : 'sfx/slot/233/233SLocking02.mp3',
    ScatterLock3        : 'sfx/slot/233/233SLocking03.mp3',
    ScatterLock4        : 'sfx/slot/233/233SLocking04.mp3',
    ScatterLock5        : 'sfx/slot/233/233SLocking05.mp3',
    DPLock1             : 'sfx/slot/233/233DLocking01.mp3',
    DPLock2             : 'sfx/slot/233/233DLocking02.mp3',
    DPLock3             : 'sfx/slot/233/233DLocking03.mp3',
    DPLock4             : 'sfx/slot/233/233DLocking04.mp3',
    DPLock5             : 'sfx/slot/233/233DLocking05.mp3',
    CollectLock1        : 'sfx/slot/233/233CLocking01.mp3',
    CollectLock2        : 'sfx/slot/233/233CLocking02.mp3',
    ExpressLock         : 'sfx/slot/233/233MLocking.mp3',
    ScatterMatch        : 'sfx/slot/233/233SMatch.mp3',
    Collect1Match       : 'sfx/slot/233/233CMatch01.mp3',
    Collect2Match       : 'sfx/slot/233/233CMatch02.mp3',
    Collect3Match       : 'sfx/slot/233/233CMatch03.mp3',
    ExpressMatch        : 'sfx/slot/233/233MMatch.mp3',
    GExpressMatch       : 'sfx/slot/233/233MMatch02.mp3',
    OpenPanel           : 'sfx/slot/233/233DpCheck.mp3',
    Trail               : 'sfx/slot/233/233Trail.mp3',
    PotOpen             : 'sfx/slot/233/233PotOpen.mp3',
    LongSpin            : 'sfx/slot/233/233LongSpin.mp3',
    SelectOpen          : 'sfx/slot/233/233PickOpen01.mp3',
    SelectClick         : 'sfx/slot/233/233PickOpen02.mp3',
    Train               : 'sfx/slot/233/233Train.mp3',
    TipOver             : 'sfx/slot/233/233TipOver.mp3',
    Unlock              : 'sfx/slot/233/233Unlock.mp3',
    FsFram              : 'sfx/slot/233/233FsFrame.mp3',

    // Free Spin
    FG_Intro            : 'sfx/slot/233/233FsIntro.mp3',
    EX_Trail            : 'sfx/slot/233/233FsTrail.mp3',
    FG_WinpanelCount    : 'sfx/slot/233/233FsCount.mp3',
    FG_Result           : 'sfx/slot/233/233FsResult.mp3',

    // Bonus(Express)Game
    BG_NormalTrail      : 'sfx/slot/233/233BonusSum01.mp3',
    BG_JackpotTrail     : 'sfx/slot/233/233BonusSum02.mp3',
    BG_Intro            : 'sfx/slot/233/233BoIntro.mp3',
    BG_Train_Intro      : 'sfx/slot/233/233BoIntro02.mp3',
    BG_Sum              : 'sfx/slot/233/233BoSum.mp3',
    BG_EX_Intro         : 'sfx/slot/233/233MExIntro.mp3',
    BG_EX_Result        : 'sfx/slot/233/233BoResult.mp3',

    // Map(Pick)
    Map_Open           : 'sfx/slot/233/233MapOpen.mp3',
    Map_Current        : 'sfx/slot/233/233MapNoti.mp3',
    PG_Click           : 'sfx/slot/233/233MapPick.mp3',
    PG_DP              : 'sfx/slot/233/233MapMatch01.mp3',
    PG_Fail            : 'sfx/slot/233/233MapMatch02.mp3',
    PG_Trail           : 'sfx/slot/233/233MapResult.mp3',

    // Voice
    JackpotVoice1      : 'sfx/slot/233/233JVoice01.mp3',
    JackpotVoice2      : 'sfx/slot/233/233JVoice02.mp3',
    JackpotVoice3      : 'sfx/slot/233/233JVoice03.mp3',
    JackpotVoice4      : 'sfx/slot/233/233JVoice04.mp3',
    JackpotVoice5      : 'sfx/slot/233/233JVoice05.mp3',

    BonusVoice1        : 'sfx/slot/233/233Bvoice01.mp3',
    BonusVoice2        : 'sfx/slot/233/233Bvoice02.mp3',
    BonusVoice3        : 'sfx/slot/233/233Bvoice03.mp3',
    BonusVoice4        : 'sfx/slot/233/233Bvoice04.mp3'
};
window.g_sndSlot233 = ResPack.create( 'sndSlot233', sndSlot233 ).concat( g_sfxSlotCommon );
//endregion

window.sndKeno230 = {
    // pot
    PotStepUp           : 'sfx/slot/224/224PotPre.mp3',
    PotOpen             : 'sfx/slot/keno/kenoFpOpen.mp3',

    // Numbers
    BtnNumberScatterHit : 'sfx/slot/keno/kenoCoinWin.mp3',
    ScatterMatch        : 'sfx/slot/keno/kenoFpSmatch.mp3',

    // poopup
    FreeIntroPopup      : 'sfx/slot/keno/kenoFpFsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/keno/kenoFpFsResult.mp3',
    PickGameJackpotPopup: 'sfx/slot/keno/kenoPickResult.mp3',
    CustomMajorWinPopup : 'sfx/slot/keno/kenoFpMPopup.mp3',

    PickGamePopup       : 'sfx/slot/keno/kenoPickOpen.mp3',
    PickGameNormalPick  : 'sfx/slot/keno/kenoPick01.mp3',
    PickGameMultiPick   : 'sfx/slot/keno/kenoPick02.mp3',
    PickGameMatch       : 'sfx/slot/keno/kenoPickMatch.mp3',

    //
    TotalpayMultiply    : 'sfx/slot/keno/kenoFpMulti.mp3',

    // trail
    ScatterTrail        : 'sfx/slot/keno/kenoFpTrail.mp3',
};
window.g_sndKeno230 = ResPack.create( 'sndKeno230', sndKeno230 ).concat( g_sndKenoCommon );

window.sndSlot234 = {
    // intro
    Intro               : 'sfx/slot/234/234Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/234/234Bgm.mp3',
    FreeBgm             : 'sfx/slot/234/234FsBgm.mp3',
    LinkBgm             : 'sfx/slot/234/234LinkBgm.mp3',
    BonusBgm            : 'sfx/slot/234/234BoBgm.mp3',

    // pay
    MPayCount           : 'sfx/slot/234/234MPayCount.mp3',
    NPayCount01         : 'sfx/slot/234/234NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/234/234NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/234/234NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/234/234NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/234/234NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/234/234NPayCount03End.mp3',

    // normal
    Spin                : 'sfx/slot/234/234Spin.mp3',
    ReelStop            : 'sfx/slot/234/234ReelStop.mp3',

    // pot
    Trail01             : 'sfx/slot/234/234Trail01.mp3',
    Trail02             : 'sfx/slot/234/234Trail02.mp3',
    Trail03             : 'sfx/slot/234/234Trail03.mp3',
    StickyMove          : 'sfx/slot/234/234Move.mp3',
    PotTrail            : 'sfx/slot/234/234PotTrail.mp3',
    PotCount            : 'sfx/slot/234/234PotCount.mp3',
    PotCountEnd         : 'sfx/slot/234/234PotCountEnd.mp3',
    PotOpen             : 'sfx/slot/234/234PotOpen.mp3',

    // common
    LinkLongspin        : 'sfx/slot/234/234LinkLongspin.mp3',
    Unlock              : 'sfx/slot/234/234Unlock.mp3',
    MajorwinPopup       : 'sfx/slot/234/234MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/234/234JackpotPopup.mp3',

    // normal
    WLocking01          : 'sfx/slot/234/234WLocking01.mp3',
    WLocking02          : 'sfx/slot/234/234WLocking02.mp3',
    WLocking03          : 'sfx/slot/234/234WLocking03.mp3',
    WLocking04          : 'sfx/slot/234/234WLocking04.mp3',
    WLocking05          : 'sfx/slot/234/234WLocking05.mp3',

    // free
    FsIntro             : 'sfx/slot/234/234FsIntro.mp3',
    FsWild              : 'sfx/slot/234/234FsWild.mp3',
    FsCount             : 'sfx/slot/234/234FsCount.mp3',
    FsResult            : 'sfx/slot/234/234FsResult.mp3',

    // bonus
    BoIntro             : 'sfx/slot/234/234BoIntro.mp3',
    BoSymbol01          : 'sfx/slot/234/234BoSymbol01.mp3',
    BoSymbol02          : 'sfx/slot/234/234BoSymbol02.mp3',
    BoCount             : 'sfx/slot/234/234BoCount.mp3',
    BoComplete          : 'sfx/slot/234/234BoComplete.mp3',
    BoResult            : 'sfx/slot/234/234BoResult.mp3',

    // link
    LinkSpin            : 'sfx/slot/234/234LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/234/234LinkReelStop.mp3',
    LinkIntro           : 'sfx/slot/234/234LinkIntro.mp3',
    LinkReset           : 'sfx/slot/234/234LinkReset.mp3',
    LsymLocking         : 'sfx/slot/234/234LsymLocking.mp3',
    LsymLocking02       : 'sfx/slot/234/234LsymLocking02.mp3',
    LsymLockingJp       : 'sfx/slot/234/234LinkJackpot.mp3',
    LinkFrame01         : 'sfx/slot/234/234LinkFrame01.mp3',
    LinkFrame02         : 'sfx/slot/234/234LinkFrame02.mp3',
    LinkFrame03         : 'sfx/slot/234/234LinkFrame03.mp3',
    LinkFrame04         : 'sfx/slot/234/234LinkFrame04.mp3',
    LinkEnd01           : 'sfx/slot/234/234LinkEnd01.mp3',
    LinkEnd02           : 'sfx/slot/234/234LinkEnd02.mp3',
    LinkEnd03           : 'sfx/slot/234/234LinkEnd03.mp3',
    LinkFinal           : 'sfx/slot/234/234LinkFinal.mp3',
    LCount              : 'sfx/slot/234/234LCount.mp3',
    LinkResult          : 'sfx/slot/234/234LinkResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/234/234JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/234/234JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/234/234JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/234/234JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/234/234JVoice05.mp3',
};
window.g_sndSlot234 = ResPack.create( 'sndSlot234', sndSlot234 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ DiscoNightParty ↓↓↓ -----------------------------------------------------------------------------------------//

window.sndSlot235 = {
    // intro
    Intro               : 'sfx/slot/235/235Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/235/235Bgm.mp3',
    FreeBgm             : 'sfx/slot/235/235FsBgm.mp3',
    LinkBgm            : "sfx/slot/235/235LinkBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/235/235Spin.mp3',
    ReelStop            : 'sfx/slot/235/235ReelStop.mp3',
    LongSpin            : 'sfx/slot/235/235LongSpin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/235/235LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/235/235LinkReelStop.mp3',
    //LinkLongSpin        : 'sfx/slot/235/235LinkLongspin.mp3',
    //SpinCountUIReset    : 'sfx/slot/235/235LinkReset.mp3',

    // ui
    FreespinTotalWin    : 'sfx/slot/235/235FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/235/235MPayCount.mp3',
    NPayCount01         : 'sfx/slot/235/235NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/235/235NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/235/235NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/235/235NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/235/235NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/235/235NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/235/235JVoice.mp3',

    LinkDpWordVoice0       : 'sfx/slot/235/235LinkVoice01.mp3', //mini
    LinkDpWordVoice1       : 'sfx/slot/235/235LinkVoice02.mp3',
    LinkDpWordVoice2       : 'sfx/slot/235/235LinkVoice03.mp3',
    LinkDpWordVoice3       : 'sfx/slot/235/235LinkVoice04.mp3',
    LinkDpWordVoice4       : 'sfx/slot/235/235LinkVoice05.mp3',

    MajorwinPopup       : 'sfx/slot/235/235MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/235/235JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/235/235FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/235/235FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/235/235LinkIntro.mp3',
    LinkIntro2Popup      : 'sfx/slot/235/235LinkInfo.mp3',
    LinkResultPopup     : 'sfx/slot/235/235LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/235/235Unlock.mp3',

    // Trail
    TrailToEachWinNoti     : 'sfx/slot/235/235LinkTrail01.mp3',
    TrailToEachWinSym     : 'sfx/slot/235/235LinkTrail02.mp3',
    TrailToDpWordNoti     : 'sfx/slot/235/235LinkTrail04.mp3',
    TrailToBonusWin     : 'sfx/slot/235/235LinkSum.mp3',


    // pot
    PotTrail           : 'sfx/slot/235/235Trail.mp3',
    //PotPre             : 'sfx/slot/235/235PotPre.mp3',
    PotOpen            : 'sfx/slot/235/235PotOpen.mp3',

    //fx
    MysterySpinFx         : 'sfx/slot/235/235Mystery.mp3',
    MysterySpinV0         : 'sfx/slot/235/235MVoice01.mp3',
    MysterySpinV1         : 'sfx/slot/235/235MVoice02.mp3',
    MysterySpinV2         : 'sfx/slot/235/235MVoice03.mp3',

    // symbol
    SymbolWildOpen           : 'sfx/slot/235/235FsWild.mp3',
    SymbolAddSpinUp         : 'sfx/slot/235/235LinkMatch02.mp3',
    SymbolDpWordPay         : 'sfx/slot/235/235LinkWordMatch.mp3',

    // symbol locking
    SymbolLockingScatter0  : 'sfx/slot/235/235SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/235/235SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/235/235SLocking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/235/235SLocking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/235/235SLocking05.mp3',

    SymbolLockingWild  : 'sfx/slot/235/235WLocking.mp3',
    SymbolLockingLongWild  : 'sfx/slot/235/235LWLocking.mp3',

    SymbolLockingLinkDP  : 'sfx/slot/235/235LsymLocking01.mp3',
    SymbolLockingLinkEachWin  : 'sfx/slot/235/235LsymLocking02.mp3',
    SymbolLockingLinkDpWord  : 'sfx/slot/235/235LsymLocking03.mp3',
    SymbolLockingLinkAddSpin  : 'sfx/slot/235/235LsymLocking04.mp3',

    //match
    ScatterMatch         : 'sfx/slot/235/235SMatch.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/235/235TipOver.mp3",

    //noti
    DPWordNotiStep         : 'sfx/slot/235/235LinkMatch01.mp3',
    DPWordNotiCount         : 'sfx/slot/235/235LinkCount.mp3',
    JPNotiOn                 : 'sfx/slot/235/235LinkMatch03.mp3',

};
window.g_sndSlot235 = ResPack.create( 'sndSlot235', sndSlot235 ).concat( g_sfxSlotCommon );
//endregion

//-- ↑↑↑ luckyNekoParade BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot236 = {
    // intro
    Intro               : 'sfx/slot/236/236Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/236/236Bgm.mp3',
    FreeBgm             : 'sfx/slot/236/236FsBgm.mp3',
    LinkBgm             : 'sfx/slot/236/236LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/236/236Spin.mp3',
    ReelStop            : 'sfx/slot/236/236ReelStop.mp3',
    LongSpin          : 'sfx/slot/236/236Longspin.mp3',
    FreeReelStop            : 'sfx/slot/236/236FsReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/236/236MPayCount.mp3',
    NPayCount01         : 'sfx/slot/236/236NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/236/236NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/236/236NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/236/236NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/236/236NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/236/236NPayCount03End.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/236/236Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/236/236LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/236/236LinkReelstop.mp3',
    LinkLongSpinFx      : 'sfx/slot/236/236LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/236/236MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/236/236JackpotPopup.mp3',
    FreespinIntroPopup  : 'sfx/slot/236/236FsIntro.mp3',
    FreespinResultPopup : 'sfx/slot/236/236FsResult.mp3',
    LinkspinIntroPopup  : 'sfx/slot/236/236LinkIntro.mp3',
    LinkspinResultPopup : 'sfx/slot/236/236LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/236/236Socking01.mp3',//작업안됨
    SLocking1     : 'sfx/slot/236/236Socking02.mp3',
    SLocking2     : 'sfx/slot/236/236Socking03.mp3',
    SLocking3     : 'sfx/slot/236/236Socking04.mp3',
    SLocking4     : 'sfx/slot/236/236Socking05.mp3',
    SLocking5     : 'sfx/slot/236/236Socking06.mp3',

    LLocking0     : 'sfx/slot/236/236Locking01.mp3',//작업안됨
    LLocking1     : 'sfx/slot/236/236Locking02.mp3',
    LLocking2     : 'sfx/slot/236/236Locking03.mp3',
    LLocking3     : 'sfx/slot/236/236Locking04.mp3',
    LLocking4     : 'sfx/slot/236/236Locking05.mp3',
    LLocking5     : 'sfx/slot/236/236Locking06.mp3',

    ScatterMatch        : 'sfx/slot/236/236SSMatch.mp3',
    LinkMatch           : 'sfx/slot/236/236LMatch.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/236/236JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/236/236JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/236/236JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/236/236JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/236/236JVoice05.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/207/207PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/207/207PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/207/207PannelSum.mp3',       //A

    //추가 구현
    FsLock01            : 'sfx/slot/236/236FsLock01.mp3',       //A
    FsLock02            : 'sfx/slot/236/236FsLock02.mp3',       //A
    FsFrame01       : 'sfx/slot/236/236FsFrame01.mp3',       //A
    FsFrame02       : 'sfx/slot/236/236FsFrame02.mp3',       //A
    FsPlus01       : 'sfx/slot/236/236FsPlus01.mp3',       //A
    FsPlus02       : 'sfx/slot/236/236FsPlus02.mp3',       //A
    FsWild       : 'sfx/slot/236/236FsWild.mp3',       //A
    FsCount       : 'sfx/slot/236/236FsCount.mp3',       //A

    //링크
    LinkReelStop            : 'sfx/slot/236/236LinkReelStop.mp3',       //A
    LsymLocking01            : 'sfx/slot/236/236LsymLocking01.mp3',       //A
    LsymLocking02            : 'sfx/slot/236/236LsymLocking02.mp3',       //A
    LinkMatch01            : 'sfx/slot/236/236LinkMatch01.mp3',       //A
    LinkMatch02            : 'sfx/slot/236/236LinkMatch02.mp3',       //A
    LinkTransform01            : 'sfx/slot/236/236LinkTransform01.mp3',       //A
    LinkTransform02            : 'sfx/slot/236/236LinkTransform02.mp3',       //A
    LinkTransform03            : 'sfx/slot/236/236LinkTransform03.mp3',       //A
    LinkTransform04            : 'sfx/slot/236/236LinkTransform04.mp3',       //A
    LinkSum01            : 'sfx/slot/236/236LinkSum01.mp3',       //A
    LinkSum02            : 'sfx/slot/236/236LinkSum02.mp3',       //A

    LinkUnlock            : 'sfx/slot/236/236LinkUnlock.mp3',       //A
    LinkIntro02            : 'sfx/slot/236/236LinkIntro02.mp3',       //A
};
window.g_sndSlot236 = ResPack.create( 'sndSlot236', sndSlot236 ).concat( g_sfxSlotCommon );

window.sndSlot237 = {
    // intro
    Intro                   : 'sfx/slot/237/237Intro.mp3',
    // bgm
    NormalBgm               : 'sfx/slot/237/237Bgm.mp3',
    MiniGameBgm             : 'sfx/slot/237/237MiniBgm.mp3',
    BoardGameBgm            : 'sfx/slot/237/237BBgm.mp3',
    WheelGameBgm            : 'sfx/slot/237/237WheelBgm.mp3',
    // pay
    MPayCount               : 'sfx/slot/237/237MPayCount.mp3',
    NPayCount01             : 'sfx/slot/237/237NPayCount01.mp3',
    NPayCount02             : 'sfx/slot/237/237NPayCount02.mp3',
    NPayCount03             : 'sfx/slot/237/237NPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/237/237NPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/237/237NPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/237/237NPayCount03End.mp3',
    // Fx
    BonusWinCountUp         : 'sfx/slot/237/237WinpannelCount.mp3',
    // normal
    Spin                    : 'sfx/slot/237/237Spin.mp3',
    ReelStop                : 'sfx/slot/237/237ReelStop.mp3',
    LongSpin                : 'sfx/slot/237/237Longspin.mp3',
    BetUnLock               : 'sfx/slot/237/237Unlock.mp3',
    // boardGame
    BoardGameDiceRoll       : 'sfx/slot/237/237Roll01.mp3',
    BoardGameDiceResult     : 'sfx/slot/237/237Roll02.mp3',
    BoardGameDiceDouble     : 'sfx/slot/237/237Roll03.mp3',
    BoardGameIconMove       : 'sfx/slot/237/237BMove.mp3',
    BoardGameArriveDP       : 'sfx/slot/237/237BMatch01.mp3',
    BoardGameArriveCustom   : 'sfx/slot/237/237BMatch02.mp3',
    BoardGameArriveJP       : 'sfx/slot/237/237BMatch03.mp3',
    BoardGameArriveStart    : 'sfx/slot/237/237BReset.mp3',
    BoardGameMessageHurryUp : 'sfx/slot/237/237BonusHurry.mp3',
    BoardGameWinCount       : 'sfx/slot/237/237BonusCount.mp3',
    // miniGame
    MiniGame1RandomWild     : 'sfx/slot/237/237MiniWild01.mp3',
    MiniGame1MultipleWild   : 'sfx/slot/237/237MiniWild01_02.mp3',
    MiniGame2MultipleWild   : 'sfx/slot/237/237MiniWild02.mp3',
    MiniGame3Start          : 'sfx/slot/237/237MiniSpade.mp3',
    MiniGame3MultipleCount  : 'sfx/slot/237/237MiniMulti01.mp3',
    MiniGame3MultipleCount2 : 'sfx/slot/237/237MiniMulti01_01.mp3',
    MiniGame3MultipleFix    : 'sfx/slot/237/237MiniMulti02.mp3',
    MiniGame3MultipleUp     : 'sfx/slot/237/237MiniMulti03.mp3',
    MiniGame3MultipleTrail  : 'sfx/slot/237/237MiniSpadeTrail.mp3',
    MiniGame4Nudging        : 'sfx/slot/237/237MiniNudge.mp3',
    MiniGame4NudgingLock    : 'sfx/slot/237/237MiniNudge02.mp3',
    MiniGameEnd             : 'sfx/slot/237/237MiniResult.mp3',
    // wheelGame
    WheelGameSpin           : 'sfx/slot/237/237WheelSpin.mp3',
    WheelGameStop           : 'sfx/slot/237/237WheelMatch02.mp3',

    // symbol
    SymbolScatterL0         : 'sfx/slot/237/237SLocking01.mp3',
    SymbolScatterL1         : 'sfx/slot/237/237SLocking02.mp3',
    SymbolScatterL2         : 'sfx/slot/237/237SLocking03.mp3',
    SymbolScatterM          : 'sfx/slot/237/237SMatch.mp3',
    SymbolCollectL          : 'sfx/slot/237/237MiniClocking.mp3',

    // popup
    MajorwinPopup           : 'sfx/slot/237/237MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/237/237JackpotPopup.mp3',
    ResultPopup             : 'sfx/slot/237/237Bresult.mp3',
    BoardGameIntroPopup     : 'sfx/slot/237/237BIntro.mp3',
    WheelGameIntroPopup     : 'sfx/slot/237/237WheelIntro.mp3',
    MiniGameIntroPopup      : 'sfx/slot/237/237MiniIntro.mp3',

    // miniGame Voice
    MiniGameIntroVoice0     : 'sfx/slot/237/237MiniVoice01.mp3',
    MiniGameIntroVoice1     : 'sfx/slot/237/237MiniVoice02.mp3',
    MiniGameIntroVoice2     : 'sfx/slot/237/237MiniVoice03.mp3',
    MiniGameIntroVoice3     : 'sfx/slot/237/237MiniVoice04.mp3',

    // jackpot Voice
    JackpotVoice0           : 'sfx/slot/237/237JVoice01.mp3',
    JackpotVoice1           : 'sfx/slot/237/237JVoice02.mp3',
    JackpotVoice2           : 'sfx/slot/237/237JVoice03.mp3',
    JackpotVoice3           : 'sfx/slot/237/237JVoice04.mp3',
    JackpotVoice4           : 'sfx/slot/237/237JVoice05.mp3'

};
window.g_sndSlot237 = ResPack.create( 'sndSlot237', sndSlot237 ).concat( g_sfxSlotCommon );

window.sndSlot238 = {
    // intro
    Intro               : 'sfx/slot/238/238Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/238/238Bgm.mp3',
    MiniBgm             : 'sfx/slot/238/238MiniBgm.mp3',
    PotBgm              : 'sfx/slot/238/238PotBgm.mp3',
    RespinBgm           : 'sfx/slot/238/238ReBgm.mp3',

    // normal
    Spin                : 'sfx/slot/238/238Spin.mp3',
    ReelStop            : 'sfx/slot/238/238ReelStop.mp3',
    LongSpin            : 'sfx/slot/238/238LongSpin.mp3',

    // pay
    MPayCount           : 'sfx/slot/238/238MPayCount.mp3',
    NPayCount01         : 'sfx/slot/238/238NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/238/238NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/238/238NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/238/238NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/238/238NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/238/238NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/238/238MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/238/238JackpotPopup.mp3',

    Unlock              : 'sfx/slot/238/238Unlock.mp3',
    BetChange           : 'sfx/slot/238/238BetChange.mp3',

    // pot
    PotSymbols          : 'sfx/slot/238/238PotSymbols.mp3',
    PotMiniMatch        : 'sfx/slot/238/238PotMMatch.mp3',
    PotTrail            : 'sfx/slot/238/238PotTrail.mp3',
    PotPre              : 'sfx/slot/238/238PotPre.mp3',
    PotOpen             : 'sfx/slot/238/238PotOpen.mp3',
    PotGauge            : 'sfx/slot/238/238PotGuage.mp3',
    RespinShake         : 'sfx/slot/238/238RespinShake.mp3',
    ExtraJackpotLock    : 'sfx/slot/238/238ExtraJackpotLock.mp3',
    ExtraDirectpayLock  : 'sfx/slot/238/238ExtraDirectpayLock.mp3',
    ExtraMiniGameLock   : 'sfx/slot/238/238ExtraMinigameLock.mp3',
    ExtraSymPay         : 'sfx/slot/238/238ExtraSymPay.mp3',
    MiniMatch           : 'sfx/slot/238/238MMatch.mp3',
    BonusWinPanelOn     : 'sfx/slot/238/238PannelOn.mp3',
    BonusWinPanelSum    : 'sfx/slot/238/238PannelSum.mp3',
    BonusWinPanelOff    : 'sfx/slot/238/238PannelOff.mp3',
    TipOver             : 'sfx/slot/238/238TipOver.mp3',

    MiniIntro           : 'sfx/slot/238/238MiniIntro.mp3',

    LinkSpin            : 'sfx/slot/238/238LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/238/238LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/238/238LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/238/238LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/238/238LsymLocking02.mp3',
    LinkTrans01         : 'sfx/slot/238/238Transform01.mp3',
    LinkTrans02         : 'sfx/slot/238/238Transform02.mp3',
    LinkTrans03         : 'sfx/slot/238/238Transform03.mp3',
    LinkTrans04         : 'sfx/slot/238/238Transform04.mp3',
    LinkSum             : 'sfx/slot/238/238LinkSum.mp3',
    MiniWild01          : 'sfx/slot/238/238MiniWild01.mp3',
    MiniWild02          : 'sfx/slot/238/238MiniWild02.mp3',
    MiniZone01          : 'sfx/slot/238/238MiniZone01.mp3',
    MiniZone01_01          : 'sfx/slot/238/238MiniZone01_01.mp3',
    MiniZone02          : 'sfx/slot/238/238MiniZone02.mp3',

    PotIntro            : 'sfx/slot/238/238PotIntro.mp3',
    SuperPotIntro       : 'sfx/slot/238/238SuperPotIntro.mp3',
    PotUnlock           : 'sfx/slot/238/238PotUnlock.mp3',
    PotShuffle          : 'sfx/slot/238/238PotShuffle.mp3',
    PotCookie01         : 'sfx/slot/238/238PotCookie01.mp3',
    PotCookie02         : 'sfx/slot/238/238PotCookie02.mp3',
    PotCookie03         : 'sfx/slot/238/238PotCookie03.mp3',
    PotMatch01          : 'sfx/slot/238/238PotMatch01.mp3',
    PotMatch02          : 'sfx/slot/238/238PotMatch02.mp3',
    PotMatch03          : 'sfx/slot/238/238PotMatch03.mp3',
    PotResult           : 'sfx/slot/238/238PotResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/238/238JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/238/238JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/238/238JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/238/238JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/238/238JVoice05.mp3',

    PotVoice01          : 'sfx/slot/238/238PVoice01.mp3',
    PotVoice02          : 'sfx/slot/238/238PVoice02.mp3',
    PotVoice03          : 'sfx/slot/238/238PVoice03.mp3',
    PotVoice04          : 'sfx/slot/238/238PVoice04.mp3',
    PotVoice05          : 'sfx/slot/238/238PVoice05.mp3',
    PotVoice06          : 'sfx/slot/238/238PVoice06.mp3',

    MiniVoice01         : 'sfx/slot/238/238MiniVoice01.mp3',
    MiniVoice02         : 'sfx/slot/238/238MiniVoice02.mp3',
    MiniVoice03         : 'sfx/slot/238/238MiniVoice03.mp3',
    MiniVoice04         : 'sfx/slot/238/238MiniVoice04.mp3',

    SymVoice01          : 'sfx/slot/238/238SymVoice01.mp3',
    SymVoice02          : 'sfx/slot/238/238SymVoice02.mp3',
    SymVoice03          : 'sfx/slot/238/238SymVoice03.mp3',
};
window.g_sndSlot238 = ResPack.create( 'sndSlot238', sndSlot238 ).concat( g_sfxSlotCommon );

window.sndKeno231 = {
    // pot
    //PotStepUp           : 'sfx/slot/224/224PotPre.mp3',
    //PotOpen             : 'sfx/slot/keno/kenoFpOpen.mp3',

    // Numbers
    BtnNumberScatterHit : 'sfx/slot/keno/kenoClWin.mp3',
    ScatterMatch        : 'sfx/slot/keno/kenoCLSmatch.mp3',

    // poopup
    FreeIntroPopup      : 'sfx/slot/keno/kenoCLFsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/keno/kenoCLFsResult.mp3',
    CustomMajorWinPopup : 'sfx/slot/keno/kenoCLMPopup.mp3',

    //
    TotalpayMultiply    : 'sfx/slot/keno/kenoCLMulti.mp3',

    // trail
    //ScatterTrail        : 'sfx/slot/keno/kenoFpTrail.mp3',

    // custom
    FreeChiliHit0        : 'sfx/slot/keno/kenoCLRCwin.mp3',//red
    FreeChiliMatch0      : 'sfx/slot/keno/kenoCLRCmatch.mp3',
    FreeChiliHit1        : 'sfx/slot/keno/kenoCLGCwin.mp3',//green
    FreeChiliMatch1      : 'sfx/slot/keno/kenoCLGCmatch.mp3',
};
window.g_sndKeno231 = ResPack.create( 'sndKeno231', sndKeno231 ).concat( g_sndKenoCommon );

window.sndKeno245 = {
    TotalpayMultiply    : 'sfx/slot/keno/KenoMegaMulti.mp3'
};
window.g_sndKeno245 = ResPack.create( 'sndKeno245', sndKeno245 ).concat( g_sndKenoCommon );

window.sndKeno246 = {
    ScatterMatch        : 'sfx/slot/keno/kenoSKBonus02.mp3',
    ExtraMatch          : 'sfx/slot/keno/kenoSKBonus03.mp3',
    MultipleMatch       : 'sfx/slot/keno/kenoSKBonus04.mp3',
    FreespinIntro       : 'sfx/slot/keno/kenoSKFsIntro.mp3',
    FreespinResult      : 'sfx/slot/keno/kenoSKFsResult.mp3',
    MatchOn1            : 'sfx/slot/keno/kenoSKmatch01.mp3',
    MatchOn2            : 'sfx/slot/keno/kenoSKmatch02.mp3'
};
window.g_sndKeno246 = ResPack.create( 'sndKeno246', sndKeno246 ).concat( g_sndKenoCommon );

//-- ↑↑↑ Catch and Win Bonanza BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot239 = {
    // INTRO
    Intro               : 'sfx/slot/239/239Intro.mp3',

    // BGM
    NormalBgm           : 'sfx/slot/239/239Bgm.mp3',
    BoardGameBgm        : 'sfx/slot/239/239BBgm.mp3',
    FreespinBgm         : 'sfx/slot/239/239FsBgm.mp3',

    // PAY
    Spin                : 'sfx/slot/239/239Spin.mp3',
    ReelStop            : 'sfx/slot/239/239ReelStop.mp3',
    MPayCount           : 'sfx/slot/239/239MPayCount.mp3',
    NPayCount01         : 'sfx/slot/239/239NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/239/239NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/239/239NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/239/239NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/239/239NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/239/239NPayCount03End.mp3',
    MajorwinPopup       : 'sfx/slot/239/239MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/239/239JackpotPopup.mp3',

    // Normal
    BonusLock1          : 'sfx/slot/239/239SLocking01.mp3',
    BonusLock2          : 'sfx/slot/239/239SLocking02.mp3',
    BonusLock3          : 'sfx/slot/239/239SLocking03.mp3',
    JackpotLock         : 'sfx/slot/239/239JLocking.mp3',
    DPLock              : 'sfx/slot/239/239DLocking.mp3',
    Trail               : 'sfx/slot/239/239Trail.mp3',
    Multi1              : 'sfx/slot/239/239Multi01.mp3',
    Multi2              : 'sfx/slot/239/239Multi02.mp3',
    Longspin            : 'sfx/slot/239/239Longspin.mp3',
    Bonus_Match         : 'sfx/slot/239/239SMatch.mp3',
    Unlock              : 'sfx/slot/239/239Unlock.mp3',

    // Board Game
    BG_Open             : 'sfx/slot/239/239BOpen.mp3',
    BG_OpenClick        : 'sfx/slot/239/239BOpen_02.mp3',
    BG_DiceResult       : 'sfx/slot/239/239Roll01.mp3',
    BG_DoubleDice       : 'sfx/slot/239/239Roll02.mp3',
    BG_RoolTheDice      : 'sfx/slot/239/239Roll03.mp3',
    BG_MoveIcon         : 'sfx/slot/239/239BMove.mp3',
    BG_DP               : 'sfx/slot/239/239BMatch01.mp3',
    BG_Mystery          : 'sfx/slot/239/239BMatch02.mp3',
    BG_JP               : 'sfx/slot/239/239BMatch03.mp3',
    BG_Bomb             : 'sfx/slot/239/239BMatch04.mp3',
    BG_Collect          : 'sfx/slot/239/239BFsCount01.mp3',
    BG_Collect2         : 'sfx/slot/239/239BFsCount02.mp3',
    BG_ArriveStart      : 'sfx/slot/239/239Reset01.mp3',
    BG_ResetBoard       : 'sfx/slot/239/239Reset02.mp3',
    BG_PotClear         : 'sfx/slot/239/239Portbreak01.mp3',
    BG_PotReset         : 'sfx/slot/239/239Portbreak02.mp3',
    BG_TrailPotToWin    : 'sfx/slot/239/239BonusSum01.mp3',
    BG_BonusJackpot     : 'sfx/slot/239/239BonusSum02.mp3',
    BG_HurryUpTooltip   : 'sfx/slot/239/239BonusHurry.mp3',
    BG_WinCounting      : 'sfx/slot/239/239BonusCount.mp3',

    // Free Spin
    FG_Intro            : 'sfx/slot/239/239FsIntro.mp3',
    FG_Retrigger        : 'sfx/slot/239/239Retrigger.mp3',
    FG_Trail1           : 'sfx/slot/239/239Fstrail01.mp3',
    FG_Trail2           : 'sfx/slot/239/239Fstrail02.mp3',
    FG_IntroSpin        : 'sfx/slot/239/239FsEffect.mp3',
    FG_IconOn           : 'sfx/slot/239/239FsSymbol.mp3',
    FG_Result           : 'sfx/slot/239/239FsResult.mp3',
    FG_CountUp          : 'sfx/slot/239/239FsAddSpin.mp3',

    // Voice
    JackpotVoice1      : 'sfx/slot/239/239JVoice01.mp3',
    JackpotVoice2      : 'sfx/slot/239/239JVoice02.mp3',
    JackpotVoice3      : 'sfx/slot/239/239JVoice03.mp3',
    JackpotVoice4      : 'sfx/slot/239/239JVoice04.mp3',
    JackpotVoice5      : 'sfx/slot/239/239JVoice05.mp3'
};
window.g_sndSlot239 = ResPack.create( 'sndSlot239', sndSlot239 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot240 = {
    // intro
    Intro               : 'sfx/slot/240/240Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/240/240Bgm.mp3',
    FreeBgm             : 'sfx/slot/240/240FsBgm.mp3',
    LinkBgm            : "sfx/slot/240/240LinkBgm.mp3",
    PickBgm            : "sfx/slot/240/240PBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/240/240Spin.mp3',
    ReelStop            : 'sfx/slot/240/240ReelStop.mp3',
    //LongSpin            : 'sfx/slot/240/240LongSpin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/240/240LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/240/240LinkReelStop.mp3',
    //LinkLongSpin        : 'sfx/slot/240/240LinkLongspin.mp3',

    // ui
    SpinCountUIOpen     : 'sfx/slot/240/240LinkNoti.mp3',
    SpinCountUIReset    : 'sfx/slot/240/240LinkReset.mp3',
    FreespinTotalWin    : 'sfx/slot/240/240FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/240/240MPayCount.mp3',
    NPayCount01         : 'sfx/slot/240/240NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/240/240NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/240/240NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/240/240NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/240/240NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/240/240NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/240/240JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/240/240JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/240/240JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/240/240JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/240/240JVoice05.mp3',


    MajorwinPopup       : 'sfx/slot/240/240MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/240/240JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/240/240FsIntro.mp3',
    FreeIntroSuperPopup : 'sfx/slot/240/240SuperFsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/240/240FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/240/240LinkIntro.mp3',
    LinkIntroSuperPopup : 'sfx/slot/240/240SuperLinkIntro.mp3',
    LinkResultPopup     : 'sfx/slot/240/240LinkResult.mp3',
    PickIntroPopup      : 'sfx/slot/240/240PickIntro.mp3',
    PickIntroSuperPopup : 'sfx/slot/240/240SuperPickIntro.mp3',
    PickResultPopup     : 'sfx/slot/240/240PickResult.mp3',
    // betting
    BetLimitOver        : 'sfx/slot/240/240Unlock.mp3',

    // Trail
    TrailToBonusWin      : "sfx/slot/240/240LinkSum.mp3",


    // pot
    PotTrail           : 'sfx/slot/240/240PotTrail.mp3',
    //PotPre             : 'sfx/slot/240/240PotPre.mp3',
    PotOpen            : 'sfx/slot/240/240PotOpen.mp3',
    PotGauge            : "sfx/slot/240/240PotGauge01.mp3",
    PotLastGauge        : "sfx/slot/240/240PotGauge02.mp3",

    //fx
    FreeCoinMove        : "sfx/slot/240/240FsFall.mp3",
    FreeFilpDP        : "sfx/slot/240/240FsFlip01.mp3",
    FreeFilpJP        : "sfx/slot/240/240FsFlip02.mp3",
    FreeFilpDoubleDP        : "sfx/slot/240/240FsFlip03.mp3",
    FreeFilpDoubleJP       : "sfx/slot/240/240FsFlip04.mp3",
    FreeFilpWait       : "sfx/slot/240/240PreFlip.mp3",

    LinkReelBackFxOn        : "sfx/slot/240/240LinkFrame.mp3",
    LinkReelBackFxRandom        : "sfx/slot/240/240LinkFrSelect01.mp3",
    LinkReelBackFxFix        : "sfx/slot/240/240LinkFrSelect02.mp3",
    LinkReelCount        : "sfx/slot/240/240LinkWheelCount.mp3",
    LinkWheelSpinOpen       : "sfx/slot/240/240LinkUpperSpin.mp3",
    //LinkWheelSpinNotiOpen       : "sfx/slot/240/240LinkNoti.mp3",
    LinkWheelSpin        : "sfx/slot/240/240LinkWheelSpin.mp3",
    LinkWheelSpinPannel       : "sfx/slot/240/240LinkWheelSpin02.mp3",
    LinkWheelSpinLoop        : "sfx/slot/240/240LinkWheelSpin01.mp3",
    //LinkWheelSpinEnd        : "sfx/slot/240/240LinkWheelSpinEnd.mp3",
    LinkWheelMatch        : "sfx/slot/240/240LinkMatch.mp3",

    //LinkTrailSum        : "sfx/slot/240/240LinkSum.mp3",

    PickDP        : "sfx/slot/240/240Pick01.mp3",
    PickJP        : "sfx/slot/240/240Pick02.mp3",
    PickDoubleDP        : "sfx/slot/240/240Pick03.mp3",
    PickDoubleJP        : "sfx/slot/240/240Pick04.mp3",
    PickAdd        : "sfx/slot/240/240Pick05.mp3",
    PickJPPoint        : "sfx/slot/240/240PickGauge01.mp3",
    PickJPPointMultiple        : "sfx/slot/240/240PickGauge02.mp3",


    // symbol

    // symbol locking
    SymbolLockingDP  : 'sfx/slot/240/240LsymLocking01.mp3',
    SymbolLockingJP  : 'sfx/slot/240/240LsymLocking02.mp3',
    SymbolLockingDouble  : 'sfx/slot/240/240LsymLocking03.mp3',
    SymbolLockingDoubleJP  : 'sfx/slot/240/240LsymLocking04.mp3',

    // SymbolLockingScatter0  : 'sfx/slot/240/240SLocking01.mp3',
    // SymbolLockingScatter1  : 'sfx/slot/240/240SLocking02.mp3',
    // SymbolLockingScatter2  : 'sfx/slot/240/240SLocking03.mp3',


    //match
    //ScatterMatch         : 'sfx/slot/240/240SMatch.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/240/240TipOver.mp3",

    //noti


};
window.g_sndSlot240 = ResPack.create( 'sndSlot240', sndSlot240 ).concat( g_sfxSlotCommon );

window.sndSlot241 = {

    // Intro and BGM
    Intro               : 'sfx/slot/241/241Intro.mp3',
    NormalBgm                 : 'sfx/slot/241/241Bgm.mp3',
    FreeBgm               : 'sfx/slot/241/241FsBgm.mp3',
    LinkBgm             : 'sfx/slot/241/241LinkBgm.mp3',
    PickBgm             : 'sfx/slot/241/241PickBgm.mp3',

    // Spin and Reel
    Spin                : 'sfx/slot/241/241Spin.mp3',
    ReelStop            : 'sfx/slot/241/241ReelStop.mp3',
    LongSpin            : 'sfx/slot/241/241LongSpin.mp3',

    // Pay Counts
    MPayCount           : 'sfx/slot/241/241MPayCount.mp3',
    NPayCount01         : 'sfx/slot/241/241NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/241/241NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/241/241NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/241/241NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/241/241NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/241/241NPayCount03End.mp3',

    // Popups
    MajorPopup          : 'sfx/slot/241/241MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/241/241JackpotPopup.mp3',

    // Scatter Locking
    Socking01           : 'sfx/slot/241/241Socking01.mp3',
    Socking02           : 'sfx/slot/241/241Socking02.mp3',
    Socking03           : 'sfx/slot/241/241Socking03.mp3',
    Socking04           : 'sfx/slot/241/241Socking04.mp3',
    Socking05           : 'sfx/slot/241/241Socking05.mp3',

    // Transform Effects
    Transfomr01         : 'sfx/slot/241/241Transfomr01.mp3',
    Transfomr02         : 'sfx/slot/241/241Transfomr02.mp3',

    // Trail and Pot
    Trail               : 'sfx/slot/241/241Trail.mp3',
    PotPre              : 'sfx/slot/241/241PotPre.mp3',
    PotOpen             : 'sfx/slot/241/241PotOpen.mp3',

    // Match and Unlock
    LinkMatch             : 'sfx/slot/241/241SSMatch.mp3',
    Unlock              : 'sfx/slot/241/241Unlock.mp3',

    // Free Spin
    FsIntro             : 'sfx/slot/241/241FsIntro.mp3',
    FsInfo              : 'sfx/slot/241/241FsInfo.mp3',
    FsCount             : 'sfx/slot/241/241FsCount.mp3',
    FsResult            : 'sfx/slot/241/241FsResult.mp3',

    // Link Spin
    LinkIntro           : 'sfx/slot/241/241LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/241/241LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/241/241LinkReelStop.mp3',
    LsymLocking01       : 'sfx/slot/241/241LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/241/241LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/241/241LsymLocking03.mp3',
    LinkTrail           : 'sfx/slot/241/241LinkTrail.mp3',
    LinkMatch01         : 'sfx/slot/241/241LinkMatch01.mp3',
    LinkMatch02         : 'sfx/slot/241/241LinkMatch02.mp3',
    LinkMatch03         : 'sfx/slot/241/241LinkMatch03.mp3',

    // Pick Game
    PickOpen            : 'sfx/slot/241/241PickOpen.mp3',
    Pick01              : 'sfx/slot/241/241Pick01.mp3',
    Pick02              : 'sfx/slot/241/241Pick02.mp3',
    PickMatch           : 'sfx/slot/241/241PickMatch.mp3',

    // Jackpot Pick
    JPick01             : 'sfx/slot/241/241JPick01.mp3',
    JPick02             : 'sfx/slot/241/241JPick02.mp3',
    JPick03             : 'sfx/slot/241/241JPick03.mp3',
    JPick04             : 'sfx/slot/241/241JPick04.mp3',
    JPick05             : 'sfx/slot/241/241JPick05.mp3',

    // Jackpot Voices
    JVoice01            : 'sfx/slot/241/241JVoice01.mp3',
    JVoice02            : 'sfx/slot/241/241JVoice02.mp3',
    JVoice03            : 'sfx/slot/241/241JVoice03.mp3',
    JVoice04            : 'sfx/slot/241/241JVoice04.mp3',
    JVoice05            : 'sfx/slot/241/241JVoice05.mp3',

    Blossom            : 'sfx/slot/241/241Blossom.mp3',

    Pvoice01            : 'sfx/slot/241/241Pvoice01.mp3',
    Pvoice02            : 'sfx/slot/241/241Pvoice02.mp3',

    JackpotMatch            : 'sfx/slot/241/241JackpotMatch.mp3',
    LinkLongSpinFx      : 'sfx/slot/241/241LinkLongSpin.mp3',
};
window.g_sndSlot241 = ResPack.create( 'sndSlot241', sndSlot241 ).concat( g_sfxSlotCommon );

window.sndSlot242 = {
    // intro
    Intro               : 'sfx/slot/242/242Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/242/242Bgm.mp3',
    FsBgm               : 'sfx/slot/242/242FsBgm.mp3',
    LinkBgm             : 'sfx/slot/242/242LinkBgm.mp3',

    // pay
    MPayCount           : 'sfx/slot/242/242MPayCount.mp3',
    NPayCount01         : 'sfx/slot/242/242NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/242/242NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/242/242NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/242/242NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/242/242NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/242/242NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/242/242MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/242/242JackpotPopup.mp3',

    // normal
    FsShake             : 'sfx/slot/242/242FsShake.mp3',
    Spin                : 'sfx/slot/242/242Spin.mp3',
    ReelStop            : 'sfx/slot/242/242ReelStop.mp3',

    Socking01           : 'sfx/slot/242/242Socking01.mp3',
    Socking02           : 'sfx/slot/242/242Socking02.mp3',
    Socking03           : 'sfx/slot/242/242Socking03.mp3',
    Socking04           : 'sfx/slot/242/242Socking04.mp3',
    Socking05           : 'sfx/slot/242/242Socking05.mp3',
    Socking06           : 'sfx/slot/242/242Socking06.mp3',
    PotTrail            : 'sfx/slot/242/242PotTrail.mp3',
    PotPre              : 'sfx/slot/242/242PotPre.mp3',
    PotOpen             : 'sfx/slot/242/242PotOpen.mp3',
    Wild01              : 'sfx/slot/242/242Wild01.mp3',
    Wild02              : 'sfx/slot/242/242Wild02.mp3',
    Wild03              : 'sfx/slot/242/242Wild03.mp3',
    LongSpin            : 'sfx/slot/242/242LongSpin.mp3',
    SMatch              : 'sfx/slot/242/242SMatch.mp3',
    Unlock              : 'sfx/slot/242/242Unlock.mp3',

    // free
    FsIntro             : 'sfx/slot/242/242FsIntro.mp3',
    FsStampede          : 'sfx/slot/242/242FsStampede.mp3',
    FsCount             : 'sfx/slot/242/242FsCount.mp3',
    FsResult            : 'sfx/slot/242/242FsResult.mp3',

    // link
    LinkIntro           : 'sfx/slot/242/242LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/242/242LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/242/242LinkReelStop.mp3',
    LsymLocking01       : 'sfx/slot/242/242LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/242/242LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/242/242LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/242/242LsymLocking04.mp3',
    Upgrade             : 'sfx/slot/242/242Upgrade.mp3',
    LinkRodeo           : 'sfx/slot/242/242LinkRodeo.mp3',
    JackpotMatch        : 'sfx/slot/242/242JackpotMatch.mp3',
    LinkTrail           : 'sfx/slot/242/242LinkTrail.mp3',
    LinkSum             : 'sfx/slot/242/242LinkSum.mp3',
    LinkResult          : 'sfx/slot/242/242LinkResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/242/242JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/242/242JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/242/242JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/242/242JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/242/242JVoice05.mp3',
};
window.g_sndSlot242 = ResPack.create( 'sndSlot242', sndSlot242 ).concat( g_sfxSlotCommon );

window.sndSlot243 = {
    // intro
    Intro                   : 'sfx/slot/243/243Intro.mp3',
    // bgm
    NormalBgm               : 'sfx/slot/243/243Bgm.mp3',
    FreeBgm                 : 'sfx/slot/243/243FsBgm.mp3',
    LinkBgm                 : 'sfx/slot/243/243LinkBgm.mp3',
    PickGameBgm             : 'sfx/slot/243/243PBgm.mp3',

    // pay
    MPayCount               : 'sfx/slot/243/243MPayCount.mp3',
    NPayCount01             : 'sfx/slot/243/243NPayCount01.mp3',
    NPayCount02             : 'sfx/slot/243/243NPayCount02.mp3',
    NPayCount03             : 'sfx/slot/243/243NPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/243/243NPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/243/243NPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/243/243NPayCount03End.mp3',

    // Fx
    // normal
    Spin                    : 'sfx/slot/243/243Spin.mp3',
    ReelStop                : 'sfx/slot/243/243ReelStop.mp3',
    BetUnLock               : 'sfx/slot/243/243Unlock.mp3',
    PotTrail                : 'sfx/slot/243/243PotTrail.mp3',
    PotOpen                 : 'sfx/slot/243/243PotOpen.mp3',
    PotStepUp               : 'sfx/slot/243/243PotPre.mp3',
    // free
    IntroFx                 : 'sfx/slot/243/243FsFrame.mp3',
    TotalWinCount           : 'sfx/slot/243/243FsCount.mp3',
    // link
    LinkSpin                : 'sfx/slot/243/243LinkSpin.mp3',
    LinkReelStop            : 'sfx/slot/243/243LinkReelStop.mp3',
    LinkSpinReset           : 'sfx/slot/243/243LinkReset.mp3',
    LinkSpinStartSymbol     : 'sfx/slot/243/243LinkNoti01.mp3',
    LinkSpinLockNodeOpen    : 'sfx/slot/243/243LinkNoti02.mp3',
    LinkSpinLockNodeAddPoint: 'sfx/slot/243/243LinkUnlock01.mp3',
    LinkSpinLockNodeUnLock  : 'sfx/slot/243/243LinkUnlock02.mp3',

    // pickgame
    PickGamePick            :'sfx/slot/243/243Pick01.mp3',

    // symbol
    SymbolDPLocking         : 'sfx/slot/243/243LsymLocking01.mp3',
    SymbolJPLocking         : 'sfx/slot/243/243LsymLocking02.mp3',
    SymbolDPTrail           : 'sfx/slot/243/243LinkSum01.mp3',
    SymbolJPTrail           : 'sfx/slot/243/243LinkSum02.mp3',

    // popup
    MajorwinPopup           : 'sfx/slot/243/243MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/243/243JackpotPopup.mp3',
    FreeResultPopup         : 'sfx/slot/243/243FsResult.mp3',
    LinkResultPopup         : 'sfx/slot/243/243LinkResult.mp3',
    FreeIntroPopup          : 'sfx/slot/243/243FsIntro.mp3',
    LinkIntroPopup          : 'sfx/slot/243/243LinkIntro.mp3',
    PickGameIntroPopup      : 'sfx/slot/243/243PickIntro.mp3',

    // jackpot Voice
    JackpotVoice0           : 'sfx/slot/243/243JVoice02.mp3',
    JackpotVoice1           : 'sfx/slot/243/243JVoice03.mp3',
    JackpotVoice2           : 'sfx/slot/243/243JVoice04.mp3',
    JackpotVoice3           : 'sfx/slot/243/243JVoice05.mp3'

};
window.g_sndSlot243 = ResPack.create( 'sndSlot243', sndSlot243 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ The Great Foxby BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot244 = {

    // Intro and BGM
    Intro               : 'sfx/slot/244/244Intro.mp3',
    NormalBgm           : 'sfx/slot/244/244Bgm.mp3',
    FreeBgm             : 'sfx/slot/244/244FsBgm.mp3',

    // Spin and Reel
    Spin                : 'sfx/slot/244/244Spin.mp3',
    ReelStop            : 'sfx/slot/244/244ReelStop.mp3',

    // Pay Counts
    MPayCount           : 'sfx/slot/244/244MPayCount.mp3',
    NPayCount01         : 'sfx/slot/244/244NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/244/244NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/244/244NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/244/244NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/244/244NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/244/244NPayCount03End.mp3',

    // Popups
    MajorPopup          : 'sfx/slot/244/244MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/244/244JackpotPopup.mp3',

    // Scatter Locking
    Socking01           : 'sfx/slot/244/244Socking01.mp3',
    Socking02           : 'sfx/slot/244/244Socking02.mp3',
    Socking03           : 'sfx/slot/244/244Socking03.mp3',

    // Locking and Matching
    JLocking01          : 'sfx/slot/244/244JLocking01.mp3',
    JLocking02          : 'sfx/slot/244/244JLocking02.mp3',
    Remove              : 'sfx/slot/244/244Match.mp3',
    JackpotMatch        : 'sfx/slot/244/244JMatch.mp3',
    JackpotMatch02      : 'sfx/slot/244/244JMatch02.mp3',
    BLocking            : 'sfx/slot/244/244BLocking.mp3',
    BMatch01            : 'sfx/slot/244/244BMatch01.mp3',
    BMatch02            : 'sfx/slot/244/244BMatch02.mp3',// dp오픈시
    BMatch03            : 'sfx/slot/244/244BMatch03.mp3',//잭팟 오픈시
    BMatch04            : 'sfx/slot/244/244BMatch04.mp3',//프리스핀 등장
    BMatch05            : 'sfx/slot/244/244BMatch05.mp3',
    TMatch05            : 'sfx/slot/244/244TitleMatch.mp3',
    SMatch              : 'sfx/slot/244/244SMatch.mp3',
    Unlock              : 'sfx/slot/244/244Unlock.mp3',

    // Free Spin
    FsIntro             : 'sfx/slot/244/244FsIntro.mp3',
    FsResult            : 'sfx/slot/244/244FsResult.mp3',
    FsChange            : 'sfx/slot/244/244FsFrame.mp3',
    FsRetrigger         : 'sfx/slot/244/244FsRetrigger.mp3',

    // Jackpot Voices
    JVoice01            : 'sfx/slot/244/244JVoice01.mp3',
    JVoice02            : 'sfx/slot/244/244JVoice02.mp3',
    JVoice03            : 'sfx/slot/244/244JVoice03.mp3',
    JVoice04            : 'sfx/slot/244/244JVoice04.mp3',
    JVoice05            : 'sfx/slot/244/244JVoice05.mp3',
    JVoice06            : 'sfx/slot/244/244JVoice06.mp3'
};

window.g_sndSlot244 = ResPack.create('sndSlot244', sndSlot244).concat(g_sfxSlotCommon);

window.sndSlot247 = {
// intro
    Intro               : 'sfx/slot/247/247Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/247/247Bgm.mp3',
    FreeBgm             : 'sfx/slot/247/247FsBgm.mp3',
    LinkBgm             : 'sfx/slot/247/247LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/247/247Spin.mp3',
    ReelStop            : 'sfx/slot/247/247ReelStop.mp3',
    LongSpin            : 'sfx/slot/247/247LongSpin.mp3',

    // pay
    MPayCount           : 'sfx/slot/247/247MPayCount.mp3',
    NPayCount01         : 'sfx/slot/247/247NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/247/247NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/247/247NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/247/247NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/247/247NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/247/247PayCount03End.mp3',

    // betting
    Unlock        : 'sfx/slot/247/247Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/247/247LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/247/247LinkReelStop.mp3',
    LinkLongSpin      : 'sfx/slot/247/247LinkLongspin.mp3',

    // popup
    MajorPopup          : 'sfx/slot/247/247MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/247/247JackpotPopup.mp3',
    FsIntro  : 'sfx/slot/247/247FsIntro.mp3',
    FsResult : 'sfx/slot/247/247FsResult.mp3',
    LinkIntro  : 'sfx/slot/247/247LinkIntro.mp3',
    LinkResult : 'sfx/slot/247/247LinkResult.mp3',

    // symbol
    SLocking0           : 'sfx/slot/247/247Slocking01.mp3',
    SLocking1           : 'sfx/slot/247/247Slocking02.mp3',
    SLocking2           : 'sfx/slot/247/247Slocking03.mp3',
    SLocking3           : 'sfx/slot/247/247Slocking04.mp3',
    SLocking4           : 'sfx/slot/247/247Slocking05.mp3',
    ScatterMatch        : 'sfx/slot/247/247SMatch.mp3',
    LinkMatch           : 'sfx/slot/247/247LMatch.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/247/247JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/247/247JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/247/247JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/247/247JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/247/247JVoice05.mp3',

    // Additional new sounds
    DLocking            : 'sfx/slot/247/247DLocking.mp3',
    JLocking            : 'sfx/slot/247/247JLocking.mp3',
    Mystery01           : 'sfx/slot/247/247Mystery01.mp3',
    Mystery02           : 'sfx/slot/247/247Mystery02.mp3',
    Mystery03           : 'sfx/slot/247/247Mystery03.mp3',
    Mystery04           : 'sfx/slot/247/247Mystery04.mp3',
    Mystery05           : 'sfx/slot/247/247Mystery05.mp3',
    Mystery06           : 'sfx/slot/247/247Mystery06.mp3',
    LinkReset           : 'sfx/slot/247/247LinkReset.mp3',
    LinkNoti01          : 'sfx/slot/247/247LinkNoti01.mp3',
    LinkNoti02          : 'sfx/slot/247/247LinkNoti02.mp3',
    LsymLocking01       : 'sfx/slot/247/247LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/247/247LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/247/247LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/247/247LsymLocking04.mp3',
    LinkFrame           : 'sfx/slot/247/247LinkFrame.mp3',
    LinkBox01           : 'sfx/slot/247/247LinkBox01.mp3',
    LinkBox02           : 'sfx/slot/247/247LinkBox02.mp3',
    LinkSum01           : 'sfx/slot/247/247LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/247/247LinkSum02.mp3',
    FsFrame             : 'sfx/slot/247/247FsFrame.mp3',
    FsTrail             : 'sfx/slot/247/247FsTrail.mp3',
    FsCount             : 'sfx/slot/247/247FsCount.mp3'
};
window.g_sndSlot247 = ResPack.create( 'sndSlot247', sndSlot247 ).concat( g_sfxSlotCommon );

//region -- ↓↓↓ DrakeAndCake ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot248 = {
    // intro
    Intro               : 'sfx/slot/248/248Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/248/248Bgm.mp3',
    FreeBgm             : 'sfx/slot/248/248FsBgm.mp3',
    LinkBgm            : "sfx/slot/248/248LinkBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/248/248Spin.mp3',
    ReelStop            : 'sfx/slot/248/248ReelStop.mp3',
    LongSpin            : 'sfx/slot/248/248LongSpin.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/248/248LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/248/248LinkReelStop.mp3',
    //LinkLongSpin        : 'sfx/slot/248/248LinkLongspin.mp3',

    // ui
    //SpinCountUIOpen     : 'sfx/slot/248/248LinkNoti.mp3',
    //SpinCountUIReset    : 'sfx/slot/248/248LinkReset.mp3',
    FreespinTotalWin    : 'sfx/slot/248/248FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/248/248MPayCount.mp3',
    NPayCount01         : 'sfx/slot/248/248NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/248/248NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/248/248NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/248/248NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/248/248NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/248/248NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/248/248JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/248/248JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/248/248JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/248/248JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/248/248JVoice05.mp3',

    MajorwinPopup       : 'sfx/slot/248/248MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/248/248JackpotPopup.mp3',
    JackpotPopupMultiple: 'sfx/slot/248/248JackpotBoost.mp3',
    FreeIntroPopup      : 'sfx/slot/248/248FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/248/248FsResult.mp3',
    LinkIntroPopup      : 'sfx/slot/248/248LinkIntro.mp3',
    LinkResultPopup     : 'sfx/slot/248/248LinkResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/248/248Unlock.mp3',

    // Trail
    FreeAddTrail     : "sfx/slot/248/248FsTrail.mp3",

    LinkJPTrail      : "sfx/slot/248/248LinkTrail01.mp3",
    LinkDPTrail      : "sfx/slot/248/248LinkTrail02.mp3",
    LinkAddTrail      : "sfx/slot/248/248LinkTrail03.mp3",
    LinkDPTrailToWin      : "sfx/slot/248/248LinkSum01.mp3",
    LinkEWTrailToWin      : "sfx/slot/248/248LinkSum02.mp3",


    // pot
    PotTrail           : 'sfx/slot/248/248PotTrail.mp3',
    PotPre             : 'sfx/slot/248/248PotPre.mp3',
    PotOpen            : 'sfx/slot/248/248PotOpen.mp3',

    //fx
    FreeReelFx            : 'sfx/slot/248/248FsFrame.mp3',
    LinkFrameOpen         : 'sfx/slot/248/248LinkSymbol01.mp3',
    LinkDPOpen         : 'sfx/slot/248/248LinkSymbol02.mp3',
    JackpotMultiple         : 'sfx/slot/248/248FsMatch03.mp3',

    //LinkTrailSum        : "sfx/slot/248/248LinkSum.mp3",

    // symbol

    // symbol locking
    SymbolLockingDP  : 'sfx/slot/248/248DLocking.mp3',
    SymbolLockingJP  : 'sfx/slot/248/248JLocking.mp3',
    SymbolLockingAdd  : 'sfx/slot/248/248FsLocking01.mp3',
    SymbolLockingMultiple  : 'sfx/slot/248/248FsLocking02.mp3',


    SymbolLockingLinkDP  : 'sfx/slot/248/248LsymLocking01.mp3',
    SymbolLockingLinkEW  : 'sfx/slot/248/248LsymLocking02.mp3',
    SymbolLockingLinkAdd  : 'sfx/slot/248/248LsymLocking03.mp3',
    SymbolLockingLinkJP  : 'sfx/slot/248/248LsymLocking04.mp3',

    SymbolLockingScatter0  : 'sfx/slot/248/248Socking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/248/248Socking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/248/248Socking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/248/248Socking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/248/248Socking05.mp3',


    //match
    ScatterMatch         : 'sfx/slot/248/248SMatch.mp3',
    JPMatch         : 'sfx/slot/248/248JMatch.mp3',
    MultipleMatch         : 'sfx/slot/248/248FsMatch01.mp3',
    DPUpgrade         : 'sfx/slot/248/248FsMatch02.mp3',

    LinkJPMatch       : 'sfx/slot/248/248LinkMatch01.mp3',
    LinkEWMatch       : 'sfx/slot/248/248LinkMatch02.mp3',
    LinkAddMatch       : 'sfx/slot/248/248LinkMatch03.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/248/248TipOver.mp3",

    //noti


};
window.g_sndSlot248 = ResPack.create( 'sndSlot248', sndSlot248 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot249 = {
// intro
    Intro               : 'sfx/slot/249/249Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/249/249Bgm.mp3',
    FsBgm               : 'sfx/slot/249/249FsBgm.mp3',
    MiniBgm             : 'sfx/slot/249/249MiniBgm.mp3',
    LinkBgm             : 'sfx/slot/249/249LinkBgm.mp3',

    // pay
    MPayCount           : 'sfx/slot/249/249MPayCount.mp3',
    NPayCount01         : 'sfx/slot/249/249NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/249/249NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/249/249NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/249/249NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/249/249NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/249/249NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/249/249MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/249/249JackpotPopup.mp3',

    // normal
    Spin                : 'sfx/slot/249/249Spin.mp3',
    ReelStop            : 'sfx/slot/249/249ReelStop.mp3',
    LongSpin            : 'sfx/slot/249/249LongSpin.mp3',

    DLocking            : 'sfx/slot/249/249DLocking.mp3',
    JLocking            : 'sfx/slot/249/249JLocking.mp3',
    MLocking01          : 'sfx/slot/249/249MLocking01.mp3',
    MLocking02          : 'sfx/slot/249/249MLocking02.mp3',
    MLocking03          : 'sfx/slot/249/249MLocking03.mp3',
    MMatch01            : 'sfx/slot/249/249MMatch01.mp3',
    MMatch02            : 'sfx/slot/249/249MMatch02.mp3',
    MMatch03            : 'sfx/slot/249/249MMatch03.mp3',
    Mystery01           : 'sfx/slot/249/249Mystery01.mp3',
    Mystery02           : 'sfx/slot/249/249Mystery02.mp3',
    MysterySpin         : 'sfx/slot/249/249MysterySpin.mp3',
    CLocking            : 'sfx/slot/249/249CLocking.mp3',
    CMatch              : 'sfx/slot/249/249CMatch.mp3',
    PotTrail            : 'sfx/slot/249/249PotTrail.mp3',
    PotPre              : 'sfx/slot/249/249PotPre.mp3',
    PotOpen             : 'sfx/slot/249/249PotOpen.mp3',
    Rewind01            : 'sfx/slot/249/249Rewind01.mp3',
    Rewind02            : 'sfx/slot/249/249Rewind02.mp3',
    Rewind03            : 'sfx/slot/249/249Rewind03.mp3',
    Rewind04            : 'sfx/slot/249/249Rewind04.mp3',
    WheelOpen           : 'sfx/slot/249/249WheelOpen.mp3',
    Unlock              : 'sfx/slot/249/249Unlock.mp3',

    // free
    FsIntro             : 'sfx/slot/249/249FsIntro.mp3',
    FsCount             : 'sfx/slot/249/249FsCount.mp3',
    FsResult            : 'sfx/slot/249/249FsResult.mp3',

    // bonus
    BoOpen              : 'sfx/slot/249/249BoOpen.mp3',
    BoIntro01           : 'sfx/slot/249/249BoIntro01.mp3',
    BoIntro02           : 'sfx/slot/249/249BoIntro02.mp3',
    BoIntro03           : 'sfx/slot/249/249BoIntro03.mp3',
    BoSymbol01          : 'sfx/slot/249/249BoSymbol01.mp3',
    BoSymbol02          : 'sfx/slot/249/249BoSymbol02.mp3',
    BoCount             : 'sfx/slot/249/249BoCount.mp3',
    BoComplete          : 'sfx/slot/249/249BoComplete.mp3',
    BoSum               : 'sfx/slot/249/249BoSum.mp3',
    BoLocking01         : 'sfx/slot/249/249BoLocking01.mp3',
    BoLocking02         : 'sfx/slot/249/249BoLocking02.mp3',
    BoLocking03         : 'sfx/slot/249/249BoLocking03.mp3',
    BoUpgrade           : 'sfx/slot/249/249BoUpgrade.mp3',
    BoUpgrade02         : 'sfx/slot/249/249BoUpgrade02.mp3',
    BoUpgrade03         : 'sfx/slot/249/249BoUpgrade03.mp3',
    WheelSpin           : 'sfx/slot/249/249WheelSpin.mp3',
    WheelMatch01        : 'sfx/slot/249/249WheelMatch01.mp3',
    WheelMatch02        : 'sfx/slot/249/249WheelMatch02.mp3',
    WheelMatch03        : 'sfx/slot/249/249WheelMatch03.mp3',
    WheelRemove         : 'sfx/slot/249/249WheelRemove.mp3',
    WheelBoost          : 'sfx/slot/249/249WheelBoost.mp3',

    // jackpot Voice
    JackpotBoost        : 'sfx/slot/249/249JackpotBoost.mp3',
    JackpotVoice0       : 'sfx/slot/249/249JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/249/249JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/249/249JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/249/249JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/249/249JVoice05.mp3',
};
window.g_sndSlot249 = ResPack.create( 'sndSlot249', sndSlot249 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Acient Treasures BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot250 = {
    // Intro and BGM
    Intro               : 'sfx/slot/250/250Intro.mp3',
    NormalBgm           : 'sfx/slot/250/250Bgm.mp3',
    LinkBgm             : 'sfx/slot/250/250LinkBgm.mp3',
    MiniBgm             : 'sfx/slot/250/250MiniBgm.mp3',

    // Spin and Reel
    Spin                : 'sfx/slot/250/250Spin.mp3',
    ReelStop            : 'sfx/slot/250/250ReelStop.mp3',

    // Pay Counts
    MPayCount           : 'sfx/slot/250/250MPayCount.mp3',
    NPayCount01         : 'sfx/slot/250/250NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/250/250NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/250/250NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/250/250NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/250/250NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/250/250NPayCount03End.mp3',

    // Popups
    MajorPopup          : 'sfx/slot/250/250MajorPopup.mp3',

    // Locking and Matchings
    DLocking01          : 'sfx/slot/250/250DLocking01.mp3',
    DLocking02          : 'sfx/slot/250/250DLocking02.mp3',
    DLocking03          : 'sfx/slot/250/250DLocking03.mp3',
    DLocking04          : 'sfx/slot/250/250DLocking04.mp3',
    DLocking05          : 'sfx/slot/250/250DLocking05.mp3',

    // Gauge Effects
    Gauge01             : 'sfx/slot/250/250Guage01.mp3',
    Gauge02             : 'sfx/slot/250/250Guage02.mp3',
    SMatch              : 'sfx/slot/250/250SMatch.mp3',
    LongSpin            : 'sfx/slot/250/250LongSpin.mp3',
    LinkIntro           : 'sfx/slot/250/250LinkIntro.mp3',
    SuperLinkIntro      : 'sfx/slot/250/250SuperLinkIntro.mp3',

    // Link Mode
    LinkSpin            : 'sfx/slot/250/250LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/250/250LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/250/250LinkReset.mp3',
    LinkNoti            : 'sfx/slot/250/250LinkNoti.mp3',
    LLocking            : 'sfx/slot/250/250LsymLocking.mp3',
    SymbolFlip          : 'sfx/slot/250/250SymFlip.mp3',
    MMatch01            : 'sfx/slot/250/250MMatch01.mp3',
    MMatch02            : 'sfx/slot/250/250MMatch02.mp3',
    LinkSum             : 'sfx/slot/250/250LinkSum.mp3',
    LinkResult          : 'sfx/slot/250/250LinkResult.mp3',

    // MiniGame Intro
    MiniIntro01         : 'sfx/slot/250/250MIntro01.mp3',
    MiniIntro02         : 'sfx/slot/250/250MIntro02.mp3',
    MiniIntro03         : 'sfx/slot/250/250MIntro03.mp3',
    MiniIntro04         : 'sfx/slot/250/250MIntro04.mp3',
    MiniIntro05         : 'sfx/slot/250/250MIntro05.mp3',
    MiniIntro06         : 'sfx/slot/250/250MIntro06.mp3',

    // Jackpot & Special Sounds
    Coin01              : 'sfx/slot/250/250CoinB01.mp3',
    Coin02              : 'sfx/slot/250/250CoinB02.mp3',
    Coin03              : 'sfx/slot/250/250CoinB03.mp3',

    Block01             : 'sfx/slot/250/250BlockB01.mp3',
    Block02             : 'sfx/slot/250/250BlockB02.mp3',
    Block03             : 'sfx/slot/250/250BlockB03.mp3',
    Block04             : 'sfx/slot/250/250BlockB04.mp3',
    Block05             : 'sfx/slot/250/250BlockB05.mp3',
    Block06             : 'sfx/slot/250/250BlockB06.mp3',

    Temple01            : 'sfx/slot/250/250TempleB01.mp3',
    Temple02            : 'sfx/slot/250/250TempleB02.mp3',

    Chest01             : 'sfx/slot/250/250ChestB01.mp3',
    Chest02             : 'sfx/slot/250/250ChestB02.mp3',
    Chest03             : 'sfx/slot/250/250ChestB03.mp3',
    Chest08             : 'sfx/slot/250/250ChestB08.mp3',

    Jewel01             : 'sfx/slot/250/250JewelB01.mp3',
    Jewel02             : 'sfx/slot/250/250JewelB02.mp3',
    Jewel03             : 'sfx/slot/250/250JewelB03.mp3',
    Jewel04             : 'sfx/slot/250/250JewelB04.mp3',
    Jewel05             : 'sfx/slot/250/250JewelB05.mp3',
    Jewel06             : 'sfx/slot/250/250JewelB06.mp3',

    Rune01              : 'sfx/slot/250/250RuneB01.mp3',
    Rune02              : 'sfx/slot/250/250RuneB02.mp3',

    PotTrail            : 'sfx/slot/250/250PotTrail.mp3',
    PotUp               : 'sfx/slot/250/250PotPre.mp3',
    PotOpen             : 'sfx/slot/250/250PotOpen.mp3',
    MiniGameSet         : 'sfx/slot/250/250LinkLight.mp3',
    ChestFrameOpen      : 'sfx/slot/250/250ChestB07.mp3',

    MiniSum01           : 'sfx/slot/250/250MSum01.mp3',
    MiniSum02           : 'sfx/slot/250/250MSum02.mp3',
    MiniClose           : 'sfx/slot/250/250MiniClose.mp3',

    RuneCount           : 'sfx/slot/250/250MUpCount.mp3',

    MiniSum02           : 'sfx/slot/250/250MSum02.mp3',
    MiniClose           : 'sfx/slot/250/250MiniClose.mp3',

    RuneCount           : 'sfx/slot/250/250MUpCount.mp3',

    MainIntro1          : 'sfx/slot/250/250MainV01.mp3',
    MainIntro2          : 'sfx/slot/250/250MainV02.mp3',
    MainIntro3          : 'sfx/slot/250/250MainV03.mp3',

    MiniIntro1          : 'sfx/slot/250/250MiniV01.mp3',
    MiniIntro2          : 'sfx/slot/250/250MiniV02.mp3',
    MiniIntro3          : 'sfx/slot/250/250MiniV03.mp3'
};

window.g_sndSlot250 = ResPack.create('sndSlot250', sndSlot250).concat(g_sfxSlotCommon);

//region -- ↓↓↓ TikiFrenzy ↓↓↓ -----------------------------------------------------------------------------------------//
window.sndSlot251 = {
    // intro
    Intro               : 'sfx/slot/251/251Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/251/251Bgm.mp3',
    FreeBgm             : 'sfx/slot/251/251FsBgm.mp3',
    BonusBgm            : "sfx/slot/251/251BoBgm.mp3",
    PickBgm            : "sfx/slot/251/251PBgm.mp3",

    // normal spin
    Spin                : 'sfx/slot/251/251Spin.mp3',
    ReelStop            : 'sfx/slot/251/251ReelStop.mp3',
    LongSpin            : 'sfx/slot/251/251LongSpin.mp3',

    // ui
    FreespinTotalWin    : 'sfx/slot/251/251FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/251/251MPayCount.mp3',
    NPayCount01         : 'sfx/slot/251/251NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/251/251NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/251/251NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/251/251NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/251/251NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/251/251NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/251/251JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/251/251JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/251/251JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/251/251JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/251/251JVoice05.mp3',

    MajorwinPopup       : 'sfx/slot/251/251MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/251/251JackpotPopup.mp3',
    FreeIntroPopup      : 'sfx/slot/251/251FsIntro.mp3',
    FreeResultPopup     : 'sfx/slot/251/251FsResult.mp3',
    PickIntroPopup      : 'sfx/slot/251/251PickIntro.mp3',
    PickResultPopup     : 'sfx/slot/251/251PickResult.mp3',
    BonusIntroPopup      : 'sfx/slot/251/251BonusIntro.mp3',
    BonusResultPopup      : 'sfx/slot/251/251BonusResult.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/251/251Unlock.mp3',

    // Trail
    // pot
    PotTrail           : 'sfx/slot/251/251PotTrail.mp3',
    PotPre             : 'sfx/slot/251/251PotPre.mp3',
    PotOpen            : 'sfx/slot/251/251PotOpen.mp3',

    //fx
    PickDP        : "sfx/slot/251/251Pick01.mp3",
    PickJP        : "sfx/slot/251/251Pick02.mp3",
    PickCollect        : "sfx/slot/251/251Pick03.mp3",

    BonusOpen        : "sfx/slot/251/251BonusPick01.mp3",
    BonusPick        : "sfx/slot/251/251BonusPick02.mp3",
    BonusDP        : "sfx/slot/251/251BonusFall01.mp3",
    BonusJP        : "sfx/slot/251/251BonusFall02.mp3",
    BonusAdd        : "sfx/slot/251/251BonusFall03.mp3",
    BonusFree        : "sfx/slot/251/251BonusFall04.mp3",
    BonusAddMatch        : "sfx/slot/251/251BonusMatch01.mp3",
    BonusFrameOn        : "sfx/slot/251/251BonusMatch02.mp3",
    BonusFrameFix        : "sfx/slot/251/251BonusMatch03.mp3",
    BonusFreeMatch        : "sfx/slot/251/251BonusMatch04.mp3",
    BonusEndTiki        : "sfx/slot/251/251BonusSum01.mp3",
    BonusTrailDP        : "sfx/slot/251/251BonusSum02.mp3",
    BonusTrailJP        : "sfx/slot/251/251BonusSum03.mp3",

    MysterySpin        : "sfx/slot/251/251Mystery.mp3",

    // symbol

    // symbol locking
    SymbolLockingLongWild : 'sfx/slot/251/251FsWild.mp3',

    SymbolLockingScatter0  : 'sfx/slot/251/251SLocking01.mp3',
    SymbolLockingScatter1  : 'sfx/slot/251/251SLocking02.mp3',
    SymbolLockingScatter2  : 'sfx/slot/251/251SLocking03.mp3',
    SymbolLockingScatter3  : 'sfx/slot/251/251SLocking04.mp3',
    SymbolLockingScatter4  : 'sfx/slot/251/251SLocking05.mp3',

    //match
    ScatterMatch         : 'sfx/slot/251/251SMatch.mp3',

    //tooltip
    //TooltipOpen            : "sfx/slot/251/251TipOver.mp3",

    //noti


};
window.g_sndSlot251 = ResPack.create( 'sndSlot251', sndSlot251 ).concat( g_sfxSlotCommon );
//endregion

window.sndSlot252 = {
    // intro
    Intro               : 'sfx/slot/252/252Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/252/252Bgm.mp3',
    FreeBgm             : 'sfx/slot/252/252FsBgm.mp3',
    SuperFreeBgm             : 'sfx/slot/252/252SuperFsBgm.mp3',
    //LinkBgm             : 'sfx/slot/252/252LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/252/252Spin.mp3',
    ReelStop            : 'sfx/slot/252/252ReelStop.mp3',
    //LongSpin          : 'sfx/slot/252/252Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/252/252MPayCount.mp3',
    NPayCount01         : 'sfx/slot/252/252NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/252/252NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/252/252NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/252/252NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/252/252NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/252/252NPayCount03End.mp3',

    // winpannel
    // WinpannelOpen       :   'sfx/slot/252/252WinpannelOpen.mp3',
    // WinpannelClose      :   'sfx/slot/252/252WinpannelClose.mp3',
    // LinkSum             :   'sfx/slot/252/252LinkSum.mp3',
    FsCount             :   'sfx/slot/252/252FsCount.mp3',

    // betting
    Unlock        : 'sfx/slot/252/252Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    // LinkSpin            : 'sfx/slot/252/252LinkSpin.mp3',
    // LinkReelStop        : 'sfx/slot/252/252LinkReelstop.mp3',
    // LinkLongSpinFx      : 'sfx/slot/252/252LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/252/252MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/252/252JackpotPopup.mp3',
    FsIntro  : 'sfx/slot/252/252FsIntro.mp3',
    FsResult : 'sfx/slot/252/252FsResult.mp3',
    // LinkIntro  : 'sfx/slot/252/252LinkIntro.mp3',
    // LinkResult : 'sfx/slot/252/252LinkResult.mp3',

    // symbol
    JLocking            : 'sfx/slot/252/252JLocking.mp3',

    //POT
    PotTrail            : 'sfx/slot/252/252PotTrail.mp3',
    PotTrail02            : 'sfx/slot/252/252PotTrail02.mp3',
    //PotOpen            : 'sfx/slot/252/252PotOpen01.mp3',
    //PotPre              : 'sfx/slot/252/252PotPre01.mp3',

    PotOpen1            : 'sfx/slot/252/252PotOpen01.mp3',
    //PotPre1              : 'sfx/slot/252/252PotPre01.mp3'
    PotOpen2            : 'sfx/slot/252/252PotOpen02.mp3',
    PotPre2              : 'sfx/slot/252/252PotPre02.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/252/252JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/252/252JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/252/252JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/252/252JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/252/252JVoice05.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/252/252PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/252/252PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/252/252PannelSum.mp3',       //A

    //추가 구현
    Guage01            : 'sfx/slot/252/252Guage01.mp3',
    JMatch            : 'sfx/slot/252/252JMatch.mp3',

    // FsTransform01            : 'sfx/slot/252/252FsTransform01.mp3',
    FsTransform02            : 'sfx/slot/252/252FsTransform02.mp3',
    FsTransform03            : 'sfx/slot/252/252FsTransform03.mp3',
    // FsMatch01            : 'sfx/slot/252/252FsMatch01.mp3',
    FsMatch02            : 'sfx/slot/252/252FsMatch02.mp3',

    SuperFsIntro            : 'sfx/slot/252/252SuperFsIntro.mp3',

    FsPot01            : 'sfx/slot/252/252FsPot01.mp3',
    FsPot02            : 'sfx/slot/252/252FsPot02.mp3',
    FsAddSpin            : 'sfx/slot/252/252FsAddSpin.mp3',
    FsNoti            : 'sfx/slot/252/252FsNoti.mp3',
};
window.g_sndSlot252 = ResPack.create( 'sndSlot252', sndSlot252 ).concat( g_sfxSlotCommon );

window.sndSlot253 = {
    // intro
    Intro               : 'sfx/slot/253/253Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/253/253Bgm.mp3',
    FsBgm               : 'sfx/slot/253/253FsBgm.mp3',

    // pay
    Spin                : 'sfx/slot/253/253Spin.mp3',
    ReelStop            : 'sfx/slot/253/253ReelStop.mp3',
    MPayCount           : 'sfx/slot/253/253MPayCount.mp3',
    NPayCount01         : 'sfx/slot/253/253NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/253/253NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/253/253NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/253/253NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/253/253NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/253/253NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/253/253MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/253/253JackpotPopup.mp3',

    // normal
    JewLock01           : 'sfx/slot/253/253JewLock01.mp3',
    JewLock02           : 'sfx/slot/253/253JewLock02.mp3',
    JewLock03           : 'sfx/slot/253/253JewLock03.mp3',
    JewLock04           : 'sfx/slot/253/253JewLock04.mp3',
    PotTrail            : 'sfx/slot/253/253PotTrail.mp3',
    PotOpen             : 'sfx/slot/253/253PotOpen.mp3',
    PotPre              : 'sfx/slot/253/253PotPre.mp3',
    PotPre02            : 'sfx/slot/253/253PotPre02.mp3',
    DLocking            : 'sfx/slot/253/253DLocking.mp3',
    DMatch              : 'sfx/slot/253/253DMatch.mp3',
    Surprise            : 'sfx/slot/253/253Surprise.mp3',
    Unlock              : 'sfx/slot/253/253Unlock.mp3',

    // free
    FsIntro01           : 'sfx/slot/253/253FsIntro01.mp3',
    FsIntro02           : 'sfx/slot/253/253FsIntro02.mp3',
    FsIntro03           : 'sfx/slot/253/253FsIntro03.mp3',
    ReTrigger           : 'sfx/slot/253/253Retrigger.mp3',
    FsSymLocking01      : 'sfx/slot/253/253FsSymLocking01.mp3',
    FsSymLocking02      : 'sfx/slot/253/253FsSymLocking02.mp3',
    FsSymLocking03      : 'sfx/slot/253/253FsSymLocking03.mp3',
    FsRf01              : 'sfx/slot/253/253FsRf01.mp3',
    FsRf02              : 'sfx/slot/253/253FsRf02.mp3',
    FsRf03              : 'sfx/slot/253/253FsRf03.mp3',
    FsRf04              : 'sfx/slot/253/253FsRf04.mp3',
    FsRf05              : 'sfx/slot/253/253FsRf05.mp3',
    FsRf06              : 'sfx/slot/253/253FsRf06.mp3',
    FsRf07              : 'sfx/slot/253/253FsRf07.mp3',
    FsNudge01           : 'sfx/slot/253/253FsNudge01.mp3',
    FsNudge02           : 'sfx/slot/253/253FsNudge02.mp3',
    FsNudge03           : 'sfx/slot/253/253FsNudge03.mp3',
    FsPrize01           : 'sfx/slot/253/253FsPrize01.mp3',
    FsPrize02           : 'sfx/slot/253/253FsPrize02.mp3',
    FsPrize03           : 'sfx/slot/253/253FsPrize03.mp3',
    FsTrail01           : 'sfx/slot/253/253FsTrail01.mp3',
    FsTrail02           : 'sfx/slot/253/253FsTrail02.mp3',
    FsCount             : 'sfx/slot/253/253FsCount.mp3',
    FsResult            : 'sfx/slot/253/253FsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/253/253JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/253/253JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/253/253JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/253/253JVoice04.mp3',
};
window.g_sndSlot253 = ResPack.create( 'sndSlot253', sndSlot253 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Hippo Bank Blast BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot254 = {
    // ====== Intro & BGM ======
    Intro	            : 'sfx/slot/254/254Intro.mp3',
    NormalBgm	        : 'sfx/slot/254/254Bgm.mp3',
    FreeSpinBgm	        : 'sfx/slot/254/254FsBgm.mp3',

    // ====== Spin & Reel ======
    Spin	            : 'sfx/slot/254/254Spin.mp3',
    ReelStop	        : 'sfx/slot/254/254ReelStop.mp3',

    // ====== Pay Counts (M Pay) ======
    MPayCount01Pre	    : 'sfx/slot/254/254MPayCount01Pre.mp3',
    MPay01Count	        : 'sfx/slot/254/254MPay01Count.mp3',
    MPayCount01End	    : 'sfx/slot/254/254MPayCount01End.mp3',
    MPay02Count	        : 'sfx/slot/254/254MPay02Count.mp3',

    // ====== Pay Counts (N Pay) ======
    NPayCount01	        : 'sfx/slot/254/254NPayCount01.mp3',
    NPayCount01End	    : 'sfx/slot/254/254NPayCount01End.mp3',
    NPayCount02	        : 'sfx/slot/254/254NPayCount02.mp3',
    NPayCount02End	    : 'sfx/slot/254/254NPayCount02End.mp3',
    NPayCount03	        : 'sfx/slot/254/254NPayCount03.mp3',
    NPayCount03End	    : 'sfx/slot/254/254NPayCount03End.mp3',
    NPayCount04	        : 'sfx/slot/254/254NPayCount04.mp3',
    NPayCount04End	    : 'sfx/slot/254/254NPayCount04End.mp3',
    NPayCount05	        : 'sfx/slot/254/254NPayCount05.mp3',
    NPayCount05End	    : 'sfx/slot/254/254NPayCount05End.mp3',
    NPayCount06	        : 'sfx/slot/254/254NPayCount06.mp3',
    NPayCount06End	    : 'sfx/slot/254/254NPayCount06End.mp3',

    // ====== Popup ======
    MajorPopup	        : 'sfx/slot/254/254MajorPopup.mp3',

    // ====== Locking ======
    DPLock	            : 'sfx/slot/254/254DPLock.mp3',
    DiaLock	            : 'sfx/slot/254/254DiaLock.mp3',
    MultiLock01	        : 'sfx/slot/254/254MultiLock01.mp3',
    MultiLock02	        : 'sfx/slot/254/254MultiLock02.mp3',
    LongSpin	        : 'sfx/slot/254/254LongSpin.mp3',

    // ====== Match ======
    Match01	            : 'sfx/slot/254/254Match01.mp3',
    Match02	            : 'sfx/slot/254/254Match02.mp3',
    Match03	            : 'sfx/slot/254/254Match03.mp3',
    Match04	            : 'sfx/slot/254/254Match04.mp3',

    // ====== Diamond ======
    DiaCount	        : 'sfx/slot/254/254DiaCount.mp3',
    DiaCountEnd	        : 'sfx/slot/254/254DiaCountEnd.mp3',

    // ====== Misc ======
    Unlock	            : 'sfx/slot/254/254Unlock.mp3',
    Reward	            : 'sfx/slot/254/254Reward.mp3',

    RewardClick	        : 'sfx/slot/254/254RewardClick.mp3',
    FsIntro	            : 'sfx/slot/254/254FsIntro.mp3',
    QuickIntro	        : 'sfx/slot/254/254QuickIntro.mp3',
    QuickCount	        : 'sfx/slot/254/254QuickCount.mp3',
    FsResult	        : 'sfx/slot/254/254FsResult.mp3'
};
window.g_sndSlot254 = ResPack.create('sndSlot254', sndSlot254).concat(g_sfxSlotCommon);

window.sndSlot255 = {
    // intro
    Intro               : 'sfx/slot/255/255Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/255/255Bgm.mp3',
    FreeBgm             : 'sfx/slot/255/255FsBgm.mp3',
    LinkBgm             : 'sfx/slot/255/255LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/255/255Spin.mp3',
    ReelStop            : 'sfx/slot/255/255ReelStop.mp3',
    LongSpin          : 'sfx/slot/255/255Longspin.mp3',

    // pay
    MPayCount           : 'sfx/slot/255/255MPayCount.mp3',
    NPayCount01         : 'sfx/slot/255/255NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/255/255NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/255/255NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/255/255NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/255/255NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/255/255NPayCount03End.mp3',

    // winpannel
    // WinpannelOpen       :   'sfx/slot/255/255WinpannelOpen.mp3',
    // WinpannelClose      :   'sfx/slot/255/255WinpannelClose.mp3',
    // LinkSum             :   'sfx/slot/255/255LinkSum.mp3',
    FsCount             :   'sfx/slot/255/255FsCount.mp3',

    // betting
    Unlock        : 'sfx/slot/255/255Unlock.mp3',
    // ChangeBet          : 'sfx/slot/207/207BetChange.mp3',

    // link spin
    LinkSpin            : 'sfx/slot/255/255LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/255/255LinkReelStop.mp3',
    //LinkLongSpinFx      : 'sfx/slot/255/255LinkLongspin.mp3',

    // popup
    MajorPopup       : 'sfx/slot/255/255MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/255/255JackpotPopup.mp3',
    FsIntro  : 'sfx/slot/255/255FsIntro.mp3',
    FsResult : 'sfx/slot/255/255FsResult.mp3',
    LinkIntro  : 'sfx/slot/255/255LinkIntro.mp3',
    LinkResult : 'sfx/slot/255/255LinkResult.mp3',

    // symbol
    SLocking0     : 'sfx/slot/255/255DLocking01.mp3',//작업안됨
    SLocking1     : 'sfx/slot/255/255DLocking02.mp3',
    SLocking2     : 'sfx/slot/255/255DLocking03.mp3',
    SLocking3     : 'sfx/slot/255/255DLocking04.mp3',
    SLocking4     : 'sfx/slot/255/255DLocking05.mp3',
    //ScatterMatch        : 'sfx/slot/255/255SMatch.mp3',
    LinkMatch           : 'sfx/slot/255/255LMatch.mp3',

    //POT
    PotTrail            : 'sfx/slot/255/255Trail.mp3',
    PotBonus            : 'sfx/slot/255/255WMatch.mp3',
    // PotPre              : 'sfx/slot/255/255PotPre.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/255/255JVoice01.mp3',       //A
    JackpotVoice1       : 'sfx/slot/255/255JVoice02.mp3',       //A
    JackpotVoice2       : 'sfx/slot/255/255JVoice03.mp3',       //A
    JackpotVoice3       : 'sfx/slot/255/255JVoice04.mp3',       //A
    JackpotVoice4       : 'sfx/slot/255/255JVoice05.mp3',       //A
    // JackpotVoice5       : 'sfx/slot/255/255JVoice06.mp3',       //A
    // JackpotVoice6       : 'sfx/slot/255/255JVoice07.mp3',       //A
    // JackpotVoice7       : 'sfx/slot/255/255JVoice08.mp3',       //A

    //보너스윈 기능
    // PannelOn       : 'sfx/slot/255/255PannelOn.mp3',       //A
    // PannelOff       : 'sfx/slot/255/255PannelOff.mp3',       //A
    // PannelSum       : 'sfx/slot/255/255PannelSum.mp3',       //A

    //추가 구현
    WheelBgm             : 'sfx/slot/255/255WheelBgm.mp3',
    JLocking     : 'sfx/slot/255/255JLocking.mp3',
    Boost01     : 'sfx/slot/255/255Boost01.mp3',
    Boost02     : 'sfx/slot/255/255Boost02.mp3',
    LMatch     : 'sfx/slot/255/255LMatch.mp3',
    WMatch     : 'sfx/slot/255/255WMatch.mp3',

    LinkReset       : 'sfx/slot/255/255LinkReset.mp3',       //A
    LsymLocking01       : 'sfx/slot/255/255LsymLocking01.mp3',       //A
    LsymLocking02       : 'sfx/slot/255/255LsymLocking02.mp3',       //A
    Upgrade01       : 'sfx/slot/255/255Upgrade01.mp3',       //A
    Upgrade02       : 'sfx/slot/255/255Upgrade02.mp3',       //A
    Upgrade03       : 'sfx/slot/255/255Upgrade03.mp3',       //A
    LinkSum       : 'sfx/slot/255/255LinkSum.mp3',       //A

    WheelOpen       : 'sfx/slot/255/255WheelOpen.mp3',       //A
    WheelSpin       : 'sfx/slot/255/255WheelSpin.mp3',       //A
    WheelMatch01       : 'sfx/slot/255/255WheelMatch01.mp3',       //A
    WheelMatch02       : 'sfx/slot/255/255WheelMatch02.mp3',       //A
    WheelMatch03       : 'sfx/slot/255/255WheelMatch03.mp3',       //A
    WheelMatch04       : 'sfx/slot/255/255WheelMatch04.mp3',       //A
    WheelTrail       : 'sfx/slot/255/255WheelTrail.mp3',       //A
    WheelAgain       : 'sfx/slot/255/255WheelAgain.mp3',       //A
    WheelBoost       : 'sfx/slot/255/255WheelBoost.mp3',       //A
    WheelResult       : 'sfx/slot/255/255WheelResult.mp3',       //A

    WheelStop       : 'sfx/slot/255/255WheelStop.mp3',       //A
    BLocking       : 'sfx/slot/255/255BLocking.mp3',       //A
};
window.g_sndSlot255 = ResPack.create( 'sndSlot255', sndSlot255 ).concat( g_sfxSlotCommon );

window.sndSlot256 = {
    // intro
    Intro               : 'sfx/slot/256/256Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/256/256Bgm.mp3',
    FreeBgm             : 'sfx/slot/256/256FsBgm.mp3',
    LinkBgm             : 'sfx/slot/256/256LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/256/256Spin.mp3',
    ReelStop            : 'sfx/slot/256/256ReelStop.mp3',//
    LongSpin            : 'sfx/slot/256/256LongSpin.mp3',

    // link spin
    LinkLongSpin            : 'sfx/slot/256/256LinkLongSpin.mp3',
    LinkIntroPopup        : 'sfx/slot/256/256LinkIntro01.mp3',
    LinkResultPopup          : 'sfx/slot/256/256LinkResult.mp3',
    LinkIntro1          : 'sfx/slot/256/256LinkIntro02.mp3',//
    LinkSpin            : 'sfx/slot/256/256LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/256/256LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/256/256LinkReset.mp3',
    LinkFrame           : 'sfx/slot/256/256Frame.mp3',
    LinkFrameEnd        : 'sfx/slot/256/256FrameEnd.mp3',
    LinkSum0            : 'sfx/slot/256/256LinkSum01.mp3',
    LinkSum1            : 'sfx/slot/256/256LinkSum02.mp3',
    LinkUpgrade0            : 'sfx/slot/256/256Upgrade01.mp3',
    LinkUpgrade1            : 'sfx/slot/256/256Upgrade02.mp3',
    LinkUpgrade2            : 'sfx/slot/256/256Upgrade03.mp3',

    // free
    FreeIntroPopup       : 'sfx/slot/256/256FsIntro.mp3',
    FreeRetriggerIntroPopup   : 'sfx/slot/256/256Retrigger.mp3',
    FreeResultPopup      : 'sfx/slot/256/256FsResult.mp3',
    FreespinTotalWin    : 'sfx/slot/256/256FsCount.mp3',

    // pay
    MPayCount           : 'sfx/slot/256/256MPayCount.mp3',
    NPayCount01         : 'sfx/slot/256/256NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/256/256NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/256/256NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/256/256NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/256/256NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/256/256NPayCount03End.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/256/256JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/256/256JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/256/256JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/256/256JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/256/256JVoice05.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/256/256MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/256/256JackpotPopup.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/256/256Unlock.mp3',

    // symbol
    QSymbolLocking0     : 'sfx/slot/256/256QLocking01.mp3',
    QSymbolLocking1     : 'sfx/slot/256/256QLocking02.mp3',
    QSymbolLocking2     : 'sfx/slot/256/256QLocking03.mp3',
    QSymbolLocking3     : 'sfx/slot/256/256QLocking04.mp3',
    QSymbolLocking4     : 'sfx/slot/256/256QLocking05.mp3',

    SSymbolLocking0     : 'sfx/slot/256/256SLocking01.mp3',
    SSymbolLocking1     : 'sfx/slot/256/256SLocking02.mp3',
    SSymbolLocking2     : 'sfx/slot/256/256SLocking03.mp3',
    SSymbolLocking3     : 'sfx/slot/256/256SLocking04.mp3',
    SSymbolLocking4     : 'sfx/slot/256/256SLocking05.mp3',

    LSymbolLocking0     : 'sfx/slot/256/256LLocking01.mp3',
    LSymbolLocking1     : 'sfx/slot/256/256LLocking02.mp3',
    LSymbolLocking2     : 'sfx/slot/256/256LLocking03.mp3',
    LSymbolLocking3     : 'sfx/slot/256/256LLocking04.mp3',
    LSymbolLocking4     : 'sfx/slot/256/256LLocking05.mp3',

    DPSymbolLocking         : 'sfx/slot/256/256LsymLocking01.mp3',
    CollectSymbolLocking : 'sfx/slot/256/256LsymLocking02.mp3',
    QHSymbolLocking : 'sfx/slot/256/256LsymLocking03.mp3',

    // matches
    QSymbolMatch        : 'sfx/slot/256/256QMatch.mp3',
    SSymbolMatch        : 'sfx/slot/256/256SMatch.mp3',
    LSymbolMatch        : 'sfx/slot/256/256LMatch.mp3',
    LQSymbolMatch        : 'sfx/slot/256/256LinkJMatch.mp3',
    LCSymbolMatch        : 'sfx/slot/256/256LCollectMatch.mp3',
};
window.g_sndSlot256 = ResPack.create( 'sndSlot256', sndSlot256 ).concat( g_sfxSlotCommon );

window.sndSlot257 = {
    // intro
    Intro               : 'sfx/slot/257/257Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/257/257Bgm.mp3',
    FsBgm               : 'sfx/slot/257/257FsBgm.mp3',

    // pay
    MPayCount           : 'sfx/slot/257/257MPayCount.mp3',
    NPayCount01         : 'sfx/slot/257/257NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/257/257NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/257/257NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/257/257NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/257/257NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/257/257NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/257/257MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/257/257JackpotPopup.mp3',

    // normal
    Spin                : 'sfx/slot/257/257Spin.mp3',
    ReelStop            : 'sfx/slot/257/257ReelStop.mp3',
    FsReelStop          : 'sfx/slot/257/257FsReelStop.mp3',
    LongSpin            : 'sfx/slot/257/257LongSpin.mp3',

    SLocking01          : 'sfx/slot/257/257SLocking01.mp3',
    SLocking02          : 'sfx/slot/257/257SLocking02.mp3',
    SLocking03          : 'sfx/slot/257/257SLocking03.mp3',
    SLocking04          : 'sfx/slot/257/257SLocking04.mp3',
    SLocking05          : 'sfx/slot/257/257SLocking05.mp3',
    SSLocking01         : 'sfx/slot/257/257SSLocking01.mp3',
    SSLocking02         : 'sfx/slot/257/257SSLocking02.mp3',
    SSLocking03         : 'sfx/slot/257/257SSLocking03.mp3',
    SSLocking04         : 'sfx/slot/257/257SSLocking04.mp3',
    SSLocking05         : 'sfx/slot/257/257SSLocking05.mp3',
    SMatch              : 'sfx/slot/257/257SMatch.mp3',
    SSMatch             : 'sfx/slot/257/257SSMatch.mp3',
    JMatch              : 'sfx/slot/257/257JMatch.mp3',
    Unlock              : 'sfx/slot/257/257Unlock.mp3',

    // free
    FsIntro             : 'sfx/slot/257/257FsIntro.mp3',
    SuperFsIntro        : 'sfx/slot/257/257SuperFsIntro.mp3',
    FsSpinCount         : 'sfx/slot/257/257FsSpinCount.mp3',
    FsSpinCountEnd      : 'sfx/slot/257/257FsSpinCountEnd.mp3',
    Retrigger           : 'sfx/slot/257/257Retrigger.mp3',
    FsSymLocking01      : 'sfx/slot/257/257FsSymLocking01.mp3',
    FsSymLocking02      : 'sfx/slot/257/257FsSymLocking02.mp3',
    FsSymLocking03      : 'sfx/slot/257/257FsSymLocking03.mp3',
    FsMatch01           : 'sfx/slot/257/257FsMatch01.mp3',
    FsMatch02           : 'sfx/slot/257/257FsMatch02.mp3',
    FsMatch03           : 'sfx/slot/257/257FsMatch03.mp3',
    FsOpen              : 'sfx/slot/257/257FsOpen.mp3',
    FsCount             : 'sfx/slot/257/257FsCount.mp3',
    FsResult            : 'sfx/slot/257/257FsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/257/257JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/257/257JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/257/257JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/257/257JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/257/257JVoice05.mp3',
};
window.g_sndSlot257 = ResPack.create( 'sndSlot257', sndSlot257 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Zoom Zoom Double BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot258 = {
    // ====== Intro & BGM ======
    Intro               : 'sfx/slot/258/258Intro.mp3',
    NormalBgm           : 'sfx/slot/258/258Bgm.mp3',
    FreeSpinBgm         : 'sfx/slot/258/258FsBgm.mp3',
    LinkBgm             : 'sfx/slot/258/258LinkBgm.mp3',

    // ====== Spin & Reel ======
    Spin                : 'sfx/slot/258/258Spin.mp3',
    ReelStop            : 'sfx/slot/258/258ReelStop.mp3',
    LinkSpin            : 'sfx/slot/258/258LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/258/258LinkReelStop.mp3',

    // ====== Pay Counts ======
    MPayCount           : 'sfx/slot/258/258MPayCount.mp3',
    NPayCount01         : 'sfx/slot/258/258NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/258/258NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/258/258NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/258/258NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/258/258NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/258/258NPayCount03End.mp3',

    // ====== Popup ======
    MajorPopup          : 'sfx/slot/258/258MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/258/258JackpotPopup.mp3',

    // ====== Pot & Gauge ======
    PotTrail01          : 'sfx/slot/258/258PotTrail01.mp3',
    PotTrail02          : 'sfx/slot/258/258PotTrail02.mp3',
    PotOpen             : 'sfx/slot/258/258PotOpen.mp3',
    Guage01             : 'sfx/slot/258/258Guage01.mp3',
    Guage02             : 'sfx/slot/258/258Guage02.mp3',
    PotLevelUp          : 'sfx/slot/258/258PotPre.mp3',

    // ====== Wild ======
    Wild01              : 'sfx/slot/258/258Wild01.mp3',
    Wild02              : 'sfx/slot/258/258Wild02.mp3',
    Wild03              : 'sfx/slot/258/258Wild03.mp3',

    // ====== Unlock & Noti ======
    Unlock              : 'sfx/slot/258/258Unlock.mp3',
    LinkNoti            : 'sfx/slot/258/258LinkNoti.mp3',
    LinkReset           : 'sfx/slot/258/258LinkReset.mp3',

    // ====== Frame ======
    Frame01             : 'sfx/slot/258/258Frame01.mp3',
    Frame02             : 'sfx/slot/258/258Frame02.mp3',
    Frame03             : 'sfx/slot/258/258Frame03.mp3',

    // ====== Locking ======
    LsymLocking01       : 'sfx/slot/258/258LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/258/258LsymLocking02.mp3',

    // ====== Link Upgrade ======
    LinkIntro           : 'sfx/slot/258/258LinkIntro.mp3',
    LinkSuperIntro      : 'sfx/slot/258/258SuperLinkIntro.mp3',
    LinkDouble          : 'sfx/slot/258/258LinkUpgrade.mp3',
    LinkUnlock          : 'sfx/slot/258/258LinkUnlock.mp3',
    LinkSum01           : 'sfx/slot/258/258LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/258/258LinkSum02.mp3',
    LinkResult          : 'sfx/slot/258/258LinkResult.mp3',
    LinkMultipleUp      : 'sfx/slot/258/258LinkMulti.mp3',

    // ====== Free Spin ======
    FsIntro             : 'sfx/slot/258/258FsIntro.mp3',
    SuperFsIntro        : 'sfx/slot/258/258SuperFsIntro.mp3',
    FsFrame             : 'sfx/slot/258/258FsFrame.mp3',
    FsCount             : 'sfx/slot/258/258FsCount.mp3',
    FsResult            : 'sfx/slot/258/258FsResult.mp3',

    UfoLayEffect        : 'sfx/slot/258/258CenterFrame.mp3',
    JackpotPopupMultiple: 'sfx/slot/258/258JackpotBoost.mp3',

    // ====== Voice ======
    JVoice01            : 'sfx/slot/258/258JVoice01.mp3',
    JVoice02            : 'sfx/slot/258/258JVoice02.mp3',
    JVoice03            : 'sfx/slot/258/258JVoice03.mp3',
    JVoice04            : 'sfx/slot/258/258JVoice04.mp3'
};
window.g_sndSlot258 = ResPack.create('sndSlot258', sndSlot258).concat(g_sfxSlotCommon);

window.sndSlot259 = {
    // intro
    Intro               : 'sfx/slot/259/259Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/259/259Bgm.mp3',
    FreeBgm             : 'sfx/slot/259/259FsBgm.mp3',
    LinkBgm             : 'sfx/slot/259/259LinkBgm.mp3',
    PickBgm             : 'sfx/slot/259/259PickBgm.mp3',
    BonusBgm            : 'sfx/slot/259/259BonusBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/259/259Spin.mp3',
    ReelStop            : 'sfx/slot/259/259ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/259/259MPayCount.mp3',
    NPayCount01         : 'sfx/slot/259/259NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/259/259NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/259/259NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/259/259NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/259/259NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/259/259NPayCount03End.mp3',

    // popup
    MajorPopup          : 'sfx/slot/259/259MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/259/259JackpotPopup.mp3',

    // POT
    PotTrail01          : 'sfx/slot/259/259PotTrail01.mp3',
    PotTrail02          : 'sfx/slot/259/259PotTrail02.mp3',
    PotOpen01           : 'sfx/slot/259/259PotOpen01.mp3',
    PotOpen02           : 'sfx/slot/259/259PotOpen02.mp3',
    PotPre              : 'sfx/slot/259/259PotPre.mp3',

    // betting
    Unlock              : 'sfx/slot/259/259Unlock.mp3',

    // Link Feature
    LinkIntro           : 'sfx/slot/259/259LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/259/259LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/259/259LinkReelStop.mp3',
    LinkNoti            : 'sfx/slot/259/259LinkNoti.mp3',
    LinkReset           : 'sfx/slot/259/259LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/259/259LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/259/259LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/259/259LsymLocking03.mp3',
    LOpen               : 'sfx/slot/259/259LOpen.mp3',
    LSpin               : 'sfx/slot/259/259LSpin.mp3',
    LSpinEnd            : 'sfx/slot/259/259LSpinEnd.mp3',
    LTrail              : 'sfx/slot/259/259LTrail.mp3',
    LPb01               : 'sfx/slot/259/259LPb01.mp3',
    LPb02               : 'sfx/slot/259/259LPb02.mp3',
    LPb03               : 'sfx/slot/259/259LPb03.mp3',
    LPb04               : 'sfx/slot/259/259LPb04.mp3',
    LRp01               : 'sfx/slot/259/259LRp01.mp3',
    LRp02               : 'sfx/slot/259/259LRp02.mp3',
    LRp03               : 'sfx/slot/259/259LRp03.mp3',
    LDouble01           : 'sfx/slot/259/259LDouble01.mp3',
    LDouble02           : 'sfx/slot/259/259LDouble02.mp3',
    LDouble03           : 'sfx/slot/259/259LDouble03.mp3',
    LDouble04           : 'sfx/slot/259/259LDouble04.mp3',
    LDouble05           : 'sfx/slot/259/259LDouble05.mp3',
    LGb01               : 'sfx/slot/259/259LGb01.mp3',
    LGb02               : 'sfx/slot/259/259LGb02.mp3',
    LGb03               : 'sfx/slot/259/259LGb03.mp3',
    LinkLongSpin        : 'sfx/slot/259/259LinkLongSpin.mp3',
    LinkSum             : 'sfx/slot/259/259LinkSum.mp3',
    LinkResult          : 'sfx/slot/259/259LinkResult.mp3',

    // Free Spin Feature
    FsIntro             : 'sfx/slot/259/259FsIntro.mp3',
    FsLongsym01         : 'sfx/slot/259/259FsLongsym01.mp3',
    FsLongsym02         : 'sfx/slot/259/259FsLongsym02.mp3',
    FsLongsym03         : 'sfx/slot/259/259FsLongsym03.mp3',
    FsLongsym04         : 'sfx/slot/259/259FsLongsym04.mp3',
    FsLongsym05         : 'sfx/slot/259/259FsLongsym05.mp3',
    FsLongsym06         : 'sfx/slot/259/259FsLongsym06.mp3',
    FsLongsym07         : 'sfx/slot/259/259FsLongsym07.mp3',
    FsCount             : 'sfx/slot/259/259FsCount.mp3',
    FsResult            : 'sfx/slot/259/259FsResult.mp3',

    // Pick Feature
    PickIntro           : 'sfx/slot/259/259PickIntro.mp3',
    PickNoti            : 'sfx/slot/259/259PickNoti.mp3',
    Pick01              : 'sfx/slot/259/259Pick01.mp3',
    Pick02              : 'sfx/slot/259/259Pick02.mp3',
    Pick03              : 'sfx/slot/259/259Pick03.mp3',
    Pick04              : 'sfx/slot/259/259Pick04.mp3',
    Pick05              : 'sfx/slot/259/259Pick05.mp3',
    PlusPick            : 'sfx/slot/259/259PlusPick.mp3',
    RandomPick01        : 'sfx/slot/259/259RandomPick01.mp3',
    RandomPick02        : 'sfx/slot/259/259RandomPick02.mp3',
    BigMoneyPick01      : 'sfx/slot/259/259BigMoneyPick01.mp3',
    BigMoneyPick02      : 'sfx/slot/259/259BigMoneyPick02.mp3',
    BigMoneyPick03      : 'sfx/slot/259/259BigMoneyPick03.mp3',
    MysteryPick01       : 'sfx/slot/259/259MysteryPick01.mp3',
    MysteryPick02       : 'sfx/slot/259/259MysteryPick02.mp3',
    BoostPick01         : 'sfx/slot/259/259BoostPick01.mp3',
    BoostPick02         : 'sfx/slot/259/259BoostPick02.mp3',
    PickSum             : 'sfx/slot/259/259PickSum.mp3',
    PickResult          : 'sfx/slot/259/259PickResult.mp3',

    // Bonus (Gorgon) Feature
    BonusIntro          : 'sfx/slot/259/259BonusIntro.mp3',
    BonusSpin01         : 'sfx/slot/259/259BonusSpin01.mp3',
    BonusSpin02         : 'sfx/slot/259/259BonusSpin02.mp3',
    BonusSpin03         : 'sfx/slot/259/259BonusSpin03.mp3',
    GorgonOpen          : 'sfx/slot/259/259GorgonOpen.mp3',
    GorgonSpin          : 'sfx/slot/259/259GorgonSpin.mp3',
    GorgonReelStop      : 'sfx/slot/259/259GorgonReelStop.mp3',
    GorgonLocking01     : 'sfx/slot/259/259GorgonLocking01.mp3',
    GorgonLocking02     : 'sfx/slot/259/259GorgonLocking02.mp3',
    GorgonNoti          : 'sfx/slot/259/259GorgonNoti.mp3',
    GorgonSum           : 'sfx/slot/259/259GorgonSum.mp3',
    GorgonResult        : 'sfx/slot/259/259GorgonResult.mp3',

    // Jackpot Voice
    JackpotVoice0       : 'sfx/slot/259/259JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/259/259JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/259/259JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/259/259JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/259/259JVoice05.mp3',

    //추가 구현
    FsLongsym08       : 'sfx/slot/259/259FsLongsym08.mp3',
    RandomPick03       : 'sfx/slot/259/259RandomPick03.mp3',

    GorgonNoti02       : 'sfx/slot/259/259GorgonNoti02.mp3',
    GorgonNoti03       : 'sfx/slot/259/259GorgonNoti03.mp3',
    GorgonOff       : 'sfx/slot/259/259GorgonOff.mp3',
};
window.g_sndSlot259 = ResPack.create( 'sndSlot259', sndSlot259 ).concat( g_sfxSlotCommon );

window.sndSlot260 = {
    // intro
    Intro               : 'sfx/slot/260/260Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/260/260Bgm.mp3',
    FsBgm               : 'sfx/slot/260/260FsBgm.mp3',
    LinkBgm             : 'sfx/slot/260/260LinkBgm.mp3',

    Spin                : 'sfx/slot/260/260Spin.mp3',
    ReelStop            : 'sfx/slot/260/260ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/260/260MPayCount.mp3',
    NPayCount01         : 'sfx/slot/260/260NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/260/260NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/260/260NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/260/260NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/260/260NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/260/260NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/260/260MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/260/260JackpotPopup.mp3',

    // normal
    PotTrail            : 'sfx/slot/260/260PotTrail.mp3',
    PotOpen             : 'sfx/slot/260/260PotOpen.mp3',
    PotPre              : 'sfx/slot/260/260PotPre.mp3',

    SLocking01          : 'sfx/slot/260/260SLocking01.mp3',
    SLocking02          : 'sfx/slot/260/260SLocking02.mp3',
    SLocking03          : 'sfx/slot/260/260SLocking03.mp3',
    SLocking04          : 'sfx/slot/260/260SLocking04.mp3',
    SLocking05          : 'sfx/slot/260/260SLocking05.mp3',
    DSLocking01         : 'sfx/slot/260/260DSLocking01.mp3',
    DSLocking02         : 'sfx/slot/260/260DSLocking02.mp3',
    DSLocking03         : 'sfx/slot/260/260DSLocking03.mp3',
    DSLocking04         : 'sfx/slot/260/260DSLocking04.mp3',
    DSLocking05         : 'sfx/slot/260/260DSLocking05.mp3',
    SMatch              : 'sfx/slot/260/260SMatch.mp3',
    Extend              : 'sfx/slot/260/260Extend.mp3',
    JLocking            : 'sfx/slot/260/260JLocking.mp3',
    LongSpin            : 'sfx/slot/260/260LongSpin.mp3',
    Unlock              : 'sfx/slot/260/260Unlock.mp3',

    // link
    LinkIntro           : 'sfx/slot/260/260LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/260/260LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/260/260LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/260/260LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/260/260LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/260/260LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/260/260LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/260/260LsymLocking04.mp3',
    LinkUpgrade01       : 'sfx/slot/260/260LinkUpgrade01.mp3',
    LinkUpgrade02       : 'sfx/slot/260/260LinkUpgrade02.mp3',
    LinkUpgrade03       : 'sfx/slot/260/260LinkUpgrade03.mp3',
    LinkLongSpin        : 'sfx/slot/260/260LinkLongSpin.mp3',
    LinkSum01           : 'sfx/slot/260/260LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/260/260LinkSum02.mp3',
    LinkResult          : 'sfx/slot/260/260LinkResult.mp3',

    // free
    FsIntro             : 'sfx/slot/260/260FsIntro.mp3',
    Retrigger           : 'sfx/slot/260/260Retrigger.mp3',
    FsCount             : 'sfx/slot/260/260FsCount.mp3',
    FsResult            : 'sfx/slot/260/260FsResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/260/260JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/260/260JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/260/260JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/260/260JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/260/260JVoice05.mp3',
    JackpotVoice5       : 'sfx/slot/260/260JVoice06.mp3',

    JackpotVoice6       : 'sfx/slot/260/260JVoice07.mp3',
    JackpotVoice7       : 'sfx/slot/260/260JVoice08.mp3',
    JackpotVoice8       : 'sfx/slot/260/260JVoice09.mp3',
    JackpotVoice9       : 'sfx/slot/260/260JVoice10.mp3',
    JackpotVoice10      : 'sfx/slot/260/260JVoice17.mp3',
    JackpotVoice11      : 'sfx/slot/260/260JVoice11.mp3',

    JackpotVoice12      : 'sfx/slot/260/260JVoice12.mp3',
    JackpotVoice13      : 'sfx/slot/260/260JVoice13.mp3',
    JackpotVoice14      : 'sfx/slot/260/260JVoice14.mp3',
    JackpotVoice15      : 'sfx/slot/260/260JVoice15.mp3',
    JackpotVoice16      : 'sfx/slot/260/260JVoice18.mp3',
    JackpotVoice17      : 'sfx/slot/260/260JVoice16.mp3',

    // extend voice
    ExtendVoice0        : 'sfx/slot/260/260ExtendVoice01.mp3',
    ExtendVoice1        : 'sfx/slot/260/260ExtendVoice02.mp3',
    ExtendVoice2        : 'sfx/slot/260/260ExtendVoice03.mp3',
    ExtendVoice3        : 'sfx/slot/260/260ExtendVoice04.mp3',
    ExtendVoice4        : 'sfx/slot/260/260ExtendVoice05.mp3',
    ExtendVoice5        : 'sfx/slot/260/260ExtendVoice06.mp3',
};
window.g_sndSlot260 = ResPack.create( 'sndSlot260', sndSlot260 ).concat( g_sfxSlotCommon );

window.sndSlot261 = {
    // intro
    Intro               : 'sfx/slot/261/261Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/261/261Bgm.mp3',
    LinkBgm             : 'sfx/slot/261/261LinkBgm.mp3',
    FeverBgm             : 'sfx/slot/261/261FeverBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/261/261Spin.mp3',
    ReelStop            : 'sfx/slot/261/261ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/261/261MPayCount.mp3',
    NPayCount01         : 'sfx/slot/261/261NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/261/261NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/261/261NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/261/261NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/261/261NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/261/261NPayCount03End.mp3',

    // popup
    MajorwinPopup       : 'sfx/slot/261/261MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/261/261JackpotPopup.mp3',

    // trail
    PotTrail            : 'sfx/slot/261/261PotTrail.mp3',
    PotPre              : 'sfx/slot/261/261PotPre.mp3',
    PotOpen0            : 'sfx/slot/261/261PotOpen01.mp3',
    PotOpen1            : 'sfx/slot/261/261PotOpen02.mp3',
    PotOpen2            : 'sfx/slot/261/261PotOpen03.mp3',

    // symbol locking (scatter)
    SymbolLockingScatter0 : 'sfx/slot/261/261SLocking01.mp3',
    SymbolLockingScatter1 : 'sfx/slot/261/261SLocking02.mp3',
    SymbolLockingScatter2 : 'sfx/slot/261/261SLocking03.mp3',
    SymbolLockingScatter3 : 'sfx/slot/261/261SLocking04.mp3',
    SymbolLockingScatter4 : 'sfx/slot/261/261SLocking05.mp3',

    // extra symbols
    LinkExtra0          : 'sfx/slot/261/261Extra01.mp3',
    LinkExtra1          : 'sfx/slot/261/261Extra02.mp3',
    LinkExtra2          : 'sfx/slot/261/261Extra03.mp3',
    LinkExtra3          : 'sfx/slot/261/261Extra04.mp3',
    LinkExtra4          : 'sfx/slot/261/261Extra05.mp3',

    // match
    ScatterMatch        : 'sfx/slot/261/261SMatch.mp3',

    // fever
    Fever0              : 'sfx/slot/261/261Fever01.mp3',
    Fever1              : 'sfx/slot/261/261Fever02.mp3',
    FeverEnd              : 'sfx/slot/261/261FeverEnd.mp3',

    // betting
    BetLimitOver        : 'sfx/slot/261/261Unlock.mp3',

    // link spin
    LinkIntro           : 'sfx/slot/261/261LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/261/261LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/261/261LinkReelStop.mp3',

    // link noti
    LinkNoti0           : 'sfx/slot/261/261LinkNoti01.mp3',
    LinkNoti1           : 'sfx/slot/261/261LinkNoti02.mp3',
    LinkNoti2           : 'sfx/slot/261/261LinkNoti03.mp3',
    LinkNoti3           : 'sfx/slot/261/261LinkNoti04.mp3',

    // link frame effects
    LinkFrame0          : 'sfx/slot/261/261Frame01.mp3',//a
    //LinkFrame1          : 'sfx/slot/261/261Frame02.mp3',//a
    LinkFrame2          : 'sfx/slot/261/261Frame03.mp3',//a

    // symbol locking
    SymbolLockingDP : 'sfx/slot/261/261LsymLocking01.mp3',
    SymbolLockingJP : 'sfx/slot/261/261LsymLocking02.mp3',

    // link jackpots
    LinkJackpot0        : 'sfx/slot/261/261LJackpot01.mp3',
    //LinkJackpot1        : 'sfx/slot/261/261LJackpot02.mp3', //a

    // multiplier
    LinkMultiplier      : 'sfx/slot/261/261LinkMulti.mp3',

    // link results
    LinkSum0            : 'sfx/slot/261/261LinkSum01.mp3',
    LinkSum1            : 'sfx/slot/261/261LinkSum02.mp3',
    LinkResult          : 'sfx/slot/261/261LinkResult.mp3',

    LinkInit          : 'sfx/slot/261/261LinkTransform.mp3',

    // jackpot voice
    JackpotVoice0       : 'sfx/slot/261/261JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/261/261JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/261/261JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/261/261JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/261/261JVoice05.mp3',
};
window.g_sndSlot261 = ResPack.create( 'sndSlot261', sndSlot261 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Double Runrise Lock BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot262 = {
    // ====== Intro & BGM ======
    Intro               : 'sfx/slot/262/262Intro.mp3',
    NormalBgm           : 'sfx/slot/262/262Bgm.mp3',
    FreeSpinBgm         : 'sfx/slot/262/262FsBgm.mp3',
    LinkBgm             : 'sfx/slot/262/262LinkBgm.mp3',
    PickBgm             : 'sfx/slot/262/262PickBgm.mp3',

    // ====== Spin & Reel ======
    Spin                : 'sfx/slot/262/262Spin.mp3',
    ReelStop            : 'sfx/slot/262/262ReelStop.mp3',

    // ====== Pay Counts ======
    MPayCount           : 'sfx/slot/262/262MPayCount.mp3',
    NPayCount01         : 'sfx/slot/262/262NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/262/262NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/262/262NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/262/262NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/262/262NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/262/262NPayCount03End.mp3',

    // ====== Popup ======
    MajorPopup          : 'sfx/slot/262/262MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/262/262JackpotPopup.mp3',
    JackpotMultiple     : 'sfx/slot/262/262JackpotBoost.mp3',

    // ====== Pot & Gauge ======
    PotTrail            : 'sfx/slot/262/262PotTrail.mp3',
    PotOpen             : 'sfx/slot/262/262PotOpen.mp3',
    PotLevelUp          : 'sfx/slot/262/262PotPre.mp3',

    // ====== Locking & Matching ======
    WLocking01          : 'sfx/slot/262/262WLokcing01.mp3',
    WLocking02          : 'sfx/slot/262/262WLokcing02.mp3',
    DLocking            : 'sfx/slot/262/262DLocking.mp3',
    JLocking            : 'sfx/slot/262/262JLokcing.mp3',
    WMatch01            : 'sfx/slot/262/262Wmatch01.mp3',
    WMatch02            : 'sfx/slot/262/262Wmatch02.mp3',
    Rewind01            : 'sfx/slot/262/262Rewind01.mp3',
    Rewind02            : 'sfx/slot/262/262Rewind02.mp3',

    // ====== Unlock & Link ======
    Unlock              : 'sfx/slot/262/262Unlock.mp3',
    LinkIntro           : 'sfx/slot/262/262LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/262/262LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/262/262LinkReelStop.mp3',
    LinkNoti            : 'sfx/slot/262/262LinkNoti.mp3',
    LinkReset           : 'sfx/slot/262/262LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/262/262LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/262/262LsymLocking02.mp3',
    LinkSum01           : 'sfx/slot/262/262LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/262/262LinkSum02.mp3',
    LinkResult          : 'sfx/slot/262/262LinkResult.mp3',
    LinkSun             : 'sfx/slot/262/262LinkOpen02.mp3',

    // ====== Free Spin ======
    FsIntro             : 'sfx/slot/262/262FsIntro.mp3',
    FsCount             : 'sfx/slot/262/262FsCount.mp3',
    FsResult            : 'sfx/slot/262/262FsResult.mp3',

    //
    PickPlus            : 'sfx/slot/262/262PickPlus.mp3',
    Longspin            : 'sfx/slot/262/262LinkLongSpin.mp3',
    MultipeLink         : 'sfx/slot/262/262LinkMulti.mp3',

    // ====== Pick Game ======
    PickIntro           : 'sfx/slot/262/262PickIntro.mp3',
    Pick01              : 'sfx/slot/262/262Pick01.mp3',
    Pick02              : 'sfx/slot/262/262Pick02.mp3',
    RandomPick01        : 'sfx/slot/262/262RandomPick01.mp3',
    RandomPick02        : 'sfx/slot/262/262RandomPick02.mp3',
    PickSum01           : 'sfx/slot/262/262PickSum01.mp3',
    PickSum02           : 'sfx/slot/262/262PickSum02.mp3',
    PickResult          : 'sfx/slot/262/262PickResult.mp3',

    // ====== Voice ======
    JVoice01            : 'sfx/slot/262/262JVoice01.mp3',
    JVoice02            : 'sfx/slot/262/262JVoice02.mp3',
    JVoice03            : 'sfx/slot/262/262JVoice03.mp3',
    JVoice04            : 'sfx/slot/262/262JVoice04.mp3',
    JVoice05            : 'sfx/slot/262/262JVoice05.mp3'
};
window.g_sndSlot262 = ResPack.create('sndSlot262', sndSlot262).concat(g_sfxSlotCommon);

window.sndSlot263 = {
    // intro
    Intro                   : 'sfx/slot/263/263Intro.mp3',

    // bgm
    NormalBgm               : 'sfx/slot/263/263Bgm.mp3',
    FreeBgm                 : 'sfx/slot/263/263FsBgm.mp3',
    PickGameBgm             : 'sfx/slot/263/263PickBgm.mp3',

    // pay
    MPayCount               : 'sfx/slot/263/263MPayCount.mp3',
    MPayCount2              : 'sfx/slot/263/263MPayCount02.mp3',
    NPayCount01             : 'sfx/slot/263/263NPayCount01.mp3',
    NPayCount02             : 'sfx/slot/263/263NPayCount02.mp3',
    NPayCount03             : 'sfx/slot/263/263NPayCount03.mp3',
    NPayCount01End          : 'sfx/slot/263/263NPayCount01End.mp3',
    NPayCount02End          : 'sfx/slot/263/263NPayCount02End.mp3',
    NPayCount03End          : 'sfx/slot/263/263NPayCount03End.mp3',

    // Fx
    PotTrail                : 'sfx/slot/263/263PotTrail.mp3',
    PotOpen                 : 'sfx/slot/263/263PotOpen.mp3',
    PotStepUp               : 'sfx/slot/263/263PotPre.mp3',
    PotTouch                : 'sfx/slot/263/263PotTouch.mp3',
    LongSpin                : 'sfx/slot/263/263LongSpin01.mp3',
    ReelFrameFx             : 'sfx/slot/263/263LongSpin02.mp3',
    ExpandingIntroFx        : 'sfx/slot/263/263Double01.mp3',
    ExpandingIntroVoice2    : 'sfx/slot/263/253DVoice01.mp3',
    ExpandingIntroVoice3    : 'sfx/slot/263/253DVoice02.mp3',
    ExpandingIntroVoice4    : 'sfx/slot/263/253DVoice03.mp3',
    ExpandingReelFx         : 'sfx/slot/263/263Double02.mp3',
    BonusWinCountUp         : 'sfx/slot/263/263PickSum.mp3',
    // normal
    Spin                    : 'sfx/slot/263/263Spin.mp3',
    ReelStop                : 'sfx/slot/263/263ReelStop.mp3',
    BetUnLock               : 'sfx/slot/263/263Unlock.mp3',
    // free
    TotalWinCount           : 'sfx/slot/263/263FsCount.mp3',
    // pick
    PickGame_PickDP         : 'sfx/slot/263/263Pick01.mp3',
    PickGame_PickJP         : 'sfx/slot/263/263Pick02.mp3',
    PickGame_PickSP         : 'sfx/slot/263/263Pick03.mp3',
    PickGame_AddPick        : 'sfx/slot/263/263PickPlus.mp3',
    PickGame_Trail          : 'sfx/slot/263/263PickTrail.mp3',
    PickGame_CountIntro     : 'sfx/slot/263/263PickCount01.mp3',
    PickGame_CountIntroEnd  : 'sfx/slot/263/263PickCount02.mp3',
    PickGame_endPickGame    : 'sfx/slot/263/263PickSum02.mp3',

    // symbol
    SymbolScatterLocking0   : 'sfx/slot/263/263SLocking01.mp3',
    SymbolScatterLocking1   : 'sfx/slot/263/263SLocking02.mp3',
    SymbolScatterLocking2   : 'sfx/slot/263/263SLocking03.mp3',
    SymbolScatterLocking3   : 'sfx/slot/263/263SLocking04.mp3',
    SymbolScatterLocking4   : 'sfx/slot/263/263SLocking05.mp3',
    SymbolDPLocking         : 'sfx/slot/263/263DLocking.mp3',
    SymbolJPLocking         : 'sfx/slot/263/263JLocking.mp3',
    SymbolScatterM          : 'sfx/slot/263/263SMatch.mp3',

    // popup
    MajorwinPopup           : 'sfx/slot/263/263MajorPopup.mp3',
    JackpotPopup            : 'sfx/slot/263/263JackpotPopup.mp3',
    FreeIntroPopup          : 'sfx/slot/263/263FsIntro.mp3',
    FreeSelectPopup         : 'sfx/slot/263/263FsFeature01.mp3',
    FreeSelectPopupSelect   : 'sfx/slot/263/263FsFeature02.mp3',
    FreeRetriggerPopup      : 'sfx/slot/263/263Retrigger.mp3',
    FreeResultPopup         : 'sfx/slot/263/263FsResult.mp3',
    PickGameIntroPopup      : 'sfx/slot/263/263PickIntro.mp3',
    PickResultPopup         : 'sfx/slot/263/263PickResult.mp3',

    // jackpot Voice
    JackpotVoice0           : 'sfx/slot/263/263JVoice01.mp3',
    JackpotVoice1           : 'sfx/slot/263/263JVoice02.mp3',
    JackpotVoice2           : 'sfx/slot/263/263JVoice03.mp3',
    JackpotVoice3           : 'sfx/slot/263/263JVoice04.mp3',
    JackpotVoice4           : 'sfx/slot/263/263JVoice05.mp3'
};
window.g_sndSlot263 = ResPack.create( 'sndSlot263', sndSlot263 ).concat( g_sfxSlotCommon );

window.sndSlot264 = {
    // intro
    Intro               : 'sfx/slot/264/264Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/264/264Bgm.mp3',
    FreeBgm             : 'sfx/slot/264/264FsBgm.mp3',
    LinkBgm             : 'sfx/slot/264/264LinkBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/264/264Spin.mp3',
    ReelStop            : 'sfx/slot/264/264ReelStop.mp3',
    LongSpin            : 'sfx/slot/264/264LongSpin.mp3',

    // pay
    MPayCount           : 'sfx/slot/264/264MPayCount.mp3',
    NPayCount01         : 'sfx/slot/264/264NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/264/264NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/264/264NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/264/264NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/264/264NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/264/264NPayCount03End.mp3',

    // winpannel
    FsCount             : 'sfx/slot/264/264FsCount.mp3',
    LinkSum             : 'sfx/slot/264/264LinkSum.mp3',

    // betting
    Unlock              : 'sfx/slot/264/264Unlock.mp3',

    // link feature
    LinkSpin            : 'sfx/slot/264/264LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/264/264LinkReelStop.mp3',
    LsymLocking01       : 'sfx/slot/264/264LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/264/264LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/264/264LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/264/264LsymLocking04.mp3',
    Collect01           : 'sfx/slot/264/264Collect01.mp3',
    Collect02           : 'sfx/slot/264/264Collect02.mp3',
    Collect03           : 'sfx/slot/264/264Collect03.mp3',
    Collect04           : 'sfx/slot/264/264Collect04.mp3',
    LinkPlus            : 'sfx/slot/264/264LinkPlus.mp3',

    // free spin feature
    FsLevelup           : 'sfx/slot/264/264FsLevelup.mp3',
    FsPlus01            : 'sfx/slot/264/264FsPlus01.mp3',
    FsPlus02            : 'sfx/slot/264/264FsPlus02.mp3',

    // popup
    MajorPopup          : 'sfx/slot/264/264MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/264/264JackpotPopup.mp3',
    FsIntro             : 'sfx/slot/264/264FsIntro.mp3',
    FsResult            : 'sfx/slot/264/264FsResult.mp3',
    LinkIntro         : 'sfx/slot/264/264LinkIntro01.mp3',
    LinkIntro02         : 'sfx/slot/264/264LinkIntro02.mp3',
    LinkIntro03         : 'sfx/slot/264/264LinkIntro03.mp3',
    LinkResult          : 'sfx/slot/264/264LinkResult.mp3',

    // symbol
    DLocking            : 'sfx/slot/264/264DLocking.mp3',
    JLocking            : 'sfx/slot/264/264JLocking.mp3',
    LinkMatch           : 'sfx/slot/264/264LMatch.mp3',

    //POT
    PotOpen             : 'sfx/slot/264/264PotOpen.mp3',
    PotPre              : 'sfx/slot/264/264PotPre.mp3',
    PotTrail            : 'sfx/slot/264/264PotTrail.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/264/264JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/264/264JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/264/264JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/264/264JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/264/264JVoice05.mp3',

    LinkSum2             : 'sfx/slot/264/264LinkSum02.mp3',
    FsJMatch             : 'sfx/slot/264/264FsJMatch.mp3',
};
window.g_sndSlot264 = ResPack.create( 'sndSlot264', sndSlot264 ).concat( g_sfxSlotCommon );

window.sndSlot265 = {
    // intro
    Intro: 'sfx/slot/265/265Intro.mp3',

    // bgm
    NormalBgm: 'sfx/slot/265/265Bgm.mp3',
    FreeBgm: 'sfx/slot/265/265FsBgm.mp3',
    LinkBgm: 'sfx/slot/265/265LinkBgm.mp3',
    BonusBgm: 'sfx/slot/265/265BoBgm.mp3',

    // normal spin
    Spin: 'sfx/slot/265/265Spin.mp3',
    ReelStop: 'sfx/slot/265/265ReelStop.mp3',
    FsReelStop: 'sfx/slot/265/265FsReelStop.mp3',

    // pay
    MPayCount: 'sfx/slot/265/265MPayCount.mp3',
    NPayCount01: 'sfx/slot/265/265NPayCount01.mp3',
    NPayCount01End: 'sfx/slot/265/265NPayCount01End.mp3',
    NPayCount02: 'sfx/slot/265/265NPayCount02.mp3',
    NPayCount02End: 'sfx/slot/265/265NPayCount02End.mp3',
    NPayCount03: 'sfx/slot/265/265NPayCount03.mp3',
    NPayCount03End: 'sfx/slot/265/265NPayCount03End.mp3',

    // popup
    MajorwinPopup: 'sfx/slot/265/265MajorPopup.mp3',
    JackpotPopup: 'sfx/slot/265/265JackpotPopup.mp3',

    // jackpot
    JackpotBoost: 'sfx/slot/265/265JackpotBoost.mp3',

    // pot
    PotTrail: 'sfx/slot/265/265PotTrail.mp3',
    PotPre: 'sfx/slot/265/265PotPre.mp3',
    PotOpen: 'sfx/slot/265/265PotOpen.mp3',

    // gauge
    Guage01: 'sfx/slot/265/265Guage01.mp3',
    Guage02: 'sfx/slot/265/265Guage02.mp3',

    // betting
    BetLimitOver: 'sfx/slot/265/265Unlock.mp3',

    // free spin
    FreeIntroPopup: 'sfx/slot/265/265FsIntro.mp3',
    FreeSuperIntroPopup: 'sfx/slot/265/265SuperFsIntro.mp3',
    OpenLocking: 'sfx/slot/265/265OpenLocking.mp3',
    PlusLocking: 'sfx/slot/265/265PlusLocking.mp3',
    Open: 'sfx/slot/265/265Open.mp3',
    Plus: 'sfx/slot/265/265Plus.mp3',
    FsCount: 'sfx/slot/265/265FsCount.mp3',
    FreeResultPopup: 'sfx/slot/265/265FsResult.mp3',
    FreeMultiWild: 'sfx/slot/265/265FsMultiWild.mp3',

    // bonus game
    BonusIntroPopup: 'sfx/slot/265/265BoIntro.mp3',
    BonusSuperIntroPopup: 'sfx/slot/265/265SuperBoIntro.mp3',
    BonusSymbol01: 'sfx/slot/265/265BoSymbol01.mp3',
    BonusSymbol02: 'sfx/slot/265/265BoSymbol02.mp3',
    BonusSymbol03: 'sfx/slot/265/265BoSymbol03.mp3',
    BonusSymbol04: 'sfx/slot/265/265BoSymbol04.mp3',
    BonusComplete: 'sfx/slot/265/265BoComplete.mp3',
    BonusResult: 'sfx/slot/265/265BoResult.mp3',

    // link spin
    LinkIntroPopup: 'sfx/slot/265/265LinkIntro.mp3',
    LinkSuperIntroPopup: 'sfx/slot/265/265SuperLinkIntro.mp3',
    LinkSpin: 'sfx/slot/265/265LinkSpin.mp3',
    LinkReelStop: 'sfx/slot/265/265LinkReelStop.mp3',
    LinkJackpotMatch: 'sfx/slot/265/265LinkJMatch.mp3',
    LinkReset: 'sfx/slot/265/265LinkReset.mp3',

    // link symbol locking
    SymbolLockingDP: 'sfx/slot/265/265LsymLocking01.mp3',
    SymbolLockingJP: 'sfx/slot/265/265LsymLocking02.mp3',
    SymbolLockingMulti: 'sfx/slot/265/265LsymLocking03.mp3',
    SymbolInitDP: 'sfx/slot/265/265LinkIntroSymbol01.mp3',
    SymbolInitJP: 'sfx/slot/265/265LinkIntroSymbol02.mp3',

    // link frame effects
    LinkFrame: 'sfx/slot/265/265LinkFrame.mp3',
    LinkFrameEnd: 'sfx/slot/265/265LinkFrameEnd.mp3',

    // link trail
    LinkTrail01: 'sfx/slot/265/265LinkTrail01.mp3',
    LinkTrail02: 'sfx/slot/265/265LinkTrail02.mp3',
    LinkTrail03: 'sfx/slot/265/265LinkTrail03.mp3',

    // link results
    LinkSum0: 'sfx/slot/265/265LinkSum01.mp3',
    LinkSum1: 'sfx/slot/265/265LinkSum02.mp3',
    LinkResult: 'sfx/slot/265/265LinkResult.mp3',

    // jackpot voice
    JackpotVoice0: 'sfx/slot/265/265JVoice01.mp3',
    JackpotVoice1: 'sfx/slot/265/265JVoice02.mp3',
    JackpotVoice2: 'sfx/slot/265/265JVoice03.mp3',
    JackpotVoice3: 'sfx/slot/265/265JVoice04.mp3',
    JackpotVoice4: 'sfx/slot/265/265JVoice05.mp3',
};
window.g_sndSlot265 = ResPack.create( 'sndSlot265', sndSlot265 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Legendary Vikings BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot266 = {
    Intro               : 'sfx/slot/266/266Intro.mp3',
    NormalBgm           : 'sfx/slot/266/266Bgm.mp3',
    FreeSpinBgm         : 'sfx/slot/266/266FsBgm.mp3',
    LinkBgm             : 'sfx/slot/266/266LinkBgm.mp3',

    Spin                : 'sfx/slot/266/266Spin.mp3',
    ReelStop            : 'sfx/slot/266/266ReelStop.mp3',

    MPayCount           : 'sfx/slot/266/266MPayCount.mp3',
    NPayCount01         : 'sfx/slot/266/266NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/266/266NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/266/266NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/266/266NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/266/266NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/266/266NPayCount03End.mp3',

    MajorPopup          : 'sfx/slot/266/266MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/266/266JackpotPopup.mp3',

    PotTrail            : 'sfx/slot/266/266PotTrail.mp3',
    PotOpen             : 'sfx/slot/266/266PotOpen.mp3',
    PotLevelUp          : 'sfx/slot/266/266PotPre.mp3',

    Pick01              : 'sfx/slot/266/266Select01.mp3',
    Pick02              : 'sfx/slot/266/266Select02.mp3',

    Unlock              : 'sfx/slot/266/266Unlock.mp3',
    LinkIntroDragon     : 'sfx/slot/266/266LinkIntro03.mp3',
    LinkIntroGem        : 'sfx/slot/266/266LinkIntro05.mp3',
    LinkSpin            : 'sfx/slot/266/266LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/266/266LinkReelStop.mp3',
    LinkNoti            : 'sfx/slot/266/266LinkNoti.mp3',
    LinkReset           : 'sfx/slot/266/266LinkReset.mp3',
    Bomb                : 'sfx/slot/266/266LinkFeature01.mp3',
    DirectPayCount      : 'sfx/slot/266/266LinkFeature02.mp3',
    LsymLocking01       : 'sfx/slot/266/266LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/266/266LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/266/266LsymLocking03.mp3',

    WheelOpen           : 'sfx/slot/266/266LinkWheel01.mp3',
    WheelCollect        : 'sfx/slot/266/266LinkWheel02.mp3',
    WheelJackpot        : 'sfx/slot/266/266LinkWheel03.mp3',
    WheelCollectTrail   : 'sfx/slot/266/266LinkWheel04.mp3',

    LinkSum01           : 'sfx/slot/266/266LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/266/266LinkSum02.mp3',
    LinkResult          : 'sfx/slot/266/266LinkResult.mp3',

    FsWildCreate        : 'sfx/slot/266/266FsFeautre.mp3',
    FsCount             : 'sfx/slot/266/266FsCount.mp3',
    FsResult            : 'sfx/slot/266/266FsResult.mp3',

    JVoice01            : 'sfx/slot/266/266JVoice01.mp3',
    JVoice02            : 'sfx/slot/266/266JVoice02.mp3',
    JVoice03            : 'sfx/slot/266/266JVoice03.mp3',
    JVoice04            : 'sfx/slot/266/266JVoice04.mp3',
    JVoice05            : 'sfx/slot/266/266JVoice05.mp3',

    // 추가 사운드
    AwardIntro1         : 'sfx/slot/266/266Feature01.mp3',
    AwardIntro2         : 'sfx/slot/266/266Feature02.mp3',
    AwardIntro3         : 'sfx/slot/266/266Feature03.mp3',
    PotGauge1           : 'sfx/slot/266/266Guage01.mp3',
    ChangeSuperPot      : 'sfx/slot/266/266Guage02.mp3',
    SuperPotOpen        : 'sfx/slot/266/266PotOpen02.mp3'
};
window.g_sndSlot266 = ResPack.create('sndSlot266', sndSlot266).concat(g_sfxSlotCommon);

window.sndSlot267 = {
    // intro
    Intro               : 'sfx/slot/267/267Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/267/267Bgm.mp3',
    FsBgm               : 'sfx/slot/267/267FsBgm.mp3',
    LinkBgm             : 'sfx/slot/267/267LinkBgm.mp3',

    Spin                : 'sfx/slot/267/267Spin.mp3',
    ReelStop            : 'sfx/slot/267/267ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/267/267MPayCount.mp3',
    NPayCount01         : 'sfx/slot/267/267NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/267/267NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/267/267NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/267/267NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/267/267NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/267/267NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/267/267MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/267/267JackpotPopup.mp3',

    // normal
    PotTrail            : 'sfx/slot/267/267PotTrail.mp3',
    PotOpen             : 'sfx/slot/267/267PotOpen.mp3',

    SLocking01          : 'sfx/slot/267/267SLocking01.mp3',
    SLocking02          : 'sfx/slot/267/267SLocking02.mp3',
    SLocking03          : 'sfx/slot/267/267SLocking03.mp3',
    SLocking04          : 'sfx/slot/267/267SLocking04.mp3',
    SLocking05          : 'sfx/slot/267/267SLocking05.mp3',
    LLocking01          : 'sfx/slot/267/267LLocking01.mp3',
    LLocking02          : 'sfx/slot/267/267LLocking02.mp3',
    JLocking            : 'sfx/slot/267/267JLocking.mp3',
    CLocking            : 'sfx/slot/267/267CLocking.mp3',
    SMatch              : 'sfx/slot/267/267SMatch.mp3',
    LMatch              : 'sfx/slot/267/267LMatch.mp3',
    Select01            : 'sfx/slot/267/267Select01.mp3',
    Select02            : 'sfx/slot/267/267Select02.mp3',
    Surprise01          : 'sfx/slot/267/267Surprise01.mp3',
    Surprise02          : 'sfx/slot/267/267Surprise02.mp3',
    LongSpin            : 'sfx/slot/267/267LongSpin.mp3',
    Unlock              : 'sfx/slot/267/267Unlock.mp3',

    // link
    LinkMatch           : 'sfx/slot/267/267LinkMatch.mp3',
    LinkIntro           : 'sfx/slot/267/267LinkIntro.mp3',
    SuperLinkIntro      : 'sfx/slot/267/267SuperLinkIntro.mp3',
    LinkSpin            : 'sfx/slot/267/267LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/267/267LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/267/267LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/267/267LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/267/267LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/267/267LsymLocking03.mp3',
    LinkOpen01          : 'sfx/slot/267/267LinkOpen01.mp3',
    LinkOpen02          : 'sfx/slot/267/267LinkOpen02.mp3',
    LinkFull            : 'sfx/slot/267/267LinkFull.mp3',
    LinkWheel01         : 'sfx/slot/267/267LinkWheel01.mp3',
    LinkWheel02         : 'sfx/slot/267/267LinkWheel02.mp3',
    LinkWheel03         : 'sfx/slot/267/267LinkWheel03.mp3',
    LinkWheel04         : 'sfx/slot/267/267LinkWheel04.mp3',
    LinkWheel05         : 'sfx/slot/267/267LinkWheel05.mp3',
    LinkSum01           : 'sfx/slot/267/267LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/267/267LinkSum02.mp3',
    LinkResult          : 'sfx/slot/267/267LinkResult.mp3',

    // free
    FsIntro             : 'sfx/slot/267/267FsIntro.mp3',
    FsWild              : 'sfx/slot/267/267FsWild.mp3',
    FsWildLocking       : 'sfx/slot/267/267FsWildLocking.mp3',
    FsCount             : 'sfx/slot/267/267FsCount.mp3',
    FsResult            : 'sfx/slot/267/267FsResult.mp3',

    // jackpot Voice
    JackpotBoost        : 'sfx/slot/267/267JackpotBoost.mp3',
    JackpotVoice0       : 'sfx/slot/267/267JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/267/267JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/267/267JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/267/267JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/267/267JVoice05.mp3',
};
window.g_sndSlot267 = ResPack.create( 'sndSlot267', sndSlot267 ).concat( g_sfxSlotCommon );

window.sndSlot268 = {
    // intro
    Intro               : 'sfx/slot/268/268Intro.mp3',

    // bgm
    NormalBgm                 : 'sfx/slot/268/268Bgm.mp3',
    MiniBgm             : 'sfx/slot/268/268MiniBgm.mp3',
    FreeBgm              : 'sfx/slot/268/268PotBgm.mp3',
    ReBgm               : 'sfx/slot/268/268ReBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/268/268Spin.mp3',
    ReelStop            : 'sfx/slot/268/268ReelStop.mp3',
    LongSpin            : 'sfx/slot/268/268LongSpin.mp3',

    // pay
    MPayCount           : 'sfx/slot/268/268MPayCount.mp3',
    NPayCount01         : 'sfx/slot/268/268NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/268/268NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/268/268NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/268/268NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/268/268NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/268/268NPayCount03End.mp3',

    // popup
    MajorPopup          : 'sfx/slot/268/268MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/268/268JackpotPopup.mp3',
    LinkMatch           : 'sfx/slot/268/268MiniIntro.mp3',
    FsIntro            : 'sfx/slot/268/268PotIntro.mp3',
    SuperPotIntro       : 'sfx/slot/268/268SuperPotIntro.mp3',
    FsResult           : 'sfx/slot/268/268PotResult.mp3',

    // betting
    ChangeBet           : 'sfx/slot/268/268BetChange.mp3',
    MapUnlock              : 'sfx/slot/268/268Unlock.mp3',

    // POT
    PotTrail            : 'sfx/slot/268/268PotTrail.mp3',
    PotPre              : 'sfx/slot/268/268PotPre.mp3',
    PotOpen             : 'sfx/slot/268/268PotOpen.mp3',
    PotGuage            : 'sfx/slot/268/268PotGuage.mp3',

    // extra feature
    RespinShake         : 'sfx/slot/268/268RespinShake.mp3',
    ExtraJackpotLock    : 'sfx/slot/268/268ExtraJackpotLock.mp3',
    ExtraDirectpayLock  : 'sfx/slot/268/268ExtraDirectpayLock.mp3',
    ExtraMinigameLock   : 'sfx/slot/268/268ExtraMinigameLock.mp3',
    ExtraSymPay         : 'sfx/slot/268/268ExtraSymPay.mp3',
    MMatch              : 'sfx/slot/268/268MMatch.mp3',
    Back                : 'sfx/slot/268/268Back.mp3',

    // pannel
    PannelOn            : 'sfx/slot/268/268PannelOn.mp3',
    PannelSum           : 'sfx/slot/268/268PannelSum.mp3',
    PannelOff           : 'sfx/slot/268/268PannelOff.mp3',

    // link (minigame)
    LinkSpin            : 'sfx/slot/268/268LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/268/268LinkReelStop.mp3', // 2688LinkReelStop -> 268LinkReelStop
    LsymLocking01       : 'sfx/slot/268/268LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/268/268LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/268/268LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/268/268LsymLocking04.mp3',
    LDia01              : 'sfx/slot/268/268LDia01.mp3',
    LDia02              : 'sfx/slot/268/268LDia02.mp3',
    LDia03              : 'sfx/slot/268/268LDia03.mp3',
    LTrail01            : 'sfx/slot/268/268LTrail01.mp3',
    LTrail02            : 'sfx/slot/268/268LTrail02.mp3',
    LTrail03            : 'sfx/slot/268/268LTrail03.mp3',
    LTrail04            : 'sfx/slot/268/268LTrail04.mp3',
    MiniWild01          : 'sfx/slot/268/268MiniWild01.mp3',
    MiniWild02          : 'sfx/slot/268/268MiniWild02.mp3',
    MiniWild03          : 'sfx/slot/268/268MiniWild03.mp3',
    MiniWild04          : 'sfx/slot/268/268MiniWild04.mp3',

    // map
    MapClick            : 'sfx/slot/268/268MapClick.mp3',
    MapOpen             : 'sfx/slot/268/268MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/268/268MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/268/268MapSuperbonusGauge.mp3',

    // voice
    JVoice01            : 'sfx/slot/268/268JVoice01.mp3',
    JVoice02            : 'sfx/slot/268/268JVoice02.mp3',
    JVoice03            : 'sfx/slot/268/268JVoice03.mp3',
    JVoice04            : 'sfx/slot/268/268JVoice04.mp3',
    JVoice05            : 'sfx/slot/268/268JVoice05.mp3',
    MiniVoice01         : 'sfx/slot/268/268MiniVoice01.mp3',
    MiniVoice02         : 'sfx/slot/268/268MiniVoice02.mp3',
    MiniVoice03         : 'sfx/slot/268/268MiniVoice03.mp3',
    MiniVoice04         : 'sfx/slot/268/268MiniVoice04.mp3',
    SymVoice01          : 'sfx/slot/268/268SymVoice01.mp3',
    SymVoice02          : 'sfx/slot/268/268SymVoice02.mp3',
    SymVoice03          : 'sfx/slot/268/268SymVoice03.mp3',
};
window.g_sndSlot268 = ResPack.create( 'sndSlot268', sndSlot268 ).concat( g_sfxSlotCommon );

window.sndSlot269 = {
    // 1. Intro & BGM
    Intro: 'sfx/slot/269/269Intro.mp3',
    NormalBgm: 'sfx/slot/269/269Bgm.mp3',
    FreeBgm: 'sfx/slot/269/269FsBgm.mp3',
    LinkBgm: 'sfx/slot/269/269LinkBgm.mp3',
    BonusBgm: 'sfx/slot/269/269BoBgm.mp3',

    // 2. Spin & Reel
    Spin: 'sfx/slot/269/269Spin.mp3',
    ReelStop: 'sfx/slot/269/269ReelStop.mp3',
    LongSpin: 'sfx/slot/269/269LongSpin.mp3',

    // 3. Pay & Count
    MPayCount: 'sfx/slot/269/269MPayCount.mp3',
    NPayCount01: 'sfx/slot/269/269NPayCount01.mp3',
    NPayCount01End: 'sfx/slot/269/269NPayCount01End.mp3',
    NPayCount02: 'sfx/slot/269/269NPayCount02.mp3',
    NPayCount02End: 'sfx/slot/269/269NPayCount02End.mp3',
    NPayCount03: 'sfx/slot/269/269NPayCount03.mp3',
    NPayCount03End: 'sfx/slot/269/269NPayCount03End.mp3',

    // 4. Popup & Common UI
    MajorwinPopup: 'sfx/slot/269/269MajorPopup.mp3',
    JackpotPopup: 'sfx/slot/269/269JackpotPopup.mp3',
    BetLimitOver: 'sfx/slot/269/269Unlock.mp3',

    // 5. Environment & Object
    Wind: 'sfx/slot/269/269Wind.mp3',
    PotOpen: 'sfx/slot/269/269DoorOpen.mp3',

    // 6. Base Game Symbol Action
    SLocking1: 'sfx/slot/269/269SLocking01.mp3',
    SLocking2: 'sfx/slot/269/269SLocking02.mp3',
    SLocking3: 'sfx/slot/269/269SLocking03.mp3',

    LLocking0: 'sfx/slot/269/269LLocking01.mp3',
    LLocking1: 'sfx/slot/269/269LLocking02.mp3',
    LLocking2: 'sfx/slot/269/269LLocking03.mp3',
    LLocking3: 'sfx/slot/269/269LLocking04.mp3',
    LLocking4: 'sfx/slot/269/269LLocking05.mp3',

    SMatch: 'sfx/slot/269/269SMatch.mp3',
    LMatch01: 'sfx/slot/269/269LMatch01.mp3',
    LMatch02: 'sfx/slot/269/269LMatch02.mp3',
    LMatch03: 'sfx/slot/269/269LMatch03.mp3',
    LMatch04: 'sfx/slot/269/269LMatch04.mp3',
    LMatch05: 'sfx/slot/269/269LMatch05.mp3',

    // 7. Bonus Game (Bo)
    BonusIntro: 'sfx/slot/269/269BoIntro.mp3',
    BonusMatch01: 'sfx/slot/269/269Bomatch01.mp3',
    BonusMatch02: 'sfx/slot/269/269Bomatch02.mp3',
    BonusMatch03: 'sfx/slot/269/269Bomatch03.mp3',
    BonusMatch04: 'sfx/slot/269/269Bomatch04.mp3',
    BonusMatch05: 'sfx/slot/269/269Bomatch05.mp3',
    BonusOut: 'sfx/slot/269/269BoOut.mp3',
    BonusPopup1: 'sfx/slot/269/269GrandOpen01.mp3',
    BonusPopup2: 'sfx/slot/269/269GrandOpen02.mp3',
    BonusPopup3: 'sfx/slot/269/269GrandOpen03.mp3',
    BonusPopup4: 'sfx/slot/269/269GrandOpen04.mp3',

    // 8. Link Feature
    LinkIntroPopup: 'sfx/slot/269/269LinkIntro01.mp3',
    LinkIntro02: 'sfx/slot/269/269LinkIntro02.mp3',
    LinkSpin: 'sfx/slot/269/269LinkSpin.mp3',
    LinkReelStop: 'sfx/slot/269/269LinkReelStop.mp3',
    LinkReset: 'sfx/slot/269/269LinkReset.mp3',
    LinkLine1: 'sfx/slot/269/269LinkLine01.mp3',
    LinkLine2: 'sfx/slot/269/269LinkLine02.mp3',

    // Link Symbol Locking
    LinkSymLocking01: 'sfx/slot/269/269LsymLocking01.mp3',
    LinkSymLocking02: 'sfx/slot/269/269LsymLocking02.mp3',
    LinkSymLocking03: 'sfx/slot/269/269LsymLocking03.mp3',

    // Link Specific Actions (Unlock, Bingo, Sum)
    LinkUnlock01: 'sfx/slot/269/269LinkUnlock01.mp3',
    LinkUnlock02: 'sfx/slot/269/269LinkUnlock02.mp3',
    LinkUnlock03: 'sfx/slot/269/269LinkUnlock03.mp3',
    LinkUnlock04: 'sfx/slot/269/269LinkUnlock04.mp3',
    LinkBingo01: 'sfx/slot/269/269LinkBingo01.mp3',
    LinkBingo02: 'sfx/slot/269/269LinkBingo02.mp3',
    LinkSum01: 'sfx/slot/269/269LinkSum01.mp3',
    LinkSum02: 'sfx/slot/269/269LinkSum02.mp3',
    LinkResultPopup: 'sfx/slot/269/269LinkResult.mp3',

    // 9. Free Spin
    FreeIntroPopup: 'sfx/slot/269/269FsIntro.mp3',
    FreeReIntroPopup: 'sfx/slot/269/269Retrigger.mp3',
    FreeFrame: 'sfx/slot/269/269FsFrame.mp3',
    FsCount: 'sfx/slot/269/269FsCount.mp3',
    FreeResultPopup: 'sfx/slot/269/269FsResult.mp3',

    // 10. Jackpot Voices
    JackpotVoice0: 'sfx/slot/269/269JVoice01.mp3',
    JackpotVoice1: 'sfx/slot/269/269JVoice02.mp3',
    JackpotVoice2: 'sfx/slot/269/269JVoice03.mp3',
    JackpotVoice3: 'sfx/slot/269/269JVoice04.mp3',
    JackpotVoice4: 'sfx/slot/269/269JVoice05.mp3',
};
window.g_sndSlot269 = ResPack.create('sndSlot269', sndSlot269).concat(g_sfxSlotCommon);

//-- ↑↑↑ Golden Kio BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot270 = {
    // 1. BGM & Intro
    Intro               : 'sfx/slot/270/270Intro.mp3',
    NormalBgm           : 'sfx/slot/270/270Bgm.mp3',
    FreeSpinBgm         : 'sfx/slot/270/270FsBgm.mp3',

    // 2. 기본 연출 (Spin, Reel, Unlock)
    Spin                : 'sfx/slot/270/270Spin.mp3',
    ReelStop            : 'sfx/slot/270/270ReelStop.mp3',
    Unlock              : 'sfx/slot/270/270Unlock.mp3',

    // 3. Pay Count (Win Sounds)
    MPayCount           : 'sfx/slot/270/270MPayCount.mp3',
    NPayCount01         : 'sfx/slot/270/270NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/270/270NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/270/270NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/270/270NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/270/270NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/270/270NPayCount03End.mp3',

    // 4. Popups
    MajorPopup          : 'sfx/slot/270/270MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/270/270JackpotPopup.mp3',

    // 5. Locking (심볼 잠금 연출)
    CLocking01          : 'sfx/slot/270/270CLocking01.mp3',
    CLocking02          : 'sfx/slot/270/270CLocking02.mp3',
    CLocking03          : 'sfx/slot/270/270CLocking03.mp3',
    CLocking04          : 'sfx/slot/270/270CLocking04.mp3',
    CLocking05          : 'sfx/slot/270/270CLocking05.mp3',
    JLocking            : 'sfx/slot/270/270JLocking.mp3',
    FLocking            : 'sfx/slot/270/270FLocking.mp3',

    // 6. Pot & Coin (수집 및 팟 연출)
    PotTrail01          : 'sfx/slot/270/270PotTrail01.mp3',
    PotTrail02          : 'sfx/slot/270/270PotTrail02.mp3',
    PotTrail03          : 'sfx/slot/270/270PotTrail03.mp3',
    PotOpen01           : 'sfx/slot/270/270PotOpen01.mp3',
    PotOpen02           : 'sfx/slot/270/270PotOpen02.mp3',
    Coin01              : 'sfx/slot/270/270Coin01.mp3',
    Coin02              : 'sfx/slot/270/270Coin02.mp3',
    Coin03              : 'sfx/slot/270/270Coin03.mp3',
    Coin04              : 'sfx/slot/270/270Coin04.mp3',

    // 7. FreeSpin Feature (프리스핀 전용)
    FsIntro             : 'sfx/slot/270/270FsIntro.mp3',
    SuperFsIntro        : 'sfx/slot/270/270SuperFsIntro.mp3',
    FsSymLocking        : 'sfx/slot/270/270FsSymLocking.mp3',
    FsSymMatch          : 'sfx/slot/270/270FsSymMatch.mp3',
    FsPotOpen           : 'sfx/slot/270/270FsPotOpen.mp3',
    FsCount             : 'sfx/slot/270/270FsCount.mp3',
    FsResult            : 'sfx/slot/270/270FsResult.mp3',
    FsPotTrail          : 'sfx/slot/270/270FsPotTrail.mp3',

    // 8. Map Feature (맵 게이지 등)
    MapOpen             : 'sfx/slot/270/270MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/270/270MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/270/270MapSuperbonusGauge.mp3',

    // 9. Voices (파일명에 269가 포함된 부분 유지)
    JVoice01            : 'sfx/slot/270/270JVoice01.mp3',
    JVoice02            : 'sfx/slot/270/270JVoice02.mp3',
    JVoice03            : 'sfx/slot/270/270JVoice03.mp3',
    JVoice04            : 'sfx/slot/270/270JVoice04.mp3',
    JVoice05            : 'sfx/slot/270/270JVoice05.mp3'
};
window.g_sndSlot270 = ResPack.create('sndSlot270', sndSlot270).concat(g_sfxSlotCommon);

window.sndSlot272 = {
    // intro
    Intro               : 'sfx/slot/272/272Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/272/272Bgm.mp3',
    LinkBgm             : 'sfx/slot/272/272LinkBgm.mp3',
    MiniBgm             : 'sfx/slot/272/272MiniBgm.mp3',

    Spin                : 'sfx/slot/272/272Spin.mp3',
    ReelStop            : 'sfx/slot/272/272ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/272/272MPayCount.mp3',
    NPayCount01         : 'sfx/slot/272/272NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/272/272NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/272/272NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/272/272NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/272/272NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/272/272NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/272/272MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/272/272JackpotPopup.mp3',

    // normal
    PotOpen01           : 'sfx/slot/272/272PotOpen01.mp3',
    PotOpen02           : 'sfx/slot/272/272PotOpen02.mp3',
    PotTrail01          : 'sfx/slot/272/272PotTrail01.mp3',
    PotTrail02          : 'sfx/slot/272/272PotTrail02.mp3',
    PotPre              : 'sfx/slot/272/272PotPre.mp3',
    Unlock              : 'sfx/slot/272/272Unlock.mp3',

    // mini game.
    MiniIntro           : 'sfx/slot/272/272MiniIntro.mp3',
    MiniWild01          : 'sfx/slot/272/272MiniWild01.mp3',
    MiniWild02          : 'sfx/slot/272/272MiniWild02.mp3',
    MiniWild03          : 'sfx/slot/272/272MiniWild03.mp3',
    MiniTransform01     : 'sfx/slot/272/272MiniTransform01.mp3',
    MiniTransform02     : 'sfx/slot/272/272MiniTransform02.mp3',
    MiniTransform03     : 'sfx/slot/272/272MiniTransform03.mp3',
    MiniCoin01          : 'sfx/slot/272/272MiniCoin01.mp3',
    MiniCoin02          : 'sfx/slot/272/272MiniCoin02.mp3',
    MiniCoin03          : 'sfx/slot/272/272MiniCoin03.mp3',
    MiniMulti01         : 'sfx/slot/272/272MiniMulti01.mp3',
    MiniMulti02         : 'sfx/slot/272/272MiniMulti02.mp3',
    MiniMulti03         : 'sfx/slot/272/272MiniMulti03.mp3',
    MiniMulti04         : 'sfx/slot/272/272MiniMulti04.mp3',
    MiniMulti05         : 'sfx/slot/272/272MiniMulti05.mp3',
    MiniMulti06         : 'sfx/slot/272/272MiniMulti06.mp3',
    MiniCount           : 'sfx/slot/272/272MiniCount.mp3',

    // link
    LinkIntro           : 'sfx/slot/272/272LinkIntro.mp3',
    SuperLinkIntro      : 'sfx/slot/272/272SuperLinkIntro.mp3',
    LinkIntroSym        : 'sfx/slot/272/272LinkIntroSym.mp3',
    LinkSpin            : 'sfx/slot/272/272LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/272/272LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/272/272LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/272/272LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/272/272LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/272/272LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/272/272LsymLocking04.mp3',
    LinkMatch01         : 'sfx/slot/272/272LinkMatch01.mp3',
    LinkMatch02         : 'sfx/slot/272/272LinkMatch02.mp3',
    LinkMatch03         : 'sfx/slot/272/272LinkMatch03.mp3',
    LinkMatch04         : 'sfx/slot/272/272LinkMatch04.mp3',
    LinkSum01           : 'sfx/slot/272/272LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/272/272LinkSum02.mp3',
    LinkResult          : 'sfx/slot/272/272LinkResult.mp3',

    // map
    MapOpen             : 'sfx/slot/272/272MapOpen.mp3',
    MapNormalGauge      : 'sfx/slot/272/272MapNormalGauge.mp3',
    MapSuperbonusGauge  : 'sfx/slot/272/272MapSuperbonusGauge.mp3',

    // select
    GameMenu01          : 'sfx/slot/272/272GameMenu01.mp3',
    GameMenu02          : 'sfx/slot/272/272GameMenu02.mp3',
    GameMenu03          : 'sfx/slot/272/272GameMenu03.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/272/272JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/272/272JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/272/272JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/272/272JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/272/272JVoice05.mp3',

    // mini voice
    MiniVoice0             : 'sfx/slot/272/272MVoice01.mp3',
    MiniVoice1             : 'sfx/slot/272/272MVoice02.mp3',
    MiniVoice2             : 'sfx/slot/272/272MVoice03.mp3',
    MiniVoice3             : 'sfx/slot/272/272MVoice04.mp3',
};
window.g_sndSlot272 = ResPack.create( 'sndSlot272', sndSlot272 ).concat( g_sfxSlotCommon );

window.sndSlot271 = {
    // 1. Intro & BGM
    Intro: 'sfx/slot/271/271Intro.mp3',
    NormalBgm: 'sfx/slot/271/271Bgm.mp3',
    FreeBgm: 'sfx/slot/271/271FsBgm.mp3',
    LinkBgm: 'sfx/slot/271/271LinkBgm.mp3',
    PickBgm: 'sfx/slot/271/271PickBgm.mp3',
    WheelBgm: 'sfx/slot/271/271WheelBgm.mp3',

    // 2. Spin & Reel
    Spin: 'sfx/slot/271/271Spin.mp3',
    ReelStop: 'sfx/slot/271/271ReelStop.mp3',
    LongSpin: 'sfx/slot/271/271LongSpin.mp3',

    // 3. Pay & Count
    MPayCount: 'sfx/slot/271/271MPayCount.mp3',
    NPayCount01: 'sfx/slot/271/271NPayCount01.mp3',
    NPayCount01End: 'sfx/slot/271/271NPayCount01End.mp3',
    NPayCount02: 'sfx/slot/271/271NPayCount02.mp3',
    NPayCount02End: 'sfx/slot/271/271NPayCount02End.mp3',
    NPayCount03: 'sfx/slot/271/271NPayCount03.mp3',
    NPayCount03End: 'sfx/slot/271/271NPayCount03End.mp3',

    // 4. Popup & UI
    MajorwinPopup: 'sfx/slot/271/271MajorPopup.mp3',
    JackpotPopup: 'sfx/slot/271/271JackpotPopup.mp3',
    BetLimitOver: 'sfx/slot/271/271Unlock.mp3', // Unlock

    // 5. Pot & Base Action
    PotTrail: 'sfx/slot/271/271PotTrail.mp3',
    PotPre: 'sfx/slot/271/271PotPre.mp3',
    //PotOpen: 'sfx/slot/271/271PotOpen01.mp3',
    BlockBreak: 'sfx/slot/271/271Break.mp3',

    // 6. Base Symbol Locking ()
    DpLocking0: 'sfx/slot/271/271DLocking01.mp3',
    DpLocking1: 'sfx/slot/271/271DLocking02.mp3',
    DpLocking2: 'sfx/slot/271/271DLocking03.mp3',
    DpLocking3: 'sfx/slot/271/271DLocking04.mp3',
    DpLocking4: 'sfx/slot/271/271DLocking05.mp3',
    //JpLocking: 'sfx/slot/271/271JLocking.mp3',
    LinkMatch: 'sfx/slot/271/271LMatch.mp3', // Base game link match

    // 7. Link Feature (General)
    LinkIntroPopup: 'sfx/slot/271/271LinkIntro.mp3',
    LinkSpin: 'sfx/slot/271/271LinkSpin.mp3',
    LinkReelStop: 'sfx/slot/271/271LinkReelStop.mp3',
    LinkReset: 'sfx/slot/271/271LinkReset.mp3',

    // 8. Link Symbol Action (Locking & Match)
    LinkSymLocking01: 'sfx/slot/271/271LsymLocking01.mp3',
    LinkSymLocking02: 'sfx/slot/271/271LsymLocking02.mp3',
    LinkSymLocking03: 'sfx/slot/271/271LsymLocking03.mp3',
    LinkSymLocking04: 'sfx/slot/271/271LsymLocking04.mp3',
    LinkSymMatch01: 'sfx/slot/271/271LsymMatch01.mp3',
    LinkSymMatch02: 'sfx/slot/271/271LsymMatch02.mp3',
    LinkSymMatch03: 'sfx/slot/271/271LsymMatch03.mp3',

    // 9. Link Split Feature (271 Unique)
    //LinkSplit01: 'sfx/slot/271/271LinkSplit01.mp3',
    LinkSplit02: 'sfx/slot/271/271LinkSplit02.mp3',
    LinkSplit03: 'sfx/slot/271/271LinkSplit03.mp3',
    LinkSplit04: 'sfx/slot/271/271LinkSplit04.mp3',
    LinkSplit05: 'sfx/slot/271/271LinkSplit05.mp3',
    LinkSplit06: 'sfx/slot/271/271LinkSplit06.mp3',
    LinkSplit07: 'sfx/slot/271/271LinkSplit07.mp3',

    // 10. Link Result
    LinkSum01: 'sfx/slot/271/271LinkSum01.mp3',
    LinkSum02: 'sfx/slot/271/271LinkSum02.mp3',
    LinkResultPopup: 'sfx/slot/271/271LinkResult.mp3',

    // 11. Free Spin (Mystery Frame)
    FreeIntroPopup: 'sfx/slot/271/271FsIntro.mp3',
    FreeFrame01: 'sfx/slot/271/271FsFrame01.mp3',
    FreeFrame02: 'sfx/slot/271/271FsFrame02.mp3',
    FsCount: 'sfx/slot/271/271FsCount.mp3',
    FreeResultPopup: 'sfx/slot/271/271FsResult.mp3',

    // 12. Pick Game Feature
    PickIntroPopup: 'sfx/slot/271/271PickIntro.mp3',
    Pick01: 'sfx/slot/271/271Pick01.mp3',
    Pick02: 'sfx/slot/271/271Pick02.mp3',
    Pick03: 'sfx/slot/271/271Pick03.mp3',
    Pick04: 'sfx/slot/271/271Pick04.mp3',
    Pick05: 'sfx/slot/271/271Pick05.mp3',
    PickMatch01: 'sfx/slot/271/271PickMatch01.mp3',
    PickMatch02: 'sfx/slot/271/271PickMatch02.mp3',
    PickMatch03: 'sfx/slot/271/271PickMatch03.mp3',
    PickUnlock01: 'sfx/slot/271/271PickUnlock01.mp3',
    PickUnlock02: 'sfx/slot/271/271PickUnlock02.mp3',

    // Pick Game Internal Wheel
    PickWheel01: 'sfx/slot/271/271PickWheel01.mp3',
    PickWheel02: 'sfx/slot/271/271PickWheel02.mp3',
    PickWheel03: 'sfx/slot/271/271PickWheel03.mp3',
    PickWheel04: 'sfx/slot/271/271PickWheel04.mp3',
    PickWheel05: 'sfx/slot/271/271PickWheel05.mp3', //?

    PickCount: 'sfx/slot/271/271PickCount.mp3',
    PickSum01: 'sfx/slot/271/271PickSum01.mp3',
    PickSum02: 'sfx/slot/271/271PickSum02.mp3',
    PickResultPopup: 'sfx/slot/271/271PickResult.mp3',

    // 13. Pot Wheel Feature
    HonestPotOpen: 'sfx/slot/271/271PotOpen02.mp3',
    Wheel01: 'sfx/slot/271/271Wheel01.mp3',
    Wheel02: 'sfx/slot/271/271Wheel02.mp3',
    Wheel03: 'sfx/slot/271/271Wheel03.mp3',
    Wheel04: 'sfx/slot/271/271Wheel04.mp3', //안 씀

    // 14. Jackpot Voice
    JackpotVoice0: 'sfx/slot/271/271JVoice01.mp3',
    JackpotVoice1: 'sfx/slot/271/271JVoice02.mp3',
    JackpotVoice2: 'sfx/slot/271/271JVoice03.mp3',
    JackpotVoice3: 'sfx/slot/271/271JVoice04.mp3',
    JackpotVoice4: 'sfx/slot/271/271JVoice05.mp3',
};
window.g_sndSlot271 = ResPack.create( 'sndSlot271', sndSlot271 ).concat( g_sfxSlotCommon );

window.sndSlot273 = {
    // intro
    Intro               : 'sfx/slot/273/273Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/273/273Bgm.mp3',
    LinkBgm             : 'sfx/slot/273/273LinkBgm.mp3',
    WheelBgm            : 'sfx/slot/273/273WheelBgm.mp3',
    PickBgm             : 'sfx/slot/273/273PickBgm.mp3',

    // normal spin
    Spin                : 'sfx/slot/273/273Spin.mp3',
    ReelStop            : 'sfx/slot/273/273ReelStop.mp3',
    Unlock              : 'sfx/slot/273/273Unlock.mp3',
    Locking             : 'sfx/slot/273/273Locking.mp3',

    // pay
    MPayCount           : 'sfx/slot/273/273MPayCount.mp3',
    NPayCount01         : 'sfx/slot/273/273NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/273/273NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/273/273NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/273/273NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/273/273NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/273/273NPayCount03End.mp3',

    // popup
    MajorPopup          : 'sfx/slot/273/273MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/273/273JackpotPopup.mp3',

    // POT / Trail
    Trail01             : 'sfx/slot/273/273Trail01.mp3',
    Trail02             : 'sfx/slot/273/273Trail02.mp3',
    PotOpen           : 'sfx/slot/273/273PotOpen01.mp3',
    PotOpen02           : 'sfx/slot/273/273PotOpen02.mp3',
    PotPre              : 'sfx/slot/273/273PotPre.mp3',
    PotMenu01           : 'sfx/slot/273/273PotMenu01.mp3',
    PotMenu02           : 'sfx/slot/273/273PotMenu02.mp3',
    PotMenu03           : 'sfx/slot/273/273PotMenu03.mp3',
    TipOver             : 'sfx/slot/273/273TipOver.mp3',

    // link feature
    LinkIntro           : 'sfx/slot/273/273LinkIntro.mp3',
    LinkSpin            : 'sfx/slot/273/273LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/273/273LinkReelstop.mp3',
    LinkCount01         : 'sfx/slot/273/273LinkCount01.mp3',
    LinkCount02         : 'sfx/slot/273/273LinkCount02.mp3',
    LinkResult          : 'sfx/slot/273/273LinkResult.mp3',
    LinkUnlock          : 'sfx/slot/273/273LinkUnlock.mp3',
    LinkJMatch          : 'sfx/slot/273/273LinkJMatch.mp3',
    LinkSum01           : 'sfx/slot/273/273LinkSum01.mp3',
    LinkSum02           : 'sfx/slot/273/273LinkSum02.mp3',
    LinkTrail01         : 'sfx/slot/273/273LinkTrail01.mp3',
    LinkTrail02         : 'sfx/slot/273/273LinkTrail02.mp3',

    // link symbols & effects
    Block               : 'sfx/slot/273/273Block.mp3',
    LinkDrop            : 'sfx/slot/273/273LinkDrop.mp3',
    LinkCrack           : 'sfx/slot/273/273LinkCrack.mp3',
    LsymLocking01       : 'sfx/slot/273/273LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/273/273LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/273/273LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/273/273LsymLocking04.mp3',
    LsymLocking05       : 'sfx/slot/273/273LsymLocking05.mp3',
    LsymLocking06       : 'sfx/slot/273/273LsymLocking06.mp3',

    // link utils
    LinkUtil01          : 'sfx/slot/273/273LinkUtil01.mp3',
    LinkUtil02          : 'sfx/slot/273/273LinkUtil02.mp3',
    LinkUtil03          : 'sfx/slot/273/273LinkUtil03.mp3',
    LinkUtil04          : 'sfx/slot/273/273LinkUtil04.mp3',

    // pick feature
    PickIntro           : 'sfx/slot/273/273PickIntro.mp3',
    PickNoti            : 'sfx/slot/273/273PickNoti.mp3',
    Pick01              : 'sfx/slot/273/273Pick01.mp3',
    Pick02              : 'sfx/slot/273/273Pick02.mp3',
    Pick03              : 'sfx/slot/273/273Pick03.mp3',
    Pick04              : 'sfx/slot/273/273Pick04.mp3',
    Pick05              : 'sfx/slot/273/273Pick05.mp3',
    Pick06              : 'sfx/slot/273/273Pick06.mp3',
    PlusPick            : 'sfx/slot/273/273PlusPick.mp3',
    MysteryPick01       : 'sfx/slot/273/273MysteryPick01.mp3',
    MysteryPick02       : 'sfx/slot/273/273MysteryPick02.mp3',
    BoostPick01         : 'sfx/slot/273/273BoostPick01.mp3',
    BoostPick02         : 'sfx/slot/273/273BoostPick02.mp3',
    DoublePick01        : 'sfx/slot/273/273DoublePick01.mp3',
    DoublePick02        : 'sfx/slot/273/273DoublePick02.mp3',
    PickSum01           : 'sfx/slot/273/273PickSum01.mp3',
    PickSum02           : 'sfx/slot/273/273PickSum02.mp3',
    PickResult          : 'sfx/slot/273/273PickResult.mp3',

    // bonus / wheel
    BonusIntro          : 'sfx/slot/273/273BonusIntro.mp3',
    BonusSpin01         : 'sfx/slot/273/273BonusSpin01.mp3',
    BonusSpin02         : 'sfx/slot/273/273BonusSpin02.mp3',
    BonusSpin03         : 'sfx/slot/273/273BonusSpin03.mp3',

    // jackpot voice
    JVoice01            : 'sfx/slot/273/273JVoice01.mp3',
    JVoice02            : 'sfx/slot/273/273JVoice02.mp3',
    JVoice03            : 'sfx/slot/273/273JVoice03.mp3',
    JVoice04            : 'sfx/slot/273/273JVoice04.mp3',
    JVoice05            : 'sfx/slot/273/273JVoice05.mp3',

    LinkFrame       : 'sfx/slot/273/273LinkFrame.mp3',
    LinkMulti01       : 'sfx/slot/273/273LinkMulti01.mp3',
    LinkMulti02       : 'sfx/slot/273/273LinkMulti02.mp3',

    ChangeBet           : 'sfx/slot/273/273BetChange.mp3',
};
window.g_sndSlot273 = ResPack.create( 'sndSlot273', sndSlot273 ).concat( g_sfxSlotCommon );

//-- ↑↑↑ Kings Fury BEGIN ↑↑↑ -------------------------------------------------------------------------------------//
window.sndSlot275 = {
    // 1. BGM & Intro
    Intro               : 'sfx/slot/275/275Intro.mp3',
    NormalBgm           : 'sfx/slot/275/275Bgm.mp3',
    FreeSpinBgm         : 'sfx/slot/275/275FsBgm.mp3',
    WheelBgm            : 'sfx/slot/275/275WheelBgm.mp3',

    // 2. 기본 연출 (Spin, Reel)
    Spin                : 'sfx/slot/275/275Spin.mp3',
    ReelStop            : 'sfx/slot/275/275ReelStop.mp3',
    LongSpin            : 'sfx/slot/275/275LongSpin.mp3',

    // 3. Pay Count (Win Sounds)
    MPayCount           : 'sfx/slot/275/275MPayCount.mp3',
    NPayCount01         : 'sfx/slot/275/275NPayCount01.mp3',
    NPayCount01End      : 'sfx/slot/275/275NPayCount01End.mp3',
    NPayCount02         : 'sfx/slot/275/275NPayCount02.mp3',
    NPayCount02End      : 'sfx/slot/275/275NPayCount02End.mp3',
    NPayCount03         : 'sfx/slot/275/275NPayCount03.mp3',
    NPayCount03End      : 'sfx/slot/275/275NPayCount03End.mp3',

    // 4. Popups
    MajorPopup          : 'sfx/slot/275/275MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/275/275JackpotPopup.mp3',

    // 5. Locking - Normal (스캐터, 와일드, 잭팟)
    SLocking01          : 'sfx/slot/275/275SLocking01.mp3',
    SLocking02          : 'sfx/slot/275/275SLocking02.mp3',
    SLocking03          : 'sfx/slot/275/275SLocking03.mp3',
    WLocking            : 'sfx/slot/275/275WLocking.mp3',
    JLocking            : 'sfx/slot/275/275JLocking.mp3',

    // 6. Locking - Free
    FsymLocking01       : 'sfx/slot/275/275FsymLocking01.mp3',
    FsymLocking02       : 'sfx/slot/275/275FsymLocking02.mp3',

    // 7. Match
    JMatch              : 'sfx/slot/275/275JMatch.mp3',
    SMatch              : 'sfx/slot/275/275SMatch.mp3',
    FsMatch01           : 'sfx/slot/275/275FsMatch01.mp3',
    FsMatch02           : 'sfx/slot/275/275FsMatch02.mp3',
    FsMatch03           : 'sfx/slot/275/275FsMatch03.mp3',

    // 8. Pot
    PotTrail01          : 'sfx/slot/275/275PotTrail.mp3',
    PotOpen             : 'sfx/slot/275/275PotOpen.mp3',
    PotPre              : 'sfx/slot/275/275PotPre.mp3',

    // 9. FreeSpin Feature
    FsIntro             : 'sfx/slot/275/275FsIntro.mp3',
    FsIntro02           : 'sfx/slot/275/275FsIntro02.mp3',
    FsCount             : 'sfx/slot/275/275FsCount.mp3',
    FG_Result           : 'sfx/slot/275/275FsResult.mp3',
    Unlock              : 'sfx/slot/275/275Unlock.mp3',
    Surprise            : 'sfx/slot/275/275Surprise.mp3',
    LinkSurprise        : 'sfx/slot/275/275LinkSurprise.mp3',

    // 10. Wheel Feature
    WheelIntro          : 'sfx/slot/275/275WheelIntro.mp3',
    BonusSpin01         : 'sfx/slot/275/275BonusSpin01.mp3',
    BonusSpin02         : 'sfx/slot/275/275BonusSpin02.mp3',
    BonusSpin03         : 'sfx/slot/275/275BonusSpin03.mp3',
    BonusSpin04         : 'sfx/slot/275/275BonusSpin04.mp3',
    BonusSpin05         : 'sfx/slot/275/275BonusSpin05.mp3',

    // AddSOund
    NudgeEffect         : 'sfx/slot/275/275Nudge.mp3',
    KingKongTease       : 'sfx/slot/275/275Tease.mp3',
    KingKongVoice01     : 'sfx/slot/275/275Kvoice01.mp3',
    KingKongVoice02     : 'sfx/slot/275/275Kvoice02.mp3',
    KingKongVoice03     : 'sfx/slot/275/275Kvoice03.mp3',
    FsVoice01           : 'sfx/slot/275/275FsVoice01.mp3',
    FsVoice02           : 'sfx/slot/275/275FsVoice02.mp3',
    FsVoice03           : 'sfx/slot/275/275FsVoice03.mp3',
    FsIntro03           : 'sfx/slot/275/275FsIntro03.mp3',

    // 11. Jackpot Voices
    JVoice01            : 'sfx/slot/275/275JVoice01.mp3',
    JVoice02            : 'sfx/slot/275/275JVoice02.mp3',
    JVoice03            : 'sfx/slot/275/275JVoice03.mp3',
    JVoice04            : 'sfx/slot/275/275JVoice04.mp3',
    JVoice05            : 'sfx/slot/275/275JVoice05.mp3'
};
window.g_sndSlot275 = ResPack.create('sndSlot275', sndSlot275).concat(g_sfxSlotCommon);
//-- ↓↓↓ Kings Fury END ↓↓↓ ---------------------------------------------------------------------------------------//

window.sndSlot274 = {
    // intro
    Intro               : 'sfx/slot/274/274Intro.mp3',

    // bgm
    NormalBgm           : 'sfx/slot/274/274Bgm.mp3',
    LinkBgm             : 'sfx/slot/274/274LinkBgm.mp3',
    FsBgm               : 'sfx/slot/274/274FsBgm.mp3',
    BoBgm               : 'sfx/slot/274/274BoBgm.mp3',

    Spin                : 'sfx/slot/274/274Spin.mp3',
    ReelStop            : 'sfx/slot/274/274ReelStop.mp3',

    // pay
    MPayCount           : 'sfx/slot/274/274MPayCount.mp3',
    NPayCount01         : 'sfx/slot/274/274NPayCount01.mp3',
    NPayCount02         : 'sfx/slot/274/274NPayCount02.mp3',
    NPayCount03         : 'sfx/slot/274/274NPayCount03.mp3',
    NPayCount01End      : 'sfx/slot/274/274NPayCount01End.mp3',
    NPayCount02End      : 'sfx/slot/274/274NPayCount02End.mp3',
    NPayCount03End      : 'sfx/slot/274/274NPayCount03End.mp3',

    MajorwinPopup       : 'sfx/slot/274/274MajorPopup.mp3',
    JackpotPopup        : 'sfx/slot/274/274JackpotPopup.mp3',

    // normal
    PotOpen             : 'sfx/slot/274/274PotOpen.mp3',
    PotTrail            : 'sfx/slot/274/274PotTrail.mp3',
    PotPre              : 'sfx/slot/274/274PotPre.mp3',
    Unlock              : 'sfx/slot/274/274Unlock.mp3',

    // free
    FsIntro             : 'sfx/slot/274/274FsIntro.mp3',
    FsLocking01         : 'sfx/slot/274/274FsLocking01.mp3',
    FsLocking02         : 'sfx/slot/274/274FsLocking02.mp3',
    FsFeature01         : 'sfx/slot/274/274FsFeature01.mp3',
    FsFeature02         : 'sfx/slot/274/274FsFeature02.mp3',
    FsMatch             : 'sfx/slot/274/274FsMatch.mp3',
    FsJMatch            : 'sfx/slot/274/274FsJMatch.mp3',
    FsSum01             : 'sfx/slot/274/274FsSum01.mp3',
    FsSum02             : 'sfx/slot/274/274FsSum02.mp3',
    FsCount             : 'sfx/slot/274/274FsCount.mp3',
    FsResult            : 'sfx/slot/274/274FsResult.mp3',

    // link
    LinkIntro01         : 'sfx/slot/274/274LinkIntro01.mp3',
    LinkIntro02         : 'sfx/slot/274/274LinkIntro02.mp3',
    LinkIntro03         : 'sfx/slot/274/274LinkIntro03.mp3',
    LinkSpin            : 'sfx/slot/274/274LinkSpin.mp3',
    LinkReelStop        : 'sfx/slot/274/274LinkReelStop.mp3',
    LinkReset           : 'sfx/slot/274/274LinkReset.mp3',
    LsymLocking01       : 'sfx/slot/274/274LsymLocking01.mp3',
    LsymLocking02       : 'sfx/slot/274/274LsymLocking02.mp3',
    LsymLocking03       : 'sfx/slot/274/274LsymLocking03.mp3',
    LsymLocking04       : 'sfx/slot/274/274LsymLocking04.mp3',
    LsymLocking05       : 'sfx/slot/274/274LsymLocking05.mp3',
    LsymLocking06       : 'sfx/slot/274/274LsymLocking06.mp3',
    LsymLocking07       : 'sfx/slot/274/274LsymLocking07.mp3',
    LsymMatch01         : 'sfx/slot/274/274LsymMatch01.mp3',
    LsymMatch02         : 'sfx/slot/274/274LsymMatch02.mp3',
    LsymMatch03         : 'sfx/slot/274/274LsymMatch03.mp3',
    LsymMatch04         : 'sfx/slot/274/274LsymMatch04.mp3',
    LsymMatch05         : 'sfx/slot/274/274LsymMatch05.mp3',
    LsymMatch06         : 'sfx/slot/274/274LsymMatch06.mp3',
    LinkTrail01         : 'sfx/slot/274/274LinkTrail01.mp3',
    LinkTrail02         : 'sfx/slot/274/274LinkTrail02.mp3',
    LinkTrail03         : 'sfx/slot/274/274LinkTrail03.mp3',
    LinkUnlock01        : 'sfx/slot/274/274LinkUnlock01.mp3',
    LinkUnlock02        : 'sfx/slot/274/274LinkUnlock02.mp3',
    LinkUnlock03        : 'sfx/slot/274/274LinkUnlock03.mp3',
    LinkCount           : 'sfx/slot/274/274LinkCount.mp3',
    LinkMulti           : 'sfx/slot/274/274LinkMulti.mp3',
    LinkResult          : 'sfx/slot/274/274LinkResult.mp3',

    // stop bonus
    BonusIntro01        : 'sfx/slot/274/274BonusIntro01.mp3',
    BonusIntro02        : 'sfx/slot/274/274BonusIntro02.mp3',
    BoIntro02           : 'sfx/slot/274/274BoIntro02.mp3',
    BoFeature01         : 'sfx/slot/274/274BoFeature01.mp3',
    BoFeature02         : 'sfx/slot/274/274BoFeature02.mp3',
    BoFeature03         : 'sfx/slot/274/274BoFeature03.mp3',
    BoFeature04         : 'sfx/slot/274/274BoFeature04.mp3',
    BoFeature05         : 'sfx/slot/274/274BoFeature05.mp3',
    BoMatch01           : 'sfx/slot/274/274BoMatch01.mp3',
    BoMatch02           : 'sfx/slot/274/274BoMatch02.mp3',
    BoMatch03           : 'sfx/slot/274/274BoMatch03.mp3',
    BoMatch04           : 'sfx/slot/274/274BoMatch04.mp3',
    BoMatch05           : 'sfx/slot/274/274BoMatch05.mp3',
    BoTrail01           : 'sfx/slot/274/274BoTrail01.mp3',
    BoTrail02           : 'sfx/slot/274/274BoTrail02.mp3',
    BoTrail03           : 'sfx/slot/274/274BoTrail03.mp3',
    BoResult            : 'sfx/slot/274/274BoResult.mp3',

    // jackpot Voice
    JackpotVoice0       : 'sfx/slot/274/274JVoice01.mp3',
    JackpotVoice1       : 'sfx/slot/274/274JVoice02.mp3',
    JackpotVoice2       : 'sfx/slot/274/274JVoice03.mp3',
    JackpotVoice3       : 'sfx/slot/274/274JVoice04.mp3',
    JackpotVoice4       : 'sfx/slot/274/274JVoice05.mp3',
};
window.g_sndSlot274 = ResPack.create( 'sndSlot274', sndSlot274 ).concat( g_sfxSlotCommon );