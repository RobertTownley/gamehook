import { useMemo } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

import { GameLight, GameLightProps } from "./types";
import { useLocation, useLightMount, useLightParent } from "./hooks";

type LightVariant = "ambient";
const useLight = (props: GameLightProps, variant: LightVariant) => {
  const { acceleration, rotation, velocity } = props;
  const light = useMemo<GameLight>(() => {
    const three = (() => {
      switch (variant) {
        case "ambient":
          return new THREE.AmbientLight();
      }
    })();

    const light: GameLight = {
      type: "light",
      id: generateUUID(),
      three,
      rotation,
      acceleration,
      velocity,
    };
    return light;
  }, [acceleration, rotation, variant, velocity]);

  useLocation(light, props);
  useLightMount(light);
  useLightParent(light, props);
  return light;
};

interface AmbientLightProps extends GameLightProps {
  variant: "ambient";
}

export const Light = (props: AmbientLightProps) => {
  useLight(props, props.variant);

  return <></>;
};
