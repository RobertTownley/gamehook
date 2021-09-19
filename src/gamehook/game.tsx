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
import { getCanvasDimensions } from "./window";

export interface Scene {
  camera: THREE.PerspectiveCamera;
  id: string;
  objects: { [key: string]: GameObject };
  threeScene: THREE.Scene;
  title: string;
  // Object Methods
  addObjectToScene: (obj: GameObject) => void;
  removeObjectFromScene: (obj: GameObject) => void;
}

export interface GameData {
  id: string;
  renderer: THREE.WebGLRenderer;
  scene: Scene;
  transitionToScene: (title: string) => void;
  // Window Methods
  onWindowResize: () => void;
}

interface GameProps {
  children: Array<ReactNode>;
  initialSceneTitle: string;
}

export const getInitialGameData = (): GameData => {
  const { width, height } = getCanvasDimensions();
  const camera = new THREE.PerspectiveCamera(75, width / height);
  camera.position.z = 5;

  return {
    id: generateUUID(),
    scene: {
      camera,
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
    renderer: new THREE.WebGLRenderer(),
    transitionToScene: function (title: string) {
      // Remove objects from scene
      Object.values(this.scene.objects).forEach((obj) => {
        this.scene.removeObjectFromScene(obj);
      });
      this.scene.threeScene = new THREE.Scene();
      this.scene.title = title;
      this.onWindowResize();
    },
    onWindowResize: function () {
      const { width, height } = getCanvasDimensions();
      this.scene.camera.aspect = width / height;
      this.scene.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },
  };
};

window.GAME = getInitialGameData();
window.addEventListener(
  "resize",
  () => {
    window.GAME.onWindowResize();
  },
  false
);
window.GAME.onWindowResize();

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
