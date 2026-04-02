/**
 * game config
 * Player 세팅 때 1 회만 생성 RockN.Config 로 조회
 * 231011 @taegyun.han
 * */
window.GameConfig = legacy_cc.Class.extend({
    ctor : function ( data, cb ) {
        cc.log("[GameConfig][data] : ", data);
        RockN.Config = this;
        this.setup( data );
        cb && cb();
    },

    setup : function ( data ) {
        this.loungeBanProducts      = data.loungeBanProducts;
        this.nextClassPoint         = data.nextClassPoint;
        this.classUpReward          = data.classUpReward;
        this.shopMultiple           = data.shopMultiple;
        this.bonusMultiple          = data.bonusMultiple;
        this.lv5BonusStartLevel     = data.lv5BonusAvailableLevel; //5레벨 보너스 보상 시작 레벨

        this.afterSetup();
    },

    afterSetup : function () {
        // if(this.loungeBanProducts && VipSlotLockLayer) {
        //     VipSlotLockLayer.LoungeBanProducts = this.loungeBanProducts;
        // }
    },

    _getMultiplyIdxByGrade : function (grade) {
        var idx = 0;
        switch (grade) {
            case RockN.ClassType.GOLD:
                idx = 0; break;
            case RockN.ClassType.PLATINUM:
                idx = 1; break;
            case RockN.ClassType.DIAMOND:
                idx = 2; break;
            case RockN.ClassType.VIP:
                idx = 3; break;
            case RockN.ClassType.VVIP:
                idx = 4; break;
            case RockN.ClassType.HONOR_VIP:
                idx = 5; break;
            case RockN.ClassType.ROYAL_VIP:
                idx = 6; break;
            case RockN.ClassType.MASTER:
                idx = 7; break;
            case RockN.ClassType.R_MASTER:
                idx = 8; break;
            case RockN.ClassType.G_MASTER:
                idx = 9; break;
            default:
                RockN.Assert("** [Config] getMultiplyIdxByGrade** invalid grade : " + grade ); break;
        }
        return idx;
    },

    getShopMultiply : function (grade) {
        var idx = this._getMultiplyIdxByGrade(grade);
        if (!!this.shopMultiple && (0 <= idx && idx < this.shopMultiple.length)) {
            return this.shopMultiple[idx];
        }
    },

    getBonusMultiply : function (grade) {
        var idx = this._getMultiplyIdxByGrade(grade);
        if (!!this.bonusMultiple && (0 <= idx && idx < this.bonusMultiple.length)) {
            return this.bonusMultiple[idx];
        }
    },

    // return : array
    getAllClassUpReward : function() {
        return  this.classUpReward;
    },

    getClassUpReward : function (grade) {
        if (grade <= RockN.ClassType.GOLD || RockN.ClassType.G_MASTER < grade)
            return this.classUpReward[RockN.ClassType.G_MASTER];
        return this.classUpReward[grade - 1];
    },

    // return : array
    getAllClassNextPoint : function() {
        return this.nextClassPoint;
    },

    getFiveLevelBonusStartLevel : function() {
        return this.lv5BonusStartLevel;
    },


});