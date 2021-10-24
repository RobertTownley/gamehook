import * as THREE from "three";
import { ReactNode, useEffect } from "react";

import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { BasicMeshType } from "./types";
import { useGame } from "../game";
import { useMesh } from "./hooks";
import { buildChildren } from "./children";

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
  const { children, filepath, onError } = props;
  const game = useGame();
  const gameObject = useMesh({
    ...props,
    geometry: new THREE.BufferGeometry(),
  });

  useEffect(() => {
    let mounted = true;

    const addGLTFToScene = (gltf: GLTF) => {
      if (mounted) {
        gameObject.three.add(gltf.scene);
      }
    };
    const handleLoadingError = onError ?? defaultLoadingError;
    const loader = new GLTFLoader();
    loader.load(filepath, addGLTFToScene, undefined, (e: ErrorEvent) =>
      handleLoadingError(e, filepath)
    );
    return () => {
      mounted = false;
    };
  }, [gameObject.three, game.scene, filepath, game.scene, onError]);

  return <>{buildChildren(gameObject, children)}</>;
};
