var TestComponent = TestComponent || {};

TestComponent.Base = cc.Component.extend({
    ctor: function () {
        this.cb = null;
    },

    update: function (dt) {
    }
});

TestComponent.LabelAnimation = TestComponent.Base.extend({
    ctor: function (animationName, cb, currentAR, childLabel) {
        this._super();
        this.setName(animationName);

        this.cb = cb;
        this.childLabel = childLabel;
        this.currentAR = currentAR;

        let boneID = 6;// 임시 face
        let boneArr = Object.values(currentAR._boneDic);
        for (let i = 0; i < boneArr.length; ++i) {
            if (boneID === i) {
                let name = boneArr[i]._name;
                this.boneName = name;
            }
        }

        this._started = false;
    },
    play: function (boneName) {
        if (boneName !== undefined) {
            this.boneName = boneName;
        }
        this._started = true;
    },
    update: function (dt) {
        if (this._started === true) {
            if (!!this.cb) {
                this.cb(this.childLabel, this.currentAR, this.boneName);
            }
        }
    }
});