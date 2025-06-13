const { ipcRenderer } = require('electron');
const sentryRenderer = require("@sentry/electron/renderer");
sentryRenderer.init({
    dsn : 'https://84d805b8c03d8b956113b4e8567cad0d@o4506908221112320.ingest.us.sentry.io/4506908226813952',
});

class FileEntry {

    constructor(fileInfo) {
        this.fullPath = fileInfo.filePath;
        this.isFile = true;
        this.isDirectory = false;
        this.name =  this.fullPath.split(/[\\\/]/).pop();
        this.content =fileInfo.content;
    }

    file(filecb) {
        filecb(this);
    }

}

const Renderer_main = {
    init : function() {
        // main process 와 통신
        ipcRenderer.on('fileDropEventReply', this.onFileDropReply.bind(this) );

        ipcRenderer.on('undo', function(){
            Genie.CommandManager.undo();
        });

        ipcRenderer.on( 'redo', function(){
            Genie.CommandManager.redo();
        });

        ipcRenderer.on('exportFile', (evt, filePath) => {
            let node = Genie.ToolController.getSelectNode();
            // 상단 노드를 찾는다.
            if (node && node.getName() !== "mainLayer") {
                while (node.getParent() && node.getParent().getName() !== "mainLayer") {
                    node = node.getParent();
                }
            }

            const data = this.exportNodeToJson(node, filePath);
            console.log("[export] exportFile ipcRenderer node : ", node);
            console.log("[export] exportFile data : ", data);

            ipcRenderer.send('exportFile', {
                data : data,
                filePath : filePath
            });
        });

        this._initLayoutEvent();
        this._initAssetAreaEvent();
        this._initHierarchyAreaEvent();
        this._initCanvasEventListener();
        this._initDocumentEventListener();
    },

    // 파일 내보내기
    exportNodeToJson : function (node, filePath) {
        if (!node || node.getName() === "mainLayer")
            return null;

        return exportManager.exportNodeToJson(node, filePath);
    },

    // 레이아웃 관련 이벤트 처리
    _initLayoutEvent : function () {
        ipcRenderer.on('save-current-layout-as-default', function () {
            try {
                const config = Renderer_layout.loadConfig();

                const hierarchy = document.getElementById('hierarchy_gridItem');
                const assets = document.getElementById('assets_gridItem');

                const logView = document.getElementById('log_gridItem');
                const secondColumn = document.getElementById('second_column');
                const inspector = document.getElementById('inspector_gridItem');

                const gridContainer = document.getElementById('grid_container');

                if (config.layout_option) {
                    config.layout_option.hierarchy_gridItem.height = hierarchy.style.height;
                    config.layout_option.assets_gridItem.height = assets.style.height;

                    config.layout_option.log_gridItem.height = logView.style.height;
                    config.layout_option.second_column.height = secondColumn.style.height;
                    config.layout_option.inspector_gridItem.height = inspector.style.height;

                    config.layout_option.grid_container.grid_template_column = gridContainer.style.gridTemplateColumns;

                    Renderer_layout.saveConfig(config);
                    ipcRenderer.send('save-current-layout-as-default', 'Successfully updated the config.json file.');
                }
            } catch (error) {
                ipcRenderer.send('save-current-layout-as-default', 'Something went wrong..');
            }
        });

        ipcRenderer.send('get-root-path');
        ipcRenderer.on('get-root-path', (event, rootPath) => {
            Renderer_layout.setRootPath(rootPath);
            Renderer_layout._adjustConfig(false);
        });

        ipcRenderer.on('reload-default-layout', function () {
            Renderer_layout.reload();
        });

        ipcRenderer.on('reset-layout-setting', function () {
            Renderer_layout.reset();
        });
    },

    // 에셋 영역 관련 이벤트 처리
    _initAssetAreaEvent : function() {

        $('#assets').on("dragover", function(event){
            event.preventDefault();
            event.stopPropagation();
        });

        // 에셋 영역에 파일 드랍
        // MainProcess 에서 파일로드를 위해 드랍된 파일 경로를 MainProcess 로 보낸다.
        $('#assets').on("drop", function(event){
            event.preventDefault();
            event.stopPropagation();

            const arrFilePaths = Array.from(event.originalEvent.dataTransfer.files, file => file.path);
            ipcRenderer.send( 'file_dropped_on_asset', arrFilePaths );
        });

        // 메인 프로세스로 보내 파일로드한 다음 로드된 파일 정보를 다시 받음.
        ipcRenderer.on('file_loaded_from_asset', ( event, payload ) => {

            this.loadResources( payload )
                .then( function(){
                    console.log(" *** complete load asset on Asset View *** ");
                })
                .catch( function( error ){
                    console.log("Error > ", error );
                });

        });

    },

    _initHierarchyAreaEvent : function() {
        $('#hierarchy').on("dragover", function(event){
            event.preventDefault();
            event.stopPropagation();
        });

        // 에셋 -> 계층구조 영역에 파일 드랍
        $('#hierarchy').on("drop", function(event){
            event.preventDefault();
            event.stopPropagation();

            const droppedAssetName = event.originalEvent.dataTransfer.getData("assetName");
            if( droppedAssetName ) { // 내부 렌더러로부터 파일 드랍 이루어졌을 경우 처리
                const fileEntry = {
                    name    : droppedAssetName,
                    content :  JSON.stringify(cc.loader.getRes( droppedAssetName ))
                };
                Genie.ResourceLoader.createToolFileNode( fileEntry );
            }
        });
    },

    _initDocumentEventListener : function () {
        document.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            switch (key) {
                case 'delete':
                    const targetNodes = Genie.ToolController.getSelectedNodes();
                    Renderer_hierarchy.deleteSelectedNodes(targetNodes);
                    break;
                case 'q': // gizmo 숨기기
                    Genie.GizmoController.hideGizmo();
                    break;
                case 'w': // 이동 gizmo
                    Genie.GizmoController.showMoveGizmo();
                    break;
                case 'e': // 회전 gizmo
                    Genie.GizmoController.showRotateGizmo();
                    break;
                case 'r': // 스케일 gizmo
                    Genie.GizmoController.showScaleGizmo();
                    break;
            }
        });
    },

    _initCanvasEventListener : function () {
        const canvas = cc._canvas;

        // canvas element 에 file drop을 위한 drop 이벤트 등록.
        canvas.removeEventListener("drop", Loader.onDropHandler);
        canvas.addEventListener("drop", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();   // stops the browser from redirecting off to the image.

            console.log("cocos renderer drop");


            const droppedAssetName = evt.dataTransfer.getData("assetName");
            if( droppedAssetName ) { // 내부 렌더러로부터 파일 드랍 이루어졌을 경우 처리
                const fileEntry = {
                    name    : droppedAssetName,
                    content :  JSON.stringify(cc.loader.getRes( droppedAssetName ))
                };
                Genie.ResourceLoader.createToolFileNode( fileEntry );
            }
            else {                   // 외부 파일로부터 파일 드랍 이루어졌을 경우 처리
                const arrFilePaths = Array.from(evt.dataTransfer.files, file => file.path);
                ipcRenderer.send('fileDropEvent', arrFilePaths);
            }
        }, false);

        canvas.addEventListener('keydown', function(event) {
            const key = event.key.toLowerCase();
            switch (key) {
                case 'q': // gizmo 숨기기
                    Genie.GizmoController.hideGizmo();
                    break;
                case 'w': // 이동 gizmo
                    Genie.GizmoController.showMoveGizmo();
                    break;
                case 'e': // 회전 gizmo
                    Genie.GizmoController.showRotateGizmo();
                    break;
                case 'r': // 스케일 gizmo
                    Genie.GizmoController.showScaleGizmo();
                    break;
            }
        });

    },

    /**
     * main process 에서 타겟 파일과 디펜던시 리스트를 가지고 와서 renderer process 에서 리소스 로드.
     * payload
     *   ㄴ dependentFiles ex) [ ***.plist , ***.png ]
     *   ㄴ targetFiles [ ***.ExportJson ]
     */
    onFileDropReply : function( evt, payload ) {
        console.log("[EVT] >> fileDropEventReply complete : ", evt, payload);

        // 디펜던시 리소스 캐싱 및 로드
        let p = this.loadResources( payload );

        const createNode = fileEntry => new Promise((resolve, reject) => {
            Genie.ResourceLoader.createToolFileNode(fileEntry);
            resolve();
        })

        // // 타겟 파일들 노드 생성
        payload.targetFiles.reduce((promise, file) => {
            const entry = new FileEntry(file);
            return promise
                .then(() => createNode(entry))
                .then(() => console.log("create targetNode: ", entry.name))
                .then(() => console.log(cc.loader));
        }, p);
    },

    /**
     * 리소스 캐싱 및 로드
     * 마지막 프로미스를 리턴한다.
     */
    loadResources : function( payload ) {
        cc.log("[Renderer Main][Load Resources] payload : ", payload);
        // 래퍼런스 업데이트
        payload.dependentFiles.forEach((item) => {
            const filePaths = item.filePath.split('\\');
            const fileName = filePaths[filePaths.length - 1];

            Genie.RefChecker.increase(fileName);
        });

        payload.targetFiles.forEach((item) => {
            const filePaths = item.filePath.split('\\');
            const fileName = filePaths[filePaths.length - 1];

            Genie.RefChecker.increase(fileName);
        });

        // 리소스 비동기 로드 및 캐싱
        const loadResource = async (fileEntry) => {
            return new Promise((resolve, reject) => {
                Genie.ResourceLoader.cacheResource(fileEntry, resolve, reject);
            });
        };

        const loadFiles = (files, message) => {
            return files.reduce((p, file) => {
                const fileEntry = new FileEntry(file);
                return p.then(() => loadResource(fileEntry))
                    .then(() => console.log(message, fileEntry.name));
            }, Promise.resolve());
        };

        const textureFiles = payload.dependentFiles.filter(file => cc.path.extname( file.filePath ) === '.png');
        const otherFiles = payload.dependentFiles.filter( file => cc.path.extname( file.filePath ) !== '.png');
        const targetFiles = payload.targetFiles;

        return loadFiles(textureFiles, "load texture complete: ")
            .then(() => console.log("*** complete all textures *** "))
            .then(() => loadFiles(otherFiles, "load other complete: "))
            .then(() => console.log("*** complete all dependencies *** "))
            .then(() => loadFiles(targetFiles, "load complete: "))
            .then(() => console.log("*** complete all target files *** "));
    },
};