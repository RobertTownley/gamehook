import { ReactNode } from "react";
import { Designable } from "../materials";
import { Physical } from "../physics";
import { Interactable } from "../interactions";

export interface MeshProps extends Physical, Interactable, Designable {
  children?: ReactNode;
  id?: string;
}
