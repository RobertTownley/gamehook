import * as THREE from "three";
import { useContext, useEffect, useMemo } from "react";
import { SceneContext } from "./scene/context";

interface ThreeFogParams {
  color: number;
  near?: number;
  far?: number;
  type: "directed";
}
interface ThreeFogExp2Params {
  type: "realistic";
  color: number;
  density?: number;
}
type FogProps = ThreeFogParams | ThreeFogExp2Params;

function useFog(fog: THREE.Fog | THREE.FogExp2) {
  const scene = useContext(SceneContext);
  useEffect(() => {
    scene.threeScene.fog = fog;
    return () => {
      scene.threeScene.fog = null;
    };
  }, [scene, fog]);
}
function DirectedFog({ color, near, far }: ThreeFogParams) {
  const fog = useMemo(() => {
    return new THREE.Fog(color, near, far);
  }, [color, near, far]);
  useFog(fog);
  return <></>;
}

function RealisticFog({ color, density }: ThreeFogExp2Params) {
  const fog = useMemo(() => {
    return new THREE.FogExp2(color, density);
  }, [color, density]);
  useFog(fog);
  return <></>;
}
export function Fog(props: FogProps) {
  return props.type === "directed" ? (
    <DirectedFog {...props} />
  ) : (
    <RealisticFog {...props} />
  );

  /*
  const scene = useContext(SceneContext);
  const fog = useMemo(() => {
    return props.type === "directed"
      ? new THREE.Fog(props.color, props.near, props.far)
      : new THREE.FogExp2(props.color, props.density);
  }, [props.color, props.density, props.type, props.near, props.far]);

  useEffect(() => {
    scene.threeScene.fog = fog;
    return () => {
      scene.threeScene.fog = null;
    };
  }, [scene, fog]);
  return <></>;
*/
}
