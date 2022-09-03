import * as THREE from "three";
import { useContext, useEffect, useLayoutEffect, useRef } from "react";

import { GameCamera, moveCamera } from "./camera";
import { Mesh } from "./mesh";
import {
  accelerateObjects,
  detectCollisions,
  moveObjects,
  rotateObjects,
} from "./physics";
import { animateAndMoveModels } from "./models/keyframes";
import { detectHoverEntries } from "./interactions/loops";
import { moveLights } from "./physics/keyframes";
import { SceneContext } from "./scene/context";
import { HierarchyContext } from "./hierarchy";
import { GameLight } from "./lights";
import { LoadedGameModel } from "./models";

export function useGameLoop({
  camera,
  lights,
  models,
  renderer,
  scene,
  meshes,
}: {
  camera: GameCamera;
  lights: Record<string, GameLight>;
  models: Record<string, LoadedGameModel>;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  meshes: Record<string, Mesh>;
}) {
  useLayoutEffect(() => {
    renderer.setAnimationLoop(() => {
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
      detectHoverEntries({ meshes, camera, renderer });
    });
  }, [camera, lights, models, meshes, renderer, scene]);
}

interface UseResize {
  camera: GameCamera;
  height?: number;
  width?: number;
  renderer: THREE.WebGLRenderer;
  canvas?: HTMLCanvasElement;
}
function resize({ camera, width, height, canvas, renderer }: UseResize) {
  const w = width ?? canvas?.clientWidth ?? window.innerWidth;
  const h = height ?? canvas?.clientHeight ?? window.innerHeight;
  const ratio = w / h;
  camera.camera.aspect = ratio;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
export function useResize({
  canvas,
  camera,
  width,
  height,
  renderer,
}: UseResize) {
  useLayoutEffect(() => {
    resize({ canvas, camera, width, height, renderer });
    const listener = () =>
      resize({
        canvas,
        camera,
        width,
        height,
        renderer,
      });
    window.addEventListener("resize", listener);
    return () => {
      window.removeEventListener("resize", listener);
    };
  }, [camera, canvas, width, height, renderer]);
}

export function useAddToScene(mesh: Mesh) {
  const hierarchy = useContext(HierarchyContext);
  const scene = useContext(SceneContext);
  useEffect(() => {
    if (!scene.meshes[mesh.id]) {
      scene.threeScene.add(mesh.threeMesh);
      scene.meshes[mesh.id] = mesh;
      if (hierarchy) {
        hierarchy.parent.add(mesh.threeMesh);
      }
    }
    return () => {
      delete scene.meshes[mesh.id];
      scene.threeScene.remove(mesh.threeMesh);
      mesh.threeMesh.removeFromParent();
    };
  }, [hierarchy, mesh, scene]);
}

export function useAddLightToScene(light: GameLight) {
  const scene = useContext(SceneContext);
  useEffect(() => {
    if (!scene.lights[light.id]) {
      scene.threeScene.add(light.threeLight);
      scene.lights[light.id] = light;
    }
    return () => {
      delete scene.lights[light.id];
      scene.threeScene.remove(light.threeLight);
      light.threeLight.removeFromParent();
    };
  }, [light, scene.threeScene, scene.lights]);
}
