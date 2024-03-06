//
Genie.Command.TransformPosition = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'TransformPosition', targetNode, args );
    },

    // override
    setCommandOnMainView : function( value ) {
        this._targetNode.setPosition( value );
        // Genie.gizmoNode.followTarget( this._targetNode );
    },

    // override
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.TRANSFORM );
        if( !component ) {
            return;
        }

        component.refreshPositionValue( value );
    },

    // override
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( "move  > x: %d, y: %d ", value.x, value.y );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },
});

//
Genie.Command.TransformScale = Genie.Command.Base.extend({
    ctor : function( targetNode, args ) {
        this._super( 'TransformScale', targetNode, args );
    },

    // main view 에 command 처리
    setCommandOnMainView : function( value ) {
        this._targetNode.setScale( value.x, value.y );
        // Genie.gizmoNode.followTarget( this._targetNode );
    },

    // 인스펙터 에 command 처리
    setCommandOnInspector : function( value ) {
        var component = this._targetNode.getComponent( Genie.ComponentName.TRANSFORM );
        if( !component ) {
            return;
        }

        component.refreshScaleValue( value );
    },

    // 로그 뷰에 command 처리
    setCommandOnLogView : function( commandType, value ) {
        var strText = cc.formatStr( "move  > x: %d, y: %d ", value.x, value.y );
        this.setCommandLog( commandType, this._targetNode.getName(), strText );
    },
});