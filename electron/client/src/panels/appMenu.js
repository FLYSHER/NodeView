/**
 * 앱 상단 바: 메뉴(파일 · 편집 · 보기 · 창 · 도움말), 최근 파일
 *  - Electron 에서는 시스템 제목 표시줄을 숨기고 이 바가 대신한다 (창 버튼은 시스템 것을 오른쪽에 겹쳐 그린다)
 *  - 웹 모드에서는 파일 열기 · 최근 파일 · 창 관련 항목만 빠진다
 */
var AppMenu = (function () {
    var RECENT_KEY = 'recentFiles';
    var RECENT_MAX = 10;

    var _ipc = null;
    try { _ipc = typeof require === 'function' ? require('electron').ipcRenderer : null; } catch (e) { _ipc = null; }
    var isElectron = !!_ipc && typeof ElectronRenderer !== 'undefined';

    var _openMenu = null;      // 열려 있는 메뉴 id
    var _inited = false;

    // ---- 최근 파일 --------------------------------------------------------

    function loadRecent() {
        try { return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; } catch (e) { return []; }
    }

    function saveRecent(list) {
        try { localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, RECENT_MAX))); } catch (e) { }
    }

    function baseName(p) {
        return String(p).split(/[\\\/]/).pop();
    }

    // ExportJson / json / png 를 열거나 끌어다 놓으면 기록한다 (폴더는 리소스 탐색용이라 기록하지 않음)
    function addRecent(paths) {
        var list = loadRecent();
        paths.filter(function (p) { return /\.(exportjson|json|png)$/i.test(p); }).forEach(function (p) {
            list = list.filter(function (q) { return q !== p; });
            list.unshift(p);
        });
        saveRecent(list);
        syncRecentChip();
    }

    function openPaths(paths) {
        if (!isElectron || !paths || paths.length === 0) return;
        ElectronRenderer.handleDrop({ dataTransfer: { files: paths.map(function (p) { return { path: p }; }) } });
    }

    function syncRecentChip() {
        var list = isElectron ? loadRecent() : [];
        var $chip = $('#recentFileChip');
        $chip.text(list.length ? baseName(list[0]) : '없음').prop('disabled', list.length === 0)
            .attr('title', list.length ? list[0] + '\n클릭: 최근 파일 목록' : '최근 파일 없음');
        $('.atb-recent').toggle(isElectron);
    }

    // ---- 메뉴 정의 --------------------------------------------------------
    // 항목: { label, shortcut, run, checked(), enabled(), electron(only), sep, submenu: 'recent' | 'panels' }

    function inspectorButtonEnabled(id) {
        var el = document.getElementById(id);
        return !!el && !el.disabled;
    }

    function gv(key) {
        return { checked: function () { return typeof GameViewTools !== 'undefined' && GameViewTools.isOn(key); },
            run: function () { GameViewTools.toggle(key); } };
    }

    var MENUS = [
        { id: 'file', label: '파일', items: [
            { label: '열기…', shortcut: 'Ctrl+O', electron: true, run: openFileDialog },
            { label: '리소스 폴더 열기…', electron: true, run: openFolderDialog },
            { label: '최근 파일', electron: true, submenu: 'recent' },
            { sep: true, electron: true },
            { label: '종료', electron: true, run: function () { _ipc.send('nv:window', 'close'); } }
        ] },
        { id: 'edit', label: '편집', items: [
            { label: 'uiWidgets 복사', shortcut: 'Ctrl+Shift+C', run: function () { UIWidgetsCopyPopover.copyNow(); } },
            { label: 'uiWidgets 복사 옵션…', run: function () { UIWidgetsCopyPopover.open(document.getElementById('copyOptionsBtn')); } },
            { sep: true },
            { label: '속성 값 복사', enabled: function () { return inspectorButtonEnabled('inspectorCopyBtn'); }, run: function () { $('#inspectorCopyBtn').trigger('click'); } },
            { label: '속성 원래대로', enabled: function () { return inspectorButtonEnabled('inspectorResetBtn'); }, run: function () { $('#inspectorResetBtn').trigger('click'); } }
        ] },
        { id: 'view', label: '보기', items: [
            { label: '확대', shortcut: '+', run: function () { GameViewTools.zoomStep(1); } },
            { label: '축소', shortcut: '-', run: function () { GameViewTools.zoomStep(-1); } },
            { label: '100%', run: function () { GameViewTools.resetView(); } },
            { label: '맞춤', shortcut: 'F', run: function () { GameViewTools.fitView(); } },
            { sep: true },
            $.extend({ label: '경계 상자' }, gv('bounds')),
            $.extend({ label: '앵커 표시' }, gv('anchor')),
            $.extend({ label: '그리드' }, gv('grid')),
            $.extend({ label: '디자인 해상도 프레임' }, gv('frame')),
            $.extend({ label: '통계' }, gv('stats')),
            { sep: true },
            { label: '전체 화면', shortcut: 'F11', run: toggleFullScreen },
            { label: '새로 고침', shortcut: 'F5', run: reload },
            { label: '개발자 도구', shortcut: 'F12', electron: true, run: function () { _ipc.send('nv:window', 'toggleDevTools'); } }
        ] },
        { id: 'window', label: '창', items: [
            { submenu: 'panels' },
            { sep: true },
            { label: '레이아웃 초기화', run: function () { PanelManager.resetLayout(); } }
        ] },
        { id: 'help', label: '도움말', items: [
            { label: '단축키', run: showShortcuts },
            { label: 'NodeView 정보', run: showAbout }
        ] }
    ];

    // ---- 동작 -------------------------------------------------------------

    function openFileDialog() {
        if (!isElectron) return;
        _ipc.invoke('nv:openDialog').then(openPaths);
    }

    function openFolderDialog() {
        if (!isElectron) return;
        _ipc.invoke('nv:openFolderDialog').then(openPaths);
    }

    function toggleFullScreen() {
        if (isElectron) { _ipc.send('nv:window', 'toggleFullScreen'); return; }
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else if (document.exitFullscreen) document.exitFullscreen();
    }

    function reload() {
        if (isElectron) _ipc.send('nv:window', 'reload');
        else window.location.reload();
    }

    var SHORTCUTS = [
        ['파일 열기', 'Ctrl+O'],
        ['uiWidgets 복사', 'Ctrl+Shift+C'],
        ['선택 / 이동 / 회전 / 스케일 도구', 'Q / W / E / R'],
        ['확대 · 축소', '휠 · + / -'],
        ['맞춤 (선택 노드, 없으면 전체)', 'F'],
        ['화면 이동', '가운데 버튼 드래그 · Space + 드래그'],
        ['회전 15도 단위', 'Shift + 회전 드래그'],
        ['인스턴스 삭제', 'Delete'],
        ['전체 화면', 'F11'],
        ['새로 고침', 'F5'],
        ['개발자 도구', 'F12']
    ];

    function showDialog(title, bodyHtml) {
        var $dlg = $('#appDialog');
        if ($dlg.length === 0) {
            $dlg = $('<div id="appDialog" class="app-dialog-backdrop" hidden>' +
                '<div class="app-dialog" role="dialog" aria-modal="true" aria-labelledby="appDialogTitle">' +
                '<div class="app-dialog-head"><span id="appDialogTitle"></span><button type="button" class="app-dialog-close" aria-label="닫기">&times;</button></div>' +
                '<div class="app-dialog-body"></div></div></div>').appendTo('body');
            $dlg.on('click', function (e) { if (e.target === this) $dlg.prop('hidden', true); });
            $dlg.on('click', '.app-dialog-close', function () { $dlg.prop('hidden', true); });
            $(document).on('keydown', function (e) { if (e.key === 'Escape') $dlg.prop('hidden', true); });
        }
        $dlg.find('#appDialogTitle').text(title);
        $dlg.find('.app-dialog-body').html(bodyHtml);
        $dlg.prop('hidden', false);
        $dlg.find('.app-dialog-close').trigger('focus');
    }

    function esc(t) { return $('<div>').text(t).html(); }

    function showShortcuts() {
        showDialog('단축키', '<table class="app-shortcuts">' + SHORTCUTS.map(function (s) {
            return '<tr><td>' + esc(s[0]) + '</td><td><kbd>' + esc(s[1]) + '</kbd></td></tr>';
        }).join('') + '</table>');
    }

    function showAbout() {
        var render = function (version) {
            var rows = [['버전', version || '—'], ['엔진', 'cocos2d-html5 v' + (cc.ENGINE_VERSION || '3').replace(/^Cocos2d-JS v/i, '')]];
            if (isElectron && typeof process !== 'undefined' && process.versions) rows.push(['Electron', process.versions.electron]);
            rows.push(['회사', 'PlayLinks'], ['스튜디오', 'Raon Studio']);
            showDialog('NodeView 정보',
                '<div class="app-about-head"><span class="atb-logo app-about-logo" aria-hidden="true">NV</span>' +
                '<div><div class="app-about-name">NodeView</div><div class="app-about-sub">Cocos Asset Inspector</div></div></div>' +
                '<table class="app-shortcuts">' + rows.map(function (r) {
                    return '<tr><td>' + esc(r[0]) + '</td><td>' + esc(r[1]) + '</td></tr>';
                }).join('') + '</table>' +
                '<div class="app-about-foot">© PlayLinks · Raon Studio</div>');
        };
        if (isElectron) _ipc.invoke('nv:appInfo').then(function (info) { render(info && info.version); }, function () { render(null); });
        else render(null);
    }

    // ---- 렌더링 -----------------------------------------------------------

    function itemsFor(menu) {
        var out = [];
        menu.items.forEach(function (it) {
            if (it.electron && !isElectron) return;
            if (it.submenu === 'panels') {
                PanelManager.getPanels().forEach(function (p) {
                    out.push({ label: p.title, checked: function () { return p.open; },
                        run: function () { PanelManager.setPanelOpen(p.name, !p.open); } });
                });
                return;
            }
            if (it.submenu === 'recent') {
                var list = loadRecent();
                out.push({ header: '최근 파일' });
                if (list.length === 0) out.push({ label: '없음', enabled: function () { return false; } });
                list.forEach(function (p) {
                    out.push({ label: baseName(p), title: p, run: function () { openPaths([p]); } });
                });
                if (list.length) out.push({ label: '목록 지우기', run: function () { saveRecent([]); syncRecentChip(); } });
                return;
            }
            out.push(it);
        });
        // 앞뒤 · 연속 구분선 정리
        return out.filter(function (it, i, arr) {
            if (!it.sep) return true;
            return i > 0 && i < arr.length - 1 && !arr[i - 1].sep;
        });
    }

    function renderDropdown($dd, items) {
        $dd.empty();
        items.forEach(function (it, i) {
            if (it.sep) { $dd.append('<div class="atb-sep" role="separator"></div>'); return; }
            if (it.header) { $dd.append('<div class="atb-menu-header">' + esc(it.header) + '</div>'); return; }
            var enabled = it.enabled ? it.enabled() : true;
            var hasCheck = typeof it.checked === 'function';
            var checked = hasCheck && it.checked();
            var $b = $('<button type="button" class="atb-item"></button>')
                .attr('role', hasCheck ? 'menuitemcheckbox' : 'menuitem')
                .prop('disabled', !enabled)
                .append($('<span class="atb-check" aria-hidden="true"></span>').text(checked ? '✓' : ''))
                .append($('<span class="atb-item-label"></span>').text(it.label))
                .append($('<span class="atb-shortcut"></span>').text(it.shortcut || ''));
            if (hasCheck) $b.attr('aria-checked', String(checked));
            if (it.title) $b.attr('title', it.title);
            $b.on('click', function () {
                closeMenus();
                if (it.run) it.run();
            });
            $dd.append($b);
        });
    }

    function buildMenuBar() {
        var $bar = $('#appMenuBar').empty();
        MENUS.forEach(function (m) {
            // 웹 모드에서 항목이 모두 빠지는 메뉴(파일)는 숨긴다
            if (!m.items.some(function (it) { return !it.sep && (!it.electron || isElectron); })) return;
            var $wrap = $('<div class="atb-menu"></div>').attr('data-menu', m.id);
            var $btn = $('<button type="button" class="atb-menu-btn" role="menuitem" aria-haspopup="menu" aria-expanded="false"></button>').text(m.label);
            var $dd = $('<div class="atb-dropdown" role="menu" hidden></div>').attr('aria-label', m.label);
            $wrap.append($btn, $dd).appendTo($bar);
            $btn.on('click', function (e) {
                e.stopPropagation();
                if (_openMenu === m.id) closeMenus();
                else openMenu(m.id);
            });
            // 메뉴가 하나 열려 있으면 다른 메뉴 위로 마우스를 옮기는 것만으로 바뀐다
            $btn.on('mouseenter', function () {
                if (_openMenu && _openMenu !== m.id) openMenu(m.id);
            });
        });
    }

    function openMenu(id) {
        closeMenus();
        var menu = MENUS.filter(function (m) { return m.id === id; })[0];
        var $wrap = $('#appMenuBar .atb-menu[data-menu="' + id + '"]');
        var $dd = $wrap.find('.atb-dropdown');
        renderDropdown($dd, itemsFor(menu));
        $dd.prop('hidden', false);
        $wrap.find('.atb-menu-btn').attr('aria-expanded', 'true').addClass('open');
        _openMenu = id;
    }

    function closeMenus() {
        $('#appMenuBar .atb-dropdown, #recentFileMenu').prop('hidden', true);
        $('#appMenuBar .atb-menu-btn').attr('aria-expanded', 'false').removeClass('open');
        _openMenu = null;
    }

    // 메뉴 안에서 ↑/↓ 로 항목 이동, Esc 로 닫기
    function onMenuKeydown(e) {
        if (!_openMenu && $('#recentFileMenu').prop('hidden')) return;
        if (e.key === 'Escape') { closeMenus(); return; }
        if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
        var $items = $('.atb-dropdown:not([hidden]) .atb-item:not(:disabled)');
        if ($items.length === 0) return;
        e.preventDefault();
        var idx = $items.index(document.activeElement);
        idx = e.key === 'ArrowDown' ? (idx + 1) % $items.length : (idx <= 0 ? $items.length - 1 : idx - 1);
        $items.eq(idx).trigger('focus');
    }

    // 전역 단축키 (입력 중이면 기능 키만)
    function onShortcut(e) {
        var t = e.target;
        var typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
        if (e.key === 'F5') { e.preventDefault(); reload(); return; }
        if (e.key === 'F11') { e.preventDefault(); toggleFullScreen(); return; }
        if (e.key === 'F12' && isElectron) { e.preventDefault(); _ipc.send('nv:window', 'toggleDevTools'); return; }
        if (typing) return;
        if (isElectron && e.ctrlKey && !e.shiftKey && !e.altKey && (e.key === 'o' || e.key === 'O')) { e.preventDefault(); openFileDialog(); }
    }

    // Windows 창 버튼(시스템)이 겹쳐 그려지는 오른쪽 영역만큼 비워 둔다
    function syncWindowControlsInset() {
        var wco = navigator.windowControlsOverlay;
        var inset = 0;
        if (wco && wco.visible && wco.getTitlebarAreaRect) {
            var r = wco.getTitlebarAreaRect();
            inset = Math.max(0, window.innerWidth - (r.x + r.width));
        } else if (isElectron && navigator.platform && /^Win/.test(navigator.platform)) {
            inset = 138;
        }
        document.documentElement.style.setProperty('--wco-right', inset + 'px');
        document.documentElement.classList.toggle('platform-mac', isElectron && /^Mac/.test(navigator.platform || ''));
    }

    return {
        init: function () {
            if (_inited) return;
            _inited = true;
            buildMenuBar();
            syncRecentChip();
            syncWindowControlsInset();
            if (navigator.windowControlsOverlay && navigator.windowControlsOverlay.addEventListener) {
                navigator.windowControlsOverlay.addEventListener('geometrychange', syncWindowControlsInset);
            }
            $(window).on('resize', syncWindowControlsInset);

            $('#recentFileChip').on('click', function (e) {
                e.stopPropagation();
                var $m = $('#recentFileMenu');
                var wasHidden = $m.prop('hidden');
                closeMenus();
                if (!wasHidden) return;
                renderDropdown($m, itemsFor({ items: [{ electron: true, submenu: 'recent' }] }));
                $m.prop('hidden', false);
            });
            $(document).on('click', function (e) {
                if ($(e.target).closest('.atb-dropdown').length === 0) closeMenus();
            });
            document.addEventListener('keydown', onMenuKeydown);
            document.addEventListener('keydown', onShortcut);
        },
        addRecent: addRecent,
        isElectron: function () { return isElectron; }
    };
})();
