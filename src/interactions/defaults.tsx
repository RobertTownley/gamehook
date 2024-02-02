import { InteractionStore } from "./types";

/**Create an empty object for other objects to append themselves to
 *
 * Used by scene-wide click handlers to find relevant objects
 */

export function buildInitialInteractions(): InteractionStore {
  return {
    onClick: {},
    onHoverEnter: {},
    onHoverExit: {},
  };
}
