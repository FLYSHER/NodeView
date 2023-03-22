var AssetRenderer = {
    treeDataArr : [],

    init : function() {
        $("#assets").jstree();
        $('#assets').on("changed.jstree", function (e, data) {
            console.log( e, data );

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
        if( this.isExistAsset( folderID, parentID ) ) {
            console.log("**** directory already exist *** : ", parentID, folderID );
            return;
        }

        this.treeDataArr.push( {
            "id"        : folderID,
            "parent"    : parentID,
            "text"      : folderID
        } )
    },

    isExistAsset : function( id, parentID ) {
        var findOjb = this.treeDataArr.find( function (item){
            return ( item.parent === parentID && item.id === id );
        })

        return !!findOjb;
    },

    addAsset : function( path ) {
        console.log("*** add addAsset  **** ", path );
        var dirName  = cc.path.dirname( path);
        var basename =  cc.path.basename( path );

        var i, id, parentID, arrDir;
        // step1. folder 체크 및 추가
        if( dirName.length === 0 ) { // empty string
            parentID = '#';
            id       = path;
            this.addAssetToHierarchy( id, parentID );
        }
        else {
            arrDir = dirName.split("/"); /** aaa/bbb/cccc ==> [aaa, bbb, ccc] */

            for( i = 0; i < arrDir.length; ++i ) {
                parentID = ( i === 0 ) ? '#' : arrDir[ i -1 ];
                id       = arrDir[i];
                this.addAssetToHierarchy( id, parentID );
            }
        }



        // step2. 바로 위 폴더 구하기
        if( dirName.length === 0 ) {
            parentID = '#';
            id       = path;
        }
        else {
            arrDir   = dirName.split("/");
            id       = basename;
            parentID = arrDir.length === 0 ? "#" : arrDir[ arrDir.length - 1 ];
        }

        // step3. 에셋 추가
        if( cc.path.extname( id ) === ".plist" ) {
            this.addAssetToHierarchy( id, parentID )

            var frameConfig = cc.spriteFrameCache._frameConfigCache[path];
            var frames = frameConfig.frames;

            for( var key in frames ) {
                this.addAssetToHierarchy( key, basename );
            }
        }
        else {
            this.addAssetToHierarchy( id, parentID );
        }

    },

    addAssetToHierarchy : function( id, parentID ) {
        console.log("*** add hierarchy  **** ", id, parentID );
        if( this.isExistAsset( id, parentID ) ) {
            console.log(" >> already exist : ", id, parentID );
            return;
        }

        this.treeDataArr.push({
            "id"        : id,
            "parent"    : parentID,
            "text"      : id
        });

        $("#assets").jstree(true).settings.core.data = this.treeDataArr;
        $(`#assets`).jstree("refresh");
    },


    /**
     *
     * @param path  ex) image/aa.png
     */
    // addAsset : function( path ) {
    //     var dirName  = cc.path.dirname( path);
    //     var basename =  cc.path.basename( path );
    //
    //     var parentID;
    //
    //     // 폴더 생성 및 부모 폴더 찾기
    //     if( dirName.length === 0 ) // empty string
    //     {
    //         basename = path;
    //         parentID = '#';
    //     }
    //     else {
    //         var arrDir = dirName.split("/"); /** aaa/bbb/cccc ==> [aaa, bbb, ccc] */
    //
    //         for( var i = 0; i < arrDir.length; ++i ) {
    //             parentID = ( i === 0 ) ? '#' : arrDir[ i - 1];
    //             this.addDirectory( parentID, arrDir[i] );
    //         }
    //         parentID = arrDir[i-1];
    //     }
    //
    //     // 부모 폴더에 에셋 추가
    //     if( cc.path.extname( basename ) === ".plist" ) {
    //         var dirID = cc.path.mainFileName( basename );
    //         this.addDirectory( parentID, dirID );
    //
    //         parentID = dirID;
    //         var frameConfig = cc.spriteFrameCache._frameConfigCache[path];
    //         var frames = frameConfig.frames;
    //
    //         for( var key in frames ) {
    //             this.treeDataArr.push({
    //                 "id"        : key,
    //                 "parent"    : parentID,
    //                 "text"      : key
    //             });
    //         }
    //
    //     }
    //     else {
    //         this.treeDataArr.push({
    //             "id"        : basename,
    //             "parent"    : parentID,
    //             "text"      : basename
    //         });
    //
    //     }
    //
    //     console.log(this.treeDataArr);
    //     $("#assets").jstree(true).settings.core.data = this.treeDataArr;
    //     $(`#assets`).jstree("refresh");
    // },

    removeAsset : function( path ) {

    },


}