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
  const threeLight = (() => {
    switch (props.type) {
      case "ambient":
        return new THREE.AmbientLight(props.color);
      case "directional":
        return new THREE.DirectionalLight(props.color, props.intensity);
      case "hemisphere":
        return new THREE.HemisphereLight(
          props.skyColor,
          props.groundColor,
          props.intensity
        );
      case "point":
        return new THREE.PointLight(
          props.color,
          props.intensity,
          props.distance,
          props.decay
        );
      case "rectarea":
        return new THREE.RectAreaLight(
          props.color,
          props.intensity,
          props.width,
          props.height
        );
      case "spot":
        return new THREE.SpotLight(
          props.color,
          props.intensity,
          props.distance,
          props.angle,
          props.penumbra,
          props.decay
        );
    }
  })();
  return {
    threeLight,
    id,
  };
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
