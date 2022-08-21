import { useEffect, useMemo } from "react";

import { generateUUID } from "three/src/math/MathUtils";

interface GameEvent<T> {
  name: string;
  emit: (data: T) => void;
  listeners: {
    id: string;
    callback: (data: T) => void;
  }[];
  removeListener: (id: string) => void;
}

export function createEvent<T>(eventName: string): GameEvent<T> {
  return {
    name: eventName,
    emit: function (data: T) {
      this.listeners.forEach(({ callback }) => {
        callback(data);
      });
    },
    removeListener: function (id: string) {
      this.listeners = this.listeners.filter((l) => l.id !== id);
    },
    listeners: [],
  };
}

export function useEventListener<T>(
  event: GameEvent<T>,
  callback: (data: T) => void
) {
  const id = useMemo(() => generateUUID(), []);
  useEffect(() => {
    event.listeners.push({
      callback,
      id,
    });
    return () => {
      event.removeListener(id);
    };
  }, [event, callback, id]);
}
