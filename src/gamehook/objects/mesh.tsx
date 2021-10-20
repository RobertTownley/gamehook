import { ReactNode } from "react";
import { buildChildren } from "./children";

import { BasicMeshType, GameObject } from "./types";
import { useMesh } from "./hooks";

export interface MeshProps extends BasicMeshType {
  children?: ReactNode;
  objParent?: GameObject;
}

export const Mesh = (props: MeshProps) => {
  const { children } = props;
  const gameObject = useMesh(props);

  // TODO: Observe other things like collisions, position, and clicks
  return <>{buildChildren(gameObject, children)}</>;
};
