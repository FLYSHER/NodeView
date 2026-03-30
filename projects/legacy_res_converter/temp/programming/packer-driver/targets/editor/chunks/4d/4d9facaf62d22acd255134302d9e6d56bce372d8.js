System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, SpriteFrame, CCInteger, UITransform, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _class3, _crd, ccclass, property, executeInEditMode, SkinController;

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
      UITransform = _cc.UITransform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8ad14nSD0dOCIUPJS2AFzmW", "SkinController", undefined); // SkinController.ts


      __checkObsolete__(['_decorator', 'Component', 'Sprite', 'SpriteFrame', 'CCInteger', 'Material', 'UITransform']);

      ({
        ccclass,
        property,
        executeInEditMode
      } = _decorator);

      _export("SkinController", SkinController = (_dec = ccclass('SkinController'), _dec2 = executeInEditMode(true), _dec3 = property([SpriteFrame]), _dec4 = property({
        type: CCInteger,
        step: 1,
        displayName: "Blend Mode Index"
      }), _dec5 = property({
        type: CCInteger,
        displayName: 'Current Skin Index',
        step: 1,
        min: 0
      }), _dec(_class = _dec2(_class = (_class2 = (_class3 = class SkinController extends Component {
        constructor(...args) {
          super(...args);
          this._lastAppliedIdx = -1;

          _initializerDefineProperty(this, "frames", _descriptor, this);

          this.baseAnchorX = 0.5;
          this.baseAnchorY = 0.5;
          this._currSkinIdx = 0;
          this._currBlendMode = -1;
        }

        static setSharedMaterials(mats) {
          if (mats.Normal) this.materialMap.set(0, mats.Normal);
          if (mats.Additive) this.materialMap.set(1, mats.Additive);
          if (mats.LinearAdd) this.materialMap.set(2, mats.LinearAdd);
          if (mats.Multiply) this.materialMap.set(3, mats.Multiply);
        }

        get blendMode() {
          return this._currBlendMode;
        }

        set blendMode(value) {
          const modeIdx = Math.round(value);
          if (this._currBlendMode === modeIdx) return;
          this._currBlendMode = modeIdx;
          const sprite = this.getComponent(Sprite);
          if (!sprite) return;
          const mtl = this.constructor.materialMap.get(modeIdx);
          if (mtl) sprite.customMaterial = mtl;
        }

        get currentSkinIndex() {
          return this._currSkinIdx;
        }

        set currentSkinIndex(value) {
          const intIdx = Math.round(value);

          if (intIdx < 0) {
            if (this._currSkinIdx !== intIdx) {
              this._currSkinIdx = intIdx;
              const sprite = this.getComponent(Sprite);
              if (sprite) sprite.enabled = false;
            }
          } else {
            const safeIdx = Math.min(intIdx, this.frames.length - 1);

            if (this._currSkinIdx !== safeIdx) {
              this._currSkinIdx = safeIdx;
              const sprite = this.getComponent(Sprite);
              if (sprite) sprite.enabled = true;
              this.setBoneSkinIndex(safeIdx);
            }
          }
        }

        setBoneSkinIndex(index) {
          const sprite = this.getComponent(Sprite);
          const uiTrans = this.getComponent(UITransform);
          if (!sprite || !uiTrans) return;

          if (index < 0 || index >= this.frames.length) {
            sprite.enabled = false;
            return;
          }

          const sf = this.frames[index];

          if (sf) {
            sprite.enabled = true;
            sprite.spriteFrame = sf;
            const origW = sf.originalSize.width;
            const origH = sf.originalSize.height;
            const rectW = sf.rect.width;
            const rectH = sf.rect.height;
            const offsetX = sf.offset.x;
            const offsetY = sf.offset.y;
            const pivotOrigX = origW * this.baseAnchorX;
            const pivotOrigY = origH * this.baseAnchorY;
            const rectLeft = origW / 2 + offsetX - rectW / 2;
            const rectBottom = origH / 2 + offsetY - rectH / 2;
            let calcX = rectW > 0 ? (pivotOrigX - rectLeft) / rectW : 0.5;
            let calcY = rectH > 0 ? (pivotOrigY - rectBottom) / rectH : 0.5;
            const finalAnchorX = Math.max(0.0, Math.min(1.0, calcX));
            const finalAnchorY = Math.max(0.0, Math.min(1.0, calcY));
            uiTrans.setAnchorPoint(finalAnchorX, finalAnchorY);
            sprite.markForUpdateRenderData();
          }
        }

      }, _class3.materialMap = new Map(), _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "frames", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "blendMode", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "blendMode"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "currentSkinIndex", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "currentSkinIndex"), _class2.prototype)), _class2)) || _class) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4d9facaf62d22acd255134302d9e6d56bce372d8.js.map