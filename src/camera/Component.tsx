import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { usePhysics } from "../physics/hooks";

import {
  getDefaultCamera,
  DefaultCameraPosition,
  DefaultCameraType,
} from "./defaults";
import { CameraProps } from "./types";
import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { useCamera } from "./hooks";

export function Camera(props: CameraProps) {
  const {
    children,
    type = DefaultCameraType,
    fov,
    aspect,
    near,
    far,
    top,
    bottom,
    left,
    right,
  } = props;
  const { setCamera } = useCamera();

  const threeCamera = useMemo(() => {
    if (type === "perspective") {
      return new THREE.PerspectiveCamera(fov, aspect, near, far);
    } else {
      return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    }
  }, [type, left, right, top, bottom, aspect, far, fov, near]);

  useEffect(() => {
    threeCamera.position.set(...DefaultCameraPosition);
    setCamera(threeCamera);
    return () => {
      setCamera(getDefaultCamera());
    };
  }, [threeCamera, setCamera]);

  usePhysics(threeCamera, {
    position: [0, 0, 10], //props.position ?? DefaultCameraPosition,
    ...props,
  });

  useHierarchy(threeCamera);

  const value = useMemo(() => {
    return { parent: threeCamera };
  }, [threeCamera]);

  return (
    <HierarchyContext.Provider value={value}>
      {children}
    </HierarchyContext.Provider>
  );
}
