// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UIButtonView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_BUTTON );
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        this.rootDiv = rootDiv;
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var normalTexSize = owner.getNormalTextureSize();
        this.el_texsize     = HtmlHelper.createSizeAttrib( rootDiv, "_normalTexSize", [normalTexSize.width, normalTexSize.height], [true, true ] );
        this.el_pressAction = HtmlHelper.createCheckboxAttrib( rootDiv, "pressAction", owner.pressedActionEnabled, false, this.onchange.bind(this) );
        this.el_zoomScale   = HtmlHelper.createOneShortTextInput( rootDiv, "zoomScale", owner.getZoomScale(), false, this.onchange.bind(this));
        this.el_enable9scale= HtmlHelper.createCheckboxAttrib( rootDiv, "scale9Enabled", owner._scale9Enabled, true, this.onchange.bind(this) );

        this.el_texNormal = HtmlHelper.createLongInputAndIconButton( rootDiv, 'normalFileName', owner._clickedFileName, false,{className : "fa-solid fa-eye"});
        this.el_texNormal.el_input.ondrop = this.onDrop.bind(this);
        this.el_texNormal.el_input.onclick= this.onclick.bind(this);
        this.el_texNormal.el_button.onclick = this.onclick.bind(this);

        this.el_texClicked = HtmlHelper.createLongInputAndIconButton( rootDiv, 'clickedFileName', owner._clickedFileName, false,{className : "fa-solid fa-eye"});
        this.el_texClicked.el_input.ondrop = this.onDrop.bind(this);
        this.el_texClicked.el_input.onclick= this.onclick.bind(this);
        this.el_texClicked.el_input.onchange = this.onchangeTexStateInput.bind(this);
        this.el_texClicked.el_button.onclick = this.onclick.bind(this);


        this.el_texDisabled = HtmlHelper.createLongInputAndIconButton( rootDiv, 'disabledFileName', owner._disabledFileName, false,{className : "fa-solid fa-eye"});
        this.el_texDisabled.el_input.ondrop = this.onDrop.bind(this);
        this.el_texDisabled.el_input.onclick= this.onclick.bind(this);
        this.el_texDisabled.el_button.onclick = this.onclick.bind(this);

        // sprite group
        HtmlHelper.createScale9RendererGroup( rootDiv, owner.getVirtualRenderer(), this.onchange_render.bind(this) );
    },

    refreshButtonAttrib : function() {
        this.el_pressAction.checked = this.getOwner().pressedActionEnabled;
        this.el_zoomScale.value     = this.getOwner().getZoomScale();
    },

    refreshStateTextures : function() {
        this.el_texNormal.el_input.value  = this.getOwner()._normalFileName;
        this.el_texClicked.el_input.value = this.getOwner()._clickedFileName;
        this.el_texDisabled.el_input.value= this.getOwner()._disabledFileName;
    },


    onchange : function( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.el_pressAction:
                var checked = event.target.checked;
                Genie.CommandManager.execute( new Genie.Command.UIButtonPressAction( owner, {
                    src     : owner.pressedActionEnabled,
                    dest    : checked
                }) );
                break;
            case this.el_enable9scale:
                var zoomScale = parseFloat( event.target.value ).toFixed(2);
                if( cc.isNumber( zoomScale ) ) {
                    Genie.CommandManager.execute( new Genie.Command.UIButtonZoomScale( owner, {
                        src     : owner.getZoomScale(),
                        dest    : zoomScale
                    }) );
                }
                break;
        }
    },

    onchangeTexStateInput : function( event ) {
        var ok, currSprName, spriteFrame,
            owner           = this.getOwner(),
            targetSprName   = event.target.value;

        switch ( event.target ) {
            case this.el_texClicked.el_input:
               currSprName     = this.getOwner()._clickedFileName;
               targetSprName   = event.target.value;
               spriteFrame     = cc.spriteFrameCache.getSpriteFrame( targetSprName );

                ok = (currSprName !== targetSprName);
                ok = ok && ( targetSprName.length === 0 || spriteFrame );

                if( ok ) {
                    Genie.CommandManager.execute( new Genie.Command.UIButtonTextures( owner, {
                        strState: Genie.UIButtonState.CLICKED,
                        src     : currSprName,
                        dest    : targetSprName
                    }) );
                }
                else {
                    event.target.value = currSprName;
                }
                break;
        }
    },

    onDrop : function( event ) {
        var strState, validCheck = true,
            owner   = this.getOwner(),
            currName= event.target.value,
            sprName = event.dataTransfer.getData("assetName");

        switch ( event.target ) {
            case this.el_texNormal.el_input:
                strState = Genie.UIButtonState.NORMAL;
                break;
            case this.el_texClicked.el_input:
                strState = Genie.UIButtonState.CLICKED;
                break;
            case this.el_texDisabled.el_input:
                strState = Genie.UIButtonState.DISABLED;
                break;
            default:
                validCheck = false;
                break;
        }

        if( validCheck ) {
            if( currName !== sprName ) {
                Genie.CommandManager.execute( new Genie.Command.UIButtonTextures( owner, {
                    strState: strState,
                    src     : currName,
                    dest    : sprName
                }) );
            }
        }
        event.preventDefault();
    },

    onclick : function( event ) {
        switch ( event.target ) {
            case this.el_texNormal.el_input:
            case this.el_texClicked.el_input:
            case this.el_texDisabled.el_input:
                var searchString = event.target.value;
                Renderer_assets.findAssetFromOtherArea( searchString );
                break;
            case this.el_texNormal.el_button:
                this.getOwner()._onPressStateChangedToNormal();
                break;
            case this.el_texClicked.el_button:
                this.getOwner()._onPressStateChangedToPressed();
                break;
            case this.el_texDisabled.el_button:
                this.getOwner()._onPressStateChangedToDisabled();
                break;

        }
    },

    onchange_render : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;
    },



});
