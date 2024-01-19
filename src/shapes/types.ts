import { ReactNode } from "react";

import { Nameable } from "../taxonomy/types";
import { Shapeable } from "../geometry/types";
import { Materializable } from "src/materials/types";

export interface ShapeProps extends Materializable, Nameable, Shapeable {
  children?: ReactNode;
}
