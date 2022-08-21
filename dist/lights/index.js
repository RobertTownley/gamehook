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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { useContext, useEffect, useLayoutEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { useLightPhysics } from "../physics/hooks";
import { normalizeXYZ } from "../physics/utils";
import { useAddLightToScene } from "../mount";
import { isSpotLight } from "./guards";
import { SceneContext } from "../scene/context";
function useLight(props) {
    var _a, _b;
    var id = (_a = props.id) !== null && _a !== void 0 ? _a : generateUUID();
    var castsShadow = (_b = props.castsShadow) !== null && _b !== void 0 ? _b : false;
    switch (props.type) {
        case "ambient":
            return __assign({ id: id, threeLight: new THREE.AmbientLight(props.color), castsShadow: castsShadow }, props);
        case "directional":
            return __assign({ id: id, threeLight: new THREE.DirectionalLight(props.color, props.intensity), castsShadow: castsShadow }, props);
        case "hemisphere":
            return __assign({ id: id, threeLight: new THREE.HemisphereLight(props.skyColor, props.groundColor, props.intensity), castsShadow: castsShadow }, props);
        case "point":
            return __assign({ id: id, threeLight: new THREE.PointLight(props.color, props.intensity, props.distance, props.decay), castsShadow: castsShadow }, props);
        case "rectarea":
            return __assign({ id: id, threeLight: new THREE.RectAreaLight(props.color, props.intensity, props.width, props.height), castsShadow: castsShadow }, props);
        case "spot":
            return __assign({ id: id, threeLight: new THREE.SpotLight(props.color, props.intensity, props.distance, props.angle, props.penumbra, props.decay), castsShadow: castsShadow }, props);
    }
}
export function Light(props) {
    var _a = props.castsShadow, castsShadow = _a === void 0 ? false : _a, position = props.position;
    var light = useLight(props);
    var scene = useContext(SceneContext);
    // Track SpotLight to target
    var matchingTarget = undefined;
    if (isSpotLight(light) && light.target) {
        var matchingLight = scene.lights[light.target];
        var matchingMesh = scene.meshes[light.target];
        if (matchingMesh) {
            matchingTarget = matchingMesh.threeMesh;
        }
        else if (matchingLight) {
            matchingTarget = matchingLight.threeLight;
        }
    }
    useEffect(function () {
        if (isSpotLight(light) && matchingTarget) {
            light.threeLight.target = matchingTarget;
        }
    }, [light, matchingTarget]);
    useEffect(function () {
        light.castsShadow = castsShadow;
        light.threeLight.castShadow = castsShadow;
    }, [light, castsShadow]);
    useLightPhysics(light, props);
    var _b = useMemo(function () { return normalizeXYZ(position); }, [position]), x = _b[0], y = _b[1], z = _b[2];
    useLayoutEffect(function () {
        light.threeLight.position.set(x, y, z);
    }, [light, x, y, z]);
    useAddLightToScene(light);
    return _jsx(_Fragment, {});
}
//# sourceMappingURL=index.js.map