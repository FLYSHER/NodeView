var uiList = cc.Node.extend({
    selectItem: null,
    selectIndex: -1,
    index: 0,
    ctor: function () {
        this._super(color.backgroundColor);
        return true;
    },

    add: function (itemName) {
        const li = document.createElement("li");
        li.setAttribute('id', this.index);
        li.setAttribute('draggable', "true");

        li.ondragstart = this.dragStart.bind(this);
        li.ondragend = this.dragEnd.bind(this);


        const textNode = document.createTextNode(itemName);
        li.appendChild(textNode);

        document.getElementById('slotUiTree').appendChild(li);
        this.index++;
    },
    dragStart: function (e) {
        SlotLoader.currentSelectResourceName = e.currentTarget.innerText;
    },
    dragEnd: function (e) {
        // let fileName = e.currentTarget.innerText;
        // SlotLoader.readFile(fileName + ".ExportJson");
        SlotLoader.currentSelectResourceName = "";
    },
});