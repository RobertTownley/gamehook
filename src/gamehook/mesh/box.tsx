import * as THREE from "three";
import { useMemo } from "react";

import { BoxProps } from "./types";
import { useGameObject, useGeometry, useMount } from "./hooks";
import { useMaterial } from "../materials/hooks";
import { usePosition } from "../physics/hooks";

export function Box(props: BoxProps) {
  const { children, width, height, depth } = props;
  const gameObj = useGameObject(props);
  useMount(gameObj);

  // Give geometry to mesh object
  const geometry = useMemo(() => {
    return new THREE.BoxGeometry(width, height, depth);
  }, [width, height, depth]);
  useGeometry(gameObj, geometry);

  // Give material to mesh object
  useMaterial(gameObj, props.material);

  // Physics
  usePosition(gameObj, props.position);

  return <>{children}</>;
}
