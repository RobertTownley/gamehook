import * as THREE from "three";
import { isBufferGeometry } from "./guards";
var defaultGeometryOptions = {
    type: "box",
};
export var createGeometry = function (opts) {
    var opt = opts !== null && opts !== void 0 ? opts : defaultGeometryOptions;
    if (isBufferGeometry(opt))
        return opt;
    var token = JSON.stringify(opt);
    var geometries = _GAME.resources.geometries;
    if (geometries[token]) {
        return geometries[token];
    }
    var newGeometry = (function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
        switch (opt.type) {
            case "box":
                return new THREE.BoxGeometry((_a = opt.width) !== null && _a !== void 0 ? _a : 1, (_b = opt.height) !== null && _b !== void 0 ? _b : 1, (_c = opt.depth) !== null && _c !== void 0 ? _c : 1);
            case "circle":
                return new THREE.CircleGeometry((_d = opt.radius) !== null && _d !== void 0 ? _d : 1, (_e = opt.segments) !== null && _e !== void 0 ? _e : 32);
            case "cylinder":
                return new THREE.CylinderGeometry((_f = opt.radiusTop) !== null && _f !== void 0 ? _f : 1, (_g = opt.radiusBottom) !== null && _g !== void 0 ? _g : 1, (_h = opt.height) !== null && _h !== void 0 ? _h : 1, (_j = opt.radialSegments) !== null && _j !== void 0 ? _j : 8, (_k = opt.heightSegments) !== null && _k !== void 0 ? _k : 1, (_l = opt.openEnded) !== null && _l !== void 0 ? _l : false, (_m = opt.thetaStart) !== null && _m !== void 0 ? _m : 0, (_o = opt.thetaLength) !== null && _o !== void 0 ? _o : 2 * Math.PI);
            case "plane":
                return new THREE.PlaneGeometry((_p = opt.width) !== null && _p !== void 0 ? _p : 1, (_q = opt.height) !== null && _q !== void 0 ? _q : 1);
            case "sphere":
                return new THREE.SphereGeometry((_r = opt.radius) !== null && _r !== void 0 ? _r : 1, (_s = opt.widthSegments) !== null && _s !== void 0 ? _s : 32, (_t = opt.heightSegments) !== null && _t !== void 0 ? _t : 16);
        }
    })();
    geometries[token] = newGeometry;
    return newGeometry;
};
//# sourceMappingURL=geometries.js.map