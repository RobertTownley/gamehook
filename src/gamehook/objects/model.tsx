import { useEffect, useRef } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
import { Collidable } from "../interactions/collisions";
import { Interactable } from "../interactions/types";
import { defaultRotation, defaultPosition } from "./defaults";
import { GameObject, Nameable, Positionable } from "./types";

interface ModelProps extends Collidable, Interactable, Nameable, Positionable {
  filepath: string;
  loadingModel?: GameObject;
}
export const Model = ({ filepath, position = defaultPosition }: ModelProps) => {
  const model = useRef<GameObject | undefined>(undefined);

  useEffect(() => {
    const addGLTFToScene = (gltf: GLTF) => {
      const obj: GameObject = {
        obj: gltf.scene,
        id: generateUUID(),
        position: position,
        rotation: defaultRotation,
      };
      model.current = obj;
      GAME.scene.addObjectToScene(obj);
    };
    const loader = new GLTFLoader();
    loader.load(filepath, addGLTFToScene, undefined, function (error) {
      console.log(error);
    });
  }, [filepath, position]);

  return <></>;
};
