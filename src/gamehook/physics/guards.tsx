import { XYZ, XYZArray } from "./types";

export function isXYZArray(xyz: XYZ): xyz is XYZArray {
  return Array.isArray(xyz);
}
