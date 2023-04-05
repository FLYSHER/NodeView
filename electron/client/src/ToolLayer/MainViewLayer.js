var MainViewLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.setName("mainLayer");

        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this.onResize();
        ScreenUtil.addResizeListener( this.onResize, this );

        return true;
    },

    onEnter : function() {
        this._super();

        cc.eventManager.addCustomListener("createUIFile", this.onCreateUIFile.bind(this) );
        cc.eventManager.addCustomListener( "onDeleteNode", this.onDeleteNode.bind(this));
        cc.eventManager.addCustomListener("onChangeProperty", this.setNodeProperty.bind(this) );

    },

    onCreateUIFile : function( event ) {
        var userData    = event.getUserData();
        var uiFileName  = userData.uiFileName;

        var uiRoot = ccs.uiReader.widgetFromJsonFile( uiFileName);
        uiRoot.setAnchorPoint( 0.5, 0.5 );
        uiRoot.setPosition( cc.winSize.width/2, cc.winSize.height/2 );
        this.addChild( uiRoot );
        this.currNode = uiRoot;

        // cc.eventManager.dispatchCustomEvent( "refreshInspector", { node : uiRoot });
        cc.eventManager.dispatchCustomEvent( "onRefreshHierarchy" );
    },

    onDeleteNode : function( event ) {
        var userData    = event.getUserData();
        var selectedID = userData.selectedID;
        cc.log("[event] onDeleteNode >  ", selectedID );
    },

    setNodeProperty : function( event ) {
        var userData    = event.getUserData();
        var property    = userData.property;
        var value       = userData.value;
        if( this.currNode ) {
            this.currNode[property] = value;
        }
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

    },

    onExit: function() {

        this._super();
    },

});
