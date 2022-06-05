import { useContext, useEffect } from "react";

import { SceneContext } from "../scene/context";
import { ModelProps } from "./types";
export type { GameModel } from "./types";
export { useModel } from "./hooks";

export function Model({ id, value }: ModelProps) {
  const scene = useContext(SceneContext);
  useEffect(() => {
    scene.threeScene.add(value.gltf.scene);
  }, [scene.threeScene, value.gltf.scene]);
  return <></>;
}
