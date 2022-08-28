import * as THREE from "three";
import { MaterialOptions, StandardMaterialOptions } from "./types";
export type { Designable } from "./types";
export declare function createStandardMaterial(options: StandardMaterialOptions): THREE.MeshStandardMaterial;
export declare function createMaterial(options?: MaterialOptions, useCache?: boolean): THREE.Material;
