var DraggableNode = cc.Node.extend( {
    ctor: function( contentSize ) {
        this._super();

        this.setContentSize( contentSize );

        this._draggable = true;

        // var rect = this.getBoundingBox();
        // var node = new cc.DrawNode();
        // node.drawRect( cc.p(rect.x, rect.y), cc.p(rect.x + rect.width, rect.y + rect.height), cc.color( 0, 0, 0, 0 ), 1, cc.color( 255, 0, 0 ) );
        // this.addChild( node );

        var self = this;
        var isOver = false;
        var touchStart = false;
        var centerPointDiff = cc.p( 0, 0 );
        this._draggableRect = this.getBoundingBoxToWorld();

        cc.eventManager.addListener( {
            event: cc.EventListener.MOUSE,
            onMouseMove: function( event ) {
                if( !self._draggable ) {
                    return;
                }

                var pos = event.getLocation();
                var prevOver = isOver;
                isOver = cc.rectContainsPoint( self._draggableRect, pos );
                if( event.getButton() === cc.EventMouse.BUTTON_LEFT && isOver ) {
                    if( !touchStart ) {
                        touchStart = true;
                        centerPointDiff = cc.p( pos.x - ( self._draggableRect.x + self._draggableRect.width / 2 ), pos.y - ( self._draggableRect.y + self._draggableRect.height / 2 ) );
                    } else {
                        var nodePoint = self.getParent().convertToNodeSpace( cc.p( pos.x - centerPointDiff.x, pos.y - centerPointDiff.y ) );
                        var prevPos = event.getCurrentTarget().getPosition();
                        event.getCurrentTarget().setPosition( nodePoint );
                        self._draggableRect.x += nodePoint.x - prevPos.x;
                        self._draggableRect.y += nodePoint.y - prevPos.y;
                    }
                } else {
                    touchStart = false;
                }
                if( !prevOver && isOver ) {
                    cc._canvas.style.cursor="pointer"
                }
                else if( prevOver && !isOver ) {
                    cc._canvas.style.cursor="default"
                }
            },
            swallowTouches: true
        }, this );
    },

    onEnter: function() {
        this._super();

        this._draggableRect = this.getBoundingBoxToWorld();
    },

    setDraggable: function( enable ) {
        this._draggable = enable;
    },

    addChildToCenter: function( child, localZOrder, tag ) {
        child.x = this.width / 2;
        child.y = this.height / 2;
        this.addChild( child, localZOrder, tag );
    }
} );