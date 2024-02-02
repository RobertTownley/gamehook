import { useCallback, useContext, useEffect, useMemo } from "react";
import * as THREE from "three";

import { isPerspectiveCamera } from "../camera/guards";
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

  const resize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    if (isPerspectiveCamera(camera)) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }, [camera, renderer]);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize, false);
    return () => {
      window.removeEventListener("resize", resize, false);
    };
  }, [resize]);

  // Create the render function for use in animation and loops
  const render = useCallback(() => {
    renderer.render(scene, camera);
  }, [camera, renderer, scene]);
  return { render, renderer };
}

export function useRender() {
  return useContext(RenderContext);
}
