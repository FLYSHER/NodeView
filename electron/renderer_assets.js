var AssetRenderer = {
    assetElement : null,
    assetRoot    : null,
    imageRoot    : null,

    init : function() {
        $(".assets").append("<ol></ol>");
    },

    addAssets : function( path ) {
        if( Array.isArray( path ) ) {
            path.forEach( function( item ){
                this.addAsset( item );
            }.bind(this));
        }
        else {
            this.addAsset( path );
        }
    },

    addAsset : function( path ) {
        var dirName  = cc.path.dirname( path);
        var basename =  cc.path.basename( path );

        if( dirName === "" ) {
            basename = path;
        }
        var li = $(`<li class="asset"></li>`).text( basename );
        $(".assets ol").append(li);
        $(`.asset:contains("${basename}")`).click( function(){
            alert($(this).text());
        } )
    },


    removeAsset : function( path ) {

    },


}