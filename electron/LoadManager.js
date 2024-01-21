const { ipcMain } = require('electron');
const path = require("path");
const fileUtil  = require('./FileUtil');
const fs          = require('fs' );
const imageDataURI          = require('image-data-uri' );

class FileFinder {
    constructor(baseFolder) {

        this._baseFolder = baseFolder;
        this._arrSearchPath = [];

        this._arrFiles = [];
    }

    addSearchPath(searchPath){
        this._arrSearchPath.push(path.join(this._baseFolder, searchPath));
    }

    findFile(filePath) {


        if (fileUtil.exists(filePath))
            return filePath;

        for(let j=0; j <  this._arrSearchPath.length; j++){
            let tempPath = path.join( this._arrSearchPath[j], path.basename(filePath));
            if (fileUtil.exists(tempPath))
                return tempPath;
        }
        return null;
    }

    pushFile(relativePath){


        let absolutePath = path.join(this._baseFolder, relativePath);
        let foundPath = this.findFile(absolutePath);
        if (foundPath)
        {
            this._pushFoundFile(foundPath);
            return true;
        }

        return false;
    }

    _pushFoundFile(foundPath){
        if(this._arrFiles.indexOf(foundPath) < 0)
            this._arrFiles.push(foundPath);
    }

    getFileList(){
        return this._arrFiles;
    }

}

var LoadManager  = {

    _mainWindow : null,

    //배열 중복제거
    getUniqueValuesArray : function( arr ) {
        return arr.filter( function( value, index, self ) {
            return self.indexOf( value ) === index;
        } );
    },

    parseWidgetTreeRecursively : function(obj, arrDependant)
    {
        if (obj != null)
        {
            if (obj["classname"] != null && obj["options"] != null)
            {
                if (obj["classname"] === "LabelBMFont")
                {
                    let fileData = obj["options"]["fileNameData"];
                    if (fileData != null)
                    {
                        if (fileData["path"] != null)
                        {
                            let fileDataPath = fileData["path"];
                            if (fileDataPath.endsWith(".fnt"))
                            {
                                let fontPng= fileDataPath.replace(".fnt", ".png");
                                arrDependant.push(fileDataPath);
                                arrDependant.push(fontPng);
                            }
                            else
                            {
                                //Console.WriteLine("WARNING - LabelBMFont hasn't fnt file" + fileData["path"].Value<string>());
                            }
                        }
                    }
                }
            }

            obj["children"].forEach(function(e){

                LoadManager.parseWidgetTreeRecursively(e, arrDependant);
            });

        }
    },


    loadFiles : function (files)
    {
        let filesImport = [];
        for(let i=0; i < files.length; i++)
        {
            let baseFolder = path.dirname(files[i]);
            let fileFinder = new FileFinder(baseFolder);
            fileFinder.addSearchPath("image");
            fileFinder.addSearchPath("binary/image");
            fileFinder.addSearchPath("../image");


            if (path.extname(files[i]).toLowerCase()===".exportjson")
            {
                let rawdata = fs.readFileSync(files[i], "utf8");
                let jsonObj = JSON.parse(rawdata);
                if (jsonObj['config_file_path'] != null)
                {
                    jsonObj['config_file_path'].forEach(function(item){

                        if (fileFinder.pushFile(item))
                        {
                            if (item.endsWith(".plist")) {
                                fileFinder.pushFile(item.replace(".plist", ".png"))
                            }
                        }
                    });
                }

                if (jsonObj['textures'] != null)
                {
                    jsonObj['textures'].forEach(function(item){

                        console.log("textures items = " +item);
                        if (fileFinder.pushFile(item))
                        {
                            if (item.endsWith(".plist")) {
                                fileFinder.pushFile(item.replace(".plist", ".png"))
                            }
                        }

                    });
                }


                //fnt 파일
                let arrFntFiles = [];
                this.parseWidgetTreeRecursively(jsonObj["widgetTree"], arrFntFiles);
                arrFntFiles = this.getUniqueValuesArray(arrFntFiles);

                arrFntFiles.forEach(function(item){
                    fileFinder.pushFile(item);
                });

                filesImport = filesImport.concat(fileFinder.getFileList());
            }
        }

        filesImport = this.getUniqueValuesArray(filesImport);

        //
        // // replyInputValue 송신 또는 응답
        // //evt.reply('fileDropEventReply', "1223231");
        // var baseFolder = path.dirname(files[0]);
        // var searchPaths = [
        //     path.join(baseFolder, "image"),
        //     path.join(baseFolder, "binary/image")
        // ];
        //
        // var filesImport = []
        // searchPaths.forEach(function(folder){
        //
        //     if (fileUtil.exists(folder))
        //     {
        //         var arrayOfFiles = fileUtil.getAllFiles(folder);
        //         filesImport = filesImport.concat(arrayOfFiles);
        //     }
        // });
        //console.log("filesImport.length=" + filesImport.length);


        let promises = [];
        let dependentsFiles = [];
        filesImport.forEach(function(item){
            let fileInfo = {
                filePath : item,
                content : null,
            };
            console.log("filesImport = " + item);
            dependentsFiles.push(fileInfo);
            let extName = path.extname(item).toLowerCase();
            if (extName == ".png")
            {
                let promise = new Promise(function (resolve, reject) {

                    console.log("dataurl : " + item);
                    imageDataURI.encodeFromFile(item)
                        .then(res => {
                            fileInfo.content = res;
                            resolve();
                        })

                });
                promises.push(promise);
            }
            else if (extName===".exportjson" || extName===".plist" || extName===".fnt" || extName===".json" || extName===".atlas"){
                fileInfo.content = fs.readFileSync(item, "utf8");
            }

        });



        let targetFiles = [];
        files.forEach(function(item){
            let fileInfo = {
                filePath : item,
                content : null,
            };
            targetFiles.push(fileInfo);
            let extName = path.extname(item).toLowerCase();
            if (extName===".exportjson" || extName===".plist" || extName===".fnt" || extName===".json" || extName===".atlas"){
                fileInfo.content = fs.readFileSync(item, "utf8");
            }
        });




        let mainWindow = this._mainWindow;
        Promise.all(promises).then(
            function (){

                console.log("Promise.all complete");
                mainWindow.webContents.send('fileDropEventReply', {
                    targetFiles : targetFiles,
                    dependentFiles:dependentsFiles});
            }
        )

    },

    init : function (mainWindow){

        this._mainWindow = mainWindow;
        console.log("LoadManager inited");
        // onInputValue 이벤트 수신
        ipcMain.on('fileDropEvent', (evt, payload) => {
            LoadManager.loadFiles(payload);

        })
    }

}



module.exports = LoadManager;