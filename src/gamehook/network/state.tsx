import { useState } from "react";

import { GameConnection } from "./types";

type SharedSetState<T> = (state: T) => void;

export function useSharedState<T>(
  _connection: GameConnection,
  initialState: T
): [T, SharedSetState<T>] {
  const [state, setState] = useState<T>(initialState);
  const setSharedState = (value: T) => {
    setState(value);
  };
  return [state, setSharedState];
}
