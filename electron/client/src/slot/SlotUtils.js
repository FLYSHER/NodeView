/**
 * Created by Federrine on 2020. 02. 21..
 * slot에서 사용하는 Util들을 정리하기 위해 제작
 * SlotUtil - nodeUtil
 */
var IslotUtils = (function () {
    var module;
    return {
        getInstance: function () {
            if (module === undefined) {
                module = new slotUtils();
            }

            return module;
        }
    };
})();

var slotUtils = function () {
    var arUtil = {
        changeSkin: function (armature, bonename, skinindex, isforce) {
            var bonelist = null;
            if (bonename instanceof Array)
                bonelist = bonename;
            else
                bonelist = [bonename];

            for (var i = 0; i < bonelist.length; i++) {
                var bone = armature.getBone(bonelist[i]);
                if (!!bone) {
                    if (bone.getDisplayManager().getDecorativeDisplayList().length > skinindex)
                        bone.changeDisplayWithIndex(skinindex, isforce);
                    else {
                        bone.changeDisplayWithIndex(-1, isforce);
                        //RockN.Assert('[SLOT UTIL]', armature._name, bonelist[i], skinindex, 'is out of range ', bone.getDisplayManager().getDecorativeDisplayList().length);
                    }
                } else {
                    //RockN.Assert('[SLOT UTIL]', armature._name, bonelist[i], 'is no exist');
                }
            }
        }
    };
    return {
        arUtil: arUtil,
    };
};

var SlotUtils = IslotUtils.getInstance();
