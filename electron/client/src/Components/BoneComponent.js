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
        var rootDiv = document.createElement('div');
        rootDiv.className = 'component_root';
        $(`#inspector`).append( rootDiv );

        // title
        var title = document.createElement('p');
        title.className = 'component_title';
        title.innerText = 'Bone';
        rootDiv.append( title );



        var bone = this.getOwner();
        var currDisplayIndex = bone.getDisplayManager().getCurrentDisplayIndex();

        var decoDisplayList = bone.getDisplayManager().getDecorativeDisplayList();
        var i, displayData;
        for( i = 0; i < decoDisplayList.length; ++i ) {
            displayData = decoDisplayList[i].getDisplayData();
            cc.log( "skin idx : ", i );
            cc.log( "name : ", displayData.displayName );
        }
        cc.log( decoDisplayList );

        // deco display list
        var div_dropDownRoot = document.createElement('div');
        div_dropDownRoot.className = "dropdown";
        rootDiv.appendChild( div_dropDownRoot );

        var btn_dropDown = document.createElement('button');
        btn_dropDown.className = "dropbtn";

        var span_dropbtn_content = document.createElement('span');
        span_dropbtn_content.className = 'dropbtn_content';
        span_dropbtn_content.innerText = currDisplayIndex;



        //
        //
        // var animationData = this.getOwner().getAnimation().getAnimationData();
        // var movementNames = animationData.movementNames;
        //
        // if( !movementNames ||  movementNames.length <= 0 ) {
        //     var p = document.createElement('div');
        //     p.innerText = "not exist track";
        //     rootDiv.appendChild( p );
        // }
        // else {
        //     var ul_trackList = document.createElement('ul');
        //     ul_trackList.className = "no_dot";
        //     rootDiv.appendChild( ul_trackList);
        //
        //     var i, li_trackObj, btn_trackObj;
        //     for( i = 0; i < movementNames.length; ++i ){
        //         li_trackObj = document.createElement('li');
        //         btn_trackObj = document.createElement('button');
        //         btn_trackObj.innerText = movementNames[i];
        //         btn_trackObj.onclick = function( movName) {
        //             this.getOwner().getAnimation().play( movName, -1, 1 );
        //         }.bind( this, movementNames[i] );
        //
        //         li_trackObj.appendChild( btn_trackObj );
        //         ul_trackList.append( li_trackObj );
        //     }
        // }
    },
});
