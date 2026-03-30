window.ResPack = legacy_cc.Class.extend({

    ctor : function(name, assets){

        this._initProp();
        this._name = name;
        this._assets = assets;
        this._dependentPack = [];
        this._dependentAsset = [];
    },

    _initProp : function (){
        this._name = null;
        this._assets = null;
        this._dependentPack = null;
        this._dependentAsset = null;
    },

    _getExtName : function(pathStr)
    {
        var temp = /(\.[^\.\/\?\\]*)(\?.*)?$/.exec(pathStr);
        return temp ? temp[1] : null;
    },
    _isTextPackFile : function(item)
    {
        return ResPackDefine.TextFileExtensions.indexOf(this._getExtName(item).toLowerCase()) >= 0 ;
    },
    _isBinaryPackFile : function(item)
    {
        return ResPackDefine.BinaryFileExtensions.indexOf(this._getExtName(item).toLowerCase()) >= 0  ;
    },

    _getAssetsArrayWithDependent : function (bPackAsset, bExcludePackFiles)
    {
        if (!cc.game.config["useAssetPack"])
            bPackAsset = false;

        var retArray = [];
        var countTextFiles  = 0;
        var countBinaryFiles  = 0;
        var assets = this.getAssetsObject();
        if (assets) {
            for (var p in assets) {
                if (assets.hasOwnProperty(p)) {
                    if (bPackAsset) {
                        if (this._isTextPackFile(assets[p])) {
                            countTextFiles++;
                        } else if (this._isBinaryPackFile(assets[p])) {
                            countBinaryFiles++;
                        } else {
                            retArray.push(assets[p]);
                        }
                    } else {
                        retArray.push(assets[p]);
                    }
                }
            }
        }

        if (bExcludePackFiles != true) {
            if (countTextFiles > 0) {
                retArray.push(ResPackDefine.FOLDER_NAME_ASSETPACK + '/' + this._name + '.tfp');
            }
            if (countBinaryFiles > 0) {
                retArray.push(ResPackDefine.FOLDER_NAME_ASSETPACK + '/' + this._name + '.bfp');
            }
        }

        var len = this._dependentPack.length;
        for (var i=0; i<len; i++) {
            var arrayAsset = this._dependentPack[i]._getAssetsArrayWithDependent(bPackAsset, bExcludePackFiles);
            retArray = retArray.concat(arrayAsset);
        }

        if (this._dependentAsset && this._dependentAsset.length > 0){
            retArray = retArray.concat(this._dependentAsset);
        }

        return retArray;
    },

    arrayToLoad : function()
    {
        var arrAssets, i;
        if (arguments.length == 0 )
            arrAssets = this._getAssetsArrayWithDependent(true);
        else
        {
            var tempArr = this.arrayToLoad();
            var len = arguments.length;
            for (i=0; i<len; i++) {
                if (arguments[i] instanceof ResPack) {
                    tempArr = tempArr.concat(arguments[i].arrayToLoad());
                }
                else if (Array.isArray(arguments[i])) {
                    arguments[i].forEach(function(asset){
                        if (asset instanceof ResPack){
                            tempArr = tempArr.concat(asset.arrayToLoad());
                        }
                        else{
                            tempArr.push(asset);
                        }
                    }, this);
                }
                else if (typeof arguments[i] === 'string'){
                    tempArr.push(arguments[i]);
                }
            }

            arrAssets = tempArr;
        }

        //중복 제거후 반환
        return arrAssets.filter(function (value, index, self) {     //remove duplicates
            return self.indexOf(value) === index;
        });
    },


    arrayToLoadWithoutPackFile : function()
    {
        return this._getAssetsArrayWithDependent(true, true);
    },

    arrayToPurge: function()
    {
        var arrAssets, i;
        if (arguments.length == 0 )
            arrAssets = this._getAssetsArrayWithDependent(false);
        else
        {
            var tempArr = this.arrayToPurge();
            var len = arguments.length;
            for ( i=0; i<len; i++) {

                if (arguments[i] instanceof ResPack) {
                    tempArr = tempArr.concat(arguments[i].arrayToPurge());
                }
                else if (Array.isArray(arguments[i])) {
                    arguments[i].forEach(function(asset){
                        if (asset instanceof ResPack){
                            tempArr = tempArr.concat(asset.arrayToPurge());
                        }
                        else{
                            tempArr.push(asset);
                        }
                    }, this);
                }
                else if (typeof arguments[i] === 'string'){
                    tempArr.push(arguments[i]);
                }
            }

            arrAssets = tempArr;
        }

        //중복 제거후 반환
        return arrAssets.filter(function (value, index, self) {     //remove duplicates
            return self.indexOf(value) === index;
        });
    },





    getAssetsObject : function()
    {
        return this._assets;
    },

    getAssetsArray : function ()
    {
        return this._convertObjToArr(this.getAssetsObject());
    },
    getAssetsArrayWithDependent : function ()
    {
        return this._getAssetsArrayWithDependent(false);
    },

    clone : function (){
        var newInstance = new ResPack();
        newInstance._name = this._name;
        newInstance._assets = this._assets;
        newInstance._dependentPack = this._dependentPack.slice();
        newInstance._dependentAsset = this._dependentAsset.slice();
        return newInstance;
    },

    depend : function()
    {
        var len = arguments.length;
        for (var i=0; i < len; i++) {
            if (arguments[i] instanceof ResPack) {
                this._dependentPack.push(arguments[i]);
            }
            else if (Array.isArray(arguments[i])) {
                arguments[i].forEach(function(asset){
                    if (asset instanceof ResPack){
                        this._dependentPack.push(asset);
                    }
                    else{
                        this._dependentAsset.push(asset);
                    }
                }, this);
            }
            else if (typeof arguments[i] === 'string'){
                this._dependentAsset.push(arguments[i]);
            }
        }
        return this;
    },

    //새로운 ResPack Instance를 생성후 반환한다.
    concat : function (){
        var cloneResPack = this.clone();
        cloneResPack.depend.apply(cloneResPack, arguments);
        return cloneResPack;
    },

    _objConcat : function()
    {
        var ret = {};
        var len = arguments.length;
        for (var i=0; i<len; i++) {
            for (p in arguments[i]) {
                if (arguments[i].hasOwnProperty(p)) {
                    ret[p] = arguments[i][p];
                }
            }
        }
        return ret;
    },

    _convertObjToArr : function( obj ) {
        var tempArr = [];
        for( var item in obj ) {
            if( obj.hasOwnProperty( item ) ) {
                tempArr.push( obj[ item ] );
            }
        }
        return tempArr;
    },

    getAssetWithName : function (name){
        if (this._assets)
        {
            return this._assets[name];
        }
        return  null;
    }


    /*
    objectToPurge: function()
    {
        return this._getAssetsObjectWithDependent(false);
    },

    getAssetsObjectWithDependent : function()
    {
        return this._getAssetsObjectWithDependent(false);
    },


    _getAssetsObjectWithDependent : function (bPackAsset, bExcludePackFiles)
    {
        if (!cc.game.config["useAssetPack"])
            bPackAsset = false;

        var ret = {};
        var countTextFiles  = 0;
        var countBinaryFiles  = 0;
        var assets = this.getAssetsObject();
        for (p in assets) {
            if (assets.hasOwnProperty(p))
            {
                if (bPackAsset)
                {
                    if (this._isTextPackFile(assets[p])) {
                        countTextFiles++;
                    }
                    else if (this._isBinaryPackFile(assets[p]))	{
                        countBinaryFiles++;
                    }
                    else{
                        ret[p] = assets[p];
                    }
                }
                else
                {
                    ret[p] = assets[p];
                }

            }
        }

        if (bExcludePackFiles != true) {
            if (countTextFiles > 0) {
                ret['TFP_' + this._name] = ResPackDefine.FOLDER_NAME_ASSETPACK + '/' + this._name + '.tfp';
            }
            if (countBinaryFiles > 0) {
                ret['BFP' + this._name] = ResPackDefine.FOLDER_NAME_ASSETPACK + '/' + this._name + '.bfp';
            }
        }

        var len = this._dependentPack.length;
        for (var i=0; i<len; i++) {
            var assetObj = this._dependentPack[i]._getAssetsObjectWithDependent(bPackAsset, bExcludePackFiles);
            for (p in assetObj) {
                if (assetObj.hasOwnProperty(p)) {
                    ret[p] = assetObj[p];
                }
            }
        }
        return ret;
    },
    */

});

ResPack.create = function (name, assets){
    return new ResPack(name, assets);
};