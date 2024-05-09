var Renderer_top = {
    init : function () {
        $('#gizmo_hide').on( 'click', this.hide.bind(this) );
        $('#gizmo_move').on( 'click', this.move.bind(this) );
        $('#gizmo_rotate').on( 'click', this.rotate.bind(this) );
        $('#gizmo_scale').on( 'click', this.scale.bind(this) );

        $('#zoom_in').on( 'click', this.zoomIn.bind(this) );
        $('#zoom_out').on( 'click', this.zoomOut.bind(this) );
    },

    hide : function () {
        Genie.GizmoController.hideGizmo();
    },

    move : function () {
        Genie.GizmoController.showMoveGizmo();
    },

    rotate : function () {
        Genie.GizmoController.showRotateGizmo();
    },

    scale : function () {
        Genie.GizmoController.showScaleGizmo();
    },

    zoomIn : function () {
        Genie.MainScene.zoomIn();
    },

    zoomOut : function () {
        Genie.MainScene.zoomOut();
    },
};