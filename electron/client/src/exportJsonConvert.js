/**
 * Cocos Studio 의 UI .json 을 NodeView 가 읽을 수 있는 ExportJson 형식으로 바꾼다.
 * (renderer.js 에서 Spine 이 아닌 .json 을 열 때 사용)
 */
function convertToExportJson(json) {
    var obj = JSON.parse(json);
    var textures = obj['textures'];
    for (var i = 0; i < textures.length; i++) {
        obj['texturesPng'][i] = obj['textures'][i].replace(/image\//, '').replace(/.plist/, '.png');
    }
    objectSearchInCascade(obj);
    var replaced_str = JSON.stringify(obj);
    replaced_str = replaced_str.replace(/image\//g, 'image\\/');
    return replaced_str;
}

// 병합 텍스처를 쓰도록 하고 plistFile 경로를 비운다
function objectSearchInCascade(obj) {
    for (var item in obj) {
        if (Array.isArray(obj[item])) {
            for (var i = 0; i < obj[item].length; i++) {
                objectSearchInCascade(obj[item][i]);
            }
        }
        else if (typeof obj[item] === "object" && obj[item] !== null) {
            objectSearchInCascade(obj[item]);
        }
        else if (item === 'useMergedTexture') {
            obj[item] = true;
        }
        else if (item === 'plistFile') {
            if (obj['path'] === null)
                obj[item] = null;
            else
                obj[item] = "";
        }
    }
}
