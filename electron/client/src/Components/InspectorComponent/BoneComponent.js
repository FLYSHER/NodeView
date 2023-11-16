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
        this.div_compRoot = rootDiv;

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

    drawDisplayManager : function() {
        var currDisplayIndex = this.getOwner().getDisplayManager().getCurrentDisplayIndex();
        if( currDisplayIndex < 0 ) {
            return;
        }

        var rootDiv =  this.div_compRoot;

        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "DisplayManager", "component_groupTitleLabel" );

        var decoDisplayList = this.getOwner().getDisplayManager().getDecorativeDisplayList();

        HtmlHelper.createOneLongTextInput( div_group, "count", decoDisplayList.length, true );

        var i, displayData, placeholder, skinArray = [];
        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            skinArray.push( "(" + i + ") " + displayData.displayName );
            if( i === currDisplayIndex ) {
                placeholder = displayData.displayName;
            }
        }

        this.select_decoList = HtmlHelper.createSelectMenuAttrib( div_group, 'decoDisplayList', placeholder, skinArray, this.onchange.bind(this) );

        if( this.div_decoDisplay) {
            this.div_decoDisplay.remove();
            this.div_decoDisplay = null;
        }
        this.drawDecorativeDisplay();
    },

    drawDecorativeDisplay : function() {
        var decoDisplay = this.getOwner().getDisplayManager().getCurrentDecorativeDisplay();
        if( !decoDisplay ) {
            return;
        }

        var rootDiv =  this.div_compRoot;
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "DecorativeDisplay", "component_groupTitleLabel" );

        // displayData sub group
        HtmlHelper.createLabel( div_group, "displayData", 'component_subGroupLabel' );

        var displayType = decoDisplay.getDisplayData().displayType;
        var displayTypeNames = [
            "DISPLAY_TYPE_SPRITE",
            "DISPLAY_TYPE_ARMATURE",
            "DISPLAY_TYPE_PARTICLE",
        ]
        HtmlHelper.createOneLongTextInput( div_group, "   type", displayTypeNames[displayType], true );

        var display = decoDisplay.getDisplay();
        HtmlHelper.createOneLongTextInput( div_group, '   displayName', display._displayName, true );

        // display sub group
        HtmlHelper.createLabel( div_group, "display", 'component_subGroupLabel' );
        HtmlHelper.createOneLongTextInput( div_group, '   className', display._className, true );

        // skin group
        if( displayType === ccs.DISPLAY_TYPE_SPRITE ) {
            this.drawSkinDisplay( rootDiv );
        }

        this.div_decoDisplay = div_group;
    },

    drawSkinDisplay : function( rootDiv ) {
        var decoDisplay = this.getOwner().getDisplayManager().getCurrentDecorativeDisplay();
        if( !decoDisplay ) {
            return;
        }

        var display = decoDisplay.getDisplay();

        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "Skin", "component_groupTitleLabel" );

        var skinContentSize = display.getContentSize();
        HtmlHelper.createSizeAttrib( div_group, "contentSize", [skinContentSize.width, skinContentSize.height], [true, true] );
        var spriteName = display.getDisplayName();
        var textureName = Genie.Utils.getSpriteFrameTextureName( spriteName );

        HtmlHelper.createOneLongTextInput( div_group, "textureName", textureName, true  );
        HtmlHelper.createOneLongTextInput( div_group, "spriteFrame", spriteName, true  );

        HtmlHelper.createSpritePreviewAttrib( div_group, spriteName, textureName );

        this.div_groupSkin = div_group;
    },

    setInspectorValue : function( paramObj ) {},

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target ) {
            case this.select_decoList:
                value = parseInt(event.target.value); // selected index
                owner.getDisplayManager().changeDisplayWithIndex( value, true );

                if( this.div_decoDisplay) {
                    this.div_decoDisplay.remove();
                    this.div_decoDisplay = null;
                }

                if( this.div_groupSkin) {
                    this.div_groupSkin.remove();
                    this.div_groupSkin = null;
                }

                this.drawDecorativeDisplay();

                break;
        }
    }
});
