import * as THREE from "three";
import { ReactNode } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { BasicGameObject, GameObject, GameGroup, GameMesh } from "./types";
import { isGroup, isMesh } from "./guards";
import { buildChildren } from "./children";

interface Props extends BasicGameObject {
  gameGroup?: GameGroup;
  children?: ReactNode;
}
export const Group = ({ gameGroup, children }: Props) => {
  if (!gameGroup) {
    throw new Error(
      "Constructing groups from components is not yet implemented"
    );
  }
  return <>{buildChildren(gameGroup, children)}</>;
};

/* Parse the ThreeJS group object returned (eg from a gltf loader
 * and return a Gamehook group containing values needed to generate
 * those objects
 *
 * TODO: Currently handling children, but there are other attriubtes
 * that should be given attention, such as animations
 */
export const getGameGroupFromThreeGroup = (group: THREE.Group): GameGroup => {
  const children: GameObject[] = group.children.flatMap(
    (c: THREE.Object3D): GameObject[] => {
      console.log(c);
      if (isGroup(c)) return [getGameGroupFromThreeGroup(c)];
      if (isMesh(c)) return [getGameMeshFromThreeMesh(c)];
      return [];
    }
  );
  return {
    type: "group",
    id: generateUUID(),
    three: new THREE.Group(),
    children,
  };
};

export const getGameMeshFromThreeMesh = (mesh: THREE.Mesh): GameMesh => {
  console.log("Finally a mesh");
  console.log({ mesh });
  return {
    type: "mesh",
    id: generateUUID(),
    three: new THREE.Mesh(),
    position: mesh.position,
    geometry: mesh.geometry,
  };
};
