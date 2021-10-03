import {
  ReactElement,
  useLayoutEffect,
  useEffect,
  useRef,
  useState,
} from "react";

import { initializeEventHandlers } from "./interactions/eventHandler";
import { GameSceneProps } from "./scene";
import { DEFAULT_INITIAL_SCENE_KEY, RouterContext } from "./router";
import { getInitialGameData } from "./initial";

type SceneNode = ReactElement<GameSceneProps>;
interface GameProps {
  children: SceneNode | Array<SceneNode>;
  height?: number;
  initialScene?: string;
  width?: number;
}

export const Game = ({
  children,
  height,
  initialScene = DEFAULT_INITIAL_SCENE_KEY,
  width,
}: GameProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [sceneKey, setSceneKey] = useState(initialScene);

  // Initialize Game Data
  useLayoutEffect(() => {
    window.GAME = getInitialGameData({ width, height });
    initializeEventHandlers();
    window.GAME.onWindowResize();
  }, [height, width]);

  // Game Loop
  useEffect(() => {
    const gameLoop = () => {
      requestAnimationFrame(gameLoop);
    };

    gameLoop();
  }, []);

  // Mount scene
  useLayoutEffect(() => {
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

  const scenes = Array.isArray(children) ? children : [children];

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
