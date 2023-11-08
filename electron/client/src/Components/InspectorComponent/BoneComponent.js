// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.BoneView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName('BoneView');
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof ccs.Bone;
        return ok;
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var bone = owner;
        var currDisplayIndex = bone.getDisplayManager().getCurrentDisplayIndex();

        var decoDisplayList = bone.getDisplayManager().getDecorativeDisplayList();
        var i, displayData,
            skinArray = [];

        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            skinArray.push( "(" + i + ") " + displayData.displayName );
        }

        if( currDisplayIndex > -1 ) {
            var placeHolder = "(" + currDisplayIndex + ") " + decoDisplayList[currDisplayIndex].getDisplayData().displayName;

            HtmlHelper.createLabel( rootDiv, "skinIndex", "component_lineLabel");

            HtmlHelper.createSelectMenu( rootDiv, placeHolder, skinArray, function( event ) {
                bone.changeDisplayWithIndex( event.target.value, true );
            });
        }

    },
});
