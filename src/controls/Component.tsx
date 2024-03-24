import { useEffect, useMemo, useState } from "react";
import { useCamera } from "../camera/hooks";
import { MapControls as ThreeMapControls } from "three/examples/jsm/controls/MapControls";
import {
  ArcballControls,
  FirstPersonControls,
  FlyControls,
  OrbitControls,
  PointerLockControls,
  TrackballControls,
  TransformControls,
} from "three/examples/jsm/Addons";

import { useSceneDetails } from "../scene/hooks";
import { ControlsProps } from "./types";
import { useRender } from "../render/hooks";

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
      throw new Error("Gamehook: Not Implemented");
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
      const controls = new ThreeMapControls(camera, listenerTarget);

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
    variant,
    zoomSpeed,
    zoomToCursor,
  ]);

  useEffect(() => {
    scene.userData["controls"].push(threeControls);
    return () => {
      threeControls.dispose();
      scene.userData["controls"] = undefined;
    };
  }, [scene.userData, threeControls]);
  return null;
}

/* Temporarily separating out map controls while figuring out what's wrong with all controls */
interface IMapControls {
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  minDistance?: number;
  maxDistance?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minTargetRadius?: number;
  maxTargetRadius?: number;
  zoomToCursor?: boolean;
}
export function MapControls(props: IMapControls) {
  const [controls, setControls] = useState<ThreeMapControls | undefined>(
    undefined
  );
  const {
    minAzimuthAngle,
    maxAzimuthAngle,
    minDistance,
    maxDistance,
    minTargetRadius,
    maxTargetRadius,
    minPolarAngle,
    maxPolarAngle,
    zoomToCursor,
  } = props;
  const { camera } = useCamera();
  const { renderer } = useRender();
  const { scene } = useSceneDetails();

  useEffect(() => {
    const controls = new ThreeMapControls(camera, renderer.domElement);
    camera.userData["controls"] = controls;
    scene.userData["controls"] = controls;
    controls.update();
    setControls(controls);

    return () => {
      controls.dispose();
      camera.userData["controls"] = undefined;
      scene.userData["controls"] = undefined;
    };
  }, [camera, renderer.domElement, scene.userData]);

  useEffect(() => {
    if (controls) {
      controls.enableDamping = true;
      controls.minDistance = minDistance ?? 0;
      controls.maxDistance = maxDistance ?? Infinity;
      controls.minPolarAngle = minPolarAngle ?? 0;
      controls.maxPolarAngle = maxPolarAngle ?? Math.PI;
      controls.zoomToCursor = zoomToCursor ?? false;
      controls.minTargetRadius = minTargetRadius ?? 0;
      controls.maxTargetRadius = maxTargetRadius ?? Infinity;
      controls.minAzimuthAngle = minAzimuthAngle ?? 0;
      controls.maxAzimuthAngle = maxAzimuthAngle ?? Math.PI;
    }
  }, [
    controls,
    minAzimuthAngle,
    maxAzimuthAngle,
    minDistance,
    minTargetRadius,
    maxTargetRadius,
    maxDistance,
    minPolarAngle,
    maxPolarAngle,
    zoomToCursor,
  ]);

  return null;
}
