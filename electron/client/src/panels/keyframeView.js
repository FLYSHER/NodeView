/**
 * Animation · Sequencer 의 "키프레임" 보기
 * 왼쪽 목록에서 고른 애니메이션의 키프레임을 노드(UI) / 본(AR) / 타임라인(Spine) 별로 한 줄씩 보여준다.
 *  - ◆ : 키프레임 (값이 바뀐 키는 채움, 그대로인 키는 테두리만), 값이 바뀌는 구간은 막대
 *  - ◆ 에 마우스 → 그 키에서 바뀐 값, 클릭 → 그 프레임으로 이동, 행 이름 클릭 → Hierarchy 에서 선택(UI)
 */
var KeyframeView = (function () {
    var MODE_KEY = 'sequencerViewMode';
    var LABEL_W = 180;          // 왼쪽 이름 열 폭 (CSS 와 같게)
    var PAD = 10;               // 0프레임 ◆ 가 잘리지 않게 트랙 앞쪽 여백
    var CHANGED_KEY = 'keyframeChangedOnly';

    var _active = false;
    var _owner = null, _animName = null, _type = null;
    var _model = null;          // { unit:'frame'|'sec', duration, fps, rows:[...] }
    var _pxPerUnit = 0;         // 0 이면 폭에 맞춤
    var _changedOnly = true;
    var _playStart = 0;         // UI 미리보기 시작 시각 (재생 위치 표시용)
    var _raf = null;
    var $view = null;

    try {
        _active = localStorage.getItem(MODE_KEY) === 'keyframe';
        _changedOnly = localStorage.getItem(CHANGED_KEY) !== '0';
    } catch (e) { }

    function esc(t) { return $('<div>').text(t == null ? '' : String(t)).html(); }
    function r2(v) { return Math.round(v * 100) / 100; }

    // ---- 데이터 → 행 -------------------------------------------------------

    function findByActionTag(root, tag) {
        if (!root) return null;
        if (root.getActionTag && root.getActionTag() === tag) return root;
        var kids = root.getChildren();
        for (var i = 0; i < kids.length; i++) {
            var f = findByActionTag(kids[i], tag);
            if (f) return f;
        }
        return null;
    }

    // 키 하나에서 보여줄 값과, 앞 키와 달라진 항목
    function describe(fields, frame, prev) {
        var lines = [], changed = [];
        fields.forEach(function (f) {
            var v = f.get(frame);
            if (v == null) return;
            var diff = !prev || f.get(prev) !== v;
            if (diff) changed.push(f.label);
            lines.push((diff ? '● ' : '  ') + f.label + '  ' + v);
        });
        return { lines: lines, changed: changed };
    }

    var UI_FIELDS = [
        { label: '위치', get: function (f) { return f.positionx == null ? null : r2(f.positionx) + ', ' + r2(f.positiony); } },
        { label: '스케일', get: function (f) { return f.scalex == null ? null : r2(f.scalex) + ' × ' + r2(f.scaley); } },
        { label: '회전', get: function (f) { return f.rotation == null ? null : r2(f.rotation); } },
        { label: '투명도', get: function (f) { return f.opacity == null ? null : f.opacity; } },
        { label: '색', get: function (f) { return f.colorr == null ? null : f.colorr + ',' + f.colorg + ',' + f.colorb; } },
        { label: '보이기', get: function (f) { return f.visible == null ? null : (f.visible ? 'on' : 'off'); } }
    ];

    var AR_FIELDS = [
        { label: '위치', get: function (f) { return r2(f.x) + ', ' + r2(f.y); } },
        { label: '스케일', get: function (f) { return r2(f.scaleX) + ' × ' + r2(f.scaleY); } },
        { label: '기울기', get: function (f) { return r2(f.skewX) + ', ' + r2(f.skewY); } },
        { label: '이미지', get: function (f) { return f.displayIndex; } },
        { label: '색', get: function (f) { return f.isUseColorInfo && f.color ? f.color.r + ',' + f.color.g + ',' + f.color.b + ' a' + f.color.a : null; } },
        { label: '이벤트', get: function (f) { return f.strEvent || f.event || null; } }
    ];

    function rowFromFrames(label, sub, frames, fields, timeOf, frameOf, extra) {
        var keys = [];
        var anyChange = false;
        frames.forEach(function (fr, i) {
            var d = describe(fields, fr, i > 0 ? frames[i - 1] : null);
            if (i > 0 && d.changed.length) anyChange = true;
            keys.push({ time: timeOf(fr), frame: frameOf(fr), lines: d.lines, changed: i === 0 ? [] : d.changed, event: !!(fr.strEvent || fr.event) });
        });
        return $.extend({ label: label, sub: sub, keys: keys, changes: anyChange }, extra || {});
    }

    function buildUI(owner, name) {
        var raw = owner.actionUrl && cc.loader.cache[owner.actionUrl];
        var clip = raw && raw.animation && (raw.animation.actionlist || []).filter(function (a) { return a.name === name; })[0];
        if (!clip) return null;
        var unit = clip.unittime > 0 ? clip.unittime : 1 / 60;
        var rows = [], maxFrame = 0;
        (clip.actionnodelist || []).forEach(function (an) {
            var frames = (an.actionframelist || []).slice().sort(function (a, b) { return a.frameid - b.frameid; });
            if (frames.length === 0) return;
            maxFrame = Math.max(maxFrame, frames[frames.length - 1].frameid);
            var node = findByActionTag(owner.ui, an.ActionTag);
            var cls = node && window.MainLayerInstance && window.MainLayerInstance._nodeClassLabel ? window.MainLayerInstance._nodeClassLabel(node) : '';
            rows.push(rowFromFrames(node ? node.getName() : 'ActionTag ' + an.ActionTag, cls,
                frames, UI_FIELDS, function (f) { return f.frameid * unit; }, function (f) { return f.frameid; }, { node: node }));
        });
        return { kind: 'ui', unit: 'frame', fps: 1 / unit, duration: maxFrame * unit, maxFrame: maxFrame, rows: rows };
    }

    function buildAR(owner, name) {
        var animation = owner.armature.getAnimation();
        var data = animation._animationData;
        var movement = data && data.movementDataDic[name];
        if (!movement) return null;
        var fps = (data.frameRate || 60) * (movement.scale || 1);
        var rows = [];
        var dic = movement.movBoneDataDic || {};
        Object.keys(dic).forEach(function (bone) {
            var frames = (dic[bone].frameList || []).slice().sort(function (a, b) { return a.frameID - b.frameID; });
            if (frames.length === 0) return;
            rows.push(rowFromFrames(bone, '', frames, AR_FIELDS, function (f) { return f.frameID / fps; }, function (f) { return f.frameID; }));
        });
        return { kind: 'armature', unit: 'frame', fps: fps, duration: movement.duration / fps, maxFrame: movement.duration, rows: rows };
    }

    function spineTimelineName(tl, sd) {
        var type = (tl.constructor && tl.constructor.name || 'Timeline').replace(/Timeline$/, '');
        if (tl.boneIndex != null && sd.bones[tl.boneIndex]) return { label: sd.bones[tl.boneIndex].name, sub: type };
        if (tl.slotIndex != null && sd.slots[tl.slotIndex]) return { label: sd.slots[tl.slotIndex].name, sub: type };
        return { label: type, sub: '' };
    }

    function buildSpine(owner, name) {
        var sd = owner.spine._skeleton.data;
        var anim = sd.findAnimation(name);
        if (!anim) return null;
        var rows = [];
        (anim.timelines || []).forEach(function (tl) {
            var count = tl.getFrameCount ? tl.getFrameCount() : 0;
            if (!count || !tl.frames) return;
            var stride = Math.max(1, Math.round(tl.frames.length / count));
            var nm = spineTimelineName(tl, sd);
            var isEvent = typeof spine !== 'undefined' && spine.EventTimeline && tl instanceof spine.EventTimeline;
            var keys = [];
            for (var i = 0; i < count; i++) {
                var t = tl.frames[i * stride];
                var lines = [nm.sub + ' 키'];
                if (isEvent && tl.events[i]) lines = ['이벤트  ' + tl.events[i].data.name];
                if (tl.attachmentNames && tl.attachmentNames[i] !== undefined) lines = ['이미지  ' + (tl.attachmentNames[i] || '(없음)')];
                keys.push({ time: t, frame: null, lines: lines, changed: i > 0 ? [nm.sub] : [], event: isEvent });
            }
            rows.push({ label: nm.label, sub: nm.sub, keys: keys, changes: count > 1 || isEvent });
        });
        return { kind: 'spine', unit: 'sec', fps: 30, duration: anim.duration, maxFrame: Math.ceil(anim.duration * 30), rows: rows };
    }

    function build() {
        if (!_owner || !_animName) return null;
        try {
            if (_type === 'action' && _owner.ui) return buildUI(_owner, _animName);
            if (_type === 'armature' && _owner.armature) return buildAR(_owner, _animName);
            if (_type === 'spine' && _owner.spine) return buildSpine(_owner, _animName);
        } catch (e) {
            console.warn('[KeyframeView] 키프레임을 읽지 못했습니다:', e);
        }
        return null;
    }

    // ---- 그리기 -----------------------------------------------------------

    function unitsOf(m) { return m.unit === 'frame' ? Math.max(1, m.maxFrame) : Math.max(0.1, m.duration); }
    function posOf(m, key) { return m.unit === 'frame' ? key.frame : key.time; }

    function render() {
        if (!$view) return;
        var $info = $('#kfInfo');
        _model = build();
        if (!_owner || !_animName) {
            $view.html('<div class="kf-empty">왼쪽 목록에서 애니메이션을 누르면 키프레임이 보입니다.</div>');
            $info.text('');
            return;
        }
        if (!_model) {
            $view.html('<div class="kf-empty">' + esc(_animName) + ' 의 키프레임 데이터를 읽을 수 없습니다.</div>');
            $info.text('');
            return;
        }
        var m = _model;
        var rows = _changedOnly ? m.rows.filter(function (r) { return r.changes; }) : m.rows;
        var hidden = m.rows.length - rows.length;
        $info.text(_animName + ' · ' + (m.unit === 'frame' ? m.maxFrame + '프레임 · ' : '') + m.duration.toFixed(2) + 's · ' + rows.length + '줄' + (hidden ? ' (변화 없음 ' + hidden + '줄 숨김)' : ''));

        var total = unitsOf(m);
        var trackW = Math.max(200, ($view.width() || 600) - LABEL_W - 24);
        var px = _pxPerUnit || Math.max(m.unit === 'frame' ? 3 : 60, trackW / total);
        var width = Math.ceil(total * px) + PAD * 2;

        // 눈금: 프레임이면 5/10 단위, 초면 0.1/0.5 단위
        var step = m.unit === 'frame' ? (px >= 12 ? 1 : px >= 5 ? 5 : 10) : (px >= 300 ? 0.1 : 0.5);
        var major = m.unit === 'frame' ? (step === 1 ? 5 : step * 2) : 1;
        var ticks = '';
        for (var u = 0; u <= total + 1e-6; u += step) {
            var isMajor = Math.abs(u / major - Math.round(u / major)) < 1e-6;
            ticks += '<span class="kf-tick' + (isMajor ? ' major' : '') + '" style="left:' + (PAD + u * px) + 'px">' +
                (isMajor ? (m.unit === 'frame' ? Math.round(u) : r2(u) + 's') : '') + '</span>';
        }

        var html = '<div class="kf-grid" style="--kf-w:' + width + 'px">' +
            '<div class="kf-corner"><label class="kf-filter"><input type="checkbox" id="kfChangedOnly"' + (_changedOnly ? ' checked' : '') + '> 변화 있는 것만</label></div>' +
            '<div class="kf-ruler"><div class="kf-ruler-inner" style="width:' + width + 'px">' + ticks + '</div></div>';
        rows.forEach(function (row, ri) {
            var keysHtml = '';
            for (var k = 0; k < row.keys.length; k++) {
                var key = row.keys[k], next = row.keys[k + 1];
                var x = PAD + posOf(m, key) * px;
                if (next && next.changed.length) {
                    keysHtml += '<span class="kf-span" style="left:' + x + 'px;width:' + Math.max(0, (posOf(m, next) - posOf(m, key)) * px) + 'px"></span>';
                }
                var at = m.unit === 'frame' ? key.frame + 'f · ' + key.time.toFixed(2) + 's' : key.time.toFixed(3) + 's';
                var tip = row.label + ' · ' + at + '\n' + key.lines.join('\n');
                keysHtml += '<button type="button" class="kf-key' + (key.changed.length || k === 0 ? ' filled' : '') + (key.event ? ' event' : '') + '"' +
                    ' style="left:' + x + 'px" data-time="' + key.time + '" data-frame="' + (key.frame == null ? '' : key.frame) + '" data-tip="' + esc(tip) + '" aria-label="' + esc(row.label + ' ' + at) + '"></button>';
            }
            html += '<button type="button" class="kf-label" data-row="' + ri + '"' + (row.node ? '' : ' disabled') + ' title="' + esc(row.label + (row.sub ? ' · ' + row.sub : '')) + '">' +
                '<span class="kf-label-name">' + esc(row.label) + '</span>' + (row.sub ? '<span class="kf-label-sub">' + esc(row.sub) + '</span>' : '') + '</button>' +
                '<div class="kf-track"><div class="kf-track-inner" style="width:' + width + 'px">' + keysHtml + '</div></div>';
        });
        html += '<div class="kf-playhead" hidden></div></div>';
        if (rows.length === 0) html += '<div class="kf-empty">' + (hidden ? '값이 바뀌는 키가 없습니다. "변화 있는 것만" 을 끄면 모든 줄이 보입니다.' : '키프레임이 없습니다.') + '</div>';
        $view.html(html);
        $view.data('rows', rows).data('px', px);
        var grid = $view.find('.kf-grid')[0];
        if (grid) $view.find('.kf-playhead').css('height', grid.scrollHeight + 'px');
        startPlayhead();
    }

    // ---- 재생 위치 ---------------------------------------------------------

    function currentTime() {
        if (!_owner || !_model) return null;
        if (_type === 'armature') {
            var a = _owner.armature.getAnimation();
            if (a.getCurrentMovementID() !== _animName) return null;
            return a.getCurrentFrameIndex() / _model.fps;
        }
        if (_type === 'spine') {
            var e = _owner.spine.getCurrent(0);
            if (!e || !e.animation || e.animation.name !== _animName) return null;
            var d = _model.duration || 1;
            return e.loop ? (e.trackTime % d) : Math.min(e.trackTime, d);
        }
        if (_type === 'action' && _playStart) {
            return Math.min((Date.now() - _playStart) / 1000, _model.duration);
        }
        return null;
    }

    function startPlayhead() {
        if (_raf) cancelAnimationFrame(_raf);
        var tick = function () {
            _raf = null;
            if (!_active || !$view || !_model) return;
            var t = currentTime();
            var $ph = $view.find('.kf-playhead');
            if (t == null) { $ph.prop('hidden', true); }
            else {
                var px = $view.data('px');
                var u = _model.unit === 'frame' ? t * _model.fps : t;
                $ph.prop('hidden', false).css('left', (LABEL_W + PAD + u * px) + 'px');   // 스크롤 영역 안의 좌표
            }
            _raf = requestAnimationFrame(tick);
        };
        _raf = requestAnimationFrame(tick);
    }

    // 키 위치로 이동해 멈춘다
    function seek(time, frame) {
        if (!_owner) return;
        try {
            if (_type === 'action') {
                var action = ccs.actionManager.getActionByName(_owner.actionUrl, _animName);
                if (action) {
                    action.stop();
                    action.updateToFrameByTime(frame * (1 / _model.fps));
                }
                _playStart = 0;
            } else if (_type === 'armature') {
                var a = _owner.armature.getAnimation();
                if (a.getCurrentMovementID() !== _animName) a.play(_animName, -1);
                a.gotoAndPause(frame);
            } else if (_type === 'spine') {
                var e = _owner.spine.getCurrent(0);
                if (!e || !e.animation || e.animation.name !== _animName) e = _owner.spine.setAnimation(0, _animName, true);
                e.trackTime = time;
                e.timeScale = 0;
            }
        } catch (err) {
            console.warn('[KeyframeView] 이동 실패:', err);
        }
        if (typeof Inspector !== 'undefined') Inspector.refresh();
    }

    // ---- 모드 전환 ---------------------------------------------------------

    function setActive(on) {
        _active = !!on;
        try { localStorage.setItem(MODE_KEY, _active ? 'keyframe' : 'sequence'); } catch (e) { }
        $('.seq-main').toggleClass('kf-mode', _active);
        $('.seq-view-btn').each(function () {
            var mine = $(this).data('view') === (_active ? 'keyframe' : 'sequence');
            $(this).toggleClass('active', mine).attr('aria-pressed', String(mine));
        });
        if (_active) render();
        else if (_raf) { cancelAnimationFrame(_raf); _raf = null; }
    }

    function zoom(dir) {
        var cur = $view.data('px') || 10;
        _pxPerUnit = Math.max(1, Math.min(400, cur * (dir > 0 ? 1.5 : 1 / 1.5)));
        render();
    }

    function init() {
        $view = $('<div id="keyframe-view" class="kf-view" aria-label="키프레임"></div>').insertAfter('#timeline-editor');
        $('#timeline-top-bar .seq-spacer').before(
            '<div class="seq-view-switch" role="group" aria-label="보기">' +
            '<button type="button" class="seq-view-btn" data-view="sequence">시퀀스</button>' +
            '<button type="button" class="seq-view-btn" data-view="keyframe">키프레임</button>' +
            '</div><span id="kfInfo" class="kf-info"></span>');
        $(document).on('click', '.seq-view-btn', function () { setActive($(this).data('view') === 'keyframe'); });

        // 확대/축소 버튼은 키프레임 보기일 때 이쪽 배율을 바꾼다 (시퀀스 쪽 처리보다 먼저 받는다)
        ['zoom-in-btn', 'zoom-out-btn'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener('click', function (e) {
                if (!_active) return;
                e.stopImmediatePropagation();
                zoom(id === 'zoom-in-btn' ? 1 : -1);
            }, true);
        });

        $view.on('click', '.kf-key', function () {
            var f = this.getAttribute('data-frame');
            seek(parseFloat(this.getAttribute('data-time')), f === '' ? null : parseInt(f, 10));
            $view.find('.kf-key.current').removeClass('current');
            $(this).addClass('current');
        });
        $view.on('click', '.kf-label', function () {
            var row = ($view.data('rows') || [])[parseInt(this.getAttribute('data-row'), 10)];
            if (row && row.node && window.MainLayerInstance) window.MainLayerInstance.selectNodeInHierarchy(row.node);
        });
        $view.on('change', '#kfChangedOnly', function () {
            _changedOnly = this.checked;
            try { localStorage.setItem(CHANGED_KEY, _changedOnly ? '1' : '0'); } catch (e) { }
            render();
        });
        if (window.ResizeObserver) {
            var last = 0;
            new ResizeObserver(function () {
                var w = $view.width();
                if (_active && !_pxPerUnit && Math.abs(w - last) > 20) { last = w; render(); }
            }).observe($view[0]);
        }
        setActive(_active);
    }

    return {
        init: init,
        isActive: function () { return _active; },
        // 목록에서 애니메이션을 고르면(미리보기) 호출
        setAnimation: function (owner, animName, type) {
            var changed = owner !== _owner || animName !== _animName;
            _owner = owner || null;
            _animName = animName || null;
            _type = type || null;
            _playStart = type === 'action' ? Date.now() : 0;
            if (changed) _pxPerUnit = 0;
            if (_active) render();
        },
        // 인스턴스 선택이 바뀌면 비운다
        clear: function () {
            _owner = null; _animName = null; _type = null; _model = null;
            if (_active) render();
        }
    };
})();
