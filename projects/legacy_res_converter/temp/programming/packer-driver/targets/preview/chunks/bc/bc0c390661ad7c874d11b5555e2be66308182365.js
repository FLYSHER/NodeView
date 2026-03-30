System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, SpriteFrame, CCInteger, Enum, gfx, Material, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, executeInEditMode, SkinController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      CCInteger = _cc.CCInteger;
      Enum = _cc.Enum;
      gfx = _cc.gfx;
      Material = _cc.Material;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8ad14nSD0dOCIUPJS2AFzmW", "SkinController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Sprite', 'SpriteFrame', 'CCInteger', 'Enum', 'gfx', 'Material']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("SkinController", SkinController = (_dec = ccclass('SkinController'), _dec2 = executeInEditMode(true), _dec3 = property([SpriteFrame]), _dec4 = property(Material), _dec5 = property({
        type: Enum(gfx.BlendFactor),
        displayName: 'Src Blend'
      }), _dec6 = property({
        type: Enum(gfx.BlendFactor),
        displayName: 'Dst Blend'
      }), _dec7 = property({
        type: CCInteger,
        displayName: 'Current Skin Index',
        step: 1,
        min: 0,
        tooltip: 'toolip sample...'
      }), _dec(_class = _dec2(_class = (_class2 = class SkinController extends Component {
        constructor() {
          super(...arguments);

          // 인스펙터에 노출하자
          _initializerDefineProperty(this, "frames", _descriptor, this);

          _initializerDefineProperty(this, "_currSkinIdx", _descriptor2, this);

          // 💡 에디터 인스펙터에서 SkinMaterial.mtl을 여기에 드래그해서 넣어주세요.
          _initializerDefineProperty(this, "skinMaterial", _descriptor3, this);

          // 2. 위에서 정의한 Enum을 타입으로 사용합니다.
          _initializerDefineProperty(this, "srcBlend", _descriptor4, this);

          _initializerDefineProperty(this, "dstBlend", _descriptor5, this);
        }

        get currentSkinIndex() {
          return this._currSkinIdx;
        }

        set currentSkinIndex(value) {
          // 범위를 frames의 개수 안으로 강제 제한 (Clamp)
          var safeIdx = Math.max(0, Math.min(value, this.frames.length - 1));
          this._currSkinIdx = safeIdx; // 실제 내부 값도 보정된 값으로 저장

          this.setBoneSkinIndex(safeIdx); // 스킨 적용
        }

        setBoneSkinIndex(index) {
          if (index < 0 || index >= this.frames.length) return;
          var sprite = this.getComponent(Sprite);

          if (sprite && this.frames[index]) {
            sprite.spriteFrame = this.frames[index]; // 💡 블렌딩 설정이 필요한 경우 (예: srcBlend가 Normal(2)이 아닌 경우)

            if (this.srcBlend !== 2 || this.dstBlend !== 4) {
              // 커스텀 재질 적용 및 수치 주입
              if (this.skinMaterial) {
                // 재질의 인스턴스를 생성하여 해당 노드만 독립적으로 블렌딩 변경
                var matInstance = sprite.getMaterialInstance(0) || this.skinMaterial;
                sprite.customMaterial = matInstance;
                var pass = matInstance.passes[0];
                var target = pass.blendState.targets[0];
                target.blend = true;
                target.blendSrc = this.srcBlend;
                target.blendDst = this.dstBlend;
                pass.update();
              }
            } else {
              // Normal 모드라면 기본 재질로 복구
              sprite.customMaterial = null;
            }

            sprite.markForUpdateRenderData();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "_currSkinIdx", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "skinMaterial", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "srcBlend", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return gfx.BlendFactor.SRC_ALPHA;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "dstBlend", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return gfx.BlendFactor.ONE_MINUS_SRC_ALPHA;
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "currentSkinIndex", [_dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSkinIndex"), _class2.prototype)), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bc0c390661ad7c874d11b5555e2be66308182365.js.map