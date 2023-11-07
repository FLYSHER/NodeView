Genie.ToolController = {
    commands : [],

    execute : function( command ) {
        command.execute();
        this.commands.push( command );

        cc.log( "[command] execute : ", command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
    },

    undo : function() {
        var command = this.commands.pop();
        command && command.undo();
        if( command ) {
            cc.log( "[command] undo : ", command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
        }
    },

    moveNode : function( targetNode, pos ) {
        // main view
        targetNode.setPosition( pos );

        // inspector
        var transComp = targetNode.getComponent('Transform');
        transComp.setInspectorPosition( pos.x, pos.y );
    },
};