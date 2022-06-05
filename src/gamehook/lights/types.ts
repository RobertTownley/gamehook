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
  intensity?: number;
}
interface DirectionalLightProps extends AbstractLightProps {
  type: "directional";
  intensity?: number;
}
interface HemisphereLightProps extends AbstractLightProps {
  type: "hemisphere";
  skyColor?: number;
  groundColor?: number;
  intensity?: number;
}

interface PointLightProps extends AbstractLightProps {
  type: "point";
  intensity?: number;
  distance?: number;
  decay?: number;
}
interface RectAreaLightProps extends AbstractLightProps {
  type: "rectarea";
  intensity?: number;
  width?: number;
  height?: number;
}
interface SpotLightProps extends AbstractLightProps {
  type: "spot";
  intensity?: number;
  distance?: number;
  angle?: number;
  penumbra?: number;
  decay?: number;
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
