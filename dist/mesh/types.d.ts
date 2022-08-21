import * as THREE from "three";
import { ReactNode } from "react";
import { Designable } from "../materials";
import { Physical } from "../physics";
import { Interactable } from "../interactions";
export interface Nameable {
    attrs?: object;
    name?: string;
    tags?: string[];
}
export interface Meshable extends Physical, Interactable, Designable, Nameable {
    children?: ReactNode;
    id?: string;
}
export interface AbstractMeshProps extends Meshable {
    threeMesh?: THREE.Mesh;
}
export interface AbstractMesh extends Meshable {
    children?: ReactNode;
    id: string;
    threeMesh: THREE.Mesh;
}
interface BoxParams {
    width?: number;
    depth?: number;
    height?: number;
    widthSegments?: number;
    heightSegments?: number;
    depthSegments?: number;
}
export interface BoxProps extends BoxParams, AbstractMeshProps {
}
export interface Box extends BoxParams, AbstractMesh {
}
interface PlaneParams {
    width?: number;
    height?: number;
    widthSegments?: number;
    heightSegments?: number;
}
export interface PlaneProps extends PlaneParams, AbstractMeshProps {
}
export interface Plane extends PlaneParams, AbstractMesh {
}
interface SphereParams {
    radius?: number;
    widthSegments?: number;
    heightSegments?: number;
    phiStart?: number;
    phiLength?: number;
    thetaStart?: number;
    thetaLength?: number;
}
export interface SphereProps extends SphereParams, AbstractMeshProps {
}
export interface Sphere extends SphereParams, AbstractMesh {
}
export declare type MeshProps = BoxProps | PlaneProps | SphereProps;
export declare type Mesh = Box | Plane | Sphere;
export {};
