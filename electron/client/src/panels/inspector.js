/**
 * Inspector (Properties 패널)
 * 노드 타입별 "속성 정의 표(SECTIONS)" 로 섹션을 구성한다.
 *  - 노드가 바뀔 때만 DOM 을 새로 만들고, 값이 바뀌면 refresh() 로 값만 갱신한다.
 *    (입력 중인 칸은 덮어쓰지 않는다)
 *  - DraggableNode(인스턴스 래퍼)를 고르면 내용물(Spine / Armature / 이미지)의 섹션도 함께 보여준다.
 */
var Inspector = (function () {
    var COLLAPSE_KEY = 'inspectorCollapsedSections';

    var _node = null;
    var _sections = [];      // 현재 노드에 적용된 섹션
    var _liveTimer = null;   // 재생 상태 등 실시간 값 갱신
    var _collapsed = {};
    try { _collapsed = JSON.parse(localStorage.getItem(COLLAPSE_KEY)) || {}; } catch (e) { _collapsed = {}; }

    // ---- 유틸 ------------------------------------------------------------

    function esc(text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    }

    function has(obj, fn) {
        return !!obj && typeof obj[fn] === 'function';
    }

    function isWidget(n) {
        return typeof ccui !== 'undefined' && n instanceof ccui.Widget;
    }

    function is(n, ctorPath) {
        var parts = ctorPath.split('.');
        var ctor = window[parts[0]];
        for (var i = 1; ctor && i < parts.length; i++) ctor = ctor[parts[i]];
        return typeof ctor === 'function' && n instanceof ctor;
    }

    // DraggableNode 면 내용물, 아니면 자기 자신
    function spineOf(n) { return n instanceof DraggableNode ? n.spine : (is(n, 'sp.SkeletonAnimation') ? n : null); }
    function armatureOf(n) { return n instanceof DraggableNode ? n.armature : (is(n, 'ccs.Armature') ? n : null); }
    function spriteOf(n) { return n instanceof DraggableNode ? n.image : (n instanceof cc.Sprite && !isWidget(n) ? n : null); }

    function round(v, digits) {
        var p = Math.pow(10, digits);
        return Math.round(v * p) / p;
    }

    function fmt(v, step) {
        if (typeof v !== 'number' || isNaN(v)) return v == null ? '' : String(v);
        var digits = step && step < 1 ? String(step).split('.')[1].length : 0;
        return String(round(v, Math.max(digits, 0)));
    }

    function colorToHex(c) {
        if (!c) return '#ffffff';
        var h = function (v) { return ('0' + (v | 0).toString(16)).slice(-2); };
        return '#' + h(c.r) + h(c.g) + h(c.b);
    }

    function hexToColor(hex, alpha) {
        return cc.color(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16), alpha == null ? 255 : alpha);
    }

    function texTypeLabel(t) {
        return t === ccui.Widget.PLIST_TEXTURE ? 'PLIST (SpriteFrame)' : '개별 파일';
    }

    function className(n) {
        if (n instanceof DraggableNode) return '인스턴스 (' + (n.assetType || '?') + ')';
        var checks = [
            ['ccui.Button', 'ccui.Button'], ['ccui.CheckBox', 'ccui.CheckBox'], ['ccui.ImageView', 'ccui.ImageView'],
            ['ccui.TextBMFont', 'ccui.TextBMFont'], ['ccui.TextAtlas', 'ccui.TextAtlas'], ['ccui.TextField', 'ccui.TextField'],
            ['ccui.Text', 'ccui.Text'], ['ccui.LoadingBar', 'ccui.LoadingBar'], ['ccui.Slider', 'ccui.Slider'],
            ['ccui.ListView', 'ccui.ListView'], ['ccui.PageView', 'ccui.PageView'], ['ccui.ScrollView', 'ccui.ScrollView'],
            ['ccui.Layout', 'ccui.Layout'], ['ccui.Widget', 'ccui.Widget'],
            ['sp.SkeletonAnimation', 'sp.SkeletonAnimation'], ['ccs.Armature', 'ccs.Armature'],
            ['cc.LabelBMFont', 'cc.LabelBMFont'], ['cc.LabelTTF', 'cc.LabelTTF'], ['cc.Sprite', 'cc.Sprite']
        ];
        for (var i = 0; i < checks.length; i++) {
            if (is(n, checks[i][0])) return checks[i][1];
        }
        return 'cc.Node';
    }

    function nodePath(n) {
        var names = [];
        for (var p = n; p && !(p instanceof DraggableNode) && !(p instanceof MainLayer); p = p.getParent()) {
            names.unshift(p.getName() || 'Unnamed');
        }
        return names.join('/');
    }

    // 스프라이트 프레임 이름 → 그 프레임이 들어 있는 plist 파일명
    function findPlistOfFrame(frameName) {
        for (var key in Loader.plistFiles) {
            var conf = Loader.plistFiles[key];
            if (conf && conf.frames && conf.frames[frameName]) return key + '.plist';
        }
        return null;
    }

    // ---- 속성 정의 표 ------------------------------------------------------
    // type: xy | number | text | textarea | bool | color | range | select | ro
    // get(n) / set(n, v) : xy 는 {x, y} 를 주고받는다

    var SECTIONS = [
        {
            id: 'transform', title: 'Transform',
            applies: function () { return true; },
            props: [
                { key: 'position', label: 'Position', type: 'xy', step: 0.01,
                    get: function (n) { return n.getPosition(); },
                    set: function (n, v) { n.setPosition(v.x, v.y); } },
                { key: 'worldPos', label: 'World Pos', type: 'ro',
                    get: function (n) {
                        var parent = n.getParent();
                        var p = parent ? parent.convertToWorldSpace(n.getPosition()) : n.getPosition();
                        return '(' + round(p.x, 2) + ', ' + round(p.y, 2) + ')';
                    } },
                { key: 'anchor', label: 'Anchor', type: 'xy', step: 0.01,
                    get: function (n) { return n.getAnchorPoint(); },
                    set: function (n, v) { n.setAnchorPoint(cc.p(v.x, v.y)); } },
                { key: 'size', label: 'Size', type: 'xy', axes: ['W', 'H'], step: 1,
                    readOnly: function (n) { return !isWidget(n); },
                    get: function (n) { var s = n.getContentSize(); return { x: s.width, y: s.height }; },
                    set: function (n, v) { n.setContentSize(cc.size(v.x, v.y)); } },
                { key: 'scale', label: 'Scale', type: 'xy', step: 0.01,
                    get: function (n) { return { x: n.getScaleX(), y: n.getScaleY() }; },
                    set: function (n, v) { n.setScaleX(v.x); n.setScaleY(v.y); } },
                { key: 'rotation', label: 'Rotation', type: 'number', step: 0.1,
                    get: function (n) { return n.getRotation(); },
                    set: function (n, v) { n.setRotation(v); } },
                { key: 'skew', label: 'Skew', type: 'xy', step: 0.1,
                    get: function (n) { return { x: n.getSkewX(), y: n.getSkewY() }; },
                    set: function (n, v) { n.setSkewX(v.x); n.setSkewY(v.y); } }
            ]
        },
        {
            id: 'rendering', title: 'Rendering',
            applies: function () { return true; },
            props: [
                { key: 'opacity', label: 'Opacity', type: 'range', min: 0, max: 255,
                    get: function (n) { return n.getOpacity(); },
                    set: function (n, v) { n.setOpacity(v); } },
                { key: 'color', label: 'Color', type: 'color',
                    get: function (n) { return colorToHex(n.getColor()); },
                    set: function (n, v) { n.setColor(hexToColor(v)); } },
                { key: 'zOrder', label: 'Z-Order', type: 'number', step: 1, refreshHierarchy: true,
                    get: function (n) { return n.getLocalZOrder(); },
                    set: function (n, v) { n.setLocalZOrder(Math.round(v)); } },
                { key: 'flipX', label: 'Flip X', type: 'bool',
                    applies: function (n) { return has(n, 'isFlippedX') && has(n, 'setFlippedX'); },
                    get: function (n) { return n.isFlippedX(); },
                    set: function (n, v) { n.setFlippedX(v); } },
                { key: 'flipY', label: 'Flip Y', type: 'bool',
                    applies: function (n) { return has(n, 'isFlippedY') && has(n, 'setFlippedY'); },
                    get: function (n) { return n.isFlippedY(); },
                    set: function (n, v) { n.setFlippedY(v); } },
                { key: 'cascadeOpacity', label: 'Cascade Opacity', type: 'bool',
                    get: function (n) { return n.isCascadeOpacityEnabled(); },
                    set: function (n, v) { n.setCascadeOpacityEnabled(v); } },
                { key: 'cascadeColor', label: 'Cascade Color', type: 'bool',
                    get: function (n) { return n.isCascadeColorEnabled(); },
                    set: function (n, v) { n.setCascadeColorEnabled(v); } }
            ]
        },
        {
            id: 'widget', title: 'Widget (ccui)',
            applies: isWidget,
            props: [
                { key: 'touch', label: 'Touch Enabled', type: 'bool',
                    get: function (n) { return n.isTouchEnabled(); },
                    set: function (n, v) { n.setTouchEnabled(v); } },
                { key: 'sizeType', label: 'Size Type', type: 'select',
                    options: function () { return [[ccui.Widget.SIZE_ABSOLUTE, 'Absolute'], [ccui.Widget.SIZE_PERCENT, 'Percent']]; },
                    get: function (n) { return n.getSizeType(); },
                    set: function (n, v) { n.setSizeType(parseInt(v, 10)); } },
                { key: 'sizePercent', label: 'Size %', type: 'xy', axes: ['W', 'H'], step: 0.01,
                    get: function (n) { var p = n.getSizePercent(); return { x: p.x * 100, y: p.y * 100 }; },
                    set: function (n, v) { n.setSizePercent(cc.p(v.x / 100, v.y / 100)); } },
                { key: 'positionType', label: 'Position Type', type: 'select',
                    options: function () { return [[ccui.Widget.POSITION_ABSOLUTE, 'Absolute'], [ccui.Widget.POSITION_PERCENT, 'Percent']]; },
                    get: function (n) { return n.getPositionType(); },
                    set: function (n, v) { n.setPositionType(parseInt(v, 10)); } },
                { key: 'positionPercent', label: 'Position %', type: 'xy', step: 0.01,
                    get: function (n) { var p = n.getPositionPercent(); return { x: p.x * 100, y: p.y * 100 }; },
                    set: function (n, v) { n.setPositionPercent(cc.p(v.x / 100, v.y / 100)); } },
                { key: 'ignoreSize', label: 'Ignore Size', type: 'bool',
                    get: function (n) { return n.isIgnoreContentAdaptWithSize(); },
                    set: function (n, v) { n.ignoreContentAdaptWithSize(v); } },
                { key: 'actionTag', label: 'Action Tag', type: 'ro',
                    get: function (n) { return n.getActionTag(); } },
                { key: 'margin', label: 'Margin', type: 'ro',
                    get: function (n) {
                        var lp = n.getLayoutParameter();
                        var m = lp && lp.getMargin ? lp.getMargin() : null;
                        return m ? 'L' + m.left + ' T' + m.top + ' R' + m.right + ' B' + m.bottom : '—';
                    } }
            ]
        },
        {
            id: 'text', title: 'Text',
            applies: function (n) { return has(n, 'getString') && has(n, 'setString') && !(n instanceof DraggableNode); },
            props: [
                { key: 'string', label: 'Text', type: 'textarea',
                    get: function (n) { return n.getString(); },
                    set: function (n, v) { n.setString(v); } },
                { key: 'fontName', label: 'Font', type: 'text',
                    applies: function (n) { return is(n, 'ccui.Text') && has(n, 'getFontName'); },
                    get: function (n) { return n.getFontName(); },
                    set: function (n, v) { n.setFontName(v); } },
                { key: 'fontSize', label: 'Font Size', type: 'number', step: 1,
                    applies: function (n) { return is(n, 'ccui.Text') && has(n, 'getFontSize'); },
                    get: function (n) { return n.getFontSize(); },
                    set: function (n, v) { n.setFontSize(v); } },
                { key: 'textColor', label: 'Text Color', type: 'color',
                    applies: function (n) { return is(n, 'ccui.Text') && has(n, 'getTextColor'); },
                    get: function (n) { return colorToHex(n.getTextColor()); },
                    set: function (n, v) { n.setTextColor(hexToColor(v)); } },
                { key: 'hAlign', label: 'H Align', type: 'select',
                    applies: function (n) { return is(n, 'ccui.Text'); },
                    options: function () { return [[cc.TEXT_ALIGNMENT_LEFT, 'Left'], [cc.TEXT_ALIGNMENT_CENTER, 'Center'], [cc.TEXT_ALIGNMENT_RIGHT, 'Right']]; },
                    get: function (n) { return n.getTextHorizontalAlignment(); },
                    set: function (n, v) { n.setTextHorizontalAlignment(parseInt(v, 10)); } },
                { key: 'vAlign', label: 'V Align', type: 'select',
                    applies: function (n) { return is(n, 'ccui.Text'); },
                    options: function () { return [[cc.VERTICAL_TEXT_ALIGNMENT_TOP, 'Top'], [cc.VERTICAL_TEXT_ALIGNMENT_CENTER, 'Center'], [cc.VERTICAL_TEXT_ALIGNMENT_BOTTOM, 'Bottom']]; },
                    get: function (n) { return n.getTextVerticalAlignment(); },
                    set: function (n, v) { n.setTextVerticalAlignment(parseInt(v, 10)); } },
                { key: 'fntFile', label: 'FNT', type: 'resource',
                    applies: function (n) { return is(n, 'ccui.TextBMFont'); },
                    get: function (n) {
                        var name = n._fntFileName ? String(n._fntFileName).split(/[\\\/]/).pop() : '';
                        return name ? { label: name, open: { fileName: name, kind: 'fnt' } } : { label: '—' };
                    } }
            ]
        },
        {
            id: 'button', title: 'Button',
            applies: function (n) { return is(n, 'ccui.Button'); },
            props: [
                { key: 'titleText', label: 'Title', type: 'text',
                    get: function (n) { return n.getTitleText(); },
                    set: function (n, v) { n.setTitleText(v); } },
                { key: 'titleColor', label: 'Title Color', type: 'color',
                    get: function (n) { return colorToHex(n.getTitleColor()); },
                    set: function (n, v) { n.setTitleColor(hexToColor(v)); } },
                { key: 'titleFontSize', label: 'Title Size', type: 'number', step: 1,
                    get: function (n) { return n.getTitleFontSize(); },
                    set: function (n, v) { n.setTitleFontSize(v); } }
            ]
        },
        {
            id: 'texture', title: '텍스처',
            applies: function (n) { return textureEntries(n).length > 0; },
            custom: renderTextureCards,
            props: [
                { key: 'scale9', label: 'Scale9', type: 'bool',
                    applies: function (n) { return has(n, 'isScale9Enabled') && has(n, 'setScale9Enabled'); },
                    get: function (n) { return n.isScale9Enabled(); },
                    set: function (n, v) { n.setScale9Enabled(v); } },
                { key: 'capInsets', label: 'Cap Insets', type: 'ro',
                    applies: function (n) { return has(n, 'getCapInsets'); },
                    get: function (n) { var r = n.getCapInsets(); return r ? 'x' + r.x + ' y' + r.y + ' w' + r.width + ' h' + r.height : '—'; } },
                { key: 'percent', label: 'Percent', type: 'range', min: 0, max: 100,
                    applies: function (n) { return (is(n, 'ccui.LoadingBar') || is(n, 'ccui.Slider')) && has(n, 'getPercent'); },
                    get: function (n) { return n.getPercent(); },
                    set: function (n, v) { n.setPercent(v); } }
            ]
        },
        {
            id: 'layout', title: 'Layout',
            applies: function (n) { return is(n, 'ccui.Layout'); },
            props: [
                { key: 'clipping', label: 'Clipping', type: 'bool',
                    get: function (n) { return n.isClippingEnabled(); },
                    set: function (n, v) { n.setClippingEnabled(v); } },
                { key: 'bgColorType', label: 'BG Color', type: 'select',
                    options: function () { return [[ccui.Layout.BG_COLOR_NONE, 'None'], [ccui.Layout.BG_COLOR_SOLID, 'Solid'], [ccui.Layout.BG_COLOR_GRADIENT, 'Gradient']]; },
                    get: function (n) { return n.getBackGroundColorType(); },
                    set: function (n, v) { n.setBackGroundColorType(parseInt(v, 10)); } },
                { key: 'bgColor', label: 'BG 색', type: 'color',
                    get: function (n) { return colorToHex(n.getBackGroundColor()); },
                    set: function (n, v) { n.setBackGroundColor(hexToColor(v)); } },
                { key: 'bgOpacity', label: 'BG 투명도', type: 'range', min: 0, max: 255,
                    get: function (n) { return n.getBackGroundColorOpacity(); },
                    set: function (n, v) { n.setBackGroundColorOpacity(v); } },
                { key: 'layoutType', label: 'Layout Type', type: 'ro',
                    get: function (n) { return ['Absolute', 'Vertical', 'Horizontal', 'Relative'][n.getLayoutType()] || n.getLayoutType(); } },
                { key: 'innerSize', label: 'Inner Size', type: 'ro',
                    applies: function (n) { return has(n, 'getInnerContainerSize'); },
                    get: function (n) { var s = n.getInnerContainerSize(); return round(s.width, 1) + ' × ' + round(s.height, 1); } },
                { key: 'bounce', label: 'Bounce', type: 'bool',
                    applies: function (n) { return has(n, 'isBounceEnabled'); },
                    get: function (n) { return n.isBounceEnabled(); },
                    set: function (n, v) { n.setBounceEnabled(v); } }
            ]
        },
        {
            id: 'spine', title: 'Spine',
            applies: function (n) { return !!spineOf(n); },
            target: spineOf,
            props: [
                { key: 'skin', label: 'Skin', type: 'select',
                    options: function (s) { return (s._skeleton.data.skins || []).map(function (k) { return [k.name, k.name]; }); },
                    get: function (s) { return s._skeleton.skin ? s._skeleton.skin.name : 'default'; },
                    set: function (s, v) { s.setSkin(v); s.setSlotsToSetupPose(); } },
                { key: 'animation', label: 'Animation', type: 'select', live: true,
                    options: function (s) { return [['', '(없음)']].concat((s._skeleton.data.animations || []).map(function (a) { return [a.name, a.name + ' · ' + round(a.duration, 2) + 's']; })); },
                    get: function (s) { var t = s.getCurrent(0); return t && t.animation ? t.animation.name : ''; },
                    set: function (s, v) {
                        if (!v) { s.clearTrack(0); s.setToSetupPose(); return; }
                        s.setAnimation(0, v, Inspector._spineLoop !== false);
                    } },
                { key: 'loop', label: 'Loop', type: 'bool', live: true,
                    get: function (s) { var t = s.getCurrent(0); return t ? !!t.loop : Inspector._spineLoop !== false; },
                    set: function (s, v) { Inspector._spineLoop = v; var t = s.getCurrent(0); if (t) t.loop = v; } },
                { key: 'timeScale', label: 'Time Scale', type: 'number', step: 0.01,
                    get: function (s) { return s.getTimeScale(); },
                    set: function (s, v) { s.setTimeScale(v); } },
                { key: 'pma', label: 'PMA', type: 'bool',
                    get: function (s) { return s.isPremultipliedAlpha(); },
                    set: function (s, v) { s.setPremultipliedAlpha(v); } },
                { key: 'debugBones', label: 'Debug Bones', type: 'bool',
                    get: function (s) { return s.getDebugBonesEnabled(); },
                    set: function (s, v) { s.setDebugBonesEnabled(v); } },
                { key: 'debugSlots', label: 'Debug Slots', type: 'bool',
                    get: function (s) { return s.getDebugSlotsEnabled(); },
                    set: function (s, v) { s.setDebugSlotsEnabled(v); } },
                { key: 'track', label: 'Track 0', type: 'progress', live: true,
                    get: function (s) {
                        var t = s.getCurrent(0);
                        if (!t || !t.animation) return { ratio: 0, text: '재생 중 아님' };
                        var dur = t.animation.duration || 0;
                        var time = t.trackTime != null ? t.trackTime : (t.time || 0);
                        var cur = dur > 0 ? (t.loop ? time % dur : Math.min(time, dur)) : 0;
                        return { ratio: dur > 0 ? cur / dur : 0, text: round(cur, 2) + 's / ' + round(dur, 2) + 's' };
                    } }
            ]
        },
        {
            id: 'spineInfo', title: '스켈레톤 정보',
            applies: function (n) { return !!spineOf(n); },
            target: spineOf,
            props: [
                { key: 'version', label: 'Spine', type: 'ro', get: function (s) { return s._skeleton.data.version || '—'; } },
                { key: 'bones', label: 'Bones', type: 'ro', get: function (s) { return s._skeleton.data.bones.length; } },
                { key: 'slots', label: 'Slots', type: 'ro', get: function (s) { return s._skeleton.data.slots.length; } },
                { key: 'skins', label: 'Skins', type: 'ro', get: function (s) { return (s._skeleton.data.skins || []).map(function (k) { return k.name; }).join(', '); } },
                { key: 'anims', label: 'Animations', type: 'ro', get: function (s) { return (s._skeleton.data.animations || []).length; } },
                { key: 'events', label: 'Events', type: 'ro', get: function (s) { var e = s._skeleton.data.events || []; return e.length ? e.length + ' (' + e.map(function (x) { return x.name; }).join(', ') + ')' : '0'; } },
                { key: 'spineSize', label: 'Size', type: 'ro', get: function (s) { var d = s._skeleton.data; return d.width ? round(d.width, 1) + ' × ' + round(d.height, 1) : '—'; } }
            ]
        },
        {
            id: 'armature', title: 'Armature',
            applies: function (n) { return !!armatureOf(n); },
            target: armatureOf,
            props: [
                { key: 'movement', label: 'Movement', type: 'select', live: true,
                    options: function (a) { return [['', '(없음)']].concat((a.getAnimation()._animationData.movementNames || []).map(function (m) { return [m, m]; })); },
                    get: function (a) { return a.getAnimation().getCurrentMovementID() || ''; },
                    set: function (a, v) { if (v) a.getAnimation().play(v, -1); else a.getAnimation().stop(); } },
                { key: 'speed', label: 'Speed Scale', type: 'number', step: 0.01,
                    get: function (a) { return a.getAnimation().getSpeedScale(); },
                    set: function (a, v) { a.getAnimation().setSpeedScale(v); } },
                { key: 'frame', label: 'Frame', type: 'frame', live: true,
                    get: function (a) {
                        var anim = a.getAnimation();
                        var total = anim._movementData ? anim._movementData.duration : 0;
                        return { cur: anim.getCurrentFrameIndex(), total: total, playing: anim.isPlaying() && !anim.isPause() };
                    },
                    set: function (a, v) { a.getAnimation().gotoAndPause(v); } },
                { key: 'armDebug', label: 'Debug Bones', type: 'bool',
                    get: function (a) { return ArmatureDebugDraw.isEnabled(a); },
                    set: function (a, v) { ArmatureDebugDraw.setEnabled(a, v); } },
                { key: 'boneCount', label: 'Bones', type: 'ro',
                    get: function (a) { return Object.keys(a.getBoneDic()).length; } },
                { key: 'frameRate', label: 'Frame Rate', type: 'ro',
                    get: function (a) { return a.getAnimation()._animationData && a.getAnimation()._animationData.frameRate || 60; } }
            ]
        },
        {
            id: 'sprite', title: '이미지',
            applies: function (n) { return !!spriteOf(n); },
            target: spriteOf,
            props: [
                { key: 'texSize', label: 'Texture', type: 'ro',
                    get: function (s) { var t = s.getTexture(); return t ? t.getPixelsWide() + ' × ' + t.getPixelsHigh() : '—'; } }
            ]
        }
    ];

    // ---- 텍스처 카드 (ImageView / Button / LoadingBar / Slider / CheckBox / Layout 배경) ----

    function textureEntries(n) {
        if (!isWidget(n)) return [];
        var list = [];
        var add = function (label, file, type) {
            if (file) list.push({ label: label, file: String(file), type: type });
        };
        if (is(n, 'ccui.ImageView')) add('Image', n._textureFile, n._imageTexType);
        if (is(n, 'ccui.Button')) {
            add('Normal', n._normalFileName, n._normalTexType);
            add('Pressed', n._clickedFileName, n._pressedTexType);
            add('Disabled', n._disabledFileName, n._disabledTexType);
        }
        if (is(n, 'ccui.LoadingBar')) add('Bar', n._textureFile, n._renderBarTexType);
        if (is(n, 'ccui.Slider')) {
            add('Bar', n._textureFile, n._barTexType);
            add('Progress', n._progressBarTextureFile, n._progressBarTexType);
            add('Ball', n._slidBallNormalTextureFile, n._ballNTexType);
        }
        if (is(n, 'ccui.CheckBox')) {
            add('Background', n._backGroundFileName, n._backGroundTexType);
            add('Cross', n._frontCrossFileName, n._frontCrossTexType);
        }
        if (is(n, 'ccui.Layout') && n._backGroundImageFileName) add('Background', n._backGroundImageFileName, n._bgImageTexType);
        return list;
    }

    function renderTextureCards(n) {
        return textureEntries(n).map(function (t, i) {
            var isPlist = t.type === ccui.Widget.PLIST_TEXTURE;
            var fileName = t.file.split(/[\\\/]/).pop();
            var plist = isPlist ? findPlistOfFrame(t.file) : null;
            var tex = !isPlist ? (Loader.textures[cc.path.mainFileName(fileName)] || null) : null;
            var frame = isPlist ? cc.spriteFrameCache.getSpriteFrame(t.file) : null;
            var sizeText = frame ? round(frame.getOriginalSize().width, 0) + ' × ' + round(frame.getOriginalSize().height, 0)
                : (tex ? tex.getPixelsWide() + ' × ' + tex.getPixelsHigh() : '로드되지 않음');
            var openAttr = plist ? ' data-open-file="' + esc(plist) + '" data-open-kind="plist" data-open-select="' + esc(t.file) + '"'
                : (tex ? ' data-open-file="' + esc(fileName) + '" data-open-kind="png"' : '');
            return '<div class="insp-tex-card">' +
                '<canvas class="insp-tex-thumb" data-tex-index="' + i + '" width="56" height="56"></canvas>' +
                '<div class="insp-tex-info">' +
                '<div class="insp-tex-name"><span class="insp-tex-label">' + esc(t.label) + '</span>' + esc(t.file) + '</div>' +
                '<div class="insp-subtle">' + esc(texTypeLabel(t.type)) + (plist ? ' · ' + esc(plist) : '') + '</div>' +
                '<div class="insp-subtle">' + esc(sizeText) + '</div>' +
                (openAttr ? '<button type="button" class="insp-link insp-open-resource"' + openAttr + '>Resource View 에서 열기 →</button>' : '') +
                '</div></div>';
        }).join('');
    }

    function drawTextureThumbs($root, n) {
        var entries = textureEntries(n);
        $root.find('.insp-tex-thumb').each(function () {
            var t = entries[$(this).data('tex-index')];
            if (!t) return;
            var ctx = this.getContext('2d');
            ctx.clearRect(0, 0, this.width, this.height);
            var img, sx, sy, sw, sh, rotated = false;
            if (t.type === ccui.Widget.PLIST_TEXTURE) {
                var frame = cc.spriteFrameCache.getSpriteFrame(t.file);
                if (!frame || !frame.getTexture()) return;
                img = frame.getTexture().getHtmlElementObj();
                var r = frame.getRect();
                rotated = frame.isRotated();
                sx = r.x; sy = r.y; sw = rotated ? r.height : r.width; sh = rotated ? r.width : r.height;
            } else {
                var tex = Loader.textures[cc.path.mainFileName(t.file.split(/[\\\/]/).pop())];
                if (!tex) return;
                img = tex.getHtmlElementObj();
                sx = 0; sy = 0; sw = tex.getPixelsWide(); sh = tex.getPixelsHigh();
            }
            var outW = rotated ? sh : sw, outH = rotated ? sw : sh;
            var scale = Math.min(this.width / outW, this.height / outH, 1);
            var dw = outW * scale, dh = outH * scale;
            ctx.save();
            ctx.translate((this.width - dw) / 2, (this.height - dh) / 2);
            if (rotated) {
                // 시트에 시계 방향 90도로 저장된 프레임을 원래 방향으로
                ctx.translate(0, dh);
                ctx.rotate(-Math.PI / 2);
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dh, dw);
            } else {
                ctx.drawImage(img, sx, sy, sw, sh, 0, 0, dw, dh);
            }
            ctx.restore();
        });
    }

    // ---- 렌더링 ----------------------------------------------------------

    function propApplies(prop, target) {
        try {
            return !prop.applies || prop.applies(target);
        } catch (e) {
            return false;
        }
    }

    function renderProp(section, prop, target) {
        var key = section.id + '.' + prop.key;
        var ro = prop.type === 'ro' || !prop.set || (prop.readOnly && prop.readOnly(target));
        var scrub = (prop.type === 'number' || prop.type === 'xy') && !ro;
        var label = '<span class="insp-label' + (scrub ? ' insp-scrub' : '') + '" data-key="' + key + '" title="' + (scrub ? '좌우로 드래그해서 값 조절' : '') + '">' + esc(prop.label) + '</span>';
        var field = '';
        var step = prop.step || 1;

        switch (prop.type) {
            case 'xy':
                var axes = prop.axes || ['X', 'Y'];
                field = '<div class="insp-xy">' + ['x', 'y'].map(function (a, i) {
                    return '<label class="insp-axis"><span class="insp-axis-name axis-' + a + (ro ? '' : ' insp-scrub') + '" data-key="' + key + '" data-axis="' + a + '">' + axes[i] + '</span>' +
                        '<input type="number" class="insp-input" data-key="' + key + '" data-axis="' + a + '" step="' + step + '"' + (ro ? ' disabled' : '') + '></label>';
                }).join('') + '</div>';
                break;
            case 'number':
                field = '<input type="number" class="insp-input" data-key="' + key + '" step="' + step + '"' + (ro ? ' disabled' : '') + '>';
                break;
            case 'text':
                field = '<input type="text" class="insp-input insp-text" data-key="' + key + '"' + (ro ? ' disabled' : '') + '>';
                break;
            case 'textarea':
                field = '<textarea class="insp-input insp-textarea" data-key="' + key + '" rows="2"' + (ro ? ' disabled' : '') + '></textarea>';
                break;
            case 'bool':
                field = '<label class="insp-check"><input type="checkbox" class="insp-input" data-key="' + key + '"' + (ro ? ' disabled' : '') + '></label>';
                break;
            case 'color':
                field = '<div class="insp-color"><input type="color" class="insp-input" data-key="' + key + '"' + (ro ? ' disabled' : '') + '><span class="insp-color-hex" data-hex-for="' + key + '"></span></div>';
                break;
            case 'range':
                field = '<div class="insp-range"><input type="range" class="insp-input" data-key="' + key + '" min="' + prop.min + '" max="' + prop.max + '"' + (ro ? ' disabled' : '') + '><span class="insp-range-value" data-value-for="' + key + '"></span></div>';
                break;
            case 'select':
                var opts = [];
                try { opts = prop.options(target) || []; } catch (e) { opts = []; }
                field = '<select class="insp-input insp-select" data-key="' + key + '"' + (ro ? ' disabled' : '') + '>' +
                    opts.map(function (o) { return '<option value="' + esc(o[0]) + '">' + esc(o[1]) + '</option>'; }).join('') + '</select>';
                break;
            case 'progress':
                field = '<div class="insp-progress"><div class="insp-progress-bar"><div class="insp-progress-fill" data-fill-for="' + key + '"></div></div><span class="insp-progress-text" data-text-for="' + key + '"></span></div>';
                break;
            case 'frame':
                field = '<div class="insp-frame">' +
                    '<button type="button" class="insp-mini insp-frame-prev" data-key="' + key + '" aria-label="이전 프레임">◀</button>' +
                    '<button type="button" class="insp-mini insp-frame-toggle" data-key="' + key + '" aria-label="재생/일시정지"></button>' +
                    '<button type="button" class="insp-mini insp-frame-next" data-key="' + key + '" aria-label="다음 프레임">▶</button>' +
                    '<input type="range" class="insp-input insp-frame-range" data-key="' + key + '" min="0" max="0">' +
                    '<span class="insp-frame-text" data-text-for="' + key + '"></span></div>';
                break;
            case 'resource':
                field = '<span class="insp-ro" data-ro-for="' + key + '"></span>';
                break;
            default: // ro
                field = '<span class="insp-ro" data-ro-for="' + key + '"></span>';
        }
        return '<div class="insp-row' + (prop.type === 'textarea' ? ' insp-row-wide' : '') + '" data-row="' + key + '">' + label + field + '</div>';
    }

    function render() {
        var $body = $('#inspector-body');
        stopLive();
        if (!_node) {
            $('#inspector-header-extra').empty();
            $body.html('<div class="insp-empty">Hierarchy 나 Game View 에서 노드를 선택하세요.</div>');
            $('#nodeName').val('').prop('disabled', true);
            $('#inspector-visible').prop('checked', false).prop('disabled', true);
            return;
        }

        var n = _node;
        $('#nodeName').val(n.getName() || 'Unnamed Node').prop('disabled', false);
        $('#inspector-visible').prop('disabled', false);

        var chips = '<span class="insp-chip insp-chip-class">' + esc(className(n)) + '</span>' +
            '<span class="insp-chip">Tag ' + esc(n.getTag()) + '</span>' +
            (nodePath(n) ? '<span class="insp-chip" title="노드 경로">' + esc(nodePath(n)) + '</span>' : '');
        $('#inspector-header-extra').html(chips);

        _sections = [];
        var html = '';
        SECTIONS.forEach(function (section) {
            var target = section.target ? section.target(n) : n;
            if (!target || !section.applies(n)) return;
            var props = section.props.filter(function (p) { return propApplies(p, target); });
            var custom = section.custom ? section.custom(target) : '';
            if (props.length === 0 && !custom) return;
            _sections.push({ section: section, target: target, props: props });

            var collapsed = !!_collapsed[section.id];
            html += '<div class="insp-section' + (collapsed ? ' collapsed' : '') + '" data-section="' + section.id + '">' +
                '<button type="button" class="insp-section-header" data-section="' + section.id + '"><span class="insp-caret">' + (collapsed ? '▸' : '▾') + '</span>' + esc(section.title) + '</button>' +
                '<div class="insp-section-body">' + custom +
                props.map(function (p) { return renderProp(section, p, target); }).join('') +
                '</div></div>';
        });
        $body.html(html);
        drawTextureThumbs($body, n);
        refresh(true);
        startLive();
    }

    function findProp(key) {
        var parts = key.split('.');
        for (var i = 0; i < _sections.length; i++) {
            if (_sections[i].section.id !== parts[0]) continue;
            for (var j = 0; j < _sections[i].props.length; j++) {
                if (_sections[i].props[j].key === parts[1]) return { prop: _sections[i].props[j], target: _sections[i].target };
            }
        }
        return null;
    }

    // 값만 갱신 (포커스가 있는 입력칸은 사용자가 입력 중이므로 건너뛴다)
    function refresh(force, liveOnly) {
        if (!_node) return;
        var $body = $('#inspector-body');
        var active = document.activeElement;
        $('#inspector-visible').prop('checked', _node.isVisible());

        _sections.forEach(function (entry) {
            entry.props.forEach(function (prop) {
                if (liveOnly && !prop.live) return;
                var key = entry.section.id + '.' + prop.key;
                var v;
                try { v = prop.get(entry.target); } catch (e) { v = null; }
                var $inputs = $body.find('[data-key="' + key + '"].insp-input');

                switch (prop.type) {
                    case 'xy':
                        $inputs.each(function () {
                            if (this === active && !force) return;
                            var axisVal = v ? v[$(this).data('axis')] : '';
                            this.value = fmt(axisVal, prop.step || 1);
                        });
                        break;
                    case 'bool':
                        $inputs.prop('checked', !!v);
                        break;
                    case 'color':
                        $inputs.each(function () { if (this !== active || force) this.value = v || '#ffffff'; });
                        $body.find('[data-hex-for="' + key + '"]').text(String(v || '').toUpperCase());
                        break;
                    case 'range':
                        $inputs.each(function () { if (this !== active || force) this.value = v; });
                        $body.find('[data-value-for="' + key + '"]').text(v);
                        break;
                    case 'progress':
                        $body.find('[data-fill-for="' + key + '"]').css('width', Math.round((v ? v.ratio : 0) * 100) + '%');
                        $body.find('[data-text-for="' + key + '"]').text(v ? v.text : '');
                        break;
                    case 'frame':
                        var $range = $body.find('.insp-frame-range[data-key="' + key + '"]');
                        $range.attr('max', Math.max(0, (v ? v.total : 1) - 1));
                        if ($range[0] !== active) $range.val(v ? v.cur : 0);
                        $body.find('[data-text-for="' + key + '"]').text(v ? v.cur + ' / ' + Math.max(0, v.total - 1) : '');
                        $body.find('.insp-frame-toggle[data-key="' + key + '"]').text(v && v.playing ? '❚❚' : '▶︎');
                        break;
                    case 'resource':
                        var $ro = $body.find('[data-ro-for="' + key + '"]');
                        $ro.empty().append(document.createTextNode(v ? v.label : '—'));
                        if (v && v.open) {
                            $ro.append($('<button type="button" class="insp-link insp-open-resource">열기 →</button>')
                                .attr('data-open-file', v.open.fileName).attr('data-open-kind', v.open.kind));
                        }
                        break;
                    case 'ro':
                        $body.find('[data-ro-for="' + key + '"]').text(v == null ? '—' : v);
                        break;
                    default:
                        $inputs.each(function () {
                            if (this === active && !force) return;
                            this.value = prop.type === 'number' ? fmt(v, prop.step || 1) : (v == null ? '' : v);
                        });
                }
            });
        });
    }

    function startLive() {
        var hasLive = _sections.some(function (e) { return e.props.some(function (p) { return p.live; }); });
        if (!hasLive) return;
        _liveTimer = setInterval(function () {
            if (!_node || !_node.isRunning()) { stopLive(); return; }
            refresh(false, true);
        }, 100);
    }

    function stopLive() {
        if (_liveTimer) clearInterval(_liveTimer);
        _liveTimer = null;
    }

    function afterChange(prop) {
        if (!_node) return;
        if (typeof Gizmo_DrawTouchLayerByRect === 'function') {
            var box = _node.getBoundingBoxToWorld();
            if (box.width < 5) box.width = 10;
            if (box.height < 5) box.height = 10;
            Gizmo_DrawTouchLayerByRect(box);
        }
        if (prop && prop.refreshHierarchy && window.MainLayerInstance) {
            window.MainLayerInstance.refreshHierarchyView();
        }
        refresh(false);
    }

    function applyInput(el) {
        var key = $(el).data('key');
        var found = findProp(key);
        if (!found || !found.prop.set) return;
        var prop = found.prop, target = found.target;
        var value;

        switch (prop.type) {
            case 'xy':
                var $inputs = $('#inspector-body').find('.insp-input[data-key="' + key + '"]');
                var x = parseFloat($inputs.filter('[data-axis="x"]').val());
                var y = parseFloat($inputs.filter('[data-axis="y"]').val());
                if (isNaN(x) || isNaN(y)) return;
                value = { x: x, y: y };
                break;
            case 'number':
            case 'range':
                value = parseFloat(el.value);
                if (isNaN(value)) return;
                break;
            case 'bool':
                value = el.checked;
                break;
            case 'frame':
                value = parseInt(el.value, 10);
                break;
            default:
                value = el.value;
        }
        try {
            prop.set(target, value);
        } catch (e) {
            console.error('[Inspector] 값 적용 실패:', key, e);
        }
        afterChange(prop);
    }

    // ---- 이벤트 ----------------------------------------------------------

    var _bound = false;
    function bindEvents() {
        if (_bound) return;
        _bound = true;
        var $doc = $(document);

        $doc.on('input', '#inspector-body .insp-input', function () {
            if (this.type === 'checkbox' || this.tagName === 'SELECT') return;
            applyInput(this);
        });
        $doc.on('change', '#inspector-body .insp-input', function () {
            if (this.type === 'checkbox' || this.tagName === 'SELECT') applyInput(this);
        });
        // 입력을 마치면 정리된 값으로 다시 표시
        $doc.on('blur', '#inspector-body .insp-input', function () { setTimeout(function () { refresh(false); }, 0); });

        $doc.on('click', '#inspector-body .insp-section-header', function () {
            var id = $(this).data('section');
            _collapsed[id] = !_collapsed[id];
            try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify(_collapsed)); } catch (e) { }
            $(this).closest('.insp-section').toggleClass('collapsed', !!_collapsed[id])
                .find('.insp-caret').first().text(_collapsed[id] ? '▸' : '▾');
        });

        $doc.on('click', '#inspector-body .insp-open-resource, #inspector-body .insp-open-resource *', function (e) {
            var $btn = $(e.target).closest('.insp-open-resource');
            PanelManager.openResource($btn.attr('data-open-file'), $btn.attr('data-open-kind'), $btn.attr('data-open-select') || null);
        });

        // Armature 프레임 컨트롤
        $doc.on('click', '#inspector-body .insp-frame-prev, #inspector-body .insp-frame-next', function () {
            var found = findProp($(this).data('key'));
            if (!found) return;
            var v = found.prop.get(found.target);
            var next = v.cur + ($(this).hasClass('insp-frame-next') ? 1 : -1);
            next = Math.max(0, Math.min(v.total - 1, next));
            found.prop.set(found.target, next);
            refresh(false);
        });
        $doc.on('click', '#inspector-body .insp-frame-toggle', function () {
            var found = findProp($(this).data('key'));
            if (!found) return;
            var anim = found.target.getAnimation();
            var v = found.prop.get(found.target);
            if (v.playing) anim.pause();
            else if (anim.isPause() && anim.getCurrentMovementID()) anim.resume();
            else if (anim.getCurrentMovementID()) anim.gotoAndPlay(v.cur);
            refresh(false);
        });

        // 노드 이름 변경
        $doc.on('change', '#nodeName', function () {
            if (!_node) return;
            var name = this.value.trim();
            if (!name) { this.value = _node.getName(); return; }
            renameNode(_node, name);
        });
        $doc.on('change', '#inspector-visible', function () {
            if (!_node) return;
            _node.setVisible(this.checked);
            var $icon = $('#' + _node.__instanceId).children('.jstree-anchor').find('.visibility-toggle');
            $icon.toggleClass('fa-eye', this.checked).toggleClass('fa-eye-slash', !this.checked);
        });

        bindScrub();
    }

    function renameNode(n, name) {
        var mainLayer = window.MainLayerInstance;
        if (n instanceof DraggableNode && mainLayer) {
            if (mainLayer.sceneNodes[name] && mainLayer.sceneNodes[name] !== n) {
                UIWidgetsCopyPopover.showToast('같은 이름의 인스턴스가 있습니다', name, true);
                $('#nodeName').val(n.getName());
                return;
            }
            delete mainLayer.sceneNodes[n.getName()];
            mainLayer.sceneNodes[name] = n;
        }
        n.setName(name);
        if (mainLayer) mainLayer.refreshHierarchyView();
        refresh(false);
    }

    // 라벨을 좌우로 드래그해서 숫자 조절 (Unity 방식)
    function bindScrub() {
        var drag = null;
        $(document).on('mousedown', '#inspector-body .insp-scrub', function (e) {
            if (e.button !== 0) return;
            var key = $(this).data('key');
            var axis = $(this).data('axis');
            var $input = $('#inspector-body .insp-input[data-key="' + key + '"]' + (axis ? '[data-axis="' + axis + '"]' : '')).first();
            if (!$input.length || $input.prop('disabled')) return;
            e.preventDefault();
            var step = parseFloat($input.attr('step')) || 1;
            drag = { input: $input[0], startX: e.clientX, start: parseFloat($input.val()) || 0, step: step, sensitivity: step < 0.1 ? step : step * 0.5 };
            document.body.style.cursor = 'ew-resize';
            $('#resize-overlay').show();
        });
        $(document).on('mousemove', function (e) {
            if (!drag) return;
            var value = drag.start + (e.clientX - drag.startX) * drag.sensitivity * (e.shiftKey ? 10 : 1);
            value = Math.round(value / drag.step) * drag.step;
            drag.input.value = fmt(value, drag.step);
            applyInput(drag.input);
        });
        $(document).on('mouseup', function () {
            if (!drag) return;
            drag = null;
            document.body.style.cursor = '';
            $('#resize-overlay').hide();
        });
    }

    return {
        init: bindEvents,
        // 다른 노드를 고르면 다시 그리고, 같은 노드면 값만 갱신
        setNode: function (node) {
            bindEvents();
            if (node === _node && node) {
                refresh(false);
                return;
            }
            _node = node || null;
            render();
        },
        refresh: function () { refresh(false); },
        getNode: function () { return _node; },
        SECTIONS: SECTIONS
    };
})();
