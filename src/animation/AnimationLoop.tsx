import { useCallback, useEffect } from "react";
import { useSceneDetails } from "../scene/hooks";

export function AnimationLoop() {
  const { render } = useSceneDetails();
  const animate = useCallback(() => {
    const frame = requestAnimationFrame(animate);

    // Move objects
    // moveSceneObjects(scene);

    // Render the scene
    render();
    return () => {
      cancelAnimationFrame(frame);
    };
  }, [render]);

  useEffect(() => {
    animate();
  }, [animate]);

  return <></>;
}
