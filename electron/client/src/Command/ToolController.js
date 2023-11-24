Genie.ToolController = {
    commands        : [],
    _currentIndex   : -1,

    execute : function( command ) {
        this.commands.push( command );
        this._currentIndex = this.commands.length - 1;

        command.execute();

        cc.log( "[command] execute : ", command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
    },

    undo : function() {
        if( this.commands.length <= 0 || this._currentIndex < 0 ) {
            return;
        }

        var command = this.commands[ this._currentIndex ];
        // var command = this.commands.pop();
        command && command.undo();
        if( command ) {
            cc.log( "[command] undo : ", command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
        }

        --this._currentIndex;
    },

    redo : function() {
        if( this.commands.length <= 0 || this._currentIndex >= this.commands.length ) {
            return;
        }
        var command = this.commands[ this._currentIndex ];
        // var command = this.command.pop();
        command && command.redo();
        if( command ) {
            cc.log( "[command] redo : ", command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
        }

        ++this._currentIndex;
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