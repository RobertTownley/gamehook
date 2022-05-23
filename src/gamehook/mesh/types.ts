import * as THREE from "three";
import { ReactNode } from "react";
import { Designable } from "../materials";
import { Physical } from "../physics";
import { Interactable } from "../interactions";

export interface Meshable extends Physical, Interactable, Designable {}
export interface AbstractMeshProps extends Meshable {
  children?: ReactNode;
  id?: string;
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
}
export interface BoxProps extends BoxParams, AbstractMeshProps {}
export interface Box extends BoxParams, AbstractMesh {}

interface SphereParams {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
  phiStart?: number;
  phiLength?: number;
  thetaStart?: number;
  thetaLength?: number;
}
export interface SphereProps extends SphereParams, AbstractMeshProps {}
export interface Sphere extends SphereParams, AbstractMesh {}

export type MeshProps = BoxProps | SphereProps;
export type Mesh = Box | Sphere;
