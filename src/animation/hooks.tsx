import * as THREE from "three";
import { useCallback, useEffect, useMemo } from "react";

import { updateControls } from "../controls/listeners";
import { useSceneDetails } from "../scene/hooks";
import { animateSceneObjects } from "../physics/scenePhysics";

import { isPerspectiveCamera } from "../camera/guards";
import { useCamera } from "../camera/hooks";
import { useRender } from "../render/hooks";

export function useResize() {
  const { camera } = useCamera();
  const { canvas } = useSceneDetails();
  const { renderer } = useRender();

  const resizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (canvas!.width !== width || canvas!.height !== height) {
      renderer.setSize(width, height);
      if (isPerspectiveCamera(camera)) {
        camera.aspect = width / height;
      }
      camera.updateProjectionMatrix();
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
  const { scene } = useSceneDetails();
  const { render } = useRender();

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
