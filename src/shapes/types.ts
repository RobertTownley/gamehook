import { ReactNode } from "react";

import { Nameable } from "../taxonomy/types";
import { Materializable } from "../materials/types";
import { Shapeable } from "../geometry/types";
import { Physical } from "../physics/types";

export interface ShapeProps
  extends Materializable,
    Nameable,
    Physical,
    Shapeable {
  children?: ReactNode;
}
