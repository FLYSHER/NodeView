var Genie = Genie || {};

Genie.LayoutController = {
    cocosLineDragStart : false,
    logLineDragStart : false,
    HALineDragStart : false,
    inspectorLineDragStart : false,

    startLogLineDrag : function () {
        this.logLineDragStart = true;
    },

    isLogLineDrag : function () {
        return this.logLineDragStart;
    },

    endLogLineDrag : function () {
        this.logLineDragStart = false;
    },

    startHALineDrag : function () {
        this.HALineDragStart = true;
    },

    isHALineDrag : function () {
        return this.HALineDragStart;
    },

    endHALineDrag : function () {
        this.HALineDragStart = false;
    },

    startInspectorLineDrag : function () {
        this.inspectorLineDragStart = true;
    },

    isInspectorLineDrag : function () {
        return this.inspectorLineDragStart;
    },

    endInspectorLineDrag : function () {
        this.inspectorLineDragStart = false;
    },

    startCocosLineDrag : function () {
         this.cocosLineDragStart = true;
    },

    isCocosLineDrag : function () {
        return this.cocosLineDragStart;
    },

    endCocosLineDrag : function () {
        this.cocosLineDragStart = false;
    }
}