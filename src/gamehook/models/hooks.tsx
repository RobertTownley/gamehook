import * as THREE from "three";
import { useLayoutEffect, useMemo, useState } from "react";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { AnimationOptions, GameModel, UseModelParams } from "./types";
import { generateUUID } from "three/src/math/MathUtils";

const loader = new GLTFLoader();

const DefaultAnimationOptions: AnimationOptions = {
  loop: true,
};
export function useModel(params: UseModelParams): GameModel {
  const { filepath } = params;
  const [loaded, setLoaded] = useState(false);
  const [gltf, setGLTF] = useState<GLTF | undefined>(undefined);
  const mixer = useMemo(() => {
    if (!gltf?.scene) return;
    return new THREE.AnimationMixer(gltf.scene);
  }, [gltf?.scene]);

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
  if (!gltf || !mixer) return { status: "error" };

  return {
    status: "loaded",
    gltf,
    mixer,
    id: params.id ?? generateUUID(),
    playAnimation: function (animationName, opts = DefaultAnimationOptions) {
      const animation = THREE.AnimationClip.findByName(
        this.gltf.animations,
        animationName
      );
      const action = this.mixer.clipAction(animation);
      if (opts.loop) {
        action.play();
      } else if (opts.repetitions) {
        action.setLoop(THREE.LoopOnce, opts.repetitions).play();
      }
    },
    clock: new THREE.Clock(),
  };
}
