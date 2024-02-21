Genie.Component.Empty = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( 'Empty' );
    },

    checkValid : function() {
        return true;
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className: "fa-solid fa-vials",
            style: "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild(titleBar);
        this.rootDiv = rootDiv;
    },

});