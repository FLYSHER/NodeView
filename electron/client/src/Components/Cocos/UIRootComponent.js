// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Component = Genie.Component || {};

// 기본 노드 프로퍼티
Genie.Component.UIRoot = Genie.Component.InspectorBase.extend({
    ctor : function ( jsonName ) {
        this._super();
        this.setName( 'UIRoot' );
        this._jsonName = jsonName;
    },

    // do overried
    drawInspector : function() {
        var owner = this.getOwner();

        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-sharp fa-solid fa-arrows-up-down-left-right",
            style : "color: #d0b8f4;"
        }
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        // using textures
        this.drawRelativeData( rootDiv );

        // ui action group
    },

    drawRelativeData : function( parent ) {
        var div_group = HtmlHelper.createDiv( parent, 'component_groupDiv' );
        HtmlHelper.createLabel( div_group, "relativeData", "component_groupTitleLabel" );

        // var json = cc.loader.getRes(file);
        var fileName = this.getOwner().getName() + ".ExportJson";
        var json     = cc.loader.getRes( fileName );

        var textures    = json['textures'];
        var texturesPng = []; //json['texturesPng'];

        textures.forEach( function( item ){
            texturesPng.push( item.replace( ".plist", ".png" ) );
        });

        textures = textures.concat( texturesPng );
        var li_plist = HtmlHelper.createFolderItem( 'Atlas', textures );
        div_group.appendChild( li_plist );
    },

    onchange : function( event ) {
        var value = parseFloat(event.target.value);
        switch ( event.target ) {

        }
    },

});