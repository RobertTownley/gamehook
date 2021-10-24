import * as THREE from "three";
import { useMemo, useEffect } from "react";

import { GameLight, GameLightProps, GameMesh, GameMeshProps } from "./types";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";
import { generateUUID } from "three/src/math/MathUtils";

type PropertyAwareTypes = GameMesh | GameLight;
type PropertyAwarePropTypes = GameMeshProps | GameLightProps;

export const useMaterial = (
  gameObject: GameMesh,
  { material }: GameMeshProps
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
  gameObject: GameMesh,
  { geometry }: GameMeshProps
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
  gameObject: PropertyAwareTypes,
  { position, orientation }: PropertyAwarePropTypes
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
  gameObject: GameMesh,
  { objParent }: GameMeshProps
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

export const useLightParent = (
  gameLight: GameLight,
  { objParent }: GameLightProps
) => {
  useEffect(() => {
    if (objParent && objParent.three !== gameLight.three.parent) {
      if (gameLight.three.parent) {
        gameLight.three.removeFromParent();
      }
      objParent.three.add(gameLight.three);
    }
    return () => {
      gameLight.three.removeFromParent();
    };
  }, [gameLight, objParent]);
};

export const useEventListeners = (
  gameObject: GameMesh,
  { onClick }: GameMeshProps
) => {
  useEffect(() => {
    gameObject.onClick = onClick;
  }, [gameObject, onClick]);
};

export const useMount = (gameObject: GameMesh) => {
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

export const useLightMount = (gameLight: GameLight) => {
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      _GAME.scene.addLightToScene(gameLight);
    }
    return () => {
      mounted = false;
      _GAME.scene.removeLightFromScene(gameLight);
    };
  }, [gameLight]);
};

export const useCollision = (
  gameObject: GameMesh,
  { collides, onCollision }: GameMeshProps
) => {
  useEffect(() => {
    gameObject.onCollision = onCollision;
  }, [gameObject, onCollision]);
  useEffect(() => {
    gameObject.collides = collides;
  }, [gameObject, collides]);
};

export const useGameMesh = (gameObject: GameMesh, props: GameMeshProps) => {
  useCollision(gameObject, props);
  useEventListeners(gameObject, props);
  useGeometry(gameObject, props);
  useLocation(gameObject, props);
  useMaterial(gameObject, props);
  useMount(gameObject);
  useParent(gameObject, props);

  // Return object for use in the component
  return gameObject;
};

export const useMesh = (props: GameMeshProps) => {
  const { rotation, velocity, acceleration } = props;
  const _velocity = useMemo(() => {
    return velocity;
  }, [velocity]);
  const gameObject = useMemo<GameMesh>(() => {
    return {
      type: "mesh",
      id: generateUUID(),
      rotation,
      velocity: _velocity,
      acceleration,
      three: new THREE.Mesh(),
    };
  }, [acceleration, rotation, _velocity]);
  return useGameMesh(gameObject, props);
};
