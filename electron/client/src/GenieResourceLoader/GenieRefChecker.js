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
            }
        } else {
            cc.warn('[Genie RefChecker] decrease ref error');
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
     * remove ref-value 0
     */
    gc : function () {
        this._ref = Object.fromEntries(Object.entries(this._ref).filter(([key, value]) => { return value !== 0; }));
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
    },

    /**
     * return fnt dependency
     * @param widgetTree
     * @returns {Set<any>}
     */
    getFntDependencyFromWidgetTree : function ( widgetTree ) {
        var result = new Set();
        this._getFntDependencyFromWidgetTree( widgetTree, result );
        return result;
    },

    _getFntDependencyFromWidgetTree : function ( widgetTree, result ) {
        var children = widgetTree['children'];
        var i, path;
        for (i = 0; i < children.length; i++) {
            if (children[i]['classname'] === 'LabelBMFont') {
                path = children[i]['options']['fileNameData']['path'];
                result.add(path.replace('image/', ''));
                result.add(path.replace('image/', '').replace('.fnt', '.png'));
            }

            if (children[i]['children'].length > 0) {
                this._getFntDependencyFromWidgetTree( children[i], result );
            }
        }
    },
};