import * as THREE from "three";
import { useMemo, useEffect } from "react";

import { GameObject, GameObjectProps } from "./types";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";
import { generateUUID } from "three/src/math/MathUtils";

export const useMaterial = (
  gameObject: GameObject,
  { material }: GameObjectProps
) => {
  const _material = useMemo(() => {
    return createMaterial(material);
  }, [material]);
  const mesh = gameObject.three as THREE.Mesh;
  useEffect(() => {
    mesh.material = _material;
  }, [gameObject, _material, mesh]);
};

export const useGeometry = (
  gameObject: GameObject,
  { geometry }: GameObjectProps
) => {
  const _geometry = useMemo(() => {
    return createGeometry(geometry);
  }, [geometry]);
  const mesh = gameObject.three as THREE.Mesh;
  useEffect(() => {
    mesh.geometry = _geometry;
  }, [gameObject, mesh, _geometry]);
};

export const useLocation = (
  gameObject: GameObject,
  { position, orientation }: GameObjectProps
) => {
  const _orientation = useMemo(() => {
    return orientation;
  }, [orientation]);

  const _position = useMemo(() => {
    return position;
  }, [position]);

  useEffect(() => {
    if (!_orientation) return;
    gameObject.three.rotation.set(
      _orientation.x,
      _orientation.y,
      _orientation.z
    );
  }, [gameObject, _orientation]);

  useEffect(() => {
    const { x, y, z } = _position ?? { x: 0, y: 0, z: 0 };
    gameObject.three.position.set(x, y, z);
  }, [gameObject, _position]);
};

export const useParent = (
  gameObject: GameObject,
  { objParent }: GameObjectProps
) => {
  useEffect(() => {
    if (objParent && objParent.three !== gameObject.three.parent) {
      if (gameObject.three.parent) {
        gameObject.three.removeFromParent();
      }
      objParent.three.add(gameObject.three);
    }
    return () => {
      gameObject.three.removeFromParent();
    };
  }, [gameObject, objParent]);
};

export const useEventListeners = (
  gameObject: GameObject,
  { onClick }: GameObjectProps
) => {
  useEffect(() => {
    gameObject.onClick = onClick;
  }, [gameObject, onClick]);
};

export const useMount = (gameObject: GameObject) => {
  // Mount object to scene
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      _GAME.scene.addObjectToScene(gameObject);
    }
    return () => {
      mounted = false;
      _GAME.scene.removeObjectFromScene(gameObject);
    };
  }, [gameObject]);
};

export const useGameObject = (
  gameObject: GameObject,
  props: GameObjectProps
) => {
  useEventListeners(gameObject, props);
  useGeometry(gameObject, props);
  useLocation(gameObject, props);
  useMaterial(gameObject, props);
  useMount(gameObject);
  useParent(gameObject, props);

  // Return object for use in the component
  return gameObject;
};

export const useMesh = (props: GameObjectProps) => {
  const { rotation, velocity, acceleration } = props;
  const gameObject = useMemo<GameObject>(() => {
    return {
      id: generateUUID(),
      rotation,
      velocity,
      acceleration,
      three: new THREE.Mesh(),
    };
  }, [acceleration, rotation, velocity]);
  return useGameObject(gameObject, props);
};
