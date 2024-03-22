// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.Base = cc.Component.extend({
    ctor : function () {
        this._super();
    },

    onEnter : function () {
        this._super();
    }
});

Genie.Component.InspectorBase = Genie.Component.Base.extend({
    // 인스펙터에 그리고 싶으면 한다.
    drawInspector : function() {
        throw Error('Do Override ');
    },

});