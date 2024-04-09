// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};

Genie.ComponentName = {
    TRANSFORM       : 'component.transform',
    NODE_PROPERTY   : 'component.nodeProperty',
    UI_LAYOUT       : 'component.uiLayout',
    UI_IMAGE_VIEW   : 'component.uiImageView',
    UI_BUTTON       : 'component.uiButton',
    UI_BITMAP_FONT  : 'component.uiBMFontView',
    UI_TEXT_VIEW    : 'component.uiTextView',
    ARMATURE_VIEW   : 'component.armatureView',
    POPUP           : 'component.popup',
    CODE            : 'component.code',
}

Genie.UIButtonState = {
    NORMAL  : 'normal',
    CLICKED : 'clicked',
    DISABLED: 'disabled'
}

Genie.NodeTag = {
    GIZMO : 1000,
}