var g_fileName = "test.txt";
var g_fileContext ="nothing :)";




$('#DownloadBtn').click( function(){
    console.log( 'Download Button is under construction');
 //   download(g_fileName,g_fileContext);
}.bind(this));

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

