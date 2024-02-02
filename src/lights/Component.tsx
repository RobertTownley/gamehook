import { useMemo } from "react";
import * as THREE from "three";

import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { useLighting, useShadowMaps } from "./hooks";
import { useAddToScene } from "../scene/hooks";

import { LightProps } from "./types";
import { usePhysics } from "../physics/hooks";

export function Light(props: LightProps) {
  const {
    color,
    skyColor,
    groundColor,

    angle,
    penumbra,
    intensity,
    distance,
    decay,
    children,
    variant,
  } = props;

  const light = useMemo(() => {
    if (variant === "ambient") {
      return new THREE.AmbientLight(color, intensity);
    } else if (variant === "directional") {
      return new THREE.DirectionalLight(color, intensity);
    } else if (variant === "hemisphere") {
      return new THREE.HemisphereLight(skyColor, groundColor, intensity);
    } else if (variant === "point") {
      return new THREE.PointLight(color, intensity, distance, decay);
    } else if (variant === "spot") {
      return new THREE.SpotLight(
        color,
        intensity,
        distance,
        angle,
        penumbra,
        decay
      );
    } else {
      // Default
      return new THREE.AmbientLight();
    }
  }, [
    color,
    skyColor,
    groundColor,
    angle,
    penumbra,
    intensity,
    distance,
    decay,
    variant,
  ]);

  const parent = useHierarchy(light);
  useAddToScene({ obj: light, parent });
  useLighting(light, props);
  useShadowMaps(light, props);
  usePhysics(light, props);

  return (
    <HierarchyContext.Provider value={{ parent: light, animations: [] }}>
      {children}
    </HierarchyContext.Provider>
  );
}
