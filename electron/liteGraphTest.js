//https://github.com/jagenjo/litegraph.js
var isDebug = true;

var mainGraph = null;
var mainGraphCanvas = null;
var CanvasProperty = {

}
var htmlUtil = {}
htmlUtil.CreateButton = function(name, icon_url, callback) {
    var button = document.createElement("button");
    if (icon_url) {
        button.innerHTML = "<img src='" + icon_url + "'/> ";
    }
    button.classList.add("btn");
    button.innerHTML += name;
    if(callback)
        button.addEventListener("click", callback );
    return button;
};

var createMenu = function (root){
    var id = "playnode_button";
    var name = " Play";
    var icon_url = null;
    var container = ".header";
    var callback =  function () {
        mainGraph.runStep(1, true);
         console.log("[CHECK]")
    };
    var button  =htmlUtil.CreateButton(name, icon_url, callback);
    button.id = id;
    root.querySelector(container).appendChild(button);

    id = "playstepnode_button";
    name = " Step";
    icon_url = null;
    container = ".header";
    callback = null;
    button  =htmlUtil.CreateButton(name, icon_url, callback);
    button.id = id;
    root.querySelector(container).appendChild(button);
}

var init = function (){
    var graph = new LGraph();

    var canvas = new LGraphCanvas("#mycanvas", graph);

    // this.tools = root.querySelector(".tools");
    // this.content = root.querySelector(".content");
    // this.footer = root.querySelector(".footer");


    var node_const = LiteGraph.createNode("action/start");
    node_const.pos = [100,100];
    graph.add(node_const);

    var moveTo = LiteGraph.createNode("action/moveTo");
    moveTo.pos = [100,200];
    graph.add(moveTo);
    node_const.connect(0, moveTo, 0 );

    var scaleTo = LiteGraph.createNode("action/scaleTo");
    scaleTo.pos = [100,400];
    graph.add(scaleTo);
    node_const.connect(0, scaleTo, 0 );

    var moveTo2 = LiteGraph.createNode("action/moveTo");
    moveTo2.pos = [400,200];
    graph.add(moveTo2);
    moveTo.connect(0, moveTo2, 0 );


    var end =  LiteGraph.createNode("action/end");
    end.pos = [400,400];
    graph.add(end);
    moveTo2.connect(0, end, 0 );


    // graph.start();
    mainGraph = graph;
    mainGraphCanvas = canvas;

    var root = document;
    createMenu(root);

    // var mainMenuoptions = {
    //     callback: null,
    //     event : 'CustomEvent'
    // };
    // var ref_window = mainGraphCanvas.getCanvasWindow();
    // LiteGraph.ContextMenu( ["Top", "Bottom", "Left", "Right"], mainMenuoptions);


    // $('#button_start').on('click', function () {
    //     // mainGraph.runStep(1, true);
    //     // console.log("[CHECK]")
    //     // eventfun("request_nodeTree" , null,
    //     //     function (args){
    //     //         console.log("request_nodeTree : ", args);
    //     //     });
    // });

}
document.addEventListener('readystatechange', event => {
    console.log("document readystatechange" + event.target.readyState);
    // When HTML/DOM elements are ready:
    if (event.target.readyState === "interactive") {   //does same as:  ..addEventListener("DOMContentLoaded"..

    }

    // When window loaded ( external resources are loaded too- `css`,`src`, etc...)
    if (event.target.readyState === "complete") {

    }
});
//register in the system
// LiteGraph.clearRegisteredTypes();

//Action Node Class
var ActionNode = {};
ActionNode.start = function (){
    this.addOutput("start","action");
    this.addProperty("Name", "actionName","text");
    var self = this;
    this.widget = this.addWidget("text", "Name", "actionName",    function(v) {
        self.properties.Name = v;
    });

    this.onExecute = function()
    {
        var actionNameProperty = this.getInputOrProperty("Name"); // this.getInputOrProperty("Name")
        var actionObj = {
            name : actionNameProperty
        }
        this.setOutputData( 0, actionObj );
    }
}
ActionNode.start.title =  "Start";

//Node : processFunction 한개
//   { order : 2  //실행순서
//     inputs : [ {name: 'In', type: 'action', link: 2} ]
//     outputs : [ {name: 'Next', type: 'action', links: null}]
//     properties : { time :1 }    //Node가 가지고있는 속성값 GUI(widgets)연결해야 컨트롤 할수 있다.
//     properties_info [ {name: 'time', type: undefined, default_value: 1}]
//     title : "MoveTo"
//     type : "action/moveTo"
//     widgets [ {type: 'number', name: 'time', value: 1, callback: undefined, options: {…}, …} ] //
//   }
//slot : Node에서 입력 또는 나가는 칸(그래프가 그려지는)
//LGraphCanvas.prototype.drawNodeWidgets
var ActionType = {
    spawn : "spawn",
    moveTo : "moveTo",
    scaleTo : "scaleTo"
}
ActionNodeCommonOnExecute = function (actionNode) {

    var actionInfo = {
        order : actionNode.order,
        type : actionNode.title,
        properties : actionNode.properties,
    }
    var actionObj = actionNode.getInputData(0);
    if(actionObj){
        if(!actionObj.actionList)
            actionObj.actionList = [];

        //만약 inNode에서 links가 여러개라면 배여롤 저장
        var isSpawn = false;
        var prevNode = actionNode.getInputNode(0);
        if(prevNode) {
            isSpawn = (prevNode.outputs[0].links.length > 1);
        }
        if(isSpawn){
            var spawnInfo =  null;
            if(actionObj.actionList.length > 0){
                var lastInfo = actionObj.actionList[actionObj.actionList.length - 1];
                if(lastInfo.type === ActionType.spawn){
                    spawnInfo = lastInfo;
                }
            }
            if(spawnInfo === null){
                spawnInfo = {
                    order : actionInfo.order,
                    type : ActionType.spawn,
                    actionList : [],
                }
                actionObj.actionList.push(spawnInfo);
            }
            spawnInfo.actionList.push(actionInfo);
        }
        else {
            actionObj.actionList.push(actionInfo);
        }
    }

    actionNode.setOutputData(0, actionObj);//아웃풋데이터로 넘김(0번슬롯)
}

ActionNode.moveTo = function (){
    this.addInput("In","action");
    this.addOutput("Next","action");

    var self = this;
    this.addProperty("duration", 1.0,"number");
    this.addProperty("XPos",   0,"number");
    this.addProperty("YPos",   0,"number");
    this.addWidget("number", "duration", this.properties.duration,function(v) {
        self.properties.duration = v;
    });
    this.addWidget("number", "XPos", this.properties.XPos,function(v) {
        self.properties.x = v;
    });
    this.addWidget("number", "YPos", this.properties.YPos,function(v) {
        self.properties.y = v;
    });
    this.onExecute = ActionNodeCommonOnExecute.bind(this, this);

    // this.onExecute = function()
    // {
    //     //'[{"name":"Next","type":"action","links":[3,4],"slot_index":0}]'
    //     let inputs = this.inputs;
    //     let outputs = this.outputs;
    //     if(outputs && outputs.length >0 && outputs[0].links && outputs[0].links.length > 0) {
    //         // mainGraph.getOutputLinkID()
    //         var nodes = this.getOutputNodes(0);
    //         var link_id = outputs[0].links[0];
    //         var link = mainGraph.links[link_id];
    //         if (link) {
    //             var target_node = this.graph.getNodeById(link.target_id);
    //             //nodes === target_node;
    //         }
    //     }
    //     if(inputs.length > 0) {
    //         let time = this.getInputData(0);
    //
    //         console.log("[CHECK] moveTo ", inputs, time);
    //         this.setOutputData(0, null);
    //     }
    // }
}
ActionNode.moveTo.title =  ActionType.moveTo;

ActionNode.scaleTo = function (){
    this.addInput("In","action");
    this.addOutput("Next","action");

    var self = this;
    this.addProperty("duration", 1.0,"number");
    this.addProperty("XScale",   0,"number");
    this.addProperty("YScale",   0,"number");
    this.addWidget("number", "duration", this.properties.duration,function(v) {
        self.properties.duration = v;
    });
    this.addWidget("number", "XScale", this.properties.x,function(v) {
        self.properties.x = v;
    });
    this.addWidget("number", "YScale", this.properties.y,function(v) {
        self.properties.y = v;
    });
    this.onExecute = ActionNodeCommonOnExecute.bind(this, this);

}
ActionNode.scaleTo.title =  ActionType.scaleTo;

function ContextMenu(options) {
    options = options || {};
    this.options = options;
    var root =  document.createElement("div");
    root.className = "litegraph litecontextmenu litemenubar-panel";
    if (options.className) {
        root.className += " " + options.className;
    }
    root.style.minWidth = 100;
    root.style.minHeight = 100;
    root.style.pointerEvents = "none";
    setTimeout(function() {
        root.style.pointerEvents = "auto";
    }, 100); //delay so the mouse up event is not caught by this element
    this.root = root;
    //scrollView
    root.style.overflow = "auto";
    root.style.height = "200";
    root.style.width = "200";

    ////JSTree
    this.hierarchyData = options.hierarchyData? options.hierarchyData : [];

    // this.addTreeNode  = function( id, parentID, text, realNode  ) {
    //     if( this.isExistNode( id, parentID ) ) {
    //         return;
    //     }
    //     this.hierarchyData.push({
    //         "id"        : id,
    //         "parent"    : parentID,
    //         "text"      : text
    //     });
    // };

    // this.isExistNode = function( id, parentID ) {
    //     var findOjb = this.hierarchyData.find( function (item){
    //         return ( item.parent === parentID && item.id === id );
    //     })
    //
    //     return !!findOjb;
    // },

    this.onRefreshTree = function() {
        this.jsTreeRoot.jstree(true).settings.core.data = this.hierarchyData;
        this.jsTreeRoot.jstree("refresh");
    },

//     this.addTreeNode(1,
// "#",
//     "Root");
//
//     var id = 1;
//     for(var n = 0; n < 30; n++) {
//         this.addTreeNode(id + 1,
//             id,
//             "Child" + id);
//         id = id +1;
//     }
//     this.addTreeNode(id,
//         1,
//         "Child1" + id);
//

    this._jstreeConfig = {
            'core' : {
                'themes' : {
                    "name": "default-dark",
                    "dots": false,
                    "icons": false
                },
                'data' : [
                ]
            },
            "plugins": [ "contextmenu"],
            "contextmenu" : {
                "items" : function (jsTreeNode) {
                    var obj = {};
                    obj[ "OpenTree" ] = {
                        "label" : "OpenTree",
                        "action" : function (obj) {
                            var n =   this.jsTreeRoot.jstree(true).get_node(obj.reference);
                            this.jsTreeRoot.jstree("open_all", n.id);
                            this.jsTreeRoot.jstree("refresh");
                        }.bind(this)
                    };
                    obj[ "CloseTree" ] = {
                        "label" : "CloseTree",
                        "action" : function (obj) {
                            var n =   this.jsTreeRoot.jstree(true).get_node(obj.reference);
                            this.jsTreeRoot.jstree("close_all", n.id);
                            this.jsTreeRoot.jstree("refresh");
                        }.bind(this)
                    };
                    return obj;
                }.bind(this)
            },
            // "search": {
            //     "case_sensitive": false,
            //     "show_only_matches": true
            // }
        };

    var jsTreeRoot = $(this.root); ///document.createElement("jstreeRoot"); // $('#jstreetest');//
    // jsTreeRoot.className = 'jstree-icon jstree-themeicon';
    // root = root.appendChild(jsTreeRoot);
    jsTreeRoot.jstree( this._jstreeConfig );
    jsTreeRoot.on("show_contextmenu.jstree", function (e, reference, element){
        // var $node = $('#'+reference.node.id),
        //     $menu = $('.vakata-context').first(),
        //     nodeTop = $node.offset().top,
        //     menuTop = nodeTop + $node.height() - $menu.height(),
        //     menuLeft = 200,
        //     $subMenu = $menu.find('ul'),

        $('.vakata-context').css('z-index', 9999);
    })
    jsTreeRoot.on("select_node.jstree", function (e, data) {
        if (options.callback) {
            var r = options.callback.call(
                this,
                data.node, //  { id: 1521, parent: 1407, text: 'cbShare' }
                options);

            if (this.root.parentNode) {
                this.root.parentNode.removeChild(this.root);
            }
        }
    }.bind(this));

    jsTreeRoot.bind("open_node.jstree close_node.jstree", function (e,data) {
        // var currentNode = data.node;
        // if(e.type === "open_node") {
        //    jsTreeRoot.jstree("refresh");
        // }
    })
    this.jsTreeRoot = jsTreeRoot;

    this.onRefreshTree();

    //insert before checking position
    var root_document = document;
    if (options.event) {
        root_document = options.event.target.ownerDocument;
    }
    if (!root_document) {
        root_document = document;
    }

    if( root_document.fullscreenElement )
        root_document.fullscreenElement.appendChild(root);
    else
        root_document.body.appendChild(root);

    //compute best position
    var left = options.left || 0;
    var top = options.top || 0;
    if (options.event) {
        left = options.event.clientX - 10;
        top = options.event.clientY - 10;
        if (options.title) {
            top -= 20;
        }

        if (options.parentMenu) {
            var rect = options.parentMenu.root.getBoundingClientRect();
            left = rect.left + rect.width;
        }

        var body_rect = document.body.getBoundingClientRect();
        var root_rect = root.getBoundingClientRect();
        if(body_rect.height == 0)
            console.error("document.body height is 0. That is dangerous, set html,body { height: 100%; }");

        if (body_rect.width && left > body_rect.width - root_rect.width - 10) {
            left = body_rect.width - root_rect.width - 10;
        }
        if (body_rect.height && top > body_rect.height - root_rect.height - 10) {
            top = body_rect.height - root_rect.height - 10;
        }
    }

    root.style.left = left + "px";
    root.style.top = top + "px";

    if (options.scale) {
        root.style.transform = "scale(" + options.scale + ")";
    }
}

ActionNode.end = function (){
    this.addInput("In","action");
    var widget = {
        type: "custom",
        name: "testBtn",
        value: "",
        data : null,
        options : {
            values : ['red', 'green']
        },
        mouse(event, pos, node){
            var w = this; //widget
            var x = pos[0];
            var y = pos[1];
            var deltaX = event.deltaX || event.deltax || 0;
            var old_data = w.data;
            var width = node.size[0];
            var widget_height = w.computeSize ? w.computeSize(width)[1] : LiteGraph.NODE_WIDGET_HEIGHT;
            var widget_width = w.width || width;

            var ref_window = mainGraphCanvas.getCanvasWindow();
            function inner_value_change(widget, text, data) {
                widget.value = text;
                widget.data = data;
                if (widget.callback) {
                    widget.callback(text, data, that, node, pos, event);
                }
            }

            if (event.type === LiteGraph.pointerevents_method+"move") {
            }
            else if (event.type === LiteGraph.pointerevents_method+"down") {
                eventfun(eventType.nodeTree , null,
                     function (data){
                         var menu = new ContextMenu(//new LiteGraph.ContextMenu( //new ContextMenu(
                             {
                                 scale: Math.max(1, mainGraphCanvas.ds.scale),
                                 event: event,
                                 className: "dark",
                                 callback: inner_clicked.bind(w),
                                 hierarchyData : data[0]
                             },
                             ref_window);
                     });

                function inner_clicked(v, option, event) {
                    inner_value_change(this, v.text, v);
                    mainGraphCanvas.dirty_canvas = true;
                    return false;
                }
            } //end mousedown
            else if(event.type === LiteGraph.pointerevents_method+"up") {

            }

            if( old_data != w.data && w.data != null )
                setTimeout(
                    function() {
                        inner_value_change(this,this.data.text, this.data);
                    }.bind(w),
                    20
                );
            mainGraphCanvas.dirty_canvas = true;
        },
        draw(ctx, node, widget_width, y, widget_height) {
            console.log("[CHECK] aaa");
            var margin = 15;
            var w = this;
            var show_text = mainGraphCanvas.ds.scale > 0.5;

            var outline_color = LiteGraph.WIDGET_OUTLINE_COLOR;
            var background_color = LiteGraph.WIDGET_BGCOLOR;
            var text_color = LiteGraph.WIDGET_TEXT_COLOR;
            var secondary_text_color = LiteGraph.WIDGET_SECONDARY_TEXT_COLOR;
            var H = LiteGraph.NODE_WIDGET_HEIGHT;

            ctx.textAlign = "left";
            ctx.strokeStyle = outline_color;
            ctx.fillStyle = background_color;
            ctx.beginPath();
            if(show_text)
                ctx.roundRect(margin, y, widget_width - margin * 2, H, [H * 0.5] );
            else
                ctx.rect(margin, y, widget_width - margin * 2, H );
            ctx.fill();
            if (show_text) {
                if(!w.disabled)
                    ctx.stroke();
                ctx.fillStyle = text_color;
                ctx.fillStyle = secondary_text_color;
                ctx.fillText(w.label || w.name, margin * 2 + 5, y + H * 0.7);
                ctx.fillStyle = text_color;
                ctx.textAlign = "right";

                var v = w.value;
                if( w.options.values )
                {
                    var values = w.options.values;
                    if( values.constructor === Function )
                        values = values();
                    if(values && values.constructor !== Array)
                        v = values[ w.value ];
                }
                ctx.fillText(
                    v,
                    widget_width - margin * 2 - 20,
                    y + H * 0.7
                );
            }
        },
    };

    this.addCustomWidget(widget);
    this.addWidget("button","play","", function(v){
        console.log("play");
    });
    this.setSize( this.computeSize() );
    this.onExecute = function (){
        // {"name":"actionName","infos":[{"order":1,"type":"spawn","actionInfo":[{"order":1,"type":"moveTo","properties":{"time":1,"XPos":0,"YPos":0},"actionInfoList":null},{"order":2,"type":"scaleTo","properties":{"time":1,"XScale":0,"YScale":0},"actionInfoList":null}]},{"order":3,"type":"moveTo","properties":{"time":1,"XPos":0,"YPos":0},"actionInfoList":null}]}
        var actionObj = this.getInputData(0);
        var str = JSON.stringify(actionObj);
        this.widgets[0].value;
        this.widgets[0].data;
        console.log("[CHECK] output ", str);
    }
}
ActionNode.end.title = "end";

var ActionParser = {};
ActionParser.GetCocosAction = function (infodata){
    if(infoData.actionList){ //ActionParser.CreateSequenceAction

    }
    else { //ActionParser.CreateBaseAction

    }
}

ActionParser.CreateSequenceAction = function (infodata){
    var actionArray = [];
    for (var i = 0; i < infodata.length; i++) {
        var subAction = ActionParser.CreateBaseAction(attr.children[i],runTargetNode, isJSStr);
        if(cc.isArray(subAction)){
            actionArray = actionArray.concat(subAction);
        }
        else {
            actionArray.push(subAction);
        }
    }
}

ActionParser.CreateBaseAction = function (type,param){
    var action = null;
    switch(attr.data.type) {
        case "moveTo":
            action = cc.moveTo(Number(param.duration), cc.p(Number(param.x), Number(param.y)));
            break;
        case "moveBy":
            action = cc.moveBy(Number(param.duration), cc.p(Number(param.x), Number(param.y)));
            break;
        case "scaleTo":
            action = cc.scaleTo(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "scaleBy":
            action = cc.scaleBy(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "rotateTo":
            action = cc.rotateTo(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "rotateBy":
            action = cc.rotateBy(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "skewTo":
            action = cc.skewTo(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "skewBy":
            action = cc.skewBy(Number(param.duration), Number(param.x), Number(param.y));
            break;
        case "fadeIn":
            action = cc.fadeIn(Number(param.duration));
            break;
        case "fadeOut":
            action = cc.fadeOut(Number(param.duration));
            break;
        case "jumpTo":
            action = cc.jumpTo(Number(param.duration), cc.p(Number(param.x), Number(param.y)), Number(param.height), Number(param.jumps));
            break;
        case "jumpBy":
            action = cc.jumpBy(Number(param.duration), cc.p(Number(param.x), Number(param.y)), Number(param.height), Number(param.jumps));
            break;
        case "blink":
            action = cc.blink(Number(param.duration), Number(param.blinks));
            break;
        case "tintTo":
            action = cc.tintTo(Number(param.duration), Number(param.r), Number(param.g), Number(param.b));
            break;
        case "tintBy":
            action = cc.tintBy(Number(param.duration), Number(param.r), Number(param.g), Number(param.b));
            break;
        case "show":
            action = cc.show();
            break;
        case "hide":
            action = cc.hide();
            break;
        case "place":
            action = cc.place(cc.p(Number(param.x), Number(param.y)));
            break;
        case "flipX":
            action = cc.flipX(eval(param.flip));
            break;
        case "flipY":
            action = cc.flipY(eval(param.flip));
            break;
    }
}
ActionParser.parser = function (json){

    for(var n = 0; n < json.actionInfo.length; n++){

    }

    var action = cc.sequence();

}

for(var key in ActionNode){
    LiteGraph.registerNodeType("action/" +key, ActionNode[key]);
}

//cc.runAction(cc.sequence())


//regrion Save Load
// /*
// elem.querySelector("#save").addEventListener("click",function(){
//     console.log("saved");
//     localStorage.setItem( "graphdemo_save", JSON.stringify( graph.serialize() ) );
// });
//
// elem.querySelector("#load").addEventListener("click",function(){
//     var data = localStorage.getItem( "graphdemo_save" );
//     if(data)
//         graph.configure( JSON.parse( data ) );
//     console.log("loaded");
// });
//
// elem.querySelector("#download").addEventListener("click",function(){
//     var data = JSON.stringify( graph.serialize() );
//     var file = new Blob( [ data ] );
//     var url = URL.createObjectURL( file );
//     var element = document.createElement("a");
//     element.setAttribute('href', url);
//     element.setAttribute('download', "graph.JSON" );
//     element.style.display = 'none';
//     document.body.appendChild(element);
//     element.click();
//     document.body.removeChild(element);
//     setTimeout( function(){ URL.revokeObjectURL( url ); }, 1000*60 ); //wait one minute to revoke url
// });
//*/

var eventfun = null;
var eventType = {
    nodeTree : "request_nodeTree",
}
if(isDebug === false) {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('channel1', (event, ...args) => {
        //do something with message
        console.log("cccc "+ event + args);
        init();
        ipcRenderer.send('onTest2', ["end"]); //ipcMain쪽으로 onTest2 이벤트를 보냄 ipcMain.on("onTest2" ..)통해 받음
    });




    //ipcMain : back쪽에서 electron데이타 처리
    //ipcRenderer : 는 BrowserWindow 쪽 그래서 ipcRenderer.send가 아니고 loadManager._mainWindow.webContents.send 로 처리
    eventfun = function (eventName, data, receiveCallback){
        switch (eventName){
            case eventType.nodeTree:
                var listenerFunc = (event, ...args) => {
                    //do something with message
                    ipcRenderer.removeListener(eventName, listenerFunc);
                    console.log("eventName ", eventName , args);
                    receiveCallback && receiveCallback(args);
                }
                ipcRenderer.on(eventName, listenerFunc);
                ipcRenderer.send(eventName);
            break;
        }
    }
}
else {
    eventfun = function (eventName, data){
        return null;
    }

    init();
}
