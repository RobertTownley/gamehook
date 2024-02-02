import * as THREE from "three";
import { GLTF } from "three/examples/jsm/Addons";

export function isGLTF(obj: THREE.Object3D | GLTF): obj is GLTF {
  return obj instanceof THREE.Object3D !== true;
}
