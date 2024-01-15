import { useEffect, useMemo, useState } from "react";

import { SceneProps } from "./types";

export function useSceneId(props: SceneProps) {
  return useMemo(() => {
    return props.id ?? crypto.randomUUID();
  }, [props.id]);
}

export function useSceneReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 100);
  }, []);
  return ready;
}
