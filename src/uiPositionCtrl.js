var UiPositionCtrl = cc.Node.extend({
    TAG_XPOS : 1,
    TAG_YPOS : 2,
    ctor: function() {
        this._super();
        this.scheduleUpdate();
        //this.schedule(this.update, 1,1,1);
        return true;
    },

    init : function (targetNode) {
        this.targetNode = targetNode;
        this.updateLock = false;
    },


    update: function(dt) {
        if(this.targetNode && this.updateLock === false) {
            $("input[name=wPosX]").val(this.targetNode.getPosition().x.toFixed(2));
            $("input[name=wPosY]").val(this.targetNode.getPosition().y.toFixed(2));

        }
    }
});