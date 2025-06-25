const LayoutManager = (function() {

    // private: 모듈 내부에서만 사용할 함수
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // private: 실제 저장 로직
    function saveLayout() {
        console.log('레이아웃 자동 저장 (localStorage)');
        const currentLayout = {};
        $('.draggable-panel').each(function() {
            const $panel = $(this);
            const id = $panel.data('config-key');
            if (id) {
                currentLayout[id] = {
                    left: parseInt($panel.css('left'), 10),
                    top: parseInt($panel.css('top'), 10),
                    width: $panel.outerWidth(),
                    height: $panel.outerHeight(),
                    visible: $panel.is(':visible')
                };
            }
        });
        localStorage.setItem('panel-layout', JSON.stringify(currentLayout));
    }

    // private: 디바운스가 적용된 저장 함수
    const debouncedSave = debounce(saveLayout, 500);

    // public: 외부에서 호출할 수 있도록 공개할 메서드들
    return {
        /**
         * 저장된 레이아웃 데이터를 localStorage에서 불러옵니다.
         * @returns {object|null} 저장된 레이아웃 객체 또는 null
         */
        load: function() {
            const savedData = localStorage.getItem('panel-layout');
            if (savedData) {
                console.log('저장된 레이아웃을 불러옵니다 (localStorage).');
                return JSON.parse(savedData);
            } else {
                console.log('저장된 레이아웃이 없어 기본 레이아웃을 사용합니다.');
                return null;
            }
        },

        /**
         * 현재 패널 레이아웃 저장을 요청합니다. (디바운스 적용)
         */
        save: function() {
            debouncedSave();
        }
    };
})();