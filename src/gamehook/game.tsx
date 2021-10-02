import * as THREE from "three";
import { ReactElement, useEffect, useRef, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { GameObject } from "./objects/types";
import { getCanvasDimensions } from "./window";
import { EventHandlerMap } from "./interactions/types";
import {
  buildEventHandlerMap,
  initializeEventHandlers,
} from "./interactions/eventHandler";
import { GameSceneProps } from "./scene";
import { DEFAULT_INITIAL_SCENE_KEY, RouterContext } from "./router";

export interface Scene {
  camera: THREE.PerspectiveCamera;
  id: string;
  objects: { [key: string]: GameObject };
  threeScene: THREE.Scene;
  // Object Methods
  addObjectToScene: (obj: GameObject) => void;
  removeObjectFromScene: (obj: GameObject) => void;
}

export interface GameRouter {
  currentSceneKey: string;
  push: (key: string) => void;
}
export interface GameData {
  id: string;
  eventHandlers: EventHandlerMap;
  renderer: THREE.WebGLRenderer;
  router: GameRouter;
  scene: Scene;
  // Window Methods
  onWindowResize: () => void;
}

type SceneNode = ReactElement<GameSceneProps>;
interface GameProps {
  children: SceneNode | Array<SceneNode>;
}

const handleSceneChange = (key: string) => {
  if (GAME.router.currentSceneKey === key) return;

  // Remove objects from scene
  Object.values(GAME.scene.objects).forEach((obj) => {
    GAME.scene.removeObjectFromScene(obj);
  });

  // Set the new key
  GAME.router.currentSceneKey = key;

  // Resize TODO: is this necessary?
  GAME.onWindowResize();
};

export const getInitialGameData = (): GameData => {
  const { width, height } = getCanvasDimensions();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  return {
    id: generateUUID(),
    eventHandlers: buildEventHandlerMap(),
    router: {
      currentSceneKey: DEFAULT_INITIAL_SCENE_KEY,
      push: handleSceneChange,
    },
    scene: {
      camera,
      id: generateUUID(),
      threeScene: new THREE.Scene(),
      objects: {},
      // Object Methods
      addObjectToScene: function (obj: GameObject) {
        this.threeScene.add(obj.obj);
        this.objects[obj.id] = obj;
      },
      removeObjectFromScene: function (obj: GameObject) {
        this.threeScene.remove(obj.obj);
        delete this.objects[obj.id];
      },
    },
    renderer: new THREE.WebGLRenderer(),
    onWindowResize: function () {
      const { width, height } = getCanvasDimensions();
      this.scene.camera.aspect = width / height;
      this.scene.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    },
  };
};

window.GAME = getInitialGameData();
initializeEventHandlers();
window.GAME.onWindowResize();

export const Game = (props: GameProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneKey, setSceneKey] = useState(DEFAULT_INITIAL_SCENE_KEY);

  // Game Loop
  useEffect(() => {
    const gameLoop = () => {
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, []);

  // Mount scene
  useEffect(() => {
    let mounted = true;
    const existingRef = mountRef.current;
    if (mounted) {
      mountRef.current?.appendChild(GAME.renderer.domElement);
    }
    return () => {
      mounted = false;
      if (existingRef?.contains(GAME.renderer.domElement)) {
        existingRef?.removeChild(GAME.renderer.domElement);
      }
    };
  }, []);

  const scenes = Array.isArray(props.children)
    ? props.children
    : [props.children];

  const scene = scenes.find((scene) => {
    return scene.key === sceneKey;
  });
  if (!scene) return null;

  return (
    <RouterContext.Provider value={{ sceneKey, setSceneKey }}>
      <div ref={mountRef} />
      {scene}
    </RouterContext.Provider>
  );
};
