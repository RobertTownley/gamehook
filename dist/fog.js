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
import { useContext, useEffect, useMemo } from "react";
import { SceneContext } from "./scene/context";
function useFog(fog) {
    var scene = useContext(SceneContext);
    useEffect(function () {
        scene.threeScene.fog = fog;
        return function () {
            scene.threeScene.fog = null;
        };
    }, [scene, fog]);
}
function DirectedFog(_a) {
    var color = _a.color, near = _a.near, far = _a.far;
    var fog = useMemo(function () {
        return new THREE.Fog(color, near, far);
    }, [color, near, far]);
    useFog(fog);
    return _jsx(_Fragment, {});
}
function RealisticFog(_a) {
    var color = _a.color, density = _a.density;
    var fog = useMemo(function () {
        return new THREE.FogExp2(color, density);
    }, [color, density]);
    useFog(fog);
    return _jsx(_Fragment, {});
}
export function Fog(props) {
    return props.type === "directed" ? (_jsx(DirectedFog, __assign({}, props))) : (_jsx(RealisticFog, __assign({}, props)));
    /*
    const scene = useContext(SceneContext);
    const fog = useMemo(() => {
      return props.type === "directed"
        ? new THREE.Fog(props.color, props.near, props.far)
        : new THREE.FogExp2(props.color, props.density);
    }, [props.color, props.density, props.type, props.near, props.far]);
  
    useEffect(() => {
      scene.threeScene.fog = fog;
      return () => {
        scene.threeScene.fog = null;
      };
    }, [scene, fog]);
    return <></>;
  */
}
//# sourceMappingURL=fog.js.map