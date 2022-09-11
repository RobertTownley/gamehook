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
import { useEffect, useRef, useMemo, useState } from "react";
import { SceneContext } from "./context";
import { buildGameCamera } from "../camera";
import { useGameLoop, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";
import { DefaultTheme, ThemeContext } from "../theme";
import { convertCSSMeasureToPixels } from "../window";
export function Scene(props) {
    var _a, _b;
    var canvasRef = useRef(null);
    var sceneId = useMemo(function () { var _a; return (_a = props.id) !== null && _a !== void 0 ? _a : generateUUID(); }, [props.id]);
    var width = (_a = convertCSSMeasureToPixels(props.width, "width", sceneId)) !== null && _a !== void 0 ? _a : window.innerWidth;
    var height = (_b = convertCSSMeasureToPixels(props.height, "height", sceneId)) !== null && _b !== void 0 ? _b : window.innerHeight;
    var _c = useState(undefined), canvas = _c[0], setCanvas = _c[1];
    useEffect(function () {
        if (props.canvas) {
            setCanvas(props.canvas);
        }
        else if (canvasRef.current) {
            setCanvas(canvasRef.current);
        }
    }, [setCanvas, props.canvas]);
    return (_jsx("canvas", __assign({ ref: canvasRef, style: {
            width: width,
            height: height,
        }, id: sceneId }, { children: canvasRef.current && (_jsx(SceneContent, __assign({}, props, { canvas: canvas, width: props.width, height: props.height, id: sceneId }))) })));
}
function SceneContent(props) {
    var _a = props.antialias, antialias = _a === void 0 ? true : _a, _b = props.background, background = _b === void 0 ? 0x000000 : _b, _c = props.castShadow, castShadow = _c === void 0 ? false : _c, children = props.children, id = props.id, _d = props.fps, fps = _d === void 0 ? 60 : _d, theme = props.theme, canvas = props.canvas, _e = props.collisionThreshold, collisionThreshold = _e === void 0 ? 0.005 : _e, width = props.width, height = props.height;
    var camera = useMemo(function () { return buildGameCamera({}); }, []);
    var renderer = useMemo(function () {
        return new THREE.WebGLRenderer({
            antialias: antialias,
            canvas: canvas,
        });
    }, [antialias, canvas]);
    if (castShadow) {
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    var sceneId = id; // Wrapper component ensures it's set
    // Rendering
    useResize({
        width: width,
        height: height,
        camera: camera,
        renderer: renderer,
        sceneId: sceneId,
    });
    // State
    var value = useMemo(function () {
        var threeScene = new THREE.Scene();
        return {
            camera: camera,
            id: sceneId,
            lights: {},
            meshes: {},
            models: {},
            threeScene: threeScene,
        };
    }, [camera, sceneId]);
    // Update Background color
    useEffect(function () {
        value.threeScene.background = new THREE.Color(background);
    }, [background, value.threeScene]);
    // Render initial and new frames
    useGameLoop({
        camera: value.camera,
        collisionThreshold: collisionThreshold,
        fps: fps,
        lights: value.lights,
        models: value.models,
        renderer: renderer,
        scene: value.threeScene,
        meshes: value.meshes,
    });
    // Listen for user interactions
    useInteraction(value.meshes, renderer, camera.camera);
    return (_jsx(SceneContext.Provider, __assign({ value: value }, { children: _jsx(ThemeContext.Provider, __assign({ value: theme !== null && theme !== void 0 ? theme : DefaultTheme }, { children: children })) })));
}
//# sourceMappingURL=index.js.map