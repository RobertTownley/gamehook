import { ArcballControls } from "three/examples/jsm/Addons";
import { ThreeControls, TypeWithDispose } from "./types";

export function hasDispose(
  controls: ThreeControls
): controls is TypeWithDispose {
  return !(controls instanceof ArcballControls);
}
