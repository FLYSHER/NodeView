var MainViewLayer = cc.LayerColor.extend({
    ctor: function () {
        // this._super();
        this._super( cc.color( 0, 255, 0, 50 ));
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

        cc.eventManager.addCustomListener( EVT.MAIN_VIEW.CREATE_UI_NODE, this.onCreateUIFile.bind(this) );
        cc.eventManager.addCustomListener( EVT.MAIN_VIEW.CREATE_AR_NODE, this.onCreateARFile.bind(this) );
        cc.eventManager.addCustomListener("onDeleteNode", this.onDeleteNode.bind(this));
        cc.eventManager.addCustomListener("onChangeProperty", this.setNodeProperty.bind(this) );
        cc.eventManager.addCustomListener("onChangeNodeInHierarchy", this.setCurrNode.bind(this));
    },

    onCreateUIFile : function( event ) {
        var userData    = event.getUserData();
        var fileName    = userData.fileName;
        var basename    = cc.path.mainFileName( fileName );

        var uiRoot = ccs.uiReader.widgetFromJsonFile( fileName);
        uiRoot.setAnchorPoint( 0.5, 0.5 );
        uiRoot.setPosition( cc.winSize.width/2, cc.winSize.height/2 );
        uiRoot.setName( basename );
        uiRoot.addComponent(  new Genie.Component.UIActionView( fileName ) );
        this.addChild( uiRoot );

        // this.currNode = uiRoot;

        cc.eventManager.dispatchCustomEvent( "onRefreshHierarchy" );
    },

    onCreateARFile : function( event ) {
        var userData  = event.getUserData();
        var fileName  = userData.fileName;

        var arName     = cc.path.mainFileName( fileName );
        ccs.armatureDataManager.addArmatureFileInfo( fileName );

        var ar = new ccs.Armature( arName );
        ar.setName( arName );
        ar.setPosition( cc.winSize.width/2, cc.winSize.height/2 );
        this.addChild( ar );

        ar.addComponent(  new Genie.Component.ArmatureView() );

        var boneDic = ar.getBoneDic();
        var key, bone;
        for( key in boneDic ) {
            bone = ar.getBone( key );
            bone.addComponent( new Genie.Component.BoneView() );
        }

        // this.currNode = ar;

        cc.eventManager.dispatchCustomEvent( "onRefreshHierarchy" );
    },

    onDeleteNode : function( event ) {
        var userData    = event.getUserData();
        var node        = userData.cocosNode;
        cc.log("[event] onDeleteNode >  ", node );
    },

    setNodeProperty : function( event ) {
        var userData    = event.getUserData();
        var property    = userData.property;
        var value       = userData.value;
        if( this.currNode ) {
            this.currNode[property] = value;
        }
    },

    setCurrNode : function( event ) {
        var userData  = event.getUserData();
        if( !userData || !userData.node ) {
            cc.error( "invalid userData : ", userData );
            return;
        }

        this.currNode = userData.node;
    },

    onResize : function () {
        var size = cc.winSize;
        this.CX = size.width / 2;
        this.CY = size.height / 2;

        this.setContentSize( size.width, size.height );
    },

    onExit: function() {
        this._super();
    },

});