import { useEffect, useRef } from "react";

type Animation = (val: number) => void;

export const useAnimation = (callback: Animation) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  const animate = (time: number) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    let isMounted = true;
    let id: number;
    if (isMounted) {
      id = requestAnimationFrame(animate);
    }
    return () => {
      isMounted = false;
      cancelAnimationFrame(id);
    };
  });
};
