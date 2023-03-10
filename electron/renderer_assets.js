var AssetRenderer = {
    assetElement : null,
    assetRoot    : null,
    imageRoot    : null,

    init : function() {
        //1. asset root node 생성
        var rootNode = $(`<input type="checkbox" id="rootNode">
                          <label for="rootNode"> assets </label>
                          <ul id="dir_root"></ul>
                         `);
        $(".assets").append(rootNode);
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

    addDirectory : function( parentID, folderID ) {
        var folder = $(`<input type="checkbox" id="${folderID}">   
                        <label for="${folderID}"> ${folderID} </label>
                        <ul id="dir_${folderID}"></ul>` );

        $(`#${parentID}`).append( folder );
        console.log("*** add directory **** ", parentID, "dir_" + folderID );
    },

    isExistDirectory : function( dirName ) {
        var dirID = "dir_" + dirName;
        var dir = $(`#${dirID}`);
        console.log( "dirID, dir : ", dirID, dir );
        return ( dir.length > 0 );
    },

    addAsset : function( path ) {
        var dirName  = cc.path.dirname( path);
        var basename =  cc.path.basename( path );

        console.log( " *** addAsset **** : ", path );
        console.log( "*** dirName : *** ", dirName );
        var parentID;

        // 폴더 생성 및 부모 폴더 찾기
        if( dirName === "" ) {
            basename = path;
            parentID = 'dir_root';
        }
        else {
            var arrDir = dirName.split("/"); /** aaa/bbb/cccc ==> [aaa, bbb, ccc] */

            for( var i = 0; i < arrDir.length; ++i ) {
                if( !this.isExistDirectory( arrDir[i] ) ) {
                    parentID = ( i === 0 ) ? 'dir_root' : arrDir[ i - 1];
                    this.addDirectory( parentID, arrDir[i] );
                }
            }
            parentID = "dir_" + arrDir[i-1];
        }

        // 부모 폴더에 에셋 추가
        if( cc.path.extname( basename ) === ".plist" ) {
            var dirID = cc.path.mainFileName( basename );
            this.addDirectory( parentID, dirID );

            parentID = "dir_" + dirID;
            var frameConfig = cc.spriteFrameCache._frameConfigCache[path];
            var frames = frameConfig.frames;

            for( var key in frames ) {
                console.log("frame > ", key );
                var li = $(`<li class="asset"></li>`).text( key );
                $(`#${parentID}`).append(li);
                $(`.asset:contains("${key}")`).click( function( frameName ){
                    cc.eventManager.dispatchCustomEvent( 'setPreviewSprite', { name : frameName } );
                }.bind( this, key ));
            }

        }
        else {
            var li = $(`<li class="asset"></li>`).text( basename );
            $(`#${parentID}`).append(li);
            $(`.asset:contains("${basename}")`).click( function(){
                alert($(this).text());
            });
        }


    },

    removeAsset : function( path ) {

    },


}