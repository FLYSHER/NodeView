Genie.Component.Popup = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( Genie.ComponentName.POPUP );

        this.uiFileName = '';
        this.arFileName = '';
        this.div_arGroup = null;
        this.moveNames   = null;
        this.openTrack   = null;
        this.loopTrack   = null;
        this.ar          = null;
        this.uiRoot      = null;
    },

    onEnter : function () {
        this._super();
        // 화면 가운데 배치
        var owner = this.getOwner(),
            loc_src = cc.p( Math.round(owner.x), Math.round(owner.y)),
            loc_dest = cc.p( Math.round(cc.view.getVisibleSize().width / 2), Math.round(cc.view.getVisibleSize().height / 2));

        Genie.CommandManager.execute(new Genie.Command.TransformPosition(owner, { src: loc_src, dest: loc_dest }));
        owner.setVisible( false );
    },

    showPopup : function () {
        // 기존에 있던 것 숨김
        this.hidePopup();

        // 초기화
        this.initPopup();

        // 보여주기
        this.getOwner().setVisible( true );
        Genie.ARUtil.playOnceAndLoop( this.ar, this.openTrack, this.loopTrack );

    },

    initPopup : function () {
        const owner = this.getOwner();
        const uiFileName = this.uiFileName;
        const arFileName = this.arFileName;

        if ( this.checkerAR ) {
            if( this.ar ) {
                this.ar.removeFromParent();
                this.ar = null;
            }
            this.ar = Genie.ARUtil.createAR( arFileName );
            owner.addChild( this.ar );
        }

        if ( this.checkerUI ) {
            if( this.uiRoot ) {
                this.uiRoot.removeFromParent();
                this.uiRoot = null;
            }

            this.uiRoot = ccs.uiReader.widgetFromJsonFile( uiFileName );
            this.uiRoot.setAnchorPoint( 0.5, 0.5 );
            owner.addChild( this.uiRoot );
        }
    },

    hidePopup : function () {
        var owner = this.getOwner();
        owner.setVisible( false );
    },

    checkValid : function () {
        return true;
    },

    //override
    drawInspector : function () {
        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );
        this.rootDiv = rootDiv;

        this.input_uiName = HtmlHelper.createOneLongTextInput( rootDiv, "UIFileName", this.uiFileName, false, this.onchangeFile.bind(this));
        this.input_arName = HtmlHelper.createOneLongTextInput( rootDiv, "ARFileName", this.arFileName, false, this.onchangeFile.bind(this));

        this.input_uiName.ondrop = this.onDrop.bind(this);
        this.input_arName.ondrop = this.onDrop.bind(this);

        this.btn_show = HtmlHelper.createIconButtonAttrib( rootDiv, 'show popup', {
            className : 'fa-solid fa-eye',
        }, this.onclick.bind(this) );

        this.btn_hide = HtmlHelper.createIconButtonAttrib( rootDiv, 'hide popup', {
            className : 'fa-solid fa-eye-slash',
        }, this.onclick.bind(this) );

        this.checkerAR   = !!this.arFileName;
        this.checkerUI   = !!this.uiFileName;
        this.checkerUI && this.refreshUIGroup();
        this.checkerAR && this.refreshARGroup();
    },

    refreshARGroup : function () {
        if( this.div_arGroup ) {
            this.div_arGroup.remove();
            this.div_arGroup = null;
        }

        this.div_arGroup =  HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_arGroup, "AR initialize", "component_groupTitleLabel" );

        var i, arrOption = [];
        for( i = 0; i < this.moveNames.length; ++i ) {
            arrOption.push( this.moveNames[i] );
            if (this.moveNames[i] === 'loop') {
                this.loopTrack = 'loop';
            } else if (this.moveNames[i] === 'open') {
                this.openTrack = 'open';
            }
        }

        this.openTrack = this.openTrack ? this.openTrack : this.moveNames[0];
        this.loopTrack = this.loopTrack ? this.loopTrack : this.moveNames[0];

        this.select_openTrack = HtmlHelper.createSelectMenuAttrib( this.div_arGroup, "openTrack", this.openTrack, arrOption, this.onchangeAR.bind(this) );
        this.select_loopTrack = HtmlHelper.createSelectMenuAttrib( this.div_arGroup, "loopTrack", this.loopTrack, arrOption, this.onchangeAR.bind(this) );
    },

    refreshUIGroup : function () {
        if( this.div_uiGroup ) {
            this.div_uiGroup.remove();
            this.div_uiGroup = null;
        }

        this.div_uiGroup =  HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( this.div_uiGroup, "UI initialize", "component_groupTitleLabel" );
    },

    onchangeAR : function ( event ) {
        var trackName = event.target.options[event.target.selectedIndex].innerHTML;

        switch ( event.target ) {
            case this.select_openTrack:
                this.openTrack = trackName;
                break;
            case this.select_loopTrack:
                this.loopTrack = trackName;
                break;
            default:
                break;
        }
    },

    onchangeFile : function ( event ) {},

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

    onDrop : function ( event ) {
        var fileType;
        var assetName = event.dataTransfer.getData( "assetName" );

        switch ( event.target ) {
            case this.input_uiName:
                fileType = Genie.Utils.getFileTypeFromExportJson( assetName );
                if( fileType === Genie.ToolFileType.UIFile ) {
                    this.checkerUI = this.input_uiName.value !== assetName;
                    this.input_uiName.value = assetName;
                    this.uiFileName = assetName;
                    this.refreshUIGroup();
                }
                break;
            case this.input_arName:
                fileType = Genie.Utils.getFileTypeFromExportJson( assetName );
                if( fileType === Genie.ToolFileType.ARMATURE ) {
                    this.checkerAR = this.input_arName.value !== assetName;
                    this.input_arName.value = assetName;
                    this.arFileName = assetName;
                    this.moveNames = Genie.Utils.getMovNamesFromExportJson( assetName );
                    this.refreshARGroup();
                }
                break;
            default:
                break;
        }
        event.preventDefault();
    },
});
