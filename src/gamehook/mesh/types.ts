import { Physical } from "../physics";
import { Interactable } from "../interactions";
import { ReactNode } from "react";

export interface MeshProps extends Physical, Interactable {
  children?: ReactNode;
  id?: string;
}
