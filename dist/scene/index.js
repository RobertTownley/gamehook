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
import { jsx as _jsx } from "react/jsx-runtime";
import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { SceneContext } from "./context";
import { buildGameCamera } from "../camera";
import { useGameLoop, useMountRef, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";
export function Scene(_a) {
    var _b = _a.background, background = _b === void 0 ? 0x000000 : _b, _c = _a.castShadow, castShadow = _c === void 0 ? false : _c, children = _a.children, id = _a.id, width = _a.width, height = _a.height;
    var camera = useMemo(function () { return buildGameCamera({}); }, []);
    var renderer = useMemo(function () { return new THREE.WebGLRenderer(); }, []);
    if (castShadow) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    // Rendering
    var mountRef = useMountRef(renderer);
    useResize({ width: width, height: height, camera: camera, renderer: renderer });
    // State
    var value = useMemo(function () {
        var threeScene = new THREE.Scene();
        return {
            camera: camera,
            id: id !== null && id !== void 0 ? id : generateUUID(),
            lights: {},
            meshes: {},
            models: {},
            threeScene: threeScene,
        };
    }, [camera, id]);
    // Update Background color
    useEffect(function () {
        value.threeScene.background = new THREE.Color(background);
    }, [background, value.threeScene]);
    // Render initial and new frames
    useGameLoop({
        camera: value.camera,
        lights: value.lights,
        models: value.models,
        renderer: renderer,
        scene: value.threeScene,
        meshes: value.meshes,
    });
    // Listen for user interactions
    useInteraction(value.meshes, renderer, camera.camera);
    return (_jsx("div", __assign({ ref: mountRef }, { children: _jsx(SceneContext.Provider, __assign({ value: value }, { children: children })) })));
}
//# sourceMappingURL=index.js.map