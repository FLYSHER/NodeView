// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


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

var ElectronRenderer = {

    init : function() {
        var canvas = cc._canvas;

        canvas.removeEventListener("drop", Loader.onDropHandler);
        canvas.addEventListener(
            "drop",
            function (evt) {
                evt.stopPropagation();
                evt.preventDefault();   // stops the browser from redirecting off to the image.

                console.log("renderer drop");

                var arrFilePaths = [];
                for (var i=0;i < evt.dataTransfer.files.length; i++)
                {
                    arrFilePaths.push(evt.dataTransfer.files[i].path);
                }

                ipcRenderer.send('fileDropEvent', arrFilePaths);

                // Loader.readFile( evt.dataTransfer.files );
            }, false);


        console.log("renderer window.onload");


        // onWebcontentsValue에 대한 이벤트 수신
        ipcRenderer.on('fileDropEventReply', (evt, payload) => {

            console.log("fileDropEventReply complete");

            payload.dependentFiles.forEach(function(e){
                let file = new FileEntry(e);
                ResourceMapData[file.name] = file;

            });

            payload.targetFiles.forEach(function(e){

                let file = new FileEntry(e);
                Loader.readFile(file);
            });
        });


        Loader.readFile = this.readFile;

    },


    readFile : function( fileEntry , cb) {
        var self = this;
        if( !fileEntry ) {
            cb && cb();
            return;
        }

        let url = fileEntry.name;
        let fileContents = fileEntry.content;

        var ext = cc.path.extname(url).toLowerCase();
        if ( ext === ".json" ){
            let exportjson = convertToExportJson( fileContents );
            url = url.replace( '.json', ' (JSON).ExportJson');
            ext = '.exportjson';
            self._processFileData(url, exportjson, ext, cb);
            toggleJSONUI( true );
        }
        else {
            self._processFileData(url, fileContents, ext, cb);
        }

        if ( ext === ".exportjson" ){
            toggleJSONUI( false );
        }

        if (ext === ".json" || ext === ".exportjson") {
            //  console.log( ext , "processed ");
            g_fileName =  url;
            g_fileContext = fileContents;
        }

    }
};
