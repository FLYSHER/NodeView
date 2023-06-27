const { ipcRenderer } = require('electron');
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

var CocosRenderer = {
    init : function() {
        var canvas = cc._canvas;

        canvas.removeEventListener("drop", Loader.onDropHandler);
        canvas.addEventListener(
            "drop",
            function (evt) {
                evt.stopPropagation();
                evt.preventDefault();   // stops the browser from redirecting off to the image.

                console.log("cocos renderer drop");

                var arrFilePaths = [];
                for (var i=0;i < evt.dataTransfer.files.length; i++)
                {
                    arrFilePaths.push(evt.dataTransfer.files[i].path);
                }

                console.log(" *** event *** : drop > ", arrFilePaths );
                ipcRenderer.send('fileDropEvent', arrFilePaths);

            }, false);


        console.log("renderer window.onload");


        // onWebcontentsValue에 대한 이벤트 수신
        // ipcRenderer.on('fileDropEventReply', (evt, payload) => {
        //
        //     console.log("fileDropEventReply complete");
        //
        //     payload.dependentFiles.forEach(function(e){
        //         let file = new FileEntry(e);
        //         ResourceMapData[file.name] = file;
        //
        //     });
        //
        //     payload.targetFiles.forEach(function(e){
        //
        //         let file = new FileEntry(e);
        //         Loader.readFile(file);
        //     });
        // });
        // Loader.readFile = this.readFile;

        ipcRenderer.on('fileDropEventReply', this.onFileDropReply.bind(this) )
    },

    /**
     * main process 에서 타겟 파일과 디펜던시 리스트를 가지고 와서 renderer process 에서 리소스 로드.
     *
     * payload
     *   ㄴ dependentFiles ex) [ ***.plist , ***.png ]
     *   ㄴ targetFiles [ ***.ExportJson ]
     */
    onFileDropReply : function( evt, payload ) {
        console.log("[EVT] >> fileDropEventReply complete : ", evt, payload);

        var p = this.loadResources( payload );

        var createNode = function ( fileEntry ) {
            return new Promise( function( resolve, reject ){
                GST.ResourceLoader.createToolFileNode( fileEntry );
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

    // 리소스 캐싱 및 로드
    // 마지막 프로미스를 리턴한다.
    loadResources : function( payload ) {

        // 리소스 비동기 로드 및 캐싱
        var loadResource = function( fileEntry ) {
            return new Promise( function( resolve, reject ){
                GST.ResourceLoader.cacheResource( fileEntry, resolve, reject );
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