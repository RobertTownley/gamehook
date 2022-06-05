import { GameLight, SpotLight } from "./types";

export function isSpotLight(light: GameLight): light is SpotLight {
  return light.type === "spot";
}
