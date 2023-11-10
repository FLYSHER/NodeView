// 소유자의 타입이 uiWidget 이어야 함.
Genie.Component.ArmatureView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName("ArmatureView");
        this._currTrackIdx = 0;
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
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var armature        = owner;
        var armatureData    = armature.getArmatureData();
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;
        var movementNames   = animationData.movementNames;

        var i,
            arrOption = [];

        for( i = 0; i < movementNames.length; ++i ) {
            arrOption.push( movementNames[i] );
        }

        var div_armature = HtmlHelper.createDiv( rootDiv, 'component_lineDiv');

        var self = this;
        HtmlHelper.createSelectMenu( div_armature, movementNames[0], arrOption, function(event){

            var currIdx = event.target.value;
            var movementData = movementDataDic[movementNames[currIdx]];
            var dl = movementData.duration; // duration
            var sc = movementData.scale;    // scale

            el_dlInput.value = dl;
            el_scInput.value = sc;

            self._currTrackIdx = currIdx;
        });

        HtmlHelper.createButton( div_armature, "play", function(){
            var movementData = movementDataDic[movementNames[self._currTrackIdx]];
            var loop = el_loopInput.checked;    // movementData.loop;
            // var sc   = movementData.scale;      //el_scInput.value;
            // armature.getAnimation().setSpeedScale( sc );
            armature.getAnimation().playWithIndex( self._currTrackIdx, -1, loop );
        });

        var dl = movementDataDic[movementNames[0]].duration;
        var sc = movementDataDic[movementNames[0]].scale;
        var loop = movementDataDic[movementNames[0]].loop;

        var div_loop = HtmlHelper.createDiv( rootDiv, 'component_lineDiv');

        HtmlHelper.createLabel( div_loop, "loop", "component_lineLabel");
        var el_loopInput = HtmlHelper.createCheckbox( div_loop, null, loop );

        var div_attrib = HtmlHelper.createDiv( rootDiv, 'component_lineDiv');

        HtmlHelper.createLabel( div_attrib, "duration", "component_lineLabel");
        var el_dlInput = HtmlHelper.createTextInput( div_attrib, dl, "component_oneAttribInput", true );

        HtmlHelper.createLabel( div_attrib, "speed", "component_lineLabel");
        var el_scInput = HtmlHelper.createTextInput( div_attrib, sc, "component_oneAttribInput", false, function(event){
            cc.log(event.target.value);
        } );

    },

    setInspectorValue : function( paramObj ) {}
});
