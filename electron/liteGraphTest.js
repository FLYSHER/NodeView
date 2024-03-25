//https://github.com/jagenjo/litegraph.js
var isDebug = true;

var mainGraph = null;
var init = function (){
    var graph = new LGraph();

    var canvas = new LGraphCanvas("#mycanvas", graph);

    var node_const = LiteGraph.createNode("events/timer");
    node_const.pos = [200,200];
    graph.add(node_const);
    // node_const.setValue(4.5);

    var node_watch = LiteGraph.createNode("events/log");
    node_watch.pos = [500,200];
    graph.add(node_watch);

    node_const.connect(0, node_watch, 0 );

    // graph.start();
    mainGraph = graph;

    $('#button_start').on( 'click',function (){
        mainGraph.runStep(1, true);
    });

}
//register in the system
// LiteGraph.clearRegisteredTypes();

//Action Node Class
var ActionNode = {};
ActionNode.start = function (){
    this.addOutput("start","startnode");
    this.addProperty("Name", "actionName");
    this.widget = this.addWidget("text", "Name", "actionName", "Name");
    this.onExecute = function()
    {
        let actionName = this.getInputOrProperty("Name")
        this.setOutputData( 0, actionName );
    }
}

ActionNode.start.title =  "Start";

ActionNode.targetCCNode = function (){
    this.addInput("start","startnode");
    this.addProperty("NodeName", "targetNodeName");
    this.widget = this.addWidget("text", "targetNodeName", "actionName", "Name");

    this.addOutput("run","action");
    this.onExecute = function()
    {
        // let inputs = this.inputs;
        // if(inputs.length > 0) {
        //     let actionName = this.getInputData(0);
        //     this.setOutputData(0, null);
        // }
    }
}
ActionNode.targetCCNode.title =  "TargetCCNode";

// cc.sequence(cc.moveTo(0.5, 10,10))
ActionNode.scquence = function (){
    this.addInput("In","action");
    this.addOutput("Next","action");
    this.onExecute = function()
    {
        let inputs = this.inputs;
        if(inputs.length > 0) {
            let actionName = this.getInputData(0);
            this.setOutputData(0, null);
        }
    }
}
ActionNode.scquence.title =  "Scquence";

for(var key in ActionNode){
    LiteGraph.registerNodeType("action/" +key, ActionNode[key]);
}

//cc.runAction(cc.sequence())

//Show value inside the debug console
function TimerEvent() {
    this.addProperty("interval", 1000); //this.properties.interval = 1000;
    this.addProperty("event", "tick"); //this.properties.event = tick;
    this.addOutput("on_tick", LiteGraph.EVENT);
    this.time = 0;
    this.last_interval = 1000;
    this.triggered = false;
}

TimerEvent.title = "Timer";
TimerEvent.desc = "Sends an event every N milliseconds";

TimerEvent.prototype.onStart = function() {
    this.time = 0;
};

TimerEvent.prototype.getTitle = function() {
    return "Timer: " + this.last_interval.toString() + "ms";
};

TimerEvent.on_color = "#AAA";
TimerEvent.off_color = "#222";

TimerEvent.prototype.onDrawBackground = function() {
    this.boxcolor = this.triggered
        ? TimerEvent.on_color
        : TimerEvent.off_color;
    this.color  = this.triggered? "#FF0000" : LiteGraph.NODE_DEFAULT_COLOR;
    // this.triggered = false;
};

TimerEvent.prototype.onExecute = function() {
    var dt = this.graph.elapsed_time * 1000; //in ms

    var trigger = this.time == 0;

    this.time += dt;
    this.last_interval = Math.max(
        1,
        this.getInputOrProperty("interval") | 0
    );

    if (
        !trigger &&
        (this.time < this.last_interval || isNaN(this.last_interval))
    ) {
        if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
            this.setOutputData(1, false);
        }
        return;
    }

    this.triggered = true;
    this.time = this.time % this.last_interval;
    console.log("[CHECK] " +this.properties.event + " : " + this.properties.interval);
    this.trigger("on_tick", this.properties.event);
    // if (this.inputs && this.inputs.length > 1 && this.inputs[1]) {
    //     this.setOutputData(1, true);
    // }
};

TimerEvent.prototype.onGetInputs = function() {
    return [["interval", "number"]];
};

TimerEvent.prototype.onGetOutputs = function() {
    return [["tick", "boolean"]];
};

LiteGraph.registerNodeType("events/timer", TimerEvent);

//Show value inside the debug console
function LogEvent() {
    this.size = [60, 30];
    this.addInput("event", LiteGraph.ACTION);
}

LogEvent.title = "Log Event";
LogEvent.desc = "Log event in console";

LogEvent.prototype.onAction = function(action, param, options) {
    console.log(action, param);
};

LiteGraph.registerNodeType("events/log", LogEvent);

//region
//node constructor class
function MyAddNode()
{
    this.addInput("A","number");
    this.addInput("B","number");
    this.addOutput("A+B","number");
    this.properties = { precision: 1 };
}
//name to show
MyAddNode.title = "Sum";
//function to call when the node is executed
MyAddNode.prototype.onExecute = function()
{
    var A = this.getInputData(0);
    if( A === undefined )
        A = 0;
    var B = this.getInputData(1);
    if( B === undefined )
        B = 0;
    this.setOutputData( 0, A + B );
}

function sum(a,b,c)
{
    return a+b+c;
}

LiteGraph.registerNodeType("basic/sum", MyAddNode );
LiteGraph.wrapFunctionAsNode("math/sum",sum, ["Boolen","Number"],"Number");

//////////////ex////////////
let baseConfig = {version:2.1, workflows:{}, jobs:{}};
// Workflow node.
function WorkflowNode() {
    this.addInput("Job 1", "job");
    this.addOutput("Workflow", "workflow")
    this.addProperty("Name", "build");
    this.widget = this.addWidget("text", "Name", "build", "Name");
}
WorkflowNode.title = "Workflow";
WorkflowNode.prototype.onExecute = function() {
    let inputs = this.inputs;
    if (this.getInputData(inputs.length - 1) != undefined) {
        this.addInput(`Job ${inputs.length + 1}`, "job")
    }
    let thisWorkflowConfig = baseConfig;
    thisWorkflowConfig["workflows"][this.getInputOrProperty("Name")] = {};
    for (let i = 0; i < inputs.length; i++) {
        let val = this.getInputData(i);
        for (var y in val) {
            thisWorkflowConfig["jobs"][y] = val[y];
            if (!thisWorkflowConfig["workflows"][this.getInputOrProperty("Name")]["jobs"]) {
                thisWorkflowConfig["workflows"][this.getInputOrProperty("Name")]["jobs"] = [];
            }
            thisWorkflowConfig["workflows"][this.getInputOrProperty("Name")]["jobs"].push(y);
        }
    }
    this.setOutputData(0, thisWorkflowConfig);
}
LiteGraph.registerNodeType("circleci/workflow", WorkflowNode);

// Job node.
function JobNode() {
    this.addInput("Executor", "executor");
    this.addProperty("Name", "build");
    this.widget = this.addWidget("text", "Name", "build", "Name");
    this.addInput("Step 1", "step");
    this.addOutput("Job", "job");
}
JobNode.title = "Job";
JobNode.prototype.onExecute = function() {
    let inputs = this.inputs;
    // Step inputs start @ 1.
    if (this.getInputData(inputs.length - 1) != undefined) {
        this.addInput(`Step ${inputs.length}`, "step")
    }
    let exec = this.getInputData(0);
    let jobStruct = {[this.getInputOrProperty("Name")]: {"steps": []}};
    for (var v in exec) {
        jobStruct[this.getInputOrProperty("Name")][v] = exec[v];
    }
    if (this.getInputData(1)) {
        for (let i = 1; i < inputs.length - 1; i++) {
            debugger;
            let val = this.getInputData(i);
            if (typeof val == "object") {
                for (var v in val) {
                    debugger;
                    jobStruct[this.getInputOrProperty("Name")]["steps"].push({[v]: val[v]});
                }
            }
            else { jobStruct[this.getInputOrProperty("Name")]["steps"].push(val); }
        }
    }
    this.setOutputData(0, jobStruct);
}
LiteGraph.registerNodeType("circleci/job", JobNode);

// Checkout node.
function CheckoutNode() {
    this.addProperty("Command", "checkout");
    this.addOutput("Step", "step");
}
CheckoutNode.title = "Checkout";
CheckoutNode.prototype.onExecute = function() {
    this.setOutputData(0, this.getInputOrProperty("Command"));
}
LiteGraph.registerNodeType("circleci/checkout", CheckoutNode);

// Step node.
function StepNode() {
    this.addProperty("Run Command", "string");
    this.widget = this.addWidget("text", "Run Command", "", "Run Command");
    this.addOutput("Step", "step");
}
StepNode.title = "Run Command";
StepNode.prototype.onExecute = function() {
    this.setOutputData(0, {run: this.getInputOrProperty("Run Command")});
}

LiteGraph.registerNodeType("circleci/run", StepNode);

// Executor node.
function ExecutorNode() {
    this.addProperty("Type", "executorType");
    this.widget = this.addWidget("text", "Type", "", "Type");
    this.addProperty("Image", "executorImagemage");
    this.widget = this.addWidget("text", "Image", "", "Image");
    this.addOutput("Executor", "executor"); //이름 타입
}
ExecutorNode.title = "Executor";
ExecutorNode.prototype.onExecute = function() {
    let execImg = this.getInputOrProperty("Image");
    let execType = this.getInputOrProperty("Type");

    let execObj = {[execType]: [{image: execImg}]};
    this.setOutputData(0, execObj);
}

LiteGraph.registerNodeType("circleci/executor", ExecutorNode);
//endregion

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
//endregion

if(!isDebug) {
    const {ipcRenderer, ipcMain} = require('electron');
    ipcRenderer.on('channel1', (event, ...args) => {
        //do something with message
        console.log("cccc "+ event + args);
        init();
        ipcRenderer.send('onTest2', ["end"]); //ipcMain쪽으로 onTest2 이벤트를 보냄 ipcMain.on("onTest2" ..)통해 받음
    });
}
else {
    init();
}
