Genie.Command.UIText = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'UIText', targetNode, args );
    },

    setCommand : function( commandType /* Genie.CommandType */ ) {
        var componentName = 'UITextView';

        var value = ( commandType === Genie.CommandType.EXECUTE ) ? this._args.dest : this._args.src;

        switch ( this._args.strProp ) {
            case 'fontSize':
                this._targetNode.setFontSize( value );
                this.setInspectorView( componentName, value );
                break;
            case 'text':
                this._targetNode.setString( value );
                this.setInspectorView( componentName, value );
                break;
            case 'textColor':
                this._targetNode.setTextColor( value );
                this.setInspectorView( componentName, value );
                break;
            case 'shadowEnable':
                if( value === false ) {
                    this._targetNode._labelRenderer.disableShadow();
                }
                else {
                    this._targetNode.enableShadow(
                        this._args.color,
                        this._args.offset,
                        this._args.radius
                    );
                }
                this.setInspectorView( componentName, value );
                break;
            case 'outlineEnable':
                if( value === false ) {
                    this._targetNode._labelRenderer.disableStroke();
                }
                else {
                    this._targetNode.enableOutline(
                        this._args.color,
                        this._args.size
                    );
                }
                this.setInspectorView( componentName, value );
                break;
        }
    },

    execute : function() {
        this.setCommand( Genie.CommandType.EXECUTE );
    },

    undo : function() {
        this.setCommand( Genie.CommandType.UNDO );
    },

});