import { useEffect, useMemo } from "react";
import { useCamera } from "../camera/hooks";
import {
  ArcballControls,
  DragControls,
  FirstPersonControls,
  FlyControls,
  MapControls,
  OrbitControls,
  PointerLockControls,
  TrackballControls,
  TransformControls,
} from "three/examples/jsm/Addons";

import { useSceneDetails } from "../scene/hooks";
import { ControlsProps } from "./types";

export function Controls(props: ControlsProps) {
  const { targetIds, variant } = props;
  const { camera } = useCamera();
  const { canvas, scene } = useSceneDetails();

  const listenerTarget = canvas;

  const threeControls = useMemo(() => {
    if (!listenerTarget) {
      throw new Error("Listener target not found");
    }
    if (variant === "arcball") {
      return new ArcballControls(camera, listenerTarget, scene);
    }
    if (variant === "drag") {
      const targets: THREE.Object3D[] = [];
      if (targetIds) {
        scene.traverse((obj) => {
          if (targetIds.includes(obj["userData"].id)) {
            targets.push(obj);
          }
        });
      }
      return new DragControls(targets, camera, listenerTarget);
    }
    if (variant === "firstPerson") {
      const controls = new FirstPersonControls(camera, listenerTarget);
      return controls;
    }

    if (variant === "fly") {
      const controls = new FlyControls(camera, listenerTarget);
      console.log("NEW CONTROLS");
      return controls;
    }

    if (variant === "map") {
      const controls = new MapControls(camera, listenerTarget);
      controls.enableDamping = true;
      return controls;
    }
    if (variant === "orbit") {
      return new OrbitControls(camera, listenerTarget);
    }
    if (variant === "pointerLock") {
      return new PointerLockControls(camera, listenerTarget);
    }
    if (variant === "trackball") {
      return new TrackballControls(camera, listenerTarget);
    }
    if (variant === "transform") {
      return new TransformControls(camera, listenerTarget);
    }
    throw new Error(`Control not implemented: ${variant}`);
  }, [camera, listenerTarget, scene, targetIds, variant]);

  useEffect(() => {
    console.log("Controls in place");
    scene.userData["controls"].push(threeControls);
    return () => {
      threeControls.dispose();
      scene.userData["controls"] = scene.userData["controls"].filter(
        (c: unknown) => c !== threeControls
      );
    };
  }, [scene.userData, threeControls]);
  return null;
}
