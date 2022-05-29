import * as THREE from "three";
interface BasicMaterialOptions {
    type: "basic";
    color?: number;
    wireframe?: boolean;
}
interface NormalMaterialOptions {
    type: "normal";
    wireframe?: boolean;
}
interface StandardMaterialOptions {
    color?: number;
    metalness?: number;
    type: "standard";
}
export declare type MaterialOptions = BasicMaterialOptions | NormalMaterialOptions | StandardMaterialOptions;
export interface Designable {
    material?: MaterialOptions;
}
export declare const createMaterial: (opts?: MaterialOptions | undefined) => THREE.Material;
export {};
