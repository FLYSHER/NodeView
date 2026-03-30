module.exports = Editor.Panel.define({
    template: `
        <div id="container" style="padding: 15px; background: #333; height: 100%;">
            <h2 style="color: #f39c12; border-bottom: 1px solid #555; padding-bottom: 10px; margin-bottom: 20px;">
                Cocos Bridge
            </h2>

            <div style="display: flex; align-items: center; margin-bottom: 15px;">
                <div style="flex: 0 0 130px; color: #eee; font-size: 12px; font-weight: bold;">
                    Legacy Asset Root:
                </div>
                <div style="flex: 1;">
                    <ui-file type="directory" id="rootInput" style="width: 100%;"></ui-file>
                </div>
            </div>

            <div style="margin-top: 20px;">
                <ui-button id="saveBtn" class="blue" style="width: 100%;">Save Configuration</ui-button>
            </div>
        </div>
    `,
    style: `
        /* 스타일 시트가 안 먹을 때를 대비해 위 template에 inline style을 다 넣음. */
    `,
    $: {
        rootInput: '#rootInput',
        saveBtn: '#saveBtn',
    },
    async ready() {
        const savedPath = await Editor.Profile.getProject('cocos_legacy_bridge', 'legacyAssetRoot');
        if (savedPath && this.$.rootInput) {
            // @ts-ignore
            this.$.rootInput.value = savedPath;
        }

        if (this.$.saveBtn) {
            this.$.saveBtn.addEventListener('confirm', async () => {
                // @ts-ignore
                const selectedPath = this.$.rootInput.value;
                
                if (!selectedPath) {
                    // @ts-ignore
                    Editor.Dialog.warn('경로를 먼저 선택해주세요!');
                    return;
                }

                // 에디터 프로필(설정)에 저장 (껐다 켜도 유지됨)
                await Editor.Profile.setProject('cocos_legacy_bridge', 'legacyAssetRoot', selectedPath);
                
                // @ts-ignore
                Editor.Dialog.info(`설정이 저장되었습니다:\n${selectedPath}`, {
                    buttons: ['확인'] // 버튼 배열을 전달하면 첫 번째 버튼이 기본값이 됩니다.
                });
                console.log('[CocosBridge] Path saved to profile:', selectedPath);
            });
        }
    }
});