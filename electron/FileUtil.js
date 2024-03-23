/**
 *
 * @type {{prefixMajorVersion: string, prefixRelativeSourcePath: string}}
 */
var fs     = require('fs' ),
    path   = require( "path" );


module.exports = {

    pathJoin : function(){
        var l = arguments.length;
        var result = "";
        for (var i = 0; i < l; i++) {
            result = (result + (result === "" ? "" : "/") + arguments[i]).replace(/(\/|\\\\)$/, "");
        }
        return result;
    },

    // C# 의 스트링 포멧처럼 쓰기 위해.
    stringUtil : {
        format : function() {
            var theString = arguments[0];

            for( var i = 1; i < arguments.length; ++i ) {
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                theString = theString.replace(regEx, arguments[i]);
            }

            return theString;
        }
    },

    getAllAssets : function(arrFolders)
    {
        return this.getAllAssetsRecursively(arrFolders);
    },
    getAllAssetsRecursively : function(dirPath, arrayOfFiles) {

        var lenRemoveBase = dirPath.length;
        if (dirPath.substring(dirPath.length-1)!=="/")
            lenRemoveBase += 1;

        return this._getAllAssetsRecursively(lenRemoveBase, dirPath);
    },
    _getAllAssetsRecursively : function(basePathLen, dirPath, arrayOfFiles) {

        var self = this;
        arrayOfFiles = arrayOfFiles || []

        fs.readdirSync(dirPath).forEach(file => {
            var fullPath = self.pathJoin(dirPath, file);
            if (fs.lstatSync(fullPath).isDirectory()) {
                //arrayOfFiles.push(fullPath.substring(basePathLen));
                self._getAllAssetsRecursively(basePathLen, fullPath, arrayOfFiles);
            } else {
                arrayOfFiles.push(fullPath.substring(basePathLen));
            }
        });

        return arrayOfFiles;
    },

    getAllFilesRecursively : function(dirPath, arrayOfFiles) {
        var files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        var self = this;
        files.forEach(function(file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = self.getAllFilesRecursively(dirPath + "/" + file, arrayOfFiles)
            } else {
                //arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
                arrayOfFiles.push(path.join(path.resolve(dirPath), file))
            }
        })

        return arrayOfFiles;
    },

    exists : function (file){

        return fs.existsSync(file);
    },

    getAllFiles : function(dirPath)
    {
        var arrayOfFiles = [];

        var files = fs.readdirSync(dirPath);
        files.forEach(function(file) {
            if (!fs.statSync(dirPath + "/" + file).isDirectory()) {
                //arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
                arrayOfFiles.push(path.join(path.resolve(dirPath), file))
            }
        })

        return arrayOfFiles;
    },

    getJsonMapInFolder : function(folderPath, extension){
        var mapJsonObjs = {};
        var files = this.getAllFiles(folderPath);
        for(var i=0; i <files.length; i++)
        {
            if (files[i].endsWith(extension)) {

                console.log("read json from  "+ files[i]);
                var rawdata = fs.readFileSync(files[i], "utf8");
                var jsonObj = JSON.parse(rawdata);
                var onlyFilename = path.parse(files[i]).name;
                mapJsonObjs[onlyFilename] = jsonObj;
            }
        }
        return mapJsonObjs;
    },

    getJsonMapInFolderRawData : function(folderPath, extension){
        var mapJsonObjs = {};
        var files = [];
        this.getAllFilesRecursively(folderPath, files);
        for(var i=0; i <files.length; i++)
        {
            if (files[i].endsWith(extension)) {

                console.log("read json from  "+ files[i]);
                var rawdata = fs.readFileSync(files[i], "utf8");
                var jsonObj = rawdata;
                var onlyFilename = path.parse(files[i]).name;
                mapJsonObjs[onlyFilename] = jsonObj;
            }
        }
        return mapJsonObjs;
    },

    getUnmanagedAssets : function(zipListFolder, assetRootFolder, arrAssetIgnore)
    {
        var arrUnmanagedAssets = [];
        //매니페스트
        var mapZipLists = this.getJsonMapInFolder(zipListFolder, ".json");

        var findInZipList = function(filePath) {
            for(var key in mapZipLists)
            {
                var zipJsonObj = mapZipLists[key];
                for(var k =0; k < zipJsonObj.assets.length; k++) {
                    if (filePath === zipJsonObj.assets[k])
                        return true;
                }
            }
            return false;
        };

        var cnt =0;
        var resFiles = this.getAllAssets(assetRootFolder, arrAssetIgnore);
        for (var i=0 ; i < resFiles.length; i++)
        {
            if (false === findInZipList(resFiles[i]))
            {
                arrUnmanagedAssets.push(resFiles[i]);
            }
            else
            {
                cnt++;
            }
        }

        return arrUnmanagedAssets;

    },

    //ZipList 에는 존재하나 실제로 지워진 파일이 있는지 검사해서 ZipList json파일에서 제거
    removeDeletedAssetsFromZipList : function(zipListFolder, assetRootFolder)
    {
        var countOfRemoval = 0;
        //매니페스트
        var mapZipLists = this.getJsonMapInFolder(zipListFolder, ".json");

        for(var key in mapZipLists)
        {
            var zipJsonObj = mapZipLists[key];
            var deleteAny = false;
            for(var k =zipJsonObj.assets.length -1; k >= 0 ; k--) {
                var assetPath = path.join(assetRootFolder, zipJsonObj.assets[k]);
                if (fs.existsSync( assetPath ) === false)
                {
                    console.log("Asset Removal Detected :  [" + zipJsonObj.assets[k]  + "] will be removed from " + key + ".json in zipList");

                    countOfRemoval++;
                    deleteAny = true;
                    zipJsonObj.assets.splice(k, 1);
                }
            }

            if (deleteAny)
            {
                //write json
                var zipFilePath = path.join(zipListFolder, key + ".json");
                fs.writeFileSync(zipFilePath, JSON.stringify(zipJsonObj, null, '\t'), 'utf8');
                console.log( "zipList file Updated : " + key + ".json in zipList has been updated");
            }
        }

        return countOfRemoval;
    },

    //폴더 내용삭제  없으면 생성
    makeFolderEmpty : function(folder) {
        if (fs.existsSync( folder ))
        {
            fs.readdirSync(folder).forEach(file => {
                var fullPath = path.join(folder, file);
                if (!fs.lstatSync(fullPath).isDirectory()) {
                    fs.unlinkSync(fullPath);
                }
            });
        }
        else{
            fs.mkdirSync(folder);
        }
    },

    copyFilesTo : function(sourceFolder, destFolder){

        var files = this.getAllFiles(sourceFolder);
        if (files.length > 0)
        {
            //destFolder 폴더가 없으면 생성
            if (!fs.existsSync(destFolder)){
                fs.mkdirSync(destFolder);
            }
        }

        for(var i=0; i < files.length; i++)
        {
            var destFile = path.join(destFolder, path.basename(files[i]));
            fs.createReadStream(files[i]).pipe(fs.createWriteStream(destFile));
        }

    },

    //파일 사이즈가 0인 파일이 존재하는지 체크한다.
    checkAllFileSize : function(sourceFolder){

        var files = this.getAllFiles(sourceFolder);
        for(var i=0; i < files.length; i++)
        {
            var fstat = fs.statSync(files[i]);
            if (fstat.size === 0)
                return false;
        }
        return true;
    },



    /**
     * file의 경로를 넣어주면 해당 file의 size값을 돌려줌, 동기임
     * @param filepath
     * @returns file size
     */
    getFileSize: function(filepath) {
        var fstat = fs.statSync(filepath);
        return fstat.size;
    },


    /**
     * 현재 날짜 시간을 반환 포멧은
     * 2018-03-22-13시 50분이라면 => 1803221350 형태로..
     * @returns {Date}
     */
    getCurrentDate : function() {
        var today = new Date();
        var hh = today.getHours();
        var minutes = today.getMinutes();
        var mm = today.getMonth()+1 ;
        var dd = today.getDate();
        var yy = today.getFullYear();

        if( dd < 10 ) {
            dd = '0' + dd;
        }

        if( mm < 10 ) {
            mm = '0' + mm;
        }

        if( hh < 10 ) {
            hh = '0' + hh;
        }

        if( minutes < 10 ) {
            minutes = '0' + minutes;
        }

        today = yy.toString().slice(2) + mm + dd + hh + minutes;
        return today;
    },


    copyFile : function( source, target, cb ) {
        var cbCalled = false;

        var rd = fs.createReadStream(source);
        rd.on("error", function(err) {
            done(err);
        });
        var wr = fs.createWriteStream(target);
        wr.on("error", function(err) {
            done(err);
        });
        wr.on("close", function(ex) {
            done();
        });
        rd.pipe(wr);

        function done(err) {
            if (!cbCalled) {
                cb(err);
                cbCalled = true;
            }
        }
    },

    addAssetToZipFile : function (asset, zipFile) {

        //파일이 없으면 생성한다.
        var jsonObj;
        if (fs.existsSync( zipFile ))
        {
            var rawdata = fs.readFileSync(zipFile, "utf8");
            jsonObj = JSON.parse(rawdata);

        }
        else {

            jsonObj = { assets:[]  };
        }

        jsonObj.assets.push(asset);
        fs.writeFileSync(zipFile, JSON.stringify(jsonObj, null, '\t'), 'utf8');
    },


    removeFolder : function(dirPath, removeSelf) {
        if (removeSelf === undefined)
            removeSelf = true;
        try { var files = fs.readdirSync(dirPath); }
        catch(e) { return; }
        if (files.length > 0)
            for (var i = 0; i < files.length; i++) {
                var filePath = dirPath + '/' + files[i];
                if (fs.statSync(filePath).isFile())
                    fs.unlinkSync(filePath);
                else
                    this.removeFolder(filePath);
            }
        if (removeSelf)
            fs.rmdirSync(dirPath);
    },

    getImageFormat : function (imagePath){
        var binary = fs.readFileSync(imagePath);
        var signature = binary.readInt32LE(0);

        if (signature === 1196314761)
            return "PNG";
        //52 49 46 46
        else if (signature === 1179011410)
            return "WEBP";

        return "UNKNOWN";
    },




    // /assets/image/img.png  경로를 image/img.png  이런식의 assetPath 로 수정
    //ex ) convertPathToAssetPath('assets/image/img.png' , 'assets')  =>   image/img.png
    convertPathToAssetPath : function (targetDir, baseDir)
    {
        var strTargetDir = path.resolve(targetDir);
        var strBaseDir = path.resolve(baseDir);

        if (strTargetDir.indexOf(strBaseDir) === 0)
        {
            var ret = strTargetDir.substr(strBaseDir.length ).replace(/\\/gi, "/");
            if (ret[0]==="/")
                return ret.substr(1);
        }
        return "";
    },

    // 필터 걸어 특정 폴더 내 모든 파일 리스트 가져오기
    getAllFilesInFolderWithFilter : function( folderPath, excludedFolders =[], fileFilter ) {
        let fileList = [];

        // 폴더 내의 파일 및 디렉터리를 읽기
        fs.readdirSync(folderPath).forEach(file => {
            // 제외할 폴더를 검사하여 제외하고자 하는 폴더는 건너뜁니다.
            if (excludedFolders.includes(file)) {
                return;
            }

            // 파일 경로 생성
            const filePath = path.join(folderPath, file);

            // 파일 상태 확인
            const stats = fs.statSync(filePath);

            // 디렉터리인 경우 재귀적으로 파일 목록을 가져옵니다.
            if (stats.isDirectory()) {
                fileList = fileList.concat( this.getAllFilesInFolderWithFilter(filePath, excludedFolders, fileFilter));
            } else if (stats.isFile()) {
                // 파일이 숨김 파일이 아니고, 필터가 존재하지 않거나 정규표현식과 일치하는 경우에만 fileList에 추가합니다.
                if (!file.startsWith('.') && (!fileFilter || file.match(fileFilter))) {
                    fileList.push(filePath);
                }
            }
        });

        return fileList;
    }
};