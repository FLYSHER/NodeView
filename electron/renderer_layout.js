var Renderer_layout = {
    init : function () {
        this._initLogGridLineHandler();
        this._initHAGridLineHandler();
        this._initInspectorGridLineHandler();
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

                    const height = ((newHeight / parentDiv.clientHeight) * 97).toFixed(2);
                    const assetsHeight = height + '%';
                    const hierarchyHeight = (99.5 - height).toFixed(2) + '%';

                    if (0 <= height && height <= 99.5) {
                        hierarchy.style.height = hierarchyHeight;
                        assets.style.height = assetsHeight;
                    }
                }
            }
        });
    },

    _initInspectorGridLineHandler : function () {
        const gridLine = document.getElementById('inspector_gridLine');
        const inspector = document.getElementById('inspector_gridItem');
        const cocosView = document.getElementById('cocosView_gridItem');
        const parentDiv = document.getElementById('grid_container');

        gridLine.addEventListener('mouseenter', function (event) {
            gridLine.style.cursor = 'col-resize';
        });

        gridLine.addEventListener('mouseleave', function (event) {
            gridLine.style.cursor = 'auto';
        });

        gridLine.addEventListener('mousedown', function (event) {
            document.body.style.cursor = 'col-resize';
            Genie.LayoutController.startInspectorLineDragStart();
            const startX = event.clientX;
            const startWidth = parseFloat(window.getComputedStyle(inspector).width);

            document.addEventListener('mousemove', handleDrag);
            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', handleDrag);
                document.body.style.cursor = 'auto';
                Genie.LayoutController.endInspectorLineDragStart();
            });

            function handleDrag(event) {
                if (Genie.LayoutController.isInspectorLineDragStart()) {
                    const deltaX = startX - event.clientX;
                    const newWidth = startWidth + deltaX;

                    const width = ((newWidth / (parentDiv.clientWidth - cocosView.clientWidth)) * 2).toFixed(2);
                    const inspectorWidth = width + 'fr';
                    const secondColumnWidth = (2 - width).toFixed(2) + 'fr';

                    if (0 <= width && width <= 100) {
                        parentDiv.style.gridTemplateColumns = '3fr ' + secondColumnWidth + ' auto ' + inspectorWidth;
                    }
                }
            }
        });
    },
};