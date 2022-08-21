var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as THREE from "three";
import { normalizeXYZ } from "../physics";
import { isXYZArray } from "../physics/guards";
export function moveCamera(meshes, models, camera) {
    var _a;
    if (camera.trackTo) {
        var objectToTrack = (function () {
            if (!camera.trackTo)
                return;
            if (meshes[camera.trackTo]) {
                return meshes[camera.trackTo].threeMesh;
            }
            else if (models[camera.trackTo]) {
                return models[camera.trackTo].gltf.scene;
            }
            else {
                return;
            }
        })();
        if (!objectToTrack)
            return;
        camera.camera.lookAt(objectToTrack.position);
    }
    if (camera.follow) {
        var objectToFollow = meshes[camera.follow];
        if (!objectToFollow || !objectToFollow.velocity)
            return;
        var xyz = normalizeXYZ(objectToFollow.velocity);
        var vector = new ((_a = THREE.Vector3).bind.apply(_a, __spreadArray([void 0], xyz, false)))();
        camera.camera.position.add(vector);
    }
    // Camera Physics
    if (camera.rotation) {
        var r = normalizeXYZ(camera.rotation);
        camera.camera.rotation.x += r[0];
        camera.camera.rotation.y += r[1];
        camera.camera.rotation.z += r[2];
    }
    if (camera.acceleration) {
        var a = normalizeXYZ(camera.acceleration);
        if (!camera.velocity) {
            camera.velocity = [0, 0, 0];
        }
        if (isXYZArray(camera.velocity)) {
            camera.velocity[0] += a[0];
            camera.velocity[1] += a[1];
            camera.velocity[2] += a[2];
        }
        else {
            camera.velocity.x += a[0];
            camera.velocity.y += a[1];
            camera.velocity.z += a[2];
        }
    }
    if (camera.velocity) {
        var v = normalizeXYZ(camera.velocity);
        camera.camera.position.x += v[0];
        camera.camera.position.y += v[1];
        camera.camera.position.z += v[2];
    }
}
//# sourceMappingURL=keyframes.js.map