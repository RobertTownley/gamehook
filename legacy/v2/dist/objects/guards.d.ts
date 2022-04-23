import * as THREE from "three";
import { GeometryOptions } from "./geometries";
export declare const isGroup: (three: THREE.Object3D) => three is THREE.Group;
export declare const isMesh: (three: THREE.Object3D) => three is THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>;
export declare const isBufferGeometry: (opt: GeometryOptions) => opt is THREE.BufferGeometry;
