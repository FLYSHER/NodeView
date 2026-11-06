/**
 * 바로 뜨는 툴팁 (브라우저 기본 title 툴팁은 1초 가까이 늦게 뜬다)
 *  - 요소에 data-tip="첫 줄(굵게)\n둘째 줄\n…" 을 달면 마우스를 올리는 즉시 위쪽에 보여준다
 *  - 마우스를 누르거나(드래그 시작) 스크롤하면 숨긴다
 */
var QuickTip = (function () {
    var $tip = null;
    var _target = null;

    function ensure() {
        if (!$tip) $tip = $('<div class="quick-tip" role="tooltip" hidden></div>').appendTo('body');
        return $tip;
    }

    function show(el) {
        var text = el.getAttribute('data-tip');
        if (!text) return;
        _target = el;
        // 부모의 기본 title 툴팁이 1초 뒤에 겹쳐 뜨지 않게 잠시 떼어 둔다
        $(el).parents('[title]').each(function () {
            this.setAttribute('data-tip-title', this.getAttribute('title'));
            this.removeAttribute('title');
        });
        var lines = text.split('\n');
        var $t = ensure().empty();
        $('<div class="quick-tip-title"></div>').text(lines[0]).appendTo($t);
        lines.slice(1).forEach(function (line) { $('<div class="quick-tip-line"></div>').text(line).appendTo($t); });
        $t.prop('hidden', false);

        // 요소 위 가운데, 화면 밖으로 나가면 안쪽으로 / 위에 자리가 없으면 아래로
        var r = el.getBoundingClientRect();
        var w = $t.outerWidth(), h = $t.outerHeight();
        var left = Math.max(6, Math.min(window.innerWidth - w - 6, r.left + r.width / 2 - w / 2));
        var top = r.top - h - 6;
        if (top < 6) top = r.bottom + 6;
        $t.css({ left: left + 'px', top: top + 'px' });
    }

    function hide() {
        if (_target) {
            $(_target).parents('[data-tip-title]').each(function () {
                this.setAttribute('title', this.getAttribute('data-tip-title'));
                this.removeAttribute('data-tip-title');
            });
        }
        _target = null;
        if ($tip) $tip.prop('hidden', true);
    }

    function init() {
        $(document).on('mouseover', '[data-tip]', function () { show(this); });
        $(document).on('mouseout', '[data-tip]', function (e) {
            if (_target && (!e.relatedTarget || !_target.contains(e.relatedTarget))) hide();
        });
        $(document).on('mousedown wheel', hide);
        window.addEventListener('scroll', hide, true);
    }

    $(init);
    return { hide: hide };
})();
