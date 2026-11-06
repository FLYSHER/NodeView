/**
 * 애니메이션 키프레임 이벤트 (Armature 의 frame event, Spine 의 event)
 *  - list(owner, animName) : 데이터에 들어 있는 이벤트 목록 [{ name, frame, time }] (시간순)
 *  - watch(owner)          : 재생 중 발생하는 이벤트를 Console 에 남기고 'nv-anim-event' 로 알린다
 * UI(CocoStudio UI) 애니메이션 키프레임에는 이벤트 데이터가 없다.
 */
var AnimationEvents = (function () {
    var EVENT_NAME = 'nv-anim-event';

    function armatureEvents(armature, animName) {
        var animation = armature.getAnimation();
        var data = animation._animationData;
        var movement = data && data.movementDataDic ? data.movementDataDic[animName] : null;
        if (!movement) return [];
        // 같은 파일을 다시 불러오면 movement 데이터도 새로 만들어지므로 그 객체에 기억해 둔다
        if (movement.__nvEvents) return movement.__nvEvents;

        var frameRate = data.frameRate || 60;
        var speed = movement.scale || 1;
        var list = [];
        var dic = movement.movBoneDataDic || {};
        for (var boneName in dic) {
            var frames = dic[boneName] && dic[boneName].frameList || [];
            frames.forEach(function (fd) {
                var name = fd.strEvent || fd.event;
                if (!name) return;
                list.push({ name: String(name), frame: fd.frameID, time: (fd.frameID / speed) / frameRate, bone: boneName });
            });
        }
        list.sort(function (a, b) { return a.frame - b.frame || a.name.localeCompare(b.name); });
        movement.__nvEvents = list;
        return list;
    }

    function spineEvents(skeleton, animName) {
        var skeletonData = skeleton.getState ? skeleton.getState().data.skeletonData : null;
        var anim = skeletonData && skeletonData.findAnimation(animName);
        if (!anim) return [];
        if (anim.__nvEvents) return anim.__nvEvents;
        var list = [];
        (anim.timelines || []).forEach(function (tl) {
            if (!(typeof spine !== 'undefined' && spine.EventTimeline && tl instanceof spine.EventTimeline)) return;
            for (var i = 0; i < tl.frames.length; i++) {
                var ev = tl.events[i];
                if (!ev || !ev.data) continue;
                list.push({ name: ev.data.name, frame: null, time: tl.frames[i], data: ev });
            }
        });
        list.sort(function (a, b) { return a.time - b.time; });
        anim.__nvEvents = list;
        return list;
    }

    // owner: DraggableNode (또는 sp.SkeletonAnimation / ccs.Armature 자체)
    function list(owner, animName) {
        if (!owner || !animName) return [];
        try {
            var armature = owner.armature || (typeof ccs !== 'undefined' && owner instanceof ccs.Armature ? owner : null);
            if (armature) return armatureEvents(armature, animName);
            var skel = owner.spine || (typeof sp !== 'undefined' && owner instanceof sp.SkeletonAnimation ? owner : null);
            if (skel) return spineEvents(skel, animName);
        } catch (e) {
            console.warn('[AnimationEvents] 이벤트를 읽지 못했습니다:', e);
        }
        return [];
    }

    // 표시용: "15f · 0.25s" (Spine 은 프레임 개념이 없어 시간만)
    function formatAt(ev) {
        return (ev.frame != null ? ev.frame + 'f · ' : '') + ev.time.toFixed(2) + 's';
    }

    function emit(owner, animName, ev) {
        var detail = { owner: owner, animName: animName, name: ev.name, frame: ev.frame, time: ev.time };
        if (typeof ConsolePanel !== 'undefined') {
            ConsolePanel.log('[이벤트] ' + (owner.getName() || '') + ' · ' + animName + ' · ' + formatAt(ev) + ' · ' + ev.name);
        }
        try { document.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: detail })); } catch (e) { }
    }

    // 재생 중 이벤트 수신 (인스턴스마다 한 번)
    function watch(owner) {
        if (!owner || owner.__nvEventsWatched) return;
        owner.__nvEventsWatched = true;
        if (owner.armature) {
            var animation = owner.armature.getAnimation();
            animation.setFrameEventCallFunc(function (bone, name, originFrame, currentFrame) {
                var anim = animation.getCurrentMovementID();
                var known = armatureEvents(owner.armature, anim).filter(function (e) { return e.name === name && e.frame === originFrame; })[0];
                emit(owner, anim, known || { name: name, frame: originFrame, time: 0 });
            });
        }
        if (owner.spine && owner.spine.setEventListener) {
            owner.spine.setEventListener(function (trackEntry, event) {
                var anim = trackEntry && trackEntry.animation ? trackEntry.animation.name : '';
                emit(owner, anim, { name: event.data ? event.data.name : String(event), frame: null, time: event.time || 0 });
            });
        }
    }

    return {
        EVENT_NAME: EVENT_NAME,
        list: list,
        formatAt: formatAt,
        watch: watch
    };
})();
