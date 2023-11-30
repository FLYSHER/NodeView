// 기본 노드 프로퍼티
Genie.Component.UIRoot = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( 'UIRoot' );
    },

    onEnter : function () {
        this._super();
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // using textures

        // ui action group




    },

    onchange : function( event ) {
        var value = parseFloat(event.target.value);
        switch ( event.target ) {

        }
    },

    setInspectorValue : function( paramObj ) {
        var strProp = paramObj.args.strProp;
        var value   = paramObj.value;

        switch ( strProp ) {
            case 'position':
                this.input_pos.x.value = parseInt(value.x);
                this.input_pos.y.value = parseInt(value.y);
                break;
            case 'scale':
                this.input_scale.x.value = parseFloat(value.x).toFixed(2);
                this.input_scale.y.value = parseFloat(value.y).toFixed(2);
                break;
        }
    }


});