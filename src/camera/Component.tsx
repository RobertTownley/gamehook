import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { usePhysics } from "../physics/hooks";

import { getDefaultCamera, DefaultCameraType } from "./defaults";
import { CameraProps } from "./types";
import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { XYZ } from "src/physics/types";
import { useCamera } from "./hooks";

const DefaultCameraPosition: XYZ = [0, 0, 5];
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

  useEffect(() => {}, []);

  useEffect(() => {
    setCamera(threeCamera);
    return () => {
      setCamera(getDefaultCamera());
    };
  }, [threeCamera, setCamera]);

  usePhysics(threeCamera, {
    position: props.position ?? DefaultCameraPosition,
    ...props,
  });

  const parent = useHierarchy(threeCamera);
  const value = useMemo(() => {
    return { parent };
  }, [parent]);

  return (
    <HierarchyContext.Provider value={value}>
      {children}
    </HierarchyContext.Provider>
  );
}
