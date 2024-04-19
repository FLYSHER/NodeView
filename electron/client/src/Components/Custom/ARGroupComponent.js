var Genie = Genie || {};
Genie.Component = Genie.Component || {};
Genie.Component.ARGroup = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( "ARGroup" );
    },

    onEnter : function() {
        this._super();
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

        this.input_arName = HtmlHelper.createOneLongTextInput( this.rootDiv, 'ar node', "", false);
        this.input_arName.ondrop = this.onDrop.bind(this);

        HtmlHelper.createButton( rootDiv, "playAllAR", this.onclick_playAllAR.bind(this) );
    },

    onDrop : function( event ) {
        var owner = this.getOwner();
        var nodeName = event.dataTransfer.getData("nodeName");

        var currNodeName = this.input_arName.value;
        if( currNodeName === nodeName ) {
            return;
        }

        event.target.value = nodeName;

        event.preventDefault();
    },

    onclick_playAllAR : function () {
        var owner = this.getOwner();

        var arName = this.input_arName.value;

    },

});
