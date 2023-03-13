var AssetRenderer = {
    treeDataArr : [],

    init : function() {
        $("#assets").jstree();
        $('#assets').on("changed.jstree", function (e, data) {
            console.log( e, data );setPreviewSprite

            var selectedFileName = data.selected[0];
            cc.eventManager.dispatchCustomEvent( 'setPreviewSprite', { name : selectedFileName } );
        });
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
        if( this.isExistDirectory( parentID, folderID ) ) {
            console.log("**** directory already exist *** : ", parentID, folderID );
            return;
        }

        this.treeDataArr.push( {
            "id"        : folderID,
            "parent"    : parentID,
            "text"      : folderID
        } )
    },

    isExistDirectory : function( parentID, dirName ) {
        var findOjb = this.treeDataArr.find( function (item){
            return ( item.parent === parentID && item.id === dirName );
        })

        return !!findOjb;
    },

    addAsset : function( path ) {
        var dirName  = cc.path.dirname( path);
        var basename =  cc.path.basename( path );

        var parentID;

        // 폴더 생성 및 부모 폴더 찾기
        if( dirName === "" ) {
            basename = path;
            parentID = '#';
        }
        else {
            var arrDir = dirName.split("/"); /** aaa/bbb/cccc ==> [aaa, bbb, ccc] */

            for( var i = 0; i < arrDir.length; ++i ) {
                parentID = ( i === 0 ) ? '#' : arrDir[ i - 1];
                this.addDirectory( parentID, arrDir[i] );
            }
            parentID = arrDir[i-1];
        }

        // 부모 폴더에 에셋 추가
        if( cc.path.extname( basename ) === ".plist" ) {
            var dirID = cc.path.mainFileName( basename );
            this.addDirectory( parentID, dirID );

            parentID = dirID;
            var frameConfig = cc.spriteFrameCache._frameConfigCache[path];
            var frames = frameConfig.frames;

            for( var key in frames ) {
                this.treeDataArr.push({
                    "id"        : key,
                    "parent"    : parentID,
                    "text"      : key
                });
            }

        }
        else {
            this.treeDataArr.push({
                "id"        : basename,
                "parent"    : parentID,
                "text"      : basename
            });

        }

        console.log(this.treeDataArr);
        $("#assets").jstree(true).settings.core.data = this.treeDataArr;
        $(`#assets`).jstree("refresh");
    },

    removeAsset : function( path ) {

    },


}