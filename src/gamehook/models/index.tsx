import * as THREE from "three";
import { useContext, useLayoutEffect, useMemo, useState } from "react";
import { useModelPhysics } from "../physics/hooks";

import { SceneContext } from "../scene/context";
import { LoadedGameModel, ModelProps } from "./types";
import { ModelHierarchyContext } from "../hierarchy";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { generateUUID } from "three/src/math/MathUtils";
export type { GameModel, LoadedGameModel } from "./types";

const loader = new GLTFLoader();

export function Model(props: ModelProps) {
  const scene = useContext(SceneContext);
  const { children, filepath, id = generateUUID() } = props;
  const [loaded, setLoaded] = useState(false);
  const [gltf, setGLTF] = useState<GLTF | undefined>(undefined);

  const mixer = useMemo(() => {
    if (!gltf?.scene) return;
    return new THREE.AnimationMixer(gltf.scene);
  }, [gltf?.scene]);

  const loadedGameModel: LoadedGameModel | undefined = useMemo(() => {
    if (!gltf || !mixer) return;
    return {
      id,
      gltf,
      mixer,
      clock: new THREE.Clock(),
    };
  }, [gltf, id, mixer]);

  // Load model
  useLayoutEffect(() => {
    try {
      loader.load(filepath, (gltf) => {
        setGLTF(gltf);
        setLoaded(true);
      });
    } catch (err) {
    } finally {
      setLoaded(true);
    }
  }, [filepath]);

  // Add model to scene
  useLayoutEffect(() => {
    if (loadedGameModel) {
      scene.threeScene.add(loadedGameModel.gltf.scene);
      scene.models[id] = loadedGameModel;
    }
    return () => {
      if (loadedGameModel) {
        scene.threeScene.remove(loadedGameModel?.gltf.scene);
        delete scene.models[id];
      }
    };
  }, [scene.models, scene.threeScene, loadedGameModel, id]);

  useModelPhysics(loadedGameModel, props);

  if (!loaded) return <></>;

  return (
    <ModelHierarchyContext.Provider value={loadedGameModel}>
      {children}
    </ModelHierarchyContext.Provider>
  );
}
