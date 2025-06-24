class ContextMenuManager {
    constructor(mainLayerInstance) {
        this._activeMenu = null;
        this._targetElement = null; // 우클릭된 DOM 요소
        this._targetNodeId = null;  // 우클릭된 Cocos Node의 __instanceId (jstree/timeline 용)
        this._mainLayerInstance = mainLayerInstance; // MainLayer 인스턴스 참조

        this._setupGlobalCloseListener();
    }

    _setupGlobalCloseListener() {
        // 외부 클릭 시 메뉴 숨기기 (단일 이벤트 리스너)
        $(document).on('mousedown.contextMenuManager', (e) => {
            if (!$(e.target).closest('.context-menu').length && this._activeMenu) {
                this.hide();
            }
        });
    }

    showJsTreeContextMenu(event, targetElement, selectedNode, canDelete) {
        event.preventDefault();
        console.log(`[DEBUG - ContextMenuManager] showJsTreeContextMenu: 호출됨. 현재 _currentlySelectedNode (진입 전): ${this._mainLayerInstance._currentlySelectedNode ? this._mainLayerInstance._currentlySelectedNode.__instanceId : 'null'}`); // _currentlySelectedNode 사용

        this.hide();
        console.log(`[DEBUG - ContextMenuManager] showJsTreeContextMenu: hide() 호출 후 _currentlySelectedNode: ${this._mainLayerInstance._currentlySelectedNode ? this._mainLayerInstance._currentlySelectedNode.__instanceId : 'null'}`); // _currentlySelectedNode 사용

        const $menu = $('#custom-context-menu');
        this._activeMenu = $menu;
        this._targetElement = targetElement;
        this._targetNodeId = selectedNode?.data?.nodeId;

        console.log(`[DEBUG - ContextMenuManager] showJsTreeContextMenu: 메뉴 표시 전. _currentlySelectedNode: ${this._mainLayerInstance._currentlySelectedNode ? this._mainLayerInstance._currentlySelectedNode.__instanceId : 'null'}`); // _currentlySelectedNode 사용

        // 삭제 메뉴 항목 활성화/비활성화 (동일)
        const $deleteItem = $menu.find('li[data-action="delete"]');
        if (canDelete) {
            $deleteItem.removeClass('disabled').css('pointer-events', 'auto');
        } else {
            $deleteItem.addClass('disabled').css('pointer-events', 'none');
        }

        this._positionMenu(event, $menu);
        $menu.show();

        // 메뉴 항목 클릭 이벤트 (jstree 전용) - 네임스페이스를 'ContextMenuManager'로 통일
        $menu.off('click.ContextMenuManager').on('click.ContextMenuManager', 'li[data-action="delete"]:not(.disabled)', () => {
            if (this._targetNodeId && this._mainLayerInstance) {
                this._mainLayerInstance.deleteItem(this._targetNodeId);
            }
            this.hide();
        });
    }

    showOtherContextMenu(event, targetElement, nodeId) { // 기존 showContextMenu 이름 변경
        console.log(`[DEBUG - ContextMenuManager] showOtherContextMenu 함수 진입. targetElement:`, targetElement, `nodeId:`, nodeId); // 추가: 함수 시작 로그
        event.preventDefault();

        // jsTree 노드인지 확인 (여기서 조기 종료되는지 확인)
        if ($(targetElement).closest('#widgetTree').length) {
            console.log(`[DEBUG - ContextMenuManager] 경고: targetElement가 widgetTree에 속함. Assets 컨텍스트 메뉴 처리를 건너_ㅁ.`); // 추가: 조기 종료 로그
            return;
        }

        this.hide(); // 기존 메뉴 숨김 (여기서 로그는 hide() 함수 내부에서 출력됨)
        console.log(`[DEBUG - ContextMenuManager] 기존 메뉴 숨김 처리 완료.`); // 추가

        const $menu = $('#custom-context-menu');
        this._activeMenu = $menu;
        this._targetElement = targetElement;
        this._targetNodeId = nodeId;

        // 삭제 메뉴 활성화/비활성화 (Assets 패널은 항상 삭제 가능하다고 가정)
        $menu.find('li[data-action="delete"]').removeClass('disabled').css('pointer-events', 'auto');
        console.log(`[DEBUG - ContextMenuManager] 메뉴 항목 '삭제' 활성화.`); // 추가

        this._positionMenu(event, $menu); // 위치 조정
        console.log(`[DEBUG - ContextMenuManager] 메뉴 위치 조정 완료.`); // 추가

        $menu.show();
        console.log(`[DEBUG - ContextMenuManager] 컨텍스트 메뉴를 화면에 표시.`); // 추가

        // Assets, Sequencer 등 다른 패널용 클릭 이벤트 - 네임스페이스 통일
        $menu.off('click.ContextMenuManager').on('click.ContextMenuManager', 'li', (e) => { // e 인자 추가
            const action = $(e.currentTarget).data('action'); // e.currentTarget으로 변경
            console.log(`[DEBUG - ContextMenuManager] 컨텍스트 메뉴 항목 클릭 이벤트 발생: 액션=${action}`); // 추가

            if (action === 'delete') {
                if (this._targetElement) {
                    if ($(this._targetElement).hasClass('custom-tree-item')) {
                        // Assets 패널 아이템 삭제
                        const assetName = $(this._targetElement).data('asset-name');
                        const assetType = $(this._targetElement).data('asset-type');
                        console.log(`[DEBUG - ContextMenuManager] Assets 삭제 요청 MainLayer에 위임: assetName=${assetName}, assetType=${assetType}`); // 추가
                        if (assetName && assetType && this._mainLayerInstance?.deleteAsset) {
                            this._mainLayerInstance.deleteAsset(assetName, assetType);
                        } else {
                            console.warn(`[DEBUG - ContextMenuManager] 경고: deleteAsset 위임 실패 - 에셋 정보 누락 또는 MainLayerInstance 없음.`); // 추가
                        }
                    } else if ($(this._targetElement).hasClass('timeline-clip')) {
                        // Sequencer 클립 삭제
                        const clipId = $(this._targetElement).data('clip-id');
                        const trackNodeId = $(this._targetElement).closest('.timeline-track').data('node-id');
                        console.log(`[DEBUG - ContextMenuManager] Sequencer 클립 삭제 요청 위임: clipId=${clipId}, trackNodeId=${trackNodeId}`); // 추가
                        if (clipId && trackNodeId && Sequencer?._deleteClip) {
                            Sequencer._deleteClip(trackNodeId, clipId);
                        }
                    }
                } else {
                    console.warn(`[DEBUG - ContextMenuManager] 경고: _targetElement가 null입니다. 삭제 요청 처리 불가.`); // 추가
                }
            }
            this.hide();
        });
    }

    hide() {
        if (this._activeMenu) {
            this._activeMenu.hide();
            console.log("[DEBUG - ContextMenuManager] hide(): 컨텍스트 메뉴 숨김.");
            this._activeMenu = null;
            this._targetElement = null;
            this._targetNodeId = null;
            $('#custom-context-menu').off('click.ContextMenuManager');
            console.log(`[DEBUG - ContextMenuManager] hide(): 전역 컨텍스트 메뉴 상태 초기화 완료. Target 상태 변경 없음.`); // 추가
        }
    }

    _positionMenu(event, $menu) {
        let x = event.pageX;
        let y = event.pageY;

        const menuWidth = $menu.outerWidth();
        const menuHeight = $menu.outerHeight();
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();

        if (x + menuWidth > windowWidth) {
            x = windowWidth - menuWidth - 10;
        }
        if (y + menuHeight > windowHeight) {
            y = windowHeight - menuHeight - 10;
        }
        $menu.css({ left: x, top: y });
    }
}