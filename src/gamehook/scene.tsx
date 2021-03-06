import * as THREE from "three";
import { MutableRefObject, ReactNode, useEffect, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { useGame } from "./game";
import { Animation } from "./animations";
import { GameCamera, GameLight, GameObject } from "./objects/types";
import {
  accelerateObjects,
  moveObjects,
  rotateObjects,
} from "./physics/animationHandlers";
import { detectCollisions } from "./physics/collisions";

const DEFAULT_BACKGROUND_COLOR = 0x000000;
export interface SceneProps {
  backgroundColor?: number;
  children?: ReactNode;
  title: string;
}

export const Scene = (props: SceneProps) => {
  const { children, backgroundColor } = props;

  const [initialized, setInitialized] = useState(false);
  const game = useGame();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      game.scene = buildScene();
      game.scene.three.background = new THREE.Color(
        backgroundColor || DEFAULT_BACKGROUND_COLOR
      );
      setInitialized(true);
    }
    return () => {
      mounted = false;
    };
  }, [backgroundColor, game]);

  // Render the scene and perform required animations
  useEffect(() => {
    const animate = () => {
      game.renderer.render(game.scene.three, game.scene.camera.three);
      requestAnimationFrame(animate);

      // Animate callbacks created within `useAnimation`
      Object.values(game.scene.animations)
        .filter((animation) => !animation.current.revoked)
        .forEach((animation) => {
          const result = animation.current.callback();
          if (result) {
            delete game.scene.animations[animation.current.id];
          }
        });

      // Handle object physics
      detectCollisions();
      rotateObjects();
      moveObjects();
      accelerateObjects();
    };
    animate();
  }, [game.renderer, game.scene]);

  // Delay rendering of child components to avoid having them render
  // before the scene completes its useLayoutEffect, and add themselves
  // to the scene that's about to be removed
  return initialized ? <>{children}</> : <></>;
};

export interface GameScene {
  id: string;
  addObjectToScene: (gameObject: GameObject) => void;
  addLightToScene: (gameLight: GameLight) => void;
  animations: { [key: string]: MutableRefObject<Animation> };
  camera: GameCamera;
  removeObjectFromScene: (gameObject: GameObject) => void;
  removeLightFromScene: (gameLight: GameLight) => void;
  gameLights: { [key: string]: GameLight };
  gameObjects: { [key: string]: GameObject };
  three: THREE.Scene;
}

// This is the scene that renders before the reactive elements have
// taken hold and replaced the scene with a new scene object
export const buildScene = (): GameScene => {
  const scene: GameScene = {
    animations: {},
    camera: {
      id: generateUUID(),
      three: new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ),
      type: "camera",
    },
    gameObjects: {},
    gameLights: {},
    id: generateUUID(),
    three: new THREE.Scene(),
    // Methods
    addObjectToScene: function (gameObject: GameObject) {
      this.three.add(gameObject.three);
      this.gameObjects[gameObject.id] = gameObject;
    },
    addLightToScene: function (gameLight: GameLight) {
      this.three.add(gameLight.three);
      this.gameLights[gameLight.id] = gameLight;
    },
    removeLightFromScene: function (gameLight: GameLight) {
      this.three.remove(gameLight.three);
      delete this.gameLights[gameLight.id];
    },
    removeObjectFromScene: function (gameObject: GameObject) {
      this.three.remove(gameObject.three);
      delete this.gameObjects[gameObject.id];
    },
  };

  return scene;
};

export const initialScene: GameScene = buildScene();

export const useScene = (): GameScene => {
  const game = useGame();
  return game.scene;
};
