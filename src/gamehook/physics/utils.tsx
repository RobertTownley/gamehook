import { XYZ, XYZArray } from "./types";

export function normalizeXYZ(values: XYZ | undefined): XYZArray {
  if (!values) {
    return [0, 0, 0];
  }
  if (Array.isArray(values)) {
    return values;
  }
  return [values.x, values.y, values.z];
}
