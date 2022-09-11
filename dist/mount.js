import { useContext, useEffect, useLayoutEffect } from "react";
import { moveCamera } from "./camera";
import { accelerateObjects, detectCollisions, moveObjects, rotateObjects, } from "./physics";
import { animateAndMoveModels } from "./models/keyframes";
import { detectHoverEntries } from "./interactions/loops";
import { moveLights } from "./physics/keyframes";
import { SceneContext } from "./scene/context";
import { HierarchyContext } from "./hierarchy";
import { convertCSSMeasureToPixels } from "./window";
export function useGameLoop(_a) {
    var camera = _a.camera, lights = _a.lights, models = _a.models, renderer = _a.renderer, scene = _a.scene, meshes = _a.meshes, collisionThreshold = _a.collisionThreshold, fps = _a.fps;
    useLayoutEffect(function () {
        var lastTimestamp = 0;
        renderer.setAnimationLoop(function (timestamp) {
            if (timestamp - lastTimestamp > 1000 / fps) {
                renderer.render(scene, camera.camera);
                // Mesh Physics
                accelerateObjects(meshes);
                moveObjects(meshes);
                rotateObjects(meshes);
                detectCollisions(meshes, collisionThreshold);
                // Camera
                moveCamera(meshes, models, camera);
                // Lights
                moveLights(lights, meshes);
                // Animation
                animateAndMoveModels(models);
                // Interaction
                detectHoverEntries({ meshes: meshes, camera: camera, renderer: renderer });
                lastTimestamp = timestamp;
            }
        });
    }, [
        camera,
        collisionThreshold,
        fps,
        lights,
        models,
        meshes,
        renderer,
        scene,
    ]);
}
function resize(_a) {
    var _b, _c;
    var camera = _a.camera, width = _a.width, height = _a.height, renderer = _a.renderer, sceneId = _a.sceneId;
    var w = (_b = convertCSSMeasureToPixels(width, "width", sceneId)) !== null && _b !== void 0 ? _b : window.innerWidth;
    var h = (_c = convertCSSMeasureToPixels(height, "height", sceneId)) !== null && _c !== void 0 ? _c : window.innerHeight;
    var ratio = w / h;
    camera.camera.aspect = ratio;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}
export function useResize(_a) {
    var camera = _a.camera, width = _a.width, height = _a.height, renderer = _a.renderer, sceneId = _a.sceneId;
    useLayoutEffect(function () {
        resize({ camera: camera, width: width, height: height, renderer: renderer, sceneId: sceneId });
        var listener = function () {
            return resize({
                camera: camera,
                width: width,
                height: height,
                renderer: renderer,
                sceneId: sceneId,
            });
        };
        window.addEventListener("resize", listener);
        return function () {
            window.removeEventListener("resize", listener);
        };
    }, [camera, width, height, renderer, sceneId]);
}
export function useAddToScene(mesh) {
    var hierarchy = useContext(HierarchyContext);
    var scene = useContext(SceneContext);
    useEffect(function () {
        if (!scene.meshes[mesh.id]) {
            scene.threeScene.add(mesh.threeMesh);
            scene.meshes[mesh.id] = mesh;
            if (hierarchy) {
                hierarchy.parent.add(mesh.threeMesh);
            }
        }
        return function () {
            delete scene.meshes[mesh.id];
            scene.threeScene.remove(mesh.threeMesh);
            mesh.threeMesh.removeFromParent();
        };
    }, [hierarchy, mesh, scene]);
}
export function useAddLightToScene(light) {
    var scene = useContext(SceneContext);
    useEffect(function () {
        if (!scene.lights[light.id]) {
            scene.threeScene.add(light.threeLight);
            scene.lights[light.id] = light;
        }
        return function () {
            delete scene.lights[light.id];
            scene.threeScene.remove(light.threeLight);
            light.threeLight.removeFromParent();
        };
    }, [light, scene.threeScene, scene.lights]);
}
function createFpsCap(loop, fps) {
    if (fps === void 0) { fps = 60; }
    var targetFps = 0, fpsInterval = 0;
    var lastTime = 0, lastOverTime = 0, prevOverTime = 0, deltaTime = 0;
    function updateFps(value) {
        targetFps = value;
        fpsInterval = 1000 / targetFps;
    }
    updateFps(fps);
    return {
        // the targeted frame rate
        get fps() {
            return targetFps;
        },
        set fps(value) {
            updateFps(value);
        },
        // the frame-capped loop function
        loop: function (time) {
            deltaTime = time - lastTime;
            if (deltaTime < fpsInterval) {
                return;
            }
            prevOverTime = lastOverTime;
            lastOverTime = deltaTime % fpsInterval;
            lastTime = time - lastOverTime;
            deltaTime -= prevOverTime;
            return loop(deltaTime);
        },
    };
}
//# sourceMappingURL=mount.js.map