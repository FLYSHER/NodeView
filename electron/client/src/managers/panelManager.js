var PanelManager = (function() {

    // 애플리케이션에 존재하는 모든 패널의 기본 정보
    const componentRegistry = {
        fileList:   { title: "Assets",      component: 'fileList' },
        widgetTree: { title: "Hierarchy",   component: 'widgetTree' },
        properties: { title: "Properties",  component: 'properties' },
        gameView:   { title: "Game View",   component: 'gameView' },
        uiAnimation:{ title: "Animations",  component: 'uiAnimation' },
        sequencer:  { title: "Sequencer",   component: 'sequencer' },
    };

    // 기본 레이아웃 설정
    const defaultLayoutConfig = {
        content: [{
            type: 'row',
            content: [
                { type: 'column', width: 30, content: [
                        { type: 'component', componentName: 'fileList', title: 'Assets' },
                        { type: 'component', componentName: 'widgetTree', title: 'Hierarchy' },
                        { type: 'component', componentName: 'properties', title: 'Properties' }
                    ]},
                { type: 'column', width: 70, content: [
                        { type: 'component', componentName: 'gameView', title: 'Game View', height: 75 },
                        { type: 'stack', height: 25, minHeight: 250, content: [
                                { type: 'component', componentName: 'uiAnimation', title: 'Animations' },
                                { type: 'component', componentName: 'sequencer', title: 'Sequencer' }
                            ]}
                    ]}
            ]
        }]
    };

    return {
        initialize: function() {
            const layoutArea = $('#panels-container-area');
            layoutArea.empty();

            const finalLayoutConfig = LayoutManager.load() || defaultLayoutConfig;

            const myLayout = new GoldenLayout(finalLayoutConfig, layoutArea);

            // --- 모든 컴포넌트(패널) 등록 (안정적인 function 키워드 사용으로 수정) ---

            myLayout.registerComponent('gameView', function(container, componentState){
                const content = $('#game-canvas-template').children();
                const canvasElement = content.first();
                container.getElement().css({'display': 'flex','justify-content': 'center','align-items': 'center','padding': '0'});
                container.getElement().append(content);
                const resizeCanvas = function() {
                    if (typeof cc === 'undefined' || !cc.view) return;
                    const margin = 20;
                    const w = container.width - margin;
                    const h = container.height - margin;
                    if (!w || !h || w <= 0 || h <= 0) return;
                    let contentW = w, contentH = h, scale = 1;
                    if (contentH < 670) { if (contentH < 400) { scale = 400 / 670; } else { scale = contentH / 670; } contentH = 670; contentW /= scale; } else if (contentH > 1000) { scale = contentH / 1000; contentH = 1000; contentW /= scale; }
                    if (contentW < 1080) { scale = scale * contentW / 1080; contentW = 1080; contentH = h / scale; } else if (contentW > 2700) { contentW = 2700; }
                    canvasElement.attr('width', w).attr('height', h);
                    cc.view.setFrameSize(w, h);
                    cc.view.setDesignResolutionSize(contentW, contentH, cc.ResolutionPolicy.SHOW_ALL);
                    if (cc.eventManager) { cc.eventManager.dispatchCustomEvent("canvas-resize"); }
                };
                setTimeout(resizeCanvas, 0);
                container.on('resize', resizeCanvas);
            });

            myLayout.registerComponent('fileList', function(container, componentState) {
                container.getElement().append($('#original-content-templates').find('#fileContainer').children());
            });

            myLayout.registerComponent('widgetTree', function(container, componentState) {
                container.getElement().append($('#original-content-templates').find('#widgetContainer').children());
            });

            myLayout.registerComponent('properties', function(container, componentState) {
                container.getElement().append($('#original-content-templates').find('#nodeInfoContainer').children());
            });

            myLayout.registerComponent('uiAnimation', function(container, componentState) {
                container.getElement().append($('#original-content-templates').find('#uiAnimationContainer').children());
            });

            myLayout.registerComponent('sequencer', function(container, componentState) {
                container.getElement().append($('#original-content-templates').find('#sequencerContainer').children());
            });

            myLayout.init();

            // --- 오른쪽 위 버튼 기능 구현 ---
            const $dropdown = $('#panel-toggle-dropdown');
            const $toggleButton = $('#panel-toggle-button');

            $dropdown.empty();
            for (const key in componentRegistry) {
                const item = componentRegistry[key];
                $dropdown.append(`<label><input type="checkbox" data-component-type="${item.component}"> ${item.title}</label>`);
            }

            function syncCheckboxes() {
                const openComponents = new Set();
                myLayout.root.getItemsByFilter(item => item.isComponent).forEach(item => {
                    openComponents.add(item.componentName);
                });
                $dropdown.find('input[type="checkbox"]').each(function() {
                    $(this).prop('checked', openComponents.has($(this).data('component-type')));
                });
            }

            $toggleButton.on('click', function(e) {
                e.stopPropagation();
                syncCheckboxes();
                $dropdown.slideToggle(150);
            });
            $(document).on('click', e => { if (!$toggleButton.is(e.target) && $toggleButton.has(e.target).length === 0) $dropdown.slideUp(150); });

            $dropdown.on('change', 'input[type="checkbox"]', function() {
                const componentType = $(this).data('component-type');
                const title = componentRegistry[componentType].title;
                if ($(this).is(':checked')) {
                    if (myLayout.root.getItemsByComponentType(componentType).length === 0) {
                        myLayout.root.contentItems[0].addChild({ type: 'component', componentName: componentType, title: title });
                    }
                } else {
                    myLayout.root.getItemsByComponentType(componentType).forEach(item => item.remove());
                }
            });

            myLayout.on('stateChanged', () => LayoutManager.save(myLayout));
            myLayout.on('itemDestroyed', () => {
                LayoutManager.save(myLayout);
                syncCheckboxes();
            });

            // --- 전체화면 버튼 기능 (생략 없이 모두 복구) ---
            $('#toggle-fullscreen-btn').on('click', function() {
                if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            });

            $(document).on('fullscreenchange webkitfullscreenchange', function() {
                const isFullscreen = !!(document.fullscreenElement || document.webkitFullscreenElement);
                const $icon = $('#toggle-fullscreen-btn').find('i');
                if (isFullscreen) {
                    $icon.removeClass('fa-expand').addClass('fa-compress');
                } else {
                    $icon.removeClass('fa-compress').addClass('fa-expand');
                }
            });

            // --- 패널 리사이즈 시 오버레이 기능 ---
            $(document).on('mousedown', '.lm_splitter', () => $('#resize-overlay').show());
            $(document).on('mouseup', () => { if ($('#resize-overlay').is(':visible')) $('#resize-overlay').hide(); });

            function debounce(func, delay) {
                let timeout;
                return function(...args) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(this, args), delay);
                };
            }

            // myLayout.updateSize 함수를 디바운스 처리
            const debouncedResize = debounce(function() {
                if (myLayout) {
                    myLayout.updateSize();
                }
            }, 150); // 150ms 딜레이

            // window의 resize 이벤트에 디바운스 처리된 함수를 연결
            $(window).on('resize', debouncedResize);
        }
    };
})();