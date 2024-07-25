const fs = require('fs');
const path=  require('path');

const Renderer_layout = {
    init : function () {
        this._initCocosViewGridLineHandler();
        this._initLogGridLineHandler();
        this._initHAGridLineHandler();
        this._initInspectorGridLineHandler();
    },

    getConfigPath : function () {
        const isService = this._rootPath && process.env.NODE_ENV !== 'development';
        const isMacOs = process.platform === 'darwin';

        const rootPath = isService ? path.dirname(this._rootPath) : __dirname;
        const configPath = isService ? (isMacOs ? path.join('client', 'config.json') : path.join('..', 'client', 'config.json')) : 'config.json';

        return path.join(rootPath, configPath);
    },

    loadConfig : function () {
        const configPath = this.getConfigPath();
        try {
            const configData = fs.readFileSync(configPath, 'utf-8');
            return JSON.parse(configData);
        } catch(error) {
            cc.warn("failed to load config data", error);
            return null;
        }
    },

    setRootPath: function(path) {
        this._rootPath = path;
    },

    saveConfig : function (config) {
        const configPath = this.getConfigPath();
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    },

    _adjustConfig : function ( reset ) {
        const config = this.loadConfig();
        let layoutOption = config ? config.layout_option : null;

        if ( reset ) {
            layoutOption = config.backup.layout_option;
            config.layout_option = layoutOption;
            this.saveConfig(config);
        }

        const hierarchy = document.getElementById('hierarchy_gridItem');
        const assets = document.getElementById('assets_gridItem');

        const logView = document.getElementById('log_gridItem');
        const secondColumn = document.getElementById('second_column');
        const inspector = document.getElementById('inspector_gridItem');

        const gridContainer = document.getElementById('grid_container');

        if (layoutOption) {
            hierarchy.style.height = layoutOption.hierarchy_gridItem.height;
            assets.style.height = layoutOption.assets_gridItem.height;

            logView.style.height = layoutOption.log_gridItem.height;
            secondColumn.style.height = layoutOption.second_column.height;
            inspector.style.height = layoutOption.inspector_gridItem.height;

            const cocosViewWidth = (gridContainer.clientWidth * layoutOption.grid_container.grid_template_column.split(' ')[0].replace('fr', '') / 5).toFixed(2);
            cc.view.setFrameSize(cocosViewWidth, cc.view.getFrameSize().height);
            cc.view._adjustSizeKeepCanvasSize();

            Renderer_timeline.handleContentSize(cocosViewWidth);
            gridContainer.style.gridTemplateColumns = layoutOption.grid_container.grid_template_column;
        }
    },

    reload : function () {
        this._adjustConfig( false );
    },

    reset : function () {
        this._adjustConfig( true );
    },

    _initCocosViewGridLineHandler : function () {
        const gridLine = document.getElementById('cocosView_gridLine');
        const cocosViewGridItem = document.getElementById('cocosView_gridItem');
        const parentDiv = document.getElementById('grid_container');


        gridLine.addEventListener('mouseenter', function (event) {
            gridLine.style.cursor = 'col-resize';
        });

        gridLine.addEventListener('mouseleave', function (event) {
            gridLine.style.cursor = 'auto';
        });

        gridLine.addEventListener('mousedown', function (event) {
            document.body.style.cursor = 'col-resize';
            cc._canvas.style.pointerEvents = 'none';
            Genie.LayoutController.startCocosLineDrag();
            const startX = event.clientX;
            const startWidth = parseFloat(window.getComputedStyle(cocosViewGridItem).width);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'auto';
                cc._canvas.style.pointerEvents = 'auto';
                Genie.LayoutController.endCocosLineDrag();
            });

            function handleDrag(event) {
                if (Genie.LayoutController.isCocosLineDrag()) {
                    const deltaX = event.clientX - startX;
                    const newWidth = startWidth + deltaX;

                    const MAX_FR = 5;
                    const width = (newWidth / parentDiv.clientWidth * MAX_FR).toFixed(2);
                    const other = MAX_FR - width;

                    const prevWidth = parseFloat(parentDiv.style.gridTemplateColumns.split(' ')[0].replace('fr', ''));
                    const prevOther = MAX_FR - prevWidth;

                    const cocosViewWidth = width + 'fr';
                    const newSecondColumnWidth = (parseFloat(parentDiv.style.gridTemplateColumns.split(' ')[2].replace('fr', '')) * other / prevOther).toFixed(2);
                    const secondColumnWidth = newSecondColumnWidth + 'fr'
                    const inspectorWidth = (other - newSecondColumnWidth).toFixed(2) + 'fr';

                    if (1.9 <= width && width <= 3.7) {
                        if (newWidth >= parentDiv.clientHeight * 0.65 / ScreenUtil.minWHRatio) {
                            cc.view.setFrameSize(newWidth, cc.view.getFrameSize().height);
                            cc.view._adjustSizeKeepCanvasSize();

                            Renderer_timeline.handleContentSize(newWidth);
                            parentDiv.style.gridTemplateColumns = cocosViewWidth + ' auto ' + secondColumnWidth + ' auto ' + inspectorWidth;
                        }
                    }
                }
            }
        });
    },

    _initLogGridLineHandler : function () {
        const gridLine = document.getElementById('log_gridLine');
        const secondColumn = document.getElementById('second_column');
        const inspector = document.getElementById('inspector_gridItem');
        const logView = document.getElementById('log_gridItem');
        const parentDiv = document.getElementById('grid_container');

        gridLine.addEventListener('mouseenter', function (event) {
            gridLine.style.cursor = 'row-resize';
        });

        gridLine.addEventListener('mouseleave', function (event) {
            gridLine.style.cursor = 'auto';
        });

        gridLine.addEventListener('mousedown', function (event) {
            document.body.style.cursor = 'row-resize';
            Genie.LayoutController.startLogLineDrag();
            const startY = event.clientY;
            const startHeight = parseFloat(window.getComputedStyle(logView).height);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'auto';
                Genie.LayoutController.endLogLineDrag();
            });

            function handleDrag(event) {
                if (Genie.LayoutController.isLogLineDrag()) {
                    const deltaY = startY - event.clientY;
                    const newHeight = startHeight + deltaY;

                    const height = ((newHeight / parentDiv.clientHeight) * 97).toFixed(2);
                    const logViewHeight = height + 'vh';
                    const secondColumnHeight = (97 - height).toFixed(2) + 'vh';
                    const inspectorHeight = (97 - height + 0.2).toFixed(2) + 'vh';

                    if (0 <= height && height <= 97) {
                        logView.style.height = logViewHeight;
                        secondColumn.style.height = secondColumnHeight;
                        inspector.style.height = inspectorHeight;
                    }
                }
            }
        });
    },

    _initHAGridLineHandler : function () {
        const gridLine = document.getElementById('hierarchy_asset_gridLine');
        const hierarchy = document.getElementById('hierarchy_gridItem');
        const assets = document.getElementById('assets_gridItem');
        const parentDiv = document.getElementById('second_column');

        gridLine.addEventListener('mouseenter', function (event) {
            gridLine.style.cursor = 'row-resize';
        });

        gridLine.addEventListener('mouseleave', function (event) {
            gridLine.style.cursor = 'auto';
        });

        gridLine.addEventListener('mousedown', function (event) {
            document.body.style.cursor = 'row-resize';
            Genie.LayoutController.startHALineDrag();
            const startY = event.clientY;
            const startHeight = parseFloat(window.getComputedStyle(assets).height);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'auto';
                Genie.LayoutController.endHALineDrag();
            });

            function handleDrag(event) {
                if (Genie.LayoutController.isHALineDrag()) {
                    const deltaY = startY - event.clientY;
                    const newHeight = startHeight + deltaY;

                    const height = ((newHeight / parentDiv.clientHeight) * 99.9).toFixed(2);
                    const assetsHeight = height + '%';
                    const hierarchyHeight = (99.9 - height).toFixed(2) + '%';

                    if (0 <= height && height <= 99.9) {
                        hierarchy.style.height = hierarchyHeight;
                        assets.style.height = assetsHeight;
                    }
                }
            }
        });
    },

    _initInspectorGridLineHandler : function () {
        const gridLine = document.getElementById('inspector_gridLine');
        const secondColumn = document.getElementById('second_column');
        const inspector = document.getElementById('inspector_gridItem');
        const parentDiv = document.getElementById('grid_container');

        gridLine.addEventListener('mouseenter', function (event) {
            gridLine.style.cursor = 'col-resize';
        });

        gridLine.addEventListener('mouseleave', function (event) {
            gridLine.style.cursor = 'auto';
        });

        gridLine.addEventListener('mousedown', function (event) {
            document.body.style.cursor = 'col-resize';
            Genie.LayoutController.startInspectorLineDrag();
            const startX = event.clientX;
            const startWidth = parseFloat(window.getComputedStyle(inspector).width);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'auto';
                Genie.LayoutController.endInspectorLineDrag();
            });

            function handleDrag(event) {
                if (Genie.LayoutController.isInspectorLineDrag()) {
                    const deltaX = startX - event.clientX;
                    const newWidth = startWidth + deltaX;

                    const MAX_FR = 5;
                    const localFR = MAX_FR - parseFloat(parentDiv.style.gridTemplateColumns.split(' ')[0].replace('fr', ''));
                    const width = ((newWidth / (secondColumn.clientWidth + inspector.clientWidth)) * localFR).toFixed(2);
                    const inspectorWidth = width + 'fr';
                    const secondColumnWidth = (localFR - width).toFixed(2) + 'fr';
                    const cocosViewWidth =  (MAX_FR - localFR) + 'fr';

                    if (0.4 <= width && width <= 4.8) {
                        parentDiv.style.gridTemplateColumns = cocosViewWidth + ' auto ' + secondColumnWidth + ' auto ' + inspectorWidth;
                    }
                }
            }
        });
    },
};