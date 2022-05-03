import * as THREE from "three";
import { useContext, useMemo } from "react";

import { SphereProps } from "./types";
import { SceneContext } from "../scene/context";
import { useGameObject, useGeometry, useMount } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { usePosition } from "../physics/hooks";

export function Sphere(props: SphereProps) {
  const { children, radius } = props;
  const scene = useContext(SceneContext);
  const gameObj = useGameObject(props);
  useMount(gameObj, scene);

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
