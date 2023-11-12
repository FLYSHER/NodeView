
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
        select.display = "inline";
        parent.appendChild( select );

        var i, option;

        // place holder
        option = document.createElement('option');
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

    // inspector
    createComponentRootDiv : function() {
        var div_comp = document.createElement('div');
        div_comp.className = "inspector_component";
        div_comp.style.backgroundColor = '#363636';
        div_comp.style.padding = "2px";
        div_comp.style.marginTop = "5px";
        $(`#inspector`).append( div_comp );

        return div_comp;
    },

    createComponentBar : function( componentName, iconObj ) {
        var div_comp = document.createElement('div');
        div_comp.style.display = 'block';
        div_comp.style.backgroundColor = "#555555";
        div_comp.style.border   = 'solid 2px #151515FF';
        // div_comp.style.padding  = '5px';


        var icon = document.createElement( 'i' );
        icon.className  = iconObj.className;
        icon.style      = iconObj.style;
        div_comp.appendChild( icon );

        var label = document.createElement('span');
        label.style.color = '#dbdbdb';
        label.innerText =  componentName;
        div_comp.appendChild( label );

        return div_comp;
    },

    // component view
    createOnePropertyTextInput : function( parent, propertyName, placeholder, readonly, onchange  ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_onePropertyLabel');
        return HtmlHelper.createTextInput( div, placeholder, 'component_longTextInput', readonly, onchange );
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

        HtmlHelper.createLabel( div, "width", "component_attribSizeLabel");
        resultObj.width = HtmlHelper.createTextInput( div, arrPlaceholder[0], "component_shortTextInput", arrReadOnly[0], onchange );

        HtmlHelper.createLabel( div, "height", "component_attribSizeLabel");
        resultObj.height = HtmlHelper.createTextInput( div, arrPlaceholder[1], "component_shortTextInput", arrReadOnly[1], onchange );

        return resultObj;
    },

    createCheckboxAttrib : function( parent, propertyName, checked, readyonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, "component_onePropertyLabel" );
        return HtmlHelper.createCheckbox( div, "", checked, readyonly, onchange );
    },

    createColorAttrib : function( parent, propertyName, placeholder, onchange) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_onePropertyLabel');
        return HtmlHelper.createColorInput( div, placeholder, 'component_shortTextInput',  onchange );
    },

    createSelectMenuAttrib : function( parent, propertyName, strPlaceHolder, arrOption, onchange  ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_onePropertyLabel');
        HtmlHelper.createSelectMenu( div, strPlaceHolder, arrOption, onchange );
    },
}