import { createContext } from "react";

type RouterParams = {
  routerParams?: any;
  setRouterParams: (params: any) => void;
  sceneKey: string;
  setSceneKey: (key: string) => void;
};

export const DEFAULT_INITIAL_SCENE_KEY = "Initial";
export const RouterContext = createContext<RouterParams>({
  routerParams: undefined,
  setRouterParams: () => {},
  sceneKey: DEFAULT_INITIAL_SCENE_KEY,
  setSceneKey: () => {},
});
