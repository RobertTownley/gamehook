import * as THREE from "three";
export interface BoxGeometryOptions {
    width?: number;
    height?: number;
    depth?: number;
}
export interface BoxGeometryOptionType extends BoxGeometryOptions {
    type: "box";
}
export interface CircleGeometryOptions {
    radius: number;
    segments: number;
}
export interface CircleGeometryOptionType extends CircleGeometryOptions {
    type: "circle";
}
export interface CylinderGeometryOptions {
    radiusTop?: number;
    radiusBottom?: number;
    height?: number;
    radialSegments?: number;
    heightSegments?: number;
    openEnded?: boolean;
    thetaStart?: number;
    thetaLength?: number;
}
export interface CylinderGeometryOptionType extends CylinderGeometryOptions {
    type: "cylinder";
}
export interface PlaneGeometryOptions {
    width: number;
    height: number;
}
export interface PlaneGeometryOptionType extends PlaneGeometryOptions {
    type: "plane";
}
export interface SphereGeometryOptions {
    radius?: number;
    widthSegments?: number;
    heightSegments?: number;
}
export interface SphereGeometryOptionType extends SphereGeometryOptions {
    type: "sphere";
}
export declare type GeometryOptions = BoxGeometryOptionType | CircleGeometryOptionType | CylinderGeometryOptionType | PlaneGeometryOptionType | SphereGeometryOptionType | THREE.BufferGeometry;
export interface Shapeable {
    geometry?: GeometryOptions;
}
export declare const createGeometry: (opts?: GeometryOptions | undefined) => THREE.BufferGeometry;
