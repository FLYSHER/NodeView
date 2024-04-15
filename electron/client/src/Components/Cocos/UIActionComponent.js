// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UIActionView = Genie.Component.InspectorBase.extend({
    ctor : function( jsonName ) {
        this._super();
        this.setName( Genie.ComponentName.UI_ACTION_VIEW );

        this._jsonName = jsonName;
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var actionList = ccs.actionManager.getActionList( this._jsonName );

        var div_uiAction = HtmlHelper.createDiv( rootDiv, 'component_lineDiv');

        if( !actionList ||  actionList.length <= 0 ) {
            // HtmlHelper.createLabel( div_uiAction, "UIAction is Empty", "component_lineLabel" );
        }
        else {

            var i,
                arrOption = [];

            for( i = 0; i < actionList.length; ++i ) {
                arrOption.push( actionList[i].getName() );
            }

            this.select_uiAction =  HtmlHelper.createSelectMenuAttrib( rootDiv, "ui action", actionList[0].getName(), arrOption );
            this.btn_play = HtmlHelper.createIconButton( rootDiv, {
                className : 'fa-solid fa-play',
            }, this.onclick.bind(this) );

        }
    },

    onclick : function( event ) {
        switch ( event.target ) {
            case this.btn_play:
                var currIdx    = parseInt(this.select_uiAction.value);
                var actionList = ccs.actionManager.getActionList( this._jsonName );
                var actionName = actionList[ currIdx ].getName();
                ccs.actionManager.playActionByName( this._jsonName, actionName, cc.callFunc( function(){
                    // todo 종료
                }, this));
                break;
        }
    },
});
