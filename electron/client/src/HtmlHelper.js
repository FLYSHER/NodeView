var HtmlHelper = {

    createTextField : function( parent, label, inputPlaceHolder, readOnly, onchange ) {
        var el_label = document.createElement('label');
        el_label.className = "component_attribName"
        el_label.innerText = label;
        el_label.style = "display: inline; padding : 0px, margin : 2px ";
        parent.appendChild(el_label);

        var el_input = document.createElement('input');
        el_input.type = "text";
        el_input.style.width = '50px';

        el_input.style.marginRight   = '10px';
        el_input.style.marginLeft   = '5px';
        el_input.value = inputPlaceHolder;
        el_input.readOnly = !!readOnly;
        if( !readOnly && onchange ) {
            el_input.addEventListener( "change", onchange );
        }

        parent.appendChild(el_input);
    },

    createComponentRootDiv : function( component_title ) {
        var rootDiv = document.createElement('div');
        rootDiv.className = 'component_root';
        $(`#inspector`).append( rootDiv );


        var title = document.createElement('p');
        title.className = 'component_title';
        title.innerText = component_title;
        rootDiv.append( title );

        return rootDiv;
    },

    /**
     *
     * @param parent
     * @param attribName
     * @param placeHolder value, text;
     * @param arrOption
     * @param onchange
     */
    createSelectMenu : function( parent, attribName, strPlaceHolder, arrOption, onchange ) {
        var label_name = document.createElement( 'label' );
        label_name.className = "component_attribName";
        label_name.innerText = attribName;
        parent.appendChild( label_name );

        var select = document.createElement('select');
        select.addEventListener( "change", onchange );
        label_name.appendChild( select );

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

        return label_name; // select 의 최상위 요소 리턴.
    },
}