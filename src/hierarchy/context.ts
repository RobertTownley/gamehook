import { createContext } from "react";
import { Hierarchy } from "./types";

export const HierarchyContext = createContext<Hierarchy>({
  animations: [],
  parent: undefined,
});
