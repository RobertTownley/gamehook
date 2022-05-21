import * as THREE from "three";
import { useMemo } from "react";

import { SphereProps } from "./types";
import { useGameObject, useGeometry, useMount } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { usePosition } from "../physics/hooks";

export function Sphere(props: SphereProps) {
  const { children, radius } = props;
  const gameObj = useGameObject(props);
  useMount(gameObj);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.SphereGeometry(radius);
  }, [radius]);
  useGeometry(gameObj, geometry);

  // Give material to mesh object
  useMaterial(gameObj, props.material);

  // Physics
  usePosition(gameObj, props.position);

  return <>{children}</>;
}
