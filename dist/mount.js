import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { moveCamera } from "./camera";
import { accelerateObjects, detectCollisions, moveObjects, rotateObjects, } from "./physics";
import { animateAndMoveModels } from "./models/keyframes";
import { detectHoverEntries } from "./interactions/loops";
import { moveLights } from "./physics/keyframes";
import { SceneContext } from "./scene/context";
import { HierarchyContext } from "./hierarchy";
export function useGameLoop(_a) {
    var camera = _a.camera, lights = _a.lights, models = _a.models, renderer = _a.renderer, scene = _a.scene, meshes = _a.meshes;
    useLayoutEffect(function () {
        renderer.setAnimationLoop(function () {
            renderer.render(scene, camera.camera);
            // Mesh Physics
            accelerateObjects(meshes);
            moveObjects(meshes);
            rotateObjects(meshes);
            detectCollisions(meshes);
            // Camera
            moveCamera(meshes, models, camera);
            // Lights
            moveLights(lights, meshes);
            // Animation
            animateAndMoveModels(models);
            // Interaction
            detectHoverEntries({ meshes: meshes, camera: camera, renderer: renderer });
        });
    }, [camera, lights, models, meshes, renderer, scene]);
}
export function useMountRef(renderer) {
    var mountRef = useRef(null);
    useLayoutEffect(function () {
        var _a;
        var mounted = true;
        var existingRef = mountRef.current;
        var domElement = renderer.domElement;
        if (mounted) {
            (_a = mountRef.current) === null || _a === void 0 ? void 0 : _a.appendChild(domElement);
        }
        return function () {
            mounted = false;
            if (existingRef === null || existingRef === void 0 ? void 0 : existingRef.contains(domElement)) {
                existingRef === null || existingRef === void 0 ? void 0 : existingRef.removeChild(domElement);
            }
        };
    }, [renderer]);
    return mountRef;
}
function resize(_a) {
    var camera = _a.camera, width = _a.width, height = _a.height, renderer = _a.renderer;
    var w = width !== null && width !== void 0 ? width : window.innerWidth;
    var h = height !== null && height !== void 0 ? height : window.innerHeight;
    var ratio = w / h;
    camera.camera.aspect = ratio;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}
export function useResize(_a) {
    var camera = _a.camera, width = _a.width, height = _a.height, renderer = _a.renderer;
    useLayoutEffect(function () {
        resize({ camera: camera, width: width, height: height, renderer: renderer });
    }, [camera, width, height, renderer]);
    window.addEventListener("resize", function () {
        resize({
            camera: camera,
            width: width,
            height: height,
            renderer: renderer,
        });
    });
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
//# sourceMappingURL=mount.js.map