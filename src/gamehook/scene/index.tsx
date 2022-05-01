import * as THREE from "three";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { GameObject } from "../objects";
import { GameLight } from "../lights";
import { buildCamera } from "../camera";
import { useGameLoop, useMountRef, useResize } from "../mount";

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
  const [objects, setObjects] = useState<Record<string, GameObject>>({});
  const [lights, setLights] = useState<Record<string, GameLight>>({});

  const value = useMemo<SceneContextValues>(() => {
    const threeScene = new THREE.Scene();

    const addToScene = (gameObject: GameObject) => {
      threeScene.add(gameObject.threeMesh);
    };
    const removeFromScene = (gameObject: GameObject) => {
      threeScene.remove(gameObject.threeMesh);
    };

    return {
      camera,
      objects,
      setObjects,
      lights,
      setLights,
      threeScene,
      // Actions
      addToScene,
      removeFromScene,
    };
  }, [camera, objects, lights]);

  // Update Background color
  useEffect(() => {
    value.threeScene.background = new THREE.Color(background);
  }, [background, value.threeScene]);

  // Render initial and new frames
  useGameLoop(value.camera.camera, renderer, value.threeScene);

  return (
    <div ref={mountRef}>
      <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
    </div>
  );
}
