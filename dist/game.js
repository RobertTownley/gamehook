import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as THREE from "three";
import { useEffect, useLayoutEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { initialScene } from "./scene";
import { handleKeyboardEvent, handleMouseEvent } from "./interactions";
export var Game = function (_a) {
    var children = _a.children, width = _a.width, height = _a.height;
    var game = useGame({ width: width, height: height });
    var mountRef = useRef(null);
    useLayoutEffect(function () {
        var _a;
        var mounted = true;
        var existingRef = mountRef.current;
        var domElement = game.renderer.domElement;
        if (mounted) {
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.appendChild(domElement);
        }
        return function () {
            mounted = false;
            if (existingRef === null || existingRef === void 0 ? void 0 : existingRef.contains(domElement)) {
                existingRef === null || existingRef === void 0 ? void 0 : existingRef.removeChild(domElement);
            }
        };
    }, [game.renderer]);
    var sceneTitle = "foo"; // TODO:
    var scenes = (Array.isArray(children) ? children : [children]);
    var scene = scenes.length === 1
        ? scenes[0]
        : scenes.find(function (s) { return s.title === sceneTitle; });
    return (_jsxs(_Fragment, { children: [_jsx("div", { ref: mountRef }, void 0), scene] }, void 0));
};
export var useGame = function (props) {
    if (!window._GAME && props) {
        var width_1 = props.width, height_1 = props.height;
        // Initialize game
        window._GAME = {
            id: generateUUID(),
            resources: {
                geometries: {},
                materials: {},
            },
            scene: initialScene,
            renderer: new THREE.WebGLRenderer(),
            width: width_1 !== null && width_1 !== void 0 ? width_1 : window.innerWidth,
            height: height_1 !== null && height_1 !== void 0 ? height_1 : window.innerHeight,
            // Listeners
            onWindowResize: function () {
                var _w = width_1 !== null && width_1 !== void 0 ? width_1 : window.innerWidth;
                var _h = height_1 !== null && height_1 !== void 0 ? height_1 : window.innerHeight;
                _GAME.scene.camera.aspect = _w / _h;
                _GAME.scene.camera.updateProjectionMatrix();
                _GAME.renderer.setSize(_w, _h);
            },
        };
        // Resize
        window.addEventListener("resize", window._GAME.onWindowResize);
        // Mouse Events
        window.addEventListener("click", handleMouseEvent);
        // Keyboard Events
        window.addEventListener("keyup", handleKeyboardEvent);
        window.addEventListener("keydown", handleKeyboardEvent);
        window.addEventListener("keypress", handleKeyboardEvent);
    }
    var game = useRef(window._GAME);
    useEffect(function () {
        game.current.onWindowResize();
    }, []);
    return game.current;
};
//# sourceMappingURL=game.js.map