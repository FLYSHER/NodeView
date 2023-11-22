/**
 * Assset 패널 관리
 */
var AssetRenderer = {
    treeDataArr : [],

    init : function() {
        $("#assets").jstree({
            'core' : {
                'themes' : {
                    "name": "default-dark",
                    "dots": false,
                    "icons": false
                },
                'data' : [
                ],
                // 'check_callback' : true // false 면 drag 는 되는데 이동은 안된다.
            },
            // "plugins": ["search", "dnd"], // search, drag and drop
            "plugins": ["search"], // search, drag and drop
            "search": {
                "case_sensitive": false,
                "show_only_matches": true
            }
        });

        $('#assets').on("changed.jstree", function (e, data) {
            console.log( e, data );

            var selectedFileName = data.selected[0];
            cc.eventManager.dispatchCustomEvent( 'setPreviewSprite', { name : selectedFileName } );
        });

        $('#assets').on("drag", function( e ){
            cc.log("drag", e.target.innerText );
            e.originalEvent.dataTransfer.setData( "spriteName", e.target.innerText );
        });


        var findTextInputHTML = `<input id="assets_findInput" class="frameBar_findInput"  type="text" value="" >`;
        $('#assets_bar_root').append( findTextInputHTML );

        $('#assets_findInput').change( function( event ){
            console.log("find assets > ", event.target.value );
            var searchString = event.target.value;
            $('#assets').jstree('search', searchString);
        } );
    },

    isExistAsset : function( id, parentID ) {
        var findOjb = this.treeDataArr.find( function (item){
            return ( item.parent === parentID && item.id === id );
        })

        return !!findOjb;
    },

    /**
     *
     */
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
}