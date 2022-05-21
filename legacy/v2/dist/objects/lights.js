import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useMemo } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";
import { useLocation, useLightMount, useLightParent } from "./hooks";
var useLight = function (props, variant) {
    var acceleration = props.acceleration, rotation = props.rotation, velocity = props.velocity;
    var light = useMemo(function () {
        var three = (function () {
            switch (variant) {
                case "ambient":
                    return new THREE.AmbientLight();
            }
        })();
        var light = {
            type: "light",
            id: generateUUID(),
            three: three,
            rotation: rotation,
            acceleration: acceleration,
            velocity: velocity,
        };
        return light;
    }, [acceleration, rotation, variant, velocity]);
    useLocation(light, props);
    useLightMount(light);
    useLightParent(light, props);
    return light;
};
export var Light = function (props) {
    useLight(props, props.variant);
    return _jsx(_Fragment, {}, void 0);
};
//# sourceMappingURL=lights.js.map