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

var Renderer_main = {
    init : function() {
        var canvas = cc._canvas;

        // canvas element 에 file drop을 위한 drop 이벤트 등록.
        canvas.removeEventListener("drop", Loader.onDropHandler);
        canvas.addEventListener("drop", function (evt) {
                evt.stopPropagation();
                evt.preventDefault();   // stops the browser from redirecting off to the image.

                console.log("cocos renderer drop");


                var droppedAssetName = evt.dataTransfer.getData("assetName");
                if( droppedAssetName ) { // 내부 렌더러로부터 파일 드랍 이루어졌을 경우 처리
                    var fileEntry = {
                        name    : droppedAssetName,
                        content :  JSON.stringify(cc.loader.getRes( droppedAssetName ))
                    };
                    Genie.ResourceLoader.createToolFileNode( fileEntry );
                }
                else {                   // 외부 파일로부터 파일 드랍 이루어졌을 경우 처리
                    var arrFilePaths = [];
                    for (var i=0;i < evt.dataTransfer.files.length; i++) {
                        arrFilePaths.push(evt.dataTransfer.files[i].path);
                    }
                    // console.log(" *** event *** : drop > ", arrFilePaths );
                    ipcRenderer.send('fileDropEvent', arrFilePaths);
                }
            }, false);

        // main process 와 통신
        ipcRenderer.on('fileDropEventReply', this.onFileDropReply.bind(this) );

        ipcRenderer.on('undo', function(){
            Genie.CommandManager.undo();
        });

        ipcRenderer.on( 'redo', function(){
            Genie.CommandManager.redo();
        });

        ipcRenderer.on("getHierarchy", function (){
            ipcRenderer.send('nodeHierarchy',[Renderer_hierarchy.hierarchyData]);
        }.bind(this));

        this._initAssetAreaEvent();
        this._initHierarchyAreaEvent();
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

            var arrFilePaths = [];
            for (var i=0;i < event.originalEvent.dataTransfer.files.length; i++) {
                arrFilePaths.push(event.originalEvent.dataTransfer.files[i].path);
            }
            ipcRenderer.send( 'file_dropped_on_asset', arrFilePaths );
        });

        // 메인 프로세스로 보내 파일로드한 다음 로드된 파일 정보를 다시 받음.
        var self = this;
        ipcRenderer.on('file_loaded_from_asset', function( event, payload ){

            self.loadResources( payload )
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

            var droppedAssetName = event.originalEvent.dataTransfer.getData("assetName");
            if( droppedAssetName ) { // 내부 렌더러로부터 파일 드랍 이루어졌을 경우 처리
                var fileEntry = {
                    name    : droppedAssetName,
                    content :  JSON.stringify(cc.loader.getRes( droppedAssetName ))
                };
                Genie.ResourceLoader.createToolFileNode( fileEntry );
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
        var p = this.loadResources( payload );

        var createNode = function ( fileEntry ) {
            return new Promise( function( resolve, reject ){
                Genie.ResourceLoader.createToolFileNode( fileEntry );
            });
        }

        // 타겟 파일들 노드 생성
        for( var i = 0; i < payload.targetFiles.length; ++i  ) {
            let file = new FileEntry(payload.targetFiles[i]);
            p = p.then( function() {
                return createNode( file );
            })
                .then( ()=> console.log( "create targetNode: ", file.name  ))
                .then( ()=> console.log(  cc.loader  ) );
        }
    },

    /**
     * 리소스 캐싱 및 로드
     * 마지막 프로미스를 리턴한다.
     */
    loadResources : function( payload ) {

        // 리소스 비동기 로드 및 캐싱
        var loadResource = function( fileEntry ) {
            return new Promise( function( resolve, reject ){
                Genie.ResourceLoader.cacheResource( fileEntry, resolve, reject );
            });
        };

        // step 1. 텍스쳐부터 미리 로드
        var textureFiles = payload.dependentFiles.filter( function( file ) {
            return cc.path.extname( file.filePath ) === '.png'
        });

        for( var i = 0, p = Promise.resolve(); i < textureFiles.length; ++i ) {
            let file = new FileEntry( textureFiles[i] );
            p = p.then( function () {
                return loadResource(file);
            })
                .then( ()=> console.log( "load texture complete : ", file.name  ) );
        }

        p.then( function() {
            return new Promise( ()=> console.log("*** complete all textures *** ") );
        });

        // step2. 다른 디펜던시 로드
        var otherFiles = payload.dependentFiles.filter( function( file ) {
            return cc.path.extname( file.filePath ) !== '.png'
        });

        for( i = 0; i < otherFiles.length; ++i  ) {
            let file = new FileEntry( otherFiles[i] );
            p = p.then( function() {
                return loadResource( file );
            })
                .then( ()=> console.log( "load other complete : ", file.name  ));
        }

        p.then( function() {
            return new Promise( ()=> console.log("*** complete all dependencies *** ") );
        });

        // 타겟 파일들 로드
        for( i = 0; i < payload.targetFiles.length; ++i  ) {
            let file = new FileEntry(payload.targetFiles[i]);
            p = p.then( function() {
                return loadResource( file );
            })
                .then( ()=> console.log( "load complete : ", file.name  ));
        }

        p.then( function() {
            return new Promise( ()=> console.log("*** complete all target files *** ") );
        });

        return p;
    },
};