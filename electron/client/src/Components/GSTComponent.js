var GST = GST || {};
GST.Component = GST.Component || {};
GST.Component.Base = cc.Component.extend({
    ctor : function () {
        this._super();
    },

    onEnter : function () {
        this._super();
    },

    // 인스펙터에 그리고 싶으면 한다.
    drawInspector : function() {
        throw Error('Do Override ');
    },
});