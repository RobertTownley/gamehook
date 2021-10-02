import { createContext } from "react";

type RouterParams = {
  sceneKey: string;
  setSceneKey: (key: string) => void;
};

export const DEFAULT_INITIAL_SCENE_KEY = "Initial";
export const RouterContext = createContext<RouterParams>({
  sceneKey: DEFAULT_INITIAL_SCENE_KEY,
  setSceneKey: () => {},
});
