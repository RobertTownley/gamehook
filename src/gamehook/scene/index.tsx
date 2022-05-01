import * as three from "three";
import { ReactNode, useLayoutEffect, useRef, useState } from "react";

import {
  SceneContextValues,
  SceneContext,
  getInitialSceneContext,
} from "./context";
import { GameObject } from "../objects";
import { GameLight } from "../lights";
import { generateUUID } from "three/src/math/MathUtils";

interface SceneProps {
  children: ReactNode;
  width?: number;
  height?: number;
}

export function Scene({ children, width = 800, height = 600 }: SceneProps) {
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [lights, setLights] = useState<GameLight[]>([]);

  useLayoutEffect(() => {
    const scene = three.Scene;
  }, []);

  const context: SceneContextValues = getInitialSceneContext({
    objects,
    setObjects,
    lights,
    setLights,
  });

  const mountRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={mountRef}>
      <SceneContext.Provider value={context}>{children}</SceneContext.Provider>
    </div>
  );
}
