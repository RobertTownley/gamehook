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
function createEmissiveParams(options) {
    var emissiveColor = options.emissiveColor, emissiveIntensity = options.emissiveIntensity;
    return __assign(__assign({}, (emissiveColor && { emissive: emissiveColor })), (emissiveIntensity && { emissiveIntensity: emissiveIntensity }));
}
function createBaseMaterialParams(options) {
    var _a, _b;
    return {
        opacity: (_a = options === null || options === void 0 ? void 0 : options.opacity) !== null && _a !== void 0 ? _a : 1,
        transparent: (_b = options === null || options === void 0 ? void 0 : options.transparent) !== null && _b !== void 0 ? _b : false,
    };
}
export function createStandardMaterial(options) {
    var _a, _b, _c, _d, _e;
    return new THREE.MeshStandardMaterial(__assign(__assign({ alphaMap: createMap((_a = options === null || options === void 0 ? void 0 : options.textures) === null || _a === void 0 ? void 0 : _a.alphaMap), bumpMap: createMap((_b = options.textures) === null || _b === void 0 ? void 0 : _b.bumpMap), normalMap: createMap((_c = options.textures) === null || _c === void 0 ? void 0 : _c.normalMap), map: createMap((_d = options.textures) === null || _d === void 0 ? void 0 : _d.colorMap), color: (_e = options === null || options === void 0 ? void 0 : options.color) !== null && _e !== void 0 ? _e : 0xffffff }, createEmissiveParams(options)), createBaseMaterialParams(options)));
}
function createBasicMaterial(options) {
    var _a, _b, _c;
    return new THREE.MeshBasicMaterial(__assign(__assign({ alphaMap: createMap((_a = options === null || options === void 0 ? void 0 : options.textures) === null || _a === void 0 ? void 0 : _a.alphaMap), map: createMap((_b = options.textures) === null || _b === void 0 ? void 0 : _b.colorMap) }, createBaseMaterialParams(options)), { color: (_c = options === null || options === void 0 ? void 0 : options.color) !== null && _c !== void 0 ? _c : 0xffffff }));
}
function createNormalMaterial(options) {
    var _a;
    return new THREE.MeshNormalMaterial(__assign({ wireframe: (_a = options.wireframe) !== null && _a !== void 0 ? _a : false }, createBaseMaterialParams(options)));
}
export function createMaterial(options, useCache) {
    if (useCache === void 0) { useCache = true; }
    var key = JSON.stringify(options);
    if (cache.has(key) && useCache) {
        return cache.get(key);
    }
    var newMaterial = (function () {
        if (!(options === null || options === void 0 ? void 0 : options.type)) {
            return createNormalMaterial(defaultMaterialOptions);
        }
        if (options.type.includes("Mesh")) {
            return options;
        }
        switch (options === null || options === void 0 ? void 0 : options.type) {
            case "basic":
                return createBasicMaterial(options);
            case "normal":
                return createNormalMaterial(options);
            case "standard":
                return createStandardMaterial(options);
            default:
                return createNormalMaterial(defaultMaterialOptions);
        }
    })();
    cache.set(key, newMaterial);
    return newMaterial;
}
//# sourceMappingURL=index.js.map