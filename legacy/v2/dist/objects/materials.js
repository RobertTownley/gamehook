import * as THREE from "three";
var defaultMaterialOptions = {
    type: "normal",
};
export var createMaterial = function (opts) {
    var opt = opts !== null && opts !== void 0 ? opts : defaultMaterialOptions;
    var token = JSON.stringify(opt);
    var materials = _GAME.resources.materials;
    if (materials[token]) {
        return materials[token];
    }
    var newMaterial = (function () {
        switch (opt === null || opt === void 0 ? void 0 : opt.type) {
            case "basic":
                return new THREE.MeshBasicMaterial({ color: opt.color });
            case "normal":
                return new THREE.MeshNormalMaterial({ wireframe: opt.wireframe });
            case "standard":
                return new THREE.MeshStandardMaterial({ color: opt.color });
        }
    })();
    materials[token] = newMaterial;
    return newMaterial;
};
//# sourceMappingURL=materials.js.map