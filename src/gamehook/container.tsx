import * as THREE from "three";
import _ from "lodash";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { generateUUID } from "three/src/math/MathUtils";
import { Box } from "./mesh/box";
import { XYZ } from "./physics/types";
import { normalizeXYZ } from "./physics/utils";
import { Interactable } from "./interactions";
import { createMaterial } from "./materials";

interface Props extends Interactable {
  children: ReactNode;
  id?: string;
}

type AddFunction = (id: string, threeMesh: THREE.Mesh, position: XYZ) => void;
type RemoveFunction = (id: string) => void;

type ContainerContextValue = {
  addChild: AddFunction;
  removeChild: RemoveFunction;
  containerId: string;
};
const ContainerContext = createContext<ContainerContextValue>({
  addChild: (_id, _bounds, _position) => ({}),
  removeChild: (_id) => ({}),
  containerId: "",
});

export function useContainer(
  id: string,
  threeMesh: THREE.Mesh,
  position?: XYZ
) {
  const { addChild, containerId, removeChild } = useContext(ContainerContext);

  useEffect(() => {
    if (containerId !== id) {
      addChild(id, threeMesh, normalizeXYZ(position));
      return () => {
        removeChild(id);
      };
    }
  }, [addChild, containerId, removeChild, id, threeMesh, position]);
}

interface BoundDetails {
  threeMesh: THREE.Mesh;
  position: XYZ;
}
export function Container(props: Props) {
  const { children, id } = props;
  const [meshes, setMeshes] = useState<Record<string, BoundDetails>>({});
  const containerId = useMemo(() => {
    return id ?? generateUUID();
  }, [id]);

  const [boundingBox, position] = useMemo(() => {
    const box = new THREE.Box3();
    const group = new THREE.Group();

    Object.values(meshes).forEach((mesh) => {
      box.expandByObject(mesh.threeMesh);
      group.add(mesh.threeMesh.clone());
    });

    const position = new THREE.Box3()
      .setFromObject(group)
      .getCenter(group.position);
    return [box, position];
  }, [meshes]);

  const addChild = useCallback(
    (id: string, threeMesh: THREE.Mesh, position: XYZ) => {
      setMeshes((prev) => ({
        ...prev,
        [id]: {
          threeMesh,
          position,
        },
      }));
    },
    []
  );
  const removeChild = useCallback((id: string) => {
    setMeshes((prev) => _.omit(prev, id));
  }, []);

  const { width, height, depth } = (() => {
    const { max, min } = boundingBox;
    return {
      width: max.x - min.x,
      height: max.y - min.y,
      depth: max.z - min.z,
    };
  })();

  const value = { addChild, removeChild, containerId };
  const material = useMemo(() => {
    return createMaterial({
      opacity: 0,
      transparent: true,
      type: "basic",
    });
  }, []);

  return (
    <ContainerContext.Provider value={value}>
      <Box
        onClick={props.onClick}
        onHoverEnter={props.onHoverEnter}
        onHoverLeave={props.onHoverLeave}
        material={material}
        width={width}
        height={height}
        depth={depth}
        position={position}
        id={containerId}
      />
      {children}
    </ContainerContext.Provider>
  );
}
