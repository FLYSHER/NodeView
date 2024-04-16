var Genie = Genie || {};
Genie.Test = Genie.Test || {};

Genie.Test.CommandLogViewNode = cc.Node.extend({
    ctor() {
        this.initProperties();
        this._super();

        this.setName( "Genie.Test.CommandLogViewNode" );

        this.initUI();
        this.registerEvent();
    },

    initProperties () {
        this.frameWindow = null;
    },

    initUI () {
        this.frameWindow = new Genie.Test.TestWindowFrame(
            " Command Log ",
            Genie.Offset.COMMAND_LOG_VIEW_SIZE.WIDTH,
            Genie.Offset.COMMAND_LOG_VIEW_SIZE.HEIGHT,
        );
        this.addChild( this.frameWindow );
    },

    registerEvent () {
        cc.eventManager.addCustomListener( EVT.COMMAND_LOG.EXECUTE, this.onExecute.bind(this) );
        cc.eventManager.addCustomListener( EVT.COMMAND_LOG.REDO, this.onRedo.bind(this) );
        cc.eventManager.addCustomListener( EVT.COMMAND_LOG.UNDO, this.onUndo.bind(this) );
    },

    onExecute ( data ) {
        const { log_title, target, log } = data._userData;
        this.frameWindow.addCommand(
            `${Genie.Utils.fixStringLength(log_title, 40)}` +
            `${Genie.Utils.fixStringLength(target, 40)}` +
            `${Genie.Utils.fixStringLength(log, 100)}`,
            null,
            14,
        );
    },

    onRedo () {

    },

    onUndo () {

    },
});