import * as THREE from "three";
import { GeometryOptions } from "./geometries";

export const isGroup = (three: THREE.Object3D): three is THREE.Group => {
  return three.type === "Group";
};
export const isMesh = (three: THREE.Object3D): three is THREE.Mesh => {
  return three.type === "Mesh";
};

export const isBufferGeometry = (
  opt: GeometryOptions
): opt is THREE.BufferGeometry => {
  return opt.type === "BufferGeometry";
};
