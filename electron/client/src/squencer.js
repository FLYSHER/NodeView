var Sequencer = (function() {
    let PIXELS_PER_SECOND = 100;
    const ZOOM_FACTOR = 1.5;
    const GRID_TIME_INTERVAL = 0.1;

    let tracks = new Map();
    let mainLayerInstance = null;
    let isSyncingScroll = false;
    let isPlaying = false;
    let isPaused = false;
    let runnerNode = null;
    let sequenceStartTime = 0;
    let pausedTime = 0;

    function _updateClipDurationText($clipElement, clipData) {
        let durationText = clipData.duration.toFixed(1) + 's';
        const durationDiff = clipData.duration - clipData.originalDuration;

        if (Math.abs(durationDiff) > 0.05) { // 0.1초 단위이므로 0.05 이상 차이날 때만 표시
            const sign = durationDiff > 0 ? '+' : '';
            const diffClass = durationDiff > 0 ? 'increased' : 'decreased';
            durationText += ` <span class="modified ${diffClass}">(${sign}${durationDiff.toFixed(1)})</span>`;
        }
        $clipElement.find('.clip-duration').html(durationText);
    }

    function _updateOverlapsForTrack(trackData, $track) {
        $track.find('.timeline-overlap-indicator').remove();
        const clips = [...trackData.clips].sort((a, b) => a.startTime - b.startTime);
        for (let i = 0; i < clips.length - 1; i++) {
            const currentClip = clips[i];
            const nextClip = clips[i + 1];
            const currentClipEnd = currentClip.startTime + currentClip.duration;

            if (currentClipEnd > nextClip.startTime) {
                const overlapStart = nextClip.startTime;
                const overlapEnd = Math.min(currentClipEnd, nextClip.startTime + nextClip.duration);
                const overlapDuration = overlapEnd - overlapStart;

                if (overlapDuration > 0.001) {
                    const $indicator = $('<div class="timeline-overlap-indicator"></div>');
                    $indicator.css({
                        left: overlapStart * PIXELS_PER_SECOND + 'px',
                        width: overlapDuration * PIXELS_PER_SECOND + 'px'
                    });
                    $track.append($indicator);
                }
            }
        }
    }

    function _renderRuler() {
        const $ruler = $('#timeline-ruler');
        const totalWidth = $('#timeline-content').width();
        $ruler.empty();
        $ruler.width(totalWidth);

        const majorGridPixel = GRID_TIME_INTERVAL * 10 * PIXELS_PER_SECOND;
        $ruler.css('background-size', `${majorGridPixel}px 100%`);

        const subMarkerPixelInterval = GRID_TIME_INTERVAL * PIXELS_PER_SECOND;
        const showMajorText = PIXELS_PER_SECOND > 40;
        const showHalfText = PIXELS_PER_SECOND > 100;
        const showSubText = PIXELS_PER_SECOND > 250;

        for (let i = 0; i * subMarkerPixelInterval < totalWidth; i++) {
            const currentTime = i * GRID_TIME_INTERVAL;
            const isMajor = Math.abs(currentTime % 1) < 0.001;
            const isHalf = Math.abs(currentTime % 0.5) < 0.001 && !isMajor;
            let text = '', textClass = '';

            if (isMajor && showMajorText) {
                text = currentTime.toFixed(0) + 's';
            } else if (isHalf && showHalfText) {
                text = currentTime.toFixed(1);
                textClass = 'sub-text';
            } else if (showSubText) {
                text = currentTime.toFixed(1);
                textClass = 'sub-text';
            }

            const $marker = $(`<div class="ruler-marker ${isMajor ? '' : 'sub'}"><span class="marker-text ${textClass}">${text}</span></div>`);
            $marker.css('left', _timeToPixel(currentTime) + 'px');
            $ruler.append($marker);
        }
    }

    function _renderTimeline() {
        const $labelsContainer = $('#track-labels-container');
        const $timelineContent = $('#timeline-content');
        $labelsContainer.empty();
        $timelineContent.empty();

        const gridPixel = GRID_TIME_INTERVAL * PIXELS_PER_SECOND;
        const majorGridPixel = gridPixel * 10;

        tracks.forEach((trackData, nodeId) => {
            let iconText = '';
            let typeClass = '';
            if (trackData.node.armature) {
                iconText = 'AR';
                typeClass = 'type-armature';
            } else if (trackData.node.spine) {
                iconText = 'SP';
                typeClass = 'type-spine';
            } else if (trackData.node.ui) {
                iconText = 'UI';
                typeClass = 'type-action';
            }

// 새로운 HTML 구조로 라벨을 생성합니다.
            const labelHtml = `
    <div class="track-label" title="${trackData.node.getName()}">
        <span class="track-type-icon ${typeClass}">${iconText}</span>
        ${trackData.node.getName()}
    </div>`;
            const $label = $(labelHtml);
            $labelsContainer.append($label);

            const $track = $(`<div class="timeline-track" data-node-id="${nodeId}"></div>`);
            $track.css('background-size', `${majorGridPixel}px 100%`);
            $timelineContent.append($track);

            trackData.clips.forEach(clip => {
                // [수정] 스파인 타입에 대한 클래스 추가
                let clipTypeClass = '';
                if (clip.type === 'action') clipTypeClass = 'type-action';
                if (clip.type === 'spine') clipTypeClass = 'type-spine';
                if (clip.type === 'armature') clipTypeClass = 'type-armature';

                const clipHtml = `<div class="timeline-clip ${clipTypeClass}" data-clip-id="${clip.id}" title="${clip.animName} ${clip.duration.toFixed(1)}s">
                    <span class="clip-name">${clip.animName}</span>
                    <span class="clip-duration"></span>
                    <div class="clip-delete-btn" title="삭제">&times;</div>
                </div>`;
                const $clip = $(clipHtml);

                _updateClipDurationText($clip, clip);
                $clip.find('.clip-delete-btn').on('mousedown', (e) => {
                    e.stopPropagation();
                    _deleteClip(nodeId, clip.id);
                });

                $clip.css({
                    left: _timeToPixel(clip.startTime) + 'px',
                    width: _timeToPixel(clip.duration) + 'px',
                });

                $track.append($clip);

                $clip.draggable({
                    axis: 'x',
                    helper: function() {
                        return $(this).clone().css({
                            width: $(this).outerWidth(),
                            height: $(this).outerHeight(),
                            zIndex: 1000
                        }).addClass('dragging-helper');
                    },
                    drag: function(event, ui) {
                        ui.position.top = 2;
                        const snappedLeft = _getSnappedPixel(ui.position.left);
                        ui.position.left = Math.max(0, snappedLeft);
                        ui.helper.css('left', ui.position.left + 'px');
                    },
                    stop: function(event, ui) {
                        const snappedLeft = _getSnappedPixel(ui.position.left);
                        const snappedTime = _pixelToTime(Math.max(0, snappedLeft));
                        clip.startTime = snappedTime;
                        $(this).css({
                            left: _timeToPixel(clip.startTime) + 'px',
                            top: '2px'
                        });
                        _updateOverlapsForTrack(trackData, $track);
                    }
                }).resizable({
                    handles: 'e, w',
                    start: function(event, ui) {
                        $(this).css('top', '2px');
                    },
                    resize: function(event, ui) {
                        ui.position.top = 2;
                        const snappedLeft = _getSnappedPixel(ui.position.left);
                        const snappedWidth = _getSnappedPixel(ui.size.width);
                        ui.position.left = Math.max(0, snappedLeft);
                        ui.size.width = Math.max(_timeToPixel(GRID_TIME_INTERVAL), snappedWidth);
                    },
                    stop: function(event, ui) {
                        const snappedLeft = _getSnappedPixel(ui.position.left);
                        const snappedWidth = _getSnappedPixel(ui.size.width);
                        const snappedStartTime = _pixelToTime(Math.max(0, snappedLeft));
                        const snappedDuration = _pixelToTime(Math.max(_timeToPixel(GRID_TIME_INTERVAL), snappedWidth));

                        clip.startTime = snappedStartTime;
                        clip.duration = snappedDuration;

                        const wrapper = $(this).parent('.ui-wrapper');
                        const targetElement = wrapper.length ? wrapper : $(this);

                        targetElement.css({
                            left: _timeToPixel(clip.startTime) + 'px',
                            width: _timeToPixel(clip.duration) + 'px',
                            top: '2px'
                        });

                        $(this).css('top', '2px');

                        _updateClipDurationText($(this), clip);
                        _updateOverlapsForTrack(trackData, $track);
                    }
                });
            });
            _updateOverlapsForTrack(trackData, $track);
        });
    }

    function _deleteClip(nodeId, clipId) {
        if (!tracks.has(nodeId)) return;
        const trackData = tracks.get(nodeId);
        trackData.clips = trackData.clips.filter(c => c.id !== clipId);
        if (trackData.clips.length === 0) {
            tracks.delete(nodeId);
        }
        _renderTimeline();
    }

    function _snapToGrid(timeValue) {
        return Math.round(timeValue / GRID_TIME_INTERVAL) * GRID_TIME_INTERVAL;
    }

    function _timeToPixel(time) {
        return Math.round(time * PIXELS_PER_SECOND);
    }

    function _pixelToTime(pixel) {
        return pixel / PIXELS_PER_SECOND;
    }

    function _getSnappedPixel(pixel) {
        const time = _pixelToTime(pixel);
        const snappedTime = _snapToGrid(time);
        return _timeToPixel(snappedTime);
    }

    function _addClipToTrack(animName, animType, targetNode, preferredTime) {
        if (!targetNode) return;
        const nodeId = targetNode.__instanceId;
        if (!tracks.has(nodeId)) {
            tracks.set(nodeId, { node: targetNode, clips: [] });
        }

        const trackData = tracks.get(nodeId);
        let startTime = 0;

        if (typeof preferredTime === 'number' && preferredTime >= 0) {
            startTime = _snapToGrid(preferredTime);
        } else {
            const maxEndTime = trackData.clips.reduce((max, clip) =>
                Math.max(max, clip.startTime + clip.duration), 0);
            startTime = _snapToGrid(maxEndTime);
        }

        const animDuration = mainLayerInstance.getAnimationLength(targetNode, animName) || GRID_TIME_INTERVAL;
        const snappedDuration = Math.max(GRID_TIME_INTERVAL, _snapToGrid(animDuration));

        const newClip = {
            id: Date.now() + Math.random(),
            animName,
            type: animType,
            duration: snappedDuration,
            originalDuration: snappedDuration,
            startTime
        };
        trackData.clips.push(newClip);
        _renderTimeline();
    }

    function _onAdd() {
        let selectedAnimName, animType;
        const $selectedAnim = mainLayerInstance._animationList.getSelectedAnimationName();

        // [수정] 스파인/아머처 타입 구분
        if ($selectedAnim && Target) {
            selectedAnimName = $selectedAnim;
            if (Target.spine) {
                animType = 'spine';
            } else if (Target.armature) {
                animType = 'armature';
            }
        } else {
            const $selectedAction = $('#actionTree').find('.custom-tree-item.selected');
            if ($selectedAction.length > 0) {
                selectedAnimName = $selectedAction.data('anim-name');
                animType = 'action';
            }
        }

        if (selectedAnimName && Target) {
            _addClipToTrack(selectedAnimName, animType, Target);
        } else {
            alert("추가할 애니메이션과 적용할 타겟을 먼저 선택하세요.");
        }
    }

    function _togglePlayback() {
        if (isPlaying) { isPaused ? _onResume() : _onPause(); }
        else { _onPlay(); }
    }

    function _getTotalDuration() {
        let totalDuration = 0;
        tracks.forEach(trackData => {
            trackData.clips.forEach(clip => {
                totalDuration = Math.max(totalDuration, clip.startTime + clip.duration);
            });
        });
        return totalDuration;
    }

    function _onPlay() {
        isPlaying = true; isPaused = false; sequenceStartTime = Date.now();

        const $playhead = $('#timeline-playhead');
        $('#playSequenceBtn').text('Pause');

        // [수정] 하드코딩된 120 대신 실제 라벨 너비를 가져옵니다.
        const labelWidth = $('#track-labels-container').outerWidth();
        $playhead.show().stop().css('left', labelWidth);

        $('#timeline-interaction-overlay').show();

        runnerNode = mainLayerInstance.getChildByTag(999);
        if (!runnerNode) { runnerNode = new cc.Node(); runnerNode.setTag(999); mainLayerInstance.addChild(runnerNode); }
        runnerNode.stopAllActions();

        tracks.forEach(trackData => {
            trackData.clips.forEach(clip => {
                const targetNode = trackData.node;
                const isLooping = clip.duration > clip.originalDuration;

                const playAction = cc.callFunc(() => {
                    if (clip.type === 'spine' && targetNode.spine) {
                        targetNode.spine.setAnimation(0, clip.animName, isLooping);
                    } else if (clip.type === 'armature' && targetNode.armature) {
                        targetNode.armature.getAnimation().play(clip.animName, -1, isLooping);
                    } else if (clip.type === 'action' && targetNode.cocosAction) {
                        targetNode.cocosAction.play(clip.animName, isLooping);
                    } else if (clip.type === 'action') {
                        ccs.actionManager.playActionByName(targetNode.getName() + '.ExportJson', clip.animName);
                    }
                });

                runnerNode.runAction(cc.sequence(cc.delayTime(clip.startTime), playAction));

                const endTime = clip.startTime + clip.duration;
                const isNextClipStarting = trackData.clips.some(nextClip => nextClip !== clip && Math.abs(nextClip.startTime - endTime) < 0.001);

                if (!isNextClipStarting) {
                    const stopAction = cc.callFunc(() => {
                        if (clip.type === 'spine' && targetNode.spine) {
                            targetNode.spine.clearTrack(0);
                        } else if (clip.type === 'armature' && targetNode.armature && targetNode.armature.getAnimation().getCurrentMovementID() === clip.animName) {
                            targetNode.armature.getAnimation().stop();
                        }
                    });
                    runnerNode.runAction(cc.sequence(cc.delayTime(endTime), stopAction));
                }
            });
        });

        const totalDuration = _getTotalDuration();
        if (totalDuration > 0) {
            // [수정] 애니메이션 목적지 계산에도 동적 너비를 사용합니다.
            $playhead.animate({ left: labelWidth + totalDuration * PIXELS_PER_SECOND }, {
                duration: totalDuration * 1000, easing: 'linear',
                step: function(now) {
                    const $container = $('#timeline-tracks-container');
                    const playheadPos = now - labelWidth; // 기준값을 동적 너비로 변경
                    const containerWidth = $container.width(), scrollLeft = $container.scrollLeft();
                    if (playheadPos > scrollLeft + containerWidth * 0.75 || playheadPos < scrollLeft) {
                        $container.scrollLeft(playheadPos - containerWidth / 2);
                    }
                },
                complete: () => _onStop(true)
            });
        } else { _onStop(true); }
    }

    function _onPause() {
        if (!isPlaying || isPaused) return;
        isPaused = true; pausedTime = Date.now() - sequenceStartTime;
        $('#playSequenceBtn').text('Resume');
        $('#timeline-playhead').stop();

        if (runnerNode) cc.director.getActionManager().pauseTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;

            // [수정] 스파인 일시정지 방식을 pause() 함수로 변경합니다.
            if (node.spine) {
                node.spine.pause();
            }

            if (node.armature) {
                node.armature.getAnimation().pause();
            }
            cc.director.getActionManager().pauseTarget(node);
        });
    }

    function _onResume() {
        if (!isPlaying || !isPaused) return;
        isPaused = false; sequenceStartTime = Date.now() - pausedTime;
        $('#playSequenceBtn').text('Pause');

        if (runnerNode) cc.director.getActionManager().resumeTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;

            // [수정] 스파인 재개 방식을 resume() 함수로 변경합니다.
            if (node.spine) {
                node.spine.resume();
            }

            if (node.armature) {
                node.armature.getAnimation().resume();
            }
            cc.director.getActionManager().resumeTarget(node);
        });

        const $playhead = $('#timeline-playhead');
        const currentLeft = $playhead.position().left;
        const totalDuration = _getTotalDuration();
        const labelWidth = $('#track-labels-container').outerWidth();
        const currentTime = (currentLeft - labelWidth) / PIXELS_PER_SECOND;
        const remainingDuration = totalDuration - currentTime;

        if (remainingDuration > 0) {
            $playhead.animate({ left: labelWidth + totalDuration * PIXELS_PER_SECOND }, {
                duration: remainingDuration * 1000, easing: 'linear',
                step: function(now) {
                    const $container = $('#timeline-tracks-container');
                    const playheadPos = now - labelWidth;
                    const containerWidth = $container.width(), scrollLeft = $container.scrollLeft();
                    if (playheadPos > scrollLeft + containerWidth * 0.75 || playheadPos < scrollLeft) {
                        $container.scrollLeft(playheadPos - containerWidth / 2);
                    }
                },
                complete: () => _onStop(true)
            });
        } else { _onStop(true); }
    }

    function _onStop(resetPlayhead = true) {
        isPlaying = false;
        isPaused = false;
        $('#playSequenceBtn').text('Play');
        $('#timeline-interaction-overlay').hide();
        $('#timeline-playhead').stop();

        if (runnerNode) {
            runnerNode.stopAllActions();
        }

        // [수정] 정지 시, 일시정지되었을 수 있는 모든 노드들을 재개시킨 후 애니메이션을 정지합니다.
        tracks.forEach(trackData => {
            const node = trackData.node;

            // 1. 노드 자체의 스케줄러/액션을 '재개' 상태로 먼저 돌립니다.
            if (node.spine) {
                node.spine.resume();
            }
            if (node.armature) {
                node.armature.getAnimation().resume();
            }

            // DraggableNode 래퍼 자체도 재개합니다.
            cc.director.getActionManager().resumeTarget(node);

            // 2. 현재 재생 중인 애니메이션을 정지/클리어합니다.
            if (node.spine) {
                node.spine.clearTracks();
            }
            if (node.armature) {
                node.armature.getAnimation().stop();
            }
        });

        if (resetPlayhead) {
            const labelWidth = $('#track-labels-container').outerWidth();
            $('#timeline-playhead').hide().css('left', labelWidth);
        }
    }

    function _zoom(direction) {
        const scrollContainer = $('#timeline-tracks-container')[0];
        const scrollLeft = scrollContainer.scrollLeft;
        const timeAtCenter = (scrollLeft + scrollContainer.clientWidth / 2) / PIXELS_PER_SECOND;

        PIXELS_PER_SECOND *= (direction === 'in' ? ZOOM_FACTOR : 1 / ZOOM_FACTOR);
        PIXELS_PER_SECOND = Math.max(20, Math.min(PIXELS_PER_SECOND, 5000));

        _renderTimeline();
        _renderRuler();

        const newScrollLeft = timeAtCenter * PIXELS_PER_SECOND - scrollContainer.clientWidth / 2;
        scrollContainer.scrollLeft = newScrollLeft;
    }

    function syncScroll(source, target, scrollLeft) {
        if (isSyncingScroll) return;
        isSyncingScroll = true;
        target.scrollTop(source.scrollTop());
        $('#timeline-header-ruler').scrollLeft(scrollLeft);
        isSyncingScroll = false;
    }

    return {
        initialize: function(layerInstance) {
            mainLayerInstance = layerInstance;
            const $tracksContainer = $('#timeline-tracks-container');

            $('#addSequenceBtn').on('click', _onAdd);
            $('#playSequenceBtn').on('click', _togglePlayback);
            $('#stopSequenceBtn').on('click', () => _onStop(true));
            $('#clearSequenceBtn').on('click', this.clear);
            $('#zoom-in-btn').on('click', () => _zoom('in'));
            $('#zoom-out-btn').on('click', () => _zoom('out'));

            $tracksContainer.on('scroll', (e) => syncScroll($tracksContainer, $('#track-labels-container'), e.target.scrollLeft));
            $('#track-labels-container').on('wheel', (e) => {
                e.preventDefault();
                $tracksContainer.scrollTop($tracksContainer.scrollTop() + e.originalEvent.deltaY);
            });

            $('#timeline-editor').droppable({
                accept: '.custom-tree-item',
                drop: function(event, ui) {
                    if (!Target) { alert("먼저 캔버스에서 애니메이션을 적용할 타겟을 선택하세요."); return; }

                    const animName = ui.draggable.data('anim-name');

                    // ================================================================
                    // ##### [수정] 드래그 앤 드롭 시, Target 타입을 확인하여 animType을 올바르게 지정합니다. #####
                    let animType;
                    if (ui.draggable.closest('#animationTree').length > 0) {
                        // 애니메이션 목록에서 드래그한 경우
                        if (Target && Target.spine) {
                            animType = 'spine';
                        } else { // armature 또는 기타
                            animType = 'armature';
                        }
                    } else {
                        // 액션 목록에서 드래그한 경우
                        animType = 'action';
                    }
                    // ================================================================

                    const dropX = event.pageX - $tracksContainer.offset().left + $tracksContainer.scrollLeft();
                    _addClipToTrack(animName, animType, Target, dropX / PIXELS_PER_SECOND);
                }
            });

            $(window).on('resize.sequencer', _renderRuler);
            _renderTimeline();
            _renderRuler();
        },
        clear: function() {
            if (isPlaying) _onStop(true);
            tracks.clear();
            _renderTimeline();
        },
        cleanup: function() {
            if (isPlaying) _onStop(true);
            $('#addSequenceBtn, #playSequenceBtn, #stopSequenceBtn, #clearSequenceBtn, #zoom-in-btn, #zoom-out-btn').off();
            if ($('#timeline-editor').data('ui-droppable')) $('#timeline-editor').droppable('destroy');
            $('#track-labels-container, #timeline-tracks-container').off();
            $(window).off('resize.sequencer');
            tracks.clear();
            mainLayerInstance = null;
        }
    };
})();