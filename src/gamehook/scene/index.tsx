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
  antialias?: boolean;
}

export function Scene({
  antialias = true,
  background = 0x000000,
  castShadow = false,
  children,
  id,
  width,
  height,
  theme,
}: SceneProps) {
  const sceneId = useMemo(() => id ?? generateUUID(), [id]);
  const camera = useMemo(() => buildGameCamera({}), []);
  const renderer = useMemo(
    () =>
      new THREE.WebGLRenderer({
        antialias,
      }),
    [antialias]
  );
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
      id: sceneId,
      lights: {},
      meshes: {},
      models: {},
      threeScene,
    };
  }, [camera, sceneId]);

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
    <div ref={mountRef} id={sceneId}>
      <SceneContext.Provider value={value}>
        <ThemeContext.Provider value={theme ?? DefaultTheme}>
          {children}
        </ThemeContext.Provider>
      </SceneContext.Provider>
    </div>
  );
}
