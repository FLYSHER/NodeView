var g_fileName = "test.txt";
var g_fileContext ="nothing :)";




$('#DownloadBtn').click( function(){
    console.log( 'Download Button is under construction');
    //download(g_fileName,g_fileContext);
}.bind(this));

function download(filename, text) {
    var element = document.createElement('a');

    var jsonStr = convertToJSON(text);
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));

    var ext = cc.path.extname(filename).toLowerCase();
    var jsonName = "";
    if ( ext === '.exportjson'){
        jsonName = filename.replace('ExportJson', 'json');
    }
    else {
        jsonName = filename;
    }
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