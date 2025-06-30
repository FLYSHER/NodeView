const LayoutManager = (function() {

    // private: 디바운스를 적용하여 너무 잦은 저장을 방지하는 함수
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // private: 실제 저장 로직
    function saveLayout(layoutInstance) {
        if (!layoutInstance) return;

        // Golden Layout의 현재 상태를 설정 객체로 가져옵니다.
        const layoutConfig = layoutInstance.toConfig();

        // JSON 문자열로 변환하여 localStorage에 저장합니다.
        localStorage.setItem('golden-layout-config', JSON.stringify(layoutConfig));
        console.log('레이아웃 자동 저장 완료 (Golden Layout)');
    }

    // 디바운스가 적용된 저장 함수
    const debouncedSave = debounce(saveLayout, 500);

    return {
        /**
         * localStorage에서 저장된 레이아웃 설정을 불러옵니다.
         * @returns {object|null} 저장된 레이아웃 설정 객체 또는 null
         */
        load: function() {
            const savedData = localStorage.getItem('golden-layout-config');
            if (savedData) {
                console.log('저장된 레이아웃을 불러옵니다 (Golden Layout).');
                try {
                    return JSON.parse(savedData);
                } catch (e) {
                    console.error("저장된 레이아웃 파싱 실패:", e);
                    localStorage.removeItem('golden-layout-config');
                    return null;
                }
            }
            return null;
        },

        /**
         * 현재 레이아웃 저장을 요청합니다. (디바운스 적용)
         * @param {object} layoutInstance - Golden Layout 인스턴스
         */
        save: function(layoutInstance) {
            debouncedSave(layoutInstance);
        }
    };
})();