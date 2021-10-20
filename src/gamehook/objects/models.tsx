import * as THREE from "three";
import { ReactNode, useEffect, useRef } from "react";

import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
import { BasicMeshType, GameObject } from "./types";
import { buildChildren } from "./children";
import { useGameObject } from "./hooks";
import { useGame } from "../game";

interface ModelProps extends BasicMeshType {
  children?: ReactNode;
  onError?: () => void;
  filepath: string;
  loadingModel?: THREE.Mesh;
}

const defaultLoadingError = (_event: ErrorEvent, filepath: string) => {
  throw new Error(`Model ${filepath} could not be loaded`);
};

export const Model = (props: ModelProps) => {
  const {
    children,
    position,
    rotation,
    velocity,
    acceleration,
    filepath,
    onError,
  } = props;
  const game = useGame();
  const gameObject = useRef<GameObject>({
    id: generateUUID(),
    three: props.loadingModel ?? new THREE.Mesh(),
    rotation,
    velocity,
    acceleration,
    position,
  });
  useGameObject(gameObject.current, props);

  useEffect(() => {
    let mounted = true;
    const handleLoadingError = onError ?? defaultLoadingError;
    const current = gameObject.current;
    if (mounted) {
      const addGLTFToScene = (gltf: GLTF) => {
        // TODO: Tremendous weirdness when models are children

        game.scene.removeObjectFromScene(gameObject.current);
        gameObject.current.three = gltf.scene;
        game.scene.addObjectToScene(gameObject.current);
      };
      const loader = new GLTFLoader();
      loader.load(filepath, addGLTFToScene, undefined, (err) =>
        handleLoadingError(err, filepath)
      );
    }
    return () => {
      mounted = false;
      game.scene.removeObjectFromScene(current);
    };
  }, [filepath, game.scene, onError]);
  return <>{buildChildren(gameObject.current, children)}</>;
};
