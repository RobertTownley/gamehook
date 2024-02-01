import { useMemo } from "react";
import * as THREE from "three";

import { HierarchyContext } from "../hierarchy/context";
import { useHierarchy } from "../hierarchy/hooks";
import { useLighting } from "./hooks";

import { LightProps } from "./types";

export function Light(props: LightProps) {
  const { children } = props;
  const light = useMemo(() => {
    return new THREE.AmbientLight();
  }, []);

  useLighting(light, props);

  const parent = useHierarchy(light);
  const value = useMemo(() => {
    return { parent: light };
  }, [light]);

  return (
    <HierarchyContext.Provider value={value}>
      {children}
    </HierarchyContext.Provider>
  );
}
