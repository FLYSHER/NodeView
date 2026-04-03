/**
 * Created by Kilsoo on 2016-07-21.
 */
window.sceneList = [
	{
		name         : 'iosLogin',
		res          : null,
		purgeTarget  : null,
		game_id      : -1,
		manifestPath : 'sourceCode.manifest',
        loaderBase   : true,
		scene   : function() {
			return new iosLogin();
		}
	},
	{
		name         : 'mobileLobby',
		res          : g_resNewLobby_Mobile,
		purgeTarget : resNewLobbyPurge, // resNewLobby
		soundRes     : g_sfxLounge,
		game_id      : 1,
		manifestPath : 'entry.manifest',
        subManifest  : ['slotEntry.manifest', 'musicbox.manifest'],
        loaderBase   : true,
		scene        : function() {
			return new LobbyScene( RNCLobby.LobbyMode.LOBBY, RNCLobby.LobbyType.NORMAL );
		}
	},
	{
		name         : 'mobileVipLobby',
		res          : g_resNewLobby_Lounge,
		purgeTarget : resVipLoungePurge, // resVipLounge
		soundRes     : g_sfxLounge,
		game_id      : 1001,
		manifestPath : 'entry.manifest',
        subManifest  : ['slotEntry.manifest', 'musicbox.manifest'],
        loaderBase   : true,
		scene        : function() {
            return new LobbyScene( RNCLobby.LobbyMode.LOUNGE, RNCLobby.LobbyType.NORMAL );
		}
	},
	{
		name         : 'classicVegasLobby',
		res          : g_resNewLobby_Mobile,
        purgeTarget  : resNewLobbyPurge, // resNewLobby
		soundRes     : g_sfxLounge,
		manifestPath : 'entry.manifest',
        subManifest  : ['slotEntry.manifest', 'musicbox.manifest'],
		game_id      : 501,
        loaderBase   : true,
		scene        : function() {
            return new LobbyScene( RNCLobby.LobbyMode.LOBBY, RNCLobby.LobbyType.CLASSIC_VEGAS );
		}
	},
	{
		name         : 'classicVegasLobbyVip',
		res          : g_resNewLobby_Lounge,
        purgeTarget  : resVipLoungePurge, // resVipLounge
		soundRes     : g_sfxLounge,
		manifestPath : 'entry.manifest',
        subManifest  : ['slotEntry.manifest', 'musicbox.manifest'],
		game_id  : 1501,
        loaderBase   : true,
		scene    : function() {
            return new LobbyScene( RNCLobby.LobbyMode.LOUNGE, RNCLobby.LobbyType.CLASSIC_VEGAS );
		}
	},
	{
		name       : 'lobbyForNewUser',
		res        : g_resNewLobby_Mobile,
		purgeTarget: resNewLobbyPurge,
		soundRes   : g_sfxLounge,
		game_id      : 1,
		manifestPath : 'entry.manifest',
		scene      : function() {
			return new  new LobbyScene( RNCLobby.LobbyMode.LOBBY, RNCLobby.LobbyType.NORMAL );
		}
	},
	{
		name         : 'cleopatra',
		res          : g_resCleopatra.concat(g_resCommonSlot_normal),
		purgeTarget : resCleopatra,
		soundRes     : g_soundCP,
		manifestPath : 'cleopatra.manifest',
		game_id      : 2,
		scene        : function() {
			return new CleopatraMain( 2 );
		},
        jsName 	   : 'cleopatra',
	},
	{
		name         : 'madSpin',
		res          : g_resMadSpin.concat(g_resCommonSlot_normal),
		purgeTarget : resMadSpin,
		soundRes     : g_soundMS,
		manifestPath : 'madSpin.manifest',
		game_id      : 3,
		scene        : function() {
			// return new MadSpinClient();
			return new MadSpinLayer( 3 );
		},
        jsName 	   : 'madSpin',
	},
	{
		name         : 'halloween',
		res          : g_resHalloween.concat(g_resCommonSlot_normal),
		purgeTarget : resHalloween,
		soundRes     : g_soundHM,
		manifestPath : 'halloween.manifest',
		game_id      : 4,
		scene        : function() {
			return new HalloweenClient( 4 );
		},
        jsName 	   : 'halloween',
	},
	{
		name         : 'shopaholic',
		res          : g_resShopaholic.concat(g_resCommonSlot_normal),
		purgeTarget : resShopaholic,
		soundRes     : g_soundSH,
		manifestPath : 'shopaholic.manifest',
		game_id      : 5,
		scene        : function() {
			return new ShopaholicClient( 5 );
		},
        jsName 	   : 'shopaholic',
	},
	{
		name         : 'back70s',
		res          : g_resBack70s.concat(g_resCommonSlot_normal),
		purgeTarget : resBack70s,
		soundRes     : g_sound70s,
		manifestPath : 'back70s.manifest',
		game_id      : 6,
		scene        : function() {
			return new Back70sClient( 6 );
		},
        jsName 	   : 'back70s',
	},
	{
		name         : 'hansel',
		res          : g_resHansel.concat(g_resCommonSlot_normal),
		purgeTarget : resHansel,
		soundRes     : g_soundHG,
		manifestPath : 'hansel.manifest',
		game_id      : 7,
		scene        : function() {
			return new HanselClient( 7 );
		},
        jsName 	   : 'hansel',
	},
	{
		name         : 'jackpotCity',
		res          : g_resJackpotCity.concat(g_resCommonSlot_normal),
		purgeTarget : resJackpotCity,
		soundRes     : g_soundJackpotCity,
		manifestPath : 'jackpotCity.manifest',
		game_id      : 8,
		scene        : function() {
			return new JackpotCity( 8 );
		},
        jsName 	   : 'jackpotCity',
	},
	{
		name         : 'queensAge',
		res          : g_resQueensAge.concat(g_resCommonSlot_normal),
		purgeTarget : resQueensAge,
		soundRes     : g_sndQueensAge,
		manifestPath : 'queensAge.manifest',
		game_id      : 9,
		scene        : function() {
			return new QueensAgeClient( 9 );
		},
        jsName 	   : 'queensAge',
	},
	{
		name         : 'eldorado',
		res          : g_resEldorado.concat(g_resCommonSlot_normal),
		purgeTarget : resEldorado,
		soundRes     : g_sndEldorado,
		manifestPath : 'eldorado.manifest',
		game_id      : 10,
		scene        : function() {
			return new Eldorado( 10 );
		},
        jsName 	   : 'Eldorado',
	},
	{
		name         : 'shining',
		res          : g_resShining.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resShining,
		soundRes     : g_sndShining,
		manifestPath : 'shining.manifest',
		game_id      : 11,
		scene        : function() {
			return new Shining( 11 );
		},
        jsName	   : 'shining',
	},
	{
		name         : 'fortune',
		res          : g_resFortune.concat(g_resCommonSlot_normal),
		purgeTarget : resFortune,
		soundRes     : g_sndFortune,
		manifestPath : 'fortune.manifest',
		game_id      : 12,
		scene        : function() {
			return new FortunePotClient( 12 );
		},
        jsName 	   : 'fortunepot',
	},
	{
		name         : 'westernWild',
		res          : g_resWesternWild.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resWesternWild,
		soundRes     : g_sndWesternWild,
		manifestPath : 'westernWild.manifest',
		game_id      : 13,
		scene        : function() {
			return new WesternWild( 13 );
		},
        jsName	   : 'westernWild',
	},
	{
		name         : 'wheelOfJackpot',
		res          : g_resWheelJackpot.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resWheelJackpot,
		soundRes     : g_sndWheelOfJackpot,
		manifestPath : 'wheelOfJackpot.manifest',
		game_id      : 14,
		scene        : function() {
			return new WheelOfJackpot( 14 );
		},
        jsName		 : 'wheelOfJackpot',

	},
	{
		name         : 'wjDoubleSeven',
		res          : g_resWjDoubleSeven.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resWjDoubleSeven,
		soundRes     : g_sndWj2DoubleSeven,
		manifestPath : 'wjDoubleSeven.manifest',
		game_id      : 15,
		scene        : function() {
			return new wjDoubleSeven( 15 );
		},
        jsName	   : 'wjDoubleSeven',
	},
	{
		name         : 'goldenSheep',
		res          : g_resGoldenSheep.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resGoldenSheep,
		soundRes     : g_sndGoldenSheep,
		manifestPath : 'goldenSheep.manifest',
		game_id      : 16,
		scene        : function() {
			return new GoldenSheep( 16 );
		},
        jsName	   : 'GoldenSheep',
	},
	{
		name         : 'easterJackpot',
		res          : g_resEasterJackpot.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resEasterJackpot,
		soundRes     : g_sndEasterJackpot,
		manifestPath : 'easterJackpot.manifest',
		game_id      : 17,
		scene        : function() {
			return new EasterJackpot( 17 );
		},
        jsName	   : 'EasterJackpot',
	},
	{
		name         : 'fishingMaster',
		res          : g_resFishingMaster.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resFishingMaster,
		soundRes     : g_sndFishingMaster,
		manifestPath : 'fishingMaster.manifest',
		game_id      : 18,
		scene        : function() {
			return new FishingMaster( 18 );
		},
        jsName 	   : 'fishingMaster',
	},
	{
		name         : 'fiery7',
		res          : g_resFiery7.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resFiery7,
		soundRes     : g_sndFiery7,
		manifestPath : 'fiery7.manifest',
		game_id      : 19,
		scene        : function() {
			return new Fiery7( 19 );
		},
        jsName	   : 'Fiery7',
	},
	{
		name         : 'flamingStar',
		res          : g_resFlamingStar.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resFlamingStar,
		soundRes     : g_sndFlamingStar,
		manifestPath : 'flamingStar.manifest',
		game_id      : 20,
		scene        : function() {
			return new FlamingStar( 20 );
		},
        jsName	   : 'FlamingStar',
	},
	{
		name         : 'goldMine',
		res          : g_resGoldMine.concat(g_resCommonSlot_normal),
		purgeTarget : resGoldMine,
		soundRes     : g_sndGoldMine,
		manifestPath : 'goldMine.manifest',
		game_id      : 21,
		scene        : function() {
			return new GoldMine( 21 );
		},
        jsName 	   : 'GoldMine',
	},
	{
		name       : 'cabaretFever',
		res        : g_resCabaretFever.concat(g_resCommonSlot_normal),
		purgeTarget : resCabaretFever,
		soundRes   : g_sndCabaretFever,
		manifestPath : 'cabaretFever.manifest',
		game_id    : 22,
		popupInfo  :  {
			slotAlias : 'cf',
			bUseCommonMajorWin : true
			// soundPath : sndBillionairePiggy.MajorWinPopup or 'xx/yy/zz.mp3'
		},
		scene      : function() {
			return new CabaretFever( 22 );
		},
        jsName 	   : 'cabaretFever',
	},
	{
		name       : 'jackpotXmas',
		res        : g_resJackpotXmas.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resJackPotXmas,
		soundRes   : g_sndJackpotXmas,
		manifestPath : 'jackpotXmas.manifest',
		game_id    : 23,
		scene      : function() {
			return new JackpotXmas ( 23 );
		},
        jsName 	   : 'JackpotXmas',
	},
    {
        name       : 'hotCash',
        res        : g_resHotCash.concat(g_resCommonClassicSlot_normal),
	    purgeTarget : resHotCash,
        soundRes   : g_sndHotCash,
	    manifestPath : 'hotCash.manifest',
        game_id    : 24,
        scene      : function() {
            return new HotCash( 24 );
        },
        jsName	   : 'HotCash',
    },
	{
		name       : 'zeusThunder',
		res        : g_resZeusThunder.concat(g_resCommonSlot_normal),
		purgeTarget : resZeusThunder,
		soundRes   : g_sndZeusThunder,
		manifestPath : 'zeusThunder.manifest',
		game_id    : 25,
		popupInfo  :  {
			slotAlias : 'zt',
			bUseCommonMajorWin : true,
			// soundPath : sndBillionairePiggy.MajorWinPopup or 'xx/yy/zz.mp3'
		},
		scene      : function() {
			return new ZeusThunder ( 25 );
		},
        jsName 	   : 'zeusThunder',
	},
	{
		name       : 'billionairePiggy',
		res        : g_resBillionairePiggy.concat(g_resCommonSlot_normal),
		purgeTarget : resBillionairePiggy,
		soundRes   : g_sndBillionairePiggy,
		manifestPath : 'billionairePiggy.manifest',
		game_id    : 26,
		scene      : function() {
			return new BillionairePiggy ( 26 );
		},
        jsName 	   : 'billionairePiggy',
	},
	{
		name       : 'vegasLink',
		res        : g_resVegasLink.concat(g_resCommonSlot_normal),
		purgeTarget : resVegasLink,
		soundRes   : g_sndVegasLink,
		manifestPath : 'vegasLink.manifest',
		game_id    : 28,
		scene      : function() {
			return new VegasLink( 28 );
		},
        jsName 	   : 'VegasLink',
	},
	{
		name       : 'goldenEagle',
		res        : g_resGoldenEagle.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resGoldenEagle,
		soundRes   : g_sndGoldenEagle,
		manifestPath : 'goldenEagle.manifest',
		game_id    : 31,
		scene      : function() {
			return new GoldenEagle ( 31 );
		},
        jsName 	   : 'goldenEagle',
	},
	{
        name       : 'dragonRising',
        res        : g_resDragonRising.concat(g_resCommonClassicSlot_normal),
        purgeTarget : resDragonRising,
        soundRes   : g_sndDragonRising,
        manifestPath : 'dragonRising.manifest',
        game_id    : 29,
        scene      : function() {
            return new DragonRising ( 29 );
        },
        jsName	   : 'dragonRising',
    },
	{
		name       : 'kingOfSavanna',
		res        : g_resKingOfSavanna.concat(g_resCommonSlot_normal),
		purgeTarget : resKingOfSavanna,
		soundRes   : g_sndKingOfSavanna,
		manifestPath : 'kingOfSavanna.manifest',
		game_id    : 30,
		scene      : function() {
			return new KingOfSavanna ( 30 );
		},
        jsName 	   : 'KingOfSavanna',
	},
	{
		name       : 'diamondWheel',
		res        : g_resDiamondWheel.concat(g_resCommonSlot_normal),
		purgeTarget : resDiamondWheel,
		soundRes   : g_sndDiamondWheel,
		manifestPath : 'diamondWheel.manifest',
		game_id    : 34,
		scene      : function() {
			return new DiamondWheel ( 34 );
		},
        jsName 	   : 'DiamondWheel',
	},
	{
		name       : 'fortuneDiamond',
		res        : g_resFortuneDiamond.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resFortuneDiamond,
		soundRes   : g_sndFortuneDiamond,
		manifestPath : 'fortuneDiamond.manifest',
		game_id    : 35,
		scene      : function() {
			return new FortuneDiamond ( 35 );
		},
		jsName	   : 'fortuneDiamond',
	},
	{
		name       : 'queenOfRiches',
		res        : g_resQueenOfRiches.concat(g_resCommonSlot_normal),
		purgeTarget : resQueenOfRiches,
		soundRes   : g_sndQueenOfRiches,
		manifestPath : 'queenOfRiches.manifest',
		game_id    : 36,
		scene      : function() {
			return new QueenOfRiches ( 36 );
		},
        jsName 	   : 'QueenOfRiches',
	},
	{
		name       : 'alohaWheel',
		res        : g_resAlohaWheel.concat(g_resCommonSlot_normal),
		purgeTarget : resAlohaWheel,
		soundRes   : g_sndAlohaWheel,
		manifestPath : 'alohaWheel.manifest',
		game_id    : 39,
		scene      : function() {
			return new AlohaWheel ( 39 );
		},
        jsName 	   : 'AlohaWheel',
	},
	{
		name       : 'pumpkinPot',
		res        : g_resPumpkinPot.concat(g_resCommonSlot_normal),
		purgeTarget : resPumpkinPot,
		soundRes   : g_sndPumpkinPot,
		manifestPath : 'pumpkinPot.manifest',
		game_id    : 40,
		scene      : function() {
			return new PumpkinPot ( 40 );
		},
        jsName 	   : 'PumpkinPot',
	},
	{
		name       : 'goldBar',
		res        : g_resGoldBar.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resGoldBar,
		soundRes   : g_sndGoldBar,
		manifestPath : 'goldBar.manifest',
		game_id    : 41,
		scene      : function() {
			return new GoldBar ( 41 );
		},
        jsName	   : 'GoldBar',
	},
    {
        name       : 'bigMoney',
        res        : g_resBigMoney.concat(g_resCommonClassicSlot_normal),
        purgeTarget : resBigMoney,
        soundRes   : g_sndBigMoney,
        manifestPath : 'bigMoney.manifest',
        game_id    : 42,
        scene      : function() {
            return new BigMoney ( 42 );
        },
        jsName	   : 'BigMoney',
    },
    {
        name        : 'oceanLink',
        res         : g_resOceanLink.concat(g_resCommonClassicSlot_normal),
        purgeTarget : resOceanLink,
        soundRes    : g_sndOceanLink,
        manifestPath: 'oceanLink.manifest',
        game_id     : 43,
        scene       : function () {
            return new OceanLink( 43 );
        },
        jsName	   : 'OceanLink',
    },
	{
		name        : 'wildWildBuffalo',
		res         : g_resWildBuffalo.concat(g_resCommonSlot_normal),
		purgeTarget : resWildBuffalo,
		soundRes    : g_sndWildBuffalo,
		manifestPath: 'wildBuffalo.manifest',
		game_id     : 44,
		scene       : function () {
			return new WildBuffalo( 44 );
		},
        jsName 	   : 'WildWildBuffalo',
	},
    {
        name       : 'FuWaFuBao',
        res        : g_resFuWaFuBao.concat(g_resCommonSlot_normal),
        purgeTarget : resFuWaFuBao,
        soundRes   : g_sndFuWaFuBao,
        manifestPath: 'fuwaFubao.manifest',
        game_id    : 45,
        scene      : function() {
            return new FuWaFuBao ( 45 );
        },
        jsName 	   : 'FuWaFuBao',
    },
    {
        name       : 'goldSpin',
        res        : g_resGoldSpin.concat(g_resCommonClassicSlot_normal),
		purgeTarget : resGoldSpin,
        soundRes   : g_sndGoldSpin,
        manifestPath: 'goldSpin.manifest',
        game_id    : 50,
        scene      : function() {
            return new GoldSpin ( 50 );
        },
        jsName	   : 'goldSpin',
    },
    {
        name       : 'fairyMischief',
        res        : g_resFairyMischief.concat(g_resCommonSlot_normal),
        purgeTarget : resFairyMischief,
        soundRes   : g_sndFairyMischief,
        manifestPath: 'fairyMischief.manifest',
        game_id    : 48,
        scene      : function() {
            return new FairyMischief ( 48 );
        },
        jsName 	   : 'FairyMischief',
    },
    {
        name       : 'shiningDiamondLink',
        res        : g_resShiningLink.concat(g_resCommonClassicSlot_normal),
        purgeTarget : resShiningLink,
        soundRes   : g_sndShiningLink,
        manifestPath: 'shiningLink.manifest',
        game_id    : 46,
        scene      : function() {
            return new ShiningLink ( 46 );
        },
        jsName	   : 'ShiningLink',
    },
	{
		name       : 'vegasQueens',
		res        : g_resVegasQueens.concat(g_resCommonSlot_normal),
		purgeTarget : resVegasQueens,
		soundRes   : g_sndVegasQueens,
		manifestPath: 'vegasQueens.manifest',
		game_id    : 52,
		scene      : function() {
			return new VegasQueens ( 52 );
		},
        jsName 	   : 'VegasQueens',
	},
	{
		name       : 'goldenClovers',
		res        : g_resGoldenClovers.concat(g_resCommonSlot_normal),
		purgeTarget: resGoldenClovers,
		soundRes   : g_sndGoldenClovers,
		manifestPath: 'goldenClovers.manifest',
		game_id    : 47,
		scene      : function() {
			return new GoldenClovers ( 47 );
		},
        jsName 	   : 'GoldenClovers',
	},
    {
        name       : 'fishingMaster2',
        res        : g_resFishingMaster2.concat(g_resCommonSlot_normal),
        purgeTarget: resFishingMaster2,
        soundRes   : g_sndFishingMaster2,
        manifestPath: 'fishingMaster2.manifest',
        game_id    : 54,
        scene      : function() {
            return new FishingMaster2 ( 54 );
        },
        jsName 	   : 'fishingMaster2',
    },
    {
        name       : 'LuckyLamp',
        res        : g_resLuckyLamp.concat(g_resCommonSlot_normal),
        purgeTarget : resLuckyLamp,
        soundRes   : g_sndLuckyLamp,
        manifestPath: 'luckyLamp.manifest',
        game_id    : 55,
        scene      : function() {
            return new LuckyLamp ( 55 );
        },
        jsName 	   : 'luckyLamp',
    },
    {
        name       : 'GreatEmpire',
        res        : g_resGreatEmpire.concat(g_resCommonSlot_normal),
        purgeTarget : resGreatEmpire,
        soundRes   : g_sndGreatEmpire,
        manifestPath: 'greatEmpire.manifest',
        game_id    : 56,
        scene      : function() {
            return new GreatEmpire ( 56 );
        },
        jsName 	   : 'GreatEmpire',
    },
    {
        name       : 'CaptainShark',
        res        : g_resCaptainShark.concat(g_resCommonClassicSlot_normal),
        purgeTarget : resCaptainShark,
        soundRes   : g_sndCaptainShark,
        manifestPath: 'captainShark.manifest',
        game_id    : 57,
        scene      : function() {
            return new CaptainShark ( 57 );
        },
        jsName 	   : 'captainShark',
    },
    {
        name       : 'fortuneTree',
        res        : g_resFortuneTree.concat(g_resCommonSlot_normal),
        purgeTarget : resFortuneTree,
        soundRes   : g_sndFortuneTree,
        manifestPath: 'fortuneTree.manifest',
        game_id    : 58,
        scene      : function() {
            return new FortuneTree ( 58 );
        },
        jsName 	   : 'fortuneTree',
    },
    {
        name       : 'JackpotRush',
        res        : g_resJackpotRush.concat(g_resCommonSlot_normal),
        purgeTarget: resJackpotRush,
        soundRes   : g_sndJackpotRush,
        manifestPath: 'jackpotRush.manifest',
        game_id    : 59,
        scene      : function() {
            return new JackpotRush ( 59 );
        },
        jsName 	   : 'JackpotRush',
    },
    {
        name       : 'mrBillionaire',
        res        : g_resMrBillionaire.concat(g_resCommonSlot_normal),
        purgeTarget: resMrBillionaire,
        soundRes   : g_sndMrBillionaire,
        manifestPath: 'mrBillionaire.manifest',
        game_id    : 61,
        scene      : function() {
            return new MrBillionaire ( 61 );
        },
        jsName 	   : 'MrBillionaire',
    },
    {
        name       : 'TripleWolf',
        res        : g_resTripleWolf.concat(g_resCommonSlot_normal),
        purgeTarget: resTripleWolf,
        soundRes   : g_sndTripleWolf,
        manifestPath: 'tripleWolf.manifest',
        game_id    : 62,
        scene      : function() {
            return new TripleWolf ( 62 );
        },
        jsName 	   : 'TripleWolf',
    },
    {
        name       : 'vampiresRoses',
        res        : g_resVampiresRoses.concat(g_resCommonSlot_normal),
        purgeTarget: resVampiresRoses,
        soundRes   : g_sndVampiresRoses,
        manifestPath: 'vampiresRoses.manifest',
        game_id    : 64,
        scene      : function() {
            return new VampiresRose ( 64 );
        },
        jsName 	   : 'vampiresRose',
    },
    {
        name       : 'TreasureIsland',
        res        : g_resTreasureIsland.concat(g_resCommonSlot_normal),
        purgeTarget: resTreasureIsland,
        soundRes   : g_sndTreasureIsland,
        manifestPath: 'treasureIsland.manifest',
        game_id    : 66,
        scene      : function() {
            return new TreasureIsland ( 66 );
        },
        jsName 	   : 'TreasureIsland',
    },
	{
        name       : 'santasGifts',
        res        : g_resSantasGifts.concat(g_resCommonSlot_normal),
        soundRes   : g_sndSantasGifts,
        manifestPath: 'santasGifts.manifest',
        game_id    : 67,
        scene      : function() {
            return new SantasGifts ( 67 );
        },
        jsName 	   : 'SantasGifts',
    },
	{
		name       : 'AllStar',
		res        : g_resAllStar.concat(g_resCommonSlot_normal),
		purgeTarget: resAllStar,
		soundRes   : g_sndAllStar,
		manifestPath: 'AllStar.manifest',
		game_id    : 68,
		scene      : function() {
			return new AllStar ( 68 );
		},
        jsName 	   : 'AllStar',
	},
	{
		name       : 'fortuneDiamondJackpotReel',
		res        : g_resFortuneDiamondJackpotReel.concat(g_resCommonClassicSlot_normal),
		purgeTarget: resFortuneDiamondJackpotReel,
		soundRes   : g_sndFortuneDiamondJackpotReel,
		manifestPath: 'fortuneDiamondJackpotReel.manifest',
		game_id    : 69,
		scene      : function() {
			return new FortuneDiamondJackpotReel ( 69 );
		},
        jsName	   : 'FortuneDiamondJackpotReel',
	},
	{
		name       : 'fortunePanda',
		res        : g_resFortunePanda.concat(g_resCommonSlot_normal),
		purgeTarget: resFortunePanda,
		soundRes   : g_sndFortunePanda,
		manifestPath: 'fortunePanda.manifest',
		game_id    : 70,
		scene      : function() {
			return new FortunePanda ( 70 );
		},
        jsName 	   : 'FortunePanda',
	},
	{
		name       : 'pharaohWilds',
		res        : g_resPharaohWild.concat(g_resCommonSlot_normal),
		purgeTarget: resPharaohWild,
		soundRes   : g_sndPharaohWild,
		manifestPath: 'pharaohWild.manifest',
		game_id    : 72,
		scene      : function() {
			return new PharaohWild ( 72 );
		},
        jsName 	   : 'PharaohWild',
	},
	{
		name       : 'sharkParade',
		res        : g_resSharkParade.concat(g_resCommonClassicSlot_normal),
		purgeTarget: resSharkParade,
		soundRes   : g_sndSharkParade,
		manifestPath: 'sharkParade.manifest',
		game_id    : 73,
		scene      : function() {
			return new SharkParade ( 73 );
		},
        jsName	   : 'SharkParade',
	},

	{
		name       : 'BisonGold',
		res        : g_resBisonGold.concat(g_resCommonSlot_normal),
		purgeTarget: resBisonGold,
		soundRes   : g_sndBisonGold,
		manifestPath: 'bisonGold.manifest',
		game_id    : 75,
		scene      : function() {
			return new BisonGold ( 75 );
		},
        jsName 	   : 'BisonGold',
	},

    {
        name       : 'indianaCoins',
        res        : g_resIndianaCoins.concat(g_resCommonSlot_normal),
        purgeTarget: resIndianaCoins,
        soundRes   : g_sndIndianaCoins,
        manifestPath: 'indianaCoins.manifest',
        game_id    : 77,
        scene      : function() {
            return new IndianaCoins ( 77 );
        },
        jsName 	   : 'IndianaCoins',
    },

	{
		name       : 'TreasureOfOz',
		res        : g_resTreasureOfOz.concat(g_resCommonSlot_normal),
		purgeTarget: resTreasureOfOz,
		soundRes   : g_sndTreasureOfOz,
		manifestPath: 'treasureOfOz.manifest',
		game_id    : 79,
		scene      : function() {
			return new TreasureOfOz ( 79 );
		},
        jsName 	   : 'TreasureOfOz',
	},

	{
		name       : 'diamondCats',
		res        : g_resDiamondCats.concat(g_resCommonSlot_normal),
		purgeTarget: resDiamondCats,
		soundRes   : g_sndDiamondCats,
		manifestPath: 'diamondCats.manifest',
		game_id    : 82,
		scene      : function() {
			return new DiamondCats ( 82 );
		},
        jsName 	   : 'DiamondCats',
	},
	{
        name       : 'vegasDiamond',
        res        : g_resVegasDiamond.concat(g_resCommonSlot_normal),
        purgeTarget: resVegasDiamond,
        soundRes   : g_sndVegasDiamond,
        manifestPath: 'vegasDiamond.manifest',
        game_id    : 83,
        scene      : function() {
            return new VegasDiamond ( 83 );
        },
        jsName 	   : 'VegasDiamond',
    },
	{
		name       : 'wildWildZeus',
		res        : g_resWildWildZeus.concat(g_resCommonSlot_normal),
		purgeTarget: resWildWildZeus,
		soundRes   : g_sndWildWildZeus,
		manifestPath: 'wildWildZeus.manifest',
		game_id    : 84,
		scene      : function() {
			return new WildWildZeus ( 84 );
		},
        jsName 	   : 'WildWildZeus',
	},
    {
        name       : 'lunarFortune',
        res        : g_resLunarFortune.concat(g_resCommonSlot_normal),
        purgeTarget: resLunarFortune,
        soundRes   : g_sndLunarFortune,
        manifestPath: 'lunarFortune.manifest',
        game_id    : 85,
        scene      : function() {
            return new LunarFortune ( 85 );
        },
        jsName 	   : 'LunarFortune',
    },

	{
        name       : 'goldMoonLink',
        res        : g_resGoldMoonLink.concat(g_resCommonSlot_normal),
        purgeTarget: resGoldMoonLink,
        soundRes   : g_sndGoldMoonLink,
        manifestPath: 'goldMoonLink.manifest',
        game_id    : 87,
        scene      : function() {
            return new goldMoonLink.MainLayer( 87 );
        },
        jsName 	   : 'goldMoonLink',
    },

	{
		name       : 'jackpotQueens',
		res        : g_resJackpotQueens.concat(g_resCommonClassicSlot_normal),
		purgeTarget: resJackpotQueens,
		soundRes   : g_sndJackpotQueens,
		manifestPath: 'JackpotQueens.manifest',
		game_id    : 88,
		scene      : function() {
			return new JackpotQueens ( 88 );
		},
        jsName 	   : 'JackpotQueens',
	},
	{
		name       : 'monsterParade',
		res        : g_resMonsterParade.concat(g_resCommonSlot_normal),
		purgeTarget: resMonsterParade,
		soundRes   : g_sndMonsterParade,
        manifestPath: 'monsterParade.manifest',
		game_id    : 94,
		scene      : function() {
			return new MonsterParade( this.game_id, this.name );
		},
		jsName	   : 'MonsterParade',
	},

    {
        name       : 'JackpotMagic',
        res        : g_resJackpotMagic.concat(g_resCommonSlot_normal),
        purgeTarget: resJackpotMagic,
        soundRes   : g_sndJackpotMagic,
        manifestPath: 'JackpotMagic.manifest',
        game_id    : 91,
        scene      : function() {
            return new JackpotMagic ( 91 );
        },
        jsName 	   : 'JackpotMagic',
    },

    {
		name       : 'burningSun',
		res        : g_resBurningSun.concat(g_resCommonClassicSlot_normal),
		purgeTarget: resBurningSun,
		soundRes   : g_sndBurningSun,
		manifestPath: 'burningSun.manifest',
		game_id    : 86,
		scene      : function() {
			return new BurningSun ( 86 );
		},
        jsName	   : 'BurningSun',
	},
    {
        name         : 'superBallKeno',
        res          : g_resSuperBall.concat(g_resCommonKeno_normal),
        purgeTarget : resSuperBall,
        soundRes     : g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_superBall.manifest',
        game_id      : 92,
        scene        : function() {
            return new KenoScene ( 92 );
        },
        kenoUI: function () {
            var ui = new SuperBallUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'SuperBallKeno',
    },

    {
        name         : 'scarabKeno',
        res          : g_resScarab.concat(g_resCommonKeno_normal),
        purgeTarget : resScarab,
        soundRes     : g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_scarab.manifest',
        game_id      : 107,
        scene        : function() {
            return new KenoScene ( 107 );
        },
        kenoUI: function () {
            var ui = new ScarabUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'ScarabKeno',
    },
    {
        name: 'dinoKeno',
        res: g_resDinoKeno.concat(g_resCommonKeno_normal),
        purgeTarget: resDinoKeno,
        soundRes: g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_dino.manifest',
        game_id: 120,
        scene: function () {
            return new KenoScene(120);
        },
        kenoUI: function () {
            var ui = new DinoKenoUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'DinoKeno',
    },
	{
		name		: 'triplePowerKeno',
		res			: g_resTriplePowerKeno.concat(g_resCommonKeno_normal),
		purgeTarget	: resTriplePowerKeno,
		soundRes	: g_sndKeno,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_triplePower.manifest',
		loader		: null,
		game_id		: 124,
		scene		: function () {
			return new KenoScene( this.game_id );
		},
		kenoUI		: function () {
			var ui = new TriplePowerUI();
			var dataController = new KenoDataController();
			return {
				ui: ui,
				dataController: dataController
			}
		},
        jsName	   : 'TriplePowerKeno',
	},
	{
		name        : 'doubleSevenKeno',
		res         : g_resKeno189.concat(g_resCommonKeno_normal),
		purgeTarget	: resKeno189,
		soundRes    : g_sndKeno,
		loader: null,
		game_id     : 189,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_doubleSeven.manifest',
		scene: function () {
			return new DoubleSevenKenoScene( this.game_id );
		},
		kenoUI: function () {
			var ui = new DoubleSevenKenoUI();
			var dataController = new KenoDataController();
			return {
				ui: ui,
				dataController: dataController
			}
		},
		jsName	   : 'doubleSevenKeno',
	},
	{
		name: 'fortunePotKeno',
		purgeTarget: resKeno230,
		res: g_resKeno230.concat(g_resCommonKeno_normal),
		soundRes: g_sndKeno230,
		loader: null,
		game_id: 230,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_fortunePot.manifest',
		jsName	   : 'fortunePotKeno',
		scene      : function() {
			return new FortunePotKeno( this.game_id, this.name, resKeno230 );
		}
	},
	{
		name: 'hotChiliKeno',
		purgeTarget: resKeno231,
		res: g_resKeno231.concat(g_resCommonKeno_normal),
		soundRes: g_sndKeno231,
		loader: null,
		game_id: 231,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_hotChiliKeno.manifest',
		jsName	   : 'hotChiliKeno',
		scene      : function() {
			return new HotChiliKeno( this.game_id, this.name, resKeno231 );
		}
	},
	{
		name: 'megaXBallKeno',
		purgeTarget: resKeno245,
		res: g_resKeno245.concat(g_resCommonKeno_normal),
		soundRes: g_sndKeno245,
		loader: null,
		game_id: 245,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_megaXBallKeno.manifest',
		jsName	   : 'megaXBallKeno',
		scene      : function() {
			return new MegaXBallKeno( this.game_id, this.name, resKeno245 );
		}
	},
	{
		name: 'sharkeno',
		purgeTarget: resKeno246,
		res: g_resKeno246.concat(g_resCommonKeno_normal),
		soundRes: g_sndKeno246,
		loader: null,
		game_id: 246,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_sharkKeno.manifest',
		jsName	   : 'sharkKeno',
		scene      : function() {
			return new SharkKeno( this.game_id, this.name, resKeno246 );
		}
	},
    {
        name       : 'mammothStampede',
        res        : g_resMammothStampede.concat(g_resCommonSlot_normal),
        purgeTarget: resMammothStampede,
        soundRes   : g_sndMammothStampede,
        game_id    : 90,
        manifestPath : 'mammothStampede.manifest',
        scene      : function() {
            return new Mammoth ( 90 );
        },
        jsName 	   : 'MammothStampede',
    },
    {
        name       : 'candyConnectLink',
        res        : g_resCandyConnectLink.concat(g_resCommonSlot_normal),
        purgeTarget: resCandyConnectLink,
        soundRes   : g_sndCandyConnectLink,
        manifestPath : 'candyConnectLink.manifest',
        game_id    : 93,
        scene      : function() {
            return new CandyConnectLink ( 93 );
        },
        jsName 	   : 'CandyConnectLink',
    },
	{
		name       : 'mermaidMagic',
		res        : g_resMermaidMagic.concat(g_resCommonSlot_normal),
		purgeTarget: resMermaidMagic,
		soundRes   : g_sndMermaidMagic,
		game_id    : 95,
		manifestPath : 'MermaidMagic.manifest',
		scene      : function() {
			return new MermaidMagic( this.game_id, this.name );
		},
        jsName 	   : 'MermaidMagic',
	},
	{
		name       : 'dragonsDiamond',
		res        : g_resDragonsDiamond.concat(g_resCommonSlot_normal),
		purgeTarget: resDragonsDiamond,
		soundRes   : g_sndDragonsDiamond,
		game_id    : 96,
		manifestPath: 'dragonsDiamond.manifest',
		scene      : function() {
			return new DragonsDiamond ( this.game_id, this.name );
		},
        jsName 	   : 'DragonsDiamond',
	},
	{
		name       : 'midasGold',
		res        : g_resHandOfGold.concat(g_resCommonSlot_normal),
		purgeTarget: resHandOfGold,
		soundRes   : g_sndHandOfGold,
		game_id    : 97,
		manifestPath : 'handOfGold.manifest',
		scene      : function() {
			return new HandOfGold( this.game_id, this.name );
		},
        jsName 	   : 'HandOfGold',
	},
    {
        name       : 'piggyKing',
        res        : g_resPiggyKing.concat(g_resCommonClassicSlot_normal),
        purgeTarget: resPiggyKing,
        soundRes   : g_sndPiggyKing,
        game_id    : 99,
        manifestPath: 'piggyKing.manifest',
        scene      : function() {
            return new PiggyKing ( this.game_id, this.name );
        },
        jsName 	   : 'PiggyKing',
    },

    {
        name       : 'fortuneBlast',
        res        : g_resFortuneBlast.concat(g_resCommonSlot_normal),
        purgeTarget: resFortuneBlast,
        soundRes   : g_sndFortuneBlast,
        game_id    : 98,
        manifestPath: 'fortuneBlast.manifest',
        scene      : function() {
            return new FortuneBlast ( 98 );
        },
        jsName 	   : 'FortuneBlast',
    },

	{
		name       : 'bankOfJackpot',
		res        : g_resBankOfJackpot.concat(g_resCommonSlot_normal),
		purgeTarget: resBankOfJackpot,
		soundRes   : g_sndBankOfJackpot,
		game_id    : 100,
		manifestPath: 'bankOfJackpot.manifest',
		scene      : function() {
			return new BankOfJackpot( this.game_id, this.name );
		},
        jsName 	   : 'BankOfJackpot',
	},

    {
        name       : 'fortunePotLink',
        res        : g_resFortunePotLink.concat(g_resCommonSlot_normal),
        purgeTarget: resFortunePotLink,
        soundRes   : g_sndFortunePotLink,
        game_id    : 104,
        manifestPath: 'fortunePotLink.manifest',
        scene      : function() {
            return new FortunePotLink ( 104 );
        },
        jsName	   : 'FortunePotLink',
    },

    {
        name       : 'rollingInMoney',
        res        : g_resRollingInMoney.concat(g_resCommonSlot_normal),
        purgeTarget: resRollingInMoney,
        soundRes   : g_sndRollingInMoney,
        game_id    : 101,
        manifestPath: 'rollingInMoney.manifest',
        scene      : function() {
            return new RollingInMoney ( 101 );
        },
        jsName 	   : 'RollingInMoney',
    },
	{
		name       : 'megaCash',
		res        : g_resMegaCash.concat(g_resCommonSlot_normal),
		purgeTarget: resMegaCash,
		soundRes   : g_sndMegaCash,
		game_id    : 105,
		manifestPath: 'megaCash.manifest',
		scene      : function() {
			return new MegaCash( this.game_id, this.name );
		},
        jsName 	   : 'MegaCash',
	},

	{
		name       : 'moreMoreGold',
		res        : g_resMoreMoreGold.concat(g_resCommonSlot_normal),
		purgeTarget: resMoreMoreGold,
		soundRes   : g_sndMoreMoreGold,
		game_id    : 103,
		manifestPath : 'moreMoreGold.manifest',
		scene      : function() {
			return new MoreMoreGold( this.game_id, this.name );
		},
        jsName 	   : 'MoreMoreGold',
	},

    {
        name       : 'goldRushLink',
        res        : g_resGoldRushLink.concat(g_resCommonSlot_normal),
        purgeTarget: resGoldRushLink,
        soundRes   : g_sndGoldRushLink,
        game_id    : 106,
        manifestPath : 'goldRushLink.manifest',
        scene      : function() {
            return new GoldRushLink( 106 );
        },
        jsName 	   : 'GoldRushLink',
    },

    {
        name       : 'madLab',
        res        : g_resMadLab.concat(g_resCommonSlot_normal),
        purgeTarget: resMadLab,
        soundRes   : g_sndMadLab,
        game_id    : 109,
        manifestPath : 'madLab.manifest',
        scene      : function() {
            return new MadLab ( 109 );
        },
        jsName 	   : 'MadLab',
    },
    {
        name       : 'moonFestivalLink',
        res        : g_resMoonFestivalLink.concat(g_resCommonSlot_normal),
        purgeTarget: resMoonFestivalLink,
        soundRes   : g_sndMoonFestivalLink,
        game_id    : 112,
        manifestPath : 'moonFestivalLink.manifest',
        scene      : function() {
            return new MoonFestivalLink( this.game_id, this.name );
        },
        jsName 	   : 'MoonFestivalLink',
    },
	{
		name       : 'magicInWonderland',
		res        : g_resMagicInWonderland.concat(g_resCommonSlot_normal),
		purgeTarget: resMagicInWonderland,
		soundRes   : g_sndMagicInWonderland,
		game_id    : 110,
		manifestPath : 'magicInWonderland.manifest',
		scene      : function() {
			return new MagicInWonderland( this.game_id, this.name );
		},
        jsName 	   : 'MagicInWonderland',
	},
	{
		name       : 'rncLegends',
		res        : g_resRNCLegends.concat(g_resCommonSlot_normal),
		purgeTarget: resRNCLegends,
		soundRes   : g_sndRNCLegends,
		game_id    : 111,
		manifestPath : 'RNCLegends.manifest',
		scene      : function() {
			return new RNCLegends ( this.game_id, this.name );
		},
        jsName 	   : 'RNCLegends',
	},
    {
        name       : 'sunMoonLink',
        res        : g_resSunAndMoonLink.concat(g_resCommonSlot_normal),
        purgeTarget: resSunAndMoonLink,
        soundRes   : g_sndSunAndMoonLink,
        game_id    : 113,
        manifestPath : 'sunAndMoonLink.manifest',
        scene      : function() {
            return new SunAndMoonLink( 113 );
        },
        jsName 	   : 'SunAndMoonLink',
    },

    {
        name       : 'sugarFactory',
        res        : g_resSugarFactory.concat(g_resCommonSlot_normal),
        purgeTarget: resSugarFactory,
        soundRes   : g_sndSugarFactory,
        manifestPath : 'sugarFactory.manifest',
        game_id    : 114,
        scene      : function() {
            return new SugarFactory( this.game_id, this.name );
        },
        jsName	   : 'SugarFactory',
    },
	{
		name       : 'goldenLanternLink',
		res        : g_resGoldenLanternLink.concat(g_resCommonSlot_normal),
		purgeTarget: resGoldenLanternLink,
		soundRes   : g_sndGoldenLanternLink,
		manifestPath : 'goldenLanternLink.manifest',
		game_id    : 115,
		scene      : function() {
			return new GoldenLanternLink( this.game_id, this.name );
		},
        jsName 	   : 'GoldenLanternLink',
	},

    {
        name       : 'luckyCoin',
        res        : g_resLuckyCoin.concat(g_resCommonSlot_normal),
        purgeTarget: resLuckyCoin,
        soundRes   : g_sndLuckyCoin,
        manifestPath : 'luckyCoin.manifest',
        game_id    : 116,
        scene      : function() {
            return new LuckyCoin( this.game_id, this.name );
        },
		jsName 	   : 'LuckyCoin',
    },

    {
        name       : 'goldenBeer',
        res        : g_resGoldenBier.concat(g_resCommonSlot_normal),
        purgeTarget: resGoldenBier,
        soundRes   : g_sndGoldenBier,
        manifestPath : 'goldenBier.manifest',
        game_id    : 118,
        scene      : function() {
            return new GoldenBier( this.game_id, this.name );
        },
        jsName 	   : 'GoldenBier',
    },

    {
        name       : 'honeyBeengo',
        res        : g_resHoneyBeengo.concat(g_resCommonSlot_normal),
        purgeTarget: resHoneyBeengo,
        soundRes   : g_sndHoneyBeengo,
        manifestPath : 'honeyBeengo.manifest',
        game_id    : 117,
        scene      : function() {
            return new HoneyBeengo( this.game_id, this.name );
        },
        jsName 	   : 'HoneyBeengo',
    },
	{
		name       		: 'spookyPumpkin',
		res        		: g_resSpookyPumpkin.concat(g_resCommonSlot_normal),
		purgeTarget		: resSpookyPumpkin,
		soundRes   		: g_sndSpookyPumpkin,
		manifestPath 	: 'spookyPumpkin.manifest',
		game_id    		: 119,
		scene      		: function() {
			return new SpookyPumpkin( this.game_id, this.name );
		},
        jsName		 : 'SpookyPumpkin',
	},

    {
        name       		: 'penguinFrenzy',
        res        		: g_resPenguinFrenzy.concat(g_resCommonClassicSlot_normal),
        purgeTarget		: resPenguinFrenzy,
        soundRes   		: g_sndPenguinFrenzy,
        manifestPath 	: 'penguinFrenzy.manifest',
        game_id    		: 122,
        scene      		: function() {
            return new PenguinFrenzy( this.game_id, this.name );
        },
        jsName		 : 'PenguinFrenzy',
    },

    {
        name       		: 'wheelOfJackpotCS',
        res        		: g_resWheelOfJackpotCS.concat(g_resCommonClassicSlot_normal),
        purgeTarget		: resWheelOfJackpotCS,
        soundRes   		: g_sndWheelOfJackpotCS,
        manifestPath 	: 'wheelOfJackpotCS.manifest',
        game_id    		: 121,
        scene      		: function() {
            return new WheelOfJackpotCS( this.game_id, this.name );
        },
        jsName 	   : 'WheelOfJackpotCS',
    },
    {
        name       : 'devilsVault',
        res        : g_resDevilsVault.concat(g_resCommonSlot_normal),
        purgeTarget: resDevilsVault,
        soundRes   : g_sndDevilsVault,
        manifestPath 	: 'devilsVault.manifest',
        game_id    : 123,
        scene      : function() {
            return new DevilsVault( this.game_id, this.name );
        },
        jsName 	   : 'DevilsVault',
    },
	{
		name       : 'royalDiamonds',
		res        : g_resRoyalDiamonds.concat(g_resCommonSlot_normal),
		purgeTarget: resRoyalDiamonds,
		soundRes   : g_sndRoyalDiamonds,
		manifestPath 	: 'royalDiamonds.manifest',
		game_id    : 125,
		scene      : function() {
			return new RoyalDiamonds( this.game_id, this.name );
		},
        jsName 	   : 'RoyalDiamonds',
	},
	{
		name       : 'littlePiggyTrio',
		res        : g_resLittlePiggyTrio.concat(g_resCommonSlot_normal),
		purgeTarget: resLittlePiggyTrio,
		soundRes   : g_sndLittlePiggyTrio,
		manifestPath : 'littlePiggyTrio.manifest',
		game_id    : 127,
		scene      : function() {
			return new LittlePiggyTrio( this.game_id, this.name );
		},
        jsName 	   : 'LittlePiggyTrio',
	},

	{
		name       : 'legacyOfTheGods',
		res        : g_resLegacyOfTheGods.concat(g_resCommonSlot_normal),
		purgeTarget: resLegacyOfTheGods,
		soundRes   : g_sndLegacyOfTheGods,
		manifestPath : 'legacyOfTheGods.manifest',
		game_id    : 126,
		scene      : function() {
			return new LegacyOfTheGods( this.game_id, this.name );
		},
        jsName 	   : 'LegacyOfTheGods',
	},

	{
		name       : 'fuFuDiamond',
		res        : g_resFuFuDiamond.concat(g_resCommonSlot_normal),
		purgeTarget: resFuFuDiamond,
		soundRes   : g_sndFuFuDiamond,
		manifestPath : 'fuFuDiamond.manifest',
		game_id    : 128,
		scene      : function() {
			return new FuFuDiamond( this.game_id, this.name );
		},
        jsName	   : 'FuFuDiamond',
	},
	{
		name       	: 'infernoVsStormRoom',
		res        	: g_resInfernoVsStormRoom,
		purgeTarget	: resInfernoVsStormRoom,
		soundRes   	: g_sndInfernoVsStormRoom,
		manifestPath : 'infernoVSStormRoom.manifest',
		game_id    	: 130,
		isRoom		: true,
		socialSlotID: 1,
		isVipLounge : false,
		scene      	: function() {
			return new InfernoVsStormRoom( this.game_id, this.name );
		},
        jsName 	   : 'infernoVsStormRoom',
	},
	{
		name       	: 'infernoVSStorm',
		res        : g_resInfernoVsStorm.concat(g_resCommonClassicSlot_normal),
		purgeTarget	: resInfernoVsStorm,
		soundRes   	: g_sndInfernoVsStorm,
		manifestPath : 'infernoVSStorm.manifest',
		game_id    	: 130,
		scene      	: function() {
			return new InfernoVsStorm( this.game_id, this.name );
		},
        jsName 	   : 'infernoVSStorm',
	},

    {
        name       : 'chiliFiesta',
        res        : g_resChiliFiesta.concat(g_resCommonSlot_normal),
        purgeTarget: resChiliFiesta,
        soundRes   : g_sndChiliFiesta,
        manifestPath : 'chiliFiesta.manifest',
        game_id    : 129,
        scene      : function() {
            return new ChiliFiesta( this.game_id, this.name );
        },
        jsName	   : 'ChiliFiesta',
    },
	{
		name       : 'purrfectBingo',
		res        : g_resPurrfectBingo.concat(g_resCommonSlot_normal),
		soundRes   : g_sndPurrfectBingo,
        manifestPath : 'purrfectBingo.manifest',
		game_id    : 131,
		scene      : function() {
			return new PurrfectBingo( this.game_id, this.name );
		},
        jsName	   : 'PurrfectBingo',
	},
	{
		name       : 'faCaiPotLink',
		res        : g_resFaCaiPotLink.concat(g_resCommonSlot_normal),
		soundRes   : g_sndFaCaiPotLink,
		manifestPath : 'faCaiPotLink.manifest',
		game_id    : 134,
		scene      : function() {
			return new FaCaiPot( this.game_id, this.name );
		},
        jsName	   : 'FaCaiPotLink',
	},
	{
		name       : 'threeWishes',
		res        : g_resGeniesWishes.concat(g_resCommonSlot_normal),
		purgeTarget: resGeniesWishes,
		soundRes   : g_sndGeniesWishes,
		manifestPath : 'threeWishes.manifest',
		game_id    : 133,
		scene      : function() {
			return new GeniesWishes( this.game_id, this.name );
		},
        jsName	   : 'GenieWishes',
	},

    {
        name       : 'shootTheRiches',
        res        : g_resShootTheRiches.concat(g_resCommonSlot_normal),
        purgeTarget: resShootTheRiches,
        soundRes   : g_sndShootTheRiches,
        manifestPath : 'shootTheRiches.manifest',
        game_id    : 135,
        scene      : function() {
            return new ShootTheRiches( this.game_id, this.name );
        },
        jsName 	   : 'ShootTheRiches',
    },

    {
        name       : 'merlinsMagicBox',
        res        : g_resMerlinsMagicBox.concat(g_resCommonSlot_normal),
        purgeTarget: resMerlinsMagicBox,
        soundRes   : g_sndMerlinsMagicBox,
        manifestPath : 'merlinsMagicBox.manifest',
        game_id    : 136,
        scene      : function() {
            return new MerlinsMagicBox( this.game_id, this.name );
        },
        jsName 	   : 'MerlinsMagicBox',
    },

	{
		name       : 'junglesTreasure',
		res        : g_resJunglesTreasure.concat(g_resCommonSlot_normal),
		purgeTarget: resJunglesTreasure,
		soundRes   : g_sndJunglesTreasure,
		manifestPath : 'junglesTreasure.manifest',
		game_id    : 137,
		scene      : function() {
			return new JunglesTreasure( this.game_id, this.name );
		},
        jsName 	   : 'JunglesTreasure',
	},

    {
        name       : 'jackpotHammerLink',
        res        : g_resJackpotHammerLink.concat(g_resCommonSlot_normal),
        purgeTarget: resJackpotHammerLink,
        soundRes   : g_sndJackpotHammerLink,
        manifestPath : 'jackpotHammerLink.manifest',
        game_id    : 138,
        scene      : function() {
            return new JackpotHammerLink( this.game_id, this.name );
        },
        jsName 	   : 'jackpotHammerLink'
    },
	{
		name       : 'monkeysMight',
		res        : g_resMonkeysMight.concat(g_resCommonSlot_normal),
		purgeTarget: resMonkeysMight,
		soundRes   : g_sndMonkeysMight,
		manifestPath : 'monkeysMight.manifest',
		game_id    : 139,
		scene      : function() {
			return new MonkeysMight( this.game_id, this.name );
		},
        jsName 	   : 'MonkeysMight'
	},

	{
		name       : 'mayanDoubleJackpot',
		res        : g_resMayanDoubleJackpot.concat(g_resCommonSlot_normal),
		purgeTarget: resMayanDoubleJackpot,
		soundRes   : g_sndMayanDoubleJackpot,
		manifestPath : 'mayanDoubleJackpot.manifest',
		game_id    : 143,
		scene      : function() {
			return new MayanDoubleJackpot( this.game_id, this.name );
		},
		jsName     : "MayanDoubleJackpot"
	},
	{
		name       : 'goldenEggDrop',
		res        : g_resGoldenEggDrop.concat(g_resCommonSlot_normal),
		purgeTarget: resGoldenEggDrop,
		soundRes   : g_sndGoldenEggDrop,
		manifestPath : 'goldenEggDrop.manifest',
		game_id    : 144,
		scene      : function() {
			return new GoldenEggDrop( this.game_id, this.name );
		},
		jsName     : "GoldenEggDrop"
	},
    {
        name       : 'draculasDen',
        res        : g_resDraculasDen.concat(g_resCommonSlot_normal),
        purgeTarget: resDraculasDen,
        soundRes   : g_sndDraculasDen,
        manifestPath : 'draculasDen.manifest',
        game_id    : 151,
        scene      : function() {
            return new DraculasDen( this.game_id, this.name );
        },
        jsName 	   : 'DraculasDen',
    },

    {
        name       : 'witchsDen',
        res        : g_resWitchsDen.concat(g_resCommonSlot_normal),
        purgeTarget: resWitchsDen,
        soundRes   : g_sndWitchsDen,
        manifestPath : 'witchsDen.manifest',
        game_id    : 152,
        scene      : function() {
            return new WitchsDen( this.game_id, this.name );
        },
        jsName 	   : 'WitchsDen',
    },
	{
		name       : 'aegisOfTheGoddess',
		res        : g_resAegisOfTheGoddess.concat(g_resCommonSlot_normal),
		purgeTarget: resAegisOfTheGoddess,
		soundRes   : g_sndAegisOfTheGoddess,
		manifestPath : 'aegisOfTheGoddess.manifest',
		game_id    : 146,
		jsName 	   : 'AegisOfTheGoddess',
		scene      : function() {
			return new AegisOfTheGoddess( this.game_id, this.name );
		}
	},
	{
		name       : 'dragonHeart',
		res        : g_resDragonHeart.concat(g_resCommonSlot_normal),
		purgeTarget: resDragonHeart,
		soundRes   : g_sndDragonHeart,
		manifestPath : 'dragonHeart.manifest',
		game_id    : 149,
		jsName 	   : 'DragonHeart',
		scene      : function() {
			return new DragonHeart( this.game_id, this.name );
		}
	},
    {
        name       : 'sandsOfFortune', //'sandsOfFortune',
        res        : g_resSandsOfFortune.concat(g_resCommonSlot_normal),
        purgeTarget: resSandsOfFortune,
        soundRes   : g_sndSandsOfFortune,
        manifestPath : 'sandsOfFortune.manifest',
        game_id    : 150,
        jsName 	   : 'SandsOfFortune',
        scene      : function() {
            return new SandsOfFortune( this.game_id, this.name );
        }
    },
	{
		name       : 'monsterParadeBoost',
		res        : g_resMonsterParadeBoost.concat(g_resCommonSlot_normal),
		purgeTarget: resMonsterParadeBoost,
		soundRes   : g_sndMonsterParadeBoost,
		manifestPath : 'monsterParadeBoost.manifest',
		game_id    : 148,
		jsName 	   : 'MonsterParadeBoost',
		scene      : function() {
			return new MonsterParadeBoost( this.game_id, this.name );
		}
	},
	{
		name       : 'bingoMine',
		res        : g_resBingoMine.concat(g_resCommonSlot_normal),
		purgeTarget: resBingoMine,
		soundRes   : g_sndBingoMine,
		manifestPath : 'bingoMine.manifest',
		game_id    : 145,
		jsName 	   : 'BingoMine',
		scene      : function() {
			return new BingoMine( this.game_id, this.name );
		}
	},

    {
        name       : 'theDogFather',
        res        : g_resTheDogFather.concat(g_resCommonSlot_normal),
        purgeTarget: resTheDogFather,
        soundRes   : g_sndTheDogFather,
        manifestPath : 'theDogFather.manifest',
		jsName 	   : 'TheDogFather',
        game_id    : 153,
        scene      : function() {
            return new TheDogFather( this.game_id, this.name );
        }
    },

	{
		name       : 'theMagicalLupin',
		res        : g_resTheMagicalLupin.concat(g_resCommonSlot_normal),
		purgeTarget: resTheMagicalLupin,
		soundRes   : g_sndTheMagicalLupin,
		manifestPath : 'theMagicalLupin.manifest',
		jsName	   : 'TheMagicalLupin',
		game_id    : 154,
		scene      : function() {
			return new TheMagicalLupin( this.game_id, this.name );
		}
	},

    {
        name       : 'goldenHoneyPot',
        res        : g_resGoldenHoneyPot.concat(g_resCommonSlot_normal),
        purgeTarget: resGoldenHoneyPot,
        soundRes   : g_sndGoldenHoneyPot,
        manifestPath : 'goldenHoneyPot.manifest',
        jsName	   : 'GoldenHoneyPot',
        game_id    : 155,
        scene      : function() {
            return new GoldenHoneyPot( this.game_id, this.name );
        }
    },
	{
		name       : 'goCatchFish',
		res        : g_resGoCatchFish.concat(g_resCommonSlot_normal),
		purgeTarget: resGoCatchFish,
		soundRes   : g_sndGoCatchFish,
		manifestPath : 'goCatchFish.manifest',
		jsName	   : 'GoCatchFish',
		game_id    : 156,
		scene      : function() {
			return new GoCatchFish( this.game_id, this.name );
		}
	},
	{
		name       : 'goldenEggDropHammerTime',
		res        : g_resGoldenEggDropHammerTime.concat(g_resCommonSlot_normal),
		purgeTarget: resGoldenEggDropHammerTime,
		soundRes   : g_sndGoldenEggDropHammerTime,
		manifestPath : 'goldenEggDropHammerTime.manifest',
		jsName	   : 'GoldenEggDropHammerTime',
		game_id    : 159,
		scene      : function() {
			return new GoldenEggDropHammerTime( this.game_id, this.name );
		}
	},
	{
		name       : 'tripleMeTreasures',
		res        : g_resTripleMeTreasures.concat(g_resCommonSlot_normal),
		purgeTarget: resTripleMeTreasures,
		soundRes   : g_sndTripleMeTreasures,
		manifestPath : 'tripleMeTreasures.manifest',
		jsName	   : 'TripleMeTreasures',
		game_id    : 157,
		scene      : function() {
			return new TripleMeTreasures( this.game_id, this.name );
		}
	},
    {
        name       : 'huaMeiBaoShi',
        res        : g_resHuaMeiBaoShi.concat(g_resCommonSlot_normal),
        purgeTarget: resHuaMeiBaoShi,
        soundRes   : g_sndHuaMeiBaoShi,
        manifestPath : 'huameibaoshi.manifest',
        jsName	   : 'HuaMeiBaoShi',
        game_id    : 158,
        scene      : function() {
            return new HuaMeiBaoShi( this.game_id, this.name );
        }
    },
	{
		name       : 'bananzaCoins',
		res        : g_resBananzaCoins.concat(g_resCommonSlot_normal),
		purgeTarget: resBananzaCoins,
		soundRes   : g_sndBananzaCoins,
		manifestPath : 'bananzaCoins.manifest',
		jsName	   : 'bananzaCoins',
		game_id    : 160,
		scene      : function() {
			return new BananzaCoins( this.game_id, this.name );
		}
	},
	{
		name       : 'zeusLinkAndHadesLink',
		res        : g_resZeusLinkAndHadesLink.concat(g_resCommonSlot_normal),
		purgeTarget: resZeusLinkAndHadesLink,
		soundRes   : g_sndZeusLinkAndHadesLink,
		manifestPath : 'zeusLinkAndHadesLink.manifest',
		jsName	   : 'zeusLinkAndHadesLink',
		game_id    : 161,
		scene      : function() {
			return new ZeusLinkAndHadesLink( this.game_id, this.name );
		}
	},
	{
		name       : 'goldenPiggy',
		res        : g_resGoldenPiggy.concat(g_resCommonSlot_normal),
		purgeTarget: resGoldenPiggy,
		soundRes   : g_sndGoldenPiggy,
		manifestPath : 'goldenPiggy.manifest',
		jsName	   : 'goldenPiggy',
		game_id    : 162,
		scene      : function() {
			return new GoldenPiggy( this.game_id, this.name );
		}
	},
	{
		name       : 'elToroParade',
		res        : g_resElToroParade.concat(g_resCommonSlot_normal),
		purgeTarget: resElToroParade,
		soundRes   : g_sndelToroParade,
		manifestPath : 'elToroParade.manifest',
		jsName	   : 'elToroParade',
		game_id    : 163,
		scene      : function() {
			return new elToroParade( this.game_id, this.name );
		}
	},
	{
		name       : 'theTaleOfCinderella',
		res        : g_resTheTaleOfCinderella.concat(g_resCommonSlot_normal),
		purgeTarget: resTheTaleOfCinderella,
		soundRes   : g_sndTheTaleOfCinderella,
		manifestPath : 'TheTaleOfCinderella.manifest',
		jsName	   : 'TheTaleOfCinderella',
		game_id    : 164,
		scene      : function() {
			return new TheTaleOfCinderella( this.game_id, this.name );
		}
	},
	{
		name       : 'frogPrinceMagic',
		res        : g_resFrogPrinceMagic.concat(g_resCommonSlot_normal),
		purgeTarget: resFrogPrinceMagic,
		soundRes   : g_sndFrogPrinceMagic,
		manifestPath : 'frogPrinceMagic.manifest',
		jsName	   : 'frogPrinceMagic',
		game_id    : 165,
		scene      : function() {
			return new FrogPrinceMagic( this.game_id, this.name );
		}
	},
    {
        name       : 'sherlockMysteryCard',
        res        : g_resSlot166.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot166,
        soundRes   : g_sndSlot166,
		manifestPath : 'sherlockMysteryCard.manifest',
		jsName	   : 'sherlockMysteryCard',
        game_id    : 166,
        scene      : function() {
            return new SherlockMysteryCard( this.game_id, this.name );
        }
    },
	{
		name       : 'pantherGold',
		res        : g_resPantherGold.concat(g_resCommonSlot_normal),
		purgeTarget: resPantherGold,
		soundRes   : g_sndPantherGold,
		manifestPath : 'pantherGold.manifest',
		jsName	   : 'pantherGold',
		game_id    : 167,
		scene      : function() {
			return new PantherGold( this.game_id, this.name );
		}
	},
	{
		name       : 'excaliburSwordOfMagic',
		res        : g_resExcaliburSwordOfMagic.concat(g_resCommonSlot_normal),
		purgeTarget: resExcaliburSwordOfMagic,
		soundRes   : g_sndExcaliburSwordOfMagic,
		manifestPath : 'excaliburSwordOfMagic.manifest',
		jsName	   : 'excaliburSwordOfMagic',
		game_id    : 168,
		scene      : function() {
			return new ExcaliburSwordOfMagic( this.game_id, this.name );
		}
	},
	{
		name       : 'mrLuckysBakery',
		res        : g_resMrLuckysBakery.concat(g_resCommonSlot_normal),
		purgeTarget: resMrLuckysBakery,
		soundRes   : g_sndMrLuckysBakery,
		manifestPath : 'mrLuckysBakery.manifest',
		jsName	   : 'mrLuckysBakery',
		game_id    : 169,
		scene      : function() {
			return new MrLuckysBakery( this.game_id, this.name );
		}
	},
	{
		name       : 'goblinsTreasures',
		res        : g_resGoblinsTreasures.concat(g_resCommonSlot_normal),
		purgeTarget: resGoblinsTreasures,
		soundRes   : g_sndGoblinsTreasures,
		manifestPath : 'goblinsTreasures.manifest',
		jsName	   : 'goblinsTreasures',
		game_id    : 170,
		scene      : function() {
			return new GoblinsTreasures( this.game_id, this.name );
		}
	},
    {
        name       : 'wildWestGoldCard',
        res        : g_resSlot172.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot172,
        soundRes   : g_sndSlot172,
        manifestPath : 'wildWestGoldCard.manifest',
        jsName	   : 'wildWestGoldCard',
        game_id    : 172,
        scene      : function() {
            return new WildWestGoldCard( this.game_id, this.name, resSlot172 );
        }
    },
    {
        name       : 'rollingInMoneyBlast',
        res        : g_resSlot175.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot175,
        soundRes   : g_sndSlot175,
        manifestPath : 'rollingInMoneyBlast.manifest',
        jsName	   : 'rollingInMoneyBlast',
        game_id    : 175,
        scene      : function() {
            return new RollingInMoneyBlast( this.game_id, this.name );
        }
    },
	{
		name       : 'tripleFortune',
		res        : g_resTripleFortune.concat(g_resCommonSlot_normal),
		purgeTarget: resTripleFortune,
		soundRes   : g_sndTripleFortune,
		manifestPath : 'tripleFortune.manifest',
		jsName	   : 'tripleFortune',
		game_id    : 173,
		scene      : function() {
			return new TripleFortune( this.game_id, this.name );
		}
	},
	{
		name       : 'legendOfTheJungle',
		res        : g_resLegendOfTheJungle.concat(g_resCommonSlot_normal),
		purgeTarget: resLegendOfTheJungle,
		soundRes   : g_sndLegendOfTheJungle,
		manifestPath : 'legendOfTheJungle.manifest',
		jsName	   : 'legendOfTheJungle',
		game_id    : 174,
		scene      : function() {
			return new LegendOfTheJungle( this.game_id, this.name );
		}
	},
	{
		name       : 'spookyMansion',
		res        : g_resSpookyMansion.concat(g_resCommonSlot_normal),
		purgeTarget: resSpookyMansion,
		soundRes   : g_sndSpookyMansion,
		manifestPath : 'spookyMansion.manifest',
		jsName	   : 'spookyMansion',
		game_id    : 176,
		scene      : function() {
			return new SpookyMansion( this.game_id, this.name );
		}
	},
    {
        name       : 'moreMoreAcorns',
        res        : g_resSlot177.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot177,
        soundRes   : g_sndSlot177,
        manifestPath : 'moremoreacorns.manifest',
        jsName	   : 'moremoreacorns',
        game_id    : 177,
        scene      : function() {
            return new MoreMoreAcorns( this.game_id, this.name, resSlot177 );
        }
    },
	{
		name       : 'fervorCircus',
		res        : g_resFervorCircus.concat(g_resCommonSlot_normal),
		purgeTarget: resFervorCircus,
		soundRes   : g_sndFervorCircus,
		manifestPath : 'fervorCircus.manifest',
		jsName	   : 'fervorCircus',
		game_id    : 178,
		scene      : function() {
			return new FervorCircus( this.game_id, this.name );
		}
	},
	{
		name       : 'peterPanBegins',
		res        : g_resPeterPanBegins.concat(g_resCommonSlot_normal),
		purgeTarget: resPeterPanBegins,
		soundRes   : g_sndPeterPanBegins,
		manifestPath : 'peterPanBegins.manifest',
		jsName	   : 'peterPanBegins',
		game_id    : 179,
		scene      : function() {
			return new PeterPanBegins( this.game_id, this.name );
		}
	},
	{
		name       : 'mythicApples',
		res        : g_resSlot182.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot182,
		soundRes   : g_sndSlot182,
		manifestPath : 'MythicApples.manifest',
		jsName	   : 'mythicApples',
		game_id    : 182,
		scene      : function() {
			return new MythicApples( this.game_id, this.name, resSlot182 );
		}
	},
	{
		name       : 'calaveraParade',
		res        : g_resCalaveraParade.concat(g_resCommonSlot_normal),
		purgeTarget: resCalaveraParade,
		soundRes   : g_sndCalaveraParade,
		manifestPath : 'calaveraParade.manifest',
		jsName	   : 'calaveraParade',
		game_id    : 181,
		scene      : function() {
			return new CalaveraParade( this.game_id, this.name );
		}
	},
	{
		name		: 'captainHookReturns',
		res			: g_resCaptainHookReturns.concat(g_resCommonSlot_normal),
		purgeTarget	: resCaptainHookReturns,
		soundRes	: g_sndCaptainHookReturns,
		manifestPath : 'captainHookReturns.manifest',
		jsName		: 'captainHookReturns',
		game_id		: 180,
		scene		: function () {
			return new CaptainHookReturns(this.game_id, this.name);
		}
	},
	{
		name       : 'whiteFortune',
		res        : g_resSlot183.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot183,
		soundRes   : g_sndSlot183,
		manifestPath : 'whiteFortune.manifest',
		jsName	   : 'whiteFortune',
		game_id    : 183,
		scene      : function() {
			return new WhiteFortune( this.game_id, this.name, resSlot183 );
		}
	},
    {
        name       : 'diggyCrush',
        res        : g_resSlot185.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot185,
        soundRes   : g_sndSlot185,
        manifestPath : 'SlotResource_185.manifest',
        jsName	   : 'diggyCrush',
        game_id    : 185,
        scene      : function() {
            return new DiggyCrush( this.game_id, this.name, resSlot185 );
        }
    },
	{
		name       : 'wickedFortune',
		res        : g_resSlot184.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot184,
		soundRes   : g_sndSlot184,
		manifestPath : 'wickedFortune.manifest',
		jsName	   : 'wickedFortune',
		game_id    : 184,
		scene      : function() {
			return new WickedFortune( this.game_id, this.name, resSlot184 );
		}
	},
	{
		name       : 'wickedBoosFamily',
		res        : g_resSlot187.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot187,
		soundRes   : g_sndSlot187,
		manifestPath : 'wickedBoosFamily.manifest',
		jsName	   : 'wickedBoosFamily',
		game_id    : 187,
		scene      : function() {
			return new WickedBoosFamily( this.game_id, this.name, resSlot187);
		}
	},
	{
		name       : 'flippinRich',
		res        : g_resSlot_flippinRich.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot_flippinRich,
		soundRes   : g_sndSlot_flippinRich,
		manifestPath : 'SlotResource_186.manifest',
		jsName	   : 'flippinRich',
		game_id    : 186,
		scene      : function() {
			return new flippinRich( this.game_id, this.name, resSlot_flippinRich );
		}
	},
	{
		name       : 'luckyIgnite',
		res        : g_resSlot190.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot190,
		soundRes   : g_sndSlot190,
		manifestPath : 'luckyIgnite.manifest',
		jsName	   : 'luckyIgnite',
		game_id    : 190,
		scene      : function() {
			return new LuckyIgnite( this.game_id, this.name, resSlot190 );
		}
	},
	{
		name       : 'plushCarnival',
		res        : g_resSlot192.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot192,
		soundRes   : g_sndSlot192,
		manifestPath : 'plushCarnival.manifest',
		jsName	   : 'plushCarnival',
		game_id    : 192,
		scene      : function() {
			return new PlushCarnival( this.game_id, this.name, resSlot192 );
		}
	},
    {
        name       : 'alchemyTrio',
        res        : g_resSlot193.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot193,
        soundRes   : g_sndSlot193,
        manifestPath : 'alchemyTrio.manifest',
        jsName	   : 'alchemyTrio',
        game_id    : 193,
        scene      : function() {
            return new AlchemyTrio( this.game_id, this.name, resSlot193 );
        }
    },
	{
		name       : 'shamknockOnWood',
		res        : g_resSlot194.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot194,
		soundRes   : g_sndSlot194,
		manifestPath : 'resSlot194.manifest',
		jsName	   : 'ShamknockOnWood',
		game_id    : 194,
		scene      : function() {
			return new ShamknockOnWood( this.game_id, this.name, resSlot194 );
		}
	},
	{
		name       : 'blastingBulls',
		res        : g_resSlot195.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot195,
		soundRes   : g_sndSlot195,
		manifestPath : 'blastingBulls.manifest',
		jsName	   : 'blastingBulls',
		game_id    : 195,
		scene      : function() {
			return new BlastingBulls( this.game_id, this.name, resSlot195 );
		}
	},
	{
		name       : 'eggcellentAtelier',
		res        : g_resSlot196.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot196,
		soundRes   : g_sndSlot196,
		manifestPath : 'eggcellentAtelier.manifest',
		jsName	   : 'eggcellentAtelier',
		game_id    : 196,
		scene      : function() {
			return new EggcellentAtelier( this.game_id, this.name, resSlot196 );
		}
	},
	{
		name       : 'strikingGold',
		res        : g_resSlot197.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot197,
		soundRes   : g_sndSlot197,
		manifestPath : 'strikingGold.manifest',
		jsName	   : 'strikingGold',
		game_id    : 197,
		scene      : function() {
			return new StrikingGold( this.game_id, this.name, resSlot197 );
		}
	},
	{
		name       : 'colossalZodiac',
		res        : g_resSlot198.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot198,
		soundRes   : g_sndSlot198,
		manifestPath : 'colossalZodiac.manifest',
		jsName	   : 'colossalZodiac',
		game_id    : 198,
		scene      : function() {
			return new ColossalZodiac( this.game_id, this.name, resSlot198 );
		}
	},
	{
		name       : 'eternalLove',
		res        : g_resSlot199.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot199,
		soundRes   : g_sndSlot199,
		manifestPath : 'Slot199.manifest',
		jsName	   : 'Slot199',
		game_id    : 199,
		scene      : function() {
			return new Slot199( this.game_id, this.name, resSlot199 );
		}
	},
	{
		name       : 'goldenRaffle',
		res        : g_resSlot202.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot202,
		soundRes   : g_sndSlot202,
		manifestPath : 'goldenRaffle.manifest',
		jsName	   : 'goldenRaffle',
		game_id    : 202,
		scene      : function() {
			return new GoldenRaffle( this.game_id, this.name, resSlot202 );
		}
	},
	{
		name       : 'blazingPhoenix',
		res        : g_resSlot200.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot200,
		soundRes   : g_sndSlot200,
		manifestPath : 'blazingPhoenix.manifest',
		jsName	   : 'blazingPhoenix',
		game_id    : 200,
		scene      : function() {
			return new BlazingPhoenix( this.game_id, this.name, resSlot200 );
		}
	},
	{
		name       : 'beanstalkBonanza',
		res        : g_resSlot201.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot201,
		soundRes   : g_sndSlot201,
		manifestPath : 'beanstalkBonanza.manifest',
		jsName	   : 'beanstalkBonanza',
		game_id    : 201,
		scene      : function() {
			return new BeanstalkBonanza( this.game_id, this.name, resSlot201 );
		}
	},
	{
		name       : 'masterChef',
		res        : g_resSlot204.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot204,
		soundRes   : g_sndSlot204,
		manifestPath : 'masterChef.manifest',
		jsName	   : 'masterChef',
		game_id    : 204,
		scene      : function() {
			return new masterChef( this.game_id, this.name, resSlot204 );
		}
	},
	{
		name       : 'crazyRichPandas',
		res        : g_resSlot203.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot203,
		soundRes   : g_sndSlot203,
		manifestPath : 'crazyRichPandas.manifest',
		jsName	   : 'crazyRichPandas',
		game_id    : 203,
		scene      : function() {
			return new CrazyRichPandas( this.game_id, this.name, resSlot203 );
		}
	},
	{
		name       : 'buzzBonanza',
		res        : g_resSlot205.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot205,
		soundRes   : g_sndSlot205,
		manifestPath : 'buzzBonanza.manifest',
		jsName	   : 'buzzBonanza',
		game_id    : 205,
		scene      : function() {
			return new BuzzBonanza( this.game_id, this.name, resSlot205 );
		}
	},
	{
		name       : 'potatoKingdom',
		res        : g_resSlot206.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot206,
		soundRes   : g_sndSlot206,
		manifestPath : 'potatoKingdom.manifest',
		jsName	   : 'potatoKingdom',
		game_id    : 206,
		scene      : function() {
			return new PotatoKingdom( this.game_id, this.name, resSlot206 );
		}
	},
	{
		name       : 'allThatJazz',
		res        : g_resSlot208.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot208,
		soundRes   : g_sndSlot208,
		manifestPath : 'allThatJazz.manifest',
		jsName	   : 'allThatJazz',
		game_id    : 208,
		scene      : function() {
			return new AllThatJazz( this.game_id, this.name, resSlot208 );
		}
	},
	{
		name       : 'luckyNekoParade',
		res        : g_resSlot207.concat( g_resCommonSlot_normal ),
		purgeTarget: resSlot207,
		soundRes   : g_sndSlot207,
		manifestPath : 'luckyNekoParade.manifest',
		jsName	   : 'luckyNekoParade',
		game_id    : 207,
		scene      : function() {
			return new luckyNekoParade( this.game_id, this.name, resSlot207 );
		}
	},
	{
		name       : 'helloweenParty',
		res        : g_resSlot209.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot209,
		soundRes   : g_sndSlot209,
		manifestPath : 'helloweenParty.manifest',
		jsName	   : 'helloweenParty',
		game_id    : 209,
		scene      : function() {
			return new HelloweenParty( this.game_id, this.name, resSlot209 );
		}
	},
	{
		name       : 'cookieCrumbAdventure',
		res        : g_resSlot210.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot210,
		soundRes   : g_sndSlot210,
		manifestPath : 'cookieCrumbAdventure.manifest',
		jsName	   : 'cookieCrumbAdventure',
		game_id    : 210,
		scene      : function() {
			return new CookieCrumbAdventure( this.game_id, this.name, resSlot210 );
		}
	},
	{
		name       : 'drsSecretLab',
		res        : g_resSlot212.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot212,
		soundRes   : g_sndSlot212,
		manifestPath : 'drsSecretLab.manifest',
		jsName	   : 'drsSecretLab',
		game_id    : 212,
		scene      : function() {
			return new drsSecretLab( this.game_id, this.name, resSlot212 );
		}
	},
	{
		name       : 'gummyYummyFiesta',
		res        : g_resSlot211.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot211,
		soundRes   : g_sndSlot211,
		manifestPath : 'gummyYummyFiesta.manifest',
		jsName	   : 'gummyYummyFiesta',
		game_id    : 211,
		scene      : function() {
			return new GummyYummyFiesta( this.game_id, this.name, resSlot211 );
		}
	},
	{
		name       : 'sizzlingBaskets',
		res        : g_resSlot213.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot213,
		soundRes   : g_sndSlot213,
		manifestPath : 'sizzlingBaskets.manifest',
		jsName	   : 'sizzlingBaskets',
		game_id    : 213,
		scene      : function() {
			return new SizzlingBaskets( this.game_id, this.name, resSlot213 );
		}
	},
	{
		name       : 'xFlight',
		res        : g_resSlot990.concat(g_resCommonCrash_normal),
		purgeTarget: resSlot990,
		soundRes   : g_sndSlot990,
		manifestPath : 'xFlight.manifest',
		jsName	   : 'xFlight',
		game_id    : 990,
		scene      : function() {
			return new XFlight( this.game_id, this.name, resSlot990 );
		}
	},
	{
		name       : 'sweetSmash',
		res        : g_resSlot214.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot214,
		soundRes   : g_sndSlot214,
		manifestPath : 'sweetSmash.manifest',
		jsName	   : 'sweetSmash',
		game_id    : 214,
		scene      : function() {
			return new SweetSmash( this.game_id, this.name, resSlot214 );
		}
	},
	{
		name       : 'bookOfCleosSecrets',
		res        : g_resSlot215.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot215,
		soundRes   : g_sndSlot215,
		manifestPath : 'bookOfCleosSecrets.manifest',
		jsName	   : 'bookOfCleosSecrets',
		game_id    : 215,
		scene      : function() {
			return new BookOfCleosSecrets( this.game_id, this.name, resSlot215 );
		}
	},
	{
		name       : 'richesToRiches',
		res        : g_resSlot217.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot217,
		soundRes   : g_sndSlot217,
		manifestPath : 'richesToRiches.manifest',
		jsName	   : 'richesToRiches',
		game_id    : 217,
		scene      : function() {
			return new RichesToRiches( this.game_id, this.name, resSlot217 );
		}
	},
	{
		name       : 'stellarScatters',
		res        : g_resSlot216.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot216,
		soundRes   : g_sndSlot216,
		manifestPath : 'stellarScatters.manifest',
		jsName	   : 'stellarScatters',
		game_id    : 216,
		scene      : function() {
			return new StellarScatters( this.game_id, this.name, resSlot216 );
		}
	},
	{
		name       : 'goldiesKingdom',
		res        : g_resSlot218.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot218,
		soundRes   : g_sndSlot218,
		manifestPath : 'goldiesKingdom.manifest',
		jsName	   : 'goldiesKingdom',
		game_id    : 218,
		scene      : function() {
			return new GoldiesKingdom( this.game_id, this.name, resSlot218 );
		}
	},
	{
		name       : 'grandHarvest',
		res        : g_resSlot219.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot219,
		soundRes   : g_sndSlot219,
		manifestPath : 'Grandharvest.manifest',
		jsName	   : 'grandHarvest',
		game_id    : 219,
		scene      : function() {
			return new GrandHarvest( this.game_id, this.name, resSlot219 );
		}
	},
	{
		name       : 'sharksBounty',
		res        : g_resSlot220.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot220,
		soundRes   : g_sndSlot220,
		manifestPath : 'sharksBounty.manifest',
		jsName	   : 'sharksBounty',
		game_id    : 220,
		scene      : function() {
			return new SharksBounty( this.game_id, this.name, resSlot220 );
		}
	},
	{
		name       : 'moreBarrelsMoreFruits',
		res        : g_resSlot221.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot221,
		soundRes   : g_sndSlot221,
		manifestPath : 'moreBarrelsMoreFruits.manifest',
		jsName	   : 'moreBarrelsMoreFruits',
		game_id    : 221,
		scene      : function() {
			return new MoreBarrelsMoreFruits( this.game_id, this.name, resSlot221 );
		}
	},
	{
		name       : 'flavorfulFive',
		res        : g_resSlot222.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot222,
		soundRes   : g_sndSlot222,
		manifestPath : 'flavorFulFive.manifest',
		jsName	   : 'flavorfulFive',
		game_id    : 222,
		scene      : function() {
			return new FlavorfulFive( this.game_id, this.name, resSlot222 );
		}
	},
	{
		name       : 'hornsAndHalos',
		res        : g_resSlot223.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot223,
		soundRes   : g_sndSlot223,
		manifestPath : 'hornsAndHalos.manifest',
		jsName	   : 'hornsAndHalos',
		game_id    : 223,
		scene      : function() {
			return new HornsAndHalos( this.game_id, this.name, resSlot223 );
		}
	},
	{
		name       : 'doomedToRiches',
		res        : g_resSlot224.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot224,
		soundRes   : g_sndSlot224,
		manifestPath : 'doomedToRiches.manifest',
		jsName	   : 'doomedToRiches',
		game_id    : 224,
		scene      : function() {
			return new DoomedToRiches( this.game_id, this.name, resSlot224 );
		}
	},
	{
		name       : 'monsterPrison',
		res        : g_resSlot226.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot226,
		soundRes   : g_sndSlot226,
		manifestPath : 'monsterPrison.manifest',
		jsName	   : 'monsterPrison',
		game_id    : 226,
		scene      : function() {
			return new MonsterPrison( this.game_id, this.name, resSlot226 );
		}
	},


	{
		name       : 'lockinPiggy',
		res        : g_resSlot225.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot225,
		soundRes   : g_sndSlot225,
		manifestPath : 'lockinPiggy.manifest',
		jsName	   : 'lockinPiggy',
		game_id    : 225,
		scene      : function() {
			return new lockinPiggy( this.game_id, this.name, resSlot225 );
		}
	},

	{
		name       : 'partyCrashers',
		res        : g_resSlot227.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot227,
		soundRes   : g_sndSlot227,
		manifestPath : 'partyCrashers.manifest',
		jsName	   : 'partyCrashers',
		game_id    : 227,
		scene      : function() {
			return new PartyCrashers( this.game_id, this.name, resSlot227 );
		}
	},
	{
		name       : 'wizardsPotionShop',
		res        : g_resSlot228.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot228,
		soundRes   : g_sndSlot228,
		manifestPath : 'wizardsPotionShop.manifest',
		jsName	   : 'wizardsPotionShop',
		game_id    : 228,
		scene      : function() {
			return new WizardsPotionShop( this.game_id, this.name, resSlot228 );
		}
	},
	{
		name       : 'jurassicTrio',
		res        : g_resSlot229.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot229,
		soundRes   : g_sndSlot229,
		manifestPath : 'jurassicTrio.manifest',
		jsName	   : 'jurassicTrio',
		game_id    : 229,
		scene      : function() {
			return new JurassicTrio( this.game_id, this.name, resSlot229 );
		}
	},
	{
		name       : 'hustlinHounds',
		res        : g_resSlot232.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot232,
		soundRes   : g_sndSlot232,
		manifestPath : 'hustlinHounds.manifest',
		jsName	   : 'hustlinHounds',
		game_id    : 232,
		scene      : function() {
			return new hustlinHounds( this.game_id, this.name, resSlot232 );
		}
	},
	{
		name       : 'moneyExpress',
		res        : g_resSlot233.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot233,
		soundRes   : g_sndSlot233,
		manifestPath : 'moneyExpress.manifest',
		jsName	   : 'moneyExpress',
		game_id    : 233,
		scene      : function() {
			return new MoneyExpress( this.game_id, this.name, resSlot233 );
		}
	},
	{
		name       : 'sweetyHammy',
		res        : g_resSlot234.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot234,
		soundRes   : g_sndSlot234,
		manifestPath : 'sweetyHammy.manifest',
		jsName	   : 'sweetyHammy',
		game_id    : 234,
		scene      : function() {
			return new SweetyHammy( this.game_id, this.name, resSlot234 );
		}
	},
	{
		name       : 'discoNightParty',
		res        : g_resSlot235.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot235,
		soundRes   : g_sndSlot235,
		manifestPath : 'discoNightParty.manifest',
		jsName	   : 'discoNightParty',
		game_id    : 235,
		scene      : function() {
			return new DiscoNightParty( this.game_id, this.name, resSlot235 );
		}
	},
	{
		name       : 'theFairyGrove',
		res        : g_resSlot236.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot236,
		soundRes   : g_sndSlot236,
		manifestPath : 'theFairyGrove.manifest',
		jsName	   : 'theFairyGrove',
		game_id    : 236,
		scene      : function() {
			return new theFairyGrove( this.game_id, this.name, resSlot236 );
		}
	},
	{
		name       : 'rabbitsTrail',
		res        : g_resSlot237.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot237,
		soundRes   : g_sndSlot237,
		manifestPath : 'rabbitsTrail.manifest',
		jsName	   : 'rabbitsTrail',
		game_id    : 237,
		scene      : function() {
			return new RabbitsTrail( this.game_id, this.name, resSlot237 );
		}
	},
	{
		name       : 'chickyChickyParade',
		res        : g_resSlot238.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot238,
		soundRes   : g_sndSlot238,
		manifestPath : 'chickyChickyParade.manifest',
		jsName	   : 'chickyChickyParade',
		game_id    : 238,
		scene      : function() {
			return new ChickyChickyParade( this.game_id, this.name, resSlot238 );
		}
	},
	{
		name       : 'catchAndWinBonanza',
		res        : g_resSlot239.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot239,
		soundRes   : g_sndSlot239,
		manifestPath : 'catchAndWinBonanza.manifest',
		jsName	   : 'catchAndWinBonanza',
		game_id    : 239,
		scene      : function() {
			return new CatchAndWinBonanza( this.game_id, this.name, resSlot239);
		}
	},
    {
		name       : 'mysticalBlossoms',
		res        : g_resSlot241.concat( g_resCommonSlot_normal ),
		purgeTarget: resSlot241,
		soundRes   : g_sndSlot241,
		manifestPath : 'mysticalBlossoms.manifest',
		jsName	   : 'mysticalBlossoms',
		game_id    : 241,
		scene      : function() {
			return new mysticalBlossoms( this.game_id, this.name, resSlot241 );
		}
	},
	{
		name       : 'magicalCoin',
		res        : g_resSlot240.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot240,
		soundRes   : g_sndSlot240,
		manifestPath : 'magicalCoin.manifest',
		jsName	   : 'magicalCoin',
		game_id    : 240,
		scene      : function() {
			return new MagicalCoin( this.game_id, this.name, resSlot240 );
		}
	},
	{
		name       : 'rodeoRush',
		res        : g_resSlot242.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot242,
		soundRes   : g_sndSlot242,
		manifestPath : 'rodeoRush.manifest',
		jsName	   : 'rodeoRush',
		game_id    : 242,
		scene      : function() {
			return new RodeoRush( this.game_id, this.name, resSlot242 );
		}
	},
	{
		name       : 'biggyPiggyTrio',
		res        : g_resSlot243.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot243,
		soundRes   : g_sndSlot243,
		manifestPath : 'biggyPiggyTrio.manifest',
		jsName	   : 'biggyPiggyTrio',
		game_id    : 243,
		orientation: 'portrait',
		scene      : function() {
			return new BiggyPiggyTrio( this.game_id, this.name, resSlot243);
		}
	},
	{
		name       : 'theGreatFoxby',
		res        : g_resSlot244.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot244,
		soundRes   : g_sndSlot244,
		manifestPath : 'theGreatFoxby.manifest',
		jsName	   : 'theGreatFoxby',
		game_id    : 244,
		scene      : function() {
			return new TheGreatFoxby( this.game_id, this.name, resSlot244 );
		}
	},
	{
		name       : 'genieCatsWish',
		res        : g_resSlot247.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot247,
		soundRes   : g_sndSlot247,
		manifestPath : 'genieCatsWish.manifest',
		jsName	   : 'genieCatsWish',
		game_id    : 247,
		scene      : function() {
			return new genieCatsWish( this.game_id, this.name, resSlot247 );
		}
	},
	{
		name       : 'drakeAndCake',
		res        : g_resSlot248.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot248,
		soundRes   : g_sndSlot248,
		manifestPath : 'drakeAndCake.manifest',
		jsName	   : 'drakeAndCake',
		game_id    : 248,
		scene      : function() {
			return new DrakeAndCake( this.game_id, this.name, resSlot248 );
		}
	},
	{
		name       : 'lockNLoot',
		res        : g_resSlot249.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot249,
		soundRes   : g_sndSlot249,
		manifestPath : 'lockNLoot.manifest',
		jsName	   : 'lockNLoot',
		game_id    : 249,
		scene      : function() {
			return new LockNLoot( this.game_id, this.name, resSlot249 );
		}
	},
	{
		name       : 'ancientTreasures',
		res        : g_resSlot250.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot250,
		soundRes   : g_sndSlot250,
		manifestPath : 'ancientTreasures.manifest',
		jsName	   : 'ancientTreasures',
		game_id    : 250,
		scene      : function() {
			return new AncientTreasures( this.game_id, this.name, resSlot250 );
		}
	},
	{
		name       : 'tikiFrenzy',
		res        : g_resSlot251.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot251,
		soundRes   : g_sndSlot251,
		manifestPath : 'tikiFrenzy.manifest',
		jsName	   : 'tikiFrenzy',
		game_id    : 251,
		scene      : function() {
			return new TikiFrenzy( this.game_id, this.name, resSlot251 );
		}
	},
	{
		name       : 'nekoFortune',
		res        : g_resSlot252.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot252,
		soundRes   : g_sndSlot252,
		manifestPath : 'nekoFortune.manifest',
		jsName	   : 'nekoFortune',
		game_id    : 252,
		scene      : function() {
			return new nekoFortune( this.game_id, this.name, resSlot252 );
		}
	},
    {
        name       : 'royalDragons',
        res        : g_resSlot253.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot253,
        soundRes   : g_sndSlot253,
        manifestPath : 'royalDragons.manifest',
        jsName	   : 'royalDragons',
        game_id    : 253,
        scene      : function() {
            return new RoyalDragons( this.game_id, this.name, resSlot253 );
        }
    },
	{
		name       : 'hippoBankBlast',
		res        : g_resSlot254.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot254,
		soundRes   : g_sndSlot254,
		manifestPath : 'hippoBankBlast.manifest',
		jsName	   : 'hippoBankBlast',
		game_id    : 254,
		scene      : function() {
			return new HippoBankBlast( this.game_id, this.name, resSlot254);
		}
	},
	{
		name       : 'boardwalkBonanza',
		res        : g_resSlot255.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot255,
		soundRes   : g_sndSlot255,
		manifestPath : 'boardwalkBonanza.manifest',
		jsName	   : 'boardwalkBonanza',
		game_id    : 255,
		scene      : function() {
			return new boardwalkBonanza( this.game_id, this.name, resSlot255 );
		}
	},
	{
		name       : 'roseInGold',
		res        : g_resSlot256.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot256,
		soundRes   : g_sndSlot256,
		manifestPath : 'roseInGold.manifest',
		jsName	   : 'roseInGold',
		game_id    : 256,
		scene      : function() {
			return new RoseInGold( this.game_id, this.name, resSlot256 );
		}
	},
	{
		name       : 'sharkRush',
		res        : g_resSlot257.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot257,
		soundRes   : g_sndSlot257,
		manifestPath : 'sharkRush.manifest',
		jsName	   : 'sharkRush',
		game_id    : 257,
		scene      : function() {
			return new SharkRush( this.game_id, this.name, resSlot257 );
		}
	},
	{
		name       : 'zoomZoomDouble',
		res        : g_resSlot258.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot258,
		soundRes   : g_sndSlot258,
		manifestPath : 'zoomZoomDouble.manifest',
		jsName	   : 'zoomZoomDouble',
		game_id    : 258,
		orientation: 'portrait',
		scene      : function() {
			return new ZoomZoomDouble( this.game_id, this.name, resSlot258);
		}
	},
       {
        name       : 'gorgonsGlare',
        res        : g_resSlot259.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot259,
        soundRes   : g_sndSlot259,
        manifestPath : 'gorgonsGlare.manifest',
        jsName	   : 'gorgonsGlare',
        game_id    : 259,
        scene      : function() {
            return new gorgonsGlare( this.game_id, this.name, resSlot259 );
        }
    },
    {
        name       : 'herculesSaga',
        res        : g_resSlot260.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot260,
        soundRes   : g_sndSlot260,
        manifestPath : 'herculesSaga.manifest',
        jsName	   : 'herculesSaga',
        game_id    : 260,
        scene      : function() {
            return new HerculesSaga( this.game_id, this.name, resSlot260 );
        }
    },
	{
		name       : 'goldenCase',
		res        : g_resSlot261.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot261,
		soundRes   : g_sndSlot261,
		manifestPath : 'goldenCase.manifest',
		jsName	   : 'goldenCase',
		game_id    : 261,
		orientation: 'portrait',
		scene      : function() {
			return new GoldenCase( this.game_id, this.name, resSlot261);
		}
	},
	{
		name       : 'doubleSunriseLock',
		res        : g_resSlot262.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot262,
		soundRes   : g_sndSlot262,
		manifestPath : 'doubleSunriseLock.manifest',
		jsName	   : 'doubleSunriseLock',
		game_id    : 262,
		scene      : function() {
			return new DoubleSunriseLock( this.game_id, this.name, resSlot262);
		}
	},
    {
        name       : 'millionDollarChickens',
        res        : g_resSlot263.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot263,
        soundRes   : g_sndSlot263,
        manifestPath : 'millionDollarChickens.manifest',
        jsName	   : 'millionDollarChickens',
        game_id    : 263,
        orientation: 'portrait',
        scene      : function() {
            return new MillionDollarChickens( this.game_id, this.name, resSlot263);
        }
    },
	{
		name       : 'hoggyween',
		res        : g_resSlot264.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot264,
		soundRes   : g_sndSlot264,
		manifestPath : 'hoggyween.manifest',
		jsName	   : 'hoggyween',
		game_id    : 264,
		scene      : function() {
			return new Hoggyween( this.game_id, this.name, resSlot264 );
		}
	},
	{
		name       : 'wickedCauldrons',
		res        : g_resSlot265.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot265,
		soundRes   : g_sndSlot265,
		manifestPath : 'wickedCauldrons.manifest',
		jsName	   : 'wickedCauldrons',
		game_id    : 265,
		orientation: 'portrait',
		scene      : function() {
			return new WickedCauldrons( this.game_id, this.name, resSlot265);
		}
	},
	{
		name       : 'legendaryVikings',
		res        : g_resSlot266.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot266,
		soundRes   : g_sndSlot266,
		manifestPath : 'legendaryVikings.manifest',
		jsName	   : 'legendaryVikings',
		game_id    : 266,
		scene      : function() {
			return new LegendaryVikings( this.game_id, this.name, resSlot266);
		}
	},
	{
		name       : 'fortuneMeow',
		res        : g_resSlot267.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot267,
		soundRes   : g_sndSlot267,
		manifestPath : 'fortuneMeow.manifest',
		jsName	   : 'fortuneMeow',
		game_id    : 267,
		scene      : function() {
			return new FortuneMeow( this.game_id, this.name, resSlot267 );
		}
	},
	{
		name       : 'pirateParade',
		res        : g_resSlot268.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot268,
		soundRes   : g_sndSlot268,
		manifestPath : 'pirateParade.manifest',
		jsName	   : 'pirateParade',
		game_id    : 268,
		scene      : function() {
			return new PirateParade( this.game_id, this.name, resSlot268 );
		}
	},
	{
		name       : 'superBunnyBank',
		res        : g_resSlot269.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot269,
		soundRes   : g_sndSlot269,
		manifestPath : 'superBunnyBank.manifest',
		jsName	   : 'superBunnyBank',
		game_id    : 269,
		orientation: 'portrait',
		scene      : function() {
			return new SuperBunnyBank( this.game_id, this.name, resSlot269);
		}
	},
	{
		name       : 'goldenKoi',
		res        : g_resSlot270.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot270,
		soundRes   : g_sndSlot270,
		manifestPath : 'goldenKoi.manifest',
		jsName	   : 'goldenKoi',
		game_id    : 270,
		orientation: 'portrait',
		scene      : function() {
			return new GoldenKoi( this.game_id, this.name, resSlot270);
		}
	},
	{
		name       : 'statuesSecrets',
		res        : g_resSlot272.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot272,
		soundRes   : g_sndSlot272,
		manifestPath : 'statuesSecrets.manifest',
		jsName	   : 'statuesSecrets',
		game_id    : 272,
		scene      : function() {
			return new StatuesSecrets( this.game_id, this.name, resSlot272 );
		}
	},
	{
		name       : 'littleWizardJackpots',
		res        : g_resSlot271.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot271,
		soundRes   : g_sndSlot271,
		manifestPath : 'littleWizardJackpots.manifest',
		jsName	   : 'littleWizardJackpots',
		game_id    : 271,
		scene      : function() {
			return new LittleWizardJackpots( this.game_id, this.name, resSlot271 );
		}
	},
   {
        name       : 'goldenEggDropDeluxe',
        res        : g_resSlot273.concat(g_resCommonSlot_normal),
        purgeTarget: resSlot273,
        soundRes   : g_sndSlot273,
        manifestPath : 'goldenEggDropDeluxe.manifest',
        jsName	   : 'goldenEggDropDeluxe',
        game_id    : 273,
        scene      : function() {
            return new GoldenEggDropDeluxe( this.game_id, this.name, resSlot273 );
        }
    },
	{
		name       : 'kingsFury',
		res        : g_resSlot275.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot275,
		soundRes   : g_sndSlot275,
		manifestPath : 'kingsFury.manifest',
		jsName	   : 'kingsFury',
		game_id    : 275,
		orientation: 'portrait',
		scene      : function() {
			return new KingsFury( this.game_id, this.name, resSlot275);
		}
	},
	{
		name       : 'lampsOfFortune',
		res        : g_resSlot274.concat(g_resCommonSlot_normal),
		purgeTarget: resSlot274,
		soundRes   : g_sndSlot274,
		manifestPath : 'lampsOfFortune.manifest',
		jsName	   : 'lampsOfFortune',
		game_id    : 274,
		orientation: 'portrait',
		scene      : function() {
			return new LampsOfFortune( this.game_id, this.name, resSlot274);
		}
	},
	/**
	 * Vegas Classic
	 */
    {
        name       : 'vegasClassic',
        category   : 'classicSlot',
        res        : g_resClassicWild.concat(g_resCommonClassicVegasSlot_normal),
    	slotRes    : g_resClassicWild,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
		subManifest : 'c_wild1SubSlot.manifest',
        game_id    : 27,
        scene      : function() {
            return new VegasSlotScene( 27 );
        },
		slot	   : function ( _owner ) {
			return new wild1SubSlot( _owner );
        },
        jsName	   : 'ClassicWild1',
    },
    {
        name       : 'classicWild2',
        category   : 'classicSlot',
        res        : g_resClassicWild02.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resClassicWild02,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wild2SubSlot.manifest',
        game_id    : 32,
        scene      : function() {
            return new VegasSlotScene ( 32 );
        },
        slot	   : function ( _owner ) {
            return new wild2SubSlot( _owner );
        },
        jsName	   : 'ClassicWild2',
    },
    {
        name       : 'classicWild3',
        category   : 'classicSlot',
        res        : g_resClassicWild03.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resClassicWild03,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wild3SubSlot.manifest',
        game_id    : 33,
        scene      : function() {
            return new VegasSlotScene ( 33 );
        },
        slot	   : function ( _owner ) {
            return new wild3SubSlot( _owner );
        },
        jsName	   : 'ClassicWild3',
    },
    {
        name       : 'classicFive',
        category   : 'classicSlot',
        res        : g_resClassicFive.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resClassicFive,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_fiveSubSlot.manifest',
        game_id    : 37,
        scene      : function() {
            return new VegasSlotScene ( 37 );
        },
        slot	   : function ( _owner ) {
            return new fiveSubSlot( _owner );
        },
        jsName	   : 'ClassicFive',
    },
    {
        name       : 'tripleDiamond',
        category   : 'classicSlot',
        res        : g_resTripleDiamond.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resTripleDiamond,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_tripleDiamond.manifest',
        game_id    : 38,
        scene      : function() {
            return new VegasSlotScene ( 38 );
        },
        slot	   : function ( _owner ) {
            return new TripleDiamondSubSlot( _owner );
        },
        jsName	   : 'tripleDiamond',
    },
    {
        name       : 'wildRespin',
        category   : 'classicSlot',
        res        : g_resWildRespin.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resWildRespin,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wildRespin.manifest',
        game_id    : 49,
        scene      : function() {
            return new VegasSlotScene ( 49 );
        },
        slot	   : function ( _owner ) {
            return new WildRespin( _owner );
        },
        jsName	   : 'wildRespin',
    },
    {
        name       : 'extraReel',
        category   : 'classicSlot',
        res        : g_resExtraReel.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resExtraReel,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_extraReel.manifest',
        game_id    : 51,
        scene      : function() {
            return new VegasSlotScene ( 51 );
        },
        slot	   : function ( _owner ) {
            return new ExtraReel( _owner );
        },
        jsName	   : 'extraReel',
    },
    {
        name       : 'purpleDiamond',
        category   : 'classicSlot',
        res        : g_resPurpleDiamond.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resPurpleDiamond,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_purpleDiamond.manifest',
        game_id    : 53,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE; // 정의가 sceneList 가 더 빨리되므로 이렇게 할 수 밖에 없음. OBG
        },
        scene      : function() {
            return new VegasSlotScene ( 53 );
        },
        slot	   : function ( _owner ) {
            return new PurpleDiamond( _owner );
        },
        jsName	   : 'purpleDiamond',
    },
    {
        name       : 'tripleSeven',
        category   : 'classicSlot',
        res        : g_resTripleSeven.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resTripleSeven,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_tripleSeven.manifest',
        game_id    : 60,
		slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 60 );
        },
        slot	   : function ( _owner ) {
            return new TripleSeven( _owner );
        },
        jsName	   : 'tripleSeven',
    },
    {
        name       : 'blackDiamond',
        category   : 'classicSlot',
        res        : g_resBlackDiamond.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBlackDiamond,
        soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_blackDiamond.manifest',
        game_id    : 63,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 63 );
        },
        slot	   : function ( _owner ) {
            return new BlackDiamond( _owner );
        },
        jsName	   : 'blackDiamond',
    },
    {
        name       : 'burningRespin',
        category   : 'classicSlot',
        res        : g_resBurningRespin.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningRespin,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespin.manifest',
        game_id    : 65,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 65 );
        },
        slot	   : function ( _owner ) {
            return new BurningRespin( _owner );
        },
        jsName	   : 'burningRespin',
    },
	{
        name       : 'burningWildQuickFire',
        category   : 'classicSlot',
        res        : g_resBurningWildQuickFire.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningWildQuickFire,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningWildQuickFire.manifest',
        game_id    : 71,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 71 );
        },
        slot	   : function ( _owner ) {
            return new BurningWildQuickFire( _owner );
        },
        jsName	   : 'burningWildQuickFire',
    },
    // BWN 추가
    {
        name       : 'burningWildNudgingFire',
        category   : 'classicSlot',
        res        : g_resBurningWildNudgingFire.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningWildNudgingFire,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningWildNudgingFire.manifest',
        game_id    : 74,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 74 );
        },
        slot	   : function ( _owner ) {
            return new BurningWildNudgingFire( _owner );
        },
        jsName	   : 'burningWildNudgingFire',
    },
    // BRC 추가
    {
        name       : 'burningRespinChili',
        category   : 'classicSlot',
        res        : g_resBurningRespinChili.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningRespinChili,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespinChili.manifest',
        game_id    : 76,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 76 );
        },
        slot	   : function ( _owner ) {
            return new BurningRespinChili( _owner );
        },
        jsName	   : 'BurningRespinChili',
    },
	// BR5 추가
    {
        name       : 'burningRespin5X',
        category   : 'classicSlot',
        res        : g_resBurningRespin5X.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningRespin5X,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespin5X.manifest',
        game_id    : 78,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 78 );
        },
        slot	   : function ( _owner ) {
            return new burningRespin5X( _owner );
        },
        jsName	   : 'burningRespin5X',
    },
    // WH 추가
    {
        name       : 'WildHit',
        category   : 'classicSlot',
        res        : g_resWildHit.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resWildHit,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wildHit.manifest',
        game_id    : 80,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 80 );
        },
        slot	   : function ( _owner ) {
            return new WildHit( _owner );
        },
        slotUI     : function ( owner ) {
            return new WildHitUI( owner );
        },
        jsName	   : 'wildHit',
    },
    // BWL 추가
    {
        name       : 'burningWildLockingFire',
        category   : 'classicSlot',
        res        : g_resBurningWildLockingFire.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resBurningWildLockingFire,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningWildLockingFire.manifest',
        game_id    : 81,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 81 );
        },
        slot	   : function ( _owner ) {
            return new BurningWildLockingFire( _owner );
        },
        jsName	   : 'burningWildLockingFire',
    },
	{
		name       : 'epicRespin',
		category   : 'classicSlot',
		res        : g_resCrazyRespin.concat(g_resCommonClassicVegasSlot_normal),
		slotRes    : g_resCrazyRespin,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_epicRespin.manifest',
		game_id    : 102,
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new CrazyRespin( _owner );
		},
        jsName	   : 'EpicRespin',
	},
	{
		name       : '77Wild',
		category   : 'classicSlot',
		res        : g_resSevenSevenWild.concat(g_resCommonClassicVegasSlot_normal),
		slotRes    : g_resSevenSevenWild,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_SevenSevenWild.manifest',
		game_id    : 89,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
		},
		scene      : function() {
			return new VegasSlotScene( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new SevenSevenWild( _owner );
		},
        jsName	   : 'SevenSevenWild',
	},
	{
		name       : 'moneyMaker',
		category   : 'classicSlot',
		res        : g_resMoneyMaker.concat(g_resCommonClassicVegasSlot_normal),
		slotRes    : g_resMoneyMaker,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_MoneyMaker.manifest',
		game_id    : 108,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.MOVE; // 정의가 sceneList 가 더 빨리되므로 이렇게 할 수 밖에 없음. OBG
		},
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new MoneyMaker( _owner );
		},
		jsName : 'MoneyMaker',
	},
    {
        name       : 'moneyMakerGrand',
        category   : 'classicSlot',
        res        : g_resMoneyMakerGrand.concat(g_resCommonClassicVegasSlot_normal),
        slotRes    : g_resMoneyMakerGrand,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_MoneyMakerGrand.manifest',
        game_id    : 141,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( this.game_id );
        },
        slot	   : function ( _owner ) {
            return new MoneyMakerGrand( _owner );
        },
        jsName	   : 'moneyMakerGrand'
    },

	{
		name        : 'freeSpinKeno',
		res         : g_resFreeSpinKeno.concat(g_resCommonKeno_normal),
		purgeTarget	: resFreeSpinKeno,
		soundRes    : g_sndKeno,
		game_id     : 132,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_diamond.manifest',
		scene: function () {
			return new KenoScene(132);
		},
		kenoUI: function () {
			var ui = new FreeSpinKenoUI();
			var dataController = new KenoDataController();
			return {
				ui: ui,
				dataController: dataController
			}
		},
        jsName	   : 'FreeSpinKeno',
	},
	{
		name       : 'moneyMakerWheel',
		category   : 'classicSlot',
		res        : g_resMoneyMakerWheel.concat(g_resCommonClassicVegasSlot_normal),
		slotRes    : g_resMoneyMakerWheel,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_MoneyMakerWheel.manifest',
		game_id    : 142,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
		},
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new MoneyMakerWheel( _owner );
		},
		jsName	   : 'MoneyMakerWheel'
	},

	{
		name         : 'cleopatraVip',
		res          : g_resCleopatra.concat(g_resCommonSlot_vip),
		purgeTarget : resCleopatra,
		soundRes     : g_soundCP,
		manifestPath : 'cleopatra.manifest',
		game_id      : 1002,
		scene        : function() {
			return new CleopatraMain( 1002 );
		},
        jsName 	   : 'cleopatra',
	},
	{
		name         : 'madSpinVip',
		res          : g_resMadSpin.concat(g_resCommonSlot_vip),
		purgeTarget : resMadSpin,
		soundRes     : g_soundMS,
		manifestPath : 'madSpin.manifest',
		game_id      : 1003,
		scene        : function() {
			// return new MadSpinClient();
			return new MadSpinLayer( 1003 );
		},
        jsName 	   : 'madSpin',
	},
	{
		name         : 'halloweenVip',
		res          : g_resHalloween.concat(g_resCommonSlot_vip),
		purgeTarget : resHalloween,
		soundRes     : g_soundHM,
		manifestPath : 'halloween.manifest',
		game_id      : 1004,
		scene        : function() {
			return new HalloweenClient( 1004 );
		},
        jsName 	   : 'halloween',
	},
	{
		name         : 'shopaholicVip',
		res          : g_resShopaholic.concat(g_resCommonSlot_vip),
		purgeTarget : resShopaholic,
		soundRes     : g_soundSH,
		manifestPath : 'shopaholic.manifest',
		game_id      : 1005,
		scene        : function() {
			return new ShopaholicClient( 1005 );
		},
        jsName 	   : 'shopaholic',
	},
	{
		name         : 'back70sVip',
		res          : g_resBack70s.concat(g_resCommonSlot_vip),
		purgeTarget : resBack70s,
		soundRes     : g_sound70s,
		manifestPath : 'back70s.manifest',
		game_id      : 1006,
		scene        : function() {
			return new Back70sClient( 1006 );
		},
        jsName 	   : 'back70s',
	},
	{
		name         : 'hanselVip',
		res          : g_resHansel.concat(g_resCommonSlot_vip),
		purgeTarget : resHansel,
		soundRes     : g_soundHG,
		manifestPath : 'hansel.manifest',
		game_id      : 1007,
		scene        : function() {
			return new HanselClient( 1007 );
		},
        jsName 	   : 'hansel',
	},
	{
		name         : 'jackpotCityVip',
		res          : g_resJackpotCity.concat(g_resCommonSlot_vip),
		purgeTarget : resJackpotCity,
		soundRes     : g_soundJackpotCity,
		manifestPath : 'jackpotCity.manifest',
		game_id      : 1008,
		scene        : function() {
			return new JackpotCity( 1008 );
		},
        jsName 	   : 'jackpotCity',
	},
	{
		name         : 'queensAgeVip',
		res          : g_resQueensAge.concat(g_resCommonSlot_vip),
		purgeTarget : resQueensAge,
		soundRes     : g_sndQueensAge,
		manifestPath : 'queensAge.manifest',
		game_id      : 1009,
		scene        : function() {
			return new QueensAgeClient( 1009 );
		},
        jsName 	   : 'queensAge',
	},
	{
		name         : 'eldoradoVip',
		res          : g_resEldorado.concat(g_resCommonSlot_vip),
		purgeTarget : resEldorado,
		soundRes     : g_sndEldorado,
		manifestPath : 'eldorado.manifest',
		game_id      : 1010,
		scene        : function() {
			return new Eldorado( 1010 );
		},
        jsName 	   : 'Eldorado',
	},
	{
		name         : 'shiningVip',
		res          : g_resShining.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resShining,
		soundRes     : g_sndShining,
		manifestPath : 'shining.manifest',
		game_id      : 1011,
		scene        : function() {
			return new Shining( 1011 );
		},
        jsName	   : 'shining',
	},
	{
		name         : 'fortuneVip',
		res          : g_resFortune.concat(g_resCommonSlot_vip),
		purgeTarget : resFortune,
		soundRes     : g_sndFortune,
		manifestPath : 'fortune.manifest',
		game_id      : 1012,
		scene        : function() {
			return new FortunePotClient( 1012 );
		},
        jsName 	   : 'fortunepot',
	},
	{
		name         : 'westernWildVip',
		res          : g_resWesternWild.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resWesternWild,
		soundRes     : g_sndWesternWild,
		manifestPath : 'westernWild.manifest',
		game_id      : 1013,
		scene        : function() {
			return new WesternWild( 1013 );
		},
        jsName	   : 'westernWild',
	},
	{
		name         : 'wheelOfJackpotVip',
		res          : g_resWheelJackpot.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resWheelJackpot,
		soundRes     : g_sndWheelOfJackpot,
		manifestPath : 'wheelOfJackpot.manifest',
		game_id      : 1014,
		scene        : function() {
			return new WheelOfJackpot( 1014 );
		},
        jsName		 : 'wheelOfJackpot',
	},
    {
        name       : 'goldSpinVip',
        res        : g_resGoldSpin.concat(g_resCommonClassicSlot_vip),
        purgeTarget : resGoldSpin,
        soundRes   : g_sndGoldSpin,
        manifestPath: 'goldSpin.manifest',
        game_id    : 1050,
        scene      : function() {
            return new GoldSpin ( 1050 );
        },
        jsName	   : 'goldSpin',
    },
	{
		name         : 'wjDoubleSevenVip',
		res          : g_resWjDoubleSeven.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resWjDoubleSeven,
		soundRes     : g_sndWj2DoubleSeven,
		manifestPath : 'wjDoubleSeven.manifest',
		game_id      : 1015,
		scene        : function() {
			return new wjDoubleSeven( 1015 );
		},
        jsName	   : 'wjDoubleSeven',
	},
	{
		name         : 'goldenSheepVip',
		res          : g_resGoldenSheep.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resGoldenSheep,
		soundRes     : g_sndGoldenSheep,
		manifestPath : 'goldenSheep.manifest',
		game_id      : 1016,
		scene        : function() {
			return new GoldenSheep( 1016 );
		},
        jsName	   : 'GoldenSheep',
	},
	{
		name         : 'easterJackpotVip',
		res          : g_resEasterJackpot.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resEasterJackpot,
		soundRes     : g_sndEasterJackpot,
		manifestPath : 'easterJackpot.manifest',
		game_id      : 1017,
		scene        : function() {
			return new EasterJackpot( 1017 );
		},
        jsName	   : 'EasterJackpot',
	},
	{
		name         : 'fishingMasterVip',
		res          : g_resFishingMaster.concat(g_resCommonClassicSlot_vip),
		purgeTarget  : resFishingMaster,
		soundRes     : g_sndFishingMaster,
		manifestPath : 'fishingMaster.manifest',
		game_id      : 1018,
		scene        : function() {
			return new FishingMaster( 1018 );
		},
        jsName 	   : 'fishingMaster',
	},
	{
		name         : 'fiery7Vip',
		res          : g_resFiery7.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resFiery7,
		soundRes     : g_sndFiery7,
		manifestPath : 'fiery7.manifest',
		game_id      : 1019,
		scene        : function() {
			return new Fiery7( 1019 );
		},
        jsName	   : 'Fiery7',
	},
	{
		name         : 'flamingStarVip',
		res          : g_resFlamingStar.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resFlamingStar,
		soundRes     : g_sndFlamingStar,
		manifestPath : 'flamingStar.manifest',
		game_id      : 1020,
		scene        : function() {
			return new FlamingStar( 1020 );
		},
        jsName	   : 'FlamingStar',
	},
	{
		name         : 'goldMineVip',
		res          : g_resGoldMine.concat(g_resCommonSlot_vip),
		purgeTarget : resGoldMine,
		soundRes     : g_sndGoldMine,
		manifestPath : 'goldMine.manifest',
		game_id      : 1021,
		scene        : function() {
			return new GoldMine( 1021 );
		},
        jsName 	   : 'GoldMine',
	},
	{
		name       : 'cabaretFeverVip',
		res        : g_resCabaretFever.concat(g_resCommonSlot_vip),
		purgeTarget : resCabaretFever,
		soundRes   : g_sndCabaretFever,
		manifestPath : 'cabaretFever.manifest',
		game_id    : 1022,
		popupInfo  :  {
			slotAlias : 'cf',
			bUseCommonMajorWin : true
			// soundPath : sndBillionairePiggy.MajorWinPopup or 'xx/yy/zz.mp3'
		},
		scene      : function() {
			return new CabaretFever( 1022 );
		},
        jsName 	   : 'cabaretFever',
	},
	{
		name       : 'jackpotXmasVip',
		res        : g_resJackpotXmas.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resJackPotXmas,
		soundRes   : g_sndJackpotXmas,
		manifestPath : 'jackpotXmas.manifest',
		game_id    : 1023,
		scene      : function() {
			return new JackpotXmas( 1023 );
		},
        jsName 	   : 'JackpotXmas',
	},
    {
        name       : 'hotCashVip',
        res        : g_resHotCash.concat(g_resCommonClassicSlot_vip),
	    purgeTarget : resHotCash,
        soundRes   : g_sndHotCash,
	    manifestPath : 'hotCash.manifest',
        game_id    : 1024,
        scene      : function() {
            return new HotCash( 1024 );
        },
        jsName	   : 'HotCash',
	},
	{
		name       : 'zeusThunderVip',
		res        : g_resZeusThunder.concat(g_resCommonSlot_vip),
		purgeTarget : resZeusThunder,
		soundRes   : g_sndZeusThunder,
		manifestPath : 'zeusThunder.manifest',
		game_id    : 1025,
		popupInfo  :  {
			slotAlias : 'zt',
			bUseCommonMajorWin : true,
			// soundPath : sndBillionairePiggy.MajorWinPopup or 'xx/yy/zz.mp3'
		},
		scene      : function() {
			return new ZeusThunder ( 1025 );
		},
        jsName 	   : 'zeusThunder',
	},
	{
		name       : 'billionairePiggyVip',
		res        : g_resBillionairePiggy.concat(g_resCommonSlot_vip),
		purgeTarget : resBillionairePiggy,
		soundRes   : g_sndBillionairePiggy,
		manifestPath : 'billionairePiggy.manifest',
		game_id    : 1026,
		scene      : function() {
			return new BillionairePiggy ( 1026 );
		},
        jsName 	   : 'billionairePiggy',
	},
	{
		name       : 'vegasLinkVip',
		res        : g_resVegasLink.concat(g_resCommonSlot_vip),
		purgeTarget : resVegasLink,
		soundRes   : g_sndVegasLink,
		manifestPath : 'vegasLink.manifest',
		game_id    : 1028,
		scene      : function() {
			return new VegasLink( 1028 );
		},
        jsName 	   : 'VegasLink',
	},
	{
		name       : 'goldenEagleVip',
		res        : g_resGoldenEagle.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resGoldenEagle,
		soundRes   : g_sndGoldenEagle,
		manifestPath : 'goldenEagle.manifest',
		game_id    : 1031,
		scene      : function() {
			return new GoldenEagle ( 1031 );
		},
        jsName 	   : 'goldenEagle',
	},
	{
		name       : 'dragonRisingVip',
		res        : g_resDragonRising.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resDragonRising,
		soundRes   : g_sndDragonRising,
		manifestPath : 'dragonRising.manifest',
		game_id    : 1029,
		scene      : function() {
			return new DragonRising ( 1029 );
		},
        jsName	   : 'dragonRising',
	},
	{
		name       : 'kingOfSavannaVip',
		res        : g_resKingOfSavanna.concat(g_resCommonSlot_vip),
		purgeTarget : resKingOfSavanna,
		soundRes   : g_sndKingOfSavanna,
		manifestPath : 'kingOfSavanna.manifest',
		game_id    : 1030,
		scene      : function() {
			return new KingOfSavanna ( 1030 );
		},
        jsName 	   : 'KingOfSavanna',
	},
	{
		name       : 'diamondWheelVip',
		res        : g_resDiamondWheel.concat(g_resCommonSlot_vip),
		purgeTarget : resDiamondWheel,
		soundRes   : g_sndDiamondWheel,
		manifestPath : 'diamondWheel.manifest',
		game_id    : 1034,
		scene      : function() {
			return new DiamondWheel ( 1034 );
		},
        jsName 	   : 'DiamondWheel',
	},
	{
		name       : 'fortuneDiamondVip',
		res        : g_resFortuneDiamond.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resFortuneDiamond,
		soundRes   : g_sndFortuneDiamond,
		manifestPath : 'fortuneDiamond.manifest',
		game_id    : 1035,
		scene      : function() {
			return new FortuneDiamond ( 1035 );
		},
		jsName	   : 'fortuneDiamond',
	},
	{
		name       : 'queenOfRichesVIP',
		res        : g_resQueenOfRiches.concat(g_resCommonSlot_vip),
		purgeTarget : resQueenOfRiches,
		soundRes   : g_sndQueenOfRiches,
		manifestPath : 'queenOfRiches.manifest',
		game_id    : 1036,
		scene      : function() {
			return new QueenOfRiches ( 1036 );
		},
        jsName 	   : 'QueenOfRiches',
	},
	{
		name       : 'alohaWheelVIP',
		res        : g_resAlohaWheel.concat(g_resCommonSlot_vip),
		purgeTarget : resAlohaWheel,
		soundRes   : g_sndAlohaWheel,
		manifestPath : 'alohaWheel.manifest',
		game_id    : 1039,
		scene      : function() {
			return new AlohaWheel ( 1039 );
		},
        jsName 	   : 'AlohaWheel',
	},
	{
		name       : 'pumpkinPotVip',
		res        : g_resPumpkinPot.concat(g_resCommonSlot_vip),
		purgeTarget : resPumpkinPot,
		soundRes   : g_sndPumpkinPot,
		manifestPath : 'pumpkinPot.manifest',
		game_id    : 1040,
		scene      : function() {
			return new PumpkinPot ( 1040 );
		},
        jsName 	   : 'PumpkinPot',
	},
	{
		name       : 'goldBarVIP',
		res        : g_resGoldBar.concat(g_resCommonClassicSlot_vip),
		purgeTarget : resGoldBar,
		soundRes   : g_sndGoldBar,
		manifestPath : 'goldBar.manifest',
		game_id    : 1041,
		scene      : function() {
			return new GoldBar ( 1041 );
		},
        jsName	   : 'GoldBar',
	},
    {
        name       : 'bigMoneyVip',
        res        : g_resBigMoney.concat(g_resCommonClassicSlot_vip),
        purgeTarget : resBigMoney,
        soundRes   : g_sndBigMoney,
        manifestPath : 'bigMoney.manifest',
        game_id    : 1042,
        scene      : function() {
            return new BigMoney ( 1042 );
        },
        jsName	   : 'BigMoney',
    },
    {
        name        : 'oceanLinkVip',
        res         : g_resOceanLink.concat(g_resCommonClassicSlot_vip),
        purgeTarget : resOceanLink,
        soundRes    : g_sndOceanLink,
        manifestPath: 'oceanLink.manifest',
        game_id     : 1043,
        scene       : function () {
            return new OceanLink( 1043 );
        },
        jsName	   : 'OceanLink',
    },
    {
        name        : 'wildWildBuffaloVip',
        res         : g_resWildBuffalo.concat(g_resCommonSlot_vip),
        purgeTarget : resWildBuffalo,
        soundRes    : g_sndWildBuffalo,
        manifestPath: 'wildBuffalo.manifest',
        game_id     : 1044,
        scene       : function () {
            return new WildBuffalo( 1044 );
        },
        jsName 	   : 'WildWildBuffalo',
    },
    {
        name       : 'FuWaFuBaoVip',
        res        : g_resFuWaFuBao.concat(g_resCommonSlot_vip),
        purgeTarget : resFuWaFuBao,
        soundRes   : g_sndFuWaFuBao,
        manifestPath: 'fuwaFubao.manifest',
        game_id    : 1045,
        scene      : function() {
            return new FuWaFuBao ( 1045 );
        },
        jsName 	   : 'FuWaFuBao',
    },
	{
		name       : 'goldenCloversVip',
		res        : g_resGoldenClovers.concat(g_resCommonSlot_vip),
        purgeTarget : resGoldenClovers,
		soundRes   : g_sndGoldenClovers,
		manifestPath: 'goldenClovers.manifest',
		game_id    : 1047,
		scene      : function() {
			return new GoldenClovers ( 1047 );
		},
        jsName 	   : 'GoldenClovers',
	},
    {
        name       : 'fairyMischiefVip',
        res        : g_resFairyMischief.concat(g_resCommonSlot_vip),
        purgeTarget : resFairyMischief,
        soundRes   : g_sndFairyMischief,
        manifestPath: 'fairyMischief.manifest',
        game_id    : 1048,
        scene      : function() {
            return new FairyMischief ( 1048 );
        },
        jsName 	   : 'FairyMischief',
    },
    {
        name       : 'shiningDiamondLinkVip',
        res        : g_resShiningLink.concat(g_resCommonClassicSlot_vip),
        purgeTarget : resShiningLink,
        soundRes   : g_sndShiningLink,
        manifestPath: 'shiningLink.manifest',
        game_id    : 1046,
        scene      : function() {
            return new ShiningLink ( 1046 );
        },
        jsName	   : 'ShiningLink',
    },
	{
		name       : 'vegasQueensVip',
		res        : g_resVegasQueens.concat(g_resCommonSlot_vip),
		purgeTarget : resVegasQueens,
		soundRes   : g_sndVegasQueens,
		manifestPath: 'vegasQueens.manifest',
		game_id    : 1052,
		scene      : function() {
			return new VegasQueens ( 1052 );
		},
        jsName 	   : 'VegasQueens',
	},
    {
        name       : 'fishingMaster2Vip',
        res        : g_resFishingMaster2.concat(g_resCommonSlot_vip),
        purgeTarget : resFishingMaster2,
        soundRes   : g_sndFishingMaster2,
        manifestPath: 'fishingMaster2.manifest',
        game_id    : 1054,
        scene      : function() {
            return new FishingMaster2 ( 1054 );
        },
        jsName 	   : 'fishingMaster2',
    },
    {
        name       : 'LuckyLampVip',
        res        : g_resLuckyLamp.concat(g_resCommonSlot_vip),
        purgeTarget : resLuckyLamp,
        soundRes   : g_sndLuckyLamp,
        manifestPath: 'luckyLamp.manifest',
        game_id    : 1055,
        scene      : function() {
            return new LuckyLamp ( 1055 );
        },
        jsName 	   : 'luckyLamp',
    },
    {
        name       : 'GreatEmpireVip',
        res        : g_resGreatEmpire.concat(g_resCommonSlot_vip),
        purgeTarget : resGreatEmpire,
        soundRes   : g_sndGreatEmpire,
        manifestPath: 'greatEmpire.manifest',
        game_id    : 1056,
        scene      : function() {
            return new GreatEmpire ( 1056 );
        },
        jsName 	   : 'GreatEmpire',
    },
    {
        name       : 'CaptainSharkVIP',
        res        : g_resCaptainShark.concat(g_resCommonClassicSlot_vip),
        purgeTarget : resCaptainShark,
        soundRes   : g_sndCaptainShark,
        manifestPath: 'captainShark.manifest',
        game_id    : 1057,
        scene      : function() {
            return new CaptainShark ( 1057 );
        },
        jsName 	   : 'captainShark',
    },
    {
        name       : 'fortuneTreeVip',
        res        : g_resFortuneTree.concat(g_resCommonSlot_vip),
        purgeTarget : resFortuneTree,
        soundRes   : g_sndFortuneTree,
        manifestPath: 'fortuneTree.manifest',
        game_id    : 1058,
        scene      : function() {
            return new FortuneTree ( 1058 );
        },
        jsName 	   : 'fortuneTree',
    },
    {
        name       : 'JackpotRushVip',
        res        : g_resJackpotRush.concat(g_resCommonSlot_vip),
        purgeTarget: resJackpotRush,
        soundRes   : g_sndJackpotRush,
        manifestPath: 'jackpotRush.manifest',
        game_id    : 1059,
        scene      : function() {
            return new JackpotRush ( 1059 );
        },
        jsName 	   : 'JackpotRush',
    },
    {
        name       : 'mrBillionaireVip',
        res        : g_resMrBillionaire.concat(g_resCommonSlot_vip),
        purgeTarget: resMrBillionaire,
        soundRes   : g_sndMrBillionaire,
        manifestPath: 'mrBillionaire.manifest',
        game_id    : 1061,
        scene      : function() {
            return new MrBillionaire ( 1061 );
        },
        jsName 	   : 'MrBillionaire',
    },
    {
        name       : 'TripleWolfVip',
        res        : g_resTripleWolf.concat(g_resCommonSlot_vip),
        purgeTarget: resTripleWolf,
        soundRes   : g_sndTripleWolf,
        manifestPath: 'tripleWolf.manifest',
        game_id    : 1062,
        scene      : function() {
            return new TripleWolf ( 1062 );
        },
        jsName 	   : 'TripleWolf',
    },
    {
        name       : 'vampiresRosesVip',
        res        : g_resVampiresRoses.concat(g_resCommonSlot_vip),
        purgeTarget: resVampiresRoses,
        soundRes   : g_sndVampiresRoses,
        manifestPath: 'vampiresRoses.manifest',
        game_id    : 1064,
        scene      : function() {
            return new VampiresRose ( 1064 );
        },
        jsName 	   : 'vampiresRose',
    },
    {
        name       : 'TreasureIslandVip',
        res        : g_resTreasureIsland.concat(g_resCommonSlot_vip),
        purgeTarget: resTreasureIsland,
        soundRes   : g_sndTreasureIsland,
        manifestPath: 'treasureIsland.manifest',
        game_id    : 1066,
        scene      : function() {
            return new TreasureIsland ( 1066 );
        },
        jsName 	   : 'TreasureIsland',
    },
    {
        name       : 'santasGiftsVip',
        res        : g_resSantasGifts.concat(g_resCommonSlot_vip),
        soundRes   : g_sndSantasGifts,
        manifestPath: 'santasGifts.manifest',
        game_id    : 1067,
        scene      : function() {
            return new SantasGifts ( 1067 );
        },
        jsName 	   : 'SantasGifts',
    },
	{
		name       : 'AllStarVip',
		res        : g_resAllStar.concat(g_resCommonSlot_vip),
		purgeTarget: resAllStar,
		soundRes   : g_sndAllStar,
		manifestPath: 'AllStar.manifest',
		game_id    : 1068,
		scene      : function() {
			return new AllStar ( 1068 );
		},
        jsName 	   : 'AllStar',
	},
	{
		name       : 'fortuneDiamondJackpotReelVip',
		res        : g_resFortuneDiamondJackpotReel.concat(g_resCommonClassicSlot_vip),
		purgeTarget: resFortuneDiamondJackpotReel,
		soundRes   : g_sndFortuneDiamondJackpotReel,
		manifestPath: 'fortuneDiamondJackpotReel.manifest',
		game_id    : 1069,
		scene      : function() {
			return new FortuneDiamondJackpotReel ( 1069 );
		},
        jsName	   : 'FortuneDiamondJackpotReel',
	},
	{
		name       : 'fortunePandaVip',
		res        : g_resFortunePanda.concat(g_resCommonSlot_vip),
		purgeTarget: resFortunePanda,
		soundRes   : g_sndFortunePanda,
		manifestPath: 'fortunePanda.manifest',
		game_id    : 1070,
		scene      : function() {
			return new FortunePanda ( 1070 );
		},
        jsName 	   : 'FortunePanda',
	},
	{
		name       : 'pharaohWildsVip',
		res        : g_resPharaohWild.concat(g_resCommonSlot_vip),
		purgeTarget: resPharaohWild,
		soundRes   : g_sndPharaohWild,
		manifestPath: 'pharaohWild.manifest',
		game_id    : 1072,
		scene      : function() {
			return new PharaohWild ( 1072 );
		},
        jsName 	   : 'PharaohWild',
	},
	{
		name       : 'sharkParadeVip',
		res        : g_resSharkParade.concat(g_resCommonClassicSlot_vip),
		purgeTarget: resSharkParade,
		soundRes   : g_sndSharkParade,
		manifestPath: 'sharkParade.manifest',
		game_id    : 1073,
		scene      : function() {
			return new SharkParade ( 1073 );
		},
        jsName	   : 'SharkParade',
	},

	{
		name       : 'BisonGoldVip',
		res        : g_resBisonGold.concat(g_resCommonSlot_vip),
		purgeTarget: resBisonGold,
		soundRes   : g_sndBisonGold,
		manifestPath: 'bisonGold.manifest',
		game_id    : 1075,
		scene      : function() {
			return new BisonGold ( 1075 );
		},
        jsName 	   : 'BisonGold',
	},

    {
        name       : 'indianaCoinsVip',
        res        : g_resIndianaCoins.concat(g_resCommonSlot_vip),
        purgeTarget: resIndianaCoins,
        soundRes   : g_sndIndianaCoins,
        manifestPath: 'indianaCoins.manifest',
        game_id    : 1077,
        scene      : function() {
            return new IndianaCoins ( 1077 );
        },
        jsName 	   : 'IndianaCoins',
    },

	{
		name       : 'TreasureOfOzVip',
		res        : g_resTreasureOfOz.concat(g_resCommonSlot_vip),
		purgeTarget: resTreasureOfOz,
		soundRes   : g_sndTreasureOfOz,
		manifestPath: 'treasureOfOz.manifest',
		game_id    : 1079,
		scene      : function() {
			return new TreasureOfOz ( 1079 );
		},
        jsName 	   : 'TreasureOfOz',
	},
	{
		name       : 'diamondCatsVip',
		res        : g_resDiamondCats.concat(g_resCommonSlot_vip),
		purgeTarget: resDiamondCats,
		soundRes   : g_sndDiamondCats,
		manifestPath: 'diamondCats.manifest',
		game_id    : 1082,
		scene      : function() {
			return new DiamondCats ( 1082 );
		},
        jsName 	   : 'DiamondCats',
	},
	{
		name       : 'vegasDiamondVip',
		res        : g_resVegasDiamond.concat(g_resCommonSlot_vip),
		purgeTarget: resVegasDiamond,
		soundRes   : g_sndVegasDiamond,
		manifestPath: 'vegasDiamond.manifest',
		game_id    : 1083,
		scene      : function() {
			return new VegasDiamond( 1083 );
		},
        jsName 	   : 'VegasDiamond',
	},
	{
		name       : 'wildWildZeusVip',
		res        : g_resWildWildZeus.concat(g_resCommonSlot_vip),
		purgeTarget: resWildWildZeus,
		soundRes   : g_sndWildWildZeus,
		manifestPath: 'wildWildZeus.manifest',
		game_id    : 1084,
		scene      : function() {
			return new WildWildZeus ( 1084 );
		},
        jsName 	   : 'WildWildZeus',
	},
    {
        name       : 'lunarFortuneVip',
        res        : g_resLunarFortune.concat(g_resCommonSlot_vip),
        purgeTarget: resLunarFortune,
        soundRes   : g_sndLunarFortune,
        manifestPath: 'lunarFortune.manifest',
        game_id    : 1085,
        scene      : function() {
            return new LunarFortune ( 1085 );
        },
        jsName 	   : 'LunarFortune',
    },
	{
		name       : 'burningSunVip',
		res        : g_resBurningSun.concat(g_resCommonClassicSlot_vip),
		purgeTarget: resBurningSun,
		soundRes   : g_sndBurningSun,
		manifestPath: 'burningSun.manifest',
		game_id    : 1086,
		scene      : function() {
			return new BurningSun ( 1086 );
		},
        jsName	   : 'BurningSun',
	},
    {
        name       : 'goldMoonLinkVip',
        res        : g_resGoldMoonLink.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldMoonLink,
        soundRes   : g_sndGoldMoonLink,
        manifestPath: 'goldMoonLink.manifest',
        game_id    : 1087,
        scene      : function() {
            return new goldMoonLink.MainLayer( 1087  );
        },
        jsName 	   : 'goldMoonLink',
    },
	{
		name       : 'jackpotQueensVip',
		res        : g_resJackpotQueens.concat(g_resCommonClassicSlot_vip),
		purgeTarget: resJackpotQueens,
		soundRes   : g_sndJackpotQueens,
		manifestPath: 'JackpotQueens.manifest',
		game_id    : 1088,
		scene      : function() {
			return new JackpotQueens ( 1088 );
		},
        jsName 	   : 'JackpotQueens',
	},
	{
		name       : 'monsterParadeVip',
		res        : g_resMonsterParade.concat(g_resCommonSlot_vip),
		purgeTarget: resMonsterParade,
		soundRes   : g_sndMonsterParade,
        manifestPath: 'monsterParade.manifest',
		game_id    : 1094,
		scene      : function() {
			return new MonsterParade( this.game_id, this.name );
		},
		jsName 		: 'MonsterParade',
	},

    {
        name       : 'JackpotMagicVIP',
        res        : g_resJackpotMagic.concat(g_resCommonSlot_vip),
        purgeTarget: resJackpotMagic,
        soundRes   : g_sndJackpotMagic,
        manifestPath: 'JackpotMagic.manifest',
        game_id    : 1091,
        scene      : function() {
            return new JackpotMagic ( 1091 );
        },
        jsName 	   : 'JackpotMagic',
    },

    {
        name       : 'mammothStampedeVip',
        res        : g_resMammothStampede.concat(g_resCommonSlot_vip),
        purgeTarget: resMammothStampede,
        soundRes   : g_sndMammothStampede,
        manifestPath : 'mammothStampede.manifest',
        game_id    : 1090,
        scene      : function() {
            return new Mammoth ( 1090 );
        },
        jsName 	   : 'MammothStampede',
    },
    {
        name       : 'candyConnectLinkVip',
        res        : g_resCandyConnectLink.concat(g_resCommonSlot_vip),
        purgeTarget: resCandyConnectLink,
        soundRes   : g_sndCandyConnectLink,
        manifestPath : 'candyConnectLink.manifest',
        game_id    : 1093,
        scene      : function() {
            return new CandyConnectLink ( 1093 );
        },
        jsName 	   : 'CandyConnectLink',
    },
	{
		name       : 'mermaidMagicVip',
		res        : g_resMermaidMagic.concat(g_resCommonSlot_vip),
		purgeTarget: resMermaidMagic,
		soundRes   : g_sndMermaidMagic,
		game_id    : 1095,
		manifestPath : 'MermaidMagic.manifest',
		scene      : function() {
			return new MermaidMagic( this.game_id, this.name );
		},
        jsName 	   : 'MermaidMagic',
	},
	{
		name       : 'dragonsDiamondVip',
		res        : g_resDragonsDiamond.concat(g_resCommonSlot_vip),
		purgeTarget: resDragonsDiamond,
		soundRes   : g_sndDragonsDiamond,
		game_id    : 1096,
		manifestPath : 'dragonsDiamond.manifest',
		scene      : function() {
			return new DragonsDiamond ( this.game_id, this.name );
		},
        jsName 	   : 'DragonsDiamond',
	},
	{
		name       : 'midasGoldVip',
		res        : g_resHandOfGold.concat(g_resCommonSlot_vip),
		purgeTarget: resHandOfGold,
		soundRes   : g_sndHandOfGold,
		game_id    : 1097,
		manifestPath : 'handOfGold.manifest',
		scene      : function() {
			return new HandOfGold( this.game_id, this.name );
		},
        jsName 	   : 'HandOfGold',
	},
    {
        name       : 'piggyKingVip',
        res        : g_resPiggyKing.concat(g_resCommonClassicSlot_vip),
        purgeTarget: resPiggyKing,
        soundRes   : g_sndPiggyKing,
        game_id    : 1099,
        manifestPath: 'piggyKing.manifest',
        scene      : function() {
            return new PiggyKing ( this.game_id, this.name );
        },
        jsName 	   : 'PiggyKing',
    },
    {
        name       : 'fortuneBlastVip',
        res        : g_resFortuneBlast.concat(g_resCommonSlot_vip),
        purgeTarget: resFortuneBlast,
        soundRes   : g_sndFortuneBlast,
        game_id    : 1098,
        manifestPath: 'fortuneBlast.manifest',
        scene      : function() {
            return new FortuneBlast ( 1098 );
        },
        jsName 	   : 'FortuneBlast',
    },
	{
		name       : 'bankOfJackpotVip',
		res        : g_resBankOfJackpot.concat(g_resCommonSlot_vip),
		purgeTarget: resBankOfJackpot,
		soundRes   : g_sndBankOfJackpot,
		game_id    : 1100,
		manifestPath: 'bankOfJackpot.manifest',
		scene      : function() {
			return new BankOfJackpot ( this.game_id, this.name );
		},
        jsName 	   : 'BankOfJackpot',
	},

    {
        name       : 'fortunePotLinkVip',
        res        : g_resFortunePotLink.concat(g_resCommonSlot_vip),
        purgeTarget: resFortunePotLink,
        soundRes   : g_sndFortunePotLink,
        game_id    : 1104,
        manifestPath: 'fortunePotLink.manifest',
        scene      : function() {
            return new FortunePotLink ( 1104 );
        },
        jsName	   : 'FortunePotLink',
    },
    {
        name       : 'rollingInMoneyVip',
        res        : g_resRollingInMoney.concat(g_resCommonSlot_vip),
        purgeTarget: resRollingInMoney,
        soundRes   : g_sndRollingInMoney,
        game_id    : 1101,
        manifestPath: 'rollingInMoney.manifest',
        scene      : function() {
            return new RollingInMoney ( 1101 );
        }
        ,
        jsName 	   : 'RollingInMoney',
    },
	{
		name       : 'megaCashVip',
		res        : g_resMegaCash.concat(g_resCommonSlot_vip),
		purgeTarget: resMegaCash,
		soundRes   : g_sndMegaCash,
		game_id    : 1105,
		manifestPath: 'megaCash.manifest',
		scene      : function() {
			return new MegaCash ( this.game_id, this.name );
		},
        jsName 	   : 'MegaCash',
	},
	{
		name       : 'moreMoreGoldVip',
		res        : g_resMoreMoreGold.concat(g_resCommonSlot_vip),
		purgeTarget: resMoreMoreGold,
		soundRes   : g_sndMoreMoreGold,
		game_id    : 1103,
		manifestPath : 'moreMoreGold.manifest',
		scene      : function() {
			return new MoreMoreGold( this.game_id, this.name );
		},
        jsName 	   : 'MoreMoreGold',
	},
    {
        name       : 'goldRushLinkVip',
        res        : g_resGoldRushLink.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldRushLink,
        soundRes   : g_sndGoldRushLink,
        game_id    : 1106,
        manifestPath : 'goldRushLink.manifest',
        scene      : function() {
            return new GoldRushLink( 1106 );
        },
        jsName 	   : 'GoldRushLink',
    },
    {
        name       : 'madLabVip',
        res        : g_resMadLab.concat(g_resCommonSlot_vip),
        purgeTarget: resMadLab,
        soundRes   : g_sndMadLab,
        game_id    : 1109,
        manifestPath : 'madLab.manifest',
        scene      : function() {
            return new MadLab ( 1109 );
        },
        jsName 	   : 'MadLab',
    },
    {
        name       : 'moonFestivalLinkVip',
        res        : g_resMoonFestivalLink.concat(g_resCommonSlot_vip),
        purgeTarget: resMoonFestivalLink,
        soundRes   : g_sndMoonFestivalLink,
        game_id    : 1112,
        manifestPath : 'moonFestivalLink.manifest',
        scene      : function() {
            return new MoonFestivalLink( this.game_id, this.name );
        },
        jsName 	   : 'MoonFestivalLink',
    },
	{
		name       : 'magicInWonderlandVip',
		res        : g_resMagicInWonderland.concat(g_resCommonSlot_vip),
		purgeTarget: resMagicInWonderland,
		soundRes   : g_sndMagicInWonderland,
		game_id    : 1110,
		manifestPath : 'magicInWonderland.manifest',
		scene      : function() {
			return new MagicInWonderland( this.game_id, this.name );
		},
        jsName 	   : 'MagicInWonderland',
	},
	{
		name       : 'rncLegendsVip',
		res        : g_resRNCLegends.concat(g_resCommonSlot_vip),
		purgeTarget: resRNCLegends,
		soundRes   : g_sndRNCLegends,
		game_id    : 1111,
		manifestPath : 'RNCLegends.manifest',
		scene      : function() {
			return new RNCLegends ( this.game_id, this.name );
		},
        jsName 	   : 'RNCLegends',
	},
    {
        name       : 'sunMoonLinkVip',
        res        : g_resSunAndMoonLink.concat(g_resCommonSlot_vip),
        purgeTarget: resSunAndMoonLink,
        soundRes   : g_sndSunAndMoonLink,
        game_id    : 1113,
        manifestPath : 'sunAndMoonLink.manifest',
        scene      : function() {
            return new SunAndMoonLink( 1113 );
        },
        jsName 	   : 'SunAndMoonLink',
    },
    {
        name       : 'sugarFactoryVip',
        res        : g_resSugarFactory.concat(g_resCommonSlot_vip),
        purgeTarget: resSugarFactory,
        soundRes   : g_sndSugarFactory,
        manifestPath : 'sugarFactory.manifest',
        game_id    : 1114,
        scene      : function() {
            return new SugarFactory( this.game_id, this.name );
        },
        jsName	   : 'SugarFactory',
    },
    {
        name       : 'goldenLanternLinkVip',
        res        : g_resGoldenLanternLink.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldenLanternLink,
        soundRes   : g_sndGoldenLanternLink,
		manifestPath : 'goldenLanternLink.manifest',
        game_id    : 1115,
        scene      : function() {
            return new GoldenLanternLink( this.game_id, this.name );
        },
        jsName 	   : 'GoldenLanternLink',
    },
    {
        name       : 'luckyCoinVip',
        res        : g_resLuckyCoin.concat(g_resCommonSlot_vip),
        purgeTarget: resLuckyCoin,
        soundRes   : g_sndLuckyCoin,
        manifestPath : 'luckyCoin.manifest',
        game_id    : 1116,
        scene      : function() {
            return new LuckyCoin( this.game_id, this.name );
        },
		jsName 	   : 'LuckyCoin',

    },
    {
        name       : 'goldenBeerVip',
        res        : g_resGoldenBier.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldenBier,
        soundRes   : g_sndGoldenBier,
        manifestPath : 'goldenBier.manifest',
        game_id    : 1118,
        scene      : function() {
            return new GoldenBier( this.game_id, this.name );
        },
        jsName 	   : 'GoldenBier',
    },
    {
        name       : 'honeyBeengoVip',
        res        : g_resHoneyBeengo.concat(g_resCommonSlot_vip),
        purgeTarget: resHoneyBeengo,
        soundRes   : g_sndHoneyBeengo,
        manifestPath : 'honeyBeengo.manifest',
        game_id    : 1117,
        scene      : function() {
            return new HoneyBeengo( this.game_id, this.name );
        },
        jsName 	   : 'HoneyBeengo',
    },
	{
		name            : 'spookyPumpkinVip',
		res             : g_resSpookyPumpkin.concat(g_resCommonSlot_vip),
		purgeTarget     : resSpookyPumpkin,
		soundRes        : g_sndSpookyPumpkin,
        manifestPath 	: 'spookyPumpkin.manifest',
		game_id         : 1119,
		scene           : function() {
			return new SpookyPumpkin( this.game_id, this.name );
		},
        jsName		 : 'SpookyPumpkin',
	},

    {
        name       		: 'penguinFrenzyVip',
        res        		: g_resPenguinFrenzy.concat(g_resCommonClassicSlot_vip),
        purgeTarget		: resPenguinFrenzy,
        soundRes   		: g_sndPenguinFrenzy,
        manifestPath 	: 'penguinFrenzy.manifest',
        game_id    		: 1122,
        scene      		: function() {
            return new PenguinFrenzy( this.game_id, this.name );
        },
        jsName		 : 'PenguinFrenzy',
    },

    {
        name       		: 'wheelOfJackpotCSVip',
        res        		: g_resWheelOfJackpotCS.concat(g_resCommonClassicSlot_vip),
        purgeTarget		: resWheelOfJackpotCS,
        soundRes   		: g_sndWheelOfJackpotCS,
        manifestPath 	: 'wheelOfJackpotCS.manifest',
        game_id    		: 1121,
        scene      		: function() {
            return new WheelOfJackpotCS( this.game_id, this.name );
        },
        jsName 	   : 'WheelOfJackpotCS',
    },
    {
        name       : 'devilsVaultVip',
        res        : g_resDevilsVault.concat(g_resCommonSlot_vip),
        purgeTarget: resDevilsVault,
        soundRes   : g_sndDevilsVault,
        manifestPath 	: 'devilsVault.manifest',
        game_id    : 1123,
        scene      : function() {
            return new DevilsVault( this.game_id, this.name );
        },
        jsName 	   : 'DevilsVault',
    },
	{
		name       : 'royalDiamondsVip',
		res        : g_resRoyalDiamonds.concat(g_resCommonSlot_vip),
		purgeTarget: resRoyalDiamonds,
		soundRes   : g_sndRoyalDiamonds,
		manifestPath 	: 'royalDiamonds.manifest',
		game_id    : 1125,
		scene      : function() {
			return new RoyalDiamonds( this.game_id, this.name );
		},
        jsName 	   : 'RoyalDiamonds',
	},
    {
		name       : 'littlePiggyTrioVip',
		res        : g_resLittlePiggyTrio.concat(g_resCommonSlot_vip),
		purgeTarget: resLittlePiggyTrio,
		soundRes   : g_sndLittlePiggyTrio,
		manifestPath : 'littlePiggyTrio.manifest',
		game_id    : 1127,
		scene      : function() {
			return new LittlePiggyTrio( this.game_id, this.name );
		},
        jsName 	   : 'LittlePiggyTrio',
	},

	{
		name       : 'legacyOfTheGodsVip',
		res        : g_resLegacyOfTheGods.concat(g_resCommonSlot_vip),
		purgeTarget: resLegacyOfTheGods,
		soundRes   : g_sndLegacyOfTheGods,
		manifestPath : 'legacyOfTheGods.manifest',
		game_id    : 1126,
		scene      : function() {
			return new LegacyOfTheGods( this.game_id, this.name );
		},
        jsName 	   : 'LegacyOfTheGods',
	},

	{
		name       : 'fuFuDiamondVip',
		res        : g_resFuFuDiamond.concat(g_resCommonSlot_vip),
		purgeTarget: resFuFuDiamond,
		soundRes   : g_sndFuFuDiamond,
		manifestPath : 'fuFuDiamond.manifest',
		game_id    : 1128,
		scene      : function() {
			return new FuFuDiamond( this.game_id, this.name );
		},
        jsName	   : 'FuFuDiamond',
	},
	{
		name       	: 'infernoVsStormRoomVip',
		res        	: g_resInfernoVsStormRoom,
		purgeTarget	: resInfernoVsStormRoom,
		soundRes   	: g_sndInfernoVsStormRoom,
		manifestPath : 'infernoVSStormRoom.manifest',
		game_id    	: 1130,
		isRoom		: true,
		socialSlotID: 1,
		isVipLounge : true,
		scene      	: function() {
			return new InfernoVsStormRoom( this.game_id, this.name );
		},
        jsName 	   : 'infernoVsStormRoom',
	},
	{
		name       : 'infernoVSStormVip',
		res        : g_resInfernoVsStorm.concat(g_resCommonClassicSlot_vip),
		purgeTarget: resInfernoVsStorm,
		soundRes   : g_sndInfernoVsStorm,
		manifestPath : 'infernoVSStorm.manifest',
		game_id    : 1130,
		socialSlotID: 1,
		scene      : function() {
			return new InfernoVsStorm( this.game_id, this.name );
		},
        jsName 	   : 'infernoVSStorm',
	},


    {
        name       : 'chiliFiestaVip',
        res        : g_resChiliFiesta.concat(g_resCommonSlot_vip),
        purgeTarget: resChiliFiesta,
        soundRes   : g_sndChiliFiesta,
        manifestPath : 'chiliFiesta.manifest',
        game_id    : 1129,
        scene      : function() {
            return new ChiliFiesta( this.game_id, this.name );
        },
        jsName	   : 'ChiliFiesta',
    },
    {
        name       : 'purrfectBingoVip',
        res        : g_resPurrfectBingo.concat(g_resCommonSlot_vip),
        soundRes   : g_sndPurrfectBingo,
        manifestPath : 'purrfectBingo.manifest',
        game_id    : 1131,
        scene      : function() {
            return new PurrfectBingo( this.game_id, this.name );
        },
        jsName	   : 'PurrfectBingo',
    },
	{
		name       : 'faCaiPotLinkVip',
		res        : g_resFaCaiPotLink.concat(g_resCommonSlot_vip),
		soundRes   : g_sndFaCaiPotLink,
		manifestPath : 'faCaiPotLink.manifest',
		game_id    : 1134,
		scene      : function() {
			return new FaCaiPot( this.game_id, this.name );
		},
        jsName	   : 'FaCaiPotLink',
	},
	{
		name       : 'threeWishesVip',
		res        : g_resGeniesWishes.concat(g_resCommonSlot_vip),
		purgeTarget: resGeniesWishes,
		soundRes   : g_sndGeniesWishes,
		manifestPath : 'threeWishes.manifest',
		game_id    : 1133,
		scene      : function() {
			return new GeniesWishes( this.game_id, this.name );
		},
        jsName	   : 'GenieWishes',
	},

    {
        name       : 'shootTheRichesVip',
        res        : g_resShootTheRiches.concat(g_resCommonSlot_vip),
        purgeTarget: resShootTheRiches,
        soundRes   : g_sndShootTheRiches,
        manifestPath : 'shootTheRiches.manifest',
        game_id    : 1135,
        scene      : function() {
            return new ShootTheRiches( this.game_id, this.name );
        },
        jsName 	   : 'ShootTheRiches',
    },
    {
        name       : 'merlinsMagicBoxVip',
        res        : g_resMerlinsMagicBox.concat(g_resCommonSlot_vip),
        purgeTarget: resMerlinsMagicBox,
        soundRes   : g_sndMerlinsMagicBox,
        manifestPath : 'merlinsMagicBox.manifest',
        game_id    : 1136,
        scene      : function() {
            return new MerlinsMagicBox( this.game_id, this.name );
        },
        jsName 	   : 'MerlinsMagicBox',
    },

	{
		name       : 'junglesTreasureVIP',
		res        : g_resJunglesTreasure.concat(g_resCommonSlot_vip),
		purgeTarget: resJunglesTreasure,
		soundRes   : g_sndJunglesTreasure,
		manifestPath : 'junglesTreasure.manifest',
		game_id    : 1137,
		scene      : function() {
			return new JunglesTreasure( this.game_id, this.name );
		},
        jsName 	   : 'JunglesTreasure',
	},
    {
        name       : 'jackpotHammerLinkVip',
        res        : g_resJackpotHammerLink.concat(g_resCommonSlot_vip),
        purgeTarget: resJackpotHammerLink,
        soundRes   : g_sndJackpotHammerLink,
        manifestPath : 'jackpotHammerLink.manifest',
        game_id    : 1138,
        scene      : function() {
            return new JackpotHammerLink( this.game_id, this.name );
        },
        jsName 	   : 'jackpotHammerLink'
    },
	{
		name       : 'monkeysMightVip',
		res        : g_resMonkeysMight.concat(g_resCommonSlot_vip),
		purgeTarget: resMonkeysMight,
		soundRes   : g_sndMonkeysMight,
		manifestPath : 'monkeysMight.manifest',
		game_id    : 1139,
		scene      : function() {
			return new MonkeysMight( this.game_id, this.name );
		},
        jsName 	   : 'MonkeysMight'
	},

	{
		name       : 'mayanDoubleJackpotVip',
		res        : g_resMayanDoubleJackpot.concat(g_resCommonSlot_vip),
		purgeTarget: resMayanDoubleJackpot,
		soundRes   : g_sndMayanDoubleJackpot,
		manifestPath : 'mayanDoubleJackpot.manifest',
		game_id    : 1143,
		scene      : function() {
			return new MayanDoubleJackpot( this.game_id, this.name );
		},
        jsName     : "MayanDoubleJackpot"
	},

	{
		name       : 'goldenEggDropVip',
		res        : g_resGoldenEggDrop.concat(g_resCommonSlot_vip),
		purgeTarget: resGoldenEggDrop,
		soundRes   : g_sndGoldenEggDrop,
		manifestPath : 'goldenEggDrop.manifest',
		game_id    : 1144,
		scene      : function() {
			return new GoldenEggDrop( this.game_id, this.name );
		},
        jsName     : "GoldenEggDrop"
	},

    {
        name       : 'draculasDenVip',
        res        : g_resDraculasDen.concat(g_resCommonSlot_vip),
        purgeTarget: resDraculasDen,
        soundRes   : g_sndDraculasDen,
        manifestPath : 'draculasDen.manifest',
        game_id    : 1151,
        scene      : function() {
            return new DraculasDen( this.game_id, this.name );
        },
        jsName     : "DraculasDen"
    },

    {
        name       : 'witchsDenVip',
        res        : g_resWitchsDen.concat(g_resCommonSlot_vip),
        purgeTarget: resWitchsDen,
        soundRes   : g_sndWitchsDen,
        manifestPath : 'witchsDen.manifest',
        game_id    : 1152,
        scene      : function() {
            return new WitchsDen( this.game_id, this.name );
        },
        jsName     : "WitchsDen"
    },
	{
		name       : 'aegisOfTheGoddessVip',
		res        : g_resAegisOfTheGoddess.concat(g_resCommonSlot_vip),
		purgeTarget: resAegisOfTheGoddess,
		soundRes   : g_sndAegisOfTheGoddess,
		manifestPath : 'aegisOfTheGoddess.manifest',
		game_id    : 1146,
		jsName     : "AegisOfTheGoddess",
		scene      : function() {
			return new AegisOfTheGoddess( this.game_id, this.name );
		}
	},
	{
		name       : 'dragonHeartVip',
		res        : g_resDragonHeart.concat(g_resCommonSlot_vip),
		purgeTarget: resDragonHeart,
		soundRes   : g_sndDragonHeart,
		manifestPath : 'dragonHeart.manifest',
		game_id    : 1149,
		jsName 	   : 'DragonHeart',
		scene      : function() {
			return new DragonHeart( this.game_id, this.name );
		}
	},
    {
        name       : 'sandsOfFortuneVip', //'sandsOfFortune',
        res        : g_resSandsOfFortune.concat(g_resCommonSlot_vip),
        purgeTarget: resSandsOfFortune,
        soundRes   : g_sndSandsOfFortune,
        manifestPath : 'sandsOfFortune.manifest',
        game_id    : 1150,
        jsName 	   : 'SandsOfFortune',
        scene      : function() {
            return new SandsOfFortune( this.game_id, this.name );
        }
    },
	{
		name       : 'monsterParadeBoostVip',
		res        : g_resMonsterParadeBoost.concat(g_resCommonSlot_vip),
		purgeTarget: resMonsterParadeBoost,
		soundRes   : g_sndMonsterParadeBoost,
		manifestPath : 'monsterParadeBoost.manifest',
		game_id    : 1148,
		jsName 	   : 'MonsterParadeBoost',
		scene      : function() {
			return new MonsterParadeBoost( this.game_id, this.name );
		}
	},
	{
		name       : 'bingoMineVip',
		res        : g_resBingoMine.concat(g_resCommonSlot_vip),
		purgeTarget: resBingoMine,
		soundRes   : g_sndBingoMine,
		manifestPath : 'bingoMine.manifest',
		game_id    : 1145,
		jsName 	   : 'BingoMine',
		scene      : function() {
			return new BingoMine( this.game_id, this.name );
		}
	},
    {
        name       : 'theDogFatherVip',
        res        : g_resTheDogFather.concat(g_resCommonSlot_vip),
        purgeTarget: resTheDogFather,
        soundRes   : g_sndTheDogFather,
        manifestPath : 'theDogFather.manifest',
		jsName 	   : 'TheDogFather',
        game_id    : 1153,
        scene      : function() {
            return new TheDogFather( this.game_id, this.name );
        }
    },
	{
		name       : 'theMagicalLupinVip',
		res        : g_resTheMagicalLupin.concat(g_resCommonSlot_vip),
		purgeTarget: resTheMagicalLupin,
		soundRes   : g_sndTheMagicalLupin,
		manifestPath : 'theMagicalLupin.manifest',
		jsName	   : 'TheMagicalLupin',
		game_id    : 1154,
		scene      : function() {
			return new TheMagicalLupin( this.game_id, this.name );
		}
	},

    {
        name       : 'goldenHoneyPotVip',
        res        : g_resGoldenHoneyPot.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldenHoneyPot,
        soundRes   : g_sndGoldenHoneyPot,
        manifestPath : 'goldenHoneyPot.manifest',
        jsName	   : 'GoldenHoneyPot',
        game_id    : 1155,
        scene      : function() {
            return new GoldenHoneyPot( this.game_id, this.name );
        }
    },
	{
		name       : 'goCatchFishVip',
		res        : g_resGoCatchFish.concat(g_resCommonSlot_vip),
		purgeTarget: resGoCatchFish,
		soundRes   : g_sndGoCatchFish,
		manifestPath : 'goCatchFish.manifest',
		jsName	   : 'GoCatchFish',
		game_id    : 1156,
		scene      : function() {
			return new GoCatchFish( this.game_id, this.name );
		}
	},
	{
		name       : 'goldenEggDropHammerTimeVip',
		res        : g_resGoldenEggDropHammerTime.concat(g_resCommonSlot_vip),
		purgeTarget: resGoldenEggDropHammerTime,
		soundRes   : g_sndGoldenEggDropHammerTime,
		manifestPath : 'goldenEggDropHammerTime.manifest',
		jsName	   : 'GoldenEggDropHammerTime',
		game_id    : 1159,
		scene      : function() {
			return new GoldenEggDropHammerTime( this.game_id, this.name );
		}
	},
	{
		name       : 'tripleMeTreasuresVip',
		res        : g_resTripleMeTreasures.concat(g_resCommonSlot_vip),
		purgeTarget: resTripleMeTreasures,
		soundRes   : g_sndTripleMeTreasures,
		manifestPath : 'tripleMeTreasures.manifest',
		jsName	   : 'TripleMeTreasures',
		game_id    : 1157,
		scene      : function() {
			return new TripleMeTreasures( this.game_id, this.name );
		}
	},
    {
        name       : 'huaMeiBaoShiVip',
        res        : g_resHuaMeiBaoShi.concat(g_resCommonSlot_vip),
        purgeTarget: resHuaMeiBaoShi,
        soundRes   : g_sndHuaMeiBaoShi,
        manifestPath : 'huameibaoshi.manifest',
        jsName	   : 'HuaMeiBaoShi',
        game_id    : 1158,
        scene      : function() {
            return new HuaMeiBaoShi( this.game_id, this.name );
        }
    },
	{
		name       : 'bananzaCoinsVip',
		res        : g_resBananzaCoins.concat(g_resCommonSlot_vip),
		purgeTarget: resBananzaCoins,
		soundRes   : g_sndBananzaCoins,
		manifestPath : 'bananzaCoins.manifest',
		jsName	   : 'bananzaCoins',
		game_id    : 1160,
		scene      : function() {
			return new BananzaCoins( this.game_id, this.name );
		}
	},
	{
		name       : 'zeusLinkAndHadesLinkVip',
		res        : g_resZeusLinkAndHadesLink.concat(g_resCommonSlot_vip),
		purgeTarget: resZeusLinkAndHadesLink,
		soundRes   : g_sndZeusLinkAndHadesLink,
		manifestPath : 'zeusLinkAndHadesLink.manifest',
		jsName	   : 'zeusLinkAndHadesLink',
		game_id    : 1161,
		scene      : function() {
			return new ZeusLinkAndHadesLink( this.game_id, this.name );
		}
	},
    {
        name       : 'honeyBeengoSplashVip',
        res        : g_resHoneyBeengoSplash.concat(g_resCommonSlot_vip),
        purgeTarget: resHoneyBeengoSplash,
        soundRes   : g_sndHoneyBeengoSplash,
        manifestPath : 'honeyBeengoSplash.manifest',
        jsName	   : 'honeyBeengoSplash',
        game_id    : 1171,
        scene      : function() {
            return new HoneyBeengoSplash( this.game_id, this.name );
        }
    },
	{
		name       : 'goldenPiggyVip',
		res        : g_resGoldenPiggy.concat(g_resCommonSlot_vip),
		purgeTarget: resGoldenPiggy,
		soundRes   : g_sndGoldenPiggy,
		manifestPath : 'goldenPiggy.manifest',
		jsName	   : 'goldenPiggy',
		game_id    : 1162,
		scene      : function() {
			return new GoldenPiggy( this.game_id, this.name );
		}
	},

	{
		name       : 'elToroParadeVip',
		res        : g_resElToroParade.concat(g_resCommonSlot_vip),
		purgeTarget: resElToroParade,
		soundRes   : g_sndelToroParade,
		manifestPath : 'elToroParade.manifest',
		jsName	   : 'elToroParade',
		game_id    : 1163,
		scene      : function() {
			return new elToroParade( this.game_id, this.name );
		}
	},
	{
		name       : 'theTaleOfCinderellaVip',
		res        : g_resTheTaleOfCinderella.concat(g_resCommonSlot_vip),
		purgeTarget: resTheTaleOfCinderella,
		soundRes   : g_sndTheTaleOfCinderella,
		manifestPath : 'TheTaleOfCinderella.manifest',
		jsName	   : 'TheTaleOfCinderella',
		game_id    : 1164,
		scene      : function() {
			return new TheTaleOfCinderella( this.game_id, this.name );
		}
	},
	{
		name       : 'frogPrinceMagicVip',
		res        : g_resFrogPrinceMagic.concat(g_resCommonSlot_vip),
		purgeTarget: resFrogPrinceMagic,
		soundRes   : g_sndFrogPrinceMagic,
		manifestPath : 'frogPrinceMagic.manifest',
		jsName	   : 'frogPrinceMagic',
		game_id    : 1165,
		scene      : function() {
			return new FrogPrinceMagic( this.game_id, this.name );
		}
	},
    {
        name       : 'sherlockMysteryCardVip',
        res        : g_resSlot166.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot166,
        soundRes   : g_sndSlot166,
		manifestPath : 'sherlockMysteryCard.manifest',
		jsName	   : 'sherlockMysteryCard',
        game_id    : 1166,
        scene      : function() {
            return new SherlockMysteryCard( this.game_id, this.name );
        }
    },
	{
		name       : 'pantherGoldVip',
		res        : g_resPantherGold.concat(g_resCommonSlot_vip),
		purgeTarget: resPantherGold,
		soundRes   : g_sndPantherGold,
		manifestPath : 'pantherGold.manifest',
		jsName	   : 'pantherGold',
		game_id    : 1167,
		scene      : function() {
			return new PantherGold( this.game_id, this.name );
		}
	},
	{
		name       : 'excaliburSwordOfMagicVip',
		res        : g_resExcaliburSwordOfMagic.concat(g_resCommonSlot_vip),
		purgeTarget: resExcaliburSwordOfMagic,
		soundRes   : g_sndExcaliburSwordOfMagic,
		manifestPath : 'excaliburSwordOfMagic.manifest',
		jsName	   : 'excaliburSwordOfMagic',
		game_id    : 1168,
		scene      : function() {
			return new ExcaliburSwordOfMagic( this.game_id, this.name );
		}
	},
	{
		name       : 'mrLuckysBakeryVip',
		res        : g_resMrLuckysBakery.concat(g_resCommonSlot_vip),
		purgeTarget: resMrLuckysBakery,
		soundRes   : g_sndMrLuckysBakery,
		manifestPath : 'mrLuckysBakery.manifest',
		jsName	   : 'mrLuckysBakery',
		game_id    : 1169,
		scene      : function() {
			return new MrLuckysBakery( this.game_id, this.name );
		}
	},
	{
		name       : 'goblinsTreasuresVip',
		res        : g_resGoblinsTreasures.concat(g_resCommonSlot_vip),
		purgeTarget: resGoblinsTreasures,
		soundRes   : g_sndGoblinsTreasures,
		manifestPath : 'goblinsTreasures.manifest',
		jsName	   : 'goblinsTreasures',
		game_id    : 1170,
		scene      : function() {
			return new GoblinsTreasures( this.game_id, this.name );
		}
	},
    {
        name       : 'wildWestGoldCardVip',
        res        : g_resSlot172.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot172,
        soundRes   : g_sndSlot172,
        manifestPath : 'wildWestGoldCard.manifest',
        jsName	   : 'wildWestGoldCard',
        game_id    : 1172,
        scene      : function() {
            return new WildWestGoldCard( this.game_id, this.name, resSlot172 );
        }
    },
    {
        name       : 'rollingInMoneyBlastVip',
        res        : g_resSlot175.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot175,
        soundRes   : g_sndSlot175,
        manifestPath : 'rollingInMoneyBlast.manifest',
        jsName	   : 'rollingInMoneyBlast',
        game_id    : 1175,
        scene      : function() {
            return new RollingInMoneyBlast( this.game_id, this.name );
        }
    },
	{
		name       : 'tripleFortuneVip',
		res        : g_resTripleFortune.concat(g_resCommonSlot_vip),
		purgeTarget: resTripleFortune,
		soundRes   : g_sndTripleFortune,
		manifestPath : 'tripleFortune.manifest',
		jsName	   : 'tripleFortune',
		game_id    : 1173,
		scene      : function() {
			return new TripleFortune( this.game_id, this.name );
		}
	},
	{
		name       : 'legendOfTheJungleVip',
		res        : g_resLegendOfTheJungle.concat(g_resCommonSlot_vip),
		purgeTarget: resLegendOfTheJungle,
		soundRes   : g_sndLegendOfTheJungle,
		manifestPath : 'legendOfTheJungle.manifest',
		jsName	   : 'legendOfTheJungle',
		game_id    : 1174,
		scene      : function() {
			return new LegendOfTheJungle( this.game_id, this.name );
		}
	},
	{
		name       : 'spookyMansionVip',
		res        : g_resSpookyMansion.concat(g_resCommonSlot_vip),
		purgeTarget: resSpookyMansion,
		soundRes   : g_sndSpookyMansion,
		manifestPath : 'spookyMansion.manifest',
		jsName	   : 'spookyMansion',
		game_id    : 1176,
		scene      : function() {
			return new SpookyMansion( this.game_id, this.name );
		}
	},
    {
        name       : 'moreMoreAcornsVip',
        res        : g_resSlot177.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot177,
        soundRes   : g_sndSlot177,
        manifestPath : 'moremoreacorns.manifest',
        jsName	   : 'moremoreacorns',
        game_id    : 1177,
        scene      : function() {
            return new MoreMoreAcorns( this.game_id, this.name, resSlot177 );
        }
    },
	{
		name       : 'fervorCircusVip',
		res        : g_resFervorCircus.concat(g_resCommonSlot_vip),
		purgeTarget: resFervorCircus,
		soundRes   : g_sndFervorCircus,
		manifestPath : 'fervorCircus.manifest',
		jsName	   : 'fervorCircus',
		game_id    : 1178,
		scene      : function() {
			return new FervorCircus( this.game_id, this.name );
		}
	},
	{
		name       : 'peterPanBeginsVip',
		res        : g_resPeterPanBegins.concat(g_resCommonSlot_vip),
		purgeTarget: resPeterPanBegins,
		soundRes   : g_sndPeterPanBegins,
		manifestPath : 'peterPanBegins.manifest',
		jsName	   : 'peterPanBegins',
		game_id    : 1179,
		scene      : function() {
			return new PeterPanBegins( this.game_id, this.name );
		}
	},
	{
		name       : 'mythicApplesVip',
		res        : g_resSlot182.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot182,
		soundRes   : g_sndSlot182,
		manifestPath : 'MythicApples.manifest',
		jsName	   : 'mythicApples',
		game_id    : 1182,
		scene      : function() {
			return new MythicApples( this.game_id, this.name, resSlot182 );
		}
	},
	{
		name       : 'calaveraParadeVip',
		res        : g_resCalaveraParade.concat(g_resCommonSlot_vip),
		purgeTarget: resCalaveraParade,
		soundRes   : g_sndCalaveraParade,
		manifestPath : 'calaveraParade.manifest',
		jsName	   : 'calaveraParade',
		game_id    : 1181,
		scene      : function() {
			return new CalaveraParade( this.game_id, this.name );
		}
	},
	{
		name		: 'captainHookReturnsVip',
		res			: g_resCaptainHookReturns.concat(g_resCommonSlot_vip),
		purgeTarget	: resCaptainHookReturns,
		soundRes	: g_sndCaptainHookReturns,
		manifestPath : 'captainHookReturns.manifest',
		jsName		: 'captainHookReturns',
		game_id		: 1180,
		scene: function () {
			return new CaptainHookReturns(this.game_id, this.name);
		}
	},
	{
		name       : 'whiteFortuneVip',
		res        : g_resSlot183.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot183,
		soundRes   : g_sndSlot183,
		manifestPath : 'whiteFortune.manifest',
		jsName	   : 'whiteFortune',
		game_id    : 1183,
		scene      : function() {
			return new WhiteFortune( this.game_id, this.name, resSlot183 );
		}
	},
    {
        name       : 'diggyCrushVip',
        res        : g_resSlot185.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot185,
        soundRes   : g_sndSlot185,
        manifestPath : 'SlotResource_185.manifest',
        jsName	   : 'diggyCrush',
        game_id    : 1185,
        scene      : function() {
            return new DiggyCrush( this.game_id, this.name, resSlot185 );
        }
    },
	{
		name       : 'wickedFortuneVip',
		res        : g_resSlot184.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot184,
		soundRes   : g_sndSlot184,
		manifestPath : 'wickedFortune.manifest',
		jsName	   : 'wickedFortune',
		game_id    : 1184,
		scene      : function() {
			return new WickedFortune( this.game_id, this.name, resSlot184 );
		}
	},
	{
		name       : 'wickedBoosFamilyVip',
		res        : g_resSlot187.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot187,
		soundRes   : g_sndSlot187,
		manifestPath : 'wickedBoosFamily.manifest',
		jsName	   : 'wickedBoosFamily',
		game_id    : 1187,
		scene      : function() {
			return new WickedBoosFamily( this.game_id, this.name, resSlot187);
		}
	},
	{
		name       : 'flippinRichVip',
		res        : g_resSlot_flippinRich.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot_flippinRich,
		soundRes   : g_sndSlot_flippinRich,
		manifestPath : 'SlotResource_186.manifest',
		jsName	   : 'flippinRich',
		game_id    : 1186,
		scene      : function() {
			return new flippinRich( this.game_id, this.name, resSlot_flippinRich );
		}
	},
	{
		name       : 'luckyIgniteVip',
		res        : g_resSlot190.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot190,
		soundRes   : g_sndSlot190,
		manifestPath : 'luckyIgnite.manifest',
		jsName	   : 'luckyIgnite',
		game_id    : 1190,
		scene      : function() {
			return new LuckyIgnite( this.game_id, this.name, resSlot190 );
		}
	},
	{
		name       : 'plushCarnivalVip',
		res        : g_resSlot192.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot192,
		soundRes   : g_sndSlot192,
		manifestPath : 'plushCarnival.manifest',
		jsName	   : 'plushCarnival',
		game_id    : 1192,
		scene      : function() {
			return new PlushCarnival( this.game_id, this.name, resSlot192 );
		}
	},
    {
        name       : 'alchemyTrioVip',
        res        : g_resSlot193.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot193,
        soundRes   : g_sndSlot193,
        manifestPath : 'alchemyTrio.manifest',
        jsName	   : 'alchemyTrio',
        game_id    : 1193,
        scene      : function() {
            return new AlchemyTrio( this.game_id, this.name, resSlot193 );
        }
    },
	{
		name       : 'shamknockOnWoodVip',
		res        : g_resSlot194.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot194,
		soundRes   : g_sndSlot194,
		manifestPath : 'resSlot194.manifest',
		jsName	   : 'ShamknockOnWood',
		game_id    : 1194,
		scene      : function() {
			return new ShamknockOnWood( this.game_id, this.name, resSlot194 );
		}
	},
	{
		name       : 'blastingBullsVip',
		res        : g_resSlot195.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot195,
		soundRes   : g_sndSlot195,
		manifestPath : 'blastingBulls.manifest',
		jsName	   : 'blastingBulls',
		game_id    : 1195,
		scene      : function() {
			return new BlastingBulls( this.game_id, this.name, resSlot195 );
		}
	},
	{
		name       : 'eggcellentAtelierVip',
		res        : g_resSlot196.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot196,
		soundRes   : g_sndSlot196,
		manifestPath : 'eggcellentAtelier.manifest',
		jsName	   : 'eggcellentAtelier',
		game_id    : 1196,
		scene      : function() {
			return new EggcellentAtelier( this.game_id, this.name, resSlot196 );
		}
	},
	{
		name       : 'strikingGoldVip',
		res        : g_resSlot197.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot197,
		soundRes   : g_sndSlot197,
		manifestPath : 'strikingGold.manifest',
		jsName	   : 'strikingGold',
		game_id    : 1197,
		scene      : function() {
			return new StrikingGold( this.game_id, this.name, resSlot197 );
		}
	},
	{
		name       : 'colossalZodiacVip',
		res        : g_resSlot198.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot198,
		soundRes   : g_sndSlot198,
		manifestPath : 'colossalZodiac.manifest',
		jsName	   : 'colossalZodiac',
		game_id    : 1198,
		scene      : function() {
			return new ColossalZodiac( this.game_id, this.name, resSlot198 );
		}
	},
	{
		name       : 'eternalLoveVip',
		res        : g_resSlot199.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot199,
		soundRes   : g_sndSlot199,
		manifestPath : 'Slot199.manifest',
		jsName	   : 'Slot199',
		game_id    : 1199,
		scene      : function() {
			return new Slot199( this.game_id, this.name, resSlot199 );
		}
	},
	{
		name       : 'goldenRaffleVip',
		res        : g_resSlot202.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot202,
		soundRes   : g_sndSlot202,
		manifestPath : 'goldenRaffle.manifest',
		jsName	   : 'goldenRaffle',
		game_id    : 1202,
		scene      : function() {
			return new GoldenRaffle( this.game_id, this.name, resSlot202 );
		}

	},

	{
		name       : 'blazingPhoenixVip',
		res        : g_resSlot200.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot200,
		soundRes   : g_sndSlot200,
		manifestPath : 'blazingPhoenix.manifest',
		jsName	   : 'blazingPhoenix',
		game_id    : 1200,
		scene      : function() {
			return new BlazingPhoenix( this.game_id, this.name, resSlot200 );
		}
	},
	{
		name       : 'beanstalkBonanzaVip',
		res        : g_resSlot201.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot201,
		soundRes   : g_sndSlot201,
		manifestPath : 'beanstalkBonanza.manifest',
		jsName	   : 'beanstalkBonanza',
		game_id    : 1201,
		scene      : function() {
			return new BeanstalkBonanza( this.game_id, this.name, resSlot201 );
		}
	},
	{
		name       : 'masterChefVip',
		res        : g_resSlot204.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot204,
		soundRes   : g_sndSlot204,
		manifestPath : 'masterChef.manifest',
		jsName	   : 'masterChef',
		game_id    : 1204,
		scene      : function() {
			return new masterChef( this.game_id, this.name, resSlot204 );
		}
	},
	{
		name       : 'crazyRichPandasVip',
		res        : g_resSlot203.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot203,
		soundRes   : g_sndSlot203,
		manifestPath : 'crazyRichPandas.manifest',
		jsName	   : 'crazyRichPandas',
		game_id    : 1203,
		scene      : function() {
			return new CrazyRichPandas( this.game_id, this.name, resSlot203 );
		}
	},
	{
		name       : 'buzzBonanzaVip',
		res        : g_resSlot205.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot205,
		soundRes   : g_sndSlot205,
		manifestPath : 'buzzBonanza.manifest',
		jsName	   : 'buzzBonanza',
		game_id    : 1205,
		scene      : function() {
			return new BuzzBonanza( this.game_id, this.name, resSlot205 );
		}
	},
	{
		name       : 'potatoKingdomVip',
		res        : g_resSlot206.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot206,
		soundRes   : g_sndSlot206,
		manifestPath : 'potatoKingdom.manifest',
		jsName	   : 'potatoKingdom',
		game_id    : 1206,
		scene      : function() {
			return new PotatoKingdom( this.game_id, this.name, resSlot206 );
		}
	},
	{
		name       : 'allThatJazzVip',
		res        : g_resSlot208.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot208,
		soundRes   : g_sndSlot208,
		manifestPath : 'allThatJazz.manifest',
		jsName	   : 'allThatJazz',
		game_id    : 1208,
		scene      : function() {
			return new AllThatJazz( this.game_id, this.name, resSlot208 );
		}
	},
	{
		name       : 'luckyNekoParadeVip',
		res        : g_resSlot207.concat( g_resCommonSlot_vip ),
		purgeTarget: resSlot207,
		soundRes   : g_sndSlot207,
		manifestPath : 'luckyNekoParade.manifest',
		jsName	   : 'luckyNekoParade',
		game_id    : 1207,
		scene      : function() {
			return new luckyNekoParade( this.game_id, this.name, resSlot207 );
		}
	},
	{
		name       : 'helloweenPartyVip',
		res        : g_resSlot209.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot209,
		soundRes   : g_sndSlot209,
		manifestPath : 'helloweenParty.manifest',
		jsName	   : 'helloweenParty',
		game_id    : 1209,
		scene      : function() {
			return new HelloweenParty( this.game_id, this.name, resSlot209 );
		}
	},
	{
		name       : 'cookieCrumbAdventureVip',
		res        : g_resSlot210.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot210,
		soundRes   : g_sndSlot210,
		manifestPath : 'cookieCrumbAdventure.manifest',
		jsName	   : 'cookieCrumbAdventure',
		game_id    : 1210,
		scene      : function() {
			return new CookieCrumbAdventure( this.game_id, this.name, resSlot210 );
		}
	},
	{
		name       : 'drsSecretLabVip',
		res        : g_resSlot212.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot212,
		soundRes   : g_sndSlot212,
		manifestPath : 'drsSecretLab.manifest',
		jsName	   : 'drsSecretLab',
		game_id    : 1212,
		scene      : function() {
			return new drsSecretLab( this.game_id, this.name, resSlot212 );
		}
	},
	{
		name       : 'gummyYummyFiestaVip',
		res        : g_resSlot211.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot211,
		soundRes   : g_sndSlot211,
		manifestPath : 'gummyYummyFiesta.manifest',
		jsName	   : 'gummyYummyFiesta',
		game_id    : 1211,
		scene      : function() {
			return new GummyYummyFiesta( this.game_id, this.name, resSlot211 );
		}
	},
	{
		name       : 'sizzlingBasketsVip',
		res        : g_resSlot213.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot213,
		soundRes   : g_sndSlot213,
		manifestPath : 'sizzlingBaskets.manifest',
		jsName	   : 'sizzlingBaskets',
		game_id    : 1213,
		scene      : function() {
			return new SizzlingBaskets( this.game_id, this.name, resSlot213 );
		}
	},
	{
		name       : 'sweetSmashVip',
		res        : g_resSlot214.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot214,
		soundRes   : g_sndSlot214,
		manifestPath : 'sweetSmash.manifest',
		jsName	   : 'sweetSmash',
		game_id    : 1214,
		scene      : function() {
			return new SweetSmash( this.game_id, this.name, resSlot214 );
		}
	},
	{
		name       : 'bookOfCleosSecretsVip',
		res        : g_resSlot215.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot215,
		soundRes   : g_sndSlot215,
		manifestPath : 'bookOfCleosSecrets.manifest',
		jsName	   : 'bookOfCleosSecrets',
		game_id    : 1215,
		scene      : function() {
			return new BookOfCleosSecrets( this.game_id, this.name, resSlot215 );
		}
	},
	{
		name       : 'xFlightVip',
		res        : g_resSlot990.concat(g_resCommonCrash_vip),
		purgeTarget: resSlot990,
		soundRes   : g_sndSlot990,
		manifestPath : 'xFlight.manifest',
		jsName	   : 'xFlight',
		game_id    : 1990,
		scene      : function() {
			return new XFlight( this.game_id, this.name, resSlot990 );
		}
	},
	{
		name       : 'richesToRichesVip',
		res        : g_resSlot217.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot217,
		soundRes   : g_sndSlot217,
		manifestPath : 'richesToRiches.manifest',
		jsName	   : 'richesToRiches',
		game_id    : 1217,
		scene      : function() {
			return new RichesToRiches( this.game_id, this.name, resSlot217 );
		}
	},
	{
		name       : 'stellarScattersVip',
		res        : g_resSlot216.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot216,
		soundRes   : g_sndSlot216,
		manifestPath : 'stellarScatters.manifest',
		jsName	   : 'stellarScatters',
		game_id    : 1216,
		scene      : function() {
			return new StellarScatters( this.game_id, this.name, resSlot216 );
		}
	},
	{
		name       : 'goldiesKingdomVip',
		res        : g_resSlot218.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot218,
		soundRes   : g_sndSlot218,
		manifestPath : 'goldiesKingdom.manifest',
		jsName	   : 'goldiesKingdom',
		game_id    : 1218,
		scene      : function() {
			return new GoldiesKingdom( this.game_id, this.name, resSlot218 );
		}
	},
	{
		name       : 'grandHarvestVip',
		res        : g_resSlot219.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot219,
		soundRes   : g_sndSlot219,
		manifestPath : 'Grandharvest.manifest',
		jsName	   : 'grandHarvest',
		game_id    : 1219,
		scene      : function() {
			return new GrandHarvest( this.game_id, this.name, resSlot219 );
		}
	},
	{
		name       : 'sharksBountyVip',
		res        : g_resSlot220.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot220,
		soundRes   : g_sndSlot220,
		manifestPath : 'sharksBounty.manifest',
		jsName	   : 'sharksBounty',
		game_id    : 1220,
		scene      : function() {
			return new SharksBounty( this.game_id, this.name, resSlot220 );
		}
	},
	{
		name       : 'moreBarrelsMoreFruitsVip',
		res        : g_resSlot221.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot221,
		soundRes   : g_sndSlot221,
		manifestPath : 'moreBarrelsMoreFruits.manifest',
		jsName	   : 'moreBarrelsMoreFruits',
		game_id    : 1221,
		scene      : function() {
			return new MoreBarrelsMoreFruits( this.game_id, this.name, resSlot221 );
		}
	},
	{
		name       : 'flavorfulFiveVip',
		res        : g_resSlot222.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot222,
		soundRes   : g_sndSlot222,
		manifestPath : 'flavorFulFive.manifest',
		jsName	   : 'flavorfulFive',
		game_id    : 1222,
		scene      : function() {
			return new FlavorfulFive( this.game_id, this.name, resSlot222 );
		}
	},
	{
		name       : 'hornsAndHalosVip',
		res        : g_resSlot223.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot223,
		soundRes   : g_sndSlot223,
		manifestPath : 'hornsAndHalos.manifest',
		jsName	   : 'hornsAndHalos',
		game_id    : 1223,
		scene      : function() {
			return new HornsAndHalos( this.game_id, this.name, resSlot223 );
		}
	},
	{
		name       : 'doomedToRichesVip',
		res        : g_resSlot224.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot224,
		soundRes   : g_sndSlot224,
		manifestPath : 'doomedToRiches.manifest',
		jsName	   : 'doomedToRiches',
		game_id    : 1224,
		scene      : function() {
			return new DoomedToRiches( this.game_id, this.name, resSlot224 );
		}
	},
	{
		name       : 'monsterPrisonVip',
		res        : g_resSlot226.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot226,
		soundRes   : g_sndSlot226,
		manifestPath : 'monsterPrison.manifest',
		jsName	   : 'monsterPrison',
		game_id    : 1226,
		scene      : function() {
			return new MonsterPrison( this.game_id, this.name, resSlot226 );
		}
	},

	{
		name       : 'lockinPiggyVip',
		res        : g_resSlot225.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot225,
		soundRes   : g_sndSlot225,
		manifestPath : 'lockinPiggy.manifest',
		jsName	   : 'lockinPiggy',
		game_id    : 1225,
		scene      : function() {
			return new lockinPiggy( this.game_id, this.name, resSlot225 );
		}
	},

	{
		name       : 'partyCrashersVip',
		res        : g_resSlot227.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot227,
		soundRes   : g_sndSlot227,
		manifestPath : 'partyCrashers.manifest',
		jsName	   : 'partyCrashers',
		game_id    : 1227,
		scene      : function() {
			return new PartyCrashers( this.game_id, this.name, resSlot227 );
		}
	},
	{
		name       : 'wizardsPotionShopVip',
		res        : g_resSlot228.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot228,
		soundRes   : g_sndSlot228,
		manifestPath : 'wizardsPotionShop.manifest',
		jsName	   : 'wizardsPotionShop',
		game_id    : 1228,
		scene      : function() {
			return new WizardsPotionShop( this.game_id, this.name, resSlot228 );
		}
	},
	{
		name       : 'jurassicTrioVip',
		res        : g_resSlot229.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot229,
		soundRes   : g_sndSlot229,
		manifestPath : 'jurassicTrio.manifest',
		jsName	   : 'jurassicTrio',
		game_id    : 1229,
		scene      : function() {
			return new JurassicTrio( this.game_id, this.name, resSlot229 );
		}
	},
	{
		name       : 'hustlinHoundsVip',
		res        : g_resSlot232.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot232,
		soundRes   : g_sndSlot232,
		manifestPath : 'hustlinHounds.manifest',
		jsName	   : 'hustlinHounds',
		game_id    : 1232,
		scene      : function() {
			return new hustlinHounds( this.game_id, this.name, resSlot232 );
		}
	},
	{
		name       : 'moneyExpressVip',
		res        : g_resSlot233.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot233,
		soundRes   : g_sndSlot233,
		manifestPath : 'moneyExpress.manifest',
		jsName	   : 'moneyExpress',
		game_id    : 1233,
		scene      : function() {
			return new MoneyExpress( this.game_id, this.name, resSlot233 );
		}
	},
	{
		name       : 'sweetyHammyVip',
		res        : g_resSlot234.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot234,
		soundRes   : g_sndSlot234,
		manifestPath : 'sweetyHammy.manifest',
		jsName	   : 'sweetyHammy',
		game_id    : 1234,
		scene      : function() {
			return new SweetyHammy( this.game_id, this.name, resSlot234 );
		}
	},
	{
		name       : 'discoNightPartyVip',
		res        : g_resSlot235.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot235,
		soundRes   : g_sndSlot235,
		manifestPath : 'discoNightParty.manifest',
		jsName	   : 'discoNightParty',
		game_id    : 1235,
		scene      : function() {
			return new DiscoNightParty( this.game_id, this.name, resSlot235 );
		}
	},
	{
		name       : 'theFairyGroveVip',
		res        : g_resSlot236.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot236,
		soundRes   : g_sndSlot236,
		manifestPath : 'theFairyGrove.manifest',
		jsName	   : 'theFairyGrove',
		game_id    : 1236,
		scene      : function() {
			return new theFairyGrove( this.game_id, this.name, resSlot236 );
		}
	},
	{
		name       : 'rabbitsTrailVip',
		res        : g_resSlot237.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot237,
		soundRes   : g_sndSlot237,
		manifestPath : 'rabbitsTrail.manifest',
		jsName	   : 'rabbitsTrail',
		game_id    : 1237,
		scene      : function() {
			return new RabbitsTrail( this.game_id, this.name, resSlot237 );
		}
	},
	{
		name       : 'chickyChickyParadeVip',
		res        : g_resSlot238.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot238,
		soundRes   : g_sndSlot238,
		manifestPath : 'chickyChickyParade.manifest',
		jsName	   : 'chickyChickyParade',
		game_id    : 1238,
		scene      : function() {
			return new ChickyChickyParade( this.game_id, this.name, resSlot238 );
		}
	},
	{
		name       : 'catchAndWinBonanzaVip',
		res        : g_resSlot239.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot239,
		soundRes   : g_sndSlot239,
		manifestPath : 'catchAndWinBonanza.manifest',
		jsName	   : 'catchAndWinBonanza',
		game_id    : 1239,
		scene      : function() {
			return new CatchAndWinBonanza( this.game_id, this.name, resSlot239);
		}
	},
    {
		name       : 'mysticalBlossomsVip',
		res        : g_resSlot241.concat( g_resCommonSlot_vip ),
		purgeTarget: resSlot241,
		soundRes   : g_sndSlot241,
		manifestPath : 'mysticalBlossoms.manifest',
		jsName	   : 'mysticalBlossoms',
		game_id    : 1241,
		scene      : function() {
			return new mysticalBlossoms( this.game_id, this.name, resSlot241 );
		}
	},
	{
		name       : 'magicalCoinVip',
		res        : g_resSlot240.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot240,
		soundRes   : g_sndSlot240,
		manifestPath : 'magicalCoin.manifest',
		jsName	   : 'magicalCoin',
		game_id    : 1240,
		scene      : function() {
			return new MagicalCoin( this.game_id, this.name, resSlot240 );
		}
	},
	{
		name       : 'rodeoRushVip',
		res        : g_resSlot242.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot242,
		soundRes   : g_sndSlot242,
		manifestPath : 'rodeoRush.manifest',
		jsName	   : 'rodeoRush',
		game_id    : 1242,
		scene      : function() {
			return new RodeoRush( this.game_id, this.name, resSlot242 );
		}
	},
	{
		name       : 'biggyPiggyTrioVip',
		res        : g_resSlot243.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot243,
		soundRes   : g_sndSlot243,
		manifestPath : 'biggyPiggyTrio.manifest',
		jsName	   : 'biggyPiggyTrio',
		game_id    : 1243,
		orientation: 'portrait',
		scene      : function() {
			return new BiggyPiggyTrio( this.game_id, this.name, resSlot243);
		}
	},
	{
		name       : 'theGreatFoxbyVip',
		res        : g_resSlot244.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot244,
		soundRes   : g_sndSlot244,
		manifestPath : 'theGreatFoxby.manifest',
		jsName	   : 'theGreatFoxby',
		game_id    : 1244,
		scene      : function() {
			return new TheGreatFoxby( this.game_id, this.name, resSlot244);
		}
	},
	{
		name       : 'genieCatsWishVip',
		res        : g_resSlot247.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot247,
		soundRes   : g_sndSlot247,
		manifestPath : 'genieCatsWish.manifest',
		jsName	   : 'genieCatsWish',
		game_id    : 1247,
		scene      : function() {
			return new genieCatsWish( this.game_id, this.name, resSlot247 );
		}
	},
	{
		name       : 'drakeAndCakeVip',
		res        : g_resSlot248.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot248,
		soundRes   : g_sndSlot248,
		manifestPath : 'drakeAndCake.manifest',
		jsName	   : 'drakeAndCake',
		game_id    : 1248,
		scene      : function() {
			return new DrakeAndCake( this.game_id, this.name, resSlot248 );
		}
	},
	{
		name       : 'lockNLootVip',
		res        : g_resSlot249.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot249,
		soundRes   : g_sndSlot249,
		manifestPath : 'lockNLoot.manifest',
		jsName	   : 'lockNLoot',
		game_id    : 1249,
		scene      : function() {
			return new LockNLoot( this.game_id, this.name, resSlot249 );
		}
	},
	{
		name       : 'ancientTreasuresVip',
		res        : g_resSlot250.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot250,
		soundRes   : g_sndSlot250,
		manifestPath : 'ancientTreasures.manifest',
		jsName	   : 'ancientTreasures',
		game_id    : 1250,
		scene      : function() {
			return new AncientTreasures( this.game_id, this.name, resSlot250 );
		}
	},
	{
		name       : 'tikiFrenzyVip',
		res        : g_resSlot251.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot251,
		soundRes   : g_sndSlot251,
		manifestPath : 'tikiFrenzy.manifest',
		jsName	   : 'tikiFrenzy',
		game_id    : 1251,
		scene      : function() {
			return new TikiFrenzy( this.game_id, this.name, resSlot251 );
		}
	},
	{
		name       : 'nekoFortuneVip',
		res        : g_resSlot252.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot252,
		soundRes   : g_sndSlot252,
		manifestPath : 'nekoFortune.manifest',
		jsName	   : 'nekoFortune',
		game_id    : 1252,
		scene      : function() {
			return new nekoFortune( this.game_id, this.name, resSlot252 );
		}
	},
    {
        name       : 'royalDragonsVip',
        res        : g_resSlot253.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot253,
        soundRes   : g_sndSlot253,
        manifestPath : 'royalDragons.manifest',
        jsName	   : 'royalDragons',
        game_id    : 1253,
        scene      : function() {
            return new RoyalDragons( this.game_id, this.name, resSlot253 );
        }
    },
	{
		name       : 'hippoBankBlastVip',
		res        : g_resSlot254.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot254,
		soundRes   : g_sndSlot254,
		manifestPath : 'hippoBankBlast.manifest',
		jsName	   : 'hippoBankBlast',
		game_id    : 1254,
		scene      : function() {
			return new HippoBankBlast( this.game_id, this.name, resSlot254);
		}
	},
	{
		name       : 'boardwalkBonanzaVip',
		res        : g_resSlot255.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot255,
		soundRes   : g_sndSlot255,
		manifestPath : 'boardwalkBonanza.manifest',
		jsName	   : 'boardwalkBonanza',
		game_id    : 1255,
		scene      : function() {
			return new boardwalkBonanza( this.game_id, this.name, resSlot255 );
		}
	},
	{
		name       : 'roseInGoldVip',
		res        : g_resSlot256.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot256,
		soundRes   : g_sndSlot256,
		manifestPath : 'roseInGold.manifest',
		jsName	   : 'roseInGold',
		game_id    : 1256,
		scene      : function() {
			return new RoseInGold( this.game_id, this.name, resSlot256 );
		}
	},
	{
		name       : 'sharkRushVip',
		res        : g_resSlot257.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot257,
		soundRes   : g_sndSlot257,
		manifestPath : 'sharkRush.manifest',
		jsName	   : 'sharkRush',
		game_id    : 1257,
		scene      : function() {
			return new SharkRush( this.game_id, this.name, resSlot257 );
		}
	},
	{
		name       : 'zoomZoomDoubleVip',
		res        : g_resSlot258.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot258,
		soundRes   : g_sndSlot258,
		manifestPath : 'zoomZoomDouble.manifest',
		jsName	   : 'zoomZoomDouble',
		game_id    : 1258,
		orientation: 'portrait',
		scene      : function() {
			return new ZoomZoomDouble( this.game_id, this.name, resSlot258);
		}
	},
    {
        name       : 'gorgonsGlareVip',
        res        : g_resSlot259.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot259,
        soundRes   : g_sndSlot259,
        manifestPath : 'gorgonsGlare.manifest',
        jsName	   : 'gorgonsGlare',
        game_id    : 1259,
        scene      : function() {
            return new gorgonsGlare( this.game_id, this.name, resSlot259 );
        }
    },
    {
        name       : 'herculesSagaVip',
        res        : g_resSlot260.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot260,
        soundRes   : g_sndSlot260,
        manifestPath : 'herculesSaga.manifest',
        jsName	   : 'herculesSaga',
        game_id    : 1260,
        scene      : function() {
            return new HerculesSaga( this.game_id, this.name, resSlot260 );
        }
    },
	{
		name       : 'goldenCaseVip',
		res        : g_resSlot261.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot261,
		soundRes   : g_sndSlot261,
		manifestPath : 'goldenCase.manifest',
		jsName	   : 'goldenCase',
		game_id    : 1261,
		orientation: 'portrait',
		scene      : function() {
			return new GoldenCase( this.game_id, this.name, resSlot261);
		}
	},
	{
		name       : 'doubleSunriseLockVip',
		res        : g_resSlot262.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot262,
		soundRes   : g_sndSlot262,
		manifestPath : 'doubleSunriseLock.manifest',
		jsName	   : 'doubleSunriseLock',
		game_id    : 1262,
		scene      : function() {
			return new DoubleSunriseLock( this.game_id, this.name, resSlot262);
		}
	},
    {
        name       : 'millionDollarChickensVip',
        res        : g_resSlot263.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot263,
        soundRes   : g_sndSlot263,
        manifestPath : 'millionDollarChickens.manifest',
        jsName	   : 'millionDollarChickens',
        game_id    : 1263,
        orientation: 'portrait',
        scene      : function() {
            return new MillionDollarChickens( this.game_id, this.name, resSlot263);
        }
    },
	{
		name       : 'hoggyweenVip',
		res        : g_resSlot264.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot264,
		soundRes   : g_sndSlot264,
		manifestPath : 'hoggyween.manifest',
		jsName	   : 'hoggyween',
		game_id    : 1264,
		scene      : function() {
			return new Hoggyween( this.game_id, this.name, resSlot264 );
		}
	},
	{
		name       : 'wickedCauldronsVip',
		res        : g_resSlot265.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot265,
		soundRes   : g_sndSlot265,
		manifestPath : 'wickedCauldrons.manifest',
		jsName	   : 'wickedCauldrons',
		game_id    : 1265,
		orientation: 'portrait',
		scene      : function() {
			return new WickedCauldrons( this.game_id, this.name, resSlot265);
		}
	},
	{
		name       : 'legendaryVikingsVip',
		res        : g_resSlot266.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot266,
		soundRes   : g_sndSlot266,
		manifestPath : 'legendaryVikings.manifest',
		jsName	   : 'legendaryVikings',
		game_id    : 1266,
		scene      : function() {
			return new LegendaryVikings( this.game_id, this.name, resSlot266);
		}
	},
	{
		name       : 'fortuneMeowVip',
		res        : g_resSlot267.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot267,
		soundRes   : g_sndSlot267,
		manifestPath : 'fortuneMeow.manifest',
		jsName	   : 'fortuneMeow',
		game_id    : 1267,
		scene      : function() {
			return new FortuneMeow( this.game_id, this.name, resSlot267 );
		}
	},
	{
		name       : 'pirateParadeVip',
		res        : g_resSlot268.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot268,
		soundRes   : g_sndSlot268,
		manifestPath : 'pirateParade.manifest',
		jsName	   : 'pirateParade',
		game_id    : 1268,
		scene      : function() {
			return new PirateParade( this.game_id, this.name, resSlot268 );
		}
	},
	{
		name       : 'superBunnyBankVip',
		res        : g_resSlot269.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot269,
		soundRes   : g_sndSlot269,
		manifestPath : 'superBunnyBank.manifest',
		jsName	   : 'superBunnyBank',
		game_id    : 1269,
		orientation: 'portrait',
		scene      : function() {
			return new SuperBunnyBank( this.game_id, this.name, resSlot269);
		}
	},
	{
		name       : 'goldenKoiVip',
		res        : g_resSlot270.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot270,
		soundRes   : g_sndSlot270,
		manifestPath : 'goldenKoi.manifest',
		jsName	   : 'goldenKoi',
		game_id    : 1270,
		orientation: 'portrait',
		scene      : function() {
			return new GoldenKoi( this.game_id, this.name, resSlot270);
		}
	},
	{
		name       : 'statuesSecretsVip',
		res        : g_resSlot272.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot272,
		soundRes   : g_sndSlot272,
		manifestPath : 'statuesSecrets.manifest',
		jsName	   : 'statuesSecrets',
		game_id    : 1272,
		scene      : function() {
			return new StatuesSecrets( this.game_id, this.name, resSlot272 );
		}
	},
	{
		name       : 'littleWizardJackpotsVip',
		res        : g_resSlot271.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot271,
		soundRes   : g_sndSlot271,
		manifestPath : 'littleWizardJackpots.manifest',
		jsName	   : 'littleWizardJackpots',
		game_id    : 1271,
		scene      : function() {
			return new LittleWizardJackpots( this.game_id, this.name, resSlot271 );
		}
	},
    {
        name       : 'goldenEggDropDeluxeVip',
        res        : g_resSlot273.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot273,
        soundRes   : g_sndSlot273,
        manifestPath : 'goldenEggDropDeluxe.manifest',
        jsName	   : 'goldenEggDropDeluxe',
        game_id    : 1273,
        scene      : function() {
            return new GoldenEggDropDeluxe( this.game_id, this.name, resSlot273 );
        }
    },
	{
		name       : 'kingsFuryVip',
		res        : g_resSlot275.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot275,
		soundRes   : g_sndSlot275,
		manifestPath : 'kingsFury.manifest',
		jsName	   : 'kingsFury',
		game_id    : 1275,
		orientation: 'portrait',
		scene      : function() {
			return new KingsFury( this.game_id, this.name, resSlot275);
		}
	},
	{
		name       : 'lampsOfFortuneVip',
		res        : g_resSlot274.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot274,
		soundRes   : g_sndSlot274,
		manifestPath : 'lampsOfFortune.manifest',
		jsName	   : 'lampsOfFortune',
		game_id    : 1274,
		orientation: 'portrait',
		scene      : function() {
			return new LampsOfFortune( this.game_id, this.name, resSlot274);
		}
	},
	/**
	 * Vegas Classic Vip
     */
    {
        name       : 'vegasClassicVip',
        res        : g_resClassicWild.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resClassicWild,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wild1SubSlot.manifest',
        game_id    : 1027,
        scene      : function() {
            return new VegasSlotScene( 1027 );
        },
        slot	   : function ( _owner ) {
            return new wild1SubSlot( _owner );
        },
        jsName	   : 'ClassicWild1',
    },
    {
        name       : 'classicWild2Vip',
        res        : g_resClassicWild02.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resClassicWild02,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wild2SubSlot.manifest',
        game_id    : 1032,
        scene      : function() {
            return new VegasSlotScene ( 1032 );
        },
        slot	   : function ( _owner ) {
            return new wild2SubSlot( _owner );
        },
        jsName	   : 'ClassicWild2',
    },
    {
        name       : 'classicWild3Vip',
        category   : 'classicSlot',
        res        : g_resClassicWild03.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resClassicWild03,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wild3SubSlot.manifest',
        game_id    : 1033,
        scene      : function() {
            return new VegasSlotScene ( 1033 );
        },
        slot	   : function ( _owner ) {
            return new wild3SubSlot( _owner );
        },
        jsName	   : 'ClassicWild3',
    },
    {
        name       : 'classicFiveVIP',
        category   : 'classicSlot',
        res        : g_resClassicFive.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resClassicFive,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_fiveSubSlot.manifest',
        game_id    : 1037,
        scene      : function() {
            return new VegasSlotScene ( 1037 );
        },
        slot	   : function ( _owner ) {
            return new fiveSubSlot( _owner );
        },
        jsName	   : 'ClassicFive',
    },
    {
        name       : 'tripleDiamondVIP',
        category   : 'classicSlot',
        res        : g_resTripleDiamond.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resTripleDiamond,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_tripleDiamond.manifest',
        game_id    : 1038,
        scene      : function() {
            return new VegasSlotScene ( 1038 );
        },
        slot	   : function ( _owner ) {
            return new TripleDiamondSubSlot( _owner );
        },
        jsName	   : 'tripleDiamond',
    },
    {
        name       : 'wildRespinVip',
        category   : 'classicSlot',
        res        : g_resWildRespin.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resWildRespin,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wildRespin.manifest',
        game_id    : 1049,
        scene      : function() {
            return new VegasSlotScene ( 1049 );
        },
        slot	   : function ( _owner ) {
            return new WildRespin( _owner );
        },
        jsName	   : 'wildRespin',
    },
    {
        name       : 'extraReelVip',
        category   : 'classicSlot',
        res        : g_resExtraReel.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resExtraReel,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_extraReel.manifest',
        game_id    : 1051,
        scene      : function() {
            return new VegasSlotScene ( 1051 );
        },
        slot	   : function ( _owner ) {
            return new ExtraReel( _owner );
        },
        jsName	   : 'extraReel',
    },
    {
        name       : 'purpleDiamondVip',
        category   : 'classicSlot',
        res        : g_resPurpleDiamond.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resPurpleDiamond,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_purpleDiamond.manifest',
        game_id    : 1053,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE; // 정의가 sceneList 가 더 빨리되므로 이렇게 할 수 밖에 없음. OBG
        },
        scene      : function() {
            return new VegasSlotScene ( 1053 );
        },
        slot	   : function ( _owner ) {
            return new PurpleDiamond( _owner );
        },
        jsName	   : 'purpleDiamond',
    },
	{
        name       : 'tripleSevenVip',
        category   : 'classicSlot',
        res        : g_resTripleSeven.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resTripleSeven,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_tripleSeven.manifest',
        game_id    : 1060,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 1060 );
        },
        slot	   : function ( _owner ) {
            return new TripleSeven( _owner );
        },
        jsName	   : 'tripleSeven',
    },
    {
		name       : 'blackDiamondVip',
		category   : 'classicSlot',
        res        : g_resBlackDiamond.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resBlackDiamond,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_blackDiamond.manifest',
		game_id    : 1063,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
		},
		scene      : function() {
			return new VegasSlotScene ( 1063 );
		},
		slot	   : function ( _owner ) {
			return new BlackDiamond( _owner );
		},
        jsName	   : 'blackDiamond',
	},
    {
        name       : 'burningRespinVip',
        category   : 'classicSlot',
        res        : g_resBurningRespin.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resBurningRespin,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespin.manifest',
        game_id    : 1065,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 1065 );
        },
        slot	   : function ( _owner ) {
            return new BurningRespin( _owner );
        },
        jsName	   : 'burningRespin',
    },
	{
		name       : 'burningWildQuickFireVip',
		category   : 'classicSlot',
        res        : g_resBurningWildQuickFire.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resBurningWildQuickFire,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_burningWildQuickFire.manifest',
		game_id    : 1071,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.MOVE;
		},
		scene      : function() {
			return new VegasSlotScene ( 1071 );
		},
		slot	   : function ( _owner ) {
			return new BurningWildQuickFire( _owner );
		},
        jsName	   : 'burningWildQuickFire',
	},
	// BWN 추가
	{
		name       : 'burningWildNudgingFireVip',
		category   : 'classicSlot',
        res        : g_resBurningWildNudgingFire.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resBurningWildNudgingFire,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_burningWildNudgingFire.manifest',
		game_id    : 1074,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
		},
		scene      : function() {
			return new VegasSlotScene ( 1074 );
		},
		slot	   : function ( _owner ) {
			return new BurningWildNudgingFire( _owner );
		},
        jsName	   : 'burningWildNudgingFire',
	},
	// BRC 추가
    {
        name       : 'burningRespinChiliVip',
        category   : 'classicSlot',
        res        : g_resBurningRespinChili.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resBurningRespinChili,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespinChili.manifest',
        game_id    : 1076,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 1076 );
        },
        slot	   : function ( _owner ) {
            return new BurningRespinChili( _owner );
        },
        jsName	   : 'BurningRespinChili',
    },
	// BR5 추가
    {
        name       : 'burningRespin5XVip',
        category   : 'classicSlot',
        res        : g_resBurningRespin5X.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resBurningRespin5X,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningRespin5X.manifest',
        game_id    : 1078,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 1078 );
        },
        slot	   : function ( _owner ) {
            return new burningRespin5X( _owner );
        },
        jsName	   : 'burningRespin5X',
    },
    // WH 추가
    {
        name       : 'WildHitVip',
        category   : 'classicSlot',
        res        : g_resWildHit.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resWildHit,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_wildHit.manifest',
        game_id    : 1080,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE; // 정의가 sceneList 가 더 빨리되므로 이렇게 할 수 밖에 없음. OBG
        },
        scene      : function() {
            return new VegasSlotScene ( 1080 );
        },
        slot	   : function ( _owner ) {
            return new WildHit( _owner );
        },
        slotUI     : function ( owner ) {
            return new WildHitUI( owner );
        },
        jsName	   : 'wildHit',
    },
    // BWL 추가
    {
        name       : 'burningWildLockingFireVip',
        category   : 'classicSlot',
        res        : g_resBurningWildLockingFire.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resBurningWildLockingFire,
        soundRes   : g_sndVegasClassic,
        manifestPath : 'c_common.manifest',
        subManifest : 'c_burningWildLockingFire.manifest',
        game_id    : 1081,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( 1081 );
        },
        slot	   : function ( _owner ) {
            return new BurningWildLockingFire( _owner );
        },
        jsName	   : 'burningWildLockingFire',
    },
	{
		name       : 'epicRespinVip',
		category   : 'classicSlot',
		res        : g_resCrazyRespin.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resCrazyRespin,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_epicRespin.manifest',
		game_id    : 1102,
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new CrazyRespin( _owner );
		},
        jsName	   : 'EpicRespin',
	},
	{
		name       : '77WildVip',
		category   : 'classicSlot',
		res        : g_resSevenSevenWild.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resSevenSevenWild,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_SevenSevenWild.manifest',
		game_id    : 1089,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
		},
		scene      : function() {
			return new VegasSlotScene( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new SevenSevenWild( _owner );
		},
        jsName	   : 'SevenSevenWild',
	},
	{
		name       : 'moneyMakerVip',
		category   : 'classicSlot',
		res        : g_resMoneyMaker.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resMoneyMaker,
		soundRes   : g_sndVegasClassic,
		manifestPath : 'c_common.manifest',
		subManifest : 'c_MoneyMaker.manifest',
		game_id    : 1108,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.MOVE; // 정의가 sceneList 가 더 빨리되므로 이렇게 할 수 밖에 없음. OBG
		},
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new MoneyMaker( _owner );
		},
		jsName : 'MoneyMaker',
	},


    {
        name         : 'superBallKenoVip',
        category   : 'classicSlot',
        res          : g_resSuperBall.concat(g_resCommonKeno_vip),
        purgeTarget : resSuperBall,
        soundRes     : g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_superBall.manifest',
        game_id      : 1092,
        scene        : function() {
            return new KenoScene ( 1092 );
        },
        kenoUI: function () {
            var ui = new SuperBallUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'SuperBallKeno',
    },

    {
        name         : 'scarabKenoVip',
        res          : g_resScarab.concat(g_resCommonKeno_vip),
        purgeTarget : resScarab,
        soundRes     : g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_scarab.manifest',
        game_id      : 1107,
        scene        : function() {
            return new KenoScene ( 1107 );
        },
        kenoUI: function () {
            var ui = new ScarabUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'ScarabKeno',
    },

    {
        name: 'dinoKenoVip',
        res: g_resDinoKeno.concat(g_resCommonKeno_vip),
        purgeTarget: resDinoKeno,
        soundRes: g_sndKeno,
        manifestPath : 'c_common.manifest',
        subManifest : 'k_dino.manifest',
        game_id: 1120,
        scene: function () {
            return new KenoScene(1120);
        },
        kenoUI: function () {
            var ui = new DinoKenoUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'DinoKeno',
    },
	{
		name		: 'triplePowerKenoVip',
		res			: g_resTriplePowerKeno.concat(g_resCommonKeno_vip),
		purgeTarget	: resTriplePowerKeno,
		soundRes	: g_sndKeno,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_triplePower.manifest',
		loader		: null,
		game_id		: 1124,
		scene		: function () {
			return new KenoScene( this.game_id );
		},
		kenoUI		: function () {
			var ui = new TriplePowerUI();
			var dataController = new KenoDataController();
			return {
				ui: ui,
				dataController: dataController
			}
		},
        jsName	   : 'TriplePowerKeno',
	},
    {
        name       : 'moneyMakerGrandVip',
        category   : 'classicSlot',
        res        : g_resMoneyMakerGrand.concat(g_resCommonClassicVegasSlot_vip),
        slotRes    : g_resMoneyMakerGrand,
        soundRes   : g_sndVegasClassic,
        manifestPath: 'c_common.manifest',
        subManifest : 'c_MoneyMakerGrand.manifest',
        game_id    : 1141,
        slotMoveType   : function() {
            return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
        },
        scene      : function() {
            return new VegasSlotScene ( this.game_id );
        },
        slot	   : function ( _owner ) {
            return new MoneyMakerGrand( _owner );
        },
        jsName	   : 'moneyMakerGrand'
    },
    {
        name        : 'freeSpinKenoVip',
        res         : g_resFreeSpinKeno.concat(g_resCommonKeno_vip),
        purgeTarget	: resFreeSpinKeno,
        soundRes    : g_sndKeno,
        game_id     : 1132,
        manifestPath: 'c_common.manifest',
        subManifest : 'k_diamond.manifest',
        scene: function () {
            return new KenoScene(1132);
        },
        kenoUI: function () {
            var ui = new FreeSpinKenoUI();
            var dataController = new KenoDataController();
            return {
                ui: ui,
                dataController: dataController
            }
        },
        jsName	   : 'FreeSpinKeno',
    },
	{
		name       : 'moneyMakerWheelVip',
		category   : 'classicSlot',
		res        : g_resMoneyMakerWheel.concat(g_resCommonClassicVegasSlot_vip),
		slotRes    : g_resMoneyMakerWheel,
		soundRes   : g_sndVegasClassic,
		manifestPath: 'c_common.manifest',
		subManifest : 'c_MoneyMakerWheel.manifest',
		game_id    : 1142,
		slotMoveType   : function() {
			return VegasSlotScene.prototype.SLOT_TYPE.NONE_MOVE;
		},
		scene      : function() {
			return new VegasSlotScene ( this.game_id );
		},
		slot	   : function ( _owner ) {
			return new MoneyMakerWheel( _owner );
		},
		jsName	   : 'MoneyMakerWheel'
	},
	{
		name        : 'doubleSevenKenoVip',
		res         : g_resKeno189.concat(g_resCommonKeno_vip),
		purgeTarget	: resKeno189,
		soundRes    : g_sndKeno,
		game_id     : 1189,
		loader: null,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_doubleSeven.manifest',
		scene: function () {
			return new DoubleSevenKenoScene( this.game_id );
		},
		kenoUI: function () {
			var ui = new DoubleSevenKenoUI();
			var dataController = new KenoDataController();
			return {
				ui: ui,
				dataController: dataController
			}
		},
		jsName	   : 'doubleSevenKeno',
	},
	{
		name: 'fortunePotKenoVip',
		purgeTarget: resKeno230,
		res: g_resKeno230.concat(g_resCommonKeno_vip),
		soundRes: g_sndKeno230,
		loader: null,
		game_id: 1230,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_fortunePot.manifest',
		jsName	   : 'fortunePotKeno',
		scene      : function() {
			return new FortunePotKeno( this.game_id, this.name, resKeno230 );
		}
	},
	{
		name: 'hotChiliKenoVip',
		purgeTarget: resKeno231,
		res: g_resKeno231.concat(g_resCommonKeno_vip),
		soundRes: g_sndKeno231,
		loader: null,
		game_id: 1231,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_hotChiliKeno.manifest',
		jsName	   : 'hotChiliKeno',
		scene      : function() {
			return new HotChiliKeno( this.game_id, this.name, resKeno231 );
		}
	},
	{
		name: 'megaXBallKenoVip',
		purgeTarget: resKeno245,
		res: g_resKeno245.concat(g_resCommonKeno_vip),
		soundRes: g_sndKeno245,
		loader: null,
		game_id: 1245,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_megaXBallKeno.manifest',
		jsName	   : 'megaXBallKeno',
		scene      : function() {
			return new MegaXBallKeno( this.game_id, this.name, resKeno245 );
		}
	},
	{
		name: 'sharkenoVip',
		purgeTarget: resKeno246,
		res: g_resKeno246.concat(g_resCommonKeno_vip),
		soundRes: g_sndKeno246,
		loader: null,
		game_id: 1246,
		manifestPath: 'c_common.manifest',
		subManifest : 'k_sharkKeno.manifest',
		jsName	   : 'sharkKeno',
		scene      : function() {
			return new SharkKeno( this.game_id, this.name, resKeno246 );
		}
	},

    /** membership pass extreme slots */
	{
		name       : 'fortunePandaExz',
		res        : g_resFortunePanda.concat(g_resCommonSlot_vip),
		purgeTarget: resFortunePanda,
		soundRes   : g_sndFortunePanda,
		manifestPath: 'fortunePanda.manifest',
		game_id    : 11070,
		scene      : function() {
			return new FortunePanda ( 11070 );
		},
		jsName 	   : 'FortunePanda',
	},
	{
		name       : 'TreasureOfOzExz',
		res        : g_resTreasureOfOz.concat(g_resCommonSlot_vip),
		purgeTarget: resTreasureOfOz,
		soundRes   : g_sndTreasureOfOz,
		manifestPath: 'treasureOfOz.manifest',
		game_id    : 11079,
		scene      : function() {
			return new TreasureOfOz ( 11079 );
		},
		jsName 	   : 'TreasureOfOz',
	},
    {
        name       : 'vegasDiamondExz',
        res        : g_resVegasDiamond.concat(g_resCommonSlot_vip),
        purgeTarget: resVegasDiamond,
        soundRes   : g_sndVegasDiamond,
        manifestPath : 'vegasDiamond.manifest',
        jsName	   : 'VegasDiamond',
        game_id    : 11083,
        scene      : function() {
            return new VegasDiamond( this.game_id );
        }
    },
    {
        name       : 'lunarFortuneExz',
        res        : g_resLunarFortune.concat(g_resCommonSlot_vip),
        purgeTarget: resLunarFortune,
        soundRes   : g_sndLunarFortune,
        manifestPath: 'lunarFortune.manifest',
        game_id    : 11085,
        scene      : function() {
            return new LunarFortune ( this.game_id );
        },
        jsName 	   : 'LunarFortune',
    },
	{
		name       : 'JackpotMagicExz',
		res        : g_resJackpotMagic.concat(g_resCommonSlot_vip),
		purgeTarget: resJackpotMagic,
		soundRes   : g_sndJackpotMagic,
		manifestPath: 'JackpotMagic.manifest',
		game_id    : 11091,
		scene      : function() {
			return new JackpotMagic ( 11091 );
		},
		jsName 	   : 'JackpotMagic',
	},
	{
		name       : 'candyConnectLinkExz',
		res        : g_resCandyConnectLink.concat(g_resCommonSlot_vip),
		purgeTarget: resCandyConnectLink,
		soundRes   : g_sndCandyConnectLink,
		manifestPath : 'candyConnectLink.manifest',
		game_id    : 11093,
		scene      : function() {
			return new CandyConnectLink ( 11093 );
		},
		jsName 	   : 'CandyConnectLink',
	},
	{
		name       : 'monsterParadeExz',
		res        : g_resMonsterParade.concat(g_resCommonSlot_vip),
		purgeTarget: resMonsterParade,
		soundRes   : g_sndMonsterParade,
		manifestPath: 'monsterParade.manifest',
		game_id    : 11094,
		scene      : function() {
			return new MonsterParade( this.game_id, this.name );
		},
		jsName 		: 'MonsterParade',
	},
    {
        name       : 'piggyKingExz',
        res        : g_resPiggyKing.concat(g_resCommonClassicSlot_vip),
        purgeTarget: resPiggyKing,
        soundRes   : g_sndPiggyKing,
        game_id    : 11099,
        manifestPath: 'piggyKing.manifest',
        scene      : function() {
            return new PiggyKing ( this.game_id, this.name );
        },
        jsName 	   : 'PiggyKing',
    },
	{
		name       : 'bankOfJackpotExz',
		res        : g_resBankOfJackpot.concat(g_resCommonSlot_vip),
		purgeTarget: resBankOfJackpot,
		soundRes   : g_sndBankOfJackpot,
		game_id    : 11100,
		manifestPath: 'bankOfJackpot.manifest',
		scene      : function() {
			return new BankOfJackpot ( this.game_id, this.name );
		},
		jsName 	   : 'BankOfJackpot',
	},
    {
        name       : 'rollingInMoneyExz',
        res        : g_resRollingInMoney.concat(g_resCommonSlot_vip),
        purgeTarget: resRollingInMoney,
        soundRes   : g_sndRollingInMoney,
        game_id    : 11101,
        manifestPath: 'rollingInMoney.manifest',
        scene      : function() {
            return new RollingInMoney ( this.game_id, this.name );
        },
        jsName 	   : 'RollingInMoney',
    },
	{
		name       : 'fortunePotLinkExz',
		res        : g_resFortunePotLink.concat(g_resCommonSlot_vip),
		purgeTarget: resFortunePotLink,
		soundRes   : g_sndFortunePotLink,
		game_id    : 11104,
		manifestPath: 'fortunePotLink.manifest',
		scene      : function() {
			return new FortunePotLink ( this.game_id );
		},
		jsName	   : 'FortunePotLink',
	},
	{
		name       : 'sugarFactoryExz',
		res        : g_resSugarFactory.concat(g_resCommonSlot_vip),
		purgeTarget: resSugarFactory,
		soundRes   : g_sndSugarFactory,
		manifestPath : 'sugarFactory.manifest',
		game_id    : 11114,
		scene      : function() {
			return new SugarFactory( this.game_id, this.name );
		},
		jsName	   : 'SugarFactory',
	},
    {
        name       : 'luckyCoinExz',
        res        : g_resLuckyCoin.concat(g_resCommonSlot_vip),
        purgeTarget: resLuckyCoin,
        soundRes   : g_sndLuckyCoin,
        manifestPath : 'luckyCoin.manifest',
        game_id    : 11116,
        scene      : function() {
            return new LuckyCoin( this.game_id, this.name );
        },
        jsName 	   : 'LuckyCoin',
    },
    {
        name       : 'honeyBeengoExz',
        res        : g_resHoneyBeengo.concat(g_resCommonSlot_vip),
        purgeTarget: resHoneyBeengo,
        soundRes   : g_sndHoneyBeengo,
        manifestPath : 'honeyBeengo.manifest',
        game_id    : 11117,
        scene      : function() {
            return new HoneyBeengo( this.game_id, this.name );
        },
        jsName 	   : 'HoneyBeengo',
    },
	{
		name            : 'spookyPumpkinExz',
		res             : g_resSpookyPumpkin.concat(g_resCommonSlot_vip),
		purgeTarget     : resSpookyPumpkin,
		soundRes        : g_sndSpookyPumpkin,
		manifestPath 	: 'spookyPumpkin.manifest',
		game_id         : 11119,
		scene           : function() {
			return new SpookyPumpkin( this.game_id, this.name );
		},
		jsName		 : 'SpookyPumpkin',
	},
    {
        name       : 'royalDiamondsExz',
        res        : g_resRoyalDiamonds.concat(g_resCommonSlot_vip),
        purgeTarget: resRoyalDiamonds,
        soundRes   : g_sndRoyalDiamonds,
        manifestPath 	: 'royalDiamonds.manifest',
        game_id    : 11125,
        scene      : function() {
            return new RoyalDiamonds( this.game_id, this.name );
        },
        jsName 	   : 'RoyalDiamonds',
    },
	{
		name       : 'littlePiggyTrioExz',
		res        : g_resLittlePiggyTrio.concat(g_resCommonSlot_vip),
		purgeTarget: resLittlePiggyTrio,
		soundRes   : g_sndLittlePiggyTrio,
		manifestPath : 'littlePiggyTrio.manifest',
		game_id    : 11127,
		scene      : function() {
			return new LittlePiggyTrio( this.game_id, this.name );
		},
		jsName 	   : 'LittlePiggyTrio',
	},
	{
		name       : 'fuFuDiamondExz',
		res        : g_resFuFuDiamond.concat(g_resCommonSlot_vip),
		purgeTarget: resFuFuDiamond,
		soundRes   : g_sndFuFuDiamond,
		manifestPath : 'fuFuDiamond.manifest',
		game_id    : 11128,
		scene      : function() {
			return new FuFuDiamond( this.game_id, this.name );
		},
		jsName	   : 'FuFuDiamond',
	},
    {
        name       : 'chiliFiestaExz',
        res        : g_resChiliFiesta.concat(g_resCommonSlot_vip),
        purgeTarget: resChiliFiesta,
        soundRes   : g_sndChiliFiesta,
        manifestPath : 'chiliFiesta.manifest',
        game_id    : 11129,
        scene      : function() {
            return new ChiliFiesta( this.game_id, this.name );
        },
        jsName	   : 'ChiliFiesta',
    },
    {
        name       : 'threeWishesExz',
        res        : g_resGeniesWishes.concat(g_resCommonSlot_vip),
        purgeTarget: resGeniesWishes,
        soundRes   : g_sndGeniesWishes,
        manifestPath : 'threeWishes.manifest',
        game_id    : 11133,
        scene      : function() {
            return new GeniesWishes( this.game_id, this.name );
        },
        jsName	   : 'GenieWishes',
    },
	{
		name       : 'faCaiPotLinkExz',
		res        : g_resFaCaiPotLink.concat(g_resCommonSlot_vip),
		purgeTarget: resChiliFiesta,
		soundRes   : g_sndFaCaiPotLink,
		manifestPath : 'faCaiPotLink.manifest',
		game_id    : 11134,
		scene      : function() {
			return new FaCaiPot( this.game_id, this.name );
		},
		jsName	   : 'FaCaiPotLink',
	},
	{
		name       : 'shootTheRichesExz',
		res        : g_resShootTheRiches.concat(g_resCommonSlot_vip),
		purgeTarget: resShootTheRiches,
		soundRes   : g_sndShootTheRiches,
		manifestPath : 'shootTheRiches.manifest',
		game_id    : 11135,
		scene      : function() {
			return new ShootTheRiches( this.game_id, this.name );
		},
		jsName 	   : 'ShootTheRiches',
	},
    {
        name       : 'merlinsMagicBoxExz',
        res        : g_resMerlinsMagicBox.concat(g_resCommonSlot_vip),
        purgeTarget: resMerlinsMagicBox,
        soundRes   : g_sndMerlinsMagicBox,
        manifestPath : 'merlinsMagicBox.manifest',
        game_id    : 11136,
        scene      : function() {
            return new MerlinsMagicBox( this.game_id, this.name );
        },
        jsName 	   : 'MerlinsMagicBox',
    },
    {
        name       : 'junglesTreasureExz',
        res        : g_resJunglesTreasure.concat(g_resCommonSlot_vip),
        purgeTarget: resJunglesTreasure,
        soundRes   : g_sndJunglesTreasure,
        manifestPath : 'junglesTreasure.manifest',
        game_id    : 11137,
        scene      : function() {
            return new JunglesTreasure( this.game_id, this.name );
        },
        jsName 	   : 'JunglesTreasure',
    },
    {
        name       : 'goldenEggDropExz',
        res        : g_resGoldenEggDrop.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldenEggDrop,
        soundRes   : g_sndGoldenEggDrop,
        manifestPath : 'goldenEggDrop.manifest',
        game_id    : 11144,
        scene      : function() {
            return new GoldenEggDrop( this.game_id, this.name );
        },
        jsName     : "GoldenEggDrop"
    },
    {
        name       : 'monsterParadeBoostExz',
        res        : g_resMonsterParadeBoost.concat(g_resCommonSlot_vip),
        purgeTarget: resMonsterParadeBoost,
        soundRes   : g_sndMonsterParadeBoost,
        manifestPath : 'monsterParadeBoost.manifest',
        game_id    : 11148,
        jsName 	   : 'MonsterParadeBoost',
        scene      : function() {
            return new MonsterParadeBoost( this.game_id, this.name );
        }
    },
	{
		name       : 'sandsOfFortuneExz',
		res        : g_resSandsOfFortune.concat(g_resCommonSlot_vip),
		purgeTarget: resSandsOfFortune,
		soundRes   : g_sndSandsOfFortune,
		manifestPath : 'sandsOfFortune.manifest',
		game_id    : 11150,
		jsName 	   : 'SandsOfFortune',
		scene      : function() {
			return new SandsOfFortune( this.game_id, this.name );
		}
	},
    {
        name       : 'theDogFatherExz',
        res        : g_resTheDogFather.concat(g_resCommonSlot_vip),
        purgeTarget: resTheDogFather,
        soundRes   : g_sndTheDogFather,
        manifestPath : 'theDogFather.manifest',
        jsName 	   : 'TheDogFather',
        game_id    : 11153,
        scene      : function() {
            return new TheDogFather( this.game_id, this.name );
        }
    },
    {
        name       : 'goldenHoneyPotExz',
        res        : g_resGoldenHoneyPot.concat(g_resCommonSlot_vip),
        purgeTarget: resGoldenHoneyPot,
        soundRes   : g_sndGoldenHoneyPot,
        manifestPath : 'goldenHoneyPot.manifest',
        jsName	   : 'GoldenHoneyPot',
        game_id    : 11155,
        scene      : function() {
            return new GoldenHoneyPot( this.game_id, this.name );
        }
    },
	{
		name       : 'goCatchFishExz',
		res        : g_resGoCatchFish.concat(g_resCommonSlot_vip),
		purgeTarget: resGoCatchFish,
		soundRes   : g_sndGoCatchFish,
		manifestPath : 'goCatchFish.manifest',
		jsName	   : 'GoCatchFish',
		game_id    : 11156,
		scene      : function() {
			return new GoCatchFish( this.game_id, this.name );
		}
	},
    {
        name       : 'tripleMeTreasuresExz',
        res        : g_resTripleMeTreasures.concat(g_resCommonSlot_vip),
        purgeTarget: resTripleMeTreasures,
        soundRes   : g_sndTripleMeTreasures,
        manifestPath : 'tripleMeTreasures.manifest',
        jsName	   : 'TripleMeTreasures',
        game_id    : 11157,
        scene      : function() {
            return new TripleMeTreasures( this.game_id, this.name );
        }
    },
    {
        name       : 'bananzaCoinsExz',
        res        : g_resBananzaCoins.concat(g_resCommonSlot_vip),
        purgeTarget: resBananzaCoins,
        soundRes   : g_sndBananzaCoins,
        manifestPath : 'bananzaCoins.manifest',
        jsName	   : 'bananzaCoins',
        game_id    : 11160,
        scene      : function() {
            return new BananzaCoins( this.game_id, this.name );
        }
    },
	{
		name       : 'elToroParadeExz',
		res        : g_resElToroParade.concat(g_resCommonSlot_vip),
		purgeTarget: resElToroParade,
		soundRes   : g_sndelToroParade,
		manifestPath : 'elToroParade.manifest',
		jsName	   : 'elToroParade',
		game_id    : 11163,
		scene      : function() {
			return new elToroParade( this.game_id, this.name );
		}
	},
    {
        name       : 'theTaleOfCinderellaExz',
        res        : g_resTheTaleOfCinderella.concat(g_resCommonSlot_vip),
        purgeTarget: resTheTaleOfCinderella,
        soundRes   : g_sndTheTaleOfCinderella,
        manifestPath : 'TheTaleOfCinderella.manifest',
        jsName	   : 'TheTaleOfCinderella',
        game_id    : 11164,
        scene      : function() {
            return new TheTaleOfCinderella( this.game_id, this.name );
        }
    },
	{
		name       : 'frogPrinceMagicExz',
		res        : g_resFrogPrinceMagic.concat(g_resCommonSlot_vip),
		purgeTarget: resFrogPrinceMagic,
		soundRes   : g_sndFrogPrinceMagic,
		manifestPath : 'frogPrinceMagic.manifest',
		jsName	   : 'frogPrinceMagic',
		game_id    : 11165,
		scene      : function() {
			return new FrogPrinceMagic( this.game_id, this.name );
		}
	},
	{
		name       : 'spookyMansionExz',
		res        : g_resSpookyMansion.concat(g_resCommonSlot_vip),
		purgeTarget: resSpookyMansion,
		soundRes   : g_sndSpookyMansion,
		manifestPath : 'spookyMansion.manifest',
		jsName	   : 'spookyMansion',
		game_id    : 11176,
		scene      : function() {
			return new SpookyMansion( this.game_id, this.name );
		}
	},
	{
		name       : 'diggyCrushExz',
		res        : g_resSlot185.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot185,
		soundRes   : g_sndSlot185,
		manifestPath : 'SlotResource_185.manifest',
		jsName	   : 'diggyCrush',
		game_id    : 11185,
		scene      : function() {
			return new DiggyCrush( this.game_id, this.name, resSlot185 );
		}
	},
	{
		name       : 'wickedBoosFamilyExz',
		res        : g_resSlot187.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot187,
		soundRes   : g_sndSlot187,
		manifestPath : 'wickedBoosFamily.manifest',
		jsName	   : 'wickedBoosFamily',
		game_id    : 11187,
		scene      : function() {
			return new WickedBoosFamily( this.game_id, this.name, resSlot187);
		}
	},
	{
		name       : 'alchemyTrioExz',
		res        : g_resSlot193.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot193,
		soundRes   : g_sndSlot193,
		manifestPath : 'alchemyTrio.manifest',
		jsName	   : 'alchemyTrio',
		game_id    : 11193,
		scene      : function() {
			return new AlchemyTrio( this.game_id, this.name, resSlot193 );
		}
	},
	{
		name       : 'eggcellentAtelierExz',
		res        : g_resSlot196.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot196,
		soundRes   : g_sndSlot196,
		manifestPath : 'eggcellentAtelier.manifest',
		jsName	   : 'eggcellentAtelier',
		game_id    : 11196,
		scene      : function() {
			return new EggcellentAtelier( this.game_id, this.name, resSlot196 );
		}
	},
	{
		name       : 'strikingGoldExz',
		res        : g_resSlot197.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot197,
		soundRes   : g_sndSlot197,
		manifestPath : 'strikingGold.manifest',
		jsName	   : 'strikingGold',
		game_id    : 11197,
		scene      : function() {
			return new StrikingGold( this.game_id, this.name, resSlot197 );
		}
	},
	{
		name       : 'eternalLoveExz',
		res        : g_resSlot199.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot199,
		soundRes   : g_sndSlot199,
		manifestPath : 'Slot199.manifest',
		jsName	   : 'Slot199',
		game_id    : 11199,
		scene      : function() {
			return new Slot199( this.game_id, this.name, resSlot199 );
		}
	},
	{
		name       : 'potatoKingdomExz',
		res        : g_resSlot206.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot206,
		soundRes   : g_sndSlot206,
		manifestPath : 'potatoKingdom.manifest',
		jsName	   : 'potatoKingdom',
		game_id    : 11206,
		scene      : function() {
			return new PotatoKingdom( this.game_id, this.name, resSlot206 );
		}
	},
	{
		name       : 'luckyNekoParadeExz',
		res        : g_resSlot207.concat( g_resCommonSlot_vip ),
		purgeTarget: resSlot207,
		soundRes   : g_sndSlot207,
		manifestPath : 'luckyNekoParade.manifest',
		jsName	   : 'luckyNekoParade',
		game_id    : 11207,
		scene      : function() {
			return new luckyNekoParade( this.game_id, this.name, resSlot207 );
		}
	},
	{
		name       : 'helloweenPartyExz',
		res        : g_resSlot209.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot209,
		soundRes   : g_sndSlot209,
		manifestPath : 'helloweenParty.manifest',
		jsName	   : 'helloweenParty',
		game_id    : 11209,
		scene      : function() {
			return new HelloweenParty( this.game_id, this.name, resSlot209 );
		}
	},
	{
		name       : 'gummyYummyFiestaExz',
		res        : g_resSlot211.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot211,
		soundRes   : g_sndSlot211,
		manifestPath : 'gummyYummyFiesta.manifest',
		jsName	   : 'gummyYummyFiesta',
		game_id    : 11211,
		scene      : function() {
			return new GummyYummyFiesta( this.game_id, this.name, resSlot211 );
		}
	},
	{
		name       : 'drsSecretLabExz',
		res        : g_resSlot212.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot212,
		soundRes   : g_sndSlot212,
		manifestPath : 'drsSecretLab.manifest',
		jsName	   : 'drsSecretLab',
		game_id    : 11212,
		scene      : function() {
			return new drsSecretLab( this.game_id, this.name, resSlot212 );
		}
	},
	{
		name       : 'sizzlingBasketsExz',
		res        : g_resSlot213.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot213,
		soundRes   : g_sndSlot213,
		manifestPath : 'sizzlingBaskets.manifest',
		jsName	   : 'sizzlingBaskets',
		game_id    : 11213,
		scene      : function() {
			return new SizzlingBaskets( this.game_id, this.name, resSlot213 );
		}
	},
	{
		name       : 'bookOfCleosSecretsExz',
		res        : g_resSlot215.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot215,
		soundRes   : g_sndSlot215,
		manifestPath : 'bookOfCleosSecrets.manifest',
		jsName	   : 'bookOfCleosSecrets',
		game_id    : 11215,
		scene      : function() {
			return new BookOfCleosSecrets( this.game_id, this.name, resSlot215 );
		}
	},
	{
		name       : 'richesToRichesExz',
		res        : g_resSlot217.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot217,
		soundRes   : g_sndSlot217,
		manifestPath : 'richesToRiches.manifest',
		jsName	   : 'richesToRiches',
		game_id    : 11217,
		scene      : function() {
			return new RichesToRiches( this.game_id, this.name, resSlot217 );
		}
	},
	{
		name       : 'goldiesKingdomExz',
		res        : g_resSlot218.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot218,
		soundRes   : g_sndSlot218,
		manifestPath : 'goldiesKingdom.manifest',
		jsName	   : 'goldiesKingdom',
		game_id    : 11218,
		scene      : function() {
			return new GoldiesKingdom( this.game_id, this.name, resSlot218 );
		}
	},
	{
		name       : 'sharksBountyExz',
		res        : g_resSlot220.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot220,
		soundRes   : g_sndSlot220,
		manifestPath : 'sharksBounty.manifest',
		jsName	   : 'sharksBounty',
		game_id    : 11220,
		scene      : function() {
			return new SharksBounty( this.game_id, this.name, resSlot220 );
		}
	},
	{
		name       : 'hornsAndHalosExz',
		res        : g_resSlot223.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot223,
		soundRes   : g_sndSlot223,
		manifestPath : 'hornsAndHalos.manifest',
		jsName	   : 'hornsAndHalos',
		game_id    : 11223,
		scene      : function() {
			return new HornsAndHalos( this.game_id, this.name, resSlot223 );
		}
	},
	{
		name       : 'doomedToRichesExz',
		res        : g_resSlot224.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot224,
		soundRes   : g_sndSlot224,
		manifestPath : 'doomedToRiches.manifest',
		jsName	   : 'doomedToRiches',
		game_id    : 11224,
		scene      : function() {
			return new DoomedToRiches( this.game_id, this.name, resSlot224 );
		}
	},
	{
		name       : 'lockinPiggyExz',
		res        : g_resSlot225.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot225,
		soundRes   : g_sndSlot225,
		manifestPath : 'lockinPiggy.manifest',
		jsName	   : 'lockinPiggy',
		game_id    : 11225,
		scene      : function() {
			return new lockinPiggy( this.game_id, this.name, resSlot225 );
		}
	},
	{
		name       : 'monsterPrisonExz',
		res        : g_resSlot226.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot226,
		soundRes   : g_sndSlot226,
		manifestPath : 'monsterPrison.manifest',
		jsName	   : 'monsterPrison',
		game_id    : 11226,
		scene      : function() {
			return new MonsterPrison( this.game_id, this.name, resSlot226 );
		}
	},
	{
		name       : 'wizardsPotionShopExz',
		res        : g_resSlot228.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot228,
		soundRes   : g_sndSlot228,
		manifestPath : 'wizardsPotionShop.manifest',
		jsName	   : 'wizardsPotionShop',
		game_id    : 11228,
		scene      : function() {
			return new WizardsPotionShop( this.game_id, this.name, resSlot228 );
		}
	},
	{
		name       : 'moneyExpressExz',
		res        : g_resSlot233.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot233,
		soundRes   : g_sndSlot233,
		manifestPath : 'moneyExpress.manifest',
		jsName	   : 'moneyExpress',
		game_id    : 11233,
		scene      : function() {
			return new MoneyExpress( this.game_id, this.name, resSlot233 );
		}
	},
	{
		name       : 'chickyChickyParadeExz',
		res        : g_resSlot238.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot238,
		soundRes   : g_sndSlot238,
		manifestPath : 'chickyChickyParade.manifest',
		jsName	   : 'chickyChickyParade',
		game_id    : 11238,
		scene      : function() {
			return new ChickyChickyParade( this.game_id, this.name, resSlot238 );
		}
	},
	{
		name       : 'catchAndWinBonanzaExz',
		res        : g_resSlot239.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot239,
		soundRes   : g_sndSlot239,
		manifestPath : 'catchAndWinBonanza.manifest',
		jsName	   : 'catchAndWinBonanza',
		game_id    : 11239,
		scene      : function() {
			return new CatchAndWinBonanza( this.game_id, this.name, resSlot239);
		}
	},
	{
		name       : 'magicalCoinExz',
		res        : g_resSlot240.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot240,
		soundRes   : g_sndSlot240,
		manifestPath : 'magicalCoin.manifest',
		jsName	   : 'magicalCoin',
		game_id    : 11240,
		scene      : function() {
			return new MagicalCoin( this.game_id, this.name, resSlot240 );
		}
	},
	{
		name       : 'lockNLootExz',
		res        : g_resSlot249.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot249,
		soundRes   : g_sndSlot249,
		manifestPath : 'lockNLoot.manifest',
		jsName	   : 'lockNLoot',
		game_id    : 11249,
		scene      : function() {
			return new LockNLoot( this.game_id, this.name, resSlot249 );
		}
	},
	{
		name       : 'ancientTreasuresExz',
		res        : g_resSlot250.concat(g_resCommonSlot_vip),
		purgeTarget: resSlot250,
		soundRes   : g_sndSlot250,
		manifestPath : 'ancientTreasures.manifest',
		jsName	   : 'ancientTreasures',
		game_id    : 11250,
		scene      : function() {
			return new AncientTreasures( this.game_id, this.name, resSlot250 );
		}
	},
    {
        name       : 'nekoFortuneExz',
        res        : g_resSlot252.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot252,
        soundRes   : g_sndSlot252,
        manifestPath : 'nekoFortune.manifest',
        jsName	   : 'nekoFortune',
        game_id    : 11252,
        scene      : function() {
            return new nekoFortune( this.game_id, this.name, resSlot252 );
        }
    },
    {
        name       : 'royalDragonsExz',
        res        : g_resSlot253.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot253,
        soundRes   : g_sndSlot253,
        manifestPath : 'royalDragons.manifest',
        jsName	   : 'royalDragons',
        game_id    : 11253,
        scene      : function() {
            return new RoyalDragons( this.game_id, this.name, resSlot253 );
        }
    },
    {
        name       : 'sharkRushExz',
        res        : g_resSlot257.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot257,
        soundRes   : g_sndSlot257,
        manifestPath : 'sharkRush.manifest',
        jsName	   : 'sharkRush',
        game_id    : 11257,
        scene      : function() {
            return new SharkRush( this.game_id, this.name, resSlot257 );
        }
    },
    {
        name       : 'zoomZoomDoubleExz',
        res        : g_resSlot258.concat(g_resCommonSlot_vip),
        purgeTarget: resSlot258,
        soundRes   : g_sndSlot258,
        manifestPath : 'zoomZoomDouble.manifest',
        jsName	   : 'zoomZoomDouble',
        game_id    : 11258,
        orientation: 'portrait',
        scene      : function() {
            return new ZoomZoomDouble( this.game_id, this.name, resSlot258);
        }
    }
];