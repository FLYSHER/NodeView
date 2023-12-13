var timelineModule = require('animation-timeline-js');
const log = require('electron-log/main');

var Renderer_bottom = {
    Tag                 : "[ HierarchyRenderer ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function() {
        // var openTab = function( tabName ) {
        //     var i,
        //         tabContents = document.getElementsByClassName("bottom_content");
        //
        //     for( i = 0; i < tabContents.length; ++i ) {
        //         tabContents[i].style.display = "none";
        //     }
        //
        //     document.getElementById( tabName ).style.display = "block";
        //     switch ( tabName ) {
        //         case "bottom_console":
        //             break;
        //         case "bottom_timeline":
        //             timeline.setModel( {
        //                 rows : rows
        //             } )
        //             break;
        //
        //     }
        //
        // }
        //
        // $('#tab_btn_console').on( 'click', openTab.bind(null, 'bottom_history' ) );
        // $('#tab_btn_timeline').on( 'click', openTab.bind(null, 'bottom_timeline' ) );
        // $('#tab_btn_temp').on( 'click', openTab.bind(null, 'bottom_temp' ) );

        this.timeline_rows = null;
        this.timeline      = null;
        this.initTimeline();


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
                title : "bone bone 1",
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
            },
            {
                title : "bone2",
                selected: false,
                keyframes: [
                    {
                        style:{
                            cursor: 'default',
                        },
                        val: 2000,
                    },
                    {
                        val: 2500,
                    },
                    {
                        val: 2600,
                    },
                ],
            },
            {
                title : "bone3",
                selected: false,
                keyframes: [
                    {
                        style:{
                            cursor: 'default',
                        },
                        val: 1000,
                    },
                    {
                        val: 2500,
                    },
                    {
                        val: 3600,
                    },
                ],
            },
            {
                title : "bone4",
                selected: false,
                keyframes: [
                    {
                        style:{
                            cursor: 'default',
                        },
                        val: 0,
                    },
                    {
                        val: 4000,
                    },
                    {
                        val: 4600,
                    },
                ],
            },
            {
                title : "bone5",
                selected: false,
                keyframes: [
                    {
                        style:{
                            cursor: 'default',
                        },
                        val: 3000,
                    },
                    {
                        val: 3500,
                    },
                    {
                        val: 4600,
                    },
                ],
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

    },

    showActivePositionInformation : function() {
        if ( this.timeline ) {
            var timeline = this.timeline;
            const fromPx = timeline.scrollLeft;
            const toPx = timeline.scrollLeft + timeline.getClientWidth();
            const fromMs = timeline.pxToVal(fromPx - timeline._leftMargin());
            const toMs = timeline.pxToVal(toPx - timeline._leftMargin());
            let positionInPixels = timeline.valToPx(timeline.getTime()) + timeline._leftMargin();
            let message = 'Timeline in ms: ' + timeline.getTime() + 'ms. Displayed from:' + fromMs.toFixed() + 'ms to: ' + toMs.toFixed() + 'ms.';
            message += '<br>';
            message += 'Timeline in px: ' + positionInPixels + 'px. Displayed from: ' + fromPx + 'px to: ' + toPx + 'px';
            document.getElementById('currentTime').innerHTML = message;
        }
    },

    setAnimationTimeline : function( arFileName, trackName ) {
        var originData   = cc.loader.getRes( arFileName );
        var armatureData = originData['armature_data'][0];
        var boneList     = armatureData['bone_data'];

        this.timeline_rows.length = 0;

        for( var i = 0; i < boneList.length; ++i ) {
            this.timeline_rows.push({
                title : boneList[i].name
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
    }

}