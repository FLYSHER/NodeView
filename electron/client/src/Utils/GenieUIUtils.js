var Genie = Genie || {};

Genie.UIUtil= {
    parseWidgetTreeRecursively : function( obj, arrDependant ) {
        if (obj != null) {
            if (obj["classname"] != null && obj["options"] != null) {
                if (obj["classname"] === "LabelBMFont") {
                    let fileData = obj["options"]["fileNameData"];
                    if (fileData != null) {
                        if (fileData["path"] != null) {
                            let fileDataPath = fileData["path"];
                            if (fileDataPath.endsWith(".fnt")) {
                                let fontPng = fileDataPath.replace(".fnt", ".png");
                                arrDependant.push(fileDataPath);
                                arrDependant.push(fontPng);
                            } else {
                                //Console.WriteLine("WARNING - LabelBMFont hasn't fnt file" + fileData["path"].Value<string>());
                            }
                        }
                    }
                }
            }

            obj["children"].forEach(function (e) {
                Genie.UIUtil.parseWidgetTreeRecursively(e, arrDependant);
            });
        }
    }
}