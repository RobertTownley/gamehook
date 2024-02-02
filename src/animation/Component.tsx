import { useContext, useEffect, useMemo } from "react";
import * as THREE from "three";
import { AnimationMixer } from "three";

import { HierarchyContext } from "../hierarchy/context";
import { useSceneDetails } from "../scene/hooks";

interface Props {
  name: string;
}
export function Animation({ name }: Props) {
  const { animations, parent } = useContext(HierarchyContext);
  const { scene } = useSceneDetails();
  if (!parent) {
    throw new Error(`Animation without parent`);
  }

  const mixer = useMemo(() => {
    return new THREE.AnimationMixer(parent);
  }, [parent]);

  useEffect(() => {
    const { mixers } = scene.userData;
    mixers.push(mixer);
    return () => {
      scene.userData["mixers"] = mixers.filter(
        (m: AnimationMixer) => m !== mixer
      );
    };
  }, [scene.userData, mixer]);

  const animationClip = useMemo(() => {
    return THREE.AnimationClip.findByName(animations, name);
  }, [name, animations]);

  const action = useMemo(() => {
    return animationClip ? mixer.clipAction(animationClip) : undefined;
  }, [animationClip, mixer]);

  useEffect(() => {
    if (action) {
      action.setLoop(THREE.LoopPingPong, 50);
      action.clampWhenFinished = true;
      action.play();
    }

    return () => {
      if (action) {
        action.stop();
      }
    };
  }, [action]);
  return null;
}
