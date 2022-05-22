import * as THREE from "three";
import { ReactNode, useEffect, useMemo } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { buildCamera } from "../camera";
import { useGameLoop, useMountRef, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";

interface SceneProps {
  background?: THREE.ColorRepresentation;
  children: ReactNode;
  id?: string;
  width?: number;
  height?: number;
}

export function Scene({
  background = 0x000000,
  children,
  id,
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
      id: id ?? generateUUID(),
      meshes: {},
      threeScene,
    };
  }, [camera, id]);

  // Update Background color
  useEffect(() => {
    value.threeScene.background = new THREE.Color(background);
  }, [background, value.threeScene]);

  // Render initial and new frames
  useGameLoop({
    camera: value.camera.camera,
    renderer,
    scene: value.threeScene,
    meshes: value.meshes,
  });

  // Listen for user interactions
  useInteraction(value.meshes, renderer, camera.camera);

  return (
    <div ref={mountRef}>
      <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
    </div>
  );
}
