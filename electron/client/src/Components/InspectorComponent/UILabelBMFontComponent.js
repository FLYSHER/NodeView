// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.UILabelBMFontView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "UILabelBMFontView" );
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

        this.input_fntFileName = HtmlHelper.createOnePropertyTextInput( rootDiv, 'fontName', owner._fntFileName, true, this.onchange.bind(this)  );
        this.input_text     = HtmlHelper.createOnePropertyTextInput( rootDiv, 'text', owner.getString(), false, this.onchange.bind(this) );

        this.input_fntFileName.id = "bmf_fntFileName";
        this.input_text.id        = "bmf_text";

    },

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target.id ) {
            case 'bmf_fntFileName':
                // value = strValue;
                // Genie.ToolController.execute( new Genie.Command.UILabelBMFont( owner, {
                //     strProp : 'fntFileName',
                //     src     : owner._fntFileName,
                //     dest    : value
                // } ) );
                break;
            case 'bmf_text':
                value = strValue;
                Genie.ToolController.execute( new Genie.Command.UILabelBMFont( owner, {
                    strProp : 'text',
                    src     : owner.getString(),
                    dest    : value
                } ) );
                break;
        }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var value   = paramObj.value;

        switch ( strProp ) {
            // case 'fntFileName':
            //     this.input_fntFileName.value = value;
            //     break;
            case 'text':
                this.input_text.value = value;
                break;
        }
    }
});
