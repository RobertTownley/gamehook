import * as THREE from "three";
import { Mesh, MeshProps } from "./types";
export declare function useMesh(props: MeshProps): Mesh;
export declare function useGeometry(mesh: Mesh, geometry: THREE.BufferGeometry): void;
