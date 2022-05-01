import * as THREE from "three";
import { useLayoutEffect, useRef } from "react";

import { Camera } from "./camera";

export function useGameLoop(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene
) {
  useLayoutEffect(() => {
    const animate = () => {
      renderer.render(scene, camera);
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

      // Handle object physics
      // detectCollisions();
      // rotateObjects();
      // moveObjects();
      // accelerateObjects();
    };
    animate();
  }, [camera, renderer, scene]);
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
  camera: Camera;
  width?: number;
  height?: number;
  renderer: THREE.WebGLRenderer;
}
export function useResize({ camera, width, height, renderer }: UseResize) {
  useLayoutEffect(() => {
    const w = width ?? window.innerWidth;
    const h = height ?? window.innerHeight;
    const ratio = w / h;
    camera.camera.aspect = ratio;
    camera.camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, [camera, width, height, renderer]);
}
