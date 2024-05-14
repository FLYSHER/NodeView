var Genie = Genie || {};

Genie.LayoutController = {
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

    startInspectorLineDragStart : function () {
        this.inspectorLineDragStart = true;
    },

    isInspectorLineDragStart : function () {
        return this.inspectorLineDragStart;
    },

    endInspectorLineDragStart : function () {
        this.inspectorLineDragStart = false;
    },
}