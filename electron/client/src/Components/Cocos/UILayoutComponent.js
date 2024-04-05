var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UILayout = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_LAYOUT );
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


        this.drawClippingGroup();           // 클리핑 그룹
        this.drawBackgroundImageGroup();    // 백그라운드 이미지 그룹
        this.drawBackgroundColorGroup();    // 백그라운드 컬러 그룹
        // 레이아웃 그룹
    },

    drawClippingGroup : function() {
        var div_group = HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv');
        HtmlHelper.createLabel( div_group, "clipping", "component_groupTitleLabel" );
        var owner = this.getOwner();

        this.el_clipping = {};

        var clippingOptions = [
            'CLIPPING_STENCIL',
            'CLIPPING_SCISSOR'
        ];
        this.el_clipping.clippingType =  HtmlHelper.createSelectMenuAttrib( div_group, "clippingType", clippingOptions[owner.getClippingType()], clippingOptions, this.onchangeInClippingGroup.bind(this) );
        this.el_clipping.enabled      = HtmlHelper.createCheckboxAttrib( div_group, 'clippingEnabled', owner.isClippingEnabled(), false, this.onchangeInClippingGroup.bind(this)  );

        var clippingRect = owner._getClippingRect();
        this.el_clipping.rect_xy =  HtmlHelper.createPointAttrib( div_group, 'rect_xy', [clippingRect.x, clippingRect.y], [true, true], null );
        this.el_clipping.rect_wh =  HtmlHelper.createSizeAttrib( div_group, 'rect_wh', [clippingRect.width, clippingRect.height], [true, true], null );
    },

    drawBackgroundImageGroup : function() {
        var owner       = this.getOwner();

        var imageOpacity    = owner.getBackGroundImageOpacity(),
            imageColor      = owner.getBackGroundImageColor(),
            imageSize       = owner.getBackGroundImageTextureSize();

        var div_group = HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv');
        HtmlHelper.createLabel( div_group, "backgroundImage", "component_groupTitleLabel" );

        var texTypeOptions = [
            'LOCAL_TEXTURE',
            'PLIST_TEXTURE'
        ];
        this.el_bgImg = {};
        this.el_bgImg.texType  = HtmlHelper.createSelectMenuAttrib( div_group, "texType", texTypeOptions[0], texTypeOptions, this.onchangeInImageGroup.bind(this) );
        this.el_bgImg.fileName = HtmlHelper.createOneLongTextInput( div_group, 'fileName', '', false, this.onchangeInImageGroup.bind(this));
        this.el_bgImg.fileName.ondrop = this.onDrop.bind(this);
        this.el_bgImg.imgSize  = HtmlHelper.createSizeAttrib( div_group, 'imgTexSize', [imageSize.width, imageSize.height], [ true, true], [ true, true ], null )
        this.el_bgImg.opacity  = HtmlHelper.createOpacityAttrib( div_group, 'opacity', imageOpacity.toString(), false, this.onchangeInImageGroup.bind(this) );
        this.el_bgImg.color    = HtmlHelper.createColorAttrib( div_group, 'color', Genie.Utils.rgbToHex( imageColor ),  this.onchangeInImageGroup.bind(this) );
        this.el_bgImg.enabled  = HtmlHelper.createCheckboxAttrib( div_group, "enabled", false, false, this.onchangeInImageGroup.bind(this));
    },

    drawBackgroundColorGroup : function() {
        var owner       = this.getOwner();
        var colorType   = owner.getBackGroundColorType(),
            colorOpacity= owner.getBackGroundColorOpacity(),
            startColor  = owner.getBackGroundStartColor(),
            endColor    = owner.getBackGroundEndColor(),
            vector      = owner.getBackGroundColorVector();

        var div_group = HtmlHelper.createDiv( this.rootDiv, 'component_groupDiv');
        HtmlHelper.createLabel( div_group, "backgroundColor", "component_groupTitleLabel" );

        this.el_bgColor = {};

        var bgColorTypeOptions = [
            'BG_COLOR_NONE',
            'BG_COLOR_SOLID',
            'BG_COLOR_GRADIENT'
        ];
        this.el_bgColor.colorType = HtmlHelper.createSelectMenuAttrib( div_group, "colorType", bgColorTypeOptions[colorType], bgColorTypeOptions, this.onchangeInColorGroup.bind(this) );

        this.el_bgColor.opacityObj  = HtmlHelper.createOpacityAttrib( div_group, "opacity", colorOpacity, false, this.onchangeInColorGroup.bind(this));

        // if color type is Layout.COLOR_SOLID, set bg color
        this.el_bgColor.startColor  = HtmlHelper.createColorAttrib( div_group, "startColor", Genie.Utils.rgbToHex(startColor), this.onchangeInColorGroup.bind(this));
        this.el_bgColor.endColor    = HtmlHelper.createColorAttrib( div_group, "endColor", Genie.Utils.rgbToHex(endColor), this.onchangeInColorGroup.bind(this));

        // if color type is Layout.COLOR_GRADIENT, set vector
        this.el_bgColor.vector      = HtmlHelper.createPointAttrib( div_group, "vector", [vector.x, vector.y ], [false, false], this.onchangeInColorGroup.bind(this));

        this.setBGColorAttribByColorType( colorType );
    },

    refreshClippingAttribute : function() {
        var clippingRect = this.getOwner()._getClippingRect();
        this.el_clipping.rect_xy.x = clippingRect.x;
        this.el_clipping.rect_xy.y = clippingRect.y;
        this.el_clipping.rect_wh.width = clippingRect.width;
        this.el_clipping.rect_wh.height = clippingRect.height;
    },

    refreshBGImageAttribute : function() {
        var imageSize       = this.getOwner().getBackGroundImageTextureSize();
        this.el_bgImg.imgSize.width.value  = imageSize.width;
        this.el_bgImg.imgSize.height.value = imageSize.height;
    },

    setBGColorAttribByColorType : function( colorType ) {
        this.el_bgColor.opacityObj.slider.classList.remove('disabled');
        this.el_bgColor.opacityObj.text.classList.remove('disabled');
        this.el_bgColor.startColor.classList.remove('disabled');
        this.el_bgColor.endColor.classList.remove('disabled');
        this.el_bgColor.vector.x.classList.remove('disabled');
        this.el_bgColor.vector.y.classList.remove('disabled');

        switch ( colorType ) {
            case ccui.Layout.BG_COLOR_NONE:
                this.el_bgColor.opacityObj.slider.classList.add('disabled');
                this.el_bgColor.opacityObj.text.classList.add('disabled');
                this.el_bgColor.startColor.classList.add('disabled');
                this.el_bgColor.endColor.classList.add('disabled');
                this.el_bgColor.vector.x.classList.add('disabled');
                this.el_bgColor.vector.y.classList.add('disabled');
                break;
            case ccui.Layout.BG_COLOR_SOLID:
                this.el_bgColor.vector.x.classList.add('disabled');
                this.el_bgColor.vector.y.classList.add('disabled');
                this.el_bgColor.endColor.classList.add('disabled');
                break;
            case ccui.Layout.BG_COLOR_GRADIENT:
                break;
        }
    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.cb_ignoreSize:
                break;
            default:
                break;
        }
    },

    onchangeInClippingGroup : function( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.el_clipping.clippingType:
                var currType    = owner.getClippingType();
                var targetType  = parseInt( event.target.value );
                if( currType === targetType ) {
                    return;
                }
                Genie.CommandManager.execute( new Genie.Command.UILayoutClippingType( owner, {
                    src     : currType,
                    dest    : targetType
                }) );
                break;
            case this.el_clipping.enabled:
                var checked = event.target.checked;
                Genie.CommandManager.execute( new Genie.Command.UILayoutClippingEnabled( owner, {
                    src     : owner.isClippingEnabled(),
                    dest    : checked
                }) );
                break;
        }
    },

    onchangeInImageGroup : function( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.el_bgImg.enabled:
                var checked = this.el_bgImg.enabled.checked;
                if( checked ) {
                    var texType = parseInt( this.el_bgImg.texType.value );
                    var fileName= this.el_bgImg.fileName.value;
                    fileName = texType === ccui.Widget.LOCAL_TEXTURE ? 'image/' + fileName : fileName;
                    owner.setBackGroundImage( fileName, texType );
                    this.refreshBGImageAttribute();
                }
                else {
                    owner.removeBackGroundImage();
                    owner.visit();
                }
                break;
            case this.el_bgImg.color:
                var strHex = event.target.value;
                var color  = cc.color( strHex.slice( 1 ) );
                owner.setBackGroundImageColor( color );
                break;

            // case this.el_bgImg.opacity.text:
            case this.el_bgImg.opacity.slider:
                var opacity = parseInt(event.target.value);
                this.el_bgImg.opacity.text.value = opacity;
                owner.setBackGroundImageOpacity( opacity );
                break;
            default:
                break;
        }
    },

    onchangeInColorGroup : function( event ) {
        var owner = this.getOwner();
        switch ( event.target ) {
            case this.el_bgColor.colorType:
                var currColorType   = owner.getBackGroundColorType();
                var targetColorType = parseInt(event.target.value);
                this.setBGColorAttribByColorType( targetColorType );

                if( currColorType === targetColorType ) {
                    return;
                }

                owner.setBackGroundColorType( targetColorType );
                owner.visit();
                break;

            case this.el_bgColor.startColor:
            case this.el_bgColor.endColor:
                var strStartHex = this.el_bgColor.startColor.value;
                var startColor  = cc.color( strStartHex.slice( 1 ) );

                var strEndHex = this.el_bgColor.endColor.value;
                var endColor  = cc.color( strEndHex.slice( 1 ) );

                var colorType = owner.getBackGroundColorType();
                if( colorType === ccui.Layout.BG_COLOR_SOLID ) {
                    owner.setBackGroundColor( startColor );
                }
                else {
                    owner.setBackGroundColor( startColor, endColor );
                }
                break;

            case this.el_bgColor.opacityObj.slider:
                var opacity = parseInt( event.target.value );
                this.el_bgColor.opacityObj.text.value = event.target.value;
                owner.setBackGroundColorOpacity( opacity );
                break;

            case this.el_bgColor.vector.x:
            case this.el_bgColor.vector.y:
                var vecX = parseFloat(this.el_bgColor.vector.x.value).toFixed(1);
                var vecY = parseFloat(this.el_bgColor.vector.y.value).toFixed(1);
                owner.setBackGroundColorVector( cc.p( vecX, vecY ) );
                break;
        }
    },

    onDrop : function( event ) {
        var owner = this.getOwner();
        var sprName = event.dataTransfer.getData("assetName");
        cc.log("sprName > ", sprName );
        switch ( event.target ) {
            case this.el_bgImg.fileName:
                var currSprName =  this.el_bgImg.fileName.value;
                if( currSprName === sprName ) {
                    return;
                }
                this.el_bgImg.fileName.value = sprName;

                // var loc_strProp = "bgImage.fileName",
                //     loc_src     = currSprName,
                //     loc_dest    = sprName;
                //
                // cc.log("UILayout Component ondrop : ", loc_src, loc_dest );

                break;
        }

        event.preventDefault();
    },

});
