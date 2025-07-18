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
    let animationFrameId = null;

    let playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                    </svg>`;

    let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                    </svg> `;

    function _clearClipsForNode(nodeId) {
        if (tracks.has(nodeId)) {
            tracks.delete(nodeId);
            _renderTimeline();
        }
    }

    function _updateClipDurationText($clipElement, clipData) {
        let durationText = clipData.duration.toFixed(2) + 's';
        const durationDiff = clipData.duration - clipData.originalDuration;

        if (Math.abs(durationDiff) > 0.05) {
            const sign = durationDiff > 0 ? '+' : '';
            const diffClass = durationDiff > 0 ? 'increased' : 'decreased';
            durationText += ` <span class="modified ${diffClass}">(${sign}${durationDiff.toFixed(2)})</span>`;
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
            let text = '',
                textClass = '';

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
            } else if (trackData.node.ui || trackData.node.cocosstudio) {
                iconText = 'UI';
                typeClass = 'type-action';
            }

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
                let clipTypeClass = '';
                if (clip.type === 'action') clipTypeClass = 'type-action';
                if (clip.type === 'spine') clipTypeClass = 'type-spine';
                if (clip.type === 'armature') clipTypeClass = 'type-armature';

                const clipHtml = `<div class="timeline-clip ${clipTypeClass}" data-clip-id="${clip.id}" title="${clip.animName} ${clip.duration.toFixed(1)}s">
                    <span class="clip-name">${clip.animName}</span>
                    <span class="clip-duration"></span>
                </div>`;
                const $clip = $(clipHtml);

                _updateClipDurationText($clip, clip);

                // 클립 클릭 시 'selected' 클래스 추가/관리하는 이벤트 핸들러
                $clip.on('click', function(e) {
                    e.stopPropagation(); // 이벤트가 부모로 전파되는 것을 막음

                    // 다른 모든 패널의 선택 상태를 초기화
                    $('.timeline-clip').removeClass('selected');
                    $('#fileNameTree .custom-tree-item').removeClass('selected');
                    if (mainLayerInstance) {
                        mainLayerInstance.updateMenuWithNodeId(null);
                    }

                    // 현재 클릭한 클립에만 'selected' 클래스 추가
                    $(this).addClass('selected');
                });

                $clip.on('contextmenu', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (mainLayerInstance && mainLayerInstance._contextMenuManager) {
                        mainLayerInstance._contextMenuManager.showOtherContextMenu(e, this, null);
                    }
                });

                $clip.css({
                    left: _timeToPixel(clip.startTime) + 'px',
                    width: _timeToPixel(clip.duration) + 'px',
                });

                if (clip.duration > clip.originalDuration && clip.originalDuration > 0.01) {
                    const numLoops = Math.floor(clip.duration / clip.originalDuration);
                    for (let i = 1; i < numLoops; i++) {
                        const markerLeft = _timeToPixel(clip.originalDuration * i);
                        $clip.append(`<div class="timeline-clip-loop-marker" style="left: ${markerLeft}px;"></div>`);
                    }
                }

                if (clip.duration > clip.originalDuration) {
                    const numLoops = Math.floor(clip.duration / clip.originalDuration);
                    for (let i = 1; i <= numLoops; i++) {
                        const markerLeft = (clip.originalDuration * i) * PIXELS_PER_SECOND;
                        if (markerLeft < _timeToPixel(clip.duration)) {
                            $clip.append(`<div class="timeline-clip-loop-marker" style="left: ${markerLeft}px;"></div>`);
                        }
                    }
                }

                $track.append($clip);

                $clip.draggable({
                    axis: 'x',
                    start: function(event, ui) {
                        if (event.button === 2) {
                            event.stopPropagation();
                            return false;
                        }
                        $('body').addClass('is-interacting');
                        $('#resize-overlay').show();
                    },
                    helper: function() {
                        return $(this).clone().css({
                            width: $(this).outerWidth(),
                            height: $(this).outerHeight(),
                            zIndex: 1000
                        }).addClass('dragging-helper');
                    },
                    // *** 수정: 드래그 시 스마트 가이드 추가 ***
                    drag: function(event, ui) {
                        ui.position.top = 2;
                        let newPosLeft = ui.position.left;
                        const clipWidth = ui.helper.outerWidth();
                        const snapTolerance = 8;
                        let snapped = false;

                        // 이제 모든 트랙의 클립을 대상으로 스냅을 검사합니다.
                        $('.timeline-track .timeline-clip').not($(this)).not('.ui-draggable-dragging').each(function() {
                            const targetPos = $(this).position();
                            const targetWidth = $(this).outerWidth();
                            const targetLeft = targetPos.left;
                            const targetRight = targetPos.left + targetWidth;

                            const currentLeft = newPosLeft;
                            const currentRight = newPosLeft + clipWidth;

                            let snapPosition = -1;

                            if (Math.abs(currentLeft - targetLeft) < snapTolerance) { newPosLeft = targetLeft; snapped = true; snapPosition = targetLeft; }
                            if (!snapped && Math.abs(currentLeft - targetRight) < snapTolerance) { newPosLeft = targetRight; snapped = true; snapPosition = targetRight; }
                            if (!snapped && Math.abs(currentRight - targetLeft) < snapTolerance) { newPosLeft = targetLeft - clipWidth; snapped = true; snapPosition = targetLeft; }
                            if (!snapped && Math.abs(currentRight - targetRight) < snapTolerance) { newPosLeft = targetRight - clipWidth; snapped = true; snapPosition = targetRight; }

                            if (snapped) {
                                return false; // 첫 번째 스냅 지점을 찾으면 루프 종료
                            }
                        });

                        ui.position.left = Math.max(0, newPosLeft);
                        ui.helper.css('left', ui.position.left + 'px');
                    },
                    stop: function(event, ui) {
                        const newTime = _pixelToTime(Math.max(0, ui.position.left));
                        clip.startTime = newTime;

                        $(this).css({
                            left: _timeToPixel(clip.startTime) + 'px',
                            top: '2px'
                        });
                        _renderTimeline();

                        $('body').removeClass('is-interacting');
                        $('#resize-overlay').hide();
                    }
                }).resizable({
                    handles: 'e, w',
                    start: function(event, ui) {
                        $(this).css('top', '2px');
                        $('body').addClass('is-interacting');
                        $('#resize-overlay').show();
                    },
                    // *** 수정: 리사이즈 시 스냅 및 스마트 가이드 추가 ***
                    resize: function(event, ui) {
                        ui.position.top = 2;

                        const snapTolerance = 8;
                        let guideShown = false;

                        const originalRight = ui.originalPosition.left + ui.originalSize.width;
                        const isResizingLeft = ui.position.left !== ui.originalPosition.left;

                        let newLeft = ui.position.left;
                        let newWidth = ui.size.width;

                        // 1. 다른 클립에 대한 기존 스냅 로직 (변경 없음)
                        $('.timeline-track .timeline-clip').not($(this)).each(function() {
                            const targetPos = $(this).position();
                            const targetWidth = $(this).outerWidth();
                            const targetLeft = targetPos.left;
                            const targetRight = targetPos.left + targetWidth;

                            let snapPosition = -1;

                            if (isResizingLeft) {
                                const currentLeft = newLeft;
                                if (Math.abs(currentLeft - targetLeft) < snapTolerance) { newLeft = targetLeft; snapPosition = targetLeft; }
                                if (snapPosition < 0 && Math.abs(currentLeft - targetRight) < snapTolerance) { newLeft = targetRight; snapPosition = targetRight; }
                                if (snapPosition >= 0) {
                                    newWidth = originalRight - newLeft;
                                }
                            } else {
                                const currentRight = newLeft + newWidth;
                                if (Math.abs(currentRight - targetLeft) < snapTolerance) { newWidth = targetLeft - newLeft; snapPosition = targetLeft; }
                                if (snapPosition < 0 && Math.abs(currentRight - targetRight) < snapTolerance) { newWidth = targetRight - newLeft; snapPosition = targetRight; }
                            }

                            if (snapPosition >= 0) {
                                return false;
                            }
                        });

                        // --- 2. 반복 지점에 대한 새로운 스냅 로직 (추가) ---
                        // 오른쪽 핸들을 조절하고, 아직 다른 곳에 스냅되지 않았을 때만 작동
                        if (!isResizingLeft && !guideShown && clip.originalDuration > 0) {
                            const originalDurationInPixels = _timeToPixel(clip.originalDuration);
                            const currentResizedWidth = ui.size.width;

                            // 현재 너비가 원본 길이의 몇 배에 가장 가까운지 계산
                            const closestLoopCount = Math.round(currentResizedWidth / originalDurationInPixels);

                            if (closestLoopCount > 0) {
                                // 가장 가까운 루프 지점의 너비를 계산
                                const snapWidth = closestLoopCount * originalDurationInPixels;

                                // 현재 너비와 스냅 지점의 너비가 허용 오차 내에 있는지 확인
                                if (Math.abs(currentResizedWidth - snapWidth) < snapTolerance) {
                                    newWidth = snapWidth; // 너비를 스냅 지점에 맞춤
                                }
                            }
                        }

                        ui.position.left = Math.max(0, newLeft);
                        ui.size.width = Math.max(_timeToPixel(GRID_TIME_INTERVAL), newWidth);
                    },
                    stop: function(event, ui) {
                        const newStartTime = _pixelToTime(Math.max(0, ui.position.left));
                        const newDuration = _pixelToTime(Math.max(_timeToPixel(GRID_TIME_INTERVAL), ui.size.width));

                        clip.startTime = newStartTime;
                        clip.duration = newDuration;

                        _updateClipDurationText($(this), clip);
                        _renderTimeline(); // 위치와 크기가 모두 확정된 후 타임라인 재렌더링

                        $('body').removeClass('is-interacting');
                        $('#resize-overlay').hide();
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
        return timeValue;
    }

    function _timeToPixel(time) {
        return Math.round(time * PIXELS_PER_SECOND);
    }

    function _pixelToTime(pixel) {
        return pixel / PIXELS_PER_SECOND;
    }

    function _getSnappedPixel(pixel) {
        return pixel;
    }

    function _addClipToTrack(animName, animType, targetNode, preferredTime) {
        if (!targetNode) return;
        const nodeId = targetNode.__instanceId;
        if (!tracks.has(nodeId)) {
            tracks.set(nodeId, {
                node: targetNode,
                clips: []
            });
        }

        const trackData = tracks.get(nodeId);
        let startTime = 0;

        if (typeof preferredTime === 'number' && preferredTime >= 0) {
            startTime = preferredTime;
        } else {
            const maxEndTime = trackData.clips.reduce((max, clip) =>
                Math.max(max, clip.startTime + clip.duration), 0);
            startTime = maxEndTime;
        }

        const animDuration = mainLayerInstance.getAnimationLength(targetNode, animName) || GRID_TIME_INTERVAL;
        const newDuration = Math.max(GRID_TIME_INTERVAL, animDuration);

        const newClip = {
            id: Date.now() + Math.random(),
            animName,
            type: animType,
            duration: newDuration,
            originalDuration: newDuration,
            startTime
        };
        trackData.clips.push(newClip);
        _renderTimeline();
    }

    function _onAdd() {
        let selectedAnimName, animType;
        const $selectedAction = $('#actionTree').find('.custom-tree-item.selected');
        if ($selectedAction.length > 0) {
            selectedAnimName = $selectedAction.data('anim-name');
            animType = $selectedAction.data('anim-type');
        }

        if (selectedAnimName && animType && mainLayerInstance._currentlySelectedNode) {
            _addClipToTrack(selectedAnimName, animType, mainLayerInstance._currentlySelectedNode);
        } else {
            alert("목록에서 추가할 애니메이션과 씬에서 적용할 타겟을 먼저 선택하세요.");
        }
    }

    function _togglePlayback() {
        if (isPlaying) {
            isPaused ? _onResume() : _onPause();
        } else {
            _onPlay();
        }
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

    function _animatePlayhead() {
        if (!isPlaying || isPaused) {
            return;
        }

        const $container = $('#timeline-tracks-container');
        const $playhead = $('#timeline-playhead');
        const labelWidth = $('#track-labels-container').outerWidth();

        const totalDuration = _getTotalDuration();
        const elapsedTimeMs = Date.now() - sequenceStartTime;
        const elapsedTimeSec = elapsedTimeMs / 1000;

        if (elapsedTimeSec >= totalDuration) {
            _onStop(true);
            return;
        }

        const currentPixelPos = elapsedTimeSec * PIXELS_PER_SECOND;
        const containerWidth = $container.width();
        const scrollLeft = $container.scrollLeft();

        const triggerPointAbsolute = scrollLeft + (containerWidth * 0.75);
        const stickyPlayheadLeft = labelWidth + (containerWidth * 0.75);

        if (currentPixelPos <= triggerPointAbsolute) {
            $playhead.css('left', labelWidth + currentPixelPos + 'px');
        } else {
            const newScrollLeft = currentPixelPos - (containerWidth * 0.75);
            $playhead.css('left', stickyPlayheadLeft + 'px');
            $container.scrollLeft(newScrollLeft);
        }

        animationFrameId = requestAnimationFrame(_animatePlayhead);
    }

    function _onPlay() {
        _onStop(false);

        $('#timeline-tracks-container').scrollLeft(0);

        isPlaying = true;
        isPaused = false;
        sequenceStartTime = Date.now();

        const $playhead = $('#timeline-playhead');
        $('#playSequenceBtn').html(pauseIcon);
        $playhead.show().stop().css('left', $('#track-labels-container').outerWidth());
        $('#timeline-interaction-overlay').show();

        runnerNode = mainLayerInstance.getChildByTag(999);
        if (!runnerNode) {
            runnerNode = new cc.Node();
            runnerNode.setTag(999);
            mainLayerInstance.addChild(runnerNode);
        }

        if (tracks.size === 0) {
            _onStop(true);
            return;
        }

        tracks.forEach((trackData, nodeId) => {
            trackData.clips.forEach(clip => {
                const targetNode = trackData.node;
                const isLooping = clip.duration > clip.originalDuration;

                const playAction = cc.callFunc(() => {
                    if (targetNode.spine) targetNode.spine.clearTrack(0);
                    if (targetNode.armature) targetNode.armature.getAnimation().stop();
                    if (targetNode.ui) targetNode.ui.stopAllActions();

                    if (clip.type === 'spine' && targetNode.spine) {
                        targetNode.spine.setAnimation(0, clip.animName, isLooping);
                    } else if (clip.type === 'armature' && targetNode.armature) {
                        let loopCount = isLooping ? Math.ceil(clip.duration / clip.originalDuration) : 1;
                        if (loopCount === Infinity) loopCount = 0;
                        targetNode.armature.getAnimation().play(clip.animName, -1, loopCount);
                    } else if (clip.type === 'action' && targetNode.cocosAction) {
                        targetNode.cocosAction.play(clip.animName, isLooping);
                    } else if (clip.type === 'action' && targetNode.ui) {
                        const singlePlayAction = cc.callFunc(() => {
                            ccs.actionManager.playActionByName(targetNode.actionUrl, clip.animName);
                        });

                        if (isLooping && clip.originalDuration > 0.01) {
                            const numRepeats = Math.ceil(clip.duration / clip.originalDuration);
                            const loopSequence = cc.repeat(
                                cc.sequence(singlePlayAction, cc.delayTime(clip.originalDuration)),
                                numRepeats
                            );
                            targetNode.ui.runAction(loopSequence);
                        } else {
                            targetNode.ui.runAction(singlePlayAction);
                        }
                    }
                });

                runnerNode.runAction(cc.sequence(cc.delayTime(clip.startTime), playAction));

                const endTime = clip.startTime + clip.duration;
                const isNextClipStarting = trackData.clips.some(nextClip => nextClip !== clip && Math.abs(nextClip.startTime - endTime) < 0.001);

                if (clip.type === 'action' || !isNextClipStarting) {
                    const stopAction = cc.callFunc(() => {
                        if (clip.type === 'armature' && targetNode.armature && targetNode.armature.getAnimation().getCurrentMovementID() === clip.animName) {
                            targetNode.armature.getAnimation().stop();
                        } else if (clip.type === 'spine' && targetNode.spine) {
                            targetNode.spine.clearTrack(0);
                        } else if (clip.type === 'action' && targetNode.ui) {
                            ccs.actionManager.stopActionByName(targetNode.actionUrl, clip.animName);
                        }
                    });
                    runnerNode.runAction(cc.sequence(cc.delayTime(endTime), stopAction));
                }
            });
        });

        const totalDuration = _getTotalDuration();
        if (totalDuration > 0) {
            _animatePlayhead();
        } else {
            _onStop(true);
        }
    }

    function _onPause() {
        if (!isPlaying || isPaused) return;
        isPaused = true;
        pausedTime = Date.now() - sequenceStartTime;
        $('#playSequenceBtn').html(playIcon);

        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        if (runnerNode) cc.director.getActionManager().pauseTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;
            if (node.spine) node.spine.pause();
            if (node.armature) node.armature.getAnimation().pause();
            if (node.ui) {
                node.ui.getChildren().forEach(child => child.pause());
                node.ui.pause();
            }
        });
    }

    function _onResume() {
        if (!isPlaying || !isPaused) return;
        isPaused = false;
        sequenceStartTime = Date.now() - pausedTime;
        $('#playSequenceBtn').html(pauseIcon);

        if (runnerNode) cc.director.getActionManager().resumeTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;
            if (node.spine) node.spine.resume();
            if (node.armature) node.armature.getAnimation().resume();
            if (node.ui) {
                node.ui.getChildren().forEach(child => child.resume());
                node.ui.resume();
            }
        });

        const totalDuration = _getTotalDuration();
        if (totalDuration > 0) {
            _animatePlayhead();
        } else {
            _onStop(true);
        }
    }

    function _onStop(resetPlayhead = true) {
        isPlaying = false;
        isPaused = false;
        $('#playSequenceBtn').html(playIcon);
        $('#timeline-interaction-overlay').hide();

        $('#timeline-playhead').stop();
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        if (runnerNode) {
            runnerNode.stopAllActions();
        }

        tracks.forEach(trackData => {
            const node = trackData.node;
            if (node.spine) {
                node.spine.resume();
                node.spine.clearTracks();
            }
            if (node.armature) {
                node.armature.getAnimation().resume();
                node.armature.getAnimation().stop();
            }

            if (node.ui) {
                node.ui.getChildren().forEach(child => child.stopAllActions());
                node.ui.stopAllActions();
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
        $('#timeline-editor').get(0).style.setProperty('--pixels-per-second', PIXELS_PER_SECOND);

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
        _deleteClip: _deleteClip,
        _clearClipsForNode: _clearClipsForNode,
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
                    if (!mainLayerInstance._currentlySelectedNode) {
                        alert("먼저 캔버스에서 애니메이션을 적용할 타겟을 선택하세요.");
                        return;
                    }
                    const animName = ui.draggable.data('anim-name');
                    const animType = ui.draggable.data('anim-type');

                    if (!animType) {
                        return;
                    }

                    const dropX = event.pageX - $tracksContainer.offset().left + $tracksContainer.scrollLeft();
                    _addClipToTrack(animName, animType, mainLayerInstance._currentlySelectedNode, dropX / PIXELS_PER_SECOND);
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