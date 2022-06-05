import { useContext, useEffect, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
import { SceneContext } from "../scene/context";
import { GLTFModel } from "./types";

const loader = new GLTFLoader();

export function useModel(filepath: string): GLTFModel | undefined {
  const scene = useContext(SceneContext);
  const [model, setModel] = useState<GLTFModel | undefined>(undefined);
  useEffect(() => {
    loader.load(filepath, (gltf) => {
      setModel({
        gltf,
        id: generateUUID(),
      });
    });
  }, [filepath, scene.threeScene]);
  return model;
}
