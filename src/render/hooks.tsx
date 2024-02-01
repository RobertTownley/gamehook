import { useCallback, useContext, useMemo } from "react";
import * as THREE from "three";

import { useCamera } from "../camera/hooks";
import { useSceneDetails } from "../scene/hooks";
import { RenderContext } from "./context";

/** Generate the scene's renderer */
export function useCreateRenderer() {
  const { canvas, scene } = useSceneDetails();
  const { camera } = useCamera();

  const renderer = useMemo(() => {
    return new THREE.WebGLRenderer({
      antialias: true, // TODO
      canvas,
      preserveDrawingBuffer: false, // TODO
    });
  }, [canvas]);

  // Create the render function for use in animation and loops
  const render = useCallback(() => {
    renderer.render(scene, camera);
  }, [camera, renderer, scene]);
  return { render, renderer };
}

export function useRender() {
  return useContext(RenderContext);
}
