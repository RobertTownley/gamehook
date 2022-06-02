import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { Mesh, MeshProps } from "./types";
import { generateUUID } from "three/src/math/MathUtils";
import { usePosition, usePhysics } from "../physics/hooks";
import { useAddToScene } from "../mount";

// Add object to scene on mount, remove on dismount
export function useMesh(props: MeshProps): Mesh {
  const {
    position,
    threeMesh,
    computeOffset,

    onClick,
    onKeypress,

    id,
    attrs,
    name,
    tags,
  } = props;

  const mesh = useMemo<Mesh>(() => {
    return {
      id: id ?? generateUUID(),
      threeMesh: threeMesh ?? new THREE.Mesh(),
    };
  }, [id, threeMesh]);

  usePhysics(mesh, props);
  usePosition(mesh, position, computeOffset);

  // Interaction
  useEffect(() => {
    mesh.onClick = onClick;
  }, [mesh, onClick]);
  useEffect(() => {
    mesh.onKeypress = onKeypress;
  }, [mesh, onKeypress]);

  // Notation
  useEffect(() => {
    mesh.attrs = attrs;
    mesh.name = name;
    mesh.tags = tags;
  }, [mesh, attrs, name, tags]);
  useAddToScene(mesh);
  return mesh;
}

// Create geometry for object

export function useGeometry(mesh: Mesh, geometry: THREE.BufferGeometry) {
  useEffect(() => {
    mesh.threeMesh.geometry = geometry;
  }, [mesh.threeMesh, geometry]);
}
