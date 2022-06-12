import { useContext, useEffect } from "react";
import { useModelPhysics } from "../physics/hooks";

import { SceneContext } from "../scene/context";
import { ModelProps } from "./types";
export type { GameModel, LoadedGameModel } from "./types";
export { useModel } from "./hooks";

export function Model(props: ModelProps) {
  const { children, value } = props;
  useModelPhysics(value, props);
  const scene = useContext(SceneContext);
  useEffect(() => {
    scene.threeScene.add(value.gltf.scene);
    if (!scene.models[value.id]) {
      scene.models[value.id] = value;
    }
    return () => {
      scene.threeScene.remove(value.gltf.scene);
      delete scene.models[value.id];
      scene.threeScene.removeFromParent();
    };
  }, [scene.threeScene, scene.models, value]);

  return <>{children}</>;
}
