import * as THREE from "three";

import { useEffect, useMemo } from "react";
import { useSceneDetails } from "../scene/hooks";
type LinearFogProps = {
  variant: "linear";
  color: number;
  near: number;
  far: number;
};
type ExponentialFogProps = {
  variant: "exponential";
  color: number;
  density: number;
};
type FogProps = LinearFogProps | ExponentialFogProps;

export function Fog(props: FogProps) {
  if (props.variant === "linear") {
    return <LinearFog {...props} />;
  } else {
    return <ExponentialFog {...props} />;
  }
}

function LinearFog(props: LinearFogProps) {
  const fog = useMemo(() => {
    return new THREE.Fog(props.color, props.near, props.far);
  }, [props.color, props.near, props.far]);
  useAddFogToScene(fog);
  return null;
}
function ExponentialFog(props: ExponentialFogProps) {
  const fog = useMemo(() => {
    return new THREE.FogExp2(props.color, props.density);
  }, [props.color, props.density]);
  useAddFogToScene(fog);
  return null;
}

function useAddFogToScene(fog: THREE.FogBase) {
  const { scene } = useSceneDetails();
  useEffect(() => {
    scene.fog = fog;
    return () => {
      scene.fog = null;
    };
  }, [fog, scene]);
}
