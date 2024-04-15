var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UIPageView = Genie.Component.InspectorBase.extend({
    ctor: function () {
        this._super();
        this.setName(Genie.ComponentName.UI_PAGE_VIEW);
    },
});