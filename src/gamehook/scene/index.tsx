import * as THREE from "three";
import { ReactNode, useEffect } from "react";

import { useAnimation } from "../hooks";
import { GameObject } from "../objects/types";
import { detectCollisions } from "../interactions/collisions";
import { GameListener } from "../listeners";

interface SceneProps {
  backgroundColor?: string;
  children: ReactNode;
}

export interface SceneData {
  camera: THREE.PerspectiveCamera;
  id: string;
  threeScene: THREE.Scene;
  // Objects
  objects: { [key: string]: GameObject };
  addObjectToScene: (obj: GameObject) => void;
  removeObjectFromScene: (obj: GameObject) => void;
  // Listeners
  listeners: { [key: string]: GameListener };
  addListenerToScene: (listener: GameListener) => void;
  removeListenerFromScene: (listener: GameListener) => void;
}

export interface GameSceneProps {
  key: string;
}
export type GameScene<T = {}> = React.FC<GameSceneProps & T>;

export const Scene = ({ backgroundColor = "#000", children }: SceneProps) => {
  // Set Background Color
  useEffect(() => {
    GAME.scene.threeScene.background = new THREE.Color(backgroundColor);
  }, [backgroundColor]);

  useAnimation(() => {
    detectCollisions();
    GAME.renderer.render(GAME.scene.threeScene, GAME.scene.camera);
  });

  return (
    <div>
      <>{children}</>
    </div>
  );
};
