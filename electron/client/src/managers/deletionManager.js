class DeletionManager {
    constructor(mainLayerInstance) {
        this._mainLayer = mainLayerInstance; // MainLayer 인스턴스 참조
    }

    // Assets 패널에서 에셋 정의 삭제 요청 시 호출
    deleteAssetDefinition(assetName, assetType) {
        const assetKey = `${assetName}_${assetType}`;
        console.log(`[DELETE_MGR] 에셋 정의 삭제 요청: '${assetName}' (타입: ${assetType}), 에셋 키: ${assetKey}`);

        if (this._mainLayer.assetLibrary.hasOwnProperty(assetKey)) {
            console.log(`[DELETE_MGR] -> 에셋 정의 '${assetKey}' 라이브러리에서 확인. 이제 연관된 씬 노드 탐색 시작.`);

            const nodesToDelete = [];
            const regex = new RegExp(`^${assetName}( \\(\\d+\\))?$`); // 정규표현식은 루프 밖에서 한 번만 생성
            console.log(`[DELETE_MGR] -> 검색할 정규표현식 패턴: /${regex.source}/`); // 정규표현식 패턴 확인

            // nodeMap의 모든 키를 가져와 순회 (안정성)
            const allNodeIds = Object.keys(this._mainLayer.nodeMap);
            console.log(`[DELETE_MGR] -> nodeMap에 있는 총 노드 수: ${allNodeIds.length}`); // 추가: nodeMap 크기 확인

            for (const nodeId of allNodeIds) { // for...in 대신 for...of로 변경 (키 순회)
                const node = this._mainLayer.nodeMap[nodeId];

                // 노드 자체의 유효성 및 DraggableNode 인스턴스 여부 확인
                if (!node || !(node instanceof DraggableNode)) {
                    // console.log(`[DELETE_MGR] -> 노드 ID ${nodeId}는 유효한 DraggableNode 인스턴스가 아님. 건너뜀.`); // 너무 많으면 주석 처리
                    continue;
                }

                const nodeInstanceName = node.getName();
                const nodeInstanceType = node.assetType;

                const nameMatches = regex.test(nodeInstanceName); // 이름 매칭 테스트
                const typeMatches = (nodeInstanceType === assetType); // 타입 매칭 테스트

                console.log(`[DELETE_MGR] -> 씬 노드 검사 중: 노드 이름='${nodeInstanceName}', ID=${nodeId}, 타입='${nodeInstanceType}'`); // 추가: 현재 검사하는 노드 정보
                console.log(`[DELETE_MGR]    -> 이름 매칭 시도: 에셋 이름='${assetName}' (패턴: /${regex.source}/) vs 씬 노드 이름='${nodeInstanceName}'. 결과: ${nameMatches}`); // 추가: 이름 매칭 상세 결과
                console.log(`[DELETE_MGR]    -> 타입 매칭 시도: 에셋 타입='${assetType}' vs 씬 노드 타입='${nodeInstanceType}'. 결과: ${typeMatches}`); // 추가: 타입 매칭 상세 결과

                if (nameMatches && typeMatches) {
                    nodesToDelete.push(node.__instanceId);
                    console.log(`[DELETE_MGR] *** 연관 씬 노드 인스턴스 발견 및 추가: '${nodeInstanceName}' (ID: ${node.__instanceId}) ***`); // 발견 시 강조 로그
                } else {
                    // 불일치 시 어느 조건이 실패했는지 명확히
                    console.log(`[DELETE_MGR] -> 불일치: 이름(${nameMatches}) AND 타입(${typeMatches}) 조건 미달. 노드 '${nodeInstanceName}' 건너뜀.`); // 추가
                }
            }

            if (nodesToDelete.length > 0) {
                console.log(`[DELETE_MGR] -> 총 ${nodesToDelete.length}개의 연관 씬 노드 인스턴스 삭제 시작.`);
                nodesToDelete.forEach(cocosNodeId => {
                    this.deleteSceneNode(cocosNodeId);
                });
                console.log(`[DELETE_MGR] -> 연관 씬 노드 인스턴스 삭제 완료.`);
            } else {
                console.log(`[DELETE_MGR] -> 연결된 씬 노드 인스턴스가 없습니다. 삭제할 노드 없음.`);
            }

            delete this._mainLayer.assetLibrary[assetKey];
            console.log(`[DELETE_MGR] 에셋 정의 '${assetName}' 라이브러리에서 삭제 완료.`);

            this._mainLayer.refreshAssetsPanel();
            console.log(`[DELETE_MGR] Assets 패널 UI 새로고침 완료.`);

        } else {
            console.warn(`[DELETE_MGR] 경고: 에셋 라이브러리에서 '${assetName}' (타입: ${assetType}) 에셋을 찾을 수 없습니다.`);
        }
    }

    // Hierarchy 패널에서 씬 노드 인스턴스 삭제 요청 시 호출 (또는 deleteAssetDefinition에서 연동되어 호출)
    deleteSceneNode(cocosNodeIdToDelete) {
        console.log(`[DELETE_MGR] 씬 노드 삭제 요청: ID ${cocosNodeIdToDelete}`);
        const selectNode = this._mainLayer.nodeMap[cocosNodeIdToDelete];

        if (selectNode) {
            console.log(`[DELETE_MGR]   -> 노드 '${selectNode.getName()}' (ID: ${cocosNodeIdToDelete}) 발견.`);

            if (selectNode) {
                console.log(`[DELETE_MGR]   -> 노드 '${selectNode.getName()}' (ID: ${cocosNodeIdToDelete}) 발견.`);
                console.log(`[DELETE_MGR]   -> 현재 Target 상태: ${this._mainLayer.Target ? `ID ${this._mainLayer.Target.__instanceId} ('${this._mainLayer.Target.getName()}')` : 'null'}`); // 추가: 현재 Target 정보

                // 현재 선택된 노드(Target)가 삭제될 노드와 동일한지 확인
                if (this._mainLayer._currentlySelectedNode && this._mainLayer._currentlySelectedNode.__instanceId === cocosNodeIdToDelete) { // _currentlySelectedNode 사용
                    console.log(`[DELETE_MGR]   -> 현재 _currentlySelectedNode가 삭제될 노드와 일치. Properties/Animations/Gizmo 초기화 시작.`); // _currentlySelectedNode 사용
                    this._mainLayer.updateMenuWithNodeId(null);
                } else {
                    console.log(`[DELETE_MGR]   -> 삭제될 노드(${cocosNodeIdToDelete})는 현재 선택된 노드(_currentlySelectedNode)가 아님. UI 초기화 건너뜀.`); // _currentlySelectedNode 사용
                }
                selectNode.removeFromParent(true);
                console.log(`[DELETE_MGR]   -> 노드 '${selectNode.getName()}' 씬 그래프에서 제거 완료.`);
            }else {
                console.warn(`[DELETE_MGR] 경고: 삭제하려는 씬 노드 (ID: ${cocosNodeIdToDelete})를 찾을 수 없습니다.`);
            }

            // 3. nodeMap에서 해당 노드 및 모든 자식 노드 재귀적으로 삭제
            const removeNodeFromMapRecursive = (n) => {
                if (!n) return;
                console.log(`[DELETE_MGR]     -> nodeMap에서 ID ${n.__instanceId} 삭제: ${n.getName() || 'Unnamed'}`);
                delete this._mainLayer.nodeMap[n.__instanceId];
                if (n instanceof DraggableNode) {
                    if (n.ui && this._mainLayer.nodeMap[n.ui.__instanceId]) delete this._mainLayer.nodeMap[n.ui.__instanceId];
                    if (n.armature && this._mainLayer.nodeMap[n.armature.__instanceId]) delete this._mainLayer.nodeMap[n.armature.__instanceId];
                    if (n.spine && this._mainLayer.nodeMap[n.spine.__instanceId]) delete this._mainLayer.nodeMap[n.spine.__instanceId];
                    if (n.image && this._mainLayer.nodeMap[n.image.__instanceId]) delete this._mainLayer.nodeMap[n.image.__instanceId];
                }
                const children = n.getChildren();
                if (children) {
                    children.forEach(child => removeNodeFromMapRecursive(child));
                }
            };
            removeNodeFromMapRecursive(selectNode);
            console.log(`[DELETE_MGR]   -> nodeMap 및 자식 노드에서 ${cocosNodeIdToDelete} 제거 완료.`);

            // 4. sceneNodes에서 최상위 DraggableNode 인스턴스 삭제
            let deletedFromSceneNodes = false;
            for (const name in this._mainLayer.sceneNodes) {
                if (this._mainLayer.sceneNodes.hasOwnProperty(name) && this._mainLayer.sceneNodes[name].__instanceId === cocosNodeIdToDelete) {
                    console.log(`[DELETE_MGR]   -> sceneNodes에서 노드 '${name}' (ID: ${cocosNodeIdToDelete}) 삭제 완료.`);
                    delete this._mainLayer.sceneNodes[name];
                    deletedFromSceneNodes = true;
                    break;
                }
            }
            if (!deletedFromSceneNodes) {
                console.warn(`[DELETE_MGR] 경고: sceneNodes에서 노드 '${selectNode.getName()}' (ID: ${cocosNodeIdToDelete})를 찾을 수 없습니다.`);
            }

            // 5. 시퀀서에 노드 삭제 알림
            if (Sequencer && Sequencer._clearClipsForNode) {
                Sequencer._clearClipsForNode(cocosNodeIdToDelete);
                console.log(`[DELETE_MGR]   -> 시퀀서에 노드 ID ${cocosNodeIdToDelete} 클립 정리 요청 완료.`);
            }

            // 6. Hierarchy 패널 UI (jstree) 새로고침
            this._mainLayer.refreshHierarchyView();
            console.log(`[DELETE_MGR]   -> Hierarchy View 새로고침 완료.`);

            console.log(`[DELETE_MGR] 씬 노드 ID ${cocosNodeIdToDelete} 삭제 프로세스 최종 완료.`);
        } else {
            console.warn(`[DELETE_MGR] 경고: 삭제하려는 씬 노드 (ID: ${cocosNodeIdToDelete})를 찾을 수 없습니다.`); //
        }
    }
}