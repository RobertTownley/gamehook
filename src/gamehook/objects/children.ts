import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { GameObject } from "./types";

export const buildChildren = (gameObject: GameObject, children?: ReactNode) => {
  return Children.map(children, (child) => {
    return isValidElement(child)
      ? cloneElement(child, { objParent: gameObject })
      : null;
  });
};
