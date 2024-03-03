import { useEffect, useMemo } from "react";
import * as THREE from "three";
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
  const {
    dampingFactor,
    disabled,
    enableDamping,
    maxDistance,
    maxPolarAngle,
    minDistance,
    screenSpacePanning,
    targetId,
    targetIds,
    variant,
    zoomToCursor,
  } = props;
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
      return controls;
    }

    if (variant === "map") {
      let target: THREE.Vector3 | undefined;
      if (targetId) {
        scene.traverse((obj) => {
          if (obj.userData["id"] == targetId) {
            target = new THREE.Vector3(
              obj.position.x,
              obj.position.y,
              obj.position.z
            );
          }
        });
      }

      const controls = new MapControls(camera, listenerTarget);
      if (target) {
        controls.target = target;
      }
      if (dampingFactor !== undefined) {
        controls.dampingFactor = dampingFactor;
      }
      if (screenSpacePanning !== undefined) {
        controls.screenSpacePanning = screenSpacePanning;
      }
      if (enableDamping !== undefined) {
        controls.enableDamping = enableDamping;
      }
      if (maxDistance !== undefined) {
        controls.maxDistance = maxDistance;
      }
      if (minDistance !== undefined) {
        controls.minDistance = minDistance;
      }
      if (maxPolarAngle !== undefined) {
        controls.maxPolarAngle = maxPolarAngle;
      }
      controls.enableRotate = true;
      if (zoomToCursor !== undefined) {
        controls.zoomToCursor = zoomToCursor;
      }
      controls.enabled = disabled !== true;
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
  }, [
    camera,
    dampingFactor,
    enableDamping,
    maxDistance,
    minDistance,
    maxPolarAngle,
    listenerTarget,
    scene,
    screenSpacePanning,
    targetIds,
    variant,
    disabled,
    zoomToCursor,
  ]);

  useEffect(() => {
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
