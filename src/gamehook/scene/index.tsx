import * as THREE from "three";
import { ReactNode, useEffect, useMemo } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { buildCamera } from "../camera";
import { useGameLoop, useMountRef, useResize } from "../mount";
import { useInteraction } from "../interactions";

interface SceneProps {
  background?: THREE.ColorRepresentation;
  children: ReactNode;
  width?: number;
  height?: number;
}

export function Scene({
  background = 0x000000,
  children,
  width,
  height,
}: SceneProps) {
  const camera = useMemo(() => buildCamera({}), []);
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);

  // Rendering
  const mountRef = useMountRef(renderer);
  useResize({ width, height, camera, renderer });

  // State
  const value = useMemo<SceneContextValues>(() => {
    const threeScene = new THREE.Scene();

    return {
      camera,
      meshes: {},
      threeScene,
    };
  }, [camera]);

  // Update Background color
  useEffect(() => {
    value.threeScene.background = new THREE.Color(background);
  }, [background, value.threeScene]);

  // Render initial and new frames
  useGameLoop(value.camera.camera, renderer, value.threeScene);

  // Interactions
  useInteraction(value);

  return (
    <div ref={mountRef}>
      <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
    </div>
  );
}
