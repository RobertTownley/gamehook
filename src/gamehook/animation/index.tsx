import * as THREE from "three";

import { useContext, useEffect } from "react";
import { ModelHierarchyContext } from "../hierarchy";

interface Props {
  name: string;
  loop?: boolean;
  repetitions?: number;
}

export function Animation({ name, loop = false, repetitions = 1 }: Props) {
  const hierarchy = useContext(ModelHierarchyContext);
  useEffect(() => {
    if (hierarchy) {
      const animation = THREE.AnimationClip.findByName(
        hierarchy.gltf.animations,
        name
      );
      const action = hierarchy.mixer.clipAction(animation);
      if (loop) {
        action.play();
      } else {
        action.setLoop(THREE.LoopOnce, repetitions).play();
      }
    }
  }, [hierarchy, loop, name, repetitions]);
  return <></>;
}
