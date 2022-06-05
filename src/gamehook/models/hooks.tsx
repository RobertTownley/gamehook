import * as THREE from "three";
import { useLayoutEffect, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GameModel, UseModelParams } from "./types";
import { generateUUID } from "three/src/math/MathUtils";

const loader = new GLTFLoader();

export function useModel(params: UseModelParams): GameModel {
  const { filepath } = params;
  const [loaded, setLoaded] = useState(false);
  const [gltf, setGLTF] = useState<GLTF | undefined>(undefined);

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
  if (!loaded) return { status: "pending" };
  if (!gltf) return { status: "error" };

  return {
    status: "loaded",
    gltf,
    id: params.id ?? generateUUID(),
    playAnimation: function (animationName) {
      const animation = THREE.AnimationClip.findByName(
        this.gltf.animations,
        animationName
      );
      const mixer = new THREE.AnimationMixer(this.gltf.scene);
      mixer.clipAction(animation).play();
    },
  };
}
