Genie.Command = Genie.Command || {};

Genie.CommandType = {
    EXECUTE : 0,
    UNDO    : 1,
    REDO    : 2
};

Genie.CommandString = [
    "EXECUTE",
    "UNDO",
    "REDO"
];

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
        this._logTitle   = null;
        this._logContent = null;
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

    setCommandLog : function( commandType, strCommand, targetName, strValue ) {
        var log_title = "[" + Genie.CommandString[ commandType ] + "] " + this.getCommandName() + " > " + strCommand;

        var parent = document.getElementById('div_command_log' );
        HtmlHelper.createCommandLog( parent, log_title, targetName, strValue );
    },

    execute : function() {
        this.setCommand( Genie.CommandType.EXECUTE );
    },

    undo : function() {
        this.setCommand( Genie.CommandType.UNDO );
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