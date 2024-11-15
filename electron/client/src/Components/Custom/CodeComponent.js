var Genie = Genie || {};
Genie.Component = Genie.Component || {};
/**
 * author : taegyun.han
 * date : 24.03.07 ~
 * usage : 빈 노드에 해당 컴포넌트를 추가하고 콘텐츠명(ex: RNCCube), 뷰명(ex: InfoPopup)을 작성합니다.
 *         해당되는 UI, AR 파일을 asset 랜더러로부터 업로드하는 부분에 드래그 & 드롭으로 올립니다.
 *         복사 버튼을 누르면 클립보드에 코드를 복사합니다.
 * todo : 개발 중
 */
var { clipboard } = require('electron');
const tab = '    ';

Genie.Component.Code = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this._initProperties();
        this.setName( Genie.ComponentName.CODE );
    },

    _initProperties : function () {
        this.contentsName = 'RNCTest';
        this.viewName = 'SampleView';
        this.fileNameUI = '';
        this.fileNameAR = '';
    },

    drawInspector : function () {
        var rootDiv = HtmlHelper.createComponentRootDiv();

        var iconObj = {
            className : "fa-solid fa-code",
            style : "color: #d0b8f4;"
        };
        var titleBar = HtmlHelper.createComponentBar(this.getName(), iconObj);
        rootDiv.appendChild( titleBar );

        this.el_contentsName = HtmlHelper.createOneLongTextInput( rootDiv, 'content name', 'RNCTest', false, this.onchange.bind(this) );
        this.el_viewName = HtmlHelper.createOneLongTextInput( rootDiv, 'view name', 'SamplePopup', false, this.onchange.bind(this) );

        this.el_inputUI = HtmlHelper.createOneLongTextInput( rootDiv, 'upload UI here', '', false, this.uploadUI.bind(this) );
        this.el_inputAR = HtmlHelper.createOneLongTextInput( rootDiv, 'upload AR here', '', false, this.uploadAR.bind(this) );

        this.el_inputUI.ondrop = this.ondropUI.bind(this);
        this.el_inputAR.ondrop = this.ondropAR.bind(this);

        this.el_exportCodeBtn = HtmlHelper.createIconButtonAttrib( rootDiv, 'export code', { className: 'fa-solid fa-copy' }, this.onExportCodeBtnClick.bind(this) );
    },

    onchange : function (event) {
        switch ( event.target ) {
            case this.el_contentsName:
                this.contentsName = this.el_contentsName.value;
                break;
            case this.el_viewName:
                this.viewName = this.el_viewName.value;
                break;
            default:
                break;
        }
    },

    uploadUI : function (event) {},
    uploadAR : function (event) {},

    ondropUI : function (event) {
        var assetName = event.dataTransfer.getData('assetName');

        if (event.target === this.el_inputUI) {
            if (Genie.Utils.getFileTypeFromExportJson( assetName ) === Genie.ToolFileType.UIFile) {
                this.el_inputUI.value = assetName;
                this.fileNameUI = assetName;
            }
        }

        event.preventDefault();
    },

    ondropAR : function (event) {
        var assetName = event.dataTransfer.getData('assetName');

        if (event.target === this.el_inputAR) {
            if (Genie.Utils.getFileTypeFromExportJson( assetName ) === Genie.ToolFileType.ARMATURE) {
                this.el_inputAR.value = assetName;
                this.fileNameAR = assetName;
            }
        }

        event.preventDefault();
    },

    builder : function () {
        return new Genie.Component.Code.Builder();
    },

    onExportCodeBtnClick : function (event) {
        let result = this.builder()
            .boot()
            .contentsName(this.contentsName)
            .viewName(this.viewName)
            .uiAddr(this.fileNameUI)
            .arAddr(this.fileNameAR)
            .build();

        try {
            clipboard.writeText(result);
            alert('코드가 클립보드에 복사 되었습니다.');
        } catch (e) {
            alert('복사 중 에러가 발생했습니다. ' + e.toString());
        }
    },
});

Genie.Component.Code.Builder = cc.Class.extend({
    ctor : function () {},

    boot : function () {
        this._contentsName = '';
        this._viewName = '';
        this._uiAddr = '';
        this._arAddr = '';

        this._uiTexturesPng = [];
        this._arTexturesPng = [];
        this._uiTextures = [];
        this._uiWidgetTree = [];

        this._fntSet = new Set();
        this._buttonSet = new Set();
        this._exitButton = '';

        this._movData = [];

        return this;
    },

    contentsName : function ( contentsName ) {
        this._contentsName = contentsName;
        return this;
    },

    viewName : function ( viewName ) {
        this._viewName = viewName;
        return this;
    },

    uiAddr : function ( uiAddr ) {
        this._uiAddr = uiAddr;
        if ( Genie.Utils.getFileTypeFromExportJson( this._uiAddr ) === Genie.ToolFileType.UIFile ) {
            let json = cc.loader.getRes(this._uiAddr);
            cc.log("[taegyun] UI parse json -", json);
            this._parseUI( json );
        }
        return this;
    },

    traversalObj : function ( obj ) {
        var children = obj['children'];
        for( var i = 0; i < children.length; i++ ) {
            if (children[i]['classname'] ===  'LabelBMFont') {
                this._fntSet.add( children[i]['options']['fileNameData']['path'] );
            }
            if (children[i]['classname'] === 'Button') {
                this._buttonSet.add( children[i]['options']['name'] );
            }

            if (children[i]["children"].length > 0) {
                this.traversalObj( children[i] );
            }
        }
    },

    arAddr : function ( arAddr ) {
        this._arAddr = arAddr;
        if ( Genie.Utils.getFileTypeFromExportJson( this._arAddr ) === Genie.ToolFileType.ARMATURE ) {
            let json = cc.loader.getRes(this._arAddr);
            cc.log("[taegyun] AR parse json -", json);
            this._parseAR( json );
        }
        return this;
    },

    _parseUI : function ( data ) {
        this._uiTexturesPng = data['texturesPng'];
        this._uiTextures = data['textures'];
        this._uiWidgetTree = data['widgetTree'];

        this._fntSet.clear();
        this._buttonSet.clear();
        this.traversalObj(this._uiWidgetTree);

        this._initButton();
    },

    _initButton : function () {
        if (!this._exitButton) {
            this._buttonSet.forEach((value) => {
                if (value.toLowerCase().includes('exit') || value.toLowerCase().includes('close')) {
                    this._exitButton = value;
                }
            });
        }
    },

    _parseAR : function ( data ) {
        this._arTexturesPng = data['config_png_path'];
        this._movData = data['animation_data'][0]['mov_data'];
    },

    // 선언부, 리소스 참조
    _makeHeader : function () {
        let header = '';
        header += `var ${this._contentsName} = ${this._contentsName} || {};\n` +
            `${this._contentsName}.View = ${this._contentsName}.View || {};\n` +
            `${this._contentsName}.Res = ${this._contentsName}.Res || {};\n\n`;

        // 리소스 참조부
        header += `${this._contentsName}.Res.${this._viewName} = {\n`;

        header += this._uiAddr ? `${tab}${this._uiAddr.replace('.ExportJson', '')} : '` + this._uiAddr + `',\n` : '';
        header += this._arAddr ? `${tab}${this._arAddr.replace('.ExportJson', '')} : '` + this._arAddr + `',\n` : '';

        header += `\n`;
        // 어셋 항목 추가 (plist, png)
        let assetSet = new Set( this._uiTexturesPng.concat(this._arTexturesPng) );
        assetSet.forEach((path) => {
            header += `${tab}${path.replace('.png', '')}_png : 'image/${path}',\n`;
            header += `${tab}${path.replace('.png', '')}_plist : 'image/${path.replace('.png', '.plist')}',\n\n`;
        });

        // 폰트 추가 (fnt, png)
        this._fntSet.forEach((path) => {
            header += `${tab}${path.replace('image/', '').replace('.fnt', '')}_fnt : '${path}',\n`;
            header += `${tab}${path.replace('image/', '').replace('.fnt', '')}_png : '${path.replace('.fnt', '.png')}',\n\n`;
        });

        header += `};\n` +
            `var g_res${this._contentsName}${this._viewName} = ResPack.create('${this._contentsName}.Res.${this._viewName}', ${this._contentsName}.Res.${this._viewName});\n\n`;

        return header;
    },

    _makeBody : function () {
        let body = '';
        // 생성자 표기
        body += `${this._contentsName}.View.${this._viewName} = RockN.BaseContentPopup.extend({\n` +
            `${tab}ctor: function (callback) {\n` +
            `${tab}${tab}this._assets = g_res${this._contentsName}${this._viewName};\n` +
            `${tab}${tab}this._callbacks = callback;\n` +
            `${tab}${tab}this._super('${this._contentsName}.View.${this._viewName}');\n` +
            `${tab}},\n\n`;

        // initProperties
        body += `${tab}_initProperties : function () {\n`;
        !!this._uiAddr && (body += `${tab}${tab}this._uiRoot = null;\n`);
        !!this._arAddr && (body += `${tab}${tab}this._ar = null;\n`);
        const scanWidgetTree = ( obj, depth ) => {
            var children = obj['children'];
            for( var i = 0; i < children.length; i++ ){
                body += `${tab.repeat(depth)}${children[i]['options']['name']} : null, // ${children[i]['classname']}\n`;
                if (children[i]['children'].length > 0) {
                    scanWidgetTree( children[i], depth + 1 );
                }
            }
        };
        if (this._uiAddr && this._uiWidgetTree) {
            body += `${tab}${tab}this._uiWidgets = {\n`;
            scanWidgetTree( this._uiWidgetTree, 3 );
            body += `${tab}${tab}};\n`;
        }
        body += `${tab}},\n\n`;

        // initPopup
        body += `${tab}initPopup : function () {\n` +
            `${tab}${tab}this._initProperties();\n`;
        !!this._uiAddr && (body += `${tab}${tab}this._initUI();\n`);
        !!this._arAddr && (body += `${tab}${tab}this._initAR();\n`);
        body += `${tab}},\n\n`;

        // initUI
        if (this._uiAddr) {
            body += `${tab}_initUI : function () {\n` +
                `${tab}${tab}this._uiRoot = this.addUIChildOnCenter(${this._contentsName}.Res.${this._viewName}.${this._uiAddr.replace('.ExportJson', '')}, this._uiWidgets);\n` +
                `${tab}${tab}SoundControl.getInstance().playEffect(loungeCommon.CommonPopup);\n`;

            if (this._exitButton) {
                body += `\n${tab}${tab}this.addExitButtonInCommonWay(this._uiWidgets.${this._exitButton});\n`;
            }

            this._buttonSet.forEach((name) => {
                if (name !== this._exitButton) {
                    body += `${tab}${tab}this.addWidgetClickListener(this._uiWidgets.${name}, this.onclick_${Genie.Utils.camelize(name.replaceAll('btn', ''))}, globalCommon,Click);\n`;
                }
            });

            body += `${tab}},\n\n`;
        }

        // initAR
        if (this._arAddr) {
            body += `${tab}_initAR : function () {\n` +
                `${tab}${tab}this._ar = this.addARChildOnCenter(${this._contentsName}.Res.${this._viewName}.${this._arAddr});\n`;

            body += `${tab}${tab}/** animation track\n`;
            this._movData.forEach((data, index) => {
                body += `${tab}${tab} * ${index + 1}. ${data.name}\n`;
            });
            body += `${tab}${tab} */\n`;
            if (this._movData.find((data) => data.name === 'loop') && this._movData.find((data) => data.name === 'open')) {
                body += `${tab}${tab}this._ar && RockN.ARUtil.playOnceAndLoop(this._ar, 'open', 'loop');\n`
            }

            body += `${tab}},\n\n`;
        }

        // onclickFunc
        this._buttonSet.forEach((name) => {
            if (name !== this._exitButton) {
                body += `${tab}onclick_${Genie.Utils.camelize(name.replaceAll('btn', ''))} : function ( sender ) {\n` +
                    `${tab}${tab}// todo onclick func\n` +
                    `${tab}},\n\n`;
            }
        });

        body += `});\n`;
        return body;
    },

    build : function () {
        let result = ''
        result += this._makeHeader();
        result += this._makeBody();

        return result;
    },
});