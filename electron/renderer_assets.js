// const { sentryRendererInit } = require('./sentryRenderer');
// sentryRendererInit();
// const { ipcRenderer } = require('electron');

/**
 * Assset 패널 관리
 */
var Renderer_assets = {
    treeDataArr : [],
    Tag         : "[AssetView] ",

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

        // tree 선택 노드 변경시 이벤트 리스너 등록
        $('#assets').on("changed.jstree", this.onchangeTree );

        // tree node 드레그 스타트 리스너 등록
        $('#assets').on("dragstart", this.onDragStartTreeNode );

        // 에셋 검색 시
        $('#assets_findInput').change( this.onchangeInputFind );
    },

    // 트리 선택 노드 변경시
    onchangeTree : function( e, data ) {
        cc.log( Renderer_assets.Tag, "*** onchange tree *** : ", data.selected[0], e, data );

        var selectedFileName = data.selected[0];
        var resType = -1;
        if( data && data.node && data.node.data ) {
            resType = data.node.data['resType'];
        }
        cc.eventManager.dispatchCustomEvent( 'onSetPreviewSprite', {
            name    : selectedFileName,
            resType : resType
        } );
    },

    // 트리 노드 드레그 시작
    onDragStartTreeNode : function( e ) {
        cc.log( Renderer_assets.Tag, "*** drag start *** : ", e.target.innerText );
        e.originalEvent.dataTransfer.setData( "assetName", e.target.innerText );
    },

    //
    onchangeInputFind : function( event ) {
        cc.log( Renderer_assets.Tag, "*** find asset *** : ", event.target.value );

        var searchString = event.target.value;
        $('#assets').jstree('search', searchString);
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
    addAsset : function( path, resType /* Genie.ResType */ ) {
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
            this.addAssetToHierarchy( id, parentID, { resType : resType } )

            // var frameConfig = cc.spriteFrameCache._frameConfigCache[path];
            // var frames = frameConfig.frames;

            for( var key in frames ) {
                this.addAssetToHierarchy( key, basename, { resType : Genie.ResType.SPRITE } );
            }
        }
        else {
            this.addAssetToHierarchy( id, parentID, { resType : resType } );
        }

    },

    /**
     *
     * @param id
     * @param parentID
     * @param customDataObj
     */
    addAssetToHierarchy : function( id, parentID, customDataObj ) {
        console.log("*** add hierarchy  **** ", id, parentID );
        if( this.isExistAsset( id, parentID ) ) {
            console.log(" >> already exist : ", id, parentID );
            return;
        }

        this.treeDataArr.push({
            "id"        : id,
            "parent"    : parentID,
            "text"      : id,
            "data"      : customDataObj || undefined
        });

        $("#assets").jstree(true).settings.core.data = this.treeDataArr;
        $(`#assets`).jstree("refresh");
    },
}

window.addEventListener('message', function( event ){
    console.log("received from child > ", event.data );
});

// 부모 렌더러에서 메시지 수신
window.ipcRenderer.receive('message-to-renderer', (event, message) => {
    console.log('자식 메인프로세스로부터 부모 렌더러에서 받은 메시지:', message);
});