var Genie = Genie || {};

Genie.LayoutController = {
    logLineDragStart : false,

    startLogLineDrag : function () {
        this.logLineDragStart = true;
    },

    isLogLineDrag : function () {
        return this.logLineDragStart;
    },

    endLogLineDrag : function () {
        this.logLineDragStart = false;
    }
}