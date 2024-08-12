const timelineModule = require('animation-timeline-js');

const Renderer_timeline = {
    Tag                 : "[ TimelineRenderer ] ",

    init : function() {
        this.timeline_rows  = null;
        this.timeline       = null;

        this.playing                = false;
        this.loop                   = false;
        this.trackTimelineMovement  = false;

        this.initTimeline();
        this.initPlayer();
    },

    initTimeline : function() {

        this.generateModel();
        this.timeline = new timelineModule.Timeline();
        this.timeline.initialize({ id : "timeline", headerHeight: 45 });
        this.timeline.setOptions( {
            // stepPx      : 100,
            // stepSmallPx : 10,
            zoomMin     : 2,
            zoomMax     : 10
        } );
        this.timeline.setModel( { rows : this.timeline_rows } );
        this.generateHTMLOutlineListNodes( this.timeline_rows );

        this.timeline.onTimeChanged( (event) => {
            const source = event.source;
            if( source === 'user' ) {
                this.onTimelineChangedByUser( event );
            }

            this.showActivePositionInformation();
        });

        this.timeline.onScroll( (obj) => {
            const options = this.timeline.getOptions();
            if (options) {
                // Synchronize component scroll renderer with HTML list of the nodes.
                const outlineContainer = document.getElementById( 'outline-container' );
                if (outlineContainer) {
                    outlineContainer.style.minHeight = obj.scrollHeight + 'px';
                    document.getElementById('outline-scroll-container').scrollTop = obj.scrollTop;
                }
            }
            this.showActivePositionInformation();
        });
    },

    // 유저가 수동으로 타임라인 변경할 경우
    onTimelineChangedByUser : function( event ) {
        const targetNode = Genie.ToolController.getSelectNode(); // Genie.CommandManager.getCurrentNode();
        if( !!targetNode ) {
            const arComponent = targetNode.getComponent( Genie.ComponentName.ARMATURE_VIEW );
            if( arComponent ) {
                const options = this.timeline.getOptions();
                const snapStep = options.snapStep;
                const frame = parseInt( event.val / snapStep );
                arComponent.gotoFrame( frame );
            }
        }
    },

    generateModel : function() {
        this.timeline_rows = [
            {
                title : "test_bone",
                selected    : false,
                draggable   : false,
                keyframes : [
                    {
                        val : 40,
                        shape : 'rhomb',
                    },
                    {
                        val : 1000,
                        shape : 'rhomb',
                        selected: false,
                    }
                ]
            }
        ]

        this.mov_totalFrame = 0;
        this.mov_scale      = 1;
        this.animationInternal = 1/60; // CCProcessBase.js 에서 사용하는 값 그대로
        this.msPerFrame     = 0;
    },

    generateHTMLOutlineListNodes : function( rows ) {
        const options = this.timeline.getOptions();
        const outlineContainer = document.getElementById( 'outline-container' );
        const headerElement = document.getElementById('outline-header');
        headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';

        outlineContainer.innerHTML = '';
        rows.forEach((row, index) => {
            const div = document.createElement('div');
            div.classList.add('outline-node');
            const h = (row.style ? row.style.height : 0) || options.rowsStyle.height;
            div.style.maxHeight = div.style.minHeight = h + 'px';
            div.style.marginBottom = options.rowsStyle.marginBottom + 'px';
            div.innerText = row.title || 'Track ' + index;
            outlineContainer.appendChild(div);
        });

        outlineContainer.onwheel = this.outlineMouseWheel.bind(this);
    },

    showActivePositionInformation : function() {

    },

    setAnimationTimeline : function( arFileName, trackName ) {
        const originData      = cc.loader.getRes( arFileName );
        const armature_data   = originData['armature_data'][0];
        const boneList        = armature_data['bone_data'];
        const animation_data  = originData['animation_data'][0];
        const mov_dataList    = animation_data['mov_data'];


        const move_data       = mov_dataList.find(( item ) => item.name === trackName);
        if( !move_data ) {
            return;
        }

        this.mov_totalFrame = move_data['dr'] - 1;
        this.mov_scale      = move_data['sc'];

        const mov_bone_data = move_data['mov_bone_data'];
        this.timeline_rows.length = 0;

        const msPerFrame = this.animationInternal / this.mov_scale * 1000;
        this.msPerFrame = msPerFrame;

        mov_bone_data.forEach((bone_data) => {
            const frame_data = bone_data['frame_data'];
            this.timeline_rows.push({
                title : bone_data.name,
                keyframes : frame_data.map((f_data) => {
                    return {val: f_data['fi'] * msPerFrame};
                })
            });
        });

        this.timeline.setOptions( {
            stepVal  : msPerFrame , // 눈금 하나당 단위 ms
            snapStep : msPerFrame ,  // 타임 바 이동 단위 ms
        });
        this.timeline.setModel( { rows : this.timeline_rows } );
        this.generateHTMLOutlineListNodes( this.timeline_rows );

        this.timeline.setTime( 0 );
        this.timeline.setZoom( 3 );
    },

    outlineMouseWheel : function( event ) {
        const timeline = this.timeline
        if (timeline) {
            this.timeline._handleWheelEvent(event);
        }
    },

    addKeyFrame : function() {

    },

    playTrack : function(loop) {
        this.pauseTrack();

        this.playing = true;
        this.loop = !!loop;
        this.trackTimelineMovement = true;

        if( this.timeline ) {
            this.timeline.setTime( 0 );
            this.timeline.setOptions({ timelineDraggable:false, zoom:this.timeline.getZoom() });
        }
    },

    pauseTrack : function() {
        this.playing = false;
        this.loop = false;
        this.timeline && this.timeline.setOptions({
            timelineDraggable: true, zoom:this.timeline.getZoom()
        });
    },

    moveTimelineIntoTheBounds() {
        if( this.timeline ) {
            if( this.timeline._startPos || this.timeline._scrollAreaClickOrDragStarted ) {
                return;
            }
            const fromPx  = this.timeline.scrollLeft;
            const toPx    = this.timeline.scrollLeft + this.timeline.getClientWidth();
            const positionInPixels = this.timeline.valToPx( this.timeline.getTime() ) + this.timeline._leftMargin();
            if( positionInPixels <= fromPx || positionInPixels >= toPx ) {
                this.timeline.scrollLeft = positionInPixels;
            }
        }
    },

    initPlayer : function() {
        const playStep = 10;

        setInterval( function(){
            if( this.playing ) {
                if( this.timeline ) {
                    this.timeline.setTime( this.timeline.getTime() + playStep  );
                    this.moveTimelineIntoTheBounds();

                    if( this.timeline.getTime() >= this.mov_totalFrame * this.msPerFrame ) {
                        this.loop ? this.playTrack(this.loop) : this.pauseTrack();
                    }

                }
            }
        }.bind(this), playStep )
    },

    setTimeByFrame : function (frame) {
        this.timeline.setTime(frame * this.msPerFrame);
    },

    handleContentSize : function (width) {
        const timelineContent = document.getElementById('timeline_content');
        timelineContent.style.width = width + 'px';

        const timelineDiv = document.getElementById('timeline');
        if (timelineDiv) {
            const canvasEl = timelineDiv.querySelector('canvas');
            if (canvasEl) {
                canvasEl.style.minWidth = '0px';
                // 임시 우측 버퍼 120 px
                canvasEl.style.width = (width - 120) + 'px';
            }
        }

        // 컨테이너 내 크기 고정을 위해 줌인으로 땡긴다. 아니면 움직여서 width 바뀔 때 마다 커지거나 작아짐.
        this.timeline.zoomIn();
    }
}