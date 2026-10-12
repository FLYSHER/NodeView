/**
 * Resource View
 * png / plist(스프라이트 시트) / Spine atlas / fnt 를 Game View 옆 탭에서 직접 본다.
 * GoldenLayout 컴포넌트 'resourceView' 하나가 리소스 파일 하나를 담당한다.
 *   componentState: { fileName, kind }
 */
var ResourceView = (function () {

    var KIND_LABEL = { png: 'PNG', plist: 'PLIST', atlas: 'ATLAS', fnt: 'FNT' };
    var MIN_ZOOM = 0.05;
    var MAX_ZOOM = 32;

    function esc(text) {
        return $('<div>').text(text == null ? '' : String(text)).html();
    }

    function stem(fileName) {
        return cc.path.mainFileName(String(fileName).split(/[\\\/]/).pop());
    }

    function textureImage(name) {
        var s = stem(name);
        var tex = Loader.textures[s] || cc.loader.cache[name] || cc.loader.cache['image/' + name];
        if (tex && tex.getHtmlElementObj) return { tex: tex, img: tex.getHtmlElementObj() };
        return null;
    }

    function formatBytes(bytes) {
        if (bytes == null) return '—';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1024 / 1024).toFixed(1) + ' MB';
    }

    function findEntry(fileName) {
        if (ResourceMapData[fileName]) return ResourceMapData[fileName];
        var lower = fileName.toLowerCase();
        for (var key in ResourceMapData) {
            if (key.toLowerCase() === lower) return ResourceMapData[key];
        }
        return null;
    }

    // ---- 모델: 파일 종류별로 텍스처 + 영역(프레임/리전/문자) 목록을 만든다 ----------

    function buildModel(fileName, kind, pageIndex) {
        var s = stem(fileName);

        // png 가 시트/아틀라스의 텍스처면 그 구조를 함께 보여준다
        if (kind === 'png') {
            if (Loader.plistFiles[s]) return buildModel(s + '.plist', 'plist');
            for (var i = 0; i < Loader.atlasList.length; i++) {
                var pages = ResourceRegistry.parseAtlas(Loader.atlasFiles[Loader.atlasList[i]]);
                for (var p = 0; p < pages.length; p++) {
                    if (pages[p].name.toLowerCase() === fileName.toLowerCase()) {
                        return buildModel(Loader.atlasList[i] + '.atlas', 'atlas', p);
                    }
                }
            }
            return {
                kind: 'png', fileName: fileName, textureName: fileName,
                texture: textureImage(fileName), items: [], listTitle: null
            };
        }

        if (kind === 'plist') {
            var conf = Loader.plistFiles[s];
            var usage = ResourceRegistry.getFrameUsage(fileName);
            var items = [];
            if (conf) {
                Object.keys(conf.frames).sort().forEach(function (name) {
                    var f = conf.frames[name];
                    var r = f.rect;
                    items.push({
                        name: name,
                        x: r.x, y: r.y,
                        w: f.rotated ? r.height : r.width,
                        h: f.rotated ? r.width : r.height,
                        rotated: !!f.rotated,
                        details: [
                            ['rect', '{' + r.x + ', ' + r.y + ', ' + r.width + ', ' + r.height + '}'],
                            ['offset', '{' + (f.offset ? f.offset.x : 0) + ', ' + (f.offset ? f.offset.y : 0) + '}'],
                            ['sourceSize', f.size ? '{' + f.size.width + ', ' + f.size.height + '}' : '—'],
                            ['rotated', String(!!f.rotated)],
                            ['trimmed', String(!!(f.size && (f.size.width !== r.width || f.size.height !== r.height)))],
                            ['aliases', f.aliases && f.aliases.length ? f.aliases.join(', ') : '—']
                        ],
                        usage: (usage[name] || []).map(function (u) {
                            return { text: u.node ? u.assetName + ' / ' + u.node : u.assetName + ' · ' + u.label, assetKey: u.assetKey, node: u.node };
                        })
                    });
                });
            }
            return {
                kind: 'plist', fileName: fileName, textureName: s + '.png',
                texture: textureImage(s + '.png'), items: items, listTitle: '프레임',
                missingReason: conf ? null : 'plist 가 로드되지 않았습니다.'
            };
        }

        if (kind === 'atlas') {
            var atlasPages = Loader.atlasFiles[s] ? ResourceRegistry.parseAtlas(Loader.atlasFiles[s]) : [];
            var pageIdx = Math.min(pageIndex || 0, Math.max(0, atlasPages.length - 1));
            var page = atlasPages[pageIdx];
            var regionUsage = ResourceRegistry.getSpineRegionUsage(s);
            return {
                kind: 'atlas', fileName: fileName, pages: atlasPages, pageIndex: pageIdx,
                textureName: page ? page.name : s + '.png',
                texture: page ? textureImage(page.name) : null,
                listTitle: '리전',
                missingReason: atlasPages.length ? null : 'atlas 가 로드되지 않았습니다.',
                pageInfo: page,
                items: page ? page.regions.map(function (r) {
                    var swapped = r.rotate === 90 || r.rotate === 270;
                    return {
                        name: r.name,
                        x: r.x, y: r.y,
                        w: swapped ? r.h : r.w,
                        h: swapped ? r.w : r.h,
                        rotated: swapped,
                        details: [
                            ['xy', r.x + ', ' + r.y],
                            ['size', r.w + ' × ' + r.h],
                            ['orig', r.origW + ' × ' + r.origH],
                            ['offset', r.offX + ', ' + r.offY],
                            ['rotate', String(r.rotate)],
                            ['index', String(r.index)],
                            ['page', r.page]
                        ],
                        usage: (regionUsage[r.name] || []).map(function (u) { return { text: u }; })
                    };
                }) : []
            };
        }

        if (kind === 'fnt') {
            var fnt = cc.loader.getRes('image/' + fileName);
            var fntItems = [];
            if (fnt && fnt.fontDefDictionary) {
                Object.keys(fnt.fontDefDictionary).forEach(function (code) {
                    var d = fnt.fontDefDictionary[code];
                    var ch = String.fromCharCode(parseInt(code, 10));
                    fntItems.push({
                        name: (ch.trim() ? ch : '␣') + '  (' + code + ')',
                        x: d.rect.x, y: d.rect.y, w: d.rect.width, h: d.rect.height,
                        rotated: false,
                        details: [
                            ['char', ch.trim() ? ch : '(공백)'],
                            ['id', code],
                            ['rect', '{' + d.rect.x + ', ' + d.rect.y + ', ' + d.rect.width + ', ' + d.rect.height + '}'],
                            ['xOffset', String(d.xOffset)],
                            ['yOffset', String(d.yOffset)],
                            ['xAdvance', String(d.xAdvance)]
                        ],
                        usage: []
                    });
                });
            }
            var atlasName = fnt && fnt.atlasName ? String(fnt.atlasName).split(/[\\\/]/).pop() : s + '.png';
            return {
                kind: 'fnt', fileName: fileName, textureName: atlasName,
                texture: textureImage(atlasName), items: fntItems, listTitle: '문자',
                lineHeight: fnt ? fnt.commonHeight : null,
                missingReason: fnt ? null : 'fnt 가 로드되지 않았습니다.'
            };
        }
        return { kind: kind, fileName: fileName, items: [], texture: null, missingReason: '지원하지 않는 형식입니다.' };
    }

    // ---- 뷰어 ------------------------------------------------------------

    function Viewer(container, state) {
        this.container = container;
        this.fileName = state.fileName;
        this.kind = state.kind;
        this.pageIndex = 0;
        this.zoom = 1;
        this.panX = 0;
        this.panY = 0;
        this.bg = 'checker';
        this.showBounds = true;
        this.showNames = false;
        this.highlightUnused = true;
        this.selected = null;
        this.filter = '';
        this._userMoved = false;
        this._pixelCanvas = null;

        this._build();
        this.reload();

        var self = this;
        this._registryListener = cc.eventManager.addCustomListener(ResourceRegistry.EVENT_CHANGED, function () {
            // 텍스처가 나중에 로드됐을 수 있으므로 모델을 다시 만든다
            if (!self.model || !self.model.texture || self.model.missingReason) self.reload();
        });
        container.on('resize', function () { self._resizeCanvas(); });
        container.on('show', function () { setTimeout(function () { self._resizeCanvas(); }, 0); });
        container.on('destroy', function () { self.destroy(); });
    }

    Viewer.prototype._build = function () {
        var $el = $(
            '<div class="rv-root">' +
            '  <div class="rv-toolbar">' +
            '    <select class="rv-page" aria-label="아틀라스 페이지" style="display: none;"></select>' +
            '    <label><input type="checkbox" class="rv-opt" data-opt="showBounds" checked> 경계</label>' +
            '    <label><input type="checkbox" class="rv-opt" data-opt="showNames"> 이름</label>' +
            '    <label class="rv-unused-opt"><input type="checkbox" class="rv-opt" data-opt="highlightUnused" checked> 미사용 강조</label>' +
            '    <span class="rv-spacer"></span>' +
            '    <span class="rv-label">배경</span>' +
            '    <button type="button" class="rv-bg rv-bg-checker active" data-bg="checker" aria-label="체커 배경"></button>' +
            '    <button type="button" class="rv-bg rv-bg-black" data-bg="black" aria-label="검정 배경"></button>' +
            '    <button type="button" class="rv-bg rv-bg-white" data-bg="white" aria-label="흰색 배경"></button>' +
            '    <button type="button" class="rv-btn rv-zoom-out" aria-label="축소">−</button>' +
            '    <span class="rv-zoom-label">100%</span>' +
            '    <button type="button" class="rv-btn rv-zoom-in" aria-label="확대">+</button>' +
            '    <button type="button" class="rv-btn rv-zoom-1">1:1</button>' +
            '    <button type="button" class="rv-btn rv-fit">화면 맞춤</button>' +
            '  </div>' +
            '  <div class="rv-body">' +
            '    <div class="rv-list">' +
            '      <input type="text" class="rv-search" placeholder="검색">' +
            '      <div class="rv-list-summary"></div>' +
            '      <div class="rv-list-items"></div>' +
            '    </div>' +
            '    <div class="rv-canvas-wrap"><canvas class="rv-canvas"></canvas><div class="rv-readout"></div><div class="rv-message"></div></div>' +
            '    <div class="rv-info"></div>' +
            '  </div>' +
            '</div>'
        );
        this.$el = $el;
        this.canvas = $el.find('.rv-canvas')[0];
        this.ctx = this.canvas.getContext('2d');
        this.container.getElement().append($el);
        this._bind();
    };

    Viewer.prototype._bind = function () {
        var self = this;
        var $el = this.$el;

        $el.on('change', '.rv-opt', function () {
            self[$(this).data('opt')] = this.checked;
            self.draw();
        });
        $el.on('click', '.rv-bg', function () {
            self.bg = $(this).data('bg');
            $el.find('.rv-bg').removeClass('active');
            $(this).addClass('active');
            self.draw();
        });
        $el.on('click', '.rv-zoom-in', function () { self._userMoved = true; self._zoomAt(self.zoom * 1.25); });
        $el.on('click', '.rv-zoom-out', function () { self._userMoved = true; self._zoomAt(self.zoom / 1.25); });
        $el.on('click', '.rv-zoom-1', function () { self._userMoved = true; self._zoomAt(1); });
        $el.on('click', '.rv-fit', function () { self._userMoved = false; self.fit(); });
        $el.on('change', '.rv-page', function () {
            self.pageIndex = parseInt(this.value, 10) || 0;
            self.selected = null;
            self._userMoved = false;
            self.reload();
        });
        $el.on('input', '.rv-search', function () {
            self.filter = this.value.trim().toLowerCase();
            self._renderList();
        });
        $el.on('click', '.rv-item', function () {
            self.select($(this).data('index'), true);
        });
        $el.on('click', '.rv-usage-select', function () {
            var u = self.selected != null ? self.model.items[self.selected].usage[$(this).data('index')] : null;
            if (u) selectSceneNode(u.assetKey, u.node);
        });
        $el.on('click', '.rv-copy-name', function () {
            if (self.selected == null) return;
            var name = self.model.items[self.selected].name;
            copyStringToClipboard(name);
            UIWidgetsCopyPopover.showToast('이름 복사됨', name);
        });
        $el.on('click', '.rv-save-png', function () { self._saveSelectedPng(); });

        // 캔버스: 휠 = 커서 기준 확대/축소, 드래그 = 이동, 클릭 = 선택
        var canvas = this.canvas;
        canvas.addEventListener('wheel', function (e) {
            e.preventDefault();
            var factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
            self._userMoved = true;
            self._zoomAt(self.zoom * factor, e.offsetX, e.offsetY);
        }, { passive: false });

        var drag = null;
        canvas.addEventListener('mousedown', function (e) {
            drag = { x: e.clientX, y: e.clientY, panX: self.panX, panY: self.panY, moved: false };
        });
        window.addEventListener('mousemove', this._onMove = function (e) {
            if (drag) {
                var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
                if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
                if (drag.moved) {
                    self._userMoved = true;
                    self.panX = drag.panX + dx;
                    self.panY = drag.panY + dy;
                    self.draw();
                }
            }
        });
        window.addEventListener('mouseup', this._onUp = function (e) {
            if (drag && !drag.moved && e.target === canvas) {
                var hit = self._hitTest(e.offsetX, e.offsetY);
                self.select(hit, false);
            }
            drag = null;
        });
        canvas.addEventListener('mousemove', function (e) { self._updateReadout(e.offsetX, e.offsetY); });
        canvas.addEventListener('mouseleave', function () { self.$el.find('.rv-readout').text(''); });
    };

    Viewer.prototype.destroy = function () {
        window.removeEventListener('mousemove', this._onMove);
        window.removeEventListener('mouseup', this._onUp);
        if (this._registryListener) cc.eventManager.removeListener(this._registryListener);
    };

    Viewer.prototype.reload = function () {
        this.model = buildModel(this.fileName, this.kind, this.pageIndex);
        this._pixelCanvas = null;

        var $page = this.$el.find('.rv-page');
        if (this.model.kind === 'atlas' && this.model.pages.length > 1) {
            $page.html(this.model.pages.map(function (p, i) {
                return '<option value="' + i + '">' + (i + 1) + ' / ' + this.model.pages.length + ' · ' + esc(p.name) + '</option>';
            }, this).join('')).val(String(this.model.pageIndex)).show();
        } else {
            $page.hide();
        }
        this.$el.find('.rv-unused-opt').toggle(this.model.kind === 'plist');
        this.$el.find('.rv-list').toggle(this.model.items.length > 0 || !!this.model.listTitle);

        this._renderList();
        this._renderInfo();
        this._resizeCanvas();
    };

    Viewer.prototype._isUnused = function (item) {
        return this.model.kind === 'plist' && item.usage.length === 0;
    };

    Viewer.prototype._renderList = function () {
        var self = this;
        var items = this.model.items;
        var unused = items.filter(function (it) { return self._isUnused(it); }).length;
        this.$el.find('.rv-search').attr('placeholder', (this.model.listTitle || '항목') + ' 검색 (' + items.length + ')');
        this.$el.find('.rv-list-summary').text(
            this.model.kind === 'plist' ? '사용 ' + (items.length - unused) + ' · 미사용 ' + unused : ''
        );
        var html = '';
        items.forEach(function (it, i) {
            if (self.filter && it.name.toLowerCase().indexOf(self.filter) < 0) return;
            var cls = 'rv-item' + (i === self.selected ? ' selected' : '') + (self._isUnused(it) ? ' unused' : '');
            var meta = self.model.kind === 'plist' ? (it.usage.length ? it.usage.length : '미사용')
                : (it.usage.length ? it.usage.length : '');
            html += '<div class="' + cls + '" data-index="' + i + '"><span class="rv-item-name">' + esc(it.name) + '</span>' +
                '<span class="rv-item-meta">' + esc(meta) + '</span></div>';
        });
        this.$el.find('.rv-list-items').html(html);
    };

    Viewer.prototype._renderInfo = function () {
        var m = this.model;
        var html = '';
        var tex = m.texture;
        var entry = findEntry(m.textureName || m.fileName);
        var defEntry = findEntry(m.fileName);

        html += '<div class="rv-section">텍스처</div><div class="rv-kv">';
        html += kv('파일', m.textureName || '—');
        if (tex) {
            var w = tex.tex.getPixelsWide(), h = tex.tex.getPixelsHigh();
            html += kv('크기', w + ' × ' + h);
            html += kv('GPU 메모리', formatBytes(w * h * 4) + ' (추정)');
        } else {
            html += kv('상태', '<span class="rv-missing">로드되지 않음</span>', true);
        }
        if (entry) html += kv('파일 크기', formatBytes(entry.size != null ? entry.size : fileBytes(entry)));
        if (m.kind === 'plist') html += kv('프레임', String(m.items.length));
        if (m.kind === 'atlas' && m.pageInfo) {
            html += kv('페이지', (m.pageIndex + 1) + ' / ' + m.pages.length);
            html += kv('포맷', m.pageInfo.format || '—');
            html += kv('필터', m.pageInfo.filter || '—');
            html += kv('리전', String(m.items.length));
        }
        if (m.kind === 'fnt') {
            html += kv('문자', String(m.items.length));
            html += kv('lineHeight', m.lineHeight != null ? String(m.lineHeight) : '—');
        }
        if (defEntry && defEntry.fullPath) html += kv('경로', defEntry.fullPath);
        html += '</div>';

        if (m.missingReason) {
            html += '<div class="rv-note">' + esc(m.missingReason) + '</div>';
        }

        if (this.selected != null && m.items[this.selected]) {
            var it = m.items[this.selected];
            html += '<div class="rv-section">선택: ' + esc(it.name) + '</div>';
            html += '<div class="rv-preview-wrap"><canvas class="rv-preview"></canvas></div><div class="rv-kv">';
            it.details.forEach(function (d) { html += kv(d[0], d[1]); });
            html += '</div>';
            if (it.usage.length > 0 || m.kind === 'plist' || m.kind === 'atlas') {
                html += '<div class="rv-section">' + (m.kind === 'atlas' ? '사용 슬롯 / 어태치먼트' : '사용 노드') + ' <span class="rv-count">' + it.usage.length + '</span></div>';
                if (it.usage.length === 0) {
                    html += '<div class="rv-note">로드된 에셋 중 사용하는 곳이 없습니다.</div>';
                } else {
                    html += '<div class="rv-usage">' + it.usage.slice(0, 50).map(function (u, i) {
                        return '<div class="rv-usage-row"><span>' + esc(u.text) + '</span>' +
                            (u.node ? '<button type="button" class="rv-link rv-usage-select" data-index="' + i + '">선택 →</button>' : '') + '</div>';
                    }).join('') + (it.usage.length > 50 ? '<div class="rv-note">…</div>' : '') + '</div>';
                }
            }
            html += '<div class="rv-actions">' +
                (tex ? '<button type="button" class="styleButton rv-save-png">PNG 저장</button>' : '') +
                '<button type="button" class="styleButton rv-copy-name">이름 복사</button></div>';
        }

        this.$el.find('.rv-info').html(html);
        this._drawPreview();
    };

    function kv(k, v, raw) {
        return '<span class="rv-k">' + esc(k) + '</span><span class="rv-v">' + (raw ? v : esc(v)) + '</span>';
    }

    function fileBytes(entry) {
        if (!entry || !entry.fullPath || typeof require !== 'function') return null;
        try { return require('fs').statSync(entry.fullPath).size; } catch (e) { return null; }
    }

    // 선택 영역을 원래 방향으로 잘라낸 캔버스 (회전 저장된 영역은 반시계 90도로 되돌린다)
    Viewer.prototype._cropItem = function (it) {
        var img = this.model.texture && this.model.texture.img;
        if (!img || it.w <= 0 || it.h <= 0) return null;
        var c = document.createElement('canvas');
        if (it.rotated) {
            c.width = it.h; c.height = it.w;
            var cx = c.getContext('2d');
            cx.translate(0, c.height);
            cx.rotate(-Math.PI / 2);
            cx.drawImage(img, it.x, it.y, it.w, it.h, 0, 0, it.w, it.h);
        } else {
            c.width = it.w; c.height = it.h;
            c.getContext('2d').drawImage(img, it.x, it.y, it.w, it.h, 0, 0, it.w, it.h);
        }
        return c;
    };

    Viewer.prototype._drawPreview = function () {
        var preview = this.$el.find('.rv-preview')[0];
        if (!preview || this.selected == null) return;
        var crop = this._cropItem(this.model.items[this.selected]);
        var wrap = preview.parentNode;
        var maxW = Math.max(40, wrap.clientWidth - 12), maxH = 140;
        if (!crop) { preview.width = 0; preview.height = 0; return; }
        var scale = Math.min(maxW / crop.width, maxH / crop.height, 4);
        preview.width = Math.max(1, Math.round(crop.width * scale));
        preview.height = Math.max(1, Math.round(crop.height * scale));
        var pc = preview.getContext('2d');
        pc.imageSmoothingEnabled = scale < 1;
        pc.drawImage(crop, 0, 0, preview.width, preview.height);
    };

    Viewer.prototype._saveSelectedPng = function () {
        if (this.selected == null) return;
        var it = this.model.items[this.selected];
        var crop = this._cropItem(it);
        if (!crop) return;
        var a = document.createElement('a');
        a.href = crop.toDataURL('image/png');
        a.download = String(it.name).replace(/[\\\/:*?"<>|\s()]+/g, '_').replace(/\.png$/i, '') + '.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    Viewer.prototype._resizeCanvas = function () {
        var wrap = this.canvas.parentNode;
        var w = wrap.clientWidth, h = wrap.clientHeight;
        if (w <= 0 || h <= 0) return;
        var dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.round(w * dpr);
        this.canvas.height = Math.round(h * dpr);
        this.canvas.style.width = w + 'px';
        this.canvas.style.height = h + 'px';
        this.viewW = w;
        this.viewH = h;
        // 사용자가 직접 확대/이동하기 전까지는 패널 크기가 바뀔 때마다 화면에 맞춘다
        if (!this._userMoved && this.model.texture) {
            this.fit();
        } else {
            this.draw();
        }
    };

    Viewer.prototype._imageSize = function () {
        var t = this.model.texture;
        return t ? { w: t.tex.getPixelsWide(), h: t.tex.getPixelsHigh() } : null;
    };

    Viewer.prototype.fit = function () {
        var size = this._imageSize();
        if (!size || !this.viewW) { this.draw(); return; }
        var margin = 24;
        this.zoom = Math.min((this.viewW - margin * 2) / size.w, (this.viewH - margin * 2) / size.h, 1);
        this.zoom = Math.max(MIN_ZOOM, this.zoom);
        this.panX = (this.viewW - size.w * this.zoom) / 2;
        this.panY = (this.viewH - size.h * this.zoom) / 2;
        this.draw();
    };

    Viewer.prototype._zoomAt = function (zoom, sx, sy) {
        zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom));
        if (sx === undefined) { sx = this.viewW / 2; sy = this.viewH / 2; }
        // 커서 아래 텍스처 좌표가 그대로 유지되도록 이동
        var ix = (sx - this.panX) / this.zoom, iy = (sy - this.panY) / this.zoom;
        this.zoom = zoom;
        this.panX = sx - ix * zoom;
        this.panY = sy - iy * zoom;
        this.draw();
    };

    Viewer.prototype._hitTest = function (sx, sy) {
        var ix = (sx - this.panX) / this.zoom, iy = (sy - this.panY) / this.zoom;
        var best = null, bestArea = Infinity;
        this.model.items.forEach(function (it, i) {
            if (ix >= it.x && ix < it.x + it.w && iy >= it.y && iy < it.y + it.h) {
                var area = it.w * it.h;
                if (area < bestArea) { best = i; bestArea = area; }
            }
        });
        return best;
    };

    Viewer.prototype.select = function (index, scrollIntoView) {
        this.selected = index;
        this.$el.find('.rv-item').removeClass('selected');
        if (index != null) {
            var $row = this.$el.find('.rv-item[data-index="' + index + '"]').addClass('selected');
            if ($row.length) $row[0].scrollIntoView({ block: 'nearest' });
            if (scrollIntoView) this._ensureVisible(this.model.items[index]);
        }
        this._renderInfo();
        this.draw();
    };

    Viewer.prototype._ensureVisible = function (it) {
        var x1 = it.x * this.zoom + this.panX, y1 = it.y * this.zoom + this.panY;
        var x2 = x1 + it.w * this.zoom, y2 = y1 + it.h * this.zoom;
        if (x1 >= 0 && y1 >= 0 && x2 <= this.viewW && y2 <= this.viewH) return;
        this.panX = this.viewW / 2 - (it.x + it.w / 2) * this.zoom;
        this.panY = this.viewH / 2 - (it.y + it.h / 2) * this.zoom;
    };

    Viewer.prototype._updateReadout = function (sx, sy) {
        var size = this._imageSize();
        var $r = this.$el.find('.rv-readout');
        if (!size) { $r.text(''); return; }
        var ix = Math.floor((sx - this.panX) / this.zoom), iy = Math.floor((sy - this.panY) / this.zoom);
        if (ix < 0 || iy < 0 || ix >= size.w || iy >= size.h) { $r.text(''); return; }
        if (!this._pixelCanvas) {
            this._pixelCanvas = document.createElement('canvas');
            this._pixelCanvas.width = size.w;
            this._pixelCanvas.height = size.h;
            this._pixelCanvas.getContext('2d', { willReadFrequently: true }).drawImage(this.model.texture.img, 0, 0);
        }
        var text = '픽셀 (' + ix + ', ' + iy + ')';
        try {
            var d = this._pixelCanvas.getContext('2d').getImageData(ix, iy, 1, 1).data;
            text += ' · RGBA ' + d[0] + ' ' + d[1] + ' ' + d[2] + ' ' + d[3];
        } catch (e) { /* 다른 출처 이미지면 픽셀 값을 읽을 수 없음 */ }
        $r.text(text);
    };

    Viewer.prototype.draw = function () {
        var ctx = this.ctx;
        var dpr = window.devicePixelRatio || 1;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.fillStyle = '#101113';
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.$el.find('.rv-zoom-label').text(Math.round(this.zoom * 100) + '%');

        var size = this._imageSize();
        var $msg = this.$el.find('.rv-message');
        if (!size) {
            $msg.text(this.model.missingReason || ((this.model.textureName || '텍스처') + ' 가 로드되지 않았습니다.')).show();
            return;
        }
        $msg.hide();

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        var x = this.panX, y = this.panY, w = size.w * this.zoom, h = size.h * this.zoom;

        // 배경
        if (this.bg === 'checker') {
            if (!this._checker) {
                var pc = document.createElement('canvas');
                pc.width = pc.height = 16;
                var p = pc.getContext('2d');
                p.fillStyle = '#3a3d42'; p.fillRect(0, 0, 16, 16);
                p.fillStyle = '#2c2f33'; p.fillRect(0, 0, 8, 8); p.fillRect(8, 8, 8, 8);
                this._checker = ctx.createPattern(pc, 'repeat');
            }
            ctx.fillStyle = this._checker;
        } else {
            ctx.fillStyle = this.bg === 'black' ? '#000' : '#fff';
        }
        ctx.fillRect(x, y, w, h);

        ctx.imageSmoothingEnabled = this.zoom < 1;
        ctx.drawImage(this.model.texture.img, x, y, w, h);
        ctx.strokeStyle = '#4a4e55';
        ctx.lineWidth = 1;
        ctx.strokeRect(Math.round(x) - 0.5, Math.round(y) - 0.5, Math.round(w) + 1, Math.round(h) + 1);

        if (!this.showBounds && this.selected == null) return;
        var self = this;
        var zoom = this.zoom;
        ctx.font = '11px Consolas, monospace';
        this.model.items.forEach(function (it, i) {
            var isSel = i === self.selected;
            if (!self.showBounds && !isSel) return;
            var rx = x + it.x * zoom, ry = y + it.y * zoom, rw = it.w * zoom, rh = it.h * zoom;
            var unused = self.highlightUnused && self._isUnused(it);
            if (isSel) {
                ctx.fillStyle = 'rgba(76, 141, 255, 0.28)';
                ctx.fillRect(rx, ry, rw, rh);
            } else if (unused) {
                ctx.fillStyle = 'rgba(255, 192, 120, 0.18)';
                ctx.fillRect(rx, ry, rw, rh);
            }
            ctx.setLineDash(unused && !isSel ? [4, 3] : (it.rotated && !isSel ? [2, 2] : []));
            ctx.lineWidth = isSel ? 2 : 1;
            ctx.strokeStyle = isSel ? '#4c8dff' : (unused ? '#ffc078' : (self.model.kind === 'atlas' ? '#ff9f43' : '#e8c547'));
            ctx.strokeRect(rx + 0.5, ry + 0.5, Math.max(0, rw - 1), Math.max(0, rh - 1));
            ctx.setLineDash([]);
            if ((self.showNames || isSel) && rw > 40 && rh > 14) {
                var label = it.name.length > 40 ? it.name.slice(0, 39) + '…' : it.name;
                var tw = ctx.measureText(label).width + 6;
                ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
                ctx.fillRect(rx + 1, ry + 1, Math.min(tw, rw - 2), 14);
                ctx.save();
                ctx.beginPath();
                ctx.rect(rx + 1, ry + 1, rw - 2, 14);
                ctx.clip();
                ctx.fillStyle = '#fff';
                ctx.fillText(label, rx + 4, ry + 12);
                ctx.restore();
            }
        });
    };

    // ---- 씬 노드 선택 ----------------------------------------------------

    function selectSceneNode(assetKey, nodePath) {
        var mainLayer = window.MainLayerInstance;
        if (!mainLayer || !nodePath) return;
        var instance = mainLayer.getChildren().filter(function (c) {
            return c instanceof DraggableNode && c.assetKey === assetKey;
        })[0];
        if (!instance || !instance.ui) {
            UIWidgetsCopyPopover.showToast('씬에 인스턴스가 없습니다', '에셋을 Game View 로 드래그해서 배치한 뒤 다시 시도해 주세요.', true);
            return;
        }
        var names = nodePath.split('/');
        var node = instance.ui;
        if (node.getName() !== names[0]) node = null;
        for (var i = 1; node && i < names.length; i++) {
            node = node.getChildByName(names[i]);
        }
        if (!node) {
            UIWidgetsCopyPopover.showToast('노드를 찾지 못했습니다', nodePath, true);
            return;
        }
        PanelManager.showComponent('gameView');
        mainLayer.updateMenuWithNodeId(node.__instanceId);
        var tree = $('#widgetTree').jstree(true);
        if (tree) {
            tree.deselect_all(true);
            tree.select_node(String(node.__instanceId), true);
            var dom = tree.get_node(String(node.__instanceId), true);
            if (dom && dom.length) dom[0].scrollIntoView({ block: 'nearest' });
        }
    }

    return {
        Viewer: Viewer,
        KIND_LABEL: KIND_LABEL,
        buildModel: buildModel,
        // 이 확장자를 Resource View 로 열 수 있는지
        canOpen: function (kind) {
            return KIND_LABEL.hasOwnProperty(kind);
        }
    };
})();
