import * as THREE from "three";
import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useEffect,
  useMemo,
} from "react";
import { generateUUID } from "three/src/math/MathUtils";

import { BasicMeshType, GameObject } from "./types";
import { createGeometry } from "./geometries";
import { createMaterial } from "./materials";

export interface MeshProps extends BasicMeshType {
  children?: ReactNode;
  objParent?: GameObject;
}

export const useGameObject = ({ rotation }: Partial<GameObject>) => {
  return useMemo<GameObject>(() => {
    return {
      id: generateUUID(),
      rotation,
      three: new THREE.Mesh(),
    };
  }, [rotation]);
};

interface UseMeshProps extends MeshProps {
  gameObject: GameObject;
}
export const useMesh = (props: UseMeshProps) => {
  const { gameObject, objParent, material, geometry, orientation, position } =
    props;
  const _material = useMemo(() => {
    return createMaterial(material);
  }, [material]);
  const _geometry = useMemo(() => {
    return createGeometry(geometry);
  }, [geometry]);
  const _orientation = useMemo(() => {
    return orientation;
  }, [orientation]);
  const _position = useMemo(() => {
    return position;
  }, [position]);

  useEffect(() => {
    gameObject.three.material = _material;
  }, [gameObject, _material]);
  useEffect(() => {
    gameObject.three.geometry = _geometry;
  }, [gameObject, _geometry]);
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

  // Children
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

export const Mesh = (props: MeshProps) => {
  const { children } = props;
  const gameObject = useGameObject(props);
  useMesh({ gameObject, ...props });

  // TODO: Observe other things like collisions, position, and clicks
  return <>{buildChildren(gameObject, children)}</>;
};

export const buildChildren = (gameObject: GameObject, children?: ReactNode) => {
  return Children.map(children, (child) => {
    return isValidElement(child)
      ? cloneElement(child, { objParent: gameObject })
      : null;
  });
};
