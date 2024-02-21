Genie.Component.Popup = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "Popup" );
    },

    onEnter : function() {
        this._super();
        this.getOwner().setVisible( false );
    },

    showPopup : function() {
        var owner = this.getOwner();
        var uiFileName = this.input_uiName.value;
        var arFileName = this.input_arName.value;

        if( this.ar ) {
            this.ar.removeFromParent();
            this.ar = null;
        }
        this.ar = Genie.ARUtil.createAR( arFileName );
        owner.addChild( this.ar );

        if( this.uiRoot ) {
            this.uiRoot.removeFromParent();
            this.uiRoot = null;
        }

        this.uiRoot = ccs.uiReader.widgetFromJsonFile( uiFileName );
        this.uiRoot.setAnchorPoint( 0.5, 0.5 );
        owner.addChild( this.uiRoot );

        var dl = 0.3;

        owner.setScale(0.1);
        owner.runAction( cc.sequence(
            cc.show(),
            cc.scaleTo( dl, 1.0, 1.0 ).easing( cc.easeBackInOut() )
        ));

        Genie.ARUtil.playOnceAndLoop( this.ar, this.openTrack, this.openTrack );

    },

    hidePopup : function() {
        var owner = this.getOwner();
        owner.setVisible( false );
    },

    checkValid : function() {
        return true;
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
        this.rootDiv = rootDiv;

        this.input_uiName = HtmlHelper.createOneLongTextInput( rootDiv, "UIFileName", "", false, this.onchange.bind(this));
        this.input_arName = HtmlHelper.createOneLongTextInput( rootDiv, "ARFileName", "", false, this.onchange.bind(this));

        this.input_uiName.ondrop = this.onDrop.bind(this);
        this.input_arName.ondrop = this.onDrop.bind(this);

        this.btn_show = HtmlHelper.createIconButton( rootDiv, {
            className : 'fa-solid fa-eye',
        }, this.onclick.bind(this) );

        this.btn_hide = HtmlHelper.createIconButton( rootDiv, {
            className : 'fa-solid fa-eye-slash',
        }, this.onclick.bind(this) )


        this.div_arGroup = null;
        this.moveNames   = null;
        this.openTrack   = null;
        this.loopTrack   = null;
        this.ar          = null;
        this.uiRoot      = null;
    },

    refreshARGroup : function() {
        if( this.div_arGroup ) {
            this.div_arGroup.remove();
            this.div_arGroup = null;
        }

        this.div_arGroup =  HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_arGroup, "AR initialize", "component_groupTitleLabel" );

        var i, arrOption = [];
        for( i = 0; i < this.moveNames.length; ++i ) {
            arrOption.push( this.moveNames[i] );
        }

        this.openTrack = this.moveNames[0];
        this.loopTrack = this.moveNames[0];

        this.select_openTrack = HtmlHelper.createSelectMenuAttrib( this.div_arGroup, "openTrack", this.moveNames[0], arrOption, this.onchange.bind(this) );
        this.select_loopTrack = HtmlHelper.createSelectMenuAttrib( this.div_arGroup, "loopTrack", this.moveNames[0], arrOption, this.onchange.bind(this) );
    },

    refreshUIGroup : function() {
        this.div_uiGroup =  HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_uiGroup, "UI initialize", "component_groupTitleLabel" );
    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        // var loc_src, loc_dest, loc_strProp;
        var checkValid = true;
        var strValue = event.target.value;

        switch ( event.target ) {
            case this.select_openTrack:
                this.openTrack = strValue;
                break;
            case this.select_loopTrack:
                this.loopTrack = strValue;
                break;
            default:
                checkValid = false;
                break;
        }

        // if( checkValid ) {
        //     cc.log("UIImageView Component onchange : ", loc_src, loc_dest );
        //     Genie.ToolController.execute( new Genie.Command.UIImageView( owner, {
        //         strProp : loc_strProp,
        //         src     : loc_src,
        //         dest    : loc_dest
        //     } ) );
        // }
    },

    onclick : function( event ) {
        switch ( event.target ) {
            case this.btn_show:
                this.showPopup();
                break;
            case this.btn_hide:
                this.hidePopup();
                break;
        }
    },

    onDrop : function( event ) {
        var owner       = this.getOwner();
        var fileType;
        var assetName   = event.dataTransfer.getData( "assetName" );
        var checkValid  = true;

        switch ( event.target ) {
            case this.input_uiName:
                fileType = Genie.Utils.getFileTypeFromExportJson( assetName );
                if( fileType === Genie.ToolFileType.UIFile ) {
                    this.input_uiName.value = assetName;
                    this.refreshUIGroup();
                }
                break;
            case this.input_arName:
                fileType = Genie.Utils.getFileTypeFromExportJson( assetName );
                if( fileType === Genie.ToolFileType.ARMATURE ) {
                    this.input_arName.value = assetName;
                    this.moveNames = Genie.Utils.getMovNamesFromExportJson( assetName );
                    this.refreshARGroup();
                }
                else {
                    checkValid = false;
                }
                break;
            default:
                break;
        }

        event.preventDefault();
    },

    // setInspectorValue : function( paramObj ) {
    //     var strProp = paramObj.args.strProp;
    //     var value   = paramObj.value;
    //
    //     switch ( strProp ) {
    //         case 'ignoreSize':
    //             this.cb_ignoreSize.checked = value;
    //             this.refreshAttribute();
    //             break;
    //         case 'texFileName':
    //             this.input_texFileName.value = value;
    //             this.refreshAttribute();
    //             break;
    //
    //     }
    //
    // },
});
