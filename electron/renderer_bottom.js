var timelineModule = require('animation-timeline-js');
const log = require('electron-log/main');

var Renderer_bottom = {
    Tag                 : "[ HierarchyRenderer ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function() {
        var openTab = function( tabName ) {
            var i,
                tabContents = document.getElementsByClassName("bottom_content");

            for( i = 0; i < tabContents.length; ++i ) {
                tabContents[i].style.display = "none";
            }

            document.getElementById( tabName ).style.display = "block";
            switch ( tabName ) {
                case "bottom_console":
                    break;
                // case "bottom_timeline":
                //     break;

            }

        }

        $('#tab_btn_console').on( 'click', openTab.bind(null, 'bottom_history' ) );
        // $('#tab_btn_timeline').on( 'click', openTab.bind(null, 'bottom_timeline' ) );
        // $('#tab_btn_temp').on( 'click', openTab.bind(null, 'bottom_temp' ) );
    },



}