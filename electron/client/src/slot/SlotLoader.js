
var SlotLoader = SlotLoader || {};

var loader = document.getElementById('SlotLoader');
var  preview = document.getElementById('file_list');

loader.addEventListener('change', SlotLoader.showTextFile);

var loaded = false;
var slotResourceData = {};


SlotLoader.showTextFile = function() {
    if (loaded === true)
        return;

    const selectedFiles = loader.files;
    const list = document.createElement('ul');
    preview.appendChild(list);

    for (const file of selectedFiles) {
        //summary.textContent = file.webkitRelativePath;
        let str = file.name.split('.');
        if (str[1] === 'ExportJson') {

            cc.director._scenesStack[0].getChildByName("MainLayer").setSlotResource(str[0]);
        } else {
            slotResourceData[file.name] = file;
        }
    }
    loaded = true;
}