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
        // var owner = this.getOwner();
        // var armature        = this.getOwner();
        // var armatureData    = this.getOwner().getArmatureData();
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementNames   = animationData.movementNames;

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        var i, arrOption = [];
        for( i = 0; i < movementNames.length; ++i ) {
            arrOption.push( movementNames[i] );
        }

        this.select_track = HtmlHelper.createSelectMenuAttrib( rootDiv, "trackName", movementNames[0], arrOption, this.onchange.bind(this) );

        this.btn_play = HtmlHelper.creatIconButton( rootDiv, {
            className : 'fa-solid fa-play',
        }, this.onclick.bind(this) );

        this.btn_stop = HtmlHelper.creatIconButton( rootDiv, {
            className : 'fa-solid fa-stop',
        }, this.onclick.bind(this) );

        this.btn_resumeAndPause = HtmlHelper.creatIconButton( rootDiv, {
            // resume > fa-light fa-play
            className : 'fa-solid fa-pause',
            style   : 'color: #677283'
        }, this.onclick.bind(this) );

        // gotoAndPause
        var div_gotoAndPause = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_gotoAndPause, 'gotoAndPause', 'component_longPropertyLabel');
        this.input_gotoAndPause = HtmlHelper.createTextInput( div_gotoAndPause, 0, 'component_shortTextInput', false, this.onchange.bind(this) );
        this.btn_gotoAndPause = HtmlHelper.creatIconButton( div_gotoAndPause, {
            className : 'fa-solid fa-forward-step',
        }, this.onclick.bind(this) );

        // movement group
        this.drawMovementData( rootDiv );
    },

    drawMovementData : function( rootDiv ) {
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;
        var movementNames   = animationData.movementNames;

        var currMovementData = movementDataDic[movementNames[0]];
        var name    = currMovementData.name;
        var dl      = currMovementData.duration;
        var sc      = currMovementData.scale;
        var loop    = currMovementData.loop;

        // name duration scale loop moveBoneDataDic
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "movementData", "component_groupTitleLabel" );

        this.mov_name   = HtmlHelper.createOneLongTextInput( div_group, 'movName', name, true );
        this.mov_dl     = HtmlHelper.createOneShortTextInput( div_group, "duration", dl, true );
        this.mov_sc     = HtmlHelper.createOneShortTextInput( div_group, "speedScale", sc, true, this.onchange.bind(this) );
        this.mov_loop   = HtmlHelper.createCheckboxAttrib( div_group, 'loop', loop, true );
    },

    setMovementData : function( movementData ) {
        this.mov_name.value = movementData.name;
        this.mov_dl.value   = movementData.duration;
        this.mov_sc.value   = movementData.scale;
        this.mov_loop.checked = movementData.loop;
    },

    getSelectedMovName : function() {
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementNames   = animationData.movementNames;

        var movIdx  = parseInt( this.select_track.value );
        return movementNames[ movIdx ];
    },

    getSelectedMovData : function() {
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;

        var currMovName = this.getSelectedMovName();
        return movementDataDic[ currMovName ];
    },

    setInspectorValue : function( paramObj ) {},

    onchange : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;

        switch ( event.target ) {
            case  this.select_track:
                var currMovData = this.getSelectedMovData();
                this.setMovementData( currMovData );
                break;
            // case this.mov_sc:
            //     value = parseFloat( strValue );
            //     owner.getAnimation().setSpeedScale( value );
            //     break;
        }
    },


    onclick : function( event ) {
        var owner = this.getOwner();

        switch ( event.target ) {
            case this.btn_play:
                var moveIdx     = parseInt( this.select_track.value );
                var loop        = this.mov_loop.checked;
                owner.getAnimation().playWithIndex( moveIdx, -1, loop );
                break;
            case this.btn_stop:
                owner.getAnimation().stop();
                break;
            case this.btn_resumeAndPause:
                if( owner.getAnimation().isPause() ) {
                    owner.getAnimation().resume();
                }
                else if( owner.getAnimation().isPlaying() ) {
                    owner.getAnimation().pause();
                }
                break;
            case this.btn_gotoAndPause:
                var currMovData = this.getSelectedMovData();
                var dl      = currMovData.duration;
                var name    = currMovData.name;
                var frame = parseInt(this.input_gotoAndPause.value);
                if( frame >= 0 && frame < dl ) {
                    owner.getAnimation().play( name );
                    owner.getAnimation().gotoAndPause( frame );
                }
                else {
                    if( frame > dl ) {
                        this.btn_gotoAndPause.value = dl;
                    }
                    else {
                        this.btn_gotoAndPause.value = 0;
                    }
                }
                break;
        }
    },


});
