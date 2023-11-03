// 소유자의 타입이 uiWidget 이어야 함.
GST.Component.UIActionView = GST.Component.Base.extend({
    ctor : function( name, jsonName ) {
        this._super();
        this.setName( name );
        this._jsonName = jsonName;
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof  ccui.Widget;
        ok &&= cc.isString( this._jsonName );
        return ok;
    },

    //override
    drawInspector : function() {
        var rootDiv =  HtmlHelper.createComponentRootDiv("UI Action");

        var actionList = ccs.actionManager.getActionList( this._jsonName );
        if( !actionList ||  actionList.length <= 0 ) {
            var p = document.createElement('div');
            p.innerText = "not exist uiAction";
            rootDiv.appendChild( p );
        }
        else {
            var ul_ActionList = document.createElement('ul');
            rootDiv.appendChild( ul_ActionList);

            var i, actionObj, actionName, li_actionObj, btn_actionObj;
            for( i = 0; i < actionList.length; ++i ){
                actionObj   = actionList[i];
                actionName  = actionObj.getName();

                li_actionObj = document.createElement('li');
                btn_actionObj = document.createElement('button');
                btn_actionObj.innerText = actionName;
                btn_actionObj.onclick = function( jsonName, uiActionName ) {
                    ccs.actionManager.playActionByName( jsonName, uiActionName, cc.callFunc( function(){
                        // todo 종료
                    }, this));
                }.bind( this, this._jsonName, actionName );

                li_actionObj.appendChild( btn_actionObj );
                ul_ActionList.append( li_actionObj );
            }
        }
    },
});
