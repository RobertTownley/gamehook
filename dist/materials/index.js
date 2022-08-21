var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as THREE from "three";
var cache = new Map();
var defaultMaterialOptions = {
    type: "normal",
    wireframe: false,
};
var loader = new THREE.TextureLoader();
function createMap(value) {
    if (!value)
        return null;
    if (typeof value === "string") {
        return loader.load(value);
    }
    else {
        return value;
    }
}
function createMapParams(options) {
    var _a, _b, _c, _d;
    return {
        alphaMap: createMap((_a = options.textures) === null || _a === void 0 ? void 0 : _a.alphaMap),
        bumpMap: createMap((_b = options.textures) === null || _b === void 0 ? void 0 : _b.bumpMap),
        normalMap: createMap((_c = options.textures) === null || _c === void 0 ? void 0 : _c.normalMap),
        map: createMap((_d = options.textures) === null || _d === void 0 ? void 0 : _d.colorMap),
    };
}
function createEmissiveParams(options) {
    var emissiveColor = options.emissiveColor, emissiveIntensity = options.emissiveIntensity;
    return __assign(__assign({}, (emissiveColor && { emissive: emissiveColor })), (emissiveIntensity && { emissiveIntensity: emissiveIntensity }));
}
export function createMaterial(options, useCache) {
    if (useCache === void 0) { useCache = true; }
    var opts = options !== null && options !== void 0 ? options : defaultMaterialOptions;
    var key = JSON.stringify(opts);
    if (cache.has(key) && useCache) {
        return cache.get(key);
    }
    var newMaterial = (function () {
        var _a, _b, _c;
        var emissiveParams = createEmissiveParams(opts);
        var maps = createMapParams(opts);
        switch (opts === null || opts === void 0 ? void 0 : opts.type) {
            case "basic":
                return new THREE.MeshBasicMaterial(__assign({ color: (_a = opts === null || opts === void 0 ? void 0 : opts.color) !== null && _a !== void 0 ? _a : 0xffffff }, maps));
            case "normal":
                return new THREE.MeshNormalMaterial({
                    wireframe: (_b = opts.wireframe) !== null && _b !== void 0 ? _b : false,
                });
            case "standard":
                return new THREE.MeshStandardMaterial(__assign(__assign(__assign({}, maps), emissiveParams), { color: (_c = opts === null || opts === void 0 ? void 0 : opts.color) !== null && _c !== void 0 ? _c : 0xffffff }));
        }
    })();
    cache.set(key, newMaterial);
    return newMaterial;
}
//# sourceMappingURL=index.js.map