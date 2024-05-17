const { ipcMain, dialog } = require('electron');
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

    //
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

                    console.log("*** LoadManager **** ", fileFinder );
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

                    console.log("*** LoadManager **** ", fileFinder );
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
            else if (extName===".exportjson" || extName===".plist" || extName===".fnt"){
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
            if (extName===".exportjson" || extName===".plist" || extName===".fnt"){
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

    loadFiles2 : function( files ) {
        console.log("** LoadManager.loadFiles2 ** ");
        let i, extName, filePath,
            targetFiles     = [],
            dependentFiles = [];

        for( i = 0; i < files.length; ++i ) {
            filePath    = files[i];
            extName     = path.extname( filePath ).toLowerCase();

            if( extName === '.exportjson' || extName === '.plist' || extName === ".fnt" ) {
                if( extName === '.exportjson' ) {
                    targetFiles.push( filePath );
                }

                let loc_dependenceList = this.getDependentsFiles( filePath );
                dependentFiles = dependentFiles.concat( loc_dependenceList );
            }
        }

        // 중복 제거
        this.getUniqueValuesArray( targetFiles );
        this.getUniqueValuesArray( dependentFiles );

        console.log("   > targetFiles " , targetFiles );
        console.log("   > dependentsFiles " , dependentFiles );

        // 렌더러에 보낼 파일정보 리스트
        let targetFileInfoList      = [];
        let dependenceFileInfoList  = [];

        //
        let promises = [];

        let fileInfo;
        for( i = 0; i < targetFiles.length; ++i ) {
            fileInfo = this.getMetaFileInfo( targetFiles[i] );
            targetFileInfoList.push( fileInfo );
        }

        for( i = 0; i < dependentFiles.length; ++i ) {
            extName = path.extname( dependentFiles[i] ).toLowerCase();
            if( extName === ".png" ) {
                promises.push( this.getTextureFileInfoAsync( dependentFiles[i] ) );
            }
            else {
                fileInfo = this.getMetaFileInfo( dependentFiles[i] );
                dependenceFileInfoList.push( fileInfo );
            }
        }

        let mainWindow = this._mainWindow;
        Promise.all( promises )
            .then( function( resultArray ){
                dependenceFileInfoList = dependenceFileInfoList.concat( resultArray );
            })
            .then( function (){

                // renderer 에 이벤트 보냄
                mainWindow.webContents.send( 'file_loaded_from_asset', {
                    targetFiles     : targetFileInfoList,
                    dependentFiles  : dependenceFileInfoList
                });
            })
            .catch( function( error ){
                console.log("Error : ", error );
            });
    },

    // exportjson , plist, fnt 의 경우 디펜던시 파일 가져온다.
    getDependentsFiles : function( filePath ) {
        let extName = path.extname( filePath ).toLowerCase();
        let rawData, jsonObj, xmlDoc, loc_dependencyFiles;

        let baseFolder = path.dirname( filePath );
        let fileFinder = new FileFinder(baseFolder);
        fileFinder.addSearchPath("image");
        fileFinder.addSearchPath("binary/image");
        fileFinder.addSearchPath("../image");

        if( extName === '.exportjson' ) {
            rawData = fs.readFileSync( filePath, "utf8");
            jsonObj = JSON.parse( rawData );

            // texture resources
            loc_dependencyFiles = jsonObj['config_file_path'] ? jsonObj['config_file_path'] : jsonObj['textures'];
            if( loc_dependencyFiles ) {
                loc_dependencyFiles.forEach( function( item ){
                    if (fileFinder.pushFile(item))
                    {
                        if (item.endsWith(".plist")) {
                            fileFinder.pushFile(item.replace(".plist", ".png"))
                        }
                    }
                });
            }

            // font file
            let arrFntFiles = [];
            this.parseWidgetTreeRecursively(jsonObj["widgetTree"], arrFntFiles);
            arrFntFiles = this.getUniqueValuesArray( arrFntFiles );
            arrFntFiles.forEach(function(item){
                fileFinder.pushFile(item);
            });
        }
        else if( extName === ".plist") {
            fileFinder.pushFile( filePath );
            fileFinder.pushFile( filePath.replace(".plist", ".png") );
        }
        else if( extName === ".fnt" ) {
            fileFinder.pushFile( filePath );
            fileFinder.pushFile( filePath.replace(".fnt", ".png") );
        }

        return fileFinder.getFileList();
    },

    getMetaFileInfo : function( filePath ) {
        let extName = path.extname( filePath ).toLowerCase();
        let content = null;
        if( extName === ".exportjson" ||
            extName === ".plist" ||
            extName === ".fnt" ) {

            content = fs.readFileSync( filePath, "utf-8" );
        }

        return {
            filePath: filePath,
            content : content
        }
    },

    getTextureFileInfoAsync : function( filePath ) {
        return new Promise( function ( resolve, reject){
            let extName = path.extname( filePath ).toLowerCase();
            let fileInfo = {
                filePath: filePath,
                content : null
            };

            if( extName === ".png" ) {
                imageDataURI.encodeFromFile(filePath).then( function( res ){
                    fileInfo.content = res;
                    resolve( fileInfo );
                })
            }
            else {
                reject( "ext name must be .png " );
            }
        });
    },

    init : function (mainWindow){
        this._mainWindow = mainWindow;

        // onInputValue 이벤트 수신
        ipcMain.on('fileDropEvent', (evt, payload) => {
            LoadManager.loadFiles(payload);
        });

        ipcMain.on( 'file_dropped_on_asset', function( evt, payload ){
            console.log("ipcMain > file_dropped_on_asset", payload);
            LoadManager.loadFiles2( payload );
        });

        ipcMain.on('save-current-layout-as-default', function (event, message) {
            dialog.showMessageBox(mainWindow, {
                message: message,
                type: 'info'
            });
        });
    }

}

module.exports = LoadManager;