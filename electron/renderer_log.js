var Renderer_log = {
    init : function () {
        $('#log_undo').on( 'click', this.undo.bind(this) );
        $('#log_redo').on( 'click', this.redo.bind(this) );
        $('#log_clear').on( 'click', this.clear.bind(this) );
    },

    undo : function () {
        Genie.CommandManager.undo();
    },

    redo : function () {
        Genie.CommandManager.redo();
    },

    clear : function () {
        Genie.CommandManager.clear();
    },
};