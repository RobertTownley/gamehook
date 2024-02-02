import * as THREE from "three";
import { useCallback, useEffect, useMemo } from "react";

import { updateControls } from "../controls/listeners";
import { updateMixers } from "./listeners";
import { useSceneDetails } from "../scene/hooks";
import { animateSceneObjects } from "../physics/scenePhysics";

import { useRender } from "../render/hooks";

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
    updateMixers(scene, delta);
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
