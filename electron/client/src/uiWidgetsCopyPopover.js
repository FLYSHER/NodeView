/**
 * uiWidgets 복사 팝오버 / 빠른 복사 / 토스트
 * 실제 복사 대상(노드 이름 목록)은 init 시 전달받은 resolve(opts, targetNode) 가 결정한다.
 *   resolve 반환값: { entries: [{name, classname}], sourceLabel: string } 또는 null
 */
var UIWidgetsCopyPopover = (function () {
    var _resolve = null;
    var $pop = null;
    var _opts = null;
    var _targetNode = null;   // 우클릭 메뉴로 지정된 노드 (없으면 현재 선택 노드)
    var _toastTimer = null;

    function _escape(text) {
        return String(text).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function _summary(result) {
        var text = '항목 ' + result.itemCount;
        if (result.arrays.length > 0) {
            text += ' · 배열 ' + result.arrays.length + ' (' + result.arrays.map(function (a) {
                return a.name + ' × ' + a.count;
            }).join(', ') + ')';
        }
        return text;
    }

    function _ensureDom() {
        if ($pop) return;

        $pop = $(
            '<div id="uiw-popover" class="uiw-popover" role="dialog" aria-label="uiWidgets 코드 복사" style="display: none;">' +
            '  <div class="uiw-header">' +
            '    <div class="uiw-header-text">' +
            '      <div class="uiw-title">uiWidgets 코드 복사</div>' +
            '      <div class="uiw-source"></div>' +
            '    </div>' +
            '    <button type="button" class="uiw-close" aria-label="닫기">&times;</button>' +
            '  </div>' +
            '  <div class="uiw-options">' +
            '    <span class="uiw-label">범위</span>' +
            '    <div class="uiw-segment">' +
            '      <button type="button" data-scope="all">전체</button>' +
            '      <button type="button" data-scope="subtree">선택 노드 하위</button>' +
            '    </div>' +
            '    <label class="uiw-label" for="uiw-varname">변수명</label>' +
            '    <input type="text" id="uiw-varname" class="uiw-input" spellcheck="false">' +
            '    <span class="uiw-label uiw-label-top">규칙</span>' +
            '    <div class="uiw-checks">' +
            '      <label><input type="checkbox" data-opt="groupSequences"> 연번 이름(…01, …02)을 배열 [] 로 묶기</label>' +
            '      <label><input type="checkbox" data-opt="includeRoot"> 시작 노드 자신도 포함</label>' +
            '      <label><input type="checkbox" data-opt="excludeContainers"> 컨테이너(Panel · Layout) 제외</label>' +
            '      <label><input type="checkbox" data-opt="excludeAutoNames"> 자동 생성 이름 제외 <span class="uiw-hint">(Panel_14, Image_3 …)</span></label>' +
            '    </div>' +
            '  </div>' +
            '  <div class="uiw-preview-head"><span>미리보기</span><span class="uiw-summary"></span></div>' +
            '  <pre class="uiw-preview"></pre>' +
            '  <div class="uiw-footer">' +
            '    <label><input type="checkbox" data-opt="remember"> 옵션 기억하기</label>' +
            '    <span class="uiw-spacer"></span>' +
            '    <button type="button" class="styleButton uiw-cancel">취소</button>' +
            '    <button type="button" class="styleButton uiw-copy">복사 <span class="uiw-shortcut">Ctrl+Shift+C</span></button>' +
            '  </div>' +
            '</div>'
        ).appendTo('body');

        $pop.on('click', '.uiw-close, .uiw-cancel', close);
        $pop.on('click', '.uiw-segment button:not(:disabled)', function () {
            _opts.scope = $(this).data('scope');
            _render();
        });
        $pop.on('change', 'input[data-opt]', function () {
            _opts[$(this).data('opt')] = this.checked;
            _render();
        });
        $pop.on('input', '#uiw-varname', function () {
            _opts.varName = this.value.trim() || UIWidgetsCopy.DEFAULT_OPTIONS.varName;
            _render();
        });
        $pop.on('click', '.uiw-copy', function () {
            // 우클릭으로 지정한 노드에 대한 '하위' 범위는 일회성이므로 저장하지 않는다
            var toSave = Object.assign({}, _opts);
            if (_targetNode) toSave.scope = UIWidgetsCopy.loadOptions().scope;
            UIWidgetsCopy.saveOptions(toSave);
            updateCount();
            copyNow(_opts, _targetNode);
            close();
        });

        // 바깥 클릭 / Esc 로 닫기
        $(document).on('mousedown.uiwPopover', function (e) {
            if (!isOpen()) return;
            if ($(e.target).closest('#uiw-popover, #copyOptionsBtn').length) return;
            close();
        });
        $(document).on('keydown.uiwPopover', function (e) {
            if (isOpen() && e.key === 'Escape') close();
        });
    }

    function _syncControls() {
        $pop.find('#uiw-varname').val(_opts.varName);
        $pop.find('input[data-opt]').each(function () {
            this.checked = !!_opts[$(this).data('opt')];
        });
    }

    function _render() {
        var subtreeAvailable = !!_resolve({ scope: 'subtree', includeRoot: true }, _targetNode);
        if (!subtreeAvailable && _opts.scope === 'subtree') _opts.scope = 'all';

        $pop.find('.uiw-segment button').each(function () {
            var scope = $(this).data('scope');
            $(this).toggleClass('active', scope === _opts.scope);
            if (scope === 'subtree') $(this).prop('disabled', !subtreeAvailable);
        });

        var source = _resolve(_opts, _targetNode);
        if (!source || source.entries.length === 0) {
            $pop.find('.uiw-source').text('');
            $pop.find('.uiw-summary').text('');
            $pop.find('.uiw-preview').text('복사할 노드가 없습니다. Hierarchy에서 UI 노드를 선택해 주세요.');
            $pop.find('.uiw-copy').prop('disabled', true);
            return;
        }

        var result = UIWidgetsCopy.build(source.entries, _opts);
        $pop.find('.uiw-source').text(source.sourceLabel);
        $pop.find('.uiw-summary').text(_summary(result));
        $pop.find('.uiw-preview').html(_highlight(result.text));
        $pop.find('.uiw-copy').prop('disabled', false);
    }

    function _highlight(text) {
        return _escape(text)
            .replace(/^(\s+)([^:\n]+)(: )(null)/gm, '$1<span class="uiw-key">$2</span>$3<span class="uiw-null">$4</span>')
            .replace(/^(\s+)([^:\n]+)(: )(\[\])/gm, '$1<span class="uiw-key">$2</span>$3<span class="uiw-array">$4</span>');
    }

    function _position(anchorEl) {
        var popW = $pop.outerWidth();
        var popH = $pop.outerHeight();
        var winW = $(window).width();
        var winH = $(window).height();
        var rect = anchorEl ? anchorEl.getBoundingClientRect()
            : { left: (winW - popW) / 2, right: (winW - popW) / 2, top: (winH - popH) / 2, bottom: (winH + popH) / 2 };

        // 기본은 앵커가 있는 패널의 오른쪽(아래쪽 정렬), 공간이 없으면 앵커 위/아래
        var panel = anchorEl ? $(anchorEl).closest('.lm_item_container, .lm_content')[0] : null;
        var sideLeft = (panel ? panel.getBoundingClientRect().right : rect.right) + 8;
        var left, top;
        if (sideLeft + popW <= winW - 8) {
            left = sideLeft;
            top = rect.bottom - popH;
        } else {
            left = Math.min(Math.max(8, rect.left), winW - popW - 8);
            top = rect.top - popH - 8;
            if (top < 8) top = rect.bottom + 8;
        }
        top = Math.min(Math.max(8, top), winH - popH - 8);
        $pop.css({ left: left, top: Math.max(8, top) });
    }

    function isOpen() {
        return !!$pop && $pop.is(':visible');
    }

    function open(anchorEl, targetNode) {
        _ensureDom();
        _opts = UIWidgetsCopy.loadOptions();
        _targetNode = targetNode || null;
        if (_targetNode) _opts.scope = 'subtree';
        _syncControls();
        _render();
        $pop.show();
        _position(anchorEl);
        $pop.find('.uiw-copy').trigger('focus');
    }

    function close() {
        if ($pop) $pop.hide();
        _targetNode = null;
    }

    function toggle(anchorEl) {
        if (isOpen()) close();
        else open(anchorEl);
    }

    // 옵션을 묻지 않고 바로 복사 (버튼 / 단축키 / 우클릭 메뉴)
    function copyNow(opts, targetNode) {
        var options = opts || UIWidgetsCopy.loadOptions();
        var source = _resolve(options, targetNode || null);
        if (!source && options.scope === 'subtree') {
            // 선택된 노드가 없으면 전체 범위로 대신 복사
            options = Object.assign({}, options, { scope: 'all' });
            source = _resolve(options, null);
        }
        if (!source || source.entries.length === 0) {
            showToast('복사할 노드가 없습니다', 'Hierarchy에서 UI 노드를 선택해 주세요.', true);
            return null;
        }
        var result = UIWidgetsCopy.build(source.entries, options);
        if (typeof copyStringToClipboard === 'function') {
            copyStringToClipboard(result.text);
        }
        showToast('uiWidgets ' + result.itemCount + '개 항목 복사됨', source.sourceLabel + ' · ' + _summary(result));
        return result;
    }

    // uiWidgets 복사 버튼 옆 "전체 · 9항목" (선택·트리가 바뀐 뒤 한 번만 계산)
    var _countTimer = null;
    function updateCount() {
        if (_countTimer) return;
        _countTimer = setTimeout(function () {
            _countTimer = null;
            var el = document.getElementById('uiwCount');
            if (!el || !_resolve) return;
            var options = UIWidgetsCopy.loadOptions();
            var source = _resolve(options, null);
            if (!source && options.scope === 'subtree') {
                options = Object.assign({}, options, { scope: 'all' });
                source = _resolve(options, null);
            }
            if (!source || source.entries.length === 0) { el.textContent = ''; return; }
            var result = UIWidgetsCopy.build(source.entries, options);
            el.textContent = (options.scope === 'subtree' ? '선택 하위' : '전체') + ' · ' + result.itemCount + '항목';
            el.title = source.sourceLabel;
        }, 0);
    }

    function showToast(title, detail, isError) {
        var $toast = $('#nv-toast');
        if ($toast.length === 0) {
            $toast = $('<div id="nv-toast" class="nv-toast" role="status" aria-live="polite"></div>').appendTo('body');
        }
        $toast.toggleClass('error', !!isError)
            .html('<div class="nv-toast-title">' + _escape(title) + '</div>' +
                  (detail ? '<div class="nv-toast-detail">' + _escape(detail) + '</div>' : ''))
            .stop(true, true).fadeIn(120);
        clearTimeout(_toastTimer);
        _toastTimer = setTimeout(function () { $toast.fadeOut(200); }, 2600);
    }

    function init(resolveFn) {
        _resolve = resolveFn;

        // 단축키 Ctrl+Shift+C (입력 중에는 무시)
        $(document).on('keydown.uiwShortcut', function (e) {
            if (!(e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c'))) return;
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            e.preventDefault();
            if (isOpen()) {
                $pop.find('.uiw-copy').trigger('click');
            } else {
                copyNow();
            }
        });
    }

    return {
        init: init,
        open: open,
        close: close,
        toggle: toggle,
        isOpen: isOpen,
        copyNow: copyNow,
        updateCount: updateCount,
        showToast: showToast
    };
})();
