import * as THREE from "three";
import { Mesh } from "../mesh/types";
import { MaterialOptions } from "./types";
export declare function useMaterial(mesh: Mesh, materialOptions: THREE.Material | MaterialOptions | undefined): void;
