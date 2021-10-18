import { useEffect } from "react";

import { buildChildren, MeshProps, useGameObject } from "./mesh";
import { createGeometry, BoxGeometryOptions } from "./geometries";

interface Props extends MeshProps, BoxGeometryOptions {}

export const Box = (props: Props) => {
  const { width, height, depth, children } = props;
  const gameObject = useGameObject(props);
  useEffect(() => {
    gameObject.three.geometry = createGeometry({
      type: "box",
      width,
      height,
      depth,
    });
  }, [gameObject, width, height, depth]);
  return <>{buildChildren(gameObject, children)}</>;
};
