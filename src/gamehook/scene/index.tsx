import * as THREE from "three";
import { ReactNode, useEffect, useMemo } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { buildGameCamera } from "../camera";
import { useGameLoop, useMountRef, useResize } from "../mount";
import { generateUUID } from "three/src/math/MathUtils";
import { useInteraction } from "../interactions";
import { Theme, DefaultTheme, ThemeContext } from "../theme";

interface SceneProps {
  background?: THREE.ColorRepresentation;
  castShadow?: boolean;
  children: ReactNode;
  id?: string;
  width?: number;
  height?: number;
  theme?: Theme;
}

export function Scene({
  background = 0x000000,
  castShadow = false,
  children,
  id,
  width,
  height,
  theme,
}: SceneProps) {
  const camera = useMemo(() => buildGameCamera({}), []);
  const renderer = useMemo(() => new THREE.WebGLRenderer(), []);
  if (castShadow) {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  // Rendering
  const mountRef = useMountRef(renderer);
  useResize({ width, height, camera, renderer });

  // State
  const value = useMemo<SceneContextValues>(() => {
    const threeScene = new THREE.Scene();

    return {
      camera,
      id: id ?? generateUUID(),
      lights: {},
      meshes: {},
      models: {},
      threeScene,
    };
  }, [camera, id]);

  // Update Background color
  useEffect(() => {
    value.threeScene.background = new THREE.Color(background);
  }, [background, value.threeScene]);

  // Render initial and new frames
  useGameLoop({
    camera: value.camera,
    lights: value.lights,
    models: value.models,
    renderer,
    scene: value.threeScene,
    meshes: value.meshes,
  });

  // Listen for user interactions
  useInteraction(value.meshes, renderer, camera.camera);

  return (
    <div ref={mountRef}>
      <SceneContext.Provider value={value}>
        <ThemeContext.Provider value={theme ?? DefaultTheme}>
          {children}
        </ThemeContext.Provider>
      </SceneContext.Provider>
    </div>
  );
}
