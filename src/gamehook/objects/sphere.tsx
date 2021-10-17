import { useEffect } from "react";

import { buildChildren, MeshProps, useMesh, useGameObject } from "./mesh";
import { createGeometry, SphereGeometryOptions } from "./geometries";

interface Props extends MeshProps, SphereGeometryOptions {}

export const Sphere = (props: Props) => {
  const { children, heightSegments, widthSegments, radius } = props;
  const gameObject = useGameObject(props);
  useMesh({ gameObject, ...props });
  useEffect(() => {
    gameObject.three.geometry = createGeometry({
      type: "sphere",
      radius,
      widthSegments,
      heightSegments,
    });
  }, [gameObject, heightSegments, widthSegments, radius]);
  return <>{buildChildren(gameObject, children)}</>;
};
