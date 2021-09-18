import * as THREE from "three";
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { GameObject } from "./objects/types";

export interface GameData {
  id: string;
  scene: {
    id: string;
    threeScene: THREE.Scene;
    objects: { [key: string]: GameObject };
    title: string;
    // Object Methods
    addObjectToScene: (obj: GameObject) => void;
    removeObjectFromScene: (obj: GameObject) => void;
  };
  transitionToScene: (title: string) => void;
}

interface GameProps {
  children: Array<ReactNode>;
  initialSceneTitle: string;
}

export const getInitialGameData = (): GameData => {
  return {
    id: generateUUID(),
    scene: {
      id: generateUUID(),
      threeScene: new THREE.Scene(),
      objects: {},
      title: "Loading",
      // Object Methods
      addObjectToScene: function (obj: GameObject) {
        this.threeScene.add(obj.obj);
        this.objects[obj.id] = obj;
      },
      removeObjectFromScene: function (obj: GameObject) {
        this.threeScene.remove(obj.obj);
        delete this.objects[obj.id];
      },
      // Scene Methods
    },
    transitionToScene: function (title: string) {
      // Remove objects from scene
      Object.values(this.scene.objects).forEach((obj) => {
        this.scene.removeObjectFromScene(obj);
      });
      this.scene.threeScene = new THREE.Scene();
      this.scene.title = title;
    },
  };
};

window.GAME = getInitialGameData();

export const SceneTitleContext = createContext("Loading");
export const useSceneTitleContext = () => useContext(SceneTitleContext);

export const Game = (props: GameProps) => {
  const [sceneTitle, setSceneTitle] = useState(props.initialSceneTitle);

  // Game Loop
  const FPS = 2;
  useEffect(() => {
    const gameLoop = () => {
      setTimeout(() => {
        requestAnimationFrame(gameLoop);
      }, 1000 / FPS);

      // Detect Scene Change
      if (GAME.scene.title !== sceneTitle) {
        setSceneTitle(GAME.scene.title);
      }
    };
    gameLoop();
  }, [sceneTitle]);

  // Start tracking game objects on the DOM

  return (
    <SceneTitleContext.Provider value={sceneTitle}>
      {props.children}
    </SceneTitleContext.Provider>
  );
};
