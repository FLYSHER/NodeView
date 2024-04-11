// const { sentryRendererInit } = require('../../../../sentryRenderer');
// sentryRendererInit();

var Genie = Genie || {};
Genie.Test = Genie.Test || {};

Genie.Test.TestListItem = cc.Node.extend({

    ctor : function (label, fontSize) {

        this._super("Genie.Test.TestLitItem");
        this._label  = label;
        this._fontSize = fontSize;
        this.init();
    },

    init: function () {

        this.setContentSize(200,23);
        this.btn = new ccui.Button();
        this.btn.setContentSize(200, 20);
        this.addChild(this.btn);

        var label = new ccui.Text(this._label, "Arial", this._fontSize);
        label.setAnchorPoint(0,0);
        this.btn.addChild(label);
    },

})

Genie.Test.TestListView = ccui.ListView.extend({
    ctor :function(width, height, fontSize){

        this._super();
        this.setName("Genie.Test.TestListVIew");
        if (fontSize == null)
            fontSize = 15;
        this._fontSize = fontSize;
        this.setContentSize(width, height);
        this.initListView();
    },
    initListView : function () {

        this.setDirection(ccui.ScrollView.DIR_VERTICAL);
        this.setItemsMargin(0);
        this.setBounceEnabled(true);
        this.setInertiaScrollEnabled(true);
        this.setGravity(ccui.ListView.GRAVITY_LEFT);
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.BLACK);
        this.setBackGroundColorOpacity(100);
        this.setItemModel(new Genie.Test.TestListItem());

    },

    addListItemBtn : function(text, onClick, fontSize){

        var size = this.getContentSize();

        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPressedActionEnabled(true);
        button.setTitleText(text);
        button.setContentSize(this.width, this._fontSize +3);
        button.setTitleFontSize(fontSize || this._fontSize);
        button.setAnchorPoint(0,0);
        //button.setContentSize(400, 50);
        button.setTitleColor(cc.color.WHITE);

        button.addClickEventListener(onClick);
        this.pushBackCustomItem(button);
        return button;
    },

    /**
     * addListItemPlusMinus : taegyun.han 2022 09 20
     * [contentBtn minusBtn plusBtn]
     * @type {function (string, function, number, number, number, function): any}
     * @param {string} variableName - Name of variable that shows to prompt
     * @param {function} onClick - onClick function
     * @param {number} fontSize - fontSize
     * @param {number} initValue - initial value
     * @param {number} step - gap to adjust value
     * @param {function} controlCB - plus, minus btn callback
     */
    addListItemPlusMinus : function( variableName, onClick, fontSize, initValue, step, controlCB) {
        var node = new ccui.Widget();
        node.setContentSize(this.width, this._fontSize + 3);

        var closure = (function () {
            var value = initValue;
            var sp = step;
            return function ( isPlus ) {
                if (isPlus) value += sp;
                else value -= sp;
                return value;
            };
        }());

        var fixedIdx = 0;
        if (step < 1) {
            fixedIdx = step.toString().length - 2;
        }

        var button = Genie.Test.createUIButton(
            variableName + " : " + initValue,
            cc.size(this.width - 60, this._fontSize + 3),
            fontSize + 3,
            cc.p(0, 0),
            onClick
        );
        button.setAnchorPoint(0, 0);
        node.addChild(button);

        var minusBtn = Genie.Test.createUIButton(
            "-",
            cc.size(30, this._fontSize + 3),
            fontSize + 5,
            cc.p(this.width - 60, 0),
            function () {
                var curValue = closure( false ).toFixed(fixedIdx);
                button.setTitleText(variableName + " : " + curValue);
                try {
                    controlCB.call(this, curValue);
                } catch (err) {
                    cc.log("[System] TestView CallBack Error ! : " + err.toString());
                }
            }
        );
        minusBtn.setAnchorPoint(0, 0);
        node.addChild(minusBtn);

        var plusBtn = Genie.Test.createUIButton(
            "+",
            cc.size(30, this._fontSize + 3),
            fontSize + 5,
            cc.p(this.width - 30, 0),
            function () {
                var curValue = closure( true ).toFixed(fixedIdx);
                button.setTitleText(variableName + " : " + curValue);
                try {
                    controlCB.call(this, curValue);
                } catch (err) {
                    cc.log("[System] TestView CallBack Error ! : " + err.toString());
                }
            }
        );
        plusBtn.setAnchorPoint(0, 0);
        node.addChild(plusBtn);

        this.pushBackCustomItem(node);
        return node;
    },

    addListItemWithImg : function( slotID, text, onClick, fontSize ) {
        var node = new ccui.Widget();
        node.setContentSize(this.width, this._fontSize + 3);

        var isExtremeSlot   = MembershipPass.Controller.IsExtremeSlot(slotID),
            isVIPSlot       = slotID >= 1000,
            spriteIdx       = slotID % 1000,
            strSpriteIdx    = spriteIdx < 10 ? ( '0' + spriteIdx ) : spriteIdx.toString(),
            strSpriteName   = 'PU_miniSlotImg' + strSpriteIdx + '.png';

        var spritePos = cc.p( this._fontSize/2, this._fontSize/2 + 3 );
        var spriteSize  = cc.size(this._fontSize, this._fontSize);

        var imageView = new ccui.ImageView( strSpriteName, ccui.Widget.PLIST_TEXTURE );
        imageView.setPosition( spritePos );
        imageView.ignoreContentAdaptWithSize( false );
        imageView.setContentSize( spriteSize );
        node.addChild( imageView );

        var imgTag;
        if( isExtremeSlot ) {
            imgTag = new ccui.ImageView( 'PU_miniSlotExtreme.png', ccui.Widget.PLIST_TEXTURE );
            imgTag.setPosition( spritePos );
            imgTag.ignoreContentAdaptWithSize( false );
            imgTag.setContentSize( spriteSize );
            node.addChild( imgTag );
        }
        else if( isVIPSlot ) {
            imgTag = new ccui.ImageView( 'PU_miniSlotVip.png', ccui.Widget.PLIST_TEXTURE );
            imgTag.setPosition( spritePos );
            imgTag.ignoreContentAdaptWithSize( false );
            imgTag.setContentSize( spriteSize );
            node.addChild( imgTag );
        }

        var button = Genie.Test.createUIButton(
            text,
            cc.size(this.width, this._fontSize + 3),
            fontSize + 3 || this._fontSize + 3,
            cc.p(0 + 20, 0),
            onClick
        );
        button.setAnchorPoint(0,0);
        node.addChild( button );

        this.pushBackCustomItem(node);
    },

    onEnter : function () {
        this._super();
        //this._touchBlockHandle = Genie.InputUtil.createTouchBlocker(this);		//팝업뒤가 클릭되지 않게함
    },
    onExit : function () {

        if (this._touchBlockHandle)
        {
            this._touchBlockHandle.release();
            this._touchBlockHandle = null;
        }
        this._super();
    }
});

Genie.Test.TestWindowFrame = ccui.Layout.extend({
    ctor: function (title, width, height, textFontSize, onclose ) {
        this._super();
        this._title = title || "TEST WINDOW";
        this.setName("Genie.Test.TestWindowFrame " + this._title);

        this.TITLE_HIEGHT = 20;
        this._textFontSize = textFontSize ||20;
        this.initTestWindowFrame(width || 300, height || 400, onclose );
    },
    initTestWindowFrame : function (width, height, onclose ) {

        this.setContentSize(width, height);
        this.setAnchorPoint(0,0);
        this.setBackGroundColorType(ccui.Layout.BG_COLOR_SOLID);
        this.setBackGroundColor(cc.color.BLACK);
        this.setBackGroundColorOpacity(100);

        //title
        var label = new ccui.Text(this._title, "Arial", 15 );
        label.setTextHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        label.setContentSize(width, this.TITLE_HIEGHT);
        label.setTextColor(cc.color.WHITE);
        label.setAnchorPoint(0,0);
        this.addChild(label);
        label.setPosition(20, height-this.TITLE_HIEGHT);

        //CloseButton
        var button = new ccui.Button();
        button.setTouchEnabled(true);
        button.setPressedActionEnabled(true);
        button.setTitleText("[X]");
        button.setContentSize(22,22);
        button.setTitleFontSize(18);
        button.setAnchorPoint(1,1);
        button.setTitleColor(cc.color.WHITE);

        var funcClose = function(){
            onclose && onclose();
            this.closeLayer.call(this);
        }.bind(this)

        button.addClickEventListener( funcClose );

        button.setPosition(width, height);
        this.addChild(button);


        this._listView = new Genie.Test.TestListView(width, height- this.TITLE_HIEGHT, this._textFontSize);
        this.addChild(this._listView);

        var touchBlockingComp = new Genie.Component.Touch();
        touchBlockingComp.setCustomHitRectSize(width, height - this.TITLE_HIEGHT);
        this.addComponent(touchBlockingComp);

        var touchBlockingBtnComp = new Genie.Component.Touch();
        touchBlockingBtnComp.setCustomHitRectSize(40, this.TITLE_HIEGHT);
        button.addComponent(touchBlockingBtnComp);

        var dragComponent = new Genie.Component.DragNode();
        dragComponent.setCustomHitRectSize(width - 40 , this.TITLE_HIEGHT);
        dragComponent.setCustomHitRectCenterOffsetPt(cc.p(0,height-this.TITLE_HIEGHT));
        this.addComponent(dragComponent);


    },

    addCommand: function(text, onClick, fontSize){
        return this._listView.addListItemBtn(text, onClick, fontSize);
    },

    addCommandWithImg : function( spriteName, text, onClick, fontSize ) {
        return this._listView.addListItemWithImg( spriteName, text, onClick, fontSize);
    },

    addPlusMinus: function ( text, onClick, fontSize, initValue, step, controlCB ) {
        return this._listView.addListItemPlusMinus( text, onClick, fontSize, initValue, step, controlCB );
    },

    closeLayer:function () {
        this.setVisible(false);
    },
});

Genie.Test.createUIButton = function (  text, c_size, fontSize, pos, callback ) {
    var button = new ccui.Button();
    button.setTouchEnabled(true);
    button.setPressedActionEnabled(true);
    button.setTitleText(text);
    button.setContentSize(c_size);
    button.setTitleFontSize( fontSize );
    button.setAnchorPoint(0,1);
    button.setTitleColor(cc.color.WHITE);
    button.setPosition( pos );
    button.addClickEventListener( callback );

    return button;
}