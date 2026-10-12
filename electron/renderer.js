// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


const { ipcRenderer } = require('electron');
const fs = require('fs');

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

    /**
     * 파일/폴더 드롭 처리 (Game View 캔버스, Assets 패널 공용)
     * - 폴더: 하위 파일 경로를 ResourceMapData 에 등록만 해 둔다 (실제 읽기는 필요할 때)
     * - 파일: 메인 프로세스로 보내 의존 파일과 함께 로드한다
     */
    handleDrop : function(evt) {
        const path = require('path');
        var files = evt.dataTransfer.files;
        var arrFilePaths = [];

        function walkDir(dir) {
            var list = fs.readdirSync(dir);
            list.forEach(function(file) {
                var fullPath = path.join(dir, file);
                var stat = fs.statSync(fullPath);
                if (stat && stat.isDirectory()) {
                    walkDir(fullPath);
                } else {
                    var fileEntry = new FileEntry({ filePath: fullPath, content: null });

                    if (!ResourceMapData[fileEntry.name]) {
                        ResourceMapData[fileEntry.name] = fileEntry;
                    } else {
                        ResourceMapData[fileEntry.name].fullPath = fullPath;
                    }
                }
            });
        }

        for (var i = 0; i < files.length; i++) {
            try {
                if (fs.statSync(files[i].path).isDirectory()) {
                    walkDir(files[i].path);
                } else {
                    arrFilePaths.push(files[i].path);
                }
            } catch (e) {
                console.error(e);
            }
        }

        if (arrFilePaths.length > 0) {
            ipcRenderer.send('fileDropEvent', arrFilePaths);
        }
    },

    init : function() {
        var canvas = cc._canvas;

        canvas.removeEventListener("drop", Loader.onDropHandler);
        canvas.addEventListener("drop", function (evt) {
            evt.stopPropagation();
            evt.preventDefault();
            ElectronRenderer.handleDrop(evt);
        }, false);

        ipcRenderer.on('fileDropEventReply', async (evt, payload) => {
            const allFiles = [];

            // 메인 프로세스가 찾지 못한 의존 파일 (Dependencies 패널에 탐색 경로와 함께 표시)
            if (typeof ResourceRegistry !== 'undefined') {
                ResourceRegistry.setMissingInfo(payload.missingFiles);
            }

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

                try {
                    await new Promise((resolve) => {
                        if (ResourceMapData[file.name]) {
                            ResourceMapData[file.name].isProcessed = false;
                        }
                        file.isProcessed = false;

                        ResourceMapData[file.name] = file;

                        Loader.readFile(file, () => {
                            resolve();
                        }, item.isTarget);
                    });
                } catch (err) {
                    // 깨진 파일 하나 때문에 나머지 파일 로딩이 중단되지 않도록 한다
                    console.error("[로딩 실패] 파일 처리 중 오류:", file.name, err);
                    if (typeof printLog === 'function') printLog("파일 처리 실패 : " + file.name);
                }
            }
        });

        Loader.readFile = this.readFile;

        Loader.readSpineResoueces = function(fileName) {
            var resourceUrls = [ fileName + ".atlas", fileName + ".png" ];
            for (var i = 0; i < resourceUrls.length; i++) {
                var url = resourceUrls[i];
                if (cc.loader.cache[url]) continue;

                var itemFileName = url.split(/[\\\/]/).pop();
                var item = ResourceMapData[itemFileName];

                if (!item) {
                    const lowerTarget = itemFileName.toLowerCase();
                    for (let key in ResourceMapData) {
                        if (key.toLowerCase() === lowerTarget) {
                            item = ResourceMapData[key];
                            break;
                        }
                    }
                }

                if (item) {
                    item.file(function(file) {
                        Loader.readFile(file, null, false);
                    });
                }
            }
        };
    },

    readFile: function(fileEntry, cb, addToAssetPanel = false) {
        var self = this;
        if (!fileEntry) {
            cb && cb();
            return;
        }

        let url = fileEntry.name;

        if (fileEntry.isProcessed) {
            console.log(`[로딩] 중복 스킵: 이미 엔진에 로드된 파일입니다 (${url})`);
            cb && cb();
            return;
        }

        let ext = cc.path.extname(url).toLowerCase();

        const processDataUnsafe = (fileContents) => {
            // 데이터를 엔진으로 넘기기 직전에 '처리 완료' 꼬리표를 붙입니다.
            fileEntry.isProcessed = true;
            if (ResourceMapData[url]) {
                ResourceMapData[url].isProcessed = true;
            }

            if (ext === ".json") {
                let jsonObj;
                try { jsonObj = JSON.parse(fileContents); } catch(e) {}

                if (jsonObj && jsonObj["skeleton"] && jsonObj["skeleton"]["spine"]) {
                    Loader._processFileData(url, fileContents, ext, cb, addToAssetPanel);
                    if (typeof toggleJSONUI !== 'undefined') toggleJSONUI(false);
                } else {
                    let exportjson = typeof convertToExportJson !== 'undefined' ? convertToExportJson(fileContents) : fileContents;
                    let newUrl = url.replace('.json', ' (JSON).ExportJson');
                    Loader._processFileData(newUrl, exportjson, '.exportjson', cb, addToAssetPanel);
                    if (typeof toggleJSONUI !== 'undefined') toggleJSONUI(true);
                }
            } else {
                Loader._processFileData(url, fileContents, ext, cb, addToAssetPanel);
            }

            if (ext === ".exportjson") {
                if (typeof toggleJSONUI !== 'undefined') toggleJSONUI(false);
            }

            if (ext === ".json" || ext === ".exportjson") {
                g_fileName = url;
                g_fileContext = fileContents;
            }
        };

        // 파싱 오류가 나도 cb 를 호출해 순차 로딩(await)이 멈추지 않게 한다
        const processData = (fileContents) => {
            try {
                processDataUnsafe(fileContents);
            } catch (err) {
                console.error(`[로딩 실패] 파일 처리 중 오류 (${url})`, err);
                if (typeof printLog === 'function') printLog("파일 처리 실패 : " + url);
                cb && cb();
            }
        };

        if (fileEntry.content !== null && fileEntry.content !== undefined) {
            console.log(`[로딩] 1단계: 진짜 캐싱에서 가져옴 (${url})`);
            processData(fileEntry.content);
        }
        else if (fileEntry.fullPath) {
            console.log(`[로딩] 2단계: 경로 캐싱 확인, 메인에 요청함 (${url} -> ${fileEntry.fullPath})`);

            new Promise((resolve) => {
                const replyChannel = 'requestFileDataReply';
                const listener = (evt, response) => {
                    if (response.filePath === fileEntry.fullPath) {
                        ipcRenderer.removeListener(replyChannel, listener);
                        resolve(response.content);
                    }
                };
                ipcRenderer.on(replyChannel, listener);
                ipcRenderer.send('requestFileData', fileEntry.fullPath);
            }).then((fetchedContent) => {
                if (fetchedContent) {
                    console.log(`[로딩] 2단계 완료: 메인에서 데이터 수신 성공 (${url})`);
                    // 메인에서 받아온 데이터를 진짜 캐시에 저장
                    fileEntry.content = fetchedContent;
                    if (ResourceMapData[url]) {
                        ResourceMapData[url].content = fetchedContent;
                    }
                    processData(fetchedContent);
                } else {
                    console.error(`[로딩 실패] 2단계 에러: 데이터를 가져오지 못함 (${url})`);
                    cb && cb();
                }
            });
        }
        else {
            console.log(`[로딩] 3단계: 정보 없음. 하드코딩 경로 탐색 등으로 폴백 (${url})`);
            cb && cb();
        }
    }
};
