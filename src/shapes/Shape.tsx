import { useMemo } from "react";

import { ShapeProps } from "./types";
import { useGeometry } from "../geometry/hooks";
import { useHierarchy } from "../hierarchy/hooks";
import { useMaterial } from "../materials/hooks";
import { useAddToScene } from "../scene/hooks";
import { useMesh } from "./hooks";
import { HierarchyContext } from "../hierarchy/context";
import { usePhysics } from "../physics/hooks";

export function Shape(props: ShapeProps) {
  const { children, geometry, material } = props;
  const threeGeometry = useGeometry(geometry);
  const threeMaterial = useMaterial(material);
  const obj = useMesh(threeGeometry, threeMaterial);

  const parent = useHierarchy(obj);
  useAddToScene({ obj, parent });
  usePhysics(obj, props);

  const value = useMemo(() => {
    return { parent: obj };
  }, [obj]);

  return (
    <HierarchyContext.Provider value={value}>
      {children}
    </HierarchyContext.Provider>
  );
}
