import * as THREE from "three";
import { useContext, useEffect } from "react";
import { SceneContext } from "../scene/context";
import { generateUUID } from "three/src/math/MathUtils";
import { GameLight } from "./types";

export type { GameLight } from "./types";

interface AbstractLight {
  color?: number;
}

interface AmbiantLightProps extends AbstractLight {
  type: "ambient";
}
interface DirectionalLightProps extends AbstractLight {
  type: "directional";
}
interface HemisphereLightProps extends AbstractLight {
  type: "hemisphere";
}

interface PointLightProps extends AbstractLight {
  type: "point";
}
interface RectAreaLightProps extends AbstractLight {
  type: "rectarea";
}
interface SpotLightProps extends AbstractLight {
  type: "spot";
}

type Props =
  | AmbiantLightProps
  | DirectionalLightProps
  | HemisphereLightProps
  | PointLightProps
  | RectAreaLightProps
  | SpotLightProps;

const DefaultColor = 0xffffff;

function useLight(props: Props): GameLight {
  switch (props.type) {
    case "ambient":
      return {
        id: generateUUID(),
        threeLight: new THREE.AmbientLight(props.color ?? DefaultColor),
      };
    default:
      throw new Error(`${props.type} not implemented`);
  }
}

export function Light(props: Props) {
  const light = useLight(props);
  const scene = useContext(SceneContext);
  useEffect(() => {
    light.threeLight.position.set(0, 0, 2);
    scene.threeScene.add(light.threeLight);
  }, [light, scene]);
  return <></>;
}
