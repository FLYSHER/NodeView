/**
 * Game View 도구
 *  - 도구: 선택(Q) / 이동(W) / 회전(E) / 스케일(R)
 *    · 선택: 기존 동작 그대로 (인스턴스를 클릭해 선택하고 몸통을 끌어 이동)
 *    · 이동·회전·스케일: 선택한 노드(하위 노드 포함)에 기즈모를 그리고 손잡이를 끌어 조작
 *  - 표시: 경계 상자, 앵커, 그리드, 통계(FPS · 마우스 좌표)
 *  - 보기: 휠 확대/축소(마우스 위치 기준), 가운데 버튼 또는 Space+드래그로 화면 이동, F 맞춤, 배율 클릭 시 100%
 * 기즈모는 씬 최상단 DrawNode 에 매 프레임 다시 그린다 (애니메이션 중인 노드도 따라간다).
 */
var GameViewTools = (function () {
    var STORAGE_KEY = 'gameViewTools';
    var HANDLE_PX = 80;        // 손잡이 길이 (화면 px)
    var HIT_PX = 8;            // 손잡이를 잡는 허용 거리 (화면 px)
    var Z_ORDER = 999998;

    var COLORS = {
        x: cc.color(255, 107, 107, 255),
        y: cc.color(76, 208, 138, 255),
        center: cc.color(90, 162, 255, 255),
        rotate: cc.color(90, 162, 255, 255),
        active: cc.color(255, 214, 92, 255),
        bounds: cc.color(255, 214, 92, 255),
        anchor: cc.color(255, 159, 67, 255),
        gridMinor: cc.color(255, 255, 255, 18),
        gridMajor: cc.color(255, 255, 255, 40),
        outside: cc.color(17, 18, 21, 255),
        frame: cc.color(76, 141, 255, 150),
        transparent: cc.color(0, 0, 0, 0)
    };

    var _state = { tool: 'select', bounds: true, anchor: true, grid: false, frame: true, stats: true };
    var _outsideLayer = null;  // 디자인 영역 바깥 (어두운 색)
    var _frameNode = null;     // 디자인 영역 테두리
    var _$selLabel = null;     // 선택 노드 이름 · 크기 표시
    var _selLabelText = '';
    var _drawNode = null;
    var _gridNode = null;
    var _hover = null;         // 마우스가 올라간 손잡이
    var _drag = null;          // 끌고 있는 손잡이와 시작 값
    var _mouse = null;         // 마지막 마우스 위치 (월드 좌표)
    var _$toolbar = null;
    var _$stats = null;
    var _lastFrames = 0, _lastTime = 0, _fps = 0;

    var ZOOM_MIN = 0.1, ZOOM_MAX = 8;
    var ZOOM_STEPS = [0.1, 0.25, 0.33, 0.5, 0.67, 0.75, 1, 1.25, 1.5, 2, 3, 4, 6, 8];
    var _view = { zoom: 1, x: 0, y: 0 };
    // 해상도 메뉴 항목 [너비, 높이, 설명]
    var RES_PRESETS = [
        [1280, 720, 'HD'],
        [1334, 750, 'iPhone 8'],
        [1920, 1080, 'Full HD'],
        [2436, 1125, 'iPhone X'],
        [2048, 1536, 'iPad'],
        [1024, 768, '4:3']
    ];
    var _pan = null;           // 화면 이동 중 (가운데 버튼 또는 Space + 왼쪽 버튼)
    var _spaceDown = false;
    var _overCanvas = false;

    try { Object.assign(_state, JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); } catch (e) { }

    function save() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(_state)); } catch (e) { }
    }

    // ---- 좌표 유틸 --------------------------------------------------------

    function pxToWorld(px) {
        var s = cc.view.getScaleX() || 1;
        return px / s;
    }

    function selectedNode() {
        var ml = window.MainLayerInstance;
        var n = ml ? ml._currentlySelectedNode : null;
        return n && n.isRunning() ? n : null;
    }

    function pivotOf(node) {
        var parent = node.getParent();
        return parent ? parent.convertToWorldSpace(node.getPosition()) : node.getPosition();
    }

    // 노드의 월드 x/y 축 방향 (회전·부모 변환 반영, 정규화)
    function axesOf(node) {
        var t = node.getNodeToWorldTransform();
        var norm = function (x, y) {
            var len = Math.sqrt(x * x + y * y);
            return len > 1e-6 ? cc.p(x / len, y / len) : null;
        };
        return { x: norm(t.a, t.b) || cc.p(1, 0), y: norm(t.c, t.d) || cc.p(0, 1) };
    }

    function dist(a, b) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }

    // 점 p 와 선분 a-b 사이 거리
    function distToSegment(p, a, b) {
        var vx = b.x - a.x, vy = b.y - a.y;
        var len2 = vx * vx + vy * vy;
        var t = len2 > 0 ? Math.max(0, Math.min(1, ((p.x - a.x) * vx + (p.y - a.y) * vy) / len2)) : 0;
        return dist(p, cc.p(a.x + vx * t, a.y + vy * t));
    }

    // ---- 손잡이 배치 --------------------------------------------------------

    function handlesFor(node) {
        var pivot = pivotOf(node);
        var L = pxToWorld(HANDLE_PX);
        var h = { pivot: pivot, L: L };
        if (_state.tool === 'move') {
            // 이동은 화면(월드) 축 기준
            h.xEnd = cc.p(pivot.x + L, pivot.y);
            h.yEnd = cc.p(pivot.x, pivot.y + L);
            h.box = pxToWorld(9);
        } else if (_state.tool === 'scale') {
            // 스케일은 노드 자신의 축 기준
            var ax = axesOf(node);
            h.axes = ax;
            h.xEnd = cc.p(pivot.x + ax.x.x * L, pivot.y + ax.x.y * L);
            h.yEnd = cc.p(pivot.x + ax.y.x * L, pivot.y + ax.y.y * L);
            h.box = pxToWorld(7);
        } else if (_state.tool === 'rotate') {
            h.radius = pxToWorld(HANDLE_PX * 0.8);
        }
        return h;
    }

    function hitTest(node, p) {
        if (!node || _state.tool === 'select') return null;
        var h = handlesFor(node);
        var tol = pxToWorld(HIT_PX);
        if (_state.tool === 'rotate') {
            return Math.abs(dist(p, h.pivot) - h.radius) <= tol ? 'rotate' : null;
        }
        // 가운데(두 축 동시) → 끝 사각형 → 축 선 순서로 판정
        if (Math.abs(p.x - h.pivot.x) <= h.box + tol * 0.5 && Math.abs(p.y - h.pivot.y) <= h.box + tol * 0.5) return 'center';
        if (dist(p, h.xEnd) <= h.box + tol) return 'x';
        if (dist(p, h.yEnd) <= h.box + tol) return 'y';
        if (distToSegment(p, h.pivot, h.xEnd) <= tol) return 'x';
        if (distToSegment(p, h.pivot, h.yEnd) <= tol) return 'y';
        return null;
    }

    // ---- 그리기 ------------------------------------------------------------

    function ensureDrawNode() {
        var scene = cc.director.getRunningScene();
        if (!scene) return null;
        if (!_drawNode || _drawNode.getParent() !== scene) {
            _drawNode = new cc.DrawNode();
            scene.addChild(_drawNode, Z_ORDER);
            _drawNode.schedule(draw, 0);
        }
        return _drawNode;
    }

    function colorFor(part) {
        if ((_drag && _drag.part === part) || (!_drag && _hover === part)) return COLORS.active;
        return COLORS[part] || COLORS.center;
    }

    function draw() {
        var dn = _drawNode;
        if (!dn) return;
        dn.clear();
        updateStats();

        var node = selectedNode();
        if (!node || !_state.bounds) hideSelLabel();
        if (!node) return;
        var w = pxToWorld(1);

        if (_state.bounds) {
            var box = node.getBoundingBoxToWorld();
            updateSelLabel(node, box);
            if (box.width < pxToWorld(4)) { box.x -= pxToWorld(5); box.width = pxToWorld(10); }
            if (box.height < pxToWorld(4)) { box.y -= pxToWorld(5); box.height = pxToWorld(10); }
            dn.drawRect(cc.p(box.x, box.y), cc.p(box.x + box.width, box.y + box.height), COLORS.transparent, w, COLORS.bounds);
        }

        var h = handlesFor(node);
        if (_state.anchor && _state.tool === 'select') {
            dn.drawDot(h.pivot, pxToWorld(4), COLORS.anchor);
        }

        if (_state.tool === 'move' || _state.tool === 'scale') {
            dn.drawSegment(h.pivot, h.xEnd, w, colorFor('x'));
            dn.drawSegment(h.pivot, h.yEnd, w, colorFor('y'));
            if (_state.tool === 'move') {
                drawArrowHead(dn, h.pivot, h.xEnd, colorFor('x'));
                drawArrowHead(dn, h.pivot, h.yEnd, colorFor('y'));
            } else {
                drawBox(dn, h.xEnd, h.box, colorFor('x'));
                drawBox(dn, h.yEnd, h.box, colorFor('y'));
            }
            drawBox(dn, h.pivot, h.box, colorFor('center'));
        } else if (_state.tool === 'rotate') {
            dn.drawCircle(h.pivot, h.radius, 0, 64, false, w * 1.5, colorFor('rotate'));
            dn.drawDot(h.pivot, pxToWorld(3), colorFor('rotate'));
            if (_drag && _drag.part === 'rotate' && _mouse) {
                dn.drawSegment(h.pivot, _mouse, w * 0.6, COLORS.active);
            }
        }
    }

    // ---- 선택 노드 이름표 ("imgBg · 600 × 300") ------------------------------

    // 월드 좌표 → Game View 뷰포트 요소 기준 CSS 좌표
    function worldToViewport(p) {
        var canvas = cc._canvas;
        var viewport = _$selLabel && _$selLabel[0].parentNode;
        if (!canvas || !viewport) return null;
        var cr = canvas.getBoundingClientRect(), vr = viewport.getBoundingClientRect();
        var vp = cc.view.getViewPortRect();
        var css = cr.width / (canvas.width || 1);
        var px = vp.x + p.x * cc.view.getScaleX();
        var py = vp.y + p.y * cc.view.getScaleY();
        return { x: cr.left - vr.left + px * css, y: cr.top - vr.top + cr.height - py * css };
    }

    function updateSelLabel(node, box) {
        if (!_$selLabel) return;
        // 크기는 노드 자신의 크기 × 실제 배율 (자식 영역 제외, Game View 배율과 상관없이 디자인 좌표 기준)
        var size = node.getContentSize();
        var t = node.getNodeToWorldTransform();
        var sx = Math.sqrt(t.a * t.a + t.b * t.b) / _view.zoom, sy = Math.sqrt(t.c * t.c + t.d * t.d) / _view.zoom;
        var text = (node.getName() || 'Unnamed') + ' · ' + Math.round(size.width * sx) + ' × ' + Math.round(size.height * sy);
        if (text !== _selLabelText) {
            _selLabelText = text;
            _$selLabel.text(text);
        }
        var p = worldToViewport(cc.p(box.x, box.y + box.height));
        if (!p) return;
        _$selLabel.css({ left: Math.round(p.x) + 'px', top: Math.round(p.y) + 'px', display: 'block' });
    }

    function hideSelLabel() {
        if (_$selLabel && _selLabelText !== '') {
            _selLabelText = '';
            _$selLabel.hide();
        }
    }

    function drawBox(dn, c, half, color) {
        dn.drawRect(cc.p(c.x - half, c.y - half), cc.p(c.x + half, c.y + half), color, 0, color);
    }

    function drawArrowHead(dn, from, to, color) {
        var dx = to.x - from.x, dy = to.y - from.y;
        var len = Math.sqrt(dx * dx + dy * dy) || 1;
        var ux = dx / len, uy = dy / len;
        var size = pxToWorld(10), half = pxToWorld(5);
        var tip = cc.p(to.x + ux * size, to.y + uy * size);
        dn.drawPoly([tip, cc.p(to.x - uy * half, to.y + ux * half), cc.p(to.x + uy * half, to.y - ux * half)], color, 0, color);
    }

    // 그리드: 배경 바로 위(인스턴스보다 아래)에 그린다. 화면에 보이는 영역만큼 MainLayer 좌표로 그린다
    function drawGrid() {
        var ml = window.MainLayerInstance;
        if (!ml) return;
        if (!_gridNode || _gridNode.getParent() !== ml) {
            _gridNode = new cc.DrawNode();
            ml.addChild(_gridNode, -1);
        }
        _gridNode.clear();
        if (!_state.grid) return;
        var size = cc.winSize;
        var z = _view.zoom;
        var step = 50;
        while (step * z < 12) step *= 2;   // 너무 촘촘하면 간격을 넓힌다
        var w = pxToWorld(1) * 0.5 / z;
        var x0 = -_view.x / z, y0 = -_view.y / z;
        var x1 = x0 + size.width / z, y1 = y0 + size.height / z;
        for (var i = Math.floor(x0 / step); i * step <= x1; i++) {
            _gridNode.drawSegment(cc.p(i * step, y0), cc.p(i * step, y1), w, i % 2 === 0 ? COLORS.gridMajor : COLORS.gridMinor);
        }
        for (var j = Math.floor(y0 / step); j * step <= y1; j++) {
            _gridNode.drawSegment(cc.p(x0, j * step), cc.p(x1, j * step), w, j % 2 === 0 ? COLORS.gridMajor : COLORS.gridMinor);
        }
    }

    // ---- 보기 (확대/축소 · 화면 이동) -------------------------------------
    // MainLayer 에 배율과 위치를 준다: 화면 좌표 = MainLayer 좌표 × zoom + (x, y)
    // 배경 레이어는 반대로 변환해 항상 화면 전체를 덮는다

    // 화면 전체를 덮도록 MainLayer 의 자식 레이어를 반대로 변환한다
    function coverScreen(layer) {
        layer.setAnchorPoint(0, 0);
        layer.setScale(1 / _view.zoom);
        layer.setPosition(-_view.x / _view.zoom, -_view.y / _view.zoom);
    }

    function applyView() {
        var ml = window.MainLayerInstance;
        if (!ml) return;
        ml.setAnchorPoint(0, 0);
        ml.setScale(_view.zoom);
        ml.setPosition(_view.x, _view.y);

        // 디자인 해상도 프레임: 배경색은 디자인 영역에만 칠하고 바깥은 어둡게
        if (!_outsideLayer || _outsideLayer.getParent() !== ml) {
            _outsideLayer = new cc.LayerColor(COLORS.outside, cc.winSize.width, cc.winSize.height);
            ml.addChild(_outsideLayer, -2);
        }
        _outsideLayer.setContentSize(cc.winSize);
        _outsideLayer.setVisible(!!_state.frame);
        coverScreen(_outsideLayer);
        if (cc.director.setClearColor) cc.director.setClearColor(_state.frame ? COLORS.outside : cc.color(0, 0, 0, 255));

        var bg = ml._backgroundLayer;
        if (bg) {
            if (_state.frame) {
                bg.setAnchorPoint(0, 0);
                bg.setScale(1);
                bg.setPosition(0, 0);
                bg.setContentSize(cc.winSize);
            } else {
                coverScreen(bg);
            }
        }
        drawGrid();
        drawFrame();
        syncZoomLabel();
        syncResolutionLabel();
    }

    // 디자인 영역 테두리 (인스턴스보다 아래)
    function drawFrame() {
        var ml = window.MainLayerInstance;
        if (!ml) return;
        if (!_frameNode || _frameNode.getParent() !== ml) {
            _frameNode = new cc.DrawNode();
            ml.addChild(_frameNode, -1);
        }
        _frameNode.clear();
        if (!_state.frame) return;
        var size = cc.winSize;
        _frameNode.drawRect(cc.p(0, 0), cc.p(size.width, size.height), COLORS.transparent, pxToWorld(1) / _view.zoom, COLORS.frame);
    }

    function clampZoom(z) {
        return Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, z));
    }

    // 화면 좌표 p 아래의 지점을 고정한 채로 배율을 바꾼다
    function zoomAt(z, p) {
        z = clampZoom(z);
        if (!p) p = cc.p(cc.winSize.width / 2, cc.winSize.height / 2);
        var lx = (p.x - _view.x) / _view.zoom, ly = (p.y - _view.y) / _view.zoom;
        _view.zoom = z;
        _view.x = p.x - lx * z;
        _view.y = p.y - ly * z;
        applyView();
    }

    function zoomStep(dir, p) {
        // 25% / 50% / 100% 같은 값에 딱 맞도록 단계 목록에서 다음 값을 고른다
        var cur = _view.zoom, next = cur;
        if (dir > 0) {
            for (var i = 0; i < ZOOM_STEPS.length; i++) { if (ZOOM_STEPS[i] > cur + 1e-6) { next = ZOOM_STEPS[i]; break; } }
        } else {
            for (var j = ZOOM_STEPS.length - 1; j >= 0; j--) { if (ZOOM_STEPS[j] < cur - 1e-6) { next = ZOOM_STEPS[j]; break; } }
        }
        zoomAt(next, p);
    }

    function resetView() {
        _view.zoom = 1;
        _view.x = 0;
        _view.y = 0;
        applyView();
    }

    // 선택한 노드(없으면 모든 인스턴스)가 화면에 꽉 차게
    function fitView() {
        var ml = window.MainLayerInstance;
        if (!ml) return;
        var nodes = selectedNode() ? [selectedNode()] : ml.getChildren().filter(function (c) { return c instanceof DraggableNode && c.isVisible(); });
        var box = null;
        nodes.forEach(function (n) {
            var b = n.getBoundingBoxToWorld();
            if (b.width <= 0 && b.height <= 0) return;
            box = box ? cc.rectUnion(box, b) : b;
        });
        if (!box) { resetView(); return; }
        // 화면 좌표 → MainLayer 좌표
        var z = _view.zoom;
        var lx = (box.x - _view.x) / z, ly = (box.y - _view.y) / z, lw = Math.max(box.width / z, 1), lh = Math.max(box.height / z, 1);
        var size = cc.winSize;
        var nz = clampZoom(Math.min(size.width * 0.9 / lw, size.height * 0.9 / lh));
        _view.zoom = nz;
        _view.x = size.width / 2 - (lx + lw / 2) * nz;
        _view.y = size.height / 2 - (ly + lh / 2) * nz;
        applyView();
    }

    function syncZoomLabel() {
        if (_$toolbar) _$toolbar.find('.gv-zoom-value').text(Math.round(_view.zoom * 100) + '%');
    }

    // 화면 좌표 → MainLayer(디자인) 좌표
    function toLayer(p) {
        return cc.p((p.x - _view.x) / _view.zoom, (p.y - _view.y) / _view.zoom);
    }

    // ---- 조작 --------------------------------------------------------------

    function notifyChanged(node) {
        cc.eventManager.dispatchCustomEvent('node_position_changed', { nodeId: node.__instanceId });
    }

    function beginDrag(node, part, p) {
        _drag = {
            node: node, part: part, start: p,
            startWorld: pivotOf(node),
            startRot: node.getRotation(),
            startScaleX: node.getScaleX(), startScaleY: node.getScaleY(),
            axes: axesOf(node)
        };
        var pivot = _drag.startWorld;
        _drag.startAngle = Math.atan2(p.y - pivot.y, p.x - pivot.x);
        _drag.startProjX = (p.x - pivot.x) * _drag.axes.x.x + (p.y - pivot.y) * _drag.axes.x.y;
        _drag.startProjY = (p.x - pivot.x) * _drag.axes.y.x + (p.y - pivot.y) * _drag.axes.y.y;
        _drag.startDist = dist(p, pivot);
    }

    function updateDrag(p, shiftKey) {
        var d = _drag, node = d.node;
        if (!node.isRunning()) { _drag = null; return; }
        var pivot = d.startWorld;

        if (_state.tool === 'move') {
            var dx = p.x - d.start.x, dy = p.y - d.start.y;
            if (d.part === 'x') dy = 0;
            if (d.part === 'y') dx = 0;
            var world = cc.p(d.startWorld.x + dx, d.startWorld.y + dy);
            var parent = node.getParent();
            node.setPosition(parent ? parent.convertToNodeSpace(world) : world);
        } else if (_state.tool === 'rotate') {
            var angle = Math.atan2(p.y - pivot.y, p.x - pivot.x);
            var delta = (d.startAngle - angle) * 180 / Math.PI;   // cocos 는 시계 방향이 +
            var rot = d.startRot + delta;
            if (shiftKey) rot = Math.round(rot / 15) * 15;          // Shift: 15도 단위
            node.setRotation(Math.round(rot * 100) / 100);
        } else if (_state.tool === 'scale') {
            // 손잡이 길이만큼 끌면 2배 (잡은 위치와 상관없이 끈 거리에 비례 → 중심 근처를 잡아도 튀지 않음)
            var L = pxToWorld(HANDLE_PX);
            var round = function (v) { return Math.round(v * 1000) / 1000; };
            if (d.part === 'x' || d.part === 'y') {
                var ax = d.part === 'x' ? d.axes.x : d.axes.y;
                var proj = (p.x - pivot.x) * ax.x + (p.y - pivot.y) * ax.y;
                var factor = 1 + (proj - (d.part === 'x' ? d.startProjX : d.startProjY)) / L;
                if (d.part === 'x') node.setScaleX(round(d.startScaleX * factor));
                else node.setScaleY(round(d.startScaleY * factor));
            } else {
                // 가운데: 오른쪽/위로 끌면 커지고 왼쪽/아래로 끌면 작아진다 (균등 스케일)
                var f = 1 + ((p.x - d.start.x) + (p.y - d.start.y)) / L;
                node.setScaleX(round(d.startScaleX * f));
                node.setScaleY(round(d.startScaleY * f));
            }
        }
        notifyChanged(node);
    }

    function installMouse() {
        // 고정 우선순위(-1)로 등록해 씬의 선택/드래그 처리보다 먼저 받는다
        cc.eventManager.addListener({
            event: cc.EventListener.MOUSE,
            onMouseDown: function (event) {
                var p = event.getLocation();
                var button = event.getButton();
                // 화면 이동: 가운데 버튼, 또는 Space 를 누른 채 왼쪽 버튼
                if (button === cc.EventMouse.BUTTON_MIDDLE || (button === cc.EventMouse.BUTTON_LEFT && _spaceDown)) {
                    _pan = { start: p, x: _view.x, y: _view.y };
                    if (cc._canvas) cc._canvas.style.cursor = 'grabbing';
                    event.stopPropagation();
                    return;
                }
                if (button !== cc.EventMouse.BUTTON_LEFT) return;
                var node = selectedNode();
                var part = hitTest(node, p);
                if (!part) return;
                beginDrag(node, part, p);
                event.stopPropagation();   // 손잡이를 잡았으면 선택 변경/몸통 드래그를 막는다
            },
            onMouseMove: function (event) {
                var p = event.getLocation();
                _mouse = p;
                if (_pan) {
                    _view.x = _pan.x + (p.x - _pan.start.x);
                    _view.y = _pan.y + (p.y - _pan.start.y);
                    applyView();
                    event.stopPropagation();
                    return;
                }
                if (_drag) {
                    updateDrag(p, !!(window.event && window.event.shiftKey));
                    event.stopPropagation();
                    return;
                }
                var part = hitTest(selectedNode(), p);
                if (part !== _hover) {
                    _hover = part;
                    if (cc._canvas) cc._canvas.style.cursor = part ? (part === 'rotate' ? 'crosshair' : 'move') : '';
                }
            },
            onMouseUp: function (event) {
                if (_pan) {
                    _pan = null;
                    if (cc._canvas) cc._canvas.style.cursor = _spaceDown ? 'grab' : '';
                    event.stopPropagation();
                    return;
                }
                if (_drag) {
                    _drag = null;
                    event.stopPropagation();
                }
            }
        }, -1);

        // 휠: 마우스 위치를 기준으로 확대/축소
        var canvas = cc.game.canvas || cc._canvas;
        if (canvas) {
            canvas.addEventListener('wheel', function (e) {
                e.preventDefault();
                if (!e.deltaY) return;
                var factor = Math.pow(1.0015, -e.deltaY);
                zoomAt(_view.zoom * factor, _mouse);
            }, { passive: false });
            // 가운데 버튼 자동 스크롤 막기
            canvas.addEventListener('mousedown', function (e) { if (e.button === 1) e.preventDefault(); });
            canvas.addEventListener('mouseenter', function () { _overCanvas = true; });
            canvas.addEventListener('mouseleave', function () { _overCanvas = false; });
        }
    }

    // ---- 툴바 / 통계 --------------------------------------------------------

    function setTool(tool) {
        _state.tool = tool;
        _hover = null;
        save();
        syncToolbar();
    }

    function syncToolbar() {
        if (!_$toolbar) return;
        _$toolbar.find('[data-tool]').each(function () {
            var on = $(this).data('tool') === _state.tool;
            $(this).toggleClass('active', on).attr('aria-pressed', on);
        });
        _$toolbar.find('[data-toggle]').each(function () {
            var on = !!_state[$(this).data('toggle')];
            $(this).toggleClass('active', on).attr('aria-pressed', on);
        });
        if (_$stats) _$stats.toggle(!!_state.stats);
        if (cc.director && cc.director.setDisplayStats) cc.director.setDisplayStats(false);
    }

    function updateStats() {
        if (!_$stats || !_state.stats) return;
        var now = Date.now();
        if (now - _lastTime >= 500) {
            var frames = cc.director.getTotalFrames();
            if (_lastTime) _fps = Math.round((frames - _lastFrames) * 1000 / (now - _lastTime));
            _lastFrames = frames;
            _lastTime = now;
            var renderer = cc._renderType === cc.game.RENDER_TYPE_WEBGL ? 'WebGL' : 'Canvas';
            var lm = _mouse ? toLayer(_mouse) : null;
            var mouse = lm ? '마우스 (' + Math.round(lm.x) + ', ' + Math.round(lm.y) + ')' : '';
            var size = cc.winSize;
            _$stats.html(_fps + ' FPS · Draw ' + (cc.g_NumberOfDraws || 0) + ' · ' + renderer +
                '<br>디자인 ' + Math.round(size.width) + '×' + Math.round(size.height) + (mouse ? ' · ' + mouse : ''));
        }
    }

    function buildToolbar($toolbar) {
        var icon = {
            select: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 3l14 8-6 2-2 6z"></path></svg>',
            move: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M2 12h20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3"></path></svg>',
            rotate: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 12a8 8 0 1 1-3-6.2"></path><path d="M20 4v5h-5"></path></svg>',
            scale: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="10" height="10"></rect><path d="M14 3h7v7M21 3l-9 9"></path></svg>'
        };
        $toolbar.html(
            '<div class="gv-tools" role="group" aria-label="도구">' +
            '<button type="button" class="gv-tool" data-tool="select" title="선택 (Q)" aria-label="선택 도구 (Q)">' + icon.select + '</button>' +
            '<button type="button" class="gv-tool" data-tool="move" title="이동 (W)" aria-label="이동 도구 (W)">' + icon.move + '</button>' +
            '<button type="button" class="gv-tool" data-tool="rotate" title="회전 (E) · Shift: 15도 단위" aria-label="회전 도구 (E)">' + icon.rotate + '</button>' +
            '<button type="button" class="gv-tool" data-tool="scale" title="스케일 (R)" aria-label="스케일 도구 (R)">' + icon.scale + '</button>' +
            '</div>' +
            '<span class="gv-sep"></span>' +
            '<button type="button" class="gv-toggle" data-toggle="bounds">경계 상자</button>' +
            '<button type="button" class="gv-toggle" data-toggle="anchor">앵커 표시</button>' +
            '<button type="button" class="gv-toggle" data-toggle="grid">그리드</button>' +
            '<button type="button" class="gv-toggle" data-toggle="frame" title="디자인 해상도 영역을 테두리로 표시하고 바깥을 어둡게">디자인 해상도 프레임</button>' +
            '<button type="button" class="gv-toggle" data-toggle="stats">통계</button>' +
            '<span class="gv-spacer"></span>' +
            '<div class="gv-res">' +
            '<span class="gv-label">해상도</span>' +
            '<button type="button" class="gv-res-btn" aria-haspopup="menu" aria-expanded="false" title="디자인 해상도"></button>' +
            '<div class="gv-res-menu" role="menu" hidden>' +
            '<button type="button" class="gv-res-item" role="menuitemradio" data-res="auto">자동 <span class="gv-res-note">패널 크기에 맞춤</span></button>' +
            '<div class="gv-res-sep"></div>' +
            RES_PRESETS.map(function (r) {
                return '<button type="button" class="gv-res-item" role="menuitemradio" data-res="' + r[0] + 'x' + r[1] + '">' + r[0] + ' × ' + r[1] + (r[2] ? ' <span class="gv-res-note">' + r[2] + '</span>' : '') + '</button>';
            }).join('') +
            '<div class="gv-res-sep"></div>' +
            '<div class="gv-res-custom">' +
            '<input type="number" class="gv-res-w" min="1" placeholder="너비" aria-label="해상도 너비">' +
            '<span>×</span>' +
            '<input type="number" class="gv-res-h" min="1" placeholder="높이" aria-label="해상도 높이">' +
            '<button type="button" class="gv-res-apply">적용</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<label class="gv-bg" title="배경색"><input type="color" id="bg-color-picker" aria-label="배경색"></label>' +
            '<div class="gv-zoom" role="group" aria-label="확대/축소">' +
            '<button type="button" class="gv-zoom-btn" data-zoom="out" title="축소 (-)" aria-label="축소">−</button>' +
            '<button type="button" class="gv-zoom-btn gv-zoom-value" data-zoom="reset" title="클릭: 100% 로 · 휠: 확대/축소 · 가운데 버튼/Space+드래그: 화면 이동" aria-label="배율, 클릭하면 100%">100%</button>' +
            '<button type="button" class="gv-zoom-btn" data-zoom="in" title="확대 (+)" aria-label="확대">+</button>' +
            '<button type="button" class="gv-zoom-btn" data-zoom="fit" title="선택한 노드(없으면 전체)에 맞춤 (F)">맞춤</button>' +
            '</div>'
        );
        $toolbar.on('click', '[data-zoom]', function () {
            var act = $(this).data('zoom');
            if (act === 'in') zoomStep(1);
            else if (act === 'out') zoomStep(-1);
            else if (act === 'fit') fitView();
            else resetView();
        });
        syncZoomLabel();
        $toolbar.on('click', '[data-tool]', function () { setTool($(this).data('tool')); });
        $toolbar.on('click', '[data-toggle]', function () {
            var key = $(this).data('toggle');
            _state[key] = !_state[key];
            save();
            syncToolbar();
            if (key === 'grid') drawGrid();
            if (key === 'frame') applyView();
        });

        // 해상도 메뉴
        var $menu = $toolbar.find('.gv-res-menu');
        var $resBtn = $toolbar.find('.gv-res-btn');
        var closeMenu = function () { $menu.prop('hidden', true); $resBtn.attr('aria-expanded', 'false'); };
        $resBtn.on('click', function (e) {
            e.stopPropagation();
            var open = $menu.prop('hidden');
            if (open) {
                var cur = PanelManager.getResolution();
                $menu.find('.gv-res-w').val(cur ? cur.width : '');
                $menu.find('.gv-res-h').val(cur ? cur.height : '');
                syncResolutionLabel();
            }
            $menu.prop('hidden', !open);
            $resBtn.attr('aria-expanded', String(open));
        });
        $menu.on('click', '.gv-res-item', function () {
            var v = String($(this).data('res'));
            if (v === 'auto') PanelManager.setResolution(null, null);
            else PanelManager.setResolution(parseInt(v.split('x')[0], 10), parseInt(v.split('x')[1], 10));
            closeMenu();
        });
        var applyCustom = function () {
            var w = parseInt($menu.find('.gv-res-w').val(), 10), h = parseInt($menu.find('.gv-res-h').val(), 10);
            if (w > 0 && h > 0) { PanelManager.setResolution(w, h); closeMenu(); }
        };
        $menu.on('click', '.gv-res-apply', applyCustom);
        $menu.on('keydown', 'input', function (e) {
            if (e.key === 'Enter') applyCustom();
            if (e.key === 'Escape') closeMenu();
        });
        $menu.on('click', function (e) { e.stopPropagation(); });
        $(document).on('click', closeMenu);

        // 배경색
        var savedColor = '#323232';
        try { savedColor = localStorage.getItem('backgroundColor') || savedColor; } catch (e) { }
        $toolbar.find('#bg-color-picker').val(savedColor).on('input', function () {
            try { localStorage.setItem('backgroundColor', this.value); } catch (e) { }
            if (cc.eventManager) cc.eventManager.dispatchCustomEvent('background_color_changed', this.value);
        });
        syncResolutionLabel();
    }

    function syncResolutionLabel() {
        if (!_$toolbar || typeof PanelManager === 'undefined' || !PanelManager.getResolution) return;
        var cur = PanelManager.getResolution();
        var size = cc.winSize;
        var text = cur ? cur.width + ' × ' + cur.height : '자동 · ' + Math.round(size.width) + ' × ' + Math.round(size.height);
        _$toolbar.find('.gv-res-btn').text(text + ' ▾');
        var key = cur ? cur.width + 'x' + cur.height : 'auto';
        _$toolbar.find('.gv-res-item').each(function () {
            var on = String($(this).data('res')) === key;
            $(this).toggleClass('active', on).attr('aria-checked', String(on));
        });
    }

    function installShortcuts() {
        var map = { q: 'select', w: 'move', e: 'rotate', r: 'scale' };
        var isTyping = function (t) {
            return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
        };
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (isTyping(e.target)) return;
            if (e.code === 'Space') {
                // 마우스가 Game View 위에 있을 때만 화면 이동 모드 (포커스된 버튼이 눌리지 않게 막는다)
                if (!_overCanvas) return;
                e.preventDefault();
                if (!_spaceDown && cc._canvas && !_pan) cc._canvas.style.cursor = 'grab';
                _spaceDown = true;
                return;
            }
            var key = String(e.key).toLowerCase();
            if (key === 'f') { fitView(); return; }
            if (key === '+' || key === '=') { zoomStep(1, _mouse); return; }
            if (key === '-') { zoomStep(-1, _mouse); return; }
            var tool = map[key];
            if (tool) setTool(tool);
        });
        document.addEventListener('keyup', function (e) {
            if (e.code !== 'Space') return;
            _spaceDown = false;
            if (cc._canvas && !_pan) cc._canvas.style.cursor = '';
        });
        window.addEventListener('blur', function () { _spaceDown = false; });
    }

    return {
        // Game View 패널이 만들어질 때 호출
        mount: function (toolbarEl, statsEl) {
            _$toolbar = $(toolbarEl);
            _$stats = $(statsEl);
            _$selLabel = $('<div class="gv-sel-label" aria-hidden="true"></div>').hide().insertAfter(_$stats);
            _selLabelText = '';
            buildToolbar(_$toolbar);
            syncToolbar();
        },
        // 씬이 준비된 뒤 한 번 호출
        init: function () {
            ensureDrawNode();
            installMouse();
            installShortcuts();
            applyView();
            cc.eventManager.addCustomListener('canvas-resize', applyView);
            // 예전 선택 표시(노란 사각형)는 이 기즈모가 대신 그린다
            window.Gizmo_DrawTouchLayerByRect = function () { ensureDrawNode(); };
            window.Gizmo_ClearDraw = function () { };
            var scene = cc.director.getRunningScene();
            var old = scene && scene.getChildByTag(999);
            if (old && old instanceof cc.DrawNode) old.clear();
            syncToolbar();
        },
        getTool: function () { return _state.tool; },
        // 보기 메뉴용: bounds / anchor / grid / frame / stats
        isOn: function (key) { return !!_state[key]; },
        toggle: function (key) {
            if (_$toolbar) _$toolbar.find('[data-toggle="' + key + '"]').trigger('click');
        },
        zoomStep: zoomStep,
        getZoom: function () { return _view.zoom; },
        zoomAt: zoomAt,
        fitView: fitView,
        resetView: resetView,
        toLayer: toLayer,
        setTool: setTool,
        isDragging: function () { return !!_drag; }
    };
})();
