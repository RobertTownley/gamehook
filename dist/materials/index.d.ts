import * as THREE from "three";
import { MaterialOptions } from "./types";
export type { Designable } from "./types";
export declare function createMaterial(options?: MaterialOptions, useCache?: boolean): THREE.Material;
