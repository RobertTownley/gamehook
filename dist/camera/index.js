import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { useCameraPhysics } from "../physics/hooks";
import { normalizeXYZ } from "../physics/utils";
import { SceneContext } from "../scene/context";
export { moveCamera } from "./keyframes";
var DEFAULT_CAMERA_POSITION = [0, 0, 10];
export function buildGameCamera(_a) {
    var _b;
    var _c = _a.fov, fov = _c === void 0 ? 75 : _c, aspect = _a.aspect, near = _a.near, far = _a.far, trackTo = _a.trackTo;
    var a = aspect !== null && aspect !== void 0 ? aspect : window.innerWidth / window.innerHeight;
    var camera = new THREE.PerspectiveCamera(fov, a, near, far);
    (_b = camera.position).set.apply(_b, DEFAULT_CAMERA_POSITION);
    var listener = new THREE.AudioListener();
    camera.add(listener);
    return {
        id: generateUUID(),
        camera: camera,
        listener: listener,
        trackTo: trackTo,
    };
}
export function Camera(props) {
    var follow = props.follow, position = props.position, trackTo = props.trackTo;
    var scene = useContext(SceneContext);
    useEffect(function () {
        var _a;
        var p = normalizeXYZ(position !== null && position !== void 0 ? position : DEFAULT_CAMERA_POSITION);
        (_a = scene.camera.camera.position).set.apply(_a, p);
    }, [position, scene.camera.camera.position]);
    useCameraPhysics(scene.camera, props);
    // Automated camera moving
    useEffect(function () {
        scene.camera.trackTo = trackTo;
    }, [trackTo, scene.camera]);
    useEffect(function () {
        scene.camera.follow = follow;
    }, [follow, scene.camera]);
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=index.js.map