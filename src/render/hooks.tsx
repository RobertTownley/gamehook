import { useCallback, useContext, useMemo } from "react";
import * as THREE from "three";

import { useCamera } from "../camera/hooks";
import { useSceneDetails } from "../scene/hooks";
import { RenderContext } from "./context";
import { RendererProps } from "./types";

/** Generate the scene's renderer */
export function useCreateRenderer({
  antialias = true,
  enableShadowMaps = true,
  preserveDrawingBuffer = false,
}: RendererProps) {
  const { canvas, scene } = useSceneDetails();
  const { camera } = useCamera();

  const renderer = useMemo(() => {
    const renderer = new THREE.WebGLRenderer({
      antialias,
      canvas,
      preserveDrawingBuffer,
    });
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = enableShadowMaps;
    return renderer;
  }, [antialias, canvas, enableShadowMaps, preserveDrawingBuffer]);

  // Create the render function for use in animation and loops
  const render = useCallback(() => {
    renderer.render(scene, camera);
  }, [camera, renderer, scene]);
  return { render, renderer };
}

export function useRender() {
  return useContext(RenderContext);
}
