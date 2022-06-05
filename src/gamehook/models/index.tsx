import { useContext, useEffect } from "react";
import { SceneContext } from "../scene/context";
import { GLTFModel } from "./types";
export { useModel } from "./hooks";

interface Props {
  value: GLTFModel;
}

export function Model({ value }: Props) {
  const scene = useContext(SceneContext);
  useEffect(() => {
    scene.threeScene.add(value.gltf.scene);
  }, [scene.threeScene, value.gltf.scene]);
  return <></>;
}
