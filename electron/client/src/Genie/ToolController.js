var Genie = Genie || {};

Genie.ToolController = {
    arrSelectedNode : [],
    screenScale : 1.0,

    reset : function() {
        this.arrSelectedNode.length = 0;
    },

    /** @returns {boolean} */
    isSelectedNode : function( node ) {
        return node && this.arrSelectedNode.some(item => item.__instanceId === node.__instanceId);
    },

    /** @returns {Array<node>} */
    getSelectedNodes : function () {
        return this.arrSelectedNode;
    },

    /** @returns {node | null} */
    getSelectNode : function() {
        return this.arrSelectedNode[0];
    },

    /** @taegyun.han 다중 선택 기본 지원 24.07.12 */
    addSelectNode : function( node ) {
        if( !(this.isSelectedNode(node)) ){
            this.arrSelectedNode.push(node);
            Genie.GizmoController.attachGizmo(node);
        }
    },

    removeAllSelectNode : function() {
        this.arrSelectedNode.forEach((node) => {
            Genie.GizmoController.detachGizmoByTargetNode(node);
        });
        this.reset();
    },

    removeSelectNode : function( node ) {
        const findIdx = this.arrSelectedNode.findIndex(item => node.__instanceId === item.__instanceId);

        if (findIdx >= 0) {
            Genie.GizmoController.detachGizmoByTargetNode( node );
            this.arrSelectedNode.splice( findIdx, 1 );
        }
    },

    setScreenScale : function (scale) {
        this.screenScale = scale;
    },

    getScreenScale : function () {
        return this.screenScale;
    },
}