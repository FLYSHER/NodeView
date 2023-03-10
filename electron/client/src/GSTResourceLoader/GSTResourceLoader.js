/**
 * Created by flysherdev11 on 2023. 3. 2..
 */

var GST = GST || {};

GST.ToolFileType = {
    NONE        : 0,
    UIFile      : 1,
    ARMATURE    : 2
}

GST.ResourceLoader = {

    cacheResource : function( fileEntry, resolve, reject ) {
        cc.log( " *** cacheResource *** ", fileEntry.name );
        if( !fileEntry || !fileEntry.name ) {
            return;
        }

        var extName = cc.path.extname( fileEntry.name ).toLowerCase();
        var key     = null;

        switch ( extName ) {
            case '.exportjson':
                key = fileEntry.name;
                cc.loader.cache[ fileEntry.name ] = JSON.parse( fileEntry.content );
                AssetRenderer.addAsset( key );
                resolve();
                break;
            case '.fnt':
                key = 'image/' + fileEntry.name;
                cc.loader.cache[ key ] = _fntLoader.parseFnt( fileEntry.content, key );
                AssetRenderer.addAsset( key );
                resolve();
                break;
            case '.plist':
                var plist_data = cc.plistParser.parse( fileEntry.content );
                key = 'image/' + fileEntry.name;
                cc.loader.cache[ key ] = plist_data;
                cc.spriteFrameCache.addSpriteFrames( key );
                AssetRenderer.addAsset( key );
                resolve();
                break;
            case '.png':
                // 이미지 파일 로딩 후 텍스쳐캐시매니저에 캐싱
                key = 'image/' + fileEntry.name;
                cc.loader.loadImg( fileEntry.content, { isCrossOrigin : false },
                    function( err, img ){
                        var tex2d = new cc.Texture2D();
                        tex2d.initWithElement(img);
                        tex2d.handleLoadedTexture();

                        cc.loader.cache[key] = tex2d;
                        cc.textureCache.cacheImage( key, tex2d );
                        AssetRenderer.addAsset( key );
                        resolve();
                    });
                break;
            default:

                break;
        }
    },

    getToolFileType : function( fileEntry ) {
        var dic = JSON.parse( fileEntry.content );
        var toolFileType = GST.ToolFileType.NONE;

        if( dic["widgetTree"] ) {
            toolFileType = GST.ToolFileType.UIFile;
        }
        else if( dic[ccs.CONST_ARMATURE_DATA] ) {
            toolFileType = GST.ToolFileType.ARMATURE;
        }

        return toolFileType;
    },

    createToolFileNode : function( fileEntry ) {
        console.log(" *** create node *** : ", fileEntry );
        var toolFileType = this.getToolFileType( fileEntry );
        if( toolFileType === GST.ToolFileType.UIFile ) {
            cc.eventManager.dispatchCustomEvent( "createUIFile", { uiFileName :  fileEntry.name} );
        }
        else if( toolFileType === GST.ToolFileType.ARMATURE ) {
            var arfileName = fileEntry.name;
            var arName     = cc.path.basename( fileEntry.name );
            ccs.armatureDataManager.addArmatureFileInfo( arfileName );
            var ar = new cc.Armature( arName );
            ar.setPosition( cc.winSize.width/2, cc.winSize.height/2 );
            cc.director.getRunningScene().addChild( ar );
            ar.getAnimation().playWithIndex(0);
        }
        else {

        }
    },

    // addSpriteFrames : function( fileName ) {
    //     var frameConfig = this.plistFiles[ fileName ];
    //     var tex = this.textures[ fileName ];
    //     var frames = frameConfig.frames;
    //
    //     var spriteFrames = cc.spriteFrameCache._spriteFrames;
    //     var spAliases =  cc.spriteFrameCache._spriteFramesAliases;
    //
    //     for( var key in frames ){
    //         var frame = frames[ key ];
    //         var spriteFrame = new cc.SpriteFrame(tex, cc.rect(frame.rect), frame.rotated, frame.offset, frame.size);
    //         var aliases = frame.aliases;
    //         if (aliases) {//set aliases
    //             for (var i = 0, li = aliases.length; i < li; i++) {
    //                 var alias = aliases[i];
    //                 spAliases[alias] = key;
    //             }
    //         }
    //         spriteFrames[key] = spriteFrame;
    //     }
    // }

};