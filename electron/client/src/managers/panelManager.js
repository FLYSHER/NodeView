var PanelManager = (function() {

    const componentRegistry = {
        fileList:   { title: "Assets",      component: 'fileList' },
        widgetTree: { title: "Hierarchy",   component: 'widgetTree' },
        properties: { title: "Inspector",   component: 'properties' },
        gameView:   { title: "Game View",   component: 'gameView' },
        sequencer:  { title: "Animation · Sequencer", component: 'sequencer' },
        dependencies: { title: "Dependencies", component: 'dependencies' },
        console:    { title: "Console",     component: 'console' },
    };

    const defaultLayoutConfig = {
        content: [{
            type: 'row',
            // 왼쪽 Assets/Hierarchy · 가운데 Game View + 하단 탭 · 오른쪽 Inspector
            content: [
                { type: 'column', width: 19, content: [
                        { type: 'component', componentName: 'fileList', title: 'Assets', height: 45 },
                        { type: 'component', componentName: 'widgetTree', title: 'Hierarchy', height: 55 }
                    ]},
                { type: 'column', width: 59, content: [
                        { type: 'component', componentName: 'gameView', title: 'Game View', height: 70 },
                        { type: 'stack', height: 30, minHeight: 250, content: [
                                { type: 'component', componentName: 'sequencer', title: 'Animation · Sequencer' },
                                { type: 'component', componentName: 'console', title: 'Console' },
                                { type: 'component', componentName: 'dependencies', title: 'Dependencies' }
                            ]}
                    ]},
                { type: 'component', componentName: 'properties', title: 'Inspector', width: 22 }
            ]
        }]
    };

    const LAYOUT_VERSION_KEY = 'layoutVersion';
    const LAYOUT_VERSION = '2';   // 2: Inspector 를 오른쪽 열로

    const RESOLUTION_KEY = 'gameViewResolution';
    let manualResolution = null;   // { width, height } 또는 null(자동: 패널 크기)
    try {
        const saved = JSON.parse(localStorage.getItem(RESOLUTION_KEY));
        if (saved && saved.width > 0 && saved.height > 0) manualResolution = { width: saved.width, height: saved.height };
    } catch (e) { }
    let _layout = null;

    // 새로 추가된 패널을 예전에 저장된 레이아웃에도 한 번만 넣어준다
    function _addNewPanelsToSavedLayout(myLayout) {
        const newPanels = ['dependencies', 'console'];
        newPanels.forEach(function (name) {
            const flagKey = 'layoutPanelAdded.' + name;
            if (localStorage.getItem(flagKey)) return;
            localStorage.setItem(flagKey, '1');
            if (myLayout.root.getItemsByFilter(item => item.isComponent && item.componentName === name).length > 0) return;
            // 추가된 탭이 기존에 보던 탭을 가리지 않도록 원래 활성 탭을 되돌린다
            const stack = myLayout.root.getItemsByFilter(item => item.isStack)
                .filter(st => st.contentItems.some(ci => ci.componentName === 'sequencer'))[0];
            const prevActive = stack ? stack.getActiveContentItem() : null;
            _addComponent(myLayout, name);
            if (stack && prevActive) stack.setActiveContentItem(prevActive);
        });
    }

    // 저장된 레이아웃에서 특정 컴포넌트를 제거 (Resource View 탭은 리소스가 다시 로드되지 않으므로 복원하지 않는다)
    function _stripComponents(config, componentName) {
        if (!config) return config;
        const strip = function (item) {
            if (!item.content) return;
            item.content = item.content.filter(child => !(child.type === 'component' && child.componentName === componentName));
            if (typeof item.activeItemIndex === 'number' && item.activeItemIndex >= item.content.length) {
                item.activeItemIndex = Math.max(0, item.content.length - 1);
            }
            item.content.forEach(strip);
            // 컴포넌트를 빼서 비어 버린 스택/행/열은 함께 제거
            item.content = item.content.filter(child => child.type === 'component' || (child.content && child.content.length > 0));
            if (typeof item.activeItemIndex === 'number' && item.activeItemIndex >= item.content.length) {
                item.activeItemIndex = Math.max(0, item.content.length - 1);
            }
        };
        strip(config);
        return config;
    }

    // 저장된 레이아웃 보정: 예전 'Sequencer' 탭 제목을 새 이름으로 (Animations 패널은 Sequencer 안으로 합쳐짐)
    function _migrateLayout(config) {
        if (!config || !config.content || config.content.length === 0) return null;   // 비었으면 기본 레이아웃
        const walk = function (item) {
            if (item.type === 'component' && componentRegistry[item.componentName]) {
                item.title = componentRegistry[item.componentName].title;
            }
            (item.content || []).forEach(walk);
        };
        walk(config);
        return config;
    }

    function _addComponent(myLayout, name) {
        const componentConfig = { type: 'component', componentName: name, title: componentRegistry[name].title };
        // Sequencer 가 있는 스택 → 아무 스택 → 루트 순서로 넣는다
        const sequencer = myLayout.root.getItemsByFilter(item => item.isComponent && item.componentName === 'sequencer')[0];
        const stack = (sequencer && sequencer.parent && sequencer.parent.isStack) ? sequencer.parent
            : myLayout.root.getItemsByFilter(item => item.isStack)[0];
        if (stack) {
            stack.addChild(componentConfig);
        } else {
            myLayout.root.contentItems[0].addChild(componentConfig);
        }
    }

    function _registerComponents(myLayout) {
        myLayout.registerComponent('gameView', function(container, componentState){
            const content = $('#game-canvas-template').children();
            const canvasElement = content.first();
            // 위: 도구 모음 / 아래: 캔버스 영역 (+ 왼쪽 아래 통계)
            const $toolbar = $('<div class="gv-toolbar" role="toolbar" aria-label="Game View 도구"></div>');
            const $viewport = $('<div class="gv-viewport"></div>');
            const $stats = $('<div class="gv-stats" aria-live="off"></div>');
            container.getElement().addClass('gameview-panel').append($toolbar, $viewport);
            $viewport.append(content, $stats);
            GameViewTools.mount($toolbar[0], $stats[0]);

            const resizeCanvas = function() {
                if (typeof cc === 'undefined' || !cc.view) return;

                const margin = 20;
                const toolbarH = $toolbar.outerHeight() || 34;
                const panelW = container.width - margin;
                const panelH = container.height - toolbarH - margin;
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

            container.on('setManualResolution', function() {
                resizeCanvas();
            });

            // 패널 크기가 바뀌어도 선택한 해상도는 유지한다 (자동일 때만 패널 크기를 따른다)
            container.on('resize', function() {
                resizeCanvas();
            });

            setTimeout(resizeCanvas, 0);
        });

        myLayout.registerComponent('fileList', function(container, componentState) {
            // 상단 검색·필터는 고정하고 목록만 스크롤
            container.getElement().attr('id', 'assets-panel-drop-zone').addClass('assets-panel');
            // 탭 제목 옆에 "N 에셋 · M 리소스"
            container.on('tab', function (tab) {
                tab.element.find('.assets-tab-count').remove();
                tab.element.find('.lm_title').after('<span class="lm_tab_count assets-tab-count"></span>');
                if (window.MainLayerInstance) window.MainLayerInstance.refreshAssetsPanel();
            });
            container.getElement().append($('#original-content-templates').find('#fileContainer').children());
        });
        myLayout.registerComponent('widgetTree', function(container, componentState) {
            // 상단 검색과 하단 uiWidgets 복사는 고정하고 트리만 스크롤
            container.getElement().addClass('hierarchy-panel').append($('#original-content-templates').find('#widgetContainer').children());
        });
        myLayout.registerComponent('properties', function(container, componentState) {
            // 헤더(이름/클래스)는 고정하고 Inspector 본문만 스크롤
            container.getElement().addClass('properties-panel').append($('#original-content-templates').find('#nodeInfoContainer').children());
        });
        myLayout.registerComponent('sequencer', function(container, componentState) {
            // 왼쪽 애니메이션 목록 + 오른쪽 타임라인
            container.getElement().addClass('sequencer-panel').append($('#original-content-templates').find('#sequencerContainer').children());
        });
        myLayout.registerComponent('resourceView', function(container, componentState) {
            new ResourceView.Viewer(container, componentState || {});
        });
        myLayout.registerComponent('console', function(container, componentState) {
            ConsolePanel.mount(container);
        });
        myLayout.registerComponent('dependencies', function(container, componentState) {
            const panel = $('<div id="dependencies-panel" class="dependencies-panel"></div>').appendTo(container.getElement());
            DependenciesPanel.mount(panel[0]);
        });
    }

    return {
        initialize: function () {
            const layoutArea = $('#panels-container-area');
            layoutArea.empty();
            // 기본 배치가 바뀐 버전에서는 저장된 배치 대신 새 기본 배치를 한 번 적용한다
            let savedConfig = LayoutManager.load();
            if (localStorage.getItem(LAYOUT_VERSION_KEY) !== LAYOUT_VERSION) {
                savedConfig = null;
                localStorage.setItem(LAYOUT_VERSION_KEY, LAYOUT_VERSION);
            }
            const finalLayoutConfig = _migrateLayout(_stripComponents(_stripComponents(savedConfig, 'resourceView'), 'uiAnimation')) || defaultLayoutConfig;
            const myLayout = new GoldenLayout(finalLayoutConfig, layoutArea);

            _registerComponents(myLayout);
            myLayout.init();
            _layout = myLayout;
            _addNewPanelsToSavedLayout(myLayout);

            const DEFAULT_BG_COLOR = '#323232';
            const savedColor = localStorage.getItem('backgroundColor') || DEFAULT_BG_COLOR;

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

                    if (typeof ElectronRenderer !== 'undefined') {
                        ElectronRenderer.handleDrop(e);
                    } else {
                        if (typeof Loader !== 'undefined' && Loader.onDropHandler) {
                            console.log("Web Mode: Calling onDropHandler");
                            Loader.onDropHandler(e);
                        }
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

            $('#layout-reset-btn').on('click', function () {
                if (!window.confirm('패널 배치를 기본값으로 되돌릴까요? (로드한 에셋은 다시 불러와야 합니다)')) return;
                localStorage.removeItem('golden-layout-config');
                window.location.reload();
            });

            $(document).on('click', e => {
                if (!$toggleButton.is(e.target) && !$dropdown.is(e.target) && $dropdown.has(e.target).length === 0) $dropdown.slideUp(150);
            });
            myLayout.on('stateChanged', () => LayoutManager.save(myLayout));
            myLayout.on('itemDestroyed', () => {
                LayoutManager.save(myLayout);
                syncCheckboxes();
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

            StatusBar.init();

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
        },

        // 리소스 파일을 Game View 옆 탭으로 연다 (이미 열려 있으면 그 탭을 앞으로)
        openResource: function (fileName, kind, selectName) {
            if (!_layout || !ResourceView.canOpen(kind)) return;
            const existing = _layout.root.getItemsByFilter(i => i.isComponent && i.componentName === 'resourceView' &&
                i.config.componentState && i.config.componentState.fileName === fileName)[0];
            if (existing) {
                existing.parent.setActiveContentItem(existing);
                const viewer = ResourceView.getViewer(fileName);
                if (viewer && selectName) setTimeout(function () { viewer.selectByName(selectName); }, 0);
                return;
            }
            const title = ResourceView.KIND_LABEL[kind] + ' · ' + $('<div>').text(fileName).html();
            const config = { type: 'component', componentName: 'resourceView', title: title, componentState: { fileName: fileName, kind: kind, select: selectName || null } };
            const gameView = _layout.root.getItemsByFilter(i => i.isComponent && i.componentName === 'gameView')[0];
            if (gameView && gameView.parent && gameView.parent.isStack) {
                gameView.parent.addChild(config);
            } else {
                const stack = _layout.root.getItemsByFilter(i => i.isStack)[0];
                (stack || _layout.root.contentItems[0]).addChild(config);
            }
        },

        // Game View 디자인 해상도: (w, h) 지정, (null, null) 이면 자동(패널 크기)
        setResolution: function (w, h) {
            manualResolution = (w > 0 && h > 0) ? { width: w, height: h } : null;
            try {
                if (manualResolution) localStorage.setItem(RESOLUTION_KEY, JSON.stringify(manualResolution));
                else localStorage.removeItem(RESOLUTION_KEY);
            } catch (e) { }
            if (!_layout) return;
            const gameView = _layout.root.getItemsByFilter(i => i.isComponent && i.componentName === 'gameView')[0];
            if (gameView) gameView.container.emit('setManualResolution');
        },
        getResolution: function () {
            return manualResolution ? { width: manualResolution.width, height: manualResolution.height } : null;
        },

        // 패널을 앞으로 가져온다 (닫혀 있으면 다시 연다)
        showComponent: function (name) {
            if (!_layout || !componentRegistry[name]) return;
            let item = _layout.root.getItemsByFilter(i => i.isComponent && i.componentName === name)[0];
            if (!item) {
                _addComponent(_layout, name);
                item = _layout.root.getItemsByFilter(i => i.isComponent && i.componentName === name)[0];
            }
            if (item && item.parent && item.parent.isStack) {
                item.parent.setActiveContentItem(item);
            }
        }
    };
})();