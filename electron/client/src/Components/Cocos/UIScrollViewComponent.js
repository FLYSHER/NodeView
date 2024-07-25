var Genie = Genie || {};
Genie.Component = Genie.Component || {};

Genie.Component.UIScrollView = Genie.Component.InspectorBase.extend({
    ctor : function() {
        this._super();
        this.setName( Genie.ComponentName.UI_SCROLL_VIEW );
    },

    //override
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();
        var iconObj = {
            className : "fa-solid fa-bezier-curve",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // container size
        var contentSize = owner.getContentSize();
        this._input_size = HtmlHelper.createSizeAttrib( rootDiv, "content size", [contentSize.width, contentSize.height], [ true, true ], this.onchange.bind(this) );

        // inner container size
        var innerSize   = owner.getInnerContainerSize(),
            innerPos    = owner.getInnerContainerPosition();

        this._input_innerSize = HtmlHelper.createSizeAttrib( rootDiv, "inner size", [innerSize.width, innerSize.height], [ true, true ], this.onchange.bind(this) );
        HtmlHelper.createPointAttrib( rootDiv, 'inner position', [innerPos.x, innerPos.y], [true, true], this.onchange.bind(this) );

        // scroll direction
        var direction = owner.getDirection(),
            isHorizontal = (direction === ccui.ScrollView.DIR_HORIZONTAL) || (direction === ccui.ScrollView.DIR_BOTH),
            isVertical   = (direction === ccui.ScrollView.DIR_VERTICAL) || (direction === ccui.ScrollView.DIR_BOTH);

        HtmlHelper.createCheckboxAttrib( rootDiv, 'horizontal scroll', isHorizontal, true, null);
        HtmlHelper.createCheckboxAttrib( rootDiv, 'vertical scroll', isVertical, true, null);

        // scroll bar
        var showScrollBar = owner.isScrollBarEnabled();
        HtmlHelper.createCheckboxAttrib( rootDiv, 'show scroll bar', showScrollBar, true, null);

        // bounce
        var isBounceEnabled = owner.isBounceEnabled();
        HtmlHelper.createCheckboxAttrib( rootDiv, 'bounce effect', isBounceEnabled, true, null);

    },

    onchange : function ( event ) {
        var owner = this.getOwner();
        var value = event.target.value;
        var loc_src, loc_dest;

        switch (event.target) {
            case this._input_size.width:
            case this._input_size.height:
                loc_src = owner.getContentSize();
                loc_dest = ( event.target === this._input_innerSize.width ) ? cc.size( Math.round(value), loc_src.height ) : cc.size( loc_src.width, Math.round(value) );
                this.onchange_sizeValue( loc_src, loc_dest );
                break;
            case this._input_innerSize.width:
            case this._input_innerSize.height:
                loc_src = owner.getInnerContainerSize();
                loc_dest = ( event.target === this._input_innerSize.width ) ? cc.size( Math.round(value), loc_src.height ) : cc.size( loc_src.width, Math.round(value) );
                this.onchange_innerSizeValue( loc_src, loc_dest );
                break;
        }
    },

    onchange_render : function( event ) {
        var owner = this.getOwner();
        var value, strValue = event.target.value;
    },

    onchange_sizeValue: function ( src, dest ) {
        var command = new Genie.Command.UIScrollViewSize( this.getOwner(), {
            src: src,
            dest: dest
        });

        Genie.CommandManager.execute( command );
    },

    onchange_innerSizeValue: function ( src, dest ) {
        var command = new Genie.Command.UIScrollViewInnerSize( this.getOwner(), {
            src: src,
            dest: dest
        });

        Genie.CommandManager.execute( command );
    },

    refreshSizeValue : function ( value ) {
        this._input_size.width = parseInt(value.width);
        this._input_size.height = parseInt(value.height);
    },

    refreshInnerSizeValue : function ( value ) {
        this._input_innerSize.width = parseInt(value.width);
        this._input_innerSize.height = parseInt(value.height);
    },

    refreshInnerPosValue : function ( value ) {

    },
});
