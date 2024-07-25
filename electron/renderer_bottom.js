const Renderer_bottom = {
    Tag                 : "[ BottomRenderer ] ",
    hierarchyData       : [],
    nodeInstanceIDMap   : {},
    rootLayer           : null,

    init : function() {

        //$('#button_tab_command').on( 'click', this.openTab.bind(this, 'bottom_history' ) );
        $('#button_tab_timeline').on( 'click', this.openTab.bind(this, 'bottom_timeline' ) );

        //this.openTab('bottom_history');
    },
    // todo : 추후 개선 때 활용
    openTab : function( tabName ) {
        const tabContents = document.getElementsByClassName("bottom_content");
        tabContents.forEach((item) => {
            item.style.display = "none";
        });

        this.setTimelineVisible( false );

        switch ( tabName ) {
            case "bottom_history":
                document.getElementById( tabName ).style.display = "inline";
                break;
            case "bottom_timeline":
                this.setTimelineVisible( true );
                break;
        }
    },

    // todo : 추후 개선 때 활용
    setTimelineVisible : function( visible ) {
        const strDisplay = visible === true ? "flex" : "none";
        document.getElementById( "timeline_content" ).style.display = strDisplay;
        document.getElementsByClassName( "timeline_toolbar" )[0].style.display = document.getElementById( "timeline_content" ).style.display = strDisplay;
    },
}