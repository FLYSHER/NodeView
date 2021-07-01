function chooseColor(){
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
}

function changeFont(){
    var myFont = document.getElementById("input-font").value;
    document.execCommand('fontName', false, myFont);
}

function changeSize(){
    var mysize = document.getElementById("fontSize").value;
    document.execCommand('fontSize', false, mysize);
}

function checkDiv(){
    var editorText = document.getElementById("editor1").innerHTML;
    if(editorText === ''){
        document.getElementById("editor1").style.border = '5px solid red';
    }
}

function removeBorder(){
    document.getElementById("editor1").style.border = '1px solid transparent';
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

