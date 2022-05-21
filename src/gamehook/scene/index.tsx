import * as THREE from "three";
import { ReactNode, useEffect, useMemo } from "react";

import { SceneContext, SceneContextValues } from "./context";
import { GameObject } from "../objects";
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
      objects: {},
      threeScene,
      // Actions
      addObjectToScene: function (gameObject: GameObject) {
        threeScene.add(gameObject.threeMesh);
        this.objects[gameObject.id] = gameObject;
      },
      removeObjectFromScene: function (gameObject: GameObject) {
        threeScene.remove(gameObject.threeMesh);
        delete this.objects[gameObject.id];
      },
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
