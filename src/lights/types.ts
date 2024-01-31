import { Hierarchical } from "../hierarchy/types";
import { Physical } from "../physics/types";

export interface LightProps extends Physical, Hierarchical {
  type?: "directional" | "point" | "spot" | "hemisphere" | "ambient";

  color?: number;
  intensity?: number;
  distance?: number;
  decay?: number;
  castShadow?: boolean;

  // Directional Light
  targetId?: string; // TODO: make this point at the object

  // Spot light
  angle?: number;
  penumbra?: number;

  // Hemisphere
  skyColor?: number;
  groundColor?: number;
}

export interface Lightable {
  castShadow?: boolean;
  receiveShadow?: boolean;
}
