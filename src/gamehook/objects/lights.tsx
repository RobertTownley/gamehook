import { useMemo } from "react";
import * as THREE from "three";
import { generateUUID } from "three/src/math/MathUtils";

import { GameMesh, GameMeshProps } from "./types";
import {
  useEventListeners,
  useGeometry,
  useLocation,
  useMaterial,
  useMount,
  useParent,
} from "./hooks";

interface LightProps extends GameMeshProps {}
interface LightObject extends GameMesh {}

type LightVariant = "ambient";
const useLight = (props: LightProps, variant: LightVariant) => {
  const { acceleration, rotation, velocity } = props;
  const light = useMemo<LightObject>(() => {
    const three = (() => {
      switch (variant) {
        case "ambient":
          return new THREE.AmbientLight();
      }
    })();

    const light: LightObject = {
      type: "mesh",
      id: generateUUID(),
      three,
      rotation,
      acceleration,
      velocity,
    };
    return light;
  }, [acceleration, rotation, variant, velocity]);

  useEventListeners(light, props);
  useGeometry(light, props);
  useLocation(light, props);
  useMaterial(light, props);
  useMount(light);
  useParent(light, props);
  return light;
};

interface AmbientLightProps extends LightProps {
  variant: "ambient";
}

export const Light = (props: AmbientLightProps) => {
  useLight(props, props.variant);

  return <></>;
};
