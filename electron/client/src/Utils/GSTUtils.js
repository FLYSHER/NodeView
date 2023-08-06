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
}