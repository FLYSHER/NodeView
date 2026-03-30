"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJpZGdlLXBhbmVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc291cmNlL3BhbmVscy9icmlkZ2UvYnJpZGdlLXBhbmVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CVDtJQUNELEtBQUssRUFBRTs7S0FFTjtJQUNELENBQUMsRUFBRTtRQUNDLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0lBQ0QsS0FBSyxDQUFDLEtBQUs7UUFDUCxNQUFNLFNBQVMsR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDNUYsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDbEQsYUFBYTtnQkFDYixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBRTVDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztvQkFDaEIsYUFBYTtvQkFDYixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUNyQyxPQUFPO2dCQUNYLENBQUM7Z0JBRUQsOEJBQThCO2dCQUM5QixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLGlCQUFpQixFQUFFLFlBQVksQ0FBQyxDQUFDO2dCQUV4RixhQUFhO2dCQUNiLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixZQUFZLEVBQUUsRUFBRTtvQkFDaEQsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsaUNBQWlDO2lCQUNwRCxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7SUFDTCxDQUFDO0NBQ0osQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBFZGl0b3IuUGFuZWwuZGVmaW5lKHtcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGlkPVwiY29udGFpbmVyXCIgc3R5bGU9XCJwYWRkaW5nOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMzMzOyBoZWlnaHQ6IDEwMCU7XCI+XG4gICAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI2YzOWMxMjsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM1NTU7IHBhZGRpbmctYm90dG9tOiAxMHB4OyBtYXJnaW4tYm90dG9tOiAyMHB4O1wiPlxuICAgICAgICAgICAgICAgIENvY29zIEJyaWRnZVxuICAgICAgICAgICAgPC9oMj5cblxuICAgICAgICAgICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cImZsZXg6IDAgMCAxMzBweDsgY29sb3I6ICNlZWU7IGZvbnQtc2l6ZTogMTJweDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+XG4gICAgICAgICAgICAgICAgICAgIExlZ2FjeSBBc3NldCBSb290OlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxuICAgICAgICAgICAgICAgICAgICA8dWktZmlsZSB0eXBlPVwiZGlyZWN0b3J5XCIgaWQ9XCJyb290SW5wdXRcIiBzdHlsZT1cIndpZHRoOiAxMDAlO1wiPjwvdWktZmlsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDogMjBweDtcIj5cbiAgICAgICAgICAgICAgICA8dWktYnV0dG9uIGlkPVwic2F2ZUJ0blwiIGNsYXNzPVwiYmx1ZVwiIHN0eWxlPVwid2lkdGg6IDEwMCU7XCI+U2F2ZSBDb25maWd1cmF0aW9uPC91aS1idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBzdHlsZTogYFxuICAgICAgICAvKiDsiqTtg4Dsnbwg7Iuc7Yq46rCAIOyViCDrqLnsnYQg65WM66W8IOuMgOu5hO2VtCDsnIQgdGVtcGxhdGXsl5AgaW5saW5lIHN0eWxl7J2EIOuLpCDrhKPsnYwuICovXG4gICAgYCxcbiAgICAkOiB7XG4gICAgICAgIHJvb3RJbnB1dDogJyNyb290SW5wdXQnLFxuICAgICAgICBzYXZlQnRuOiAnI3NhdmVCdG4nLFxuICAgIH0sXG4gICAgYXN5bmMgcmVhZHkoKSB7XG4gICAgICAgIGNvbnN0IHNhdmVkUGF0aCA9IGF3YWl0IEVkaXRvci5Qcm9maWxlLmdldFByb2plY3QoJ2NvY29zX2xlZ2FjeV9icmlkZ2UnLCAnbGVnYWN5QXNzZXRSb290Jyk7XG4gICAgICAgIGlmIChzYXZlZFBhdGggJiYgdGhpcy4kLnJvb3RJbnB1dCkge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy4kLnJvb3RJbnB1dC52YWx1ZSA9IHNhdmVkUGF0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLiQuc2F2ZUJ0bikge1xuICAgICAgICAgICAgdGhpcy4kLnNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY29uZmlybScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRQYXRoID0gdGhpcy4kLnJvb3RJbnB1dC52YWx1ZTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGVjdGVkUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIEVkaXRvci5EaWFsb2cud2Fybign6rK966Gc66W8IOuovOyggCDshKDtg53tlbTso7zshLjsmpQhJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyDsl5DrlJTthLAg7ZSE66Gc7ZWEKOyEpOyglSnsl5Ag7KCA7J6lICjqu5Dri6Qg7Lyc64+EIOycoOyngOuQqClcbiAgICAgICAgICAgICAgICBhd2FpdCBFZGl0b3IuUHJvZmlsZS5zZXRQcm9qZWN0KCdjb2Nvc19sZWdhY3lfYnJpZGdlJywgJ2xlZ2FjeUFzc2V0Um9vdCcsIHNlbGVjdGVkUGF0aCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIEVkaXRvci5EaWFsb2cuaW5mbyhg7ISk7KCV7J20IOyggOyepeuQmOyXiOyKteuLiOuLpDpcXG4ke3NlbGVjdGVkUGF0aH1gLCB7XG4gICAgICAgICAgICAgICAgICAgIGJ1dHRvbnM6IFsn7ZmV7J24J10gLy8g67KE7Yq8IOuwsOyXtOydhCDsoITri6ztlZjrqbQg7LKrIOuyiOynuCDrsoTtirzsnbQg6riw67O46rCS7J20IOuQqeuLiOuLpC5cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW0NvY29zQnJpZGdlXSBQYXRoIHNhdmVkIHRvIHByb2ZpbGU6Jywgc2VsZWN0ZWRQYXRoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7Il19