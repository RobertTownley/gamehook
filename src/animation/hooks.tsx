import * as THREE from "three";
import { useCallback, useEffect, useMemo } from "react";

import { updateControls } from "../controls/listeners";
import { useSceneDetails } from "../scene/hooks";
import { animateSceneObjects } from "../physics/scenePhysics";

import { isPerspectiveCamera } from "../camera/guards";

export function useResize() {
  const { canvas, renderer, camera } = useSceneDetails();

  const resizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (canvas!.width !== width || canvas!.height !== height) {
      renderer.setSize(width, height);
      if (isPerspectiveCamera(camera.current)) {
        camera.current.aspect = width / height;
      }
      camera.current.updateProjectionMatrix();
    }
  }, [camera, canvas, renderer]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      resizeCanvas();
      window.removeEventListener("listener", resizeCanvas);
    };
  }, [resizeCanvas]);
}

export function useAnimate() {
  const { render, scene } = useSceneDetails();

  const clock = useMemo(() => {
    return new THREE.Clock();
  }, []);

  const animate = useCallback(() => {
    const frame = requestAnimationFrame(animate);

    const delta = clock.getDelta();

    animateSceneObjects(scene);
    updateControls(scene, delta);
    render();
    return frame;
  }, [render, scene, clock]);

  useEffect(() => {
    const frame = animate();
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [animate]);
}
