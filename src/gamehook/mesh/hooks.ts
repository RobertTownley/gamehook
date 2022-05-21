import * as THREE from "three";
import { useContext, useEffect, useMemo } from "react";
import { Mesh, MeshProps } from "./types";
import { SceneContext } from "../scene/context";
import { generateUUID } from "three/src/math/MathUtils";

// Add object to scene on mount, remove on dismount
export function useMesh(props: MeshProps): Mesh {
  const { id, threeMesh, onClick } = props;

  const mesh = useMemo<Mesh>(() => {
    return {
      id: id ?? generateUUID(),
      threeMesh: threeMesh ?? new THREE.Mesh(),
      onClick,
    };
  }, [id, onClick, threeMesh]);

  const scene = useContext(SceneContext);
  useEffect(() => {
    if (!scene.meshes[mesh.id]) {
      scene.threeScene.add(mesh.threeMesh);
      scene.meshes[mesh.id] = mesh;
    }
    return () => {
      delete scene.meshes[mesh.id];
      scene.threeScene.remove(mesh.threeMesh);
    };
  }, [mesh, scene]);
  return mesh;
}

// Create geometry for object

export function useGeometry(mesh: Mesh, geometry: THREE.BufferGeometry) {
  useEffect(() => {
    mesh.threeMesh.geometry = geometry;
  }, [mesh.threeMesh, geometry]);
}
