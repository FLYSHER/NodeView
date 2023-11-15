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

        this.drawBoneData( rootDiv );
        this.drawDisplayManager( rootDiv );

        // var bone = owner;
        // var currDisplayIndex = bone.getDisplayManager().getCurrentDisplayIndex();
        //
        // var decoDisplayList = bone.getDisplayManager().getDecorativeDisplayList();
        // var i, displayData,
        //     skinArray = [];
        //
        // for( i = 0; i < decoDisplayList.length; ++i ) {
        //     displayData = decoDisplayList[i].getDisplayData();
        //     skinArray.push( "(" + i + ") " + displayData.displayName );
        // }
        //
        // if( currDisplayIndex > -1 ) {
        //     var placeHolder = "(" + currDisplayIndex + ") " + decoDisplayList[currDisplayIndex].getDisplayData().displayName;
        //
        //     HtmlHelper.createLabel( rootDiv, "skinIndex", "component_lineLabel");
        //
        //     HtmlHelper.createSelectMenu( rootDiv, placeHolder, skinArray, function( event ) {
        //         bone.changeDisplayWithIndex( event.target.value, true );
        //     });
        // }

    },

    drawBoneData : function( rootDiv ) {
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "BoneData", "component_groupTitleLabel" );

        // name, parentName, bonedataTransform, displayDataList
        var boneData = this.getOwner().getBoneData();
        HtmlHelper.createOneLongTextInput( rootDiv, 'name', boneData.name, true );
        HtmlHelper.createOneLongTextInput( rootDiv, 'parentName', boneData.parentName, true );
    },

    drawDisplayManager : function( rootDiv ) {
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "DisplayManager", "component_groupTitleLabel" );

        var currDisplayIndex = this.getOwner().getDisplayManager().getCurrentDisplayIndex();
        var decoDisplayList = this.getOwner().getDisplayManager().getDecorativeDisplayList();

        var i, displayData, placeholder, skinArray = [];
        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            skinArray.push( "(" + i + ") " + displayData.displayName );
            if( i === currDisplayIndex ) {
                placeholder = displayData.displayName;
            }
        }

        HtmlHelper.createSelectMenuAttrib( div_group, 'decoDisplay', placeholder, skinArray, this.onchange.bind(this) );

    },

    drawDecorativeDisplay : function() {
        // display , displayData, collider

    },

    setInspectorValue : function( paramObj ) {},

    onchange : function( event ) {

    }
});
