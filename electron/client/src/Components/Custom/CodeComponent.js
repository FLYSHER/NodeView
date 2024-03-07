/**
 * author : taegyun.han
 * date : 24.03.07 ~
 * usage : 빈 노드에 해당 컴포넌트를 추가하고 콘텐츠명(ex: RNCCube), 뷰명(ex: InfoPopup)을 작성합니다.
 *         해당되는 UI, AR 파일을 asset 랜더러로부터 업로드하는 부분에 드래그 & 드롭으로 올립니다.
 *         복사 버튼을 누르면 클립보드에 코드를 복사합니다.
 * todo : 개발 중
 */
Genie.Component.Code = Genie.Component.InspectorBase.extend({
    ctor : function () {
        this._super();
        this.setName( Genie.ComponentName.CODE );
    },

    drawInspector : function () {
        var owner = this.getOwner();
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

        this.contentsName = 'RNCTest';
        this.viewName = 'SampleView';
        this.fileNameUI = '';
        this.fileNameAR = '';
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
                cc.log("[taegyun] UI file : ", event.dataTransfer);
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
                cc.log("[taegyun] AR file : ", event.dataTransfer);
                this.fileNameAR = assetName;
            }
        }

        event.preventDefault();
    },

    onExportCodeBtnClick : function (event) {
        navigator.clipboard.writeText("복사가 성공적으로 이루어졌습니다.")
            .then(() => {
                alert('코드가 클립보드에 복사 되었습니다.');
            }, () => {
                alert('복사 중 에러가 발생했습니다.');
            })
            .catch((err) => {
                alert('처리과정 중 에러발생: ' + err.toString());
            });
    },
});