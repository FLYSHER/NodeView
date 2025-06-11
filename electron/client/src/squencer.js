var Sequencer = (function() {

    // private: 시퀀스 데이터 배열을 모듈 내부에서 관리합니다. (전역 변수 제거)
    let animationSequence = [];
    let mainLayerInstance = null; // MainLayer 참조를 저장할 변수

    // private: UI를 업데이트하는 내부 함수
    function _updateUI() {
        var sequencerTreeDiv = $('#sequencerTree');
        sequencerTreeDiv.empty();
        animationSequence.forEach(function(item, index) {
            var typeText, typeClass, displayText, loopPrefix = "";
            if (item.type !== 'dummy' && item.animName && item.animName.toLowerCase().endsWith("loop")) loopPrefix = "🔄 ";

            if (item.type === 'dummy') {
                typeText = 'DLY', typeClass = 'type-dummy', displayText = item.animName;
            } else {
                typeText = item.type === 'armature' ? 'AR' : 'UI';
                typeClass = item.type === 'armature' ? 'type-armature' : 'type-action';
                displayText = loopPrefix + (item.targetNode ? item.targetNode.getName() : "[?]") + " - " + item.animName;
            }

            var durationValue = (typeof item.duration === 'number' ? item.duration : 0).toFixed(2);
            var itemHtml = `
            <div class="sequencer-item" data-index="${index}">
                <span class="drag-handle"><i class="fas fa-grip-vertical"></i></span>
                <span class="anim-type-tag ${typeClass}">${typeText}</span>
                <span class="sequencer-text" title="${displayText}">${displayText}</span>
                <input type="number" class="delay-input" value="${durationValue}" step="0.1">
                <select class="playback-mode-select">
                    <option value="sequence" ${item.playbackMode === 'sequence' ? 'selected' : ''}>순차</option>
                    <option value="simultaneous" ${item.playbackMode === 'simultaneous' ? 'selected' : ''}>동시</option>
                </select>
                <button class="delete-sequence-item-btn" title="삭제"><i class="fas fa-trash-alt"></i></button>
            </div>`;
            sequencerTreeDiv.append(itemHtml);
        });
    }

    // private: '추가' 버튼 클릭 시 실행될 로직
    function _onAdd() {
        if (!Target) { alert("먼저 캔버스에서 노드를 선택하세요."); return; }

        // MainLayer에 있는 _animationList에 직접 접근하는 대신, MainLayer의 메서드를 통해 데이터를 가져옵니다.
        // (이 부분은 추후 MainLayer에 getSelectedAnimation 같은 메서드를 만들어 개선할 수 있습니다)
        var selectedAnimName = mainLayerInstance._animationList.getSelectedAnimationName();
        var animType = selectedAnimName ? 'armature' : null;

        if (!selectedAnimName) {
            var actionTreeInstance = $('#actionTree').jstree(true);
            var selectedActionIds = actionTreeInstance.get_selected();
            if (selectedActionIds && selectedActionIds.length > 0) {
                var selectedNode = actionTreeInstance.get_node(selectedActionIds[0]);
                selectedAnimName = selectedNode.text;
                animType = 'action';
            }
        }

        if (selectedAnimName && animType) {
            // 애니메이션 길이는 MainLayer가 계산하도록 요청합니다.
            var duration = mainLayerInstance.getAnimationLength(Target, selectedAnimName);
            animationSequence.push({ targetNode: Target, animName: selectedAnimName, type: animType, duration: duration, playbackMode: 'sequence' });
            _updateUI();
        } else {
            alert("추가할 애니메이션이 선택되지 않았습니다.");
        }
    }

    // private: '재생' 버튼 클릭 시 실행될 로직
    function _onPlay() {
        if (animationSequence.length === 0) { alert("시퀀스가 비어있습니다."); return; }
        // ... (기존 MainLayer.onPlaySequence 함수의 모든 내용) ...
        var groups = [];
        if (animationSequence.length > 0) {
            var currentGroup = [];
            animationSequence.forEach(function(item) {
                if (item.playbackMode === 'sequence' && currentGroup.length > 0) { groups.push(currentGroup); currentGroup = []; }
                currentGroup.push(item);
            });
            groups.push(currentGroup);
        }
        var finalActionSequence = [];
        groups.forEach(function(group) {
            var spawnActions = [], maxDurationInGroup = 0, loopingItemsInThisGroup = [];
            group.forEach(function(item) {
                if (item.type !== 'dummy') {
                    var isActuallyLoop = item.animName && item.animName.toLowerCase().endsWith("loop");
                    var playAction = cc.callFunc(function() {
                        var target = item.targetNode, animName = item.animName;
                        if (!target) return;
                        if (item.type === 'armature' && target.armature) {
                            target.armature.getAnimation().play(animName, -1, isActuallyLoop ? -1 : 0);
                        } else if (item.type === 'action') {
                            if (target.cocosAction) {
                                target.cocosAction.play(animName, isActuallyLoop);
                            } else {
                                ccs.actionManager.playActionByName(target.getName() + '.ExportJson', animName);
                            }
                        }
                    });
                    spawnActions.push(playAction);
                    if (isActuallyLoop) loopingItemsInThisGroup.push(item);
                }
                if (item.duration > maxDurationInGroup) maxDurationInGroup = item.duration;
            });
            if (spawnActions.length > 0) finalActionSequence.push(cc.spawn(spawnActions));
            finalActionSequence.push(cc.delayTime(Math.max(0, maxDurationInGroup)));
            if (loopingItemsInThisGroup.length > 0) {
                var stopLoopingItemsAction = cc.callFunc(function() {
                    loopingItemsInThisGroup.forEach(function(loopItem) {
                        var target = loopItem.targetNode;
                        if (!target) return;
                        if (loopItem.type === 'armature' && target.armature) {
                            if (target.armature.getAnimation().getCurrentMovementID() === loopItem.animName && target.armature.getAnimation().isPlaying()) target.armature.getAnimation().stop();
                        } else if (loopItem.type === 'action' && target.cocosAction) {
                            var actionTimelineToStop = target.cocosAction.getAnimationInfo(loopItem.animName) ? target.cocosAction : ccs.load(Loader.cocosStudioURL[target.getName()] || Loader.uiURL[target.getName()]).action;
                            if (actionTimelineToStop) actionTimelineToStop.play(loopItem.animName, false);
                        }
                    });
                });
                finalActionSequence.push(stopLoopingItemsAction);
            }
        });
        if (finalActionSequence.length > 0) {
            // 액션을 실행할 노드를 MainLayer에서 가져옵니다.
            var runnerNode = mainLayerInstance.getChildByTag(999) || new cc.Node();
            if (!runnerNode.getParent()) { runnerNode.setTag(999); mainLayerInstance.addChild(runnerNode); }
            runnerNode.stopAllActions();
            runnerNode.runAction(cc.sequence(finalActionSequence));
        }
    }

    // public: 외부에 노출할 API
    return {
        initialize: function(layerInstance) {
            mainLayerInstance = layerInstance; // MainLayer 참조 설정

            // 버튼 이벤트 핸들러 설정
            $('#addSequenceBtn').on('click', _onAdd);
            $('#playSequenceBtn').on('click', _onPlay);
            $('#clearSequenceBtn').on('click', this.clear);
            $('#addDummyBtn').on('click', this.addDummy);

            const sequencerTree = $('#sequencerTree');

            sequencerTree.on('change keyup', '.delay-input', function(event) {
                var index = $(event.currentTarget).closest('.sequencer-item').data('index');
                var newDuration = parseFloat($(event.currentTarget).val());
                if (animationSequence[index] && !isNaN(newDuration) && newDuration >= 0) {
                    animationSequence[index].duration = newDuration;
                }
            });

            sequencerTree.on('change', '.playback-mode-select', function(event) {
                var index = $(event.currentTarget).closest('.sequencer-item').data('index');
                if (animationSequence[index]) {
                    animationSequence[index].playbackMode = $(event.currentTarget).val();
                }
            });

            sequencerTree.on('click', '.delete-sequence-item-btn', function(event) {
                var index = $(event.currentTarget).closest('.sequencer-item').data('index');
                animationSequence.splice(index, 1);
                _updateUI();
            });

            sequencerTree.sortable({
                axis: 'y', handle: '.drag-handle',
                update: function() {
                    const newSequence = [];
                    sequencerTree.children().each(function() {
                        const originalIndex = $(this).data('index');
                        newSequence.push(animationSequence[originalIndex]);
                    });
                    animationSequence = newSequence;
                    _updateUI();
                }
            }).disableSelection();
        },
        addDummy: function() {
            animationSequence.push({ targetNode: null, animName: 'Dummy Delay', type: 'dummy', duration: 1.0, playbackMode: 'sequence' });
            _updateUI();
        },
        clear: function() {
            animationSequence = [];
            _updateUI();
        },
        cleanup: function() {
            $('#sequencerTree, #addSequenceBtn, #playSequenceBtn, #clearSequenceBtn, #addDummyBtn').off();
            animationSequence = [];
            mainLayerInstance = null;
        }
    };
})();