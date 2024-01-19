import { useCallback, useEffect } from "react";
import { useSceneDetails } from "../scene/hooks";

export function AnimationLoop() {
  const { canvas, camera, render, renderer } = useSceneDetails();

  const resizeCanvas = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (canvas!.width !== width || canvas!.height !== height) {
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }, [camera, canvas, renderer]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => {
      resizeCanvas();
      window.removeEventListener("listener", resizeCanvas);
    };
  }, [resizeCanvas]);

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
