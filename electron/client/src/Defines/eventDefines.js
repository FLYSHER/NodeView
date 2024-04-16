// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var EVT = EVT || {};

EVT.MAIN_VIEW = {
    CREATE_UI_NODE  : "evt.cocos.createUINode",
    CREATE_AR_NODE  : "evt.cocos.createARNode",
    DELETE_NODE     : "evt.cocos.deleteNode",
}

EVT.TOOL = {
    SELECT_NODE     : "evt.tool.selectNode",
}

EVT.COMMAND_LOG = {
    EXECUTE : "evt.command_log.execute",
    UNDO    : "evt.command_log.undo",
    REDO    : "evt.command_log.redo",
}