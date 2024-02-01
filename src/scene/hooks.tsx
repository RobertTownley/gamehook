import { CSSProperties, useContext, useEffect, useMemo, useState } from "react";
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

export const SceneStyles: CSSProperties = {
  width: "100vw",
  height: "100vh",
  position: "absolute",
  top: 0,
  left: 0,
};
