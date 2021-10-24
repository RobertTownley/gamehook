import { useEffect } from "react";

import { buildChildren } from "./children";
import { MeshProps } from "./mesh";
import { createGeometry, BoxGeometryOptions } from "./geometries";
import { useMesh } from "./hooks";

interface Props extends MeshProps, BoxGeometryOptions {}

export const Box = (props: Props) => {
  const { width, height, depth, children } = props;
  console.log(props.collides);
  const gameObject = useMesh(props);
  useEffect(() => {
    (gameObject.three as THREE.Mesh).geometry = createGeometry({
      type: "box",
      width,
      height,
      depth,
    });
  }, [gameObject, width, height, depth]);
  return <>{buildChildren(gameObject, children)}</>;
};
