var AssetRenderer = {
    assetElement : null,

    assetRoot         : null,
    imageRoot    : null,

    init : function() {
        this.assetElement = $(".assets");
        this.assetRoot = this.assetElement.append("<ol>assets</ol>");
        this.assetRoot.id = "assetRoot";
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
        var basename =  cc.path.basename( path );
        var item = this.assetRoot.append("<li>" + basename + "</li>");
        item.id = basename;
    },

    removeAsset : function( path ) {

    },


}