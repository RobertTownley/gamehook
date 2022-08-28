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
  const boundingBox = useMemo(() => {
    const box = new THREE.Box3();
    Object.values(meshes).forEach((mesh) => {
      const newObject = mesh.threeMesh.clone();
      newObject.position.set(...normalizeXYZ(mesh.position));
      box.expandByObject(newObject);
    });
    return box;
  }, [meshes]);

  const containerId = useMemo(() => {
    return id ?? generateUUID();
  }, [id]);

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

  const position: XYZ = useMemo(() => {
    const positions = Object.values(meshes).map((m) =>
      normalizeXYZ(m.position)
    );
    return [
      _.mean(positions.map((p) => p[0])),
      _.mean(positions.map((p) => p[1])),
      _.mean(positions.map((p) => p[2])),
    ];
  }, [meshes]);

  const { width, height, depth } = (() => {
    const { max, min } = boundingBox;
    return {
      width: max.x - min.x,
      height: max.y - min.y,
      depth: max.z - min.z,
    };
  })();

  const value = { addChild, removeChild, containerId };

  const passThroughProps = ["onClick", "onHoverEnter", "onHoverLeave"];

  return (
    <ContainerContext.Provider value={value}>
      <Box
        {..._.pick(props, passThroughProps)}
        material={{
          opacity: 0,
          transparent: true,
          type: "basic",
        }}
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
