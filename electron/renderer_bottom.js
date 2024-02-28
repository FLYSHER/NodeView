var timelineModule = require('animation-timeline-js');
const log = require('electron-log/main');

var Renderer_bottom = {
    Tag                 : "[ BottomRenderer ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function() {

        $('#button_tab_command').on( 'click', this.openTab.bind(this, 'bottom_history' ) );
        $('#button_tab_timeline').on( 'click', this.openTab.bind(this, 'bottom_timeline' ) );

        this.openTab('bottom_history');
    },

    openTab : function( tabName ) {
        var i,
            tabContents = document.getElementsByClassName("bottom_content");

        for( i = 0; i < tabContents.length; ++i ) {
            tabContents[i].style.display = "none";
        }

        this.setTimelineVisible( false );

        switch ( tabName ) {
            case "bottom_history":
                document.getElementById( tabName ).style.display = "inline";
                break;
            case "bottom_timeline":
                this.setTimelineVisible( true );
                break;
            // case "bottom_timeline":
            //     break;
        }
    },

    setTimelineVisible : function( visible ) {
        var strDisplay = visible === true ? "flex" : "none";
        document.getElementById( "timeline_content" ).style.display = strDisplay;
        document.getElementsByClassName( "timeline_toolbar" )[0].style.display =         document.getElementById( "timeline_content" ).style.display = strDisplay;
    },
}