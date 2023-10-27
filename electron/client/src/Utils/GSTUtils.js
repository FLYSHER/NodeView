var GST = GST || {};

GST.Utils = {
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
}