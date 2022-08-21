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
import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { useModelPhysics } from "../physics/hooks";
import { SceneContext } from "../scene/context";
import { ModelHierarchyContext } from "../hierarchy";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
var loader = new GLTFLoader();
export function Model(props) {
    var scene = useContext(SceneContext);
    var children = props.children, filepath = props.filepath, _a = props.id, id = _a === void 0 ? generateUUID() : _a;
    var _b = useState(false), loaded = _b[0], setLoaded = _b[1];
    var _c = useState(undefined), gltf = _c[0], setGLTF = _c[1];
    var mixer = useMemo(function () {
        if (!(gltf === null || gltf === void 0 ? void 0 : gltf.scene))
            return;
        return new THREE.AnimationMixer(gltf.scene);
    }, [gltf === null || gltf === void 0 ? void 0 : gltf.scene]);
    var loadedGameModel = useMemo(function () {
        if (!gltf || !mixer)
            return;
        return {
            id: id,
            gltf: gltf,
            mixer: mixer,
            clock: new THREE.Clock(),
        };
    }, [gltf, id, mixer]);
    // Load model
    useLayoutEffect(function () {
        try {
            loader.load(filepath, function (gltf) {
                setGLTF(gltf);
                setLoaded(true);
            });
        }
        catch (err) {
        }
        finally {
            setLoaded(true);
        }
    }, [filepath]);
    // Add model to scene
    useLayoutEffect(function () {
        if (loadedGameModel) {
            scene.threeScene.add(loadedGameModel.gltf.scene);
            scene.models[id] = loadedGameModel;
        }
        return function () {
            if (loadedGameModel) {
                scene.threeScene.remove(loadedGameModel === null || loadedGameModel === void 0 ? void 0 : loadedGameModel.gltf.scene);
                delete scene.models[id];
            }
        };
    }, [scene.models, scene.threeScene, loadedGameModel, id]);
    useModelPhysics(loadedGameModel, props);
    if (!loaded)
        return _jsx(_Fragment, {});
    return (_jsx(ModelHierarchyContext.Provider, __assign({ value: loadedGameModel }, { children: children })));
}
//# sourceMappingURL=index.js.map