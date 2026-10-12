/**
 * Game View 도구
 *  - 도구: 선택(Q) / 이동(W) / 회전(E) / 스케일(R)
 *    · 선택: 기존 동작 그대로 (인스턴스를 클릭해 선택하고 몸통을 끌어 이동)
 *    · 이동·회전·스케일: 선택한 노드(하위 노드 포함)에 기즈모를 그리고 손잡이를 끌어 조작
 *  - 표시: 경계 상자, 앵커, 그리드, 통계(FPS · 마우스 좌표)
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
        transparent: cc.color(0, 0, 0, 0)
    };

    var _state = { tool: 'select', bounds: true, anchor: true, grid: false, stats: true };
    var _drawNode = null;
    var _gridNode = null;
    var _hover = null;         // 마우스가 올라간 손잡이
    var _drag = null;          // 끌고 있는 손잡이와 시작 값
    var _mouse = null;         // 마지막 마우스 위치 (월드 좌표)
    var _$toolbar = null;
    var _$stats = null;
    var _lastFrames = 0, _lastTime = 0, _fps = 0;

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
        if (!node) return;
        var w = pxToWorld(1);

        if (_state.bounds) {
            var box = node.getBoundingBoxToWorld();
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

    // 그리드: 배경 바로 위(인스턴스보다 아래)에 그린다
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
        var step = 50;
        var w = pxToWorld(1) * 0.5;
        for (var x = 0, i = 0; x <= size.width; x += step, i++) {
            _gridNode.drawSegment(cc.p(x, 0), cc.p(x, size.height), w, i % 2 === 0 ? COLORS.gridMajor : COLORS.gridMinor);
        }
        for (var y = 0, j = 0; y <= size.height; y += step, j++) {
            _gridNode.drawSegment(cc.p(0, y), cc.p(size.width, y), w, j % 2 === 0 ? COLORS.gridMajor : COLORS.gridMinor);
        }
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
                if (event.getButton() !== cc.EventMouse.BUTTON_LEFT) return;
                var p = event.getLocation();
                var node = selectedNode();
                var part = hitTest(node, p);
                if (!part) return;
                beginDrag(node, part, p);
                event.stopPropagation();   // 손잡이를 잡았으면 선택 변경/몸통 드래그를 막는다
            },
            onMouseMove: function (event) {
                var p = event.getLocation();
                _mouse = p;
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
                if (_drag) {
                    _drag = null;
                    event.stopPropagation();
                }
            }
        }, -1);
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
            var mouse = _mouse ? '마우스 (' + Math.round(_mouse.x) + ', ' + Math.round(_mouse.y) + ')' : '';
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
            '<button type="button" class="gv-toggle" data-toggle="stats">통계</button>'
        );
        $toolbar.on('click', '[data-tool]', function () { setTool($(this).data('tool')); });
        $toolbar.on('click', '[data-toggle]', function () {
            var key = $(this).data('toggle');
            _state[key] = !_state[key];
            save();
            syncToolbar();
            if (key === 'grid') drawGrid();
        });
    }

    function installShortcuts() {
        var map = { q: 'select', w: 'move', e: 'rotate', r: 'scale' };
        document.addEventListener('keydown', function (e) {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            var t = e.target;
            if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
            var tool = map[String(e.key).toLowerCase()];
            if (tool) setTool(tool);
        });
    }

    return {
        // Game View 패널이 만들어질 때 호출
        mount: function (toolbarEl, statsEl) {
            _$toolbar = $(toolbarEl);
            _$stats = $(statsEl);
            buildToolbar(_$toolbar);
            syncToolbar();
        },
        // 씬이 준비된 뒤 한 번 호출
        init: function () {
            ensureDrawNode();
            installMouse();
            installShortcuts();
            drawGrid();
            cc.eventManager.addCustomListener('canvas-resize', drawGrid);
            // 예전 선택 표시(노란 사각형)는 이 기즈모가 대신 그린다
            window.Gizmo_DrawTouchLayerByRect = function () { ensureDrawNode(); };
            window.Gizmo_ClearDraw = function () { };
            var scene = cc.director.getRunningScene();
            var old = scene && scene.getChildByTag(999);
            if (old && old instanceof cc.DrawNode) old.clear();
            syncToolbar();
        },
        getTool: function () { return _state.tool; },
        setTool: setTool,
        isDragging: function () { return !!_drag; }
    };
})();
