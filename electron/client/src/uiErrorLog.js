var LogContainer = [];

var printLog = function( message, color ){
    // var logLabel = cc.director.getRunningScene().getChildByName('MainLayer').getChildByTag(98);//
    // logLabel.setString( message);

    var runningScene = cc.director.getRunningScene();
    if(!runningScene) {
        return;
    }

    if( !!message === false ){
        return;
    }

    if( LogContainer.length > 0 ) {
        cc.each( LogContainer, function( label ) {
            if( label !== null && cc.sys.isObjectValid( label ) ) {
                label.runAction( cc.moveBy( 0.1, 0, 30 ) );
            }
        } );
    }

    var _color = color || cc.color( 255, 255, 255, 255 );
    var _duration = 3;
    var label = new cc.LabelTTF( message, "Arial", 18 );
    LogContainer.push( label );
    label._debugIndex = LogContainer.length - 1;
    label.setFontFillColor( _color );
    label.attr( {
        x: cc.winSize.width / 2,
        y: 50,
        opacity: 0
    } );
    runningScene.addChild(label, 99999);

    label.runAction( cc.sequence( cc.fadeIn( 0.1 ), cc.delayTime( _duration ), cc.fadeOut( 0.1 ) ) );
    label.runAction( cc.sequence(
        cc.delayTime( _duration + 0.2 ),
        cc.callFunc( function() {
                //RockN.Util.safeRemoveChild(runningScene, label);
                LogContainer[label._debugIndex] = null;
                while( label._debugIndex-- >= 0 ) {
                    LogContainer.shift();
                }
            }, null ),
        cc.removeSelf( true )
        )
    );

};


var gizmoNodTag = 999;

var Gizmo_DrawTouchLayerByRect = function( rect ){


    var rectNode = cc.director.getRunningScene().getChildByTag(gizmoNodTag);
    if(!rectNode) {
        rectNode = new cc.DrawNode();
        rectNode.setTag(gizmoNodTag);
        cc.director.getRunningScene().addChild(rectNode, 999999, gizmoNodTag);
    }
    else{
        rectNode.clear();
    }

    // var rectangle = [];
    // rectangle[0] = cc.p(rect.x, rect.y);
    // rectangle[1] = cc.p(rect.x + rect.width, rect.y);
    // rectangle[2] = cc.p(rect.x + rect.width, rect.y + rect.height);
    // rectangle[3] = cc.p(rect.x, rect.y + rect.height);


    rectNode.drawRect(
        cc.p(rect.x, rect.y),
        cc.p(rect.x + rect.width, rect.y + rect.height), cc.color(255,0,0,50), 0, cc.color(255,255,255,255));
};

var Gizmo_ClearDraw = function(){

    var rectNode = cc.director.getRunningScene().getChildByTag(gizmoNodTag);
    if(rectNode) {
        rectNode.clear();
    }
};