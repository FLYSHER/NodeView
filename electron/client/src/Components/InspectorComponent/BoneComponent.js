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

    },

    drawBoneData : function( rootDiv ) {
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "BoneData", "component_groupTitleLabel" );

        // name, parentName, bonedataTransform, displayDataList
        var boneData = this.getOwner().getBoneData();
        HtmlHelper.createOneLongTextInput( div_group, 'name', boneData.name, true );
        HtmlHelper.createOneLongTextInput( div_group, 'parentName', boneData.parentName, true );
        HtmlHelper.createLabel( div_group, "displayManager", "component_longPropertyLabel" );
    },

    drawDisplayManager : function( rootDiv ) {
        var currDisplayIndex = this.getOwner().getDisplayManager().getCurrentDisplayIndex();
        if( currDisplayIndex < 0 ) {
            return;
        }

        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "DisplayManager", "component_groupTitleLabel" );


        var decoDisplayList = this.getOwner().getDisplayManager().getDecorativeDisplayList();

        var i, displayData, placeholder, skinArray = [];
        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            skinArray.push( "(" + i + ") " + displayData.displayName );
            if( i === currDisplayIndex ) {
                placeholder = displayData.displayName;
            }
        }

        HtmlHelper.createSelectMenuAttrib( div_group, 'decoDisplayList', placeholder, skinArray, this.onchange.bind(this) );

    },

    drawDecorativeDisplay : function( rootDiv, decoDisplay ) {
        if( !decoDisplay ) {
            return;
        }

        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "DecorativeDisplay", "component_groupTitleLabel" );

        var displayType = decoDisplay.getDisplayData().displayType;
        var displayTypeNames = [
            "ccs.DISPLAY_TYPE_SPRITE",
            "ccs.DISPLAY_TYPE_ARMATURE",
            "ccs.DISPLAY_TYPE_PARTICLE",
        ]
        HtmlHelper.createOneLongTextInput( div_group, "displayData.type", displayTypeNames[displayType], true );
    },

    setInspectorValue : function( paramObj ) {},

    onchange : function( event ) {

    }
});
