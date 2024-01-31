import { useEffect, useMemo } from "react";
import { useSceneDetails } from "../scene/hooks";
import * as THREE from "three";

import { usePhysics } from "../physics/hooks";

import { getDefaultCamera, DefaultCameraType } from "./defaults";
import { CameraProps } from "./types";
import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { XYZ } from "src/physics/types";

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
  const { camera } = useSceneDetails();

  const threeCamera = useMemo(() => {
    if (type === "perspective") {
      return new THREE.PerspectiveCamera(fov, aspect, near, far);
    } else {
      return new THREE.OrthographicCamera(left, right, top, bottom, near, far);
    }
  }, [type, left, right, top, bottom, aspect, far, fov, near]);

  useEffect(() => {}, []);

  useEffect(() => {
    camera.current = threeCamera;
    return () => {
      camera.current = getDefaultCamera();
    };
  }, [camera, threeCamera]);

  usePhysics(camera.current, {
    position: props.position ?? DefaultCameraPosition,
    ...props,
  });

  const parent = useHierarchy(camera.current);
  const value = useMemo(() => {
    return { parent };
  }, [parent]);

  return (
    <HierarchyContext.Provider value={value}>
      {children}
    </HierarchyContext.Provider>
  );
}