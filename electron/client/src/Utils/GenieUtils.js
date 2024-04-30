var Genie = Genie || {};

Genie.Utils = {
    //배열 중복제거
    getUniqueValuesArray : function( arr ) {
        return arr.filter( function( value, index, self ) {
            return self.indexOf( value ) === index;
        } );
    },

    drawAllComponentInspector : function( node ) {
        var components = node._componentContainer._components;
        var comp;
        for( var key in components )
        {
            comp = components[key];
            comp.drawInspector && comp.drawInspector();
        }
    },

    getNodeWorldPosition : function( node ) {
        if( node instanceof ccui.Widget ) {
            return node.getWorldPosition();
        }
        else {
            var parent = node.getParent();
            parent = !!parent ? parent : node;
            return parent.convertToWorldSpace( node.getPosition() );
        }
    },

    componentToHex : function(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    },

    rgbToHex : function(colorOrR, g, b) {
        if( arguments.length === 1 ) {
            g = colorOrR.g;
            b = colorOrR.b;
            colorOrR = colorOrR.r;
        }
        return "#" + Genie.Utils.componentToHex(colorOrR) + Genie.Utils.componentToHex(g) + Genie.Utils.componentToHex(b);
    },

    //
    getSpriteFrameTextureName : function( spriteFrameName ) {
        var spriteFrame = cc.spriteFrameCache.getSpriteFrame( spriteFrameName );
        if( !spriteFrame ) {
            return null;
        }

        var meta, frames,
            frameConfigCache = cc.spriteFrameCache._frameConfigCache;
        for( var key in frameConfigCache ) {
            meta    = cc.spriteFrameCache._frameConfigCache[key].meta;
            frames  = cc.spriteFrameCache._frameConfigCache[key].frames;

            if( frames.hasOwnProperty( spriteFrameName ) ) {
                return meta.image;
            }
        }
    },

    getScreenCenterPos : function() {
        return cc.p( cc.winSize.width/2, cc.winSize.height/2 );
    },

    getMovementDataByName : function( armature, movName ) {
        var animationData   = armature.getAnimation().getAnimationData();
        var movementDataDic = animationData.movementDataDic;
        return movementDataDic[ movName ];
    },

    // .exportJson 파일로부터 툴 파일 타입이 뭔지 알아내기 위함. cc.loader.getRes 를 통한 객체
    getFileTypeFromExportJson : function ( fileName ) {
        var validCheck = cc.isString( fileName );
        validCheck = validCheck && ( cc.path.extname( fileName ) === ".ExportJson" );

        if( validCheck ) {
            // cc.loader.loader 에 이미 캐싱되어있는 애들만 체크
            var res = cc.loader.getRes( fileName );
            if( res ) {
                if( res.hasOwnProperty( 'widgetTree') ) {
                    return Genie.ToolFileType.UIFile;
                }
                else {
                    return Genie.ToolFileType.ARMATURE;
                }
            }
            else {
                return  Genie.ToolFileType.NONE;
            }
        }
        else {
            return  Genie.ToolFileType.NONE;
        }
    },

    getMovNamesFromExportJson : function( fileName ) {
        var moveNames = [];

        if( this.getFileTypeFromExportJson( fileName ) === Genie.ToolFileType.ARMATURE ) {
            var i,
                res         = cc.loader.getRes( fileName ),
                anim_data   = res['animation_data'][0],
                mov_data    = anim_data['mov_data'];

            for( i = 0; i < mov_data.length; ++i ) {
                moveNames.push( mov_data[i].name );
            }
        }

        return moveNames;
    },

    isAncestorVisible : function( node ){
        if ( !node ){
            cc.log('isVisibleInScene  node not exist', node  );
            return false;
        }
        if( node.getParent() !== null ){
            if( node.getParent().isVisible() === true )
                return Genie.Utils.isAncestorVisible(node.getParent());
            else
                return false;
        }
        else{
            return node.isVisible();
        }
    },

    camelize : function (str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
            if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
    },

    fixStringLength : function (str, length) {
        const whitespace = (' ').repeat(length);
        return (str + whitespace).substring(0, length);
    },

    /**
    * min ~ max 의 값을 newMin ~ newMax 의 값으로 압축 및 확장 스케일링 해주는 함수
    * */
    minMaxScaling : function (value, min, max, newMin, newMax) {
        return (value - min) * (newMax - newMin) / (max - min) + newMin;
    },

    /**
     * 선분 2개가 이루는 각도를 반환합니다.
     */
    calculateAngleOfTwoSegments : function (seg1Start, seg1End, seg2Start, seg2End) {
        var seg1DirectionX = seg1End.x - seg1Start.x,
            seg1DirectionY = seg1End.y - seg1Start.y;

        var seg2DirectionX = seg2End.x - seg2Start.x,
            seg2DirectionY = seg2End.y - seg2Start.y;

        var dotProduct = seg1DirectionX * seg2DirectionX + seg1DirectionY * seg2DirectionY;
        var seg1Length = Math.sqrt(seg1DirectionX * seg1DirectionX + seg1DirectionY * seg1DirectionY),
            seg2Length = Math.sqrt(seg2DirectionX * seg2DirectionX + seg2DirectionY * seg2DirectionY);

        var angle = Math.acos(dotProduct / (seg1Length * seg2Length));
        angle = cc.radiansToDegrees(angle);

        var crossProduct = seg1DirectionX * seg2DirectionY - seg1DirectionY * seg2DirectionX;

        if (crossProduct < 0) {
            angle = 360 - angle;
        }
        return angle;
    },

    /**
     *  백터의 길이를 최소 길이로 연장해서 반환
     */
    extendVectorToMinimumLength : function (vector, minLength) {
        var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
        if (length < minLength) {
            var scaleFactor = minLength / length;
            return cc.p(vector.x * scaleFactor, vector.y * scaleFactor);
        } else {
            return vector;
        }
    },

}