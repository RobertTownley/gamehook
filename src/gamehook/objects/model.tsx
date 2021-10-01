import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
import { defaultPosition, defaultRotation } from "./defaults";
import { GameObject } from "./types";

interface Props {
  filepath: string;
  loadingModel?: GameObject;
}
export const Model = ({ filepath }: Props) => {
  const model = useRef<GameObject | undefined>(undefined);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      filepath,
      function (gltf) {
        const obj: GameObject = {
          obj: gltf.scene,
          id: generateUUID(),
          position: defaultPosition,
          rotation: defaultRotation,
          state: "Ready",
        };
        model.current = obj;
        GAME.scene.addObjectToScene(obj);
      },
      undefined,
      function (error) {
        console.log(error);
      }
    );
  }, [filepath]);

  return <></>;
};
