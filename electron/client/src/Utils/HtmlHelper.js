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

    createIconButton : function( parent, iconInfoObj, onclick ) {
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
        el_checkbox.disabled = !!readOnly;

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

    createSliderInput : function(  parent, placeHolder, min, max, className, readOnly, onchange ) {
        var el_input = document.createElement('input');
        el_input.type   = "range";
        el_input.value  = placeHolder;
        el_input.min    = min;
        el_input.max    = max;
        el_input.readOnly   = !!readOnly;
        el_input.className  = className;

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
        div_comp.style.borderBottom = 'solid 0px';

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

        const menu_container = HtmlHelper.createComponentMenu();

        const menu_icon = document.createElement('i');
        menu_icon.className = 'fa-solid fa-ellipsis-vertical';
        menu_icon.style.color = '#d0b8f4';
        menu_icon.style.margin = '5px';
        menu_icon.style.paddingRight = '10px';
        menu_icon.style.float = 'right';

        menu_icon.addEventListener('click', menu_container._onclick);

        div_comp.appendChild( menu_icon );
        div_comp.appendChild( menu_container );

        return div_comp;
    },

    createFolderItem : function(folderName, items ) {
        // li 엘리먼트 생성
        const li = document.createElement('li');
        li.style.listStyleType = 'none';
        li.style.color = "#DEDEDE";

        // 폴더 토글 버튼 (+)
        const toggleButton = document.createElement('span');
        toggleButton.classList.add('folder-toggle');
        toggleButton.textContent = '+';
        li.appendChild(toggleButton);

        // 폴더 이름
        const folderText = document.createTextNode(folderName);
        li.appendChild(folderText);

        // 하위 리스트 생성
        const sublist = document.createElement('ul');
        sublist.style.listStyleType = 'none';
        sublist.style.margin = '2px';
        sublist.classList.add('folder-sublist');

        // 하위 아이템 생성 및 추가
        items.forEach(itemName => {
            const item = document.createElement('li');
            item.textContent = itemName;
            sublist.appendChild(item);
        });
        li.appendChild(sublist);

        // 각각의 아이템에 클릭 이벤트 추가
        var listItems= sublist.getElementsByTagName('li');
        var i;
        for( i = 0; i < listItems.length; ++i ) {
            listItems[i].addEventListener('mouseover', function(){

                var selectedItems = sublist.querySelectorAll('.hover_listItem');
                selectedItems.forEach(function(selectedItem) {
                    selectedItem.classList.remove('hover_listItem');
                });
                this.classList.add('hover_listItem');
            });

            listItems[i].addEventListener('click', function(){
                console.log(this.textContent);
                var searchString = cc.path.basename(this.textContent);
                // $('#assets').jstree('search', searchString);
                Renderer_assets.findAssetFromOtherArea( searchString );


            });

        }

        // 폴더 토글 버튼 클릭 이벤트 추가
        toggleButton.addEventListener('click', function() {
            sublist.classList.toggle('folder-sublist');

            // 아이콘 변경 (+, -)
            if (sublist.classList.contains('folder-sublist')) {
                toggleButton.textContent = '+';
            } else {
                toggleButton.textContent = '-';
            }
        });

        return li;
    },

    createComponentMenu : function () {
        const menu_container = document.createElement('div');

        const menu_div = document.createElement('div');
        menu_div.id = 'menu_div';
        menu_div.style.backgroundColor = '#484848';
        menu_div.style.border = 'solid 1px #151515FF';
        menu_div.style.borderRadius = '5px';
        menu_div.style.maxHeight = '0px';
        menu_div.style.overflow = 'hidden';
        menu_div.style.transition = 'max-height 0.5s ease-out';

        const component_menu_div = document.createElement('div');
        component_menu_div.style.backgroundColor = '#6D6D6D';
        component_menu_div.style.border = 'hidden 1px #151515FF';
        component_menu_div.style.borderRadius = '5px';
        component_menu_div.style.maxHeight = '0px';
        component_menu_div.style.overflow = 'hidden';
        component_menu_div.style.transition = 'max-height 0.5s ease-out';

        const component_option_popup = HtmlHelper.createAddComponentMenuOption('Popup Component', 'Popup', () => {
            menu_div.style.maxHeight = '0px';
        });

        const component_option_empty = HtmlHelper.createAddComponentMenuOption('Empty Component', 'Empty', () => {
            menu_div.style.maxHeight = '0px';
        });

        component_menu_div.appendChild(component_option_popup);
        component_menu_div.appendChild(component_option_empty);

        const component_option_icon = document.createElement('i');
        component_option_icon.className = 'fa-solid fa-caret-right';
        component_option_icon.style.color = '#d0b8f4';
        component_option_icon.style.margin = '5px';
        component_option_icon.style.paddingRight = '10px';
        component_option_icon.style.float = 'left';

        // component Add 임시 삭제 24.03.14
        // const option_addComponent = HtmlHelper.createComponentMenuOption('Add Component', () => {
        //     component_option_icon.className = component_menu_div.style.maxHeight === '0px' ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right';
        //     component_menu_div.style.maxHeight = component_menu_div.style.maxHeight === '0px' ? '150px' : '0px';
        // });
        //
        // option_addComponent.appendChild(component_option_icon);
        // option_addComponent.appendChild(component_menu_div);

        const option_removeComponent = HtmlHelper.createComponentMenuOption('Remove this Component', () => {
            const target = Renderer_hierarchy.getTargetNode();
            const componentName = $(menu_div.parentElement.parentElement).children('span')[0].outerText;

            if (target && componentName) {
                target.removeComponent(componentName);

                // delete view at inspector
                const child = menu_div.parentElement.parentElement.parentElement;
                const parent = child.parentElement;
                parent.removeChild(child);
            } else {
                console.error('Remove component is failed');
            }
        });

        const option_moveUp = HtmlHelper.createComponentMenuOption('Move Up', () => {
            const inspector = document.getElementById('inspector');
            const components = inspector.children;
            const parent = menu_div.parentElement.parentElement.parentElement;

            $.each(components, (index, item) => {
                if (index !== 0 && item === parent) {
                    inspector.insertBefore(parent, components[index - 1]);
                    return false;
                }
            });

            menu_div.style.maxHeight = '0px';
        });

        const option_moveDown = HtmlHelper.createComponentMenuOption('Move Down', () => {
            const inspector = document.getElementById('inspector');
            const components = inspector.children;
            const parent = menu_div.parentElement.parentElement.parentElement;

            $.each(components, (index, item) => {
                if (index !== components.length - 1 && item === parent) {
                    inspector.insertBefore(components[index + 1], parent);
                    return false;
                }
            });

            menu_div.style.maxHeight = '0px';
        });

        //menu_div.appendChild( option_addComponent );
        menu_div.appendChild( option_removeComponent );
        menu_div.appendChild( option_moveUp );
        menu_div.appendChild( option_moveDown );

        menu_container.appendChild( menu_div );
        menu_container._onclick = () => { menu_div.style.maxHeight = menu_div.style.maxHeight === '0px' ? '450px' : '0px'; };

        return menu_container;
    },

    createComponentMenuOption : function (content, onclick) {
        const option = document.createElement('div');
        option.textContent = content;
        option.style.color = '#dbdbdb';
        option.style.textAlign = 'right';
        option.style.padding = '3px';
        option.style.marginRight = '10px';
        option.addEventListener('mouseenter', () => { option.style.textShadow = '1px 1px 2px pink' });
        option.addEventListener('mouseout', () => { option.style.textShadow = 'none' });
        option.addEventListener('click', onclick);

        return option;
    },

    createAddComponentMenuOption : function (content, componentName, onclick) {
        return HtmlHelper.createComponentMenuOption(content, () => {
            const target = Renderer_hierarchy.getTargetNode();
            const popupComp = new Genie.Component[componentName];
            if (target && popupComp) {
                target.addComponent(popupComp);
                popupComp.drawInspector();
            }

            onclick && onclick();
        });
    },

    // component view
    createOneLongTextInput : function( parent, propertyName, placeholder, readonly, onchange  ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel');
        return HtmlHelper.createTextInput( div, placeholder, 'component_longTextInput', readonly, onchange );
    },

    createOneShortTextInput : function( parent, propertyName, placeholder, readonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel');
        return HtmlHelper.createTextInput( div, placeholder, 'component_shortTextInput', readonly, onchange );
    },

    createPointAttrib : function( parent, titleName, arrPlaceholder, arrReadOnly, onchange ) {
        var resultObj = {};
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, titleName, "component_propertyLabel");

        HtmlHelper.createLabel( div, "X", "component_attribPointLabel");
        resultObj.x = HtmlHelper.createTextInput( div, arrPlaceholder[0], "component_shortTextInput", arrReadOnly[0], onchange );

        HtmlHelper.createLabel( div, "Y", "component_attribPointLabel");
        resultObj.y = HtmlHelper.createTextInput( div, arrPlaceholder[1], "component_shortTextInput", arrReadOnly[1], onchange );

        return resultObj;
    },

    createSizeAttrib : function( parent, titleName, arrPlaceholder, arrReadOnly, onchange ) {
        var resultObj = {};
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, titleName, "component_propertyLabel");

        HtmlHelper.createLabel( div, "W", "component_attribSizeLabel");
        resultObj.width = HtmlHelper.createTextInput( div, arrPlaceholder[0], "component_shortTextInput", arrReadOnly[0], onchange );

        HtmlHelper.createLabel( div, "H", "component_attribSizeLabel");
        resultObj.height = HtmlHelper.createTextInput( div, arrPlaceholder[1], "component_shortTextInput", arrReadOnly[1], onchange );

        return resultObj;
    },

    createCheckboxAttrib : function( parent, propertyName, checked, readonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, "component_propertyLabel" );
        return HtmlHelper.createCheckbox( div, "", checked, readonly, onchange );
    },

    createIconButtonAttrib : function ( parent, propertyName, iconInfoObj, onclick) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel' );
        var iconBtn = HtmlHelper.createIconButton( div, iconInfoObj, onclick );
        iconBtn.style.width = '60px';
        return iconBtn;
    },

    createColorAttrib : function( parent, propertyName, placeholder, onchange) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel');
        return HtmlHelper.createColorInput( div, placeholder, 'component_shortTextInput',  onchange );
    },

    createScale9RendererGroup : function( parent, scale9Renderer, change ) {
        var strRenderingType = [
            "SIMPLE",
            "SLICED"
        ]

        var div_renderer =  HtmlHelper.createDiv( parent, 'component_groupDiv' );
        HtmlHelper.createLabel( div_renderer, "Scale9Sprite", "component_groupTitleLabel" );

        HtmlHelper.createOneLongTextInput( div_renderer, "renderingType", strRenderingType[ scale9Renderer.getRenderingType() ], true );
        HtmlHelper.createSizeAttrib( div_renderer, "contentSize", [ scale9Renderer.width,  scale9Renderer.height], [true, true] );

        // texture name
        var div_sprite =  HtmlHelper.createDiv( div_renderer, 'component_groupDiv' );
        HtmlHelper.createLabel( div_sprite, "SpriteFrame", "component_groupTitleLabel" );

        var spriteFrame = scale9Renderer._spriteFrame;
        var frameName     = Object.keys(cc.spriteFrameCache._spriteFrames).find( function( key) {
            return cc.spriteFrameCache._spriteFrames[ key ] === spriteFrame;
        } )

        var textureName = Genie.Utils.getSpriteFrameTextureName( frameName);
        HtmlHelper.createSpritePreviewAttrib( div_sprite, frameName, textureName );
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
            var input_frameName = HtmlHelper.createOneLongTextInput( parent, "frameName", spriteName, true );
            input_frameName.onclick = function( event ) {
                // var searchString = event.target.value;
                // $('#assets').jstree('search', searchString);
                var searchString = event.target.value;
                Renderer_assets.findAssetFromOtherArea( searchString )
            }

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
            if( spriteFrame.isRotated() ) {
                sprRect = cc.rect( sprRect.x, sprRect.y, sprRect.height, sprRect.width );
            }
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
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel');
        return HtmlHelper.createSelectMenu( div, strPlaceHolder, arrOption, onchange );
    },

    createSliderAttrib : function( parent, propertyName, placeholder, min, max, readonly, onchange ) {
        var div = HtmlHelper.createDiv( parent, 'component_lineDiv' );
        HtmlHelper.createLabel( div, propertyName, 'component_propertyLabel');
        return HtmlHelper.createSliderInput( div, placeholder, min, max,'component_attribSlider', readonly, onchange );
    },
    // endregion

    //region [ command history ]
    createCommandLog : function( parent, groupName, strCommand, strValue ) {
        var div     = this.createDiv( parent, 'command_div' );
        this.createLabel( div, groupName, "command_groupLabel");
        this.createLabel( div, strCommand, "command_nameLabel");
        this.createLabel( div, strValue, "command_valueLabel");
        return div;
    }
    //endregion



}