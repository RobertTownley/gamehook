import { useCallback, useMemo, useEffect, useRef, useContext } from "react";
import { ObjectPosition, ObjectRotation } from "./objects/types";
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
  const initialized = useRef(false);
  const savedCallback = useRef<Animation>(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const result = useCallback(() => {
    const duration = end - start;
    for (let x = start; x <= end; x += step) {
      const completion = (x - start) / duration;
      setTimeout(() => {
        savedCallback.current(completion);
      }, x);
    }
  }, [start, step, end]);

  if (!initialized.current) {
    result();
    initialized.current = true;
  }
  return result;
};

interface GamehookCamera {
  getPosition: () => ObjectPosition;
  getXPosition: () => number;
  getYPosition: () => number;
  getZPosition: () => number;

  moveX: (n: number) => void;
  moveY: (n: number) => void;
  moveZ: (n: number) => void;

  setPosition: (position: ObjectPosition) => void;
  setXPosition: (x: number) => void;
  setYPosition: (y: number) => void;
  setZPosition: (z: number) => void;

  getRotation: () => ObjectRotation;
  getXRotation: () => number;
  getYRotation: () => number;
  getZRotation: () => number;

  rotateX: (n: number) => void;
  rotateY: (n: number) => void;
  rotateZ: (n: number) => void;

  setRotation: (rotation: ObjectRotation) => void;
  setXRotation: (x: number) => void;
  setYRotation: (y: number) => void;
  setZRotation: (z: number) => void;
}
export const useCamera = (): GamehookCamera => {
  const cameraRef = useRef(GAME.scene.camera);
  return {
    getPosition: () => {
      return cameraRef.current.camera.position;
    },
    getXPosition: () => {
      return cameraRef.current.position.x;
    },
    getYPosition: () => {
      return cameraRef.current.position.y;
    },
    getZPosition: () => {
      return cameraRef.current.position.z;
    },
    getRotation: () => {
      return cameraRef.current.rotation;
    },
    getXRotation: () => {
      return cameraRef.current.rotation.x;
    },
    getYRotation: () => {
      return cameraRef.current.rotation.y;
    },
    getZRotation: () => {
      return cameraRef.current.rotation.z;
    },
    moveX: (n: number) => {
      cameraRef.current.position.x += n;
    },
    moveY: (n: number) => {
      cameraRef.current.position.y += n;
    },
    moveZ: (n: number) => {
      cameraRef.current.position.z += n;
    },
    rotateX: (n: number) => {
      cameraRef.current.rotation.x += n;
    },
    rotateY: (n: number) => {
      cameraRef.current.rotation.y += n;
    },
    rotateZ: (n: number) => {
      cameraRef.current.rotation.z += n;
    },

    setPosition: (position: ObjectPosition) => {
      cameraRef.current.position.x = position[0];
      cameraRef.current.position.y = position[1];
      cameraRef.current.position.z = position[2];
    },
    setXPosition: (x: number) => {
      cameraRef.current.position.x = x;
    },
    setYPosition: (y: number) => {
      cameraRef.current.position.y = y;
    },
    setZPosition: (z: number) => {
      cameraRef.current.position.z = z;
    },

    setRotation: (rotation: ObjectRotation) => {
      cameraRef.current.rotation.x = rotation[0];
      cameraRef.current.rotation.y = rotation[1];
      cameraRef.current.rotation.z = rotation[2];
    },
    setXRotation: (x: number) => {
      cameraRef.current.rotation.x = x;
    },
    setYRotation: (y: number) => {
      cameraRef.current.rotation.y = y;
    },
    setZRotation: (z: number) => {
      cameraRef.current.rotation.z = z;
    },
  };
};

export const useGameRouter = () => {
  const routerContext = useContext(RouterContext);
  return useMemo(() => {
    return {
      changeScene: (key: string, routerParams?: any) => {
        routerContext.setRouterParams(routerParams);
        routerContext.setSceneKey(key);
      },
      params: routerContext.routerParams,
    };
  }, [routerContext]);
};
