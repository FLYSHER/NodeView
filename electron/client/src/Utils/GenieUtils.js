var Genie = Genie || {};

Genie.Utils = {
    drawAllComponentInspector : function( node ) {
        var components = node._componentContainer._components;
        var comp;
        for( var key in components )
        {
            comp = components[key];
            comp.drawInspector && comp.drawInspector();
        }
    },

    getNodeWorldPosition : function( node ) {
        if( node instanceof ccui.Widget ) {
            return node.getWorldPosition();
        }
        else {
            var parent = node.getParent();
            parent = !!parent ? parent : node;
            return parent.convertToWorldSpace( node.getPosition() );
        }
    },

    componentToHex : function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },

    rgbToHex : function(colorOrR, g, b) {
        if( arguments.length === 1 ) {
            g = colorOrR.g;
            b = colorOrR.b;
            colorOrR = colorOrR.r;
        }
        return "#" + Genie.Utils.componentToHex(colorOrR) + Genie.Utils.componentToHex(g) + Genie.Utils.componentToHex(b);
    },

    //
    getSpriteFrameTextureName : function( spriteFrameName ) {
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( spriteFrameName );
        if( !spriteFrame ) {
            return null;
        }

        var meta, frames,
            frameConfigCache = cc.spriteFrameCache._frameConfigCache;
        for( var key in frameConfigCache ) {
            meta    = cc.spriteFrameCache._frameConfigCache[key].meta;
            frames  = cc.spriteFrameCache._frameConfigCache[key].frames;

            if( frames.hasOwnProperty( spriteFrameName ) ) {
                return meta.image;
            }
        }
    },

    getScreenCenterPos : function() {
        return cc.p( cc.winSize.width/2, cc.winSize.height/2 );
    },
}