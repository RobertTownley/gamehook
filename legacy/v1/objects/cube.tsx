import { BasicMeshType } from "./types";
import { Mesh } from "./mesh";

interface CubeProps extends BasicMeshType {
  size?: number;
}

export const Cube = ({ geometry, material, size = 1, ...props }: CubeProps) => {
  const _geometry = geometry || {
    type: "box",
    height: size,
    width: size,
    depth: size,
  };

  return <Mesh geometry={_geometry} {...props} />;
};
