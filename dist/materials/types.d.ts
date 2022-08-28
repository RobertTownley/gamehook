import * as THREE from "three";
export declare type MaterialType = "basic" | "normal" | "standard";
export interface TexturedMaterial {
    textures?: {
        alphaMap?: THREE.Texture | string;
        bumpMap?: THREE.Texture | string;
        colorMap?: THREE.Texture | string;
        normalMap?: THREE.Texture | string;
    };
}
export interface EmissiveMaterial {
    emissiveColor?: number;
    emissiveIntensity?: number;
}
interface BaseMaterial extends EmissiveMaterial, TexturedMaterial {
    opacity?: number;
    transparent?: boolean;
}
export interface BasicMaterialOptions extends BaseMaterial {
    type: "basic";
    color?: number;
    wireframe?: boolean;
}
export interface NormalMaterialOptions extends BaseMaterial {
    type: "normal";
    wireframe?: boolean;
}
export interface StandardMaterialOptions extends BaseMaterial {
    type: "standard";
    color?: number;
    metalness?: number;
}
export declare type MaterialOptions = BasicMaterialOptions | NormalMaterialOptions | StandardMaterialOptions;
export interface Designable {
    material?: MaterialOptions;
}
export {};
