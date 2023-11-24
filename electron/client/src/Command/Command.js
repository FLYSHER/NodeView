Genie.Command = Genie.Command || {};

Genie.CommandType = {
    EXECUTE : 0,
    UNDO    : 1,
    REDO    : 2
};

Genie.Command.Base = cc.Class.extend({
    ctor : function( name, targetNode, args ) {
        this.initProperty();
        this._name      = name;
        this._targetNode= targetNode;
        this._args      = args;
    },

    initProperty : function() {
        this._targetNode = null;
        this._args       = null;
        this._name       = null;
        this._commandDiv = null;
    },

    getCommandName : function() {
        return this._name;
    },

    getTargetNode : function() {
        return this._targetNode;
    },

    getArgsObj : function() {
        return this._args;
    },

    setCommand : function( commandType ) {
        throw Error("override");
    },

    setCommandLog : function( commandType, targetName, strValue ) {
        var log_title = this.getCommandName();
        var parent = document.getElementById('div_command_log' );

        switch ( commandType ) {
            case Genie.CommandType.EXECUTE:
                if( !this._commandDiv ) {
                    this._commandDiv = HtmlHelper.createCommandLog( parent, log_title, targetName, strValue );
                }
                break;
            case Genie.CommandType.REDO:
                this._commandDiv && ( this._commandDiv.style.background = "##363636");
                break;
            case Genie.CommandType.UNDO:
                this._commandDiv && ( this._commandDiv.style.background = "#777777");
                break;
        }



    },

    execute : function() {
        this.setCommand( Genie.CommandType.EXECUTE );
    },

    undo : function() {
        this.setCommand( Genie.CommandType.UNDO );
    },

    redo : function() {
        this.setCommand( Genie.CommandType.REDO )
    },

    setInspectorView : function ( componentName, value ) {
        var comp = this._targetNode.getComponent( componentName);
        if( !comp ) {
            return;
        }

        comp.setInspectorValue( {
            args    : this._args,
            value   : value,
        });
    }


});