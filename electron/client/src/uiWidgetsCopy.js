/**
 * uiWidgets 코드 생성
 * UI(ExportJson) 위젯 트리의 노드 이름을 모아
 *   this._uiWidgets = {
 *       name: null,
 *       item: [],      // item01, item02 ... 연번 이름은 배열로 묶음
 *   };
 * 형태의 문자열을 만든다.
 *
 * 기본 옵션의 출력은 기존 getOriginalTreeString 과 완전히 동일하다.
 * (연번 배열 항목이 객체 끝에 붙는 순서까지 포함)
 */
var UIWidgetsCopy = (function () {

    var STORAGE_KEY = 'uiWidgetsCopyOptions';

    var DEFAULT_OPTIONS = {
        scope: 'all',              // 'all' | 'subtree'
        varName: 'this._uiWidgets',
        groupSequences: true,      // 연번 이름(...01, ...02)을 배열로 묶기
        includeRoot: true,         // 시작 노드 자신 포함
        excludeContainers: false,  // Panel / Layout 등 컨테이너 제외
        excludeAutoNames: false,   // Panel_14, Image_3 처럼 에디터가 자동으로 붙인 이름 제외
        remember: true
    };

    var CONTAINER_CLASSES = ['Panel', 'Layout', 'ScrollView', 'ListView', 'PageView'];
    var AUTO_NAME_REGEX = /^(Panel|Layout|Image|ImageView|Button|Label|Text|TextField|TextArea|CheckBox|Slider|LoadingBar|ScrollView|ListView|PageView|TextAtlas|TextBMFont|LabelAtlas|LabelBMFont|Node|Sprite|Widget)_\d+$/;

    function loadOptions() {
        var opts = Object.assign({}, DEFAULT_OPTIONS);
        try {
            var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (saved && saved.remember) {
                Object.assign(opts, saved);
            }
        } catch (e) { /* 저장된 옵션이 없거나 손상됨 → 기본값 */ }
        return opts;
    }

    function saveOptions(opts) {
        try {
            if (opts.remember) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(opts));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (e) { /* localStorage 사용 불가 */ }
    }

    // ---- 이름 수집 -------------------------------------------------------

    // widgetTree(json) 를 순회하며 { name, classname } 수집
    function collectFromWidgetTree(widgetTree, includeRoot) {
        var entries = [];
        var traverse = function (node, isRoot) {
            if (!node) return;
            if ((!isRoot || includeRoot) && node.options && node.options.name) {
                entries.push({ name: node.options.name, classname: node.classname || '' });
            }
            if (node.children && node.children.length > 0) {
                node.children.forEach(function (child) { traverse(child, false); });
            }
        };
        traverse(widgetTree, true);
        return entries;
    }

    // cocos 노드 트리를 순회하며 수집 (widgetTree 를 찾을 수 없을 때 사용)
    function collectFromNode(node, includeRoot) {
        var entries = [];
        var traverse = function (n, isRoot) {
            if (!n) return;
            var name = n.getName ? n.getName() : '';
            if ((!isRoot || includeRoot) && name) {
                entries.push({ name: name, classname: _classNameOf(n) });
            }
            var children = n.getChildren ? n.getChildren() : [];
            children.forEach(function (child) { traverse(child, false); });
        };
        traverse(node, true);
        return entries;
    }

    function _classNameOf(node) {
        if (typeof ccui !== 'undefined') {
            if (node instanceof ccui.ScrollView) return 'ScrollView';
            if (node instanceof ccui.Layout) return 'Panel';
        }
        return '';
    }

    // selectedNode 가 UI 루트(uiRoot) 아래 어디인지 이름 경로로 찾아 widgetTree 의 해당 노드를 반환
    function findWidgetTreeNode(widgetTree, uiRoot, selectedNode) {
        if (!widgetTree || !uiRoot || !selectedNode) return null;
        if (selectedNode === uiRoot) return widgetTree;

        var path = [];
        for (var p = selectedNode; p && p !== uiRoot; p = p.getParent()) {
            path.unshift(p.getName());
        }
        if (!p) return null; // uiRoot 아래가 아님

        var current = widgetTree;
        for (var i = 0; i < path.length; i++) {
            var children = current.children || [];
            var next = null;
            for (var j = 0; j < children.length; j++) {
                if (children[j].options && children[j].options.name === path[i]) {
                    next = children[j];
                    break;
                }
            }
            if (!next) return null;
            current = next;
        }
        return current;
    }

    // ---- 문자열 생성 -----------------------------------------------------

    function build(entries, options) {
        var opts = Object.assign({}, DEFAULT_OPTIONS, options);

        var filtered = entries.filter(function (e) {
            if (opts.excludeContainers && CONTAINER_CLASSES.indexOf(e.classname) >= 0) return false;
            if (opts.excludeAutoNames && AUTO_NAME_REGEX.test(e.name)) return false;
            return true;
        });

        // 기존 로직과 동일하게 객체 키 순서를 그대로 사용 (중복 이름은 하나로 합쳐짐)
        var processedItems = {};
        filtered.forEach(function (e) {
            processedItems[e.name] = { name: e.name, isArray: false };
        });

        var arrays = [];
        if (opts.groupSequences) {
            var nameKeys = Object.keys(processedItems);
            for (var k = 0; k < nameKeys.length; k++) {
                var match = nameKeys[k].match(/^(.*?)(\d+)$/);
                if (match && match[2] === '01') {
                    var baseName = match[1];
                    var sequence = [];
                    var i = 1;
                    while (true) {
                        var nextName = baseName + (i < 10 ? '0' + i : String(i));
                        if (processedItems[nextName]) {
                            sequence.push(nextName);
                            i++;
                        } else {
                            break;
                        }
                    }
                    if (sequence.length > 1) {
                        sequence.forEach(function (seqName) { delete processedItems[seqName]; });
                        processedItems[baseName] = { name: baseName, isArray: true };
                        arrays.push({ name: baseName, count: sequence.length });
                    }
                }
            }
        }

        var text = opts.varName + " = {\n";
        var itemCount = 0;
        for (var key in processedItems) {
            text += '    ' + key + (processedItems[key].isArray ? ': [],\n' : ': null,\n');
            itemCount++;
        }
        text += "};";

        return { text: text, itemCount: itemCount, arrays: arrays };
    }

    return {
        DEFAULT_OPTIONS: DEFAULT_OPTIONS,
        loadOptions: loadOptions,
        saveOptions: saveOptions,
        collectFromWidgetTree: collectFromWidgetTree,
        collectFromNode: collectFromNode,
        findWidgetTreeNode: findWidgetTreeNode,
        build: build
    };
})();
