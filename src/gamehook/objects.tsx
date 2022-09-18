import { useContext } from "react";
import { Mesh } from "./mesh";
import { SceneContext } from "./scene/context";

export function useObject(id: string): Mesh | null {
  const scene = useContext(SceneContext);
  if (!scene || !scene.meshes) {
    throw new Error("useObject may only be called within a scene context");
  }
  const obj = scene.meshes[id];
  return obj;
}
