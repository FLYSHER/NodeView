var type_tab = {
    type_hierarchy: 999,
    type_symbol: 1999,
}

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

function saveSymbolData() {
    console.save = function () {
        let filename = "slotDefines" + ".js";
        let data = '';

        const parseSlotDefines = JSON.parse(JSON.stringify(SkinList[Tool_Select_Type]));

        for (let key in parseSlotDefines) {
            delete parseSlotDefines[key].index;
            delete parseSlotDefines[key].skinindex;
        }

        let SymbolProperty = {
            "DefaultSymbolPoolsize:": 3,
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

