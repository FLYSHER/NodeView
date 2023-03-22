// // This file is required by the index.html file and will
// // be executed in the renderer process for that window.
// // No Node.js APIs are available in this process because
// // `nodeIntegration` is turned off. Use `preload.js` to
// // selectively enable features needed in the rendering
// // process.
//
//
// const { ipcRenderer } = require('electron');
//
// class FileEntry {
//
//     constructor(fileInfo) {
//         this.fullPath = fileInfo.filePath;
//         this.isFile = true;
//         this.isDirectory = false;
//         this.name =  this.fullPath.split(/[\\\/]/).pop();
//         this.content =fileInfo.content;
//     }
//
//     file(filecb) {
//         filecb(this);
//     }
//
// }
//
// var ElectronRenderer = {
//
//     init : function() {
//         var canvas = cc._canvas;
//
//         canvas.removeEventListener("drop", Loader.onDropHandler);
//         canvas.addEventListener(
//             "drop",
//             function (evt) {
//                 evt.stopPropagation();
//                 evt.preventDefault();   // stops the browser from redirecting off to the image.
//
//                 console.log("renderer drop");
//
//                 var arrFilePaths = [];
//                 for (var i=0;i < evt.dataTransfer.files.length; i++)
//                 {
//                     arrFilePaths.push(evt.dataTransfer.files[i].path);
//                 }
//
//                 console.log( "*** Renderer >> on drop ***", arrFilePaths );
//                 ipcRenderer.send('fileDropEvent', arrFilePaths);
//                 // Loader.readFile( evt.dataTransfer.files );
//             }, false);
//
//
//         console.log("renderer window.onload");
//
//
//         // onWebcontentsValue에 대한 이벤트 수신
//         // var self = this;
//         // ipcRenderer.on('fileDropEventReply', (evt, payload) => {
//         //
//         //     console.log("fileDropEventReply complete", payload);
//         //     var p = self.readFile( payload );
//         //     p.then( function(){
//         //
//         //     })
//         //     // Loader.readFile = this.readFile;
//         //
//         // })
//         ipcRenderer.on('fileDropEventReply', this.onFileDropReply.bind(this) )
//     },
//
//     onFileDropReply : function( evt, payload ) {
//         console.log("[EVT] >> fileDropEventReply complete : ", evt, payload);
//         var p = this.loadResources( payload );
//
//         var createNode = function ( fileEntry ) {
//             return new Promise( function( resolve, reject ){
//                 GST.ResourceLoader.createToolFileNode( fileEntry );
//             });
//         }
//
//         // 타겟 파일들 노드 생성
//         for( var i = 0; i < payload.targetFiles.length; ++i  ) {
//             let file = new FileEntry(payload.targetFiles[i]);
//             p = p.then( function() {
//                     return createNode( file );
//                 })
//                 .then( ()=> console.log( "create targetNode: ", file.name  ))
//                 .then( ()=> console.log(  cc.loader  ) );
//         }
//     },
//
//
//
//     // 리소스 캐싱 및 로드
//     // 마지막 프로미스를 리턴한다.
//     loadResources : function( payload ) {
//
//         // 리소스 비동기 로드 및 캐싱
//         var loadResource = function( fileEntry ) {
//             return new Promise( function( resolve, reject ){
//                 GST.ResourceLoader.cacheResource( fileEntry, resolve, reject );
//             });
//         };
//
//         // step 1. 텍스쳐부터 미리 로드
//         var textureFiles = payload.dependentFiles.filter( function( file ) {
//             return cc.path.extname( file.filePath ) === '.png'
//         });
//
//         for( var i = 0, p = Promise.resolve(); i < textureFiles.length; ++i ) {
//             let file = new FileEntry( textureFiles[i] );
//             p = p.then( function () {
//                     return loadResource(file);
//                 })
//                 .then( ()=> console.log( "load texture complete : ", file.name  ) );
//         }
//
//         p.then( function() {
//             return new Promise( ()=> console.log("*** complete all textures *** ") );
//         });
//
//         // step2. 다른 디펜던시 로드
//         var otherFiles = payload.dependentFiles.filter( function( file ) {
//             return cc.path.extname( file.filePath ) !== '.png'
//         });
//
//         for( i = 0; i < otherFiles.length; ++i  ) {
//             let file = new FileEntry( otherFiles[i] );
//             p = p.then( function() {
//                     return loadResource( file );
//                 })
//                 .then( ()=> console.log( "load other complete : ", file.name  ));
//         }
//
//         p.then( function() {
//             return new Promise( ()=> console.log("*** complete all dependencies *** ") );
//         });
//
//         // 타겟 파일들 로드
//         for( i = 0; i < payload.targetFiles.length; ++i  ) {
//             let file = new FileEntry(payload.targetFiles[i]);
//             p = p.then( function() {
//                     return loadResource( file );
//                 })
//                 .then( ()=> console.log( "load complete : ", file.name  ));
//         }
//
//         p.then( function() {
//             return new Promise( ()=> console.log("*** complete all target files *** ") );
//         });
//
//         return p;
//     },
//
//
//     // readFile : function( fileEntry , cb) {
//     //     var self = this;
//     //     if( !fileEntry ) {
//     //         cb && cb();
//     //         return;
//     //     }
//     //
//     //     let url = fileEntry.name;
//     //     let fileContents = fileEntry.content;
//     //
//     //     var ext = cc.path.extname(url).toLowerCase();
//     //     if ( ext === ".json" ){
//     //         let exportjson = convertToExportJson( fileContents );
//     //         url = url.replace( '.json', ' (JSON).ExportJson');
//     //         ext = '.exportjson';
//     //         self._processFileData(url, exportjson, ext, cb);
//     //         toggleJSONUI( true );
//     //     }
//     //     else {
//     //         self._processFileData(url, fileContents, ext, cb);
//     //     }
//     //
//     //     if ( ext === ".exportjson" ){
//     //         toggleJSONUI( false );
//     //     }
//     //
//     //     if (ext === ".json" || ext === ".exportjson") {
//     //         //  console.log( ext , "processed ");
//     //         g_fileName =  url;
//     //         g_fileContext = fileContents;
//     //     }
//     //
//     // }
// };
