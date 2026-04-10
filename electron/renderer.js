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
        ipcRenderer.on('fileDropEventReply', async (evt, payload) => {
            console.log("fileDropEventReply complete. Sorting and loading files...");

            const allFiles = [];

            payload.dependentFiles.forEach(f => {
                allFiles.push({ info: f, isTarget: false });
            });

            payload.targetFiles.forEach(f => {
                allFiles.push({ info: f, isTarget: true });
            });

            const getPriority = (ext) => {
                switch (ext) {
                    case '.png': return 1;
                    case '.plist':
                    case '.atlas':
                    case '.fnt': return 2;
                    case '.exportjson':
                    case '.json': return 3;
                    default: return 99;
                }
            };

            allFiles.sort((a, b) => {
                const extA = cc.path.extname(a.info.filePath).toLowerCase();
                const extB = cc.path.extname(b.info.filePath).toLowerCase();
                return getPriority(extA) - getPriority(extB);
            });

            for (const item of allFiles) {
                let file = new FileEntry(item.info);

                await new Promise((resolve) => {
                    ResourceMapData[file.name] = file;

                    Loader.readFile(file, () => {
                        resolve();
                    }, item.isTarget);
                });
            }

            console.log("모든 정렬된 파일 로드 완료.");
        });


        Loader.readFile = this.readFile;

    },

    readFile : function( fileEntry , cb, addToAssetPanel = false) {
        var self = this;
        if( !fileEntry ) {
            cb && cb();
            return;
        }

        let url = fileEntry.name;
        let fileContents = fileEntry.content;
        var ext = cc.path.extname(url).toLowerCase();

        if ( ext === ".json" ){
            // 1. 먼저 JSON으로 파싱하여 구조를 확인합니다.
            let jsonObj = JSON.parse(fileContents);

            // 2. Spine 데이터인지 확인 (loader.js의 로직 활용)
            if (jsonObj["skeleton"] && jsonObj["skeleton"]["spine"]) {
                // Spine인 경우 변환 없이 바로 프로세싱
                Loader._processFileData(url, fileContents, ext, cb, addToAssetPanel);
                toggleJSONUI(false); // Spine은 다운로드 UI가 필요 없을 수 있음
            }
            else {
                // Spine이 아닌 일반 CocosStudio JSON인 경우에만 변환 수행
                let exportjson = convertToExportJson( fileContents );
                url = url.replace( '.json', ' (JSON).ExportJson');
                ext = '.exportjson';
                Loader._processFileData(url, exportjson, ext, cb, addToAssetPanel);
                toggleJSONUI( true );
            }
        }
        else {
            Loader._processFileData(url, fileContents, ext, cb, addToAssetPanel);
        }

        if ( ext === ".exportjson" ){
            toggleJSONUI( false );
        }

        if (ext === ".json" || ext === ".exportjson") {
            g_fileName = url;
            g_fileContext = fileContents;
        }
    }
};
