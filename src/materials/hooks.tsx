import { useEffect, useMemo } from "react";
import * as THREE from "three";

import { Materializable } from "./types";
import { DefaultMaterial } from "./defaults";

export function useMaterial(props: Materializable["material"]) {
  const stringified = useMemo(() => {
    return props ? JSON.stringify(props) : undefined;
  }, [props]);

  const params = useMemo(() => {
    return stringified
      ? (JSON.parse(stringified) as Materializable["material"])
      : undefined;
  }, [stringified]);

  const material = useMemo(() => {
    switch (params?.type) {
      case undefined:
        return DefaultMaterial;
      case "line-basic":
        return new THREE.LineBasicMaterial(params);
      case "line-dashed":
        return new THREE.LineDashedMaterial(params);
      case "basic":
        return new THREE.MeshBasicMaterial(params);
      case "depth":
        return new THREE.MeshDepthMaterial(params);
      case "lambert":
        return new THREE.MeshLambertMaterial(params);
      case "matcap":
        return new THREE.MeshMatcapMaterial(params);
      case "normal":
        return new THREE.MeshNormalMaterial(params);
      case "physical":
        return new THREE.MeshPhysicalMaterial(params);
      case "phong":
        return new THREE.MeshPhongMaterial(params);
      case "standard":
        return new THREE.MeshStandardMaterial(params);
      case "toon":
        return new THREE.MeshToonMaterial(params);
      case "points":
        return new THREE.PointsMaterial(params);
      case "shader":
        return new THREE.ShaderMaterial(params);
      case "shadow":
        return new THREE.ShadowMaterial(params);
      case "sprite":
        return new THREE.SpriteMaterial(params);
    }
  }, [params]);

  useEffect(() => {
    return () => {
      material.dispose();
    };
  }, [material]);

  return material;
}
