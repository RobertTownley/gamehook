import { useRef } from "react";
import { generateUUID } from "three/src/math/MathUtils";

type Callback = () => boolean;
export type Animation = {
  id: string;
  callback: Callback;
  revoked: boolean;
};

// Run the following callback within a requestAnimationFrame loop
// managed by the scene object
export const useAnimation = (callback: Callback) => {
  const animation = useRef<Animation>({
    id: generateUUID(),
    callback,
    revoked: false,
  });
  animation.current.callback = callback;
  _GAME.scene.animations[animation.current.id] = animation;
};
