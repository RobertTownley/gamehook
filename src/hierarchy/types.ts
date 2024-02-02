import { ReactNode } from "react";
import * as THREE from "three";

export interface Hierarchy {
  animations: THREE.AnimationClip[];
  parent?: THREE.Object3D;
}

export interface Hierarchical {
  children?: ReactNode;
}
