var Genie = Genie || {};
Genie.Test = Genie.Test || {};

Genie.Test.DebugViewNode = cc.Node.extend({
    ctor : function() {
        this.initProperties()
        this._super();

        this.setName( "Genie.Test.DebugViewNode" );

        this.initUI();
    },

    initProperties : function() {
        this.frameWindow    = null;
        this.item_mousePt   = null;
        this.item_winSize   = null;
    },

    initUI : function() {
        var debugViewFrame = new Genie.Test.TestWindowFrame(" DebugView ", 200, 100);
        this.addChild( debugViewFrame );

        // 윈도우 사이즈
        this.item_winSize = debugViewFrame.addCommand( this.getWinSizeString( cc.winSize ), null );

        // 마우스 위치
        var strMousePt = this.getMousePtString( cc.p(0,0) );
        this.item_mousePt = debugViewFrame.addCommand(strMousePt, null);
    },

    getWinSizeString : function( size ) {
        return "w : " + parseInt( size.width ) + " , h : " + parseInt( size.height );
    },

    updateWinSize : function() {
        this.item_winSize.setTitleText( this.getWinSizeString( cc.winSize ) );
    },

    getMousePtString : function( pt ) {
        return "x : " + parseInt( pt.x ) + ", y : " + parseInt( pt.y );
    },

    updateMousePt : function( pt ) {
        this.item_mousePt.setTitleText( this.getMousePtString( pt ) );
    },


});