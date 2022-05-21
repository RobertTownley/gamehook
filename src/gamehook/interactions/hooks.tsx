import { useLayoutEffect, useMemo } from "react";
import { SceneContextValues } from "../scene/context";

export function useInteraction(scene: SceneContextValues) {
  const handleMouseEvent = useMemo(() => {
    return () => {
      console.log(scene);
    };
  }, [scene]);
  useLayoutEffect(() => {
    window.addEventListener("click", handleMouseEvent);
    return () => {
      window.removeEventListener("click", handleMouseEvent);
    };
  }, [handleMouseEvent]);
}
