const { sentryRendererInit } = require('../../../sentryRenderer');
sentryRendererInit();

var Genie = Genie || {};

Genie.HierarchyProtectNode = cc.Node.extend({
    ctor : function() {
        this._super();
    }
});