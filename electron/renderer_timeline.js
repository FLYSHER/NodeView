var timelineModule = require('animation-timeline-js');

var Renderer_timeline = {
    Tag                 : "[ TimelineRenderer ] ",

    init : function() {
        this.timeline_rows  = null;
        this.timeline       = null;

        this.playing                = false;
        this.trackTimelineMovement  = false;

        this.initTimeline();
        this.initPlayer();
    },
    initTimeline : function() {

        this.generateModel();
        this.timeline = new timelineModule.Timeline();
        this.timeline.initialize({ id : "timeline", headerHeight: 45 });
        this.timeline.setModel( { rows : this.timeline_rows } );
        this.generateHTMLOutlineListNodes( this.timeline_rows );

        this.timeline.onTimeChanged( function (event) {
            this.showActivePositionInformation();
        }.bind(this));

        this.timeline.onScroll( function( obj) {
            var timeline = this.timeline;
            var outlineContainer = document.getElementById( 'outline-container' );

            var options = timeline.getOptions();
            if (options) {
                // Synchronize component scroll renderer with HTML list of the nodes.
                if (outlineContainer) {
                    outlineContainer.style.minHeight = obj.scrollHeight + 'px';
                    document.getElementById('outline-scroll-container').scrollTop = obj.scrollTop;
                }
            }
            this.showActivePositionInformation();
        }.bind(this));

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
    },

    generateHTMLOutlineListNodes : function( rows ) {

        var options = this.timeline.getOptions();
        var outlineContainer = document.getElementById( 'outline-container' );
        var headerElement = document.getElementById('outline-header');
        headerElement.style.maxHeight = headerElement.style.minHeight = options.headerHeight + 'px';
        // headerElement.style.backgroundColor = options.headerFillColor;
        outlineContainer.innerHTML = '';
        rows.forEach(function (row, index) {
            var div = document.createElement('div');
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
        // if ( this.timeline ) {
        //     var timeline = this.timeline;
        //     const fromPx = timeline.scrollLeft;
        //     const toPx = timeline.scrollLeft + timeline.getClientWidth();
        //     const fromMs = timeline.pxToVal(fromPx - timeline._leftMargin());
        //     const toMs = timeline.pxToVal(toPx - timeline._leftMargin());
        //     let positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
        //     let message = 'Timeline in ms: ' + timeline.getTime() + 'ms. Displayed from:' + fromMs.toFixed() + 'ms to: ' + toMs.toFixed() + 'ms.';
        //     message += '<br>';
        //     message += 'Timeline in px: ' + positionInPixels + 'px. Displayed from: ' + fromPx + 'px to: ' + toPx + 'px';
        //     document.getElementById('currentTime').innerHTML = message;
        // }
    },

    setAnimationTimeline : function( arFileName, trackName ) {
        var originData      = cc.loader.getRes( arFileName );
        var armature_data   = originData['armature_data'][0];
        var boneList        = armature_data['bone_data'];
        var animation_data  = originData['animation_data'][0];
        var mov_dataList    = animation_data['mov_data'];
        var move_data       = mov_dataList.find( function( item ) {
            return item.name === trackName;
        });
        if( !move_data ) {
            return;
        }

        var mov_bone_data = move_data['mov_bone_data'];
        this.timeline_rows.length = 0;

        var i,k, frame_data;
        for( i = 0; i < mov_bone_data.length; ++i ) {
            frame_data = mov_bone_data[i]['frame_data'];
            var arrKeyFrames = [];

            for( k = 0; k < frame_data.length; ++k ) {
                arrKeyFrames.push({
                    val : frame_data[k]['fi'] * 1000
                });
            }
            this.timeline_rows.push({
                title : mov_bone_data[i].name,
                keyframes : arrKeyFrames,
            });
        }

        this.timeline.setModel( { rows : this.timeline_rows } );
        this.generateHTMLOutlineListNodes( this.timeline_rows );
    },

    outlineMouseWheel : function( event ) {
        var timeline = this.timeline
        if (timeline) {
            this.timeline._handleWheelEvent(event);
        }
    },

    addKeyFrame : function() {

    },

    playTrack : function() {
        this.playing = true;
        this.trackTimelineMovement = true;

        if( this.timeline ) {
            this.moveTimelineIntoTheBounds();
            this.timeline.setOptions({ timelineDraggable:false});
        }
    },

    moveTimelineIntoTheBounds() {
        if( this.timeline ) {
            if( this.timeline._startPos || this.timeline._scrollAreaClickOrDragStarted ) {
                return;
            }
            var fromPx  = this.timeline.scrollLeft;
            var toPx    = this.timeline.scroll + this.timeline.getClientWidth();
            var positionInPixels = this.timeline.valToPx( this.timeline.getTime() ) + this.timeline._leftMargin();
            if( positionInPixels <= fromPx || positionInPixels >= toPx ) {
                this.timeline.scrollLeft = positionInPixels;
            }
        }
    },

    initPlayer : function() {
        var playStep = 50;
        setInterval( function(){
            if( this.playing ) {
                if( this.timeline ) {
                    this.timeline.setTime( this.timeline.getTime() + playStep );
                    this.moveTimelineIntoTheBounds();
                }
            }
        }.bind(this), playStep )
    },
}