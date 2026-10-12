/**
 * Armature 본 디버그 표시
 * cocos2d-html5 의 ccs.Armature 에는 Spine 의 setDebugBonesEnabled 같은 기능이 없어서
 * 씬 최상단에 DrawNode 를 두고 매 프레임 본 위치(월드 좌표)를 직접 그린다.
 */
var ArmatureDebugDraw = {
    Z_ORDER: 999998,                          // Gizmo(999999) 바로 아래
    BONE_COLOR: cc.color(255, 159, 67, 255),
    JOINT_COLOR: cc.color(76, 141, 255, 255),

    isEnabled: function (armature) {
        return !!(armature && armature.__debugDrawNode);
    },

    setEnabled: function (armature, enabled) {
        if (!armature) return;
        if (!enabled) {
            this._detach(armature);
            return;
        }
        if (armature.__debugDrawNode) return;

        var scene = cc.director.getRunningScene();
        if (!scene) return;

        var drawNode = new cc.DrawNode();
        scene.addChild(drawNode, this.Z_ORDER);
        armature.__debugDrawNode = drawNode;

        var self = this;
        drawNode.schedule(function () {
            self._draw(drawNode, armature);
        }, 0);
    },

    _detach: function (armature) {
        var drawNode = armature.__debugDrawNode;
        if (drawNode) {
            drawNode.unscheduleAllCallbacks();
            drawNode.removeFromParent(true);
        }
        armature.__debugDrawNode = null;
    },

    _isVisibleInTree: function (node) {
        for (var p = node; p; p = p.getParent()) {
            if (!p.isVisible()) return false;
        }
        return true;
    },

    _draw: function (drawNode, armature) {
        // 노드가 삭제되면(onExit) 디버그 표시도 함께 정리
        if (!armature.isRunning()) {
            this._detach(armature);
            return;
        }

        drawNode.clear();
        if (!this._isVisibleInTree(armature)) return;

        var boneDic = armature.getBoneDic();
        var worldPos = function (bone) {
            var t = bone.getNodeToWorldTransform();
            return cc.p(t.tx, t.ty);
        };

        for (var name in boneDic) {
            var bone = boneDic[name];
            var pos = worldPos(bone);
            var parentBone = bone.getParentBone();
            if (parentBone) {
                drawNode.drawSegment(worldPos(parentBone), pos, 1, this.BONE_COLOR);
            }
            drawNode.drawDot(pos, 3, this.JOINT_COLOR);
        }
    }
};
