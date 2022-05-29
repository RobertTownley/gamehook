import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { GameObject } from "./types";

export const buildChildren = (gameMesh: GameObject, children?: ReactNode) => {
  return Children.map(children, (child) => {
    return isValidElement(child)
      ? cloneElement(child, { objParent: gameMesh })
      : null;
  });
};
