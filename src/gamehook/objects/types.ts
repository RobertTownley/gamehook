import * as THREE from "three";

export interface GameObject {
  id: string;
  threeMesh: THREE.Mesh;
}
