/**
 * Assset 패널 관리
 */
var { clipboard } = require('electron');
const Renderer_assets = {
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

        const selectedFileName = data.selected[0];
        try {
            clipboard.writeText(selectedFileName);
        } catch (e) {

        }
        const resType = (data && data.node && data.node.data) ? data.node.data['resType'] : -1;
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

        const searchString = event.target.value;
        $('#assets').jstree('search', searchString);
    },

    isExistAsset : function( id, parentID ) {
        return this.treeDataArr.some(item => item.parent === parentID && item.id === id);
    },

    /**
     *
     */
    addAsset : function( path, resType /* Genie.ResType */ ) {
        console.log("*** add addAsset  **** ", path );
        const dirName  = cc.path.dirname(path);
        const basename =  cc.path.basename(path);
        const isDirNameEmpty = dirName.length === 0;

        // step1. folder 체크 및 추가
        const arrDir = isDirNameEmpty ? [path] : dirName.split("/");
        arrDir.reduce((parentId, id) => {
            this.addAssetToHierarchy(id, parentId);
            return id;
        }, '#');

        // step2. 바로 위 폴더 구하기
        const id = isDirNameEmpty ? path : basename;
        const parentID = arrDir.length === 0 ? "#" : arrDir[arrDir.length - 1];

        // step3. 에셋 추가
        this.addAssetToHierarchy( id, parentID, { resType : resType } );
        if( cc.path.extname( id ) === ".plist" ) {
            const frameConfig = cc.spriteFrameCache._frameConfigCache[path];
            const frames = frameConfig.frames;
            for (let key in frames) {
                this.addAssetToHierarchy(key, basename, {resType: Genie.ResType.SPRITE});
            }
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

    // 다른 영역에서 에셋 트리구조내에서 find 기능 호출
    // find input 에 해당 파일명 자동 입력 및 find
    findAssetFromOtherArea : function ( fileBaseName ) {
        $('#assets_findInput').val(fileBaseName);
        $('#assets').jstree('search', fileBaseName);
    },
}