var UiPositionCtrl = cc.LayerColor.extend({
    TAG_XPOS : 1,
    TAG_YPOS : 2,
    ctor: function() {
        this._super(color.backgroundColor);

        this.updateLock = false;
        this.FONTSIZE = 25
        this.WIDTH =  150;
        this.HEIGHT = this.FONTSIZE;
        var size = cc.size(this.WIDTH, this.HEIGHT);

        this.setContentSize(cc.size(this.WIDTH *2 +this.FONTSIZE, this.HEIGHT));


        this.xposEditbox = new cc.EditBox(size);
        this.xposEditbox.setTag(this.TAG_XPOS);
        this.xposEditbox.setPosition(size.width / 2, size.height /2);
        this.xposEditbox.setFontSize(this.FONTSIZE);
        this.xposEditbox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.xposEditbox.setDelegate(this);
        this.addChild(this.xposEditbox,5);

        this.Xlabel = new cc.LabelTTF("X", "Arial", this.FONTSIZE);
        this.Xlabel.setContentSize(cc.size(this.FONTSIZE , this.FONTSIZE));
        // position the label on the center of the screen
        this.Xlabel.x = size.width;
        this.Xlabel.y = size.height / 2;
        // add the label as a child to this layer
        this.addChild(this.Xlabel, 5);

        this.yposEditbox = new cc.EditBox(size);

        this.yposEditbox.setTag(this.TAG_YPOS);
        this.yposEditbox.setPosition(size.width / 2 +size.width + this.FONTSIZE , size.height /2);
        this.yposEditbox.setFontSize(this.HEIGHT);
        this.yposEditbox.setInputMode(cc.EDITBOX_INPUT_MODE_NUMERIC);
        this.yposEditbox.setDelegate(this);
        this.addChild(this.yposEditbox,5);

        this.contentSize =  new cc.LabelTTF("contentSize", "Arial", 15);
        this.contentSize.setHorizontalAlignment(cc.TEXT_ALIGNMENT_RIGHT);
        this.contentSize.setAnchorPoint(0,1);
        // position the label on the center of the screen
        this.contentSize.x = 0;
        this.contentSize.y = size.height  + this.FONTSIZE;
        this.addChild(this.contentSize);

        this.init(null);

        this.scheduleUpdate();
        //this.schedule(this.update, 1,1,1);
        return true;
    },

    init : function (targetNode) {

        cc.log("[CHECK] INIT : ");
        this.targetNode = targetNode;
        this.updateLock = false;
        if(this.targetNode) {
            var cSize =this.targetNode.getContentSize();
            this.contentSize.setString("ContentSize : " + String(cSize.width.toFixed(3)) +" X " + String(cSize.height.toFixed(3)));
            this.contentSize.x = 0;
            this.contentSize.y = this.HEIGHT  + this.FONTSIZE;
            this.setVisible(true);
        }
        else {
            this.setVisible(false);
        }
    },

    onEnter: function() {
        this._super();
        this.setCascadeOpacityEnabled(true);
        this.setCascadeColorEnabled(true);
        this.setOpacity(128);
    },

    update: function(dt) {
        if(this.targetNode && this.updateLock === false) {
            this.xposEditbox.setString(String(this.targetNode.getPosition().x.toFixed(2)));
            this.yposEditbox.setString(String(this.targetNode.getPosition().y.toFixed(2)));
        }
    },

    editBoxEditingDidBegan : function (editBox){
        cc.log("[CHECK] editBoxEditingDidBegin");
        if(this.targetNode) {
            this.updateLock = true;
            if( typeof this.targetNode.setDraggable === 'function' ) {
                this.targetNode.setDraggable( false );
            }
        }
    },

    editBoxEditingDidEnded : function (editBox){
        cc.log("[CHECK] editBoxEditingDidEnded");
        this.updateLock = false;
        if(this.targetNode) {
            if( typeof this.targetNode.setDraggable === 'function' ) {
                this.targetNode.setDraggable( true );
            }
        }
    },

    editBoxTextChanged : function (editBox, text){
        cc.log("[CHECK] editBoxEditingChanged", text);
        var pos = parseFloat(text);

        if( !isNaN(pos) && this.targetNode ) {
            var position = this.targetNode.getPosition();
            if (editBox.getTag() === this.TAG_XPOS) {
                position.x = pos;
            }
            else {
                position.y = pos;
            }
            this.targetNode.setPosition(position);
            this.xposEditbox.setString(position.x);
            this.yposEditbox.setString(position.y);
        }
    },

    editBoxReturn : function (editBox){
        cc.log("[CHECK] editBoxReturn");
    }
});