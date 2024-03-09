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
    },

    initUI : function() {
        var debugViewFrame = new Genie.Test.TestWindowFrame(" DebugView ", 200, 100);
        this.addChild( debugViewFrame );

        var strMousePt = this.getMousePtString( cc.p(0,0) );
        this.item_mousePt = debugViewFrame.addCommand(strMousePt, null);
    },

    getMousePtString : function( pt ) {
        return "x : " + parseInt( pt.x ) + ", y : " + parseInt( pt.y );
    },

    updateMousePt : function( pt ) {
        this.item_mousePt.setString( this.getMousePtString( pt ) );
    },
});