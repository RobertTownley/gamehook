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
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGame } from "../game";
import { useMesh } from "./hooks";
import { buildChildren } from "./children";
var defaultLoadingError = function (_event, filepath) {
    throw new Error("Model " + filepath + " could not be loaded");
};
export var Model = function (props) {
    var children = props.children, filepath = props.filepath, onError = props.onError;
    var game = useGame();
    var gameObject = useMesh(__assign(__assign({}, props), { geometry: new THREE.BufferGeometry() }));
    useEffect(function () {
        var mounted = true;
        var addGLTFToScene = function (gltf) {
            if (mounted) {
                gameObject.three.add(gltf.scene);
            }
        };
        var handleLoadingError = onError !== null && onError !== void 0 ? onError : defaultLoadingError;
        var loader = new GLTFLoader();
        loader.load(filepath, addGLTFToScene, undefined, function (e) {
            return handleLoadingError(e, filepath);
        });
        return function () {
            mounted = false;
        };
    }, [gameObject.three, game.scene, filepath, game.scene, onError]);
    return _jsx(_Fragment, { children: buildChildren(gameObject, children) }, void 0);
};
//# sourceMappingURL=models.js.map