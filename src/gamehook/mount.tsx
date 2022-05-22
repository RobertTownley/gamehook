import * as THREE from "three";
import { useLayoutEffect, useRef } from "react";

import { GameCamera, moveCamera } from "./camera";
import { Mesh } from "./mesh";
import { accelerateObjects, moveObjects, rotateObjects } from "./physics";

export function useGameLoop({
  camera,
  renderer,
  scene,
  meshes,
}: {
  camera: GameCamera;
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

      // Handle physics
      // detectCollisions();
      // Meshes
      accelerateObjects(meshes);
      moveObjects(meshes);
      rotateObjects(meshes);
      // Camera
      moveCamera(meshes, camera);
    };
    animate();
  }, [camera, meshes, renderer, scene]);
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
