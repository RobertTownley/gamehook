import * as THREE from "three";
import { useContext, useEffect, useLayoutEffect, useMemo } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { GameLight, GameLightProps } from "./types";
import { useLightPhysics } from "../physics/hooks";
import { normalizeXYZ } from "../physics/utils";
import { useAddLightToScene } from "../mount";
import { isSpotLight } from "./guards";
import { SceneContext } from "../scene/context";

export type { GameLight } from "./types";

function useLight(props: GameLightProps): GameLight {
  const id = props.id ?? generateUUID();
  const castsShadow = props.castsShadow ?? false;

  switch (props.type) {
    case "ambient":
      return {
        id,
        threeLight: new THREE.AmbientLight(props.color),
        castsShadow,
        ...props,
      };
    case "directional":
      return {
        id,
        threeLight: new THREE.DirectionalLight(props.color, props.intensity),
        castsShadow,
        ...props,
      };
    case "hemisphere":
      return {
        id,
        threeLight: new THREE.HemisphereLight(
          props.skyColor,
          props.groundColor,
          props.intensity
        ),
        castsShadow,
        ...props,
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
        castsShadow,
        ...props,
      };
    case "rectarea":
      return {
        id,
        threeLight: new THREE.RectAreaLight(
          props.color,
          props.intensity,
          props.width,
          props.height
        ),
        castsShadow,
        ...props,
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
        castsShadow,
        ...props,
      };
  }
}

export function Light(props: GameLightProps) {
  const { castsShadow = false, position } = props;
  const light = useLight(props);
  const scene = useContext(SceneContext);

  // Track SpotLight to target
  let matchingTarget: THREE.Object3D | undefined = undefined;
  if (isSpotLight(light) && light.target) {
    const matchingLight = scene.lights[light.target];
    const matchingMesh = scene.meshes[light.target];
    if (matchingMesh) {
      matchingTarget = matchingMesh.threeMesh;
    } else if (matchingLight) {
      matchingTarget = matchingLight.threeLight;
    }
  }

  useEffect(() => {
    if (isSpotLight(light) && matchingTarget) {
      light.threeLight.target = matchingTarget;
    }
  }, [light, matchingTarget]);
  useEffect(() => {
    light.castsShadow = castsShadow;
    light.threeLight.castShadow = castsShadow;
  }, [light, castsShadow]);
  useLightPhysics(light, props);

  const [x, y, z] = useMemo(() => normalizeXYZ(position), [position]);
  useLayoutEffect(() => {
    light.threeLight.position.set(x, y, z);
  }, [light, x, y, z]);
  useAddLightToScene(light);
  return <></>;
}
