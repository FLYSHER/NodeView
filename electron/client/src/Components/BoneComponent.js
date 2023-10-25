// 소유자의 타입이 uiWidget 이어야 함.
GST.Component.Bone = GST.Component.Base.extend({
    ctor : function( name ) {
        this._super();
        this.setName( name );
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof ccs.Bone;
        return ok;
    },

    //override
    drawInspector : function() {
        // var rootDiv = document.createElement('div');
        // rootDiv.className = 'component_root';
        // $(`#inspector`).append( rootDiv );
        //
        // // title
        // var title = document.createElement('p');
        // title.className = 'component_title';
        // title.innerText = 'Bone';
        // rootDiv.append( title );

        var rootDiv = HtmlHelper.createComponentRootDiv( 'Bone');

        var bone = this.getOwner();
        var currDisplayIndex = bone.getDisplayManager().getCurrentDisplayIndex();

        var decoDisplayList = bone.getDisplayManager().getDecorativeDisplayList();
        var i, displayData,
            skinArray = [];
        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            skinArray.push( "(" + i + ") " + displayData.displayName );
        }

        var placeHolder = "(" + currDisplayIndex + ") " + decoDisplayList[currDisplayIndex].getDisplayData().displayName;

        HtmlHelper.createSelectMenu( rootDiv, "skinIndex", placeHolder, skinArray, function( event ) {
            bone.changeDisplayWithIndex( event.target.value, true );
        });
    },
});
