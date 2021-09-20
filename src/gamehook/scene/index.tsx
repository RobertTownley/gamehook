import * as THREE from "three";
import { ReactNode, useEffect, useRef } from "react";

import { useSceneTitleContext } from "../game";
import { useAnimation } from "../hooks";

interface SceneProps {
  backgroundColor?: string;
  children: ReactNode;
  title: string;
}

export const Scene = ({
  backgroundColor = "#000",
  children,
  title,
}: SceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneTitle = useSceneTitleContext();
  const isActive = sceneTitle === title;

  // Mount Scene
  // TODO: This causes a flash. Maybe the scene can just be re-used?
  useEffect(() => {
    const existingRef = mountRef.current;
    if (!isActive) return;

    mountRef.current?.appendChild(GAME.renderer.domElement);

    return () => {
      if (existingRef?.contains(GAME.renderer.domElement)) {
        existingRef?.removeChild(GAME.renderer.domElement);
      }
    };
  }, [isActive]);

  // Set Background Color
  useEffect(() => {
    GAME.scene.threeScene.background = new THREE.Color(backgroundColor);
  }, [backgroundColor]);

  useAnimation(() => {
    if (!isActive) return null;
    // Determine objects to add/remove from scene
    for (const obj of Object.values(GAME.scene.objects)) {
      if (obj.state === "Ready") {
        // Add object to scene
        obj.state = "Initialized";
      } else if (obj.state === "Terminating") {
        obj.state = "Terminated";
      }
    }
    GAME.renderer.render(GAME.scene.threeScene, GAME.scene.camera);
  });

  if (!isActive) return null;

  return (
    <div>
      <div ref={mountRef} />
      <>{children}</>
    </div>
  );
};
