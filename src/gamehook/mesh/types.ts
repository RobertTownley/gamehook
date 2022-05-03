import { ReactNode } from "react";
import { Designable } from "../materials";
import { Physical } from "../physics";
import { Interactable } from "../interactions";

export interface AbstractMeshProps extends Physical, Interactable, Designable {
  children?: ReactNode;
  id?: string;
}

export interface BoxProps extends AbstractMeshProps {
  width?: number;
  depth?: number;
  height?: number;
}

export interface SphereProps extends AbstractMeshProps {
  radius?: number;
}

export type MeshProps = BoxProps | SphereProps;
