var Renderer_layout = {
    init : function () {
        this._initGridLineEventListener();
    },

    _initGridLineEventListener : function () {
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
};