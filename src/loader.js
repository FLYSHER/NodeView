/**
 * Created by flysherdev11 on 2017. 6. 20..
 * Modified by OBG on 2017.11.19
 */

var Loader = Loader || {};

Loader.loadedFileNames = [];
Loader.armatureIDs = {};
Loader.armatureFrames = {};
Loader.uiURL = {};
Loader.uiTextures = {};
Loader.armatureList = [];
Loader.plistList = [];
Loader.textureList = [];

Loader.armatureData = {};
Loader.textures = {};
Loader.plistFiles = {};

var ResourceMapData = {};

Loader.init = function() {
    var canvas = cc._canvas;

    // see: https://stackoverflow.com/questions/3590058/does-html5-allow-drag-drop-upload-of-folders-or-a-folder-tree
    function traverseFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            // Get file
            item.file(function( file ) {
                Loader.readFile( file );
            });
        }
        else if (item.isDirectory) {
            // Get folder contents
            var dirReader = item.createReader();
            var read = dirReader.readEntries.bind( dirReader, function( entries ) {
                if( entries.length === 0 ) {
                    return;
                }
                for (var i=0; i<entries.length; i++) {
                    ResourceMapData[entries[i].name] = entries[i];
                    //traverseFileTree(entries[i], path + item.name + "/");
                }
                read();
            } );
            read();
        }
    }

    canvas.addEventListener(
        'dragover',
        function handleDragOver( evt ) {
            evt.stopPropagation();
            evt.preventDefault();
        }, false );

    canvas.addEventListener(
        "drop",
        function( evt ){
            evt.stopPropagation();
            evt.preventDefault();   // stops the browser from redirecting off to the image.

            var items = event.dataTransfer.items;
            for (var i=0; i<items.length; i++) {
                // webkitGetAsEntry is where the magic happens
                var item = items[i].webkitGetAsEntry();
                if (item) {
                    traverseFileTree(item);
                }
            }

            // Loader.readFile( evt.dataTransfer.files );
        }, false);
};

Loader.reset = function() {
    this.armatureIDs = {};
    this.fileData = {
        frameConfig : null,
        texture     : null,
        armatureData: null
    };
};

Loader.readFile = function( file ) {
    var self = this;
    var i, reader, ext;

    if( !file ) {
        return;
    }

    reader = new FileReader();
    ext = cc.path.extname(file.name).toLowerCase();
    if (ext === ".json" || ext === ".exportjson") {
        reader.readAsText(file);
    } else if (ext === ".plist") {
        reader.readAsText(file);
    } else if (ext === ".png") {
        reader.readAsDataURL(file);
    } else if (ext === ".fnt") {
        reader.readAsText(file);
    } else {
        cc.log("지원하지 않는 포멧: " + file.name );
        return;
    }

    reader.onload = ( function( f ) {
        return function( e ) {
            var url = f.name;
            var fileContents = e.target.result;
            var ext = cc.path.extname(f.name).toLowerCase();
            self._processFileData(url, fileContents, ext);
        }; // end of return function
    } )( file ); // end of onload funtion
};

Loader._processFileData = function( url, fileContents, ext ) {
    var self = this,
        armatureDataArr, i,dic;

    var fileName = cc.path.mainFileName( url );

    switch (ext) {
        case ".fnt":
            // cc.loader.cache[ "image/" + url ] = _fntLoader.parseFnt( fileContents, "image/" + url );
            break;
        case ".plist":
            var plistData = cc.plistParser.parse(fileContents);
            this.plistFiles[ fileName ] = cc.spriteFrameCache._parseFrameConfig( plistData );
            this.plistList.push( fileName );

            this.checkFiles( fileName, 'plist' );
            break;
        case ".png":
            cc.loader.loadImg(
                fileContents,
                {isCrossOrigin: false},
                function (err, img) {
                    var tex2d = new cc.Texture2D();
                    tex2d.initWithElement(img);
                    tex2d.handleLoadedTexture();
                    self.textures[ fileName ] = tex2d;
                    self.textureList.push( fileName );

                    self.checkFiles( fileName, 'png' );
                }
            );
            break;
        case ".json":
        case ".exportjson":
            dic = JSON.parse(fileContents);
            if( dic[ "widgetTree" ] ) {
                // UI
                cc.loader.cache[url] = dic;
                this.uiURL[ fileName ] = url;


                this.readResoueces(dic['textures'], dic['texturesPng'] );
                this.uiTextures[ fileName ] = dic[ "textures" ];
                this.checkFiles( fileName, 'ui' );
            } else if( dic[ ccs.CONST_ARMATURE_DATA ] ) {
                // Armature
                this.armatureData[ fileName ] = dic;
                this.readResoueces(dic['config_png_path'], dic['config_file_path'] );


                armatureDataArr = dic[ccs.CONST_ARMATURE_DATA] || [];
                if( !self.armatureIDs.hasOwnProperty( fileName ) ) {
                    self.armatureIDs[ fileName ] = [];
                }
                for(i = 0; i < armatureDataArr.length; ++i ) {
                    self.armatureIDs[ fileName ].push( armatureDataArr[ i ][ ccs.CONST_A_NAME ] );
                }

                var dataInfo = new ccs.DataInfo();
                ccs.dataReaderHelper.addDataFromJsonCache( dic, dataInfo );

                this.armatureFrames[ fileName ] = dic[ ccs.CONST_CONFIG_FILE_PATH ];
                this.armatureList.push( fileName );
                this.checkFiles( fileName, 'armature' );
            }
            break;
    }
};


Loader.readResoueces = function ( pngData, plistData ) {

    var i, pngNameSplit, plistgNameSplit;
    var pngNames = [];
    var plistNames = [];


    for( i = 0;i < pngData.length;i++){
        pngNameSplit =  pngData[i].split('/');
        pngNames.push(pngNameSplit[pngNameSplit.length - 1 ]);
    }


    for( i = 0;i < plistData.length;i++) {
        plistgNameSplit = plistData[i].split('/');
        plistNames.push(plistgNameSplit[plistgNameSplit.length - 1]);
    }


    var item = null;
    for (i=0; i<pngNames.length; i++) {
        item = ResourceMapData[pngNames[i] ];

        item.file(function( file ) {
            Loader.readFile( file );
        });
        //Loader.readFile(file);
    }

    for (i=0; i<plistNames.length; i++) {
        item = ResourceMapData[plistNames[i] ];
        item.file(function( file ) {
            Loader.readFile( file );
        });
    }

};


Loader.checkFiles = function ( fileName, type ) {
    var i;
    var fileNames = [];

    switch( type ) {
        case 'plist':
            if( this.textureList.indexOf( fileName ) >= 0 ) {
                this._addSpriteFrames( fileName );
                fileNames = this._checkAllArmatureFrames();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileNames[ i ] ] ) );
                }
                fileNames = this._checkAllUITextures();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadUI', this.uiURL[ fileNames[ i ] ] );
                }
            }
            break;
        case 'png':
            if( this.plistList.indexOf( fileName ) >= 0 ) {
                this._addSpriteFrames( fileName );
                fileNames = this._checkAllArmatureFrames();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileNames[ i ] ] ) );
                }
                fileNames = this._checkAllUITextures();
                for( i = 0; i < fileNames.length; i++ ) {
                    this.loadedFileNames.push( fileNames[ i ] );
                    cc.eventManager.dispatchCustomEvent( 'loadUI', this.uiURL[ fileNames[ i ] ] );
                }
            }
            break;
        case 'armature':
            if( this._checkArmatureFrames( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadArmature', JSON.stringify( this.armatureIDs[ fileName ] ) );
            }
            break;
        case 'ui':
            if( this._checkUIFile( fileName ) ) {
                this.loadedFileNames.push( fileName );
                cc.eventManager.dispatchCustomEvent( 'loadUI', this.uiURL[ fileName ] );
            }
            break;
    }
};

Loader._checkAllArmatureFrames = function() {
    var loadedFileNames = [];

    for( var fileName in this.armatureFrames ) {
        if( this._checkArmatureFrames( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

Loader._checkArmatureFrames = function( fileName ) {
    if( !this.armatureFrames.hasOwnProperty( fileName ) ) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    var config = this.armatureFrames[ fileName ];
    var loaded = true;
    for( var i = 0; i < config.length; i++ ) {
        var path = cc.path.basename( config[ i ], '.plist' );
        if( this.plistList.indexOf( path ) < 0 || this.textureList.indexOf( path ) < 0 ) {
            loaded = false;
            break;
        }
    }
    return loaded;
};

Loader._checkAllUITextures = function() {
    var loadedFileNames = [];

    for( var fileName in this.uiTextures ) {
        if( this._checkUIFile( fileName ) ) {
            loadedFileNames.push( fileName );
        }
    }

    return loadedFileNames;
};

Loader._checkUIFile = function( fileName ) {
    if( !this.uiTextures.hasOwnProperty( fileName ) ) {
        return false;
    }
    // if( this.loadedFileNames.indexOf( fileName ) >= 0 ) {
    //     return false;
    // }

    var textures = this.uiTextures[ fileName ];
    var loaded = true;
    for( var i = 0; i < textures.length; i++ ) {
        var path = cc.path.basename( textures[ i ], '.plist' );
        if( this.plistList.indexOf( path ) < 0 || this.textureList.indexOf( path ) < 0 ) {
            loaded = false;
            break;
        }
    }
    return loaded;
};

Loader._addSpriteFrames = function( fileName ) {
    var frameConfig = this.plistFiles[ fileName ];
    var tex = this.textures[ fileName ];
    var frames = frameConfig.frames;

    var spriteFrames = cc.spriteFrameCache._spriteFrames;
    var spAliases =  cc.spriteFrameCache._spriteFramesAliases;

    for( var key in frames ){
        var frame = frames[ key ];
        var spriteFrame = new cc.SpriteFrame(tex, cc.rect(frame.rect), frame.rotated, frame.offset, frame.size);
        var aliases = frame.aliases;
        if (aliases) {//set aliases
            for (var i = 0, li = aliases.length; i < li; i++) {
                var alias = aliases[i];
                spAliases[alias] = key;
            }
        }
        spriteFrames[key] = spriteFrame;
    }
};