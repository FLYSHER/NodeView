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

function changeSymbolData(index, skinIndex) {
    //SymbolSkinList[index]
}

