import { useEffect } from "react";

import { buildChildren } from "./children";
import { MeshProps } from "./mesh";
import { createGeometry, SphereGeometryOptions } from "./geometries";
import { useMesh } from "./hooks";

interface Props extends MeshProps, SphereGeometryOptions {}

export const Sphere = (props: Props) => {
  const { children, heightSegments, widthSegments, radius } = props;
  const gameObject = useMesh(props);
  useEffect(() => {
    (gameObject.three as THREE.Mesh).geometry = createGeometry({
      type: "sphere",
      radius,
      widthSegments,
      heightSegments,
    });
  }, [gameObject, heightSegments, widthSegments, radius]);
  return <>{buildChildren(gameObject, children)}</>;
};
