/**
 * Console 패널
 * printLog(로더의 "No resource file" 등), console.warn / console.error, 처리되지 않은 오류를 모아서 보여준다.
 * 예전에는 printLog 가 Game View 캔버스 위에 글자를 띄웠는데, 화면을 가리므로 이 패널로 옮겼다.
 */
var ConsolePanel = (function () {
    var MAX_ENTRIES = 500;
    var EVENT_CHANGED = 'console_log_changed';

    var _entries = [];       // { level: 'info'|'warn'|'error', time: Date, message, count }
    var _filter = 'all';
    var _search = '';
    var _renderTimer = null;

    function esc(text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    }

    function stringify(args) {
        return Array.prototype.map.call(args, function (a) {
            if (a instanceof Error) return a.stack || a.message;
            if (typeof a === 'object') {
                try { return JSON.stringify(a); } catch (e) { return String(a); }
            }
            return String(a);
        }).join(' ');
    }

    function add(level, message) {
        if (!message) return;
        var last = _entries[_entries.length - 1];
        // 같은 메시지가 연달아 오면 한 줄로 묶고 횟수만 올린다
        if (last && last.level === level && last.message === message) {
            last.count++;
            last.time = new Date();
        } else {
            _entries.push({ level: level, time: new Date(), message: message, count: 1 });
            if (_entries.length > MAX_ENTRIES) _entries.shift();
        }
        scheduleRender();
    }

    function counts() {
        var c = { info: 0, warn: 0, error: 0 };
        _entries.forEach(function (e) { c[e.level] += e.count; });
        return c;
    }

    function scheduleRender() {
        clearTimeout(_renderTimer);
        _renderTimer = setTimeout(function () {
            render();
            if (typeof cc !== 'undefined' && cc.eventManager) cc.eventManager.dispatchCustomEvent(EVENT_CHANGED);
        }, 50);
    }

    function render() {
        var $el = $('#console-panel');
        if ($el.length === 0) return;
        var c = counts();
        $el.find('.con-filter[data-filter="all"] .con-count').text(c.info + c.warn + c.error);
        $el.find('.con-filter[data-filter="warn"] .con-count').text(c.warn);
        $el.find('.con-filter[data-filter="error"] .con-count').text(c.error);
        $el.find('.con-filter').removeClass('active').filter('[data-filter="' + _filter + '"]').addClass('active');

        var html = '';
        _entries.forEach(function (e) {
            if (_filter !== 'all' && e.level !== _filter) return;
            if (_search && e.message.toLowerCase().indexOf(_search) < 0) return;
            var t = e.time;
            var time = ('0' + t.getHours()).slice(-2) + ':' + ('0' + t.getMinutes()).slice(-2) + ':' + ('0' + t.getSeconds()).slice(-2);
            html += '<div class="con-row level-' + e.level + '">' +
                '<span class="con-time">' + time + '</span>' +
                '<span class="con-level">' + (e.level === 'error' ? '오류' : e.level === 'warn' ? '경고' : '정보') + '</span>' +
                '<span class="con-message">' + esc(e.message) + '</span>' +
                (e.count > 1 ? '<span class="con-repeat">×' + e.count + '</span>' : '') +
                '</div>';
        });
        var $list = $el.find('.con-list');
        var atBottom = $list[0] && ($list[0].scrollHeight - $list[0].scrollTop - $list[0].clientHeight < 20);
        $list.html(html || '<div class="con-empty">메시지가 없습니다.</div>');
        if (atBottom) $list.scrollTop($list[0].scrollHeight);
    }

    function mount(container) {
        var $el = $(
            '<div id="console-panel" class="console-panel">' +
            '  <div class="con-toolbar">' +
            '    <button type="button" class="con-filter active" data-filter="all">전체 <span class="con-count">0</span></button>' +
            '    <button type="button" class="con-filter" data-filter="warn">경고 <span class="con-count">0</span></button>' +
            '    <button type="button" class="con-filter" data-filter="error">오류 <span class="con-count">0</span></button>' +
            '    <input type="text" class="con-search" placeholder="검색" aria-label="로그 검색">' +
            '    <span class="con-spacer"></span>' +
            '    <button type="button" class="con-btn con-copy">복사</button>' +
            '    <button type="button" class="con-btn con-clear">지우기</button>' +
            '  </div>' +
            '  <div class="con-list"></div>' +
            '</div>'
        );
        container.getElement().append($el);
        $el.on('click', '.con-filter', function () {
            _filter = $(this).data('filter');
            render();
        });
        $el.on('input', '.con-search', function () {
            _search = this.value.trim().toLowerCase();
            render();
        });
        $el.on('click', '.con-clear', function () {
            _entries = [];
            scheduleRender();
        });
        $el.on('click', '.con-copy', function () {
            var text = _entries.map(function (e) {
                return '[' + e.level + '] ' + e.message + (e.count > 1 ? ' (x' + e.count + ')' : '');
            }).join('\n');
            copyStringToClipboard(text);
            UIWidgetsCopyPopover.showToast('로그 복사됨', _entries.length + '줄');
        });
        render();
    }

    // ---- 로그 수집 -------------------------------------------------------

    function install() {
        // printLog: 캔버스 위 표시 대신 Console 로
        window.printLog = function (message) {
            add('warn', String(message));
        };

        ['warn', 'error'].forEach(function (level) {
            var original = console[level].bind(console);
            console[level] = function () {
                original.apply(null, arguments);
                try { add(level, stringify(arguments)); } catch (e) { /* 로그 수집 실패는 무시 */ }
            };
        });

        window.addEventListener('error', function (e) {
            add('error', e.message + (e.filename ? ' (' + e.filename.split('/').pop() + ':' + e.lineno + ')' : ''));
        });
        window.addEventListener('unhandledrejection', function (e) {
            add('error', '처리되지 않은 Promise 오류: ' + stringify([e.reason]));
        });
    }

    install();

    return {
        EVENT_CHANGED: EVENT_CHANGED,
        mount: mount,
        log: function (message) { add('info', String(message)); },
        warn: function (message) { add('warn', String(message)); },
        error: function (message) { add('error', String(message)); },
        counts: counts
    };
})();
