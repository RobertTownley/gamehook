import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as THREE from "three";

import { SceneDetailsContext } from "./context";
import { SceneProps } from "./types";

/** Create an ID for the HTML canvas tag if the user hasn't provided one */
export function useSceneId(props: SceneProps) {
  return useMemo(() => {
    return props.id ?? crypto.randomUUID();
  }, [props.id]);
}

/** Delay loading child components to give the HTML canvas tag a change to appear */
export function useSceneReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
    return () => {
      setReady(false);
    };
  }, []);
  return ready;
}

/** Get or generate the background color for the ThreeJS scene */
export function useBackgroundColor(props: SceneProps, scene: THREE.Scene) {
  const backgroundColor = useMemo(() => {
    if (!props.backgroundColor) {
      return null;
    }
    if (typeof props.backgroundColor === "string") {
      return new THREE.Color(props.backgroundColor);
    }
    return props.backgroundColor;
  }, [props.backgroundColor]);

  useEffect(() => {
    scene.background = backgroundColor;
  }, [scene, backgroundColor]);
}

/** Generate the scene's renderer */
export function useRender(
  { antialias, canvas, preserveDrawingBuffer }: SceneProps,
  scene: THREE.Scene,
  camera: THREE.Camera
) {
  // Build the renderer
  const renderer = useMemo(() => {
    return new THREE.WebGLRenderer({
      antialias,
      canvas,
      preserveDrawingBuffer,
    });
  }, [antialias, canvas, preserveDrawingBuffer]);

  // Listen for adjustments to screensize
  const width = canvas!.offsetWidth;
  const height = canvas!.offsetHeight;
  useEffect(() => {
    renderer.setSize(width, height);
  }, [renderer, width, height]);

  // Create the render function for use in animation and loops
  const render = useCallback(() => {
    renderer.render(scene, camera);
  }, [camera, renderer, scene]);
  return render;
}

export function useSceneDetails() {
  return useContext(SceneDetailsContext);
}

interface UseAddToScene {
  obj: THREE.Object3D;
  parent?: THREE.Object3D;
}
export function useAddToScene({ obj, parent }: UseAddToScene) {
  const { scene } = useSceneDetails();
  const entrypoint = parent ?? scene;

  useEffect(() => {
    entrypoint.add(obj);
    return () => {
      entrypoint.remove(obj);
    };
  }, [entrypoint, obj]);
}
