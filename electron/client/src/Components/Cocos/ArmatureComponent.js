// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};
Genie.Component.ArmatureView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.ARMATURE_VIEW );
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();
        var armature        = this.getOwner();
        var armatureData    = this.getOwner().getArmatureData();
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

        this.btn_play = HtmlHelper.createIconButton( rootDiv, {
            className : 'fa-solid fa-play',
        }, this.onclick.bind(this) );

        this.btn_stop = HtmlHelper.createIconButton( rootDiv, {
            className : 'fa-solid fa-stop',
        }, this.onclick.bind(this) );

        this.btn_resumeAndPause = HtmlHelper.createIconButton( rootDiv, {
            className : 'fa-solid fa-pause',
            style   : 'color: #677283'
        }, this.onclick.bind(this) );

        // gotoAndPause
        var div_gotoAndPause = HtmlHelper.createDiv( rootDiv, 'component_lineDiv' );
        HtmlHelper.createLabel( div_gotoAndPause, 'gotoAndPause', 'component_propertyLabel');
        this.input_gotoAndPause = HtmlHelper.createTextInput( div_gotoAndPause, 0, 'component_shortTextInput', false, this.onchange.bind(this) );
        this.btn_gotoAndPause = HtmlHelper.createIconButton( div_gotoAndPause, {
            className : 'fa-solid fa-forward-step',
        }, this.onclick.bind(this) );

        // movement group
        this.drawMovementData( rootDiv );

        // 참조하는 파일들 리스트
        this.drawRelativeData( rootDiv );

        // time line
        var arFileName = this.getOwner().getName();
        Renderer_timeline.setAnimationTimeline(arFileName + ".ExportJson", this.getSelectedMovName());
    },

    drawMovementData : function( rootDiv ) {
        var animationData   = this.getOwner().getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;
        var movementNames   = animationData.movementNames;

        var currMovementData = movementDataDic[movementNames[0]];
        var name    = currMovementData.name;
        var dl      = currMovementData.duration;
        var sc      = currMovementData.scale.toFixed(2);
        var loop    = currMovementData.loop;

        // name duration scale loop moveBoneDataDic
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "movementData", "component_groupTitleLabel" );

        this.mov_name   = HtmlHelper.createOneLongTextInput( div_group, 'movName', name, true );
        this.mov_dl     = HtmlHelper.createOneShortTextInput( div_group, "duration", dl, true );
        this.mov_sc     = HtmlHelper.createOneShortTextInput( div_group, "speedScale", sc, true, this.onchange.bind(this) );
        this.mov_loop   = HtmlHelper.createCheckboxAttrib( div_group, 'loop', loop, true );
    },

    drawRelativeData : function( rootDiv ) {
        var div_group = HtmlHelper.createDiv( rootDiv, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "relativeData", "component_groupTitleLabel" );

        var configFilePath = this.getOwner().getName() + ".ExportJson";
        var relativeData = ccs.armatureDataManager.getRelativeData( configFilePath );

        // sample
        // relativeData = {
        //     animations : ['70bonusAR'],
        //     armatures  : ['70bonusAR'],
        //     plistFiles : ['image/70MainAtlas.plist'],
        //     textures   : ['sl_70BonusSym_03', 'sl_70BonusSym_04', 'sl_70BonusSym_05'] // 사용하는 스프라이트 명
        // }

        var pngFiles = [];
        relativeData.plistFiles.forEach( function(item){
            pngFiles.push( item.replace(".plist", ".png") ) ;
        });

        var atlasFiles = pngFiles.concat( relativeData.plistFiles );
        var li_plist = HtmlHelper.createFolderItem( 'Atlas', atlasFiles );
        div_group.appendChild( li_plist );
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

    onchange : function( event ) {
        var owner = this.getOwner();
        var currMovData = this.getSelectedMovData();
        var value, strValue = event.target.value;

        switch ( event.target ) {
            case  this.select_track:
                this.setMovementData( currMovData );
                var arFileName = this.getOwner().getName();
                Renderer_timeline.setAnimationTimeline(arFileName + ".ExportJson", this.getSelectedMovName());
                break;
            case this.input_gotoAndPause:
                var frame   = parseInt( strValue );
                this.gotoFrame( frame );
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
                Renderer_timeline.playTrack();
                break;
            case this.btn_stop:
                owner.getAnimation().stop();
                Renderer_timeline.pauseTrack();
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
                var frame = parseInt(this.input_gotoAndPause.value);
                this.gotoFrame( frame );
                break;
        }
    },

    gotoFrame : function( frame ) {
        var owner       = this.getOwner();
        var currMovData = this.getSelectedMovData();
        var dl      = currMovData.duration;
        var name    = currMovData.name;

        var loc_frame;
        if( frame >= 0 && frame < dl ) {
            loc_frame = frame;
        }
        else {
            if( frame > dl ) {
                loc_frame = dl;
            }
            else {
                loc_frame = 0;
            }
        }

        owner.getAnimation().play( name );
        owner.getAnimation().gotoAndPause( loc_frame );

        this.input_gotoAndPause.value = loc_frame;
    },

});
