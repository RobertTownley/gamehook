import { GLTF } from "three/examples/jsm/Addons";

import { Shapeable } from "../geometry/types";
import { Interactable } from "../interactions/types";
import { Lightable } from "../lights/types";
import { Materializable } from "../materials/types";
import { Physical } from "../physics/types";
import { Nameable } from "../taxonomy/types";
import { Hierarchical } from "../hierarchy/types";

export interface ModelProps
  extends Hierarchical,
    Interactable,
    Lightable,
    Materializable,
    Nameable,
    Physical,
    Shapeable {
  url?: string;

  onLoad?: (data: GLTF) => void;
  onProgress?: (event: ProgressEvent<EventTarget>) => void;
  onError?: (err: unknown) => void;
}
