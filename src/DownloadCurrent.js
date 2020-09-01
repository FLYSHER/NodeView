var g_fileName = "test.txt";
var g_fileContext ="nothing :)";
var g_currentObj = null;


$('#DownloadBtn').click( function(){
    //console.log( 'Download Button is under construction');
    if ( !!g_currentObj ){
        var exportjson = JSON.stringify( g_currentObj );
        exportjson = exportjson.replace(/image\//g, 'image\\/');
        download(g_fileName,exportjson);
    }

}.bind(this));

function download(filename, text) {
    var element = document.createElement('a');
    var ext = cc.path.extname(filename).toLowerCase();
    var jsonName = "", jsonStr = "";
    if ( ext === '.exportjson'){
        jsonName = filename.replace('ExportJson', 'json');
        jsonStr = convertToJSON(text);
    }
    else {
        jsonName = filename;
        jsonStr = convertToJSON(text);
    }
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    element.setAttribute('download', jsonName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function convertToJSON(exportJson){
    var replaced_str = exportJson;//.replace(/,/g, ',\n');
    return replaced_str;
}

function convertToExportJson(json){
    var obj = JSON.parse( json );
    var textures = obj['textures'];
    for( var i = 0 ;i < textures.length ; i ++){
        obj['texturesPng'][i] = obj['textures'][i].replace(/image\//, '').replace(/.plist/, '.png');
    }


    objectSearchInCascade(obj);

    g_currentObj = obj;
    replaced_str = JSON.stringify( obj );
    replaced_str = replaced_str.replace(/image\//g, 'image\\/');
    return replaced_str;
   // download( 'test.Exportjson', replaced_str );
}


function objectSearchInCascade( obj ){
    for( var item in obj ){
        if ( Array.isArray( obj[item] )){
            for( var i = 0; i < obj[item].length ; i ++ ){
                objectSearchInCascade( obj[item][i]);
            }
        }
        else if ( typeof obj[item] === "object" && obj[item] !== null ){
            objectSearchInCascade( obj[item] );
        }
        else if ( item === 'useMergedTexture'){
            obj[item] = true;
        }
        else if ( item === 'plistFile'){
            if ( obj['path'] === null )
                obj[item] = null;
            else
                obj[item] = "";
        }
    }

}


function changePosition( obj, name, position){
    for( var item in obj ){
        if ( Array.isArray( obj[item] )){
            for( var i = 0; i < obj[item].length ; i ++ ){
                changePosition( obj[item] , name, position);
            }
        }
        else if ( typeof obj[item] === "object" && obj[item] !== null ){
            if ( obj[item]['name'] === name){
                console.log( "FIND : ", name);
                obj[item]['x'] = position.x;
                obj[item]['y'] = position.y;
                return;
            }
            else {
                changePosition( obj[item] , name, position);
            }
        }


    }
}