// 소유자의 타입이 uiWidget 이어야 함.
GST.Component.Armature = GST.Component.Base.extend({
    ctor : function( name ) {
        this._super();
        this.setName( name );
    },

    onEnter : function() {
        this._super();
    },

    checkValid : function() {
        var ok = this._owner;
        ok &&= this._owner instanceof ccs.Armature;
        return ok;
    },

    //override
    drawInspector : function() {
        var rootDiv =  HtmlHelper.createComponentRootDiv("Armature");

        var armature        = this.getOwner();
        var armatureData    = armature.getArmatureData();
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;
        var movementNames   = animationData.movementNames;

        var i, movementData,
            dl, // duration
            sc; // scale

        var el_div, el_p;

        for( i = 0; i < movementNames.length; ++i ) {
            el_div = document.createElement('div');
            el_p   = document.createElement('p');
            el_p.style.margin = '3px';
            el_p.style.padding = '3px';
            el_p.innerText = movementNames[i];

            el_div.appendChild( el_p );
            rootDiv.appendChild( el_div );

            movementData = movementDataDic[movementNames[i]];
            dl = movementData.duration;
            sc = movementData.scale;

            HtmlHelper.createTextField( el_div, "dl", dl, true );
            HtmlHelper.createTextField( el_div, "sc", sc, false, function(event){
                cc.log(event.target.value);
            } );
        }


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
