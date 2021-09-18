import * as THREE from "three";
import {
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { GameObject } from "./objects/types";
import { useAnimation } from "./hooks";

export interface GameData {
  id: string;
  scene: {
    id: string;
    objects: { [key: string]: GameObject };
    title: string;
    // Object Methods
    addObjectToScene: (obj: GameObject) => void;
    removeObjectFromScene: (obj: GameObject) => void;
    // Scene Methods
    setSceneTitle: (title: string) => void;
  };
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
      objects: {},
      title: "Loading",
      // Object Methods
      addObjectToScene: function (obj: GameObject) {
        this.objects[obj.id] = obj;
      },
      removeObjectFromScene: function (obj: GameObject) {
        delete this.objects[obj.id];
      },
      // Scene Methods
      setSceneTitle: function (title: string) {
        this.title = title;
      },
    },
  };
};

window.GAME = getInitialGameData();

export const SceneTitleContext = createContext("Loading");
export const useSceneTitleContext = () => useContext(SceneTitleContext);

export const Game = (props: GameProps) => {
  const [sceneTitle, setSceneTitle] = useState(props.initialSceneTitle);

  // Game Loop
  useEffect(() => {
    const gameLoop = () => {
      requestAnimationFrame(gameLoop);

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
