import { ReactNode, useEffect, useRef } from "react";

import { useSceneTitleContext } from "../game";
import { useAnimation } from "../hooks";

interface SceneProps {
  children: ReactNode;
  title: string;
}

export const Scene = ({ children, title }: SceneProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneTitle = useSceneTitleContext();
  const isActive = sceneTitle === title;

  useEffect(() => {
    const existingRef = mountRef.current;
    if (!isActive) return;

    mountRef.current?.appendChild(GAME.renderer.domElement);

    return () => {
      existingRef?.removeChild(GAME.renderer.domElement);
    };
  }, [isActive]);

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
