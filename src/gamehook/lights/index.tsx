import * as THREE from "three";
import { useLayoutEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { GameLight, GameLightProps } from "./types";
import { useLightPhysics } from "../physics/hooks";
import { normalizeXYZ } from "../physics/utils";
import { useAddLightToScene } from "../mount";

export type { GameLight } from "./types";

function useLight(props: GameLightProps): GameLight {
  const id = props.id ?? generateUUID();
  switch (props.type) {
    case "ambient":
      return {
        id,
        threeLight: new THREE.AmbientLight(props.color),
      };
    case "point":
      return {
        id,
        threeLight: new THREE.PointLight(
          props.color,
          props.intensity,
          props.distance,
          props.decay
        ),
      };
    case "spot":
      return {
        id,
        threeLight: new THREE.SpotLight(
          props.color,
          props.intensity,
          props.distance,
          props.angle,
          props.penumbra,
          props.decay
        ),
      };
    default:
      throw new Error(`${props.type} not implemented`);
  }
}

export function Light(props: GameLightProps) {
  const { position } = props;
  const light = useLight(props);
  useLightPhysics(light, props);

  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  useLayoutEffect(() => {
    light.threeLight.position.set(x, y, z);
  }, [light, x, y, z]);
  useAddLightToScene(light);
  return <></>;
}
