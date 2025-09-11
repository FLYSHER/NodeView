var PanelManager = (function() {

    const componentRegistry = {
        fileList:   { title: "Assets",      component: 'fileList' },
        widgetTree: { title: "Hierarchy",   component: 'widgetTree' },
        properties: { title: "Properties",  component: 'properties' },
        gameView:   { title: "Game View",   component: 'gameView' },
        uiAnimation:{ title: "Animations",  component: 'uiAnimation' },
        sequencer:  { title: "Sequencer",   component: 'sequencer' },
    };

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

    let manualResolution = null;

    function _registerComponents(myLayout) {
        myLayout.registerComponent('gameView', function(container, componentState){
            const content = $('#game-canvas-template').children();
            const canvasElement = content.first();
            container.getElement().css({'display': 'flex','justify-content': 'center','align-items': 'center','padding': '0'});
            container.getElement().append(content);

            const resizeCanvas = function() {
                if (typeof cc === 'undefined' || !cc.view) return;

                const margin = 20;
                const panelW = container.width - margin;
                const panelH = container.height - margin;
                if (!panelW || !panelH || panelW <= 0 || panelH <= 0) return;

                const designW = manualResolution ? manualResolution.width : panelW;
                const designH = manualResolution ? manualResolution.height : panelH;

                let contentW = designW, contentH = designH, scale = 1;
                if (contentH < 670) { if (contentH < 400) { scale = 400 / 670; } else { scale = contentH / 670; } contentH = 670; contentW /= scale; } else if (contentH > 1000) { scale = contentH / 1000; contentH = 1000; contentW /= scale; }
                if (contentW < 1080) { scale = scale * contentW / 1080; contentW = 1080; contentH = designH / scale; } else if (contentW > 2700) { contentW = 2700; }

                canvasElement.attr('width', panelW).attr('height', panelH);
                cc.view.setFrameSize(panelW, panelH);
                cc.view.setDesignResolutionSize(contentW, contentH, cc.ResolutionPolicy.SHOW_ALL);
                if (cc.eventManager) { cc.eventManager.dispatchCustomEvent("canvas-resize"); }
            };

            container.on('setManualResolution', function(w, h) {
                manualResolution = (w && h) ? { width: w, height: h } : null;
                resizeCanvas();
            });

            container.on('resize', function() {
                manualResolution = null;
                $('#res-width-input, #res-height-input').val('');
                resizeCanvas();
            });

            setTimeout(resizeCanvas, 0);
        });

        myLayout.registerComponent('fileList', function(container, componentState) {
            container.getElement().attr('id', 'assets-panel-drop-zone');
            container.getElement().append($('#original-content-templates').find('#fileContainer').children());
        });
        myLayout.registerComponent('widgetTree', function(container, componentState) { container.getElement().append($('#original-content-templates').find('#widgetContainer').children()); });
        myLayout.registerComponent('properties', function(container, componentState) { container.getElement().append($('#original-content-templates').find('#nodeInfoContainer').children()); });
        myLayout.registerComponent('uiAnimation', function(container, componentState) { container.getElement().append($('#original-content-templates').find('#uiAnimationContainer').children()); });
        myLayout.registerComponent('sequencer', function(container, componentState) { container.getElement().append($('#original-content-templates').find('#sequencerContainer').children()); });
    }

    return {
        initialize: function () {
            const layoutArea = $('#panels-container-area');
            layoutArea.empty();
            const finalLayoutConfig = LayoutManager.load() || defaultLayoutConfig;
            const myLayout = new GoldenLayout(finalLayoutConfig, layoutArea);

            _registerComponents(myLayout);
            myLayout.init();

            const DEFAULT_BG_COLOR = '#323232';
            const savedColor = localStorage.getItem('backgroundColor') || DEFAULT_BG_COLOR;

            $('#bg-color-picker').val(savedColor);

            setTimeout(function() {
                if (cc && cc.eventManager) {
                    cc.eventManager.dispatchCustomEvent('background_color_changed', savedColor);
                }
            }, 0);

            window.addEventListener('dragover', function (e) {
                e.preventDefault();
                const assetsPanel = document.getElementById('assets-panel-drop-zone');
                if (!assetsPanel) return;
                const rect = assetsPanel.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    assetsPanel.classList.add('drag-over-active');
                } else {
                    assetsPanel.classList.remove('drag-over-active');
                }
            }, false);

            window.addEventListener('dragleave', function (e) {
                if (!e.relatedTarget) {
                    const assetsPanel = document.getElementById('assets-panel-drop-zone');
                    if (assetsPanel) {
                        assetsPanel.classList.remove('drag-over-active');
                    }
                }
            }, false);

            window.addEventListener('drop', function (e) {
                e.preventDefault();
                const assetsPanel = document.getElementById('assets-panel-drop-zone');
                if (!assetsPanel) return;
                const rect = assetsPanel.getBoundingClientRect();
                assetsPanel.classList.remove('drag-over-active');
                if (e.clientX >= rect.left && e.clientX <= rect.right &&
                    e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    if (typeof Loader !== 'undefined' && Loader.onDropHandler) {
                        Loader.onDropHandler(e);
                    }
                }
            }, false);

            const $dropdown = $('#panel-toggle-dropdown');
            const $toggleButton = $('#panel-toggle-button');
            $dropdown.empty();
            for (const key in componentRegistry) {
                $dropdown.append(`<label><input type="checkbox" data-component-type="${componentRegistry[key].component}"> ${componentRegistry[key].title}</label>`);
            }

            function syncCheckboxes() {
                const openComponents = new Set();
                myLayout.root.getItemsByFilter(item => item.isComponent).forEach(item => {
                    openComponents.add(item.componentName);
                });
                $dropdown.find('input[type="checkbox"]').each(function () {
                    $(this).prop('checked', openComponents.has($(this).data('component-type')));
                });
            }

            $toggleButton.on('click', (e) => {
                e.stopPropagation();
                syncCheckboxes();
                $dropdown.slideToggle(150);
            });

            $dropdown.on('change', 'input[type="checkbox"]', function () {
                const componentType = $(this).data('component-type');
                const existingItems = myLayout.root.getItemsByFilter(item => item.isComponent && item.componentName === componentType);
                if ($(this).is(':checked')) {
                    if (existingItems.length === 0) {
                        const componentConfig = {
                            type: 'component',
                            componentName: componentType,
                            title: componentRegistry[componentType].title
                        };
                        const firstStack = myLayout.root.getItemsByFilter(item => item.isStack)[0];
                        if (firstStack) {
                            firstStack.addChild(componentConfig);
                        } else {
                            myLayout.root.contentItems[0].addChild(componentConfig);
                        }
                    }
                } else {
                    existingItems.forEach(item => item.remove());
                }
            });

            $('#res-apply-btn').on('click', function () {
                const w = parseInt($('#res-width-input').val(), 10);
                const h = parseInt($('#res-height-input').val(), 10);
                if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
                    const gameViewItems = myLayout.root.getItemsByFilter(item => item.isComponent && item.componentName === 'gameView');
                    if (gameViewItems.length > 0) {
                        gameViewItems[0].container.emit('setManualResolution', w, h);
                    }
                }
            });

            $('#bg-color-picker').on('input', function() {
                const newColor = $(this).val();
                localStorage.setItem('backgroundColor', newColor);
                if (cc && cc.eventManager) {
                    cc.eventManager.dispatchCustomEvent('background_color_changed', newColor);
                }
            });

            $(document).on('click', e => {
                if (!$toggleButton.is(e.target) && !$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) $dropdown.slideUp(150);
            });
            myLayout.on('stateChanged', () => LayoutManager.save(myLayout));
            myLayout.on('itemDestroyed', () => {
                LayoutManager.save(myLayout);
                syncCheckboxes();
            });

            $('#main-menu-toggle-btn').on('click', function () {
                $(this).toggleClass('is-active');
                $('.toggleable-control').toggle('slide', {
                    direction: 'right'
                }, 150);
            });

            $('#toggle-fullscreen-btn').on('click', function () {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) document.exitFullscreen();
                }
            });
            $(document).on('fullscreenchange webkitfullscreenchange', function () {
                const isFullscreen = !!document.fullscreenElement;
                $('#toggle-fullscreen-btn').find('i').toggleClass('fa-compress', isFullscreen).toggleClass('fa-expand', !isFullscreen);
            });

            $(document).on('mousedown', '.lm_splitter', () => $('#resize-overlay').show());
            $(document).on('mouseup', () => {
                if ($('#resize-overlay').is(':visible')) $('#resize-overlay').hide();
            });

            function debounce(func, delay) {
                let timeout;
                return function (...args) {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(this, args), delay);
                };
            }
            const debouncedResize = debounce(() => {
                if (myLayout) myLayout.updateSize();
            }, 150);
            $(window).on('resize', debouncedResize);
        }
    };
})();