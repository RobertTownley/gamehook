import * as THREE from "three";
import { ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { isPerspectiveCamera } from "./camera";
import { initialScene, GameScene, SceneProps } from "./scene";
import { handleKeyboardEvent, handleMouseEvent } from "./interactions";

/* Game Component and Mounting */
interface Props {
  children?: ReactNode;
  width?: number;
  height?: number;
}
export const Game = ({ children, width, height }: Props) => {
  const game = useGame({ width, height });
  const mountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let mounted = true;
    const existingRef = mountRef.current;
    const { domElement } = game.renderer;

    if (mounted) {
      mountRef.current?.appendChild(domElement);
    }
    return () => {
      mounted = false;
      if (existingRef?.contains(domElement)) {
        existingRef?.removeChild(domElement);
      }
    };
  }, [game.renderer]);

  const sceneTitle = "foo"; // TODO:
  const scenes = (
    Array.isArray(children) ? children : [children]
  ) as SceneProps[];
  const scene =
    scenes.length === 1
      ? scenes[0]
      : scenes.find((s) => s.title === sceneTitle);
  return (
    <>
      <div ref={mountRef} />
      {scene}
    </>
  );
};

/* Game Initialization */
export interface GameProperties {
  id: string;
  renderer: THREE.WebGLRenderer;
  resources: {
    geometries: Record<string, THREE.BufferGeometry>;
    materials: Record<string, THREE.Material>;
  };
  scene: GameScene;
  width: number;
  height: number;

  onWindowResize: () => void;
}

export const useGame = (props?: Props): GameProperties => {
  if (!window._GAME && props) {
    const { width, height } = props;
    // Initialize game
    window._GAME = {
      id: generateUUID(),
      resources: {
        geometries: {},
        materials: {},
      },
      scene: initialScene,
      renderer: new THREE.WebGLRenderer(),
      width: width ?? window.innerWidth,
      height: height ?? window.innerHeight,

      // Listeners
      onWindowResize: function () {
        const threeCamera = _GAME.scene.camera.three;
        if (isPerspectiveCamera(threeCamera)) {
          const _w = width ?? window.innerWidth;
          const _h = height ?? window.innerHeight;
          threeCamera.aspect = _w / _h;
          threeCamera.updateProjectionMatrix();
          _GAME.renderer.setSize(_w, _h);
        }
      },
    };

    // Resize
    window.addEventListener("resize", window._GAME.onWindowResize);
    // Mouse Events
    window.addEventListener("click", handleMouseEvent);

    // Keyboard Events
    window.addEventListener("keyup", handleKeyboardEvent);
    window.addEventListener("keydown", handleKeyboardEvent);
    window.addEventListener("keypress", handleKeyboardEvent);
  }
  const game = useRef<GameProperties>(window._GAME);
  useEffect(() => {
    game.current.onWindowResize();
  }, []);
  return game.current;
};
