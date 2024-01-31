import { useEffect, useMemo } from "react";
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
  const { camera, renderer, scene } = useSceneDetails();

  const threeControls = useMemo(() => {
    if (variant === "arcball") {
      return new ArcballControls(camera.current, renderer.domElement, scene);
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
      return new DragControls(targets, camera.current, renderer.domElement);
    }
    if (variant === "firstPerson") {
      const controls = new FirstPersonControls(
        camera.current,
        renderer.domElement
      );
      return controls;
    }

    if (variant === "fly") {
      const controls = new FlyControls(camera.current, renderer.domElement);
      return controls;
    }

    if (variant === "map") {
      const controls = new MapControls(camera.current, renderer.domElement);
      controls.enableDamping = true;
      return controls;
    }
    if (variant === "orbit") {
      return new OrbitControls(camera.current, renderer.domElement);
    }
    if (variant === "pointerLock") {
      return new PointerLockControls(camera.current, document.body);
    }
    if (variant === "trackball") {
      return new TrackballControls(camera.current, renderer.domElement);
    }
    if (variant === "transform") {
      return new TransformControls(camera.current, renderer.domElement);
    }
  }, [camera, renderer.domElement, scene, targetIds, variant]);

  useEffect(() => {
    scene.userData["controls"].push(threeControls);
    return () => {
      scene.userData["controls"] = scene.userData["controls"].filter(
        (c: unknown) => c !== threeControls
      );
    };
  }, [scene.userData, threeControls]);
  return null;
}
