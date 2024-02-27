Genie.ToolController = {
    commands        : [],
    _currentIndex   : -1,

    execute : function( command ) {
        if( this._currentIndex >= 0 && this._currentIndex < this.commands.length -1 ) {
            var commandToDel = this.commands.splice( this._currentIndex + 1 );

            var i, div;
            for( i = 0; i < commandToDel.length; ++i ) {
                div = commandToDel[i].getCommandElement();
                div && div.remove();
            }
        }

        this.commands.push( command );
        ++this._currentIndex;

        command.execute();
        cc.log( "[command] execute : ", this._currentIndex,  command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
    },

    undo : function() {
        if( this.commands.length <= 0 || this._currentIndex < 0 ) {
            return;
        }

        var command = this.commands[ this._currentIndex ];
        if( command ) {
            command.undo();
            if( --this._currentIndex < 0 ) {
                var i, div;
                for( i = 0; i < this.commands.length; ++i ) {
                    div = this.commands[i].getCommandElement();
                    div && div.remove();
                }

                this.commands.length = 0;
            }

            cc.log( "[command] undo : ", this._currentIndex, command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
        }


    },

    redo : function() {
        if( this.commands.length <= 0 || this._currentIndex >= this.commands.length ) {
            return;
        }
        var command = this.commands[ this._currentIndex + 1 ];
        if( command ) {
            ++this._currentIndex;
            command.redo();
            cc.log( "[command] redo : ", this._currentIndex, command.getCommandName() + " > " + JSON.stringify( command.getArgsObj() ) );
        }


    },

    getCurrentNode : function() {
        return Genie.gizmoLayer.getTargetNode();
    },
};