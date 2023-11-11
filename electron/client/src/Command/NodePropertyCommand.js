Genie.Command.NodeProperty = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'NodeProperty', targetNode, args );
    },

    setCommand : function( commandType ) {
        var componentName = 'NodeProperty';
        var value = ( commandType === Genie.CommandType.EXECUTE ) ? this._args.dest : this._args.src;

        switch ( this._args.strProp ) {
            case 'anchor':
                this._targetNode.setAnchorPoint( value );
                break;
            case 'size':
                this._targetNode.setContentSize( value);
                break;
            case 'zorder':
                this._targetNode.setLocalZOrder( value );
                break;
            case 'visible':
                this._targetNode.setVisible( value );
                break;
        }

        Genie.gizmoNode.followTarget( this._targetNode );
        this.setInspectorView( componentName, value );
    },



});