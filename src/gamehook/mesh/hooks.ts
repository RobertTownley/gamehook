import * as THREE from "three";
import { useContext, useEffect, useLayoutEffect, useMemo } from "react";
import { Mesh, MeshProps } from "./types";
import { SceneContext } from "../scene/context";
import { generateUUID } from "three/src/math/MathUtils";
import { normalizeXYZ } from "../physics/utils";
import { usePosition } from "../physics/hooks";
import { HierarchyContext } from "../hierarchy";

// Add object to scene on mount, remove on dismount
export function useMesh(props: MeshProps): Mesh {
  const {
    acceleration,
    position,
    rotation,
    threeMesh,
    velocity,

    collides,
    collidesWith,
    onCollision,

    onClick,
    onKeypress,

    id,
    attrs,
    name,
    tags,

    children,
  } = props;

  const mesh = useMemo<Mesh>(() => {
    return {
      id: id ?? generateUUID(),
      threeMesh: threeMesh ?? new THREE.Mesh(),
      onClick,
    };
  }, [id, onClick, threeMesh]);

  // Physics
  useEffect(() => {
    mesh.acceleration = acceleration;
  }, [mesh, acceleration]);
  useEffect(() => {
    mesh.velocity = velocity;
  }, [mesh, velocity]);
  useEffect(() => {
    mesh.rotation = normalizeXYZ(rotation);
  }, [mesh, rotation]);
  useEffect(() => {
    mesh.onCollision = onCollision;
  }, [mesh, onCollision]);
  useEffect(() => {
    mesh.collides = collides;
    mesh.collidesWith = collidesWith;
  }, [mesh, collides, collidesWith]);
  usePosition(mesh, position);

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

  const hierarchy = useContext(HierarchyContext);
  const scene = useContext(SceneContext);
  useEffect(() => {
    if (!scene.meshes[mesh.id]) {
      scene.threeScene.add(mesh.threeMesh);
      scene.meshes[mesh.id] = mesh;
      if (hierarchy) {
        hierarchy.parent.add(mesh.threeMesh);
      }
    }
    return () => {
      delete scene.meshes[mesh.id];
      scene.threeScene.remove(mesh.threeMesh);
      mesh.threeMesh.removeFromParent();
    };
  }, [hierarchy, mesh, scene]);
  return mesh;
}

// Create geometry for object

export function useGeometry(mesh: Mesh, geometry: THREE.BufferGeometry) {
  useEffect(() => {
    mesh.threeMesh.geometry = geometry;
  }, [mesh.threeMesh, geometry]);
}
