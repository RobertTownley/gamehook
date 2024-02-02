import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { usePhysics } from "../physics/hooks";

import {
  getDefaultCamera,
  DefaultCameraType,
  DefaultCameraPosition,
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
    position = DefaultCameraPosition,
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
    setCamera(threeCamera);
    return () => {
      setCamera(getDefaultCamera());
    };
  }, [threeCamera, setCamera]);

  usePhysics(threeCamera, {
    position,
    ...props,
  });

  useHierarchy(threeCamera);

  return (
    <HierarchyContext.Provider value={{ parent: threeCamera, animations: [] }}>
      {children}
    </HierarchyContext.Provider>
  );
}
