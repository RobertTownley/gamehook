import * as THREE from "three";
import { useCallback, useEffect, useMemo } from "react";

import { updateMixers } from "./listeners";
import { useSceneDetails } from "../scene/hooks";
import { animateSceneObjects } from "../physics/scenePhysics";

import { useRender } from "../render/hooks";
import { updateControls } from "../controls/listeners";

export function useAnimate() {
  const { scene } = useSceneDetails();
  const { render } = useRender();

  const clock = useMemo(() => {
    return new THREE.Clock();
  }, []);

  const animate = useCallback(() => {
    const delta = clock.getDelta();
    animateSceneObjects(scene);
    updateMixers(scene, delta);
    updateControls(scene);
    render();

    const frame = requestAnimationFrame(animate);
    return frame;
  }, [render, scene, clock]);

  useEffect(() => {
    const frame = animate();
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [animate]);
}
