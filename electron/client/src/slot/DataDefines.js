var type_tab = {
    type_hierarchy: 999,
    type_symbol: 1999,
}

var DEFAULT_SCREEN_SIZE = {
    x: 1920,
    y: 977,
}

var SLOT_NUMBER = 187;
var SLOT_NAME = "WickedBoosFamily"
var SLOT_ENTRY = "slotEntry";
var SLOT_LOADINGIMG = "sl_loadingImg";

var Tool = null;                // mainLayer
var Tool_Select_Type = type_tab.type_hierarchy; // current tool type

var UISkinList = [];            // ui skin info         -- read only
var SymbolSkinList = [];        // symbol skin info     -- read/write
var SkinList = [];
SkinList[type_tab.type_hierarchy] = UISkinList;
SkinList[type_tab.type_symbol] = SymbolSkinList;

var UINodeList = [];            // ui node info         -- read only
var SymbolNodeList = [];        // symbol node info     -- read/write
var NodeList = [];
NodeList[type_tab.type_hierarchy] = UINodeList;
NodeList[type_tab.type_symbol] = SymbolNodeList;

var selectIndex = -1;
var selectItem = null;          // selected item

function getRealIndex() {
    // 하이라키, 심볼 위젯에 노드가 추가되고 삭제될때 실제로 선택된 위치의 인덱스를 가져온다
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            return key;
        }
    }
    return -1;
}

function removeSkin() {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            SkinList[Tool_Select_Type].splice(key, 1);

            NodeList[Tool_Select_Type][key].removeFromParent(true);
            NodeList[Tool_Select_Type].splice(key, 1);
        }
    }
}

function setSymbolId(value) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            info.id = value;
            break;
        }
    }
}

function setSkinData(value) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            info.skinindex = value;

            for (let anim in info.animationinfo) {
                for (let skin in info.animationinfo[anim].skininfo) {
                    let result = info.animationinfo[anim].skininfo[skin];
                    result.skinindex = value;
                }
            }
            break;
        }
    }
}

function setMoveXData(value) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            info.addPosX = value;
            break;
        }
    }
}

function setMoveYData(value) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            info.addPosY = value;
            break;
        }
    }
}

function getSkinData() {
    let skinNode = null;
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            skinNode = info;
        }
    }
    return skinNode;
}

function getSKinDataLast(){
    let index = SkinList[Tool_Select_Type].length - 1;
    if(index >= 0){
        return SkinList[Tool_Select_Type][index];
    }
    return null;
}

function getSelectNode() {
    let node = null;
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            node = NodeList[Tool_Select_Type][key];
        }
    }
    return node;
}

function getSkinList(dic) {
    let skinList = [];
    for (let key in dic) {
        if (key[0] === '[') {
            skinList.push(key);
        }
    }
    return skinList;
}

function collectionHas(a, b) { //helper function (see below)
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] == b) {
            return true;
        }
    }
    return false;
}

function findParentBySelector(elm, selector) {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while (cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
}

function saveResourceData() {
    console.save = function () {
        let filename = "resources" + ".js";
        let result = "// region " + SLOT_NUMBER + "\n" + "var resSlot" + SLOT_NUMBER + " = {\n";
        for (let index in slotResourceData) {
            let data = slotResourceData[index];
            let path = data.webkitRelativePath.substr(7);
            var str = data.name.split('.');

            let info = "";
            let nick = str[0].substr(3);

            if (str[1] === 'ExportJson') {
                info = nick + " : " + "\"" + path + "\"" + ",\n";
            } else if (str[1] === 'png') {
                info = nick + "_png" + " : " + "\"" + path + "\"" + ",\n";
            } else if (str[1] === 'fnt') {
                info = nick + " : " + "\"" + path + "\"" + ",\n";
            } else if (str[1] === 'plist') {
                info = nick + " : " + "\"" + path + "\"" + ",\n";
            }
            result += info;
        }

        result += "};\n";

        let paytable = "var g_res" + SLOT_NAME + " = convertObjToArr( res" + SLOT_NAME + " ).concat( g_resCommonEffect, g_resSlotMenu, g_resNewCashRace, g_resCommonSlotMenu );";
        result += paytable;

        let blob = new Blob([result], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }

    console.save();
}

function saveSymbolData() {
    console.save = function () {
        let filename = "slotDefines" + ".js";
        let data = '';

        const parseSlotDefines = JSON.parse(JSON.stringify(SkinList[Tool_Select_Type]));

        for (let key in parseSlotDefines) {
            delete parseSlotDefines[key].addPosX;
            delete parseSlotDefines[key].addPosY;
            delete parseSlotDefines[key].index;
            delete parseSlotDefines[key].skinindex;
        }

        let SymbolProperty = {
            "DefaultSymbolPoolsize:": 3,
            "LabelType": 0,
            "LabelMaxDigit": 3,
            "SymbolProperty": parseSlotDefines
        }
        let SymbolInfo = {
            "SymbolInfo": SymbolProperty
        }
        data = JSON.stringify(SymbolInfo)

        // for (let key in SkinList[Tool_Select_Type]) {
        //     delete SkinList[type_tab.type_symbol][key].index;
        //     delete SkinList[type_tab.type_symbol][key].skinindex;
        //
        //     let symbolData = JSON.stringify(SkinList[type_tab.type_symbol][key]);
        //     data += symbolData;
        //     data += '\n';
        // }

        let blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }

    if (SkinList[type_tab.type_symbol].length > 0) {
        console.save();
    }
}

