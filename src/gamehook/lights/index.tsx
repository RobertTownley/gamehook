import * as THREE from "three";
import { useContext, useEffect } from "react";
import { SceneContext } from "../scene/context";
import { generateUUID } from "three/src/math/MathUtils";
import { GameLight } from "./types";

export type { GameLight } from "./types";

interface AmbiantLightProps {
  type: "ambient";
}
interface DirectionalLightProps {
  type: "directional";
}
interface HemisphereLightProps {
  type: "hemisphere";
}

interface PointLightProps {
  type: "point";
}
interface RectAreaLightProps {
  type: "rectarea";
}
interface SpotLightProps {
  type: "spot";
}

type Props =
  | AmbiantLightProps
  | DirectionalLightProps
  | HemisphereLightProps
  | PointLightProps
  | RectAreaLightProps
  | SpotLightProps;

function useLight(props: Props): GameLight {
  switch (props.type) {
    case "ambient":
      return {
        id: generateUUID(),
        threeLight: new THREE.AmbientLight(0x404040),
      };
    default:
      throw new Error(`${props.type} not implemented`);
  }
}

export function Light(props: Props) {
  const light = useLight(props);
  const scene = useContext(SceneContext);
  useEffect(() => {
    scene.threeScene.add(light.threeLight);
  }, [light, scene]);
  return <></>;
}
