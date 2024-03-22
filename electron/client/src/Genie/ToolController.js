// const { sentryRendererInit } = require('../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};

Genie.ToolController = {
    arrSelectedNode : [],

    reset : function() {
        this.arrSelectedNode.length = 0;
    },

    isSelectedNode : function( node ) {
        var findIdx = this.arrSelectedNode.findIndex( function( item ) {
            return node.__instanceId === item.__instanceId;
        });
        return ( findIdx >= 0 );
    },

    getSelectedNodes : function () {
        return this.arrSelectedNode;
    },

    getSelectNode : function() {
        return this.arrSelectedNode[0];
    },

    addSelectNode : function( node, multiSelect ) {
        if( this.isSelectedNode( node ) === false ) {
            var loc_multiSelected = !!multiSelect;
            if( loc_multiSelected === false ) {
                this.removeAllSelectNode();
            }

            this.arrSelectedNode.push( node );
            Genie.GizmoController.attachGizmo( node );
        }
    },

    removeAllSelectNode : function() {
        var i, selectNode;
        for( i = 0; i < this.arrSelectedNode.length; ++i ) {
            selectNode = this.arrSelectedNode[i];
            this.removeSelectNode( selectNode );
        }
    },

    removeSelectNode : function( node ) {
        if( this.isSelectedNode( node ) === true ) {
            Genie.GizmoController.detachGizmoByTargetNode( node );
            this._removeSelectNode( node );
        }
    },

    _removeSelectNode : function( node ) {
        var findIdx = this.arrSelectedNode.findIndex( function( item ) {
            return node.__instanceId === item.__instanceId;
        });

        if( findIdx >= 0 ) {
            this.arrSelectedNode.splice( findIdx, 1 );
        }
    },
}