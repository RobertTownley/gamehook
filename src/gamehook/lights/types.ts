import * as THREE from "three";
import { Physical } from "../physics";

interface AbstractLightProps extends Physical {
  color?: number;
  id?: string;
}
interface AbstractLight extends Physical {
  id: string;
}

interface AmbiantLightProps extends AbstractLightProps {
  type: "ambient";
}
interface DirectionalLightProps extends AbstractLightProps {
  type: "directional";
}
interface HemisphereLightProps extends AbstractLightProps {
  type: "hemisphere";
}

interface PointLightProps extends AbstractLightProps {
  type: "point";
  intensity?: number;
  distance?: number;
  decay?: number;
}
interface RectAreaLightProps extends AbstractLightProps {
  type: "rectarea";
}
interface SpotLightProps extends AbstractLightProps {
  type: "spot";
}

export type GameLightProps =
  | AmbiantLightProps
  | DirectionalLightProps
  | HemisphereLightProps
  | PointLightProps
  | RectAreaLightProps
  | SpotLightProps;

export interface GameLight extends AbstractLight {
  threeLight: THREE.Light;
}
