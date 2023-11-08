// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UITextView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "UITextView" );
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof  ccui.Widget;
        ok &&= cc.isString( this._jsonName );
        return ok;
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

        this.input_fontsize = HtmlHelper.createOneAttribTextInput( rootDiv, 'font size', owner.getFontSize(), false, this.onchange.bind(this) );
        this.input_fontname = HtmlHelper.createOneAttribTextInput( rootDiv, 'font name', owner.getFontName(), true, null );
        this.input_text     = HtmlHelper.createOneAttribTextInput( rootDiv, 'text', owner.getString(), false, this.onchange.bind(this) );

        // outline, shadow, glow, color
        // <label htmlFor="colorpicker">Color Picker:</label>
        // <input type="color" id="colorpicker" value="#0000ff">
        // var textareaSize = owner.getTextAreaSize();
        // var result = HtmlHelper.createTwoAttribTextInput( rootDiv, 'area size', ['w', 'h'], [ textareaSize.width, textareaSize.height ], [false, false], this.onchange.bind(this) );
        // this.input_areaWidth  = result.attrib1;
        // this.input_areaHeight = result.attrib2;

        var div_shadow =  HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        this.cb_shadow = HtmlHelper.createCheckbox( div_shadow, "shadow enabled", false, false, this.onchange.bind(this) );


    },

    onchange : function ( event ) {

    },
});
