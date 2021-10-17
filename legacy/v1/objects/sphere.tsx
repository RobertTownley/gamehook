import { BasicMeshType } from "./types";

import { Mesh } from "./mesh";

interface Props extends BasicMeshType {
  radius?: number;
  widthSegments?: number;
  heightSegments?: number;
}

export const Sphere = ({
  geometry,
  radius,
  widthSegments,
  heightSegments,
  ...props
}: Props) => {
  const _geometry = geometry || {
    type: "sphere",
    radius: radius || 1,
    widthSegments: widthSegments || 16,
    heightSegments: heightSegments || 8,
  };
  return <Mesh geometry={_geometry} {...props} />;
};
