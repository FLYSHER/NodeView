const { sentryRendererInit } = require('../../sentryRenderer');
sentryRendererInit();

var res = {
    HelloWorld_png : "res/HelloWorld.png",
    RobotoCondensedBold : "res/fonts/RobotoCondensed-Bold.ttf"
};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
