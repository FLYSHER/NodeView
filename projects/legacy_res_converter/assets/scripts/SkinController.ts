// SkinController.ts
import { _decorator, Component, Sprite, SpriteFrame, CCInteger, Material, UITransform } from 'cc';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('SkinController')
@executeInEditMode(true)
export class SkinController extends Component {

    private _lastAppliedIdx: number = -1;

    @property([SpriteFrame])
    public frames: SpriteFrame[] = [];

    public baseAnchorX: number = 0.5;
    public baseAnchorY: number = 0.5;

    private _currSkinIdx: number = 0;
    private _currBlendMode: number = -1;

    private static materialMap: Map<number, Material> = new Map();

    public static setSharedMaterials(mats: Record<string, Material>) {
        if (mats.Normal) this.materialMap.set(0, mats.Normal);
        if (mats.Additive) this.materialMap.set(1, mats.Additive);
        if (mats.LinearAdd) this.materialMap.set(2, mats.LinearAdd);
        if (mats.Multiply) this.materialMap.set(3, mats.Multiply);
    }

    @property({ type: CCInteger, step: 1, displayName: "Blend Mode Index" })
    get blendMode() { return this._currBlendMode; }
    set blendMode( value: number ) {
        const modeIdx = Math.round( value );
        if( this._currBlendMode === modeIdx ) return;

        this._currBlendMode = modeIdx;

        const sprite = this.getComponent(Sprite);
        if(!sprite) return;

        const mtl = (this.constructor as typeof SkinController).materialMap.get(modeIdx);
        if (mtl) sprite.customMaterial = mtl;
    }

    @property({ type: CCInteger, displayName: 'Current Skin Index', step:1, min :0 })
    get currentSkinIndex() { return this._currSkinIdx; }
    set currentSkinIndex(value: number) {
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

    public setBoneSkinIndex(index: number ) {
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

            const rectLeft = (origW / 2) + offsetX - (rectW / 2);
            const rectBottom = (origH / 2) + offsetY - (rectH / 2);

            let calcX = rectW > 0 ? (pivotOrigX - rectLeft) / rectW : 0.5;
            let calcY = rectH > 0 ? (pivotOrigY - rectBottom) / rectH : 0.5;

            const finalAnchorX = Math.max(0.0, Math.min(1.0, calcX));
            const finalAnchorY = Math.max(0.0, Math.min(1.0, calcY));

            uiTrans.setAnchorPoint(finalAnchorX, finalAnchorY);
            sprite.markForUpdateRenderData();
        }
    }
}