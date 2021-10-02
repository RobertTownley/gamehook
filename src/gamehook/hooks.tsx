import { useCallback, useMemo, useEffect, useRef, useContext } from "react";
import { RouterContext } from "./router";

type Animation = (val: number) => void;

export const useAnimation = (callback: Animation) => {
  const savedCallback = useRef<(elapsed: number) => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    function tick() {
      const elapsed = Date.now() - startTime;
      startTime = Date.now();
      loop();
      savedCallback.current && savedCallback.current(elapsed);
    }

    function loop() {
      animationFrame = requestAnimationFrame(tick);
    }
    startTime = Date.now();
    loop();
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
};

/* Sets timeouts for the provided callback, returning a decimal value
 * representing how far the range has gone.
 *
 * For example, if called with `start: 0, end: 2000, step: 10`, the function
 * will call the callback every 10ms. After 1000ms, the callback will be
 * called with a value of 0.5, representing 50% completion.
 *
 */
export const useTimeline = (
  callback: Animation,
  start: number,
  end: number,
  step: number
) => {
  const animate = useCallback(() => {
    const duration = end - start;
    for (let x = start; x <= end; x += step) {
      const completion = (x - start) / duration;
      setTimeout(() => callback(completion), x);
    }
  }, [callback, start, end, step]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      animate();
    }
    return () => {
      mounted = false;
    };
  }, [animate]);
};

export const useCamera = (): THREE.PerspectiveCamera => {
  return GAME.scene.camera;
};

export const useGameRouter = () => {
  const routerContext = useContext(RouterContext);
  return useMemo(() => {
    return {
      changeScene: (key: string) => {
        if (key !== routerContext.sceneKey) {
          routerContext.setSceneKey(key);
        }
      },
    };
  }, [routerContext]);
};
