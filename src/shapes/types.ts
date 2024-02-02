import { Nameable } from "../taxonomy/types";
import { Interactable } from "../interactions/types";
import { Lightable } from "../lights/types";
import { Hierarchical } from "../hierarchy/types";
import { Materializable } from "../materials/types";
import { Shapeable } from "../geometry/types";
import { Physical } from "../physics/types";

export interface ShapeProps
  extends Hierarchical,
    Interactable,
    Lightable,
    Materializable,
    Nameable,
    Physical,
    Shapeable {}
