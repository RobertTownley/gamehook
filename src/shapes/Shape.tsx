import { ShapeProps } from "./types";

import { useGeometry } from "../geometry/hooks";
import { useHierarchy } from "../hierarchy/hooks";
import { useMaterial } from "../materials/hooks";
import { useAddToScene } from "../scene/hooks";
import { useMesh } from "./hooks";
import { HierarchyContext } from "../hierarchy/context";

export function Shape({ children, geometry, material }: ShapeProps) {
  const threeGeometry = useGeometry(geometry);
  const threeMaterial = useMaterial(material);
  const obj = useMesh(threeGeometry, threeMaterial);

  const parent = useHierarchy(obj);
  useAddToScene({ obj, parent });

  return (
    <HierarchyContext.Provider value={{ parent: obj }}>
      {children}
    </HierarchyContext.Provider>
  );
}
