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
import { hasDispose } from "./guards";

export function Controls(props: ControlsProps) {
  const {
    controls,
    minDistance,
    maxDistance,
    minZoom,
    maxZoom,
    minTargetRadius,
    maxTargetRadius,
    minPolarAngle,
    maxPolarAngle,
    minAzimuthAngle,
    maxAzimuthAngle,
    enableDamping,
    dampingFactor,
    enableZoom,
    zoomSpeed,
    zoomToCursor,
    enableRotate,
    rotateSpeed,
    enablePan,
    panSpeed,
    screenSpacePanning,
    keyPanSpeed,
    autoRotate,
    autoRotateSpeed,
    disabled,
    target,
    targetId,
    targetIds,
    variant,
  } = props;
  const { camera } = useCamera();
  const { canvas, scene } = useSceneDetails();

  const listenerTarget = canvas;

  const threeControls = useMemo(() => {
    if (controls) return controls;
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
      let targetVector: THREE.Vector3 | undefined;
      if (targetId) {
        scene.traverse((obj) => {
          if (obj.userData["id"] == targetId) {
            targetVector = new THREE.Vector3(
              obj.position.x,
              obj.position.y,
              obj.position.z
            );
          }
        });
        if (!targetVector) {
          const msg = `Gamehook error: Object with ${targetId} not found. No target set.`;
          console.error(msg);
        }
      } else if (target) {
        targetVector = new THREE.Vector3(...target);
      }

      const controls = new MapControls(camera, listenerTarget);
      if (targetVector) {
        controls.target = targetVector;
        controls.cursor = targetVector;
      } else {
        const emptyVector = new THREE.Vector3(0, 0, 0);
        controls.target = emptyVector;
        controls.cursor = emptyVector;
      }

      // Controls configuration
      controls.minDistance = minDistance ?? 0;
      controls.maxDistance = maxDistance ?? Infinity;
      controls.minZoom = minZoom ?? 0;
      controls.maxZoom = maxZoom ?? Infinity;
      controls.minTargetRadius = minTargetRadius ?? 0;
      controls.maxTargetRadius = maxTargetRadius ?? Infinity;
      controls.minPolarAngle = minPolarAngle ?? 0;
      controls.maxPolarAngle = maxPolarAngle ?? Infinity;
      controls.minAzimuthAngle = minAzimuthAngle ?? 0;
      controls.maxAzimuthAngle = maxAzimuthAngle ?? Infinity;
      controls.enableDamping = enableDamping ?? false;
      controls.dampingFactor = dampingFactor ?? 0.05;
      controls.enableZoom = enableZoom ?? true;
      controls.zoomSpeed = zoomSpeed ?? 1;
      controls.zoomToCursor = zoomToCursor ?? false;
      controls.enableRotate = enableRotate ?? true;
      controls.rotateSpeed = rotateSpeed ?? 1;
      controls.enablePan = enablePan ?? true;
      controls.panSpeed = panSpeed ?? 1;
      controls.screenSpacePanning = screenSpacePanning ?? true;
      controls.keyPanSpeed = keyPanSpeed ?? 7;
      controls.autoRotate = autoRotate ?? false;
      controls.autoRotateSpeed = autoRotateSpeed ?? 2;
      controls.enabled = disabled !== true;
      return controls;
    }
    if (variant === "orbit") {
      const controls = new OrbitControls(camera, listenerTarget);
      //
      // Controls configuration
      controls.minDistance = minDistance ?? 0;
      controls.maxDistance = maxDistance ?? Infinity;
      controls.minZoom = minZoom ?? 0;
      controls.maxZoom = maxZoom ?? Infinity;
      controls.minTargetRadius = minTargetRadius ?? 0;
      controls.maxTargetRadius = maxTargetRadius ?? Infinity;
      controls.minPolarAngle = minPolarAngle ?? 0;
      controls.maxPolarAngle = maxPolarAngle ?? Infinity;
      controls.minAzimuthAngle = minAzimuthAngle ?? 0;
      controls.maxAzimuthAngle = maxAzimuthAngle ?? Infinity;
      controls.enableDamping = enableDamping ?? false;
      controls.dampingFactor = dampingFactor ?? 0.05;
      controls.enableZoom = enableZoom ?? true;
      controls.zoomSpeed = zoomSpeed ?? 1;
      controls.zoomToCursor = zoomToCursor ?? false;
      controls.enableRotate = enableRotate ?? true;
      controls.rotateSpeed = rotateSpeed ?? 1;
      controls.enablePan = enablePan ?? true;
      controls.panSpeed = panSpeed ?? 1;
      controls.screenSpacePanning = screenSpacePanning ?? true;
      controls.keyPanSpeed = keyPanSpeed ?? 7;
      controls.autoRotate = autoRotate ?? false;
      controls.autoRotateSpeed = autoRotateSpeed ?? 2;
      controls.enabled = disabled !== true;
      return controls;
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
    autoRotate,
    autoRotateSpeed,
    camera,
    controls,
    dampingFactor,
    disabled,
    enableDamping,
    enablePan,
    enableRotate,
    enableZoom,
    keyPanSpeed,
    listenerTarget,
    maxAzimuthAngle,
    maxDistance,
    maxPolarAngle,
    maxTargetRadius,
    maxZoom,
    minAzimuthAngle,
    minDistance,
    minPolarAngle,
    minTargetRadius,
    minZoom,
    panSpeed,
    rotateSpeed,
    scene,
    screenSpacePanning,
    target,
    targetId,
    targetIds,
    variant,
    zoomSpeed,
    zoomToCursor,
  ]);

  useEffect(() => {
    scene.userData["controls"].push(threeControls);
    return () => {
      threeControls.dispose();
      if (hasDispose(threeControls)) {
        console.log("TEST");
      }
      scene.userData["controls"] = scene.userData["controls"].filter(
        (c: unknown) => c !== threeControls
      );
    };
  }, [scene.userData, threeControls]);
  return null;
}
