/**
 *
 */
var Gizmo = cc.Node.extend({
    ctor : function() {
        this._super();
        this.initGizmo();
    },

    initGizmo : function () {
        this.rootNode = new cc.Node();
        this.addChild( this.rootNode );

        this._drawNode = new cc.DrawNode();
        this.rootNode.addChild( this._drawNode );

        var LINE_LENGTH = 80;
        var LINE_WIDTH  = 2;
        var ARROW_LENGTH = 10;

        // 기즈모
        this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( LINE_LENGTH, 0 ), LINE_WIDTH, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.p( LINE_LENGTH,0 ), cc.p( LINE_LENGTH - ARROW_LENGTH, ARROW_LENGTH ), LINE_WIDTH, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.p( LINE_LENGTH,0 ), cc.p( LINE_LENGTH - ARROW_LENGTH, -ARROW_LENGTH ), LINE_WIDTH, cc.color( 255, 0,0,255) );

        this._drawNode.drawSegment( cc.p( 0,0 ), cc.p( 0, LINE_LENGTH ), LINE_WIDTH, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.p( 0,LINE_LENGTH ), cc.p( ARROW_LENGTH, LINE_LENGTH - ARROW_LENGTH ), LINE_WIDTH, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.p( 0,LINE_LENGTH ), cc.p( -ARROW_LENGTH, LINE_LENGTH - ARROW_LENGTH ), LINE_WIDTH, cc.color( 0, 255,0,255) );

        this._drawNode.drawDot( cc.p( 0, 0), 2, cc.color( 200, 200, 200, 200) );

        // 터치 영역
        var RECT_SIZE = cc.p( 30, 30 );
        this._drawNode.drawRect( cc.p( 0, 0 ), RECT_SIZE, cc.color( 200, 200, 0, 100), 1, cc.color( 200, 200, 0, 255) );

        this._drawNode.setContentSize( cc.size( RECT_SIZE.x, RECT_SIZE.y ) );
        var touchComp = new GST.Component.Touch();
        this._drawNode.addComponent( touchComp );

        touchComp.onTriggerEvent = function(touchEventName , pt) {
            if (touchEventName !== "move" && touchComp._owner)
                cc.log("RockN.Component.SpriteButton event triggered :" + touchEventName + " by " + this._owner.getName());


            switch (touchEventName)
            {
                case "normal": {

                }break;
                case "over": {

                }break;
                case "up": {
                    cc.log("up");
                }break;
                case "down": {
                    cc.log("down");
                }break;
                case "click": {
                    cc.log("click");
                }break;
                case "move": {
                    cc.log("move");
                }break;
            }
        }
    },

    setTargetNode : function( node ) {
        var nodePos     = node.getPosition();
        var worldPos    = node.convertToWorldSpace( nodePos );
        var localPos    = node.getParent().convertToNodeSpace( worldPos );

        this._drawNode.drawSegment( localPos, cc.pAdd( localPos, cc.p( 30,0 )), 1, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 30,0 )), cc.pAdd( localPos, cc.p( 25,5 )), 1, cc.color( 255, 0,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 30,0 )), cc.pAdd( localPos, cc.p( 25,-5 )), 1, cc.color( 255, 0,0,255) );

        this._drawNode.drawSegment( localPos, cc.pAdd( localPos, cc.p( 0,30 )), 1, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 0,30 )), cc.pAdd( localPos, cc.p( -5,25 )), 1, cc.color( 0, 255,0,255) );
        this._drawNode.drawSegment( cc.pAdd( localPos, cc.p( 0,30 )), cc.pAdd( localPos, cc.p( 5,25 )), 1, cc.color( 0, 255,0,255) );

        this._drawNode.drawDot( localPos, 3, cc.color( 255, 255, 255, 180) );

        // contentSize
        var origin  = cc.p( 0, 0 ),
            dest    = cc.p( node.width, node.height );

        origin  = cc.pAdd( origin, localPos );
        dest    = cc.pAdd( dest, localPos );
        this._drawNode.drawRect( origin, dest, cc.color( 0 , 0, 0, 0 ), 1, cc.color(  0, 255, 255, 255 ) );
    },


});