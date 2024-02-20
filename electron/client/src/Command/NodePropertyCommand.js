
Genie.Command.NodeName = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'NodeName', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setName( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshNodeName( value );
    },

    // override
    setCommandOnHierarchy : function( value ) {
        // 계층뷰에서 트리노드에 해당 이름 변경
        var treeNodeID  = this._targetNode.__instanceId;
        var params = {
            id   : treeNodeID,
            name : value,
        };

        cc.eventManager.dispatchCustomEvent( 'onRenameTreeNode', params );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( "name  > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.AnchorPoint = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'AnchorPoint', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setAnchorPoint( value );
        Genie.gizmoNode.followTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshAnchorValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.ContentSize = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'ContentSize', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setContentSize( value );
        Genie.gizmoNode.refreshContentSize( this._targetNode );
        Genie.gizmoNode.followTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshContentSize( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value.width, value.height );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.LocalZOrder = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'LocalZOrder', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setLocalZOrder( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshZOrderValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.NodeVisible = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'NodeVisible', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setVisible( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshVisibleValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.Opacity = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'Opacity', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setOpacity( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshOpacityValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

Genie.Command.CascadeOpacity = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'CascadeOpacity', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setCascadeOpacityEnabled( value );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.NODE_PROPERTY );
        component && component.refreshCascadeOpacityValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( this.getCommandName() + " > ", value );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },

});

