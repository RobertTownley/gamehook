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
import { moveLights } from "./physics/keyframes";
import { SceneContext } from "./scene/context";
import { HierarchyContext } from "./hierarchy";
import { GameLight } from "./lights";

export function useGameLoop({
  camera,
  lights,
  renderer,
  scene,
  meshes,
}: {
  camera: GameCamera;
  lights: Record<string, GameLight>;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  meshes: Record<string, Mesh>;
}) {
  useLayoutEffect(() => {
    const animate = () => {
      renderer.render(scene, camera.camera);
      requestAnimationFrame(animate);

      // Animate callbacks created within `useAnimation`
      /*
      Object.values(game.scene.animations)
        .filter((animation) => !animation.current.revoked)
        .forEach((animation) => {
          const result = animation.current.callback();
          if (result) {
            delete game.scene.animations[animation.current.id];
          }
        });
      */

      // Mesh Physics
      accelerateObjects(meshes);
      moveObjects(meshes);
      rotateObjects(meshes);
      detectCollisions(meshes);

      // Camera
      moveCamera(meshes, camera);

      // Lights
      moveLights(lights);
    };
    animate();
  }, [camera, lights, meshes, renderer, scene]);
}

export function useMountRef(renderer: THREE.WebGLRenderer) {
  const mountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mounted = true;
    const existingRef = mountRef.current;
    const { domElement } = renderer;

    if (mounted) {
      mountRef.current?.appendChild(domElement);
    }
    return () => {
      mounted = false;
      if (existingRef?.contains(domElement)) {
        existingRef?.removeChild(domElement);
      }
    };
  }, [renderer]);
  return mountRef;
}

interface UseResize {
  camera: GameCamera;
  width?: number;
  height?: number;
  renderer: THREE.WebGLRenderer;
}
function resize({ camera, width, height, renderer }: UseResize) {
  const w = width ?? window.innerWidth;
  const h = height ?? window.innerHeight;
  const ratio = w / h;
  camera.camera.aspect = ratio;
  camera.camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}
export function useResize({ camera, width, height, renderer }: UseResize) {
  useLayoutEffect(() => {
    resize({ camera, width, height, renderer });
  }, [camera, width, height, renderer]);
  window.addEventListener("resize", () => {
    resize({
      camera,
      width,
      height,
      renderer,
    });
  });
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
