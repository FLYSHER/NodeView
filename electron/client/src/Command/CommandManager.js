var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.CommandManager = {
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

    clear : function () {
        if( this.commands.length <= 0 || this._currentIndex >= this.commands.length ) {
            return;
        }
        this._currentIndex = -1;
        var parent = document.getElementById('div_command_log' );
        while( parent.firstChild ) {
            parent.removeChild(parent.firstChild);
        }
        this.commands = [];
    },

    onclick : function ( command ) {
        if (this.commands.length <= 0 || this._currentIndex >= this.commands.length) {
            return;
        }
        command.execute();
    }
};