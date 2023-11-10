Genie.Command = Genie.Command || {};

Genie.CommandType = {
    EXECUTE : 0,
    UNDO    : 1,
    REDO    : 2
}

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

    execute : function() {
        throw Error('Do Override ');
    },

    undo : function() {
        throw Error('Do Override ');
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