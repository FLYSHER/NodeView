const log = require('electron-log/main');

var bottomRenderer = {
    Tag                 : "[ HierarchyRenderer ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function() {

        var rows = [
            {
                keyframes: [
                    {
                        val: 40,
                    },
                    {
                        val: 3000
                    }
                ]
            }];

        var timeline = new timelineModule.Timeline( {
            id : 'bottom_timeline'
        } );

        var openTab = function( tabName ) {
            var i,
                tabContents = document.getElementsByClassName("bottom_content");

            for( i = 0; i < tabContents.length; ++i ) {
                tabContents[i].style.display = "none";
            }

            document.getElementById( tabName ).style.display = "block";
            if( tabName === "bottom_timeline" ) {
                timeline.setModel( {
                    rows : rows
                } )
            }
        }

        $('#tab_btn_console').on( 'click', openTab.bind(null, 'bottom_console' ) );
        $('#tab_btn_timeline').on( 'click', openTab.bind(null, 'bottom_timeline' ) );
        $('#tab_btn_temp').on( 'click', openTab.bind(null, 'bottom_temp' ) );
    },

}