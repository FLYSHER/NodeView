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
var selectItem = null;          // selected item ( callback 등... )
var selectSkin = null;          // selected skin 실제 선택된 스킨 데이터
var selectNode = null;          // selected node 실제 선택된 노드

function setSelectItem() {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.index === selectIndex) {
            selectSkin = info;
            selectNode = NodeList[Tool_Select_Type][key];
        }
    }
}

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
    selectSkin.id = value;
}

function setSkinData(value) {
    for (let anim in selectSkin.animationinfo) {
        for (let skin in selectSkin.animationinfo[anim].skininfo) {
            let result = selectSkin.animationinfo[anim].skininfo[skin];
            result.skinindex = value;
        }
    }
}

function getSkinData() {
    return selectSkin;
}

function setMoveXData(value) {
    selectSkin.posX = value;
}

function setMoveYData(value) {
    selectSkin.posY = value;
}

function setScaleXData(value) {
    selectSkin.scaleX = value;
}

function setScaleYData(value) {
    selectSkin.scaleY = value;
}

function setAnchorXData(value) {
    selectSkin.anchorX = value;
}

function setAnchorYData(value) {
    selectSkin.anchorY = value;
}

function setOffsetData(x, y) {
    selectSkin.offsetX = x;
    selectSkin.offsetY = y;
}

function setTagData(value) {
    selectSkin.tag = value;
}

function getSelectNode() {
    return selectNode;
}

function getNode(id) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.uiID === id) {
            return NodeList[Tool_Select_Type][key];
        }
    }
    return null;
}

function getSkin(id) {
    for (let key in SkinList[Tool_Select_Type]) {
        let info = SkinList[Tool_Select_Type][key];
        if (info.uiID === id) {
            return SkinList[Tool_Select_Type][key];
        }
    }
    return null;
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

function saveSceneData() {
    // let j = JSON.parse('{"1":{"id":"1","text":"187SymEachWinAR","icon":true,"parent":"-1","parents":["-1","#"],"children":["2"],"children_d":["2"],"data":null,"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"li_attr":{"id":"1"},"a_attr":{"href":"#","id":"1_anchor"},"original":{"id":1,"index":1,"text":"187SymEachWinAR","state":{"opened":true}}},"2":{"id":"2","text":"187SymJackpotAR","icon":true,"parent":"1","parents":["1","-1","#"],"children":[],"children_d":[],"data":null,"state":{"loaded":true,"opened":false,"selected":false,"disabled":false},"li_attr":{"id":"2"},"a_attr":{"href":"#","id":"2_anchor"},"original":{"id":2,"index":2,"text":"187SymJackpotAR","state":{"opened":true}}},"#":{"id":"#","parent":null,"parents":[],"children":["-1"],"children_d":["-1","1","2"],"state":{"loaded":true,"failed":false,"loading":false}},"-1":{"id":"-1","text":"root","icon":true,"parent":"#","parents":["#"],"children":["1"],"children_d":["1","2"],"data":null,"state":{"loaded":true,"opened":true,"selected":false,"disabled":false},"li_attr":{"id":"-1"},"a_attr":{"href":"#","id":"-1_anchor"},"original":{"tag":"","posX":0,"posY":0,"scaleX":1,"scaleY":1,"anchorX":0.5,"anchorY":0.5,"offsetX":0,"offsetY":0,"skinindex":-1,"index":-1,"id":-1,"text":"root"}}}');
    // $("#hierarchTree").jstree(true)._model.data = j;
    // Tool._hierarchy.index = 100;


    console.save = function () {
        let filename = "Scene" + ".js";
        let data = '';

        const parseSkinData = JSON.parse(JSON.stringify(SkinList[Tool_Select_Type]));
        const parseHierarchyData = $("#hierarchTree").jstree(true)._model.data;

        let HierarchyProperty = {
            "Hierarchy": parseHierarchyData,
            "UI": parseSkinData,
        }

        let Scene = {
            "Scene": HierarchyProperty
        }

        data = JSON.stringify(Scene);

        let blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }

    if (SkinList[type_tab.type_hierarchy].length > 0) {
        console.save();
    }
}

function saveSymbolData() {
    console.save = function () {
        let filename = "slotDefines" + ".js";
        let data = '';

        const parseSlotDefines = JSON.parse(JSON.stringify(SkinList[Tool_Select_Type]));

        for (let key in parseSlotDefines) {
            delete parseSlotDefines[key].posX;
            delete parseSlotDefines[key].posY;
            delete parseSlotDefines[key].scaleX;
            delete parseSlotDefines[key].scaleY;
            delete parseSlotDefines[key].anchorX;
            delete parseSlotDefines[key].anchorY;
            delete parseSlotDefines[key].offsetX;
            delete parseSlotDefines[key].offsetY;
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
        data = JSON.stringify(SymbolInfo);

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

