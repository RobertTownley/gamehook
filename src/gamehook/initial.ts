import * as THREE from "three";

import { generateUUID } from "three/src/math/MathUtils";
import { buildEventHandlerMap } from "./interactions/eventHandler";
import { EventHandlerMap } from "./interactions/types";
import { SceneData } from "./scene";
import { GameObject } from "./objects/types";
import { DEFAULT_INITIAL_SCENE_KEY } from "./router";

export interface GameRouter {
  currentSceneKey: string;
  push: (key: string) => void;
}

export interface GameData {
  id: string;
  eventHandlers: EventHandlerMap;
  renderer: THREE.WebGLRenderer;
  router: GameRouter;
  scene: SceneData;
  // Window Methods
  onWindowResize: () => void;
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

interface Params {
  width?: number;
  height?: number;
}
export const getInitialGameData = ({ width, height }: Params): GameData => {
  const _width = width || window.innerWidth;
  const _height = height || window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, _width / _height, 0.1, 1000);
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
      const _width = width || window.innerWidth;
      const _height = height || window.innerHeight;
      this.scene.camera.aspect = _width / _height;
      this.scene.camera.updateProjectionMatrix();
      this.renderer.setSize(_width, _height);
    },
  };
};
