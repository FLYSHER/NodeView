var PanelManager = (function() {

    // --- Private Members ---

    const panelLayoutConfig = {
        gameView:   { id: "panel-game-view",   title: "Game View",      left: 470, top: 20,  width: 800, height: 600, visible: true },
        fileList:   { id: "panel-file-list",   title: "Assets",      left: 20,  top: 20,  width: 430, height: 200, visible: true },
        widgetTree: { id: "panel-widget-tree", title: "Hierarchy",         left: 20,  top: 240, width: 430, height: 280, visible: true },
        properties: { id: "panel-properties",  title: "Properties",     left: 20,  top: 540, width: 430, height: 240, visible: true },
        uiAnimation:{ id: "panel-ui-animation",title: "Animations",   left: 470, top: 640, width: 395, height: 140, visible: false },
        sequencer:  { id: "panel-sequencer",   title: "Sequencer",      left: 885, top: 640, width: 385, height: 140, visible: false },
    };

    function handleSmartSnap(ui, currentElement, isResizing = false) {
        const $guideV = $('.vertical-guide');
        const $guideH = $('.horizontal-guide');
        $guideV.hide(); $guideH.hide();
        const $this = $(currentElement);
        const originalPos = $this.data('originalPosition');
        const originalSize = $this.data('originalSize');
        let newPos = { left: ui.position.left, top: ui.position.top };
        let newSize = isResizing ? { width: ui.size.width, height: ui.size.height } : { width: $this.outerWidth(), height: $this.outerHeight() };
        const currentRect = { left: newPos.left, top: newPos.top, width: newSize.width, height: newSize.height };
        currentRect.right = currentRect.left + currentRect.width;
        currentRect.bottom = currentRect.top + currentRect.height;
        let snappedV = false, snappedH = false;
        let activeHandle = isResizing ? $this.data('activeHandle') : null;
        const alignmentTolerance = 6;
        $('.draggable-panel:visible').not(currentElement).each(function() {
            const target = $(this);
            const targetPos = target.position();
            const tRect = { left: targetPos.left, top: targetPos.top, width: target.outerWidth(), height: target.outerHeight() };
            tRect.right = tRect.left + tRect.width; tRect.bottom = tRect.top + tRect.height;
            if (!snappedV) {
                const vSnapPoints = [ { cEdge: currentRect.left, tEdge: tRect.left, handleMatch: ['w', 'nw', 'sw'] }, { cEdge: currentRect.left, tEdge: tRect.right, handleMatch: ['w', 'nw', 'sw'] }, { cEdge: currentRect.right, tEdge: tRect.left, handleMatch: ['e', 'ne', 'se'] }, { cEdge: currentRect.right, tEdge: tRect.right, handleMatch: ['e', 'ne', 'se'] } ];
                for (const p of vSnapPoints) {
                    if (isResizing && activeHandle && !p.handleMatch.some(h => activeHandle.includes(h))) continue;
                    if (Math.abs(p.cEdge - p.tEdge) < alignmentTolerance) {
                        if (isResizing) { if (activeHandle.includes('w')) { newPos.left = p.tEdge; newSize.width = originalPos.left + originalSize.width - newPos.left; } else if (activeHandle.includes('e')) { newSize.width = p.tEdge - originalPos.left; } } else { newPos.left = p.tEdge - (p.cEdge - currentRect.left); }
                        $guideV.css({left: p.tEdge, top: Math.min(currentRect.top, tRect.top)-10, height: Math.max(currentRect.bottom, tRect.bottom) - Math.min(currentRect.top, tRect.top) + 20 }).show();
                        snappedV = true; break;
                    }
                }
            }
            if (!snappedH) {
                const hSnapPoints = [ { cEdge: currentRect.top, tEdge: tRect.top, handleMatch: ['n', 'nw', 'ne'] }, { cEdge: currentRect.top, tEdge: tRect.bottom, handleMatch: ['n', 'nw', 'ne'] }, { cEdge: currentRect.bottom, tEdge: tRect.top, handleMatch: ['s', 'sw', 'se'] }, { cEdge: currentRect.bottom, tEdge: tRect.bottom, handleMatch: ['s', 'sw', 'se'] } ];
                for (const p of hSnapPoints) {
                    if (isResizing && activeHandle && !p.handleMatch.some(h => activeHandle.includes(h))) continue;
                    if (Math.abs(p.cEdge - p.tEdge) < alignmentTolerance) {
                        if (isResizing) { if (activeHandle.includes('n')) { newPos.top = p.tEdge; newSize.height = originalPos.top + originalSize.height - newPos.top; } else if (activeHandle.includes('s')) { newSize.height = p.tEdge - originalPos.top; } } else { newPos.top = p.tEdge - (p.cEdge - currentRect.top); }
                        $guideH.css({top: p.tEdge, left: Math.min(currentRect.left, tRect.left)-10, width: Math.max(currentRect.right, tRect.right) - Math.min(currentRect.left, tRect.left) + 20 }).show();
                        snappedH = true; break;
                    }
                }
            }
            if (snappedV && snappedH && !isResizing) return false;
        });
        ui.position.left = newPos.left; ui.position.top = newPos.top;
        if (isResizing) { ui.size.width = Math.max(newSize.width, $this.resizable("option", "minWidth")); ui.size.height = Math.max(newSize.height, $this.resizable("option", "minHeight")); }
    }

    return {
        config: panelLayoutConfig,

        initialize: function() {
            const layoutArea = $('#panels-container-area');
            const dropdownMenu = $('#panel-toggle-dropdown');
            layoutArea.find('.draggable-panel').remove();
            dropdownMenu.empty();

            for (const key in panelLayoutConfig) {
                const config = panelLayoutConfig[key];
                const panelHtml = `<div id="${config.id}" class="draggable-panel" style="left:${config.left}px; top:${config.top}px; width:${config.width}px; height:${config.height}px;"><div class="panel-header"><span class="panel-title-text">${config.title}</span><span class="drag-handle-visual"><i class="fas fa-arrows-alt"></i></span></div><div class="panel-content"></div></div>`;
                const $panel = $(panelHtml);
                $panel.data('config-key', key);

                if (config.id === 'panel-game-view') {
                    $panel.find('.panel-content').append($('#gameCanvas'));
                    $panel.find('.panel-content').css({
                        'padding': '0',
                        'overflow': 'auto',
                        'background-color': '#202020',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center'
                    });
                } else if (config.id === 'panel-file-list') {
                    $panel.find('.panel-content').append($('#fileContainer').children());
                } else if (config.id === 'panel-widget-tree') {
                    $panel.find('.panel-content').append($('#widgetContainer').children());
                } else if (config.id === 'panel-properties') {
                    $panel.find('.panel-content').append($('#nodeInfoContainer').children());
                } else if (config.id === 'panel-ui-animation') {
                    $panel.find('.panel-content').append($('#uiAnimationContainer').children());
                } else if (config.id === 'panel-sequencer') {
                    $panel.find('.panel-content').append($('#sequencerContainer').children());
                }

                if (!config.visible) { $panel.hide(); }
                layoutArea.append($panel);
                dropdownMenu.append(`<label><input type="checkbox" data-panel-id="${config.id}" ${config.visible ? 'checked' : ''}> ${config.title}</label>`);
            }

            $(".draggable-panel").draggable({
                handle: ".panel-header", containment: "#panels-container-area", stack: ".draggable-panel",
                start: function() { $('body').addClass('is-interacting'); $('#resize-overlay').show(); },
                drag: function(event, ui) { handleSmartSnap(ui, this); },
                stop: function() { $('body').removeClass('is-interacting'); $('.vertical-guide, .horizontal-guide').hide(); $('#resize-overlay').hide(); LayoutManager.save(); }
            }).resizable({
                handles: "n, e, s, w, ne, nw, se, sw", minHeight: 100, minWidth: 200, containment: "#panels-container-area",
                start: function(event, ui) {
                    $('body').addClass('is-interacting');
                    $(this).data('originalPosition', $.extend({}, ui.originalPosition));
                    $(this).data('originalSize', $.extend({}, ui.originalSize));
                    $(this).data('activeHandle', ui.helper.data('ui-resizable').axis);
                    $('#resize-overlay').show();
                },
                resize: function(event, ui) { handleSmartSnap(ui, this, true); },
                stop: function(event, ui) {
                    $('body').removeClass('is-interacting');
                    $('.vertical-guide, .horizontal-guide').hide();
                    $(this).removeData('originalPosition').removeData('originalSize').removeData('activeHandle');
                    $('#resize-overlay').hide();
                    if (ui.element.attr('id') === 'panel-game-view') {
                        GameViewManager.sync();
                    }
                    LayoutManager.save();
                }
            });

            // 오른쪽 위 버튼

            // '패널 목록' 버튼 클릭 시 드롭다운 토글 (기존 기능 유지)
            $('#panel-toggle-button').on('click', function(e) {
                e.stopPropagation();
                $('#panel-toggle-dropdown').slideToggle(150);
            });

            // '패널 목록' 드롭다운 외부 클릭 시 닫기 (기존 기능 유지)
            $(document).on('click', function(e) {
                const $dropdownContainer = $('#panel-toggle-menu-container');
                if (!$dropdownContainer.is(e.target) && $dropdownContainer.has(e.target).length === 0) {
                    $('#panel-toggle-dropdown').slideUp(150);
                }
            });

            // 각 패널 체크박스 변경 시 패널 on/off (기존 기능 유지)
            $('#panel-toggle-dropdown').on('change', 'input[type="checkbox"]', function() {
                $('#' + $(this).data('panel-id')).toggle($(this).is(':checked'));
                // LayoutManager.save(); // 필요 시 주석 해제
            });

            // 새로운 햄버거 버튼 클릭 이벤트 (주변 컨트롤 토글)
            $('#main-menu-toggle-btn').on('click', function() {
                $(this).toggleClass('is-active'); // 클릭된 버튼 자신에게 is-active 클래스를 추가/제거
                $('.toggleable-control').toggle('slide', { direction: 'right' }, 150);
            });
        }
    };
})();