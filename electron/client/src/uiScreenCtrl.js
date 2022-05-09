var UIScreenCtrl = cc.LayerColor.extend({
    TAG_XPOS : 1,
    TAG_YPOS : 2,
    _cb : null,
    ctor: function(cb) {
        this._super(color.backgroundColor);

        this.updateLock = false;
        this.FONTSIZE = 25
        this.WIDTH =  80;
        this.HEIGHT = this.FONTSIZE;
        var size = cc.size(this.WIDTH, this.HEIGHT);

        this.setContentSize(cc.size(this.WIDTH * 2 + this.FONTSIZE, this.HEIGHT));


        this.xposEditbox = new cc.EditBox(size);
        this.xposEditbox.setTag(this.TAG_XPOS);
        this.xposEditbox.setPosition(size.width / 2, size.height /2);
        this.xposEditbox.setFontSize(this.FONTSIZE);
        this.xposEditbox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.xposEditbox.setDelegate(this);
        this.xposEditbox.setString(String(cc.winSize.width.toFixed(0)));
        this.addChild(this.xposEditbox);

        this.Xlabel = new cc.LabelTTF("X", "Arial", this.FONTSIZE);
        this.Xlabel.setContentSize(cc.size(this.FONTSIZE , this.FONTSIZE));
        // position the label on the center of the screen
        this.Xlabel.x = size.width;
        this.Xlabel.y = size.height / 2;
        // add the label as a child to this layer
        this.addChild(this.Xlabel, 5);

        this.yposEditbox = new cc.EditBox(size);

        this.yposEditbox.setTag(this.TAG_YPOS);
        this.yposEditbox.setPosition(size.width / 2 + size.width + this.FONTSIZE , size.height /2);
        this.yposEditbox.setFontSize(this.HEIGHT);
        this.yposEditbox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.yposEditbox.setDelegate(this);
        this.yposEditbox.setString(String(cc.winSize.height.toFixed(0)));
        this.addChild(this.yposEditbox);

        this._cb = cb;
        //this.schedule(this.update, 1,1,1);
        return true;
    },

    onEnter: function() {
        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setCascadeColorEnabled(true);
        this.setOpacity(128);
    },

    editBoxEditingDidBegan : function (editBox){
        cc.log("[CHECK] editBoxEditingDidBegin");
    },

    editBoxEditingDidEnded : function (editBox){
        cc.log("[CHECK] editBoxEditingDidEnded");
        this.editBoxTextChanged(editBox,editBox.getString());
    },

    editBoxTextChanged : function (editBox, text){
        cc.log("[CHECK] editBoxEditingChanged", text);
        var pos = parseFloat(editBox.getString());
        if(!isNaN(pos)) {
            if(pos < 100)
                pos = 100;
            var size = cc.winSize;
            if (editBox.getTag() === this.TAG_XPOS) {
                size.width = pos;
            }
            else {
                size.height = pos;
            }
            cc.view.setDesignResolutionSize(size.width, size.height, cc.ResolutionPolicy.FIXED_HEIGHT);
            cc.log("[CHECK] : ", size.width, size.height);

            if(this._cb)
                this._cb();

            this.xposEditbox.setString(String(cc.winSize.width.toFixed(0)));
            this.yposEditbox.setString(String(cc.winSize.height.toFixed(0)));
        }
    }
});