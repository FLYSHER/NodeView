var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.InspectorBase = Genie.Component.Base.extend({
    // 인스펙터에 그리고 싶으면 한다.
    drawInspector : function() {
        throw Error('Do Override ');
    },
});