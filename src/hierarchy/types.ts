import { ReactNode } from "react";
import * as THREE from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export interface Hierarchy {
  parent?: THREE.Object3D | GLTF;
}

export interface Hierarchical {
  children?: ReactNode;
}
