Genie.ToolController = {
    commands : [],

    execute : function( command ) {
        this.commands.push( command );
        command.execute();

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
        //     var strProp = paramObj.args.strProp;
        //          var value   = paramObj.value;

        var transComp = targetNode.getComponent('Transform');
        transComp.setInspectorValue( {
            args : {
                strProp : 'position',
            },
            value : pos
        } );
    },
};