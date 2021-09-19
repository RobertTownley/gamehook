import { useCallback, useEffect, useRef } from "react";

type Animation = (val: number) => void;

export const useAnimation = (callback: Animation) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const callable = useCallback(callback, [callback]);
  const requestRef = useRef(0);
  const previousTimeRef = useRef(0);

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callable(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callable]
  );

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
  }, [animate]);
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
    console.log("I should be called once");
    const duration = end - start;
    for (let x = start; x <= end; x += step) {
      const completion = (x - start) / duration;
      setTimeout(() => callback(completion), x);
    }
  }, [callback, start, end, step]);
  useEffect(animate, [animate]);
};
