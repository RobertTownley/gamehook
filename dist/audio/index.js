import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { useContext, useLayoutEffect, useMemo } from "react";
import { SceneContext } from "../scene/context";
var audioLoader = new THREE.AudioLoader();
export function Audio(_a) {
    var _b = _a.detune, detune = _b === void 0 ? 0 : _b, duration = _a.duration, filepath = _a.filepath, _c = _a.loop, loop = _c === void 0 ? false : _c, onEnded = _a.onEnded, _d = _a.playbackRate, playbackRate = _d === void 0 ? 1 : _d, _e = _a.volume, volume = _e === void 0 ? 1 : _e;
    var scene = useContext(SceneContext);
    var sound = useMemo(function () {
        return new THREE.Audio(scene.camera.listener);
    }, [scene.camera.listener]);
    useLayoutEffect(function () {
        audioLoader.load(filepath, function (buffer) {
            sound.setBuffer(buffer);
            sound.play();
        });
    }, [filepath, sound, loop, volume]);
    useLayoutEffect(function () {
        sound.detune = detune;
    }, [sound, detune]);
    useLayoutEffect(function () {
        sound.setVolume(volume);
    }, [sound, volume]);
    useLayoutEffect(function () {
        sound.setLoop(loop);
    }, [sound, loop]);
    useLayoutEffect(function () {
        sound.duration = duration !== null && duration !== void 0 ? duration : undefined;
    }, [sound, duration]);
    useLayoutEffect(function () {
        sound.playbackRate = playbackRate;
    }, [sound, playbackRate]);
    useLayoutEffect(function () {
        sound.onEnded = onEnded !== null && onEnded !== void 0 ? onEnded : (function () { return ({}); });
    }, [sound, onEnded]);
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=index.js.map