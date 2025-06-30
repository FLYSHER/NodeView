var Sequencer = (function() {
    let PIXELS_PER_SECOND = 100;
    const ZOOM_FACTOR = 1.5;
    const GRID_TIME_INTERVAL = 0.1;

    let tracks = new Map();
    let mainLayerInstance = null; // mainLayerInstance는 initialize 시 할당됩니다.
    let isSyncingScroll = false;
    let isPlaying = false;
    let isPaused = false;
    let runnerNode = null;
    let sequenceStartTime = 0;
    let pausedTime = 0;

    let playIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                    </svg>`;

    let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                              <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0-.75-.75h-1.5Z" />
                            </svg>
                            `;

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

                $clip.on('contextmenu', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // *** 수정: showContextMenu 대신 mainLayerInstance._contextMenuManager.showOtherContextMenu 호출 ***
                    if (mainLayerInstance && mainLayerInstance._contextMenuManager) {
                        mainLayerInstance._contextMenuManager.showOtherContextMenu(e, this, null);
                    }
                    // *** 수정 끝 ***
                });

                $clip.css({
                    left: _timeToPixel(clip.startTime) + 'px',
                    width: _timeToPixel(clip.duration) + 'px',
                });

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
                    // *** 수정: start 콜백에서 우클릭 시 드래그 취소 (이전 수정 반영) ***
                    start: function(event, ui) {
                        if (event.button === 2) { // 마우스 오른쪽 버튼
                            event.stopPropagation();
                            return false; // 드래그 동작 취소
                        }
                        $('body').addClass('is-interacting');
                        $('#resize-overlay').show();
                    },
                    // *** 수정 끝 ***
                    helper: function() {
                        return $(this).clone().css({
                            width: $(this).outerWidth(),
                            height: $(this).outerHeight(),
                            zIndex: 1000
                        }).addClass('dragging-helper');
                    },
                    // *** 수정: 드래그 시 클립끼리 스냅되도록 로직 변경 ***
                    drag: function(event, ui) {
                        ui.position.top = 2; // 세로 위치 고정
                        let newPosLeft = ui.position.left;
                        const clipWidth = ui.helper.outerWidth();
                        const snapTolerance = 8; // 스냅 민감도 (픽셀)
                        let snapped = false;

                        // 같은 트랙에 있는 다른 클립들을 대상으로 스냅 검사
                        $(this).siblings('.timeline-clip').not('.ui-draggable-dragging').each(function() {
                            const targetPos = $(this).position();
                            const targetWidth = $(this).outerWidth();
                            const targetLeft = targetPos.left;
                            const targetRight = targetPos.left + targetWidth;

                            // 현재 드래그 중인 클립의 왼쪽/오른쪽 가장자리
                            const currentLeft = newPosLeft;
                            const currentRight = newPosLeft + clipWidth;

                            // 1. 현재 클립의 왼쪽 -> 타겟 클립의 왼쪽
                            if (Math.abs(currentLeft - targetLeft) < snapTolerance) { newPosLeft = targetLeft; snapped = true; }
                            // 2. 현재 클립의 왼쪽 -> 타겟 클립의 오른쪽
                            if (!snapped && Math.abs(currentLeft - targetRight) < snapTolerance) { newPosLeft = targetRight; snapped = true; }
                            // 3. 현재 클립의 오른쪽 -> 타겟 클립의 왼쪽
                            if (!snapped && Math.abs(currentRight - targetLeft) < snapTolerance) { newPosLeft = targetLeft - clipWidth; snapped = true; }
                            // 4. 현재 클립의 오른쪽 -> 타겟 클립의 오른쪽
                            if (!snapped && Math.abs(currentRight - targetRight) < snapTolerance) { newPosLeft = targetRight - clipWidth; snapped = true; }

                            if (snapped) return false; // 하나라도 스냅되면 루프 종료
                        });

                        ui.position.left = Math.max(0, newPosLeft); // 0 이하로 가지 않도록
                        ui.helper.css('left', ui.position.left + 'px');
                    },
                    stop: function(event, ui) {
                        // *** 수정: 그리드 스냅 로직 제거 ***
                        const newTime = _pixelToTime(Math.max(0, ui.position.left));
                        clip.startTime = newTime;

                        $(this).css({
                            left: _timeToPixel(clip.startTime) + 'px',
                            top: '2px'
                        });
                        _renderTimeline();

                        $('body').removeClass('is-interacting');
                        $('.vertical-guide, .horizontal-guide').hide();
                        $('#resize-overlay').hide();
                    }
                }).resizable({
                    handles: 'e, w',
                    start: function(event, ui) {
                        $(this).css('top', '2px');
                    },
                    // *** 수정: 리사이즈 시 그리드 스냅 제거 ***
                    resize: function(event, ui) {
                        ui.position.top = 2;
                        // 최소 크기만 유지하고 자유롭게 조절
                        ui.position.left = Math.max(0, ui.position.left);
                        ui.size.width = Math.max(_timeToPixel(GRID_TIME_INTERVAL), ui.size.width);
                    },
                    stop: function(event, ui) {
                        // *** 수정: 리사이즈 종료 시 그리드 스냅 제거 ***
                        const newStartTime = _pixelToTime(Math.max(0, ui.position.left));
                        const newDuration = _pixelToTime(Math.max(_timeToPixel(GRID_TIME_INTERVAL), ui.size.width));

                        clip.startTime = newStartTime;
                        clip.duration = newDuration;

                        const wrapper = $(this).parent('.ui-wrapper');
                        const targetElement = wrapper.length ? wrapper : $(this);

                        targetElement.css({
                            left: _timeToPixel(clip.startTime) + 'px',
                            width: _timeToPixel(clip.duration) + 'px',
                            top: '2px'
                        });

                        $(this).css('top', '2px');

                        _updateClipDurationText($(this), clip);
                        _renderTimeline();
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

    // *** 수정: 그리드 스냅을 끄기 위해 원래 값을 그대로 반환하도록 변경 ***
    function _snapToGrid(timeValue) {
        // return Math.round(timeValue / GRID_TIME_INTERVAL) * GRID_TIME_INTERVAL;
        return timeValue;
    }

    function _timeToPixel(time) {
        return Math.round(time * PIXELS_PER_SECOND);
    }

    function _pixelToTime(pixel) {
        return pixel / PIXELS_PER_SECOND;
    }

    // *** 수정: 그리드 스냅을 끄기 위해 원래 픽셀 값을 그대로 반환하도록 변경 ***
    function _getSnappedPixel(pixel) {
        // const time = _pixelToTime(pixel);
        // const snappedTime = _snapToGrid(time);
        // return _timeToPixel(snappedTime);
        return pixel;
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
            // *** 수정: 그리드 스냅 제거 ***
            startTime = preferredTime;
        } else {
            const maxEndTime = trackData.clips.reduce((max, clip) =>
                Math.max(max, clip.startTime + clip.duration), 0);
            // *** 수정: 그리드 스냅 제거 ***
            startTime = maxEndTime;
        }

        const animDuration = mainLayerInstance.getAnimationLength(targetNode, animName) || GRID_TIME_INTERVAL;
        // *** 수정: 그리드 스냅 제거 ***
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
        $('#playSequenceBtn').html(pauseIcon);
        $playhead.show().stop().css('left', $('#track-labels-container').outerWidth());
        $('#timeline-interaction-overlay').show();

        runnerNode = mainLayerInstance.getChildByTag(999);
        if (!runnerNode) { runnerNode = new cc.Node(); runnerNode.setTag(999); mainLayerInstance.addChild(runnerNode); }
        runnerNode.stopAllActions();

        if (tracks.size === 0) {
            _onStop(true);
            return;
        }

        tracks.forEach(trackData => {
            trackData.clips.forEach(clip => {
                const targetNode = trackData.node;
                const isLooping = clip.duration > clip.originalDuration;

                const playAction = cc.callFunc(() => {
                    if (clip.type === 'spine' && targetNode.spine) {
                        targetNode.spine.setAnimation(0, clip.animName, isLooping);
                    } else if (clip.type === 'armature' && targetNode.armature) {
                        let loopCount = 1;
                        if (isLooping && clip.originalDuration > 0) {
                            loopCount = Math.ceil(clip.duration / clip.originalDuration);
                            if (loopCount === Infinity) loopCount = 0;
                        }
                        targetNode.armature.getAnimation().play(clip.animName, -1, loopCount);
                    } else if (clip.type === 'action' && targetNode.cocosAction) {
                        targetNode.cocosAction.play(clip.animName, isLooping);
                    } else if (clip.type === 'action' && targetNode.ui) {
                        targetNode.ui.stopAllActions();

                        const singlePlayAction = cc.callFunc(() => {
                            ccs.actionManager.playActionByName(targetNode.actionUrl, clip.animName);
                        });

                        if (isLooping && clip.originalDuration > 0) {
                            const numRepeats = Math.max(1, Math.ceil(clip.duration / clip.originalDuration));
                            const loopSequence = cc.repeat(cc.sequence(singlePlayAction, cc.delayTime(clip.originalDuration)), numRepeats);
                            targetNode.ui.runAction(loopSequence);
                        } else {
                            targetNode.ui.runAction(singlePlayAction);
                        }
                    }
                });

                runnerNode.runAction(cc.sequence(cc.delayTime(clip.startTime), playAction));

                const endTime = clip.startTime + clip.duration;
                const isNextClipStarting = trackData.clips.some(nextClip => nextClip !== clip && Math.abs(nextClip.startTime - endTime) < 0.001);

                const stopAction = cc.callFunc(() => {
                    if (clip.type === 'armature' && targetNode.armature && targetNode.armature.getAnimation().getCurrentMovementID() === clip.animName) {
                        targetNode.armature.getAnimation().stop();
                    } else if (clip.type === 'spine' && targetNode.spine) {
                        targetNode.spine.clearTrack(0);
                    } else if (clip.type === 'action' && targetNode.ui) {
                        targetNode.ui.stopAllActions();
                    }
                });
                runnerNode.runAction(cc.sequence(cc.delayTime(endTime), stopAction));
            });
        });

        const totalDuration = _getTotalDuration();
        if (totalDuration > 0) {
            $playhead.animate({ left: $('#track-labels-container').outerWidth() + totalDuration * PIXELS_PER_SECOND }, {
                duration: totalDuration * 1000, easing: 'linear',
                step: function(now) {
                    const $container = $('#timeline-tracks-container');
                    const playheadPos = now - $('#track-labels-container').outerWidth();
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
        $('#playSequenceBtn').html(playIcon);
        $('#timeline-playhead').stop();

        if (runnerNode) cc.director.getActionManager().pauseTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;
            if (node.spine) {
                node.spine.pause();
            }
            if (node.armature) {
                node.armature.getAnimation().pause();
            }
            if (node.ui) {
                cc.director.getActionManager().pauseTarget(node.ui);
            }
            cc.director.getActionManager().pauseTarget(node);
        });
    }

    function _onResume() {
        if (!isPlaying || !isPaused) return;
        isPaused = false; sequenceStartTime = Date.now() - pausedTime;
        $('#playSequenceBtn').html(pauseIcon);

        if (runnerNode) cc.director.getActionManager().resumeTarget(runnerNode);
        tracks.forEach(trackData => {
            const node = trackData.node;
            if (node.spine) {
                node.spine.resume();
            }
            if (node.armature) {
                node.armature.getAnimation().resume();
            }
            if (node.ui) {
                cc.director.getActionManager().resumeTarget(node.ui);
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
        $('#playSequenceBtn').html(playIcon);
        $('#timeline-interaction-overlay').hide();
        $('#timeline-playhead').stop();

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
                node.ui.stopAllActions();
            }
            cc.director.getActionManager().resumeTarget(node);
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
                    if (!mainLayerInstance._currentlySelectedNode) { alert("먼저 캔버스에서 애니메이션을 적용할 타겟을 선택하세요."); return; }
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