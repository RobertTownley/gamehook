import { ReactElement, useEffect, useRef, useState } from "react";

import { initializeEventHandlers } from "./interactions/eventHandler";
import { GameSceneProps } from "./scene";
import { DEFAULT_INITIAL_SCENE_KEY, RouterContext } from "./router";
import { getInitialGameData } from "./initial";

type SceneNode = ReactElement<GameSceneProps>;
interface GameProps {
  children: SceneNode | Array<SceneNode>;
}

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
