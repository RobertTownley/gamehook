import { useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";
// Run the following callback within a requestAnimationFrame loop
// managed by the scene object
export var useAnimation = function (callback) {
    var animation = useRef({
        id: generateUUID(),
        callback: callback,
        revoked: false,
    });
    animation.current.callback = callback;
    _GAME.scene.animations[animation.current.id] = animation;
};
//# sourceMappingURL=animations.js.map