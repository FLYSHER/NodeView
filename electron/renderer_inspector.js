
var InspectorRenderer = {
    inspectorRoot : null,

    init : function() {
        this.inspectorRoot = $(".inspector");
        this.inspectorRoot.append(
            "       <div> transformation\n" +
            "            <div>\n" +
            "                <form>\n" +
            "                    <label>position</label>\n" +
            "                    <label>x</label>\n" +
            "                    <input type=\"text\">\n" +
            "                    <label>y</label>\n" +
            "                    <input type=\"text\">\n" +
            "                </form>\n" +
            "            </div>\n" +
            "        </div>");
    },
}