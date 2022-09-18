import * as THREE from "three";
import { useEffect, useMemo } from "react";
import { Mesh, MeshProps } from "./types";
import { generateUUID } from "three/src/math/MathUtils";

import { usePosition, usePhysics } from "../physics/hooks";
import { useAddToScene } from "../mount";
import { useContainer } from "../container";
import { useSyncProperties } from "../connection";

export function useMesh(props: MeshProps): Mesh {
  const {
    position,
    threeMesh,

    onClick,
    onKeyPress,
    onKeyUp,
    onKeyDown,
    onHoverEnter,
    onHoverLeave,

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
  usePosition(mesh, position);
  useSyncProperties(mesh, props);

  // Interaction
  useEffect(() => {
    mesh.onClick = onClick;
  }, [mesh, onClick]);
  useEffect(() => {
    mesh.onKeyPress = onKeyPress;
  }, [mesh, onKeyPress]);
  useEffect(() => {
    mesh.onKeyUp = onKeyUp;
  }, [mesh, onKeyUp]);
  useEffect(() => {
    mesh.onKeyDown = onKeyDown;
  }, [mesh, onKeyDown]);
  useEffect(() => {
    mesh.onHoverEnter = onHoverEnter;
  }, [mesh, onHoverEnter]);
  useEffect(() => {
    mesh.onHoverLeave = onHoverLeave;
  }, [mesh, onHoverLeave]);

  // Notation
  useEffect(() => {
    mesh.attrs = attrs;
    mesh.name = name;
    mesh.tags = tags;
  }, [mesh, attrs, name, tags]);
  useContainer(mesh.id, mesh.threeMesh, position);
  useAddToScene(mesh);
  return mesh;
}

// Create geometry for object

export function useGeometry(mesh: Mesh, geometry: THREE.BufferGeometry) {
  useEffect(() => {
    mesh.threeMesh.geometry = geometry;
  }, [mesh.threeMesh, geometry]);
}
