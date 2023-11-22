
var HtmlHelper = {

    createDiv : function( parent, className ) {
        var el_div = document.createElement( 'div' );
        el_div.className = className;
        parent.appendChild( el_div );
        return el_div;
    },

    createButton : function( parent, innerText, onclick ) {
        var el_button = document.createElement( 'button' );
        el_button.innerText = innerText;
        el_button.style.margin = '5px';
        el_button.addEventListener( "click", onclick );
        parent.appendChild( el_button );
        return el_button;
    },

    creatIconButton : function( parent, iconInfoObj, onclick ) {
        var button = document.createElement( 'button' );
        button.style.display = "inline";
        button.style.width = '30px';
        button.addEventListener( "click", onclick );
        parent.appendChild( button );

        var icon = document.createElement('i');
        icon.className  = iconInfoObj.className;
        icon.style      = iconInfoObj.style;
        icon.style.pointerEvents = 'none'; // 아이콘이 이벤트 먹는거 방지
        button.appendChild( icon );

        return button;
    },

    createCheckbox : function( parent, name, checked, readOnly, onchange ) {
        var el_checkbox = document.createElement('input');
        el_checkbox.type = "checkbox";
        name && ( el_checkbox.name = name );
        el_checkbox.checked = checked;
        el_checkbox.readOnly = !!readOnly;

        onchange && el_checkbox.addEventListener( "change", onchange );

        parent.appendChild( el_checkbox );

        return el_checkbox;
    },

    createLabel : function( parent, label_text, label_className ) {
        var el_label = document.createElement('label');
        el_label.className = label_className;
        el_label.innerText = label_text;
        el_label.style.margin = '2px';
        parent.appendChild(el_label);
        return el_label;
    },

    createTextInput : function( parent, placeHolder, className, readOnly, onchange ) {
        var el_input = document.createElement('input');
        el_input.type = "text";
        el_input.value = placeHolder;
        el_input.readOnly = !!readOnly;
        el_input.className = className;

        onchange && el_input.addEventListener( "change", onchange );
        parent.appendChild(el_input);
        return el_input;
    },

    createColorInput : function( parent, placeholder, className, onchange ) {
        // <label htmlFor="colorpicker">Color Picker:</label>
        // <input type="color" id="colorpicker" value="#0000ff">
        var el_input    = document.createElement( 'input' );
        el_input.type   = 'color';
        el_input.value  = placeholder;
        el_input.className = className;

        if( onchange ) {
            el_input.addEventListener( "change", onchange );
        }

        parent.appendChild(el_input);
        return el_input;
    },

    createTextField : function( parent, label_text, label_className, inputPlaceHolder, readOnly, strDisplay, onchange ) {
        var el_label = document.createElement('label');
        el_label.className = label_className;
        el_label.innerText = label_text;
        parent.appendChild(el_label);

        var el_input = document.createElement('input');
        el_input.type = "text";
        cc.isString( strDisplay ) && ( el_input.display = strDisplay );
        el_input.style.width = '50px';
        el_input.style.marginRight = '10px';
        el_input.style.marginLeft  = '5px';
        el_input.style.background  = '#222222';
        el_input.style.color      = '#dbdbdb';
        el_input.value = inputPlaceHolder;
        el_input.readOnly = !!readOnly;
        if( !readOnly && onchange ) {
            el_input.addEventListener( "change", onchange );
        }

        parent.appendChild(el_input);
        return el_input;
    },

    /**
     *
     * @param parent
     * @param attribName
     * @param placeHolder value, text;
     * @param arrOption
     * @param onchange
     */
    createSelectMenu : function( parent, strPlaceHolder, arrOption, onchange ) {
        var select = document.createElement('select');
        select.addEventListener( "change", onchange );
        select.style.display = "inline-block";
        select.style.width = '170px'
        select.style.margin = "3px";
        parent.appendChild( select );

        var i, option;

        // place holder
        option = document.createElement('option');
        option.value = 0;
        option.text  = strPlaceHolder;
        option.hidden = true;
        option.disabled = true;
        option.selected = true;
        select.appendChild( option );

        // options
        for( i = 0; i < arrOption.length; ++i ) {
            option = document.createElement('option');
            option.value = i;
            option.text  = arrOption[i];
            select.appendChild( option );
        }

        return select; // select 의 최상위 요소 리턴.
    },

    //region [ inspector util ]
    createComponentRootDiv : function() {
        var div_comp = document.createElement('div');
        div_comp.className = "inspector_component";
        div_comp.style.backgroundColor = '#363636';
        div_comp.style.padding = "2px";
        div_comp.style.marginTop = "5px";
        $(`#inspector`).append( div_comp );

        return div_comp;
    },

    createComponentBar : function( componentName, iconInfoObj ) {
        var div_comp = document.createElement('div');
        div_comp.style.display = 'block';
        div_comp.style.backgroundColor = "#555555";
        div_comp.style.border   = 'solid 2px #151515FF';
        // div_comp.style.padding  = '5px';


        var icon = document.createElement( 'i' );
        icon.className  = iconInfoObj.className;
        icon.style      = iconInfoObj.style;
        icon.style.margin = '5px';
        div_comp.appendChild( icon );

        var label = document.createElement('span');
        label.style.color = '#dbdbdb';
        label.style.margin = '5px';
        label.innerText =  componentName;
        div_comp.appendChild( label );

        return div_comp;
    },

    // component view
    createOneLongTextInput : function( parent, propertyName, placeholder, readonly, onchange  ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_longPropertyLabel');
        return HtmlHelper.createTextInput( div, placeholder, 'component_longTextInput', readonly, onchange );
    },

    createOneShortTextInput : function( parent, propertyName, placeholder, readonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_longPropertyLabel');
        return HtmlHelper.createTextInput( div, placeholder, 'component_shortTextInput', readonly, onchange );
    },

    createPointAttrib : function( parent, titleName, arrPlaceholder, arrReadOnly, onchange ) {
        var resultObj = {};
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, titleName, "component_twoPropertyLabel");

        HtmlHelper.createLabel( div, "X", "component_attribPointLabel");
        resultObj.x = HtmlHelper.createTextInput( div, arrPlaceholder[0], "component_shortTextInput", arrReadOnly[0], onchange );

        HtmlHelper.createLabel( div, "Y", "component_attribPointLabel");
        resultObj.y = HtmlHelper.createTextInput( div, arrPlaceholder[1], "component_shortTextInput", arrReadOnly[1], onchange );

        return resultObj;
    },

    createSizeAttrib : function( parent, titleName, arrPlaceholder, arrReadOnly, onchange ) {
        var resultObj = {};
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, titleName, "component_twoPropertyLabel");

        HtmlHelper.createLabel( div, "W", "component_attribSizeLabel");
        resultObj.width = HtmlHelper.createTextInput( div, arrPlaceholder[0], "component_shortTextInput", arrReadOnly[0], onchange );

        HtmlHelper.createLabel( div, "H", "component_attribSizeLabel");
        resultObj.height = HtmlHelper.createTextInput( div, arrPlaceholder[1], "component_shortTextInput", arrReadOnly[1], onchange );

        return resultObj;
    },

    createCheckboxAttrib : function( parent, propertyName, checked, readyonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, "component_longPropertyLabel" );
        return HtmlHelper.createCheckbox( div, "", checked, readyonly, onchange );
    },

    createColorAttrib : function( parent, propertyName, placeholder, onchange) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_longPropertyLabel');
        return HtmlHelper.createColorInput( div, placeholder, 'component_shortTextInput',  onchange );
    },

    createTexturePreviewAttrib : function( parent, src ) {
        var div = HtmlHelper.createDiv( parent, 'img_preview_div' );
        parent.appendChild( div );

        var img = document.createElement( 'img' );
        img.src = src;
        img.className = 'img_preview';

        img.style.clipPath = 'inset( 0px 100px 200px 0px )';
        div.appendChild( img );

        return img;
    },

    createSpritePreviewAttrib : function( parent, spriteName, textureName ) {

        var texture     = cc.textureCache.getTextureForKey( 'image/' + textureName);
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( spriteName );

        if( texture && spriteFrame ) {

            HtmlHelper.createOneLongTextInput( parent, "textureName", textureName, true );
            HtmlHelper.createOneLongTextInput( parent, "frameName", spriteName, true );

            var originSize = spriteFrame.getOriginalSize();
            HtmlHelper.createSizeAttrib( parent, "frameSize", [originSize.width, originSize.height], [true, true]);

            var div = HtmlHelper.createDiv( parent, 'img_preview_div' );
            parent.appendChild( div );

            var img_tex   = document.createElement( 'img' );
            img_tex.src       = cc.loader.getRes( textureName );
            img_tex.className = 'img_preview';
            img_tex.style.filter = 'opacity( 0.3 ) grayscale( 80% )';
            div.append( img_tex );

            var img_spr = document.createElement( 'img' );
            img_spr.src             = cc.loader.getRes( textureName );
            img_spr.className       = 'img_preview';
            img_spr.style.filter    = "brightness(2.0)"

            var texSize = texture.getContentSize();
            var sprRect = spriteFrame.getRect();
            img_spr.style.clipPath = 'inset(' +
                    ( sprRect.y / texSize.height   * 100 ).toFixed(0) + "% " +
                    ( ( texSize.width - (sprRect.x + sprRect.width) ) / texSize.width  * 100 ).toFixed(0) + "% " +
                    ( ( texSize.height - (sprRect.y + sprRect.height) ) / texSize.height * 100 ).toFixed(0) + "% " +
                    (sprRect.x / texSize.width * 100 ).toFixed(0) + "% " +
                ')';
            div.append( img_spr );
        }

        return img_spr;
    },

    createSelectMenuAttrib : function( parent, propertyName, strPlaceHolder, arrOption, onchange  ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_longPropertyLabel');
        return HtmlHelper.createSelectMenu( div, strPlaceHolder, arrOption, onchange );
    },

    // endregion

    createCommandLog : function( strLog ) {
        var textNode = document.createTextNode( strLog );
        textNode.className = "text_command_log";
        $('#div_command_log').appendChild( textNode );
    }
}