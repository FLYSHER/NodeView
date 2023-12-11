var XFlightHistoryNotiNode = cc.Node.extend({
    /** @constructs */
    ctor: function (unitUI, maxLevel, maxCol, maxRow, unitSize) {
        this._super();
        this._initVars(maxLevel, maxCol, maxRow, unitSize);
        this._init(unitUI, maxLevel);
    },
    _initVars: function (maxLevel, maxCol, maxRow, unitSize) {
        this._maxLevel = maxLevel;
        this._maxCol = maxCol;
        this._maxRow = maxRow;
        /** @type {cc.Size} */
        this._unitSize = unitSize;

        /** @type {[XFlightHistoryUnitNode]} */
        this._unitArr = [];

        /** @type {[cc.Point]} */
        this._unitPosArr = [];
    },
    _init: function (unitUI, maxLevel) {
        for (var row = 0; row < this._maxRow; row++) {
            for (var col = 0; col < this._maxCol; col++) {
                var unitPos = cc.p(col * this._unitSize.width, -(row * this._unitSize.height));

                var unitIndex = row * this._maxCol + col;

                this._unitPosArr[unitIndex] = unitPos;
                this._unitArr[unitIndex] = new XFlightHistoryUnitNode(unitUI, maxLevel);
                this.addChild(this._unitArr[unitIndex]);
                this._unitArr[unitIndex].reset();
                this._unitArr[unitIndex].setPosition(unitPos);
            }
        }
    },

    // 게임 입장 후, 데이터 초기화
    initHistoryData: function (dataArr) {
        // { level : 2, value : 1.25 } <-- 배열 형태로.

        if (cc.isArray(dataArr) === false)
            cc.error("Param dataArr should be Array.");

        for (var i = 0; i < dataArr.length; i++) {
            // 여러번 하면 퍼포먼스가 안좋아지나?
            this.addHistory(dataArr[i].level, dataArr[i].value);
        }
    },

    // On Play.
    _updateHistory: function () {
        for (var i = 0; i < this._unitArr.length; i++) {
            // Remove units out of bound.
            if (i >= this._maxCol * this._maxRow) {
                this._removeUnit(this._unitArr[i]);
                continue;
            }

            // Reset unit's position.
            this._unitArr[i].setPosition(this._unitPosArr[i]);
        }

        // Reset Array length.
        this._unitArr.length = this._maxRow * this._maxCol;
    },

    // Setter
    setHistoryData: function (index, level, value) {
        if (cc.isNumber(index) === false)
            return;

        this._unitArr[index].setLevel(level);
        this._unitArr[index].setString(value);
    },
    addHistory: function(level, value){
        // Set InPlay Unit to normal unit.
        this._unitArr[0].setLevel(level);
        this._unitArr[0].setString(value);

        // Create new Unit & push forward.
        var newUnit = new XFlightHistoryUnitNode(resSlot213.XFlightNotiHistoryUI, 7);
        this.addChild(newUnit);
        newUnit.setPlay();
        this._unitArr.unshift(newUnit);

        // Update Units
        this._updateHistory();
    },

    // Actions (inProgress)
    insertUnitPlay: function () {
        // Get Last Unit Level of each row.
        var lastUnitLevel = [];
        for (var row = 0; row < this._maxRow; row++) {
            var lastRowUnitIndex = row * this._maxCol + this._maxCol - 1;
            lastUnitLevel.push(this._unitArr[lastRowUnitIndex].getLevel());
        }

        // Move rows.
        for (var r = 0; r < this._maxRow; r++) {
            this._moveSingleRow(r, lastUnitLevel[r - 1] || -1);
        }
    },
    changeUnitLevel: function (index, level) {
        this._unitArr[index].setLevel(level);
    },
    _moveSingleRow: function (row, newUnitLevel) {
        var nextUnitArr = [];

        // Create New Unit for first element.
        /** @type {XFlightHistoryUnitNode} */
        var newUnit = new XFlightHistoryUnitNode("990NotiMultipleHistoryUI.ExportJson", 7);
        this.addChild(newUnit);
        newUnit.setLevel(newUnitLevel);
        newUnit.setPosition(this._unitPosArr[this._maxCol * row]);
        newUnit.fadeIn(0.5, null);
        nextUnitArr[this._maxCol * row] = newUnit;

        // Move Units.
        for (var col = 0; col < this._maxCol; col++) {
            var index = row * this._maxCol + col;
            var currPos = this._unitArr[index].getPosition();
            var nextPos = cc.p(currPos.x + this._unitSize.width, currPos.y);

            var sequence = [];
            var spawnAction = [
                cc.moveTo(0.5, nextPos)
            ];
            if (col === this._maxCol - 1)
                spawnAction.push(cc.callFunc(this._fadeOutUnit.bind(this, this._unitArr[index], 0.5), this));
            else
                nextUnitArr[index + 1] = this._unitArr[index];

            sequence.push(cc.spawn(spawnAction));

            this._unitArr[index].runAction(cc.sequence(sequence));
        }

        // Set Element of Units after move.
        for (var i = 0; i < nextUnitArr.length; i++) {
            if (!!nextUnitArr[i])
                this._unitArr[i] = nextUnitArr[i];
        }
    },
    _fadeOutUnit: function (unit, duration) {
        unit.fadeOut(duration, this._removeUnit.bind(this, unit));
    },
    _removeUnit: function (unit) {
        unit.removeFromParent();
    },
});

var XFLIGHT_UNIT_LEVEL = {
    IN_PLAY: -1,
};
var XFlightHistoryUnitNode = cc.Node.extend({
    /** @constructs */
    ctor: function (ui, maxLevel) {
        this._super();
        this._initVars(maxLevel);
        this._init(ui);
    },
    _initVars: function (maxLevel) {
        this._maxLevel = maxLevel;
        this._currLevel = -1;
        /** @type {cc.Node & ccui.ImageView} */
        this._currImg = null;

        /** @type {cc.Node & ccui.Widget} */
        this._ui = null;
        /** @type {cc.Node & cc.LabelTTF} */
        this._lbMultiNum = null;
        /** @type {cc.Node & ccui.ImageView} */
        this._imgInPlay = null;
        /** @type {[cc.Node & ccui.ImageView]} */
        this._imgLevelsArr = [];
    },
    _init: function (ui) {
        // init ui file.
        this._ui = ccs.uiReader.widgetFromJsonFile(ui);
        this._ui.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(this._ui);

        // set baseimgs visible
        ccui.helper.seekWidgetByName(this._ui, "pnMultiGroup").setVisible(true);

        // init base levels
        for (var i = 0; i < this._maxLevel; i++) {
            this._imgLevelsArr[i] = ccui.helper.seekWidgetByName(this._ui, "imgMultiBase" + i);
            this._imgLevelsArr[i].setVisible(false);
        }

        // init img inPlay
        this._imgInPlay = ccui.helper.seekWidgetByName(this._ui, "imgInPlay");
        this._imgInPlay.setVisible(false);

        // initLabel
        this._lbMultiNum = ccui.helper.seekWidgetByName(this._ui, "lbMultiNum");
        this._lbMultiNum.setString("");
    },

    reset: function () {
        this._currLevel = -1;
        this._currImg = null;
        this._imgInPlay.setVisible(false);
        this._lbMultiNum.setString("");
        for (var i = 0; i < this._imgLevelsArr.length; i++) {
            this._imgLevelsArr[i].setVisible(false);
        }
    },

    setLevel: function (level) {
        if (level > this._imgLevelsArr.length - 1)
            cc.error("Level is out of bound.");

        if (level === XFLIGHT_UNIT_LEVEL.IN_PLAY) {
            this.setPlay();
            return;
        }

        this.reset();
        this._currLevel = level;
        this._currImg = this._imgLevelsArr[level];
        this._imgLevelsArr[level].setVisible(true);
    },
    setPlay: function () {
        this.reset();
        this._currLevel = XFLIGHT_UNIT_LEVEL.IN_PLAY;
        this._currImg = this._imgInPlay;
        this._imgInPlay.setVisible(true);
    },
    setString: function (val) {
        this._lbMultiNum.setVisible(true);
        this._lbMultiNum.setString(val.toString());
    },

    fadeOut: function (duration, cb) {
        this._currImg.setOpacity(255);
        if (cc.isFunction(cb))
            this._currImg.runAction(cc.sequence(cc.fadeOut(duration), cc.callFunc(cb)));
        else
            this._currImg.runAction(cc.fadeOut(duration));
    },
    fadeIn: function (duration, cb) {
        this._currImg.setOpacity(0);
        if (cc.isFunction(cb))
            this._currImg.runAction(cc.sequence(cc.fadeIn(duration), cc.callFunc(cb)));
        else
            this._currImg.runAction(cc.fadeIn(duration));
    },

    // Getter
    getLevel: function () {
        return this._currLevel;
    },

    // Utils
    _fadeOutAfter: function () {
        this.removeFromParent();
    },
});