import { ReactNode, useEffect, useRef } from "react";
import * as THREE from "three";

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

  // Build Scene Resources within refs to avoid re-renders
  const renderer = useRef(new THREE.WebGLRenderer());
  const scene = useRef(new THREE.Scene());
  const camera = useRef(
    new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight)
  );
  camera.current.position.z = 5;

  useEffect(() => {
    if (!isActive) return;

    const existingRef = mountRef.current;
    const existingRenderer = renderer.current;
    mountRef.current?.appendChild(renderer.current.domElement);

    const onWindowResize = () => {
      const [width, height] = [window.innerWidth / 2, window.innerHeight / 2];
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();
      renderer.current.setSize(width, height);
    };
    onWindowResize();

    return () => {
      existingRef?.removeChild(existingRenderer.domElement);
    };
  }, [isActive]);

  useAnimation(() => {
    if (!isActive) return null;
    // Determine objects to add/remove from scene
    for (const obj of Object.values(GAME.scene.objects)) {
      if (obj.state === "Ready") {
        // Add object to scene
        scene.current.add(obj.obj);
        obj.state = "Initialized";
      } else if (obj.state === "Terminating") {
        scene.current.remove(obj.obj);
        obj.state = "Terminated";
      }
    }
    renderer.current.render(scene.current, camera.current);
  });

  if (!isActive) return null;

  return (
    <div>
      <div ref={mountRef} />
      <>{children}</>
    </div>
  );
};
