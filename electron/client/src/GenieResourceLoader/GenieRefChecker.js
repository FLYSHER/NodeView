var Genie = Genie || {};

// 파일 레퍼런스 체커
Genie.RefChecker = {
    _ref : {},

    /**
     * increase file ref.
     * @param fileName{string}
     * @returns {Genie.RefChecker}
     */
    increase : function (fileName) {
        if (this._ref.hasOwnProperty(fileName)) {
            this._ref[fileName] += 1;
        } else {
            this._ref[fileName] = 1;
        }
        return this;
    },

    /**
     * decrease file ref.
     * @param fileName{string}
     * @returns {Genie.RefChecker}
     */
    decrease : function (fileName) {
        if (this._ref.hasOwnProperty(fileName)) {
            this._ref[fileName] -= 1;

            if (this._ref[fileName] <= 0) {
                this._ref[fileName] = 0;
                // todo broadcast or do something;
            }
        } else {
            throw new Error('[Genie RefChecker] decrease ref error');
        }
        return this;
    },

    /**
     * clear ref object
     * @returns {Genie.RefChecker}
     */
    clear : function () {
        this._ref = {};
        return this;
    },

    /**
     * Get reference count of file.
     * @param fileName{string}
     * @returns {number}
     */
    getRefCount : function (fileName) {
        if (this._ref.hasOwnProperty(fileName)) {
            return Number(this._ref[fileName]);
        }
        return 0;
    },

    /**
     * Can the file be removed.
     * @param fileName{string}
     * @returns {boolean}
     */
    canRemove : function (fileName) {
        if (this._ref.hasOwnProperty(fileName)) {
            return Number(this._ref[fileName]) <= 0;
        }
        return true;
    },

    /**
     * return filename can be removed array
     * @returns {string[]}
     */
    getRemoveFileList : function () {
        return Object.entries(this._ref)
            .filter(([fileName, refCount]) => refCount === 0)
            .map((arr) => arr[0]);
    }
};